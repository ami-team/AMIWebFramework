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

$AMIClass('AdminDashboardConfig', {
	/*---------------------------------------------------------------------*/

	_init: function()
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/AdminDashboard/twig/config/config.twig',
			'subapps/AdminDashboard/twig/config/extra_menu.twig',
			'subapps/AdminDashboard/twig/config/parameter.twig',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#CB6036B7_5971_41C2_1194_F5A051B21EA0', data[0], {context: this}).done(function() {
				amiWebApp.replaceHTML('#C54485C3_44F8_CE8E_0F54_BF847CEECE11', data[1], {context: this}).done(function() {

					this.fragmentParameter = data[2];

					this.paramDict = {};
					this.paramDel = [];

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
		if($.isEmptyObject(this.paramDict))
		{
			return this._load();
		}
	},

	/*---------------------------------------------------------------------*/

	_load: function()
	{
		return amiCommand.execute('GetConfig', {context: this}).done(function(data) {

			var fields = amiWebApp.jspath('..rowset{.@type==="config"}.row.field', data);

			this.paramDict = {};
			this.paramDel = [];

			var dict = [];

			for(var i in fields)
			{
				/*---------------------------------------------------------*/

				var name = fields[i]['@name'] || '';
				var value = fields[i][(('$'))] || '';

				if(name === 'task_server_name'
				   ||
				   name === 'task_server_pass'
				   ||
				   name === 'task_server_url'
				   ||
				   name === 'task_server_user'
				 ) {
					continue;
				}

				/*---------------------------------------------------------*/

				this.paramDict[name] = value;

				/*---------------------------------------------------------*/

				var el = $('#D17C089F_FB5D_B2A5_7C9F_65AA0736084F [name = "' + name + '"]')

				if(el.length === 0)
				{
					dict.push({
						NAME: name,
						VALUE: value,
					});
				}
				else
				{
					el.val(value);
				}

				/*---------------------------------------------------------*/
			}

			amiWebApp.replaceHTML('#B5C738DB_B705_5E37_24CD_B265532D0853', this.fragmentParameter, {dict: dict});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});
	},

	/*---------------------------------------------------------------------*/

	_save: function()
	{
		var names = [], name;
		var values = [], value;

		var params = $('#D17C089F_FB5D_B2A5_7C9F_65AA0736084F').serializeArray();

		for(var i in params)
		{
			name = params[i].name;
			value = params[i].value;

			if(this.paramDict[name] !== value)
			{
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
		}

		/*-----------------------------------------------------------------*/

		return amiCommand.execute('SetConfig -separator="|" -names="' + names.join('|') + '" -values="' + values.join('|') + '"').done(function(data) {

			amiWebApp.success(amiWebApp.jspath('..info.$', data), true);

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	apply: function()
	{
		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		this._save().done(function() {

			amiWebApp.unlock();
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	reset: function()
	{
		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		this._load().done(function() {

			amiWebApp.unlock();
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	testEmail: function(email)
	{
		amiWebApp.lock();

		amiCommand.execute('TestEmail -from="ami@in2p3.fr" -to="' + amiWebApp.textToString(email) + '"').done(function(data) {

			amiWebApp.success(amiWebApp.jspath('..info.$', data), true);

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});
	},

	/*---------------------------------------------------------------------*/

	addParameter: function()
	{
		var name = prompt('Parameter name:') || '';

		name = name.trim();

		if(name)
		{
			if($('#B5C738DB_B705_5E37_24CD_B265532D0853_' + name).length === 0)
			{
				var dict = {
					NAME: name,
					VALUE: (('')),
				};

				amiWebApp.prependHTML('#B5C738DB_B705_5E37_24CD_B265532D0853', this.fragmentParameter, {dict: dict});
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

	/*---------------------------------------------------------------------*/

	delParameter: function(name)
	{
		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*-----------------------------------------------------------------*/

		if(name in this.paramDict)
		{
			this.paramDel.push(name);

			delete this.paramDict[name];
		}

		/*-----------------------------------------------------------------*/

		$('#B5C738DB_B705_5E37_24CD_B265532D0853_' + name).parent().parent().remove();

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
