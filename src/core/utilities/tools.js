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

/*--------------------------------------------------------------------------------------------------------------------*/
/* TOOLS                                                                                                              */
/*--------------------------------------------------------------------------------------------------------------------*/

export function typeOf(x)
{
	const name = Object.prototype.toString.call(x);

	return name.startsWith('[object ') ? name.substring(8, name.length - 1)
	                                   : /*-----------*/ '' /*-----------*/
	;
}

/*----------------------------------------------------------------------------------------------------------------*/

export function asArray(x)
{
	return typeOf(x) === 'Array' ? (x)
	                             : [x]
	;
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function setup(optionNames, optionDefaults, options)
{
	const result = [];

	/*----------------------------------------------------------------------------------------------------------------*/

	const l = optionNames.length;
	const m = optionDefaults.length;

	if(l !== m)
	{
		throw 'internal error';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	if(options)
	{
		for(let i = 0; i < l; i++)
		{
			result.push(optionNames[i] in options ? options[optionNames[i]] : optionDefaults[i]);
		}
	}
	else
	{
		for(let i = 0; i < l; i++)
		{
			result.push(/*-------------------------------------------------*/ optionDefaults[i]);
		}
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	return result;
}

/*--------------------------------------------------------------------------------------------------------------------*/
