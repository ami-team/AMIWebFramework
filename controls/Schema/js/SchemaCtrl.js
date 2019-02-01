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

			this._fields = null;
			this._foreignKeys = null;
		});
	},

	/*---------------------------------------------------------------------*/

	render: function(selector, settings)
	{
		/*-----------------------------------------------------------------*/

		this.onFocus = null;
		this.onBlur = null;

		if(settings)
		{
			if('onFocus' in settings) {
				this.onFocus = settings['onFocus'];
			}

			if('onBlur' in settings) {
				this.onBlur = settings['onBlur'];
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

				this.currentCell = cellView.model;

				if(this.onFocus) {
					this.onFocus(this.currentCell);
				}
			},
			'blank:pointerdown': function(cellView) {

				$('g[model-id]').removeClass('ami-schema-shadow')/*---------------------------------------------------------------------------*/;

				if(this.onBlur) {
					this.onBlur(this.currentCell);
				}

				this.currentCell = /*-*/null/*-*/;
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

		this._catalog = catalog;

		this._width = 2000;
		this._height = 2000;

		this._showLinks = true;

		if(settings)
		{
			if('context' in settings) {
				context = settings['context'];
			}

			if('catalog' in settings) {
				this._catalog = settings['catalog'];
			}

			if('width' in settings) {
				this._width = settings['width'];
			}

			if('height' in settings) {
				this._height = settings['height'];
			}

			if('showLinks' in settings) {
				this._showLinks = settings['showLinks'];
			}
		}

		/*-----------------------------------------------------------------*/

		if(!this._catalog)
		{
			result.resolveWith(context, [null]);

			return;
		}

		/*-----------------------------------------------------------------*/

		this.graph.clear();

		/*-----------------------------------------------------------------*/

		amiCommand.execute('GetJSONSchema -catalog="' + amiWebApp.textToString(this._catalog) + '"', {context: this}).done(function(data) {

			/*-------------------------------------------------------------*/
			/* GET JSON                                                    */
			/*-------------------------------------------------------------*/

			var json;

			try
			{
				json = JSON.parse(amiWebApp.jspath('..field{.@name==="json"}.$', data)[0] || '{}');
			}
			catch(e)
			{
				json = {/*---------------------------------------------------------------------*/};
			}

			/*-------------------------------------------------------------*/
			/* GET COLUMNS                                                 */
			/*-------------------------------------------------------------*/

			var cnt = 0;

			var tables = {};

			$.each(this._fields, function(index, value) {

				if((amiWebApp.jspath('..field{.@name==="externalCatalog"}.$', value)[0] || '') === this._catalog)
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

						if(!(table in json))
						{
							x = y = 20
								  + 10 * cnt++;
							topColor = '#0066CC';
							bodyColor = '#FFFFFF';
							strokeColor = '#0057AD';
						}
						else
						{
							x = json[table].x;
							y = json[table].y;
							color = json[table].clor;
						}

						tables[table] = {
							table: this.graph.newTable({
								position: {
									x: x,
									y: y,
								},
								table: table,
								color: color,
								showLinks: this._showLinks,
							}),
							fields: [],
						};
					}

					if(!(name in tables[table]['fields']))
					{
						tables[table]['table'].appendField({
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

			var _this = this;

			$(this._selector + ' a[data-table]').click(function(e) {

				_this.viewEntity($(this).attr('data-table'));

				e.preventDefault();
			});

			/*-------------------------------------------------------------*/
			/* GET FKEYS                                                   */
			/*-------------------------------------------------------------*/

			$.each(this._foreignKeys, function(index, value) {

				if(amiWebApp.jspath('..field{.@name==="fkExternalCatalog"}.$', value)[0] === this._catalog
				   &&
				   amiWebApp.jspath('..field{.@name==="pkExternalCatalog"}.$', value)[0] === this._catalog
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

			result.resolveWith(context, [data]);

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

				this._fields = amiWebApp.jspath('..rowset{.@type==="fields"}.row', data);
				this._foreignKeys = amiWebApp.jspath('..rowset{.@type==="foreignKeys"}.row', data);

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
		return this.currentCell;
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

	viewEntity: function(entity)
	{
		window.open(amiWebApp.webAppURL + '?subapp=tableViewer&userdata=' + encodeURIComponent('{"catalog": "' + amiWebApp.textToString(this._catalog) + '", "entity": "' + amiWebApp.textToString(entity) + '"}'), '_blank').focus();
	},

	/*---------------------------------------------------------------------*/
});
