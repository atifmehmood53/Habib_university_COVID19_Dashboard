from rest_framework import serializers
from .models import *



class dataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Daily_Cases
        exclude = ['province','entry_id']

class Dynamic(serializers.ModelSerializer):
    class Meta:
        model = Dynamic_Data
        exclude = ['entry_id']       

class predictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction_model
        exclude = ['entry_id']


class BSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balochistan_Data
        exclude = ['id']

class PSerializer(serializers.ModelSerializer):
    class Meta:
        model = Punjab_Data
        exclude = ['id']

class SSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sindh_Data
        exclude = ['id']

class KPKSerializer(serializers.ModelSerializer):
    class Meta:
        model = KPK_Data
        exclude = ['id']
    