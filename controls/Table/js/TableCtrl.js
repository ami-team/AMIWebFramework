/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team
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
		this.suffix = amiWebApp.getNewSuffix();
	},

	/*-----------------------------------------------------------------*/

	patchId: function(id)
	{
		return id + '_' + this.suffix;
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
		], {context: this}).done(function(data) {

			this.fragmentTable = data[0];

			result.resolve();

		}).fail(function() {

			result.reject();
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	render: function(id)
	{
		this.replaceHTML(id, this.fragmentTable, {context: this}).done(function() {

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
		});
	},

	/*-----------------------------------------------------------------*/

	prev: function()
	{
		var old_start = parseInt($(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val());
		var old_stop = parseInt($(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val());

		if(!old_start)
		{
			old_start = 1;
		}

		if(!old_stop)
		{
			old_stop = 15;
		}

		var range = (old_stop - old_start) + 1;

		var new_start = old_start - range;
		var new_stop = old_stop - range;

		if(new_start >= 1 && new_stop >= 1)
		{
			$(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(new_start);
			$(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(new_stop);
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
		var old_start = parseInt($(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val());
		var old_stop = parseInt($(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val());

		if(!old_start)
		{
			old_start = 1;
		}

		if(!old_stop)
		{
			old_stop = 15;
		}

		var range = (old_stop - old_start) + 1;

		var new_start = old_start + range;
		var new_stop = old_stop + range;

		if(new_start >= 1 && new_stop >= 1)
		{
			$(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(new_start);
			$(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(new_stop);
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

	},

	/*-----------------------------------------------------------------*/

	setMode: function()
	{
		if($(this.patchId('#DDC32238_DD25_8354_AC6C_F6E27CA6E18D')).prop('checked'))
		{
			alert('on');
		}
		else
		{
			alert('off');
		}
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
