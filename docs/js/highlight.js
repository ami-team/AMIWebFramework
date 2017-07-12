/*!
 * AMI Web Framework
 * AMI code highlighter
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/

highlight = {
	/*-----------------------------------------------------------------*/
	/* LANGUAGES                                                       */
	/*-----------------------------------------------------------------*/

	langjs: {
		regexes: [
			'abstract', 'arguments', 'boolean', 'break', 'byte',
			'case', 'catch', 'char', 'class', 'const', 'continue',
			'debugger', 'default', 'delete', 'do', 'double', 'else',
			'enum', 'eval', 'export', 'extends', 'false', 'final',
			'finally', 'float', 'for', 'function', 'goto', 'if',
			'implements', 'import', 'in', 'instanceof', 'int',
			'interface', 'let', 'long', 'native', 'new', 'null',
			'package', 'private', 'protected', 'public', 'return',
			'short', 'static', 'super', 'switch', 'synchronized',
			'this', 'throw', 'throws', 'transient', 'true', 'try',
			'typeof', 'var', 'void', 'volatile', 'while', 'with',
			'yield',
			/^\/\/[^\n]*/,						/* comment */
			/^[0-9]+\.[0-9]*/, /^[0-9]+/, /^\.[0-9]+/,		/* number */
			/^\/[^\\/]*\//,						/* regex */
			/^'[^\']*'/, /^"[^\"]*"/				/* string */
		],
		classes: [
			'code-keyword', 'code-keyword', 'code-keyword', 'code-keyword',
			'code-keyword', 'code-keyword', 'code-keyword', 'code-keyword',
			'code-keyword', 'code-keyword', 'code-keyword', 'code-keyword',
			'code-keyword', 'code-keyword', 'code-keyword', 'code-keyword',
			'code-keyword', 'code-keyword', 'code-keyword', 'code-keyword',
			'code-keyword', 'code-keyword', 'code-keyword', 'code-keyword',
			'code-keyword', 'code-keyword', 'code-keyword', 'code-keyword',
			'code-keyword', 'code-keyword', 'code-keyword', 'code-keyword',
			'code-keyword', 'code-keyword', 'code-keyword', 'code-keyword',
			'code-keyword', 'code-keyword', 'code-keyword', 'code-keyword',
			'code-keyword', 'code-keyword', 'code-keyword', 'code-keyword',
			'code-keyword', 'code-keyword', 'code-keyword', 'code-keyword',
			'code-keyword', 'code-keyword', 'code-keyword', 'code-keyword',
			'code-keyword', 'code-keyword', 'code-keyword', 'code-keyword',
			'code-keyword', 'code-keyword', 'code-keyword', 'code-keyword',
			'code-keyword', 'code-keyword', 'code-keyword',
			'code-comment',
			'code-number', 'code-number',' code-number',
			'code-regexp',
			'code-string', 'code-string',
		],
	},

	/*-----------------------------------------------------------------*/

	langjson: {
		regexes: [
			'{', '}',
			'[', ']',
			/^[0-9]+\.[0-9]*/, /^[0-9]+/, /^\.[0-9]+/,		/* number */
			/^'[^\']*'/, /^"[^\"]*"/				/* string */
		],
		classes: [
			'code-keyword', 'code-keyword',
			'code-keyword', 'code-keyword',
			'code-number', 'code-number',' code-number',
			'code-string', 'code-string',
		],
	},

	/*-----------------------------------------------------------------*/
	/* LIBRARY                                                         */
	/*-----------------------------------------------------------------*/

	highlight: function(code, lang)
	{
		var conf = this['lang' + lang.toLowerCase()].trim();

		if(!conf)
		{
			throw 'unknown language `' + lang + '`';
		}

		return this._tokenize(
			code.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
			conf.regexes,
			conf.classes
		).join('');
	},

	/*-----------------------------------------------------------------*/

	_tokenize: function(code, tokenDefs, tokenCols)
	{
		if(tokenDefs.length !== tokenCols.length)
		{
			throw '`tokenDefs.length != tokenCols.length`';
		}

		var result = ['<i class="line-number"></i>'];

		var i = 0x000000000;
		var l = code.length;

		var word = '', c;
		var found;

		while(i < l)
		{
			/*-------------------------------------------------*/
			/* EAT SPACES                                      */
			/*-------------------------------------------------*/

			c = code.charAt(0);

			if([' ', '\t', '\n'].indexOf(c) >= 0)
			{
				if(word)
				{
					result.push(word);
					word = '';
				}

				/**/ if(c === ' ')
				{
					result.push(' ');
				}
				else if(c === '\t')
				{
					result.push('        ');
				}
				else if(c === '\n')
				{
					result.push('\n' + result[0]);
				}

				code = code.substring(1);
				i += 1;

				continue;
			}

			/*-------------------------------------------------*/
			/* EAT REGEXES                                     */
			/*-------------------------------------------------*/

			found = false;

			for(var idx in tokenDefs)
			{
				var token = this._match(code, tokenDefs[idx]);

				if(token)
				{
					if(word)
					{
						result.push(word);
						word = '';
					}

					result.push('<span class="' + tokenCols[idx] + '">' + token + '</span>');

					code = code.substring(token.length);
					i += token.length;
					found = true;

					break;
				}
			}

			if(found)
			{
				continue;
			}

			/*-------------------------------------------------*/
			/* EAT REMAINING CHARACTERES                       */
			/*-------------------------------------------------*/

			word += c;

			code = code.substring(1);
			i += 1;

			/*-------------------------------------------------*/
		}

		if(word)
		{
			result.push(word);
			word = '';
		}

		return result;
	},

	/*-----------------------------------------------------------------*/

	_match: function(s, stringOrRegExp)
	{
		var m;

		if(stringOrRegExp instanceof RegExp)
		{
			m = s.match(stringOrRegExp);

			return m !== null && this._checkNextChar(s, (((((m[0])))))) ? (((((m[0]))))) : null;
		}
		else
		{
			m = s.indexOf(stringOrRegExp);

			return m === 0x00 && this._checkNextChar(s, stringOrRegExp) ? stringOrRegExp : null;
		}
	},

	/*-----------------------------------------------------------------*/

	_checkNextChar: function(s, token)
	{
		var length = token.length;

		var charCode2 = s.charCodeAt(length - 0);
		var charCode1 = s.charCodeAt(length - 1);

		return isNaN(charCode2)
		       ||
		       this._alnum[charCode2] === 0
		       ||
		       this._alnum[charCode1] === 0
		;
	},

	/*-----------------------------------------------------------------*/

	_alnum: [
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	],

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
