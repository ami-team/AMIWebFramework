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

/*-------------------------------------------------------------------------*/

$AMIClass('ElementInfoCtrl', {
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
			amiWebApp.originURL + '/controls/ElementInfo/twig/ElementInfoCtrl.twig',
			amiWebApp.originURL + '/controls/ElementInfo/twig/details.twig',
			amiWebApp.originURL + '/controls/ElementInfo/twig/js.twig',
			/**/
			'ctrl:fieldEditor',
			'ctrl:tab',
		]).done((data) => {

			this.fragmentElementInfoCtrl = data[0];
			this.fragmentDetails = data[1];
			this.fragmentJS = data[2];

			this.fieldEditorCtor = data[3];
			this.tabCtor = data[4];
		});
	},

	/*---------------------------------------------------------------------*/

	render: function(selector, catalog, entity, primaryFieldName, primaryFieldValue, settings)
	{
		const result = $.Deferred();

		/*-----------------------------------------------------------------*/

		this.ctx = {
			isEmbedded: amiWebApp.isEmbedded(),

			endpoint: amiCommand.endpoint,

			/**/

			catalog: catalog,
			entity: entity,
			primaryFieldName: primaryFieldName,
			primaryFieldValue: primaryFieldValue,
		};

		const fn = (catalog, entity, primaryFieldName, primaryFieldValue) => 'GetElementInfo -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -primaryFieldName="' + amiWebApp.textToString(primaryFieldName) + '" -primaryFieldValue="' + amiWebApp.textToString(primaryFieldValue) + '"';

		const [
			context,
			elementInfoCommandFunc,
			expandedLinkedElements,
			enableCache, showToolBar, showDetails, showTools, canEdit,
			start, stop, orderBy, orderWay,
			card
		] = amiWebApp.setup(
			[
				'context',
				'elementInfoCommandFunc',
				'expandedLinkedElements',
				'enableCache', 'showToolBar', 'showDetails', 'showTools', 'canEdit',
				'start', 'stop', 'orderBy', 'orderWay',
				'card',
			],
			[
				result,
				fn,
				[],
				false, true, false, true, false,
				1, 10, '', '',
				false,
			],
			settings
		);

		this.ctx.elementInfoCommandFunc = elementInfoCommandFunc;

		this.ctx.expandedLinkedElements = expandedLinkedElements;

		this.ctx.enableCache = enableCache;
		this.ctx.showToolBar = showToolBar;
		this.ctx.showDetails = showDetails;
		this.ctx.showTools = showTools;
		this.ctx.canEdit = canEdit;

		this.ctx.start = start;
		this.ctx.stop = stop;
		this.ctx.orderBy = orderBy;
		this.ctx.orderWay = orderWay;

		this.ctx.card = card;

		/*-----------------------------------------------------------------*/

		const L = [];

		this.ctx.expandedLinkedElements.forEach((expandedLinkedElement) => {

			let catalog = expandedLinkedElement.catalog;
			let entity = expandedLinkedElement.entity;

			L.push(catalog + '.' + entity);
		});

		this.ctx.command += ' -expandedLinkedElements="' + L.join(',') + '"';

		/*-----------------------------------------------------------------*/

		this.fieldEditor = new this.fieldEditorCtor(this, this);

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
		/*-----------------------------------------------------------------*/

		this.replaceHTML(selector, this.fragmentElementInfoCtrl, {dict: this.ctx}).done(() => {

			/*-------------------------------------------------------------*/

			$(this.patchId('#ACFEDF15_7894_6D91_CBE7_D98B5F7E9C6A')).click(() => {

				amiWebApp.lock();

				this.refresh().done(() => {

					amiWebApp.unlock();

				}).fail((message) => {

					amiWebApp.error(message, true);
				});
			});

			$(this.patchId('#D98B6B9A_1D5A_021E_5F90_2B55A6C3BE73')).change(() => {

				amiWebApp.lock();

				this.refresh().done(() => {

					amiWebApp.unlock();

				}).fail((message) => {

					amiWebApp.error(message, true);
				});
			});

			/*-------------------------------------------------------------*/

			$(this.patchId('#AB84A8CC_5E70_EBE7_8766_317FEE71EFE8')).change(() => {

				this.setMode()
			});

			/*-------------------------------------------------------------*/

			$(this.patchId('#BF7E7885_DB34_7993_9F17_37990DDD4BF3')).click(() => {

				amiWebApp.createControl(this.getParent(), this, 'messageBox', [this.ctx.command], {});
			});

			$(this.patchId('#F1232710_45E2_92BF_7378_1BCD05FBF131')).click(() => {

				amiWebApp.createControl(this.getParent(), this, 'textBox', [this.ctx.js], {});
			});

			/*-------------------------------------------------------------*/

			this.ctx.js = amiWebApp.formatTWIG(this.fragmentJS, this.ctx);

			/*-------------------------------------------------------------*/

			this.refresh().done((elementRowset, linkedElementRowset, expandedLinkedElements) => {

				result.resolveWith(this.ctx.context, [elementRowset, linkedElementRowset, expandedLinkedElements]);

			}).fail((message) => {

				result.rejectWith(this.ctx.context, [message]);
			});

			/*-------------------------------------------------------------*/
		});
	},

	/*---------------------------------------------------------------------*/

	refresh: function(settings)
	{
		const result = $.Deferred();

		/*-----------------------------------------------------------------*/

		const [context] = amiWebApp.setup(['context'], [result], settings);

		/*-----------------------------------------------------------------*/

		this.ctx.command = this.ctx.elementInfoCommandFunc(this.ctx.catalog, this.ctx.entity, this.ctx.primaryFieldName, this.ctx.primaryFieldValue);

		/*-----------------------------------------------------------------*/

		amiCommand.execute(this.ctx.command).done((data) => {

			/*-------------------------------------------------------------*/

			const fieldDescriptions = amiWebApp.jspath('..fieldDescription', data);

			/*-------------------------------------------------------------*/

			const elementRowset = amiWebApp.jspath('..rowset{.@type==="element" || .@type==="Element_Info"}.row', data); /* BERK */

			const linkedElementRowset = amiWebApp.jspath('..rowset{.@type==="linked_elements" || .@type==="Element_Child"}.row', data); /* BERK */

			/*-------------------------------------------------------------*/

			const expandedLinkedElements = [];

			this.ctx.expandedLinkedElements.forEach((expandedLinkedElement) => {

				expandedLinkedElements.push({
					catalog: expandedLinkedElement.catalog,
					entity: expandedLinkedElement.entity,
					fields: expandedLinkedElement.fields,
					keyValMode: expandedLinkedElement.keyValMode,
					rows: amiWebApp.jspath('..rowset{.@type==="' + expandedLinkedElement.entity + '"}.row', data),
				});
			});

			/*-------------------------------------------------------------*/

			const dict = {
				fieldDescriptions: fieldDescriptions,
				/**/
				elementRowset: elementRowset,
				linkedElementRowset: linkedElementRowset,
				expandedLinkedElements: expandedLinkedElements,
				/**/
				showToolBar: this.ctx.showToolBar,
				primaryFieldValue: this.ctx.primaryFieldValue,
				/**/
				showEmptyFields: $(this.patchId('#D98B6B9A_1D5A_021E_5F90_2B55A6C3BE73')).prop('checked'),
			};

			/*-------------------------------------------------------------*/

			this.replaceHTML(this.patchId('#BBD391C7_759D_01DD_E234_488D46504638'), this.fragmentDetails, {dict: dict}).done(() => {

				/*---------------------------------------------------------*/

				this.fieldEditor.setup(this.patchId('#BBD391C7_759D_01DD_E234_488D46504638'), this.ctx.primaryFieldName, this.ctx);

				/*---------------------------------------------------------*/

				$(this.patchId('#BBD391C7_759D_01DD_E234_488D46504638')).find('a[data-ctrl]').click((e) => {

					e.preventDefault();

					this.createControlFromWebLink(this.getParent(), e.currentTarget, this.ctx);
				});

				/*---------------------------------------------------------*/

				result.resolveWith(context, [elementRowset, linkedElementRowset, expandedLinkedElements]);
			});

			/*-------------------------------------------------------------*/

		}).fail((data, message) => {

			result.rejectWith(context, [message]);
		});

		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/

	isInEditMode: function()
	{
		return this.fieldEditor.isInEditMode();
	},

	/*---------------------------------------------------------------------*/

	setMode: function()
	{
		if($(this.patchId('#AB84A8CC_5E70_EBE7_8766_317FEE71EFE8')).prop('checked'))
		{
			this.fieldEditor.setInEditMode(true);
		}
		else
		{
			this.fieldEditor.setInEditMode(false);
		}
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
