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

import {textToHtml} from './strings';

import {getStack, unlock} from './locks';

import amiWebApp from '../AMIWebApp';

import amiTwig from 'ami-twig';

/*--------------------------------------------------------------------------------------------------------------------*/
/* MESSAGES                                                                                                           */
/*--------------------------------------------------------------------------------------------------------------------*/

const _linkExp = new RegExp('\\[([^\\]]*)]\\(([^)]*)\\)', 'g');

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 *
 * @param {string} clazz the class
 * @param {string} title the title
 * @param {string|Array<string>} message the message
 * @param {boolean} [fadeOut=false] if True, the message disappears after 60s
 * @private
 */

function _publishAlert(clazz, title, message, fadeOut)
{
	/*----------------------------------------------------------------------------------------------------------------*/

	if(Array.isArray(message))
	{
		message = message.map(MESSAGE => (MESSAGE || '').toString()).join('. ');
	}
	else
	{
		message = (message || '').toString();
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	const hash = message.hashCode();

	// noinspection TypeScriptUMDGlobal

	const date = moment().format('DD MMM, HH:mm:ss');

	/*----------------------------------------------------------------------------------------------------------------*/

	const toast = $(`#ami_alert_content > .toast[data-hash="${hash}"]`);

	/*----------------------------------------------------------------------------------------------------------------*/

	if(toast.length === 0)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		const twig = require('../../twigs/' + amiWebApp.bootstrapVersion + '/message.twig');

		const html = amiTwig.engine.render(twig, {
			date: date,
			hash: hash,
			clazz: clazz,
			title: title,
			fadeOut: fadeOut,
			message: message,
		});

		/*------------------------------------------------------------------------------------------------------------*/

		$('#ami_alert_content').append(html.replace(_linkExp, '<a href="' + '$1' + '" target="_blank">$2</a>')).promise().done(() => {

			$(`#ami_alert_content > .toast[data-hash="${hash}"]`).toast('show');
		});

		/*------------------------------------------------------------------------------------------------------------*/
	}
	else
	{
		/*------------------------------------------------------------------------------------------------------------*/

		toast.find('.toast-header > strong').html(textToHtml(title)
			+ ` <span class="badge badge-${clazz}">${toast.attr('data-cnt', parseInt(toast.attr('data-cnt')) + 1).attr('data-cnt')}</span>`);
		toast.find('.toast-header > small').html(textToHtml(date));

		toast.toast('show');

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	console.log(`AMI :: ${title.toUpperCase()}: ${message}\n${getStack()}`); // eslint-disable-line no-console

	$(document).scrollTop(0);

	unlock();

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Shows an 'info' message
 * @param {string|Array<string>} message the message
 * @param {boolean} [fadeOut=false] if True, the message disappears after 60s
 */

export function info(message, fadeOut)
{
	_publishAlert('info', 'Info', message, fadeOut);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Shows a 'success' message
 * @param {string|Array<string>} message the message
 * @param {boolean} [fadeOut=false] if True, the message disappears after 60s
 */

export function success(message, fadeOut)
{
	_publishAlert('success', 'Success', message, fadeOut);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Shows a 'warning' message
 * @param {string|Array<string>} message the message
 * @param {boolean} [fadeOut=false] if True, the message disappears after 60s
 */

export function warning(message, fadeOut)
{
	_publishAlert('warning', 'Warning', message, fadeOut);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Shows an 'error' message
 * @param {string|Array<string>} message the message
 * @param {boolean} [fadeOut=false] if True, the message disappears after 60s
 */

export function error(message, fadeOut)
{
	_publishAlert('danger', 'Error', message, fadeOut);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Flushes messages
 */

export function flush()
{
	$('#ami_alert_content').empty();
}

/*--------------------------------------------------------------------------------------------------------------------*/
