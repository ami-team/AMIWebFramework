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

var _xqlTokenizerPattern1 = /^\s+/;

var _xqlTokenizerPattern2 = /^[a-zA-Z0-9_]+|^"(""|[^"])*"|^'(''|[^'])*'|^`(``|[^`])*`/;

/*-------------------------------------------------------------------------*/

function xqlTokenizer(xql)
{
	var result = [];

	var i = 0x00000000;
	var l = xql.length;

	var m;

	while(i < l)
	{
		/*-----------------------------------------------------------------*/
		/* EAT SPACES                                                      */
		/*-----------------------------------------------------------------*/

		/**/ if((m = xql.substring(i).match(_xqlTokenizerPattern1)))
		{
			result.push(' ');

			i += m[0].length;
		}

		/*-----------------------------------------------------------------*/
		/* STRING                                                          */
		/*-----------------------------------------------------------------*/

		else if((m = xql.substring(i).match(_xqlTokenizerPattern2)))
		{
			result.push(m[0]);

			i += m[0].length;
		}

		/*-----------------------------------------------------------------*/
		/* OTHER                                                           */
		/*-----------------------------------------------------------------*/

		else result.push(xql[i++]);

		/*-----------------------------------------------------------------*/
	}

	return result;
}

/*-------------------------------------------------------------------------*/

var _xqlRegions = {
	'SELECT': 'SELECT',
	'FROM': 'FROM',
	'WHERE': 'WHERE',
	'GROUP': 'GROUP',
	'ORDER': 'ORDER',
	'LIMIT': 'LIMIT',
	'OFFSET': 'OFFSET',
};

/*-------------------------------------------------------------------------*/

function xqlGetRegions(xql, fieldDescriptions)
{
	var result = {};

	/*---------------------------------------------------------------------*/
	/* PARSE XQL                                                           */
	/*---------------------------------------------------------------------*/

	var lock = 0;

	var TOKEN = '';
	var tokens = [];
	var keyword = '';

	xqlTokenizer(xql).forEach(function(token) {

		TOKEN = token.toUpperCase();

		/*-----------------------------------------------------------------*/

		/**/ if(TOKEN === '(')
		{
			tokens.push('(');
			lock++;
		}
		else if(TOKEN === ')')
		{
			tokens.push(')');
			lock--;
		}

		/*-----------------------------------------------------------------*/

		else if(lock === 0 && TOKEN in _xqlRegions)
		{
			if(keyword)
			{
				result[keyword] = tokens.join('').trim();
			}

			tokens = [   ];
			keyword = TOKEN;

		}

		/*-----------------------------------------------------------------*/

		else if(TOKEN !== 'BY')
		{
			tokens.push(token);
		}

		/*-----------------------------------------------------------------*/
	});

	/*---------------------------------------------------------------------*/

	if(keyword)
	{
		result[keyword] = tokens.join('').trim();
	}

	/*---------------------------------------------------------------------*/
	/* BUILD ALIAS TABLE                                                   */
	/*---------------------------------------------------------------------*/

	var aliases = {};

	result['ALIASES'] = aliases;

	fieldDescriptions.forEach(function(item) {

		aliases[amiWebApp.jspath('..@label', item)] = {
			'field': amiWebApp.jspath('..@field', item),
			'fieldAlias': amiWebApp.jspath('..@label', item),
			'table': amiWebApp.jspath('..@entity', item),
			'tableAlias': amiWebApp.jspath('..@entity', item),
		};
	});

	/*---------------------------------------------------------------------*/

	return result;
}

/*-------------------------------------------------------------------------*/
