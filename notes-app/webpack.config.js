module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + '/public/build/',
        publicPath: "build/",
        filename: "bundle.js"
    },
    module: { 
        rules: [ 
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader'],
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.gif$/,
                use: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg$/,
                use: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png$/,
                use: "url-loader?limit=10000&mimetype=image/png"
            },
            {
                test: /\.svg/,
                use: "url-loader?limit=26000&mimetype=image/svg+xml"
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
}