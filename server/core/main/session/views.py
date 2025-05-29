from rest_framework import generics
# from ..models import AiSession
from .serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated

class CreateSession(generics.CreateAPIView):
    queryset = AiSession.objects.filter()
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

