/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* AMIAdminDashboardUsers                                                  */
/*-------------------------------------------------------------------------*/

$AMIClass('AMIAdminDashboardUsers', {
	/*-----------------------------------------------------------------*/

	_init: function()
	{
		var result = $.Deferred();

		amiWebApp.loadHTMLs([
			'subapps/AdminDashboard/html/fragment/users/users.html',
		], {context: this}).done(function(data) {

			this.fragmentUsers = data[0];

			result.resolve();

		}).fail(function() {
			result.reject();
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	open: function()
	{
		amiWebApp.replaceHTML('#ami_admin_dashboard_content', this.fragmentUsers);
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
