from rest_framework import generics
from rest_framework.response import Response
from ..models import *
from .serializers import *
from ..bots.serializers import BotSerializer, PublicBotSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Q
from django.contrib.auth import get_user_model
from rest_framework.exceptions import NotFound

user_var = get_user_model()

class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserDetailView(generics.RetrieveAPIView):
    """
    Получение пользователя и его публичных ботов по UUID.
    URL: /u/<uuid:pk>/
    """
    serializer_class = ListUsersSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def get_queryset(self):
        return user_var.objects.all()

    def retrieve(self, request, *args, **kwargs):
        try:
            user = self.get_object()  # автоматически ищет по pk
        except user_var.DoesNotExist:
            raise NotFound("User not found")
        
        is_own_profile = user == request.user

        if is_own_profile:
            bots = Chatbot.objects.filter(belongs_to=user)
        else:
            bots = Chatbot.objects.filter(belongs_to=user, is_public=True)

        user_data = ListUsersSerializer(user).data
        bot_data = PublicBotSerializer(bots, many=True, context={'request': request}).data

        return Response({
            "user": user_data,
            "bots": bot_data
        })

class GetUser(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
class GetAnotherUser(generics.RetrieveAPIView):
    """
    Получение пользователя и его ботов
    """
    serializer_class = ListUsersSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return User.objects.all()

    def get_object(self):
        user_id = self.kwargs.get("pk")
        try:
            return self.get_queryset().get(id=user_id)
        except User.DoesNotExist:
            raise NotFound("User not found")
    
    def retrieve(self, request, *args, **kwargs):
        user = self.get_object()
        bots = Chatbot.objects.filter(belongs_to=user, is_public=True)

        user_data = ListUsersSerializer(user).data
        bot_data = PublicBotSerializer(bots, many=True, context={'request': request}).data
        return Response({
            "user": user_data,
            "bots": bot_data
        })

class DeleteUser(generics.DestroyAPIView):
    
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class UpdateUser(generics.UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
class SearchUsers(generics.ListCreateAPIView):
    serializer_class = ListUsersSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = User.objects.all()
        query = self.request.query_params.get("query", None)
        try:
            return queryset.filter(Q(username__icontains=query))
        except AttributeError as e:
            return f"Nothing found: {e}"