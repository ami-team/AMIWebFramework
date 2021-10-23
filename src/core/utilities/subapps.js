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

import { lock, unlock } from './locks';
import { fillBreadcrumb } from './view';
import { loadScripts } from './ressources';
import { _internal_then, _internal_always, setup } from './tools';

import amiRouter from '../AMIRouter';
import amiWebApp from '../AMIWebApp';
import amiAuth from '../AMIAuth';

import JSPath from 'jspath';

/*--------------------------------------------------------------------------------------------------------------------*/
/* SUBAPPS                                                                                                            */
/*--------------------------------------------------------------------------------------------------------------------*/

export const _subapps = {};

/*--------------------------------------------------------------------------------------------------------------------*/

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

let _currentUserdata = null;

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @returns {$.Deferred} A JQuery deferred object
 * @private
 */

export function triggerLogin()
{
	const result = $.Deferred();

	/*----------------------------------------------------------------------------------------------------------------*/

	if(amiWebApp._isReady)
	{
		_internal_then(_currentSubappInstance.onLogin(_currentUserdata), (message) => {

			_internal_always(amiWebApp.onRefresh(true), () => {

				result.resolve(message);
			});

		}, (message) => {

			_internal_always(amiWebApp.onRefresh(true), () => {

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
 * @returns {$.Deferred} A JQuery deferred object
 * @private
 */

export function triggerLogout()
{
	const result = $.Deferred();

	/*----------------------------------------------------------------------------------------------------------------*/

	if(amiWebApp._isReady)
	{
		_internal_then(_currentSubappInstance.onLogout(_currentUserdata), (message) => {

			_internal_always(amiWebApp.onRefresh(false), () => {

				result.resolve(message);
			});

		}, (message) => {

			_internal_always(amiWebApp.onRefresh(false), () => {

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
 *
 * @param {string} subapp the subapp name
 * @param {*} userdata the user data
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function loadSubApp(subapp, userdata, options)
{
	const result = $.Deferred();

	const [context] = setup(
		['context'],
		[result],
		options
	);

	/*----------------------------------------------------------------------------------------------------------------*/

	result.always(() => {

		unlock();
	});

	lock();

	/*----------------------------------------------------------------------------------------------------------------*/

	if(subapp.indexOf('subapp:') === 0)
	{
		subapp = subapp.substring(7);
	}

	const descr = _subapps[subapp.toLowerCase()];

	/*----------------------------------------------------------------------------------------------------------------*/

	if(descr)
	{
		loadScripts(`${amiRouter.getOriginURL()}/${descr.file}`).then((loaded) => {

			fillBreadcrumb(descr.breadcrumb);

			try
			{
				_currentSubappInstance.onExit(userdata);

				const instance = window[descr.instance];

				_currentSubappInstance = instance;

				/**/

				const promise = loaded[0] ? instance.onReady(userdata)
				                          : /*------*/ null /*------*/
				;

				_internal_then(promise, () => {

					const promise = amiAuth.isAuthenticated() ? triggerLogin()
					                                          : triggerLogout()
					;

					promise.then(() => {

						result.resolveWith(context, [/*---------------*/ instance /*---------------*/]);

					}, (message) => {

						result.rejectWith(context, [`cannot load subapp '${subapp}': ${message}`]);
					});

				}, (message) => {

					result.rejectWith(context, [`cannot load subapp '${subapp}': ${message}`]);
				});
			}
			catch(message)
			{
				result.rejectWith(context, [`cannot load subapp '${subapp}': ${message}`]);
			}

		}, (message) => {

			result.rejectWith(context, [`cannot load subapp '${subapp}': ${message}`]);
		});
	}
	else
	{
		result.rejectWith(context, [`cannot load subapp '${subapp}': undefined`]);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	return result.promise();
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Loads a subapp by URL
 * @param {string} defaultSubApp if 'amiRouter.getArgs()["subapp"]' is null, the default subapp name
 * @param {*} [defaultUserData] if 'amiRouter.getArgs()["userdata"]' is null, the default user data
 * @returns {$.Deferred} A JQuery deferred object
 */

export function loadSubAppByURL(defaultSubApp, defaultUserData)
{
	const result = $.Deferred();

	const args = amiRouter.getArgs();

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

			/*----------------------------------------------------------------------------------------------------*/

			const subapp = json['subapp'] || defaultSubApp;
			const userdata = json['userdata'] || defaultUserData;

			loadSubApp(subapp, userdata).then((/*---*/) => {

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
