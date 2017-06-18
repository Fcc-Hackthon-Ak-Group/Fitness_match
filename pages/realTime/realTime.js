var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
var data = [];
var categories = [];

Page({
  data: {
    suggestMsg:""
  },

  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec'
    });
  },

  createSimulationData: function () {
    if (data.length >= 6) {
      categories.shift()
      data.shift()
    }
    categories.push(Math.floor(Math.random() * (12 - 1) + 1));
    data.push(Math.random() * (120 - 30) + 30);
    return {
      categories: categories,
      data: data
    }

  },

  updateData: function () {
    var that = this;
    var simulationData = this.createSimulationData();
    var series = [{
      name: '心率',
      data: simulationData.data,
      format: function (val, name) {
        return val.toFixed(2);
      }
    }];
    lineChart.updateData({
      categories: simulationData.categories,
      series: series
    });
    that.setData({
      suggestMsg: that.setSuggestion(simulationData.data[simulationData.data.length-1])
    })
  },

  setSuggestion: function (currentData) {
        var suggestMsg = ""
        if(currentData<=60){
          suggestMsg = "你的心率太低了，请加强";
        }
        else if(currentData>60&&currentData<=90){
          suggestMsg = "你的心率正常，请保持";
        }
        else if(currentData>90){
          suggestMsg = "你的心率太高了，请休息";
        }
        return suggestMsg;
  },

  onLoad: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: false,
      background: '#f5f5f5',
      series: [{
        name: '心率',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        format: function (val) {
          return val.toFixed(2);
        },
        min: 30,
        max: 120
      },
      width: windowWidth,
      height: 150,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },

  onShow: function (e) {
    setInterval(this.updateData, 500)
  }
});