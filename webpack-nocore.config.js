/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

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

console.log('Building: ' + BROWSER_LIST.join(', '));

/*--------------------------------------------------------------------------------------------------------------------*/

const path = require('path');

const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

/*--------------------------------------------------------------------------------------------------------------------*/

const config = {
	'entry': {
		'controls/Accordion/AccordionCtrl': path.resolve(__dirname, 'controls/Accordion/AccordionCtrl.es6.js'),
		'controls/Adder/AdderCtrl': path.resolve(__dirname, 'controls/Adder/AdderCtrl.es6.js'),
		'controls/BookmarkBox/BookmarkBoxCtrl': path.resolve(__dirname, 'controls/BookmarkBox/BookmarkBoxCtrl.es6.js'),
		'controls/ConfirmBox/ConfirmBoxCtrl': path.resolve(__dirname, 'controls/ConfirmBox/ConfirmBoxCtrl.es6.js'),
		'controls/DashboardBox/DashboardBoxCtrl': path.resolve(__dirname, 'controls/DashboardBox/DashboardBoxCtrl.es6.js'),
		'controls/EditBox/EditBoxCtrl': path.resolve(__dirname, 'controls/EditBox/EditBoxCtrl.es6.js'),
		'controls/Tab/TabCtrl': path.resolve(__dirname, 'controls/Tab/TabCtrl.es6.js'),
		'controls/Table/TableCtrl': path.resolve(__dirname, 'controls/Table/TableCtrl.es6.js'),
		'controls/TextBox/TextBoxCtrl': path.resolve(__dirname, 'controls/TextBox/TextBoxCtrl.es6.js'),
		'subapps/AdminDashboard/AdminDashboardApp': path.resolve(__dirname, 'subapps/AdminDashboard/AdminDashboardApp.es6.js'),
		'subapps/BookmarkEditor/BookmarkEditorApp': path.resolve(__dirname, 'subapps/BookmarkEditor/BookmarkEditorApp.es6.js'),
		'subapps/Command/CommandApp': path.resolve(__dirname, 'subapps/Command/CommandApp.es6.js'),
		'subapps/Document/DocumentApp': path.resolve(__dirname, 'subapps/Document/DocumentApp.es6.js'),
		'subapps/Emergency/EmergencyApp': path.resolve(__dirname, 'subapps/Emergency/EmergencyApp.es6.js'),
		'subapps/ResetPassword/ResetPasswordApp': path.resolve(__dirname, 'subapps/ResetPassword/ResetPasswordApp.es6.js'),
		'subapps/UserDashboard/UserDashboardApp': path.resolve(__dirname, 'subapps/UserDashboard/UserDashboardApp.es6.js')
	},
	'output': {
		'filename': '[name].min.js',
		'path': path.resolve(__dirname)
	},
	'module': {
		'rules': [
			/*--------------------------------------------------------------------------------------------------------*/

			{
				'test': /\.js$/,
				'exclude': /node_modules/,
				'use': {
					'loader': 'babel-loader',
					'options': {
						'shouldPrintComment': () => false,
						'presets': [
							['@babel/preset-env', {
								'loose': true,
								'targets': BROWSER_LIST
							}]
						]
					}
				}
			},

			/*--------------------------------------------------------------------------------------------------------*/

			{
				'type': 'asset/source',
				'test': /\.twig$/,
				'exclude': /node_modules/
			},

			/*--------------------------------------------------------------------------------------------------------*/

			{
				'type': 'asset/source',
				'test': /\.(json|yml|xml)$/,
				'exclude': /node_modules/
			},

			/*--------------------------------------------------------------------------------------------------------*/

			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					{
						'loader': 'postcss-loader',
						'options': {
							'postcssOptions': {
								'plugins': [
									['autoprefixer', {}]
								]
							}
						}
					}
				]
			}

			/*--------------------------------------------------------------------------------------------------------*/
		]
	},
	'externals': {
		'jquery': 'jQuery',
		'moment': 'moment',
		'select2': 'select2'
	},
	'plugins': [
		new ESLintPlugin({
			'failOnWarning': true
		})
	],
	'optimization': {
		'minimizer': [
			new TerserPlugin({
				'test': /\.min\.js$/,
				'parallel': true,
				'extractComments': () => false,
				'terserOptions': {
					'mangle': true
				}
			})
		]
	}
};

/*--------------------------------------------------------------------------------------------------------------------*/

module.exports = config;

/*--------------------------------------------------------------------------------------------------------------------*/
