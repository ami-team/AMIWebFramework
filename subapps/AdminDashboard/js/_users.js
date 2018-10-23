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


		amiCommand.execute('SearchQuery -catalog="self" -entity="router_user" -mql="SELECT `router_user`.`AMIUser`, `router_role`.`role` WHERE `router_user`.`AMIUser` LIKE \'%' + filter + '%\'"', {context: this}).done(function(data2) {

			amiCommand.execute('SearchQuery -catalog="self" -entity="router_user" -mql="SELECT `AMIUser`, `clientDN`, `issuerDN`, `firstName`, `lastName`, `email`, `valid` WHERE `AMIUser` LIKE \'%' + filter + '%\' ORDER BY `AMIUser`"', {context: this}).done(function(data1) {

				var rows1 = amiWebApp.jspath('..rowset.row', data1) || [];
				var rows2 = amiWebApp.jspath('..rowset.row', data2) || [];

				var rolesForUsers = {};

				rows1.forEach(function(row) {

					var AMIUser = amiWebApp.jspath('..field{.@name==="AMIUser"}.$', row)[0] || '';
					var clientDN = amiWebApp.jspath('..field{.@name==="clientDN"}.$', row)[0] || '';
					var issuerDN = amiWebApp.jspath('..field{.@name==="issuerDN"}.$', row)[0] || '';
					var firstname = amiWebApp.jspath('..field{.@name==="firstName"}.$', row)[0] || '';
					var lastname = amiWebApp.jspath('..field{.@name==="lastName"}.$', row)[0] || '';
					var email = amiWebApp.jspath('..field{.@name==="email"}.$', row)[0] || '';
					var valid = amiWebApp.jspath('..field{.@name==="valid"}.$', row)[0] || '';

					rolesForUsers[AMIUser] = {
						AMIUser: AMIUser,
						clientDN: clientDN,
						issuerDN: issuerDN,
						firstname: firstname,
						lastname: lastname,
						email: email,
						valid: valid,
						roles: [],
					};
				});

				rows2.forEach(function(row) {

					var AMIUser = amiWebApp.jspath('..field{.@name==="AMIUser"}.$', row)[0] || '';
					var role = amiWebApp.jspath('..field{.@name==="role"}.$', row)[0] || '';

					rolesForUsers[AMIUser].roles.push(role);
				});

				amiWebApp.replaceHTML('#FCBD6DFC_2061_8CC3_652C_77671A179AAC', this.fragmentTable, {dict: {roles: this.roles, rolesForUsers: rolesForUsers}}).done(function() {

					var el1 = $("#FCBD6DFC_2061_8CC3_652C_77671A179AAC [data-admin-valid]");

					var el2 = $("#FCBD6DFC_2061_8CC3_652C_77671A179AAC [data-admin-role]");

					var el3 = $("#FCBD6DFC_2061_8CC3_652C_77671A179AAC [data-admin-client-dn");

					var el4 = $("#FCBD6DFC_2061_8CC3_652C_77671A179AAC [data-admin-issuer-dn");

					/*-----------------------------------------------------*/

					el2.select2({
						placeholder: 'Select a role',
					});

					/*-----------------------------------------------------*/

					el1.change(function() {

						amiWebApp.lock();

						amiCommand.execute('UpdateElements -catalog="self" -entity="router_user" -separator="|" -fields="valid" -values="' + ($(this).prop('checked') ? 1 : 0) + '" -keyFields="AMIUser" -keyValues="' + amiWebApp.textToString($(this).attr('data-admin-valid')) + '"', {context: this}).done(function(data) {

							amiWebApp.unlock();

						}).fail(function(data) {

							amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
						});
					});

					/*-----------------------------------------------------*/

					el2.on('select2:select', function(e) {

						amiWebApp.lock();

						amiCommand.execute('AddUserRole -user="' + amiWebApp.textToString($(this).attr('data-admin-role')) + '" -role="' + amiWebApp.textToString(e.params.data.text) + '"', {context: this}).done(function(data) {

							amiWebApp.unlock();

						}).fail(function(data) {

							amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
						});
					});

					/*-----------------------------------------------------*/

					el2.on('select2:unselect', function(e) {

						amiWebApp.lock();

						amiCommand.execute('RemoveUserRole -user="' + amiWebApp.textToString($(this).attr('data-admin-role')) + '" -role="' + amiWebApp.textToString(e.params.data.text) + '"', {context: this}).done(function(data) {

							amiWebApp.unlock();

						}).fail(function(data) {

							amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
						});
					});

					/*-----------------------------------------------------*/

					el3.on('click', function(e) {

						var clientDN = prompt('New client DN', $(this).find('.value').text());

						if(clientDN)
						{
							amiWebApp.lock();

							amiCommand.execute('UpdateElements -catalog="self" -entity="router_user" -separator="|" -fields="clientDN" -values="' + amiWebApp.textToString(clientDN) + '" -keyFields="AMIUser" -keyValues="' + amiWebApp.textToString($(this).attr('data-admin-client-dn')) + '"', {context: this}).done(function(data) {

								$(this).find('.value').text(clientDN);

								amiWebApp.unlock();

							}).fail(function(data) {

								amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
							});
						}
					});

					/*-----------------------------------------------------*/

					el4.on('click', function(e) {

						var issuerDN = prompt('New issuer DN', $(this).find('.value').text());

						if(issuerDN)
						{
							amiWebApp.lock();

							amiCommand.execute('UpdateElements -catalog="self" -entity="router_user" -separator="|" -fields="issuerDN" -values="' + amiWebApp.textToString(issuerDN) + '" -keyFields="AMIUser" -keyValues="' + amiWebApp.textToString($(this).attr('data-admin-issuer-dn')) + '"', {context: this}).done(function(data) {

								$(this).find('.value').text(issuerDN);

								amiWebApp.unlock();

							}).fail(function(data) {

								amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
							});
						}
					});

					/*-----------------------------------------------------*/

					amiWebApp.unlock();

					/*-----------------------------------------------------*/
				});

			}).fail(function(data) {

				amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
			});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
