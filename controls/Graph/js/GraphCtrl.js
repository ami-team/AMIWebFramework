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

				var jsonbObj = JSON.parse(amiWebApp.htmlToText(json));

				var attrs = [];

				attrs.push('data-ctrl="' + amiWebApp.textToHtml(jsonbObj['data-ctrl']) + '"');
				attrs.push('data-ctrl-location="' + amiWebApp.textToHtml(jsonbObj['data-ctrl-location']) + '"');
				attrs.push('data-params="' + amiWebApp.textToHtml(JSON.stringify(jsonbObj['data-params'])) + '"');
				attrs.push('data-settings="' + amiWebApp.textToHtml(JSON.stringify(jsonbObj['data-settings'])) + '"');
				attrs.push('data-icon="' + amiWebApp.textToHtml(jsonbObj['data-icon']) + '"');
				attrs.push('data-title="' + amiWebApp.textToHtml(jsonbObj['data-title']) + '"');
				attrs.push('data-title-icon="' + amiWebApp.textToHtml(jsonbObj['data-title-icon']) + '"');

				return 'xlink:href="#" ' + attrs.join(' ');
			});

			/*--------------------------------------------------------------*/

			var doc = new DOMParser().parseFromString(dict.graph, "image/svg+xml");

			var svg = $(doc.documentElement);

			svg.find('a[data-title-icon]').each(function() {

				$('<tspan font-family="FontAwesome">' + String.fromCharCode('0x' + $(this).attr('data-title-icon')) + '</tspan><tspan> </tspan>').prependTo($(this).find('text'));
			});

			dict.graph = doc.documentElement.outerHTML;

			/*--------------------------------------------------------------*/

			this.replaceHTML(this._selector = selector, this.fragmentGraphCtrl, {context: this, dict: dict}).done(function() {

				var _this = this;

				$(selector + ' a[data-ctrl]').click(function(e) {

					e.preventDefault();

					_this.createControlFromWebLink(_this.getParent(), this, _this.ctx);
				});

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
