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
import { asArray, setup } from './tools';

import amiRouter from '../AMIRouter';

import amiTwig from 'ami-twig';

/*--------------------------------------------------------------------------------------------------------------------*/
/* BREADCRUMB                                                                                                         */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Fill the main breadcrumb
 * @param {Array<string>} items the array of items (HTML format)
 */

export function fillBreadcrumb(items)
{
	const s = Array.isArray(items) ? items.map((item) => `<li class="breadcrumb-item">${item.replace(/{{ORIGIN_URL}}/g, amiRouter.getOriginURL).replace(/{{WEBAPP_URL}}/g, amiRouter.getWebAppURL())}</li>`).join('')
	                               : ''
	;

	$('#ami_breadcrumb_content').html(s);
}

/*--------------------------------------------------------------------------------------------------------------------*/
/* HTML                                                                                                               */
/*--------------------------------------------------------------------------------------------------------------------*/

const _idRegExp = new RegExp('[a-zA-Z][a-zA-Z0-9]{7}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{12}', 'g');

/*--------------------------------------------------------------------------------------------------------------------*/

function _xxxHTML(selector, twig, mode, options)
{
	const result = $.Deferred();

	const [context, suffix, dict, twigs] = setup(
		['context', 'suffix', 'dict', 'twigs'],
		[result, null, {}, {}],
		options
	);

	/*------------------------------------------------------------------------------------------------------------*/

	if(suffix)
	{
		twig = twig.replace(_idRegExp, function(id) {

			return `${id}_instance${suffix}`;
		});
	}

	const html = formatTWIG(twig, dict, twigs);

	/*------------------------------------------------------------------------------------------------------------*/

	let promise;

	let el = $(selector);

	switch(mode)
	{
		case 0:
			promise = el.html(html).promise();
			break;

		case 1:
			promise = el.prepend(html).promise();
			break;

		case 2:
			promise = el.append(html).promise();
			break;

		case 3:
			promise = el.replaceWith(el.is('[id]') ? html.replace(/^\s*(<[a-zA-Z_-]+)/, `$1 id="${el.attr('id')}"`) : html).promise();
			break;

		default:
			throw 'internal error';
	}

	/*------------------------------------------------------------------------------------------------------------*/

	promise.done(() => {

		/*--------------------------------------------------------------------------------------------------------*/

		let el = $(selector);

		/*--------------------------------------------------------------------------------------------------------*/

		const _find = (mode === 3) ? (_selector) => el.find(selector)
		                                              .addBack(selector)
		                           : (_selector) => el.find(_selector)
		;

		/*--------------------------------------------------------------------------------------------------------*/

		if(jQuery.fn.tooltip)
		{
			_find('[data-toggle="tooltip"]').tooltip({
				html: false,
				delay: {
					show: 500,
					hide: 100,
				},
			});
		}

		/*--------------------------------------------------------------------------------------------------------*/

		if(jQuery.fn.popover)
		{
			_find('[data-toggle="popover"]').popover({
				html: true,
				delay: {
					show: 500,
					hide: 100,
				},
			});
		}

		/*--------------------------------------------------------------------------------------------------------*/

		/* TODO */

		/*--------------------------------------------------------------------------------------------------------*/

		result.resolveWith(context, [el]);

		/*--------------------------------------------------------------------------------------------------------*/
	});

	/*------------------------------------------------------------------------------------------------------------*/

	return result.promise();
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
 * @param {string} selector the target selector
 * @param {string} twig the TWIG fragment
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, suffix, dict, twigs)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function replaceHTML(selector, twig, options)
{
	return _xxxHTML(selector, twig, 0, options);
}

/*----------------------------------------------------------------------------------------------------------------*/

/**
 * Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
 * @param {string} selector the target selector
 * @param {string} twig the TWIG fragment
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, suffix, dict, twigs)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function prependHTML(selector, twig, options)
{
	return _xxxHTML(selector, twig, 1, options);
}

/*----------------------------------------------------------------------------------------------------------------*/

/**
 * Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
 * @param {string} selector the target selector
 * @param {string} twig the TWIG fragment
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, suffix, dict, twigs)
 * @returns {$.Deferred} A JQuery deferred object
 */

export function appendHTML(selector, twig, options)
{
	return _xxxHTML(selector, twig, 2, options);
}

/*--------------------------------------------------------------------------------------------------------------------*/
/* TWIG                                                                                                               */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Interpretes the given TWIG string, see {@link http://twig.sensiolabs.org/documentation}
 * @param {string} twig the TWIG string
 * @param {Object<string, *>|Array<Object<string, *>>} [dict] the dictionary
 * @param {Object<string, string>} [twigs] dictionary of fragments
 * @returns {string} The Interpreted TWIG string
 */

export function formatTWIG(twig, dict, twigs)
{
	const result = [];

	/*----------------------------------------------------------------------------------------------------------------*/

	const render = (twig, dict) => {

		if(typeof dict !== 'object') {
			dict = {};
		}

		if(typeof dict !== 'object') {
			twigs = {};
		}

		dict['ORIGIN_URL'] = amiRouter.getOriginURL();
		dict['WEBAPP_URL'] = amiRouter.getWebAppURL();

		return amiTwig.engine.render(twig, dict, twigs);
	};

	/*----------------------------------------------------------------------------------------------------------------*/

	asArray(dict).forEach((DICT) => {

		try
		{
			result.push(render(twig, DICT, twigs));
		}
		catch(e)
		{
			error(`TWIG parsing error: ${e.message}`);
		}
	});

	/*----------------------------------------------------------------------------------------------------------------*/

	return result.join('');
}

/*--------------------------------------------------------------------------------------------------------------------*/
