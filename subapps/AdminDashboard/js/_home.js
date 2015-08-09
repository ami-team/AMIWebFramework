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
});

/*-------------------------------------------------------------------------*/
