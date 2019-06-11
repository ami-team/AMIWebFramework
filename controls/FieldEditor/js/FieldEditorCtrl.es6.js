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

/*-------------------------------------------------------------------------*/

const _fieldEditor_internal_numberRegex = /^.*(?:BIT|INT|FLOAT|DOUBLE|SERIAL|DECIMAL|NUMBER).*$/;
const _fieldEditor_internal_timestampRegex = /^.*(?:TIMESTAMP).*$/;
const _fieldEditor_internal_datetimeRegex = /^.*(?:DATETIME).*$/;
const _fieldEditor_internal_dateRegex = /^.*(?:DATE).*$/;
const _fieldEditor_internal_timeRegex = /^.*(?:TIME).*$/;
const _fieldEditor_internal_textRegex = /^.*(?:TEXT|CLOB|BLOB).*$/;

/*-------------------------------------------------------------------------*/

amiTwig.stdlib.getSQLType = function(rawType)
{
	/**/ if(rawType.match(_fieldEditor_internal_numberRegex)) {
		return 'NUMBER';
	}
	else if(rawType.match(_fieldEditor_internal_timestampRegex)) {
		return 'TIMESTAMP';
	}
	else if(rawType.match(_fieldEditor_internal_datetimeRegex)) {
		return 'DATETIME';
	}
	else if(rawType.match(_fieldEditor_internal_dateRegex)) {
		return 'DATE';
	}
	else if(rawType.match(_fieldEditor_internal_timeRegex)) {
		return 'TIME';
	}
	else if(rawType.match(_fieldEditor_internal_textRegex)) {
		return 'LONG_TEXT';
	}
	else 	{
		return 'SHORT_TEXT';
	}
}

/*-------------------------------------------------------------------------*/

