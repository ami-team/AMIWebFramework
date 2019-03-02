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
			amiWebApp.originURL + '/controls/Table/twig/editModal.twig',
			amiWebApp.originURL + '/controls/Table/twig/addModal.twig',
			/**/
			amiWebApp.originURL + '/controls/Table/twig/fieldList.twig',
			amiWebApp.originURL + '/controls/Table/twig/table.twig',
			amiWebApp.originURL + '/controls/Table/twig/js.twig',
			/**/
			amiWebApp.originURL + '/controls/Table/js/libunits.js',
			amiWebApp.originURL + '/controls/Table/js/libxql.js',
		]).done((data) => {

			amiWebApp.appendHTML('body', data[1]).done(() => {
				amiWebApp.appendHTML('body', data[2]).done(() => {
					amiWebApp.appendHTML('body', data[3]).done(() => {

						this.fragmentTableCtrl = data[0];
						this.fragmentFieldList = data[4];
						this.fragmentTable = data[5];
						this.fragmentJS = data[6];
					});
				});
			});
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	render: function(selector, command, settings)
	{
		this.settings = settings;

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

			inEditMode: false,
		};

		const fn1 = (fields, values) => 'AddElement -catalog="' + this.ctx.catalog + '" -entity="' + this.ctx.entity + '" -separator="§" -fields="' + amiWebApp.textToString(fields.join('§')) + '" -values="' + amiWebApp.textToString(values.join('§')) + '"';

		const fn2 = (primaryValue) => 'RemoveElements -catalog="' + this.ctx.catalog + '" -entity="' + this.ctx.entity + '" -separator="§" -keyFields="' + this.ctx.primaryField + '" -keyValues="' + amiWebApp.textToString(primaryValue) + '"';

		const fn3 = (catalog, entity, field, primaryValue, value) => 'UpdateElements -catalog="' + catalog + '" -entity="' + entity + '" -fields="' + field + '" -values="' + amiWebApp.textToString(value) + '" -keyFields="' + this.ctx.primaryField + '" -keyValues="' + amiWebApp.textToString(primaryValue) + '"';

		const [
			_appendCommandFunc, _deleteCommandFunc, _editCommandFunc,
			_enableCache, _showToolBar, _showDetails, _showTools, _canEdit,
			_catalog, _entity, _primaryField, _rowset,
			_start, _stop, _orderBy, _orderWay
		] = amiWebApp.setup(
			[
				'appendCommandFunc', 'deleteCommandFunc', 'editCommandFunc',
				'enableCache', 'showToolBar', 'showDetails', 'showTools', 'canEdit',
				'catalog', 'entity', 'primaryField', 'rowset',
				'start', 'stop', 'orderBy', 'orderWay',
			],
			[
				fn1, fn2, fn3,
				false, true, false, true, false,
				'', '', '', '',
				1, 10, '', '',
			],
			settings
		);

		this.ctx.appendCommandFunc = _appendCommandFunc;
		this.ctx.deleteCommandFunc = _deleteCommandFunc;
		this.ctx.editCommandFunc = _editCommandFunc;

		this.ctx.enableCache = _enableCache;
		this.ctx.showToolBar = _showToolBar;
		this.ctx.showDetails = _showDetails;
		this.ctx.showTools = _showTools;
		this.ctx.canEdit = _canEdit;

		this.ctx.catalog = _catalog;
		this.ctx.entity = _entity;
		this.ctx.primaryField = _primaryField;
		this.ctx.rowset = _rowset;

		this.ctx.start = _start;
		this.ctx.stop = _stop;
		this.ctx.orderBy = _orderBy;
		this.ctx.orderWay = _orderWay;

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

				const rows = amiWebApp.jspath('..row', data);

				for(let i in rows)
				{
					const field = amiWebApp.jspath('..field{.@name==="name"}.$', rows[i])[0] || '';
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

				this._render(selector);

			}).fail(() => {

				if(/*----*/ true /*----*/)
				{
					this.ctx.showDetails = false;
					this.ctx.showTools = false;
					this.ctx.canEdit = false;
				}

				this._render(selector);
			});
		}
		else
		{
			this._render(selector);
		}

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	_render: function(selector)
	{
		/*-----------------------------------------------------------------*/

		this.replaceHTML(selector, this.fragmentTableCtrl, {dict: this.ctx}).done(() => {

			/*-------------------------------------------------------------*/

			$(this.patchId('#BB126294_FFC2_24B8_8765_CF653EB950F7')).click(() => {

				this.prev();
			});

			$(this.patchId('#E7FDF4C8_ECD2_3FE0_8C75_541E511239C2')).click(() => {

				this.next();
			});

			$(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).keypress((e) => {

				if(e.keyCode == 13)
				{
					this.refresh();
				}
			});

			$(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).keypress((e) => {

				if(e.keyCode == 13)
				{
					this.refresh();
				}
			});

			$(this.patchId('#D809166F_A40B_2376_C8A5_977AA0C8C408')).click(() => {

				this.refresh();
			});

			/*-------------------------------------------------------------*/

			$(this.patchId('#DDC32238_DD25_8354_AC6C_F6E27CA6E18D')).change(() => {

				this.setMode();
			});

			$(this.patchId('#CDE5AD14_1268_8FA7_F5D8_0D690F3FB850')).click(() => {

				this.showEditModal();
			});

			/*-------------------------------------------------------------*/

			$(this.patchId('#F4F0EB6C_6535_7714_54F7_4BC28C254872')).click(() => {

				amiWebApp.createControl(this.getParent(), this, 'messageBox', [this.ctx.mql], {});
			});

			$(this.patchId('#CD458FEC_9AD9_30E8_140F_263F119961BE')).click(() => {

				amiWebApp.createControl(this.getParent(), this, 'messageBox', [this.ctx.sql], {});
			});

			$(this.patchId('#D49853E2_9319_52C3_5253_A208F9500408')).click(() => {

				amiWebApp.createControl(this.getParent(), this, 'messageBox', [this.ctx.command], {});
			});

			$(this.patchId('#C50C3427_FEE5_F115_1FEC_6A6668763EC4')).click(() => {

				amiWebApp.createControl(this.getParent(), this, 'textBox', [this.ctx.js], {});
			});

			/*-------------------------------------------------------------*/

			this.refresh();

			/*-------------------------------------------------------------*/
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	checkPageNumber: function(_x, _default) { return isNaN(_x) === false && _x > 0 ? _x : _default; },

	/*---------------------------------------------------------------------*/

	prev: function()
	{
		const oldStart = this.checkPageNumber(
			parseInt($(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val()), this.ctx.start
		);

		const oldStop = this.checkPageNumber(
			parseInt($(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val()), this.ctx.stop
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

		this.refresh();
	},

	/*---------------------------------------------------------------------*/

	next: function()
	{
		const oldStart = this.checkPageNumber(
			parseInt($(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val()), this.ctx.start
		);

		const oldStop = this.checkPageNumber(
			parseInt($(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val()), this.ctx.stop
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

		this.refresh();
	},

	/*---------------------------------------------------------------------*/

	refresh: function()
	{
		/*-----------------------------------------------------------------*/

		let command = this.ctx.command;

		/*-----------------------------------------------------------------*/

		if(this.ctx.orderBy)
		{
			command += ' -orderBy="' + this.ctx.orderBy + '"';

			if(this.ctx.orderWay)
			{
				command += ' -orderWay="' + this.ctx.orderWay + '"';
			}
		}

		/*-----------------------------------------------------------------*/

		const start = this.checkPageNumber(
			parseInt($(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val()), this.ctx.start
		);

		const stop = this.checkPageNumber(
			parseInt($(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val()), this.ctx.stop
		);

		command += ' -limit="' + (stop - start + 1) + '"';

		command += ' -offset="' + (0x00 + start - 1) + '"';

		if(this.ctx.enableCache)
		{
			command += ' -cached';
		}

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.execute(command).done((data) => {

			this.ctx.fieldDescriptions = this.ctx.rowset ? amiWebApp.jspath('..fieldDescriptions{.@rowset==="' + this.ctx.rowset + '"}.fieldDescription', data)
			                                             : amiWebApp.jspath('..fieldDescription'                                                        , data)
			;

			const rowset = this.ctx.rowset ? amiWebApp.jspath('..rowset{.@type==="' + this.ctx.rowset + '"}"', data)
			                               : amiWebApp.jspath('..rowset'                                     , data)
			;

			const rows = amiWebApp.jspath('..row', rowset);

			this.ctx.sql = amiWebApp.jspath('..@sql', rowset)[0] || 'N/A';
			this.ctx.mql = amiWebApp.jspath('..@mql', rowset)[0] || 'N/A';
			this.ctx.ast = amiWebApp.jspath('..@ast', rowset)[0] || 'N/A';

			const totalResults = amiWebApp.jspath('..@totalResults', rowset)[0] || 'N/A';

			/**/

			if(this.sql === 'N/A') {
				$(this.patchId('#CD458FEC_9AD9_30E8_140F_263F119961BE')).hide();
			}
			else {
				$(this.patchId('#CD458FEC_9AD9_30E8_140F_263F119961BE')).show();
			}

			if(this.mql === 'N/A') {
				$(this.patchId('#F4F0EB6C_6535_7714_54F7_4BC28C254872')).hide();
			}
			else {
				$(this.patchId('#F4F0EB6C_6535_7714_54F7_4BC28C254872')).show();
			}

			const dict = {
				fieldDescriptions: this.ctx.fieldDescriptions,
				rows: rows,
				showDetails: this.ctx.showDetails,
				showTools: this.ctx.showTools,
			};

			this.replaceHTML(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61'), this.fragmentTable, {dict: dict}).done(() => {

				const parent = $(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61'));

				/*---------------------------------------------------------*/
				/* TOOLS                                                   */
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
				/*---------------------------------------------------------*/

				parent.find('div[data-action="edit"]').click((e) => {

					this.editRow(
						e.currentTarget.getAttribute('data-catalog')
						,
						e.currentTarget.getAttribute('data-entity')
						,
						e.currentTarget.getAttribute('data-field')
						,
						e.currentTarget.getAttribute('data-type')
						,
						e.currentTarget.getAttribute('data-row')
						,
						e.currentTarget.innerText
					);
				});

				/*---------------------------------------------------------*/
				/*---------------------------------------------------------*/

				parent.find('a[data-ctrl]').click((e) => {

					e.preventDefault();

					this.createControlFromWebLink(this.getParent(), e.currentTarget, this.settings);
				});

				/*---------------------------------------------------------*/
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
				/*---------------------------------------------------------*/

				parent.find('a[data-action="filter"]').click((e) => {

					e.preventDefault();

					const descr = e.currentTarget.getAttribute('data-filter-def').split('::');

					if(descr.length === 2) this.getOwner().refineResult('2', descr[0], descr[1]);
				});

				/*---------------------------------------------------------*/
				/* UPDATE JAVASCRIPT                                       */
				/*---------------------------------------------------------*/

				this.ctx.js = amiWebApp.formatTWIG(this.fragmentJS, this.ctx);

				/*---------------------------------------------------------*/
				/* TOOLTIP CONTENT                                         */
				/*---------------------------------------------------------*/

				const title = this.ctx.catalog + '::' + this.ctx.entity + '<br />#shown:&nbsp;' + rows.length + ', #total:&nbsp;' + (totalResults !== 'N/A' ? totalResults : rows.length);

				$(this.patchId('#C57C824B_166C_4C23_F349_8B0C8E94114A')).data('tooltip', false).tooltip({
					placement: 'bottom',
					title: title,
					html: true,
				});

				/*---------------------------------------------------------*/
				/* VIEW MODE                                               */
				/*---------------------------------------------------------*/

				this.setMode();

				/*---------------------------------------------------------*/

				amiWebApp.unlock();

				/*---------------------------------------------------------*/
			});

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	isInEditMode: function()
	{
		return this.ctx.inEditMode;
	},

	/*---------------------------------------------------------------------*/

	setMode: function()
	{
		const tags1 = $(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61')
																+ ' .edit-mode');
		const tags2 = $(this.patchId('#CDE5AD14_1268_8FA7_F5D8_0D690F3FB850'));

		if($(this.patchId('#DDC32238_DD25_8354_AC6C_F6E27CA6E18D')).prop('checked'))
		{
			if(this.ctx.fieldInfo.length > 0)
			{
				tags1.show();
				tags2.show();
			}

			this.ctx.inEditMode = true;
		}
		else
		{
			if(/*--------*/ true /*--------*/)
			{
				tags1.hide();
				tags2.hide();
			}

			this.ctx.inEditMode = false;
		}
	},

	/*---------------------------------------------------------------------*/

	textRegex: /^.*(?:TEXT).*$/,
	numberRegex: /^.*(?:BIT|INT|FLOAT|DOUBLE|SERIAL|DECIMAL|NUMERIC).*$/,
	dateRegex: /^.*(?:DATE|TIME).*$/,

	/*---------------------------------------------------------------------*/

	editRow: function(catalog, entity, field, type, primaryValue, value)
	{
		if(this.ctx.inEditMode)
		{
			/*-------------------------------------------------------------*/

			$('#D3CE601F_C7BA_5C8E_2564_491FED4C5D6F').text('Field `' + field + '` for `' + catalog + '`.`' + entity + '`.`' + this.ctx.primaryField + '` = ' + primaryValue);

			/*-------------------------------------------------------------*/

			$('#E2E8670D_2BAE_B181_79E5_C8A170BD3981')[0].reset(/*--*/);

			/*-------------------------------------------------------------*/

			type = type.toUpperCase();

			/**/ if(value === '@NULL')
			{
				$('#A70927B4_918F_07BC_2C91_B48CFCB812C6').collapse('show');

				$('#EDD0ABD2_4AF8_4F27_AECD_D537F2695E67 input').val(value);
			}
			else if(type.match(this.textRegex))
			{
				$('#EDD0ABD2_4AF8_4F27_AECD_D537F2695E67').collapse('show');

				$('#EDD0ABD2_4AF8_4F27_AECD_D537F2695E67 textarea').val(value);
			}
			else if(type.match(this.numberRegex))
			{
				$('#D20E11D2_1E45_B4B7_219A_9D9F490666D4').collapse('show');

				$('#D20E11D2_1E45_B4B7_219A_9D9F490666D4 input').val(value);
			}
			else if(type.match(this.dateRegex))
			{
				$('#F0389A55_B680_9D33_8D06_3D51CF4A3934').collapse('show');

				$('#F0389A55_B680_9D33_8D06_3D51CF4A3934 input').val(value);
			}
			else /*-----------------------*/
			{
				$('#D22BDDA1_B582_6958_2EED_701D853D3B4D').collapse('show');

				$('#D22BDDA1_B582_6958_2EED_701D853D3B4D input').val(value);
			}

			/*-------------------------------------------------------------*/

			$('#E2E8670D_2BAE_B181_79E5_C8A170BD3981').off().on('submit', (e) => {

				e.preventDefault();

				this.changeRow(catalog, entity, field, primaryValue, $('#A4A7E040_7F01_C1BD_7180_2327E5244805 .show').find('input, textarea').val());
			});

			/*-------------------------------------------------------------*/

			$('#F44687A3_036C_9C77_3284_DD495D9F4D7D').modal('show');

			/*-------------------------------------------------------------*/
		}
	},

	/*---------------------------------------------------------------------*/

	changeRow: function(catalog, entity, field, primaryValue, value)
	{
		amiCommand.execute(this.ctx.editCommandFunc(catalog, entity, field, primaryValue, value)).done((data, message) => {

			amiWebApp.success(message, true);

			$('#F44687A3_036C_9C77_3284_DD495D9F4D7D').modal('hide');

			this.refresh();

		}).fail((data, message) => {

			amiWebApp.error(message, true);

			$('#F44687A3_036C_9C77_3284_DD495D9F4D7D').modal('hide');

			////.refresh();
		});
	},

	/*---------------------------------------------------------------------*/

	showEditModal: function(primaryValue)
	{
		/*-----------------------------------------------------------------*/

		let values = {};

		if(primaryValue)
		{
			$(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61') + ' div[data-row="' + primaryValue + '"]').each(() => {

				field = $(this).attr('data-field');
				value = $(this).text(/*--------*/);

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

	/*-----------------------------------------------------------------*/

	_formToArray: function()
	{
		const form = $('#B85AC8DB_E3F9_AB6D_D51F_0B103205F2B1').serializeArray();

		const fieldList = [];
		const valueList = [];

		for(var i in form)
		{
			fieldList.push(form[i].name);
			valueList.push(form[i].value);
		}

		return [
			fieldList,
			valueList,
		];
	},

	/*-----------------------------------------------------------------*/

	appendRow: function()
	{
		const result = confirm('Please confirm!');

		if(result)
		{
			amiWebApp.lock();

			amiCommand.execute(this.ctx.appendCommandFunc.apply(this, this._formToArray())).done(() => {

				$('#A8572167_6898_AD6F_8EAD_9D4E2AEB3550').modal('hide');

				this.refresh();

			}).fail((data, message) => {

				amiWebApp.error(message, true, '#B4CF70FC_14C8_FC57_DEF0_05144415DB6A');
			});
		}

		return result;
	},

	/*-----------------------------------------------------------------*/

	deleteRow: function()
	{
		const result = confirm('Please confirm!');

		if(result)
		{
			amiWebApp.lock();

			amiCommand.execute(this.ctx.deleteCommandFunc.apply(this, arguments)).done(() => {

				$('#A8572167_6898_AD6F_8EAD_9D4E2AEB3550').modal('hide');

				this.refresh();

			}).fail((data, message) => {

				amiWebApp.error(message, true, /*-------------*/ null /*-------------*/);
			});
		}

		return result;
	},

	/*-----------------------------------------------------------------*/

	_buildColumnName: function(catalog, entity, field)
	{
		var result = [];

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

	/*-----------------------------------------------------------------*/

	showRefineModal: function(catalog, entity, field)
	{
		/*---------------------------------------------------------*/

		//!WARNING
		var regions = xqlGetRegions(this.ctx.mql && this.ctx.mql !== 'N/A' ? this.ctx.mql : this.ctx.sql, this.ctx.fieldDescriptions);

		var aliases = regions['ALIASES'];

		var column;

		column = this._buildColumnName('N/A', aliases[field].tableAlias, aliases[field].field);

		/*---------------------------------------------------------*/

		var el1 = $('#C48564EA_A64D_98BA_6232_D03D524CAD08');
		var el2 = $('#F114E547_5E78_72D9_BB7F_355CDBB3D03A');

		el1.find('#E7014B57_B16A_7593_FA1B_0DD15C15AC3E').text(column);
		el1.find('#F3A040E1_40EE_97B3_45D6_E7BFB61DBF44').val(column);

		el1.find('#CAF8B5EB_1796_3837_5722_3B5B2A7C729B').hide();
		el1.find('#A24427DD_0DCB_3AC8_4A3E_A75D79FAA8F7').hide();

		el1.find('form')[0].reset();

		var that = this;

		el2.off().submit(function(e) {

			e.preventDefault();

			that.refineResult();
		});

		el1.modal('show');
	},

	/*-----------------------------------------------------------------*/

	hideRefineModal: function()
	{
		/*---------------------------------------------------------*/

		var column = /*-----------------*/''/*-----------------*/;

		/*---------------------------------------------------------*/

		var el1 = $('#C48564EA_A64D_98BA_6232_D03D524CAD08');
		var el2 = $('#F114E547_5E78_72D9_BB7F_355CDBB3D03A');

		el1.find('#E7014B57_B16A_7593_FA1B_0DD15C15AC3E').text(column);
		el1.find('#F3A040E1_40EE_97B3_45D6_E7BFB61DBF44').val(column);

		el1.find('#CAF8B5EB_1796_3837_5722_3B5B2A7C729B').hide();
		el1.find('#A24427DD_0DCB_3AC8_4A3E_A75D79FAA8F7').hide();

		el1.find('form')[0].reset();

		var that = this;

		el2.off().submit(function(e) {

			e.preventDefault();

			/* DO NOTHING */
		});

		el1.modal('hide');
	},

	/*-----------------------------------------------------------------*/

	refineResult: function(_filter, _x, _y)
	{
		/*---------------------------------------------------------*/

		var el = $('#F114E547_5E78_72D9_BB7F_355CDBB3D03A');

		var filter = _filter || el.find('select[name="filter"]').val();

		var x = _x || el.find('input[name="x"]').val();

		var y = _y || el.find('input[name="y"]').val();
		var y1 = el.find('input[name="y1"]').val();
		var y2 = el.find('input[name="y2"]').val();

		y = y.replace(/'/g, '\'\'');
		y1 = y1.replace(/'/g, '\'\'');
		y2 = y2.replace(/'/g, '\'\'');

		/*---------------------------------------------------------*/

		var cond;

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

		/*---------------------------------------------------------*/

		this.hideRefineModal();

		/*---------------------------------------------------------*/

		var regions = xqlGetRegions(this.ctx.mql && this.ctx.mql !== 'N/A' ? this.ctx.mql : this.ctx.sql, this.ctx.fieldDescriptions);

		/*---------------------------------------------------------*/

		if(regions['WHERE'])
		{
			regions['WHERE'] += ' AND ' + cond;
		}
		else
		{
			regions['WHERE'] = cond;
		}

		/*---------------------------------------------------------*/

		var xql = [];

		if(regions['SELECT']) {
			xql.push('SELECT ' + regions['SELECT']);
		}

		if(regions['FROM']) {
			xql.push('FROM ' + regions['FROM']);
		}

		if(regions['WHERE']) {
			xql.push('WHERE ' + regions['WHERE']);
		}

		/*---------------------------------------------------------*/

		var command = 'SearchQuery -catalog="' + amiWebApp.textToString(this.ctx.catalog) + '" -entity="' + amiWebApp.textToString(this.ctx.entity) + '" -' + (regions['FROM'] ? 'sql' : 'mql') + '="' + amiWebApp.textToString(xql.join(' ')) + '"';

		/*---------------------------------------------------------*/

		amiWebApp.createControlInContainer(this.getParent(), this, 'table', [command], {}, this.settings, 'table', this.ctx.entity);

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	showStatsTab: function(catalog, entity, field)
	{
		/*---------------------------------------------------------*/

		var regions = xqlGetRegions(this.ctx.mql && this.ctx.mql !== 'N/A' ? this.ctx.mql : this.ctx.sql, this.ctx.fieldDescriptions);

		var aliases = regions['ALIASES'];

		/*---------------------------------------------------------*/

		var columnName = this._buildColumnName('N/A', aliases[field].tableAlias, aliases[field].field);
		var columnNAME = this._buildColumnName(catalog, aliases[field].tableAlias, aliases[field].field);

		regions['SELECT'] = '\'' + columnNAME.replace(/'/g, '\'\'') + '\' AS `field`'
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

		/*---------------------------------------------------------*/

		var xql = [];

		if(regions['SELECT']) {
			xql.push('SELECT ' + regions['SELECT']);
		}

		if(regions['FROM']) {
			xql.push('FROM ' + regions['FROM']);
		}

		if(regions['WHERE']) {
			xql.push('WHERE ' + regions['WHERE']);
		}

		/*---------------------------------------------------------*/

		var command = 'SearchQuery -catalog="' + amiWebApp.textToString(this.ctx.catalog) + '" -entity="' + amiWebApp.textToString(this.ctx.entity) + '" -' + (regions['FROM'] ? 'sql' : 'mql') + '="' + amiWebApp.textToString(xql.join(' ')) + '"';

		/*---------------------------------------------------------*/

		amiWebApp.createControlInContainer(this.getParent(), this, 'table', [command], {orderBy: '', showDetails: false}, this.settings, 'bar-chart', this.ctx.entity);

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	showGroupTab: function(catalog, entity, field)
	{
		/*---------------------------------------------------------*/

		var regions = xqlGetRegions(this.ctx.mql && this.ctx.mql !== 'N/A' ? this.ctx.mql : this.ctx.sql, this.ctx.fieldDescriptions);

		var aliases = regions['ALIASES'];

		/*---------------------------------------------------------*/

		var columnName = this._buildColumnName('N/A', aliases[field].tableAlias, aliases[field].field);

		regions['SELECT'] = columnName
				+ ', count(*) AS `total`, CONCAT(\'@owner::' + columnName + '::\', ' + columnName + ') AS `go`';
		regions['GROUP'] = columnName;

		/*---------------------------------------------------------*/

		var xql = [];

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
			xql.push('GROUP BY ' + regions['GROUP'].replace(entity, aliases[field].tableAlias));
		}

		/*---------------------------------------------------------*/

		var command = 'SearchQuery -catalog="' + amiWebApp.textToString(this.ctx.catalog) + '" -entity="' + amiWebApp.textToString(this.ctx.entity) + '" -' + (regions['FROM'] ? 'sql' : 'mql') + '="' + amiWebApp.textToString(xql.join(' ')) + '"';

		/*---------------------------------------------------------*/

		amiWebApp.createControlInContainer(this.getParent(), this, 'table', [command], {orderBy: columnName, showDetails: false}, this.settings, 'slack', this.ctx.entity);

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
