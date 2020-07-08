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

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('FixTWikiStyleCtrl', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.Control,

	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		$('body').append('<link rel="stylesheet" type="text/css" href="' + amiWebApp.originURL + '/controls/FixTWikiStyle/css/FixTWikiStyleCtrl.css"></link>');

		/*------------------------------------------------------------------------------------------------------------*/

		const left = $('#jumpFormField').offset().left;

		if(left)
		{
			$('#ami_login_menu_content').css('right', (left - 24) + 'px');
		}

		/*------------------------------------------------------------------------------------------------------------*/
/*
		$.ajax({
			url: 'https://ami-protected.web.cern.ch/sso2.php',
			dataType: 'jsonp',
			jsonpCallback: 'callback',
			success: function(data) {

				amiLogin.form_login2(data.tmpUser, data.tmpPass);
			},
			error: function(**) {

				amiLogin.form_login2('guest', 'guest');
			},
		});
*/
		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
