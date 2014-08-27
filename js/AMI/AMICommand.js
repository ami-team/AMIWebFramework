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

		var deferred = _internal_command_ctx[data.jsonpid].deferred;
		var context = _internal_command_ctx[data.jsonpid].context;

		delete _internal_command_ctx[data.jsonpid];

		delete data.jsonpid;

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
	}
}

/*-------------------------------------------------------------------------*/
/* CLASS AMICommand                                                        */
/*-------------------------------------------------------------------------*/

function AMICommand() {
	/*-----------------------------------------------------------------*/

	this.endPoint = '';

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

		var deferred = $.Deferred();

		var jsonpid = 'AMI_COMMAND_' + _internal_command_cnt++;

		_internal_command_ctx[jsonpid] = {
			deferred: deferred,
			context: context,
		};

		/*---------------------------------------------------------*/

		$.ajax({
			url: ENDPOINT + '?JSONP=_internal_command_callback&JSONPID=' + jsonpid + '&Command=' + COMMAND + '&Converter=' + CONVERTER,
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

				var message = { "AMIMessage" : [ { "error" : [ { "$" : "could not execute command `" + command + "`, try later" } ] } ] };

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

	this.session = function(settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

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
	};

	/*-----------------------------------------------------------------*/
 
	this.login = function(user, pass, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

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
	};

	/*-----------------------------------------------------------------*/

	this.logout = function(settings) {

		return this.login('', '', settings);
	};

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCommand = new AMICommand();

/*-------------------------------------------------------------------------*/
