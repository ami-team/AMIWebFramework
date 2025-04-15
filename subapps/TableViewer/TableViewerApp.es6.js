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

import twigTableViewerApp from './assets/twig/TableViewerApp.twig';

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('TableViewerApp', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function()
	{
		this.$super.$init();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function()
	{
		const result = $.Deferred();

		amiWebApp.loadResources([
			'ctrl:table',
		]).done((data) => {

			amiWebApp.replaceHTML('#ami_main_content', twigTableViewerApp).done(() => {

				this._table = new data[0]();

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
			options
		);

		/*------------------------------------------------------------------------------------------------------------*/

		const command = (this.ctx.command || '').trim();
		const catalog = (this.ctx.catalog || '').trim();
		const entity = (this.ctx.entity || '').trim();
		const expression = (this.ctx.expression || '').trim();

		if(command || (catalog && entity))
		{
			this._table.render('#A2944C0A_9249_E4D2_3679_494C1A3AAAF0', command || `BrowseQuery -catalog="${amiWebApp.textToString(catalog)}" -entity="${amiWebApp.textToString(entity)}" -mql="SELECT * WHERE ${amiWebApp.textToString(expression) || '1 = 1'}"`, this.ctx).done(() => {

				amiWebApp.flush();

				result.resolve();

			}).fail((message) => {

				result.reject(message);
			});
		}
		else
		{
			result.reject('Missing parameters: catalog, entity');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function()
	{
		$('#A2944C0A_9249_E4D2_3679_494C1A3AAAF0').html('Please sign-in.');
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

window.tableViewerApp = new TableViewerApp();

/*--------------------------------------------------------------------------------------------------------------------*/
