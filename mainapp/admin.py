from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register([
    Daily_Cases,
    Prediction_model,
    feedback,
    Balochistan_Data,
    KPK_Data,
    Sindh_Data,
    Punjab_Data,
    Dynamic_Data,
])