# Generated by Django 3.2.12 on 2022-03-03 19:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_alerts'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='alerts',
            table='alert',
        ),
    ]
