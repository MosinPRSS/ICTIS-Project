from django.urls import path
from . import views

urlpatterns = [
    path("bot/create/", views.CreateBot.as_view(), name="create-bot"),
    path("bot/delete/<int:pk>/", views.DeleteBot.as_view(), name="delete-bot"),
]