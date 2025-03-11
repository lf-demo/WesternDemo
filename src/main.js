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

import moment from 'moment';
import shp from 'shapefile';
import togeojson from 'togeojson';
import smooth from 'chaikin-smooth';

// 自定义模块引入
import router from './router';
import store from './store';
import * as custom from './utils/util';
import './mapOperation.js';

// 地图相关引入

// 样式引入
import './assets/icon/iconfont.css';

// 创建事件总线
const bus = new Vue();

new Vue({
  router,
  store,
  data: {
    Bus: bus
  },
  render: h => h(App)
}).$mount('#app');
