/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* AMIDocumentApp                                                          */
/*-------------------------------------------------------------------------*/

$AMIClass('AMIDocumentApp', {
	/*-----------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*-----------------------------------------------------------------*/

	onReady: function(userdata) {

		amiWebApp.loadHTMLs([
			'subapps/Document/twig/AMIDocumentApp.twig',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this}).done(function() {

				if(!userdata)
				{
					userdata = 'home.html';
				}

				$('.jumbotron').hide();

				this.load(userdata);
			});
		});
	},

	/*-----------------------------------------------------------------*/

	onExit: function()
	{
		$('.jumbotron').show();
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

	load: function(page)
	{
		var url = amiWebApp.originURL + '/docs/' + page;

		$.ajax({
			url: url,
			cache: false,
			dataType: 'html',
			context: this,
		}).done(function(data) {

			$('#ami_jumbotron_title').empty();
			$('#ami_jumbotron_content').empty();
			$('#ami_breadcrumb_content').html('<li><a href="' + amiWebApp.webAppURL + '?subapp=amidocument">Documents</a></li><li><a href="' + amiWebApp.webAppURL + '?subapp=amidocument&userdata=' + page + '">' + page + '</a></li>');

			amiWebApp.replaceHTML('#ami_document_content', data);

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

amiDocumentApp = new AMIDocumentApp();

amiRegisterSubApp('amiDocument', amiDocumentApp, {});

/*-------------------------------------------------------------------------*/
