/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTokenizer                                                            */
/*-------------------------------------------------------------------------*/

/**
 * The AMI tokenizer
 * @namespace ami/tokenizer
 */

$AMINamespace('ami.tokenizer', /** @lends ami/tokenizer# */ {
	/*-----------------------------------------------------------------*/

	/**
	  * Tokenize a string
	  * @param {String} code the code
	  * @param {Number} line the line
	  * @param {Array} spaces the array of characters for spaces
	  * @param {Array} kwords the array of kerwords
	  * @param {Array} quotes the array of characters for string declaration
	  * @param {String} [escape='\\'] the escape character
	  * @returns {Array<String>} The array of tokens
	  * @throws {String} The error description
	  */

	tokenize: function(code, line, spaces, kwords, quotes, escape)
	{
		if(!spaces) spaces = [];
		if(!kwords) kwords = [];
		if(!quotes) quotes = [];
		if(!escape) escape = '\\';

		var result_tokens = [];
		var result_lines = [];

		var i = 0x000000000;
		var l = code.length;

		var word = '';
		var found;

		while(i < l)
		{
			/*-------------------------------------------------*/
			/* COUNT LINES                                     */
			/*-------------------------------------------------*/

			if(code[i] === '\n')
			{
				line++;
			}

			/*-------------------------------------------------*/
			/* EAT SPACES                                      */
			/*-------------------------------------------------*/

			if(spaces.indexOf(code[i]) >= 0)
			{
				if(word)
				{
					result_tokens.push(word);
					result_lines.push(line);
					word = '';
				}

				i++;

				continue;
			}

			/*-------------------------------------------------*/
			/* EAT KWORDS                                      */
			/*-------------------------------------------------*/

			found = false;

			for(var idx in kwords)
			{
				kword = kwords[idx];

				if(code.substring(i).indexOf(kword) === 0)
				{
					if(word)
					{
						result_tokens.push(word);
						result_lines.push(line);
						word = '';
					}

					var j = i + kword.length;

					result_tokens.push(code.substring(i, j));
					result_lines.push(line);

					i = j;

					found = true;
					break;
				}
			}

			if(found)
			{
				continue;
			}

			/*-------------------------------------------------*/
			/* EAT STRINGS                                     */
			/*-------------------------------------------------*/

			found = false;

			for(var idx in quotes)
			{
				quote = quotes[idx];

				if(code.substring(i).indexOf(quote) === 0)
				{
					if(word)
					{
						result_tokens.push(word);
						result_lines.push(line);
						word = '';
					}

					var j = i + this._shift(code.substring(i), quote, escape, line);

					result_tokens.push(code.substring(i, j));
					result_lines.push(line);

					i = j;

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

			word += code[i++];

			/*-------------------------------------------------*/
		}

		if(word)
		{
			result_tokens.push(word);
			result_lines.push(line);
		}

		return result_tokens;
	},

	/*-----------------------------------------------------------------*/

	_shift: function(code, quote, escape, line)
	{
		var l = code.length;
		var m = quote.length;
		var n = escape.length;

		var i = m;
		var cnt = 0;

		while(i < l)
		{
			/**/ if(code.substring(i).indexOf(quote) === 0)
			{
				i += m;
				if((cnt & 1) == 0) return i;
				cnt = 0;
			}
			else if(code.substring(i).indexOf(escape) === 0)
			{
				i += n;
//				if(0x0000001 == 0) return i;
				cnt += 1;
			}
			else
			{
				i += 1;
//				if(0x0000001 == 0) return i;
				cnt = 0;
			}
		}

		throw 'syntax error, line `' + line + '`, missing token `' + quote + '`';
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
