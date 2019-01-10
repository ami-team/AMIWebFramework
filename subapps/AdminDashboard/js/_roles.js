/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* AdminDashboardRoles                                                     */
/*-------------------------------------------------------------------------*/

$AMIClass('AdminDashboardRoles', {
	/*---------------------------------------------------------------------*/

	_init: function()
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/AdminDashboard/twig/roles/roles.twig',
			'ctrl:table',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#CB6036B7_5971_41C2_1194_F5A051B21EA0', data[0], {context: this}).done(function() {

				this.table = new data[1]();

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
		this.table.render('#D3C9F8B8_4EAF_B108_267E_066F064F7EF3', 'SearchQuery -catalog="self" -entity="router_role" -mql="SELECT `*`"', {showDetails: true, canEdit: amiLogin.hasRole('AMI_ADMIN'), catalog: 'self', entity: 'router_role', primaryField: 'id', start: 1, stop: 25});
	}

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
