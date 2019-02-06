/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global joint, saveAs
 *
 */

/*-------------------------------------------------------------------------*/

var SchemaCtrl_currentCatalog = null;
var SchemaCtrl_currentEntity = null;
var SchemaCtrl_currentField = null;

/*-------------------------------------------------------------------------*/

$AMIClass('SchemaCtrl', {
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
			amiWebApp.originURL + '/controls/Schema/twig/SchemaCtrl.twig',

			amiWebApp.originURL + '/js/3rd-party/filesaver.min.js',
			/**/
			amiWebApp.originURL + '/js/3rd-party/jointjs/lodash.min.js',
			amiWebApp.originURL + '/js/3rd-party/jointjs/backbone-min.js',
			/**/
			amiWebApp.originURL + '/js/3rd-party/jointjs/joint.min.js',
			amiWebApp.originURL + '/css/3rd-party/jointjs/joint.min.css',
			/**/
			amiWebApp.originURL + '/controls/Schema/js/joint.shapes.sql.js',
			/**/
			amiWebApp.originURL + '/controls/Schema/css/SchemaCtrl.css',
		], {context: this}).done(function(data) {

			amiWebApp.appendHTML('body', data[0]).done(function() {

				this._fields = null;
				this._foreignKeys = null;

				this._currentCell = null;

				this._currentCatalog = null;
				this._currentEntity = null;
				this._currentField = null;
			});
		});
	},

	/*---------------------------------------------------------------------*/

	render: function(selector, settings)
	{
		/*-----------------------------------------------------------------*/

		this._onFocus = null;
		this._onBlur = null;

		if(settings)
		{
			if('onFocus' in settings) {
				this._onFocus = settings['onFocus'];
			}

			if('onBlur' in settings) {
				this._onBlur = settings['onBlur'];
			}
		}

		/*-----------------------------------------------------------------*/

		var el1 = $(this._selector = selector);

		el1.css('box-shadow', '0px 1px 0px rgba(255, 255, 255, 0.15) inset, 0 1px 5px rgba(0, 0, 0, 0.075)');
		el1.css('border', '1px solid rgb(231, 231, 231)');
		el1.css('border-radius', '4px');
		el1.css('overflow-x', 'scroll');
		el1.css('overflow-y', 'scroll');
		el1.css('padding', '10px');

		/*-----------------------------------------------------------------*/

		var el2 = $('<div class="ami-schema"></div>').appendTo(el1);

		/*-----------------------------------------------------------------*/

		this.graph = new joint.dia.Graph();

		this.paper = new joint.dia.Paper({
			model: this.graph,
			el: el2,
			width: 1,
			height: 1,
			gridSize: 5.0,
			drawGrid: {
				name: 'dot',
				args: [
					{color: 'red', scaleFactor: 2, thickness: 1},
				]
			}
		});

		/*-----------------------------------------------------------------*/

		this.paper.on({
			'cell:pointerclick': function(cellView) {

				$('g[model-id]').removeClass('ami-schema-shadow').filter('[model-id="' + cellView.model.id + '"]').addClass('ami-schema-shadow');

				this._currentCell = cellView.model;

				if(this._onFocus) {
					this._onFocus(this._currentCell);
				}
			},
			'blank:pointerdown': function(cellView) {

				$('g[model-id]').removeClass('ami-schema-shadow')/*---------------------------------------------------------------------------*/;

				if(this._onBlur) {
					this._onBlur(this._currentCell);
				}

				this._currentCell = /*-*/null/*-*/;
			}
		}, this);

		/*-----------------------------------------------------------------*/

		return this.refresh(null, settings);

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	fitToContent: function()
	{
		this.paper.fitToContent({
			padding: 10,
			gridWidth: 10,
			gridHeight: 10,
			minWidth: this._width,
			minHeight: this._height,
		});
	},

	/*---------------------------------------------------------------------*/

	_refresh: function(result, catalog, settings)
	{
		var context = result;

		this._currentCatalog = catalog;

		this._width = 2000;
		this._height = 2000;

		this._showShowTool = false;
		this._showEditTool = false;

		if(settings)
		{
			if('context' in settings) {
				context = settings['context'];
			}

			if('width' in settings) {
				this._width = settings['width'];
			}

			if('height' in settings) {
				this._height = settings['height'];
			}

			if('showShowTool' in settings) {
				this._showShowTool = settings['showShowTool'];
			}

			if('showEditTool' in settings) {
				this._showEditTool = settings['showEditTool'];
			}
		}

		/*-----------------------------------------------------------------*/

		if(!catalog)
		{
			result.resolveWith(context, [null]);

			return;
		}

		/*-----------------------------------------------------------------*/

		this.graph.clear();

		/*-----------------------------------------------------------------*/

		amiCommand.execute('GetJSONSchema -catalog="' + amiWebApp.textToString(catalog) + '"', {context: this}).done(function(data) {

			/*-------------------------------------------------------------*/
			/* GET SCHEMA                                                  */
			/*-------------------------------------------------------------*/

			var schema;

			try
			{
				schema = JSON.parse(amiWebApp.jspath('..field{.@name==="json"}.$', data)[0] || '{}');
			}
			catch(e)
			{
				schema = {/*---------------------------------------------------------------------*/};
			}

			/*-------------------------------------------------------------*/
			/* GET COLUMNS                                                 */
			/*-------------------------------------------------------------*/

			var cnt = 0;

			var tables = {};

			$.each(this._fields, function(index, value) {

				if((amiWebApp.jspath('..field{.@name==="externalCatalog"}.$', value)[0] || '') === catalog)
				{
					var table = amiWebApp.jspath('..field{.@name==="table"}.$', value)[0] || '';
					var name = amiWebApp.jspath('..field{.@name==="name"}.$', value)[0] || '';
					var type = amiWebApp.jspath('..field{.@name==="type"}.$', value)[0] || '';
					var hidden = amiWebApp.jspath('..field{.@name==="hidden"}.$', value)[0] || '';
					var adminOnly = amiWebApp.jspath('..field{.@name==="adminOnly"}.$', value)[0] || '';
					var crypted = amiWebApp.jspath('..field{.@name==="crypted"}.$', value)[0] || '';
					var primary = amiWebApp.jspath('..field{.@name==="primary"}.$', value)[0] || '';
					var created = amiWebApp.jspath('..field{.@name==="created"}.$', value)[0] || '';
					var createdBy = amiWebApp.jspath('..field{.@name==="createdBy"}.$', value)[0] || '';
					var modified = amiWebApp.jspath('..field{.@name==="modified"}.$', value)[0] || '';
					var modifiedBy = amiWebApp.jspath('..field{.@name==="modifiedBy"}.$', value)[0] || '';

					if(!(table in tables))
					{
						var x;
						var y;
						var color;

						if(!(table in schema))
						{
							x = y
							  = 20 + 10 * cnt++;
							color = '#0066CC';
						}
						else
						{
							x = schema[table].x;
							y = schema[table].y;
							color = schema[table].color;
						}

						tables[table] = {
							table: this.graph.newTable({
								position: {
									x: x,
									y: y,
								},
								table: table,
								color: color,
								showShowTool: this._showShowTool,
								showEditTool: this._showEditTool,
							}),
							fields: [],
						};
					}

					if(!(name in tables[table]['fields']))
					{
						tables[table]['table'].appendColumn({
							name: name,
							type: type,
							hidden: hidden === 'true',
							adminOnly: adminOnly === 'true',
							crypted: crypted === 'true',
							primary: primary === 'true',
							created: created === 'true',
							createdBy: createdBy === 'true',
							modified: modified === 'true',
							modifiedBy: modifiedBy === 'true',
						});
					}
				}

			}, this);

			/*-------------------------------------------------------------*/

			var that = this;

			$(this._selector + ' a.sql-table-show-link').click(function(e) {

				that.showEntity(
					catalog
					,
					$(this).attr('data-table')
				);

				e.preventDefault();
			});

			$(this._selector + ' a.sql-table-edit-link').click(function(e) {

				that.editEntity(
					catalog
					,
					$(this).attr('data-table')
				);

				e.preventDefault();
			});

			$(this._selector + ' a.sql-column-link').click(function(e) {

				that.editField(
					catalog
					,
					$(this).attr('data-table')
					,
					$(this).attr('data-column')
				);

				e.preventDefault();
			});


			/*-------------------------------------------------------------*/
			/* GET FKEYS                                                   */
			/*-------------------------------------------------------------*/

			$.each(this._foreignKeys, function(index, value) {

				if(amiWebApp.jspath('..field{.@name==="fkExternalCatalog"}.$', value)[0] === catalog
				   &&
				   amiWebApp.jspath('..field{.@name==="pkExternalCatalog"}.$', value)[0] === catalog
				 ) {
					var fkTable = amiWebApp.jspath('..field{.@name==="fkTable"}.$', value)[0];
					var pkTable = amiWebApp.jspath('..field{.@name==="pkTable"}.$', value)[0];

					this.graph.newForeignKey(
						tables[fkTable]['table'].get('id'),
						tables[pkTable]['table'].get('id')
					);
				}

			}, this);

			/*-------------------------------------------------------------*/
			/* FIT TO CONTENT                                              */
			/*-------------------------------------------------------------*/

			this.fitToContent();

			/*-------------------------------------------------------------*/

			result.resolveWith(context, [schema]);

		}).fail(function(data, message) {

			result.rejectWith(context, [message]);
		});
	},

	/*---------------------------------------------------------------------*/

	refresh: function(catalog, settings)
	{
		var result = $.Deferred();

		if(this._fields
		   &&
		   this._foreignKeys
		 ) {
			this._refresh(result, catalog, settings);
		}
		else
		{
			amiCommand.execute('GetSchemas', {context: this}).always(function(data) {

				this._fields = amiWebApp.jspath('..rowset{.@type==="fields"}.row', data) || [];
				this._foreignKeys = amiWebApp.jspath('..rowset{.@type==="foreignKeys"}.row', data) || [];

				this._refresh(result, catalog, settings);
			});
		}

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	clear: function()
	{
		this.graph.clear();

		this.paper.setDimensions(1, 1);
	},

	/*---------------------------------------------------------------------*/

	getCurrentCell: function()
	{
		return this._currentCell;
	},

	/*---------------------------------------------------------------------*/

	setJSON: function(json)
	{
		this.graph.fromJSON(json);

		this.fitToContent();
	},

	/*---------------------------------------------------------------------*/

	getJSON: function()
	{
		this.fitToContent();

		return this.graph.toJSON();
	},

	/*---------------------------------------------------------------------*/

	exportSchema: function()
	{
		try
		{
			var json = JSON.stringify(this.getJSON(), null, 4);

			var blob = new Blob([json], {
				type: 'application/json',
				endings : 'native',
			});

			saveAs(blob, 'schema.json');
		}
		catch(e)
		{
			amiWebApp.error(e, true);
		}
	},

	/*---------------------------------------------------------------------*/

	printSchema: function()
	{
		/*-----------------------------------------------------------------*/

		var svg = $(this._selector + ' svg');

		/*-----------------------------------------------------------------*/

		var w = window.open('', '', 'height=' + svg.height() + ', width=' + svg.width() + ', toolbar=no');

		w.document.write('<html><head><style>body { margin: 10px; } .link-tools, .marker-vertices, .marker-arrowheads, .connection-wrap, .sql-table-link { display: none; } .connection { fill: none; }</style></head><body>' + $('#C6DDFAF6_9E75_41C5_87BD_0896B5299559').html() + '</body></html>');

		$(w.document).find('svg').css('background-image', 'none');

		w.print();
		w.close();

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	showEntity: function(catalog, entity)
	{
		window.open(amiWebApp.webAppURL + '?subapp=tableViewer&userdata=' + encodeURIComponent('{"catalog": "' + amiWebApp.textToString(catalog) + '", "entity": "' + amiWebApp.textToString(entity) + '"}'), '_blank').focus();
	},

	/*---------------------------------------------------------------------*/

	editEntity: function(catalog, entity)
	{
		window.open(amiWebApp.webAppURL + '?subapp=adminDashboard&userdata=catalogs', '_blank').focus();
	},

	/*---------------------------------------------------------------------*/

	editField: function(catalog, entity, field)
	{
		SchemaCtrl_currentCatalog = catalog;
		SchemaCtrl_currentEntity = entity;
		SchemaCtrl_currentField = field;

		if(amiLogin.hasRole('AMI_ADMIN') === false)
		{
			return;
		}

		amiCommand.execute('GetFieldInfo -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -field="' + amiWebApp.textToString(field) + '"', {context: this}).done(function(data) {

			$('#C78B630C_9805_7D15_C14F_4C7C276E9E2C').val(catalog);
			$('#B495FF2B_45A2_F3CA_C810_55FC054872D2').val(entity);
			$('#C3E221A6_6B33_6A52_B7D1_57CB0228BB07').val(field);

			/**/

			var rank = amiWebApp.jspath('..field{.@name==="rank"}.$', data)[0] || '999';
			var description = amiWebApp.jspath('..field{.@name==="description"}.$', data)[0] || 'N/A';
			var webLinkScript = amiWebApp.jspath('..field{.@name==="webLinkScript"}.$', data)[0] || '@NULL';

			var adminOnly = amiWebApp.jspath('..field{.@name==="adminOnly"}.$', data)[0] || 'false';
			var hidden = amiWebApp.jspath('..field{.@name==="hidden"}.$', data)[0] || 'false';
			var crypted = amiWebApp.jspath('..field{.@name==="crypted"}.$', data)[0] || 'false';
			var primary = amiWebApp.jspath('..field{.@name==="primary"}.$', data)[0] || 'false';

			var created = amiWebApp.jspath('..field{.@name==="created"}.$', data)[0] || 'false';
			var createdBy = amiWebApp.jspath('..field{.@name==="createdBy"}.$', data)[0] || 'false';
			var modified = amiWebApp.jspath('..field{.@name==="modified"}.$', data)[0] || 'false';
			var modifiedBy = amiWebApp.jspath('..field{.@name==="modifiedBy"}.$', data)[0] || 'false';

			var statable = amiWebApp.jspath('..field{.@name==="statable"}.$', data)[0] || 'false';
			var groupable = amiWebApp.jspath('..field{.@name==="groupable"}.$', data)[0] || 'false';

			$('#C6CA88FD_548A_FE30_9871_AFE55362439B').val(rank);
			$('#E9801316_0EC6_D6F2_0BC9_E1E1DC3ABA00').val(description);
			$('#E4FE4DF4_F171_1467_07ED_8BB7E0FFC15F').val(webLinkScript);

			$('#F82C7F86_1260_D5B1_4CBF_EE519415B3FD').prop('checked', adminOnly === 'true');
			$('#DEA15A0F_5EBF_49E7_3E75_F29850184968').prop('checked', hidden === 'true');
			$('#E2D8A4EB_1065_01B5_C8DB_7B2E01F03AD4').prop('checked', crypted === 'true');
			$('#A4F33332_8DDD_B235_F523_6A35B902519C').prop('checked', primary === 'true');

			$('#BC7E5CA1_09C8_BB5C_20E2_C0CFE3204224').prop('checked', created === 'true');
			$('#FB998C28_1E59_12A0_1B34_2C2C0A44A6AD').prop('checked', createdBy === 'true');
			$('#AADC020E_E1CB_BA8E_E870_27B63666C988').prop('checked', modified === 'true');
			$('#FACFE443_72F3_8917_2F08_934D88E55DDC').prop('checked', modifiedBy === 'true');

			$('#F26C0D3D_B516_06EA_90F6_0E3B17D2AF5D').prop('checked', statable === 'true');
			$('#BA08505D_C468_5602_9745_12369E1F6318').prop('checked', groupable === 'true');

			/**/

			$('#B0BEB5C7_8978_7433_F076_A55D2091777C').modal('show');

		}).fail(function(data, message) {

			amiWebApp.error(message, true);
		});
	},

	/*---------------------------------------------------------------------*/

	flushServerCachesFast: function()
	{
		/*-----------------------------------------------------------------*/

		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		/*-----------------------------------------------------------------*/

		amiCommand.execute('FlushServerCaches').done(function(data, message) {

			amiWebApp.success(message, true, '#F7A1EF6C_34F4_9A58_EEAD_F0DB92DCB886');

		}).fail(function(data, message) {

			amiWebApp.error(message, true, '#F7A1EF6C_34F4_9A58_EEAD_F0DB92DCB886');
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	flushServerCachesSlow: function()
	{
		/*-----------------------------------------------------------------*/

		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		/*-----------------------------------------------------------------*/

		amiCommand.execute('FlushServerCaches -full').done(function(data, message) {

			amiWebApp.success(message, true, '#F7A1EF6C_34F4_9A58_EEAD_F0DB92DCB886');

		}).fail(function(data, message) {

			amiWebApp.error(message, true, '#F7A1EF6C_34F4_9A58_EEAD_F0DB92DCB886');
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	reset: function()
	{
		/*-----------------------------------------------------------------*/

		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*-----------------------------------------------------------------*/

		amiCommand.execute('RemoveElements -catalog="self" -entity="router_catalog_extra" -keyFields="catalog,entity,field" -keyValues="' + amiWebApp.textToString(SchemaCtrl_currentCatalog) + ',' + amiWebApp.textToString(SchemaCtrl_currentEntity) + ',' + amiWebApp.textToString(SchemaCtrl_currentField) + '"').done(function(data, message) {

			amiWebApp.success(message, true);

			$('#B0BEB5C7_8978_7433_F076_A55D2091777C').modal('hide');

		}).fail(function(data, message) {

			amiWebApp.error(message, true, '#F7A1EF6C_34F4_9A58_EEAD_F0DB92DCB886');
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	apply: function()
	{
		/*-----------------------------------------------------------------*/

		if(!confirm('Please confirm...'))
		{
			return;
		}

		/*-----------------------------------------------------------------*/

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/
});
