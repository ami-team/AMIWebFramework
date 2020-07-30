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

$AMIClass('TextBoxCtrl', {
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
			amiWebApp.originURL + '/controls/TextBox/twig/TextBoxCtrl.twig',
			amiWebApp.originURL + '/js/3rd-party/clipboard.min.js',
			amiWebApp.originURL + '/js/3rd-party/ace/ace.min.js',
			amiWebApp.originURL + '/js/3rd-party/ace/mode-sql.min.js',
			amiWebApp.originURL + '/js/3rd-party/ace/mode-xml.min.js',
			amiWebApp.originURL + '/js/3rd-party/ace/mode-json.min.js',
			amiWebApp.originURL + '/js/3rd-party/ace/mode-text.min.js',
			amiWebApp.originURL + '/js/3rd-party/ace/mode-groovy.min.js',
			amiWebApp.originURL + '/js/3rd-party/ace/mode-javascript.min.js',
		]).done((data) => {

			amiWebApp.appendHTML('body', data[0]).done(() => {

				const _class = this.$class;

				/*----------------------------------------------------------------------------------------------------*/

				$('#B8927006_7FCE_87BD_FC8D_C7575D69C362').on('hidden.bs.modal', () => {

					amiWebApp.modalLock();

					_class.deferred.resolveWith(_class.context || _class.deferred);
				});

				/*----------------------------------------------------------------------------------------------------*/

				new ClipboardJS('#B8927006_7FCE_87BD_FC8D_C7575D69C362 .btn[data-clipboard-target]');

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
			context, title, mode
		] = amiWebApp.setup(
			['context', 'title', 'mode'],
			[deferred, 'Text box', 'text'],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		if(mode === 'json')
		{
			try
			{
				if(amiWebApp.typeOf(text) !== 'String')
				{
					text = JSON.stringify(/*------*/(text), null, 2);
				}
				else
				{
					text = text.trim();

					if(text && text.toUpperCase() !== '@NULL')
					{
						text = JSON.stringify(JSON.parse(text), null, 2);
					}
					else
					{
						text = 'null';
					}
				}
			}
			catch(e)
			{
				amiWebApp.error('invalid JSON string', true);

				text = 'null';
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		$('#B6FA759D_D2DD_D079_B591_5023C422B87F').text(title);

		$('#B8927006_7FCE_87BD_FC8D_C7575D69C362 .form-editor').val(text).data('session').setMode('ace/mode/' + mode);

		$('#B8927006_7FCE_87BD_FC8D_C7575D69C362').modal('show');

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
