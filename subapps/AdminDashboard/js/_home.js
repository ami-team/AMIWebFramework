/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* AdminDashboardHome                                                      */
/*-------------------------------------------------------------------------*/

$AMIClass('AdminDashboardHome', {
	/*---------------------------------------------------------------------*/

	_init: function()
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/AdminDashboard/twig/home/home.twig',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#CB6036B7_5971_41C2_1194_F5A051B21EA0', data[0]).done(function() {

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
		amiCommand.execute('SearchQuery -catalog="self" -sql="SELECT (SELECT COUNT(*) FROM `router_config`) AS nb1, (SELECT COUNT(*) FROM `router_role`) AS nb2, (SELECT COUNT(*) FROM `router_command`) AS nb3, (SELECT COUNT(*) FROM `router_user`) AS nb4, (SELECT COUNT(*) FROM `router_catalog`) AS nb5"').done(function(data) {

			var nr1 = amiWebApp.jspath('..field{.@name==="nb1"}.$', data);
			var nr2 = amiWebApp.jspath('..field{.@name==="nb2"}.$', data);
			var nr3 = amiWebApp.jspath('..field{.@name==="nb3"}.$', data);
			var nr4 = amiWebApp.jspath('..field{.@name==="nb4"}.$', data);
			var nr5 = amiWebApp.jspath('..field{.@name==="nb5"}.$', data);

			$('#F38F2C33_FD2B_0947_D711_D07C095AED8C').text(nr1);
			$('#B86F861D_ECA4_8CF4_1ABC_30EFF044A03F').text(nr2);
			$('#B1969A3F_D9F3_DEA2_E351_53A827AECA72').text(nr3);
			$('#CFC83907_4194_F600_8191_C0DEB7CADF25').text(nr4);
			$('#BC9730FE_4458_C523_2F43_2B16F0671E7E').text(nr5);

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});
	},

	/*---------------------------------------------------------------------*/

	flushCommandCache: function()
	{
		/*-----------------------------------------------------------------*/

		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		/*-----------------------------------------------------------------*/

		amiCommand.execute('FlushCommandCache').done(function(data) {

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
