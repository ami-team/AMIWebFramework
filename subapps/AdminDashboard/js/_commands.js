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

		return amiCommand.execute('SearchQuery -catalog="self" -entity="router_command" -mql="SELECT `router_command`.`command`, `router_command`.`class`, `router_command`.`visible`, `router_command`.`secured`, `router_role`.`role` WHERE `router_command`.`command` LIKE \'%' + filter + '%\'"', {context: this}).done(function(data) {

			var rows = amiWebApp.jspath('..rowset.row', data) || [];

			var rolesForCommands = {};

			rows.forEach(function(row) {

				var command = amiWebApp.jspath('..field{.@name==="command"}.$', row)[0] || '';
				var clazz = amiWebApp.jspath('..field{.@name==="class"}.$', row)[0] || '';
				var visible = amiWebApp.jspath('..field{.@name==="visible"}.$', row)[0] || '';
				var secured = amiWebApp.jspath('..field{.@name==="secured"}.$', row)[0] || '';
				var role = amiWebApp.jspath('..field{.@name==="role"}.$', row)[0] || '';

				if(!(command in rolesForCommands))
				{
					rolesForCommands[command] = {
						command: command,
						clazz: clazz,
						visible: visible,
						secured: secured,
						roles: [],
					};
				}

				rolesForCommands[command].roles.push(role);
			});

			amiWebApp.replaceHTML('#F989424E_06B3_365D_0CAD_9F223EC8DA01', this.fragmentTable, {dict: {roles: this.roles, rolesForCommands: rolesForCommands}}).done(function() {

				var el = $("#F989424E_06B3_365D_0CAD_9F223EC8DA01 select");

				/*---------------------------------------------------------*/

				el.select2({
					placeholder: 'Select a role',
			    	allowClear: true,
				});

				/*---------------------------------------------------------*/

				el.on('select2:select', function(e) {

					amiWebApp.lock();

					amiCommand.execute('AddCommandRole -command="' + amiWebApp.textToString($(this).attr('data-command')) + '" -role="' + amiWebApp.textToString(e.params.data.text) + '"', {context: this}).done(function(data) {

						amiWebApp.unlock();

					}).fail(function(data) {

						amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
					});
				});

				/*---------------------------------------------------------*/

				el.on('select2:unselect', function(e) {

					amiWebApp.lock();

					amiCommand.execute('RemoveCommandRole -command="' + amiWebApp.textToString($(this).attr('data-command')) + '" -role="' + amiWebApp.textToString(e.params.data.text) + '"', {context: this}).done(function(data) {

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
