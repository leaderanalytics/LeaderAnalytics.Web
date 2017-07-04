var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        app: ['./wwwroot/app/main.js', './wwwroot/webpack/site.js']
    },
    
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },

            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },

            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]',
                    'image-webpack-loader?optimizationLevel=7&interlaced=false'
                ]
            }
        ],


        //preLoaders: [
        //    //All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        //    { test: /\.js$/, loader: "source-map-loader" }]
    },

    plugins: [
        new ExtractTextPlugin({ filename: '[name].css',  allChunks: false }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            hljs: "highlightjs"
        })
    ]
}