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

$AMIClass('FixTWikiStyleCtrl', {
	/*-----------------------------------------------------------------*/

	$implements: [ami.IControl],

	/*-----------------------------------------------------------------*/

	$init: function() {},

	/*-----------------------------------------------------------------*/

	patchId: function() {},

	/*-----------------------------------------------------------------*/

	replaceHTML: function() {},

	/*-----------------------------------------------------------------*/

	prependHTML: function() {},

	/*-----------------------------------------------------------------*/

	appendHTML: function() {},

	/*-----------------------------------------------------------------*/

	onReady: function()
	{
		var el = $('#jumpFormField');
		{
			/*-------------------------------------------------*/

			var right = $(document).width() - el.position().left + 4;

			/*-------------------------------------------------*/

			$('body').append('<link rel="stylesheet" type="text/css" href="' + amiWebApp.originURL + '/controls/FixTWikiStyle/css/FixTWikiStyleCtrl.css"></link>');

			/*-------------------------------------------------*/

			$('#ami_login_content').prepend('<li><a href="https://ami.in2p3.fr/" target="_blank"><i class="fa fa-external-link"></i> AMI</a></li>');

			$('#ami_login_content').appendTo('body');

			/*-------------------------------------------------*/

			$('#ami_login_content').css('right', right + 'px');

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
