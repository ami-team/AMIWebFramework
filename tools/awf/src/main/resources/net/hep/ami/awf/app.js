/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{YEAR}} The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/

$AMIClass('{{NAME}}App', {
	/*-----------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*-----------------------------------------------------------------*/

	onReady: function(userdata)
	{
		amiWebApp.loadSheets([
		]);

		amiWebApp.loadScripts([
			'subapps/{{NAME}}/css/{{NAME}}App.css',
		]);

		$('#ami_breadcrumb_content').html('<li>My SubApps</li><li><a href="' + amiWebApp.webAppURL + '?subapp={{name}}">Command Line</a></li>');

		var result = $.Deferred();

		amiWebApp.loadHTMLs([
			'subapps/{{NAME}}/twig/{{NAME}}App.twig',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this, dict: {command: userdata}}).done(function() {

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
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

{{name}}App = new {{NAME}}App();

amiRegisterSubApp('{{name}}', {{name}}App, {});

/*-------------------------------------------------------------------------*/
