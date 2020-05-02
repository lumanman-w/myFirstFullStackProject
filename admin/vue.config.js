const path = require('path');

const resolve = dir => path.resolve(__dirname, dir);

const env = process.env.NODE_ENV;


module.exports = {
  // 基本路径配置，解决打包路径问题
  publicPath: './',

  devServer: {
    proxy: 'http://localhost:8080',
    public: '192.168.0.104:8080'  // 本地ip
  },

  // 配置less
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5
          })
        ]
      }
    }
  },

  configureWebpack: (config) => {
    // 如果不是开发环境
    if (env !== 'development') {

    }

    // 路径
    config.resolve = {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      }
    }
  },


  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('static', resolve('src/static'));
  },
}