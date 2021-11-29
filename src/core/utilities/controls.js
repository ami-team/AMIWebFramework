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

import * as locks from './locks';
import * as tools from './tools';
import * as strings from './strings';
import * as messages from './messages';
import * as resources from './resources';

import amiRouter from '../AMIRouter';

/*--------------------------------------------------------------------------------------------------------------------*/
/* CONTROLS                                                                                                           */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @type {Object<string,*>}
 * @private
 */

export const _controls = {};

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads a control
 * @param {string} control the control name
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
 * @returns {$.Promise} A JQuery promise object
 * @ignore
 */

export function loadControl(control, options)
{
	const result = $.Deferred();

	const [context] = tools.setup(
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
		resources.loadScripts(`${amiRouter.getOriginURL()}/${descr.file}`).then((loaded) => {

			try
			{
				const clazz = window[descr.clazz];

				const promise = loaded[0] ? clazz.prototype.onReady.apply(clazz.prototype)
				                          : /*----------------*/ null /*----------------*/
				;

				tools._internal_then(promise, () => {

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
		result.rejectWith(context, [`cannot load control '${control}': not found`]);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	return result.promise();
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously creates a control
 * @param {?*} parent the parent entity
 * @param {?*} owner the owner entity
 * @param {string} control the control name
 * @param {Array<*>} params the control's parameters
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
 * @returns {$.Promise} A JQuery promise object
 * @ignore
 */

export function createControl(parent, owner, control, params, options)
{
	const result = $.Deferred();

	const [context] = tools.setup(
		['context'],
		[result],
		options
	);

	/*----------------------------------------------------------------------------------------------------------------*/

	loadControl(control, options).done((constructor) => {

		const instance = new constructor(parent, owner);

		tools._internal_then(constructor.prototype.render.apply(instance, params), (...args) => {

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
 * Asynchronously creates a control in the body
 * @param {?*} parent the parent entity
 * @param {?*} owner the owner entity
 * @param {string} control the control name
 * @param {Array<*>} controlParams the control's render method mandatory parameters
 * @param {Object<string, *>} controlOptions the control's render method optional parameters
 * @param {Object<string, *>} ownerOptions the owner's optional parameters
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
 * @returns {$.Promise} A JQuery promise object
 * @ignore
 */

export function createControlInBody(parent, owner, control, controlParams, controlOptions, ownerOptions, options)
{
	const result = $.Deferred();

	const [context] = tools.setup(
		['context'],
		[result],
		options
	);

	/*----------------------------------------------------------------------------------------------------------------*/

	try
	{
		const PARAMS = [];
		const OPTIONS = {};

		/*------------------------------------------------------------------------------------------------------------*/

		for(let key in ownerOptions) {
			OPTIONS[key] = ownerOptions[key];
		}

		for(let key in controlOptions) {
			OPTIONS[key] = controlOptions[key];
		}

		/*------------------------------------------------------------------------------------------------------------*/

		//////.push(selector);

		Array.prototype.push.apply(PARAMS, controlParams);

		PARAMS.push(OPTIONS);

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
 * Asynchronously creates a control in a container
 * @param {?*} parent the parent entity
 * @param {?*} owner the owner entity
 * @param {string} control the control name
 * @param {Array<*>} controlParams the control's render method mandatory parameters
 * @param {Object<string, *>} controlOptions the control's render method optional parameters
 * @param {Object<string, *>} ownerOptions the owner's optional parameters
 * @param {string} icon the icon
 * @param {string} title the title
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
 * @returns {$.Promise} A JQuery promise object
 * @ignore
 */

export function createControlInContainer(parent, owner, control, controlParams, controlOptions, ownerOptions, icon, title, options)
{
	const result = $.Deferred();

	const [context] = tools.setup(
		['context'],
		[result],
		options
	);

	/*----------------------------------------------------------------------------------------------------------------*/

	try
	{
		parent.appendItem(`<i class="bi bi-${strings.textToHtml(icon)}"></i> ${strings.textToHtml(title)}`).done((selector) => {

			const PARAMS = [];
			const OPTIONS = {};

			/*--------------------------------------------------------------------------------------------------------*/

			for(let key in ownerOptions) {
				OPTIONS[key] = ownerOptions[key];
			}

			for(let key in controlOptions) {
				OPTIONS[key] = controlOptions[key];
			}

			/*--------------------------------------------------------------------------------------------------------*/

			PARAMS.push(selector);

			Array.prototype.push.apply(PARAMS, controlParams);

			PARAMS.push(OPTIONS);

			/*--------------------------------------------------------------------------------------------------------*/

			createControl(parent, owner, control, PARAMS).done((...args) => {

				result.resolveWith(context, args);

			}).fail((message) => {

				result.rejectWith(context, [message]);
			});

			/*--------------------------------------------------------------------------------------------------------*/
		});
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
 * Asynchronously creates a control in a container from a WEB link
 * @param {?*} parent the parent entity
 * @param {?*} owner the owner entity
 * @param {Element} el the HTML element
 * @param {Object<string, *>} ownerOptions the owner's optional parameters
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
 * @returns {$.Promise} A JQuery promise object
 * @ignore
 */

export function createControlFromWebLink(parent, owner, el, ownerOptions, options)
{
	/*----------------------------------------------------------------------------------------------------------------*/

	const dataCtrl = el.hasAttribute('data-ctrl') ? el.getAttribute('data-ctrl')
	                                              : ''
	;

	const dataCtrlLocation = el.hasAttribute('data-ctrl-location') ? el.getAttribute('data-ctrl-location')
	                                                               : ''
	;

	/*----------------------------------------------------------------------------------------------------------------*/

	const dataParams = el.hasAttribute('data-params') ? JSON.parse(el.getAttribute('data-params'))
	                                                  : []
	;

	const dataOptions = el.hasAttribute('data-options') ? JSON.parse(el.getAttribute('data-options'))
	                                                    : (
	                    el.hasAttribute('data-settings') ? JSON.parse(el.getAttribute('data-settings'))
	                                                    : {
	});

	/*----------------------------------------------------------------------------------------------------------------*/

	const dataIcon = el.hasAttribute('data-icon') ? el.getAttribute('data-icon')
	                                              : 'question'
	;

	const dataTitle = el.hasAttribute('data-title') ? el.getAttribute('data-title')
	                                                : 'Unknown'
	;

	/*----------------------------------------------------------------------------------------------------------------*/

	locks.lock();

	/**/ if(dataCtrlLocation === 'body')
	{
		return createControlInBody(parent, owner, dataCtrl, dataParams, dataOptions, ownerOptions, options).done(() => {

			locks.unlock();

		}).fail((message) => {

			messages.error(message);
		});
	}
	else
	{
		return createControlInContainer(parent, owner, dataCtrl, dataParams, dataOptions, ownerOptions, dataIcon, dataTitle, options).done(() => {

			locks.unlock();

		}).fail((message) => {

			messages.error(message);
		});
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/
