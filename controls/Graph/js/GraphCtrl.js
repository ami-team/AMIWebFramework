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
			amiWebApp.originURL + '/js/3rd-party/viz.min.js',
			amiWebApp.originURL + '/css/ami.min.css',
			amiWebApp.originURL + '/css/font-awesome.min.css',
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
				graph : typeof Viz !== 'undefined' ?  Viz(dotString, 'svg') : '',
			};

			/*--------------------------------------------------------------*/
			/* GRAPH POST TREATMENT                                         */
			/*--------------------------------------------------------------*/

			var regexp = /xlink:href="(\\"|[^"])*"/g;

			dict.graph = dict.graph.replace(/xlink:href="([^"]*)"/g, function(x, json) {

				var jsonbObj = JSON.parse(json.replace(/&quot;/g, '"'));

				var attrs = '';

				for(var key in jsonbObj)
				{
					attrs += ' data-' + key + '="' + jsonbObj[key] + '"';
				}

				return 'xlink:href="#"' + attrs;
			});

			/*--------------------------------------------------------------*/

			var doc = new DOMParser().parseFromString(dict.graph, "image/svg+xml");

			var svg = $(doc.documentElement);

			svg.find('a[data-icon]').each(function() {

				$('<tspan font-family="FontAwesome">' + String.fromCharCode('0x' + $(this).attr('data-icon')) + '</tspan><tspan> </tspan>').prependTo($(this).find('text'));
			});

			dict.graph = doc.documentElement.outerHTML;

			/*--------------------------------------------------------------*/

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
