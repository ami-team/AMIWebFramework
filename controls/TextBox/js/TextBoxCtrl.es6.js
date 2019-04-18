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

/*-------------------------------------------------------------------------*/

$AMIClass('TextBoxCtrl', {
	/*---------------------------------------------------------------------*/

	$extends: ami.Control,

	/*---------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);
	},

	/*---------------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/TextBox/twig/TextBoxCtrl.twig',
			amiWebApp.originURL + '/js/3rd-party/clipboard.min.js',
		]).done((data) => {

			amiWebApp.appendHTML('body', data[0]).done(() => {

				const _class = this.$class;

				/*---------------------------------------------------------*/

				$('#B8927006_7FCE_87BD_FC8D_C7575D69C362').on('hidden.bs.modal', () => {

					_class.deferred.resolveWith(_class.context || _class.deferred);
				});

				/*---------------------------------------------------------*/

				new ClipboardJS('#B8927006_7FCE_87BD_FC8D_C7575D69C362 .btn[data-clipboard-target]');

				/*---------------------------------------------------------*/
			});
		});
	},

	/*---------------------------------------------------------------------*/

	show: function(text, settings)
	{
		const deferred = $.Deferred();

		/*-----------------------------------------------------------------*/

		const [
			context, title
		] = amiWebApp.setup(
			['context', 'title'],
			[deferred, 'Edit box'],
			settings
		);

		/*-----------------------------------------------------------------*/

		const html = text ? '<i class="line-number"></i>' + amiWebApp.textToHtml(text).replace(/\n/g, '\n<i class="line-number"></i>') : '';

		$('#B8927006_7FCE_87BD_FC8D_C7575D69C362 code').html(html);

		$('#B8927006_7FCE_87BD_FC8D_C7575D69C362').modal('show');

		this.$class.deferred = deferred;
		this.$class.context = context;

		/*-----------------------------------------------------------------*/

		return deferred.promise();

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	render: function(text, settings)
	{
		return this.show(text, settings);
	}

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
