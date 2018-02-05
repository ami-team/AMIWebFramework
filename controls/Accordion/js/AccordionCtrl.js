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
	/*-----------------------------------------------------------------*/

	$extends: ami.Control,

	/*-----------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);

		this._cnt = 0;
	},

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

	render: function(selector, settings)
	{
		this._context = this;
		this._card = false;
		this._cardHeader = false;
		this._closable = true;
		this._collapseAll = false;

		if(settings)
		{
			if('context' in settings) {
				this._context = settings['context'];
			}

			if('card' in settings) {
				this._card = settings['card'];
			}

			if('cardHeader' in settings) {
				this._cardHeader = settings['cardHeader'];
			}

			if('closable' in settings) {
				this._closable = settings['closable'];
			}
		}

		var dict = {
			card: this._card,
			cardHeader: this._cardHeader,
			closable: this._closable,
		};

		var _this = this;

		return this.replaceHTML(this._selector = selector, this.fragmentAccordionCtrl, {context: this._context, dict: dict}).done(function(e){

			/*-----------------------------------------*/

			$("#idCollapse").click(function(e){

				_this.collapseAll();
			});

			$("#idRemoveAll").click(function(e){

				_this.removeAll(_this._selector);
			});

		});
	},

	/*-----------------------------------------------------------------*/

	prependItem: function(title, settings)
	{
		var result = $.Deferred();

		var context = result;

		var show = false;

		var closable = this._closable;

		if(settings)
		{
			if('context' in settings) {
				context = settings['context'];
			}

			if('show' in settings) {
				show = settings['show'];
			}

			if('closable' in settings) {
				closable = settings['closable'];
			}
		}

		/*---------------------------------------------------------*/

		var id = this.patchId('C9FA6E82_464D_DB5C_554E_6318EC8DC711') + '_' + this._cnt;

		var dict = {
			id: id,
			item_title: title,
			card:this._card,
			closable: closable,
		};

		this._cnt++;

		/*---------------------------------------------------------*/

		var _this = this;

		this.prependHTML(this._selector + ' > div', this.fragmentAccordionItem, {context: this, dict: dict}).done(function() {

			/*-----------------------------------------*/

			$("#"+id+"_remove").click(function(e){

				_this.removeItem("#"+id);
			});

			/*-----------------------------------------*/

			if (show) {
				$('#' + id + '_collaspe').collapse('show');
			}

			/*-----------------------------------------*/

			result.resolveWith(context, ['#' + id + '_content']);

			/*-----------------------------------------*/
		});

		/*---------------------------------------------------------*/

		return result.promise();
	},
	/*-----------------------------------------------------------------*/

	appendItem: function(title, settings)
	{
		var result = $.Deferred();

		var context = result;

		var show = false;

		var closable = this._closable;

		if(settings)
		{
			if('context' in settings) {
	  			context = settings['context'];
			}

			if('show' in settings) {
				show = settings['show'];
			}

			if('closable' in settings) {
				closable = settings['closable'];
			}
		}

		/*---------------------------------------------------------*/

		var id = this.patchId('C9FA6E82_464D_DB5C_554E_6318EC8DC711') + '_' + this._cnt;

		var dict = {
			id: id,
			item_title: title,
			card: this._card,
			closable: closable,
		};

		this._cnt++;

		/*---------------------------------------------------------*/

		var _this = this;

		this.appendHTML(this._selector + ' > div', this.fragmentAccordionItem, {context: this, dict: dict}).done(function() {

			/*-----------------------------------------*/

			$("#"+id+"_remove").click(function(e){

				_this.removeItem("#"+id);
			});

			/*-----------------------------------------*/

			if (show) {
				$('#' + id + '_collapse').collapse('show');
			}

			/*-----------------------------------------*/

			result.resolveWith(context, ['#' + id + '_content']);

			/*-----------------------------------------*/
		});

		/*---------------------------------------------------------*/

		return result.promise();
	},

	/*-----------------------------------------------------------------*/

	removeItem: function(selector){

		$(selector+"_heading").remove();
		$(selector+"_collapse").remove();

	},
	/*-----------------------------------------------------------------*/

	removeAll: function(selector){

		$(selector+" .card").children(".body").remove();

	},

	/*-----------------------------------------------------------------*/

	collapseAll: function(){

		if(this._collapseAll){
			$(".card").children(".body").children( ".collapse" ).attr("class", "collapse");
			this._collapseAll = false;
		} else {
			$(".card").children(".body").children( ".collapse" ).attr("class", "collapse show");
			this._collapseAll = true;
		}
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
