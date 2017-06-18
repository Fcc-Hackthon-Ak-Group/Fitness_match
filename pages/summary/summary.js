//summary.js
var wxCharts = require('../../utils/wxcharts.js');
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
    }, /*
    createSimulationData: function () {
        var categories = [];
        var data = [];
        for (var i = 0; i < 10; i++) {
            categories.push('2016-' + (i + 1));
            data.push(Math.random()*(20-10)+10);
        }
        // data[4] = null;
        return {
            categories: categories,
            data: data
        }
    },
    updateData: function () {
        var simulationData = this.createSimulationData();
        var series = [{
            name: '成交量1',
            data: simulationData.data,
            format: function (val, name) {
                return val.toFixed(2) + '万';
            }
        }];
        lineChart.updateData({
            categories: simulationData.categories,
            series: series
        });
    },*/
    onShow: function (e) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        
        /*var simulationData = this.createSimulationData();*/
        lineChart = new wxCharts({
            canvasId: 'heartRateCanvas',
            type: 'line',
            categories: ['12:40','12:42','12:44','12:46','12:48','12:50','12:52','12:54','12:56','12:58','13:00'],
            /*categories: simulationData.categories,*/
            animation: true,
            background: '#f5f5f5',
            series: [/*{
                name: '成交量1',
                data: simulationData.data,
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            },*/ {
                name: '运动心率轨迹',
                data: [80, 110, 140, 160, 155, 140, 150, 162, 171, 179, 120],
                format: function (val) {
                    return val;
                }
            }],
            xAxis: {
                disableGrid: true
            },
            yAxis: {
                title: '运动心率',
                format: function (val) {
                    return val+ 'bpm';
                },
                min: 60,
                max: 200,
                gridColor:["#FF0000","#CC6600","#009966","#FF0000"]
            },
            width: windowWidth,
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
            subtitle: {
                name: '收益率',
                color: '#666666',
                fontSize: 15
            },
            series: [{
                name: '成交量1',
                data: 30,
                stroke: false,
                color:"#009966"
            }, {
                name: '成交量2',
                data: 55,
                 stroke: false
            }, {
                name: '成交量3',
                data: 20,
                stroke: false
            }],
            disablePieStroke: true,
            width: windowWidth,
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