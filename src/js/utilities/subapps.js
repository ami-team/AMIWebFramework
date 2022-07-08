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

import * as view from './view';
import * as locks from './locks';
import * as tools from './tools';
import * as messages from './messages';
import * as resources from './resources';

import amiAuth from '../AMIAuth';
import amiRouter from '../AMIRouter';
import amiWebApp from '../AMIWebApp';
import amiCommand from '../AMICommand';

import JSPath from 'jspath';

/*--------------------------------------------------------------------------------------------------------------------*/
/* SUBAPPS                                                                                                            */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @type {Object<string,Object<string,*>>}
 * @private
 */

export const _subapps = {};

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @type {*}
 * @private
 */

let _currentSubappInstance = new function() {
	this.onReady = function() {
	};
	this.onExit = function() {
	};
	this.onLogin = function() {
	};
	this.onLogout = function() {
	};
};

/**
 * @type {*}
 * @private
 */

let _currentUserdata = null;

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @returns {$.Promise} A JQuery promise object
 * @ignore
 */

export function triggerLogin()
{
	const result = $.Deferred();

	/*----------------------------------------------------------------------------------------------------------------*/

	// noinspection JSUnresolvedVariable
	if(amiWebApp._isReady)
	{
		tools._internal_then(_currentSubappInstance.onLogin(_currentUserdata), (message) => {

			tools._internal_always(amiWebApp.onRefresh(true), () => {

				result.resolve(message);
			});

		}, (message) => {

			tools._internal_always(amiWebApp.onRefresh(true), () => {

				result.reject(message);
			});
		});
	}
	else
	{
		result.resolve();
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	return result.promise();
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @returns {$.Promise} A JQuery promise object
 * @ignore
 */

export function triggerLogout()
{
	const result = $.Deferred();

	/*----------------------------------------------------------------------------------------------------------------*/

	// noinspection JSUnresolvedVariable
	if(amiWebApp._isReady)
	{
		tools._internal_then(_currentSubappInstance.onLogout(_currentUserdata), (message) => {

			tools._internal_always(amiWebApp.onRefresh(false), () => {

				result.resolve(message);
			});

		}, (message) => {

			tools._internal_always(amiWebApp.onRefresh(false), () => {

				result.reject(message);
			});
		});
	}
	else
	{
		result.resolve();
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	return result.promise();
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads a subapp
 * @param {string} subapp the subapp name
 * @param {?*} [userdata] the user data
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, defaultSubApp, hash, cache)
 * @returns {$.Promise} A JQuery promise object
 * @ignore
 */

export function loadSubApp(subapp, userdata, options)
{
	const result = $.Deferred();

	const [context, hash, cache] = tools.setup(
		['context', 'hash', 'cache'],
		[result, null, false],
		options
	);

	/*----------------------------------------------------------------------------------------------------------------*/

	result.always(() => {

		locks.unlock();
	});

	locks.lock();

	/*----------------------------------------------------------------------------------------------------------------*/

	if(subapp.indexOf('subapp:') === 0)
	{
		subapp = subapp.substring(7);
	}

	const descr = _subapps[subapp.toLowerCase()];

	/*----------------------------------------------------------------------------------------------------------------*/

	if(descr)
	{
		try
		{
			resources.loadScripts(`${amiRouter.getOriginURL()}/${descr.file}`, {cache: cache}).then(() => {

				tools._internal_always(_currentSubappInstance.onExit(userdata), () => {

					_currentSubappInstance = window[descr.instance];

					_currentUserdata = userdata;

					/**/

					tools._internal_then(_currentSubappInstance.onReady(userdata), () => {

						const promise = amiAuth.isAuthenticated() ? triggerLogin()
						                                          : triggerLogout()
						;

						promise.then(() => {

							amiRouter.appendHistoryEntry({
								searchParams: {
									'subapp': subapp,
									'userdata': userdata,
								},
								hash: hash,
							});

							view.fillBreadcrumb(descr.breadcrumb);

							result.resolveWith(context, [/*------*/ _currentSubappInstance /*------*/]);

						}, (message) => {

							result.rejectWith(context, [`cannot load subapp '${subapp}': ${message}`]);
						});

					}, (message) => {

						result.rejectWith(context, [`cannot load subapp '${subapp}': ${message}`]);
					});
				});

			}, (message) => {

				result.rejectWith(context, [`cannot load subapp '${subapp}': ${message}`]);
			});
		}
		catch(message)
		{
			result.rejectWith(context, [`cannot load subapp '${subapp}': ${message}`]);
		}
	}
	else
	{
		result.rejectWith(context, [`cannot load subapp '${subapp}': not found`]);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	return result.promise();
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads a subapp
 * @param {string} subapp the subapp name
 * @param {?*} [userdata] the user data
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, defaultSubApp, hash, cache)
 * @returns {undefined} Nothing
 * @ignore
 */

export function loadSubAppAlt(subapp, userdata, options)
{
	loadSubApp(subapp, userdata, options).fail((message) => {

		messages.error(message);
	});
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads a subapp by URL
 * @param {string} defaultSubApp if 'amiRouter.getArgs()["subapp"]' is null, the default subapp name
 * @param {?*} defaultUserData if 'amiRouter.getArgs()["userdata"]' is null, the default user data
 * @returns {$.Promise} A JQuery promise object
 * @ignore
 */

export function loadSubAppByURL(defaultSubApp, defaultUserData)
{
	const result = $.Deferred();

	const args = amiRouter.getWebAppArgs();

	if(args['v'])
	{
		amiCommand.execute('GetHashInfo -hash=?', {params: [args['v']]}).fail((data, message) => {

			result.reject(message);

		}).done((data) => {

			let json;

			try
			{
				json = JSON.parse(JSPath.apply('..field{.@name==="json"}.$', data)[0] || '{}');
			}
			catch(message)
			{
				json = {/*-----------------------------------------------------------------*/};
			}

			/*--------------------------------------------------------------------------------------------------------*/

			const subapp = json['subapp'] || defaultSubApp;
			const userdata = json['userdata'] || defaultUserData;

			loadSubApp(subapp, userdata, {defaultSubApp: defaultSubApp}).then((/*---*/) => {

				result.resolve(/*---*/);

			}, (message) => {

				result.reject(message);
			});

			/*--------------------------------------------------------------------------------------------------------*/
		});
	}
	else
	{
		if(!amiRouter.check())
		{
			/*--------------------------------------------------------------------------------------------------------*/

			const subapp = args['subapp'] || defaultSubApp;
			const userdata = args['userdata'] || defaultUserData;

			loadSubApp(subapp, userdata).then((/*---*/) => {

				result.resolve(/*---*/);

			}, (message) => {

				result.reject(message);
			});

			/*--------------------------------------------------------------------------------------------------------*/
		}
	}

	return result.promise();
}

/*--------------------------------------------------------------------------------------------------------------------*/
