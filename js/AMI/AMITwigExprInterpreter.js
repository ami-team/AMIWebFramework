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
	return (y instanceof Array)
	       ||
	       (y instanceof String)
	       ||
	       (typeof(y) === 'string') ? y.indexOf(x) >= 0 : x in y
	;
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
/* ami.twig.expr.interpreter                                               */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG expression interpreter
 * @see An online <a href="http://cern.ch/ami/twig/" target="_blank">demo</a>.
 * @namespace ami/twig/expr/interpreter
 */

$AMINamespace('ami.twig.expr.interpreter', /** @lends ami/twig/expr/interpreter# */ {
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
			var operator = (node.nodeType !== ami.twig.expr.tokens.NOT) ? node.nodeValue : '!';

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

				case ami.twig.expr.tokens.IS:

					left = this._getJS(node.nodeLeft);

					switch(node.nodeRight.nodeType)
					{
						case ami.twig.expr.tokens.DEFINED:
							return '((' + left + ')!==undefined)';

						case ami.twig.expr.tokens.NULL:
							return '((' + left + ')===null)';

						case ami.twig.expr.tokens.EMPTY:
							return '((' + left + ')===\'\')';

						case ami.twig.expr.tokens.ITERABLE:
							return '_ami_internal_isIterable(' + left + ')';

						case ami.twig.expr.tokens.EVEN:
							return '((' + left + ')&1 === 0)';

						case ami.twig.expr.tokens.ODD:
							return '((' + left + ')&1 === 1)';
					}

					throw 'internal error';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.IN:
					/*---------------------------------*/

					if(node.nodeRight.nodeType !== ami.twig.expr.tokens.RANGE)
					{
						left = this._getJS(node.nodeLeft);
						right = this._getJS(node.nodeRight);

						return '_ami_internal_isInObject(' + left + ',' + right + ')';
					}

					/*---------------------------------*/

					if(node.nodeRight.nodeLeft.nodeType === ami.twig.expr.tokens.NUM
					   &&
					   node.nodeRight.nodeRight.nodeType === ami.twig.expr.tokens.NUM
					 ) {
					 	var x = this._getJS(node.nodeLeft);

						left = node.nodeRight.nodeLeft.nodeValue;
						right = node.nodeRight.nodeRight.nodeValue;

						return '_ami_internal_isInNumRange(' + x + ',' + left + ',' + right + ')';
					}

					/*---------------------------------*/

					if(node.nodeRight.nodeLeft.nodeType === ami.twig.expr.tokens.STR
					   &&
					   node.nodeRight.nodeRight.nodeType === ami.twig.expr.tokens.STR
					 ) {
					 	var x = this._getJS(node.nodeLeft);

						left = node.nodeRight.nodeLeft.nodeValue;
						right = node.nodeRight.nodeRight.nodeValue;

						return '_ami_internal_isInCharRange(' + x + ',' + left + ',' + right + ')';
					}

					/*---------------------------------*/

					throw 'internal error';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.STARTS:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return '_ami_internal_startsWith(' + left + ',' + right + ')';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.ENDS:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return '_ami_internal_endsWith(' + left + ',' + right + ')';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.MATCHES:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return '(' + left + '.match(' + this._unstring(right) + ')!==null)';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.POWER:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'Math.pow(' + left + ',' + right + ')';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.FLOORDIV:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'Math.floor(' + left + '/' + right + ')';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.LOGICAL_OR:
					operator = '||';
					break;

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.LOGICAL_AND:
					operator = '&&';
					break;

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.BITWISE_OR:
					operator = '|';
					break;

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.BITWISE_XOR:
					operator = '^';
					break;

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.BITWISE_AND:
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
