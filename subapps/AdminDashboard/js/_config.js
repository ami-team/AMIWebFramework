/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* AMIAdminDashboardConfig                                                 */
/*-------------------------------------------------------------------------*/

$AMIClass('AdminDashboardConfig', {
	/*-----------------------------------------------------------------*/

	_init: function()
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/AdminDashboard/twig/config/config.html',
			'subapps/AdminDashboard/twig/config/extra_menu.html',
			'subapps/AdminDashboard/twig/config/parameter.html',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#CB6036B7_5971_41C2_1194_F5A051B21EA0', data[0], {context: this}).done(function() {
				amiWebApp.replaceHTML('#C54485C3_44F8_CE8E_0F54_BF847CEECE11', data[1], {context: this}).done(function() {

					this.fragmentParameter = data[2];

					result.resolve();
				});
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
