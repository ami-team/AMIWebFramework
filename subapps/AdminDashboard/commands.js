/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

import twigCommands from './assets/twig/commands/commands.twig';
import twigTable    from './assets/twig/commands/table.twig'   ;

/*--------------------------------------------------------------------------------------------------------------------*/

let roles = {};

/*--------------------------------------------------------------------------------------------------------------------*/

export function init()
{
	const result = $.Deferred();

	amiWebApp.replaceHTML('#BCCE2136_3695_AB6F_4F08_3BD3C9035287', twigCommands).done(() => {

		$('#FA9E8ABC_2469_C3CA_67F9_8DC2FEE6B32D').keypress((e) => {

			if(e.keyCode === 13)
			{
				find($('#FA9E8ABC_2469_C3CA_67F9_8DC2FEE6B32D').val());
			}
		});

		$('#CD24BC02_C39F_AE0C_A83F_85B6458421B6').click(() => {

			find($('#FA9E8ABC_2469_C3CA_67F9_8DC2FEE6B32D').val());
		});

		result.resolve();
	});

	return result;
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function onLogin()
{
	return amiCommand.execute('SearchQuery -catalog="self" -entity="router_role" -mql="SELECT `router_role`.`role`"').done((data) => {

		roles = amiWebApp.jspath('..field{.@name==="role"}.$', data);

	}).fail((data, message) => {

		amiWebApp.error(message, true);
	});
}

/*--------------------------------------------------------------------------------------------------------------------*/

function find(filter)
{
	amiWebApp.lock();

	filter = filter.trim().toLowerCase();

	amiCommand.execute('SearchQuery -catalog="self" -entity="router_command" -mql="SELECT `router_command`.`id`, `router_role`.`role` WHERE LOWER(`router_command`.`command`) LIKE \'%' + amiWebApp.textToString(amiWebApp.textToSQL(filter)) + '%\'"').done((data2) => {

		amiCommand.execute('SearchQuery -catalog="self" -entity="router_command" -mql="SELECT `id`, `command`, `class`, `visible`, `secured`, `roleValidatorClass` WHERE LOWER(`command`) LIKE \'%' + amiWebApp.textToString(amiWebApp.textToSQL(filter)) + '%\' ORDER BY `command` LIMIT 50"').done((data1) => {

			const rows1 = amiWebApp.jspath('..rowset.row', data1);
			const rows2 = amiWebApp.jspath('..rowset.row', data2);

			const ids = [];

			const commands = {};

			rows1.forEach((row) => {

				const id = amiWebApp.jspath('..field{.@name==="id"}.$', row)[0] || '';
				const command = amiWebApp.jspath('..field{.@name==="command"}.$', row)[0] || '';
				const clazz = amiWebApp.jspath('..field{.@name==="class"}.$', row)[0] || '';
				const visible = amiWebApp.jspath('..field{.@name==="visible"}.$', row)[0] || '';
				const roleValidatorClazz = amiWebApp.jspath('..field{.@name==="roleValidatorClass"}.$', row)[0] || '';

				ids.push(id);

				commands[id] = {
					command: command,
					clazz: clazz,
					visible: visible,
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
				roles: roles,
				commands: commands,
			};

			amiWebApp.replaceHTML('#F989424E_06B3_365D_0CAD_9F223EC8DA01', twigTable, {dict: dict}).done(() => {

				const el1 = $('#F989424E_06B3_365D_0CAD_9F223EC8DA01 [data-change-visible]');

				const el2 = $('#F989424E_06B3_365D_0CAD_9F223EC8DA01 [data-delete-command]');

				const el3 = $('#F989424E_06B3_365D_0CAD_9F223EC8DA01 [data-change-role]');

				const el4 = $('#F989424E_06B3_365D_0CAD_9F223EC8DA01 [data-change-command-class]');

				const el5 = $('#F989424E_06B3_365D_0CAD_9F223EC8DA01 [data-change-role-validator-class]');

				/*----------------------------------------------------------------------------------------------------*/

				el3.select2({
					placeholder: 'Select a role',
				});

				/*-----------------------------------------------------------------------------------------------------*/

				el1.change((e) => {

					amiWebApp.lock();

					amiCommand.execute('UpdateElements -catalog="self" -entity="router_command" -separator="|" -fields="visible" -values=? -keyFields="id" -keyValues=?', {params: [$(e.currentTarget).prop('checked') ? 1 : 0, $(e.currentTarget).attr('data-change-visible')]}).done(() => {

						amiWebApp.unlock();

					}).fail((data, message) => {

						amiWebApp.error(message, true);
					});
				});

				/*----------------------------------------------------------------------------------------------------*/

				el2.click((e) => {

					e.preventDefault();

					if(!confirm('Are you sure?'))
					{
						return;
					}

					amiWebApp.lock();

					amiCommand.execute('RemoveElements -catalog="self" -entity="router_command" -keyFields="id" -keyValues=?', {params: [$(e.currentTarget).attr('data-delete-command')]}).done(() => {

						$(`#F989424E_06B3_365D_0CAD_9F223EC8DA01 tr[data-id="${$(e.currentTarget).attr('data-delete-command')}"]`).remove();

						amiWebApp.unlock();

					}).fail((data, message) => {

						amiWebApp.error(message, true);
					});
				});

				/*----------------------------------------------------------------------------------------------------*/

				el3.on('select2:select', (e) => {

					amiWebApp.lock();

					amiCommand.execute('AddCommandRole -command=? -role=?', {params: [$(e.currentTarget).attr('data-change-role'), e.params.data.text]}).done(() => {

						amiWebApp.unlock();

					}).fail((data, message) => {

						amiWebApp.error(message, true);
					});
				});

				/*----------------------------------------------------------------------------------------------------*/

				el3.on('select2:unselect', (e) => {

					amiWebApp.lock();

					amiCommand.execute('RemoveCommandRole -command=? -role=?', {params: [$(e.currentTarget).attr('data-change-role'), e.params.data.text]}).done(() => {

						amiWebApp.unlock();

					}).fail((data, message) => {

						amiWebApp.error(message, true);
					});
				});

				/*----------------------------------------------------------------------------------------------------*/

				el4.on('click', (e) => {

					const clazz = prompt('New Java command class', $(e.currentTarget).find('.value').text());

					if(clazz !== null)
					{
						amiWebApp.lock();

						amiCommand.execute('UpdateElements -catalog="self" -entity="router_command" -separator="|" -fields="class" -values=? -keyFields="id" -keyValues=?', {params: [clazz, $(e.currentTarget).attr('data-change-command-class')]}).done(() => {

							el4.find('.value').text(clazz);

							amiWebApp.unlock();

						}).fail((data, message) => {

							amiWebApp.error(message, true);
						});
					}
				});

				/*----------------------------------------------------------------------------------------------------*/

				el5.on('click', (e) => {

					const clazz = prompt('New Java role validator class', $(e.currentTarget).find('.value').text());

					if(clazz !== null)
					{
						amiWebApp.lock();

						amiCommand.execute('UpdateElements -catalog="self" -entity="router_command" -separator="|" -fields="roleValidatorClass" -values=? -keyFields="id" -keyValues=?', {params: [clazz, $(e.currentTarget).attr('data-change-role-validator-class')]}).done(() => {

							el5.find('.value').text(clazz);

							amiWebApp.unlock();

						}).fail((data, message) => {

							amiWebApp.error(message, true);
						});
					}
				});

				/*----------------------------------------------------------------------------------------------------*/

				amiWebApp.unlock();

				/*----------------------------------------------------------------------------------------------------*/
			});

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});

	}).fail((data, message) => {

		amiWebApp.error(message, true);
	});
}

/*--------------------------------------------------------------------------------------------------------------------*/
