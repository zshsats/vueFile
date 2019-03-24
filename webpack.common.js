const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    entry: {
        main:"./src/main.js"
    },
    output:{
        filename: 'js/[name].js',
        chunkFilename: 'js/chunk/[name].js',
        publicPath: '/',
        path:path.resolve(__dirname,"dist")
    },
    module: {
        rules: [
            // {
            //     test: /\.html$/,
            //     loaders: ['raw-loader'],
            //     exclude: /node_modules/
            // },

            {
                test: /\.(html|tpl)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src', 'audio:src','link:href'],
                        minimize: true
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader:'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                exclude:/node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                use:[
                    {
                        loader: 'url-loader',
                        options:{
                            limit: 8192,
                            name:'assets/fonts/[name].[ext]',
                            publicPath:"/"
                        }
                    }

                ]

            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/i,//正则表达式匹配图片规则
                use: [
                    {
                        loader:'url-loader',

                        options:{
                            limit: 8192,
                            name:'[name].[ext]',//images:图片打包的文件夹；
                            outputPath:"assets/images",
                            publicPath:"/assets/images"
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options:{
                    postLoaders: {
                        html: 'babel-loader'
                    }
                }
            },
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename:'css/[name].css',
            allChunks: true
        }),
        new htmlWebpackPlugin({
            template:'./src/index.html',
            favicon:'./src/assets/images/logo/favicon.ico', //favicon路径
            inject: true,
            cache:false,
            hash: true, //开启hash  ?[hash]
        }),
        new copyWebpackPlugin([
            {
                from: path.resolve(__dirname, "./src/assets/static"),
                to: 'assets/images',
            }

        ])
    ]


}


