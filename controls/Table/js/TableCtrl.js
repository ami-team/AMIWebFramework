/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/

$AMIClass('TableCtrl', {
	/*-----------------------------------------------------------------*/

	$extends: ami.Control,

	/*-----------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);
	},

	/*-----------------------------------------------------------------*/

	onReady: function()
	{
		/*---------------------------------------------------------*/

		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/Table/twig/TableCtrl.twig',
			amiWebApp.originURL + '/controls/Table/twig/refineModal.twig',
			amiWebApp.originURL + '/controls/Table/twig/editModal.twig',
			amiWebApp.originURL + '/controls/Table/twig/fieldList.twig',
			amiWebApp.originURL + '/controls/Table/twig/table.twig',
			amiWebApp.originURL + '/controls/Table/twig/js.twig',
			/**/
			amiWebApp.originURL + '/controls/Table/js/libunits.js',
			amiWebApp.originURL + '/controls/Table/js/libxql.js',
			/**/
			'ctrl:elementInfo',
			'ctrl:messageBox',
			'ctrl:textBox',
		], {context: this}).done(function(data) {

			amiWebApp.appendHTML('body', data[1], {context: this}).done(function() {
				amiWebApp.appendHTML('body', data[2], {context: this}).done(function() {

					this.fragmentTableCtrl = data[0];
					this.fragmentFieldList = data[3];
					this.fragmentTable = data[4];
					this.fragmentJS = data[5];

					this.elementInfoCtor = data[8];
					this.messageBox = new data[9];
					this.textBox = new data[10];
				});
			});
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	render: function(selector, command, settings)
	{
		this.ctx = {
			isEmbedded: amiWebApp.isEmbedded(),

			endpoint: amiCommand.endpoint,

			command: command.trim(),

			/**/

			appendCommandFunc: function(fields, values) {

				return 'AddElement -catalog="' + this.ctx.catalog + '" -entity="' + this.ctx.entity + '" -separator="§" -fields="' + amiWebApp.textToString(fields.join('§')) + '" -values="' + amiWebApp.textToString(values.join('§')) + '"';
			},

			updateCommandFunc: function(primaryValue, field, value) {

				return 'UpdateElements -catalog="' + this.ctx.catalog + '" -entity="' + this.ctx.entity + '" -separator="§" -keyFields="' + amiWebApp.textToString(this.ctx.primaryField) + '" -keyValues="' + amiWebApp.textToString(primaryValue) + '" -fields="' + amiWebApp.textToString(field) + '" -values="' + amiWebApp.textToString(value) + '"';
			},

			deleteCommandFunc: function(primaryValue) {
		
				return 'RemoveElements -catalog="' + this.ctx.catalog + '" -entity="' + this.ctx.entity + '" -separator="§" -keyFields="' + amiWebApp.textToString(this.ctx.primaryField) + '" -keyValues="' + amiWebApp.textToString(primaryValue) + '"';
			},

			/**/

			enableCache: false,
			showDetails: false,
			showTools: true,
			canEdit: false,

			catalog: '',
			entity: '',
			primaryField: '',
			rowset: '',

			defaultFields: [],
			defaultValues: [],
			defaultTypes: [],

			start: 0x01,
			stop: 0x0A,
			orderBy: '',
			orderWay: '',
		};

		if(settings)
		{
			if('appendCommandFunc' in settings) {
				this.ctx.appendCommandFunc = settings['appendCommandFunc'];
			}

			if('updateCommandFunc' in settings) {
				this.ctx.updateCommandFunc = settings['updateCommandFunc'];
			}

			if('deleteCommandFunc' in settings) {
				this.ctx.deleteCommandFunc = settings['deleteCommandFunc'];
			}

			/**/

			if('enableCache' in settings) {
				this.ctx.enableCache = settings['enableCache'];
			}

			if('showDetails' in settings) {
				this.ctx.showDetails = settings['showDetails'];
			}

			if('showTools' in settings) {
				this.ctx.showTools = settings['showTools'];
			}

			if('canEdit' in settings) {
				this.ctx.canEdit = settings['canEdit'];
			}

			/**/

			if('catalog' in settings) {
				this.ctx.catalog = settings['catalog'];
			}

			if('entity' in settings) {
				this.ctx.entity = settings['entity'];
			}

			if('primaryField' in settings) {
				this.ctx.primaryField = settings['primaryField'];
			}

			if('rowset' in settings) {
				this.ctx.rowset = settings['rowset'];
			}

			/**/

			if('defaultFields' in settings) {
				this.ctx.defaultFields = settings['defaultFields'];
			}

			if('defaultValues' in settings) {
				this.ctx.defaultValues = settings['defaultValues'];
			}

			if('defaultTypes' in settings) {
				this.ctx.defaultTypes = settings['defaultTypes'];
			}

			/**/

			if('start' in settings) {
				this.ctx.start = settings['start'];
			}

			if('stop' in settings) {
				this.ctx.stop = settings['stop'];
			}

			if('orderBy' in settings) {
				this.ctx.orderBy = settings['orderBy'];
			}

			if('orderWay' in settings) {
				this.ctx.orderWay = settings['orderWay'];
			}
		}

		/*---------------------------------------------------------*/

		if(this.ctx.defaultFields.length > 0)
		{
			this._display(selector);
		}
		else
		{
			this.ctx.defaultFields = [];
			this.ctx.defaultValues = [];
			this.ctx.defaultTypes = [];

			amiCommand.execute('GetFieldInfo -catalog="' + this.ctx.catalog + '" -entity="' + this.ctx.entity + '"', {context: this}).done(function(data) {

				var rows = amiWebApp.jspath('..row', data) || [];

				for(var i in rows)
				{
					var field = amiWebApp.jspath('..field{.@name==="name"}.$', rows[i])[0] || '';
					var value = amiWebApp.jspath('..field{.@name==="def"}.$', rows[i])[0] || '';
					var type = amiWebApp.jspath('..field{.@name==="type"}.$', rows[i])[0] || '';
					var primary = amiWebApp.jspath('..field{.@name==="primary"}.$', rows[i])[0] || '';

					this.ctx.defaultFields.push(field);
					this.ctx.defaultValues.push(value);
					this.ctx.defaultTypes.push(type);

					if(primary === 'true')
					{
						this.ctx.primaryField = field;
					}
				}

				this._display(selector);

			}).fail(function() {

				this._display(selector);
			});
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	_display: function(selector)
	{
		/*---------------------------------------------------------*/

		this.ctx.fieldInfo = [];

		var l1 = this.ctx.defaultFields.length;
		var l2 = this.ctx.defaultValues.length;
		var l3 = this.ctx.defaultTypes.length;

		if(l1 === l2
		   &&
		   l1 === l3
		 ) {
			for(var i = 0; i < l1; i++)
			{
				this.ctx.fieldInfo.push({
		  			field: this.ctx.defaultFields[i],
		  			value: this.ctx.defaultValues[i],
		  			type: this.ctx.defaultTypes[i],
				});
			}
		}
		else
		{
			amiWebApp.warning('settings `defaultFields`, `defaultValues` and `defaultTypes` must be arrays of same size');
		}

		/*---------------------------------------------------------*/

		this.replaceHTML(selector, this.fragmentTableCtrl, {context: this, dict: this.ctx}).done(function() {

			var _this = this;

			/*-------------------------------------------------*/

			$('#B85AC8DB_E3F9_AB6D_D51F_0B103205F2B1').submit(function(e) {

				e.preventDefault();

				_this.appendRow();
			});

			$('#F5221AF4_E3C8_260F_4556_A1ED96055B2F').click(function() {

				_this.hideEditModal();
			});

			/*-------------------------------------------------*/

			$('#F114E547_5E78_72D9_BB7F_355CDBB3D03A').submit(function(e) {

				e.preventDefault();

				_this.refineResult();
			});

			$('#C31B969B_357E_B68B_E56D_BA38DC220599').click(function() {

				_this.hideRefineModal();
			});

			/*-------------------------------------------------*/

			$(this.patchId('#BB126294_FFC2_24B8_8765_CF653EB950F7')).click(function() {

				_this.prev();
			});

			$(this.patchId('#E7FDF4C8_ECD2_3FE0_8C75_541E511239C2')).click(function() {

				_this.next();
			});

			$(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).keypress(function(e) {

				if(e.keyCode == 13)
				{
					_this.refresh();
				}
			});

			$(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).keypress(function(e) {

				if(e.keyCode == 13)
				{
					_this.refresh();
				}
			});

			$(this.patchId('#D809166F_A40B_2376_C8A5_977AA0C8C408')).click(function() {

				_this.refresh();
			});

			/*-------------------------------------------------*/

			$(this.patchId('#DDC32238_DD25_8354_AC6C_F6E27CA6E18D')).change(function() {

				_this.setMode();
			});

			$(this.patchId('#CDE5AD14_1268_8FA7_F5D8_0D690F3FB850')).click(function() {

				_this.showEditModal();
			});

			/*-------------------------------------------------*/

			$(this.patchId('#F4F0EB6C_6535_7714_54F7_4BC28C254872')).click(function() {

				_this.showMQL();
			});

			$(this.patchId('#CD458FEC_9AD9_30E8_140F_263F119961BE')).click(function() {

				_this.showSQL();
			});

			$(this.patchId('#D49853E2_9319_52C3_5253_A208F9500408')).click(function() {

				_this.showCommand();
			});

			$(this.patchId('#C50C3427_FEE5_F115_1FEC_6A6668763EC4')).click(function() {

				_this.showJS();
			});

			/*-------------------------------------------------*/

			amiWebApp.replaceHTML('#F2E58136_73F5_D2E2_A0B7_2F810830AD98', this.fragmentFieldList, {context: this, dict: this.ctx}).done(function() {

				this.refresh();
			});

			/*-------------------------------------------------*/
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	checkPageNumber: function(_x, _default) { return isNaN(_x) === false && _x > 0 ? _x : _default; },

	/*-----------------------------------------------------------------*/

	prev: function()
	{
		var oldStart = this.checkPageNumber(
			parseInt($(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val()), this.ctx.start
		);

		var oldStop = this.checkPageNumber(
			parseInt($(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val()), this.ctx.stop
		);

		var range = oldStop - oldStart + 1;

		var newStart = oldStart - range;
		var newStop = oldStop - range;

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

	/*-----------------------------------------------------------------*/

	next: function()
	{
		var oldStart = this.checkPageNumber(
			parseInt($(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val()), this.ctx.start
		);

		var oldStop = this.checkPageNumber(
			parseInt($(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val()), this.ctx.stop
		);

		var range = oldStop - oldStart + 1;

		var newStart = oldStart + range;
		var newStop = oldStop + range;

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

	/*-----------------------------------------------------------------*/

	refresh: function()
	{
		/*---------------------------------------------------------*/

		var command = this.ctx.command;

		/*---------------------------------------------------------*/

		if(this.ctx.orderBy)
		{
			command += ' -orderBy="' + this.ctx.orderBy + '"';

			if(this.ctx.orderWay)
			{
				command += ' -orderWay="' + this.ctx.orderWay + '"';
			}
		}

		/*---------------------------------------------------------*/

		var start = this.checkPageNumber(
			parseInt($(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val()), this.ctx.start
		);

		var stop = this.checkPageNumber(
			parseInt($(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val()), this.ctx.stop
		);

		command += ' -limit="' + (stop - start + 1) + '" -offset="' + (start - 1) + '"';

		/*---------------------------------------------------------*/

		if(this.ctx.enableCache)
		{
			command += ' -cache';
		}

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.execute(command, {context: this}).done(function(data) {

			var fieldDescriptions = this.ctx.rowset ? amiWebApp.jspath('..fieldDescriptions{.@rowset==="' + this.ctx.rowset + '"}.fieldDescription', data) || []
			                                        : amiWebApp.jspath('..fieldDescription'                                                        , data) || []
			;

			var rowset = this.ctx.rowset ? amiWebApp.jspath('..rowset{.@type==="' + this.ctx.rowset + '"}"', data) || []
			                             : amiWebApp.jspath('..rowset'                                     , data) || []
			;

			var rows = amiWebApp.jspath('..row', rowset) || [];

			this.sql = amiWebApp.jspath('..@sql', rowset)[0] || 'N/A';
			this.mql = amiWebApp.jspath('..@mql', rowset)[0] || 'N/A';
			this.ast = amiWebApp.jspath('..@ast', rowset)[0] || 'N/A';

			var totalResults = amiWebApp.jspath('..@totalResults', rowset)[0] || 'N/A';

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

			var isXQL = this.sql !== 'N/A' || this.mql !== 'N/A';

			var dict = {
				fieldDescriptions: fieldDescriptions,
				rows: rows,
				primaryField: this.ctx.primaryField,
				showDetails: this.ctx.showDetails,
				showTools: this.ctx.showTools
				           &&
					   isXQL,
			};

			this.replaceHTML(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61'), this.fragmentTable, {context: this, dict: dict}).done(function() {

				var _this = this;

				var parent = $(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61'));

				/*-----------------------------------------*/
				/* TOOLS                                   */
				/*-----------------------------------------*/

				parent.find('a[data-orderway="DESC"]').click(function(e) {

					e.preventDefault();

					_this.ctx.orderBy = this.getAttribute('data-row');
					_this.ctx.orderWay = 'DESC';

					_this.refresh();
				});

				/*-----------------------------------------*/

				parent.find('a[data-orderway="ASC"]').click(function(e) {

					e.preventDefault();

					_this.ctx.orderBy = this.getAttribute('data-row');
					_this.ctx.orderWay = 'ASC';

					_this.refresh();
				});

				/*-----------------------------------------*/

				parent.find('a[data-action="refine"]').click(function(e) {

					e.preventDefault();

					_this.showRefineModal(
						this.getAttribute('data-catalog')
						,
						this.getAttribute('data-entity')
						,
						this.getAttribute('data-field')
					);
				});

				/*-----------------------------------------*/

				parent.find('a[data-action="stats"]').click(function(e) {

					e.preventDefault();

					_this.showStatsTab(
						this.getAttribute('data-catalog')
						,
						this.getAttribute('data-entity')
						,
						this.getAttribute('data-field')
					);
				});

				/*-----------------------------------------*/

				parent.find('a[data-action="group"]').click(function(e) {

					e.preventDefault();

					_this.showGroupTab(
						this.getAttribute('data-catalog')
						,
						this.getAttribute('data-entity')
						,
						this.getAttribute('data-field')
					);
				});

				/*-----------------------------------------*/

				parent.find('a[data-action="details"]').click(function(e) {

					e.preventDefault();

					_this.showDetailsTab(this.getAttribute('data-row'));
				});

				/*-----------------------------------------*/

				parent.find('a[data-action="clone"]').click(function(e) {

					e.preventDefault();

					_this.showCloneModal(this.getAttribute('data-row'));
				});

				/*-----------------------------------------*/

				parent.find('a[data-action="delete"]').click(function(e) {

					e.preventDefault();

					_this.deleteRow(this.getAttribute('data-row'));
				});

				/*-----------------------------------------*/

				parent.find('a[data-action="filter"]').click(function(e) {

					e.preventDefault();

					var descr = this.getAttribute('data-filter-def').split('::');

					if(descr.length === 2) _this.getOwner().refineResult('2', descr[0], descr[1]);
				});

				/*-----------------------------------------*/
				/* FIELDS                                  */
				/*-----------------------------------------*/

				var fields = parent.find('.edit-field');

				/*-----------------------------------------*/

				fields.focus(function() {

					this.data_orig = this.innerHTML;
				});

				/*-----------------------------------------*/

				fields.blur(function() {

					if(this.innerHTML != this.data_orig)
					{
						if(!_this.updateRow(this.getAttribute('data-row'), this.getAttribute('data-col'), this.innerHTML))
						{
							this.innerHTML = this.data_orig;
						}
					}
				});

				/*-----------------------------------------*/

				fields.keypress(function(e) {

					/**/ if(e.keyCode == 13)
					{
					    	this.innerHTML = this.innerHTML;

						e.preventDefault();

						e.target.blur();

						return false;
					}
					else if(e.keyCode == 27)
					{
						this.innerHTML = this.data_orig;

						e.preventDefault();

						e.target.blur();

						return false;
					}
				});

				/*-----------------------------------------*/
				/* UPDATE JAVASCRIPT                       */
				/*-----------------------------------------*/

				this.js = amiWebApp.formatTWIG(this.fragmentJS, this.ctx);

				/*-----------------------------------------*/
				/* TOOLTIP CONTENT                         */
				/*-----------------------------------------*/

				var title = this.ctx.catalog + '::' + this.ctx.entity + '<br />#shown:&nbsp;' + rows.length + ', #total:&nbsp;' + (isXQL ? totalResults : rows.length);

				$(this.patchId('#C57C824B_166C_4C23_F349_8B0C8E94114A')).data('tooltip', false).tooltip({
					placement: (('bottom')),
					title: title,
					html: true,
				});

				/*-----------------------------------------*/
				/* VIEW MODE                               */
				/*-----------------------------------------*/

				this.setMode();

				/*-----------------------------------------*/

				amiWebApp.unlock();

				/*-----------------------------------------*/
			});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	setMode: function()
	{
		var tags1 = $(this.patchId('#CDE5AD14_1268_8FA7_F5D8_0D690F3FB850'));
		var tags2 = $(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61')
									+ ' .edit-mode');
		var tags3 = $(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61')
									+ ' .edit-field');

		if($(this.patchId('#DDC32238_DD25_8354_AC6C_F6E27CA6E18D')).prop('checked'))
		{
			if(this.ctx.fieldInfo.length > 0) tags1.show();
			/*-------------------------*/ tags2.show();
			tags3.attr('contenteditable', 'true');
		}
		else
		{
			if(this.ctx.fieldInfo.length > 0) tags1.hide();
			/*-------------------------*/ tags2.hide();
			tags3.attr('contenteditable', 'false');
		}
	},

	/*-----------------------------------------------------------------*/

	showSQL: function()
	{
		this.messageBox.show(this.sql);
	},

	/*-----------------------------------------------------------------*/

	showMQL: function()
	{
		this.messageBox.show(this.mql);
	},

	/*-----------------------------------------------------------------*/

	showCommand: function()
	{
		this.messageBox.show(this.ctx.command);
	},

	/*-----------------------------------------------------------------*/

	showJS: function()
	{
		this.textBox.show(this.js);
	},

	/*-----------------------------------------------------------------*/

	showEditModal: function()
	{
		var field;
		var value;

		var el1 = $('#A8572167_6898_AD6F_8EAD_9D4E2AEB3550');
		var el2 = $('#B85AC8DB_E3F9_AB6D_D51F_0B103205F2B1');

		for(var i in this.ctx.fieldInfo)
		{
			field = this.ctx.fieldInfo[i].field;
			value = this.ctx.fieldInfo[i].value;

			el2.find('input[name="' + field.toLowerCase() + '"]').val(value);
		}

		el1.modal('show');
	},

	/*-----------------------------------------------------------------*/

	hideEditModal: function()
	{
		var field;
		var value;

		var el1 = $('#A8572167_6898_AD6F_8EAD_9D4E2AEB3550');
		var el2 = $('#B85AC8DB_E3F9_AB6D_D51F_0B103205F2B1');

		for(var i in this.ctx.fieldInfo)
		{
			field = this.ctx.fieldInfo[i].field;
			value = this.ctx.fieldInfo[i].value;

			el2.find('input[name="' + field.toLowerCase() + '"]').val(value);
		}

		el1.modal('hide');
	},

	/*-----------------------------------------------------------------*/

	showCloneModal: function(primaryValue)
	{
		var field;
		var value;

		var el1 = $(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61')
						+ ' .edit-field[data-row="' + primaryValue + '"]');
		var el2 = $(/*--------*/('#B85AC8DB_E3F9_AB6D_D51F_0B103205F2B1'));

		this.showEditModal();

		el1.each(function() {

			field = $(this).attr('data-col');
			value = $(this).text(/*------*/);

			el2.find('input[name="' + field.toLowerCase() + '"]').val(value);
		});
	},

	/*-----------------------------------------------------------------*/

	_formToArray: function()
	{
		var form = $('#B85AC8DB_E3F9_AB6D_D51F_0B103205F2B1').serializeArray();

		var fieldList = [];
		var valueList = [];

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
		var result = confirm('Please confirm!');

		if(result)
		{
			amiWebApp.lock();

			amiCommand.execute(this.ctx.appendCommandFunc.apply(this, this._formToArray()), {context: this}).done(function() {

				this.hideEditModal();

				this.refresh();

 			}).fail(function(data) {

				amiWebApp.error(amiWebApp.jspath('..error.$', data), true, '#B4CF70FC_14C8_FC57_DEF0_05144415DB6A');
			});
		}

		return result;
	},

	/*-----------------------------------------------------------------*/

	updateRow: function()
	{
		var result = confirm('Please confirm!');

		if(result)
		{
			amiWebApp.lock();

			amiCommand.execute(this.ctx.updateCommandFunc.apply(this, arguments), {context: this}).done(function() {

			//	this.hideEditModal();

				this.refresh();

 			}).fail(function(data) {

				amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
			});
		}

		return result;
	},

	/*-----------------------------------------------------------------*/

	deleteRow: function()
	{
		var result = confirm('Please confirm!');

		if(result)
		{
			amiWebApp.lock();

			amiCommand.execute(this.ctx.deleteCommandFunc.apply(this, arguments), {context: this}).done(function() {

			//	this.hideEditModal();

				this.refresh();

 			}).fail(function(data) {

				amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
			});
		}

		return result;
	},

	/*-----------------------------------------------------------------*/

	showDetailsTab: function(primaryValue)
	{
		var parent = this.getParent();

		if(parent.$name === 'TabCtrl')
		{
			parent.appendTab('<i class="fa fa-arrows-alt"></i> ' + this.ctx.entity, {context: this}).done(function(selector) {

				new this.elementInfoCtor(parent, this).render(
					selector,
					this.ctx.catalog,
					this.ctx.entity,
					this.ctx.primaryField,
					primaryValue
				);
			});
		}
		else
		{
			amiWebApp.error('could not create a new tab', true);
		}
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
		var column = this._buildColumnName('N/A', entity, field);

		var el = $('#C48564EA_A64D_98BA_6232_D03D524CAD08');

		el.find('#E7014B57_B16A_7593_FA1B_0DD15C15AC3E').text(column);
		el.find('#F3A040E1_40EE_97B3_45D6_E7BFB61DBF44').val(column);

		el.find('#CAF8B5EB_1796_3837_5722_3B5B2A7C729B').hide();
		el.find('#A24427DD_0DCB_3AC8_4A3E_A75D79FAA8F7').hide();

		el.find('form')[0].reset();

		el.modal('show');
	},

	/*-----------------------------------------------------------------*/

	hideRefineModal: function()
	{
		var column = /*-----------------*/''/*-----------------*/;

		var el = $('#C48564EA_A64D_98BA_6232_D03D524CAD08');

		el.find('#E7014B57_B16A_7593_FA1B_0DD15C15AC3E').text(column);
		el.find('#F3A040E1_40EE_97B3_45D6_E7BFB61DBF44').val(column);

		el.find('#CAF8B5EB_1796_3837_5722_3B5B2A7C729B').hide();
		el.find('#A24427DD_0DCB_3AC8_4A3E_A75D79FAA8F7').hide();

		el.find('form')[0].reset();

		el.modal('hide');
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

		var regions = xqlGetRegions(this.mql && this.mql !== 'N/A' ? this.mql : this.sql);

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

		var parent = this.getParent();

		if(parent.$name === 'TabCtrl')
		{
			parent.appendTab(this.ctx.entity, {context: this}).done(function(selector) {

				new this.$class(parent, this).render(selector, command, this.ctx);
			});
		}
		else
		{
			amiWebApp.error('could not create a new tab', true);
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	showStatsTab: function(catalog, entity, field)
	{
		/*---------------------------------------------------------*/

		var regions = xqlGetRegions(this.sql);

		/*---------------------------------------------------------*/

		var columnName = this._buildColumnName('N/A', entity, field);
		var columnNAME = this._buildColumnName(catalog, entity, field);

		regions['SELECT'] = '\'' + columnNAME.replace(/'/g, '\'\'') + '\' AS `field`'
		                    + ', ' +
		                    'MIN(' + columnName + ') AS `min`'
		                    + ', ' +
				    'MAX(' + columnName + ') AS `max`'
				    + ', ' +
				    'AVG(' + columnName + ') AS `avg`'
				    + ', ' +
				    'STDDEV(' + columnName + ') AS `stddev`'
				    + ', ' +
				    'COUNT(' + columnName + ') AS `count`'
		;

		/*---------------------------------------------------------*/

		var sql = [];

		if(regions['SELECT']) {
			sql.push('SELECT ' + regions['SELECT']);
		}

		if(regions['FROM']) {
			sql.push('FROM ' + regions['FROM']);
		}

		if(regions['WHERE']) {
			sql.push('WHERE ' + regions['WHERE']);
		}

		/*---------------------------------------------------------*/

		var command = 'SearchQuery -catalog="' + amiWebApp.textToString(this.ctx.catalog) + '" -entity="' + amiWebApp.textToString(this.ctx.entity) + '" -sql="' + amiWebApp.textToString(sql.join(' ')) + '"';

		/*---------------------------------------------------------*/

		var parent = this.getParent();

		if(parent.$name === 'TabCtrl')
		{
			parent.appendTab('<i class="fa fa-bar-chart"></i> ' + this.ctx.entity, {context: this}).done(function(selector) {

				new this.$class(parent, this).render(selector, command, this.ctx);
			});
		}
		else
		{
			amiWebApp.error('could not create a new tab', true);
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	showGroupTab: function(catalog, entity, field)
	{
		/*---------------------------------------------------------*/

		var regions = xqlGetRegions(this.sql);

		/*---------------------------------------------------------*/

		var columnName = this._buildColumnName('N/A', entity, field);

		regions['SELECT'] = columnName
				+ ', count(*) AS `total`, CONCAT(\'@owner::' + columnName + '::\', ' + columnName + ') AS `go`';
		regions['GROUP'] = columnName;

		/*---------------------------------------------------------*/

		var sql = [];

		if(regions['SELECT']) {
			sql.push('SELECT ' + regions['SELECT']);
		}

		if(regions['FROM']) {
			sql.push('FROM ' + regions['FROM']);
		}

		if(regions['WHERE']) {
			sql.push('WHERE ' + regions['WHERE']);
		}

		if(regions['GROUP']) {
			sql.push('GROUP BY ' + regions['GROUP']);
		}

		/*---------------------------------------------------------*/

		var command = 'SearchQuery -catalog="' + amiWebApp.textToString(this.ctx.catalog) + '" -entity="' + amiWebApp.textToString(this.ctx.entity) + '" -sql="' + amiWebApp.textToString(sql.join(' ')) + '"';

		/*---------------------------------------------------------*/

		var parent = this.getParent();

		if(parent.$name === 'TabCtrl')
		{
			parent.appendTab('<i class="fa fa-slack"></i> ' + this.ctx.entity, {context: this}).done(function(selector) {

				new this.$class(parent, this).render(selector, command, this.ctx);
			});
		}
		else
		{
			amiWebApp.error('could not create a new tab', true);
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
