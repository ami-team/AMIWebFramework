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

/*-------------------------------------------------------------------------*/

$AMIClass('MediaViewerCtrl', {
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
			amiWebApp.originURL + '/controls/MediaViewer/twig/MediaViewerCtrl.twig',
		]).done((data) => {

			this.fragmentMediaViewerCtrl = data[0];
		});
	},

	/*---------------------------------------------------------------------*/

	render: function(selector, catalog, entity, primaryFieldName, primaryFieldValue, field, base64, mime, settings)
	{
		const result = $.Deferred();

		/*-----------------------------------------------------------------*/

		this.ctx = {
			catalog: catalog,
			entity: entity,
			primaryFieldName: primaryFieldName,
			primaryFieldValue: primaryFieldValue,
			field: field,
			base64: base64,
			mime: mime,
		};

		[
			this.ctx.context,
			this.ctx.card
		] = amiWebApp.setup(
			[
				'context',
				'card',
			],
			[
				result,
				false,
			],
			settings
		);

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

				tab.appendItem('<i class="fa fa-arrows-alt"></i> ' + this.ctx.entity, {closable: false}).done((selector) => {

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

	/*---------------------------------------------------------------------*/

	refresh: function(settings)
	{
		const result = $.Deferred();

		/*-----------------------------------------------------------------*/

		const [context] = amiWebApp.setup(['context'], [result], settings);

		/*-----------------------------------------------------------------*/

		const command = 'SearchQuery -catalog="' + amiWebApp.textToString(this.ctx.catalog) + '" -entity="' + amiWebApp.textToString(this.ctx.entity) + '" -sql="SELECT `' + amiWebApp.textToString(this.ctx.field) + '` FROM `' + amiWebApp.textToString(this.ctx.entity) + '` WHERE `' + amiWebApp.textToString(this.ctx.primaryFieldName) + '` = \'' + amiWebApp.textToString(this.ctx.primaryFieldValue) + '\'"';

		/*-----------------------------------------------------------------*/

		amiCommand.execute(command).done((data) => {

			/*-------------------------------------------------------------*/

			const text = amiWebApp.jspath('..field.$', data)[0] || '';

			/*-------------------------------------------------------------*/

			if(this.ctx.mime.startsWith('image/'))
			{
				/*---------------------------------------------------------*/

				$('<img />').attr({

					alt: this.ctx.field,

					src: 'data:' + this.ctx.mime + ';base64,' + text,

					height: 'auto',
					width: '800',

				}).appendTo(this.patchId('#D25C9390_A722_9C48_BC81_5C8875CAAC95'));

				/*---------------------------------------------------------*/
			}
			else
			{
				/*---------------------------------------------------------*/

				$('<object />').attr({

					type: this.ctx.mime,

					data: 'data:' + this.ctx.mime + ';base64,' + text,

					height: '600',
					width: '800',

				}).appendTo(this.patchId('#D25C9390_A722_9C48_BC81_5C8875CAAC95'));

				/*---------------------------------------------------------*/
			}

			/*-------------------------------------------------------------*/

			result.resolveWith(context, [data]);

			/*-------------------------------------------------------------*/

		}).fail((data, message) => {

			result.rejectWith(context, [message]);
		});

		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
