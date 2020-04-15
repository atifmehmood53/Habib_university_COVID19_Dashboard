from rest_framework import serializers
from .models import *



class dataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Daily_Cases
        exclude = ['province']

class totalSerializer(serializers.Serializer):
    total_suspected = serializers.IntegerField(required = False , allow_null=True)
    total_tested = serializers.IntegerField(required = False , allow_null=True)
    total_tested_positive = serializers.IntegerField(required = False , allow_null=True)
    total_admitted = serializers.IntegerField(required = False , allow_null=True)
    total_discharged = serializers.IntegerField(required = False , allow_null=True)
    total_died = serializers.IntegerField(required = False , allow_null=True)






        

class predictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction_model
        fields = ['date', 'no_of_cases']


    