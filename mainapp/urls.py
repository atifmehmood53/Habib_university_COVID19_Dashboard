from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

app_name = "mainapp"
urlpatterns = [
    path("", index),
    path("admin/upload-data/" ,dashboard_data),
    path("admin/predictions-upload", prediction_data),
    path("admin/Balochistan", Balochistan_upload),
    path("admin/Sindh", Sindh_upload),
    path("admin/Punjab", Punjab_upload),
    path("admin/KPK", KPK_upload)
    
]

