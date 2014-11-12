/*!
 * AMIDBModelerApp class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* CLASS AMIDBModelerApp                                                   */
/*-------------------------------------------------------------------------*/

function AMIDBModelerApp() {
	/*-----------------------------------------------------------------*/
	/*-----------------------------------------------------------------*/
	/*-----------------------------------------------------------------*/

	this.onReady = function() {

		amiWebApp.loadSheets([
			'tools/common/css/joint.min.css',
			'subapps/DBModeler/css/AMIDBModelerApp.css',
		]);

		amiWebApp.loadScripts([
			'tools/common/js/lodash.min.js',
			'tools/common/js/backbone-min.js',
			'tools/common/js/joint.min.js',
			'tools/common/js/vectorizer.min.js',
			'tools/common/js/geometry.min.js',
			'tools/common/js/filesaver.min.js',
			'subapps/DBModeler/js/joint.shapes.sql.min.js',
		]);

		$('#ami_jumbotron_title').html('DB Modeler');
		$('#ami_jumbotron_content').html('');
		$('#ami_breadcrumb_content').html('<li><a href="">Admin</a></li><li><a href="">DB Modeler</a></li>');

		try {
			var isBrowserSupported = !!new Blob;

		} catch(e) {};

		if(!isBrowserSupported) {
			amiWebApp.error('Your browser is not supported, this application requires: Firefox 20+, Chrome 1.0+, Safari 6.1+, Opera 15+, IE 10+.');

			return;
		}

		amiWebApp.loadHTML('subapps/DBModeler/html/AMIDBModelerApp.html', {context: this}).done(function(data) {

			amiWebApp.replaceHTML('ami_main_content', data, {context: this}).done(function() {
				/*-----------------------------------------*/

				amiWebApp.loadHTML('subapps/DBModeler/html/Fragment/path.html', {context: this}).done(function(data) {
					this.fragmentPath = data;
				});
				amiWebApp.loadHTML('subapps/DBModeler/html/Fragment/table.html', {context: this}).done(function(data) {
					this.fragmentTable = data;
				});
				amiWebApp.loadHTML('subapps/DBModeler/html/Fragment/field.html', {context: this}).done(function(data) {
					this.fragmentField = data;
				});
				amiWebApp.loadHTML('subapps/DBModeler/html/Fragment/fekey.html', {context: this}).done(function(data) {
					this.fragmentFeKey = data;
				});
				amiWebApp.loadHTML('subapps/DBModeler/html/Fragment/index.html', {context: this}).done(function(data) {
					this.fragmentIndex = data;
				});

				/*-----------------------------------------*/

				amiWebApp.loadHTML('subapps/DBModeler/html/Fragment/tableColorModal.html').done(function(data) {
					amiWebApp.appendHTML('ami_modal_content', data);
				});

				amiWebApp.loadHTML('subapps/DBModeler/html/Fragment/fieldOptionModal.html').done(function(data) {
					amiWebApp.appendHTML('ami_modal_content', data);
				});

				/*-----------------------------------------*/

				var dropZone = document.getElementById('drop_zone');

				dropZone.addEventListener('dragover', this.handleDragOver, false);
				dropZone.addEventListener('drop'    , this.handleDrop    , false);
  
  				/*-----------------------------------------*/

				this.dbName = '?';
				this.dbWidth = 900;
				this.dbHeight = 340;
				this.engineAlias = '';
				this.engineActive = false;
				this.enginePaths = [];

				$('#dbName').val(this.dbName);
				$('#dbWidth').val(this.dbWidth);
				$('#dbHeight').val(this.dbHeight);

				/*-----------------------------------------*/

				this.table = null;

				/*-----------------------------------------*/

				this.graph = new joint.dia.Graph;

				this.paper = new joint.dia.Paper({
					model: this.graph,
					el: $('#editor_zone'),
					width: this.dbWidth,
					height: this.dbHeight,
					gridSize: 5.0,
				});

				/*-----------------------------------------*/

				$('#editor_zone svg').css('background-image', 'url("' + getGridBackgroundImage(10, 10) + '")');

				/*-----------------------------------------*/

				this.paper.on('cell:pointerclick', function(cellView) {

					if(cellView.model.get('type') === 'sql.Table') {
						amiDBModelerApp.table = cellView.model;
						amiDBModelerApp.update({
							menu: true,
							soft: false,
							arrows: false,
						});
					}
				});

				/*-----------------------------------------*/
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

	function getGridBackgroundImage(gridX, gridY) {

		var canvas = document.createElement('canvas');

		canvas.width = gridX;
		canvas.height = gridY;

		if(gridX > 5 && gridY > 5) {

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
	};

	/*-----------------------------------------------------------------*/

	this.loadSchema = function(db, json) {
		/*---------------------------------------------------------*/

		try {
			this.graph.fromJSON(JSON.parse(json));

		} catch(e) {
			amiWebApp.error(e);
		}

		/*---------------------------------------------------------*/

		this.dbName = db;
		this.dbWidth = $('#editor_zone svg').width() + 2;
		this.dbHeight = $('#editor_zone svg').height() + 2;

		$('#dbName').val(this.dbName);
		$('#dbWidth').val(this.dbWidth);
		$('#dbHeight').val(this.dbHeight);

		/*---------------------------------------------------------*/

		$('#__collapse4').removeClass('in');
		$('#__collapse5').removeClass('in');
		$('#__collapse6').removeClass('in');
		$('#__collapse7').removeClass('in');

		$('#__table_content').empty();
		$('#__field_content').empty();
		$('#__fekey_content').empty();
		$('#__index_content').empty();

		/*---------------------------------------------------------*/

		this.table = null;

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.clearSchemes = function() {
		$('#ami-catalog-modeler-catalog-list').empty();
	};

	/*-----------------------------------------------------------------*/

	this.fitToContent = function() {

		this.paper.fitToContent({
			padding: 20,
			gridWidth: 10,
			gridHeight: 10,
		});
	};

	/*-----------------------------------------------------------------*/

	this.listSchemes = function() {

		amiWebApp.lock();

		this.clearSchemes();

		amiCommand.execute('SearchQuery -project="self" -processingStep="self" -sql="SELECT router_db.db, router_project.name AS project, router_process.name AS process FROM router_db, router_project, router_process WHERE router_db.process = router_process.identifier AND router_db.project = router_project.identifier"').done(function(data) {

			var rows = amiWebApp.jspath('..row', data);

			$.each(rows, function(index, row) {
				var db = amiWebApp.jspath('..field{.@name==="db"}.$', row)[0];
				var project = amiWebApp.jspath('..field{.@name==="project"}.$', row)[0];
				var process = amiWebApp.jspath('..field{.@name==="process"}.$', row)[0];

				if(project !== 'self'
				   ||
				   process !== 'self'
				 ) {
					$('#ami-catalog-modeler-catalog-list').append('<option value="' + db + '">' + db + '</option>');
				}
			});

			amiWebApp.unlock();

		}).fail(function(data) {
			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	};

	/*-----------------------------------------------------------------*/

	this.openSchema = function() {
		/*---------------------------------------------------------*/

		var graph = this.graph;

		/*---------------------------------------------------------*/

		var db = $('#ami-catalog-modeler-catalog-list').val();

		if(db)
		{
			/*-------------------------------------------------*/

			amiWebApp.lock();

			/*-------------------------------------------------*/

			amiCommand.execute('SearchQuery -project="self" -processingStep="self" -sql="SELECT router_project.name AS project, router_process.name AS process, \'utf8_general_ci\' AS encoding, router_db.jsonSchema FROM router_db, router_project, router_process WHERE router_db.db = \'' + db + '\' AND router_db.process = router_process.identifier AND router_db.project = router_project.identifier"', {context: this}).done(function(data) {

				var project = amiWebApp.jspath('..field{.@name==="project"}.$', data)[0];
				var process = amiWebApp.jspath('..field{.@name==="process"}.$', data)[0];
				var encoding = amiWebApp.jspath('..field{.@name==="encoding"}.$', data)[0];
				var jsonSchema = amiWebApp.jspath('..field{.@name==="jsonSchema"}.$', data)[0];

				/*-----------------------------------------*/

				this.loadSchema(db, jsonSchema ? jsonSchema.replace(/\~Q\~/g, '"') : '{"cells":[]}');

				/*-----------------------------------------*/

				var tables = {};

				$.each(graph.getElements(), function(index1, item1) {

					var fields = {};
	
					$.each(item1.getFields(), function(index2, item2) {

						fields[item2['name']] = item2;
					});

					tables[item1.getName()] = {
						table: item1,
						fields: fields,
					};

					item1.setFeKeys([]);
					item1.setIndices([]);
				});

				/*-----------------------------------------*/

	 			amiCommand.execute('SearchQuery -project="' + project + '" -processingStep="' + process + '" -sql="SELECT tab, field, type FROM db_field WHERE tab NOT LIKE \'db_%\'"', {context: this}).done(function(data) {

					var cnt = 0;

					var rows = amiWebApp.jspath('..row', data);

					$.each(rows, function(index, row) {
						var table = amiWebApp.jspath('..field{.@name==="tab"}.$', row)[0];
						var field = amiWebApp.jspath('..field{.@name==="field"}.$', row)[0];
						var type = amiWebApp.jspath('..field{.@name==="type"}.$', row)[0];

						if(!(table in tables)) {

							var pos = 20 + 10 * cnt++;
	
							tables[table] = {
								table: graph.newTable({
									position: {
										x: pos,
										y: pos,
									},
									name: table,
									encoding: encoding,
								}),
								fields: [],
							};
						}

						if(!(field in tables[table]['fields'])) {

							tables[table]['table'].appendField({
								name: field,
								type: type,
							});
						}
					});

					/*---------------------------------*/

					amiCommand.execute('SearchQuery -project="' + project + '" -processingStep="' + process + '" -sql="SELECT contain, containkey, container, containerkey FROM db_model WHERE type = 0 AND contain NOT LIKE \'db_%\'"', {context: this}).done(function(data) {

						var rows = amiWebApp.jspath('..row', data);

						$.each(rows, function(index, row) {
							var contain = amiWebApp.jspath('..field{.@name==="contain"}.$', row)[0];
							var containkey = amiWebApp.jspath('..field{.@name==="containkey"}.$', row)[0];
							var container = amiWebApp.jspath('..field{.@name==="container"}.$', row)[0];
							var containerkey = amiWebApp.jspath('..field{.@name==="containerkey"}.$', row)[0];

							tables[contain]['table'].appendFeKey({
								field: containkey,
								table: container,
							});
						});

						this.update({
							menu: false,
							soft: false,
							arrows: true,
						});

						this.fitToContent();

						amiWebApp.unlock();

					}).fail(function(data) {
						amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
					});

					/*---------------------------------*/
				}).fail(function(data) {
					amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
				});

				/*-----------------------------------------*/
			}).fail(function(data) {
				amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
			});

			/*-------------------------------------------------*/
		}
	};

	/*-----------------------------------------------------------------*/

	this.handleDrop = function(e) {
		e.stopPropagation();
		e.preventDefault();

		var files = e.dataTransfer.files;

		for(var i = 0, file = null; file = files[i]; i++) {

			var reader = new FileReader();

			reader.onload = function(e) {
				amiDBModelerApp.loadSchema('?', e.target.result);

				amiDBModelerApp.fitToContent();

				amiDBModelerApp.update({
					menu: false,
					soft: false,
					arrows: true,
				});
			};

			reader.readAsText(file);
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

		var blob = new Blob([json], {type: 'application/json'});

		saveAs(blob, 'schema.json');
	};

	/*-----------------------------------------------------------------*/

	this.printDiagram = function() {

		var width = $('#editor_zone svg').width();
		var height = $('#editor_zone svg').height();

		var w = window.open('', '', 'height=' + height + ', width=' + width + ', toolbar=no');

		w.document.write('<html><head><style>body { margin: 0px; } .link-tools, .marker-vertices, .marker-arrowheads, .connection-wrap { opacity: 0; } .connection { fill: none; }</style></head><body>' + $('#editor_zone').html() + '</body></html>');

		$(w.document).find('svg').css('background-image', 'none');

		w.print();
		w.close();
	};

	/*-----------------------------------------------------------------*/

	this.save = function() {

		var json = JSON.stringify(this.graph.toJSON()).replace(/\"/g, '~Q~');

		amiCommand.execute('UpdateElement -project="self" -processingStep="self" -entity="router_db" -db="' + this.dbName + '" -separator="|" -updateField="jsonSchema" -updateValue="' + json + '"').done(function() {
			amiWebApp.success('Operation done with success :-).');
		}).fail(function(data) {
			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	};

	/*-----------------------------------------------------------------*/

	this.saveAndSynchronize = function() {

		this.save();

		/* TODO */
		/* TODO */
		/* TODO */
	};

	/*-----------------------------------------------------------------*/
	/* DB                                                              */
	/*-----------------------------------------------------------------*/

	this.setDBName = function(value) {

		this.dbName = value;
	};

	/*-----------------------------------------------------------------*/

	this.setDBWidth = function(value) {

		this.dbWidth = Math.ceil(parseInt(value, 10) / 10.0) * 10;

		this.paper.setDimensions(this.dbWidth, this.dbHeight);
	};

	/*-----------------------------------------------------------------*/

	this.setDBHeight = function(value) {

		this.dbHeight = Math.ceil(parseInt(value, 10) / 10.0) * 10;

		this.paper.setDimensions(this.dbWidth, this.dbHeight);
	};

	/*-----------------------------------------------------------------*/

	this.setEngineAlias = function(value) {
		this.engineAlias = value;
	};

	/*-----------------------------------------------------------------*/

	this.setEngineActive = function(value) {
		this.engineActive = value;
	};

	/*-----------------------------------------------------------------*/
	/* PATH                                                            */
	/*-----------------------------------------------------------------*/

	this.addPath = function() {

		amiWebApp.appendHTML('__path_content', this.fragmentPath);
	};

	/*-----------------------------------------------------------------*/
	/* TABLE                                                           */
	/*-----------------------------------------------------------------*/

	this._table_cnt = 0;

	/*-----------------------------------------------------------------*/

	this.addTable = function() {

		this.graph.newTable({
			position: {
				x: 20 + 10 * this._table_cnt,
				y: 20 + 10 * this._table_cnt,
			},
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

			this.table = null;

			this.update({
				menu: true,
				soft: false,
				arrows: true,
			});
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

	this.editTableColor = function() {

		if(this.table) {
			var fill = this.table.getTopColor();
			var stroke = this.table.getStrokeColor();

			amiColorPeaker.execute({context: this, fillColor: fill, strokeColor: stroke}).done(function(fill, stroke) {
				this.table.setTopColor(fill);
				this.table.setStrokeColor(stroke);
			});
		}
	};


	/*-----------------------------------------------------------------*/
	/* FIELD                                                           */
	/*-----------------------------------------------------------------*/

	this.addField = function() {

		if(this.table) {
			this.table.appendField({
				name: '???',
				type: '???',
			});

			this.update({
				menu: true,
				soft: false,
				arrows: false,
			});
		} else {
			amiWebApp.error('Please, select a table.');
		}
	};

	/*-----------------------------------------------------------------*/

	this.removeField = function(index) {

		if(this.table) {
			this.table.removeField(index);

			this.update({
				menu: true,
				soft: false,
				arrows: true,
			});
		}
	};

	/*-----------------------------------------------------------------*/

	this.setFieldName = function(index, value) {

		if(this.table) {
			var item = this.table.getField(index);
			var VALUE = item['name']; item['name'] = value;
			this.table.setField(index, item)

			/*-------------------------------------------------*/

			var feKeys = [];

			$.each(this.table.getFeKeys(), function(index, item) {

				if(item['field'] === VALUE) {
					item['field'] = value;
				}

				feKeys.push(item);
			});

			this.table.setFeKeys(feKeys);

			/*-------------------------------------------------*/

			var indices = [];

			$.each(this.table.getIndices(), function(index, item) {
			
				if(item['field'] === VALUE) {
					item['field'] = value;
				}

				feKeys.push(item);
			});

			this.table.setIndices(indices);

			/*-------------------------------------------------*/

			this.update({
				menu: true,
				soft: true,
				arrows: false,
			});
		}
	};

	/*-----------------------------------------------------------------*/

	this.setFieldType = function(index, value) {

		if(this.table) {
			var item = this.table.getField(index);
			item['type'] = value;
			this.table.setField(index, item)

			this.update({
				menu: true,
				soft: true,
				arrows: false,
			});
		}
	};

	/*-----------------------------------------------------------------*/

	this.editFieldOptions = function(index) {
	
		$('#modal_catalog_modeler_field_options').modal('show');
	};

	/*-----------------------------------------------------------------*/
	/* FEKEY                                                           */
	/*-----------------------------------------------------------------*/

	this.addFeKey = function() {

		if(this.table) {
			this.table.appendFeKey({
				field: '',
				table: '',
			});

			this.update({
				menu: true,
				soft: false,
				arrows: false,
			});
		} else {
			amiWebApp.error('Please, select a table.');
		}
	};

	/*-----------------------------------------------------------------*/

	this.removeFeKey = function(index) {

		if(this.table) {
			this.table.removeFeKey(index);

			this.update({
				menu: true,
				soft: false,
				arrows: true,
			});
		}
	};

	/*-----------------------------------------------------------------*/

	this.setFeKeyField = function(index, value) {

		if(this.table) {
			var item = this.table.getFeKey(index);
			item['field'] = value;
			this.table.setFeKey(index, item)

			this.update({
				menu: false,
				soft: false,
				arrows: true,
			});
		}
	};

	/*-----------------------------------------------------------------*/

	this.setFeKeyTable = function(index, value) {

		if(this.table) {
			var item = this.table.getFeKey(index);
			item['table'] = value;
			this.table.setFeKey(index, item)

			this.update({
				menu: false,
				soft: false,
				arrows: true,
			});
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

			this.update({
				menu: true,
				soft: false,
				arrows: false,
			});
		} else {
			amiWebApp.error('Please, select a table.');
		}
	};

	/*-----------------------------------------------------------------*/

	this.removeIndex = function(index) {

		if(this.table) {
			this.table.removeIndex(index);

			this.update({
				menu: true,
				soft: false,
				arrows: false,
			});
		}
	};

	/*-----------------------------------------------------------------*/

	this.setIndexField = function(index, value) {

		if(this.table) {
			var item = this.table.getIndex(index);
			item['field'] = value;
			this.table.setIndex(index, item);
		}
	};

	/*-----------------------------------------------------------------*/
	/*-----------------------------------------------------------------*/
	/*-----------------------------------------------------------------*/

	this.update = function(settings) {

		var menu = false;
		var soft = false;
		var arrows = false;

		if(settings) {

			if('menu' in settings) {
				menu = settings['menu'];
			}

			if('soft' in settings) {
				soft = settings['soft'];
			}

			if('arrows' in settings) {
				arrows = settings['arrows'];
			}
		}

		var graph = this.graph;
		var table = this.table;

		if(menu && table) {
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

			$.each(graph.getElements(), function(index, item) {

				var name = item.getName();

				if(tableName != name) {
					tables += '<option value="' + name + '">' + name + '</option>';
				}
			});

			/*-------------------------------------------------*/

			$.each(table.getFields(), function(index, item) {

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

			$.each(table.getFeKeys(), function(index, item) {

				var field = item['field'];
				var table = item['table'];

				dict3.push({
					INDEX: index,
					FIELDS: fields.replace('value="' + field + '"', 'value="' + field + '" selected="selected"'),
					TABLES: tables.replace('value="' + table + '"', 'value="' + table + '" selected="selected"'),
				});
			});

			/*-------------------------------------------------*/

			$.each(table.getIndices(), function(index, item) {

				var field = item['field'];

				dict4.push({
					INDEX: index,
					FIELDS: fields.replace('value="' + field + '"', 'value="' + field + '" selected="selected"'),
				});
			});

			/*-------------------------------------------------*/

			$('#__collapse4').addClass('in');
			$('#__collapse5').addClass('in');
			$('#__collapse6').addClass('in');
			$('#__collapse7').addClass('in');

			if(soft == false) {
				$('#__field_content').html(amiWebApp.formatHTML(this.fragmentField, {dict: dict2}));
			}
			if(0x00 == false) {
				$('#__table_content').html(amiWebApp.formatHTML(this.fragmentTable, {dict: dict1}));
				$('#__fekey_content').html(amiWebApp.formatHTML(this.fragmentFeKey, {dict: dict3}));
				$('#__index_content').html(amiWebApp.formatHTML(this.fragmentIndex, {dict: dict4}));
			}

			/*-------------------------------------------------*/
		}

		if(arrows) {
			/*-------------------------------------------------*/

			var dict = {};

			$.each(graph.getElements(), function(index, table) {

				dict[table.getName()] = table.id;
			});

			/*-------------------------------------------------*/

			var arrows1 = [];

			$.each(graph.getElements(), function(index, table) {
				$.each(table.getFeKeys(), function(index, fekey) {

					var sourceName = table.getName();
					var targetName = fekey['table'];

					if(sourceName !== ''
					   &&
					   targetName !== ''
					 ) {
						arrows1.push({
							source: dict[sourceName],
							target: dict[targetName],
							id: null,
						});
					}
				});
			});

			/*-------------------------------------------------*/

			var arrows2 = [];

			$.each(graph.getLinks(), function(index, link) {

				var source = link.prop('source');
				var target = link.prop('target');

				arrows2.push({
					source: source['id'],
					target: target['id'],
					link: link.id,
				});
			});

			/*-------------------------------------------------*/

			 $.each(arrows1, function(index1, item1) {

				var isOk = true;

				$.each(arrows2, function(index2, item2) {

					if(item1['source'] === item2['source']
					   &&
					   item1['target'] === item2['target']
					 ) {
					 	isOk = false;

					 	return;
					}
				});

				if(isOk) {
					graph.addCell(new joint.dia.Link({
						source: {id: item1['source']},
						target: {id: item1['target']},
						attrs: {
							'.connection': {'stroke': '#707070', 'stroke-width': 3},
							'.marker-source': {'stroke': '#707070', 'fill': '#707070', 'd': 'm 14.456044,15.990164 1.23e-4,7.500564 0,-7.179668 -9.0002053,5.179668 0,-11.000206 9.0000823,5.178745 1.23e-4,-7.178745 z'}
						}
					}));
				}
			});

			/*-------------------------------------------------*/

			 $.each(arrows2, function(index1, item1) {

				var isOk = true;

				$.each(arrows1, function(index2, item2) {

					if(item1['source'] === item2['source']
					   &&
					   item1['target'] === item2['target']
					 ) {
					 	isOk = false;

					 	return;
					}
				});

				if(isOk) {
					graph.getCell(item1['link']).remove();
				}
			});

			/*-------------------------------------------------*/
		}
	};

	/*-----------------------------------------------------------------*/
	/*-----------------------------------------------------------------*/
	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiDBModelerApp = new AMIDBModelerApp();

/*-------------------------------------------------------------------------*/
