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
			'subapps/UserDashboard/js/jquery-ui.min.js',
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

					if(items && !this.lock)
					{
						items.forEach((item) => {

							this.updateWidget(item);
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
			'<a class="dropdown-item" href="javascript:userDashboardApp.reload2();">Reload Dashboard</a>'
			+
			'<a class="dropdown-item" href="javascript:userDashboardApp.refresh2();">Refresh Dashboard</a>'
			+
			'<a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=dashboardAdmin" target="_blank">Edit Dashboard</a>'
		);

		/*-----------------------------------------------------------------*/

		return this.reload().done(() => {

			this.interval = setInterval(() => {

				this.refresh();

			}, 10000);
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

	_reload: function(result, rows, idx)
	{
		if(idx === rows.length)
		{
			return result.resolve();
		}

		/*-----------------------------------------------------------------*/

		const row = rows[idx];

		/*-----------------------------------------------------------------*/

		const id = amiWebApp.jspath('..field{.@name==="id"}.$', row)[0] || '';
		const control = amiWebApp.jspath('..field{.@name==="control"}.$', row)[0] || '';
		const params = amiWebApp.jspath('..field{.@name==="params"}.$', row)[0] || '[]';
		const settings = amiWebApp.jspath('..field{.@name==="settings"}.$', row)[0] || '{}';
		const autoRefresh = amiWebApp.jspath('..field{.@name==="autoRefresh"}.$', row)[0] || '1';
		const x = amiWebApp.jspath('..field{.@name==="x"}.$', row)[0] || '0';
		const y = amiWebApp.jspath('..field{.@name==="y"}.$', row)[0] || '0';
		const width = amiWebApp.jspath('..field{.@name==="width"}.$', row)[0] || '0';
		const height = amiWebApp.jspath('..field{.@name==="height"}.$', row)[0] || '0';

		/*-----------------------------------------------------------------*/

		this.gridstack.addWidget($(
			'<div data-gs-id="' + id + '">' +
			'  <div class="grid-stack-item-content" id="EB4DF671_2C31_BED0_6BED_44790525F28F_' + idx + '"></div>' +
			'  <div class="grid-stack-item-close-handle" id="D08B4F35_49D8_4844_D9D2_FB951948AF17_' + idx + '"></div>' +
			'</div>'
		), x, y, width, height).promise().done(() => {

			/*-------------------------------------------------------------*/

			$('#D08B4F35_49D8_4844_D9D2_FB951948AF17_' + idx).click((e) => {

				const el = $(e.currentTarget).parent();

				this.removeWidget(el.data('_gridstack_node')).done(() => {

					el.remove();
				});
			});

			/*-------------------------------------------------------------*/

			try
			{
				amiWebApp.createControl(this, this, control, ['#EB4DF671_2C31_BED0_6BED_44790525F28F_' + idx].concat(JSON.parse(params)), JSON.parse(settings)).done((control) => {

					/*-----------------------------------------------------*/

					control.autoRefresh = parseInt(autoRefresh);

					this.controls.push(control);

					/*-----------------------------------------------------*/

					this._reload(result, rows, idx + 1);

					/*-----------------------------------------------------*/

				}).fail((message) => {

					/*-----------------------------------------------------*/

					amiWebApp.error('For widget `' + id + '`: ' + message);

					/*-----------------------------------------------------*/

					this._reload(result, rows, idx + 1);

					/*-----------------------------------------------------*/
				});
			}
			catch(e)
			{
				/*---------------------------------------------------------*/

				amiWebApp.error('For widget `' + id + '`: ' + e.message);

				/*---------------------------------------------------------*/

				this._reload(result, rows, idx + 1);

				/*---------------------------------------------------------*/
			}

			/*-------------------------------------------------------------*/
		});

		/*-----------------------------------------------------------------*/

		return result;
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

			this.lock = true;

			/*-------------------------------------------------------------*/

			this._reload($.Deferred(), amiWebApp.jspath('..row', data), 0).done(() => {

				this.refresh().done(() => {

					this.lock = false;

					result.resolve();
				});
			});

			/*-------------------------------------------------------------*/

		}).fail((data, message) => {

			result.reject(message);
		});

		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/

	reload2: function()
	{
		amiWebApp.lock();

		this.reload().done(() => {

			amiWebApp.unlock(/*---*/);

		}).fail((message) => {

			amiWebApp.error(message);
		});
	},

	/*---------------------------------------------------------------------*/

	refresh: function()
	{
		/*-----------------------------------------------------------------*/

		this.controls.forEach((control) => {

			if(control.autoRefresh !== 0 && control.refresh)
			{
				control.refresh();
			}
		});

		/*-----------------------------------------------------------------*/

		return $.Deferred().resolve();

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	refresh2: function()
	{
		amiWebApp.lock();

		this.refresh().done(() => {

			amiWebApp.unlock(/*---*/);

		}).fail((message) => {

			amiWebApp.error(message);
		});
	},

	/*---------------------------------------------------------------------*/

	updateWidget: function(item)
	{
		amiWebApp.lock();

		return amiCommand.execute('UpdateWidget -id="' + amiWebApp.textToString(item.id) + '" -x="' + item.x + '" -y="' + item.y + '" -width="' + item.width + '" -height="' + item.height + '"').done(() => {

			amiWebApp.unlock();

		}).fail((data, message) => {

			amiWebApp.error(message);
		});
	},

	/*---------------------------------------------------------------------*/

	removeWidget: function(item)
	{
		amiWebApp.lock();

		return amiCommand.execute('RemoveWidget -id="' + amiWebApp.textToString(item.id) + '"').done(() => {

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
