/*!
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/
/* AdminDashboardRoles                                                                                                */
/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('AdminDashboardRoles', {
	/*----------------------------------------------------------------------------------------------------------------*/

	_init: function()
	{
		const result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/AdminDashboard/twig/roles/roles.twig',
			'ctrl:table',
		]).done((data) => {

			amiWebApp.replaceHTML('#CB6036B7_5971_41C2_1194_F5A051B21EA0', data[0]).done(() => {

				this.table = new data[1]();

				result.resolve();
			});

		}).fail((message) => {

			result.reject(message);
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function()
	{
		this.table.render('#D3C9F8B8_4EAF_B108_267E_066F064F7EF3', 'BrowseQuery -catalog="self" -entity="router_role" -mql="SELECT `*`"', {showDetails: true, canEdit: amiLogin.hasRole('AMI_ADMIN'), catalog: 'self', entity: 'router_role', primaryField: 'id', start: 1, stop: 25});
	}

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
