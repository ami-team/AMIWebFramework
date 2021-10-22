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

'use strict';

import {loadSubApp} from './subapps';

import {loadControl} from './controls';

import {asArray, setup} from './tools';

/*--------------------------------------------------------------------------------------------------------------------*/
/* DYNAMIC RESOURCE LOADING                                                                                           */
/*--------------------------------------------------------------------------------------------------------------------*/

const _sheets = [];
const _scripts = [];

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @param {string} url
 * @returns {string}
 * @private
 */

function _getExtension(url)
{
	const idx = url.lastIndexOf('.');

	return idx > 0 ? url.substring(idx) : '';
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @param {string} url
 * @param {string} dataType
 * @returns {string}
 * @private
 */

function _getDataType(url, dataType)
{
	let result;

	if(dataType === 'auto')
	{
		/**/ if(url.indexOf('ctrl:') === 0)
		{
			result = 'control';
		}
		else if(url.indexOf('subapp:') === 0)
		{
			result = 'subapp';
		}
		else
		{
			switch(_getExtension(url).toLowerCase())
			{
				case '.css':
					result = 'sheet';
					break;

				case '.js':
					result = 'script';
					break;

				case '.json':
					result = 'json';
					break;

				case '.xml':
					result = 'xml';
					break;

				default:
					result = 'text';
					break;
			}
		}
	}
	else
	{
		result = dataType;
	}

	return result;
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @param {$.Deferred} deferred
 * @param {Array<*>} result
 * @param {Array<String>} urls
 * @param {string} dataType
 * @param {*} context
 * @private
 */

function __loadXXX(deferred, result, urls, dataType, context)
{
	if(urls.length === 0)
	{
		deferred.resolveWith(context, [result]);

		return;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	const url = urls.shift().trim();

	/*----------------------------------------------------------------------------------------------------------------*/

	const dataTYPE = _getDataType(url, dataType);

	/*----------------------------------------------------------------------------------------------------------------*/

	switch(dataTYPE)
	{
		/*------------------------------------------------------------------------------------------------------------*/
		/* CONTROL                                                                                                    */
		/*------------------------------------------------------------------------------------------------------------*/

		case 'control':

			loadControl(url).then((data) => {

				result.push(data);

				__loadXXX(deferred, result, urls, dataType, context);

			}, (message) => {

				deferred.rejectWith(context, [message]);
			});

			break;

		/*------------------------------------------------------------------------------------------------------------*/
		/* SUBAPP                                                                                                     */
		/*------------------------------------------------------------------------------------------------------------*/

		case 'subapp':

			loadSubApp(url).then((data) => {

				result.push(data);

				__loadXXX(deferred, result, urls, dataType, context);

			}, (message) => {

				deferred.rejectWith(context, [message]);
			});

			break;

		/*------------------------------------------------------------------------------------------------------------*/
		/* SHEET                                                                                                      */
		/*------------------------------------------------------------------------------------------------------------*/

		case 'sheet':

			if(_sheets.indexOf(url) >= 0)
			{
				result.push(false);

				__loadXXX(deferred, result, urls, dataType, context);
			}
			else
			{
				$.ajax({
					url: url,
					async: false,
					cache: false,
					crossDomain: true,
					dataType: dataTYPE,
				}).then(() => {

					result.push(true);

					_sheets.push(url);

					__loadXXX(deferred, result, urls, dataType, context);

				}, () => {

					deferred.rejectWith(context, [`cannot load '${url}'`]);
				});
			}

			break;

		/*------------------------------------------------------------------------------------------------------------*/
		/* SCRIPT                                                                                                     */
		/*------------------------------------------------------------------------------------------------------------*/

		case 'script':

			if(_scripts.indexOf(url) >= 0)
			{
				result.push(false);

				__loadXXX(deferred, result, urls, dataType, context);
			}
			else
			{
				$.ajax({
					url: url,
					async: false,
					cache: false,
					crossDomain: true,
					dataType: dataTYPE,
				}).then(() => {

					result.push(true);

					_scripts.push(url);

					__loadXXX(deferred, result, urls, dataType, context);

				}, () => {

					deferred.rejectWith(context, [`cannot load '${url}'`]);
				});
			}

			break;

		/*------------------------------------------------------------------------------------------------------------*/
		/* OTHER                                                                                                      */
		/*------------------------------------------------------------------------------------------------------------*/

		default:

			$.ajax({
				url: url,
				async: true,
				cache: false,
				crossDomain: true,
				dataType: dataTYPE,
			}).then((data) => {

				result.push(data);

				__loadXXX(deferred, result, urls, dataType, context);

			}, () => {

				deferred.rejectWith(context, [`cannot load '${url}'`]);
			});

			break;

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @param {Array<String>|String} urls
 * @param {string} dataType
 * @param {Object<string, *>} [options={}]
 * @returns {$.Deferred}
 * @private
 */

function _loadXXX(urls, dataType, options)
{
	const deferred = $.Deferred();

	const [context] = setup(
		['context'],
		[deferred],
		options
	);

	/*----------------------------------------------------------------------------------------------------------------*/

	__loadXXX(deferred, [], asArray(urls), dataType, context);

	/*----------------------------------------------------------------------------------------------------------------*/

	return deferred.promise();
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads resources by file extension
 * @param {Array<string>|string} urls the array of urls
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function loadResources(urls, options)
{
	return _loadXXX(urls, 'auto', options);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads CSS sheets
 * @param {Array<string>|string} urls the array of urls
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function loadSheets(urls, options)
{
	return _loadXXX(urls, 'sheet', options);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads JS scripts
 * @param {Array<string>|string} urls the array of urls
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function loadScripts(urls, options)
{
	return _loadXXX(urls, 'script', options);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads JSON files
 * @param {Array<string>|string} urls the array of urls
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function loadJSONs(urls, options)
{
	return _loadXXX(urls, 'json', options);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads XML files
 * @param {Array<string>|string} urls the array of urls
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function loadXMLs(urls, options)
{
	return _loadXXX(urls, 'xml', options);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads HTML files
 * @param {Array<string>|string} urls the array of urls
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function loadHTMLs(urls, options)
{
	return _loadXXX(urls, 'text', options);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads TWIG files
 * @param {Array<string>|string} urls the array of urls
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function loadTWIGs(urls, options)
{
	return _loadXXX(urls, 'text', options);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads text files
 * @param {Array<string>|string} urls the array of urls
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function loadTexts(urls, options)
{
	return _loadXXX(urls, 'text', options);
}

/*--------------------------------------------------------------------------------------------------------------------*/
