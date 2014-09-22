/*!
 * AMICatalogModelerApp class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* CLASS AMICatalogModelerApp                                              */
/*-------------------------------------------------------------------------*/

function AMICatalogModelerApp() {
	/*-----------------------------------------------------------------*/
	/*-----------------------------------------------------------------*/
	/*-----------------------------------------------------------------*/

	this.onReady = function() {

		amiWebApp.loadSheets([
			'subapps/catalogmodeler/css/joint.min.css',
			'subapps/catalogmodeler/css/AMICatalogModelerApp.css',
		]).fail(function(info) {
			alert(info);
		});

		amiWebApp.loadScripts([
			'subapps/catalogmodeler/js/lodash.min.js',
			'subapps/catalogmodeler/js/backbone-min.js',
			'subapps/catalogmodeler/js/joint.min.js',
			'subapps/catalogmodeler/js/vectorizer.min.js',
			'subapps/catalogmodeler/js/geometry.min.js',
			'subapps/catalogmodeler/js/joint.shapes.sql.min.js',
		]);

		$('#ami_jumbotron_title').html('Catalog Modeler');
		$('#ami_jumbotron_content').html('');
		$('#ami_breadcrumb_content').html('<li><a href="">Admin</a></li><li><a href="">Catalog Modeler</a></li>');

		amiWebApp.loadHTML('subapps/catalogmodeler/html/AMICatalogModelerApp.html', {context: this}).done(function(data1) {
			amiWebApp.loadHTML('subapps/catalogmodeler/html/Fragment/table.html', {context: this}).done(function(data2) {
				amiWebApp.loadHTML('subapps/catalogmodeler/html/Fragment/field.html', {context: this}).done(function(data3) {
					amiWebApp.loadHTML('subapps/catalogmodeler/html/Fragment/fkey.html', {context: this}).done(function(data4) {

						amiWebApp.replaceHTML('ami_main_content', data1, {context: this}).done(function() {

							this.fragmentTable = data2;
							this.fragmentField = data3;
							this.fragmentFKey = data4;

							this.graph = new joint.dia.Graph;

							this.paper = new joint.dia.Paper({
								model: this.graph,
								el: $('#sqldiagram'),
								width: '100%',
								height: '550',
								gridSize: 10,
							});

							this.paper.on('cell:pointerdown', function(cellView, evt, x, y) {
								amiCatalogModelerApp.updateMenu(cellView.model);
							});

							this.svg = V(this.paper.svg);

							this.svgVertical = V('path').attr('d', 'M -10000 -1 L 10000 -1');
							this.svgHorizontal = V('path').attr('d', 'M -1 -10000 L -1 10000');

							this.drawGrid(10, 10);
						});
					});
				});
      			});
		});
	};

	/*-----------------------------------------------------------------*/

	this.onLogin = function() {
	};

	/*-----------------------------------------------------------------*/

	this.onLogout = function() {
	};

	/*-----------------------------------------------------------------*/

	this.onSessionExpired = function() {
	};

	/*-----------------------------------------------------------------*/
	/*-----------------------------------------------------------------*/
	/*-----------------------------------------------------------------*/

	this.drawGrid = function(gridW, gridH) {

		var width = $('#sqldiagram svg').width();
		var height = $('#sqldiagram svg').height();

		/*---------------------------------------------------------*/

		if(gridW > 2) {

			var x = gridW;

			do {
				var svgGridX = this.svgHorizontal.clone().translate(x, 0, {absolute: true}).addClass('sql_editor_grid');
				this.svg.append(svgGridX);
			
				x += gridW;
			
			} while(x < width);
		}

		/*---------------------------------------------------------*/

		if(gridH > 2) {

			var y = gridH;

			do {
				var svgGridY = this.svgVertical.clone().translate(0, y, {absolute: true}).addClass('sql_editor_grid');
				this.svg.append(svgGridY);

				y += gridH;
			
			} while(y < height);
		}

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.updateMenu = function(table) {

		var dict1 = {
			TABLE: table.getName(),
		};

		var dict2 = [];
		var dict3 = [];

		$.each(table.getFields(), function(nr, field) {

			dict2.push({
				FIELD: field['name'],
				TYPE: field['type'],
			});

			dict3.push({
				/* TODO */
			});
		});

		var divs = $('#ami-catalog-modeler-accordion table');

		divs[0].innerHTML = amiWebApp.formatHTML(this.fragmentTable, {dict: dict1});
		divs[1].innerHTML = amiWebApp.formatHTML(this.fragmentField, {dict: dict2});
		divs[2].innerHTML = amiWebApp.formatHTML(this.fragmentFKey, {dict: dict3});
	};

	/*-----------------------------------------------------------------*/

	this._cnt = 0;

	/*-----------------------------------------------------------------*/

	this.addTable = function() {

		var table = new joint.shapes.sql.Table({
			position: {x: 20, y: 20},
			name: 'Table' + this._cnt++,
			fields: [
				{name: 'id', type: 'int'},
				{name: 'name', type: 'str'},
			],
		});

		this.graph.addCells([table]);
	};

	/*-----------------------------------------------------------------*/

	this.viewSQL = function() {
	};

	/*-----------------------------------------------------------------*/

	this.synchronize = function() {
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCatalogModelerApp = new AMICatalogModelerApp();

/*-------------------------------------------------------------------------*/
