var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require("webpack")

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      '@': resolve('src'),
      //以下是webpack引入jquery的配置
      // 如果是自行下载的
      'jquery': path.resolve(__dirname, '../static/js/jquery.min'),
      // 如果使用NPM安装的jQuery
      // 'jquery': 'jquery'
    }
  },
  module: {
    rules: [
      // shutdown the eslint validation
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
        // options: {
        //   loaders: {
        //     scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
        //     sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
        //   }
        // }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('/fonts/[name].[hash:7].[ext]')
        }
      },
      // {
      //   loader: 'sass-resources-loader',
      //   options: {
      //     resources: path.resolve(__dirname, '../src/assets/sass/_variables.scss')
      //   }
      // }
    ]
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    })
  ],
}
