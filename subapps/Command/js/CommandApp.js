/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-![VALUE YEAR] The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 * @global saveAs
 *
 */

/*-------------------------------------------------------------------------*/
/* CommandApp                                                              */
/*-------------------------------------------------------------------------*/

$AMIClass('CommandApp', {
	/*-----------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*-----------------------------------------------------------------*/

	onReady: function(userdata)
	{
		amiWebApp.loadScripts([
			'js/3rd-party/filesaver.min.js',
		]);

		$('#ami_breadcrumb_content').html('<li>Tools</li><li><a href="' + amiWebApp.webAppURL + '?subapp=amiCommand">Command Line</a></li>');

		var result = $.Deferred();

		amiWebApp.loadHTMLs([
			'subapps/Command/twig/CommandApp.twig',
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
		if($('#6D91550F_B65E_4F0F_BE06_405DD86182EC').is(':empty') === false)
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

			amiWebApp.replaceHTML('#6D91550F_B65E_4F0F_BE06_405DD86182EC', this.fragmentCommand, {dict: dict});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data));
		});
	},

	/*-----------------------------------------------------------------*/

	onLogout: function()
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

			amiWebApp.prependHTML('#1DDA467C_F3D9_44DF_9A82_751B184BAF9E', this.fragmentResult, {dict: dict});

			amiWebApp.unlock();
		});
	},

	/*-----------------------------------------------------------------*/

	select: function(command)
	{
		$('#2B5EBBAE_AB5D_4510_BFF8_019DCB6AB820').val(command);
	},

	/*-----------------------------------------------------------------*/

	copy: function(url)
	{
		window.prompt('Copy to clipboard: Ctrl+C, Enter', url);
	},

	/*-----------------------------------------------------------------*/

	save: function(data)
	{
		var converter = $('#44761229_271E_4F0F_A708_461EF9669F77').val();

		var fileMime;
		var fileName;

		/****/ if(converter === ((((((((('')))))))))) {
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

commandApp = new CommandApp();

/*-------------------------------------------------------------------------*/
