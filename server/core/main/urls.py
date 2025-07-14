from django.urls import path, include
from main.bots import urls as bot_urls
from main.auth import urls as auth_urls
from main.users import urls as user_urls
from main.session import urls as session_urls
from main.persona import urls as persona_urls

urlpatterns = [
    path("b/", include(bot_urls)), # bots
    path("a/", include(auth_urls)), # auth
    path("u/", include(user_urls)), # users
    path("c/", include(session_urls)), # chats
    path("p/", include(persona_urls)),  # personas
    # path("s/", include(server_urls)) # server administration
]