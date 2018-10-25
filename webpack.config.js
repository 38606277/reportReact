/*
* @Author: Rosen
* @Date:   2018-01-13 11:26:52
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-07 10:35:01
*/
const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV); 
module.exports = {
    devtool: 'source-map',
    // entry: './src/app.jsx',
    entry: { 
        app: ["babel-polyfill", "./src/app.jsx"] 
        },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // publicPath: WEBPACK_ENV === 'dev' 
        //     ? '/dist/' : '//s.jianliwu.com/admin-v2-fe/dist/',
        filename: 'js/app.js',
        chunkFilename: 'js/[name].js'
    },
    // resolve: {
    //     // alias : {
    //     //     page        : path.resolve(__dirname, 'src/page'),
    //     //     component   : path.resolve(__dirname, 'src/component'),
    //     //     util        : path.resolve(__dirname, 'src/util'),
    //     //     service     : path.resolve(__dirname, 'src/service')
    //     // }
    // },
    module: {
        rules: [
            // react(jsx)语法的处理
            // react(jsx)语法的处理
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc:false,
                        presets: ['env', 'react','es2015','stage-0'],
                        plugins: [
                            'syntax-dynamic-import',
                            "transform-decorators-legacy",
                            ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 
                        ]

                    }
                }
            },
            // {
            //     test: /\.jsx$/,
            //     exclude: /(node_modules)/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['env', 'react']
            //         }
            //     }
            // },
            // css文件的处理
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            // sass文件的处理
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
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
    plugins: [
        // 处理html文件 
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './favicon.ico'
        }),
        // 独立css文件
        new ExtractTextPlugin("css/[name].css"),
        // 提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename: 'js/base.js'
        })
    ],
    devServer: {
        port: 8086,
        historyApiFallback: {
            index: '/dist/index.html'
        },
        proxy : {
            '/manage' : {
                target: 'http://admintest.happymmall.com',
                changeOrigin : true
            },
            '/user/logout.do' : {
                target: 'http://admintest.happymmall.com',
                changeOrigin : true
            }
        }
    }
};