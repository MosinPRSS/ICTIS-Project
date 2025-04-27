from django.urls import path, include
from main.bots import urls as bot_urls
from main.auth import urls as auth_urls
from main.users import urls as user_urls
urlpatterns = [
    path("bot/", include(bot_urls)),
    path("auth/", include(auth_urls)),
    path("user/", include(user_urls))
]