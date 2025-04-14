from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class UserData(models.Model):
    account = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(to="/img/users")

class Personas(models.Model):
    user = models.ForeignKey(to=UserData, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    description = models.TextField(max_length=1024)
    persona_avatar = models.ImageField(upload_to="avatars/personas/")

# re-work chat models
class ChatsData(models.Model):
    ...

    