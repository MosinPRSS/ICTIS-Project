from django.urls import path
from .views import *

urlpatterns = [
    path("create", CreateUser.as_view(), name="register"),
    path("read/main", GetUser.as_view(), name="read-user-main"),
    path("read/add", GetUserExtended.as_view(), name="read-user-add"),
    path("update/main", UpdateUser.as_view(), name="update-user-main"),
    path("update/additional", UpdateUserExtended.as_view(), name="update-user-add"), 
    path("delete/<int:pk>", DeleteUser.as_view(), name="delete-user"),
]
