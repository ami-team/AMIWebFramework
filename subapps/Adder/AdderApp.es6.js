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

import twigAdderApp from './assets/twig/AdderApp.twig';

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('AdderApp', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function()
	{
		this.$super.$init();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		const result = $.Deferred();

		amiWebApp.loadResources([
			'ctrl:adder'
		]).done((data) => {

			amiWebApp.replaceHTML('#ami_main_content', twigAdderApp).done(() => {

				this.adder = new data[0]();

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

		if(this.ctx.catalog && this.ctx.entity && this.ctx.field)
		{
			this.adder.render('#C9BBC18B_2959_A48E_9059_9FC08D667935', this.ctx.catalog, this.ctx.entity, this.ctx.field, this.ctx).done(() => {

				amiWebApp.flush();

				result.resolve();

			}).fail((message) => {

				result.reject(message);
			});
		}
		else
		{
			result.reject('Missing parameters: catalog, entity, field');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function()
	{
		$('#C9BBC18B_2959_A48E_9059_9FC08D667935').html('Please sign-in.');
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

window.adderApp = new AdderApp();

/*--------------------------------------------------------------------------------------------------------------------*/
