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

	$init: function()
	{
		this.$super.$init();

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
		var _this = this;

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		var tabId = this.patchId('F3EF6D3D_723B_F5FB_F299_E0AA9CA0914D') + '_' + this._cnt;

		var dict = {
			id: tabId,
			title: title,
			active: this._cnt === 0,
		};

		this._cnt++;

		/*---------------------------------------------------------*/

		this.prependHTML(this._selector + ' .nav-tabs', this.fragmentNavItem, {context: this, dict: dict}).done(function() {
			this.prependHTML(this._selector + ' .tab-content', this.fragmentTabPane, {context: this, dict: dict}).done(function() {

				this._getTabEl(tabId).find('.fa-times').click(function(e) {

					e.preventDefault();

					_this.removeTab(tabId);
				});

				result.resolveWith(settings && settings['context'] ? settings['context'] : result, [tabId]);
			});
		});

		/*---------------------------------------------------------*/

		return result.promise();
	},

	/*-----------------------------------------------------------------*/

	appendTab: function(title, settings)
	{
		var _this = this;

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		var tabId = this.patchId('F3EF6D3D_723B_F5FB_F299_E0AA9CA0914D') + '_' + this._cnt;

		var dict = {
			id: tabId,
			title: title,
			active: this._cnt === 0,
		};

		this._cnt++;

		/*---------------------------------------------------------*/

		this.appendHTML(this._selector + ' .nav-tabs', this.fragmentNavItem, {context: this, dict: dict}).done(function() {
			this.appendHTML(this._selector + ' .tab-content', this.fragmentTabPane, {context: this, dict: dict}).done(function() {

				this._getTabEl(tabId).find('.fa-times').click(function(e) {

					e.preventDefault();

					_this.removeTab(tabId);
				});

				result.resolveWith(settings && settings['context'] ? settings['context'] : result, [tabId]);
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
});

/*-------------------------------------------------------------------------*/
