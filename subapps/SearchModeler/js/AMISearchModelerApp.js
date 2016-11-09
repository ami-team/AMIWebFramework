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

$AMIClass('AMISearchModelerApp', {
	/*-----------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*-----------------------------------------------------------------*/

	onReady: function()
	{
		var result = $.Deferred();

		amiWebApp.loadSheets([
			'subapps/SearchModeler/css/AMISearchModelerApp.css',
		]);

		$('#ami_jumbotron_title').html('SearchModeler');
		$('#ami_jumbotron_content').html('Search Modeler');
		$('#ami_breadcrumb_content').html('<li>Admin</li><li><a href="' + amiWebApp.webAppURL + '?subapp=amisearchmodeler">Search Modeler</a></li>');

		amiWebApp.loadHTMLs([
			'subapps/SearchModeler/html/AMISearchModelerApp.html',
			'subapps/SearchModeler/html/Modal/options.html',
			'subapps/SearchModeler/html/Fragment/interface.html',
			'subapps/SearchModeler/html/Fragment/input.html',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this}).done(function() {

				amiWebApp.appendHTML('body', data[1]);

				this.fragmentInterface = data[2];
				this.fragmentInput = data[3];

				result.resolve();
			});

		}).fail(function() {
			result.reject();
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	onExit: function()
	{
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
		if(!$('#ami_search_modeler_interface_list').html().trim())
		{
			this.getInterfaceList('#ami_search_modeler_interface_list');

			this.getCatalogs('#ami_search_modeler_interface_catalog');
		}
	},

	/*-----------------------------------------------------------------*/

	onLogout: function()
	{
	},

	/*-----------------------------------------------------------------*/

	onSessionExpired: function()
	{
	},

	/*-----------------------------------------------------------------*/

	getInterfaceList: function(dst)
	{
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

			amiWebApp.replaceHTML(dst, this.fragmentInterface, {dict: dict});
		});
	},

	/*-----------------------------------------------------------------*/

	getCatalogs: function(dst, defaultCatalog)
	{
		amiWebApp.lock();

		$(dst).empty();

		amiCommand.execute('ListCatalogs').done(function(data) {

			var rows = amiWebApp.jspath('..row', data);

			var s = '<option value="" style="display: none;">--select--</option>';

			$.foreach(rows, function(index, row) {

				var catalog = amiWebApp.jspath('..field{.@name==="catalog"}.$', row)[0] || '';

				if(catalog !== defaultCatalog) {
					s += '<option value="' + catalog + '">' + catalog + '</option>';
				}
				else {
					s += '<option value="' + catalog + '" selected="selected">' + catalog + '</option>';
				}
			});

			$(dst).html(s).promise().done(function() {

				amiWebApp.unlock();
			});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	},

	/*-----------------------------------------------------------------*/

	getEntities: function(dst, catalog, defaultEntity)
	{
		if(!catalog)
		{
			return;
		}

		amiWebApp.lock();

		$(dst).empty();

		amiCommand.execute('ListEntities -catalog="' + catalog + '"').done(function(data) {

			var rows = amiWebApp.jspath('..row', data);

			var s = '<option value="" style="display: none;">--select--</option>';

			$.foreach(rows, function(index, row) {

				var entity = amiWebApp.jspath('..field{.@name==="entity"}.$', row)[0] || '';

				if(entity !== defaultEntity) {
					s += '<option value="' + entity + '">' + entity + '</option>';
				}
				else {
					s += '<option value="' + entity + '" selected="selected">' + entity + '</option>';
				}
			});

			$(dst).html(s).promise().done(function() {

				amiWebApp.unlock();
			});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	},

	/*-----------------------------------------------------------------*/

	getFields: function(dst, catalog, entity, defaultField)
	{
		if(!catalog
		   ||
		   !entity
		 ) {
			return;
		}

		amiWebApp.lock();

		$(dst).empty();

		amiCommand.execute('ListFields -catalog="' + catalog + '" -entity="' + entity + '"').done(function(data) {

			var rows = amiWebApp.jspath('..row', data);

			var s = '<option value="" style="display: none;">--select--</option>';

			$.foreach(rows, function(index, row) {

				var field = amiWebApp.jspath('..field{.@name==="field"}.$', row)[0] || '';

				if(field !== defaultField) {
					s += '<option value="' + field + '">' + field + '</option>';
				}
				else {
					s += '<option value="' + field + '" selected="selected">' + field + '</option>';
				}
			});

			$(dst).html(s).promise().done(function() {

				amiWebApp.unlock();
			});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	},

	/*-----------------------------------------------------------------*/

	_inputCnt: 0,

	/*-----------------------------------------------------------------*/

	select: function(id, interface, catalog, entity)
	{
		amiWebApp.lock();

		$('#ami_search_modeler_interface_name').val(
							interface
		);

		$('#ami_search_modeler_paths > .input-group').empty();

		this.getCatalogs('#ami_search_modeler_interface_catalog', catalog);

		this.getEntities('#ami_search_modeler_interface_entities', catalog, entity);

		amiCommand.execute('SearchQuery -catalog="self" -sql="SELECT `entity`, `field`, `alias`, `type`, `rank`, `mask`, `defaultValue` FROM `router_search_criteria` WHERE `interfaceFK`=' + id + ' ORDER BY `rank`"', {context: this}).done(function(data) {

			var rows = amiWebApp.jspath('..row', data);

			var dict = [];

			$.foreach(rows, function(index, row) {

				var inputCnt = this._inputCnt++;

				var entity = amiWebApp.jspath('..field{.@name==="entity"}.$', row)[0] || '';
				var field = amiWebApp.jspath('..field{.@name==="field"}.$', row)[0] || '';
				var alias = amiWebApp.jspath('..field{.@name==="alias"}.$', row)[0] || '';
				var type = amiWebApp.jspath('..field{.@name==="type"}.$', row)[0] || '';
				var rank = amiWebApp.jspath('..field{.@name==="rank"}.$', row)[0] || '';
				var mask = amiWebApp.jspath('..field{.@name==="mask"}.$', row)[0] || '0';
				var defaultValue = amiWebApp.jspath('..field{.@name==="defaultValue"}.$', row)[0] || '';

				if(!alias)
				{
					alias = field;
				}

				dict.push({
					INPUT_CNT: inputCnt,
					ENTITY: entity,
					FIELD: field,
					ALIAS: alias,
					TYPE: type,
					RANK: rank,
					MASK: mask,
					DEFAULT_VALUE: defaultValue,
				});

			}, this);

			amiWebApp.appendHTML('#ami_search_modeler_paths', this.fragmentInput, {context: this, dict: dict}).done(function() {

				$.foreach(dict, function(index, x) {

					var inputCnt = x['INPUT_CNT'];
					var entity = x['ENTITY'];
					var field = x['FIELD'];
					var type = x['TYPE'];

					this.getEntities('#ami_search_modeler_entity_' + inputCnt, catalog, entity);
					this.getFields('#ami_search_modeler_field_' + inputCnt, catalog, entity, field);

					$('#ami_search_modeler_type_' + inputCnt).val(type);

				}, this);

				amiWebApp.unlock();
			});

		}).fail(function(data) {

			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	},

	/*-----------------------------------------------------------------*/

	addInput: function()
	{
		var catalog = $('#ami_search_modeler_interface_catalog').val();

		if(catalog)
		{
			var inputCnt = this._inputCnt++;

			var dict = {
				INPUT_CNT: inputCnt,
				ALIAS: '',
				RANK: 0,
				MASK: 0,
				DEFAULT_VALUE: '',
			};

			amiWebApp.appendHTML('#ami_search_modeler_paths', this.fragmentInput, {context: this, dict: dict}).done(function() {

				this.getEntities('#ami_search_modeler_entity_' + inputCnt, catalog);
			});
		}
	},

	/*-----------------------------------------------------------------*/

	editOptions: function(inputCnt)
	{
		this.currentInputCnt = inputCnt;

		/*---------------------------------------------------------*/

		var mask = $('#ami_search_modeler_mask_' + inputCnt).val();

		var defaultValue = $('#ami_search_modeler_defaultValue_' + inputCnt).val();

		/*---------------------------------------------------------*/

		mask = parseInt(mask);

		$('#modal_ami_search_modeler_options_form_mode1').prop('checked', (mask & (1 | 2 | 4)) === 0);
		$('#modal_ami_search_modeler_options_form_mode2').prop('checked', (mask & 1) !== 0);
		$('#modal_ami_search_modeler_options_form_mode3').prop('checked', (mask & 2) !== 0);
		$('#modal_ami_search_modeler_options_form_mode4').prop('checked', (mask & 4) !== 0);

		$('#modal_ami_search_modeler_options_form_order1').prop('checked', (mask & (8 | 16)) === 0);
		$('#modal_ami_search_modeler_options_form_order2').prop('checked', (mask & 8) !== 0);
		$('#modal_ami_search_modeler_options_form_order3').prop('checked', (mask & 16) !== 0);

		$('#modal_ami_search_modeler_options_form_sum').prop('checked', (mask & 32) !== 0);
		$('#modal_ami_search_modeler_options_form_count').prop('checked', (mask & 64) !== 0);
		$('#modal_ami_search_modeler_options_form_inclusive').prop('checked', (mask & 128) !== 0);
		$('#modal_ami_search_modeler_options_form_simple_search').prop('checked', (mask & 256) !== 0);

		/*---------------------------------------------------------*/

		$('#modal_ami_search_modeler_options_form_defaultValue').val(defaultValue);

		/*---------------------------------------------------------*/

		$('#modal_ami_search_modeler_options').modal('show');

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	setOptions: function()
	{
		var inputCnt = this.currentInputCnt;

		/*---------------------------------------------------------*/

		var mode2 = $('#modal_ami_search_modeler_options_form_mode2').prop('checked');
		var mode3 = $('#modal_ami_search_modeler_options_form_mode3').prop('checked');

		var order2 = $('#modal_ami_search_modeler_options_form_order2').prop('checked');
		var order3 = $('#modal_ami_search_modeler_options_form_order3').prop('checked');

		var sum = $('#modal_ami_search_modeler_options_form_sum').prop('checked');
		var count = $('#modal_ami_search_modeler_options_form_count').prop('checked');
		var inclusive = $('#modal_ami_search_modeler_options_form_inclusive').prop('checked');
		var simpleSearch = $('#modal_ami_search_modeler_options_form_simple_search').prop('checked');

		/*---------------------------------------------------------*/

		var mask = 0x00;

		if(mode2) mask |= 1;
		if(mode3) mask |= 2;
		if(mode3) mask |= 4;

		if(order2) mask |= 8;
		if(order3) mask |= 16;

		if(sum) mask |= 32;
		if(count) mask |= 64;
		if(inclusive) mask |= 128;
		if(simpleSearch) mask |= 256;

		/*---------------------------------------------------------*/

		var defaultValue = $('#modal_ami_search_modeler_options_form_defaultValue').val();

		/*---------------------------------------------------------*/

		$('#ami_search_modeler_mask_' + inputCnt).val(mask);

		$('#ami_search_modeler_defaultValue_' + inputCnt).val(defaultValue);

		/*---------------------------------------------------------*/

		$('#modal_ami_search_modeler_options').modal('hide');

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	reset: function()
	{
		/*---------------------------------------------------------*/

		if(confirm('Please confirm...') == false)
		{
			return;
		}

		/*---------------------------------------------------------*/

		$('#ami_search_modeler_interface_name').val('');
		$('#ami_search_modeler_interface_catalog').val('');
		$('#ami_search_modeler_interface_entities').val('');

		$('#ami_search_modeler_paths > .input-group').empty();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	remove: function()
	{
		/*---------------------------------------------------------*/

		var interfaceName = $('#ami_search_modeler_interface_name').val();

		if(!interfaceName)
		{
			return;
		}

		/*---------------------------------------------------------*/

		if(confirm('Please confirm...') == false)
		{
			return;
		}

		amiWebApp.lock();

		/*---------------------------------------------------------*/

		amiCommand.execute('RemoveElements -catalog="self" -entity="router_search_interface" -separator="," -keyFields="interface" -keyValues="' + interfaceName + '"', {context: this}).always(function() {

			this.getInterfaceList('#ami_search_modeler_interface_list');

			amiWebApp.success('done with success');
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	apply: function()
	{
		/*---------------------------------------------------------*/

		var interfaceName = $('#ami_search_modeler_interface_name').val();
		var interfaceCatalog = $('#ami_search_modeler_interface_catalog').val();
		var interfaceEntities = $('#ami_search_modeler_interface_entities').val();

		if(!interfaceName
		   ||
		   !interfaceCatalog
		   ||
		   !interfaceEntities
		 ) {
			return;
		}

		/*---------------------------------------------------------*/

		if(confirm('Please confirm...') == false)
		{
			return;
		}

		amiWebApp.lock();

		/*---------------------------------------------------------*/

		var paths = {};

		var params = $('#ami_search_modeler_paths').serializeArray();

		$.each(params, function(index, value) {

			var _path = null;
			var _name = value['name'].trim();
			var _value = value['value'].trim();

			var idx = _name.lastIndexOf('_');

			if(idx > 0)
			{
				_path = _name.substring(idx + 1);
				_name = _name.substring(0, idx);

				if(!(_path in paths)) {
					paths[_path] = {};
				}

				paths[_path][_name] = _value;
			}
		});

		/*---------------------------------------------------------*/

		amiCommand.execute('RemoveElements -catalog="self" -entity="router_search_interface" -separator="," -keyFields="interface" -keyValues="' + interfaceName + '"', {context: this}).always(function() {

			amiCommand.execute('AddElement -catalog="self" -entity="router_search_interface" -separator="," -fields="interface,catalog,entity" -values="' + interfaceName + ',' + interfaceCatalog + ',' + interfaceEntities + '"', {context: this}).done(function() {
				/*-----------------------------------------*/

				this.getInterfaceList('#ami_search_modeler_interface_list');

				amiWebApp.success('Done with success.');

				/*-----------------------------------------*/

				for(var path in paths)
				{
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

			}).fail(function(data) {

				amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
			});
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiSearchModelerApp = new AMISearchModelerApp();

amiRegisterSubApp('amiSearchModeler', amiSearchModelerApp, {});

/*-------------------------------------------------------------------------*/
