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

	var jsonpid = data.jsonpid;

	var deferred = _internal_command_ctx[jsonpid].deferred;
	var context = _internal_command_ctx[jsonpid].context;

	delete data.jsonpid;

	if(context) {
		deferred.resolveWith(context, [data]);
	} else {
		deferred.resolve(data);
	}

	delete _internal_command_ctx[jsonpid];
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
			error: function(data) {

				if(data.statusText !== 'success') {

					if(context) {
						deferred.rejectWith(context, ['could not execute command `' + command + '`']);
					} else {
						deferred.reject('could not execute command `' + command + '`');
					}
				}
			},
		});

		/*---------------------------------------------------------*/

		return deferred.promise();
	};
 
	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCommand = new AMICommand();

/*-------------------------------------------------------------------------*/
