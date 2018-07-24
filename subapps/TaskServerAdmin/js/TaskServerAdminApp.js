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

				//$('#A4E89C31_F65A_D4CD_DE10_60564C7D8DD6').hide();

				this._tableCtrlTasks = new data[2]();
				this._tableCtrlOneShotTasks = new data[2]();

				result.resolve();
			});

		}).fail(function(data) {

			result.reject(data);
		});

		return result;
	},

	/*---------------------------------------------------------------------*/

	onExit: function()
	{
	},

	/*---------------------------------------------------------------------*/

	onLogin: function()
	{
		/*-----------------------------------------------------------------*/

		var result = this.getServerNames();

		/*-----------------------------------------------------------------*/

		this._tableCtrlTasks.render("#C85980DA_6A5D_3D7C_54DE_D50A1BD15292", 'BrowseQuery -catalog="tasks" -entity="router_task" -mql="SELECT `*` WHERE oneShot = \'0\'"', {showDetails: false, canEdit: true, catalog: 'tasks', entity: 'router_task', primaryField: 'id'});

		this._tableCtrlOneShotTasks.render("#E6D5E436_5891_0A6F_47E3_8A318364DE4A", 'BrowseQuery -catalog="tasks" -entity="router_task" -mql="SELECT `*` WHERE oneShot = \'1\'"', {showDetails: false, canEdit: true, catalog: 'tasks', entity: 'router_task', primaryField: 'id'});

		/*-----------------------------------------------------------------*/

		var that = this;

		setInterval(function() {

			that._refreshTables();

		}, 5000);

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

		amiCommand.execute('BrowseQuery -catalog="tasks" -entity="router_task" -mql="SELECT DISTINCT `serverName`"', {context: this}).done(function(data) {

			/*-------------------------------------------------------------*/

			var infos = amiWebApp.jspath('..field{.@name==="serverName"}.$', data);

			/*-------------------------------------------------------------*/

			$('#taskServerName').typeahead('destroy').typeahead({
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

	addTask: function() {

		var result = $.Deferred();

		var taskName = $("#taskName").val();
		var taskCommand = $("#taskCommand").val();
		var taskDescription = $("#taskDescription").val();
		var taskTimeStep = $("#taskTimeStep").val();
		var taskServerName = $("#taskServerName").val();
		var priority = $("#priority").val();
		var oneShotTask = $("#oneShotTask").prop("checked");

		amiCommand.execute('GetSessionInfo' /* A MODIFIER */, {context: this}).done(function(data) {

			this.refreshTasksTables();

		}).fail(function(data) {

			result.reject(data);
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
