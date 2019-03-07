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
		]).done(function(data) {

			this.inEditMode = false;

			amiWebApp.appendHTML('body', data[0]);
		});
	},

	/*---------------------------------------------------------------------*/

	setup: function(selector, primaryField, settings)
	{
		/*-----------------------------------------------------------------*/

		const fn = (catalog, entity, field, value, primaryField, primaryValue) => 'UpdateElements -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -fields="' + amiWebApp.textToString(field) + '" -values="' + amiWebApp.textToString(value) + '" -keyFields="' + amiWebApp.textToString(this.primaryField) + '" -keyValues="' + amiWebApp.textToString(primaryValue) + '"';

		/*-----------------------------------------------------------------*/

		const [editCommandFunc] = amiWebApp.setup(
			['editCommandFunc'],
			[fn],
			settings
		);

		this.editCommandFunc = editCommandFunc;

		this.primaryField = primaryField;

		/*-----------------------------------------------------------------*/

		$(selector).find('div[data-action="edit"]').click((e) => {

			this.editField(
				e.currentTarget.getAttribute('data-catalog')
				,
				e.currentTarget.getAttribute('data-entity')
				,
				e.currentTarget.getAttribute('data-field')
				,
				e.currentTarget.getAttribute('data-type')
				,
				e.currentTarget.getAttribute('data-row')
				,
				e.currentTarget.innerText
			);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	isInEditMode: function()
	{
		return this.inEditMode();
	},

	/*---------------------------------------------------------------------*/

	setInEditMode: function(inEditMode)
	{
		this.inEditMode = inEditMode;
	},

	/*---------------------------------------------------------------------*/

	textRegex: /^.*(?:TEXT).*$/,
	dateRegex: /^.*(?:DATE|TIME).*$/,
	numberRegex: /^.*(?:BIT|INT|FLOAT|DOUBLE|SERIAL|DECIMAL|NUMERIC).*$/,

	/*---------------------------------------------------------------------*/

	editField: function(catalog, entity, field, type, primaryValue, value)
	{
		if(this.inEditMode)
		{
			/*-------------------------------------------------------------*/

			$('#D3CE601F_C7BA_5C8E_2564_491FED4C5D6F').text('Field `' + field + '` for `' + catalog + '`.`' + entity + '`.`' + this.primaryField + '` = ' + primaryValue);

			/*-------------------------------------------------------------*/

			$('#E2E8670D_2BAE_B181_79E5_C8A170BD3981')[0].reset();

			/*-------------------------------------------------------------*/

			type = type.toUpperCase();

			/**/ if(value === '@NULL')
			{
				$('#A70927B4_918F_07BC_2C91_B48CFCB812C6').collapse('show');
			}
			else if(type.match(this.textRegex))
			{
				$('#EDD0ABD2_4AF8_4F27_AECD_D537F2695E67').collapse('show').find('textarea').val(value);
			}
			else if(type.match(this.numberRegex))
			{
				$('#D20E11D2_1E45_B4B7_219A_9D9F490666D4').collapse('show').find('input').val(value);
			}
			else if(type.match(this.dateRegex))
			{
				$('#F0389A55_B680_9D33_8D06_3D51CF4A3934').collapse('show').find('input').val(value);
			}
			else /*-----------------------*/
			{
				$('#D22BDDA1_B582_6958_2EED_701D853D3B4D').collapse('show').find('input').val(value);
			}

			/*-------------------------------------------------------------*/

			$('#E2E8670D_2BAE_B181_79E5_C8A170BD3981').off().on('submit', (e) => {

				e.preventDefault();

				const value = $('#A4A7E040_7F01_C1BD_7180_2327E5244805 .show').find('input, textarea').val();

				this.changeField(catalog, entity, field, value, this.primaryField, primaryValue);
			});

			/*-------------------------------------------------------------*/

			$('#F44687A3_036C_9C77_3284_DD495D9F4D7D').modal('show');

			/*-------------------------------------------------------------*/
		}
	},

	/*---------------------------------------------------------------------*/

	changeField: function(catalog, entity, field, value, primaryField, primaryValue)
	{
		amiWebApp.lock();

		amiCommand.execute(this.editCommandFunc(catalog, entity, field, value, primaryField, primaryValue)).done((data, message) => {

			$('#F44687A3_036C_9C77_3284_DD495D9F4D7D').modal('hide');

			if(this.getOwner().refresh)
			{
				_ami_internal_then(this.getOwner().refresh(), () => {

					amiWebApp.success(message, true);

				}, (message) => {

					amiWebApp.error(message, true);
				});			}

		}).fail((data, message) => {

			$('#F44687A3_036C_9C77_3284_DD495D9F4D7D').modal('hide');

			if(this.getOwner().refresh)
			{
				_ami_internal_then(this.getOwner().refresh(), () => {

					amiWebApp.error(message, true);

				}, (message) => {

					amiWebApp.error(message, true);
				});
			}
		});
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
