from urllib.parse import urljoin

import requests

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

from django.conf import settings

from django.urls import reverse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views import View

from json import JSONDecodeError
from rest_framework.permissions import IsAuthenticated

# https://dj-rest-auth.readthedocs.io/en/latest/api_endpoints.html
# from .models import *
# from .serializer import *
# from .templates import *
# from .utils import *


        #TODO: store this response in backend, 
        #TODO: add additional method to read, refresh, check token
        #TODO: get email information based on the token

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = settings.GOOGLE_OAUTH_CALLBACK_URL
    client_class = OAuth2Client

class GoogleLoginCallback(APIView):
    def get(self, request, *args, **kwargs):
        """
        If you are building a fullstack application (eq. with React app next to Django)
        you can place this endpoint in your frontend application to receive
        the JWT tokens there - and store them in the state
        """

        code = request.GET.get("code")
        
        # Check if the 'code' parameter is present in the request
        if code is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        print("Authorization code received:", code)

        # Construct the token endpoint URL, replacing 'localhost' with your production domain as needed
        # reverse login does not work
        # token_endpoint_url = urljoin("http://127.0.0.1:8000", reverse("google_login"))
        token_endpoint_url = urljoin("http://127.0.0.1:8000", reverse("google_login"))

        print(token_endpoint_url)

        # Logging in
        try:
            response = requests.post(token_endpoint_url, data={"code": code})
            response.raise_for_status()  # Ensure the request succeeded
            return Response(response.json(), status=status.HTTP_200_OK)
        except requests.RequestException as e:
            return Response({"error": "Token exchange failed", "details": str(e)}, status=status.HTTP_502_BAD_GATEWAY)
        
class LoginPage(View):
    def get(self, request, *args, **kwargs):

        return render(
            request,
            "profile.html",
            {
                "google_callback_uri": settings.GOOGLE_OAUTH_CALLBACK_URL,
                "google_client_id": settings.GOOGLE_OAUTH_CLIENT_ID,
            },
        )

class TokenRefresh(APIView):

    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get('refresh')

        if not refresh_token:
            return Response({"error": "No refresh token provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Google's token endpoint for refreshing tokens
        token_url = "https://oauth2.googleapis.com/token"

        payload = {
            "client_id": settings.GOOGLE_OAUTH_CLIENT_ID,
            "client_secret": settings.GOOGLE_OAUTH_CLIENT_SECRET,
            "refresh_token": refresh_token,
            "grant_type": "refresh_token",
        }

        try:
            # Make a request to Google OAuth2 API to refresh the access token
            response = requests.post(token_url, data=payload)
            print(response)
            # If successful, response from Google will include a new access token
            response_data = response.json()
            print(response_data)
            if response.status_code == 200 and 'access_token' in response_data:
                # Return the new access token to the client
                return Response({
                    'access_token': response_data['access_token'],
                    'expires_in': response_data['expires_in']
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Failed to refresh token'}, status=status.HTTP_400_BAD_REQUEST)

        except requests.exceptions.RequestException as e:
            # Catch any error from the request
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
# def indexView(request, *args, **kwargs):
#     return render(request, "frontend/index.html")

