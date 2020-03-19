const path = require("path");
const webpackConfigBase = require("./webpack.base.config");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 

const webpackConfigProd = {
    mode: "production",
    plugins:[
        new  CleanWebpackPlugin(["build"],{
        root: path.join(__dirname,"../")
        }),
        new BundleAnalyzerPlugin()
    ],

   
};
module.exports = merge(webpackConfigBase, webpackConfigProd);

