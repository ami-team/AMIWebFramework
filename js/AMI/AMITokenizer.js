/*!
 * AMIWebApp class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* CLASS AMITokenizer                                                      */
/*-------------------------------------------------------------------------*/

function AMITokenizer() {
	/*-----------------------------------------------------------------*/

	this.tokenize = function(s, spaces, kwords, quotes, escape, line) {

		var result_tokens = [];
		var result_lines = [];

		var word = "";
		var found = false;

		var i = 0x000000;
		var l = s.length;

		if(!line) {
			line = 1;
		}

		while(i < l) {
			/*-------------------------------------------------*/
			/* COUNT LINES                                     */
			/*-------------------------------------------------*/

			if(s.charAt(i) === '\n') {
				line += 1;
			}

			/*-------------------------------------------------*/
			/* EAT SPACES                                      */
			/*-------------------------------------------------*/

			if(s.charAt(i) in spaces) {

				if(word) {
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

			for(var idx = 0; idx < kwords.length; idx++) {
				kword = kwords[i];

				if(s.substring(i).indexOf(kword) === 0) {

					if(word) {
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

			if(found) {
				continue;
			}

			/*-------------------------------------------------*/
			/* EAT STRINGS                                     */
			/*-------------------------------------------------*/

			found = false;

			for(var idx = 0; idx < quotes.length; idx++) {
				quote = quotes[i];

				if(s.substring(i).indexOf(quote) === 0) {

					if(word) {
						result_tokens.push(word);
						result_lines.push(line);
						word = '';
					}

					var j = i + this.shift(s.substring(i), quote, escape, line);

					result_tokens.push(s.substring(i, j));
					result_lines.push(line);

					i = j;

					found = true;
					break;
				}
			}

			if(found) {
				continue;
			}

			/*-------------------------------------------------*/
			/* EAT REMAINING CHARACTERES                       */
			/*-------------------------------------------------*/

			word += s.charAt(i++);

			/*-------------------------------------------------*/
		}

		if(word) {
			result_tokens.push(word);
			result_lines.push(line);
		}

		return result_tokens;
	};

	/*-----------------------------------------------------------------*/

	this.shift = function(s, quote, escape, line) {

		var l = s.length;
		var m = quote.length;
		var n = escape.length;

		var i = m;
		var cnt = 0;

		while(i < l) {

			/*  */ if(s.substring(i).indexOf(quote) === 0) {
				i += m;
				if(cnt % 2 == 0) return i;
				cnt = 0;
			} else if(s.substring(i).indexOf(escape) === 0) {
				i += n;
//				if(0x00001 == 0) return i;
				cnt += 1;
			} else {
				i += 1;
//				if(0x00001 == 0) return i;
				cnt = 0;
			}
		}

		throw 'syntax error, line `' + line + '`, missing token `' + quote + '`';
	};

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiTokenizer = new AMITokenizer();

/*-------------------------------------------------------------------------*/
