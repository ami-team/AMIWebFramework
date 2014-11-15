/*!
 * AMICommandApp class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* INTERNAL FUNCTIONS                                                      */
/*-------------------------------------------------------------------------*/

function _text_to_html(s) {
	return s.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/*-------------------------------------------------------------------------*/

function _html_to_text(s) {
	return s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

/*-------------------------------------------------------------------------*/
/* CLASS AMICommandApp                                                     */
/*-------------------------------------------------------------------------*/

function AMICommandApp() {
	/*-----------------------------------------------------------------*/

	this.onReady = function(userdata) {

		var result = $.Deferred();

		amiWebApp.loadSheets([
			'subapps/Command/css/AMICommandApp.css',
		]);

		amiWebApp.loadScripts([
			'tools/common/js/filesaver.min.js',
		]);

		$('#ami_jumbotron_title').html('Command Line');
		$('#ami_jumbotron_content').html('Execute AMI commands');
		$('#ami_breadcrumb_content').html('<li><a href="">Tools</a></li><li><a href="">Command Line</a></li>');

		amiWebApp.loadHTML('subapps/Command/html/AMICommandApp.html', {context: this}).done(function(data1) {
			amiWebApp.loadHTML('subapps/Command/html/Fragment/command.html', {context: this}).done(function(data2) {
				amiWebApp.loadHTML('subapps/Command/html/Fragment/result.html', {context: this}).done(function(data3) {

					amiWebApp.replaceHTML('ami_main_content', data1);

					this.fragmentCommand = data2;
					this.fragmentResult = data3;

					result.resolve();
				});
			});
		});

		return result;
	};

	/*-----------------------------------------------------------------*/

	this.onLogin = function() {

		if($('#ami_command_list').html().trim() === '') {

			amiCommand.execute('ListCommands', {context: this}).done(function(data) {

				var rows = amiWebApp.jspath('..row', data);

				var dict = [];

				$.each(rows, function(index, row) {

					var command = amiWebApp.jspath('..field{.@name==="command"}.$', row)[0];
					var shortHelp = amiWebApp.jspath('..field{.@name==="shortHelp"}.$', row)[0];
					var prototype = amiWebApp.jspath('..field{.@name==="prototype"}.$', row)[0];

					if(command.length > 3)
					{
						command = command.substring(3);
					}

					shortHelp = shortHelp.replace(new RegExp(command, 'g'), '<kbd>' + command + '</kbd>');

					shortHelp = shortHelp !== 'TO DO' ? _text_to_html(shortHelp) : '?????';
					prototype = prototype !== 'TO DO' ? _text_to_html(prototype) : command;

					dict.push({
						COMMAND: command,
						SHORTHELP: shortHelp,
						PROTOTYPE: prototype,
					});
				});

				amiWebApp.replaceHTML('ami_command_list', this.fragmentCommand, {dict: dict});

			}).fail(function(data) {
				amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
			});
		}
	};

	/*-----------------------------------------------------------------*/

	this.onLogout = function() {
	};

	/*-----------------------------------------------------------------*/

	this.onSessionExpired = function() {
	};

	/*-----------------------------------------------------------------*/

	this._insertResult = function(code) {

		var data = '';

		var lines = code.split('\n');

		for(var i = 0; i < lines.length; i++) {

			data += '<code>' + lines[i] + '</code>\n';
		}

		var dict = {
			DATA: data
		};

		amiWebApp.prependHTML('ami_command_content', this.fragmentResult, {dict: dict});
	};

	/*-----------------------------------------------------------------*/

	this.formExecute = function() {

		amiWebApp.lock();

		var command = $('#modal_command_command').val();
		var converter = $('#modal_command_converter').val();

		amiCommand.execute(command, {context: this, converter: converter}).done(function(data) {

			this._insertResult(converter === 'AMIXmlToJson.xsl' ? JSON.stringify(data, undefined, 2) : _text_to_html(data));
			amiWebApp.unlock();

		}).fail(function(data) {

			this._insertResult(converter === 'AMIXmlToJson.xsl' ? JSON.stringify(data, undefined, 2) : _text_to_html(data));
			amiWebApp.unlock();
		});
	};

	/*-----------------------------------------------------------------*/

	this.select = function(command) {

		$('#modal_command_command').val(command)
	};

	/*-----------------------------------------------------------------*/

	this.save = function(container) {

		var data = _html_to_text($(container).parent().find('code').html());

		var converter = $('#modal_command_converter').val();

		var fileMime;
		var fileName;

		/****/ if(converter === '') {
			fileMime = 'text/xml';
			fileName = 'result.xml';
		} else if(converter === 'AMIXmlToJson.xsl') {
			fileMime = 'application/json';
			fileName = 'result.json';
		} else if(converter === 'AMIXmlToCsv.xsl') {
			fileMime = 'text/csv';
			fileName = 'result.csv';
		} else {
			fileMime = 'text/plain';
			fileName = 'result.txt';
		}

		var blob = new Blob([data], {type: fileMime});

		saveAs(blob, fileName);
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCommandApp = new AMICommandApp();

/*-------------------------------------------------------------------------*/
