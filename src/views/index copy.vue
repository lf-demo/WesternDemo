<template>
 <el-container class="index-con" >
  <el-container class="index-con" > 
    <el-aside :class="showclass" style=" overflow-x:hidden;padding:0px; height:calc(100vh-53px);min-height: 932px"> 
    <!-- <el-aside :class="showclass" style=" overflow-x:hidden;padding:0px; height:100vh">  -->
      <leftnav></leftnav>
    </el-aside>
    <el-container class="main-con">
      <el-header class="index-header" style="padding:0px;" >
        <navcon></navcon>
      </el-header>
      <el-main style="padding:0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container >
  <el-footer height="50px" style="padding:0px;"><bottom></bottom></el-footer>
 </el-container>
  <!-- <bottom class="bottom"></bottom> -->
</template>
<script>
// 导入组件
import navcon from '@/components/navcon.vue'
import leftnav from '@/components/leftnav.vue'
import bottom from '@/components/bottom.vue'
export default {
  name: 'index',
  data() {
    return {
      showclass: 'asideshow',
      showtype: false
    }
  },
  // 注册组件
  components: {
    navcon,
    leftnav,
    bottom
  },
  methods: {},
  created() {
    // 监听
    this.$root.Bus.$on('toggle', value => {
      if (value) {
        this.showclass = 'asideshow'
      } else {
        setTimeout(() => {
          this.showclass = 'aside'
        }, 300)
      }
    })
  },
  beforeUpdate() {},
  // 挂载前状态(里面是操作)
  beforeMount() {
    // 弹出登录成功
    this.$message({
      message: '登录成功',
      type: 'success'
    })
  }
}
</script>
<style >
.main{
  height: 100%;
  width: 100%;
}
.index-con {
  height: 120%;
  width: 100%;
  box-sizing: border-box;
}
.index-con {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.aside {
  width: 60px !important;
  /* width: 64px !important; */
  height: 100%;
  background-color: #334157;
  /* background-color:white; */

  margin: 0px;
}
.asideshow {
  width: 260px !important;
  height: 100%;
  background-color: #334157;
  /* background-color:white; */
  margin: 0px;
}
.index-header {
  padding: 0px;
  border-left: 2px solid #fff;
  height: 835px;
}
.bottom{
  padding: 0px;
  height: 15px;
}

</style>
