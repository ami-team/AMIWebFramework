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

// noinspection JSUnusedGlobalSymbols
/**
 * The AMI authentication subsystem
 * @namespace amiAuth
 */

class AMIAuth
{
	/*----------------------------------------------------------------------------------------------------------------*/

	setupAWF(awfInfo)
	{
		try
		{
			const config = JSON.parse(base64Decode(awfInfo.config));

			setDateTimeFormats(
				config.datetimePrecision,
				config.datetimeFormat,
				config.dateFormat,
				config.timePrecision,
				config.timeHMSFormat,
				config.timeHMFormat
			);
		}
		catch(e)
		{
			/* IGNORE */
		}
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	init(
		ssoAutoAuthentication,
		ssoAuthenticationAllowed, passwordAuthenticationAllowed, certificateAuthenticationAllowed, logoutAllowed,
		createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed,
		captchaAllowed,
		bookmarksAllowed
	 ) {
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const userdata = amiRouter.getWebAppArgs()['userdata'] || '';

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.signInByCertificate().fail((data, message, userInfo, roleInfo, bookmarkInfo, awfInfo) => {

			this.setupAWF(awfInfo);

			this._update(userInfo, roleInfo, bookmarkInfo, awfInfo).always((/*---*/) => {

				result.reject(message);
			});

		}).done((data, message, userInfo, roleInfo, bookmarkInfo, awfInfo) => {

			/*--------------------------------------------------------------------------------------------------------*/

			this.setupAWF(awfInfo);

			/*--------------------------------------------------------------------------------------------------------*/

			_internal_then(amiWebApp.onReady(userdata), () => {

				amiWebApp._isReady = true;

				this._update(userInfo, roleInfo, bookmarkInfo, awfInfo).then((message) => {

					result.resolve(message);

				}, (message) => {

					result.reject(message);
				});

			}, (message) => {

				amiWebApp._isReady = true;

				result.reject(message);
			});

			/*--------------------------------------------------------------------------------------------------------*/
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	_update(userInfo, roleInfo, bookmarkInfo, awfInfo)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		// console.log(userInfo);
		// console.log(roleInfo);
		// console.log(bookmarkInfo);
		// console.log(awfInfo);

		/*------------------------------------------------------------------------------------------------------------*/

		const user = userInfo.AMIUser || 'guest';
		const guest = userInfo.guestUser || 'guest';

		/*------------------------------------------------------------------------------------------------------------*/

		if(user !== guest)
		{
			/*--------------------------------------------------------------------------------------------------------*/

			triggerLogin().then(() => {

				result.resolve();

			}, (message) => {

				result.reject(message);
			});

			/*--------------------------------------------------------------------------------------------------------*/
		}
		else
		{
			/*--------------------------------------------------------------------------------------------------------*/

			triggerLogout().then(() => {

				result.resolve();

			}, (message) => {

				result.reject(message);
			});

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
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

	/**
	 * Checks whether the user has the given role
	 * @param {string} roleName the role
	 * @returns {boolean}
	 */

	hasRole(roleName)
	{
		return true;
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/

export default new AMIAuth();

/*--------------------------------------------------------------------------------------------------------------------*/
