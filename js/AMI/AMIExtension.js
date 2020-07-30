/*
 * AMI Web Framework - AMIExtension.js
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/
/* ES6 EXTENSIONS                                                                                                     */
/*--------------------------------------------------------------------------------------------------------------------*/

if(!String.prototype.startsWith)
{
	String.prototype.startsWith = function(s)
	{
		const base = 0x00000000000000000000;

		return this.indexOf(s, base) === base;
	};
}

/*--------------------------------------------------------------------------------------------------------------------*/

if(!String.prototype.endsWith)
{
	String.prototype.endsWith = function(s)
	{
		const base = this.length - s.length;

		return this.indexOf(s, base) === base;
	};
}

/*--------------------------------------------------------------------------------------------------------------------*/
/* JQUERY EXTENSIONS                                                                                                  */
/*--------------------------------------------------------------------------------------------------------------------*/

const _ami_internal_jQueryAjax = jQuery.ajax;
const _ami_internal_jQueryVal = jQuery.fn.val;

/*--------------------------------------------------------------------------------------------------------------------*/

jQuery.ajax = function(settings)
{
	if(typeof settings === 'object'
	   &&
	   settings.dataType === 'sheet'
	 ) {
		const result = $.Deferred();

		const [context, url] = amiWebApp.setup(
			['context', 'url'],
			[result, ''],
			settings
		)

		/*------------------------------------------------------------------------------------------------------------*/

		if(url)
		{
			$('head').append('<link rel="stylesheet" type="text/css" href="' + url + '"></link>').promise().done(() => {

				result.resolveWith(context);
			});
		}
		else
		{
			result.rejectWith(context);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	}
	else
	{
		/*------------------------------------------------------------------------------------------------------------*/

		return _ami_internal_jQueryAjax.apply(this, arguments);

		/*------------------------------------------------------------------------------------------------------------*/
	}
};

/*--------------------------------------------------------------------------------------------------------------------*/

jQuery.fn.extend({
	/*----------------------------------------------------------------------------------------------------------------*/

	findWithSelf: function(selector)
	{
		return this.find(selector).addBack(selector);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	serializeObject: function()
	{
		const result = {};

		this.serializeArray().forEach((item) => {

			if(item.name in result)
			{
				if(Object.prototype.toString.call(result[item.name]) === '[object String]')
				{
					result[item.name] = [result[item.name]];
				}

				result[item.name].push(item.value || '');
			}
			else
			{
				result[item.name] = item.value || '';
			}
		});

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	val: function()
	{
		/**/ if(arguments.length === 0) // getter
		{
			if(this.hasClass('form-editor-hidden'))
			{
				const session = this.data('session');

				return session ? session.getValue(/*--------*/) : '';
			}
		}
		else if(arguments.length === 1) // setter
		{
			if(this.hasClass('form-editor-hidden'))
			{
				const session = this.data('session');

				if(session) session.setValue(arguments[0]); return this;
			}
		}

		return _ami_internal_jQueryVal.apply(this, arguments);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* BOOTSTRAP EXTENSIONS                                                                                               */
/*--------------------------------------------------------------------------------------------------------------------*/

let _ami_internal_modalZIndex = 1050;

/*--------------------------------------------------------------------------------------------------------------------*/

$(document).on('show.bs.modal', '.modal', (e) => {

	const el = $(e.currentTarget);

	setTimeout(() => {

		$('body > .modal-backdrop:last').css('z-index', _ami_internal_modalZIndex++);
		/*-----------*/el/*-----------*/.css('z-index', _ami_internal_modalZIndex++);

	}, 10);
});

/*--------------------------------------------------------------------------------------------------------------------*/
