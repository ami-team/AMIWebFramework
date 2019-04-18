/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global xqlGetRegions
 *
 */

/*-------------------------------------------------------------------------*/

$AMIClass('TableCtrl', {
	/*---------------------------------------------------------------------*/

	$extends: ami.Control,

	/*---------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);
	},

	/*---------------------------------------------------------------------*/

	onReady: function()
	{
		/*-----------------------------------------------------------------*/

		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/Table/twig/TableCtrl.twig',
			/**/
			amiWebApp.originURL + '/controls/Table/twig/refineModal.twig',
			amiWebApp.originURL + '/controls/Table/twig/addModal.twig',
			/**/
			amiWebApp.originURL + '/controls/Table/twig/fieldList.twig',
			amiWebApp.originURL + '/controls/Table/twig/table.twig',
			amiWebApp.originURL + '/controls/Table/twig/js.twig',
			/**/
			amiWebApp.originURL + '/controls/Table/js/libxql.js',
			/**/
			amiWebApp.originURL + '/js/3rd-party/filesaver.min.js',
			/**/
			'ctrl:fieldEditor',
			'ctrl:unitEditor',
			'ctrl:tab',
		]).done((data) => {

			amiWebApp.appendHTML('body', data[1]).done(() => {
				amiWebApp.appendHTML('body', data[2]).done(() => {

					this.fragmentTableCtrl = data[0];
					this.fragmentFieldList = data[3];
					this.fragmentTable = data[4];
					this.fragmentJS = data[5];

					this.fieldEditorCtor = data[8];
					this.fieldUnitCtor = data[9];
					this.tabCtor = data[10];
				});
			});
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	render: function(selector, command, settings)
	{
		const result = $.Deferred();

		/*-----------------------------------------------------------------*/

		this.ctx = {
			isEmbedded: amiWebApp.isEmbedded(),

			endpoint: amiCommand.endpoint,

			command: command.trim(),

			/**/

			fieldInfo: [],
			fieldDescriptions: [],

			sql: 'N/A',
			mql: 'N/A',
			ast: 'N/A',

			totalNumberOfRows: Number.NaN,
		};

		const fn1 = (fields, values) => 'AddElement -catalog="' + this.ctx.catalog + '" -entity="' + this.ctx.entity + '" -separator="§" -fields="' + amiWebApp.textToString(fields.join('§')) + '" -values="' + amiWebApp.textToString(values.join('§')) + '"';

		const fn2 = (primaryValue) => 'RemoveElements -catalog="' + this.ctx.catalog + '" -entity="' + this.ctx.entity + '" -separator="§" -keyFields="' + this.ctx.primaryField + '" -keyValues="' + amiWebApp.textToString(primaryValue) + '"';

		const [
			context,
			appendCommandFunc, deleteCommandFunc,
			enableCache, enableCount, showToolBar, showDetails, showTools, canEdit,
			catalog, entity, primaryField, rowset,
			start, stop, orderBy, orderWay,
			maxCellLength,
			card
		] = amiWebApp.setup(
			[
				'context',
				'appendCommandFunc', 'deleteCommandFunc',
				'enableCache', 'enableCount', 'showToolBar', 'showDetails', 'showTools', 'canEdit',
				'catalog', 'entity', 'primaryField', 'rowset',
				'start', 'stop', 'orderBy', 'orderWay',
				'maxCellLength',
				'card',
			],
			[
				result,
				fn1, fn2,
				false, true, true, false, true, false,
				'', '', '', '',
				1, 10, '', '',
				64,
				false,
			],
			settings
		);

		this.ctx.appendCommandFunc = appendCommandFunc;
		this.ctx.deleteCommandFunc = deleteCommandFunc;

		this.ctx.enableCache = enableCache;
		this.ctx.enableCount = enableCount;
		this.ctx.showToolBar = showToolBar;
		this.ctx.showDetails = showDetails;
		this.ctx.showTools = showTools;
		this.ctx.canEdit = canEdit;

		this.ctx.catalog = catalog;
		this.ctx.entity = entity;
		this.ctx.primaryField = primaryField;
		this.ctx.rowset = rowset;

		this.ctx.start = start;
		this.ctx.stop = stop;
		this.ctx.orderBy = orderBy;
		this.ctx.orderWay = orderWay;

		this.ctx.maxCellLength = maxCellLength;

		this.ctx.card = card;

		/*-----------------------------------------------------------------*/

		this.fieldEditor = new this.fieldEditorCtor(this, this);
		this.unitEditor = new this.fieldUnitCtor(this, this);

		/*-----------------------------------------------------------------*/

		if(!this.ctx.primaryField
		   &&
		   (
			this.ctx.showDetails
			||
			this.ctx.showTools
			||
			this.ctx.canEdit
		   )
		 ) {
			amiCommand.execute('GetEntityInfo -catalog="' + this.ctx.catalog + '" -entity="' + this.ctx.entity + '"').done((data) => {

				const rows = amiWebApp.jspath('..{.@type==="fields"}.row', data);

				for(let i in rows)
				{
					const field = amiWebApp.jspath('..field{.@name==="field"}.$', rows[i])[0] || '';
					const type = amiWebApp.jspath('..field{.@name==="type"}.$', rows[i])[0] || '';
					const def = amiWebApp.jspath('..field{.@name==="def"}.$', rows[i])[0] || '';

					const primary = amiWebApp.jspath('..field{.@name==="primary"}.$', rows[i])[0] || '';
					const created = amiWebApp.jspath('..field{.@name==="created"}.$', rows[i])[0] || '';
					const createdBy = amiWebApp.jspath('..field{.@name==="createdBy"}.$', rows[i])[0] || '';
					const modified = amiWebApp.jspath('..field{.@name==="modified"}.$', rows[i])[0] || '';
					const modifiedBy = amiWebApp.jspath('..field{.@name==="modifiedBy"}.$', rows[i])[0] || '';

					if(primary === 'true')
					{
						this.ctx.primaryField = field;
					}
					else
					{
						if(created === 'false'
						   &&
						   createdBy === 'false'
						   &&
						   modified === 'false'
						   &&
						   modifiedBy === 'false'
						 ) {
							this.ctx.fieldInfo.push({
								field: field,
								type: type,
								def: def,
							});
						}
					}
				}

				if(!this.ctx.primaryField)
				{
					this.ctx.showDetails = false;
					this.ctx.showTools = false;
					this.ctx.canEdit = false;
				}

				this._render(result, selector);

			}).fail(() => {

				if(/*----*/ true /*----*/)
				{
					this.ctx.showDetails = false;
					this.ctx.showTools = false;
					this.ctx.canEdit = false;
				}

				this._render(result, selector);
			});
		}
		else
		{
			this._render(result, selector);
		}

		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/

	_render: function(result, selector)
	{
		if(this.getParent().$name !== 'TabCtrl')
		{
			const tab = new this.tabCtor(null, this);

			tab.render(selector, this.ctx).done(() => {

				tab.appendItem('<i class="fa fa-table"></i> ' + this.ctx.entity, {closable: false}).done((selector) => {

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

	/*---------------------------------------------------------------------*/

	__render: function(result, selector)
	{
		this.replaceHTML(selector, this.fragmentTableCtrl, {dict: this.ctx}).done(() => {

			/*-------------------------------------------------------------*/

			$(this.patchId('#BA1A7EEA_2BB5_52F2_5BCF_64B0C381B570')).click(() => {

				amiWebApp.lock();

				this.firstPage().done(() => {

					amiWebApp.unlock();

				}).fail((message) => {

					amiWebApp.error(message, true);
				});
			});

			$(this.patchId('#BB126294_FFC2_24B8_8765_CF653EB950F7')).click(() => {

				amiWebApp.lock();

				this.prevPage().done(() => {

					amiWebApp.unlock();

				}).fail((message) => {

					amiWebApp.error(message, true);
				});
			});

			$(this.patchId('#E7FDF4C8_ECD2_3FE0_8C75_541E511239C2')).click(() => {

				amiWebApp.lock();

				this.nextPage().done(() => {

					amiWebApp.unlock();

				}).fail((message) => {

					amiWebApp.error(message, true);
				});
			});

			$(this.patchId('#B7979619_196F_F39D_A893_17E5EDAA8628')).click(() => {

				amiWebApp.lock();

				this.lastPage().done(() => {

					amiWebApp.unlock();

				}).fail((message) => {

					amiWebApp.error(message, true);
				});
			});

			/*-------------------------------------------------------------*/

			$(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).keypress((e) => {

				if(e.keyCode == 13)
				{
					amiWebApp.lock();

					this.refresh().done(() => {

						amiWebApp.unlock();

					}).fail((message) => {

						amiWebApp.error(message, true);
					});
				}
			});

			$(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).keypress((e) => {

				if(e.keyCode == 13)
				{
					amiWebApp.lock();

					this.refresh().done(() => {

						amiWebApp.unlock();

					}).fail((message) => {

						amiWebApp.error(message, true);
					});
				}
			});

			$(this.patchId('#D809166F_A40B_2376_C8A5_977AA0C8C408')).click(() => {

				amiWebApp.lock();

				this.refresh().done(() => {

					amiWebApp.unlock();

				}).fail((message) => {

					amiWebApp.error(message, true);
				});
			});

			/*-------------------------------------------------------------*/

			$(this.patchId('#DDC32238_DD25_8354_AC6C_F6E27CA6E18D')).change(() => {

				this.setMode();
			});

			$(this.patchId('#CDE5AD14_1268_8FA7_F5D8_0D690F3FB850')).click(() => {

				this.showEditModal();
			});

			/*-------------------------------------------------------------*/

			$(this.patchId('#C9F4DBE7_EF4F_09F1_C31D_97581978BD13')).click(() => {

				this.exportResult('AMIXmlToXml.xsl');
			});

			$(this.patchId('#A4B03239_52F9_5FBB_0799_C932B9E95FCD')).click(() => {

				this.exportResult('AMIXmlToJson.xsl');
			});

			$(this.patchId('#C6182164_9432_FA0C_5273_EFF56376660E')).click(() => {

				this.exportResult('AMIXmlToCsv.xsl');
			});

			$(this.patchId('#B8CCCCA1_9829_3EA5_280E_ED47FCD33ADE')).click(() => {

				this.exportResult('AMIXmlToText.xsl');
			});

			/*-------------------------------------------------------------*/

			$(this.patchId('#C8CB30DC_414F_7559_B618_42B7CC04F993')).click(() => {

				amiWebApp.createControl(this.getParent(), this, 'editBox', [this.ctx.command], {}).done((command) => {

					this.ctx.command = command;

					this.refresh();
				});
			});

			/*-------------------------------------------------------------*/

			$(this.patchId('#CD458FEC_9AD9_30E8_140F_263F119961BE')).click(() => {

				amiWebApp.createControl(this.getParent(), this, 'messageBox', [this.ctx.sql], {});
			});

			$(this.patchId('#F4F0EB6C_6535_7714_54F7_4BC28C254872')).click(() => {

				amiWebApp.createControl(this.getParent(), this, 'messageBox', [this.ctx.mql], {});
			});

			$(this.patchId('#EF739EE0_DB79_0A4E_9FDD_7BA3C0F74F92')).click(() => {

				amiWebApp.createControl(this.getParent(), this, 'messageBox', [this.ctx.command2.startsWith('BrowseQuery') ? 'SearchQuery' + this.ctx.command2.substring(11) : this.ctx.command2], {});
			});

			$(this.patchId('#D49853E2_9319_52C3_5253_A208F9500408')).click(() => {

				amiWebApp.createControl(this.getParent(), this, 'messageBox', [this.ctx.command.startsWith('BrowseQuery') ? 'SearchQuery' + this.ctx.command.substring(11) : this.ctx.command], {});
			});

			$(this.patchId('#C50C3427_FEE5_F115_1FEC_6A6668763EC4')).click(() => {

				amiWebApp.createControl(this.getParent(), this, 'textBox', [this.ctx.js], {});
			});

			/*-------------------------------------------------------------*/

			this.refresh().done((fieldDescriptions, rows, sql, mql, ast, totalNumberOfRows) => {

				result.resolveWith(this.ctx.context, [fieldDescriptions, rows, sql, mql, ast, totalNumberOfRows]);

			}).fail((message) => {

				result.rejectWith(this.ctx.context, [message]);
			});

			/*-------------------------------------------------------------*/
		});
	},

	/*---------------------------------------------------------------------*/

	parsePageNumber: function(s, defaultPageNumber)
	{
		const parsedPageNumber = parseInt(s);

		return Number.isNaN(parsedPageNumber) === false && parsedPageNumber > 0 ? parsedPageNumber
		                                                                        : defaultPageNumber
		;
	},

	/*---------------------------------------------------------------------*/

	getOffsetOfLastPage: function(range)
	{
		const modulo = this.ctx.totalNumberOfRows % range;

		return this.ctx.totalNumberOfRows > modulo ? this.ctx.totalNumberOfRows - modulo
		                                           : 0x0000000000000000000000000000000001
		;
	},

	/*---------------------------------------------------------------------*/

	firstPage: function()
	{
		const oldStart = this.parsePageNumber(
			$(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(), this.ctx.start
		);

		const oldStop = this.parsePageNumber(
			$(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(), this.ctx.stop
		);

		const range = oldStop - oldStart + 1;

		const newStart = 0x00000000000000000000000000001;

		$(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(newStart);
		$(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(newStart + range - 1);

		return this.refresh();
	},

	/*---------------------------------------------------------------------*/

	lastPage: function()
	{
		const oldStart = this.parsePageNumber(
			$(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(), this.ctx.start
		);

		const oldStop = this.parsePageNumber(
			$(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(), this.ctx.stop
		);

		const range = oldStop - oldStart + 1;

		const newStart = this.getOffsetOfLastPage(range);

		$(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(newStart);
		$(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(newStart + range - 1);

		return this.refresh();
	},

	/*---------------------------------------------------------------------*/

	prevPage: function()
	{
		const oldStart = this.parsePageNumber(
			$(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(), this.ctx.start
		);

		const oldStop = this.parsePageNumber(
			$(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(), this.ctx.stop
		);

		const range = oldStop - oldStart + 1;

		const newStart = oldStart - range;
		const newStop = oldStop - range;

		if(newStart >= 1 && newStop >= 1)
		{
			$(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(newStart);
			$(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(newStop);
		}
		else
		{
			$(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(0x0001);
			$(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(range);
		}

		return this.refresh();
	},

	/*---------------------------------------------------------------------*/

	nextPage: function()
	{
		const oldStart = this.parsePageNumber(
			$(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(), this.ctx.start
		);

		const oldStop = this.parsePageNumber(
			$(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(), this.ctx.stop
		);

		const range = oldStop - oldStart + 1;

		const newStart = oldStart + range;
		const newStop = oldStop + range;

		if(newStart >= 1 && newStop >= 1)
		{
			$(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(newStart);
			$(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(newStop);
		}
		else
		{
			$(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(0x0001);
			$(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(range);
		}

		return this.refresh();
	},

	/*---------------------------------------------------------------------*/

	refresh: function(settings)
	{
		const result = $.Deferred();

		/*-----------------------------------------------------------------*/

		const [context] = amiWebApp.setup(['context'], [result], settings);

		/*-----------------------------------------------------------------*/

		this.ctx.command2 = this.ctx.command;

		/**/

		if(this.ctx.orderBy)
		{
			this.ctx.command2 += ' -orderBy="' + this.ctx.orderBy + '"';

			if(this.ctx.orderWay)
			{
				this.ctx.command2 += ' -orderWay="' + this.ctx.orderWay + '"';
			}
		}

		/**/

		const start = this.parsePageNumber(
			$(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(), this.ctx.start
		);

		const stop = this.parsePageNumber(
			$(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(), this.ctx.stop
		);

		this.ctx.command2 += ' -limit="' + (stop - start + 1) + '"';

		this.ctx.command2 += ' -offset="' + (0x00 + start - 1) + '"';

		/*-----------------------------------------------------------------*/

		amiCommand.execute(this.ctx.command2 + (this.ctx.enableCache ? ' -cached' : '') + (this.ctx.enableCount ? ' -count' : '')).done((data) => {

			this.ctx.fieldDescriptions = this.ctx.rowset ? amiWebApp.jspath('..fieldDescriptions{.@rowset==="' + this.ctx.rowset + '"}.fieldDescription', data)
			                                             : amiWebApp.jspath('..fieldDescription'                                                        , data)
			;

			const rowset = this.ctx.rowset ? amiWebApp.jspath('..rowset{.@type==="' + this.ctx.rowset + '"}"', data)
			                               : amiWebApp.jspath('..rowset'                                     , data)
			;

			const rows = amiWebApp.jspath('.row', rowset);

			this.ctx.sql = amiWebApp.jspath('.@sql', rowset)[0] || 'N/A';
			this.ctx.mql = amiWebApp.jspath('.@mql', rowset)[0] || 'N/A';
			this.ctx.ast = amiWebApp.jspath('.@ast', rowset)[0] || 'N/A';

			this.ctx.maxNumberOfRows = parseInt(amiWebApp.jspath('..@maxNumberOfRows', rowset)[0] || '');
			this.ctx.totalNumberOfRows = parseInt(amiWebApp.jspath('..@totalNumberOfRows', rowset)[0] || '');

			/**/

			if(this.ctx.sql === 'N/A') {
				$(this.patchId('#CD458FEC_9AD9_30E8_140F_263F119961BE')).hide();
			}
			else {
				$(this.patchId('#CD458FEC_9AD9_30E8_140F_263F119961BE')).show();
			}

			if(this.ctx.mql === 'N/A') {
				$(this.patchId('#F4F0EB6C_6535_7714_54F7_4BC28C254872')).hide();
			}
			else {
				$(this.patchId('#F4F0EB6C_6535_7714_54F7_4BC28C254872')).show();
			}

			if(this.ctx.ast === 'N/A') {
				$(this.patchId('#E2EB6136_7358_875A_2857_8766E9B3036E')).hide();
			}
			else {
				$(this.patchId('#E2EB6136_7358_875A_2857_8766E9B3036E')).show();
			}

			if(Number.isNaN(this.ctx.totalNumberOfRows)) {
				$(this.patchId('#B7979619_196F_F39D_A893_17E5EDAA8628')).prop('disabled', true);
			}
			else {
				$(this.patchId('#B7979619_196F_F39D_A893_17E5EDAA8628')).prop('disabled', false);
			}

			const dict = {
				catalog: this.ctx.catalog,
				entity: this.ctx.entity,
				primaryField: this.ctx.primaryField,
				/**/
				fieldDescriptions: this.ctx.fieldDescriptions,
				rows: rows,
				/**/
				showToolBar: this.ctx.showToolBar,
				showDetails: this.ctx.showDetails,
				showTools: this.ctx.showTools,
				/**/
				maxCellLength: this.ctx.maxCellLength,
			};

			this.replaceHTML(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61'), this.fragmentTable, {dict: dict}).done(() => {

				const parent = $(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61'));

				/*---------------------------------------------------------*/
				/* COLUMN TOOLS                                            */
				/*---------------------------------------------------------*/

				parent.find('a[data-orderway="DESC"]').click((e) => {

					e.preventDefault();

					this.ctx.orderBy = e.currentTarget.getAttribute('data-row');
					this.ctx.orderWay = 'DESC';

					this.refresh();
				});

				/*---------------------------------------------------------*/

				parent.find('a[data-orderway="ASC"]').click((e) => {

					e.preventDefault();

					this.ctx.orderBy = e.currentTarget.getAttribute('data-row');
					this.ctx.orderWay = 'ASC';

					this.refresh();
				});

				/*---------------------------------------------------------*/

				parent.find('a[data-action="refine"]').click((e) => {

					e.preventDefault();

					this.showRefineModal(
						e.currentTarget.getAttribute('data-catalog')
						,
						e.currentTarget.getAttribute('data-entity')
						,
						e.currentTarget.getAttribute('data-field')
					);
				});

				/*---------------------------------------------------------*/

				parent.find('a[data-action="stats"]').click((e) => {

					e.preventDefault();

					this.showStatsTab(
						e.currentTarget.getAttribute('data-catalog')
						,
						e.currentTarget.getAttribute('data-entity')
						,
						e.currentTarget.getAttribute('data-field')
					);
				});

				/*---------------------------------------------------------*/

				parent.find('a[data-action="group"]').click((e) => {

					e.preventDefault();

					this.showGroupTab(
						e.currentTarget.getAttribute('data-catalog')
						,
						e.currentTarget.getAttribute('data-entity')
						,
						e.currentTarget.getAttribute('data-field')
					);
				});

				/*---------------------------------------------------------*/
				/* ROW TOOLS                                               */
				/*---------------------------------------------------------*/

				parent.find('a[data-action="clone"]').click((e) => {

					e.preventDefault();

					this.showEditModal(e.currentTarget.getAttribute('data-row'));
				});

				/*---------------------------------------------------------*/

				parent.find('a[data-action="delete"]').click((e) => {

					e.preventDefault();

					this.deleteRow(e.currentTarget.getAttribute('data-row'));
				});

				/*---------------------------------------------------------*/
				/* DETAILS                                                 */
				/*---------------------------------------------------------*/

				parent.find('[data-ctrl]').click((e) => {

					e.preventDefault();

					this.createControlFromWebLink(this.getParent(), e.currentTarget, this.ctx);
				});

				/*---------------------------------------------------------*/
				/* FILTERS                                                 */
				/*---------------------------------------------------------*/

				parent.find('a[data-action="filter"]').click((e) => {

					e.preventDefault();

					const descr = e.currentTarget.getAttribute('data-filter-def').split('::');

					if(descr.length === 2) this.getOwner().refineResult('2', descr[0], descr[1]);
				});

				/*---------------------------------------------------------*/
				/* SETUP FIELD & UNIT EDITOR                               */
				/*---------------------------------------------------------*/

				this.fieldEditor.setup(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61'),
																		this.ctx.primaryField, this.ctx);
				this.unitEditor.setup(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61'));

				this.setMode();

				/*---------------------------------------------------------*/
				/* UPDATE JAVASCRIPT                                       */
				/*---------------------------------------------------------*/

				this.ctx.js = amiWebApp.formatTWIG(this.fragmentJS, this.ctx);

				/*---------------------------------------------------------*/
				/* FILL NUMBERS                                            */
				/*---------------------------------------------------------*/

				let numbers = [];

				if(!Number.isNaN(this.ctx.maxNumberOfRows)) {
					numbers.push('#max showable: ' + this.ctx.maxNumberOfRows);
				}

				if(!Number.isNaN(this.ctx.totalNumberOfRows)) {
					numbers.push('#total: ' + this.ctx.totalNumberOfRows);
				}

				if(!Number.isNaN(rows.length)) {
					numbers.push('#shown: ' + rows.length);
				}

				$(this.patchId('#C57C824B_166C_4C23_F349_8B0C8E94114A')).text(numbers.join(', '));

				/*---------------------------------------------------------*/

				result.resolveWith(context, [this.ctx.fieldDescriptions, rows, this.ctx.sql, this.ctx.mql, this.ctx.ast, this.ctx.totalNumberOfRows]);

				/*---------------------------------------------------------*/
			});

		}).fail((data, message) => {

			result.rejectWith(context, [message]);
		});

		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/

	exportResult: function(converter)
	{
		amiWebApp.lock();

		amiCommand.execute(this.ctx.command, {converter: converter}).done(function(data, message) {

			/*---------------------------------------------------------*/

			var fileMime;
			var fileName;

			/**/ if(converter === 'AMIXmlToXml.xsl')
			{
				fileMime = 'application/xml';
				fileName = 'result.xml';
			}
			else if(converter === 'AMIXmlToJson.xsl')
			{
				fileMime = 'application/json';
				fileName = 'result.json';
			}
			else if(converter === 'AMIXmlToCsv.xsl')
			{
				fileMime = 'text/csv';
				fileName = 'result.csv';
			}
			else
			{
				fileMime = 'text/plain';
				fileName = 'result.txt';
			}

			/*-------------------------------------------------------------*/

			saveAs(new Blob([data], {type: fileMime}), fileName);

			/*-------------------------------------------------------------*/

			amiWebApp.unlock();

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});
	},

	/*---------------------------------------------------------------------*/

	isInEditMode: function()
	{
		return this.fieldEditor.isInEditMode();
	},

	/*---------------------------------------------------------------------*/

	setMode: function()
	{
		const tags1 = $(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61'));
		const tags2 = $(this.patchId('#CDE5AD14_1268_8FA7_F5D8_0D690F3FB850'));

		const tags3 = tags1.find('.edit-mode');
		const tags4 = tags1.find('.view-more');

		if($(this.patchId('#DDC32238_DD25_8354_AC6C_F6E27CA6E18D')).prop('checked'))
		{
			tags2.show();
			tags3.show();
			tags4.hide();

			this.fieldEditor.setInEditMode(true);
			this.unitEditor.setInEditMode(true);
		}
		else
		{
			tags2.hide();
			tags3.hide();
			tags4.show();

			this.fieldEditor.setInEditMode(false);
			this.unitEditor.setInEditMode(false);
		}
	},

	/*---------------------------------------------------------------------*/

	showEditModal: function(primaryValue)
	{
		/*-----------------------------------------------------------------*/

		let values = {};

		if(primaryValue)
		{
			$(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61') + ' div[data-row="' + primaryValue + '"]').each((idx, val) => {

				field = $(val).attr('data-field');
				value = $(val).attr('data-val');

				values[field] = value;
			});
		}

		/*-----------------------------------------------------------------*/

		const dict = {
			values: values,
			fieldInfo: this.ctx.fieldInfo,
		};

		/*-----------------------------------------------------------------*/

		amiWebApp.replaceHTML('#F2E58136_73F5_D2E2_A0B7_2F810830AD98', this.fragmentFieldList, {dict: dict}).done(() => {

			const el1 = $('#A8572167_6898_AD6F_8EAD_9D4E2AEB3550');
			const el2 = $('#B85AC8DB_E3F9_AB6D_D51F_0B103205F2B1');

			el2.off().submit((e) => {

				e.preventDefault();

				this.appendRow();
			});

			el1.modal('show');
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	_formToArray: function()
	{
		const form = $('#B85AC8DB_E3F9_AB6D_D51F_0B103205F2B1').serializeArray();

		const fieldList = [];
		const valueList = [];

		for(let i in form)
		{
			fieldList.push(form[i].name);
			valueList.push(form[i].value);
		}

		return [
			fieldList,
			valueList,
		];
	},

	/*---------------------------------------------------------------------*/

	appendRow: function()
	{
		const result = confirm('Please confirm!');

		if(result)
		{
			amiWebApp.lock();

			amiCommand.execute(this.ctx.appendCommandFunc.apply(this, this._formToArray())).done(() => {

				$('#A8572167_6898_AD6F_8EAD_9D4E2AEB3550').modal('hide');

				this.refresh().done(() => {

					amiWebApp.unlock();

				}).fail((message) => {

					amiWebApp.error(message, true);
				});

			}).fail((data, message) => {

				amiWebApp.error(message, true, '#B4CF70FC_14C8_FC57_DEF0_05144415DB6A');
			});
		}

		return result;
	},

	/*---------------------------------------------------------------------*/

	deleteRow: function()
	{
		const result = confirm('Please confirm!');

		if(result)
		{
			amiWebApp.lock();

			amiCommand.execute(this.ctx.deleteCommandFunc.apply(this, arguments)).done(() => {

				$('#A8572167_6898_AD6F_8EAD_9D4E2AEB3550').modal('hide');

				this.refresh().done(() => {

					amiWebApp.unlock();

				}).fail((message) => {

					amiWebApp.error(message, true);
				});

			}).fail((data, message) => {

				amiWebApp.error(message, true, /*-------------*/ null /*-------------*/);
			});
		}

		return result;
	},

	/*---------------------------------------------------------------------*/

	_buildColumnName: function(catalog, entity, field)
	{
		const result = [];

		if(catalog && catalog !== 'N/A') {
			result.push('`' + catalog + '`');
		}

		if(entity && entity !== 'N/A') {
			result.push('`' + entity + '`');
		}

		if(field && field !== 'N/A') {
			result.push('`' + field + '`');
		}

		return result.join('.');
	},

	/*---------------------------------------------------------------------*/

	showRefineModal: function(catalog, entity, field)
	{
		/*-----------------------------------------------------------------*/

		const isMQL = this.ctx.mql && this.ctx.mql !== 'N/A';

		const regions = xqlGetRegions(isMQL ? this.ctx.mql : this.ctx.sql, this.ctx.fieldDescriptions, isMQL);

		const column = this._buildColumnName(regions['ALIASES'][field].catalog, regions['ALIASES'][field].tableAlias, regions['ALIASES'][field].field);

		/*-----------------------------------------------------------------*/

		const el1 = $('#C48564EA_A64D_98BA_6232_D03D524CAD08');
		const el2 = $('#F114E547_5E78_72D9_BB7F_355CDBB3D03A');

		el1.find('#E7014B57_B16A_7593_FA1B_0DD15C15AC3E').text(column);
		el1.find('#F3A040E1_40EE_97B3_45D6_E7BFB61DBF44').val(column);

		el1.find('#CAF8B5EB_1796_3837_5722_3B5B2A7C729B').hide();
		el1.find('#A24427DD_0DCB_3AC8_4A3E_A75D79FAA8F7').hide();

		el1.find('form')[0].reset();

		el2.off().submit((e) => {

			e.preventDefault();

			this.refineResult();
		});

		el1.modal('show');

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	refineResult: function(_filter, _x, _y)
	{
		/*-----------------------------------------------------------------*/

		const el1 = $('#C48564EA_A64D_98BA_6232_D03D524CAD08');
		const el2 = $('#F114E547_5E78_72D9_BB7F_355CDBB3D03A');

		const filter = _filter || el2.find('select[name="filter"]').val();

		let x = _x || el2.find('input[name="x"]').val();
		let y = _y || el2.find('input[name="y"]').val();

		let y1 = el2.find('input[name="y1"]').val();
		let y2 = el2.find('input[name="y2"]').val();

		y = y.replace(/'/g, '\'\'');
		y1 = y1.replace(/'/g, '\'\'');
		y2 = y2.replace(/'/g, '\'\'');

		/*-----------------------------------------------------------------*/

		let cond;

		switch(filter)
		{
			case '0':
				cond = x + ' IS NULL';
				break;

			case '1':
				cond = x + ' IS NOT NULL';
				break;

			case '2':
				cond = x + ' = \'' + y + '\'';
				break;

			case '3':
				cond = x + ' != \'' + y + '\'';
				break;

			case '4':
				cond = x + ' LIKE \'' + y + '\'';
				break;

			case '5':
				cond = x + ' NOT LIKE \'' + y + '\'';
				break;

			case '6':
				cond = x + ' < \'' + y + '\'';
				break;

			case '7':
				cond = x + ' <= \'' + y + '\'';
				break;

			case '8':
				cond = x + ' > \'' + y + '\'';
				break;

			case '9':
				cond = x + ' >= \'' + y + '\'';
				break;

			case '10':
				cond = x + ' BETWEEN \'' + y1 + '\' AND \'' + y2 + '\'';
				break;

			case '11':
				cond = x + ' NOT BETWEEN \'' + y1 + '\' AND \'' + y2 + '\'';
				break;

			default:
				return;
		}

		/*-----------------------------------------------------------------*/

		el1.modal('hide');

		/*-----------------------------------------------------------------*/

		const isMQL = this.ctx.mql && this.ctx.mql !== 'N/A';

		const regions = xqlGetRegions(isMQL ? this.ctx.mql : this.ctx.sql, this.ctx.fieldDescriptions, isMQL);

		/*-----------------------------------------------------------------*/

		if(regions['WHERE'])
		{
			regions['WHERE'] += ' AND ' + cond;
		}
		else
		{
			regions['WHERE'] = cond;
		}

		/*-----------------------------------------------------------------*/

		const xql = [];

		if(regions['SELECT']) {
			xql.push('SELECT ' + regions['SELECT']);
		}

		if(regions['FROM']) {
			xql.push('FROM ' + regions['FROM']);
		}

		if(regions['WHERE']) {
			xql.push('WHERE ' + regions['WHERE']);
		}

		/*-----------------------------------------------------------------*/

		const command = 'BrowseQuery -catalog="' + amiWebApp.textToString(this.ctx.catalog) + '" -entity="' + amiWebApp.textToString(this.ctx.entity) + '" -' + (isMQL ? 'mql' : 'sql') + '="' + amiWebApp.textToString(xql.join(' ')) + '"';

		amiWebApp.createControlInContainer(this.getParent(), this, 'table', [command], {}, this.ctx, 'table', this.ctx.entity);

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	showStatsTab: function(catalog, entity, field)
	{
		/*-----------------------------------------------------------------*/

		const isMQL = this.ctx.mql && this.ctx.mql !== 'N/A';

		const regions = xqlGetRegions(isMQL ? this.ctx.mql : this.ctx.sql, this.ctx.fieldDescriptions, isMQL);

		const columnName = this._buildColumnName(regions['ALIASES'][field].catalog, regions['ALIASES'][field].tableAlias, regions['ALIASES'][field].field);

		/*-----------------------------------------------------------------*/

		regions['SELECT'] = '\'' + columnName.replace(/'/g, '\'\'') + '\' AS `field`'
		                    + ', ' +
		                    'MIN(' + columnName + ') AS `min`'
		                    + ', ' +
		                    'MAX(' + columnName + ') AS `max`'
		                    + ', ' +
		                    'SUM(' + columnName + ') AS `sum`'
		                    + ', ' +
		                    'AVG(' + columnName + ') AS `avg`'
		                    + ', ' +
		                    'STDDEV(' + columnName + ') AS `stddev`'
		                    + ', ' +
		                    'COUNT(' + columnName + ') AS `count`'
		;

		/*-----------------------------------------------------------------*/

		const xql = [];

		if(regions['SELECT']) {
			xql.push('SELECT ' + regions['SELECT']);
		}

		if(regions['FROM']) {
			xql.push('FROM ' + regions['FROM']);
		}

		if(regions['WHERE']) {
			xql.push('WHERE ' + regions['WHERE']);
		}

		/*-----------------------------------------------------------------*/

		const command = 'BrowseQuery -catalog="' + amiWebApp.textToString(this.ctx.catalog) + '" -entity="' + amiWebApp.textToString(this.ctx.entity) + '" -' + (isMQL ? 'mql' : 'sql') + '="' + amiWebApp.textToString(xql.join(' ')) + '"';

		amiWebApp.createControlInContainer(this.getParent(), this, 'table', [command], {orderBy: '', orderWay: '', showDetails: false}, this.ctx, 'bar-chart', this.ctx.entity);

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	showGroupTab: function(catalog, entity, field)
	{
		/*-----------------------------------------------------------------*/

		const isMQL = this.ctx.mql && this.ctx.mql !== 'N/A';

		const regions = xqlGetRegions(isMQL ? this.ctx.mql : this.ctx.sql, this.ctx.fieldDescriptions, isMQL);

		const columnName = this._buildColumnName(regions['ALIASES'][field].catalog, regions['ALIASES'][field].tableAlias, regions['ALIASES'][field].field);

		/*-----------------------------------------------------------------*/

		regions['SELECT'] = columnName
				+ ', count(*) AS `total`, CONCAT(\'@OWNER::' + columnName + '::\', ' + columnName + ') AS `go`';
		regions['GROUP'] = columnName;

		/*-----------------------------------------------------------------*/

		const xql = [];

		if(regions['SELECT']) {
			xql.push('SELECT ' + regions['SELECT']);
		}

		if(regions['FROM']) {
			xql.push('FROM ' + regions['FROM']);
		}

		if(regions['WHERE']) {
			xql.push('WHERE ' + regions['WHERE']);
		}

		if(regions['GROUP']) {
			xql.push('GROUP BY ' + regions['GROUP'].replace(entity, regions['ALIASES'][field].tableAlias));
		}

		/*-----------------------------------------------------------------*/

		const command = 'BrowseQuery -catalog="' + amiWebApp.textToString(this.ctx.catalog) + '" -entity="' + amiWebApp.textToString(this.ctx.entity) + '" -' + (isMQL ? 'mql' : 'sql') + '="' + amiWebApp.textToString(xql.join(' ')) + '"';

		amiWebApp.createControlInContainer(this.getParent(), this, 'table', [command], {orderBy: columnName, orderWay: 'ASC', showDetails: false}, this.ctx, 'slack', this.ctx.entity);

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
