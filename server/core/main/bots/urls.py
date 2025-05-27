from django.urls import path
from .views import *

urlpatterns = [
    # "create" n "delete"
    path("create", CreateBot.as_view(), name="create-bot"),
    path("delete/<int:pk>", DeleteBot.as_view(), name="delete-bot"),
    # "read" principle
    path("read/<int:pk>", GetBot.as_view(), name="get-bot"),
    path("list/public", ListPublicBots.as_view(), name="list-public-bots"),
    path("list/public/non-registered", ListPublicBotsToNotRegistered.as_view(), name="bots-for-non-registered"),
    path("list/user", ListUserBots.as_view(), name="user-bots"),
    # "update"
    path("update/<int:pk>", UpdateBot.as_view(), name="update-bot")
]