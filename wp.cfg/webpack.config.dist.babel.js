const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.config.base.babel')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const antdTheme = require('../common/theme/antdTheme')

const {
  LoaderOptionsPlugin,
  ProvidePlugin,
  HashedModuleIdsPlugin
} = webpack

let configPath = path.resolve(__dirname, '../config/debug')

let target = process.env.NODE_ENV
console.log('debug in enviroment ', target)

module.exports = (env) => {
  const field = (env && env.field) || 'default'
  console.log('-------------  Target field:', field, ' ----------------')
  const fieldConfigPath = `${path.resolve(__dirname, '../config/fields')}/${field}.json`

  return merge(base, {
    mode: 'production',
    entry: {
      bundle: [path.resolve(__dirname, '../src/index.js')]
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/anaesthesia/dist/'
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '/anaesthesia/dist/'
              }
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
                    path.resolve(__dirname, '../src'),
                    // path.resolve(__dirname, '../libs'),
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
                javascriptEnabled: true,
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css'
      }),
      new LoaderOptionsPlugin({
        minimize: true
      }),
      new HashedModuleIdsPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        filename: path.resolve(__dirname, '../index.html'),
        template: path.resolve(__dirname, '../indexTemplate.html')
      }),
      new ProvidePlugin({
        fieldConfig: fieldConfigPath,
        globalConfig: configPath
      })
    ]
  })
}
