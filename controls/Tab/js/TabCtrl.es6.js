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

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('TabCtrl', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.Control,

	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);

		this._previousActiveTab = '';

		this._cnt = 0;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/Tab/twig/TabCtrl.twig',
			amiWebApp.originURL + '/controls/Tab/twig/nav_item.twig',
			amiWebApp.originURL + '/controls/Tab/twig/tab_pane.twig',
		]).done((data) => {

			this.fragmentTabCtrl = data[0];
			this.fragmentNavItem = data[1];
			this.fragmentTabPane = data[2];
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(selector, settings)
	{
		const result = $.Deferred();

		[
			this._context,
			this._card,
			this._closable,
			this._firstVisible,
		] = amiWebApp.setup(
			[
				'context',
				'card',
				'closable',
				'firstVisible',
			],
			[
				result,
				true,
				true,
				true,
			],
			settings
		);

		const dict = {
			'card': this._card
		};

		this.replaceHTML(this._selector = selector, this.fragmentTabCtrl, {dict: dict}).done(() => {

			result.resolveWith(this._context);
		});

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_getTabEl: function(tabId)
	{
		return $(this._selector + ' .nav-link[href="#' + tabId + '"]:parent');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_getLinkEl: function(tabId)
	{
		return $(this._selector + ' .nav-link[href="#' + tabId + '"]');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_getPaneEl: function(tabId)
	{
		return $(this._selector + ' #' + tabId);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	prependItem: function(title, settings)
	{
		const result = $.Deferred();

		const [
			context,
			height,
			active,
			closable,
			firstVisible
		] = amiWebApp.setup(
			[
				'context',
				'height',
				'active',
				'closable',
				'firstVisible',
			],
			[
				result,
				'auto',
				true,
				this._closable,
				this._firstVisible,
			],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		const tabId = this.patchId('F3EF6D3D_723B_F5FB_F299_E0AA9CA0914D') + '_' + this._cnt;

		const dict = {
			id: tabId,
			title: title,
			height: height,
			closable: closable,
		};

		/*------------------------------------------------------------------------------------------------------------*/

		const tabSelector = this._card ? '.card > .card-header > .nav-tabs' : '.nav-tabs';
		const contentSelector = this._card ? '.card > .card-body > .tab-content' : '.tab-content';

		this.prependHTML(this._selector + ' > ' + tabSelector, this.fragmentNavItem, {dict: dict}).done(() => {
			this.prependHTML(this._selector + ' > ' + contentSelector, this.fragmentTabPane, {dict: dict}).done(() => {

				/*----------------------------------------------------------------------------------------------------*/

				this._getTabEl(tabId).find('.fa-times').click((e) => {

					this.removeTab(tabId);

					e.preventDefault();
				});

				/*----------------------------------------------------------------------------------------------------*/

				this._getLinkEl(tabId).on('show.bs.tab', (e) => {

					this._previousActiveTab = e.relatedTarget ? $(e.relatedTarget).attr('href').substring(1) : '';
				});

				/*----------------------------------------------------------------------------------------------------*/

				if(this._cnt++ === 0 || active)
				{
					this._getLinkEl(tabId).tab('show');
				}

				/*----------------------------------------------------------------------------------------------------*/

				const els = $(this._selector + ' > ' + tabSelector);

				if(els.length === 1 && firstVisible === false) {
					els.hide();
				}
				else {
					els.show();
				}

				/*----------------------------------------------------------------------------------------------------*/

				result.resolveWith(context, ['#' + tabId]);

				/*----------------------------------------------------------------------------------------------------*/
			});
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	appendItem: function(title, settings)
	{
		const result = $.Deferred();

		const [
			context,
			height,
			active,
			closable,
			firstVisible
		] = amiWebApp.setup(
			[
				'context',
				'height',
				'active',
				'closable',
				'firstVisible',
			],
			[
				result,
				'auto',
				true,
				this._closable,
				this._firstVisible,
			],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		const tabId = this.patchId('F3EF6D3D_723B_F5FB_F299_E0AA9CA0914D') + '_' + this._cnt;

		const dict = {
			id: tabId,
			title: title,
			height: height,
			closable: closable,
		};

		/*------------------------------------------------------------------------------------------------------------*/

		const tabSelector = this._card ? '.card > .card-header > .nav-tabs' : '.nav-tabs';
		const contentSelector = this._card ? '.card > .card-body > .tab-content' : '.tab-content';

		this.appendHTML(this._selector + ' > ' + tabSelector, this.fragmentNavItem, {dict: dict}).done(() => {
			this.appendHTML(this._selector + ' > ' + contentSelector, this.fragmentTabPane, {dict: dict}).done(() => {

				/*----------------------------------------------------------------------------------------------------*/

				this._getTabEl(tabId).find('.fa-times').click((e) => {

					this.removeTab(tabId);

					e.preventDefault();
				});

				/*----------------------------------------------------------------------------------------------------*/

				this._getLinkEl(tabId).on('show.bs.tab', (e) => {

					this._previousActiveTab = e.relatedTarget ? $(e.relatedTarget).attr('href').substring(1) : '';
				});

				/*----------------------------------------------------------------------------------------------------*/

				if(this._cnt++ === 0 || active)
				{
					this._getLinkEl(tabId).tab('show');
				}

				/*----------------------------------------------------------------------------------------------------*/

				const els = $(this._selector + ' > ' + tabSelector);

				if(els.length === 1 && firstVisible === false) {
					els.hide();
				}
				else {
					els.show();
				}

				/*----------------------------------------------------------------------------------------------------*/

				result.resolveWith(context, ['#' + tabId]);

				/*----------------------------------------------------------------------------------------------------*/
			});
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

	removeTabs: function()
	{
		$(this._selector + ' .nav-tabs').empty();

		$(this._selector + ' .tab-content').empty();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	isEmpty: function()
	{
		return $(this._selector + ' .nav-tabs').is(':empty')
		       ||
		       $(this._selector + ' .nav-content').is(':empty')
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
