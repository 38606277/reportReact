const path = require("path");
const merge = require("webpack-merge");
const webpackConfigBase = require("./webpack.base.config");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackConfigDev = {
    devtool: 'source-map',
    mode: 'development',

    devServer: {
        port: 8086,
    },
    plugins:[
        new BundleAnalyzerPlugin()
    ],
}

module.exports = merge(webpackConfigBase, webpackConfigDev);

