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

import './assets/css/ElementInfoCtrl.css';

import twigElementInfoCtrl from './assets/twig/ElementInfoCtrl.twig';
import twigDetails from './assets/twig/details.twig';
import twigJS from './assets/twig/js.twig';

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('ElementInfoCtrl', {
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
			'ctrl:fieldEditor',
			'ctrl:unitEditor',
			'ctrl:tab',
		]).done((data) => {

			this.fragmentElementInfoCtrl = twigElementInfoCtrl;
			this.fragmentDetails = twigDetails;
			this.fragmentJS = twigJS;

			this.fieldEditorCtor = data[0];
			this.fieldUnitCtor = data[1];
			this.tabCtor = data[2];
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(selector, catalog, entity, primaryFieldName, primaryFieldValue, settings)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const elementInfoCommandFunc = (catalog, entity, primaryFieldName, primaryFieldValue, hideBigContent) =>
			'GetElementInfo' + ' -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -primaryFieldName="' + amiWebApp.textToString(primaryFieldName) + '" -primaryFieldValue="' + amiWebApp.textToString(primaryFieldValue) + '"' + (hideBigContent ? ' -hideBigContent' : '')
		;

		const updateCommandFunc = (catalog, entity, fields, values, primaryFields, primaryValues) =>
			'UpdateElements' + ' -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -separator="§" -fields="' + amiWebApp.textToString(fields.join('§')) + '" -values="' + amiWebApp.textToString(values.join('§')) + '" -keyFields="' + amiWebApp.textToString(primaryFields.join('§')) + '" -keyValues="' + amiWebApp.textToString(primaryValues.join('§')) + '"'
		;

		const canEdit = amiLogin.hasRole('AMI_ADMIN') || amiLogin.hasRole('AMI_WRITER');

		this.setupCtx(
			{
				catalog: catalog,
				entity: entity,
				primaryFieldName: primaryFieldName,
				primaryFieldValue: primaryFieldValue,
			},
			{
				context: result,
				/**/
				elementInfoCommandFunc: elementInfoCommandFunc,
				updateCommandFunc: updateCommandFunc,
				/**/
				enableCache: false,
				/**/
				expandedLinkedElements: [],
				/**/
				showPrimaryField: true,
				showToolBar: true,
				canEdit: canEdit,
				/**/
				enableEditMode: false,
				/**/
				hideBigContent: true,
				maxCellLength: 64,
				/**/
				card: false,
				/**/
				onRefresh: null,
			},
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		this.fieldEditor = new this.fieldEditorCtor(this, this);
		this.unitEditor = new this.fieldUnitCtor(this, this);

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

				tab.appendItem('<i class="bi bi-arrows-fullscreen"></i> ' + this.ctx.entity, {closable: false, firstVisible: this.ctx.card}).done((selector) => {

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
		/*------------------------------------------------------------------------------------------------------------*/

		this.replaceHTML(selector, this.fragmentElementInfoCtrl, {dict: this.ctx}).done(() => {

			/*--------------------------------------------------------------------------------------------------------*/

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

			/*--------------------------------------------------------------------------------------------------------*/

			$(this.patchId('#AB84A8CC_5E70_EBE7_8766_317FEE71EFE8')).change(() => {

				this.setMode()
			});

			/*--------------------------------------------------------------------------------------------------------*/

			$(this.patchId('#BF7E7885_DB34_7993_9F17_37990DDD4BF3')).click(() => {

				amiWebApp.createControl(this.getParent(), this, 'messageBox', [this.ctx.command]);
			});

			$(this.patchId('#F1232710_45E2_92BF_7378_1BCD05FBF131')).click(() => {

				amiWebApp.createControl(this.getParent(), this, 'textBox', [this.ctx.js, {mode: 'javascript'}]);
			});

			$(this.patchId('#A29F1487_C747_18BF_94B1_9F3C32DA838C')).click(() => {

				amiWebApp.createControl(this.getParent(), this, 'bookmarkBox', ['ElementInfoViewer', this.ctx]);
			});

			/*--------------------------------------------------------------------------------------------------------*/

			$(this.patchId('#C28C33B1_9BCE_808C_0E57_4C8704359932')).click(() => {

				/*----------------------------------------------------------------------------------------------------*/

				const params = [
					this.ctxDefaults.catalog,
					this.ctxDefaults.entity,
					this.ctxDefaults.primaryFieldName,
					this.ctxDefaults.primaryFieldValue,
				];

				const optionals = {
					...this.ctxOptionals,
					card: false,
				};

				/*----------------------------------------------------------------------------------------------------*/

				const autoRefresh = confirm('Auto-refresh new widget?');

				/*----------------------------------------------------------------------------------------------------*/

				amiWebApp.lock();

				amiCommand.execute('AddWidget -control="ElementInfo" -params="' + amiWebApp.textToString(JSON.stringify(params)) + '" -settings="' + amiWebApp.textToString(JSON.stringify(optionals)) + '" -transparent' + (autoRefresh ? ' -autoRefresh' : '')).done((data, message) => {

					amiWebApp.success(message);

				}).fail((data, message) => {

					amiWebApp.error(message);
				});

				/*----------------------------------------------------------------------------------------------------*/
			});

			/*--------------------------------------------------------------------------------------------------------*/

			this.ctx.js = amiWebApp.formatTWIG(this.fragmentJS, {
				defaults: this.ctxDefaults,
				optionals: this.ctxOptionals,
			});

			/*--------------------------------------------------------------------------------------------------------*/

			this.refresh().done((elementRowset, linkedElementRowset, expandedLinkedElements) => {

				result.resolveWith(this.ctx.context, [elementRowset, linkedElementRowset, expandedLinkedElements]);

			}).fail((message) => {

				result.rejectWith(this.ctx.context, [message]);
			});

			/*--------------------------------------------------------------------------------------------------------*/
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	refresh: function(settings)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const [context] = amiWebApp.setup(['context'], [result], settings);

		/*------------------------------------------------------------------------------------------------------------*/

		const L = [];

		this.ctx.expandedLinkedElements.forEach((expandedLinkedElement) => {

			const catalog = amiWebApp.textToString(expandedLinkedElement.catalog);
			const entity = amiWebApp.textToString(expandedLinkedElement.entity);

			L.push(catalog + '.' + entity);
		});

		this.ctx.command = this.ctx.elementInfoCommandFunc(this.ctx.catalog, this.ctx.entity, this.ctx.primaryFieldName, this.ctx.primaryFieldValue, this.ctx.hideBigContent) + ' -expandedLinkedElements="' + L.join(',') + '"';

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.execute(this.ctx.command).done((data) => {

			/*--------------------------------------------------------------------------------------------------------*/

			const fieldDescriptions = amiWebApp.jspath('..fieldDescription', data);

			/*--------------------------------------------------------------------------------------------------------*/

			const elementRowset = amiWebApp.jspath('..rowset{.@type==="element" || .@type==="Element_Info"}.row', data); /* BERK */

			const linkedElementRowset = amiWebApp.jspath('..rowset{.@type==="linked_elements" || .@type==="Element_Child"}.row', data); /* BERK */

			/*--------------------------------------------------------------------------------------------------------*/

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

			/*--------------------------------------------------------------------------------------------------------*/

			const dict = {
				...this.ctx,
				/**/
				fieldDescriptions: fieldDescriptions,
				/**/
				elementRowset: elementRowset,
				linkedElementRowset: linkedElementRowset,
				expandedLinkedElements: expandedLinkedElements,
				/**/
				showEmptyFields: $(this.patchId('#D98B6B9A_1D5A_021E_5F90_2B55A6C3BE73')).prop('checked'),
			};

			/*--------------------------------------------------------------------------------------------------------*/

			this.replaceHTML(this.patchId('#BBD391C7_759D_01DD_E234_488D46504638'), this.fragmentDetails, {dict: dict}).done(() => {

				/*----------------------------------------------------------------------------------------------------*/

				this.fieldEditor.setup(this.patchId('#BBD391C7_759D_01DD_E234_488D46504638'),
																						this.ctx);
				this.unitEditor.setup(this.patchId('#BBD391C7_759D_01DD_E234_488D46504638'));

				/*----------------------------------------------------------------------------------------------------*/

				$(this.patchId('#BBD391C7_759D_01DD_E234_488D46504638')).find('[data-ctrl]').click((e) => {

					e.preventDefault();

					this.createControlFromWebLink(this.getParent(), e.currentTarget, this.ctx, {});
				});

				/*----------------------------------------------------------------------------------------------------*/

				if(this.ctx.onRefresh)
				{
					this.ctx.onRefresh(this);
				}

				/*----------------------------------------------------------------------------------------------------*/

				amiWebApp.unlock();

				result.resolveWith(context, [fieldDescriptions, elementRowset, linkedElementRowset, expandedLinkedElements]);
			});

			/*--------------------------------------------------------------------------------------------------------*/

		}).fail((data, message) => {

			amiWebApp.unlock();

			result.rejectWith(context, [message]);
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	isInEditMode: function()
	{
		return this.fieldEditor.isInEditMode();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	setMode: function()
	{
		const tags1 = $(this.patchId('#BBD391C7_759D_01DD_E234_488D46504638'));

		const tags2 = tags1.find('.view-more');
		const tags3 = tags1.find('.view-media');

		if($(this.patchId('#AB84A8CC_5E70_EBE7_8766_317FEE71EFE8')).prop('checked'))
		{
			tags2.hide();
			tags3.hide();

			this.fieldEditor.setInEditMode(true);
			this.unitEditor.setInEditMode(true);
		}
		else
		{
			tags2.show();
			tags3.show();

			this.fieldEditor.setInEditMode(false);
			this.unitEditor.setInEditMode(false);
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
