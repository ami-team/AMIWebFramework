/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('TaskServerAdminApp', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function()
	{
		const result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/TaskServerAdmin/twig/TaskServerAdminApp.twig',
			'ctrl:tab',
			'ctrl:table',
		]).done((data) => {

			amiWebApp.replaceHTML('#ami_main_content', data[0]).done(() => {

				const tab1 = new data[1](this);
				const tab2 = new data[1](this);

				tab1.render('#C85980DA_6A5D_3D7C_54DE_D50A1BD15292', {card: false}).done(() => {

					tab2.render('#E6D5E436_5891_0A6F_47E3_8A318364DE4A', {card: false}).done(() => {

						tab1.appendItem('<i class="fa fa-clock-o"></i> tasks', {closable: false}).done((tabSel1) => {

							tab2.appendItem('<i class="fa fa-clock-o"></i> tasks', {closable: false}).done((tabSel2) => {

								/*------------------------------------------------------------------------------------*/

								this._tableCtrlRecurrentTasks = new data[2](tab1);
								this._tableCtrlOneShotTasks = new data[2](tab2);

								this.tabSel1 = tabSel1;
								this.tabSel2 = tabSel2;

								/*------------------------------------------------------------------------------------*/

								$('#D567A5FD_6C12_EEA6_4E74_FDB678BE483B:checkbox').change((e) => {

									if($(e.currentTarget).prop('checked'))
									{
										$('#CB715F4D_8C12_52DC_2745_296FC8A9AC63').prop('disabled', false);
									}
									else
									{
										$('#CB715F4D_8C12_52DC_2745_296FC8A9AC63').prop('disabled', true);
									}
								});

								/*------------------------------------------------------------------------------------*/

								$('#DC48E537_4113_EFE6_254C_681063948076').submit((e) => {

									e.preventDefault();

									this.addTask();
								});

								$('#FE046874_8D80_D8E5_CF7D_BCD1C8298F8A').click((e) => {

									e.preventDefault();

									this.killTask();
								});

								$('#A2A6E378_7F58_8AC8_EBFE_54646CF06122').click((e) => {

									e.preventDefault();

									this.getServerStatus();
								});

								/*------------------------------------------------------------------------------------*/

								this.profiles = {
								};

								this.servers = {
								};

								/*------------------------------------------------------------------------------------*/

								result.resolve();

							});
						});
					});
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
		/*------------------------------------------------------------------------------------------------------------*/

		const result = this.getServerNames();

		/*------------------------------------------------------------------------------------------------------------*/

		this._tableCtrlRecurrentTasks.render(this.tabSel1, 'SearchQuery -catalog="tasks" -entity="router_task" -sql="SELECT id, running, success, FROM_UNIXTIME(lastStartDate) AS lastStartDate, FROM_UNIXTIME(lastStopDate) AS lastStopDate, name, description, command, commaSeparatedLocks AS locks, priority, timeStep, serverName, stdout, stderr FROM router_task WHERE oneShot = \'0\'"', {showDetails: false, showTools: true, canEdit: true, catalog: 'tasks', entity: 'router_task', primaryField: 'id'});

		this._tableCtrlOneShotTasks.render(this.tabSel2, 'SearchQuery -catalog="tasks" -entity="router_task" -sql="SELECT id, running, success, FROM_UNIXTIME(lastStartDate) AS lastStartDate, FROM_UNIXTIME(lastStopDate) AS lastStopDate, name, description, command, commaSeparatedLocks AS locks, priority, timeStep, serverName, stdout, stderr FROM router_task WHERE oneShot = \'1\'"', {showDetails: false, showTools: true, canEdit: true, catalog: 'tasks', entity: 'router_task', primaryField: 'id'});

		/*------------------------------------------------------------------------------------------------------------*/

		setInterval(() => {

			this._refreshTables();

		}, 10000);

		/*------------------------------------------------------------------------------------------------------------*/

		if(amiLogin.hasRole(/*--*/'AMI_ADMIN'/*--*/)
		   ||
		   amiLogin.hasRole('AMI_administrator_role')
		 ) {
			$('#A4E89C31_F65A_D4CD_DE10_60564C7D8DD6').show();
		}
		else
		{
			$('#A4E89C31_F65A_D4CD_DE10_60564C7D8DD6').hide();
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function()
	{
		$('#A4E89C31_F65A_D4CD_DE10_60564C7D8DD6').hide();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	getServerNames: function()
	{
		const result = $.Deferred();

		amiCommand.execute('SearchQuery -catalog="tasks" -entity="router_task_server" -sql="SELECT name, description, endpoint FROM router_task_server"').done((data, message) => {

			/*--------------------------------------------------------------------------------------------------------*/

			const rows = amiWebApp.jspath('..row', data);

			/*--------------------------------------------------------------------------------------------------------*/

			const html = ['<option value="" style="display: none;">-- select a task server --</option>'];

			rows.forEach((row) => {

				var name = amiWebApp.jspath('..field{.@name==="name"}.$', row)[0] || '';
				var description = amiWebApp.jspath('..field{.@name==="description"}.$', row)[0] || '';
				var endpoint = amiWebApp.jspath('..field{.@name==="endpoint"}.$', row)[0] || '';

				if(name && endpoint)
				{
					this.servers[name] = endpoint;

					html.push('<option value="' + name + '" data-description="' + amiWebApp.textToHtml(description) + '">' + name + '</option>');
				}

			});

			/*--------------------------------------------------------------------------------------------------------*/

			$('#CEA0E2BE_4C71_ACA3_7525_0D7AC734BEED').html(html.join(''));

			$('#E81F70B5_422A_A17C_F608_845B8A9E73FB').html(html.join(''))
			                                          .select2()
			;

			/*--------------------------------------------------------------------------------------------------------*/

			result.resolve(message);

		}).fail((data, message) => {

			result.reject(message);
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	getServerStatus: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		let nr = 2;

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

		const endpoint = this.servers[$('#CEA0E2BE_4C71_ACA3_7525_0D7AC734BEED').val()] || '';

		if(!endpoint)
		{
			amiWebApp.unlock();

			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		$('#C546B8C6_FC0F_DB86_E6D1_B9291E96B200').removeClass('badge-success');
		$('#C546B8C6_FC0F_DB86_E6D1_B9291E96B200').addClass('badge-danger');
		$('#C546B8C6_FC0F_DB86_E6D1_B9291E96B200').text('stopped');

		$('#CDBD4AB0_B1FF_C53C_1EE2_85C9E76F8DED').removeClass('badge-success');
		$('#CDBD4AB0_B1FF_C53C_1EE2_85C9E76F8DED').addClass('badge-danger');
		$('#CDBD4AB0_B1FF_C53C_1EE2_85C9E76F8DED').text('?');

		$('#DE7F28B6_BC3B_8A12_2194_87A4A3A0CC1A').removeClass('badge-success');
		$('#DE7F28B6_BC3B_8A12_2194_87A4A3A0CC1A').addClass('badge-danger');
		$('#DE7F28B6_BC3B_8A12_2194_87A4A3A0CC1A').text('?');

		$('#C0345D24_3729_AE4F_5177_8C28A7E353B6').removeClass('badge-success');
		$('#C0345D24_3729_AE4F_5177_8C28A7E353B6').addClass('badge-danger');
		$('#C0345D24_3729_AE4F_5177_8C28A7E353B6').text('?');

		$('#D34F9230_073D_467B_7AD0_9FD54CBF9436').removeClass('badge-success');
		$('#D34F9230_073D_467B_7AD0_9FD54CBF9436').addClass('badge-danger');
		$('#D34F9230_073D_467B_7AD0_9FD54CBF9436').text('?');

		$('#FAAF468D_6270_42A1_167E_F38F02DB47F2').removeClass('badge-success');
		$('#FAAF468D_6270_42A1_167E_F38F02DB47F2').addClass('badge-danger');
		$('#FAAF468D_6270_42A1_167E_F38F02DB47F2').text('?');

		$('#FE88551D_8779_8359_02AA_32699B324D33').val('');

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.execute('GetServerStatus', {endpoint: endpoint}).done((data) => {

			const freeDisk = Math.floor(parseFloat(amiWebApp.jspath('..field{.@name==="freeDisk"}.$', data)) / (1024.0 * 1024.0));
			const totalDisk = Math.floor(parseFloat(amiWebApp.jspath('..field{.@name==="totalDisk"}.$', data)) / (1024.0 * 1024.0));
			const freeMem = Math.floor(parseFloat(amiWebApp.jspath('..field{.@name==="freeMem"}.$', data)) / (1024.0 * 1024.0));
			const totalMem = Math.floor(parseFloat(amiWebApp.jspath('..field{.@name==="totalMem"}.$', data)) / (1024.0 * 1024.0));

			const nbOfCPUs = parseInt(amiWebApp.jspath('..field{.@name==="nbOfCPUs"}.$', data));

			/**/

			$('#CDBD4AB0_B1FF_C53C_1EE2_85C9E76F8DED').text(freeDisk + ' MB');
			$('#DE7F28B6_BC3B_8A12_2194_87A4A3A0CC1A').text(totalDisk + ' MB');

			if((freeDisk / totalDisk) > 0.25)
			{
				$('#CDBD4AB0_B1FF_C53C_1EE2_85C9E76F8DED').removeClass('badge-danger');
				$('#CDBD4AB0_B1FF_C53C_1EE2_85C9E76F8DED').addClass('badge-success');
			}
			else
			{
				$('#CDBD4AB0_B1FF_C53C_1EE2_85C9E76F8DED').removeClass('badge-success');
				$('#CDBD4AB0_B1FF_C53C_1EE2_85C9E76F8DED').addClass('badge-danger');
			}

			$('#DE7F28B6_BC3B_8A12_2194_87A4A3A0CC1A').removeClass('badge-danger');
			$('#DE7F28B6_BC3B_8A12_2194_87A4A3A0CC1A').addClass('badge-success');

			/**/

			$('#C0345D24_3729_AE4F_5177_8C28A7E353B6').text(freeMem + ' MB');
			$('#D34F9230_073D_467B_7AD0_9FD54CBF9436').text(totalMem + ' MB');

			if((freeMem / totalMem) > 0.25)
			{
				$('#C0345D24_3729_AE4F_5177_8C28A7E353B6').removeClass('badge-danger');
				$('#C0345D24_3729_AE4F_5177_8C28A7E353B6').addClass('badge-success');
			}
			else
			{
				$('#C0345D24_3729_AE4F_5177_8C28A7E353B6').removeClass('badge-success');
				$('#C0345D24_3729_AE4F_5177_8C28A7E353B6').addClass('badge-danger');
			}

			$('#D34F9230_073D_467B_7AD0_9FD54CBF9436').removeClass('badge-danger');
			$('#D34F9230_073D_467B_7AD0_9FD54CBF9436').addClass('badge-success');

			/**/

			$('#FAAF468D_6270_42A1_167E_F38F02DB47F2').text(nbOfCPUs);

			$('#FAAF468D_6270_42A1_167E_F38F02DB47F2').removeClass('badge-danger');
			$('#FAAF468D_6270_42A1_167E_F38F02DB47F2').addClass('badge-success');

		}).always(() => {

			if(--nr <= 0)
			{
				$('#C546B8C6_FC0F_DB86_E6D1_B9291E96B200').removeClass('badge-danger');
				$('#C546B8C6_FC0F_DB86_E6D1_B9291E96B200').addClass('badge-success');
				$('#C546B8C6_FC0F_DB86_E6D1_B9291E96B200').text('running');

				amiWebApp.unlock();
			}
		});

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.execute('GetServerLogs', {endpoint: endpoint}).done((data) => {

			const logs = amiWebApp.jspath('..field{.@name==="logs"}.$', data);

			$('#FE88551D_8779_8359_02AA_32699B324D33').val(logs);

		}).always(() => {

			if(--nr <= 0)
			{
				$('#C546B8C6_FC0F_DB86_E6D1_B9291E96B200').removeClass('badge-danger');
				$('#C546B8C6_FC0F_DB86_E6D1_B9291E96B200').addClass('badge-success');
				$('#C546B8C6_FC0F_DB86_E6D1_B9291E96B200').text('running');

				amiWebApp.unlock();
			}
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	killTask: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

		const id = $('#E6870C83_B91A_6AE5_442E_261C8158E4D4').val();

		if(!id)
		{
			amiWebApp.unlock();

			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.execute('SearchQuery -catalog="tasks" -entity="router_task" -sql="SELECT serverName FROM router_task WHERE id = \'' + amiWebApp.textToString(id) + '\'"').done((data) => {

			amiCommand.execute('KillTask -id="' + amiWebApp.textToString(id) + '"', {context: this, endpoint: this.servers[amiWebApp.jspath('..field{.@name==="serverName"}.$', data)[0] || ''] || ''}).done((data, message) => {

				amiWebApp.success(message, true);

			}).fail((data, message) => {

				amiWebApp.error(message, true);
			});

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	addTask: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

		const name = $('#ED7BCBC3_671E_F168_C3FF_AEDA3D34FB14').val();
		const command = $('#AF67EB3D_91A9_3DAF_5F8D_237E39644E61').val();
		const description = $('#B8BFD2D5_2E3B_BD58_B1DC_03CCDAAB7AF0').val();
		const commaSeparatedLocks = $('#ABB96D21_A45D_5C4E_2B29_A1E7A0BFE2FD').val();
		const priority = $('#FDEC9ADB_66C1_73E7_DEB2_19103F70DC26').val();
		let timeStep = $('#CB715F4D_8C12_52DC_2745_296FC8A9AC63').val();
		const serverName = $('#E81F70B5_422A_A17C_F608_845B8A9E73FB').val();

		let oneShot;

		if($('#D567A5FD_6C12_EEA6_4E74_FDB678BE483B').prop('checked') === false)
		{
			timeStep = ((('0')));
			oneShot = '1';
		}
		else
		{
		//	timeStep = timeStep;
			oneShot = '0';
		}

		if(!(serverName in this.servers))
		{
				amiWebApp.error('invalid task server name', true);

				return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.execute('AddElement -catalog="tasks" -entity="router_task" -fields="name,command,description,commaSeparatedLocks,oneShot,priority,timeStep,serverName" -values="' + amiWebApp.textToString(name) + ',' + amiWebApp.textToString(command) + ',' + amiWebApp.textToString(description) + ',' + amiWebApp.textToString(commaSeparatedLocks) + ',' + amiWebApp.textToString(oneShot) + ',' + amiWebApp.textToString(priority) + ',' + amiWebApp.textToString(timeStep) + ',' + amiWebApp.textToString(serverName) + '"').done((data, message) => {

			$('#DC48E537_4113_EFE6_254C_681063948076').modal('hide');

				/**/ if(!oneShot) {
					this._tableCtrlRecurrentTasks.refresh();
				}
				else {
					this._tableCtrlOneShotTasks.refresh();
				}

			amiWebApp.success(message, true);

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_refreshTables: function()
	{
		if(!this._tableCtrlRecurrentTasks.isInEditMode()) {
			this._tableCtrlRecurrentTasks.refresh();
		}

		if(!this._tableCtrlOneShotTasks.isInEditMode()) {
			this._tableCtrlOneShotTasks.refresh();
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

const taskServerAdminApp = new TaskServerAdminApp();

/*--------------------------------------------------------------------------------------------------------------------*/
