from django.db import models
province_choices = [("Sindh", "Sindh"), ("Punjab", "Punjab"),("KP","KP"),("KPTD",'KPTD'),
                        ('GB','GB'),('AJK','AJK'),('ICT','ICT'),('Taftan_mobile_lab','Taftan_mobile_lab'),('Balochistan','Balochistan')]

# Create your models here.
class Daily_Cases(models.Model):
    entry_id = models.IntegerField(default=0, primary_key=True)
    date = models.DateField( auto_now=False, auto_now_add=False)
    province = models.CharField(choices=province_choices, max_length=20)
    most_infected_city = models.CharField(default = None , max_length=50)
    total_suspected = models.IntegerField(default=0)
    total_tested = models.IntegerField(default=0)
    total_tested_positive = models.IntegerField(default=0)
    total_admitted = models.IntegerField(default=0)
    total_discharged = models.IntegerField(default=0)
    total_died = models.IntegerField(default=0)
    datetime_of_entry = models.DateTimeField(default = None , auto_now=False, auto_now_add=False)
    



    class Meta:
        verbose_name = "Daily Cases"
        verbose_name_plural = "Daily Cases"
        unique_together = ("date", "province")
        

    def __str__(self):
        return f"Record of {self.province} on {self.date}"


class Prediction_model(models.Model):
    entry_id = models.IntegerField(default=0, primary_key=True)
    date = models.DateField(auto_now=False, auto_now_add=False)
    Predictions = models.FloatField(default=0.0)
    Upper_confidence_interval = models.FloatField(default=0.0)
    Lower_confidence_interval = models.FloatField(default=0.0)

class feedback(models.Model):
    name = models.CharField(max_length=255, default = None)
    email = models.EmailField(default=None)
    feedback = models.CharField(max_length= 1000)



class city_Data(models.Model):
    id = models.IntegerField(default = 0 , primary_key = True)
    date = models.DateField(auto_now_add=False)
    district = models.CharField(max_length = 250)
    total = models.IntegerField(default =None)
    casePerMillionPopulation = models.FloatField(default = None)
    Population = models.IntegerField(default = None)
    province = models.CharField(default = None, max_length =255 )