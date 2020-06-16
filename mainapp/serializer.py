from rest_framework import serializers
from .models import *



class dataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Daily_Cases
        exclude = ['province','entry_id']


        

class predictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction_model
        exclude = ['entry_id']


class citySerializer(serializers.ModelSerializer):
    class Meta:
        model = city_Data
        exclude = ['id']

    