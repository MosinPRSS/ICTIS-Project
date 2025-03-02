from django.db import models

# Create your models here.
class users(models.Model):
    username = models.CharField(max_length=40, unique=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    auth = models.ForeignKey('auth', on_delete=models.CASCADE)
    

class sessions(models.Model):
    session_id = models.TextField() # в sha-256 или это приватный ключ RSA

class bots(models.Model):
    ...

class auth(models.Model):
    ...

class personas(models.Model):
    ...