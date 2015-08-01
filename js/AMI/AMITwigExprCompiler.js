/*!
 * AMI Web Framework
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
/* amiTwigTokens                                                           */
/*-------------------------------------------------------------------------*/

$AMINamespace('amiTwigTokens', {
	/*-----------------------------------------------------------------*/

	$init: function()
	{
		this.types = {
			'or': this.LOGICAL_OR,
			'and': this.LOGICAL_AND,
			'b-or': this.BITWISE_OR,
			'b-xor': this.BITWISE_XOR,
			'b-and': this.BITWISE_AND,
			'===': this.STRICT_EQ,
			'==': this.LOOSE_EQ,
			'!==': this.STRICT_NE,
			'!=': this.LOOSE_NE,
			'<=': this.GTE,
			'>=': this.LTE,
			'<': this.GT,
			'>': this.LT,
			'is': this.IS,
			'defined': this.DEFINED,
			'null': this.NULL,
			'empty': this.EMPTY,
			'iterable': this.ITERABLE,
			'even': this.EVEN,
			'odd': this.ODD,
			'starts': this.STARTS,
			'ends': this.ENDS,
			'with': this.WITH,
			'matches': this.MATCHES,
			'in': this.IN,
			'..': this.RANGE,
			'+': this.PLUS,
			'-': this.MINUS,
			'**': this.POWER,
			'*': this.MUL,
			'//': this.DIV,
			'/': this.DIV,
			'%': this.MOD,
			'not': this.NOT,
			'.': this.DOT,

			'(': this.LP,
			')': this.RP,
		};

		this.EQ_NE_GTE_LTE_GT_LT = [
			this.STRICT_EQ,
			this.LOOSE_EQ,
			this.STRICT_NE,
			this.LOOSE_NE,
			this.GTE,
			this.LTE,
			this.GT,
			this.LT,
		];

		this.IS_XXX = [
			this.DEFINED,
			this.NULL,
			this.EMPTY,
			this.ITERABLE,
			this.EVEN,
			this.ODD
		];

		this.XXX_WITH = [
			this.STARTS,
			this.ENDS,
		];

		this.PLUS_MINUS = [
			this.PLUS,
			this.MINUS,
		];

		this.MUL_DIV_MOD = [
			this.MUL,
			this.FLOORDIV,
			this.DIV,
			this.MOD,
		];

		this.NOT_PLUS_MINUS = [
			this.NOT,
			this.PLUS,
			this.MINUS,
		];

		this.TERMINAL = [
			this.NUM,
			this.STR,
		];
	},

	/*-----------------------------------------------------------------*/

	LOGICAL_OR: 100,
	LOGICAL_AND: 101,
	BITWISE_OR: 102,
	BITWISE_XOR: 103,
	BITWISE_AND: 104,
	STRICT_EQ: 105,
	LOOSE_EQ: 106,
	STRICT_NE: 107,
	LOOSE_NE: 108,
	GTE: 109,
	LTE: 110,
	GT: 111,
	LT: 112,
	IS: 113,
	DEFINED: 114,
	NULL: 115,
	EMPTY: 116,
	ITERABLE: 117,
	EVEN: 118,
	ODD: 119,
	STARTS: 120,
	ENDS: 121,
	WITH: 122,
	MATCHES: 123,
	IN: 124,
	RANGE: 125,
	PLUS: 126,
	MINUS: 127,
	POWER: 128,
	MUL: 129,
	FLOORDIV: 130,
	DIV: 131,
	MOD: 132,
	NOT: 133,
	DOT: 134,
	
	/*-----------------------------------------------------------------*/

	LP: 200,
	RP: 201,

	/*-----------------------------------------------------------------*/

	SID: 300,
	FUN: 301,
	NUM: 302,
	STR: 303,

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* AMITwigExprTokenizer                                                    */
/*-------------------------------------------------------------------------*/

$AMIClass('AMITwigExprTokenizer', {
	/*-----------------------------------------------------------------*/

	$init: function(code, line)
	{
		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/

		var token;
		var type;

		for(var index in this.tokens)
		{
			token = this.tokens[index];
			type = amiTwigTokens.types[token];

			if(type) {
				this.types.push(type);
			} else if(_ami_internal_isNum(token)) {
				this.types.push(amiTwigTokens.NUM);
			} else if(_ami_internal_isStr(token)) {
				this.types.push(amiTwigTokens.STR);
			} else if(_ami_internal_isSId(token)) {
				this.types.push(amiTwigTokens.SID);
			} else {
				throw 'syntax error, line `' + line + '`, unknown token `' + token + '`';
			}
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	next: function()
	{
		this.i++;
	},

	/*-----------------------------------------------------------------*/

	isEmpty: function()
	{
		return this.i >= this.tokens.length;
	},

	/*-----------------------------------------------------------------*/

	peekToken: function()
	{
		return this.tokens[this.i];
	},

	/*-----------------------------------------------------------------*/

	peekType: function()
	{
		return this.types[this.i];
	},

	/*-----------------------------------------------------------------*/

	checkType: function(type)
	{
		if(this.i < this.tokens.length)
		{
			var TYPE = this.types[this.i];

			return (type instanceof Array) ? (type.indexOf(TYPE) >= 0) : (type === TYPE);
		}
		
		return false;
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* AMITwigExprCompiler                                                     */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG expression compiler
 * @see An online <a href="http://cern.ch/ami/twig/" target="_blank">demo</a>.
 * @class AMITwigExprCompiler
 * @param {String} code the code
 * @param {Number} line the line
 * @throws {String} The error description
 */

$AMIClass('AMITwigExprCompiler', /** @lends AMITwigExprCompiler# */ {
	/*-----------------------------------------------------------------*/

	$init: function(code, line)
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
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Dump the abstract abstract syntax tree to a dot diagram
	  * @returns {String} The dot diagram
	  */

	dump: function()
	{
		return this.rootNode.dump();
	},

	/*-----------------------------------------------------------------*/

	parseLogicalOr: function()
	{
		var left = this.parseLogicalAnd();

		/*---------------------------------------------------------*/
		/* LogicalOr : LogicalAnd ('or' LogicalAnd)*               */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwigTokens.LOGICAL_OR))
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
	},

	/*-----------------------------------------------------------------*/

	parseLogicalAnd: function()
	{
		var left = this.parseBitwiseOr();

		/*---------------------------------------------------------*/
		/* LogicalAnd : BitwiseOr ('and' BitwiseOr)*               */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwigTokens.LOGICAL_AND))
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
	},

	/*-----------------------------------------------------------------*/

	parseBitwiseOr: function()
	{
		var left = this.parseBitwiseXor();

		/*---------------------------------------------------------*/
		/* BitwiseOr : BitwiseXor ('b-or' BitwiseXor)*             */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwigTokens.BITWISE_OR))
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
	},

	/*-----------------------------------------------------------------*/

	parseBitwiseXor: function()
	{
		var left = this.parseBitwiseAnd();

		/*---------------------------------------------------------*/
		/* BitwiseXor : BitwiseAnd ('b-xor' BitwiseAnd)*           */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwigTokens.BITWISE_XOR))
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
	},

	/*-----------------------------------------------------------------*/

	parseBitwiseAnd: function()
	{
		var left = this.parseComp();

		/*---------------------------------------------------------*/
		/* BitwiseAnd : Comp ('b-and' Comp)*                       */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwigTokens.BITWISE_AND))
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
	},

	/*-----------------------------------------------------------------*/

	parseComp: function()
	{
		var left = this.parseAddSub();

		/*---------------------------------------------------------*/
		/* Comp : AddSub (('===' | '==' | ...) AddSub)?            */
		/*---------------------------------------------------------*/

		/**/ if(this.tokenizer.checkType(amiTwigTokens.EQ_NE_GTE_LTE_GT_LT))
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

		else if(this.tokenizer.checkType(amiTwigTokens.IS))
		{
			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			/* swap */
			var swap = node;
			/* swap */

			if(this.tokenizer.checkType(amiTwigTokens.NOT))
			{
				node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
				this.tokenizer.next();

				node.nodeLeft = swap;
				node.nodeRight = null;
			}

			if(this.tokenizer.checkType(amiTwigTokens.IS_XXX))
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

		else if(this.tokenizer.checkType(amiTwigTokens.XXX_WITH))
		{
			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken() + 'with');
			this.tokenizer.next();

			if(this.tokenizer.checkType(amiTwigTokens.WITH))
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

		else if(this.tokenizer.checkType(amiTwigTokens.MATCHES))
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

		else if(this.tokenizer.checkType(amiTwigTokens.IN))
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
	},

	/*-----------------------------------------------------------------*/

	parseAddSub: function()
	{
		var left = this.parseMulDiv();

		/*---------------------------------------------------------*/
		/* AddSub : MulDiv (('+' | '-') MulDiv)*                   */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwigTokens.PLUS_MINUS))
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
	},

	/*-----------------------------------------------------------------*/

	parseMulDiv: function()
	{
		var left = this.parsePower();

		/*---------------------------------------------------------*/
		/* MulDiv : Power (('*' | '//' | '/' | '%') Power)*        */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwigTokens.MUL_DIV_MOD))
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
	},

	/*-----------------------------------------------------------------*/

	parsePower: function()
	{
		var left = this.parseNotPlusMinus();

		/*---------------------------------------------------------*/
		/* Power : NotPlusMinus ('**' NotPlusMinus)*               */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwigTokens.POWER))
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
	},

	/*-----------------------------------------------------------------*/

	parseNotPlusMinus: function()
	{
		/*---------------------------------------------------------*/
		/* NotPlusMinus : ('!' | '-' | '+')? X                     */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwigTokens.NOT_PLUS_MINUS))
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
	},

	/*-----------------------------------------------------------------*/

	parseX: function()
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
	},

	/*-----------------------------------------------------------------*/

	parseGroup: function()
	{
		/*---------------------------------------------------------*/
		/* Group : '(' LogicalOr ')'                               */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwigTokens.LP))
		{
			this.tokenizer.next();

			var node = this.parseLogicalOr();

			if(this.tokenizer.checkType(amiTwigTokens.RP))
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
	},

	/*-----------------------------------------------------------------*/

	parseQIdFun: function()
	{
		/*---------------------------------------------------------*/
		/* QIdFun : SID('.' SID)*                                  */
		/*        | SID('.' SID)* '(' ')'                          */
		/*---------------------------------------------------------*/

		var qid = '_.';

		if(this.tokenizer.checkType(amiTwigTokens.SID))
		{
			qid += this.tokenizer.peekToken();
			this.tokenizer.next();

			while(this.tokenizer.checkType(amiTwigTokens.DOT))
			{
				qid += this.tokenizer.peekToken();
				this.tokenizer.next();

				if(this.tokenizer.checkType(amiTwigTokens.SID))
				{
					qid += this.tokenizer.peekToken();
					this.tokenizer.next();
				}
				else
				{
					throw 'syntax error, line `' + this.line + '`, id expected';
				}
			}

			if(this.tokenizer.checkType(amiTwigTokens.LP))
			{
				this.tokenizer.next();

				if(this.tokenizer.checkType(amiTwigTokens.RP))
				{
					this.tokenizer.next();
				}
				else
				{
					throw 'syntax error, line `' + this.line + '`, `)` expected';
				}

				return new AMITwigExprNode(amiTwigTokens.FUN, qid);
			}
			else
			{
				return new AMITwigExprNode(amiTwigTokens.SID, qid);
			}
		}

		/*---------------------------------------------------------*/

		return null;
	},

	/*-----------------------------------------------------------------*/

	parseTerminal: function()
	{
		/*---------------------------------------------------------*/
		/* Terminal : NUM | STR                                    */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwigTokens.TERMINAL))
		{
			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			return node;
		}

		/*---------------------------------------------------------*/

		return null;
	},

	/*-----------------------------------------------------------------*/

	parseRange: function(e)
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

		if(this.tokenizer.checkType(amiTwigTokens.TERMINAL))
		{
			var left = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			if(this.tokenizer.checkType(amiTwigTokens.RANGE))
			{
				var node = new AMITwigExprNode(((amiTwigTokens.RANGE)), this.tokenizer.peekToken());
				this.tokenizer.next();

				if(this.tokenizer.checkType(amiTwigTokens.TERMINAL))
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
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* AMITwigExprNode                                                         */
/*-------------------------------------------------------------------------*/

$AMIClass('AMITwigExprNode', {
	/*-----------------------------------------------------------------*/

	$init: function(nodeType, nodeValue)
	{
		this.nodeType = nodeType
		this.nodeValue = nodeValue
		this.nodeLeft = null;
		this.nodeRight = null;
	},

	/*-----------------------------------------------------------------*/

	_dump: function(nodes, edges, pCnt)
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
	},

	/*-----------------------------------------------------------------*/

	dump: function()
	{
		var nodes = [];
		var edges = [];

		this._dump(nodes, edges, [0]);

		return 'digraph ast {\n\trankdir=TB;\n' + nodes.join('\n') + '\n' + edges.join('\n') + '\n}';
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
