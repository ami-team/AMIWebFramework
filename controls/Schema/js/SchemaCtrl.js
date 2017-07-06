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

/*-------------------------------------------------------------------------*/

$AMIClass('SchemaCtrl', {
	/*-----------------------------------------------------------------*/

	$implements: [ami.IControl],

	/*-----------------------------------------------------------------*/

	$init: function()
	{
		this.suffix = amiWebApp._now++;
	},

	/*-----------------------------------------------------------------*/

	patchId: function(id)
	{
		return id + '__' + this.suffix;
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
		return amiWebApp.loadTWIGs([
			'controls/Schema/twig/SchemaCtrl.twig',
		], {context: this}).done(function(data) {

			/* TODO */
		});
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
