const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, './src/app.jsx')
        // //添加要打包在vendor里面的库
        // vendors: ['react','react-dom','react-router','antd'],
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: ['env', 'react', 'es2015', 'stage-0'],
                        plugins: [
                            'syntax-dynamic-import',
                            "transform-decorators-legacy",
                            ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 
                        ]

                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                  'css-loader',
                  'postcss-loader',
                  'sass-loader',
                ],
              },
          {
            test:/\.less$/,
            use:[
                // MiniCssExtractPlugin.loader,
                {
                    loader: 'style-loader'
                }, {
                        loader: "css-loader",
                        options: { modules: true }
                    },
                    {
                        loader: "less-loader",
                        options: { javascriptEnabled: true }
                    }
                 ]
        },
         
        //    {
        //     test: /\.less$/,
        //     use:ExtractTextPlugin.extract({
        //         fallback: 'style-loader',
        //         use: [
        //             {
        //                 loader: "css-loader",
        //                 options: { modules: true }
        //             },
        //             {
        //                 loader: 'postcss-loader'
        //             },
        //             {
        //                 loader: "less-loader",
        //                 options: { javascriptEnabled: true }
        //             }
        //     ]})
        // },
        // 图片的配置
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'resource/[name].[ext]'
                    }
                }
            ]
        },
        // 字体图标的配置
        {
            test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'resource/[name].[ext]'
                    }
                }
            ]
        }
        ]
    },
    performance: {
        hints: false
    },
    optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all'
            },
            styles: {
                name: 'styles',
                test: /\.css$/,
                chunks: 'all',
                enforce: true
              }
          }
        }
    },
    plugins: [
        new webpack.DefinePlugin({//设置成production去除警告
            'process.env':{
                NODE_ENV: JSON.stringify("production")
            }
        }),

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
          }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './favicon.ico'
        }),
        new CleanWebpackPlugin(['dist',
            'build'], {
            root:__dirname,
            verbose: true,
            dry: false,
            exclude: ['jslibs']
        })
    ]
};

