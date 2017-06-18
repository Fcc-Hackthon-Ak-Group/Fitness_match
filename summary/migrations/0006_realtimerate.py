# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-06-18 07:38
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('summary', '0005_auto_20170618_0542'),
    ]

    operations = [
        migrations.CreateModel(
            name='RealTimeRate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rate_int', models.IntegerField()),
                ('time', models.DateTimeField()),
                ('status', models.CharField(max_length=50)),
                ('fk_summary', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='summary.Summary')),
            ],
        ),
    ]
