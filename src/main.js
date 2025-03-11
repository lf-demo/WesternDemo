const Vue = require('vue');
const App = require('./App.vue');
const router = require('./router');
const store = require('./store');
// 引入icon
require('./assets/icon/iconfont.css');
Vue.config.productionTip = false;

const Element = require('element-ui');
require("element-ui/lib/theme-chalk/index.css");
Vue.use(Element);

const axios = require('axios');
require("./axios.js");
//引用全局
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

const echarts = require('echarts');
Vue.prototype.$echarts = echarts;

// 过滤器
const custom = require('./utils/util');
const ol = require('ol');
require('ol/ol.css');
require("./mapOperation.js");
// import Tiff from 'tiff.js'
const Popup = require('ol-popup');
// import on your project (less then 1KB gziped)
// import vueSmoothScroll from 'vue2-smooth-scroll'
// Vue.use(vueSmoothScroll)
const shp = require('shapefile');
const togeojson = require('togeojson');
const smooth = require('chaikin-smooth');
const moment = require('moment');

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

}).$mount('#app');
