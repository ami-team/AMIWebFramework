/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* AMIAdminDashboardHome                                                   */
/*-------------------------------------------------------------------------*/

$AMIClass('AMIAdminDashboardHome', {
	/*-----------------------------------------------------------------*/

	_init: function()
	{
		$('#ami_jumbotron_content').html('Home');

		var result = $.Deferred();

		amiWebApp.loadHTMLs([
			'subapps/AdminDashboard/html/fragment/home/home.html',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_admin_dashboard_content', data[0]).done(function() {

				result.resolve();
			});

		}).fail(function() {
			result.reject();
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
	},

	/*-----------------------------------------------------------------*/

	stop: function()
	{
		/*---------------------------------------------------------*/

		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		/*---------------------------------------------------------*/

		var command = 'StopAMI';

		/*---------------------------------------------------------*/

		amiCommand.execute(command).done(function(data) {

			amiWebApp.success(amiWebApp.jspath('..info.$', data)[0], true);

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0], true);
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	restart: function()
	{
		/*---------------------------------------------------------*/

		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		/*---------------------------------------------------------*/

		var command = 'RestartAMI';

		/*---------------------------------------------------------*/

		amiCommand.execute(command).done(function(data) {

			amiWebApp.success(amiWebApp.jspath('..info.$', data)[0], true);

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0], true);
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
