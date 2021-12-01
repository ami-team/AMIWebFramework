/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
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

	$implements: [ami.IContainer],

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
			`${amiWebApp.originURL}/controls/Accordion/twig/AccordionCtrl.twig`,
			`${amiWebApp.originURL}/controls/Accordion/twig/item.twig`,
		]).done((data) => {

			this._twigAccordionCtrl = data[0];
			this._twigItem = data[1];
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(selector, options)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		this.setupCtx(
			{}, {
				context: result,
				/**/
				clazz: null,
				toolbar: false,
				closable: true,
			},
			options
		);

		/*------------------------------------------------------------------------------------------------------------*/

		const dict = {
			toolbar: this.ctx.toolbar,
		};

		this.replaceHTML(this.setSelector(selector), this._twigAccordionCtrl, {dict: dict}).done(() => {

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

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_xxxItem: function(mode, title, options)
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
				this.ctx.clazz,
				'<span class="extraTitle"></span>',
				this.ctx.closable,
			],
			options
		);

		/*------------------------------------------------------------------------------------------------------------*/

		const itemId = `${this.patchId('C9FA6E82_464D_DB5C_554E_6318EC8DC711')}_${this._cnt++}`;

		const dict = {
			id: itemId,
			clazz: clazz,
			title: title,
			extraTitle: extraTitle,
			closable: closable,
		};

		/*------------------------------------------------------------------------------------------------------------*/

		const promise = (mode === 0) ? this.prependHTML(this.getSelector(), this._twigItem, {dict: dict})
		                             : this.appendHTML(this.getSelector(), this._twigItem, {dict: dict})
		;

		promise.done(() => {

			/*--------------------------------------------------------------------------------------------------------*/

			$(`#${itemId} > .card-header > .bi-x`).click((e) => {

				$(`#${itemId}`).remove();

				e.preventDefault();
			});

			/*--------------------------------------------------------------------------------------------------------*/

			if(show)
			{
				$(`#${itemId}_collapse`).collapse('show');
			}

			/*--------------------------------------------------------------------------------------------------------*/

			result.resolveWith(context, [`#${itemId}_collapse`]);

			/*--------------------------------------------------------------------------------------------------------*/
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	prependItem: function(title, options)
	{
		return this._xxxItem(0, title, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	appendItem: function(title, options)
	{
		return this._xxxItem(1, title, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	removeItem: function(itemId)
	{
		$(`${this.getSelector()} > .card#${itemId}`).remove();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	removeAllItems: function()
	{
		$(`${this.getSelector()}`).empty();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	isEmpty: function()
	{
		return $(`${this.getSelector()}`).is(':empty');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	collapseAll: function()
	{
		this._collapsed = !this._collapsed;

		$(`${this.getSelector()} > .card > .collapse`).collapse( this._collapsed ? 'hide' : 'show');
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
