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
		const result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/SearchModeler/twig/SearchModelerApp.twig',
			'subapps/SearchModeler/twig/interface.twig',
			'subapps/SearchModeler/twig/input.twig',
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

					const f1 = () => {

						const more = this._parseJson($('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').data('editor').getValue());

						this.formToJson1(more);

						$('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').data('editor').setValue(this._dumpJson(more));
					};

					$('#CECEF559_7DC7_1AE7_AE83_81C19AFB8A06').change(f1);

					/*------------------------------------------------------------------------------------------------*/

					const f2 = () => {

						const more = this._parseJson($('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').getValue());

						this.formToJson2(more);

						$('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').setValue(this._dumpJson(more));
					};

					$('#F9931091_31DD_A960_2AD0_C08417FE8484').change(f2);
					$('#F87B8D4A_BE3E_6C93_B432_9195DD1E5A15').keyup (f2);

					$('#F4570E3E_B4DB_42DE_3E10_6A44F04F2FA7').change(f2);
					$('#B302D100_DDD0_904F_5B50_E0E85FB0C4D3').keyup (f2);

					$('#C1788970_4C94_D98F_4199_5A185B4D97A3').keyup (f2);
					$('#D580EF7E_AD6A_BC51_FFAB_41782CC3F2CF').keyup (f2);
					$('#ED6493B8_63FC_96F1_48AA_F2D670E63836').keyup (f2);
					$('#A6D9F53B_DCBF_96D2_8DCE_4EFAB0F46E33').keyup (f2);

					$('#E3951FA5_8B76_3C9E_CFC2_EC3749451226').change(f2);
					$('#D6089F83_363A_F322_1E92_25567D89BD3B').change(f2);
					$('#B6671716_EA4E_E4A6_454B_79140FFC1532').change(f2);
					$('#C1F5D43B_000E_F867_ABA5_13EA519F55CA').change(f2);
					$('#BB6ADE31_B629_DB15_9319_DAFAAD9999CF').change(f2);
					$('#A10FF5C5_4D17_36BB_A18F_4E2C4EB05A3B').change(f2);

					/*------------------------------------------------------------------------------------------------*/

					const f3 = () => {

						$('#C64EE3C9_DB38_DDA5_20C2_B3B2E8140637').attr('size', $('#C64EE3C9_DB38_DDA5_20C2_B3B2E8140637').val().length);
					};

					$('#C64EE3C9_DB38_DDA5_20C2_B3B2E8140637').keyup(f3);

					$('#C64EE3C9_DB38_DDA5_20C2_B3B2E8140637').val(',');

					f3();

					/*------------------------------------------------------------------------------------------------*/

					const f4 = () => {

						$('#B06166B2_2DE1_255D_7350_9C21370DB32F').attr('size', $('#B06166B2_2DE1_255D_7350_9C21370DB32F').val().length);
					};

					$('#B06166B2_2DE1_255D_7350_9C21370DB32F').keyup(f4);

					$('#B06166B2_2DE1_255D_7350_9C21370DB32F').val(',');

					f4();

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

	_parseJson: function(x)
	{
		let result;

		try {
			result = JSON.parse(x || '{}');
		}
		catch(e) {
			result = {/*---------------*/};
		}

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_dumpJson: function(x)
	{
		let result;

		try {
			result = JSON.stringify(x || {}, null, 2);
		}
		catch(e) {
			result = /*---------*/ '{}' /*---------*/;
		}

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	getInterfaceList: function(dst)
	{
		amiWebApp.lock();

		amiCommand.execute('SearchQuery -catalog="self" -entity="router_search_interface" -sql="SELECT `id`, `group`, `name`, `json`, `archived` FROM `router_search_interface` ORDER BY `group` ASC, `name` ASC"').done((data) => {

			const rows = amiWebApp.jspath('..row', data);

			const dict = {
				searchInterfaces: [],
			};

			rows.forEach((row) => {

				const id = amiWebApp.jspath('..field{.@name==="id"}.$', row)[0] || '';
				const group = amiWebApp.jspath('..field{.@name==="group"}.$', row)[0] || '';
				const name = amiWebApp.jspath('..field{.@name==="name"}.$', row)[0] || '';
				const json = amiWebApp.jspath('..field{.@name==="json"}.$', row)[0] || '';
				const archived = amiWebApp.jspath('..field{.@name==="archived"}.$', row)[0] || '';

				try
				{
					const searchInterface = {
						id: id,
						group: group,
						name: name,
						json: this._parseJson(json),
						archived: (archived !== '0'),
					};

					dict.searchInterfaces.push(searchInterface);

					this.searchInterfaces[id] = searchInterface;
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

				const field = amiWebApp.jspath('..field{.@name==="field"}.$', row)[0] || '';

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

		$('#A2C54F33_AC45_3553_86D6_4A479D10CD54').prop('checked', searchInterface.archived);

		$('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').data('editor').setValue(this._dumpJson(searchInterface.more));

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
			criteria: searchInterface.json.criteria,
		};

		amiWebApp.replaceHTML('#DD89D783_6F39_7B3B_3F3F_D875737A5E68', this.fragmentInput, {dict: dict}).done(() => {

			dict.criteria.forEach((criterion) => {

				this.getCatalogs('#E3ACBBAC_D452_5B9A_4926_D8FEE356CD63_' + this.cnt, criterion.catalog);

				if(criterion.catalog)
				{
					this.getEntities('#A4D2FD72_FF0A_3C87_B1CF_4A31331D3F8B_' + this.cnt, criterion.catalog, criterion.entity);

					if(criterion.entity)
					{
						this.getFields('#A45F0216_6C35_19F3_2CEC_103A8536914F_' + this.cnt, criterion.catalog, criterion.entity, criterion.field);

						if(criterion.type > 6)
						{
							this.getFields('#F83CE4BB_3851_3C40_242E_F7384C68A1A5_' + this.cnt, criterion.catalog, criterion.entity, criterion.key_field);
						}
					}
				}

				this.cnt++;
			});

			amiWebApp.unlock();
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	addCriterion: function(catalog, entity, field, criteria, isKeyVal)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		/*------------------------------------------------------------------------------------------------------------*/

		const dict = {
			cnt: this.cnt,
			criteria: criteria || [{type: isKeyVal ? 7 : 0}],
		};

		amiWebApp.appendHTML('#DD89D783_6F39_7B3B_3F3F_D875737A5E68', this.fragmentInput, {dict: dict}).done(() => {

			dict.criteria.forEach((criterion) => {

				this.getCatalogs('#E3ACBBAC_D452_5B9A_4926_D8FEE356CD63_' + this.cnt, catalog);

				if(catalog)
				{
					this.getEntities('#A4D2FD72_FF0A_3C87_B1CF_4A31331D3F8B_' + this.cnt, catalog, entity);

					if(entity)
					{
						this.getFields('#A45F0216_6C35_19F3_2CEC_103A8536914F_' + this.cnt, catalog, entity, field);

						if(criterion.type > 6)
						{
							this.getFields('#F83CE4BB_3851_3C40_242E_F7384C68A1A5_' + this.cnt, catalog, entity, field);
						}
					}
				}

				this.cnt++;
			});

			amiWebApp.unlock();
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	jsonToForm1: function(more)
	{
		$('#CECEF559_7DC7_1AE7_AE83_81C19AFB8A06').prop('checked', !!more.distinct);

		/* TODO */

		return more;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	formToJson1: function(more)
	{
		more.distinct = $('#CECEF559_7DC7_1AE7_AE83_81C19AFB8A06').prop('checked');

		/* TODO */

		return more;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	editOptions1: function()
	{
		$('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').val(
			this._dumpJson(
				this.formToJson1(
					this.jsonToForm1(
						this._parseJson(
							$('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').val()
						)
					)
				)
			)
		);

 		/**/

		$('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').data('editor').setValue($('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').val());

		$('#AAC55FA7_4919_DF1A_F194_30DF6435B539').modal('show');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	setOptions1: function()
	{
		$('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').val($('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').data('editor').getValue());

		$('#AAC55FA7_4919_DF1A_F194_30DF6435B539').modal('hide');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	jsonToForm2: function(more)
	{
		if('constraints' in more
		   &&
		   more.constraints !== null
		 ) {
			$('#F87B8D4A_BE3E_6C93_B432_9195DD1E5A15').val(more.constraints.join($('#C64EE3C9_DB38_DDA5_20C2_B3B2E8140637').val()));

			$('#F9931091_31DD_A960_2AD0_C08417FE8484').prop('checked', true);
		}
		else
		{
			$('#F87B8D4A_BE3E_6C93_B432_9195DD1E5A15').val(/*---------------------------*/ '@NULL' /*---------------------------*/);

			$('#F9931091_31DD_A960_2AD0_C08417FE8484').prop('checked', false);
		}

		if('init_value' in more
		   &&
		   more.init_value !== null
		 ) {
			$('#B302D100_DDD0_904F_5B50_E0E85FB0C4D3').val(more.init_value.join($('#B06166B2_2DE1_255D_7350_9C21370DB32F').val()));

			$('#F4570E3E_B4DB_42DE_3E10_6A44F04F2FA7').prop('checked', true);
		}
		else
		{
			$('#B302D100_DDD0_904F_5B50_E0E85FB0C4D3').val(/*---------------------------*/ '@NULL' /*---------------------------*/);

			$('#F4570E3E_B4DB_42DE_3E10_6A44F04F2FA7').prop('checked', false);
		}

		$('#C1788970_4C94_D98F_4199_5A185B4D97A3').val(more.min !== null ? more.min : '@NULL');
		$('#D580EF7E_AD6A_BC51_FFAB_41782CC3F2CF').val(more.max !== null ? more.max : '@NULL');
		$('#ED6493B8_63FC_96F1_48AA_F2D670E63836').val(more.off !== null ? more.off : '@NULL');
		$('#A6D9F53B_DCBF_96D2_8DCE_4EFAB0F46E33').val(more.on  !== null ? more.on  : '@NULL');

		$('#E3951FA5_8B76_3C9E_CFC2_EC3749451226').prop('checked', !!more.auto_open);
		$('#D6089F83_363A_F322_1E92_25567D89BD3B').prop('checked', !!more.inclusive);
		$('#B6671716_EA4E_E4A6_454B_79140FFC1532').prop('checked', !!more.simple_search);

		/*--*/ if(more.order === 'ASC') {
			$('#C1F5D43B_000E_F867_ABA5_13EA519F55CA').prop('checked', true);
		} else if(more.order === 'DESC') {
			$('#A10FF5C5_4D17_36BB_A18F_4E2C4EB05A3B').prop('checked', true);
		} else {
			$('#BB6ADE31_B629_DB15_9319_DAFAAD9999CF').prop('checked', true);
		}

		return more;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	formToJson2: function(more)
	{
		if($('#F9931091_31DD_A960_2AD0_C08417FE8484').prop('checked'))
		{
			const constraints = $('#F87B8D4A_BE3E_6C93_B432_9195DD1E5A15').val();

			if(constraints.toUpperCase() !== '@NULL')
			{
				more.constraints = constraints.split($('#C64EE3C9_DB38_DDA5_20C2_B3B2E8140637').val());
			}
			else
			{
				delete more.constraints;
			}
		}
		else
		{
			delete more.constraints;
		}

		if($('#F4570E3E_B4DB_42DE_3E10_6A44F04F2FA7').prop('checked'))
		{
			const init_value = $('#B302D100_DDD0_904F_5B50_E0E85FB0C4D3').val();

			if(init_value.toUpperCase() !== '@NULL')
			{
				more.init_value = init_value.split($('#B06166B2_2DE1_255D_7350_9C21370DB32F').val());
			}
			else
			{
				delete more.init_value;
			}
		}
		else
		{
			delete more.init_value;
		}

		const min = $('#C1788970_4C94_D98F_4199_5A185B4D97A3').val();
		if(min && min.toUpperCase() !== '@NULL') {
			more.min = min;
		} else {
			delete more.min;
		}

		const max = $('#D580EF7E_AD6A_BC51_FFAB_41782CC3F2CF').val();
		if(max && max.toUpperCase() !== '@NULL') {
			more.max = max;
		} else {
			delete more.max;
		}

		const off = $('#ED6493B8_63FC_96F1_48AA_F2D670E63836').val();
		if(off && off.toUpperCase() !== '@NULL') {
			more.off = off;
		} else {
			delete more.off;
		}

		const on = $('#A6D9F53B_DCBF_96D2_8DCE_4EFAB0F46E33').val();
		if(on && on.toUpperCase() !== '@NULL') {
			more.on = on;
		} else {
			delete more.on;
		}

		if(!$('#E3951FA5_8B76_3C9E_CFC2_EC3749451226').prop('disabled')) {
			more.  auto_open   = $('#E3951FA5_8B76_3C9E_CFC2_EC3749451226').prop('checked');
		}
		else {
			delete more.  auto_open  ;
		}

		if(!$('#D6089F83_363A_F322_1E92_25567D89BD3B').prop('disabled')) {
			more.  inclusive   = $('#D6089F83_363A_F322_1E92_25567D89BD3B').prop('checked');
		}
		else {
			delete more.  inclusive  ;
		}

		if(!$('#B6671716_EA4E_E4A6_454B_79140FFC1532').prop('disabled')) {
			more.simple_search = $('#B6671716_EA4E_E4A6_454B_79140FFC1532').prop('checked');
		}
		else {
			delete more.simple_search;
		}

		/*--*/ if($('#C1F5D43B_000E_F867_ABA5_13EA519F55CA').prop('checked')) {
			more.order = 'ASC';
		} else if($('#A10FF5C5_4D17_36BB_A18F_4E2C4EB05A3B').prop('checked')) {
			more.order = 'DESC';
		} else if($('#BB6ADE31_B629_DB15_9319_DAFAAD9999CF').prop('checked')) {
			delete more.order;
		}

		return more;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	editOptions2: function(inputCnt, inputType)
	{
		if(inputType === 2 || inputType === 3) {
			$('#C1788970_4C94_D98F_4199_5A185B4D97A3').prop('disabled', false);
			$('#D580EF7E_AD6A_BC51_FFAB_41782CC3F2CF').prop('disabled', false);
		}
		else {
			$('#C1788970_4C94_D98F_4199_5A185B4D97A3').prop('disabled', true);
			$('#D580EF7E_AD6A_BC51_FFAB_41782CC3F2CF').prop('disabled', true);
		}

		if(inputType === 4) {
			$('#D6089F83_363A_F322_1E92_25567D89BD3B').prop('disabled', false);
			$('#ED6493B8_63FC_96F1_48AA_F2D670E63836').prop('disabled', false);
			$('#A6D9F53B_DCBF_96D2_8DCE_4EFAB0F46E33').prop('disabled', false);
		}
		else {
			$('#D6089F83_363A_F322_1E92_25567D89BD3B').prop('disabled', true);
			$('#ED6493B8_63FC_96F1_48AA_F2D670E63836').prop('disabled', true);
			$('#A6D9F53B_DCBF_96D2_8DCE_4EFAB0F46E33').prop('disabled', true);
		}

		$('#C4AAADBC_C3B5_6DDC_851B_F06430CB4F6E_' + inputCnt).val(
			this._dumpJson(
				this.formToJson2(
					this.jsonToForm2(
						this._parseJson(
							$('#C4AAADBC_C3B5_6DDC_851B_F06430CB4F6E_' + inputCnt).val()
						)
					)
				)
			)
		);

 		/**/

		$('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').setValue($('#C4AAADBC_C3B5_6DDC_851B_F06430CB4F6E_' + inputCnt).val());

		$('#E78A17C0_799E_8E34_4986_322B9EA80D9F').modal('show');

		this.currentInputCnt = inputCnt;
		this.currentInputType = inputType;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	setOptions2: function(inputCnt)
	{
		$('#C4AAADBC_C3B5_6DDC_851B_F06430CB4F6E_' + inputCnt).val($('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').getValue());

		$('#E78A17C0_799E_8E34_4986_322B9EA80D9F').modal('hide');

		this.currentInputCnt = 0xFFFFFFFF;
		this.currentInputType = 0xFFFFFFFF;
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

	remove: function()
	{
		if(!confirm('Please confirm...'))
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

	save: function(mode) // 0: STD, 1: CLONE, 2: SHOW
	{
		if(mode !== 2)
		{
			if(!confirm('Please confirm...'))
			{
				return;
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		const group = this._trim($('#B08B0D55_227C_8AB2_DD3F_B9E783E606F8').val());
		const name = this._trim($('#BC4ABCC1_39F9_2020_4B64_0BC86DDA6B16').val());
		const defaultCatalog = this._trim($('#ECAE118F_BBFB_6F69_590F_C6F38611F8C3').val());
		const defaultEntity = this._trim($('#F71D1452_8613_5FB5_27D3_C1540573F450').val());
		const defaultPrimaryField = this._trim($('#BB89A473_0842_CB8F_E146_A6CCD8D3F15E').val());
		const archived = $('#A2C54F33_AC45_3553_86D6_4A479D10CD54').prop('checked') ? '1' : '0';
		const more = $('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').data('editor').getValue();

		const defaultCATALOG = this._trim(mode === 1 ? window.prompt('New default catalog', defaultCatalog) : defaultCatalog);

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
		const criteria = {};

		$('#FEC360FA_EC1D_90DC_FFD5_8A498CF60305').serializeArray().forEach((item) => {

			const parts = item.name.split('::');

			if(parts.length === 2)
			{
				const key1 = parts[1];
				const key2 = parts[0];

				if(!(key1 in criteria))
				{
					keys.push(key1);
					criteria[key1] = {};
				}

				/**/ if(key2 === 'type')
				{
					criteria[key1][key2] = parseInt(item.value);
				}
				else if(key2 === 'more')
				{
					criteria[key1][key2] = this._parseJson(item.value);
				}
				else
				{
					criteria[key1][key2] = (mode === 1 && key2 === 'catalog' && item.value === defaultCatalog) ? defaultCATALOG
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
			criteria: keys.map(key => criteria[key]),
		};

		if(mode === 2)
		{
			amiWebApp.createControl(null, null, 'textBox', [this._dumpJson(json)], {}).done(() => {

				amiWebApp.unlock();
			})
		}
		else
		{
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
		}

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

searchModelerApp = new SearchModelerApp();

/*--------------------------------------------------------------------------------------------------------------------*/
