# https://developers.google.com/identity/protocols/oauth2/web-server#python_3

import os
from flask import session, abort, redirect, request
import flask
import requests
import pathlib
from dotenv import load_dotenv
import google.oauth2.credentials
from google.oauth2 import id_token
import googleapiclient.discovery
import cachecontrol
from google_auth_oauthlib.flow import Flow
from functools import wraps

from flask_cors import CORS

from bs4 import BeautifulSoup
import re
import base64

CLIENT_SECRETS_FILE = "client_secret.json"

SCOPES = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "openid",
]
API_SERVICE_NAME = "drive"
API_VERSION = "v2"

app = flask.Flask(__name__)

load_dotenv()

database_url = os.getenv("DATABASE_URL")
app.secret_key = os.getenv("GOOGLE_OAUTH_CLIENT_SECRET")
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_OAUTH_CLIENT_ID")
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")

CORS(app)

def login_is_required(function):
    '''
        Function wrapper that checks if the section is available via id
        If not, abort the section and provide 401 error
    '''
     # Preserve the original function's name and metadata
    @wraps(function)
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return abort(401)  # Authorization required
        else:
            return function()

    return wrapper

@app.route("/authorize")
def authorize():
    '''
        Get the client secrets file and all of the Id and secret verification 
        and lead user to authorize their account in google oauth page.
        After authorization, the oauth would redirect the user to the assigned callback page,
        which is the callback route, 
        with desired state id (for verification) 
    '''

    flow = Flow.from_client_secrets_file(
        client_secrets_file=client_secrets_file,
        scopes=SCOPES,
        redirect_uri=os.getenv("GOOGLE_OAUTH_CALLBACK_URL"),
    )
    # print(flask.url_for("callback", _external=True))
    flow.redirect_uri = flask.url_for("callback", _external=True)

    authorization_url, state = flow.authorization_url(access_type='offline', include_granted_scopes='true')
    session["state"] = state
    return redirect(authorization_url)

#TODO: provide check authorization and fetch api
#TODO: check why the recall is the /callback but not /callback/
@app.route("/callback/")
def callback():
    
    '''
        Get the state value from the stored session and verify it through Google oauth,
        Then this generate credential for accessing user and api use based on the granted scope.
        
        This contains both method of flask default session storage and the cache storage
    '''
    
    state = flask.session['state']

    flow = Flow.from_client_secrets_file(
      CLIENT_SECRETS_FILE, scopes=SCOPES, state=state)
    flow.redirect_uri = flask.url_for('callback', _external=True)
    
    flow.fetch_token(authorization_response=request.url)

    if not session["state"] == request.args["state"]:
        abort(500)  # State does not match!

    credentials = flow.credentials
    credentials_1 = credentials_to_dict(credentials)
    flask.session['credentials'] = credentials_1
    
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token, request=token_request, audience=GOOGLE_CLIENT_ID
    )

    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")
      
    return redirect("/protected_area")

@app.route("/logout")
def logout():
    
    '''
       Clear session and log out
    '''

    session.clear()
    return redirect("/")


@app.route("/")
def index():
    return "Hello World <a href='/authorize'><button>Login</button></a>"

# @app.route("/")
# def index():
#     return print_index_table()

@app.route("/protected_area")
def protected_area():
    if 'credentials' not in flask.session:
        return flask.redirect('authorize')
    
    return (
        f"Hello {session['name']}! <br/> <a href='/logout'><button>Logout</button></a>"
    )

