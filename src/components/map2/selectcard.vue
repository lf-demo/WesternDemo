import { Text } from 'ol/style';
<!--
  功能：功能描述
  作者：Skindy
  时间：2023年05月08日 16:38:49
-->
<template>
  <div id="map_container">
        <!-- <div id="map_container"> -->
            <div id="console">
                <!-- <form name='select'> -->
                    <div id="dateSelect">

                        <select id='sely' name='year' v-model='selyear'>
                            <option v-for="option in yearOptions" v-bind:value="option">
                                {{ option }}
                            </option>
                        </select>&nbsp;/
                        <select id='selm' name='month' v-model='selmonth' style="width:55px;">
                            <option v-for="option in monthOptions" v-bind:value="option">
                                {{ option }}
                            </option>
                        </select>&nbsp;/
                        <select id='seld' name='day' v-model='selday' style="width:55px;">
                            <option v-for="option in dayOptions" v-bind:value="option">
                                {{ option }}
                            </option>    
                        </select>&nbsp;
                        <select id='selh' name='hour' v-model='selhour' style="width:55px;">
                            <option v-for="option in hourOptions" v-bind:value="option">
                                {{ option }}
                            </option>   
                            </select><span id='crn'>:</span>
                        <select id='selmin' name='min' v-model='selminute' style="width:55px;margin-right:15px">
                            <option v-for="option in minOptions" v-bind:value="option">
                                {{ option }}
                            </option>  
                        </select>
                        <!-- <span id='crn'>:</span> -->
                        <!-- <select id='selS' name='second' v-model='secondOptions' style="margin-right:15px"></select> -->
                        <!-- <span>Selected: {{ selyear }}</span> -->
                        <div id='timediv'>
                            <button name="search" type="button" v-on:click="clickbtn">跳转</button>
                            <button name="search" type="button" v-on:click="initimg">初始化</button>
                        </div>
                        <div id='ajttime' class="ajttime">
                            <button name="search" id='d1d' type="button" v-on:click="d1d">-01day</button>
                            <button name="search" id='d12h' type="button" v-on:click="d12h">-12hour</button>
                            <button name="search" id='pm' type="button" v-on:click="pm" style="width:80px !important">前一时刻</button>
                            <button name="search" id='Latest' type="button" v-on:click="Latest">最新</button>
                            <button name="search" id='a12h' type="button" v-on:click="a12h">+12hour</button>    
                            
                            <button name="search" id='lm' type="button" v-on:click="lm" style="width:80px !important">后一时刻</button>
                            <button name="search" id='a1d' type="button" v-on:click="a1d">+01day</button>
                        </div>
                    </div>

            </div>

            <!-- 列表框 -->
            <div class="map_menu">
                    <h3>模型应用</h3>
                    <div id="tips" >
                        积雪监测与台风识别
                    </div>
                    <div>
                        <ul id="prod">
                            <li id="SST1" v-on:click="addSnowDetectionLayer">雪盖监测</li>
                            <li id="SST2" v-on:click="addSnowDeepLayer">雪深监测(25km)</li>
                            <li id="SST2" v-on:click="addSnowDeep500mLayer">重点区域雪深监测（500m）</li>
                            <li id="SST3" v-on:click="addTyphoonLayer">台风识别</li>
                        </ul>
                    </div>
                <h3 style="padding-left:5px;margin-bottom:5px;width:85px;user-select:none; border:1px solid white;border-radius:5px" v-on:click="clickType" >二级产品<i class="el-icon-arrow-down" style="float:right;margin-top:3px;margin-right:10px"></i></h3>
                <div id="product">
                <div id="tips" >
                    将二级产品展示到地图上，点击下列标识即可显示
                </div>

                    <ul id="prod">
                        <li id="SST" v-on:click="addIMAGERLorticityLayer">200hpa相对涡量</li>
                        <li id="SSTJCP" v-on:click="addIMAGERWindShearLayer">风切变</li>
                        <li id="SSTLOR" v-on:click="addIMAGERWindShearTrendLayer">风切变趋势</li>
                        <li id="AOT" v-on:click="addIMAGERPrecipitationEstimationLayer">降水估计</li>
                        <li id="AOTMDL" v-on:click="addSOUNDERLayeredHumidity100mbLayer">分层湿度100mb</li>
                        <li id="SWR" v-on:click="addSOUNDERLayeredHumidity200mbLayer">分层湿度200mb</li>
                        <li id="CHL" v-on:click="addSOUNDERaridityIndexLayer">干燥指数</li>
                        <li id="WLF" v-on:click="addSOUNDEPotentialHeight100mbLayer">位势高度100mb</li>
                        <li id="CLOT" v-on:click="addSOUNDEPotentialHeight200mbLayer">位势高度200mb</li>
                    </ul>
                </div>

            </div>

            
        </div>
