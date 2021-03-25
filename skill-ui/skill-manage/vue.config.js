const path = require('path')
const webpack = require('webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const GitRevision = new GitRevisionPlugin()
const buildDate = JSON.stringify(new Date().toLocaleString())
const createThemeColorReplacerPlugin = require('./config/plugin.config')
const theme = require('./src/core/css/theme')

function resolve (dir) {
  return path.join(__dirname, dir)
}

/**
 * 本地反向代理
 * 不要修改proxy对象，默认是本地后台地址
 * 如有特殊需求，创建proxy.js，复制以下代码，不要提交!!!
module.exports = {
  '/api': {
    target: 'http://121.36.43.209', // 'http://121.36.43.209',
    ws: false,
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }
}
 */
const proxy = {
  '/api': {
    // target: 'http://121.36.43.209/api', // 'http://121.36.43.209',
    target: 'http://121.36.43.209:81/api', // 'http://121.36.43.209',
    ws: false,
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }
}
let proxyConfig
if (process.env.NODE_ENV !== 'development') proxyConfig = null
else try {proxyConfig = require(resolve('./proxy'))} catch (f) {proxyConfig = proxy}

// check Git
function getGitHash () {
  try {
    return GitRevision.version()
  } catch (e) {}
  return 'unknown'
}

const isProd = process.env.NODE_ENV === 'production'
// 去console插件
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
// gzip压缩插件
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const assetsCDN = {
  // main.js里引入了对应的less以使 webpack-theme-color-replacer工作
  // https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.9/dist/antd.min.css
  css: [],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.1.2/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    'https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js',
    'https://cdn.jsdelivr.net/npm/moment@2.24.0/locale/zh-cn.js',
    'https://cdn.jsdelivr.net/npm/@antv/g2@3.5.7/dist/g2.min.js',
    'https://cdn.jsdelivr.net/npm/@antv/data-set@0.10.2/dist/data-set.min.js',
    'https://cdn.jsdelivr.net/npm/ant-design-vue@1.6.0/dist/antd-with-locales.js'
  ]
}
// webpack build externals
const prodExternals = {
  // key表示包名(import foo from 'xx' 里的xx)
  // value表示window下的全局变量名(库暴露出来的namespace,可查lib对应的webpack配置里的library字段)
  'vue': 'Vue',
  'axios': 'axios',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'moment': 'moment',
  '@antv/g2': 'G2',
  '@antv/data-set': 'DataSet',
  'ant-design-vue': 'antd'
}

// vue.config.js
const vueConfig = {
  // publicPath: isProd ? '/' : '/',
  configureWebpack: {
    // externals: prodExternals,
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.IgnorePlugin(/moment\//),
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        GIT_HASH: JSON.stringify(getGitHash()),
        BUILD_DATE: buildDate
      })
    ]
    // resolve: {
    //   alias: {
    //     '@ant-design/icons/lib/dist$': resolve('./src/core/antd/icons.js')
    //   }
    // }
  },

  chainWebpack: config => {
    config.resolve.alias.set('@$', resolve('src'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
    // assets require on cdn
    // config.plugin('html').tap(args => {
    //   args[0].cdn = assetsCDN
    //   return args
    // })
    // 分割打包
    config.optimization.splitChunks({
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        // libs: {
        //   name: 'chunk-libs',
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: 10,
        //   chunks: 'initial' // only package third parties that are initially dependent
        // },
        common: {
          name: 'chunk-common', // 打包后的文件名
          chunks: 'initial', //
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1,
          reuseExistingChunk: true
        },
        vue: {
          name: 'chunk-vue', // split vue into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?vue(.*)/ // in order to adapt to cnpm
        },
        antDesign: {
          name: 'chunk-ant-design', // split ant-design into a single package
          priority: 3, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]@ant-design[\\/]/, // in order to adapt to cnpm
          chunks: 'all',
          reuseExistingChunk: true,
          enforce: true
        },
        antDesignVue: {
          name: 'chunk-ant-design-vue', // split ant-design into a single package
          priority: 3, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/, // in order to adapt to cnpm
          chunks: 'initial',
          reuseExistingChunk: true,
          enforce: true
        },
        antv: {
          name: 'chunk-antv', // split ant-design into a single package
          priority: 3, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]@antv[\\/]/, // in order to adapt to cnpm
          chunks: 'all',
          reuseExistingChunk: true,
          enforce: true
        },
        lodash: {
          name: 'chunk-lodash', // split lodash into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?lodash(.*)/ // in order to adapt to cnpm
        },
        three: {
          name: 'chunk-three', // split three into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?three(.*)/ // in order to adapt to cnpm
        },
        moment: {
          name: 'moment', // split moment into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?moment(.*)/ // in order to adapt to cnpm
        },
        commons: {
          name: 'chunk-commons',
          test: resolve('src/components'), // can customize your rules
          minChunks: 3, //  minimum common number
          priority: 5,
          reuseExistingChunk: true
        }
      }
    }).minimizer = [
      new UglifyjsWebpackPlugin({
        // 生产环境推荐关闭 sourcemap 防止源码泄漏
        // 服务端通过前端发送的行列，根据 sourcemap 转为源文件位置
        sourceMap: process.env.NODE_ENV === 'development',
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      })
    ]
    config
      .plugin('compression')
      .use(CompressionWebpackPlugin)
      .tap(() => [
        {
          test: /\.js$|\.html$|\.css/, // 匹配文件名
          threshold: 10240, // 超过10k进行压缩
          deleteOriginalAssets: false // 是否删除源文件
        }
      ])
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: theme,
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    // development server port 8000
    port: 8000,
    proxy: proxyConfig
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: false,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

// 如果你不想在生产环境开启换肤功能，请打开下面注释
if (process.env.VUE_APP_PREVIEW === 'true') {
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
