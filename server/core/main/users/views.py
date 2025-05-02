from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated

class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class GetUser(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class GetUserExtended(generics.ListAPIView):
    serializer_class = UserExtendedSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user.user_extended

    def get_object(self):
        return self.request.user

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

class UpdateUserExtended(generics.UpdateAPIView):
    serializer_class = UserExtendedSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.user_extended