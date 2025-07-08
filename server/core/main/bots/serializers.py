from rest_framework import serializers
from ..models import *
from taggit.serializers import (TagListSerializerField,
                                TaggitSerializer)
from taggit.models import Tag

class BotSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    class Meta:
        model = Chatbots
        fields = [
            "id",
            "name", 
            "avatar",
            "public_description",
            "first_message",
            "description", 
            "scenario",
            "hide_info",
            "is_public",
            "tags",
        ]
        extra_kwargs = {
            "id": {"read_only": True},
            "name": {"required": True},
            "description": {"required": True},
            "avatar": {"required": False},
            "is_public": {"required": True},
            "hide_info": {"required": True},
            "first_message" : {"required": True},
            "scenario": {"required": False},
            "public_description": {"required": False},
            "tags": {"required": False}
        }
    def create(self, validated_data):
        validated_data["belongs_to"] = self.context["request"].user
        return super().create(validated_data)

class ShowBotSerializer(TaggitSerializer, serializers.ModelSerializer):
    bot_owner = serializers.CharField(source='belongs_to.username', read_only=True)
    avatar_owner = serializers.CharField(source='belongs_to.avatar_url', read_only=True)
    user_id = serializers.CharField(source='belongs_to.id', read_only=True)
    tags = TagListSerializerField()
    class Meta:
        model = Chatbots
        fields = [
            "id",
            "name", 
            "avatar",
            "public_description",
            "first_message",
            "description", 
            "scenario",
            "hide_info",
            "is_public",
            "tags",
            "bot_owner",
            "avatar_owner",
            "user_id"
        ]
        extra_kwargs = {
            "id": {"read_only": True},
            "name": {"required": True},
            "description": {"required": True},
            "avatar": {"required": False},
            "is_public": {"required": True},
            "hide_info": {"required": True},
            "first_message" : {"required": True},
            "scenario": {"required": False},
            "public_description": {"required": False},
            "tags": {"required": False}
        }
    def create(self, validated_data):
        validated_data["belongs_to"] = self.context["request"].user
        return super().create(validated_data)
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.hide_info:
            allowed_fields = ["id", "name", "public_description", "avatar", "hide_info", "is_public", "tags"]
            filtered_data = {field: data[field] for field in allowed_fields if field in data}
            return filtered_data

        return data
        
class BotUpdateSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    class Meta:
        model = Chatbots
        fields = [
            'name', 'avatar', 'description', 'scenario',
            'first_message', 'is_public', 'hide_info', 'public_description', 'tags'
        ]
        extra_kwargs = {
            field: {'required': False} for field in fields 
        }


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

