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

$AMIClass('ConfirmBoxCtrl', {
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
			amiWebApp.originURL + '/controls/ConfirmBox/twig/ConfirmBoxCtrl.twig',
		], {context: this}).done(function(data) {

			amiWebApp.appendHTML('body', data[0], {context: this}).done(function() {

				var _class = this.$class;

				/*-----------------------------------------*/

				$('#C6245DA9_A1AB_D28C_B4A3_C6279EEF41DE').click(function() {

					$('#DCDB367E_FB67_A957_68AC_B54038F860DB').modal('hide');

					if(_class.context) {
						_class.deferred.rejectWith(_class.context);
					}
					else {
						_class.deferred.reject();
					}
				});

				/*-----------------------------------------*/

				$('#E5435D68_FE3D_C90F_FC41_DEFF400CE4AE').click(function() {

					$('#DCDB367E_FB67_A957_68AC_B54038F860DB').modal('hide');

					if(_class.context) {
						_class.deferred.resolveWith(_class.context);
					}
					else {
						_class.deferred.resolve();
					}
				});

				/*-----------------------------------------*/
			});
		});
	},

	/*-----------------------------------------------------------------*/

	show: function(text, settings)
	{
		var deferred = $.Deferred();
		var context = /**/null/**/;

		if(settings && 'context' in settings)
		{
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		$('#DCDB367E_FB67_A957_68AC_B54038F860DB .modal-body').text(text || '');

		$('#DCDB367E_FB67_A957_68AC_B54038F860DB').modal('show');

		this.$class.deferred = deferred;
		this.$class.context = context;

		/*---------------------------------------------------------*/

		return deferred.promise();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/