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
		var result = $.Deferred();

		amiWebApp.loadTWIGs([
			'controls/Table/twig/TableCtrl.twig',
			'controls/Table/twig/table.twig',
		], {context: this}).done(function(data) {

			this.fragmentTableCtrl = data[0];
			this.fragmentTable = data[1];

			result.resolve();

		}).fail(function() {

			result.reject();
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	render: function(id, command, settings)
	{
		this.command = command;

		this.canEdit = false;

		this.catalog = '';
		this.entity = '';
		this.primary = '';
		this.rowset = '';

		this.start = 1;
		this.stop = 10;

		this.orderBy = '';
		this.orderWay = '';

		if(settings)
		{
			if('canEdit' in settings) {
				this.canEdit = settings['canEdit'];
			}

			if('catalog' in settings) {
				this.catalog = settings['catalog'];
			}

			if('entity' in settings) {
				this.entity = settings['entity'];
			}

			if('primary' in settings) {
				this.primary = settings['primary'];
			}

			if('rowset' in settings) {
				this.rowset = settings['rowset'];
			}

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

		var dict = {
			isEmbedded: amiWebApp.isEmbedded(),
			canEdit: this.canEdit && this.primary,
			catalog: this.catalog,
			entity: this.entity,
			start: this.start,
			stop: this.stop,
		};

		this.replaceHTML(id, this.fragmentTableCtrl, {context: this, dict: dict}).done(function() {

			var _this = this;

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

			this.refresh();
		});
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

			var rows = this.rowset ? amiWebApp.jspath('..rowset{.@type==="' + this.rowset + '"}.row', data)
			                       : amiWebApp.jspath('..row'                                       , data)
			;

			var dict = {
				rows: rows,
				primary: this.primary,
			};

			this.replaceHTML(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61'), this.fragmentTable, {context: this, dict: dict}).done(function() {

				var i;

				var tags;

				var _this = this;

				/*-----------------------------------------*/
				/* TOOLS                                   */
				/*-----------------------------------------*/

				tags = $(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61') + ' a[data-orderway="DESC"]');

				for(i = 0; i < tags.length; i++)
				{
					/*---------------------------------*/

					tags[i].onclick = function()
					{
						_this.orderBy = this.getAttribute('data-row');
						_this.orderWay = 'DESC';

						_this.refresh();
					};

					/*---------------------------------*/
				}

				/*-----------------------------------------*/

				tags = $(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61') + ' a[data-orderway="ASC"]');

				for(i = 0; i < tags.length; i++)
				{
					/*---------------------------------*/

					tags[i].onclick = function()
					{
						_this.orderBy = this.getAttribute('data-row');
						_this.orderWay = 'ASC';

						_this.refresh();
					};

					/*---------------------------------*/
				}

				/*-----------------------------------------*/
				/* FIELDS                                  */
				/*-----------------------------------------*/

				tags = $(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61') + ' .editable');

				for(i = 0; i < tags.length; i++)
				{
					/*---------------------------------*/

					tags[i].onfocus = function()
					{
						this.data_orig = this.innerHTML;
					};

					/*---------------------------------*/

					tags[i].onblur = function()
					{
						if(this.innerHTML != this.data_orig)
						{
							if(confirm('Please confirm...'))
							{

							}
							else
							{
								this.innerHTML = this.data_orig;
							}
						}
					};

					/*---------------------------------*/

					tags[i].onkeypress = function(e) {

						/**/ if(e.keyCode == 13)
						{
/*							this.innerHTML = this.innerHTML;
 */
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
					};

					/*---------------------------------*/
				}

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
		var tags = $(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61') + ' .editable');

		if($(this.patchId('#DDC32238_DD25_8354_AC6C_F6E27CA6E18D')).prop('checked'))
		{
			tags.attr('contenteditable', 'true');
		}
		else
		{
			tags.attr('contenteditable', 'false');
		}
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
