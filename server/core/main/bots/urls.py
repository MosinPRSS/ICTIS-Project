from django.urls import path
from .views import *

urlpatterns = [
    # "create" n "delete"
    path("create", CreateBot.as_view(), name="create-bot"),
    path("delete/<str:pk>", DeleteBot.as_view(), name="delete-bot"),
    # "read" principle
    path("read/<str:pk>", GetUserBot.as_view(), name="get-bot"),
    path("list", ListPublicBotsV2.as_view(), name="list-public-bots"),
    # path("list/public/non-registered", ListPublicBotsToNotRegistered.as_view(), name="bots-for-non-registered"), - not safe
    # path("list/user", ListUserBots.as_view(), name="user-bots"),
    # search
    path("search", SearchBots.as_view(), name="search-by-name-desc"), 
    path("tags", SearchByTags.as_view(), name="search-tags"),
    # "update"
    path("update/<str:pk>", UpdateBot.as_view(), name="update-bot"),
    # services
    path("tags/<int:pk>", GetTopTags.as_view(), name="show-tags"),
    path("popular/<int:pk>", GetPopularBotsBySession.as_view(), name="session-popular"),
   
]