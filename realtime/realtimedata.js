$(document).ready(function () {
    var heartData = [80, 110, 140, 160, 155, 140, 80, 110, 140, 160, 155, 140, 80, 110, 140, 160, 155, 140, 80,200];
    function realtimeRecommend(bpm){
        var recommendText = document.getElementById('recommendText');
        var nowHeartRate = document.getElementById('nowHeartRate');
        nowHeartRate.innerHTML = bpm;
        switch(true)
        {
        case bpm>170:
            recommendText.innerHTML = "心率偏高！稍微休息一下吧！";
            nowHeartRate.style.color = "#a94442";
            break;
        case bpm>120:
            recommendText.innerHTML = "心率最佳！继续加油!为你点赞！";
            nowHeartRate.style.color = "#8a6d3b";
            break;
        case bpm>80:
            recommendText.innerHTML = "心率偏低！加油哦！还可以做得更好！";
            nowHeartRate.style.color = "#3c763d";
            break;
        default:
            recommendText.innerHTML = "心率过低！是不是身体不适？休息一下";
            nowHeartRate.style.color = "#317085";
        }
    };
    function getRealData(nowtime){
        var obj ={
            rate: Math.floor(Math.random()*160 + 40),
            time: nowtime
        }
        return obj;
    };
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    function activeLastPointToolip(chart) {
        var points = chart.series[0].points;
        chart.tooltip.refresh(points[points.length -1]);
    };
    $('#realtimeheartRate').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            backgroundColor:'rgba(0,0,0,0)',
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0],
                        chart = this;
                    setInterval(function () {
                        var time = (new Date()).getTime();
                        var obj = getRealData(time);
                        var x = obj.time, // current time
                            y = obj.rate;
                        /*var y = {
                              y: Math.floor(Math.random()*140 + 60), 
                              marker: { 
                                  fillColor: '#BF0B23',
                                  radius: 10 
                              }
                            }*/
                        series.addPoint([x, y], true, true);
                        realtimeRecommend(y);
                        activeLastPointToolip(chart);
                    }, 1000);
                }
            }
        },
        title: {
            text: '运动心率实时数据'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: '心率(bpm)'
            },
            gridLineWidth: 0,
            tickInterval:40,
            min:40,
            max:200,
            plotBands:[
                {
                    from: 40,
                    to: 80,
                    color: '#d9edf7',
                    label: {
                        text: '过低',
                        style: {
                            color: '#317085'
                        }
                    }
                },
                {
                    from: 80,
                    to: 120,
                    color: '#dff0d8',
                    label: {
                        text: '偏低',
                        style: {
                            color: '#3c763d'
                        }
                    }
                },
                {
                    from: 120,
                    to: 170,
                    color: '#fcf8e3',
                    label: {
                        text: '最佳',
                        style: {
                            color: '#8a6d3b'
                        }
                    }
                },
                {
                    from: 170,
                    to: 200,
                    color:"#f2dede",
                    label: {
                        text: '偏高',
                        style: {
                            color: "#a94442"
                        }
                    }
                }
            ]
        },
        tooltip: {
            backgroundColor: {
                linearGradient: [0, 0, 0, 60],
                stops: [
                    [0, '#FFFFFF'],
                    [1, '#E0E0E0']
                ]
            }/*,
            style: {                      // 文字内容相关样式
                color: "#ff0000",
                fontSize: "12px",
                fontWeight: "blod",
                fontFamily: "Courir new"
            }*/
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            type: "spline",
            name: '现在心率',
            lineWidth:3,
            color:"rgba(0,0,0,0.5)",
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i*1000,
                        y: heartData[i+19]
                    });
                }
                return data;
            }()),
            dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return this.y;
                    },
            }
        }]
    }, function(c) {
        activeLastPointToolip(c)
    });
});
