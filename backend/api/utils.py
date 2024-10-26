# from allauth.socialaccount.models import SocialToken
# import requests

# def get_google_token(request):
#     if request.user.is_authenticated:
#         try:
#             token = SocialToken.objects.get(account__user=request.user, account__provider='google')
#             return token.token
#         except SocialToken.DoesNotExist:
#             return None

# def get_gmail_data(token):
#     headers = {
#         'Authorization': f'Bearer {token}',
#     }

#     # Step 1: Get the list of message IDs
#     response = requests.get('https://gmail.googleapis.com/gmail/v1/users/me/messages', headers=headers, params={'maxResults': 5})
    
#     if response.status_code == 200:
#         message_list = response.json().get('messages', [])
#         emails = []

#         # Step 2: Loop through each message and fetch the details
#         for message in message_list:
#             message_id = message['id']
#             email_response = requests.get(f'https://gmail.googleapis.com/gmail/v1/users/me/messages/{message_id}', headers=headers)

#             if email_response.status_code == 200:
#                 email_data = email_response.json()
                
#                 # Extract details like subject, sender, and snippet
#                 email_info = {
#                     'subject': '',
#                     'from': '',
#                     'snippet': email_data.get('snippet', '')
#                 }
                
#                 # Loop through headers to get 'From' and 'Subject'
#                 for header in email_data['payload']['headers']:
#                     if header['name'] == 'Subject':
#                         email_info['subject'] = header['value']
#                     elif header['name'] == 'From':
#                         email_info['from'] = header['value']
                
#                 emails.append(email_info)
#             else:
#                 return None  # Handle error for individual email retrieval
#         return emails
#     else:
#         return None  # Handle error for message list retrieval