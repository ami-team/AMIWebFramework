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

$AMIClass('TabCtrl', {
	/*---------------------------------------------------------------------*/

	$extends: ami.Control,

	/*---------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);

		this._previousActiveTab = '';

		this._cnt = 0;
	},

	/*---------------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/Tab/twig/TabCtrl.twig',
			amiWebApp.originURL + '/controls/Tab/twig/nav_item.twig',
			amiWebApp.originURL + '/controls/Tab/twig/tab_pane.twig',
		], {context: this}).done(function(data) {

			this.fragmentTabCtrl = data[0];
			this.fragmentNavItem = data[1];
			this.fragmentTabPane = data[2];
		});
	},

	/*---------------------------------------------------------------------*/

	render: function(selector, settings)
	{
		var result = $.Deferred();

		this._context = result;
		this._card = true;
		this._closable = true;

		if(settings)
		{
			if('context' in settings) {
				this._context = settings['context'];
			}

			if('card' in settings) {
				this._card = settings['card'];
			}

			if('closable' in settings) {
				this._closable = settings['closable'];
			}
		}

		var dict = {
			'card': this._card
		};

		this.replaceHTML(this._selector = selector, this.fragmentTabCtrl, {context: this, dict: dict}).done(function() {

			result.resolveWith(this._context);
		});

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	_getTabEl: function(tabId)
	{
		return $(this._selector + ' .nav-link[href="#' + tabId + '"]:parent');
	},

	/*---------------------------------------------------------------------*/

	_getLinkEl: function(tabId)
	{
		return $(this._selector + ' .nav-link[href="#' + tabId + '"]');
	},

	/*---------------------------------------------------------------------*/

	_getPaneEl: function(tabId)
	{
		return $(this._selector + ' #' + tabId);
	},

	/*---------------------------------------------------------------------*/

	prependItem: function(title, settings)
	{
		var result = $.Deferred();

		var context = result;
		var height = 'auto';
		var active = true;
		var closable = this._closable;

		if(settings)
		{
			if('context' in settings) {
	  			context = settings['context'];
			}

			if('height' in settings) {
				height = settings['height'];
			}

			if('active' in settings) {
				active = settings['active'];
			}

			if('closable' in settings) {
				closable = settings['closable'];
			}
		}

		/*-----------------------------------------------------------------*/

		var tabId = this.patchId('F3EF6D3D_723B_F5FB_F299_E0AA9CA0914D') + '_' + this._cnt;

		var dict = {
			id: tabId,
			title: title,
			height: height,
			closable: closable,
		};

		/*-----------------------------------------------------------------*/

		var _this = this;

		this.prependHTML(this._selector + ' > .nav-tabs', this.fragmentNavItem, {context: this, dict: dict}).done(function() {
			this.prependHTML(this._selector + ' > .tab-content', this.fragmentTabPane, {context: this, dict: dict}).done(function() {

				/*---------------------------------------------------------*/

				this._getTabEl(tabId).find('.fa-times').click(function(e) {

					_this.removeTab(tabId);

					e.preventDefault();
				});

				/*---------------------------------------------------------*/

				this._getLinkEl(tabId).on('show.bs.tab', function(e) {

					_this._previousActiveTab = e.relatedTarget ? $(e.relatedTarget).attr('href').substring(1) : '';
				});

				/*---------------------------------------------------------*/

				if(this._cnt++ === 0 || active)
				{
					this._getLinkEl(tabId).tab('show');
				}

				/*---------------------------------------------------------*/

				result.resolveWith(context, ['#' + tabId]);

				/*---------------------------------------------------------*/
			});
		});

		/*-----------------------------------------------------------------*/

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	appendItem: function(title, settings)
	{
		var result = $.Deferred();

		var context = result;
		var height = 'auto';
		var active = true;
		var closable = this._closable;

		if(settings)
		{
			if('context' in settings) {
	  			context = settings['context'];
			}

			if('height' in settings) {
				height = settings['height'];
			}

			if('active' in settings) {
				active = settings['active'];
			}

			if('closable' in settings) {
				closable = settings['closable'];
			}
		}

		/*-----------------------------------------------------------------*/

		var tabId = this.patchId('F3EF6D3D_723B_F5FB_F299_E0AA9CA0914D') + '_' + this._cnt;

		var dict = {
			id: tabId,
			title: title,
			height: height,
			closable: closable,
		};

		/*-----------------------------------------------------------------*/

		var _this = this;

		this.appendHTML(this._selector + ' > .nav-tabs', this.fragmentNavItem, {context: this, dict: dict}).done(function() {
			this.appendHTML(this._selector + ' > .tab-content', this.fragmentTabPane, {context: this, dict: dict}).done(function() {

				/*---------------------------------------------------------*/

				this._getTabEl(tabId).find('.fa-times').click(function(e) {

					_this.removeTab(tabId);

					e.preventDefault();
				});

				/*---------------------------------------------------------*/

				this._getLinkEl(tabId).on('show.bs.tab', function(e) {

					_this._previousActiveTab = e.relatedTarget ? $(e.relatedTarget).attr('href').substring(1) : '';
				});

				/*---------------------------------------------------------*/

				if(this._cnt++ === 0 || active)
				{
					this._getLinkEl(tabId).tab('show');
				}

				/*---------------------------------------------------------*/

				result.resolveWith(context, ['#' + tabId]);

				/*---------------------------------------------------------*/
			});
		});

		/*-----------------------------------------------------------------*/

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	removeTab: function(tabId)
	{
		this._getTabEl(tabId).remove();

		this._getPaneEl(tabId).remove();

		if(this._previousActiveTab)
		{
			this._getLinkEl(this._previousActiveTab).tab('show');
		}
		else
		{
			$(this._selector + ' .nav-link:first').tab('show');
		}
	},

	/*---------------------------------------------------------------------*/

	removeTabs: function()
	{
		$(this._selector + ' .nav-tabs').empty();

		$(this._selector + ' .tab-content').empty();
	},

	/*---------------------------------------------------------------------*/

	isEmpty: function()
	{
		return $(this._selector + ' .nav-tabs').is(':empty')
		       ||
		       $(this._selector + ' .nav-content').is(':empty')
		;
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
