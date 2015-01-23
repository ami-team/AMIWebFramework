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

	this._connectionPoolCharts = [  ];
	this._connectionPoolTimer = null;

	/*-----------------------------------------------------------------*/

	this.onReady = function(userdata) {

		var result = $.Deferred();

		amiWebApp.loadSheets([
			'subapps/Monitoring/css/AMIMonitoringApp.css',
		]);

		amiWebApp.loadScripts([
			'tools/common/js/highcharts.min.js',
			'tools/common/js/modules/exporting.js',
		]);

		$('#ami_jumbotron_title').html('Monitoring');
		$('#ami_jumbotron_content').html('');
		$('#ami_breadcrumb_content').html('<li><a href="">Admin</a></li><li><a href="">Monitoring</a></li>');

		amiWebApp.loadHTML('subapps/Monitoring/html/AMIMonitoringApp.html', {context: this}).done(function(data1) {
			amiWebApp.loadHTML('subapps/Monitoring/html/Fragment/connectionPool.html', {context: this}).done(function(data2) {

				amiWebApp.replaceHTML('ami_main_content', data1, {context: this}).done(function() {

					this.connectionPoolFragment = data2;

					result.resolve();
				});
			});
		});

		return result;
	};

	/*-----------------------------------------------------------------*/

	this.onExit = function() {

		if(this._connectionPoolTimer) {

			clearTimeout(this._connectionPoolTimer);
		}
	};

	/*-----------------------------------------------------------------*/

	this.onLogin = function() {
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
	};

	/*-----------------------------------------------------------------*/

	this.onLogout = function() {
	};

	/*-----------------------------------------------------------------*/

	this.onSessionExpired = function() {
	};

	/*-----------------------------------------------------------------*/

	this._connectionPoolUpdater = function() {

		var t = new Date().getTime();

		amiCommand.execute('GetConnectionStatus', {context: this}).done(function(data) {

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

					amiWebApp.prependHTML('connectionPoolContent', this.connectionPoolFragment, {context: this, dict: dict}).done(function() {

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
							},
							yAxis: {
								title: {
									text: 'Number of connections',
								},
							},
							exporting: {
								enabled: false,
							},
							series: [
								{name:  'Idle' , data: [[t,  numIdle ]]},
								{name: 'Active', data: [[t, numActive]]},
							],
							credits: {
								enabled: false,
							},
						}));
					});

				} else {

					var shift = this._connectionPoolCharts[index].series[0].data.length > 80;

					this._connectionPoolCharts[index].series[0].addPoint([t,  numIdle ], false, shift);
					this._connectionPoolCharts[index].series[1].addPoint([t, numActive], false, shift);

					this._connectionPoolCharts[index].redraw();
				}

			}, this);
		});
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiMonitoringApp = new AMIMonitoringApp();

/*-------------------------------------------------------------------------*/
