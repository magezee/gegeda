const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

const common = require('./webpack.common')
const { PROJECT_PATH, SERVER_HOST, SERVER_PORT } = require('../constant')


module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'web',
  output: {
    filename: `[name].js`,
    publicPath: '/',
  },
  devServer: {
    host: SERVER_HOST,
    port: SERVER_PORT,
    contentBase: './dist',
    historyApiFallback: true,
    stats: 'errors-only',         
    clientLogLevel: 'none',     
    compress: true,               
    open: true,                   
    hot: true,         
    noInfo: true,         
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
})