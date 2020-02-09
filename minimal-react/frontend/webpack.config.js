var path = require('path');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname , 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(jsx?)$/,
                exclude: [path.resolve("./node_modules")],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/react'
                        ],
                        plugins: [
                            '@babel/plugin-syntax-jsx',
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    mode: 'development'
}
