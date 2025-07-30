from django.urls import path
from .views import *

urlpatterns = [
   path("create", CreateSession.as_view(), name="create-new-chat"), # создаем чат, если его нет
   path("list/chats", ListSessions.as_view(), name="chats-user"),
   # path("list/chats/bot/<int: pk>"),
   # path("generate"),
]

