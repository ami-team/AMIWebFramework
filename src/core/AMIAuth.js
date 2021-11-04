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

import {_internal_then} from './utilities/tools';

import {base64Decode} from './utilities/strings';

import {setDateTimeFormats} from './utilities/view';

import {triggerLogin, triggerLogout} from './utilities/subapps';

import amiRouter from './AMIRouter';

import amiWebApp from './AMIWebApp';

import amiCommand from './AMICommand';

import 'kjua';

/*--------------------------------------------------------------------------------------------------------------------*/

class AMIAuth
{
	/*----------------------------------------------------------------------------------------------------------------*/

	init(
		ssoAutoAuthentication,
		ssoAuthenticationAllowed, passwordAuthenticationAllowed, certificateAuthenticationAllowed, logoutAllowed,
		createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed,
		captchaAllowed,
		bookmarksAllowed
	 ) {
		const result = $.Deferred();

		/*--------------------------------------------------------------------------------------------------------*/

		const userdata = amiRouter.getWebAppArgs()['userdata'] || '';

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.signInByCertificate().then((data, message, userInfo, roleInfo, bookmarkInfo, awfInfo) => {

			try
			{
				const config = JSON.parse(base64Decode(awfInfo.config));

				setDateTimeFormats(
					config.datetimeFormat,
					config.dateFormat,
					config.timeFormatHMS,
					config.timeFormatHM,
					config.timePrecision
				);
			}
			catch(e)
			{
				/* IGNORE */
			}

			_internal_then(amiWebApp.onReady(userdata), () => {

				amiWebApp._isReady = true;

				triggerLogin();

				result.resolve(/*---*/);

			}, (message) => {

				/* TODO */
			});

		}, (data, message, userInfo, roleInfo, bookmarkInfo, awfInfo) => {

			/* TODO */
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Checks whether the user is authenticated
	 * @returns {boolean}
	 */

	isAuthenticated()
	{
		return false;
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/

export default new AMIAuth();

/*--------------------------------------------------------------------------------------------------------------------*/
