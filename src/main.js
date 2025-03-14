import Vue from 'vue';
import App from './App.vue';

// 核心配置
Vue.config.productionTip = false;

// 第三方库引入
import Element from 'element-ui';
Vue.use(Element);

import axios from 'axios';
import './axios.js';
Vue.prototype.$axios = axios;

import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;

// 自定义模块引入
import router from './router';
import store from './store';
import './mapOperation.js';


const bus = new Vue();

new Vue({
  router,
  store,
  data: {
    Bus: bus
  },
  render: h => h(App)
}).$mount('#app');
