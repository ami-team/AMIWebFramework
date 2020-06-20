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

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('TableViewerApp', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		const result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/TableViewer/twig/TableViewerApp.twig',
			'ctrl:table',
		]).done((data) => {

			amiWebApp.replaceHTML('#ami_main_content', data[0]).done(() => {

				let json;

				try
				{
					json = JSON.parse(userdata || '{}');
				}
				catch(e)
				{
					json = {/*----------------------*/};
				}

				this.catalog = json.catalog || '';
				this.entity = json.entity || '';
				this.expression = json.expression || '1=1';
				this.primaryField = json.primaryField || '';

				this.table = new data[1]();

				result.resolve();
			});

		}).fail((data) => {

			result.reject(data);
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function()
	{
		const canEdit = amiLogin.hasRole('AMI_ADMIN')
		                ||
		                amiLogin.hasRole('AMI_WRITER')
		;

		this.table.render('#A2944C0A_9249_E4D2_3679_494C1A3AAAF0', 'BrowseQuery -catalog="' + amiWebApp.textToString(this.catalog) + '" -entity="' + amiWebApp.textToString(this.entity) + '" -mql="SELECT `*` WHERE ' + this.expression + '" -hideBigContent', {
			showDetails: true,
			canEdit: canEdit,
			catalog: this.catalog,
			entity: this.entity,
			primaryField: this.primaryField,
			start: 1,
			stop: 20,
			card: true
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function()
	{
		amiWebApp.replaceHTML('#A2944C0A_9249_E4D2_3679_494C1A3AAAF0', 'Please sign-in.');
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

const tableViewerApp = new TableViewerApp();

/*--------------------------------------------------------------------------------------------------------------------*/
