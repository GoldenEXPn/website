

from django.urls import path
from .views import GoogleAuthView, FetchEmailsView

urlpatterns = [
    path('google-auth/', GoogleAuthView.as_view(), name='google-auth'),
    path('email/', FetchEmailsView.as_view(), name='fetch-emails'),
]