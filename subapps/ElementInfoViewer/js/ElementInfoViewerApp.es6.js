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

$AMIClass('ElementInfoViewerApp', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/ElementInfoViewer/twig/ElementInfoViewerApp.twig',
			'ctrl:elementInfo',
		]).done((data) => {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this}).done(() => {

				let json;

				try
				{
					json = JSON.parse(userdata || '{}');
				}
				catch(e)
				{
					json = {/*----------------------*/};
				}

				this.command = json.command || '';
				/**/
				this.catalog = json.catalog || '';
				this.entity = json.entity || '';
				this.primaryFieldName = json.primaryFieldName || '';
				this.primaryFieldValue = json.primaryFieldValue || '';
				/**/
				this.maxCellLength = parseInt(json.maxCellLength || '64');
				/**/
				this.hideBigContent = json.hideBigContent;

				this.elementInfo = new data[1]();

				result.resolve();
			});

		}).fail((data) => {

			result.reject(data);
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onExit: function()
	{
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function()
	{
		const canEdit = amiLogin.hasRole('AMI_ADMIN')
						||
						amiLogin.hasRole('AMI_WRITER')
		;

		this.elementInfo.render('#AAE69442_E2AB_D572_F662_A3F519B8E5AC', this.catalog, this.entity, this.primaryFieldName, this.primaryFieldValue, {
			canEdit: canEdit,
			/**/
			catalog: this.catalog,
			entity: this.entity,
			primaryFieldName: this.primaryFieldName,
			primaryFieldValue: this.primaryFieldValue,
			/**/
			maxCellLength: this.maxCellLength,
			/**/
			hideBigContent: this.hideBigContent,
			card: true,
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function()
	{
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

var elementInfoViewerApp = new ElementInfoViewerApp();

/*--------------------------------------------------------------------------------------------------------------------*/
