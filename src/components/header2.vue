/**
* 头部菜单
*/ 
<template>
  <!-- <el-menu class="el-menu-demo" mode="horizontal" background-color="#334157" text-color="#fff" active-text-color="#fff"> -->
  <el-menu class="el-menu-demo" mode="horizontal" >
    <div class="ptitle">
      <!-- <span>某系统配套积雪监测和极端天气识别应用</span> -->
              <img class="titlelogo" src="@/assets/img/titlelogo.png" > 

      </div>
    <!-- <div class="stitle"><span >上次更新时间2023-5-13 06:00:00</span></div>  -->
    <!-- <div class="stitle"><span >上次更新时间{{date}}</span></div>  -->
    <!-- <el-button class="buttonimg">
      <img class="showimg" :src="collapsed?imgsq:imgshow" @click="toggle(collapsed)">
    </el-button> -->
    

    <el-submenu index="2" style="float: right;height:75px">
    <!-- <el-submenu index="2" class="submenu" style="float: right;"> -->
      <!-- <template slot="title">{{user.userRealName}}</template> -->
      <template slot="title">超级管理员</template>
      <!-- <el-menu-item index="2-1">设置</el-menu-item>
      <el-menu-item @click="content()" index="2-2">个人中心</el-menu-item> -->
      <el-menu-item @click="exit()" index="2-3">退出</el-menu-item>
    </el-submenu>
        <!-- <button class="validation" style="float: right;">Validation</button> -->

  </el-menu>
  
</template>
<script>
// import { loginout } from '../api/userMG'
export default {
  name: 'navcon',
  data() {
    return {
      collapsed: false,
      imgshow: require('@/assets/img/show.png'),
      imgsq: require('@/assets/img/sq.png'),
      user: {},
      date:{}
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    this.user = JSON.parse(localStorage.getItem('userdata'))
  },
  methods: {
    // 退出登录
    exit() {
      this.$confirm('退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          setTimeout(() => {
            this.$store.commit('logout', 'false')
            this.$router.push({ path: '/login' })
            this.$message({
              type: 'success',
              message: '已退出登录!'
            })
          }, 1000)
          // loginout()
          //   .then(res => {
          //     if (res.success) {
          //       //如果请求成功就让他2秒跳转路由
          //       setTimeout(() => {
          //         this.$store.commit('logout', 'false')
          //         this.$router.push({ path: '/login' })
          //         this.$message({
          //           type: 'success',
          //           message: '已退出登录!'
          //         })
          //       }, 1000)
          //     } else {
          //       this.$message.error(res.msg)
          //       this.logining = false
          //       return false
          //     }
          //   })
          //   .catch(err => {
          //     // 获取图形验证码
          //     this.getcode()
          //     this.logining = false
          //     this.$message.error('退出失败，请稍后再试！')
          //   })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 切换显示
    toggle(showtype) {
      this.collapsed = !showtype
      this.$root.Bus.$emit('toggle', this.collapsed)
    },
    addzero(time){
      return time<10 ? ("0"+time) :(""+time)
    }
  },
  mounted() {
        const selyear = new Date().getFullYear();
        const selmonth = new Date().getMonth()+1;
        const selday = new Date().getDate();
        const selhour1 = new Date().getHours();
        const selhour = selhour1 < 12 ? 0 :12
        const selminute = new Date().getMinutes();
        const year =this.addzero(selyear)
        const month = this.addzero(selmonth)
        const day=this.addzero(selday)
        const hour =this.addzero(selhour)
        const minute = this.addzero(selminute)
        // const selsecond  = (Math.random() * 35).toFixed(0)
        const selsecond  = (selyear+ selmonth + selday )%35
        const second = this.addzero(selsecond)
        this.date = year +"-" +  month +"-" +  day +" " + hour+":"+minute+":"+second
        // this.date = selyear +"-" +  selmonth +"-" +  selday +" " + selhour+":"+selminute+""+selsecond
  },
}
</script>
<style scoped>
.ptitle{
		/* position: fixed ! important; */
    /* margin: 0 auto; */
    /* width: 238px; */
    margin: 0px;
    position:absolute;
  /* position: relative; */
     z-index:999; 
  /* top:90px; */
		top: 1%;
		left:3%;
		background-color: transparent;
    /* height: 100%; */

	}
.titlelogo{
  height: 80px;
}
.stitle{
		/* position: fixed ! important; */
    /* margin: 0 auto; */
    /* width: 238px; */
    margin: 0px;
    position:absolute;
  /* position: relative; */
     z-index:999; 
     margin-top:40px;
     margin-left: 265px;
  /* top:90px; */
		top: 14%;
		left:20%;
   
		background-color: transparent;
    /* height: 100%; */
	}
  span{ 
    font-size:20pt;
    font-family:'华文楷体';
    font-weight: bold;
    color: steelblue;
    letter-spacing:5px;
    /* font-family:"Bookman Old Style", "Century Gothic", "Helvetica Neue", Helvetica, "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", メイリオ, Meiryo, "ＭＳ Ｐゴシック", Arial, Verdana, sans-serif; */
    /* font-weight: normal; */
    }
.stitle span{
    font-size:8pt;
    /* font-family:'华文楷体'; */
    font-weight: normal;
     color: #555555;
    letter-spacing:5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
}
.submenu {
  float: right;
}
.buttonimg {
  height: 60px;
  background-color: transparent;
  border: none;
}
.buttonimg:focus, .el-buttonimg:hover{
    height: 60px;
    background-color: transparent;
    border: none;
} 
.showimg {
  width: 26px;
  height: 26px;
  position: absolute;
  top: 17px;
  left: 17px;
}
.showimg:active {
  border: none;
}
/* .el-button:focus, .el-button:hover{
  none;
} */
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
.vbox{
  width: 80px;
  float: right;
}
.vbox ul li {
    margin: 0px 3px;
    width: 80px;
    height: 30px;
    border-radius: 3px;
}
/* .vbox ul li.reg a{
        background-color: rgba(255,137,2,1.0);
    border: 1px solid rgb(255,255,255);
    border-radius: 3px;
    color: rgb(255,255,255);
    text-shadow: 1px 1px 2px rgba(128,0,0,0.8);
    box-shadow: 0px -12px 5px rgba(255,0,0,0.2) inset, 2px 2px 2px rgba(0,0,0,0.4);

} */
.vbox  ul {
    margin: 0px;
    padding: 0px;
    list-style-type: none;
    display: flex;
}
.vbox ul li a{
    margin-top: 9px;
    /* padding-top: 2px; */
    line-height: 39px;
    display: block;
    text-decoration: none;
    text-align: center;
    font-size: 10pt;
    height: 40px;
    border-radius: 3px;
    cursor: pointer;
    background-color: rgba(255,255,255,1.0);
    border: 1px solid rgb(150,150,150);
    border-radius: 3px;
    color: rgb(50,50,50);
    text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
    box-shadow: 0px -12px 5px rgba(0,0,0,0.1) inset, 2px 2px 2px rgba(0,0,0,0.4);
}
.vbox a:visited {
    color: steelblue;
    text-decoration: none;
}


</style>