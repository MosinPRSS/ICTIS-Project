from ..models import *
from rest_framework import serializers

def generate_session_code(length=32):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))
   
class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AiSession
        fields = [
            "id",
            "session_code",
            "chatbot",
            "persona",
            "belongs_to",
        ]
        extra_kwargs = {
            "session_code": {"read_only": True},
            "chatbot": {"required": True},
            "persona": {"required": False},
            "persona_name": {"read_only": True},
            "belongs_to": {"read_only": True}
        }
    def create(self, validated_data):
        chatbot = validated_data.get('chatbot')
        user = self.context['request'].user

        if not chatbot.is_public and chatbot.belongs_to != user:
            raise serializers.ValidationError({
                "error": "This bot dont belongs you"
            })
        validated_data['session_code'] = generate_session_code()
        validated_data['belongs_to'] = user
        session = super().create(validated_data)

        fst_message = chatbot.first_message
        if fst_message:
            Messages.objects.create(
                session=session,
                role=f"{chatbot.name} (BOT)",
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
        queryset = Messages.objects.all() [50:]
        session = validated_data['session']
        content = validated_data['content'] 
        role = None
        if session.persona and session.persona.name:
            role = session.persona.name
        else:
            role = session.belongs_to.username

        validated_data['role'] = role

        return super().create(validated_data)

