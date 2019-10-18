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

		const fn = (catalog, entity, fields, value) => {

			const select = fields.length === 0 ? ['0 = 1']
			                                   : (value.indexOf('%') < 0) ? fields.map(field => field + ' = \'' + amiWebApp.textToSQL(value) + '\'')
			                                                              : fields.map(field => field + ' LIKE \'' + amiWebApp.textToSQL(value) + '\'')
			;

			return 'BrowseQuery' + ' -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -mql="SELECT * WHERE ' + select.join(' OR ') + '"';
		};

		/*------------------------------------------------------------------------------------------------------------*/

		const [
			context,
			placeholder,
			catalog, defaultCatalog,
			entity, defaultEntity,
			fields, criterias,
			searchCommandFunc,
			card
		] = amiWebApp.setup(
			[
				'context',
				'placeholder',
				'catalog', 'defaultCatalog',
				'entity', 'defaultEntity',
				'fields', 'criterias',
				'searchCommandFunc',
				'card',
			],
			[
				result,
				'',
				'', '',
				'', '',
				[], [],
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

		this.ctx.catalog = defaultCatalog ? defaultCatalog : catalog;
		this.ctx.entity = defaultEntity ? defaultEntity : entity;

		this.ctx.fields = criterias.length > 0 ? criterias.filter(criteria => criteria.more.simple_search).map(criteria => '`' + criteria.catalog + '`.`' + criteria.entity + '`.`' + criteria.field + '`')
		                                       : fields
		;

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
					this.search(value);
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
		return amiWebApp.createControlInContainer(this.getParent(), this, 'table', [this.ctx.searchCommandFunc(this.ctx.catalog, this.ctx.entity, this.ctx.fields, value)], {}, this.ctx, 'table', this.ctx.entity);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
