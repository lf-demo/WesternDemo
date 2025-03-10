<!--
  功能：功能描述
  作者：Skindy
  时间：2023年04月29日 16:21:56
-->
<template>
  <div style="margin-left:15px">
      <div class="weather-wrapper">
        <div class="title-menu">
          <div style="margin-top:30px">时间</div>
          <div  class="shijian">温度(℃)</div>
          <div >湿度</div>
          <div>风速</div>
          <div>风向</div>
        </div>
        <div id="myChart" class="myChart" ></div>
    </div>
    
  </div>
</template>

<script>
  // import moment from 'moment'
  const moment = require('moment');
  const echarts = require('echarts');
  export default {
  name: 'dataChart.vue',
  data () {
    return {
        spinnVisible:true,
        data:{
          temp:[20, 22, 24, 22, 21, 22, 33],/* 温度 */
          ws10m:[10.8,10.2,10.1,10.7,9.6 ,10.8,11.8],/* 10m风速*/
          wd10m:['西北风','西北风','西北风','西北风','西北风' ,'西北风','西北风'],/* 10m风向 */
          datetime:[],/* 日期/时间 */
          rh:[50,60,50,40,43 ,42,33],/* 相对湿度 */
        },
        option: {  
          
        },
    }
  },
  methods: {
    init(){
        this.data.datetime = []
        for (var i=0;i<7;i++){
          // var day = today + timedelta(-(7-i-1)) 
          var btd = moment().subtract((6-i), 'days').format('YYYY-MM-DD')    
          // this.option.xAxis.data.push(btd)
          this.data.datetime.push(btd)
        //   this.data.datetime.push(btd)
        }
        // console.log(this.option.xAxis.data.length)
        // console.log(this.option.xAxis.data)
        var myChart = echarts.init(document.getElementById('myChart'))
        
        myChart.setOption(this.setChartsOption(this.data))
        this.spinnVisible=false
    },
    setChartsOption(){
      let { datetime,temp,ws10m,wd10m,rh } = this.data;
      // console.log(temp)
      // console.log(datetime)
      // console.log(ws10m)
      // console.log(wd10m)
      // console.log(rh)
      return {
        dataZoom: [
          // x轴拖拽
          // {
          //   show: true,
          //   // end: 10,
          //   top: "75%",
          // },
          // {
          //   show: true,
          //   type: "inside",
          // },
        ],
        grid: {
          top: "15%",
          bottom: "60%",
          left: "8.5%",
        },
          tooltip: {
              trigger: 'axis'
          },
          xAxis: [
            //日期
            {
              type: "category",
              boundaryGap: false,
              position: "top",
              offset: 40,
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                // color: "#fff",
                color: "#000",
                formatter: function (value, index) {
                  return value;
                },
                rich: {
                  times: {
                    color: "#f7b500",
                    padding: [2, 8, 2, 5],
                    borderRadius: 16,
                    width: 80,
                    height: 15,
                    backgroundColor: "rgba(247, 181, 0, 0.2)",
                    align: "center",
                  },
                  timesS: {
                    color: "#f7b500",
                    padding: [2, 8, 2, 5],
                    borderRadius: 16,
                    width: 80,
                    height: 15,
                    backgroundColor: "rgba(247, 181, 0, 0.2)",
                    align: "center",
                  },
                },
              },
              data: datetime,
            },
            {
                type: "category",
                boundaryGap: false,
                position: "bottom",
                offset: 24,
                zlevel: 100,
                axisLine: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  formatter: function (value) {
                    return value != "null" ? value + "%" : "-";
                  },
                  color: "#000",
                },
                data: rh,
          },{
                type: "category",
                boundaryGap: false,
                position: "bottom",
                offset: 55,
                zlevel: 101,
                axisLine: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  formatter: function (value) {
                    return value != "null" ? value + "m/s" : "-";
                  },
                  color: "#000",
                },
                data: [10.8,10.2,10.1,10.7,9.6 ,10.8,11.8],
          },
          {
                type: "category",
                boundaryGap: false,
                position: "bottom",
                offset: 90,
                zlevel: 102,
                axisLine: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  formatter: function (value) {
                    return value != "null" ? value + "" : "-";
                  },
                  color: "#000",
                },
                data: ['西北风','西北风','西北风','西北风','西北风' ,'西北风','西北风'],
                  // data: [10.8,10.2,10.1,10.7,9.6 ,10.8,11.8],

          },
          ],
          // xAxis: {
          //     type: 'category',
          //     // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          //     data:[],
          //     axisLabel:{
          //       textStyle:{
          //         fontSize:10
          //       }
          //     },
          // },
          yAxis: {
              type: 'value',
              // name: `温度(℃)`,
              axisLabel:{
                textStyle:{
                  fontSize:13,
                }
              },
              axisLine: {
                lineStyle: {
                  color: "#000",
                  fontSize: 21,
                },
              },
              splitLine: {
                //去除网格线
                show: false,
              },
              // axisLabel: {
              //   textStyle: {
              //     color: "#9aacb1",
              //   },
              // },
              offset: 58,
          },
          series: [
              {
                // show:true,
                data: [20, 22, 24, 22, 21, 22, 33],
                // data:this.legend.data,
                type: 'line',
                smooth: true,
                symbolSize: 10,
                 itemStyle: {
                  normal: {
                    // color: "#03F9C6",
                    color: "#000",
                  },
                },
                label: {
                  show: false,
                  position: "bottom",
                  // color: "#03F9C6",
                  color: "#000",
                  // formater: "{c} °C",
                },
                lineStyle: {
                  width: 3,
                  // color: 'white'
                },
                symbolSize: 18,
              }
          ]
      }
    },
    getDatetimeToday(){
      var today = moment().format('YYYY-MM-DD')
      console.log(today)
        // 过去
      // let btd = moment().add(-2, 'days').format('YYYY-MM-DD')
      var btd = moment().subtract(3, 'days').format('YYYY-MM-DD')
      console.log(btd) // 2020-11-07

      // 未来
      var atd = moment().add(2, 'days').format('YYYY-MM-DD')
      console.log(atd) // 2020-11-12
      return today
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style  lang="less" scoped>
@import "~@/styles/variables.less";
.weather-wrapper {
  
  position: relative;
  display: flex;
  .title-menu {
    width: 950px;
    min-width: 650px;
    font-size: 14px;
    color: "#000";
    margin-left: 7px;
    .shijian {
      margin-bottom: 190px;
    }
    div {
      margin-top: 15px;
    }
  }
  .myChart {
    width: 950px;
    padding-left: 10px;
    min-width: 600px;
    position: absolute;
    z-index: 999;
    height: 600px;
    top:5px;
  }
  

}
</style>
