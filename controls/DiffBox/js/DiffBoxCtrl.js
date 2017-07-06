/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global diff_match_patch
 *
 */

/*-------------------------------------------------------------------------*/

$AMIClass('DiffBoxCtrl', {
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
			amiWebApp.originURL + '/controls/DiffBox/twig/DiffBoxCtrl.twig',
		], {context: this}).done(function(data) {

			amiWebApp.loadScripts([
				amiWebApp.originURL + '/js/3rd-party/diff_match_patch.min.js',
			]);

			amiWebApp.appendHTML('body', data[0]);

			this.dmp = new diff_match_patch();
		});
	},

	/*-----------------------------------------------------------------*/

	show: function(text1, text2)
	{
		/*---------------------------------------------------------*/

		var d = this.dmp.diff_main(text1, text2);

		this.dmp.diff_cleanupEfficiency(d);

		/*---------------------------------------------------------*/

		var html1 = '<i class="line-number"></i>' + amiWebApp.textToHtml(text1).replace(/\n/g, '\n<i class="line-number"></i>');

		$('#B8D42DF0_0D25_C818_1438_5BAD52BB9E0B code:nth-child(1)').html(html1);

		/*---------------------------------------------------------*/

		var html2 = '<i class="line-number"></i>' + this.dmp.diff_prettyHtml(d).replace(/\n/g, '\n<i class="line-number"></i>');

		$('#B8D42DF0_0D25_C818_1438_5BAD52BB9E0B code:nth-child(2)').html(html2);

		/*---------------------------------------------------------*/

		var html3 = '<i class="line-number"></i>' + amiWebApp.textToHtml(text2).replace(/\n/g, '\n<i class="line-number"></i>');

		$('#B8D42DF0_0D25_C818_1438_5BAD52BB9E0B code:nth-child(3)').html(html3);

		/*---------------------------------------------------------*/

		$('#B8D42DF0_0D25_C818_1438_5BAD52BB9E0B').modal('show');

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
