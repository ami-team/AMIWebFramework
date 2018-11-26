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

$AMIClass('AdminDashboardCatalogs', {
	/*---------------------------------------------------------------------*/

	_init: function()
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/AdminDashboard/twig/catalogs/catalogs.twig',
			'ctrl:table',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#CB6036B7_5971_41C2_1194_F5A051B21EA0', data[0], {context: this}).done(function() {

				this.table1 = new data[1]();
				this.table2 = new data[1]();
				this.table3 = new data[1]();

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
		this.table1.render('#A5F4DDCC_C731_9B8D_D293_5FCCF9F6F99F', 'SearchQuery -catalog="self" -entity="router_catalog" -mql="SELECT `*`"', {showDetails: true, canEdit: amiLogin.hasRole('AMI_ADMIN'), catalog: 'self', entity: 'router_catalog', start: 1, stop: 25});
		this.table2.render('#A8A6384A_0599_B207_B5E3_89FBD4BF0657', 'SearchQuery -catalog="self" -entity="router_catalog_extra" -mql="SELECT `*`"', {showDetails: true, canEdit: amiLogin.hasRole('AMI_ADMIN'), catalog: 'self', entity: 'router_catalog_extra', start: 1, stop: 25});
		this.table3.render('#E2DDC44D_7AB8_708B_F4E4_EF18A24B3D2F', 'SearchQuery -catalog="self" -entity="router_foreign_key" -mql="SELECT `*`"', {showDetails: true, canEdit: amiLogin.hasRole('AMI_ADMIN'), catalog: 'self', entity: 'router_foreign_key', start: 1, stop: 25});

		$('#A5F4DDCC_C731_9B8D_D293_5FCCF9F6F99F').show();
		$('#A8A6384A_0599_B207_B5E3_89FBD4BF0657').show();
		$('#E2DDC44D_7AB8_708B_F4E4_EF18A24B3D2F').show();
	},

	/*---------------------------------------------------------------------*/

	onLogout: function()
	{
		$('#A5F4DDCC_C731_9B8D_D293_5FCCF9F6F99F').hide();
		$('#A8A6384A_0599_B207_B5E3_89FBD4BF0657').hide();
		$('#E2DDC44D_7AB8_708B_F4E4_EF18A24B3D2F').hide();
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
