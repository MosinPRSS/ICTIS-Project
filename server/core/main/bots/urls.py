from django.urls import path
from .views import *

urlpatterns = [
    path("create/", CreateBot.as_view(), name="create-bot"),
    path("delete/", DeleteBot.as_view(), name="delete-bot"),
    path("list/public/", ListPublicBots.as_view(), name="list-public-bots"),
    path("update/", UpdateBot.as_view(), name="update-bot")
]