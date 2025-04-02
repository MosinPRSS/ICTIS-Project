from django.contrib.auth.models import User
from .models import BotData
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny 
from rest_framework_simplejwt.views import TokenObtainPairView


from .serializers import UserSerializer, BotSerializer, CustomTokenObtainPairSerializer


class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CreateBot(generics.CreateAPIView):
    queryset = BotData.objects.all()
    serializer_class = BotSerializer
    permission_classes = [AllowAny] # replace to isAuth!!!

class DeleteBot(generics.DestroyAPIView):
    serializer_class = BotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return BotData.objects.filter(user=user)


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]
