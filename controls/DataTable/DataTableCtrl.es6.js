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

import twigDataTableCtrl from './assets/twig/DataTableCtrl.twig';

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('DataTableCtrl', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.Control,

	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);

		/**/ if(amiWebApp.bootstrapVersion === 4) {
			require('datatables.net-bs4/css/dataTables.bootstrap4.min.css');
			require('datatables.net-bs4');
		}
		else if(amiWebApp.bootstrapVersion === 5) {
			require('datatables.net-bs5/css/dataTables.bootstrap5.min.css');
			require('datatables.net-bs5');
		}
		else {
			require('datatables.net-dt/css/jquery.dataTables.min.css');
			require('datatables.net-dt');
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function()
	{
		amiWebApp.loadResources([
			'ctrl:tab',
		]).done((data) => {
			this._tabCtor = data[0];
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(selector, command, options)
	{
		amiWebApp.lock();

		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		this.setupCtx(
			{
				command: (command || '').trim(),
			},
			{
				context: result,
				rowset: '',
				maxCellLength: 64,
			},
			options
		);

		/*------------------------------------------------------------------------------------------------------------*/

		this._render(result, selector);

		/*------------------------------------------------------------------------------------------------------------*/

		return result.always(() => {

			amiWebApp.unlock();
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_render: function(result, selector)
	{
		if(this.getParent().$name !== 'TabCtrl')
		{
			const tab = new this._tabCtor(null, this);

			tab.render(selector, this.ctx).done(() => {

				tab.appendItem(`<i class="bi bi-table"></i> ${this.ctx.entity}`, {closable: false, firstVisible: this.ctx.card}).done((selector) => {

					this.setParent(tab);

					this.__render(result, selector);
				});
			});
		}
		else
		{
			this.__render(result, selector);
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	__render: function(result, selector)
	{
		this.replaceHTML(selector, twigDataTableCtrl, {dict: this.ctx}).done(() => {

			this.refresh().done(() => {

				result.resolveWith(this.ctx.context, []);

			}).fail((message) => {

				result.rejectWith(this.ctx.context, [message]);
			});
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	refresh: function(options)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const [context] = amiWebApp.setup(['context'], [result], options);

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.execute(this.ctx.command).done((data) => {

			/*------------------------------------------------------------------------------------------------------------*/

			const fieldDescriptions = this.ctx.rowset ? amiWebApp.jspath('..fieldDescriptions{.@rowset==="' + this.ctx.rowset + '"}', data)
			                                          : amiWebApp.jspath('..fieldDescriptions'                                      , data)
			;

			const fieldDescription = fieldDescriptions.shift();

			/*------------------------------------------------------------------------------------------------------------*/

			const rowSets = this.ctx.rowset ? amiWebApp.jspath('..rowset{.@type==="' + this.ctx.rowset + '"}"', data)
			                                : amiWebApp.jspath('..rowset'                                     , data)
			;

			const rowSet = rowSets.shift();

			/*------------------------------------------------------------------------------------------------------------*/

			if(!fieldDescription
			   ||
			   !/*-*/rowSet/*-*/
			 ) {
				result.rejectWith(context, []);
			}

			/*------------------------------------------------------------------------------------------------------------*/

			const columns = fieldDescription.fieldDescription.map(x => {

				return {
					title: x['@field'],
					class: 'text-center text-nowrap',
				};
			});

			/*------------------------------------------------------------------------------------------------------------*/

			const rows = rowSet.row.map(x => x.field.map(y => {

				let data = y['$'];

				if(data.length > this.ctx.maxCellLength)
				{
					return `<div>${amiWebApp.textToHtml(data.substring(0, this.ctx.maxCellLength))}…</div>`;
				}
				else
				{
					return `<div>${amiWebApp.textToHtml(data)}`;
				}
			}));

			/*------------------------------------------------------------------------------------------------------------*/

			const el = $(this.patchId('#FC44A66E_E3A0_B0E7_AF76_5419BDFA7F39'));

			el.empty().DataTable({
				data: rows,
				columns: columns,
			});

			/*------------------------------------------------------------------------------------------------------------*/

			el.closest('div').addClass('table-responsive');

			/*------------------------------------------------------------------------------------------------------------*/

			result.resolveWith(context, []);

		}).fail((message) => {

			result.rejectWith(context, []);
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
