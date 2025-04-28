from django.urls import path
from .views import *

urlpatterns = [
    path("create", CreateBot.as_view(), name="create-bot"),
    path("delete/<int:pk>/", DeleteBot.as_view(), name="delete-bot"),
    # "read" principle
    path("list/public", ListPublicBots.as_view(), name="list-public-bots"),
    path("list/user", ListUserBots.as_view(), name="user-bots"),
    path("update", UpdateBot.as_view(), name="update-bot")
]