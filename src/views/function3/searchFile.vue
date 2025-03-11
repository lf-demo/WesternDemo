<!--
  功能：功能描述
  作者：Skindy
  时间：2023年05月02日 23:19:44
-->
<template>
    <div class="main">
        <div id = "content1">
            <div class="cssssss">
                <el-row>
                    <el-col :span="3" >
                        <el-select v-model="year" placeholder="请选择年份">
                            <el-option v-for="y in yearOptions" :key="y" :label="y" :value="y"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select v-model="month" placeholder="请选择月份">
                            <el-option v-for="m in monthOptions" :key="m" :label="m" :value="m"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select v-model="day" placeholder="请选择日期">
                            <el-option v-for="d in dateOptions" :key="d" :label="d" :value="d"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select v-model="hour" placeholder="请选择小时">
                            <el-option v-for="h in hourOptions" :key="h" :label="h" :value="h"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select v-model="minute" placeholder="请选择分钟">
                            <el-option v-for="min in minOptions" :key="min" :label="min" :value="min"></el-option>
                        </el-select>
                    </el-col>
                    <!-- <el-col :span="3"> -->
                <!-- <el-select v-model="hour" placeholder="请选择小时">
                    <el-option v-for="h in hourOptions" :key="h" :label="h" :value="h"></el-option>
                </el-select> -->
                    <!-- </el-col> -->
                    <el-col :span="3">
                        <el-select v-model="category" placeholder="选择站点">
                            <el-option v-for="t in typeOptions" :key="t" :label="t" :value="t"></el-option>
                            <!-- <el-option label="类型1" value="type1" />
                            <el-option label="类型2" value="type2" />
                            <el-option label="类型3" value="type3" /> -->
                        </el-select>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" @click="handleSearch">查询</el-button>
                    </el-col>
                </el-row>
            </div>
            <!-- 下面表格部分 -->
            <div class="table">
                <el-table :data=" getPaginatedData" :default-sort="{prop: 'id', order: 'ascending'}" style="width: 100%" stripe>
                <!-- <el-table :data="tableData" :default-sort="{prop: 'id', order: 'descending'}" style="width: 100%" stripe> -->
                <!-- <el-table :data="tableData" :default-sort="{prop: 'id', order: 'ascending'}" style="width: 100%" stripe> -->
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="fileName" label="文件名">

                    </el-table-column>
                    <el-table-column prop="date" label="日期"  />
                    <!-- <el-table-column prop="time" label="时间"  /> -->
                    <el-table-column prop="type" label="站点"  />
                    <!-- <el-table-column  label="文件描述"  /> -->
                    <el-table-column  prop="url" label="下载">
                        <template slot-scope="scope">
                            <el-button type="success"  v-on:click="clickbtn(scope.row.url,scope.row.filename)">下载 <i class="el-icon-download"></i></el-button>
                            <!-- <el-button type="danger">删除 <i class="el-icon-remove-outline"></i></el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
                <div id="page">
                    <el-pagination
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        :total="tableData.length"
                        @current-change="handleCurrentChange"
                        layout="total, sizes, prev, pager, next, jumper"
                        style="margin:0 auto"
                    ></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import $ from 'jquery'
