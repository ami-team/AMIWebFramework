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
	/*---------------------------------------------------------------------*/

	$extends: ami.Control,

	/*---------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);
	},

	/*---------------------------------------------------------------------*/

	onReady: function()
	{
		$('meta[http-equiv="Content-Type"]').attr('content', 'text/html; charset=utf-8');

		$('body').append('<link rel="stylesheet" type="text/css" href="' + amiWebApp.originURL + '/controls/FixTWikiStyle/css/FixTWikiStyleCtrl.css"></link>');
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
