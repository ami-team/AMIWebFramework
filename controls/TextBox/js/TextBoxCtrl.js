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

$AMIClass('TextBoxCtrl', {
	/*-----------------------------------------------------------------*/

	$extends: ami.Control,

	/*-----------------------------------------------------------------*/

	$init: function()
	{
		this.$super.$init();
	},

	/*-----------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadTWIGs([
			amiWebApp.originURL + '/controls/TextBox/twig/TextBoxCtrl.twig',
		], {context: this}).done(function(data) {

			amiWebApp.appendHTML('body', data[0]);
		});
	},

	/*-----------------------------------------------------------------*/

	show: function(text)
	{
		var html = text ? '<i class="line-number"></i>' + amiWebApp.textToHtml(text).replace(/\n/g, '\n<i class="line-number"></i>') : '';

		$('#B8927006_7FCE_87BD_FC8D_C7575D69C362 code').html(html);

		$('#B8927006_7FCE_87BD_FC8D_C7575D69C362').modal('show');
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
