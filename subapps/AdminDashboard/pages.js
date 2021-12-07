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

import twigPages from './assets/twig/pages/pages.twig';

/*--------------------------------------------------------------------------------------------------------------------*/

let _adder;

/*--------------------------------------------------------------------------------------------------------------------*/

export function init()
{
	const result = $.Deferred();

	amiWebApp.loadResources([
		'ctrl:adder',
	]).done((data) => {

		amiWebApp.replaceHTML('#BCCE2136_3695_AB6F_4F08_3BD3C9035287', twigPages).done(() => {

			_adder = new data[0]();

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
	_adder.render('#D2E57C9B_56BB_A185_357F_22BDCD99812D', 'self', 'router_markdown', 'name', {catalog: 'self', entity: 'router_markdown', primaryField: 'id', start: 1, stop: 25});
}

/*--------------------------------------------------------------------------------------------------------------------*/
