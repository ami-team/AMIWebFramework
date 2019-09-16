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

$AMIClass('SimpleSearchCtrl', {

	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.Control,

	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/SimpleSearch/twig/SimpleSearchCtrl.twig',
			'ctrl:tab',
		], {context: this}).done(function(data) {

			this.fragmentSimpleSearch = data[0];

			this.tabCtrl = data[1];
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(selector, settings)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const fn = (catalog, entity, field, value) =>
			'BrowseQuery' + ' -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -mql="SELECT * WHERE `' + field + '` = \'' + value+ '\'"'
		;

		/*------------------------------------------------------------------------------------------------------------*/

		const [
			context,
			placeholder,
			catalog, entity, field,
			searchCommandFunc,
			card
		] = amiWebApp.setup(
			[
				'context',
				'placeholder',
				'catalog', 'entity', 'field',
				'searchCommandFunc',
				'card',
			],
			[
				result,
				'',
				'', '', '',
				fn,
				false,
			],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		this.ctx = {};

		for(let key in settings)
		{
		    this.ctx[key] = settings[key];
		}

		/*------------------------------------------------------------------------------------------------------------*/

		this.ctx.isEmbedded = amiWebApp.isEmbedded();

		this.ctx.endpoint = amiCommand.endpoint;

		this.ctx.context = context;

		this.ctx.placeholder = placeholder;

		this.ctx.catalog = catalog;
		this.ctx.entity = entity;
		this.ctx.field = field;

		this.ctx.searchCommandFunc = searchCommandFunc;

		this.ctx.card = card;

		/*------------------------------------------------------------------------------------------------------------*/

		this._render(result, selector);

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_render: function(result, selector)
	{
		if(this.getParent().$name !== 'TabCtrl')
		{
			const tab = new this.tabCtrl(null, this);

			tab.render(selector, this.ctx).done(() => {

				tab.appendItem('<i class="fa fa-search"></i> ' + this.ctx.entity, {closable: false, firstVisible: false}).done((selector) => {

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

	/*----------------------------------------------------------------------------------------------------------------*/

	__render: function(result, selector)
	{
		this.replaceHTML(selector, this.fragmentSimpleSearch, {dict: this.ctx}).done(() => {

			/*--------------------------------------------------------------------------------------------------------*/

			$(this.patchId('#E8F152B0_66C6_132C_0155_955D36654C13')).submit((e) => {

				e.preventDefault();

				const value = $(this.patchId('#F8D8C2FB_81D9_F7A0_121B_6FB2949F8DB6')).val().trim();

				if(value)
				{
					this.search();
				}
			});

			/*--------------------------------------------------------------------------------------------------------*/

			result.resolveWith(this.ctx.context);

			/*--------------------------------------------------------------------------------------------------------*/
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	search: function(value)
	{
		return amiWebApp.createControlInContainer(this.getParent(), this, 'table', [this.ctx.searchCommandFunc(this.ctx.catalog, this.ctx.entity, this.ctx.field, value.trim())], {}, this.ctx, 'table', this.ctx.entity);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
