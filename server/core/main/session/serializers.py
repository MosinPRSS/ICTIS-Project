from ..models import *
from rest_framework import serializers

class SendMessage(serializers.Serializer):
    user_message = serializers.CharField()
    id = serializers.IntegerField() # conv
    temperature = serializers.FloatField()
    top_k = serializers.FloatField()
    max_length = serializers.IntegerField()
    
class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sessions
        fields = [
            "id",
            "conversation_code",
            "chatbot",
        ]
        def create(self, validated_data):
            validated_data["belongs_to"] = self.context["request"].user
            return super().create(validated_data)
        

