/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* AMIAdminDashboardConfig                                                 */
/*-------------------------------------------------------------------------*/

$AMIClass('AMIAdminDashboardConfig', {
	/*-----------------------------------------------------------------*/

	_init: function()
	{
		var result = $.Deferred();

		amiWebApp.loadHTMLs([
			'subapps/AdminDashboard/html/fragment/config/config.html',
			'subapps/AdminDashboard/html/fragment/config/extra_menu.html',
			'subapps/AdminDashboard/html/fragment/config/parameter.html',
		], {context: this}).done(function(data) {

			this.fragmentConfig = data[0];
			this.fragmentExtraMenu = data[1];
			this.fragmentParameter = data[2];

			result.resolve();

		}).fail(function() {
			result.reject();
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	open: function()
	{
		amiWebApp.replaceHTML('#ami_admin_dashboard_content', this.fragmentConfig);
		amiWebApp.replaceHTML('#ami_admin_dashboard_extra_menu', this.fragmentExtraMenu);
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
		this._load();
	},

	/*-----------------------------------------------------------------*/

	_load: function()
	{
		$('#ami_config_form4 .ami-custom').empty();

		amiCommand.execute('GetConfig', {context: this}).done(function(data) {

			var fields = amiWebApp.jspath('..rowset{.@type==="config"}.row.field', data);

			var dict = [];

			$.foreach(fields, function(index, field) {

				var name = field['@name'] || '';
				var value = field[(('$'))] || '';

				var input = $('#ami_config_forms_' + name);

				if(input.length === 0)
				{
					var id = 'ami_config_forms_' + name;

					dict.push({
						ID: id,
						NAME: name,
						VALUE: value,
					});
				}
				else
				{
					input.val(value);
				}
			});

			amiWebApp.appendHTML('#ami_config_form4 .custom', this.fragmentParameter, {dict: dict});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	},

	/*-----------------------------------------------------------------*/

	_save: function()
	{

	},

	/*-----------------------------------------------------------------*/

	reset: function()
	{
		/*---------------------------------------------------------*/

		if(confirm('Please confirm...') == false)
		{
			return;
		}

		/*---------------------------------------------------------*/

		this._load();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	_apply: function()
	{
		var params = $('#ami_configuration_right_div').serializeArray();

		$.each(params, function(index, value) {

			console.debug(value);
		});

		/* TODO */
	},

	/*-----------------------------------------------------------------*/

	_restart: function()
	{
		/* TODO */
	},

	/*-----------------------------------------------------------------*/

	apply: function()
	{
		/*---------------------------------------------------------*/

		if(confirm('Please confirm...') == false)
		{
			return;
		}

		/*---------------------------------------------------------*/

		/* TODO */

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	applyAndRestart: function()
	{
		/*---------------------------------------------------------*/

		if(confirm('Please confirm...') == false)
		{
			return;
		}

		/*---------------------------------------------------------*/

		/* TODO */

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	testEmail: function()
	{
		amiCommand.execute('TestEmail -from="ami@in2p3.fr" -to="' + $('#ami_config_forms_test_email').val() + '"').done(function(data) {

			amiWebApp.success(amiWebApp.jspath('..info.$', data)[0]);

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	},

	/*-----------------------------------------------------------------*/

	addParameter: function()
	{
		var name = prompt('Parameter name:') || '';

		name = name.trim();

		if(name)
		{
			if($('input[id="ami_config_forms_' + name + '"]').length === 0)
			{
				var id = 'ami_config_forms_' + name;

				var dict = {
					ID: id,
					NAME: name,
					VALUE: '',
				};

				amiWebApp.prependHTML('#ami_config_form4 .custom', this.fragmentParameter, {dict: dict});
			}
			else
			{
				amiWebApp.error('Duplicate field.');
			}
		}
	},

	/*-----------------------------------------------------------------*/

	delParameter: function(name)
	{
		/*---------------------------------------------------------*/

		if(confirm('Please confirm...') == false)
		{
			return;
		}

		/*---------------------------------------------------------*/

		$('input[id="ami_config_forms_' + name + '"]').parent().parent().remove();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
