import googleapiclient.discovery
from flask import session
from utils import clean_email_body
from flask import session, abort, redirect, request
import google.oauth2.credentials
from functools import wraps

def login_is_required(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return abort(401)  # Authorization required
        else:
            return function(*args, **kwargs)

    return wrapper

@login_is_required
def fetch_emails():
    if 'credentials' not in session:
        return redirect('/authorize')

    credentials = google.oauth2.credentials.Credentials(**session["credentials"])
    service = googleapiclient.discovery.build("gmail", "v1", credentials=credentials)

    try:
        results = service.users().messages().list(userId="me", maxResults=10).execute()
        messages = results.get("messages", [])
        
        emails = []
        for message in messages:
            msg = service.users().messages().get(userId="me", id=message["id"]).execute()
            payload = msg.get("payload", {})
            headers = payload.get("headers", [])
            body = payload.get("body", {})

            email = {"id": msg["id"]}

            for header in headers:
                if header["name"] == "From":
                    email["from"] = header["value"]
                if header["name"] == "Subject":
                    email["subject"] = header["value"]

            email_content = None
            if "data" in body:
                email_content = body["data"]
            if email_content:
                email["body"] = clean_email_body(email_content)
            else:
                email["body"] = "No content found"
            
            emails.append(email)

        return {"status": "success", "emails": emails}

    except Exception as e:
        return {"status": "error", "message": str(e)}, 500
