from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class UserData(models.Model):
    account = models.OneToOneField(User, on_delete=models.CASCADE)
    description = models.TextField(max_length=2048)
    user_image = models.ImageField(upload_to="avatars/users/")
    


class Personas(models.Model):
    username = models.ForeignKey(to=UserData, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    description = models.TextField(max_length=1024)
    persona_avatar = models.ImageField(upload_to="avatars/personas/")


class BotData(models.Model):
    botname = models.CharField(max_length=128, unique=True)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)

    pub_desc = models.TextField(max_length=2048)
    description = models.TextField(max_length=8192)
    scenario = models.TextField(max_length=4096, default=" ")
    first_message = models.TextField(max_length=2048, default=" ")

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    is_public = models.BooleanField()
    rating = models.IntegerField(default=0)

class ChatsData(models.Model):
    role = models.TextField()
    sent_time = models.DateTimeField(auto_now=True)
    chat_number = models.IntegerField()

    