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
			'ctrl:messageBox',
			'ctrl:textBox',
			'ctrl:table',
			'ctrl:graph',
		], {context: this}).done(function(data) {

			this.fragmentElementInfoCtrl = data[0];
			this.fragmentDetails = data[1];
			this.fragmentJS = data[2];

			this.messageBox = new data[3];
			this.textBox = new data[4];
			this.tableCtor = data[5];
			this.graphCtor = data[6];
		});
	},

	/*---------------------------------------------------------------------*/

	render: function(selector, catalog, entity, primaryFieldName, primaryFieldValue, settings)
	{
		var result = $.Deferred();

		this.ctx = {};

		for(var key in settings)
		{
			this.ctx[key] = settings[key];
		}

		this.ctx.isEmbedded = amiWebApp.isEmbedded();

		this.ctx.endpoint = amiCommand.endpoint;

		this.ctx.context = result;

			/**/

		this.ctx.catalog = catalog;
		this.ctx.entity = entity;
		this.ctx.primaryField = primaryFieldName;
		this.ctx.primaryFieldValue = primaryFieldValue;

			/**/

		this.ctx.command = 'GetElementInfo -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -primaryFieldName="' + amiWebApp.textToString(primaryFieldName) + '" -primaryFieldValue="' + amiWebApp.textToString(primaryFieldValue) + '" -GUI="yes"';

			/**/

		this.ctx.showEmptyFields = false;

			/**/

		this.ctx.expandedLinkedElements = [];

		/* Inherited settings */

		if(settings)
		{
			if('context' in settings) {
				this.ctx.context = settings['context'];
			}

			if('showEmptyFields' in settings) {
				this.ctx.showEmptyFields = settings['showEmptyFields'];
			}

			if('expandedLinkedElements' in settings) {
				this.ctx.expandedLinkedElements = settings['expandedLinkedElements'];
			}
		}

		/*-----------------------------------------------------------------*/
		var expandedLinkedElement;
		var commandExtra = [];

		for( var i in this.ctx.expandedLinkedElements)
		{
			expandedLinkedElement = this.ctx.expandedLinkedElements[i];
			catalog = expandedLinkedElement.catalog;
			entity = expandedLinkedElement.entity;

			commandExtra.push(catalog + '.' + entity);
		}

		this.ctx.command += ' -expandedLinkedElements="' + commandExtra.join(',') + '"';

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		/*-----------------------------------------------------------------*/

		this.replaceHTML(selector, this.fragmentElementInfoCtrl, {context: this, dict: this.ctx}).done(function() {

			var _this = this;

			/*-------------------------------------------------------------*/

			$(this.patchId('#D98B6B9A_1D5A_021E_5F90_2B55A6C3BE73')).change(function(e) {

				_this.ctx.showEmptyFields = $(e.target).prop('checked');

				_this.refresh();
			});

			$(this.patchId('#ACFEDF15_7894_6D91_CBE7_D98B5F7E9C6A')).click(function() {

				_this.refresh();
			});

			$(this.patchId('#BF7E7885_DB34_7993_9F17_37990DDD4BF3')).click(function() {

				_this.showCommand();
			});

			$(this.patchId('#F1232710_45E2_92BF_7378_1BCD05FBF131')).click(function() {

				_this.showJS();
			});

			/*-------------------------------------------------------------*/

			this.ctx.js = amiWebApp.formatTWIG(this.fragmentJS, this.ctx);

			/*-------------------------------------------------------------*/

			this.refresh().done(function(descriptions, rows) {

				result.resolveWith(_this.ctx.context, [descriptions, rows]);

			}).fail(function(error) {

				result.rejectWith(_this.ctx.context, [error]);
			});

			/*-------------------------------------------------------------*/
		});

		return result;
	},

	/*---------------------------------------------------------------------*/

	refresh: function(settings)
	{
		var result = $.Deferred();

		var context = result;

		if(settings)
		{
			if('context' in settings) {
				context = settings['context'];
			}
		}

		amiWebApp.lock();

		amiCommand.execute(this.ctx.command, {context: this}).done(function(data) {

			/*-------------------------------------------------------------*/

			var showEmptyFields = this.ctx.showEmptyFields;

			/*-------------------------------------------------------------*/

			var descriptions = amiWebApp.jspath('..descriptions.description', data) || [];

			var elementRowset = amiWebApp.jspath('..rowset{.@type==="element" || .@type==="Element_Info"}.row', data) || []; /* BERK */

			var linkedElementRowset = amiWebApp.jspath('..rowset{.@type==="linked_elements" || .@type==="Element_Child"}.row', data) || []; /* BERK */

			var expandedLinkedElements = [];

			for(var i in this.ctx.expandedLinkedElements)
			{
				expandedLinkedElement = this.ctx.expandedLinkedElements[i];

				expandedLinkedElements.push({
					catalog: expandedLinkedElement.catalog,
					entity: expandedLinkedElement.entity,
					fields: expandedLinkedElement.fields,
					keyValMode: expandedLinkedElement.keyValMode,
					rows: amiWebApp.jspath('..rowset{.@type==="' + expandedLinkedElement.entity + '"}.row', data) || [],
				});
			}

			/*-------------------------------------------------------------*/

			var dict = {
				showEmptyFields: showEmptyFields,
				descriptions: descriptions,
				elementRowset: elementRowset,
				linkedElementRowset: linkedElementRowset,
				expandedLinkedElements: expandedLinkedElements,
			};

			this.replaceHTML(this.patchId('#BBD391C7_759D_01DD_E234_488D46504638'), this.fragmentDetails, {context: this, dict: dict}).done(function() {

				var _this = this;

				var parent = $(this.patchId('#B8275C83_776D_57AC_5379_70DC7391AD5A'));

				parent.find('a[data-ctrl]').click(function(e) {

					e.preventDefault();

					/*test*/
					var dataCtrl = this.getAttribute('data-ctrl');
					var dataParams = JSON.parse(this.getAttribute('data-params'));
					var dataSettings = JSON.parse(this.getAttribute('data-settings'));
					var dataIcon = this.getAttribute('data-icon');
					var dataTitle = this.getAttribute('data-title');

					amiWebApp.createControlInContainer(_this.getParent(), _this, dataCtrl, dataParams, dataSettings, _this.ctx, dataIcon, dataTitle);

				});

				result.resolveWith(context, [descriptions, elementRowset, linkedElementRowset]);

				amiWebApp.unlock();
			});

			/*-------------------------------------------------------------*/

		}).fail(function(data) {

			var error = amiWebApp.jspath('..error.$', data);

			result.rejectWith(context, [error]);

			amiWebApp.error(error, true);
		});

		return result;
	},

	/*---------------------------------------------------------------------*/

	showLinkedEntity: function(catalog, entity, mql)
	{
		var parent = this.getParent();

		if(parent.$name === 'TabCtrl')
		{
			parent.appendItem('<i class="fa fa-arrows-alt"></i> ' + entity, {context: this}).done(function(sel) {

				var command = 'SearchQuery -catalog=\"' + amiWebApp.textToString(catalog) + '\" -entity=\"' + amiWebApp.textToString(entity) + '\" -mql=\"' + amiWebApp.textToString(mql) + '\"';

				new this.tableCtor(parent, this).render(sel, command, {
					enableCache: false,
					showDetails: true,
					showTools: true,
					canEdit: false,
					catalog: catalog,
					entity: entity,
				});
			});
		}
		else
		{
			amiWebApp.error('could not create a new tab', true);
		}
	},

	/*---------------------------------------------------------------------*/

	showGraphWebLink: function(command)
	{
		alert('coucou');
		var parent = this.getParent();

		if(parent.$name === 'TabCtrl')
		{
			new this.graphCtor(parent, this).render(sel, command, {
				context: this,
			});
		}
		else
		{
			amiWebApp.error('could not create a new tab', true);
		}
	},

	/*---------------------------------------------------------------------*/

	showCommand: function()
	{
		this.messageBox.show(this.ctx.command);
	},

	/*---------------------------------------------------------------------*/

	showJS: function()
	{
		this.textBox.show(this.ctx.js);
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/

