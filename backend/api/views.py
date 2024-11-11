import jwt
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from .models import GoogleUser
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from rest_framework.permissions import IsAuthenticated
from .authentications import JWTAuthentication
from google.auth.transport.requests import Request

import logging
logger = logging.getLogger(__name__)


class GoogleAuthView(APIView):
    def post(self, request):
        code = request.data.get('code')
        print(code)
        if not code:
            return Response({'error': 'Authorization code not provided.'}, status=status.HTTP_400_BAD_REQUEST)

        # Exchange code for access token and refresh token
        token_url = 'https://oauth2.googleapis.com/token'
        data = {
            'code': code,
            'client_id': settings.GOOGLE_CLIENT_ID,
            'client_secret': settings.GOOGLE_CLIENT_SECRET,
            'redirect_uri': settings.GOOGLE_OAUTH_CALLBACK_URL,  # Adjustable in .env
            'grant_type': 'authorization_code',
        }

        # Send POST request to Google's token endpoint
        r = requests.post(token_url, data=data)
        print(r)

        try:
            token_data = r.json()
        except ValueError:
            logger.error(f'Non-JSON response from Google: {r.text}')
            return Response({'error': 'Failed to obtain access token from Google.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if 'error' in token_data:
            error_description = token_data.get('error_description', 'Failed to obtain access token from Google.')
            logger.error(f"Google OAuth error: {token_data['error']}: {error_description}")
            return Response({'error': error_description}, status=status.HTTP_400_BAD_REQUEST)

        access_token = token_data.get('access_token')
        refresh_token = token_data.get('refresh_token')
        id_token = token_data.get('id_token')  # JWT token containing user info
        expires_in = token_data.get('expires_in')

        # Decode the ID token to get user information
        try:
            id_info = jwt.decode(id_token, options={"verify_signature": False})
            email = id_info.get('email')

            # Save or update user in database
            user, created = GoogleUser.objects.get_or_create(email=email)
            user.access_token = access_token
            user.refresh_token = refresh_token
            user.token_expires_in = expires_in
            user.save()

            # Generate JWT token
            jwt_payload = {
                'email': email,
                # 'token': access_token
            }
            jwt_token = jwt.encode(jwt_payload, settings.JWT_SECRET_KEY, algorithm='HS256')

            return Response({'token': jwt_token}, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({'error': 'Failed to decode ID token.'}, status=status.HTTP_400_BAD_REQUEST)


class GetUserEmailsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        k = int(request.query_params.get('k', 10))  # Default to 10 recent emails

        user = request.user

        # Refresh the access token if necessary
        credentials = Credentials(
            token=user.access_token,
            refresh_token=user.refresh_token,
            token_uri='https://oauth2.googleapis.com/token',
            client_id=settings.GOOGLE_CLIENT_ID,
            client_secret=settings.GOOGLE_CLIENT_SECRET,
            scopes=['https://www.googleapis.com/auth/gmail.readonly'],
        )

        # Update token if expired but got refresh token
        if credentials.expired and credentials.refresh_token:
            credentials.refresh(Request())
            user.access_token = credentials.token
            user.save()

        try:
            service = build('gmail', 'v1', credentials=credentials)

            # Fetch the list of messages
            messages_result = service.users().messages().list(userId='me', maxResults=k).execute()
            messages = messages_result.get('messages', [])

            emails = []

            for message in messages:
                msg = service.users().messages().get(userId='me', id=message['id'], format='full').execute()

                headers = msg.get('payload', {}).get('headers', [])
                subject = next((h['value'] for h in headers if h['name'] == 'Subject'), '')
                from_email = next((h['value'] for h in headers if h['name'] == 'From'), '')
                snippet = msg.get('snippet', '')

                email_data = {
                    'id': message['id'],
                    'threadId': msg.get('threadId'),
                    'subject': subject,
                    'from': from_email,
                    'snippet': snippet,
                }
                emails.append(email_data)

            return Response({'emails': emails}, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f'Error fetching emails: {e}')
            return Response({'error': 'Failed to fetch emails.'}, status=status.HTTP_400_BAD_REQUEST)

