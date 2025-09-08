from django.shortcuts import render
from django.http import HttpResponse
from django.views import View

class MainWindow(View):
    def get(self, request):
        return HttpResponse("DASHBOARD")