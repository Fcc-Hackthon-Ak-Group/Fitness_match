/**
 * Created by yyuuq on 2017/6/18.
 */

$(document).ready(function () {
    //曲线图
    var summaryTitle = '运动心率轨迹图';
    var xData = [];
    var heartData = [];
    var heartZone={
        low:0,
        warm:0,
        cardio:0,
        high:0
    };
    $.getJSON("data.json",function (result) {
         $("span.averangeHeart").text(result[0].avg_rate_int);
         $("span.maxHeart").text(result[0].max_rate_int);
         $("span.calorie").text(result[0].cal_use_int);
         $("span.sportTime").text(result[0].time_spent_time);
         $("p.suggesting").text(result[0].advice_text);

    });

    $.getJSON("data-detail.json",function (result) {

        xData = result.map(function (e) {
            return e.time;
        });
        heartData = result.map(function (e) {
            if(e.rate_int<80){
                heartZone.low++
            }
            else if(e.rate_int>=80&&e.rate_int<120){
                heartZone.warm++
            }
            else if(e.rate_int>=120&&e.rate_int<160){
                heartZone.cardio++
            }
            else if(e.rate_int>=160){
                heartZone.high++
            }
            return e.rate_int;
        });
        var rateChart = echarts.init(document.getElementById('lineChart'));
        rateOption = {
            color:['rgba(0, 0, 0, 0.5)'],
            title : {
                text: summaryTitle,
                x:"left"
            },
            tooltip : {
                trigger: 'axis'
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: false},
                    dataView : {show: false, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                },
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : xData,
                    splitLine:{
                        show:false,
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    min : 40,
                    max : 200,
                    splitNumber: 4,
                    splitArea:{
                        show:true,
                        areaStyle:{
                            color: [
                                '#f2dede',
                                '#d9edf7',
                                '#dff0d8',
                                '#fcf8e3',
                                                       ]
                        }
                    }
                }
            ],
            series : [
                {
                    name:'心率',
                    type:'line',
                    data:heartData,
                    smooth:true,
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: '平均值'}
                        ]
                    }
                }
            ],
            grid:{
                x:30,
                y:50,
                x2:30,
                y2:30
            }
        };
        rateChart.setOption(rateOption);

    //饼图
        var pieChart = echarts.init(document.getElementById('piechart'));
        pieOption = {
            color: [
                '#31708f',
                '#3c763d',
                '#8a6d3b',
                '#a94442',
            ],
            title : {
                text : "运动区间占比",
                x:"center",
                y:"top"
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient : 'horizontal',
                x: "center",
                y : "bottom",
                data:['低于标准','热身阶段','最佳区间','高于标准']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: false},
                    dataView : {show: false, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'center',
                                max: 1548
                            }
                        }
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    name:'访问来源',
                    type:'pie',
                    center: ['50%', '50%'],
                    radius : ['50%', '70%'],
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                position : 'center',
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[
                        {value:heartZone.cardio, name:'最佳区间'},
                        {value:heartZone.warm, name:'热身阶段'},
                        {value:heartZone.low, name:'低于标准'},
                        {value:heartZone.high, name:'高于标准'},
                    ]
                }
            ]
        };
        pieChart.setOption(pieOption);
    });
});
