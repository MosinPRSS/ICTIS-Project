from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.conf import settings

class User(AbstractBaseUser):
    email = models.EmailField('email address', unique=True)
    username = models.CharField('username')
    date_joined = models.DateTimeField('date joined', auto_now_add=True)
    is_active = models.BooleanField('active', default=True)
    is_staff = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='img/user/', default="Default_Avatar.svg")
    description = models.TextField()

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
