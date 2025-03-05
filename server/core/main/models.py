from django.db import models
from django.contrib.auth.models import User

user_folder = User.get_username()

class user_files(models.Model):
    user_description = models.TextField(max_length=2048)
    avatar = models.ImageField(upload_to=f"{user_folder}/")
    chats = models.FileField()
    personas = models.FileField()
    user_data = models.ForeignKey(to="User")

class bots(models.Model):
    botname = models.TextField(max_length=50)
    public_description = models.TextField(max_length=2048)
    description = models.TextField(max_length=8192) # for prompt generation
    avatar = models.ImageField(upload_to=f"{botname}/")
    chat_count = models.IntegerField()
