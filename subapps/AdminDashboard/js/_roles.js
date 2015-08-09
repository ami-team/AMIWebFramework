/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* AMIAdminDashboardRoles                                                  */
/*-------------------------------------------------------------------------*/

$AMIClass('AMIAdminDashboardRoles', {
	/*-----------------------------------------------------------------*/

	_init: function()
	{
		var result = $.Deferred();

		amiWebApp.loadHTMLs([
			'subapps/AdminDashboard/html/fragment/roles/roles.html',
		], {context: this}).done(function(data) {

			this.fragmentRoles = data[0];

			result.resolve();

		}).fail(function() {
			result.reject();
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	open: function()
	{
		amiWebApp.replaceHTML('#ami_admin_dashboard_content', this.fragmentRoles);
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
