
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path');
const root = __dirname;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3005;

module.exports = {
  mode: "development",
  optimization: {
    moduleIds: 'hashed',
    noEmitOnErrors: true,
    minimize: false,
    minimizer: [new TerserPlugin({}), new OptimizeCSSPlugin({})],
    splitChunks: {
      // include all types of chunks
      chunks: 'async',
      minSize: 3000,
      maxSize: 0,
      minChunks: 5,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }

    }
  },
  entry: {
    index: ['babel-polyfill', path.resolve(root, 'src/layouts/home/index.js')],
    login: ['babel-polyfill', path.resolve(root, 'src/layouts/login/login.js')],
    forgotpassword: ['babel-polyfill', path.resolve(root, 'src/layouts/forgotpassword/forgotpassword.js')],
    resetpassword: ['babel-polyfill', path.resolve(root, 'src/layouts/resetpassword/resetpassword.js')],
    minisite: ['babel-polyfill', path.resolve(root, 'src/layouts/minisite/minisite.js')],
    loginAdmin: ['babel-polyfill', path.resolve(root, 'src/layouts/loginAdmin/loginAdmin.js')],
    management: ['babel-polyfill', path.resolve(root, 'src/layouts/management/management.js')]

  },
  // entry output
  output: {
    path: path.resolve(root, 'public'),
    publicPath: "/",
    filename: 'js/[name].bundle.js',
    crossOriginLoading: "anonymous",
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  watchOptions: {
    ignored: /node_modules/
  },

  

  // devtool: 'cheap-module-eval-source-map',
  // loaders
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules|bower_components|vendor|images/,
        include: [
          path.resolve(root, './src'),
        ],

        use: [{
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-0']
          }
        }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(root, 'css'),
              importLoaders: 1,
              minimize: true,
              modules: true
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg|ttf|woff2|woff|eot)$/gi,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "assets/images"
          }
        }
      },

      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /node_modules|bower_components/,
        include: [
          path.resolve(root, './src/component'),
        ],
        use: [{
          loader: 'file-loader'
        }]
      },

      {
        test: /\.(png|jpg|gif|xlsx)$/,
        exclude: /node_modules|bower_components/,
        include: [
          path.resolve(root, './src/component'),
        ],
        loader: 'url-loader?limit=819200'
      },
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname + '/'),
      path.resolve(__dirname + '/src'),
      path.resolve(__dirname + '/src/utils'),
      path.resolve(__dirname + '/src/validator'),
      path.resolve(__dirname + '/src/ui'),
      path.resolve(__dirname + '/node_modules'),
      path.resolve(__dirname + '/node_modules/stream-browserify/node_modules')
    ],
    alias: {
      'root': '/',
      '@': path.resolve(root, 'src'),
      'assets': path.resolve(root, 'assets'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      async: /\.js$/,
      preload: {
        test: /\.js$/,
        chunks: 'async'
      }
    }),

    new MiniCssExtractPlugin(
      {
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'css/[name].bundle.css',
        chunkFilename: 'css/[id].css',

        ignoreOrder: true,
      }
    ),

    new webpack.DefinePlugin({
      // "process.api_host": "'localhost'",
      // "process.api_http_port": "'3009'"
      "process.api_host": "'api.nextwavemonitoring.com'",
      "process.api_http_port": "''"
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./public/library/library.json'),
    }),

    new webpack.HotModuleReplacementPlugin(),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),

    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/layouts/home/index.html',
      chunks: ['manifest', 'vendor', 'index'],
      inject: true
    }),

    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './src/layouts/login/login.html',
      chunks: ['manifest', 'vendor', 'login'],
      inject: true
    }),

    new HtmlWebpackPlugin({
      filename: 'loginAdmin.html',
      template: './src/layouts/loginAdmin/loginAdmin.html',
      chunks: ['manifest', 'vendor', 'loginAdmin'],
      inject: true
    }),

    new HtmlWebpackPlugin({
      filename: 'forgotpassword.html',
      template: './src/layouts/forgotpassword/forgotpassword.html',
      chunks: ['manifest', 'vendor', 'forgotpassword'],
      inject: true
    }),

    new HtmlWebpackPlugin({
      filename: 'resetpassword.html',
      template: './src/layouts/resetpassword/resetpassword.html',
      chunks: ['manifest', 'vendor', 'resetpassword'],
      inject: true
    }),

    new HtmlWebpackPlugin({
      filename: 'minisite.html',
      template: './src/layouts/minisite/minisite.html',
      chunks: ['manifest', 'vendor', 'minisite'],
      inject: true
    }),

    new HtmlWebpackPlugin({
      filename: 'management.html',
      template: './src/layouts/management/management.html',
      chunks: ['manifest', 'vendor', 'management'],
      inject: true
    }),

    // copy custom assets assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './src/assets/common'),
        to: 'assets/common',
        ignore: ['.*']
      }
    ]),
    new WriteFilePlugin({
      // exclude hot-update files
      test: /^(?!.*(hot)).*/,
    }),

  ]
}