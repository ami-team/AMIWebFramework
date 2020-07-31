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

$AMIClass('MessageBoxCtrl', {
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
			amiWebApp.originURL + '/controls/MessageBox/twig/MessageBoxCtrl.twig',
			amiWebApp.originURL + '/js/3rd-party/clipboard.min.js',
		]).done((data) => {

			amiWebApp.appendHTML('body', data[0]).done(() => {

				const _class = this.$class;

				/*----------------------------------------------------------------------------------------------------*/

				$('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548').on('hidden.bs.modal', () => {

					amiWebApp.modalLeave();

					_class.deferred.resolveWith(_class.context || _class.deferred);
				});

				/*----------------------------------------------------------------------------------------------------*/

				new ClipboardJS('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548 .btn[data-clipboard-target]');

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
			[deferred, 'Message box'],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		$('#ADCD09FF_5A30_AC10_397D_1F213001977E').html(title);

		$('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548 .modal-body').text(text || '');

		$('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548').modal('show');

		this.$class.deferred = deferred;
		this.$class.context = context;

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.modalEnter();

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
