const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const fs = require("fs")
const utils = function(){
  var files = []
  var EXTENSION = '.js';
    var fullPath = path.resolve(__dirname, './src/utils')
    fs.readdirSync(fullPath).map((file)=>{
      var filePath = path.join(fullPath,file)
      var rs =  fs.statSync(filePath).isFile() && path.extname(filePath).toLowerCase() === EXTENSION 
      if(rs){
        files.push(filePath)
      }
    });
    console.log("file: ", files)
  return files;
}

const vendors = [
  "react",
  "react-dom",
  "react-router",
    "axios",
    "babel-preset-stage-0",
    "default-passive-events",
    "format-number",
    "immutable",
    "lodash-es",
    "react-bootstrap4-modal",
    "react-router-dom",
    "react-toastify",

];
module.exports = {
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, './public/library'),
    library: '[name]'
  },
  entry: {
      // "library": Object.assign([], vendors, utils())
      "library":  vendors
  },
  module: {
    rules: [
      // {test: /\.jsx?$/,exclude: /node_modules|bower_components/,use: [{loader:'babel-loader', query:{presets: ['react', 'es2015','stage-0']}}]},
      {test: /\.js?$/,exclude: /node_modules|bower_components/,use: [{loader:'babel-loader', query:{presets: ['react', 'es2015','stage-0']}}]},
    ]
  },
  plugins: [
      new webpack.DllPlugin({
        name: '[name]',
        path: './public/library/[name].json'
      }),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, './src/assets/vendor'),
          to: '../assets/vendor',
          ignore: ['.*']
        }
      ]),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, './src/assets/images'),
          to: '../assets/images',
          ignore: ['.*']
        }
      ])
  ],
}