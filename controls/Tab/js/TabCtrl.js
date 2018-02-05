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
			amiWebApp.originURL + '/controls/Tab/twig/TabCtrl.twig',
			amiWebApp.originURL + '/controls/Tab/twig/nav_item.twig',
			amiWebApp.originURL + '/controls/Tab/twig/tab_pane.twig',
		], {context: this}).done(function(data) {

			this.fragmentTabCtrl = data[0];
			this.fragmentNavItem = data[1];
			this.fragmentTabPane = data[2];
		});
	},

	/*-----------------------------------------------------------------*/

	render: function(selector, settings)
	{
		this._closable = true;

		if(settings)
		{
			if('closable' in settings) {
				this._closable = settings['closable'];
			}

			settings['dict'] = {card: settings['card']};
		}

		return this.replaceHTML(this._selector = selector, this.fragmentTabCtrl, settings);
	},

	/*-----------------------------------------------------------------*/

	_getTabEl: function(tabId)
	{
		return $(this._selector + ' .nav-link[href="#' + tabId + '"]:parent');
	},

	/*-----------------------------------------------------------------*/

	_getPaneEl: function(tabId)
	{
		return $(this._selector + ' #' + tabId);
	},

	/*-----------------------------------------------------------------*/

	prependTab: function(title, settings)
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

		/*---------------------------------------------------------*/

		var tabId = this.patchId('F3EF6D3D_723B_F5FB_F299_E0AA9CA0914D') + '_' + this._cnt;

		var dict = {
			id: tabId,
			title: title,
			height: height,
			active: active || this._cnt === 0,
			closable: closable,
		};

		this._cnt++;

		/*---------------------------------------------------------*/

		if(active)
		{
			$(this._selector + ' .nav-link').removeClass('active')
			                                .addClass('xxxxxx')
			;

			$(this._selector + ' .tab-pane').removeClass('active')
			                                .addClass('xxxxxx')
			;
		}

		/*---------------------------------------------------------*/

		var _this = this;

		this.prependHTML(this._selector + ' .nav-tabs', this.fragmentNavItem, {context: this, dict: dict}).done(function() {
			this.prependHTML(this._selector + ' .tab-content', this.fragmentTabPane, {context: this, dict: dict}).done(function() {

				/*-----------------------------------------*/

				this._getTabEl(tabId).find('.fa-times').click(function(e) {

					_this.removeTab(tabId);

					e.preventDefault();
				});

				/*-----------------------------------------*/

				result.resolveWith(context, ['#' + tabId]);

				/*-----------------------------------------*/
			});
		});

		/*---------------------------------------------------------*/

		return result.promise();
	},

	/*-----------------------------------------------------------------*/

	appendTab: function(title, settings)
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

		/*---------------------------------------------------------*/

		var tabId = this.patchId('F3EF6D3D_723B_F5FB_F299_E0AA9CA0914D') + '_' + this._cnt;

		var dict = {
			id: tabId,
			title: title,
			height: height,
			active: active || this._cnt === 0,
			closable: closable,
		};

		this._cnt++;

		/*---------------------------------------------------------*/

		if(active)
		{
			$(this._selector + ' .nav-link').removeClass('active')
			                                .addClass('xxxxxx')
			;

			$(this._selector + ' .tab-pane').removeClass('active')
			                                .addClass('xxxxxx')
			;
		}

		/*---------------------------------------------------------*/

		var _this = this;

		this.appendHTML(this._selector + ' .nav-tabs', this.fragmentNavItem, {context: this, dict: dict}).done(function() {
			this.appendHTML(this._selector + ' .tab-content', this.fragmentTabPane, {context: this, dict: dict}).done(function() {

				/*-----------------------------------------*/

				this._getTabEl(tabId).find('.fa-times').click(function(e) {

					_this.removeTab(tabId);

					e.preventDefault();
				});

				/*-----------------------------------------*/

				result.resolveWith(context, ['#' + tabId]);

				/*-----------------------------------------*/
			});
		});

		/*---------------------------------------------------------*/

		return result.promise();
	},

	/*-----------------------------------------------------------------*/

	removeTab: function(tabId)
	{
		this._getTabEl(tabId).remove();

		this._getPaneEl(tabId).remove();
	},

	/*-----------------------------------------------------------------*/

	removeTabs: function()
	{
		$(this._selector + ' .nav-tabs').empty();

		$(this._selector + ' .tab-content').empty();
	},

	/*-----------------------------------------------------------------*/

	showTabs: function(visible)
	{
		if(visible)
		{
			$(this._selector + ' .nav-tabs').show();
		}
		else
		{
			$(this._selector + ' .nav-tabs').hide();
		}
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
