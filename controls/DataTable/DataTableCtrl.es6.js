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

import twigTable from './assets/twig/table.twig';
import twigJS    from './assets/twig/js.twig'   ;

import saveAs from 'file-saver';

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('DataTableCtrl', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.Control,

	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);

		/**/ if(amiWebApp.bootstrapVersion === 4)
		{
			require('datatables.net-bs4/css/dataTables.bootstrap4.min.css');
			require('datatables.net-bs4');
		}
		else if(amiWebApp.bootstrapVersion === 5)
		{
			require('datatables.net-bs5/css/dataTables.bootstrap5.min.css');
			require('datatables.net-bs5');
		}
		else
		{
			require('datatables.net-dt/css/jquery.dataTables.min.css');
			require('datatables.net-dt');
		}

		this.$class.converters = [];
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
				endpoint: amiCommand.getHttpEndpoint().trim(),
				command: (command || '').trim(),
			},
			{
				context: result,
				appendCommandFunc: () => {},
				updateCommandFunc: () => {},
				removeCommandFunc: () => {},
				showPrimaryField: true, showBigContent: true, showToolBar: true,
				enableCache: false, enableCount: false, enableEditMode: false,
				canEdit: amiAuth.hasRole('AMI_ADMIN') || amiAuth.hasRole('AMI_WRITER'),
				catalog: null, entity: null, primaryField: null, rowset: null,
				start: 1, stop: 10, orderBy: null, orderWay: null,
				maxCellLength: 64,
				card: false,
				onRefresh: null,
			},
			options
		);

		/*------------------------------------------------------------------------------------------------------------*/

		this._render(result, this.setSelector(selector));

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
		(this._tab = new this._tabCtor(null, this)).render(selector, {card: false}).done(() => {

			if(this.$class.converters.length === 0)
			{
				amiCommand.execute('ListConverters').done((data) => {

					this.$class.converters = amiWebApp.jspath('..row', data).map(x => {

						const xslt = amiWebApp.jspath('..field{.@name==="xslt"}.$', x)[0] || '';
						const mime = amiWebApp.jspath('..field{.@name==="mime"}.$', x)[0] || '';

						return {
							xslt: xslt,
							mime: mime,
						};
					});

					this.___render(result);

				}).fail(() => {

					this.___render(result);
				});
			}
			else
			{
				this.___render(result);
			}
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	___render: function(result)
	{
		this.refresh().done(() => {

			result.resolveWith(this.ctx.context, []);

		}).fail((message) => {

			result.rejectWith(this.ctx.context, [message]);
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	refresh: function(options)
	{
		amiWebApp.lock();

		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const [context] = amiWebApp.setup(['context'], [result], options);

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.execute(this.ctx.command + (this.ctx.enableCache ? ' -cached' : '') + (this.ctx.enableCount ? ' -count' : '') + (!this.ctx.showBigContent ? ' -hideBigContent' : '')).done((data) => {

			/*--------------------------------------------------------------------------------------------------------*/

			const fieldDescriptionSet = this.ctx.rowset ? amiWebApp.jspath('..fieldDescriptions{.@rowset==="' + this.ctx.rowset + '"}', data)
			                                            : amiWebApp.jspath('..fieldDescriptions'                                      , data)
			;

			const rowSets = this.ctx.rowset ? amiWebApp.jspath('..rowset{.@type==="' + this.ctx.rowset + '"}"', data)
			                                : amiWebApp.jspath('..rowset'                                     , data)
			;

			/*--------------------------------------------------------------------------------------------------------*/

			const listOfFieldDescriptions = fieldDescriptionSet.map(x => x['fieldDescription'] || []);

			const listOfRowSetName = rowSets.map(x => x['@type'] || 'result');

			const listOfRowSets = rowSets.map(x => x['row'] || []);

			/*--------------------------------------------------------------------------------------------------------*/

			this.ctx.converters = this.$class.converters;

			this.ctx.sql = amiWebApp.jspath('.@sql', rowSets)[0] || 'N/A';
			this.ctx.mql = amiWebApp.jspath('.@mql', rowSets)[0] || 'N/A';
			this.ctx.ast = amiWebApp.jspath('.@ast', rowSets)[0] || 'N/A';

			/*--------------------------------------------------------------------------------------------------------*/

			this.ctx.cnt = 0;

			this._tab.removeAllItems();

			for(const rowSetName of listOfRowSetName)
			{
				this._tab.appendItem(rowSetName, {closable: false, firstVisible: false}).done((selector) => {

					this.replaceHTML(selector, twigTable, {dict: this.ctx}).done(() => {

						/*--------------------------------------------------------------------------------------------*/

						const columns = [{
							title: 'tools',
							class: 'text-center text-nowrap',
							orderable: false,
						}];

						listOfFieldDescriptions[this.ctx.cnt].forEach(x => {

							columns.push({
								title: x['@field'],
								class: 'text-center text-nowrap',
								orderable: true,
							});
						});

						/*--------------------------------------------------------------------------------------------*/

						const data2 = listOfRowSets[this.ctx.cnt].map(x => {

							const result = [
								'<a class="text-primary" href="#" data-ami-op="clone" data-ami-id=""><i class="bi bi-files"></i></a>' +
								'&nbsp;&nbsp;&nbsp;' +
								'<a class="text-danger" href="#" data-ami-op="trash" data-ami-id=""><i class="bi bi-trash"></i></a>'
							];

							x.field.forEach(y => {

								let data = y['$'];

								if(data.length > this.ctx.maxCellLength)
								{
									result.push(`<div><a class="text-primary" href="#" data-ctrl="textBox" data-ctrl-location="body" data-params="[${amiWebApp.textToHtml(JSON.stringify(data))}]" data-options="{}"><i class="bi bi-search"></i></a> ${amiWebApp.textToHtml(data.substring(0, this.ctx.maxCellLength))}…</div>`);
								}
								else
								{
									result.push(`<div>${amiWebApp.textToHtml(data)}`);
								}
							});

							return result;
						});

						/*--------------------------------------------------------------------------------------------*/

						const table = $(`${selector} > table`).DataTable({
							data: data2,
							columns: columns,
							pageLength: this.ctx.stop - this.ctx.start + 1,
							dom: '<"table-responsive" t>',
							initComplete: (settings) => {

								/*------------------------------------------------------------------------------------*/

								const el = $(selector);

								const table = settings.oInstance.api();

								/*------------------------------------------------------------------------------------*/

								el.find('[data-ami-op="filter"]').keyup((e) => {

									table.search($(e.currentTarget).val()).draw();
								});

								/*------------------------------------------------------------------------------------*/

								el.find('[data-ami-op="goFirst"]').click(() => {

									table.page('first').draw('page');
									this.getPagination(el, table);
								});

								el.find('[data-ami-op="goPrevious"]').click(() => {

									table.page('previous').draw('page');
									this.getPagination(el, table);
								});

								el.find('[data-ami-op="goNext"]').click(() => {

									table.page('next').draw('page');
									this.getPagination(el, table);
								});

								el.find('[data-ami-op="goLast"]').click(() => {

									table.page('last').draw('page');
									this.getPagination(el, table);
								});

								/*------------------------------------------------------------------------------------*/

								el.find('[data-ami-op="edit"]').change(() => {

									alert('Hello');
								});

								/*------------------------------------------------------------------------------------*/

								el.find('.ami-table-start').keyup(() => {

									this.setPagination(el, table);
								});

								el.find('.ami-table-stop').keyup(() => {

									this.setPagination(el, table);
								});

								/*------------------------------------------------------------------------------------*/

								this.getPagination(el, table);

								/*------------------------------------------------------------------------------------*/
							}
						});

						/*--------------------------------------------------------------------------------------------*/

						this.ctx.cnt++;
					});
				});
			}

			/*--------------------------------------------------------------------------------------------------------*/

			const el = $(this.getSelector());

			/*--------------------------------------------------------------------------------------------------------*/

			el.find('[data-ctrl]').click((e) => {

				this.createControlFromWebLink(this.getParent(), e.currentTarget, {});
			});

			/*--------------------------------------------------------------------------------------------------------*/

			el.find('[data-ami-op="refresh"]').click(() => {

				this.refresh();
			});

			/*--------------------------------------------------------------------------------------------------------*/

			el.find('[ami-table-op="export"]').click((e) => {

				const el = $(e.currentTarget);

				this.exportResult(
					el.attr('ami-table-xslt'),
					el.attr('ami-table-mime')
				);
			});

			/*--------------------------------------------------------------------------------------------------------*/

			el.find('[ami-table-op="viewSQL"]').click(() => {

				amiWebApp.createControl(this.getParent(), this, 'textBox', [this.ctx.  sql  , {lang: 'sql'}]);
			});

			el.find('[ami-table-op="viewMQL"]').click(() => {

				amiWebApp.createControl(this.getParent(), this, 'textBox', [this.ctx.  mql  , {lang: 'sql'}]);
			});

			el.find('[ami-table-op="viewCmd"]').click(() => {

				amiWebApp.createControl(this.getParent(), this, 'textBox', [this.ctx.command, {lang: 'sql'}]);
			});

			/*--------------------------------------------------------------------------------------------------------*/

			el.find('[ami-table-op="viewES5"]').click(() => {

				amiWebApp.createControl(this.getParent(), this, 'textBox', [amiWebApp.formatTWIG(twigJS, this.ctx), {lang: 'javascript'}]);
			});

			/*--------------------------------------------------------------------------------------------------------*/

			el.find('[ami-table-op="bookmark"]').click(() => {

				amiWebApp.createControl(this.getParent(), this, 'bookmarkBox', ['TableViewer', this.toBookmarkJSON(this.ctx)]);
			});

			el.find('[ami-table-op="dashboard"]').click(() => {

				amiWebApp.createControl(this.getParent(), this, 'dashboardBox', ['DataTable', this.toDashboardJSON(this.ctx)]);
			});

			/*--------------------------------------------------------------------------------------------------------*/

			amiWebApp.unlock();

			/*--------------------------------------------------------------------------------------------------------*/

			result.resolveWith(context, [listOfFieldDescriptions, listOfRowSets, this.ctx.sql, this.ctx.mql, this.ctx.ast]);

		}).fail((message) => {

			result.rejectWith(context, [message]);
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	getPagination: function(el, table)
	{
		const info = table.page.info();

		el.find('.ami-table-start').val(info.start + 1);
		el.find('.ami-table-stop').val(info.end + 0);

		el.find('.ami-table-shown').text(info.end - info.start);
		el.find('.ami-table-total').text(info.recordsTotal);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	setPagination: function(el, table)
	{
		let start = parseInt(el.find('.ami-table-start').val());

		let stop = parseInt(el.find('.ami-table-stop').val());

		if(Number.isNaN(start) || start < 0x000000000000000001) {
			start = 0x000000000000000001;
		}

		if(Number.isNaN(stop) || stop > table.rows().count()) {
			stop = table.rows().count();
		}

		if(start <= stop)
		{
			const range = stop - start + 1;

			const page = Math.ceil(start / range) - 1;

			table.page.len(range).page(page).draw('page');

			this.getPagination(el, table);
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	exportResult: function(xslt, mime)
	{
		amiWebApp.lock();

		amiCommand.execute(this.ctx.command, {converter: xslt}).done((data) => {

			/*--------------------------------------------------------------------------------------------------------*/

			var fname;

			/**/ if(xslt === 'application/xml') {
				fname = 'result.xml';
			}
			else if(xslt === 'application/json') {
				fname = 'result.json';
			}
			else if(xslt === 'text/csv') {
				fname = 'result.csv';
			}
			else {
				fname = 'result.txt';
			}

			/*--------------------------------------------------------------------------------------------------------*/

			saveAs(new Blob([data], {type: mime}), fname);

			/*--------------------------------------------------------------------------------------------------------*/

			amiWebApp.unlock();

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	toBookmarkJSON: function()
	{
		return {
			command: this.ctx.command2,
			/**/
			catalog: this.ctx.catalog,
			entity: this.ctx.entity,
			primaryField: this.ctx.primaryField,
			rowset: this.ctx.rowset,
			/**/
			start: this.ctx.start,
			stop: this.ctx.stop,
			orderBy: this.ctx.orderBy,
			orderWay: this.ctx.orderWay,
			/**/
			maxCellLength: this.ctx.maxCellLength,
		};
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	toDashboardJSON: function()
	{
		return this.ctx;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
