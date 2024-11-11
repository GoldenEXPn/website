from rest_framework import serializers
from .models import GoogleUser

class GoogleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoogleUser
        fields = '__all__'
