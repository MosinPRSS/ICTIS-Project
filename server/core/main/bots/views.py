from rest_framework import generics
from ..models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import NotFound
from django.contrib.postgres.search import SearchVector
from django.db.models import Q

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
            raise NotFound("This bot isnot yours.")
        
class GetBot(generics.RetrieveAPIView):
    serializer_class = BotSerializer
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
        return Chatbots.objects.filter(is_public=True).select_related('belongs_to')
    
class ListPublicBotsToNotRegistered(generics.ListCreateAPIView): 
    serializer_class = PublicBotSerializerNotRegistered
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Chatbots.objects.filter(is_public=True).select_related('belongs_to').only('id', 'name', 'public_description', 'avatar', 'belongs_to__username', 'belongs_to__avatar')

        
class ListUserBots(generics.ListCreateAPIView):
    serializer_class = BotUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Chatbots.objects.filter(belongs_to=self.request.user)
    
class SearchBots(generics.ListCreateAPIView):
    serializer_class = BotSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Chatbots.objects.filter(is_public=True)
        query = self.request.query_params.get("query", None)
        try:
            return queryset.filter(Q(name__icontains=query) | Q(public_description__icontains=query))
        except AttributeError as e:
            return f"Nothing found: {e}"

class DeleteBot(generics.DestroyAPIView):
    serializer_class = BotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Chatbots.objects.filter(belongs_to=self.request.user)