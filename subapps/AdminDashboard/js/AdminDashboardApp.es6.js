/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 * @global AdminDashboardHome
 * @global AdminDashboardConfig
 * @global AdminDashboardRoles
 * @global AdminDashboardCommands
 * @global AdminDashboardUsers
 * @global AdminDashboardCatalogs
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/
/* AdminDashboardApp                                                                                                  */
/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('AdminDashboardApp', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		const result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/AdminDashboard/twig/AdminDashboardApp.twig',
			'subapps/AdminDashboard/js/_home.js',
			'subapps/AdminDashboard/js/_config.js',
			'subapps/AdminDashboard/js/_roles.js',
			'subapps/AdminDashboard/js/_commands.js',
			'subapps/AdminDashboard/js/_users.js',
			'subapps/AdminDashboard/js/_catalogs.js',
		]).done((data) => {

			amiWebApp.replaceHTML('#ami_main_content', data[0]).done(() => {

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
				else if(userdata === 'catalogs') {
					this.subsubapp = new AdminDashboardCatalogs();
				}
				else {
					this.subsubapp = new AdminDashboardHome();
				}

				this.subsubapp._init().done(() => {

					result.resolve();

				}).fail((data) => {

					result.reject(data);
				});
			});

		}).fail((message) => {

			result.reject(message);
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onExit: function()
	{
		if(this.subsubapp.onExit)
		{
			return this.subsubapp.onExit();
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function()
	{
		if(amiLogin.hasRole('AMI_ADMIN'))
		{
			amiWebApp.flush();

			$('#C54485C3_44F8_CE8E_0F54_BF847CEECE11').show();
			$('#CB6036B7_5971_41C2_1194_F5A051B21EA0').show();

			if(this.subsubapp.onLogin)
			{
				return this.subsubapp.onLogin();
			}
		}
		else
		{
			this.onLogout();
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function()
	{
		amiWebApp.error('Administrator roles required!');

		$('#C54485C3_44F8_CE8E_0F54_BF847CEECE11').hide();
		$('#CB6036B7_5971_41C2_1194_F5A051B21EA0').hide();

		if(this.subsubapp.onLogout)
		{
			return this.subsubapp.onLogout();
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	findNewCommands: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.execute('FindNewCommands').done((data, message) => {

			amiWebApp.success(message, true);

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	flushCommandCache: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.execute('FlushCommandCache').done((data, message) => {

			amiWebApp.success(message, true);

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	flushServerCachesFast: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.execute('FlushServerCaches').done((data, message) => {

			amiWebApp.success(message, true);

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	flushServerCachesSlow: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.execute('FlushServerCaches -full').done((data, message) => {

			amiWebApp.success(message, true);

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

const adminDashboardApp = new AdminDashboardApp();

/*--------------------------------------------------------------------------------------------------------------------*/
