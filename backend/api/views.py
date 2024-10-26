"""
`backend.api.views`:

This app is responsible for handling the Google authentication.
It receives a token from the frontend, verifies it, and creates a new user if it doesn't exist.
It then generates a JWT token and returns it to the frontend.
"""
# General setting
from django.conf import settings
from rest_framework import status
from rest_framework.views import APIView

# For authentication
from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

# For email fetching
from rest_framework.permissions import IsAuthenticated
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build


class GoogleAuthView(APIView):
    def post(self, request):
        token = request.data.get('token')
        try:
            # Verify the token
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), settings.GOOGLE_CLIENT_ID)

            # ID token is valid. Get the user's Google Account ID from the decoded token.
            google_user_id = idinfo['sub']
            email = idinfo.get('email')
            name = idinfo.get('name')

            # Check if user exists
            try:
                user = User.objects.get(username=email)
            except User.DoesNotExist:
                # Create a new user
                user = User.objects.create(username=email, email=email, first_name=name)
                user.set_unusable_password()
                user.save()

            # Generate JWT token
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)

        except ValueError:
            # Invalid token
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


class FetchEmailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        # Assuming you have stored the user's access token. You need to extend the GoogleAuthView to store tokens.

        # For demonstration, suppose you have the access token
        access_token = request.headers.get('Authorization').split()[1]  # Simplified

        creds = Credentials(token=access_token)
        service = build('gmail', 'v1', credentials=creds)

        try:
            results = service.users().messages().list(userId='me', labelIds=['INBOX'], maxResults=10).execute()
            messages = results.get('messages', [])

            emails = []
            for msg in messages:
                msg_data = service.users().messages().get(userId='me', id=msg['id'], format='full').execute()
                # Apply your Python filtering logic here
                # For simplicity, we'll extract the subject
                headers = msg_data['payload']['headers']
                subject = next(header['value'] for header in headers if header['name'] == 'Subject')
                emails.append({'id': msg['id'], 'subject': subject})

            return Response({'emails': emails}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)