import os
from flask import session, redirect, request, abort
import flask
from google_auth_oauthlib.flow import Flow
from google.oauth2 import id_token
import google.auth.transport.requests

def authorize():
    flow = Flow.from_client_secrets_file(
        os.getenv("CLIENT_SECRETS_FILE"),
        scopes=["https://www.googleapis.com/auth/gmail.readonly", "openid", "profile", "email"],
        redirect_uri=os.getenv("GOOGLE_OAUTH_CALLBACK_URL")
    )
    flow.redirect_uri = flask.url_for("callback", _external=True)
    authorization_url, state = flow.authorization_url(access_type='offline', include_granted_scopes='true')
    session["state"] = state
    return redirect(authorization_url)

def callback():
    flow = Flow.from_client_secrets_file(
        os.getenv("CLIENT_SECRETS_FILE"),
        scopes=["https://www.googleapis.com/auth/gmail.readonly", "openid", "profile", "email"],
        state=session["state"]
    )
    flow.redirect_uri = flask.url_for('callback', _external=True)
    flow.fetch_token(authorization_response=request.url)

    credentials = flow.credentials
    session["credentials"] = credentials_to_dict(credentials)

    # Verify the ID token
    token_request = google.auth.transport.requests.Request()
    id_info = id_token.verify_oauth2_token(
        credentials.id_token, request=token_request, audience=os.getenv("GOOGLE_OAUTH_CLIENT_ID")
    )

    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")

    return redirect("/protected_area")

def logout():
    session.clear()
    return redirect("/")

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
