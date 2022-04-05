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

import twigEditBoxCtrl from './assets/twig/EditBoxCtrl.twig';

import ClipboardJS from 'clipboard';

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
		amiWebApp.appendHTML('body', twigEditBoxCtrl).done(() => {

			const _class = this.$class;

			/*--------------------------------------------------------------------------------------------------------*/

			$('#B6014C3E_BD4F_09EB_51EF_F7CBC1E57725').on('click', () => {

				amiWebApp.modalLeave();

				$('#F9BC65C1_07EB_2F56_E152_9B76DB218F10').modal('hide');

				_class.deferred.rejectWith(_class.context || _class.deferred, [/*----------------*/ _class.origText /*----------------*/]);
			});

			/*--------------------------------------------------------------------------------------------------------*/

			$('#CB99273A_B731_0289_8D87_D0549A1944FB').on('click', () => {

				amiWebApp.modalLeave();

				$('#F9BC65C1_07EB_2F56_E152_9B76DB218F10').modal('hide');

				_class.deferred.resolveWith(_class.context || _class.deferred, [$('#F9BC65C1_07EB_2F56_E152_9B76DB218F10 textarea').val()]);
			});

			/*--------------------------------------------------------------------------------------------------------*/

			new ClipboardJS('#F9BC65C1_07EB_2F56_E152_9B76DB218F10 .btn[data-clipboard-target]');

			/*--------------------------------------------------------------------------------------------------------*/
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(text, options)
	{
		const deferred = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const params = amiWebApp.setupParams(
			{
				text: text
			}, {
				context: deferred,
				title: 'Edit box',
			},
			options
		);

		/*------------------------------------------------------------------------------------------------------------*/

		$('#D042A24A_4F19_BEF9_A843_15391EAD26A1').html(params.title);

		$('#F9BC65C1_07EB_2F56_E152_9B76DB218F10 textarea').val(this.$class.origText = params.text || '');

		$('#F9BC65C1_07EB_2F56_E152_9B76DB218F10').modal('show');

		this.$class.deferred = /**/deferred/**/;
		this.$class.context = params.context;

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
