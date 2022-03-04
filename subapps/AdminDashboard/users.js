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

import twigUsers from './assets/twig/users/users.twig';
import twigTable from './assets/twig/users/table.twig';

/*--------------------------------------------------------------------------------------------------------------------*/

let _roles = {};

/*--------------------------------------------------------------------------------------------------------------------*/

export function init()
{
	const result = $.Deferred();

	amiWebApp.replaceHTML('#BCCE2136_3695_AB6F_4F08_3BD3C9035287', twigUsers).done(() => {

		/*------------------------------------------------------------------------------------------------------------*/

		$('#AB0061DA_691D_80A5_C2C0_2286ABB4845D').keypress((e) => {

			if(e.keyCode === 13)
			{
				e.preventDefault();

				find($('#AB0061DA_691D_80A5_C2C0_2286ABB4845D').val());
			}
		});

		$('#CD24BC02_C39F_AE0C_A83F_85B6458421B6').click((e) => {

			e.preventDefault();

			find($('#AB0061DA_691D_80A5_C2C0_2286ABB4845D').val());
		});

		/*------------------------------------------------------------------------------------------------------------*/

		result.resolve();
	});

	return result;
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function onLogin()
{
	return amiCommand.execute('SearchQuery -catalog="self" -entity="router_role" -mql="SELECT `router_role`.`role`"').done((data) => {

		_roles = amiWebApp.jspath('..field{.@name==="role"}.$', data);

	}).fail((data, message) => {

		amiWebApp.error(message, true);
	});
}

/*--------------------------------------------------------------------------------------------------------------------*/

function find(filter)
{
	amiWebApp.lock();

	filter = (filter || '').trim().toLowerCase();

	amiCommand.execute(`SearchQuery -catalog="self" -entity="router_user" -mql="SELECT \`router_user\`.\`id\`, \`router_role\`.\`role\` WHERE LOWER(\`router_user\`.\`AMIUser\`) LIKE '%${amiWebApp.textToString(amiWebApp.textToSQL(filter))}%' OR LOWER(\`router_user\`.\`ssoUser\`) LIKE '%${amiWebApp.textToString(amiWebApp.textToSQL(filter))}%' OR LOWER(\`router_user\`.\`email\`) LIKE '%${amiWebApp.textToString(amiWebApp.textToSQL(filter))}%'"` ).done((data2) => {

		amiCommand.execute(`SearchQuery -catalog="self" -entity="router_user" -mql="SELECT \`id\`, \`AMIUser\`, \`ssoUser\`, \`clientDN\`, \`issuerDN\`, \`firstName\`, \`lastName\`, \`email\`, \`json\`, \`valid\` WHERE LOWER(\`AMIUser\`) LIKE '%${amiWebApp.textToString(amiWebApp.textToSQL(filter))}%' OR LOWER(\`router_user\`.\`ssoUser\`) LIKE '%${amiWebApp.textToString(amiWebApp.textToSQL(filter))}%' OR LOWER(\`email\`) LIKE '%${amiWebApp.textToString(amiWebApp.textToSQL(filter))}%' ORDER BY \`AMIUser\` LIMIT 50"`).done((data1) => {

			const rows1 = amiWebApp.jspath('..rowset.row', data1);
			const rows2 = amiWebApp.jspath('..rowset.row', data2);

			const ids = [];

			const users = {};

			rows1.forEach(function(row) {

				const id = amiWebApp.jspath('..field{.@name==="id"}.$', row)[0] || '';
				const AMIUser = amiWebApp.jspath('..field{.@name==="AMIUser"}.$', row)[0] || '';
				const ssoUser = amiWebApp.jspath('..field{.@name==="ssoUser"}.$', row)[0] || '';
				const clientDN = amiWebApp.jspath('..field{.@name==="clientDN"}.$', row)[0] || '';
				const issuerDN = amiWebApp.jspath('..field{.@name==="issuerDN"}.$', row)[0] || '';
				const firstname = amiWebApp.jspath('..field{.@name==="firstName"}.$', row)[0] || '';
				const lastname = amiWebApp.jspath('..field{.@name==="lastName"}.$', row)[0] || '';
				const email = amiWebApp.jspath('..field{.@name==="email"}.$', row)[0] || '';
				const json = amiWebApp.jspath('..field{.@name==="json"}.$', row)[0] || '';
				const valid = amiWebApp.jspath('..field{.@name==="valid"}.$', row)[0] || '';

				ids.push(id);

				users[id] = {
					AMIUser: AMIUser,
					ssoUser: ssoUser,
					clientDN: clientDN,
					issuerDN: issuerDN,
					firstname: firstname,
					lastname: lastname,
					email: email,
					json: json,
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
				roles: _roles,
			};

			amiWebApp.replaceHTML('#FCBD6DFC_2061_8CC3_652C_77671A179AAC', twigTable, {dict: dict}).done(() => {

				const el1 = $('#FCBD6DFC_2061_8CC3_652C_77671A179AAC [data-change-valid]');

				const el2 = $('#FCBD6DFC_2061_8CC3_652C_77671A179AAC [data-delete-user]');

				const el3 = $('#FCBD6DFC_2061_8CC3_652C_77671A179AAC [data-change-role]');

				const el4 = $('#FCBD6DFC_2061_8CC3_652C_77671A179AAC [data-change-json]');

				const el5 = $('#FCBD6DFC_2061_8CC3_652C_77671A179AAC [data-change-client-dn]');

				const el6 = $('#FCBD6DFC_2061_8CC3_652C_77671A179AAC [data-change-issuer-dn]');

				/*----------------------------------------------------------------------------------------------------*/

				el3.select2({
					placeholder: 'Select a role',
				});

				/*----------------------------------------------------------------------------------------------------*/

				el1.change((e) => {

					amiWebApp.lock();

					amiCommand.execute('UpdateElements -catalog="self" -entity="router_user" -separator="|" -fields="valid" -values=? -keyFields="id" -keyValues=?', {params: [$(e.currentTarget).prop('checked') ? 1 : 0, $(e.currentTarget).attr('data-change-valid')]}).done(() => {

						amiWebApp.unlock();

					}).fail(function(data, message) {

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

					amiCommand.execute('RemoveElements -catalog="self" -entity="router_user" -keyFields="id" -keyValues=?', {params: [$(e.currentTarget).attr('data-delete-user')]}).done(() => {

						$(`#FCBD6DFC_2061_8CC3_652C_77671A179AAC tr[data-id="${$(e.currentTarget).attr('data-delete-user')}"]`).remove();

						amiWebApp.unlock();

					}).fail(function(data, message) {

						amiWebApp.error(message, true);
					});
				});

				/*----------------------------------------------------------------------------------------------------*/

				el3.on('select2:select', (e) => {

					amiWebApp.lock();

					amiCommand.execute('AddUserRole -user=? -role=?', {params: [$(e.currentTarget).attr('data-change-role'), e.params.data.text]}).done(() => {

						amiWebApp.unlock();

					}).fail(function(data, message) {

						amiWebApp.error(message, true);
					});
				});

				/*----------------------------------------------------------------------------------------------------*/

				el3.on('select2:unselect', (e) => {

					amiWebApp.lock();

					amiCommand.execute('RemoveUserRole -user=? -role=?', {params: [$(e.currentTarget).attr('data-change-role'), e.params.data.text]}).done(() => {

						amiWebApp.unlock();

					}).fail(function(data, message) {

						amiWebApp.error(message, true);
					});
				});

				/*----------------------------------------------------------------------------------------------------*/

				el4.on('click', (e) => {

					const clientDN = prompt('New JSON', $(e.currentTarget).find('.value').text());

					if(clientDN)
					{
						amiWebApp.lock();

						amiCommand.execute('UpdateElements -catalog="self" -entity="router_user" -separator="|" -fields="json" -values=? -keyFields="id" -keyValues=?', {params: [clientDN, $(e.currentTarget).attr('data-change-json')]}).done(() => {

							el4.find('.value').text(clientDN);

							amiWebApp.unlock();

						}).fail(function(data, message) {

							amiWebApp.error(message, true);
						});
					}
				});

				/*----------------------------------------------------------------------------------------------------*/

				el5.on('click', (e) => {

					const clientDN = prompt('New client DN', $(e.currentTarget).find('.value').text());

					if(clientDN)
					{
						amiWebApp.lock();

						amiCommand.execute('UpdateElements -catalog="self" -entity="router_user" -separator="|" -fields="clientDN" -values=? -keyFields="id" -keyValues=?', {params: [clientDN, $(e.currentTarget).attr('data-change-client-dn')]}).done(() => {

							el5.find('.value').text(clientDN);

							amiWebApp.unlock();

						}).fail(function(data, message) {

							amiWebApp.error(message, true);
						});
					}
				});

				/*----------------------------------------------------------------------------------------------------*/

				el6.on('click', (e) => {

					const issuerDN = prompt('New issuer DN', $(e.currentTarget).find('.value').text());

					if(issuerDN)
					{
						amiWebApp.lock();

						amiCommand.execute('UpdateElements -catalog="self" -entity="router_user" -separator="|" -fields="issuerDN" -values=? -keyFields="id" -keyValues=?', {params: [issuerDN, $(e.currentTarget).attr('data-change-issuer-dn')]}).done(() => {

							el6.find('.value').text(issuerDN);

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
