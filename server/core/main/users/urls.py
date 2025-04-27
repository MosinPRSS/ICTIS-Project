from django.urls import path
from .views import *

urlpatterns = [
    path("create/", CreateUser.as_view(), name="register"),
    path("update/additional/", UpdateUserExtended.as_view(), name='update-user'), 
    # path("update/") который обновляет основные данные о пользователе.
    # то, что сейчас лишь создает и обновляет аватар/описание
]
