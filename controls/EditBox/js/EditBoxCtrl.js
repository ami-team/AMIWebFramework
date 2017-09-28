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

$AMIClass('EditBoxCtrl', {
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
			amiWebApp.originURL + '/controls/EditBox/twig/EditBoxCtrl.twig',
			amiWebApp.originURL + '/js/3rd-party/clipboard.min.js',
		], {context: this}).done(function(data) {

			amiWebApp.appendHTML('body', data[0], {context: this}).done(function() {

				var _class = this.$class;

				/*-----------------------------------------*/

				$('#A642C648_39A9_FF50_0E1C_C1A8E6435C0C').click(function() {

					$('#F9BC65C1_07EB_2F56_E152_9B76DB218F10').modal('hide');

					_class.deferred.rejectWith(_class.context || _class.deferred, [$('#F9BC65C1_07EB_2F56_E152_9B76DB218F10 textarea').val()]);
				});

				/*-----------------------------------------*/

				$('#CB99273A_B731_0289_8D87_D0549A1944FB').click(function() {

					$('#F9BC65C1_07EB_2F56_E152_9B76DB218F10').modal('hide');

					_class.deferred.resolveWith(_class.context || _class.deferred, [$('#F9BC65C1_07EB_2F56_E152_9B76DB218F10 textarea').val()]);
				});

				/*-----------------------------------------*/

				new Clipboard('#F9BC65C1_07EB_2F56_E152_9B76DB218F10 .btn[data-clipboard-target]');

				/*-----------------------------------------*/
			});
		});
	},

	/*-----------------------------------------------------------------*/

	show: function(text, settings)
	{
		var deferred = $.Deferred();
		var context = /**/null/**/;
		var title = 'Edit box';

		if(settings)
		{
			if('context' in settings) {
				context = settings['context'];
			}

			if('title' in settings) {
				title = settings['title'];
			}
		}

		/*---------------------------------------------------------*/

		$('#D042A24A_4F19_BEF9_A843_15391EAD26A1').html(title);

		$('#F9BC65C1_07EB_2F56_E152_9B76DB218F10 textarea').val(text || '');

		$('#F9BC65C1_07EB_2F56_E152_9B76DB218F10').modal('show');

		this.$class.deferred = deferred;
		this.$class.context = context;

		/*---------------------------------------------------------*/

		return deferred.promise();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
