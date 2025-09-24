from main.ai_modules.tokenizer import Tokenization
from main.ai_modules.services import OllamaAPI
from main.ai_modules.templates import Templates
from main.persona.serializers import PersonaSerializer
from main.bots.serializers import PublicBotSerializer
from ..models import *
from rest_framework import serializers
from main.ai_modules.collector import PromptTools as pt
import asyncio
   
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
            "last_message",
        ]
        extra_kwargs = {
            "chatbot": {"required": True},
            "persona": {"required": True},
            "persona_name": {"read_only": True},
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
            Message.objects.create(
                session=session,
                role="assistant",
                content=fst_message,
                eval_count=eval_c
            )
        return session
    
class GenerateAnswerSerializer(serializers.ModelSerializer):
    session = serializers.UUIDField(write_only=True)
    
    class Meta:
        model = Message
        fields = [
            "session",
            "content",
            "role",
        ]
        extra_kwargs = {
            "role": {"read_only": True}
        }

    async def create(self, validated_data):
        session_id = validated_data.pop("session")

        try:
            session_obj = await AiSession.objects.select_related(
                "chatbot", "persona", "belongs_to"
            ).aget(id=session_id)
        except AiSession.DoesNotExist:
            raise serializers.ValidationError({"session": "Session not found"})
        
        user_input = validated_data["content"]

        tokenizer = Tokenization()
        token_count = await tokenizer.adeepseek_tokens(user_input)

        system_prompt = Templates().SYSTEM_PROMPT
        api = OllamaAPI(model_name="qwen3:8b")

        response_data = await api.send_message(
            system_prompt=system_prompt,
            session_id=session_obj.id,
            user_input=user_input,
            temperature=session_obj.temperatute,
            tokens=session_obj.tokens,
            char_name=session_obj.chatbot.name,
            char_desc=session_obj.chatbot.description,    
            char_scenario=session_obj.chatbot.scenario,
            pers_name=session_obj.persona.name if session_obj.persona else session_obj.belongs_to.username,
            pers_desc=session_obj.persona.description if session_obj.persona else "",
        )

        if not response_data or "message" not in response_data:
            raise serializers.ValidationError({"detail": "AI service unavailable"})

        ai_content = response_data["message"].get("content", "")
        eval_count = response_data.get("eval_count", 0)

        user_message = await Message.objects.acreate(
            session=session_obj,
            content=user_input,
            role="user",
            eval_count=token_count,
        )

        ai_message = await Message.objects.acreate(
            session=session_obj,
            content=ai_content,
            role="assistant",
            eval_count=eval_count,
        )

        return ai_message
    
class MessageSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = [
            "id",
            "session",
            "role",
            "name",
            "avatar",
            "content",
            "timestamp",
            "eval_count",
        ]
        
    def get_name(self, obj):
        if obj.role == "user":
            return obj.session.chatbot.name
        else:
            return obj.session.persona.name \
                if obj.session.persona else None
        
    def get_avatar(self, obj):
        if obj.role == "user":
            return obj.session.chatbot.avatar.url
        else:
            return obj.session.persona.avatar.url \
                if obj.session.persona else \
                   obj.session.belongs_to.avatar.url

class ShowSessionsSerializer(serializers.ModelSerializer):
    last_message = serializers.CharField(read_only=True)
    persona = PersonaSerializer(read_only=True)
    chatbot = PublicBotSerializer(read_only=True)
    class Meta:
        model = AiSession
        fields = [
            "id",
            "last_message",
            "chatbot",
            "persona"
        ]

class SessionByIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = AiSession
        fields = [
            "session"
        ]