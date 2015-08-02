/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* INTERNAL FUNCTIONS                                                      */
/*-------------------------------------------------------------------------*/

function _ami_internal_isIterable(x)
{
	return (x instanceof Array)
	       ||
	       (x instanceof Object)
	       ||
	       (x instanceof String)
	       ||
	       (typeof(x) === 'string')
	;
}

/*-------------------------------------------------------------------------*/

function _ami_internal_isInObject(x, y)
{
	if((y instanceof Array)
	   ||
	   (y instanceof String)
	   ||
	   (typeof(y) === 'string')
	 ) {
		return y.indexOf(x) >= 0;

	} else {
		return x in y;
	}
}

/*-------------------------------------------------------------------------*/

function _ami_internal_isInNumRange(x, x1, x2)
{
	return (x >= x1)
	       &&
	       (x <= x2)
	;
}

/*-------------------------------------------------------------------------*/

function _ami_internal_isInCharRange(x, x1, x2)
{
	return (x.charCodeAt(0) >= x1.charCodeAt(0))
	       &&
	       (x.charCodeAt(0) <= x2.charCodeAt(0))
	;
}

/*-------------------------------------------------------------------------*/

function _ami_internal_startsWith(s1, s2)
{
	var base = 0x0000000000000000000;

	return s1.indexOf(s2, base) === base;
}

/*-------------------------------------------------------------------------*/

function _ami_internal_endsWith(s1, s2)
{
	var base = s1.length - s2.length;

	return s1.indexOf(s2, base) === base;
}

/*-------------------------------------------------------------------------*/
/* amiTwigExprInterpreter                                                  */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG expression interpreter
 * @see An online <a href="http://cern.ch/ami/twig/" target="_blank">demo</a>.
 * @namespace amiTwigExprInterpreter
 */

$AMINamespace('amiTwigExprInterpreter', /** @lends amiTwigExprInterpreter# */ {
	/*-----------------------------------------------------------------*/

	_unstring: function(s)
	{
		if(_ami_internal_isStr(s))
		{
			return s.substring(1, s.length - 1);
		}

		return s;
	},

	/*-----------------------------------------------------------------*/

	_getJS: function(node)
	{
		/*---------------------------------------------------------*/
		/* TERMINALS                                               */
		/*---------------------------------------------------------*/

		if(node.nodeLeft === null
		   &&
		   node.nodeRight === null
		 ) {
			return node.nodeValue;
		}

		/*---------------------------------------------------------*/
		/* UNIARY OPERATORS                                        */
		/*---------------------------------------------------------*/

		if(node.nodeLeft !== null
		   &&
		   node.nodeRight === null
		 ) {
			var operator = (node.nodeType !== amiTwigTokens.NOT) ? node.nodeValue : '!';

			return operator + '(' + this._getJS(node.nodeLeft) + ')';
		}

		/*---------------------------------------------------------*/
		/* BINARY OPERATORS                                        */
		/*---------------------------------------------------------*/

		if(node.nodeLeft !== null
		   &&
		   node.nodeRight !== null
		 ) {
			var left
			var right;

			var operator;

			switch(node.nodeType)
			{
				/*-----------------------------------------*/

				case amiTwigTokens.IS:

					left = this._getJS(node.nodeLeft);

					switch(node.nodeRight.nodeType)
					{
						case amiTwigTokens.DEFINED:
							return '((' + left + ')!==undefined)';

						case amiTwigTokens.NULL:
							return '((' + left + ')===null)';

						case amiTwigTokens.EMPTY:
							return '((' + left + ')===\'\')';

						case amiTwigTokens.ITERABLE:
							return '_ami_internal_isIterable(' + left + ')';

						case amiTwigTokens.EVEN:
							return '((' + left + ')&1 === 0)';

						case amiTwigTokens.ODD:
							return '((' + left + ')&1 === 1)';
					}

					throw 'internal error';

				/*-----------------------------------------*/

				case amiTwigTokens.IN:
					/*---------------------------------*/

					if(node.nodeRight.nodeType !== amiTwigTokens.RANGE)
					{
						left = this._getJS(node.nodeLeft);
						right = this._getJS(node.nodeRight);

						return '_ami_internal_isInObject(' + left + ',' + right + ')';
					}

					/*---------------------------------*/

					if(node.nodeRight.nodeLeft.nodeType === amiTwigTokens.NUM
					   &&
					   node.nodeRight.nodeRight.nodeType === amiTwigTokens.NUM
					 ) {
					 	var x = this._getJS(node.nodeLeft);

						left = node.nodeRight.nodeLeft.nodeValue;
						right = node.nodeRight.nodeRight.nodeValue;

						return '_ami_internal_isInNumRange(' + x + ',' + left + ',' + right + ')';
					}

					/*---------------------------------*/

					if(node.nodeRight.nodeLeft.nodeType === amiTwigTokens.STR
					   &&
					   node.nodeRight.nodeRight.nodeType === amiTwigTokens.STR
					 ) {
					 	var x = this._getJS(node.nodeLeft);

						left = node.nodeRight.nodeLeft.nodeValue;
						right = node.nodeRight.nodeRight.nodeValue;

						return '_ami_internal_isInCharRange(' + x + ',' + left + ',' + right + ')';
					}

					/*---------------------------------*/

					throw 'internal error';

				/*-----------------------------------------*/

				case amiTwigTokens.STARTS:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return '_ami_internal_startsWith(' + left + ',' + right + ')';

				/*-----------------------------------------*/

				case amiTwigTokens.ENDS:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return '_ami_internal_endsWith(' + left + ',' + right + ')';

				/*-----------------------------------------*/

				case amiTwigTokens.MATCHES:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return '(' + left + '.match(' + this._unstring(right) + ')!==null)';

				/*-----------------------------------------*/

				case amiTwigTokens.POWER:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'Math.pow(' + left + ',' + right + ')';

				/*-----------------------------------------*/

				case amiTwigTokens.FLOORDIV:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'Math.floor(' + left + '/' + right + ')';

				/*-----------------------------------------*/

				case amiTwigTokens.LOGICAL_OR:
					operator = '||';
					break;

				/*-----------------------------------------*/

				case amiTwigTokens.LOGICAL_AND:
					operator = '&&';
					break;

				/*-----------------------------------------*/

				case amiTwigTokens.BITWISE_OR:
					operator = '|';
					break;

				/*-----------------------------------------*/

				case amiTwigTokens.BITWISE_XOR:
					operator = '^';
					break;

				/*-----------------------------------------*/

				case amiTwigTokens.BITWISE_AND:
					operator = '&';
					break;

				/*-----------------------------------------*/

				default:
					operator = node.nodeValue;
					break;

				/*-----------------------------------------*/
			}

			left = this._getJS(node.nodeLeft);
			right = this._getJS(node.nodeRight);

			return '(' + left + operator + right + ')';
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Convert a compiled TWIG expression to JavaScript
	  * @param {String} expr the compiled expression
	  * @returns {String} The JavaScript result
	  */

	getJS: function(expr)
	{
		return this._getJS(expr.rootNode);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Evaluate the compiled TWIG expression
	  * @param {String} expr the compiled expression
	  * @param {Object} [dict] the dictionary of definitions
	  * @returns {?} The evaluated result
	  */

	eval: function(expr, _)
	{
		if(!_) _ = {};

		return eval(this._getJS(expr.rootNode));
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
