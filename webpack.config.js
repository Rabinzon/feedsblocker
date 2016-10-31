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
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
				plugins: ['ramda']
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
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
