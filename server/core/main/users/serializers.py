from rest_framework import serializers
from ..models import User
from rest_framework.validators import UniqueValidator

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    avatar = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = [
            "id", "email", 
            "username", 
            "password", 
            "date_joined",
            "avatar", 
            "description", 
            ]
        extra_kwargs = {
            "password": {"write_only": True, "required": True},
            "username": {"required": True},
            "description": {"required": False},
            "email": {"write_only": True, "required": True},
        }

    def create(self, validated_data):
        user = User(
            email=validated_data["email"],
            username=validated_data["username"]
        )
        user.set_password(validated_data["password"])
        user.save()
        return user
    
    def get_avatar(self, obj):
        request = self.context.get('request')
        if obj.avatar and request:
            return request.build_absolute_uri(obj.avatar.url)
        return None

class UserUpdateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    class Meta:
        model = User
        fields = ["email", "username", "password", "avatar", "description"]
        extra_kwargs = {
            "password": {"write_only": True, "required": False},
            "username": {"required": True},
            "description": {"required": False},
            "email": {"required": True},
        }

    def update(self, instance, validated_data):
        if "password" in validated_data:
            instance.set_password(validated_data.pop("password"))

        if "avatar" in validated_data:
            new_avatar = validated_data["avatar"]
            old_avatar = instance.avatar

            if old_avatar and old_avatar.name != "Default_Avatar.svg":
                if old_avatar.storage.exists(old_avatar.name):
                    old_avatar.delete(save=False)

        
        return super().update(instance, validated_data)

class ListUsersSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = [
            "id",
            "username", 
            "date_joined",
            "avatar", 
            "description", 
        ]
    
    def get_avatar(self, obj):
        request = self.context.get('request')
        if obj.avatar and request:
            return request.build_absolute_uri(obj.avatar.url)
        return None



    


