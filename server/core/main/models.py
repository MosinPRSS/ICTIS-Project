from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import UserManager
from django.conf import settings
import random, string

# Отсюда будут браться компоненты для отправки сообщений.
# Возможно, будем использовать и другие модели, поэтому сделаем свою реализацию взаимодействия
# подобно ollama-lib и другим.
# from .ai_modules.response import *
import asyncio

class User(AbstractBaseUser):
    email = models.EmailField('email address', unique=True)
    username = models.CharField('username')
    date_joined = models.DateTimeField('date joined', auto_now_add=True)
    is_active = models.BooleanField('active', default=True)
    is_staff = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='img/user/', default="Default_Avatar.svg")
    description = models.TextField()

    objects = UserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def get_username(self):
        """
        Return The Username of User
        """
        return self.username
    
    @property
    def avatar_url(self):
        if self.avatar and hasattr(self.avatar, 'url'):
            return self.avatar.url
        else:
            return f"{settings.MEDIA_URL}img/Default_Avatar.svg"


class Chatbots(models.Model):
    belongs_to = models.ForeignKey(to=User, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    avatar = models.ImageField(upload_to="img/bot/", default="Default_Avatar.svg")
    
    description = models.TextField(max_length=16384)
    scenario = models.TextField(max_length=8192)
    first_message = models.TextField(max_length=3000)

    rate = models.IntegerField(default=0)
    is_public = models.BooleanField(default=False)
    hide_info = models.BooleanField(default=False)
    public_description = models.TextField() # no generation

class Personas(models.Model):
    belongs_to = models.ForeignKey(to=User, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    avatar = models.ImageField(upload_to="img/personas/")
    description = models.TextField(max_length=8192)

# rework 
class AiSession(models.Model):
    belongs_to = models.ForeignKey(to=User, on_delete=models.CASCADE)
    chatbot = models.ForeignKey(to=Chatbots, on_delete=models.CASCADE)
    session_code = models.CharField(max_length=32)

    # time working
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    messages = models.JSONField(null=True)
    
    async def _prepare_message(
            self, message: str, role: str = "user",
            ) -> str:
        """
        Пользователь отправляет сообщение...
        """
        return f"{role}: {message}"
    async def _handle(self, message):
        user_message = self._prepare_message(message=message)
        
        # take all messages and etc...