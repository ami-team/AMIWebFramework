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

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('TreeBoxCtrl', {
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
			amiWebApp.originURL + '/controls/TreeBox/twig/TreeBoxCtrl.twig',
			amiWebApp.originURL + '/css/3rd-party/jsonview.bundle.css',
			amiWebApp.originURL + '/js/3rd-party/jsonview.bundle.js',
		]).done((data) => {

			amiWebApp.appendHTML('body', data[0]).done(() => {

				const _class = this.$class;

				/*----------------------------------------------------------------------------------------------------*/

				$('#E5A34976_AC6F_5B5F_770F_F26DD1A2AB96').on('hidden.bs.modal', () => {

					amiWebApp.lock();

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

		const [
			context, title
		] = amiWebApp.setup(
			['context', 'title'],
			[deferred, 'Tree box'],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		$('#FA090573_9E6B_72F6_2431_AFB1F104EFB7').text(title);

		JsonView.render(JsonView.createTree(json), document.querySelector('#E262C0A2_6C07_3B1A_9774_8AE41B7C4CA6'));

		$('#E5A34976_AC6F_5B5F_770F_F26DD1A2AB96').modal('show');

		this.$class.deferred = deferred;
		this.$class.context = context;

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.unlock();

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
