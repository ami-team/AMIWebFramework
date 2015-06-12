/*!
 * AMIMonitoringApp class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* CLASS AMIMonitoringApp                                                  */
/*-------------------------------------------------------------------------*/

function AMIMonitoringApp() {
	/*-----------------------------------------------------------------*/

	this._nodes = [];

	/*-----------------------------------------------------------------*/

	this._serverTimer = null;
	this._serverCharts = [];

	this._connectionPoolTimer = null;
	this._connectionPoolCharts = [];

	/*-----------------------------------------------------------------*/

	this.onReady = function(userdata) {

		var result = $.Deferred();

		amiWebApp.loadScripts([
			'tools/common/js/highcharts.min.js',
			'tools/common/js/highcharts-more.min.js',
			'tools/common/js/modules/solid-gauge.js',
			'tools/common/js/modules/map.js',
			'tools/common/js/world.js',
		]);

		Highcharts.setOptions({

			credits: {
				enabled: false,
			},
		});

		this.world = Highcharts.geojson(Highcharts.maps['custom/world']);

		$('#ami_jumbotron_title').html('Monitoring');
		$('#ami_jumbotron_content').html('');
		$('#ami_breadcrumb_content').html('<li><a>Admin</a></li><li><a href="' + amiWebApp.webappURL + '?webapp=amimonitoring">Monitoring</a></li>');

		amiWebApp.loadHTML('subapps/Monitoring/html/AMIMonitoringApp.html', {context: this}).done(function(data1) {
			amiWebApp.loadHTML('subapps/Monitoring/html/Fragment/server.html', {context: this}).done(function(data2) {
				amiWebApp.loadHTML('subapps/Monitoring/html/Fragment/connectionPool.html', {context: this}).done(function(data3) {
					amiWebApp.loadHTML('subapps/Monitoring/html/Fragment/users.html', {context: this}).done(function(data4) {
						amiWebApp.loadHTML('subapps/Monitoring/html/Fragment/logs.html', {context: this}).done(function(data5) {

							amiWebApp.replaceHTML('ami_main_content', data1, {context: this}).done(function() {

								this.serverFragment = data2;
								this.connectionPoolFragment = data3;
								this.usersFragment = data4;
								this.logsFragment = data5;

								result.resolve();
							});
						}).fail(function() {
							result.reject();
						});
					}).fail(function() {
						result.reject();
					});
				}).fail(function() {
					result.reject();
				});
			}).fail(function() {
				result.reject();
			});
		}).fail(function() {
			result.reject();
		});

		return result;
	};

	/*-----------------------------------------------------------------*/

	this.onExit = function() {

		this.onLogout();

		this._serverCharts = [];
		this._connectionPoolCharts = [];
	};

	/*-----------------------------------------------------------------*/

	this.onLogin = function() {
		/*---------------------------------------------------------*/
		/* SERVERS                                                 */
		/*---------------------------------------------------------*/

		this._serverUpdater();

		this._serverTimer = setInterval(
			(function(self) {
				return function() {
					self._serverUpdater();
				}
     			})(this)
		, 4000);

		/*---------------------------------------------------------*/
		/* CONNECTION POOL                                         */
		/*---------------------------------------------------------*/

		this._connectionPoolUpdater();

		this._connectionPoolTimer = setInterval(
			(function(self) {
				return function() {
					self._connectionPoolUpdater();
				}
     			})(this)
		, 4000);

		/*---------------------------------------------------------*/
		/* USERS                                                   */
		/*---------------------------------------------------------*/

		this._usersUpdater();

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.onLogout = function() {

		if(this._serverTimer) {
			clearTimeout(this._serverTimer);
			this._serverTimer = null;
		}

		if(this._connectionPoolTimer) {
			clearTimeout(this._connectionPoolTimer);
			this._connectionPoolTimer = null;
		}
	};

	/*-----------------------------------------------------------------*/

	this._serverUpdater = function() {

		var url = amiCommand.endpoint.replace('FrontEnd', 'SLS').trim();

		data = {
			Mode: 'soft',
			Service: '%',
			Converter: 'AMIXmlToJson.xsl',
		};

		var t = new Date().getTime();

		$.ajax({
			url: url,
			data: data,
			type: 'POST',
			context: this,
			dataType: 'xml',
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {

				var numericvalues = data.getElementsByTagName('numericvalue');

				var availability = parseInt(data.getElementsByTagName('availability')[0].childNodes[0].nodeValue);

				if(this._serverCharts.length === 0) {

					var dict = {
						NUMBER_OF_NODES: numericvalues.length,
					};

					amiWebApp.replaceHTML('ami_monitoring_server_content', this.serverFragment, {context: this, dict: dict}).done(function() {
						/*-------------------------*/
						/*                         */
						/*-------------------------*/

						this._serverCharts.push(new Highcharts.Chart({
			
							chart: {
								type: 'gauge',
								renderTo: 'ami_monitoring_server_plot1',
								margin: [0, 0, 0, 0],
							},
							title: {
								text: null,
							},
							pane: {
								center: ['50%', '75%'],
								size: '140%',
								startAngle: -90,
								endAngle: +90,
								background: {
									backgroundColor: '#FFFFFF',
									innerRadius: '60%',
									outerRadius: '100%',
									shape: 'arc'
								}
							},
							yAxis: {
								min: 0,
								max: 100,
								title: {
									text: 'Global availability',
									y: 20,
								},
								plotBands: [{
									from: 0,
									to: 40,
									color: '#FF4500' // red
								}, {
									from: 40,
									to: 75,
									color: '#FFA500' // orange
								}, {
									from: 75,
									to: 95,
									color: '#FFFF00' // yellow
								}, {
									from: 95,
									to: 100,
									color: '#55BF3B' // green
								}],
							},
							series: [
								{name: 'Availability', data: [availability], dataLabels: {enabled: false}}
							],
						}));

						/*-------------------------*/
						/*                         */
						/*-------------------------*/

						var series = [];

						for(var i = 0; i < numericvalues.length; i++) {

							var name = numericvalues[i].getAttribute('name');

							var data = [[t, parseInt(numericvalues[i].childNodes[0].nodeValue)]];

							series.push({
								name: name,
								data: data,
							});

							this._nodes.push(name);
						}

						/*-------------------------*/

						this._serverCharts.push(new Highcharts.Chart({

							chart: {
								type: 'spline',
								renderTo: 'ami_monitoring_server_plot2',
							},
							title: {
								text: null,
							},
							subtitle: {
								text: null,
							},
							xAxis: {
								type: 'datetime',
								gridLineWidth: 1,
							},
							yAxis: {
								minorTickInterval: 'auto',
								gridLineWidth: 1,
								min: 0,
								max: 125,
								title: {
									text: 'Percentage of availability',
								},
							},
							series: series,
						}));

						/*-------------------------*/
					});

				} else {
					this._serverCharts[0].series[0].points[0].update(availability);

					for(var i = 0; i < numericvalues.length; i++) {

						var value = parseInt(numericvalues[i].childNodes[0].nodeValue);

						var shift = this._serverCharts[1].series[i].data.length > 80;

						this._serverCharts[1].series[i].addPoint([t, value], false, shift);
					}

					this._serverCharts[1].redraw();
				}
			},
		});
	};

	/*-----------------------------------------------------------------*/

	this._connectionPoolUpdater = function() {

		var t = new Date().getTime();

		amiCommand.execute('GetConnectionPoolStatus', {context: this}).done(function(data) {

			var rows = amiWebApp.jspath('..row', data);

			$.foreach(rows, function(index, row) {

				var  numIdle  = parseInt(amiWebApp.jspath('..field{.@name=== "numIdle" }.$', data)[0] || '0');
				var numActive = parseInt(amiWebApp.jspath('..field{.@name==="numActive"}.$', data)[0] || '0');

				if(this._connectionPoolCharts.length <= index) {

					var url = amiWebApp.jspath('..field{.@name==="url"}.$', data)[0];
					var name = amiWebApp.jspath('..field{.@name==="name"}.$', data)[0];
					var poolSize = amiWebApp.jspath('..field{.@name=== "poolSize"}.$', data)[0];
					var minIdle = amiWebApp.jspath('..field{.@name=== "minIdle"}.$', data)[0];
					var maxIdle = amiWebApp.jspath('..field{.@name=== "maxIdle"}.$', data)[0];
					var maxActive = amiWebApp.jspath('..field{.@name=== "maxActive"}.$', data)[0];
					var timeBetweenEvictionRunsMillis = amiWebApp.jspath('..field{.@name=== "timeBetweenEvictionRunsMillis"}.$', data)[0];
					var minEvictableIdleTimeMillis = amiWebApp.jspath('..field{.@name=== "minEvictableIdleTimeMillis"}.$', data)[0];
					var validationInterval = amiWebApp.jspath('..field{.@name=== "validationInterval"}.$', data)[0];
					var maxWait = amiWebApp.jspath('..field{.@name=== "maxWait"}.$', data)[0];

					var dict = {
						INDEX: index,
						URL: url,
						NAME: name,
						POOL_SIZE: poolSize,
						MIN_IDLE: minIdle,
						MAX_IDLE: maxIdle,
						MAX_ACTIVE: maxActive,
						TIME_BETWEEN_EVICTION_RUNS_MILLIS: timeBetweenEvictionRunsMillis,
						MIN_EVICTABLE_IDLE_TIME_MILLIS: minEvictableIdleTimeMillis,
						VALIDATION_INTERVAL: validationInterval,
						MAX_WAIT: maxWait,
					};

					amiWebApp.appendHTML('ami_monitoring_connection_pool_content', this.connectionPoolFragment, {context: this, dict: dict}).done(function() {

						this._connectionPoolCharts.push(new Highcharts.Chart({

							chart: {
								type: 'spline',
								renderTo: 'ami_monitoring_connection_pool_plot' + index,
							},
							title: {
								text: null,
							},
							subtitle: {
								text: null,
							},
							xAxis: {
								type: 'datetime',
								gridLineWidth: 1,
							},
							yAxis: {
								minorTickInterval: 'auto',
								gridLineWidth: 1,
								min: 0,
								title: {
									text: 'Number of connections',
								},
							},
							series: [
								{name:  'Idle' , data: [[t,  numIdle ]]},
								{name: 'Active', data: [[t, numActive]]},
							],
						}));
					});

				} else {
					var chart = this._connectionPoolCharts[index];

					var shift = chart.series[0].data.length > 80;

					chart.series[0].addPoint([t,  numIdle ], false, shift);
					chart.series[1].addPoint([t, numActive], false, shift);

					chart.redraw();
				}

			}, this);
		});
	};

	/*-----------------------------------------------------------------*/

	this._usersUpdater = function() {

		amiCommand.execute('SearchQuery -catalog="self" -sql="SELECT (SELECT COUNT(`id`) FROM `router_user` WHERE `valid`=1) AS `valid`, (SELECT COUNT(`id`) FROM `router_user` WHERE `valid`=0) AS `invalid`"', {context: this}).done(function(data) {

			var  valid  = parseInt(amiWebApp.jspath('..field{.@name=== "valid" }.$', data)[0] || '0');
			var invalid = parseInt(amiWebApp.jspath('..field{.@name==="invalid"}.$', data)[0] || '0');

			var total = valid + invalid;

			var dict = {
				NUMBER_OF_USERS: total,
				NUMBER_OF_VALID_USERS: valid,
				NUMBER_OF_INVALID_USERS: invalid,
			};

			amiCommand.execute('SearchQuery -catalog="self" -sql="SELECT `country` AS `code`, COUNT(`country`) AS `z` FROM `router_user` GROUP BY `country`"', {context: this}).done(function(data) {

				var rows = amiWebApp.jspath('..row', data);

				var users = [];

				$.foreach(rows, function(index, row) {

					var code = amiWebApp.jspath('..field{.@name==="code"}.$', row)[0];
					var z = amiWebApp.jspath('..field{.@name==="z"}.$', row)[0];

					users.push({
						code: code,
						z: z,
					});
				});

				amiWebApp.replaceHTML('ami_monitoring_users_content', this.usersFragment, {dict: dict, context: this}).done(function() {

					var c = new Highcharts.Map({
			
						chart: {
							renderTo: 'ami_monitoring_user_plot1',
						},
						title: {
							text: null,
						},
						legend: {
							enabled: false,
						},
						series: [{
							color: '#E0E0E0',
							mapData: this.world,
							enableMouseTracking: false
						}, {
							type: 'mapbubble',
	       						data: users,
							mapData: this.world,
							joinBy: ['iso-a2', 'code'],
							minSize: 4,
							maxSize: '12%',
							tooltip: {
		    						pointFormat: '{point.code}: {point.z}'
							},
	    					}],
					});

					c.redraw();
				});
			});
		});
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiMonitoringApp = new AMIMonitoringApp();

amiWebApp.registerSubApp(amiMonitoringApp, 'amimonitoring', {});

/*-------------------------------------------------------------------------*/
