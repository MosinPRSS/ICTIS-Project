from rest_framework import generics
from ..models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound

class CreateBot(generics.CreateAPIView):
    queryset = Chatbots.objects.all()
    serializer_class = BotSerializer
    permission_classes = [IsAuthenticated] 

    def perform_create(self, serializer):
        serializer.save(belongs_to=self.request.user)

class UpdateBot(generics.UpdateAPIView):
    serializer_class = BotUpdateSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Chatbots.objects.filter(belongs_to=self.request.user)
    
    def get_object(self):
        bot_id = self.kwargs.get("pk")
        try:
            return self.get_queryset().get(id=bot_id)
        except Chatbots.DoesNotExist:
            raise NotFound("Такого бота у Вас нет.")

class ListPublicBots(generics.ListCreateAPIView): 
    serializer_class = BotSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Chatbots.objects.filter(is_public=True)
    
class ListUserBots(generics.ListCreateAPIView):
    serializer_class = BotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Chatbots.objects.filter(belongs_to=self.request.user)

class DeleteBot(generics.DestroyAPIView):
    serializer_class = BotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Chatbots.objects.filter(belongs_to=self.request.user)