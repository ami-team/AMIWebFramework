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
			'ctrl:datatable'
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

			this.search().done((listOfFieldDescriptions, listOfRows, sql, mql, ast, totalNumberOfRows) => {

				result.resolveWith(this.ctx.context, [listOfFieldDescriptions, listOfRows, sql, mql, ast, totalNumberOfRows]);

			}).fail((message) => {

				result.rejectWith(this.ctx.context, [message]);
			});

			/*--------------------------------------------------------------------------------------------------------*/
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	search: function(filter)
	{
		const val = $(this.patchId('#B28F6454_3862_3031_6BAF_98392DE9C377')).val().trim();

		let mql = 'SELECT *';

		if(val)
		{
			if(val.includes('%'))
			{
				mql += ' WHERE `' + this.ctx.field + '` LIKE \'' + amiWebApp.textToSQL(val) + '\'';
			}
			else
			{
				mql += ' WHERE `' + this.ctx.field + '` = \'' + amiWebApp.textToSQL(val) + '\'';
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		return (this._table = new this._tableCtor()).render(this.patchId('#D6FDA711_E893_7CB9_9B97_4161B2CDE139'), `SearchQuery -catalog="${amiWebApp.textToString(this.ctx.catalog)}" -entity="${amiWebApp.textToString(this.ctx.entity)}" -mql="${amiWebApp.textToString(mql)}"`, this.ctx).done(() => {

			amiWebApp.unlock();

		}).fail((message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
