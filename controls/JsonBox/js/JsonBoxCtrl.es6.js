/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global JsonView
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('JsonBoxCtrl', {
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
			amiWebApp.originURL + '/controls/JsonBox/twig/JsonBoxCtrl.twig',
			amiWebApp.originURL + '/css/3rd-party/jsonview.bundle.css',
			amiWebApp.originURL + '/js/3rd-party/jsonview.bundle.js',
		]).done((data) => {

			amiWebApp.appendHTML('body', data[0]).done(() => {

				const _class = this.$class;

				/*----------------------------------------------------------------------------------------------------*/

				$('#E5A34976_AC6F_5B5F_770F_F26DD1A2AB96').on('hidden.bs.modal', () => {

					amiWebApp.modalLock();

					_class.deferred.resolveWith(_class.context || _class.deferred);
				});

				/*----------------------------------------------------------------------------------------------------*/
			});
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(json, settings)
	{
		const deferred = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.modalUnlock();

		/*------------------------------------------------------------------------------------------------------------*/

		let a;
		let b;

		try
		{
			if(amiWebApp.typeOf(json) !== 'String')
			{
				a = /*------*/(json);
				b = JSON.stringify(a, null, 2);
			}
			else
			{
				json = json.trim();

				if(json && json.toUpperCase() !== '@NULL')
				{
					a = JSON.parse(json);
					b = JSON.stringify(a, null, 2);
				}
				else
				{
					a = null;
					b = 'null';
				}
			}
		}
		catch(e)
		{
			amiWebApp.error('invalid JSON string', true);

			a = null;
			b = 'null';
		}

		/*------------------------------------------------------------------------------------------------------------*/

		const [
			context, title
		] = amiWebApp.setup(
			['context', 'title'],
			[deferred, 'JSON box'],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		$('#FA090573_9E6B_72F6_2431_AFB1F104EFB7').text(title);

		JsonView.render(JsonView.createTree(a), $('#B28C3528_0A98_27A9_ADEC_C0678ACE0426 div').empty()[0]);

		$('#CB4CDCFF_8B4A_F4D6_CFD5_E0C69BB4C2E0 code').html('<i class="line-number"></i>' + amiWebApp.textToHtml(b).replace(/\n/g, '\n<i class="line-number"></i>'));

		$('#E5A34976_AC6F_5B5F_770F_F26DD1A2AB96').modal('show');

		this.$class.deferred = deferred;
		this.$class.context = context;

		/*------------------------------------------------------------------------------------------------------------*/

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
