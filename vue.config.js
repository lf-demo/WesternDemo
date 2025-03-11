const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  // base: '/dist/',
  transpileDependencies: true,
  lintOnSave: false,  // 关闭语法检查 防止不必要的语法报错
  // 配置devServer
  devServer: {
    host: 'localhost', // 项目运行的ip
    port: 8089, // 项目运行的端口号
    // autoOpenBrowser:true,
    //代理设置
    proxy: {
      '/geoserver': {
          target: 'http://127.0.0.1:8088',//geoserver地址
          changeOrigin: true,//允许跨越
          pathRewrite:{
            '^/geoserver': '/'
        }

      },
      '/maps': {
          target: 'http://127.0.0.1:8088/maps/',//geoserver地址
          changeOrigin: true,//允许跨越
          pathRewrite:{
            '^/maps': '/'
        }

      }
  }
  }
})
