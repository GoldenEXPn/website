# import os
# import google.auth
# import google.auth.transport.requests
# from google.oauth2.credentials import Credentials
# from google_auth_oauthlib.flow import InstalledAppFlow
# from googleapiclient.discovery import build
# from django.core.management.base import BaseCommand
# from allauth.socialaccount.models import SocialToken

# SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

# class Command(BaseCommand):
#     help = 'Retrieve the logged-in user\'s 100 most recent emails'

#     def handle(self, *args, **kwargs):
#         # Get the social token for the logged-in user
#         social_token = SocialToken.objects.get(account__user=self.request.user, account__provider='google')

#         credentials = Credentials(
#             token=social_token.token,
#             refresh_token=social_token.token_secret,
#             token_uri='https://oauth2.googleapis.com/token',
#             client_id='<your-client-id>',
#             client_secret='<your-client-secret>',
#             scopes=SCOPES
#         )

#         service = build('gmail', 'v1', credentials=credentials)

#         # Call the Gmail API
#         results = service.users().messages().list(userId='me', maxResults=100).execute()
#         messages = results.get('messages', [])

#         if not messages:
#             print('No messages found.')
#         else:
#             print('Messages:')
#             for message in messages:
#                 msg = service.users().messages().get(userId='me', id=message['id']).execute()
#                 print(msg['snippet'])
