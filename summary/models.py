from __future__ import unicode_literals
from django.db import models
from django.utils.timezone import now

# Create your models here.
class Summary(models.Model):
    avg_rate_int = models.IntegerField()
    cal_use_int = models.IntegerField()
    time_spent_time = models.IntegerField()
    max_rate_int = models.IntegerField()
    advice_text = models.CharField(max_length=200)
    date_date = models.DateTimeField()


class SummaryDetails(models.Model):
    rate_int = models.IntegerField()
    time = models.DateTimeField()
    fk_summary = models.ForeignKey(Summary, on_delete=None)


class RealTimeRate(models.Model):
    rate_int = models.IntegerField()
    time = models.DateTimeField()
    status = models.CharField(max_length=50)
    fk_summary = models.ForeignKey(Summary, on_delete=None)