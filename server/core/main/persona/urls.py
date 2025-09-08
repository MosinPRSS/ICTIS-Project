from django.urls import path
from .views import *

urlpatterns = [
    path("create", CreatePersona.as_view(), name="create-persona"),
    path("read/<uuid:pk>", GetPersona.as_view(), name="read-persona"),
    path("update/<uuid:pk>", UpdatePersona.as_view(), name="update-persona"),
    path("delete/<uuid:pk>", DeletePersona.as_view(), name="delete-persona"),
    path("list", ListUserPersonas.as_view(), name="list-user-personas")
]