from django.contrib.auth.models import User
from .models import BotData
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny 


from .serializers import UserSerializer, BotSerializer


class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CreateBot(generics.CreateAPIView):
    queryset = BotData.objects.all()
    serializer_class = BotSerializer
    permission_classes = [AllowAny]

class DeleteBot(generics.DestroyAPIView):
    serializer_class = BotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return BotData.objects.filter(user=user)