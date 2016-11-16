/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 * @global saveAs
 *
 */

/*-------------------------------------------------------------------------*/
/* AMICommandApp                                                           */
/*-------------------------------------------------------------------------*/

$AMIClass('AMICommandApp', {
	/*-----------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*-----------------------------------------------------------------*/

	onReady: function(userdata)
	{
		amiWebApp.loadSheets([
			'subapps/Command/css/AMICommandApp.css',
		]);

		amiWebApp.loadScripts([
			'js/3rd-party/filesaver.min.js',
		]);

		$('#ami_jumbotron_title').html('Command Line');
		$('#ami_jumbotron_content').html('Execute AMI commands');
		$('#ami_breadcrumb_content').html('<li>Tools</li><li><a href="' + amiWebApp.webAppURL + '?subapp=amicommand">Command Line</a></li>');

		var result = $.Deferred();

		amiWebApp.loadHTMLs([
			'subapps/Command/twig/AMICommandApp.twig',
			'subapps/Command/twig/Fragment/command.twig',
			'subapps/Command/twig/Fragment/result.twig',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this, dict: {command: userdata}}).done(function() {

				this.fragmentCommand = data[1];
				this.fragmentResult = data[2];

				result.resolve();
			});

		}).fail(function() {

			result.reject();
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	onExit: function()
	{
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
		if($('#ami_command_list').is(':empty') === false)
		{
			return;
		}

		amiCommand.execute('ListCommands', {context: this}).done(function(data)
		{
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

				if(!usage) {
					proto = command;
					help += '<br /><br />Usage:<br />' + command;
				} else {
					proto = command + ' ' + usage;
					help += '<br /><br />Usage:<br />' + command + ' ' + usage;
				}

				help = help.replace(new RegExp(command, 'g'), '<kbd>' + command + '</kbd>');

				dict.push({
					COMMAND: command,
					HELP: help,
					PROTO: proto,
				});
			});

			amiWebApp.replaceHTML('#ami_command_list', this.fragmentCommand, {dict: dict});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	},

	/*-----------------------------------------------------------------*/

	onLogout: function()
	{
	},

	/*-----------------------------------------------------------------*/

	onSessionExpired: function()
	{
	},

	/*-----------------------------------------------------------------*/

	execute: function(command, converter)
	{
		amiWebApp.lock();

		amiCommand.execute(command, {context: this, converter: converter}).always(function(data, url) {

			data = (converter === 'AMIXmlToJson.xsl') ? JSON.stringify(data, undefined, 2)
			                                          : data
			;

			var dict = {
				DATA: data,
				URL: url,
			};

			amiWebApp.prependHTML('#ami_command_content', this.fragmentResult, {dict: dict});

			amiWebApp.unlock();
		});
	},

	/*-----------------------------------------------------------------*/

	select: function(command)
	{
		$('#modal_command_command').val(command);
	},

	/*-----------------------------------------------------------------*/

	copy: function(url)
	{
		window.prompt('Copy to clipboard: Ctrl+C, Enter', url);
	},

	/*-----------------------------------------------------------------*/

	save: function(data)
	{
		var converter = $('#modal_command_converter').val();

		var fileMime;
		var fileName;

		/****/ if(converter === ((((((((''))))))))) {
			fileMime = 'application/xml';
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
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCommandApp = new AMICommandApp();

amiRegisterSubApp('amiCommand', amiCommandApp, {});

/*-------------------------------------------------------------------------*/
