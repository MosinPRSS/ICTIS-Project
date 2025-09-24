from django.urls import path
from .views import *

urlpatterns = [
   path("create", CreateSession.as_view(), name="create-new-chat"), # создаем чат, если его нет
   path("list/chats", ListSessions.as_view(), name="chats-user"),
   path("list/messages/<uuid:pk>", GetMessagesOfSession.as_view(), name="list-messages-of-session"),
   path("delete/<uuid:pk>", DeleteSession.as_view(), name="delete-chat"),
   path("generate", GenerateAnswer.as_view(), name="generate-answer"),
   # path("generate/proxy") - для прокси в будущем

   # штуки для сообщений
   # path("message/update/<int:pk>")
   # path("message/delete") - здесь еще придумать КАК эти сообщения удалят (т.е., удаляются ли связанные или нет)
]

