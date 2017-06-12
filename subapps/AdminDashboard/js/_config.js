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
		$('#ami_jumbotron_content').html('Configuration');

		var result = $.Deferred();

		amiWebApp.loadHTMLs([
			'subapps/AdminDashboard/html/fragment/config/config.html',
			'subapps/AdminDashboard/html/fragment/config/extra_menu.html',
			'subapps/AdminDashboard/html/fragment/config/parameter.html',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_admin_dashboard_content', data[0], {context: this}).done(function() {
				amiWebApp.replaceHTML('#ami_admin_dashboard_extra_menu', data[1], {context: this}).done(function() {

					this.fragmentParameter = data[2];

					result.resolve();
				});
			});

		}).fail(function() {

			result.reject();
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
		if(!$('#ami_config_forms_router').val().trim())
		{
			this._load();
		}
	},

	/*-----------------------------------------------------------------*/

	_load: function()
	{
		return amiCommand.execute('GetConfig', {context: this}).done(function(data) {

			var fields = amiWebApp.jspath('..rowset{.@type==="config"}.row.field', data);

			$('#ami_config_form4 .ami-callout:last').empty();

			var dict = [];

			for(var i in fields)
			{
				var name = fields[i]['@name'] || '';
				var value = fields[i][(('$'))] || '';

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
			}

			amiWebApp.replaceHTML('#ami_config_form4 .ami-callout:last', this.fragmentParameter, {dict: dict});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});
	},

	/*-----------------------------------------------------------------*/

	reset: function()
	{
		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		this._load().done(function() {
		
			amiWebApp.unlock();
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	apply: function()
	{
		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		/*---------------------------------------------------------*/

		var names = [], name;
		var values = [], value;

		var params = $('#ami_config_right_div').serializeArray();

		for(var i in params)
		{
			name = params[i].name;
			value = params[i].value;

			if(name.indexOf('|') >= 0) {
				amiWebApp.error('character `|` not allow in parameter names (' + name + ':' + value + ')', true);
				return
			}

			if(value.indexOf('|') >= 0) {
				amiWebApp.error('character `|` not allow in parameter values (' + name + ':' + value + ')', true);
				return
			}

			names.push(amiWebApp.textToString(name));
			values.push(amiWebApp.textToString(value));
		}

		/*---------------------------------------------------------*/

		var command = 'SetConfig -separator="|" -names="' + names.join('|') + '" -values="' + values.join('|') + '"';

		/*---------------------------------------------------------*/

		amiCommand.execute(command).done(function(data) {

			amiWebApp.success(amiWebApp.jspath('..info.$', data), true);

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	testEmail: function(email)
	{
		/*---------------------------------------------------------*/

		amiWebApp.lock();

		/*---------------------------------------------------------*/

		var command = 'TestEmail -from="ami@in2p3.fr" -to="' + amiWebApp.textToString(email) + '"';

		/*---------------------------------------------------------*/

		amiCommand.execute(command).done(function(data) {

			amiWebApp.success(amiWebApp.jspath('..info.$', data), true);

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	addParameter: function()
	{
		var name = prompt('Parameter name:') || '';

		name = name.trim();

		if(name)
		{
			var id = 'ami_config_forms_' + name;

			if($('#' + id).length === 0)
			{
				var dict = {
					ID: id,
					NAME: name,
					VALUE: (('')),
				};

				amiWebApp.prependHTML('#ami_config_form4 .ami-callout:last', this.fragmentParameter, {dict: dict});
			}
			else
			{
				amiWebApp.error('duplicated parameter name', true);
			}
		}
		else
		{
			amiWebApp.error('empty parameter name', true);
		}
	},

	/*-----------------------------------------------------------------*/

	delParameter: function(name)
	{
		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*---------------------------------------------------------*/

		$('#ami_config_forms_' + name).parent().parent().remove();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
