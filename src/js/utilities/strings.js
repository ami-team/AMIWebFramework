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

import amiTwig from 'ami-twig';

/*--------------------------------------------------------------------------------------------------------------------*/
/* BASE64 STRINGS                                                                                                     */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Encodes the given string to base64
 * @param {string} s the decoded string
 * @returns {string} The encoded string
 * @ignore
 */

export function base64Encode(s)
{
	return btoa(encodeURIComponent(s || '').replace(/%([0-9A-F]{2})/g, (_, $1) => {

		return String.fromCharCode(parseInt($1, 16));

	})).replace(/\+/g, '-')
	   .replace(/\//g, '_')
	   .replace(/\=+$/, '')
	;
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Decodes the given string from base64
 * @param {string} s the encoded string
 * @returns {string} The decoded string
 * @ignore
 */

export function base64Decode(s)
{
	return decodeURIComponent(atob((s || '').replace(/-/g, '+').replace(/_/g, '/')).split('').map((c) => {

		return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;

	}).join(''));
}

/*--------------------------------------------------------------------------------------------------------------------*/
/* PLAIN STRINGS                                                                                                      */
/*--------------------------------------------------------------------------------------------------------------------*/

const _replace = amiTwig.stdlib._replace;

/*--------------------------------------------------------------------------------------------------------------------*/

const _textToHtmlX = ['&'    , '"'     , '<'   , '>'   ];
const _textToHtmlY = ['&amp;', '&quot;', '&lt;', '&gt;'];

/**
 * Escapes the given string from text to HTML
 * @param {string} s the unescaped string
 * @returns {string} The escaped string
 * @ignore
 */

export function textToHtml(s)
{
	return _replace(s || '', _textToHtmlX, _textToHtmlY);
}

/**
 * Unescapes the given string from HTML to text
 * @param {string} s the escaped string
 * @returns {string} The unescaped string
 * @ignore
 */

export function htmlToText(s)
{
	return _replace(s || '', _textToHtmlY, _textToHtmlX);
}

/*--------------------------------------------------------------------------------------------------------------------*/

const _textToStringX = ['\\'  , '\r' , '\n' , '"'  , '\''  ];
const _textToStringY = ['\\\\', '\\r', '\\n', '\\"', '\\\''];

/**
 * Escapes the given string from text to JavaScript string
 * @param {string} s the unescaped string
 * @returns {string} The escaped string
 * @ignore
 */

export function textToString(s)
{
	return _replace(s || '', _textToStringX, _textToStringY);
}

/**
 * Unescapes the given string from JavaScript string to text
 * @param {string} s the escaped string
 * @returns {string} The unescaped string
 * @ignore
 */

export function stringToText(s)
{
	return _replace(s || '', _textToStringY, _textToStringX);
}

/*--------------------------------------------------------------------------------------------------------------------*/

const _htmlToStringX = ['\\'  , '\r' , '\n' , '&quot;'  , '\''  ];
const _htmlToStringY = ['\\\\', '\\r', '\\n', '\\&quot;', '\\\''];

/**
 * Escapes the given string from HTML to JavaScript string
 * @param {string} s the unescaped string
 * @returns {string} The escaped string
 * @ignore
 */

export function htmlToString(s)
{
	return _replace(s || '', _htmlToStringX, _htmlToStringY);
}

/**
 * Unescapes the given string from JavaScript string to HTML
 * @param {string} s the escaped string
 * @returns {string} The unescaped string
 * @ignore
 */

export function stringToHtml(s)
{
	return _replace(s || '', _htmlToStringY, _htmlToStringX);
}

/*--------------------------------------------------------------------------------------------------------------------*/

const _textToSQLX = ['\''  ];
const _textToSQLY = ['\'\''];

/**
 * Escapes the given string from text to SQL
 * @param {string} s the unescaped string
 * @returns {string} The escaped string
 * @ignore
 */

export function textToSQL(s)
{
	return _replace(s || '', _textToSQLX, _textToSQLY);
}

/**
 * Unescapes the given string from SQL to text
 * @param {string} s the escaped string
 * @returns {string} The unescaped string
 * @ignore
 */

export function sqlToText(s)
{
	return _replace(s || '', _textToSQLY, _textToSQLX);
}

/*--------------------------------------------------------------------------------------------------------------------*/
