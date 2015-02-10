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

	this.tokenize = function(s, spaces, kwords, quotes, escape) {

		var result = [];

		var word = "";
		var found = false;

		var i = 0x000000;
		var l = s.length;

		while(i < l) {
			/*-------------------------------------------------*/
			/* EAT SPACES                                      */
			/*-------------------------------------------------*/

			if(s.charAt(i) in spaces) {

				if(word) {
					result.push(word);
					word = '';
				}

				i++;

				continue;
			}

			/*-------------------------------------------------*/
			/* EAT KWORDS                                      */
			/*-------------------------------------------------*/

			found = false;

			$.arrayFor(kwords, function(index, kword) {

				if(s.substring(i).indexOf(kword) === 0) {

					if(word) {
						result.push(word);
						word = '';
					}

					var j = i + kword.length;
					result.push(s.substring(i, j));
					i = j;

					found = true;
					return;
				}
			});

			if(found) {
				continue;
			}

			/*-------------------------------------------------*/
			/* EAT STRINGS                                     */
			/*-------------------------------------------------*/

			found = false;

			$.arrayFor(quotes, function(index, quote) {

				if(s.substring(i).indexOf(quote) === 0) {

					if(word) {
						result.push(word);
						word = '';
					}

					var j = i + amiTokenizer.shift(s.substring(i), quote, escape);
					result.push(s.substring(i, j));
					i = j;

					found = true;
					return;
				}
			});

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
			result.push(word);
		}

		return result;
	};

	/*-----------------------------------------------------------------*/

	this.shift = function(s, quote, escape) {

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

		throw 'syntax error, missing token `' + quote + '`';
	};

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiTokenizer = new AMITokenizer();

/*-------------------------------------------------------------------------*/
