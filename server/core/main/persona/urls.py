from django.urls import path
from .views import *

urlpatterns = [
    path("create", CreatePersona.as_view(), name="create-persona"),
    path("read/<int:pk>", GetPersona.as_view(), name="read-persona"),
    path("update/<int:pk>", UpdatePersona.as_view(), name="update-persona"),
    path("delete/<int:pk>", DeletePersona.as_view(), name="delete-persona"),
    path("list/user", ListUserPersonas.as_view(), name="list-user-personas")
]