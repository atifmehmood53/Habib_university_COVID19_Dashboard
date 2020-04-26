from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register([
    Daily_Cases, Prediction_model, feedback 
])