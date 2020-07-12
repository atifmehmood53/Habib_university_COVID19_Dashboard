from django.shortcuts import render
import io
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

from .scrapper.main_Pakistan import main
from .scrapper.main_AJK import main_ajk
from .scrapper.main_GB import main_GB
from .scrapper.main_Punjab import main_punjab
from .scrapper.main_Balochistan import main_balochistan
from .scrapper.main_Sindh import main_sindh
from .scrapper.main_Islamabad import main_islamabad
import datetime
import csv
import pytz
import time
import pprint

#Create your views here.
province = ['Sindh','Punjab', 'Balochistan', 'KPK']

#Data Scrapping

tz = pytz.timezone('Asia/Karachi')
time_now = datetime.datetime.now(tz).time()

#here we could apply any timezone according shop geo location
time_open = datetime.time(19, 28, tzinfo=tz)
time_close = datetime.time(10, 32, tzinfo=tz)
print(time_open , time_now , time_close)
if time_now >= time_open and time_now < time_close:
    print('now')
    main()

    csv_file = '.\\province-cumulative.csv' 
    with open(csv_file, mode='r') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter =',')
        line = 0
        for row in csv_reader:
            if line == 1:
                id = row[0]
            if line > 2:
                _, created = Dynamic_Data.objects.update_or_create(
                    entry_id = id+str(row[0]),
                    province = row[0],
                    confirmed_cases = int(row[1]),
                    active_cases = int(row[2]),
                    deaths = int(row[3]),
                    recoveries = int(row[4])
                
                )
            
            line += 1
            

import operator
def index(request):
    # context of this page
    
    
    
    context = {
        "total_cases_today":{},
    }
    data1 = {
        'Predictions': {},
        "total_cases_today":{},
        'City Wise' :{'Balochistan':[],
                        'Punjab':[],
                        'Sindh':[],
                        'KPK':[]
                        }

    }

    # getting dates for the latest entry in each province
    try:
        data_balochistan = Balochistan_Data.objects.latest('date')
    except :
        data_balochistan = None
    
    try:
        data_sindh = Sindh_Data.objects.latest('date')
    except :
        data_sindh = None
    
    try:
        data_punjab = Punjab_Data.objects.latest('date')
    except :
        data_punjab = None
    try:
        data_kpk = KPK_Data.objects.latest('date')
    except :
        data_kpk = None
    

    if data_balochistan != None:
        latest_date_balochistan = BSerializer(data_balochistan).data['date']

    if data_sindh != None:
        latest_date_sindh = SSerializer(data_sindh).data['date']

    if data_punjab != None:
        latest_date_punjab = PSerializer().data['date']

    if data_kpk != None:
        latest_date_kpk = KPKSerializer(data_kpk).data['date']   
    
   
    
   
    #populating the dictionary with json objects
    if data_balochistan != None:
        cities_balochistan =list(sorted(Balochistan_Data.objects.filter(date= latest_date_balochistan).values('district', 'Population') ,  key = operator.itemgetter('Population'), reverse = True )  )
        for city in cities_balochistan:
            data1['City Wise']["Balochistan"].append(BSerializer(Balochistan_Data.objects.filter(date= latest_date_balochistan ,district= city['district']), many=True).data[0])
    if data_punjab != None:
        cities_punjab = list(sorted(Punjab_Data.objects.filter(date= latest_date_punjab).values('district','Population'), key = operator.itemgetter('Population') , reverse = True ) )
        for city in cities_punjab:
            data1['City Wise']["Punjab"].append(BSerializer(Punjab_Data.objects.filter(date= latest_date_punjab ,district= city['district']), many=True).data[0])
    if data_sindh != None:
        cities_sindh= list(sorted(Sindh_Data.objects.filter(date= latest_date_sindh).values('district' , 'Population'), key = operator.itemgetter('Population') , reverse =True ))
        for city in cities_sindh:
            data1['City Wise']['Sindh'].append(SSerializer(Sindh_Data.objects.filter(date = latest_date_sindh , district=city['district']), many=True).data[0])
    if data_kpk != None:
        cities_kpk = list(sorted(KPK_Data.objects.filter(date= latest_date_kpk).values('district' , 'Population'), key=operator.itemgetter('Population') , reverse = True) )
        for city in cities_kpk:
            data1['City Wise']['KPK'].append(KPKSerializer(KPK_Data.objects.filter(date = latest_date_kpk , district=city['district']), many=True).data[0])

    data1['Predictions'] = (predictionSerializer(Prediction_model.objects.all(), many = True)).data


    for province,_  in (province_choices):
       context["total_cases_today"][province]= ((Daily_Cases.objects.filter(province=province)))
       context["total_cases_today"][province] = sorted(context["total_cases_today"][province], key=operator.attrgetter('date'))
    
    for province in context['total_cases_today'].keys():
        if context['total_cases_today'][province]:
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
 






