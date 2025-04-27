from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *
from rest_framework.validators import UniqueValidator


# --- USERS Settings
class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    class Meta:
        model = User
        fields = ["email", "username", "password"]
        extra_kwargs = {
            "password": {"write_only": True, "required": True},
            "username": {
                "required": True,
                "validators": [UniqueValidator(queryset=User.objects.all())]
            }
        }

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class UserExtendedSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Extended
        fields = ['avatar', 'description']   



    


