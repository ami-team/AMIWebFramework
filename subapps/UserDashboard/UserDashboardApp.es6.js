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

import './assets/css/UserDashboardApp.css';

import twigUserDashboardApp from './assets/twig/UserDashboardApp.twig';

/**/

import 'gridstack/dist/gridstack.min.css';

import 'gridstack/dist/h5/gridstack-dd-native';

import { GridStack } from 'gridstack';

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('UserDashboardApp', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function()
	{
		this.$super.$init();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function()
	{
		const result = $.Deferred();

		amiWebApp.replaceHTML('#ami_main_content', twigUserDashboardApp).done(() => {

			/*--------------------------------------------------------------------------------------------------------*/

			this._gridstack = GridStack.init({
				float: true,
				cellHeight: 36,
				staticGrid: true,
				verticalMargin: 12,
				width: 12,
			});

			/*--------------------------------------------------------------------------------------------------------*/

			this._gridstack.on('dragstop resizestop', (e, el) => {

				this.updateWidget(el.gridstackNode);
			});

			/*--------------------------------------------------------------------------------------------------------*/

			result.resolve();
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function(userdata)
	{
		this.amiLogin = userdata || amiLogin.getUser(); // BERK

		return this.reload().done(() => {

			setTimeout(() => {

				$('#ami_ext_menu_content').prepend(
					'<li class="nav-item">' +
					'  <span class="switch switch-on-primary switch-off-secondary">' +
					'    <input type="checkbox" id="B64A4510_C563_4DD4_B161_EDDB560F613C" onchange="userDashboardApp.setStatic(!$(this).prop(\'checked\'));">' +
					'    <label class="mr-2 me-2 my-2" for="B64A4510_C563_4DD4_B161_EDDB560F613C">' +
					'      <span class="text-secondary">view</span>' +
					'      /' +
					'      <span class="text-primary">edit</span>' +
					'    </label>' +
					'  </span>' +
					'</li>' +
					'<li class="nav-item">' +
					'  <div class="btn-group">' +
					'    <button class="btn btn-outline-secondary dropdown-toggle mr-2 my-1" type="button" data-' + (amiWebApp.bootstrapVersion > 4 ? 'bs-' : '') + 'toggle="dropdown" data-bs-toggle="dropdown">' +
					'      <i class="bi bi-arrow-repeat"></i>' +
					'    </button>' +
					'    <div class="dropdown-menu">' +
					'      <a class="dropdown-item" href="javascript:userDashboardApp.reload2();">Reload Dashboard</a>' +
					'      <a class="dropdown-item" href="javascript:userDashboardApp.refresh2();">Refresh Controls</a>' +
					'    </div>' +
					'  </div>' +
					'</li>'
				);
			});
		}, 500);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function(userdata)
	{
		this.amiLogin = userdata || amiLogin.getUser(); // BERK

		$('#F251696F_D42E_F7FF_86F7_2E6B4F2E8F74').empty();

		$('#ami_ext_menu_content').empty();

		clearInterval(this.interval);

		this.controls = [];
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_reload: function(result, rows, idx)
	{
		if(idx === rows.length)
		{
			return result.resolve();
		}

		/*------------------------------------------------------------------------------------------------------------*/

		const row = rows[idx];

		/*------------------------------------------------------------------------------------------------------------*/

		const id = amiWebApp.jspath('..field{.@name==="id"}.$', row)[0] || '';
		const control = amiWebApp.jspath('..field{.@name==="control"}.$', row)[0] || '';
		const params = amiWebApp.jspath('..field{.@name==="params"}.$', row)[0] || '[]';
		const options = amiWebApp.jspath('..field{.@name==="settings"}.$', row)[0] || '{}';
		const transparent = amiWebApp.jspath('..field{.@name==="transparent"}.$', row)[0] || '0';
		const autoRefresh = amiWebApp.jspath('..field{.@name==="autoRefresh"}.$', row)[0] || '1';
		const x = amiWebApp.jspath('..field{.@name==="x"}.$', row)[0] || '0';
		const y = amiWebApp.jspath('..field{.@name==="y"}.$', row)[0] || '0';
		const width = amiWebApp.jspath('..field{.@name==="width"}.$', row)[0] || '0';
		const height = amiWebApp.jspath('..field{.@name==="height"}.$', row)[0] || '0';

		/*------------------------------------------------------------------------------------------------------------*/

		const item_content_clazz = parseInt(transparent) ? 'grid-stack-item-transparent-content'
		                                                 : 'grid-stack-item-translucent-content'
		;

		/*------------------------------------------------------------------------------------------------------------*/

		const el = $(this._gridstack.addWidget({
			x: x,
			y: y,
			w: width,
			h: height,
			id: id,
			transparent: transparent,
		}));

		/*------------------------------------------------------------------------------------------------------------*/

		el.attr('id', `EB4DF671_2C31_BED0_6BED_44790525F28F_${idx}`).promise().done(() => {

			/*--------------------------------------------------------------------------------------------------------*/

			el.prepend(
				'<div class="grid-stack-item-close-handle"></div>'
				+
				'<div class="grid-stack-item-style-handle"></div>'
			);

			/*--------------------------------------------------------------------------------------------------------*/

			el.find('.grid-stack-item-close-handle').hide();

			el.find('.grid-stack-item-style-handle').hide();

			el.find('.grid-stack-item-content')
			  .addClass(item_content_clazz)
			  .addClass('rounded-top')
			;

			/*--------------------------------------------------------------------------------------------------------*/

			try
			{
				amiWebApp.createControl(this, this, control, [`#EB4DF671_2C31_BED0_6BED_44790525F28F_${idx} > .grid-stack-item-content`].concat(JSON.parse(params), JSON.parse(options))).done((control) => {

					/*------------------------------------------------------------------------------------------------*/

					control.autoRefresh = parseInt(autoRefresh);

					this.controls.push(control);

					/*------------------------------------------------------------------------------------------------*/

					this._reload(result, rows, idx + 1);

					/*------------------------------------------------------------------------------------------------*/

				}).fail((message) => {

					/*------------------------------------------------------------------------------------------------*/

					amiWebApp.error(`For widget '${id}': ${message}`);

					/*------------------------------------------------------------------------------------------------*/

					this._reload(result, rows, idx + 1);

					/*------------------------------------------------------------------------------------------------*/
				});
			}
			catch(e)
			{
				/*----------------------------------------------------------------------------------------------------*/

				amiWebApp.error(`For widget '${id}': ${e.message}`);

				/*----------------------------------------------------------------------------------------------------*/

				this._reload(result, rows, idx + 1);

				/*----------------------------------------------------------------------------------------------------*/
			}

			/*--------------------------------------------------------------------------------------------------------*/
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	reload: function()
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.execute('GetDashboardInfo -amiLogin=?', {params: [this.amiLogin]}).done((data) => { // BERK

			/*--------------------------------------------------------------------------------------------------------*/

			$('#B64A4510_C563_4DD4_B161_EDDB560F613C').prop('checked', false);

			this._gridstack.removeAll();

			this.controls = [];

			/*--------------------------------------------------------------------------------------------------------*/

			this._reload($.Deferred(), amiWebApp.jspath('..row', data), 0).done(() => {

				/*----------------------------------------------------------------------------------------------------*/

				$('.grid-stack-item-close-handle').click((e) => {

					if(confirm('Are you sure?'))
					{
						const el = $(e.currentTarget).parent()[0];

						this.removeWidget(el.gridstackNode).done(() => {

							this._gridstack.removeWidget(el);
						});
					}
				});

				/*----------------------------------------------------------------------------------------------------*/

				$('.grid-stack-item-style-handle').click((e) => {

					const node = $(e.currentTarget).parent()[0].gridstackNode;

					const el = $(e.currentTarget).parent().find('.grid-stack-item-content');

					if(el.hasClass('grid-stack-item-transparent-content'))
					{
						node.transparent = 0;

						el.removeClass('grid-stack-item-transparent-content').addClass('grid-stack-item-translucent-content');
					}
					else
					{
						node.transparent = 1;

						el.removeClass('grid-stack-item-translucent-content').addClass('grid-stack-item-transparent-content');
					}

					this.updateWidget(node);
				});

				/*----------------------------------------------------------------------------------------------------*/

				this.refresh().done(() => {

					result.resolve();
				});

				/*----------------------------------------------------------------------------------------------------*/
			});

			/*--------------------------------------------------------------------------------------------------------*/

		}).fail((data, message) => {

			result.reject(message);
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	reload2: function()
	{
		amiWebApp.lock();

		this.reload().done(() => {

			amiWebApp.unlock(/*---*/);

		}).fail((message) => {

			amiWebApp.error(message);
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	refresh: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		this.controls.forEach((control) => {

			if(control.autoRefresh !== 0 && control.refresh)
			{
				control.refresh();
			}
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return $.Deferred().resolve();

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	refresh2: function()
	{
		amiWebApp.lock();

		this.refresh().done(() => {

			amiWebApp.unlock(/*---*/);

		}).fail((message) => {

			amiWebApp.error(message);
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	setStatic: function(isStatic)
	{
		if(isStatic) {
			$('.grid-stack-item-close-handle,.grid-stack-item-style-handle').hide();
		} else {
			$('.grid-stack-item-close-handle,.grid-stack-item-style-handle').show();
		}

		this._gridstack.setStatic(isStatic);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	updateWidget: function(item)
	{
		amiWebApp.lock();

		return amiCommand.execute('UpdateWidget -id=? -transparent=? -x=? -y=? -width=? -height=?', {params: [item.id, item.transparent, item.x, item.y, item.w, item.h]}).done(() => {

			amiWebApp.unlock();

		}).fail((data, message) => {

			amiWebApp.error(message);
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	removeWidget: function(item)
	{
		amiWebApp.lock();

		return amiCommand.execute('RemoveWidget -id=?', {params: [item.id]}).done(() => {

			amiWebApp.unlock();

		}).fail((data, message) => {

			amiWebApp.error(message);
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

window.userDashboardApp = new UserDashboardApp();

/*--------------------------------------------------------------------------------------------------------------------*/
