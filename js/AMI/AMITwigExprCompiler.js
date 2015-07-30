/*!
 * AMITwigExprCompiler
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* INTERNAL VARIABLES                                                      */
/*-------------------------------------------------------------------------*/

var _ami_internal_numRegex = /^[0-9]+$/;
var _ami_internal_sidRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

/*-------------------------------------------------------------------------*/
/* INTERNAL FUNCTIONS                                                      */
/*-------------------------------------------------------------------------*/

function _ami_internal_isNum(s)
{
	return s.match(_ami_internal_numRegex) !== null;
}

/*-------------------------------------------------------------------------*/

function _ami_internal_isStr(s)
{
	var length = s.length;

	return length >= 2
	       &&
	       (
	           (s[0] === '\'' && s[length - 1] === '\'')
	           ||
	           (s[0] === '\"' && s[length - 1] === '\"')
	       )
	;
}

/*-------------------------------------------------------------------------*/

function _ami_internal_isSId(s)
{
	return s.match(_ami_internal_sidRegex) !== null;
}

/*-------------------------------------------------------------------------*/
/* AMITwigExprTokenizer                                                    */
/*-------------------------------------------------------------------------*/

TWIG_TOKEN_TYPE_LOGICAL_OR = 100;
TWIG_TOKEN_TYPE_LOGICAL_AND = 101;
TWIG_TOKEN_TYPE_BITWISE_OR = 102;
TWIG_TOKEN_TYPE_BITWISE_XOR = 103;
TWIG_TOKEN_TYPE_BITWISE_AND = 104;
TWIG_TOKEN_TYPE_STRICT_EQ = 105;
TWIG_TOKEN_TYPE_LOOSE_EQ = 106;
TWIG_TOKEN_TYPE_STRICT_NE = 107;
TWIG_TOKEN_TYPE_LOOSE_NE = 108;
TWIG_TOKEN_TYPE_GTE = 109;
TWIG_TOKEN_TYPE_LTE = 110;
TWIG_TOKEN_TYPE_GT = 111;
TWIG_TOKEN_TYPE_LT = 112;
TWIG_TOKEN_TYPE_IS = 113;
TWIG_TOKEN_TYPE_DEFINED = 114;
TWIG_TOKEN_TYPE_NULL = 115;
TWIG_TOKEN_TYPE_EMPTY = 116;
TWIG_TOKEN_TYPE_ITERABLE = 117;
TWIG_TOKEN_TYPE_EVEN = 118;
TWIG_TOKEN_TYPE_ODD = 119;
TWIG_TOKEN_TYPE_STARTS = 120;
TWIG_TOKEN_TYPE_ENDS = 121;
TWIG_TOKEN_TYPE_WITH = 122;
TWIG_TOKEN_TYPE_MATCHES = 123;
TWIG_TOKEN_TYPE_IN = 124;
TWIG_TOKEN_TYPE_RANGE = 125;
TWIG_TOKEN_TYPE_PLUS = 126;
TWIG_TOKEN_TYPE_MINUS = 127;
TWIG_TOKEN_TYPE_POWER = 128;
TWIG_TOKEN_TYPE_MUL = 129;
TWIG_TOKEN_TYPE_FLOORDIV = 130;
TWIG_TOKEN_TYPE_DIV = 131;
TWIG_TOKEN_TYPE_MOD = 132;
TWIG_TOKEN_TYPE_NOT = 133;
TWIG_TOKEN_TYPE_DOT = 134;

/*-------------------------------------------------------------------------*/

TWIG_TOKEN_TYPE_LP = 200;
TWIG_TOKEN_TYPE_RP = 201;

/*-------------------------------------------------------------------------*/

TWIG_TOKEN_TYPE_SID = 300;
TWIG_TOKEN_TYPE_FUN = 301;
TWIG_TOKEN_TYPE_NUM = 302;
TWIG_TOKEN_TYPE_STR = 303;

/*-------------------------------------------------------------------------*/

