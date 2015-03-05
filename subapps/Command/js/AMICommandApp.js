/*!
 * AMICommandApp class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

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

					amiWebApp.replaceHTML('ami_main_content', data1, {context: this}).done(function() {

						this.fragmentCommand = data2;
						this.fragmentResult = data3;

						result.resolve();
					});
				}).fail(function() {
					result.reject();
				});
			}).fail(function() {
				result.reject();
			});
		}).fail(function() {
			result.reject();
		});

		return result;
	};

	/*-----------------------------------------------------------------*/

	this.onExit = function() {
	};

	/*-----------------------------------------------------------------*/

	this.onLogin = function() {

		if($('#ami_command_list').html().trim() === '') {

			amiCommand.execute('ListCommands', {context: this}).done(function(data) {

				var rows = amiWebApp.jspath('..row', data);

				var dict = [];

				$.foreach(rows, function(index, row) {

					var command = amiWebApp.jspath('..field{.@name=== "command" }.$', row)[0] || '';
					var help = amiWebApp.jspath('..field{.@name==="help"}.$', row)[0] || amiWebApp.jspath('..field{.@name==="shortHelp"}.$', row)[0] || '';
					var usage = amiWebApp.jspath('..field{.@name==="usage"}.$', row)[0] || '';

					if(command.indexOf('AMI') === 0)
					{
						command = command.substring(3);
					}

					var proto;

					if(usage === '') {
						proto = command;
						help += '<br /><br />Usage:<br />' + command;
					} else {
						proto = command + ' ' + usage;
						help += '<br /><br />Usage:<br />' + command + ' ' + usage;
					}

					help = help.replace(new RegExp(command, 'g'), '<kbd>' + command + '</kbd>');

					help = amiWebApp.textToHtml(help);
					proto = amiWebApp.textToHtml(proto);

					dict.push({
						COMMAND: command,
						HELP: help,
						PROTO: proto,
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

	this._insertResult = function(code, url) {

		var data = '';

		var lines = code.split('\n');

		for(var i = 0; i < lines.length; i++) {

			data += '<code>' + lines[i] + '</code>\n';
		}

		var dict = {
			URL: url,
			DATA: data,
		};

		amiWebApp.prependHTML('ami_command_content', this.fragmentResult, {dict: dict});
	};

	/*-----------------------------------------------------------------*/

	this.formExecute = function() {

		amiWebApp.lock();

		var command = $('#modal_command_command').val();
		var converter = $('#modal_command_converter').val();

		amiCommand.execute(command, {context: this, converter: converter}).done(function(data, url) {

			this._insertResult(converter === 'AMIXmlToJson.xsl' ? JSON.stringify(data, undefined, 2) : amiWebApp.textToHtml(data), url);
			amiWebApp.unlock();

		}).fail(function(data, url) {

			this._insertResult(converter === 'AMIXmlToJson.xsl' ? JSON.stringify(data, undefined, 2) : amiWebApp.textToHtml(data), url);
			amiWebApp.unlock();
		});
	};

	/*-----------------------------------------------------------------*/

	this.select = function(command) {

		$('#modal_command_command').val(command);
	};

	/*-----------------------------------------------------------------*/

	this.copy = function(url) {

		window.prompt('Copy to clipboard: Ctrl+C, Enter', url);
	};

	/*-----------------------------------------------------------------*/

	this.save = function(data) {

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

		var blob = new Blob([amiWebApp.htmlToText(data)], {type: fileMime});

		saveAs(blob, fileName);
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCommandApp = new AMICommandApp();

/*-------------------------------------------------------------------------*/
