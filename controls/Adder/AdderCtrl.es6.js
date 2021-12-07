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

import twigAdderCtrl from './assets/twig/AdderCtrl.twig';

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
			'ctrl:table'
		]).done((data) => {

			this._tableCtor = data[0];
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(selector, catalog, entity, field, options)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const showAddModalFunc = (catalog, entity) => { this._table.fieldEditor.showRowModal(catalog, entity); };

		const canAdd = amiAuth.hasRole('AMI_ADMIN') || amiAuth.hasRole('AMI_WRITER');

		this.setupCtx(
			{
				catalog: catalog,
				entity: entity,
				field: field,
				card: true,
			},
			{
				context: result,
				showAddModalFunc: showAddModalFunc,
				canAdd: canAdd,
			},
			options
		);

		/*------------------------------------------------------------------------------------------------------------*/

		this.replaceHTML(this.setSelector(selector), twigAdderCtrl, {dict: this.ctx}).done(() => {

			/*--------------------------------------------------------------------------------------------------------*/

			$(this.patchId('#B28F6454_3862_3031_6BAF_98392DE9C377')).keypress((e) => {

				if(e.keyCode === 13)
				{
					e.preventDefault();

					this.search($(this.patchId('#B28F6454_3862_3031_6BAF_98392DE9C377')).val());
				}
			});

			$(this.patchId('#EBB91625_148B_1606_0D40_30BF170B11EE')).click((e) => {

				e.preventDefault();

				this.search($(this.patchId('#B28F6454_3862_3031_6BAF_98392DE9C377')).val());
			});

			/*--------------------------------------------------------------------------------------------------------*/

			if(this.ctx.canAdd)
			{
				$(this.patchId('#F8A7229A_60B1_0D37_BA18_807B7E29C818')).click((e) => {

					e.preventDefault();

					this.ctx.showAddModalFunc(this.ctx.catalog, this.ctx.entity);
				});
			}

			/*--------------------------------------------------------------------------------------------------------*/

			result.resolve();
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	search: function(filter)
	{
		alert(filter);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
