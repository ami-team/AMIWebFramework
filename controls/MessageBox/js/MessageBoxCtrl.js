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

	patchId: function(id) {},

	/*-----------------------------------------------------------------*/

	replaceHTML: function(selector, twig, settings) {},

	/*-----------------------------------------------------------------*/

	prependHTML: function(selector, twig, settings) {},

	/*-----------------------------------------------------------------*/

	appendHTML: function(selector, twig, settings) {},

	/*-----------------------------------------------------------------*/

	onReady: function()
	{
		var result = $.Deferred();

		amiWebApp.loadTWIGs([
			amiWebApp.originURL + '/controls/MessageBox/twig/MessageBoxCtrl.twig',
		], {context: this}).done(function(data) {

			amiWebApp.appendHTML('body', data[0]);

			result.resolve();

		}).fail(function() {

			result.reject();
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	show: function(text)
	{
		$('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548 .modal-body').text(text || '');

		$('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548').modal('show');
	},

	/*-----------------------------------------------------------------*/

	hide: function(text)
	{
		$('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548 .modal-body').text(text || '');

		$('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548').modal('hide');
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
