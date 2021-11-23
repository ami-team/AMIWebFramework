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

import * as tools  from './tools';
import * as messages from './messages';

import amiRouter from '../AMIRouter';
import amiWebApp from '../AMIWebApp';

import amiTwig from 'ami-twig';

import 'flatpickr/dist/flatpickr.min.css';
import /*-------*/'flatpickr'/*-------*/;

/*--------------------------------------------------------------------------------------------------------------------*/
/* BREADCRUMB                                                                                                         */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Fills the main breadcrumb
 * @param {Array<string>|string} items the array of HTML formatted items
 * @ignore
 */

export function fillBreadcrumb(items)
{
	let s;

	/**/ if(tools.isArray(items))
	{
		s = items.map((item) => `<li class="breadcrumb-item">${item.replace(/{{ORIGIN_URL}}/g, amiRouter.getOriginURL).replace(/{{WEBAPP_URL}}/g, amiRouter.getWebAppURL())}</li>`).join('');
	}
	else if(tools.isString(items))
	{
		s = items.replace(/{{ORIGIN_URL}}/g, amiRouter.getOriginURL).replace(/{{WEBAPP_URL}}/g, amiRouter.getWebAppURL());
	}
	else
	{
		s = '';
	}

	$('#ami_breadcrumb_content').html(s);
}

/*--------------------------------------------------------------------------------------------------------------------*/
/* HTML                                                                                                               */
/*--------------------------------------------------------------------------------------------------------------------*/

const _idRegExp = /[a-zA-Z][a-zA-Z0-9]{7}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{12}/g;

/*--------------------------------------------------------------------------------------------------------------------*/

let _datetimeFormat = 'yyyy-MM-dd HH:mm:ss.SSSSSS';
let _dateFormat = 'yyyy-MM-dd';

let _timeHMSFormat = 'HH:mm:ss.SSSSSS';
let _timeHMFormat = 'HH:mm';

/*--------------------------------------------------------------------------------------------------------------------*/

function _parseDatetime(s, format)
{
	// noinspection JSUnresolvedFunction
	format = moment().toMomentFormatString(format);

	return moment(s, format, true).toDate();
}

