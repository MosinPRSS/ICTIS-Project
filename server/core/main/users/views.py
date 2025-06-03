from rest_framework import generics
from ..models import User
from .serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Q

class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class GetUser(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

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