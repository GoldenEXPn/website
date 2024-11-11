from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
import jwt
from django.conf import settings
from .models import GoogleUser


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None  # Authentication did not succeed

        try:
            token_type, token = auth_header.split()
            if token_type != 'Bearer':
                raise exceptions.AuthenticationFailed('Invalid token type.')

            decoded = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=['HS256'])
            email = decoded.get('email')
            user = GoogleUser.objects.get(email=email)
            return (user, None)
        except GoogleUser.DoesNotExist:
            raise exceptions.AuthenticationFailed('User not found.')
        except jwt.DecodeError:
            raise exceptions.AuthenticationFailed('Invalid token.')
        except Exception as e:
            print(e)
            raise exceptions.AuthenticationFailed('Authentication failed.')
