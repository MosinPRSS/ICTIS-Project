from django.urls import path, include
from . import views
from main.bots import urls as bot_urls
from main.auth import urls as auth_urls
urlpatterns = [
    path("bot/", include(bot_urls)),
    path("auth/", include(auth_urls)),
]