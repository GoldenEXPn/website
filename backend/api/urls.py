from django.urls import path
from . import views

urlpatterns = [
    path('v1/auth/google/', views.GoogleAuthView.as_view(), name='google_auth'),
    path('get-user-email/', views.GetUserEmailsView.as_view(), name='get_user_email'),
]
