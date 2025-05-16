from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView, 
    TokenVerifyView
)
from .views import *

urlpatterns = [
    path("api-token", EmailTokenObtainPairView.as_view(), name="login"),
    path("api-token/verify", TokenVerifyView.as_view(), name='token_verify'),
    path("api-token/refresh", TokenRefreshView.as_view(), name="refresh_token"),
]

