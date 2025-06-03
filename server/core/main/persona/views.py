from rest_framework import generics
from ..models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound

class CreatePersona(generics.CreateAPIView):
    queryset = Personas.objects.all()
    serializer_class = PersonaSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(belongs_to=self.request.user)

class GetPersona(generics.RetrieveAPIView):
    serializer_class = PersonaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Personas.objects.filter(belongs_to=self.request.user)

    def get_object(self):
        persona_id = self.kwargs.get("pk")
        try:
            return self.get_queryset().get(id=persona_id)
        except Personas.DoesNotExist:
            raise NotFound("This persona isnt yours.")
        
class ListUserPersonas(generics.ListCreateAPIView):
    serializer_class = PersonaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Chatbots.objects.filter(belongs_to=self.request.user)
    
class UpdatePersona(generics.UpdateAPIView):
    serializer_class = PersonaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Personas.objects.filter(belongs_to=self.request.user)
    
    def get_object(self):
        persona_id = self.kwargs.get("pk")
        try:
            return self.get_queryset().get(id=persona_id)
        except Personas.DoesNotExist:
            raise NotFound("This persona isnt yours.")
    
class DeletePersona(generics.DestroyAPIView):
    serializer_class = PersonaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Personas.objects.filter(belongs_to=self.request.user)