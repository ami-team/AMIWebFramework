/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* INTERNAL FUNCTIONS                                                      */
/*-------------------------------------------------------------------------*/

function _drawWorld(svg, g, projection, projectionPath, className, featureSet, data, max)
{
	var set = g.selectAll('.' + className)
	           .data(featureSet)
		   .enter()
		   .append('g')
		   .attr('class', className)
/*		   .attr('data-name', function(d) {
				return d.properties.name;
			})
	           .attr('data-id', function(d) {
				return d.id;
			})
*/	;

	set.append('path')
	   .attr('class', 'land')
	   .attr('d', projectionPath)
	;

	set.append('path')
	   .attr('class', 'overlay')
	   .attr('d', projectionPath)

	   .attr('style', function(d) {

			if(data[d.id])
			{
				return 'fill-opacity: ' + data[d.id] / (1.0 * max);
			}
		})

	   .on('click', function(d) {

			var coords = d3.geo.centroid(d);

			coords[0] = -coords[0];
			coords[1] = -coords[1];

			d3.transition()
			  .duration(1250)
			  .tween('rotate', function() {

					var r = d3.interpolate(projection.rotate(), coords);

					return function(t) {

						projection.rotate(r(t));

						svg.selectAll('path').attr('d', projectionPath);
					};
				})
			  .transition()
			;
		})

	   .on('mouseover', function(d) {

			$('#ami_monitoring_mouseover').html((data[d.id] || 0) + ' users for ' + d.properties.name);
		})
	;
}

/*-------------------------------------------------------------------------*/
/* AMIAdminDashboardMonitoring                                             */
/*-------------------------------------------------------------------------*/

