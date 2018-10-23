/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* AMIAdminDashboardCommands                                                  */
/*-------------------------------------------------------------------------*/

$AMIClass('AdminDashboardCommands', {
	/*---------------------------------------------------------------------*/

	_init: function()
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/AdminDashboard/twig/commands/commands.twig',
			'subapps/AdminDashboard/twig/commands/table.twig',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#CB6036B7_5971_41C2_1194_F5A051B21EA0', data[0], {context: this}).done(function() {

				this.fragmentTable = data[1];

				/*---------------------------------------------------------*/

				$('#FA9E8ABC_2469_C3CA_67F9_8DC2FEE6B32D').keypress(function(e) {

					if(e.keyCode == 13)
					{
						adminDashboardApp.subsubapp.find($('#FA9E8ABC_2469_C3CA_67F9_8DC2FEE6B32D').val());
					}
				});

				$('#CD24BC02_C39F_AE0C_A83F_85B6458421B6').click(function() {

					adminDashboardApp.subsubapp.find($('#FA9E8ABC_2469_C3CA_67F9_8DC2FEE6B32D').val());
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

		amiCommand.execute('SearchQuery -catalog="self" -entity="router_command" -mql="SELECT `router_command`.`command`, `router_role`.`role` WHERE `router_command`.`command` LIKE \'%' + filter + '%\'"', {context: this}).done(function(data2) {

			amiCommand.execute('SearchQuery -catalog="self" -entity="router_command" -mql="SELECT `command`, `class`, `visible`, `secured` WHERE `command` LIKE \'%' + filter + '%\' ORDER BY `command`"', {context: this}).done(function(data1) {

				var rows1 = amiWebApp.jspath('..rowset.row', data1) || [];
				var rows2 = amiWebApp.jspath('..rowset.row', data2) || [];

				var rolesForCommands = {};

				rows1.forEach(function(row) {

					var command = amiWebApp.jspath('..field{.@name==="command"}.$', row)[0] || '';
					var clazz = amiWebApp.jspath('..field{.@name==="class"}.$', row)[0] || '';
					var visible = amiWebApp.jspath('..field{.@name==="visible"}.$', row)[0] || '';
					var secured = amiWebApp.jspath('..field{.@name==="secured"}.$', row)[0] || '';

					rolesForCommands[command] = {
						command: command,
						clazz: clazz,
						visible: visible,
						secured: secured,
						roles: [],
					};
				});

				rows2.forEach(function(row) {

					var command = amiWebApp.jspath('..field{.@name==="command"}.$', row)[0] || '';
					var role = amiWebApp.jspath('..field{.@name==="role"}.$', row)[0] || '';

					rolesForCommands[command].roles.push(role);
				});

				amiWebApp.replaceHTML('#F989424E_06B3_365D_0CAD_9F223EC8DA01', this.fragmentTable, {dict: {roles: this.roles, rolesForCommands: rolesForCommands}}).done(function() {

					var el1 = $("#F989424E_06B3_365D_0CAD_9F223EC8DA01 [data-admin-visible]");

					var el2 = $("#F989424E_06B3_365D_0CAD_9F223EC8DA01 [data-admin-secured]");

					var el3 = $("#F989424E_06B3_365D_0CAD_9F223EC8DA01 [data-admin-role]");

					var el4 = $("#F989424E_06B3_365D_0CAD_9F223EC8DA01 [data-admin-class]");

					/*-----------------------------------------------------*/

					el3.select2({
						placeholder: 'Select a role',
					});

					/*-----------------------------------------------------*/

					el1.change(function() {

						amiWebApp.lock();

						amiCommand.execute('UpdateElements -catalog="self" -entity="router_command" -separator="|" -fields="visible" -values="' + ($(this).prop('checked') ? 1 : 0) + '" -keyFields="command" -keyValues="' + amiWebApp.textToString($(this).attr('data-admin-visible')) + '"', {context: this}).done(function(data) {

							amiWebApp.unlock();

						}).fail(function(data) {

							amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
						});
					});

					/*-----------------------------------------------------*/

					el2.change(function() {

						amiWebApp.lock();

						amiCommand.execute('UpdateElements -catalog="self" -entity="router_command" -separator="|" -fields="secured" -values="' + ($(this).prop('checked') ? 1 : 0) + '" -keyFields="command" -keyValues="' + amiWebApp.textToString($(this).attr('data-admin-secured')) + '"', {context: this}).done(function(data) {

							amiWebApp.unlock();

						}).fail(function(data) {

							amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
						});
					});

					/*-----------------------------------------------------*/

					el3.on('select2:select', function(e) {

						amiWebApp.lock();

						amiCommand.execute('AddCommandRole -command="' + amiWebApp.textToString($(this).attr('data-admin-role')) + '" -role="' + amiWebApp.textToString(e.params.data.text) + '"', {context: this}).done(function(data) {

							amiWebApp.unlock();

						}).fail(function(data) {

							amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
						});
					});

					/*-----------------------------------------------------*/

					el3.on('select2:unselect', function(e) {

						amiWebApp.lock();

						amiCommand.execute('RemoveCommandRole -command="' + amiWebApp.textToString($(this).attr('data-admin-role')) + '" -role="' + amiWebApp.textToString(e.params.data.text) + '"', {context: this}).done(function(data) {

							amiWebApp.unlock();

						}).fail(function(data) {

							amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
						});
					});

					/*-----------------------------------------------------*/

					el4.on('click', function(e) {

						var clazz = prompt('New Java class', $(this).find('.value').text());

						if(clazz)
						{
							amiWebApp.lock();

							amiCommand.execute('UpdateElements -catalog="self" -entity="router_command" -separator="|" -fields="class" -values="' + amiWebApp.textToString(clazz) + '" -keyFields="command" -keyValues="' + amiWebApp.textToString($(this).attr('data-admin-class')) + '"', {context: this}).done(function(data) {

								$(this).find('.value').text(clazz);

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
