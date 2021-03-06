/**
 * 项目配置
 */

var path = require('path')

module.exports = {
  // 项目部署的基础路径
  publicPath: './',
  // 构建好的文件输出到哪里
  outputDir: 'dist',
  lintOnSave: false,
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'static',
  // 是否为生产环境构建生成sourceMap
  productionSourceMap: false,

  // 调整内部的webpack配置
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@@': path.join(__dirname, 'public', 'configs'),
  //     }
  //   },
  // },

  configureWebpack: config => {
    // less Loader
    // config.module.rules.push({
    //   test: /\.less$/,
    //   loader: 'less-loader',
    //   options: 'less'
    // });
    return {
      resolve: {
        alias: {
          '@@': path.join(__dirname, 'public', 'configs'),
        }
      }
    };
  },

  // css配置
  css: {
    // 允许生成 CSS source maps
    sourceMap: false,
    loaderOptions: {
      // less: {
      //   data: `@import "~@/assets/css/_variable.less";@import "~@/assets/css/app.less";`
      // }
    },
  },

  // 第三方插件配置
  pluginOptions: {}
};
