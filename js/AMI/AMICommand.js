/*!
 * AMI Web Framework - AMICommand.js
 *
 * Copyright (c) 2014-{{YEAR}} The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

'use strict';

/*-------------------------------------------------------------------------*/
/* amiCommand                                                              */
/*-------------------------------------------------------------------------*/

/**
 * The AMI command subsystem
 * @namespace amiCommand
 */

$AMINamespace('amiCommand', /** @lends amiCommand */ {
	/*-----------------------------------------------------------------*/
	/* PUBLIC MEMBERS                                                  */
	/*-----------------------------------------------------------------*/

	/**
	  * Default endpoint
	  * @type {String}
	  */

	endpoint: 'http://xxyy.zz',

	/**
	  * Default converter
	  * @type {String}
	  */

	converter: 'AMIXmlToJson.xsl',

	/*-----------------------------------------------------------------*/
	/* PRIVATE METHODS                                                 */
	/*-----------------------------------------------------------------*/

	_textToString: function(s)
	{
		return (s || '').replace(/[\\'"]/g, function(x) {

			return '\\' + x;
		});
	},

	/*-----------------------------------------------------------------*/
	/* PUBLIC METHODS                                                  */
	/*-----------------------------------------------------------------*/

	/**
	  * Execute an AMI command
	  * @param {String} command the command
	  * @param {Object} [settings] dictionary of settings (context, endpoint, converter, extraParam, extraValue)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	execute: function(command, settings)
	{
		let endpoint = this.endpoint;
		let converter = this.converter;
		let context = null;
		let timeout = 0x00;
		let extraParam = null;
		let extraValue = null;

		if(settings)
		{
			if('endpoint' in settings) {
				endpoint = settings['endpoint'];
			}

			if('converter' in settings) {
				converter = settings['converter'];
			}

			if('context' in settings) {
				context = settings['context'];
			}

			if('timeout' in settings) {
				timeout = settings['timeout'];
			}

			if('extraParam' in settings) {
				extraParam = settings['extraParam'];
			}

			if('extraValue' in settings) {
				extraValue = settings['extraValue'];
			}
		}

		/*---------------------------------------------------------*/

		const URL = endpoint.trim();
		const COMMAND = command.trim();
		const CONVERTER = converter.trim();

		/*---------------------------------------------------------*/

		const data = {
			Command: COMMAND,
			Converter: CONVERTER,
		};

		if(extraParam)
		{
			data[extraParam] = extraValue ? extraValue
			                              : (((null)))
			;
		}

		/*---------------------------------------------------------*/

		const urlWithParameters = URL + '?' + $.param(data);

		/*---------------------------------------------------------*/

		const result = $.Deferred();

		/*---------------------------------------------------------*/

		if(CONVERTER === 'AMIXmlToJson.xsl')
		{
			/*-------------------------------------------------*/
			/* JSON FORMAT                                     */
			/*-------------------------------------------------*/

			$.ajax({
				url: URL,
				data: data,
				type: 'POST',
				timeout: timeout,
				dataType: 'json',
				xhrFields: {
					withCredentials: true
				},
				success: function(data) {

					const error = JSPath.apply('.AMIMessage.error', data);

					if(error.length === 0)
					{
						result.resolveWith(context || result, [data, urlWithParameters]);
					}
					else
					{
						result.rejectWith(context || result, [data, urlWithParameters]);
					}
				},
				error: function(jqXHR, textStatus) {

					if(textStatus === 'error')
					{
						textStatus = 'service temporarily unreachable';
					}

					const data = {'AMIMessage': [{'error': [{'$': textStatus}]}]};

					result.rejectWith(context || result, [data, urlWithParameters]);
				},
			});

			/*-------------------------------------------------*/
		} else {
			/*-------------------------------------------------*/
			/* OTHER FORMATS                                   */
			/*-------------------------------------------------*/

			$.ajax({
				url: URL,
				data: data,
				type: 'POST',
				timeout: timeout,
				dataType: 'text',
				xhrFields: {
					withCredentials: true
				},
				success: function(data) {

					result.resolveWith(context || result, [data, urlWithParameters]);
				},
				error: function(jqXHR, textStatus) {

					if(textStatus === 'error')
					{
						textStatus = 'service temporarily unreachable';
					}

					result.rejectWith(context || result, [textStatus, urlWithParameters]);
				},
			});

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/

		return result.promise();
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Login by login/password
	  * @param {String} user the user
	  * @param {String} pass the password
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	passLogin: function(user, pass, settings)
	{
		let context = null;

		if(settings && 'context' in settings)
		{
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		const result = $.Deferred();

		/*---------------------------------------------------------*/

		this.execute('GetSessionInfo -AMIUser="' + this._textToString(user) + '" -AMIPass="' + this._textToString(pass) + '"', {extraParam: 'NoCert'}).then((data) => {

			const userInfo = {};
			const roleInfo = {};
			const ssoInfo = {}

			JSPath.apply('..rowset{.@type==="user"}.row.field', data).forEach((item) => {

				userInfo[item['@name']] = item['$'];
			});

			JSPath.apply('..rowset{.@type==="sso"}.row.field', data).forEach((item) => {

				ssoInfo[item['@name']] = item['$'];
			});

			JSPath.apply('..rowset{.@type==="role"}.row', data).forEach((row) => {

				let name = '';
				const role = {};

				row.field.forEach((field) => {

					role[field['@name']] = field['$'];

					if(field['@name'] === 'name')
					{
						name = field['$'];
					}
				});

				roleInfo[name] = role;
			});

			result.resolveWith(context || result, [data, userInfo, roleInfo, ssoInfo]);

		}, (data) => {

			result.rejectWith(context || result, [data, {AMIUser: 'guest', guestUser: 'guest'}, {}, '']);
		});

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Login by certificate
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	certLogin: function(settings)
	{
		let context = null;

		if(settings && 'context' in settings)
		{
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		const result = $.Deferred();

		/*---------------------------------------------------------*/

		this.execute('GetSessionInfo').then((data) => {

			const userInfo = {};
			const roleInfo = {};
			const ssoInfo = {}

			JSPath.apply('..rowset{.@type==="user"}.row.field', data).forEach((item) => {

				userInfo[item['@name']] = item['$'];
			});

			JSPath.apply('..rowset{.@type==="sso"}.row.field', data).forEach((item) => {

				ssoInfo[item['@name']] = item['$'];
			});

			JSPath.apply('..rowset{.@type==="role"}.row', data).forEach((row) => {

				let name = '';
				const role = {};

				row.field.forEach((field) => {

					role[field['@name']] = field['$'];

					if(field['@name'] === 'name')
					{
						name = field['$'];
					}
				});

				roleInfo[name] = role;
			});

			result.resolveWith(context || result, [data, userInfo, roleInfo, ssoInfo]);

		}, (data) => {

			result.rejectWith(context || result, [data, {AMIUser: 'guest', guestUser: 'guest'}, {}, '']);
		});

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Logout
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	logout: function(settings)
	{
		let context = null;

		if(settings && 'context' in settings)
		{
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		const result = $.Deferred();

		/*---------------------------------------------------------*/

		this.execute('GetSessionInfo -AMIUser="" -AMIPass=""', {extraParam: 'NoCert'}).then((data) => {

			const userInfo = {};
			const roleInfo = {};
			const ssoInfo = {}

			JSPath.apply('..rowset{.@type==="user"}.row.field', data).forEach((item) => {

				userInfo[item['@name']] = item['$'];
			});

			JSPath.apply('..rowset{.@type==="sso"}.row.field', data).forEach((item) => {

				ssoInfo[item['@name']] = item['$'];
			});

			JSPath.apply('..rowset{.@type==="role"}.row', data).forEach((row) => {

				let name = '';
				const role = {};

				row.field.forEach((field) => {

					role[field['@name']] = field['$'];

					if(field['@name'] === 'name')
					{
						name = field['$'];
					}
				});

				roleInfo[name] = role;
			});

			result.resolveWith(context || result, [data, userInfo, roleInfo, ssoInfo]);

		}, (data) => {

			result.rejectWith(context || result, [data, {AMIUser: 'guest', guestUser: 'guest'}, {}, '']);
		});

		/*---------------------------------------------------------*/

		return result;

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Attach a certificate
	  * @param {String} user the user
	  * @param {String} pass the password
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	attachCert: function(user, pass, settings)
	{
		return this.execute('GetSessionInfo -attachCert -amiLogin="' + this._textToString(user) + '" -amiPassword="' + this._textToString(pass) + '"', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Detach a certificate
	  * @param {String} user the user
	  * @param {String} pass the password
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	detachCert: function(user, pass, settings)
	{
		return this.execute('GetSessionInfo -detachCert -amiLogin="' + this._textToString(user) + '" -amiPassword="' + this._textToString(pass) + '"', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Add a new user
	  * @param {String} user the user
	  * @param {String} pass the password
	  * @param {String} firstName the first name
	  * @param {String} lastName the last name
	  * @param {String} email the email
	  * @param {Boolean} attach attach the current certificate
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	addUser: function(user, pass, firstName, lastName, email, attach, settings)
	{
		return this.execute('AddUser -amiLogin="' + this._textToString(user) + '" -amiPassword="' + this._textToString(pass) + '" -firstName="' + this._textToString(firstName) + '" -lastName="' + this._textToString(lastName) + '" -email="' + this._textToString(email) + '"' + (attach ? ' -attach' : ''), settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Change the account information
	  * @param {String} firstName the first name
	  * @param {String} lastName the last name
	  * @param {String} email the email
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	changeInfo: function(firstName, lastName, email, settings)
	{
		return this.execute('SetUserInfo -firstName="' + this._textToString(firstName) + '" -lastName="' + this._textToString(lastName) + '" -email="' + this._textToString(email) + '"', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Change the account password
	  * @param {String} oldPass the old password
	  * @param {String} newPass the new password
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	changePass: function(oldPass, newPass, settings)
	{
		return this.execute('ChangePassword -amiPasswordOld="' + this._textToString(oldPass) + '" -amiPasswordNew="' + this._textToString(newPass) + '"', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Reset the account password
	  * @param {String} user the user
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	resetPass: function(user, settings)
	{
		return this.execute('ResetPassword -amiLogin="' + this._textToString(user) + '"', settings);
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
