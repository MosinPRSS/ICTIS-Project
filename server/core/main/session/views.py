from rest_framework import generics
from ..models import *
from django.db.models import OuterRef, Subquery
from .serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated

class CreateSession(generics.CreateAPIView):
    queryset = AiSession.objects.filter()
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

class GenerateAnswer(generics.CreateAPIView):
    ...

class ListSessions(generics.ListCreateAPIView):
    serializer_class = SessionSerializer
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
        queryset = Messages.objects.filter(session_id=self.request.id).order_by("timestamp")

