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

/*-------------------------------------------------------------------------*/

$AMIClass('TaskServerAdminApp', {
	/*---------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*---------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/TaskServerAdmin/twig/TaskServerAdminApp.twig',
			'ctrl:table',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this}).done(function() {

				var that = this;

				/*---------------------------------------------------------*/

				this._tableCtrlTasks = new data[1]();
				this._tableCtrlOneShotTasks = new data[1]();

				/*---------------------------------------------------------*/

				$('#D567A5FD_6C12_EEA6_4E74_FDB678BE483B:checkbox').change(function(e) {

					if($(this).prop('checked'))
					{
						$('#CB715F4D_8C12_52DC_2745_296FC8A9AC63').prop('disabled', false);
					}
					else
					{
						$('#CB715F4D_8C12_52DC_2745_296FC8A9AC63').prop('disabled', true);
					}
				});

				/*---------------------------------------------------------*/

				$('#DC48E537_4113_EFE6_254C_681063948076').submit(function(e) {

					e.preventDefault();

					that.addTask();
				});

				/*---------------------------------------------------------*/

				result.resolve();
			});

		}).fail(function(data) {

			result.reject(data);
		});

		return result;
	},

	/*---------------------------------------------------------------------*/

	onLogin: function()
	{
		/*-----------------------------------------------------------------*/

		var result = this.getServerNames();

		/*-----------------------------------------------------------------*/

		this._tableCtrlTasks.render('#C85980DA_6A5D_3D7C_54DE_D50A1BD15292', 'BrowseQuery -catalog="tasks" -sql="SELECT id, name, description, command, commaSeparatedLocks AS locks, priority, timeStep, serverName, running, success, stdout, stderr, FROM_UNIXTIME(lastStartDate) AS lastStart, FROM_UNIXTIME(lastStopDate) AS lastStop FROM router_task WHERE oneShot = \'0\'"', {showDetails: false, canEdit: true, catalog: 'tasks', entity: 'router_task', primaryField: 'id'});

		this._tableCtrlOneShotTasks.render('#E6D5E436_5891_0A6F_47E3_8A318364DE4A', 'BrowseQuery -catalog="tasks" -sql="SELECT id, name, description, command, commaSeparatedLocks AS locks, priority, timeStep, serverName, running, success, stdout, stderr, FROM_UNIXTIME(lastStartDate) AS lastStart, FROM_UNIXTIME(lastStopDate) AS lastStop FROM router_task WHERE oneShot = \'1\'"', {showDetails: false, canEdit: true, catalog: 'tasks', entity: 'router_task', primaryField: 'id'});

		/*-----------------------------------------------------------------*/

		var that = this;

		setInterval(function() {

			that._refreshTables();

		}, 10000);

		/*-----------------------------------------------------------------*/
/*
		if(amiLogin.hasRole('AMI_administrator_role'))
		{
			$('#A4E89C31_F65A_D4CD_DE10_60564C7D8DD6').show();
		}
		else
		{
			$('#A4E89C31_F65A_D4CD_DE10_60564C7D8DD6').hide();
		}
*/
		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/

	onLogout: function()
	{
		$('#A4E89C31_F65A_D4CD_DE10_60564C7D8DD6').hide();
	},

	/*---------------------------------------------------------------------*/

	getServerNames: function()
	{
		var result = $.Deferred();

		amiCommand.execute('BrowseQuery -catalog="tasks" -entity="router_task" -mql="SELECT DISTINCT `serverName`"').done(function(data) {

			/*-------------------------------------------------------------*/

			var infos = amiWebApp.jspath('..field{.@name==="serverName"}.$', data);

			/*-------------------------------------------------------------*/

			$('#E81F70B5_422A_A17C_F608_845B8A9E73FB').typeahead('destroy').typeahead({
				source: infos,
				items: 100,
			});

			/*-------------------------------------------------------------*/

			result.resolve(data);

		}).fail(function(data) {

			result.reject(data);
		});

		return result;
	},

	/*---------------------------------------------------------------------*/

	addTask: function()
	{
		amiWebApp.lock();

		var name = $('#ED7BCBC3_671E_F168_C3FF_AEDA3D34FB14').val();
		var command = $('#AF67EB3D_91A9_3DAF_5F8D_237E39644E61').val();
		var description = $('#B8BFD2D5_2E3B_BD58_B1DC_03CCDAAB7AF0').val();
		var commaSeparatedLocks = $('#ABB96D21_A45D_5C4E_2B29_A1E7A0BFE2FD').val();
		var priority = $('#FDEC9ADB_66C1_73E7_DEB2_19103F70DC26').val();
		var timeStep = $('#CB715F4D_8C12_52DC_2745_296FC8A9AC63').val();
		var serverName = $('#E81F70B5_422A_A17C_F608_845B8A9E73FB').val();

		var oneShot;

		if($('#D567A5FD_6C12_EEA6_4E74_FDB678BE483B').prop('checked') === false)
		{
			timeStep = 0x000000;
			oneShot = 1;
		}
		else
		{
		//	timeStep = timeStep;
			oneShot = 0;
		}

		amiCommand.execute('AddElement -catalog="tasks" -entity="router_task" -fields="name,command,description,commaSeparatedLocks,oneShot,priority,timeStep,serverName" -values="' + name + ',' + command + ',' + description + ',' + commaSeparatedLocks + ',' + oneShot + ',' + priority + ',' + timeStep  + ',' + serverName + '"').done(function(data) {

			$('#DC48E537_4113_EFE6_254C_681063948076').modal('hide');

			amiWebApp.success(amiWebApp.jspath('..info.$', data), true, /*------------*/ null /*------------*/);

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true, '#E7300D7E_F671_4DF0_08B2_6AD0B9DC5C1F');
		});
	},

	/*---------------------------------------------------------------------*/

	_refreshTables: function()
	{
		this._tableCtrlTasks.refresh();

		this._tableCtrlOneShotTasks.refresh();
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

var taskServerAdminApp = new TaskServerAdminApp();

/*-------------------------------------------------------------------------*/
