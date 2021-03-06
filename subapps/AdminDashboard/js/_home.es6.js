/*!
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global Chart
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/
/* AdminDashboardHome                                                                                                 */
/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('AdminDashboardHome', {
	/*----------------------------------------------------------------------------------------------------------------*/

	_init: function()
	{
		const result = $.Deferred();

		amiWebApp.loadResources([
			'js/3rd-party/chart.bundle.min.js',
			'subapps/AdminDashboard/twig/home/home.twig',
			'subapps/AdminDashboard/twig/home/extra_menu.twig',
		]).done((data) => {

			amiWebApp.replaceHTML('#CB6036B7_5971_41C2_1194_F5A051B21EA0', data[1]).done(() => {
				amiWebApp.replaceHTML('#C54485C3_44F8_CE8E_0F54_BF847CEECE11', data[2]).done(() => {

					/*------------------------------------------------------------------------------------------------*/

					$('#FCA2B6DC_3239_838D_A109_91F164524987').text(jQuery.fn.tooltip.Constructor.VERSION);

					$('#F8D580E4_05F1_0317_9F3F_E4BA7AB99D3E').text(jQuery.fn.jquery);

					$('#ACA527B0_4581_8292_DB2A_22C900E621A0').text(amiTwig.version);

					$('#D9C3541F_3534_1312_4C08_F22962C05347').text(JSPath.version);

					$('#E15C9F8C-A955-2643-196B-BBF3317D1616').text(ami.version);

					$('#A47094A8-3D38-666B-E542-2C88AC486E1D').text(ami.commit_id);

					/*------------------------------------------------------------------------------------------------*/

					const options1 = {
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

					/*------------------------------------------------------------------------------------------------*/

					const options2 = {
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

					/*------------------------------------------------------------------------------------------------*/

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

					/*------------------------------------------------------------------------------------------------*/

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

					/*------------------------------------------------------------------------------------------------*/

					result.resolve();
				});
			});

		}).fail((message) => {

			result.reject(message);
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function()
	{
		const result = $.Deferred();

		amiCommand.execute('SearchQuery -catalog="self" -entity="N/A" -sql="SELECT (SELECT COUNT(*) FROM `router_config`) AS `nb1`, (SELECT COUNT(*) FROM `router_role`) AS `nb2`, (SELECT COUNT(*) FROM `router_command`) AS `nb3`, (SELECT COUNT(*) FROM `router_user`) AS `nb4`, (SELECT COUNT(*) FROM `router_catalog`) AS `nb5`"').done((data) => {

			const nr1 = amiWebApp.jspath('..field{.@name==="nb1"}.$', data)[0] || 'N/A';
			const nr2 = amiWebApp.jspath('..field{.@name==="nb2"}.$', data)[0] || 'N/A';
			const nr3 = amiWebApp.jspath('..field{.@name==="nb3"}.$', data)[0] || 'N/A';
			const nr4 = amiWebApp.jspath('..field{.@name==="nb4"}.$', data)[0] || 'N/A';
			const nr5 = amiWebApp.jspath('..field{.@name==="nb5"}.$', data)[0] || 'N/A';

			$('#F38F2C33_FD2B_0947_D711_D07C095AED8C').text(nr1);
			$('#B86F861D_ECA4_8CF4_1ABC_30EFF044A03F').text(nr2);
			$('#B1969A3F_D9F3_DEA2_E351_53A827AECA72').text(nr3);
			$('#CFC83907_4194_F600_8191_C0DEB7CADF25').text(nr4);
			$('#BC9730FE_4458_C523_2F43_2B16F0671E7E').text(nr5);

			amiCommand.execute('GetServerStatus').done((data) => {

				/*----------------------------------------------------------------------------------------------------*/

				const javaBuildVersion = amiWebApp.jspath('..rowset{.@type==="java"}..field{.@name==="buildVersion"}.$', data)[0] || 'N/A';
				const amiBuildVersion = amiWebApp.jspath('..rowset{.@type==="ami"}..field{.@name==="buildVersion"}.$', data)[0] || 'N/A';
				const amiCommitIdAbbrev = amiWebApp.jspath('..rowset{.@type==="ami"}..field{.@name==="commitIdAbbrev"}.$', data)[0] || 'N/A';

				/*----------------------------------------------------------------------------------------------------*/

				$('#F10C1A82_4C46_C08F_F56A_7B9A90416B68').text(javaBuildVersion);
				$('#F1FA8298_F283_E0C4_A9F6_74C8EB2E4762').text(amiBuildVersion);
				$('#A8F46B0F_4657_09B7_BB0D_6B4434FD79A3').text(amiCommitIdAbbrev);

				/*----------------------------------------------------------------------------------------------------*/

				const hostName = amiWebApp.jspath('..field{.@name==="hostName"}.$', data)[0] || 'N/A';
				const nbOfCores = amiWebApp.jspath('..field{.@name==="nbOfCores"}.$', data)[0] || 'N/A';

				const freeDisk = parseInt(amiWebApp.jspath('..field{.@name==="freeDisk"}.$', data)[0] || '0');
				const totalDisk = parseInt(amiWebApp.jspath('..field{.@name==="totalDisk"}.$', data)[0] || '0');

				const freeMem = parseInt(amiWebApp.jspath('..field{.@name==="freeMem"}.$', data)[0] || '0');
				const totalMem = parseInt(amiWebApp.jspath('..field{.@name==="totalMem"}.$', data)[0] || '0');

				/*----------------------------------------------------------------------------------------------------*/

				$('#B2BE4D58_BE5D_F374_BE74_BE6C4384B125').text(hostName);
				$('#C4889AE7_CB06_DE89_1297_B9FF7C9C8BA1').text(nbOfCores);
				$('#FCD9CCC9_65EA_092F_B715_C1C49255943F').text(Math.round(totalDisk / (1024.0 * 1024.0)));
				$('#A1A836FF_D465_1A2C_B045_AC691EEF0812').text(Math.round(totalMem / (1024.0 * 1024.0)));

				/*----------------------------------------------------------------------------------------------------*/

				this._chart1.data.datasets[0].data[0] = Math.round((totalDisk - freeDisk) / (1024.0 * 1024.0));
				this._chart1.data.datasets[0].data[1] = Math.round((freeDisk - 0x000000) / (1024.0 * 1024.0));
				this._chart1.update();

				this._chart2.data.datasets[0].data[0] = Math.round((totalMem - freeMem) / (1024.0 * 1024.0));
				this._chart2.data.datasets[0].data[1] = Math.round((freeMem - 0x00000) / (1024.0 * 1024.0));
				this._chart2.update();

				/*----------------------------------------------------------------------------------------------------*/

				result.resolve();

			}).fail((data, message) => {

				result.reject(message);
			});

		}).fail((data, message) => {

			result.reject(message);
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	reflesh: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		this.onLogin().done(() => {

			amiWebApp.unlock();

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
