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

$AMIClass('AdminDashboardUsers', {
	/*---------------------------------------------------------------------*/

	_init: function()
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/AdminDashboard/twig/users/users.html',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#CB6036B7_5971_41C2_1194_F5A051B21EA0', data[0]).done(function() {

				result.resolve();
			});

		}).fail(function() {

			result.reject();
		});

		return result;
	},

	/*---------------------------------------------------------------------*/

	onLogin: function()
	{
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
