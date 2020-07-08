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

$AMIClass('AccordionCtrl', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.Control,

	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);

		this._collapsed = false;

		this._cnt = 0;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/Accordion/twig/AccordionCtrl.twig',
			amiWebApp.originURL + '/controls/Accordion/twig/accordion_item.twig',
		], {context: this}).done((data) => {

			this.fragmentAccordionCtrl = data[0];
			this.fragmentAccordionItem = data[1];
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(selector, settings)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		[
			this._context,
			this._toolbar,
			this._clazz,
			this._closable,
		] = amiWebApp.setup(
			[
				'context',
				'toolbar',
				'clazz',
				'closable',
			],
			[
				result,
				false,
				null,
				true,
			],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		let dict = {
			toolbar: this._toolbar,
		};

		this.replaceHTML(this._selector = selector, this.fragmentAccordionCtrl, {dict: dict}).done(() => {

			/*--------------------------------------------------------------------------------------------------------*/

			$(this.patchId('#FE73B120_F051_EC64_29BC_911239F6F120')).click(() => {

				this.collapseAll();
			});

			$(this.patchId('#B1E0F1F1_C9A0_7D80_3580_2E314B8735D1')).click(() => {

				this.removeAll();
			});

			/*--------------------------------------------------------------------------------------------------------*/

			result.resolveWith(this._context);

			/*--------------------------------------------------------------------------------------------------------*/
		});

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	prependItem: function(title, settings)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const [
			context,
			show,
			clazz,
			extraTitle,
			closable,
			] = amiWebApp.setup(
				[
					'context',
					'show',
					'clazz',
					'extraTitle',
					'closable',
				],
				[
					result,
					false,
					this._clazz,
					'<span class="extraTitle"></span>',
					this._closable,
				],
				settings
			);

		/*------------------------------------------------------------------------------------------------------------*/

		let id = this.patchId('C9FA6E82_464D_DB5C_554E_6318EC8DC711') + '_' + this._cnt++;

		let dict = {
			id: id,
			clazz: clazz,
			title: title,
			extraTitle: extraTitle,
			closable: closable,
		};

		/*------------------------------------------------------------------------------------------------------------*/

		this.prependHTML(this._selector, this.fragmentAccordionItem, {dict: dict}).done(() => {

			/*--------------------------------------------------------------------------------------------------------*/

			$('#' + id + ' > .card-header > .close').click(() => {

				$('#' + id).remove();
			});

			/*--------------------------------------------------------------------------------------------------------*/

			if(show)
			{
				$('#' + id + '_collapse').collapse('show');
			}

			/*--------------------------------------------------------------------------------------------------------*/

			result.resolveWith(context, ['#' + id + '_collapse']);

			/*--------------------------------------------------------------------------------------------------------*/
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	appendItem: function(title, settings)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/


		const
			[
				context,
				show,
				clazz,
				extraTitle,
				closable,
			] = amiWebApp.setup(
				[
					'context',
					'show',
					'clazz',
					'extraTitle',
					'closable',
				],
				[
					result,
					false,
					this._clazz,
					'<span class="extraTitle"></span>',
					this._closable,
				],
				settings
			);

		/*------------------------------------------------------------------------------------------------------------*/

		let id = this.patchId('C9FA6E82_464D_DB5C_554E_6318EC8DC711') + '_' + this._cnt++;

		let dict = {
			id: id,
			title: title,
			extraTitle: extraTitle,
			clazz: clazz,
			closable: closable,
		};

		/*------------------------------------------------------------------------------------------------------------*/

		this.appendHTML(this._selector, this.fragmentAccordionItem, {dict: dict}).done(() => {

			/*--------------------------------------------------------------------------------------------------------*/

			$('#' + id + ' > .card-header > .close').click(() => {

				$('#' + id).remove();
			});

			/*--------------------------------------------------------------------------------------------------------*/

			if(show)
			{
				$('#' + id + '_collapse').collapse('show');
			}

			/*--------------------------------------------------------------------------------------------------------*/

			result.resolveWith(context, ['#' + id + '_collapse']);

			/*--------------------------------------------------------------------------------------------------------*/
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	removeAll: function()
	{
		$(this._selector + ' > .card').remove();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	collapseAll: function()
	{
		this._collapsed = !this._collapsed;

		$(this._selector + ' > .card > .collapse').collapse( this._collapsed ? 'hide' : 'show');
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
