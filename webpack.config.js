    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    module.exports = {
        mode: 'development',
        entry: './src/index.js',
        devtool: "source-map",
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            assetModuleFilename: "[name][ext]",
        },

        module: {
            rules: [{
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        }
                    }
                },

                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /\.html$/,
                    type: "asset/resource",
                    generator: {
                        filename: "[name][ext]",
                    },
                }, {
                    test: /\.html$/i,
                    use: ["html-loader"],
                },

            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css",
            }),
            new HtmlWebpackPlugin({
                title: 'test',
                filename: "index.html",
                inject: "body"
            }),
        ],





        devServer: {
            client: {
                overlay: true
            },
            static: {
                directory: path.join(__dirname)
            },
            hot: true,


        },
    };