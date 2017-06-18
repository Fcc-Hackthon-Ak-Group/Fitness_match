"""FitnessAssistant URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.http import request
from summary.models import Summary, SummaryDetails, RealTimeRate
from rest_framework import routers, serializers, viewsets
from django.contrib import admin
from django.utils.timezone import now

import time
from django.utils.timesince import timesince
import random


def get_summary(pk_num=-2):
    if pk_num >= 0:
        return Summary.objects.get(pk=pk_num)
    return Summary.objects.get(pk=random.randrange(5, 8))


def make_summary_data_temp():
    advice_text_dic = {1: "完美的表现",
                       2: "非常好，请继续加油",
                       3: "还有提高空间，下次更努力一些吧",
                       4: "非常努力，但请注意强度哦",
                       5: "今天状态不好么？好好休息下次再战"}

    summary = Summary()
    summary.avg_rate_int = random.randrange(110, 150)
    summary.cal_use_int = random.randrange(250, 500)
    summary.max_rate_int = random.randrange(160, 195)
    summary.time_spent_time = random.randrange(20, 60)
    summary.advice_text = advice_text_dic[random.randrange(1, 6)]
    summary.date_date = now()
    summary.save()

# make_summary_data_temp()


def clear_summary_data_temp():
    summarys = Summary.objects.all()

    for summary in summarys:
        summary.delete()
        summary.save()


def clear_summary_details_data_temp():
    summary_details = SummaryDetails.objects.all()
    for summary_detail in summary_details:
        summary_detail.delete()
        summary_detail.save()


def make_summary_details_data_temp():
    temp_time = now()
    for i in range(50):
        summary_details = SummaryDetails()
        temp_time = now()
        summary_details.time = temp_time.replace(second=temp_time.second + 1)
        summary_details.rate_int = random.randrange(120, 200)
        summary_details.fk_summary = Summary.objects.get(pk=random.randrange(5, 8))
        summary_details.save()

# clear_summary_details_data_temp()
# make_summary_details_data_temp()


# Serializers define the API representation.
class SummarySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Summary
        fields = ('pk', 'date_date', 'avg_rate_int', 'max_rate_int', 'cal_use_int', 'time_spent_time', 'advice_text')


class SummaryDetailsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SummaryDetails
        fields = ('rate_int', 'time', 'fk_summary')


class RealTimeDataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RealTimeRate
        fields = ('rate_int', 'time', 'status')


# ViewSets define the view behavior.
class SummarytViewSet(viewsets.ModelViewSet):
    queryset = Summary.objects.all()
    serializer_class = SummarySerializer


class SummaryDetailsViewSet(viewsets.ModelViewSet):
    queryset = SummaryDetails.objects.filter(fk_summary=get_summary()).order_by('time')
    serializer_class = SummaryDetailsSerializer


class RealTimeDataViewSet(viewsets.ModelViewSet):
    rate_temp = None
    serializer_class = RealTimeDataSerializer

    def get_rate(rate = 70):
        if rate <= 80:
            return random.randint(60, 100)
        if 80 < rate <= 120:
            return random.randint(80, 140)
        if 120 < rate <= 160:
            return random.randint(120, 170)
        if 160 < rate:
            return random.randint(140, 180)

    def get_status(rate):
        if rate < 80:
            return "加油，动起来"
        elif rate < 120:
            return "热身"
        elif rate < 160:
            return "干得好，请保持"
        else:
            return "太快了，轻松一点"

    def get_summary():
        summary = Summary()
        summary.date_date = now()
        summary.avg_rate_int = 0
        summary.max_rate_int = 0
        summary.cal_use_int = 0
        summary.time_spent_time = 0
        summary.save()
        return summary

    summary = get_summary()
    data_time = now()
    for i in range(200):
        real_time = RealTimeRate()
        if data_time.second + 1 > 59:
            data_time.replace(second=0)

            if data_time.minute + 1 > 59:
                data_time.replace(minute=0)
                data_time.replace(hour=data_time.hour + 1)
            else:
                data_time.replace(minute=data_time.minute + 1)
        else:
            real_time.time = data_time.replace(second=data_time.second + 1)

        if rate_temp is not None:
            real_time.rate_int = get_rate(rate_temp)
        else:
            real_time.rate_int = get_rate()

        if real_time.rate_int and real_time.rate_int > 0:
            rate_temp = real_time.rate_int

        real_time.fk_summary = summary
        real_time.status = get_status(real_time.rate_int)
        real_time.save()
        real_time.clean()
    queryset = RealTimeRate.objects.all().order_by('-time')


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'summary', SummarytViewSet)
router.register(r'summary_details', SummaryDetailsViewSet)
router.register(r'real_time', RealTimeDataViewSet)


urlpatterns = [
    # url(r'^summary/', include('summary.urls')),
    # url(r'^summary_details/', include('summary_details.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='API'))
]
