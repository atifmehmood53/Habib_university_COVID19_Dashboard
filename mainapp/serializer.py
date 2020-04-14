from rest_framework import serializers
from .models import *

class dataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Daily_Cases
        exclude = ['province']

class totalSerializer(serializers.Serializer):
    total_suspected = serializers.IntegerField()
    total_tested = serializers.IntegerField()
    total_tested_positive = serializers.IntegerField()
    total_admitted = serializers.IntegerField()
    total_discharged = serializers.IntegerField()
    total_died = serializers.IntegerField()





class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction_model
        field = ['day_offset','no_of_cases']

    