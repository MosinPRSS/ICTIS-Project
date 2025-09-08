from rest_framework import serializers
from ..models import User
from rest_framework.validators import UniqueValidator

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    class Meta:
        model = User
        fields = [
            "id", "email", 
            "username", 
            "password", 
            "date_joined",
            "avatar", 
            "description", 
            "view_nsfw"
            ]
        extra_kwargs = {
            "password": {"write_only": True, "required": True},
            "username": {"required": True},
            "description": {"required": False},
            "email": {"write_only": True, "required": True},
            "view_nsfw": {"required": False}
        }

    def create(self, validated_data):
        user = User(
            email=validated_data["email"],
            username=validated_data["username"]
        )
        user.set_password(validated_data["password"])
        user.save()
        return user
    
    def update(self, instance, validated_data):
        if "password" in validated_data:
            instance.set_password(validated_data.pop("password"))
        
        # замена файла аватарки, чтобы на сервере не забивалось место под них
        new_avatar = validated_data.get('avatar', None)
        if new_avatar and instance.avatar:
            if instance.avatar.name != new_avatar.name and instance.avatar.storage.exists(instance.avatar.name):
                instance.avatar.delete(save=False)
        return super().update(instance, validated_data)
    

class ListUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username", 
            "date_joined",
            "avatar", 
            "description", 
        ]



    


