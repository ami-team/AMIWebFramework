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
	'defaults',
	'not ie 11',
	'not ie_mob 11'
];

/*--------------------------------------------------------------------------------------------------------------------*/

console.log(`Building for: ${BROWSER_LIST.join(', ')}`);

/*--------------------------------------------------------------------------------------------------------------------*/

const path = require('path');

const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

/*--------------------------------------------------------------------------------------------------------------------*/

function getResourceDirectory(filename)
{
	switch(path.extname(filename))
	{
		case '.gif':
		case '.png':
		case '.jpg':
		case '.jpeg':
		case '.svg':
			return 'images';

		case '.wasm':
			return 'wasm';

		default:
			return 'others';
	}
}

/*--------------------------------------------------------------------------------------------------------------------*/

const config = {
	'entry': {
		'controls/Accordion/AccordionCtrl': path.resolve(__dirname, 'controls/Accordion/AccordionCtrl.es6.js'),
		'controls/Adder/AdderCtrl': path.resolve(__dirname, 'controls/Adder/AdderCtrl.es6.js'),
		'controls/BookmarkBox/BookmarkBoxCtrl': path.resolve(__dirname, 'controls/BookmarkBox/BookmarkBoxCtrl.es6.js'),
		'controls/ConfirmBox/ConfirmBoxCtrl': path.resolve(__dirname, 'controls/ConfirmBox/ConfirmBoxCtrl.es6.js'),
		'controls/DashboardBox/DashboardBoxCtrl': path.resolve(__dirname, 'controls/DashboardBox/DashboardBoxCtrl.es6.js'),
		'controls/DataTable/DataTableCtrl': path.resolve(__dirname, 'controls/DataTable/DataTableCtrl.es6.js'),
		'controls/DiffBox/DiffBoxCtrl': path.resolve(__dirname, 'controls/DiffBox/DiffBoxCtrl.es6.js'),
		'controls/EditBox/EditBoxCtrl': path.resolve(__dirname, 'controls/EditBox/EditBoxCtrl.es6.js'),
		'controls/ElementInfo/ElementInfoCtrl': path.resolve(__dirname, 'controls/ElementInfo/ElementInfoCtrl.es6.js'),
		'controls/FieldEditor/FieldEditorCtrl': path.resolve(__dirname, 'controls/FieldEditor/FieldEditorCtrl.es6.js'),
		'controls/Graph/GraphCtrl': path.resolve(__dirname, 'controls/Graph/GraphCtrl.es6.js'),
		'controls/MediaViewer/MediaViewerCtrl': path.resolve(__dirname, 'controls/MediaViewer/MediaViewerCtrl.es6.js'),
		'controls/MessageBox/MessageBoxCtrl': path.resolve(__dirname, 'controls/MessageBox/MessageBoxCtrl.es6.js'),
		'controls/Schema/SchemaCtrl': path.resolve(__dirname, 'controls/Schema/SchemaCtrl.es6.js'),
		'controls/Search/SearchCtrl': path.resolve(__dirname, 'controls/Search/SearchCtrl.es6.js'),
		'controls/SimpleSearch/SimpleSearchCtrl': path.resolve(__dirname, 'controls/SimpleSearch/SimpleSearchCtrl.es6.js'),
		'controls/Tab/TabCtrl': path.resolve(__dirname, 'controls/Tab/TabCtrl.es6.js'),
		'controls/Table/TableCtrl': path.resolve(__dirname, 'controls/Table/TableCtrl.es6.js'),
		'controls/TextBox/TextBoxCtrl': path.resolve(__dirname, 'controls/TextBox/TextBoxCtrl.es6.js'),
		'controls/UnitEditor/UnitEditorCtrl': path.resolve(__dirname, 'controls/UnitEditor/UnitEditorCtrl.es6.js'),
		'subapps/Adder/AdderApp': path.resolve(__dirname, 'subapps/Adder/AdderApp.es6.js'),
		'subapps/AdminDashboard/AdminDashboardApp': path.resolve(__dirname, 'subapps/AdminDashboard/AdminDashboardApp.es6.js'),
		'subapps/BookmarkEditor/BookmarkEditorApp': path.resolve(__dirname, 'subapps/BookmarkEditor/BookmarkEditorApp.es6.js'),
		'subapps/Command/CommandApp': path.resolve(__dirname, 'subapps/Command/CommandApp.es6.js'),
		'subapps/Document/DocumentApp': path.resolve(__dirname, 'subapps/Document/DocumentApp.es6.js'),
		'subapps/ElementInfoViewer/ElementInfoViewerApp': path.resolve(__dirname, 'subapps/ElementInfoViewer/ElementInfoViewerApp.es6.js'),
		'subapps/Emergency/EmergencyApp': path.resolve(__dirname, 'subapps/Emergency/EmergencyApp.es6.js'),
		'subapps/ResetPassword/ResetPasswordApp': path.resolve(__dirname, 'subapps/ResetPassword/ResetPasswordApp.es6.js'),
		'subapps/SchemaViewer/SchemaViewerApp': path.resolve(__dirname, 'subapps/SchemaViewer/SchemaViewerApp.es6.js'),
		'subapps/Search/SearchApp': path.resolve(__dirname, 'subapps/Search/SearchApp.es6.js'),
		'subapps/SearchModeler/SearchModelerApp': path.resolve(__dirname, 'subapps/SearchModeler/SearchModelerApp.es6.js'),
		'subapps/SimpleSearch/SimpleSearchApp': path.resolve(__dirname, 'subapps/SimpleSearch/SimpleSearchApp.es6.js'),
		'subapps/TableViewer/TableViewerApp': path.resolve(__dirname, 'subapps/TableViewer/TableViewerApp.es6.js'),
		'subapps/TaskMonitoring/TaskMonitoringApp': path.resolve(__dirname, 'subapps/TaskMonitoring/TaskMonitoringApp.es6.js'),
		'subapps/UserDashboard/UserDashboardApp': path.resolve(__dirname, 'subapps/UserDashboard/UserDashboardApp.es6.js')
	},
	'output': {
		'filename': '[name].min.js',
		'chunkFilename': 'assets/js/chunks/[id].min.js',
		'path': path.resolve(__dirname),
		'assetModuleFilename': (o) => path.join(path.dirname(o.runtime), 'assets', getResourceDirectory(o.filename), '[hash][ext][query]')
	},
	'devServer': {
		'static': {
			'directory': path.join(__dirname, './'),
		}
	},
	'module': {
		'rules': [
			/*--------------------------------------------------------------------------------------------------------*/

			{
				'test': /\.js$/,
				'use': {
					'loader': 'babel-loader',
					'options': {
						'shouldPrintComment': () => false,
						'plugins': [
							['@babel/plugin-transform-for-of', {
								'loose': true
							}]
						],
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
				'type': 'asset/resource',
				'test': /\.wasm$/
			},

			/*--------------------------------------------------------------------------------------------------------*/

			{
				'type': 'asset/resource',
				'test': /\.(gif|png|jpg|jpeg|svg)$/,
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
	},
	'performance' : {
		'hints': false
	}
};

/*--------------------------------------------------------------------------------------------------------------------*/

module.exports = config;

/*--------------------------------------------------------------------------------------------------------------------*/
