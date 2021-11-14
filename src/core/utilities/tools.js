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

import amiTwig from 'ami-twig';

/*--------------------------------------------------------------------------------------------------------------------*/
/* TOOLS                                                                                                              */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @param {$.Deferred} deferred
 * @param {function} doneCallback
 * @param {function} failCallback
 * @ignore
 */

export function _internal_then(deferred, doneCallback, failCallback)
{
	if(deferred && deferred.then)
	{
		deferred.then(
			doneCallback,
			failCallback
		);
	}
	else
	{
		doneCallback();
	}
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @param {$.Deferred} deferred
 * @param {function} alwaysCallback
 * @ignore
 */

export function _internal_always(deferred, alwaysCallback)
{
	if(deferred && deferred.always)
	{
		deferred.always(
			alwaysCallback
		);
	}
	else
	{
		alwaysCallback();
	}
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Gets the type name of the given object
 * @param {*} x the object
 * @returns {string} The type name of the given object
 * @ignore
 */

export function typeOf(x)
{
	const name = Object.prototype.toString.call(x);

	return name.startsWith('[object ') ? name.substring(8, name.length - 1)
	                                   : /*-----------*/ '' /*-----------*/
	;
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @ignore
 */

export function isString(x)
{
	return amiTwig.stdlib.isString(x);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @ignore
 */

export function isArray(x)
{
	return amiTwig.stdlib.isArray(x);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @ignore
 */

export function isObject(x)
{
	return amiTwig.stdlib.isObject(x);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @ignore
 */

export function isSet(x)
{
	return amiTwig.stdlib.isSet(x);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @ignore
 */

export function isMap(x)
{
	return amiTwig.stdlib.isMap(x);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @param {*} x
 * @returns {Array<*>}
 * @ignore
 */

export function asArray(x)
{
	return Array.isArray(x) ? (x)
	                        : [x]
	;
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @param {Array<String>} optionNames
 * @param {Array<*>} optionDefaults
 * @param {Object<String, *>} options
 * @returns {Array<*>}
 * @ignore
 */

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
