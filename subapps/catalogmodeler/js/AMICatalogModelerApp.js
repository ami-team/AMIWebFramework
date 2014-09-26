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
		]);

		amiWebApp.loadScripts([
			'subapps/catalogmodeler/js/lodash.min.js',
			'subapps/catalogmodeler/js/backbone-min.js',
			'subapps/catalogmodeler/js/joint.min.js',
			'subapps/catalogmodeler/js/vectorizer.min.js',
			'subapps/catalogmodeler/js/geometry.min.js',
			'subapps/catalogmodeler/js/joint.shapes.sql.min.js',
			'subapps/catalogmodeler/js/FileSaver.min.js',
		]);

		$('#ami_jumbotron_title').html('Catalog Modeler');
		$('#ami_jumbotron_content').html('');
		$('#ami_breadcrumb_content').html('<li><a href="">Admin</a></li><li><a href="">Catalog Modeler</a></li>');

		amiWebApp.loadHTML('subapps/catalogmodeler/html/AMICatalogModelerApp.html', {context: this}).done(function(data1) {
			amiWebApp.loadHTML('subapps/catalogmodeler/html/Fragment/table.html', {context: this}).done(function(data2) {
				amiWebApp.loadHTML('subapps/catalogmodeler/html/Fragment/field.html', {context: this}).done(function(data3) {
					amiWebApp.loadHTML('subapps/catalogmodeler/html/Fragment/fkey.html', {context: this}).done(function(data4) {

						amiWebApp.replaceHTML('ami_main_content', data1, {context: this}).done(function() {
							/*-----------------*/

							this.fragmentTable = data2;
							this.fragmentField = data3;
							this.fragmentFKey = data4;

							/*-----------------*/

							var dropZone = document.getElementById('drop_zone');

							dropZone.addEventListener('dragover', this.handleDragOver, false);
							dropZone.addEventListener('drop', this.handleFileSelect, false);
  
							/*-----------------*/

							this.graph = new joint.dia.Graph;

							this.paper = new joint.dia.Paper({
								model: this.graph,
								el: $('#editor_zone'),
								width: 900,
								height: 418,
								gridSize: 5.0,
							});

							this.svg = V(this.paper.svg);

							/*-----------------*/

							this.svgVertical = V('path').attr('d', 'M -10000 -1 L 10000 -1');
							this.svgHorizontal = V('path').attr('d', 'M -1 -10000 L -1 10000');

							this.drawGrid(10, 10);

							/*-----------------*/

							this.table = undefined;

							this.paper.on('cell:pointerclick', function(cellView) {

								if(cellView.model.get('type') === 'sql.Table') {
									amiCatalogModelerApp.table = cellView.model;
									amiCatalogModelerApp.updateMenu();
								}
							});

							/*-----------------*/
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
		/*---------------------------------------------------------*/

		var width = $('#editor_zone svg').width();
		var height = $('#editor_zone svg').height();

		/*---------------------------------------------------------*/

		if(gridW > 2) {
			var x = 0.1;

			do {
				x += gridW;

				var svgGridX = this.svgHorizontal.clone().translate(x, 0, {absolute: true}).addClass('sql_editor_grid');
				this.svg.prepend(svgGridX);

			} while(x < width);
		}

		/*---------------------------------------------------------*/

		if(gridH > 2) {
			var y = 0.1;

			do {
				y += gridH;

				var svgGridY = this.svgVertical.clone().translate(0, y, {absolute: true}).addClass('sql_editor_grid');
				this.svg.prepend(svgGridY);
			
			} while(y < height);
		}

		/*---------------------------------------------------------*/
	};

	/*-------------------------------------------------------------------------*/

	this.handleFileSelect = function(e) {
		e.stopPropagation();
		e.preventDefault();

		var files = e.dataTransfer.files;

		for(var i = 0, f = null; f = files[i]; i++) {

			var reader = new FileReader();

			reader.onload = function(e) {
				amiCatalogModelerApp.graph.fromJSON(JSON.parse(e.target.result));
			}

			reader.readAsText(f);
		}
	};

	/*-----------------------------------------------------------------*/

	this.handleDragOver = function(e) {
		e.stopPropagation();
		e.preventDefault();

		e.dataTransfer.dropEffect = 'copy';
	};

	/*-----------------------------------------------------------------*/

	this.exportSchema = function() {

		var json = JSON.stringify(this.graph.toJSON());

		var blob = new Blob([json], {type : 'application/json'});

		saveAs(blob, 'schema.json');
	};

	/*-----------------------------------------------------------------*/

	this._cnt1 = 0;
	this._cnt2 = 0;

	/*-----------------------------------------------------------------*/

	this.addTable = function() {

		var table = new joint.shapes.sql.Table({
			position: {x: 20 + 10 * this._cnt1, y: 20 + 10 * this._cnt1},
			name: 'table' + this._cnt1++,
			encoding: 'utf8_general_ci',
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

		var width = $('#editor_zone svg').width();
		var height = $('#editor_zone svg').height();

		var w = window.open('', '', 'height=' + height + ', width=' + width + ', toolbar=no');

		w.document.write('<html><head><style>body { margin: 0px; } .link-tools, .marker-vertices, .marker-arrowheads, .connection-wrap { opacity: 0; } .connection { fill: none; }</style></head><body>' + $('#editor_zone').html() + '</body></html>');
		w.print();
        	w.close();
	};

	/*-----------------------------------------------------------------*/

	this.synchronize = function() {

		var json = this.graph.toJSON();

		this.graph.clear();
		alert(JSON.stringify(json));

		this.graph.fromJSON(json);
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

			var tableName     = this.table.getName    ();
			var tableEncoding = this.table.getEncoding();

			/*-------------------------------------------------*/

			dict1['NAME'] = tableName;

			dict1['ENCODINGS'] = (
				'<option value="utf8_general_ci">utf8_general_ci</option>'
				+
				'<option value="utf8_bin">utf8_bin</option>'
				+
				'<option value="latin1_general_ci">latin1_general_ci</option>'
				+
				'<option value="latin1_bin">latin1_bin</option>'

			).replace('value="' + tableEncoding + '"', 'value="' + tableEncoding + '" selected="selected"');

			/*-------------------------------------------------*/

			$.each(this.graph.getElements(), function(index, table) {

				var name = table.getName();

				if(tableName != name) {
					tables += '<option value="' + name + '">' + name + '</option>';
				}
			});

			/*-------------------------------------------------*/

			$.each(this.table.getFields(), function(index, field) {

				var name = field['name'];
				var type = field['type'];

				dict2.push({
					INDEX: index,
					NAME: name,
					TYPE: type,
				});

				fields += '<option value="' + name + '">' + name + '</option>';
			});

			/*-------------------------------------------------*/

			$.each(this.table.getFKeys(), function(index, fkey) {

				var field = fkey['field'];
				var table = fkey['table'];

				dict3.push({
					INDEX: index,
					FIELDS: fields.replace('value="' + field + '"', 'value="' + field + '" selected="selected"'),
					TABLES: tables.replace('value="' + table + '"', 'value="' + table + '" selected="selected"'),
				});
			});

			/*-------------------------------------------------*/

			var divs = $('#ami-catalog-modeler-tab-properties table tbody');

			if(!soft) {
				divs[0].innerHTML = amiWebApp.formatHTML(this.fragmentTable, {dict: dict1});
				divs[1].innerHTML = amiWebApp.formatHTML(this.fragmentField, {dict: dict2});
			}
			if(!0x00) {
				divs[2].innerHTML = amiWebApp.formatHTML(this.fragmentFKey, {dict: dict3});
			}

			/*-------------------------------------------------*/
		}
	};

	/*-----------------------------------------------------------------*/

	this.updateArrows = function() {
		/*---------------------------------------------------------*/

		var dict = {}

		$.each(this.graph.getElements(), function(index, curr_table) {

			dict[curr_table.getName()] = curr_table;
		});

		/*---------------------------------------------------------*/

		var arrows = [];

		$.each(this.graph.getElements(), function(index, curr_table) {

			$.each(curr_table.getFKeys(), function(index, curr_fkey) {

				var source = curr_table.getName();

				var target = curr_fkey['table'];

				if(target !== '') {
					arrows.push({
						source: dict[source].id,
						target: dict[target].id,
					});
				}
			});
		});

		/*---------------------------------------------------------*/

		var graph = this.graph;

		$.each(arrows, function(index, curr_arrow) {

			var link = new joint.dia.Link({
				source: { id: curr_arrow['source'] },
				target: { id: curr_arrow['target'] },
			});

			link.attr({
				'.connection': {'stroke': '#707070', 'stroke-width': 3},
				'.marker-source': {'stroke': '#707070', 'fill': '#707070', 'd': 'm 14.456044,15.990164 1.23e-4,7.500564 0,-7.179668 -9.0002053,5.179668 0,-11.000206 9.0000823,5.178745 1.23e-4,-7.178745 z'}
			});

			graph.addCell(link);
		});

		/*---------------------------------------------------------*/
	}

	/*-----------------------------------------------------------------*/

	this.setTableName = function(name) {

		if(this.table) {
			this.table.setName(name);
		}
	};

	/*-----------------------------------------------------------------*/

	this.setTableEncoding = function(encoding) {

		if(this.table) {
			this.table.setEncoding(encoding);
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
			this.updateArrows();
		}
	};

	/*-----------------------------------------------------------------*/

	this.setFKeyField = function(value, index) {

		if(this.table) {
			var fKeys = this.table.getFKeys();

			fKeys[index]['field'] = value;

			this.table.setFKeys(fKeys);
			this.updateArrows();
		}
	};

	/*-----------------------------------------------------------------*/

	this.setFKeyTable = function(value, index) {

		if(this.table) {
			var fKeys = this.table.getFKeys();

			fKeys[index]['table'] = value;

			this.table.setFKeys(fKeys);
			this.updateArrows();
		}
	};

	/*-----------------------------------------------------------------*/

	this.removeFKey = function(index) {

		if(this.table) {
			var fKeys = this.table.getFKeys();

			fKeys.splice(index, 1);
			
			this.table.setFKeys(fKeys);
			this.updateMenu({soft: false});
			this.updateArrows();
		}
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCatalogModelerApp = new AMICatalogModelerApp();

/*-------------------------------------------------------------------------*/
