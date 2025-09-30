from django.urls import path
from .views import *

urlpatterns = [
   path("create", CreateSession.as_view(), name="create-new-chat"), # создаем чат, если его нет
   path("list/chats", ListSessions.as_view(), name="chats-user"),
   # path("list/chats/<uuid:pk>") получение одной сессии
   # path("list/bot/<uuid:pk>")
   
   path("delete/<uuid:pk>", DeleteSession.as_view(), name="delete-chat"),
   path("generate", GenerateAnswer.as_view(), name="generate-answer"),
   # path("generate/proxy") - для прокси в будущем

   # штуки для сообщений
   path("list/messages/<uuid:pk>", GetMessagesOfSession.as_view(), name="list-messages-of-session"),
   
   path("message/update/<int:pk>", UpdateMessage.as_view(), name="update-message"),
   path("message/delete/<int:pk>", DeleteMessage.as_view(), name="remove-message"),
]

