from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import *
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

class EmailTokenObtainPairView(TokenObtainPairView):
    """
    Customized Auth System via E-Mail (only)
    """
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]

class Logout(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=205)
        except Exception as e:
            return Response(status=400)