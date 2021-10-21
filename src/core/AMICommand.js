/*
 * AMI Web Framework - AMICommand.js
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team / LPSC / IN2P3
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

	init(httpEndpoint, mqttEndpoint)
	{
		this.#httpClient = new AMIHttpClient(httpEndpoint);
		this.#mqttClient = new AMIMqttClient(mqttEndpoint);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Executes an AMI command
	 * @param {String} command the command
	 * @param {Object} [options] dictionary of optional parameters (mqtt, endpoint, serverName, converter, extras, params, context, timeout)
	 * @returns {$.Deferred} A JQuery deferred object
	 */

	execute(command, options)
	{
		return (typeof options !== 'undefined' && 'mqtt' in options) ? this.#mqttClient.execute(command, options)
			                                                         : this.#httpClient.execute(command, options)
		;
	 }

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Signs in by JWT token (MQTT client)
	 * @param {String} token the password
	 * @param {String} serverName the server name
	 * @returns {$.Deferred} A JQuery deferred object
	 */

	 mqttSignInByToken(token, serverName)
	 {
	 	return this.#mqttClient.signInByToken(token, serverName);
	 }

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Signs out (MQTT client)
	 * @param {Object} [options] dictionary of options (context)
	 * @returns {$.Deferred} A JQuery deferred object
	 */

	mqttSignOut(options)
	{
		return this.#mqttClient.signOut(options);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Signs in by login/password (HTTP client)
	 * @param {String} username the username
	 * @param {String} password the password
	 * @param {Object} [options] dictionary of options (context)
	 * @returns {$.Deferred} A JQuery deferred object
	 */

	signInByPassword(username, password, options)
	{
		this.#httpClient.signInByPassword(username, password, options);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Signs in by certificate (HTTP client)
	 * @param {Object} [options] dictionary of options (context)
	 * @returns {$.Deferred} A JQuery deferred object
	 */

	signInByCertificate(options)
	{
		return this.#httpClient.signInByCertificate(options);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Signs out (HTTP client)
	 * @param {Object} [options] dictionary of options (context)
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
	 * @param {String} username the username
	 * @param {String} password the password
	 * @param {Object} [options] dictionary of options (context)
	 * @returns {$.Deferred} A JQuery deferred object
	 */

	attachCertificate(username, password, options)
	{
		return this.execute('GetSessionInfo -attachCert -amiLogin=? -amiPassword=?', {
			params: [username, password],
			...(options || {}),
		});
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Detaches a certificate
	 * @param {String} username the username
	 * @param {String} password the password
	 * @param {Object} [options] dictionary of options (context)
	 * @returns {$.Deferred} A JQuery deferred object
	 */

	detachCertificate(username, password, options)
	{
		return this.execute('GetSessionInfo -detachCert -amiLogin=? -amiPassword=?', {
			params: [username, password],
			...(options || {}),
		});
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Adds a new username
	 * @param {String} username the username
	 * @param {String} password the password
	 * @param {String} firstName the first name
	 * @param {String} lastName the last name
	 * @param {String} email the email
	 * @param {String} captchaHash the captcha hash generated by AMI
	 * @param {String} captchaText the captcha text entered by the username
	 * @param {Boolean} attachCert attach the current certificate
	 * @param {Boolean} agree agree with the terms and conditions
	 * @param {Object} [options] dictionary of options (context)
	 * @returns {$.Deferred} A JQuery deferred object
	 */

	addUser(username, password, firstName, lastName, email, captchaHash, captchaText, attachCert, agree, options)
	{
		return this.execute('AddUser -amiLogin=? -amiPassword=? -firstName=? -lastName=? -email=? -captchaHash=? -captchaText=? ' + (attachCert ? ' -attachCert' : '') + (agree ? ' -agree' : ''), {
			params: [username, password, firstName, lastName, email, captchaHash, captchaText],
			...(options || {}),
		});
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Changes the account information
	 * @param {String} firstName the first name
	 * @param {String} lastName the last name
	 * @param {String} email the email
	 * @param {Object} [options] dictionary of options (context)
	 * @returns {$.Deferred} A JQuery deferred object
	 */

	changeInfo(firstName, lastName, email, options)
	{
		return this.execute('SetUserInfo -firstName=? -lastName=? -email=?', {
			params: [firstName, lastName, email],
			...(options || {}),
		});
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Changes the account password
	 * @param {String} username the username
	 * @param {String} oldPassword the old password
	 * @param {String} newPassword the new password
	 * @param {Object} [options] dictionary of options (context)
	 * @returns {$.Deferred} A JQuery deferred object
	 */

	changePassword(username, oldPassword, newPassword, options)
	{
		return this.execute('ChangePassword -amiLogin=? -amiPasswordOld=? -amiPasswordNew=?', {
			params: [username, oldPassword, newPassword],
			...(options || {}),
		});
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Resets the account password
	 * @param {String} username the username
	 * @param {String} captchaHash the captcha hash generated by AMI
	 * @param {String} captchaText the captcha text entered by the username
	 * @param {Object} [options] dictionary of options (context)
	 * @returns {$.Deferred} A JQuery deferred object
	 */

	resetPassword(username, captchaHash, captchaText, options)
	{
		return this.execute('ResetPassword -amiLogin=? -captchaHash=? -captchaText=?', {
			params: [username, captchaHash, captchaText],
			...(options || {}),
		});
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
