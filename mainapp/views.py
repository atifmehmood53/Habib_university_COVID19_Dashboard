from django.shortcuts import render
import csv , io
from django.db.models import Sum
from django.contrib import messages
from django.contrib.auth.decorators import permission_required
from django.http import HttpResponseRedirect
from django.urls import reverse
from .serializer import *
from .models import *
import datetime
import json
from .forms import * 
from datetime import datetime



#Create your views here.

def index(request):
    # context of this page
    

    
    context = {
        "total_cases_today":{}
    }
    data1 = dict()

    data1['Predictions'] = (predictionSerializer(Prediction_model.objects.all(), many = True)).data

    for province,_  in (province_choices):
       context["total_cases_today"][province]= ((Daily_Cases.objects.filter(province=province)))
    
    
    for province in context['total_cases_today'].keys():
        data = dataSerializer(context['total_cases_today'][province] , many = True)
        data1[province] = data.data
 
    data1 = json.dumps(data1)


    if request.method == 'POST':
        form = feedback_form(request.POST)
        if form.is_valid():
            form.save()
        
    form = feedback_form() 

        
    

    return render(request, "mainapp/pages/index.html",{'my_data': data1 , 'form': form})


@permission_required('admin.can_add_log_entry')
def dashboard_data(request):
    template = 'data.html'

    prompt = {
       'order': 'Order of the csv should be date , province , suspected , tested , tested positive , admitted, discharged , death'
    }

    if request.method == 'GET':
        return render(request, template, prompt)
    
    csv_file = request.FILES['file']

    data_set = csv_file.read().decode('utf-8')
    io_string = io.StringIO(data_set)
    next(io_string)

    for col in csv.reader(io_string, delimiter=','):
        _, created = Daily_Cases.objects.update_or_create(
            entry_id =int(col[0]),
            date = (col[1]),
            province = (col[2]),
            most_infected_city = (col[9]),
            total_suspected = int(col[3]),
            total_tested = int(col[4]),
            total_tested_positive = int(col[5]),
            total_admitted = int(col[6]),
            total_discharged = int(col[7]),            
            total_died = int(col[8]),
            datetime_of_entry = datetime.now()

           
        )


    context = {}

    return render(request, template, context)

@permission_required('admin.can_add_log_entry')
def prediction_data(request):
    template = 'data.html'

    prompt = {
       'order': 'Order of the csv should be date , province , suspected , tested , tested positive , admitted, discharged , death'
    }

    if request.method == 'GET':
        return render(request, template, prompt)
    
    csv_file = request.FILES['file']

    data_set = csv_file.read().decode('utf-8')
    io_string = io.StringIO(data_set)
    next(io_string)

    for col in csv.reader(io_string, delimiter=','):
        _, created = Prediction_model.objects.update_or_create(
            entry_id =int(col[0]),
            date = (col[1]),
            Predictions = float(col[2]),
            Upper_confidence_interval = float(col[3]),
            Lower_confidence_interval = float(col[4])           
        )


    context = {}

    return render(request, template, context)

    


    




