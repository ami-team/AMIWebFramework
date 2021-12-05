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

let adder1;
let adder2;
let adder3;
let adder4;

/*--------------------------------------------------------------------------------------------------------------------*/

export function init()
{
	const result = $.Deferred();

	amiWebApp.loadResources([
		'ctrl:adder',
	]).done((data) => {

		amiWebApp.replaceHTML('#BCCE2136_3695_AB6F_4F08_3BD3C9035287', twigCatalogs).done(() => {

			adder1 = new data[0]();
			adder2 = new data[0]();
			adder3 = new data[0]();
			adder4 = new data[0]();

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
	adder1.render('#A5F4DDCC_C731_9B8D_D293_5FCCF9F6F99F', 'self', 'router_catalog', 'externalCatalog', {catalog: 'self', entity: 'router_catalog', primaryField: 'id', start: 1, stop: 25});
	adder2.render('#E66984CB_E3A4_3D1A_0AC4_7E2F525C9600', 'self', 'router_entity', 'entity', {catalog: 'self', entity: 'router_entity', primaryField: 'id', start: 1, stop: 25});
	adder3.render('#A8A6384A_0599_B207_B5E3_89FBD4BF0657', 'self', 'router_field', 'field', {catalog: 'self', entity: 'router_field', primaryField: 'id', start: 1, stop: 25});
	adder4.render('#E2DDC44D_7AB8_708B_F4E4_EF18A24B3D2F', 'self', 'router_foreign_key', 'name', {catalog: 'self', entity: 'router_foreign_key', primaryField: 'id', start: 1, stop: 25});
}

/*--------------------------------------------------------------------------------------------------------------------*/
