/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * http://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/
 *
 ***********************************************************************************************************************
 * INSTALL TOOLS                                                                                                       *
 ***********************************************************************************************************************
 *
 * add-apt-repository ppa:ubuntugis/ubuntugis-unstable
 * apt-get install gdal-bin
 * npm install -g topojson
 *
 ***********************************************************************************************************************
 * GENERATE MAP                                                                                                        *
 ***********************************************************************************************************************
 *
 * ogr2ogr -f GeoJSON countries.json ne_110m_admin_0_countries.shp
 * topojson -o world.json --id-property iso_n2 --properties name=name -- countries.json
 *
 ***********************************************************************************************************************
 *
 * @global d3, topojson, CanvasJS
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('MonitoringApp', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		this._confFile = 'nodes.json';

		this._extraTitle = /*-*/''/*-*/;

		/*------------------------------------------------------------------------------------------------------------*/

		if(userdata)
		{
			try
			{
				const json = JSON.parse(userdata);

				if(json.conf_file)
				{
					this._confFile = json.conf_file;
				}

				if(json.extra_title)
				{
					this._extraTitle = json.extra_title;
				}
			}
			catch(message)
			{
				/* IGNORE */
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		const result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/Monitoring/twig/MonitoringApp.twig',
			'subapps/Monitoring/css/MonitoringApp.css',
			'js/3rd-party/d3.min.js',
			'js/3rd-party/d3-geo.min.js',
			'js/3rd-party/topojson.v1.min.js',
			'js/3rd-party/canvasjs.min.js',
		]).done((data) => {

			amiWebApp.replaceHTML('#ami_main_content', data[0]).done(() => {

				/*----------------------------------------------------------------------------------------------------*/

				$('#AF46CD08_34D4_E172_7426_8D528BD6BF2D').text(this._extraTitle);

				/*----------------------------------------------------------------------------------------------------*/

				this._reloadTime = 4 * 60 * 60 * 1000;

				this._interval = 2500;

				this._nodes = [
				];

				/*----------------------------------------------------------------------------------------------------*/

				this._countryHeatmap = d3.scaleLinear()
				                         .domain([0.0, 1.0])
				                         .range(['LavenderBlush', 'OrangeRed'])
				;

				this._earthOrigin = [
					+6.808024259734162,
					-43.135963697215246,
				];

				this._earthVelocity = [
					0.002,
					0.000,
				];

				this._earthLock = 0;

				this._earthTime = 0;

				/*----------------------------------------------------------------------------------------------------*/

				result.resolve();
			});

		}).fail((message) => {

			result.reject(message);
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function()
	{
		if($('#E86BAEDC_5386_454F_318B_3337E7B1CFB3').is(':empty'))
		{
			this._stage1();
			this._stage2();

			$(window).resize(() => {

				monitoringApp._stage2();
			});
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function()
	{
		if($('#E86BAEDC_5386_454F_318B_3337E7B1CFB3').is(':empty'))
		{
			this._stage1();
			this._stage2();

			$(window).resize(() => {

				monitoringApp._stage2();
			});
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	__handler: function(deferred, data, frontNr, frontOK, webNr, webOk, taskNr, taskOk)
	{
		const i = data.length;

		if(i < this._nodes.length)
		{
			const service = this._nodes[i].service;
			const endpoint = this._nodes[i].endpoint;

			amiCommand.execute('GetSessionInfo', {endpoint: endpoint, timeout: 15000}).done(() => {

				/*----------------------------------------------------------------------------------------------------*/

				data.push(1);

				/**/ if(service === 'front')
				{
					this.__handler(deferred, data, frontNr + 1, frontOK + 1, webNr + 0, webOk + 0, taskNr + 0, taskOk + 0);
				}
				else if(service === 'web')
				{
					this.__handler(deferred, data, frontNr + 0, frontOK + 0, webNr + 1, webOk + 1, taskNr + 0, taskOk + 0);
				}
				else if(service === 'task')
				{
					this.__handler(deferred, data, frontNr + 0, frontOK + 0, webNr + 0, webOk + 0, taskNr + 1, taskOk + 1);
				}
				else
				{
					this.__handler(deferred, data, frontNr + 0, frontOK + 0, webNr + 0, webOk + 0, taskNr + 0, taskOk + 0);
				}

				/*----------------------------------------------------------------------------------------------------*/

			}).fail(() => {

				/*----------------------------------------------------------------------------------------------------*/

				data.push(0);

				/**/ if(service === 'front')
				{
					this.__handler(deferred, data, frontNr + 1, frontOK + 0, webNr + 0, webOk + 0, taskNr + 0, taskOk + 0);
				}
				else if(service === 'web')
				{
					this.__handler(deferred, data, frontNr + 0, frontOK + 0, webNr + 1, webOk + 0, taskNr + 0, taskOk + 0);
				}
				else if(service === 'task')
				{
					this.__handler(deferred, data, frontNr + 0, frontOK + 0, webNr + 0, webOk + 0, taskNr + 1, taskOk + 0);
				}
				else
				{
					this.__handler(deferred, data, frontNr + 0, frontOK + 0, webNr + 0, webOk + 0, taskNr + 0, taskOk + 0);
				}

				/*----------------------------------------------------------------------------------------------------*/
			});
		}
		else
		{
			deferred.resolveWith(this, [data, frontNr, frontOK, webNr, webOk, taskNr, taskOk]);
		}

		return deferred;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_handler: function()
	{
		this.__handler($.Deferred(), [], 0, 0, 0, 0, 0, 0).done(function(data, frontNr, frontOK, webNr, webOk, taskNr, taskOk) {

			/*--------------------------------------------------------------------------------------------------------*/

			if(frontNr === 0)
			{
				this._chart0.options.data[0].dataPoints[0].y = 1;
				this._chart0.options.data[0].dataPoints[1].y = 0;
			}
			else
			{
				this._chart0.options.data[0].dataPoints[0].y = frontOK;
				this._chart0.options.data[0].dataPoints[1].y = frontNr - frontOK;
			}

			this._chart0.render();

			/*--------------------------------------------------------------------------------------------------------*/

			if(webNr === 0)
			{
				this._chart1.options.data[0].dataPoints[0].y = 1;
				this._chart1.options.data[0].dataPoints[1].y = 0;
			}
			else
			{
				this._chart1.options.data[0].dataPoints[0].y = webOk;
				this._chart1.options.data[0].dataPoints[1].y = webNr - webOk;
			}

			this._chart1.render();

			/*--------------------------------------------------------------------------------------------------------*/

			if(taskNr === 0)
			{
				this._chart2.options.data[0].dataPoints[0].y = 1;
				this._chart2.options.data[0].dataPoints[1].y = 0;
			}
			else
			{
				this._chart2.options.data[0].dataPoints[0].y = taskOk;
				this._chart2.options.data[0].dataPoints[1].y = taskNr - taskOk;
			}

			this._chart2.render();

			/*--------------------------------------------------------------------------------------------------------*/

			const now = new Date();

			/*--------------------------------------------------------------------------------------------------------*/

			let j = 0;
			let k = 0;

			for(let i in this._nodes)
			{
				if(this._nodes[i].service === 'front')
				{
					this._chart4.options.data[j++].dataPoints.push({x: now, y: data[i]});
				}
				else
				{
					this._chart3.options.data[k++].dataPoints.push({x: now, y: data[i]});
				}
			}

			this._chart3.render();
			this._chart4.render();

			/*--------------------------------------------------------------------------------------------------------*/
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_stage1: function()
	{
		amiWebApp.loadJSONs([
			this._confFile
		]).done((data) => {

			/*--------------------------------------------------------------------------------------------------------*/
			/* GET NODES                                                                                              */
			/*--------------------------------------------------------------------------------------------------------*/

			const rows = amiWebApp.jspath('..row', data[0]);

			const series1 = [];
			const series2 = [];

			let numberOfFronts = 0;
			let numberOfWebNodes = 0;
			let numberOfTaskNodes = 0;

			rows.forEach((i, row) => {

				const node = amiWebApp.jspath('..field{.@name==="node"}.$', row)[0] || '';
				const service = amiWebApp.jspath('..field{.@name==="service"}.$', row)[0] || '';
				const endpoint = amiWebApp.jspath('..field{.@name==="endpoint"}.$', row)[0] || '';

				/**/ if(service === 'front') {
					numberOfFronts++;
				}
				else if(service === 'web') {
					numberOfWebNodes++;
				}
				else if(service === 'task') {
					numberOfTaskNodes++;
				}

				this._nodes.push({
					node: node,
					service: service,
					endpoint: endpoint,
				});

				if(service === 'front')
				{
					series2.push({
						type: 'stackedArea',
						name: service + '::' + node,
						showInLegend: true,
						markerType: null,
						dataPoints: [],
					});
				}
				else
				{
					series1.push({
						type: 'stackedArea',
						name: service + '::' + node,
						showInLegend: true,
						markerType: null,
						dataPoints: [],
					});
				}
			});

			/*--------------------------------------------------------------------------------------------------------*/
			/* BUILD CHARTS                                                                                           */
			/*--------------------------------------------------------------------------------------------------------*/

			this._chart0 = new CanvasJS.Chart('E4EB0C21_133E_4F03_6865_53258FC536A6', {
				backgroundColor: 'transparent',
				data: [{
					type: 'doughnut',
					indexLabel: '{label} #percent%',
					indexLabelFontSize: 14,
					indexLabelFontFamily: 'Garamond',
					dataPoints: [
						{y: 0, label: 'Up'},
						{y: 0, label: 'Down'},
					],
				}],
				title: {
					text: numberOfFronts + ' front(s)',
					horizontalAlign: 'center',
				},
				toolTip:{
					enabled: false,
				},
			});

			this._chart0.render();

			/*--------------------------------------------------------------------------------------------------------*/

			this._chart1 = new CanvasJS.Chart('E86BAEDC_5386_454F_318B_3337E7B1CFB3', {
				backgroundColor: 'transparent',
				data: [{
					type: 'doughnut',
					indexLabel: '{label} #percent%',
					indexLabelFontSize: 14,
					indexLabelFontFamily: 'Garamond',
					dataPoints: [
						{y: 0, label: 'Up'},
						{y: 0, label: 'Down'},
					],
				}],
				title: {
					text: numberOfWebNodes + ' web node(s)',
					horizontalAlign: 'center',
				},
				toolTip:{
					enabled: false,
				},
			});

			this._chart1.render();

			/*--------------------------------------------------------------------------------------------------------*/

			this._chart2 = new CanvasJS.Chart('CDB3AD94_DC62_215E_E9EA_AACDF05E542A', {
				backgroundColor: 'transparent',
				data: [{
					type: 'doughnut',
					indexLabel: '{label} #percent%',
					indexLabelFontSize: 14,
					indexLabelFontFamily: 'Garamond',
					dataPoints: [
						{y: 0, label: 'Up'},
						{y: 0, label: 'Down'},
					],
				}],
				title: {
					text: numberOfTaskNodes + ' task node(s)',
					horizontalAlign: 'center',
				},
				toolTip:{
					enabled: false,
				},
			});

			this._chart2.render();

			/*--------------------------------------------------------------------------------------------------------*/

			this._chart3 = new CanvasJS.Chart('A8F5DC0E_F1D2_7220_29F0_C86DD93A23E2', {
				axisX: {
					labelAngle: -50,
					valueFormatString: 'H:m',
				},
				axisY: {
					minimum: 0,
					maximum: series1.length,
					interval: 1,
					title: 'Node availability',
				},
				backgroundColor: 'transparent',
				data: series1,
				zoomEnabled: true,
			});

			this._chart3.render();

			/*--------------------------------------------------------------------------------------------------------*/

			this._chart4 = new CanvasJS.Chart('C3C51231_AEE3_FD2E_20F3_39FDECA45987', {
				axisX: {
					labelAngle: -50,
					valueFormatString: 'H:m',
				},
				axisY: {
					minimum: 0,
					maximum: series2.length,
					interval: 1,
					title: 'Service availability',
				},
				backgroundColor: 'transparent',
				data: series2,
				zoomEnabled: true,
			});

			this._chart4.render();

			/*--------------------------------------------------------------------------------------------------------*/
			/* EXECUTE HANDLERS                                                                                       */
			/*--------------------------------------------------------------------------------------------------------*/

			let sum = 0

			setInterval(() => {

				if(sum < this._reloadTime)
				{
					sum += this._interval;

					this._handler();
				}
				else
				{
					location.reload();
				}

			}, this._interval);

			/*--------------------------------------------------------------------------------------------------------*/

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_stage2: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		const l = 350;

		/*------------------------------------------------------------------------------------------------------------*/

		const svg = d3.select('#A7CB3444_3882_26FF_F3AF_52278A0F37C1').html('')
		                                                            .append('svg')
		                                                            .attr('style', 'margin: 0.5rem 0; height: calc(40vh - 8rem);')
		                                                            .attr('viewBox', '0, 0, ' + l + ', ' + l)
		;

		/*------------------------------------------------------------------------------------------------------------*/

		const g = svg.append('g');

		/*------------------------------------------------------------------------------------------------------------*/

		const projection = d3.geoOrthographic()
		                   .scale(l / 2 - 1)
		                   .translate([l / 2, l / 2])
		                   .rotate(this._earthOrigin)
		                   .clipAngle(90)
		                   .precision(0.1)
		;

		const projectionPath = d3.geoPath().projection(projection);

		/*------------------------------------------------------------------------------------------------------------*/

		g.append('path')
		 .datum({type: 'Sphere'})
		 .attr('class', 'background')
		 .attr('d', projectionPath)
		;

		g.append('path')
		 .datum(d3.geoGraticule())
		 .attr('class', 'graticule')
		 .attr('d', projectionPath)
		;

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.execute('GetUserStats').done((data) => {

			/*--------------------------------------------------------------------------------------------------------*/
			/* USERS                                                                                                  */
			/*--------------------------------------------------------------------------------------------------------*/

			const  valid  = parseInt(amiWebApp.jspath('..rowset{.@type==="users"}.row.field{.@name=== "valid" }.$', data)[0] || '0');
			const invalid = parseInt(amiWebApp.jspath('..rowset{.@type==="users"}.row.field{.@name==="invalid"}.$', data)[0] || '0');

			const total = valid + invalid;

			/*--------------------------------------------------------------------------------------------------------*/

			$('#A8CB8D03_D1C5_D3D3_7625_218092ADFAFB').html(valid);
			$('#E46EBCE9_49B2_0CBF_7075_2340916CD5CF').html(total);

			/*--------------------------------------------------------------------------------------------------------*/
			/* COUNTRIES                                                                                              */
			/*--------------------------------------------------------------------------------------------------------*/

			const rows = amiWebApp.jspath('..rowset{.@type=== "countries"}..row', data);

			const score = {};

			let max = 0;

			rows.forEach((i, row) => {

				const code = /*----*/(amiWebApp.jspath('..field{.@name==="code"}.$', row)[0] || 'N/A');
				const z    = parseInt(amiWebApp.jspath('..field{.@name==="z"   }.$', row)[0] || '0x0');

				score[code] = z;

				if(code.length === 2 && max < z)
				{
					max = z;
				}
			});

			/*--------------------------------------------------------------------------------------------------------*/

			amiWebApp.loadJSONs([
				'subapps/Monitoring/data/world.json'
			]).done((data) => {

				/*----------------------------------------------------------------------------------------------------*/

				const countries = topojson.feature(data[0], data[0].objects.countries).features;

				/*----------------------------------------------------------------------------------------------------*/

				this._drawWorld(svg, g, projection, projectionPath, 'country', countries, score, max);

				/*----------------------------------------------------------------------------------------------------*/

				setInterval(() => {

					if(this._earthLock === 0)
					{
						projection.rotate([
							this._earthOrigin[0] + this._earthVelocity[0] * this._earthTime,
							this._earthOrigin[1] + this._earthVelocity[1] * this._earthTime,
						]);

						svg.selectAll('path').attr('d', projectionPath);

						this._earthTime += 2500;
					}

				}, 2500);

				/*----------------------------------------------------------------------------------------------------*/
			});

			/*--------------------------------------------------------------------------------------------------------*/

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_drawWorld: function(svg, g, projection, projectionPath, className, featureSet, data, max)
	{
		const set = g.selectAll('.' + className)
		           .data(featureSet)
		           .enter()
		           .append('g')
		           .attr('class', className)
		;

		set.append('path')
		   .attr('class', 'land')
		   .attr('d', projectionPath)
		;

		set.append('path')
		   .attr('class', 'overlay')
		   .attr('d', projectionPath)

		   /*---------------------------------------------------------------------------------------------------------*/
		   /* STYLE                                                                                                   */
		   /*---------------------------------------------------------------------------------------------------------*/

		   .attr('style', (d) => {

				return 'fill: ' + (data[d.id] ? this._countryHeatmap(data[d.id] / max) : 'white');
		    })

		   /*---------------------------------------------------------------------------------------------------------*/
		   /* CLICK                                                                                                   */
		   /*---------------------------------------------------------------------------------------------------------*/

		   .on('click', (d) => {

				const coords = d3.geoCentroid(d);

				coords[0] = -coords[0];
				coords[1] = -coords[1];

				const interpolate = d3.interpolate(projection.rotate(), coords);

				this._earthLock = 1;

				/**/	this._earthTime = 0;
				/**/
				/**/	this._earthOrigin = coords;
				/**/
				/**/	d3.transition()
				/**/	  .duration(1250)
				/**/	  .tween('rotate', function() {
				/**/
				/**/		return function(theta) {
				/**/
				/**/			projection.rotate(interpolate(theta));
				/**/
				/**/			svg.selectAll('path').attr('d', projectionPath);
				/**/		};
				/**/	  })
				/**/	  .on('end', function() {
				/**/
				/**/		this._earthLock = 0;
				/**/	  })
				/**/	;
		   })

		   /*---------------------------------------------------------------------------------------------------------*/
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

var monitoringApp = new MonitoringApp();

/*--------------------------------------------------------------------------------------------------------------------*/
