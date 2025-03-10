import Vue from 'vue'
import VueRouter from 'vue-router'
import loginRegister from '../views/loginRegister.vue'
// 首页
import index from '@/views/index';
// 主页
import Map from '@/views/system/Map';
import Map2 from '@/views/system/Map2';
// 模型1
import Model1 from '@/views/function1/model1';
// 模型2
import Model2 from '@/views/function2/model2';
import Maptest from '@/views/system/Maptest'
import TyphoonReg from '@/views/function1/TyphoonReg'
import searchFile from '@/views/function3/searchFile';
import datachart from '@/components/map/dataChart';
import validation from '@/views/Validation';

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect:"/index",
    meta: { requiresAuth: true }
  },
  {
	  path:'/login',
	  name:'login',
	  component: loginRegister
  },
  {
	  path:'/test',
	  name:'Maptest',
	  component: Maptest
  },
  {
	  path:'/validation',
	  name:'validation',
	  component: validation,
    meta: { requiresAuth: true }
  },
  {
	  path:'/chart',
	  name:'datachart',
	  component: datachart,
    meta: { requiresAuth: true }
  },{
    path: '/',
    name: 'index',
    component: index,
    iconCls: 'el-icon-s-home',
    children: [{
      path: '/index',
      name: '主页',
      component: Map,
      // component: Maptest,
      meta: {
          requireAuth: true
      },
    }]
  },{
    path: '/',
    name: 'home',
    component: index,
    iconCls: 'el-icon-s-home',
    children: [{
      path: '/datadisplay',
      name: '二级产品展示',
      component: Map2,
      // component: Maptest,
      meta: {
          requireAuth: true
      },
    }]
  },{
    path: '/',
    name: 'typhoonReg',
    component: index,
    iconCls: 'el-icon-setting',
    children: [{
      path: '/typhoonReg',
      name: '极端天气识别',
      component: TyphoonReg,
      meta: {
          requireAuth: true
      },
    }]
  },{
    path: '/',
    name: 'model1',
    component: index,
    iconCls: 'el-icon-setting',
    children: [{
      path: '/model1',
      name: '模型1',
      component: Model1,
      meta: {
          requireAuth: true
      },
    }]
  },{
    path: '/',
    name: 'model2',
    component: index,
    iconCls: 'el-icon-setting',
    children: [{
      path: '/model2',
      name: '模型2',
      component: Model2,
      meta: {
          requireAuth: true
      },
    }]
  },{
    path: '/',
    name: 'index',
    component: index,
    iconCls: 'el-icon-setting',
    children: [{
      path: '/searchFile',
      name: '查询数据文件',
      component: searchFile,
      meta: {
          requireAuth: true
      },
    }]
  },

]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: '/platform/',
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = checkLoginStatus() // 检查登录状态的函数
  const requiresAuth = to.matched.some(route => route.meta.requireAuth);
  // console.log(isLoggedIn)
  // console.log(requiresAuth)
  if ((to.meta.requiresAuth ||requiresAuth) && !isLoggedIn) {
    // 需要登录才能访问的页面，且未登录
    next('/login') // 跳转到登录页面
  } else {
    next() // 其他情况，放行
  }
})

function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  return isLoggedIn
}

export default router
