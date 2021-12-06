/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

import twigParameter from './assets/twig/config/parameter.twig';
import twigConfig    from './assets/twig/config/config.twig'   ;

/*--------------------------------------------------------------------------------------------------------------------*/

let paramDict = {};

let paramDel = [];

/*--------------------------------------------------------------------------------------------------------------------*/

export function init()
{
	const result = $.Deferred();

	amiWebApp.replaceHTML('#BCCE2136_3695_AB6F_4F08_3BD3C9035287', twigConfig).done(() => {

		paramDict = {};

		paramDel = [];

		result.resolve();
	});

	return result;
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function onLogin()
{
	$('#D17C089F_FB5D_B2A5_7C9F_65AA0736084F')[0].reset();

	return _load();
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function onLogout()
{
	$('#D17C089F_FB5D_B2A5_7C9F_65AA0736084F')[0].reset();

	return null;
}

/*--------------------------------------------------------------------------------------------------------------------*/

function _load()
{
	/*----------------------------------------------------------------------------------------------------------------*/

	amiWebApp.lock();

	/*----------------------------------------------------------------------------------------------------------------*/

	return amiCommand.execute('GetConfig').done((data) => {

		const path_fields = amiWebApp.jspath('..rowset{.@type==="paths"}.row.field', data);

		const config_fields = amiWebApp.jspath('..rowset{.@type==="params"}.row.field', data);

		/*------------------------------------------------------------------------------------------------------------*/

		$('#DF9704CF_51FF_F570_F587_27FB5625A936').text(amiWebApp.jspath('.{.@name==="configFileName"}.$', path_fields)[0] || '');

		/*------------------------------------------------------------------------------------------------------------*/

		$('#B5C738DB_B705_5E37_24CD_B265532D0853').empty();

		paramDict = {};
		paramDel = [];

		const dict = [];

		config_fields.forEach((config_field) => {
			/*--------------------------------------------------------------------------------------------------------*/

			let name = config_field['@name'] || '';
			let value = config_field[(('$'))] || '';

			/*--------------------------------------------------------------------------------------------------------*/

			paramDict[name] = value;

			/*--------------------------------------------------------------------------------------------------------*/

			const el = $(`#D17C089F_FB5D_B2A5_7C9F_65AA0736084F [name="${name}"]`)

			if(el.length === 0)
			{
				dict.push({
					name: name,
					value: value,
				});
			}
			else
			{
				el.val(value);
			}

			/*--------------------------------------------------------------------------------------------------------*/
		});

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.replaceHTML('#B5C738DB_B705_5E37_24CD_B265532D0853', twigParameter, {dict: dict}).done(() => {

			amiWebApp.unlock();
		});

		/*------------------------------------------------------------------------------------------------------------*/

	}).fail((data, message) => {

		amiWebApp.error(message, true);
	});

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/

function _save()
{
	/*----------------------------------------------------------------------------------------------------------------*/

	amiWebApp.lock();

	/*----------------------------------------------------------------------------------------------------------------*/

	let name;
	const names = [];

	let value;
	const values = [];

	const params = $('#D17C089F_FB5D_B2A5_7C9F_65AA0736084F').serializeArray();

	for(const i in params)
	{
		name = params[i].name;
		value = params[i].value;

		if(paramDict[name] !== value)
		{
			if(name.indexOf('Ø') >= 0) {
				amiWebApp.error(`character 'Ø' not allow in parameter names (${name}:${value})`, true);
				return
			}

			if(value.indexOf('Ø') >= 0) {
				amiWebApp.error(`character 'Ø' not allow in parameter values (${name}:${value})`, true);
				return
			}

			paramDict[name] = value;

			names.push(amiWebApp.textToString(name));
			values.push(amiWebApp.textToString(value));
		}
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	for(const j in paramDel)
	{
		name = paramDel[j];
		value = (('@NULL'));

		names.push(amiWebApp.textToString(name));
		values.push(amiWebApp.textToString(value));
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	return amiCommand.execute('UpdateConfig -separator="Ø" -names=? -values=?', {params: [names.join('Ø'), values.join('Ø')]}).done((data, message) => {

		amiWebApp.success(message, true);

	}).fail((data, message) => {

		amiWebApp.error(message, true);
	});

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function apply()
{
	if(!confirm('Are you sure?'))
	{
		return;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	_save();

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function reset()
{
	if(!confirm('Are you sure?'))
	{
		return;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	_load();

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function testEmail(email)
{
	amiWebApp.lock();

	amiCommand.execute('SendEmail -from=? -to=? -subject="Test" -message="This is a test."', {params: [paramDict['admin_email'], email]}).done((data, message) => {

		amiWebApp.success(message, true);

	}).fail((data, message) => {

		amiWebApp.error(message, true);
	});
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function addParameter()
{
	const name = (prompt('Parameter name:') || '').trim();

	if(name)
	{
		if($(`#B5C738DB_B705_5E37_24CD_B265532D0853_${name}`).length === 0)
		{
			const dict = {
				name: name,
				value: (''),
			};

			amiWebApp.prependHTML('#B5C738DB_B705_5E37_24CD_B265532D0853', twigParameter, {dict: dict});
		}
		else
		{
			amiWebApp.error('duplicated parameter name', true);
		}
	}
	else
	{
		amiWebApp.error('empty parameter name', true);
	}
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function delParameter(name)
{
	if(!confirm('Are you sure?'))
	{
		return;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	paramDel.push(name);

	if(name in paramDict)
	{
		delete paramDict[name];
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	$(`#B5C738DB_B705_5E37_24CD_B265532D0853_${name}`).closest('.mb-2').remove();

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function togglePasswordVisibility(el)
{
	/*----------------------------------------------------------------------------------------------------------------*/

	const input = $(`#${el.closest('label').attr('for')}`);

	/*----------------------------------------------------------------------------------------------------------------*/

	/**/ if(input.attr('type') === 'text')
	{
		el.find('.bi').removeClass('bi-eye-slash').addClass('bi-eye');
		input.attr('type', 'password');
	}
	else if(input.attr('type') === 'password')
	{
		el.find('.bi').removeClass('bi-eye').addClass('bi-eye-slash');
		input.attr('type', 'text');
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/
