# Generated by Django 2.2.7 on 2020-06-16 03:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0002_city_data'),
    ]

    operations = [
        migrations.AddField(
            model_name='city_data',
            name='province',
            field=models.CharField(default=None, max_length=255),
        ),
    ]