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

import * as view from './utilities/view';
import * as tools from './utilities/tools';
import * as strings from './utilities/strings';
import * as subapps from './utilities/subapps';

import amiRouter from './AMIRouter';
import amiWebApp from './AMIWebApp';
import amiCommand from './AMICommand';

import 'kjua';

/*--------------------------------------------------------------------------------------------------------------------*/

// noinspection JSUnusedGlobalSymbols
/**
 * The AMI authentication subsystem
 * @namespace amiAuth
 * @alias amiLogin
 */

class AMIAuth
{
	/*----------------------------------------------------------------------------------------------------------------*/
	/* PUBLIC MEMBERS                                                                                                 */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * @type {Object<string,*>}
	 */

	#flags = {};

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * @type {Object<string,*>}
	 */

	#userInfo = {};

	/**
	 * @type {Object<string,*>}
	 */

	#roleInfo = {};

	/**
	 * @type {Object<string,*>}
	 */

	#bookmarkInfo = {};

	/**
	 * @type {Object<string,*>}
	 */

	#dashboardInfo = {};

	/**
	 * @type {Object<string,*>}
	 */

	#awfInfo = {};

	/*----------------------------------------------------------------------------------------------------------------*/

	#setupAWF(awfInfo)
	{
		try
		{
			const config = JSON.parse(strings.base64Decode(awfInfo.config));

			view.setDateTimeFormats(
				config['datetimePrecision'],
				config['datetimeFormat'],
				config['dateFormat'],
				config['timePrecision'],
				config['timeHMSFormat'],
				config['timeHMFormat']
			);

			this.#awfInfo = config;
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
		bookmarksAllowed, dashboardsAllowed
	 ) {
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		this.#flags = {
			ssoAutoAuthentication: ssoAutoAuthentication,
			ssoAuthenticationAllowed: ssoAuthenticationAllowed,
			passwordAuthenticationAllowed: passwordAuthenticationAllowed,
			certificateAuthenticationAllowed: certificateAuthenticationAllowed,
			logoutAllowed: logoutAllowed,
			createAccountAllowed: createAccountAllowed,
			changeInfoAllowed: changeInfoAllowed,
			changePasswordAllowed: changePasswordAllowed,
			changeCertificateAllowed: changeCertificateAllowed,
			captchaAllowed: captchaAllowed,
			bookmarksAllowed: bookmarksAllowed,
			dashboardsAllowed: dashboardsAllowed,
		};

		/*------------------------------------------------------------------------------------------------------------*/

		const userdata = amiRouter.getWebAppArgs()['userdata'] || '';

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.signInByCertificate().fail((data, message, userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo) => {

			/*--------------------------------------------------------------------------------------------------------*/

			this.#setupAWF(awfInfo);

			/*--------------------------------------------------------------------------------------------------------*/

			this.#update(userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo).always((/*---*/) => {

				result.reject(message);
			});

			/*--------------------------------------------------------------------------------------------------------*/

		}).done((data, message, userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo) => {

			/*--------------------------------------------------------------------------------------------------------*/

			this.#setupAWF(awfInfo);

			/*--------------------------------------------------------------------------------------------------------*/

			tools._internal_then(amiWebApp.onReady(userdata), () => {

				amiWebApp._isReady = true;

				this.#update(userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo).then((message) => {

					result.resolve(message);

				}, (message) => {

					result.reject(message);
				});

			}, (message) => {

				amiWebApp._isReady = true;

				this.#update(userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo).then((/*---*/) => {

					result.reject(message);

				}, (message) => {

					result.reject(message);
				})
			});

			/*--------------------------------------------------------------------------------------------------------*/
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	#update(userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const user = userInfo.AMIUser || 'guest';
		const guest = userInfo.guestUser || 'guest';

		/*------------------------------------------------------------------------------------------------------------*/

		const dict = {
			...this.#flags,
			/**/
			userInfo     : (this.#userInfo      = userInfo     ),
			roleInfo     : (this.#roleInfo      = roleInfo     ),
			bookmarkInfo : (this.#bookmarkInfo  = bookmarkInfo ),
			dashboardInfo: (this.#dashboardInfo = dashboardInfo),
			awfInfo      : (this.#awfInfo       = awfInfo      ),
		};

		/*------------------------------------------------------------------------------------------------------------*/

		if(user !== guest)
		{
			/*--------------------------------------------------------------------------------------------------------*/

			const button = require(`../twigs/v${amiWebApp.bootstrapVersion}/sign_out_button.twig`);

			/*--------------------------------------------------------------------------------------------------------*/

			amiWebApp.replaceHTML('#ami_login_menu_content', button, {dict: dict}).done(() => {

				subapps.triggerLogin().then(() => {

					result.resolve();

				}, (message) => {

					result.reject(message);
				});
			});

			/*--------------------------------------------------------------------------------------------------------*/
		}
		else
		{
			/*--------------------------------------------------------------------------------------------------------*/

			const button = require(`../twigs/v${amiWebApp.bootstrapVersion}/sign_in_button.twi`);

			/*--------------------------------------------------------------------------------------------------------*/

			amiWebApp.replaceHTML('#ami_login_menu_content', button, {dict: dict}).done(() => {

				subapps.triggerLogout().then(() => {

					result.resolve();

				}, (message) => {

					result.reject(message);
				});
			});

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	}

	/*----------------------------------------------------------------------------------------------------------------*/
	/* PUBLIC METHODS                                                                                                 */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current MQTT endpoint
	 * @return {string} The current MQTT endpoint
	 */

	getMqttEndpoint()
	{
		return this.#awfInfo.mqttEndpoint || '';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current MQTT token
	 * @return {string} The current MQTT token
	 */

	getMqttToken()
	{
		return this.#awfInfo.mqttToken || '';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current user information
	 * @returns {Object<string,*>} The current user information
	 */

	getUserInfo()
	{
		return this.#userInfo;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current role information
	 * @returns {Object<string,*>} The current role information
	 */

	getRoleInfo()
	{
		return this.#roleInfo;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current bookmark information
	 * @returns {Object<string,*>} The current bookmark information
	 */

	getBookmarkInfo()
	{
		return this.#bookmarkInfo;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current dashboard information
	 * @returns {Object<string,*>} The current dashboard information
	 */

	getDashboardInfo()
	{
		return this.#dashboardInfo;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current AMI Web Framework information
	 * @returns {Object<string,*>} The current AMI Web Framework information
	 */

	getAWFInfo()
	{
		return this.#awfInfo;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current user
	 * @returns {string} The current user
	 */

	getUser()
	{
		return this.#userInfo.AMIUser || 'guest';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current guest user
	 * @returns {string} The current guest user
	 */

	getGuest()
	{
		return this.#userInfo.guestUser || 'guest';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current user `not before` date
	 * @returns {string} The current user `not before` date
	 */

	getNotBeforeDate()
	{
		return this.#userInfo.notBefore || '';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current user `not after` date
	 * @returns {string} The current user `not after` date
	 */

	getNotAfterDate()
	{
		return this.#userInfo.notAfter || '';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current client DN
	 * @returns {string} The current client DN
	 */

	getClientDN()
	{
		return this.#userInfo.clientDNInSession || '';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current issuer DN
	 * @returns {string} The current issuer DN
	 */

	getIssuerDN()
	{
		return this.#userInfo.issuerDNInSession || '';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Checks whether the user is valid or not
	 * @returns {boolean}
	 */

	isValid()
	{
		return (this.#userInfo.valid || 'false') !== 'false';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Checks whether the user is authenticated or not
	 * @returns {boolean}
	 */

	isAuthenticated()
	{
		return this.getUser() !== this.getGuest();
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Checks whether the user has the given role or not
	 * @param {string} roleName the role
	 * @returns {boolean}
	 */

	hasRole(roleName)
	{
		return roleName in this.#roleInfo;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Update the user information
	 * @returns {$.Promise} A JQuery promise object
	 */

	update()
	{
		amiWebApp.lock();

		return amiCommand.signInByCertificate().done((data, message, userInfo, roleInfo, bookmarkInfo, awfInfo) => {

			this.#setupAWF(awfInfo);

			this.#update(userInfo, roleInfo, bookmarkInfo, awfInfo).always(() => {

				amiWebApp.unlock();
			});
		});
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/

export default new AMIAuth();

/*--------------------------------------------------------------------------------------------------------------------*/
