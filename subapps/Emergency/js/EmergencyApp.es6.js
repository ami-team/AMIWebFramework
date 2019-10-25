/*!
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('EmergencyApp', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function()
	{
		const result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/Emergency/twig/EmergencyApp.twig',
		]).done((data) => {

			amiWebApp.replaceHTML('#ami_main_content', data[0]).done(() => {

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
		$('#C51A09D0_6E2A_0CFA_83C8_9ABC1E2EAA75').prop('disabled', false);
		$('#A64EBE51_FD59_AAC3_BC5C_7CCC62F413B9').prop('disabled', false);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function()
	{
		$('#C51A09D0_6E2A_0CFA_83C8_9ABC1E2EAA75').prop('disabled', true);
		$('#A64EBE51_FD59_AAC3_BC5C_7CCC62F413B9').prop('disabled', true);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	send: function(message)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		message = message.trim();

		/*------------------------------------------------------------------------------------------------------------*/

		if(message)
		{
			amiWebApp.lock();

			amiCommand.execute('SendSMS -message="' + amiWebApp.textToString(message) + '"').done((data, message) => {

				amiWebApp.success(message, true);

			}).fail((data, message) => {

				amiWebApp.error(message, true);
			});
		}

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

const emergencyApp = new EmergencyApp();

/*--------------------------------------------------------------------------------------------------------------------*/
