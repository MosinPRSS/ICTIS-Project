from main.ai_modules.tokenizer import Tokenization
from main.ai_modules.services import OllamaAPI
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
            eval_c = Tokenization().deepseek_tokens(fst_message)
            Messages.objects.create(
                session_id=session,
                role="assistant",
                content=fst_message,
                eval_count=eval_c
            )
        return session
    
class GenerateAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = [
            'session',
            'content',
            'role',
        ]
        extra_kwargs = {
            "role": {"read_only": True}
        }

    def create(self, validated_data):
        session = validated_data['session']
        user_input = validated_data['content']

        user_message = Messages.objects.create(
            session_id=session,
            content=user_input,
            role="user",
            eval_count=Tokenization().deepseek_tokens(user_input)
        )

        api = OllamaAPI(model_name=session.chatbot.model_name)

        import asyncio
        response_data = asyncio.run(api.send_message(
            user_prompt=session.chatbot.prompt,
            session_id=session.id,
            user_input=user_input,
            temperature=session.temperatute,
            tokens=session.tokens,
            char_name=session.persona.name if session.persona else None,
            char_desc=session.persona.description if session.persona else None,
            pers_name=session.belongs_to.username
        ))

        ai_content: dict = ""
        eval_count = 0
        
        if response_data and "message" in response_data:
            ai_content = response_data["message"].get("content", "")
            eval_count = response_data.get("eval_count", 0)

        ai_message = Messages.objects.create(
            session_id=session,
            content=ai_content,
            role="assistant",
            eval_count=eval_count
        )

        return ai_message
    
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SessionSerializer
        field = [
            "id"
        ]
