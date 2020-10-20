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
		]).done((data) => {

			this.fragmentGraphCtrl = data[0];
			this.fragmentGraph = data[1];
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

    render: function(selector, command, settings)
    {
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const [context, direction] = amiWebApp.setup(['context', 'direction'], [result, 'LR'], settings);

		this.direction = direction;

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.execute(command).done((data) => {

			/*--------------------------------------------------------------------------------------------------------*/

			if((this.dotString = amiWebApp.jspath('..rowset{.@type==="graph"}.row.field{.@name==="dot"}.$', data)[0] || '') !== '')
			{
				this.mode='dot';
			}
			else
			{
				this.json = data;
				this.dotString = this.jsonToDot(this.json,'');
				this.mode = 'json';
			}

			/*--------------------------------------------------------------------------------------------------------*/

			this.replaceHTML(selector, this.fragmentGraphCtrl, {dict: {mode: this.mode}}).done(() => {

				/*----------------------------------------------------------------------------------------------------*/

				$(this.patchId('#A8E7C88D_7B78_B221_0BCB_6EF1F9CC3C15')).change((e) => {

					e.preventDefault();

					this.switchDirection();
				});

				/*----------------------------------------------------------------------------------------------------*/

				$(this.patchId('#E90168C4_E4BD_ACC8_085F_9953D6CF789F')).click((e) => {

					e.preventDefault();

					this.exportSVG();
				});

				$(this.patchId('#D68E49F9_A0C7_C15D_8323_8BA215856428')).click((e) => {

					e.preventDefault();

					this.exportPNG();
				});

				/*----------------------------------------------------------------------------------------------------*/
				/* FILTER                                                                                             */
				/*----------------------------------------------------------------------------------------------------*/

				$(this.patchId('#EC45916B_DC77_AD27_8117_E84FC2598196')).click((e) => {

					e.preventDefault();

					this.dotString = this.jsonToDot(this.json,$('#' + this.patchId('D9256B01_3DBE_6E51_AA91_B2F80944607D')).val().trim());
					this.display();
				});

				$(this.patchId('#D9256B01_3DBE_6E51_AA91_B2F80944607D')).keypress((e) => {

					if(e.keyCode == 13)
					{
						this.dotString = this.jsonToDot(this.json,$('#' + this.patchId('D9256B01_3DBE_6E51_AA91_B2F80944607D')).val().trim());
                        this.display();
					}
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

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

        const result = $.Deferred();

        /*------------------------------------------------------------------------------------------------------------*/

        this.graph = typeof Viz !== 'undefined' ? Viz(this.dotString, 'svg') : '';

		/*------------------------------------------------------------------------------------------------------------*/
		/* GRAPH POST TREATMENT                                                                                       */
		/*------------------------------------------------------------------------------------------------------------*/

		this.graph = this.graph.replace(/xlink:href="([^"]*)"/g, (x, json) => {

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

		const doc = new DOMParser().parseFromString(this.graph, 'image/svg+xml');

		const svg = $(doc.documentElement);

		svg.find('a[data-title-icon]').each((i, el) => {

			$('<tspan font-family="FontAwesome">' + String.fromCharCode('0x' + $(el).attr('data-title-icon')) + '</tspan><tspan> </tspan>').prependTo($(el).find('text'));
		});

		this.graph = doc.documentElement.outerHTML;

        /*------------------------------------------------------------------------------------------------------------*/

		const dict = {
			graph : this.graph,
		};

		/*--------------------------------------------------------------------------------------------------------*/

		this.replaceHTML(this.patchId('#A0F6763F_DE29_5185_35C1_DCAA81E8C487'), this.fragmentGraph, {dict: dict}).done(() => {

			$(this.patchId('#A0F6763F_DE29_5185_35C1_DCAA81E8C487') + ' a[data-ctrl]').click((e) => {

				e.preventDefault();

				this.createControlFromWebLink(this.getParent(), e.currentTarget, this.ctx);
			});

			/*--------------------------------------------------------------------------------------------------------*/

			amiWebApp.unlock();

			/*--------------------------------------------------------------------------------------------------------*/

			result.resolveWith(this, [result]);
		});

		return result.promise();
    },

	/*----------------------------------------------------------------------------------------------------------------*/

	switchDirection: function()
    {
     	/*------------------------------------------------------------------------------------------------------------*/

     	const regex = new RegExp('(.*\s*rankdir\s*=\s*")([L][R]|[T][B])("\s*.*)');

     	const direction = this.dotString.match(regex)[2];

     	/*------------------------------------------------------------------------------------------------------------*/

     	if(direction === 'LR' )
     	{
     		this.dotString = this.dotString.replace(regex, '$1TB$3');
     		this.direction = 'TB';
     	}
     	else if(direction === 'TB' )
     	{
			this.dotString = this.dotString.replace(regex, '$1LR$3');
			this.direction = 'LR';
     	}

		this.display();
    },

	/*----------------------------------------------------------------------------------------------------------------*/

	exportSVG: function()
	{
		const blob = new Blob([this.graph], {
			type: 'image/svg+xml',
			endings : 'native',
		});

		saveAs(blob, 'graph.svg');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	exportPNG: function()
	{
		Viz.svgXmlToPngBase64(this.graph, 1, this._exportPNG);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_exportPNG: function(err, data)
    {
		let binary_string = window.atob(data);
		let len = binary_string.length;
		let bytes = new Uint8Array(len);

		for(let i = 0; i < len; i++)
		{
			bytes[i] = binary_string.charCodeAt(i);
		}

		const blob = new Blob([bytes.buffer], {
			type: 'image/png',
			endings : 'native',
		});

		saveAs(blob, 'graph.png');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	jsonToDot: function(json, filter)
    {
		let nodes = amiWebApp.jspath('..rowset{.@type==="node"}.row', json) || [];
		let edges = amiWebApp.jspath('..rowset{.@type==="edge"}.row', json) || [];

		/*------------------------------------------------------------------------------------------------------------*/
		/* INIT STRUCTURE                                                                                             */
		/*------------------------------------------------------------------------------------------------------------*/

		let filteredGraph = new Map();

		[...edges].forEach((edge) => {

			let source = amiWebApp.jspath('..field{.@name==="SOURCE"}.$', edge)[0] || '';
			let destination = amiWebApp.jspath('..field{.@name==="DESTINATION"}.$', edge)[0] || '';

			let destinations;

			if(filteredGraph.has(source))
			{
				destinations = filteredGraph.get(source);
			}
			else
			{
				destinations = [];
			}

			destinations.push(destination);
			filteredGraph.set(source, destinations);
		});

		/*------------------------------------------------------------------------------------------------------------*/

    	let dot = 'digraph "provenance" {graph [rankdir="' + this.direction + '", ranksep="0.30"]; node [width="7.5em",height="0.3em", fontcolor="#004bffff", fontname="Arial", fontsize="10.0", shape="rectangle"];';

		/*------------------------------------------------------------------------------------------------------------*/

		const regex = new RegExp(filter);

		[...nodes].forEach((node) => {

			let label = amiWebApp.jspath('..field{.@name==="LABEL"}.$', node)[0] || '';

			/*--------------------------------------------------------------------------------------------------------*/
			/* DO EDGE FILTERING                                                                                      */
			/*--------------------------------------------------------------------------------------------------------*/

			if(filter !== '' && !regex.test(label))
			{
				let substitution = filteredGraph.get(label) || '';
				filteredGraph.delete(label);

				filteredGraph.forEach((children, source) => {

					[...children].forEach((child,idx) => {

						if(child === label)
						{
							if(substitution === '')
							{
								filteredGraph.set(source, children.slice(0, idx).concat(children.slice(idx + 1)));
							}
							else
							{
								filteredGraph.set(source, children.slice(0, idx).concat(substitution).concat(children.slice(idx + 1)));
							}
						}
					});
                 });
			}
			else
			{
				/*----------------------------------------------------------------------------------------------------*/

				dot += '"' + label + '" '
					+ '[ '
					+ 'color="' + (amiWebApp.jspath('..field{.@name==="COLOUR"}.$', node)[0] || '') + '", '
					+ 'label="' + label + '" ';

					if((amiWebApp.jspath('..field{.@name==="DISTANCE"}.$', node)[0] || '') === '0')
					{
						dot += ', style ="filled, rounded"';
					}
					else
					{
						dot += ', style ="filled"';
					}

					dot	+= ', URL="' + this.url(
											(amiWebApp.jspath('..field{.@name==="IDENTIFIER"}.$', node)[0] || ''),
											(amiWebApp.jspath('..field{.@name==="CATALOG"}.$', node)[0] || ''),
											(amiWebApp.jspath('..field{.@name==="ICON"}.$', node)[0] || ''),
										  ) + '" ';

				dot += ']';

				/*----------------------------------------------------------------------------------------------------*/
    		}
    	});

    	/*------------------------------------------------------------------------------------------------------------*/

		filteredGraph.forEach((destinations,source) => {

			[...destinations].forEach((destination) => {

			let edge = (amiWebApp.jspath('..{.field{.@name === "SOURCE"}.$ === "'+ source +'" && .field{.@name === "DESTINATION"}.$ === "'+ destination +'"}', edges)[0] || '');

			dot += '"' + source + '" '
				+ '->'
				+ '"' + destination + '" '
				+ (edge === '' ? '[style="dashed"]' : '')
			})
		});

    	/*------------------------------------------------------------------------------------------------------------*/

    	dot += '}';

    	/*------------------------------------------------------------------------------------------------------------*/

    	return dot;
    },

	/*----------------------------------------------------------------------------------------------------------------*/

	url: function(id, catalog, icon)
	{
		return '{&quot;data-ctrl&quot;:&quot;elementInfo&quot;, '
			 + '&quot;data-params&quot;:[&quot;' + catalog + '&quot;, &quot;dataset&quot;, &quot;identifier&quot;, &quot;' + id + '&quot;], '
			 + '&quot;data-settings&quot;: {'
			 + '&quot;expandedLinkedElements&quot;: ['
			 + '{&quot;catalog&quot;: &quot;'+ catalog + '&quot;, '
			 + '&quot;entity&quot;: &quot;physicsParameterVals&quot;, '
			 + '&quot;fields&quot;: [&quot;paramName&quot;, &quot;paramValue&quot;, &quot;units&quot;, &quot;physicsGroup&quot;], '
			 + '&quot;keyValMode&quot;:true'
			 + '}, {'
			 + '&quot;catalog&quot;: &quot;' + catalog + '&quot;, '
			 + '&quot;entity&quot;: &quot;dataset_extra&quot;, '
			 + '&quot;fields&quot;: [&quot;field&quot;, &quot;value&quot;], '
			 + '&quot;keyValMode&quot;:true'
			 + '}]}, '
			 + '&quot;data-icon&quot;: &quot;arrows-alt&quot;, '
			 + '&quot;data-title&quot;: &quot;dataset&quot; '
			 + ('' === icon ? '' : ', &quot;data-title-icon&quot;: &quot;' + icon + '&quot;')
			 + '}';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

});

/*--------------------------------------------------------------------------------------------------------------------*/