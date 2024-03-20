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

import twigMediaViewerCtrl from './assets/twig/MediaViewerCtrl.twig';

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('MediaViewerCtrl', {
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
		this.fragmentMediaViewerCtrl = twigMediaViewerCtrl;

		return $.Deferred().resolve();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(selector, catalog, entity, primaryFieldName, primaryFieldValue, field, base64, mime, options)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		this.setupCtx(
			{
				catalog: catalog,
				entity: entity,
				primaryFieldName: primaryFieldName,
				primaryFieldValue: primaryFieldValue,
				field: field,
				base64: base64,
				mime: mime,
			},
			{
				context: result,
				card: false,
			},
			options
		);

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
			const tab = new this.tabCtor(null, this);

			tab.render(selector, this.ctx).done(() => {

				tab.appendItem(`<i class="bi bi-arrows-fullscreen"></i> ${this.ctx.entity}`, {closable: false}).done((selector) => {

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
		const dict = {
			field: this.ctx.field,
			mime: this.ctx.mime,
		};

		this.replaceHTML(selector, this.fragmentMediaViewerCtrl, {dict: dict}).done(() => {

			this.refresh().done((data) => {

				result.resolveWith(this.ctx.context, [data]);

			}).fail((message) => {

				result.rejectWith(this.ctx.context, [message]);
			});
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	refresh: function(options)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const [context] = amiWebApp.setup(['context'], [result], options);

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.execute('SearchQuery -catalog=? -entity=? -sql=?', {params: [this.ctx.catalog, this.ctx.entity, `SELECT \`${amiWebApp.textToString(this.ctx.field)}\` FROM \`${amiWebApp.textToString(this.ctx.entity)}\` WHERE \`${amiWebApp.textToString(this.ctx.primaryFieldName)}\` = \'${amiWebApp.textToString(this.ctx.primaryFieldValue)}\'`]}).done((data) => {

			/*--------------------------------------------------------------------------------------------------------*/

			const text = amiWebApp.jspath('..field.$', data)[0] || '';

			/*--------------------------------------------------------------------------------------------------------*/

			if(this.ctx.mime.startsWith('image/'))
			{
				/*----------------------------------------------------------------------------------------------------*/

				$('<img />').attr({

					alt: this.ctx.field,

					src: `data:${this.ctx.mime};base64,${text}`,

					height: 'auto',
					width: '800',

				}).appendTo(this.patchId('#D25C9390_A722_9C48_BC81_5C8875CAAC95'));

				/*----------------------------------------------------------------------------------------------------*/
			}
			else
			{
				/*----------------------------------------------------------------------------------------------------*/

				$('<object />').attr({

					type: this.ctx.mime,

					data: `data:${this.ctx.mime};base64,${text}`,

					height: '600',
					width: '800',

				}).appendTo(this.patchId('#D25C9390_A722_9C48_BC81_5C8875CAAC95'));

				/*----------------------------------------------------------------------------------------------------*/
			}

			/*--------------------------------------------------------------------------------------------------------*/

			result.resolveWith(context, [data]);

			/*--------------------------------------------------------------------------------------------------------*/

		}).fail((data, message) => {

			result.rejectWith(context, [message]);
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
