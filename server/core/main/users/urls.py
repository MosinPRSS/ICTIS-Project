from django.urls import path
from .views import *

urlpatterns = [
    path("create", CreateUser.as_view(), name="register"),
    path("read", GetUser.as_view(), name="read-user-main"),
    path("list",  SearchUsers.as_view(), name="search-users"),
    path("update", UpdateUser.as_view(), name="update-user-main"),
    path("delete/<int:pk>", DeleteUser.as_view(), name="delete-user"),
]
