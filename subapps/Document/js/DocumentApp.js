/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-![VALUE YEAR] The AMI Team
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* DocumentApp                                                             */
/*-------------------------------------------------------------------------*/

$AMIClass('DocumentApp', {
	/*---------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*---------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		this._load(userdata || 'home.html');
	},

	/*---------------------------------------------------------------------*/

	_load: function(page)
	{
		var url = amiWebApp.originURL + '/docs/' + page;

		$.ajax({
			url: url,
			cache: false,
			dataType: 'html',
			context: this,
		}).done(function(data) {

			$('#ami_breadcrumb_content').html('<li class="breadcrumb-item"><a href="' + amiWebApp.webAppURL + '?subapp=document">Documents</a></li><li class="breadcrumb-item"><a href="' + amiWebApp.webAppURL + '?subapp=document&userdata=' + encodeURIComponent(page) + '">' + amiWebApp.textToHtml(page) + '</a></li>');

			amiWebApp.replaceHTML('#ami_main_content', data);

		}).fail(function() {

			if(page !== '404.html')
			{
				this._load('404.html');
			}
		});
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

documentApp = new DocumentApp();

/*-------------------------------------------------------------------------*/
