const path = require('path');
const webpack = require('webpack');
const version = process.env.VERSION || require('./package.json').version;

const banner =
	'Hassanium Hooks v' +
	version +
	'\n' +
	'(c) ' +
	new Date().getFullYear() +
	' Hassan Al-Laham\n' +
	'Released under the MIT License.';

module.exports = {
	entry: ['babel-polyfill', './src/index.js'],
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'hassanium-hooks.js',
		library: 'HassaniumHooks',
		globalObject: 'this',
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-proposal-object-rest-spread'],
					},
				},
			},
		],
	},
	plugins: [
		new webpack.BannerPlugin({
			banner,
		}),
	],
};