export default {
  name: 'searchFile.vue',

    data () {
        return {
            yearOptions: [],
            monthOptions: [],
            dateOptions: [],
            hourOptions: [],
            minOptions: [],
            typeOptions:[
                "BALANGIR",
                "HAILAKANDI",
                "LATEHAR"

            ],
            year: '', // 初始值为空字符串，表示未选择
            month: '',
            day: '',
            hour: '',
            minute:'',
            category: '',
            currentPage: 1,
            pageSize: 10,
            total: 0,   //列表总数
            tableData: [{
                // id:1,
                // fileName:"20230503.nc",
                // date:'2023-5-3',
                // type:"类型3"
            }],
            filteredData: [],
            // filedata:[],
            filedata:[
                // {
                //     year:2023,
                //     month:5,
                //     day:3,
                //     filename:"20230503.000",
                //     category:"种类3"
                // },{
                //     year:2023,
                //     month:5,
                //     day:2,
                //     filename:"20230502.000",
                //     category:"种类2"
                // },{
                //     year:2023,
                //     month:5,
                //     day:1,
                //     filename:"20230501.000",
                //     category:"种类1"
                // },{
                //     year:2023,
                //     month:3,
                //     day:1,
                //     filename:"20230301.000",
                //     category:"种类1"
                // },{
                //     year:2023,
                //     month:4,
                //     day:1,
                //     filename:"20230401.000",
                //     category:"种类1"
                // },{
                //     year:2023,
                //     month:2,
                //     day:1,
                //     filename:"20230201.000",
                //     category:"种类3"
                // },{
                //     year:2022,
                //     month:5,
                //     day:1,
                //     filename:"20220501.000",
                //     category:"种类2"
                // },{
                //     year:2022,
                //     month:3,
                //     day:1,
                //     filename:"20220301.000",
                //     category:"种类1"
                // },{
                //     year:2023,
                //     month:2,
                //     day:1,
                //     filename:"20230201.000",
                //     category:"种类2"
                // },{
                //     year:2022,
                //     month:5,
                //     day:14,
                //     filename:"20220514.000",
                //     category:"种类2"
                // },{
                //     year:2022,
                //     month:12,
                //     day:1,
                //     filename:"20221201.000",
                //     category:"种类3"
                // },
            ],
        };
    },
    computed: {
        // getFilteredData() {
        //     const { year, month, date, hour, category } = this;

        //     if (!year && !month && !date && !hour && !category) {
        //         // 如果所有搜索条件均为空，则返回全部表格数据
        //         return [];
        //     }

        //     this.tableData = []
        //     tableData1 = this.tableData
        //     this.filedata.filter(item => {
        //         return (!year || item.year === year)
        //             && (!month || item.month === month)
        //             && (!date || item.day === date)
        //             // && (!hour || item.hour === hour)
        //             && (!category || item.category === category);
        //         // console.log(item)
        //         // this.tableData.push(item)

        //     });

        //     if (this.tableData.length === 0) {
        //         // 如果筛选后的数据为空，则给出提示
        //         // this.$message.warning('No matching data found');
        //     }
        //     return this.tableData;

        // },

        getPaginatedData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            // console.log(end)
            return this.tableData.slice(start, end);
        },
    },
    mounted() {
        // 初始化选项的取值范围
        this.initYearOptions();
        this.initMonthOptions();
        this.initDateOptions();
        this.inithourOptions();
        this.initminOptions();
        this.tableData = [];
        var files = JSON.parse(localStorage.getItem('files'));
        
        if(!files){
            files = this.getfiledata()    
        }
        this.filedata  = files
        // console.log(this.filedata)
        // console.log(this.minOptions)

        // // 获取表格数据
        // axios.get('http://localhost:3000/api/satellite_data_download')
        //     .then(res => {
        //         this.tableData = res.data;
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    },
    methods: {
        checkmore10(i){
            return i<10 ? "0"+i : i.toString() 
        },
        initYearOptions() {
            this.yearOptions = []
            // 获取当年和前3年的年份
            const year = new Date().getFullYear();
            for (let i = year - 2; i <= year; i++) {
                this.yearOptions.push(i.toString());
            }
        },
        initMonthOptions() {
            this.monthOptions = []
            // 获取月份的取值范围
            var month = 12
            const year = parseInt(this.year);
            if(year == new Date().getFullYear()){
                month = new Date().getMonth()+1
            }
            // console.log("month:",month)
            // console.log("selyear:",this.selyear)
            // console.log("mogetFullYearnth:",new Date().getFullYear())
            if(year)
                for (let i = 1; i <= month; i++) {
                    this.monthOptions.push(this.checkmore10(i));
                }
        },
        initDateOptions() {
            this.dayOptions= []
            // 获取日期的取值范围
            const year = parseInt(this.year);
            const month = parseInt(this.month);
            if (year && month) {
                var daysInMonth = new Date(year, month, 0).getDate();
                if(year == new Date().getFullYear() && month == (new Date().getMonth()+1)){
                    daysInMonth = new Date().getDate()
                }
                for (let i = 1; i <= daysInMonth; i++) {
                    this.dateOptions.push(this.checkmore10(i));
                }
            }
        },
        inithourOptions() {
            this.hourOptions = []
            const year = parseInt(this.year);
            const month = parseInt(this.month);
            const date = parseInt(this.day)
            var hour = 23
            if(year == new Date().getFullYear() && month == (new Date().getMonth()+1) && date == new Date().getDate()){
                hour = new Date().getHours();
            }
            if (year && month && date) {
                // 获取小时的取值范围
                            // console.log("hour",hour)

                for (let i = 0; i <= hour; i++) {
                    this.hourOptions.push(this.checkmore10(i));
                }
            }
        },
        initminOptions() {
            this.minOptions =[]
            const year = parseInt(this.year)
            const month = parseInt(this.month)
            const date = parseInt(this.day)
            const hour = parseInt(this.hour)
            var minute = 59
            if(year == new Date().getFullYear() && month == (new Date().getMonth()+1) && date == new Date().getDate() && hour == new Date().getHours()){
                minute = new Date().getMinutes()
                // console.log(minute)
            }
            minute = minute /15

            // 获取小时的取值范围
            if(year &&  month && date && hour)
                for (let i = 0; i <= minute; i++) {
                    this.minOptions.push(this.checkmore10(i*15));
                }
        },
        insertdata(f,i){
            var td = {}
            td.id = i
            td.fileName = f.filename
            td.type = f.category
            td.date = f.year + "-" + f.month + "-" + f.day+" " + f.hour +":"+f.min 
            td.url =f.url
            return td
        },
        getTableData(){
            this.tableData = []
            const { year, month, day,hour,minute, category } = this;
            // console.log(category)
            // console.log(this.tableData.length)

            // if (!year && !month && !date && !hour && !category) {
            //     // 如果所有搜索条件均为空，则返回全部表格数据
            //     this.tableData = [];
            // }

            if(!year){
                if(!category){
                    // this.tableData = this.filedata
                    this.filedata.forEach((f,i)=>{
                        var td = this.insertdata(f,i)
                        this.tableData.push(td)
                        // console.log(1)
                        // console.log(td)
                    })
                }else{
                    this.filedata.forEach((f,i)=>{
                        if(category == f.category){
                            var td = this.insertdata(f,i)
                            this.tableData.push(td)
                        } 
                        // console.log(2)
                                        
                    })
                }
            }else{
                if(!month){
                    if(!category){
                        this.filedata.forEach((f,i)=>{
                            if(f.year == year){
                                var td = this.insertdata(f,i)
                                this.tableData.push(td)
                            }
                            // console.log(3)
                        })
                    }
                    else{
                        this.filedata.forEach((f,i)=>{
                            if(f.year == year &&category == f.category){
                                var td = this.insertdata(f,i)
                                this.tableData.push(td)
                            }
                            
                            // console.log(4)
                        })
                    }
                        
                }else{
                    if(!day){
                        if(!category){
                            this.filedata.forEach((f,i)=>{
                                if(f.year == year && f.month == month){
                                var td = this.insertdata(f,i)
                                this.tableData.push(td)
                            }
                                // console.log(5)
                            })
                        }
                        else{
                            this.filedata.forEach((f,i)=>{
                                if(f.year == year && f.month == month &&category == f.category){
                                var td = this.insertdata(f,i)
                                this.tableData.push(td)
                            }
                                // console.log(6)
                            })

                        }
                            
                   }else{
                        if(!hour){
                             if(!category){
                                this.filedata.forEach((f,i)=>{
                                    if(f.year == year && f.month == month && f.day ==day){
                                        var td = this.insertdata(f,i)
                                        this.tableData.push(td)
                                    }
                                    // console.log(5)
                                })
                            }
                            else{
                                this.filedata.forEach((f,i)=>{
                                    if(f.year == year && f.month == month && f.day ==day && category == f.category){
                                    var td = this.insertdata(f,i)
                                    this.tableData.push(td)
                                }
                                    // console.log(6)
                                })

                            }    
                        }else{
                            if(!minute){
                                if(!category){
                                    this.filedata.forEach((f,i)=>{
                                        if(f.year == year && f.month == month && f.day ==day && hour ==f.hour){
                                            var td = this.insertdata(f,i)
                                            this.tableData.push(td)
                                        }
                                        // console.log(5)
                                    })
                                    }
                                    else{
                                        this.filedata.forEach((f,i)=>{
                                            if(f.year == year && f.month == month && f.day ==day && hour ==f.hour && category == f.category){
                                            var td = this.insertdata(f,i)
                                            this.tableData.push(td)
                                        }
                                            // console.log(6)
                                        })
                                }    
                            }
                            else{
                                if(!category){
                                    this.filedata.forEach((f,i)=>{
                                        if(f.year == year && f.month == month && f.day ==day && hour ==f.hour && minute == f.min){
                                            var td = this.insertdata(f,i)
                                            this.tableData.push(td)
                                        }
                                        // console.log(5)
                                    })
                                    }
                                    else{
                                        this.filedata.forEach((f,i)=>{
                                            if(f.year == year && f.month == month && f.day ==day && hour ==f.hour && minute == f.min && category == f.category){
                                            var td = this.insertdata(f,i)
                                            this.tableData.push(td)
                                        }
                                            // console.log(6)
                                        })
                                }    
                            }
                   }
                }

            }
            if(this.tableData == null || this.tableData == undefined || this.tableData ==[] || this.tableData.length == 0){
                this.tableData ==[]
            }

        }
        },
        getfiledata(){
            const i = 0
            var file =null 
            var files = []
            // this.filedata=[]
            // if(!this.type && !this.year && !this.month && !this.day && !this.hour && !this.minute){
            this.typeOptions.forEach((type)=>{
                this.yearOptions.forEach((year)=>{
                    var monthInYear = 12
                    if(year == new Date().getFullYear()){
                            monthInYear = new Date().getMonth()+1
                    }
                    for(var month = 1;month<=monthInYear;month++){
                        var daysInMonth = new Date(year, month, 0).getDate();
                        if(year == new Date().getFullYear() && month == (new Date().getMonth()+1)){
                            daysInMonth = new Date().getDate()
                        }
                        for(var day = 1;day<=daysInMonth;day++){
                             var hourInDay = 23
                            if(year == new Date().getFullYear() && month == (new Date().getMonth()+1) && day == new Date().getDate()){
                                hourInDay = new Date().getHours();
                            }
                            for(var hour =0 ;hour <= hourInDay;hour ++){
                                 var minuteInHour = 59
                                if(year == new Date().getFullYear() && month == (new Date().getMonth()+1) && day == new Date().getDate() && hour == new Date().getHours()){
                                    minuteInHour = new Date().getMinutes()
                                }
                                minuteInHour = minuteInHour /15
                                for(var min = 0; min <= minuteInHour; min++) {
                                            var _year=this.checkmore10(year)
                                            var _month=this.checkmore10(month)
                                            var _day=this.checkmore10(day)
                                            var _hour=this.checkmore10(hour)
                                            var _min = this.checkmore10(min*15)
                                            file = {
                                                year:_year,
                                                month:_month,
                                                day:_day,
                                                hour:_hour,
                                                min:_min,
                                                filename:_year+ _month+_day+_hour+_min+".nc",
                                                category:type,
                                                url:`/maps/img/Agricultural_station/`+type+"/"+year+"/"+_month+"/"+_day+"/" +_year+_month+_day+_hour+_min+".nc"
                                            }
                                            // console.log(_day)
                                            files.push(file)
                                }
                                    // console.log(minute)
                            }
                        }
                    }
                    
                })
            })
            // console.log(files.length)
            // localStorage.setItem('files', JSON.stringify(files));//额度太大 存不了
            return files
            // this.typeOptions.forEach((type)=>{
            // this.yearOptions.forEach((year)=>{
            //     this.monthOptions.forEach((month)=>{
            //         this.dayOptions.forEach((day)=>{
            //             this.hourOptions.forEach((hour)=>{
            //                 this.minOptions.forEach((min)=>{
            //                     file = {
            //                         year:year,
            //                         month:month,
            //                         day:day,
            //                         hour:hour,
            //                         min:min,
            //                         filename:year + month+day+hour+min+".nc",
            //                         category:type,
            //                         url:`maps/img/Agricultural station/`+type+"/"+year+"/"+month+"/"+year + month+day+hour+min+".nc"
            //                     }
            //                     console.log(file)
            //                     this.filedata.push(file)      
            //                 })  
            //              })
            //         })
            //     })
            // })})
        },
        handleSearch() {
            this.getTableData()
        },

        handleCurrentChange(val) {
            this.currentPage = val;
        },
        clickbtn(url,filename){
            console.log(url)
            // window.location.href(url)
            var isExists = 0;
            try{
                $.ajax({
                    url:url,
                    async:false,
                    type:'HEAD',
                    timeout:2000,
                    error:function(){
                        isExists=0;
                    },
                    success:function(){
                        isExists=1;
                    }
                
                });
            }catch{
                isExists=0;
            }
           

            if(isExists==1){

                const a = document.createElement('a');
                a.style.display = 'none';
                a.setAttribute('target', '_blank');
                /*
                * download的属性是HTML5新增的属性
                * href属性的地址必须是非跨域的地址，如果引用的是第三方的网站或者说是前后端分离的项目(调用后台的接口)，这时download就会不起作用。
                * 此时，如果是下载浏览器无法解析的文件，例如.exe,.xlsx..那么浏览器会自动下载，但是如果使用浏览器可以解析的文件，比如.txt,.png,.pdf....浏览器就会采取预览模式
                * 所以，对于.txt,.png,.pdf等的预览功能我们就可以直接不设置download属性(前提是后端响应头的Content-Type: application/octet-stream，如果为application/pdf浏览器则会判断文件为 pdf ，自动执行预览的策略)
                */
                filename && a.setAttribute('download', filename);
                a.href = url;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

            }else{

                this.$message({
					message: '文件暂不存在',
					// type: 'warning'
					type: 'error'
					})

            }
        }

    },


    watch: {
        // 监听年份和月份的变化，重新计算日期的取值范围
        year() {           
            // this.monthOptions = [];
            // this.initMonthOptions();
            // this.dateOptions = [];
            this.initMonthOptions();
            this.initDateOptions();
            this.inithourOptions();
            this.initminOptions();
        },
        month() {
            if(!this.year)
                this.month = ''
            // this.dateOptions = [];
            this.initDateOptions();
            this.inithourOptions();
            this.initminOptions();
        },
        day(){
            if(!this.month)
                this.day = ''
            this.inithourOptions();
            this.initminOptions();
        },
        hour(){
            if(!this.day)
                this.hour = ''
            this.initminOptions();
        }
    }
}

</script>
<style scoped>

    #main{
        width: 100%;
        height: 100%;
    }
    #content1{
        /* width: 75%; */
        /* margin: 0 auto; */
        padding-top: 3%;
    }
    #page{
        width: 50%;
        margin: 0 auto; 
    }
    .table{
        margin-top: 13px;
    }
</style>