</template>

<script>
const moment = require('moment');
export default {
  name: 'selectcard.vue',
  data () {
    return {
        yearOptions: [],
        monthOptions: [],
        dayOptions: [],
        hourOptions: [],
        minOptions:[],
        secondOptions:[],
        selyear:null,
        selmonth:null,
        selday:null,
        selhour:null,
        selsecond:null,
        selminute:null,
        type:null,
        projstate :false
        // hourOptions:[]
    }
  },
  methods: {
    // clickbtn(){
    //     // console.log(this.year)
    //     // console.log(this.yearOptions)
    // },
    initYearOptions() {
        this.yearOptions = []
        // 获取当年和前30年的年份
        const year = new Date().getFullYear();
        for (let i = year - 2; i <= year; i++) {
            this.yearOptions.push(i.toString());
        }
    },
    initMonthOptions() {
            this.monthOptions = []
            // 获取月份的取值范围
            var month = 12
            const year = parseInt(this.selyear);
            if(year == new Date().getFullYear()){
                month = new Date().getMonth()+1
            }
            // console.log("month:",month)
            // console.log("selyear:",this.selyear)
            // console.log("mogetFullYearnth:",new Date().getFullYear())
            for (let i = 1; i <= month; i++) {
                this.monthOptions.push(this.checkmore10(i));
            }
        },
    initDateOptions() {
        this.dayOptions= []
        // 获取日期的取值范围
        const year = parseInt(this.selyear);
        const month = parseInt(this.selmonth);
        if (year && month) {
            var daysInMonth = new Date(year, month, 0).getDate();
            if(year == new Date().getFullYear() && month == (new Date().getMonth()+1)){
                daysInMonth = new Date().getDate()
            }
            for (let i = 1; i <= daysInMonth; i++) {
                this.dayOptions.push(this.checkmore10(i));
            }
        }
    },
    inithourOptions() {
        this.hourOptions = []
        const year = parseInt(this.selyear);
        const month = parseInt(this.selmonth);
        const date = parseInt(this.selday)
        var hour = 23
        if(year == new Date().getFullYear() && month == (new Date().getMonth()+1) && date == new Date().getDate()){
            hour = new Date().getHours();
        }
        // 获取小时的取值范围
        for (let i = 0; i <= hour; i++) {
            this.hourOptions.push(this.checkmore10(i));
        }
    },
    initminOptions() {
        this.minOptions =[]
        const year = parseInt(this.selyear)
        const month = parseInt(this.selmonth)
        const date = parseInt(this.selday)
        const hour = parseInt(this.selhour)
        var minute = 59
        if(year == new Date().getFullYear() && month == (new Date().getMonth()+1) && date == new Date().getDate() && hour == new Date().getHours()){
            minute = new Date().getMinutes()
            // console.log(minute)
        }
        // 获取小时的取值范围
        for (let i = 0; i <= minute; i++) {
            this.minOptions.push(this.checkmore10(i));
        }
    },
    init(){
        this.selyear = new Date().getFullYear();
        this.selmonth = ('0' + (new Date().getMonth()+1)).slice(-2);
        this.selday = ('0' + new Date().getDate()).slice(-2);
        this.selhour = ('0' + new Date().getHours()).slice(-2);
        this.selminute = ('0' + new Date().getMinutes()).slice(-2);
        var listItems = document.querySelectorAll('#prod li');
        
        listItems.forEach(function(li) {

            // 移除所有其他 <li> 元素的 'selected' 类
            listItems.forEach(function(item) {
            item.classList.remove('selected');
            });
        });
        this.initDateOptions()
        this.initYearOptions()
        this.initMonthOptions()
        this.inithourOptions()
        this.initminOptions()

        // console.log(this.minOptions)

    // let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
    // _this.gettime = yy+'/'+mm+'/'+dd+' '+hh+':'+mf+':'+ss;
    // console.log(_this.gettime)  
    },
    addIMAGERLorticityLayer(){
        this.$parent.addIMAGERLorticityLayer(this.selday)
        // console.log(this.selday)
        this.type = 1
    },
    addIMAGERWindShearLayer(){
        this.$parent.addIMAGERWindShearLayer(this.selday)
        // console.log(this.selday)
        this.type = 2
    },
    addIMAGERWindShearTrendLayer(){
        this.$parent.addIMAGERWindShearTrendLayer(this.selday)
        // console.log(this.selday)
        this.type = 3
    },
    addIMAGERPrecipitationEstimationLayer(){
        this.$parent.addIMAGERPrecipitationEstimationLayer(this.selday)
        // console.log(this.selday)
        this.type = 4
    },
    addSOUNDERLayeredHumidity100mbLayer(){
        this.$parent.addSOUNDERLayeredHumidity100mbLayer(this.selday)
        // console.log(this.selday)
        this.type = 5
    },
    addSOUNDERLayeredHumidity200mbLayer(){
        this.$parent.addSOUNDERLayeredHumidity200mbLayer(this.selday)
        // console.log(this.selday)
        this.type = 6 
    },
    addSOUNDERaridityIndexLayer(){
        this.$parent.addSOUNDERaridityIndexLayer(this.selday)
        // console.log(this.selday)
        this.type = 7
    },
    addSOUNDEPotentialHeight100mbLayer(){
        this.$parent.addSOUNDEPotentialHeight100mbLayer(this.selday)
        // console.log(this.selday)
        this.type = 8
    },
    addSOUNDEPotentialHeight200mbLayer(){
        this.$parent.addSOUNDEPotentialHeight200mbLayer(this.selday)
        // console.log(this.selday)
        this.type = 9
    },
    addSnowDetectionLayer(){
        const { selyear, selmonth, selday,selhour,selminute,selsecond, checkmore10 } = this;
        var timer=  selyear+ '-' + checkmore10(selmonth) + '-' + checkmore10(selday)+' '+checkmore10(selhour)+':'+checkmore10(selminute)+':'+'00';
        var dateObj = new Date(timer);
        if( (this.selhour == 10 && this.selminute >=30) || (this.selhour >10 && this.selhour<13) || (this.selhour == 13 && this.selminute <30)){
            this.selhour = 10 
            this.selminute = 30
        }else{
            if(this.selhour<=10){
                 dateObj.setDate(dateObj.getDate() - 1);
                 this.selday = ('0' + dateObj.getDate()).slice(-2);
            }
            this.selhour = 13 
            this.selminute = 30
            
        }
        this.$parent.addSnowDetectionLayer(this.selyear,this.selmonth,this.selday,this.selhour)

        this.type = 10
    },
    addSnowDeepLayer(){
        this.$parent.addSnowDeepLayer(this.selyear,this.selmonth,this.selday)
        this.type = 11
    },
    addSnowDeep500mLayer(){
        this.$parent.addSnowDeep500mLayer(this.selyear,this.selmonth,this.selday)
        this.type = 13
    },
    addTyphoonLayer(){
        this.$parent.addTyphoonLayer(this.selyear,this.selmonth,this.selday)
        this.type = 12
    },
    initimg(){
        this.$parent.initaddlayer()
        this.type = null
        this.$parent.recover()
        this.init()
        var d12h = document.getElementById('d12h');
        var pm = document.getElementById('pm');
        var a12h = document.getElementById('a12h');
        var lm = document.getElementById('lm');
        d12h.style.display = 'inline'; // 隐藏按钮1
        pm.style.display = 'none '; // 显示按钮2
        a12h.style.display = 'inline'; // 隐藏按钮1
        lm.style.display = 'none'; // 显示按钮2

    },
    clickbtn(){
        switch(this.type){
            case 1:this.addIMAGERLorticityLayer();break;
            case 2:this.addIMAGERWindShearLayer();break;
            case 3:this.addIMAGERWindShearTrendLayer();break;
            case 4:this.addIMAGERPrecipitationEstimationLayer();break;
            case 5:this.addSOUNDERLayeredHumidity100mbLayer();break;
            case 6:this.addSOUNDERLayeredHumidity200mbLayer();break;
            case 7:this.addSOUNDERaridityIndexLayer();break;
            case 8:this.addSOUNDEPotentialHeight100mbLayer();break;
            case 9:this.addSOUNDEPotentialHeight200mbLayer();break;
            case 10:this.addSnowDetectionLayer();break;
            case 11:this.addSnowDeepLayer();break;
            case 12:this.addTyphoonLayer();break;
            case 13:this.addSnowDeep500mLayer();break;
        }
    },
    clickType(){
        // var _this = this
        // console.log(_this)
        var domd = document.getElementById("product");
        // domd.css("display")
        // console.log(domd)
        if(this.projstate){
            domd.style.display = "none"
            this.projstate = false
        }        
        else{
             domd.style.display = "block"
            this.projstate = true

        }
            
    },
    checkmore10(i){
        return i<10 ? "0"+i : i.toString() 
    },
    formatDate(date){
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);
        var hour = ('0' + date.getHours()).slice(-2);
        var minute = ('0' + date.getMinutes()).slice(-2);
        var second = ('0' + date.getSeconds()).slice(-2);
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    },
    d1d(){
        const { selyear, selmonth, selday,selhour,selminute,selsecond, checkmore10 } = this;
        var timer=  selyear+ '-' + checkmore10(selmonth) + '-' + checkmore10(selday)+' '+checkmore10(selhour)+':'+checkmore10(selminute)+':'+'00';
        var dateObj = new Date(timer);
        // console.log(timer)

        // 日期加1
        dateObj.setDate(dateObj.getDate() - 1);
        this.selmonth = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        this.selday = ('0' + dateObj.getDate()).slice(-2);
        this.selhour = ('0' + dateObj.getHours()).slice(-2);
        this.selminute = ('0' + dateObj.getMinutes()).slice(-2);
        this.selsecond = ('0' + dateObj.getSeconds()).slice(-2);
        this.clickbtn()

        // // 小时加12
        // dateObj.setHours(dateObj.getHours() + 12);
        // 将结果转换为字符串日期
        // var result = this.formatDate(dateObj);
        // this.selyear = dateObj.getFullYear();


        // console.log(result)
    },
    d12h(){
        const { selyear, selmonth, selday,selhour,selminute,selsecond, checkmore10 } = this;
        var timer=  selyear+ '-' + checkmore10(selmonth) + '-' + checkmore10(selday)+' '+checkmore10(selhour)+':'+checkmore10(selminute)+':'+'00';
        var dateObj = new Date(timer);
        // console.log(timer)
        // 日期加1
        dateObj.setHours(dateObj.getHours() - 12);
        this.selmonth = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        this.selday = ('0' + dateObj.getDate()).slice(-2);
        this.selhour = ('0' + dateObj.getHours()).slice(-2);
        this.selminute = ('0' + dateObj.getMinutes()).slice(-2);
        this.selsecond = ('0' + dateObj.getSeconds()).slice(-2);
        // var result = this.formatDate(dateObj);
        // console.log(result)
        this.clickbtn()

    },
    a12h(){
        const { selyear, selmonth, selday,selhour,selminute,selsecond, checkmore10 } = this;
        var timer=  selyear+ '-' + checkmore10(selmonth) + '-' + checkmore10(selday)+' '+checkmore10(selhour)+':'+checkmore10(selminute)+':'+'00';
        var dateObj = new Date(timer);
        // console.log(timer)
        // 日期加1
        
        dateObj.setHours(dateObj.getHours() + 12);
        this.selmonth = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        this.selday = ('0' + dateObj.getDate()).slice(-2);
        this.selhour = ('0' + dateObj.getHours()).slice(-2);
        this.selminute = ('0' + dateObj.getMinutes()).slice(-2);
        this.selsecond = ('0' + dateObj.getSeconds()).slice(-2);
        // console.log('411',this.selhour)
        var hour =('0' + new Date().getHours()).slice(-2);
        // console.log('3',hour)
        if(this.selyear > new Date().getFullYear() || (this.selyear == new Date().getFullYear() && this.selmonth > (new Date().getMonth()+1))|| (this.selyear == new Date().getFullYear() && this.selmonth == (new Date().getMonth()+1) && this.selday>new Date().getDate()) || (this.selyear == new Date().getFullYear() && this.selmonth == (new Date().getMonth()+1) && this.selday==new Date().getDate() && this.selhour > hour)){
            this.$message({
            message: '时间已超出索引值',
            type: 'warning'
            // type: 'error'
            })
            this.selday = new Date().getDate()
            this.selhour = hour

        }else{
            this.clickbtn()

        }
        // console.log('44',this.selhour)
        // console.log('44',new Date().getHours)
        // console.log(this.selhour >hour)
        // this.selhour = new Date().getHours()
        

    },
    a1d(){
        const { selyear, selmonth, selday,selhour,selminute,selsecond, checkmore10 } = this;
        var timer=  selyear+ '-' + checkmore10(selmonth) + '-' + checkmore10(selday)+' '+checkmore10(selhour)+':'+checkmore10(selminute)+':'+'00';
        var dateObj = new Date(timer);
        // console.log(timer)

        // 日期加1
        dateObj.setDate(dateObj.getDate() + 1);
        this.selmonth = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        this.selday = ('0' + dateObj.getDate()).slice(-2);
        this.selhour = ('0' + dateObj.getHours()).slice(-2);
        this.selminute = ('0' + dateObj.getMinutes()).slice(-2);
        this.selsecond = ('0' + dateObj.getSeconds()).slice(-2);
        if(this.selyear > new Date().getFullYear() || (this.selyear == new Date().getFullYear() && this.selmonth > (new Date().getMonth()+1)) || (this.selyear == new Date().getFullYear() && this.selmonth == (new Date().getMonth()+1) && this.selday>new Date().getDate())|| (this.selyear == new Date().getFullYear() && this.selmonth == (new Date().getMonth()+1) && this.selday>new Date().getDate()) ){
            this.$message({
            message: '日期已超出索引值',
            type: 'warning'
            // type: 'error'
            })
            this.selday = new Date().getDate()
        }else{
            this.clickbtn()
        }
    },
    //后一时刻
    lm(){
        const { selyear, selmonth, selday,selhour,selminute,selsecond, checkmore10 } = this;
        // console.log(selday,selhour,selminute)
        var timer=  selyear+ '-' + checkmore10(selmonth) + '-' + checkmore10(selday)+' '+checkmore10(selhour)+':'+checkmore10(selminute)+':'+'00';
        var dateObj = new Date(timer);
        var hour =('0' + new Date().getHours()).slice(-2);
        if(this.selhour == '10' && this.selminute == '30'){
            this.selhour = '13' 
            this.selminute = '30'
                    

            if(this.selyear == new Date().getFullYear() && this.selmonth == (new Date().getMonth()+1) && this.selday==new Date().getDate() && this.selhour > hour){
                    this.$message({
                    message: '日期已超出索引值',
                    type: 'warning'
                    // type: 'error'
                    })
                    // this.selday = selday
                    this.selhour = '10'
                    // this.selminute = selminute
                    // console.log(11)
            }
        }else if(this.selhour == '13' && this.selminute == '30'){
            dateObj.setDate(dateObj.getDate() + 1);
            this.selday = ('0' + dateObj.getDate()).slice(-2);
            this.selhour = '10' 
            // this.selminute = '30'
            // var hour =('0' + new Date().getHours()).slice(-2);

            if(this.selyear > new Date().getFullYear() || (this.selyear == new Date().getFullYear() && this.selmonth > (new Date().getMonth()+1))|| (this.selyear == new Date().getFullYear() && this.selmonth == (new Date().getMonth()+1) && this.selday>new Date().getDate()) || (this.selyear == new Date().getFullYear() && this.selmonth == (new Date().getMonth()+1) && this.selday==new Date().getDate() && this.selhour > hour)){
                    this.$message({
                    message: '日期已超出索引值',
                    type: 'warning'
                    // type: 'error'
                    })
                    this.selday = selday
                    this.selhour = '13'
                    // this.selminute = selminute
                }

        }
        // console.log(this.selhour)

        this.clickbtn()
    },
    //前一时刻
    pm(){
        const { selyear, selmonth, selday,selhour,selminute,selsecond, checkmore10 } = this;
        var timer=  selyear+ '-' + checkmore10(selmonth) + '-' + checkmore10(selday)+' '+checkmore10(selhour)+':'+checkmore10(selminute)+':'+'00';
        var dateObj = new Date(timer);

        if(this.selhour == '10' && this.selminute == '30'){

            dateObj.setDate(dateObj.getDate() - 1);
            this.selday = ('0' + dateObj.getDate()).slice(-2);
            this.selhour = '13' 
            this.selminute = '30'
        }else if(this.selhour == '13' && this.selminute == '30'){
            this.selhour = '10' 
            this.selminute = '30'
        }
        this.clickbtn()

    },
    Latest(){
        this.selyear = new Date().getFullYear();
        this.selmonth = ('0' + (new Date().getMonth()+1)).slice(-2);
        this.selday = ('0' + new Date().getDate()).slice(-2);
        this.selhour = ('0' + new Date().getHours()).slice(-2);
        this.selminute = ('0' + new Date().getMinutes()).slice(-2);
        // var listItems = document.querySelectorAll('#prod li');
        this.clickbtn()
    }
    
  },
  mounted(){
    // this.clickbtn()
    this.init()
    var d12h = document.getElementById('d12h');
    var pm = document.getElementById('pm');
    var a12h = document.getElementById('a12h');
    var lm = document.getElementById('lm');
    d12h.style.display = 'inline'; // 隐藏按钮1
    pm.style.display = 'none '; // 显示按钮2
    a12h.style.display = 'inline'; // 隐藏按钮1
    lm.style.display = 'none'; // 显示按钮2
    // 获取所有的 <li> 元素
    var listItems = document.querySelectorAll('#prod li');

    // 遍历每个 <li> 元素并添加点击事件监听器
    listItems.forEach(function(li) {
    li.addEventListener('click', function() {
        // 移除所有其他 <li> 元素的 'selected' 类
        listItems.forEach(function(item) {
            item.classList.remove('selected');
        });
        
        // 给当前点击的 <li> 元素添加 'selected' 类
        this.classList.add('selected');
        var id = this.id;
        if(id=='SST1'){
            d12h.style.display = 'none'; // 隐藏按钮1
            pm.style.display = 'inline '; // 显示按钮2
            a12h.style.display = 'none'; // 隐藏按钮1
            lm.style.display = 'inline'; // 显示按钮2
        }else{
    d12h.style.display = 'inline'; // 隐藏按钮1
    pm.style.display = 'none '; // 显示按钮2
    a12h.style.display = 'inline'; // 隐藏按钮1
    lm.style.display = 'none'; // 显示按钮2
        }
    });
    });
  },
  watch: {
        // 监听年份和月份的变化，重新计算日期的取值范围
        selyear() {           
            // this.monthOptions = [];
            // this.initMonthOptions();
            this.dayOptions = [];
            this.monthOptions = [];
            this.hourOptions = [];
            this.minOptions = [];
            this.initDateOptions()
            this.initMonthOptions()
            this.inithourOptions()
            this.initminOptions()
            if(this.selday == 29 && this.selmonth == 2 && this.selday != this.dayOptions[(this.dayOptions).length-1])
                this.selday = this.dayOptions[(this.dayOptions).length-1]
        },
        selmonth() {
            this.dayOptions = [];
            this.hourOptions = [];
            this.minOptions = [];
            this.initDateOptions();
            this.inithourOptions()
            this.initminOptions()
        },
        selday(){
            this.hourOptions = [];
            this.minOptions = [];
            this.inithourOptions()
            this.initminOptions()

        },
        selhour(){
            this.minOptions = [];
            this.initminOptions()

        }
    }
}
</script>

