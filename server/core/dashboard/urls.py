from django.urls import path
from .views import *

urlpatterns = [
    path("", MainWindow.as_view(), name="dashboard-main"),
]