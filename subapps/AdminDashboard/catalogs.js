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

import twigCatalogs from './assets/twig/catalogs/catalogs.twig';

/*--------------------------------------------------------------------------------------------------------------------*/

export function init()
{
	const result = $.Deferred();

	amiWebApp.replaceHTML('#BCCE2136_3695_AB6F_4F08_3BD3C9035287', twigCatalogs).done(() => {

		result.resolve();
	});

	return result;
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function onExit()
{
	const result = $.Deferred();

	result.resolve();

	return result;
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function onLogin()
{
	const result = $.Deferred();

	result.resolve();

	return result;
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function onLogout()
{
	const result = $.Deferred();

	result.resolve();

	return result;
}

/*--------------------------------------------------------------------------------------------------------------------*/
