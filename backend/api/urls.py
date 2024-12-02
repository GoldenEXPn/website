

from django.urls import path
from .views import GoogleAuthView, FetchEmailsView, TestView

urlpatterns = [
    path('test/', TestView.as_view(), name='test'),
    path('google-auth/', GoogleAuthView.as_view(), name='google-auth'),
    path('email/', FetchEmailsView.as_view(), name='fetch-emails'),
]