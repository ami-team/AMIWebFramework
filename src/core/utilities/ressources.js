/*--------------------------------------------------------------------------------------------------------------------*/
/* DYNAMIC RESOURCE LOADING                                                                                           */
/*--------------------------------------------------------------------------------------------------------------------*/

import {asArray, setup} from './tools';

import {loadControl} from './controls';
import {loadSubApp} from './subapps';

/*--------------------------------------------------------------------------------------------------------------------*/

let _sheets = [];
let _scripts = [];

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 *
 * @param url
 * @returns {string|string}
 * @private
 */

function _getExtension(url)
{
	const idx = url.lastIndexOf('.');

	return idx > 0 ? url.substring(idx) : '';
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 *
 * @param url
 * @param dataType
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
 *
 * @param deferred
 * @param result
 * @param urls
 * @param dataType
 * @param context
 * @returns {*}
 * @private
 */

function __loadXXX(deferred, result, urls, dataType, context)
{
	if(urls.length === 0)
	{
		return deferred.resolveWith(context, [result]);
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

				return __loadXXX(deferred, result, urls, dataType, context);

			}, (message) => {

				return deferred.rejectWith(context, [message]);
			});

			break;

		/*------------------------------------------------------------------------------------------------------------*/
		/* SUBAPP                                                                                                     */
		/*------------------------------------------------------------------------------------------------------------*/

		case 'subapp':

			loadSubApp(url).then((data) => {

				result.push(data);

				return __loadXXX(deferred, result, urls, dataType, context);

			}, (message) => {

				return deferred.rejectWith(context, [message]);
			});

			break;

		/*------------------------------------------------------------------------------------------------------------*/
		/* SHEET                                                                                                      */
		/*------------------------------------------------------------------------------------------------------------*/

		case 'sheet':

			if(_sheets.indexOf(url) >= 0)
			{
				result.push(false);

				return __loadXXX(deferred, result, urls, dataType, context);
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

					return __loadXXX(deferred, result, urls, dataType, context);

				}, () => {

					return deferred.rejectWith(context, ['cannot load `' + url + '`']);
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

				return __loadXXX(deferred, result, urls, dataType, context);
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

					return __loadXXX(deferred, result, urls, dataType, context);

				}, () => {

					return deferred.rejectWith(context, ['cannot load `' + url + '`']);
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

				return __loadXXX(deferred, result, urls, dataType, context);

			}, () => {

				return deferred.rejectWith(context, ['cannot load `' + url + '`']);
			});

			break;

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 *
 * @param urls
 * @param dataType
 * @param settings
 * @returns {*}
 * @private
 */
function _loadXXX(urls, dataType, settings)
{
	const deferred = $.Deferred();

	const [context] = setup(
		['context'],
		[deferred],
		settings
	);

	/*----------------------------------------------------------------------------------------------------------------*/

	__loadXXX(deferred, [], asArray(urls), dataType, context);

	/*----------------------------------------------------------------------------------------------------------------*/

	return deferred.promise();
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads resources by extension
 * @param {(Array|String)} urls the array of urls
 * @param {Object} [settings] dictionary of settings (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function loadResources(urls, settings)
{
	return _loadXXX(urls, 'auto', settings);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads CSS sheets
 * @param {(Array|String)} urls the array of urls
 * @param {Object} [settings] dictionary of settings (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function loadSheets(urls, settings)
{
	return _loadXXX(urls, 'sheet', settings);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads JS scripts
 * @param {(Array|String)} urls the array of urls
 * @param {Object} [settings] dictionary of settings (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function loadScripts(urls, settings)
{
	return _loadXXX(urls, 'script', settings);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads JSON files
 * @param {(Array|String)} urls the array of urls
 * @param {Object} [settings] dictionary of settings (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function loadJSONs(urls, settings)
{
	return _loadXXX(urls, 'json', settings);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads XML files
 * @param {(Array|String)} urls the array of urls
 * @param {Object} [settings] dictionary of settings (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function loadXMLs(urls, settings)
{
	return _loadXXX(urls, 'xml', settings);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads HTML files
 * @param {(Array|String)} urls the array of urls
 * @param {Object} [settings] dictionary of settings (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function loadHTMLs(urls, settings)
{
	return _loadXXX(urls, 'text', settings);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads TWIG files
 * @param {(Array|String)} urls the array of urls
 * @param {Object} [settings] dictionary of settings (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function loadTWIGs(urls, settings)
{
	return _loadXXX(urls, 'text', settings);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads text files
 * @param {(Array|String)} urls the array of urls
 * @param {Object} [settings] dictionary of settings (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function loadTexts(urls, settings)
{
	return _loadXXX(urls, 'text', settings);
}

/*--------------------------------------------------------------------------------------------------------------------*/