<style scoped>
    .product{
        display : none
    }
        :root,
        :host {
            --ol-background-color: white;
            --ol-accent-background-color: #F5F5F5;
            --ol-subtle-background-color: rgba(128, 128, 128, 0.25);
            --ol-partial-background-color: rgba(255, 255, 255, 0.75);
            --ol-foreground-color: #333333;
            --ol-subtle-foreground-color: #666666;
            --ol-brand-color: #00AAFF;
        }


        #console {
            position: relative;
            top: 0px;
            left: 5px;
            height: 70px;
            width: 500px;
            z-index: 9;
            padding-left: 7px;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, 0.4);
        }

        #dateSelect {
            position: relative;
            top: 5px;
            box-sizing: border-box;
            color: rgb(255, 255, 255);
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
        }

        #dateSelect select {
            border-top: 1px solid dimgray;
            border-left: 1px solid dimgray;
            border-right: 1px solid silver;
            border-bottom: 1px solid silver;
            background-color: #444;
            color: #FFF;
            font-size: 16pt;
            line-height: 29px;
            width:80px;
            height: 29px;
            box-sizing: border-box;
            vertical-align: top;
        }

        /* #dateSelect option {
            border: 1px solid #555;
            font-weight: normal;
            color: #FFF;
            font-size: 11pt;
        } */

        input[name='obsdate'] {
            width: 200px;
            background-color: #444;
            border-top: 1px solid dimgray;
            border-left: 1px solid dimgray;
            border-right: 1px solid silver;
            border-bottom: 1px solid silver;
            color: rgb(255, 255, 255);
            font-size: 16pt;
            text-align: center;
            margin-right: 10px;
            cursor: pointer;
        }

        input[name='obstime'] {
            width: 120px;
            background-color: #444;
            border: 1px solid rgb(255, 255, 255);
            border-top: 1px solid dimgray;
            border-left: 1px solid dimgray;
            border-right: 1px solid silver;
            border-bottom: 1px solid silver;
            color: rgb(255, 255, 255);
            font-size: 16pt;
            text-align: center;
            margin-right: 10px;
            cursor: pointer;
        }

        .ui-menu-item {
            padding: 0px;
            font-size: 12pt;
        }


        #dateSelect button {
            color: rgb(0, 0, 0);
            border-top: 1px solid white;
            border-left: 1px solid white;
            border-right: 1px solid silver;
            border-bottom: 1px solid silver;
            background-color: rgba(220, 220, 220, 1.0);
            border-radius: 2px;
            box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
            width: 70px;
            height: 30px;
            line-height: 15px;
            vertical-align: top;
            padding: 0px;
            margin: 0px;
            cursor: pointer;
        }

        #dateSelect button:hover {
            background-color: rgba(255, 215, 0, 1.0);
        }

        .ajttime button{
            height: 20px !important;
            width: 65px !important;
            margin-top: 5px !important;
            margin-right: 23px !important;
        }


        /*
      div#dateSelect input {
        color: rgb(0,0,0);
        border-top: 1px solid white;
        border-left: 1px solid white;
        border-right: 1px solid silver;
        border-bottom: 1px solid silver;
        background-color: rgba(220,220,220,1.0);
        border-radius: 2px;
        box-shadow: 1px 1px 1px rgba(0,0,0,0.8);
        text-shadow: 1px 1px 1px rgba(0,0,0,0.2);
        width: 120px;
        height: 25px;
        cursor: pointer;
      }

      div#dateSelect input:hover {
        background-color: rgba(255,215,0,1.0);
      }

*/
        #changeImgCtrl {
            position: absolute;
            top: 40px;
            left: 0px;
            height: 25px;
            width: 600px;
            display: flex;
            flex-wrap: wrap;
            text-align: center;
            justify-content: center;
        }

        #changeImgCtrl button {
            color: rgb(0, 0, 0);
            border-top: 1px solid white;
            border-left: 1px solid white;
            border-right: 1px solid silver;
            border-bottom: 1px solid silver;
            background-color: rgba(220, 220, 220, 1.0);
            border-radius: 2px;
            box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
            width: 55px;
            cursor: pointer;
            font-size: 9pt;
        }

        #changeImgCtrl button[name='ltst'] {
            width: 80px;
        }

        #changeImgCtrl button:hover {
            background-color: rgba(255, 215, 0, 1.0);
        }

        #renewCont {
            width: 120px;
        }

        #changeImgCtrl button.off {
            background-color: rgba(100, 100, 100, 1.0);
            color: rgb(50, 50, 50);
        }

        #btnGroup {
            position: absolute;
            top: 5px;
            right: 10px;
            height: 50px;
            width: 450px;
            background-color: rgba(0, 0, 0, 0.4);
            border-radius: 5px;
            border: 1px solid dimgray;
            box-shadow:
                1px 1px 2px rgba(0, 0, 0, 0.8) inset,
                1px -1px 1px rgba(255, 255, 255, 0.8) inset;
            padding: 3px;
            color: white;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
            text-align: center;
        }

        .map_menu {
            position: absolute;
            top: 75px;
            left: 5px;
            width: 250px;
            background-color: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(0, 0, 0, 0.6);
            padding: 2px 5px;
            box-sizing: border-box;
            z-index: 3;
            display: block;
        }

        div.map_menu h3 {
            width: 100%;
            padding: 0px;
            margin: 0px;
            color: rgb(255, 255, 255);
            font-size: 10pt;
        }

        #tips {
            border: 1px dotted white;
            color: white;
            font-size: 8pt;
            box-sizing: border-box;
            padding: 5px;
            width: 98%;
            background-color: rgba(0, 0, 0, 0.5);
        }

        ul {
            display: block;
            list-style-type: disc;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            padding-inline-start: 40px;
        }

        #prod{
            margin: 0px auto 10px auto;
            z-index: 5;
            padding: 0px;
            list-style-type: none;
        }

        #prod1{
            margin: 0px auto 10px auto;
            z-index: 5;
            padding: 0px;
            list-style-type: none;
        }

        li {
            display: list-item;
            text-align: -webkit-match-parent;
        }

        #prod>li {
            cursor: pointer;
            width: 230px;
            border-top: 1px solid white;
            border-left: 1px solid white;
            border-right: 1px solid silver;
            border-bottom: 1px solid silver;
            background-color: rgba(60, 60, 60, 1.0);
            /* background-color: rgba(0,170,50,1.0); */
            border-radius: 5px;
            box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.8);
            color: #FFFFFF;
            line-height: 1.0em;
            margin: 5px auto;
            box-sizing: border-box;
            padding: 8px 10px;
            font-size: 10pt;
        }
        #prod>li:hover {
            background-color: rgb(165, 165, 44, 0.8);
        }
        .selected {
            background-color: rgba(0,170,50,1.0) !important;
        }
    </style>
</style>
