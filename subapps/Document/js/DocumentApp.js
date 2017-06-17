/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-![VALUE YEAR] The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* DocumentApp                                                          */
/*-------------------------------------------------------------------------*/

$AMIClass('DocumentApp', {
	/*-----------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*-----------------------------------------------------------------*/

	onReady: function(userdata) {

		amiWebApp.loadHTMLs([
			'subapps/Document/twig/DocumentApp.twig',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this}).done(function() {

				this.load(userdata || 'home.html');
			});
		});
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

	load: function(page)
	{
		var url = amiWebApp.originURL + '/docs/' + page;

		$.ajax({
			url: url,
			cache: false,
			dataType: 'html',
			context: this,
		}).done(function(data) {

			$('#ami_breadcrumb_content').html('<li><a href="' + amiWebApp.webAppURL + '?subapp=amiDocument">Documents</a></li><li><a href="' + amiWebApp.webAppURL + '?subapp=amidocument&userdata=' + page + '">' + page + '</a></li>');

			amiWebApp.replaceHTML('#F0B88D44_C581_4474_943F_91AA28095DF7', data);

		}).fail(function() {

			if(page !== '404.html')
			{
				this.load('404.html');
			}
		});
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

documentApp = new DocumentApp();

/*-------------------------------------------------------------------------*/
