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

	$implements: [ami.IControl],

	/*-----------------------------------------------------------------*/

	$init: function()
	{
		this.suffix = amiWebApp._now++;
	},

	/*-----------------------------------------------------------------*/

	patchId: function(id)
	{
		return id + '__' + this.suffix;
	},

	/*-----------------------------------------------------------------*/

	replaceHTML: function(selector, twig, settings)
	{
		if(!settings)
		{
			settings = {};
		}

		settings.suffix = this.suffix;

		return amiWebApp.replaceHTML(selector, twig, settings);
	},

	/*-----------------------------------------------------------------*/

	prependHTML: function(selector, twig, settings)
	{
		if(!settings)
		{
			settings = {};
		}

		settings.suffix = this.suffix;

		return amiWebApp.prependHTML(selector, twig, settings);
	},

	/*-----------------------------------------------------------------*/

	appendHTML: function(selector, twig, settings)
	{
		if(!settings)
		{
			settings = {};
		}

		settings.suffix = this.suffix;

		return amiWebApp.appendHTML(selector, twig, settings);
	},

	/*-----------------------------------------------------------------*/

	onReady: function()
	{
		/*---------------------------------------------------------*/

		amiWebApp.loadControls([
			'messageBox',
			'textBox',
		], {context: this}).done(function(data) {

			this.messageBox = new data[0];
			this.textBox = new data[1];

		}).fail(function(data) {

			alert(data);
		});

		/*---------------------------------------------------------*/

		return amiWebApp.loadTWIGs([
			amiWebApp.originURL + '/controls/Table/twig/TableCtrl.twig',
			amiWebApp.originURL + '/controls/Table/twig/modal.twig',
			amiWebApp.originURL + '/controls/Table/twig/table.twig',
			amiWebApp.originURL + '/controls/Table/twig/js.twig',
		], {context: this}).done(function(data) {

			this.fragmentTableCtrl = data[0];
			this.fragmentModal = data[1];
			this.fragmentTable = data[2];
			this.fragmentJS = data[3];
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	render: function(id, command, settings)
	{
		this.command = command.trim();

		/**/

		this.appendCommandFunc = function(fields, values) {

			return 'xAddElement -catalog="' + this.catalog + '" -entity="' + this.entity + '" -separator="§" -fields="' + amiWebApp.textToString(fields.join('§')) + '" -values="' + amiWebApp.textToString(values.join('§')) + '"';
		};

		this.updateCommandFunc = function(primaryValue, field, value) {

			return 'xUpdateElements -catalog="' + this.catalog + '" -entity="' + this.entity + '" -separator="§" -keyFields="' + amiWebApp.textToString(this.primaryField) + '" -keyValues="' + amiWebApp.textToString(primaryValue) + '" -field="' + amiWebApp.textToString(field) + '" -value="' + amiWebApp.textToString(value) + '"';
		};

		this.deleteCommandFunc = function(primaryValue) {
		
			return 'xRemoveElements -catalog="' + this.catalog + '" -entity="' + this.entity + '" -separator="§" -keyFields="' + amiWebApp.textToString(this.primaryField) + '" -keyValues="' + amiWebApp.textToString(primaryValue) + '"';
		};

		/**/

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
			this._display(id);
		}
		else
		{
			amiCommand.execute('GetFieldInfo -catalog="' + this.catalog + '" -entity="' + this.entity + '"', {context: this}).done(function(data) {

				this.defaultFields = amiWebApp.jspath('..field{.@name==="name"}.$', data) || [];
				this.defaultValues = amiWebApp.jspath('..field{.@name==="def"}.$', data) || [];
				this.defaultTypes = amiWebApp.jspath('..field{.@name==="type"}.$', data) || [];
				this.defaultSizes = amiWebApp.jspath('..field{.@name==="size"}.$', data) || [];

				this._display(id);

			}).fail(function() {

				this.defaultFields = /*------------*/[ ]/*------------*/;
				this.defaultValues = /*------------*/[ ]/*------------*/;
				this.defaultTypes = /*------------*/[ ]/*------------*/;

				this._display(id);
			});
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	_display: function(id)
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

		this.replaceHTML(id, this.fragmentTableCtrl, {context: this, dict: dict}).done(function() {

			this.appendHTML('body', this.fragmentModal, {context: this, dict: dict}).done(function() {

				var _this = this;

				/*-----------------------------------------*/

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

					_this.showModal();
				});

				$(this.patchId('#F5221AF4_E3C8_260F_4556_A1ED96055B2F')).click(function() {

					_this.hideModal();
				});

				$(this.patchId('#DF100F06_DCAF_061E_1698_B301143311F7')).click(function() {

					_this.appendRow();
				});

				$(this.patchId('#D49853E2_9319_52C3_5253_A208F9500408')).click(function() {

					_this.showCommand();
				});

				$(this.patchId('#C50C3427_FEE5_F115_1FEC_6A6668763EC4')).click(function() {

					_this.showJavaScript();
				});

				/*-----------------------------------------*/

				this.jsCode = amiWebApp.formatHTML(this.fragmentJS, dict);

				/*-----------------------------------------*/

				this.refresh();

				/*-----------------------------------------*/
			});
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

		amiWebApp.lock();

		amiCommand.execute(command, {context: this}).done(function(data) {

			var rows = this.rowset ? amiWebApp.jspath('..rowset{.@type==="' + this.rowset + '"}.row', data) || []
			                       : amiWebApp.jspath('..row'                                       , data) || []
			;

			var totalResults = this.rowset ? amiWebApp.jspath('..rowset{.@type==="' + this.rowset + '"}.@totalResults', data)[0] || ''
			                               : amiWebApp.jspath('..@totalResults'                                       , data)[0] || ''
			;

			var dict = {
				rows: rows,
				primaryField: this.primaryField,
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

				parent.find('a[data-action="clone"]').click(function(e) {

					e.preventDefault();

					_this.cloneModal(this.getAttribute('data-row'));
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
						if(!_this.updateRow(
							this.getAttribute('data-row')
							,
							this.getAttribute('data-col')
							,
							this.innerHTML
						 )) {
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
/*
				var title = this.entity + (totalResults ? ': #' + totalResults : '');

				$(this.patchId('#C57C824B_166C_4C23_F349_8B0C8E94114A')).data('tooltip', false).tooltip({
					placement: (('top')),
					trigger: 'manual',
					title: title,
				}).tooltip('show');
 */
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

	cloneModal: function(primaryValue)
	{
		var field;
		var value;

		var el1 = $(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61')
						+ ' .edit-field[data-row="' + primaryValue + '"]');
		var el2 = $(this.patchId('#B85AC8DB_E3F9_AB6D_D51F_0B103205F2B1'));

		this.showModal();

		el1.each(function() {

			field = $(this).attr('data-col');
			value = $(this).text(/*------*/);

			el2.find('input[name="' + field.toLowerCase() + '"]').val(value);
		});
	},

	/*-----------------------------------------------------------------*/

	showModal: function()
	{
		var field;
		var value;

		var el1 = $(this.patchId('#A8572167_6898_AD6F_8EAD_9D4E2AEB3550'));
		var el2 = $(this.patchId('#B85AC8DB_E3F9_AB6D_D51F_0B103205F2B1'));

		for(var i in this.fieldInfo)
		{
			field = this.fieldInfo[i].field;
			value = this.fieldInfo[i].value;

			el2.find('input[name="' + field.toLowerCase() + '"]').val(value);
		}

		el1.modal('show');
	},

	/*-----------------------------------------------------------------*/

	hideModal: function()
	{
		var field;
		var value;

		var el1 = $(this.patchId('#A8572167_6898_AD6F_8EAD_9D4E2AEB3550'));
		var el2 = $(this.patchId('#B85AC8DB_E3F9_AB6D_D51F_0B103205F2B1'));

		for(var i in this.fieldInfo)
		{
			field = this.fieldInfo[i].field;
			value = this.fieldInfo[i].value;

			el2.find('input[name="' + field.toLowerCase() + '"]').val(value);
		}

		el1.modal('hide');
	},

	/*-----------------------------------------------------------------*/

	_form: function()
	{
		var form = $(this.patchId('#B85AC8DB_E3F9_AB6D_D51F_0B103205F2B1')).serializeArray();

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
			this.hideModal();

			amiCommand.execute(this.appendCommandFunc.apply(this, this._form()), {context: this}).done(function() {

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
			this.hideModal();

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
			this.hideModal();

			amiCommand.execute(this.deleteCommandFunc.apply(this, arguments), {context: this}).done(function() {

				this.refresh();

 			}).fail(function(data) {

				amiWebApp.error(amiWebApp.jspath('..error.$', data));
			});
		}

		return result;
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
});

/*-------------------------------------------------------------------------*/
