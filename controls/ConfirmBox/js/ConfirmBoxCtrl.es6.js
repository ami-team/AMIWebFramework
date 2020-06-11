/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global ClipboardJS
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('ConfirmBoxCtrl', {
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
			amiWebApp.originURL + '/controls/ConfirmBox/twig/ConfirmBoxCtrl.twig',
			amiWebApp.originURL + '/js/3rd-party/clipboard.min.js',
		]).done((data) => {

			amiWebApp.appendHTML('body', data[0]).done(() => {

				const _class = this.$class;

				/*----------------------------------------------------------------------------------------------------*/

				$('#DCDB367E_FB67_A957_68AC_B54038F860DB').on('hidden.bs.modal', () => {

					amiWebApp.modalLock();

					//$('#DCDB367E_FB67_A957_68AC_B54038F860DB').modal('hide');

					_class.deferred.rejectWith(_class.context || _class.deferred, [false]);
				});

				/*----------------------------------------------------------------------------------------------------*/

				$('#E5435D68_FE3D_C90F_FC41_DEFF400CE4AE').on(/*-*/'click'/*-*/, () => {

					amiWebApp.modalLock();

					$('#DCDB367E_FB67_A957_68AC_B54038F860DB').modal('hide');

					_class.deferred.resolveWith(_class.context || _class.deferred, [true]);
				});

				/*----------------------------------------------------------------------------------------------------*/

				new ClipboardJS('#DCDB367E_FB67_A957_68AC_B54038F860DB .btn[data-clipboard-target]');

				/*----------------------------------------------------------------------------------------------------*/
			});
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(text, settings)
	{
		const deferred = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const [
			context, title
		] = amiWebApp.setup(
			['context', 'title'],
			[deferred, 'Confirm box'],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		$('#DF8EBE84_FA77_2711_8EB5_4B3213739A54').html(title);

		$('#DCDB367E_FB67_A957_68AC_B54038F860DB .modal-body').text(text || '');

		$('#DCDB367E_FB67_A957_68AC_B54038F860DB').modal('show');

		this.$class.deferred = deferred;
		this.$class.context = context;

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.modalUnlock();

		return deferred.promise();

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	show: function(text, settings)
	{
		return this.render(text, settings);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
