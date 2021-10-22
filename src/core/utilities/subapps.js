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
import { fillBreadcrumb } from './twig';
import { loadScripts } from './ressources';
import { _internal_then, _internal_always, setup } from './tools';
import JSPath from 'jspath';

import amiRouter from '../AMIRouter';
import amiWebApp from '../AMIWebApp';
import amiAuth from '../AMIAuth';

/*--------------------------------------------------------------------------------------------------------------------*/
/* SUBAPPS                                                                                                            */
/*--------------------------------------------------------------------------------------------------------------------*/

export const _subapps = {};

/*--------------------------------------------------------------------------------------------------------------------*/

let _currentSubAppInstance = new function() {
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
 * @returns {$.Deferred}
 * @private
 */

function triggerLogin()
{
	const result = $.Deferred();

	/*----------------------------------------------------------------------------------------------------------------*/

	if(amiWebApp._isReady)
	{
		_internal_then(_currentSubAppInstance.onLogin(_currentUserdata), (message) => {

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
 * @returns {$.Deferred}
 * @private
 */

function triggerLogout()
{
	const result = $.Deferred();

	/*----------------------------------------------------------------------------------------------------------------*/

	if(amiWebApp._isReady)
	{
		_internal_then(_currentSubAppInstance.onLogout(_currentUserdata), (message) => {

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

			alert('Yessss!');

			try
			{
				_currentSubAppInstance.onExit(userdata);

				const instance = window[descr.instance];

				_currentSubAppInstance = instance;

				/**/

				fillBreadcrumb(descr.breadcrumb);

				const promise = loaded[0] ? instance.onReady(userdata)
				                          : /*------*/ null /*------*/
				;

				_internal_then(promise, () => {

					const promise = amiAuth.isAuthenticated() ? triggerLogin()
					                                          : triggerLogout()
					;

					promise.then(() => {

						result.resolveWith(context, [/*----------------*/ instance /*----------------*/]);

					}, (message) => {

						result.rejectWith(context, [`could not load subapp '${subapp}': ${message}`]);
					});

				}, (message) => {

					result.rejectWith(context, [`could not load subapp '${subapp}': ${message}`]);
				});
			}
			catch(message)
			{
				result.rejectWith(context, [`could not load subapp '${subapp}': ${message}`]);
			}

		}, (message) => {

			result.rejectWith(context, [`could not load subapp '${subapp}': ${message}`]);
		});
	}
	else
	{
		result.rejectWith(context, [`could not load subapp '${subapp}'`]);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	return result.promise();
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Loads a subapp by URL
 * @param {String} defaultSubApp if 'amiWebApp.args["subapp"]' is null, the default subapp
 * @param {*} [defaultUserData] if 'amiWebApp.args["userdata"]' is null, the default user data
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
				json = {/* EMPTY JSON   EMPTY JSON   EMPTY JSON   EMPTY JSON   EMPTY JSON   EMPTY JSON */};
			}

			/*----------------------------------------------------------------------------------------------------*/

			const subapp = json['subapp'] || defaultSubApp;
			const userdata = json['userdata'] || defaultUserData;

			loadSubApp(subapp, userdata).then(() => {

				result.resolve();

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

			loadSubApp(subapp, userdata).then(() => {

				result.resolve();

			}, (message) => {

				result.reject(message);
			});

			/*--------------------------------------------------------------------------------------------------------*/
		}
	}

	return result.promise();
}

/*--------------------------------------------------------------------------------------------------------------------*/
