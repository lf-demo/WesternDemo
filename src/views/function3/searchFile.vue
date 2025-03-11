<!--
  功能：功能描述
  作者：Skindy
  时间：2023年05月02日 23:19:44
-->
<template>
  <div class="main">
    <div id="content1">
      <div class="cssssss">
        <el-row>
          <el-col :span="3">
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
          <el-table-column prop="date" label="日期"/>
          <!-- <el-table-column prop="time" label="时间"  /> -->
          <el-table-column prop="type" label="站点"/>
          <!-- <el-table-column  label="文件描述"  /> -->
          <el-table-column prop="url" label="下载">
            <template slot-scope="scope">
              <el-button type="success">下载 <i
                class="el-icon-download"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div id="page">
          <el-pagination
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="tableData.length"
            layout="total, sizes, prev, pager, next, jumper"
            style="margin:0 auto"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'searchFile.vue',

  data() {
    return {
      yearOptions: [],
      monthOptions: [],
      dateOptions: [],
      hourOptions: [],
      minOptions: [],
      typeOptions: [
        "BALANGIR",
        "HAILAKANDI",
        "LATEHAR"

      ],
      year: '', // 初始值为空字符串，表示未选择
      month: '',
      day: '',
      hour: '',
      minute: '',
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
      filedata: [],
    };
  },
  computed: {
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

    if (!files) {
      files = this.getfiledata()
    }
    this.filedata = files
  },
  methods: {
    checkmore10(i) {
      return i < 10 ? `0${i}` : i.toString();
    },

    generateOptions(count, step = 1) {
      return Array.from({length: count}, (_, i) => this.checkmore10(i * step));
    },

    initYearOptions() {
      const year = 12;
      this.yearOptions = Array.from({length: 3}, (_, i) => (year - 2 + i).toString());
    },

    initMonthOptions() {
      this.monthOptions = this.year ? this.generateOptions(12, 1) : [];
    },

    initDateOptions() {
      if (!this.year || !this.month) {
        this.dayOptions = [];
        return;
      }

      const currentDate = new Date();
      const selectedYear = Number(this.year);
      const selectedMonth = Number(this.month);
      const isCurrentMonth = selectedYear === currentDate.getFullYear() && selectedMonth === currentDate.getMonth() + 1;

      const daysInMonth = isCurrentMonth ? currentDate.getDate() : new Date(selectedYear, selectedMonth, 0).getDate();
      this.dayOptions = this.generateOptions(daysInMonth);
    },

    inithourOptions() {
      this.hourOptions = this.year && this.month && this.day ? this.generateOptions(24) : [];
    },

    initminOptions() {
      this.minOptions = this.year && this.month && this.day && this.hour ? this.generateOptions(4, 15) : [];
    },
    getfiledata() {
      return [];
    },


    watch: {
      // 监听年份和月份的变化，重新计算日期的取值范围
      year() {
        this.initMonthOptions();
        this.initDateOptions();
        this.inithourOptions();
        this.initminOptions();
      },
      month() {
        if (!this.year)
          this.month = ''
        // this.dateOptions = [];
        this.initDateOptions();
        this.inithourOptions();
        this.initminOptions();
      },
      day() {
        if (!this.month)
          this.day = ''
        this.inithourOptions();
        this.initminOptions();
      },
      hour() {
        if (!this.day)
          this.hour = ''
        this.initminOptions();
      }
    }
  }
}

</script>
<style scoped>

#main {
  width: 100%;
  height: 100%;
}

#content1 {
  /* width: 75%; */
  /* margin: 0 auto; */
  padding-top: 3%;
}

#page {
  width: 50%;
  margin: 0 auto;
}

.table {
  margin-top: 13px;
}
</style>
