from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated

class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UpdateUserExtended(generics.UpdateAPIView):
    serializer_class = UserExtendedSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.user_extended