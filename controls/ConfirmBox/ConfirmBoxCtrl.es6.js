/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

import twigConfirmBoxCtrl from './assets/twig/ConfirmBoxCtrl.twig';

import ClipboardJS from 'clipboard';

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
		const result = $.Deferred();

		amiWebApp.appendHTML('body', twigConfirmBoxCtrl).done(() => {

			const _class = this.$class;

			/*--------------------------------------------------------------------------------------------------------*/

			$('#DAB9DB06_3398_251D_E7CC_2C0BF2E4D75F').on('click', () => {

				amiWebApp.modalLeave();

				$('#DCDB367E_FB67_A957_68AC_B54038F860DB').modal('hide');

				_class.deferred.rejectWith(_class.context || _class.deferred, [false]);
			});

			/*--------------------------------------------------------------------------------------------------------*/

			$('#E5435D68_FE3D_C90F_FC41_DEFF400CE4AE').on('click', () => {

				amiWebApp.modalLeave();

				$('#DCDB367E_FB67_A957_68AC_B54038F860DB').modal('hide');

				_class.deferred.resolveWith(_class.context || _class.deferred, [true]);
			});

			/*--------------------------------------------------------------------------------------------------------*/

			new ClipboardJS('#DCDB367E_FB67_A957_68AC_B54038F860DB .btn[data-clipboard-target]');

			/*--------------------------------------------------------------------------------------------------------*/

			result.resolve();

			/*--------------------------------------------------------------------------------------------------------*/
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(text, options)
	{
		const deferred = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const [
			context, title
		] = amiWebApp.setup(
			['context', 'title'],
			[deferred, 'Confirm box'],
			options
		);

		/*------------------------------------------------------------------------------------------------------------*/

		$('#DF8EBE84_FA77_2711_8EB5_4B3213739A54').html(title);

		$('#DCDB367E_FB67_A957_68AC_B54038F860DB .modal-body').text(text || '');

		$('#DCDB367E_FB67_A957_68AC_B54038F860DB').modal('show');

		this.$class.deferred = deferred;
		this.$class.context = context;

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.modalEnter();

		return deferred.promise();

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	show: function(text, options)
	{
		return this.render(text, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
