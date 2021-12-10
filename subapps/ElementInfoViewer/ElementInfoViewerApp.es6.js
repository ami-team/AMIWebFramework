/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

import twigElementInfoViewerApp from './assets/twig/ElementInfoViewerApp.twig';

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('ElementInfoViewerApp', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function()
	{
		const result = $.Deferred();

		amiWebApp.loadResources([
			'ctrl:elementInfo',
		]).done((data) => {

			amiWebApp.replaceHTML('#ami_main_content', twigElementInfoViewerApp).done(() => {

				this._elementInfo = new data[0]();

				result.resolve();
			});

		}).fail((data) => {

			result.reject(data);
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function(userdata)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		let options;

		try
		{
			options = JSON.parse(userdata || '{}');
		}
		catch(e)
		{
			options = {/*----------------------*/};
		}

		/*------------------------------------------------------------------------------------------------------------*/

		this.setupCtx(
			{
				showDetails: true,
				card: true,
			},
			null,
			options,
		);

		/*------------------------------------------------------------------------------------------------------------*/

		if(this.ctx.catalog && this.ctx.entity && this.ctx.primaryFieldName && this.ctx.primaryFieldValue)
		{
			this._elementInfo.render('#AAE69442_E2AB_D572_F662_A3F519B8E5AC', this.ctx.catalog, this.ctx.entity, this.ctx.primaryFieldName, this.ctx.primaryFieldValue, this.ctx).done(() => {

				amiWebApp.flush();

				result.resolve();

			}).fail((message) => {

				result.reject(message);
			});
		}
		else
		{
			result.reject('Missing parameters: catalog, entity, primaryFieldName, primaryFieldValue');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function()
	{
		$('#AAE69442_E2AB_D572_F662_A3F519B8E5AC').html('Please sign-in.');
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

window.elementInfoViewerApp = new ElementInfoViewerApp();

/*--------------------------------------------------------------------------------------------------------------------*/
