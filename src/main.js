import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入icon
import './assets/icon/iconfont.css'
Vue.config.productionTip = false

import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
Vue.use(Element)

import axios from 'axios'
import "./axios.js"
//引用全局
Vue.prototype.$axios = axios 
Vue.config.productionTip = false

import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;
// 过滤器

import 'ol/ol.css'
import "./mapOperation.js"

//引入Antd
// import "ant-design-vue/dist/antd.less";
new Vue({
  router,
  store,
  data: {
    // 空的实例放到根组件下，所有的子组件都能调用
    Bus: new Vue()
  },
  render: h => h(App)
  
}).$mount('#app')
