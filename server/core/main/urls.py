from django.urls import path
from . import views

urlpatterns = [
    path("bot/create/", views.CreateBot.as_view(), name="create-bot"),
    path("bot/delete/<str:pk>/", views.DeleteBot.as_view(), name="delete-bot"),
    path("bot/list/public", views.ListPublicBots.as_view(), name="list-public-bots"),
    path("bot/update/", views.UpdateBot.as_view(), name="update-bot")
]