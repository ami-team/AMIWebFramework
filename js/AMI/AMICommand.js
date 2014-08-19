/*
 * AMICommand class
 */

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

		var ENDPOINT = this.endPoint.trim();
		var COMMAND = encodeURIComponent(command.trim());
		var CONVERTER = this.converter.trim();

		return $.ajax({
			url: ENDPOINT + '?Command=' + COMMAND + '&Converter=' + CONVERTER,
			type: 'POST',
			dataType: 'json',
			context: context,

		}).fail(function(data){
			throw 'Could not execute `' + command + '`';
		});
	};
 
	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCommand = new AMICommand();

/*-------------------------------------------------------------------------*/
