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
		]);

		$('#ami_jumbotron_title').html('Catalog Modeler');
		$('#ami_jumbotron_content').html('');
		$('#ami_breadcrumb_content').html('<li><a href="">Admin</a></li><li><a href="">Catalog Modeler</a></li>');

		amiWebApp.loadHTML('subapps/catalogmodeler/html/AMICatalogModelerApp.html', {context: this}).done(function(data) {

			amiWebApp.replaceHTML('ami_main_content', data, {context: this}).done(function() {

				this.graph = new joint.dia.Graph;

				this.paper = new joint.dia.Paper({
					el: $('#sqldiagram'),
					width: '100%',
					height: '450',
					model: this.graph,
					gridSize: 10
				});

				this.svg = V(this.paper.svg);

				var rect1 = new joint.shapes.basic.Rect({
					position: { x: 100, y: 20 },
					size: { width: 100, height: 40 },
					attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
				});

				var rect2 = rect1.clone();
				rect2.translate(300);

				var link = new joint.dia.Link({
					source: { id: rect1.id },
					target: { id: rect2.id },
				});

				this.svgVertical = V('path').attr('d', 'M -10000 -1 L 10000 -1');
				this.svgHorizontal = V('path').attr('d', 'M -1 -10000 L -1 10000');

				this.drawGrid(10, 10);

				this.graph.addCells([rect1, rect2, link]);
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

				var svgGridX = this.svgHorizontal.clone().translate(x, 0, {absolute: true}).addClass('my_grid');
				this.svg.append(svgGridX);
			
				x += gridW;
			
			} while(x < width);
		}

		/*---------------------------------------------------------*/

		if(gridH > 2) {

			var y = gridH;

			do {

				var svgGridY = this.svgVertical.clone().translate(0, y, {absolute: true}).addClass('my_grid');
				this.svg.append(svgGridY);

				y += gridH;
			
			} while(y < height);
		}

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCatalogModelerApp = new AMICatalogModelerApp();

/*-------------------------------------------------------------------------*/
