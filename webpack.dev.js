const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.HotModuleReplacementPlugin(), //HMR

    ],
    devServer: { // 启动devServer，不会在本地生成文件，所有文件会编译在内存中(读取速度快)
        contentBase: path.join(__dirname,"dist"), //静态文件根目录
        overlay: true, // 错误信息直接显示在浏览器窗口中
        port:"1886",
        inline: true, // 实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台
        hot: true, // 配合webpack.NamedModulesPlugin、webpack.HotModuleReplacementPlugin完成MHR
        host: "0.0.0.0", // 设置为0.0.0.0并配合useLocalIp可以局域网访问
        useLocalIp: true, // 使用本机IP打开devServer，而不是localhost
        open:'chrome',

    },
    watchOptions: {
        ignored: /node_modules/, //忽略不用监听变更的目录
        aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
        poll:1000 //每秒询问的文件变更的次数
    },

});
