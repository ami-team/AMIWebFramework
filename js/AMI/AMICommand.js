/*
 * AMICommand class
 */

/*-------------------------------------------------------------------------*/
/* INTERNAL FUNCTIONS                                                      */
/*-------------------------------------------------------------------------*/

_internal_command_cnt = 0;

_internal_command_ctx = {};

/*-------------------------------------------------------------------------*/

function _internal_command_callback(data) {

	var JSONPID = data.jsonid;

	var deferred = _internal_command_ctx[JSONPID].deferred;
	var context = _internal_command_ctx[JSONPID].context;

	delete data.jsonid;

	if(context) {
		deferred.resolveWith(context, [data]);
	} else {
		deferred.resolve(data);
	}

	delete _internal_command_ctx[JSONPID];
}

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

		var deferred = $.Deferred();

		var ENDPOINT = this.endPoint.trim();
		var COMMAND = encodeURIComponent(command.trim());
		var CONVERTER = this.converter.trim();

		var JSONPID = 'AIM_COMMAND_' + _internal_command_cnt++;

		_internal_command_ctx[JSONPID] = {
			deferred: deferred,
			context: context,
		};

		$.ajax({
			url: ENDPOINT + '?JSONP=_internal_command_callback&JSONPID=' + JSONPID + '&Command=' + COMMAND + '&Converter=' + CONVERTER,
			type: 'POST',
			dataType: 'jsonp',
		});

		return deferred;
	};
 
	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCommand = new AMICommand();

/*-------------------------------------------------------------------------*/
