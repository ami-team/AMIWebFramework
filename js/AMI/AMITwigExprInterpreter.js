/*!
 * amiTwigExprInterpreter
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwigExprInterpreter                                                  */
/*-------------------------------------------------------------------------*/

var amiTwigExprInterpreter = {
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

	getJS: function(node)
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
			var operator = (node.nodeType !== TWIG_TOKEN_TYPE_NOT) ? node.nodeValue : '!';

			return operator + '(' + this.getJS(node.nodeLeft) + ')';
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

				case TWIG_TOKEN_TYPE_IS:

					left = this.getJS(node.nodeLeft);

					switch(node.nodeRight.nodeType)
					{
						case TWIG_TOKEN_TYPE_DEFINED:
							return '((' + left + ') !== undefined)';

						case TWIG_TOKEN_TYPE_NULL:
							return '((' + left + ') === null)';

						case TWIG_TOKEN_TYPE_EMPTY:
							return '((' + left + ') === \'\')';

						case TWIG_TOKEN_TYPE_ITERABLE:
							return '__isIterable(' + left + ')';

						case TWIG_TOKEN_TYPE_EVEN:
							return '((' + left + ') & 1 === 0)';

						case TWIG_TOKEN_TYPE_ODD:
							return '((' + left + ') & 1 === 1)';
					}

					throw 'internal error';

				/*-----------------------------------------*/

				case TWIG_TOKEN_TYPE_IN:

					if(node.nodeRight.nodeType === TWIG_TOKEN_TYPE_RANGE)
					{
						if(node.nodeRight.nodeLeft.nodeType === TWIG_TOKEN_TYPE_NUM
						   &&
						   node.nodeRight.nodeRight.nodeType === TWIG_TOKEN_TYPE_NUM
						 ) {
						 	var x = this.getJS(node.nodeLeft);

							left = node.nodeRight.nodeLeft.nodeValue;
							right = node.nodeRight.nodeRight.nodeValue;

							return '__isInNumRange(' + x + ',' + left + ',' + right + ')';
						}

						if(node.nodeRight.nodeLeft.nodeType === TWIG_TOKEN_TYPE_STR
						   &&
						   node.nodeRight.nodeRight.nodeType === TWIG_TOKEN_TYPE_STR
						 ) {
						 	var x = this.getJS(node.nodeLeft);

							left = node.nodeRight.nodeLeft.nodeValue;
							right = node.nodeRight.nodeRight.nodeValue;

							return '__isInCharRange(' + x + ',' + left + ',' + right + ')';
						}

						throw 'internal error';
					}
					else
					{
						left = this.getJS(node.nodeLeft);
						right = this.getJS(node.nodeRight);

						return '(' + left + ' in ' + right + ')';
					}

				/*-----------------------------------------*/

				case TWIG_TOKEN_TYPE_STARTS:

					left = this.getJS(node.nodeLeft);
					right = this.getJS(node.nodeRight);

					return left + '.startsWith(' + right + ')';

				/*-----------------------------------------*/

				case TWIG_TOKEN_TYPE_ENDS:

					left = this.getJS(node.nodeLeft);
					right = this.getJS(node.nodeRight);

					return left + '.endsWith(' + right + ')';

				/*-----------------------------------------*/

				case TWIG_TOKEN_TYPE_MATCHES:

					left = this.getJS(node.nodeLeft);
					right = this.getJS(node.nodeRight);

					return '(' + left + '.match(' + this._unstring(right) + ') !== null)';

				/*-----------------------------------------*/

				case TWIG_TOKEN_TYPE_LOGICAL_OR:
					operator = '||';
					break;

				/*-----------------------------------------*/

				case TWIG_TOKEN_TYPE_LOGICAL_AND:
					operator = '&&';
					break;

				/*-----------------------------------------*/

				case TWIG_TOKEN_TYPE_BITWISE_OR:
					operator = '|';
					break;

				/*-----------------------------------------*/

				case TWIG_TOKEN_TYPE_BITWISE_XOR:
					operator = '^';
					break;

				/*-----------------------------------------*/

				case TWIG_TOKEN_TYPE_BITWISE_AND:
					operator = '&';
					break;

				/*-----------------------------------------*/

				default:
					operator = node.nodeValue;
					break;

				/*-----------------------------------------*/
			}

			left = this.getJS(node.nodeLeft);
			right = this.getJS(node.nodeRight);

			return '(' + left + ' ' + operator + ' ' + right + ')';
		}
	},

	/*-----------------------------------------------------------------*/

	eval: function(node, _)
	{
		function __isIterable(x)
		{
			return (x instanceof Array)
			       ||
			       (x instanceof Object)
			;
		}

		function __isInNumRange(x, x1, x2)
		{
			return (x >= x1)
			       &&
			       (x <= x2)
			;
		}

		function __isInCharRange(x, x1, x2)
		{
			return (x.charCodeAt(0) >= x1.charCodeAt(0))
			       &&
			       (x.charCodeAt(0) <= x2.charCodeAt(0))
			;
		}

		return eval(this.getJS(node));
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
