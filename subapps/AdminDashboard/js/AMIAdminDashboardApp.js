/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 * @global AMIAdminDashboardConfig
 * @global AMIAdminDashboardMonitoring
 * @global AMIAdminDashboardRoles
 * @global AMIAdminDashboardCommands
 * @global AMIAdminDashboardUsers
 * @global AMIAdminDashboardTasks
 * @global AMIAdminDashboardHome
 */

/*-------------------------------------------------------------------------*/
/* AMIAdminDashboardApp                                                    */
/*-------------------------------------------------------------------------*/

$AMIClass('AMIAdminDashboardApp', {
	/*-----------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*-----------------------------------------------------------------*/

	onReady: function(userdata)
	{
		amiWebApp.loadSheets([
			'subapps/AdminDashboard/css/AMIAdminDashboardApp.css',
		]);

		amiWebApp.loadScripts([
			'subapps/AdminDashboard/js/_home.js',
			'subapps/AdminDashboard/js/_config.js',
			'subapps/AdminDashboard/js/_monitoring.js',
			'subapps/AdminDashboard/js/_roles.js',
			'subapps/AdminDashboard/js/_commands.js',
			'subapps/AdminDashboard/js/_users.js',
			'subapps/AdminDashboard/js/_tasks.js',
		]);

		$('#ami_jumbotron_title').html('Admin Dashboard');
		$('#ami_breadcrumb_content').html('<li>Admin</li><li><a href="' + amiWebApp.webAppURL + '?subapp=amiAdminDashboard">Admin Dashboard</a></li>');

		var result = $.Deferred();

		amiWebApp.loadHTMLs([
			'subapps/AdminDashboard/html/AMIAdminDashboardApp.html',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this}).done(function() {

				var subsubapp;

				/**/ if(userdata === 'config') {
					subsubapp = this.subsubapp = new AMIAdminDashboardConfig();
				}
				else if(userdata === 'monitoring') {
					subsubapp = this.subsubapp = new AMIAdminDashboardMonitoring();
				}
				else if(userdata === 'roles') {
					subsubapp = this.subsubapp = new AMIAdminDashboardRoles();
				}
				else if(userdata === 'commands') {
					subsubapp = this.subsubapp = new AMIAdminDashboardCommands();
				}
				else if(userdata === 'users') {
					subsubapp = this.subsubapp = new AMIAdminDashboardUsers();
				}
				else if(userdata === 'tasks') {
					subsubapp = this.subsubapp = new AMIAdminDashboardTasks();
				}
				else {
					subsubapp = this.subsubapp = new AMIAdminDashboardHome();
				}

				subsubapp._init().done(function() {
					result.resolve();
				}).fail(function() {
					result.reject();
				});
			});

		}).fail(function() {
			result.reject();
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	onExit: function()
	{
		if(this.subsubapp.onExit)
		{
			this.subsubapp.onExit();
		}
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
		if(this.subsubapp.onLogin)
		{
			this.subsubapp.onLogin();
		}
	},

	/*-----------------------------------------------------------------*/

	onLogout: function()
	{
		if(this.subsubapp.onLogout)
		{
			this.subsubapp.onLogout();
		}
	},

	/*-----------------------------------------------------------------*/

	onSessionExpired: function()
	{
		if(this.subsubapp.onSessionExpired)
		{
			this.subsubapp.onSessionExpired();
		}
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiAdminDashboardApp = new AMIAdminDashboardApp();

amiRegisterSubApp('amiAdminDashboard', amiAdminDashboardApp, {});

/*-------------------------------------------------------------------------*/
