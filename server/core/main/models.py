from django.db import models
from django.contrib.auth.models import User


class user_files(models.Model):
    user_description = models.TextField(max_length=2048)
    avatar = models.ImageField(upload_to=f"avatars/") # по юзернейму
    chats = models.FileField(upload_to=f"chats/")
    personas = models.FileField(upload_to=f"personas/")
    user_data = models.ForeignKey(to="User", on_delete=models.CASCADE)

    def __str__(self):
        return

class bots(models.Model):
    botname = models.TextField(max_length=256)
    public_description = models.TextField(max_length=2048)
    description = models.TextField(max_length=8192) # for prompt generation
    avatar = models.ImageField(upload_to=f"{botname}/")
    chat_count = models.IntegerField()