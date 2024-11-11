from django.db import models


class GoogleUser(models.Model):
    email = models.EmailField(unique=True)
    access_token = models.TextField()
    refresh_token = models.TextField(null=True, blank=True)
    token_expires_in = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.email
