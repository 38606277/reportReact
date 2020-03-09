const path = require("path");
const webpackConfigBase = require("./webpack.base.config");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const webpackConfigProd = {
    mode: "production",
    plugins:[
        new  CleanWebpackPlugin(["build"],{
        root: path.join(__dirname,"../")
        })
    ],
    externals: {
        'BMap': 'BMap',
        'BMapLib': 'BMapLib'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                },
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 10,
                    enforce: true,
                },
                react: {
                    name: 'react',
                    test: module => /react|redux/.test(module.context),
                    chunks: 'initial',
                    priority: 11,
                    enforce: true,
                },
                antd: {
                    name: 'antd',
                    test: (module) => {
                        return /ant/.test(module.context);
                    },
                    chunks: 'initial',
                    priority: 11,
                    enforce: true,
                },
                moment: {
                    name: 'moment',
                    test: (module) => {
                        return /moment/.test(module.context);
                    },
                    chunks: 'initial',
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
};
module.exports = merge(webpackConfigBase, webpackConfigProd);

