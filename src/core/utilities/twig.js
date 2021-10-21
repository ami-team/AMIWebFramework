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
/* TWIG                                                                                                               */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Interpretes the given TWIG string, see {@link http://twig.sensiolabs.org/documentation}
 * @param {String} twig the TWIG string
 * @param {Object|Array<Object>} [dict] the dictionary
 * @param {Object} [twigs] dictionary of fragments
 * @returns {String} The Interpreted TWIG string
 */

export function formatTWIG(twig, dict = {}, twigs = {})
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

	try
	{
		asArray(dict).forEach((DICT) => {

			result.push(render(twig, DICT, twigs));
		});
	}
	catch(e)
	{
		error(`TWIG parsing error: ${e.message}`);

		result.length = 0;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	return result.join('');
}

/*--------------------------------------------------------------------------------------------------------------------*/
