/*!
 * AMICatalogModelerApp class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/

var LZString={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",_f:String.fromCharCode,compressToBase64:function(e){if(e==null)return"";var t="";var n,r,i,s,o,u,a;var f=0;e=LZString.compress(e);while(f<e.length*2){if(f%2==0){n=e.charCodeAt(f/2)>>8;r=e.charCodeAt(f/2)&255;if(f/2+1<e.length)i=e.charCodeAt(f/2+1)>>8;else i=NaN}else{n=e.charCodeAt((f-1)/2)&255;if((f+1)/2<e.length){r=e.charCodeAt((f+1)/2)>>8;i=e.charCodeAt((f+1)/2)&255}else r=i=NaN}f+=3;s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+LZString._keyStr.charAt(s)+LZString._keyStr.charAt(o)+LZString._keyStr.charAt(u)+LZString._keyStr.charAt(a)}return t},decompressFromBase64:function(e){if(e==null)return"";var t="",n=0,r,i,s,o,u,a,f,l,c=0,h=LZString._f;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(c<e.length){u=LZString._keyStr.indexOf(e.charAt(c++));a=LZString._keyStr.indexOf(e.charAt(c++));f=LZString._keyStr.indexOf(e.charAt(c++));l=LZString._keyStr.indexOf(e.charAt(c++));i=u<<2|a>>4;s=(a&15)<<4|f>>2;o=(f&3)<<6|l;if(n%2==0){r=i<<8;if(f!=64){t+=h(r|s)}if(l!=64){r=o<<8}}else{t=t+h(r|i);if(f!=64){r=s<<8}if(l!=64){t+=h(r|o)}}n+=3}return LZString.decompress(t)},compressToUTF16:function(e){if(e==null)return"";var t="",n,r,i,s=0,o=LZString._f;e=LZString.compress(e);for(n=0;n<e.length;n++){r=e.charCodeAt(n);switch(s++){case 0:t+=o((r>>1)+32);i=(r&1)<<14;break;case 1:t+=o(i+(r>>2)+32);i=(r&3)<<13;break;case 2:t+=o(i+(r>>3)+32);i=(r&7)<<12;break;case 3:t+=o(i+(r>>4)+32);i=(r&15)<<11;break;case 4:t+=o(i+(r>>5)+32);i=(r&31)<<10;break;case 5:t+=o(i+(r>>6)+32);i=(r&63)<<9;break;case 6:t+=o(i+(r>>7)+32);i=(r&127)<<8;break;case 7:t+=o(i+(r>>8)+32);i=(r&255)<<7;break;case 8:t+=o(i+(r>>9)+32);i=(r&511)<<6;break;case 9:t+=o(i+(r>>10)+32);i=(r&1023)<<5;break;case 10:t+=o(i+(r>>11)+32);i=(r&2047)<<4;break;case 11:t+=o(i+(r>>12)+32);i=(r&4095)<<3;break;case 12:t+=o(i+(r>>13)+32);i=(r&8191)<<2;break;case 13:t+=o(i+(r>>14)+32);i=(r&16383)<<1;break;case 14:t+=o(i+(r>>15)+32,(r&32767)+32);s=0;break}}return t+o(i+32)},decompressFromUTF16:function(e){if(e==null)return"";var t="",n,r,i=0,s=0,o=LZString._f;while(s<e.length){r=e.charCodeAt(s)-32;switch(i++){case 0:n=r<<1;break;case 1:t+=o(n|r>>14);n=(r&16383)<<2;break;case 2:t+=o(n|r>>13);n=(r&8191)<<3;break;case 3:t+=o(n|r>>12);n=(r&4095)<<4;break;case 4:t+=o(n|r>>11);n=(r&2047)<<5;break;case 5:t+=o(n|r>>10);n=(r&1023)<<6;break;case 6:t+=o(n|r>>9);n=(r&511)<<7;break;case 7:t+=o(n|r>>8);n=(r&255)<<8;break;case 8:t+=o(n|r>>7);n=(r&127)<<9;break;case 9:t+=o(n|r>>6);n=(r&63)<<10;break;case 10:t+=o(n|r>>5);n=(r&31)<<11;break;case 11:t+=o(n|r>>4);n=(r&15)<<12;break;case 12:t+=o(n|r>>3);n=(r&7)<<13;break;case 13:t+=o(n|r>>2);n=(r&3)<<14;break;case 14:t+=o(n|r>>1);n=(r&1)<<15;break;case 15:t+=o(n|r);i=0;break}s++}return LZString.decompress(t)},compress:function(e){if(e==null)return"";var t,n,r={},i={},s="",o="",u="",a=2,f=3,l=2,c="",h=0,p=0,d,v=LZString._f;for(d=0;d<e.length;d+=1){s=e.charAt(d);if(!Object.prototype.hasOwnProperty.call(r,s)){r[s]=f++;i[s]=true}o=u+s;if(Object.prototype.hasOwnProperty.call(r,o)){u=o}else{if(Object.prototype.hasOwnProperty.call(i,u)){if(u.charCodeAt(0)<256){for(t=0;t<l;t++){h=h<<1;if(p==15){p=0;c+=v(h);h=0}else{p++}}n=u.charCodeAt(0);for(t=0;t<8;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}else{n=1;for(t=0;t<l;t++){h=h<<1|n;if(p==15){p=0;c+=v(h);h=0}else{p++}n=0}n=u.charCodeAt(0);for(t=0;t<16;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}delete i[u]}else{n=r[u];for(t=0;t<l;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}r[o]=f++;u=String(s)}}if(u!==""){if(Object.prototype.hasOwnProperty.call(i,u)){if(u.charCodeAt(0)<256){for(t=0;t<l;t++){h=h<<1;if(p==15){p=0;c+=v(h);h=0}else{p++}}n=u.charCodeAt(0);for(t=0;t<8;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}else{n=1;for(t=0;t<l;t++){h=h<<1|n;if(p==15){p=0;c+=v(h);h=0}else{p++}n=0}n=u.charCodeAt(0);for(t=0;t<16;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}delete i[u]}else{n=r[u];for(t=0;t<l;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}}n=2;for(t=0;t<l;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}while(true){h=h<<1;if(p==15){c+=v(h);break}else p++}return c},decompress:function(e){if(e==null)return"";if(e=="")return null;var t=[],n,r=4,i=4,s=3,o="",u="",a,f,l,c,h,p,d,v=LZString._f,m={string:e,val:e.charCodeAt(0),position:32768,index:1};for(a=0;a<3;a+=1){t[a]=a}l=0;h=Math.pow(2,2);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}switch(n=l){case 0:l=0;h=Math.pow(2,8);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}d=v(l);break;case 1:l=0;h=Math.pow(2,16);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}d=v(l);break;case 2:return""}t[3]=d;f=u=d;while(true){if(m.index>m.string.length){return""}l=0;h=Math.pow(2,s);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}switch(d=l){case 0:l=0;h=Math.pow(2,8);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}t[i++]=v(l);d=i-1;r--;break;case 1:l=0;h=Math.pow(2,16);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}t[i++]=v(l);d=i-1;r--;break;case 2:return u}if(r==0){r=Math.pow(2,s);s++}if(t[d]){o=t[d]}else{if(d===i){o=f+f.charAt(0)}else{return null}}u+=o;t[i++]=f+o.charAt(0);r--;f=o;if(r==0){r=Math.pow(2,s);s++}}}};if(typeof module!=="undefined"&&module!=null){module.exports=LZString}

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

		amiWebApp.loadHTML('subapps/catalogmodeler/html/AMICatalogModelerApp.html', {context: this}).done(function(data) {

			amiWebApp.replaceHTML('ami_main_content', data, {context: this}).done(function() {

				amiWebApp.loadHTML('subapps/catalogmodeler/html/Fragment/table.html', {context: this}).done(function(data) {
					this.fragmentTable = data;
				});
				amiWebApp.loadHTML('subapps/catalogmodeler/html/Fragment/field.html', {context: this}).done(function(data) {
					this.fragmentField = data;
				});
				amiWebApp.loadHTML('subapps/catalogmodeler/html/Fragment/fekey.html', {context: this}).done(function(data) {
					this.fragmentFeKey = data;
				});
				amiWebApp.loadHTML('subapps/catalogmodeler/html/Fragment/index.html', {context: this}).done(function(data) {
					this.fragmentIndex = data;
				});

				/*-----------------------------------------*/

				var dropZone = document.getElementById('drop_zone');

				dropZone.addEventListener('dragover', this.handleDragOver, false);
				dropZone.addEventListener('drop', this.handleDrop, false);
  
  				/*-----------------------------------------*/

				this.dbName = '?';
				this.dbWidth = 900;
				this.dbHeight = 340;

				$('#dbName').val(this.dbName);
				$('#dbWidth').val(this.dbWidth);
				$('#dbHeight').val(this.dbHeight);

				/*-----------------------------------------*/

				this.table = undefined;

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

				this.svgVertical = V('path').attr('d', 'M -10000 -1 L 10000 -1');
				this.svgHorizontal = V('path').attr('d', 'M -1 -10000 L -1 10000');

				this.drawGrid(10, 10);

				/*-----------------------------------------*/

				this.paper.on('cell:pointerclick', function(cellView) {

					if(cellView.model.get('type') === 'sql.Table') {
						amiCatalogModelerApp.table = cellView.model;
						amiCatalogModelerApp.updateMenu();
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

	this.drawGrid = function(gridW, gridH) {
		/*---------------------------------------------------------*/

		var svg = V(this.paper.svg);

		/*---------------------------------------------------------*/

		if(gridW > 2) {
			var x = 0.1;

			do {
				x += gridW;

				var svgGridX = this.svgHorizontal.clone().translate(x, 0, {absolute: true}).addClass('sql_editor_grid');
				svg.prepend(svgGridX);

			} while(x < 10000);
		}

		/*---------------------------------------------------------*/

		if(gridH > 2) {
			var y = 0.1;

			do {
				y += gridH;

				var svgGridY = this.svgVertical.clone().translate(0, y, {absolute: true}).addClass('sql_editor_grid');
				svg.prepend(svgGridY);
			
			} while(y < 10000);
		}

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.loadSchema = function(db, json) {

		try {
			this.graph.fromJSON(JSON.parse(json));

			this.dbName = db;

		} catch(e) {
			alert(e);
		}
	};

	/*-----------------------------------------------------------------*/

	this.autoResize = function() {

		this.paper.fitToContent({
			padding: 20,
			gridWidth: 10,
			gridHeight: 10,
		});

		this.dbWidth = $('#editor_zone svg').width() + 2;
		this.dbHeight = $('#editor_zone svg').height() + 2;

		$('#dbName').val(this.dbName);
		$('#dbWidth').val(this.dbWidth);
		$('#dbHeight').val(this.dbHeight);
	};

	/*-----------------------------------------------------------------*/

	this.listSchemes = function() {

		this.routerDBs = [
		];

		this.clearSchemes();

		amiCommand.execute('SearchQuery -project="self" -processingStep="self" -sql="SELECT router_db.db, router_project.name AS project, router_process.name AS process, router_db.jsonSchema FROM router_db, router_project, router_process WHERE router_db.process = router_process.identifier AND router_db.project = router_project.identifier"').done(function(data) {

			var rows = amiWebApp.jspath('..row', data);

			$.each(rows, function(index, row) {
				var db = amiWebApp.jspath('..field{.@name==="db"}.$', row)[0];
				var project = amiWebApp.jspath('..field{.@name==="project"}.$', row)[0];
				var process = amiWebApp.jspath('..field{.@name==="process"}.$', row)[0];
				var jsonSchema = amiWebApp.jspath('..field{.@name==="jsonSchema"}.$', row)[0];

				$('#ami-catalog-modeler-catalog-list').append('<option value="' + index + '">' + db + '</option>');

				amiCatalogModelerApp.routerDBs.push({
					db: db,
					project: project,
					process: process,
					encoding: 'utf8_general_ci',
					jsonSchema: jsonSchema ? LZString.decompressFromBase64(jsonSchema) : '{"cells":[]}',
				});
			});

		}).fail(function(data) {
			alert(JSPath.apply('..error.$', data)[0]);
		});
	};

	/*-----------------------------------------------------------------*/

	this.clearSchemes = function() {
		$('#ami-catalog-modeler-catalog-list').empty();
	};

	/*-----------------------------------------------------------------*/

	this.openSchema = function() {
		/*---------------------------------------------------------*/

		var graph = this.graph;

		/*---------------------------------------------------------*/

		var item = this.routerDBs[$('#ami-catalog-modeler-catalog-list').val()];

		var db = item['db'];
		var project = item['project'];
		var process = item['process'];
		var encoding = item['encoding'];
		var jsonSchema = item['jsonSchema'];

		/*---------------------------------------------------------*/

		this.loadSchema(db, jsonSchema);

		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/

 		amiCommand.execute('SearchQuery -project="' + project + '" -processingStep="' + process + '" -sql="SELECT tab, field, type FROM db_field WHERE tab NOT LIKE \'db_%\'"', {context: this}).done(function(data) {

			var cnt = 0;

			var rows = amiWebApp.jspath('..row', data);

			$.each(rows, function(index, row) {
				var table = amiWebApp.jspath('..field{.@name==="tab"}.$', row)[0];
				var field = amiWebApp.jspath('..field{.@name==="field"}.$', row)[0];
				var type = amiWebApp.jspath('..field{.@name==="type"}.$', row)[0];

				if(!(table in tables)) {
	
					tables[table] = {
						table: graph.newTable({
							position: {
								x: 20 + 10 * cnt,
								y: 20 + 10 * cnt,
							},
							name: table,
							encoding: encoding,
						}),
						fields: {},
					};

					cnt++;
				}

				if(!(field in tables[table]['fields'])) {

					tables[table]['table'].appendField({
						name: field,
						type: type,
					});
				}
			});

			/*-------------------------------------------------*/

			amiCommand.execute('SearchQuery -project="' + project + '" -processingStep="' + process + '" -sql="SELECT contain, containkey, container, containerkey FROM db_model WHERE type = 0"', {context: this}).done(function(data) {

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

				this.autoResize();

				this.updateArrows();
			});

			/*-------------------------------------------------*/
		});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.handleDrop = function(e) {
		e.stopPropagation();
		e.preventDefault();

		var files = e.dataTransfer.files;

		for(var i = 0, f = null; f = files[i]; i++) {

			var reader = new FileReader();

			reader.onload = function(e) {
				amiCatalogModelerApp.loadSchema('?', e.target.result);
				amiCatalogModelerApp.autoResize();
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

	this.save = function() {

		var json = LZString.compressToBase64(JSON.stringify(this.graph.toJSON()));

		amiCommand.execute('UpdateElement -project="self" -processingStep="self" -entity="router_db" -db="' + this.dbName + '" -separator="|" -updateField="jsonSchema" -updateValue="' + json + '"', {context: this}).done(function() {
			this.listSchemes();
			alert('Done with success :-)');
		}).fail(function() {
			this.listSchemes();
			alert('Done with error :-(');
		});
	};

	/*-----------------------------------------------------------------*/

	this.saveAndSynchronize = function() {

		this.save();
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
		return;
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
			this.table.appendField({
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

	this.setFieldName = function(index, value) {

		if(this.table) {
			var item = this.table.getField(index);
			item['name'] = value;
			this.table.setField(index, item)

			this.updateMenu({soft: true});
		}
	};

	/*-----------------------------------------------------------------*/

	this.setFieldType = function(index, value) {

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
			this.table.appendFeKey({
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

	this.setFeKeyField = function(index, value) {

		if(this.table) {
			var item = this.table.getFeKey(index);
			item['field'] = value;
			this.table.setFeKey(index, item)

			this.updateArrows();
		}
	};

	/*-----------------------------------------------------------------*/

	this.setFeKeyTable = function(index, value) {

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

	this.setIndexField = function(index, value) {

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
