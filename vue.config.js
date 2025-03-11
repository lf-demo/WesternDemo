const { defineConfig } = require('@vue/cli-service');

// 判断当前是否为生产环境
const isProduction = process.env.NODE_ENV === 'production';

// 定义代理的公共配置
const commonProxyConfig = {
    changeOrigin: true, // 允许跨域
    pathRewrite: {
        '^': '/'
    }
};

module.exports = defineConfig({
    publicPath: './',
    transpileDependencies: true,
    // 根据环境变量控制是否开启语法检查，生产环境开启
    lintOnSave: isProduction,
    // 配置开发服务器
    devServer: {
        // 从环境变量中获取开发服务器主机，默认 localhost
        host: process.env.VUE_APP_DEV_HOST || 'localhost',
        // 从环境变量中获取开发服务器端口，默认 8089
        port: process.env.VUE_APP_DEV_PORT || 8089,
        proxy: {
            '/geoserver': {
                ...commonProxyConfig,
                // 从环境变量中获取 geoserver 代理目标
                target: process.env.VUE_APP_GEOSERVER_TARGET || 'http://127.0.0.1:8088'
            },
            '/maps': {
                ...commonProxyConfig,
                // 从环境变量中获取 maps 代理目标
                target: process.env.VUE_APP_MAPS_TARGET || 'http://127.0.0.1:8088/maps/'
            }
        }
    }
});