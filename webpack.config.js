const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist' //where contents are served from
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // name of html file to be created
            template: './src/index.html' // source from which html file would be created
        }),
        new Dotenv()
    ],
    module: {
        rules: [
            {
                test: /\.js$/, //using regex to tell babel exactly what files to transcompile
                exclude: /node_modules/, // files to be ignored
                use: {
                    loader: 'babel-loader' // specify the loader
                }
            }
        ]
    }
}