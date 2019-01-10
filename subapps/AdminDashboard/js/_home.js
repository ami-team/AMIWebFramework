/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* AdminDashboardHome                                                      */
/*-------------------------------------------------------------------------*/

$AMIClass('AdminDashboardHome', {
	/*---------------------------------------------------------------------*/

	_init: function()
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'js/3rd-party/chart.bundle.min.js',
			'subapps/AdminDashboard/twig/home/home.twig',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#CB6036B7_5971_41C2_1194_F5A051B21EA0', data[1], {context: this}).done(function() {

				/*---------------------------------------------------------*/

				var options1 = {
					rotation: -Math.PI,
					cutoutPercentage: 50,
					circumference: +Math.PI,
					animation: {
						animateScale: false,
						animateRotate: false,
					},
					legend: {
						display: true,
						position: 'left',
					},
					title: {
						display: true,
						position: 'bottom',
						text: 'Disk availability [MBytes]',
					},
				};

				/*---------------------------------------------------------*/

				var options2 = {
					rotation: -Math.PI,
					cutoutPercentage: 50,
					circumference: +Math.PI,
					animation: {
						animateScale: false,
						animateRotate: false,
					},
					legend: {
						display: true,
						position: 'left',
					},
					title: {
						display: true,
						position: 'bottom',
						text: 'Memory availability [MBytes]',
					},
				};

				/*---------------------------------------------------------*/

				this._chart1 = new Chart($('#F6D24B37_F159_CB36_2D51_466740F9588E')[0].getContext('2d'), {
					type: 'pie',
					data: {
						labels: [
							'Used',
							'Free',
						],
						datasets: [{
							data: [0, 100],
							borderColor: [
								'#F5C6CB',
								'#C3E6CB',
							],
							backgroundColor: [
								'#F5C6CB',
								'#D4EDDA',
							],
						}],
					},
					options: options1,
				});

				/*---------------------------------------------------------*/

				this._chart2 = new Chart($('#D058BCEF_2903_2D9D_837F_0B5C8858011D')[0].getContext('2d'), {
					type: 'pie',
					data: {
						labels: [
							'Used',
							'Free',
						],
						datasets: [{
							data: [0, 100],
							borderColor: [
								'#F5C6CB',
								'#C3E6CB',
							],
							backgroundColor: [
								'#F5C6CB',
								'#D4EDDA',
							],
						}]
					},
					options: options2,
				});

				/*---------------------------------------------------------*/

				result.resolve();
			});

		}).fail(function(message) {

			result.reject(message);
		});

		return result;
	},

	/*---------------------------------------------------------------------*/

	onLogin: function()
	{
		var result = $.Deferred();

		amiCommand.execute('SearchQuery -catalog="self" -sql="SELECT (SELECT COUNT(*) FROM `router_config`) AS `nb1`, (SELECT COUNT(*) FROM `router_role`) AS `nb2`, (SELECT COUNT(*) FROM `router_command`) AS `nb3`, (SELECT COUNT(*) FROM `router_user`) AS `nb4`, (SELECT COUNT(*) FROM `router_catalog`) AS `nb5`"', {context: this}).done(function(data) {

			var nr1 = amiWebApp.jspath('..field{.@name==="nb1"}.$', data)[0] || 'N/A';
			var nr2 = amiWebApp.jspath('..field{.@name==="nb2"}.$', data)[0] || 'N/A';
			var nr3 = amiWebApp.jspath('..field{.@name==="nb3"}.$', data)[0] || 'N/A';
			var nr4 = amiWebApp.jspath('..field{.@name==="nb4"}.$', data)[0] || 'N/A';
			var nr5 = amiWebApp.jspath('..field{.@name==="nb5"}.$', data)[0] || 'N/A';

			$('#F38F2C33_FD2B_0947_D711_D07C095AED8C').text(nr1);
			$('#B86F861D_ECA4_8CF4_1ABC_30EFF044A03F').text(nr2);
			$('#B1969A3F_D9F3_DEA2_E351_53A827AECA72').text(nr3);
			$('#CFC83907_4194_F600_8191_C0DEB7CADF25').text(nr4);
			$('#BC9730FE_4458_C523_2F43_2B16F0671E7E').text(nr5);

			amiCommand.execute('GetServerStatus', {context: this}).done(function(data) {

				/*---------------------------------------------------------*/

				var buildVersion = amiWebApp.jspath('..field{.@name==="buildVersion"}.$', data)[0] || 'N/A';
				var commitIdAbbrev = amiWebApp.jspath('..field{.@name==="commitIdAbbrev"}.$', data)[0] || 'N/A';

				/*---------------------------------------------------------*/

				$('#F1FA8298_F283_E0C4_A9F6_74C8EB2E4762').text(buildVersion);
				$('#A8F46B0F_4657_09B7_BB0D_6B4434FD79A3').text(commitIdAbbrev);

				/*---------------------------------------------------------*/

				var hostName = amiWebApp.jspath('..field{.@name==="hostName"}.$', data)[0] || 'N/A';

				var freeDisk = parseInt(amiWebApp.jspath('..field{.@name==="freeDisk"}.$', data)[0] || '0');
				var totalDisk = parseInt(amiWebApp.jspath('..field{.@name==="totalDisk"}.$', data)[0] || '0');

				var freeMem = parseInt(amiWebApp.jspath('..field{.@name==="freeMem"}.$', data)[0] || '0');
				var totalMem = parseInt(amiWebApp.jspath('..field{.@name==="totalMem"}.$', data)[0] || '0');

				var nbOfCores = amiWebApp.jspath('..field{.@name==="nbOfCores"}.$', data)[0] || 'N/A';

				/*---------------------------------------------------------*/

				$('#C2C3B0C0_753B_47BD_926A_B71AF5399852').html('Host name: <strong>' + amiWebApp.textToHtml(hostName) + '</strong>, nb of cores: <strong>' + amiWebApp.textToHtml(nbOfCores) + '</strong>, disk: <strong>' + Math.round(totalDisk / (1024.0 * 1024.0)) + '</strong> MBytes, memory: <strong>' + Math.round(totalMem / (1024.0 * 1024.0)) + '</strong> MBytes <button type="button" class="btn btn-sm btn-info" onclick="adminDashboardApp.subsubapp.reflesh()" style="position: absolute; top: 8px; right: 8px;">refresh</button>');

				/*---------------------------------------------------------*/

				this._chart1.data.datasets[0].data[0] = Math.round((totalDisk - freeDisk) / (1024.0 * 1024.0));
				this._chart1.data.datasets[0].data[1] = Math.round((freeDisk - 0x000000) / (1024.0 * 1024.0));
				this._chart1.update();

				this._chart2.data.datasets[0].data[0] = Math.round((totalMem - freeMem) / (1024.0 * 1024.0));
				this._chart2.data.datasets[0].data[1] = Math.round((freeMem - 0x00000) / (1024.0 * 1024.0));
				this._chart2.update();

				/*---------------------------------------------------------*/

				result.resolve();

			}).fail(function(data, message) {

				result.reject(message);
			});

		}).fail(function(data, message) {

			result.reject(message);
		});

		return result;
	},

	/*---------------------------------------------------------------------*/

	flushCommandCache: function()
	{
		/*-----------------------------------------------------------------*/

		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		/*-----------------------------------------------------------------*/

		amiCommand.execute('FlushCommandCache').done(function(data, message) {

			amiWebApp.success(message, true);

		}).fail(function(data, message) {

			amiWebApp.error(message, true);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	flushServerCaches: function()
	{
		/*-----------------------------------------------------------------*/

		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		/*-----------------------------------------------------------------*/

		amiCommand.execute('FlushServerCaches -full').done(function(data, message) {

			amiWebApp.success(message, true);

		}).fail(function(data, message) {

			amiWebApp.error(message, true);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	reflesh: function()
	{
		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		/*-----------------------------------------------------------------*/

		this.onLogin().done(function() {

			amiWebApp.unlock();

		}).fail(function(data, message) {

			amiWebApp.error(message, true);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
