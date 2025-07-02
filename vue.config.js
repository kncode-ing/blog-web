const webpack = require('webpack');
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
   devServer: {
    // 代理配置
    proxy: {
      // 匹配以 /api 开头的请求（可自定义，和前端请求路径对应）
      '/api': {  
        // 后端接口的基础地址（实际后端服务地址）
        target: 'http://localhost:9999',  
        // 开启跨域（重要，让请求头携带来源）
        changeOrigin: true,  
        // 路径重写：去掉 /api 前缀（若后端接口无 /api 则配置）
        pathRewrite: { '^/api': '' }  
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  }
})
