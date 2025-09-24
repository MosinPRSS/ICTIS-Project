from rest_framework import serializers

from main.users.serializers import ListUsersSerializer
from ..models import *
from taggit.serializers import (TagListSerializerField,
                                TaggitSerializer)
from taggit.models import Tag

class BotSerializer(serializers.ModelSerializer, TaggitSerializer):
    tags = TagListSerializerField()
    class Meta:
        model = Chatbot
        fields = [
            "id",
            "chatname",
            "name",
            "avatar",
            "hide_info",
            "is_public",
            "description",
            "public_description",
            "first_message",
            "scenario",
            "tags"
        ]
        extra_kwargs = {
            "id": {"read_only": True},
            "chatname": {"required": True},
            "name": {"required": True},
            "description": {"required": True},
            "avatar": {"required": False},
            "is_public": {"required": True},
            "hide_info": {"required": True},
            "first_message": {"required": True},
            "scenario": {"required": False},
            "public_description": {"required": False},
            "tags": {"required": False},
        }

    def create(self, validated_data):
        validated_data["belongs_to"] = self.context["request"].user
        instance = super().create(validated_data)
        return instance

        
class BotUpdateSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    class Meta:
        model = Chatbot
        fields = '__all__'
        extra_kwargs = {
            field: {'required': False} for field in fields
        }

class PublicBotSerializer(serializers.ModelSerializer, TaggitSerializer):
    user = ListUsersSerializer(source='belongs_to', read_only=True)
    session_count = serializers.IntegerField(read_only=True)
    tags = TagListSerializerField()
    class Meta:
        model = Chatbot
        fields = [
            'id',
            'name',
            'chatname',
            'avatar',
            'public_description',
            'description',
            'scenario',
            'first_message',
            'created_at',
            'updated_at',
            'rate',
            'hide_info',
            'is_public',
            'tags',
            'session_count',
            'user'
        ]
    
    def to_representation(self, instance):
        data = super().to_representation(instance)

        request = self.context.get('request')
        user = request.user if request else None
        if instance.hide_info and (not request.user.is_authenticated or instance.belongs_to != request.user):
            allowed_fields = [
                "id", "name", "public_description", 
                "avatar", "hide_info", 
                "is_public",
                "created_at",
                "updated_at",
                "rate",
                "session_count",
                "tags",
                "user",
                ]
            filtered_data = {field: data[field] for field in allowed_fields if field in data}
            return filtered_data
        return data


class TagSerializer(serializers.ModelSerializer):
    # will try to return most used tags
    num_times = serializers.IntegerField()
    class Meta:
        model = Tag
        fields = [
            'name',
            'num_times'
        ]
        extra_kwargs = {
            'num_times': {"write_only": True}
        }

class SessionSerializer(serializers.ModelSerializer):
    num_times = serializers.IntegerField()
    class Meta:
        model = AiSession
        fields = [
            "num_times"
        ]
        extra_kwargs = {
            'num_times': {'write_only': True}
        }
