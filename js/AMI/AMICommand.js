/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-2016 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* INTERNAL FUNCTIONS                                                      */
/*-------------------------------------------------------------------------*/

function _ami_internal_textToString(s)
{
	return s.replace(/[\\'"]/g, function(x) {

		return '\\' + x;
	});
}

/*-------------------------------------------------------------------------*/
/* amiCommand                                                              */
/*-------------------------------------------------------------------------*/

/**
 * The AMI command subsystem
 * @namespace amiCommand
 */

$AMINamespace('amiCommand', /** @lends amiCommand */ {
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
						textStatus = 'service temporarily unavailable';
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
						textStatus = 'service temporarily unavailable';
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

		this.execute('GetSessionInfo -AMIUser="' + _ami_internal_textToString(user) + '" -AMIPass="' + _ami_internal_textToString(pass) + '"', {extraParam: 'NoCert'}).done(function(data) {

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
		return this.execute('GetSessionInfo -attachCert -amiLogin="' + _ami_internal_textToString(user) + '" -amiPassword="' + _ami_internal_textToString(pass) + '"', settings);
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
		return this.execute('GetSessionInfo -detachCert -amiLogin="' + _ami_internal_textToString(user) + '" -amiPassword="' + _ami_internal_textToString(pass) + '"', settings);
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
		return this.execute('AddUser -amiLogin="' + _ami_internal_textToString(user) + '" -amiPassword="' + _ami_internal_textToString(pass) + '" -firstName="' + _ami_internal_textToString(firstName) + '"-lastName="' + _ami_internal_textToString(lastName) + '" -email="' + _ami_internal_textToString(email) + '"', settings);
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
		return this.execute('SetUserInfo -firstName="' + _ami_internal_textToString(firstName) + '" -lastName="' + _ami_internal_textToString(lastName) + '" -email="' + _ami_internal_textToString(email) + '"', settings);
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
		return this.execute('ChangePassword -amiPasswordOld="' + _ami_internal_textToString(oldPass) + '" -amiPasswordNew="' + _ami_internal_textToString(newPass) + '"', settings);
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
		return this.execute('ResetPassword -amiLogin="' + _ami_internal_textToString(user) + '"', settings);
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
