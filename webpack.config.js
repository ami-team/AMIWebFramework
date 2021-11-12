/*--------------------------------------------------------------------------------------------------------------------*/

const PACKAGE = require('./package.json');

/*--------------------------------------------------------------------------------------------------------------------*/

const BANNER = `AMI Web Framework (AWF) ${PACKAGE.version}

Copyright (c) 2014-${new Date().getFullYear()} CNRS/LPSC

Author: Jérôme Odier (jerome.odier@lpsc.in2p3.fr)

Repositories: https://gitlab.in2p3.fr/ami-team/AMIWebFramework/
              https://www.github.com/ami-team/AMIWebFramework/

This software is a computer program whose purpose is to provide an
HTTP / JavaScript framework to the ATLAS Metadata Interface (AMI)
ecosystem.

This software is governed by the CeCILL-C license under French law and
abiding by the rules of distribution of free software. You can use,
modify and/or redistribute the software under the terms of the CeCILL-C
license as circulated by CEA, CNRS and INRIA at the following URL
"http://www.cecill.info".

The fact that you are presently reading this means that you have had
knowledge of the CeCILL-C license and that you accept its terms.
`;

/*--------------------------------------------------------------------------------------------------------------------*/

const BROWSER_LIST = [
	'>= 1%',
	'last 1 major version',
	'not dead',
	'Chrome >= 45',
	'Firefox >= 38',
	'Edge >= 12',
	'Explorer >= 10',
	'iOS >= 9',
	'Safari >= 9',
	'Android >= 4.4',
	'Opera >= 30'
];

/*--------------------------------------------------------------------------------------------------------------------*/

console.log('Building AMI HTTP Client for: ' + BROWSER_LIST.join(', '));

/*--------------------------------------------------------------------------------------------------------------------*/

const path = require('path');
const webpack = require('webpack');

const CopyPlugin = require("copy-webpack-plugin");
const JsDocPlugin = require('jsdoc-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

/*--------------------------------------------------------------------------------------------------------------------*/

const config = {
	'entry': {
		'ami': path.resolve(__dirname, 'index.js'),
		'ami.min': path.resolve(__dirname, 'index.js')
	},
	'output': {
		'path': path.resolve(__dirname, 'js'),
		'filename': '[name].js'
	},
	'module': {
		'rules': [
			/*--------------------------------------------------------------------------------------------------------*/

			{
				'test': /\.js$/,
				'exclude': /node_modules/,
				'use': [
					{
						'loader': 'string-replace-loader',
						'options': {
							'search': '{{VERSION}}',
							'replace': PACKAGE.version,
							'flags': 'g'
						}
					},
					{
						loader: 'esbuild-loader',
						options: {
							target: 'es2015'
						}
					}
				]
			},

			/*--------------------------------------------------------------------------------------------------------*/

			{
				'type': 'asset/source',
				'test': /\.twig$/,
				'include': [path.resolve(__dirname, 'src/twigs')]
			},

			/*--------------------------------------------------------------------------------------------------------*/

			{
				'type': 'asset/resource',
				'test': /\.woff(2)?|eot|ttf|svg$/,
				'include': [path.resolve(__dirname, 'src/fonts'), path.resolve(__dirname, 'node_modules')],
				'generator': {
					'filename': 'assets/fonts/[name][ext]'
				}
			},

			/*--------------------------------------------------------------------------------------------------------*/

			{
				'type': 'asset/resource',
				'test': /\.(gif|png|jpg|jpeg|svg)$/,
				'include': [path.resolve(__dirname, 'src/images'), path.resolve(__dirname, 'node_modules')],
				'generator': {
					'filename': 'assets/images/[name][ext]'
				}
			},

			/*--------------------------------------------------------------------------------------------------------*/

			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},

			/*--------------------------------------------------------------------------------------------------------*/

			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}

			/*--------------------------------------------------------------------------------------------------------*/
		],
	},
	'externals': {
		'$': 'jQuery',
		'moment': 'moment',
		'select2': 'select2'
	},
	'plugins': [
		new CopyPlugin({
			'patterns': [
				/*----------------------------------------------------------------------------------------------------*/
				/* CSS                                                                                                */
				/*----------------------------------------------------------------------------------------------------*/

				{
					'from': path.resolve(__dirname, 'node_modules/bootstrap4/dist/css/bootstrap.min.css'),
					'to': path.resolve(__dirname, 'js/assets/css/bootstrap4.min.css')
				},
				{
					'from': path.resolve(__dirname, 'node_modules/bootstrap5/dist/css/bootstrap.min.css'),
					'to': path.resolve(__dirname, 'js/assets/css/bootstrap5.min.css')
				},
				{
					'from': path.resolve(__dirname, 'node_modules/select2/dist/css/select2.min.css'),
					'to': path.resolve(__dirname, 'js/assets/css/select2.min.css')
				},

				/*----------------------------------------------------------------------------------------------------*/
				/* JS                                                                                                 */
				/*----------------------------------------------------------------------------------------------------*/

				{
					'from': path.resolve(__dirname, 'node_modules/popper.js/dist/umd/popper.min.js'),
					'to': path.resolve(__dirname, 'js/assets/js/popper.min.js')
				},
				{
					'from': path.resolve(__dirname, 'node_modules/moment/min/moment.min.js'),
					'to': path.resolve(__dirname, 'js/assets/js/moment.min.js')
				},
				{
					'from': path.resolve(__dirname, 'node_modules/moment-jdateformatparser/moment-jdateformatparser.min.js'),
					'to': path.resolve(__dirname, 'js/assets/js/moment-jdateformatparser.min.js')
				},
				{
					'from': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js'),
					'to': path.resolve(__dirname, 'js/assets/js/jquery.min.js')
				},
				{
					'from': path.resolve(__dirname, 'node_modules/bootstrap4/dist/js/bootstrap.min.js'),
					'to': path.resolve(__dirname, 'js/assets/js/bootstrap4.min.js')
				},
				{
					'from': path.resolve(__dirname, 'node_modules/bootstrap5/dist/js/bootstrap.min.js'),
					'to': path.resolve(__dirname, 'js/assets/js/bootstrap5.min.js')
				},
				{
					'from': path.resolve(__dirname, 'node_modules/select2/dist/js/select2.min.js'),
					'to': path.resolve(__dirname, 'js/assets/js/select2.min.js')
				}

				/*----------------------------------------------------------------------------------------------------*/
			],
		}),
		new JsDocPlugin({
			'conf': './src/jsdoc/config.js',
			'cwd': '.'
		}),
		new ESLintPlugin({
			'failOnWarning': true
		}),
		new MonacoWebpackPlugin({
			'publicPath': '/monaco',
			'languages': [
				'sql',
				'xml', 'json', 'yaml',
				'text', 'html', 'markdown'
			],
		}),
		new webpack.BannerPlugin({
			'banner': BANNER
		})
	],
	'optimization': {
		'minimizer': [
			new TerserPlugin({
				'test': /\.min\.js$/,
				'parallel': true,
				'extractComments': false,
				'terserOptions': {
					'mangle': true,
					'format': {
						'comments': /AMI Web Framework/
					}
				}
			})
		]
	},
	'performance' : {
		'hints': false
	}
};

/*--------------------------------------------------------------------------------------------------------------------*/

module.exports = config;

/*--------------------------------------------------------------------------------------------------------------------*/
