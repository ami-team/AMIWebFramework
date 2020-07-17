/*!
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global adminDashboardApp
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/
/* AdminDashboardUsers                                                                                                */
/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('AdminDashboardUsers', {
	/*----------------------------------------------------------------------------------------------------------------*/

	_init: function()
	{
		const result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/AdminDashboard/twig/users/users.twig',
			'subapps/AdminDashboard/twig/users/table.twig',
		]).done((data) => {

			amiWebApp.replaceHTML('#CB6036B7_5971_41C2_1194_F5A051B21EA0', data[0]).done(() => {

				this.fragmentTable = data[1];

				/*----------------------------------------------------------------------------------------------------*/

				$('#AB0061DA_691D_80A5_C2C0_2286ABB4845D').keypress(function(e) {

					if(e.keyCode == 13)
					{
						adminDashboardApp.subsubapp.find($('#AB0061DA_691D_80A5_C2C0_2286ABB4845D').val());
					}
				});

				$('#CD24BC02_C39F_AE0C_A83F_85B6458421B6').click(() => {

					adminDashboardApp.subsubapp.find($('#AB0061DA_691D_80A5_C2C0_2286ABB4845D').val());
				});

				/*----------------------------------------------------------------------------------------------------*/

				result.resolve();
			});

		}).fail((e) => {

			result.reject(e);
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function()
	{
		return amiCommand.execute('SearchQuery -catalog="self" -entity="router_role" -mql="SELECT `router_role`.`role`"').done((data) => {

			this.roles = amiWebApp.jspath('..field{.@name==="role"}.$', data);

			if('filter' in amiWebApp.args)
			{
				$('#AB0061DA_691D_80A5_C2C0_2286ABB4845D').val(amiWebApp.args['filter']);

				adminDashboardApp.subsubapp.find(amiWebApp.args['filter']);
			}

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	find: function(filter)
	{
		amiWebApp.lock();

		filter = filter.trim().toLowerCase();

		amiCommand.execute('SearchQuery -catalog="self" -entity="router_user" -mql="SELECT `router_user`.`id`, `router_role`.`role` WHERE LOWER(`router_user`.`AMIUser`) LIKE \'%' + amiWebApp.textToString(amiWebApp.textToSQL(filter)) + '%\' OR LOWER(`router_user`.`email`) LIKE \'%' + amiWebApp.textToString(amiWebApp.textToSQL(filter)) + '%\'"').done((data2) => {

			amiCommand.execute('SearchQuery -catalog="self" -entity="router_user" -mql="SELECT `id`, `AMIUser`, `clientDN`, `issuerDN`, `firstName`, `lastName`, `email`, `valid` WHERE LOWER(`AMIUser`) LIKE \'%' + amiWebApp.textToString(amiWebApp.textToSQL(filter)) + '%\' OR LOWER(`email`) LIKE \'%' + amiWebApp.textToString(amiWebApp.textToSQL(filter)) + '%\' ORDER BY `AMIUser` LIMIT 50"').done((data1) => {

				const rows1 = amiWebApp.jspath('..rowset.row', data1);
				const rows2 = amiWebApp.jspath('..rowset.row', data2);

				const ids = [];

				const users = {};

				rows1.forEach(function(row) {

					const id = amiWebApp.jspath('..field{.@name==="id"}.$', row)[0] || '';
					const AMIUser = amiWebApp.jspath('..field{.@name==="AMIUser"}.$', row)[0] || '';
					const clientDN = amiWebApp.jspath('..field{.@name==="clientDN"}.$', row)[0] || '';
					const issuerDN = amiWebApp.jspath('..field{.@name==="issuerDN"}.$', row)[0] || '';
					const firstname = amiWebApp.jspath('..field{.@name==="firstName"}.$', row)[0] || '';
					const lastname = amiWebApp.jspath('..field{.@name==="lastName"}.$', row)[0] || '';
					const email = amiWebApp.jspath('..field{.@name==="email"}.$', row)[0] || '';
					const valid = amiWebApp.jspath('..field{.@name==="valid"}.$', row)[0] || '';

					ids.push(id);

					users[id] = {
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

					const id = amiWebApp.jspath('..field{.@name==="id"}.$', row)[0] || '';
					const role = amiWebApp.jspath('..field{.@name==="self.router_role.role"}.$', row)[0] || '';

					if(id in users)
					{
						users[id].roles.push(role);
					}
				});

				const dict = {
					ids: ids,
					users: users,
					roles: this.roles,
				};

				amiWebApp.replaceHTML('#FCBD6DFC_2061_8CC3_652C_77671A179AAC', this.fragmentTable, {dict: dict}).done(() => {

					const el1 = $('#FCBD6DFC_2061_8CC3_652C_77671A179AAC [data-change-valid]');

					const el2 = $('#FCBD6DFC_2061_8CC3_652C_77671A179AAC [data-delete-user]');

					const el3 = $('#FCBD6DFC_2061_8CC3_652C_77671A179AAC [data-change-role]');

					const el4 = $('#FCBD6DFC_2061_8CC3_652C_77671A179AAC [data-change-client-dn');

					const el5 = $('#FCBD6DFC_2061_8CC3_652C_77671A179AAC [data-change-issuer-dn');

					/*------------------------------------------------------------------------------------------------*/

					el3.select2({
						placeholder: 'Select a role',
					});

					/*------------------------------------------------------------------------------------------------*/

					el1.change((e) => {

						amiWebApp.lock();

						amiCommand.execute('UpdateElements -catalog="self" -entity="router_user" -separator="|" -fields="valid" -values="' + ($(e.currentTarget).prop('checked') ? 1 : 0) + '" -keyFields="id" -keyValues="' + amiWebApp.textToString($(e.currentTarget).attr('data-change-valid')) + '"').done(() => {

							amiWebApp.unlock();

						}).fail(function(data, message) {

							amiWebApp.error(message, true);
						});
					});

					/*------------------------------------------------------------------------------------------------*/

					el2.click((e) => {

						e.preventDefault();

						if(!confirm('Please confirm...'))
						{
							return;
						}

						amiWebApp.lock();

						amiCommand.execute('RemoveElements -catalog="self" -entity="router_user" -keyFields="id" -keyValues="' + amiWebApp.textToString($(e.currentTarget).attr('data-delete-user')) + '"').done(() => {

							$('#FCBD6DFC_2061_8CC3_652C_77671A179AAC tr[data-id="' + $(e.currentTarget).attr('data-delete-user') + '"]').remove();

							amiWebApp.unlock();

						}).fail(function(data, message) {

							amiWebApp.error(message, true);
						});
					});

					/*------------------------------------------------------------------------------------------------*/

					el3.on('select2:select', (e) => {

						amiWebApp.lock();

						amiCommand.execute('AddUserRole -user="' + amiWebApp.textToString($(e.currentTarget).attr('data-change-role')) + '" -role="' + amiWebApp.textToString(e.params.data.text) + '"').done(() => {

							amiWebApp.unlock();

						}).fail(function(data, message) {

							amiWebApp.error(message, true);
						});
					});

					/*------------------------------------------------------------------------------------------------*/

					el3.on('select2:unselect', (e) => {

						amiWebApp.lock();

						amiCommand.execute('RemoveUserRole -user="' + amiWebApp.textToString($(e.currentTarget).attr('data-change-role')) + '" -role="' + amiWebApp.textToString(e.params.data.text) + '"').done(() => {

							amiWebApp.unlock();

						}).fail(function(data, message) {

							amiWebApp.error(message, true);
						});
					});

					/*------------------------------------------------------------------------------------------------*/

					el4.on('click', (e) => {

						const clientDN = prompt('New client DN', $(e.currentTarget).find('.value').text());

						if(clientDN)
						{
							amiWebApp.lock();

							amiCommand.execute('UpdateElements -catalog="self" -entity="router_user" -separator="|" -fields="clientDN" -values="' + amiWebApp.textToString(clientDN) + '" -keyFields="id" -keyValues="' + amiWebApp.textToString($(e.currentTarget).attr('data-change-client-dn')) + '"').done(() => {

								$(this).find('.value').text(clientDN);

								amiWebApp.unlock();

							}).fail(function(data, message) {

								amiWebApp.error(message, true);
							});
						}
					});

					/*------------------------------------------------------------------------------------------------*/

					el5.on('click', (e) => {

						const issuerDN = prompt('New issuer DN', $(e.currentTarget).find('.value').text());

						if(issuerDN)
						{
							amiWebApp.lock();

							amiCommand.execute('UpdateElements -catalog="self" -entity="router_user" -separator="|" -fields="issuerDN" -values="' + amiWebApp.textToString(issuerDN) + '" -keyFields="id" -keyValues="' + amiWebApp.textToString($(e.currentTarget).attr('data-change-issuer-dn')) + '"').done(() => {

								$(this).find('.value').text(issuerDN);

								amiWebApp.unlock();

							}).fail((data, message) => {

								amiWebApp.error(message, true);
							});
						}
					});

					/*------------------------------------------------------------------------------------------------*/

					amiWebApp.unlock();

					/*------------------------------------------------------------------------------------------------*/
				});

			}).fail((data, message) => {

				amiWebApp.error(message, true);
			});

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
