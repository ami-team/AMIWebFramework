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
			'subapps/SearchModeler/twig/SearchModelerApp.twig',
			'subapps/SearchModeler/twig/interface.twig',
			'subapps/SearchModeler/twig/input.twig',
			/**/
		]).done((data) => {

			amiWebApp.replaceHTML('#ami_main_content', data[0]).done(() => {

				/*----------------------------------------------------------------------------------------------------*/

				amiWebApp.loadResources([
					'subapps/UserDashboard/js/jquery-ui.min.js',
					'js/3rd-party/codemirror/lib/codemirror.css',
					'js/3rd-party/codemirror/lib/codemirror.js',
					'js/3rd-party/codemirror/addon/edit/matchbrackets.js',
					'js/3rd-party/codemirror/mode/javascript/javascript.js',
				]).done(() => {

					/*------------------------------------------------------------------------------------------------*/

					$('#DD89D783_6F39_7B3B_3F3F_D875737A5E68').sortable();

					/*------------------------------------------------------------------------------------------------*/

					const editor1 = CodeMirror.fromTextArea(document.getElementById('A3D83B42_4FBF_5DAE_6A38_12F1F53493B5'), {
						lineNumbers: true,
						matchBrackets: true,
						mode: 'application/json',
					});

					$('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').data('editor', editor1);

					$('#AAC55FA7_4919_DF1A_F194_30DF6435B539').on('shown.bs.modal', () => {

						editor1.refresh();
					});

					/*------------------------------------------------------------------------------------------------*/

					const editor2 = CodeMirror.fromTextArea(document.getElementById('A78C0694_128B_1AD8_2596_C321DAA4690B'), {
						lineNumbers: true,
						matchBrackets: true,
						mode: 'application/json',
					});

					$('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor', editor2);

					$('#E78A17C0_799E_8E34_4986_322B9EA80D9F').on('shown.bs.modal', () => {

						editor2.refresh();
					});

					/*------------------------------------------------------------------------------------------------*/

					$('#B1786DE7_BCD6_F336_D811_9CBB6ECB583F').click(() => {

						this.editOptions1();
					});

					/*------------------------------------------------------------------------------------------------*/

					$('#E3951FA5_8B76_3C9E_CFC2_EC3749451226').change((e) => {

						let more;

						try {
							more = JSON.parse($('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').getValue());
						}
						catch(e) {
							more = {/*--------------------------------------------------------------------------*/};
						}

						more.auto_open = $(e.currentTarget).prop('checked');

						$('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').setValue(JSON.stringify(more, null, 2));
					});

					/*------------------------------------------------------------------------------------------------*/

					$('#F4570E3E_B4DB_42DE_3E10_6A44F04F2FA7').change((e) => {

						let more;

						try {
							more = JSON.parse($('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').getValue());
						}
						catch(e) {
							more = {/*--------------------------------------------------------------------------*/};
						}

						if($(e.currentTarget).prop('checked')) {
							more.init_value = $('#B302D100_DDD0_904F_5B50_E0E85FB0C4D3').val();
						} else {
							delete more.init_value;
						}

						$('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').setValue(JSON.stringify(more, null, 2));
					});

					/*------------------------------------------------------------------------------------------------*/

					$('#B302D100_DDD0_904F_5B50_E0E85FB0C4D3').keyup((e) => {

						let more;

						try {
							more = JSON.parse($('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').getValue());
						}
						catch(e) {
							more = {/*--------------------------------------------------------------------------*/};
						}

						if($('#F4570E3E_B4DB_42DE_3E10_6A44F04F2FA7').prop('checked')) {
							more.init_value = $('#B302D100_DDD0_904F_5B50_E0E85FB0C4D3').val();
						} else {
							delete more.init_value;
						}

						$('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').setValue(JSON.stringify(more, null, 2));
					});

					/*------------------------------------------------------------------------------------------------*/

					$('#CECEF559_7DC7_1AE7_AE83_81C19AFB8A06').change((e) => {

						let more;

						try {
							more = JSON.parse($('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').getValue());
						}
						catch(e) {
							more = {/*--------------------------------------------------------------------------*/};
						}

						more.distinct = $(e.currentTarget).prop('checked');

						$('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').setValue(JSON.stringify(more, null, 2));
					});

					/*------------------------------------------------------------------------------------------------*/

					$('#D6089F83_363A_F322_1E92_25567D89BD3B').change((e) => {

						let more;

						try {
							more = JSON.parse($('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').getValue());
						}
						catch(e) {
							more = {/*--------------------------------------------------------------------------*/};
						}

						more.inclusive = $(e.currentTarget).prop('checked');

						$('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').setValue(JSON.stringify(more, null, 2));
					});

					/*------------------------------------------------------------------------------------------------*/

					$('#B6671716_EA4E_E4A6_454B_79140FFC1532').change((e) => {

						let more;

						try {
							more = JSON.parse($('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').getValue());
						}
						catch(e) {
							more = {/*--------------------------------------------------------------------------*/};
						}

						more.simple_search = $(e.currentTarget).prop('checked');

						$('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').setValue(JSON.stringify(more, null, 2));
					});

					/*------------------------------------------------------------------------------------------------*/

					$('input[name="C1F5D43B"]').change((e) => {

						let more;

						try {
							more = JSON.parse($('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').getValue());
						}
						catch(e) {
							more = {/*--------------------------------------------------------------------------*/};
						}

						/*--*/ if($('#C1F5D43B_000E_F867_ABA5_13EA519F55CA').prop('checked')) {
							more.order = 'ASC';
						} else if($('#A10FF5C5_4D17_36BB_A18F_4E2C4EB05A3B').prop('checked')) {
							more.order = 'DESC';
						} else {
							delete more.order;
						}

						$('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').setValue(JSON.stringify(more, null, 2));
					});

					/*------------------------------------------------------------------------------------------------*/

				});

				this.fragmentInterface = data[1];
				this.fragmentInput = data[2];

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

				const id = amiWebApp.jspath('..field{.@name==="id"}.$', row)[0] || '';
				const group = amiWebApp.jspath('..field{.@name==="group"}.$', row)[0] || '';
				const name = amiWebApp.jspath('..field{.@name==="name"}.$', row)[0] || '';
				const json = amiWebApp.jspath('..field{.@name==="json"}.$', row)[0] || '';
				const archived = amiWebApp.jspath('..field{.@name==="archived"}.$', row)[0] || '';

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

		$('#B08B0D55_227C_8AB2_DD3F_B9E783E606F8').val(searchInterface.group);

		$('#BC4ABCC1_39F9_2020_4B64_0BC86DDA6B16').val(searchInterface.name);

		$('#A2C54F33_AC45_3553_86D6_4A479D10CD54').prop('checked', searchInterface.archived !== '0');

		$('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').data('editor').setValue(JSON.stringify(searchInterface.more || {}, null, 2));

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

	addCriteria: function(catalog, entity, field, criterias)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

		var dict = {
			cnt: this.cnt,
			criterias: criterias || [{type: 0}],
		};

		amiWebApp.appendHTML('#DD89D783_6F39_7B3B_3F3F_D875737A5E68', this.fragmentInput, {dict: dict}).done(() => {

			dict.criterias.forEach((criteria) => {

				this.getCatalogs('#E3ACBBAC_D452_5B9A_4926_D8FEE356CD63_' + this.cnt, catalog);

				if(catalog)
				{
					this.getEntities('#A4D2FD72_FF0A_3C87_B1CF_4A31331D3F8B_' + this.cnt, catalog, entity);

					if(entity)
					{
						this.getFields('#A45F0216_6C35_19F3_2CEC_103A8536914F_' + this.cnt, catalog, entity, field);
					}
				}

				this.cnt++;
			});

			amiWebApp.unlock();
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	editOptions1: function()
	{
		$('#AAC55FA7_4919_DF1A_F194_30DF6435B539').modal('show');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	setOptions1: function()
	{
		$('#AAC55FA7_4919_DF1A_F194_30DF6435B539').modal('hide');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	editOptions2: function(inputCnt)
	{
		try {
			more = JSON.parse($('#C4AAADBC_C3B5_6DDC_851B_F06430CB4F6E_' + inputCnt).val());
		}
		catch(e) {
			more = {/*------------------------------------------------------------------*/};
		}

		$('#E3951FA5_8B76_3C9E_CFC2_EC3749451226').prop('checked', more.auto_open);
		$('#CECEF559_7DC7_1AE7_AE83_81C19AFB8A06').prop('checked', more.distinct);
		$('#D6089F83_363A_F322_1E92_25567D89BD3B').prop('checked', more.inclusive);
		$('#B6671716_EA4E_E4A6_454B_79140FFC1532').prop('checked', more.simple_search);

		/*--*/ if(more.order === 'ASC') {
			$('#C1F5D43B_000E_F867_ABA5_13EA519F55CA').prop('checked', true);
		} else if(more.order === 'ASC') {
			$('#C1F5D43B_000E_F867_ABA5_13EA519F55CA').prop('checked', true);
        } else {
        	$('#A10FF5C5_4D17_36BB_A18F_4E2C4EB05A3B').prop('checked', true);
        }

		/**/

		$('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').setValue($('#C4AAADBC_C3B5_6DDC_851B_F06430CB4F6E_' + inputCnt).val());

		$('#E78A17C0_799E_8E34_4986_322B9EA80D9F').modal('show');

		this.currentInputCnt = inputCnt;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	setOptions2: function()
	{
		$('#C4AAADBC_C3B5_6DDC_851B_F06430CB4F6E_' + this.currentInputCnt).val($('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').getValue());

		$('#E78A17C0_799E_8E34_4986_322B9EA80D9F').modal('hide');

		this.currentInputCnt = 0xFFFFFFFF;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	clear: function()
	{
		if(confirm('Please confirm...') == false)
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

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

	_trim: function(s)
	{
		if(s) {
			return s.trim();
		}
		else {
			return '';
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	remove: function()
	{
		if(confirm('Please confirm...') == false)
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		const group = this._trim($('#B08B0D55_227C_8AB2_DD3F_B9E783E606F8').val());
		const name = this._trim($('#BC4ABCC1_39F9_2020_4B64_0BC86DDA6B16').val());

		if(!group
		   ||
		   !name
		 ) {
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.execute('RemoveElements -catalog="self" -entity="router_search_interface" -separator="£" -keyFields="group£name" -keyValues="' + amiWebApp.textToString(group) + '£' + amiWebApp.textToString(name) +'"').done((data, message) => {

			this.getInterfaceList('#CFB6CA12_2D42_3111_3183_EC1006F7E039');

			amiWebApp.success(message, true);

		}).fail((data, message) => {

			this.getInterfaceList('#CFB6CA12_2D42_3111_3183_EC1006F7E039');

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	apply: function(clone)
	{
		if(confirm('Please confirm...') == false)
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		const group = this._trim($('#B08B0D55_227C_8AB2_DD3F_B9E783E606F8').val());
		const name = this._trim($('#BC4ABCC1_39F9_2020_4B64_0BC86DDA6B16').val());
		const defaultCatalog = this._trim($('#ECAE118F_BBFB_6F69_590F_C6F38611F8C3').val());
		const defaultEntity = this._trim($('#F71D1452_8613_5FB5_27D3_C1540573F450').val());
		const defaultPrimaryField = this._trim($('#BB89A473_0842_CB8F_E146_A6CCD8D3F15E').val());
		const archived = $('#A2C54F33_AC45_3553_86D6_4A479D10CD54').prop('checked') ? '1' : '0';
		const more = $('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').data('editor').getValue();

		const defaultCATALOG = this._trim(clone ? window.prompt('New default catalog', defaultCatalog) : defaultCatalog);

		if(!group
		   ||
		   !name
		   ||
		   !defaultCatalog
		   ||
		   !defaultCATALOG
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

				/**/ if(key2 === 'more')
				{
					try {
						criterias[key1][key2] = JSON.parse(moreitem.value);
					}
					catch(e) {
						criterias[key1][key2] = {/*--------------------*/};
					}
				}
				else if(key2 === 'type')
                {
                	criterias[key1][key2] = parseInt(item.value);
                }
				else
				{
					criterias[key1][key2] = (clone && key2  == 'catalog' && item.value === defaultCatalog) ? defaultCATALOG
					                                                                                       : ((item.value))
					;
				}
			}
		});

		/*------------------------------------------------------------------------------------------------------------*/

		let MORE;

		try {
			MORE = JSON.parse(more);
		}
		catch(e) {
			MORE = {/*----------*/};
		}

		/*------------------------------------------------------------------------------------------------------------*/

		const json = {
			defaultCatalog: defaultCATALOG,
			defaultEntity: defaultEntity,
			defaultPrimaryField: defaultPrimaryField,
			more: MORE,
			criterias: keys.map(key => criterias[key]),
		};

		amiCommand.execute('RemoveElements -catalog="self" -entity="router_search_interface" -separator="£" -keyFields="group£name" -keyValues="' + amiWebApp.textToString(group) + '£' + amiWebApp.textToString(name) +'"').done((/*---------*/) => {

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
