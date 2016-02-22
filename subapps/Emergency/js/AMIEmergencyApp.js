/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* AMIEmergencyApp                                                         */
/*-------------------------------------------------------------------------*/

$AMIClass('AMIEmergencyApp', {
	/*-----------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*-----------------------------------------------------------------*/

	onReady: function(userdata)
	{
		$('#ami_jumbotron_title').html('Emergency');
		$('#ami_jumbotron_content').html('SMS for blocking problem');
		$('#ami_breadcrumb_content').html('<li>Tools</li><li><a href="' + amiWebApp.webAppURL + '?subapp=amiemergency">Emergency</a></li>');

		var result = $.Deferred();

		amiWebApp.loadHTMLs([
			'subapps/Emergency/html/AMIEmergencyApp.html',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this}).done(function() {

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

	send: function()
	{
		var message = $('#modal_emergency_message').val();

		message = message.strip();

		if(message)
		{
			amiWebApp.lock();
	
			amiCommand.execute('SendSMS -message="' + amiWebApp.textToString(message) + '"').done(function(data) {
	
				amiWebApp.info(amiWebApp.jspath('..info.$', data).join(' '));
	
			}).fail(function(data) {
	
				amiWebApp.error(amiWebApp.jspath('..error.$', data).join(' '));
			});
		}
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiEmergencyApp = new AMIEmergencyApp();

amiRegisterSubApp('amiEmergency', amiEmergencyApp, {});

/*-------------------------------------------------------------------------*/
