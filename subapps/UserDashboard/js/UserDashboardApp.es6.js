/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/

$AMIClass('UserDashboardApp', {
	/*---------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*---------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		const result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/UserDashboard/css/UserDashboardApp.css',
			'subapps/UserDashboard/twig/UserDashboardApp.twig',
			/**/
			amiWebApp.originURL + '/js/3rd-party/jquery-ui.min.js',
			/**/
			amiWebApp.originURL + '/subapps/UserDashboard/js/gridstack.min.css',
			amiWebApp.originURL + '/subapps/UserDashboard/js/gridstack.all.js',
		]).done((data) => {

			amiWebApp.replaceHTML('#ami_main_content', data[1]).done(() => {

				/*---------------------------------------------------------*/

				const el = $('#F251696F_D42E_F7FF_86F7_2E6B4F2E8F74');

				/*---------------------------------------------------------*/

				const settings = {
					float: true,
					cellHeight: 36,
					verticalMargin: 12,
					width: 12,
				};

				this.gridstack = el.gridstack(settings).data('gridstack');

				/*---------------------------------------------------------*/

				el.on('change', (e, items) => {

					if(this.lock === false)
					{
						items.forEach((item) => {

							this._serialize(items);

						});
					}
				});

				/*---------------------------------------------------------*/

				this.lock = false;

				/*---------------------------------------------------------*/

				result.resolve();
			});

		}).fail((data) => {

			result.reject(data);
		});

		return result;
	},

	/*---------------------------------------------------------------------*/

	onLogin: function()
	{
		/*-----------------------------------------------------------------*/

		$('#ami_user_menu_content').html(
			'<div class="dropdown-divider"></div>'
			+
			'<a class="dropdown-item" href="javascript:(function() { amiWebApp.lock(); userDashboardApp.reload().done(function() { amiWebApp.unlock(); }).fail(function(message) { amiWebApp.error(message); }); return; })();">Reload User Dashboard</a>'
			+
			'<a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=dashboardAdmin" target="_blank">Edit User Dashboard</a>'
		);

		/*-----------------------------------------------------------------*/

		return this.reload().done(() => {

			this.interval = setInterval(() => {

				this.refresh();

			}, 5000);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	onLogout: function()
	{
		$('#F251696F_D42E_F7FF_86F7_2E6B4F2E8F74').empty();

		clearInterval(this.interval);

		this.controls = [];
	},

	/*---------------------------------------------------------------------*/

	__reload: function(result, rows, idx)
	{
		if(idx === rows.length)
		{
			this.changed = false;

			return result.resolve();
		}

		/*-----------------------------------------------------------------*/

		const row = rows[idx];

		/*-----------------------------------------------------------------*/

		const id = amiWebApp.jspath('..field{.@name==="id"}.$', row)[0] || '';
		const control = amiWebApp.jspath('..field{.@name==="control"}.$', row)[0] || '';
		const params = amiWebApp.jspath('..field{.@name==="params"}.$', row)[0] || '';
		const x = amiWebApp.jspath('..field{.@name==="x"}.$', row)[0] || '0';
		const y = amiWebApp.jspath('..field{.@name==="y"}.$', row)[0] || '0';
		const width = amiWebApp.jspath('..field{.@name==="width"}.$', row)[0] || '0';
		const height = amiWebApp.jspath('..field{.@name==="height"}.$', row)[0] || '0';

		/*-----------------------------------------------------------------*/

		this.gridstack.addWidget($('<div data-gs-id="' + id + '"><div class="grid-stack-item-content" id="EB4DF671_2C31_BED0_6BED_44790525F28F_' + idx + '"></div></div>'), x, y, width, height).promise().done(() => {

			amiWebApp.createControl(this, this, control, ['#EB4DF671_2C31_BED0_6BED_44790525F28F_' + idx].concat(JSON.parse(params)), {}).done((control) => {

				this.__reload(result, rows, idx + 1);

				this.controls.push(control);

			}).fail((message) => {

				result.reject(message);
			});
		});

		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/

	_reload: function(rows)
	{
		this.lock = true;

		return this.__reload($.Deferred(), rows, 0).always(() => {

			this.lock = false;
		})
	},

	/*---------------------------------------------------------------------*/

	reload: function()
	{
		const result = $.Deferred();

		/*-----------------------------------------------------------------*/

		amiCommand.execute('GetDashboardInfo').done((data) => {

			/*-------------------------------------------------------------*/

			this.gridstack.removeAll();

			this.controls = [];

			/*-------------------------------------------------------------*/

			this._reload(amiWebApp.jspath('..row', data)).done(() => {

				this.refresh().done(() => {

					result.resolve();

				}).fail((message) => {

					result.reject(message);
				});

			}).fail((message) => {

				result.reject(message);
			});

		}).fail((data, message) => {

			result.reject(message);
		});

		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/

	refresh: function()
	{
		/*-----------------------------------------------------------------*/

		this.controls.forEach((control) => {

			if(control.refresh)
			{
				control.refresh();
			}
		});

		/*-----------------------------------------------------------------*/

		return $.Deferred().resolve();

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	_serialize: function(item)
	{
		amiWebApp.lock();

		amiCommand.execute('SetDashboardData -id="' + amiWebApp.textToString(item.id) + '" -x="' + item.x + '" -y="' + item.y + '" -width="' + item.width + '" -height="' + item.height + '"').done(() => {

			amiWebApp.unlock();

		}).fail((data, message) => {

			amiWebApp.error(message);
		});
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

var userDashboardApp = new UserDashboardApp();

/*-------------------------------------------------------------------------*/
