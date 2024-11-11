# api/urls.py
from django.urls import path, include
from .views import *
from dj_rest_auth.views import LoginView, LogoutView
from dj_rest_auth.registration.views import RegisterView

urlpatterns = [
    # Auth-related paths for the API
    path("auth/", include("dj_rest_auth.urls")),
    path("auth/registration/", include("dj_rest_auth.registration.urls")),
    path("auth/google/", GoogleLogin.as_view(), name="google_login"),
    path("auth/google/callback/", GoogleLoginCallback.as_view(), name="google_login_callback"),
]
