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
            'name', 'avatar', 'description', 'scenario',
            'first_message', 'is_public', 'public_description'
        ]
        extra_kwargs = {
            field: {'required': False} for field in fields 
        }

    def validate_name(self, value):
        user = self.context['request'].user
        instance = self.instance

        if instance.name != value:
            if Chatbots.objects.filter(name=value).exclude(pk=instance.pk).exists():
                raise serializers.ValidationError("Бот с таким именем уже существует.")
        return value