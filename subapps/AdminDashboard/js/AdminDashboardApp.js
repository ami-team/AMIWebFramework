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

$AMIClass('AdminDashboardApp', {
	/*---------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*---------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/AdminDashboard/css/AdminDashboardApp.css',
			'subapps/AdminDashboard/twig/AdminDashboardApp.html',
			'subapps/AdminDashboard/js/_home.js',
			'subapps/AdminDashboard/js/_config.js',
			'subapps/AdminDashboard/js/_roles.js',
			'subapps/AdminDashboard/js/_commands.js',
			'subapps/AdminDashboard/js/_users.js',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[1], {context: this}).done(function() {

				var subsubapp;

				/**/ if(userdata === 'config') {
					subsubapp = this.subsubapp = new AdminDashboardConfig();
				}
				else if(userdata === 'roles') {
					subsubapp = this.subsubapp = new AdminDashboardRoles();
				}
				else if(userdata === 'commands') {
					subsubapp = this.subsubapp = new AdminDashboardCommands();
				}
				else if(userdata === 'users') {
					subsubapp = this.subsubapp = new AdminDashboardUsers();
				}
				else {
					subsubapp = this.subsubapp = new AdminDashboardHome();
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

	/*---------------------------------------------------------------------*/

	onExit: function()
	{
		if(this.subsubapp.onExit)
		{
			this.subsubapp.onExit();
		}
	},

	/*---------------------------------------------------------------------*/

	onLogin: function()
	{
		if(this.subsubapp.onLogin)
		{
			this.subsubapp.onLogin();
		}
	},

	/*---------------------------------------------------------------------*/

	onLogout: function()
	{
		if(this.subsubapp.onLogout)
		{
			this.subsubapp.onLogout();
		}
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

adminDashboardApp = new AdminDashboardApp();

/*-------------------------------------------------------------------------*/
