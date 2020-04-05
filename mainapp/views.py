from django.shortcuts import render, get_object_or_404, redirect
from django.db.models import Sum
from django.contrib import messages
from .models import *
import datetime
import csv , io

# Create your views here.



def index(request):
    all_cases_today = Daily_Cases.objects.filter(date=datetime.date.today())
    total_cases = {}
    for case in all_cases_today:
       total_cases[case.province]=  Daily_Cases.objects.filter(province=case.province).aggregate(
            total_suspected=Sum("total_suspected"),
            total_tested=Sum("total_tested"),
            total_tested_positive=Sum("total_tested_positive"),
            total_tested_negative=Sum("total_tested_negative"),
            total_admitted=Sum("total_admitted"),
            total_discharged=Sum("total_discharged"),
            total_died=Sum("total_died")
        )

    return render(request, "mainapp/pages/index.html", context={"all_cases_today": all_cases_today, "total_cases":total_cases})

def dashboard(request):
    return render(request, "mainapp/base.html")

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
    next(io_string)

    for col in csv.reader(io_string, delimiter = ','):
        _, created = Daily_Cases.objects.update_or_create(
            date = col[0],
            province = col[1],
            total_suspected = col[2],
            total_tested = col[3],
            total_tested_positive = col[4],
            total_admitted = col[5],
            total_discharged = col[6],
            total_diesel = col[7]
        )

    context = {}

    return render(request, template, context)

    




    

