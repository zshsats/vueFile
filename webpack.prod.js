const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const purifyCssWebpack = require("purifycss-webpack");
const glob = require("glob");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
           'process.env.NODE_ENV': JSON.stringify('production')
        }),
        // 消除冗余的css代码
        new purifyCssWebpack({
            paths:getCssHtml()
        }),
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true // set to true if you want JS source maps
        }),
        new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm:'gzip',
            test: /\.(js|css)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
});
function getCssHtml() {
    let cssHtml = [];
    glob.sync('./src/**/*.html',).forEach(function (item) {
        cssHtml.push(item);
    });
    return cssHtml;
}