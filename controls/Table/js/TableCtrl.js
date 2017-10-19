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

	$init: function(parent)
	{
		this.$super.$init(parent);
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
			'ctrl:messageBox',
			'ctrl:textBox',
		], {context: this}).done(function(data) {

			amiWebApp.appendHTML('body', data[1], {context: this}).done(function() {
				amiWebApp.appendHTML('body', data[2], {context: this}).done(function() {

					this.fragmentTableCtrl = data[0];
					this.fragmentFieldList = data[3];
					this.fragmentTable = data[4];
					this.fragmentJS = data[5];

					this.messageBox = new data[6];
					this.textBox = new data[7];
				});
			});
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	render: function(selector, command, settings)
	{
		this.command = command.trim();

		/**/

		this.appendCommandFunc = function(fields, values) {

			return 'AddElement -catalog="' + this.catalog + '" -entity="' + this.entity + '" -separator="§" -fields="' + amiWebApp.textToString(fields.join('§')) + '" -values="' + amiWebApp.textToString(values.join('§')) + '"';
		};

		this.updateCommandFunc = function(primaryValue, field, value) {

			return 'UpdateElements -catalog="' + this.catalog + '" -entity="' + this.entity + '" -separator="§" -keyFields="' + amiWebApp.textToString(this.primaryField) + '" -keyValues="' + amiWebApp.textToString(primaryValue) + '" -fields="' + amiWebApp.textToString(field) + '" -values="' + amiWebApp.textToString(value) + '"';
		};

		this.deleteCommandFunc = function(primaryValue) {
		
			return 'RemoveElements -catalog="' + this.catalog + '" -entity="' + this.entity + '" -separator="§" -keyFields="' + amiWebApp.textToString(this.primaryField) + '" -keyValues="' + amiWebApp.textToString(primaryValue) + '"';
		};

		/**/

		this.enableCache = false;
		this.showDetails = false;
		this.showTools = true;
		this.canEdit = false;

		this.catalog = '';
		this.entity = '';
		this.primaryField = '';
		this.rowset = '';

		this.defaultFields = [];
		this.defaultValues = [];
		this.defaultTypes = [];
		this.defaultSizes = [];

		this.start = 0x01;
		this.stop = 0x0A;
		this.orderBy = '';
		this.orderWay = '';

		if(settings)
		{
			if('appendCommandFunc' in settings) {
				this.appendCommandFunc = settings['appendCommandFunc'];
			}

			if('updateCommandFunc' in settings) {
				this.updateCommandFunc = settings['updateCommandFunc'];
			}

			if('deleteCommandFunc' in settings) {
				this.deleteCommandFunc = settings['deleteCommandFunc'];
			}

			/**/

			if('enableCache' in settings) {
				this.enableCache = settings['enableCache'];
			}

			/**/

			if('showDetails' in settings) {
				this.showDetails = settings['showDetails'];
			}

			if('showTools' in settings) {
				this.showTools = settings['showTools'];
			}

			if('canEdit' in settings) {
				this.canEdit = settings['canEdit'];
			}

			/**/

			if('catalog' in settings) {
				this.catalog = settings['catalog'];
			}

			if('entity' in settings) {
				this.entity = settings['entity'];
			}

			if('primaryField' in settings) {
				this.primaryField = settings['primaryField'];
			}

			if('rowset' in settings) {
				this.rowset = settings['rowset'];
			}

			/**/

			if('defaultFields' in settings) {
				this.defaultFields = settings['defaultFields'];
			}

			if('defaultValues' in settings) {
				this.defaultValues = settings['defaultValues'];
			}

			if('defaultTypes' in settings) {
				this.defaultTypes = settings['defaultTypes'];
			}

			if('defaultSizes' in settings) {
				this.defaultSizes = settings['defaultSizes'];
			}

			/**/

			if('start' in settings) {
				this.start = settings['start'];
			}

			if('stop' in settings) {
				this.stop = settings['stop'];
			}

			if('orderBy' in settings) {
				this.orderBy = settings['orderBy'];
			}

			if('orderWay' in settings) {
				this.orderWay = settings['orderWay'];
			}
		}

		/*---------------------------------------------------------*/

		if(this.defaultFields.length > 0)
		{
			this._display(selector);
		}
		else
		{
			amiCommand.execute('GetFieldInfo -catalog="' + this.catalog + '" -entity="' + this.entity + '"', {context: this}).done(function(data) {

				this.defaultFields = amiWebApp.jspath('..field{.@name==="name"}.$', data) || [];
				this.defaultValues = amiWebApp.jspath('..field{.@name==="def"}.$', data) || [];
				this.defaultTypes = amiWebApp.jspath('..field{.@name==="type"}.$', data) || [];
				this.defaultSizes = amiWebApp.jspath('..field{.@name==="size"}.$', data) || [];

				this._display(selector);

			}).fail(function() {

				this.defaultFields = /*------------*/[ ]/*------------*/;
				this.defaultValues = /*------------*/[ ]/*------------*/;
				this.defaultTypes = /*------------*/[ ]/*------------*/;

				this._display(selector);
			});
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	_display: function(selector)
	{
		/*---------------------------------------------------------*/

		var l1 = this.defaultFields.length;
		var l2 = this.defaultValues.length;
		var l3 = this.defaultTypes.length;
		var l4 = this.defaultSizes.length;
		
		if(l1 !== l2
		   ||
		   l1 !== l3
		   ||
		   l1 !== l4
		 ) {
			amiWebApp.error('options `defaultFields`, `defaultValues`, `defaultTypes`, `defaultSizes` must be arrays of same size');

			return;
		}

		/*---------------------------------------------------------*/

		this.fieldInfo = [];

		for(var i = 0; i < l1; i++)
		{
			this.fieldInfo.push({
	  			field: this.defaultFields[i],
	  			value: this.defaultValues[i],
	  			type: this.defaultTypes[i],
	  			size: this.defaultSizes[i],
			});
		}

		/*---------------------------------------------------------*/

		var dict = {
			isEmbedded: amiWebApp.isEmbedded(),
			endpoint: amiCommand.endpoint,
			command: this.command,
			enableCache: this.enableCache,
			showDetails: this.showDetails,
			showTools: this.showTools,
			canEdit: this.canEdit,
			catalog: this.catalog,
			entity: this.entity,
			primaryField: this.primaryField,
			fieldInfo: this.fieldInfo,
			start: this.start,
			stop: this.stop,
			orderBy: this.orderBy,
			orderWay: this.orderWay,
		};

		this.replaceHTML(selector, this.fragmentTableCtrl, {context: this, dict: dict}).done(function() {

			var _this = this;

			/*-------------------------------------------------*/

			$('#F5221AF4_E3C8_260F_4556_A1ED96055B2F').click(function() {

				_this.hideEditModal();
			});

			$('#DF100F06_DCAF_061E_1698_B301143311F7').click(function() {

				_this.appendRow();
			});

			$('#C31B969B_357E_B68B_E56D_BA38DC220599').click(function() {

				_this.hideRefineModal();
			});

			$('#CE7B4CA6_63C6_416B_A2BC_45B53CC5EF37').click(function() {

				_this.refineResult();
			});

			/*-------------------------------------------------*/

			$(this.patchId('#BB126294_FFC2_24B8_8765_CF653EB950F7')).click(function() {

				_this.prev();
			});

			$(this.patchId('#E7FDF4C8_ECD2_3FE0_8C75_541E511239C2')).click(function() {

				_this.next();
			});

			$(this.patchId('#D809166F_A40B_2376_C8A5_977AA0C8C408')).click(function() {

				_this.refresh();
			});

			$(this.patchId('#DDC32238_DD25_8354_AC6C_F6E27CA6E18D')).change(function() {

				_this.setMode();
			});

			$(this.patchId('#CDE5AD14_1268_8FA7_F5D8_0D690F3FB850')).click(function() {

				_this.showEditModal();
			});

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

				_this.showJavaScript();
			});

			/*-------------------------------------------------*/

			amiWebApp.replaceHTML('#B85AC8DB_E3F9_AB6D_D51F_0B103205F2B1', this.fragmentFieldList, {dict: dict});

			/*-------------------------------------------------*/

			this.jsCode = amiWebApp.formatTWIG(this.fragmentJS, dict);

			/*-------------------------------------------------*/

			this.refresh();

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
			parseInt($(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val()), this.start
		);

		var oldStop = this.checkPageNumber(
			parseInt($(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val()), this.stop
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
			parseInt($(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val()), this.start
		);

		var oldStop = this.checkPageNumber(
			parseInt($(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val()), this.stop
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

		var command = this.command;

		/*---------------------------------------------------------*/

		if(this.orderBy)
		{
			command += ' -orderBy="' + this.orderBy + '"';

			if(this.orderWay)
			{
				command += ' -orderWay="' + this.orderWay + '"';
			}
		}

		/*---------------------------------------------------------*/

		var start = this.checkPageNumber(
			parseInt($(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val()), this.start
		);

		var stop = this.checkPageNumber(
			parseInt($(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val()), this.stop
		);

		command += ' -limit="' + (stop - start + 1) + '" -offset="' + (start - 1) + '"';

		/*---------------------------------------------------------*/

		if(this.enableCache)
		{
			command += ' -cache';
		}

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.execute(command, {context: this}).done(function(data) {

			var fieldDescriptions = this.rowset ? amiWebApp.jspath('..fieldDescriptions{.@rowset==="' + this.rowset + '"}.fieldDescription', data) || []
			                                    : amiWebApp.jspath('..fieldDescription'                                                    , data) || []
			;

			var rows = this.rowset ? amiWebApp.jspath('..rowset{.@type==="' + this.rowset + '"}.row', data) || []
			                       : amiWebApp.jspath('..row'                                       , data) || []
			;

			this.sql = this.rowset ? amiWebApp.jspath('..rowset{.@type==="' + this.rowset + '"}.@sql', data)[0] || 'N/A'
			                       : amiWebApp.jspath('..@sql'                                       , data)[0] || 'N/A'
			;

			this.mql = this.rowset ? amiWebApp.jspath('..rowset{.@type==="' + this.rowset + '"}.@mql', data)[0] || 'N/A'
			                       : amiWebApp.jspath('..@mql'                                       , data)[0] || 'N/A'
			;

			this.ast = this.rowset ? amiWebApp.jspath('..rowset{.@type==="' + this.rowset + '"}.@ast', data)[0] || 'N/A'
			                       : amiWebApp.jspath('..@ast'                                       , data)[0] || 'N/A'
			;

			var totalResults = this.rowset ? amiWebApp.jspath('..rowset{.@type==="' + this.rowset + '"}.@totalResults', data)[0] || 'N/A'
			                               : amiWebApp.jspath('..@totalResults'                                       , data)[0] || 'N/A'
			;

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
				primaryField: this.primaryField,
				showDetails: this.showDetails,
				showTools: this.showTools
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

					_this.orderBy = this.getAttribute('data-row');
					_this.orderWay = 'DESC';

					_this.refresh();
				});

				/*-----------------------------------------*/

				parent.find('a[data-orderway="ASC"]').click(function(e) {

					e.preventDefault();

					_this.orderBy = this.getAttribute('data-row');
					_this.orderWay = 'ASC';

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
					    //	this.innerHTML = this.innerHTML;

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
				/* TOOLTIP CONTENT                         */
				/*-----------------------------------------*/

				var title = this.entity + '<br />#shown:&nbsp;' + rows.length + ', #total:&nbsp;' + (isXQL ? totalResults : rows.length);

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

			amiWebApp.error(amiWebApp.jspath('..error.$', data));
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	setMode: function()
	{
		var tags1 = $(this.patchId('#CDE5AD14_1268_8FA7_F5D8_0D690F3FB850') /*----------*/);
		var tags2 = $(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61') + ' .edit-mode');
		var tags3 = $(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61') + ' .edit-field');

		if($(this.patchId('#DDC32238_DD25_8354_AC6C_F6E27CA6E18D')).prop('checked'))
		{
			if(this.fieldInfo.length > 0) tags1.show();
			/*-------------------------*/ tags2.show();
			tags3.attr('contenteditable', 'true');
		}
		else
		{
			if(this.fieldInfo.length > 0) tags1.hide();
			/*-------------------------*/ tags2.hide();
			tags3.attr('contenteditable', 'false');
		}
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

	showEditModal: function()
	{
		var field;
		var value;

		var el1 = $('#A8572167_6898_AD6F_8EAD_9D4E2AEB3550');
		var el2 = $('#B85AC8DB_E3F9_AB6D_D51F_0B103205F2B1');

		for(var i in this.fieldInfo)
		{
			field = this.fieldInfo[i].field;
			value = this.fieldInfo[i].value;

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

		for(var i in this.fieldInfo)
		{
			field = this.fieldInfo[i].field;
			value = this.fieldInfo[i].value;

			el2.find('input[name="' + field.toLowerCase() + '"]').val(value);
		}

		el1.modal('hide');
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
			this.hideEditModal();

			amiCommand.execute(this.appendCommandFunc.apply(this, this._formToArray()), {context: this}).done(function() {

				this.refresh();

 			}).fail(function(data) {

				amiWebApp.error(amiWebApp.jspath('..error.$', data));
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
			this.hideEditModal();

			amiCommand.execute(this.updateCommandFunc.apply(this, arguments), {context: this}).done(function() {

				this.refresh();

 			}).fail(function(data) {

				amiWebApp.error(amiWebApp.jspath('..error.$', data));
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
			this.hideEditModal();

			amiCommand.execute(this.deleteCommandFunc.apply(this, arguments), {context: this}).done(function() {

				this.refresh();

 			}).fail(function(data) {

				amiWebApp.error(amiWebApp.jspath('..error.$', data));
			});
		}

		return result;
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
		this.messageBox.show(this.command);
	},

	/*-----------------------------------------------------------------*/

	showJavaScript: function()
	{
		this.textBox.show(this.jsCode);
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
		var column = this._buildColumnName(catalog, entity, field);

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
		var column = /*------------------*/''/*------------------*/;

		var el = $('#C48564EA_A64D_98BA_6232_D03D524CAD08');

		el.find('#E7014B57_B16A_7593_FA1B_0DD15C15AC3E').text(column);
		el.find('#F3A040E1_40EE_97B3_45D6_E7BFB61DBF44').val(column);

		el.find('#CAF8B5EB_1796_3837_5722_3B5B2A7C729B').hide();
		el.find('#A24427DD_0DCB_3AC8_4A3E_A75D79FAA8F7').hide();

		el.find('form')[0].reset();

		el.modal('hide');
	},

	/*-----------------------------------------------------------------*/

	refineResult: function()
	{
		this.hideRefineModal();
	},

	/*-----------------------------------------------------------------*/

	showDetailsTab: function(primaryValue)
	{
		alert( this._buildColumnName(this.catalog, this.entity, this.primaryField) + ' = `' + primaryValue.replace(/`/g, '``') + '`');
	},

	/*-----------------------------------------------------------------*/

	showStatsTab: function(catalog, entity, field)
	{
		alert(this._buildColumnName(catalog, entity, field));
	},

	/*-----------------------------------------------------------------*/

	showGroupTab: function(catalog, entity, field)
	{
		alert(this._buildColumnName(catalog, entity, field));
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
