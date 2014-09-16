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
	/* GET DEFERRED & CONTEXT & TIMER                                  */
	/*-----------------------------------------------------------------*/

	var deferred = _internal_command_ctx[data.jsonpid].deferred;
	var context = _internal_command_ctx[data.jsonpid].context;
	var timer = _internal_command_ctx[data.jsonpid].timer;

	/*-----------------------------------------------------------------*/
	/* DELETE TIMER                                                    */
	/*-----------------------------------------------------------------*/

	clearTimeout(timer);

	/*-----------------------------------------------------------------*/
	/* DELETE COMMAND CONTEXT                                          */
	/*-----------------------------------------------------------------*/

	delete _internal_command_ctx[data.jsonpid];

	/*-----------------------------------------------------------------*/
	/* GET RESULT                                                      */
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

function AMICommand() {
	/*-----------------------------------------------------------------*/

	this.noCert = false;

	/*-----------------------------------------------------------------*/

	this.endPoint = 'http://xx.yy';
	this.converter = 'AMIXmlToJson.xsl';

	/*-----------------------------------------------------------------*/

	this.execute = function(command, settings) {

		var context = undefined;
		var no_check = ((false));

		var endpoint = this.endPoint;
		var converter = this.converter;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}

			if('no_check' in settings) {
				no_check = settings['no_check'];
			}

			if('endpoint' in settings) {
				endpoint = settings['endpoint'];
			}

			if('converter' in settings) {
				converter = settings['converter'];
			}
		}

		/*---------------------------------------------------------*/

		var deferred = $.Deferred();

		/*---------------------------------------------------------*/

		if(no_check || amiCookie.get('AMI_SESSION') == 'ACTIVE') {
			/*-------------------------------------------------*/

			var ENDPOINT = endpoint.trim();
			var COMMAND = encodeURIComponent(command.trim());
			var CONVERTER = converter.trim();

			/*-------------------------------------------------*/

			var jsonpid = 'AMI_COMMAND_' + _internal_command_cnt++;

			var INJECTION = encodeURIComponent('"jsonpid": "' + jsonpid + '"');

			/*-------------------------------------------------*/

			timer = setTimeout(function() {

				delete _internal_command_ctx[jsonpid];

				var message = {"AMIMessage": [{"error": [{"$": "Time out for command `" + command + "`."}]}]};

				if(context) {
					deferred.rejectWith(context, message);
				} else {
					deferred.reject(message);
				}

			}, 30000);

			/*-------------------------------------------------*/

			_internal_command_ctx[jsonpid] = {
				deferred: deferred,
				context: context,
				timer: timer,
			};

			/*-------------------------------------------------*/

			var url = ENDPOINT + '?Callback=_internal_command_callback&Injection=' + INJECTION + '&Command=' + COMMAND + '&Converter=' + CONVERTER;

			if(this.noCert) {
				url += '&NoCert';
			}

			/*-------------------------------------------------*/

			$.ajax({
				url: url,
				type: 'POST',
				cache: false,
				jsonp: false,
				dataType: 'jsonp',
				crossDomain: true,
			});

			/*-------------------------------------------------*/

			amiCookie.set('AMI_SESSION', 'ACTIVE', {seconds: 25 * 60});

			/*-------------------------------------------------*/
		} else {
			/*-------------------------------------------------*/

			var message = {"AMIMessage": [{"error": [{"$": "Session expired."}]}]};

			if(context) {
				deferred.rejectWith(context, message);
			} else {
				deferred.reject(message);
			}

			/*-------------------------------------------------*/

			amiWebApp.onSessionExpired();

			/*-------------------------------------------------*/
		}

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

		this.execute('GetSessionInfo -AMIUser="' + user + '" -AMIPass="' + pass + '"', {no_check: true}).done(function(data) {

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

		this.execute('GetSessionInfo', {no_check: true}).done(function(data) {

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

		this.execute('GetSessionInfo -AMIUser="" -AMIPass=""', {no_check: true}).done(function(data) {

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

		return this.execute('GetSessionInfo -AMIUser="' + user + '" -AMIPass="' + pass + '" -attachCert', {context: context, no_check: true});

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

		return this.execute('GetSessionInfo -AMIUser="' + user + '" -AMIPass="' + pass + '" -detachCert', {context: context, no_check: true});

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
