/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* AMIAdminDashboardMonitoring                                             */
/*-------------------------------------------------------------------------*/

$AMIClass('AMIAdminDashboardMonitoring', {
	/*-----------------------------------------------------------------*/

	_init: function()
	{
		amiWebApp.loadScripts([
			'js/3rd-party/d3.min.js',
			'js/3rd-party/topojson.min.js',
			'js/3rd-party/datamaps.world.min.js',
		]);

		$('#ami_jumbotron_content').html('Monitoring');

		var result = $.Deferred();

		amiWebApp.loadHTMLs([
			'subapps/AdminDashboard/html/fragment/monitoring/monitoring.html',
			'subapps/AdminDashboard/html/fragment/monitoring/servers.html',
			'subapps/AdminDashboard/html/fragment/monitoring/connection_pool.html',
			'subapps/AdminDashboard/html/fragment/monitoring/users.html',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_admin_dashboard_content', data[0], {context: this}).done(function() {

				this.fragmentServers = data[1];
				this.fragmentConnectionPool = data[2];
				this.fragmentUsers = data[3];

				result.resolve();
			});

		}).fail(function() {
			result.reject();
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
		this._updateServers();
		this._updateConnectionPool();
		this._updateUsers();
	},

	/*-----------------------------------------------------------------*/

	_updateServers: function()
	{
		var url = amiCommand.endpoint.replace('FrontEnd', 'SLS').trim();

		data = {
			Mode: 'soft',
			Service: '%',
			Converter: 'AMIXmlToJson.xsl',
		};

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
				/*-----------------------------------------*/

				var servers = [];

				var options = '';

				var numericvalues = data.getElementsByTagName('numericvalue');

				for(var i = 0; i < numericvalues.length; i++)
				{
					var name = numericvalues[i].getAttribute('name');
					var value = parseInt(numericvalues[i].childNodes[0].nodeValue);

					servers.push({
						name: name,
						value: value,
					});

					options += '<option>' + name + '</option>';
				}

				/*-----------------------------------------*/

				var dict = {
					NUMBER_OF_NODES: numericvalues.length
				};

				/*-----------------------------------------*/

				amiWebApp.replaceHTML('#ami_monitoring_server_content', this.fragmentServers, {dict: dict}).done(function() {

					$('#ami_moniroring_nodes').html(options);
				});

				/*-----------------------------------------*/
			},
		});
	},

	/*-----------------------------------------------------------------*/

	_updateConnectionPool: function()
	{
		var dict = {
			/* TODO */
		};

		amiWebApp.replaceHTML('#ami_monitoring_connection_pool_content', this.fragmentConnectionPool, {dict: dict}).done(function() {

			$('#ami_moniroring_nodes').html(this.options);

		});
	},

	/*-----------------------------------------------------------------*/

	_updateUsers: function()
	{
		amiCommand.execute('SearchQuery -catalog="self" -sql="SELECT (SELECT COUNT(`id`) FROM `router_user` WHERE `valid`=1) AS `valid`, (SELECT COUNT(`id`) FROM `router_user` WHERE `valid`=0) AS `invalid`"', {context: this}).done(function(data) {

			var  valid  = parseInt(amiWebApp.jspath('..field{.@name=== "valid" }.$', data)[0] || '0');
			var invalid = parseInt(amiWebApp.jspath('..field{.@name==="invalid"}.$', data)[0] || '0');

			var total = valid + invalid;

			var dict = {
				NUMBER_OF_USERS: total,
				NUMBER_OF_VALID_USERS: valid,
				NUMBER_OF_INVALID_USERS: invalid,
			};

			amiWebApp.replaceHTML('#ami_monitoring_user_content', this.fragmentUsers, {dict: dict}).done(function() {

				var map = new Datamap({element: document.getElementById('ami_monitoring_worldmap')});
			});
		});
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
