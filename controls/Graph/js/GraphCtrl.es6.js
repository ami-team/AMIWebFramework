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
 * @global Viz, saveAs
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
			amiWebApp.originURL + '/controls/Graph/twig/graph.twig',
			amiWebApp.originURL + '/js/3rd-party/viz.min.js',
			amiWebApp.originURL + '/css/ami.min.css',
			amiWebApp.originURL + '/css/font-awesome.min.css',
		], {context: this}).done((data) => {

			this.fragmentGraphCtrl = data[0];
			this.fragmentGraph = data[1];
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

//	render_old: function(selector, command, settings)
//	{
//		const result = $.Deferred();
//
//		/*------------------------------------------------------------------------------------------------------------*/
//
//		const [context] = amiWebApp.setup(['context'], [result], settings);
//
//		/*------------------------------------------------------------------------------------------------------------*/
//
//		amiCommand.execute(command).done((data) => {
//
//			const dotString = amiWebApp.jspath('..rowset{.@type==="graph"}.row.field{.@name==="dot"}.$', data)[0] || '';
//
//			const dict = {
//				graph : typeof Viz !== 'undefined' ? Viz(dotString, 'svg') : '',
//			};
//
//			/*--------------------------------------------------------------------------------------------------------*/
//			/* GRAPH POST TREATMENT                                                                                   */
//			/*--------------------------------------------------------------------------------------------------------*/
//
//			dict.graph = dict.graph.replace(/xlink:href="([^"]*)"/g, (x, json) => {
//
//				const jsonbObj = JSON.parse(amiWebApp.htmlToText(json));
//
//				const attrs = [
//					'data-ctrl="' + amiWebApp.textToHtml(jsonbObj['data-ctrl']) + '"',
//					'data-ctrl-location="' + amiWebApp.textToHtml(jsonbObj['data-ctrl-location']) + '"',
//					'data-params="' + amiWebApp.textToHtml(JSON.stringify(jsonbObj['data-params'])) + '"',
//					'data-settings="' + amiWebApp.textToHtml(JSON.stringify(jsonbObj['data-settings'])) + '"',
//					'data-icon="' + amiWebApp.textToHtml(jsonbObj['data-icon']) + '"',
//					'data-title="' + amiWebApp.textToHtml(jsonbObj['data-title']) + '"',
//					'data-title-icon="' + amiWebApp.textToHtml(jsonbObj['data-title-icon']) + '"',
//				];
//
//				return 'xlink:href="#" ' + attrs.join(' ');
//			});
//
//			/*--------------------------------------------------------------------------------------------------------*/
//
//			const doc = new DOMParser().parseFromString(dict.graph, 'image/svg+xml');
//
//			const svg = $(doc.documentElement);
//
//			svg.find('a[data-title-icon]').each((i, el) => {
//
//				$('<tspan font-family="FontAwesome">' + String.fromCharCode('0x' + $(el).attr('data-title-icon')) + '</tspan><tspan> </tspan>').prependTo($(el).find('text'));
//			});
//
//			dict.graph = doc.documentElement.outerHTML;
//
//			/*--------------------------------------------------------------------------------------------------------*/
//
//			this.replaceHTML(selector, this.fragmentGraphCtrl, {dict: dict}).done(() => {
//
//				$(selector + ' a[data-ctrl]').click((e) => {
//
//					e.preventDefault();
//
//					this.createControlFromWebLink(this.getParent(), e.currentTarget, this.ctx);
//				});
//
//				result.resolveWith(context, [data]);
//			});
//
//		}).fail((data) => {
//
//			result.rejectWith(context, [data]);
//		});
//
//		/*------------------------------------------------------------------------------------------------------------*/
//
//		return result.promise();
//	},

	/*----------------------------------------------------------------------------------------------------------------*/

    render: function(selector, command, settings)
    {
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const [context] = amiWebApp.setup(['context'], [result], settings);

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.execute(command).done((data) => {

			this.dotString = amiWebApp.jspath('..rowset{.@type==="graph"}.row.field{.@name==="dot"}.$', data)[0] || '';

			this.replaceHTML(selector, this.fragmentGraphCtrl).done(() => {

				/*----------------------------------------------------------------------------------------------------*/

				$(this.patchId('#A8E7C88D_7B78_B221_0BCB_6EF1F9CC3C15')).change((e) => {

					e.preventDefault();

					this.switchOrientation();
				});

				/*----------------------------------------------------------------------------------------------------*/

				$(this.patchId('#A0F6763F_DE29_5185_35C1_DCAA81E8C487')).click((e) => {

					e.preventDefault();

					this.exportGraph();
				});

				/*----------------------------------------------------------------------------------------------------*/

				this.display().done(() => {

					result.resolveWith(context, [data]);

				});

				/*----------------------------------------------------------------------------------------------------*/
			});

		}).fail((data) => {

			result.rejectWith(context, [data]);
		});

	/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();

    },
	/*----------------------------------------------------------------------------------------------------------------*/

    display: function()
    {
    	/*------------------------------------------------------------------------------------------------------------*/

        const result = $.Deferred();

        /*------------------------------------------------------------------------------------------------------------*/

		const dict = {
			graph : typeof Viz !== 'undefined' ? Viz(this.dotString, 'svg') : '',
		};

		/*------------------------------------------------------------------------------------------------------------*/
		/* GRAPH POST TREATMENT                                                                                       */
		/*------------------------------------------------------------------------------------------------------------*/

		dict.graph = dict.graph.replace(/xlink:href="([^"]*)"/g, (x, json) => {

			const jsonbObj = JSON.parse(amiWebApp.htmlToText(json));

			const attrs = [
				'data-ctrl="' + amiWebApp.textToHtml(jsonbObj['data-ctrl']) + '"',
				'data-ctrl-location="' + amiWebApp.textToHtml(jsonbObj['data-ctrl-location']) + '"',
				'data-params="' + amiWebApp.textToHtml(JSON.stringify(jsonbObj['data-params'])) + '"',
				'data-settings="' + amiWebApp.textToHtml(JSON.stringify(jsonbObj['data-settings'])) + '"',
				'data-icon="' + amiWebApp.textToHtml(jsonbObj['data-icon']) + '"',
				'data-title="' + amiWebApp.textToHtml(jsonbObj['data-title']) + '"',
				'data-title-icon="' + amiWebApp.textToHtml(jsonbObj['data-title-icon']) + '"',
			];

			return 'xlink:href="#" ' + attrs.join(' ');
		});

		/*--------------------------------------------------------------------------------------------------------*/

		const doc = new DOMParser().parseFromString(dict.graph, 'image/svg+xml');

		const svg = $(doc.documentElement);

		svg.find('a[data-title-icon]').each((i, el) => {

			$('<tspan font-family="FontAwesome">' + String.fromCharCode('0x' + $(el).attr('data-title-icon')) + '</tspan><tspan> </tspan>').prependTo($(el).find('text'));
		});

		dict.graph = doc.documentElement.outerHTML;

		/*--------------------------------------------------------------------------------------------------------*/

		this.replaceHTML(this.patchId('#A0F6763F_DE29_5185_35C1_DCAA81E8C487'), this.fragmentGraph, {dict: dict}).done(() => {

			$(this.patchId('#A0F6763F_DE29_5185_35C1_DCAA81E8C487') + ' a[data-ctrl]').click((e) => {

				e.preventDefault();

				this.createControlFromWebLink(this.getParent(), e.currentTarget, this.ctx);
			});

			result.resolveWith(this, [result]);
		});

		return result.promise();
    },

	/*----------------------------------------------------------------------------------------------------------------*/

	switchOrientation: function()
    {
     	const result = $.Deferred();

     	const regex = new RegExp('(.*\s*rankdir\s*=\s*")([L][R]|[T][B])("\s*.*)');

     	const orientation = this.dotString.match(regex)[2];

     	/*------------------------------------------------------------------------------------------------------------*/

     	if(orientation === 'LR' )
     	{
     		this.dotString = this.dotString.replace(regex, '$1TB$3');
     	}
     	else if(orientation === 'TB' )
     	{
			this.dotString = this.dotString.replace(regex, '$1LR$3');
     	}

		this.display().done(() => {
			result.resolveWith(this, [result]);
		});

		return result.promise();
    },

	/*----------------------------------------------------------------------------------------------------------------*/

	exportGraph: function()
	{
		const image = Viz(this.dotString, { format: 'png-image-element' });

		const blob = new Blob([image], {
			type: 'image/png',
			endings : 'native',
		});

		saveAs(blob, 'graph.png');
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/