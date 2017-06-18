function data() {
  return {
      summaryDetail:[
        {
          "time": "13:30",
          "rate": 80,
          "summary_id": "http://localhost:8000/tests/14/"
        },
        {
          "time": "13:32",
          "rate": 100,
          "summary_id": "http://localhost:8000/tests/14/"
        },
        {
          "time": "13:34",
          "rate": 120,
          "summary_id": "http://localhost:8000/tests/14/"
        },
        {
          "time": "13:36",
          "rate": 132,
          "summary_id": "http://localhost:8000/tests/14/"
        },
        {
          "time": "13:38",
          "rate": 144,
          "summary_id": "http://localhost:8000/tests/14/"
        },
        {
          "time": "13:40",
          "rate": 146,
          "summary_id": "http://localhost:8000/tests/14/"
        },
        {
          "time": "13:42",
          "rate": 154,
          "summary_id": "http://localhost:8000/tests/14/"
        },
        {
          "time": "13:44",
          "rate": 172,
          "summary_id": "http://localhost:8000/tests/14/"
        },
        {
          "time": "13:46",
          "rate": 178,
          "summary_id": "http://localhost:8000/tests/14/"
        },
        {
          "time": "13:48",
          "rate": 159,
          "summary_id": "http://localhost:8000/tests/14/"
        },
        {
          "time": "13:50",
          "rate": 132,
          "summary_id": "http://localhost:8000/tests/14/"
        }
      ]
  }
}

function classSchedule() {
    return {
      classScheduleDetail:[
          {
            name:"游泳",
            date:"06.18",
            time:"15:00-17:00"
          },
          {
            name:"瑜伽",
            date:"06.19",
            time:"19:00-20:00"
          },
          {
            name:"搏击",
            date:"06.17",
            time:"10:00-11:00"
          },
          {
            name:"健美操",
            date:"06.28",
            time:"20:00-22:00"
          },
          {
            name:"搏击操",
            date:"06.20",
            time:"16:00-18:00"
          },
          {
            name:"游泳",
            date:"06.22",
            time:"15:00-17:00"
          },
          {
            name:"普拉提",
            date:"06.23",
            time:"19:00-21:00"
          },
          {
            name:"动感单车",
            date:"06.19",
            time:"15:00-17:00"
          },
          {
            name:"哑铃",
            date:"06.30",
            time:"18:00-19:00"
          }
      ]
    }
}

module.exports = {
  getSummaryData: data,
  getClassData:classSchedule
}