module.exports = {
	context: __dirname + "/app",
	entry: "./index.js",
	output: {
		path: __dirname + "/public/js",
		filename: "app.js"
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
	}
}