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
import flatpickr from 'flatpickr';

import * as cm_view from '@codemirror/view';
import * as cm_state from '@codemirror/state';
import * as cm_command from '@codemirror/commands';
import * as cm_language from '@codemirror/language';
import * as cm_language_data from '@codemirror/language-data';

import {json} from '@codemirror/lang-json';

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
	// noinspection TypeScriptUMDGlobal
	format = moment().toMomentFormatString(format);

	// noinspection TypeScriptUMDGlobal
	return moment(s, format, true).toDate();
}

function _formatDatetime(date, format)
{
	// noinspection TypeScriptUMDGlobal
	format = moment().toMomentFormatString(format);

	// noinspection TypeScriptUMDGlobal
	return moment(date).format(format);
}

/*--------------------------------------------------------------------------------------------------------------------*/

function _injectCodeMirrorStep1(editors)
{
	/*----------------------------------------------------------------------------------------------------------------*/

	let nb = editors.length;

	const result = $.Deferred();

	/*----------------------------------------------------------------------------------------------------------------*/

	const _injectCodeMirrorStep2 = (div, textarea, dynamicLang) => {

		/*------------------------------------------------------------------------------------------------------------*/

		const readOnly = textarea.attr('data-read-only') || 'false';
		const wordWrap = textarea.attr('data-word-wrap') || 'false';
		const showBorder = textarea.attr('data-show-border') || 'true';
		const showGutter = textarea.attr('data-show-gutter') || 'true';
		const rounded = textarea.attr('data-rounded') || 'true';

		/*------------------------------------------------------------------------------------------------------------*/

		const editorLang = new cm_state.Compartment();

		/*------------------------------------------------------------------------------------------------------------*/

		const extensions = [
			cm_state.EditorState.tabSize.of(0x00000000000000004),
			/**/
			cm_view.EditorView.editable.of(readOnly !== 'true'),
			cm_view.highlightSpecialChars(),
			cm_view.keymap.of([
				...cm_command.defaultKeymap,
				...cm_command.historyKeymap,
			]),
			/**/
			cm_command.history(),
			/**/
			editorLang.of(dynamicLang),
			/**/
			cm_language.syntaxHighlighting(cm_language.defaultHighlightStyle, {fallback: true}),
			/**/
			cm_view.EditorView.theme({
				'&.cm-editor': {
					'fontSize': '13px',
				},
				'.cm-gutters': {
					'border-top-left-radius': rounded === 'true' ? '0.25rem' : '0',
					'border-bottom-left-radius': rounded === 'true' ? '0.25rem' : '0',
				},
			}),
			/**/
			cm_view.EditorView.updateListener.of((update) => {

				if(textarea[0].value !== update.state.doc.toString())
				{
					textarea[0].value = update.state.doc.toString();

					textarea.trigger('change');
				}
			}),
		];

		/*------------------------------------------------------------------------------------------------------------*/

		if(showBorder === 'true') {
			div.addClass('border');
		}

		if(rounded === 'true') {
			div.addClass('rounded');
		}

		if(showGutter === 'true') {
			extensions.push(cm_view.lineNumbers());
			extensions.push(cm_language.foldGutter());
		}

		if(wordWrap === 'true') {
			extensions.push(cm_view.EditorView.lineWrapping);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		const editorState = cm_state.EditorState.create({
			extensions: extensions,
			doc: textarea.val(),
		});

		const editorView = new cm_view.EditorView({
			state: editorState,
			parent: div[0],
		});

		/*------------------------------------------------------------------------------------------------------------*/

		textarea.data('editorLang', editorLang);
		textarea.data('editorView', editorView);

		/*------------------------------------------------------------------------------------------------------------*/
	};

	/*----------------------------------------------------------------------------------------------------------------*/

	editors.each((_, element) => {

		/*------------------------------------------------------------------------------------------------------------*/

		const textarea = $(element);

		const div = $('<div>', {
			'class': textarea.attr('class')
			                 .replace(/form-editor[\-a-zA-Z]*/g, 'form-editor-codemirror'),
			'style': textarea.attr('style'),
		});

		/*------------------------------------------------------------------------------------------------------------*/

		div.insertAfter(textarea).promise().done(() => {

			const descr = cm_language.LanguageDescription.matchLanguageName(cm_language_data.languages, textarea.attr('data-lang') || 'json');

			if(descr)
			{
				descr.load().then((dynamicLang) => {

					_injectCodeMirrorStep2(div, textarea, dynamicLang);

					if(--nb === 0)
					{
						result.resolve();
					}
				});
			}
			else
			{
				_injectCodeMirrorStep2(div, textarea, json());

				if(--nb === 0)
				{
					result.resolve();
				}
			}
		});

		/*------------------------------------------------------------------------------------------------------------*/
	});

	/*----------------------------------------------------------------------------------------------------------------*/

	return result;
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @param {string} selector
 * @param {string} twig
 * @param {number} mode
 * @param {Object<string, *>} [options={}]
 * @returns {$.Promise}
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

	let el = $(selector), el2;

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
			el2 = $(el.is('[id]') ? html.replace(/^\s*(<[a-zA-Z_-]+)/, `$1 id="${el.attr('id')}"`) : html);
			promise = el.replaceWith(el2).promise();
			el = el2;
			break;

		default:
			throw 'internal error';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	promise.done(() => {

		/*------------------------------------------------------------------------------------------------------------*/

		const _find = (mode === 3) ? (_selector) => el.find(_selector)
		                                              .addBack(_selector)
		                           : (_selector) => el.find(_selector)
		;

		/*------------------------------------------------------------------------------------------------------------*/

		if(amiWebApp.bootstrapVersion < 5)
		{
			_find('*').each((idx, element) => {

				$(element.attributes).each((idx, attribute) => {

					if(attribute.name.startsWith('data-bs-'))
					{
						element.setAttribute(`data-${attribute.name.substring(8)}`, attribute.value);
					}
				});
			});
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if(jQuery.fn.tooltip)
		{
			_find('[data-toggle="tooltip"],[data-bs-toggle="tooltip"]').tooltip({
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
			_find('[data-toggle="popover"],[data-bs-toggle="popover"]').popover({
				html: true,
				delay: {
					show: 500,
					hide: 100,
				},
			});
		}

		/*------------------------------------------------------------------------------------------------------------*/

		_find('input.form-datetime').each((_, element) => {

			flatpickr(element, {
				allowInput: true,
				time_24hr: true,
				enableTime: true,
				enableSeconds: true,
				noCalendar: false,
				dateFormat: _datetimeFormat,
				parseDate: _parseDatetime,
				formatDate: _formatDatetime,
			});
		});

		_find('input.form-date').each((_, element) => {

			flatpickr(element, {
				allowInput: true,
				time_24hr: true,
				enableTime: false,
				enableSeconds: false,
				noCalendar: false,
				dateFormat: _dateFormat,
				parseDate: _parseDatetime,
				formatDate: _formatDatetime,
			});
		});

		_find('input.form-time').each((_, element) => {

			flatpickr(element, {
				allowInput: true,
				time_24hr: true,
				enableTime: true,
				enableSeconds: true,
				noCalendar: true,
				dateFormat: _timeHMSFormat,
				parseDate: _parseDatetime,
				formatDate: _formatDatetime,
			});
		});

		_find('input.form-time-hm').each((_, element) => {

			flatpickr(element, {
				allowInput: true,
				time_24hr: true,
				enableTime: true,
				enableSeconds: false,
				noCalendar: true,
				dateFormat: _timeHMFormat,
				parseDate: _parseDatetime,
				formatDate: _formatDatetime,
			});
		});

		/*------------------------------------------------------------------------------------------------------------*/

		const editors = _find('.form-editor:not(.form-editor-done)').addClass('form-editor-done');

		if(editors.length > 0)
		{
			_injectCodeMirrorStep1(editors).done(() => {

				result.resolveWith(context, [el, html]);
			});
		}
		else
		{
			result.resolveWith(context, [el, html]);
		}

		/*------------------------------------------------------------------------------------------------------------*/
	});

	/*----------------------------------------------------------------------------------------------------------------*/

	return result.promise();
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Puts a HTML or TWIG fragment to the given target
 * @see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
 * @param {string} selector the target selector
 * @param {string} [twig={}] the TWIG fragment
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, scope, dict, twigs)
 * @returns {$.Promise} A JQuery promise object
 * @ignore
 */

export function replaceHTML(selector, twig, options)
{
	return _xxxHTML(selector, twig, 0, options);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Prepends a HTML or TWIG fragment to the given target
 * @see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
 * @param {string} selector the target selector
 * @param {string} [twig={}] the TWIG fragment
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, scope, dict, twigs)
 * @returns {$.Promise} A JQuery promise object
 * @ignore
 */

export function prependHTML(selector, twig, options)
{
	return _xxxHTML(selector, twig, 1, options);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Appends a HTML or TWIG fragment to the given target
 * @see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
 * @param {string} selector the target selector
 * @param {string} [twig={}] the TWIG fragment
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, scope, dict, twigs)
 * @returns {$.Promise} A JQuery promise object
 * @ignore
 */

export function appendHTML(selector, twig, options)
{
	return _xxxHTML(selector, twig, 2, options);
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Puts a HTML or TWIG fragment to the given target
 * @see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
 * @param {string} selector the target selector
 * @param {string} [twig={}] the TWIG fragment
 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, scope, dict, twigs)
 * @returns {$.Promise} A JQuery promise object
 * @ignore
 */

export function parentHTML(selector, twig, options)
{
	return _xxxHTML(selector, twig, 3, options);
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
 * Interprets the given TWIG string
 * @see {@link https://twig.symfony.com/doc/}
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

		Object.assign(dict, window.ami.awf.globalTwigDict);

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
