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

	this.onReady = function() {

		amiWebApp.loadSheets([
			'subapps/CatalogModeler/css/AMICatalogModelerApp.css',
		]);

		amiWebApp.loadScripts([
			'js/3rd-party/filesaver.min.js',
			'js/3rd-party/jointjs/lodash.min.js',
			'js/3rd-party/jointjs/backbone-min.js',
			'js/3rd-party/jointjs/joint.min.js',
			'js/3rd-party/jointjs/vectorizer.min.js',
			'js/3rd-party/jointjs/geometry.min.js',
			'subapps/CatalogModeler/js/joint.shapes.sql.min.js',
		]);

		$('#ami_jumbotron_title').html('DB Modeler');
		$('#ami_jumbotron_content').html('DB Modeler');
		$('#ami_breadcrumb_content').html('<li><a>Tools</a></li><li><a href="' + amiWebApp.webAppURL + '?subapp=catalogmodeler">Catalog Modeler</a></li>');

		amiWebApp.loadHTMLs([
			'subapps/CatalogModeler/html/AMICatalogModelerApp.html',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this}).done(function() {
				/*-----------------------------------------*/

				/* TODO */

				/*-----------------------------------------*/

				this.dbName = '?';
				this.dbWidth = 842;
				this.dbHeight = 340;

				$('#dbName').val(this.dbName);
				$('#dbWidth').val(this.dbWidth);
				$('#dbHeight').val(this.dbHeight);

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

				/* TODO */

				/*-----------------------------------------*/
      			});
		});
	};

	/*-----------------------------------------------------------------*/

	this.onExit = function() {
	};

	/*-----------------------------------------------------------------*/

	this.onLogin = function() {
	};

	/*-----------------------------------------------------------------*/

	this.onLogout = function() {
	};

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
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCatalogModelerApp = new AMICatalogModelerApp();

amiRegisterSubApp('amiCatalogModeler', amiCatalogModelerApp, {});

/*-------------------------------------------------------------------------*/