$AMIClass('FieldEditorCtrl', {
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
			amiWebApp.originURL + '/controls/FieldEditor/twig/FieldEditorCtrl.twig',
			amiWebApp.originURL + '/controls/FieldEditor/twig/fieldList.twig',
		]).done((data) => {

			amiWebApp.appendHTML('body', data[0]).done(() => {

				this.fragmentFieldList = data[1];

				this.cache = {};
			});
		});
	},

	/*---------------------------------------------------------------------*/

	getInfo: function(primaryCatalog, primaryEntity, primaryField)
	{
		const result = $.Deferred();

		/*-----------------------------------------------------------------*/

		const key = primaryCatalog + '$' + primaryEntity;

		if(key in this.cache)
		{
			return result.resolve(
				this.cache[key].primaryField
				,
				this.cache[key].fieldInfo
			);
		}

		/*-----------------------------------------------------------------*/

		const fieldInfo = [];

		amiCommand.execute('GetEntityInfo -catalog="' + amiWebApp.textToString(primaryCatalog) + '" -entity="' + amiWebApp.textToString(primaryEntity) + '"').done((data) => {

			const rows = amiWebApp.jspath('..{.@type==="fields"}.row', data);

			for(let i in rows)
			{
				/*---------------------------------------------------------*/

				const field = amiWebApp.jspath('..field{.@name==="field"}.$', rows[i])[0] || '';
				const type = amiWebApp.jspath('..field{.@name==="type"}.$', rows[i])[0] || '';
				const def = amiWebApp.jspath('..field{.@name==="def"}.$', rows[i])[0] || '';

				const primary = amiWebApp.jspath('..field{.@name==="primary"}.$', rows[i])[0] || '';
				const created = amiWebApp.jspath('..field{.@name==="created"}.$', rows[i])[0] || '';
				const createdBy = amiWebApp.jspath('..field{.@name==="createdBy"}.$', rows[i])[0] || '';
				const modified = amiWebApp.jspath('..field{.@name==="modified"}.$', rows[i])[0] || '';
				const modifiedBy = amiWebApp.jspath('..field{.@name==="modifiedBy"}.$', rows[i])[0] || '';

				/*---------------------------------------------------------*/

				if(primary === 'true')
				{
					primaryField = field;
				}

				/*---------------------------------------------------------*/

				if(created !== 'true'
				   &&
				   createdBy !== 'true'
				   &&
				   modified !== 'true'
				   &&
				   modifiedBy !== 'true'
				 ) {
					fieldInfo.push({
						field: field,
						type: type,
						def: def,
					});
				}

				/*---------------------------------------------------------*/
			}

			result.resolve(primaryField, fieldInfo);

		}).fail(() => {

			result.resolve(primaryField, fieldInfo);
		});

		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/

	getValues: function(primaryCatalog, primaryEntity, primaryField, primaryValue)
	{
		const result = $.Deferred();

		/*-----------------------------------------------------------------*/

		const values = {};

		amiCommand.execute('SearchQuery -catalog="' + amiWebApp.textToString(primaryCatalog) + '" -entity="' + amiWebApp.textToString(primaryEntity) + '" -mql="SELECT * WHERE `' + amiWebApp.textToString(primaryField) + '` = \'' + amiWebApp.textToString(primaryValue) + '\'"').done((data) => {

			const fields = amiWebApp.jspath('..{.@type==="query"}..field', data);

			for(let i in fields)
			{
				values[fields[i]['@name']] = fields[i]['$'];
			}

			result.resolve(values);

		}).fail(() => {

			result.resolve(values);
		});

		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/

	setup: function(selector, settings)
	{
		/*-----------------------------------------------------------------*/

		const fn1 = (catalog, entity, fields, values) =>
			(('AddElement')) + ' -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -separator="§" -fields="' + amiWebApp.textToString(fields.join('§')) + '" -values="' + amiWebApp.textToString(values.join('§')) + '"'
		;

		const fn2 = (catalog, entity, fields, values, primaryFields, primaryValues) =>
			'UpdateElements' + ' -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -separator="§" -fields="' + amiWebApp.textToString(fields.join('§')) + '" -values="' + amiWebApp.textToString(values.join('§')) + '" -keyFields="' + amiWebApp.textToString(primaryFields.join('§')) + '" -keyValues="' + amiWebApp.textToString(primaryValues.join('§')) + '"'
		;

		const fn3 = (catalog, entity, primaryFields, primaryValues) =>
			'RemoveElements' + ' -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -separator="§" -keyFields="' + amiWebApp.textToString(primaryFields.join('§')) + '" -keyValues="' + amiWebApp.textToString(primaryValues.join('§')) + '"'
		;

		/*-----------------------------------------------------------------*/

		const [appendCommandFunc, updateCommandFunc, removeCommandFunc] = amiWebApp.setup(
			['appendCommandFunc', 'updateCommandFunc', 'removeCommandFunc'],
			[fn1, fn2, fn3],
			settings
		);

		/*-----------------------------------------------------------------*/

		this.ctx = {
			inEditMode: false,

			appendCommandFunc: appendCommandFunc,
			updateCommandFunc: updateCommandFunc,
			removeCommandFunc: removeCommandFunc,
		};

		/*-----------------------------------------------------------------*/

		this.el = $(selector);

		/*-----------------------------------------------------------------*/

		this.el.find('div[data-action="edit-row"]').click((e) => {

			e.preventDefault();

			if(this.ctx.inEditMode)
			{
				this.showFieldModal(
					e.currentTarget.getAttribute('data-primary-catalog')
					,
					e.currentTarget.getAttribute('data-primary-entity')
					,
					e.currentTarget.getAttribute('data-primary-field')
					,
					e.currentTarget.getAttribute('data-primary-value')
					,
					e.currentTarget.getAttribute('data-catalog')
					,
					e.currentTarget.getAttribute('data-entity')
					,
					e.currentTarget.getAttribute('data-field')
					,
					e.currentTarget.getAttribute('data-value')
					,
					e.currentTarget.getAttribute('data-type')
				);
			}
		});

		/*-----------------------------------------------------------------*/

		this.el.find('[data-action="clone-row"]').click((e) => {

			e.preventDefault();

			if(this.ctx.inEditMode)
			{
				this.showRowModal(
					e.currentTarget.getAttribute('data-catalog')
					,
					e.currentTarget.getAttribute('data-entity')
					,
					e.currentTarget.getAttribute('data-primary-field')
					,
					e.currentTarget.getAttribute('data-primary-value')
				);
			}
		});

		/*-----------------------------------------------------------------*/

		this.el.find('[data-action="delete-row"]').click((e) => {

			e.preventDefault();

			if(this.ctx.inEditMode)
			{
				this.removeRow(
					e.currentTarget.getAttribute('data-catalog')
					,
					e.currentTarget.getAttribute('data-entity')
					,
					[e.currentTarget.getAttribute('data-primary-field')]
					,
					[e.currentTarget.getAttribute('data-primary-value')]
				);
			}
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	isInEditMode: function()
	{
		return this.ctx.inEditMode();
	},

	/*---------------------------------------------------------------------*/

	setInEditMode: function(inEditMode)
	{
		if(inEditMode) {
			this.el.removeClass('unit-edit');
		}
		else {
			this.el.addClass('unit-edit');
		}

		this.ctx.inEditMode = inEditMode;
	},

	/*---------------------------------------------------------------------*/

	changeFormInputType: function(selector, sqlType)
	{
		$(selector).replaceWith(function() {

			/*-------------------------------------------------------------*/

			let result;

			const id = selector.substring(1);

			/**/ if(sqlType === '@NULL') {
				result = $('<input class="form-control form-control-sm" type="text" id="' + id + '" readonly="readonly" />');
			}
			else if(sqlType === 'NUMBER') {
				result = $('<input class="form-control form-control-sm" type="number" id="' + id + '" step="any" />');
			}
			else if(sqlType === 'TIMESTAMP') {
				result = $('<input class="form-control form-control-sm" type="text" id="' + id + '" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]*" />');
			}
			else if(sqlType === 'DATETIME') {
				result = $('<input class="form-control form-control-sm" type="text" id="' + id + '" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]*" />');
			}
			else if(sqlType === 'DATE') {
				result = $('<input class="form-control form-control-sm" type="text" id="' + id + '" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />');
			}
			else if(sqlType === 'TIME') {
				result = $('<input class="form-control form-control-sm" type="text" id="' + id + '" pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]*" />');
			}
			else if(sqlType === 'LONG_TEXT') {
				result = $('<textarea class="form-control form-control-sm" rows="6" id="' + id + '"></textarea>');
			}
			else if(sqlType === 'SHORT_TEXT') {
				result = $('<input class="form-control form-control-sm" type="text" id="' + id + '" />');
			}

			/*-------------------------------------------------------------*/

			return result.val(sqlType !== '@NULL' ? $(selector).val() : '@NULL');

			/*-------------------------------------------------------------*/
		});
	},

	/*---------------------------------------------------------------------*/

	showFieldModal: function(primaryCatalog, primaryEntity, primaryField, primaryValue, catalog, entity, field, value, type)
	{
		/*-----------------------------------------------------------------*/

		const values = {};

		if(primaryCatalog === catalog
		   &&
		   primaryEntity === entity
		 ) {
			values[field] = value;
		}
		else {
			return;
		}

		/*-----------------------------------------------------------------*/

		this.getInfo(primaryCatalog, primaryEntity, primaryField).done((primaryField, fieldInfo) => {

			/*-------------------------------------------------------------*/

			const dict = {
				primaryField: primaryField,
				fieldInfo: fieldInfo,
				values: values,
				filter: field,
			};

			amiWebApp.replaceHTML('#C2C43049_4CD6_73C3_597B_F0399A220610', this.fragmentFieldList, {dict: dict}).done(() => {

				/*---------------------------------------------------------*/

				const el1 = $('#F44687A3_036C_9C77_3284_DD495D9F4D7D');
				const el2 = $('#D3CE601F_C7BA_5C8E_2564_491FED4C5D6F');
				const el3 = $('#C2C43049_4CD6_73C3_597B_F0399A220610');

				/*---------------------------------------------------------*/

				el2.text(catalog + '.' + entity + '.' + primaryField + ' = ' + primaryValue);

				/*---------------------------------------------------------*/

				el3.find('[data-action="changesqltype"]').click((e) => {

					e.preventDefault();

					$(e.currentTarget).closest('.nav-tabs').find('.nav-link,.dropdown-item').removeClass('active');
					$(e.currentTarget).closest('.nav-item').find('.nav-link').addClass('active');
					$(e.currentTarget).addClass('active');

					this.changeFormInputType(
						e.currentTarget.getAttribute('href')
						,
						e.currentTarget.getAttribute('data-sql-type')
					);
				});

				/*---------------------------------------------------------*/

				el3.off().on('submit', (e) => {

					/*-----------------------------------------------------*/

					e.preventDefault();

					/*-----------------------------------------------------*/

<<<<<<< HEAD
					const value = el3.find(':input').val();
=======
					const value = el3.find('.show > :input').val();
>>>>>>> ff442b44e12a2632c97212b03223ac6d01da9000

					/*-----------------------------------------------------*/

					this.updateRow(catalog, entity, [field], [value], [primaryField], [primaryValue]);

					/*-----------------------------------------------------*/
				});

				/*---------------------------------------------------------*/

				el1.modal('show');

				/*---------------------------------------------------------*/
			});

			/*-------------------------------------------------------------*/
		});
	},

	/*---------------------------------------------------------------------*/

	showRowModal: function(primaryCatalog, primaryEntity, primaryField, primaryValue)
	{
		this.getInfo(primaryCatalog, primaryEntity, primaryField).done((primaryField, fieldInfo) => {

			this.getValues(primaryCatalog, primaryEntity, primaryField, primaryValue).done((values) => {

				const dict = {
					primaryField: primaryField,
					fieldInfo: fieldInfo,
					values: values,
					filter: '',
				};

				amiWebApp.replaceHTML('#F2E58136_73F5_D2E2_A0B7_2F810830AD98', this.fragmentFieldList, {dict: dict}).done(() => {

					/*-----------------------------------------------------*/

					const el1 = $('#A8572167_6898_AD6F_8EAD_9D4E2AEB3550');
					const el2 = $('#E44B299D_96B3_9C00_C91C_555C549BF87B');
					const el3 = $('#F2E58136_73F5_D2E2_A0B7_2F810830AD98');

					/*-----------------------------------------------------*/

					el2.text(primaryCatalog + '.' + primaryEntity);

					/*-----------------------------------------------------*/

					el3.find('[data-action="changesqltype"]').click((e) => {

						e.preventDefault();

						$(e.currentTarget).closest('.nav-tabs').find('.nav-link,.dropdown-item').removeClass('active');
						$(e.currentTarget).closest('.nav-item').find('.nav-link').addClass('active');
						$(e.currentTarget).addClass('active');

						this.changeFormInputType(
							e.currentTarget.getAttribute('href')
							,
							e.currentTarget.getAttribute('data-sql-type')
						);
					});

					/*-----------------------------------------------------*/

					el3.off().submit((e) => {

						/*-------------------------------------------------*/

						e.preventDefault();

						/*-------------------------------------------------*/

						const fields = [];
						const values = [];

						const form = el3.serializeArray();

						for(let i in form)
						{
							fields.push(form[i].name);
							values.push(form[i].value);
						}

						/*-------------------------------------------------*/

						this.appendRow(primaryCatalog, primaryEntity, fields, values);

						/*-------------------------------------------------*/
					});

					/*-----------------------------------------------------*/

					el1.modal('show');

					/*-----------------------------------------------------*/
				});
			});
		});
	},

	/*---------------------------------------------------------------------*/

	appendRow: function(catalog, entity, fields, values)
	{
		const result = confirm('Please confirm!');

		if(result)
		{
			amiWebApp.lock();

			amiCommand.execute(this.ctx.appendCommandFunc(catalog, entity, fields, values)).done((data, message) => {

				$('#A8572167_6898_AD6F_8EAD_9D4E2AEB3550').modal('hide');

				this.success(message, true, /*------------*/ null /*------------*/);

			}).fail((data, message) => {

				this.error(message, true, '#B4CF70FC_14C8_FC57_DEF0_05144415DB6A');
			});
		}

		return result;
	},

	/*---------------------------------------------------------------------*/

	updateRow: function(catalog, entity, fields, values, primaryFields, primaryValues)
	{
		const result = confirm('Please confirm!');

		if(result)
		{
			amiWebApp.lock();

			amiCommand.execute(this.ctx.updateCommandFunc(catalog, entity, fields, values, primaryFields, primaryValues)).done((data, message) => {

				$('#F44687A3_036C_9C77_3284_DD495D9F4D7D').modal('hide');

				this.success(message, true, /*------------*/ null /*------------*/);

			}).fail((data, message) => {

				this.error(message, true, '#B9B74CAB_E87A_4B68_A866_793E9C70EEF1');
			});
		}

		return result;
	},

	/*---------------------------------------------------------------------*/

	removeRow: function(primaryCatalog, primaryEntity, primaryFields, primaryValues)
	{
		const result = confirm('Please confirm!');

		if(result)
		{
			amiWebApp.lock();

			amiCommand.execute(this.ctx.removeCommandFunc(primaryCatalog, primaryEntity, primaryFields, primaryValues)).done((data, message) => {

				this.success(message, true);

			}).fail((data, message) => {

				this.error(message, true);
			});
		}

		return result;
	},

	/*---------------------------------------------------------------------*/
	/*---------------------------------------------------------------------*/

	success: function(message, fadeOut, target)
	{
		if(this.getOwner().refresh)
		{
			_ami_internal_then(this.getOwner().refresh(), () => {

				amiWebApp.success(message, fadeOut, target);

			}, (message) => {

				amiWebApp.error(message, fadeOut, target);
			});
		}
		else
		{
			amiWebApp.success(message, fadeOut, target);
		}
	},

	/*---------------------------------------------------------------------*/
	/*---------------------------------------------------------------------*/

	error: function(message, fadeOut, target)
	{
		if(this.getOwner().refresh)
		{
			_ami_internal_then(this.getOwner().refresh(), () => {

				amiWebApp.error(message, fadeOut, target);

			}, (message) => {

				amiWebApp.error(message, fadeOut, target);
			});
		}
		else
		{
			amiWebApp.error(message, fadeOut, target);
		}
	},

	/*---------------------------------------------------------------------*/
	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
