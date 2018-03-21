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

$AMIClass('GraphCtrl', {
	/*-----------------------------------------------------------------*/

	$extends: ami.Control,

	/*-----------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);
	},

	/*-----------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/Graph/twig/GraphCtrl.twig',
			amiWebApp.originURL + '/js/3rd-party/viz.min.js'
		], {context: this}).done(function(data) {

			this.fragmentGraphCtrl = data[0];
		});
	},

	/*-----------------------------------------------------------------*/

	render: function(selector, command, settings)
	{
		var result = $.Deferred();

		var context = result;

		if(settings)
		{
			if('context' in settings) {
				context = settings['context'];
			}
		}

		amiCommand.execute(command, {context: this}).done(function(data) {

			var dotString = amiWebApp.jspath('..rowset{.@type==="graph"}.row.field{.@name==="dot"}.$', data)[0] || '';

			var dict = {
				graph : typeof Viz !== 'undefined' ?  Viz(dotString, 'svg', {scale: 0.5}) : '',
			};

			this.replaceHTML(this._selector = selector, this.fragmentGraphCtrl, {dict: dict}).done(function() {

				result.resolveWith(context, [data]);
			});

		}).fail(function(data) {

			result.rejectWith(context, [data]);
		});

		return result.promise();
	}

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
