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

$AMIClass('MessageBoxCtrl', {
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
		return amiWebApp.loadTWIGs([
			amiWebApp.originURL + '/controls/MessageBox/twig/MessageBoxCtrl.twig',
		], {context: this}).done(function(data) {

			amiWebApp.appendHTML('body', data[0]);
		});
	},

	/*-----------------------------------------------------------------*/

	show: function(text)
	{
		$('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548 .modal-body').text(text || '');

		$('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548').modal('show');
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
