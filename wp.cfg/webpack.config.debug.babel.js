const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.config.base.babel')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const antdTheme = require('../common/theme/antdTheme')

const {
  NoEmitOnErrorsPlugin,
  HotModuleReplacementPlugin
} = webpack

const configPath = path.resolve(__dirname, '../config/debug')

const serviceProxyTarget = 'http://192.168.1.180:8083'

const target = process.env.NODE_ENV
console.log('debug in enviroment ', target)

module.exports = (env) => {
  const field = (env && env.field) || 'default'
  console.log('-------------  Target field:', field, ' ----------------')
  const fieldConfigPath = `${path.resolve(__dirname, '../config/fields')}/${field}.json`

  return merge(base, {
    mode: 'development',
    devtool: /* 'cheap-module-eval-source-map' */ 'source-map',
    entry: {
      bundle: ['react-hot-loader/patch', path.resolve(__dirname, '../src/index.js')]
    },
    output: {
      path: path.resolve(__dirname, '../dev/dist'),
      publicPath: '/anaesthesia/dist/'
    },
    devServer: {
      hot: true,
      contentBase: path.resolve(__dirname, '../dev'),
      compress: true,
      historyApiFallback: true,
      // proxy https request to http server
      proxy: {
        '/authorization/api/web/**': {
          target: serviceProxyTarget,
          secure: false,
          changeOrigin: true
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'style-loader'
            }, {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  localIdentName: '[name]__[local]__[hash:base64:10]'
                }
              }
            }, {
              loader: 'postcss-loader'
            }, {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [
                    path.resolve(__dirname, '../src')
                  ]
                }
              }
            }, {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.resolve(__dirname, '../common/styles/theme.scss')
                ]
              }
            }
          ]
        }, {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            }, {
              loader: 'less-loader',
              options: {
                modifyVars: antdTheme,
                javascriptEnabled: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style.css',
        chunkFilename: '[id].css'
      }),
      new NoEmitOnErrorsPlugin(),
      new HotModuleReplacementPlugin(),
      // enable HMR globally
      // new NamedModulesPlugin(),
      // prints more readable module names in the browser console on HMR updates
      new webpack.ProvidePlugin({
        globalConfig: configPath,
        fieldConfig: fieldConfigPath
      })
    ]
  })
}
