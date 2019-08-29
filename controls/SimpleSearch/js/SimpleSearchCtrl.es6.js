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

$AMIClass('SimpleSearchCtrl', {
	/*---------------------------------------------------------------------*/

	$extends: ami.Control,

	/*---------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);
	},

	/*---------------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/SimpleSearch/twig/SimpleSearchCtrl.twig',
			'ctrl:table',
		], {context: this}).done(function(data) {

			this.fragmentSimpleSearch = data[0];

			this._tableCtrl = data[1];
		});
	},

	/*---------------------------------------------------------------------*/

	render: function(selector, settings)
	{
		const result = $.Deferred();

		/*-----------------------------------------------------------------*/

		const fn = (catalog, entity, field, value) =>
			'BrowseQuery' + ' -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -mql="SELECT * WHERE `' + field + '` = \'' + value+ '\'"'
		;

		/*-----------------------------------------------------------------*/

		const [
			context,
			catalog, entity, field,
			searchCommandFunc,
			card
		] = amiWebApp.setup(
			[
				'context',
				'catalog', 'entity', 'field',
				'searchCommandFunc',
				'card',
			],
			[
				result,
				'', '', '',
				fn,
				false,
			],
			settings
		);

		/*-----------------------------------------------------------------*/

		this.ctx.context = context;

		this.ctx.catalog = catalog;
		this.ctx.entity = entity;
		this.ctx.field = field;

		this.ctx.searchCommandFunc = searchCommandFunc;

		this.ctx.card = card;

		/*-----------------------------------------------------------------*/

		this._render(result, selector);

		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/

	_render: function(result, selector)
	{
		if(this.getParent().$name !== 'TabCtrl')
		{
			const tab = new this.tabCtor(null, this);

			tab.render(selector, this.ctx).done(() => {

				tab.appendItem('<i class="fa fa-table"></i> ' + this.ctx.entity, {closable: false, firstVisible: false}).done((selector) => {

					this.setParent(tab);

					this.__render(result, selector);
				});
			});
		}
		else
		{
			this.__render(result, selector);
		}
	},

	/*---------------------------------------------------------------------*/

	__render: function(result, selector)
	{
		this.replaceHTML(selector, this.fragmentSimpleSearch, settings).done(() => {

			/*-------------------------------------------------------------*/

			$(this.patchId('#E8F152B0_66C6_132C_0155_955D36654C13')).submit((e) => {

				e.preventDefault();

				this.search();
			});

			/*-------------------------------------------------------------*/

			result.resolveWith(this.ctx.context);

			/*-------------------------------------------------------------*/
		});
	},

	/*---------------------------------------------------------------------*/

	search: function()
	{
		return new this._tableCtrl(parent, this).render(selector, this.ctx.searchCommandFunc(this.ctx.catalog, this.ctx.entity, this.ctx.field), this.ctx);
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
