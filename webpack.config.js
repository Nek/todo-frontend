var webpack = require('webpack');

module.exports = {
	context: __dirname + "/app",
	entry: "./index.js",
	output: {
		path: __dirname + "/public/js",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			}
		]

	},
	plugins: [
			new webpack.ProvidePlugin({
				'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
			})
		]
}