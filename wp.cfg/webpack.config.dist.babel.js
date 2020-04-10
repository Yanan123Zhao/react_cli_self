const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.config.base.babel')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const antdTheme = require('../common/theme/antdTheme')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const {
  LoaderOptionsPlugin,
  ProvidePlugin,
  HashedModuleIdsPlugin
} = webpack

const configPath = path.resolve(__dirname, '../config/standalone.js')

const target = process.env.NODE_ENV
console.log('debug in enviroment ', target)

module.exports = (env) => {
  const field = (env && env.field) || 'default'
  console.log('-------------  Target field:', field, ' ----------------')
  const fieldConfigPath = `${path.resolve(__dirname, '../config/fields')}/${field}.json`

  return merge(base, {
    mode: 'production',
    entry: {
      bundle: ['babel-polyfill', path.resolve(__dirname, '../src/index.js')]
    },
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
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
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*', '!ico/**']
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
