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
