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
/* AdminDashboardCommands                                                                                             */
/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('AdminDashboardCommands', {
	/*----------------------------------------------------------------------------------------------------------------*/

	_init: function()
	{
		const result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/AdminDashboard/twig/commands/commands.twig',
			'subapps/AdminDashboard/twig/commands/extra_menu.twig',
			'subapps/AdminDashboard/twig/commands/table.twig',
		]).done((data) => {

			amiWebApp.replaceHTML('#CB6036B7_5971_41C2_1194_F5A051B21EA0', data[0]).done(() => {
				amiWebApp.replaceHTML('#C54485C3_44F8_CE8E_0F54_BF847CEECE11', data[1]).done(() => {

					this.fragmentTable = data[2];

					/*------------------------------------------------------------------------------------------------*/

					$('#FA9E8ABC_2469_C3CA_67F9_8DC2FEE6B32D').keypress((e) => {

						if(e.keyCode == 13)
						{
							adminDashboardApp.subsubapp.find($('#FA9E8ABC_2469_C3CA_67F9_8DC2FEE6B32D').val());
						}
					});

					$('#CD24BC02_C39F_AE0C_A83F_85B6458421B6').click(() => {

						adminDashboardApp.subsubapp.find($('#FA9E8ABC_2469_C3CA_67F9_8DC2FEE6B32D').val());
					});

					/*------------------------------------------------------------------------------------------------*/

					result.resolve();
				});
			});

		}).fail(() => {

			result.reject();
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
				$('#FA9E8ABC_2469_C3CA_67F9_8DC2FEE6B32D').val(amiWebApp.args['filter']);

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

		filter = filter.trim();

		amiCommand.execute('SearchQuery -catalog="self" -entity="router_command" -mql="SELECT `router_command`.`id`, `router_role`.`role` WHERE `router_command`.`command` LIKE \'%' + amiWebApp.textToString(amiWebApp.textToSQL(filter)) + '%\'"').done((data2) => {

			amiCommand.execute('SearchQuery -catalog="self" -entity="router_command" -mql="SELECT `id`, `command`, `class`, `visible`, `secured`, `roleValidatorClass` WHERE `command` LIKE \'%' + amiWebApp.textToString(amiWebApp.textToSQL(filter)) + '%\' ORDER BY `command` LIMIT 50"').done((data1) => {

				const rows1 = amiWebApp.jspath('..rowset.row', data1);
				const rows2 = amiWebApp.jspath('..rowset.row', data2);

				const ids = [];

				const commands = {};

				rows1.forEach((row) => {

					const id = amiWebApp.jspath('..field{.@name==="id"}.$', row)[0] || '';
					const command = amiWebApp.jspath('..field{.@name==="command"}.$', row)[0] || '';
					const clazz = amiWebApp.jspath('..field{.@name==="class"}.$', row)[0] || '';
					const visible = amiWebApp.jspath('..field{.@name==="visible"}.$', row)[0] || '';
					const secured = amiWebApp.jspath('..field{.@name==="secured"}.$', row)[0] || '';
					const roleValidatorClazz = amiWebApp.jspath('..field{.@name==="roleValidatorClass"}.$', row)[0] || '';

					ids.push(id);

					commands[id] = {
						command: command,
						clazz: clazz,
						visible: visible,
						secured: secured,
						roleValidatorClazz: roleValidatorClazz,
						roles: [],
					};
				});

				rows2.forEach((row) => {

					const id = amiWebApp.jspath('..field{.@name==="id"}.$', row)[0] || '';
					const role = amiWebApp.jspath('..field{.@name==="self.router_role.role"}.$', row)[0] || '';

					if(id in commands)
					{
						commands[id].roles.push(role);
					}
				});

				const dict = {
					ids: ids,
					roles: this.roles,
					commands: commands,
				};

				amiWebApp.replaceHTML('#F989424E_06B3_365D_0CAD_9F223EC8DA01', this.fragmentTable, {dict: dict}).done(() => {

					const el1 = $('#F989424E_06B3_365D_0CAD_9F223EC8DA01 [data-change-visible]');

					const el2 = $('#F989424E_06B3_365D_0CAD_9F223EC8DA01 [data-change-secured]');

					const el3 = $('#F989424E_06B3_365D_0CAD_9F223EC8DA01 [data-delete-command');

					const el4 = $('#F989424E_06B3_365D_0CAD_9F223EC8DA01 [data-change-role]');

					const el5 = $('#F989424E_06B3_365D_0CAD_9F223EC8DA01 [data-change-command-class]');

					const el6 = $('#F989424E_06B3_365D_0CAD_9F223EC8DA01 [data-change-role-validator-class]');

					/*------------------------------------------------------------------------------------------------*/

					el4.select2({
						placeholder: 'Select a role',
					});

					/*------------------------------------------------------------------------------------------------*/

					el1.change((e) => {

						amiWebApp.lock();

						amiCommand.execute('UpdateElements -catalog="self" -entity="router_command" -separator="|" -fields="visible" -values="' + ($(e.currentTarget).prop('checked') ? 1 : 0) + '" -keyFields="id" -keyValues="' + amiWebApp.textToString($(e.currentTarget).attr('data-change-visible')) + '"').done(() => {

							amiWebApp.unlock();

						}).fail((data, message) => {

							amiWebApp.error(message, true);
						});
					});

					/*------------------------------------------------------------------------------------------------*/

					el2.change((e) => {

						amiWebApp.lock();

						amiCommand.execute('UpdateElements -catalog="self" -entity="router_command" -separator="|" -fields="secured" -values="' + ($(e.currentTarget).prop('checked') ? 1 : 0) + '" -keyFields="id" -keyValues="' + amiWebApp.textToString($(e.currentTarget).attr('data-change-secured')) + '"').done(() => {

							amiWebApp.unlock();

						}).fail((data, message) => {

							amiWebApp.error(message, true);
						});
					});

					/*------------------------------------------------------------------------------------------------*/

					el3.click((e) => {

						e.preventDefault();

						if(!confirm('Please confirm...'))
						{
							return;
						}

						amiWebApp.lock();

						amiCommand.execute('RemoveElements -catalog="self" -entity="router_command" -keyFields="id" -keyValues="' + amiWebApp.textToString($(e.currentTarget).attr('data-delete-command')) + '"').done(() => {

							$('#F989424E_06B3_365D_0CAD_9F223EC8DA01 tr[data-id="' + $(e.currentTarget).attr('data-delete-command') + '"]').remove();

							amiWebApp.unlock();

						}).fail((data, message) => {

							amiWebApp.error(message, true);
						});
					});

					/*------------------------------------------------------------------------------------------------*/

					el4.on('select2:select', (e) => {

						amiWebApp.lock();

						amiCommand.execute('AddCommandRole -command="' + amiWebApp.textToString($(e.currentTarget).attr('data-change-role')) + '" -role="' + amiWebApp.textToString(e.params.data.text) + '"').done(() => {

							amiWebApp.unlock();

						}).fail((data, message) => {

							amiWebApp.error(message, true);
						});
					});

					/*------------------------------------------------------------------------------------------------*/

					el4.on('select2:unselect', (e) => {

						amiWebApp.lock();

						amiCommand.execute('RemoveCommandRole -command="' + amiWebApp.textToString($(e.currentTarget).attr('data-change-role')) + '" -role="' + amiWebApp.textToString(e.params.data.text) + '"').done(() => {

							amiWebApp.unlock();

						}).fail((data, message) => {

							amiWebApp.error(message, true);
						});
					});

					/*------------------------------------------------------------------------------------------------*/

					el5.on('click', (e) => {

						const clazz = prompt('New Java command class', $(e.currentTarget).find('.value').text());

						if(clazz !== null)
						{
							amiWebApp.lock();

							amiCommand.execute('UpdateElements -catalog="self" -entity="router_command" -separator="|" -fields="class" -values="' + amiWebApp.textToString(clazz) + '" -keyFields="id" -keyValues="' + amiWebApp.textToString($(e.currentTarget).attr('data-change-command-class')) + '"').done(() => {

								$(this).find('.value').text(clazz);

								amiWebApp.unlock();

							}).fail((data, message) => {

								amiWebApp.error(message, true);
							});
						}
					});

					/*------------------------------------------------------------------------------------------------*/

					el6.on('click', (e) => {

						const clazz = prompt('New Java role validator class', $(e.currentTarget).find('.value').text());

						if(clazz !== null)
						{
							amiWebApp.lock();

							amiCommand.execute('UpdateElements -catalog="self" -entity="router_command" -separator="|" -fields="roleValidatorClass" -values="' + amiWebApp.textToString(clazz) + '" -keyFields="id" -keyValues="' + amiWebApp.textToString($(e.currentTarget).attr('data-change-role-validator-class')) + '"').done(() => {

								$(this).find('.value').text(clazz);

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
