'use strict';

/*!
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig                                                                 */
/*-------------------------------------------------------------------------*/

var amiTwig = {
	version: '1.0.0'
};

/*-------------------------------------------------------------------------*/
/* exports.amiTwig                                                         */
/*-------------------------------------------------------------------------*/

if(typeof exports !== 'undefined')
{
	amiTwig.fs = require('fs');

	module.exports.amiTwig = amiTwig;
}

/*-------------------------------------------------------------------------*/

/*
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.tokenizer                                                       */
/*-------------------------------------------------------------------------*/

amiTwig.tokenizer = {
	/*---------------------------------------------------------------------*/

	tokenize: function(code, line, spaces, tokenDefs, tokenTypes, error)
	{
		if(tokenDefs.length !== tokenTypes.length)
		{
			throw '`tokenDefs.length != tokenTypes.length`';
		}

		const result_tokens = [];
		const result_types = [];
		const result_lines = [];

		let i = 0x000000000;
		const l = code.length;

		let word = '', token, c;

__l0:		while(i < l)
		{
			c = code.charAt(0);

			/*-------------------------------------------------------------*/
			/* COUNT LINES                                                 */
			/*-------------------------------------------------------------*/

			if(c === '\n')
			{
				line++;
			}

			/*-------------------------------------------------------------*/
			/* EAT SPACES                                                  */
			/*-------------------------------------------------------------*/

			if(spaces.indexOf(c) >= 0)
			{
				if(word)
				{
					if(error)
					{
						throw 'invalid token `' + word + '`';
					}

					result_tokens.push(word);
					result_types.push(-1);
					result_lines.push(line);
					word = '';
				}

				code = code.substring(1);
				i += 1;

				continue __l0;
			}

			/*-------------------------------------------------------------*/
			/* EAT REGEXES                                                 */
			/*-------------------------------------------------------------*/

			for(const j in tokenDefs)
			{
				token = this._match(code, tokenDefs[j]);

				if(token)
				{
					if(word)
					{
						if(error)
						{
							throw 'invalid token `' + word + '`';
						}

						result_tokens.push(word);
						result_types.push(-1);
						result_lines.push(line);
						word = '';
					}

					result_tokens.push(token);
					result_types.push(tokenTypes[j]);
					result_lines.push(line);

					code = code.substring(token.length);
					i += token.length;

					continue __l0;
				}
			}

			/*-------------------------------------------------------------*/
			/* EAT REMAINING CHARACTERES                                   */
			/*-------------------------------------------------------------*/

			word += c;

			code = code.substring(1);
			i += 1;

/*			continue __l0;
 */
			/*-------------------------------------------------------------*/
		}

		if(word)
		{
			if(error)
			{
				throw 'invalid token `' + word + '`';
			}

			result_tokens.push(word);
			result_types.push(-1);
			result_lines.push(line);
/*			word = '';
 */		}

		return {
			tokens: result_tokens,
			types: result_types,
			lines: result_lines,
		};
	},

	/*---------------------------------------------------------------------*/

	_match: function(s, stringOrRegExp)
	{
		let m;

		if(stringOrRegExp instanceof RegExp)
		{
			m = s.match(stringOrRegExp);

			return m !== null && this._checkNextChar(s, /*-*/m[0]/*-*/) ? /*-*/m[0]/*-*/ : null;
		}
		else
		{
			m = s.indexOf(stringOrRegExp);

			return m === 0x00 && this._checkNextChar(s, stringOrRegExp) ? stringOrRegExp : null;
		}
	},

	/*---------------------------------------------------------------------*/

	_alnum: [
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	],

	_checkNextChar: function(s, token)
	{
		const length = token.length;

		const charCode2 = s.charCodeAt(length - 0);
		const charCode1 = s.charCodeAt(length - 1);

		return isNaN(charCode2)
		       ||
		       this._alnum[charCode2] === 0
		       ||
		       this._alnum[charCode1] === 0
		;
	},

	/*---------------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

/*
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.expr                                                            */
/*-------------------------------------------------------------------------*/

amiTwig.expr = {};

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.tokens                                                     */
/*-------------------------------------------------------------------------*/

amiTwig.expr.tokens = {
	/*---------------------------------------------------------------------*/

	$init: function()
	{
		/*-----------------------------------------------------------------*/
		/* COMPOSITE TOKENS                                                */
		/*-----------------------------------------------------------------*/

		this.IS_XXX = [
			this.DEFINED,
			this.NULL,
			this.EMPTY,
			this.ITERABLE,
			this.EVEN,
			this.ODD,
		];

		this.XXX_WITH = [
			this.STARTS_WITH,
			this.ENDS_WITH,
		];

		this.PLUS_MINUS = [
			this.CONCAT,
			this.PLUS,
			this.MINUS,
		];

		this.MUL_FLDIV_DIV_MOD = [
			this.MUL,
			this.FLDIV,
			this.DIV,
			this.MOD,
		];

		this.RX = [
			this.RP,
			this.RB1,
		];

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/
	/* REAL TOKENS                                                         */
	/*---------------------------------------------------------------------*/

	LOGICAL_OR: 100,
	LOGICAL_AND: 101,
	BITWISE_OR: 102,
	BITWISE_XOR: 103,
	BITWISE_AND: 104,
	NOT: 105,
	IS: 106,
	DEFINED: 107,
	NULL: 108,
	EMPTY: 109,
	ITERABLE: 110,
	EVEN: 111,
	ODD: 112,
	CMP_OP: 113,
	STARTS_WITH: 114,
	ENDS_WITH: 115,
	MATCHES: 116,
	IN: 117,
	RANGE: 118,
	CONCAT: 119,
	PLUS: 120,
	MINUS: 121,
	POWER: 122,
	MUL: 123,
	FLDIV: 124,
	DIV: 125,
	MOD: 126,
	COLON: 127,
	DOT: 128,
	COMMA: 129,
	PIPE: 130,
	LP: 131,
	RP: 132,
	LB1: 133,
	RB1: 134,
	LB2: 135,
	RB2: 136,
	SID: 137,
	TERMINAL: 138,

	/*---------------------------------------------------------------------*/
	/* VIRTUAL TOKENS                                                      */
	/*---------------------------------------------------------------------*/

	LST: 200,
	DIC: 201,
	FUN: 202,
	VAR: 203,

	/*---------------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

amiTwig.expr.tokens.$init();

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.Tokenizer                                                  */
/*-------------------------------------------------------------------------*/

amiTwig.expr.Tokenizer = function(code, line) {
	/*---------------------------------------------------------------------*/

	this._spaces = [' ', '\t', '\n', '\r'];

	/*---------------------------------------------------------------------*/

	this._tokenDefs = [
		'or',
		'and',
		'b-or',
		'b-xor',
		'b-and',
		'not',
		'is',
		'defined',
		'null',
		'empty',
		'iterable',
		'even',
		'odd',
		'===',
		'==',
		'!==',
		'!=',
		'<=',
		'>=',
		'<',
		'>',
		/^starts\s+with/,
		/^ends\s+with/,
		'matches',
		'in',
		'..',
		'~',
		'+',
		'-',
		'**',
		'*',
		'//',
		'/',
		'%',
		':',
		'.',
		',',
		'|',
		'(',
		')',
		'[',
		']',
		'{',
		'}',
		'true',
		'false',
		/^[0-9]+\.[0-9]+/,
		/^[0-9]+/,
		/^'(\\'|[^'])*'/,
		/^"(\\"|[^"])*"/,
		/^[a-zA-Z_$][a-zA-Z0-9_$]*/,
	];

	/*---------------------------------------------------------------------*/

	this._tokenTypes = [
		amiTwig.expr.tokens.LOGICAL_OR,
		amiTwig.expr.tokens.LOGICAL_AND,
		amiTwig.expr.tokens.BITWISE_OR,
		amiTwig.expr.tokens.BITWISE_XOR,
		amiTwig.expr.tokens.BITWISE_AND,
		amiTwig.expr.tokens.NOT,
		amiTwig.expr.tokens.IS,
		amiTwig.expr.tokens.DEFINED,
		amiTwig.expr.tokens.NULL,
		amiTwig.expr.tokens.EMPTY,
		amiTwig.expr.tokens.ITERABLE,
		amiTwig.expr.tokens.EVEN,
		amiTwig.expr.tokens.ODD,
		amiTwig.expr.tokens.CMP_OP,
		amiTwig.expr.tokens.CMP_OP,
		amiTwig.expr.tokens.CMP_OP,
		amiTwig.expr.tokens.CMP_OP,
		amiTwig.expr.tokens.CMP_OP,
		amiTwig.expr.tokens.CMP_OP,
		amiTwig.expr.tokens.CMP_OP,
		amiTwig.expr.tokens.CMP_OP,
		amiTwig.expr.tokens.STARTS_WITH,
		amiTwig.expr.tokens.ENDS_WITH,
		amiTwig.expr.tokens.MATCHES,
		amiTwig.expr.tokens.IN,
		amiTwig.expr.tokens.RANGE,
		amiTwig.expr.tokens.CONCAT,
		amiTwig.expr.tokens.PLUS,
		amiTwig.expr.tokens.MINUS,
		amiTwig.expr.tokens.POWER,
		amiTwig.expr.tokens.MUL,
		amiTwig.expr.tokens.FLDIV,
		amiTwig.expr.tokens.DIV,
		amiTwig.expr.tokens.MOD,
		amiTwig.expr.tokens.COLON,
		amiTwig.expr.tokens.DOT,
		amiTwig.expr.tokens.COMMA,
		amiTwig.expr.tokens.PIPE,
		amiTwig.expr.tokens.LP,
		amiTwig.expr.tokens.RP,
		amiTwig.expr.tokens.LB1,
		amiTwig.expr.tokens.RB1,
		amiTwig.expr.tokens.LB2,
		amiTwig.expr.tokens.RB2,
		amiTwig.expr.tokens.TERMINAL,
		amiTwig.expr.tokens.TERMINAL,
		amiTwig.expr.tokens.TERMINAL,
		amiTwig.expr.tokens.TERMINAL,
		amiTwig.expr.tokens.TERMINAL,
		amiTwig.expr.tokens.TERMINAL,
		amiTwig.expr.tokens.SID,
	];

	/*---------------------------------------------------------------------*/

	this.$init = function(code, line)
	{
		/*-----------------------------------------------------------------*/

		const result = amiTwig.tokenizer.tokenize(
			code,
			line,
			this._spaces,
			this._tokenDefs,
			this._tokenTypes,
			true
		);

		/*-----------------------------------------------------------------*/

		this.tokens = result.tokens;
		this.types = result.types;

		this.i = 0;

		/*-----------------------------------------------------------------*/
	};

	/*---------------------------------------------------------------------*/

	this.next = function(n = 1)
	{
		this.i += n;
	};

	/*---------------------------------------------------------------------*/

	this.isEmpty = function()
	{
		return this.i >= this.tokens.length;
	};

	/*---------------------------------------------------------------------*/

	this.peekToken = function()
	{
		return this.tokens[this.i];
	};

	/*---------------------------------------------------------------------*/

	this.peekType = function()
	{
		return this.types[this.i];
	};

	/*---------------------------------------------------------------------*/

	this.checkType = function(type)
	{
		if(this.i < this.tokens.length)
		{
			const TYPE = this.types[this.i];

			return (type instanceof Array) ? (type.indexOf(TYPE) >= 0) : (type === TYPE);
		}

		return false;
	};

	/*---------------------------------------------------------------------*/

	this.$init(code, line);

	/*---------------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.Compiler                                                   */
/*-------------------------------------------------------------------------*/

amiTwig.expr.Compiler = function(code, line) {

	this.$init(code, line);
};

/*-------------------------------------------------------------------------*/

amiTwig.expr.Compiler.prototype = {
	/*---------------------------------------------------------------------*/

	$init: function(code, line)
	{
		/*-----------------------------------------------------------------*/

		this.tokenizer = new amiTwig.expr.Tokenizer(
			this.code = code,
			this.line = line
		);

		/*-----------------------------------------------------------------*/

		this.rootNode = this.parseFilter();

		/*-----------------------------------------------------------------*/

		if(this.tokenizer.isEmpty() === false)
		{
			throw 'syntax error, line `' + this.line + '`, unexpected token `' + this.tokenizer.peekToken() + '`';
		}

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	dump: function()
	{
		return this.rootNode.dump();
	},

	/*---------------------------------------------------------------------*/

	parseFilter: function()
	{
		let left = this.parseLogicalOr(), node, temp;

		/*-----------------------------------------------------------------*/
		/* Filter : LogicalOr ('|' Dot1)*                                  */
		/*-----------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.PIPE))
		{
			this.tokenizer.next();

			node = this.parseDot1(true);

			for(temp = node; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft);

			temp.list.unshift(left);

			left = node;
		}

		/*-----------------------------------------------------------------*/

		return left;
	},

	/*---------------------------------------------------------------------*/

	parseLogicalOr: function()
	{
		let left = this.parseLogicalAnd(), right, node;

		/*-----------------------------------------------------------------*/
		/* LogicalOr : LogicalAnd ('or' LogicalAnd)*                       */
		/*-----------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_OR))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseLogicalAnd();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*-----------------------------------------------------------------*/

		return left;
	},

	/*---------------------------------------------------------------------*/

	parseLogicalAnd: function()
	{
		let left = this.parseBitwiseOr(), right, node;

		/*-----------------------------------------------------------------*/
		/* LogicalAnd : BitwiseOr ('and' BitwiseOr)*                       */
		/*-----------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_AND))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseBitwiseOr();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*-----------------------------------------------------------------*/

		return left;
	},

	/*---------------------------------------------------------------------*/

	parseBitwiseOr: function()
	{
		let left = this.parseBitwiseXor(), right, node;

		/*-----------------------------------------------------------------*/
		/* BitwiseOr : BitwiseXor ('b-or' BitwiseXor)*                     */
		/*-----------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_OR))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseBitwiseXor();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*-----------------------------------------------------------------*/

		return left;
	},

	/*---------------------------------------------------------------------*/

	parseBitwiseXor: function()
	{
		let left = this.parseBitwiseAnd(), right, node;

		/*-----------------------------------------------------------------*/
		/* BitwiseXor : BitwiseAnd ('b-xor' BitwiseAnd)*                   */
		/*-----------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_XOR))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseBitwiseAnd();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*-----------------------------------------------------------------*/

		return left;
	},

	/*---------------------------------------------------------------------*/

	parseBitwiseAnd: function()
	{
		let left = this.parseNot(), right, node;

		/*-----------------------------------------------------------------*/
		/* BitwiseAnd : Not ('b-and' Not)*                                 */
		/*-----------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_AND))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseNot();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*-----------------------------------------------------------------*/

		return left;
	},

	/*---------------------------------------------------------------------*/

	parseNot: function()
	{
		let right, node;

		/*-----------------------------------------------------------------*/
		/* Not : 'not' Comp                                                */
		/*-----------------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwig.expr.tokens.NOT))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseComp();

			node.nodeLeft = null;
			node.nodeRight = right;

			return node;
		}

		/*-----------------------------------------------------------------*/
		/*     | Comp                                                      */
		/*-----------------------------------------------------------------*/

		return this.parseComp();
	},

	/*---------------------------------------------------------------------*/

	parseComp: function()
	{
		let left = this.parseAddSub(), right, node, swap;

		/*-----------------------------------------------------------------*/
		/* Comp : AddSub 'is' 'not'? ('defined' | 'null' | ...)            */
		/*-----------------------------------------------------------------*/

		/**/ if(this.tokenizer.checkType(amiTwig.expr.tokens.IS))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			/* swap 'is' and 'not' */
			swap = node;
			/* swap 'is' and 'not' */

			if(this.tokenizer.checkType(amiTwig.expr.tokens.NOT))
			{
				node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
				this.tokenizer.next();

				node.nodeLeft = null;
				node.nodeRight = swap;
			}

			if(this.tokenizer.checkType(amiTwig.expr.tokens.IS_XXX))
			{
				right = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
				this.tokenizer.next();

				swap.nodeLeft = left;
				swap.nodeRight = right;
			}
			else
			{
				throw 'syntax error, line `' + this.line + '`, keyword `defined`, `null`, `empty`, `iterable`, `even` or `odd` expected';
			}

			left = node;
		}

		/*-----------------------------------------------------------------*/
		/*      | AddSub ('===' | '==' | ...) AddSub                       */
		/*-----------------------------------------------------------------*/

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.CMP_OP))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*-----------------------------------------------------------------*/
		/*      | AddSub ('starts' | 'ends') `with` AddSub                 */
		/*-----------------------------------------------------------------*/

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.XXX_WITH))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*-----------------------------------------------------------------*/
		/*      | AddSub 'matches' AddSub                                  */
		/*-----------------------------------------------------------------*/

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.MATCHES))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*-----------------------------------------------------------------*/
		/*      | AddSub 'in' AddSub                                       */
		/*-----------------------------------------------------------------*/

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.IN))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*-----------------------------------------------------------------*/
		/*      | AddSub                                                   */
		/*-----------------------------------------------------------------*/

		return left;
	},

	/*---------------------------------------------------------------------*/

	parseAddSub: function()
	{
		let left = this.parseMulDiv(), right, node;

		/*-----------------------------------------------------------------*/
		/* AddSub : MulDiv (('+' | '-') MulDiv)*                           */
		/*-----------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.PLUS_MINUS))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseMulDiv();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*-----------------------------------------------------------------*/

		return left;
	},

	/*---------------------------------------------------------------------*/

	parseMulDiv: function()
	{
		let left = this.parsePlusMinus(), right, node;

		/*-----------------------------------------------------------------*/
		/* MulDiv : PlusMinus (('*' | '//' | '/' | '%') PlusMinus)*        */
		/*-----------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.MUL_FLDIV_DIV_MOD))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parsePlusMinus();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*-----------------------------------------------------------------*/

		return left;
	},

	/*---------------------------------------------------------------------*/

	parsePlusMinus: function()
	{
		let right, node;

		/*-----------------------------------------------------------------*/
		/* PlusMinus : ('-' | '+') Power                                   */
		/*-----------------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwig.expr.tokens.PLUS_MINUS))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parsePower();

			node.nodeLeft = null;
			node.nodeRight = right;

			return node;
		}

		/*-----------------------------------------------------------------*/
		/*           | Dot1                                                */
		/*-----------------------------------------------------------------*/

		return this.parsePower();
	},

	/*---------------------------------------------------------------------*/

	parsePower: function()
	{
		let left = this.parseDot1(), right, node;

		/*-----------------------------------------------------------------*/
		/* Power : Dot1 ('**' Dot1)*                                       */
		/*-----------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.POWER))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseDot1();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*-----------------------------------------------------------------*/

		return left;
	},

	/*---------------------------------------------------------------------*/

	parseDot1: function(isFilter)
	{
		const node = this.parseDot2(isFilter);

		if(node)
		{
			/*-------------------------------------------------------------*/

			let temp = node;

			for(; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft);

			/*-------------------------------------------------------------*/

			if(temp.q)
			{
				/**/ if(temp.nodeType === amiTwig.expr.tokens.FUN)
				{
					if(temp.nodeValue in amiTwig.stdlib)
					{
						temp.nodeValue = 'amiTwig.stdlib.' + temp.nodeValue;
					}
					else
					{
						temp.nodeValue = /*---*/'_.'/*---*/ + temp.nodeValue;
					}
				}
				else if(temp.nodeType === amiTwig.expr.tokens.VAR)
				{
					temp.nodeValue = /*---*/'_.'/*---*/ + temp.nodeValue;
				}

				temp.q = false;
			}

			/*-------------------------------------------------------------*/
		}

		return node;
	},

	/*---------------------------------------------------------------------*/

	parseDot2: function(isFilter)
	{
		let left = this.parseDot3(isFilter), right, node;

		/*-----------------------------------------------------------------*/
		/* Dot2 : Dot3 ('.' Dot3)*                                         */
		/*-----------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.DOT))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), '.');
			this.tokenizer.next();

			right = this.parseDot3(isFilter);

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*-----------------------------------------------------------------*/

		return left;
	},

	/*---------------------------------------------------------------------*/

	parseDot3: function(isFilter)
	{
		let left = this.parseX(isFilter), right, node;

		/*-----------------------------------------------------------------*/
		/* parseDot3 : X ('[' Filter ']')*                                 */
		/*-----------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.LB1))
		{
			this.tokenizer.next();

			right = this.parseFilter();

			if(this.tokenizer.checkType(amiTwig.expr.tokens.RB1))
			{
				this.tokenizer.next();

				node = new amiTwig.expr.Node(amiTwig.expr.tokens.DOT, '[]');

				node.nodeLeft = left;
				node.nodeRight = right;

				left = node;
			}
			else
			{
				throw 'syntax error, line `' + this.line + '`, `]` expected';
			}
		}

		/*-----------------------------------------------------------------*/
		/*         | X                                                     */
		/*-----------------------------------------------------------------*/

		return left;
	},

	/*---------------------------------------------------------------------*/

	parseX: function(isFilter)
	{
		let node;

		/*-----------------------------------------------------------------*/
		/* X : Group | Array | Object | FunVar | Terminal                  */
		/*-----------------------------------------------------------------*/

		if((node = this.parseGroup())) {
			return node;
		}

		if((node = this.parseArray())) {
			return node;
		}

		if((node = this.parseObject())) {
			return node;
		}

		if((node = this.parseFunVar(isFilter))) {
			return node;
		}

		if((node = this.parseTerminal())) {
			return node;
		}

		/*-----------------------------------------------------------------*/
		/* SYNTAX ERROR                                                    */
		/*-----------------------------------------------------------------*/

		throw 'syntax error, line `' + this.line + '`, syntax error or tuncated expression';

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	parseGroup: function()
	{
		let node;

		/*-----------------------------------------------------------------*/
		/* Group : '(' Filter ')'                                          */
		/*-----------------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwig.expr.tokens.LP))
		{
			this.tokenizer.next();

			node = this.parseFilter();

			if(this.tokenizer.checkType(amiTwig.expr.tokens.RP))
			{
				this.tokenizer.next();

				return node;
			}
			else
			{
				throw 'syntax error, line `' + this.line + '`, `)` expected';
			}
		}

		/*-----------------------------------------------------------------*/

		return null;
	},

	/*---------------------------------------------------------------------*/

	parseArray: function()
	{
		let node, list;

		/*-----------------------------------------------------------------*/
		/* Array : '[' Singlets ']'                                        */
		/*-----------------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwig.expr.tokens.LB1))
		{
			this.tokenizer.next();

			list = this._parseSinglets();

			if(this.tokenizer.checkType(amiTwig.expr.tokens.RB1))
			{
				this.tokenizer.next();

				node = new amiTwig.expr.Node(amiTwig.expr.tokens.LST, 'Array');

				node.list = list;

				return node;
			}
			else
			{
				throw 'syntax error, line `' + this.line + '`, `]` expected';
			}
		}

		/*-----------------------------------------------------------------*/

		return null;
	},

	/*---------------------------------------------------------------------*/

	parseObject: function()
	{
		let node, dict;

		/*-----------------------------------------------------------------*/
		/* Object : '{' Doublets '}'                                       */
		/*-----------------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwig.expr.tokens.LB2))
		{
			this.tokenizer.next();

			dict = this._parseDoublets();

			if(this.tokenizer.checkType(amiTwig.expr.tokens.RB2))
			{
				this.tokenizer.next();

				node = new amiTwig.expr.Node(amiTwig.expr.tokens.DIC, 'Object');

				node.dict = dict;

				return node;
			}
			else
			{
				throw 'syntax error, line `' + this.line + '`, `}` expected';
			}
		}

		/*-----------------------------------------------------------------*/

		return null;
	},

	/*---------------------------------------------------------------------*/

	parseFunVar: function(isFilter)
	{
		let node;

		if(this.tokenizer.checkType(amiTwig.expr.tokens.SID))
		{
			node = new amiTwig.expr.Node(0, isFilter ? 'filter_' + this.tokenizer.peekToken() : this.tokenizer.peekToken());

			node.q = true;

			this.tokenizer.next();

			/*-------------------------------------------------------------*/
			/* FunVar : SID '(' Singlets ')'                               */
			/*-------------------------------------------------------------*/

			/**/ if(this.tokenizer.checkType(amiTwig.expr.tokens.LP))
			{
				this.tokenizer.next();

				node.list = this._parseSinglets();

				if(this.tokenizer.checkType(amiTwig.expr.tokens.RP))
				{
					this.tokenizer.next();

					node.nodeType = amiTwig.expr.tokens.FUN;
				}
				else
				{
					throw 'syntax error, line `' + this.line + '`, `)` expected';
				}
			}

			/*-------------------------------------------------------------*/
			/*        | SID                                                */
			/*-------------------------------------------------------------*/

			else
			{
				node.nodeType = isFilter ? amiTwig.expr.tokens.FUN
				                         : amiTwig.expr.tokens.VAR
				;

				node.list = [];
			}

			/*-------------------------------------------------------------*/

			return node;
		}

		return null;
	},

	/*---------------------------------------------------------------------*/

	_parseSinglets: function()
	{
		const result = [];

		while(this.tokenizer.checkType(amiTwig.expr.tokens.RX) === false)
		{
			this._parseSinglet(result);

			if(this.tokenizer.checkType(amiTwig.expr.tokens.COMMA) === true)
			{
				this.tokenizer.next();
			}
			else
			{
				break;
			}
		}

		return result;
	},

	/*---------------------------------------------------------------------*/

	_parseDoublets: function()
	{
		const result = {};

		while(this.tokenizer.checkType(amiTwig.expr.tokens.RB2) === false)
		{
			this._parseDoublet(result);

			if(this.tokenizer.checkType(amiTwig.expr.tokens.COMMA) === true)
			{
				this.tokenizer.next();
			}
			else
			{
				break;
			}
		}

		return result;
	},

	/*---------------------------------------------------------------------*/

	_parseSinglet: function(result)
	{
		result.push(this.parseFilter());
	},

	/*---------------------------------------------------------------------*/

	_parseDoublet: function(result)
	{
		if(this.tokenizer.checkType(amiTwig.expr.tokens.TERMINAL))
		{
			const key = this.tokenizer.peekToken();
			this.tokenizer.next();

			if(this.tokenizer.checkType(amiTwig.expr.tokens.COLON))
			{
/*				const colon = this.tokenizer.peekToken();
 */				this.tokenizer.next();

				/*---------------------------------------------------------*/

				result[key] = this.parseFilter();

				/*---------------------------------------------------------*/
			}
			else
			{
				throw 'syntax error, line `' + this.line + '`, `:` expected';
			}
		}
		else
		{
			throw 'syntax error, line `' + this.line + '`, terminal expected';
		}
	},

	/*---------------------------------------------------------------------*/

	parseTerminal: function()
	{
		let left, right, node;

		/*-----------------------------------------------------------------*/
		/* Terminal : TERMINAL | RANGE                                     */
		/*-----------------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwig.expr.tokens.TERMINAL))
		{
			left = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			if(this.tokenizer.checkType(amiTwig.expr.tokens.RANGE))
			{
				node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
				this.tokenizer.next();

				if(this.tokenizer.checkType(amiTwig.expr.tokens.TERMINAL))
				{
					right = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
					this.tokenizer.next();

					node.nodeLeft = left;
					node.nodeRight = right;

					return node;
				}
			}
			else
			{
				return left;
			}
		}

		/*-----------------------------------------------------------------*/

		return null;
	},

	/*---------------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.Node                                                       */
/*-------------------------------------------------------------------------*/

amiTwig.expr.Node = function(nodeType, nodeValue) {

	this.$init(nodeType, nodeValue);
};

/*-------------------------------------------------------------------------*/

amiTwig.expr.Node.prototype = {
	/*---------------------------------------------------------------------*/

	$init: function(nodeType, nodeValue)
	{
		this.nodeType = nodeType;
		this.nodeValue = nodeValue;
		this.nodeLeft = null;
		this.nodeRight = null;
		this.list = null;
		this.dict = null;
	},

	/*---------------------------------------------------------------------*/

	_dump: function(nodes, edges, pCnt)
	{
		let CNT;

		const cnt = pCnt[0];

		nodes.push('\tnode' + cnt + ' [label="' + this.nodeValue.replace(/"/g, '\\"') + '"];');

		if(this.nodeLeft)
		{
			CNT = ++pCnt[0];
			edges.push('\tnode' + cnt + ' -> node' + CNT + ';');
			this.nodeLeft._dump(nodes, edges, pCnt);
		}

		if(this.nodeRight)
		{
			CNT = ++pCnt[0];
			edges.push('\tnode' + cnt + ' -> node' + CNT + ';');
			this.nodeRight._dump(nodes, edges, pCnt);
		}

		if(this.list)
		{
			for(const i in this.list)
			{
				CNT = ++pCnt[0];
				edges.push('\tnode' + cnt + ' -> node' + CNT + ' [label="[' + i.replace(/"/g, '\\"') + ']"];');
				this.list[i]._dump(nodes, edges, pCnt);
			}
		}

		if(this.dict)
		{
			for(const i in this.dict)
			{
				CNT = ++pCnt[0];
				edges.push('\tnode' + cnt + ' -> node' + CNT + ' [label="[' + i.replace(/"/g, '\\"') + ']"];');
				this.dict[i]._dump(nodes, edges, pCnt);
			}
		}
	},

	/*---------------------------------------------------------------------*/

	dump: function()
	{
		const nodes = [];
		const edges = [];

		this._dump(nodes, edges, [0]);

		return 'digraph ast {\n\trankdir=TB;\n' + nodes.join('\n') + '\n' + edges.join('\n') + '\n}';
	},

	/*---------------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

/*
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.tmpl                                                            */
/*-------------------------------------------------------------------------*/

amiTwig.tmpl = {};

/*-------------------------------------------------------------------------*/
/* amiTwig.tmpl.Compiler                                                   */
/*-------------------------------------------------------------------------*/

amiTwig.tmpl.Compiler = function(tmpl) {

	this.$init(tmpl);
};

/*-------------------------------------------------------------------------*/

amiTwig.tmpl.Compiler.prototype = {
	/*---------------------------------------------------------------------*/

	STATEMENT_RE: /\{%\s*([a-zA-Z]+)\s*((?:.|\n)*?)\s*%\}/,

	COMMENT_RE: /\{#\s*((?:.|\n)*?)\s*#\}/g,

	/*---------------------------------------------------------------------*/

	_count: function(s)
	{
		let result = 0;

		const l = s.length;

		for(let i = 0; i < l; i++)
		{
			if(s[i] === '\n') result++;
		}

		return result;
	},

	/*---------------------------------------------------------------------*/

	$init: function(tmpl)
	{
		/*-----------------------------------------------------------------*/

		let line = 1;

		let column;
		let COLUMN;

		/*-----------------------------------------------------------------*/

		this.rootNode = {
			line: line,
			keyword: '@root',
			expression: '',
			blocks: [{
				expression: '@true',
				list: [],
			}],
			value: '',
		};

		/*-----------------------------------------------------------------*/

		const stack1 = [this.rootNode];
		const stack2 = [0x00000000000];

		let item;

		/*-----------------------------------------------------------------*/

		for(tmpl = tmpl.replace(this.COMMENT_RE, '');; tmpl = tmpl.substr(COLUMN))
		{
			/*-------------------------------------------------------------*/

			const curr = stack1[stack1.length - 1];
			 let  indx = stack2[stack2.length - 1];

			/*-------------------------------------------------------------*/

			const m = tmpl.match(this.STATEMENT_RE);

			/*-------------------------------------------------------------*/

			if(m === null)
			{
				/*---------------------------------------------------------*/

				line += this._count(tmpl);

				/*---------------------------------------------------------*/

				curr.blocks[indx].list.push({
					line: line,
					keyword: '@text',
					expression: '',
					blocks: [],
					value: tmpl,
				});

				/*---------------------------------------------------------*/

				const errors = [];

				for(let i = stack1.length - 1; i > 0; i--)
				{
					/**/ if(stack1[i].keyword === 'if')
					{
						errors.push('missing keyword `endif`');
					}
					else if(stack1[i].keyword === 'for')
					{
					 	errors.push('missing keyword `endfor`');
					}
				}

				if(errors.length > 0)
				{
					throw 'syntax error, line `' + line + '`, ' + errors.join(', ');
				}

				/*---------------------------------------------------------*/

				break;
			}

			/*-------------------------------------------------------------*/

			const match = m[0];
			const keyword = m[1];
			const expression = m[2];

			column = m.index + 0x0000000000;
			COLUMN = m.index + match.length;

			const value = tmpl.substr(0, column);
			const VALUE = tmpl.substr(0, COLUMN);

			/*-------------------------------------------------------------*/

			line += this._count(VALUE);

			/*-------------------------------------------------------------*/

			if(value)
			{
				item = {
					line: line,
					keyword: '@text',
					expression: '',
					blocks: [],
					value: value,
				}

				curr.blocks[indx].list.push(item);
			}

			/*-------------------------------------------------------------*/

			switch(keyword)
			{
				/*---------------------------------------------------------*/

				case 'flush':
				case 'autoescape':
				case 'spaceless':
				case 'verbatim':

					/* IGNORE */

					break;

				/*---------------------------------------------------------*/

				case 'do':
				case 'set':
				case 'include':

					item = {
						line: line,
						keyword: keyword,
						expression: expression,
						blocks: [],
						value: '',
					};

					curr.blocks[indx].list.push(item);

					break;

				/*---------------------------------------------------------*/

				case 'if':
				case 'for':

					item = {
						line: line,
						keyword: keyword,
						blocks: [{
							expression: expression,
							list: [],
						}],
						value: '',
					};

					curr.blocks[indx].list.push(item);

					stack1.push(item);
					stack2.push(0x00);

					break;

				/*---------------------------------------------------------*/

				case 'elseif':

					if(curr['keyword'] !== 'if')
					{
						throw 'syntax error, line `' + line + '`, unexpected keyword `elseif`';
					}

					indx = curr.blocks.length;

					curr.blocks.push({
						expression: expression,
						list: [],
					});

					stack2[stack2.length - 1] = indx;

					break;

				/*---------------------------------------------------------*/

				case 'else':

					if(curr['keyword'] !== 'if')
					{
						throw 'syntax error, line `' + line + '`, unexpected keyword `else`';
					}

					indx = curr.blocks.length;

					curr.blocks.push({
						expression: '@true',
						list: [],
					});

					stack2[stack2.length - 1] = indx;

					break;

				/*---------------------------------------------------------*/

				case 'endif':

					if(curr['keyword'] !== 'if')
					{
						throw 'syntax error, line `' + line + '`, unexpected keyword `endif`';
					}

					stack1.pop();
					stack2.pop();

					break;

				/*---------------------------------------------------------*/

				case 'endfor':

					if(curr['keyword'] !== 'for')
					{
						throw 'syntax error, line `' + line + '`, unexpected keyword `endfor`';
					}

					stack1.pop();
					stack2.pop();

					break;

				/*---------------------------------------------------------*/

				default:

					throw 'syntax error, line `' + line + '`, unknown keyword `' + keyword + '`';

				/*---------------------------------------------------------*/
			}

			/*-------------------------------------------------------------*/
		}

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	dump: function()
	{
		return JSON.stringify(this.rootNode, null, 2);
	},

	/*---------------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

/*
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.engine                                                          */
/*-------------------------------------------------------------------------*/

amiTwig.engine = {
	/*---------------------------------------------------------------------*/

	VARIABLE_RE: /\{\{\s*(.*?)\s*\}\}/g,

	/*---------------------------------------------------------------------*/

	_render: function(result, item, dict = {})
	{
		let m;

		let expression;

		this.dict = dict;

		switch(item.keyword)
		{
			/*-------------------------------------------------------------*/
			/* DO                                                          */
			/*-------------------------------------------------------------*/

			case 'do':
			{
				/*---------------------------------------------------------*/

				amiTwig.expr.cache.eval(item.expression, item.line, dict);

				/*---------------------------------------------------------*/

				break;
			}

			/*-------------------------------------------------------------*/
			/* SET                                                         */
			/*-------------------------------------------------------------*/

			case 'set':
			{
				/*---------------------------------------------------------*/

				m = item.expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(.+)/)

				if(!m)
				{
					throw 'syntax error, line `' + item.line + '`, invalid `set` statement';
				}

				/*---------------------------------------------------------*/

				dict[m[1]] = amiTwig.expr.cache.eval(m[2], item.line, dict);

				/*---------------------------------------------------------*/

				break;
			}

			/*-------------------------------------------------------------*/
			/* @TEXT                                                       */
			/*-------------------------------------------------------------*/

			case '@text':
			{
				/*---------------------------------------------------------*/

				result.push(item.value.replace(this.VARIABLE_RE, function(match, expression) {

					let value = amiTwig.expr.cache.eval(expression, item.line, dict);

					return value !== null && value !== undefined ? value : '';
				}));

				/*---------------------------------------------------------*/

				break;
			}

			/*-------------------------------------------------------------*/
			/* IF                                                          */
			/*-------------------------------------------------------------*/

			case 'if':
			case '@root':
			{
				/*---------------------------------------------------------*/

				item.blocks.every((block) => {

					expression = block.expression;

					if(expression === '@true' || amiTwig.expr.cache.eval(expression, item.line, dict))
					{
						block.list.forEach((item) => {

							this._render(result, item, dict);
						});

						return false;
					}

					return true;
				});

				/*---------------------------------------------------------*/

				break;
			}

			/*-------------------------------------------------------------*/
			/* FOR                                                         */
			/*-------------------------------------------------------------*/

			case 'for':
			{
				/*---------------------------------------------------------*/

				m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/)

				if(!m)
				{
					throw 'syntax error, line `' + item.line + '`, invalid `for` statement';
				}

				/*---------------------------------------------------------*/

				const symb = m[1];
				const expr = m[2];

				/*---------------------------------------------------------*/

				let value = amiTwig.expr.cache.eval(expr, item.line, dict);

				/*---------------------------------------------------------*/

				const typeName = Object.prototype.toString.call(value);

				if(typeName === '[object Object]')
				{
					value = Object.keys(value);
				}
				else
				{
					if(typeName !== '[object Array]'
					   &&
					   typeName !== '[object String]'
					 ) {
						throw 'syntax error, line `' + item.line + '`, right operande not iterable';
					}
				}

				/*---------------------------------------------------------*/

				const old1 = dict[(symb)];
				const old2 = dict['loop'];

				/*---------------------------------------------------------*/

				let k = 0x0000000000;
				const l = value.length;

				dict.loop = {length: l};

				const list = item.blocks[0].list;

				for(const i in value)
				{
					dict[symb] = value[i];

					dict.loop.first = (k === (0 - 0));
					dict.loop.last = (k === (l - 1));

					dict.loop.index0 = k;
					k++;
					dict.loop.index = k;

					for(const j in list)
					{
						this._render(result, list[j], dict);
					}
				}

				/*---------------------------------------------------------*/

				dict['loop'] = old2;
				dict[(symb)] = old1;

				/*---------------------------------------------------------*/

				break;
			}

			/*-------------------------------------------------------------*/
			/* INCLUDE                                                     */
			/*-------------------------------------------------------------*/

			case 'include':
			{
				/*---------------------------------------------------------*/

				let m_1_ = item.expression, with_subexpr, with_context;

				/**/ if((m = m_1_.match(/(.+)\s+with\s+(.+)\s+only$/)))
				{
					expression = m[1];
					with_subexpr = m[2];
					with_context = false;
				}
				else if((m = m_1_.match(/(.+)\s+with\s+(.+)$/)))
				{
					expression = m[1];
					with_subexpr = m[2];
					with_context = true;
				}
				else if((m = m_1_.match(/(.+)\s+only$/)))
				{
					expression = m[1];
					with_subexpr = '{}';
					with_context = false;
				}
				else
				{
					expression = m_1_;
					with_subexpr = '{}';
					with_context = true;
				}

				/*---------------------------------------------------------*/

				const fileName = amiTwig.expr.cache.eval(expression, item.line, dict) || '';

				if(Object.prototype.toString.call(fileName) !== '[object String]')
				{
					throw 'runtime error, line `' + item.line + '`, string expected';
				}

				/*---------------------------------------------------------*/

				const variables = amiTwig.expr.cache.eval(with_subexpr, item.line, dict) || {};

				if(Object.prototype.toString.call(variables) !== '[object Object]')
				{
					throw 'runtime error, line `' + item.line + '`, object expected';
				}

				/*---------------------------------------------------------*/

				result.push(amiTwig.stdlib.include(
					fileName,
					variables,
					with_context,
					false
				));

				/*---------------------------------------------------------*/

				break;
			}

			/*-------------------------------------------------------------*/
		}

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	render: function(tmpl, dict = {})
	{
		const result = [];

		switch(Object.prototype.toString.call(tmpl))
		{
			case '[object String]':
				this._render(result, new amiTwig.tmpl.Compiler(tmpl).rootNode, dict);
				break;

			case '[object Object]':
				this._render(result, /*--------------*/tmpl/*--------------*/, dict);
				break;
		}

		return result.join('');
	},

	/*---------------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

/*
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.cache                                                      */
/*-------------------------------------------------------------------------*/

amiTwig.expr.cache = {
	/*---------------------------------------------------------------------*/

	dict: {},

	/*---------------------------------------------------------------------*/

	eval: function(expression, line, _)
	{
		/*-----------------------------------------------------------------*/

		let f;

		if(expression in this.dict)
		{
			f = this.dict[expression];
		}
		else
		{
			f = this.dict[expression] = eval(
				amiTwig.expr.interpreter.getJS(
					new amiTwig.expr.Compiler(expression, line)
				)
			);
		}

		/*-----------------------------------------------------------------*/

		if(!_) _ = {};

		return f.call(_, _);

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

/*
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.date                                                            */
/*-------------------------------------------------------------------------*/

/* TODO */

/*-------------------------------------------------------------------------*/

/*
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.ajax                                                            */
/*-------------------------------------------------------------------------*/

amiTwig.ajax = {
	/*---------------------------------------------------------------------*/

	dict: {},

	/*---------------------------------------------------------------------*/

	get: function(url, done, fail)
	{
		let txt;

		/*-----------------------------------------------------------------*/

		if(url in this.dict)
		{
			if(done)
			{
				done(this.dict[url]);
			}

			return;
		}

		/*-----------------------------------------------------------------*/

		if(amiTwig.fs)
		{
			/*-------------------------------------------------------------*/
			/* NODEJS                                                      */
			/*-------------------------------------------------------------*/

			try
			{
				txt = this.dict[url] = amiTwig.fs.readFileSync(url, 'utf8');

				if(done)
				{
					done(txt);
				}
			}
			catch(err)
			{
				if(fail)
				{
					fail(err);
				}
			}

			/*-------------------------------------------------------------*/
		}
		else
		{
			/*-------------------------------------------------------------*/
			/* BROWSER                                                     */
			/*-------------------------------------------------------------*/

			const xmlHttpRequest = new XMLHttpRequest();

			xmlHttpRequest.open('GET', url, false);
			xmlHttpRequest.send();

			/*-------------------------------------------------------------*/

			if(xmlHttpRequest.status === 200)
			{
				txt = this.dict[url] = xmlHttpRequest.responseText;

				if(done)
				{
					done(txt);
				}
			}
			else
			{
				txt = /**************/ xmlHttpRequest.responseText;

				if(fail)
				{
					fail(txt);
				}
			}

			/*-------------------------------------------------------------*/
		}

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

/*
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.stdlib                                                          */
/*-------------------------------------------------------------------------*/

amiTwig.stdlib = {
	/*---------------------------------------------------------------------*/
	/* VARIABLES                                                           */
	/*---------------------------------------------------------------------*/

	'isUndefined': function(x)
	{
		return x === undefined;
	},

	/*---------------------------------------------------------------------*/

	'isDefined': function(x)
	{
		return x !== undefined;
	},

	/*---------------------------------------------------------------------*/

	'isNull': function(x)
	{
		return x === null;
	},

	/*---------------------------------------------------------------------*/

	'isNotNull': function(x)
	{
		return x !== null;
	},

	/*---------------------------------------------------------------------*/

	'isEmpty': function(x)
	{
		if(x === null
		   ||
		   x === false
		   ||
		   x === ((''))
		 ) {
			return true;
		}

		const typeName = Object.prototype.toString.call(x);

		return (typeName === '[object Array]' && x.length === 0)
		       ||
		       (typeName === '[object Object]' && Object.keys(x).length === 0)
		;
	},

	/*---------------------------------------------------------------------*/

	'isNumber': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Number]';
	},

	/*---------------------------------------------------------------------*/

	'isString': function(x)
	{
		return Object.prototype.toString.call(x) === '[object String]';
	},

	/*---------------------------------------------------------------------*/

	'isArray': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Array]';
	},

	/*---------------------------------------------------------------------*/

	'isObject': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Object]';
	},

	/*---------------------------------------------------------------------*/

	'isIterable': function(x)
	{
		const typeName = Object.prototype.toString.call(x);

		return typeName === '[object String]'
		       ||
		       typeName === '[object Array]'
		       ||
		       typeName === '[object Object]'
		;
	},

	/*---------------------------------------------------------------------*/

	'isEven': function(x)
	{
		return this.isNumber(x) && (x & 1) === 0;
	},

	/*---------------------------------------------------------------------*/

	'isOdd': function(x)
	{
		return this.isNumber(x) && (x & 1) === 1;
	},

	/*---------------------------------------------------------------------*/
	/* ITERABLES                                                           */
	/*---------------------------------------------------------------------*/

	'isInObject': function(x, y)
	{
		if(this.isArray(y)
		   ||
		   this.isString(y)
		 ) {
			return y.indexOf(x) >= 0;
		}

		if(this.isObject(y))
		{
			return x in y;
		}

		return false;
	},

	/*---------------------------------------------------------------------*/

	'isInRange': function(x, x1, x2)
	{
		if(this.isNumber(x1)
		   &&
		   this.isNumber(x2)
		 ) {
			return (/*---*/x/*---*/ >= /*---*/x1/*---*/)
			       &&
			       (/*---*/x/*---*/ <= /*---*/x2/*---*/)
			;
		}

		if(this.isString(x1) && x1.length === 1
		   &&
		   this.isString(x2) && x2.length === 1
		 ) {
			return (x.charCodeAt(0) >= x1.charCodeAt(0))
			       &&
			       (x.charCodeAt(0) <= x2.charCodeAt(0))
			;
		}

		return false;
	},

	/*---------------------------------------------------------------------*/

	'range': function(x1, x2, step = 1)
	{
		const result = [];

		/**/ if(this.isNumber(x1)
		        &&
		        this.isNumber(x2)
		 ) {
			for(let i = /*---*/x1/*---*/; i <= /*---*/x2/*---*/; i += step)
			{
				result.push(/*---------------*/(i));
			}
		}
		else if(this.isString(x1) && x1.length === 1
		        &&
		        this.isString(x2) && x2.length === 1
		 ) {
			for(let i = x1.charCodeAt(0); i <= x2.charCodeAt(0); i += step)
			{
				result.push(String.fromCharCode(i));
			}
		}

		return result;
	},

	/*---------------------------------------------------------------------*/

	'filter_length': function(x)
	{
		if(this.isString(x)
		   ||
		   this.isArray(x)
		 ) {
			return x.length;
		}

		if(this.isObject(x))
		{
			return Object.keys(x).length;
		}

		return 0;
	},

	/*---------------------------------------------------------------------*/

	'filter_first': function(x)
	{
		return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[0x0000000000] : '';
	},

	/*---------------------------------------------------------------------*/

	'filter_last': function(x)
	{
		return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[x.length - 1] : '';
	},

	/*---------------------------------------------------------------------*/

	'filter_slice': function(x, idx1, idx2)
	{
		return (this.isString(x) || this.isArray(x)) ? x.slice(idx1, idx2) : null;
	},

	/*---------------------------------------------------------------------*/

	'filter_merge': function()
	{
		if(arguments.length > 1)
		{
			/*-------------------------------------------------------------*/

			if(this.isString(arguments[0]))
			{
				const L = [];

				for(const i in arguments)
				{
					const item = arguments[i];

					if(!this.isString(item))
					{
						return null;
					}

					L.push(arguments[i]);
				}

				return L.join('');
			}

			/*-------------------------------------------------------------*/

			if(this.isArray(arguments[0]))
			{
				const L = [];

				for(const i in arguments)
				{
					const item = arguments[i];

					if(!this.isArray(item))
					{
						return null;
					}

					for(const j in item) L.push(item[j]);
				}

				return L;
			}

			/*-------------------------------------------------------------*/

			if(this.isObject(arguments[0]))
			{
				const D = {};

				for(const i in arguments)
				{
					const item = arguments[i];

					if(!this.isObject(item))
					{
						return null;
					}

					for(const j in item) D[j] = item[j];
				}

				return D;
			}

			/*-------------------------------------------------------------*/
		}

		return null;
	},

	/*---------------------------------------------------------------------*/

	'filter_sort': function(x)
	{
		return this.isArray(x) ? x.sort() : [];
	},

	/*---------------------------------------------------------------------*/

	'filter_reverse': function(x)
	{
		return this.isArray(x) ? x.reverse() : [];
	},

	/*---------------------------------------------------------------------*/

	'filter_join': function(x, sep)
	{
		return this.isArray(x) ? x.join(sep) : '';
	},

	/*---------------------------------------------------------------------*/

	'filter_keys': function(x)
	{
		return this.isObject(x) ? Object.keys(x) : [];
	},

	/*---------------------------------------------------------------------*/
	/* STRINGS                                                             */
	/*---------------------------------------------------------------------*/

	'startsWith': function(s1, s2)
	{
		if(this.isString(s1)
		   &&
		   this.isString(s2)
		 ) {
			const base = 0x0000000000000000000;

			return s1.indexOf(s2, base) === base;
		}

		return false;
	},

	/*---------------------------------------------------------------------*/

	'endsWith': function(s1, s2)
	{
		if(this.isString(s1)
		   &&
		   this.isString(s2)
		 ) {
			const base = s1.length - s2.length;

			return s1.indexOf(s2, base) === base;
		}

		return false;
	},

	/*---------------------------------------------------------------------*/

	'match': function(s, regex)
	{
		if(this.isString(((s)))
		   &&
		   this.isString(regex)
		 ) {
			const idx1 = regex.  indexOf  ('/');
			const idx2 = regex.lastIndexOf('/');

			if(idx1 === 0 || idx1 < idx2)
			{
				try
				{
					return new RegExp(regex.substring(idx1 + 1, idx2), regex.substring(idx2 + 1)).test(s);
				}
				catch(err)
				{
					/* IGNORE */
				}
			}
		}

		return false;
	},

	/*---------------------------------------------------------------------*/

	'filter_default': function(s1, s2)
	{
		return s1 || s2 || '';
	},

	/*---------------------------------------------------------------------*/

	'filter_lower': function(s)
	{
		return this.isString(s) ? s.toLowerCase() : '';
	},

	/*---------------------------------------------------------------------*/

	'filter_upper': function(s)
	{
		return this.isString(s) ? s.toUpperCase() : '';
	},

	/*---------------------------------------------------------------------*/

	'filter_capitalize': function(s)
	{
		if(this.isString(s))
		{
			return s.trim().toLowerCase().replace(/^\S/g, function(c) {

				return c.toUpperCase();
			});
		}

		return '';
	},

	/*---------------------------------------------------------------------*/

	'filter_title': function(s)
	{
		if(this.isString(s))
		{
			return s.trim().toLowerCase().replace(/(?:^|\s)\S/g, function(c) {

				return c.toUpperCase();
			});
		}

		return '';
	},

	/*---------------------------------------------------------------------*/

	'filter_trim': function(s)
	{
		return this.isString(s) ? s.trim()
		                        : ''
		;
	},

	/*---------------------------------------------------------------------*/

	'_replace': function(s, oldStrs, newStrs)
	{
		const result = [];

		const l = (((s))).length;
		const m = oldStrs.length;
		const n = newStrs.length;

		if(m != n)
		{
			throw 'internal error';
		}

__l0:		for(let i = 0; i < l; i += 0)
		{
			const p = s.substring(i);

			for(let j = 0; j < m; j += 1)
			{
				if(p.indexOf(oldStrs[j]) === 0)
				{
					result.push(newStrs[j]);

					i += oldStrs[j].length;

					continue __l0;
				}
			}

			result.push(s.charAt(i++));
		}

		return result.join('');
	},

	/*---------------------------------------------------------------------*/

	'_textToHtmlX': ['&'    , '"'     , '<'   , '>'   ],
	'_textToHtmlY': ['&amp;', '&quot;', '&lt;', '&gt;'],

	/*---------------------------------------------------------------------*/

	'_textToStringX': ['\\'  , '\n' , '"'  , '\''  ],
	'_textToStringY': ['\\\\', '\\n', '\\"', '\\\''],

	/*---------------------------------------------------------------------*/

	'_textToJsonStringX': ['\\'  , '\n' , '"'  ],
	'_textToJsonStringY': ['\\\\', '\\n', '\\"'],

	/*---------------------------------------------------------------------*/

	'filter_escape': function(s, mode)
	{
		if(this.isString(s))
		{
			switch(mode || 'html')
			{
				case 'html':
				case 'html_attr':
					return this._replace(s, this._textToHtmlX, this._textToHtmlY);

				case 'js':
				case 'string':
					return this._replace(s, this._textToStringX, this._textToStringY);

				case 'json':
					return this._replace(s, this._textToJsonStringX, this._textToJsonStringY);

				case 'url':
					return encodeURIComponent(s);

				default:
					return s;
			}
		}

		return '';
	},

	/*---------------------------------------------------------------------*/

	'filter_url_encode': function(s)
	{
		return this.isString(s) ? encodeURIComponent(s)
		                        : ''
		;
	},

	/*---------------------------------------------------------------------*/

	'filter_nl2br': function(s)
	{
		return this.isString(s) ? s.replace(/\n/g, '<br/>')
		                        : ''
		;
	},

	/*---------------------------------------------------------------------*/

	'filter_raw': function(s)
	{
		return this.isString(s) ? s
		                        : ''
		;
	},

	/*---------------------------------------------------------------------*/

	'filter_replace': function(s, dict)
	{
		return this.isString(s) && this.isObject(dict) ? this._replace(s, Object.keys(dict), Object.values(dict))
		                                               : ''
		;
	},

	/*---------------------------------------------------------------------*/

	'filter_split': function(s, sep, max)
	{
		return this.isString(s) ? s.split(sep, max)
		                        : []
		;
	},

	/*---------------------------------------------------------------------*/
	/* NUMBERS                                                             */
	/*---------------------------------------------------------------------*/

	'filter_abs': function(x)
	{
		return Math.abs(x);
	},

	/*---------------------------------------------------------------------*/

	'filter_round': function(x, mode)
	{
		switch(mode)
		{
			case 'ceil':
				return Math.ceil(x);

			case 'floor':
				return Math.floor(x);

			default:
				return Math.round(x);
		}
	},

	/*---------------------------------------------------------------------*/

	'min': function()
	{
		/*-----------------------------------------------------------------*/

		const args = (arguments.length === 1) && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0]
		                                                                                                     : arguments
		;

		/*-----------------------------------------------------------------*/

		let result = Number.POSITIVE_INFINITY;

		for(const i in args)
		{
			if(!this.isNumber(args[i]))
			{
				return Number.NaN;
			}

			if(result > args[i])
			{
				result = args[i];
			}
		}

		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/

	'max': function()
	{
		/*-----------------------------------------------------------------*/

		const args = (arguments.length === 1) && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0]
		                                                                                                     : arguments
		;

		/*-----------------------------------------------------------------*/

		let result = Number.NEGATIVE_INFINITY;

		for(const i in args)
		{
			if(!this.isNumber(args[i]))
			{
				return Number.NaN;
			}

			if(result < args[i])
			{
				result = args[i];
			}
		}

		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/
	/* RANDOM                                                              */
	/*---------------------------------------------------------------------*/

	'random': function(x)
	{
		const y = Math.random();

		if(x)
		{
			if(this.isArray(x)
			   ||
			   this.isObject(x)
			 ) {
			 	const X = Object.keys(x);

				return x[
					X[Math.floor(X.length * y)]
				];
			}

			if(this.isString(x))
			{
				return x[Math.floor(x.length * y)];
			}

			if(this.isNumber(x))
			{
				return Math.floor(x * y);
			}
		}

		x = Number.MAX_SAFE_INTEGER;

		return Math.floor(x * y);
	},

	/*---------------------------------------------------------------------*/
	/* JSON                                                                */
	/*---------------------------------------------------------------------*/

	'filter_json_encode': function(x, indent)
	{
		return JSON.stringify(x, null, this.isNumber(indent) ? indent : 2);
	},

	/*---------------------------------------------------------------------*/

	'filter_json_jspath': function(x, path)
	{
		return typeof JSPath !== 'undefined' ? JSPath.apply(path, x)
		                                     : []
		;
	},

	/*---------------------------------------------------------------------*/
	/* TEMPLATES                                                           */
	/*---------------------------------------------------------------------*/

	'include': function(fileName, variables = {}, withContext = true, ignoreMissing = false)
	{
		const temp = {};

		/*-----------------------------------------------------------------*/

		if(withContext)
		{
			for(const i in amiTwig.engine.dict)
			{
				temp[i] = amiTwig.engine.dict[i];
			}
		}

		if(variables)
		{
			for(const i in /*-*/variables/*-*/)
			{
				temp[i] = /*-*/variables/*-*/[i];
			}
		}

		/*-----------------------------------------------------------------*/

		let result = '';

		amiTwig.ajax.get(
			fileName,
			function(data)
			{
				result = amiTwig.engine.render(data, temp);
			},
			function(/**/)
			{
				if(!ignoreMissing)
				{
					throw 'runtime error, could not open `' + fileName + '`';
				}
			}
		);

		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

amiTwig.stdlib.filter_e = amiTwig.stdlib.filter_escape;

/*-------------------------------------------------------------------------*/

/*
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.interpreter                                                */
/*-------------------------------------------------------------------------*/

amiTwig.expr.interpreter = {
	/*---------------------------------------------------------------------*/

	_getJS: function(node)
	{
		let L;
		let x;
		let left;
		let right;
		let operator;

		switch(node.nodeType)
		{
			/*-------------------------------------------------------------*/
			/* LST                                                         */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.LST:
				/*---------------------------------------------------------*/

				L = [];

				for(const i in node.list)
				{
					L.push(/*-----*/ this._getJS(node.list[i]));
				}

				/*---------------------------------------------------------*/

				return '[' + L.join(',') + ']';

			/*-------------------------------------------------------------*/
			/* DIC                                                         */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.DIC:
				/*---------------------------------------------------------*/

				L = [];
	
				for(const i in node.dict)
				{
					L.push(i + ':' + this._getJS(node.dict[i]));
				}

				/*---------------------------------------------------------*/

				return '{' + L.join(',') + '}';

			/*-------------------------------------------------------------*/
			/* FUN                                                         */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.FUN:
		 		/*---------------------------------------------------------*/

				L = [];

				for(const i in node.list)
				{
					L.push(this._getJS(node.list[i]));
				}

			 	/*---------------------------------------------------------*/

				return node.nodeValue + '(' + L.join(',') + ')';

			/*-------------------------------------------------------------*/
			/* VAR                                                         */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.VAR:
				/*---------------------------------------------------------*/

				L = [];

				for(const i in node.list)
				{
					L.push('[' + this._getJS(node.list[i]) + ']');
				}

				/*---------------------------------------------------------*/

				return L.length > 0 ? node.nodeValue + L.join('') : node.nodeValue;

			/*-------------------------------------------------------------*/
			/* TERMINAL                                                    */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.TERMINAL:

				return node.nodeValue;

			/*-------------------------------------------------------------*/
			/* IS                                                          */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.IS:

				left = this._getJS(node.nodeLeft);

				switch(node.nodeRight.nodeType)
				{
					case amiTwig.expr.tokens.DEFINED:
						return 'amiTwig.stdlib.isDefined(' + left + ')';

					case amiTwig.expr.tokens.NULL:
						return 'amiTwig.stdlib.isNull(' + left + ')';

					case amiTwig.expr.tokens.EMPTY:
						return 'amiTwig.stdlib.isEmpty(' + left + ')';

					case amiTwig.expr.tokens.ITERABLE:
						return 'amiTwig.stdlib.isIterable(' + left + ')';

					case amiTwig.expr.tokens.EVEN:
						return 'amiTwig.stdlib.isEven(' + left + ')';

					case amiTwig.expr.tokens.ODD:
						return 'amiTwig.stdlib.isOdd(' + left + ')';

					default:
						throw 'internal error';
				}

			/*-------------------------------------------------------------*/
			/* IN                                                          */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.IN:

				if(node.nodeRight.nodeType !== amiTwig.expr.tokens.RANGE)
				{
					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'amiTwig.stdlib.isInObject(' + left + ',' + right + ')';
				}
				else
				{
					x = this._getJS(node.nodeLeft);

					left = node.nodeRight.nodeLeft.nodeValue;
					right = node.nodeRight.nodeRight.nodeValue;

					return 'amiTwig.stdlib.isInRange(' + x + ',' + left + ',' + right + ')';
				}

			/*-------------------------------------------------------------*/
			/* STARTS_WITH                                                 */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.STARTS_WITH:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.startsWith(' + left + ',' + right + ')';

			/*-------------------------------------------------------------*/
			/* ENDS_WITH                                                   */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.ENDS_WITH:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.endsWith(' + left + ',' + right + ')';

			/*-------------------------------------------------------------*/
			/* MATCHES                                                     */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.MATCHES:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.match(' + left + ',' + right + ')';

			/*-------------------------------------------------------------*/
			/* RANGE                                                       */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.RANGE:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.range(' + left + ',' + right + ')';

			/*-------------------------------------------------------------*/
			/* DOT                                                         */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.DOT:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				if(node.nodeValue[0] === '.')
				{
					return left + '.' + right;
				}
				else
				{
					return left + '[' + right + ']';
				}

			/*-------------------------------------------------------------*/
			/* FLDIV                                                       */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.FLDIV:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'Math.floor(' + left + '/' + right + ')';

			/*-------------------------------------------------------------*/
			/* POWER                                                       */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.POWER:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'Math.pow(' + left + ',' + right + ')';

			/*-------------------------------------------------------------*/

			default:
				/*---------------------------------------------------------*/
				/* UNIARY OPERATOR                                         */
				/*---------------------------------------------------------*/

				if(node.nodeLeft === null
				   &&
				   node.nodeRight !== null
				 ) {
					operator = (node.nodeType !== amiTwig.expr.tokens.NOT) ? node.nodeValue : '!';

					return operator + '(' + this._getJS(node.nodeRight) + ')';
				}

				if(node.nodeLeft !== null
				   &&
				   node.nodeRight === null
				 ) {
					operator = (node.nodeType !== amiTwig.expr.tokens.NOT) ? node.nodeValue : '!';

					return '(' + this._getJS(node.nodeLeft) + ')' + operator;
				}

				/*---------------------------------------------------------*/
				/* BINARY OPERATOR                                         */
				/*---------------------------------------------------------*/

				if(node.nodeLeft !== null
				   &&
				   node.nodeRight !== null
				 ) {
					switch(node.nodeType)
					{
						/*-------------------------------------------------*/

						case amiTwig.expr.tokens.LOGICAL_OR:
							operator = '||';
							break;

						/*-------------------------------------------------*/

						case amiTwig.expr.tokens.LOGICAL_AND:
							operator = '&&';
							break;

						/*-------------------------------------------------*/

						case amiTwig.expr.tokens.BITWISE_OR:
							operator = '|';
							break;

						/*-------------------------------------------------*/

						case amiTwig.expr.tokens.BITWISE_XOR:
							operator = '^';
							break;

						/*-------------------------------------------------*/

						case amiTwig.expr.tokens.BITWISE_AND:
							operator = '&';
							break;

						/*-------------------------------------------------*/

						case amiTwig.expr.tokens.CONCAT:
							operator = '+';
							break;

						/*-------------------------------------------------*/

						default:
							operator = node.nodeValue;
							break;

						/*-------------------------------------------------*/
					}

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return '(' + left + operator + right + ')';
				}

			/*-------------------------------------------------------------*/
		}

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	getJS: function(expr)
	{
		return '(function(_) { return ' + this._getJS(expr.rootNode) + '; })';
	},

	/*---------------------------------------------------------------------*/

	eval: function(expr, _)
	{
		if(!_) _ = {};

		return eval(this.getJS(expr)).call(_, _);
	},

	/*---------------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

(function() {

var SYNTAX = {
        PATH            : 1,
        SELECTOR        : 2,
        OBJ_PRED        : 3,
        POS_PRED        : 4,
        LOGICAL_EXPR    : 5,
        COMPARISON_EXPR : 6,
        MATH_EXPR       : 7,
        CONCAT_EXPR     : 8,
        UNARY_EXPR      : 9,
        POS_EXPR        : 10,
        LITERAL         : 11
    };

// parser

var parse = (function() {

    var TOKEN = {
            ID    : 1,
            NUM   : 2,
            STR   : 3,
            BOOL  : 4,
            NULL  : 5,
            PUNCT : 6,
            EOP   : 7
        },
        MESSAGES = {
            UNEXP_TOKEN : 'Unexpected token "%0"',
            UNEXP_EOP   : 'Unexpected end of path'
        };

    var path, idx, buf, len;

    function parse(_path) {
        path = _path.split('');
        idx = 0;
        buf = null;
        len = path.length;

        var res = parsePathConcatExpr(),
            token = lex();

        if(token.type !== TOKEN.EOP) {
            throwUnexpected(token);
        }

        return res;
    }

    function parsePathConcatExpr() {
        var expr = parsePathConcatPartExpr(),
            operands;

        while(match('|')) {
            lex();
            (operands || (operands = [expr])).push(parsePathConcatPartExpr());
        }

        return operands?
            {
                type : SYNTAX.CONCAT_EXPR,
                args : operands
            } :
            expr;
    }

    function parsePathConcatPartExpr() {
        return match('(')?
            parsePathGroupExpr() :
            parsePath();
    }

    function parsePathGroupExpr() {
        expect('(');
        var expr = parsePathConcatExpr();
        expect(')');

        var parts = [],
            part;
        while((part = parsePredicate())) {
            parts.push(part);
        }

        if(!parts.length) {
            return expr;
        }
        else if(expr.type === SYNTAX.PATH) {
            expr.parts = expr.parts.concat(parts);
            return expr;
        }

        parts.unshift(expr);

        return {
            type  : SYNTAX.PATH,
            parts : parts
        };
    }

    function parsePredicate() {
        if(match('[')) {
            return parsePosPredicate();
        }

        if(match('{')) {
            return parseObjectPredicate();
        }

        if(match('(')) {
            return parsePathGroupExpr();
        }
    }

    function parsePath() {
        if(!matchPath()) {
            throwUnexpected(lex());
        }

        var fromRoot = false,
            subst;

        if(match('^')) {
            lex();
            fromRoot = true;
        }
        else if(matchSubst()) {
            subst = lex().val.substr(1);
        }

        var parts = [],
            part;
        while((part = parsePathPart())) {
            parts.push(part);
        }

        return {
            type     : SYNTAX.PATH,
            fromRoot : fromRoot,
            subst    : subst,
            parts    : parts
        };
    }

    function parsePathPart() {
        return matchSelector()?
            parseSelector() :
            parsePredicate();
    }

    function parseSelector() {
        var selector = lex().val,
            token = lookahead(),
            prop;

        if(match('*') || token.type === TOKEN.ID || token.type === TOKEN.STR) {
            prop = lex().val;
        }

        return {
            type     : SYNTAX.SELECTOR,
            selector : selector,
            prop     : prop
        };
    }

    function parsePosPredicate() {
        expect('[');
        var expr = parsePosExpr();
        expect(']');

        return {
            type : SYNTAX.POS_PRED,
            arg  : expr
        };
    }

    function parseObjectPredicate() {
        expect('{');
        var expr = parseLogicalORExpr();
        expect('}');

        return {
            type : SYNTAX.OBJ_PRED,
            arg  : expr
        };
    }

    function parseLogicalORExpr() {
        var expr = parseLogicalANDExpr(),
            operands;

        while(match('||')) {
            lex();
            (operands || (operands = [expr])).push(parseLogicalANDExpr());
        }

        return operands?
            {
                type : SYNTAX.LOGICAL_EXPR,
                op   : '||',
                args : operands
            } :
            expr;
    }

    function parseLogicalANDExpr() {
        var expr = parseEqualityExpr(),
            operands;

        while(match('&&')) {
            lex();
            (operands || (operands = [expr])).push(parseEqualityExpr());
        }

        return operands?
            {
                type : SYNTAX.LOGICAL_EXPR,
                op   : '&&',
                args : operands
            } :
            expr;
    }

    function parseEqualityExpr() {
        var expr = parseRelationalExpr();

        while(
            match('==') || match('!=') || match('===') || match('!==') ||
            match('^==') || match('==^') ||match('^=') || match('=^') ||
            match('$==') || match('==$') || match('$=') || match('=$') ||
            match('*==') || match('==*')|| match('*=') || match('=*')
        ) {
            expr = {
                type : SYNTAX.COMPARISON_EXPR,
                op   : lex().val,
                args : [expr, parseEqualityExpr()]
            };
        }

        return expr;
    }

    function parseRelationalExpr() {
        var expr = parseAdditiveExpr();

        while(match('<') || match('>') || match('<=') || match('>=')) {
            expr = {
                type : SYNTAX.COMPARISON_EXPR,
                op   : lex().val,
                args : [expr, parseRelationalExpr()]
            };
        }

        return expr;
    }

    function parseAdditiveExpr() {
        var expr = parseMultiplicativeExpr();

        while(match('+') || match('-')) {
            expr = {
                type : SYNTAX.MATH_EXPR,
                op   : lex().val,
                args : [expr, parseMultiplicativeExpr()]
            };
        }

        return expr;
    }

    function parseMultiplicativeExpr() {
        var expr = parseUnaryExpr();

        while(match('*') || match('/') || match('%')) {
            expr = {
                type : SYNTAX.MATH_EXPR,
                op   : lex().val,
                args : [expr, parseMultiplicativeExpr()]
            };
        }

        return expr;
    }

    function parsePosExpr() {
        if(match(':')) {
            lex();
            return {
                type  : SYNTAX.POS_EXPR,
                toIdx : parseUnaryExpr()
            };
        }

        var fromExpr = parseUnaryExpr();
        if(match(':')) {
            lex();
            if(match(']')) {
                return {
                    type    : SYNTAX.POS_EXPR,
                    fromIdx : fromExpr
                };
            }

            return {
                type    : SYNTAX.POS_EXPR,
                fromIdx : fromExpr,
                toIdx   : parseUnaryExpr()
            };
        }

        return {
            type : SYNTAX.POS_EXPR,
            idx  : fromExpr
        };
    }

    function parseUnaryExpr() {
        if(match('!') || match('-')) {
            return {
                type : SYNTAX.UNARY_EXPR,
                op   : lex().val,
                arg  : parseUnaryExpr()
            };
        }

        return parsePrimaryExpr();
    }

    function parsePrimaryExpr() {
        var token = lookahead(),
            type = token.type;

        if(type === TOKEN.STR || type === TOKEN.NUM || type === TOKEN.BOOL || type === TOKEN.NULL) {
            return {
                type : SYNTAX.LITERAL,
                val  : lex().val
            };
        }

        if(matchPath()) {
            return parsePath();
        }

        if(match('(')) {
            return parseGroupExpr();
        }

        return throwUnexpected(lex());
    }

    function parseGroupExpr() {
        expect('(');
        var expr = parseLogicalORExpr();
        expect(')');

        return expr;
    }

    function match(val) {
        var token = lookahead();
        return token.type === TOKEN.PUNCT && token.val === val;
    }

    function matchPath() {
        return matchSelector() || matchSubst() || match('^');
    }

    function matchSelector() {
        var token = lookahead();
        if(token.type === TOKEN.PUNCT) {
            var val = token.val;
            return val === '.' || val === '..';
        }

        return false;
    }

    function matchSubst() {
        var token = lookahead();
        return token.type === TOKEN.ID && token.val[0] === '$';
    }

    function expect(val) {
        var token = lex();
        if(token.type !== TOKEN.PUNCT || token.val !== val) {
            throwUnexpected(token);
        }
    }

    function lookahead() {
        if(buf !== null) {
            return buf;
        }

        var pos = idx;
        buf = advance();
        idx = pos;

        return buf;
    }

    function advance() {
        while(isWhiteSpace(path[idx])) {
            ++idx;
        }

        if(idx >= len) {
            return {
                type  : TOKEN.EOP,
                range : [idx, idx]
            };
        }

        var token = scanPunctuator();
        if(token ||
                (token = scanId()) ||
                (token = scanString()) ||
                (token = scanNumeric())) {
            return token;
        }

        token = { range : [idx, idx] };
        idx >= len?
            token.type = TOKEN.EOP :
            token.val = path[idx];

        throwUnexpected(token);
    }

    function lex() {
        var token;

        if(buf) {
            idx = buf.range[1];
            token = buf;
            buf = null;
            return token;
        }

        return advance();
    }

    function isDigit(ch) {
        return '0123456789'.indexOf(ch) >= 0;
    }

    function isWhiteSpace(ch) {
        return ' \r\n\t'.indexOf(ch) > -1;
    }

    function isIdStart(ch) {
        return ch === '$' || ch === '@' || ch === '_' || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
    }

    function isIdPart(ch) {
        return isIdStart(ch) || (ch >= '0' && ch <= '9');
    }

    function scanId() {
        var ch = path[idx];

        if(!isIdStart(ch)) {
            return;
        }

        var start = idx,
            id = ch;

        while(++idx < len) {
            ch = path[idx];
            if(!isIdPart(ch)) {
                break;
            }
            id += ch;
        }

        switch(id) {
            case 'true':
            case 'false':
                return {
                    type  : TOKEN.BOOL,
                    val   : id === 'true',
                    range : [start, idx]
                };

            case 'null':
                return {
                    type  : TOKEN.NULL,
                    val   : null,
                    range : [start, idx]
                };

            default:
                return {
                    type  : TOKEN.ID,
                    val   : id,
                    range : [start, idx]
                };
        }
    }

    function scanString() {
        if(path[idx] !== '"' && path[idx] !== '\'') {
            return;
        }

        var orig = path[idx],
            start = ++idx,
            str = '',
            eosFound = false,
            ch;

        while(idx < len) {
            ch = path[idx++];
            if(ch === '\\') {
                ch = path[idx++];
            }
            else if((ch === '"' || ch === '\'') && ch === orig) {
                eosFound = true;
                break;
            }
            str += ch;
        }

        if(eosFound) {
            return {
                type : TOKEN.STR,
                val : str,
                range : [start, idx]
            };
        }
    }

    function scanNumeric() {
        var start = idx,
            ch = path[idx],
            isFloat = ch === '.';

        if(isFloat || isDigit(ch)) {
            var num = ch;
            while(++idx < len) {
                ch = path[idx];
                if(ch === '.') {
                    if(isFloat) {
                        return;
                    }
                    isFloat = true;
                }
                else if(!isDigit(ch)) {
                    break;
                }

                num += ch;
            }

            return {
                type  : TOKEN.NUM,
                val   : isFloat? parseFloat(num) : parseInt(num, 10),
                range : [start, idx]
            };
        }
    }

    function scanPunctuator() {
        var start = idx,
            ch1 = path[idx],
            ch2 = path[idx + 1];

        if(ch1 === '.') {
            if(isDigit(ch2)) {
                return;
            }

            return path[++idx] === '.'?
                {
                    type  : TOKEN.PUNCT,
                    val   : '..',
                    range : [start, ++idx]
                } :
                {
                    type  : TOKEN.PUNCT,
                    val   : '.',
                    range : [start, idx]
                };
        }

        if(ch2 === '=') {
            var ch3 = path[idx + 2];
            if(ch3 === '=') {
                if('=!^$*'.indexOf(ch1) >= 0) {
                    return {
                        type  : TOKEN.PUNCT,
                        val   : ch1 + ch2 + ch3,
                        range : [start, idx += 3]
                    };
                }
            }
            else if('^$*'.indexOf(ch3) >= 0) {
                if(ch1 === '=') {
                    return {
                        type  : TOKEN.PUNCT,
                        val   : ch1 + ch2 + ch3,
                        range : [start, idx += 3]
                    };
                }
            }
            else if('=!^$*><'.indexOf(ch1) >= 0) {
                return {
                    type  : TOKEN.PUNCT,
                    val   : ch1 + ch2,
                    range : [start, idx += 2]
                };
            }
        }
        else if(ch1 === '=' && '^$*'.indexOf(ch2) >= 0) {
            return {
                type  : TOKEN.PUNCT,
                val   : ch1 + ch2,
                range : [start, idx += 2]
            };
        }

        if(ch1 === ch2 && (ch1 === '|' || ch1 === '&')) {
            return {
                type  : TOKEN.PUNCT,
                val   : ch1 + ch2,
                range : [start, idx += 2]
            };
        }

        if(':{}()[]^+-*/%!><|'.indexOf(ch1) >= 0) {
            return {
                type  : TOKEN.PUNCT,
                val   : ch1,
                range : [start, ++idx]
            };
        }
    }

    function throwUnexpected(token) {
        if(token.type === TOKEN.EOP) {
            throwError(token, MESSAGES.UNEXP_EOP);
        }

        throwError(token, MESSAGES.UNEXP_TOKEN, token.val);
    }

    function throwError(token, messageFormat) {
        var args = Array.prototype.slice.call(arguments, 2),
            msg = messageFormat.replace(
                /%(\d)/g,
                function(_, idx) {
                    return args[idx] || '';
                }),
            error = new Error(msg);

        error.column = token.range[0];

        throw error;
    }

    return parse;
})();

// translator

var translate = (function() {

    var body, vars, lastVarId, unusedVars;

    function acquireVar() {
        if(unusedVars.length) {
            return unusedVars.shift();
        }

        var varName = 'v' + ++lastVarId;
        vars.push(varName);
        return varName;
    }

    function releaseVars() {
        var args = arguments, i = args.length;
        while(i--) {
            unusedVars.push(args[i]);
        }
    }

    function translate(ast) {
        body = [];
        vars = ['res'];
        lastVarId = 0;
        unusedVars = [];

        translateExpr(ast, 'res', 'data');

        body.unshift(
            'var ',
            Array.isArray?
                'isArr = Array.isArray' :
                'toStr = Object.prototype.toString, isArr = function(o) { return toStr.call(o) === "[object Array]"; }',
                ', concat = Array.prototype.concat',
                ',', vars.join(','), ';');

        if(ast.type === SYNTAX.PATH) {
            var lastPart = ast.parts[ast.parts.length - 1];
            if(lastPart && lastPart.type === SYNTAX.POS_PRED && 'idx' in lastPart.arg) {
                body.push('res = res[0];');
            }
        }

        body.push('return res;');

        return body.join('');
    }

    function translatePath(path, dest, ctx) {
        var parts = path.parts,
            i = 0, len = parts.length;

        body.push(
            dest, '=', path.fromRoot? 'data' : path.subst? 'subst.' + path.subst : ctx, ';',
            'isArr(' + dest + ') || (' + dest + ' = [' + dest + ']);');

        while(i < len) {
            var item = parts[i++];
            switch(item.type) {
                case SYNTAX.SELECTOR:
                    item.selector === '..'?
                        translateDescendantSelector(item, dest, dest) :
                        translateSelector(item, dest, dest);
                    break;

                case SYNTAX.OBJ_PRED:
                    translateObjectPredicate(item, dest, dest);
                    break;

                case SYNTAX.POS_PRED:
                    translatePosPredicate(item, dest, dest);
                    break;

                case SYNTAX.CONCAT_EXPR:
                    translateConcatExpr(item, dest, dest);
                    break;
            }
        }
    }

    function translateSelector(sel, dest, ctx) {
        if(sel.prop) {
            var propStr = escapeStr(sel.prop),
                res = acquireVar(), i = acquireVar(), len = acquireVar(),
                curCtx = acquireVar(),
                j = acquireVar(), val = acquireVar(), tmpArr = acquireVar();

            body.push(
                res, '= [];', i, '= 0;', len, '=', ctx, '.length;', tmpArr, '= [];',
                'while(', i, '<', len, ') {',
                    curCtx, '=', ctx, '[', i, '++];',
                    'if(', curCtx, '!= null) {');
            if(sel.prop === '*') {
                body.push(
                        'if(typeof ', curCtx, '=== "object") {',
                            'if(isArr(', curCtx, ')) {',
                                res, '=', res, '.concat(', curCtx, ');',
                            '}',
                            'else {',
                                'for(', j, ' in ', curCtx, ') {',
                                    'if(', curCtx, '.hasOwnProperty(', j, ')) {',
                                        val, '=', curCtx, '[', j, '];');
                                        inlineAppendToArray(res, val);
                    body.push(
                                    '}',
                                '}',
                            '}',
                        '}');
            }
            else {
                body.push(
                        val, '=', curCtx, '[', propStr, '];');
                        inlineAppendToArray(res, val, tmpArr, len);
            }
            body.push(
                    '}',
                '}',
                dest, '=', len, '> 1 &&', tmpArr, '.length?', tmpArr, '.length > 1?',
                    'concat.apply(', res, ',', tmpArr, ') :', res, '.concat(', tmpArr, '[0]) :', res, ';');

            releaseVars(res, i, len, curCtx, j, val, tmpArr);
        }
    }

    function translateDescendantSelector(sel, dest, baseCtx) {
        var prop = sel.prop,
            ctx = acquireVar(), curCtx = acquireVar(), childCtxs = acquireVar(),
            i = acquireVar(), j = acquireVar(), val = acquireVar(),
            len = acquireVar(), res = acquireVar();

        body.push(
            ctx, '=', baseCtx, '.slice(),', res, '= [];',
            'while(', ctx, '.length) {',
                curCtx, '=', ctx, '.shift();');
        prop?
            body.push(
                'if(typeof ', curCtx, '=== "object" &&', curCtx, ') {') :
            body.push(
                'if(typeof ', curCtx, '!= null) {');
        body.push(
                    childCtxs, '= [];',
                    'if(isArr(', curCtx, ')) {',
                        i, '= 0,', len, '=', curCtx, '.length;',
                        'while(', i, '<', len, ') {',
                            val, '=', curCtx, '[', i, '++];');
        prop && body.push(
                            'if(typeof ', val, '=== "object") {');
                                inlineAppendToArray(childCtxs, val);
        prop && body.push(
                            '}');
        body.push(
                        '}',
                    '}',
                    'else {');
        if(prop) {
            if(prop !== '*') {
                body.push(
                        val, '=', curCtx, '["' + prop + '"];');
                        inlineAppendToArray(res, val);
            }
        }
        else {
                        inlineAppendToArray(res, curCtx);
            body.push(
                        'if(typeof ', curCtx, '=== "object") {');
        }

        body.push(
                            'for(', j, ' in ', curCtx, ') {',
                                'if(', curCtx, '.hasOwnProperty(', j, ')) {',
                                    val, '=', curCtx, '[', j, '];');
                                    inlineAppendToArray(childCtxs, val);
                                    prop === '*' && inlineAppendToArray(res, val);
        body.push(
                                '}',
                            '}');
        prop || body.push(
                        '}');
        body.push(
                    '}',
                    childCtxs, '.length &&', ctx, '.unshift.apply(', ctx, ',', childCtxs, ');',
                '}',
            '}',
            dest, '=', res, ';');

        releaseVars(ctx, curCtx, childCtxs, i, j, val, len, res);
    }

    function translateObjectPredicate(expr, dest, ctx) {
        var resVar = acquireVar(), i = acquireVar(), len = acquireVar(),
            cond = acquireVar(), curItem = acquireVar();

        body.push(
            resVar, '= [];',
            i, '= 0;',
            len, '=', ctx, '.length;',
            'while(', i, '<', len, ') {',
                curItem, '=', ctx, '[', i, '++];');
                translateExpr(expr.arg, cond, curItem);
        body.push(
                convertToBool(expr.arg, cond), '&&', resVar, '.push(', curItem, ');',
            '}',
            dest, '=', resVar, ';');

        releaseVars(resVar, i, len, curItem, cond);
    }

    function translatePosPredicate(item, dest, ctx) {
        var arrayExpr = item.arg, fromIdx, toIdx;
        if(arrayExpr.idx) {
            var idx = acquireVar();
            translateExpr(arrayExpr.idx, idx, ctx);
            body.push(
                idx, '< 0 && (', idx, '=', ctx, '.length +', idx, ');',
                dest, '=', ctx, '[', idx, '] == null? [] : [', ctx, '[', idx, ']];');
            releaseVars(idx);
            return false;
        }
        else if(arrayExpr.fromIdx) {
            if(arrayExpr.toIdx) {
                translateExpr(arrayExpr.fromIdx, fromIdx = acquireVar(), ctx);
                translateExpr(arrayExpr.toIdx, toIdx = acquireVar(), ctx);
                body.push(dest, '=', ctx, '.slice(', fromIdx, ',', toIdx, ');');
                releaseVars(fromIdx, toIdx);
            }
            else {
                translateExpr(arrayExpr.fromIdx, fromIdx = acquireVar(), ctx);
                body.push(dest, '=', ctx, '.slice(', fromIdx, ');');
                releaseVars(fromIdx);
            }
        }
        else {
            translateExpr(arrayExpr.toIdx, toIdx = acquireVar(), ctx);
            body.push(dest, '=', ctx, '.slice(0,', toIdx, ');');
            releaseVars(toIdx);
        }
    }

    function translateExpr(expr, dest, ctx) {
        switch(expr.type) {
            case SYNTAX.PATH:
                translatePath(expr, dest, ctx);
                break;

            case SYNTAX.CONCAT_EXPR:
                translateConcatExpr(expr, dest, ctx);
                break;

            case SYNTAX.COMPARISON_EXPR:
                translateComparisonExpr(expr, dest, ctx);
                break;

            case SYNTAX.MATH_EXPR:
                translateMathExpr(expr, dest, ctx);
                break;

            case SYNTAX.LOGICAL_EXPR:
                translateLogicalExpr(expr, dest, ctx);
                break;

            case SYNTAX.UNARY_EXPR:
                translateUnaryExpr(expr, dest, ctx);
                break;

            case SYNTAX.LITERAL:
                body.push(dest, '=');
                translateLiteral(expr.val);
                body.push(';');
                break;
        }
    }

    function translateLiteral(val) {
        body.push(typeof val === 'string'? escapeStr(val) : val === null? 'null' : val);
    }

    function translateComparisonExpr(expr, dest, ctx) {
        var val1 = acquireVar(), val2 = acquireVar(),
            isVal1Array = acquireVar(), isVal2Array = acquireVar(),
            i = acquireVar(), j = acquireVar(),
            len1 = acquireVar(), len2 = acquireVar(),
            leftArg = expr.args[0], rightArg = expr.args[1];

        body.push(dest, '= false;');

        translateExpr(leftArg, val1, ctx);
        translateExpr(rightArg, val2, ctx);

        var isLeftArgPath = leftArg.type === SYNTAX.PATH,
            isRightArgLiteral = rightArg.type === SYNTAX.LITERAL;

        body.push(isVal1Array, '=');
        isLeftArgPath? body.push('true;') : body.push('isArr(', val1, ');');

        body.push(isVal2Array, '=');
        isRightArgLiteral? body.push('false;') : body.push('isArr(', val2, ');');

        body.push(
            'if(');
        isLeftArgPath || body.push(isVal1Array, '&&');
        body.push(val1, '.length === 1) {',
                val1, '=', val1, '[0];',
                isVal1Array, '= false;',
            '}');
        isRightArgLiteral || body.push(
            'if(', isVal2Array, '&&', val2, '.length === 1) {',
                val2, '=', val2, '[0];',
                isVal2Array, '= false;',
            '}');

        body.push(i, '= 0;',
            'if(', isVal1Array, ') {',
                len1, '=', val1, '.length;');

        if(!isRightArgLiteral) {
            body.push(
                'if(', isVal2Array, ') {',
                    len2, '=', val2, '.length;',
                    'while(', i, '<', len1, '&& !', dest, ') {',
                        j, '= 0;',
                        'while(', j, '<', len2, ') {');
                            writeCondition(expr.op, [val1, '[', i, ']'].join(''), [val2, '[', j, ']'].join(''));
                            body.push(
                                dest, '= true;',
                                'break;',
                            '}',
                            '++', j, ';',
                        '}',
                        '++', i, ';',
                    '}',
                '}',
                'else {');
        }
        body.push(
                    'while(', i, '<', len1, ') {');
                        writeCondition(expr.op, [val1, '[', i, ']'].join(''), val2);
                        body.push(
                            dest, '= true;',
                            'break;',
                        '}',
                        '++', i, ';',
                    '}');

        isRightArgLiteral || body.push(
                '}');

        body.push(
            '}');

        if(!isRightArgLiteral) {
            body.push(
            'else if(', isVal2Array,') {',
                len2, '=', val2, '.length;',
                'while(', i, '<', len2, ') {');
                    writeCondition(expr.op, val1, [val2, '[', i, ']'].join(''));
            body.push(
                        dest, '= true;',
                        'break;',
                    '}',
                    '++', i, ';',
                '}',
            '}');
        }

        body.push(
            'else {',
                dest, '=', binaryOperators[expr.op](val1, val2), ';',
            '}');

        releaseVars(val1, val2, isVal1Array, isVal2Array, i, j, len1, len2);
    }

    function writeCondition(op, val1Expr, val2Expr) {
        body.push('if(', binaryOperators[op](val1Expr, val2Expr), ') {');
    }

    function translateLogicalExpr(expr, dest, ctx) {
        var conditionVars = [],
            args = expr.args, len = args.length,
            i = 0, val;

        body.push(dest, '= false;');
        switch(expr.op) {
            case '&&':
                while(i < len) {
                    conditionVars.push(val = acquireVar());
                    translateExpr(args[i], val, ctx);
                    body.push('if(', convertToBool(args[i++], val), ') {');
                }
                body.push(dest, '= true;');
                break;

            case '||':
                while(i < len) {
                    conditionVars.push(val = acquireVar());
                    translateExpr(args[i], val, ctx);
                    body.push(
                        'if(', convertToBool(args[i], val), ') {',
                            dest, '= true;',
                        '}');
                    if(i++ + 1 < len) {
                        body.push('else {');
                    }
                }
                --len;
                break;
        }

        while(len--) {
            body.push('}');
        }

        releaseVars.apply(null, conditionVars);
    }

    function translateMathExpr(expr, dest, ctx) {
        var val1 = acquireVar(),
            val2 = acquireVar(),
            args = expr.args;

        translateExpr(args[0], val1, ctx);
        translateExpr(args[1], val2, ctx);

        body.push(
            dest, '=',
            binaryOperators[expr.op](
                convertToSingleValue(args[0], val1),
                convertToSingleValue(args[1], val2)),
            ';');

        releaseVars(val1, val2);
    }

    function translateUnaryExpr(expr, dest, ctx) {
        var val = acquireVar(),
            arg = expr.arg;

        translateExpr(arg, val, ctx);

        switch(expr.op) {
            case '!':
                body.push(dest, '= !', convertToBool(arg, val) + ';');
                break;

            case '-':
                body.push(dest, '= -', convertToSingleValue(arg, val) + ';');
                break;
        }

        releaseVars(val);
    }

    function translateConcatExpr(expr, dest, ctx) {
        var argVars = [],
            args = expr.args,
            len = args.length,
            i = 0;

        while(i < len) {
            argVars.push(acquireVar());
            translateExpr(args[i], argVars[i++], ctx);
        }

        body.push(dest, '= concat.call(', argVars.join(','), ');');

        releaseVars.apply(null, argVars);
    }

    function escapeStr(s) {
        return '\'' + s.replace(/\\/g, '\\\\').replace(/'/g, '\\\'') + '\'';
    }

    function inlineAppendToArray(res, val, tmpArr, len) {
        body.push(
            'if(typeof ', val, '!== "undefined") {',
                'if(isArr(', val, ')) {');
        if(tmpArr) {
            body.push(
                    len, '> 1?');
                        inlinePushToArray(tmpArr, val);
            body.push(
                        ':');
        }
        body.push(
                    res, '=', res, '.length?', res, '.concat(', val, ') :', val, '.slice()', ';',
                '}',
                'else {');
        tmpArr && body.push(
                    'if(', tmpArr, '.length) {',
                        res, '= concat.apply(', res, ',', tmpArr, ');',
                        tmpArr, '= [];',
                    '}');
                    inlinePushToArray(res, val);
        body.push(';',
                '}',
            '}');
    }

    function inlinePushToArray(res, val) {
        body.push(res, '.length?', res, '.push(', val, ') :',  res, '[0] =', val);
    }

    function convertToBool(arg, varName) {
        switch(arg.type) {
            case SYNTAX.LOGICAL_EXPR:
                return varName;

            case SYNTAX.LITERAL:
                return '!!' + varName;

            case SYNTAX.PATH:
                return varName + '.length > 0';

            default:
                return ['(typeof ', varName, '=== "boolean"?',
                    varName, ':',
                    'isArr(', varName, ')?', varName, '.length > 0 : !!', varName, ')'].join('');
        }
    }

    function convertToSingleValue(arg, varName) {
        switch(arg.type) {
            case SYNTAX.LITERAL:
                return varName;

            case SYNTAX.PATH:
                return varName + '[0]';

            default:
                return ['(isArr(', varName, ')?', varName, '[0] : ', varName, ')'].join('');
        }
    }

    function startsWithStrict(val1, val2) {
        return ['typeof ', val1, '=== "string" && typeof ', val2, '=== "string" &&',
            val1, '.indexOf(', val2, ') === 0'].join('');
    }

    function startsWith(val1, val2) {
        return [val1, '!= null &&', val2, '!= null &&',
            val1, '.toString().toLowerCase().indexOf(', val2, '.toString().toLowerCase()) === 0'].join('');
    }

    function endsWithStrict(val1, val2) {
        return ['typeof ', val1, '=== "string" && typeof ', val2, '=== "string" &&',
            val1, '.length >=', val2, '.length &&',
            val1, '.lastIndexOf(', val2, ') ===', val1, '.length -', val2, '.length'].join('');
    }

    function endsWith(val1, val2) {
        return [val1, '!= null &&', val2, '!= null &&',
            '(', val1, '=', val1, '.toString()).length >=', '(', val2, '=', val2, '.toString()).length &&',
            '(', val1, '.toLowerCase()).lastIndexOf(', '(', val2, '.toLowerCase())) ===',
            val1, '.length -', val2, '.length'].join('');
    }

    function containsStrict(val1, val2) {
        return ['typeof ', val1, '=== "string" && typeof ', val2, '=== "string" &&',
            val1, '.indexOf(', val2, ') > -1'].join('');
    }

    function contains(val1, val2) {
        return [val1, '!= null && ', val2, '!= null &&',
            val1, '.toString().toLowerCase().indexOf(', val2, '.toString().toLowerCase()) > -1'].join('');
    }

    var binaryOperators = {
            '===' : function(val1, val2) {
                return val1 + '===' + val2;
            },

            '==' : function(val1, val2) {
                return ['typeof ', val1, '=== "string" && typeof ', val2, '=== "string"?',
                    val1, '.toLowerCase() ===', val2, '.toLowerCase() :' +
                    val1, '==', val2].join('');
            },

            '>=' : function(val1, val2) {
                return val1 + '>=' + val2;
            },

            '>' : function(val1, val2) {
                return val1 + '>' + val2;
            },

            '<=' : function(val1, val2) {
                return val1 + '<=' + val2;
            },

            '<' : function(val1, val2) {
                return val1 + '<' + val2;
            },

            '!==' : function(val1, val2) {
                return val1 + '!==' + val2;
            },

            '!=' : function(val1, val2) {
                return val1 + '!=' + val2;
            },

            '^==' : startsWithStrict,

            '==^' : function(val1, val2) {
                return startsWithStrict(val2, val1);
            },

            '^=' : startsWith,

            '=^' : function(val1, val2) {
                return startsWith(val2, val1);
            },

            '$==' : endsWithStrict,

            '==$' : function(val1, val2) {
                return endsWithStrict(val2, val1);
            },

            '$=' : endsWith,

            '=$' : function(val1, val2) {
                return endsWith(val2, val1);
            },

            '*==' : containsStrict,

            '==*' : function(val1, val2) {
                return containsStrict(val2, val1);
            },

            '=*' : function(val1, val2) {
                return contains(val2, val1);
            },

            '*=' : contains,

            '+' : function(val1, val2) {
                return val1 + '+' + val2;
            },

            '-' : function(val1, val2) {
                return val1 + '-' + val2;
            },

            '*' : function(val1, val2) {
                return val1 + '*' + val2;
            },

            '/' : function(val1, val2) {
                return val1 + '/' + val2;
            },

            '%' : function(val1, val2) {
                return val1 + '%' + val2;
            }
        };

    return translate;
})();

function compile(path) {
    return Function('data,subst', translate(parse(path)));
}

var cache = {},
    cacheKeys = [],
    params = {
        cacheSize : 100
    },
    setParamsHooks = {
        cacheSize : function(oldVal, newVal) {
            if(newVal < oldVal && cacheKeys.length > newVal) {
                var removedKeys = cacheKeys.splice(0, cacheKeys.length - newVal),
                    i = removedKeys.length;

                while(i--) {
                    delete cache[removedKeys[i]];
                }
            }
        }
    };

var decl = function(path, ctx, substs) {
    if(!cache[path]) {
        cache[path] = compile(path);
        if(cacheKeys.push(path) > params.cacheSize) {
            delete cache[cacheKeys.shift()];
        }
    }

    return cache[path](ctx, substs || {});
};

decl.version = '0.4.0';

decl.params = function(_params) {
    if(!arguments.length) {
        return params;
    }

    for(var name in _params) {
        if(_params.hasOwnProperty(name)) {
            setParamsHooks[name] && setParamsHooks[name](params[name], _params[name]);
            params[name] = _params[name];
        }
    }
};

decl.compile = compile;

decl.apply = decl;

if(typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = decl;
}
else if(typeof modules === 'object') {
    modules.define('jspath', function(provide) {
        provide(decl);
    });
}
else if(typeof define === 'function') {
    define(function(require, exports, module) {
        module.exports = decl;
    });
}
else {
    window.JSPath = decl;
}

})();

/*-------------------------------------------------------------------------*/
/* ES6 EXTENSIONS                                                          */
/*-------------------------------------------------------------------------*/

if(!String.prototype.startsWith)
{
	String.prototype.startsWith = function(s)
	{
		const base = 0x00000000000000000000;

		return this.indexOf(s, base) === base;
	};
}

/*-------------------------------------------------------------------------*/

if(!String.prototype.endsWith)
{
	String.prototype.endsWith = function(s)
	{
		const base = this.length - s.length;

		return this.indexOf(s, base) === base;
	};
}

/*-------------------------------------------------------------------------*/
/* JQUERY EXTENSIONS                                                       */
/*-------------------------------------------------------------------------*/

var _ami_internal_jQueryEach = jQuery.each;
var _ami_internal_jQueryAjax = jQuery.ajax;

/*-------------------------------------------------------------------------*/

jQuery.each = function(el, callback, context)
{
	return _ami_internal_jQueryEach(el, context ? (index, value) => callback.call(context, index, value) : callback);
};

/*-------------------------------------------------------------------------*/

jQuery.ajax = function(settings)
{
	if(typeof settings === 'object'
	   &&
	   settings.dataType === 'sheet'
	 ) {
		const result = $.Deferred();

		const [context, url] = amiWebApp.setup(
			['context', 'url'],
			[result, ''],
			settings
		)

		/*-----------------------------------------------------------------*/

		if(url)
		{
			$('head').append('<link rel="stylesheet" type="text/css" href="' + url + '"></link>').promise().done(() => {

				result.resolveWith(context);
			});
		}
		else
		{
			result.rejectWith(context);
		}

		/*-----------------------------------------------------------------*/

		return result.promise();
	}
	else
	{
		/*-----------------------------------------------------------------*/

		return _ami_internal_jQueryAjax.apply(this, arguments);

		/*-----------------------------------------------------------------*/
	}
};

/*-------------------------------------------------------------------------*/

jQuery.fn.extend({
	/*---------------------------------------------------------------------*/

	findWithSelf: function(selector)
	{
		return this.find(selector).addBack(selector);
	},

	/*---------------------------------------------------------------------*/

	serializeObject: function()
	{
		const result = {};

		this.serializeArray().forEach((item) => {

			if(item.name in result)
			{
				if(Object.prototype.toString.call(result[item.name]) === '[object String]')
				{
					result[item.name] = [result[item.name]];
				}

				result[item.name].push(item.value || '');
			}
			else
			{
				result[item.name] = item.value || '';
			}
		});

		return result;
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* BOOTSTRAP EXTENSIONS                                                    */
/*-------------------------------------------------------------------------*/

var _ami_internal_modalZIndex = 1050;

/*-------------------------------------------------------------------------*/

$(document).on('show.bs.modal', '.modal', function() {

	const el = $(this);

	setTimeout(() => {

		$('body > .modal-backdrop:last').css('z-index', _ami_internal_modalZIndex++);
		/*-----------*/el/*-----------*/.css('z-index', _ami_internal_modalZIndex++);

	}, 10);
});

/*-------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------*/
/* NAMESPACE HELPERS                                                       */
/*-------------------------------------------------------------------------*/

function _$createNamespace($name, x)
{
	let parent = window;

	const parts = $name.split(/\s*\.\s*/g), l = parts.length - 1;

	for(var i = 0; i < l; i++)
	{
		if(parent[parts[i]])
		{
			parent = parent[parts[i]];
		}
		else
		{
			parent = parent[parts[i]] = {};
		}
	}

	parent[parts[i]] = x;
}

/*-------------------------------------------------------------------------*/

function _$addToNamespace($name, x)
{
	let parent = window;

	const parts = $name.split(/\s*\.\s*/g), l = parts.length - 1;

	for(var i = 0; i < l; i++)
	{
		if(parent[parts[i]])
		{
			parent = parent[parts[i]];
		}
		else
		{
			throw '`' + $name + '` (`' + parts[i] + '`) not declared';
		}
	}

	parent[parts[i]] = x;
}

/*-------------------------------------------------------------------------*/
/* NAMESPACES                                                              */
/*-------------------------------------------------------------------------*/

/**
  * Create a new namespace
  * @param {String} $name the namespace name
  * @param {Object} [$descr] the namespace body
  */

function $AMINamespace($name, $descr)
{
	if(!$descr)
	{
		$descr = {};
	}

	/*---------------------------------------------------------------------*/

	$descr.$name = $name;

	/*---------------------------------------------------------------------*/

	_$createNamespace($name, $descr);

	/*---------------------------------------------------------------------*/

	if($descr.$)
	{
		$descr.$.apply($descr);
	}

	/*---------------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* INTERFACES                                                              */
/*-------------------------------------------------------------------------*/

/**
  * Create a new interface
  * @param {String} $name the interface name
  * @param {Object} [$descr] the interface body
  */

function $AMIInterface($name, $descr)
{
	if(!$descr)
	{
		$descr = {};
	}

	/*---------------------------------------------------------------------*/

	const $class = function()
	{
		throw 'could nor instantiate interface';
	};

	/*---------------------------------------------------------------------*/

	if($descr.$extends)
	{
		throw '`$extends` not allowed for interface';
	}

	if($descr.$implements)
	{
		throw '`$implements` not allowed for interface';
	}

	/*---------------------------------------------------------------------*/

	if($descr.$)
	{
		throw '`$` not allowed for interface';
	}

	if($descr.$init)
	{
		throw '`$init` not allowed for interface';
	}

	/*---------------------------------------------------------------------*/

	$class.$name = $name;
	$class.$class = $class;
	$class.$members = $descr;

	/*---------------------------------------------------------------------*/

	_$addToNamespace($name, $class);

	/*---------------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* CLASSES                                                                 */
/*-------------------------------------------------------------------------*/

/**
  * Create a new class
  * @param {String} $name the class name
  * @param {Object} [$descr] the class body
  */

function $AMIClass($name, $descr)
{
	if(!$descr)
	{
		$descr = {};
	}

	/*---------------------------------------------------------------------*/

	const $super = ($descr.$extends instanceof Function) ? $descr.$extends.prototype : {};

	const $super_implements = ($super.$implements instanceof Array) ? $super.$implements : [];
	const $descr_implements = ($descr.$implements instanceof Array) ? $descr.$implements : [];

	/*---------------------------------------------------------------------*/

	const $class = function()
	{
		/*-----------------------------------------------------------------*/

		for(const i in this.$implements)
		{
			if(this.$implements.hasOwnProperty(i))
			{
				const $interface = this.$implements[i];

				for(const j in $interface.$members)
				{
					if($interface.$members.hasOwnProperty(j))
					{
						const $member = $interface.$members[j];

						if(typeof(this[j]) !== typeof($member))
						{
							throw 'class `' + this.$name + '` with must implement `' + $interface.$name + '.' + j + '`';
						}
					}
				}
			}
		}

		/*-----------------------------------------------------------------*/

		const _super = this.$class._internal_super;
		const _added = this.$class._internal_added;

		/*-----------------------------------------------------------------*/

		this.$super = {};

		for(const name in _super)
		{
			if(_super.hasOwnProperty(name))
			{
				this.$super[name] = ((_super, name, that) => function() {

					return _super[name].apply(that, arguments)

				})(_super, name, this);
			}
		}

		/*-----------------------------------------------------------------*/

		this.$added = {};

		for(const name in _added)
		{
			if(_added.hasOwnProperty(name))
			{
				this.$added[name] = ((_added, name, that) => function() {

					return _added[name].apply(that, arguments);

				})(_added, name, this);
			}
		}

		/*-----------------------------------------------------------------*/

		if(this.$init)
		{
			this.$init.apply(this, arguments);
		}

		/*-----------------------------------------------------------------*/
	};

	/*---------------------------------------------------------------------*/

	$class._internal_super = {};
	$class._internal_added = {};

	/*---------------------------------------------------------------------*/

	for(const name in $super)
	{
		if(name === '$init'
		   ||
		   name.charAt(0) !== '$'
		   ||
		   $super.hasOwnProperty(name)
		 ) {
			$class._internal_super[name] = $super[name];

			$class.prototype[name] = $super[name];
		}
	}

	for(const name in $descr)
	{
		if(name === '$init'
		   ||
		   name.charAt(0) !== '$'
		   ||
		   $descr.hasOwnProperty(name)
		 ) {
			$class._internal_added[name] = $descr[name];

			$class.prototype[name] = $descr[name];
		}
	}

	/*---------------------------------------------------------------------*/

	$class.prototype.$name = $name;
	$class.prototype.$class = $class;
	$class.prototype.$implements = $super_implements.concat($descr_implements);

	/*---------------------------------------------------------------------*/

	_$addToNamespace($name, $class);

	/*---------------------------------------------------------------------*/

	if($descr.$)
	{
		$descr.$.apply($class);
	}

	/*---------------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* NodeJS EXTENSION                                                        */
/*-------------------------------------------------------------------------*/

if(typeof exports !== 'undefined')
{
	module.exports.Namespace = $AMINamespace;
	module.exports.Interface = $AMIInterface;
	module.exports.  Class   =   $AMIClass  ;
}

/*-------------------------------------------------------------------------*/
/* JQUERY EXTENSION                                                        */
/*-------------------------------------------------------------------------*/

if(typeof jQuery !== 'undefined')
{
	jQuery.Namespace = $AMINamespace;
	jQuery.Interface = $AMIInterface;
	jQuery.  Class   =   $AMIClass  ;
}

/*-------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------*/

/**
 * The AMI url routing subsystem
 * @namespace amiRouter
 */

$AMINamespace('amiRouter', /** @lends amiRouter */ {
	/*---------------------------------------------------------------------*/
	/* PRIVATE MEMBERS                                                     */
	/*---------------------------------------------------------------------*/

	_scriptURL: '',
	_originURL: '',
	_webAppURL: '',

	_hash: '',
	_args: [],

	/*---------------------------------------------------------------------*/

	_routes: [],

	/*---------------------------------------------------------------------*/
	/* PRIVATE METHODS                                                     */
	/*---------------------------------------------------------------------*/

	_eatSlashes: function(url)
	{
		url = url.trim();

		while(url[url.length - 1] === '/')
		{
			url = url.substring(0, url.length - 1);
		}

		return url;
	},

	/*---------------------------------------------------------------------*/
	/* STATIC CONSTRUCTOR                                                  */
	/*---------------------------------------------------------------------*/

	$: function()
	{
		/*-----------------------------------------------------------------*/

		this._args.length = 0;
		this._routes.length = 0;

		/*-----------------------------------------------------------------*/

		const  href  = window.location. href .trim();
		const  hash  = window.location. hash .trim();
		const search = window.location.search.trim();

		/*-----------------------------------------------------------------*/

		const scripts = document.getElementsByTagName('script');

		/*-----------------------------------------------------------------*/
		/* SCRIPT_URL AND ORIGIN_URL                                       */
		/*-----------------------------------------------------------------*/

		for(let idx, i = 0; i < scripts.length; i++)
		{
			idx = scripts[i].src.indexOf('js/ami.');

			if(idx > 0)
			{
				this._scriptURL = scripts[i].src;

				this._originURL = this._eatSlashes(
					this._scriptURL.substring(0, idx)
				);

				break;
			}
		}

		/*-----------------------------------------------------------------*/
		/* WEBAPP_URL                                                      */
		/*-----------------------------------------------------------------*/

		this._webAppURL = this._eatSlashes(
			href.replace(/(?:\#|\?).*$/, '')
		);

		/*-----------------------------------------------------------------*/
		/* HASH                                                            */
		/*-----------------------------------------------------------------*/

		this._hash = this._eatSlashes(
			hash.substring(1).replace(/\?.*$/, '')
		);

		/*-----------------------------------------------------------------*/
		/* ARGS                                                            */
		/*-----------------------------------------------------------------*/

		if(search)
		{
			search.substring(1).split('&').forEach((param) => {

				const parts = param.split('=');

				/**/ if(parts.length === 1)
				{
					this._args[decodeURIComponent(parts[0])] = /*--------*/ '' /*--------*/;
				}
				else if(parts.length === 2)
				{
					this._args[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
				}
			});
		}

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/
	/* PUBLIC METHODS                                                      */
	/*---------------------------------------------------------------------*/

	/**
	  * Gets the AWF's script URL
	  * @returns {String} The AWF's script URL
	  */

	getScriptURL: function()
	{
		return this._scriptURL;
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Gets the origin URL
	  * @returns {String} The origin URL
	  */

	getOriginURL: function()
	{
		return this._originURL;
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Gets the webapp URL
	  * @returns {String} The webapp URL
	  */

	getWebAppURL: function()
	{
		return this._webAppURL;
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Gets the anchor part of the webapp URL
	  * @returns {String} The anchor part of the webapp URL
	  */

	getHash: function()
	{
		return this._hash;
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Gets the arguments extracted from the webapp URL
	  * @returns {Array<String>} The arguments extracted from the webapp URL
	  */

	getArgs: function()
	{
		return this._args;
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Appends a routing rule
	  * @param {String} regExp the regExp
	  * @param {Object} handler the handler
	  * @returns {Namespace} The amiRouter singleton
	  */

	append: function(regExp, handler)
	{
		this._routes.unshift({
			regExp: regExp,
			handler: handler,
		});

		return this;
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Removes some routing rules
	  * @param {String} regExp the regExp
	  * @returns {Namespace} The amiRouter singleton
	  */

	remove: function(regExp)
	{
		this._routes = this._routes.filter((route) => {

			return route.regExp.toString() !== regExp.toString();
		});

		return this;
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Checks whether the URL matches with a routing rule
	  * @returns {Boolean}
	  */

	check: function()
	{
		let m;

		for(let i = 0; i < this._routes.length; i++)
		{
			m = this._hash.match(this._routes[i].regExp);

			if(m)
			{
				this._routes[i].handler.apply(amiRouter, m);

				return true;
			}
		}

		return false;
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Append a new history entry
	  * @param {String} path the new path
	  * @param {Object} [context=null] the new context
	  * @returns {Boolean}
	  */

	appendHistoryEntry: function(path, context = null)
	{
		if(history.pushState)
		{
			history.pushState(context, null, this._webAppURL + this._eatSlashes(path));

			return true;
		}

		return false;
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Replace the current history entry
	  * @param {String} path the new path
	  * @param {Object} [context=null] the new context
	  * @returns {Boolean}
	  */

	replaceHistoryEntry: function(path, context = null)
	{
		if(history.replaceState)
		{
			history.replaceState(context, null, this._webAppURL + this._eatSlashes(path));

			return true;
		}

		return false;
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------*/
/* ami                                                                     */
/*-------------------------------------------------------------------------*/

$AMINamespace('ami', {

	version: '0.0.1',
	commit_id: '{{AMI_COMMIT_ID}}',
});

/*-------------------------------------------------------------------------*/
/* INTERNAL FUNCTIONS                                                      */
/*-------------------------------------------------------------------------*/

function _ami_internal_then(deferred, doneFunc, failFunc)
{
	if(deferred && deferred.then)
	{
		deferred.then(doneFunc, failFunc);
	}
	else
	{
		doneFunc();
	}
}

/*-------------------------------------------------------------------------*/

function _ami_internal_always(deferred, alwaysFunc)
{
	if(deferred && deferred.always)
	{
		deferred.always(alwaysFunc);
	}
	else
	{
		alwaysFunc();
	}
}

/*-------------------------------------------------------------------------*/
/* amiWebApp                                                               */
/*-------------------------------------------------------------------------*/

/**
 * The AMI webapp subsystem
 * @namespace amiWebApp
 */

$AMINamespace('amiWebApp', /** @lends amiWebApp */ {
	/*---------------------------------------------------------------------*/
	/* PRIVATE MEMBERS                                                     */
	/*---------------------------------------------------------------------*/

	_idRegExp: new RegExp('[a-zA-Z][a-zA-Z0-9]{7}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{12}', 'g'),

	_linkExp: new RegExp('\\[([^\\]]*)\\]\\(([^\\)]*)\\)', 'g'),

	/*---------------------------------------------------------------------*/

	_embedded: false,
	_noBootstrap: false,

	_globalDeferred: $.Deferred(),

	/*---------------------------------------------------------------------*/

	_sheets: [],
	_scripts: [],

	_controls: {},
	_subapps: {},

	_isReady: false,
	_canLeave: true,
	_lockCnt: 0x00,

	/*---------------------------------------------------------------------*/

	_currentSubAppInstance: new function()
	{
		this.onReady = function() {};
		this.onExit = function() {};
		this.onLogin = function() {};
		this.onLogout = function() {};
	},

	/*---------------------------------------------------------------------*/
	/* PUBLIC MEMBERS                                                      */
	/*---------------------------------------------------------------------*/

	/**
	  * The origin URL
	  * @type {String}
	  */

	originURL: '/',

	/**
	  * The webapp URL
	  * @type {String}
	  */

	webAppURL: '/',

	/**
	  * The anchor part of the webapp URL
	  * @type {String}
	  */

	hash: '',

	/**
	  * The arguments extracted from the webapp URL
	  * @type {Array<String>}
	  */

	args: {},

	/*---------------------------------------------------------------------*/
	/* STATIC CONSTRUCTOR                                                  */
	/*---------------------------------------------------------------------*/

	$: function()
	{
		/*-----------------------------------------------------------------*/
		/* GET FLAGS                                                       */
		/*-----------------------------------------------------------------*/

		const url = amiRouter.getScriptURL();

		const idx = url.indexOf('?');

		if(idx > 0)
		{
			const flags = url.substring(idx).toLowerCase();

			this._embedded = (flags.indexOf('embedded') >= 0);

			this._noBootstrap = (flags.indexOf('nobootstrap') >= 0);
		}

		/*-----------------------------------------------------------------*/
		/* GET URLS, HASH AND ARGS                                         */
		/*-----------------------------------------------------------------*/

		this.originURL = amiRouter.getOriginURL();
		this.webAppURL = amiRouter.getWebAppURL();

		this.hash = amiRouter.getHash();
		this.args = amiRouter.getArgs();

		/*-----------------------------------------------------------------*/
		/* LOAD SHEETS AND SCRIPTS                                         */
		/*-----------------------------------------------------------------*/

		if(this._noBootstrap === false
		   &&
		   (typeof jQuery.fn.modal) !== 'function'
		 ) {
			this.loadResources([
				this.originURL + '/css/bootstrap.min.css',
				this.originURL + '/css/bootstrap-datetimepicker.min.css',
				this.originURL + '/css/select2.min.css',
				/**/
				this.originURL + '/css/font-awesome.min.css',
				this.originURL + '/css/ami.min.css',
				/**/
				this.originURL + '/js/popper.min.js',
				this.originURL + '/js/moment.min.js',
				/**/
				this.originURL + '/js/bootstrap.min.js',
				this.originURL + '/js/bootstrap-datetimepicker.min.js',
				this.originURL + '/js/select2.min.js',
			]).done(() => {

				this._globalDeferred.resolve();
			});
		}
		else
		{
			this.loadResources([
				this.originURL + '/css/font-awesome.min.css',
				this.originURL + '/css/ami.min.css',
			]).done(() => {

				this._globalDeferred.resolve();
			});
		}

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/
	/* MODE                                                                */
	/*---------------------------------------------------------------------*/

	/**
	  * Checks whether the WebApp is executed in embedded mode
	  * @returns {Boolean}
	  */

	isEmbedded: function()
	{
		return this._embedded;
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Checks whether the WebApp is executed locally (file://, localhost, 127.0.0.1 or ::1)
	  * @returns {Boolean}
	  */

	isLocal: function()
	{
		return document.location.protocol === (('file:'))
		       ||
		       document.location.hostname === 'localhost'
		       ||
		       document.location.hostname === '127.0.0.1'
		       ||
		       document.location.hostname === ((('::1')))
		;
	},

	/*---------------------------------------------------------------------*/
	/* TOOLS                                                               */
	/*---------------------------------------------------------------------*/

	typeOf: function(x)
	{
		const name = Object.prototype.toString.call(x);

		return name.startsWith('[object ') ? name.substring(8, name.length - 1)
		                                   : ''
		;
	},

	/*---------------------------------------------------------------------*/

	asArray: function(x)
	{
		return this.typeOf(x) === 'Array' ? (x)
		                                  : [x]
		;
	},

	/*---------------------------------------------------------------------*/

	setup: function(optionNames, optionDefaults, settings)
	{
		const result = [];

		/*-----------------------------------------------------------------*/

		const l = optionNames.length;
		const m = optionDefaults.length;

		if(l !== m)
		{
			throw 'internal error';
		}

		/*-----------------------------------------------------------------*/

		if(settings) {
			for(let i = 0; i < l; i++) {
				result.push(optionNames[i] in settings ? settings[optionNames[i]] : optionDefaults[i]);
			}
		}
		else {
			for(let i = 0; i < l; i++) {
				result.push(/*---------------------------------------------------*/ optionDefaults[i]);
			}
		}

		/*-----------------------------------------------------------------*/

		return result;
	},

	/*---------------------------------------------------------------------*/

	replace: amiTwig.stdlib._replace,

	/*---------------------------------------------------------------------*/

	_textToHtmlX: ['&'    , '"'     , '<'   , '>'   ],
	_textToHtmlY: ['&amp;', '&quot;', '&lt;', '&gt;'],

	/**
	  * Escapes the given string from text to HTML
	  * @param {String} string the unescaped string
	  * @returns {String} The escaped string
	  */

	textToHtml: function(s)
	{
		return this.replace(s || '', this._textToHtmlX, this._textToHtmlY);
	},

	/**
	  * Unescapes the given string from HTML to text
	  * @param {String} string the escaped string
	  * @returns {String} The unescaped string
	  */

	htmlToText: function(s)
	{
		return this.replace(s || '', this._textToHtmlY, this._textToHtmlX);
	},

	/*---------------------------------------------------------------------*/

	_textToStringX: ['\\'  , '\n' , '"'  , '\''  ],
	_textToStringY: ['\\\\', '\\n', '\\"', '\\\''],

	/**
	  * Escapes the given string from text to JavaScript string
	  * @param {String} string the unescaped string
	  * @returns {String} The escaped string
	  */

	textToString: function(s)
	{
		return this.replace(s || '', this._textToStringX, this._textToStringY);
	},

	/**
	  * Unescapes the given string from JavaScript string to text
	  * @param {String} string the escaped string
	  * @returns {String} The unescaped string
	  */

	stringToText: function(s)
	{
		return this.replace(s || '', this._textToStringY, this._textToStringX);

	},

	/*---------------------------------------------------------------------*/

	_htmlToStringX: ['\\'  , '\n' , '&quot;'  , '\''  ],
	_htmlToStringY: ['\\\\', '\\n', '\\&quot;', '\\\''],

	/**
	  * Escapes the given string from HTML to JavaScript string
	  * @param {String} string the unescaped string
	  * @returns {String} The escaped string
	  */

	htmlToString: function(s)
	{
		return this.replace(s || '', this._htmlToStringX, this._htmlToStringY);
	},

	/**
	  * Unescapes the given string from JavaScript string to HTML
	  * @param {String} string the escaped string
	  * @returns {String} The unescaped string
	  */

	stringToHtml: function(s)
	{
		return this.replace(s || '', this._htmlToStringY, this._htmlToStringX);
	},

	/*---------------------------------------------------------------------*/

	_textToSQLX: ['\''  ],
	_textToSQLY: ['\'\''],

	/**
	  * Escapes the given string from text to SQL
	  * @param {String} string the unescaped string
	  * @returns {String} The escaped string
	  */

	textToSQL: function(s)
	{
		return this.replace(s || '', this._textToSQLX, this._textToSQLY);
	},

	/**
	  * Unescapes the given string from SQL to text
	  * @param {String} string the escaped string
	  * @returns {String} The unescaped string
	  */

	sqlToText: function(s)
	{
		return this.replace(s || '', this._textToSQLY, this._textToSQLX);
	},

	/*---------------------------------------------------------------------*/
	/* BASE64                                                              */
	/*---------------------------------------------------------------------*/

	_base64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',

	/*---------------------------------------------------------------------*/

	/**
	  * Encodes (RFC 4648) a string
	  * @param {String} string the decoded string
	  * @returns {String} The encoded string
	  */

	base64Encode: function(s)
	{
		let w;

		const e = [];

		const l = s.length, m = l % 3;

		const this_base64 = this._base64;

		for(let i = 0; i < l;)
		{
			w = s.charCodeAt(i++) << 16
			    |
			    s.charCodeAt(i++) << 8
			    |
			    s.charCodeAt(i++) << 0
			;

			e.push(this_base64.charAt((w >> 18) & 0x3F));
			e.push(this_base64.charAt((w >> 12) & 0x3F));
			e.push(this_base64.charAt((w >> 6) & 0x3F));
			e.push(this_base64.charAt((w >> 0) & 0x3F));
		}

		/**/ if(m === 1) {
			e.splice(-2, 2);
		}
		else if(m === 2) {
			e.splice(-1, 1);
		}

		return e.join('');
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Decodes (RFC 4648) a string
	  * @param {String} string the encoded string
	  * @returns {String} The decoded string
	  */

	base64Decode: function(s)
	{
		let w;

		const e = [];

		const l = s.length, m = l % 4;

		const this_base64 = this._base64;

		for(let i = 0; i < l;)
		{
			w = this_base64.indexOf(s.charAt(i++)) << 18
			    |
			    this_base64.indexOf(s.charAt(i++)) << 12
			    |
			    this_base64.indexOf(s.charAt(i++)) << 6
			    |
			    this_base64.indexOf(s.charAt(i++)) << 0
			;

			e.push(String.fromCharCode((w >>> 16) & 0xFF));
			e.push(String.fromCharCode((w >>> 8) & 0xFF));
			e.push(String.fromCharCode((w >>> 0) & 0xFF));
		}

		/**/ if(m === 2) {
			e.splice(-2, 2);
		}
		else if(m === 3) {
			e.splice(-1, 1);
		}

		return e.join('');
	},

	/*---------------------------------------------------------------------*/
	/* DYNAMIC RESOURCE LOADING                                            */
	/*---------------------------------------------------------------------*/

	_getExtension: function(url)
	{
		const idx = url.lastIndexOf('.');

		return idx > 0 ? url.substring(idx) : '';
	},

	/*---------------------------------------------------------------------*/

	_getDataType: function(url, dataType)
	{
		let result;

		if(dataType === 'auto')
		{
			/**/ if(url.indexOf('ctrl:') === 0)
			{
				result = 'control';
			}
			else if(url.indexOf('subapp:') === 0)
			{
				result = 'subapp';
			}
			else
			{
				switch(this._getExtension(url).toLowerCase())
				{
					case '.css':
						result = 'sheet';
						break;

					case '.js':
						result = 'script';
						break;

					case '.json':
						result = 'json';
						break;

					case '.xml':
						result = 'xml';
						break;

					default:
						result = 'text';
						break;
				}
			}
		}
		else
		{
			result = dataType;
		}

		return result;
	},

	/*---------------------------------------------------------------------*/

	__loadXXX: function(deferred, result, urls, dataType, context)
	{
		if(urls.length === 0)
		{
			return deferred.resolveWith(context, [result]);
		}

		/*-----------------------------------------------------------------*/

		const url = urls.shift().trim();

		/*-----------------------------------------------------------------*/

		const dataTYPE = this._getDataType(url, dataType);

		/*-----------------------------------------------------------------*/

		switch(dataTYPE)
		{
			/*-------------------------------------------------------------*/
			/* CONTROL                                                     */
			/*-------------------------------------------------------------*/

			case 'control':

				this.loadControl(url).then((data) => {

					result.push(data);

					this.__loadXXX(deferred, result, urls, dataType, context);

				}, (message) => {

					deferred.rejectWith(context, [message]);
				});

				break;

			/*-------------------------------------------------------------*/
			/* SUBAPP                                                      */
			/*-------------------------------------------------------------*/

			case 'subapp':

				this.loadSubApp(url).then((data) => {

					result.push(data);

					this.__loadXXX(deferred, result, urls, dataType, context);

				}, (message) => {

					deferred.rejectWith(context, [message]);
				});

				break;

			/*-------------------------------------------------------------*/
			/* SHEET                                                       */
			/*-------------------------------------------------------------*/

			case 'sheet':

				if(this._sheets.indexOf(url) >= 0)
				{
					result.push(false);

					this.__loadXXX(deferred, result, urls, dataType, context);
				}
				else
				{
					$.ajax({
						url: url,
						async: false,
						cache: false,
						crossDomain: true,
						dataType: dataTYPE,
					}).then(() => {

						result.push(true);

						this._sheets.push(url);

						this.__loadXXX(deferred, result, urls, dataType, context);

					}, () => {

						deferred.rejectWith(context, ['could not load `' + url + '`']);
					});
				}

				break;

			/*-------------------------------------------------------------*/
			/* SCRIPT                                                      */
			/*-------------------------------------------------------------*/

			case 'script':

				if(this._scripts.indexOf(url) >= 0)
				{
					result.push(false);

					this.__loadXXX(deferred, result, urls, dataType, context);
				}
				else
				{
					$.ajax({
						url: url,
						async: false,
						cache: false,
						crossDomain: true,
						dataType: dataTYPE,
					}).then(() => {

						result.push(true);

						this._scripts.push(url);

						this.__loadXXX(deferred, result, urls, dataType, context);

					}, () => {

						deferred.rejectWith(context, ['could not load `' + url + '`']);
					});
				}

				break;

			/*-------------------------------------------------------------*/
			/* OTHER                                                       */
			/*-------------------------------------------------------------*/

			default:

				$.ajax({
					url: url,
					async: true,
					cache: false,
					crossDomain: true,
					dataType: dataTYPE,
				}).then((data) => {

					result.push(data);

					this.__loadXXX(deferred, result, urls, dataType, context);

				}, () => {

					deferred.rejectWith(context, ['could not load `' + url + '`']);
				});

				break;

			/*-------------------------------------------------------------*/
		}

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	_loadXXX: function(urls, dataType, settings)
	{
		const deferred = $.Deferred();

		const [context] = this.setup(
			['context'],
			[deferred],
			settings
		);

		/*-----------------------------------------------------------------*/

		this.__loadXXX(deferred, [], this.asArray(urls), dataType, context);

		/*-----------------------------------------------------------------*/

		return deferred.promise();
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Asynchronously loads resources by extension
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadResources: function(urls, settings)
	{
		return this._loadXXX(urls, 'auto', settings);
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Asynchronously loads CSS sheets
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadSheets: function(urls, settings)
	{
		return this._loadXXX(urls, 'sheet', settings);
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Asynchronously loads JS scripts
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadScripts: function(urls, settings)
	{
		return this._loadXXX(urls, 'script', settings);
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Asynchronously loads JSON files
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadJSONs: function(urls, settings)
	{
		return this._loadXXX(urls, 'json', settings);
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Asynchronously loads XML files
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadXMLs: function(urls, settings)
	{
		return this._loadXXX(urls, 'xml', settings);
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Asynchronously loads HTML files
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadHTMLs: function(urls, settings)
	{
		return this._loadXXX(urls, 'text', settings);
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Asynchronously loads TWIG files
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadTWIGs: function(urls, settings)
	{
		return this._loadXXX(urls, 'text', settings);
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Asynchronously loads text files
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadTexts: function(urls, settings)
	{
		return this._loadXXX(urls, 'text', settings);
	},

	/*---------------------------------------------------------------------*/
	/* HTML CONTENT                                                        */
	/*---------------------------------------------------------------------*/

	_xxxHTML: function(selector, twig, mode, settings)
	{
		const result = $.Deferred();

		const [context, suffix, dict] = this.setup(
			['context', 'suffix', 'dict'],
			[result, null, null],
			settings
		);

		/*-----------------------------------------------------------------*/

		if(suffix)
		{
			twig = twig.replace(this._idRegExp, function(id) {

				return id + '_instance' + suffix;
			});
		}

		const html = this.formatTWIG(twig, dict);

		/*-----------------------------------------------------------------*/

		let promise;

		let el = $(selector);

		switch(mode)
		{
			case 0:
				promise = el.html(html).promise();
				break;

			case 1:
				promise = el.prepend(html).promise();
				break;

			case 2:
				promise = el.append(html).promise();
				break;

			case 3:
				promise = el.replaceWith(el.is('[id]') ? html.replace(/^\s*(<[a-zA-Z_-]+)/, '$1 id="' + el.attr('id') + '"') : html).promise();
				break;

			default:
				throw 'internal error';
		}

		/*-----------------------------------------------------------------*/

		promise.done(() => {

			/*-------------------------------------------------------------*/

			let el = $(selector);

			/*-------------------------------------------------------------*/

			const _find = mode === 3 ? (_selector) => el.findWithSelf(_selector)
			                         : (_selector) => el.    find    (_selector)
			;

			/*-------------------------------------------------------------*/

			if(jQuery.fn.tooltip)
			{
				_find('[data-toggle="tooltip"]').tooltip({
					html: false,
					delay: {
						show: 500,
						hide: 100,
					},
				});
			}

			/*-------------------------------------------------------------*/

			if(jQuery.fn.popover)
			{
				_find('[data-toggle="popover"]').popover({
					html: true,
					delay: {
						show: 500,
						hide: 100,
					},
				});
			}

			/*-------------------------------------------------------------*/

			if(jQuery.fn.datetimepicker)
			{
				_find('.form-datetime').datetimepicker({
					format: 'YYYY-MM-DD HH:mm:ss.SSSSSS'
				});

				_find('.form-date').datetimepicker({
					format: 'YYYY-MM-DD'
				});

				_find('.form-time').datetimepicker({
					format: 'HH:mm:ss'
				});
			}

			/*-------------------------------------------------------------*/

			result.resolveWith(context, [el]);

			/*-------------------------------------------------------------*/
		});

		/*-----------------------------------------------------------------*/

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	replaceHTML: function(selector, twig, settings)
	{
		return this._xxxHTML(selector, twig, 0, settings);
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	prependHTML: function(selector, twig, settings)
	{
		return this._xxxHTML(selector, twig, 1, settings);
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	appendHTML: function(selector, twig, settings)
	{
		return this._xxxHTML(selector, twig, 2, settings);
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Interpretes the given TWIG string, see {@link http://twig.sensiolabs.org/documentation}
	  * @param {String} twig the TWIG string
	  * @param {Object|Array} [dict] the dictionary
	  * @returns {String} The Interpreted TWIG string
	  */

	formatTWIG: function(twig, dict)
	{
		const result = [];

		/*-----------------------------------------------------------------*/

		const render = (twig, dict) => {

			if(this.typeOf(dict) !== 'Object')
			{
				dict = {};
			}

			dict['ORIGIN_URL'] = this.originURL;
			dict['WEBAPP_URL'] = this.webAppURL;

			return amiTwig.engine.render(twig, dict);
		};

		/*-----------------------------------------------------------------*/

		try
		{
			if(this.typeOf(dict) === 'Array')
			{
				dict.forEach((DICT) => {

					result.push(render(twig, DICT));
				});
			}
			else
			{
				result.push(render(twig, dict));
			}
		}
		catch(error)
		{
			result.length = 0;

			this.error('TWIG parsing error: ' + error.message);
		}

		/*-----------------------------------------------------------------*/

		return result.join('');
	},

	/*---------------------------------------------------------------------*/
	/* JSPATH                                                              */
	/*---------------------------------------------------------------------*/

	/**
	  * Finds data within the given JSON, see {@link https://github.com/dfilatov/jspath}
	  * @param {String} path the path
	  * @param {Object} json the JSON
	  * @returns {Array} The resulting array
	  */

	jspath: function(path, json)
	{
		return JSPath.apply(path, json);
	},

	/*---------------------------------------------------------------------*/
	/* STACK                                                               */
	/*---------------------------------------------------------------------*/

	getStack: function()
	{
		try
		{
			throw Error();
		}
		catch(e1)
		{
			try
			{
				return e1.stack;
			}
			catch(e2)
			{
				return ((('')));
			}
		}
	},

	/*---------------------------------------------------------------------*/
	/* LOCK                                                                */
	/*---------------------------------------------------------------------*/

	/**
	  * Locks the Web application
	  */

	lock: function()
	{
		let lines = this.getStack().split('\n');

		if(lines.length > 2)
		{
			console.log('lock[' + this._lockCnt + '] :: ' + lines[2]); // eslint-disable-line no-console
		}

		/**/

		if(this._lockCnt <= 0)
		{
			$('#ami_locker').css('display', 'flex');

			this._lockCnt = 1;
		}
		else
		{
			this._lockCnt++;
		}
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Unlocks the Web application
	  */

	unlock: function()
	{
		if(this._lockCnt <= 1)
		{
			$('#ami_locker').css('display', 'none');

			this._lockCnt = 0;
		}
		else
		{
			this._lockCnt--;
		}

		/**/

		let lines = this.getStack().split('\n');

		if(lines.length > 2)
		{
			console.log('unlock[' + this._lockCnt + '] :: ' + lines[2]); // eslint-disable-line no-console
		}
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Enables the message in a confirmation dialog box to inform that the user is about to leave the current page.
	  */

	canLeave: function()
	{
		this._canLeave = true;
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Disables the message in a confirmation dialog box to inform that the user is about to leave the current page.
	  */

	cannotLeave: function()
	{
		this._canLeave = false;
	},

	/*---------------------------------------------------------------------*/
	/* MESSAGES                                                            */
	/*---------------------------------------------------------------------*/

	_publishAlert: function(clazz, title, message, fadeOut)
	{
		/*-----------------------------------------------------------------*/

		console.log('AMI ' + title.toUpperCase() + ': ' + message + '\n' + this.getStack()); // eslint-disable-line no-console

		/*-----------------------------------------------------------------*/

		const html = '<div class="toast" role="alert" ' + (fadeOut ? 'data-delay="60000"' : 'data-autohide="false"') + '><div class="toast-header"><strong class="mr-auto ' + clazz + '">' + title + '</strong><small>' + this.textToHtml(window.moment().format('DD MMM, HH:mm:ss')) + '</small><button type="button" class="ml-2 mb-1 close" data-dismiss="toast"><span>&times;</span></button></div><div class="toast-body">' + this.textToHtml(message) + '</div></div>';

		/*-----------------------------------------------------------------*/

		const el = $('#ami_alert_content');

		el.append(html.replace(this._linkExp, '<a href="$1" target="_blank">$2</a>')).promise().done(() => {

			el.find('.toast:last-child').toast('show');

			$(document).scrollTop(0);

			this.unlock();
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Shows an 'info' message
	  * @param {String|Array} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  */

	info: function(message, fadeOut)
	{
		if(this.typeOf(message) === 'Array')
		{
			message = message.join('. ');
		}

		this._publishAlert('text-info', 'Info', message, fadeOut);
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Shows a 'success' message
	  * @param {String|Array} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  */

	success: function(message, fadeOut)
	{
		if(this.typeOf(message) === 'Array')
		{
			message = message.join('. ');
		}

		this._publishAlert('text-success', 'Success', message, fadeOut);
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Shows a 'warning' message
	  * @param {String|Array} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  */

	warning: function(message, fadeOut)
	{
		if(this.typeOf(message) === 'Array')
		{
			message = message.join('. ');
		}

		this._publishAlert('text-warning', 'Warning', message, fadeOut);
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Shows an 'error' message
	  * @param {String|Array} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  */

	error: function(message, fadeOut)
	{
		if(this.typeOf(message) === 'Array')
		{
			message = message.join('. ');
		}

		this._publishAlert('text-danger', 'Error', message, fadeOut);
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Flushes messages
	  */

	flush: function()
	{
		$('#ami_alert_content').empty();
	},

	/*---------------------------------------------------------------------*/
	/* BREADCRUMB                                                          */
	/*---------------------------------------------------------------------*/

	/**
	  * Fill the main breadcrumb
	  * @param {Array} items the array of items (HTML format)
	  */

	fillBreadcrumb: function(items)
	{
		let s = this.typeOf(items) === 'Array' ? items.map((item) => '<li class="breadcrumb-item">' + item.replace(/{{WEBAPP_URL}}/g, this.webAppURL) + '</li>').join('')
		                                       : ''
		;

		$('#ami_breadcrumb_content').html(s);
	},

	/*---------------------------------------------------------------------*/
	/* WEB APPLICATION                                                     */
	/*---------------------------------------------------------------------*/

	/**
	  * This method must be overloaded and is called when the Web application starts
	  * @event amiWebApp#onReady
	  * @param {String} userData
	  */

	onReady: function()
	{
		if(!this._embedded)
		{
			alert('error: `amiWebApp.onReady()` must be overloaded!'); // eslint-disable-line no-alert
		}
	},

	/*---------------------------------------------------------------------*/

	/**
	  * This method must be overloaded and is called when the toolbar needs to be updated
	  * @event amiWebApp#onRefresh
	  * @param {Boolean} isAuth
	  */

	onRefresh: function()
	{
		if(!this._embedded)
		{
			alert('error: `amiWebApp.onRefresh()` must be overloaded!'); // eslint-disable-line no-alert
		}
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Starts the Web application
	  * @param {Object} [settings] dictionary of settings (logo_url, home_url, contact_email, about_url, theme_url, locker_url)
	  */

	start: function(settings)
	{
		const [logo_url, home_url, contact_email, about_url, theme_url, locker_url, endpoint_url] = this.setup(
			['logo_url', 'home_url', 'contact_email', 'about_url', 'theme_url', 'locker_url', 'endpoint_url'],
			[
				this.originURL
					+ '/images/logo.png',
				this.webAppURL,
				'ami@lpsc.in2p3.fr',
				'http://cern.ch/ami/',
				this.originURL + '/twig/AMI/Theme/blue.twig',
				this.originURL + '/twig/AMI/Fragment/locker.twig',
				this.originURL + '/AMI/FrontEnd',
			],
			settings
		);

		/*-----------------------------------------------------------------*/

		amiCommand.endpoint = endpoint_url;

		/*-----------------------------------------------------------------*/

		window.onbeforeunload = (e) => {

			if(!this._canLeave)
			{
				const f = e || window.event;

				if(f)
				{
					f.returnValue = 'Confirm that you want to leave this page?';
				}

				return 'Confirm that you want to leave this page?';
			}
		};

		/*-----------------------------------------------------------------*/

		const controls_url = this.originURL + '/controls/CONTROLS.json';

		const subapps_url = this.originURL + '/subapps/SUBAPPS.json';

		/*-----------------------------------------------------------------*/

		$.ajax({url: controls_url, cache: false, crossDomain: true, dataType: 'json'}).then((data1) => {

			$.ajax({url: subapps_url, cache: false, crossDomain: true, dataType: 'json'}).then((data2) => {

				for(const name in data1) {
					this._controls[name.toLowerCase()] = data1[name];
				}

				for(const name in data2) {
					this._subapps[name.toLowerCase()] = data2[name];
				}

				if(!this._embedded)
				{
					/*-----------------------------------------------------*/

					const dict = {
						LOGO_URL: logo_url,
						HOME_URL: home_url,
						CONTACT_EMAIL: contact_email,
						ABOUT_URL: about_url,
					};

					/*-----------------------------------------------------*/

					$.ajax({url: theme_url, cache: true, crossDomain: true, dataType: 'text'}).then((data3) => {

						$.ajax({url: locker_url, cache: true, crossDomain: true, dataType: 'text'}).then((data4) => {

							$('body').append(this.formatTWIG(data3, dict) + data4).promise().done(() => {

								this.lock();

								amiLogin._start().done(() => {

									this.unlock();

								}).fail((message) => {

									this.error(message);
								});
							});

						}, () => {

							alert('could not open `' + locker_url + '`, please reload the page...'); // eslint-disable-line no-alert
						});

					}, () => {

						alert('could not open `' + theme_url + '`, please reload the page...'); // eslint-disable-line no-alert
					});

					/*-----------------------------------------------------*/
				}
				else
				{
					/*-----------------------------------------------------*/

					$.ajax({url: locker_url, cache: true, crossDomain: true, dataType: 'text'}).done((data3) => {

						$('body').append(data3).promise().done(() => {

							this.lock();

							amiLogin._start().done(() => {

								this.unlock();

							}).fail((message) => {

								this.error(message);
							});
						});
					});

					/*-----------------------------------------------------*/
				}

			}, () => {

				alert('could not open `' + subapps_url + '`, please reload the page...'); // eslint-disable-line no-alert
			});

		}, () => {

			alert('could not open `' + controls_url + '`, please reload the page...'); // eslint-disable-line no-alert
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/
	/* CONTROLS                                                            */
	/*---------------------------------------------------------------------*/

	/**
	  * Asynchronously loads a control
	  * @param {String} control the array of control name
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadControl: function(control, settings)
	{
		const result = $.Deferred();

		const [context] = this.setup(
			['context'],
			[result],
			settings
		);

		/*-----------------------------------------------------------------*/

		if(control.indexOf('ctrl:') === 0)
		{
			control = control.substring(5);
		}

		const descr = this._controls[control.toLowerCase()];

		/*-----------------------------------------------------------------*/

		if(descr)
		{
			this.loadScripts(this.originURL + '/' + descr.file).then((loaded) => {

				try
				{
					const clazz = window[
						descr.clazz
					];

					const promise = loaded[0] ? clazz.prototype.onReady.apply(clazz.prototype)
					                          : /*----------------*/ null /*----------------*/
					;

					_ami_internal_then(promise, () => {

						result.resolveWith(context, [/*--------------------*/ clazz /*--------------------*/]);

					}, (message) => {

						result.rejectWith(context, ['could not load control `' + control + '`: ' + message]);
					});
				}
				catch(message)
				{
					result.rejectWith(context, ['could not load control `' + control + '`: ' + message]);
				}

			}, (message) => {

				result.rejectWith(context, ['could not load control `' + control + '`: ' + message]);
			});
		}
		else
		{
			result.rejectWith(context, ['could not find control `' + control + '`']);
		}

		/*-----------------------------------------------------------------*/

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Asynchronously create a control
	  * @param {Object} [parent] ???
	  * @param {Object} [owner] ???
	  * @param {String} control ???
	  * @param {Array} params ???
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	createControl: function(parent, owner, control, params, settings)
	{
		const result = $.Deferred();

		const [context] = this.setup(
			['context'],
			[result],
			settings
		);

		/*-----------------------------------------------------------------*/

		this.loadControl(control, settings).done((constructor) => {

			let instance = new constructor(parent, owner);

			_ami_internal_then(constructor.prototype.render.apply(instance, params), function() {

				result.resolveWith(context, [instance].concat([...arguments]));

			}, (message) => {

				result.rejectWith(context, [message]);
			});

		}).fail((message) => {

			result.rejectWith(context, [message]);
		});

		/*-----------------------------------------------------------------*/

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Asynchronously create a control in a container
	  * @param {Object} [parent] ???
	  * @param {Object} [owner] ???
	  * @param {String} control ???
	  * @param {Array} paramsWithoutSettings ???
	  * @param {Object} controlSettings ???
	  * @param {Object} parentSettings ???
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	createControlInBody: function(parent, owner, control, controlParamsWithoutSettings, controlSettings, parentSettings, settings)
	{
		const result = $.Deferred();

		const [context] = this.setup(
			['context'],
			[result],
			settings
		);

		/*-----------------------------------------------------------------*/

		try
		{
			let PARAMS = [];
			let SETTINGS = {};

			/*-------------------------------------------------------------*/

			for(let key in parentSettings) {
				SETTINGS[key] = parentSettings[key];
			}

			for(let key in controlSettings) {
				SETTINGS[key] = controlSettings[key];
			}

			/*-------------------------------------------------------------*/

			//////.push(selector);

			Array.prototype.push.apply(PARAMS, controlParamsWithoutSettings);

			PARAMS.push(SETTINGS);

			/*-------------------------------------------------------------*/

			this.createControl(parent, owner, control, PARAMS).done(function() {

				result.resolveWith(context, [...arguments]);

			}).fail((message) => {

				result.rejectWith(context, [message]);
			});

			/*-------------------------------------------------------------*/
		}
		catch(message)
		{
			result.rejectWith(context, [message]);
		}

		/*-----------------------------------------------------------------*/

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Asynchronously create a control in a container
	  * @param {Object} [parent] ???
	  * @param {Object} [owner] ???
	  * @param {String} control ???
	  * @param {Array} paramsWithoutSettings ???
	  * @param {Object} controlSettings ???
	  * @param {Object} parentSettings ???
	  * @param {String} icon ???
	  * @param {String} title ???
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	createControlInContainer: function(parent, owner, control, controlParamsWithoutSettings, controlSettings, parentSettings, icon, title, settings)
	{
		const result = $.Deferred();

		const [context] = this.setup(
			['context'],
			[result],
			settings
		);

		/*-----------------------------------------------------------------*/

		try
		{
			parent.appendItem('<i class="fa fa-' + this.textToHtml(icon) + '"></i> ' + this.textToHtml(title)).done((selector) => {

				let PARAMS = [];
				let SETTINGS = {};

				/*---------------------------------------------------------*/

				for(let key in parentSettings) {
					SETTINGS[key] = parentSettings[key];
				}

				for(let key in controlSettings) {
					SETTINGS[key] = controlSettings[key];
				}

				/*---------------------------------------------------------*/

				PARAMS.push(selector);

				Array.prototype.push.apply(PARAMS, controlParamsWithoutSettings);

				PARAMS.push(SETTINGS);

				/*---------------------------------------------------------*/

				this.createControl(parent, owner, control, PARAMS).done(function() {

					result.resolveWith(context, [...arguments]);

				}).fail((message) => {

					result.rejectWith(context, [message]);
				});

				/*---------------------------------------------------------*/
			});
		}
		catch(message)
		{
			result.rejectWith(context, [message]);
		}

		/*-----------------------------------------------------------------*/

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Asynchronously create a control in a container from a WEB link
	  * @param {Object} [parent] ???
	  * @param {Object} [owner] ???
	  * @param {String} el ???
	  * @param {Object} parentSettings ???
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	createControlFromWebLink: function(parent, owner, el, parentSettings, settings)
	{
		/*-----------------------------------------------------------------*/

		let dataCtrl = el.hasAttribute('data-ctrl') ? el.getAttribute('data-ctrl')
		                                            : ''
		;

		let dataCtrlLocation = el.hasAttribute('data-ctrl-location') ? el.getAttribute('data-ctrl-location')
		                                                             : ''
		;

		/*-----------------------------------------------------------------*/

		let dataParams = el.hasAttribute('data-params') ? JSON.parse(el.getAttribute('data-params'))
		                                                : []
		;

		let dataSettings = el.hasAttribute('data-settings') ? JSON.parse(el.getAttribute('data-settings'))
		                                                    : {}
		;

		/*-----------------------------------------------------------------*/

		let dataIcon = el.hasAttribute('data-icon') ? el.getAttribute('data-icon')
		                                            : 'question'
		;

		let dataTitle = el.hasAttribute('data-title') ? el.getAttribute('data-title')
		                                              : 'Unknown'
		;

		/*-----------------------------------------------------------------*/

		this.lock();

		/**/ if(dataCtrlLocation === 'body')
		{
			return this.createControlInBody(parent, owner, dataCtrl, dataParams, dataSettings, parentSettings, settings).done(() => {

				this.unlock();

			}).fail((message) => {

				this.error(message);
			});
		}
		else
		{
			return this.createControlInContainer(parent, owner, dataCtrl, dataParams, dataSettings, parentSettings, dataIcon, dataTitle, settings).done(() => {

				this.unlock();

			}).fail((message) => {

				this.error(message);
			});
		}

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/
	/* SUBAPPS                                                             */
	/*---------------------------------------------------------------------*/

	triggerLogin: function()
	{
		const result = $.Deferred();

		/*-----------------------------------------------------------------*/

		if(this._isReady)
		{
			_ami_internal_then(this._currentSubAppInstance.onLogin(this.args['userdata']), (message) => {

				_ami_internal_always(this.onRefresh(true), () => {

					result.resolve(message);
				});

			}, (message) => {

				_ami_internal_always(this.onRefresh(true), () => {

					result.reject(message);
				});
			});
		}
		else
		{
			result.resolve();
		}

		/*-----------------------------------------------------------------*/

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	triggerLogout: function()
	{
		const result = $.Deferred();

		/*-----------------------------------------------------------------*/

		if(this._isReady)
		{
			_ami_internal_then(this._currentSubAppInstance.onLogout(this.args['userdata']), (message) => {

				_ami_internal_always(this.onRefresh(false), () => {

					result.resolve(message);
				});

			}, (message) => {

				_ami_internal_always(this.onRefresh(false), () => {

					result.reject(message);
				});
			});
		}
		else
		{
			result.resolve();
		}

		/*-----------------------------------------------------------------*/

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Asynchronously loads a subapp
	  * @param {String} subapp the subapp
	  * @param {?} [userdata] the user data
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadSubApp: function(subapp, userdata, settings)
	{
		const result = $.Deferred();

		const [context] = this.setup(
			['context'],
			[result],
			settings
		);

		/*-----------------------------------------------------------------*/

		this.lock();

		result.always(() => {

			this.unlock();
		});

		/*-----------------------------------------------------------------*/

		if(subapp.indexOf('subapp:') === 0)
		{
			subapp = subapp.substring(7);
		}

		const descr = this._subapps[subapp.toLowerCase()];

		/*-----------------------------------------------------------------*/

		if(descr)
		{
			this.loadScripts(this.originURL + '/' + descr.file).then((loaded) => {

				try
				{
					this._currentSubAppInstance.onExit(userdata);

					const instance = window[descr.instance];

					this._currentSubAppInstance = instance;

					/**/

					this.fillBreadcrumb(descr.breadcrumb);

					const promise = loaded[0] ? instance.onReady(userdata)
					                          : /*------*/ null /*------*/
					;

					_ami_internal_then(promise, () => {

						const promise = amiLogin.isAuthenticated() ? this.triggerLogin()
						                                           : this.triggerLogout()
						;

						promise.then(() => {

							result.resolveWith(context, [/*------------------*/ instance /*------------------*/]);

						}, (message) => {

							result.rejectWith(context, ['could not load subapp `' + subapp + '`: ' + message]);
						});

					}, (message) => {

						result.rejectWith(context, ['could not load subapp `' + subapp + '`: ' + message]);
					});
				}
				catch(message)
				{
					result.rejectWith(context, ['could not load subapp `' + subapp + '`: ' + message]);
				}

			}, (message) => {

				result.rejectWith(context, ['could not load subapp `' + subapp + '`: ' + message]);
			});
		}
		else
		{
			result.rejectWith(context, ['could not find subapp `' + subapp + '`']);
		}

		/*-----------------------------------------------------------------*/

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Loads a subapp by URL
	  * @param {String} defaultSubApp if 'amiWebApp.args["subapp"]' is null, the default subapp
	  * @param {?} [defaultUserData] if 'amiWebApp.args["userdata"]' is null, the default user data
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadSubAppByURL: function(defaultSubApp, defaultUserData)
	{
		const result = $.Deferred();

		if(this.args['v'])
		{
			amiCommand.execute('GetHashInfo -hash="' + this.textToString(this.args['v']) + '"').fail((data) => {

				result.reject(this.jspath('..error.$', data));

			}).done((data) => {

				let json;

				try
				{
					json = JSON.parse(this.jspath('..field{.@name==="json"}.$', data)[0] || '{}');
				}
				catch(message)
				{
					json = {/* EMPTY JSON   EMPTY JSON   EMPTY JSON   EMPTY JSON   EMPTY JSON */};
				}

				/*---------------------------------------------------------*/

				const subapp = json['subapp'] || defaultSubApp;
				const userdata = json['userdata'] || defaultUserData;

				this.loadSubApp(subapp, userdata).then(() => {

					result.resolve();

				}, (message) => {

					result.reject(message);
				});

				/*---------------------------------------------------------*/
			});
		}
		else
		{
			if(!amiRouter.check())
			{
				/*---------------------------------------------------------*/

				const subapp = this.args['subapp'] || defaultSubApp;
				const userdata = this.args['userdata'] || defaultUserData;

				this.loadSubApp(subapp, userdata).then(() => {

					result.resolve();

				}, (message) => {

					result.reject(message);
				});

				/*---------------------------------------------------------*/
			}
		}

		return result.promise();
	}

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------*/
/* ami.IControl                                                            */
/*-------------------------------------------------------------------------*/

/**
 * The AMI control interface
 * @interface ami.IControl
 */

$AMIInterface('ami.IControl', /** @lends ami.IControl */ {
	/*---------------------------------------------------------------------*/

	/**
	  * Patches an HTML identifier
	  * @param {String} id the unpatched HTML identifier
	  * @returns {String} The patched HTML identifier
	  */

	patchId: function() {},

	/*---------------------------------------------------------------------*/

	/**
	  * Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	replaceHTML: function() {},

	/*---------------------------------------------------------------------*/

	/**
	  * Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	prependHTML: function() {},

	/*---------------------------------------------------------------------*/

	/**
	  * Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	appendHTML: function() {},

	/*---------------------------------------------------------------------*/

	/**
	  * Called when the control is ready to run
	  */

	onReady: function() {},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* ami.ISubApp                                                             */
/*-------------------------------------------------------------------------*/

/**
 * The AMI sub-application interface
 * @interface ami.ISubApp
 */

$AMIInterface('ami.ISubApp', /** @lends ami.ISubApp */ {
	/*---------------------------------------------------------------------*/

	/**
	  * Called when the sub-application is ready to run
	  * @param {?} userdata userdata
	  */

	onReady: function() {},

	/*---------------------------------------------------------------------*/

	/**
	  * Called when the sub-application is about to exit
	  * @param {?} userdata userdata
	  */

	onExit: function() {},

	/*---------------------------------------------------------------------*/

	/**
	  * Called when logging in
	  * @param {?} userdata userdata
	  */

	onLogin: function() {},

	/*---------------------------------------------------------------------*/

	/**
	  * Called when logging out
	  * @param {?} userdata userdata
	  */

	onLogout: function() {},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* ami.Control                                                             */
/*-------------------------------------------------------------------------*/

/**
 * The basic AMI control
 * @class ami.Control
 * @implements {ami.IControl}
 */

$AMIClass('ami.Control', /** @lends ami.Control */ {
	/*---------------------------------------------------------------------*/

	$implements: [ami.IControl],

	/*---------------------------------------------------------------------*/

	$: function()
	{
		ami.Control.instanceCnt = 1;
	},

	/*---------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this._parent = parent || this;
		this._owner = owner || this;

		this.instanceSuffix = ami.Control.instanceCnt++;
	},

	/*---------------------------------------------------------------------*/

	setParent: function(parent)
	{
		return this._parent = (parent || this);
	},

	getParent: function()
	{
		return this._parent;
	},

	/*---------------------------------------------------------------------*/

	setOwner: function(owner)
	{
		return this._owner = (owner || this);
	},

	getOwner: function()
	{
		return this._owner;
	},

	/*---------------------------------------------------------------------*/

	setSelector: function(selector)
	{
		return this._selector = (selector || '');
	},

	getSelector: function()
	{
		return this._selector;
	},

	/*---------------------------------------------------------------------*/

	patchId: function(identifier)
	{
		return identifier + '_instance' + this.instanceSuffix;
	},

	/*---------------------------------------------------------------------*/

	replaceHTML: function(selector, twig, settings)
	{
		if(!settings)
		{
			settings = {};
		}

		settings.suffix = this.instanceSuffix;

		return amiWebApp.replaceHTML(selector, twig, settings);
	},

	/*---------------------------------------------------------------------*/

	prependHTML: function(selector, twig, settings)
	{
		if(!settings)
		{
			settings = {};
		}

		settings.suffix = this.instanceSuffix;

		return amiWebApp.prependHTML(selector, twig, settings);
	},

	/*---------------------------------------------------------------------*/

	appendHTML: function(selector, twig, settings)
	{
		if(!settings)
		{
			settings = {};
		}

		settings.suffix = this.instanceSuffix;

		return amiWebApp.appendHTML(selector, twig, settings);
	},

	/*---------------------------------------------------------------------*/

	createControl: function(parent, control, params, settings)
	{
		return amiWebApp.createControl(parent, this, control, params, settings);
	},

	/*---------------------------------------------------------------------*/

	createControlInBody: function(parent, control, controlParamsWithoutSettings, controlSettings, parentSettings, settings)
	{
		return amiWebApp.createControlInBody(parent, this, control, controlParamsWithoutSettings, controlSettings, parentSettings, settings);
	},

	/*---------------------------------------------------------------------*/

	createControlInContainer: function(parent, control, controlParamsWithoutSettings, controlSettings, parentSettings, icon, title, settings)
	{
		return amiWebApp.createControlInContainer(parent, this, control, controlParamsWithoutSettings, controlSettings, parentSettings, icon, title, settings);
	},

	/*---------------------------------------------------------------------*/

	createControlFromWebLink: function(parent, el, parentSettings, settings)
	{
		return amiWebApp.createControlFromWebLink(parent, this, el, parentSettings, settings);
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* ami.SubApp                                                              */
/*-------------------------------------------------------------------------*/

/**
 * The basic AMI sub-application
 * @class ami.SubApp
 * @implements {ami.ISubApp}
 */

$AMIClass('ami.SubApp', /** @lends ami.SubApp */ {
	/*---------------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*---------------------------------------------------------------------*/

	onExit: function() {},

	/*---------------------------------------------------------------------*/

	onLogin: function() {},

	/*---------------------------------------------------------------------*/

	onLogout: function() {},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------*/
/* amiCommand                                                              */
/*-------------------------------------------------------------------------*/

/**
 * The AMI command subsystem
 * @namespace amiCommand
 */

$AMINamespace('amiCommand', /** @lends amiCommand */ {
	/*---------------------------------------------------------------------*/
	/* PUBLIC MEMBERS                                                      */
	/*---------------------------------------------------------------------*/

	/**
	  * Default endpoint
	  * @type {String}
	  */

	endpoint: 'http://xxyy.zz',

	/**
	  * Default converter
	  * @type {String}
	  */

	converter: 'AMIXmlToJson.xsl',

	/*---------------------------------------------------------------------*/
	/* PUBLIC METHODS                                                      */
	/*---------------------------------------------------------------------*/

	/**
	  * Executes an AMI command
	  * @param {String} command the command
	  * @param {Object} [settings] dictionary of settings (context, endpoint, converter, timeout, extraParam, extraValue)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	execute: function(command, settings)
	{
		const result = $.Deferred();

		const [endpoint, converter, context, timeout, extraParam, extraValue] = amiWebApp.setup(
			['endpoint', 'converter', 'context', 'timeout', 'extraParam', 'extraValue'],
			[this.endpoint, this.converter, result, 2 * 60 * 1000, null, null],
			settings
		);

		/*-----------------------------------------------------------------*/

		const URL = endpoint.trim();
		const COMMAND = command.trim();
		const CONVERTER = converter.trim();

		/*-----------------------------------------------------------------*/

		const data = {
			Command: COMMAND,
			Converter: CONVERTER,
		};

		if(extraParam)
		{
			data[extraParam] = extraValue ? extraValue
			                              : (((null)))
			;
		}

		/*-----------------------------------------------------------------*/

		const urlWithParameters = URL + '?' + $.param(data);

		/*-----------------------------------------------------------------*/

		if(CONVERTER === 'AMIXmlToJson.xsl')
		{
			/*-------------------------------------------------------------*/
			/* JSON FORMAT                                                 */
			/*-------------------------------------------------------------*/

			$.ajax({
				url: URL,
				data: data,
				type: 'POST',
				timeout: timeout,
				dataType: 'json',
				xhrFields: {
					withCredentials: true
				},
				success: (data) => {

					const info = JSPath.apply('.AMIMessage.info.$', data);
					const error = JSPath.apply('.AMIMessage.error.$', data);

					if(error.length === 0)
					{
						result.resolveWith(context, [data, info.join('. '), urlWithParameters]);
					}
					else
					{
						result.rejectWith(context, [data, error.join('. '), urlWithParameters]);
					}
				},
				error: (jqXHR, textStatus) => {

					if(textStatus === 'error')
					{
						textStatus = 'service temporarily unreachable';
					}

					if(textStatus === 'parsererror')
					{
						textStatus = 'resource temporarily unreachable';
					}

					const data = {'AMIMessage': [{'error': [{'$': textStatus}]}]};

					result.rejectWith(context, [data, textStatus, urlWithParameters]);
				},
			});

			/*-------------------------------------------------------------*/
		} else {
			/*-------------------------------------------------------------*/
			/* OTHER FORMATS                                               */
			/*-------------------------------------------------------------*/

			$.ajax({
				url: URL,
				data: data,
				type: 'POST',
				timeout: timeout,
				dataType: 'text',
				xhrFields: {
					withCredentials: true
				},
				success: (data) => {

					result.resolveWith(context, [data, data, urlWithParameters]);
				},
				error: (jqXHR, textStatus) => {

					if(textStatus === 'error')
					{
						textStatus = 'service temporarily unreachable';
					}

					result.rejectWith(context, [textStatus, textStatus, urlWithParameters]);
				},
			});

			/*-------------------------------------------------------------*/
		}

		/*-----------------------------------------------------------------*/

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Logs in by login/password
	  * @param {String} user the user
	  * @param {String} pass the password
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	passLogin: function(user, pass, settings)
	{
		const result = $.Deferred();

		const [context] = amiWebApp.setup(
			['context'],
			[result],
			settings
		);

		/*-----------------------------------------------------------------*/

		this.execute('GetSessionInfo -AMIUser="' + amiWebApp.textToString(user) + '" -AMIPass="' + amiWebApp.textToString(pass) + '"', {extraParam: 'NoCert'}).then((data, message) => {

			const userInfo = {};
			const roleInfo = {};
			const udpInfo = {};
			const ssoInfo = {}

			JSPath.apply('..rowset{.@type==="user"}.row.field', data).forEach((item) => {

				userInfo[item['@name']] = item['$'];
			});

			JSPath.apply('..rowset{.@type==="udp"}.row.field', data).forEach((item) => {

				udpInfo[item['@name']] = item['$'];
			});

			JSPath.apply('..rowset{.@type==="sso"}.row.field', data).forEach((item) => {

				ssoInfo[item['@name']] = item['$'];
			});

			JSPath.apply('..rowset{.@type==="role"}.row', data).forEach((row) => {

				let name = '';
				const role = {};

				row.field.forEach((field) => {

					role[field['@name']] = field['$'];

					if(field['@name'] === 'name')
					{
						name = field['$'];
					}
				});

				roleInfo[name] = role;
			});

			result.resolveWith(context, [data, message, userInfo, roleInfo, udpInfo, ssoInfo]);

		}, (data, message) => {

			result.rejectWith(context, [data, message, {AMIUser: 'guest', guestUser: 'guest'}, {}, {}, {}]);
		});

		/*-----------------------------------------------------------------*/

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Logs in by certificate
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	certLogin: function(settings)
	{
		const result = $.Deferred();

		const [context] = amiWebApp.setup(
			['context'],
			[result],
			settings
		);

		/*-----------------------------------------------------------------*/

		this.execute('GetSessionInfo').then((data, message) => {

			const userInfo = {};
			const roleInfo = {};
			const udpInfo = {};
			const ssoInfo = {};

			JSPath.apply('..rowset{.@type==="user"}.row.field', data).forEach((item) => {

				userInfo[item['@name']] = item['$'];
			});

			JSPath.apply('..rowset{.@type==="udp"}.row.field', data).forEach((item) => {

				udpInfo[item['@name']] = item['$'];
			});

			JSPath.apply('..rowset{.@type==="sso"}.row.field', data).forEach((item) => {

				ssoInfo[item['@name']] = item['$'];
			});

			JSPath.apply('..rowset{.@type==="role"}.row', data).forEach((row) => {

				let name = '';
				const role = {};

				row.field.forEach((field) => {

					role[field['@name']] = field['$'];

					if(field['@name'] === 'name')
					{
						name = field['$'];
					}
				});

				roleInfo[name] = role;
			});

			result.resolveWith(context, [data, message, userInfo, roleInfo, udpInfo, ssoInfo]);

		}, (data, message) => {

			result.rejectWith(context, [data, message, {AMIUser: 'guest', guestUser: 'guest'}, {}, {}, {}]);
		});

		/*-----------------------------------------------------------------*/

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Logs out
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	logout: function(settings)
	{
		const result = $.Deferred();

		const [context] = amiWebApp.setup(
			['context'],
			[result],
			settings
		);

		/*-----------------------------------------------------------------*/

		this.execute('GetSessionInfo -AMIUser="" -AMIPass=""', {extraParam: 'NoCert'}).then((data, message) => {

			const userInfo = {};
			const roleInfo = {};
			const udpInfo = {};
			const ssoInfo = {}

			JSPath.apply('..rowset{.@type==="user"}.row.field', data).forEach((item) => {

				userInfo[item['@name']] = item['$'];
			});

			JSPath.apply('..rowset{.@type==="udp"}.row.field', data).forEach((item) => {

				udpInfo[item['@name']] = item['$'];
			});

			JSPath.apply('..rowset{.@type==="sso"}.row.field', data).forEach((item) => {

				ssoInfo[item['@name']] = item['$'];
			});

			JSPath.apply('..rowset{.@type==="role"}.row', data).forEach((row) => {

				let name = '';
				const role = {};

				row.field.forEach((field) => {

					role[field['@name']] = field['$'];

					if(field['@name'] === 'name')
					{
						name = field['$'];
					}
				});

				roleInfo[name] = role;
			});

			result.resolveWith(context, [data, message, userInfo, roleInfo, udpInfo, ssoInfo]);

		}, (data, message) => {

			result.rejectWith(context, [data, message, {AMIUser: 'guest', guestUser: 'guest'}, {}, {}, {}]);
		});

		/*-----------------------------------------------------------------*/

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Attaches a certificate
	  * @param {String} user the user
	  * @param {String} pass the password
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	attachCert: function(user, pass, settings)
	{
		return this.execute('GetSessionInfo -attachCert -amiLogin="' + amiWebApp.textToString(user) + '" -amiPassword="' + amiWebApp.textToString(pass) + '"', settings);
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Detaches a certificate
	  * @param {String} user the user
	  * @param {String} pass the password
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	detachCert: function(user, pass, settings)
	{
		return this.execute('GetSessionInfo -detachCert -amiLogin="' + amiWebApp.textToString(user) + '" -amiPassword="' + amiWebApp.textToString(pass) + '"', settings);
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Adds a new user
	  * @param {String} user the user
	  * @param {String} pass the password
	  * @param {String} firstName the first name
	  * @param {String} lastName the last name
	  * @param {String} email the email
	  * @param {Boolean} attach attach the current certificate
	  * @param {Boolean} agree agree with the terms and conditions
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	addUser: function(user, pass, firstName, lastName, email, attach, agree, settings)
	{
		return this.execute('AddUser -amiLogin="' + amiWebApp.textToString(user) + '" -amiPassword="' + amiWebApp.textToString(pass) + '" -firstName="' + amiWebApp.textToString(firstName) + '" -lastName="' + amiWebApp.textToString(lastName) + '" -email="' + amiWebApp.textToString(email) + '"' + (attach ? ' -attach' : '') + (agree ? ' -agree' : ''), settings);
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Changes the account information
	  * @param {String} firstName the first name
	  * @param {String} lastName the last name
	  * @param {String} email the email
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	changeInfo: function(firstName, lastName, email, settings)
	{
		return this.execute('SetUserInfo -firstName="' + amiWebApp.textToString(firstName) + '" -lastName="' + amiWebApp.textToString(lastName) + '" -email="' + amiWebApp.textToString(email) + '"', settings);
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Changes the account password
	  * @param {String} user the user
	  * @param {String} oldPass the old password
	  * @param {String} newPass the new password
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	changePass: function(user, oldPass, newPass, settings)
	{
		return this.execute('ChangePassword -amiLogin="' + amiWebApp.textToString(user) + '" -amiPasswordOld="' + amiWebApp.textToString(oldPass) + '" -amiPasswordNew="' + amiWebApp.textToString(newPass) + '"', settings);
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Resets the account password
	  * @param {String} user the user
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	resetPass: function(user, settings)
	{
		return this.execute('ResetPassword -amiLogin="' + amiWebApp.textToString(user) + '"', settings);
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------*/
/* amiLogin                                                                */
/*-------------------------------------------------------------------------*/

/**
 * The AMI authentication subsystem
 * @namespace amiLogin
 */

$AMINamespace('amiLogin', /** @lends amiLogin */ {
	/*---------------------------------------------------------------------*/
	/* PUBLIC MEMBERS                                                      */
	/*---------------------------------------------------------------------*/

	user: 'guest',
	guest: 'guest',

	clientDN: '',
	issuerDN: '',

	notBefore: '',
	notAfter: '',

	/*---------------------------------------------------------------------*/

	roleInfo: {},
	udpInfo: {},
	ssoInfo: {},

	/*---------------------------------------------------------------------*/
	/* PRIVATE METHODS                                                     */
	/*---------------------------------------------------------------------*/

	_start: function()
	{
		const result = $.Deferred();

		/*-----------------------------------------------------------------*/

		amiWebApp.loadTWIGs([
			amiWebApp.originURL + '/twig/AMI/Fragment/login_button.twig',
			amiWebApp.originURL + '/twig/AMI/Fragment/logout_button.twig',
			amiWebApp.originURL + '/twig/AMI/Modal/login.twig',
		]).done((data) => {

			/*-------------------------------------------------------------*/

			this.fragmentLoginButton = data[0];
			this.fragmentLogoutButton = data[1];

			/*-------------------------------------------------------------*/

			amiWebApp.appendHTML('body', data[2]).done(() => {

				/*---------------------------------------------------------*/

				$('#B7894CC1_1DAA_4A7E_B7D1_DBDF6F06AC73').submit((e) => {

					this.form_login(e);
				});

				$('#EE055CD4_E58F_4834_8020_986AE3F8D67D').submit((e) => {

					this.form_addUser(e);
				});

				$('#DA2047A2_9E5D_420D_B6E7_FA261D2EF10F').submit((e) => {

					this.form_remindPass(e);
				});

				$('#D9EAF998_ED8E_44D2_A0BE_8C5CF5E438BD').submit((e) => {

					this.form_changeInfo(e);
				});

				$('#E92A1097_983B_4857_875F_07E4659B41B0').submit((e) => {

					this.form_changePass(e);
				});

				/*---------------------------------------------------------*/

				$('#E6E30EEC_15EE_4FCF_9809_2B8EC2FEF388,#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').change(() => {

					const pass1 = $('#E6E30EEC_15EE_4FCF_9809_2B8EC2FEF388').val();
					const pass2 = $('#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').val();

					$('#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').get(0).setCustomValidity(
						pass1.length > 0 && pass2.length > 0 && pass1 !== pass2 ? 'Passwords don\'t match.' : ''
					);
				});

				$('#D487FE72_8D95_4048_BEA3_252274862AF4,#EE1DA58C_3761_4734_A9C2_E808CDD7EE77').change(() => {

					const pass1 = $('#D487FE72_8D95_4048_BEA3_252274862AF4').val();
					const pass2 = $('#EE1DA58C_3761_4734_A9C2_E808CDD7EE77').val();

					$('#EE1DA58C_3761_4734_A9C2_E808CDD7EE77').get(0).setCustomValidity(
						pass1.length > 0 && pass2.length > 0 && pass1 !== pass2 ? 'Passwords don\'t match.' : ''
					);
				});

				/*---------------------------------------------------------*/
			});

			/*-------------------------------------------------------------*/

			window.addEventListener('message', (e) => {

				if(this.ssoInfo.url.startsWith(e.origin))
				{
					const user = e.data.user;
					const pass = e.data.pass;

					if(user && pass)
					{
						this.form_login2(user, pass);
					}

					e.source.close();
				}

			}, false);

			/*-------------------------------------------------------------*/

			const userdata = amiWebApp.args['userdata'] || '';

			/*-------------------------------------------------------------*/

			amiCommand.certLogin().fail((data, message, userInfo, roleInfo, udpInfo, ssoInfo) => {

				this._update(userInfo, roleInfo, udpInfo, ssoInfo).always((/*---*/) => {

					result.reject(message);
				});

			}).done((data, message, userInfo, roleInfo, udpInfo, ssoInfo) => {

				_ami_internal_then(amiWebApp.onReady(userdata), () => {

					amiWebApp._isReady = true;

					this._update(userInfo, roleInfo, udpInfo, ssoInfo).then((message) => {

						result.resolve(message);

					}, (message) => {

						result.reject(message);
					});

				}, (message) => {

					amiWebApp._isReady = true;

					result.reject(message);
				});
			});

			/*-------------------------------------------------------------*/

		}).fail((message) => {

			result.reject(message);
		});

		/*-----------------------------------------------------------------*/

		return result.promise();
	},

	/*---------------------------------------------------------------------*/

	_success: function(message)
	{
		amiWebApp.success(message, true);
		this._clean();
	},

	_error: function(message)
	{
		amiWebApp.error(message, true);
		this._clean();
	},

	_unlock: function()
	{
		amiWebApp.unlock();
		this._clean();
	},

	/*---------------------------------------------------------------------*/

	_clean: function()
	{
		$('#B7894CC1_1DAA_4A7E_B7D1_DBDF6F06AC73').trigger('reset');
		$('#EE055CD4_E58F_4834_8020_986AE3F8D67D').trigger('reset');
		$('#DA2047A2_9E5D_420D_B6E7_FA261D2EF10F').trigger('reset');
		$('#E92A1097_983B_4857_875F_07E4659B41B0').trigger('reset');
	},

	/*---------------------------------------------------------------------*/

	_update: function(userInfo, roleInfo, udpInfo, ssoInfo)
	{
		const result = $.Deferred();

		/*-----------------------------------------------------------------*/

		/*-----------------------------------------------------------------*/

		const user = this.user = userInfo.AMIUser || '';
		const guest = this.guest = userInfo.guestUser || '';

		const notBefore = this.notBefore = userInfo.notBefore || '';
		const notAfter = this.notAfter = userInfo.notAfter || '';

		const clientDNInSession = this.clientDN = userInfo.clientDNInSession || '';
		const issuerDNInSession = this.issuerDN = userInfo.issuerDNInSession || '';

		/*-----------------------------------------------------------------*/

		$('#A09AE316_7068_4BC1_96A9_6B87D28863FE').prop('disabled', !clientDNInSession || !issuerDNInSession);

		$('#C3E94F6D_48E0_86C0_3534_691728E492F4').attr('src', udpInfo.termsAndConditions || amiWebApp.originURL + '/docs/terms_and_conditions.html');
		$('#E50FF8BD_B0F5_CD72_F9DC_FC2BFA5DBA27').attr('src', udpInfo.termsAndConditions || amiWebApp.originURL + '/docs/terms_and_conditions.html');

		/*-----------------------------------------------------------------*/

		this.roleInfo = roleInfo;
		this.udpInfo = udpInfo;
		this.ssoInfo = ssoInfo;

		/*-----------------------------------------------------------------*/

		const dict = {
			sso_label: ssoInfo.label || 'SSO',
			sso_url: ssoInfo.url || '@NULL',
		};

		if(user !== guest)
		{
			/*-------------------------------------------------------------*/
			/* GET INFO                                                    */
			/*-------------------------------------------------------------*/

			const valid = userInfo.valid || 'false';
			const certEnabled = userInfo.certEnabled || 'false';
			const vomsEnabled = userInfo.vomsEnabled || 'false';

			/*-------------------------------------------------------------*/

			const firstName = userInfo.firstName || '';
			const lastName = userInfo.lastName || '';
			const email = userInfo.email || '';

			/*-------------------------------------------------------------*/

			const clientDNInAMI = userInfo.clientDNInAMI || '';
			const issuerDNInAMI = userInfo.issuerDNInAMI || '';

			/*-------------------------------------------------------------*/
			/* SET INFO                                                    */
			/*-------------------------------------------------------------*/

			$('#E513F27D_5521_4B08_BF61_52AFB81356F7').val(firstName);
			$('#AFF0B5C0_BEEC_4842_916D_DCBA7F589195').val(lastName);
			$('#C587486B_62C0_4B6E_9288_D8F9F89D157B').val(email);

			/*-------------------------------------------------------------*/

			$('#ABEB0291_40B0_414A_A42B_E7EABB9B487E').val(firstName);
			$('#A5AFDB62_1034_4F66_A3E6_9341B31FA290').val(lastName);
			$('#D730A774_05EA_47AB_A0C8_D92753802E3E').val(email);

			/*-------------------------------------------------------------*/

			$('#D1BEE3BF_9161_41DC_BC53_C44FFE4D2522').val(clientDNInAMI);
			$('#C76805D7_1E86_4231_9071_1D04783423BB').val(clientDNInSession);
			$('#F42FAF6B_2C8D_4142_8BD9_E5BCDCAA05AA').val(issuerDNInAMI);
			$('#FE2F6232_C256_4B80_939C_EBEC90320308').val(issuerDNInSession);

			/*-------------------------------------------------------------*/

			$('#C587486B_62C0_4B6E_9288_D8F9F89D157B').prop('disabled', vomsEnabled !== 'false');

			/*-------------------------------------------------------------*/

			let table = [];

			for(let role in roleInfo)
			{
				table.push('<tr>');
				table.push('<td>' + amiWebApp.textToHtml(roleInfo[role].name || 'N/A') + '</td>');
				table.push('<td>' + amiWebApp.textToHtml(roleInfo[role].description || 'N/A') + '</td>');
				table.push('</tr>');
			}

			$('#BB07676B_EACA_9B42_ED51_477DB2976041').html(table.join(''));

			/*-------------------------------------------------------------*/
			/* CHECK USER STATUS                                           */
			/*-------------------------------------------------------------*/

			let icon = '';
			let message = '';

			if(valid !== 'false')
			{
				/*---------------------------------------------------------*/
				/* VALID USER                                              */
				/*---------------------------------------------------------*/

				if(certEnabled !== 'false' && clientDNInAMI && issuerDNInAMI)
				{
					if(!clientDNInSession
					   ||
					   !issuerDNInSession
					 ) {
						message = 'You should provide a certificate to use this AMI web application.';
					}
					else
					{
						if(clientDNInAMI !== clientDNInSession
						   ||
						   issuerDNInAMI !== issuerDNInSession
						 ) {
							message = 'The certificate in your session is not the one registered in AMI.';
						}
					}
				}

				/*---------------------------------------------------------*/

				if(message)
				{
					$('#D944B01D_2E8D_4EE9_9DCC_2691438BBA16').html('<span class="fa fa-info-circle text-warning"></span> ' + message);

					icon = '<a class="nav-link text-warning" href="javascript:amiLogin.accountStatus();">'
					       +
					       '<i class="fa fa-info-circle"></i>'
					       +
					       '</a>'
					;
				}

				/*---------------------------------------------------------*/

				$('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').parent().css('background', '#B8D49B url("' + amiWebApp.originURL + '/images/certificate-green.png") no-repeat center center')
				                                                   .css('background-size', 'cover')
				;

				$('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').css('color', '#006400')
				                                          .text('❧ valid ❧')
				;

				$('#E91280F6_E7C6_3E53_A457_646995C99317').text(notBefore + ' - ' + notAfter);

				/*---------------------------------------------------------*/
			}
			else
			{
				/*---------------------------------------------------------*/
				/* INVALID USER                                            */
				/*---------------------------------------------------------*/

				if(vomsEnabled !== 'false')
				{
					if(!clientDNInAMI
					   ||
					   !issuerDNInAMI
					 ) {
						message = 'Register a valid certificate.';
					}
					else
					{
						message = 'Check your VO roles.';
					}
				}
				else
				{
					message = 'Contact the AMI team.';
				}

				/*---------------------------------------------------------*/

				if(message)
				{
					$('#D944B01D_2E8D_4EE9_9DCC_2691438BBA16').html('<span class="fa fa-info-circle text-danger"></span> ' + message);

					icon = '<a class="nav-link text-danger" href="javascript:amiLogin.accountStatus();">'
					       +
					       '<i class="fa fa-info-circle"></i>'
					       +
					       '</a>'
					;
				}

				/*---------------------------------------------------------*/

				$('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').parent().css('background', '#E8C8CF url("' + amiWebApp.originURL + '/images/certificate-pink.png") no-repeat center center')
				                                                   .css('background-size', 'cover')
				;

				$('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').css('color', '#8B0000')
				                                          .text('❧ invalid ❧')
				;

				$('#E91280F6_E7C6_3E53_A457_646995C99317').text(notBefore + ' - ' + notAfter);

				/*---------------------------------------------------------*/
			}

			/*-------------------------------------------------------------*/
			/* UPDATE MENU BAR                                             */
			/*-------------------------------------------------------------*/

			dict['user'] = user;
			dict['icon'] = icon;

			/*-------------------------------------------------------------*/

			amiWebApp.replaceHTML('#ami_login_menu_content', this.fragmentLogoutButton, {dict: dict}).done(() => {

				amiWebApp.triggerLogin().then(() => {

					result.resolve();

				}, (message) => {

					result.reject(message);
				});
			});

			/*-------------------------------------------------------------*/
		}
		else
		{
			/*-------------------------------------------------------------*/

			amiWebApp.replaceHTML('#ami_login_menu_content', this.fragmentLoginButton, {dict: dict}).done(() => {

				amiWebApp.triggerLogout().then(() => {

					result.resolve();

				}, (message) => {

					result.reject(message);
				});
			});

			/*-------------------------------------------------------------*/
		}

		/*-----------------------------------------------------------------*/

		return result.promise();
	},

	/*---------------------------------------------------------------------*/
	/* PUBLIC METHODS                                                      */
	/*---------------------------------------------------------------------*/

	/**
	  * Gets the current user
	  * @returns {String} The current user
	  */

	getUser: function()
	{
		return this.user;
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Gets the guest user
	  * @returns {String} The guest user
	  */

	getGuest: function()
	{
		return this.guest;
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Gets the client DN
	  * @returns {String} The client DN
	  */

	getClientDN: function()
	{
		return this.clientDN;
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Gets the issuer DN
	  * @returns {String} The issuer DN
	  */

	getIssuerDN: function()
	{
		return this.issuerDN;
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Checks whether the user is authenticated
	  * @returns {Boolean}
	  */

	isAuthenticated: function()
	{
		return this.user !== this.guest;
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Checks whether the user has the given role
	  * @param {String} role the role
	  * @returns {Boolean}
	  */

	hasRole: function(roleName)
	{
		return roleName in this.roleInfo;
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Opens the 'SSO' modal window
	  */

	sso: function()
	{
		this._clean();

		window.open(this.ssoInfo.url, 'Single Sign-On', 'menubar=no, status=no, scrollbars=no, width=800, height=450');
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Opens the 'SignIn' modal window
	  */

	signIn: function()
	{
		this._clean();

		$('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('show');
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Opens the 'Change Info' modal window
	  */

	changeInfo: function()
	{
		this._clean();

		$('#D9EAF998_ED8E_44D2_A0BE_8C5CF5E438BD').modal('show');
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Opens the 'Change Password' modal window
	  */

	changePass: function()
	{
		this._clean();

		$('#E92A1097_983B_4857_875F_07E4659B41B0').modal('show');
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Opens the 'Account Status' modal window
	  */

	accountStatus: function()
	{
		this._clean();

		$('#AB1CB183_96EB_4116_8A9E_4409BE058F34').modal('show');
	},

	/*---------------------------------------------------------------------*/

	/**
	  * Signs out
	  */

	signOut: function()
	{
		amiWebApp.lock();

		return amiCommand.logout().always((data, message, userInfo, roleInfo, udpInfo, ssoInfo) => {

			this._update(userInfo, roleInfo, udpInfo, ssoInfo).then(() => {

				this._unlock();

			}, (message) => {

				this._error(message);
			});
		});
	},

	/*---------------------------------------------------------------------*/

	form_login: function(e)
	{
		e.preventDefault();

		const values = $(e.target).serializeObject();

		return this.form_login2(values['user'], values['pass']);
	},

	/*---------------------------------------------------------------------*/

	form_login2: function(user, pass)
	{
		/*-----------------------------------------------------------------*/

		const promise = (user && pass) ? amiCommand.passLogin(user.trim(), pass.trim())
		                               : amiCommand.certLogin(/*--------------------*/)
		;

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		promise.then((data, message, userInfo, roleInfo, udpInfo, ssoInfo) => {

			this._update(userInfo, roleInfo, udpInfo, ssoInfo).then(() => {

				if(userInfo.AMIUser !== userInfo.guestUser)
				{
					$('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('hide');

					this._unlock();
				}

			}, (message) => {

				if(userInfo.AMIUser !== userInfo.guestUser)
				{
					$('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('hide');

					this._error(message);
				}
			});

			if(userInfo.AMIUser === userInfo.guestUser)
			{
				let message = 'Authentication failed.';

				if(userInfo.clientDNInSession || userInfo.issuerDNInSession)
				{
					message += ' Client DN in session: ' + amiWebApp.textToHtml(userInfo.clientDNInSession) + '.'
					           +
					           ' Issuer DN in session: ' + amiWebApp.textToHtml(userInfo.issuerDNInSession) + '.'
					;
				}

				this._error(message);
			}

		}, (data, message, userInfo, roleInfo, udpInfo, ssoInfo) => {

			this._update(userInfo, roleInfo, udpInfo, ssoInfo).always(() => {

				this._error(message);
			});
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	form_attachCert: function()
	{
		/*-----------------------------------------------------------------*/

		const user = $('#E64F24B2_33E6_4DED_9B24_28BE04219613').val();
		const pass = $('#A4DFD039_034F_4D10_9668_385AEF4FBBB9').val();

		if(!user || !pass)
		{
			this._error('Please, fill all fields with a red star.');

			return;
		}

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.attachCert(user, pass).then((data, message) => {

			this._success(message);

		}, (data, message) => {

			this._error(message);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	form_detachCert: function()
	{
		/*-----------------------------------------------------------------*/

		const user = $('#E64F24B2_33E6_4DED_9B24_28BE04219613').val();
		const pass = $('#A4DFD039_034F_4D10_9668_385AEF4FBBB9').val();

		if(!user || !pass)
		{
			this._error('Please, fill all fields with a red star.');

			return;
		}

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.detachCert(user, pass).then((data, message) => {

			this._success(message);

		}, (data, message) => {

			this._error(message);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	form_addUser: function(e)
	{
		e.preventDefault();

		/*-----------------------------------------------------------------*/

		const values = $(e.target).serializeObject();

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.addUser(values['login'], values['pass'], values['first_name'], values['last_name'], values['email'], 'attach' in values, 'agree' in values).then((data, message) => {

			this._success(message);

		}, (data, message) => {

			this._error(message);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	form_remindPass: function(e)
	{
		e.preventDefault();

		/*-----------------------------------------------------------------*/

		const values = $(e.target).serializeObject();

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.resetPass(values['user']).then((data, message) => {

			this._success(message);

		}, (data, message) => {

			this._error(message);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	form_changeInfo: function(e)
	{
		e.preventDefault();

		/*-----------------------------------------------------------------*/

		const values = $(e.target).serializeObject();

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.changeInfo(values['first_name'], values['last_name'], values['email']).then((data, message) => {

			this._success(message);

		}, (data, message) => {

			this._error(message);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	form_changePass: function(e)
	{
		e.preventDefault();

		/*-----------------------------------------------------------------*/

		const values = $(e.target).serializeObject();

		/*-----------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.changePass(this.user, values['old_pass'], values['new_pass']).then((data, message) => {

			this._success(message);

		}, (data, message) => {

			this._error(message);
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/

/*!
 * AMI Web Framework - AMIDoc.js
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/

/* eslint-disable */

var amiDoc = {"functions":[{"name":"$AMINamespace","desc":"Create a new namespace","params":[{"name":"$name","type":"String","desc":"the namespace name","default":"","optional":"","nullable":""},{"name":"$descr","type":"Object","desc":"the namespace body","default":"","optional":true,"nullable":""}]},{"name":"$AMIInterface","desc":"Create a new interface","params":[{"name":"$name","type":"String","desc":"the interface name","default":"","optional":"","nullable":""},{"name":"$descr","type":"Object","desc":"the interface body","default":"","optional":true,"nullable":""}]},{"name":"$AMIClass","desc":"Create a new class","params":[{"name":"$name","type":"String","desc":"the class name","default":"","optional":"","nullable":""},{"name":"$descr","type":"Object","desc":"the class body","default":"","optional":true,"nullable":""}]}],"namespaces":[{"name":"amiRouter","desc":"The AMI url routing subsystem","functions":[{"name":"getScriptURL","desc":"Gets the AWF's script URL","params":[],"returns":[{"type":"String","desc":"The AWF's script URL"}]},{"name":"getOriginURL","desc":"Gets the origin URL","params":[],"returns":[{"type":"String","desc":"The origin URL"}]},{"name":"getWebAppURL","desc":"Gets the webapp URL","params":[],"returns":[{"type":"String","desc":"The webapp URL"}]},{"name":"getHash","desc":"Gets the anchor part of the webapp URL","params":[],"returns":[{"type":"String","desc":"The anchor part of the webapp URL"}]},{"name":"getArgs","desc":"Gets the arguments extracted from the webapp URL","params":[],"returns":[{"type":"Array.<String>","desc":"The arguments extracted from the webapp URL"}]},{"name":"append","desc":"Appends a routing rule","params":[{"name":"regExp","type":"String","desc":"the regExp","default":"","optional":"","nullable":""},{"name":"handler","type":"Object","desc":"the handler","default":"","optional":"","nullable":""}],"returns":[{"type":"Namespace","desc":"The amiRouter singleton"}]},{"name":"remove","desc":"Removes some routing rules","params":[{"name":"regExp","type":"String","desc":"the regExp","default":"","optional":"","nullable":""}],"returns":[{"type":"Namespace","desc":"The amiRouter singleton"}]},{"name":"check","desc":"Checks whether the URL matches with a routing rule","params":[],"returns":[{"type":"Boolean","desc":""}]},{"name":"appendHistoryEntry","desc":"Append a new history entry","params":[{"name":"path","type":"String","desc":"the new path","default":"","optional":"","nullable":""},{"name":"context","type":"Object","desc":"the new context","default":"","optional":true,"nullable":""}],"returns":[{"type":"Boolean","desc":""}]},{"name":"replaceHistoryEntry","desc":"Replace the current history entry","params":[{"name":"path","type":"String","desc":"the new path","default":"","optional":"","nullable":""},{"name":"context","type":"Object","desc":"the new context","default":"","optional":true,"nullable":""}],"returns":[{"type":"Boolean","desc":""}]}]},{"name":"amiWebApp","desc":"The AMI webapp subsystem","variables":[{"name":"originURL","type":"String","desc":"The origin URL"},{"name":"webAppURL","type":"String","desc":"The webapp URL"},{"name":"hash","type":"String","desc":"The anchor part of the webapp URL"},{"name":"args","type":"Array.<String>","desc":"The arguments extracted from the webapp URL"}],"functions":[{"name":"isEmbedded","desc":"Checks whether the WebApp is executed in embedded mode","params":[],"returns":[{"type":"Boolean","desc":""}]},{"name":"isLocal","desc":"Checks whether the WebApp is executed locally (file://, localhost, 127.0.0.1 or ::1)","params":[],"returns":[{"type":"Boolean","desc":""}]},{"name":"textToHtml","desc":"Escapes the given string from text to HTML","params":[{"name":"string","type":"String","desc":"the unescaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The escaped string"}]},{"name":"htmlToText","desc":"Unescapes the given string from HTML to text","params":[{"name":"string","type":"String","desc":"the escaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The unescaped string"}]},{"name":"textToString","desc":"Escapes the given string from text to JavaScript string","params":[{"name":"string","type":"String","desc":"the unescaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The escaped string"}]},{"name":"stringToText","desc":"Unescapes the given string from JavaScript string to text","params":[{"name":"string","type":"String","desc":"the escaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The unescaped string"}]},{"name":"htmlToString","desc":"Escapes the given string from HTML to JavaScript string","params":[{"name":"string","type":"String","desc":"the unescaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The escaped string"}]},{"name":"stringToHtml","desc":"Unescapes the given string from JavaScript string to HTML","params":[{"name":"string","type":"String","desc":"the escaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The unescaped string"}]},{"name":"textToSQL","desc":"Escapes the given string from text to SQL","params":[{"name":"string","type":"String","desc":"the unescaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The escaped string"}]},{"name":"sqlToText","desc":"Unescapes the given string from SQL to text","params":[{"name":"string","type":"String","desc":"the escaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The unescaped string"}]},{"name":"base64Encode","desc":"Encodes (RFC 4648) a string","params":[{"name":"string","type":"String","desc":"the decoded string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The encoded string"}]},{"name":"base64Decode","desc":"Decodes (RFC 4648) a string","params":[{"name":"string","type":"String","desc":"the encoded string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The decoded string"}]},{"name":"loadResources","desc":"Asynchronously loads resources by extension","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadSheets","desc":"Asynchronously loads CSS sheets","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadScripts","desc":"Asynchronously loads JS scripts","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadJSONs","desc":"Asynchronously loads JSON files","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadXMLs","desc":"Asynchronously loads XML files","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadHTMLs","desc":"Asynchronously loads HTML files","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadTWIGs","desc":"Asynchronously loads TWIG files","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadTexts","desc":"Asynchronously loads text files","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"replaceHTML","desc":"Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"prependHTML","desc":"Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"appendHTML","desc":"Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"formatTWIG","desc":"Interpretes the given TWIG string, see {@link http://twig.sensiolabs.org/documentation}","params":[{"name":"twig","type":"String","desc":"the TWIG string","default":"","optional":"","nullable":""},{"name":"dict","type":["Object","Array"],"desc":"the dictionary","default":"","optional":true,"nullable":""}],"returns":[{"type":"String","desc":"The Interpreted TWIG string"}]},{"name":"jspath","desc":"Finds data within the given JSON, see {@link https://github.com/dfilatov/jspath}","params":[{"name":"path","type":"String","desc":"the path","default":"","optional":"","nullable":""},{"name":"json","type":"Object","desc":"the JSON","default":"","optional":"","nullable":""}],"returns":[{"type":"Array","desc":"The resulting array"}]},{"name":"lock","desc":"Locks the Web application","params":[]},{"name":"unlock","desc":"Unlocks the Web application","params":[]},{"name":"canLeave","desc":"Enables the message in a confirmation dialog box to inform that the user is about to leave the current page.","params":[]},{"name":"cannotLeave","desc":"Disables the message in a confirmation dialog box to inform that the user is about to leave the current page.","params":[]},{"name":"info","desc":"Shows an 'info' message","params":[{"name":"message","type":["String","Array"],"desc":"the message","default":"","optional":"","nullable":""},{"name":"fadeOut","type":"Boolean","desc":"if True, the message disappears after 60s","default":"","optional":true,"nullable":""}]},{"name":"success","desc":"Shows a 'success' message","params":[{"name":"message","type":["String","Array"],"desc":"the message","default":"","optional":"","nullable":""},{"name":"fadeOut","type":"Boolean","desc":"if True, the message disappears after 60s","default":"","optional":true,"nullable":""}]},{"name":"warning","desc":"Shows a 'warning' message","params":[{"name":"message","type":["String","Array"],"desc":"the message","default":"","optional":"","nullable":""},{"name":"fadeOut","type":"Boolean","desc":"if True, the message disappears after 60s","default":"","optional":true,"nullable":""}]},{"name":"error","desc":"Shows an 'error' message","params":[{"name":"message","type":["String","Array"],"desc":"the message","default":"","optional":"","nullable":""},{"name":"fadeOut","type":"Boolean","desc":"if True, the message disappears after 60s","default":"","optional":true,"nullable":""}]},{"name":"flush","desc":"Flushes messages","params":[]},{"name":"fillBreadcrumb","desc":"Fill the main breadcrumb","params":[{"name":"items","type":"Array","desc":"the array of items (HTML format)","default":"","optional":"","nullable":""}]},{"name":"start","desc":"Starts the Web application","params":[{"name":"settings","type":"Object","desc":"dictionary of settings (logo_url, home_url, contact_email, about_url, theme_url, locker_url)","default":"","optional":true,"nullable":""}]},{"name":"loadControl","desc":"Asynchronously loads a control","params":[{"name":"control","type":"String","desc":"the array of control name","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"createControl","desc":"Asynchronously create a control","params":[{"name":"parent","type":"Object","desc":"???","default":"","optional":true,"nullable":""},{"name":"owner","type":"Object","desc":"???","default":"","optional":true,"nullable":""},{"name":"control","type":"String","desc":"???","default":"","optional":"","nullable":""},{"name":"params","type":"Array","desc":"???","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"createControlInBody","desc":"Asynchronously create a control in a container","params":[{"name":"parent","type":"Object","desc":"???","default":"","optional":true,"nullable":""},{"name":"owner","type":"Object","desc":"???","default":"","optional":true,"nullable":""},{"name":"control","type":"String","desc":"???","default":"","optional":"","nullable":""},{"name":"paramsWithoutSettings","type":"Array","desc":"???","default":"","optional":"","nullable":""},{"name":"controlSettings","type":"Object","desc":"???","default":"","optional":"","nullable":""},{"name":"parentSettings","type":"Object","desc":"???","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"createControlInContainer","desc":"Asynchronously create a control in a container","params":[{"name":"parent","type":"Object","desc":"???","default":"","optional":true,"nullable":""},{"name":"owner","type":"Object","desc":"???","default":"","optional":true,"nullable":""},{"name":"control","type":"String","desc":"???","default":"","optional":"","nullable":""},{"name":"paramsWithoutSettings","type":"Array","desc":"???","default":"","optional":"","nullable":""},{"name":"controlSettings","type":"Object","desc":"???","default":"","optional":"","nullable":""},{"name":"parentSettings","type":"Object","desc":"???","default":"","optional":"","nullable":""},{"name":"icon","type":"String","desc":"???","default":"","optional":"","nullable":""},{"name":"title","type":"String","desc":"???","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"createControlFromWebLink","desc":"Asynchronously create a control in a container from a WEB link","params":[{"name":"parent","type":"Object","desc":"???","default":"","optional":true,"nullable":""},{"name":"owner","type":"Object","desc":"???","default":"","optional":true,"nullable":""},{"name":"el","type":"String","desc":"???","default":"","optional":"","nullable":""},{"name":"parentSettings","type":"Object","desc":"???","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadSubApp","desc":"Asynchronously loads a subapp","params":[{"name":"subapp","type":"String","desc":"the subapp","default":"","optional":"","nullable":""},{"name":"userdata","type":"?","desc":"the user data","default":"","optional":true,"nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadSubAppByURL","desc":"Loads a subapp by URL","params":[{"name":"defaultSubApp","type":"String","desc":"if 'amiWebApp.args[\"subapp\"]' is null, the default subapp","default":"","optional":"","nullable":""},{"name":"defaultUserData","type":"?","desc":"if 'amiWebApp.args[\"userdata\"]' is null, the default user data","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]}],"events":[{"name":"onReady","desc":"This method must be overloaded and is called when the Web application starts","params":[{"name":"userData","type":"String","desc":"","default":"","optional":"","nullable":""}]},{"name":"onRefresh","desc":"This method must be overloaded and is called when the toolbar needs to be updated","params":[{"name":"isAuth","type":"Boolean","desc":"","default":"","optional":"","nullable":""}]}]},{"name":"amiCommand","desc":"The AMI command subsystem","variables":[{"name":"endpoint","type":"String","desc":"Default endpoint"},{"name":"converter","type":"String","desc":"Default converter"}],"functions":[{"name":"execute","desc":"Executes an AMI command","params":[{"name":"command","type":"String","desc":"the command","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, endpoint, converter, timeout, extraParam, extraValue)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"passLogin","desc":"Logs in by login/password","params":[{"name":"user","type":"String","desc":"the user","default":"","optional":"","nullable":""},{"name":"pass","type":"String","desc":"the password","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"certLogin","desc":"Logs in by certificate","params":[{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"logout","desc":"Logs out","params":[{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"attachCert","desc":"Attaches a certificate","params":[{"name":"user","type":"String","desc":"the user","default":"","optional":"","nullable":""},{"name":"pass","type":"String","desc":"the password","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"detachCert","desc":"Detaches a certificate","params":[{"name":"user","type":"String","desc":"the user","default":"","optional":"","nullable":""},{"name":"pass","type":"String","desc":"the password","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"addUser","desc":"Adds a new user","params":[{"name":"user","type":"String","desc":"the user","default":"","optional":"","nullable":""},{"name":"pass","type":"String","desc":"the password","default":"","optional":"","nullable":""},{"name":"firstName","type":"String","desc":"the first name","default":"","optional":"","nullable":""},{"name":"lastName","type":"String","desc":"the last name","default":"","optional":"","nullable":""},{"name":"email","type":"String","desc":"the email","default":"","optional":"","nullable":""},{"name":"attach","type":"Boolean","desc":"attach the current certificate","default":"","optional":"","nullable":""},{"name":"agree","type":"Boolean","desc":"agree with the terms and conditions","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"changeInfo","desc":"Changes the account information","params":[{"name":"firstName","type":"String","desc":"the first name","default":"","optional":"","nullable":""},{"name":"lastName","type":"String","desc":"the last name","default":"","optional":"","nullable":""},{"name":"email","type":"String","desc":"the email","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"changePass","desc":"Changes the account password","params":[{"name":"user","type":"String","desc":"the user","default":"","optional":"","nullable":""},{"name":"oldPass","type":"String","desc":"the old password","default":"","optional":"","nullable":""},{"name":"newPass","type":"String","desc":"the new password","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"resetPass","desc":"Resets the account password","params":[{"name":"user","type":"String","desc":"the user","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]}]},{"name":"amiLogin","desc":"The AMI authentication subsystem","functions":[{"name":"getUser","desc":"Gets the current user","params":[],"returns":[{"type":"String","desc":"The current user"}]},{"name":"getGuest","desc":"Gets the guest user","params":[],"returns":[{"type":"String","desc":"The guest user"}]},{"name":"getClientDN","desc":"Gets the client DN","params":[],"returns":[{"type":"String","desc":"The client DN"}]},{"name":"getIssuerDN","desc":"Gets the issuer DN","params":[],"returns":[{"type":"String","desc":"The issuer DN"}]},{"name":"isAuthenticated","desc":"Checks whether the user is authenticated","params":[],"returns":[{"type":"Boolean","desc":""}]},{"name":"hasRole","desc":"Checks whether the user has the given role","params":[{"name":"role","type":"String","desc":"the role","default":"","optional":"","nullable":""}],"returns":[{"type":"Boolean","desc":""}]},{"name":"sso","desc":"Opens the 'SSO' modal window","params":[]},{"name":"signIn","desc":"Opens the 'SignIn' modal window","params":[]},{"name":"changeInfo","desc":"Opens the 'Change Info' modal window","params":[]},{"name":"changePass","desc":"Opens the 'Change Password' modal window","params":[]},{"name":"accountStatus","desc":"Opens the 'Account Status' modal window","params":[]},{"name":"signOut","desc":"Signs out","params":[]}]}],"interfaces":[{"name":"ami.IControl","desc":"The AMI control interface","implements":[],"inherits":[],"functions":[{"name":"patchId","desc":"Patches an HTML identifier","params":[{"name":"id","type":"String","desc":"the unpatched HTML identifier","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The patched HTML identifier"}]},{"name":"replaceHTML","desc":"Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"prependHTML","desc":"Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"appendHTML","desc":"Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"onReady","desc":"Called when the control is ready to run","params":[]}]},{"name":"ami.ISubApp","desc":"The AMI sub-application interface","implements":[],"inherits":[],"functions":[{"name":"onReady","desc":"Called when the sub-application is ready to run","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]},{"name":"onExit","desc":"Called when the sub-application is about to exit","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]},{"name":"onLogin","desc":"Called when logging in","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]},{"name":"onLogout","desc":"Called when logging out","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]}]}],"classes":[{"name":"ami.Control","desc":"The basic AMI control","implements":["ami.IControl"],"inherits":[],"konstructor":{"name":"Control","params":[]},"functions":[{"name":"patchId","desc":"Patches an HTML identifier","params":[{"name":"id","type":"String","desc":"the unpatched HTML identifier","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The patched HTML identifier"}]},{"name":"replaceHTML","desc":"Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"prependHTML","desc":"Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"appendHTML","desc":"Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"onReady","desc":"Called when the control is ready to run","params":[]}]},{"name":"ami.SubApp","desc":"The basic AMI sub-application","implements":["ami.ISubApp"],"inherits":[],"konstructor":{"name":"SubApp","params":[]},"functions":[{"name":"onReady","desc":"Called when the sub-application is ready to run","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]},{"name":"onExit","desc":"Called when the sub-application is about to exit","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]},{"name":"onLogin","desc":"Called when logging in","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]},{"name":"onLogout","desc":"Called when logging out","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]}]}]};

/* eslint-enable */

/*-------------------------------------------------------------------------*/
//# sourceMappingURL=ami.es6.js.map