/*!
 * AMICatalogModelerApp class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/

function __hhh(graph) {

	var tables = {};

	$.each(graph.getElements(), function(index1, item1) {

		var fields = {};
	
		$.each(item.getFields(), function(index2, item2) {

			fields[item2['name']] = item2;
		});

		tables[item1.getName()] = {
			table: item1,
			fields: fields,
		};
	});

	return tables;
}

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
					amiWebApp.loadHTML('subapps/catalogmodeler/html/Fragment/fekey.html', {context: this}).done(function(data4) {
						amiWebApp.loadHTML('subapps/catalogmodeler/html/Fragment/index.html', {context: this}).done(function(data5) {

							amiWebApp.replaceHTML('ami_main_content', data1, {context: this}).done(function() {
								/*---------*/

								this.fragmentTable = data2;
								this.fragmentField = data3;
								this.fragmentFeKey = data4;
								this.fragmentIndex = data5;

								/*---------*/

								var dropZone = document.getElementById('drop_zone');

								dropZone.addEventListener('dragover', this.handleDragOver, false);
								dropZone.addEventListener('drop', this.handleFileSelect, false);
  
								/*---------*/

								this.graph = new joint.dia.Graph;

								this.paper = new joint.dia.Paper({
									model: this.graph,
									el: $('#editor_zone'),
									width: 900,
									height: 343,
									gridSize: 5.0,
								});

								this.svg = V(this.paper.svg);

								/*---------*/

								this.svgVertical = V('path').attr('d', 'M -10000 -1 L 10000 -1');
								this.svgHorizontal = V('path').attr('d', 'M -1 -10000 L -1 10000');

								this.drawGrid(10, 10);

								/*---------*/

								this.table = undefined;

								this.paper.on('cell:pointerclick', function(cellView) {

									if(cellView.model.get('type') === 'sql.Table') {
										amiCatalogModelerApp.table = cellView.model;
										amiCatalogModelerApp.updateMenu();
									}
								});

								/*---------*/
							});
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
		this.clearSchemes();
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

	/*-----------------------------------------------------------------*/

	this.listSchemes = function() {

		routerDBs = [];

		this.clearSchemes();

		amiCommand.execute('SearchQuery -project="self" -processingStep="self" -sql="SELECT router_db.db, router_project.name AS project, router_process.name AS process, router_db.jsonSchema FROM router_db, router_project, router_process WHERE router_db.process = router_project.identifier AND router_db.project = router_process.identifier"').done(function(data) {

			var rows = amiWebApp.jspath('..row', data);

			$.each(rows, function(index, row) {
				var db = amiWebApp.jspath('..field{.@name==="db"}.$', row)[0];
				var project = amiWebApp.jspath('..field{.@name==="project"}.$', row)[0];
				var process = amiWebApp.jspath('..field{.@name==="process"}.$', row)[0];
				var jsonSchema = amiWebApp.jspath('..field{.@name==="jsonSchema"}.$', row)[0];

				if(!jsonSchema) {
					jsonSchema = '{"cells":[]}';
				}

				$('#ami-catalog-modeler-catalog-list').append('<option value="' + index + '">' + db + '</option>');

				routerDBs.push({
					db: db,
					project: project,
					process: process,
					jsonSchema: jsonSchema,
				});
			});

		}).fail(function(data) {
			alert(JSPath.apply('..error.$', data)[0]);
		});

		this.routerDBs = routerDBs;
	};

	/*-----------------------------------------------------------------*/

	this.clearSchemes = function() {
		$('#ami-catalog-modeler-catalog-list').empty();
	};

	/*-----------------------------------------------------------------*/

	this.openSchema = function() {
		/*---------------------------------------------------------*/

		var db = this.routerDBs[$('#ami-catalog-modeler-catalog-list').val()];

		var name = db['name'];
		var project = db['project'];
		var process = db['process'];
		var jsonSchema = db['jsonSchema'];

		/*---------------------------------------------------------*/

		this.graph.fromJSON(JSON.parse(jsonSchema));

		/*---------------------------------------------------------*/

		var tables = __hhh(this.graph);

		/*---------------------------------------------------------*/

 		amiCommand.execute('SearchQuery -project="' + project + '" -processingStep="' + process + '" -glite="SELECT db_field.tab, db_field.field, db_field.type WHERE (1=1)"', {context: this}).done(function(data) {

			var cnt = 0;

			var graph = this.graph;

			var rows = amiWebApp.jspath('..row', data);

			$.each(rows, function(index, row) {
				var tab = amiWebApp.jspath('..field{.@name==="tab"}.$', row)[0];
				var field = amiWebApp.jspath('..field{.@name==="field"}.$', row)[0];
				var type = amiWebApp.jspath('..field{.@name==="type"}.$', row)[0];

				if(tab.indexOf('db_') != 0) {

 					if(!(tab in tables)) {
	
						table = graph.newTable({
							position: {x: 20 + 10 * cnt, y: 20 + 10 * cnt},
							name: tab,
							encoding: 'utf8_general_ci',
							fields: [],
						});

						cnt++;

						tables[tab] = {
							table: table,
							fields: {   },
						};
					}

					if(!(field in tables[tab]['fields'])) {

						tables[tab]['table'].appendField({
							name: field,
							type: type,
						});
					}
				}
			});

			$('#collapse3').addClass('in');
		});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.handleFileSelect = function(e) {
		e.stopPropagation();
		e.preventDefault();

		var files = e.dataTransfer.files;

		for(var i = 0, f = null; f = files[i]; i++) {

			var reader = new FileReader();

			reader.onload = function(e) {
				amiCatalogModelerApp.graph.fromJSON(JSON.parse(e.target.result));
				$('#collapse3').addClass('in');
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

		alert(this.graph.getElements());
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
			var dict4 = [];

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

			$.each(this.graph.getElements(), function(index, item) {

				var name = item.getName();

				if(tableName != name) {
					tables += '<option value="' + name + '">' + name + '</option>';
				}
			});

			/*-------------------------------------------------*/

			$.each(this.table.getFields(), function(index, item) {

				var name = item['name'];
				var type = item['type'];

				dict2.push({
					INDEX: index,
					NAME: name,
					TYPE: type,
				});

				fields += '<option value="' + name + '">' + name + '</option>';
			});

			/*-------------------------------------------------*/

			$.each(this.table.getFeKeys(), function(index, item) {

				var field = item['field'];
				var table = item['table'];

				dict3.push({
					INDEX: index,
					FIELDS: fields.replace('value="' + field + '"', 'value="' + field + '" selected="selected"'),
					TABLES: tables.replace('value="' + table + '"', 'value="' + table + '" selected="selected"'),
				});
			});

			/*-------------------------------------------------*/

			$.each(this.table.getIndices(), function(index, item) {

				var field = item['field'];

				dict4.push({
					INDEX: index,
					FIELDS: fields.replace('value="' + field + '"', 'value="' + field + '" selected="selected"'),
				});
			});

			/*-------------------------------------------------*/

			$('#collapse4').addClass('in');
			$('#collapse5').addClass('in');
			$('#collapse6').addClass('in');
			$('#collapse7').addClass('in');

			if(soft == false) {
				$('#collapse5 tbody').html(amiWebApp.formatHTML(this.fragmentField, {dict: dict2}));
			}
			if(0x00 == false) {
				$('#collapse4 tbody').html(amiWebApp.formatHTML(this.fragmentTable, {dict: dict1}));
				$('#collapse6 tbody').html(amiWebApp.formatHTML(this.fragmentFeKey, {dict: dict3}));
				$('#collapse7 tbody').html(amiWebApp.formatHTML(this.fragmentIndex, {dict: dict4}));
			}

			/*-------------------------------------------------*/
		} else {
			/*-------------------------------------------------*/

			$('#collapse4').removeClass('in');
			$('#collapse5').removeClass('in');
			$('#collapse6').removeClass('in');
			$('#collapse7').removeClass('in');

			$('#collapse4 tbody').html('');
			$('#collapse5 tbody').html('');
			$('#collapse6 tbody').html('');
			$('#collapse7 tbody').html('');

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

			$.each(curr_table.getFeKeys(), function(index, curr_fekey) {

				var source = curr_table.getName();

				var target = curr_fekey['table'];

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
	/* TABLE                                                           */
	/*-----------------------------------------------------------------*/

	this._table_cnt = 0;

	/*-----------------------------------------------------------------*/

	this.addTable = function() {

		this.graph.newTable({
			position: {x: 20 + 10 * this._table_cnt, y: 20 + 10 * this._table_cnt},
			name: 'table' + this._table_cnt++,
			encoding: 'utf8_general_ci',
			fields: [{
				name: 'id',
				type: 'INT',
			}],
		});
	};

	/*-----------------------------------------------------------------*/

	this.removeTable = function() {

		if(this.table) {
			this.table.remove();

			this.table = undefined;

			this.updateMenu();
		}
	};

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
	/* FIELD                                                           */
	/*-----------------------------------------------------------------*/

	this.addField = function() {

		if(this.table) {
			var fields = this.table.appendField({
				name: '???',
				type: '???',
			});

			this.updateMenu();

		} else {
			alert('Please, select a table.');
		}
	};

	/*-----------------------------------------------------------------*/

	this.removeField = function(index) {

		if(this.table) {
			this.table.removeField(index);

			this.updateMenu();
			this.updateArrows();
		}
	};

	/*-----------------------------------------------------------------*/

	this.setFieldName = function(value, index) {

		if(this.table) {
			var item = this.table.getField(index);
			item['name'] = value;
			this.table.setField(index, item)

			this.updateMenu({soft: true});
		}
	};

	/*-----------------------------------------------------------------*/

	this.setFieldType = function(value, index) {

		if(this.table) {
			var item = this.table.getField(index);
			item['type'] = value;
			this.table.setField(index, item)

			this.updateMenu({soft: true});
		}
	};

	/*-----------------------------------------------------------------*/
	/* FEKEY                                                           */
	/*-----------------------------------------------------------------*/

	this.addFeKey = function() {

		if(this.table) {
			var fields = this.table.appendFeKey({
				field: '',
				table: '',
			});

			this.updateMenu();

		} else {
			alert('Please, select a table.');
		}
	};

	/*-----------------------------------------------------------------*/

	this.removeFeKey = function(index) {

		if(this.table) {
			this.table.removeFeKey(index);

			this.updateMenu();
			this.updateArrows();
		}
	};

	/*-----------------------------------------------------------------*/

	this.setFeKeyField = function(value, index) {

		if(this.table) {
			var item = this.table.getFeKey(index);
			item['field'] = value;
			this.table.setFeKey(index, item)

			this.updateArrows();
		}
	};

	/*-----------------------------------------------------------------*/

	this.setFeKeyTable = function(value, index) {

		if(this.table) {
			var item = this.table.getFeKey(index);
			item['table'] = value;
			this.table.setFeKey(index, item)

			this.updateArrows();
		}
	};

	/*-----------------------------------------------------------------*/
	/* INDEX                                                           */
	/*-----------------------------------------------------------------*/

	this.addIndex = function() {

		if(this.table) {
			this.table.appendIndex({
				field: ''
			});

			this.updateMenu();

		} else {
			alert('Please, select a table.');
		}
	};

	/*-----------------------------------------------------------------*/

	this.removeIndex = function(index) {

		if(this.table) {
			this.table.removeIndex(index);

			this.updateMenu();
		}
	};

	/*-----------------------------------------------------------------*/

	this.setIndexField = function(value, index) {

		if(this.table) {
			var item = this.table.getIndex(index);
			item['field'] = value;
			this.table.setIndex(index, item);
		}
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCatalogModelerApp = new AMICatalogModelerApp();

/*-------------------------------------------------------------------------*/
