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

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('AdderCtrl', {
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
			amiWebApp.originURL + '/controls/Adder/css/AdderCtrl.css',
			amiWebApp.originURL + '/controls/Adder/twig/AdderCtrl.twig',
			/**/
			'ctrl:table'
		]).done((data) => {

			this.fragmentAddCtrl = data[1];
			this.tableCtor = data[2];
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(selector, settings)
	{
		const result = $.Deferred();

		this.ctx = {};

		/**/

		[
			this.ctx.context,
			this.ctx.catalog, this.ctx.entity, this.ctx.field,
		] = amiWebApp.setup(
			[
				'context',
				'catalog', 'entity', 'field',
			],
			[
				result,
				'', '', '',
			],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		this.table = new this.tableCtor(this, this);

		/*------------------------------------------------------------------------------------------------------------*/

		this.replaceHTML(selector, this.fragmentAddCtrl, {dict: settings}).done(() => {

			/*--------------------------------------------------------------------------------------------------------*/

			$(this.patchId('#F8A7229A_60B1_0D37_BA18_807B7E29C818')).click(() => {

				this.table.fieldEditor.showRowModal(this.ctx.catalog, this.ctx.entity);
			});

			/*--------------------------------------------------------------------------------------------------------*/

			$(this.patchId('#EBB91625_148B_1606_0D40_30BF170B11EE')).click(() => {

					let mql = 'SELECT *';

					const val = $(this.patchId('#B28F6454_3862_3031_6BAF_98392DE9C377')).val();

					if(val)
					{
						mql += ' WHERE `' + this.ctx.field + '` LIKE \'%' + val + '%\''
					}

				this.table.render('#' + this.patchId('D6FDA711_E893_7CB9_9B97_4161B2CDE139'), 'SearchQuery -catalog="' + amiWebApp.textToString(this.ctx.catalog) + '" -entity="' + amiWebApp.textToString(this.ctx.entity) + '" -mql="' + amiWebApp.textToString(mql) + '"', {showToolBar : true, showDetails: true, showTools : true, canEdit: true, catalog: this.ctx.catalog, entity: this.ctx.entity}).done(() => {

					amiWebApp.unlock();

				}).fail((message) => {

					amiWebApp.error(message, true);
				});
			});

			/*--------------------------------------------------------------------------------------------------------*/

			this.table.render(this.patchId('#D6FDA711_E893_7CB9_9B97_4161B2CDE139'), 'SearchQuery -catalog="' + amiWebApp.textToString(this.ctx.catalog) + '" -entity="' + amiWebApp.textToString(this.ctx.entity) + '" -mql="SELECT * "', {showToolBar : true, showDetails: true, showTools : true, canEdit: true, catalog: this.ctx.catalog, entity: this.ctx.entity}).done(() => {

				amiWebApp.unlock();

				result.resolveWith(this.ctx.context);

			}).fail((message) => {

				amiWebApp.error(message, true);

				result.resolveWith(this.ctx.context);
			})
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	}

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
