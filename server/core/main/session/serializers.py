from ..models import *
from rest_framework import serializers
from main.ai_modules.collector import PromptTools as pt
   
class SessionSerializer(serializers.ModelSerializer):
    last_message = serializers.CharField(read_only=True)
    chatbot_name = serializers.CharField(source="chatbot.name", read_only=True)
    persona_name = serializers.CharField(source="persona.name", read_only=True)
    class Meta:
        model = AiSession
        fields = [
            "id",
            "chatbot",
            "chatbot_name",
            "persona",
            "persona_name",
            "belongs_to",
            "last_message",
        ]
        extra_kwargs = {
            "chatbot": {"required": True},
            "persona": {"required": True},
            "persona_name": {"read_only": True},
            "belongs_to": {"read_only": True}
        }
    def create(self, validated_data):
        chatbot = validated_data.get('chatbot')
        persona = validated_data.get('persona')
        user = self.context['request'].user

        if not chatbot.is_public and chatbot.belongs_to != user:
            raise serializers.ValidationError({
                "error": "This bot not belongs you"
            })
        validated_data['belongs_to'] = user
        session = super().create(validated_data)

        fst_message = pt.analyze_first_message(
            chatbot.first_message, 
            chatbot.name, 
            persona.name
        )
        if fst_message:
            Messages.create_message(
                role="assistant",
                content=fst_message
            )
        return session
    
class GenerateAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = [
            'session',
            'content',
            'role', # i.e. persona or bot
        ]
        extra_kwargs = {
            "role": {"read_only": True}
        }
    
    def create(self, validated_data):
        session = validated_data['session']
        content = validated_data['content'] 
        queryset = Messages.objects.filter(session=session) [:10]
        role = None
        if session.persona and session.persona.name:
            role = session.persona.name
        else:
            role = session.belongs_to.username

        validated_data['role'] = "role"

        return super().create(validated_data)

