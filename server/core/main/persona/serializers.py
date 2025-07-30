from rest_framework import serializers
from ..models import Personas
class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personas
        fields = [
            "id",
            "name",
            "avatar",
            "description"
        ]
        extra_kwargs = {
            "name": {"required": True},
            "description": {"required": True},
            "avatar": {"required": False}
        }
    def create(self, validated_data):
        validated_data["belongs_to"] = self.context["request"].user
        return super().create(validated_data)
