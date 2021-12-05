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

import twigRoles from './assets/twig/roles/roles.twig';

/*--------------------------------------------------------------------------------------------------------------------*/

let adder;

/*--------------------------------------------------------------------------------------------------------------------*/

export function init()
{
	const result = $.Deferred();

	amiWebApp.loadResources([
		'ctrl:adder',
	]).done((data) => {

		amiWebApp.replaceHTML('#BCCE2136_3695_AB6F_4F08_3BD3C9035287', twigRoles).done(() => {

			adder = new data[0]();

			result.resolve();
		});

	}).fail((message) => {

		result.reject(message);
	});

	return result;
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function onLogin()
{
	adder.render('#D3C9F8B8_4EAF_B108_267E_066F064F7EF3', 'self', 'router_role', 'role', {catalog: 'self', entity: 'router_role', primaryField: 'id', start: 1, stop: 25});
}

/*--------------------------------------------------------------------------------------------------------------------*/
