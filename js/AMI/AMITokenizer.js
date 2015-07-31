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
 * @namespace amiTokenizer
 */

$AMINamespace('amiTokenizer', /** @lends amiTokenizer# */ {
	/*-----------------------------------------------------------------*/

	/**
	  * Tokenize a string
	  * @param {String} s the string
	  * @param {Number} line the line
	  * @param {Array} spaces the array of characters for spaces
	  * @param {Array} kwords the array of kerwords
	  * @param {Array} quotes the array of characters for string declaration
	  * @param {String} [escape='\\'] the escape character
	  * @returns {Array<String>} The array of tokens
	  * @throws {String} The error description
	  */

	tokenize: function(s, line, spaces, kwords, quotes, escape)
	{
		if(!spaces) spaces = [];
		if(!kwords) kwords = [];
		if(!quotes) quotes = [];
		if(!escape) escape = '\\';

		var result_tokens = [];
		var result_lines = [];

		var i = 0x000000;
		var l = s.length;

		var word = '';
		var found;

		while(i < l)
		{
			/*-------------------------------------------------*/
			/* COUNT LINES                                     */
			/*-------------------------------------------------*/

			if(s[i] === '\n')
			{
				line++;
			}

			/*-------------------------------------------------*/
			/* EAT SPACES                                      */
			/*-------------------------------------------------*/

			if(spaces.indexOf(s[i]) >= 0)
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

				if(s.substring(i).indexOf(kword) === 0)
				{
					if(word)
					{
						result_tokens.push(word);
						result_lines.push(line);
						word = '';
					}

					var j = i + kword.length;

					result_tokens.push(s.substring(i, j));
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

				if(s.substring(i).indexOf(quote) === 0)
				{
					if(word)
					{
						result_tokens.push(word);
						result_lines.push(line);
						word = '';
					}

					var j = i + this._shift(s.substring(i), quote, escape, line);

					result_tokens.push(s.substring(i, j));
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

			word += s[i++];

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

	_shift: function(s, quote, escape, line)
	{
		var l = s.length;
		var m = quote.length;
		var n = escape.length;

		var i = m;
		var cnt = 0;

		while(i < l)
		{
			/**/ if(s.substring(i).indexOf(quote) === 0)
			{
				i += m;
				if((cnt & 1) == 0) return i;
				cnt = 0;
			}
			else if(s.substring(i).indexOf(escape) === 0)
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
