import requests
from django.urls import reverse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views import View


from json import JSONDecodeError

from .models import *
from .serializer import *
from .templates import *
from .utils import *

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

from django.conf import settings

from urllib.parse import urljoin


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
        token_endpoint_url = urljoin("http://localhost:8000", reverse("google_login"))
        # token_endpoint_url = urljoin(settings.DOMAIN_URL, reverse("google_login"))
        response = requests.post(url=token_endpoint_url, data={"code": code})
        return Response(response.json(), status=status.HTTP_200_OK)
        # try:
        #     # Post request to the token endpoint with the authorization code
        #     response = requests.post(token_endpoint_url, data={"code": code})
        #     response.raise_for_status()  # Raise an error if the response status is not 200

        #     # Attempt to parse JSON response; if it fails, handle the error
        #     # try:
        #     #     json_data = response.json()
        #     # except JSONDecodeError:
        #     #     return Response(
        #     #         {"error": "Invalid JSON in response", "details": response.text},
        #     #         status=status.HTTP_500_INTERNAL_SERVER_ERROR
        #     #     )

        #     return Response(response.json(), status=status.HTTP_200_OK)

        # except requests.exceptions.RequestException as e:
        #     # Handle request errors like connection issues or timeout
        #     return Response(
        #         {"error": "Failed to connect to the token endpoint", "details": str(e)},
        #         status=status.HTTP_502_BAD_GATEWAY
        #     )
    
    
class ReactView(APIView):
    # I don't know why when I put this line of code I am able to access
    # to the html form of the post in rest frame work
    serializer_class = ReactSerializer

    def get(self, request, pk=None):
        if pk is not None:
            # Handle the case where a specific object is requested
            try:
                react_instance = React.objects.get(pk=pk)
                serializer = ReactSerializer(react_instance)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except React.DoesNotExist:
                return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Handle the case where all objects are listed
            try:
                output = [{"email_title": output.email_title,
                           "sender": output.sender,
                           "content": output.content,
                           "received_date": output.received_date}
                          for output in React.objects.all()]
                return Response(output, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
    # def get(self, request):
    #     try:
    #         output = [{"email_title": output.email_title,
    #                    "sender": output.sender,
    #                    "content": output.content,
    #                    "received_date": output.received_date}
    #                   for output in React.objects.all()]
    #         return Response(output, status=status.HTTP_200_OK)
    #     except Exception as e:
    #         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            # Retrieve the object by its primary key (pk)
            react_instance = React.objects.get(pk=pk)
            react_instance.delete()  # Delete the instance
            return Response({"message": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except React.DoesNotExist:
            return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# def profile(request):
#     token = get_google_token(request)
    
#     print("token generated: ", token)
    
#     # print(token)
    
#     if token:
#         print(f"Token retrieved: {token}")
#         emails = get_gmail_data(token)
#         return render(request, 'profile.html', {'emails': emails})
#     else:
#         return render(request, 'profile.html', {'error': 'No token found or failed to retrieve emails'})
    
class LoginPage(View):
    def get(self, request, *args, **kwargs):
        
        print(settings.GOOGLE_OAUTH_CLIENT_ID)
        
        return render(
            request,
            "profile.html",
            {
                "google_callback_uri": settings.GOOGLE_OAUTH_CALLBACK_URL,
                "google_client_id": settings.GOOGLE_OAUTH_CLIENT_ID,
            },
        )

# def indexView(request, *args, **kwargs):
#     return render(request, "frontend/index.html")

