from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import BotData

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "username", "password"]
        extra_kwargs = {
            "email": {"required": True},
            "password": {"write_only": True}
            }
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
            "id",
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



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = User.EMAIL_FIELD
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['name'] = User.username()

        return token
    def validate(cls, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        try:
            user = get_user_model().objects.get(email=email)
        except get_user_model().DoesNotExist:
            raise AuthenticationFailed('No active account found with the given credentials')

        if not user.check_password(password):
            raise AuthenticationFailed('No active account found with the given credentials')

        if not user.is_active:
            raise AuthenticationFailed('This account is inactive')

        refresh = RefreshToken.for_user(user)
        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }


    


