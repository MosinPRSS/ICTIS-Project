from django.urls import path
from .views import *

urlpatterns = [
   path("create", CreateSession.as_view(), name="create-new-chat"), # создаем чат, если его нет
   path("list/chats", ListSessions.as_view(), name="chats-user"),
   path("list/messages/<uuid:pk>", GetMessagesOfSession.as_view(), name="list-messages-of-session"),
   path("delete/<uuid:pk>", DeleteSession.as_view(), name="delete-chat"),
   path("generate", GenerateAnswer.as_view(), name="generate-answer"),
]

