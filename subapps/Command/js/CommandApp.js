/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-ongoing The AMI Team
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
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
		/*---------------------------------------------------------*/

		amiWebApp.loadScripts([
			'js/3rd-party/filesaver.min.js',
		]);

		/*---------------------------------------------------------*/

		$('#ami_breadcrumb_content').html('<li>Tools</li><li><a href="' + amiWebApp.webAppURL + '?subapp=command">Command</a></li>');

		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	onExit: function()
	{
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
		if($('#D847C44B_D28F_49B3_AF79_7A68B3305ED2').is(':empty') === false)
		{
			return;
		}

		/*---------------------------------------------------------*/

		amiCommand.execute('ListCommands', {context: this}).done(function(data)
		{
			var rows = amiWebApp.jspath('..row', data);

			var dict = [];

			$.foreach(rows, function(index, row) {

				var command = amiWebApp.jspath('..field{.@name=== "command" }.$', row)[0] || '';
				var help = amiWebApp.jspath('..field{.@name==="help" || .@name==="shortHelp"}.$', row)[0] || '';
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
					command: command,
					help: help,
					proto: proto,
				});
			});

			amiWebApp.replaceHTML('#D847C44B_D28F_49B3_AF79_7A68B3305ED2', this.fragmentCommand, {dict: dict});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data));
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	onLogout: function()
	{
	},

	/*-----------------------------------------------------------------*/

	execute: function()
	{
		/*---------------------------------------------------------*/

		var command = $('#CE9A50CD_63CA_4A1E_B336_F45399BEC84D').val();
		var converter = $('#C8D10895_E8A7_46A0_B638_C8DDDED8F91C').val();

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.execute(command, {context: this, converter: converter}).always(function(data, url) {

			data = (converter === 'AMIXmlToJson.xsl') ? JSON.stringify(data, undefined, 2)
			                                          : data
			;

			var dict = {
				data: data,
				url: url,
			};

			amiWebApp.prependHTML('#AB4BA483_EE27_44D0_BB54_F5BFCFE4DA7E', this.fragmentResult, {dict: dict});

			amiWebApp.unlock();
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	select: function(command)
	{
		$('#CE9A50CD_63CA_4A1E_B336_F45399BEC84D').val(command);
	},

	/*-----------------------------------------------------------------*/

	copy: function(url)
	{
		window.prompt('Copy to clipboard: Ctrl+C, Enter', url);
	},

	/*-----------------------------------------------------------------*/

	save: function(data)
	{
		/*---------------------------------------------------------*/

		var converter = $('#C8D10895_E8A7_46A0_B638_C8DDDED8F91C').val();

		/*---------------------------------------------------------*/

		var fileMime;
		var fileName;

		/**/ if(converter === (((((((('')))))))))
		{
			fileMime = 'application/xml';
			fileName = 'result.xml';
		}
		else if(converter === 'AMIXmlToJson.xsl')
		{
			fileMime = 'application/json';
			fileName = 'result.json';
		}
		else if(converter === 'AMIXmlToCsv.xsl')
		{
			fileMime = 'text/csv';
			fileName = 'result.csv';
		}
		else
		{
			fileMime = 'text/plain';
			fileName = 'result.txt';
		}

		/*---------------------------------------------------------*/

		saveAs(new Blob([amiWebApp.htmlToText(data)], {type: fileMime}), fileName);

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

commandApp = new CommandApp();

/*-------------------------------------------------------------------------*/
