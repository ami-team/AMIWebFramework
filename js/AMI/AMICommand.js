/*!
 * AMI Web Framework - AMICommand
 *
 * Copyright (c) 2014-2016 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
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
		return s.replace(/[\\'"]/g, function(x) {

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
		var context = null;
		var endpoint = this.endpoint;
		var converter = this.converter;
		var timeout = 0x00;
		var extraParam = null;
		var extraValue = null;

		if(settings)
		{
			if('context' in settings) {
				context = settings['context'];
			}

			if('endpoint' in settings) {
				endpoint = settings['endpoint'];
			}

			if('converter' in settings) {
				converter = settings['converter'];
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

		var URL = endpoint.trim();
		var COMMAND = command.trim();
		var CONVERTER = converter.trim();

		/*---------------------------------------------------------*/

		var data = {
			Command: COMMAND,
			Converter: CONVERTER,
		};

		if(extraParam)
		{
			data[extraParam] = extraValue ? extraValue : null;
		}

		/*---------------------------------------------------------*/

		var urlWithParameters = URL + '?' + $.param(data);

		/*---------------------------------------------------------*/

		var result = $.Deferred();

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

					var error = JSPath.apply('.AMIMessage.error', data);

					if(error.length === 0)
					{
						if(context) {
							result.resolveWith(context, [data, urlWithParameters]);
						} else {
							result.resolve(data, urlWithParameters);
						}
					}
					else
					{
						if(context) {
							result.rejectWith(context, [data, urlWithParameters]);
						} else {
							result.reject(data, urlWithParameters);
						}
					}
				},
				error: function(jqXHR, textStatus) {

					if(textStatus === 'error')
					{
						textStatus = 'Service temporarily unreachable.';
					}

					var data = {'AMIMessage': [{'error': [{'$': textStatus}]}]};

					if(context) {
						result.rejectWith(context, [data, urlWithParameters]);
					} else {
						result.reject(data, urlWithParameters);
					}
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

					if(context) {
						result.resolveWith(context, [data, urlWithParameters]);
					} else {
						result.resolve(data, urlWithParameters);
					}
				},
				error: function(jqXHR, textStatus) {

					if(textStatus === 'error')
					{
						textStatus = 'Service temporarily unreachable.';
					}

					if(context) {
						result.rejectWith(context, [textStatus, urlWithParameters]);
					} else {
						result.reject(textStatus, urlWithParameters);
					}
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
		var context = null;

		if(settings && 'context' in settings)
		{
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		this.execute('GetSessionInfo -AMIUser="' + this._textToString(user) + '" -AMIPass="' + this._textToString(pass) + '"', {extraParam: 'NoCert'}).done(function(data) {

			var userInfo = {};
			var roleInfo = {};

			JSPath.apply('..rowset{.@type==="user"}.row.field', data).forEach(function(item) {

				userInfo[item['@name']] = item['$'];
			});

			JSPath.apply('..rowset{.@type==="role"}.row', data).forEach(function(row) {

				var name = '';
				var role = {};

				row.field.forEach(function(field) {

					role[field['@name']] = field['$'];

					if(field['@name'] === 'name')
					{
						name = field['$'];
					}
				});

				roleInfo[name] = role;
			});

			if(context) {
				result.resolveWith(context, [data, userInfo, roleInfo]);
			} else {
				result.resolve(data, userInfo, roleInfo);
			}

		}).fail(function(data) {

			if(context) {
				result.rejectWith(context, [data, {AMIUser: 'guest', guestUser: 'guest'}, {}]);
			} else {
				result.reject(data, {AMIUser: 'guest', guestUser: 'guest'}, {});
			}
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
		var context = null;

		if(settings && 'context' in settings)
		{
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		this.execute('GetSessionInfo').done(function(data) {

			var userInfo = {};
			var roleInfo = {};

			JSPath.apply('..rowset{.@type==="user"}.row.field', data).forEach(function(item) {

				userInfo[item['@name']] = item['$'];
			});

			JSPath.apply('..rowset{.@type==="role"}.row', data).forEach(function(row) {

				var name = '';
				var role = {};

				row.field.forEach(function(field) {

					role[field['@name']] = field['$'];

					if(field['@name'] === 'name')
					{
						name = field['$'];
					}
				});

				roleInfo[name] = role;
			});

			if(context) {
				result.resolveWith(context, [data, userInfo, roleInfo]);
			} else {
				result.resolve(data, userInfo, roleInfo);
			}

		}).fail(function(data) {

			if(context) {
				result.rejectWith(context, [data, {AMIUser: 'guest', guestUser: 'guest'}, {}]);
			} else {
				result.reject(data, {AMIUser: 'guest', guestUser: 'guest'}, {});
			}
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
		var context = null;

		if(settings && 'context' in settings)
		{
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		this.execute('GetSessionInfo -AMIUser="" -AMIPass=""', {extraParam: 'NoCert'}).done(function(data) {

			var userInfo = {};
			var roleInfo = {};

			JSPath.apply('..rowset{.@type==="user"}.row.field', data).forEach(function(item) {

				userInfo[item['@name']] = item['$'];
			});

			JSPath.apply('..rowset{.@type==="role"}.row', data).forEach(function(row) {

				var name = '';
				var role = {};

				row.field.forEach(function(field) {

					role[field['@name']] = field['$'];

					if(field['@name'] === 'name')
					{
						name = field['$'];
					}
				});

				roleInfo[name] = role;
			});

			if(context) {
				result.resolveWith(context, [data, userInfo, roleInfo]);
			} else {
				result.resolve(data, userInfo, roleInfo);
			}

		}).fail(function(data) {

			if(context) {
				result.rejectWith(context, [data, {AMIUser: 'guest', guestUser: 'guest'}, {}]);
			} else {
				result.reject(data, {AMIUser: 'guest', guestUser: 'guest'}, {});
			}
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
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	addUser: function(user, pass, firstName, lastName, email, settings)
	{
		return this.execute('AddUser -amiLogin="' + this._textToString(user) + '" -amiPassword="' + this._textToString(pass) + '" -firstName="' + this._textToString(firstName) + '" -lastName="' + this._textToString(lastName) + '" -email="' + this._textToString(email) + '"', settings);
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
