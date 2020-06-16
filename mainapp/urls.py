from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

app_name = "mainapp"
urlpatterns = [
    path("", index),
    path("admin/upload-data/" ,dashboard_data),
    path("admin/predictions-upload", prediction_data),
    path("admin/city-upload", city_data_upload)
]

