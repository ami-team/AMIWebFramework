'use strict';

/*!
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig                                                                 */
/*-------------------------------------------------------------------------*/

var amiTwig = {};

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
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.tokenizer                                                       */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG tokenizer
 * @namespace ami/twig/tokenizer
 */

amiTwig.tokenizer = {
	/*-----------------------------------------------------------------*/

	/**
	  * Tokenize a string
	  * @param {String} code the code
	  * @param {Number} line the line
	  * @param {Array<String>} spaces the array of spaces
	  * @param {Array<String>|Array<RegExp>} tokenDefs the array of token defs
	  * @param {Array<Number>}               tokenTypes the array of token types
	  * @param {Boolean} [error=false] throw an exception on invalid tokens
	  * @throws {String} The error description
	  * @return {Object} The resulting object
	  * @example
	  * var PLUS = 0;
	  * var EQUAL = 1;
	  * var NUMBER = 2;
	  *
	  * var result = amiTwig.tokenizer.tokenize(
	  * 	'1+2=3',
	  *	1,
	  *	[' ', '\t'],
	  *	['+', '-', '=', /[0-9]+/],
	  *	[PLUS, MINUS, EQUAL, NUMBER],
	  *	true
	  * );
	  *
	  * console.debug(result.tokens); // ['1', '+', '2', '=', '3']
	  * console.debug(result.types); // [ 2 ,  0 ,  2 ,  1 ,  2 ]
	  * console.debug(result.lines); // [ 1 ,  1 ,  1 ,  1 ,  1 ]
	  */

	tokenize: function(code, line, spaces, tokenDefs, tokenTypes, error)
	{
		if(tokenDefs.length !== tokenTypes.length)
		{
			throw '`tokenDefs.length != tokenTypes.length`';
		}

		var result_tokens = [];
		var result_types = [];
		var result_lines = [];

		var i = 0x000000000;
		var l = code.length;

		var word = '', c;

		var token;
		var idx;
__l0:
		while(i < l)
		{
			c = code.charAt(0);

			/*-------------------------------------------------*/
			/* COUNT LINES                                     */
			/*-------------------------------------------------*/

			if(c === '\n')
			{
				line++;
			}

			/*-------------------------------------------------*/
			/* EAT SPACES                                      */
			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/
			/* EAT REGEXES                                     */
			/*-------------------------------------------------*/

			for(idx in tokenDefs)
			{
				token = this._match(code, tokenDefs[idx]);

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
					result_types.push(tokenTypes[idx]);
					result_lines.push(line);

					code = code.substring(token.length);
					i += token.length;

					continue __l0;
				}
			}

			/*-------------------------------------------------*/
			/* EAT REMAINING CHARACTERES                       */
			/*-------------------------------------------------*/

			word += c;

			code = code.substring(1);
			i += 1;

			/*-------------------------------------------------*/
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
			word = '';
		}

		return {
			tokens: result_tokens,
			types: result_types,
			lines: result_lines,
		};
	},

	/*-----------------------------------------------------------------*/

	_match: function(s, stringOrRegExp)
	{
		var m;

		if(stringOrRegExp instanceof RegExp)
		{
			m = s.match(stringOrRegExp);

			return m !== null && this._checkNextChar(s, (((((m[0])))))) ? (((((m[0]))))) : null;
		}
		else
		{
			m = s.indexOf(stringOrRegExp);

			return m === 0x00 && this._checkNextChar(s, stringOrRegExp) ? stringOrRegExp : null;
		}
	},

	/*-----------------------------------------------------------------*/

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
		var length = token.length;

		var charCode2 = s.charCodeAt(length - 0);
		var charCode1 = s.charCodeAt(length - 1);

		return isNaN(charCode2)
		       ||
		       this._alnum[charCode2] === 0
		       ||
		       this._alnum[charCode1] === 0
		;
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
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
	/*-----------------------------------------------------------------*/

	$init: function()
	{
		/*---------------------------------------------------------*/
		/* COMPOSITE TOKENS                                        */
		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
	/* REAL TOKENS                                                     */
	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/
	/* VIRTUAL TOKENS                                                  */
	/*-----------------------------------------------------------------*/

	LST: 200,
	DIC: 201,
	FUN: 202,
	VAR: 203,

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

amiTwig.expr.tokens.$init();

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.Tokenizer                                                  */
/*-------------------------------------------------------------------------*/

amiTwig.expr.Tokenizer = function(code, line) {
	/*-----------------------------------------------------------------*/

	this._spaces = [' ', '\t', '\n', '\r'];

	/*-----------------------------------------------------------------*/

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
		/^'(\\'|[^\'])*'/,
		/^"(\\"|[^\"])*"/,
		/^[a-zA-Z_$][a-zA-Z0-9_$]*/,
	];

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

	this.$init = function(code, line)
	{
		/*---------------------------------------------------------*/

		var result = amiTwig.tokenizer.tokenize(
			code,
			line,
			this._spaces,
			this._tokenDefs,
			this._tokenTypes,
			true
		);

		/*---------------------------------------------------------*/

		this.tokens = result.tokens;
		this.types = result.types;

		this.i = 0;

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.next = function(n)
	{
		this.i += n || 1;
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

	this.$init(code, line);

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.Compiler                                                   */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG expression compiler
 * @see An online <a href="http://cern.ch/ami/twig/" target="_blank">demo</a>.
 * @class ami/twig/expr/Compiler
 * @param {String} code the code
 * @param {Number} line the line
 * @throws {String} The error description
 */

amiTwig.expr.Compiler = function(code, line) {
	/*-----------------------------------------------------------------*/

	this.$init = function(code, line)
	{
		/*---------------------------------------------------------*/

		this.tokenizer = new amiTwig.expr.Tokenizer(
			this.code = code,
			this.line = line
		);

		/*---------------------------------------------------------*/

		this.rootNode = this.parseFilter();

		/*---------------------------------------------------------*/

		if(!this.tokenizer.isEmpty())
		{
			throw 'syntax error, line `' + this.line + '`, unexpected token `' + this.tokenizer.peekToken() + '`';
		}

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	/**
	  * Dump the abstract abstract syntax tree to a dot diagram
	  * @returns {String} The dot diagram
	  */

	this.dump = function()
	{
		return this.rootNode.dump();
	};

	/*-----------------------------------------------------------------*/

	this.parseFilter = function()
	{
		var left = this.parseLogicalOr(), node, temp;

		/*---------------------------------------------------------*/
		/* Filter : LogicalOr ('|' Dot1)*                          */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.PIPE))
		{
			this.tokenizer.next();

			node = this.parseDot1(true);

			for(temp = node; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft);

			temp.list.unshift(left);

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	},

	/*-----------------------------------------------------------------*/

	this.parseLogicalOr = function()
	{
		var left = this.parseLogicalAnd(), right, node;

		/*---------------------------------------------------------*/
		/* LogicalOr : LogicalAnd ('or' LogicalAnd)*               */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_OR))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseLogicalAnd();

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
		var left = this.parseBitwiseOr(), right, node;

		/*---------------------------------------------------------*/
		/* LogicalAnd : BitwiseOr ('and' BitwiseOr)*               */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_AND))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseBitwiseOr();

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
		var left = this.parseBitwiseXor(), right, node;

		/*---------------------------------------------------------*/
		/* BitwiseOr : BitwiseXor ('b-or' BitwiseXor)*             */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_OR))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseBitwiseXor();

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
		var left = this.parseBitwiseAnd(), right, node;

		/*---------------------------------------------------------*/
		/* BitwiseXor : BitwiseAnd ('b-xor' BitwiseAnd)*           */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_XOR))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseBitwiseAnd();

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
		var left = this.parseNot(), right, node;

		/*---------------------------------------------------------*/
		/* BitwiseAnd : Not ('b-and' Not)*                         */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_AND))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseNot();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseNot = function()
	{
		var right, node;

		/*---------------------------------------------------------*/
		/* Not : 'not' Comp                                        */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwig.expr.tokens.NOT))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseComp();

			node.nodeLeft = null;
			node.nodeRight = right;

			return node;
		}

		/*---------------------------------------------------------*/
		/*     | Comp                                              */
		/*---------------------------------------------------------*/

		return this.parseComp();
	};

	/*-----------------------------------------------------------------*/

	this.parseComp = function()
	{
		var left = this.parseAddSub(), right, node, swap;

		/*---------------------------------------------------------*/
		/* Comp : AddSub 'is' 'not'? ('defined' | 'null' | ...)    */
		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/
		/*      | AddSub ('===' | '==' | ...) AddSub               */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.CMP_OP))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | AddSub ('starts' | 'ends') `with` AddSub         */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.XXX_WITH))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | AddSub 'matches' AddSub                          */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.MATCHES))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | AddSub 'in' AddSub                               */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.IN))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | AddSub                                           */
		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseAddSub = function()
	{
		var left = this.parseMulDiv(), right, node;

		/*---------------------------------------------------------*/
		/* AddSub : MulDiv (('+' | '-') MulDiv)*                   */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.PLUS_MINUS))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseMulDiv();

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
		var left = this.parsePlusMinus(), right, node;

		/*---------------------------------------------------------*/
		/* MulDiv : PlusMinus (('*' | '//' | '/' | '%') PlusMinus)**/
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.MUL_FLDIV_DIV_MOD))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parsePlusMinus();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parsePlusMinus = function()
	{
		var right, node;

		/*---------------------------------------------------------*/
		/* PlusMinus : ('-' | '+') Power                           */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwig.expr.tokens.PLUS_MINUS))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parsePower();

			node.nodeLeft = null;
			node.nodeRight = right;

			return node;
		}

		/*---------------------------------------------------------*/
		/*              | Dot1                                     */
		/*---------------------------------------------------------*/

		return this.parsePower();
	};

	/*-----------------------------------------------------------------*/

	this.parsePower = function()
	{
		var left = this.parseDot1(), right, node;

		/*---------------------------------------------------------*/
		/* Power : Dot1 ('**' Dot1)*                               */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.POWER))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseDot1();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseDot1 = function(isFilter)
	{
		var node = this.parseDot2(isFilter), temp;

		if(node)
		{
			/*-------------------------------------------------*/

			for(temp = node; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft);

			/*-------------------------------------------------*/

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
						temp.nodeValue = ((((((('_.'))))))) + temp.nodeValue;
					}
				}
				else if(temp.nodeType === amiTwig.expr.tokens.VAR)
				{
					temp.nodeValue = ((((((('_.'))))))) + temp.nodeValue;
				}

				temp.q = false;
			}

			/*-------------------------------------------------*/
		}

		return node;
	};

	/*-----------------------------------------------------------------*/

	this.parseDot2 = function(isFilter)
	{
		var left = this.parseDot3(isFilter), right, node;

		/*---------------------------------------------------------*/
		/* Dot2 : Dot3 ('.' Dot3)*                                 */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.DOT))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), '.');
			this.tokenizer.next();

			right = this.parseDot3(isFilter);

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseDot3 = function(isFilter)
	{
		var left = this.parseX(isFilter), right, node;

		/*---------------------------------------------------------*/
		/* parseDot3 : X ('[' Filter ']')*                         */
		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/
		/*         | X                                             */
		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseX = function(isFilter)
	{
		var node;

		/*---------------------------------------------------------*/
		/* X : Group | Array | Object | FunVar | Terminal          */
		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/
		/* SYNTAX ERROR                                            */
		/*---------------------------------------------------------*/

		throw 'syntax error, line `' + this.line + '`, syntax error or tuncated expression';

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.parseGroup = function()
	{
		var node;

		/*---------------------------------------------------------*/
		/* Group : '(' Filter ')'                                  */
		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/

		return null;
	};

	/*-----------------------------------------------------------------*/

	this.parseArray = function()
	{
		var node, list;

		/*---------------------------------------------------------*/
		/* Array : '[' Singlets ']'                                */
		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/

		return null;
	};

	/*-----------------------------------------------------------------*/

	this.parseObject = function()
	{
		var node, dict;

		/*---------------------------------------------------------*/
		/* Object : '{' Doublets '}'                               */
		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/

		return null;
	};

	/*-----------------------------------------------------------------*/

	this.parseFunVar = function(isFilter)
	{
		var node;

		if(this.tokenizer.checkType(amiTwig.expr.tokens.SID))
		{
			node = new amiTwig.expr.Node(0, isFilter ? 'filter_' + this.tokenizer.peekToken() : this.tokenizer.peekToken());

			node.q = true;

			this.tokenizer.next();

			/*-------------------------------------------------*/
			/* FunVar : SID '(' Singlets ')'                   */
			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/
			/*        | SID                                    */
			/*-------------------------------------------------*/

			else
			{
				node.nodeType = isFilter ? amiTwig.expr.tokens.FUN
				                         : amiTwig.expr.tokens.VAR
				;

				node.list = [];
			}

			/*-------------------------------------------------*/

			return node;
		}

		return null;
	},

	/*-----------------------------------------------------------------*/

	this._parseSinglets = function()
	{
		var result = [];

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
	};

	/*-----------------------------------------------------------------*/

	this._parseDoublets = function()
	{
		var result = {};

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
	};

	/*-----------------------------------------------------------------*/

	this._parseSinglet = function(result)
	{
		result.push(this.parseFilter());
	},

	/*-----------------------------------------------------------------*/

	this._parseDoublet = function(result)
	{
		if(this.tokenizer.checkType(amiTwig.expr.tokens.TERMINAL))
		{
			var key = this.tokenizer.peekToken();
			this.tokenizer.next();

			if(this.tokenizer.checkType(amiTwig.expr.tokens.COLON))
			{
/*				var colon = this.tokenizer.peekToken();
 */				this.tokenizer.next();

				/*-----------------------------------------*/

				result[key] = this.parseFilter();

				/*-----------------------------------------*/
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

	/*-----------------------------------------------------------------*/

	this.parseTerminal = function()
	{
		var left, right, node;

		/*---------------------------------------------------------*/
		/* Terminal : TERMINAL | RANGE                             */
		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/

		return null;
	};

	/*-----------------------------------------------------------------*/

	this.$init(code, line);

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.Node                                                      */
/*-------------------------------------------------------------------------*/

amiTwig.expr.Node = function(nodeType, nodeValue) {
	/*-----------------------------------------------------------------*/

	this.$init = function(nodeType, nodeValue)
	{
		this.nodeType = nodeType;
		this.nodeValue = nodeValue;
		this.nodeLeft = null;
		this.nodeRight = null;
		this.list = null;
		this.dict = null;
	};

	/*-----------------------------------------------------------------*/

	this._dump = function(nodes, edges, pCnt)
	{
		var i, cnt = pCnt[0], CNT;

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
			for(i in this.list)
			{
				CNT = ++pCnt[0];
				edges.push('\tnode' + cnt + ' -> node' + CNT + ' [label="[' + i.replace(/"/g, '\\"') + ']"];');
				this.list[i]._dump(nodes, edges, pCnt);
			}
		}

		if(this.dict)
		{
			for(i in this.dict)
			{
				CNT = ++pCnt[0];
				edges.push('\tnode' + cnt + ' -> node' + CNT + ' [label="[' + i.replace(/"/g, '\\"') + ']"];');
				this.dict[i]._dump(nodes, edges, pCnt);
			}
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

	this.$init(nodeType, nodeValue);

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.ajax                                                            */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG Ajax
 * @namespace ami/twig/ajax
 */

amiTwig.ajax = {
	/*-----------------------------------------------------------------*/

	dict: {},

	/*-----------------------------------------------------------------*/

	get: function(url, done, fail)
	{
		var txt;

		/*---------------------------------------------------------*/

		if(url in this.dict)
		{
			if(done)
			{
				done(this.dict[url]);
			}
		}

		/*---------------------------------------------------------*/

		if(amiTwig.fs)
		{
			/*-------------------------------------------------*/
			/* NODEJS                                          */
			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/
		}
		else
		{
			/*-------------------------------------------------*/
			/* BROWSER                                         */
			/*-------------------------------------------------*/

			var xmlHttpRequest = new XMLHttpRequest();

			xmlHttpRequest.open('GET', url, false);
			xmlHttpRequest.send();

			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.engine                                                          */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG Engine
 * @namespace ami/twig
 */

amiTwig.engine = {
	/*-----------------------------------------------------------------*/

	STATEMENT_RE: /\{%\s*([a-zA-Z]+)\s+(.*?)\s*%\}/m,

	VARIABLE_RE: /\{\{\s*(.*?)\s*\}\}/g,

	COMMENT_RE: /\{#\s*(.*?)\s*#\}/g,

	/*-----------------------------------------------------------------*/

	compile: function(s)
	{
		/*---------------------------------------------------------*/

		var result = {
			line: line,
			keyword: '@root',
			expression: '',
			blocks: [{
				expression: '@else',
				list: [],
			}],
			value: '',
		};

		/*---------------------------------------------------------*/

		var stack1 = [result];
		var stack2 = [0x0000];

		var item;

		/*---------------------------------------------------------*/

		var column_nr = 0;
		var COLUMN_NR = 0;

		var line = 1;

		var i;

		/*---------------------------------------------------------*/

		for(s = s.replace(this.COMMENT_RE, '');; s = s.substr(COLUMN_NR))
		{
			/*-------------------------------------------------*/

			var curr = stack1[stack1.length - 1];
			var indx = stack2[stack2.length - 1];

			/*-------------------------------------------------*/

			var m = s.match(this.STATEMENT_RE);

			if(m === null)
			{
				/*-----------------------------------------*/

				for(i in s)
				{
					if(s[i] === '\n')
					{
						line++;
					}
				}

				/*-----------------------------------------*/

				curr.blocks[indx].list.push({
					line: line,
					keyword: '@text',
					expression: '',
					blocks: [],
					value: s,
				});

				/*-----------------------------------------*/

				var errors = [];

				for(i = stack1.length - 1; i > 0; i--)
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

				/*-----------------------------------------*/

				return result;
			}

			/*-------------------------------------------------*/

			var match = m[0];
			var keyword = m[1];
			var expression = m[2];

			column_nr = m.index + 0x0000000000;
			COLUMN_NR = m.index + match.length;

			var value = s.substr(0, column_nr);
			var VALUE = s.substr(0, COLUMN_NR);

			for(i in VALUE)
			{
				if(VALUE[i] === '\n')
				{
					line++;
				}
			}

			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/

			switch(keyword)
			{
				/*-----------------------------------------*/

				case 'flush':
				case 'autoescape':
				case 'spaceless':
				case 'verbatim':

					/* IGNORE */

					break;

				/*-----------------------------------------*/

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

				/*-----------------------------------------*/

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

				/*-----------------------------------------*/

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

				/*-----------------------------------------*/

				case 'else':

					if(curr['keyword'] !== 'if')
					{
						throw 'syntax error, line `' + line + '`, unexpected keyword `else`';
					}

					indx = curr.blocks.length;

					curr.blocks.push({
						expression: '@else',
						list: [],
					});

					stack2[stack2.length - 1] = indx;

					break;

				/*-----------------------------------------*/

				case 'endif':

					if(curr['keyword'] !== 'if')
					{
						throw 'syntax error, line `' + line + '`, unexpected keyword `endif`';
					}

					stack1.pop();
					stack2.pop();

					break;

				/*-----------------------------------------*/

				case 'endfor':

					if(curr['keyword'] !== 'for')
					{
						throw 'syntax error, line `' + line + '`, unexpected keyword `endfor`';
					}

					stack1.pop();
					stack2.pop();

					break;

				/*-----------------------------------------*/

				default:

					throw 'syntax error, line `' + line + '`, unknown keyword `' + keyword + '`';

				/*-----------------------------------------*/
			}

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	_render: function(result, item, dict)
	{
		var i, j, k, l;

		var expression, list;

		var m, symb, expr, value;

		this.dict = dict || {};

		switch(item.keyword)
		{
			/*-------------------------------------------------*/
			/* DO                                              */
			/*-------------------------------------------------*/

			case 'do':
				/*-----------------------------------------*/

				amiTwig.expr.cache.eval(item.expression, item.line, dict);

				/*-----------------------------------------*/

				break;

			/*-------------------------------------------------*/
			/* SET                                             */
			/*-------------------------------------------------*/

			case 'set':
				/*-----------------------------------------*/

				m = item.expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(.+)/)

				if(!m)
				{
					throw 'syntax error, line `' + item.line + '`, invalid `set` statement';
				}

				/*-----------------------------------------*/

				dict[m[1]] = amiTwig.expr.cache.eval(m[2], item.line, dict);

				/*-----------------------------------------*/

				break;

			/*-------------------------------------------------*/
			/* @TEXT                                           */
			/*-------------------------------------------------*/

			case '@text':
				/*-----------------------------------------*/

				result.push(item.value.replace(this.VARIABLE_RE, function(match, expression) {

					value = amiTwig.expr.cache.eval(expression, item.line, dict);

					return (value !== undefined && value !== null) ? value : '';
				}));

				/*-----------------------------------------*/

				break;

			/*-------------------------------------------------*/
			/* IF                                              */
			/*-------------------------------------------------*/

			case 'if':
			case '@root':
				/*-----------------------------------------*/

				for(i in item.blocks)
				{
					expression = item.blocks[i].expression;

					if(expression === '@else' || amiTwig.expr.cache.eval(expression, item.line, dict))
					{
						list = item.blocks[i].list;

						for(j in list)
						{
							this._render(result, list[j], dict);
						}

						break;
					}
				}

				/*-----------------------------------------*/

				break;

			/*-------------------------------------------------*/
			/* FOR                                             */
			/*-------------------------------------------------*/

			case 'for':
				/*-----------------------------------------*/

				m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/)

				if(!m)
				{
					throw 'syntax error, line `' + item.line + '`, invalid `for` statement';
				}

				/*-----------------------------------------*/

				symb = m[1];
				expr = m[2];

				value = amiTwig.expr.cache.eval(expr, item.line, dict);

				/*-----------------------------------------*/

				var typeName = Object.prototype.toString.call(value);

				if(typeName !== '[object Array]'
				   &&
				   typeName !== '[object Object]'
				   &&
				   typeName !== '[object String]'
				 ) {
					throw 'syntax error, line `' + item.line + '`, right operande not iterable';
				}

				/*-----------------------------------------*/

				if(typeName === '[object Object]')
				{
					value = Object.keys(value);
				}

				/*-----------------------------------------*/

				var old1 = dict[(symb)];
				var old2 = dict['loop'];

				/*-----------------------------------------*/

				k = 0x0000000000;
				l = value.length;

				dict.loop = {length: l};

				list = item.blocks[0].list;

				for(i in value)
				{
					dict[symb] = value[i];

					dict.loop.first = (k === (0 - 0));
					dict.loop.last = (k === (l - 1));

					dict.loop.index0 = k;
					k++;
					dict.loop.index = k;

					for(j in list)
					{
						this._render(result, list[j], dict);
					}
				}

				/*-----------------------------------------*/

				if(old2) {
					dict['loop'] = old2;
				}

				if(old1) {
					dict[(symb)] = old1;
				}

				/*-----------------------------------------*/

				break;

			/*-------------------------------------------------*/
			/* INCLUDE                                         */
			/*-------------------------------------------------*/

			case 'include':
				/*-----------------------------------------*/

				expression = item.expression;

				/*-----------------------------------------*/

				var with_context = true;

				expression = expression.trim();

				if((m = expression.match(/only$/)))
				{
					expression = expression.substr(expression, expression.length - m[0].length - 1);

					with_context = false;
				}

				/*-----------------------------------------*/

				var with_subexpr = '{}';

				expression = expression.trim();

				if((m = expression.match(/with\s+(.+)$/)))
				{
					expression = expression.substr(expression, expression.length - m[0].length - 1);

					with_subexpr = m[1];
				}

				/*-----------------------------------------*/

				var FILENAME = amiTwig.expr.cache.eval(expression, item.line, dict) || '';

				if(Object.prototype.toString.call(FILENAME) !== '[object String]')
				{
					throw 'runtime error, line `' + item.line + '`, string expected';
				}

				/*-----------------------------------------*/

				var VARIABLES = amiTwig.expr.cache.eval(with_subexpr, item.line, dict) || {};

				if(Object.prototype.toString.call(VARIABLES) !== '[object Object]')
				{
					throw 'runtime error, line `' + item.line + '`, object expected';
				}

				/*-----------------------------------------*/

				result.push(amiTwig.stdlib.include(
					FILENAME,
					VARIABLES,
					with_context,
					false
				));

				/*-----------------------------------------*/

				break;

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	render: function(tmpl, dict)
	{
		var result = [];

		this._render(result, Object.prototype.toString.call(tmpl) === '[object String]' ? this.compile(tmpl) : tmpl, dict || {});

		return result.join('');
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.cache                                                      */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG cache interpreter
 * @namespace ami/twig/expr/cache
 */

amiTwig.expr.cache = {
	/*-----------------------------------------------------------------*/

	dict: {},

	/*-----------------------------------------------------------------*/

	eval: function(expression, line, _)
	{
		/*---------------------------------------------------------*/

		var f;

		if(expression in this.dict)
		{
			f = this.dict[expression];
		}
		else
		{
			f = this.dict[expression] = eval(amiTwig.expr.interpreter.getJS(
			                                         new amiTwig.expr.Compiler(expression, line)
			));
		}

		/*---------------------------------------------------------*/

		if(!_) _ = {};

		return f.call(_, _);

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.stdlib                                                         */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG StdLib
 * @namespace ami/twig/stdlib
 */

amiTwig.stdlib = {
	/*-----------------------------------------------------------------*/
	/* VARIABLES                                                       */
	/*-----------------------------------------------------------------*/

	'isDefined': function(x)
	{
		return x !== undefined;
	},

	/*-----------------------------------------------------------------*/

	'isNull': function(x)
	{
		return x === null;
	},

	/*-----------------------------------------------------------------*/

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
		else
		{
			var typeName = Object.prototype.toString.call(x);

			return (typeName === '[object Array]' && x.length === 0)
			       ||
			       (typeName === '[object Object]' && Object.keys(x).length === 0)
			;
		}
	},

	/*-----------------------------------------------------------------*/

	'isNumber': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Number]';
	},

	/*-----------------------------------------------------------------*/

	'isString': function(x)
	{
		return Object.prototype.toString.call(x) === '[object String]';
	},

	/*-----------------------------------------------------------------*/

	'isArray': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Array]';
	},

	/*-----------------------------------------------------------------*/

	'isObject': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Object]';
	},

	/*-----------------------------------------------------------------*/

	'isIterable': function(x)
	{
		var typeName = Object.prototype.toString.call(x);

		return typeName === '[object String]'
		       ||
		       typeName === '[object Array]'
		       ||
		       typeName === '[object Object]'
		;
	},

	/*-----------------------------------------------------------------*/

	'isEven': function(x)
	{
		return this.isNumber(x) && (x & 1) === 0;
	},

	/*-----------------------------------------------------------------*/

	'isOdd': function(x)
	{
		return this.isNumber(x) && (x & 1) === 1;
	},

	/*-----------------------------------------------------------------*/
	/* ITERABLES                                                       */
	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

	'isInRange': function(x, x1, x2)
	{
		if(this.isNumber(x1)
		   &&
		   this.isNumber(x2)
		 ) {
			return ((((((((x))))))) >= (((((((x1))))))))
			       &&
			       ((((((((x))))))) <= (((((((x2))))))))
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

	/*-----------------------------------------------------------------*/

	'range': function(x1, x2, step)
	{
		var i;

		var result = [];

		if(!step)
		{
			step = 1;
		}

		/**/ if(this.isNumber(x1)
		        &&
		        this.isNumber(x2)
		 ) {
			for(i = (((((((x1))))))); i <= (((((((x2))))))); i += step)
			{
				result.push(/*---------------*/(i));
			}
		}
		else if(this.isString(x1) && x1.length === 1
		        &&
		        this.isString(x2) && x2.length === 1
		 ) {
			for(i = x1.charCodeAt(0); i <= x2.charCodeAt(0); i += step)
			{
				result.push(String.fromCharCode(i));
			}
		}

		return result;
	},

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

	'filter_first': function(x)
	{
		return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[0x0000000000] : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_last': function(x)
	{
		return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[x.length - 1] : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_slice': function(x, idx1, idx2)
	{
		return (this.isString(x) || this.isArray(x)) ? x.slice(idx1, idx2) : null;
	},

	/*-----------------------------------------------------------------*/

	'filter_merge': function()
	{
		var i, j;

		if(arguments.length > 1)
		{
			if(this.isString(arguments[0]))
			{
				var s = '';

				for(i in arguments)
				{
					s += arguments[i];
				}

				return s;
			}

			if(this.isArray(arguments[0]))
			{
				var L = []

				for(i in arguments)
				{
					for(j in arguments[i])
					{
						L.push(arguments[i][j]);
					}
				}

				return L;
			}

			if(this.isObject(arguments[0]))
			{
				var D = {}

				for(i in arguments)
				{
					for(j in arguments[i])
					{
						D[j] = arguments[i][j];
					}
				}

				return D;
			}
		}

		return null;
	},

	/*-----------------------------------------------------------------*/

	'filter_sort': function(x)
	{
		return this.isArray(x) ? x.sort() : [];
	},

	/*-----------------------------------------------------------------*/

	'filter_reverse': function(x)
	{
		return this.isArray(x) ? x.reverse() : [];
	},

	/*-----------------------------------------------------------------*/

	'filter_join': function(x, sep)
	{
		return this.isArray(x) ? x.join(sep) : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_keys': function(x)
	{
		return this.isObject(x) ? Object.keys(x) : [];
	},

	/*-----------------------------------------------------------------*/
	/* STRINGS                                                         */
	/*-----------------------------------------------------------------*/

	'startsWith': function(s1, s2)
	{
		if(this.isString(s1)
		   &&
		   this.isString(s2)
		 ) {
			var base = 0x0000000000000000000;

			return s1.indexOf(s2, base) === base;
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	'endsWith': function(s1, s2)
	{
		if(this.isString(s1)
		   &&
		   this.isString(s2)
		 ) {
			var base = s1.length - s2.length;

			return s1.indexOf(s2, base) === base;
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	'match': function(s, regex)
	{
		if(this.isString(((s)))
		   &&
		   this.isString(regex)
		 ) {
			var idx1 = regex.  indexOf  ('/');
			var idx2 = regex.lastIndexOf('/');

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

	/*-----------------------------------------------------------------*/

	'filter_default': function(s1, s2)
	{
		/**/ if(s1)
		{
			return s1;
		}
		else if(s2)
		{
			return s2;
		}

		return '';
	},

	/*-----------------------------------------------------------------*/

	'filter_lower': function(s)
	{
		return this.isString(s) ? s.toLowerCase() : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_upper': function(s)
	{
		return this.isString(s) ? s.toUpperCase() : '';
	},

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

	'filter_trim': function(s)
	{
		return this.isString(s) ? s.trim() : '';
	},

	/*-----------------------------------------------------------------*/

	'_internal_escape_map1': {
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		'&': '&amp;',
	},

	/*-----------------------------------------------------------------*/

	'_internal_escape_map2': {
		'\\': '\\\\',
		'\n': '\\n',
		'\"': '\\\"',
		'\'': '\\\'',
	},

	/*-----------------------------------------------------------------*/

	'filter_escape': function(s, mode)
	{
		if(this.isString(s))
		{
			var _map;

			/**/ if(!
			        mode
			        ||
				mode === 'html'
				||
				mode === 'html_attr'
			 ) {
				_map = this._internal_escape_map1;

				return s.replace(/[<>"&]/g, function(s) {

					return _map[s];
				});
			}
			else if(mode === 'js')
			{
				_map = this._internal_escape_map2;

				return s.replace(/[\\\n"']/g, function(s) {

					return _map[s];
				});
			}
			else if(mode === 'url')
			{
				return encodeURIComponent(s);
			}
		}

		return '';
	},

	/*-----------------------------------------------------------------*/

	'filter_url_encode': function(s)
	{
		return this.isString(s) ? encodeURIComponent(s) : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_nl2br': function(s)
	{
		return this.isString(s) ? s.replace(/\n/g, '<br/>') : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_raw': function(s)
	{
		return this.isString(s) ? s : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_replace': function(s, dict)
	{
		if(this.isString(s) && this.isObject(dict))
		{
			var q;

			var t = '';

			var i = 0x000000;
			var l = s.length;

			while(i < l)
			{
				q = true;

				for(var name in dict)
				{
					if(s.substring(i).indexOf(name) === 0)
					{
						t += dict[name];

						i += name.length;

						q = false;

						break;
					}
				}

				if(q)
				{
					t += s.charAt(i++);
				}
			}

			return t;
		}

		return '';
	},

	/*-----------------------------------------------------------------*/

	'filter_split': function(s, sep, max)
	{
		return this.isString(s) ? s.split(sep, max) : [];
	},

	/*-----------------------------------------------------------------*/
	/* NUMBERS                                                         */
	/*-----------------------------------------------------------------*/

	'filter_abs': function(x)
	{
		return Math.abs(x);
	},

	/*-----------------------------------------------------------------*/

	'filter_round': function(x, mode)
	{
		/**/ if(mode === 'ceil')
		{
			return Math.ceil(x);
		}
		else if(mode === 'floor')
		{
			return Math.floor(x);
		}
		else
		{
			return Math.round(x);
		}
	},

	/*-----------------------------------------------------------------*/

	'min': function()
	{
		/*---------------------------------------------------------*/

		var args = (arguments.length === 1) && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0]
		                                                                                                   : arguments
		;

		/*---------------------------------------------------------*/

		var result = Number.POSITIVE_INFINITY;

		for(var i in args)
		{
			var arg = args[i];

			if(this.isNumber(arg) == false)
			{
				return Number.NaN;
			}

			if(result > arg)
			{
				result = arg;
			}
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	'max': function()
	{
		/*---------------------------------------------------------*/

		var args = (arguments.length === 1) && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0]
		                                                                                                   : arguments
		;

		/*---------------------------------------------------------*/

		var result = Number.NEGATIVE_INFINITY;

		for(var i in args)
		{
			var arg = args[i];

			if(this.isNumber(arg) == false)
			{
				return Number.NaN;
			}

			if(result < arg)
			{
				result = arg;
			}
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/
	/* RANDOM                                                          */
	/*-----------------------------------------------------------------*/

	'random': function(x)
	{
		var y = Math.random();

		if(x)
		{
			/**/ if(this.isString(x))
			{
				return x[Math.floor(x.length * y)];
			}
			else if(this.isArray(x))
			{
				return x[Math.floor(x.length * y)];
			}
			else if(this.isNumber(x))
			{
				return Math.floor(x * y);
			}
		}

		x = Number.MAX_SAFE_INTEGER;

		return Math.floor(x * y);
	},

	/*-----------------------------------------------------------------*/
	/* JSON                                                            */
	/*-----------------------------------------------------------------*/

	'filter_json_encode': function(x)
	{
		return JSON.stringify(x, null, 2);
	},

	/*-----------------------------------------------------------------*/

	'filter_json_jspath': function(x, path)
	{
		return typeof JSPath !== 'undefined' ? JSPath.apply(path, x) : [];
	},

	/*-----------------------------------------------------------------*/
	/* TEMPLATES                                                       */
	/*-----------------------------------------------------------------*/

	'include': function(fileName, variables, withContext, ignoreMissing)
	{
		var i;

		var temp = {};

		/*---------------------------------------------------------*/

		if(withContext) {
			for(i in amiTwig.engine.dict) temp[i] = amiTwig.engine.dict[i];
		}

		if(variables) {
			for(i in /**/ variables /**/) temp[i] = /**/ variables /**/[i];
		}

		/*---------------------------------------------------------*/

		var result = '';

		amiTwig.ajax.get(
			fileName,
			function(data)
			{
				result = amiTwig.engine.render(data, temp);
			},
			function(/**/)
			{
				if(ignoreMissing === false)
				{
					throw 'runtime error, could not open `' + fileName + '`';
				}
			}
		);

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

amiTwig.stdlib.filter_e = amiTwig.stdlib.filter_escape;

/*-------------------------------------------------------------------------*/
/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.interpreter                                                */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG expression interpreter
 * @see An online <a href="http://cern.ch/ami/twig/" target="_blank">demo</a>.
 * @namespace ami/twig/expr/interpreter
 */

amiTwig.expr.interpreter = {
	/*-----------------------------------------------------------------*/

	_getJS: function(node)
	{
		var L;
		var i;
		var x;

		var left;
		var right;

		var operator;

		switch(node.nodeType)
		{
			/*-------------------------------------------------*/
			/* LST                                             */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.LST:
				/*-----------------------------------------*/

				L = [];

				for(i in node.list)
				{
					L.push(/* (i) */ this._getJS(node.list[i]));
				}

				/*-----------------------------------------*/

				return '[' + L.join(',') + ']';

			/*-------------------------------------------------*/
			/* DIC                                             */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.DIC:
				/*-----------------------------------------*/

				L = [];
	
				for(i in node.dict)
				{
					L.push(i + ':' + this._getJS(node.dict[i]));
				}

				/*-----------------------------------------*/

				return '{' + L.join(',') + '}';

			/*-------------------------------------------------*/
			/* FUN                                             */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.FUN:
		 		/*-----------------------------------------*/

				L = [];

				for(i in node.list)
				{
					L.push(this._getJS(node.list[i]));
				}

			 	/*-----------------------------------------*/

				return node.nodeValue + '(' + L.join(',') + ')';

			/*-------------------------------------------------*/
			/* VAR                                             */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.VAR:
				/*-----------------------------------------*/

				L = [];

				for(i in node.list)
				{
					L.push('[' + this._getJS(node.list[i]) + ']');
				}

				/*-----------------------------------------*/

				return L.length > 0 ? node.nodeValue + L.join('') : node.nodeValue;

			/*-------------------------------------------------*/
			/* TERMINAL                                        */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.TERMINAL:

				return node.nodeValue;

			/*-------------------------------------------------*/
			/* IS                                              */
			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/
			/* IN                                              */
			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/
			/* STARTS_WITH                                     */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.STARTS_WITH:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.startsWith(' + left + ',' + right + ')';

			/*-------------------------------------------------*/
			/* ENDS_WITH                                       */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.ENDS_WITH:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.endsWith(' + left + ',' + right + ')';

			/*-------------------------------------------------*/
			/* MATCHES                                         */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.MATCHES:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.match(' + left + ',' + right + ')';

			/*-------------------------------------------------*/
			/* RANGE                                           */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.RANGE:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.range(' + left + ',' + right + ')';

			/*-------------------------------------------------*/
			/* DOT                                             */
			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/
			/* FLDIV                                           */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.FLDIV:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'Math.floor(' + left + '/' + right + ')';

			/*-------------------------------------------------*/
			/* POWER                                           */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.POWER:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'Math.pow(' + left + ',' + right + ')';

			/*-------------------------------------------------*/

			default:
				/*-----------------------------------------*/
				/* UNIARY OPERATOR                         */
				/*-----------------------------------------*/

				if(node.nodeLeft !== null
				   &&
				   node.nodeRight === null
				 ) {
					operator = (node.nodeType !== amiTwig.expr.tokens.NOT) ? node.nodeValue : '!';

					return operator + '(' + this._getJS(node.nodeLeft) + ')';
				}

				if(node.nodeLeft === null
				   &&
				   node.nodeRight !== null
				 ) {
					operator = (node.nodeType !== amiTwig.expr.tokens.NOT) ? node.nodeValue : '!';

					return operator + '(' + this._getJS(node.nodeRight) + ')';
				}

				/*-----------------------------------------*/
				/* BINARY OPERATOR                         */
				/*-----------------------------------------*/

				if(node.nodeLeft !== null
				   &&
				   node.nodeRight !== null
				 ) {
					switch(node.nodeType)
					{
						/*-------------------------*/

						case amiTwig.expr.tokens.LOGICAL_OR:
							operator = '||';
							break;

						/*-------------------------*/

						case amiTwig.expr.tokens.LOGICAL_AND:
							operator = '&&';
							break;

						/*-------------------------*/

						case amiTwig.expr.tokens.BITWISE_OR:
							operator = '|';
							break;

						/*-------------------------*/

						case amiTwig.expr.tokens.BITWISE_XOR:
							operator = '^';
							break;

						/*-------------------------*/

						case amiTwig.expr.tokens.BITWISE_AND:
							operator = '&';
							break;

						/*-------------------------*/

						case amiTwig.expr.tokens.CONCAT:
							operator = '+';
							break;

						/*-------------------------*/

						default:
							operator = node.nodeValue;
							break;

						/*-------------------------*/
					}

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return '(' + left + operator + right + ')';
				}

			/*-------------------------------------------------*/
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
		return '(function(_) { return ' + this._getJS(expr.rootNode) + '; })';
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

		return eval(this.getJS(expr)).call(_, _);
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

/**
* JSPath
*
* Copyright (c) 2012 Filatov Dmitry (dfilatov@yandex-team.ru)
* With parts by Marat Dulin (mdevils@gmail.com)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* @version 0.3.4
*/

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
            PUNCT : 5,
            EOP   : 6
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

        while(match('==') || match('!=') || match('===') || match('!==') ||
                match('^=') || match('^==') || match('$==') || match('$=') || match('*==') || match('*=')) {
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

        if(type === TOKEN.STR || type === TOKEN.NUM || type === TOKEN.BOOL) {
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
        return ch === ' ';
    }

    function isIdStart(ch) {
        return (ch === '$') || (ch === '@') || (ch === '_') || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
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

        return id === 'true' || id === 'false'?
            {
                type  : TOKEN.BOOL,
                val   : id === 'true',
                range : [start, idx]
            } :
            {
                type  : TOKEN.ID,
                val   : id,
                range : [start, idx]
            };
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
            else if('=!^$*><'.indexOf(ch1) >= 0) {
                return {
                    type  : TOKEN.PUNCT,
                    val   : ch1 + ch2,
                    range : [start, idx += 2]
                };
            }
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
                var val = expr.val;
                body.push(dest, '=', typeof val === 'string'? escapeStr(val) : val, ';');
                break;
        }
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
            'if(', val, '!= null) {',
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

            '^==' : function(val1, val2) {
                return ['typeof ', val1, '=== "string" && typeof ', val2, '=== "string" &&',
                    val1, '.indexOf(', val2, ') === 0'].join('');
            },

            '^=' : function(val1, val2) {
                return [val1, '!= null &&', val2, '!= null &&',
                    val1, '.toString().toLowerCase().indexOf(', val2, '.toString().toLowerCase()) === 0'].join('');
            },

            '$==' : function(val1, val2) {
                return ['typeof ', val1, '=== "string" && typeof ', val2, '=== "string" &&',
                    val1, '.length >=', val2, '.length &&',
                    val1, '.lastIndexOf(', val2, ') ===', val1, '.length -', val2, '.length'].join('');
            },

            '$=' : function(val1, val2) {
                return [val1, '!= null &&', val2, '!= null &&',
                    '(', val1, '=', val1, '.toString()).length >=', '(', val2, '=', val2, '.toString()).length &&',
                    '(', val1, '.toLowerCase()).lastIndexOf(', '(', val2, '.toLowerCase())) ===',
                    val1, '.length -', val2, '.length'].join('');
            },

            '*==' : function(val1, val2) {
                return ['typeof ', val1, '=== "string" && typeof ', val2, '=== "string" &&',
                    val1, '.indexOf(', val2, ') > -1'].join('');
            },

            '*=' : function(val1, val2) {
                return [val1, '!= null && ', val2, '!= null &&',
                    val1, '.toString().toLowerCase().indexOf(', val2, '.toString().toLowerCase()) > -1'].join('');
            },

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

decl.version = '0.3.4';

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

/*!
 * AMI Web Framework - AMIObject.js
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* HELPERS                                                                 */
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

function $AMINamespace($name, $descr)
{
	if(!$descr)
	{
		$descr = {};
	}

	/*-----------------------------------------------------------------*/

	$descr.$name = $name;

	/*-----------------------------------------------------------------*/

	_$createNamespace($name, $descr);

	/*-----------------------------------------------------------------*/

	if($descr.$)
	{
		$descr.$.apply($descr);
	}

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* INTERFACES                                                              */
/*-------------------------------------------------------------------------*/

function $AMIInterface($name, $descr)
{
	if(!$descr)
	{
		$descr = {};
	}

	/*-----------------------------------------------------------------*/

	const $class = function()
	{
		throw 'could nor instantiate interface';
	};

	/*-----------------------------------------------------------------*/

	if($descr.$extends)
	{
		throw '`$extends` not allowed for interface';
	}

	if($descr.$implements)
	{
		throw '`$implements` not allowed for interface';
	}

	/*-----------------------------------------------------------------*/

	if($descr.$)
	{
		throw '`$` not allowed for interface';
	}

	if($descr.$init)
	{
		throw '`$init` not allowed for interface';
	}

	/*-----------------------------------------------------------------*/

	$class.$name = $name;
	$class.$class = $class;
	$class.$members = $descr;

	/*-----------------------------------------------------------------*/

	_$addToNamespace($name, $class);

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* CLASSES                                                                 */
/*-------------------------------------------------------------------------*/

function $AMIClass($name, $descr)
{
	if(!$descr)
	{
		$descr = {};
	}

	/*-----------------------------------------------------------------*/

	const $super = ($descr.$extends instanceof Function) ? $descr.$extends
	                                                             .prototype : {};

	const $super_implements = ($super.$implements instanceof Array) ? $super.$implements : [];
	const $descr_implements = ($descr.$implements instanceof Array) ? $descr.$implements : [];

	/*-----------------------------------------------------------------*/

	const $class = function()
	{
		/*---------------------------------------------------------*/

		for(const i in this.$implements)
		{
			const $interface = this.$implements[i];

			for(const j in $interface.$members)
			{
				const $member = $interface.$members[j];

				if(typeof(this[j]) !== typeof($member))
				{
					throw 'class `' + this.$name + '` with must implement `' + $interface.$name + '.' + j + '`';
				}
			}
		}

		/*---------------------------------------------------------*/

		this.$super = {};

		for(const name in this.$class._internal_super)
		{
			this.$super[name] = (function(name, that) { return function() {

				return that.$class._internal_super[name].apply(that, arguments)

			}})(name, this);
		}

		/*---------------------------------------------------------*/

		this.$added = {};

		for(const name in this.$class._internal_added)
		{
			this.$added[name] = (function(name, that) { return function() {

				return that.$class._internal_added[name].apply(that, arguments);

			}})(name, this);
		}

		/*---------------------------------------------------------*/

		if(this.$init)
		{
			this.$init.apply(this, arguments);
		}

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	$class._internal_super = {};
	$class._internal_added = {};

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

	$class.prototype.$name = $name;
	$class.prototype.$class = $class;
	$class.prototype.$implements = $super_implements.concat($descr_implements);

	/*-----------------------------------------------------------------*/

	_$addToNamespace($name, $class);

	/*-----------------------------------------------------------------*/

	if($descr.$)
	{
		$descr.$.apply($class);
	}

	/*-----------------------------------------------------------------*/
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

if(jQuery)
{
	jQuery.Namespace = $AMINamespace;
	jQuery.Interface = $AMIInterface;
	jQuery.  Class   =   $AMIClass  ;
}

/*-------------------------------------------------------------------------*/

/*!
 * AMI Web Framework - AMIExtension.js
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

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

jQuery.foreach = function(el, callback, context)
{
	if(context)
	{
		jQuery.each(el, function() {

			callback.apply(context, arguments);
		});
	}
	else
	{
		jQuery.each(el, function() {

			callback.apply(el, arguments);
		});
	}

	return el;
};

/*-------------------------------------------------------------------------*/

jQuery.getSheet = function(settings)
{
	let url = '';
	let context = null;

	if(settings)
	{
		if('url' in settings) {
			url = settings['url'];
		}

		if('context' in settings) {
			context = settings['context'];
		}
	}

	/*-----------------------------------------------------------------*/

	const deferred = $.Deferred();

	/*-----------------------------------------------------------------*/

	$('head').append('<link rel="stylesheet" type="text/css" href="' + url + '"></link>').promise().done(() => {

		deferred.resolveWith(context || deferred);
	});

	/*-----------------------------------------------------------------*/

	return deferred.promise();

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* BOOTSTRAP EXTENSIONS                                                    */
/*-------------------------------------------------------------------------*/

var _ami_internal_modalZIndex = 10000;

/*-------------------------------------------------------------------------*/

$(document).on('show.bs.modal', '.modal', function() {

	const el = $(this);

	setTimeout(() => {

		$('body > .modal-backdrop:last').css('z-index', _ami_internal_modalZIndex++);

		/*-----------*/el/*-----------*/.css('z-index', _ami_internal_modalZIndex++);

	}, 10);
});

/*-------------------------------------------------------------------------*/

/*!
 * AMI Web Framework - AMIWebApp.js
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* ami                                                                     */
/*-------------------------------------------------------------------------*/

$AMINamespace('ami');

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
	/*-----------------------------------------------------------------*/
	/* PRIVATE MEMBERS                                                 */
	/*-----------------------------------------------------------------*/

	_idRegExp: new RegExp('[a-zA-Z][a-zA-Z0-9]{7}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{12}', 'g'),

	/*-----------------------------------------------------------------*/

	_embedded: false,
	_noBootstrap: false,

	/*-----------------------------------------------------------------*/

	_sheets: [],
	_scripts: [],

	_controls: {},
	_subapps: {},

	_canLeave: true,

	/*-----------------------------------------------------------------*/

	_currentSubAppInstance: new function()
	{
		this.onReady = function() {};
		this.onExit = function() {};
		this.onLogin = function() {};
		this.onLogout = function() {};
	},

	/*-----------------------------------------------------------------*/
	/* PUBLIC MEMBERS                                                  */
	/*-----------------------------------------------------------------*/

	/**
	  * Origin URL
	  * @type {String}
	  */

	originURL: '/',

	/**
	  * WebApp URL
	  * @type {String}
	  */

	webAppURL: '/',

	/**
	  * URL arguments
	  * @type {Array<String>}
	  */

	args: {},

	/*-----------------------------------------------------------------*/
	/* STATIC CONSTRUCTOR                                              */
	/*-----------------------------------------------------------------*/

	$: function()
	{
		/*---------------------------------------------------------*/

		function _eatSlashes(url)
		{
			url = url.trim();

			while(url[url.length - 1] === '/')
			{
				url = url.substring(0, url.length - 1);
			}

			return url;
		}

		/*---------------------------------------------------------*/

		const href = window.location.href.trim();
		const search = window.location.search.trim();

		/**/

		const scripts = document.getElementsByTagName('script');

		const src = scripts[scripts.length - 1].src.trim();

		/*---------------------------------------------------------*/
		/* ORIGIN_URL                                              */
		/*---------------------------------------------------------*/

		const idx1 = src.indexOf('js/ami.');

		this.originURL = _eatSlashes(idx1 > 0 ? src.substring(0, idx1) : '/');

		/*---------------------------------------------------------*/
		/* WEBAPP_URL                                              */
		/*---------------------------------------------------------*/

		const idx2 = href.indexOf(((('?'))));

		this.webAppURL = _eatSlashes(idx2 > 0 ? href.substring(0, idx2) : href);

		/*---------------------------------------------------------*/
		/* FLAGS                                                   */
		/*---------------------------------------------------------*/

		if(idx1 > 0)
		{
			const flags = src.substring(idx1).toLowerCase();

			this._embedded = (flags.indexOf('embedded') >= 0);

			this._noBootstrap = (flags.indexOf('nobootstrap') >= 0);
		}

		/*---------------------------------------------------------*/
		/* ARGS                                                    */
		/*---------------------------------------------------------*/

		if(search)
		{
			search.substring(1).split('&').forEach((param) => {

				const parts = param.split('=');

				/**/ if(parts.length === 1)
				{
					this.args[decodeURIComponent(parts[0])] = /*---------*/''/*---------*/;
				}
				else if(parts.length === 2)
				{
					this.args[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
				}
			});
		}

		/*---------------------------------------------------------*/
		/* DEFAULT SHEETS AND SCRIPTS                              */
		/*---------------------------------------------------------*/

		if(this._noBootstrap === false
		   &&
		   (typeof jQuery.fn.modal) !== 'function'
		 ) {
			this.loadSheets([
				this.originURL + '/css/bootstrap.min.css',
				this.originURL + '/css/bootstrap-toggle.min.css',
				this.originURL + '/css/bootstrap-vertical-tabs.min.css',
			]);

			this.loadScripts([
				this.originURL + '/js/bootstrap.min.js',
				this.originURL + '/js/bootstrap-toggle.min.js',
				this.originURL + '/js/bootstrap-typeahead.min.js',
			]);
		}

		/*---------------------------------------------------------*/

		this.loadSheets([
			this.originURL + '/css/font-awesome.min.css',
			this.originURL + '/css/ami.min.css',
		]);

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
	/* MODE                                                            */
	/*-----------------------------------------------------------------*/

	/**
	  * Check whether the WebApp is executed in embedded mode
	  * @returns {Boolean}
	  */

	isEmbedded: function()
	{
		return this._embedded;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Check whether the WebApp is executed locally (file://, localhost or 127.0.0.1)
	  * @returns {Boolean}
	  */

	isLocal: function()
	{
		return document.location.protocol === (('file:'))
		       ||
		       document.location.hostname === 'localhost'
		       ||
		       document.location.hostname === '127.0.0.1'
		;
	},

	/*-----------------------------------------------------------------*/
	/* TOOLS                                                           */
	/*-----------------------------------------------------------------*/

	typeOf: function(x)
	{
		const name = Object.prototype.toString.call(x);

		return name.startsWith('[object ') ? name.substring(8, name.length - 1) : '';
	},

	/*-----------------------------------------------------------------*/

	asArray: function(x)
	{
		return this.typeOf(x) === 'Array' ? (x)
		                                  : [x]
		;
	},

	/*-----------------------------------------------------------------*/

	_replace: function(s, oldStrs, newStrs)
	{
		const result = [];

		const l = s.length;

__l0:		for(let i = 0; i < l;)
		{
			for(const j in oldStrs)
			{
				if(s.substring(i).startsWith(oldStrs[j]))
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

	/*-----------------------------------------------------------------*/

	_textToHtmlX: ['&'    , '"'     , '<'   , '>'   ],
	_textToHtmlY: ['&amp;', '&quot;', '&lt;', '&gt;'],

	/*-----------------------------------------------------------------*/

	/**
	  * Escapes the given string from text to HTML
	  * @param {String} string the unescaped string
	  * @returns {String} The escaped string
	  */

	textToHtml: function(s)
	{
		return this._replace(s || '', this._textToHtmlX, this._textToHtmlY);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Unescapes the given string from HTML to text
	  * @param {String} string the escaped string
	  * @returns {String} The unescaped string
	  */

	htmlToText: function(s)
	{
		return this._replace(s || '', this._textToHtmlY, this._textToHtmlX);
	},

	/*-----------------------------------------------------------------*/

	_textToStringX: ['\\'  , '\n' , '"'  , '\''  ],
	_textToStringY: ['\\\\', '\\n', '\\"', '\\\''],

	/*-----------------------------------------------------------------*/

	/**
	  * Escapes the given string from text to JavaScript string
	  * @param {String} string the unescaped string
	  * @returns {String} The escaped string
	  */

	textToString: function(s)
	{
		return this._replace(s || '', this._textToStringX, this._textToStringY);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Unescapes the given string from JavaScript string to text
	  * @param {String} string the escaped string
	  * @returns {String} The unescaped string
	  */

	stringToText: function(s)
	{
		return this._replace(s || '', this._textToStringY, this._textToStringX);

	},

	/*-----------------------------------------------------------------*/

	_htmlToStringX: ['\\'  , '\n' , '&quot;'  , '\''  ],
	_htmlToStringY: ['\\\\', '\\n', '\\&quot;', '\\\''],

	/*-----------------------------------------------------------------*/

	/**
	  * Escapes the given string from HTML to JavaScript string
	  * @param {String} string the unescaped string
	  * @returns {String} The escaped string
	  */

	htmlToString: function(s)
	{
		return this._replace(s || '', this._htmlToStringX, this._htmlToStringY);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Unescapes the given string from JavaScript string to HTML
	  * @param {String} string the escaped string
	  * @returns {String} The unescaped string
	  */

	stringToHtml: function(s)
	{
		return this._replace(s || '', this._htmlToStringY, this._htmlToStringX);
	},

	/*-----------------------------------------------------------------*/
	/* BASE64                                                          */
	/*-----------------------------------------------------------------*/

	_base64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/
	/* DYNAMIC RESOURCE LOADING                                        */
	/*-----------------------------------------------------------------*/

	_loadFiles: function(deferred, result, urls, dataType, context)
	{
		if(urls.length === 0)
		{
			return deferred.resolveWith(context || deferred, [result]);
		}

		/*---------------------------------------------------------*/

		const url = urls.shift();

		/*---------------------------------------------------------*/
		/* SHEET                                                   */
		/*---------------------------------------------------------*/

		/**/ if(dataType === 'sheet')
		{
			if(this._sheets.indexOf(url) >= 0)
			{
				result.push(false);

				this._loadFiles(deferred, result, urls, dataType, context);
			}
			else
			{
				$.getSheet({
					url: url,
					async: false,
					cache: false,
					crossDomain: true,
					dataType: dataType,
				}).then(() => {

					result.push(true);

					this._loadFiles(deferred, result, urls, dataType, context);

				}, () => {

					deferred.rejectWith(context || deferred, ['could not load `' + url + '`']);
				});
			}
		}

		/*---------------------------------------------------------*/
		/* SCRIPT                                                  */
		/*---------------------------------------------------------*/

		else if(dataType === 'script')
		{
			if(this._scripts.indexOf(url) >= 0)
			{
				result.push(false);

				this._loadFiles(deferred, result, urls, dataType, context);
			}
			else
			{
				$.ajax({
					url: url,
					async: false,
					cache: false,
					crossDomain: true,
					dataType: dataType,
				}).then(() => {

					result.push(true);

					this._loadFiles(deferred, result, urls, dataType, context);

				}, () => {

					deferred.rejectWith(context || deferred, ['could not load `' + url + '`']);
				});
			}
		}

		/*---------------------------------------------------------*/
		/* OTHER                                                   */
		/*---------------------------------------------------------*/

		else
		{
			$.ajax({
				url: url,
				async: true,
				cache: false,
				crossDomain: true,
				dataType: dataType,
			}).then((data) => {

				result.push(data);

				this._loadFiles(deferred, result, urls, dataType, context);

			}, () => {

				deferred.rejectWith(context || deferred, ['could not load `' + url + '`']);
			});
		}

		/*---------------------------------------------------------*/

		return deferred;
	},

	/*-----------------------------------------------------------------*/

	loadFiles: function(urls, dataType, settings)
	{
		let context = null;

		if(settings && 'context' in settings)
		{
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		if(this.typeOf(urls) !== 'Array')
		{
			urls = [urls];
		}

		/*---------------------------------------------------------*/

		return this._loadFiles($.Deferred(), [], urls, dataType, context).promise();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Loads CSS sheets asynchronously
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadSheets: function(urls, settings)
	{
		return this.loadFiles(urls, 'sheet', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Loads JS scripts asynchronously
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadScripts: function(urls, settings)
	{
		return this.loadFiles(urls, 'script', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Loads JSON files asynchronously
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadJSONs: function(urls, settings)
	{
		return this.loadFiles(urls, 'json', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Loads XML files asynchronously
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadXMLs: function(urls, settings)
	{
		return this.loadFiles(urls, 'xml', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Loads HTML files asynchronously
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadHTMLs: function(urls, settings)
	{
		return this.loadFiles(urls, 'html', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Loads TWIG files asynchronously
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadTWIGs: function(urls, settings)
	{
		return this.loadFiles(urls, 'text', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Loads text files asynchronously
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadTexts: function(urls, settings)
	{
		return this.loadFiles(urls, 'text', settings);
	},

	/*-----------------------------------------------------------------*/
	/* HTML CONTENT                                                    */
	/*-----------------------------------------------------------------*/

	_xxxHTML: function(selector, twig, mode, settings)
	{
		let context = null;
		let suffix = null;
		let dict = null;

		if(settings)
		{
			if('context' in settings) {
				context = settings['context'];
			}

			if('suffix' in settings) {
				suffix = settings['suffix'];
			}

			if('dict' in settings) {
				dict = settings['dict'];
			}
		}

		/*---------------------------------------------------------*/

		let html = this.formatTWIG(twig, dict);

		if(suffix)
		{
			html = html.replace(this._idRegExp, function(id) {

				return id + '_instance' + suffix;
			});
		}

		/*---------------------------------------------------------*/

		const target = $(selector);

		const result = $.Deferred();

		/*---------------------------------------------------------*/

		let promise;

		switch(mode)
		{
			case 0:
				promise = target.html(html).promise();
				break;

			case 1:
				promise = target.prepend(html).promise();
				break;

			case 2:
				promise = target.append(html).promise();
				break;

			default:
				throw 'internal error';
		}

		/*---------------------------------------------------------*/

		promise.done(() => {
			/*-------------------------------------------------*/

			if(jQuery.fn.tooltip)
			{
				target.find('[data-toggle="tooltip"]').tooltip({
					container: 'body',
					delay: {
						show: 500,
						hide: 100,
					},
				});
			}

			/*-------------------------------------------------*/

			if(jQuery.fn.popover)
			{
				target.find('[data-toggle="popover"][tabindex="0"]').popover({
					container: 'body',
					html: true,
					trigger: 'focus',
				});

				target.find('[data-toggle="popover"][tabindex!="0"]').popover({
					container: 'body',
					html: true,
					trigger: 'click',
				});
			}

			/*-------------------------------------------------*/

			if(jQuery.fn.bootstrapToggle)
			{
				target.find('input[type="checkbox"][data-toggle="toggle"]').bootstrapToggle();
			}

			/*-------------------------------------------------*/

			result.resolveWith(context || result, [html]);

			/*-------------------------------------------------*/
		});

		/*---------------------------------------------------------*/

		return result.promise();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
	/* HTML CONTENT                                                    */
	/*-----------------------------------------------------------------*/

	/**
	  * Put a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	replaceHTML: function(selector, twig, settings)
	{
		return this._xxxHTML(selector, twig, 0, settings);
	},

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

	/**
	  * Interpretes the given TWIG string, see {@link http://twig.sensiolabs.org/documentation}
	  * @param {String} html the TWIG string
	  * @param {Object} [dict] the dictionary
	  * @returns {String} The Interpreted TWIG string
	  */

	formatTWIG: function(twig, dict)
	{
		let result;

		if(this.typeOf(dict) === 'Array')
		{
			result = '';

			for(let tcid of dict)
			{
				if(this.typeOf(tcid) !== 'Object')
				{
					tcid = {};
				}

				tcid['ORIGIN_URL'] = this.originURL;
				tcid['WEBAPP_URL'] = this.webAppURL;

				result += amiTwig.engine.render(twig, tcid);
			}
		}
		else
		{
			if(this.typeOf(dict) !== 'Object')
			{
				dict = {};
			}

			dict['ORIGIN_URL'] = this.originURL;
			dict['WEBAPP_URL'] = this.webAppURL;

			result = amiTwig.engine.render(twig, dict);
		}

		return result;
	},

	/*-----------------------------------------------------------------*/
	/* JSPATH                                                          */
	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/
	/* LOCK                                                            */
	/*-----------------------------------------------------------------*/

	/**
	  * Locks the web application
	  */

	lock: function()
	{
		$('#ami_locker').css('display', 'block');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Unlocks the web application
	  */

	unlock: function()
	{
		$('#ami_locker').css('display', 'none');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Enable the message in a confirmation dialog box to inform that the user is about to leave the current page.
	  */

	canLeave: function()
	{
		this._canLeave = true;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Disable the message in a confirmation dialog box to inform that the user is about to leave the current page.
	  */

	cannotLeave: function()
	{
		this._canLeave = false;
	},

	/*-----------------------------------------------------------------*/
	/* MESSAGES                                                        */
	/*-----------------------------------------------------------------*/

	_publishAlert: function(html, fadeOut, target)
	{
		/*---------------------------------------------------------*/

		const el = $(target || '#ami_alert_content');

		/*---------------------------------------------------------*/

		el.html(html).promise().done(() => {

			$(document).scrollTop(0);

			this.unlock();

			if(fadeOut)
			{
				el.find('.alert').fadeOut(60000);
			}
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Show an 'info' message
	  * @param {String} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  * @param {String} [id=null] the target id
	  */

	info: function(message, fadeOut, target)
	{
		if(this.typeOf(message) === 'Array')
		{
			message = message.join('. ');
		}

		this._publishAlert('<div class="alert alert-info alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span>&times;</span><span class="sr-only">Close</span></button><strong>Info!</strong> ' + this.textToHtml(message) + '</div>', fadeOut, target);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Show a 'success' message
	  * @param {String} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  * @param {String} [id=null] the target id
	  */

	success: function(message, fadeOut, target)
	{
		if(this.typeOf(message) === 'Array')
		{
			message = message.join('. ');
		}

		this._publishAlert('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span>&times;</span><span class="sr-only">Close</span></button><strong>Success!</strong> ' + this.textToHtml(message) + '</div>', fadeOut, target);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Show a 'warning' message
	  * @param {String} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  * @param {String} [id=null] the target id
	  */

	warning: function(message, fadeOut, target)
	{
		if(this.typeOf(message) === 'Array')
		{
			message = message.join('. ');
		}

		this._publishAlert('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span>&times;</span><span class="sr-only">Close</span></button><strong>Warning!</strong> ' + this.textToHtml(message) + '</div>', fadeOut, target);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Show an 'error' message
	  * @param {String} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  * @param {String} [id=null] the target id
	  */

	error: function(message, fadeOut, target)
	{
		if(this.typeOf(message) === 'Array')
		{
			message = message.join('. ');
		}

		this._publishAlert('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span>&times;</span><span class="sr-only">Close</span></button><strong>Error!</strong> ' + this.textToHtml(message) + '</div>', fadeOut, target);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Flush messages
	  */

	flush: function()
	{
		$('#ami_alert_content').empty();
	},

	/*-----------------------------------------------------------------*/
	/* WEB APPLICATION                                                 */
	/*-----------------------------------------------------------------*/

	/**
	  * This method must be overloaded and is called when the web application starts
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

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

	/**
	  * Starts the web application
	  * @param {Object} [settings] dictionary of settings (logo_url, home_url, contact_email, about_url, theme_url, locker_url)
	  */

	start: function(settings)
	{
		/*---------------------------------------------------------*/

		let logo_url = this.originURL
					+ '/images/logo.png';
		let home_url = this.webAppURL;

		let contact_email = 'ami@lpsc.in2p3.fr';
		let about_url = 'http://cern.ch/ami/';

		let theme_url = this.originURL + '/twig/AMI/Theme/blue.twig';
		let locker_url = this.originURL + '/twig/AMI/Fragment/locker.twig';

		let endpoint_url = this.originURL + '/AMI/FrontEnd';

		/*---------------------------------------------------------*/

		if(settings)
		{
			if('logo_url' in settings) {
				logo_url = settings['logo_url'];
			}

			if('home_url' in settings) {
				home_url = settings['home_url'];
			}

			if('contact_email' in settings) {
				contact_email = settings['contact_email'];
			}

			if('about_url' in settings) {
				about_url = settings['about_url'];
			}

			if('theme_url' in settings) {
				theme_url = settings['theme_url'];
			}

			if('locker_url' in settings) {
				locker_url = settings['locker_url'];
			}

			if('endpoint_url' in settings) {
				endpoint_url = settings['endpoint_url'];
			}
		}

		/*---------------------------------------------------------*/

		amiCommand.endpoint = endpoint_url;

		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/

		const controls_url = this.originURL + '/controls/CONTROLS.json';

		const subapps_url = this.originURL + '/subapps/SUBAPPS.json';

		/*---------------------------------------------------------*/

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
					/*---------------------------------*/

					const dict = {
						LOGO_URL: logo_url,
						HOME_URL: home_url,
						CONTACT_EMAIL: contact_email,
						ABOUT_URL: about_url,
					};

					/*---------------------------------*/

					$.ajax({url: theme_url, cache: true, crossDomain: true, dataType: 'text'}).then((data3) => {

						$.ajax({url: locker_url, cache: true, crossDomain: true, dataType: 'text'}).then((data4) => {

							$('body').append(this.formatTWIG(data3, dict) + data4).promise().done(() => {

								amiLogin._init().fail((data5) => {

									this.error(data5);
								});
							});

						}, () => {

							alert('could not open `' + locker_url + '`, please reload the page...'); // eslint-disable-line no-alert
						});

					}, () => {

						alert('could not open `' + theme_url + '`, please reload the page...'); // eslint-disable-line no-alert
					});

					/*---------------------------------*/
				}
				else
				{
					/*---------------------------------*/

					$.ajax({url: locker_url, cache: true, crossDomain: true, dataType: 'text'}).done((data3) => {

						$('body').append(data3).promise().done(() => {

							amiLogin._init().fail((data4) => {

								this.error(data4);
							});
						});
					});

					/*---------------------------------*/
				}

			}, () => {

				alert('could not open `' + subapps_url + '`, please reload the page...'); // eslint-disable-line no-alert
			});

		}, () => {

			alert('could not open `' + controls_url + '`, please reload the page...'); // eslint-disable-line no-alert
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
	/* CONTROLS                                                        */
	/*-----------------------------------------------------------------*/

	_loadControls: function(deferred, result, controls, context)
	{
		if(controls.length === 0)
		{
			return deferred.resolveWith(context || deferred, [result]);
		}

		/*---------------------------------------------------------*/

		const name = controls.shift();

		const descr = this._controls[name.toLowerCase()];

		/*---------------------------------------------------------*/

		if(descr)
		{
			this.loadScripts(this.originURL + '/' + descr.file).then((loaded) => {

				try
				{
					const clazz = window[
						descr.clazz
					];

					const promise = loaded[0] ? clazz.prototype.onReady.apply(clazz.prototype)
					                          : /*-----------------*/null/*-----------------*/
					;

					_ami_internal_then(promise, () => {

						result.push(clazz);

						this._loadControls(deferred, result, controls, context);

					}, () => {

						deferred.rejectWith(context || deferred, ['could not load control `' + name + '`']);
					});
				}
				catch(e)
				{
					deferred.rejectWith(context || deferred, ['could not load control `' + name + '`']);
				}

			}, () => {

				deferred.rejectWith(context || deferred, ['could not load control `' + name + '`']);
			});
		}
		else
		{
			deferred.rejectWith(context || deferred, ['could not load control `' + name + '`']);
		}

		/*---------------------------------------------------------*/

		return deferred;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Loads controls asynchronously
	  * @param {(Array|String)} controls the array of control names
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadControls: function(controls, settings)
	{
		let context = null;

		if(settings && 'context' in settings)
		{
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		if(this.typeOf(controls) !== 'Array')
		{
			controls = [controls];
		}

		/*---------------------------------------------------------*/

		return this._loadControls($.Deferred(), [], controls, context).promise();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
	/* SUBAPPS                                                         */
	/*-----------------------------------------------------------------*/

	triggerLogin: function()
	{
		const result = this._currentSubAppInstance.onLogin(this.args['userdata']);

		this.onRefresh(true);

		return result;
	},

	/*-----------------------------------------------------------------*/

	triggerLogout: function()
	{
		const result = this._currentSubAppInstance.onLogout(this.args['userdata']);

		this.onRefresh(false);

		return result;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Loads a sub-application
	  * @param {String} defaultSubApp the default sub-application name, if null, 'amiWebApp.args["subapp"]'
	  * @param {?} [defaultUserData] the default user data, if null, 'amiWebApp.args["userdata"]'
	  */

	loadSubApp: function(defaultSubApp, defaultUserData)
	{
		const subapp = this.args['subapp'] || defaultSubApp;
		const userdata = this.args['userdata'] || defaultUserData;

		const descr = this._subapps[subapp.toLowerCase()];

		if(descr)
		{
			this.loadScripts(this.originURL + '/' + descr.file).then((loaded) => {

				try
				{
					const instance = window[
						descr.instance
					];

					/**/

					this._currentSubAppInstance.onExit(userdata);

					this._currentSubAppInstance = instance;

					/**/

					setTimeout(() => {

						if($('#ami_main_content').is(':empty'))
						{
							this.error('service temporarily unreachable, please reload the page...');
						}

					}, 10000);

					/**/

					this.lock();

					const promise = loaded[0] ? instance.onReady(userdata)
					                          : /*-------*/null/*-------*/
					;

					_ami_internal_then(promise, () => {

						const promise = amiLogin.isAuthenticated() ? this.triggerLogin()
						                                           : this.triggerLogout()
						;

						_ami_internal_then(promise, () => {

							this.unlock();

						}, () => {

							this.error('could not load sub-application `' + subapp + '`');
						});

					}, () => {

						this.error('could not load sub-application `' + subapp + '`');
					});
				}
				catch(e)
				{
					this.error('could not load sub-application `' + subapp + '`');
				}

			}, () => {

				this.error('could not load sub-application `' + subapp + '`');
			});
		}
		else
		{
			this.error('could not load sub-application `' + subapp + '`');
		}
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/

/*!
 * AMI Web Framework - AMIInterface.js
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* ami.IControl                                                            */
/*-------------------------------------------------------------------------*/

/**
 * The AMI control interface
 * @interface ami/IControl
 */

$AMIInterface('ami.IControl', /** @lends ami/IControl# */ {
	/*-----------------------------------------------------------------*/

	/**
	  * Patch an HTML identifier
	  * @param {String} id the unpatched HTML identifier
	  * @returns {String} The patched HTML identifier
	  */

	patchId: function() {},

	/*-----------------------------------------------------------------*/

	/**
	  * Put a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	replaceHTML: function() {},

	/*-----------------------------------------------------------------*/

	/**
	  * Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	prependHTML: function() {},

	/*-----------------------------------------------------------------*/

	/**
	  * Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	appendHTML: function() {},

	/*-----------------------------------------------------------------*/

	/**
	  * Called when the control is ready to run
	  */

	onReady: function() {},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* ami.ISubApp                                                             */
/*-------------------------------------------------------------------------*/

/**
 * The AMI sub-application interface
 * @interface ami/ISubApp
 */

$AMIInterface('ami.ISubApp', /** @lends ami/ISubApp# */ {
	/*-----------------------------------------------------------------*/

	/**
	  * Called when the sub-application is ready to run
	  * @param {?} userdata userdata
	  */

	onReady: function() {},

	/*-----------------------------------------------------------------*/

	/**
	  * Called when the sub-application is about to exit
	  * @param {?} userdata userdata
	  */

	onExit: function() {},

	/*-----------------------------------------------------------------*/

	/**
	  * Called when logging in
	  * @param {?} userdata userdata
	  */

	onLogin: function() {},

	/*-----------------------------------------------------------------*/

	/**
	  * Called when logging out
	  * @param {?} userdata userdata
	  */

	onLogout: function() {},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* ami.Control                                                             */
/*-------------------------------------------------------------------------*/

/**
 * The basic AMI control
 * @class ami/Control
 * @implements {ami/IControl}
 */

$AMIClass('ami.Control', /** @lends ami/Control# */ {
	/*-----------------------------------------------------------------*/

	$implements: [ami.IControl],

	/*-----------------------------------------------------------------*/

	$: function()
	{
		ami.Control.instanceCnt = 1;
	},

	/*-----------------------------------------------------------------*/

	$init: function()
	{
		this.instanceSuffix = ami.Control.instanceCnt++;
	},

	/*-----------------------------------------------------------------*/

	patchId: function(identifier)
	{
		return identifier + '_instance' + this.instanceSuffix;
	},

	/*-----------------------------------------------------------------*/

	replaceHTML: function(selector, twig, settings)
	{
		if(!settings)
		{
			settings = {};
		}

		settings.suffix = this.instanceSuffix;

		return amiWebApp.replaceHTML(selector, twig, settings);
	},

	/*-----------------------------------------------------------------*/

	prependHTML: function(selector, twig, settings)
	{
		if(!settings)
		{
			settings = {};
		}

		settings.suffix = this.instanceSuffix;

		return amiWebApp.prependHTML(selector, twig, settings);
	},

	/*-----------------------------------------------------------------*/

	appendHTML: function(selector, twig, settings)
	{
		if(!settings)
		{
			settings = {};
		}

		settings.suffix = this.instanceSuffix;

		return amiWebApp.appendHTML(selector, twig, settings);
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* ami.SubApp                                                              */
/*-------------------------------------------------------------------------*/

/**
 * The basic AMI sub-application
 * @class ami/SubApp
 * @implements {ami/ISubApp}
 */

$AMIClass('ami.SubApp', /** @lends ami/SubApp# */ {
	/*-----------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*-----------------------------------------------------------------*/

	onExit: function() {},

	/*-----------------------------------------------------------------*/

	onLogin: function() {},

	/*-----------------------------------------------------------------*/

	onLogout: function() {},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/

/*!
 * AMI Web Framework - AMICommand.js
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiCommand                                                              */
/*-------------------------------------------------------------------------*/

/**
 * The AMI command subsystem
 * @namespace amiCommand
 */

$AMINamespace('amiCommand', /** @lends amiCommand */ {
	/*-----------------------------------------------------------------*/
	/* PUBLIC MEMBERS                                                  */
	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/
	/* PRIVATE METHODS                                                 */
	/*-----------------------------------------------------------------*/

	_textToString: function(s)
	{
		return (s || '').replace(/[\\'"]/g, function(x) {

			return '\\' + x;
		});
	},

	/*-----------------------------------------------------------------*/
	/* PUBLIC METHODS                                                  */
	/*-----------------------------------------------------------------*/

	/**
	  * Execute an AMI command
	  * @param {String} command the command
	  * @param {Object} [settings] dictionary of settings (context, endpoint, converter, extraParam, extraValue)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	execute: function(command, settings)
	{
		let endpoint = this.endpoint;
		let converter = this.converter;
		let context = null;
		let timeout = 0x00;
		let extraParam = null;
		let extraValue = null;

		if(settings)
		{
			if('endpoint' in settings) {
				endpoint = settings['endpoint'];
			}

			if('converter' in settings) {
				converter = settings['converter'];
			}

			if('context' in settings) {
				context = settings['context'];
			}

			if('timeout' in settings) {
				timeout = settings['timeout'];
			}

			if('extraParam' in settings) {
				extraParam = settings['extraParam'];
			}

			if('extraValue' in settings) {
				extraValue = settings['extraValue'];
			}
		}

		/*---------------------------------------------------------*/

		const URL = endpoint.trim();
		const COMMAND = command.trim();
		const CONVERTER = converter.trim();

		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/

		const urlWithParameters = URL + '?' + $.param(data);

		/*---------------------------------------------------------*/

		const result = $.Deferred();

		/*---------------------------------------------------------*/

		if(CONVERTER === 'AMIXmlToJson.xsl')
		{
			/*-------------------------------------------------*/
			/* JSON FORMAT                                     */
			/*-------------------------------------------------*/

			$.ajax({
				url: URL,
				data: data,
				type: 'POST',
				timeout: timeout,
				dataType: 'json',
				xhrFields: {
					withCredentials: true
				},
				success: function(data) {

					const error = JSPath.apply('.AMIMessage.error', data);

					if(error.length === 0)
					{
						result.resolveWith(context || result, [data, urlWithParameters]);
					}
					else
					{
						result.rejectWith(context || result, [data, urlWithParameters]);
					}
				},
				error: function(jqXHR, textStatus) {

					if(textStatus === 'error')
					{
						textStatus = 'service temporarily unreachable';
					}

					const data = {'AMIMessage': [{'error': [{'$': textStatus}]}]};

					result.rejectWith(context || result, [data, urlWithParameters]);
				},
			});

			/*-------------------------------------------------*/
		} else {
			/*-------------------------------------------------*/
			/* OTHER FORMATS                                   */
			/*-------------------------------------------------*/

			$.ajax({
				url: URL,
				data: data,
				type: 'POST',
				timeout: timeout,
				dataType: 'text',
				xhrFields: {
					withCredentials: true
				},
				success: function(data) {

					result.resolveWith(context || result, [data, urlWithParameters]);
				},
				error: function(jqXHR, textStatus) {

					if(textStatus === 'error')
					{
						textStatus = 'service temporarily unreachable';
					}

					result.rejectWith(context || result, [textStatus, urlWithParameters]);
				},
			});

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/

		return result.promise();
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Login by login/password
	  * @param {String} user the user
	  * @param {String} pass the password
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	passLogin: function(user, pass, settings)
	{
		let context = null;

		if(settings && 'context' in settings)
		{
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		const result = $.Deferred();

		/*---------------------------------------------------------*/

		this.execute('GetSessionInfo -AMIUser="' + this._textToString(user) + '" -AMIPass="' + this._textToString(pass) + '"', {extraParam: 'NoCert'}).then((data) => {

			const userInfo = {};
			const roleInfo = {};
			const ssoInfo = {}

			JSPath.apply('..rowset{.@type==="user"}.row.field', data).forEach((item) => {

				userInfo[item['@name']] = item['$'];
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

			result.resolveWith(context || result, [data, userInfo, roleInfo, ssoInfo]);

		}, (data) => {

			result.rejectWith(context || result, [data, {AMIUser: 'guest', guestUser: 'guest'}, {}, '']);
		});

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Login by certificate
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	certLogin: function(settings)
	{
		let context = null;

		if(settings && 'context' in settings)
		{
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		const result = $.Deferred();

		/*---------------------------------------------------------*/

		this.execute('GetSessionInfo').then((data) => {

			const userInfo = {};
			const roleInfo = {};
			const ssoInfo = {}

			JSPath.apply('..rowset{.@type==="user"}.row.field', data).forEach((item) => {

				userInfo[item['@name']] = item['$'];
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

			result.resolveWith(context || result, [data, userInfo, roleInfo, ssoInfo]);

		}, (data) => {

			result.rejectWith(context || result, [data, {AMIUser: 'guest', guestUser: 'guest'}, {}, '']);
		});

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Logout
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	logout: function(settings)
	{
		let context = null;

		if(settings && 'context' in settings)
		{
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		const result = $.Deferred();

		/*---------------------------------------------------------*/

		this.execute('GetSessionInfo -AMIUser="" -AMIPass=""', {extraParam: 'NoCert'}).then((data) => {

			const userInfo = {};
			const roleInfo = {};
			const ssoInfo = {}

			JSPath.apply('..rowset{.@type==="user"}.row.field', data).forEach((item) => {

				userInfo[item['@name']] = item['$'];
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

			result.resolveWith(context || result, [data, userInfo, roleInfo, ssoInfo]);

		}, (data) => {

			result.rejectWith(context || result, [data, {AMIUser: 'guest', guestUser: 'guest'}, {}, '']);
		});

		/*---------------------------------------------------------*/

		return result;

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Attach a certificate
	  * @param {String} user the user
	  * @param {String} pass the password
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	attachCert: function(user, pass, settings)
	{
		return this.execute('GetSessionInfo -attachCert -amiLogin="' + this._textToString(user) + '" -amiPassword="' + this._textToString(pass) + '"', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Detach a certificate
	  * @param {String} user the user
	  * @param {String} pass the password
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	detachCert: function(user, pass, settings)
	{
		return this.execute('GetSessionInfo -detachCert -amiLogin="' + this._textToString(user) + '" -amiPassword="' + this._textToString(pass) + '"', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Add a new user
	  * @param {String} user the user
	  * @param {String} pass the password
	  * @param {String} firstName the first name
	  * @param {String} lastName the last name
	  * @param {String} email the email
	  * @param {Boolean} attach attach the current certificate
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	addUser: function(user, pass, firstName, lastName, email, attach, settings)
	{
		return this.execute('AddUser -amiLogin="' + this._textToString(user) + '" -amiPassword="' + this._textToString(pass) + '" -firstName="' + this._textToString(firstName) + '" -lastName="' + this._textToString(lastName) + '" -email="' + this._textToString(email) + '"' + (attach ? ' -attach' : ''), settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Change the account information
	  * @param {String} firstName the first name
	  * @param {String} lastName the last name
	  * @param {String} email the email
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	changeInfo: function(firstName, lastName, email, settings)
	{
		return this.execute('SetUserInfo -firstName="' + this._textToString(firstName) + '" -lastName="' + this._textToString(lastName) + '" -email="' + this._textToString(email) + '"', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Change the account password
	  * @param {String} oldPass the old password
	  * @param {String} newPass the new password
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	changePass: function(oldPass, newPass, settings)
	{
		return this.execute('ChangePassword -amiPasswordOld="' + this._textToString(oldPass) + '" -amiPasswordNew="' + this._textToString(newPass) + '"', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Reset the account password
	  * @param {String} user the user
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	resetPass: function(user, settings)
	{
		return this.execute('ResetPassword -amiLogin="' + this._textToString(user) + '"', settings);
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/

/*!
 * AMI Web Framework - AMILogin.js
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiLogin                                                                */
/*-------------------------------------------------------------------------*/

/**
 * The AMI authentication subsystem
 * @namespace amiLogin
 */

$AMINamespace('amiLogin', /** @lends amiLogin */ {
	/*-----------------------------------------------------------------*/
	/* PUBLIC MEMBERS                                                  */
	/*-----------------------------------------------------------------*/

	user: 'guest',
	guest: 'guest',

	clientDN: '',
	issuerDN: '',

	/*-----------------------------------------------------------------*/

	roleInfo: {},
	ssoInfo: {},

	/*-----------------------------------------------------------------*/
	/* PRIVATE METHODS                                                 */
	/*-----------------------------------------------------------------*/

	_init: function()
	{
		amiWebApp.lock();

		return amiWebApp.loadHTMLs([
			amiWebApp.originURL + '/twig/AMI/Fragment/login_button.twig',
			amiWebApp.originURL + '/twig/AMI/Fragment/logout_button.twig',
			amiWebApp.originURL + '/twig/AMI/Modal/login.twig',
		]).done((data) => {

			/*-------------------------------------------------*/

			this.fragmentLoginButton = data[0];
			this.fragmentLogoutButton = data[1];

			amiWebApp.appendHTML('body', data[2]);

			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/

			$(window).on('message', (e) => {

				const user = e.originalEvent.data.user;
				const pass = e.originalEvent.data.pass;

				if(user && pass)
				{
					this.form_login2(user, pass);

					e.originalEvent.source.close();
				}
			});

			/*-------------------------------------------------*/

			var xxxxxxxxxxxxxxxx = amiWebApp.args['userdata'] || '';

			/*-------------------------------------------------*/

			amiCommand.certLogin().always((data, userInfo, roleInfo, ssoInfo) => {

				_ami_internal_then(amiWebApp.onReady(xxxxxxxxxxxxxxxx), () => {

					this._update(userInfo, roleInfo, ssoInfo).always(() => {

						amiWebApp.unlock();
					});

				}, (data) => {

					amiWebApp.error(data);
				});
			});

			/*-------------------------------------------------*/
		});
	},

	/*-----------------------------------------------------------------*/

	_showSuccessMessage1: function(message)
	{
		amiWebApp.success(message, true, '#C0D13C0C_BA64_4A79_BF48_1A35F26D19AC');
		this._clean();
	},

	_showErrorMessage1: function(message)
	{
		amiWebApp.error(message, true, '#C0D13C0C_BA64_4A79_BF48_1A35F26D19AC');
		this._clean();
	},

	/*-----------------------------------------------------------------*/

	_showSuccessMessage2: function(message)
	{
		amiWebApp.success(message, true, '#C76F40DA_0480_4D3F_A74B_65735465EA25');
		this._clean();
	},

	_showErrorMessage2: function(message)
	{
		amiWebApp.error(message, true, '#C76F40DA_0480_4D3F_A74B_65735465EA25');
		this._clean();
	},

	/*-----------------------------------------------------------------*/

	_showSuccessMessage3: function(message)
	{
		amiWebApp.success(message, true, '#F14D98EC_5751_4C15_B4A1_927BA76AFCA6');
		this._clean();
	},

	_showErrorMessage3: function(message)
	{
		amiWebApp.error(message, true, '#F14D98EC_5751_4C15_B4A1_927BA76AFCA6');
		this._clean();
	},

	/*-----------------------------------------------------------------*/

	_flush: function()
	{
		$('#C0D13C0C_BA64_4A79_BF48_1A35F26D19AC').empty();
		$('#C76F40DA_0480_4D3F_A74B_65735465EA25').empty();
		$('#F14D98EC_5751_4C15_B4A1_927BA76AFCA6').empty();
	},

	/*-----------------------------------------------------------------*/

	_clean: function()
	{
		$('#A4DFD039_034F_4D10_9668_385AEF4FBBB9').val('');
		$('#E6E30EEC_15EE_4FCF_9809_2B8EC2FEF388').val('');
		$('#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').val('');
		$('#F238E6EE_44BD_486A_B85D_C927A4D045D3').val('');
		$('#D487FE72_8D95_4048_BEA3_252274862AF4').val('');
		$('#EE1DA58C_3761_4734_A9C2_E808CDD7EE77').val('');
	},

	/*-----------------------------------------------------------------*/

	_update: function(userInfo, roleInfo, ssoInfo)
	{
		const result = $.Deferred();

		/*---------------------------------------------------------*/

		const user = this.user = userInfo.AMIUser || '';
		const guest = this.guest = userInfo.guestUser || '';

		const clientDNInSession = this.clientDN = userInfo.clientDNInSession || '';
		const issuerDNInSession = this.issuerDN = userInfo.issuerDNInSession || '';

		$('#A09AE316_7068_4BC1_96A9_6B87D28863FE').prop('disabled', !clientDNInSession || !issuerDNInSession);

		/*---------------------------------------------------------*/

		this.roleInfo = roleInfo;

		this.ssoInfo = ssoInfo;

		/*---------------------------------------------------------*/

		const dict = {
			sso_name: ssoInfo.name || 'SSO',
			sso_url: ssoInfo.url || 'N/A',
		};

		if(user !== guest)
		{
			/*-------------------------------------------------*/
			/* GET INFO                                        */
			/*-------------------------------------------------*/

			const valid = userInfo.valid || 'false';
			const certEnabled = userInfo.certEnabled || 'false';
			const vomsEnabled = userInfo.vomsEnabled || 'false';

			/*-------------------------------------------------*/

			const firstName = userInfo.firstName || '';
			const lastName = userInfo.lastName || '';
			const email = userInfo.email || '';

			/*-------------------------------------------------*/

			const clientDNInAMI = userInfo.clientDNInAMI || '';
			const issuerDNInAMI = userInfo.issuerDNInAMI || '';

			/*-------------------------------------------------*/
			/* SET INFO                                        */
			/*-------------------------------------------------*/

			$('#E513F27D_5521_4B08_BF61_52AFB81356F7').val(firstName);
			$('#AFF0B5C0_BEEC_4842_916D_DCBA7F589195').val(lastName);
			$('#C587486B_62C0_4B6E_9288_D8F9F89D157B').val(email);

			/*-------------------------------------------------*/

			$('#ABEB0291_40B0_414A_A42B_E7EABB9B487E').val(firstName);
			$('#A5AFDB62_1034_4F66_A3E6_9341B31FA290').val(lastName);
			$('#D730A774_05EA_47AB_A0C8_D92753802E3E').val(email);

			/*-------------------------------------------------*/

			$('#D1BEE3BF_9161_41DC_BC53_C44FFE4D2522').val(clientDNInAMI);
			$('#C76805D7_1E86_4231_9071_1D04783423BB').val(clientDNInSession);
			$('#F42FAF6B_2C8D_4142_8BD9_E5BCDCAA05AA').val(issuerDNInAMI);
			$('#FE2F6232_C256_4B80_939C_EBEC90320308').val(issuerDNInSession);

			/*-------------------------------------------------*/

			$('#C587486B_62C0_4B6E_9288_D8F9F89D157B').prop('disabled', vomsEnabled !== 'false');

			/*-------------------------------------------------*/
			/* CHECK USER STATUS                               */
			/*-------------------------------------------------*/

			let color = '';
			let message = '';

			if(valid !== 'false')
			{
				/*-----------------------------------------*/
				/* VALID USER                              */
				/*-----------------------------------------*/

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

				$('#D944B01D_2E8D_4EE9_9DCC_2691438BBA16').html(
					message ? '<span class="fa fa-exclamation-triangle" style="color: orange;"></span> ' + message : ''
				);

				$('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').parent().css('background', 'url("images/account-green.png") center center');
				$('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').css('color', '#006400');
				$('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').text('❧ valid ❧');

				color = 'orange';

				/*-----------------------------------------*/
			}
			else
			{
				/*-----------------------------------------*/
				/* INVALID USER                            */
				/*-----------------------------------------*/

				if(vomsEnabled !== 'false')
				{
					if(!clientDNInAMI
					   ||
					   !issuerDNInAMI
					 ) {
						message = 'Register a valid GRID certificate.';
					}
					else
					{
						message = 'Check your VOMS roles.';
					}
				}
				else
				{
					message = 'Contact the AMI team.';
				}

				$('#D944B01D_2E8D_4EE9_9DCC_2691438BBA16').html(
					message ? '<span class="fa fa-exclamation-triangle" style="color: red;"></span> ' + message : ''
				);

				$('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').parent().css('background', 'url("images/account-pink.png") center center');
				$('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').css('color', '#8B0000');
				$('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').text('❧ invalid ❧');

				color = 'red';

				/*-----------------------------------------*/
			}

			/*-------------------------------------------------*/
			/* UPDATE NOTIFICATION BAR                         */
			/*-------------------------------------------------*/

			const icon = message ? '<a href="javascript:amiLogin.accountStatus();" style="color: ' + color + ';">'
			                       +
			                       '<i class="fa fa-exclamation-triangle"></i>'
			                       +
			                       '</a>'
			                     : ''
			;

			/*-------------------------------------------------*/
			/* UPDATE MENU BAR                                 */
			/*-------------------------------------------------*/

			dict['user'] = user;
			dict['icon'] = icon;

			/*-------------------------------------------------*/

			_ami_internal_always(amiWebApp.triggerLogin(), () => {

				amiWebApp.replaceHTML('#ami_login_content', this.fragmentLogoutButton, {dict: dict});

				result.resolve();
			});

			/*-------------------------------------------------*/
		}
		else
		{
			/*-------------------------------------------------*/

			_ami_internal_always(amiWebApp.triggerLogout(), () => {

				result.resolve();

				amiWebApp.replaceHTML('#ami_login_content', this.fragmentLoginButton, {dict: dict});
			});

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/

		return result.promise();
	},

	/*-----------------------------------------------------------------*/
	/* PUBLIC METHODS                                                  */
	/*-----------------------------------------------------------------*/

	/**
	  * The current user
	  * @returns {String} The current user
	  */

	getUser: function()
	{
		return this.user;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * The guest user
	  * @returns {String} The guest user
	  */

	getGuest: function()
	{
		return this.guest;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * The client DN
	  * @returns {String} The client DN
	  */

	getClientDN: function()
	{
		return this.clientDN;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * The issuer DN
	  * @returns {String} The issuer DN
	  */

	getIssuerDN: function()
	{
		return this.issuerDN;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Check whether the user is authenticated
	  * @returns {Boolean}
	  */

	isAuthenticated: function()
	{
		return this.user !== this.guest;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'SSO' modal form
	  */

	sso: function()
	{
		this._flush();
		this._clean();

		window.open(this.ssoInfo.url + '?originURL=' + encodeURIComponent(amiWebApp.originURL), 'Single Sign-On', 'menubar=no, status=no, scrollbars=no, width=800, height=450');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'SignIn' modal form
	  */

	signIn: function()
	{
		this._flush();
		this._clean();

		$('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('show');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'Change Info' modal form
	  */

	changeInfo: function()
	{
		this._flush();
		this._clean();

		$('#D9EAF998_ED8E_44D2_A0BE_8C5CF5E438BD').modal('show');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'Change Password' modal form
	  */

	changePass: function()
	{
		this._flush();
		this._clean();

		$('#E92A1097_983B_4857_875F_07E4659B41B0').modal('show');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'Account Status' modal form
	  */

	accountStatus: function()
	{
		this._flush();
		this._clean();

		$('#AB1CB183_96EB_4116_8A9E_4409BE058F34').modal('show');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Sign out
	  */

	signOut: function()
	{
		amiWebApp.lock();

		return amiCommand.logout().always((data, userInfo, roleInfo, ssoInfo) => {

			this._update(userInfo, roleInfo, ssoInfo).done(() => {

				this._clean();
				amiWebApp.unlock();
			});
		});
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Check if the user has the given role
	  * @param {String} role the role
	  * @returns {Boolean}
	  */

	hasRole: function(roleName)
	{
		return roleName in this.roleInfo;
	},

	/*-----------------------------------------------------------------*/

	_serializeForm: function(form)
	{
		const result = {};

		form.serializeArray().forEach(function(item) {

			result[item.name.trim()] = item.value.trim();
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	form_login: function(e)
	{
		e.preventDefault();

		const values = this._serializeForm($(e.target));

		return this.form_login2(values['user'], values['pass']);
	},

	/*-----------------------------------------------------------------*/

	form_login2: function(user, pass)
	{
		/*---------------------------------------------------------*/

		const deferred = (user && pass) ? amiCommand.passLogin(user, pass)
		                                : amiCommand.certLogin(/*------*/)
		;

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		deferred.then((data, userInfo, roleInfo, ssoInfo) => {

			this._update(userInfo, roleInfo, ssoInfo).done(() => {

				if(userInfo.AMIUser !== userInfo.guestUser)
				{
					$('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('hide');

					this._clean();
					amiWebApp.unlock();
				}
				else
				{
					let error = 'Authentication failed.';

					if(userInfo.clientDNInSession || userInfo.issuerDNInSession)
					{
						error += ' Client DN in session: ' + amiWebApp.textToHtml(userInfo.clientDNInSession) + '.'
						         +
						         ' Issuer DN in session: ' + amiWebApp.textToHtml(userInfo.issuerDNInSession) + '.'
						;
					}

					this._showErrorMessage1(error);
				}
			});

		}, (data, userInfo, roleInfo, ssoInfo) => {

			this._update(userInfo, roleInfo, ssoInfo).done(() => {

				this._showErrorMessage1(amiWebApp.jspath('..error.$', data));
			});
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_attachCert: function()
	{
		/*---------------------------------------------------------*/

		const user = $('#E64F24B2_33E6_4DED_9B24_28BE04219613').val();
		const pass = $('#A4DFD039_034F_4D10_9668_385AEF4FBBB9').val();

		if(!user || !pass)
		{
			this._showErrorMessage1('Please, fill all fields with a red star.');

			return;
		}

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.attachCert(user, pass).then((data) => {

			this._showSuccessMessage1(amiWebApp.jspath('..info.$', data));

		}, (data) => {

			this._showErrorMessage1(amiWebApp.jspath('..error.$', data));
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_detachCert: function()
	{
		/*---------------------------------------------------------*/

		const user = $('#E64F24B2_33E6_4DED_9B24_28BE04219613').val();
		const pass = $('#A4DFD039_034F_4D10_9668_385AEF4FBBB9').val();

		if(!user || !pass)
		{
			this._showErrorMessage1('Please, fill all fields with a red star.');

			return;
		}

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.detachCert(user, pass).then((data) => {

			this._showSuccessMessage1(amiWebApp.jspath('..info.$', data));

		}, (data) => {

			this._showErrorMessage1(amiWebApp.jspath('..error.$', data));
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_addUser: function(e)
	{
		e.preventDefault();

		/*---------------------------------------------------------*/

		const values = this._serializeForm($(e.target));

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.addUser(values['login'], values['pass'], values['first_name'], values['last_name'], values['email'], 'attach' in values).then((data) => {

			this._showSuccessMessage1(amiWebApp.jspath('..info.$', data));

		}, (data) => {

			this._showErrorMessage1(amiWebApp.jspath('..error.$', data));
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_remindPass: function(e)
	{
		e.preventDefault();

		/*---------------------------------------------------------*/

		const values = this._serializeForm($(e.target));

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.resetPass(values['user']).then((data) => {

			this._showSuccessMessage1(amiWebApp.jspath('..info.$', data));

		}, (data) => {

			this._showErrorMessage1(amiWebApp.jspath('..error.$', data));
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_changeInfo: function(e)
	{
		e.preventDefault();

		/*---------------------------------------------------------*/

		const values = this._serializeForm($(e.target));

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.changeInfo(values['first_name'], values['last_name'], values['email']).then((data) => {

			this._showSuccessMessage2(amiWebApp.jspath('..info.$', data));

		}, (data) => {

			this._showErrorMessage2(amiWebApp.jspath('..error.$', data));
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_changePass: function(e)
	{
		e.preventDefault();

		/*---------------------------------------------------------*/

		const values = this._serializeForm($(e.target));

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.changePass(values['old_pass'], values['new_pass']).then((data) => {

			this._showSuccessMessage3(amiWebApp.jspath('..info.$', data));

		}, (data) => {

			this._showErrorMessage3(amiWebApp.jspath('..error.$', data));
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/

/*!
 * AMI Web Framework - AMIDoc.js
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/

/* eslint-disable */

var amiDoc = {"functions":[{"name":"$AMINamespace","desc":"/*-------------------------------------------------------------------------","params":[]},{"name":"$AMIInterface","desc":"/*-------------------------------------------------------------------------","params":[]},{"name":"$AMIClass","desc":"/*-------------------------------------------------------------------------","params":[]}],"namespaces":[{"name":"amiWebApp","desc":"The AMI webapp subsystem","variables":[{"name":"originURL","type":"String","desc":"Origin URL"},{"name":"webAppURL","type":"String","desc":"WebApp URL"},{"name":"args","type":"Array.<String>","desc":"URL arguments"}],"functions":[{"name":"$","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"isEmbedded","desc":"Check whether the WebApp is executed in embedded mode","params":[],"returns":[{"type":"Boolean","desc":""}]},{"name":"isLocal","desc":"Check whether the WebApp is executed locally (file://, localhost or 127.0.0.1)","params":[],"returns":[{"type":"Boolean","desc":""}]},{"name":"typeOf","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"asArray","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"textToHtml","desc":"Escapes the given string from text to HTML","params":[{"name":"string","type":"String","desc":"the unescaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The escaped string"}]},{"name":"htmlToText","desc":"Unescapes the given string from HTML to text","params":[{"name":"string","type":"String","desc":"the escaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The unescaped string"}]},{"name":"textToString","desc":"Escapes the given string from text to JavaScript string","params":[{"name":"string","type":"String","desc":"the unescaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The escaped string"}]},{"name":"stringToText","desc":"Unescapes the given string from JavaScript string to text","params":[{"name":"string","type":"String","desc":"the escaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The unescaped string"}]},{"name":"htmlToString","desc":"Escapes the given string from HTML to JavaScript string","params":[{"name":"string","type":"String","desc":"the unescaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The escaped string"}]},{"name":"stringToHtml","desc":"Unescapes the given string from JavaScript string to HTML","params":[{"name":"string","type":"String","desc":"the escaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The unescaped string"}]},{"name":"base64Encode","desc":"Encodes (RFC 4648) a string","params":[{"name":"string","type":"String","desc":"the decoded string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The encoded string"}]},{"name":"base64Decode","desc":"Decodes (RFC 4648) a string","params":[{"name":"string","type":"String","desc":"the encoded string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The decoded string"}]},{"name":"loadFiles","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"loadSheets","desc":"Loads CSS sheets asynchronously","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadScripts","desc":"Loads JS scripts asynchronously","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadJSONs","desc":"Loads JSON files asynchronously","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadXMLs","desc":"Loads XML files asynchronously","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadHTMLs","desc":"Loads HTML files asynchronously","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadTWIGs","desc":"Loads TWIG files asynchronously","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadTexts","desc":"Loads text files asynchronously","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"replaceHTML","desc":"Put a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"prependHTML","desc":"Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"appendHTML","desc":"Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"formatTWIG","desc":"Interpretes the given TWIG string, see {@link http://twig.sensiolabs.org/documentation}","params":[{"name":"html","type":"String","desc":"the TWIG string","default":"","optional":"","nullable":""},{"name":"dict","type":"Object","desc":"the dictionary","default":"","optional":true,"nullable":""}],"returns":[{"type":"String","desc":"The Interpreted TWIG string"}]},{"name":"jspath","desc":"Finds data within the given JSON, see {@link https://github.com/dfilatov/jspath}","params":[{"name":"path","type":"String","desc":"the path","default":"","optional":"","nullable":""},{"name":"json","type":"Object","desc":"the JSON","default":"","optional":"","nullable":""}],"returns":[{"type":"Array","desc":"The resulting array"}]},{"name":"lock","desc":"Locks the web application","params":[]},{"name":"unlock","desc":"Unlocks the web application","params":[]},{"name":"canLeave","desc":"Enable the message in a confirmation dialog box to inform that the user is about to leave the current page.","params":[]},{"name":"cannotLeave","desc":"Disable the message in a confirmation dialog box to inform that the user is about to leave the current page.","params":[]},{"name":"info","desc":"Show an 'info' message","params":[{"name":"message","type":"String","desc":"the message","default":"","optional":"","nullable":""},{"name":"fadeOut","type":"Boolean","desc":"if True, the message disappears after 60s","default":"","optional":true,"nullable":""},{"name":"id","type":"String","desc":"the target id","default":"","optional":true,"nullable":""}]},{"name":"success","desc":"Show a 'success' message","params":[{"name":"message","type":"String","desc":"the message","default":"","optional":"","nullable":""},{"name":"fadeOut","type":"Boolean","desc":"if True, the message disappears after 60s","default":"","optional":true,"nullable":""},{"name":"id","type":"String","desc":"the target id","default":"","optional":true,"nullable":""}]},{"name":"warning","desc":"Show a 'warning' message","params":[{"name":"message","type":"String","desc":"the message","default":"","optional":"","nullable":""},{"name":"fadeOut","type":"Boolean","desc":"if True, the message disappears after 60s","default":"","optional":true,"nullable":""},{"name":"id","type":"String","desc":"the target id","default":"","optional":true,"nullable":""}]},{"name":"error","desc":"Show an 'error' message","params":[{"name":"message","type":"String","desc":"the message","default":"","optional":"","nullable":""},{"name":"fadeOut","type":"Boolean","desc":"if True, the message disappears after 60s","default":"","optional":true,"nullable":""},{"name":"id","type":"String","desc":"the target id","default":"","optional":true,"nullable":""}]},{"name":"flush","desc":"Flush messages","params":[]},{"name":"start","desc":"Starts the web application","params":[{"name":"settings","type":"Object","desc":"dictionary of settings (logo_url, home_url, contact_email, about_url, theme_url, locker_url)","default":"","optional":true,"nullable":""}]},{"name":"loadControls","desc":"Loads controls asynchronously","params":[{"name":"controls","type":["Array","String"],"desc":"the array of control names","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"triggerLogin","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"triggerLogout","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"loadSubApp","desc":"Loads a sub-application","params":[{"name":"defaultSubApp","type":"String","desc":"the default sub-application name, if null, 'amiWebApp.args[\"subapp\"]'","default":"","optional":"","nullable":""},{"name":"defaultUserData","type":"?","desc":"the default user data, if null, 'amiWebApp.args[\"userdata\"]'","default":"","optional":true,"nullable":""}]}],"events":[{"name":"onReady","desc":"This method must be overloaded and is called when the web application starts","params":[{"name":"userData","type":"String","desc":"","default":"","optional":"","nullable":""}]},{"name":"onRefresh","desc":"This method must be overloaded and is called when the toolbar needs to be updated","params":[{"name":"isAuth","type":"Boolean","desc":"","default":"","optional":"","nullable":""}]}]},{"name":"amiCommand","desc":"The AMI command subsystem","variables":[{"name":"endpoint","type":"","desc":"/*---------------------------------------------------------"},{"name":"endpoint","type":"String","desc":"Default endpoint"},{"name":"converter","type":"String","desc":"Default converter"}],"functions":[{"name":"execute","desc":"Execute an AMI command","params":[{"name":"command","type":"String","desc":"the command","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, endpoint, converter, extraParam, extraValue)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"passLogin","desc":"Login by login/password","params":[{"name":"user","type":"String","desc":"the user","default":"","optional":"","nullable":""},{"name":"pass","type":"String","desc":"the password","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"certLogin","desc":"Login by certificate","params":[{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"logout","desc":"Logout","params":[{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"attachCert","desc":"Attach a certificate","params":[{"name":"user","type":"String","desc":"the user","default":"","optional":"","nullable":""},{"name":"pass","type":"String","desc":"the password","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"detachCert","desc":"Detach a certificate","params":[{"name":"user","type":"String","desc":"the user","default":"","optional":"","nullable":""},{"name":"pass","type":"String","desc":"the password","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"addUser","desc":"Add a new user","params":[{"name":"user","type":"String","desc":"the user","default":"","optional":"","nullable":""},{"name":"pass","type":"String","desc":"the password","default":"","optional":"","nullable":""},{"name":"firstName","type":"String","desc":"the first name","default":"","optional":"","nullable":""},{"name":"lastName","type":"String","desc":"the last name","default":"","optional":"","nullable":""},{"name":"email","type":"String","desc":"the email","default":"","optional":"","nullable":""},{"name":"attach","type":"Boolean","desc":"attach the current certificate","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"changeInfo","desc":"Change the account information","params":[{"name":"firstName","type":"String","desc":"the first name","default":"","optional":"","nullable":""},{"name":"lastName","type":"String","desc":"the last name","default":"","optional":"","nullable":""},{"name":"email","type":"String","desc":"the email","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"changePass","desc":"Change the account password","params":[{"name":"oldPass","type":"String","desc":"the old password","default":"","optional":"","nullable":""},{"name":"newPass","type":"String","desc":"the new password","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"resetPass","desc":"Reset the account password","params":[{"name":"user","type":"String","desc":"the user","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]}]},{"name":"amiLogin","desc":"The AMI authentication subsystem","variables":[{"name":"user","type":"","desc":"/*-----------------------------------------------------------------"},{"name":"roleInfo","type":"","desc":"/*-----------------------------------------------------------------"}],"functions":[{"name":"getUser","desc":"The current user","params":[],"returns":[{"type":"String","desc":"The current user"}]},{"name":"getGuest","desc":"The guest user","params":[],"returns":[{"type":"String","desc":"The guest user"}]},{"name":"getClientDN","desc":"The client DN","params":[],"returns":[{"type":"String","desc":"The client DN"}]},{"name":"getIssuerDN","desc":"The issuer DN","params":[],"returns":[{"type":"String","desc":"The issuer DN"}]},{"name":"isAuthenticated","desc":"Check whether the user is authenticated","params":[],"returns":[{"type":"Boolean","desc":""}]},{"name":"sso","desc":"Open the 'SSO' modal form","params":[]},{"name":"signIn","desc":"Open the 'SignIn' modal form","params":[]},{"name":"changeInfo","desc":"Open the 'Change Info' modal form","params":[]},{"name":"changePass","desc":"Open the 'Change Password' modal form","params":[]},{"name":"accountStatus","desc":"Open the 'Account Status' modal form","params":[]},{"name":"signOut","desc":"Sign out","params":[]},{"name":"hasRole","desc":"Check if the user has the given role","params":[{"name":"role","type":"String","desc":"the role","default":"","optional":"","nullable":""}],"returns":[{"type":"Boolean","desc":""}]},{"name":"form_login","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"form_login2","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"form_attachCert","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"form_detachCert","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"form_addUser","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"form_remindPass","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"form_changeInfo","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"form_changePass","desc":"/*-----------------------------------------------------------------","params":[]}]}],"interfaces":[{"name":"ami.IControl","desc":"The AMI control interface","implements":[],"inherits":[],"functions":[{"name":"patchId","desc":"Patch an HTML identifier","params":[{"name":"id","type":"String","desc":"the unpatched HTML identifier","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The patched HTML identifier"}]},{"name":"replaceHTML","desc":"Put a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"prependHTML","desc":"Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"appendHTML","desc":"Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"onReady","desc":"Called when the control is ready to run","params":[]}]},{"name":"ami.ISubApp","desc":"The AMI sub-application interface","implements":[],"inherits":[],"functions":[{"name":"onReady","desc":"Called when the sub-application is ready to run","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]},{"name":"onExit","desc":"Called when the sub-application is about to exit","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]},{"name":"onLogin","desc":"Called when logging in","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]},{"name":"onLogout","desc":"Called when logging out","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]}]}],"classes":[{"name":"ami.Control","desc":"The basic AMI control","implements":["ami.IControl"],"inherits":[],"konstructor":{"name":"ami.Control","params":[]},"variables":[{"name":"$implements","type":"","desc":"/*-----------------------------------------------------------------"}],"functions":[{"name":"$","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"$init","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"patchId","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"replaceHTML","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"prependHTML","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"appendHTML","desc":"/*-----------------------------------------------------------------","params":[]}]},{"name":"ami.SubApp","desc":"The basic AMI sub-application","implements":["ami.ISubApp"],"inherits":[],"konstructor":{"name":"ami.SubApp","params":[]},"variables":[{"name":"$implements","type":"","desc":"/*-----------------------------------------------------------------"}],"functions":[{"name":"onExit","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"onLogin","desc":"/*-----------------------------------------------------------------","params":[]},{"name":"onLogout","desc":"/*-----------------------------------------------------------------","params":[]}]}]};

/* eslint-enable */

/*-------------------------------------------------------------------------*/