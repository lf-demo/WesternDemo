/**
* 左边菜单
*/ 
<template>
  <el-menu default-active="2"  :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b" style=" overflow-x:hidden;">
  <!-- <el-menu default-active="2"  :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo"  active-text-color="steelblue" style=" overflow-x:hidden;"> -->
    <!-- <div class="logobox">
        <img class="logoimg" src="@/assets/img/satellites.png" alt=""> 

    </div> -->
    <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
    </template>

      <el-menu-item index="/index">
        <i class="el-icon-s-home" ></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/datadisplay">
        <i class="el-icon-setting"></i>
        <span slot="title">模型及二级资料展示</span>
      </el-menu-item>
      <!-- <el-menu-item index="/typhoonReg">
        <i class="el-icon-setting"></i>
        <span slot="title">台风识别</span>
      </el-menu-item> -->
      <!-- <el-menu-item index="/model2">
        <i class="el-icon-setting"></i>
        <span slot="title">积雪监测</span>
      </el-menu-item> -->
        <el-menu-item index="/searchFile">
        <i class="el-icon-setting"></i>
        <span slot="title">数据集浏览</span>
      </el-menu-item>
    </el-menu>
    <!-- <el-submenu v-for="menu in allmenu" :key="menu.menuid" :index="menu.menuname">
      <template slot="title">
        <i class="iconfont" :class="menu.icon"></i>
        <span>{{menu.menuname}}</span>
      </template>
    
      <el-menu-item-group>
        <el-menu-item v-for="chmenu in menu.menus" :index="'/'+chmenu.url" :key="chmenu.menuid">
          <i class="iconfont" :class="chmenu.icon"></i>
          <span>{{chmenu.menuname}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu> -->
  </el-menu>
</template>
<script>
// import { menu } from '../api/userMG'
export default {
  name: 'leftnav',
  data() {
    return {
      collapsed: true,
      // collapsed: false,
      allmenu: []
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    // 获取图形验证码
    let res = {
      success: true,
      data: [
        {
          menuid: 1,
          icon: 'el-icon-s-home',
          menuname: '首页',
          hasThird: null,
          url: null,
        },
        {
          menuid:1,
          icon: 'li-icon-dingdanguanli',
          menuname: '功能1',
          hasThird: null,
          url: null,
          
        },
        {
          menuid: 2,
          icon: 'li-icon-dingdanguanli',
          menuname: '功能2',
          hasThird: null,
          url: null,
          
        },
      ],
      msg: 'success'
    }
    this.allmenu = res.data
    this.$root.Bus.$on('toggle', value => {
      this.collapsed = !value
    })
  }
}
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 260px;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-bg {
  background-color: #1f2d3d !important;
}
.el-menu {
  border: none;
}
.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}
.logoimg {
  height: 40px;
}
</style>