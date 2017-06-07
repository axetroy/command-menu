const webpack = require('webpack'),
  path = require('path'),
  fileSystem = require('fs'),
  env = require('./utils/env'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  WriteFilePlugin = require('write-file-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin');

// load the secrets
const alias = {};

const secretsPath = path.join(__dirname, 'secrets.' + env.NODE_ENV + '.js');

if (fileSystem.existsSync(secretsPath)) {
  alias['secrets'] = secretsPath;
}

module.exports = {
  entry: {
    popup: path.join(__dirname, 'src', 'js', 'popup.js'),
    options: path.join(__dirname, 'src', 'js', 'options.js'),
    background: path.join(__dirname, 'src', 'js', 'background.js'),
    content: path.join(__dirname, 'src', 'js', 'content.js'),
    app: path.join(__dirname, 'src', 'js', 'app.js')
  },
  // excludeEntriesToHotReload: [
  //   "content",
  //   "parser"
  // ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  resolve: {
    alias: alias
  },
  plugins: [
    // expose and write the allowed env var on the compiled bundle
    new webpack.DefinePlugin({
      'process.env': '(' + JSON.stringify(env) + ')'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'options.html'),
      filename: 'options.html',
      chunks: ['options']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'background.html'),
      filename: 'background.html',
      chunks: ['background']
    }),
    new WriteFilePlugin(),
    new CopyWebpackPlugin([{ from: './src/icon', to: 'icon/' }])
  ].concat(
    env.NODE_ENV === 'production'
      ? [
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false,
              drop_console: false
            }
          })
        ]
      : []
  )
};
