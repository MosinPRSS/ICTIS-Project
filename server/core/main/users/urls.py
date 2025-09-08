from django.urls import path
from .views import *

urlpatterns = [
    path("create", CreateUser.as_view(), name="register"),
    path("read", GetUser.as_view(), name="read-user-main"), # DO NOT USE
    path("read/<str:pk>", UserDetailView.as_view(), name="another-user"),
    path("list",  SearchUsers.as_view(), name="search-users"),# outdated
    path("update", UpdateUser.as_view(), name="update-user-main"),
    path("delete", DeleteUser.as_view(), name="delete-user"),
]
