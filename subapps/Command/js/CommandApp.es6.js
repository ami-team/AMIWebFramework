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

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('CommandApp', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		const result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/Command/twig/CommandApp.twig',
			'subapps/Command/twig/command.twig',
			'subapps/Command/twig/result.twig',
			'js/3rd-party/filesaver.min.js',
		]).done((data) => {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {dict: {command: userdata}}).done(() => {

				this.fragmentCommand = data[1];
				this.fragmentResult = data[2];

				result.resolve();
			});

		}).fail((message) => {

			result.reject(message);
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function()
	{
		return this.getCommands();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function()
	{
		return this.getCommands();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	getCommands: function()
	{
		const result = $.Deferred();

		amiCommand.execute('ListCommands').done((data) => {

			const isAuthenticated = amiLogin.isAuthenticated();

			const rows = amiWebApp.jspath('..row', data);

			const dict = [];

			rows.forEach((row) => {

				const command = amiWebApp.jspath('..field{.@name==="command"}.$', row)[0] || '';

				const visible = (amiWebApp.jspath('..field{.@name==="visible"}.$', row)[0] || 'true') !== 'false';
				const secured = (amiWebApp.jspath('..field{.@name==="secured"}.$', row)[0] || 'false') !== 'false';

				let help = amiWebApp.jspath('..field{.@name==="help"}.$', row)[0] || '';
				const usage = amiWebApp.jspath('..field{.@name==="usage"}.$', row)[0] || '';

				if((visible && isAuthenticated) || amiLogin.hasRole('AMI_ADMIN') || command === 'GetSessionInfo' || command === 'ResetPassword' || command === 'AddUser')
				{
					let proto;

					if(!usage) {
						proto = command;
						help += '<br /><br />Usage:<br />' + command;
					} else {
						proto = command + ' ' + usage;
						help += '<br /><br />Usage:<br />' + command + ' ' + usage;
					}

					help = help.replace(new RegExp(command, 'g'), '<strong>' + command + '</strong>');

					dict.push({
						command: command,
						secured: secured,
						help: help,
						proto: proto,
					});
				}
			});

			amiWebApp.replaceHTML('#D847C44B_D28F_49B3_AF79_7A68B3305ED2', this.fragmentCommand, {dict: dict}).done(() => {

				result.resolve();
			});

		}).fail((data, message) => {

			result.reject(message);
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	execute: function(command, converter)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		command = command.trim();
		converter = converter.trim();

		/*------------------------------------------------------------------------------------------------------------*/

		if(command)
		{
			amiWebApp.lock();

			amiCommand.execute(command, {converter: converter}).always((data, message, url) => {

				const dict = {
					data: (converter === 'AMIXmlToJson.xsl') ? JSON.stringify(data, undefined, 2) : data,
					url: url,
				};

				amiWebApp.prependHTML('#AB4BA483_EE27_44D0_BB54_F5BFCFE4DA7E', this.fragmentResult, {dict: dict}).done(function() {

					amiWebApp.unlock();
				});
			});
		}

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	select: function(command)
	{
		$('#CE9A50CD_63CA_4A1E_B336_F45399BEC84D').val(command);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	copy: function(text)
	{
		amiWebApp.createControl(null, this, 'textBox', [text], {});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	save: function(data)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		const converter = $('#C8D10895_E8A7_46A0_B638_C8DDDED8F91C').val().trim();

		/*------------------------------------------------------------------------------------------------------------*/

		let fileMime;
		let fileName;

		/**/ if(converter === 'AMIXmlToXml.xsl')
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

		/*------------------------------------------------------------------------------------------------------------*/

		saveAs(new Blob([amiWebApp.htmlToText(data)], {type: fileMime}), fileName);

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

const commandApp = new CommandApp();

/*--------------------------------------------------------------------------------------------------------------------*/
