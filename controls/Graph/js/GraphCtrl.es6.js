/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 *
 * @global Viz
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('GraphCtrl', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.Control,

	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/Graph/twig/GraphCtrl.twig',
			amiWebApp.originURL + '/js/3rd-party/viz.min.js',
			amiWebApp.originURL + '/css/ami.min.css',
			amiWebApp.originURL + '/css/font-awesome.min.css',
		], {context: this}).done((data) => {

			this.fragmentGraphCtrl = data[0];
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(selector, command, settings)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const [context] = amiWebApp.setup(['context'], [result], settings);

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.execute(command).done((data) => {

			let dotString = amiWebApp.jspath('..rowset{.@type==="graph"}.row.field{.@name==="dot"}.$', data)[0] || '';

			let dict = {
				graph : typeof Viz !== 'undefined' ?  Viz(dotString, 'svg') : '',
			};

			/*--------------------------------------------------------------------------------------------------------*/
			/* GRAPH POST TREATMENT                                                                                   */
			/*--------------------------------------------------------------------------------------------------------*/

			dict.graph = dict.graph.replace(/xlink:href="([^"]*)"/g, (x, json) => {

				let jsonbObj = JSON.parse(amiWebApp.htmlToText(json));

				let attrs = [];

				attrs.push('data-ctrl="' + amiWebApp.textToHtml(jsonbObj['data-ctrl']) + '"');
				attrs.push('data-ctrl-location="' + amiWebApp.textToHtml(jsonbObj['data-ctrl-location']) + '"');
				attrs.push('data-params="' + amiWebApp.textToHtml(JSON.stringify(jsonbObj['data-params'])) + '"');
				attrs.push('data-settings="' + amiWebApp.textToHtml(JSON.stringify(jsonbObj['data-settings'])) + '"');
				attrs.push('data-icon="' + amiWebApp.textToHtml(jsonbObj['data-icon']) + '"');
				attrs.push('data-title="' + amiWebApp.textToHtml(jsonbObj['data-title']) + '"');
				attrs.push('data-title-icon="' + amiWebApp.textToHtml(jsonbObj['data-title-icon']) + '"');

				return 'xlink:href="#" ' + attrs.join(' ');
			});

			/*--------------------------------------------------------------------------------------------------------*/

			let doc = new DOMParser().parseFromString(dict.graph, 'image/svg+xml');

			let svg = $(doc.documentElement);

			svg.find('a[data-title-icon]').each((i, el) => {

				$('<tspan font-family="FontAwesome">' + String.fromCharCode('0x' + $(el).attr('data-title-icon')) + '</tspan><tspan> </tspan>').prependTo($(el).find('text'));
			});

			dict.graph = doc.documentElement.outerHTML;

			/*--------------------------------------------------------------------------------------------------------*/

			this.replaceHTML(this._selector = selector, this.fragmentGraphCtrl, {dict: dict}).done(() => {

				$(selector + ' a[data-ctrl]').click((e) => {

					e.preventDefault();

					this.createControlFromWebLink(this.getParent(), e.currentTarget, this.ctx);
				});

				result.resolveWith(context, [data]);
			});

		}).fail((data) => {

			result.rejectWith(context, [data]);
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	}

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/