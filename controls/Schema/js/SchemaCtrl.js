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

$AMIClass('SchemaCtrl', {
	/*-----------------------------------------------------------------*/

	$extends: ami.Control,

	/*-----------------------------------------------------------------*/

	$init: function()
	{
		this.$super.$init();
	},

	/*-----------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/js/3rd-party/filesaver.min.js',

			amiWebApp.originURL + '/js/3rd-party/jointjs/lodash.min.js',
			amiWebApp.originURL + '/js/3rd-party/jointjs/backbone-min.js',

			amiWebApp.originURL + '/js/3rd-party/jointjs/joint.min.js',
			amiWebApp.originURL + '/css/3rd-party/jointjs/joint.min.css',

			amiWebApp.originURL + '/controls/Schema/js/joint.shapes.sql.js',
			amiWebApp.originURL + '/controls/Schema/css/SchemaCtrl.css',

			'ctrl:messageBox',
			'ctrl:textBox',
		], {context: this}).done(function(data) {

			this.columns = null;
			this.foreignKeys = null;
		});
	},

	/*-----------------------------------------------------------------*/

	render: function(id, catalog, settings)
	{
		var _this = this;

		/*---------------------------------------------------------*/

		var el1 = $(this._id = id);

		el1.css('box-shadow', '0px 1px 0px rgba(255, 255, 255, 0.15) inset, 0 1px 5px rgba(0, 0, 0, 0.075)');
		el1.css('border', '1px solid rgb(231, 231, 231)');
		el1.css('border-radius', '4px');
		el1.css('overflow-x', 'scroll');
		el1.css('overflow-y', 'scroll');
		el1.css('padding', '10px');

		/*---------------------------------------------------------*/

		var el2 = $('<div class="ami-schema"></div>').appendTo(el1);

		/*---------------------------------------------------------*/

		this.graph = new joint.dia.Graph;

		this.paper = new joint.dia.Paper({
			model: this.graph,
			el: el2,
			width: 1,
			height: 1,
			gridSize: 5.0,
		});

		/*---------------------------------------------------------*/

		return this.refresh(catalog, settings);

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	getSchemas: function()
	{
		return amiCommand.execute('GetSchemas', {context: this}).done(function(data) {

			this.columns = amiWebApp.jspath('..rowset{.@type==="columns"}.row', data);
			this.foreignKeys = amiWebApp.jspath('..rowset{.@type==="foreignKeys"}.row', data);
		});
	},

	/*-----------------------------------------------------------------*/

	_refresh: function(result, catalog, settings)
	{
		context = result;

		editable = false;

		width = 2000;
		height = 2000;

		if(settings)
		{
			if('context' in settings) {
				context = setting['context'];
			}

			if('editable' in settings) {
				editable = setting['editable'];
			}

			if('width' in settings) {
				width = setting['width'];
			}

			if('height' in settings) {
				height = setting['height'];
			}
		}

		if(!catalog)
		{
			result.rejectWith(context);

			return;
		}

		/*---------------------------------------------------------*/

		this.graph.clear();

		this.paper.setDimensions(width, height);

		/*---------------------------------------------------------*/

		amiCommand.execute('SearchQuery -catalog="self" -sql="SELECT `custom` FROM `router_catalog` WHERE `externalCatalog` = \'' + amiWebApp.textToString(catalog) + '\'"', {context: this}).done(function(data) {

			/*-------------------------------------------------*/
			/* GET JSON INFO                                   */
			/*-------------------------------------------------*/

			var custom;

			try
			{
				custom = JSON.parse(amiWebApp.jspath('..field{.@name==="custom"}.$', data)[0] || '{}');
			}
			catch(e)
			{
				custom = {};
			}

			/*-------------------------------------------------*/
			/* GET COLUMNS                                     */
			/*-------------------------------------------------*/

			var cnt = 0;

			var tables = {};

			$.each(this.columns, function(index, value) {

				if(amiWebApp.jspath('..field{.@name==="externalCatalog"}.$', value)[0] === catalog)
				{
					var table = amiWebApp.jspath('..field{.@name==="table"}.$', value)[0];
					var name = amiWebApp.jspath('..field{.@name==="name"}.$', value)[0];
					var type = amiWebApp.jspath('..field{.@name==="type"}.$', value)[0];
					var primary = amiWebApp.jspath('..field{.@name==="primary"}.$', value)[0];

					if(!(table in tables))
					{
						var x;
						var y;
						var topColor;
						var bodyColor;
						var strokeColor;

						if(!(table in custom))
						{
							x = y = 20
							      + 10 * cnt++;
							topColor = '#0066CC';
							bodyColor = '#FFFFFF';
							strokeColor = '#0057AD';
						}
						else
						{
							x = custom[table].x;
							y = custom[table].y;
							topColor = custom[table].topColor;
							bodyColor = custom[table].bodyColor;
							strokeColor = custom[table].strokeColor;
						}

						tables[table] = {
							table: this.graph.newTable({
								position: {
									x: x,
									y: y,
								},
								catalog: catalog,
								table: table,
								topColor: topColor,
								bodyColor: bodyColor,
								strokeColor: strokeColor,
							}),
							fields: [],
						};
					}

					if(!(name in tables[table]['fields']))
					{
						tables[table]['table'].appendField({
							name: name,
							type: type,
							primary: primary === 'true',
						});
					}
				}
			}, this);

			/*-------------------------------------------------*/
			/* GET FKEYS                                       */
			/*-------------------------------------------------*/

			$.each(this.foreignKeys, function(index, value) {

				if(amiWebApp.jspath('..field{.@name==="fkExternalCatalog"}.$', value)[0] === catalog
				   &&
				   amiWebApp.jspath('..field{.@name==="pkExternalCatalog"}.$', value)[0] === catalog
				 ) {
					var fkTable = amiWebApp.jspath('..field{.@name==="fkTable"}.$', value)[0];
					var pkTable = amiWebApp.jspath('..field{.@name==="pkTable"}.$', value)[0];

					this.graph.newForeignKey(
						tables[fkTable]['table'].get('id'),
						tables[pkTable]['table'].get('id'),
					);
				}
			}, this);

			/*-------------------------------------------------*/

			result.resolveWith(context);

			/*-------------------------------------------------*/

		}).fail(function(data) {

			result.rejectWith(context, [data]);
		})
	},

	/*-----------------------------------------------------------------*/

	refresh: function(catalog, settings)
	{
		var result = $.Deferred();

		if(this.columns
		   &&
		   this.foreignKeys
		 ) {
			this._refresh(result, catalog, settings);
		}
		else
		{
			this.getSchemas().done(function() {

				this._refresh(result, catalog, settings);
			})
		}

		return result;
	},

	/*-----------------------------------------------------------------*/

	clear: function()
	{
		this.graph.clear();

		this.paper.setDimensions(1, 1);
	},

	/*-----------------------------------------------------------------*/

	exportSchema: function()
	{
		try
		{
			var json = JSON.stringify(this.graph.toJSON());

			var blob = new Blob([json], {
				type: 'application/json'
			});

			saveAs(blob, 'schema.json');
		}
		catch(e)
		{
			amiWebApp.error(e, true);
		}
	},

	/*-----------------------------------------------------------------*/

	printSchema: function()
	{
		/*---------------------------------------------------------*/

		var svg = $(this._id + ' svg');

		/*---------------------------------------------------------*/

		var w = window.open('', '', 'height=' + svg.height() + ', width=' + svg.width() + ', toolbar=no');

		w.document.write('<html><head><style>body { margin: 0px; } .link-tools, .marker-vertices, .marker-arrowheads, .connection-wrap { display: none; } .connection { fill: none; }</style></head><body>' + $('#BDA5FA36_3523_4435_8ED1_8BC0315BACAB').html() + '</body></html>');

		$(w.document).find('svg').css('background-image', 'none');

		w.print();
		w.close();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});
