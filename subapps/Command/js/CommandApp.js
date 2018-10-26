/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global saveAs
 *
 */

/*-------------------------------------------------------------------------*/

$AMIClass('CommandApp', {
	/*-----------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*-----------------------------------------------------------------*/

	onReady: function(userdata)
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/Command/twig/CommandApp.twig',
			'subapps/Command/twig/command.twig',
			'subapps/Command/twig/result.twig',
			'js/3rd-party/filesaver.min.js',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this, dict: {command: userdata}}).done(function() {

				this.fragmentCommand = data[1];
				this.fragmentResult = data[2];

				result.resolve();
			});

		}).fail(function(data) {

			result.reject(data);
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
		amiCommand.execute('ListCommands', {context: this}).done(function(data)
		{
			var rows = amiWebApp.jspath('..row', data);

			var dict = [];

			rows.forEach(function(row) {

				var command = amiWebApp.jspath('..field{.@name==="command"}.$', row)[0] || '';

				var visible = (amiWebApp.jspath('..field{.@name==="visible"}.$', row)[0] || 'true') !== 'false';
				var secured = (amiWebApp.jspath('..field{.@name==="secured"}.$', row)[0] || 'false') !== 'false';

				var help = amiWebApp.jspath('..field{.@name==="help" || .@name==="shortHelp"}.$', row)[0] || ''; // BERK
				var usage = amiWebApp.jspath('..field{.@name==="usage"}.$', row)[0] || '';

				if(visible || amiLogin.hasRole('AMI_ADMIN'))
				{
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
						secured: secured,
						help: help,
						proto: proto,
					});
				}
			});

			amiWebApp.replaceHTML('#D847C44B_D28F_49B3_AF79_7A68B3305ED2', this.fragmentCommand, {dict: dict}).done(function() {

				$('#CE9A50CD_63CA_4A1E_B336_F45399BEC84D').prop('disabled', false);
				$('#C8D10895_E8A7_46A0_B638_C8DDDED8F91C').prop('disabled', false);
				$('#C124A2A9_B5F5_46F0_AFBC_234859F3F6FA').prop('disabled', false);
			});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data));
		});
	},

	/*-----------------------------------------------------------------*/

	onLogout: function()
	{
		$('#D847C44B_D28F_49B3_AF79_7A68B3305ED2').empty();

		$('#CE9A50CD_63CA_4A1E_B336_F45399BEC84D').prop('disabled', true);
		$('#C8D10895_E8A7_46A0_B638_C8DDDED8F91C').prop('disabled', true);
		$('#C124A2A9_B5F5_46F0_AFBC_234859F3F6FA').prop('disabled', true);
	},

	/*-----------------------------------------------------------------*/

	execute: function(command, converter)
	{
		/*---------------------------------------------------------*/

		command = command.trim();
		converter = converter.trim();

		/*---------------------------------------------------------*/

		if(command)
		{
			amiWebApp.lock();

			amiCommand.execute(command, {context: this, converter: converter}).always(function(data, url) {

				data = (converter === 'AMIXmlToJson.xsl') ? JSON.stringify(data, undefined, 2)
				                                          : data
				;

				var dict = {
					data: data,
					url: url,
				};

				amiWebApp.prependHTML('#AB4BA483_EE27_44D0_BB54_F5BFCFE4DA7E', this.fragmentResult, {dict: dict}).done(function() {

					amiWebApp.unlock();
				});
			});
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	select: function(command)
	{
		$('#CE9A50CD_63CA_4A1E_B336_F45399BEC84D').val(command);
	},

	/*-----------------------------------------------------------------*/

	copy: function(text)
	{
		amiWebApp.createControl(null, this, 'textBox', [text], {});
	},

	/*-----------------------------------------------------------------*/

	save: function(data)
	{
		/*---------------------------------------------------------*/

		var converter = $('#C8D10895_E8A7_46A0_B638_C8DDDED8F91C').val().trim();

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
