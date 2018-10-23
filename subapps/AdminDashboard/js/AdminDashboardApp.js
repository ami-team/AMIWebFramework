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
			'subapps/AdminDashboard/twig/AdminDashboardApp.twig',
			'subapps/AdminDashboard/js/_home.js',
			'subapps/AdminDashboard/js/_config.js',
			'subapps/AdminDashboard/js/_roles.js',
			'subapps/AdminDashboard/js/_commands.js',
			'subapps/AdminDashboard/js/_users.js',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this}).done(function() {

				/**/ if(userdata === 'config') {
					this.subsubapp = new AdminDashboardConfig();
				}
				else if(userdata === 'roles') {
					this.subsubapp = new AdminDashboardRoles();
				}
				else if(userdata === 'commands') {
					this.subsubapp = new AdminDashboardCommands();
				}
				else if(userdata === 'users') {
					this.subsubapp = new AdminDashboardUsers();
				}
				else {
					this.subsubapp = new AdminDashboardHome();
				}

				this.subsubapp._init().done(function() {

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
			return this.subsubapp.onExit();
		}
	},

	/*---------------------------------------------------------------------*/

	onLogin: function()
	{
		if(amiLogin.hasRole('AMI_ADMIN'))
		{
			if(this.subsubapp.onLogin)
			{
				return this.subsubapp.onLogin();
			}
		}
		else
		{
			amiWebApp.error('This interface requires administrator roles!');
		}
	},

	/*---------------------------------------------------------------------*/

	onLogout: function()
	{
		if(this.subsubapp.onLogout)
		{
			return this.subsubapp.onLogout();
		}
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

adminDashboardApp = new AdminDashboardApp();

/*-------------------------------------------------------------------------*/
