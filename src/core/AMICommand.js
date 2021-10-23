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

/**
 * The AMI command subsystem
 */

class AMICommand
{
	/*----------------------------------------------------------------------------------------------------------------*/

	#httpClient = null;
	#mqttClient = null;

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * @param {string} httpEndpoint the HTTP endpoint
	 * @param {string} mqttEndpoint the MQTT endpoint
	 */

	init(httpEndpoint, mqttEndpoint)
	{
		this.#httpClient = new AMIHttpClient(httpEndpoint);
		this.#mqttClient = new AMIMqttClient(mqttEndpoint);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Get the HTTP endpoint
	 * @returns {string}
	 */

	getHTTPEndpoint()
	{
		return this.#httpClient;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Get the MQTT endpoint
	 * @returns {string}
	 */

	getMQTTEndpoint()
	{
		return this.#mqttClient;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Executes an AMI command
	 * @param {string} command the command
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (mqtt, endpoint, serverName, converter, extras, params, context, timeout)
	 * @returns {$.Deferred} A JQuery deferred object
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
	 * @returns {$.Deferred} A JQuery deferred object
	 */

	 mqttSignInByToken(token, serverName)
	 {
	 	return this.#mqttClient.signInByToken(token, serverName);
	 }

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Signs out (MQTT client)
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Deferred} A JQuery deferred object
	 */

	mqttSignOut(options)
	{
		return this.#mqttClient.signOut(options);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Signs in by login/password (HTTP client)
	 * @param {string} username the username
	 * @param {string} password the password
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Deferred} A JQuery deferred object
	 */

	signInByPassword(username, password, options)
	{
		this.#httpClient.signInByPassword(username, password, options);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Signs in by certificate (HTTP client)
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Deferred} A JQuery deferred object
	 */

	signInByCertificate(options)
	{
		return this.#httpClient.signInByCertificate(options);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Signs out (HTTP client)
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Deferred} A JQuery deferred object
	 */

	signOut(options)
	{
		return this.#httpClient.signOut(options).always(() => {

			return this.#mqttClient.signOut(options).done(() => {

				console.log('MQTT connection closed too');
			});
		});
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Attaches a certificate
	 * @param {string} username the username
	 * @param {string} password the password
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Deferred} A JQuery deferred object
	 */

	attachCertificate(username, password, options)
	{
		options = options || {};

		options.params = [username, password];

		return this.execute('GetSessionInfo -attachCert -amiLogin=? -amiPassword=?', options);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Detaches a certificate
	 * @param {string} username the username
	 * @param {string} password the password
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Deferred} A JQuery deferred object
	 */

	detachCertificate(username, password, options)
	{
		options = options || {};

		options.params = [username, password];

		return this.execute('GetSessionInfo -detachCert -amiLogin=? -amiPassword=?', options);
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
	 * @param {Boolean} attachCert attach the current certificate
	 * @param {Boolean} agree agree with the terms and conditions
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Deferred} A JQuery deferred object
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
	 * @returns {$.Deferred} A JQuery deferred object
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
	 * @returns {$.Deferred} A JQuery deferred object
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
	 * @returns {$.Deferred} A JQuery deferred object
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

const amiCommand = new AMICommand();

/*--------------------------------------------------------------------------------------------------------------------*/

if(typeof window !== 'undefined')
{
	window.amiCommand = amiCommand;
}

export default amiCommand;

/*--------------------------------------------------------------------------------------------------------------------*/
