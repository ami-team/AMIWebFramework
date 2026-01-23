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
 * @type {Object<string,Object<string,*>>}
 * @private
 */

export const _controls = {};

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously loads a control
 * @param {string} control the control name
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, cache)
 * @returns {$.Promise} A JQuery promise object
 * @ignore
 */

export function loadControl(control, options)
{
	console.group(`🔵 [loadControl] Chargement du contrôle: ${control}`);
	console.log('📋 Options:', options);

	const result = $.Deferred();

	const [context, cache] = tools.setup(
		['context', 'cache'],
		[result, false],
		options
	);

	/*----------------------------------------------------------------------------------------------------------------*/

	if(control.indexOf('ctrl:') === 0)
	{
		control = control.substring(5);
		console.log('📝 Préfixe "ctrl:" retiré, nouveau nom:', control);
	}

	const descr = _controls[control.toLowerCase()];

	console.log('📂 Descripteur du contrôle:', descr);

	/*----------------------------------------------------------------------------------------------------------------*/

	if(descr)
	{
		console.log('✅ Descripteur trouvé');
		console.log('   └─ file:', descr.file);
		console.log('   └─ clazz:', descr.clazz);
		console.log('   └─ URL complète:', `${amiRouter.getOriginURL()}/${descr.file}`);

		try
		{
			console.log('📦 Chargement du script...');

			resources.loadScripts(`${amiRouter.getOriginURL()}/${descr.file}`, {cache: cache}).then((loaded) => {

				console.log('✅ Script chargé, loaded:', loaded);

				// DIAGNOSTIC COMPLET AVANT RÉCUPÉRATION
				console.group('🔍 DIAGNOSTIC PRÉ-RÉCUPÉRATION');
				console.log('1. Nom de classe attendu:', descr.clazz);
				console.log('2. window existe?', !!window);
				console.log('3. window[descr.clazz] existe?', !!window[descr.clazz]);
				console.log('4. Type de window[descr.clazz]:', typeof window[descr.clazz]);

				// Vérifier aussi dans les namespaces
				console.log('5. window.ami existe?', !!window.ami);
				console.log('6. window.ami.native existe?', !!window.ami?.native);

				if (window.ami?.native) {
					console.log('7. Contrôles dans window.ami.native:');
					Object.keys(window.ami.native).forEach(key => {
						console.log(`   └─ ${key}: ${typeof window.ami.native[key]}`);
					});
				}

				// Lister toutes les propriétés de window qui ressemblent à des contrôles
				console.log('8. Propriétés de window contenant "Ctrl" ou contrôle recherché:');
				Object.keys(window).filter(key =>
					key.includes('Ctrl') ||
					key.includes(control) ||
					key === descr.clazz
				).forEach(key => {
					console.log(`   └─ ${key}: ${typeof window[key]}`);
				});

				console.groupEnd();

				// RÉCUPÉRATION DE LA CLASSE - LIGNE 39 (approximativement)
				console.log('🎯 Tentative de récupération de la classe...');

				const clazz = window[descr.clazz];

				console.log('📊 RÉSULTAT:');
				console.log('   └─ clazz:', clazz);
				console.log('   └─ typeof clazz:', typeof clazz);
				console.log('   └─ clazz === undefined?', clazz === undefined);
				console.log('   └─ clazz === null?', clazz === null);

				// VÉRIFICATION CRITIQUE
				if (!clazz) {
					console.error('❌ ERREUR CRITIQUE: clazz est undefined ou null!');
					console.error('💡 Nom de classe recherché:', descr.clazz);
					console.error('💡 Fichier chargé:', descr.file);
					console.error('💡 Le fichier doit définir: window["' + descr.clazz + '"]');
					console.groupEnd();

					result.rejectWith(context, [
						`cannot load control '${control}': class '${descr.clazz}' not found in window after loading ${descr.file}`
					]);
					return;
				}

				if (typeof clazz !== 'function') {
					console.error('❌ ERREUR: clazz n\'est pas une fonction/constructeur!');
					console.error('   └─ Type reçu:', typeof clazz);
					console.error('   └─ Valeur:', clazz);
					console.groupEnd();

					result.rejectWith(context, [
						`cannot load control '${control}': '${descr.clazz}' is not a constructor (type: ${typeof clazz})`
					]);
					return;
				}

				console.log('✅ Classe valide trouvée!');

				// VÉRIFICATION DU PROTOTYPE
				console.log('🔧 Vérification du prototype...');

				if (!clazz.prototype) {
					console.error('❌ ERREUR: Prototype inexistant!');
					console.groupEnd();

					result.rejectWith(context, [
						`cannot load control '${control}': '${descr.clazz}' has no prototype`
					]);
					return;
				}

				console.log('   └─ prototype existe:', !!clazz.prototype);
				console.log('   └─ prototype.onReady existe:', !!clazz.prototype.onReady);
				console.log('   └─ typeof prototype.onReady:', typeof clazz.prototype.onReady);

				// APPEL DE onReady
				console.log('📢 Tentative d\'appel de onReady...');

				const promise = loaded[0] ? clazz.prototype.onReady.apply(clazz.prototype)
					: /*----------------*/ null /*----------------*/
				;

				console.log('   └─ Promise retournée:', promise);

				tools._internal_then(promise, () => {

					console.log('✅ onReady exécuté avec succès');
					console.log('✅ loadControl terminé avec succès');
					console.groupEnd();

					result.resolveWith(context, [/*----------------*/ clazz /*----------------*/]);

				}, (message) => {

					console.error('❌ Erreur dans onReady:', message);
					console.groupEnd();

					result.rejectWith(context, [`cannot load control '${control}': ${message}`]);
				});

			}, (message) => {

				console.error('❌ Erreur lors du chargement du script:', message);
				console.groupEnd();

				result.rejectWith(context, [`cannot load control '${control}': ${message}`]);
			});
		}
		catch(message)
		{
			console.error('❌ Exception capturée:', message);
			console.error('Stack:', message.stack || 'N/A');
			console.groupEnd();

			result.rejectWith(context, [`cannot load control '${control}': ${message}`]);
		}
	}
	else
	{
		console.error('❌ ERREUR: Descripteur introuvable!');
		console.error('💡 Contrôle recherché:', control);
		console.error('💡 Contrôles disponibles dans _controls:');
		console.table(Object.keys(_controls).map(key => ({
			Nom: key,
			File: _controls[key].file,
			Class: _controls[key].clazz
		})));
		console.groupEnd();

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
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, patch, cache)
 * @returns {$.Promise} A JQuery promise object
 * @ignore
 */

export function createControl(parent, owner, control, params, options)
{
	console.group(`🎨 [createControl] Création du contrôle: ${control}`);
	console.log('👨‍👦 Parent:', parent);
	console.log('👤 Owner:', owner);
	console.log('📋 Params:', params);
	console.log('⚙️ Options:', options);

	const result = $.Deferred();

	const [context, patch] = tools.setup(
		['context', 'patch'],
		[result, null],
		options
	);

	/*----------------------------------------------------------------------------------------------------------------*/

	loadControl(control, options).done((constructor) => {

		console.log('✅ Contrôle chargé, constructeur:', constructor);
		console.log('🏗️ Création d\'une instance...');

		const instance = new constructor(parent, owner);

		console.log('✅ Instance créée:', instance);
		console.log('   └─ _instanceScope:', instance._instanceScope);

		if(typeof patch === 'function')
		{
			console.log('🔧 Application du patch...');
			patch(instance, instance._twigDict, window.ami.awf.globalTwigDict);
		}

		console.log('🎨 Appel de render avec params:', params);

		tools._internal_then(constructor.prototype.render.apply(instance, params), (...args) => {

			console.log('✅ Render terminé avec succès');
			console.log('✅ createControl terminé avec succès');
			console.groupEnd();

			result.resolveWith(context, [instance].concat(args));

		}, (message) => {

			console.error('❌ Erreur dans render:', message);
			console.groupEnd();

			result.rejectWith(context, [message]);
		});

	}).fail((message) => {

		console.error('❌ Échec du chargement du contrôle:', message);
		console.groupEnd();

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
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, patch, cache)
 * @returns {$.Promise} A JQuery promise object
 * @ignore
 */

export function createControlInBody(parent, owner, control, controlParams, controlOptions, ownerOptions, options)
{
	console.log('🎨 [createControlInBody]', control);

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
		console.error('❌ Exception dans createControlInBody:', message);
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
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, patch, cache)
 * @returns {$.Promise} A JQuery promise object
 * @ignore
 */

export function createControlInContainer(parent, owner, control, controlParams, controlOptions, ownerOptions, icon, title, options)
{
	console.log('🎨 [createControlInContainer]', control);

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
		console.error('❌ Exception dans createControlInContainer:', message);
		result.rejectWith(context, [message]);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	return result.promise();
}

/*--------------------------------------------------------------------------------------------------------------------*/

function _parseJSON(s, _default)
{
	try
	{
		return JSON.parse(s);
	}
	catch(e)
	{
		return _default;
	}
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Asynchronously creates a control in a container from a WEB link
 * @param {?*} parent the parent entity
 * @param {?*} owner the owner entity
 * @param {Element} el the HTML element
 * @param {Object<string, *>} ownerOptions the owner's optional parameters
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, patch, cache)
 * @returns {$.Promise} A JQuery promise object
 * @ignore
 */

export function createControlFromWebLink(parent, owner, el, ownerOptions, options)
{
	console.log('🔗 [createControlFromWebLink]');

	/*----------------------------------------------------------------------------------------------------------------*/

	const dataCtrl = el.hasAttribute('data-ctrl') ? el.getAttribute('data-ctrl')
		: ''
	;

	const dataCtrlLocation = el.hasAttribute('data-ctrl-location') ? el.getAttribute('data-ctrl-location')
		: ''
	;

	/*----------------------------------------------------------------------------------------------------------------*/

	const dataParams = el.hasAttribute('data-params') ? _parseJSON(el.getAttribute('data-params'), [])
		: []
	;

	const dataOptions = el.hasAttribute('data-options') ? _parseJSON(el.getAttribute('data-options'), {})
		: (
			el.hasAttribute('data-settings') ? _parseJSON(el.getAttribute('data-settings'), {})
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
