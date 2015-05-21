/*!
 * AMISearchModelerApp class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* CLASS AMISearchModelerApp                                               */
/*-------------------------------------------------------------------------*/

function AMISearchModelerApp() {
	/*-----------------------------------------------------------------*/

	this.onReady = function(userdata) {

		var result = $.Deferred();

		amiWebApp.loadSheets([
			'subapps/SearchModeler/css/AMISearchModelerApp.css',
		]);

		$('#ami_jumbotron_title').html('SearchModeler');
		$('#ami_jumbotron_content').html('Search Modeler');
		$('#ami_breadcrumb_content').html('<li><a href="">Tools</a></li><li><a href="">Search Modeler</a></li>');

		amiWebApp.loadHTML('subapps/SearchModeler/html/AMISearchModelerApp.html', {context: this}).done(function(data1) {
			amiWebApp.loadHTML('subapps/SearchModeler/html/Fragment/interface.html', {context: this}).done(function(data2) {
				amiWebApp.loadHTML('subapps/SearchModeler/html/Fragment/input.html', {context: this}).done(function(data3) {

					amiWebApp.replaceHTML('ami_main_content', data1, {context: this}).done(function() {

						this.fragmentInterface = data2;
						this.fragmentInput = data3;

						result.resolve();
					});

				}).fail(function() {
					result.reject();
				});
			}).fail(function() {
				result.reject();
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

		if($('#ami_search_modeler_interface_list').html().trim() === '') {

			this.getInterfaceList();

			this.getCatalogs();
		}
	};

	/*-----------------------------------------------------------------*/

	this.onLogout = function() {
	};

	/*-----------------------------------------------------------------*/

	this.onSessionExpired = function() {
	};

	/*-----------------------------------------------------------------*/

	this.getInterfaceList = function() {

		amiCommand.execute('SearchQuery -catalog="self" -sql="SELECT `id`, `interface`, `catalog`, `entity` FROM `router_search_interface`"', {context: this}).done(function(data) {

			var rows = amiWebApp.jspath('..row', data);

			var dict = [];

			$.foreach(rows, function(index, row) {

				var id = amiWebApp.jspath('..field{.@name==="id"}.$', row)[0] || '';
				var interface = amiWebApp.jspath('..field{.@name==="interface"}.$', row)[0] || '';
				var catalog = amiWebApp.jspath('..field{.@name==="catalog"}.$', row)[0] || '';
				var entity = amiWebApp.jspath('..field{.@name==="entity"}.$', row)[0] || '';

				dict.push({
					ID: id,
					INTERFACE: interface,
					CATALOG: catalog,
					ENTITY: entity,
				});
			});

			amiWebApp.replaceHTML('ami_search_modeler_interface_list', this.fragmentInterface, {dict: dict});
		});
	};

	/*-----------------------------------------------------------------*/

	this.getCatalogs = function(defaultCatalog, dst) {

		amiWebApp.lock();

		$(dst || '#ami_search_modeler_interface_catalog').empty();

		amiCommand.execute('ListCatalogs').done(function(data) {

			var rows = amiWebApp.jspath('..row', data);

			var s = '<option value="">--select--</option>';

			$.foreach(rows, function(index, row) {

				var catalog = amiWebApp.jspath('..field{.@name==="catalog"}.$', row)[0] || '';

				if(catalog !== defaultCatalog) {
					s += '<option value="' + catalog + '">' + catalog + '</option>';
				} else {
					s += '<option value="' + catalog + '" selected="selected">' + catalog + '</option>';
				}
			});

			$(dst || '#ami_search_modeler_interface_catalog').html(s).promise().done(function() {
				amiWebApp.unlock();
			});

		}).fail(function(data) {
			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	};

	/*-----------------------------------------------------------------*/

	this.getEntities = function(catalog, defaultEntity, dst) {

		if(!catalog) {
			return;
		}

		amiWebApp.lock();

		$(dst || '#ami_search_modeler_interface_entities').empty();

		amiCommand.execute('ListEntities -catalog="' + catalog + '"').done(function(data) {

			var rows = amiWebApp.jspath('..row', data);

			var s = '<option value="">--select--</option>';

			$.foreach(rows, function(index, row) {

				var entity = amiWebApp.jspath('..field{.@name==="entity"}.$', row)[0] || '';

				if(entity !== defaultEntity) {
					s += '<option value="' + entity + '">' + entity + '</option>';
				} else {
					s += '<option value="' + entity + '" selected="selected">' + entity + '</option>';
				}
			});

			$(dst || '#ami_search_modeler_interface_entities').html(s).promise().done(function() {
				amiWebApp.unlock();
			});

		}).fail(function(data) {
			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	};

	/*-----------------------------------------------------------------*/

	this.getFields = function(catalog, entity, defaultField, dst) {

		if(!catalog
		   ||
		   !entity
		 ) {
			return;
		}

		amiWebApp.lock();

		$(dst || '#ami_search_modeler_interface_fields').empty();

		amiCommand.execute('ListFields -catalog="' + catalog + '" -entity="' + entity + '"').done(function(data) {

			var rows = amiWebApp.jspath('..row', data);

			var s = '<option value="">--select--</option>';

			$.foreach(rows, function(index, row) {

				var field = amiWebApp.jspath('..field{.@name==="field"}.$', row)[0] || '';

				if(field !== defaultField) {
					s += '<option value="' + field + '">' + field + '</option>';
				} else {
					s += '<option value="' + field + '" selected="selected">' + field + '</option>';
				}
			});

			$(dst || '#ami_search_modeler_interface_fields').html(s).promise().done(function() {
				amiWebApp.unlock();
			});

		}).fail(function(data) {
			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	};

	/*-----------------------------------------------------------------*/

	this._id = 0;

	/*-----------------------------------------------------------------*/

	this.select = function(id, interface, catalog, entity) {

		amiWebApp.lock();

		$('#ami_search_modeler_interface_name').val(interface);

		$('#ami_search_modeler_paths .input-group').empty();

		this.getCatalogs(catalog);

		this.getEntities(catalog, entity);

		amiCommand.execute('SearchQuery -catalog="self" -sql="SELECT `entity`, `field`, `alias`, `type`, `rank` FROM `router_search_criteria` WHERE `interfaceFK`=' + id + ' ORDER BY `rank`"', {context: this}).done(function(data) {

			var rows = amiWebApp.jspath('..row', data);

			$.foreach(rows, function(index, row) {

				var entity = amiWebApp.jspath('..field{.@name==="entity"}.$', row)[0] || '';
				var field = amiWebApp.jspath('..field{.@name==="field"}.$', row)[0] || '';
				var alias = amiWebApp.jspath('..field{.@name==="alias"}.$', row)[0] || '';
				var type = amiWebApp.jspath('..field{.@name==="type"}.$', row)[0] || '';
				var rank = amiWebApp.jspath('..field{.@name==="rank"}.$', row)[0] || '';

				INPUT_CNT = this._id++;

				var dict = {
					INPUT_CNT: INPUT_CNT
				};

				amiWebApp.appendHTML('ami_search_modeler_paths', this.fragmentInput, {context: this, dict: dict}).done(function() {

					this.getEntities(catalog, entity, '#ami_search_modeler_entity_' + INPUT_CNT);
					this.getFields(catalog, entity, field, '#ami_search_modeler_field_' + INPUT_CNT);

					if(!alias) {
						alias = field;
					}

					$('#ami_search_modeler_alias_' + INPUT_CNT).val(alias);
					$('#ami_search_modeler_type_' + INPUT_CNT).val(type);
					$('#ami_search_modeler_rank_' + INPUT_CNT).val(rank);
				});

			}, this);

			amiWebApp.unlock();

		}).fail(function(data) {
			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	};

	/*-----------------------------------------------------------------*/

	this.addInput = function() {

		var catalog = $('#ami_search_modeler_interface_catalog').val();

		if(catalog) {

			INPUT_CNT = this._id++;

			var dict = {
				INPUT_CNT: INPUT_CNT
			};

			amiWebApp.appendHTML('ami_search_modeler_paths', this.fragmentInput, {context: this, dict: dict}).done(function() {

				this.getEntities(catalog, null, '#ami_search_modeler_entity_' + INPUT_CNT);
			});
		}
	};

	/*-----------------------------------------------------------------*/

	this.reset = function() {
		/*---------------------------------------------------------*/

		if(confirm('Please confirm...') == false) {
			return;
		}

		/*---------------------------------------------------------*/

		$('#ami_search_modeler_interface_name').val('');
		$('#ami_search_modeler_interface_catalog').val('');
		$('#ami_search_modeler_interface_entities').val('');

		$('#ami_search_modeler_paths .input-group').empty();

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.remove = function() {
		/*---------------------------------------------------------*/

		var interfaceName = $('#ami_search_modeler_interface_name').val();

		/*---------------------------------------------------------*/

		if(!interfaceName) {
			return;
		}

		/*---------------------------------------------------------*/

		if(confirm('Please confirm...') == false) {
			return;
		}

		/*---------------------------------------------------------*/

		amiCommand.execute('RemoveElements -catalog="self" -entity="router_search_interface" -separator="," -keyFields="interface" -keyValues="' + interfaceName + '"', {context: this}).always(function() {

			amiWebApp.success('done with success');

			this.getInterfaceList();
		});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.apply = function() {
		/*---------------------------------------------------------*/

		var interfaceName = $('#ami_search_modeler_interface_name').val();
		var interfaceCatalog = $('#ami_search_modeler_interface_catalog').val();
		var interfaceEntities = $('#ami_search_modeler_interface_entities').val();

		/*---------------------------------------------------------*/

		if(!interfaceName
		   ||
		   !interfaceCatalog
		   ||
		   !interfaceEntities
		 ) {
			return;
		}

		/*---------------------------------------------------------*/

		if(confirm('Please confirm...') == false) {
			return;
		}

		/*---------------------------------------------------------*/

		amiCommand.execute('RemoveElements -catalog="self" -entity="router_search_interface" -separator="," -keyFields="interface" -keyValues="' + interfaceName + '"', {context: this}).always(function() {

			amiCommand.execute('AddElement -catalog="self" -entity="router_search_interface" -separator="," -fields="interface,catalog,entity" -values="' + interfaceName + ',' + interfaceCatalog + ',' + interfaceEntities + '"', {context: this}).done(function() {
				/*-----------------------------------------*/

				var paths = {};

				var params = $('#ami_search_modeler_paths').serializeArray();

				$.each(params, function(index, value) {

					var _path = null;
					var _name = value['name'].trim();
					var _value = value['value'].trim();

					var idx = _name.indexOf('_');

					if(idx > 0) {
						_path = _name.substring(idx + 1);
						_name = _name.substring(0, idx);

						if(!(_path in paths)) {
							paths[_path] = {};
						}

						paths[_path][_name] = _value;
					}
				});

				/*-----------------------------------------*/

				for(var path in paths) {

					var fields = '';
					var values = '';

					$.each(paths[path], function(field, value) {

						fields += ',' + field;
						values += ',' + value;
					});

					fields = ('interface') + fields;
					values = interfaceName + values;

					amiCommand.execute('AddElement -catalog="self" -entity="router_search_criteria" -separator="," -fields="' + fields + '" -values="' + values + '"').fail(function(data) {
						amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
					});
				}

				/*-----------------------------------------*/

				amiWebApp.success('Done with success.');

				this.getInterfaceList();

				/*-----------------------------------------*/

			}).fail(function(data) {
				amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
			});
		});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiSearchModelerApp = new AMISearchModelerApp();

/*-------------------------------------------------------------------------*/