function _formatDatetime(date, format)
{
	// noinspection JSUnresolvedFunction
	format = moment().toMomentFormatString(format);

	return moment(date).format(format);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @param {string} selector
 * @param {string} twig
 * @param {number} mode
 * @param {Object<string, *>} [options={}]
 * @returns {$.Deferred}
 * @ignore
 */

function _xxxHTML(selector, twig, mode, options)
{
	const result = $.Deferred();

	const [context, scope, dict, twigs] = tools.setup(
		['context', 'scope', 'dict', 'twigs'],
		[result, null, {}, {}],
		options
	);

	/*----------------------------------------------------------------------------------------------------------------*/

	if(scope)
	{
		twig = twig.replace(_idRegExp, (id) => {

			return `${id}_scope${scope}`;
		});
	}

	const html = formatTWIG(twig, dict, twigs);

	/*----------------------------------------------------------------------------------------------------------------*/

	let promise;

	let el = $(selector);

	switch(mode)
	{
		case 0:
			promise = el.html(html).promise();
			break;

		case 1:
			promise = el.prepend(html).promise();
			break;

		case 2:
			promise = el.append(html).promise();
			break;

		case 3:
			promise = el.replaceWith(el.is('[id]') ? html.replace(/^\s*(<[a-zA-Z_-]+)/, `$1 id="${el.attr('id')}"`) : html).promise();
			break;

		default:
			throw 'internal error';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	promise.done(() => {

		/*------------------------------------------------------------------------------------------------------------*/

		let el = $(selector);

		/*------------------------------------------------------------------------------------------------------------*/

		const _find = (mode === 3) ? (_selector) => el.find(selector)
		                                              .addBack(selector)
		                           : (_selector) => el.find(_selector)
		;

		/*------------------------------------------------------------------------------------------------------------*/

		if(jQuery.fn.tooltip)
		{
			_find('[data-toggle="tooltip"]').tooltip({
				html: false,
				delay: {
					show: 500,
					hide: 100,
				},
			});
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if(jQuery.fn.popover)
		{
			_find('[data-toggle="popover"]').popover({
				html: true,
				delay: {
					show: 500,
					hide: 100,
				},
			});
		}

		/*------------------------------------------------------------------------------------------------------------*/

		_find('input.form-datetime').flatpickr({
			time_24hr: true,
			enableTime: true,
			enableSeconds: true,
			noCalendar: false,
			dateFormat: _datetimeFormat,
			parseDate: _parseDatetime,
			formatDate: _formatDatetime,
		});

		_find('input.form-date').flatpickr({
			time_24hr: true,
			enableTime: false,
			enableSeconds: false,
			noCalendar: false,
			dateFormat: _dateFormat,
			parseDate: _parseDatetime,
			formatDate: _formatDatetime,
		});

		_find('input.form-time').flatpickr({
			time_24hr: true,
			enableTime: true,
			enableSeconds: true,
			noCalendar: true,
			dateFormat: _timeHMSFormat,
			parseDate: _parseDatetime,
			formatDate: _formatDatetime,
		});

		_find('input.form-time-hm').flatpickr({
			time_24hr: true,
			enableTime: true,
			enableSeconds: false,
			noCalendar: true,
			dateFormat: _timeHMFormat,
			parseDate: _parseDatetime,
			formatDate: _formatDatetime,
		});

		/*------------------------------------------------------------------------------------------------------------*/

		const editors = _find('.form-editor:not(.form-editor-hidden)');

		if(editors.length > 0) import('monaco-editor/esm/vs/editor/editor.api').then((monaco) => {

			editors.each((index, item) => {

				/*----------------------------------------------------------------------------------------------------*/

				const textarea = $(item).removeClass('form-editor').addClass('form-editor-hidden');

				/*----------------------------------------------------------------------------------------------------*/

				const div = $('<div>', {
					'class': textarea.attr('class')
									 .replace('form-editor-hidden', '').trim() + ' form-editor-monaco',
					'style': textarea.attr('style'),
				}).insertBefore(textarea);

				div.promise().done(() => {

					/*------------------------------------------------------------------------------------------------*/

					const lang = textarea.attr('data-lang') || '';
					const theme = textarea.attr('data-theme') || 'vs';

					/**/

					const wordWrap = textarea.attr('data-word-wrap') || 'false';
					const readOnly = textarea.attr('data-read-only') || 'false';
					const showGutter = textarea.attr('data-show-gutter') || 'false';
					const showMiniMap = textarea.attr('data-show-minimap') || 'false';
					const renderWhitespace = textarea.attr('data-render-whitespace') || 'false';
					const highlightActiveLine = textarea.attr('data-highlight-active-line') || 'false';

					/*------------------------------------------------------------------------------------------------*/

					const editor = monaco.editor.create(div[0], {
						/* VALUE */
						value: item.value,
						/* OPTIONS */
						theme: theme,
						language: lang,
						wordWrap: wordWrap === 'true',
						readOnly: readOnly === 'true',
						minimap: {
							enabled: showMiniMap === 'true'
						},
						renderWhitespace: renderWhitespace === 'true',
						lineNumbers: showGutter === 'true' ? 'on' : 'off',
						renderLineHighlight: highlightActiveLine === 'true' ? 'line' : 'none',
						/**/
						overviewRulerLanes: 0,
						overviewRulerBorder: false,
						scrollBeyondLastLine: false,
						hideCursorInOverviewRuler: true,
						scrollbar: {
							alwaysConsumeMouseWheel: false,
						}
					});

					/*------------------------------------------------------------------------------------------------*/

					textarea.data('editor', editor);

					/*------------------------------------------------------------------------------------------------*/

					editor.onDidChangeModelContent(() => {

						item.value = editor.getValue();

						$(item).trigger('change');
					});

					/*------------------------------------------------------------------------------------------------*/

					const updateHeight = () => {

						try
						{
							editor.layout({
								width: div.width(),
								height: editor.getContentHeight(),
							});
						}
						catch
						{
							/* IGNORE */
						}
					};

					/*------------------------------------------------------------------------------------------------*/

					editor.onDidContentSizeChange(
						updateHeight
					);

					updateHeight();

					/*------------------------------------------------------------------------------------------------*/
				});
			});

		}).catch((message) => {

			messages.error(message);
		});

		/*------------------------------------------------------------------------------------------------------------*/

		result.resolveWith(context, [el]);

		/*------------------------------------------------------------------------------------------------------------*/
	});

	/*----------------------------------------------------------------------------------------------------------------*/

	return result.promise();
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
 * @param {string} selector the target selector
 * @param {string} [twig={}] the TWIG fragment
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, suffix, dict, twigs)
 * @returns {$.Deferred} A JQuery deferred object
 * @ignore
 */

export function replaceHTML(selector, twig, options)
{
	return _xxxHTML(selector, twig, 0, options);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
 * @param {string} selector the target selector
 * @param {string} [twig={}] the TWIG fragment
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, suffix, dict, twigs)
 * @returns {$.Deferred} A JQuery deferred object
 * @ignore
 */

export function prependHTML(selector, twig, options)
{
	return _xxxHTML(selector, twig, 1, options);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
 * @param {string} selector the target selector
 * @param {string} [twig={}] the TWIG fragment
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, suffix, dict, twigs)
 * @returns {$.Deferred} A JQuery deferred object
 * @ignore
 */

export function appendHTML(selector, twig, options)
{
	return _xxxHTML(selector, twig, 2, options);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Specify the timedate, date and time formats
 * @param {number} [datetimePrecision=6]
 * @param {string} [datetimeFormat='yyyy-MM-dd HH:mm:ss']
 * @param {string} [dateFormat='yyyy-MM-dd HH:mm:ss']
 * @param {number} [timePrecision=6]
 * @param {string} [timeHMSFormat='HH:mm:ss']
 * @param {string} [timeHMFormat='HH:mm']
 * @ignore
 */

export function setDateTimeFormats(datetimePrecision, datetimeFormat, dateFormat, timePrecision, timeHMSFormat, timeHMFormat)
{
	_datetimeFormat = datetimeFormat || 'yyyy-MM-dd HH:mm:ss';
	_dateFormat = dateFormat || 'yyyy-MM-dd';

	_timeHMSFormat = timeHMSFormat || 'HH:mm:ss';
	_timeHMFormat = timeHMFormat || 'HH:mm';

	if(datetimePrecision > 0) {
		_datetimeFormat += `.${'S'.repeat(datetimePrecision)}`;
	}

	if(timePrecision > 0) {
		_timeHMSFormat += `.${'S'.repeat(timePrecision)}`;
	}
}

/*--------------------------------------------------------------------------------------------------------------------*/
/* TWIG                                                                                                               */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Interprets the given TWIG string, see {@link https://twig.symfony.com/doc/}
 * @param {string} twig the TWIG string
 * @param {Object<string, *>|Array<Object<string, *>>} [dict={}] the dictionary
 * @param {Object<string, string>} [twigs={}] dictionary of fragments
 * @returns {string} The Interpreted TWIG string
 * @ignore
 */

export function formatTWIG(twig, dict, twigs)
{
	const result = [];

	/*----------------------------------------------------------------------------------------------------------------*/

	const render = (twig, dict, twigs) => {

		if(!tools.isMap(dict)) {
			dict = {};
		}

		if(!tools.isMap(twigs)) {
			twigs = {};
		}

		dict['ORIGIN_URL'       ] = amiRouter.getOriginURL()  ;
		dict['WEBAPP_URL'       ] = amiRouter.getWebAppURL()  ;
		dict['BOOTSTRAP_VERSION'] = amiWebApp.bootstrapVersion;

		return amiTwig.engine.render(twig, dict, twigs);
	};

	/*----------------------------------------------------------------------------------------------------------------*/

	tools.asArray(dict).forEach((DICT) => {

		try
		{
			result.push(render(twig, DICT, twigs));
		}
		catch(e)
		{
			messages.error(`TWIG parsing error: ${e.message}`);
		}
	});

	/*----------------------------------------------------------------------------------------------------------------*/

	return result.join('');
}

/*--------------------------------------------------------------------------------------------------------------------*/
