from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = User.EMAIL_FIELD

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['username'] = user.username
        return token

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed('No active account found with the given credentials')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')

        if not user.is_active:
            raise AuthenticationFailed('This account is inactive')

        refresh = RefreshToken.for_user(user)

        # топ 1 причин переписывать весь бэк - везде костыли

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'avatar': settings.BASE_URL + user.avatar.url,
                'description': user.description
            }
        }