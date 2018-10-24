/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/

$AMIClass('EmergencyApp', {
	/*-----------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*-----------------------------------------------------------------*/

	onReady: function()
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/Emergency/twig/EmergencyApp.twig',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0]).done(function() {

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
		$('#C51A09D0_6E2A_0CFA_83C8_9ABC1E2EAA75').prop('disabled', false);
		$('#A64EBE51_FD59_AAC3_BC5C_7CCC62F413B9').prop('disabled', false);
	},

	/*-----------------------------------------------------------------*/

	onLogout: function()
	{
		$('#C51A09D0_6E2A_0CFA_83C8_9ABC1E2EAA75').prop('disabled', true);
		$('#A64EBE51_FD59_AAC3_BC5C_7CCC62F413B9').prop('disabled', true);
	},

	/*-----------------------------------------------------------------*/

	send: function(message)
	{
		/*---------------------------------------------------------*/

		message = message.trim();

		/*---------------------------------------------------------*/

		if(message)
		{
			amiWebApp.lock();

			amiCommand.execute('SendSMS -message="' + amiWebApp.textToString(message) + '"').done(function(data) {

				amiWebApp.success(amiWebApp.jspath('..info.$', data), true);

			}).fail(function(data) {

				amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
			});
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

var emergencyApp = new EmergencyApp();

/*-------------------------------------------------------------------------*/
