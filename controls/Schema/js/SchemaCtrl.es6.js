/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global joint, saveAs
 *
 */

/*-------------------------------------------------------------------------*/

$AMIClass('SchemaCtrl', {
	/*---------------------------------------------------------------------*/

	$extends: ami.Control,

	/*---------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);
	},

	/*---------------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/Schema/twig/SchemaCtrl.twig',

			amiWebApp.originURL + '/js/3rd-party/filesaver.min.js',
			/**/
			amiWebApp.originURL + '/js/3rd-party/jointjs/lodash.min.js',
			amiWebApp.originURL + '/js/3rd-party/jointjs/backbone-min.js',
			/**/
			amiWebApp.originURL + '/css/3rd-party/jointjs/joint.min.css',
			amiWebApp.originURL + '/js/3rd-party/jointjs/joint.min.js',
			/**/
			amiWebApp.originURL + '/controls/Schema/js/joint.shapes.sql.js',
			/**/
			amiWebApp.originURL + '/js/3rd-party/codemirror/lib/codemirror.css',
			amiWebApp.originURL + '/js/3rd-party/codemirror/lib/codemirror.js',
			amiWebApp.originURL + '/js/3rd-party/codemirror/addon/edit/matchbrackets.js',
			amiWebApp.originURL + '/js/3rd-party/codemirror/mode/groovy/groovy.js',
			/**/
			amiWebApp.originURL + '/controls/Schema/css/SchemaCtrl.css',
		]).done((data) => {

			amiWebApp.appendHTML('body', data[0]).done(() => {

				/*---------------------------------------------------------*/

				this._fields = null;
				this._foreignKeys = null;

				this._currentCell = null;
				this._currentCatalog = null;

				/*---------------------------------------------------------*/

				let cnt = 0;

				$('#B0BEB5C7_8978_7433_F076_A55D2091777C').on('shown.bs.modal', () => {

					if(cnt++ === 0)
					{
						CodeMirror.fromTextArea(document.getElementById('E4FE4DF4_F171_1467_07ED_8BB7E0FFC15F'), {
							lineNumbers: true,
							matchBrackets: true,
							mode: 'text/x-groovy',
						});
					}
				});

				/*---------------------------------------------------------*/
			});
		});
	},

	/*---------------------------------------------------------------------*/

	render: function(selector, settings)
	{
		/*-----------------------------------------------------------------*/

		const [_onFocus, _onBlur] = amiWebApp.setup(
			['onFocus', 'onBlur'],
			[null, null],
			settings
		);

		this._onFocus = _onFocus;
		this._onBlur = _onBlur;

		/*-----------------------------------------------------------------*/

		let el1 = $(this._selector = selector);

		el1.css('box-shadow', '0px 1px 0px rgba(255, 255, 255, 0.15) inset, 0 1px 5px rgba(0, 0, 0, 0.075)');
		el1.css('border', '1px solid rgb(231, 231, 231)');
		el1.css('border-radius', '4px');
		el1.css('overflow-x', 'scroll');
		el1.css('overflow-y', 'scroll');
		el1.css('padding', '10px');

		/*-----------------------------------------------------------------*/

		let el2 = $('<div class="ami-schema"></div>').appendTo(el1);

		/*-----------------------------------------------------------------*/

		this.graph = new joint.dia.Graph();

		this.paper = new joint.dia.Paper({
			model: this.graph,
			el: el2,
			width: 1,
			height: 1,
			gridSize: 5.0,
			drawGrid: {
				name: 'dot',
				args: [
					{color: 'red', scaleFactor: 2, thickness: 1},
				]
			}
		});

		/*-----------------------------------------------------------------*/

		this.paper.on({
			'cell:pointerclick': (cellView) => {

				$('g[model-id]').removeClass('ami-schema-shadow').filter('[model-id="' + cellView.model.id + '"]').addClass('ami-schema-shadow');

				this._currentCell = cellView.model;

				if(this._onFocus) {
					this._onFocus(this._currentCell);
				}
			},
			'blank:pointerdown': (cellView) => {

				$('g[model-id]').removeClass('ami-schema-shadow')/*---------------------------------------------------------------------------*/;

				if(this._onBlur) {
					this._onBlur(this._currentCell);
				}

				this._currentCell = /*-*/null/*-*/;
			}
		});

		/*-----------------------------------------------------------------*/

		return this.refresh(null, settings);

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	fitToContent: function()
	{
		this.paper.fitToContent({
			padding: 10,
			gridWidth: 10,
			gridHeight: 10,
			minWidth: this._width,
			minHeight: this._height,
		});
	},

	/*---------------------------------------------------------------------*/

	_refresh: function(result, catalog, settings)
	{
		this._currentCatalog = catalog;

		const [context, _width, _height, _showShowTool, _showEditTool] = amiWebApp.setup(
			['context', 'width', 'height', 'showShowTool', 'showEditTool'],
			[result, 2000, 2000, false, false],
			settings
		);

		this._width = _width;
		this._height = _height;

		this._showShowTool = _showShowTool;
		this._showEditTool = _showEditTool;

		/*-----------------------------------------------------------------*/

		if(!catalog)
		{
			result.resolveWith(context, [null]);

			return;
		}

		/*-----------------------------------------------------------------*/

		this.graph.clear();

		/*-----------------------------------------------------------------*/

		amiCommand.execute('GetJSONSchema -catalog="' + amiWebApp.textToString(catalog) + '"').done((data) => {

			/*-------------------------------------------------------------*/
			/* GET SCHEMA                                                  */
			/*-------------------------------------------------------------*/

			let schema;

			try
			{
				schema = JSON.parse(amiWebApp.jspath('..field{.@name==="json"}.$', data)[0] || '{}');
			}
			catch(e)
			{
				schema = {/*---------------------------------------------------------------------*/};
			}

			/*-------------------------------------------------------------*/
			/* GET COLUMNS                                                 */
			/*-------------------------------------------------------------*/

			let cnt = 0;

			let entities = {};

			this._fields.forEach((value) => {

				if((amiWebApp.jspath('..field{.@name==="externalCatalog"}.$', value)[0] || '') === catalog)
				{
					const entity = amiWebApp.jspath('..field{.@name==="entity"}.$', value)[0] || '';
					const field = amiWebApp.jspath('..field{.@name==="field"}.$', value)[0] || '';
					const type = amiWebApp.jspath('..field{.@name==="type"}.$', value)[0] || '';
					const hidden = amiWebApp.jspath('..field{.@name==="hidden"}.$', value)[0] || '';
					const adminOnly = amiWebApp.jspath('..field{.@name==="adminOnly"}.$', value)[0] || '';
					const crypted = amiWebApp.jspath('..field{.@name==="crypted"}.$', value)[0] || '';
					const primary = amiWebApp.jspath('..field{.@name==="primary"}.$', value)[0] || '';
					const created = amiWebApp.jspath('..field{.@name==="created"}.$', value)[0] || '';
					const createdBy = amiWebApp.jspath('..field{.@name==="createdBy"}.$', value)[0] || '';
					const modified = amiWebApp.jspath('..field{.@name==="modified"}.$', value)[0] || '';
					const modifiedBy = amiWebApp.jspath('..field{.@name==="modifiedBy"}.$', value)[0] || '';

					if(!(entity in entities))
					{
						let x;
						let y;
						let color;

						if(!(entity in schema))
						{
							x = y
							  = 20 + 10 * cnt++;
							color = '#0066CC';
						}
						else
						{
							x = schema[entity].x;
							y = schema[entity].y;
							color = schema[entity].color;
						}

						entities[entity] = {
							entity: this.graph.newEntity({
								position: {
									x: x,
									y: y,
								},
								entity: entity,
								color: color,
								showShowTool: this._showShowTool,
								showEditTool: this._showEditTool,
							}),
							fields: [],
						};
					}

					if(!(field in entities[entity]['fields']))
					{
						entities[entity]['entity'].appendField({
							field: field,
							type: type,
							hidden: hidden === 'true',
							adminOnly: adminOnly === 'true',
							crypted: crypted === 'true',
							primary: primary === 'true',
							created: created === 'true',
							createdBy: createdBy === 'true',
							modified: modified === 'true',
							modifiedBy: modifiedBy === 'true',
						});
					}
				}
			});

			/*-------------------------------------------------------------*/

			$(this._selector + ' a.sql-entity-show-link').click((e) => {

				e.preventDefault();

				this.showEntity(
					catalog
					,
					$(e.currentTarget).attr('data-entity')
				);
			});

			/*-------------------------------------------------------------*/

			$(this._selector + ' a.sql-entity-edit-link').click((e) => {

				e.preventDefault();

				this.editEntity(
					catalog
					,
					$(e.currentTarget).attr('data-entity')
				);
			});

			/*-------------------------------------------------------------*/

			$(this._selector + ' a.sql-field-link').click((e) => {

				e.preventDefault();

				this.editField(
					catalog
					,
					$(e.currentTarget).attr('data-entity')
					,
					$(e.currentTarget).attr('data-field')
				);
			});

			/*-------------------------------------------------------------*/
			/* GET FKEYS                                                   */
			/*-------------------------------------------------------------*/

			this._foreignKeys.forEach((value) => {

				if(amiWebApp.jspath('..field{.@name==="fkExternalCatalog"}.$', value)[0] === catalog
				   &&
				   amiWebApp.jspath('..field{.@name==="pkExternalCatalog"}.$', value)[0] === catalog
				 ) {
					const fkEntity = amiWebApp.jspath('..field{.@name==="fkEntity"}.$', value)[0];
					const pkEntity = amiWebApp.jspath('..field{.@name==="pkEntity"}.$', value)[0];

					this.graph.newForeignKey(
						entities[fkEntity]['entity'].get('id'),
						entities[pkEntity]['entity'].get('id')
					);
				}
			});

			/*-------------------------------------------------------------*/
			/* FIT TO CONTENT                                              */
			/*-------------------------------------------------------------*/

			this.fitToContent();

			/*-------------------------------------------------------------*/

			result.resolveWith(context, [schema]);

		}).fail((data, message) => {

			result.rejectWith(context, [message]);
		});
	},

	/*---------------------------------------------------------------------*/

	refresh: function(catalog, settings)
	{
		let result = $.Deferred();

		if(this._fields
		   &&
		   this._foreignKeys
		 ) {
			this._refresh(result, catalog, settings);
		}
		else
		{
			amiCommand.execute('GetSchemas').always((data) => {

				this._fields = amiWebApp.jspath('..rowset{.@type==="fields"}.row', data) || [];
				this._foreignKeys = amiWebApp.jspath('..rowset{.@type==="foreignKeys"}.row', data) || [];

				this._refresh(result, catalog, settings);
			});
		}

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	clear: function()
	{
		this.graph.clear();

		this.paper.setDimensions(1, 1);
	},

	/*---------------------------------------------------------------------*/

	getCurrentCell: function()
	{
		return this._currentCell;
	},

	/*---------------------------------------------------------------------*/

	setJSON: function(json)
	{
		this.graph.fromJSON(json);

		this.fitToContent();
	},

	/*---------------------------------------------------------------------*/

	getJSON: function()
	{
		this.fitToContent();

		return this.graph.toJSON();
	},

	/*---------------------------------------------------------------------*/

	exportSchema: function()
	{
		try
		{
			const json = JSON.stringify(this.getJSON(), null, 4);

			let blob = new Blob([json], {
				type: 'application/json',
				endings : 'native',
			});

			saveAs(blob, 'schema.json');
		}
		catch(e)
		{
			amiWebApp.error(e, true);
		}
	},

	/*---------------------------------------------------------------------*/

	printSchema: function()
	{
		/*-----------------------------------------------------------------*/

		let svg = $(this._selector + ' svg');

		/*-----------------------------------------------------------------*/

		let w = window.open('', '', 'height=' + svg.height() + ', width=' + svg.width() + ', toolbar=no');

		w.document.write('<html><head><style>body { margin: 10px; } .link-tools, .marker-vertices, .marker-arrowheads, .connection-wrap, .sql-entity-link { display: none; } .connection { fill: none; }</style></head><body>' + $('#C6DDFAF6_9E75_41C5_87BD_0896B5299559').html() + '</body></html>');

		$(w.document).find('svg').css('background-image', 'none');

		w.print();
		w.close();

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	showEntity: function(catalog, entity)
	{
		window.open(amiWebApp.webAppURL + '?subapp=tableViewer&userdata=' + encodeURIComponent('{"catalog": "' + amiWebApp.textToString(catalog) + '", "entity": "' + amiWebApp.textToString(entity) + '"}'), '_blank').focus();
	},

	/*---------------------------------------------------------------------*/

	editEntity: function(catalog, entity)
	{
		window.open(amiWebApp.webAppURL + '?subapp=adminDashboard&userdata=catalogs', '_blank').focus();
	},

	/*---------------------------------------------------------------------*/

	editField: function(catalog, entity, field)
	{
		if(amiLogin.hasRole('AMI_ADMIN') === false)
		{
			return;
		}

		amiCommand.execute('GetFieldInfo -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -field="' + amiWebApp.textToString(field) + '"').done((data) => {

			$('#A1AA5034_F183_9365_2D09_DF80F1775C95').text(catalog);
			$('#C52644CB_45E9_586E_DF23_38DD69147735').text(entity);
			$('#DE6E9DB2_BFED_1783_A6F7_D8CAAFFEFDD0').text(field);

			$('#C78B630C_9805_7D15_C14F_4C7C276E9E2C').val(catalog);
			$('#B495FF2B_45A2_F3CA_C810_55FC054872D2').val(entity);
			$('#C3E221A6_6B33_6A52_B7D1_57CB0228BB07').val(field);

			/**/

			const rank = amiWebApp.jspath('..field{.@name==="rank"}.$', data)[0] || '999';
			const description = amiWebApp.jspath('..field{.@name==="description"}.$', data)[0] || 'N/A';
			const webLinkScript = amiWebApp.jspath('..field{.@name==="webLinkScript"}.$', data)[0] || '@NULL';

			const adminOnly = amiWebApp.jspath('..field{.@name==="adminOnly"}.$', data)[0] || 'false';
			const hidden = amiWebApp.jspath('..field{.@name==="hidden"}.$', data)[0] || 'false';
			const crypted = amiWebApp.jspath('..field{.@name==="crypted"}.$', data)[0] || 'false';
			const primary = amiWebApp.jspath('..field{.@name==="primary"}.$', data)[0] || 'false';

			const created = amiWebApp.jspath('..field{.@name==="created"}.$', data)[0] || 'false';
			const createdBy = amiWebApp.jspath('..field{.@name==="createdBy"}.$', data)[0] || 'false';
			const modified = amiWebApp.jspath('..field{.@name==="modified"}.$', data)[0] || 'false';
			const modifiedBy = amiWebApp.jspath('..field{.@name==="modifiedBy"}.$', data)[0] || 'false';

			const statable = amiWebApp.jspath('..field{.@name==="statable"}.$', data)[0] || 'false';
			const groupable = amiWebApp.jspath('..field{.@name==="groupable"}.$', data)[0] || 'false';

			$('#C6CA88FD_548A_FE30_9871_AFE55362439B').val(rank);
			$('#E9801316_0EC6_D6F2_0BC9_E1E1DC3ABA00').val(description);
			$('#E4FE4DF4_F171_1467_07ED_8BB7E0FFC15F').val(webLinkScript);

			$('#F82C7F86_1260_D5B1_4CBF_EE519415B3FD').prop('checked', adminOnly === 'true');
			$('#DEA15A0F_5EBF_49E7_3E75_F29850184968').prop('checked', hidden === 'true');
			$('#E2D8A4EB_1065_01B5_C8DB_7B2E01F03AD4').prop('checked', crypted === 'true');
			$('#A4F33332_8DDD_B235_F523_6A35B902519C').prop('checked', primary === 'true');

			$('#BC7E5CA1_09C8_BB5C_20E2_C0CFE3204224').prop('checked', created === 'true');
			$('#FB998C28_1E59_12A0_1B34_2C2C0A44A6AD').prop('checked', createdBy === 'true');
			$('#AADC020E_E1CB_BA8E_E870_27B63666C988').prop('checked', modified === 'true');
			$('#FACFE443_72F3_8917_2F08_934D88E55DDC').prop('checked', modifiedBy === 'true');

			$('#F26C0D3D_B516_06EA_90F6_0E3B17D2AF5D').prop('checked', statable === 'true');
			$('#BA08505D_C468_5602_9745_12369E1F6318').prop('checked', groupable === 'true');

			/**/

			$('#B0BEB5C7_8978_7433_F076_A55D2091777C').modal('show');

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/

SchemaCtrl.reset = function()
{
	/*---------------------------------------------------------------------*/

	if(!confirm('Please confirm...'))
	{
		return;
	}

	/*---------------------------------------------------------------------*/

	amiWebApp.lock();

	/*---------------------------------------------------------------------*/

	amiCommand.execute('RemoveElements -separator="|" -catalog="self" -entity="router_catalog_extra" -keyFields="catalog|entity|field" -keyValues="' + amiWebApp.textToString($('#C78B630C_9805_7D15_C14F_4C7C276E9E2C').val()) + '|' + amiWebApp.textToString($('#B495FF2B_45A2_F3CA_C810_55FC054872D2').val()) + '|' + amiWebApp.textToString($('#C3E221A6_6B33_6A52_B7D1_57CB0228BB07').val()) + '"').done((data, message) => {

		amiCommand.execute('FlushServerCaches').done(() => {

			$('#B0BEB5C7_8978_7433_F076_A55D2091777C').modal('hide');

			amiWebApp.success(message + ', please reload the page', true /*---------*/);

		}).fail((data, message) => {

			amiWebApp.error(message, true, '#F7A1EF6C_34F4_9A58_EEAD_F0DB92DCB886');
		});

	}).fail((data, message) => {

		amiWebApp.error(message, true, '#F7A1EF6C_34F4_9A58_EEAD_F0DB92DCB886');
	});

	/*---------------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

SchemaCtrl.apply = function()
{
	/*---------------------------------------------------------------------*/

	if(!confirm('Please confirm...'))
	{
		return;
	}

	/*---------------------------------------------------------------------*/

	amiCommand.execute('RemoveElements -separator="|" -catalog="self" -entity="router_catalog_extra" -keyFields="catalog|entity|field" -keyValues="' + amiWebApp.textToString($('#C78B630C_9805_7D15_C14F_4C7C276E9E2C').val()) + '|' + amiWebApp.textToString($('#B495FF2B_45A2_F3CA_C810_55FC054872D2').val()) + '|' + amiWebApp.textToString($('#C3E221A6_6B33_6A52_B7D1_57CB0228BB07').val()) + '"').done((data, message) => {

		amiCommand.execute(/**/'AddElement -separator="|" -catalog="self" -entity="router_catalog_extra" -fields="catalog|entity|field|rank|description|webLinkScript|isHidden|isAdminOnly|isCrypted|isPrimary|isCreated|isCreatedBy|isModified|isModifiedBy|isStatable|isGroupable" -values="' + amiWebApp.textToString($('#C78B630C_9805_7D15_C14F_4C7C276E9E2C').val()) + '|' + amiWebApp.textToString($('#B495FF2B_45A2_F3CA_C810_55FC054872D2').val()) + '|' + amiWebApp.textToString($('#C3E221A6_6B33_6A52_B7D1_57CB0228BB07').val()) + '|' + amiWebApp.textToString($('#C6CA88FD_548A_FE30_9871_AFE55362439B').val()) + '|' + amiWebApp.textToString($('#E9801316_0EC6_D6F2_0BC9_E1E1DC3ABA00').val()) + '|' + amiWebApp.textToString($('#E4FE4DF4_F171_1467_07ED_8BB7E0FFC15F').val()) + '|' + ($('#F82C7F86_1260_D5B1_4CBF_EE519415B3FD').prop('checked') ? '1' : '0') + '|' + ($('#DEA15A0F_5EBF_49E7_3E75_F29850184968').prop('checked') ? '1' : '0') + '|' + ($('#E2D8A4EB_1065_01B5_C8DB_7B2E01F03AD4').prop('checked') ? '1' : '0') + '|' + ($('#A4F33332_8DDD_B235_F523_6A35B902519C').prop('checked') ? '1' : '0') + '|' + ($('#BC7E5CA1_09C8_BB5C_20E2_C0CFE3204224').prop('checked') ? '1' : '0') + '|' + ($('#FB998C28_1E59_12A0_1B34_2C2C0A44A6AD').prop('checked') ? '1' : '0') + '|' + ($('#AADC020E_E1CB_BA8E_E870_27B63666C988').prop('checked') ? '1' : '0') + '|' + ($('#FACFE443_72F3_8917_2F08_934D88E55DDC').prop('checked') ? '1' : '0') + '|' + ($('#F26C0D3D_B516_06EA_90F6_0E3B17D2AF5D').prop('checked') ? '1' : '0') + '|' + ($('#BA08505D_C468_5602_9745_12369E1F6318').prop('checked') ? '1' : '0') + '"').done((data, message) => {

			amiCommand.execute('FlushServerCaches').done(() => {

				$('#B0BEB5C7_8978_7433_F076_A55D2091777C').modal('hide');

				amiWebApp.success(message + ', please reload the page', true /*---------*/);

			}).fail((data, message) => {

				amiWebApp.error(message, true, '#F7A1EF6C_34F4_9A58_EEAD_F0DB92DCB886');
			});

		}).fail((data, message) => {

			amiWebApp.error(message, true, '#F7A1EF6C_34F4_9A58_EEAD_F0DB92DCB886');
		});

	}).fail((data, message) => {

		amiWebApp.error(message, true, '#F7A1EF6C_34F4_9A58_EEAD_F0DB92DCB886');
	});

	/*---------------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
