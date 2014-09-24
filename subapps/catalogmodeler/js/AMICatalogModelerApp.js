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

							this.table = undefined;

							this.paper.on('cell:pointerdown', function(cellView, evt, x, y) {
								amiCatalogModelerApp.table = cellView.model;
								amiCatalogModelerApp.updateMenu();
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
				this.svg.prepend(svgGridX);
			
				x += gridW;
			
			} while(x < width);
		}

		/*---------------------------------------------------------*/

		if(gridH > 2) {

			var y = gridH;

			do {
				var svgGridY = this.svgVertical.clone().translate(0, y, {absolute: true}).addClass('sql_editor_grid');
				this.svg.prepend(svgGridY);

				y += gridH;
			
			} while(y < height);
		}

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this._cnt1 = 0;
	this._cnt2 = 0;

	/*-----------------------------------------------------------------*/

	this.addTable = function() {

		var table = new joint.shapes.sql.Table({
			position: {x: 20, y: 20},
			name: 'Table' + this._cnt1++,
			fields: [
				{name: 'id', type: 'INT'}
			]
		});

		this.graph.addCell(table);
	};

	/*-----------------------------------------------------------------*/

	this.addField = function() {

		if(this.table) {

			var fields = this.table.getFields();

			fields.push({name: 'field' + this._cnt2++, type: 'INT'});

			this.table.setFields(fields);
			this.updateMenu();

		} else {
			alert('Please, select a table.');
		}
	};

	/*-----------------------------------------------------------------*/

	this.addForeignKey = function() {

		if(this.table) {

			var fields = this.table.getFKeys();

			fields.push({field: '', table: ''});

			this.table.setFKeys(fields);
			this.updateMenu();

		} else {
			alert('Please, select a table.');
		}
	};

	/*-----------------------------------------------------------------*/

	this.printDiagram = function() {

		var restorepage = document.body.innerHTML;
		var printcontent = document.getElementById('sqldiagram').innerHTML;

		document.body.innerHTML = printcontent;
		window.print();
		document.body.innerHTML = restorepage;
	};

	/*-----------------------------------------------------------------*/

	this.synchronize = function() {
	};

	/*-----------------------------------------------------------------*/

	this.updateMenu = function(settings) {

		if(this.table) {
			/*-------------------------------------------------*/

			var soft = false;

			if(settings) {

				if('soft' in settings) {
					soft = settings['soft'];
				}
			}

			/*-------------------------------------------------*/

			var dict1 = {};
			var dict2 = [];
			var dict3 = [];

			var tables = '<option value="">--</option>';
			var fields = '<option value="">--</option>';

			/*-------------------------------------------------*/

			var cur_name = this.table.getName();

			$.each(this.graph.getElements(), function(index, this_table) {

				var new_name = this_table.getName();

				if(cur_name != new_name) {
					tables += '<option value="' + new_name + '">' + new_name + '</option>';
				}
			});

			/*-------------------------------------------------*/

			dict1['TABLE'] = cur_name;

			/*-------------------------------------------------*/

			$.each(this.table.getFields(), function(index, this_field) {

				dict2.push({
					INDEX: index,
					NAME: this_field['name'],
					TYPE: this_field['type'],
				});

				fields += '<option value="' + this_field['name'] + '">' + this_field['name'] + '</option>';
			});

			/*-------------------------------------------------*/

			$.each(this.table.getFKeys(), function(index, this_fkey) {

				var field = this_fkey['field'];
				var table = this_fkey['table'];

				var _fields = fields.replace('value="' + field + '"', 'value="' + field + '" selected="selected"');
				var _tables = tables.replace('value="' + table + '"', 'value="' + table + '" selected="selected"');

				dict3.push({
					INDEX: index,
					FIELDS: _fields,
					TABLES: _tables,
				});
			});

			/*-------------------------------------------------*/

			var divs = $('#ami-catalog-modeler-accordion table tbody');

			if(!soft) {
				divs[0].innerHTML = amiWebApp.formatHTML(this.fragmentTable, {dict: dict1});
				divs[1].innerHTML = amiWebApp.formatHTML(this.fragmentField, {dict: dict2});
			}
			if(0x001) {
				divs[2].innerHTML = amiWebApp.formatHTML(this.fragmentFKey, {dict: dict3});
			}

			/*-------------------------------------------------*/
		}
	};

	/*-----------------------------------------------------------------*/

	this.setTableName = function(name) {

		if(this.table) {
			this.table.setName(name);
		}
	};

	/*-----------------------------------------------------------------*/

	this.removeTable = function(name) {

		if(this.table) {
			alert('TODO');
		}
	};

	/*-----------------------------------------------------------------*/

	this.setFieldName = function(value, index) {

		if(this.table) {

			var fields = this.table.getFields();

			fields[index]['name'] = value;
			
			this.table.setFields(fields);
			this.updateMenu({soft: true});
		}
	};

	/*-----------------------------------------------------------------*/

	this.setFieldType = function(value, index) {

		if(this.table) {

			var fields = this.table.getFields();

			fields[index]['type'] = value;
			
			this.table.setFields(fields);
			this.updateMenu({soft: true});
		}
	};

	/*-----------------------------------------------------------------*/

	this.removeField = function(index) {

		if(this.table) {
			var fields = this.table.getFields();

			fields.splice(index, 1);
			
			this.table.setFields(fields);
			this.updateMenu({soft: false});
		}
	};

	/*-----------------------------------------------------------------*/

	this.setFKeyField = function(value, index) {

		if(this.table) {
			var fKeys = this.table.getFKeys();

			fKeys[index]['field'] = value;

			this.table.setFKeys(fKeys);
		}
	};

	/*-----------------------------------------------------------------*/

	this.setFKeyTable = function(value, index) {

		if(this.table) {
			var fKeys = this.table.getFKeys();

			fKeys[index]['table'] = value;

			this.table.setFKeys(fKeys);
		}
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCatalogModelerApp = new AMICatalogModelerApp();

/*-------------------------------------------------------------------------*/
