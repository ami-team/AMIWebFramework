/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 * @global adminDashboardApp
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
			'subapps/AdminDashboard/twig/commands/extra_menu.twig',
			'subapps/AdminDashboard/twig/commands/table.twig',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#CB6036B7_5971_41C2_1194_F5A051B21EA0', data[0], {context: this}).done(function() {
				amiWebApp.replaceHTML('#C54485C3_44F8_CE8E_0F54_BF847CEECE11', data[1], {context: this}).done(function() {

					this.fragmentTable = data[2];

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

		amiCommand.execute('SearchQuery -catalog="self" -entity="router_command" -mql="SELECT `router_command`.`id`, `router_role`.`role` WHERE `router_command`.`command` LIKE \'%' + amiWebApp.textToString(amiWebApp.textToSQL(filter)) + '%\'"', {context: this}).done(function(data2) {

			amiCommand.execute('SearchQuery -catalog="self" -entity="router_command" -mql="SELECT `id`, `command`, `class`, `visible`, `secured` WHERE `command` LIKE \'%' + amiWebApp.textToString(amiWebApp.textToSQL(filter)) + '%\' ORDER BY `command`"', {context: this}).done(function(data1) {

				var rows1 = amiWebApp.jspath('..rowset.row', data1) || [];
				var rows2 = amiWebApp.jspath('..rowset.row', data2) || [];

				var ids = [];

				var commands = {};

				rows1.forEach(function(row) {

					var id = amiWebApp.jspath('..field{.@name==="id"}.$', row)[0] || '';
					var command = amiWebApp.jspath('..field{.@name==="command"}.$', row)[0] || '';
					var clazz = amiWebApp.jspath('..field{.@name==="class"}.$', row)[0] || '';
					var visible = amiWebApp.jspath('..field{.@name==="visible"}.$', row)[0] || '';
					var secured = amiWebApp.jspath('..field{.@name==="secured"}.$', row)[0] || '';

					ids.push(id);

					commands[id] = {
						command: command,
						clazz: clazz,
						visible: visible,
						secured: secured,
						roles: [],
					};
				});

				rows2.forEach(function(row) {

					var id = amiWebApp.jspath('..field{.@name==="id"}.$', row)[0] || '';
					var role = amiWebApp.jspath('..field{.@name==="role"}.$', row)[0] || '';

					commands[id].roles.push(role);
				});

				amiWebApp.replaceHTML('#F989424E_06B3_365D_0CAD_9F223EC8DA01', this.fragmentTable, {dict: {roles: this.roles, ids: ids, commands: commands}}).done(function() {

					var el1 = $('#F989424E_06B3_365D_0CAD_9F223EC8DA01 [data-change-visible]');

					var el2 = $('#F989424E_06B3_365D_0CAD_9F223EC8DA01 [data-change-secured]');

					var el3 = $('#F989424E_06B3_365D_0CAD_9F223EC8DA01 [data-change-role]');

					var el4 = $('#F989424E_06B3_365D_0CAD_9F223EC8DA01 [data-change-class]');

					/*-----------------------------------------------------*/

					el3.select2({
						placeholder: 'Select a role',
					});

					/*-----------------------------------------------------*/

					el1.change(function() {

						amiWebApp.lock();

						amiCommand.execute('UpdateElements -catalog="self" -entity="router_command" -separator="|" -fields="visible" -values="' + ($(this).prop('checked') ? 1 : 0) + '" -keyFields="id" -keyValues="' + amiWebApp.textToString($(this).attr('data-change-visible')) + '"').done(function() {

							amiWebApp.unlock();

						}).fail(function(data) {

							amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
						});
					});

					/*-----------------------------------------------------*/

					el2.change(function() {

						amiWebApp.lock();

						amiCommand.execute('UpdateElements -catalog="self" -entity="router_command" -separator="|" -fields="secured" -values="' + ($(this).prop('checked') ? 1 : 0) + '" -keyFields="id" -keyValues="' + amiWebApp.textToString($(this).attr('data-change-secured')) + '"').done(function() {

							amiWebApp.unlock();

						}).fail(function(data) {

							amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
						});
					});

					/*-----------------------------------------------------*/

					el3.on('select2:select', function(e) {

						amiWebApp.lock();

						amiCommand.execute('AddCommandRole -command="' + amiWebApp.textToString($(this).attr('data-change-role')) + '" -role="' + amiWebApp.textToString(e.params.data.text) + '"').done(function() {

							amiWebApp.unlock();

						}).fail(function(data) {

							amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
						});
					});

					/*-----------------------------------------------------*/

					el3.on('select2:unselect', function(e) {

						amiWebApp.lock();

						amiCommand.execute('RemoveCommandRole -command="' + amiWebApp.textToString($(this).attr('data-change-role')) + '" -role="' + amiWebApp.textToString(e.params.data.text) + '"').done(function() {

							amiWebApp.unlock();

						}).fail(function(data) {

							amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
						});
					});

					/*-----------------------------------------------------*/

					el4.on('click', function() {

						var clazz = prompt('New Java class', $(this).find('.value').text());

						if(clazz)
						{
							amiWebApp.lock();

							amiCommand.execute('UpdateElements -catalog="self" -entity="router_command" -separator="|" -fields="class" -values="' + amiWebApp.textToString(clazz) + '" -keyFields="id" -keyValues="' + amiWebApp.textToString($(this).attr('data-change-class')) + '"', {context: this}).done(function() {

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

	findNewCommands: function()
	{
		/*-----------------------------------------------------------------*/

		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		/*-----------------------------------------------------------------*/

		amiCommand.execute('FindNewCommands').done(function(data) {

			amiWebApp.success(amiWebApp.jspath('..info.$', data), true);

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	flushServerCaches: function()
	{
		/*-----------------------------------------------------------------*/

		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		/*-----------------------------------------------------------------*/

		amiCommand.execute('FlushServerCaches').done(function(data) {

			amiWebApp.success(amiWebApp.jspath('..info.$', data), true);

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
