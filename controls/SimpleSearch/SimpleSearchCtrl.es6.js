/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

import './assets/css/SimpleSearchCtrl.css';

import twigSimpleSearchCtrl from './assets/twig/SimpleSearchCtrl.twig';

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
			'ctrl:tab',
		]).done((data) => {

			this.fragmentSimpleSearch = twigSimpleSearchCtrl;

			this.tabCtrl = data[0];
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(selector, options)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const fn = (catalog, entity, scopes, scope, fields, value) => {

			const scopeClause = scopes.length === 0 ? ['0 = 1']
												: (scope.indexOf('%') < 0) ? scopes.map(field => `${field} = '${amiWebApp.textToSQL(scope)}'`)
												: scopes.map(field => `${field} LIKE '${amiWebApp.textToSQL(scope)}'`)
			;

			const select = fields.length === 0 ? ['0 = 1']
			                                   : (value.indexOf('%') < 0) ? fields.map(field => `${field} = '${amiWebApp.textToSQL(value)}'`)
					                           : fields.map(field => `${field} LIKE '${amiWebApp.textToSQL(value)}'`)
			;

			if(scopes.length === 0 || scope === '')
			{
				return `BrowseQuery -catalog="${amiWebApp.textToString(catalog)}" -entity="${amiWebApp.textToString(entity)}" -mql="SELECT * WHERE ${select.join(' OR ')}"`;
			}
			else
			{
				return `BrowseQuery -catalog="${amiWebApp.textToString(catalog)}" -entity="${amiWebApp.textToString(entity)}" -mql="SELECT * WHERE (${scopeClause.join(' OR ')}) AND (${select.join(' OR ')})"`;
			}

			};

		/*------------------------------------------------------------------------------------------------------------*/

		this.setupCtx(
			{
				isEmbedded: amiWebApp.isEmbedded(),
				endpoint: amiCommand.endpoint,
			},
			{
				context: result,
				placeholder: '% for wildcarding',
				defaultCatalog: '',
				defaultEntity: '',

				scopes: [], fields: [], criteria: [],

				searchCommandFunc: fn,
				card: false,
			},
			options
		);

		console.log(JSON.stringify(this.ctx));
		console.log(JSON.stringify(this.ctx.more));
		console.log(JSON.stringify(options));

		/*------------------------------------------------------------------------------------------------------------*/

		if(this.ctx.scopes.length === 0)
		{
			this.ctx.scopes = this.ctx.criteria.filter(criterion => criterion.more.simple_search && criterion.more.scope).map(criterion => `\`${criterion.catalog}\`.\`${criterion.entity}\`.\`${criterion.field}\``);
		}

		if(this.ctx.fields.length === 0)
		{
			this.ctx.fields = this.ctx.criteria.filter(criterion => criterion.more.simple_search && !criterion.more.scope).map(criterion => `\`${criterion.catalog}\`.\`${criterion.entity}\`.\`${criterion.field}\``);
		}

		this.ctx.catalog = this.ctx.defaultCatalog;
		this.ctx.entity = this.ctx.defaultEntity;

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

				tab.appendItem(`<i class="bi bi-search"></i> ${this.ctx.entity}`, {closable: false, firstVisible: false}).done((selector) => {

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
		let scope = this.ctx.more.defaultScope ? this.ctx.more.defaultScope : '';

		if(this.ctx.more.searchPattern && (this.ctx.more.scopeGroupIndex > 0))
		{
			if(value.match(this.ctx.more.searchPattern))
			{
				scope = value.match(this.ctx.more.searchPattern)[this.ctx.more.scopeGroupIndex];
			}
		}

		return amiWebApp.createControlInContainer(this.getParent(), this, 'table', [this.ctx.searchCommandFunc(this.ctx.defaultCatalog, this.ctx.defaultEntity, this.ctx.scopes, scope, this.ctx.fields, value)], {}, this.ctx, 'table', this.ctx.entity);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
