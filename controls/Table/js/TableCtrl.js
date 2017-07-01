/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/

$AMIClass('TableCtrl', {
	/*-----------------------------------------------------------------*/

	$implements: [ami.IControl],

	/*-----------------------------------------------------------------*/

	suffix: amiWebApp.getNewSuffix(),

	/*-----------------------------------------------------------------*/

	patchId: function(id)
	{
		return id + '_' + this.suffix;
	},

	/*-----------------------------------------------------------------*/

	replaceHTML: function(selector, twig, settings)
	{
		if(!settings)
		{
			settings = {};
		}

		settings.suffix = this.suffix;

		return amiWebApp.replaceHTML(selector, twig, settings);
	},

	/*-----------------------------------------------------------------*/

	prependHTML: function(selector, twig, settings)
	{
		if(!settings)
		{
			settings = {};
		}

		settings.suffix = this.suffix;

		return amiWebApp.prependHTML(selector, twig, settings);
	},

	/*-----------------------------------------------------------------*/

	appendHTML: function(selector, twig, settings)
	{
		if(!settings)
		{
			settings = {};
		}

		settings.suffix = this.suffix;

		return amiWebApp.appendHTML(selector, twig, settings);
	},

	/*-----------------------------------------------------------------*/

	onReady: function()
	{
		/*---------------------------------------------------------*/

		amiWebApp.loadScripts([
		]);

		amiWebApp.loadSheets([
			'subapps/Table/css/TableApp.css',
		]);

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		amiWebApp.loadTWIGs([
			'controls/Table/twig/TableCtrl.twig',
		], {context: this}).done(function(data) {

			/* TODO */

			result.resolve();

		}).fail(function() {

			result.reject();
		});

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	$init: function()
	{
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
