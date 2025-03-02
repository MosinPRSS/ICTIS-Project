from django.db import models
import os

def user_directory_path(instance, filename): # по идее ЭТО решение?
    return 'user_{0}/{1}'.format(instance.user.id, filename)

class users(models.Model):
    username = models.CharField(max_length=40, unique=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    auth = models.ForeignKey('auth', on_delete=models.CASCADE)
    data = models.ForeignKey('user_files', on_delete=models.CASCADE)
    

class sessions(models.Model):
    # token = models.TextField() # в sha-256 или это приватный ключ RSA
    # username = models.ForeignKey() # сослаться на users
    ...

class bots(models.Model):
    botname = models.CharField(max_length=40, unique=True)
    description = models.TextField(max_length=2000)
    public_desc = models.TextField(max_length=2000) 
    scenario = models.TextField(max_length=2000)
    


class auth(models.Model):
    email = models.EmailField(max_length=254, unique=True)
    updated_at = models.DateField(auto_now=True)
    password = models.TextField()

class user_files(models.Model):
    avatar = models.ImageField(upload_to=user_directory_path) # подумоть
    personas = models.FileField(upload_to=user_directory_path) # подумоть
    chats = models.FileField(upload_to=user_directory_path) # подумоть    
    