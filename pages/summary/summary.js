//summary.js
var wxCharts = require('../../utils/wxcharts.js');
var summary = require('../../utils/data.js');
var summaryData = summary.getSummaryData().summaryDetail;
var app = getApp();
var lineChart = null;
var ringChart = null;
Page({
    data: {
    },
    touchHandler: function (e) {
        console.log(lineChart.getCurrentDataIndex(e));
        lineChart.showToolTip(e, {
             background: '#7cb5ec'
        });
    },
    getformatData: function(summaryData){
        var rateArr = [];
        var timeArr = [];
        for(var i=0;i<summaryData.length;i++){
            timeArr.push(summaryData[i].time);
            rateArr.push(summaryData[i].rate);
        }
        return [rateArr,timeArr]
    },
    onShow: function (e) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        var showData = this.getformatData(summaryData);
        /*console.log(showData[0],showData[1]);*/
        lineChart = new wxCharts({
            canvasId: 'heartRateCanvas',
            type: 'line',
            categories: showData[1],
            animation: true,
            background: '#f5f5f5',
            series: [{
                name: '运动心率轨迹',
                data: showData[0],
                format: function (val) {
                    return val;
                }
            }],
            xAxis: {
                disableGrid: true
            },
            yAxis: {
                format: function (val) {
                    return val+ 'bpm';
                },
                min: 40,
                max: 200,
                gridColor:["#FF0000","#CC6600","#009966","#FF0000"]
            },
            width: 300,
            height: 200,
            dataLabel: true,
            dataPointShape: true,
            extra: {
                lineStyle: 'curve'
            }
        });

        ringChart = new wxCharts({
            animation: true,
            canvasId: 'ringCanvas',
            type: 'ring',
            extra: {
                ringWidth: 25
            },
            title: {
                name: '运动区间占比',
                color: '#7cb5ec',
                fontSize: 15,
                offsetX: 0
            },
            series: [{
                name: '偏高',
                data: 30,
                stroke: false,
                color:"#009966"
            }, {
                name: '最佳',
                data: 55,
                 stroke: false
            }, {
                name: '偏低',
                data: 20,
                stroke: false
            }, {
                name: '过低',
                data: 10,
                stroke: false
            }],
            disablePieStroke: true,
            width: 300,
            height: 200,
            dataLabel: false,
            legend: false,
            padding: 0
        });
        ringChart.addEventListener('renderComplete', () => {
            console.log('renderComplete');
        });
        setTimeout(() => {
            ringChart.stopAnimation();
        }, 500);
    }
});