from django.db import models
from django.contrib.auth.models import User


class UserData(models.Model):
    account = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to="avatars/users", verbose_name=User.username)
    


class Personas(models.Model):
    username = models.ForeignKey(to=UserData, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    description = models.TextField()


class BotData(models.Model):
    botname = models.CharField(max_length=128)
    pub_desc = models.TextField(max_length=2048)
    description = models.TextField(max_length=8192)
    