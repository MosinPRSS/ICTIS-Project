from rest_framework import serializers
from ..models import Chatbots
class BotSerializer(serializers.ModelSerializer):
    bot_owner = serializers.CharField(source='belongs_to.username', read_only=True)
    avatar_owner = serializers.CharField(source='belongs_to.avatar_url', read_only=True)

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
            "is_public",
            "bot_owner",
            "avatar_owner"
        ]
        extra_kwargs = {
            "name": {"required": True},
            "description": {"required": True},
            "avatar": {"required": False},
            "is_public": {"required": True},
            "first_message" : {"required": True},
            "scenario": {"required": False},
            "public_description": {"required": False}
        }
    def create(self, validated_data):
        validated_data["belongs_to"] = self.context["request"].user
        return super().create(validated_data)

class PublicBotSerializerNotRegistered(serializers.ModelSerializer):
    bot_owner = serializers.CharField(source='belongs_to.username', read_only=True)
    avatar_owner = serializers.CharField(source='belongs_to.avatar_url', read_only=True)

    class Meta:
        model = Chatbots
        fields = ['id', 'name', 'public_description', 'avatar', 'bot_owner', 'avatar_owner']
        
class BotUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chatbots
        fields = [
            'name', 'avatar', 'description', 'scenario',
            'first_message', 'is_public', 'public_description'
        ]
        extra_kwargs = {
            field: {'required': False} for field in fields 
        }
