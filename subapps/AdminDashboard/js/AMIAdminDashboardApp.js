/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
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

				var app;

				/**/ if(userdata === 'config') {
					app = this.app = new AMIAdminDashboardConfig();
				}
				else if(userdata === 'monitoring') {
					app = this.app = new AMIAdminDashboardMonitoring();
				}
				else if(userdata === 'roles') {
					app = this.app = new AMIAdminDashboardRoles();
				}
				else if(userdata === 'commands') {
					app = this.app = new AMIAdminDashboardCommands();
				}
				else if(userdata === 'users') {
					app = this.app = new AMIAdminDashboardUsers();
				}
				else if(userdata === 'tasks') {
					app = this.app = new AMIAdminDashboardTasks();
				}
				else {
					app = this.app = new AMIAdminDashboardHome();
				}

				app._init().done(function() {
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
		if(this.app.onExit) {
			this.app.onExit();
		}
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
		if(this.app.onLogin) {
			this.app.onLogin();
		}
	},

	/*-----------------------------------------------------------------*/

	onLogout: function()
	{
		if(this.app.onLogout) {
			this.app.onLogout();
		}
	},

	/*-----------------------------------------------------------------*/

	onSessionExpired: function()
	{
		if(this.app.onSessionExpired) {
			this.app.onSessionExpired();
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
