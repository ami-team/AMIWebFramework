/*!
 * AMI Web Framework
 *
 * Copyright (c) 2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
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
 * @global d3, CanvasJS, topojson
 *
 */

/*-------------------------------------------------------------------------*/
/* AMIAdminDashboardMonitoring                                             */
/*-------------------------------------------------------------------------*/

$AMIClass('AMIAdminDashboardMonitoring', {
	/*-----------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*-----------------------------------------------------------------*/

	onReady: function(userdata)
	{
		amiWebApp.loadSheets([
			'subapps/Monitoring/css/AMIMonitoringApp.css',
		]);

		amiWebApp.loadScripts([
			'js/3rd-party/d3.min.js',
			'js/3rd-party/topojson.v1.min.js',
			'js/3rd-party/canvasjs.min.js',
		]);

		this.heatmap = d3.scale.linear().range([
			'LavenderBlush',
			'OrangeRed',
		]);

		$('#ami_jumbotron_title').html('Monitoring');
		$('#ami_breadcrumb_content').html('<li>Admin</li><li><a href="' + amiWebApp.webAppURL + '?subapp=amiMonitoring">Monitoring</a></li>');

		var result = $.Deferred();

		amiWebApp.loadHTMLs([
			'subapps/Monitoring/html/AMIMonitoringApp.html',
		]).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0]).done(function() {

				result.resolve();
			});

		}).fail(function() {

			result.reject();
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	onExit: function()
	{
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
		if($('#ami_monitoring_chart0').is(':empty') == false)
		{
			this._stage1();
			this._stage2();
		}
	},

	/*-----------------------------------------------------------------*/

	onLogout: function()
	{
	},

	/*-----------------------------------------------------------------*/

	_interval: 5000,

	_nodes: [],

	/*-----------------------------------------------------------------*/

	_connectionPoolData1: {},
	_connectionPoolData2: {},

	/*-----------------------------------------------------------------*/

	_earthOrigin: [
		+6.808024259734162,
		-43.135963697215246,
	],

	_earthVelocity: [
		0.002,
		0.000,
	],

	_earthLock: 0,

	_time: 0,

	/*-----------------------------------------------------------------*/

	__handler1: function(deferred, data, webNr, webOk, taskNr, taskOk)
	{
		var i = data.length;

		if(i < this._nodes.length)
		{
			var service = this._nodes[i].service;
			var   url   = this._nodes[i].  url  ;

			amiCommand.execute('GetSessionInfo', {context: this, endpoint: url}).done(function() {
				/*-----------------------------------------*/

				data.push(1);

				/**/ if(service === 'web')
				{
					this.__handler1(deferred, data, webNr + 1, webOk + 1, taskNr + 0, taskOk + 0);
				}
				else if(service === 'task')
				{
					this.__handler1(deferred, data, webNr + 0, webOk + 0, taskNr + 1, taskOk + 1);
				}
				else
				{
					this.__handler1(deferred, data, webNr + 0, webOk + 0, taskNr + 0, taskOk + 0);
				}
				
				/*-----------------------------------------*/
			}).fail(function() {
				/*-----------------------------------------*/

				data.push(0);

				/**/ if(service === 'web')
				{
					this.__handler1(deferred, data, webNr + 1, webOk + 0, taskNr + 0, taskOk + 0);
				}
				else if(service === 'task')
				{
					this.__handler1(deferred, data, webNr + 0, webOk + 0, taskNr + 1, taskOk + 0);
				}
				else
				{
					this.__handler1(deferred, data, webNr + 0, webOk + 0, taskNr + 0, taskOk + 0);
				}

				/*-----------------------------------------*/
			});
		}
		else
		{
			deferred.resolveWith(this, [data, webNr, webOk, taskNr, taskOk]);
		}

		return deferred;
	},

	/*-----------------------------------------------------------------*/

	_handler1: function()
	{
		this.__handler1($.Deferred(), [], 0, 0, 0, 0).done(function(data, webNr, webOk, taskNr, taskOk) {
			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/

			var now = new Date();

			for(var i in this._nodes)
			{
				this._chart2.options.data[i].dataPoints.push({x: now, y: data[i]});
			}

			this._chart2.render();

			/*-------------------------------------------------*/
		});
	},

	/*-----------------------------------------------------------------*/

	_handler2: function()
	{
		amiCommand.execute('GetConnectionPoolStatus', {context: this, endpoint: $('#ami_monitoring_node').val()}).done(function(data) {
			/*-------------------------------------------------*/
			/* SYSTEM                                          */
			/*-------------------------------------------------*/

			var freeDisk = parseInt(amiWebApp.jspath('..rowset{.@type==="system"}.row.field{.@name==="freeDisk"}.$', data)[0] || '0') / (1024 * 1024);
			var totalDisk = parseInt(amiWebApp.jspath('..rowset{.@type==="system"}.row.field{.@name==="totalDisk"}.$', data)[0] || '0') / (1024 * 1024);

			this._chart3.options.title.text = 'disk (' + Math.round(totalDisk) + ' MBytes)';

			this._chart3.options.data[0].dataPoints[0].y = freeDisk;
			this._chart3.options.data[0].dataPoints[1].y = totalDisk - freeDisk;

			this._chart3.render();

			/*-------------------------------------------------*/

			var freeMem = parseInt(amiWebApp.jspath('..rowset{.@type==="system"}.row.field{.@name==="freeMem"}.$', data)[0] || '0') / (1024 * 1024);
			var totalMem = parseInt(amiWebApp.jspath('..rowset{.@type==="system"}.row.field{.@name==="totalMem"}.$', data)[0] || '0') / (1024 * 1024);

			this._chart4.options.title.text = 'mem (' + Math.round(totalMem) + ' MBytes)';

			this._chart4.options.data[0].dataPoints[0].y = freeMem;
			this._chart4.options.data[0].dataPoints[1].y = totalMem - freeMem;

			this._chart4.render();

			/*-------------------------------------------------*/
			/* CONNECTION POOL                                 */
			/*-------------------------------------------------*/

			var rows = amiWebApp.jspath('..rowset{.@type==="connectionPool"}.row', data);

			var now = new Date();

			for(var i in rows)
			{
				var name      = /******/(amiWebApp.jspath('..field{.@name==="name"     }.$', rows[i])[0] || '?');
				var numIdle   = parseInt(amiWebApp.jspath('..field{.@name==="numIdle"  }.$', rows[i])[0] || '0');
				var numActive = parseInt(amiWebApp.jspath('..field{.@name==="numActive"}.$', rows[i])[0] || '0');

				if(!this._connectionPoolData1[name])
				{
					this._connectionPoolData1[name] = [];
				}

				if(!this._connectionPoolData2[name])
				{
					this._connectionPoolData2[name] = [];
				}

				this._connectionPoolData1[name].push({
					x: now,
					y: numIdle,
				});

				this._connectionPoolData2[name].push({
					x: now,
					y: numActive,
				});
			}

			/*-------------------------------------------------*/

			name = $('#ami_monitoring_pool').val();

			var dataPoints1 = this._connectionPoolData1[name];
			var dataPoints2 = this._connectionPoolData2[name];

			this._chart5.options.data[0].dataPoints = dataPoints1 ? dataPoints1 : [];
			this._chart5.options.data[1].dataPoints = dataPoints2 ? dataPoints2 : [];

			this._chart5.render();

			/*-------------------------------------------------*/
		});
	},

	/*-----------------------------------------------------------------*/

	_stage1: function()
	{
		amiWebApp.loadJSONs([
			'atlas.json'
		], {context: this}).done(function(data) {
			/*-------------------------------------------------*/
			/* GET NODES                                       */
			/*-------------------------------------------------*/

			var rows = amiWebApp.jspath('..row', data[0]);

			var series = [];
			var options = '';

			var nbOfWebNodes = 0;
			var nbOfTaskNodes = 0;

			for(var i in rows)
			{
				var service = amiWebApp.jspath('..field{.@name==="service"}.$', rows[i])[0] || '';
				var node = amiWebApp.jspath('..field{.@name==="node"}.$', rows[i])[0] || '';
				var url = amiWebApp.jspath('..field{.@name==="url"}.$', rows[i])[0] || '';

				/**/ if(service === 'web') {
					nbOfWebNodes++;
				}
				else if(service === 'task') {
					nbOfTaskNodes++;
				}

				this._nodes.push({
					service: service,
					node: node,
					url: url,
				});

				series.push({
					type: 'line',
					name: service + '::' + node,
					showInLegend: true,
					dataPoints: [],
				});

				options += '<option value="' + amiWebApp.textToHtml(url) + '">' + amiWebApp.textToHtml(service + '::' + node) + '</option>';
			}

			/*-------------------------------------------------*/

			$('#ami_monitoring_node').html(options);

			/*-------------------------------------------------*/
			/* BUILD CHARTS                                    */
			/*-------------------------------------------------*/

			this._chart0 = new CanvasJS.Chart('ami_monitoring_chart0', {
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
					text: nbOfWebNodes + ' web node(s)',
					horizontalAlign: 'center',
				},
			});

			this._chart0.render();

			/*-------------------------------------------------*/

			this._chart1 = new CanvasJS.Chart('ami_monitoring_chart1', {
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
					text: nbOfTaskNodes + ' task node(s)',
					horizontalAlign: 'center',
				},
			});

			this._chart1.render();

			/*-------------------------------------------------*/

			this._chart2 = new CanvasJS.Chart('ami_monitoring_chart2', {
				axisX: {
					labelAngle: -50,
					title: 'Time',
					valueFormatString: 'H:m',
				},
				axisY: {
					minimum: 0,
					maximum: 1,
					interval: 1,
					tickLength: 0,
					title: 'Availability',
				},
				backgroundColor: 'transparent',
				data: series,
				legend: {
					fontSize: 13,
					indexLabelFontFamily: 'Garamond',
				},
				zoomEnabled: true,
			});

			this._chart2.render();

			/*-------------------------------------------------*/

			this._chart3 = new CanvasJS.Chart('ami_monitoring_chart3', {
				backgroundColor: 'transparent',
				data: [{
					type: 'doughnut',
					showInLegend: true, 
					dataPoints: [
						{y: 0, legendText: 'Free #percent%'},
						{y: 0, legendText: 'Used #percent%'},
					],
				}],
				legend: {
					fontSize: 13,
					indexLabelFontFamily: 'Garamond',
				},
				title: {
					text: 'disk',
					horizontalAlign: 'center',
				},
			});

			this._chart3.render();

			/*-------------------------------------------------*/

			this._chart4 = new CanvasJS.Chart('ami_monitoring_chart4', {
				backgroundColor: 'transparent',
				data: [{
					type: 'doughnut',
					showInLegend: true, 
					dataPoints: [
						{y: 0, legendText: 'Free #percent%'},
						{y: 0, legendText: 'Used #percent%'},
					],
				}],
				legend: {
					fontSize: 13,
					indexLabelFontFamily: 'Garamond',
				},
				title: {
					text: 'mem',
					horizontalAlign: 'center',
				},
			});

			this._chart4.render();

			/*-------------------------------------------------*/

			this._chart5 = new CanvasJS.Chart('ami_monitoring_chart5', {
				axisX: {
					title: 'Time',
					labelAngle: -50,
					valueFormatString: 'H:m',
				},
				axisY: {
					minimum: 0,
					tickLength: 0,
					title: 'Number',
				},
				backgroundColor: 'transparent',
				data: [{
					type: 'line',
					name: 'Idle connection(s)' ,
					showInLegend: true,
					dataPoints: [],
				}, {
					type: 'line',
					name: 'Active connection(s)',
					showInLegend: true,
					dataPoints: [],
				}],
				legend: {
					fontSize: 13,
					indexLabelFontFamily: 'Garamond',
				},
				zoomEnabled: true,
			});

			this._chart5.render();

			/*-------------------------------------------------*/
			/* EXECUTE HANDLERS                                */
			/*-------------------------------------------------*/

			this.selectNode();

			/*-------------------------------------------------*/

			var oldDate;
			var newDate;

			oldDate = newDate = new Date();

			setInterval(
				(function(self) {
					return function() {

						newDate = new Date();

						if((newDate - oldDate) < 60 * 1000)
						{
							self._handler1();
							self._handler2();

							oldDate = newDate;
						}
						else
						{
							location.reload();
						}
					}
				})(this)
			, this._interval);

			/*-------------------------------------------------*/
		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0], true);
		});
	},

	/*-----------------------------------------------------------------*/

	_stage2: function()
	{
		/*---------------------------------------------------------*/

		var l = $('#ami_monitoring_chart6').height();

		/*---------------------------------------------------------*/

		var svg = d3.select('#ami_monitoring_chart6').append('svg')
		                                             .attr('width', l)
		                                             .attr('height', l)
		                                             .attr('viewBox', '0, 0, ' + l + ', ' + l)
		;

		/*---------------------------------------------------------*/

		var g = svg.append('g');

		/*---------------------------------------------------------*/

		var projection = d3.geo.orthographic()
		                       .scale(l / 2 - 1)
		                       .translate([l / 2, l / 2])
		                       .rotate(this._earthOrigin)
		                       .clipAngle(90)
		                       .precision(0.1)
		;

		var projectionPath = d3.geo.path().projection(projection);

		/*---------------------------------------------------------*/

		g.append('path')
		 .datum({type: 'Sphere'})
		 .attr('class', 'background')
		 .attr('d', projectionPath)
		;

		g.append('path')
		 .datum(d3.geo.graticule())
		 .attr('class', 'graticule')
		 .attr('d', projectionPath)
		;

		/*---------------------------------------------------------*/

		amiCommand.execute('GetUserStats', {context: this}).done(function(data) {
			/*-------------------------------------------------*/
			/* USERS                                           */
			/*-------------------------------------------------*/

			var  valid  = parseInt(amiWebApp.jspath('..rowset{.@type==="users"}.row.field{.@name=== "valid" }.$', data)[0] || '0');
			var invalid = parseInt(amiWebApp.jspath('..rowset{.@type==="users"}.row.field{.@name==="invalid"}.$', data)[0] || '0');

			var total = valid + invalid;

			/*-------------------------------------------------*/

			$('#ami_monitoring_valid_users').html(valid);
			$('#ami_monitoring_total_users').html(total);

			/*-------------------------------------------------*/
			/* COUNTRIES                                       */
			/*-------------------------------------------------*/

			var rows = amiWebApp.jspath('..rowset{.@type=== "countries"}..row', data);

			var score = {};

			var max = 0;

			for(var i in rows)
			{
				var code = /******/(amiWebApp.jspath('..field{.@name==="code"}.$', rows[i])[0] || 'N/A');
				var z    = parseInt(amiWebApp.jspath('..field{.@name==="z"   }.$', rows[i])[0] || '0x0');

				score[code] = z;

				if(code.length === 2 && max < z)
				{
					max = z;
				}
			}

			/*-------------------------------------------------*/

			var _this = this;

			/*-------------------------------------------------*/

			amiWebApp.loadJSONs([
				'subapps/Monitoring/data/world.json'
			], {context: this}).done(function(data) {
				/*-----------------------------------------*/

				var countries = topojson.feature(data[0], data[0].objects.countries).features;

				_this._drawWorld(svg, g, projection, projectionPath, 'country', countries, score, max);

				/*-----------------------------------------*/

				setInterval(function() {

					if(_this._earthLock === 0)
					{
						projection.rotate([
							_this._earthOrigin[0] + _this._earthVelocity[0] * _this._time,
							_this._earthOrigin[1] + _this._earthVelocity[1] * _this._time,
						]);

						svg.selectAll('path').attr('d', projectionPath);

						_this._time += 2500;
					}

				}, 2500);

				/*-----------------------------------------*/
			});

			/*-------------------------------------------------*/
		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0], true);
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

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

		   /*------------------------------------------------------*/
		   /* STYLE                                                */
		   /*------------------------------------------------------*/

		   .attr('style', function(d) {

				if(data[d.id])
				{
					return 'fill: ' + _this.heatmap(data[d.id] / max);
				}
			})

		   /*------------------------------------------------------*/
		   /* CLICK                                                */
		   /*------------------------------------------------------*/

		   .on('click', function(d) {

				var coords = d3.geo.centroid(d);

				coords[0] = -coords[0];
				coords[1] = -coords[1];

				var interpolate = d3.interpolate(projection.rotate(), coords);

				_this._earthLock = 1;

				/**/	_this._time = 0;
				/**/
				/**/	_this._earthOrigin = coords;
				/**/
				/**/	d3.transition()
				/**/	  .duration(1250)
				/**/	  .tween('rotate', function() {
				/**/
				/**/			return function(theta) {
				/**/
				/**/				projection.rotate(interpolate(theta));
				/**/
				/**/				svg.selectAll('path').attr('d', projectionPath);
				/**/			};
				/**/		})
				/**/	  .transition().each('end', function() {
				/**/
				/**/			_this._earthLock = 0;
				/**/		})
				/**/	;
			})

		   /*------------------------------------------------------*/
		;
	},

	/*-----------------------------------------------------------------*/

	selectNode: function()
	{
		amiWebApp.lock();

		amiCommand.execute('GetConnectionPoolStatus', {context: this, endpoint: $('#ami_monitoring_node').val()}).done(function(data) {
			/*-------------------------------------------------*/

			var names = amiWebApp.jspath('..field{.@name==="name"}.$', data), name;

			var options = '';

			for(var i in names)
			{
				options += '<option value="' + amiWebApp.textToHtml(names[i]) + '">' + amiWebApp.textToHtml(names[i]) + '</option>';
			}

			/*-------------------------------------------------*/

			$('#ami_monitoring_pool').html(options);

			this._connectionPoolData1 = {};
			this._connectionPoolData2 = {};

			this.selectPool();

			/*-------------------------------------------------*/

			amiWebApp.unlock();

			/*-------------------------------------------------*/
		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0], true);
		});
	},

	/*-----------------------------------------------------------------*/

	selectPool: function()
	{
		/*---------------------------------------------------------*/

		this._chart3.options.data[0].dataPoints[0].y = 0;
		this._chart3.options.data[0].dataPoints[1].y = 0;

		this._chart3.render();

		/*---------------------------------------------------------*/

		this._chart4.options.data[0].dataPoints[0].y = 0;
		this._chart4.options.data[0].dataPoints[1].y = 0;

		this._chart4.render();

		/*---------------------------------------------------------*/

		this._chart5.options.data[0].dataPoints = [];
		this._chart5.options.data[1].dataPoints = [];

		this._chart5.render();

		/*---------------------------------------------------------*/
	}

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/

var amiMonitoringApp = new AMIAdminDashboardMonitoring();

amiRegisterSubApp('amiMonitoring', amiMonitoringApp);

/*-------------------------------------------------------------------------*/
