/*!
 * AMICommand class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* INTERNAL VARIABLES                                                      */
/*-------------------------------------------------------------------------*/

var _internal_command_cnt = 0;

var _internal_command_ctx = {};

/*-------------------------------------------------------------------------*/
/* INTERNAL FUNCTIONS                                                      */
/*-------------------------------------------------------------------------*/

function _internal_command_callback(data) {
	/*-----------------------------------------------------------------*/

	var deferred = _internal_command_ctx[data.jsonpid].deferred;
	var context = _internal_command_ctx[data.jsonpid].context;
	var timer = _internal_command_ctx[data.jsonpid].timer;

	/*-----------------------------------------------------------------*/

	clearTimeout(timer);

	/*-----------------------------------------------------------------*/

	delete _internal_command_ctx[data.jsonpid];

	/*-----------------------------------------------------------------*/

	var error = amiWebApp.jspath('..error', data);

	if(error.length == 0) {

		if(context) {
			deferred.resolveWith(context, [data]);
		} else {
			deferred.resolve(data);
		}
	} else {

		if(context) {
			deferred.rejectWith(context, [data]);
		} else {
			deferred.reject(data);
		}
	}

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* CLASS AMICommand                                                        */
/*-------------------------------------------------------------------------*/

var COMMAND_FLAGS_ALWAYS = 64
var COMMAND_FLAGS_LOGOUT = 65

/*-------------------------------------------------------------------------*/

function AMICommand() {
	/*-----------------------------------------------------------------*/

	this.noCert = false;

	/*-----------------------------------------------------------------*/

	this.timeout = 30000;

	/*-----------------------------------------------------------------*/

	this.endPoint = 'http://xx.yy';
	this.converter = 'AMIXmlToJson.xsl';

	/*-----------------------------------------------------------------*/

	this.execute = function(command, settings) {

		var flags = 0x00;
		var context = undefined;
		var endpoint = this.endPoint;
		var converter = this.converter;

		if(settings) {

			if('flags' in settings) {
				flags = settings['flags'];
			}

			if('context' in settings) {
				context = settings['context'];
			}

			if('endpoint' in settings) {
				endpoint = settings['endpoint'];
			}

			if('converter' in settings) {
				converter = settings['converter'];
			}
		}

		/*---------------------------------------------------------*/

		/**/ if(flags == 0x000000000000000000) {

			if(amiCookie.get('AMI_SESSION') != 'ACTIVE') {
				amiWebApp.replaceHTML('ami_login_content', amiLogin.fragmentLoginButton);

				amiWebApp.onSessionExpired();
			} else {
				amiCookie.set('AMI_SESSION', 'ACTIVE', {minutes: 25});
			}
		}
		else if(flags == COMMAND_FLAGS_ALWAYS) {
			amiCookie.set('AMI_SESSION', 'ACTIVE', {minutes: 25});
		}
		else if(flags == COMMAND_FLAGS_LOGOUT) {
			amiCookie.del('AMI_SESSION');
		}

		/*---------------------------------------------------------*/

		var deferred = $.Deferred();

		/*---------------------------------------------------------*/

		var jsonpid = 'AMI_COMMAND_' + _internal_command_cnt++;

		/*---------------------------------------------------------*/

		_internal_command_ctx[jsonpid] = {
			deferred: deferred,
			context: context,
			timer: setTimeout(function() {

				delete _internal_command_ctx[jsonpid];

				var message = {"AMIMessage": [{"error": [{"$": "Time out for command `" + command + "`."}]}]};

				if(context) {
					deferred.rejectWith(context, message);
				} else {
					deferred.reject(message);
				}

			}, this.timeout)
		};

		/*---------------------------------------------------------*/

		var INJECTION = encodeURIComponent('"jsonpid": "' + jsonpid + '"');

		/*---------------------------------------------------------*/

		var ENDPOINT = endpoint.trim();
		var COMMAND = encodeURIComponent(command.trim());
		var CONVERTER = converter.trim();

		/*---------------------------------------------------------*/

		var url = ENDPOINT + '?Callback=_internal_command_callback&Injection=' + INJECTION + '&Command=' + COMMAND + '&Converter=' + CONVERTER;

		if(this.noCert) {
			url += '&NoCert';
		}

		/*---------------------------------------------------------*/

		$.ajax({
			url: url,
			type: 'POST',
			cache: false,
			jsonp: false,
			dataType: 'jsonp',
			crossDomain: true,
		});

		/*---------------------------------------------------------*/

		return deferred.promise();

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.passLogin = function(user, pass, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		this.noCert = true;

		this.execute('GetSessionInfo -AMIUser="' + user + '" -AMIPass="' + pass + '"', {flags: COMMAND_FLAGS_ALWAYS}).done(function(data) {

			var user = amiWebApp.jspath('..field{.@name==="amiLogin"}.$', data)[0];

			if(context) {
				result.resolveWith(context, [data, user]);
			} else {
				result.resolve(data, user);
			}
		}).fail(function(data) {

			if(context) {
				result.rejectWith(context, [data]);
			} else {
				result.reject(data);
			}
		});

		/*---------------------------------------------------------*/

		return result;

		/*---------------------------------------------------------*/
	}

	/*-----------------------------------------------------------------*/

 	this.certLogin = function(settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		this.noCert = false;

		this.execute('GetSessionInfo', {flags: COMMAND_FLAGS_ALWAYS}).done(function(data) {

			var user = amiWebApp.jspath('..field{.@name==="amiLogin"}.$', data)[0];

			if(context) {
				result.resolveWith(context, [data, user]);
			} else {
				result.resolve(data, user);
			}
		}).fail(function(data) {

			if(context) {
				result.rejectWith(context, [data]);
			} else {
				result.reject(data);
			}
		});

		/*---------------------------------------------------------*/

		return result;

		/*---------------------------------------------------------*/
	}

	/*-----------------------------------------------------------------*/

	this.logout = function(settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		this.noCert = true;

		this.execute('GetSessionInfo -AMIUser="" -AMIPass=""', {flags: COMMAND_FLAGS_LOGOUT}).done(function(data) {

			var user = amiWebApp.jspath('..field{.@name==="amiLogin"}.$', data)[0];

			if(context) {
				result.resolveWith(context, [data, user]);
			} else {
				result.resolve(data, user);
			}
		}).fail(function(data) {

			if(context) {
				result.rejectWith(context, [data]);
			} else {
				result.reject(data);
			}
		});

		/*---------------------------------------------------------*/

		return result;

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.attachCert = function(user, pass, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		return this.execute('GetSessionInfo -attachCert -amiLogin="' + user + '" -amiPassword="' + pass + '"', {flags: COMMAND_FLAGS_ALWAYS, context: context});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.detachCert = function(user, pass, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		return this.execute('GetSessionInfo -detachCert -amiLogin="' + user + '" -amiPassword="' + pass + '"', {flags: COMMAND_FLAGS_ALWAYS, context: context});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.addUser = function(firstName, lastName, email, user, pass, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		return this.execute('AddUser -firstName="' + firstName + '"-lastName="' + lastName + '" -email="' + email + '" -amiLogin="' + user + '" -amiPassword="' + pass + '"', {context: context});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.changeInfo = function(firstName, lastName, email, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		return this.execute('SetUserInfo -firstName="' + firstName + '" -lastName="' + lastName + '" -email="' + email + '"', {context: context});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.changePass = function(old_pass, new_pass, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		return this.execute('ChangePassword -amiPasswordOld="' + old_pass + '" -amiPasswordNew="' + new_pass + '"', {context: context});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.resetPass = function(user, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		return this.execute('ResetPassword -amiLogin="' + user + '"', {context: context});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCommand = new AMICommand();

/*-------------------------------------------------------------------------*/