#API
@app.route('/emails')
def fetch_emails(): 
    
    '''
        Requires user credential in the session. 
        If there is no credential, user is not verified.
        Then, uses the credential to get the email service,
        The number of email is determined by maxResults.
    '''
    
    if 'credentials' not in flask.session:
        return flask.redirect('authorize')

    
    credentials = google.oauth2.credentials.Credentials(
        **session["credentials"]
    )

    # Build the Gmail API service
    service = googleapiclient.discovery.build(
        "gmail", "v1", credentials=credentials
    )
    
    try:
        # Fetch the list of messages
        results = service.users().messages().list(userId="me", maxResults=1).execute()
        messages = results.get("messages", [])

        emails = []
        
        # determine what data to get and cleaning the body using clean_email_body helper function
        for message in messages:
            msg = service.users().messages().get(userId="me", id=message["id"]).execute()
            payload = msg.get("payload", {})
            headers = payload.get("headers", [])
            parts = payload.get("parts", [])
            body = payload.get("body", {})

            # print(msg['payload'].keys())
            # print(body)
            email = {
                "id": msg["id"],
            }

            for header in headers:
                if header["name"] == "From":
                    email["from"] = header["value"]
                if header["name"] == "Subject":
                    email["subject"] = header["value"]
 
            email_content = None
            
            if "data" in body:
                email_content = body["data"]
                    # Case 2: Body is in parts
            elif parts:
                for part in parts:
                    if part.get("mimeType") == "text/plain":
                        email_content = part["body"].get("data")
                        break  # Prioritize plain text
                    elif part.get("mimeType") == "text/html" and email_content is None:
                        email_content = part["body"].get("data")  # Fallback to HTML if plain text not found
            if email_content:
                email["body"] = clean_email_body(email_content)
            else:
                email["body"] = "No content found"        
            emails.append(email)

        return {"status": "success", "emails": emails}

    except Exception as e:
        return {"status": "error", "message": str(e)}, 500

def clean_email_body(raw_body):
    raw_body = base64.urlsafe_b64decode(raw_body).decode('utf-8')

    # Remove extra newlines and carriage returns (\n, \r)
    clean_body = raw_body.replace("\r", " ").replace("\n", " ")

    clean_body = clean_body.replace("\u200c", " ").replace("\u00a9", " ")
    # Use BeautifulSoup to remove HTML tags
    soup = BeautifulSoup(clean_body, 'html.parser')
    text = soup.get_text(separator=" ", strip=True)  # Extract text without tags

    # Remove all URLs using regex
    text = re.sub(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', '', text)
    text = re.sub(r'www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}', '', text)  # Also remove URLs starting with "www."
    
    # Optionally, remove email signatures or disclaimers
    # This is just an example and can be adapted based on known patterns
    text = re.sub(r"(\n\s*-+\s*)|(\n\s*Best regards\s*[\w\s]+[^\w\s])", "", text)

    return text


@app.route('/clear')
def clear_credentials():
  if 'credentials' in flask.session:
    del flask.session['credentials']
  return ('Credentials have been cleared.<br><br>')
     

def credentials_to_dict(credentials):
  return {'token': credentials.token,
          'refresh_token': credentials.refresh_token,
          'token_uri': credentials.token_uri,
          'client_id': credentials.client_id,
          'client_secret': credentials.client_secret,
          'granted_scopes': credentials.granted_scopes}
  
def check_granted_scopes(credentials):
  features = {}
  if 'https://www.googleapis.com/auth/gmail.readonly' in credentials['granted_scopes']:
    features['email'] = True
  else:
    features['email'] = False
  return features

# def print_index_table():
#     return (
#         "<table>"
#         + '<tr><td><a href="/test">Test an API request</a></td>'
#         + "<td>Submit an API request and see a formatted JSON response. "
#         + "    Go through the authorization flow if there are no stored "
#         + "    credentials for the user.</td></tr>"
#         + '<tr><td><a href="/authorize">Test the auth flow directly</a></td>'
#         + "<td>Go directly to the authorization flow. If there are stored "
#         + "    credentials, you still might not be prompted to reauthorize "
#         + "    the application.</td></tr>"
#         + '<tr><td><a href="/revoke">Revoke current credentials</a></td>'
#         + "<td>Revoke the access token associated with the current user "
#         + "    session. After revoking credentials, if you go to the test "
#         + "    page, you should see an <code>invalid_grant</code> error."
#         + "</td></tr>"
#         + '<tr><td><a href="/clear">Clear Flask session credentials</a></td>'
#         + "<td>Clear the access token currently stored in the user session. "
#         + '    After clearing the token, if you <a href="/test">test the '
#         + "    API request</a> again, you should go back to the auth flow."
#         + "</td></tr></table>"
#     )


if __name__ == "__main__":
    # When running locally, disable OAuthlib's HTTPs verification.
    # ACTION ITEM for developers:
    #     When running in production *do not* leave this option enabled.
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

    # This disables the requested scopes and granted scopes check.
    # If users only grant partial request, the warning would not be thrown.
    os.environ["OAUTHLIB_RELAX_TOKEN_SCOPE"] = "1"

    # Specify a hostname and port that are set as a valid redirect URI
    # for your API project in the Google API Console.
    app.run("localhost", 8000, debug=True)