TWIG_TOKEN_TYPE_EQ_NE_GTE_LTE_GT_LT = [
	TWIG_TOKEN_TYPE_STRICT_EQ,
	TWIG_TOKEN_TYPE_LOOSE_EQ,
	TWIG_TOKEN_TYPE_STRICT_NE,
	TWIG_TOKEN_TYPE_LOOSE_NE,
	TWIG_TOKEN_TYPE_GTE,
	TWIG_TOKEN_TYPE_LTE,
	TWIG_TOKEN_TYPE_GT,
	TWIG_TOKEN_TYPE_LT,
];

TWIG_TOKEN_TYPE_IS_XXX = [
	TWIG_TOKEN_TYPE_DEFINED,
	TWIG_TOKEN_TYPE_NULL,
	TWIG_TOKEN_TYPE_EMPTY,
	TWIG_TOKEN_TYPE_ITERABLE,
	TWIG_TOKEN_TYPE_EVEN,
	TWIG_TOKEN_TYPE_ODD
];

TWIG_TOKEN_TYPE_XXX_WITH = [
	TWIG_TOKEN_TYPE_STARTS,
	TWIG_TOKEN_TYPE_ENDS,
];

TWIG_TOKEN_TYPE_PLUS_MINUS = [
	TWIG_TOKEN_TYPE_PLUS,
	TWIG_TOKEN_TYPE_MINUS,
];

TWIG_TOKEN_TYPE_MUL_DIV_MOD = [
	TWIG_TOKEN_TYPE_MUL,
	TWIG_TOKEN_TYPE_FLOORDIV,
	TWIG_TOKEN_TYPE_DIV,
	TWIG_TOKEN_TYPE_MOD,
];

TWIG_TOKEN_TYPE_NOT_PLUS_MINUS = [
	TWIG_TOKEN_TYPE_NOT,
	TWIG_TOKEN_TYPE_PLUS,
	TWIG_TOKEN_TYPE_MINUS,
];

TWIG_TOKEN_TYPE_TERMINAL = [
	TWIG_TOKEN_TYPE_NUM,
	TWIG_TOKEN_TYPE_STR,
];

/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG expression tokenizer
 * @see An online <a href="http://cern.ch/ami/twig/" target="_blank">demo</a>.
 * @class AMITwigExprTokenizer
 */

