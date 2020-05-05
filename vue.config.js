let path = require('path')
const urlCus = 'http://cars.hsdatawing.com/manager'

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  assetsDir: 'static',
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    open: false,
    proxy: {
      '/apiCus': {
        target: urlCus,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/apiCus': ''
        }
      },
      '/api': {
        target: urlCus,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.join(__dirname, 'src/views'))
      .set('@@', path.join(__dirname, 'src/components'))
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}
