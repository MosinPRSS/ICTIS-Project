from django.contrib.auth.models import User
from .models import *
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny 
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import *

# --- USER SETTINGS
class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UpdateUserExtended(generics.UpdateAPIView):
    serializer_class = UserExtendedSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.user_extended
    
# --- BOTS SETTINGS 
class CreateBot(generics.CreateAPIView):
    queryset = Chatbots.objects.all()
    serializer_class = BotSerializer
    permission_classes = [IsAuthenticated] 

    def perform_create(self, serializer):
        serializer.save(belongs_to=self.request.user)
    # replace to isAuth!!!

class UpdateBot(generics.UpdateAPIView):
    serializer_class = BotUpdateSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return self.request.user.chatbots

class ListPublicBots(generics.ListCreateAPIView): 
    serializer_class = BotSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Chatbots.objects.filter(is_public=True)

class DeleteBot(generics.DestroyAPIView):
    serializer_class = BotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Chatbots.objects.filter(user=user)

# --- REGISTRATION SETTINGS

class EmailTokenObtainPairView(TokenObtainPairView):
    """
    Customized Auth System via E-Mail (only)
    """
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]
