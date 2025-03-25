from rest_framework import serializers
from rest_framework import response
from django.contrib.auth.models import User
from .models import BotData

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}
    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class BotSerializer(serializers.ModelSerializer):
    class Meta:
        model = BotData
        fields = [
            "botname", 
            "pub_desc", 
            "user", 
            "description", 
            "scenario",
            "is_public",
            "created_at"
            ]
        extra_kwargs = {
            "user": {"write_only": True},
            "botname": {"required": True},
            "description": {"required": True},
            "is_public": {"required": True},
        }

    


