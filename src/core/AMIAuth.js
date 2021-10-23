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

import { _internal_then } from './utilities/tools';

import { triggerLogin, triggerLogout } from './utilities/subapps';

import amiRouter from './AMIRouter';
import amiWebApp from './AMIWebApp';

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

		const userdata = amiRouter.getArgs()['userdata'] || '';

		/*------------------------------------------------------------------------------------------------------------*/

		_internal_then(amiWebApp.onReady(userdata), () => {

			amiWebApp._isReady = true;

			triggerLogin();

			result.resolve(/*---*/);

		}, (message) => {

			amiWebApp._isReady = true;

			triggerLogin();

			result.reject(message);
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

const amiAuth = new AMIAuth();

if(typeof window !== 'undefined')
{
	window.amiAuth = amiAuth;
}

export default amiAuth;

/*--------------------------------------------------------------------------------------------------------------------*/
