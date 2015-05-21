/*!
 * AMISimpleSearchEngineApp class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* CLASS AMISimpleSearchEngineApp                                          */
/*-------------------------------------------------------------------------*/

function AMISimpleSearchEngineApp() {
	/*-----------------------------------------------------------------*/

	this.onReady = function(userdata) {

		var result = $.Deferred();

		amiWebApp.loadSheets([
			'subapps/SimpleSearchEngine/css/AMISimpleSearchEngineApp.css',
		]);

		$('#ami_jumbotron_title').html('SimpleSearchEngine');
		$('#ami_jumbotron_content').html('Simple Search Engine');
		$('#ami_breadcrumb_content').html('<li><a href="">Search</a></li><li><a href="">Simple Search Engine</a></li>');

		amiWebApp.loadHTML('subapps/SimpleSearchEngine/html/AMISimpleSearchEngineApp.html', {context: this}).done(function(data) {

			amiWebApp.replaceHTML('ami_main_content', data, {context: this}).done(function() {
				/*-----------------------------------------*/
				/* FILTER                                  */
				/*-----------------------------------------*/

				if(userdata) {
					this.interfaceFilter = '';

					/**/

					var interfaces = userdata.split(',');

					for(var i = 0; i < interfaces.length; i++) {

						var interface = interfaces[i].trim();

						if(interface !== '') {

							if(interface.indexOf('%') < 0) {
								this.interfaceFilter += ' OR `interface`=\'' + interface +  '\'';
							} else {
								this.interfaceFilter += ' OR `interface` LIKE \'' + interface +  '\'';
							}
						}
					}

					/**/

					this.interfaceFilter = (this.interfaceFilter !== '') ? this.interfaceFilter.substring(4)
					                                                     : '1=1'
					;
				} else {
					this.interfaceFilter = '1=1';
				}

				/*-----------------------------------------*/

				result.resolve();
			});
		}).fail(function() {
			result.reject();
		});

		return result;
	};

	/*-----------------------------------------------------------------*/

	this.onExit = function() {
	};

	/*-----------------------------------------------------------------*/

	this.onLogin = function() {
		/*---------------------------------------------------------*/
		/* GET INTERFACES                                          */
		/*---------------------------------------------------------*/

		if($('#ami_simple_search_engine_interface_list').html().trim() === '') {

			amiCommand.execute('SearchQuery -catalog="self" -sql="SELECT `interface` FROM `router_search_interface` WHERE ' + this.interfaceFilter + '"', {context: this}).done(function(data) {

				var rows = amiWebApp.jspath('..row', data);

				var s = (this.interfaceFilter === '1=1') ? '<option value="">--select--</option>' : '';

				$.foreach(rows, function(index, row) {

					var interface = amiWebApp.jspath('..field{.@name==="interface"}.$', row)[0] || '';

					s += '<option value="' + interface + '">' + interface + '</option>'
				});

				$('#ami_simple_search_engine_interface_list').html(s).promise().done(function() {

					$('#ami_simple_search_engine_interface_list').change();
				});
			});
		}

		/*---------------------------------------------------------*/
		/* SHOW SERCH INTERFACE                                    */
		/*---------------------------------------------------------*/

		$('#ami_simple_search_engine_tab_search').show();

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.onLogout = function() {
		/*---------------------------------------------------------*/
		/* HIDE SERCH INTERFACE                                    */
		/*---------------------------------------------------------*/

		$('#ami_simple_search_engine_tab_search').hide();

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.onSessionExpired = function() {
	};

	/*-----------------------------------------------------------------*/

	this.setInterface = function(interface) {

		if(!interface) {
			return;
		}

		amiWebApp.lock();

		$('#ami_simple_search_engine_center').show();

		amiCommand.execute('SearchQuery -catalog="self" -sql="SELECT `catalog`, `entity` FROM `router_search_interface` WHERE `interface`=\'' + interface + '\'"', {context: this}).done(function(data) {

			this.catalog = amiWebApp.jspath('..field{.@name==="catalog"}.$', data)[0] || '';
			this.entity = amiWebApp.jspath('..field{.@name==="entity"}.$', data)[0] || '';

			$('#ami_simple_search_engine_glass').removeClass('ami-simple-search-engine-glass');

			amiWebApp.unlock();

		}).fail(function(data) {
			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	};

	/*-----------------------------------------------------------------*/

	this.search = function(s) {

		var command;

		if(s.indexOf('%') < 0) {
			command = 'BrowseQuery -catalog="' + this.catalog + '" -sql="SELECT `' + this.entity + '`.* FROM `' + this.entity + '` WHERE `' + this.field + '`=\'' + s.replace(/\'/g, '\'\'') + '\'"';
		} else {
			command = 'BrowseQuery -catalog="' + this.catalog + '" -sql="SELECT `' + this.entity + '`.* FROM `' + this.entity + '` WHERE `' + this.field + '` LIKE \'' + s.replace(/\'/g, '\'\'') + '\'"';
		}

		alert(command);
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiSimpleSearchEngineApp = new AMISimpleSearchEngineApp();

/*-------------------------------------------------------------------------*/
