from rest_framework import generics,  status
from rest_framework.response import Response
from ..models import *

from django.db.models import OuterRef, Subquery
from .serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from asgiref.sync import sync_to_async
from adrf.views import APIView as AsyncAPIView
import asyncio

class CreateSession(generics.CreateAPIView):
    queryset = AiSession.objects.filter()
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

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

class ListSessions(generics.ListCreateAPIView):
    serializer_class = ShowSessionsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        latest_message_subquery = Messages.objects.filter(
            session=OuterRef('pk')
        ).order_by('-timestamp').values('content')[:1]

        queryset = AiSession.objects.filter(belongs_to=self.request.user).annotate(
            last_message=Subquery(latest_message_subquery)
        )
        return queryset
    
class GetMessagesOfSession(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        query = self.kwargs.get("pk")
        return Messages.objects.filter(
            session=query
        ).order_by("timestamp").select_related(
            "session__chatbot",
            "session__persona"
        )
    
class DeleteSession(generics.DestroyAPIView):
    serializer_class = SessionByIDSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        session = get_object_or_404(AiSession, id=self.kwargs.get("pk"))
        if session.belongs_to_id != self.request.user.id:
            raise PermissionDenied("Not yours.")
        return session
