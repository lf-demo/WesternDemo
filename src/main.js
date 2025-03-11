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

// 引入echarts
// import echarts from 'echarts'

// import echarts from 'echarts';
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;
// 过滤器
import * as custom from './utils/util'
import ol from 'ol'
import 'ol/ol.css'
import "./mapOperation.js"
// import Tiff from 'tiff.js'
import Popup from 'ol-popup'
// import on your project (less then 1KB gziped)
// import vueSmoothScroll from 'vue2-smooth-scroll'
// Vue.use(vueSmoothScroll)
import shp from 'shapefile';
import togeojson from 'togeojson';
import smooth from 'chaikin-smooth'
import moment from 'moment'
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
