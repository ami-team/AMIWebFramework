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

$AMIClass('AccordionCtrl', {
	/*---------------------------------------------------------------------*/

	$extends: ami.Control,

	/*---------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);

		this._collapsed = false;

		this._cnt = 0;
	},

	/*---------------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/Accordion/twig/AccordionCtrl.twig',
			amiWebApp.originURL + '/controls/Accordion/twig/accordion_item.twig',
		], {context: this}).done(function(data) {

			this.fragmentAccordionCtrl = data[0];
			this.fragmentAccordionItem = data[1];
		});
	},

	/*---------------------------------------------------------------------*/

	render: function(selector, settings)
	{
		var result = $.Deferred();

		this._context = result;
		this._toolbar = false;
		this._clazz = null;
		this._closable = true;

		if(settings)
		{
			if('context' in settings) {
				this._context = settings['context'];
			}

			if('toolbar' in settings) {
				this._toolbar = settings['toolbar'];
			}

			if('clazz' in settings) {
				this._clazz = settings['clazz'];
			}

			if('closable' in settings) {
				this._closable = settings['closable'];
			}
		}

		var dict = {
			toolbar: this._toolbar,
		};

		this.replaceHTML(this._selector = selector, this.fragmentAccordionCtrl, {context: this, dict: dict}).done(function() {

			var _this = this;

			/*-------------------------------------------------------------*/

			$(this.patchId('#FE73B120_F051_EC64_29BC_911239F6F120')).click(function() {

				_this.collapseAll();
			});

			$(this.patchId('#B1E0F1F1_C9A0_7D80_3580_2E314B8735D1')).click(function() {

				_this.removeAll();
			});

			/*-------------------------------------------------------------*/

			result.resolveWith(this._context);

			/*-------------------------------------------------------------*/
		});

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	prependItem: function(title, settings)
	{
		var result = $.Deferred();

		var context = result;
		var show = false;
		var clazz = this._clazz;
		var closable = this._closable;
		var extraTitle = '';

		if(settings)
		{
			if('context' in settings) {
				context = settings['context'];
			}

			if('show' in settings) {
				show = settings['show'];
			}

			if('clazz' in settings) {
				clazz = settings['clazz'];
			}

			if('extraTitle' in settings) {
				extraTitle = settings['extraTitle'];
			}

			if('closable' in settings) {
				closable = settings['closable'];
			}
		}

		/*-----------------------------------------------------------------*/

		var id = this.patchId('C9FA6E82_464D_DB5C_554E_6318EC8DC711') + '_' + this._cnt++;

		var dict = {
			id: id,
			clazz: clazz,
			title: title,
			extraTitle: extraTitle,
			closable: closable,
		};

		/*-----------------------------------------------------------------*/

		this.prependHTML(this._selector, this.fragmentAccordionItem, {context: this, dict: dict}).done(function() {

			/*-------------------------------------------------------------*/

			$('#' + id + ' > .card-header > .close').click(function() {

				$('#' + id).remove();
			});

			/*-------------------------------------------------------------*/

			if(show)
			{
				$('#' + id + '_collapse').collapse('show');
			}

			/*-------------------------------------------------------------*/

			result.resolveWith(context, ['#' + id + '_collapse']);

			/*-------------------------------------------------------------*/
		});

		/*-----------------------------------------------------------------*/

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	appendItem: function(title, settings)
	{
		var result = $.Deferred();

		var context = result;
		var show = false;
		var clazz = this._clazz;
		var closable = this._closable;
		var extraTitle = '';

		if(settings)
		{
			if('context' in settings) {
				context = settings['context'];
			}

			if('show' in settings) {
				show = settings['show'];
			}

			if('clazz' in settings) {
				clazz = settings['clazz'];
			}

			if('extraTitle' in settings) {
				extraTitle = settings['extraTitle'];
			}

			if('closable' in settings) {
				closable = settings['closable'];
			}
		}

		/*-----------------------------------------------------------------*/

		var id = this.patchId('C9FA6E82_464D_DB5C_554E_6318EC8DC711') + '_' + this._cnt++;

		var dict = {
			id: id,
			title: title,
			extraTitle: extraTitle,
			clazz: clazz,
			closable: closable,
		};

		/*-----------------------------------------------------------------*/

		this.appendHTML(this._selector, this.fragmentAccordionItem, {context: this, dict: dict}).done(function() {

			/*-------------------------------------------------------------*/

			$('#' + id + ' > .card-header > .close').click(function() {

				$('#' + id).remove();
			});

			/*-------------------------------------------------------------*/

			if(show)
			{
				$('#' + id + '_collapse').collapse('show');
			}

			/*-------------------------------------------------------------*/

			result.resolveWith(context, ['#' + id + '_collapse']);

			/*-------------------------------------------------------------*/
		});

		/*-----------------------------------------------------------------*/

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	removeAll: function()
	{
		$(this._selector + ' > .card').remove();
	},

	/*---------------------------------------------------------------------*/

	collapseAll: function()
	{
		$(this._selector + ' > .card > .collapse').collapse((this._collapsed = !this._collapsed) ? 'hide' : 'show');
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
