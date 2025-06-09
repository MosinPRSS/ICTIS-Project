from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import UserManager
from django.conf import settings
import random, string
from typing import Optional
from taggit.managers import TaggableManager


# Отсюда будут браться компоненты для отправки сообщений.
# Возможно, будем использовать и другие модели, поэтому сделаем свою реализацию взаимодействия
# подобно ollama-lib и другим.
import asyncio
from .ai_modules.ollama_service import *

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
            return f"{settings.MEDIA_URL}/Default_Avatar.svg"


class Chatbots(models.Model):
    belongs_to = models.ForeignKey(to=User, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    avatar = models.ImageField(upload_to="img/bot/", default="Default_Avatar.svg")
    
    description = models.TextField(max_length=16384)
    scenario = models.TextField(max_length=8192)
    first_message = models.TextField(max_length=3000)

    rate = models.IntegerField(default=0)
    is_public = models.BooleanField(default=False)
    hide_info = models.BooleanField(default=False) # TODO
    public_description = models.TextField() # no generation

    tags = TaggableManager(blank=True)

class Personas(models.Model):
    belongs_to = models.ForeignKey(to=User, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    avatar = models.ImageField(upload_to="img/personas/", default="Default_Avatar.svg")
    description = models.TextField(max_length=8192)

# rework 
class AiSession(models.Model):
    belongs_to = models.ForeignKey(to=User, on_delete=models.CASCADE)
    chatbot = models.ForeignKey(to=Chatbots, on_delete=models.CASCADE)
    session_code = models.CharField(max_length=32)
    persona = models.ForeignKey(to=Personas, on_delete=models.SET_NULL, null=True)

    # time working
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # options part
    temperatute = models.FloatField(default=0.7)
    tokens = models.IntegerField(default=2000)
    # top_k = models.FloatField()
    # top_p = models.FloatField()
    
    async def _prepare_message(
            self, message: str, role: Optional[str] = None,
            ) -> str:
        if role is None:
            if self.persona and self.persona.name:
                role = self.persona.name
            else:
                role = self.belongs_to.username

        return f"{role}: {message}"
    
    async def _handle(self, message):
        """
        Пользователь отправляет сообщение...
        """
        user_message = self._prepare_message(message=message)
        
        # take all messages and etc...

class Messages(models.Model):
    session = models.ForeignKey(to=AiSession, on_delete=models.CASCADE)
    content = models.TextField()
    previous_versions = models.TextField()
    role = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)