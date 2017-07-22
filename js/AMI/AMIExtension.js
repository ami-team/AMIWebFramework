/*!
 * AMI Web Framework - AMIExtension.js
 *
 * Copyright (c) 2014-{{YEAR}} The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

'use strict';

/*-------------------------------------------------------------------------*/
/* ES6 EXTENSIONS                                                          */
/*-------------------------------------------------------------------------*/

if(!String.prototype.startsWith)
{
	String.prototype.startsWith = function(s)
	{
		const base = 0x00000000000000000000;

		return this.indexOf(s, base) === base;
	};
}

/*-------------------------------------------------------------------------*/

if(!String.prototype.endsWith)
{
	String.prototype.endsWith = function(s)
	{
		const base = this.length - s.length;

		return this.indexOf(s, base) === base;
	};
}

/*-------------------------------------------------------------------------*/
/* JQUERY EXTENSIONS                                                       */
/*-------------------------------------------------------------------------*/

jQuery.foreach = function(el, callback, context)
{
	if(context)
	{
		jQuery.each(el, function() {

			callback.apply(context, arguments);
		});
	}
	else
	{
		jQuery.each(el, function() {

			callback.apply(el, arguments);
		});
	}

	return el;
};

/*-------------------------------------------------------------------------*/

var _ami_internal_jQueryAjax = jQuery.ajax;

/*-------------------------------------------------------------------------*/

jQuery.ajax = function(settings)
{
	if(typeof settings === 'object'
	   &&
	   settings.dataType === 'sheet'
	 ) {
		let url = '';
		let context = null;

		if('url' in settings) {
			url = settings['url'];
		}

		if('context' in settings) {
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		const deferred = $.Deferred();

		$('head').append('<link rel="stylesheet" type="text/css" href="' + url + '"></link>').promise().done(() => {

			deferred.resolveWith(context || deferred);
		});

		return deferred.promise();

		/*---------------------------------------------------------*/
	}
	else
	{
		/*---------------------------------------------------------*/

		return _ami_internal_jQueryAjax.apply(this, arguments);

		/*---------------------------------------------------------*/
	}
};

/*-------------------------------------------------------------------------*/
/* BOOTSTRAP EXTENSIONS                                                    */
/*-------------------------------------------------------------------------*/

var _ami_internal_modalZIndex = 1050;

/*-------------------------------------------------------------------------*/

$(document).on('show.bs.modal', '.modal', function() {

	const el = $(this);

	setTimeout(() => {

		$('body > .modal-backdrop:last').css('z-index', _ami_internal_modalZIndex++);

		/*-----------*/el/*-----------*/.css('z-index', _ami_internal_modalZIndex++);

	}, 10);
});

/*-------------------------------------------------------------------------*/
