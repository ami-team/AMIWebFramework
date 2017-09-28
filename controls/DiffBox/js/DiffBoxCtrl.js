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

	$extends: ami.Control,

	/*-----------------------------------------------------------------*/

	$init: function(parent)
	{
		this.$super.$init(parent);
	},

	/*-----------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/DiffBox/twig/DiffBoxCtrl.twig',
		], {context: this}).done(function(data) {

			amiWebApp.loadScripts([
				amiWebApp.originURL + '/js/3rd-party/diff_match_patch.min.js',
			], {context: this}).done(function() {

				this.dmp = new diff_match_patch();

				amiWebApp.appendHTML('body', data[0]);
			});
		});
	},

	/*-----------------------------------------------------------------*/

	show: function(text1, text3)
	{
		/*---------------------------------------------------------*/

		var d = this.dmp.diff_main(text1, text3);

		this.dmp.diff_cleanupEfficiency(d);

		/*---------------------------------------------------------*/

		var html1 = '<i class="line-number"></i>' + amiWebApp.textToHtml(text1).replace(/\n/g, '\n<i class="line-number"></i>');

		$('#E94A7FE7_FEBC_AE12_0C13_E625FC2ADFE6').html(html1);

		/*---------------------------------------------------------*/

		var html2 = '<i class="line-number"></i>' + this.dmp.diff_prettyHtml(d).replace(/\n/g, '\n<i class="line-number"></i>');

		$('#AF0BD692_6F09_4527_2684_AAF623658767').html(html2);

		/*---------------------------------------------------------*/

		var html3 = '<i class="line-number"></i>' + amiWebApp.textToHtml(text3).replace(/\n/g, '\n<i class="line-number"></i>');

		$('#C604C636_346F_64A8_3EBE_ADCDE2AEB343').html(html3);

		/*---------------------------------------------------------*/

		$('#B8D42DF0_0D25_C818_1438_5BAD52BB9E0B').modal('show');

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
