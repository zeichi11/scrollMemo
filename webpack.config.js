const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',

    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },

    devServer: {
        hot: true,
        inline: true,
        host: '0.0.0.0',
        port: 4000,
        contentBase: __dirname + '/public'
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['env', 'react', 'stage-0']
                }
            }
        ]
    }


    // plugins: [
    //     new webpack.HotModuleReplacementPlugin()
    // ]
};