function AMITwigExprTokenizer(code, line)
{
	/*-----------------------------------------------------------------*/

	this.dict = {
		'or': TWIG_TOKEN_TYPE_LOGICAL_OR,
		'and': TWIG_TOKEN_TYPE_LOGICAL_AND,
		'b-or': TWIG_TOKEN_TYPE_BITWISE_OR,
		'b-xor': TWIG_TOKEN_TYPE_BITWISE_XOR,
		'b-and': TWIG_TOKEN_TYPE_BITWISE_AND,
		'===': TWIG_TOKEN_TYPE_STRICT_EQ,
		'==': TWIG_TOKEN_TYPE_LOOSE_EQ,
		'!==': TWIG_TOKEN_TYPE_STRICT_NE,
		'!=': TWIG_TOKEN_TYPE_LOOSE_NE,
		'<=': TWIG_TOKEN_TYPE_GTE,
		'>=': TWIG_TOKEN_TYPE_LTE,
		'<': TWIG_TOKEN_TYPE_GT,
		'>': TWIG_TOKEN_TYPE_LT,
		'is': TWIG_TOKEN_TYPE_IS,
		'defined': TWIG_TOKEN_TYPE_DEFINED,
		'null': TWIG_TOKEN_TYPE_NULL,
		'empty': TWIG_TOKEN_TYPE_EMPTY,
		'iterable': TWIG_TOKEN_TYPE_ITERABLE,
		'even': TWIG_TOKEN_TYPE_EVEN,
		'odd': TWIG_TOKEN_TYPE_ODD,
		'starts': TWIG_TOKEN_TYPE_STARTS,
		'ends': TWIG_TOKEN_TYPE_ENDS,
		'with': TWIG_TOKEN_TYPE_WITH,
		'matches': TWIG_TOKEN_TYPE_MATCHES,
		'in': TWIG_TOKEN_TYPE_IN,
		'..': TWIG_TOKEN_TYPE_RANGE,
		'+': TWIG_TOKEN_TYPE_PLUS,
		'-': TWIG_TOKEN_TYPE_MINUS,
		'**': TWIG_TOKEN_TYPE_POWER,
		'*': TWIG_TOKEN_TYPE_MUL,
		'//': TWIG_TOKEN_TYPE_DIV,
		'/': TWIG_TOKEN_TYPE_DIV,
		'%': TWIG_TOKEN_TYPE_MOD,
		'not': TWIG_TOKEN_TYPE_NOT,
		'.': TWIG_TOKEN_TYPE_DOT,
		'(': TWIG_TOKEN_TYPE_LP,
		')': TWIG_TOKEN_TYPE_RP,
	};

	/*-----------------------------------------------------------------*/

	this.tokens = amiTokenizer.tokenize(
		code,
		line,
		[' ', '\t', '\n'],
		['b-or', 'b-xor', 'b-and', '===', '==', '!==', '!=', '=', '<=', '>=', '<', '>', '+', '-', '**', '*', '//', '/', '..', '.', '(', ')'],
		['\'', '\"'],
		'\\'
	);

	this.types = [];

	this.i = 0;

	/*-----------------------------------------------------------------*/

	var token;
	var type;

	for(var indx = 0; indx < this.tokens.length; indx++)
	{
		token = this.tokens[indx];
		type = this.dict[token];

		if(type) {
			this.types.push(type);
		} else if(_ami_internal_isNum(token)) {
			this.types.push(TWIG_TOKEN_TYPE_NUM);
		} else if(_ami_internal_isStr(token)) {
			this.types.push(TWIG_TOKEN_TYPE_STR);
		} else if(_ami_internal_isSId(token)) {
			this.types.push(TWIG_TOKEN_TYPE_SID);
		} else {
			throw 'syntax error, line `' + line + '`, unknown token `' + token + '`';
		}
	}

	/*-----------------------------------------------------------------*/

	this.next = function()
	{
		this.i++;
	};

	/*-----------------------------------------------------------------*/

	this.isEmpty = function()
	{
		return this.i >= this.tokens.length;
	};

	/*-----------------------------------------------------------------*/

	this.peekToken = function()
	{
		return this.tokens[this.i];
	};

	/*-----------------------------------------------------------------*/

	this.peekType = function()
	{
		return this.types[this.i];
	};

	/*-----------------------------------------------------------------*/

	this.checkType = function(type)
	{
		if(this.i < this.tokens.length)
		{
			var TYPE = this.types[this.i];

			return (type instanceof Array) ? (type.indexOf(TYPE) >= 0) : (type === TYPE);
		}
		
		return false;
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* AMITwigExprCompiler                                                     */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG expression compiler
 * @see An online <a href="http://cern.ch/ami/twig/" target="_blank">demo</a>.
 * @class AMITwigExprCompiler
 */

function AMITwigExprCompiler()
{
	/*-----------------------------------------------------------------*/

	this.parse = function(code, line)
	{
		/*---------------------------------------------------------*/

		this.tokenizer = new AMITwigExprTokenizer(
			this.code = code,
			this.line = line
		);

		/*---------------------------------------------------------*/

		this.rootNode = this.parseLogicalOr();

		if(!this.tokenizer.isEmpty())
		{
			throw 'syntax error, line `' + this.line + '`, unexpected token `' + this.tokenizer.peekToken() + '`';
		}

		/*---------------------------------------------------------*/

		return this;
	};

	/*-----------------------------------------------------------------*/

	this.dump = function()
	{
		return this.rootNode.dump();
	};

	/*-----------------------------------------------------------------*/

	this.parseLogicalOr = function()
	{
		var left = this.parseLogicalAnd();

		/*---------------------------------------------------------*/
		/* LogicalOr : LogicalAnd ('or' LogicalAnd)*               */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_LOGICAL_OR))
		{
			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseLogicalOr();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseLogicalAnd = function()
	{
		var left = this.parseBitwiseOr();

		/*---------------------------------------------------------*/
		/* LogicalAnd : BitwiseOr ('and' BitwiseOr)*               */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_LOGICAL_AND))
		{
			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseLogicalAnd();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseBitwiseOr = function()
	{
		var left = this.parseBitwiseXor();

		/*---------------------------------------------------------*/
		/* BitwiseOr : BitwiseXor ('b-or' BitwiseXor)*             */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_BITWISE_OR))
		{
			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseBitwiseOr();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseBitwiseXor = function()
	{
		var left = this.parseBitwiseAnd();

		/*---------------------------------------------------------*/
		/* BitwiseXor : BitwiseAnd ('b-xor' BitwiseAnd)*           */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_BITWISE_XOR))
		{
			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseBitwiseXor();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseBitwiseAnd = function()
	{
		var left = this.parseComp();

		/*---------------------------------------------------------*/
		/* BitwiseAnd : Comp ('b-and' Comp)*                       */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_BITWISE_AND))
		{
			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseBitwiseAnd();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseComp = function()
	{
		var left = this.parseAddSub();

		/*---------------------------------------------------------*/
		/* Comp : AddSub (('===' | '==' | ...) AddSub)?            */
		/*---------------------------------------------------------*/

		/**/ if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_EQ_NE_GTE_LTE_GT_LT))
		{
			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/* Comp : AddSub ('is' 'not'? ('defined' | 'empty' | ...))?*/
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_IS))
		{
			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			/* swap */
			var swap = node;
			/* swap */

			if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_NOT))
			{
				node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
				this.tokenizer.next();

				node.nodeLeft = swap;
				node.nodeRight = null;
			}

			if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_IS_XXX))
			{
				var right = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
				this.tokenizer.next();

				swap.nodeLeft = left;
				swap.nodeRight = right;
			}
			else
			{
				throw 'syntax error, line `' + this.line + '`, `defined`, `null`, `iterable`, `empty`, `even` or `odd` expected';
			}

			left = node;
		}

		/*---------------------------------------------------------*/
		/* Comp : AddSub (('starts' | 'ends') `with` AddSub)?      */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_XXX_WITH))
		{
			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken() + 'with');
			this.tokenizer.next();

			if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_WITH))
			{
				this.tokenizer.next();
			}
			else
			{
				throw 'syntax error, line `' + this.line + '`, `with` expected';
			}

			var right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/* Comp : AddSub ('matches' AddSub)?                       */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_MATCHES))
		{
			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/* Comp : AddSub ('in' Range)?                             */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_IN))
		{
			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseRange();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseAddSub = function()
	{
		var left = this.parseMulDiv();

		/*---------------------------------------------------------*/
		/* AddSub : MulDiv (('+' | '-') MulDiv)*                   */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_PLUS_MINUS))
		{
			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseMulDiv = function()
	{
		var left = this.parsePower();

		/*---------------------------------------------------------*/
		/* MulDiv : Power (('*' | '//' | '/' | '%') Power)*        */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_MUL_DIV_MOD))
		{
			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseMulDiv();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parsePower = function()
	{
		var left = this.parseNotPlusMinus();

		/*---------------------------------------------------------*/
		/* Power : NotPlusMinus ('**' NotPlusMinus)*               */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_POWER))
		{
			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parsePower();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseNotPlusMinus = function()
	{
		/*---------------------------------------------------------*/
		/* NotPlusMinus : ('!' | '-' | '+')? X                     */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_NOT_PLUS_MINUS))
		{
			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var left = this.parseX();

			node.nodeLeft = left;
			node.nodeRight = null;

			return node;
		}

		/*---------------------------------------------------------*/

		return this.parseX();
	};

	/*-----------------------------------------------------------------*/

	this.parseX = function()
	{
		/*---------------------------------------------------------*/
		/* X : Group | QId | Terminal                              */
		/*---------------------------------------------------------*/

		var node;

		if((node = this.parseGroup())) {
			return node;
		}

		if((node = this.parseQIdFun())) {
			return node;
		}

		if((node = this.parseTerminal())) {
			return node;
		}

		/*---------------------------------------------------------*/

		throw 'syntax error, line `' + this.line + '`, syntax error or tuncated expression';

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.parseGroup = function()
	{
		/*---------------------------------------------------------*/
		/* Group : '(' LogicalOr ')'                               */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_LP))
		{
			this.tokenizer.next();

			var node = this.parseLogicalOr();

			if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_RP))
			{
				this.tokenizer.next();

				return node;
			}
			else
			{
				throw 'syntax error, line `' + this.line + '`, `)` expected';
			}
		}

		/*---------------------------------------------------------*/

		return null;
	};

	/*-----------------------------------------------------------------*/

	this.parseQIdFun = function()
	{
		/*---------------------------------------------------------*/
		/* QIdFun : SID('.' SID)*                                  */
		/*        | SID('.' SID)* '(' ')'                          */
		/*---------------------------------------------------------*/

		var qid = '_.';

		if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_SID))
		{
			qid += this.tokenizer.peekToken();
			this.tokenizer.next();

			while(this.tokenizer.checkType(TWIG_TOKEN_TYPE_DOT))
			{
				qid += this.tokenizer.peekToken();
				this.tokenizer.next();

				if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_SID))
				{
					qid += this.tokenizer.peekToken();
					this.tokenizer.next();
				}
				else
				{
					throw 'syntax error, line `' + this.line + '`, id expected';
				}
			}

			if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_LP))
			{
				this.tokenizer.next();

				if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_RP))
				{
					this.tokenizer.next();
				}
				else
				{
					throw 'syntax error, line `' + this.line + '`, `)` expected';
				}

				return new AMITwigExprNode(TWIG_TOKEN_TYPE_FUN, qid);
			}
			else
			{
				return new AMITwigExprNode(TWIG_TOKEN_TYPE_SID, qid);
			}
		}

		/*---------------------------------------------------------*/

		return null;
	};

	/*-----------------------------------------------------------------*/

	this.parseTerminal = function()
	{
		/*---------------------------------------------------------*/
		/* Terminal : NUM | STR                                    */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_TERMINAL))
		{
			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			return node;
		}

		/*---------------------------------------------------------*/

		return null;
	};

	/*-----------------------------------------------------------------*/

	this.parseRange = function(e)
	{
		/*---------------------------------------------------------*/
		/* Range : QIdFun                                          */
		/*---------------------------------------------------------*/

		var node = this.parseQIdFun();

		if(node != null)
		{
			return node;
		}

		/*---------------------------------------------------------*/
		/* Range : Terminal '..' Terminal                          */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_TERMINAL))
		{
			var left = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_RANGE))
			{
				var node = new AMITwigExprNode(((TWIG_TOKEN_TYPE_RANGE)), this.tokenizer.peekToken());
				this.tokenizer.next();

				if(this.tokenizer.checkType(TWIG_TOKEN_TYPE_TERMINAL))
				{
					var right = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
					this.tokenizer.next();

					node.nodeLeft = left;
					node.nodeRight = right;

					return node;
				}
			}
		}

		/*---------------------------------------------------------*/

		throw 'syntax error, line `' + this.line + '`, invalid range';

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* AMITwigExprNode                                                         */
/*-------------------------------------------------------------------------*/

function AMITwigExprNode(nodeType, nodeValue)
{
	/*-----------------------------------------------------------------*/

	this.nodeType = nodeType
	this.nodeValue = nodeValue
	this.nodeLeft = null;
	this.nodeRight = null;

	/*-----------------------------------------------------------------*/

	this._dump = function(nodes, edges, pCnt)
	{
		var cnt = pCnt[0];

		nodes.push('\tnode' + cnt + ' [label="' + this.nodeValue.replace('"', '\\"') + '"];');

		if(this.nodeLeft)
		{
			var CNT = ++pCnt[0];
			edges.push('\tnode' + cnt + ' -> node' + CNT + ';');
			this.nodeLeft._dump(nodes, edges, pCnt);
		}

		if(this.nodeRight)
		{
			var CNT = ++pCnt[0];
			edges.push('\tnode' + cnt + ' -> node' + CNT + ';');
			this.nodeRight._dump(nodes, edges, pCnt);
		}
	};

	/*-----------------------------------------------------------------*/

	this.dump = function()
	{
		var nodes = [];
		var edges = [];

		this._dump(nodes, edges, [0]);

		return 'digraph ast {\n\trankdir=TB;\n' + nodes.join('\n') + '\n' + edges.join('\n') + '\n}';
	};

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
