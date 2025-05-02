from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class User_Extended(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to="img/user/")
    description = models.TextField(max_length=1024)

class Chatbots(models.Model):
    belongs_to = models.ForeignKey(to=User, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    avatar = models.ImageField(upload_to="img/bot/")
    
    description = models.TextField(max_length=16384)
    scenario = models.TextField(max_length=8192)
    first_message = models.TextField(max_length=3000)

    rate = models.IntegerField(default=0)
    is_public = models.BooleanField(default=False)
    public_description = models.TextField() # no generation

class Personas(models.Model):
    belongs_to = models.ForeignKey(to=User, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    avatar = models.ImageField(upload_to="img/personas/")
    description = models.TextField(max_length=8192)

class Sessions(models.Model):
    belongs_to = models.ForeignKey(to=User, on_delete=models.CASCADE)
    conversation_code = models.CharField(max_length=64)
    chatbot = models.ForeignKey(to=Chatbots, on_delete=models.CASCADE)
    conversation = models.JSONField(null=True)
