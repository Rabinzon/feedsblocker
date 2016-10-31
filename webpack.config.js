const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		background: './src/background.js',
		content: './src/content.js'
	},
	output: {
		path: './dist/',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				context: './src/',
				from: "*",
				to: "./"
			}
		])
	]
};
