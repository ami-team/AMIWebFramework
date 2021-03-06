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

$AMIClass('EditBoxCtrl', {
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
			amiWebApp.originURL + '/controls/EditBox/twig/EditBoxCtrl.twig',
			amiWebApp.originURL + '/js/3rd-party/clipboard.min.js',
		]).done((data) => {

			amiWebApp.appendHTML('body', data[0]).done(() => {

				const _class = this.$class;

				/*----------------------------------------------------------------------------------------------------*/

				$('#B6014C3E_BD4F_09EB_51EF_F7CBC1E57725').on('click', () => {

					amiWebApp.modalLeave();

					$('#F9BC65C1_07EB_2F56_E152_9B76DB218F10').modal('hide');

					_class.deferred.rejectWith(_class.context || _class.deferred, [/*----------------*/ _class.origText /*----------------*/]);
				});

				/*----------------------------------------------------------------------------------------------------*/

				$('#CB99273A_B731_0289_8D87_D0549A1944FB').on('click', () => {

					amiWebApp.modalLeave();

					$('#F9BC65C1_07EB_2F56_E152_9B76DB218F10').modal('hide');

					_class.deferred.resolveWith(_class.context || _class.deferred, [$('#F9BC65C1_07EB_2F56_E152_9B76DB218F10 textarea').val()]);
				});

				/*----------------------------------------------------------------------------------------------------*/

				new ClipboardJS('#F9BC65C1_07EB_2F56_E152_9B76DB218F10 .btn[data-clipboard-target]');

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
			[deferred, 'Edit box'],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		$('#D042A24A_4F19_BEF9_A843_15391EAD26A1').html(title);

		$('#F9BC65C1_07EB_2F56_E152_9B76DB218F10 textarea').val(this.$class.origText = text || '');

		$('#F9BC65C1_07EB_2F56_E152_9B76DB218F10').modal('show');

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