$AMIClass('AMIAdminDashboardMonitoring', {
	/*-----------------------------------------------------------------*/

	_init: function()
	{
		amiWebApp.loadScripts([
			'js/3rd-party/d3.min.js',
			'js/3rd-party/topojson.v1.min.js',
			'js/3rd-party/canvasjs.min.js',
		]);

		var canvasjs = '<p>Charts rendered with <a href="http://canvasjs.com/" target="_blank">CanvasJS</a></p>'

		$('#ami_jumbotron_content').html('Monitoring');

		var result = $.Deferred();

		amiWebApp.loadHTMLs([
			'subapps/AdminDashboard/html/fragment/monitoring/monitoring.html',
		]).done(function(data) {

			amiWebApp.replaceHTML('#ami_admin_dashboard_content', data[0]).done(function() {
				amiWebApp.replaceHTML('#ami_admin_dashboard_extra_menu', canvasjs, {context: this}).done(function() {

					result.resolve();
				});
			});

		}).fail(function() {
			result.reject();
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
		this._stage1();
		this._stage2();
	},

	/*-----------------------------------------------------------------*/

	_nodes: [],

	_cnt0: 0,
	_cnt1: 0,

	/*-----------------------------------------------------------------*/

	__handler1: function(deferred, data, nr, ok)
	{
		if(nr < this._nodes.length)
		{
			var endpoint = this._nodes[nr].url;

			amiCommand.execute('GetSessionInfo', {context: this, endpoint: endpoint}).done(function() {

				data.push(100);

				this.__handler1(deferred, data, nr + 1, ok + 1);

			}).fail(function() {

				data.push(0x0);

				this.__handler1(deferred, data, nr + 1, ok + 0);
			});
		}
		else
		{
			deferred.resolveWith(this, [data, nr, ok]);
		}

		return deferred;
	},

	/*-----------------------------------------------------------------*/

	_handler1: function()
	{
		this.__handler1($.Deferred(), [], 0, 0).done(function(data, nr, ok) {
			/*-------------------------------------------------*/

			this._chart0.options.data[0].dataPoints[0].y = ok - 00;
			this._chart0.options.data[0].dataPoints[1].y = nr - ok;

			this._chart0.render();

			/*-------------------------------------------------*/

			for(var i in this._nodes)
			{
				this._chart1.options.data[i].dataPoints.push({x: this._cnt0, y: data[i]});
			}

			this._chart1.render();

			this._cnt0 += 8;

			/*-------------------------------------------------*/
		});
	},

	/*-----------------------------------------------------------------*/

	_handler2: function()
	{
		/*---------------------------------------------------------*/

		var endpoint = $('#ami_monitoring_node').val();

		/*---------------------------------------------------------*/

		amiCommand.execute('GetConnectionPoolStatus', {context: this, endpoint: endpoint}).done(function(data) {
			/*-------------------------------------------------*/

			var  numIdle  = parseInt(amiWebApp.jspath('..field{.@name=== "numIdle" }.$', data)[0] || '0');
			var numActive = parseInt(amiWebApp.jspath('..field{.@name==="numActive"}.$', data)[0] || '0');

			/*-------------------------------------------------*/

			this._chart2.options.data[0].dataPoints.push({x: this._cnt1, y:  numIdle });
			this._chart2.options.data[1].dataPoints.push({x: this._cnt1, y: numActive});

			this._chart2.render();

			this._cnt1 += 8;

			/*-------------------------------------------------*/
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	_stage1: function()
	{
		/*---------------------------------------------------------*/

		var command = 'SearchQuery -catalog="self" -sql="SELECT `node`, `url`, `service` FROM `router_node`"';

		/*---------------------------------------------------------*/

		amiCommand.execute(command, {context: this}).done(function(data) {
			/*-------------------------------------------------*/
			/* GET NODES                                       */
			/*-------------------------------------------------*/

			var rows = amiWebApp.jspath('..row', data);

			var series = [];
			var options = '';

			for(var i in rows)
			{
				var service = amiWebApp.jspath('..field{.@name==="service"}.$', rows[i])[0] || '';
				var node = amiWebApp.jspath('..field{.@name==="node"}.$', rows[i])[0] || '';
				var url = amiWebApp.jspath('..field{.@name==="url"}.$', rows[i])[0] || '';

				this._nodes.push({
					service: service,
					node: node,
					url: url,
				});

				series.push({
					type: 'spline',
					name: node,
					showInLegend: true,
					dataPoints: [],
				});

				options += '<option value="' + amiWebApp.textToHtml(url) + '">' + amiWebApp.textToHtml(node) + '</option>';
			}

			/*-------------------------------------------------*/

			$('#ami_monitoring_node').html(options);

			/*-------------------------------------------------*/
			/* BUILD CHARTS                                    */
			/*-------------------------------------------------*/

			this._chart0 = new CanvasJS.Chart('ami_monitoring_chart0', {
				backgroundColor: 'transparent',
				title: {
					text: this._nodes.length + ' nodes',
					horizontalAlign: 'center',
					verticalAlign: 'center',
				},
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
			});

			this._chart0.render();

			/*-------------------------------------------------*/

			this._chart1 = new CanvasJS.Chart('ami_monitoring_chart1', {
				backgroundColor: 'transparent',
				axisX: {
					minimum: 0,
					title: 'Time (s)',
				},
				axisY: {
					minimum: 0,
					maximum: 100,
					interval: 25,
					tickLength: 0,
					title: 'Availability',
				},
				data: series,
			});

			this._chart1.render();

			/*-------------------------------------------------*/

			this._chart2 = new CanvasJS.Chart('ami_monitoring_chart2', {
				backgroundColor: 'transparent',
				axisX: {
					minimum: 0,
					title: 'Time (s)',
				},
				axisY: {
					minimum: 0,
					tickLength: 0,
					title: 'Number of connexions',
				},
				data: [{
					type: 'spline',
					name: 'Idle',
					showInLegend: true,
					dataPoints: [],
				}, {
					type: 'spline',
					name: 'Active',
					showInLegend: true,
					dataPoints: [],
				}],
			});

			this._chart2.render();

			/*-------------------------------------------------*/
			/* EXECUTE HANDLERS                                */
			/*-------------------------------------------------*/

			this._handler1();
			this._handler2();

			setInterval(
				(function(self) {
					return function() {
						self._handler1();
						self._handler2();
					}
				})(this)
			, 8000);

			/*-------------------------------------------------*/
		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0], true);
		});
	},

	/*-----------------------------------------------------------------*/

	_stage2: function()
	{
		/*---------------------------------------------------------*/
		/*                                                         */
		/*---------------------------------------------------------*/

		var command = 'SearchQuery -catalog="self" -sql="SELECT (SELECT COUNT(`id`) FROM `router_user` WHERE `valid`=1) AS `valid`, (SELECT COUNT(`id`) FROM `router_user` WHERE `valid`=0) AS `invalid`"';

		/*---------------------------------------------------------*/

		amiCommand.execute(command, {context: this}).done(function(data) {
			/*-------------------------------------------------*/

			var  valid  = parseInt(amiWebApp.jspath('..field{.@name=== "valid" }.$', data)[0] || '0');
			var invalid = parseInt(amiWebApp.jspath('..field{.@name==="invalid"}.$', data)[0] || '0');

			var total = valid + invalid;

			/*-------------------------------------------------*/

			$('#ami_monitoring_valid_users').html(valid);
			$('#ami_monitoring_total_users').html(total);

			/*-------------------------------------------------*/
		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0], true);
		});

		/*---------------------------------------------------------*/
		/*                                                         */
		/*---------------------------------------------------------*/

		var l = 325;

		/*---------------------------------------------------------*/

		var svg = d3.select('#ami_monitoring_chart3').append('svg')
							     .attr('width', l)
							     .attr('height', l)
							     .attr('viewBox', '0, 0, ' + l + ', ' + l)
		;

		/*---------------------------------------------------------*/

		var g = svg.append('g');

		/*---------------------------------------------------------*/

		var projection = d3.geo.orthographic()
		                       .scale((l - 1) / 2)
				       .translate([l / 2, l / 2])
				       .clipAngle(90)
				       .precision(0.1)
				       .rotate([0, -30])
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

		var command = 'SearchQuery -catalog="self" -sql="SELECT `country` AS `code`, COUNT(`country`) AS `z` FROM `router_user` WHERE `valid`=1 GROUP BY `country`"';

		/*---------------------------------------------------------*/

		amiCommand.execute(command, {context: this}).done(function(data) {

			var rows = amiWebApp.jspath('..row', data);

			var score = {};

			var max = 0;

			for(var i in rows)
			{
				var code = amiWebApp.jspath('..field{.@name==="code"}.$', rows[i])[0];
				var z = amiWebApp.jspath('..field{.@name==="z"}.$', rows[i])[0];

				score[code] = z;

				if(max < z)
				{
					max = z;
				}
			}

			d3.json('subapps/AdminDashboard/data/world.json', function(error, world) {

		                var countries = topojson.feature(world, world.objects.countries).features;

				_drawWorld(svg, g, projection, projectionPath, 'country', countries, score, max);
			});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0], true);
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	selectNode: function()
	{
		this._chart2.options.data[0].dataPoints = [];
		this._chart2.options.data[1].dataPoints = [];

		this._chart2.render();

		this._cnt1 = 0;
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
