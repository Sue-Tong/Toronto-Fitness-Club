# Generated by Django 4.1.2 on 2022-12-07 17:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usersubscription',
            name='studio',
        ),
    ]