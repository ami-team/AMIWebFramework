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

'use strict';

import {setup} from './utilities/tools';

export default function()
{
	/*----------------------------------------------------------------------------------------------------------------*/
	/* ES6 EXTENSIONS                                                                                                 */
	/*----------------------------------------------------------------------------------------------------------------*/

	if(!String.prototype.startsWith)
	{
		String.prototype.startsWith = function(s)
		{
			const base = 0x00000000000000000000;

			return this.indexOf(s, base) === base;
		};
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	if(!String.prototype.endsWith)
	{
		String.prototype.endsWith = function(s)
		{
			const base = this.length - s.length;

			return this.indexOf(s, base) === base;
		};
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	if(!String.prototype.hashCode)
	{
		String.prototype.hashCode = function() {

			let hash = 0;

			for(let i = 0; i < this.length; i++)
			{
				hash = ((hash << 5) - hash) + this.charCodeAt(i);

				hash |= 0;
			}

			return hash < 0 ? -hash
			                : +hash
			;
		};
	}

	/*----------------------------------------------------------------------------------------------------------------*/
	/* JQUERY EXTENSIONS                                                                                              */
	/*----------------------------------------------------------------------------------------------------------------*/

	const _ami_internal_jQueryAjax = jQuery.ajax;

	/*----------------------------------------------------------------------------------------------------------------*/

	jQuery.ajax = function(options)
	{
		if(typeof options === 'object' && options.dataType === 'sheet')
		{
			const result = $.Deferred();

			const [context, url] = setup(
				['context', 'url'],
				[result, ''],
				options
			);

			/*--------------------------------------------------------------------------------------------------------*/

			if(url)
			{
				$('head').append(`<link rel="stylesheet" type="text/css" href="${url}" />`).promise().done(() => {

					result.resolveWith(context);
				});
			}
			else
			{
				result.rejectWith(context);
			}

			/*--------------------------------------------------------------------------------------------------------*/

			return result.promise();
		}
		else
		{
			/*--------------------------------------------------------------------------------------------------------*/

			return _ami_internal_jQueryAjax.apply(this, arguments);

			/*--------------------------------------------------------------------------------------------------------*/
		}
	};

	/*----------------------------------------------------------------------------------------------------------------*/

	const _ami_internal_jQueryVal = jQuery.fn.val;

	const _ami_internal_jQueryRemove = jQuery.fn.remove;

	const _ami_internal_jQueryRemoveEvent = new $.Event('remove');

	/*----------------------------------------------------------------------------------------------------------------*/

	jQuery.fn.extend({
		/*------------------------------------------------------------------------------------------------------------*/

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

		/*------------------------------------------------------------------------------------------------------------*/

		val: function()
		{
			/**/ if(arguments.length === 0) // getter
			{
				if(this.hasClass('form-editor-hidden'))
				{
					const editor = this.data('editor');

					if(editor) return editor.getValue();

					return ('');
				}
			}
			else if(arguments.length === 1) // setter
			{
				if(this.hasClass('form-editor-hidden'))
				{
					const editor = this.data('editor');

					if(editor) editor.setValue(arguments[0]);

					return this;
				}
			}

			return _ami_internal_jQueryVal.apply(this, arguments);
		},

		/*------------------------------------------------------------------------------------------------------------*/

		remove: function()
		{
			$(this).trigger(_ami_internal_jQueryRemoveEvent);

			return _ami_internal_jQueryRemove.apply(this, arguments);
		},

		/*------------------------------------------------------------------------------------------------------------*/
	});

	/*----------------------------------------------------------------------------------------------------------------*/
	/* BOOTSTRAP EXTENSIONS                                                                                           */
	/*----------------------------------------------------------------------------------------------------------------*/

	let _ami_internal_modalZIndex = 1050;

	/*----------------------------------------------------------------------------------------------------------------*/

	$(document).on('show.bs.modal', '.modal', (e) => {

		const el = $(e.currentTarget);

		setTimeout(() => {

			$('body > .modal-backdrop:last').css('z-index', _ami_internal_modalZIndex++);
			/*-----------*/el/*-----------*/.css('z-index', _ami_internal_modalZIndex++);

		}, 10);
	});

	/*----------------------------------------------------------------------------------------------------------------*/
}
