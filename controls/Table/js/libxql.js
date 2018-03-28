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
		/*---------------------------------------------------------*/
		/* EAT SPACES                                              */
		/*---------------------------------------------------------*/

		/**/ if((m = xql.substring(i).match(_xqlTokenizerPattern1)))
		{
			result.push(' ');

			i += m[0].length;
		}

		/*---------------------------------------------------------*/
		/* STRING                                                  */
		/*---------------------------------------------------------*/

		else if((m = xql.substring(i).match(_xqlTokenizerPattern2)))
		{
			result.push(m[0]);

			i += m[0].length;
		}

		/*---------------------------------------------------------*/
		/* OTHER                                                   */
		/*---------------------------------------------------------*/

		else result.push(xql[i++]);

		/*---------------------------------------------------------*/
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

function xqlGetRegions(xql)
{
	var result = {};

	/*-----------------------------------------------------------------*/

	var lock = 0;

	var TOKEN = '';
	var tokens = [];
	var keyword = '';

	xqlTokenizer(xql).forEach(function(token) {

		TOKEN = token.toUpperCase();

		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/

		else if(lock === 0 && TOKEN in _xqlRegions)
		{
			if(keyword)
			{
				result[keyword] = tokens.join('').trim();
			}

			tokens = [   ];
			keyword = TOKEN;

		}

		/*---------------------------------------------------------*/

		else if(TOKEN !== 'BY') tokens.push(token);

		/*---------------------------------------------------------*/
	});

	/*-----------------------------------------------------------------*/

	if(keyword)
	{
		result[keyword] = tokens.join('').trim();
	}

	/*-----------------------------------------------------------------*/


	if (result['FROM'])
	{
		result['ALIASES'] = _xqlGetAliases(result['SELECT'], result['FROM']);
	}
	else
	{
		result['ALIASES'] = _xqlGetAliases(result['SELECT'], '');
	}

	/*-----------------------------------------------------------------*/

	return result;
}

/*-------------------------------------------------------------------------*/

function _xqlGetAliases(xqlSelectFragment, xqlFromFragment)
{
	var result = {};

	/*---------------------------------------------------------------------*/
	/* GET DB ALIASES                                                      */
	/*---------------------------------------------------------------------*/

	var _tableAliases = {};

	xqlFromFragment.split(',').forEach(function(item) {

		var parts = item.trim().split(/\s+/);

		if(parts.length === 1)
		{
			_tableAliases[parts[0]] = parts[0];
		}
		else if(parts.length === 2)
		{
			_tableAliases[parts[1]] = parts[0];
		}
		else
		{
			throw 'sql syntax error';
		}
	});

	/*---------------------------------------------------------------------*/

	var xqlSelectFragmentPattern1 = /[ ][A,a][S,s][ ]/;
	var xqlSelectFragmentPattern2 = /[\.]/;
	var tmp;
	var fieldAlias;
	var tableAlias;

	xqlSelectFragment.split(',').forEach(function(item) {

		tmp = [];
		fieldAlias = '';
		tableAlias = '';

		item = item.trim().replace(/`/g,'');

		tmp = item.split(xqlSelectFragmentPattern1);

		if(tmp.length === 2)
		{
			fieldAlias = tmp.pop();
		}

		tmp = tmp[0].split(xqlSelectFragmentPattern2);

		field = tmp.pop();

		if(tmp.length === 1)
		{
			tableAlias = tmp.pop();
		}

		if (fieldAlias === '')
		{
			fieldAlias = field;
		}

		table = _tableAliases.length === 0 ? tableAlias : _tableAliases[tableAlias];

		result[fieldAlias] = {'field' : field, 'fieldAlias' : fieldAlias, 'table' : table, 'tableAlias' : tableAlias};
	});

	alert(JSON.stringify(result));
	return result;
}

/*-------------------------------------------------------------------------*/
