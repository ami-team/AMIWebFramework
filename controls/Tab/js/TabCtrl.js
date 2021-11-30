/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
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

	$implements: [ami.IContainer],

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
			`${amiWebApp.originURL}/controls/Tab/twig/TabCtrl.twig`,
			`${amiWebApp.originURL}/controls/Tab/twig/item.twig`,
			`${amiWebApp.originURL}/controls/Tab/twig/tab.twig`,
		]).done((data) => {

			this._twigTabCtrl = data[0];
			this._twigItem = data[1];
			this._twigTab = data[2];
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(selector, options)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		this.setupCtx(
			{}, {
				context: result,
				/**/
				card: true,
				closable: true,
				firstVisible: true,
			},
			options
		);

		/*------------------------------------------------------------------------------------------------------------*/

		const dict = {
			card: this.ctx.card
		};

		this.replaceHTML(this.setSelector(selector), this._twigTabCtrl, {dict: dict}).done(() => {

			result.resolveWith(this.ctx.context);
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_getTabEl: function(tabId)
	{
		return $(`${this.getSelector()} .nav-link[href="#${tabId}"]:parent`);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_getLinkEl: function(tabId)
	{
		return $(`${this.getSelector()} .nav-link[href="#${tabId}"]`);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_getPaneEl: function(tabId)
	{
		return $(`${this.getSelector()} .tab-pane#${tabId}`);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_xxxItem: function(mode, title, options)
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
				this.ctx.closable,
				this.ctx.firstVisible,
			],
			options
		);

		/*------------------------------------------------------------------------------------------------------------*/

		const itemId = `${this.patchId('F3EF6D3D_723B_F5FB_F299_E0AA9CA0914D')}_${this._cnt}`;

		const dict = {
			id: itemId,
			title: title,
			height: height,
			closable: closable,
		};

		/*------------------------------------------------------------------------------------------------------------*/

		let promise1;
		let promise2;

		const tabSelector = this.ctx.card ? '.card > .card-header > .nav-tabs' : '.nav-tabs';
		const contentSelector = this.ctx.card ? '.card > .card-body > .tab-content' : '.tab-content';

		if(mode === 0)
		{
			promise1 = this.prependHTML(`${this.getSelector()} > ${tabSelector}`, this._twigTab, {dict: dict});
			promise2 = this.prependHTML(`${this.getSelector()} > ${contentSelector}`, this._twigItem, {dict: dict});
		}
		else
		{
			promise1 = this.appendHTML(`${this.getSelector()} > ${tabSelector}`, this._twigTab, {dict: dict});
			promise2 = this.appendHTML(`${this.getSelector()} > ${contentSelector}`, this._twigItem, {dict: dict});
		}

		promise1.done(() => {
			promise2.done(() => {

				/*----------------------------------------------------------------------------------------------------*/

				this._getLinkEl(itemId).on('show.bs.tab', (e) => {

					this._previousActiveTab = e.relatedTarget ? $(e.relatedTarget).attr('href').substring(1) : '';
				});

				/*----------------------------------------------------------------------------------------------------*/

				this._getTabEl(itemId).find('.bi-x').click((e) => {

					this.removeTab(itemId);

					e.preventDefault();
				});

				/*----------------------------------------------------------------------------------------------------*/

				if(this._cnt++ === 0 || active)
				{
					this._getLinkEl(itemId).tab('show');
				}

				/*----------------------------------------------------------------------------------------------------*/

				const els = $(`${this.getSelector()} > ${tabSelector}`);

				if(els.length === 1 && firstVisible === false) {
					els.hide();
				}
				else {
					els.show();
				}

				/*----------------------------------------------------------------------------------------------------*/

				result.resolveWith(context, [`#${itemId}`]);

				/*----------------------------------------------------------------------------------------------------*/
			});
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	prependItem: function(title, options)
	{
		return this._xxxItem(0, title, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	appendItem: function(title, options)
	{
		return this._xxxItem(1, title, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	removeItem: function(itemId)
	{
		this._getTabEl(itemId).remove();

		this._getPaneEl(itemId).remove();

		if(this._previousActiveTab)
		{
			this._getLinkEl(this._previousActiveTab).tab('show');
		}
		else
		{
			$(`${this.getSelector()} .nav-link:first`).tab('show');
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	removeAll: function()
	{
		$(`${this.getSelector()} .nav-tabs`).empty();

		$(`${this.getSelector()} .tab-content`).empty();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	isEmpty: function()
	{
		return $(`${this.getSelector()} .nav-tabs`).is(':empty')
		       ||
		       $(`${this.getSelector()} .nav-content`).is(':empty')
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
