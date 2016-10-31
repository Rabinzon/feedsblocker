const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const stylusLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader');

module.exports = {
	entry: {
		background: './src/background.js',
		content: './src/content.js',
		popup: './src/popup.js',
		main: './src/popup.styl'
	},
	output: {
		path: './dist/',
		filename: '[name].js'
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js'
		},
		extensions: ['', '.js', '.styl']
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
			{
				test: /\.styl$/,
				loader: stylusLoader
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('[name].css'),
		new CopyWebpackPlugin([
			{
				context: './src/',
				from: '*',
				to: './'
			}
		], {
			ignore: ['*.styl']
		})
	]
};
