/*!
 * amiCommand
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* INTERNAL VARIABLES                                                      */
/*-------------------------------------------------------------------------*/

var _ami_internal_base64KeyStr =
	'ABCDEFGHIJKLMNOP' +
	'QRSTUVWXYZabcdef' +
	'ghijklmnopqrstuv' +
	'wxyz0123456789+/' +
	'='
;

/*-------------------------------------------------------------------------*/
/* INTERNAL FUNCTIONS                                                      */
/*-------------------------------------------------------------------------*/

function _ami_internal_textToString(s) {

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

var amiCommand = {
	/*-----------------------------------------------------------------*/

	/**
	  * Decode a base64 string
	  * @param {string} s the base64 string
	  * @returns The decoded string
	  */

	amiBase64Decode: function(s) {

		var i = 0;
		var result = '';
		var chr1, chr2, chr3 = '';
		var enc1, enc2, enc3, enc4 = '';

		s = s.replace(/[^A-Za-z0-9\+\/\=]/g, '');

		do {
			enc1 = _ami_internal_base64KeyStr.indexOf(s.charAt(i++));
			enc2 = _ami_internal_base64KeyStr.indexOf(s.charAt(i++));
			enc3 = _ami_internal_base64KeyStr.indexOf(s.charAt(i++));
			enc4 = _ami_internal_base64KeyStr.indexOf(s.charAt(i++));

			chr1 = ((enc1 & 255) << 2) | (enc2 >> 4);
			chr2 = ((enc2 &  15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 &   3) << 6) | (enc4 >> 0);

			result = result + String.fromCharCode(chr1);

			if(enc3 != 64) {
				result = result + String.fromCharCode(chr2);
			}

			if(enc4 != 64) {
				result = result + String.fromCharCode(chr3);
			}

			chr1 = chr2 = chr3 = '';
			enc1 = enc2 = enc3 = enc4 = '';

		} while(i < s.length);

		return unescape(result);
	},

	/*-----------------------------------------------------------------*/

	endpoint: 'http://xxyy.zz',
	converter: 'AMIXmlToJson.xsl',

	/*-----------------------------------------------------------------*/

	/**
	  * Execute an AMI command
	  * @param {string} command the command
	  * @param {object} [settings] dictionary of settings (context, endpoint, converter, extraParam, extraValue)
	  * @returns A JQuery deferred object
	  */

	execute: function(command, settings) {

		var context = null;
		var endpoint = amiCommand.endpoint;
		var converter = amiCommand.converter;
		var extraParam = null;
		var extraValue = null;

		if(settings) {

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
		}

		/*---------------------------------------------------------*/

		if(extraParam) {

			if(extraValue) {
				data[extraParam] = extraValue;
			} else {
				data[extraParam] = (((null)));
			}
		}

		/*---------------------------------------------------------*/

		var urlWithParameters = URL + '?' + $.param(data);

		/*---------------------------------------------------------*/

		var deferred = $.Deferred();

		/*---------------------------------------------------------*/

		if(CONVERTER === 'AMIXmlToJson.xsl') {
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

					if(error.length === 0) {

						if(context) {
							deferred.resolveWith(context, [data, urlWithParameters]);
						} else {
							deferred.resolve(data, urlWithParameters);
						}
					} else {

						if(context) {
							deferred.rejectWith(context, [data, urlWithParameters]);
						} else {
							deferred.reject(data, urlWithParameters);
						}
					}
				},
				error: function(jqXHR, textStatus) {

					if(textStatus === 'error') {
						textStatus = 'broken connection';
					}

					var data = {'AMIMessage': [{'error': [{'$': textStatus}]}]};

					if(context) {
						deferred.rejectWith(context, [data, urlWithParameters]);
					} else {
						deferred.reject(data, urlWithParameters);
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
						deferred.resolveWith(context, [data, urlWithParameters]);
					} else {
						deferred.resolve(data, urlWithParameters);
					}
				},
				error: function(jqXHR, textStatus) {

					if(textStatus === 'error') {
						textStatus = 'broken connection';
					}

					if(context) {
						deferred.rejectWith(context, [textStatus, urlWithParameters]);
					} else {
						deferred.reject(textStatus, urlWithParameters);
					}
				},
			});

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/

		return deferred.promise();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Login by login/password
	  * @param {string} user the user
	  * @param {string} pass the password
	  * @param {object} [settings] dictionary of settings (context)
	  * @returns A JQuery deferred object
	  */

	passLogin: function(user, pass, settings) {

		var context = null;

		if(settings && 'context' in settings) {
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		amiCommand.execute('GetSessionInfo -AMIUser="' + _ami_internal_textToString(user) + '" -AMIPass="' + _ami_internal_textToString(pass) + '"', {extraParam: 'NoCert'}).done(function(data) {

			var user = JSPath.apply('..field{.@name==="AMIUser"}.$', data)[0];
			var guest = JSPath.apply('..field{.@name==="guestUser"}.$', data)[0];

			if(context) {
				result.resolveWith(context, [data, user, guest]);
			} else {
				result.resolve(data, user, guest);
			}

		}).fail(function(data) {

			if(context) {
				result.rejectWith(context, [data, 'guest', 'guest']);
			} else {
				result.reject(data, 'guest', 'guest');
			}
		});

		/*---------------------------------------------------------*/

		return result;

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Login by certificate
	  * @param {object} [settings] dictionary of settings (context)
	  * @returns A JQuery deferred object
	  */

	certLogin: function(settings) {

		var context = null;

		if(settings && 'context' in settings) {
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		amiCommand.execute('GetSessionInfo').done(function(data) {

			var user = JSPath.apply('..field{.@name==="AMIUser"}.$', data)[0];
			var guest = JSPath.apply('..field{.@name==="guestUser"}.$', data)[0];

			if(context) {
				result.resolveWith(context, [data, user, guest]);
			} else {
				result.resolve(data, user, guest);
			}

		}).fail(function(data) {

			if(context) {
				result.rejectWith(context, [data, 'guest', 'guest']);
			} else {
				result.reject(data, 'guest', 'guest');
			}
		});

		/*---------------------------------------------------------*/

		return result;

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Logout
	  * @param {object} [settings] dictionary of settings (context)
	  * @returns A JQuery deferred object
	  */

	logout: function(settings) {

		var context = null;

		if(settings && 'context' in settings) {
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		amiCommand.execute('GetSessionInfo -AMIUser="" -AMIPass=""', {extraParam: 'NoCert'}).done(function(data) {

			var user = JSPath.apply('..field{.@name==="AMIUser"}.$', data)[0];
			var guest = JSPath.apply('..field{.@name==="guestUser"}.$', data)[0];

			if(context) {
				result.resolveWith(context, [data, user, guest]);
			} else {
				result.resolve(data, user, guest);
			}

		}).fail(function(data) {

			if(context) {
				result.rejectWith(context, [data, 'guest', 'guest']);
			} else {
				result.reject(data, 'guest', 'guest');
			}
		});

		/*---------------------------------------------------------*/

		return result;

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Attach a certificate
	  * @param {string} user the user
	  * @param {string} pass the password
	  * @param {object} [settings] dictionary of settings (context)
	  * @returns A JQuery deferred object
	  */

	attachCert: function(user, pass, settings) {

		return amiCommand.execute('GetSessionInfo -attachCert -amiLogin="' + _ami_internal_textToString(user) + '" -amiPassword="' + _ami_internal_textToString(pass) + '"', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Detach a certificate
	  * @param {string} user the user
	  * @param {string} pass the password
	  * @param {object} [settings] dictionary of settings (context)
	  * @returns A JQuery deferred object
	  */

	detachCert: function(user, pass, settings) {

		return amiCommand.execute('GetSessionInfo -detachCert -amiLogin="' + _ami_internal_textToString(user) + '" -amiPassword="' + _ami_internal_textToString(pass) + '"', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Add a new user
	  * @param {string} user the user
	  * @param {string} pass the password
	  * @param {string} firstName the first name
	  * @param {string} lastName the last name
	  * @param {string} email the email
	  * @param {object} [settings] dictionary of settings (context)
	  * @returns A JQuery deferred object
	  */

	addUser: function(user, pass, firstName, lastName, email, settings) {

		return amiCommand.execute('AddUser -amiLogin="' + _ami_internal_textToString(user) + '" -amiPassword="' + _ami_internal_textToString(pass) + '" -firstName="' + _ami_internal_textToString(firstName) + '"-lastName="' + _ami_internal_textToString(lastName) + '" -email="' + _ami_internal_textToString(email) + '"', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Change the account information
	  * @param {string} firstName the first name
	  * @param {string} lastName the last name
	  * @param {string} email the email
	  * @param {object} [settings] dictionary of settings (context)
	  * @returns A JQuery deferred object
	  */

	changeInfo: function(firstName, lastName, email, settings) {

		return amiCommand.execute('SetUserInfo -firstName="' + _ami_internal_textToString(firstName) + '" -lastName="' + _ami_internal_textToString(lastName) + '" -email="' + _ami_internal_textToString(email) + '"', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Change the account information
	  * @param {string} old_pass the old password
	  * @param {string} new_pass the new password
	  * @param {object} [settings] dictionary of settings (context)
	  * @returns A JQuery deferred object
	  */

	changePass: function(old_pass, new_pass, settings) {

		return amiCommand.execute('ChangePassword -amiPasswordOld="' + _ami_internal_textToString(old_pass) + '" -amiPasswordNew="' + _ami_internal_textToString(new_pass) + '"', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Reset the account password
	  * @param {string} user the user
	  * @param {object} [settings] dictionary of settings (context)
	  * @returns A JQuery deferred object
	  */

	resetPass: function(user, settings) {

		return amiCommand.execute('ResetPassword -amiLogin="' + _ami_internal_textToString(user) + '"', settings);
	},

	/*-----------------------------------------------------------------*/

	checkAuthorization: function(clazz, arguments, settings) {

		var command = 'CheckAuthorization -roleValidatorClass="' + clazz + '"';

		for(var argument in arguments) {
			command += '-' + argument + '="' + arguments[argument] + '"';
		}

		return amiCommand.execute(command, settings);
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
