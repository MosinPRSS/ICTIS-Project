from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import UserManager
from django.conf import settings
from typing import *
from taggit.managers import TaggableManager
import uuid
from main.ai_modules.tokenizer import Tokenization
from asgiref.sync import sync_to_async

# class PublicDescription(models.Model)
#   belongs_to = bot | user
#   for users and bots

class User(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField('email address', unique=True)
    username = models.CharField('username')
    date_joined = models.DateTimeField('date joined', auto_now_add=True)
    is_active = models.BooleanField('active', default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='img/user/', default="Default_Avatar.svg")
    description = models.TextField()

    view_nsfw = models.BooleanField(default=False) # TODO: SOON

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
            return f"{settings.HOST_URL}/media/Default_Avatar.svg"
        
    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser


class Chatbots(models.Model):
    belongs_to = models.ForeignKey(to=User, on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.TextField(default="")
    chatname = models.TextField(default="")
    avatar = models.ImageField(upload_to="img/bot/", default="Default_Avatar.svg")
    
    description = models.TextField(max_length=16384)
    scenario = models.TextField(max_length=8192)
    first_message = models.TextField(max_length=3000)

    rate = models.IntegerField(default=0) # TODO
    is_public = models.BooleanField(default=False)
    hide_info = models.BooleanField(default=True) # TODO
    public_description = models.TextField(blank=True, default="") # no generation

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    tags = TaggableManager(blank=True)
    
class Favorites(models.Model):
    belongs_to = models.ForeignKey(to=User, on_delete=models.CASCADE)
    bot_id = models.ForeignKey(to=Chatbots, on_delete=models.CASCADE)

# class Tags(models.Model):
#    belongs_to = models.ForeignKey(to=Chatbots, on_delete=models.SET_NULL)

class Personas(models.Model):
    belongs_to = models.ForeignKey(to=User, on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=128)
    avatar = models.ImageField(upload_to="img/personas/", default="Default_Avatar.svg")
    description = models.TextField(max_length=8192)

class AiSession(models.Model):
    belongs_to = models.ForeignKey(to=User, on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    chatbot = models.ForeignKey(to=Chatbots, on_delete=models.CASCADE)
    persona = models.ForeignKey(to=Personas, on_delete=models.SET_NULL, null=True)

    # time working
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) # TODO - сделать возврат по времени для сортировки сессий пользователя

    # options part
    temperatute = models.FloatField(default=0.7)
    tokens = models.IntegerField(default=1000)

class Messages(models.Model):
    session = models.ForeignKey(to=AiSession, on_delete=models.CASCADE)
    content = models.TextField(default="")
    role = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    eval_count = models.IntegerField(default=0)
    
    @classmethod
    async def aget_recent_messages_with_token_limit(cls, session, token_limit=4000):
        messages = []
        total_tokens = 0
        tokenizer = Tokenization()

        async for msg in (
            cls.objects
            .filter(session_id=session)
            .order_by('-timestamp')
            .select_related('session')
            .aiterator()
        ):
            msg_tokens = tokenizer.deepseek_tokens(msg.content)

            if total_tokens + msg_tokens > token_limit:
                break

            messages.append(msg)
            total_tokens += msg_tokens

        return list(reversed(messages))
    
    
class PreviousVersionMessage(models.Model):
    # TODO SOON
    message_id = models.ForeignKey(to=Messages, on_delete=models.CASCADE)
    content = models.TextField(default="")
    timestamp = models.DateTimeField(auto_now_add=True)

class AiLogging(models.Model):
    code = models.IntegerField()
    description = models.CharField(max_length=64, default="null")
    timestamp = models.DateTimeField(auto_now_add=True)

class ServerLogging(models.Model):
    # TODO
    timestamp = models.DateTimeField(auto_now_add=True)


