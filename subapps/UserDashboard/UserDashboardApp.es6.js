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
		this._gridstack = null;
		this._observer = null;

		const result = $.Deferred();

		amiWebApp.replaceHTML('#ami_main_content', twigUserDashboardApp).done(() => {

			const CELL_WIDTH_PX = 24;
			const MIN_COLS = 16;
			const SNAP = 4;

			/*--------------------------------------------------------------------------------------------------------*/

			const gridEl = document.getElementById('F251696F_D42E_F7FF_86F7_2E6B4F2E8F74');

			/*--------------------------------------------------------------------------------------------------------*/

			const computeColumns = () => {

				const width = gridEl?.clientWidth ?? 0;

				const cols = Math.floor(width / CELL_WIDTH_PX);

				return Math.max(MIN_COLS, Math.floor(cols / SNAP) * SNAP);
			};

			/*--------------------------------------------------------------------------------------------------------*/

			this._gridstack = GridStack.init({float: true, margin: 0, column: computeColumns()}, gridEl);

			if(this._gridstack)
			{
				/*----------------------------------------------------------------------------------------------------*/
				/* WINDOW RESIZING                                                                                    */
				/*----------------------------------------------------------------------------------------------------*/

				let oldCols = -1;

				const updateColumns = () => {

					const newCols = computeColumns();

					if(oldCols !== newCols)
					{
						this._gridstack.column(oldCols = newCols, 'none');
					}
				};

				/*----------------------------------------------------------------------------------------------------*/

				this._observer = new ResizeObserver(updateColumns);

				this._observer.observe(gridEl);

				updateColumns();

				/*----------------------------------------------------------------------------------------------------*/
				/* WIDGET RESIZING                                                                                    */
				/*----------------------------------------------------------------------------------------------------*/

				this._gridstack.on('dragstop', (e, el) => {

					this.updateWidget(el || e?.target);
				});

				this._gridstack.on('resizestop', (e, el) => {

					this.updateWidget(el || e?.target);
				});

				/*----------------------------------------------------------------------------------------------------*/
			}

			/*--------------------------------------------------------------------------------------------------------*/

			result.resolve();
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onExit: function()
	{
		this._observer?.disconnect(false);

		this._gridstack?.destroy(false);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function(userdata)
	{
		this.hash = userdata;

		return this.reload().done(() => {

			setTimeout(() => {

				$('#ami_ext_menu_content').html(
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
			}, 500);
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function(userdata)
	{
		this.hash = userdata;

		$('#F251696F_D42E_F7FF_86F7_2E6B4F2E8F74').empty();

		$('#ami_ext_menu_content').empty();

		clearInterval(this.interval);

		this.controls = [];
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_reload: function(result, widgets, idx)
	{
		if(idx === widgets.length)
		{
			return result.resolve();
		}

		/*------------------------------------------------------------------------------------------------------------*/

		const widget = widgets[idx];

		/*------------------------------------------------------------------------------------------------------------*/

		const item_content_clazz = parseInt(widget.transparent) ? 'grid-stack-item-transparent-content'
			                                                    : 'grid-stack-item-translucent-content'
		;

		/*------------------------------------------------------------------------------------------------------------*/

		const el = $(this._gridstack.addWidget({
			x: widget.x,
			y: widget.y,
			w: widget.width,
			h: widget.height,
		}));

		/*------------------------------------------------------------------------------------------------------------*/

		el.attr('id', `EB4DF671_2C31_BED0_6BED_44790525F28F_${idx}`);
		el.attr('data-widget-id', widget.id);

		if(el[0].gridstackNode)
		{
			el[0].gridstackNode.transparent = widget.transparent;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		el.promise().done(() => {

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
				amiWebApp.createControl(this, this, widget.control, [`#EB4DF671_2C31_BED0_6BED_44790525F28F_${idx} > .grid-stack-item-content`].concat(widget.params, widget.options)).done((control) => {

					control.autoRefresh = parseInt(widget.autoRefresh);

					control.dashboardWidgetId = widget.id;
					control.dashboardHash = this.hash;

					this.controls.push(control);

					this._reload(result, widgets, idx + 1);

				}).fail((message) => {

					amiWebApp.error(`For widget '${widget.id}': ${message}`);

					this._reload(result, widgets, idx + 1);
				});
			}
			catch(e)
			{
				amiWebApp.error(`For widget '${widget.id}': ${e.message}`);

				this._reload(result, widgets, idx + 1);
			}
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	reload: function()
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.execute('GetDashboardInfo -hash=?', {params: [this.hash]}).done((data) => {

			const widgets = JSON.parse(amiWebApp.jspath('..field{.@name==="json"}.$', data)[0] || '{}');

			$('#B64A4510_C563_4DD4_B161_EDDB560F613C').prop('checked', false);

			this._gridstack.removeAll();

			this.setStatic(true);

			this.controls = [];

			/*--------------------------------------------------------------------------------------------------------*/

			this._reload($.Deferred(), Object.values(widgets), 0).done(() => {

				$('.grid-stack-item-close-handle').click((e) => {

					if(confirm('Are you sure?'))
					{
						const el = $(e.currentTarget).parent()[0];

						this.removeWidget(el).done(() => {

							this._gridstack.removeWidget(el);
						});
					}
				});

				/*----------------------------------------------------------------------------------------------------*/

				$('.grid-stack-item-style-handle').click((e) => {

					const el0 = $(e.currentTarget).parent()[0];

					const node = el0.gridstackNode;

					const el = $(e.currentTarget).parent().find('.grid-stack-item-content');

					if(!node)
					{
						return;
					}

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

					this.updateWidget(el0);
				});

				/*----------------------------------------------------------------------------------------------------*/

				this.refresh().done(() => {

					result.resolve();
				});
			});

		}).fail((data, message) => {

			result.reject(message);
		});

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
		this.controls.forEach((control) => {

			if(control.autoRefresh !== 0 && control.refresh)
			{
				control.refresh();
			}
		});

		return $.Deferred().resolve();
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
		if(isStatic)
		{
			$('.grid-stack-item-close-handle,.grid-stack-item-style-handle').hide();
		}
		else
		{
			$('.grid-stack-item-close-handle,.grid-stack-item-style-handle').show();
		}

		//this._gridstack.setStatic(isStatic);
		const gridElement = document.querySelector('.grid-stack');
		const gridInstance = GridStack.get(gridElement);
		if (gridInstance) {
    		gridInstance.setStatic(isStatic);
		}
		
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_getWidgetContext: function(el, options = {})
	{
		const required = Array.isArray(options.required) ? options.required : ['id'];

		if(el && !el.gridstackNode && el.closest)
		{
			el = el.closest('.grid-stack-item');
		}

		const context = {
			el,
			node: el?.gridstackNode,
			id: el?.getAttribute('data-widget-id'),
		};

		for(const field of required)
		{
			if(context[field])
			{
				continue;
			}

			return null;
		}

		return context;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	updateWidget: function(el)
	{
		const context = this._getWidgetContext(el, {
			required: ['id', 'node'],
		});

		if(!context)
		{
			return $.Deferred().resolve();
		}

		const {id, node} = context;

		amiWebApp.lock();

		return amiCommand.execute('UpdateDashboardWidget -hash=? -widgetId=? -transparent=? -x=? -y=? -width=? -height=?', {
			params: [
				this.hash,
				id,
				node.transparent ?? 0,
				node.x,
				node.y,
				node.w,
				node.h,
			],
		}).done(() => {

			amiWebApp.unlock();

		}).fail((data, message) => {

			amiWebApp.error(message);
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	removeWidget: function(el)
	{
		const context = this._getWidgetContext(el, {
			required: ['id'],
		});

		if(!context)
		{
			return $.Deferred().resolve();
		}

		const {id} = context;

		amiWebApp.lock();

		return amiCommand.execute('RemoveDashboardWidget -hash=? -widgetId=?', {
			params: [this.hash, id],
		}).done(() => {

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
