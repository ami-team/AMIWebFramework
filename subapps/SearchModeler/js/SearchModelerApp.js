/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('SearchModelerApp', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function()
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/UserDashboard/js/jquery-ui.min.js',
			'subapps/SearchModeler/twig/SearchModelerApp.twig',
			'subapps/SearchModeler/css/SearchModelerApp.css',
			'subapps/SearchModeler/twig/interface.twig',
			'subapps/SearchModeler/twig/input.twig',
			/**/
		]).done((data) => {

			amiWebApp.replaceHTML('#ami_main_content', data[1]).done(() => {

				$('#DD89D783_6F39_7B3B_3F3F_D875737A5E68').sortable();

				this.fragmentInterface = data[3];
				this.fragmentInput = data[4];

				this.searchInterfaces = {};

				result.resolve();
			});

		}).fail(() => {

			result.reject();
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function()
	{
		if(!$('#CFB6CA12_2D42_3111_3183_EC1006F7E039').html().trim())
		{
			this.getInterfaceList('#CFB6CA12_2D42_3111_3183_EC1006F7E039');

			this.getCatalogs('#ECAE118F_BBFB_6F69_590F_C6F38611F8C3');
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	getInterfaceList: function(dst)
	{
		amiWebApp.lock();

		amiCommand.execute('SearchQuery -catalog="self" -entity="router_search_interface" -sql="SELECT `id`, `group`, `name`, `json`, `archived` FROM `router_search_interface` ORDER BY `group`, `name`"').done((data) => {

			var rows = amiWebApp.jspath('..row', data);

			var dict = {
				interfaces: [],
			};

			rows.forEach((row) => {

				const id = amiWebApp.jspath('..field{.@name==="router.router_search_interface.id"}.$', row)[0] || '';
				const group = amiWebApp.jspath('..field{.@name==="router.router_search_interface.group"}.$', row)[0] || '';
				const name = amiWebApp.jspath('..field{.@name==="router.router_search_interface.name"}.$', row)[0] || '';
				const json = amiWebApp.jspath('..field{.@name==="router.router_search_interface.json"}.$', row)[0] || '';
				const archived = amiWebApp.jspath('..field{.@name==="router.router_search_interface.archived"}.$', row)[0] || '';

				try
				{
					const interface = {
						id: id,
						group: group,
						name: name,
						json: JSON.parse(json),
						archived: archived,
					};

					dict.interfaces.push(interface);

					this.searchInterfaces[id] = interface;
				}
				catch(e)
				{
					/* IGNORE */
				}
			});

			amiWebApp.replaceHTML(dst, this.fragmentInterface, {dict: dict}).done(() => {

				amiWebApp.unlock();
			});

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	getCatalogs: function(dst, defaultCatalog)
	{
		defaultCatalog = defaultCatalog || '';

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		$(dst).empty();

		amiCommand.execute('ListCatalogs').done((data) => {

			const s = [
				'<option value="" style="display: none;">-- select a catalog --</option>'
			];

			amiWebApp.jspath('..row', data).forEach((row) => {

				const catalog = amiWebApp.jspath('..field{.@name==="externalCatalog"}.$', row)[0] || '';

				if(catalog.toLowerCase() !== defaultCatalog.toLowerCase()) {
					s.push('<option value="' + amiWebApp.textToHtml(catalog) + '" xxxxxxxx="xxxxxxxx">' + amiWebApp.textToHtml(catalog) + '</option>');
				}
				else {
					s.push('<option value="' + amiWebApp.textToHtml(catalog) + '" selected="selected">' + amiWebApp.textToHtml(catalog) + '</option>');
				}
			});

			$(dst).html(s.join('')).promise().done(() => {

				amiWebApp.unlock();
			});

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	getEntities: function(dst, catalog, defaultEntity)
	{
		if(!catalog)
		{
			return;
		}

		defaultEntity = defaultEntity || '';

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		$(dst).empty();

		amiCommand.execute('ListEntities -catalog="' + amiWebApp.textToString(catalog) + '"').done((data) => {

			const s = [
				'<option value="" style="display: none;">-- select an entity --</option>'
			];

			amiWebApp.jspath('..row', data).forEach((row) => {

				const entity = amiWebApp.jspath('..field{.@name==="entity"}.$', row)[0] || '';

				if(entity.toLowerCase() !== defaultEntity.toLowerCase()) {
					s.push('<option value="' + amiWebApp.textToHtml(entity) + '" xxxxxxxx="xxxxxxxx">' + amiWebApp.textToHtml(entity) + '</option>');
				}
				else {
					s.push('<option value="' + amiWebApp.textToHtml(entity) + '" selected="selected">' + amiWebApp.textToHtml(entity) + '</option>');
				}
			});

			$(dst).html(s.join('')).promise().done(() => {

				amiWebApp.unlock();
			});

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	getFields: function(dst, catalog, entity, defaultField)
	{
		if(!catalog
		   ||
		   !entity
		 ) {
			return;
		}

		defaultField = defaultField || '';

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		$(dst).empty();

		amiCommand.execute('ListFields -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '"').done((data) => {

			const s = [
				'<option value="" style="display: none;">-- select a field --</option>'
			];

			amiWebApp.jspath('..row', data).forEach((row) => {

				var field = amiWebApp.jspath('..field{.@name==="field"}.$', row)[0] || '';

				if(field.toLowerCase() !== defaultField.toLowerCase()) {
					s.push('<option value="' + amiWebApp.textToHtml(field) + '" xxxxxxxx="xxxxxxxx">' + amiWebApp.textToHtml(field) + '</option>');
				}
				else {
					s.push('<option value="' + amiWebApp.textToHtml(field) + '" selected="selected">' + amiWebApp.textToHtml(field) + '</option>');
				}
			});

			$(dst).html(s.join('')).promise().done(() => {

				amiWebApp.unlock();
			});

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	cnt: 0,

	/*----------------------------------------------------------------------------------------------------------------*/

	select: function(id)
	{
		if(!(id = id.trim()))
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

		const searchInterface = this.searchInterfaces[id];

		$('#A9A04006_FEE1_1501_EAEB_49ED8F99A5EE').val(searchInterface.id);

		$('#BC4ABCC1_39F9_2020_4B64_0BC86DDA6B16').val(searchInterface.group);

		$('#B08B0D55_227C_8AB2_DD3F_B9E783E606F8').val(searchInterface.name);

		$('#A2C54F33_AC45_3553_86D6_4A479D10CD54').prop('checked', searchInterface.archived !== '0');

		/*------------------------------------------------------------------------------------------------------------*/

		this.getCatalogs('#ECAE118F_BBFB_6F69_590F_C6F38611F8C3', searchInterface.json.defaultCatalog);

		if(searchInterface.json.defaultCatalog)
		{
			this.getEntities('#F71D1452_8613_5FB5_27D3_C1540573F450', searchInterface.json.defaultCatalog, searchInterface.json.defaultEntity);

			if(searchInterface.json.defaultEntity)
			{
				this.getFields('#BB89A473_0842_CB8F_E146_A6CCD8D3F15E', searchInterface.json.defaultCatalog, searchInterface.json.defaultEntity, searchInterface.json.defaultPrimaryField);
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		const dict = {
			cnt: this.cnt,
			criterias: searchInterface.json.criterias,
		};

		amiWebApp.replaceHTML('#DD89D783_6F39_7B3B_3F3F_D875737A5E68', this.fragmentInput, {dict: dict}).done(() => {

			dict.criterias.forEach((criteria) => {

				this.getCatalogs('#E3ACBBAC_D452_5B9A_4926_D8FEE356CD63_' + this.cnt, criteria.catalog);

				if(criteria.catalog)
				{
					this.getEntities('#A4D2FD72_FF0A_3C87_B1CF_4A31331D3F8B_' + this.cnt, criteria.catalog, criteria.entity);

					if(criteria.entity)
					{
						this.getFields('#A45F0216_6C35_19F3_2CEC_103A8536914F_' + this.cnt, criteria.catalog, criteria.entity, criteria.field);
					}
				}

				this.cnt++;
			});

			amiWebApp.unlock();
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	addCriteria: function(catalog)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

		var dict = {
			cnt: this.cnt,
			criterias: [{type: 0}],
		};

		amiWebApp.appendHTML('#DD89D783_6F39_7B3B_3F3F_D875737A5E68', this.fragmentInput, {dict: dict}).done(() => {

			dict.criterias.forEach((criteria) => {

				this.getCatalogs('#E3ACBBAC_D452_5B9A_4926_D8FEE356CD63_' + this.cnt, catalog);

				if(catalog)
				{
					this.getEntities('#A4D2FD72_FF0A_3C87_B1CF_4A31331D3F8B_' + this.cnt, catalog);
				}

				this.cnt++;
			});

			amiWebApp.unlock();
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	editOptions: function(inputCnt)
	{

	},

	/*----------------------------------------------------------------------------------------------------------------*/

	setOptions: function()
	{

	},

	/*----------------------------------------------------------------------------------------------------------------*/

	clear: function()
	{
		if(confirm('Please confirm...') == false)
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		$('#A9A04006_FEE1_1501_EAEB_49ED8F99A5EE').val('');

		$('#BC4ABCC1_39F9_2020_4B64_0BC86DDA6B16').val('');
		$('#B08B0D55_227C_8AB2_DD3F_B9E783E606F8').val('');
		$('#A2C54F33_AC45_3553_86D6_4A479D10CD54').val('');

		$('#ECAE118F_BBFB_6F69_590F_C6F38611F8C3').val('');
		$('#F71D1452_8613_5FB5_27D3_C1540573F450').val('');
		$('#BB89A473_0842_CB8F_E146_A6CCD8D3F15E').val('');

		$('#DD89D783_6F39_7B3B_3F3F_D875737A5E68').empty();

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	remove: function()
	{
		if(confirm('Please confirm...') == false)
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		const id = $('#A9A04006_FEE1_1501_EAEB_49ED8F99A5EE').val();

		if(!id)
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.execute('RemoveElements -catalog="self" -entity="router_search_interface" -separator="," -keyFields="id" -keyValues="' + amiWebApp.textToString(id) + '"').always(() => {

			this.getInterfaceList('#CFB6CA12_2D42_3111_3183_EC1006F7E039');

			amiWebApp.success('Done with success', true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	apply: function()
	{
		if(confirm('Please confirm...') == false)
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		const id = $('#A9A04006_FEE1_1501_EAEB_49ED8F99A5EE').val().trim();
		const group = $('#B08B0D55_227C_8AB2_DD3F_B9E783E606F8').val().trim();
		const name = $('#BC4ABCC1_39F9_2020_4B64_0BC86DDA6B16').val().trim();
		const defaultCatalog = $('#ECAE118F_BBFB_6F69_590F_C6F38611F8C3').val().trim();
		const defaultEntity = $('#F71D1452_8613_5FB5_27D3_C1540573F450').val().trim();
		const defaultPrimaryField = $('#BB89A473_0842_CB8F_E146_A6CCD8D3F15E').val().trim();
		const archived = $('#A2C54F33_AC45_3553_86D6_4A479D10CD54').prop('checked') ? '1' : '0';

		if(!group
		   ||
		   !name
		   ||
		   !archived
		   ||
		   !defaultCatalog
		   ||
		   !defaultEntity
		   ||
		   !defaultPrimaryField
		 ) {
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

		const keys = [];
		const criterias = {};

		$('#FEC360FA_EC1D_90DC_FFD5_8A498CF60305').serializeArray().forEach((item) => {

			const parts = item.name.split('_');

			if(parts.length === 2)
			{
				const key1 = parts[1];
				const key2 = parts[0];

				if(!(key1 in criterias))
				{
					keys.push(key1);
					criterias[key1] = {};
				}

				criterias[key1][key2] = item.value;
			}
		});

		/*------------------------------------------------------------------------------------------------------------*/

		const json = {
			defaultCatalog: defaultCatalog,
			defaultEntity: defaultEntity,
			defaultPrimaryField: defaultPrimaryField,
			criterias: keys.map(key => criterias[key]),
		};

		amiCommand.execute('RemoveElements -catalog="self" -entity="router_search_interface" -separator="£" -keyFields="id" -keyValues="' + amiWebApp.textToString(id) + '"').done((/*---------*/) => {

			amiCommand.execute('AddElement -catalog="self" -entity="router_search_interface" -separator="£" -fields="group£name£json£archived" -values="' + amiWebApp.textToString(group) + '£' + amiWebApp.textToString(name) + '£' + amiWebApp.textToString(JSON.stringify(json)) + '£' + amiWebApp.textToString(archived) + '"').done((data, message) => {

				this.getInterfaceList('#CFB6CA12_2D42_3111_3183_EC1006F7E039');

				amiWebApp.success(message, true);

			}).fail((data, message) => {

				this.getInterfaceList('#CFB6CA12_2D42_3111_3183_EC1006F7E039');

				amiWebApp.error(message, true);
			});

		}).fail((data, message) => {

			this.getInterfaceList('#CFB6CA12_2D42_3111_3183_EC1006F7E039');

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

searchModelerApp = new SearchModelerApp();

/*--------------------------------------------------------------------------------------------------------------------*/
