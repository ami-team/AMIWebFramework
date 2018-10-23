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
			'subapps/AdminDashboard/twig/users/users.twig',
			'subapps/AdminDashboard/twig/users/table.twig',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#CB6036B7_5971_41C2_1194_F5A051B21EA0', data[0], {context: this}).done(function() {

				this.fragmentTable = data[1];

				/*---------------------------------------------------------*/

				$('#AB0061DA_691D_80A5_C2C0_2286ABB4845D').keypress(function(e) {

					if(e.keyCode == 13)
					{
						adminDashboardApp.subsubapp.find($('#AB0061DA_691D_80A5_C2C0_2286ABB4845D').val());
					}
				});

				$('#CD24BC02_C39F_AE0C_A83F_85B6458421B6').click(function() {

					adminDashboardApp.subsubapp.find($('#AB0061DA_691D_80A5_C2C0_2286ABB4845D').val());
				});

				/*---------------------------------------------------------*/

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
		return amiCommand.execute('SearchQuery -catalog="self" -entity="router_role" -mql="SELECT `router_role`.`role`"', {context: this}).done(function(data) {

			this.roles = amiWebApp.jspath('..field{.@name==="role"}.$', data);
		});
	},

	/*---------------------------------------------------------------------*/

	find: function(filter)
	{
		amiWebApp.lock();

		filter = filter.trim();

		return amiCommand.execute('SearchQuery -catalog="self" -entity="router_user" -mql="SELECT `router_user`.`AMIUser`, `router_user`.`firstName`, `router_user`.`lastName`, `router_user`.`email`, `router_role`.`role` WHERE `router_user`.`AMIUser` LIKE \'%' + filter + '%\'"', {context: this}).done(function(data) {

			var rows = amiWebApp.jspath('..rowset.row', data) || [];

			var rolesForUsers = {};

			rows.forEach(function(row) {

				var AMIUser = amiWebApp.jspath('..field{.@name==="AMIUser"}.$', row)[0] || '';
				var firstname = amiWebApp.jspath('..field{.@name==="firstName"}.$', row)[0] || '';
				var lastname = amiWebApp.jspath('..field{.@name==="lastName"}.$', row)[0] || '';
				var email = amiWebApp.jspath('..field{.@name==="email"}.$', row)[0] || '';
				var role = amiWebApp.jspath('..field{.@name==="role"}.$', row)[0] || '';

				if(!(AMIUser in rolesForUsers))
				{
					rolesForUsers[AMIUser] = {
						AMIUser: AMIUser,
						firstname: firstname,
						lastname: lastname,
						email: email,
						roles: [],
					};
				}

				rolesForUsers[AMIUser].roles.push(role);
			});

			amiWebApp.replaceHTML('#FCBD6DFC_2061_8CC3_652C_77671A179AAC', this.fragmentTable, {dict: {roles: this.roles, rolesForUsers: rolesForUsers}}).done(function() {

				var el = $("#FCBD6DFC_2061_8CC3_652C_77671A179AAC select");

				/*---------------------------------------------------------*/

				el.select2({
					placeholder: 'Select a role',
			    	allowClear: true,
				});

				/*---------------------------------------------------------*/

				el.on('select2:select', function(e) {

					amiWebApp.lock();

					amiCommand.execute('AddUserRole -user="' + amiWebApp.textToString($(this).attr('data-user')) + '" -role="' + amiWebApp.textToString(e.params.data.text) + '"', {context: this}).done(function(data) {

						amiWebApp.unlock();

					}).fail(function(data) {

						amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
					});
				});

				/*---------------------------------------------------------*/

				el.on('select2:unselect', function(e) {

					amiWebApp.lock();

					amiCommand.execute('RemoveUserRole -user="' + amiWebApp.textToString($(this).attr('data-user')) + '" -role="' + amiWebApp.textToString(e.params.data.text) + '"', {context: this}).done(function(data) {

						amiWebApp.unlock();

					}).fail(function(data) {

						amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
					});
				});

				/*---------------------------------------------------------*/

				amiWebApp.unlock();

				/*---------------------------------------------------------*/
			});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
