/**
 * @file webpack.config
 * @author chencheng20
 * @date 13/11/2017
 */



const path = require('path'),
    webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    fs = require("fs");


process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const assetsPath = function (_path) {
    return path.posix.join('static', _path)
};


module.exports = {
    // devtool: 'cheap-module-source-map',
    devtool: 'cheap-module-eval-source-map',

    entry: {

        vendor: [
            "react",
            "react-dom",
            "react-router",
            "babel-regenerator-runtime"
        ],
        app: [
            'react-hot-loader/patch',
            './src/main.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        // publicPath: path.resolve(__dirname, "build", "assets"),
        publicPath: '/',
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: 'json-loader' },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },

            {

                test: /(\.css|\.scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {}
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                // sourceMap: true,
                                plugins: function () {
                                    return [
                                        require("autoprefixer")
                                    ];
                                }
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                // sourceMap: true
                            }
                        }
                    ]
                })
            },

            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }

        ]
    },

    devServer: {
        hot: true
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            path: path.resolve(__dirname, "build"),
            filename: "vendor.js",
            minChunks: Infinity,

        }),

        new ExtractTextPlugin('assets/main.css'),
        // new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin()
    ]
};