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

import { error } from './messages';

import { textToHtml } from './text';

import { lock, unlock } from './locks';

import { loadScripts } from './ressources';

import { _internal_then, setup } from './tools';

import amiRouter from '../AMIRouter';

/*--------------------------------------------------------------------------------------------------------------------*/
/* CONTROLS                                                                                                           */
/*--------------------------------------------------------------------------------------------------------------------*/

export const _controls = {};

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads a control
 * @param {string} control the control name
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function loadControl(control, options)
{
	const result = $.Deferred();

	const [context] = setup(
		['context'],
		[result],
		options
	);

	/*----------------------------------------------------------------------------------------------------------------*/

	if(control.indexOf('ctrl:') === 0)
	{
		control = control.substring(5);
	}

	const descr = _controls[control.toLowerCase()];

	/*----------------------------------------------------------------------------------------------------------------*/

	if(descr)
	{
		loadScripts(`${amiRouter.getOriginURL()}/${descr.file}`).then((loaded) => {

			try
			{
				const clazz = window[descr.clazz];

				const promise = loaded[0] ? clazz.prototype.onReady.apply(clazz.prototype)
				                          : /*----------------*/ null /*----------------*/
				;

				_internal_then(promise, () => {

					result.resolveWith(context, [/*-----------------*/ clazz /*-----------------*/]);

				}, (message) => {

					result.rejectWith(context, [`cannot load control '${control}': ${message}`]);
				});
			}
			catch(message)
			{
				result.rejectWith(context, [`cannot load control '${control}': ${message}`]);
			}

		}, (message) => {

			result.rejectWith(context, [`cannot load control '${control}': ${message}`]);
		});
	}
	else
	{
		result.rejectWith(context, [`cannot load control '${control}': undefined`]);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	return result.promise();
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously create a control
 * @param {*} [parent] ???
 * @param {*} [owner] ???
 * @param {string} control ???
 * @param {Array<*>} params ???
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function createControl(parent, owner, control, params, options)
{
	const result = $.Deferred();

	const [context] = setup(
		['context'],
		[result],
		options
	);

	/*----------------------------------------------------------------------------------------------------------------*/

	loadControl(control, options).done((constructor) => {

		const instance = new constructor(parent, owner);

		_internal_then(constructor.prototype.render.apply(instance, params), (...args) => {

			result.resolveWith(context, [instance].concat(args));

		}, (message) => {

			result.rejectWith(context, [message]);
		});

	}).fail((message) => {

		result.rejectWith(context, [message]);
	});

	/*----------------------------------------------------------------------------------------------------------------*/

	return result.promise();
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously create a control in the body
 * @param {*} [parent] ???
 * @param {*} [owner] ???
 * @param {string} control ???
 * @param {Array<*>} controlParamsWithoutOptions ???
 * @param {Object<string, *>} controlOptions ???
 * @param {Object<string, *>} parentOptions ???
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function createControlInBody(parent, owner, control, controlParamsWithoutOptions, controlOptions, parentOptions, options)
{
	const result = $.Deferred();

	const [context] = setup(
		['context'],
		[result],
		options
	);

	/*----------------------------------------------------------------------------------------------------------------*/

	try
	{
		const PARAMS = [];
		const SETTINGS = {};

		/*------------------------------------------------------------------------------------------------------------*/

		for(let key in parentOptions) {
			SETTINGS[key] = parentOptions[key];
		}

		for(let key in controlOptions) {
			SETTINGS[key] = controlOptions[key];
		}

		/*------------------------------------------------------------------------------------------------------------*/

		//////.push(selector);

		Array.prototype.push.apply(PARAMS, controlParamsWithoutOptions);

		PARAMS.push(SETTINGS);

		/*------------------------------------------------------------------------------------------------------------*/

		createControl(parent, owner, control, PARAMS).done((...args) => {

			result.resolveWith(context, args);

		}).fail((message) => {

			result.rejectWith(context, [message]);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	}
	catch(message)
	{
		result.rejectWith(context, [message]);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	return result.promise();
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously create a control in a container
 * @param {*} [parent] ???
 * @param {*} [owner] ???
 * @param {string} control ???
 * @param {Array<*>} controlParamsWithoutOptions ???
 * @param {Object<string, *>} controlOptions ???
 * @param {Object<string, *>} parentOptions ???
 * @param {string} icon ???
 * @param {string} title ???
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function createControlInContainer(parent, owner, control, controlParamsWithoutOptions, controlOptions, parentOptions, icon, title, options)
{
	const result = $.Deferred();

	const [context] = setup(
		['context'],
		[result],
		options
	);

	/*------------------------------------------------------------------------------------------------------------*/

	try
	{
		parent.appendItem(`<i class="fa fa-${textToHtml(icon)}"></i> ${textToHtml(title)}`).done((selector) => {

			const PARAMS = [];
			const SETTINGS = {};

			/*----------------------------------------------------------------------------------------------------*/

			for(let key in parentOptions) {
				SETTINGS[key] = parentOptions[key];
			}

			for(let key in controlOptions) {
				SETTINGS[key] = controlOptions[key];
			}

			/*----------------------------------------------------------------------------------------------------*/

			PARAMS.push(selector);

			Array.prototype.push.apply(PARAMS, controlParamsWithoutOptions);

			PARAMS.push(SETTINGS);

			/*----------------------------------------------------------------------------------------------------*/

			createControl(parent, owner, control, PARAMS).done((...args) => {

				result.resolveWith(context, args);

			}).fail((message) => {

				result.rejectWith(context, [message]);
			});

			/*----------------------------------------------------------------------------------------------------*/
		});
	}
	catch(message)
	{
		result.rejectWith(context, [message]);
	}

	/*------------------------------------------------------------------------------------------------------------*/

	return result.promise();
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously create a control in a container from a WEB link
 * @param {*} [parent] ???
 * @param {*} [owner] ???
 * @param {string} el ???
 * @param {Object<string, *>} parentOptions ???
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function createControlFromWebLink(parent, owner, el, parentOptions, options)
{
	/*------------------------------------------------------------------------------------------------------------*/

	const dataCtrl = el.hasAttribute('data-ctrl') ? el.getAttribute('data-ctrl')
	                                              : ''
	;

	const dataCtrlLocation = el.hasAttribute('data-ctrl-location') ? el.getAttribute('data-ctrl-location')
	                                                               : ''
	;

	/*------------------------------------------------------------------------------------------------------------*/

	const dataParams = el.hasAttribute('data-params') ? JSON.parse(el.getAttribute('data-params'))
	                                                  : []
	;

	const dataOptions = el.hasAttribute('data-settings') ? JSON.parse(el.getAttribute('data-settings'))
	                                                     : {}
	;

	/*------------------------------------------------------------------------------------------------------------*/

	const dataIcon = el.hasAttribute('data-icon') ? el.getAttribute('data-icon')
	                                              : 'question'
	;

	const dataTitle = el.hasAttribute('data-title') ? el.getAttribute('data-title')
	                                                : 'Unknown'
	;

	/*------------------------------------------------------------------------------------------------------------*/

	lock();

	/**/ if(dataCtrlLocation === 'body')
	{
		return createControlInBody(parent, owner, dataCtrl, dataParams, dataOptions, parentOptions, options).done(() => {

			unlock();

		}).fail((message) => {

			error(message);
		});
	}
	else
	{
		return createControlInContainer(parent, owner, dataCtrl, dataParams, dataOptions, parentOptions, dataIcon, dataTitle, options).done(() => {

			unlock();

		}).fail((message) => {

			error(message);
		});
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/
