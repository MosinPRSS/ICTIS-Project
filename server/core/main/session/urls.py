from django.urls import path
from .views import *

urlpatterns = [
   path("create", CreateSession.as_view(), name="create-new-chat"), # создаем чат, если его нет
   # path("list/chats"),
   # path("list/chats/bot"),
   # path("generate"),
]

