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

_internal_command_cnt = 0;

_internal_command_ctx = {};

/*-------------------------------------------------------------------------*/
/* INTERNAL FUNCTIONS                                                      */
/*-------------------------------------------------------------------------*/

function _internal_command_callback(data) {

	if(data.jsonpid in _internal_command_ctx) {
		/*---------------------------------------------------------*/
		/* GET DEFERRED & CONTEXT                                  */
		/*---------------------------------------------------------*/

		var deferred = _internal_command_ctx[data.jsonpid].deferred;
		var context = _internal_command_ctx[data.jsonpid].context;

		delete _internal_command_ctx[data.jsonpid];

		delete data.jsonpid;

		/*---------------------------------------------------------*/
		/* GET RESULT                                              */
		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/
	}
}

/*-------------------------------------------------------------------------*/
/* CLASS AMICommand                                                        */
/*-------------------------------------------------------------------------*/

function AMICommand() {
	/*-----------------------------------------------------------------*/

	this.noCert = false;

	/*-----------------------------------------------------------------*/

	this.endPoint = 'http://xxx.yy';

	/*-----------------------------------------------------------------*/

	this.converter = 'AMIXmlToJson.xsl';

	/*-----------------------------------------------------------------*/

	this.execute = function(command, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		var ENDPOINT = this.endPoint.trim();
		var COMMAND = encodeURIComponent(command.trim());
		var CONVERTER = this.converter.trim();

		/*---------------------------------------------------------*/

		var jsonpid = 'AMI_COMMAND_' + _internal_command_cnt++;

		var INJECTION = encodeURIComponent('"jsonpid": "' + jsonpid + '"');

		/*---------------------------------------------------------*/

		var deferred = $.Deferred();

		_internal_command_ctx[jsonpid] = {
			deferred: deferred,
			context: context,
		};

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
			dataType: 'jsonp',
			crossDomain: true,
		});

		/*---------------------------------------------------------*/

		setTimeout(function() {

			if(jsonpid in _internal_command_ctx)
			{
				delete _internal_command_ctx[jsonpid];

				var message = {"AMIMessage": [{"error": [{"$": "could not execute command `" + command + "`, try later"}]}]};

				if(context) {
					deferred.rejectWith(context, message);
				} else {
					deferred.reject(message);
				}
			}

		}, 30000);

		/*---------------------------------------------------------*/

		return deferred.promise();
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

		amiCommand.execute('GetSessionUser -AMIUser="' + user + '" -AMIPass="' + pass + '"').done(function(data) {

			var login_list = amiWebApp.jspath('..field{.@name==="amiUser"}.$', data);

			var login = login_list.length > 0 ? login_list[0] : '';

			if(context) {
				result.resolveWith(context, [data, login]);
			} else {
				result.resolve(data, login);
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

		amiCommand.execute('GetSessionUser').done(function(data) {

			var login_list = amiWebApp.jspath('..field{.@name==="amiUser"}.$', data);

			var login = login_list.length > 0 ? login_list[0] : '';

			if(context) {
				result.resolveWith(context, [data, login]);
			} else {
				result.resolve(data, login);
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

		amiCommand.execute('GetSessionUser -AMIUser="" -AMIPass=""').done(function(data) {

			var login_list = amiWebApp.jspath('..field{.@name==="amiUser"}.$', data);

			var login = login_list.length > 0 ? login_list[0] : '';

			if(context) {
				result.resolveWith(context, [data, login]);
			} else {
				result.resolve(data, login);
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
	};

	/*-----------------------------------------------------------------*/

	this.addUser = function(firstName, lastName, user, mail, pass1, pass2, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		return amiCommand.execute('AddUser -firstName="' + firstName + '"-lastName="' + lastName + '" -amiLogin="' + user + '" -mail="' + mail + '" -amiPasswordxpassx=' + pass1 + '" -amiPasswordxconfirmx' + pass2 + '"', {context: context});
	};

	/*-----------------------------------------------------------------*/

	this.remindPass = function(user, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		return amiCommand.execute('RemindPassword -amiLogin="' + user + '"', {context: context});
	};

	/*-----------------------------------------------------------------*/

	this.changePass = function(user, old_pass, new_pass, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		return amiCommand.execute('ChangeLoginPassword -amiLogin="' + user + '" -amiOldPassword="' + old_pass + '" -amiNewPassword="' + new_pass + '"', {context: context});
	};

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCommand = new AMICommand();

/*-------------------------------------------------------------------------*/
