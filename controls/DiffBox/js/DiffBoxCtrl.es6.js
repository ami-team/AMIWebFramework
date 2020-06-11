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

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('DiffBoxCtrl', {
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
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/DiffBox/twig/DiffBoxCtrl.twig',
			amiWebApp.originURL + '/js/3rd-party/diff_match_patch.min.js',
		]).done((data) => {

			amiWebApp.appendHTML('body', data[0]).done(() => {

				const _class = this.$class;

				/*----------------------------------------------------------------------------------------------------*/

				$('#B8D42DF0_0D25_C818_1438_5BAD52BB9E0B').on('hidden.bs.modal', () => {

					amiWebApp.modaleEnableLock();

					_class.deferred.resolveWith(_class.context || _class.deferred);
				});

				/*----------------------------------------------------------------------------------------------------*/

				this.dmp = new diff_match_patch();

				/*----------------------------------------------------------------------------------------------------*/
			});
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(text1, text3, settings)
	{
		const deferred = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const [
			context, title
		] = amiWebApp.setup(
			['context', 'title'],
			[deferred, 'Edit box'],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		const d = this.dmp.diff_main(text1, text3);

		this.dmp.diff_cleanupEfficiency(d);

		/*------------------------------------------------------------------------------------------------------------*/

		const html1 = '<i class="line-number"></i>' + amiWebApp.textToHtml(text1).replace(/\n/g, '\n<i class="line-number"></i>');

		$('#E94A7FE7_FEBC_AE12_0C13_E625FC2ADFE6').html(html1);

		/*------------------------------------------------------------------------------------------------------------*/

		const html2 = '<i class="line-number"></i>' + this.dmp.diff_prettyHtml(d).replace(/\n/g, '\n<i class="line-number"></i>');

		$('#AF0BD692_6F09_4527_2684_AAF623658767').html(html2);

		/*------------------------------------------------------------------------------------------------------------*/

		const html3 = '<i class="line-number"></i>' + amiWebApp.textToHtml(text3).replace(/\n/g, '\n<i class="line-number"></i>');

		$('#C604C636_346F_64A8_3EBE_ADCDE2AEB343').html(html3);

		/*------------------------------------------------------------------------------------------------------------*/

		$('#B8D42DF0_0D25_C818_1438_5BAD52BB9E0B').modal('show');

		this.$class.deferred = deferred;
		this.$class.context = context;

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.modaleDisableLock();

		return deferred.promise();

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	show: function(text1, text3, settings)
	{
		return this.render(text1, text3, settings);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
