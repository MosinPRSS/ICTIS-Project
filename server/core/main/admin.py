from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Chatbot, name="Chatbot")
admin.site.register(AiSession)
admin.site.register(Persona)
admin.site.register(User)
admin.site.register(Message)
