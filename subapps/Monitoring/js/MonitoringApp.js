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
 ****************************************************************************
 * INSTALL TOOLS                                                            *
 ****************************************************************************
 *
 * add-apt-repository ppa:ubuntugis/ubuntugis-unstable
 * apt-get install gdal-bin
 * npm install -g topojson
 *
 ****************************************************************************
 * GENERATE MAP                                                             *
 ****************************************************************************
 *
 * ogr2ogr -f GeoJSON countries.json ne_110m_admin_0_countries.shp
 * topojson -o world.json --id-property iso_n2 --properties name=name -- countries.json
 *
 ****************************************************************************
 *
 * @global d3, topojson, CanvasJS
 *
 */

/*-------------------------------------------------------------------------*/

$AMIClass('MonitoringApp', {
	/*---------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*---------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		/*-----------------------------------------------------------------*/

		this._confFile = 'nodes.json';

		this._extraTitle = /*-*/''/*-*/;

		this._externalFrame = /*-*/''/*-*/;

		/*-----------------------------------------------------------------*/

		if(userdata)
		{
			try
			{
				var json = JSON.parse(userdata);

				if(json.conf_file)
				{
					this._confFile = json.conf_file;
				}

				if(json.extra_title)
				{
					this._extraTitle = json.extra_title;
				}

				if(json.external_frame)
				{
					this._externalFrame = json.external_frame;
				}
			}
			catch(e)
			{
				/* IGNORE */
			}
		}

		/*-----------------------------------------------------------------*/

		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/Monitoring/twig/MonitoringApp.twig',
			'subapps/Monitoring/css/MonitoringApp.css',
			'js/3rd-party/d3.min.js',
			'js/3rd-party/d3-geo.min.js',
			'js/3rd-party/topojson.v1.min.js',
			'js/3rd-party/canvasjs.min.js',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this, dict: {externalFrame: this._externalFrame}}).done(function() {

				/*---------------------------------------------------------*/

				$('#AF46CD08_34D4_E172_7426_8D528BD6BF2D').text(this._extraTitle);

				/*---------------------------------------------------------*/

				this._reloadTime = 4 * 60 * 60 * 1000;

				this._interval = 5000;

				this._nodes = [
				];

				/*---------------------------------------------------------*/

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

				/*---------------------------------------------------------*/

				result.resolve();
			});

		}).fail(function(data) {

			result.reject(data);
		});

		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/

	onLogin: function()
	{
		if($('#E86BAEDC_5386_454F_318B_3337E7B1CFB3').is(':empty'))
		{
			this._stage1();
			this._stage2();
		}
	},

	/*---------------------------------------------------------------------*/

	onLogout: function()
	{
		if($('#E86BAEDC_5386_454F_318B_3337E7B1CFB3').is(':empty'))
		{
			this._stage1();
			this._stage2();
		}
	},

	/*---------------------------------------------------------------------*/

	__handler: function(deferred, data, webNr, webOk, taskNr, taskOk)
	{
		var i = data.length;

		if(i < this._nodes.length)
		{
			var service = this._nodes[i].service;
			var endpoint = this._nodes[i].endpoint;

			amiCommand.execute('GetSessionInfo', {context: this, endpoint: endpoint}).done(function() {

				/*---------------------------------------------------------*/

				data.push(1);

				/**/ if(service === 'web')
				{
					this.__handler(deferred, data, webNr + 1, webOk + 1, taskNr + 0, taskOk + 0);
				}
				else if(service === 'task')
				{
					this.__handler(deferred, data, webNr + 0, webOk + 0, taskNr + 1, taskOk + 1);
				}
				else
				{
					this.__handler(deferred, data, webNr + 0, webOk + 0, taskNr + 0, taskOk + 0);
				}

				/*---------------------------------------------------------*/

			}).fail(function() {

				/*---------------------------------------------------------*/

				data.push(0);

				/**/ if(service === 'web')
				{
					this.__handler(deferred, data, webNr + 1, webOk + 0, taskNr + 0, taskOk + 0);
				}
				else if(service === 'task')
				{
					this.__handler(deferred, data, webNr + 0, webOk + 0, taskNr + 1, taskOk + 0);
				}
				else
				{
					this.__handler(deferred, data, webNr + 0, webOk + 0, taskNr + 0, taskOk + 0);
				}

				/*---------------------------------------------------------*/
			});
		}
		else
		{
			deferred.resolveWith(this, [data, webNr, webOk, taskNr, taskOk]);
		}

		return deferred;
	},

	/*---------------------------------------------------------------------*/

	_handler: function()
	{
		this.__handler($.Deferred(), [], 0, 0, 0, 0).done(function(data, webNr, webOk, taskNr, taskOk) {

			/*-------------------------------------------------------------*/

			if(webNr === 0)
			{
				this._chart0.options.data[0].dataPoints[0].y = 1;
				this._chart0.options.data[0].dataPoints[1].y = 0;
			}
			else
			{
				this._chart0.options.data[0].dataPoints[0].y = webOk;
				this._chart0.options.data[0].dataPoints[1].y = webNr - webOk;
			}

			this._chart0.render();

			/*-------------------------------------------------------------*/

			if(taskNr === 0)
			{
				this._chart1.options.data[0].dataPoints[0].y = 1;
				this._chart1.options.data[0].dataPoints[1].y = 0;
			}
			else
			{
				this._chart1.options.data[0].dataPoints[0].y = taskOk;
				this._chart1.options.data[0].dataPoints[1].y = taskNr - taskOk;
			}

			this._chart1.render();

			/*-------------------------------------------------------------*/

			var now = new Date();

			/*-------------------------------------------------------------*/

			for(var i in this._nodes)
			{
				this._chart2.options.data[i].dataPoints.push({x: now, y: data[i]});
			}

			this._chart3.options.data[0].dataPoints.push({x: now, y: webNr > 0 ? 1 : 0});
			this._chart3.options.data[1].dataPoints.push({x: now, y: taskNr > 0 ? 1 : 0});

			this._chart2.render();
			this._chart3.render();

			/*-------------------------------------------------------------*/
		});
	},

	/*---------------------------------------------------------------------*/

	_stage1: function()
	{
		var _this = this;

		amiWebApp.loadJSONs([
			this._confFile
		], {context: this}).done(function(data) {

			/*-------------------------------------------------------------*/
			/* GET NODES                                                   */
			/*-------------------------------------------------------------*/

			var rows = amiWebApp.jspath('..row', data[0]) || [];

			var series1 = [];
			var series2 = [];

			var numberOfWebNodes = 0;
			var numberOfTaskNodes = 0;

			rows.forEach(function(row) {

				var node = amiWebApp.jspath('..field{.@name==="node"}.$', row)[0] || '';
				var service = amiWebApp.jspath('..field{.@name==="service"}.$', row)[0] || '';
				var endpoint = amiWebApp.jspath('..field{.@name==="endpoint"}.$', row)[0] || '';

				/**/ if(service === 'web') {
					numberOfWebNodes++;
				}
				else if(service === 'task') {
					numberOfTaskNodes++;
				}

				_this._nodes.push({
					node: node,
					service: service,
					endpoint: endpoint,
				});

				series1.push({
					type: "stackedArea",
					name: service + '::' + node,
					showInLegend: true,
					markerType: null,
					dataPoints: [],
				});
			});

			series2.push({
				type: "stackedArea",
				name: 'web',
				showInLegend: true,
				markerType: null,
				dataPoints: [],
			});

			series2.push({
				type: "stackedArea",
				name: 'tasks',
				showInLegend: true,
				markerType: null,
				dataPoints: [],
			});

			/*-------------------------------------------------------------*/
			/* BUILD CHARTS                                                */
			/*-------------------------------------------------------------*/

			this._chart0 = new CanvasJS.Chart('E86BAEDC_5386_454F_318B_3337E7B1CFB3', {
				backgroundColor: 'transparent',
				data: [{
					type: 'doughnut',
					indexLabel: '{label} #percent%',
					indexLabelFontSize: 14,
					indexLabelFontFamily: 'Garamond',
					dataPoints: [
						{y: 0, label: 'Available'},
						{y: 0, label: 'Unavailable'},
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

			this._chart0.render();

			/*-------------------------------------------------------------*/

			this._chart1 = new CanvasJS.Chart('CDB3AD94_DC62_215E_E9EA_AACDF05E542A', {
				backgroundColor: 'transparent',
				data: [{
					type: 'doughnut',
					indexLabel: '{label} #percent%',
					indexLabelFontSize: 14,
					indexLabelFontFamily: 'Garamond',
					dataPoints: [
						{y: 0, label: 'Available'},
						{y: 0, label: 'Unavailable'},
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

			this._chart1.render();

			/*-------------------------------------------------------------*/

			this._chart2 = new CanvasJS.Chart('A8F5DC0E_F1D2_7220_29F0_C86DD93A23E2', {
				axisX: {
					labelAngle: -50,
					valueFormatString: 'H:m',
				},
				axisY: {
					minimum: 0,
					maximum: rows.length,
					interval: rows.length,
					title: 'Node availability',
				},
				backgroundColor: 'transparent',
				data: series1,
				zoomEnabled: true,
			});

			this._chart2.render();

			/*-------------------------------------------------------------*/

			this._chart3 = new CanvasJS.Chart('C3C51231_AEE3_FD2E_20F3_39FDECA45987', {
				axisX: {
					labelAngle: -50,
					valueFormatString: 'H:m',
				},
				axisY: {
					minimum: 0,
					maximum: 2,
					interval: 2,
					title: 'Global availability',
				},
				backgroundColor: 'transparent',
				data: series2,
				zoomEnabled: true,
			});

			this._chart3.render();

			/*-------------------------------------------------------------*/
			/* EXECUTE HANDLERS                                            */
			/*-------------------------------------------------------------*/

			var sum = 0

			setInterval(function() {

				if(sum < _this._reloadTime)
				{
					sum += _this._interval;

					_this._handler();
				}
				else
				{
					location.reload();
				}

			}, this._interval);

			/*-------------------------------------------------------------*/

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});
	},

	/*---------------------------------------------------------------------*/

	_stage2: function()
	{
		/*-----------------------------------------------------------------*/

		var l = $('#A7CB3444_3882_26FF_F3AF_52278A0F37C1').height();

		/*-----------------------------------------------------------------*/

		var svg = d3.select('#A7CB3444_3882_26FF_F3AF_52278A0F37C1').append('svg')
		                                                            .attr('width', l)
		                                                            .attr('height', l)
		                                                            .attr('viewBox', '0, 0, ' + l + ', ' + l)
		;

		/*-----------------------------------------------------------------*/

		var g = svg.append('g');

		/*-----------------------------------------------------------------*/

		var projection = d3.geoOrthographic()
		                   .scale(l / 2 - 1)
		                   .translate([l / 2, l / 2])
		                   .rotate(this._earthOrigin)
		                   .clipAngle(90)
		                   .precision(0.1)
		;

		var projectionPath = d3.geoPath().projection(projection);

		/*-----------------------------------------------------------------*/

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

		/*-----------------------------------------------------------------*/

		amiCommand.execute('GetUserStats', {context: this}).done(function(data) {

			/*-------------------------------------------------------------*/
			/* USERS                                                       */
			/*-------------------------------------------------------------*/

			var  valid  = parseInt(amiWebApp.jspath('..rowset{.@type==="users"}.row.field{.@name=== "valid" }.$', data)[0] || '0');
			var invalid = parseInt(amiWebApp.jspath('..rowset{.@type==="users"}.row.field{.@name==="invalid"}.$', data)[0] || '0');

			var total = valid + invalid;

			/*-------------------------------------------------------------*/

			$('#A8CB8D03_D1C5_D3D3_7625_218092ADFAFB').html(valid);
			$('#E46EBCE9_49B2_0CBF_7075_2340916CD5CF').html(total);

			/*-------------------------------------------------------------*/
			/* COUNTRIES                                                   */
			/*-------------------------------------------------------------*/

			var rows = amiWebApp.jspath('..rowset{.@type=== "countries"}..row', data) || [];

			var score = {};

			var max = 0;

			rows.forEach(function(row) {

				var code = /*----*/(amiWebApp.jspath('..field{.@name==="code"}.$', row)[0] || 'N/A');
				var z    = parseInt(amiWebApp.jspath('..field{.@name==="z"   }.$', row)[0] || '0x0');

				score[code] = z;

				if(code.length === 2 && max < z)
				{
					max = z;
				}
			});

			/*-------------------------------------------------------------*/

			var _this = this;

			amiWebApp.loadJSONs([
				'subapps/Monitoring/data/world.json'
			], {context: this}).done(function(data) {

				/*---------------------------------------------------------*/

				var countries = topojson.feature(data[0], data[0].objects.countries).features;

				/*---------------------------------------------------------*/

				this._drawWorld(svg, g, projection, projectionPath, 'country', countries, score, max);

				/*---------------------------------------------------------*/

				setInterval(function() {

					if(_this._earthLock === 0)
					{
						projection.rotate([
							_this._earthOrigin[0] + _this._earthVelocity[0] * _this._earthTime,
							_this._earthOrigin[1] + _this._earthVelocity[1] * _this._earthTime,
						]);

						svg.selectAll('path').attr('d', projectionPath);

						_this._earthTime += 2500;
					}

				}, 2500);

				/*---------------------------------------------------------*/
			});

			/*-------------------------------------------------------------*/

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	_drawWorld: function(svg, g, projection, projectionPath, className, featureSet, data, max)
	{
		var _this = this;

		var set = g.selectAll('.' + className)
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

		   /*--------------------------------------------------------------*/
		   /* STYLE                                                        */
		   /*--------------------------------------------------------------*/

		   .attr('style', function(d) {

			return 'fill: ' + (data[d.id] ? _this._countryHeatmap(data[d.id] / max) : 'white');
		    })

		   /*--------------------------------------------------------------*/
		   /* CLICK                                                        */
		   /*--------------------------------------------------------------*/

		   .on('click', function(d) {

				var coords = d3.geoCentroid(d);

				coords[0] = -coords[0];
				coords[1] = -coords[1];

				var interpolate = d3.interpolate(projection.rotate(), coords);

				_this._earthLock = 1;

				/**/	_this._earthTime = 0;
				/**/
				/**/	_this._earthOrigin = coords;
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
				/**/	   })
				/**/	  .on('end', function() {
				/**/
				/**/		_this._earthLock = 0;
				/**/	   });
				/**/	;
		   })

		   /*--------------------------------------------------------------*/
		;
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

var monitoringApp = new MonitoringApp();

/*-------------------------------------------------------------------------*/
