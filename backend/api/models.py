from django.db import models

# Create your models here.

class React(models.Model):
    email_title = models.CharField(max_length=100)
    content = models.TextField()

    def __str__(self):
        return self.email_title
