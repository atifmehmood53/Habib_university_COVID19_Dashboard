from django.shortcuts import render
from django.db.models import Sum
from .models import *
import datetime

# Create your views here.



def index(request):
    all_cases_today = Daily_Cases.objects.filter(date=datetime.date.today())
    total_cases = {}
    for province,_  in province_choices:
       total_cases[province]=  Daily_Cases.objects.filter(province=province).aggregate(
            total_suspected=Sum("total_suspected"),
            total_tested=Sum("total_tested"),
            total_tested_positive=Sum("total_tested_positive"),
            total_tested_negative=Sum("total_tested_negative"),
            total_admitted=Sum("total_admitted"),
            total_discharged=Sum("total_discharged"),
            total_died=Sum("total_died")
        )

    return render(request, "mainapp/pages/demopage.html", context={"all_cases_today": all_cases_today, "total_cases":total_cases})

def dashboard(request):
    return render(request, "mainapp/base.html")
