from rest_framework import serializers
from ..models import Chatbots
class BotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chatbots
        fields = [
            "id",
            "name", 
            "public_description",
            "first_message",
            "description", 
            "scenario",
            "is_public"
        ]
        extra_kwargs = {
            "name": {"required": True},
            "description": {"required": True},
            "is_public": {"required": True},
        }
    def create(self, validated_data):
        validated_data["belongs_to"] = self.context["request"].user
        return super().create(validated_data)
        
class BotUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chatbots
        fields = [
            "name",
            "public_description",
            "description",
            "first_message",
            "avatar",
            "scenario",
            "is_public"
        ]