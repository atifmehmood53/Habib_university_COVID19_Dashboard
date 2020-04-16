from django.shortcuts import render
import csv , io
from django.http import JsonResponse
from django.db.models import Sum
from django.contrib import messages
from django.contrib.auth.decorators import permission_required
from rest_framework.renderers import JSONRenderer
from .serializer import *
from .models import *
import datetime
import json
from rest_framework import serializers



# Create your views here.

def index(request):
    # context of this page
    
    context = {
        "total_cases_today":{}
    }
    data1 = dict()

    data1['Predictions'] = (predictionSerializer(Prediction_model.objects.all(), many = True)).data

    for province,_  in (province_choices):
       context["total_cases_today"][province]= ((Daily_Cases.objects.filter(province=province)))

    # for province,_  in province_choices:
    #    context["total_cases"][province]=  Daily_Cases.objects.filter(province=province).aggregate(
    #         total_suspected=Sum("total_suspected"),
    #         total_tested=Sum("total_tested"),
    #         total_tested_positive=Sum("total_tested_positive"),
    #         total_admitted=Sum("total_admitted"),
    #         total_discharged=Sum("total_discharged"),
    #         total_died=Sum("total_died")
    #     )
    
    
    for province in context['total_cases_today'].keys():
        data = dataSerializer(context['total_cases_today'][province] , many = True)
        data1[province] = data.data
 
    data1 = json.dumps(data1)


    return render(request, "mainapp/pages/index.html",{'my_data': data1})

def dashboard(request):
    return render(request, "mainapp/base.html")


@permission_required('admin.can_add_log_entry')
def dashboard_data(request):
    template = 'data.html'

    prompt = {
       'order': 'Order of the csv should be date , province , suspected , tested , tested positive , admitted, discharged , death'
    }

    if request.method == 'GET':
        return render(request, template, prompt)
    
    csv_file = request.FILES['file']

    # if not csv_file.names.endswith('.csv'):
    #     messages.error(request,'file not supported. Please upload a csv file')

    data_set = csv_file.read().decode('utf-8')
    io_string = io.StringIO(data_set)
    #next(io_string)

    for col in csv.reader(io_string, delimiter = ','):
        _, created = Daily_Cases.objects.update_or_create(
            date = col[1],
            province = col[2],
            total_suspected = col[3],
            total_tested = col[4],
            total_tested_positive = col[5],
            total_admitted = col[6],
            total_discharged = col[7],
            
            total_died = int(col[8])
        )

    context = {}

    return render(request, template, context)

    



    

