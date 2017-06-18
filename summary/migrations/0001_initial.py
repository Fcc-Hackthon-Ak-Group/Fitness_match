# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-06-18 02:11
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Summary',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avg_rate_int', models.IntegerField(max_length=4)),
                ('cal_use_int', models.IntegerField(max_length=5)),
                ('time_spent_time', models.IntegerField(max_length=3)),
                ('max_rate_int', models.IntegerField(max_length=4)),
                ('advice_text', models.CharField(max_length=200)),
            ],
        ),
    ]
