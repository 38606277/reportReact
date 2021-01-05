const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';


module.exports = {

    entry: {
        bundle: path.resolve(__dirname, './src/app.jsx')
        // //添加要打包在vendor里面的库
        // vendors: ['react','react-dom','react-router','antd'],
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js',
        // publicPath:"/build/"
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
                test: /\.(ts|tsx)$/,
                exclude: /node-modules/,
                use: [
                    'babel-loader', 'ts-loader'
                ]
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
                test: /\.less/,
                use: [
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
    resolve: {
        extensions: [".js", ".jsx", ".json",".ts",".tsx"]
},
    performance: {
        hints: false
    },
    plugins: [
        new webpack.DefinePlugin({//设置成production去除警告
            'process.env': {
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
            root: __dirname,
            verbose: true,
            dry: false,
            exclude: ['jslibs']
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css|\.less/,
                    chunks: 'all',
                    priority: 12,
                    enforce: true
                },
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 0,
                    enforce: true,
                },
              
                react1:{
                    name: 'react1',
                    test: module => /react-pivottable|react-grid-layout|react-chat-widget|react-codemirror|react-trend/.test(module.context),
                    chunks: 'async',
                    priority: 13,
                    enforce: true,
                },
                react: {
                    name: 'react',
                    test: module => /react|react-dom|react-router|react-router-dom|react-router-config/.test(module.context),
                    chunks: 'initial',
                    priority: 11,
                    enforce: true,
                },
                plotly:{
                    name: 'plotly',
                    test: module => /plotly/.test(module.context),
                    chunks: 'async',
                    priority: 13,
                    enforce: true,
                },
                antd: {
                    name: 'antd',
                    test: (module) => {
                        return /antd/.test(module.context);
                    },
                    chunks: 'async',
                    priority: 13,
                    // reuseExistingChunk: false,
                    enforce: true,
                },
                icons: {
                    name: 'icons',
                    test: (module) => {
                        return /icons/.test(module.context);
                    },
                    chunks: 'async',
                    priority: 13,
                    enforce: true,
                },
                moment: {
                    name: 'moment',
                    test: (module) => {
                        return /moment/.test(module.context);
                    },
                    chunks: 'async',
                    priority: 13,
                    enforce: true,
                },
                codemirror: {
                    name: 'codemirror',
                    test: (module) => {
                        return /codemirror/.test(module.context);
                    },
                    chunks: 'async',
                    priority: 13,
                    enforce: true,
                },
                exportExcel: {
                    name: 'codemirror',
                    test: (module) => {
                        return /js-export-excel/.test(module.context);
                    },
                    chunks: 'async',
                    priority: 13,
                    enforce: true,
                },
                bizcharts: {
                    name: 'bizcharts',
                    test: (module) => {
                        return /bizcharts|bizcharts-plugin-slider/.test(module.context);
                    },
                    chunks: 'async',
                    priority: 13,
                    enforce: true,
                },
                echarts: {
                    name: 'echarts',
                    test: (module) => {
                        return /echarts|echarts-for-react/.test(module.context);
                    },
                    chunks: 'async',
                    priority: 13,
                    enforce: true,
                },
                antv: {
                    name: '@antv',
                    test: (module) => {
                        return /@antv/.test(module.context);
                    },
                    chunks: 'async',
                    priority: 13,
                    enforce: true,
                },
                rc: {
                    name: 'rc',
                    test: (module) => {
                        return /rc-select|rc-tree|rc-time-picker|rc-menu|rc-tabs|rc-table|rc-calendar|lodash|rc-trigger|buffer|rc-form/.test(module.context);
                    },
                    chunks: 'async',
                    priority: 13,
                    enforce: true,
                },
                grapecity: {
                    name: '@grapecity',
                    test: (module) => {
                        return /@grapecity/.test(module.context);
                    },
                    chunks: 'async',
                    priority: 13,
                    enforce: true,
                }


            }
        }
    },
    externals: {
        'BMap': 'BMap',
        'BMapLib': 'BMapLib'
    },
};

