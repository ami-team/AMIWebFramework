/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-2017 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/

$AMIClass('CatalogViewerApp', {
	/*-----------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*-----------------------------------------------------------------*/

	onReady: function(userdata)
	{
		/*---------------------------------------------------------*/

		amiWebApp.loadScripts([
			'js/3rd-party/filesaver.min.js',
			'js/3rd-party/jointjs/lodash.min.js',
			'js/3rd-party/jointjs/backbone-min.js',
			'js/3rd-party/jointjs/joint.min.js',
			'subapps/CatalogViewer/js/joint.shapes.sql.js',
		]);

		amiWebApp.loadSheets([
			'css/3rd-party/jointjs/joint.min.css',
			'subapps/CatalogViewer/css/CatalogViewerApp.css',
		]);

		/*---------------------------------------------------------*/

		$('#ami_breadcrumb_content').css('display', 'none');

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		amiWebApp.loadHTMLs([
			'subapps/CatalogViewer/twig/CatalogViewerApp.twig',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this, dict: {command: userdata}}).done(function() {
				/*-----------------------------------------*/
				/* DROP ZONE                               */
				/*-----------------------------------------*/

				var dropZone = document.getElementById('EFAEDA1C_C8B2_46EA_AC47_A591A0704FE3');

				dropZone.addEventListener('dragover', this.handleDragOver, false);
				dropZone.addEventListener('drop'    , this.handleDrop    , false);

				/*-----------------------------------------*/
				/* EDITOR                                  */
				/*-----------------------------------------*/

				var el = $('#BDA5FA36_3523_4435_8ED1_8BC0315BACAB');

				/*-----------------------------------------*/

				this.graph = new joint.dia.Graph;

				this.paper = new joint.dia.Paper({
					model: this.graph,
					el: el,
					width: 1,
					height: 1,
					gridSize: 5.0,
				});

				/*-----------------------------------------*/

				if(amiLogin.hasRole('AMI_admin_role'))
				{
					el.find('svg').css('background-image', 'url("' + this.getGridBackgroundImage(10, 10) + '")');
				}

				/*-----------------------------------------*/

				this.resizeTriggerOn = true;

				this.paper.on('resize', function(width, height) {

					if(catalogViewerApp.resizeTriggerOn)
					{
						$('#E16F14F4_FBB4_43A3_AC79_76BEE3087F77').val(catalogViewerApp.paperWidth = width);
						$('#DB5F6C24_4775_40D5_AFA4_F1847423A4B5').val(catalogViewerApp.paperHeight = height);
					}
				});

				/*-----------------------------------------*/

				this.paper.setDimensions();

				/*-----------------------------------------*/
				/* DEFAULT CATALOG                         */
				/*-----------------------------------------*/

				this.defaultCatalog = userdata;

				/*-----------------------------------------*/

				result.resolve();
			});

		}).fail(function() {

			result.reject();
		});

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	onExit: function()
	{
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
		if(this.columns
		   ||
		   this.foreignKeys
		 ) {
		 	return;
		}

		amiCommand.execute('GetSchemas', {context: this}).done(function(data1) {

			this.columns = amiWebApp.jspath('..rowset{.@type==="columns"}.row', data1);
			this.foreignKeys = amiWebApp.jspath('..rowset{.@type==="foreignKeys"}.row', data1);

			amiCommand.execute('ListCatalogs', {context: this}).done(function(data2) {

				var s = '<option value="" style="display: none;">Choose a catalog</option>';

				$.foreach(amiWebApp.jspath('..field{.@name==="externalCatalog"}.$', data2), function(index, value) {

					if(value !== 'self' || amiLogin.hasRole('AMI_admin_role'))
					{
 						if(value === this.defaultCatalog)
						{
							s += '<option value="' + amiWebApp.textToHtml(value) + '" selected="selected">' + amiWebApp.textToHtml(value) + '</option>';
						}
						else
						{
							s += '<option value="' + amiWebApp.textToHtml(value) + '" xxxxxxxx="xxxxxxxx">' + amiWebApp.textToHtml(value) + '</option>';
						}
					}
				}, this);

				$('#D015B3C1_B150_4E27_99D9_A628B3F9B0AC').html(s);

				this.openSchema(this.defaultCatalog);

			}).fail(function(data) {

				amiWebApp.error(amiWebApp.jspath('..error.$', data));
			});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data));
		});
	},

	/*-----------------------------------------------------------------*/

	onLogout: function()
	{
	},

	/*-----------------------------------------------------------------*/

	onSessionExpired: function()
	{
	},

	/*-----------------------------------------------------------------*/

	getGridBackgroundImage: function(gridX, gridY)
	{
		var canvas = document.createElement('canvas');

		canvas.width = gridX;
		canvas.height = gridY;

		if(gridX > 5
		   &&
		   gridY > 5
		 ) {
			var context = canvas.getContext('2d');

			context.beginPath();
			context.rect(
				gridX - 1,
				gridY - 1,
				1,
				1
			);
			context.fillStyle = 'black';
			context.fill();
		}

		return canvas.toDataURL('image/png');
	},

	/*-----------------------------------------------------------------*/

	fitToContent: function()
	{
		this.resizeTriggerOn = true;

		this.paper.fitToContent({
			padding: 10,
			gridWidth: 10,
			gridHeight: 10,
		});
	},

	/*-----------------------------------------------------------------*/

	setPaperWidth: function(value) {

		this.resizeTriggerOn = false;

		this.paperWidth = Math.ceil(parseInt(value, 10) / 10.0) * 10;

		this.paper.setDimensions(this.paperWidth, this.paperHeight);
	},

	/*-----------------------------------------------------------------*/

	setPaperHeight: function(value) {

		this.resizeTriggerOn = false;

		this.paperHeight = Math.ceil(parseInt(value, 10) / 10.0) * 10;

		this.paper.setDimensions(this.paperWidth, this.paperHeight);
	},

	/*-----------------------------------------------------------------*/

	handleDragOver: function(e)
	{
		e.stopPropagation();
		e.preventDefault();

		e.dataTransfer.dropEffect = 'copy';
	},

	/*-----------------------------------------------------------------*/

	handleDrop: function(e)
	{
		e.stopPropagation();
		e.preventDefault();

		var files = e.dataTransfer.files;

		for(var i = 0, file; file = files[i]; i++)
		{
			var reader = new FileReader();

			reader.onload = function(e)
			{
				try
				{
					var text = JSON.parse(e.target.result);

					catalogViewerApp.graph.fromJSON(text);

					catalogViewerApp.fitToContent();
				}
				catch(e)
				{
					amiWebApp.error(e, true);
				}
			};

			reader.readAsText(file);
		}
	},

	/*-----------------------------------------------------------------*/

	openSchema: function(catalog)
	{
		if(!catalog)
		{
			return;
		}

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		/*---------------------------------------------------------*/

		this.graph.clear();

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

			$.foreach(this.columns, function(index, value) {

				if(amiWebApp.jspath('..field{.@name==="externalCatalog"}.$', value)[0] === catalog)
				{
					var table = amiWebApp.jspath('..field{.@name==="table"}.$', value)[0];
					var name = amiWebApp.jspath('..field{.@name==="name"}.$', value)[0];
					var type = amiWebApp.jspath('..field{.@name==="type"}.$', value)[0];

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
						});
					}
				}
			}, this);

			/*-------------------------------------------------*/
			/* GET FKEYS                                       */
			/*-------------------------------------------------*/

			$.foreach(this.foreignKeys, function(index, value) {

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
			/* FIT TO CONTENT                                  */
			/*-------------------------------------------------*/

			this.fitToContent();

			/*-------------------------------------------------*/
			/* ENABLE BUTTONS                                  */
			/*-------------------------------------------------*/

			$('#EE062E82_8F6E_457D_94EA_E453CB1DD333 button').prop('disabled', false);

			/*-------------------------------------------------*/
			/* UNLOCK                                          */
			/*-------------------------------------------------*/

			amiWebApp.unlock();

			/*-------------------------------------------------*/
		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
		});
	},

	/*-----------------------------------------------------------------*/

	saveSchema: function(catalog)
	{
		if(amiLogin.hasRole('AMI_admin_role') === false)
		{
			amiWebApp.error('operation not authorized', true);

			return;
		}

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		/*---------------------------------------------------------*/

		var custom = {};

		$.each(this.graph.getCells(), function(index, value) {

			if(value.get('type') === 'sql.Table')
			{
				var position = value.get('position');
				var topColor = value.get('topColor');
				var bodyColor = value.get('bodyColor');
				var strokeColor = value.get('strokeColor');

				custom[value.get('table')] = {
					x: position.x,
					y: position.y,
					topColor: topColor,
					bodyColor: bodyColor,
					strokeColor: strokeColor,
				};
			}
		});

		/*---------------------------------------------------------*/

		if(jQuery.isEmptyObject(custom) === false)
		{
			/*-------------------------------------------------*/

			var text = JSON.stringify(custom);

			/*-------------------------------------------------*/

			amiCommand.execute('UpdateElements -catalog="self" -entity="router_catalog" -separator="%" -fields="custom" -values="' + amiWebApp.textToString(text) + '" -keyFields="externalCatalog" -keyValues="' + amiWebApp.textToString(catalog) + '"').done(function(data) {

				amiWebApp.success(amiWebApp.jspath('..info.$', data), true);

			}).fail(function(data) {

				amiWebApp.error(amiWebApp.jspath('..error.$', data), true);
			});

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	exportSchema: function()
	{
		amiWebApp.lock();

		try
		{
			var json = JSON.stringify(this.graph.toJSON());

			var blob = new Blob([json], {type: 'application/json'});

			saveAs(blob, 'schema.json');

			amiWebApp.unlock();
		}
		catch(e)
		{
			amiWebApp.error(e, true);
		}
	},

	/*-----------------------------------------------------------------*/

	printSchema: function()
	{
		var svg = $('#BDA5FA36_3523_4435_8ED1_8BC0315BACAB svg');

		var w = window.open('', '', 'height=' + svg.height() + ', width=' + svg.width() + ', toolbar=no');

		w.document.write('<html><head><style>body { margin: 0px; } .link-tools, .marker-vertices, .marker-arrowheads, .connection-wrap { display: none; } .connection { fill: none; }</style></head><body>' + $('#BDA5FA36_3523_4435_8ED1_8BC0315BACAB').html() + '</body></html>');

		$(w.document).find('svg').css('background-image', 'none');

		w.print();
		w.close();
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

catalogViewerApp = new CatalogViewerApp();

/*-------------------------------------------------------------------------*/
