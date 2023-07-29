const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 它支持webPack-dev-server的所有选项
  devServer: {
    proxy: {
        "/adminapi": {
            target: "http://localhost:3000", // 要访问的接口域名
            ws: true, // 是否启用websockets
            changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        }
    }
  }
})
