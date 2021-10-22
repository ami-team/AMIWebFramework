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

import {typeOf, asArray} from './tools';

import {error} from './messages';

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

		if(typeOf(dict) !== 'Object')
		{
			dict = {};
		}

		if(typeOf(twigs) !== 'Object')
		{
			twigs = {};
		}

		dict['ORIGIN_URL'] = amiRouter.getOriginURL();
		dict['WEBAPP_URL'] = amiRouter.getWebAppURL();

		return amiTwig.engine.render(twig, dict, twigs);
	};

	/*----------------------------------------------------------------------------------------------------------------*/

	dict = dict || {};
	twigs = twigs || {};

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
