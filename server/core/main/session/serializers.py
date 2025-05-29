from ..models import *
from rest_framework import serializers

class SendMessage(serializers.Serializer):
    user_message = serializers.CharField()
    id = serializers.IntegerField() # conv
    temperature = serializers.FloatField()
    top_k = serializers.FloatField()
    max_length = serializers.IntegerField()

def generate_session_code(length=32):
        return ''.join(random.choices(string.ascii_letters + string.digits, k=length))
   
class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AiSession
        fields = [
            "id",
            "chatbot"
        ]
        extra_kwargs = {
            "chatbot": {"required": True}
        }
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['session_code'] = generate_session_code()
        validated_data['belongs_to'] = user
        return super().create(validated_data)

