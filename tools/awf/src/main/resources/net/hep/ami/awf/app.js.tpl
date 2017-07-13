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

$AMIClass('{{NAME}}App', {
	/*-----------------------------------------------------------------*/

	$implements: [ami.SubApp],

	/*-----------------------------------------------------------------*/

	onReady: function(userdata)
	{
		/*---------------------------------------------------------*/

		$('#ami_breadcrumb_content').html('<li>My SubApps</li><li><a href="' + amiWebApp.webAppURL + '?subapp={{name}}">{{NAME}}</a></li>');

		/*---------------------------------------------------------*/

		amiWebApp.loadScripts([
		]);

		amiWebApp.loadSheets([
			'subapps/{{NAME}}/css/{{NAME}}App.css',
		]);

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		amiWebApp.loadTWIGs([
			'subapps/{{NAME}}/twig/{{NAME}}App.twig',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this}).done(function() {

				result.resolve();
			});

		}).fail(function(data) {

			result.reject(data);
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
	},

	/*-----------------------------------------------------------------*/

	onLogout: function()
	{
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

{{name}}App = new {{NAME}}App();

/*-------------------------------------------------------------------------*/
