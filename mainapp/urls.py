from django.urls import path
from .views import *

app_name = "mainapp"
urlpatterns = [
    path("", index),
    path("index", dashboard),
    path("upload-data/" ,dashboard_data)
]

