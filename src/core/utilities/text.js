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
/* TEXT                                                                                                               */
/*--------------------------------------------------------------------------------------------------------------------*/

const _replace = amiTwig.stdlib._replace;

/*--------------------------------------------------------------------------------------------------------------------*/

const _textToHtmlX = ['&'    , '"'     , '<'   , '>'   ];
const _textToHtmlY = ['&amp;', '&quot;', '&lt;', '&gt;'];

/**
 * Escapes the given string from text to HTML
 * @param s {String} string the unescaped string
 * @returns {String} The escaped string
 */

export function textToHtml(s)
{
	return _replace(s || '', _textToHtmlX, _textToHtmlY);
}

/**
 * Unescapes the given string from HTML to text
 * @param s {String} string the escaped string
 * @returns {String} The unescaped string
 */

export function htmlToText(s)
{
	return _replace(s || '', _textToHtmlY, _textToHtmlX);
}

/*--------------------------------------------------------------------------------------------------------------------*/

const _textToStringX = ['\\'  , '\n' , '"'  , '\''  ];
const _textToStringY = ['\\\\', '\\n', '\\"', '\\\''];

/**
 * Escapes the given string from text to JavaScript string
 * @param s {String} string the unescaped string
 * @returns {String} The escaped string
 */

export function textToString(s)
{
	return _replace(s || '', _textToStringX, _textToStringY);
}

/**
 * Unescapes the given string from JavaScript string to text
 * @param s {String} string the escaped string
 * @returns {String} The unescaped string
 */

export function stringToText(s)
{
	return _replace(s || '', _textToStringY, _textToStringX);
}

/*--------------------------------------------------------------------------------------------------------------------*/

const _htmlToStringX = ['\\'  , '\n' , '&quot;'  , '\''  ];
const _htmlToStringY = ['\\\\', '\\n', '\\&quot;', '\\\''];

/**
 * Escapes the given string from HTML to JavaScript string
 * @param s {String} string the unescaped string
 * @returns {String} The escaped string
 */

export function htmlToString(s)
{
	return _replace(s || '', _htmlToStringX, _htmlToStringY);
}

/**
 * Unescapes the given string from JavaScript string to HTML
 * @param s {String} string the escaped string
 * @returns {String} The unescaped string
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
 * @param s {String} string the unescaped string
 * @returns {String} The escaped string
 */

export function textToSQL(s)
{
	return _replace(s || '', _textToSQLX, _textToSQLY);
}

/**
 * Unescapes the given string from SQL to text
 * @param s {String} string the escaped string
 * @returns {String} The unescaped string
 */

export function sqlToText(s)
{
	return _replace(s || '', _textToSQLY, _textToSQLX);
}

/*--------------------------------------------------------------------------------------------------------------------*/
