from django.db import models
from django.contrib.auth.models import User


class UserData(models.Model):
    account = models.OneToOneField(User, on_delete=models.CASCADE)
    description = models.TextField(max_length=2048)
    user_image = models.ImageField(upload_to="avatars/users/")
    


class Personas(models.Model):
    username = models.ForeignKey(to=UserData, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    description = models.TextField()
    persona_avatar = models.ImageField(upload_to="avatars/personas/")


class BotData(models.Model):
    botname = models.CharField(max_length=128)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)

    pub_desc = models.TextField(max_length=2048)
    description = models.TextField(max_length=8192)
    is_public = models.BooleanField()
    