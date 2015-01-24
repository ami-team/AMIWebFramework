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

	this._serverTimer = null;
	this._serverCharts = [];

	this._connectionPoolTimer = null;
	this._connectionPoolCharts = [];

	/*-----------------------------------------------------------------*/

	this.onReady = function(userdata) {

		var result = $.Deferred();

		amiWebApp.loadSheets([
			'subapps/Monitoring/css/AMIMonitoringApp.css',
		]);

		amiWebApp.loadScripts([
			'tools/common/js/highcharts.min.js',
			'tools/common/js/highcharts-more.min.js',
			'tools/common/js/modules/solid-gauge.js',
		]);

		Highcharts.setOptions({
			credits: {
				enabled: false,
			},
		});

		$('#ami_jumbotron_title').html('Monitoring');
		$('#ami_jumbotron_content').html('');
		$('#ami_breadcrumb_content').html('<li><a href="">Admin</a></li><li><a href="">Monitoring</a></li>');

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
						});
					});
				});
			});
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
		/* LOGS                                                    */
		/*---------------------------------------------------------*/

		this._logsUpdater();

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

		var t = new Date().getTime();

		amiCommand.execute('Ping', {context: this, converter: '', extraParam: 'Service', extraValue: '%'}).done(function(data) {

			var parser = new DOMParser();

			var doc = parser.parseFromString(data, 'text/xml');

			var numericvalues = doc.getElementsByTagName('numericvalue');

			var availability = parseInt(doc.getElementsByTagName('availability')[0].childNodes[0].nodeValue);

			if(this._serverCharts.length === 0) {

				var dict = {
					NUMBER_OF_NODES: numericvalues.length,
				};

				amiWebApp.replaceHTML('serverContent', this.serverFragment, {context: this, dict: dict}).done(function() {

					this._serverCharts.push(new Highcharts.Chart({
			
						chart: {
							type: 'gauge',
							renderTo: 'serverPlot1',
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
								to: 25,
								color: '#DF5353' // red
							}, {
								from: 25,
								to: 87.5,
								color: '#DDDF0D' // yellow
							}, {
								from: 87.5,
								to: 100,
								color: '#55BF3B' // green
							}],
						},
						series: [
							{name: 'Availability', data: [availability], dataLabels: {enabled: false}}
						],
					}));

					var series = [];

					for(var i = 0; i < numericvalues.length; i++) {

						var name = numericvalues[i].getAttribute('name');

						var data = [[t, parseInt(numericvalues[i].childNodes[0].nodeValue)]];

						series.push({
							name: name,
							data: data,
						});
					}

					this._serverCharts.push(new Highcharts.Chart({

						chart: {
							type: 'spline',
							renderTo: 'serverPlot2',
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
		});
	};

	/*-----------------------------------------------------------------*/

	this._connectionPoolUpdater = function() {

		var t = new Date().getTime();

		amiCommand.execute('GetConnectionPoolStatus', {context: this}).done(function(data) {

			var rows = amiWebApp.jspath('..row', data);

			$.arrayFor(rows, function(index, row) {

				var  numIdle  = parseInt(amiWebApp.jspath('..field{.@name=== "numIdle" }.$', data)[0]);
				var numActive = parseInt(amiWebApp.jspath('..field{.@name==="numActive"}.$', data)[0]);

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

					amiWebApp.appendHTML('connectionPoolContent', this.connectionPoolFragment, {context: this, dict: dict}).done(function() {

						this._connectionPoolCharts.push(new Highcharts.Chart({

							chart: {
								type: 'spline',
								renderTo: 'connectionPoolPlot' + index,
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

		amiCommand.execute('Echo', {context: this}).done(function(data) {

			var dict = {
				NUMBER_OF_USERS: 2,
				NUMBER_OF_VALID_USERS: 2,
				NUMBER_OF_INVALID_USERS: 0,
			};

			amiWebApp.replaceHTML('usersContent', this.usersFragment, {dict: dict}).done(function() {

				$('#userPlot1').highcharts({

					title: {
						text: 'Countries',
					},
					subtitle: {
						text: null,
					},
					series: [{
						type: 'pie',
						data: [
							['Unknown', 100.0],
						]
					}],
					plotOptions: {
						pie: {
							dataLabels: {
								enabled: true,
								format: '<b>{point.name}</b>: {point.percentage:.1f} %',
								style: {
									color: 'black',
								},
							},
						},
					},
				});

				$('#userPlot2').highcharts({

					title: {
						text: 'Agents',
					},
					subtitle: {
						text: null,
					},
					series: [{
						type: 'pie',
						data: [
							['Unknown', 100.0],
						]
					}],
					plotOptions: {
						pie: {
							dataLabels: {
								enabled: true,
								format: '<b>{point.name}</b>: {point.percentage:.1f} %',
								style: {
									color: 'black',
								},
							},
						},
					},
				});
			});
		});
	};

	/*-----------------------------------------------------------------*/

	this._logsUpdater = function() {

		amiCommand.execute('GetTomcatLogs', {context: this}).done(function(data) {

			var base64 = amiWebApp.jspath('..base64.$', data)[0];

			var dict = {
				TEXT: amiBase64Decode(base64),
			};

			amiWebApp.replaceHTML('logsContent', this.logsFragment, {dict: dict}).done(function() {

				var textarea = document.getElementById('logsTextArea');

				textarea.scrollTop = textarea.scrollHeight;
			});
		});
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiMonitoringApp = new AMIMonitoringApp();

/*-------------------------------------------------------------------------*/
