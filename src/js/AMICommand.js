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

import AMIHttpClient from 'ami-http-client';
import AMIMqttClient from 'ami-mqtt-client';

/*--------------------------------------------------------------------------------------------------------------------*/
/* AMICommand                                                                                                         */
/*--------------------------------------------------------------------------------------------------------------------*/

// noinspection JSUnusedGlobalSymbols
/**
 * The AMI command subsystem
 * @namespace amiCommand
 */

class AMICommand
{
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * @type {AMIHttpClient}
	 */

	#httpClient = null;

	/**
	 * @type {AMIMqttClient}
	 */

	#mqttClient = null;

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Initializes the HTTP client
	 * @param {string} endpoint the HTTP endpoint
	 */

	initHttpClient(endpoint)
	{
		this.#httpClient = new AMIHttpClient(endpoint);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Initializes the MQTT client
	 * @param {string} endpoint the MQTT endpoint
	 */

	initMqttClient(endpoint)
	{
		this.#mqttClient = new AMIMqttClient(endpoint);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the HTTP endpoint
	 * @returns {string}
	 */

	getHttpEndpoint()
	{
		return this.#httpClient ? this.#httpClient.getEndpoint() : '';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the MQTT endpoint
	 * @returns {string}
	 */

	getMqttEndpoint()
	{
		return this.#mqttClient ? this.#mqttClient.getEndpoint() : '';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Executes an AMI command
	 * @param {string} command the command
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (mqtt, endpoint, serverName, converter, extras, params, context, timeout)
	 * @returns {$.Promise} A JQuery promise object
	 */

	execute(command, options)
	{
		return (typeof options === 'object' && 'mqtt' in options) ? this.#mqttClient.execute(command, options)
			                                                      : this.#httpClient.execute(command, options)
		;
	 }

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Signs in by JWT token (MQTT client)
	 * @param {string} token the password
	 * @param {string} serverName the server name
	 * @returns {$.Promise} A JQuery promise object
	 */

	 mqttSignInByToken(token, serverName)
	 {
	 	return this.#mqttClient.signInByToken(token, serverName);
	 }

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Signs out (MQTT client)
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Promise} A JQuery promise object
	 */

	mqttSignOut(options)
	{
		return this.#mqttClient.signOut(options);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Signs in by token (HTTP client)
	 * @param {string} token the token
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Promise} A JQuery promise object
	 */

	signInByToken(token, options)
	{
		return this.#httpClient.signInByToken(token, options);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Signs in by login/password (HTTP client)
	 * @param {string} username the username
	 * @param {string} password the password
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Promise} A JQuery promise object
	 */

	signInByPassword(username, password, options)
	{
		return this.#httpClient.signInByPassword(username, password, options);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Signs in by certificate (HTTP client)
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Promise} A JQuery promise object
	 */

	signInByCertificate(options)
	{
		return this.#httpClient.signInByCertificate(options);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Signs out (HTTP client)
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Promise} A JQuery promise object
	 */

	signOut(options)
	{
		return this.#httpClient.signOut(options).always(() => {
			/*
			return this.#mqttClient.signOut(options).done(() => {

				console.log('MQTT connection closed too');
			});
			*/
		});
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Attaches a certificate
	 * @param {string} username the username
	 * @param {string} password the password
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Promise} A JQuery promise object
	 */

	attachCertificate(options)
	{
		options = options || {};

		return this.execute('GetSessionInfo -attachCert', options);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Detaches a certificate
	 * @param {string} username the username
	 * @param {string} password the password
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Promise} A JQuery promise object
	 */

	detachCertificate(options)
	{
		options = options || {};

		return this.execute('GetSessionInfo -detachCert', options);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Adds a new username
	 * @param {string} username the username
	 * @param {string} password the password
	 * @param {string} firstName the first name
	 * @param {string} lastName the last name
	 * @param {string} email the email
	 * @param {string} captchaHash the captcha hash generated by AMI
	 * @param {string} captchaText the captcha text entered by the username
	 * @param {boolean} attachCert attach the current certificate
	 * @param {boolean} agree agree with the terms and conditions
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Promise} A JQuery promise object
	 */

	addUser(username, password, firstName, lastName, email, captchaHash, captchaText, attachCert, agree, options)
	{
		options = options || {};

		options.params = [username, password, firstName, lastName, email, captchaHash, captchaText];

		return this.execute('AddUser -amiLogin=? -amiPassword=? -firstName=? -lastName=? -email=? -captchaHash=? -captchaText=? ' + (attachCert ? ' -attachCert' : '') + (agree ? ' -agree' : ''), options);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Changes the account information
	 * @param {string} firstName the first name
	 * @param {string} lastName the last name
	 * @param {string} email the email
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Promise} A JQuery promise object
	 */

	changeInfo(firstName, lastName, email, options)
	{
		options = options || {};

		options.params = [firstName, lastName, email]

		return this.execute('SetUserInfo -firstName=? -lastName=? -email=?', options);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Changes the account password
	 * @param {string} username the username
	 * @param {string} oldPassword the old password
	 * @param {string} newPassword the new password
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Promise} A JQuery promise object
	 */

	changePassword(username, oldPassword, newPassword, options)
	{
		options = options || {};

		options.params = [username, oldPassword, newPassword];

		return this.execute('ChangePassword -amiLogin=? -amiPasswordOld=? -amiPasswordNew=?', options);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Resets the account password
	 * @param {string} username the username
	 * @param {string} captchaHash the captcha hash generated by AMI
	 * @param {string} captchaText the captcha text entered by the username
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Promise} A JQuery promise object
	 */

	resetPassword(username, captchaHash, captchaText, options)
	{
		options = options || {};

		options.params = [username, captchaHash, captchaText];

		return this.execute('ResetPassword -amiLogin=? -captchaHash=? -captchaText=?', options);
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiCommand                                                                                                         */
/*--------------------------------------------------------------------------------------------------------------------*/

export default new AMICommand();

/*--------------------------------------------------------------------------------------------------------------------*/