@permission_required('admin.can_add_log_entry')
def Balochistan_upload(request):
    template = 'data.html'
    form  = Option()
    context = {'form': form}

    prompt = {
    'order': 'Order of the csv should be date , province , suspected , tested , tested positive , admitted, discharged , death'
    }

    if request.method == 'GET':
        return render(request, template, context)
    
    csv_file = request.FILES['file']

    data_set = csv_file.read().decode('utf-8')
    io_string = io.StringIO(data_set)
    next(io_string)


    for col in csv.reader(io_string, delimiter=','):
        if int(col[5])==0:
            cp = 0
        else:
            cp = (int(col[3]) / int(col[5])) * 1000000
 
        _, created = Balochistan_Data.objects.update_or_create(
            id =int(col[0]),
            date = (col[1]),
            district = (col[2]),
            total = int(col[3]),
            casePerMillionPopulation = cp,
            Population = int(col[5]),
            
        )



    return render(request, template, context)


@permission_required('admin.can_add_log_entry')
def Punjab_upload(request):
    template = 'data.html'
    form  = Option()
    context = {'form': form}

    prompt = {
    'order': 'Order of the csv should be date , province , suspected , tested , tested positive , admitted, discharged , death'
    }

    if request.method == 'GET':
        return render(request, template, context)
    
    csv_file = request.FILES['file']

    data_set = csv_file.read().decode('utf-8')
    io_string = io.StringIO(data_set)
    next(io_string)


    for col in csv.reader(io_string, delimiter=','):
        if int(col[5])==0:
            cp = 0
        else:
            cp = (int(col[3]) / int(col[5])) * 1000000
        _, created = Punjab_Data.objects.update_or_create(
            id =int(col[0]),
            date = (col[1]),
            district = (col[2]),
            total = int(col[3]),
            casePerMillionPopulation = cp,
            Population = int(col[5]),
            
        )



    return render(request, template, context)

@permission_required('admin.can_add_log_entry')
def Sindh_upload(request):
    template = 'data.html'
    form  = Option()
    context = {'form': form}

    prompt = {
    'order': 'Order of the csv should be date , province , suspected , tested , tested positive , admitted, discharged , death'
    }

    if request.method == 'GET':
        return render(request, template, context)
    
    csv_file = request.FILES['file']

    data_set = csv_file.read().decode('utf-8')
    io_string = io.StringIO(data_set)
    next(io_string)


    for col in csv.reader(io_string, delimiter=','):
        if int(col[5])==0:
            cp = 0
        else:
            cp = (int(col[3]) / int(col[5])) * 1000000
        _, created = Sindh_Data.objects.update_or_create(
            id =int(col[0]),
            date = (col[1]),
            district = (col[2]),
            total = int(col[3]),
            casePerMillionPopulation = cp,
            Population = int(col[5]),
            
        )



    return render(request, template, context)

@permission_required('admin.can_add_log_entry')
def KPK_upload(request):
    template = 'data.html'
    form  = Option()
    context = {'form': form}

    prompt = {
    'order': 'Order of the csv should be date , province , suspected , tested , tested positive , admitted, discharged , death'
    }

    if request.method == 'GET':
        return render(request, template, context)
    
    csv_file = request.FILES['file']

    data_set = csv_file.read().decode('utf-8')
    io_string = io.StringIO(data_set)
    next(io_string)


    for col in csv.reader(io_string, delimiter=','):
        if int(col[5])==0:
            cp = 0
        else:
            cp = (int(col[3]) / int(col[5])) * 1000000
        _, created = KPK_Data.objects.update_or_create(
            id =int(col[0]),
            date = (col[1]),
            district = (col[2]),
            total = int(col[3]),
            casePerMillionPopulation = cp,
            Population = int(col[5]),
            
        )



    return render(request, template, context)


    



    




