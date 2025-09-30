from rest_framework import generics,  status
from rest_framework.response import Response
from ..models import *

from django.db.models import OuterRef, Subquery
from .serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import PermissionDenied, NotFound
from django.shortcuts import get_object_or_404
from asgiref.sync import sync_to_async
from adrf.views import APIView as AsyncAPIView

import asyncio
import datetime

class CreateSession(generics.CreateAPIView):
    queryset = AiSession.objects.filter()
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

class ListSessions(generics.ListCreateAPIView):
    serializer_class = ShowSessionsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        latest_session_per_bot = AiSession.objects.filter(
            belongs_to=self.request.user,
            chatbot=OuterRef('chatbot')
        ).order_by('-updated_at').values('pk')[:1]

        latest_sessions = AiSession.objects.filter(
            belongs_to=self.request.user,
            pk__in=Subquery(latest_session_per_bot)
        )
        
        # последнее сообщение
        latest_message_subquery = Message.objects.filter(
            session=OuterRef('pk')
        ).order_by('-timestamp').values('content')[:1]

        return latest_sessions.annotate(
            last_message=Subquery(latest_message_subquery)
        )

class ListSessionsByBot(generics.ListCreateAPIView):
    serializer_class = ShowSessionsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        bot_id = self.kwargs.get("pk")
        if bot_id == None:
            raise NotFound("No chats with this bot")
        latest_message_subquery = Message.objects.filter(
            session=OuterRef('pk')
        ).order_by('-timestamp').values('content')[:1]

        queryset = AiSession.objects.filter(
            belongs_to=self.request.user,
            chatbot=self.kwargs.get("pk")
            ).annotate(
            last_message=Subquery(latest_message_subquery)
        )
        return queryset
    
class UpdateSession(generics.UpdateAPIView):
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            queryset =  AiSession.objects.filter(
                belongs_to=self.request.user,
                id=self.kwargs.get("pk")
            )
            return queryset
        except Exception:
            raise NotFound({"error": "Session not found"})
    
class DeleteSession(generics.DestroyAPIView):
    serializer_class = SessionByIDSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        session = get_object_or_404(AiSession, id=self.kwargs.get("pk"))
        if session.belongs_to_id != self.request.user.id:
            raise PermissionDenied("Not yours.")
        return session
    
# Messages section
    
class GetMessagesOfSession(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        query = self.kwargs.get("pk")
        return Message.objects.filter(
            session=query
        ).order_by("timestamp").select_related(
            "session__chatbot",
            "session__persona"
        )

class GenerateAnswer(AsyncAPIView):
    permission_classes = [IsAuthenticated]

    async def post(self, request, *args, **kwargs):
        serializer = GenerateAnswerSerializer(data=request.data)

        is_valid = await sync_to_async(serializer.is_valid)(raise_exception=False)
        
        if is_valid:
            try:
                message = await serializer.create(serializer.validated_data)
                return Response({
                    'id': message.id,
                    'content': message.content,
                    'role': message.role,
                    'timestamp': message.timestamp,
                    'eval_count': message.eval_count
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                print(f"debug: {e}")
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UpdateMessage(generics.UpdateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        query = self.kwargs.get("pk")
        return Message.objects.filter(session__belongs_to=self.request.user, id=query)
    
class DeleteMessage(generics.DestroyAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Message.objects.filter(session__belongs_to=self.request.user)
    
    def destroy(self, request, *args, **kwargs):
        message = self.get_object()
        Message.objects.filter(
            session=message.session,
            id__gte=message.id
        ).delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
         

    