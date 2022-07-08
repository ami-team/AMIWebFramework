/*!
 * AMI Web Framework (AWF) 2.0.0
 *
 * Copyright (c) 2014-2022 CNRS/LPSC
 *
 * Author: Jérôme Odier (jerome.odier@lpsc.in2p3.fr)
 *
 * Repositories: https://gitlab.in2p3.fr/ami-team/AMIWebFramework/
 *               https://www.github.com/ami-team/AMIWebFramework/
 *
 * This software is a computer program whose purpose is to provide an
 * HTTP / JavaScript framework to the ATLAS Metadata Interface (AMI)
 * ecosystem.
 *
 * This software is governed by the CeCILL-C license under French law and
 * abiding by the rules of distribution of free software. You can use,
 * modify and/or redistribute the software under the terms of the CeCILL-C
 * license as circulated by CEA, CNRS and INRIA at the following URL
 * "http://www.cecill.info".
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL-C license and that you accept its terms.
 *
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 444:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
/*!
 * AMI Twig Engine 1.2.0
 *
 * Copyright © 2014-2022 CNRS/LPSC
 *
 * Author: Jérôme ODIER (jerome.odier@lpsc.in2p3.fr)
 *
 * Repositories: https://gitlab.in2p3.fr/ami-team/AMITwigJS/
 *               https://www.github.com/ami-team/AMITwigJS/
 *
 * This software is a computer program whose purpose is to provide a
 * JavaScript implementation of the SensioLabs's TWIG template engine.
 *
 * This software is governed by the CeCILL-C license under French law and
 * abiding by the rules of distribution of free software. You can use,
 * modify and/or redistribute the software under the terms of the CeCILL-C
 * license as circulated by CEA, CNRS and INRIA at the following URL
 * "http://www.cecill.info".
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL-C license and that you accept its terms.
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig                                                                                                            */
/*--------------------------------------------------------------------------------------------------------------------*/

const amiTwig = {
	version: '1.2.0'
};

/*--------------------------------------------------------------------------------------------------------------------*/

/**/ if( true && typeof module.exports === 'object')
{
	module.exports.amiTwig = amiTwig;
}
else if(typeof window !== 'undefined')
{
	window.amiTwig = amiTwig;
}
else if(typeof __webpack_require__.g !== 'undefined')
{
	__webpack_require__.g.amiTwig = amiTwig;
}

/*--------------------------------------------------------------------------------------------------------------------*/

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (amiTwig);

/*--------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig.tokenizer                                                                                                  */
/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.tokenizer = {
	/*----------------------------------------------------------------------------------------------------------------*/

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

__l0:	while(i < l)
		{
			c = code.charAt(0);

			/*--------------------------------------------------------------------------------------------------------*/
			/* COUNT LINES                                                                                            */
			/*--------------------------------------------------------------------------------------------------------*/

			if(c === '\n')
			{
				line++;
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* EAT SPACES                                                                                             */
			/*--------------------------------------------------------------------------------------------------------*/

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

			/*--------------------------------------------------------------------------------------------------------*/
			/* EAT REGEXES                                                                                            */
			/*--------------------------------------------------------------------------------------------------------*/

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

			/*--------------------------------------------------------------------------------------------------------*/
			/* EAT REMAINING CHARACTERES                                                                              */
			/*--------------------------------------------------------------------------------------------------------*/

			word += c;

			code = code.substring(1);
			i += 1;

/*			continue __l0;
 */
			/*--------------------------------------------------------------------------------------------------------*/
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

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

	_alphanum: [
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
		       this._alphanum[charCode2] === 0
		       ||
		       this._alphanum[charCode1] === 0
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
};

/*--------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig.expr                                                                                                       */
/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.expr = {};

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig.expr.tokens                                                                                                */
/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.expr.tokens = {
	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/
		/* COMPOSITE TOKENS                                                                                           */
		/*------------------------------------------------------------------------------------------------------------*/

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

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* REAL TOKENS                                                                                                    */
	/*----------------------------------------------------------------------------------------------------------------*/

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
 	DOUBLE_QUESTION: 127,
 	QUESTION: 128,
	COLON: 129,
	DOT: 130,
	COMMA: 131,
	PIPE: 132,
	LP: 133,
	RP: 134,
	LB1: 135,
	RB1: 136,
	LB2: 137,
	RB2: 138,
	SID: 139,
	TERMINAL: 140,

	/*----------------------------------------------------------------------------------------------------------------*/
	/* VIRTUAL TOKENS                                                                                                 */
	/*----------------------------------------------------------------------------------------------------------------*/

	LST: 200,
	DIC: 201,
	FUN: 202,
	VAR: 203,

	/*----------------------------------------------------------------------------------------------------------------*/
};

/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.expr.tokens.$init();

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig.expr.Tokenizer                                                                                             */
/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.expr.Tokenizer = function(code, line) {
	/*----------------------------------------------------------------------------------------------------------------*/

	this._spaces = [' ', '\t', '\n', '\r'];

	/*----------------------------------------------------------------------------------------------------------------*/

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
		'??',
		'?',
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

	/*----------------------------------------------------------------------------------------------------------------*/

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
		amiTwig.expr.tokens.DOUBLE_QUESTION,
		amiTwig.expr.tokens.QUESTION,
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

	/*----------------------------------------------------------------------------------------------------------------*/

	this.$init = function(code, line)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		const result = amiTwig.tokenizer.tokenize(
			code,
			line,
			this._spaces,
			this._tokenDefs,
			this._tokenTypes,
			true
		);

		/*------------------------------------------------------------------------------------------------------------*/

		this.tokens = result.tokens;
		this.types = result.types;

		this.i = 0;

		/*------------------------------------------------------------------------------------------------------------*/
	};

	/*----------------------------------------------------------------------------------------------------------------*/

	this.next = function(n = 1)
	{
		this.i += n;
	};

	/*----------------------------------------------------------------------------------------------------------------*/

	this.isEmpty = function()
	{
		return this.i >= this.tokens.length;
	};

	/*----------------------------------------------------------------------------------------------------------------*/

	this.peekToken = function()
	{
		return this.tokens[this.i];
	};

	/*----------------------------------------------------------------------------------------------------------------*/

	this.peekType = function()
	{
		return this.types[this.i];
	};

	/*----------------------------------------------------------------------------------------------------------------*/

	this.checkType = function(type)
	{
		if(this.i < this.tokens.length)
		{
			const TYPE = this.types[this.i];

			return (type instanceof Array) ? (type.indexOf(TYPE) >= 0) : (type === TYPE);
		}

		return false;
	};

	/*----------------------------------------------------------------------------------------------------------------*/

	this.$init(code, line);

	/*----------------------------------------------------------------------------------------------------------------*/
};

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig.expr.Compiler                                                                                              */
/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.expr.Compiler = function(code, line) {

	this.$init(code, line);
};

/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.expr.Compiler.prototype = {
	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function(code, line)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		this.tokenizer = new amiTwig.expr.Tokenizer(
			this.code = code,
			this.line = line
		);

		/*------------------------------------------------------------------------------------------------------------*/

		this.rootNode = this.parseNullCoalescing();

		/*------------------------------------------------------------------------------------------------------------*/

		if(this.tokenizer.isEmpty() === false)
		{
			throw 'syntax error, line `' + this.line + '`, unexpected token `' + this.tokenizer.peekToken() + '`';
		}

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	dump: function()
	{
		return this.rootNode.dump();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseNullCoalescing: function()
	{
		let left = this.parseLogicalOr(), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* NullCoalescing : LogicalOr ('??' LogicalOr)*                                                               */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.DOUBLE_QUESTION))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseLogicalOr();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return left;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseLogicalOr: function()
	{
		let left = this.parseLogicalAnd(), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* LogicalOr : LogicalAnd ('or' LogicalAnd)*                                                                  */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_OR))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseLogicalAnd();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return left;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseLogicalAnd: function()
	{
		let left = this.parseBitwiseOr(), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* LogicalAnd : BitwiseOr ('and' BitwiseOr)*                                                                  */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_AND))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseBitwiseOr();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return left;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseBitwiseOr: function()
	{
		let left = this.parseBitwiseXor(), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* BitwiseOr : BitwiseXor ('b-or' BitwiseXor)*                                                                */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_OR))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseBitwiseXor();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return left;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseBitwiseXor: function()
	{
		let left = this.parseBitwiseAnd(), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* BitwiseXor : BitwiseAnd ('b-xor' BitwiseAnd)*                                                              */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_XOR))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseBitwiseAnd();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return left;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseBitwiseAnd: function()
	{
		let left = this.parseNot(), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* BitwiseAnd : Not ('b-and' Not)*                                                                            */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_AND))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseNot();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return left;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseNot: function()
	{
		let right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Not : 'not' Comp                                                                                           */
		/*------------------------------------------------------------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwig.expr.tokens.NOT))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseComp();

			node.nodeLeft = null;
			node.nodeRight = right;

			return node;
		}

		/*------------------------------------------------------------------------------------------------------------*/
		/*     | Comp                                                                                                 */
		/*------------------------------------------------------------------------------------------------------------*/

		return this.parseComp();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseComp: function()
	{
		let left = this.parseAddSub(), right, node, swap;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Comp : AddSub 'is' 'not'? ('defined' | 'null' | ...)                                                       */
		/*------------------------------------------------------------------------------------------------------------*/

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

		/*------------------------------------------------------------------------------------------------------------*/
		/*      | AddSub ('===' | '==' | ...) AddSub                                                                  */
		/*------------------------------------------------------------------------------------------------------------*/

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.CMP_OP))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*------------------------------------------------------------------------------------------------------------*/
		/*      | AddSub ('starts' | 'ends') `with` AddSub                                                            */
		/*------------------------------------------------------------------------------------------------------------*/

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.XXX_WITH))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*------------------------------------------------------------------------------------------------------------*/
		/*      | AddSub 'matches' AddSub                                                                             */
		/*------------------------------------------------------------------------------------------------------------*/

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.MATCHES))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*------------------------------------------------------------------------------------------------------------*/
		/*      | AddSub 'in' AddSub                                                                                  */
		/*------------------------------------------------------------------------------------------------------------*/

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.IN))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*------------------------------------------------------------------------------------------------------------*/
		/*      | AddSub                                                                                              */
		/*------------------------------------------------------------------------------------------------------------*/

		return left;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseAddSub: function()
	{
		let left = this.parseMulDiv(), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* AddSub : MulDiv (('+' | '-') MulDiv)*                                                                      */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.PLUS_MINUS))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseMulDiv();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return left;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseMulDiv: function()
	{
		let left = this.parsePlusMinus(), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* MulDiv : PlusMinus (('*' | '//' | '/' | '%') PlusMinus)*                                                   */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.MUL_FLDIV_DIV_MOD))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parsePlusMinus();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return left;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parsePlusMinus: function()
	{
		let right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* PlusMinus : ('-' | '+') Power                                                                              */
		/*------------------------------------------------------------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwig.expr.tokens.PLUS_MINUS))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parsePower();

			node.nodeLeft = null;
			node.nodeRight = right;

			return node;
		}

		/*------------------------------------------------------------------------------------------------------------*/
		/*           | Dot1                                                                                           */
		/*------------------------------------------------------------------------------------------------------------*/

		return this.parsePower();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parsePower: function()
	{
		let left = this.parseFilter(), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Power : Filter ('**' Filter)*                                                                              */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.POWER))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseFilter();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return left;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseFilter: function()
	{
		let left = this.parseDot1(), node, temp;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Filter : Dot1 ('|' Dot1)*                                                                                  */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.PIPE))
		{
			this.tokenizer.next();

			node = this.parseDot1(true);

			for(temp = node; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft) {} // eslint-disable-line no-empty

			temp.list.unshift(left);

			left = node;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return left;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseDot1: function(isFilter)
	{
		const node = this.parseDot2(isFilter);

		if(node)
		{
			let temp;

			/*--------------------------------------------------------------------------------------------------------*/

			for(temp = node; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft) {} // eslint-disable-line no-empty

			/*--------------------------------------------------------------------------------------------------------*/

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

			/*--------------------------------------------------------------------------------------------------------*/
		}

		return node;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseDot2: function(isFilter)
	{
		let left = this.parseDot3(isFilter), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Dot2 : Dot3 ('.' Dot3)*                                                                                    */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.DOT))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), '.');
			this.tokenizer.next();

			right = this.parseDot3(isFilter);

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return left;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseDot3: function(isFilter)
	{
		let left = this.parseX(isFilter), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Dot3 : X ('[' NullCoalescing ']')*                                                                         */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.LB1))
		{
			this.tokenizer.next();

			right = this.parseNullCoalescing();

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

		/*------------------------------------------------------------------------------------------------------------*/
		/*         | X                                                                                                */
		/*------------------------------------------------------------------------------------------------------------*/

		return left;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseX: function(isFilter)
	{
		let node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* X : Group | Array | Object | FunVar | Terminal                                                             */
		/*------------------------------------------------------------------------------------------------------------*/

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

		/*------------------------------------------------------------------------------------------------------------*/
		/* SYNTAX ERROR                                                                                               */
		/*------------------------------------------------------------------------------------------------------------*/

		throw 'syntax error, line `' + this.line + '`, syntax error or truncated expression';

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseGroup: function()
	{
		let node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Group : '(' NullCoalescing ')'                                                                             */
		/*------------------------------------------------------------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwig.expr.tokens.LP))
		{
			this.tokenizer.next();

			node = this.parseNullCoalescing();

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

		/*------------------------------------------------------------------------------------------------------------*/

		return null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseArray: function()
	{
		let node, list;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Array : '[' Singlets ']'                                                                                   */
		/*------------------------------------------------------------------------------------------------------------*/

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

		/*------------------------------------------------------------------------------------------------------------*/

		return null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseObject: function()
	{
		let node, dict;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Object : '{' Doublets '}'                                                                                  */
		/*------------------------------------------------------------------------------------------------------------*/

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

		/*------------------------------------------------------------------------------------------------------------*/

		return null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseFunVar: function(isFilter)
	{
		let node;

		if(this.tokenizer.checkType(amiTwig.expr.tokens.SID))
		{
			node = new amiTwig.expr.Node(0, isFilter ? 'filter_' + this.tokenizer.peekToken() : this.tokenizer.peekToken());

			node.q = true;

			this.tokenizer.next();

			/*--------------------------------------------------------------------------------------------------------*/
			/* FunVar : SID '(' Singlets ')'                                                                          */
			/*--------------------------------------------------------------------------------------------------------*/

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

			/*--------------------------------------------------------------------------------------------------------*/
			/*        | SID                                                                                           */
			/*--------------------------------------------------------------------------------------------------------*/

			else
			{
				node.nodeType = isFilter ? amiTwig.expr.tokens.FUN
				                         : amiTwig.expr.tokens.VAR
				;

				node.list = [];
			}

			/*--------------------------------------------------------------------------------------------------------*/

			return node;
		}

		return null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

	_parseSinglet: function(result)
	{
		result.push(this.parseNullCoalescing());
	},

	/*----------------------------------------------------------------------------------------------------------------*/

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

				/*----------------------------------------------------------------------------------------------------*/

				result[key] = this.parseNullCoalescing();

				/*----------------------------------------------------------------------------------------------------*/
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

	/*----------------------------------------------------------------------------------------------------------------*/

	parseTerminal: function()
	{
		let left, right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Terminal : TERMINAL | RANGE                                                                                */
		/*------------------------------------------------------------------------------------------------------------*/

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

		/*------------------------------------------------------------------------------------------------------------*/

		return null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
};

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig.expr.Node                                                                                                  */
/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.expr.Node = function(nodeType, nodeValue) {

	this.$init(nodeType, nodeValue);
};

/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.expr.Node.prototype = {
	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function(nodeType, nodeValue)
	{
		this.nodeType = nodeType;
		this.nodeValue = nodeValue;
		this.nodeLeft = null;
		this.nodeRight = null;
		this.list = null;
		this.dict = null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

	dump: function()
	{
		const nodes = [];
		const edges = [];

		this._dump(nodes, edges, [0]);

		return 'digraph ast {\n\trankdir=TB;\n' + nodes.join('\n') + '\n' + edges.join('\n') + '\n}';
	},

	/*----------------------------------------------------------------------------------------------------------------*/
};

/*--------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig.tmpl                                                                                                       */
/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.tmpl = {};

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig.tmpl.Compiler                                                                                              */
/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.tmpl.Compiler = function(tmpl) {

	this.$init(tmpl);
};

/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.tmpl.Compiler.prototype = {
	/*----------------------------------------------------------------------------------------------------------------*/

	STATEMENT_RE: /{%\s*([a-zA-Z]+)\s*((?:.|\n)*?)\s*%}/,

	COMMENT_RE: /{#\s*((?:.|\n)*?)\s*#}/g,

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function(tmpl)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		let line = 1;

		let column;
		let COLUMN;

		/*------------------------------------------------------------------------------------------------------------*/

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

		/*------------------------------------------------------------------------------------------------------------*/

		const stack1 = [this.rootNode];
		const stack2 = [0x00000000000];

		let item;

		/*------------------------------------------------------------------------------------------------------------*/

		for(tmpl = tmpl.replace(this.COMMENT_RE, '');; tmpl = tmpl.substr(COLUMN))
		{
			/*--------------------------------------------------------------------------------------------------------*/

			const curr = stack1[stack1.length - 1];
			 let  indx = stack2[stack2.length - 1];

			/*--------------------------------------------------------------------------------------------------------*/

			const m = tmpl.match(this.STATEMENT_RE);

			/*--------------------------------------------------------------------------------------------------------*/

			if(m === null)
			{
				/*----------------------------------------------------------------------------------------------------*/

				line += this._count(tmpl);

				/*----------------------------------------------------------------------------------------------------*/

				curr.blocks[indx].list.push({
					line: line,
					keyword: '@text',
					expression: '',
					blocks: [],
					value: tmpl,
				});

				/*----------------------------------------------------------------------------------------------------*/

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

				/*----------------------------------------------------------------------------------------------------*/

				break;
			}

			/*--------------------------------------------------------------------------------------------------------*/

			const match = m[0];
			const keyword = m[1];
			const expression = m[2];

			column = m.index + 0x0000000000;
			COLUMN = m.index + match.length;

			const value = tmpl.substr(0, column);
			const VALUE = tmpl.substr(0, COLUMN);

			/*--------------------------------------------------------------------------------------------------------*/

			line += this._count(VALUE);

			/*--------------------------------------------------------------------------------------------------------*/

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

			/*--------------------------------------------------------------------------------------------------------*/

			switch(keyword)
			{
				/*----------------------------------------------------------------------------------------------------*/

				case 'flush':
				case 'autoescape':
				case 'spaceless':
				case 'verbatim':

					/* IGNORE */

					break;

				/*----------------------------------------------------------------------------------------------------*/

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

				/*----------------------------------------------------------------------------------------------------*/

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

				/*----------------------------------------------------------------------------------------------------*/

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

				/*----------------------------------------------------------------------------------------------------*/

				case 'else':

					if(curr['keyword'] !== 'if'
					   &&
					   curr['keyword'] !== 'for'
					 ) {
						throw 'syntax error, line `' + line + '`, unexpected keyword `else`';
					}

					indx = curr.blocks.length;

					curr.blocks.push({
						expression: '@true',
						list: [],
					});

					stack2[stack2.length - 1] = indx;

					break;

				/*----------------------------------------------------------------------------------------------------*/

				case 'endif':

					if(curr['keyword'] !== 'if')
					{
						throw 'syntax error, line `' + line + '`, unexpected keyword `endif`';
					}

					stack1.pop();
					stack2.pop();

					break;

				/*----------------------------------------------------------------------------------------------------*/

				case 'endfor':

					if(curr['keyword'] !== 'for')
					{
						throw 'syntax error, line `' + line + '`, unexpected keyword `endfor`';
					}

					stack1.pop();
					stack2.pop();

					break;

				/*----------------------------------------------------------------------------------------------------*/

				default:

					throw 'syntax error, line `' + line + '`, unknown keyword `' + keyword + '`';

				/*----------------------------------------------------------------------------------------------------*/
			}

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	dump: function()
	{
		return JSON.stringify(this.rootNode, null, 2);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
};

/*--------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig.engine                                                                                                     */
/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.engine = {
	/*----------------------------------------------------------------------------------------------------------------*/

	VARIABLE_RE: /{{\s*(.*?)\s*}}/g,

	/*----------------------------------------------------------------------------------------------------------------*/

	_render: function(result, item, dict = {}, tmpls = {})
	{
		let m;

		let expression;

		this.dict = dict;
		this.tmpls = tmpls;

		switch(item.keyword)
		{
			/*--------------------------------------------------------------------------------------------------------*/
			/* DO                                                                                                     */
			/*--------------------------------------------------------------------------------------------------------*/

			case 'do':
			{
				/*----------------------------------------------------------------------------------------------------*/

				amiTwig.expr.cache.eval(item.expression, item.line, dict);

				/*----------------------------------------------------------------------------------------------------*/

				break;
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* SET                                                                                                    */
			/*--------------------------------------------------------------------------------------------------------*/

			case 'set':
			{
				/*----------------------------------------------------------------------------------------------------*/

				m = item.expression.match(/((?:[a-zA-Z_$][a-zA-Z0-9_$]*\.)*[a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(.+)/);

				if(!m)
				{
					throw 'syntax error, line `' + item.line + '`, invalid `set` statement';
				}

				/*----------------------------------------------------------------------------------------------------*/

				const parts = m[1].split('.'), l = parts.length - 1;

				let parent, j;

				if(parts[0] === 'window'
				   ||
				   parts[0] === 'global'
				 ) {
					/**/ if(typeof window !== 'undefined') {
						parent = window;
					}
					else if(typeof __webpack_require__.g !== 'undefined') {
						parent = __webpack_require__.g;
					}
					else {
						throw 'internal error';
					}

					j = 1;
				}
				else
				{
					parent = dict;

					j = 0;
				}

				/*----------------------------------------------------------------------------------------------------*/

				let i;

				for(i = j; i < l; i++)
				{
					if(parent[parts[i]])
					{
						parent = parent[parts[i]];
					}
					else
					{
						throw 'runtime error, line `' + item.line + '`, `' + m[1] + '` not declared';
					}
				}

				/*----------------------------------------------------------------------------------------------------*/

				parent[parts[i]] = amiTwig.expr.cache.eval(m[2], item.line, dict);

				/*----------------------------------------------------------------------------------------------------*/

				break;
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* @TEXT                                                                                                  */
			/*--------------------------------------------------------------------------------------------------------*/

			case '@text':
			{
				/*----------------------------------------------------------------------------------------------------*/

				result.push(item.value.replace(this.VARIABLE_RE, function(match, expression) {

					let value = amiTwig.expr.cache.eval(expression, item.line, dict);

					return value !== null && value !== undefined ? value : '';
				}));

				/*----------------------------------------------------------------------------------------------------*/

				break;
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* IF                                                                                                     */
			/*--------------------------------------------------------------------------------------------------------*/

			case 'if':
			case '@root':
			{
				/*----------------------------------------------------------------------------------------------------*/

				item.blocks.every((block) => {

					expression = block.expression;

					if(expression === '@true' || amiTwig.expr.cache.eval(expression, item.line, dict))
					{
						for(const i in block.list)
						{
							this._render(result, block.list[i], dict, tmpls);
						}

						return false;
					}

					return true;
				});

				/*----------------------------------------------------------------------------------------------------*/

				break;
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* FOR                                                                                                    */
			/*--------------------------------------------------------------------------------------------------------*/

			case 'for':
			{
				/*----------------------------------------------------------------------------------------------------*/

				let sym1;
				let sym2;
				let expr;

				m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*,\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/);

				if(!m)
				{
					m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/);

					if(!m)
					{
						throw 'syntax error, line `' + item.line + '`, invalid `for` statement';
					}
					else
					{
						sym1 = m[1];
						sym2 = null;
						expr = m[2];
					}
				}
				else
				{
					sym1 = m[1];
					sym2 = m[2];
					expr = m[3];
				}

				/*----------------------------------------------------------------------------------------------------*/

				const origValue = amiTwig.expr.cache.eval(expr, item.line, dict);

				const typeName = Object.prototype.toString.call(origValue);

				/*----------------------------------------------------------------------------------------------------*/

				let iterValue;

				if(typeName === '[object Object]')
				{
					iterValue = sym2 ? Object.entries(origValue)
					                 : Object.keys(origValue)
					;
				}
				else
				{
					iterValue = origValue;

					if(typeName !== '[object Array]'
					   &&
					   typeName !== '[object String]'
					 ) {
						throw 'syntax error, line `' + item.line + '`, right operand not iterable';
					}

					if(sym2)
					{
						throw 'syntax error, line `' + item.line + '`, right operand not an object';
					}
				}

				/*----------------------------------------------------------------------------------------------------*/

				const l = iterValue.length;

				if(l > 0)
				{
					let k = 0x00000000000000;

					const list = item.blocks[0].list;

					if(sym2)
					{
						/*--------------------------------------------------------------------------------------------*/

						const old1 = dict[(sym1)];
						const old2 = dict[(sym2)];
						const old3 = dict['loop'];

						/*--------------------------------------------------------------------------------------------*/

						dict.loop = {length: l, parent: dict['loop']};

						/*--------------------------------------------------------------------------------------------*/

						for(const i in iterValue)
						{
							dict[sym1] = iterValue[i][0];
							dict[sym2] = iterValue[i][1];

							dict.loop.first = (k === (0 - 0));
							dict.loop.last = (k === (l - 1));

							dict.loop.revindex0 = l - k;
							dict.loop.index0 = k;
							k++;
							dict.loop.revindex = l - k;
							dict.loop.index = k;

							for(const j in list)
							{
								this._render(result, list[j], dict, tmpls);
							}
						}

						/*--------------------------------------------------------------------------------------------*/

						dict['loop'] = old3;
						dict[(sym2)] = old2;
						dict[(sym1)] = old1;

						/*--------------------------------------------------------------------------------------------*/
					}
					else
					{
						/*--------------------------------------------------------------------------------------------*/

						const old1 = dict[(sym1)];
						const old2 = dict['loop'];

						/*--------------------------------------------------------------------------------------------*/

						dict.loop = {length: l, parent: dict['loop']};

						/*--------------------------------------------------------------------------------------------*/

						for(const i in iterValue)
						{
							dict[sym1] = iterValue[i];

							dict.loop.first = (k === (0 - 0));
							dict.loop.last = (k === (l - 1));

							dict.loop.revindex0 = l - k;
							dict.loop.index0 = k;
							k++;
							dict.loop.revindex = l - k;
							dict.loop.index = k;

							for(const j in list)
							{
								this._render(result, list[j], dict, tmpls);
							}
						}

						/*--------------------------------------------------------------------------------------------*/

						dict['loop'] = old2;
						dict[(sym1)] = old1;

						/*--------------------------------------------------------------------------------------------*/
					}
				}
				else
				{
					if(item.blocks.length > 1)
					{
						const list = item.blocks[1].list;

						for(const j in list)
						{
							this._render(result, list[j], dict, tmpls);
						}
					}
				}

				/*----------------------------------------------------------------------------------------------------*/

				break;
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* INCLUDE                                                                                                */
			/*--------------------------------------------------------------------------------------------------------*/

			case 'include':
			{
				/*----------------------------------------------------------------------------------------------------*/

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

				/*----------------------------------------------------------------------------------------------------*/

				const fileName = amiTwig.expr.cache.eval(expression, item.line, dict) || '';

				if(Object.prototype.toString.call(fileName) !== '[object String]')
				{
					throw 'runtime error, line `' + item.line + '`, string expected';
				}

				/*----------------------------------------------------------------------------------------------------*/

				const variables = amiTwig.expr.cache.eval(with_subexpr, item.line, dict) || {};

				if(Object.prototype.toString.call(variables) !== '[object Object]')
				{
					throw 'runtime error, line `' + item.line + '`, object expected';
				}

				/*----------------------------------------------------------------------------------------------------*/

				result.push(amiTwig.stdlib.include(
					fileName,
					variables,
					with_context,
					false
				));

				/*----------------------------------------------------------------------------------------------------*/

				break;
			}

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(tmpl, dict = {}, tmpls = {})
	{
		const result = [];

		switch(Object.prototype.toString.call(tmpl))
		{
			case '[object String]':
				this._render(result, new amiTwig.tmpl.Compiler(tmpl).rootNode, dict, tmpls);
				break;

			case '[object Object]':
				this._render(result, /*--------------*/tmpl/*--------------*/, dict, tmpls);
				break;
		}

		return result.join('');
	},

	/*----------------------------------------------------------------------------------------------------------------*/
};

/*--------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig.expr.cache                                                                                                 */
/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.expr.cache = {
	/*----------------------------------------------------------------------------------------------------------------*/

	dict: {},

	/*----------------------------------------------------------------------------------------------------------------*/

	eval: function(expression, line, _)
	{
		/*------------------------------------------------------------------------------------------------------------*/

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

		/*------------------------------------------------------------------------------------------------------------*/

		_ = _ || {};

		return f.call(_, _);

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/
};

/*--------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig.stdlib                                                                                                     */
/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.stdlib = {
	/*----------------------------------------------------------------------------------------------------------------*/
	/* VARIABLES                                                                                                      */
	/*----------------------------------------------------------------------------------------------------------------*/

	'isUndefined': function(x)
	{
		return x === undefined;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isDefined': function(x)
	{
		return x !== undefined;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isNull': function(x)
	{
		return x === null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isNotNull': function(x)
	{
		return x !== null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

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

		return ((typeName === '[object Array]') && x.length === 0)
		       ||
		       ((typeName === '[object Set]' || typeName === '[object WeakSet]') && x.size === 0)
		       ||
		       ((typeName === '[object Object]' || typeName === '[object Map]' || typeName === '[object WeakMap]') && Object.keys(x).length === 0)
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isNumber': function(x)
	{
		const typeName = Object.prototype.toString.call(x);

		return typeName === '[object Number]'
		       ||
		       typeName === '[object BigInt]'
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isString': function(x)
	{
		return Object.prototype.toString.call(x) === '[object String]';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isDate': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Date]';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isArray': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Array]';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isObject': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Object]';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isSet': function(x)
	{
		const typeName = Object.prototype.toString.call(x);

		return typeName === '[object Set]'
		       ||
		       typeName === '[object WeakSet]'
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isMap': function(x)
	{
		const typeName = Object.prototype.toString.call(x);

		return typeName === '[object Object]'
		       ||
		       typeName === '[object Map]'
		       ||
		       typeName === '[object WeakMap]'
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isIterable': function(x)
	{
		const typeName = Object.prototype.toString.call(x);

		return typeName === '[object String]'
		       ||
		       typeName === '[object Array]'
		       ||
		       typeName === '[object Object]'
		       ||
		       typeName === '[object Set]'
		       ||
		       typeName === '[object WeakSet]'
		       ||
		       typeName === '[object Map]'
		       ||
		       typeName === '[object WeakMap]'
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isEven': function(x)
	{
		return this.isNumber(x) && (x & 1) === 0;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isOdd': function(x)
	{
		return this.isNumber(x) && (x & 1) === 1;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* ITERABLES                                                                                                      */
	/*----------------------------------------------------------------------------------------------------------------*/

	'isInObject': function(x, y)
	{
		if(this.isArray(y)
		   ||
		   this.isString(y)
		 ) {
			return y.indexOf(x) >= 0;
		}

		if(this.isSet(y))
		{
			return y.has(x);
		}

		if(this.isMap(y))
		{
			return Object.prototype.hasOwnProperty.call(y, x);
		}

		return false;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_length': function(x)
	{
		if(this.isString(x)
		   ||
		   this.isArray(x)
		   ||
		   this.isSet(x)
		 ) {
			return x.length;
		}

		if(this.isSet(x))
		{
			return x.size;
		}

		if(this.isMap(x))
		{
			return Object.keys(x).length;
		}

		return 0;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_first': function(x)
	{
		return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[0x0000000000] : '';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_last': function(x)
	{
		return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[x.length - 1] : '';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_slice': function(x, idx1, idx2)
	{
		return (this.isString(x) || this.isArray(x)) ? x.slice(idx1, idx2) : null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_merge': function()
	{
		if(arguments.length > 1)
		{
			/*--------------------------------------------------------------------------------------------------------*/

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

			/*--------------------------------------------------------------------------------------------------------*/

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

					item.forEach(x => L.push(x));
				}

				return L;
			}

			/*--------------------------------------------------------------------------------------------------------*/

			if(this.isSet(arguments[0]))
			{
				const L = [];

				for(const i in arguments)
				{
					const item = arguments[i];

					if(!this.isSet(item))
					{
						return null;
					}

					item.forEach(x => L.add(x));
				}

				return L;
			}

			/*--------------------------------------------------------------------------------------------------------*/

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

			/*--------------------------------------------------------------------------------------------------------*/
		}

		return null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_sort': function(x)
	{
		return this.isArray(x) ? x.sort() : [];
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_reverse': function(x)
	{
		return this.isArray(x) ? x.reverse() : [];
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_join': function(x, sep)
	{
		return this.isArray(x) ? x.join(sep) : '';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_keys': function(x)
	{
		return this.isMap(x) ? Object.keys(x) : [];
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_column': function(x, key)
	{
		return this.isArray(x) ? x.map((val) => val[key]) : [];
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_batch': function(x, n, missing = '')
	{
	    const result = [];

		if(this.isArray(x)
		   &&
		   this.isNumber(n)
		 ) {
			const l = x.length;

			if(l > 0)
			{
				let last;

				const m = Math.ceil(l / n) * n;

				for(let i = 0; i < l; i += n)
				{
					result.push(last = x.slice(i, i + n));
				}

				for(let i = l; i < m; i += 1)
				{
					last.push(missing);
				}
			}
		}

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* STRINGS                                                                                                        */
	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_default': function(s1, s2)
	{
		return s1 || s2 || '';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_lower': function(s)
	{
		return this.isString(s) ? s.toLowerCase() : '';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_upper': function(s)
	{
		return this.isString(s) ? s.toUpperCase() : '';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_trim': function(s)
	{
		return this.isString(s) ? s.trim()
		                        : ''
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'_replace': function(s, oldStrs, newStrs)
	{
		const result = [];

		const l = (((s))).length;
		const m = oldStrs.length;
		const n = newStrs.length;

		if(m !== n)
		{
			throw 'internal error';
		}

__l0:	for(let i = 0; i < l; i += 0)
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

	/*----------------------------------------------------------------------------------------------------------------*/

	'_textToHtmlX': ['&'    , '"'     , '<'   , '>'   ],
	'_textToHtmlY': ['&amp;', '&quot;', '&lt;', '&gt;'],

	/*----------------------------------------------------------------------------------------------------------------*/

	'_textToStringX': ['\\'  , '\r' , '\n' , '"'  , '\''  ],
	'_textToStringY': ['\\\\', '\\r', '\\n', '\\"', '\\\''],

	/*----------------------------------------------------------------------------------------------------------------*/

	'_textToJsonStringX': ['\\'  , '\r' , '\n' , '"'  ],
	'_textToJsonStringY': ['\\\\', '\\r', '\\n', '\\"'],

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_url_encode': function(s)
	{
		return this.isString(s) ? encodeURIComponent(s)
		                        : ''
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_nl2br': function(s)
	{
		return this.isString(s) ? s.replace(/\n/g, '<br/>')
		                        : ''
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_raw': function(s)
	{
		return this.isString(s) ? s
		                        : ''
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_replace': function(s, dict)
	{
		return this.isString(s) && this.isMap(dict) ? this._replace(s, Object.keys(dict), Object.values(dict))
		                                            : ''
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_split': function(s, sep, max)
	{
		return this.isString(s) ? s.split(sep, max)
		                        : []
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* NUMBERS                                                                                                        */
	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_abs': function(x)
	{
		return Math.abs(x);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

	'min': function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		const args = (arguments.length === 1) && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0]
		                                                                                                     : arguments
		;

		/*------------------------------------------------------------------------------------------------------------*/

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

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'max': function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		const args = (arguments.length === 1) && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0]
		                                                                                                     : arguments
		;

		/*------------------------------------------------------------------------------------------------------------*/

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

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* RANDOM                                                                                                         */
	/*----------------------------------------------------------------------------------------------------------------*/

	'random': function(x)
	{
		const y = Math.random();

		if(x)
		{
			if(this.isArray(x)
			   ||
			   this.isMap(x)
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

	/*----------------------------------------------------------------------------------------------------------------*/
	/* DATE                                                                                                           */
	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_date': function(date, format, timezone)
	{
		if(typeof moment !== 'undefined' && (this.isDate(date) || this.isString(date)) && this.isString(format))
		{
			if(typeof moment.tz !== 'undefined' && this.isString(timezone))
			{
				return moment(date).tz(timezone).format(format);
			}
			else
			{
				return moment(date).format(format);
			}
		}

		return '';
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* JSON                                                                                                           */
	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_json_encode': function(x, indent)
	{
		return JSON.stringify(x, null, this.isNumber(indent) ? indent : 2);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_json_jspath': function(x, path)
	{
		return typeof JSPath !== 'undefined' ? JSPath.apply(path, x)
		                                     : []
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* TEMPLATES                                                                                                      */
	/*----------------------------------------------------------------------------------------------------------------*/

	'include': function(fileName, variables = {}, withContext = true, ignoreMissing = false)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		if(fileName in amiTwig.engine.tmpls)
		{
			const temp = {};

			/*--------------------------------------------------------------------------------------------------------*/

			if(withContext)
			{
				for(const i in amiTwig.engine.dict)
				{
					temp[i] = amiTwig.engine.dict[i];
				}
			}

			/*--------------------------------------------------------------------------------------------------------*/

			if(variables)
			{
				for(const i in /*-*/variables/*-*/)
				{
					temp[i] = /*-*/variables/*-*/[i];
				}
			}

			/*--------------------------------------------------------------------------------------------------------*/

			return amiTwig.engine.render(amiTwig.engine.tmpls[fileName], temp);

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if(!ignoreMissing)
		{
			throw 'runtime error, could not open `' + fileName + '`';
		}

		return '';

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/
};

/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.stdlib.filter_e = amiTwig.stdlib.filter_escape;

/*--------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig.expr.interpreter                                                                                           */
/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.expr.interpreter = {
	/*----------------------------------------------------------------------------------------------------------------*/

	_getJS: function(node)
	{
		let L;
		let x;
		let left;
		let right;
		let operator;

		switch(node.nodeType)
		{
			/*--------------------------------------------------------------------------------------------------------*/
			/* LST                                                                                                    */
			/*--------------------------------------------------------------------------------------------------------*/

			case amiTwig.expr.tokens.LST:
				/*----------------------------------------------------------------------------------------------------*/

				L = [];

				for(const i in node.list)
				{
					L.push(/*-----*/ this._getJS(node.list[i]));
				}

				/*----------------------------------------------------------------------------------------------------*/

				return '[' + L.join(',') + ']';

			/*--------------------------------------------------------------------------------------------------------*/
			/* DIC                                                                                                    */
			/*--------------------------------------------------------------------------------------------------------*/

			case amiTwig.expr.tokens.DIC:
				/*----------------------------------------------------------------------------------------------------*/

				L = [];

				for(const i in node.dict)
				{
					L.push(i + ':' + this._getJS(node.dict[i]));
				}

				/*----------------------------------------------------------------------------------------------------*/

				return '{' + L.join(',') + '}';

			/*--------------------------------------------------------------------------------------------------------*/
			/* FUN                                                                                                    */
			/*--------------------------------------------------------------------------------------------------------*/

			case amiTwig.expr.tokens.FUN:
		 		/*----------------------------------------------------------------------------------------------------*/

				L = [];

				for(const i in node.list)
				{
					L.push(this._getJS(node.list[i]));
				}

			 	/*----------------------------------------------------------------------------------------------------*/

				return node.nodeValue + '(' + L.join(',') + ')';

			/*--------------------------------------------------------------------------------------------------------*/
			/* VAR                                                                                                    */
			/*--------------------------------------------------------------------------------------------------------*/

			case amiTwig.expr.tokens.VAR:
				/*----------------------------------------------------------------------------------------------------*/

				L = [];

				for(const i in node.list)
				{
					L.push('[' + this._getJS(node.list[i]) + ']');
				}

				/*----------------------------------------------------------------------------------------------------*/

				return L.length > 0 ? node.nodeValue + L.join('') : node.nodeValue;

			/*--------------------------------------------------------------------------------------------------------*/
			/* TERMINAL                                                                                               */
			/*--------------------------------------------------------------------------------------------------------*/

			case amiTwig.expr.tokens.TERMINAL:

				return node.nodeValue;

			/*--------------------------------------------------------------------------------------------------------*/
			/* IS                                                                                                     */
			/*--------------------------------------------------------------------------------------------------------*/

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

			/*--------------------------------------------------------------------------------------------------------*/
			/* IN                                                                                                     */
			/*--------------------------------------------------------------------------------------------------------*/

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

			/*--------------------------------------------------------------------------------------------------------*/
			/* STARTS_WITH                                                                                            */
			/*--------------------------------------------------------------------------------------------------------*/

			case amiTwig.expr.tokens.STARTS_WITH:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.startsWith(' + left + ',' + right + ')';

			/*--------------------------------------------------------------------------------------------------------*/
			/* ENDS_WITH                                                                                              */
			/*--------------------------------------------------------------------------------------------------------*/

			case amiTwig.expr.tokens.ENDS_WITH:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.endsWith(' + left + ',' + right + ')';

			/*--------------------------------------------------------------------------------------------------------*/
			/* MATCHES                                                                                                */
			/*--------------------------------------------------------------------------------------------------------*/

			case amiTwig.expr.tokens.MATCHES:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.match(' + left + ',' + right + ')';

			/*--------------------------------------------------------------------------------------------------------*/
			/* RANGE                                                                                                  */
			/*--------------------------------------------------------------------------------------------------------*/

			case amiTwig.expr.tokens.RANGE:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.range(' + left + ',' + right + ')';

			/*--------------------------------------------------------------------------------------------------------*/
			/* DOT                                                                                                    */
			/*--------------------------------------------------------------------------------------------------------*/

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

			/*--------------------------------------------------------------------------------------------------------*/
			/* FLDIV                                                                                                  */
			/*--------------------------------------------------------------------------------------------------------*/

			case amiTwig.expr.tokens.FLDIV:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'Math.floor(' + left + '/' + right + ')';

			/*--------------------------------------------------------------------------------------------------------*/
			/* POWER                                                                                                  */
			/*--------------------------------------------------------------------------------------------------------*/

			case amiTwig.expr.tokens.POWER:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'Math.pow(' + left + ',' + right + ')';

			/*--------------------------------------------------------------------------------------------------------*/
			/* DOUBLE_QUESTION                                                                                        */
			/*--------------------------------------------------------------------------------------------------------*/

			case amiTwig.expr.tokens.DOUBLE_QUESTION:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return '((' + left + ') || (' + right + '))';

			/*--------------------------------------------------------------------------------------------------------*/

			default:
				/*----------------------------------------------------------------------------------------------------*/
				/* UNARY OPERATOR                                                                                     */
				/*----------------------------------------------------------------------------------------------------*/

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

				/*----------------------------------------------------------------------------------------------------*/
				/* BINARY OPERATOR                                                                                    */
				/*----------------------------------------------------------------------------------------------------*/

				if(node.nodeLeft !== null
				   &&
				   node.nodeRight !== null
				 ) {
					switch(node.nodeType)
					{
						/*--------------------------------------------------------------------------------------------*/

						case amiTwig.expr.tokens.LOGICAL_OR:
							operator = '||';
							break;

						/*--------------------------------------------------------------------------------------------*/

						case amiTwig.expr.tokens.LOGICAL_AND:
							operator = '&&';
							break;

						/*--------------------------------------------------------------------------------------------*/

						case amiTwig.expr.tokens.BITWISE_OR:
							operator = '|';
							break;

						/*--------------------------------------------------------------------------------------------*/

						case amiTwig.expr.tokens.BITWISE_XOR:
							operator = '^';
							break;

						/*--------------------------------------------------------------------------------------------*/

						case amiTwig.expr.tokens.BITWISE_AND:
							operator = '&';
							break;

						/*--------------------------------------------------------------------------------------------*/

						case amiTwig.expr.tokens.CONCAT:
							operator = '+';
							break;

						/*--------------------------------------------------------------------------------------------*/

						default:
							operator = node.nodeValue;
							break;

						/*--------------------------------------------------------------------------------------------*/
					}

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return '(' + left + operator + right + ')';
				}

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	getJS: function(expr)
	{
		return '(function(_) { return ' + this._getJS(expr.rootNode) + '; })';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	eval: function(expr, _)
	{
		_ = _ || {};

		return eval(this.getJS(expr)).call(_, _);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
};

/*--------------------------------------------------------------------------------------------------------------------*/


/***/ }),

/***/ 8184:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1667);
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(5495), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(3493), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"bootstrap-icons\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"woff2\"),\nurl(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"woff\");\n}\n\n.bi::before,\n[class^=\"bi-\"]::before,\n[class*=\" bi-\"]::before {\n  display: inline-block;\n  font-family: bootstrap-icons !important;\n  font-style: normal;\n  font-weight: normal !important;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  vertical-align: -.125em;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.bi-123::before { content: \"\\f67f\"; }\n.bi-alarm-fill::before { content: \"\\f101\"; }\n.bi-alarm::before { content: \"\\f102\"; }\n.bi-align-bottom::before { content: \"\\f103\"; }\n.bi-align-center::before { content: \"\\f104\"; }\n.bi-align-end::before { content: \"\\f105\"; }\n.bi-align-middle::before { content: \"\\f106\"; }\n.bi-align-start::before { content: \"\\f107\"; }\n.bi-align-top::before { content: \"\\f108\"; }\n.bi-alt::before { content: \"\\f109\"; }\n.bi-app-indicator::before { content: \"\\f10a\"; }\n.bi-app::before { content: \"\\f10b\"; }\n.bi-archive-fill::before { content: \"\\f10c\"; }\n.bi-archive::before { content: \"\\f10d\"; }\n.bi-arrow-90deg-down::before { content: \"\\f10e\"; }\n.bi-arrow-90deg-left::before { content: \"\\f10f\"; }\n.bi-arrow-90deg-right::before { content: \"\\f110\"; }\n.bi-arrow-90deg-up::before { content: \"\\f111\"; }\n.bi-arrow-bar-down::before { content: \"\\f112\"; }\n.bi-arrow-bar-left::before { content: \"\\f113\"; }\n.bi-arrow-bar-right::before { content: \"\\f114\"; }\n.bi-arrow-bar-up::before { content: \"\\f115\"; }\n.bi-arrow-clockwise::before { content: \"\\f116\"; }\n.bi-arrow-counterclockwise::before { content: \"\\f117\"; }\n.bi-arrow-down-circle-fill::before { content: \"\\f118\"; }\n.bi-arrow-down-circle::before { content: \"\\f119\"; }\n.bi-arrow-down-left-circle-fill::before { content: \"\\f11a\"; }\n.bi-arrow-down-left-circle::before { content: \"\\f11b\"; }\n.bi-arrow-down-left-square-fill::before { content: \"\\f11c\"; }\n.bi-arrow-down-left-square::before { content: \"\\f11d\"; }\n.bi-arrow-down-left::before { content: \"\\f11e\"; }\n.bi-arrow-down-right-circle-fill::before { content: \"\\f11f\"; }\n.bi-arrow-down-right-circle::before { content: \"\\f120\"; }\n.bi-arrow-down-right-square-fill::before { content: \"\\f121\"; }\n.bi-arrow-down-right-square::before { content: \"\\f122\"; }\n.bi-arrow-down-right::before { content: \"\\f123\"; }\n.bi-arrow-down-short::before { content: \"\\f124\"; }\n.bi-arrow-down-square-fill::before { content: \"\\f125\"; }\n.bi-arrow-down-square::before { content: \"\\f126\"; }\n.bi-arrow-down-up::before { content: \"\\f127\"; }\n.bi-arrow-down::before { content: \"\\f128\"; }\n.bi-arrow-left-circle-fill::before { content: \"\\f129\"; }\n.bi-arrow-left-circle::before { content: \"\\f12a\"; }\n.bi-arrow-left-right::before { content: \"\\f12b\"; }\n.bi-arrow-left-short::before { content: \"\\f12c\"; }\n.bi-arrow-left-square-fill::before { content: \"\\f12d\"; }\n.bi-arrow-left-square::before { content: \"\\f12e\"; }\n.bi-arrow-left::before { content: \"\\f12f\"; }\n.bi-arrow-repeat::before { content: \"\\f130\"; }\n.bi-arrow-return-left::before { content: \"\\f131\"; }\n.bi-arrow-return-right::before { content: \"\\f132\"; }\n.bi-arrow-right-circle-fill::before { content: \"\\f133\"; }\n.bi-arrow-right-circle::before { content: \"\\f134\"; }\n.bi-arrow-right-short::before { content: \"\\f135\"; }\n.bi-arrow-right-square-fill::before { content: \"\\f136\"; }\n.bi-arrow-right-square::before { content: \"\\f137\"; }\n.bi-arrow-right::before { content: \"\\f138\"; }\n.bi-arrow-up-circle-fill::before { content: \"\\f139\"; }\n.bi-arrow-up-circle::before { content: \"\\f13a\"; }\n.bi-arrow-up-left-circle-fill::before { content: \"\\f13b\"; }\n.bi-arrow-up-left-circle::before { content: \"\\f13c\"; }\n.bi-arrow-up-left-square-fill::before { content: \"\\f13d\"; }\n.bi-arrow-up-left-square::before { content: \"\\f13e\"; }\n.bi-arrow-up-left::before { content: \"\\f13f\"; }\n.bi-arrow-up-right-circle-fill::before { content: \"\\f140\"; }\n.bi-arrow-up-right-circle::before { content: \"\\f141\"; }\n.bi-arrow-up-right-square-fill::before { content: \"\\f142\"; }\n.bi-arrow-up-right-square::before { content: \"\\f143\"; }\n.bi-arrow-up-right::before { content: \"\\f144\"; }\n.bi-arrow-up-short::before { content: \"\\f145\"; }\n.bi-arrow-up-square-fill::before { content: \"\\f146\"; }\n.bi-arrow-up-square::before { content: \"\\f147\"; }\n.bi-arrow-up::before { content: \"\\f148\"; }\n.bi-arrows-angle-contract::before { content: \"\\f149\"; }\n.bi-arrows-angle-expand::before { content: \"\\f14a\"; }\n.bi-arrows-collapse::before { content: \"\\f14b\"; }\n.bi-arrows-expand::before { content: \"\\f14c\"; }\n.bi-arrows-fullscreen::before { content: \"\\f14d\"; }\n.bi-arrows-move::before { content: \"\\f14e\"; }\n.bi-aspect-ratio-fill::before { content: \"\\f14f\"; }\n.bi-aspect-ratio::before { content: \"\\f150\"; }\n.bi-asterisk::before { content: \"\\f151\"; }\n.bi-at::before { content: \"\\f152\"; }\n.bi-award-fill::before { content: \"\\f153\"; }\n.bi-award::before { content: \"\\f154\"; }\n.bi-back::before { content: \"\\f155\"; }\n.bi-backspace-fill::before { content: \"\\f156\"; }\n.bi-backspace-reverse-fill::before { content: \"\\f157\"; }\n.bi-backspace-reverse::before { content: \"\\f158\"; }\n.bi-backspace::before { content: \"\\f159\"; }\n.bi-badge-3d-fill::before { content: \"\\f15a\"; }\n.bi-badge-3d::before { content: \"\\f15b\"; }\n.bi-badge-4k-fill::before { content: \"\\f15c\"; }\n.bi-badge-4k::before { content: \"\\f15d\"; }\n.bi-badge-8k-fill::before { content: \"\\f15e\"; }\n.bi-badge-8k::before { content: \"\\f15f\"; }\n.bi-badge-ad-fill::before { content: \"\\f160\"; }\n.bi-badge-ad::before { content: \"\\f161\"; }\n.bi-badge-ar-fill::before { content: \"\\f162\"; }\n.bi-badge-ar::before { content: \"\\f163\"; }\n.bi-badge-cc-fill::before { content: \"\\f164\"; }\n.bi-badge-cc::before { content: \"\\f165\"; }\n.bi-badge-hd-fill::before { content: \"\\f166\"; }\n.bi-badge-hd::before { content: \"\\f167\"; }\n.bi-badge-tm-fill::before { content: \"\\f168\"; }\n.bi-badge-tm::before { content: \"\\f169\"; }\n.bi-badge-vo-fill::before { content: \"\\f16a\"; }\n.bi-badge-vo::before { content: \"\\f16b\"; }\n.bi-badge-vr-fill::before { content: \"\\f16c\"; }\n.bi-badge-vr::before { content: \"\\f16d\"; }\n.bi-badge-wc-fill::before { content: \"\\f16e\"; }\n.bi-badge-wc::before { content: \"\\f16f\"; }\n.bi-bag-check-fill::before { content: \"\\f170\"; }\n.bi-bag-check::before { content: \"\\f171\"; }\n.bi-bag-dash-fill::before { content: \"\\f172\"; }\n.bi-bag-dash::before { content: \"\\f173\"; }\n.bi-bag-fill::before { content: \"\\f174\"; }\n.bi-bag-plus-fill::before { content: \"\\f175\"; }\n.bi-bag-plus::before { content: \"\\f176\"; }\n.bi-bag-x-fill::before { content: \"\\f177\"; }\n.bi-bag-x::before { content: \"\\f178\"; }\n.bi-bag::before { content: \"\\f179\"; }\n.bi-bar-chart-fill::before { content: \"\\f17a\"; }\n.bi-bar-chart-line-fill::before { content: \"\\f17b\"; }\n.bi-bar-chart-line::before { content: \"\\f17c\"; }\n.bi-bar-chart-steps::before { content: \"\\f17d\"; }\n.bi-bar-chart::before { content: \"\\f17e\"; }\n.bi-basket-fill::before { content: \"\\f17f\"; }\n.bi-basket::before { content: \"\\f180\"; }\n.bi-basket2-fill::before { content: \"\\f181\"; }\n.bi-basket2::before { content: \"\\f182\"; }\n.bi-basket3-fill::before { content: \"\\f183\"; }\n.bi-basket3::before { content: \"\\f184\"; }\n.bi-battery-charging::before { content: \"\\f185\"; }\n.bi-battery-full::before { content: \"\\f186\"; }\n.bi-battery-half::before { content: \"\\f187\"; }\n.bi-battery::before { content: \"\\f188\"; }\n.bi-bell-fill::before { content: \"\\f189\"; }\n.bi-bell::before { content: \"\\f18a\"; }\n.bi-bezier::before { content: \"\\f18b\"; }\n.bi-bezier2::before { content: \"\\f18c\"; }\n.bi-bicycle::before { content: \"\\f18d\"; }\n.bi-binoculars-fill::before { content: \"\\f18e\"; }\n.bi-binoculars::before { content: \"\\f18f\"; }\n.bi-blockquote-left::before { content: \"\\f190\"; }\n.bi-blockquote-right::before { content: \"\\f191\"; }\n.bi-book-fill::before { content: \"\\f192\"; }\n.bi-book-half::before { content: \"\\f193\"; }\n.bi-book::before { content: \"\\f194\"; }\n.bi-bookmark-check-fill::before { content: \"\\f195\"; }\n.bi-bookmark-check::before { content: \"\\f196\"; }\n.bi-bookmark-dash-fill::before { content: \"\\f197\"; }\n.bi-bookmark-dash::before { content: \"\\f198\"; }\n.bi-bookmark-fill::before { content: \"\\f199\"; }\n.bi-bookmark-heart-fill::before { content: \"\\f19a\"; }\n.bi-bookmark-heart::before { content: \"\\f19b\"; }\n.bi-bookmark-plus-fill::before { content: \"\\f19c\"; }\n.bi-bookmark-plus::before { content: \"\\f19d\"; }\n.bi-bookmark-star-fill::before { content: \"\\f19e\"; }\n.bi-bookmark-star::before { content: \"\\f19f\"; }\n.bi-bookmark-x-fill::before { content: \"\\f1a0\"; }\n.bi-bookmark-x::before { content: \"\\f1a1\"; }\n.bi-bookmark::before { content: \"\\f1a2\"; }\n.bi-bookmarks-fill::before { content: \"\\f1a3\"; }\n.bi-bookmarks::before { content: \"\\f1a4\"; }\n.bi-bookshelf::before { content: \"\\f1a5\"; }\n.bi-bootstrap-fill::before { content: \"\\f1a6\"; }\n.bi-bootstrap-reboot::before { content: \"\\f1a7\"; }\n.bi-bootstrap::before { content: \"\\f1a8\"; }\n.bi-border-all::before { content: \"\\f1a9\"; }\n.bi-border-bottom::before { content: \"\\f1aa\"; }\n.bi-border-center::before { content: \"\\f1ab\"; }\n.bi-border-inner::before { content: \"\\f1ac\"; }\n.bi-border-left::before { content: \"\\f1ad\"; }\n.bi-border-middle::before { content: \"\\f1ae\"; }\n.bi-border-outer::before { content: \"\\f1af\"; }\n.bi-border-right::before { content: \"\\f1b0\"; }\n.bi-border-style::before { content: \"\\f1b1\"; }\n.bi-border-top::before { content: \"\\f1b2\"; }\n.bi-border-width::before { content: \"\\f1b3\"; }\n.bi-border::before { content: \"\\f1b4\"; }\n.bi-bounding-box-circles::before { content: \"\\f1b5\"; }\n.bi-bounding-box::before { content: \"\\f1b6\"; }\n.bi-box-arrow-down-left::before { content: \"\\f1b7\"; }\n.bi-box-arrow-down-right::before { content: \"\\f1b8\"; }\n.bi-box-arrow-down::before { content: \"\\f1b9\"; }\n.bi-box-arrow-in-down-left::before { content: \"\\f1ba\"; }\n.bi-box-arrow-in-down-right::before { content: \"\\f1bb\"; }\n.bi-box-arrow-in-down::before { content: \"\\f1bc\"; }\n.bi-box-arrow-in-left::before { content: \"\\f1bd\"; }\n.bi-box-arrow-in-right::before { content: \"\\f1be\"; }\n.bi-box-arrow-in-up-left::before { content: \"\\f1bf\"; }\n.bi-box-arrow-in-up-right::before { content: \"\\f1c0\"; }\n.bi-box-arrow-in-up::before { content: \"\\f1c1\"; }\n.bi-box-arrow-left::before { content: \"\\f1c2\"; }\n.bi-box-arrow-right::before { content: \"\\f1c3\"; }\n.bi-box-arrow-up-left::before { content: \"\\f1c4\"; }\n.bi-box-arrow-up-right::before { content: \"\\f1c5\"; }\n.bi-box-arrow-up::before { content: \"\\f1c6\"; }\n.bi-box-seam::before { content: \"\\f1c7\"; }\n.bi-box::before { content: \"\\f1c8\"; }\n.bi-braces::before { content: \"\\f1c9\"; }\n.bi-bricks::before { content: \"\\f1ca\"; }\n.bi-briefcase-fill::before { content: \"\\f1cb\"; }\n.bi-briefcase::before { content: \"\\f1cc\"; }\n.bi-brightness-alt-high-fill::before { content: \"\\f1cd\"; }\n.bi-brightness-alt-high::before { content: \"\\f1ce\"; }\n.bi-brightness-alt-low-fill::before { content: \"\\f1cf\"; }\n.bi-brightness-alt-low::before { content: \"\\f1d0\"; }\n.bi-brightness-high-fill::before { content: \"\\f1d1\"; }\n.bi-brightness-high::before { content: \"\\f1d2\"; }\n.bi-brightness-low-fill::before { content: \"\\f1d3\"; }\n.bi-brightness-low::before { content: \"\\f1d4\"; }\n.bi-broadcast-pin::before { content: \"\\f1d5\"; }\n.bi-broadcast::before { content: \"\\f1d6\"; }\n.bi-brush-fill::before { content: \"\\f1d7\"; }\n.bi-brush::before { content: \"\\f1d8\"; }\n.bi-bucket-fill::before { content: \"\\f1d9\"; }\n.bi-bucket::before { content: \"\\f1da\"; }\n.bi-bug-fill::before { content: \"\\f1db\"; }\n.bi-bug::before { content: \"\\f1dc\"; }\n.bi-building::before { content: \"\\f1dd\"; }\n.bi-bullseye::before { content: \"\\f1de\"; }\n.bi-calculator-fill::before { content: \"\\f1df\"; }\n.bi-calculator::before { content: \"\\f1e0\"; }\n.bi-calendar-check-fill::before { content: \"\\f1e1\"; }\n.bi-calendar-check::before { content: \"\\f1e2\"; }\n.bi-calendar-date-fill::before { content: \"\\f1e3\"; }\n.bi-calendar-date::before { content: \"\\f1e4\"; }\n.bi-calendar-day-fill::before { content: \"\\f1e5\"; }\n.bi-calendar-day::before { content: \"\\f1e6\"; }\n.bi-calendar-event-fill::before { content: \"\\f1e7\"; }\n.bi-calendar-event::before { content: \"\\f1e8\"; }\n.bi-calendar-fill::before { content: \"\\f1e9\"; }\n.bi-calendar-minus-fill::before { content: \"\\f1ea\"; }\n.bi-calendar-minus::before { content: \"\\f1eb\"; }\n.bi-calendar-month-fill::before { content: \"\\f1ec\"; }\n.bi-calendar-month::before { content: \"\\f1ed\"; }\n.bi-calendar-plus-fill::before { content: \"\\f1ee\"; }\n.bi-calendar-plus::before { content: \"\\f1ef\"; }\n.bi-calendar-range-fill::before { content: \"\\f1f0\"; }\n.bi-calendar-range::before { content: \"\\f1f1\"; }\n.bi-calendar-week-fill::before { content: \"\\f1f2\"; }\n.bi-calendar-week::before { content: \"\\f1f3\"; }\n.bi-calendar-x-fill::before { content: \"\\f1f4\"; }\n.bi-calendar-x::before { content: \"\\f1f5\"; }\n.bi-calendar::before { content: \"\\f1f6\"; }\n.bi-calendar2-check-fill::before { content: \"\\f1f7\"; }\n.bi-calendar2-check::before { content: \"\\f1f8\"; }\n.bi-calendar2-date-fill::before { content: \"\\f1f9\"; }\n.bi-calendar2-date::before { content: \"\\f1fa\"; }\n.bi-calendar2-day-fill::before { content: \"\\f1fb\"; }\n.bi-calendar2-day::before { content: \"\\f1fc\"; }\n.bi-calendar2-event-fill::before { content: \"\\f1fd\"; }\n.bi-calendar2-event::before { content: \"\\f1fe\"; }\n.bi-calendar2-fill::before { content: \"\\f1ff\"; }\n.bi-calendar2-minus-fill::before { content: \"\\f200\"; }\n.bi-calendar2-minus::before { content: \"\\f201\"; }\n.bi-calendar2-month-fill::before { content: \"\\f202\"; }\n.bi-calendar2-month::before { content: \"\\f203\"; }\n.bi-calendar2-plus-fill::before { content: \"\\f204\"; }\n.bi-calendar2-plus::before { content: \"\\f205\"; }\n.bi-calendar2-range-fill::before { content: \"\\f206\"; }\n.bi-calendar2-range::before { content: \"\\f207\"; }\n.bi-calendar2-week-fill::before { content: \"\\f208\"; }\n.bi-calendar2-week::before { content: \"\\f209\"; }\n.bi-calendar2-x-fill::before { content: \"\\f20a\"; }\n.bi-calendar2-x::before { content: \"\\f20b\"; }\n.bi-calendar2::before { content: \"\\f20c\"; }\n.bi-calendar3-event-fill::before { content: \"\\f20d\"; }\n.bi-calendar3-event::before { content: \"\\f20e\"; }\n.bi-calendar3-fill::before { content: \"\\f20f\"; }\n.bi-calendar3-range-fill::before { content: \"\\f210\"; }\n.bi-calendar3-range::before { content: \"\\f211\"; }\n.bi-calendar3-week-fill::before { content: \"\\f212\"; }\n.bi-calendar3-week::before { content: \"\\f213\"; }\n.bi-calendar3::before { content: \"\\f214\"; }\n.bi-calendar4-event::before { content: \"\\f215\"; }\n.bi-calendar4-range::before { content: \"\\f216\"; }\n.bi-calendar4-week::before { content: \"\\f217\"; }\n.bi-calendar4::before { content: \"\\f218\"; }\n.bi-camera-fill::before { content: \"\\f219\"; }\n.bi-camera-reels-fill::before { content: \"\\f21a\"; }\n.bi-camera-reels::before { content: \"\\f21b\"; }\n.bi-camera-video-fill::before { content: \"\\f21c\"; }\n.bi-camera-video-off-fill::before { content: \"\\f21d\"; }\n.bi-camera-video-off::before { content: \"\\f21e\"; }\n.bi-camera-video::before { content: \"\\f21f\"; }\n.bi-camera::before { content: \"\\f220\"; }\n.bi-camera2::before { content: \"\\f221\"; }\n.bi-capslock-fill::before { content: \"\\f222\"; }\n.bi-capslock::before { content: \"\\f223\"; }\n.bi-card-checklist::before { content: \"\\f224\"; }\n.bi-card-heading::before { content: \"\\f225\"; }\n.bi-card-image::before { content: \"\\f226\"; }\n.bi-card-list::before { content: \"\\f227\"; }\n.bi-card-text::before { content: \"\\f228\"; }\n.bi-caret-down-fill::before { content: \"\\f229\"; }\n.bi-caret-down-square-fill::before { content: \"\\f22a\"; }\n.bi-caret-down-square::before { content: \"\\f22b\"; }\n.bi-caret-down::before { content: \"\\f22c\"; }\n.bi-caret-left-fill::before { content: \"\\f22d\"; }\n.bi-caret-left-square-fill::before { content: \"\\f22e\"; }\n.bi-caret-left-square::before { content: \"\\f22f\"; }\n.bi-caret-left::before { content: \"\\f230\"; }\n.bi-caret-right-fill::before { content: \"\\f231\"; }\n.bi-caret-right-square-fill::before { content: \"\\f232\"; }\n.bi-caret-right-square::before { content: \"\\f233\"; }\n.bi-caret-right::before { content: \"\\f234\"; }\n.bi-caret-up-fill::before { content: \"\\f235\"; }\n.bi-caret-up-square-fill::before { content: \"\\f236\"; }\n.bi-caret-up-square::before { content: \"\\f237\"; }\n.bi-caret-up::before { content: \"\\f238\"; }\n.bi-cart-check-fill::before { content: \"\\f239\"; }\n.bi-cart-check::before { content: \"\\f23a\"; }\n.bi-cart-dash-fill::before { content: \"\\f23b\"; }\n.bi-cart-dash::before { content: \"\\f23c\"; }\n.bi-cart-fill::before { content: \"\\f23d\"; }\n.bi-cart-plus-fill::before { content: \"\\f23e\"; }\n.bi-cart-plus::before { content: \"\\f23f\"; }\n.bi-cart-x-fill::before { content: \"\\f240\"; }\n.bi-cart-x::before { content: \"\\f241\"; }\n.bi-cart::before { content: \"\\f242\"; }\n.bi-cart2::before { content: \"\\f243\"; }\n.bi-cart3::before { content: \"\\f244\"; }\n.bi-cart4::before { content: \"\\f245\"; }\n.bi-cash-stack::before { content: \"\\f246\"; }\n.bi-cash::before { content: \"\\f247\"; }\n.bi-cast::before { content: \"\\f248\"; }\n.bi-chat-dots-fill::before { content: \"\\f249\"; }\n.bi-chat-dots::before { content: \"\\f24a\"; }\n.bi-chat-fill::before { content: \"\\f24b\"; }\n.bi-chat-left-dots-fill::before { content: \"\\f24c\"; }\n.bi-chat-left-dots::before { content: \"\\f24d\"; }\n.bi-chat-left-fill::before { content: \"\\f24e\"; }\n.bi-chat-left-quote-fill::before { content: \"\\f24f\"; }\n.bi-chat-left-quote::before { content: \"\\f250\"; }\n.bi-chat-left-text-fill::before { content: \"\\f251\"; }\n.bi-chat-left-text::before { content: \"\\f252\"; }\n.bi-chat-left::before { content: \"\\f253\"; }\n.bi-chat-quote-fill::before { content: \"\\f254\"; }\n.bi-chat-quote::before { content: \"\\f255\"; }\n.bi-chat-right-dots-fill::before { content: \"\\f256\"; }\n.bi-chat-right-dots::before { content: \"\\f257\"; }\n.bi-chat-right-fill::before { content: \"\\f258\"; }\n.bi-chat-right-quote-fill::before { content: \"\\f259\"; }\n.bi-chat-right-quote::before { content: \"\\f25a\"; }\n.bi-chat-right-text-fill::before { content: \"\\f25b\"; }\n.bi-chat-right-text::before { content: \"\\f25c\"; }\n.bi-chat-right::before { content: \"\\f25d\"; }\n.bi-chat-square-dots-fill::before { content: \"\\f25e\"; }\n.bi-chat-square-dots::before { content: \"\\f25f\"; }\n.bi-chat-square-fill::before { content: \"\\f260\"; }\n.bi-chat-square-quote-fill::before { content: \"\\f261\"; }\n.bi-chat-square-quote::before { content: \"\\f262\"; }\n.bi-chat-square-text-fill::before { content: \"\\f263\"; }\n.bi-chat-square-text::before { content: \"\\f264\"; }\n.bi-chat-square::before { content: \"\\f265\"; }\n.bi-chat-text-fill::before { content: \"\\f266\"; }\n.bi-chat-text::before { content: \"\\f267\"; }\n.bi-chat::before { content: \"\\f268\"; }\n.bi-check-all::before { content: \"\\f269\"; }\n.bi-check-circle-fill::before { content: \"\\f26a\"; }\n.bi-check-circle::before { content: \"\\f26b\"; }\n.bi-check-square-fill::before { content: \"\\f26c\"; }\n.bi-check-square::before { content: \"\\f26d\"; }\n.bi-check::before { content: \"\\f26e\"; }\n.bi-check2-all::before { content: \"\\f26f\"; }\n.bi-check2-circle::before { content: \"\\f270\"; }\n.bi-check2-square::before { content: \"\\f271\"; }\n.bi-check2::before { content: \"\\f272\"; }\n.bi-chevron-bar-contract::before { content: \"\\f273\"; }\n.bi-chevron-bar-down::before { content: \"\\f274\"; }\n.bi-chevron-bar-expand::before { content: \"\\f275\"; }\n.bi-chevron-bar-left::before { content: \"\\f276\"; }\n.bi-chevron-bar-right::before { content: \"\\f277\"; }\n.bi-chevron-bar-up::before { content: \"\\f278\"; }\n.bi-chevron-compact-down::before { content: \"\\f279\"; }\n.bi-chevron-compact-left::before { content: \"\\f27a\"; }\n.bi-chevron-compact-right::before { content: \"\\f27b\"; }\n.bi-chevron-compact-up::before { content: \"\\f27c\"; }\n.bi-chevron-contract::before { content: \"\\f27d\"; }\n.bi-chevron-double-down::before { content: \"\\f27e\"; }\n.bi-chevron-double-left::before { content: \"\\f27f\"; }\n.bi-chevron-double-right::before { content: \"\\f280\"; }\n.bi-chevron-double-up::before { content: \"\\f281\"; }\n.bi-chevron-down::before { content: \"\\f282\"; }\n.bi-chevron-expand::before { content: \"\\f283\"; }\n.bi-chevron-left::before { content: \"\\f284\"; }\n.bi-chevron-right::before { content: \"\\f285\"; }\n.bi-chevron-up::before { content: \"\\f286\"; }\n.bi-circle-fill::before { content: \"\\f287\"; }\n.bi-circle-half::before { content: \"\\f288\"; }\n.bi-circle-square::before { content: \"\\f289\"; }\n.bi-circle::before { content: \"\\f28a\"; }\n.bi-clipboard-check::before { content: \"\\f28b\"; }\n.bi-clipboard-data::before { content: \"\\f28c\"; }\n.bi-clipboard-minus::before { content: \"\\f28d\"; }\n.bi-clipboard-plus::before { content: \"\\f28e\"; }\n.bi-clipboard-x::before { content: \"\\f28f\"; }\n.bi-clipboard::before { content: \"\\f290\"; }\n.bi-clock-fill::before { content: \"\\f291\"; }\n.bi-clock-history::before { content: \"\\f292\"; }\n.bi-clock::before { content: \"\\f293\"; }\n.bi-cloud-arrow-down-fill::before { content: \"\\f294\"; }\n.bi-cloud-arrow-down::before { content: \"\\f295\"; }\n.bi-cloud-arrow-up-fill::before { content: \"\\f296\"; }\n.bi-cloud-arrow-up::before { content: \"\\f297\"; }\n.bi-cloud-check-fill::before { content: \"\\f298\"; }\n.bi-cloud-check::before { content: \"\\f299\"; }\n.bi-cloud-download-fill::before { content: \"\\f29a\"; }\n.bi-cloud-download::before { content: \"\\f29b\"; }\n.bi-cloud-drizzle-fill::before { content: \"\\f29c\"; }\n.bi-cloud-drizzle::before { content: \"\\f29d\"; }\n.bi-cloud-fill::before { content: \"\\f29e\"; }\n.bi-cloud-fog-fill::before { content: \"\\f29f\"; }\n.bi-cloud-fog::before { content: \"\\f2a0\"; }\n.bi-cloud-fog2-fill::before { content: \"\\f2a1\"; }\n.bi-cloud-fog2::before { content: \"\\f2a2\"; }\n.bi-cloud-hail-fill::before { content: \"\\f2a3\"; }\n.bi-cloud-hail::before { content: \"\\f2a4\"; }\n.bi-cloud-haze-1::before { content: \"\\f2a5\"; }\n.bi-cloud-haze-fill::before { content: \"\\f2a6\"; }\n.bi-cloud-haze::before { content: \"\\f2a7\"; }\n.bi-cloud-haze2-fill::before { content: \"\\f2a8\"; }\n.bi-cloud-lightning-fill::before { content: \"\\f2a9\"; }\n.bi-cloud-lightning-rain-fill::before { content: \"\\f2aa\"; }\n.bi-cloud-lightning-rain::before { content: \"\\f2ab\"; }\n.bi-cloud-lightning::before { content: \"\\f2ac\"; }\n.bi-cloud-minus-fill::before { content: \"\\f2ad\"; }\n.bi-cloud-minus::before { content: \"\\f2ae\"; }\n.bi-cloud-moon-fill::before { content: \"\\f2af\"; }\n.bi-cloud-moon::before { content: \"\\f2b0\"; }\n.bi-cloud-plus-fill::before { content: \"\\f2b1\"; }\n.bi-cloud-plus::before { content: \"\\f2b2\"; }\n.bi-cloud-rain-fill::before { content: \"\\f2b3\"; }\n.bi-cloud-rain-heavy-fill::before { content: \"\\f2b4\"; }\n.bi-cloud-rain-heavy::before { content: \"\\f2b5\"; }\n.bi-cloud-rain::before { content: \"\\f2b6\"; }\n.bi-cloud-slash-fill::before { content: \"\\f2b7\"; }\n.bi-cloud-slash::before { content: \"\\f2b8\"; }\n.bi-cloud-sleet-fill::before { content: \"\\f2b9\"; }\n.bi-cloud-sleet::before { content: \"\\f2ba\"; }\n.bi-cloud-snow-fill::before { content: \"\\f2bb\"; }\n.bi-cloud-snow::before { content: \"\\f2bc\"; }\n.bi-cloud-sun-fill::before { content: \"\\f2bd\"; }\n.bi-cloud-sun::before { content: \"\\f2be\"; }\n.bi-cloud-upload-fill::before { content: \"\\f2bf\"; }\n.bi-cloud-upload::before { content: \"\\f2c0\"; }\n.bi-cloud::before { content: \"\\f2c1\"; }\n.bi-clouds-fill::before { content: \"\\f2c2\"; }\n.bi-clouds::before { content: \"\\f2c3\"; }\n.bi-cloudy-fill::before { content: \"\\f2c4\"; }\n.bi-cloudy::before { content: \"\\f2c5\"; }\n.bi-code-slash::before { content: \"\\f2c6\"; }\n.bi-code-square::before { content: \"\\f2c7\"; }\n.bi-code::before { content: \"\\f2c8\"; }\n.bi-collection-fill::before { content: \"\\f2c9\"; }\n.bi-collection-play-fill::before { content: \"\\f2ca\"; }\n.bi-collection-play::before { content: \"\\f2cb\"; }\n.bi-collection::before { content: \"\\f2cc\"; }\n.bi-columns-gap::before { content: \"\\f2cd\"; }\n.bi-columns::before { content: \"\\f2ce\"; }\n.bi-command::before { content: \"\\f2cf\"; }\n.bi-compass-fill::before { content: \"\\f2d0\"; }\n.bi-compass::before { content: \"\\f2d1\"; }\n.bi-cone-striped::before { content: \"\\f2d2\"; }\n.bi-cone::before { content: \"\\f2d3\"; }\n.bi-controller::before { content: \"\\f2d4\"; }\n.bi-cpu-fill::before { content: \"\\f2d5\"; }\n.bi-cpu::before { content: \"\\f2d6\"; }\n.bi-credit-card-2-back-fill::before { content: \"\\f2d7\"; }\n.bi-credit-card-2-back::before { content: \"\\f2d8\"; }\n.bi-credit-card-2-front-fill::before { content: \"\\f2d9\"; }\n.bi-credit-card-2-front::before { content: \"\\f2da\"; }\n.bi-credit-card-fill::before { content: \"\\f2db\"; }\n.bi-credit-card::before { content: \"\\f2dc\"; }\n.bi-crop::before { content: \"\\f2dd\"; }\n.bi-cup-fill::before { content: \"\\f2de\"; }\n.bi-cup-straw::before { content: \"\\f2df\"; }\n.bi-cup::before { content: \"\\f2e0\"; }\n.bi-cursor-fill::before { content: \"\\f2e1\"; }\n.bi-cursor-text::before { content: \"\\f2e2\"; }\n.bi-cursor::before { content: \"\\f2e3\"; }\n.bi-dash-circle-dotted::before { content: \"\\f2e4\"; }\n.bi-dash-circle-fill::before { content: \"\\f2e5\"; }\n.bi-dash-circle::before { content: \"\\f2e6\"; }\n.bi-dash-square-dotted::before { content: \"\\f2e7\"; }\n.bi-dash-square-fill::before { content: \"\\f2e8\"; }\n.bi-dash-square::before { content: \"\\f2e9\"; }\n.bi-dash::before { content: \"\\f2ea\"; }\n.bi-diagram-2-fill::before { content: \"\\f2eb\"; }\n.bi-diagram-2::before { content: \"\\f2ec\"; }\n.bi-diagram-3-fill::before { content: \"\\f2ed\"; }\n.bi-diagram-3::before { content: \"\\f2ee\"; }\n.bi-diamond-fill::before { content: \"\\f2ef\"; }\n.bi-diamond-half::before { content: \"\\f2f0\"; }\n.bi-diamond::before { content: \"\\f2f1\"; }\n.bi-dice-1-fill::before { content: \"\\f2f2\"; }\n.bi-dice-1::before { content: \"\\f2f3\"; }\n.bi-dice-2-fill::before { content: \"\\f2f4\"; }\n.bi-dice-2::before { content: \"\\f2f5\"; }\n.bi-dice-3-fill::before { content: \"\\f2f6\"; }\n.bi-dice-3::before { content: \"\\f2f7\"; }\n.bi-dice-4-fill::before { content: \"\\f2f8\"; }\n.bi-dice-4::before { content: \"\\f2f9\"; }\n.bi-dice-5-fill::before { content: \"\\f2fa\"; }\n.bi-dice-5::before { content: \"\\f2fb\"; }\n.bi-dice-6-fill::before { content: \"\\f2fc\"; }\n.bi-dice-6::before { content: \"\\f2fd\"; }\n.bi-disc-fill::before { content: \"\\f2fe\"; }\n.bi-disc::before { content: \"\\f2ff\"; }\n.bi-discord::before { content: \"\\f300\"; }\n.bi-display-fill::before { content: \"\\f301\"; }\n.bi-display::before { content: \"\\f302\"; }\n.bi-distribute-horizontal::before { content: \"\\f303\"; }\n.bi-distribute-vertical::before { content: \"\\f304\"; }\n.bi-door-closed-fill::before { content: \"\\f305\"; }\n.bi-door-closed::before { content: \"\\f306\"; }\n.bi-door-open-fill::before { content: \"\\f307\"; }\n.bi-door-open::before { content: \"\\f308\"; }\n.bi-dot::before { content: \"\\f309\"; }\n.bi-download::before { content: \"\\f30a\"; }\n.bi-droplet-fill::before { content: \"\\f30b\"; }\n.bi-droplet-half::before { content: \"\\f30c\"; }\n.bi-droplet::before { content: \"\\f30d\"; }\n.bi-earbuds::before { content: \"\\f30e\"; }\n.bi-easel-fill::before { content: \"\\f30f\"; }\n.bi-easel::before { content: \"\\f310\"; }\n.bi-egg-fill::before { content: \"\\f311\"; }\n.bi-egg-fried::before { content: \"\\f312\"; }\n.bi-egg::before { content: \"\\f313\"; }\n.bi-eject-fill::before { content: \"\\f314\"; }\n.bi-eject::before { content: \"\\f315\"; }\n.bi-emoji-angry-fill::before { content: \"\\f316\"; }\n.bi-emoji-angry::before { content: \"\\f317\"; }\n.bi-emoji-dizzy-fill::before { content: \"\\f318\"; }\n.bi-emoji-dizzy::before { content: \"\\f319\"; }\n.bi-emoji-expressionless-fill::before { content: \"\\f31a\"; }\n.bi-emoji-expressionless::before { content: \"\\f31b\"; }\n.bi-emoji-frown-fill::before { content: \"\\f31c\"; }\n.bi-emoji-frown::before { content: \"\\f31d\"; }\n.bi-emoji-heart-eyes-fill::before { content: \"\\f31e\"; }\n.bi-emoji-heart-eyes::before { content: \"\\f31f\"; }\n.bi-emoji-laughing-fill::before { content: \"\\f320\"; }\n.bi-emoji-laughing::before { content: \"\\f321\"; }\n.bi-emoji-neutral-fill::before { content: \"\\f322\"; }\n.bi-emoji-neutral::before { content: \"\\f323\"; }\n.bi-emoji-smile-fill::before { content: \"\\f324\"; }\n.bi-emoji-smile-upside-down-fill::before { content: \"\\f325\"; }\n.bi-emoji-smile-upside-down::before { content: \"\\f326\"; }\n.bi-emoji-smile::before { content: \"\\f327\"; }\n.bi-emoji-sunglasses-fill::before { content: \"\\f328\"; }\n.bi-emoji-sunglasses::before { content: \"\\f329\"; }\n.bi-emoji-wink-fill::before { content: \"\\f32a\"; }\n.bi-emoji-wink::before { content: \"\\f32b\"; }\n.bi-envelope-fill::before { content: \"\\f32c\"; }\n.bi-envelope-open-fill::before { content: \"\\f32d\"; }\n.bi-envelope-open::before { content: \"\\f32e\"; }\n.bi-envelope::before { content: \"\\f32f\"; }\n.bi-eraser-fill::before { content: \"\\f330\"; }\n.bi-eraser::before { content: \"\\f331\"; }\n.bi-exclamation-circle-fill::before { content: \"\\f332\"; }\n.bi-exclamation-circle::before { content: \"\\f333\"; }\n.bi-exclamation-diamond-fill::before { content: \"\\f334\"; }\n.bi-exclamation-diamond::before { content: \"\\f335\"; }\n.bi-exclamation-octagon-fill::before { content: \"\\f336\"; }\n.bi-exclamation-octagon::before { content: \"\\f337\"; }\n.bi-exclamation-square-fill::before { content: \"\\f338\"; }\n.bi-exclamation-square::before { content: \"\\f339\"; }\n.bi-exclamation-triangle-fill::before { content: \"\\f33a\"; }\n.bi-exclamation-triangle::before { content: \"\\f33b\"; }\n.bi-exclamation::before { content: \"\\f33c\"; }\n.bi-exclude::before { content: \"\\f33d\"; }\n.bi-eye-fill::before { content: \"\\f33e\"; }\n.bi-eye-slash-fill::before { content: \"\\f33f\"; }\n.bi-eye-slash::before { content: \"\\f340\"; }\n.bi-eye::before { content: \"\\f341\"; }\n.bi-eyedropper::before { content: \"\\f342\"; }\n.bi-eyeglasses::before { content: \"\\f343\"; }\n.bi-facebook::before { content: \"\\f344\"; }\n.bi-file-arrow-down-fill::before { content: \"\\f345\"; }\n.bi-file-arrow-down::before { content: \"\\f346\"; }\n.bi-file-arrow-up-fill::before { content: \"\\f347\"; }\n.bi-file-arrow-up::before { content: \"\\f348\"; }\n.bi-file-bar-graph-fill::before { content: \"\\f349\"; }\n.bi-file-bar-graph::before { content: \"\\f34a\"; }\n.bi-file-binary-fill::before { content: \"\\f34b\"; }\n.bi-file-binary::before { content: \"\\f34c\"; }\n.bi-file-break-fill::before { content: \"\\f34d\"; }\n.bi-file-break::before { content: \"\\f34e\"; }\n.bi-file-check-fill::before { content: \"\\f34f\"; }\n.bi-file-check::before { content: \"\\f350\"; }\n.bi-file-code-fill::before { content: \"\\f351\"; }\n.bi-file-code::before { content: \"\\f352\"; }\n.bi-file-diff-fill::before { content: \"\\f353\"; }\n.bi-file-diff::before { content: \"\\f354\"; }\n.bi-file-earmark-arrow-down-fill::before { content: \"\\f355\"; }\n.bi-file-earmark-arrow-down::before { content: \"\\f356\"; }\n.bi-file-earmark-arrow-up-fill::before { content: \"\\f357\"; }\n.bi-file-earmark-arrow-up::before { content: \"\\f358\"; }\n.bi-file-earmark-bar-graph-fill::before { content: \"\\f359\"; }\n.bi-file-earmark-bar-graph::before { content: \"\\f35a\"; }\n.bi-file-earmark-binary-fill::before { content: \"\\f35b\"; }\n.bi-file-earmark-binary::before { content: \"\\f35c\"; }\n.bi-file-earmark-break-fill::before { content: \"\\f35d\"; }\n.bi-file-earmark-break::before { content: \"\\f35e\"; }\n.bi-file-earmark-check-fill::before { content: \"\\f35f\"; }\n.bi-file-earmark-check::before { content: \"\\f360\"; }\n.bi-file-earmark-code-fill::before { content: \"\\f361\"; }\n.bi-file-earmark-code::before { content: \"\\f362\"; }\n.bi-file-earmark-diff-fill::before { content: \"\\f363\"; }\n.bi-file-earmark-diff::before { content: \"\\f364\"; }\n.bi-file-earmark-easel-fill::before { content: \"\\f365\"; }\n.bi-file-earmark-easel::before { content: \"\\f366\"; }\n.bi-file-earmark-excel-fill::before { content: \"\\f367\"; }\n.bi-file-earmark-excel::before { content: \"\\f368\"; }\n.bi-file-earmark-fill::before { content: \"\\f369\"; }\n.bi-file-earmark-font-fill::before { content: \"\\f36a\"; }\n.bi-file-earmark-font::before { content: \"\\f36b\"; }\n.bi-file-earmark-image-fill::before { content: \"\\f36c\"; }\n.bi-file-earmark-image::before { content: \"\\f36d\"; }\n.bi-file-earmark-lock-fill::before { content: \"\\f36e\"; }\n.bi-file-earmark-lock::before { content: \"\\f36f\"; }\n.bi-file-earmark-lock2-fill::before { content: \"\\f370\"; }\n.bi-file-earmark-lock2::before { content: \"\\f371\"; }\n.bi-file-earmark-medical-fill::before { content: \"\\f372\"; }\n.bi-file-earmark-medical::before { content: \"\\f373\"; }\n.bi-file-earmark-minus-fill::before { content: \"\\f374\"; }\n.bi-file-earmark-minus::before { content: \"\\f375\"; }\n.bi-file-earmark-music-fill::before { content: \"\\f376\"; }\n.bi-file-earmark-music::before { content: \"\\f377\"; }\n.bi-file-earmark-person-fill::before { content: \"\\f378\"; }\n.bi-file-earmark-person::before { content: \"\\f379\"; }\n.bi-file-earmark-play-fill::before { content: \"\\f37a\"; }\n.bi-file-earmark-play::before { content: \"\\f37b\"; }\n.bi-file-earmark-plus-fill::before { content: \"\\f37c\"; }\n.bi-file-earmark-plus::before { content: \"\\f37d\"; }\n.bi-file-earmark-post-fill::before { content: \"\\f37e\"; }\n.bi-file-earmark-post::before { content: \"\\f37f\"; }\n.bi-file-earmark-ppt-fill::before { content: \"\\f380\"; }\n.bi-file-earmark-ppt::before { content: \"\\f381\"; }\n.bi-file-earmark-richtext-fill::before { content: \"\\f382\"; }\n.bi-file-earmark-richtext::before { content: \"\\f383\"; }\n.bi-file-earmark-ruled-fill::before { content: \"\\f384\"; }\n.bi-file-earmark-ruled::before { content: \"\\f385\"; }\n.bi-file-earmark-slides-fill::before { content: \"\\f386\"; }\n.bi-file-earmark-slides::before { content: \"\\f387\"; }\n.bi-file-earmark-spreadsheet-fill::before { content: \"\\f388\"; }\n.bi-file-earmark-spreadsheet::before { content: \"\\f389\"; }\n.bi-file-earmark-text-fill::before { content: \"\\f38a\"; }\n.bi-file-earmark-text::before { content: \"\\f38b\"; }\n.bi-file-earmark-word-fill::before { content: \"\\f38c\"; }\n.bi-file-earmark-word::before { content: \"\\f38d\"; }\n.bi-file-earmark-x-fill::before { content: \"\\f38e\"; }\n.bi-file-earmark-x::before { content: \"\\f38f\"; }\n.bi-file-earmark-zip-fill::before { content: \"\\f390\"; }\n.bi-file-earmark-zip::before { content: \"\\f391\"; }\n.bi-file-earmark::before { content: \"\\f392\"; }\n.bi-file-easel-fill::before { content: \"\\f393\"; }\n.bi-file-easel::before { content: \"\\f394\"; }\n.bi-file-excel-fill::before { content: \"\\f395\"; }\n.bi-file-excel::before { content: \"\\f396\"; }\n.bi-file-fill::before { content: \"\\f397\"; }\n.bi-file-font-fill::before { content: \"\\f398\"; }\n.bi-file-font::before { content: \"\\f399\"; }\n.bi-file-image-fill::before { content: \"\\f39a\"; }\n.bi-file-image::before { content: \"\\f39b\"; }\n.bi-file-lock-fill::before { content: \"\\f39c\"; }\n.bi-file-lock::before { content: \"\\f39d\"; }\n.bi-file-lock2-fill::before { content: \"\\f39e\"; }\n.bi-file-lock2::before { content: \"\\f39f\"; }\n.bi-file-medical-fill::before { content: \"\\f3a0\"; }\n.bi-file-medical::before { content: \"\\f3a1\"; }\n.bi-file-minus-fill::before { content: \"\\f3a2\"; }\n.bi-file-minus::before { content: \"\\f3a3\"; }\n.bi-file-music-fill::before { content: \"\\f3a4\"; }\n.bi-file-music::before { content: \"\\f3a5\"; }\n.bi-file-person-fill::before { content: \"\\f3a6\"; }\n.bi-file-person::before { content: \"\\f3a7\"; }\n.bi-file-play-fill::before { content: \"\\f3a8\"; }\n.bi-file-play::before { content: \"\\f3a9\"; }\n.bi-file-plus-fill::before { content: \"\\f3aa\"; }\n.bi-file-plus::before { content: \"\\f3ab\"; }\n.bi-file-post-fill::before { content: \"\\f3ac\"; }\n.bi-file-post::before { content: \"\\f3ad\"; }\n.bi-file-ppt-fill::before { content: \"\\f3ae\"; }\n.bi-file-ppt::before { content: \"\\f3af\"; }\n.bi-file-richtext-fill::before { content: \"\\f3b0\"; }\n.bi-file-richtext::before { content: \"\\f3b1\"; }\n.bi-file-ruled-fill::before { content: \"\\f3b2\"; }\n.bi-file-ruled::before { content: \"\\f3b3\"; }\n.bi-file-slides-fill::before { content: \"\\f3b4\"; }\n.bi-file-slides::before { content: \"\\f3b5\"; }\n.bi-file-spreadsheet-fill::before { content: \"\\f3b6\"; }\n.bi-file-spreadsheet::before { content: \"\\f3b7\"; }\n.bi-file-text-fill::before { content: \"\\f3b8\"; }\n.bi-file-text::before { content: \"\\f3b9\"; }\n.bi-file-word-fill::before { content: \"\\f3ba\"; }\n.bi-file-word::before { content: \"\\f3bb\"; }\n.bi-file-x-fill::before { content: \"\\f3bc\"; }\n.bi-file-x::before { content: \"\\f3bd\"; }\n.bi-file-zip-fill::before { content: \"\\f3be\"; }\n.bi-file-zip::before { content: \"\\f3bf\"; }\n.bi-file::before { content: \"\\f3c0\"; }\n.bi-files-alt::before { content: \"\\f3c1\"; }\n.bi-files::before { content: \"\\f3c2\"; }\n.bi-film::before { content: \"\\f3c3\"; }\n.bi-filter-circle-fill::before { content: \"\\f3c4\"; }\n.bi-filter-circle::before { content: \"\\f3c5\"; }\n.bi-filter-left::before { content: \"\\f3c6\"; }\n.bi-filter-right::before { content: \"\\f3c7\"; }\n.bi-filter-square-fill::before { content: \"\\f3c8\"; }\n.bi-filter-square::before { content: \"\\f3c9\"; }\n.bi-filter::before { content: \"\\f3ca\"; }\n.bi-flag-fill::before { content: \"\\f3cb\"; }\n.bi-flag::before { content: \"\\f3cc\"; }\n.bi-flower1::before { content: \"\\f3cd\"; }\n.bi-flower2::before { content: \"\\f3ce\"; }\n.bi-flower3::before { content: \"\\f3cf\"; }\n.bi-folder-check::before { content: \"\\f3d0\"; }\n.bi-folder-fill::before { content: \"\\f3d1\"; }\n.bi-folder-minus::before { content: \"\\f3d2\"; }\n.bi-folder-plus::before { content: \"\\f3d3\"; }\n.bi-folder-symlink-fill::before { content: \"\\f3d4\"; }\n.bi-folder-symlink::before { content: \"\\f3d5\"; }\n.bi-folder-x::before { content: \"\\f3d6\"; }\n.bi-folder::before { content: \"\\f3d7\"; }\n.bi-folder2-open::before { content: \"\\f3d8\"; }\n.bi-folder2::before { content: \"\\f3d9\"; }\n.bi-fonts::before { content: \"\\f3da\"; }\n.bi-forward-fill::before { content: \"\\f3db\"; }\n.bi-forward::before { content: \"\\f3dc\"; }\n.bi-front::before { content: \"\\f3dd\"; }\n.bi-fullscreen-exit::before { content: \"\\f3de\"; }\n.bi-fullscreen::before { content: \"\\f3df\"; }\n.bi-funnel-fill::before { content: \"\\f3e0\"; }\n.bi-funnel::before { content: \"\\f3e1\"; }\n.bi-gear-fill::before { content: \"\\f3e2\"; }\n.bi-gear-wide-connected::before { content: \"\\f3e3\"; }\n.bi-gear-wide::before { content: \"\\f3e4\"; }\n.bi-gear::before { content: \"\\f3e5\"; }\n.bi-gem::before { content: \"\\f3e6\"; }\n.bi-geo-alt-fill::before { content: \"\\f3e7\"; }\n.bi-geo-alt::before { content: \"\\f3e8\"; }\n.bi-geo-fill::before { content: \"\\f3e9\"; }\n.bi-geo::before { content: \"\\f3ea\"; }\n.bi-gift-fill::before { content: \"\\f3eb\"; }\n.bi-gift::before { content: \"\\f3ec\"; }\n.bi-github::before { content: \"\\f3ed\"; }\n.bi-globe::before { content: \"\\f3ee\"; }\n.bi-globe2::before { content: \"\\f3ef\"; }\n.bi-google::before { content: \"\\f3f0\"; }\n.bi-graph-down::before { content: \"\\f3f1\"; }\n.bi-graph-up::before { content: \"\\f3f2\"; }\n.bi-grid-1x2-fill::before { content: \"\\f3f3\"; }\n.bi-grid-1x2::before { content: \"\\f3f4\"; }\n.bi-grid-3x2-gap-fill::before { content: \"\\f3f5\"; }\n.bi-grid-3x2-gap::before { content: \"\\f3f6\"; }\n.bi-grid-3x2::before { content: \"\\f3f7\"; }\n.bi-grid-3x3-gap-fill::before { content: \"\\f3f8\"; }\n.bi-grid-3x3-gap::before { content: \"\\f3f9\"; }\n.bi-grid-3x3::before { content: \"\\f3fa\"; }\n.bi-grid-fill::before { content: \"\\f3fb\"; }\n.bi-grid::before { content: \"\\f3fc\"; }\n.bi-grip-horizontal::before { content: \"\\f3fd\"; }\n.bi-grip-vertical::before { content: \"\\f3fe\"; }\n.bi-hammer::before { content: \"\\f3ff\"; }\n.bi-hand-index-fill::before { content: \"\\f400\"; }\n.bi-hand-index-thumb-fill::before { content: \"\\f401\"; }\n.bi-hand-index-thumb::before { content: \"\\f402\"; }\n.bi-hand-index::before { content: \"\\f403\"; }\n.bi-hand-thumbs-down-fill::before { content: \"\\f404\"; }\n.bi-hand-thumbs-down::before { content: \"\\f405\"; }\n.bi-hand-thumbs-up-fill::before { content: \"\\f406\"; }\n.bi-hand-thumbs-up::before { content: \"\\f407\"; }\n.bi-handbag-fill::before { content: \"\\f408\"; }\n.bi-handbag::before { content: \"\\f409\"; }\n.bi-hash::before { content: \"\\f40a\"; }\n.bi-hdd-fill::before { content: \"\\f40b\"; }\n.bi-hdd-network-fill::before { content: \"\\f40c\"; }\n.bi-hdd-network::before { content: \"\\f40d\"; }\n.bi-hdd-rack-fill::before { content: \"\\f40e\"; }\n.bi-hdd-rack::before { content: \"\\f40f\"; }\n.bi-hdd-stack-fill::before { content: \"\\f410\"; }\n.bi-hdd-stack::before { content: \"\\f411\"; }\n.bi-hdd::before { content: \"\\f412\"; }\n.bi-headphones::before { content: \"\\f413\"; }\n.bi-headset::before { content: \"\\f414\"; }\n.bi-heart-fill::before { content: \"\\f415\"; }\n.bi-heart-half::before { content: \"\\f416\"; }\n.bi-heart::before { content: \"\\f417\"; }\n.bi-heptagon-fill::before { content: \"\\f418\"; }\n.bi-heptagon-half::before { content: \"\\f419\"; }\n.bi-heptagon::before { content: \"\\f41a\"; }\n.bi-hexagon-fill::before { content: \"\\f41b\"; }\n.bi-hexagon-half::before { content: \"\\f41c\"; }\n.bi-hexagon::before { content: \"\\f41d\"; }\n.bi-hourglass-bottom::before { content: \"\\f41e\"; }\n.bi-hourglass-split::before { content: \"\\f41f\"; }\n.bi-hourglass-top::before { content: \"\\f420\"; }\n.bi-hourglass::before { content: \"\\f421\"; }\n.bi-house-door-fill::before { content: \"\\f422\"; }\n.bi-house-door::before { content: \"\\f423\"; }\n.bi-house-fill::before { content: \"\\f424\"; }\n.bi-house::before { content: \"\\f425\"; }\n.bi-hr::before { content: \"\\f426\"; }\n.bi-hurricane::before { content: \"\\f427\"; }\n.bi-image-alt::before { content: \"\\f428\"; }\n.bi-image-fill::before { content: \"\\f429\"; }\n.bi-image::before { content: \"\\f42a\"; }\n.bi-images::before { content: \"\\f42b\"; }\n.bi-inbox-fill::before { content: \"\\f42c\"; }\n.bi-inbox::before { content: \"\\f42d\"; }\n.bi-inboxes-fill::before { content: \"\\f42e\"; }\n.bi-inboxes::before { content: \"\\f42f\"; }\n.bi-info-circle-fill::before { content: \"\\f430\"; }\n.bi-info-circle::before { content: \"\\f431\"; }\n.bi-info-square-fill::before { content: \"\\f432\"; }\n.bi-info-square::before { content: \"\\f433\"; }\n.bi-info::before { content: \"\\f434\"; }\n.bi-input-cursor-text::before { content: \"\\f435\"; }\n.bi-input-cursor::before { content: \"\\f436\"; }\n.bi-instagram::before { content: \"\\f437\"; }\n.bi-intersect::before { content: \"\\f438\"; }\n.bi-journal-album::before { content: \"\\f439\"; }\n.bi-journal-arrow-down::before { content: \"\\f43a\"; }\n.bi-journal-arrow-up::before { content: \"\\f43b\"; }\n.bi-journal-bookmark-fill::before { content: \"\\f43c\"; }\n.bi-journal-bookmark::before { content: \"\\f43d\"; }\n.bi-journal-check::before { content: \"\\f43e\"; }\n.bi-journal-code::before { content: \"\\f43f\"; }\n.bi-journal-medical::before { content: \"\\f440\"; }\n.bi-journal-minus::before { content: \"\\f441\"; }\n.bi-journal-plus::before { content: \"\\f442\"; }\n.bi-journal-richtext::before { content: \"\\f443\"; }\n.bi-journal-text::before { content: \"\\f444\"; }\n.bi-journal-x::before { content: \"\\f445\"; }\n.bi-journal::before { content: \"\\f446\"; }\n.bi-journals::before { content: \"\\f447\"; }\n.bi-joystick::before { content: \"\\f448\"; }\n.bi-justify-left::before { content: \"\\f449\"; }\n.bi-justify-right::before { content: \"\\f44a\"; }\n.bi-justify::before { content: \"\\f44b\"; }\n.bi-kanban-fill::before { content: \"\\f44c\"; }\n.bi-kanban::before { content: \"\\f44d\"; }\n.bi-key-fill::before { content: \"\\f44e\"; }\n.bi-key::before { content: \"\\f44f\"; }\n.bi-keyboard-fill::before { content: \"\\f450\"; }\n.bi-keyboard::before { content: \"\\f451\"; }\n.bi-ladder::before { content: \"\\f452\"; }\n.bi-lamp-fill::before { content: \"\\f453\"; }\n.bi-lamp::before { content: \"\\f454\"; }\n.bi-laptop-fill::before { content: \"\\f455\"; }\n.bi-laptop::before { content: \"\\f456\"; }\n.bi-layer-backward::before { content: \"\\f457\"; }\n.bi-layer-forward::before { content: \"\\f458\"; }\n.bi-layers-fill::before { content: \"\\f459\"; }\n.bi-layers-half::before { content: \"\\f45a\"; }\n.bi-layers::before { content: \"\\f45b\"; }\n.bi-layout-sidebar-inset-reverse::before { content: \"\\f45c\"; }\n.bi-layout-sidebar-inset::before { content: \"\\f45d\"; }\n.bi-layout-sidebar-reverse::before { content: \"\\f45e\"; }\n.bi-layout-sidebar::before { content: \"\\f45f\"; }\n.bi-layout-split::before { content: \"\\f460\"; }\n.bi-layout-text-sidebar-reverse::before { content: \"\\f461\"; }\n.bi-layout-text-sidebar::before { content: \"\\f462\"; }\n.bi-layout-text-window-reverse::before { content: \"\\f463\"; }\n.bi-layout-text-window::before { content: \"\\f464\"; }\n.bi-layout-three-columns::before { content: \"\\f465\"; }\n.bi-layout-wtf::before { content: \"\\f466\"; }\n.bi-life-preserver::before { content: \"\\f467\"; }\n.bi-lightbulb-fill::before { content: \"\\f468\"; }\n.bi-lightbulb-off-fill::before { content: \"\\f469\"; }\n.bi-lightbulb-off::before { content: \"\\f46a\"; }\n.bi-lightbulb::before { content: \"\\f46b\"; }\n.bi-lightning-charge-fill::before { content: \"\\f46c\"; }\n.bi-lightning-charge::before { content: \"\\f46d\"; }\n.bi-lightning-fill::before { content: \"\\f46e\"; }\n.bi-lightning::before { content: \"\\f46f\"; }\n.bi-link-45deg::before { content: \"\\f470\"; }\n.bi-link::before { content: \"\\f471\"; }\n.bi-linkedin::before { content: \"\\f472\"; }\n.bi-list-check::before { content: \"\\f473\"; }\n.bi-list-nested::before { content: \"\\f474\"; }\n.bi-list-ol::before { content: \"\\f475\"; }\n.bi-list-stars::before { content: \"\\f476\"; }\n.bi-list-task::before { content: \"\\f477\"; }\n.bi-list-ul::before { content: \"\\f478\"; }\n.bi-list::before { content: \"\\f479\"; }\n.bi-lock-fill::before { content: \"\\f47a\"; }\n.bi-lock::before { content: \"\\f47b\"; }\n.bi-mailbox::before { content: \"\\f47c\"; }\n.bi-mailbox2::before { content: \"\\f47d\"; }\n.bi-map-fill::before { content: \"\\f47e\"; }\n.bi-map::before { content: \"\\f47f\"; }\n.bi-markdown-fill::before { content: \"\\f480\"; }\n.bi-markdown::before { content: \"\\f481\"; }\n.bi-mask::before { content: \"\\f482\"; }\n.bi-megaphone-fill::before { content: \"\\f483\"; }\n.bi-megaphone::before { content: \"\\f484\"; }\n.bi-menu-app-fill::before { content: \"\\f485\"; }\n.bi-menu-app::before { content: \"\\f486\"; }\n.bi-menu-button-fill::before { content: \"\\f487\"; }\n.bi-menu-button-wide-fill::before { content: \"\\f488\"; }\n.bi-menu-button-wide::before { content: \"\\f489\"; }\n.bi-menu-button::before { content: \"\\f48a\"; }\n.bi-menu-down::before { content: \"\\f48b\"; }\n.bi-menu-up::before { content: \"\\f48c\"; }\n.bi-mic-fill::before { content: \"\\f48d\"; }\n.bi-mic-mute-fill::before { content: \"\\f48e\"; }\n.bi-mic-mute::before { content: \"\\f48f\"; }\n.bi-mic::before { content: \"\\f490\"; }\n.bi-minecart-loaded::before { content: \"\\f491\"; }\n.bi-minecart::before { content: \"\\f492\"; }\n.bi-moisture::before { content: \"\\f493\"; }\n.bi-moon-fill::before { content: \"\\f494\"; }\n.bi-moon-stars-fill::before { content: \"\\f495\"; }\n.bi-moon-stars::before { content: \"\\f496\"; }\n.bi-moon::before { content: \"\\f497\"; }\n.bi-mouse-fill::before { content: \"\\f498\"; }\n.bi-mouse::before { content: \"\\f499\"; }\n.bi-mouse2-fill::before { content: \"\\f49a\"; }\n.bi-mouse2::before { content: \"\\f49b\"; }\n.bi-mouse3-fill::before { content: \"\\f49c\"; }\n.bi-mouse3::before { content: \"\\f49d\"; }\n.bi-music-note-beamed::before { content: \"\\f49e\"; }\n.bi-music-note-list::before { content: \"\\f49f\"; }\n.bi-music-note::before { content: \"\\f4a0\"; }\n.bi-music-player-fill::before { content: \"\\f4a1\"; }\n.bi-music-player::before { content: \"\\f4a2\"; }\n.bi-newspaper::before { content: \"\\f4a3\"; }\n.bi-node-minus-fill::before { content: \"\\f4a4\"; }\n.bi-node-minus::before { content: \"\\f4a5\"; }\n.bi-node-plus-fill::before { content: \"\\f4a6\"; }\n.bi-node-plus::before { content: \"\\f4a7\"; }\n.bi-nut-fill::before { content: \"\\f4a8\"; }\n.bi-nut::before { content: \"\\f4a9\"; }\n.bi-octagon-fill::before { content: \"\\f4aa\"; }\n.bi-octagon-half::before { content: \"\\f4ab\"; }\n.bi-octagon::before { content: \"\\f4ac\"; }\n.bi-option::before { content: \"\\f4ad\"; }\n.bi-outlet::before { content: \"\\f4ae\"; }\n.bi-paint-bucket::before { content: \"\\f4af\"; }\n.bi-palette-fill::before { content: \"\\f4b0\"; }\n.bi-palette::before { content: \"\\f4b1\"; }\n.bi-palette2::before { content: \"\\f4b2\"; }\n.bi-paperclip::before { content: \"\\f4b3\"; }\n.bi-paragraph::before { content: \"\\f4b4\"; }\n.bi-patch-check-fill::before { content: \"\\f4b5\"; }\n.bi-patch-check::before { content: \"\\f4b6\"; }\n.bi-patch-exclamation-fill::before { content: \"\\f4b7\"; }\n.bi-patch-exclamation::before { content: \"\\f4b8\"; }\n.bi-patch-minus-fill::before { content: \"\\f4b9\"; }\n.bi-patch-minus::before { content: \"\\f4ba\"; }\n.bi-patch-plus-fill::before { content: \"\\f4bb\"; }\n.bi-patch-plus::before { content: \"\\f4bc\"; }\n.bi-patch-question-fill::before { content: \"\\f4bd\"; }\n.bi-patch-question::before { content: \"\\f4be\"; }\n.bi-pause-btn-fill::before { content: \"\\f4bf\"; }\n.bi-pause-btn::before { content: \"\\f4c0\"; }\n.bi-pause-circle-fill::before { content: \"\\f4c1\"; }\n.bi-pause-circle::before { content: \"\\f4c2\"; }\n.bi-pause-fill::before { content: \"\\f4c3\"; }\n.bi-pause::before { content: \"\\f4c4\"; }\n.bi-peace-fill::before { content: \"\\f4c5\"; }\n.bi-peace::before { content: \"\\f4c6\"; }\n.bi-pen-fill::before { content: \"\\f4c7\"; }\n.bi-pen::before { content: \"\\f4c8\"; }\n.bi-pencil-fill::before { content: \"\\f4c9\"; }\n.bi-pencil-square::before { content: \"\\f4ca\"; }\n.bi-pencil::before { content: \"\\f4cb\"; }\n.bi-pentagon-fill::before { content: \"\\f4cc\"; }\n.bi-pentagon-half::before { content: \"\\f4cd\"; }\n.bi-pentagon::before { content: \"\\f4ce\"; }\n.bi-people-fill::before { content: \"\\f4cf\"; }\n.bi-people::before { content: \"\\f4d0\"; }\n.bi-percent::before { content: \"\\f4d1\"; }\n.bi-person-badge-fill::before { content: \"\\f4d2\"; }\n.bi-person-badge::before { content: \"\\f4d3\"; }\n.bi-person-bounding-box::before { content: \"\\f4d4\"; }\n.bi-person-check-fill::before { content: \"\\f4d5\"; }\n.bi-person-check::before { content: \"\\f4d6\"; }\n.bi-person-circle::before { content: \"\\f4d7\"; }\n.bi-person-dash-fill::before { content: \"\\f4d8\"; }\n.bi-person-dash::before { content: \"\\f4d9\"; }\n.bi-person-fill::before { content: \"\\f4da\"; }\n.bi-person-lines-fill::before { content: \"\\f4db\"; }\n.bi-person-plus-fill::before { content: \"\\f4dc\"; }\n.bi-person-plus::before { content: \"\\f4dd\"; }\n.bi-person-square::before { content: \"\\f4de\"; }\n.bi-person-x-fill::before { content: \"\\f4df\"; }\n.bi-person-x::before { content: \"\\f4e0\"; }\n.bi-person::before { content: \"\\f4e1\"; }\n.bi-phone-fill::before { content: \"\\f4e2\"; }\n.bi-phone-landscape-fill::before { content: \"\\f4e3\"; }\n.bi-phone-landscape::before { content: \"\\f4e4\"; }\n.bi-phone-vibrate-fill::before { content: \"\\f4e5\"; }\n.bi-phone-vibrate::before { content: \"\\f4e6\"; }\n.bi-phone::before { content: \"\\f4e7\"; }\n.bi-pie-chart-fill::before { content: \"\\f4e8\"; }\n.bi-pie-chart::before { content: \"\\f4e9\"; }\n.bi-pin-angle-fill::before { content: \"\\f4ea\"; }\n.bi-pin-angle::before { content: \"\\f4eb\"; }\n.bi-pin-fill::before { content: \"\\f4ec\"; }\n.bi-pin::before { content: \"\\f4ed\"; }\n.bi-pip-fill::before { content: \"\\f4ee\"; }\n.bi-pip::before { content: \"\\f4ef\"; }\n.bi-play-btn-fill::before { content: \"\\f4f0\"; }\n.bi-play-btn::before { content: \"\\f4f1\"; }\n.bi-play-circle-fill::before { content: \"\\f4f2\"; }\n.bi-play-circle::before { content: \"\\f4f3\"; }\n.bi-play-fill::before { content: \"\\f4f4\"; }\n.bi-play::before { content: \"\\f4f5\"; }\n.bi-plug-fill::before { content: \"\\f4f6\"; }\n.bi-plug::before { content: \"\\f4f7\"; }\n.bi-plus-circle-dotted::before { content: \"\\f4f8\"; }\n.bi-plus-circle-fill::before { content: \"\\f4f9\"; }\n.bi-plus-circle::before { content: \"\\f4fa\"; }\n.bi-plus-square-dotted::before { content: \"\\f4fb\"; }\n.bi-plus-square-fill::before { content: \"\\f4fc\"; }\n.bi-plus-square::before { content: \"\\f4fd\"; }\n.bi-plus::before { content: \"\\f4fe\"; }\n.bi-power::before { content: \"\\f4ff\"; }\n.bi-printer-fill::before { content: \"\\f500\"; }\n.bi-printer::before { content: \"\\f501\"; }\n.bi-puzzle-fill::before { content: \"\\f502\"; }\n.bi-puzzle::before { content: \"\\f503\"; }\n.bi-question-circle-fill::before { content: \"\\f504\"; }\n.bi-question-circle::before { content: \"\\f505\"; }\n.bi-question-diamond-fill::before { content: \"\\f506\"; }\n.bi-question-diamond::before { content: \"\\f507\"; }\n.bi-question-octagon-fill::before { content: \"\\f508\"; }\n.bi-question-octagon::before { content: \"\\f509\"; }\n.bi-question-square-fill::before { content: \"\\f50a\"; }\n.bi-question-square::before { content: \"\\f50b\"; }\n.bi-question::before { content: \"\\f50c\"; }\n.bi-rainbow::before { content: \"\\f50d\"; }\n.bi-receipt-cutoff::before { content: \"\\f50e\"; }\n.bi-receipt::before { content: \"\\f50f\"; }\n.bi-reception-0::before { content: \"\\f510\"; }\n.bi-reception-1::before { content: \"\\f511\"; }\n.bi-reception-2::before { content: \"\\f512\"; }\n.bi-reception-3::before { content: \"\\f513\"; }\n.bi-reception-4::before { content: \"\\f514\"; }\n.bi-record-btn-fill::before { content: \"\\f515\"; }\n.bi-record-btn::before { content: \"\\f516\"; }\n.bi-record-circle-fill::before { content: \"\\f517\"; }\n.bi-record-circle::before { content: \"\\f518\"; }\n.bi-record-fill::before { content: \"\\f519\"; }\n.bi-record::before { content: \"\\f51a\"; }\n.bi-record2-fill::before { content: \"\\f51b\"; }\n.bi-record2::before { content: \"\\f51c\"; }\n.bi-reply-all-fill::before { content: \"\\f51d\"; }\n.bi-reply-all::before { content: \"\\f51e\"; }\n.bi-reply-fill::before { content: \"\\f51f\"; }\n.bi-reply::before { content: \"\\f520\"; }\n.bi-rss-fill::before { content: \"\\f521\"; }\n.bi-rss::before { content: \"\\f522\"; }\n.bi-rulers::before { content: \"\\f523\"; }\n.bi-save-fill::before { content: \"\\f524\"; }\n.bi-save::before { content: \"\\f525\"; }\n.bi-save2-fill::before { content: \"\\f526\"; }\n.bi-save2::before { content: \"\\f527\"; }\n.bi-scissors::before { content: \"\\f528\"; }\n.bi-screwdriver::before { content: \"\\f529\"; }\n.bi-search::before { content: \"\\f52a\"; }\n.bi-segmented-nav::before { content: \"\\f52b\"; }\n.bi-server::before { content: \"\\f52c\"; }\n.bi-share-fill::before { content: \"\\f52d\"; }\n.bi-share::before { content: \"\\f52e\"; }\n.bi-shield-check::before { content: \"\\f52f\"; }\n.bi-shield-exclamation::before { content: \"\\f530\"; }\n.bi-shield-fill-check::before { content: \"\\f531\"; }\n.bi-shield-fill-exclamation::before { content: \"\\f532\"; }\n.bi-shield-fill-minus::before { content: \"\\f533\"; }\n.bi-shield-fill-plus::before { content: \"\\f534\"; }\n.bi-shield-fill-x::before { content: \"\\f535\"; }\n.bi-shield-fill::before { content: \"\\f536\"; }\n.bi-shield-lock-fill::before { content: \"\\f537\"; }\n.bi-shield-lock::before { content: \"\\f538\"; }\n.bi-shield-minus::before { content: \"\\f539\"; }\n.bi-shield-plus::before { content: \"\\f53a\"; }\n.bi-shield-shaded::before { content: \"\\f53b\"; }\n.bi-shield-slash-fill::before { content: \"\\f53c\"; }\n.bi-shield-slash::before { content: \"\\f53d\"; }\n.bi-shield-x::before { content: \"\\f53e\"; }\n.bi-shield::before { content: \"\\f53f\"; }\n.bi-shift-fill::before { content: \"\\f540\"; }\n.bi-shift::before { content: \"\\f541\"; }\n.bi-shop-window::before { content: \"\\f542\"; }\n.bi-shop::before { content: \"\\f543\"; }\n.bi-shuffle::before { content: \"\\f544\"; }\n.bi-signpost-2-fill::before { content: \"\\f545\"; }\n.bi-signpost-2::before { content: \"\\f546\"; }\n.bi-signpost-fill::before { content: \"\\f547\"; }\n.bi-signpost-split-fill::before { content: \"\\f548\"; }\n.bi-signpost-split::before { content: \"\\f549\"; }\n.bi-signpost::before { content: \"\\f54a\"; }\n.bi-sim-fill::before { content: \"\\f54b\"; }\n.bi-sim::before { content: \"\\f54c\"; }\n.bi-skip-backward-btn-fill::before { content: \"\\f54d\"; }\n.bi-skip-backward-btn::before { content: \"\\f54e\"; }\n.bi-skip-backward-circle-fill::before { content: \"\\f54f\"; }\n.bi-skip-backward-circle::before { content: \"\\f550\"; }\n.bi-skip-backward-fill::before { content: \"\\f551\"; }\n.bi-skip-backward::before { content: \"\\f552\"; }\n.bi-skip-end-btn-fill::before { content: \"\\f553\"; }\n.bi-skip-end-btn::before { content: \"\\f554\"; }\n.bi-skip-end-circle-fill::before { content: \"\\f555\"; }\n.bi-skip-end-circle::before { content: \"\\f556\"; }\n.bi-skip-end-fill::before { content: \"\\f557\"; }\n.bi-skip-end::before { content: \"\\f558\"; }\n.bi-skip-forward-btn-fill::before { content: \"\\f559\"; }\n.bi-skip-forward-btn::before { content: \"\\f55a\"; }\n.bi-skip-forward-circle-fill::before { content: \"\\f55b\"; }\n.bi-skip-forward-circle::before { content: \"\\f55c\"; }\n.bi-skip-forward-fill::before { content: \"\\f55d\"; }\n.bi-skip-forward::before { content: \"\\f55e\"; }\n.bi-skip-start-btn-fill::before { content: \"\\f55f\"; }\n.bi-skip-start-btn::before { content: \"\\f560\"; }\n.bi-skip-start-circle-fill::before { content: \"\\f561\"; }\n.bi-skip-start-circle::before { content: \"\\f562\"; }\n.bi-skip-start-fill::before { content: \"\\f563\"; }\n.bi-skip-start::before { content: \"\\f564\"; }\n.bi-slack::before { content: \"\\f565\"; }\n.bi-slash-circle-fill::before { content: \"\\f566\"; }\n.bi-slash-circle::before { content: \"\\f567\"; }\n.bi-slash-square-fill::before { content: \"\\f568\"; }\n.bi-slash-square::before { content: \"\\f569\"; }\n.bi-slash::before { content: \"\\f56a\"; }\n.bi-sliders::before { content: \"\\f56b\"; }\n.bi-smartwatch::before { content: \"\\f56c\"; }\n.bi-snow::before { content: \"\\f56d\"; }\n.bi-snow2::before { content: \"\\f56e\"; }\n.bi-snow3::before { content: \"\\f56f\"; }\n.bi-sort-alpha-down-alt::before { content: \"\\f570\"; }\n.bi-sort-alpha-down::before { content: \"\\f571\"; }\n.bi-sort-alpha-up-alt::before { content: \"\\f572\"; }\n.bi-sort-alpha-up::before { content: \"\\f573\"; }\n.bi-sort-down-alt::before { content: \"\\f574\"; }\n.bi-sort-down::before { content: \"\\f575\"; }\n.bi-sort-numeric-down-alt::before { content: \"\\f576\"; }\n.bi-sort-numeric-down::before { content: \"\\f577\"; }\n.bi-sort-numeric-up-alt::before { content: \"\\f578\"; }\n.bi-sort-numeric-up::before { content: \"\\f579\"; }\n.bi-sort-up-alt::before { content: \"\\f57a\"; }\n.bi-sort-up::before { content: \"\\f57b\"; }\n.bi-soundwave::before { content: \"\\f57c\"; }\n.bi-speaker-fill::before { content: \"\\f57d\"; }\n.bi-speaker::before { content: \"\\f57e\"; }\n.bi-speedometer::before { content: \"\\f57f\"; }\n.bi-speedometer2::before { content: \"\\f580\"; }\n.bi-spellcheck::before { content: \"\\f581\"; }\n.bi-square-fill::before { content: \"\\f582\"; }\n.bi-square-half::before { content: \"\\f583\"; }\n.bi-square::before { content: \"\\f584\"; }\n.bi-stack::before { content: \"\\f585\"; }\n.bi-star-fill::before { content: \"\\f586\"; }\n.bi-star-half::before { content: \"\\f587\"; }\n.bi-star::before { content: \"\\f588\"; }\n.bi-stars::before { content: \"\\f589\"; }\n.bi-stickies-fill::before { content: \"\\f58a\"; }\n.bi-stickies::before { content: \"\\f58b\"; }\n.bi-sticky-fill::before { content: \"\\f58c\"; }\n.bi-sticky::before { content: \"\\f58d\"; }\n.bi-stop-btn-fill::before { content: \"\\f58e\"; }\n.bi-stop-btn::before { content: \"\\f58f\"; }\n.bi-stop-circle-fill::before { content: \"\\f590\"; }\n.bi-stop-circle::before { content: \"\\f591\"; }\n.bi-stop-fill::before { content: \"\\f592\"; }\n.bi-stop::before { content: \"\\f593\"; }\n.bi-stoplights-fill::before { content: \"\\f594\"; }\n.bi-stoplights::before { content: \"\\f595\"; }\n.bi-stopwatch-fill::before { content: \"\\f596\"; }\n.bi-stopwatch::before { content: \"\\f597\"; }\n.bi-subtract::before { content: \"\\f598\"; }\n.bi-suit-club-fill::before { content: \"\\f599\"; }\n.bi-suit-club::before { content: \"\\f59a\"; }\n.bi-suit-diamond-fill::before { content: \"\\f59b\"; }\n.bi-suit-diamond::before { content: \"\\f59c\"; }\n.bi-suit-heart-fill::before { content: \"\\f59d\"; }\n.bi-suit-heart::before { content: \"\\f59e\"; }\n.bi-suit-spade-fill::before { content: \"\\f59f\"; }\n.bi-suit-spade::before { content: \"\\f5a0\"; }\n.bi-sun-fill::before { content: \"\\f5a1\"; }\n.bi-sun::before { content: \"\\f5a2\"; }\n.bi-sunglasses::before { content: \"\\f5a3\"; }\n.bi-sunrise-fill::before { content: \"\\f5a4\"; }\n.bi-sunrise::before { content: \"\\f5a5\"; }\n.bi-sunset-fill::before { content: \"\\f5a6\"; }\n.bi-sunset::before { content: \"\\f5a7\"; }\n.bi-symmetry-horizontal::before { content: \"\\f5a8\"; }\n.bi-symmetry-vertical::before { content: \"\\f5a9\"; }\n.bi-table::before { content: \"\\f5aa\"; }\n.bi-tablet-fill::before { content: \"\\f5ab\"; }\n.bi-tablet-landscape-fill::before { content: \"\\f5ac\"; }\n.bi-tablet-landscape::before { content: \"\\f5ad\"; }\n.bi-tablet::before { content: \"\\f5ae\"; }\n.bi-tag-fill::before { content: \"\\f5af\"; }\n.bi-tag::before { content: \"\\f5b0\"; }\n.bi-tags-fill::before { content: \"\\f5b1\"; }\n.bi-tags::before { content: \"\\f5b2\"; }\n.bi-telegram::before { content: \"\\f5b3\"; }\n.bi-telephone-fill::before { content: \"\\f5b4\"; }\n.bi-telephone-forward-fill::before { content: \"\\f5b5\"; }\n.bi-telephone-forward::before { content: \"\\f5b6\"; }\n.bi-telephone-inbound-fill::before { content: \"\\f5b7\"; }\n.bi-telephone-inbound::before { content: \"\\f5b8\"; }\n.bi-telephone-minus-fill::before { content: \"\\f5b9\"; }\n.bi-telephone-minus::before { content: \"\\f5ba\"; }\n.bi-telephone-outbound-fill::before { content: \"\\f5bb\"; }\n.bi-telephone-outbound::before { content: \"\\f5bc\"; }\n.bi-telephone-plus-fill::before { content: \"\\f5bd\"; }\n.bi-telephone-plus::before { content: \"\\f5be\"; }\n.bi-telephone-x-fill::before { content: \"\\f5bf\"; }\n.bi-telephone-x::before { content: \"\\f5c0\"; }\n.bi-telephone::before { content: \"\\f5c1\"; }\n.bi-terminal-fill::before { content: \"\\f5c2\"; }\n.bi-terminal::before { content: \"\\f5c3\"; }\n.bi-text-center::before { content: \"\\f5c4\"; }\n.bi-text-indent-left::before { content: \"\\f5c5\"; }\n.bi-text-indent-right::before { content: \"\\f5c6\"; }\n.bi-text-left::before { content: \"\\f5c7\"; }\n.bi-text-paragraph::before { content: \"\\f5c8\"; }\n.bi-text-right::before { content: \"\\f5c9\"; }\n.bi-textarea-resize::before { content: \"\\f5ca\"; }\n.bi-textarea-t::before { content: \"\\f5cb\"; }\n.bi-textarea::before { content: \"\\f5cc\"; }\n.bi-thermometer-half::before { content: \"\\f5cd\"; }\n.bi-thermometer-high::before { content: \"\\f5ce\"; }\n.bi-thermometer-low::before { content: \"\\f5cf\"; }\n.bi-thermometer-snow::before { content: \"\\f5d0\"; }\n.bi-thermometer-sun::before { content: \"\\f5d1\"; }\n.bi-thermometer::before { content: \"\\f5d2\"; }\n.bi-three-dots-vertical::before { content: \"\\f5d3\"; }\n.bi-three-dots::before { content: \"\\f5d4\"; }\n.bi-toggle-off::before { content: \"\\f5d5\"; }\n.bi-toggle-on::before { content: \"\\f5d6\"; }\n.bi-toggle2-off::before { content: \"\\f5d7\"; }\n.bi-toggle2-on::before { content: \"\\f5d8\"; }\n.bi-toggles::before { content: \"\\f5d9\"; }\n.bi-toggles2::before { content: \"\\f5da\"; }\n.bi-tools::before { content: \"\\f5db\"; }\n.bi-tornado::before { content: \"\\f5dc\"; }\n.bi-trash-fill::before { content: \"\\f5dd\"; }\n.bi-trash::before { content: \"\\f5de\"; }\n.bi-trash2-fill::before { content: \"\\f5df\"; }\n.bi-trash2::before { content: \"\\f5e0\"; }\n.bi-tree-fill::before { content: \"\\f5e1\"; }\n.bi-tree::before { content: \"\\f5e2\"; }\n.bi-triangle-fill::before { content: \"\\f5e3\"; }\n.bi-triangle-half::before { content: \"\\f5e4\"; }\n.bi-triangle::before { content: \"\\f5e5\"; }\n.bi-trophy-fill::before { content: \"\\f5e6\"; }\n.bi-trophy::before { content: \"\\f5e7\"; }\n.bi-tropical-storm::before { content: \"\\f5e8\"; }\n.bi-truck-flatbed::before { content: \"\\f5e9\"; }\n.bi-truck::before { content: \"\\f5ea\"; }\n.bi-tsunami::before { content: \"\\f5eb\"; }\n.bi-tv-fill::before { content: \"\\f5ec\"; }\n.bi-tv::before { content: \"\\f5ed\"; }\n.bi-twitch::before { content: \"\\f5ee\"; }\n.bi-twitter::before { content: \"\\f5ef\"; }\n.bi-type-bold::before { content: \"\\f5f0\"; }\n.bi-type-h1::before { content: \"\\f5f1\"; }\n.bi-type-h2::before { content: \"\\f5f2\"; }\n.bi-type-h3::before { content: \"\\f5f3\"; }\n.bi-type-italic::before { content: \"\\f5f4\"; }\n.bi-type-strikethrough::before { content: \"\\f5f5\"; }\n.bi-type-underline::before { content: \"\\f5f6\"; }\n.bi-type::before { content: \"\\f5f7\"; }\n.bi-ui-checks-grid::before { content: \"\\f5f8\"; }\n.bi-ui-checks::before { content: \"\\f5f9\"; }\n.bi-ui-radios-grid::before { content: \"\\f5fa\"; }\n.bi-ui-radios::before { content: \"\\f5fb\"; }\n.bi-umbrella-fill::before { content: \"\\f5fc\"; }\n.bi-umbrella::before { content: \"\\f5fd\"; }\n.bi-union::before { content: \"\\f5fe\"; }\n.bi-unlock-fill::before { content: \"\\f5ff\"; }\n.bi-unlock::before { content: \"\\f600\"; }\n.bi-upc-scan::before { content: \"\\f601\"; }\n.bi-upc::before { content: \"\\f602\"; }\n.bi-upload::before { content: \"\\f603\"; }\n.bi-vector-pen::before { content: \"\\f604\"; }\n.bi-view-list::before { content: \"\\f605\"; }\n.bi-view-stacked::before { content: \"\\f606\"; }\n.bi-vinyl-fill::before { content: \"\\f607\"; }\n.bi-vinyl::before { content: \"\\f608\"; }\n.bi-voicemail::before { content: \"\\f609\"; }\n.bi-volume-down-fill::before { content: \"\\f60a\"; }\n.bi-volume-down::before { content: \"\\f60b\"; }\n.bi-volume-mute-fill::before { content: \"\\f60c\"; }\n.bi-volume-mute::before { content: \"\\f60d\"; }\n.bi-volume-off-fill::before { content: \"\\f60e\"; }\n.bi-volume-off::before { content: \"\\f60f\"; }\n.bi-volume-up-fill::before { content: \"\\f610\"; }\n.bi-volume-up::before { content: \"\\f611\"; }\n.bi-vr::before { content: \"\\f612\"; }\n.bi-wallet-fill::before { content: \"\\f613\"; }\n.bi-wallet::before { content: \"\\f614\"; }\n.bi-wallet2::before { content: \"\\f615\"; }\n.bi-watch::before { content: \"\\f616\"; }\n.bi-water::before { content: \"\\f617\"; }\n.bi-whatsapp::before { content: \"\\f618\"; }\n.bi-wifi-1::before { content: \"\\f619\"; }\n.bi-wifi-2::before { content: \"\\f61a\"; }\n.bi-wifi-off::before { content: \"\\f61b\"; }\n.bi-wifi::before { content: \"\\f61c\"; }\n.bi-wind::before { content: \"\\f61d\"; }\n.bi-window-dock::before { content: \"\\f61e\"; }\n.bi-window-sidebar::before { content: \"\\f61f\"; }\n.bi-window::before { content: \"\\f620\"; }\n.bi-wrench::before { content: \"\\f621\"; }\n.bi-x-circle-fill::before { content: \"\\f622\"; }\n.bi-x-circle::before { content: \"\\f623\"; }\n.bi-x-diamond-fill::before { content: \"\\f624\"; }\n.bi-x-diamond::before { content: \"\\f625\"; }\n.bi-x-octagon-fill::before { content: \"\\f626\"; }\n.bi-x-octagon::before { content: \"\\f627\"; }\n.bi-x-square-fill::before { content: \"\\f628\"; }\n.bi-x-square::before { content: \"\\f629\"; }\n.bi-x::before { content: \"\\f62a\"; }\n.bi-youtube::before { content: \"\\f62b\"; }\n.bi-zoom-in::before { content: \"\\f62c\"; }\n.bi-zoom-out::before { content: \"\\f62d\"; }\n.bi-bank::before { content: \"\\f62e\"; }\n.bi-bank2::before { content: \"\\f62f\"; }\n.bi-bell-slash-fill::before { content: \"\\f630\"; }\n.bi-bell-slash::before { content: \"\\f631\"; }\n.bi-cash-coin::before { content: \"\\f632\"; }\n.bi-check-lg::before { content: \"\\f633\"; }\n.bi-coin::before { content: \"\\f634\"; }\n.bi-currency-bitcoin::before { content: \"\\f635\"; }\n.bi-currency-dollar::before { content: \"\\f636\"; }\n.bi-currency-euro::before { content: \"\\f637\"; }\n.bi-currency-exchange::before { content: \"\\f638\"; }\n.bi-currency-pound::before { content: \"\\f639\"; }\n.bi-currency-yen::before { content: \"\\f63a\"; }\n.bi-dash-lg::before { content: \"\\f63b\"; }\n.bi-exclamation-lg::before { content: \"\\f63c\"; }\n.bi-file-earmark-pdf-fill::before { content: \"\\f63d\"; }\n.bi-file-earmark-pdf::before { content: \"\\f63e\"; }\n.bi-file-pdf-fill::before { content: \"\\f63f\"; }\n.bi-file-pdf::before { content: \"\\f640\"; }\n.bi-gender-ambiguous::before { content: \"\\f641\"; }\n.bi-gender-female::before { content: \"\\f642\"; }\n.bi-gender-male::before { content: \"\\f643\"; }\n.bi-gender-trans::before { content: \"\\f644\"; }\n.bi-headset-vr::before { content: \"\\f645\"; }\n.bi-info-lg::before { content: \"\\f646\"; }\n.bi-mastodon::before { content: \"\\f647\"; }\n.bi-messenger::before { content: \"\\f648\"; }\n.bi-piggy-bank-fill::before { content: \"\\f649\"; }\n.bi-piggy-bank::before { content: \"\\f64a\"; }\n.bi-pin-map-fill::before { content: \"\\f64b\"; }\n.bi-pin-map::before { content: \"\\f64c\"; }\n.bi-plus-lg::before { content: \"\\f64d\"; }\n.bi-question-lg::before { content: \"\\f64e\"; }\n.bi-recycle::before { content: \"\\f64f\"; }\n.bi-reddit::before { content: \"\\f650\"; }\n.bi-safe-fill::before { content: \"\\f651\"; }\n.bi-safe2-fill::before { content: \"\\f652\"; }\n.bi-safe2::before { content: \"\\f653\"; }\n.bi-sd-card-fill::before { content: \"\\f654\"; }\n.bi-sd-card::before { content: \"\\f655\"; }\n.bi-skype::before { content: \"\\f656\"; }\n.bi-slash-lg::before { content: \"\\f657\"; }\n.bi-translate::before { content: \"\\f658\"; }\n.bi-x-lg::before { content: \"\\f659\"; }\n.bi-safe::before { content: \"\\f65a\"; }\n.bi-apple::before { content: \"\\f65b\"; }\n.bi-microsoft::before { content: \"\\f65d\"; }\n.bi-windows::before { content: \"\\f65e\"; }\n.bi-behance::before { content: \"\\f65c\"; }\n.bi-dribbble::before { content: \"\\f65f\"; }\n.bi-line::before { content: \"\\f660\"; }\n.bi-medium::before { content: \"\\f661\"; }\n.bi-paypal::before { content: \"\\f662\"; }\n.bi-pinterest::before { content: \"\\f663\"; }\n.bi-signal::before { content: \"\\f664\"; }\n.bi-snapchat::before { content: \"\\f665\"; }\n.bi-spotify::before { content: \"\\f666\"; }\n.bi-stack-overflow::before { content: \"\\f667\"; }\n.bi-strava::before { content: \"\\f668\"; }\n.bi-wordpress::before { content: \"\\f669\"; }\n.bi-vimeo::before { content: \"\\f66a\"; }\n.bi-activity::before { content: \"\\f66b\"; }\n.bi-easel2-fill::before { content: \"\\f66c\"; }\n.bi-easel2::before { content: \"\\f66d\"; }\n.bi-easel3-fill::before { content: \"\\f66e\"; }\n.bi-easel3::before { content: \"\\f66f\"; }\n.bi-fan::before { content: \"\\f670\"; }\n.bi-fingerprint::before { content: \"\\f671\"; }\n.bi-graph-down-arrow::before { content: \"\\f672\"; }\n.bi-graph-up-arrow::before { content: \"\\f673\"; }\n.bi-hypnotize::before { content: \"\\f674\"; }\n.bi-magic::before { content: \"\\f675\"; }\n.bi-person-rolodex::before { content: \"\\f676\"; }\n.bi-person-video::before { content: \"\\f677\"; }\n.bi-person-video2::before { content: \"\\f678\"; }\n.bi-person-video3::before { content: \"\\f679\"; }\n.bi-person-workspace::before { content: \"\\f67a\"; }\n.bi-radioactive::before { content: \"\\f67b\"; }\n.bi-webcam-fill::before { content: \"\\f67c\"; }\n.bi-webcam::before { content: \"\\f67d\"; }\n.bi-yin-yang::before { content: \"\\f67e\"; }\n.bi-bandaid-fill::before { content: \"\\f680\"; }\n.bi-bandaid::before { content: \"\\f681\"; }\n.bi-bluetooth::before { content: \"\\f682\"; }\n.bi-body-text::before { content: \"\\f683\"; }\n.bi-boombox::before { content: \"\\f684\"; }\n.bi-boxes::before { content: \"\\f685\"; }\n.bi-dpad-fill::before { content: \"\\f686\"; }\n.bi-dpad::before { content: \"\\f687\"; }\n.bi-ear-fill::before { content: \"\\f688\"; }\n.bi-ear::before { content: \"\\f689\"; }\n.bi-envelope-check-1::before { content: \"\\f68a\"; }\n.bi-envelope-check-fill::before { content: \"\\f68b\"; }\n.bi-envelope-check::before { content: \"\\f68c\"; }\n.bi-envelope-dash-1::before { content: \"\\f68d\"; }\n.bi-envelope-dash-fill::before { content: \"\\f68e\"; }\n.bi-envelope-dash::before { content: \"\\f68f\"; }\n.bi-envelope-exclamation-1::before { content: \"\\f690\"; }\n.bi-envelope-exclamation-fill::before { content: \"\\f691\"; }\n.bi-envelope-exclamation::before { content: \"\\f692\"; }\n.bi-envelope-plus-fill::before { content: \"\\f693\"; }\n.bi-envelope-plus::before { content: \"\\f694\"; }\n.bi-envelope-slash-1::before { content: \"\\f695\"; }\n.bi-envelope-slash-fill::before { content: \"\\f696\"; }\n.bi-envelope-slash::before { content: \"\\f697\"; }\n.bi-envelope-x-1::before { content: \"\\f698\"; }\n.bi-envelope-x-fill::before { content: \"\\f699\"; }\n.bi-envelope-x::before { content: \"\\f69a\"; }\n.bi-explicit-fill::before { content: \"\\f69b\"; }\n.bi-explicit::before { content: \"\\f69c\"; }\n.bi-git::before { content: \"\\f69d\"; }\n.bi-infinity::before { content: \"\\f69e\"; }\n.bi-list-columns-reverse::before { content: \"\\f69f\"; }\n.bi-list-columns::before { content: \"\\f6a0\"; }\n.bi-meta::before { content: \"\\f6a1\"; }\n.bi-mortorboard-fill::before { content: \"\\f6a2\"; }\n.bi-mortorboard::before { content: \"\\f6a3\"; }\n.bi-nintendo-switch::before { content: \"\\f6a4\"; }\n.bi-pc-display-horizontal::before { content: \"\\f6a5\"; }\n.bi-pc-display::before { content: \"\\f6a6\"; }\n.bi-pc-horizontal::before { content: \"\\f6a7\"; }\n.bi-pc::before { content: \"\\f6a8\"; }\n.bi-playstation::before { content: \"\\f6a9\"; }\n.bi-plus-slash-minus::before { content: \"\\f6aa\"; }\n.bi-projector-fill::before { content: \"\\f6ab\"; }\n.bi-projector::before { content: \"\\f6ac\"; }\n.bi-qr-code-scan::before { content: \"\\f6ad\"; }\n.bi-qr-code::before { content: \"\\f6ae\"; }\n.bi-quora::before { content: \"\\f6af\"; }\n.bi-quote::before { content: \"\\f6b0\"; }\n.bi-robot::before { content: \"\\f6b1\"; }\n.bi-send-check-fill::before { content: \"\\f6b2\"; }\n.bi-send-check::before { content: \"\\f6b3\"; }\n.bi-send-dash-fill::before { content: \"\\f6b4\"; }\n.bi-send-dash::before { content: \"\\f6b5\"; }\n.bi-send-exclamation-1::before { content: \"\\f6b6\"; }\n.bi-send-exclamation-fill::before { content: \"\\f6b7\"; }\n.bi-send-exclamation::before { content: \"\\f6b8\"; }\n.bi-send-fill::before { content: \"\\f6b9\"; }\n.bi-send-plus-fill::before { content: \"\\f6ba\"; }\n.bi-send-plus::before { content: \"\\f6bb\"; }\n.bi-send-slash-fill::before { content: \"\\f6bc\"; }\n.bi-send-slash::before { content: \"\\f6bd\"; }\n.bi-send-x-fill::before { content: \"\\f6be\"; }\n.bi-send-x::before { content: \"\\f6bf\"; }\n.bi-send::before { content: \"\\f6c0\"; }\n.bi-steam::before { content: \"\\f6c1\"; }\n.bi-terminal-dash-1::before { content: \"\\f6c2\"; }\n.bi-terminal-dash::before { content: \"\\f6c3\"; }\n.bi-terminal-plus::before { content: \"\\f6c4\"; }\n.bi-terminal-split::before { content: \"\\f6c5\"; }\n.bi-ticket-detailed-fill::before { content: \"\\f6c6\"; }\n.bi-ticket-detailed::before { content: \"\\f6c7\"; }\n.bi-ticket-fill::before { content: \"\\f6c8\"; }\n.bi-ticket-perforated-fill::before { content: \"\\f6c9\"; }\n.bi-ticket-perforated::before { content: \"\\f6ca\"; }\n.bi-ticket::before { content: \"\\f6cb\"; }\n.bi-tiktok::before { content: \"\\f6cc\"; }\n.bi-window-dash::before { content: \"\\f6cd\"; }\n.bi-window-desktop::before { content: \"\\f6ce\"; }\n.bi-window-fullscreen::before { content: \"\\f6cf\"; }\n.bi-window-plus::before { content: \"\\f6d0\"; }\n.bi-window-split::before { content: \"\\f6d1\"; }\n.bi-window-stack::before { content: \"\\f6d2\"; }\n.bi-window-x::before { content: \"\\f6d3\"; }\n.bi-xbox::before { content: \"\\f6d4\"; }\n.bi-ethernet::before { content: \"\\f6d5\"; }\n.bi-hdmi-fill::before { content: \"\\f6d6\"; }\n.bi-hdmi::before { content: \"\\f6d7\"; }\n.bi-usb-c-fill::before { content: \"\\f6d8\"; }\n.bi-usb-c::before { content: \"\\f6d9\"; }\n.bi-usb-fill::before { content: \"\\f6da\"; }\n.bi-usb-plug-fill::before { content: \"\\f6db\"; }\n.bi-usb-plug::before { content: \"\\f6dc\"; }\n.bi-usb-symbol::before { content: \"\\f6dd\"; }\n.bi-usb::before { content: \"\\f6de\"; }\n.bi-boombox-fill::before { content: \"\\f6df\"; }\n.bi-displayport-1::before { content: \"\\f6e0\"; }\n.bi-displayport::before { content: \"\\f6e1\"; }\n.bi-gpu-card::before { content: \"\\f6e2\"; }\n.bi-memory::before { content: \"\\f6e3\"; }\n.bi-modem-fill::before { content: \"\\f6e4\"; }\n.bi-modem::before { content: \"\\f6e5\"; }\n.bi-motherboard-fill::before { content: \"\\f6e6\"; }\n.bi-motherboard::before { content: \"\\f6e7\"; }\n.bi-optical-audio-fill::before { content: \"\\f6e8\"; }\n.bi-optical-audio::before { content: \"\\f6e9\"; }\n.bi-pci-card::before { content: \"\\f6ea\"; }\n.bi-router-fill::before { content: \"\\f6eb\"; }\n.bi-router::before { content: \"\\f6ec\"; }\n.bi-ssd-fill::before { content: \"\\f6ed\"; }\n.bi-ssd::before { content: \"\\f6ee\"; }\n.bi-thunderbolt-fill::before { content: \"\\f6ef\"; }\n.bi-thunderbolt::before { content: \"\\f6f0\"; }\n.bi-usb-drive-fill::before { content: \"\\f6f1\"; }\n.bi-usb-drive::before { content: \"\\f6f2\"; }\n.bi-usb-micro-fill::before { content: \"\\f6f3\"; }\n.bi-usb-micro::before { content: \"\\f6f4\"; }\n.bi-usb-mini-fill::before { content: \"\\f6f5\"; }\n.bi-usb-mini::before { content: \"\\f6f6\"; }\n.bi-cloud-haze2::before { content: \"\\f6f7\"; }\n.bi-device-hdd-fill::before { content: \"\\f6f8\"; }\n.bi-device-hdd::before { content: \"\\f6f9\"; }\n.bi-device-ssd-fill::before { content: \"\\f6fa\"; }\n.bi-device-ssd::before { content: \"\\f6fb\"; }\n.bi-displayport-fill::before { content: \"\\f6fc\"; }\n.bi-mortarboard-fill::before { content: \"\\f6fd\"; }\n.bi-mortarboard::before { content: \"\\f6fe\"; }\n.bi-terminal-x::before { content: \"\\f6ff\"; }\n.bi-arrow-through-heart-fill::before { content: \"\\f700\"; }\n.bi-arrow-through-heart::before { content: \"\\f701\"; }\n.bi-badge-sd-fill::before { content: \"\\f702\"; }\n.bi-badge-sd::before { content: \"\\f703\"; }\n.bi-bag-heart-fill::before { content: \"\\f704\"; }\n.bi-bag-heart::before { content: \"\\f705\"; }\n.bi-balloon-fill::before { content: \"\\f706\"; }\n.bi-balloon-heart-fill::before { content: \"\\f707\"; }\n.bi-balloon-heart::before { content: \"\\f708\"; }\n.bi-balloon::before { content: \"\\f709\"; }\n.bi-box2-fill::before { content: \"\\f70a\"; }\n.bi-box2-heart-fill::before { content: \"\\f70b\"; }\n.bi-box2-heart::before { content: \"\\f70c\"; }\n.bi-box2::before { content: \"\\f70d\"; }\n.bi-braces-asterisk::before { content: \"\\f70e\"; }\n.bi-calendar-heart-fill::before { content: \"\\f70f\"; }\n.bi-calendar-heart::before { content: \"\\f710\"; }\n.bi-calendar2-heart-fill::before { content: \"\\f711\"; }\n.bi-calendar2-heart::before { content: \"\\f712\"; }\n.bi-chat-heart-fill::before { content: \"\\f713\"; }\n.bi-chat-heart::before { content: \"\\f714\"; }\n.bi-chat-left-heart-fill::before { content: \"\\f715\"; }\n.bi-chat-left-heart::before { content: \"\\f716\"; }\n.bi-chat-right-heart-fill::before { content: \"\\f717\"; }\n.bi-chat-right-heart::before { content: \"\\f718\"; }\n.bi-chat-square-heart-fill::before { content: \"\\f719\"; }\n.bi-chat-square-heart::before { content: \"\\f71a\"; }\n.bi-clipboard-check-fill::before { content: \"\\f71b\"; }\n.bi-clipboard-data-fill::before { content: \"\\f71c\"; }\n.bi-clipboard-fill::before { content: \"\\f71d\"; }\n.bi-clipboard-heart-fill::before { content: \"\\f71e\"; }\n.bi-clipboard-heart::before { content: \"\\f71f\"; }\n.bi-clipboard-minus-fill::before { content: \"\\f720\"; }\n.bi-clipboard-plus-fill::before { content: \"\\f721\"; }\n.bi-clipboard-pulse::before { content: \"\\f722\"; }\n.bi-clipboard-x-fill::before { content: \"\\f723\"; }\n.bi-clipboard2-check-fill::before { content: \"\\f724\"; }\n.bi-clipboard2-check::before { content: \"\\f725\"; }\n.bi-clipboard2-data-fill::before { content: \"\\f726\"; }\n.bi-clipboard2-data::before { content: \"\\f727\"; }\n.bi-clipboard2-fill::before { content: \"\\f728\"; }\n.bi-clipboard2-heart-fill::before { content: \"\\f729\"; }\n.bi-clipboard2-heart::before { content: \"\\f72a\"; }\n.bi-clipboard2-minus-fill::before { content: \"\\f72b\"; }\n.bi-clipboard2-minus::before { content: \"\\f72c\"; }\n.bi-clipboard2-plus-fill::before { content: \"\\f72d\"; }\n.bi-clipboard2-plus::before { content: \"\\f72e\"; }\n.bi-clipboard2-pulse-fill::before { content: \"\\f72f\"; }\n.bi-clipboard2-pulse::before { content: \"\\f730\"; }\n.bi-clipboard2-x-fill::before { content: \"\\f731\"; }\n.bi-clipboard2-x::before { content: \"\\f732\"; }\n.bi-clipboard2::before { content: \"\\f733\"; }\n.bi-emoji-kiss-fill::before { content: \"\\f734\"; }\n.bi-emoji-kiss::before { content: \"\\f735\"; }\n.bi-envelope-heart-fill::before { content: \"\\f736\"; }\n.bi-envelope-heart::before { content: \"\\f737\"; }\n.bi-envelope-open-heart-fill::before { content: \"\\f738\"; }\n.bi-envelope-open-heart::before { content: \"\\f739\"; }\n.bi-envelope-paper-fill::before { content: \"\\f73a\"; }\n.bi-envelope-paper-heart-fill::before { content: \"\\f73b\"; }\n.bi-envelope-paper-heart::before { content: \"\\f73c\"; }\n.bi-envelope-paper::before { content: \"\\f73d\"; }\n.bi-filetype-aac::before { content: \"\\f73e\"; }\n.bi-filetype-ai::before { content: \"\\f73f\"; }\n.bi-filetype-bmp::before { content: \"\\f740\"; }\n.bi-filetype-cs::before { content: \"\\f741\"; }\n.bi-filetype-css::before { content: \"\\f742\"; }\n.bi-filetype-csv::before { content: \"\\f743\"; }\n.bi-filetype-doc::before { content: \"\\f744\"; }\n.bi-filetype-docx::before { content: \"\\f745\"; }\n.bi-filetype-exe::before { content: \"\\f746\"; }\n.bi-filetype-gif::before { content: \"\\f747\"; }\n.bi-filetype-heic::before { content: \"\\f748\"; }\n.bi-filetype-html::before { content: \"\\f749\"; }\n.bi-filetype-java::before { content: \"\\f74a\"; }\n.bi-filetype-jpg::before { content: \"\\f74b\"; }\n.bi-filetype-js::before { content: \"\\f74c\"; }\n.bi-filetype-jsx::before { content: \"\\f74d\"; }\n.bi-filetype-key::before { content: \"\\f74e\"; }\n.bi-filetype-m4p::before { content: \"\\f74f\"; }\n.bi-filetype-md::before { content: \"\\f750\"; }\n.bi-filetype-mdx::before { content: \"\\f751\"; }\n.bi-filetype-mov::before { content: \"\\f752\"; }\n.bi-filetype-mp3::before { content: \"\\f753\"; }\n.bi-filetype-mp4::before { content: \"\\f754\"; }\n.bi-filetype-otf::before { content: \"\\f755\"; }\n.bi-filetype-pdf::before { content: \"\\f756\"; }\n.bi-filetype-php::before { content: \"\\f757\"; }\n.bi-filetype-png::before { content: \"\\f758\"; }\n.bi-filetype-ppt-1::before { content: \"\\f759\"; }\n.bi-filetype-ppt::before { content: \"\\f75a\"; }\n.bi-filetype-psd::before { content: \"\\f75b\"; }\n.bi-filetype-py::before { content: \"\\f75c\"; }\n.bi-filetype-raw::before { content: \"\\f75d\"; }\n.bi-filetype-rb::before { content: \"\\f75e\"; }\n.bi-filetype-sass::before { content: \"\\f75f\"; }\n.bi-filetype-scss::before { content: \"\\f760\"; }\n.bi-filetype-sh::before { content: \"\\f761\"; }\n.bi-filetype-svg::before { content: \"\\f762\"; }\n.bi-filetype-tiff::before { content: \"\\f763\"; }\n.bi-filetype-tsx::before { content: \"\\f764\"; }\n.bi-filetype-ttf::before { content: \"\\f765\"; }\n.bi-filetype-txt::before { content: \"\\f766\"; }\n.bi-filetype-wav::before { content: \"\\f767\"; }\n.bi-filetype-woff::before { content: \"\\f768\"; }\n.bi-filetype-xls-1::before { content: \"\\f769\"; }\n.bi-filetype-xls::before { content: \"\\f76a\"; }\n.bi-filetype-xml::before { content: \"\\f76b\"; }\n.bi-filetype-yml::before { content: \"\\f76c\"; }\n.bi-heart-arrow::before { content: \"\\f76d\"; }\n.bi-heart-pulse-fill::before { content: \"\\f76e\"; }\n.bi-heart-pulse::before { content: \"\\f76f\"; }\n.bi-heartbreak-fill::before { content: \"\\f770\"; }\n.bi-heartbreak::before { content: \"\\f771\"; }\n.bi-hearts::before { content: \"\\f772\"; }\n.bi-hospital-fill::before { content: \"\\f773\"; }\n.bi-hospital::before { content: \"\\f774\"; }\n.bi-house-heart-fill::before { content: \"\\f775\"; }\n.bi-house-heart::before { content: \"\\f776\"; }\n.bi-incognito::before { content: \"\\f777\"; }\n.bi-magnet-fill::before { content: \"\\f778\"; }\n.bi-magnet::before { content: \"\\f779\"; }\n.bi-person-heart::before { content: \"\\f77a\"; }\n.bi-person-hearts::before { content: \"\\f77b\"; }\n.bi-phone-flip::before { content: \"\\f77c\"; }\n.bi-plugin::before { content: \"\\f77d\"; }\n.bi-postage-fill::before { content: \"\\f77e\"; }\n.bi-postage-heart-fill::before { content: \"\\f77f\"; }\n.bi-postage-heart::before { content: \"\\f780\"; }\n.bi-postage::before { content: \"\\f781\"; }\n.bi-postcard-fill::before { content: \"\\f782\"; }\n.bi-postcard-heart-fill::before { content: \"\\f783\"; }\n.bi-postcard-heart::before { content: \"\\f784\"; }\n.bi-postcard::before { content: \"\\f785\"; }\n.bi-search-heart-fill::before { content: \"\\f786\"; }\n.bi-search-heart::before { content: \"\\f787\"; }\n.bi-sliders2-vertical::before { content: \"\\f788\"; }\n.bi-sliders2::before { content: \"\\f789\"; }\n.bi-trash3-fill::before { content: \"\\f78a\"; }\n.bi-trash3::before { content: \"\\f78b\"; }\n.bi-valentine::before { content: \"\\f78c\"; }\n.bi-valentine2::before { content: \"\\f78d\"; }\n.bi-wrench-adjustable-circle-fill::before { content: \"\\f78e\"; }\n.bi-wrench-adjustable-circle::before { content: \"\\f78f\"; }\n.bi-wrench-adjustable::before { content: \"\\f790\"; }\n.bi-filetype-json::before { content: \"\\f791\"; }\n.bi-filetype-pptx::before { content: \"\\f792\"; }\n.bi-filetype-xlsx::before { content: \"\\f793\"; }\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 8001:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".flatpickr-calendar{background:transparent;opacity:0;display:none;text-align:center;visibility:hidden;padding:0;-webkit-animation:none;animation:none;direction:ltr;border:0;font-size:14px;line-height:24px;border-radius:5px;position:absolute;width:307.875px;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-touch-action:manipulation;touch-action:manipulation;background:#fff;-webkit-box-shadow:1px 0 0 #e6e6e6,-1px 0 0 #e6e6e6,0 1px 0 #e6e6e6,0 -1px 0 #e6e6e6,0 3px 13px rgba(0,0,0,0.08);box-shadow:1px 0 0 #e6e6e6,-1px 0 0 #e6e6e6,0 1px 0 #e6e6e6,0 -1px 0 #e6e6e6,0 3px 13px rgba(0,0,0,0.08)}.flatpickr-calendar.open,.flatpickr-calendar.inline{opacity:1;max-height:640px;visibility:visible}.flatpickr-calendar.open{display:inline-block;z-index:99999}.flatpickr-calendar.animate.open{-webkit-animation:fpFadeInDown 300ms cubic-bezier(.23,1,.32,1);animation:fpFadeInDown 300ms cubic-bezier(.23,1,.32,1)}.flatpickr-calendar.inline{display:block;position:relative;top:2px}.flatpickr-calendar.static{position:absolute;top:calc(100% + 2px)}.flatpickr-calendar.static.open{z-index:999;display:block}.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+1) .flatpickr-day.inRange:nth-child(7n+7){-webkit-box-shadow:none !important;box-shadow:none !important}.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+2) .flatpickr-day.inRange:nth-child(7n+1){-webkit-box-shadow:-2px 0 0 #e6e6e6,5px 0 0 #e6e6e6;box-shadow:-2px 0 0 #e6e6e6,5px 0 0 #e6e6e6}.flatpickr-calendar .hasWeeks .dayContainer,.flatpickr-calendar .hasTime .dayContainer{border-bottom:0;border-bottom-right-radius:0;border-bottom-left-radius:0}.flatpickr-calendar .hasWeeks .dayContainer{border-left:0}.flatpickr-calendar.hasTime .flatpickr-time{height:40px;border-top:1px solid #e6e6e6}.flatpickr-calendar.noCalendar.hasTime .flatpickr-time{height:auto}.flatpickr-calendar:before,.flatpickr-calendar:after{position:absolute;display:block;pointer-events:none;border:solid transparent;content:'';height:0;width:0;left:22px}.flatpickr-calendar.rightMost:before,.flatpickr-calendar.arrowRight:before,.flatpickr-calendar.rightMost:after,.flatpickr-calendar.arrowRight:after{left:auto;right:22px}.flatpickr-calendar.arrowCenter:before,.flatpickr-calendar.arrowCenter:after{left:50%;right:50%}.flatpickr-calendar:before{border-width:5px;margin:0 -5px}.flatpickr-calendar:after{border-width:4px;margin:0 -4px}.flatpickr-calendar.arrowTop:before,.flatpickr-calendar.arrowTop:after{bottom:100%}.flatpickr-calendar.arrowTop:before{border-bottom-color:#e6e6e6}.flatpickr-calendar.arrowTop:after{border-bottom-color:#fff}.flatpickr-calendar.arrowBottom:before,.flatpickr-calendar.arrowBottom:after{top:100%}.flatpickr-calendar.arrowBottom:before{border-top-color:#e6e6e6}.flatpickr-calendar.arrowBottom:after{border-top-color:#fff}.flatpickr-calendar:focus{outline:0}.flatpickr-wrapper{position:relative;display:inline-block}.flatpickr-months{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.flatpickr-months .flatpickr-month{background:transparent;color:rgba(0,0,0,0.9);fill:rgba(0,0,0,0.9);height:34px;line-height:1;text-align:center;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.flatpickr-months .flatpickr-prev-month,.flatpickr-months .flatpickr-next-month{text-decoration:none;cursor:pointer;position:absolute;top:0;height:34px;padding:10px;z-index:3;color:rgba(0,0,0,0.9);fill:rgba(0,0,0,0.9)}.flatpickr-months .flatpickr-prev-month.flatpickr-disabled,.flatpickr-months .flatpickr-next-month.flatpickr-disabled{display:none}.flatpickr-months .flatpickr-prev-month i,.flatpickr-months .flatpickr-next-month i{position:relative}.flatpickr-months .flatpickr-prev-month.flatpickr-prev-month,.flatpickr-months .flatpickr-next-month.flatpickr-prev-month{/*\n      /*rtl:begin:ignore*/left:0/*\n      /*rtl:end:ignore*/}/*\n      /*rtl:begin:ignore*/\n/*\n      /*rtl:end:ignore*/\n.flatpickr-months .flatpickr-prev-month.flatpickr-next-month,.flatpickr-months .flatpickr-next-month.flatpickr-next-month{/*\n      /*rtl:begin:ignore*/right:0/*\n      /*rtl:end:ignore*/}/*\n      /*rtl:begin:ignore*/\n/*\n      /*rtl:end:ignore*/\n.flatpickr-months .flatpickr-prev-month:hover,.flatpickr-months .flatpickr-next-month:hover{color:#959ea9}.flatpickr-months .flatpickr-prev-month:hover svg,.flatpickr-months .flatpickr-next-month:hover svg{fill:#f64747}.flatpickr-months .flatpickr-prev-month svg,.flatpickr-months .flatpickr-next-month svg{width:14px;height:14px}.flatpickr-months .flatpickr-prev-month svg path,.flatpickr-months .flatpickr-next-month svg path{-webkit-transition:fill .1s;transition:fill .1s;fill:inherit}.numInputWrapper{position:relative;height:auto}.numInputWrapper input,.numInputWrapper span{display:inline-block}.numInputWrapper input{width:100%}.numInputWrapper input::-ms-clear{display:none}.numInputWrapper input::-webkit-outer-spin-button,.numInputWrapper input::-webkit-inner-spin-button{margin:0;-webkit-appearance:none}.numInputWrapper span{position:absolute;right:0;width:14px;padding:0 4px 0 2px;height:50%;line-height:50%;opacity:0;cursor:pointer;border:1px solid rgba(57,57,57,0.15);-webkit-box-sizing:border-box;box-sizing:border-box}.numInputWrapper span:hover{background:rgba(0,0,0,0.1)}.numInputWrapper span:active{background:rgba(0,0,0,0.2)}.numInputWrapper span:after{display:block;content:\"\";position:absolute}.numInputWrapper span.arrowUp{top:0;border-bottom:0}.numInputWrapper span.arrowUp:after{border-left:4px solid transparent;border-right:4px solid transparent;border-bottom:4px solid rgba(57,57,57,0.6);top:26%}.numInputWrapper span.arrowDown{top:50%}.numInputWrapper span.arrowDown:after{border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid rgba(57,57,57,0.6);top:40%}.numInputWrapper span svg{width:inherit;height:auto}.numInputWrapper span svg path{fill:rgba(0,0,0,0.5)}.numInputWrapper:hover{background:rgba(0,0,0,0.05)}.numInputWrapper:hover span{opacity:1}.flatpickr-current-month{font-size:135%;line-height:inherit;font-weight:300;color:inherit;position:absolute;width:75%;left:12.5%;padding:7.48px 0 0 0;line-height:1;height:34px;display:inline-block;text-align:center;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.flatpickr-current-month span.cur-month{font-family:inherit;font-weight:700;color:inherit;display:inline-block;margin-left:.5ch;padding:0}.flatpickr-current-month span.cur-month:hover{background:rgba(0,0,0,0.05)}.flatpickr-current-month .numInputWrapper{width:6ch;width:7ch\\0;display:inline-block}.flatpickr-current-month .numInputWrapper span.arrowUp:after{border-bottom-color:rgba(0,0,0,0.9)}.flatpickr-current-month .numInputWrapper span.arrowDown:after{border-top-color:rgba(0,0,0,0.9)}.flatpickr-current-month input.cur-year{background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;cursor:text;padding:0 0 0 .5ch;margin:0;display:inline-block;font-size:inherit;font-family:inherit;font-weight:300;line-height:inherit;height:auto;border:0;border-radius:0;vertical-align:initial;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}.flatpickr-current-month input.cur-year:focus{outline:0}.flatpickr-current-month input.cur-year[disabled],.flatpickr-current-month input.cur-year[disabled]:hover{font-size:100%;color:rgba(0,0,0,0.5);background:transparent;pointer-events:none}.flatpickr-current-month .flatpickr-monthDropdown-months{appearance:menulist;background:transparent;border:none;border-radius:0;box-sizing:border-box;color:inherit;cursor:pointer;font-size:inherit;font-family:inherit;font-weight:300;height:auto;line-height:inherit;margin:-1px 0 0 0;outline:none;padding:0 0 0 .5ch;position:relative;vertical-align:initial;-webkit-box-sizing:border-box;-webkit-appearance:menulist;-moz-appearance:menulist;width:auto}.flatpickr-current-month .flatpickr-monthDropdown-months:focus,.flatpickr-current-month .flatpickr-monthDropdown-months:active{outline:none}.flatpickr-current-month .flatpickr-monthDropdown-months:hover{background:rgba(0,0,0,0.05)}.flatpickr-current-month .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month{background-color:transparent;outline:none;padding:0}.flatpickr-weekdays{background:transparent;text-align:center;overflow:hidden;width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:28px}.flatpickr-weekdays .flatpickr-weekdaycontainer{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}span.flatpickr-weekday{cursor:default;font-size:90%;background:transparent;color:rgba(0,0,0,0.54);line-height:1;margin:0;text-align:center;display:block;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;font-weight:bolder}.dayContainer,.flatpickr-weeks{padding:1px 0 0 0}.flatpickr-days{position:relative;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;width:307.875px}.flatpickr-days:focus{outline:0}.dayContainer{padding:0;outline:0;text-align:left;width:307.875px;min-width:307.875px;max-width:307.875px;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-wrap:wrap;-ms-flex-pack:justify;-webkit-justify-content:space-around;justify-content:space-around;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}.dayContainer + .dayContainer{-webkit-box-shadow:-1px 0 0 #e6e6e6;box-shadow:-1px 0 0 #e6e6e6}.flatpickr-day{background:none;border:1px solid transparent;border-radius:150px;-webkit-box-sizing:border-box;box-sizing:border-box;color:#393939;cursor:pointer;font-weight:400;width:14.2857143%;-webkit-flex-basis:14.2857143%;-ms-flex-preferred-size:14.2857143%;flex-basis:14.2857143%;max-width:39px;height:39px;line-height:39px;margin:0;display:inline-block;position:relative;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;text-align:center}.flatpickr-day.inRange,.flatpickr-day.prevMonthDay.inRange,.flatpickr-day.nextMonthDay.inRange,.flatpickr-day.today.inRange,.flatpickr-day.prevMonthDay.today.inRange,.flatpickr-day.nextMonthDay.today.inRange,.flatpickr-day:hover,.flatpickr-day.prevMonthDay:hover,.flatpickr-day.nextMonthDay:hover,.flatpickr-day:focus,.flatpickr-day.prevMonthDay:focus,.flatpickr-day.nextMonthDay:focus{cursor:pointer;outline:0;background:#e6e6e6;border-color:#e6e6e6}.flatpickr-day.today{border-color:#959ea9}.flatpickr-day.today:hover,.flatpickr-day.today:focus{border-color:#959ea9;background:#959ea9;color:#fff}.flatpickr-day.selected,.flatpickr-day.startRange,.flatpickr-day.endRange,.flatpickr-day.selected.inRange,.flatpickr-day.startRange.inRange,.flatpickr-day.endRange.inRange,.flatpickr-day.selected:focus,.flatpickr-day.startRange:focus,.flatpickr-day.endRange:focus,.flatpickr-day.selected:hover,.flatpickr-day.startRange:hover,.flatpickr-day.endRange:hover,.flatpickr-day.selected.prevMonthDay,.flatpickr-day.startRange.prevMonthDay,.flatpickr-day.endRange.prevMonthDay,.flatpickr-day.selected.nextMonthDay,.flatpickr-day.startRange.nextMonthDay,.flatpickr-day.endRange.nextMonthDay{background:#569ff7;-webkit-box-shadow:none;box-shadow:none;color:#fff;border-color:#569ff7}.flatpickr-day.selected.startRange,.flatpickr-day.startRange.startRange,.flatpickr-day.endRange.startRange{border-radius:50px 0 0 50px}.flatpickr-day.selected.endRange,.flatpickr-day.startRange.endRange,.flatpickr-day.endRange.endRange{border-radius:0 50px 50px 0}.flatpickr-day.selected.startRange + .endRange:not(:nth-child(7n+1)),.flatpickr-day.startRange.startRange + .endRange:not(:nth-child(7n+1)),.flatpickr-day.endRange.startRange + .endRange:not(:nth-child(7n+1)){-webkit-box-shadow:-10px 0 0 #569ff7;box-shadow:-10px 0 0 #569ff7}.flatpickr-day.selected.startRange.endRange,.flatpickr-day.startRange.startRange.endRange,.flatpickr-day.endRange.startRange.endRange{border-radius:50px}.flatpickr-day.inRange{border-radius:0;-webkit-box-shadow:-5px 0 0 #e6e6e6,5px 0 0 #e6e6e6;box-shadow:-5px 0 0 #e6e6e6,5px 0 0 #e6e6e6}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover,.flatpickr-day.prevMonthDay,.flatpickr-day.nextMonthDay,.flatpickr-day.notAllowed,.flatpickr-day.notAllowed.prevMonthDay,.flatpickr-day.notAllowed.nextMonthDay{color:rgba(57,57,57,0.3);background:transparent;border-color:transparent;cursor:default}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover{cursor:not-allowed;color:rgba(57,57,57,0.1)}.flatpickr-day.week.selected{border-radius:0;-webkit-box-shadow:-5px 0 0 #569ff7,5px 0 0 #569ff7;box-shadow:-5px 0 0 #569ff7,5px 0 0 #569ff7}.flatpickr-day.hidden{visibility:hidden}.rangeMode .flatpickr-day{margin-top:1px}.flatpickr-weekwrapper{float:left}.flatpickr-weekwrapper .flatpickr-weeks{padding:0 12px;-webkit-box-shadow:1px 0 0 #e6e6e6;box-shadow:1px 0 0 #e6e6e6}.flatpickr-weekwrapper .flatpickr-weekday{float:none;width:100%;line-height:28px}.flatpickr-weekwrapper span.flatpickr-day,.flatpickr-weekwrapper span.flatpickr-day:hover{display:block;width:100%;max-width:none;color:rgba(57,57,57,0.3);background:transparent;cursor:default;border:none}.flatpickr-innerContainer{display:block;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.flatpickr-rContainer{display:inline-block;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box}.flatpickr-time{text-align:center;outline:0;display:block;height:0;line-height:40px;max-height:40px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.flatpickr-time:after{content:\"\";display:table;clear:both}.flatpickr-time .numInputWrapper{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;width:40%;height:40px;float:left}.flatpickr-time .numInputWrapper span.arrowUp:after{border-bottom-color:#393939}.flatpickr-time .numInputWrapper span.arrowDown:after{border-top-color:#393939}.flatpickr-time.hasSeconds .numInputWrapper{width:26%}.flatpickr-time.time24hr .numInputWrapper{width:49%}.flatpickr-time input{background:transparent;-webkit-box-shadow:none;box-shadow:none;border:0;border-radius:0;text-align:center;margin:0;padding:0;height:inherit;line-height:inherit;color:#393939;font-size:14px;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}.flatpickr-time input.flatpickr-hour{font-weight:bold}.flatpickr-time input.flatpickr-minute,.flatpickr-time input.flatpickr-second{font-weight:400}.flatpickr-time input:focus{outline:0;border:0}.flatpickr-time .flatpickr-time-separator,.flatpickr-time .flatpickr-am-pm{height:inherit;float:left;line-height:inherit;color:#393939;font-weight:bold;width:2%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center}.flatpickr-time .flatpickr-am-pm{outline:0;width:18%;cursor:pointer;text-align:center;font-weight:400}.flatpickr-time input:hover,.flatpickr-time .flatpickr-am-pm:hover,.flatpickr-time input:focus,.flatpickr-time .flatpickr-am-pm:focus{background:#eee}.flatpickr-input[readonly]{cursor:pointer}@-webkit-keyframes fpFadeInDown{from{opacity:0;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes fpFadeInDown{from{opacity:0;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 683:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_bootstrap_icons_font_bootstrap_icons_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8184);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1667);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3__);
// Imports




var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(7446), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(414), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(7058), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(9824), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(6929), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(2196), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(1480), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(619), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(2989), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_9___ = new URL(/* asset import */ __webpack_require__(5512), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_10___ = new URL(/* asset import */ __webpack_require__(5501), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_11___ = new URL(/* asset import */ __webpack_require__(6758), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_12___ = new URL(/* asset import */ __webpack_require__(9604), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_13___ = new URL(/* asset import */ __webpack_require__(5463), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_14___ = new URL(/* asset import */ __webpack_require__(8427), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_15___ = new URL(/* asset import */ __webpack_require__(2883), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_16___ = new URL(/* asset import */ __webpack_require__(7404), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_17___ = new URL(/* asset import */ __webpack_require__(6592), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_18___ = new URL(/* asset import */ __webpack_require__(349), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_node_modules_bootstrap_icons_font_bootstrap_icons_css__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_0___, { hash: "?#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_3___, { hash: "#open_sansregular" });
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_5___, { hash: "?#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_10___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_8___, { hash: "#open_sanslight" });
var ___CSS_LOADER_URL_REPLACEMENT_11___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_9___);
var ___CSS_LOADER_URL_REPLACEMENT_12___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_10___);
var ___CSS_LOADER_URL_REPLACEMENT_13___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_10___, { hash: "#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_14___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_11___);
var ___CSS_LOADER_URL_REPLACEMENT_15___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_12___);
var ___CSS_LOADER_URL_REPLACEMENT_16___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_13___, { hash: "#ami" });
var ___CSS_LOADER_URL_REPLACEMENT_17___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_14___);
var ___CSS_LOADER_URL_REPLACEMENT_18___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_15___);
var ___CSS_LOADER_URL_REPLACEMENT_19___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_16___);
var ___CSS_LOADER_URL_REPLACEMENT_20___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_17___);
var ___CSS_LOADER_URL_REPLACEMENT_21___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_18___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face{font-family:\"Open Sans\";font-weight:normal;font-style:normal;src:url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");src:local(\"Open Sans\"),local(\"OpenSans\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"embedded-opentype\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format(\"woff2\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format(\"woff\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") format(\"svg\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ") format(\"truetype\")}@font-face{font-family:\"Open Sans Light\";font-weight:normal;font-style:normal;src:url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ");src:local(\"Open Sans Light\"),local(\"OpenSans Light\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ") format(\"embedded-opentype\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ") format(\"woff2\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ") format(\"woff\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_10___ + ") format(\"svg\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_11___ + ") format(\"truetype\")}@font-face{font-family:\"ami\";font-weight:normal;font-style:normal;src:url(" + ___CSS_LOADER_URL_REPLACEMENT_12___ + ");src:url(" + ___CSS_LOADER_URL_REPLACEMENT_13___ + ") format(\"embedded-opentype\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_14___ + ") format(\"woff2\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_15___ + ") format(\"woff\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_16___ + ") format(\"svg\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_17___ + ") format(\"truetype\")}@font-face{font-family:\"Trochut\";font-weight:normal;font-style:normal;src:url(" + ___CSS_LOADER_URL_REPLACEMENT_18___ + ") format(\"truetype\")}a{text-decoration:none}h1,h2,h3,h4,h5,h6{font-family:\"Open Sans Light\",\"Open Sans\"}pre{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_19___ + ");border:1px solid #ced4da;border-radius:.2rem;padding:.5rem}.bi-lpsc:before{font-family:ami !important;vertical-align:0 !important;content:\"\"}.bi-cern:before{font-family:ami !important;vertical-align:0 !important;content:\"\"}.bi-ami:before{font-family:ami !important;vertical-align:0 !important;content:\"\"}.bi-rucio:before{font-family:ami !important;vertical-align:0 !important;content:\"\"}.bi-node-red:before{font-family:ami !important;vertical-align:0 !important;content:\"\"}.bi-arrow-down-circle-fill:before{font-family:ami !important;vertical-align:0 !important;content:\"\"}.bi-arrow-right-circle-fill:before{font-family:ami !important;vertical-align:0 !important;content:\"\"}.bi-arrow-left-circle-fill:before{font-family:ami !important;vertical-align:0 !important;content:\"\"}.bi-arrow-up-circle-fill:before{font-family:ami !important;vertical-align:0 !important;content:\"\"}.bi-key:before{font-family:ami !important;vertical-align:0 !important;content:\"\"}.bi-leaf:before{font-family:ami !important;vertical-align:0 !important;content:\"\"}.bi-flask:before{font-family:ami !important;vertical-align:0 !important;content:\"\"}.bi-slack:before{font-family:ami !important;vertical-align:0 !important;content:\"\"}.bi-db:before{font-family:ami !important;vertical-align:0 !important;content:\"\"}.w-lg-25{width:100%}.w-lg-50{width:100%}.w-lg-75{width:100%}@media screen and (min-width: 992px){.w-lg-25{width:25%}.w-lg-50{width:50%}.w-lg-75{width:75%}}.bg-light{background:rgba(0,0,0,.03) url(" + ___CSS_LOADER_URL_REPLACEMENT_20___ + ")}.bg-light2{background:rgba(0,0,0,.03) url(" + ___CSS_LOADER_URL_REPLACEMENT_21___ + ")}.breadcrumb{background:rgba(0,0,0,.03) url(" + ___CSS_LOADER_URL_REPLACEMENT_21___ + ");border-radius:.125rem;padding:.25rem .5rem}.card-header{background:rgba(0,0,0,.03) url(" + ___CSS_LOADER_URL_REPLACEMENT_21___ + ")}.card-footer{background:rgba(0,0,0,.03) url(" + ___CSS_LOADER_URL_REPLACEMENT_21___ + ")}.modal-header{background:#f5f5f5 url(" + ___CSS_LOADER_URL_REPLACEMENT_20___ + ");border-radius:.25rem .25rem 0 0}.modal-footer{background:#f5f5f5 url(" + ___CSS_LOADER_URL_REPLACEMENT_21___ + ");border-radius:0 0 .25rem .25rem}.navbar-nav .dropdown-menu{padding:.3rem 0rem}.navbar-nav .dropdown-divider{margin:.2rem 0rem}.navbar-nav .dropdown-item{padding:.2rem 1rem}@media(min-width: 768px){.navbar-nav>li>.dropdown-menu::before{border-bottom:7px solid rgba(0,0,0,.2);border-left:7px solid transparent;border-right:7px solid transparent;content:\"\";display:inline-block;left:9px;position:absolute;top:-7px}.navbar-nav>li>.dropdown-menu::after{border-bottom:6px solid #fff;border-left:6px solid transparent;border-right:6px solid transparent;content:\"\";display:inline-block;left:10px;position:absolute;top:-6px}.navbar-nav.navbar-right>li>.dropdown-menu::before{left:auto;right:12px}.navbar-nav.navbar-right>li>.dropdown-menu::after{left:auto;right:13px}}.nav-tabs .nav-link{background:none}.form-label{margin-bottom:.125rem}#jsdoc_content{text-align:justify}#jsdoc_content dl.details{border-left:2px solid #ccc;margin-top:.5rem}#jsdoc_content dl.details dt{padding-left:.5rem}#jsdoc_content dl.details dd{padding-left:1.5rem}#jsdoc_content .signature-name{color:#007bff;font-size:calc(1.3*var(--bs-body-font-size, 0.9375rem))}#jsdoc_content .signature-params{color:#000;font-size:calc(1.3*var(--bs-body-font-size, 0.9375rem))}#jsdoc_content .signature-params-attrs{color:#aaa;font-size:calc(1*var(--bs-body-font-size, 0.9375rem))}#jsdoc_content .signature-attrs{color:#aaa;font-size:calc(1.3*var(--bs-body-font-size, 0.9375rem))}#jsdoc_content .signature-params-attrs{font-style:italic;margin-left:2px}#ami_alert_content{position:absolute;z-index:99999999;top:8px;right:8px}.ami-code{text-align:left}.ami-code,.ami-code code{white-space:pre-wrap;word-break:break-all}.monaco-editor,.monaco-editor .overflow-guard{border-radius:calc(.2rem + 1px)}.monaco-editor .margin-view-overlays{background:#f8f9fa url(" + ___CSS_LOADER_URL_REPLACEMENT_21___ + ")}.monaco-editor .lines-content{padding-left:.125rem}.form-editor,.form-editor-monaco{border:1px solid #ced4da;border-radius:.2rem;width:100%}.form-editor-done{opacity:0;pointer-events:none;position:fixed;z-index:-9999;top:0;left:0;height:0;width:0}.select2-container--default{width:100% !important}.select2-container--default .select2-selection--single,.select2-container--default .select2-selection--multiple,.select2-container--default .select2-selection--multiple .select2-selection__choice{border:1px solid #ced4da !important;border-radius:.2rem !important}.select2-container--default .select2-selection--single,.select2-container--default .select2-selection--single .select2-selection__arrow{height:calc(1.5em + .75rem + 2px) !important}.select2-container--default .select2-selection--single{padding:calc((1.5em + .75rem)/2 - 14px) .25rem !important}.form-control-sm~.select2-container--default .select2-selection--single,.form-control-sm~.select2-container--default .select2-selection--single .select2-selection__arrow,.input-group-sm .select2-container--default .select2-selection--single,.input-group-sm .select2-container--default .select2-selection--single .select2-selection__arrow{height:calc(1.5em + .5rem + 2px) !important}.form-control-sm~.select2-container--default .select2-selection--single,.input-group-sm .select2-container--default .select2-selection--single{padding:calc((1.5em + .5rem)/2 - 14px) 0rem !important}.form-control-lg~.select2-container--default .select2-selection--single,.form-control-lg~.select2-container--default .select2-selection--single .select2-selection__arrow,.input-group-lg .select2-container--default .select2-selection--single,.input-group-lg .select2-container--default .select2-selection--single .select2-selection__arrow{height:calc(1.5em + 1rem + 2px) !important}.form-control-lg~.select2-container--default .select2-selection--single,.input-group-lg .select2-container--default .select2-selection--single{padding:calc((1.5em + 1rem)/2 - 14px) .5rem !important}input.form-datetime,input.form-date,input.form-time,input.form-time-hm{background-color:#fff !important}.flatpickr-calendar .dayContainer{padding-bottom:2px}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3645:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 1667:
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ 8081:
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 5987:
/***/ ((module) => {

"use strict";


/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/
var dijkstra = {
  single_source_shortest_paths: function(graph, s, d) {
    // Predecessor map for each node that has been encountered.
    // node ID => predecessor node ID
    var predecessors = {};

    // Costs of shortest paths from s to all nodes encountered.
    // node ID => cost
    var costs = {};
    costs[s] = 0;

    // Costs of shortest paths from s to all nodes encountered; differs from
    // `costs` in that it provides easy access to the node that currently has
    // the known shortest path from s.
    // XXX: Do we actually need both `costs` and `open`?
    var open = dijkstra.PriorityQueue.make();
    open.push(s, 0);

    var closest,
        u, v,
        cost_of_s_to_u,
        adjacent_nodes,
        cost_of_e,
        cost_of_s_to_u_plus_cost_of_e,
        cost_of_s_to_v,
        first_visit;
    while (!open.empty()) {
      // In the nodes remaining in graph that have a known cost from s,
      // find the node, u, that currently has the shortest path from s.
      closest = open.pop();
      u = closest.value;
      cost_of_s_to_u = closest.cost;

      // Get nodes adjacent to u...
      adjacent_nodes = graph[u] || {};

      // ...and explore the edges that connect u to those nodes, updating
      // the cost of the shortest paths to any or all of those nodes as
      // necessary. v is the node across the current edge from u.
      for (v in adjacent_nodes) {
        if (adjacent_nodes.hasOwnProperty(v)) {
          // Get the cost of the edge running from u to v.
          cost_of_e = adjacent_nodes[v];

          // Cost of s to u plus the cost of u to v across e--this is *a*
          // cost from s to v that may or may not be less than the current
          // known cost to v.
          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

          // If we haven't visited v yet OR if the current known cost from s to
          // v is greater than the new cost we just found (cost of s to u plus
          // cost of u to v across e), update v's cost in the cost list and
          // update v's predecessor in the predecessor list (it's now u).
          cost_of_s_to_v = costs[v];
          first_visit = (typeof costs[v] === 'undefined');
          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
            costs[v] = cost_of_s_to_u_plus_cost_of_e;
            open.push(v, cost_of_s_to_u_plus_cost_of_e);
            predecessors[v] = u;
          }
        }
      }
    }

    if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
      var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
      throw new Error(msg);
    }

    return predecessors;
  },

  extract_shortest_path_from_predecessor_list: function(predecessors, d) {
    var nodes = [];
    var u = d;
    var predecessor;
    while (u) {
      nodes.push(u);
      predecessor = predecessors[u];
      u = predecessors[u];
    }
    nodes.reverse();
    return nodes;
  },

  find_path: function(graph, s, d) {
    var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
    return dijkstra.extract_shortest_path_from_predecessor_list(
      predecessors, d);
  },

  /**
   * A very naive priority queue implementation.
   */
  PriorityQueue: {
    make: function (opts) {
      var T = dijkstra.PriorityQueue,
          t = {},
          key;
      opts = opts || {};
      for (key in T) {
        if (T.hasOwnProperty(key)) {
          t[key] = T[key];
        }
      }
      t.queue = [];
      t.sorter = opts.sorter || T.default_sorter;
      return t;
    },

    default_sorter: function (a, b) {
      return a.cost - b.cost;
    },

    /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */
    push: function (value, cost) {
      var item = {value: value, cost: cost};
      this.queue.push(item);
      this.queue.sort(this.sorter);
    },

    /**
     * Return the highest priority element in the queue.
     */
    pop: function () {
      return this.queue.shift();
    },

    empty: function () {
      return this.queue.length === 0;
    }
  }
};


// node.js module exports
if (true) {
  module.exports = dijkstra;
}


/***/ }),

/***/ 2378:
/***/ ((module) => {

"use strict";


module.exports = function encodeUtf8 (input) {
  var result = []
  var size = input.length

  for (var index = 0; index < size; index++) {
    var point = input.charCodeAt(index)

    if (point >= 0xD800 && point <= 0xDBFF && size > index + 1) {
      var second = input.charCodeAt(index + 1)

      if (second >= 0xDC00 && second <= 0xDFFF) {
        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        point = (point - 0xD800) * 0x400 + second - 0xDC00 + 0x10000
        index += 1
      }
    }

    // US-ASCII
    if (point < 0x80) {
      result.push(point)
      continue
    }

    // 2-byte UTF-8
    if (point < 0x800) {
      result.push((point >> 6) | 192)
      result.push((point & 63) | 128)
      continue
    }

    // 3-byte UTF-8
    if (point < 0xD800 || (point >= 0xE000 && point < 0x10000)) {
      result.push((point >> 12) | 224)
      result.push(((point >> 6) & 63) | 128)
      result.push((point & 63) | 128)
      continue
    }

    // 4-byte UTF-8
    if (point >= 0x10000 && point <= 0x10FFFF) {
      result.push((point >> 18) | 240)
      result.push(((point >> 12) & 63) | 128)
      result.push(((point >> 6) & 63) | 128)
      result.push((point & 63) | 128)
      continue
    }

    // Invalid character
    result.push(0xEF, 0xBF, 0xBD)
  }

  return new Uint8Array(result).buffer
}


/***/ }),

/***/ 1895:
/***/ (() => {

"use strict";

if (typeof Object.assign !== "function") {
    Object.assign = function (target, ...args) {
        if (!target) {
            throw TypeError("Cannot convert undefined or null to object");
        }
        for (const source of args) {
            if (source) {
                Object.keys(source).forEach((key) => (target[key] = source[key]));
            }
        }
        return target;
    };
}


/***/ }),

/***/ 6915:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(5583);

/***/ }),

/***/ 5583:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;
/**
* JSPath
*
* Copyright (c) 2012 Filatov Dmitry (dfilatov@yandex-team.ru)
* With parts by Marat Dulin (mdevils@gmail.com)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* @version 0.4.0
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

if( true && typeof module.exports === 'object') {
    module.exports = decl;
}
else if(typeof modules === 'object') {
    modules.define('jspath', function(provide) {
        provide(decl);
    });
}
else if(true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function(require, exports, module) {
        module.exports = decl;
    }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}
else {}

})();


/***/ }),

/***/ 2340:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// this loading routine is shamelessly copied from the "moment-duration-format" plugin
// @see https://github.com/jsmreese/moment-duration-format
(function loadMomentJS (root, factory) {
  if (true) {
    // Detected AMD;
    // will register as an anonymous module
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8488)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

  if (root) {
    //working with globals;
    root.momentJDateFormatParserSetup = root.moment ? factory(root.moment) : factory;
  }
})(this, function loadPlugin (moment) {
  /**
   * The internal **Java** date formats cache.
   *
   * @property javaDateFormats
   * @type {Object}
   */
  var javaDateFormats = {};

  /**
   * The internal **moment.js** date formats cache.
   *
   * @property momentDateFormats
   * @type {Object}
   */
  var momentDateFormats = {};

  /**
   * The format pattern mapping from Java format to momentjs.
   *
   * @property javaFormatMapping
   * @type {Object}
   */
  var javaFormatMapping = {
    d: 'D',
    dd: 'DD',
    y: 'YYYY',
    yy: 'YY',
    yyy: 'YYYY',
    yyyy: 'YYYY',
    a: 'a',
    A: 'A',
    M: 'M',
    MM: 'MM',
    MMM: 'MMM',
    MMMM: 'MMMM',
    h: 'h',
    hh: 'hh',
    H: 'H',
    HH: 'HH',
    m: 'm',
    mm: 'mm',
    s: 's',
    ss: 'ss',
    S: 'SSS',
    SS: 'SSS',
    SSS: 'SSS',
    E: 'ddd',
    EE: 'ddd',
    EEE: 'ddd',
    EEEE: 'dddd',
    EEEEE: 'dddd',
    EEEEEE: 'dddd',
    D: 'DDD',
    w: 'W',
    ww: 'WW',
    z: 'ZZ',
    zzzz: 'Z',
    Z: 'ZZ',
    X: 'ZZ',
    XX: 'ZZ',
    XXX: 'Z',
    u: 'E'
  };

  /**
   * The format pattern mapping from Java format to moment.js.
   *
   * @property momentFormatMapping
   * @type {Object}
   */
  var momentFormatMapping = {
    D: 'd',
    DD: 'dd',
    YY: 'yy',
    YYY: 'yyyy',
    YYYY: 'yyyy',
    a: 'a',
    A: 'a',
    M: 'M',
    MM: 'MM',
    MMM: 'MMM',
    MMMM: 'MMMM',
    h: 'h',
    hh: 'hh',
    H: 'H',
    HH: 'HH',
    m: 'm',
    mm: 'mm',
    s: 's',
    ss: 'ss',
    S: 'S',
    SS: 'S',
    SSS: 'S',
    ddd: 'E',
    dddd: 'EEEE',
    DDD: 'D',
    W: 'w',
    WW: 'ww',
    ZZ: 'z',
    Z: 'XXX',
    E: 'u'
  };


  /**
   * Translates the java date format String to a momentjs format String.
   *
   * @function translateFormat
   * @param {String}  formatString    The unmodified format string
   * @param {Object}  mapping         The date format mapping object
   * @returns {String}
   */
  var translateFormat = function (formatString, mapping) {
    var len = formatString.length;
    var i = 0;
    var startIndex = -1;
    var lastChar = null;
    var currentChar = "";
    var resultString = "";

    for (; i < len; i++) {
      currentChar = formatString.charAt(i);

      if (lastChar === null || lastChar !== currentChar) {
        // change detected
        resultString = _appendMappedString(formatString, mapping, startIndex, i, resultString);

        startIndex = i;
      }

      lastChar = currentChar;
    }

    return _appendMappedString(formatString, mapping, startIndex, i, resultString);
  };

  /**
   * Checks if the substring is a mapped date format pattern and adds it to the result format String.
   *
   * @function _appendMappedString
   * @param {String}  formatString    The unmodified format String.
   * @param {Object}  mapping         The date format mapping Object.
   * @param {Number}  startIndex      The begin index of the continuous format characters.
   * @param {Number}  currentIndex    The last index of the continuous format characters.
   * @param {String}  resultString    The result format String.
   * @returns {String}
   * @private
   */
  var _appendMappedString = function (formatString, mapping, startIndex, currentIndex, resultString) {
    if (startIndex !== -1) {
      var tempString = formatString.substring(startIndex, currentIndex);

      // check if the temporary string has a known mapping
      if (mapping[tempString]) {
        tempString = mapping[tempString];
      }

      resultString += tempString;
    }

    return resultString;
  };

// init
  function init (momentJS) {
    if (!momentJS) {
      throw new Error("Moment JDateFormatParser Plugin - Cannot find moment.js instance.");
    }

    // register as private function (good for testing purposes)
    momentJS.fn.__translateJavaFormat = translateFormat;

    /**
     * Translates the momentjs format String to a java date format String.
     *
     * @function toJDFString
     * @param {String}  formatString    The format String to be translated.
     * @returns {String}
     */
    momentJS.fn.toMomentFormatString = function (formatString) {
      if (!javaDateFormats[formatString]) {
        var mapped = "";
        var regexp = /[^']+|('[^']*')/g;
        var part = '';

        while ((part = regexp.exec(formatString))) {
          part = part[0];

          if (part.match(/'.?'/)) {
            mapped += "[" + part.substring(1, part.length - 1) + "]";
          } else {
            mapped += translateFormat(part, javaFormatMapping);
          }
        }

        javaDateFormats[formatString] = mapped;
      }

      return javaDateFormats[formatString];
    };

    /**
     * Format the moment with the given java date format String.
     *
     * @function formatWithJDF
     * @param {String}  formatString    The format String to be translated.
     * @returns {String}
     */
    momentJS.fn.formatWithJDF = function (formatString) {
      return this.format(this.toMomentFormatString(formatString));
    };

    /**
     * Translates the momentjs format string to a java date format string
     *
     * @function toJDFString
     * @param {String}  formatString    The format String to be translated.
     * @returns {String}
     */
    momentJS.fn.toJDFString = function (formatString) {
      if (!momentDateFormats[formatString]) {
        momentDateFormats[formatString] = translateFormat(formatString, momentFormatMapping);
      }

      return momentDateFormats[formatString];
    };
  }

  // Initialize JDateFormatParser Plugin on the global moment instance.
  init(moment);

  // Return the init function so that the JDateFormatParser Plugin can be
  // initialized on other moment instances.
  return init;
});

/***/ }),

/***/ 8295:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*******************************************************************************
 * Copyright (c) 2013 IBM Corp.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and Eclipse Distribution License v1.0 which accompany this distribution.
 *
 * The Eclipse Public License is available at
 *    http://www.eclipse.org/legal/epl-v10.html
 * and the Eclipse Distribution License is available at
 *   http://www.eclipse.org/org/documents/edl-v10.php.
 *
 * Contributors:
 *    Andrew Banks - initial API and implementation and initial documentation
 *******************************************************************************/


// Only expose a single object name in the global namespace.
// Everything must go through this module. Global Paho module
// only has a single public function, client, which returns
// a Paho client object given connection details.

/**
 * Send and receive messages using web browsers.
 * <p>
 * This programming interface lets a JavaScript client application use the MQTT V3.1 or
 * V3.1.1 protocol to connect to an MQTT-supporting messaging server.
 *
 * The function supported includes:
 * <ol>
 * <li>Connecting to and disconnecting from a server. The server is identified by its host name and port number.
 * <li>Specifying options that relate to the communications link with the server,
 * for example the frequency of keep-alive heartbeats, and whether SSL/TLS is required.
 * <li>Subscribing to and receiving messages from MQTT Topics.
 * <li>Publishing messages to MQTT Topics.
 * </ol>
 * <p>
 * The API consists of two main objects:
 * <dl>
 * <dt><b>{@link Paho.Client}</b></dt>
 * <dd>This contains methods that provide the functionality of the API,
 * including provision of callbacks that notify the application when a message
 * arrives from or is delivered to the messaging server,
 * or when the status of its connection to the messaging server changes.</dd>
 * <dt><b>{@link Paho.Message}</b></dt>
 * <dd>This encapsulates the payload of the message along with various attributes
 * associated with its delivery, in particular the destination to which it has
 * been (or is about to be) sent.</dd>
 * </dl>
 * <p>
 * The programming interface validates parameters passed to it, and will throw
 * an Error containing an error message intended for developer use, if it detects
 * an error with any parameter.
 * <p>
 * Example:
 *
 * <code><pre>
var client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({onSuccess:onConnect});

function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("/World");
  var message = new Paho.MQTT.Message("Hello");
  message.destinationName = "/World";
  client.send(message);
};
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0)
	console.log("onConnectionLost:"+responseObject.errorMessage);
};
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  client.disconnect();
};
 * </pre></code>
 * @namespace Paho
 */

/* jshint shadow:true */
(function ExportLibrary(root, factory) {
	if(true){
		module.exports = factory();
	} else {}
})(this, function LibraryFactory(){


	var PahoMQTT = (function (global) {

	// Private variables below, these are only visible inside the function closure
	// which is used to define the module.
	var version = "@VERSION@-@BUILDLEVEL@";

	/**
	 * @private
	 */
	var localStorage = global.localStorage || (function () {
		var data = {};

		return {
			setItem: function (key, item) { data[key] = item; },
			getItem: function (key) { return data[key]; },
			removeItem: function (key) { delete data[key]; },
		};
	})();

		/**
	 * Unique message type identifiers, with associated
	 * associated integer values.
	 * @private
	 */
		var MESSAGE_TYPE = {
			CONNECT: 1,
			CONNACK: 2,
			PUBLISH: 3,
			PUBACK: 4,
			PUBREC: 5,
			PUBREL: 6,
			PUBCOMP: 7,
			SUBSCRIBE: 8,
			SUBACK: 9,
			UNSUBSCRIBE: 10,
			UNSUBACK: 11,
			PINGREQ: 12,
			PINGRESP: 13,
			DISCONNECT: 14
		};

		// Collection of utility methods used to simplify module code
		// and promote the DRY pattern.

		/**
	 * Validate an object's parameter names to ensure they
	 * match a list of expected variables name for this option
	 * type. Used to ensure option object passed into the API don't
	 * contain erroneous parameters.
	 * @param {Object} obj - User options object
	 * @param {Object} keys - valid keys and types that may exist in obj.
	 * @throws {Error} Invalid option parameter found.
	 * @private
	 */
		var validate = function(obj, keys) {
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					if (keys.hasOwnProperty(key)) {
						if (typeof obj[key] !== keys[key])
							throw new Error(format(ERROR.INVALID_TYPE, [typeof obj[key], key]));
					} else {
						var errorStr = "Unknown property, " + key + ". Valid properties are:";
						for (var validKey in keys)
							if (keys.hasOwnProperty(validKey))
								errorStr = errorStr+" "+validKey;
						throw new Error(errorStr);
					}
				}
			}
		};

		/**
	 * Return a new function which runs the user function bound
	 * to a fixed scope.
	 * @param {function} User function
	 * @param {object} Function scope
	 * @return {function} User function bound to another scope
	 * @private
	 */
		var scope = function (f, scope) {
			return function () {
				return f.apply(scope, arguments);
			};
		};

		/**
	 * Unique message type identifiers, with associated
	 * associated integer values.
	 * @private
	 */
		var ERROR = {
			OK: {code:0, text:"AMQJSC0000I OK."},
			CONNECT_TIMEOUT: {code:1, text:"AMQJSC0001E Connect timed out."},
			SUBSCRIBE_TIMEOUT: {code:2, text:"AMQJS0002E Subscribe timed out."},
			UNSUBSCRIBE_TIMEOUT: {code:3, text:"AMQJS0003E Unsubscribe timed out."},
			PING_TIMEOUT: {code:4, text:"AMQJS0004E Ping timed out."},
			INTERNAL_ERROR: {code:5, text:"AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}"},
			CONNACK_RETURNCODE: {code:6, text:"AMQJS0006E Bad Connack return code:{0} {1}."},
			SOCKET_ERROR: {code:7, text:"AMQJS0007E Socket error:{0}."},
			SOCKET_CLOSE: {code:8, text:"AMQJS0008I Socket closed."},
			MALFORMED_UTF: {code:9, text:"AMQJS0009E Malformed UTF data:{0} {1} {2}."},
			UNSUPPORTED: {code:10, text:"AMQJS0010E {0} is not supported by this browser."},
			INVALID_STATE: {code:11, text:"AMQJS0011E Invalid state {0}."},
			INVALID_TYPE: {code:12, text:"AMQJS0012E Invalid type {0} for {1}."},
			INVALID_ARGUMENT: {code:13, text:"AMQJS0013E Invalid argument {0} for {1}."},
			UNSUPPORTED_OPERATION: {code:14, text:"AMQJS0014E Unsupported operation."},
			INVALID_STORED_DATA: {code:15, text:"AMQJS0015E Invalid data in local storage key={0} value={1}."},
			INVALID_MQTT_MESSAGE_TYPE: {code:16, text:"AMQJS0016E Invalid MQTT message type {0}."},
			MALFORMED_UNICODE: {code:17, text:"AMQJS0017E Malformed Unicode string:{0} {1}."},
			BUFFER_FULL: {code:18, text:"AMQJS0018E Message buffer is full, maximum buffer size: {0}."},
		};

		/** CONNACK RC Meaning. */
		var CONNACK_RC = {
			0:"Connection Accepted",
			1:"Connection Refused: unacceptable protocol version",
			2:"Connection Refused: identifier rejected",
			3:"Connection Refused: server unavailable",
			4:"Connection Refused: bad user name or password",
			5:"Connection Refused: not authorized"
		};

	/**
	 * Format an error message text.
	 * @private
	 * @param {error} ERROR value above.
	 * @param {substitutions} [array] substituted into the text.
	 * @return the text with the substitutions made.
	 */
		var format = function(error, substitutions) {
			var text = error.text;
			if (substitutions) {
				var field,start;
				for (var i=0; i<substitutions.length; i++) {
					field = "{"+i+"}";
					start = text.indexOf(field);
					if(start > 0) {
						var part1 = text.substring(0,start);
						var part2 = text.substring(start+field.length);
						text = part1+substitutions[i]+part2;
					}
				}
			}
			return text;
		};

		//MQTT protocol and version          6    M    Q    I    s    d    p    3
		var MqttProtoIdentifierv3 = [0x00,0x06,0x4d,0x51,0x49,0x73,0x64,0x70,0x03];
		//MQTT proto/version for 311         4    M    Q    T    T    4
		var MqttProtoIdentifierv4 = [0x00,0x04,0x4d,0x51,0x54,0x54,0x04];

		/**
	 * Construct an MQTT wire protocol message.
	 * @param type MQTT packet type.
	 * @param options optional wire message attributes.
	 *
	 * Optional properties
	 *
	 * messageIdentifier: message ID in the range [0..65535]
	 * payloadMessage:	Application Message - PUBLISH only
	 * connectStrings:	array of 0 or more Strings to be put into the CONNECT payload
	 * topics:			array of strings (SUBSCRIBE, UNSUBSCRIBE)
	 * requestQoS:		array of QoS values [0..2]
	 *
	 * "Flag" properties
	 * cleanSession:	true if present / false if absent (CONNECT)
	 * willMessage:  	true if present / false if absent (CONNECT)
	 * isRetained:		true if present / false if absent (CONNECT)
	 * userName:		true if present / false if absent (CONNECT)
	 * password:		true if present / false if absent (CONNECT)
	 * keepAliveInterval:	integer [0..65535]  (CONNECT)
	 *
	 * @private
	 * @ignore
	 */
		var WireMessage = function (type, options) {
			this.type = type;
			for (var name in options) {
				if (options.hasOwnProperty(name)) {
					this[name] = options[name];
				}
			}
		};

		WireMessage.prototype.encode = function() {
		// Compute the first byte of the fixed header
			var first = ((this.type & 0x0f) << 4);

			/*
		 * Now calculate the length of the variable header + payload by adding up the lengths
		 * of all the component parts
		 */

			var remLength = 0;
			var topicStrLength = [];
			var destinationNameLength = 0;
			var willMessagePayloadBytes;

			// if the message contains a messageIdentifier then we need two bytes for that
			if (this.messageIdentifier !== undefined)
				remLength += 2;

			switch(this.type) {
			// If this a Connect then we need to include 12 bytes for its header
			case MESSAGE_TYPE.CONNECT:
				switch(this.mqttVersion) {
				case 3:
					remLength += MqttProtoIdentifierv3.length + 3;
					break;
				case 4:
					remLength += MqttProtoIdentifierv4.length + 3;
					break;
				}

				remLength += UTF8Length(this.clientId) + 2;
				if (this.willMessage !== undefined) {
					remLength += UTF8Length(this.willMessage.destinationName) + 2;
					// Will message is always a string, sent as UTF-8 characters with a preceding length.
					willMessagePayloadBytes = this.willMessage.payloadBytes;
					if (!(willMessagePayloadBytes instanceof Uint8Array))
						willMessagePayloadBytes = new Uint8Array(payloadBytes);
					remLength += willMessagePayloadBytes.byteLength +2;
				}
				if (this.userName !== undefined)
					remLength += UTF8Length(this.userName) + 2;
				if (this.password !== undefined)
					remLength += UTF8Length(this.password) + 2;
				break;

			// Subscribe, Unsubscribe can both contain topic strings
			case MESSAGE_TYPE.SUBSCRIBE:
				first |= 0x02; // Qos = 1;
				for ( var i = 0; i < this.topics.length; i++) {
					topicStrLength[i] = UTF8Length(this.topics[i]);
					remLength += topicStrLength[i] + 2;
				}
				remLength += this.requestedQos.length; // 1 byte for each topic's Qos
				// QoS on Subscribe only
				break;

			case MESSAGE_TYPE.UNSUBSCRIBE:
				first |= 0x02; // Qos = 1;
				for ( var i = 0; i < this.topics.length; i++) {
					topicStrLength[i] = UTF8Length(this.topics[i]);
					remLength += topicStrLength[i] + 2;
				}
				break;

			case MESSAGE_TYPE.PUBREL:
				first |= 0x02; // Qos = 1;
				break;

			case MESSAGE_TYPE.PUBLISH:
				if (this.payloadMessage.duplicate) first |= 0x08;
				first  = first |= (this.payloadMessage.qos << 1);
				if (this.payloadMessage.retained) first |= 0x01;
				destinationNameLength = UTF8Length(this.payloadMessage.destinationName);
				remLength += destinationNameLength + 2;
				var payloadBytes = this.payloadMessage.payloadBytes;
				remLength += payloadBytes.byteLength;
				if (payloadBytes instanceof ArrayBuffer)
					payloadBytes = new Uint8Array(payloadBytes);
				else if (!(payloadBytes instanceof Uint8Array))
					payloadBytes = new Uint8Array(payloadBytes.buffer);
				break;

			case MESSAGE_TYPE.DISCONNECT:
				break;

			default:
				break;
			}

			// Now we can allocate a buffer for the message

			var mbi = encodeMBI(remLength);  // Convert the length to MQTT MBI format
			var pos = mbi.length + 1;        // Offset of start of variable header
			var buffer = new ArrayBuffer(remLength + pos);
			var byteStream = new Uint8Array(buffer);    // view it as a sequence of bytes

			//Write the fixed header into the buffer
			byteStream[0] = first;
			byteStream.set(mbi,1);

			// If this is a PUBLISH then the variable header starts with a topic
			if (this.type == MESSAGE_TYPE.PUBLISH)
				pos = writeString(this.payloadMessage.destinationName, destinationNameLength, byteStream, pos);
			// If this is a CONNECT then the variable header contains the protocol name/version, flags and keepalive time

			else if (this.type == MESSAGE_TYPE.CONNECT) {
				switch (this.mqttVersion) {
				case 3:
					byteStream.set(MqttProtoIdentifierv3, pos);
					pos += MqttProtoIdentifierv3.length;
					break;
				case 4:
					byteStream.set(MqttProtoIdentifierv4, pos);
					pos += MqttProtoIdentifierv4.length;
					break;
				}
				var connectFlags = 0;
				if (this.cleanSession)
					connectFlags = 0x02;
				if (this.willMessage !== undefined ) {
					connectFlags |= 0x04;
					connectFlags |= (this.willMessage.qos<<3);
					if (this.willMessage.retained) {
						connectFlags |= 0x20;
					}
				}
				if (this.userName !== undefined)
					connectFlags |= 0x80;
				if (this.password !== undefined)
					connectFlags |= 0x40;
				byteStream[pos++] = connectFlags;
				pos = writeUint16 (this.keepAliveInterval, byteStream, pos);
			}

			// Output the messageIdentifier - if there is one
			if (this.messageIdentifier !== undefined)
				pos = writeUint16 (this.messageIdentifier, byteStream, pos);

			switch(this.type) {
			case MESSAGE_TYPE.CONNECT:
				pos = writeString(this.clientId, UTF8Length(this.clientId), byteStream, pos);
				if (this.willMessage !== undefined) {
					pos = writeString(this.willMessage.destinationName, UTF8Length(this.willMessage.destinationName), byteStream, pos);
					pos = writeUint16(willMessagePayloadBytes.byteLength, byteStream, pos);
					byteStream.set(willMessagePayloadBytes, pos);
					pos += willMessagePayloadBytes.byteLength;

				}
				if (this.userName !== undefined)
					pos = writeString(this.userName, UTF8Length(this.userName), byteStream, pos);
				if (this.password !== undefined)
					pos = writeString(this.password, UTF8Length(this.password), byteStream, pos);
				break;

			case MESSAGE_TYPE.PUBLISH:
				// PUBLISH has a text or binary payload, if text do not add a 2 byte length field, just the UTF characters.
				byteStream.set(payloadBytes, pos);

				break;

				//    	    case MESSAGE_TYPE.PUBREC:
				//    	    case MESSAGE_TYPE.PUBREL:
				//    	    case MESSAGE_TYPE.PUBCOMP:
				//    	    	break;

			case MESSAGE_TYPE.SUBSCRIBE:
				// SUBSCRIBE has a list of topic strings and request QoS
				for (var i=0; i<this.topics.length; i++) {
					pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
					byteStream[pos++] = this.requestedQos[i];
				}
				break;

			case MESSAGE_TYPE.UNSUBSCRIBE:
				// UNSUBSCRIBE has a list of topic strings
				for (var i=0; i<this.topics.length; i++)
					pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
				break;

			default:
				// Do nothing.
			}

			return buffer;
		};

		function decodeMessage(input,pos) {
			var startingPos = pos;
			var first = input[pos];
			var type = first >> 4;
			var messageInfo = first &= 0x0f;
			pos += 1;


			// Decode the remaining length (MBI format)

			var digit;
			var remLength = 0;
			var multiplier = 1;
			do {
				if (pos == input.length) {
					return [null,startingPos];
				}
				digit = input[pos++];
				remLength += ((digit & 0x7F) * multiplier);
				multiplier *= 128;
			} while ((digit & 0x80) !== 0);

			var endPos = pos+remLength;
			if (endPos > input.length) {
				return [null,startingPos];
			}

			var wireMessage = new WireMessage(type);
			switch(type) {
			case MESSAGE_TYPE.CONNACK:
				var connectAcknowledgeFlags = input[pos++];
				if (connectAcknowledgeFlags & 0x01)
					wireMessage.sessionPresent = true;
				wireMessage.returnCode = input[pos++];
				break;

			case MESSAGE_TYPE.PUBLISH:
				var qos = (messageInfo >> 1) & 0x03;

				var len = readUint16(input, pos);
				pos += 2;
				var topicName = parseUTF8(input, pos, len);
				pos += len;
				// If QoS 1 or 2 there will be a messageIdentifier
				if (qos > 0) {
					wireMessage.messageIdentifier = readUint16(input, pos);
					pos += 2;
				}

				var message = new Message(input.subarray(pos, endPos));
				if ((messageInfo & 0x01) == 0x01)
					message.retained = true;
				if ((messageInfo & 0x08) == 0x08)
					message.duplicate =  true;
				message.qos = qos;
				message.destinationName = topicName;
				wireMessage.payloadMessage = message;
				break;

			case  MESSAGE_TYPE.PUBACK:
			case  MESSAGE_TYPE.PUBREC:
			case  MESSAGE_TYPE.PUBREL:
			case  MESSAGE_TYPE.PUBCOMP:
			case  MESSAGE_TYPE.UNSUBACK:
				wireMessage.messageIdentifier = readUint16(input, pos);
				break;

			case  MESSAGE_TYPE.SUBACK:
				wireMessage.messageIdentifier = readUint16(input, pos);
				pos += 2;
				wireMessage.returnCode = input.subarray(pos, endPos);
				break;

			default:
				break;
			}

			return [wireMessage,endPos];
		}

		function writeUint16(input, buffer, offset) {
			buffer[offset++] = input >> 8;      //MSB
			buffer[offset++] = input % 256;     //LSB
			return offset;
		}

		function writeString(input, utf8Length, buffer, offset) {
			offset = writeUint16(utf8Length, buffer, offset);
			stringToUTF8(input, buffer, offset);
			return offset + utf8Length;
		}

		function readUint16(buffer, offset) {
			return 256*buffer[offset] + buffer[offset+1];
		}

		/**
	 * Encodes an MQTT Multi-Byte Integer
	 * @private
	 */
		function encodeMBI(number) {
			var output = new Array(1);
			var numBytes = 0;

			do {
				var digit = number % 128;
				number = number >> 7;
				if (number > 0) {
					digit |= 0x80;
				}
				output[numBytes++] = digit;
			} while ( (number > 0) && (numBytes<4) );

			return output;
		}

		/**
	 * Takes a String and calculates its length in bytes when encoded in UTF8.
	 * @private
	 */
		function UTF8Length(input) {
			var output = 0;
			for (var i = 0; i<input.length; i++)
			{
				var charCode = input.charCodeAt(i);
				if (charCode > 0x7FF)
				{
					// Surrogate pair means its a 4 byte character
					if (0xD800 <= charCode && charCode <= 0xDBFF)
					{
						i++;
						output++;
					}
					output +=3;
				}
				else if (charCode > 0x7F)
					output +=2;
				else
					output++;
			}
			return output;
		}

		/**
	 * Takes a String and writes it into an array as UTF8 encoded bytes.
	 * @private
	 */
		function stringToUTF8(input, output, start) {
			var pos = start;
			for (var i = 0; i<input.length; i++) {
				var charCode = input.charCodeAt(i);

				// Check for a surrogate pair.
				if (0xD800 <= charCode && charCode <= 0xDBFF) {
					var lowCharCode = input.charCodeAt(++i);
					if (isNaN(lowCharCode)) {
						throw new Error(format(ERROR.MALFORMED_UNICODE, [charCode, lowCharCode]));
					}
					charCode = ((charCode - 0xD800)<<10) + (lowCharCode - 0xDC00) + 0x10000;

				}

				if (charCode <= 0x7F) {
					output[pos++] = charCode;
				} else if (charCode <= 0x7FF) {
					output[pos++] = charCode>>6  & 0x1F | 0xC0;
					output[pos++] = charCode     & 0x3F | 0x80;
				} else if (charCode <= 0xFFFF) {
					output[pos++] = charCode>>12 & 0x0F | 0xE0;
					output[pos++] = charCode>>6  & 0x3F | 0x80;
					output[pos++] = charCode     & 0x3F | 0x80;
				} else {
					output[pos++] = charCode>>18 & 0x07 | 0xF0;
					output[pos++] = charCode>>12 & 0x3F | 0x80;
					output[pos++] = charCode>>6  & 0x3F | 0x80;
					output[pos++] = charCode     & 0x3F | 0x80;
				}
			}
			return output;
		}

		function parseUTF8(input, offset, length) {
			var output = "";
			var utf16;
			var pos = offset;

			while (pos < offset+length)
			{
				var byte1 = input[pos++];
				if (byte1 < 128)
					utf16 = byte1;
				else
				{
					var byte2 = input[pos++]-128;
					if (byte2 < 0)
						throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16),""]));
					if (byte1 < 0xE0)             // 2 byte character
						utf16 = 64*(byte1-0xC0) + byte2;
					else
					{
						var byte3 = input[pos++]-128;
						if (byte3 < 0)
							throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16)]));
						if (byte1 < 0xF0)        // 3 byte character
							utf16 = 4096*(byte1-0xE0) + 64*byte2 + byte3;
						else
						{
							var byte4 = input[pos++]-128;
							if (byte4 < 0)
								throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
							if (byte1 < 0xF8)        // 4 byte character
								utf16 = 262144*(byte1-0xF0) + 4096*byte2 + 64*byte3 + byte4;
							else                     // longer encodings are not supported
								throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
						}
					}
				}

				if (utf16 > 0xFFFF)   // 4 byte character - express as a surrogate pair
				{
					utf16 -= 0x10000;
					output += String.fromCharCode(0xD800 + (utf16 >> 10)); // lead character
					utf16 = 0xDC00 + (utf16 & 0x3FF);  // trail character
				}
				output += String.fromCharCode(utf16);
			}
			return output;
		}

		/**
	 * Repeat keepalive requests, monitor responses.
	 * @ignore
	 */
		var Pinger = function(client, keepAliveInterval) {
			this._client = client;
			this._keepAliveInterval = keepAliveInterval*1000;
			this.isReset = false;

			var pingReq = new WireMessage(MESSAGE_TYPE.PINGREQ).encode();

			var doTimeout = function (pinger) {
				return function () {
					return doPing.apply(pinger);
				};
			};

			/** @ignore */
			var doPing = function() {
				if (!this.isReset) {
					this._client._trace("Pinger.doPing", "Timed out");
					this._client._disconnected( ERROR.PING_TIMEOUT.code , format(ERROR.PING_TIMEOUT));
				} else {
					this.isReset = false;
					this._client._trace("Pinger.doPing", "send PINGREQ");
					this._client.socket.send(pingReq);
					this.timeout = setTimeout(doTimeout(this), this._keepAliveInterval);
				}
			};

			this.reset = function() {
				this.isReset = true;
				clearTimeout(this.timeout);
				if (this._keepAliveInterval > 0)
					this.timeout = setTimeout(doTimeout(this), this._keepAliveInterval);
			};

			this.cancel = function() {
				clearTimeout(this.timeout);
			};
		};

		/**
	 * Monitor request completion.
	 * @ignore
	 */
		var Timeout = function(client, timeoutSeconds, action, args) {
			if (!timeoutSeconds)
				timeoutSeconds = 30;

			var doTimeout = function (action, client, args) {
				return function () {
					return action.apply(client, args);
				};
			};
			this.timeout = setTimeout(doTimeout(action, client, args), timeoutSeconds * 1000);

			this.cancel = function() {
				clearTimeout(this.timeout);
			};
		};

	/**
	 * Internal implementation of the Websockets MQTT V3.1 client.
	 *
	 * @name Paho.ClientImpl @constructor
	 * @param {String} host the DNS nameof the webSocket host.
	 * @param {Number} port the port number for that host.
	 * @param {String} clientId the MQ client identifier.
	 */
		var ClientImpl = function (uri, host, port, path, clientId) {
		// Check dependencies are satisfied in this browser.
			if (!("WebSocket" in global && global.WebSocket !== null)) {
				throw new Error(format(ERROR.UNSUPPORTED, ["WebSocket"]));
			}
			if (!("ArrayBuffer" in global && global.ArrayBuffer !== null)) {
				throw new Error(format(ERROR.UNSUPPORTED, ["ArrayBuffer"]));
			}
			this._trace("Paho.Client", uri, host, port, path, clientId);

			this.host = host;
			this.port = port;
			this.path = path;
			this.uri = uri;
			this.clientId = clientId;
			this._wsuri = null;

			// Local storagekeys are qualified with the following string.
			// The conditional inclusion of path in the key is for backward
			// compatibility to when the path was not configurable and assumed to
			// be /mqtt
			this._localKey=host+":"+port+(path!="/mqtt"?":"+path:"")+":"+clientId+":";

			// Create private instance-only message queue
			// Internal queue of messages to be sent, in sending order.
			this._msg_queue = [];
			this._buffered_msg_queue = [];

			// Messages we have sent and are expecting a response for, indexed by their respective message ids.
			this._sentMessages = {};

			// Messages we have received and acknowleged and are expecting a confirm message for
			// indexed by their respective message ids.
			this._receivedMessages = {};

			// Internal list of callbacks to be executed when messages
			// have been successfully sent over web socket, e.g. disconnect
			// when it doesn't have to wait for ACK, just message is dispatched.
			this._notify_msg_sent = {};

			// Unique identifier for SEND messages, incrementing
			// counter as messages are sent.
			this._message_identifier = 1;

			// Used to determine the transmission sequence of stored sent messages.
			this._sequence = 0;


			// Load the local state, if any, from the saved version, only restore state relevant to this client.
			for (var key in localStorage)
				if (   key.indexOf("Sent:"+this._localKey) === 0 || key.indexOf("Received:"+this._localKey) === 0)
					this.restore(key);
		};

		// Messaging Client public instance members.
		ClientImpl.prototype.host = null;
		ClientImpl.prototype.port = null;
		ClientImpl.prototype.path = null;
		ClientImpl.prototype.uri = null;
		ClientImpl.prototype.clientId = null;

		// Messaging Client private instance members.
		ClientImpl.prototype.socket = null;
		/* true once we have received an acknowledgement to a CONNECT packet. */
		ClientImpl.prototype.connected = false;
		/* The largest message identifier allowed, may not be larger than 2**16 but
		 * if set smaller reduces the maximum number of outbound messages allowed.
		 */
		ClientImpl.prototype.maxMessageIdentifier = 65536;
		ClientImpl.prototype.connectOptions = null;
		ClientImpl.prototype.hostIndex = null;
		ClientImpl.prototype.onConnected = null;
		ClientImpl.prototype.onConnectionLost = null;
		ClientImpl.prototype.onMessageDelivered = null;
		ClientImpl.prototype.onMessageArrived = null;
		ClientImpl.prototype.traceFunction = null;
		ClientImpl.prototype._msg_queue = null;
		ClientImpl.prototype._buffered_msg_queue = null;
		ClientImpl.prototype._connectTimeout = null;
		/* The sendPinger monitors how long we allow before we send data to prove to the server that we are alive. */
		ClientImpl.prototype.sendPinger = null;
		/* The receivePinger monitors how long we allow before we require evidence that the server is alive. */
		ClientImpl.prototype.receivePinger = null;
		ClientImpl.prototype._reconnectInterval = 1; // Reconnect Delay, starts at 1 second
		ClientImpl.prototype._reconnecting = false;
		ClientImpl.prototype._reconnectTimeout = null;
		ClientImpl.prototype.disconnectedPublishing = false;
		ClientImpl.prototype.disconnectedBufferSize = 5000;

		ClientImpl.prototype.receiveBuffer = null;

		ClientImpl.prototype._traceBuffer = null;
		ClientImpl.prototype._MAX_TRACE_ENTRIES = 100;

		ClientImpl.prototype.connect = function (connectOptions) {
			var connectOptionsMasked = this._traceMask(connectOptions, "password");
			this._trace("Client.connect", connectOptionsMasked, this.socket, this.connected);

			if (this.connected)
				throw new Error(format(ERROR.INVALID_STATE, ["already connected"]));
			if (this.socket)
				throw new Error(format(ERROR.INVALID_STATE, ["already connected"]));

			if (this._reconnecting) {
			// connect() function is called while reconnect is in progress.
			// Terminate the auto reconnect process to use new connect options.
				this._reconnectTimeout.cancel();
				this._reconnectTimeout = null;
				this._reconnecting = false;
			}

			this.connectOptions = connectOptions;
			this._reconnectInterval = 1;
			this._reconnecting = false;
			if (connectOptions.uris) {
				this.hostIndex = 0;
				this._doConnect(connectOptions.uris[0]);
			} else {
				this._doConnect(this.uri);
			}

		};

		ClientImpl.prototype.subscribe = function (filter, subscribeOptions) {
			this._trace("Client.subscribe", filter, subscribeOptions);

			if (!this.connected)
				throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

            var wireMessage = new WireMessage(MESSAGE_TYPE.SUBSCRIBE);
            wireMessage.topics = filter.constructor === Array ? filter : [filter];
            if (subscribeOptions.qos === undefined)
                subscribeOptions.qos = 0;
            wireMessage.requestedQos = [];
            for (var i = 0; i < wireMessage.topics.length; i++)
                wireMessage.requestedQos[i] = subscribeOptions.qos;

			if (subscribeOptions.onSuccess) {
				wireMessage.onSuccess = function(grantedQos) {subscribeOptions.onSuccess({invocationContext:subscribeOptions.invocationContext,grantedQos:grantedQos});};
			}

			if (subscribeOptions.onFailure) {
				wireMessage.onFailure = function(errorCode) {subscribeOptions.onFailure({invocationContext:subscribeOptions.invocationContext,errorCode:errorCode, errorMessage:format(errorCode)});};
			}

			if (subscribeOptions.timeout) {
				wireMessage.timeOut = new Timeout(this, subscribeOptions.timeout, subscribeOptions.onFailure,
					[{invocationContext:subscribeOptions.invocationContext,
						errorCode:ERROR.SUBSCRIBE_TIMEOUT.code,
						errorMessage:format(ERROR.SUBSCRIBE_TIMEOUT)}]);
			}

			// All subscriptions return a SUBACK.
			this._requires_ack(wireMessage);
			this._schedule_message(wireMessage);
		};

		/** @ignore */
		ClientImpl.prototype.unsubscribe = function(filter, unsubscribeOptions) {
			this._trace("Client.unsubscribe", filter, unsubscribeOptions);

			if (!this.connected)
				throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

            var wireMessage = new WireMessage(MESSAGE_TYPE.UNSUBSCRIBE);
            wireMessage.topics = filter.constructor === Array ? filter : [filter];

			if (unsubscribeOptions.onSuccess) {
				wireMessage.callback = function() {unsubscribeOptions.onSuccess({invocationContext:unsubscribeOptions.invocationContext});};
			}
			if (unsubscribeOptions.timeout) {
				wireMessage.timeOut = new Timeout(this, unsubscribeOptions.timeout, unsubscribeOptions.onFailure,
					[{invocationContext:unsubscribeOptions.invocationContext,
						errorCode:ERROR.UNSUBSCRIBE_TIMEOUT.code,
						errorMessage:format(ERROR.UNSUBSCRIBE_TIMEOUT)}]);
			}

			// All unsubscribes return a SUBACK.
			this._requires_ack(wireMessage);
			this._schedule_message(wireMessage);
		};

		ClientImpl.prototype.send = function (message) {
			this._trace("Client.send", message);

			var wireMessage = new WireMessage(MESSAGE_TYPE.PUBLISH);
			wireMessage.payloadMessage = message;

			if (this.connected) {
			// Mark qos 1 & 2 message as "ACK required"
			// For qos 0 message, invoke onMessageDelivered callback if there is one.
			// Then schedule the message.
				if (message.qos > 0) {
					this._requires_ack(wireMessage);
				} else if (this.onMessageDelivered) {
					this._notify_msg_sent[wireMessage] = this.onMessageDelivered(wireMessage.payloadMessage);
				}
				this._schedule_message(wireMessage);
			} else {
			// Currently disconnected, will not schedule this message
			// Check if reconnecting is in progress and disconnected publish is enabled.
				if (this._reconnecting && this.disconnectedPublishing) {
				// Check the limit which include the "required ACK" messages
					var messageCount = Object.keys(this._sentMessages).length + this._buffered_msg_queue.length;
					if (messageCount > this.disconnectedBufferSize) {
						throw new Error(format(ERROR.BUFFER_FULL, [this.disconnectedBufferSize]));
					} else {
						if (message.qos > 0) {
						// Mark this message as "ACK required"
							this._requires_ack(wireMessage);
						} else {
							wireMessage.sequence = ++this._sequence;
							// Add messages in fifo order to array, by adding to start
							this._buffered_msg_queue.unshift(wireMessage);
						}
					}
				} else {
					throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));
				}
			}
		};

		ClientImpl.prototype.disconnect = function () {
			this._trace("Client.disconnect");

			if (this._reconnecting) {
			// disconnect() function is called while reconnect is in progress.
			// Terminate the auto reconnect process.
				this._reconnectTimeout.cancel();
				this._reconnectTimeout = null;
				this._reconnecting = false;
			}

			if (!this.socket)
				throw new Error(format(ERROR.INVALID_STATE, ["not connecting or connected"]));

			var wireMessage = new WireMessage(MESSAGE_TYPE.DISCONNECT);

			// Run the disconnected call back as soon as the message has been sent,
			// in case of a failure later on in the disconnect processing.
			// as a consequence, the _disconected call back may be run several times.
			this._notify_msg_sent[wireMessage] = scope(this._disconnected, this);

			this._schedule_message(wireMessage);
		};

		ClientImpl.prototype.getTraceLog = function () {
			if ( this._traceBuffer !== null ) {
				this._trace("Client.getTraceLog", new Date());
				this._trace("Client.getTraceLog in flight messages", this._sentMessages.length);
				for (var key in this._sentMessages)
					this._trace("_sentMessages ",key, this._sentMessages[key]);
				for (var key in this._receivedMessages)
					this._trace("_receivedMessages ",key, this._receivedMessages[key]);

				return this._traceBuffer;
			}
		};

		ClientImpl.prototype.startTrace = function () {
			if ( this._traceBuffer === null ) {
				this._traceBuffer = [];
			}
			this._trace("Client.startTrace", new Date(), version);
		};

		ClientImpl.prototype.stopTrace = function () {
			delete this._traceBuffer;
		};

		ClientImpl.prototype._doConnect = function (wsurl) {
		// When the socket is open, this client will send the CONNECT WireMessage using the saved parameters.
			if (this.connectOptions.useSSL) {
				var uriParts = wsurl.split(":");
				uriParts[0] = "wss";
				wsurl = uriParts.join(":");
			}
			this._wsuri = wsurl;
			this.connected = false;



			if (this.connectOptions.mqttVersion < 4) {
				this.socket = new WebSocket(wsurl, ["mqttv3.1"]);
			} else {
				this.socket = new WebSocket(wsurl, ["mqtt"]);
			}
			this.socket.binaryType = "arraybuffer";
			this.socket.onopen = scope(this._on_socket_open, this);
			this.socket.onmessage = scope(this._on_socket_message, this);
			this.socket.onerror = scope(this._on_socket_error, this);
			this.socket.onclose = scope(this._on_socket_close, this);

			this.sendPinger = new Pinger(this, this.connectOptions.keepAliveInterval);
			this.receivePinger = new Pinger(this, this.connectOptions.keepAliveInterval);
			if (this._connectTimeout) {
				this._connectTimeout.cancel();
				this._connectTimeout = null;
			}
			this._connectTimeout = new Timeout(this, this.connectOptions.timeout, this._disconnected,  [ERROR.CONNECT_TIMEOUT.code, format(ERROR.CONNECT_TIMEOUT)]);
		};


		// Schedule a new message to be sent over the WebSockets
		// connection. CONNECT messages cause WebSocket connection
		// to be started. All other messages are queued internally
		// until this has happened. When WS connection starts, process
		// all outstanding messages.
		ClientImpl.prototype._schedule_message = function (message) {
			// Add messages in fifo order to array, by adding to start
			this._msg_queue.unshift(message);
			// Process outstanding messages in the queue if we have an  open socket, and have received CONNACK.
			if (this.connected) {
				this._process_queue();
			}
		};

		ClientImpl.prototype.store = function(prefix, wireMessage) {
			var storedMessage = {type:wireMessage.type, messageIdentifier:wireMessage.messageIdentifier, version:1};

			switch(wireMessage.type) {
			case MESSAGE_TYPE.PUBLISH:
				if(wireMessage.pubRecReceived)
					storedMessage.pubRecReceived = true;

				// Convert the payload to a hex string.
				storedMessage.payloadMessage = {};
				var hex = "";
				var messageBytes = wireMessage.payloadMessage.payloadBytes;
				for (var i=0; i<messageBytes.length; i++) {
					if (messageBytes[i] <= 0xF)
						hex = hex+"0"+messageBytes[i].toString(16);
					else
						hex = hex+messageBytes[i].toString(16);
				}
				storedMessage.payloadMessage.payloadHex = hex;

				storedMessage.payloadMessage.qos = wireMessage.payloadMessage.qos;
				storedMessage.payloadMessage.destinationName = wireMessage.payloadMessage.destinationName;
				if (wireMessage.payloadMessage.duplicate)
					storedMessage.payloadMessage.duplicate = true;
				if (wireMessage.payloadMessage.retained)
					storedMessage.payloadMessage.retained = true;

				// Add a sequence number to sent messages.
				if ( prefix.indexOf("Sent:") === 0 ) {
					if ( wireMessage.sequence === undefined )
						wireMessage.sequence = ++this._sequence;
					storedMessage.sequence = wireMessage.sequence;
				}
				break;

			default:
				throw Error(format(ERROR.INVALID_STORED_DATA, [prefix+this._localKey+wireMessage.messageIdentifier, storedMessage]));
			}
			localStorage.setItem(prefix+this._localKey+wireMessage.messageIdentifier, JSON.stringify(storedMessage));
		};

		ClientImpl.prototype.restore = function(key) {
			var value = localStorage.getItem(key);
			var storedMessage = JSON.parse(value);

			var wireMessage = new WireMessage(storedMessage.type, storedMessage);

			switch(storedMessage.type) {
			case MESSAGE_TYPE.PUBLISH:
				// Replace the payload message with a Message object.
				var hex = storedMessage.payloadMessage.payloadHex;
				var buffer = new ArrayBuffer((hex.length)/2);
				var byteStream = new Uint8Array(buffer);
				var i = 0;
				while (hex.length >= 2) {
					var x = parseInt(hex.substring(0, 2), 16);
					hex = hex.substring(2, hex.length);
					byteStream[i++] = x;
				}
				var payloadMessage = new Message(byteStream);

				payloadMessage.qos = storedMessage.payloadMessage.qos;
				payloadMessage.destinationName = storedMessage.payloadMessage.destinationName;
				if (storedMessage.payloadMessage.duplicate)
					payloadMessage.duplicate = true;
				if (storedMessage.payloadMessage.retained)
					payloadMessage.retained = true;
				wireMessage.payloadMessage = payloadMessage;

				break;

			default:
				throw Error(format(ERROR.INVALID_STORED_DATA, [key, value]));
			}

			if (key.indexOf("Sent:"+this._localKey) === 0) {
				wireMessage.payloadMessage.duplicate = true;
				this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
			} else if (key.indexOf("Received:"+this._localKey) === 0) {
				this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
			}
		};

		ClientImpl.prototype._process_queue = function () {
			var message = null;

			// Send all queued messages down socket connection
			while ((message = this._msg_queue.pop())) {
				this._socket_send(message);
				// Notify listeners that message was successfully sent
				if (this._notify_msg_sent[message]) {
					this._notify_msg_sent[message]();
					delete this._notify_msg_sent[message];
				}
			}
		};

		/**
	 * Expect an ACK response for this message. Add message to the set of in progress
	 * messages and set an unused identifier in this message.
	 * @ignore
	 */
		ClientImpl.prototype._requires_ack = function (wireMessage) {
			var messageCount = Object.keys(this._sentMessages).length;
			if (messageCount > this.maxMessageIdentifier)
				throw Error ("Too many messages:"+messageCount);

			while(this._sentMessages[this._message_identifier] !== undefined) {
				this._message_identifier++;
			}
			wireMessage.messageIdentifier = this._message_identifier;
			this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
			if (wireMessage.type === MESSAGE_TYPE.PUBLISH) {
				this.store("Sent:", wireMessage);
			}
			if (this._message_identifier === this.maxMessageIdentifier) {
				this._message_identifier = 1;
			}
		};

		/**
	 * Called when the underlying websocket has been opened.
	 * @ignore
	 */
		ClientImpl.prototype._on_socket_open = function () {
		// Create the CONNECT message object.
			var wireMessage = new WireMessage(MESSAGE_TYPE.CONNECT, this.connectOptions);
			wireMessage.clientId = this.clientId;
			this._socket_send(wireMessage);
		};

		/**
	 * Called when the underlying websocket has received a complete packet.
	 * @ignore
	 */
		ClientImpl.prototype._on_socket_message = function (event) {
			this._trace("Client._on_socket_message", event.data);
			var messages = this._deframeMessages(event.data);
			for (var i = 0; i < messages.length; i+=1) {
				this._handleMessage(messages[i]);
			}
		};

		ClientImpl.prototype._deframeMessages = function(data) {
			var byteArray = new Uint8Array(data);
			var messages = [];
			if (this.receiveBuffer) {
				var newData = new Uint8Array(this.receiveBuffer.length+byteArray.length);
				newData.set(this.receiveBuffer);
				newData.set(byteArray,this.receiveBuffer.length);
				byteArray = newData;
				delete this.receiveBuffer;
			}
			try {
				var offset = 0;
				while(offset < byteArray.length) {
					var result = decodeMessage(byteArray,offset);
					var wireMessage = result[0];
					offset = result[1];
					if (wireMessage !== null) {
						messages.push(wireMessage);
					} else {
						break;
					}
				}
				if (offset < byteArray.length) {
					this.receiveBuffer = byteArray.subarray(offset);
				}
			} catch (error) {
				var errorStack = ((error.hasOwnProperty("stack") == "undefined") ? error.stack.toString() : "No Error Stack Available");
				this._disconnected(ERROR.INTERNAL_ERROR.code , format(ERROR.INTERNAL_ERROR, [error.message,errorStack]));
				return;
			}
			return messages;
		};

		ClientImpl.prototype._handleMessage = function(wireMessage) {

			this._trace("Client._handleMessage", wireMessage);

			try {
				switch(wireMessage.type) {
				case MESSAGE_TYPE.CONNACK:
					this._connectTimeout.cancel();
					if (this._reconnectTimeout)
						this._reconnectTimeout.cancel();

					// If we have started using clean session then clear up the local state.
					if (this.connectOptions.cleanSession) {
						for (var key in this._sentMessages) {
							var sentMessage = this._sentMessages[key];
							localStorage.removeItem("Sent:"+this._localKey+sentMessage.messageIdentifier);
						}
						this._sentMessages = {};

						for (var key in this._receivedMessages) {
							var receivedMessage = this._receivedMessages[key];
							localStorage.removeItem("Received:"+this._localKey+receivedMessage.messageIdentifier);
						}
						this._receivedMessages = {};
					}
					// Client connected and ready for business.
					if (wireMessage.returnCode === 0) {

						this.connected = true;
						// Jump to the end of the list of uris and stop looking for a good host.

						if (this.connectOptions.uris)
							this.hostIndex = this.connectOptions.uris.length;

					} else {
						this._disconnected(ERROR.CONNACK_RETURNCODE.code , format(ERROR.CONNACK_RETURNCODE, [wireMessage.returnCode, CONNACK_RC[wireMessage.returnCode]]));
						break;
					}

					// Resend messages.
					var sequencedMessages = [];
					for (var msgId in this._sentMessages) {
						if (this._sentMessages.hasOwnProperty(msgId))
							sequencedMessages.push(this._sentMessages[msgId]);
					}

					// Also schedule qos 0 buffered messages if any
					if (this._buffered_msg_queue.length > 0) {
						var msg = null;
						while ((msg = this._buffered_msg_queue.pop())) {
							sequencedMessages.push(msg);
							if (this.onMessageDelivered)
								this._notify_msg_sent[msg] = this.onMessageDelivered(msg.payloadMessage);
						}
					}

					// Sort sentMessages into the original sent order.
					var sequencedMessages = sequencedMessages.sort(function(a,b) {return a.sequence - b.sequence;} );
					for (var i=0, len=sequencedMessages.length; i<len; i++) {
						var sentMessage = sequencedMessages[i];
						if (sentMessage.type == MESSAGE_TYPE.PUBLISH && sentMessage.pubRecReceived) {
							var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, {messageIdentifier:sentMessage.messageIdentifier});
							this._schedule_message(pubRelMessage);
						} else {
							this._schedule_message(sentMessage);
						}
					}

					// Execute the connectOptions.onSuccess callback if there is one.
					// Will also now return if this connection was the result of an automatic
					// reconnect and which URI was successfully connected to.
					if (this.connectOptions.onSuccess) {
						this.connectOptions.onSuccess({invocationContext:this.connectOptions.invocationContext});
					}

					var reconnected = false;
					if (this._reconnecting) {
						reconnected = true;
						this._reconnectInterval = 1;
						this._reconnecting = false;
					}

					// Execute the onConnected callback if there is one.
					this._connected(reconnected, this._wsuri);

					// Process all queued messages now that the connection is established.
					this._process_queue();
					break;

				case MESSAGE_TYPE.PUBLISH:
					this._receivePublish(wireMessage);
					break;

				case MESSAGE_TYPE.PUBACK:
					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
					// If this is a re flow of a PUBACK after we have restarted receivedMessage will not exist.
					if (sentMessage) {
						delete this._sentMessages[wireMessage.messageIdentifier];
						localStorage.removeItem("Sent:"+this._localKey+wireMessage.messageIdentifier);
						if (this.onMessageDelivered)
							this.onMessageDelivered(sentMessage.payloadMessage);
					}
					break;

				case MESSAGE_TYPE.PUBREC:
					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
					// If this is a re flow of a PUBREC after we have restarted receivedMessage will not exist.
					if (sentMessage) {
						sentMessage.pubRecReceived = true;
						var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, {messageIdentifier:wireMessage.messageIdentifier});
						this.store("Sent:", sentMessage);
						this._schedule_message(pubRelMessage);
					}
					break;

				case MESSAGE_TYPE.PUBREL:
					var receivedMessage = this._receivedMessages[wireMessage.messageIdentifier];
					localStorage.removeItem("Received:"+this._localKey+wireMessage.messageIdentifier);
					// If this is a re flow of a PUBREL after we have restarted receivedMessage will not exist.
					if (receivedMessage) {
						this._receiveMessage(receivedMessage);
						delete this._receivedMessages[wireMessage.messageIdentifier];
					}
					// Always flow PubComp, we may have previously flowed PubComp but the server lost it and restarted.
					var pubCompMessage = new WireMessage(MESSAGE_TYPE.PUBCOMP, {messageIdentifier:wireMessage.messageIdentifier});
					this._schedule_message(pubCompMessage);


					break;

				case MESSAGE_TYPE.PUBCOMP:
					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
					delete this._sentMessages[wireMessage.messageIdentifier];
					localStorage.removeItem("Sent:"+this._localKey+wireMessage.messageIdentifier);
					if (this.onMessageDelivered)
						this.onMessageDelivered(sentMessage.payloadMessage);
					break;

				case MESSAGE_TYPE.SUBACK:
					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
					if (sentMessage) {
						if(sentMessage.timeOut)
							sentMessage.timeOut.cancel();
						// This will need to be fixed when we add multiple topic support
						if (wireMessage.returnCode[0] === 0x80) {
							if (sentMessage.onFailure) {
								sentMessage.onFailure(wireMessage.returnCode);
							}
						} else if (sentMessage.onSuccess) {
							sentMessage.onSuccess(wireMessage.returnCode);
						}
						delete this._sentMessages[wireMessage.messageIdentifier];
					}
					break;

				case MESSAGE_TYPE.UNSUBACK:
					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
					if (sentMessage) {
						if (sentMessage.timeOut)
							sentMessage.timeOut.cancel();
						if (sentMessage.callback) {
							sentMessage.callback();
						}
						delete this._sentMessages[wireMessage.messageIdentifier];
					}

					break;

				case MESSAGE_TYPE.PINGRESP:
				/* The sendPinger or receivePinger may have sent a ping, the receivePinger has already been reset. */
					this.sendPinger.reset();
					break;

				case MESSAGE_TYPE.DISCONNECT:
				// Clients do not expect to receive disconnect packets.
					this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code , format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
					break;

				default:
					this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code , format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
				}
			} catch (error) {
				var errorStack = ((error.hasOwnProperty("stack") == "undefined") ? error.stack.toString() : "No Error Stack Available");
				this._disconnected(ERROR.INTERNAL_ERROR.code , format(ERROR.INTERNAL_ERROR, [error.message,errorStack]));
				return;
			}
		};

		/** @ignore */
		ClientImpl.prototype._on_socket_error = function (error) {
			if (!this._reconnecting) {
				this._disconnected(ERROR.SOCKET_ERROR.code , format(ERROR.SOCKET_ERROR, [error.data]));
			}
		};

		/** @ignore */
		ClientImpl.prototype._on_socket_close = function () {
			if (!this._reconnecting) {
				this._disconnected(ERROR.SOCKET_CLOSE.code , format(ERROR.SOCKET_CLOSE));
			}
		};

		/** @ignore */
		ClientImpl.prototype._socket_send = function (wireMessage) {

			if (wireMessage.type == 1) {
				var wireMessageMasked = this._traceMask(wireMessage, "password");
				this._trace("Client._socket_send", wireMessageMasked);
			}
			else this._trace("Client._socket_send", wireMessage);

			this.socket.send(wireMessage.encode());
			/* We have proved to the server we are alive. */
			this.sendPinger.reset();
		};

		/** @ignore */
		ClientImpl.prototype._receivePublish = function (wireMessage) {
			switch(wireMessage.payloadMessage.qos) {
			case "undefined":
			case 0:
				this._receiveMessage(wireMessage);
				break;

			case 1:
				var pubAckMessage = new WireMessage(MESSAGE_TYPE.PUBACK, {messageIdentifier:wireMessage.messageIdentifier});
				this._schedule_message(pubAckMessage);
				this._receiveMessage(wireMessage);
				break;

			case 2:
				this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
				this.store("Received:", wireMessage);
				var pubRecMessage = new WireMessage(MESSAGE_TYPE.PUBREC, {messageIdentifier:wireMessage.messageIdentifier});
				this._schedule_message(pubRecMessage);

				break;

			default:
				throw Error("Invaild qos=" + wireMessage.payloadMessage.qos);
			}
		};

		/** @ignore */
		ClientImpl.prototype._receiveMessage = function (wireMessage) {
			if (this.onMessageArrived) {
				this.onMessageArrived(wireMessage.payloadMessage);
			}
		};

		/**
	 * Client has connected.
	 * @param {reconnect} [boolean] indicate if this was a result of reconnect operation.
	 * @param {uri} [string] fully qualified WebSocket URI of the server.
	 */
		ClientImpl.prototype._connected = function (reconnect, uri) {
		// Execute the onConnected callback if there is one.
			if (this.onConnected)
				this.onConnected(reconnect, uri);
		};

		/**
	 * Attempts to reconnect the client to the server.
   * For each reconnect attempt, will double the reconnect interval
   * up to 128 seconds.
	 */
		ClientImpl.prototype._reconnect = function () {
			this._trace("Client._reconnect");
			if (!this.connected) {
				this._reconnecting = true;
				this.sendPinger.cancel();
				this.receivePinger.cancel();
				if (this._reconnectInterval < 128)
					this._reconnectInterval = this._reconnectInterval * 2;
				if (this.connectOptions.uris) {
					this.hostIndex = 0;
					this._doConnect(this.connectOptions.uris[0]);
				} else {
					this._doConnect(this.uri);
				}
			}
		};

		/**
	 * Client has disconnected either at its own request or because the server
	 * or network disconnected it. Remove all non-durable state.
	 * @param {errorCode} [number] the error number.
	 * @param {errorText} [string] the error text.
	 * @ignore
	 */
		ClientImpl.prototype._disconnected = function (errorCode, errorText) {
			this._trace("Client._disconnected", errorCode, errorText);

			if (errorCode !== undefined && this._reconnecting) {
				//Continue automatic reconnect process
				this._reconnectTimeout = new Timeout(this, this._reconnectInterval, this._reconnect);
				return;
			}

			this.sendPinger.cancel();
			this.receivePinger.cancel();
			if (this._connectTimeout) {
				this._connectTimeout.cancel();
				this._connectTimeout = null;
			}

			// Clear message buffers.
			this._msg_queue = [];
			this._buffered_msg_queue = [];
			this._notify_msg_sent = {};

			if (this.socket) {
			// Cancel all socket callbacks so that they cannot be driven again by this socket.
				this.socket.onopen = null;
				this.socket.onmessage = null;
				this.socket.onerror = null;
				this.socket.onclose = null;
				if (this.socket.readyState === 1)
					this.socket.close();
				delete this.socket;
			}

			if (this.connectOptions.uris && this.hostIndex < this.connectOptions.uris.length-1) {
			// Try the next host.
				this.hostIndex++;
				this._doConnect(this.connectOptions.uris[this.hostIndex]);
			} else {

				if (errorCode === undefined) {
					errorCode = ERROR.OK.code;
					errorText = format(ERROR.OK);
				}

				// Run any application callbacks last as they may attempt to reconnect and hence create a new socket.
				if (this.connected) {
					this.connected = false;
					// Execute the connectionLostCallback if there is one, and we were connected.
					if (this.onConnectionLost) {
						this.onConnectionLost({errorCode:errorCode, errorMessage:errorText, reconnect:this.connectOptions.reconnect, uri:this._wsuri});
					}
					if (errorCode !== ERROR.OK.code && this.connectOptions.reconnect) {
					// Start automatic reconnect process for the very first time since last successful connect.
						this._reconnectInterval = 1;
						this._reconnect();
						return;
					}
				} else {
				// Otherwise we never had a connection, so indicate that the connect has failed.
					if (this.connectOptions.mqttVersion === 4 && this.connectOptions.mqttVersionExplicit === false) {
						this._trace("Failed to connect V4, dropping back to V3");
						this.connectOptions.mqttVersion = 3;
						if (this.connectOptions.uris) {
							this.hostIndex = 0;
							this._doConnect(this.connectOptions.uris[0]);
						} else {
							this._doConnect(this.uri);
						}
					} else if(this.connectOptions.onFailure) {
						this.connectOptions.onFailure({invocationContext:this.connectOptions.invocationContext, errorCode:errorCode, errorMessage:errorText});
					}
				}
			}
		};

		/** @ignore */
		ClientImpl.prototype._trace = function () {
		// Pass trace message back to client's callback function
			if (this.traceFunction) {
				var args = Array.prototype.slice.call(arguments);
				for (var i in args)
				{
					if (typeof args[i] !== "undefined")
						args.splice(i, 1, JSON.stringify(args[i]));
				}
				var record = args.join("");
				this.traceFunction ({severity: "Debug", message: record	});
			}

			//buffer style trace
			if ( this._traceBuffer !== null ) {
				for (var i = 0, max = arguments.length; i < max; i++) {
					if ( this._traceBuffer.length == this._MAX_TRACE_ENTRIES ) {
						this._traceBuffer.shift();
					}
					if (i === 0) this._traceBuffer.push(arguments[i]);
					else if (typeof arguments[i] === "undefined" ) this._traceBuffer.push(arguments[i]);
					else this._traceBuffer.push("  "+JSON.stringify(arguments[i]));
				}
			}
		};

		/** @ignore */
		ClientImpl.prototype._traceMask = function (traceObject, masked) {
			var traceObjectMasked = {};
			for (var attr in traceObject) {
				if (traceObject.hasOwnProperty(attr)) {
					if (attr == masked)
						traceObjectMasked[attr] = "******";
					else
						traceObjectMasked[attr] = traceObject[attr];
				}
			}
			return traceObjectMasked;
		};

		// ------------------------------------------------------------------------
		// Public Programming interface.
		// ------------------------------------------------------------------------

		/**
	 * The JavaScript application communicates to the server using a {@link Paho.Client} object.
	 * <p>
	 * Most applications will create just one Client object and then call its connect() method,
	 * however applications can create more than one Client object if they wish.
	 * In this case the combination of host, port and clientId attributes must be different for each Client object.
	 * <p>
	 * The send, subscribe and unsubscribe methods are implemented as asynchronous JavaScript methods
	 * (even though the underlying protocol exchange might be synchronous in nature).
	 * This means they signal their completion by calling back to the application,
	 * via Success or Failure callback functions provided by the application on the method in question.
	 * Such callbacks are called at most once per method invocation and do not persist beyond the lifetime
	 * of the script that made the invocation.
	 * <p>
	 * In contrast there are some callback functions, most notably <i>onMessageArrived</i>,
	 * that are defined on the {@link Paho.Client} object.
	 * These may get called multiple times, and aren't directly related to specific method invocations made by the client.
	 *
	 * @name Paho.Client
	 *
	 * @constructor
	 *
	 * @param {string} host - the address of the messaging server, as a fully qualified WebSocket URI, as a DNS name or dotted decimal IP address.
	 * @param {number} port - the port number to connect to - only required if host is not a URI
	 * @param {string} path - the path on the host to connect to - only used if host is not a URI. Default: '/mqtt'.
	 * @param {string} clientId - the Messaging client identifier, between 1 and 23 characters in length.
	 *
	 * @property {string} host - <i>read only</i> the server's DNS hostname or dotted decimal IP address.
	 * @property {number} port - <i>read only</i> the server's port.
	 * @property {string} path - <i>read only</i> the server's path.
	 * @property {string} clientId - <i>read only</i> used when connecting to the server.
	 * @property {function} onConnectionLost - called when a connection has been lost.
	 *                            after a connect() method has succeeded.
	 *                            Establish the call back used when a connection has been lost. The connection may be
	 *                            lost because the client initiates a disconnect or because the server or network
	 *                            cause the client to be disconnected. The disconnect call back may be called without
	 *                            the connectionComplete call back being invoked if, for example the client fails to
	 *                            connect.
	 *                            A single response object parameter is passed to the onConnectionLost callback containing the following fields:
	 *                            <ol>
	 *                            <li>errorCode
	 *                            <li>errorMessage
	 *                            </ol>
	 * @property {function} onMessageDelivered - called when a message has been delivered.
	 *                            All processing that this Client will ever do has been completed. So, for example,
	 *                            in the case of a Qos=2 message sent by this client, the PubComp flow has been received from the server
	 *                            and the message has been removed from persistent storage before this callback is invoked.
	 *                            Parameters passed to the onMessageDelivered callback are:
	 *                            <ol>
	 *                            <li>{@link Paho.Message} that was delivered.
	 *                            </ol>
	 * @property {function} onMessageArrived - called when a message has arrived in this Paho.client.
	 *                            Parameters passed to the onMessageArrived callback are:
	 *                            <ol>
	 *                            <li>{@link Paho.Message} that has arrived.
	 *                            </ol>
	 * @property {function} onConnected - called when a connection is successfully made to the server.
	 *                                  after a connect() method.
	 *                                  Parameters passed to the onConnected callback are:
	 *                                  <ol>
	 *                                  <li>reconnect (boolean) - If true, the connection was the result of a reconnect.</li>
	 *                                  <li>URI (string) - The URI used to connect to the server.</li>
	 *                                  </ol>
	 * @property {boolean} disconnectedPublishing - if set, will enable disconnected publishing in
	 *                                            in the event that the connection to the server is lost.
	 * @property {number} disconnectedBufferSize - Used to set the maximum number of messages that the disconnected
	 *                                             buffer will hold before rejecting new messages. Default size: 5000 messages
	 * @property {function} trace - called whenever trace is called. TODO
	 */
		var Client = function (host, port, path, clientId) {

			var uri;

			if (typeof host !== "string")
				throw new Error(format(ERROR.INVALID_TYPE, [typeof host, "host"]));

			if (arguments.length == 2) {
			// host: must be full ws:// uri
			// port: clientId
				clientId = port;
				uri = host;
				var match = uri.match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/);
				if (match) {
					host = match[4]||match[2];
					port = parseInt(match[7]);
					path = match[8];
				} else {
					throw new Error(format(ERROR.INVALID_ARGUMENT,[host,"host"]));
				}
			} else {
				if (arguments.length == 3) {
					clientId = path;
					path = "/mqtt";
				}
				if (typeof port !== "number" || port < 0)
					throw new Error(format(ERROR.INVALID_TYPE, [typeof port, "port"]));
				if (typeof path !== "string")
					throw new Error(format(ERROR.INVALID_TYPE, [typeof path, "path"]));

				var ipv6AddSBracket = (host.indexOf(":") !== -1 && host.slice(0,1) !== "[" && host.slice(-1) !== "]");
				uri = "ws://"+(ipv6AddSBracket?"["+host+"]":host)+":"+port+path;
			}

			var clientIdLength = 0;
			for (var i = 0; i<clientId.length; i++) {
				var charCode = clientId.charCodeAt(i);
				if (0xD800 <= charCode && charCode <= 0xDBFF)  {
					i++; // Surrogate pair.
				}
				clientIdLength++;
			}
			if (typeof clientId !== "string" || clientIdLength > 65535)
				throw new Error(format(ERROR.INVALID_ARGUMENT, [clientId, "clientId"]));

			var client = new ClientImpl(uri, host, port, path, clientId);

			//Public Properties
			Object.defineProperties(this,{
				"host":{
					get: function() { return host; },
					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
				},
				"port":{
					get: function() { return port; },
					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
				},
				"path":{
					get: function() { return path; },
					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
				},
				"uri":{
					get: function() { return uri; },
					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
				},
				"clientId":{
					get: function() { return client.clientId; },
					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
				},
				"onConnected":{
					get: function() { return client.onConnected; },
					set: function(newOnConnected) {
						if (typeof newOnConnected === "function")
							client.onConnected = newOnConnected;
						else
							throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnConnected, "onConnected"]));
					}
				},
				"disconnectedPublishing":{
					get: function() { return client.disconnectedPublishing; },
					set: function(newDisconnectedPublishing) {
						client.disconnectedPublishing = newDisconnectedPublishing;
					}
				},
				"disconnectedBufferSize":{
					get: function() { return client.disconnectedBufferSize; },
					set: function(newDisconnectedBufferSize) {
						client.disconnectedBufferSize = newDisconnectedBufferSize;
					}
				},
				"onConnectionLost":{
					get: function() { return client.onConnectionLost; },
					set: function(newOnConnectionLost) {
						if (typeof newOnConnectionLost === "function")
							client.onConnectionLost = newOnConnectionLost;
						else
							throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnConnectionLost, "onConnectionLost"]));
					}
				},
				"onMessageDelivered":{
					get: function() { return client.onMessageDelivered; },
					set: function(newOnMessageDelivered) {
						if (typeof newOnMessageDelivered === "function")
							client.onMessageDelivered = newOnMessageDelivered;
						else
							throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageDelivered, "onMessageDelivered"]));
					}
				},
				"onMessageArrived":{
					get: function() { return client.onMessageArrived; },
					set: function(newOnMessageArrived) {
						if (typeof newOnMessageArrived === "function")
							client.onMessageArrived = newOnMessageArrived;
						else
							throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageArrived, "onMessageArrived"]));
					}
				},
				"trace":{
					get: function() { return client.traceFunction; },
					set: function(trace) {
						if(typeof trace === "function"){
							client.traceFunction = trace;
						}else{
							throw new Error(format(ERROR.INVALID_TYPE, [typeof trace, "onTrace"]));
						}
					}
				},
			});

			/**
		 * Connect this Messaging client to its server.
		 *
		 * @name Paho.Client#connect
		 * @function
		 * @param {object} connectOptions - Attributes used with the connection.
		 * @param {number} connectOptions.timeout - If the connect has not succeeded within this
		 *                    number of seconds, it is deemed to have failed.
		 *                    The default is 30 seconds.
		 * @param {string} connectOptions.userName - Authentication username for this connection.
		 * @param {string} connectOptions.password - Authentication password for this connection.
		 * @param {Paho.Message} connectOptions.willMessage - sent by the server when the client
		 *                    disconnects abnormally.
		 * @param {number} connectOptions.keepAliveInterval - the server disconnects this client if
		 *                    there is no activity for this number of seconds.
		 *                    The default value of 60 seconds is assumed if not set.
		 * @param {boolean} connectOptions.cleanSession - if true(default) the client and server
		 *                    persistent state is deleted on successful connect.
		 * @param {boolean} connectOptions.useSSL - if present and true, use an SSL Websocket connection.
		 * @param {object} connectOptions.invocationContext - passed to the onSuccess callback or onFailure callback.
		 * @param {function} connectOptions.onSuccess - called when the connect acknowledgement
		 *                    has been received from the server.
		 * A single response object parameter is passed to the onSuccess callback containing the following fields:
		 * <ol>
		 * <li>invocationContext as passed in to the onSuccess method in the connectOptions.
		 * </ol>
	 * @param {function} connectOptions.onFailure - called when the connect request has failed or timed out.
		 * A single response object parameter is passed to the onFailure callback containing the following fields:
		 * <ol>
		 * <li>invocationContext as passed in to the onFailure method in the connectOptions.
		 * <li>errorCode a number indicating the nature of the error.
		 * <li>errorMessage text describing the error.
		 * </ol>
	 * @param {array} connectOptions.hosts - If present this contains either a set of hostnames or fully qualified
		 * WebSocket URIs (ws://iot.eclipse.org:80/ws), that are tried in order in place
		 * of the host and port paramater on the construtor. The hosts are tried one at at time in order until
		 * one of then succeeds.
	 * @param {array} connectOptions.ports - If present the set of ports matching the hosts. If hosts contains URIs, this property
		 * is not used.
	 * @param {boolean} connectOptions.reconnect - Sets whether the client will automatically attempt to reconnect
	 * to the server if the connection is lost.
	 *<ul>
	 *<li>If set to false, the client will not attempt to automatically reconnect to the server in the event that the
	 * connection is lost.</li>
	 *<li>If set to true, in the event that the connection is lost, the client will attempt to reconnect to the server.
	 * It will initially wait 1 second before it attempts to reconnect, for every failed reconnect attempt, the delay
	 * will double until it is at 2 minutes at which point the delay will stay at 2 minutes.</li>
	 *</ul>
	 * @param {number} connectOptions.mqttVersion - The version of MQTT to use to connect to the MQTT Broker.
	 *<ul>
	 *<li>3 - MQTT V3.1</li>
	 *<li>4 - MQTT V3.1.1</li>
	 *</ul>
	 * @param {boolean} connectOptions.mqttVersionExplicit - If set to true, will force the connection to use the
	 * selected MQTT Version or will fail to connect.
	 * @param {array} connectOptions.uris - If present, should contain a list of fully qualified WebSocket uris
	 * (e.g. ws://iot.eclipse.org:80/ws), that are tried in order in place of the host and port parameter of the construtor.
	 * The uris are tried one at a time in order until one of them succeeds. Do not use this in conjunction with hosts as
	 * the hosts array will be converted to uris and will overwrite this property.
		 * @throws {InvalidState} If the client is not in disconnected state. The client must have received connectionLost
		 * or disconnected before calling connect for a second or subsequent time.
		 */
			this.connect = function (connectOptions) {
				connectOptions = connectOptions || {} ;
				validate(connectOptions,  {timeout:"number",
					userName:"string",
					password:"string",
					willMessage:"object",
					keepAliveInterval:"number",
					cleanSession:"boolean",
					useSSL:"boolean",
					invocationContext:"object",
					onSuccess:"function",
					onFailure:"function",
					hosts:"object",
					ports:"object",
					reconnect:"boolean",
					mqttVersion:"number",
					mqttVersionExplicit:"boolean",
					uris: "object"});

				// If no keep alive interval is set, assume 60 seconds.
				if (connectOptions.keepAliveInterval === undefined)
					connectOptions.keepAliveInterval = 60;

				if (connectOptions.mqttVersion > 4 || connectOptions.mqttVersion < 3) {
					throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.mqttVersion, "connectOptions.mqttVersion"]));
				}

				if (connectOptions.mqttVersion === undefined) {
					connectOptions.mqttVersionExplicit = false;
					connectOptions.mqttVersion = 4;
				} else {
					connectOptions.mqttVersionExplicit = true;
				}

				//Check that if password is set, so is username
				if (connectOptions.password !== undefined && connectOptions.userName === undefined)
					throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.password, "connectOptions.password"]));

				if (connectOptions.willMessage) {
					if (!(connectOptions.willMessage instanceof Message))
						throw new Error(format(ERROR.INVALID_TYPE, [connectOptions.willMessage, "connectOptions.willMessage"]));
					// The will message must have a payload that can be represented as a string.
					// Cause the willMessage to throw an exception if this is not the case.
					connectOptions.willMessage.stringPayload = null;

					if (typeof connectOptions.willMessage.destinationName === "undefined")
						throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.willMessage.destinationName, "connectOptions.willMessage.destinationName"]));
				}
				if (typeof connectOptions.cleanSession === "undefined")
					connectOptions.cleanSession = true;
				if (connectOptions.hosts) {

					if (!(connectOptions.hosts instanceof Array) )
						throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));
					if (connectOptions.hosts.length <1 )
						throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));

					var usingURIs = false;
					for (var i = 0; i<connectOptions.hosts.length; i++) {
						if (typeof connectOptions.hosts[i] !== "string")
							throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
						if (/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(connectOptions.hosts[i])) {
							if (i === 0) {
								usingURIs = true;
							} else if (!usingURIs) {
								throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
							}
						} else if (usingURIs) {
							throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
						}
					}

					if (!usingURIs) {
						if (!connectOptions.ports)
							throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
						if (!(connectOptions.ports instanceof Array) )
							throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
						if (connectOptions.hosts.length !== connectOptions.ports.length)
							throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));

						connectOptions.uris = [];

						for (var i = 0; i<connectOptions.hosts.length; i++) {
							if (typeof connectOptions.ports[i] !== "number" || connectOptions.ports[i] < 0)
								throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.ports[i], "connectOptions.ports["+i+"]"]));
							var host = connectOptions.hosts[i];
							var port = connectOptions.ports[i];

							var ipv6 = (host.indexOf(":") !== -1);
							uri = "ws://"+(ipv6?"["+host+"]":host)+":"+port+path;
							connectOptions.uris.push(uri);
						}
					} else {
						connectOptions.uris = connectOptions.hosts;
					}
				}

				client.connect(connectOptions);
			};

			/**
		 * Subscribe for messages, request receipt of a copy of messages sent to the destinations described by the filter.
		 *
		 * @name Paho.Client#subscribe
		 * @function
		 * @param {string} filter describing the destinations to receive messages from.
		 * <br>
		 * @param {object} subscribeOptions - used to control the subscription
		 *
		 * @param {number} subscribeOptions.qos - the maximum qos of any publications sent
		 *                                  as a result of making this subscription.
		 * @param {object} subscribeOptions.invocationContext - passed to the onSuccess callback
		 *                                  or onFailure callback.
		 * @param {function} subscribeOptions.onSuccess - called when the subscribe acknowledgement
		 *                                  has been received from the server.
		 *                                  A single response object parameter is passed to the onSuccess callback containing the following fields:
		 *                                  <ol>
		 *                                  <li>invocationContext if set in the subscribeOptions.
		 *                                  </ol>
		 * @param {function} subscribeOptions.onFailure - called when the subscribe request has failed or timed out.
		 *                                  A single response object parameter is passed to the onFailure callback containing the following fields:
		 *                                  <ol>
		 *                                  <li>invocationContext - if set in the subscribeOptions.
		 *                                  <li>errorCode - a number indicating the nature of the error.
		 *                                  <li>errorMessage - text describing the error.
		 *                                  </ol>
		 * @param {number} subscribeOptions.timeout - which, if present, determines the number of
		 *                                  seconds after which the onFailure calback is called.
		 *                                  The presence of a timeout does not prevent the onSuccess
		 *                                  callback from being called when the subscribe completes.
		 * @throws {InvalidState} if the client is not in connected state.
		 */
			this.subscribe = function (filter, subscribeOptions) {
				if (typeof filter !== "string" && filter.constructor !== Array)
					throw new Error("Invalid argument:"+filter);
				subscribeOptions = subscribeOptions || {} ;
				validate(subscribeOptions,  {qos:"number",
					invocationContext:"object",
					onSuccess:"function",
					onFailure:"function",
					timeout:"number"
				});
				if (subscribeOptions.timeout && !subscribeOptions.onFailure)
					throw new Error("subscribeOptions.timeout specified with no onFailure callback.");
				if (typeof subscribeOptions.qos !== "undefined" && !(subscribeOptions.qos === 0 || subscribeOptions.qos === 1 || subscribeOptions.qos === 2 ))
					throw new Error(format(ERROR.INVALID_ARGUMENT, [subscribeOptions.qos, "subscribeOptions.qos"]));
				client.subscribe(filter, subscribeOptions);
			};

		/**
		 * Unsubscribe for messages, stop receiving messages sent to destinations described by the filter.
		 *
		 * @name Paho.Client#unsubscribe
		 * @function
		 * @param {string} filter - describing the destinations to receive messages from.
		 * @param {object} unsubscribeOptions - used to control the subscription
		 * @param {object} unsubscribeOptions.invocationContext - passed to the onSuccess callback
											  or onFailure callback.
		 * @param {function} unsubscribeOptions.onSuccess - called when the unsubscribe acknowledgement has been received from the server.
		 *                                    A single response object parameter is passed to the
		 *                                    onSuccess callback containing the following fields:
		 *                                    <ol>
		 *                                    <li>invocationContext - if set in the unsubscribeOptions.
		 *                                    </ol>
		 * @param {function} unsubscribeOptions.onFailure called when the unsubscribe request has failed or timed out.
		 *                                    A single response object parameter is passed to the onFailure callback containing the following fields:
		 *                                    <ol>
		 *                                    <li>invocationContext - if set in the unsubscribeOptions.
		 *                                    <li>errorCode - a number indicating the nature of the error.
		 *                                    <li>errorMessage - text describing the error.
		 *                                    </ol>
		 * @param {number} unsubscribeOptions.timeout - which, if present, determines the number of seconds
		 *                                    after which the onFailure callback is called. The presence of
		 *                                    a timeout does not prevent the onSuccess callback from being
		 *                                    called when the unsubscribe completes
		 * @throws {InvalidState} if the client is not in connected state.
		 */
			this.unsubscribe = function (filter, unsubscribeOptions) {
				if (typeof filter !== "string" && filter.constructor !== Array)
					throw new Error("Invalid argument:"+filter);
				unsubscribeOptions = unsubscribeOptions || {} ;
				validate(unsubscribeOptions,  {invocationContext:"object",
					onSuccess:"function",
					onFailure:"function",
					timeout:"number"
				});
				if (unsubscribeOptions.timeout && !unsubscribeOptions.onFailure)
					throw new Error("unsubscribeOptions.timeout specified with no onFailure callback.");
				client.unsubscribe(filter, unsubscribeOptions);
			};

			/**
		 * Send a message to the consumers of the destination in the Message.
		 *
		 * @name Paho.Client#send
		 * @function
		 * @param {string|Paho.Message} topic - <b>mandatory</b> The name of the destination to which the message is to be sent.
		 * 					   - If it is the only parameter, used as Paho.Message object.
		 * @param {String|ArrayBuffer} payload - The message data to be sent.
		 * @param {number} qos The Quality of Service used to deliver the message.
		 * 		<dl>
		 * 			<dt>0 Best effort (default).
		 *     			<dt>1 At least once.
		 *     			<dt>2 Exactly once.
		 * 		</dl>
		 * @param {Boolean} retained If true, the message is to be retained by the server and delivered
		 *                     to both current and future subscriptions.
		 *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
		 *                     A received message has the retained boolean set to true if the message was published
		 *                     with the retained boolean set to true
		 *                     and the subscrption was made after the message has been published.
		 * @throws {InvalidState} if the client is not connected.
		 */
			this.send = function (topic,payload,qos,retained) {
				var message ;

				if(arguments.length === 0){
					throw new Error("Invalid argument."+"length");

				}else if(arguments.length == 1) {

					if (!(topic instanceof Message) && (typeof topic !== "string"))
						throw new Error("Invalid argument:"+ typeof topic);

					message = topic;
					if (typeof message.destinationName === "undefined")
						throw new Error(format(ERROR.INVALID_ARGUMENT,[message.destinationName,"Message.destinationName"]));
					client.send(message);

				}else {
				//parameter checking in Message object
					message = new Message(payload);
					message.destinationName = topic;
					if(arguments.length >= 3)
						message.qos = qos;
					if(arguments.length >= 4)
						message.retained = retained;
					client.send(message);
				}
			};

			/**
		 * Publish a message to the consumers of the destination in the Message.
		 * Synonym for Paho.Mqtt.Client#send
		 *
		 * @name Paho.Client#publish
		 * @function
		 * @param {string|Paho.Message} topic - <b>mandatory</b> The name of the topic to which the message is to be published.
		 * 					   - If it is the only parameter, used as Paho.Message object.
		 * @param {String|ArrayBuffer} payload - The message data to be published.
		 * @param {number} qos The Quality of Service used to deliver the message.
		 * 		<dl>
		 * 			<dt>0 Best effort (default).
		 *     			<dt>1 At least once.
		 *     			<dt>2 Exactly once.
		 * 		</dl>
		 * @param {Boolean} retained If true, the message is to be retained by the server and delivered
		 *                     to both current and future subscriptions.
		 *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
		 *                     A received message has the retained boolean set to true if the message was published
		 *                     with the retained boolean set to true
		 *                     and the subscrption was made after the message has been published.
		 * @throws {InvalidState} if the client is not connected.
		 */
			this.publish = function(topic,payload,qos,retained) {
				var message ;

				if(arguments.length === 0){
					throw new Error("Invalid argument."+"length");

				}else if(arguments.length == 1) {

					if (!(topic instanceof Message) && (typeof topic !== "string"))
						throw new Error("Invalid argument:"+ typeof topic);

					message = topic;
					if (typeof message.destinationName === "undefined")
						throw new Error(format(ERROR.INVALID_ARGUMENT,[message.destinationName,"Message.destinationName"]));
					client.send(message);

				}else {
					//parameter checking in Message object
					message = new Message(payload);
					message.destinationName = topic;
					if(arguments.length >= 3)
						message.qos = qos;
					if(arguments.length >= 4)
						message.retained = retained;
					client.send(message);
				}
			};

			/**
		 * Normal disconnect of this Messaging client from its server.
		 *
		 * @name Paho.Client#disconnect
		 * @function
		 * @throws {InvalidState} if the client is already disconnected.
		 */
			this.disconnect = function () {
				client.disconnect();
			};

			/**
		 * Get the contents of the trace log.
		 *
		 * @name Paho.Client#getTraceLog
		 * @function
		 * @return {Object[]} tracebuffer containing the time ordered trace records.
		 */
			this.getTraceLog = function () {
				return client.getTraceLog();
			};

			/**
		 * Start tracing.
		 *
		 * @name Paho.Client#startTrace
		 * @function
		 */
			this.startTrace = function () {
				client.startTrace();
			};

			/**
		 * Stop tracing.
		 *
		 * @name Paho.Client#stopTrace
		 * @function
		 */
			this.stopTrace = function () {
				client.stopTrace();
			};

			this.isConnected = function() {
				return client.connected;
			};
		};

		/**
	 * An application message, sent or received.
	 * <p>
	 * All attributes may be null, which implies the default values.
	 *
	 * @name Paho.Message
	 * @constructor
	 * @param {String|ArrayBuffer} payload The message data to be sent.
	 * <p>
	 * @property {string} payloadString <i>read only</i> The payload as a string if the payload consists of valid UTF-8 characters.
	 * @property {ArrayBuffer} payloadBytes <i>read only</i> The payload as an ArrayBuffer.
	 * <p>
	 * @property {string} destinationName <b>mandatory</b> The name of the destination to which the message is to be sent
	 *                    (for messages about to be sent) or the name of the destination from which the message has been received.
	 *                    (for messages received by the onMessage function).
	 * <p>
	 * @property {number} qos The Quality of Service used to deliver the message.
	 * <dl>
	 *     <dt>0 Best effort (default).
	 *     <dt>1 At least once.
	 *     <dt>2 Exactly once.
	 * </dl>
	 * <p>
	 * @property {Boolean} retained If true, the message is to be retained by the server and delivered
	 *                     to both current and future subscriptions.
	 *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
	 *                     A received message has the retained boolean set to true if the message was published
	 *                     with the retained boolean set to true
	 *                     and the subscrption was made after the message has been published.
	 * <p>
	 * @property {Boolean} duplicate <i>read only</i> If true, this message might be a duplicate of one which has already been received.
	 *                     This is only set on messages received from the server.
	 *
	 */
		var Message = function (newPayload) {
			var payload;
			if (   typeof newPayload === "string" ||
		newPayload instanceof ArrayBuffer ||
		(ArrayBuffer.isView(newPayload) && !(newPayload instanceof DataView))
			) {
				payload = newPayload;
			} else {
				throw (format(ERROR.INVALID_ARGUMENT, [newPayload, "newPayload"]));
			}

			var destinationName;
			var qos = 0;
			var retained = false;
			var duplicate = false;

			Object.defineProperties(this,{
				"payloadString":{
					enumerable : true,
					get : function () {
						if (typeof payload === "string")
							return payload;
						else
							return parseUTF8(payload, 0, payload.length);
					}
				},
				"payloadBytes":{
					enumerable: true,
					get: function() {
						if (typeof payload === "string") {
							var buffer = new ArrayBuffer(UTF8Length(payload));
							var byteStream = new Uint8Array(buffer);
							stringToUTF8(payload, byteStream, 0);

							return byteStream;
						} else {
							return payload;
						}
					}
				},
				"destinationName":{
					enumerable: true,
					get: function() { return destinationName; },
					set: function(newDestinationName) {
						if (typeof newDestinationName === "string")
							destinationName = newDestinationName;
						else
							throw new Error(format(ERROR.INVALID_ARGUMENT, [newDestinationName, "newDestinationName"]));
					}
				},
				"qos":{
					enumerable: true,
					get: function() { return qos; },
					set: function(newQos) {
						if (newQos === 0 || newQos === 1 || newQos === 2 )
							qos = newQos;
						else
							throw new Error("Invalid argument:"+newQos);
					}
				},
				"retained":{
					enumerable: true,
					get: function() { return retained; },
					set: function(newRetained) {
						if (typeof newRetained === "boolean")
							retained = newRetained;
						else
							throw new Error(format(ERROR.INVALID_ARGUMENT, [newRetained, "newRetained"]));
					}
				},
				"topic":{
					enumerable: true,
					get: function() { return destinationName; },
					set: function(newTopic) {destinationName=newTopic;}
				},
				"duplicate":{
					enumerable: true,
					get: function() { return duplicate; },
					set: function(newDuplicate) {duplicate=newDuplicate;}
				}
			});
		};

		// Module contents.
		return {
			Client: Client,
			Message: Message
		};
	// eslint-disable-next-line no-nested-ternary
	})(typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	return PahoMQTT;
});


/***/ }),

/***/ 2592:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


const canPromise = __webpack_require__(7138)

const QRCode = __webpack_require__(5115)
const CanvasRenderer = __webpack_require__(6907)
const SvgRenderer = __webpack_require__(3776)

function renderCanvas (renderFunc, canvas, text, opts, cb) {
  const args = [].slice.call(arguments, 1)
  const argsNum = args.length
  const isLastArgCb = typeof args[argsNum - 1] === 'function'

  if (!isLastArgCb && !canPromise()) {
    throw new Error('Callback required as last argument')
  }

  if (isLastArgCb) {
    if (argsNum < 2) {
      throw new Error('Too few arguments provided')
    }

    if (argsNum === 2) {
      cb = text
      text = canvas
      canvas = opts = undefined
    } else if (argsNum === 3) {
      if (canvas.getContext && typeof cb === 'undefined') {
        cb = opts
        opts = undefined
      } else {
        cb = opts
        opts = text
        text = canvas
        canvas = undefined
      }
    }
  } else {
    if (argsNum < 1) {
      throw new Error('Too few arguments provided')
    }

    if (argsNum === 1) {
      text = canvas
      canvas = opts = undefined
    } else if (argsNum === 2 && !canvas.getContext) {
      opts = text
      text = canvas
      canvas = undefined
    }

    return new Promise(function (resolve, reject) {
      try {
        const data = QRCode.create(text, opts)
        resolve(renderFunc(data, canvas, opts))
      } catch (e) {
        reject(e)
      }
    })
  }

  try {
    const data = QRCode.create(text, opts)
    cb(null, renderFunc(data, canvas, opts))
  } catch (e) {
    cb(e)
  }
}

exports.create = QRCode.create
exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render)
exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL)

// only svg for now.
exports.toString = renderCanvas.bind(null, function (data, _, opts) {
  return SvgRenderer.render(data, opts)
})


/***/ }),

/***/ 7138:
/***/ ((module) => {

// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157

module.exports = function () {
  return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then
}


/***/ }),

/***/ 1845:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */

const getSymbolSize = (__webpack_require__(242).getSymbolSize)

/**
 * Calculate the row/column coordinates of the center module of each alignment pattern
 * for the specified QR Code version.
 *
 * The alignment patterns are positioned symmetrically on either side of the diagonal
 * running from the top left corner of the symbol to the bottom right corner.
 *
 * Since positions are simmetrical only half of the coordinates are returned.
 * Each item of the array will represent in turn the x and y coordinate.
 * @see {@link getPositions}
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinate
 */
exports.getRowColCoords = function getRowColCoords (version) {
  if (version === 1) return []

  const posCount = Math.floor(version / 7) + 2
  const size = getSymbolSize(version)
  const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2
  const positions = [size - 7] // Last coord is always (size - 7)

  for (let i = 1; i < posCount - 1; i++) {
    positions[i] = positions[i - 1] - intervals
  }

  positions.push(6) // First coord is always 6

  return positions.reverse()
}

/**
 * Returns an array containing the positions of each alignment pattern.
 * Each array's element represent the center point of the pattern as (x, y) coordinates
 *
 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
 * and filtering out the items that overlaps with finder pattern
 *
 * @example
 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
 * The alignment patterns, therefore, are to be centered on (row, column)
 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
 * and are not therefore used for alignment patterns.
 *
 * let pos = getPositions(7)
 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */
exports.getPositions = function getPositions (version) {
  const coords = []
  const pos = exports.getRowColCoords(version)
  const posLength = pos.length

  for (let i = 0; i < posLength; i++) {
    for (let j = 0; j < posLength; j++) {
      // Skip if position is occupied by finder patterns
      if ((i === 0 && j === 0) || // top-left
          (i === 0 && j === posLength - 1) || // bottom-left
          (i === posLength - 1 && j === 0)) { // top-right
        continue
      }

      coords.push([pos[i], pos[j]])
    }
  }

  return coords
}


/***/ }),

/***/ 8260:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Mode = __webpack_require__(6910)

/**
 * Array of characters available in alphanumeric mode
 *
 * As per QR Code specification, to each character
 * is assigned a value from 0 to 44 which in this case coincides
 * with the array index
 *
 * @type {Array}
 */
const ALPHA_NUM_CHARS = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ' ', '$', '%', '*', '+', '-', '.', '/', ':'
]

function AlphanumericData (data) {
  this.mode = Mode.ALPHANUMERIC
  this.data = data
}

AlphanumericData.getBitsLength = function getBitsLength (length) {
  return 11 * Math.floor(length / 2) + 6 * (length % 2)
}

AlphanumericData.prototype.getLength = function getLength () {
  return this.data.length
}

AlphanumericData.prototype.getBitsLength = function getBitsLength () {
  return AlphanumericData.getBitsLength(this.data.length)
}

AlphanumericData.prototype.write = function write (bitBuffer) {
  let i

  // Input data characters are divided into groups of two characters
  // and encoded as 11-bit binary codes.
  for (i = 0; i + 2 <= this.data.length; i += 2) {
    // The character value of the first character is multiplied by 45
    let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45

    // The character value of the second digit is added to the product
    value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1])

    // The sum is then stored as 11-bit binary number
    bitBuffer.put(value, 11)
  }

  // If the number of input data characters is not a multiple of two,
  // the character value of the final character is encoded as a 6-bit binary number.
  if (this.data.length % 2) {
    bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6)
  }
}

module.exports = AlphanumericData


/***/ }),

/***/ 7245:
/***/ ((module) => {

function BitBuffer () {
  this.buffer = []
  this.length = 0
}

BitBuffer.prototype = {

  get: function (index) {
    const bufIndex = Math.floor(index / 8)
    return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) === 1
  },

  put: function (num, length) {
    for (let i = 0; i < length; i++) {
      this.putBit(((num >>> (length - i - 1)) & 1) === 1)
    }
  },

  getLengthInBits: function () {
    return this.length
  },

  putBit: function (bit) {
    const bufIndex = Math.floor(this.length / 8)
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0)
    }

    if (bit) {
      this.buffer[bufIndex] |= (0x80 >>> (this.length % 8))
    }

    this.length++
  }
}

module.exports = BitBuffer


/***/ }),

/***/ 3280:
/***/ ((module) => {

/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */
function BitMatrix (size) {
  if (!size || size < 1) {
    throw new Error('BitMatrix size must be defined and greater than 0')
  }

  this.size = size
  this.data = new Uint8Array(size * size)
  this.reservedBit = new Uint8Array(size * size)
}

/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */
BitMatrix.prototype.set = function (row, col, value, reserved) {
  const index = row * this.size + col
  this.data[index] = value
  if (reserved) this.reservedBit[index] = true
}

/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */
BitMatrix.prototype.get = function (row, col) {
  return this.data[row * this.size + col]
}

/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */
BitMatrix.prototype.xor = function (row, col, value) {
  this.data[row * this.size + col] ^= value
}

/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */
BitMatrix.prototype.isReserved = function (row, col) {
  return this.reservedBit[row * this.size + col]
}

module.exports = BitMatrix


/***/ }),

/***/ 3424:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const encodeUtf8 = __webpack_require__(2378)
const Mode = __webpack_require__(6910)

function ByteData (data) {
  this.mode = Mode.BYTE
  this.data = new Uint8Array(encodeUtf8(data))
}

ByteData.getBitsLength = function getBitsLength (length) {
  return length * 8
}

ByteData.prototype.getLength = function getLength () {
  return this.data.length
}

ByteData.prototype.getBitsLength = function getBitsLength () {
  return ByteData.getBitsLength(this.data.length)
}

ByteData.prototype.write = function (bitBuffer) {
  for (let i = 0, l = this.data.length; i < l; i++) {
    bitBuffer.put(this.data[i], 8)
  }
}

module.exports = ByteData


/***/ }),

/***/ 5393:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const ECLevel = __webpack_require__(4908)

const EC_BLOCKS_TABLE = [
// L  M  Q  H
  1, 1, 1, 1,
  1, 1, 1, 1,
  1, 1, 2, 2,
  1, 2, 2, 4,
  1, 2, 4, 4,
  2, 4, 4, 4,
  2, 4, 6, 5,
  2, 4, 6, 6,
  2, 5, 8, 8,
  4, 5, 8, 8,
  4, 5, 8, 11,
  4, 8, 10, 11,
  4, 9, 12, 16,
  4, 9, 16, 16,
  6, 10, 12, 18,
  6, 10, 17, 16,
  6, 11, 16, 19,
  6, 13, 18, 21,
  7, 14, 21, 25,
  8, 16, 20, 25,
  8, 17, 23, 25,
  9, 17, 23, 34,
  9, 18, 25, 30,
  10, 20, 27, 32,
  12, 21, 29, 35,
  12, 23, 34, 37,
  12, 25, 34, 40,
  13, 26, 35, 42,
  14, 28, 38, 45,
  15, 29, 40, 48,
  16, 31, 43, 51,
  17, 33, 45, 54,
  18, 35, 48, 57,
  19, 37, 51, 60,
  19, 38, 53, 63,
  20, 40, 56, 66,
  21, 43, 59, 70,
  22, 45, 62, 74,
  24, 47, 65, 77,
  25, 49, 68, 81
]

const EC_CODEWORDS_TABLE = [
// L  M  Q  H
  7, 10, 13, 17,
  10, 16, 22, 28,
  15, 26, 36, 44,
  20, 36, 52, 64,
  26, 48, 72, 88,
  36, 64, 96, 112,
  40, 72, 108, 130,
  48, 88, 132, 156,
  60, 110, 160, 192,
  72, 130, 192, 224,
  80, 150, 224, 264,
  96, 176, 260, 308,
  104, 198, 288, 352,
  120, 216, 320, 384,
  132, 240, 360, 432,
  144, 280, 408, 480,
  168, 308, 448, 532,
  180, 338, 504, 588,
  196, 364, 546, 650,
  224, 416, 600, 700,
  224, 442, 644, 750,
  252, 476, 690, 816,
  270, 504, 750, 900,
  300, 560, 810, 960,
  312, 588, 870, 1050,
  336, 644, 952, 1110,
  360, 700, 1020, 1200,
  390, 728, 1050, 1260,
  420, 784, 1140, 1350,
  450, 812, 1200, 1440,
  480, 868, 1290, 1530,
  510, 924, 1350, 1620,
  540, 980, 1440, 1710,
  570, 1036, 1530, 1800,
  570, 1064, 1590, 1890,
  600, 1120, 1680, 1980,
  630, 1204, 1770, 2100,
  660, 1260, 1860, 2220,
  720, 1316, 1950, 2310,
  750, 1372, 2040, 2430
]

/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */
exports.getBlocksCount = function getBlocksCount (version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 0]
    case ECLevel.M:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 1]
    case ECLevel.Q:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 2]
    case ECLevel.H:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 3]
    default:
      return undefined
  }
}

/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */
exports.getTotalCodewordsCount = function getTotalCodewordsCount (version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0]
    case ECLevel.M:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1]
    case ECLevel.Q:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2]
    case ECLevel.H:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3]
    default:
      return undefined
  }
}


/***/ }),

/***/ 4908:
/***/ ((__unused_webpack_module, exports) => {

exports.L = { bit: 1 }
exports.M = { bit: 0 }
exports.Q = { bit: 3 }
exports.H = { bit: 2 }

function fromString (string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string')
  }

  const lcStr = string.toLowerCase()

  switch (lcStr) {
    case 'l':
    case 'low':
      return exports.L

    case 'm':
    case 'medium':
      return exports.M

    case 'q':
    case 'quartile':
      return exports.Q

    case 'h':
    case 'high':
      return exports.H

    default:
      throw new Error('Unknown EC Level: ' + string)
  }
}

exports.isValid = function isValid (level) {
  return level && typeof level.bit !== 'undefined' &&
    level.bit >= 0 && level.bit < 4
}

exports.from = function from (value, defaultValue) {
  if (exports.isValid(value)) {
    return value
  }

  try {
    return fromString(value)
  } catch (e) {
    return defaultValue
  }
}


/***/ }),

/***/ 6526:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const getSymbolSize = (__webpack_require__(242).getSymbolSize)
const FINDER_PATTERN_SIZE = 7

/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */
exports.getPositions = function getPositions (version) {
  const size = getSymbolSize(version)

  return [
    // top-left
    [0, 0],
    // top-right
    [size - FINDER_PATTERN_SIZE, 0],
    // bottom-left
    [0, size - FINDER_PATTERN_SIZE]
  ]
}


/***/ }),

/***/ 1642:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Utils = __webpack_require__(242)

const G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0)
const G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1)
const G15_BCH = Utils.getBCHDigit(G15)

/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */
exports.getEncodedBits = function getEncodedBits (errorCorrectionLevel, mask) {
  const data = ((errorCorrectionLevel.bit << 3) | mask)
  let d = data << 10

  while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
    d ^= (G15 << (Utils.getBCHDigit(d) - G15_BCH))
  }

  // xor final data with mask pattern in order to ensure that
  // no combination of Error Correction Level and data mask pattern
  // will result in an all-zero data string
  return ((data << 10) | d) ^ G15_MASK
}


/***/ }),

/***/ 9729:
/***/ ((__unused_webpack_module, exports) => {

const EXP_TABLE = new Uint8Array(512)
const LOG_TABLE = new Uint8Array(256)
/**
 * Precompute the log and anti-log tables for faster computation later
 *
 * For each possible value in the galois field 2^8, we will pre-compute
 * the logarithm and anti-logarithm (exponential) of this value
 *
 * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
 */
;(function initTables () {
  let x = 1
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x
    LOG_TABLE[x] = i

    x <<= 1 // multiply by 2

    // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
    // This means that when a number is 256 or larger, it should be XORed with 0x11D.
    if (x & 0x100) { // similar to x >= 256, but a lot faster (because 0x100 == 256)
      x ^= 0x11D
    }
  }

  // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
  // stay inside the bounds (because we will mainly use this table for the multiplication of
  // two GF numbers, no more).
  // @see {@link mul}
  for (let i = 255; i < 512; i++) {
    EXP_TABLE[i] = EXP_TABLE[i - 255]
  }
}())

/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
exports.log = function log (n) {
  if (n < 1) throw new Error('log(' + n + ')')
  return LOG_TABLE[n]
}

/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
exports.exp = function exp (n) {
  return EXP_TABLE[n]
}

/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */
exports.mul = function mul (x, y) {
  if (x === 0 || y === 0) return 0

  // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
  // @see {@link initTables}
  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]]
}


/***/ }),

/***/ 5442:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Mode = __webpack_require__(6910)
const Utils = __webpack_require__(242)

function KanjiData (data) {
  this.mode = Mode.KANJI
  this.data = data
}

KanjiData.getBitsLength = function getBitsLength (length) {
  return length * 13
}

KanjiData.prototype.getLength = function getLength () {
  return this.data.length
}

KanjiData.prototype.getBitsLength = function getBitsLength () {
  return KanjiData.getBitsLength(this.data.length)
}

KanjiData.prototype.write = function (bitBuffer) {
  let i

  // In the Shift JIS system, Kanji characters are represented by a two byte combination.
  // These byte values are shifted from the JIS X 0208 values.
  // JIS X 0208 gives details of the shift coded representation.
  for (i = 0; i < this.data.length; i++) {
    let value = Utils.toSJIS(this.data[i])

    // For characters with Shift JIS values from 0x8140 to 0x9FFC:
    if (value >= 0x8140 && value <= 0x9FFC) {
      // Subtract 0x8140 from Shift JIS value
      value -= 0x8140

    // For characters with Shift JIS values from 0xE040 to 0xEBBF
    } else if (value >= 0xE040 && value <= 0xEBBF) {
      // Subtract 0xC140 from Shift JIS value
      value -= 0xC140
    } else {
      throw new Error(
        'Invalid SJIS character: ' + this.data[i] + '\n' +
        'Make sure your charset is UTF-8')
    }

    // Multiply most significant byte of result by 0xC0
    // and add least significant byte to product
    value = (((value >>> 8) & 0xff) * 0xC0) + (value & 0xff)

    // Convert result to a 13-bit binary string
    bitBuffer.put(value, 13)
  }
}

module.exports = KanjiData


/***/ }),

/***/ 7126:
/***/ ((__unused_webpack_module, exports) => {

/**
 * Data mask pattern reference
 * @type {Object}
 */
exports.Patterns = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
}

/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */
const PenaltyScores = {
  N1: 3,
  N2: 3,
  N3: 40,
  N4: 10
}

/**
 * Check if mask pattern value is valid
 *
 * @param  {Number}  mask    Mask pattern
 * @return {Boolean}         true if valid, false otherwise
 */
exports.isValid = function isValid (mask) {
  return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7
}

/**
 * Returns mask pattern from a value.
 * If value is not valid, returns undefined
 *
 * @param  {Number|String} value        Mask pattern value
 * @return {Number}                     Valid mask pattern or undefined
 */
exports.from = function from (value) {
  return exports.isValid(value) ? parseInt(value, 10) : undefined
}

/**
* Find adjacent modules in row/column with the same color
* and assign a penalty value.
*
* Points: N1 + i
* i is the amount by which the number of adjacent modules of the same color exceeds 5
*/
exports.getPenaltyN1 = function getPenaltyN1 (data) {
  const size = data.size
  let points = 0
  let sameCountCol = 0
  let sameCountRow = 0
  let lastCol = null
  let lastRow = null

  for (let row = 0; row < size; row++) {
    sameCountCol = sameCountRow = 0
    lastCol = lastRow = null

    for (let col = 0; col < size; col++) {
      let module = data.get(row, col)
      if (module === lastCol) {
        sameCountCol++
      } else {
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5)
        lastCol = module
        sameCountCol = 1
      }

      module = data.get(col, row)
      if (module === lastRow) {
        sameCountRow++
      } else {
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5)
        lastRow = module
        sameCountRow = 1
      }
    }

    if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5)
    if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5)
  }

  return points
}

/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */
exports.getPenaltyN2 = function getPenaltyN2 (data) {
  const size = data.size
  let points = 0

  for (let row = 0; row < size - 1; row++) {
    for (let col = 0; col < size - 1; col++) {
      const last = data.get(row, col) +
        data.get(row, col + 1) +
        data.get(row + 1, col) +
        data.get(row + 1, col + 1)

      if (last === 4 || last === 0) points++
    }
  }

  return points * PenaltyScores.N2
}

/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */
exports.getPenaltyN3 = function getPenaltyN3 (data) {
  const size = data.size
  let points = 0
  let bitsCol = 0
  let bitsRow = 0

  for (let row = 0; row < size; row++) {
    bitsCol = bitsRow = 0
    for (let col = 0; col < size; col++) {
      bitsCol = ((bitsCol << 1) & 0x7FF) | data.get(row, col)
      if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++

      bitsRow = ((bitsRow << 1) & 0x7FF) | data.get(col, row)
      if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++
    }
  }

  return points * PenaltyScores.N3
}

/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */
exports.getPenaltyN4 = function getPenaltyN4 (data) {
  let darkCount = 0
  const modulesCount = data.data.length

  for (let i = 0; i < modulesCount; i++) darkCount += data.data[i]

  const k = Math.abs(Math.ceil((darkCount * 100 / modulesCount) / 5) - 10)

  return k * PenaltyScores.N4
}

/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */
function getMaskAt (maskPattern, i, j) {
  switch (maskPattern) {
    case exports.Patterns.PATTERN000: return (i + j) % 2 === 0
    case exports.Patterns.PATTERN001: return i % 2 === 0
    case exports.Patterns.PATTERN010: return j % 3 === 0
    case exports.Patterns.PATTERN011: return (i + j) % 3 === 0
    case exports.Patterns.PATTERN100: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0
    case exports.Patterns.PATTERN101: return (i * j) % 2 + (i * j) % 3 === 0
    case exports.Patterns.PATTERN110: return ((i * j) % 2 + (i * j) % 3) % 2 === 0
    case exports.Patterns.PATTERN111: return ((i * j) % 3 + (i + j) % 2) % 2 === 0

    default: throw new Error('bad maskPattern:' + maskPattern)
  }
}

/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */
exports.applyMask = function applyMask (pattern, data) {
  const size = data.size

  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      if (data.isReserved(row, col)) continue
      data.xor(row, col, getMaskAt(pattern, row, col))
    }
  }
}

/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */
exports.getBestMask = function getBestMask (data, setupFormatFunc) {
  const numPatterns = Object.keys(exports.Patterns).length
  let bestPattern = 0
  let lowerPenalty = Infinity

  for (let p = 0; p < numPatterns; p++) {
    setupFormatFunc(p)
    exports.applyMask(p, data)

    // Calculate penalty
    const penalty =
      exports.getPenaltyN1(data) +
      exports.getPenaltyN2(data) +
      exports.getPenaltyN3(data) +
      exports.getPenaltyN4(data)

    // Undo previously applied mask
    exports.applyMask(p, data)

    if (penalty < lowerPenalty) {
      lowerPenalty = penalty
      bestPattern = p
    }
  }

  return bestPattern
}


/***/ }),

/***/ 6910:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const VersionCheck = __webpack_require__(3114)
const Regex = __webpack_require__(7007)

/**
 * Numeric mode encodes data from the decimal digit set (0 - 9)
 * (byte values 30HEX to 39HEX).
 * Normally, 3 data characters are represented by 10 bits.
 *
 * @type {Object}
 */
exports.NUMERIC = {
  id: 'Numeric',
  bit: 1 << 0,
  ccBits: [10, 12, 14]
}

/**
 * Alphanumeric mode encodes data from a set of 45 characters,
 * i.e. 10 numeric digits (0 - 9),
 *      26 alphabetic characters (A - Z),
 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
 * Normally, two input characters are represented by 11 bits.
 *
 * @type {Object}
 */
exports.ALPHANUMERIC = {
  id: 'Alphanumeric',
  bit: 1 << 1,
  ccBits: [9, 11, 13]
}

/**
 * In byte mode, data is encoded at 8 bits per character.
 *
 * @type {Object}
 */
exports.BYTE = {
  id: 'Byte',
  bit: 1 << 2,
  ccBits: [8, 16, 16]
}

/**
 * The Kanji mode efficiently encodes Kanji characters in accordance with
 * the Shift JIS system based on JIS X 0208.
 * The Shift JIS values are shifted from the JIS X 0208 values.
 * JIS X 0208 gives details of the shift coded representation.
 * Each two-byte character value is compacted to a 13-bit binary codeword.
 *
 * @type {Object}
 */
exports.KANJI = {
  id: 'Kanji',
  bit: 1 << 3,
  ccBits: [8, 10, 12]
}

/**
 * Mixed mode will contain a sequences of data in a combination of any of
 * the modes described above
 *
 * @type {Object}
 */
exports.MIXED = {
  bit: -1
}

/**
 * Returns the number of bits needed to store the data length
 * according to QR Code specifications.
 *
 * @param  {Mode}   mode    Data mode
 * @param  {Number} version QR Code version
 * @return {Number}         Number of bits
 */
exports.getCharCountIndicator = function getCharCountIndicator (mode, version) {
  if (!mode.ccBits) throw new Error('Invalid mode: ' + mode)

  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid version: ' + version)
  }

  if (version >= 1 && version < 10) return mode.ccBits[0]
  else if (version < 27) return mode.ccBits[1]
  return mode.ccBits[2]
}

/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */
exports.getBestModeForData = function getBestModeForData (dataStr) {
  if (Regex.testNumeric(dataStr)) return exports.NUMERIC
  else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC
  else if (Regex.testKanji(dataStr)) return exports.KANJI
  else return exports.BYTE
}

/**
 * Return mode name as string
 *
 * @param {Mode} mode Mode object
 * @returns {String}  Mode name
 */
exports.toString = function toString (mode) {
  if (mode && mode.id) return mode.id
  throw new Error('Invalid mode')
}

/**
 * Check if input param is a valid mode object
 *
 * @param   {Mode}    mode Mode object
 * @returns {Boolean} True if valid mode, false otherwise
 */
exports.isValid = function isValid (mode) {
  return mode && mode.bit && mode.ccBits
}

/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */
function fromString (string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string')
  }

  const lcStr = string.toLowerCase()

  switch (lcStr) {
    case 'numeric':
      return exports.NUMERIC
    case 'alphanumeric':
      return exports.ALPHANUMERIC
    case 'kanji':
      return exports.KANJI
    case 'byte':
      return exports.BYTE
    default:
      throw new Error('Unknown mode: ' + string)
  }
}

/**
 * Returns mode from a value.
 * If value is not a valid mode, returns defaultValue
 *
 * @param  {Mode|String} value        Encoding mode
 * @param  {Mode}        defaultValue Fallback value
 * @return {Mode}                     Encoding mode
 */
exports.from = function from (value, defaultValue) {
  if (exports.isValid(value)) {
    return value
  }

  try {
    return fromString(value)
  } catch (e) {
    return defaultValue
  }
}


/***/ }),

/***/ 1085:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Mode = __webpack_require__(6910)

function NumericData (data) {
  this.mode = Mode.NUMERIC
  this.data = data.toString()
}

NumericData.getBitsLength = function getBitsLength (length) {
  return 10 * Math.floor(length / 3) + ((length % 3) ? ((length % 3) * 3 + 1) : 0)
}

NumericData.prototype.getLength = function getLength () {
  return this.data.length
}

NumericData.prototype.getBitsLength = function getBitsLength () {
  return NumericData.getBitsLength(this.data.length)
}

NumericData.prototype.write = function write (bitBuffer) {
  let i, group, value

  // The input data string is divided into groups of three digits,
  // and each group is converted to its 10-bit binary equivalent.
  for (i = 0; i + 3 <= this.data.length; i += 3) {
    group = this.data.substr(i, 3)
    value = parseInt(group, 10)

    bitBuffer.put(value, 10)
  }

  // If the number of input digits is not an exact multiple of three,
  // the final one or two digits are converted to 4 or 7 bits respectively.
  const remainingNum = this.data.length - i
  if (remainingNum > 0) {
    group = this.data.substr(i)
    value = parseInt(group, 10)

    bitBuffer.put(value, remainingNum * 3 + 1)
  }
}

module.exports = NumericData


/***/ }),

/***/ 6143:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const GF = __webpack_require__(9729)

/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Uint8Array} p1 Polynomial
 * @param  {Uint8Array} p2 Polynomial
 * @return {Uint8Array}    Product of p1 and p2
 */
exports.mul = function mul (p1, p2) {
  const coeff = new Uint8Array(p1.length + p2.length - 1)

  for (let i = 0; i < p1.length; i++) {
    for (let j = 0; j < p2.length; j++) {
      coeff[i + j] ^= GF.mul(p1[i], p2[j])
    }
  }

  return coeff
}

/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Uint8Array} divident Polynomial
 * @param  {Uint8Array} divisor  Polynomial
 * @return {Uint8Array}          Remainder
 */
exports.mod = function mod (divident, divisor) {
  let result = new Uint8Array(divident)

  while ((result.length - divisor.length) >= 0) {
    const coeff = result[0]

    for (let i = 0; i < divisor.length; i++) {
      result[i] ^= GF.mul(divisor[i], coeff)
    }

    // remove all zeros from buffer head
    let offset = 0
    while (offset < result.length && result[offset] === 0) offset++
    result = result.slice(offset)
  }

  return result
}

/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Uint8Array}    Buffer containing polynomial coefficients
 */
exports.generateECPolynomial = function generateECPolynomial (degree) {
  let poly = new Uint8Array([1])
  for (let i = 0; i < degree; i++) {
    poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]))
  }

  return poly
}


/***/ }),

/***/ 5115:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Utils = __webpack_require__(242)
const ECLevel = __webpack_require__(4908)
const BitBuffer = __webpack_require__(7245)
const BitMatrix = __webpack_require__(3280)
const AlignmentPattern = __webpack_require__(1845)
const FinderPattern = __webpack_require__(6526)
const MaskPattern = __webpack_require__(7126)
const ECCode = __webpack_require__(5393)
const ReedSolomonEncoder = __webpack_require__(2882)
const Version = __webpack_require__(3103)
const FormatInfo = __webpack_require__(1642)
const Mode = __webpack_require__(6910)
const Segments = __webpack_require__(6130)

/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*/

/**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupFinderPattern (matrix, version) {
  const size = matrix.size
  const pos = FinderPattern.getPositions(version)

  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0]
    const col = pos[i][1]

    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || size <= row + r) continue

      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || size <= col + c) continue

        if ((r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
          (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          matrix.set(row + r, col + c, true, true)
        } else {
          matrix.set(row + r, col + c, false, true)
        }
      }
    }
  }
}

/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */
function setupTimingPattern (matrix) {
  const size = matrix.size

  for (let r = 8; r < size - 8; r++) {
    const value = r % 2 === 0
    matrix.set(r, 6, value, true)
    matrix.set(6, r, value, true)
  }
}

/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupAlignmentPattern (matrix, version) {
  const pos = AlignmentPattern.getPositions(version)

  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0]
    const col = pos[i][1]

    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        if (r === -2 || r === 2 || c === -2 || c === 2 ||
          (r === 0 && c === 0)) {
          matrix.set(row + r, col + c, true, true)
        } else {
          matrix.set(row + r, col + c, false, true)
        }
      }
    }
  }
}

/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupVersionInfo (matrix, version) {
  const size = matrix.size
  const bits = Version.getEncodedBits(version)
  let row, col, mod

  for (let i = 0; i < 18; i++) {
    row = Math.floor(i / 3)
    col = i % 3 + size - 8 - 3
    mod = ((bits >> i) & 1) === 1

    matrix.set(row, col, mod, true)
    matrix.set(col, row, mod, true)
  }
}

/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */
function setupFormatInfo (matrix, errorCorrectionLevel, maskPattern) {
  const size = matrix.size
  const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern)
  let i, mod

  for (i = 0; i < 15; i++) {
    mod = ((bits >> i) & 1) === 1

    // vertical
    if (i < 6) {
      matrix.set(i, 8, mod, true)
    } else if (i < 8) {
      matrix.set(i + 1, 8, mod, true)
    } else {
      matrix.set(size - 15 + i, 8, mod, true)
    }

    // horizontal
    if (i < 8) {
      matrix.set(8, size - i - 1, mod, true)
    } else if (i < 9) {
      matrix.set(8, 15 - i - 1 + 1, mod, true)
    } else {
      matrix.set(8, 15 - i - 1, mod, true)
    }
  }

  // fixed module
  matrix.set(size - 8, 8, 1, true)
}

/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */
function setupData (matrix, data) {
  const size = matrix.size
  let inc = -1
  let row = size - 1
  let bitIndex = 7
  let byteIndex = 0

  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--

    while (true) {
      for (let c = 0; c < 2; c++) {
        if (!matrix.isReserved(row, col - c)) {
          let dark = false

          if (byteIndex < data.length) {
            dark = (((data[byteIndex] >>> bitIndex) & 1) === 1)
          }

          matrix.set(row, col - c, dark)
          bitIndex--

          if (bitIndex === -1) {
            byteIndex++
            bitIndex = 7
          }
        }
      }

      row += inc

      if (row < 0 || size <= row) {
        row -= inc
        inc = -inc
        break
      }
    }
  }
}

/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */
function createData (version, errorCorrectionLevel, segments) {
  // Prepare data buffer
  const buffer = new BitBuffer()

  segments.forEach(function (data) {
    // prefix data with mode indicator (4 bits)
    buffer.put(data.mode.bit, 4)

    // Prefix data with character count indicator.
    // The character count indicator is a string of bits that represents the
    // number of characters that are being encoded.
    // The character count indicator must be placed after the mode indicator
    // and must be a certain number of bits long, depending on the QR version
    // and data mode
    // @see {@link Mode.getCharCountIndicator}.
    buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version))

    // add binary data sequence to buffer
    data.write(buffer)
  })

  // Calculate required number of bits
  const totalCodewords = Utils.getSymbolTotalCodewords(version)
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel)
  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8

  // Add a terminator.
  // If the bit string is shorter than the total number of required bits,
  // a terminator of up to four 0s must be added to the right side of the string.
  // If the bit string is more than four bits shorter than the required number of bits,
  // add four 0s to the end.
  if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
    buffer.put(0, 4)
  }

  // If the bit string is fewer than four bits shorter, add only the number of 0s that
  // are needed to reach the required number of bits.

  // After adding the terminator, if the number of bits in the string is not a multiple of 8,
  // pad the string on the right with 0s to make the string's length a multiple of 8.
  while (buffer.getLengthInBits() % 8 !== 0) {
    buffer.putBit(0)
  }

  // Add pad bytes if the string is still shorter than the total number of required bits.
  // Extend the buffer to fill the data capacity of the symbol corresponding to
  // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
  // and 00010001 (0x11) alternately.
  const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8
  for (let i = 0; i < remainingByte; i++) {
    buffer.put(i % 2 ? 0x11 : 0xEC, 8)
  }

  return createCodewords(buffer, version, errorCorrectionLevel)
}

/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */
function createCodewords (bitBuffer, version, errorCorrectionLevel) {
  // Total codewords for this QR code version (Data + Error correction)
  const totalCodewords = Utils.getSymbolTotalCodewords(version)

  // Total number of error correction codewords
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel)

  // Total number of data codewords
  const dataTotalCodewords = totalCodewords - ecTotalCodewords

  // Total number of blocks
  const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel)

  // Calculate how many blocks each group should contain
  const blocksInGroup2 = totalCodewords % ecTotalBlocks
  const blocksInGroup1 = ecTotalBlocks - blocksInGroup2

  const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks)

  const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks)
  const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1

  // Number of EC codewords is the same for both groups
  const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1

  // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount
  const rs = new ReedSolomonEncoder(ecCount)

  let offset = 0
  const dcData = new Array(ecTotalBlocks)
  const ecData = new Array(ecTotalBlocks)
  let maxDataSize = 0
  const buffer = new Uint8Array(bitBuffer.buffer)

  // Divide the buffer into the required number of blocks
  for (let b = 0; b < ecTotalBlocks; b++) {
    const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2

    // extract a block of data from buffer
    dcData[b] = buffer.slice(offset, offset + dataSize)

    // Calculate EC codewords for this data block
    ecData[b] = rs.encode(dcData[b])

    offset += dataSize
    maxDataSize = Math.max(maxDataSize, dataSize)
  }

  // Create final data
  // Interleave the data and error correction codewords from each block
  const data = new Uint8Array(totalCodewords)
  let index = 0
  let i, r

  // Add data codewords
  for (i = 0; i < maxDataSize; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      if (i < dcData[r].length) {
        data[index++] = dcData[r][i]
      }
    }
  }

  // Apped EC codewords
  for (i = 0; i < ecCount; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      data[index++] = ecData[r][i]
    }
  }

  return data
}

/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */
function createSymbol (data, version, errorCorrectionLevel, maskPattern) {
  let segments

  if (Array.isArray(data)) {
    segments = Segments.fromArray(data)
  } else if (typeof data === 'string') {
    let estimatedVersion = version

    if (!estimatedVersion) {
      const rawSegments = Segments.rawSplit(data)

      // Estimate best version that can contain raw splitted segments
      estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel)
    }

    // Build optimized segments
    // If estimated version is undefined, try with the highest version
    segments = Segments.fromString(data, estimatedVersion || 40)
  } else {
    throw new Error('Invalid data')
  }

  // Get the min version that can contain data
  const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel)

  // If no version is found, data cannot be stored
  if (!bestVersion) {
    throw new Error('The amount of data is too big to be stored in a QR Code')
  }

  // If not specified, use min version as default
  if (!version) {
    version = bestVersion

  // Check if the specified version can contain the data
  } else if (version < bestVersion) {
    throw new Error('\n' +
      'The chosen QR Code version cannot contain this amount of data.\n' +
      'Minimum version required to store current data is: ' + bestVersion + '.\n'
    )
  }

  const dataBits = createData(version, errorCorrectionLevel, segments)

  // Allocate matrix buffer
  const moduleCount = Utils.getSymbolSize(version)
  const modules = new BitMatrix(moduleCount)

  // Add function modules
  setupFinderPattern(modules, version)
  setupTimingPattern(modules)
  setupAlignmentPattern(modules, version)

  // Add temporary dummy bits for format info just to set them as reserved.
  // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
  // since the masking operation must be performed only on the encoding region.
  // These blocks will be replaced with correct values later in code.
  setupFormatInfo(modules, errorCorrectionLevel, 0)

  if (version >= 7) {
    setupVersionInfo(modules, version)
  }

  // Add data codewords
  setupData(modules, dataBits)

  if (isNaN(maskPattern)) {
    // Find best mask pattern
    maskPattern = MaskPattern.getBestMask(modules,
      setupFormatInfo.bind(null, modules, errorCorrectionLevel))
  }

  // Apply mask pattern
  MaskPattern.applyMask(maskPattern, modules)

  // Replace format info bits with correct values
  setupFormatInfo(modules, errorCorrectionLevel, maskPattern)

  return {
    modules: modules,
    version: version,
    errorCorrectionLevel: errorCorrectionLevel,
    maskPattern: maskPattern,
    segments: segments
  }
}

/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */
exports.create = function create (data, options) {
  if (typeof data === 'undefined' || data === '') {
    throw new Error('No input text')
  }

  let errorCorrectionLevel = ECLevel.M
  let version
  let mask

  if (typeof options !== 'undefined') {
    // Use higher error correction level as default
    errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M)
    version = Version.from(options.version)
    mask = MaskPattern.from(options.maskPattern)

    if (options.toSJISFunc) {
      Utils.setToSJISFunction(options.toSJISFunc)
    }
  }

  return createSymbol(data, version, errorCorrectionLevel, mask)
}


/***/ }),

/***/ 2882:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Polynomial = __webpack_require__(6143)

function ReedSolomonEncoder (degree) {
  this.genPoly = undefined
  this.degree = degree

  if (this.degree) this.initialize(this.degree)
}

/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */
ReedSolomonEncoder.prototype.initialize = function initialize (degree) {
  // create an irreducible generator polynomial
  this.degree = degree
  this.genPoly = Polynomial.generateECPolynomial(this.degree)
}

/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */
ReedSolomonEncoder.prototype.encode = function encode (data) {
  if (!this.genPoly) {
    throw new Error('Encoder not initialized')
  }

  // Calculate EC for this data block
  // extends data size to data+genPoly size
  const paddedData = new Uint8Array(data.length + this.degree)
  paddedData.set(data)

  // The error correction codewords are the remainder after dividing the data codewords
  // by a generator polynomial
  const remainder = Polynomial.mod(paddedData, this.genPoly)

  // return EC data blocks (last n byte, where n is the degree of genPoly)
  // If coefficients number in remainder are less than genPoly degree,
  // pad with 0s to the left to reach the needed number of coefficients
  const start = this.degree - remainder.length
  if (start > 0) {
    const buff = new Uint8Array(this.degree)
    buff.set(remainder, start)

    return buff
  }

  return remainder
}

module.exports = ReedSolomonEncoder


/***/ }),

/***/ 7007:
/***/ ((__unused_webpack_module, exports) => {

const numeric = '[0-9]+'
const alphanumeric = '[A-Z $%*+\\-./:]+'
let kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' +
  '[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' +
  '[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' +
  '[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+'
kanji = kanji.replace(/u/g, '\\u')

const byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+'

exports.KANJI = new RegExp(kanji, 'g')
exports.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g')
exports.BYTE = new RegExp(byte, 'g')
exports.NUMERIC = new RegExp(numeric, 'g')
exports.ALPHANUMERIC = new RegExp(alphanumeric, 'g')

const TEST_KANJI = new RegExp('^' + kanji + '$')
const TEST_NUMERIC = new RegExp('^' + numeric + '$')
const TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$')

exports.testKanji = function testKanji (str) {
  return TEST_KANJI.test(str)
}

exports.testNumeric = function testNumeric (str) {
  return TEST_NUMERIC.test(str)
}

exports.testAlphanumeric = function testAlphanumeric (str) {
  return TEST_ALPHANUMERIC.test(str)
}


/***/ }),

/***/ 6130:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Mode = __webpack_require__(6910)
const NumericData = __webpack_require__(1085)
const AlphanumericData = __webpack_require__(8260)
const ByteData = __webpack_require__(3424)
const KanjiData = __webpack_require__(5442)
const Regex = __webpack_require__(7007)
const Utils = __webpack_require__(242)
const dijkstra = __webpack_require__(5987)

/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */
function getStringByteLength (str) {
  return unescape(encodeURIComponent(str)).length
}

/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */
function getSegments (regex, mode, str) {
  const segments = []
  let result

  while ((result = regex.exec(str)) !== null) {
    segments.push({
      data: result[0],
      index: result.index,
      mode: mode,
      length: result[0].length
    })
  }

  return segments
}

/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */
function getSegmentsFromString (dataStr) {
  const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr)
  const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr)
  let byteSegs
  let kanjiSegs

  if (Utils.isKanjiModeEnabled()) {
    byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr)
    kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr)
  } else {
    byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr)
    kanjiSegs = []
  }

  const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs)

  return segs
    .sort(function (s1, s2) {
      return s1.index - s2.index
    })
    .map(function (obj) {
      return {
        data: obj.data,
        mode: obj.mode,
        length: obj.length
      }
    })
}

/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */
function getSegmentBitsLength (length, mode) {
  switch (mode) {
    case Mode.NUMERIC:
      return NumericData.getBitsLength(length)
    case Mode.ALPHANUMERIC:
      return AlphanumericData.getBitsLength(length)
    case Mode.KANJI:
      return KanjiData.getBitsLength(length)
    case Mode.BYTE:
      return ByteData.getBitsLength(length)
  }
}

/**
 * Merges adjacent segments which have the same mode
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */
function mergeSegments (segs) {
  return segs.reduce(function (acc, curr) {
    const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null
    if (prevSeg && prevSeg.mode === curr.mode) {
      acc[acc.length - 1].data += curr.data
      return acc
    }

    acc.push(curr)
    return acc
  }, [])
}

/**
 * Generates a list of all possible nodes combination which
 * will be used to build a segments graph.
 *
 * Nodes are divided by groups. Each group will contain a list of all the modes
 * in which is possible to encode the given text.
 *
 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
 * The group for '12345' will contain then 3 objects, one for each
 * possible encoding mode.
 *
 * Each node represents a possible segment.
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */
function buildNodes (segs) {
  const nodes = []
  for (let i = 0; i < segs.length; i++) {
    const seg = segs[i]

    switch (seg.mode) {
      case Mode.NUMERIC:
        nodes.push([seg,
          { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
          { data: seg.data, mode: Mode.BYTE, length: seg.length }
        ])
        break
      case Mode.ALPHANUMERIC:
        nodes.push([seg,
          { data: seg.data, mode: Mode.BYTE, length: seg.length }
        ])
        break
      case Mode.KANJI:
        nodes.push([seg,
          { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
        ])
        break
      case Mode.BYTE:
        nodes.push([
          { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
        ])
    }
  }

  return nodes
}

/**
 * Builds a graph from a list of nodes.
 * All segments in each node group will be connected with all the segments of
 * the next group and so on.
 *
 * At each connection will be assigned a weight depending on the
 * segment's byte length.
 *
 * @param  {Array} nodes    Array of object with segments data
 * @param  {Number} version QR Code version
 * @return {Object}         Graph of all possible segments
 */
function buildGraph (nodes, version) {
  const table = {}
  const graph = { start: {} }
  let prevNodeIds = ['start']

  for (let i = 0; i < nodes.length; i++) {
    const nodeGroup = nodes[i]
    const currentNodeIds = []

    for (let j = 0; j < nodeGroup.length; j++) {
      const node = nodeGroup[j]
      const key = '' + i + j

      currentNodeIds.push(key)
      table[key] = { node: node, lastCount: 0 }
      graph[key] = {}

      for (let n = 0; n < prevNodeIds.length; n++) {
        const prevNodeId = prevNodeIds[n]

        if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
          graph[prevNodeId][key] =
            getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) -
            getSegmentBitsLength(table[prevNodeId].lastCount, node.mode)

          table[prevNodeId].lastCount += node.length
        } else {
          if (table[prevNodeId]) table[prevNodeId].lastCount = node.length

          graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) +
            4 + Mode.getCharCountIndicator(node.mode, version) // switch cost
        }
      }
    }

    prevNodeIds = currentNodeIds
  }

  for (let n = 0; n < prevNodeIds.length; n++) {
    graph[prevNodeIds[n]].end = 0
  }

  return { map: graph, table: table }
}

/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */
function buildSingleSegment (data, modesHint) {
  let mode
  const bestMode = Mode.getBestModeForData(data)

  mode = Mode.from(modesHint, bestMode)

  // Make sure data can be encoded
  if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
    throw new Error('"' + data + '"' +
      ' cannot be encoded with mode ' + Mode.toString(mode) +
      '.\n Suggested mode is: ' + Mode.toString(bestMode))
  }

  // Use Mode.BYTE if Kanji support is disabled
  if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
    mode = Mode.BYTE
  }

  switch (mode) {
    case Mode.NUMERIC:
      return new NumericData(data)

    case Mode.ALPHANUMERIC:
      return new AlphanumericData(data)

    case Mode.KANJI:
      return new KanjiData(data)

    case Mode.BYTE:
      return new ByteData(data)
  }
}

/**
 * Builds a list of segments from an array.
 * Array can contain Strings or Objects with segment's info.
 *
 * For each item which is a string, will be generated a segment with the given
 * string and the more appropriate encoding mode.
 *
 * For each item which is an object, will be generated a segment with the given
 * data and mode.
 * Objects must contain at least the property "data".
 * If property "mode" is not present, the more suitable mode will be used.
 *
 * @param  {Array} array Array of objects with segments data
 * @return {Array}       Array of Segments
 */
exports.fromArray = function fromArray (array) {
  return array.reduce(function (acc, seg) {
    if (typeof seg === 'string') {
      acc.push(buildSingleSegment(seg, null))
    } else if (seg.data) {
      acc.push(buildSingleSegment(seg.data, seg.mode))
    }

    return acc
  }, [])
}

/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */
exports.fromString = function fromString (data, version) {
  const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled())

  const nodes = buildNodes(segs)
  const graph = buildGraph(nodes, version)
  const path = dijkstra.find_path(graph.map, 'start', 'end')

  const optimizedSegs = []
  for (let i = 1; i < path.length - 1; i++) {
    optimizedSegs.push(graph.table[path[i]].node)
  }

  return exports.fromArray(mergeSegments(optimizedSegs))
}

/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */
exports.rawSplit = function rawSplit (data) {
  return exports.fromArray(
    getSegmentsFromString(data, Utils.isKanjiModeEnabled())
  )
}


/***/ }),

/***/ 242:
/***/ ((__unused_webpack_module, exports) => {

let toSJISFunction
const CODEWORDS_COUNT = [
  0, // Not used
  26, 44, 70, 100, 134, 172, 196, 242, 292, 346,
  404, 466, 532, 581, 655, 733, 815, 901, 991, 1085,
  1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185,
  2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706
]

/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */
exports.getSymbolSize = function getSymbolSize (version) {
  if (!version) throw new Error('"version" cannot be null or undefined')
  if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40')
  return version * 4 + 17
}

/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */
exports.getSymbolTotalCodewords = function getSymbolTotalCodewords (version) {
  return CODEWORDS_COUNT[version]
}

/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */
exports.getBCHDigit = function (data) {
  let digit = 0

  while (data !== 0) {
    digit++
    data >>>= 1
  }

  return digit
}

exports.setToSJISFunction = function setToSJISFunction (f) {
  if (typeof f !== 'function') {
    throw new Error('"toSJISFunc" is not a valid function.')
  }

  toSJISFunction = f
}

exports.isKanjiModeEnabled = function () {
  return typeof toSJISFunction !== 'undefined'
}

exports.toSJIS = function toSJIS (kanji) {
  return toSJISFunction(kanji)
}


/***/ }),

/***/ 3114:
/***/ ((__unused_webpack_module, exports) => {

/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */
exports.isValid = function isValid (version) {
  return !isNaN(version) && version >= 1 && version <= 40
}


/***/ }),

/***/ 3103:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Utils = __webpack_require__(242)
const ECCode = __webpack_require__(5393)
const ECLevel = __webpack_require__(4908)
const Mode = __webpack_require__(6910)
const VersionCheck = __webpack_require__(3114)

// Generator polynomial used to encode version information
const G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0)
const G18_BCH = Utils.getBCHDigit(G18)

function getBestVersionForDataLength (mode, length, errorCorrectionLevel) {
  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
      return currentVersion
    }
  }

  return undefined
}

function getReservedBitsCount (mode, version) {
  // Character count indicator + mode indicator bits
  return Mode.getCharCountIndicator(mode, version) + 4
}

function getTotalBitsFromDataArray (segments, version) {
  let totalBits = 0

  segments.forEach(function (data) {
    const reservedBits = getReservedBitsCount(data.mode, version)
    totalBits += reservedBits + data.getBitsLength()
  })

  return totalBits
}

function getBestVersionForMixedData (segments, errorCorrectionLevel) {
  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
    const length = getTotalBitsFromDataArray(segments, currentVersion)
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
      return currentVersion
    }
  }

  return undefined
}

/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */
exports.from = function from (value, defaultValue) {
  if (VersionCheck.isValid(value)) {
    return parseInt(value, 10)
  }

  return defaultValue
}

/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */
exports.getCapacity = function getCapacity (version, errorCorrectionLevel, mode) {
  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid QR Code version')
  }

  // Use Byte mode as default
  if (typeof mode === 'undefined') mode = Mode.BYTE

  // Total codewords for this QR code version (Data + Error correction)
  const totalCodewords = Utils.getSymbolTotalCodewords(version)

  // Total number of error correction codewords
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel)

  // Total number of data codewords
  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8

  if (mode === Mode.MIXED) return dataTotalCodewordsBits

  const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version)

  // Return max number of storable codewords
  switch (mode) {
    case Mode.NUMERIC:
      return Math.floor((usableBits / 10) * 3)

    case Mode.ALPHANUMERIC:
      return Math.floor((usableBits / 11) * 2)

    case Mode.KANJI:
      return Math.floor(usableBits / 13)

    case Mode.BYTE:
    default:
      return Math.floor(usableBits / 8)
  }
}

/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */
exports.getBestVersionForData = function getBestVersionForData (data, errorCorrectionLevel) {
  let seg

  const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M)

  if (Array.isArray(data)) {
    if (data.length > 1) {
      return getBestVersionForMixedData(data, ecl)
    }

    if (data.length === 0) {
      return 1
    }

    seg = data[0]
  } else {
    seg = data
  }

  return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl)
}

/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */
exports.getEncodedBits = function getEncodedBits (version) {
  if (!VersionCheck.isValid(version) || version < 7) {
    throw new Error('Invalid QR Code version')
  }

  let d = version << 12

  while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
    d ^= (G18 << (Utils.getBCHDigit(d) - G18_BCH))
  }

  return (version << 12) | d
}


/***/ }),

/***/ 6907:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Utils = __webpack_require__(9653)

function clearCanvas (ctx, canvas, size) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (!canvas.style) canvas.style = {}
  canvas.height = size
  canvas.width = size
  canvas.style.height = size + 'px'
  canvas.style.width = size + 'px'
}

function getCanvasElement () {
  try {
    return document.createElement('canvas')
  } catch (e) {
    throw new Error('You need to specify a canvas element')
  }
}

exports.render = function render (qrData, canvas, options) {
  let opts = options
  let canvasEl = canvas

  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas
    canvas = undefined
  }

  if (!canvas) {
    canvasEl = getCanvasElement()
  }

  opts = Utils.getOptions(opts)
  const size = Utils.getImageWidth(qrData.modules.size, opts)

  const ctx = canvasEl.getContext('2d')
  const image = ctx.createImageData(size, size)
  Utils.qrToImageData(image.data, qrData, opts)

  clearCanvas(ctx, canvasEl, size)
  ctx.putImageData(image, 0, 0)

  return canvasEl
}

exports.renderToDataURL = function renderToDataURL (qrData, canvas, options) {
  let opts = options

  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas
    canvas = undefined
  }

  if (!opts) opts = {}

  const canvasEl = exports.render(qrData, canvas, opts)

  const type = opts.type || 'image/png'
  const rendererOpts = opts.rendererOpts || {}

  return canvasEl.toDataURL(type, rendererOpts.quality)
}


/***/ }),

/***/ 3776:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Utils = __webpack_require__(9653)

function getColorAttrib (color, attrib) {
  const alpha = color.a / 255
  const str = attrib + '="' + color.hex + '"'

  return alpha < 1
    ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"'
    : str
}

function svgCmd (cmd, x, y) {
  let str = cmd + x
  if (typeof y !== 'undefined') str += ' ' + y

  return str
}

function qrToPath (data, size, margin) {
  let path = ''
  let moveBy = 0
  let newRow = false
  let lineLength = 0

  for (let i = 0; i < data.length; i++) {
    const col = Math.floor(i % size)
    const row = Math.floor(i / size)

    if (!col && !newRow) newRow = true

    if (data[i]) {
      lineLength++

      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow
          ? svgCmd('M', col + margin, 0.5 + row + margin)
          : svgCmd('m', moveBy, 0)

        moveBy = 0
        newRow = false
      }

      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd('h', lineLength)
        lineLength = 0
      }
    } else {
      moveBy++
    }
  }

  return path
}

exports.render = function render (qrData, options, cb) {
  const opts = Utils.getOptions(options)
  const size = qrData.modules.size
  const data = qrData.modules.data
  const qrcodesize = size + opts.margin * 2

  const bg = !opts.color.light.a
    ? ''
    : '<path ' + getColorAttrib(opts.color.light, 'fill') +
      ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>'

  const path =
    '<path ' + getColorAttrib(opts.color.dark, 'stroke') +
    ' d="' + qrToPath(data, size, opts.margin) + '"/>'

  const viewBox = 'viewBox="' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '"'

  const width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" '

  const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n'

  if (typeof cb === 'function') {
    cb(null, svgTag)
  }

  return svgTag
}


/***/ }),

/***/ 9653:
/***/ ((__unused_webpack_module, exports) => {

function hex2rgba (hex) {
  if (typeof hex === 'number') {
    hex = hex.toString()
  }

  if (typeof hex !== 'string') {
    throw new Error('Color should be defined as hex string')
  }

  let hexCode = hex.slice().replace('#', '').split('')
  if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
    throw new Error('Invalid hex color: ' + hex)
  }

  // Convert from short to long form (fff -> ffffff)
  if (hexCode.length === 3 || hexCode.length === 4) {
    hexCode = Array.prototype.concat.apply([], hexCode.map(function (c) {
      return [c, c]
    }))
  }

  // Add default alpha value
  if (hexCode.length === 6) hexCode.push('F', 'F')

  const hexValue = parseInt(hexCode.join(''), 16)

  return {
    r: (hexValue >> 24) & 255,
    g: (hexValue >> 16) & 255,
    b: (hexValue >> 8) & 255,
    a: hexValue & 255,
    hex: '#' + hexCode.slice(0, 6).join('')
  }
}

exports.getOptions = function getOptions (options) {
  if (!options) options = {}
  if (!options.color) options.color = {}

  const margin = typeof options.margin === 'undefined' ||
    options.margin === null ||
    options.margin < 0
    ? 4
    : options.margin

  const width = options.width && options.width >= 21 ? options.width : undefined
  const scale = options.scale || 4

  return {
    width: width,
    scale: width ? 4 : scale,
    margin: margin,
    color: {
      dark: hex2rgba(options.color.dark || '#000000ff'),
      light: hex2rgba(options.color.light || '#ffffffff')
    },
    type: options.type,
    rendererOpts: options.rendererOpts || {}
  }
}

exports.getScale = function getScale (qrSize, opts) {
  return opts.width && opts.width >= qrSize + opts.margin * 2
    ? opts.width / (qrSize + opts.margin * 2)
    : opts.scale
}

exports.getImageWidth = function getImageWidth (qrSize, opts) {
  const scale = exports.getScale(qrSize, opts)
  return Math.floor((qrSize + opts.margin * 2) * scale)
}

exports.qrToImageData = function qrToImageData (imgData, qr, opts) {
  const size = qr.modules.size
  const data = qr.modules.data
  const scale = exports.getScale(size, opts)
  const symbolSize = Math.floor((size + opts.margin * 2) * scale)
  const scaledMargin = opts.margin * scale
  const palette = [opts.color.light, opts.color.dark]

  for (let i = 0; i < symbolSize; i++) {
    for (let j = 0; j < symbolSize; j++) {
      let posDst = (i * symbolSize + j) * 4
      let pxColor = opts.color.light

      if (i >= scaledMargin && j >= scaledMargin &&
        i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
        const iSrc = Math.floor((i - scaledMargin) / scale)
        const jSrc = Math.floor((j - scaledMargin) / scale)
        pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0]
      }

      imgData[posDst++] = pxColor.r
      imgData[posDst++] = pxColor.g
      imgData[posDst++] = pxColor.b
      imgData[posDst] = pxColor.a
    }
  }
}


/***/ }),

/***/ 7371:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3379);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7795);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(569);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3565);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9216);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4589);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_5_use_2_node_modules_sass_loader_dist_cjs_js_ami_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(683);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_5_use_2_node_modules_sass_loader_dist_cjs_js_ami_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_5_use_2_node_modules_sass_loader_dist_cjs_js_ami_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_5_use_2_node_modules_sass_loader_dist_cjs_js_ami_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_5_use_2_node_modules_sass_loader_dist_cjs_js_ami_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ }),

/***/ 3379:
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 569:
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ 9216:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ 3565:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 7795:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ 4589:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ 5495:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/bootstrap-icons.woff2";

/***/ }),

/***/ 3493:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/bootstrap-icons.woff";

/***/ }),

/***/ 2196:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/OpenSans-Light-webfont.eot";

/***/ }),

/***/ 2989:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/OpenSans-Light-webfont.svg";

/***/ }),

/***/ 5512:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/OpenSans-Light-webfont.ttf";

/***/ }),

/***/ 619:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/OpenSans-Light-webfont.woff";

/***/ }),

/***/ 1480:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/OpenSans-Light-webfont.woff2";

/***/ }),

/***/ 7446:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/OpenSans-Regular-webfont.eot";

/***/ }),

/***/ 9824:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/OpenSans-Regular-webfont.svg";

/***/ }),

/***/ 6929:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/OpenSans-Regular-webfont.ttf";

/***/ }),

/***/ 7058:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/OpenSans-Regular-webfont.woff";

/***/ }),

/***/ 414:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/OpenSans-Regular-webfont.woff2";

/***/ }),

/***/ 2883:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Trochut-Regular.ttf";

/***/ }),

/***/ 5501:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/ami.eot";

/***/ }),

/***/ 5463:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/ami.svg";

/***/ }),

/***/ 8427:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/ami.ttf";

/***/ }),

/***/ 9604:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/ami.woff";

/***/ }),

/***/ 6758:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/ami.woff2";

/***/ }),

/***/ 7122:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/background.jpg";

/***/ }),

/***/ 7404:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/blueprint-dark.png";

/***/ }),

/***/ 5095:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/certificate-green.png";

/***/ }),

/***/ 7148:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/certificate-pink.png";

/***/ }),

/***/ 3507:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/cloud.png";

/***/ }),

/***/ 1067:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/glass.png";

/***/ }),

/***/ 1702:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/logo.png";

/***/ }),

/***/ 4998:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/lpsc.png";

/***/ }),

/***/ 8475:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/padlock.png";

/***/ }),

/***/ 5546:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/sign_in_image.jpg";

/***/ }),

/***/ 6592:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/stripe1.png";

/***/ }),

/***/ 349:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/stripe2.png";

/***/ }),

/***/ 5662:
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"modal fade\" role=\"dialog\" id=\"AB1CB183_96EB_4116_8A9E_4409BE058F34\">\n\t<div class=\"modal-dialog modal-lg\" role=\"document\">\n\t\t<div class=\"modal-content\">\n\t\t\t<div class=\"modal-header\">\n\t\t\t\t<h4 class=\"modal-title\">Account</h4>\n\t\t\t\t{% if BOOTSTRAP_VERSION > 4 %}\n\t\t\t\t<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\"></button>\n\t\t\t\t{% else %}\n\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\"><i class=\"bi bi-x-lg\"></i></button>\n\t\t\t\t{% endif %}\n\t\t\t</div>\n\t\t\t<div class=\"modal-body\">\n\t\t\t\t<h5 id=\"D944B01D_2E8D_4EE9_9DCC_2691438BBA16\"></h5>\n\n\t\t\t\t<nav class=\"mb-2\">\n\t\t\t\t\t<div class=\"nav nav-tabs\" role=\"tablist\">\n\t\t\t\t\t\t<button class=\"nav-link active\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}toggle=\"tab\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}target=\"#B89A9E2D_8969_41F4_B266_230B782FA17D\" type=\"button\" role=\"tab\">Account status</button>\n\t\t\t\t\t\t<button class=\"nav-link xxxxxx\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}toggle=\"tab\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}target=\"#F22A8AD8_08EB_434C_B6F8_DC92FC0F69AC\" type=\"button\" role=\"tab\">User information</button>\n\t\t\t\t\t\t<button class=\"nav-link xxxxxx\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}toggle=\"tab\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}target=\"#D827345F_6762_32F6_1D2D_DB40676804AE\" type=\"button\" role=\"tab\">User roles</button>\n\t\t\t\t\t</div>\n\t\t\t\t</nav>\n\n\t\t\t\t<div class=\"tab-content\">\n\n\t\t\t\t\t<!-- ******************************************************************************************* -->\n\n\t\t\t\t\t<div class=\"tab-pane active\" role=\"tabpanel\" id=\"B89A9E2D_8969_41F4_B266_230B782FA17D\">\n\t\t\t\t\t\t<div class=\"text-center rounded mx-auto px-5 py-2 mb-2\">\n\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t<div class=\"col-xl-3 d-flex flex-column align-items-center justify-content-between\">\n<!--\t\t\t\t\t\t\t\t<canvas id=\"EC948084_8C0A_CEBF_58C9_086046AB2456\" height=\"175\" width=\"175\"></canvas>\n-->\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"col-xl-6 d-flex flex-column align-items-center justify-content-between\">\n\t\t\t\t\t\t\t\t\t<div style=\"font-family: 'Open Sans Light'; font-size: 34pt;\" id=\"D579A431_DBE4_6B30_1CF6_5E23761B4E1A\">your account is</div>\n\t\t\t\t\t\t\t\t\t<div style=\"font-family: 'Open Sans Light'; font-size: 34pt;\" id=\"F3FF9F43_DE72_40BB_B1BA_B7B3C9002671\">???????????????</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"col-xl-3 d-flex flex-column align-items-center justify-content-between\">\n\t\t\t\t\t\t\t\t\t<canvas id=\"EC948084_8C0A_CEBF_58C9_086046AB2456\" height=\"175\" width=\"175\"></canvas>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"text-center\">\n\t\t\t\t\t\t\t<a href=\"#E50FF8BD_B0F5_CD72_F9DC_FC2BFA5DBA27\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}toggle=\"collapse\">privacy policy</a>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<iframe class=\"form-control collapse\" id=\"E50FF8BD_B0F5_CD72_F9DC_FC2BFA5DBA27\" style=\"padding: 1px; min-height: 350px; width: 100%;\"></iframe>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<!-- ******************************************************************************************* -->\n\n\t\t\t\t\t<div class=\"tab-pane xxxxxx\" role=\"tabpanel\" id=\"F22A8AD8_08EB_434C_B6F8_DC92FC0F69AC\">\n\t\t\t\t\t\t<div class=\"mb-3 row\">\n\t\t\t\t\t\t\t<label class=\"col-sm-3 col-form-label col-form-label-sm\" for=\"ABEB0291_40B0_414A_A42B_E7EABB9B487E\" style=\"font-weight: normal;\">First name</label>\n\t\t\t\t\t\t\t<div class=\"col-sm-9\">\n\t\t\t\t\t\t\t\t<input class=\"form-control\" type=\"text\" id=\"ABEB0291_40B0_414A_A42B_E7EABB9B487E\" readonly=\"readonly\" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"mb-3 row\">\n\t\t\t\t\t\t\t<label class=\"col-sm-3 col-form-label col-form-label-sm\" for=\"A5AFDB62_1034_4F66_A3E6_9341B31FA290\" style=\"font-weight: normal;\">Last name</label>\n\t\t\t\t\t\t\t<div class=\"col-sm-9\">\n\t\t\t\t\t\t\t\t<input class=\"form-control\" type=\"text\" id=\"A5AFDB62_1034_4F66_A3E6_9341B31FA290\" readonly=\"readonly\" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"mb-3 row\">\n\t\t\t\t\t\t\t<label class=\"col-sm-3 col-form-label col-form-label-sm\" for=\"D730A774_05EA_47AB_A0C8_D92753802E3E\" style=\"font-weight: normal;\">Email</label>\n\t\t\t\t\t\t\t<div class=\"col-sm-9\">\n\t\t\t\t\t\t\t\t<input class=\"form-control\" type=\"text\" id=\"D730A774_05EA_47AB_A0C8_D92753802E3E\" readonly=\"readonly\" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"mb-3 row\">\n\t\t\t\t\t\t\t<label class=\"col-sm-3 col-form-label col-form-label-sm\" for=\"FE2F6232_C256_4B80_939C_EBEC90320308\" style=\"font-weight: normal;\">Issuer cert. DN in session</label>\n\t\t\t\t\t\t\t<div class=\"col-sm-9\">\n\t\t\t\t\t\t\t\t<input class=\"form-control\" type=\"text\" id=\"FE2F6232_C256_4B80_939C_EBEC90320308\" readonly=\"readonly\" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"mb-3 row\">\n\t\t\t\t\t\t\t<label class=\"col-sm-3 col-form-label col-form-label-sm\" for=\"F42FAF6B_2C8D_4142_8BD9_E5BCDCAA05AA\" style=\"font-weight: normal;\">Issuer cert. DN in account</label>\n\t\t\t\t\t\t\t<div class=\"col-sm-9\">\n\t\t\t\t\t\t\t\t<input class=\"form-control\" type=\"text\" id=\"F42FAF6B_2C8D_4142_8BD9_E5BCDCAA05AA\" readonly=\"readonly\" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"mb-1 row\">\n\t\t\t\t\t\t\t<label class=\"col-sm-3 col-form-label col-form-label-sm\" for=\"C76805D7_1E86_4231_9071_1D04783423BB\" style=\"font-weight: normal;\">Client cert. DN in session</label>\n\t\t\t\t\t\t\t<div class=\"col-sm-9\">\n\t\t\t\t\t\t\t\t<input class=\"form-control\" type=\"text\" id=\"C76805D7_1E86_4231_9071_1D04783423BB\" readonly=\"readonly\" />\n\t\t\t\t\t\t\t\t<div class=\"text-end\" style=\"margin-top: -0.65rem;\">\n\t\t\t\t\t\t\t\t\t<small class=\"badge rounded-pill text-white bg-dark\" id=\"E91280F6_E7C6_3E53_A457_646995C99317\">&nbsp;</small>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"mb-3 row\">\n\t\t\t\t\t\t\t<label class=\"col-sm-3 col-form-label col-form-label-sm\" for=\"D1BEE3BF_9161_41DC_BC53_C44FFE4D2522\" style=\"font-weight: normal;\">Client cert. DN in account</label>\n\t\t\t\t\t\t\t<div class=\"col-sm-9\">\n\t\t\t\t\t\t\t\t<input class=\"form-control\" type=\"text\" id=\"D1BEE3BF_9161_41DC_BC53_C44FFE4D2522\" readonly=\"readonly\" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<!-- ******************************************************************************************* -->\n\n\t\t\t\t\t<div class=\"tab-pane xxxxxx\" role=\"tabpanel\" id=\"D827345F_6762_32F6_1D2D_DB40676804AE\">\n\t\t\t\t\t\t<table class=\"table table-sm table-striped\">\n\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<th>Name</th>\n\t\t\t\t\t\t\t\t<th>Description</th>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<tbody id=\"BB07676B_EACA_9B42_ED51_477DB2976041\"></tbody>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<!-- ******************************************************************************************* -->\n\n\t\t\t\t</div>\n\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n";

/***/ }),

/***/ 5373:
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"modal fade\" role=\"dialog\" id=\"ECB92A89_A706_7C76_E248_E57D14C8B205\">\n\t<div class=\"modal-dialog modal-dialog-centered modal-lg\" role=\"document\">\n\t\t<div class=\"modal-content\">\n\t\t\t<div class=\"modal-header\">\n\t\t\t\t<h4 class=\"modal-title\">Change Certificate</h4>\n\t\t\t\t{% if BOOTSTRAP_VERSION > 4 %}\n\t\t\t\t<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\"></button>\n\t\t\t\t{% else %}\n\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\"><i class=\"bi bi-x-lg\"></i></button>\n\t\t\t\t{% endif %}\n\t\t\t</div>\n\t\t\t<div class=\"modal-body\">\n\n\t\t\t\t<!-- *********************************************************************************************** -->\n\n\t\t\t\t<div class=\"card mb-2\">\n\t\t\t\t\t<div class=\"card-body\">\n\t\t\t\t\t\t<h5 class=\"card-title d-flex justify-content-between\">\n\t\t\t\t\t\t\t<span>Certificate in session</span>\n\t\t\t\t\t\t\t<button class=\"btn btn-sm btn-primary\" onclick=\"amiAuth.form_attachCert();\" id=\"DB0223B3_D721_7EEB_50B8_032A04C7D218\">\n\t\t\t\t\t\t\t\tAttach this certificate\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</h5>\n\t\t\t\t\t\t<input class=\"form-control form-control-sm border-0 mb-1\" type=\"text\" readonly=\"readonly\" id=\"C8B8F968_CCAA_26DF_8665_2B518189E3DE\" />\n\t\t\t\t\t\t<input class=\"form-control form-control-sm border-0 mb-0\" type=\"text\" readonly=\"readonly\" id=\"A962ED59_DB71_C10C_6173_3615C6F48028\" />\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<!-- *********************************************************************************************** -->\n\n\t\t\t\t<div class=\"card mb-0\">\n\t\t\t\t\t<div class=\"card-body\">\n\t\t\t\t\t\t<h5 class=\"card-title d-flex justify-content-between\">\n\t\t\t\t\t\t\t<span>Certificate in AMI</span>\n\t\t\t\t\t\t\t<button class=\"btn btn-sm btn-danger\" onclick=\"amiAuth.form_detachCert();\" id=\"B39BA3DE_4BA7_CE2F_BB80_BB6F4A5CB2A2\">\n\t\t\t\t\t\t\t\tDetach this certificate\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</h5>\n\t\t\t\t\t\t<input class=\"form-control form-control-sm border-0 mb-1\" type=\"text\" readonly=\"readonly\" id=\"C9297C00_920D_4AE6_8A20_B0DDB383CC6A\" />\n\t\t\t\t\t\t<input class=\"form-control form-control-sm border-0 mb-0\" type=\"text\" readonly=\"readonly\" id=\"D4B29AC0_4867_815B_8657_5A1D623C29CF\" />\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<!-- *********************************************************************************************** -->\n\n\t\t\t</div>\n\t\t\t<div class=\"modal-footer\">\n\t\t\t\t<button class=\"btn btn-outline-secondary\" type=\"button\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}dismiss=\"modal\">Close</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n";

/***/ }),

/***/ 3111:
/***/ ((module) => {

"use strict";
module.exports = "<form class=\"modal fade\" role=\"dialog\" id=\"D9EAF998_ED8E_44D2_A0BE_8C5CF5E438BD\">\n\t<div class=\"modal-dialog modal-lg\" role=\"document\">\n\t\t<div class=\"modal-content\">\n\t\t\t<div class=\"modal-header\">\n\t\t\t\t<h4 class=\"modal-title\">Change Information</h4>\n\t\t\t\t{% if BOOTSTRAP_VERSION > 4 %}\n\t\t\t\t<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\"></button>\n\t\t\t\t{% else %}\n\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\"><i class=\"bi bi-x-lg\"></i></button>\n\t\t\t\t{% endif %}\n\t\t\t</div>\n\t\t\t<div class=\"modal-body\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-md-2 text-center\">\n\t\t\t\t\t\t<img src=\"{{ORIGIN_URL}}/js/assets/images/padlock.png\" alt=\"\" height=\"90\" width=\"90\" />\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-md-10\">\n\t\t\t\t\t\t<div class=\"mb-3\">\n\t\t\t\t\t\t\t<label for=\"E513F27D_5521_4B08_BF61_52AFB81356F7\">First name<span class=\"text-danger\">*</span></label>\n\t\t\t\t\t\t\t<input class=\"form-control\" type=\"text\" name=\"first_name\" id=\"E513F27D_5521_4B08_BF61_52AFB81356F7\" required=\"required\" placeholder=\"Type your first name...\" disabled readonly />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"mb-3\">\n\t\t\t\t\t\t\t<label for=\"AFF0B5C0_BEEC_4842_916D_DCBA7F589195\">Last name<span class=\"text-danger\">*</span></label>\n\t\t\t\t\t\t\t<input class=\"form-control\" type=\"text\" name=\"last_name\" id=\"AFF0B5C0_BEEC_4842_916D_DCBA7F589195\" required=\"required\" placeholder=\"Type your last name...\" disabled readonly />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"mb-3\">\n\t\t\t\t\t\t\t<label for=\"C587486B_62C0_4B6E_9288_D8F9F89D157B\">Email<span class=\"text-danger\">*</span></label>\n\t\t\t\t\t\t\t<input type=\"email\" class=\"form-control\" name=\"email\" id=\"C587486B_62C0_4B6E_9288_D8F9F89D157B\" required=\"required\" placeholder=\"Type your email...\" disabled readonly />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"modal-footer\">\n\t\t\t\t<button class=\"btn btn-outline-secondary\" type=\"button\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}dismiss=\"modal\">Close</button>\n\t\t\t\t<button class=\"btn btn-primary\" type=\"submit\">Submit</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</form>\n";

/***/ }),

/***/ 3334:
/***/ ((module) => {

"use strict";
module.exports = "<form class=\"modal fade\" role=\"dialog\" id=\"E92A1097_983B_4857_875F_07E4659B41B0\">\n\t<div class=\"modal-dialog modal-lg\" role=\"document\">\n\t\t<div class=\"modal-content\">\n\t\t\t<div class=\"modal-header\">\n\t\t\t\t<h4 class=\"modal-title\">Change Password</h4>\n\t\t\t\t{% if BOOTSTRAP_VERSION > 4 %}\n\t\t\t\t<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\"></button>\n\t\t\t\t{% else %}\n\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\"><i class=\"bi bi-x-lg\"></i></button>\n\t\t\t\t{% endif %}\n\t\t\t</div>\n\t\t\t<div class=\"modal-body\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-md-2 text-center\">\n\t\t\t\t\t\t<img src=\"{{ORIGIN_URL}}/js/assets/images/padlock.png\" alt=\"\" height=\"90\" width=\"90\" />\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-md-10\">\n\t\t\t\t\t\t<div class=\"mb-3\">\n\t\t\t\t\t\t\t<label for=\"F238E6EE_44BD_486A_B85D_C927A4D045D3\">Old password<span class=\"text-danger\">*</span></label>\n\t\t\t\t\t\t\t<input class=\"form-control\" type=\"password\" name=\"old_password\" id=\"F238E6EE_44BD_486A_B85D_C927A4D045D3\" required=\"required\" placeholder=\"Type your old password...\" />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"mb-3\">\n\t\t\t\t\t\t\t<label for=\"D487FE72_8D95_4048_BEA3_252274862AF4\">New password<span class=\"text-danger\">*</span></label>\n\t\t\t\t\t\t\t<input class=\"form-control\" type=\"password\" name=\"new_password\" id=\"D487FE72_8D95_4048_BEA3_252274862AF4\" required=\"required\" placeholder=\"Choose a new password...\" />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"mb-3\">\n\t\t\t\t\t\t\t<label for=\"EE1DA58C_3761_4734_A9C2_E808CDD7EE77\">New password<span class=\"text-danger\">*</span></label>\n\t\t\t\t\t\t\t<input class=\"form-control\" type=\"password\" name=\"xxx_password\" id=\"EE1DA58C_3761_4734_A9C2_E808CDD7EE77\" required=\"required\" placeholder=\"Type your new password again...\" />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"modal-footer\">\n\t\t\t\t<button class=\"btn btn-outline-secondary\" type=\"button\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}dismiss=\"modal\">Close</button>\n\t\t\t\t<button class=\"btn btn-primary\" type=\"submit\">Submit</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</form>\n";

/***/ }),

/***/ 8841:
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"modal fade\" tabindex=\"-1\" id=\"D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B\">\n\t<div class=\"modal-dialog modal-dialog-centered modal-{% if signInImageURL %}xl{% else %}lg{% endif %}\">\n\t\t<div class=\"modal-content\">\n\t\t\t<div class=\"modal-body row m-0 p-0\">\n\n\t\t\t\t{% if signInImageURL %}\n\t\t\t\t<div class=\"col-lg-6 m-0 p-0\"\n\t\t\t\t\tstyle=\"background: url('{{ signInImageURL|e }}') center center; background-size: auto 100%;\">\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"col-lg-6 m-0 p-0\">\n\t\t\t\t{% else %}\n\t\t\t\t<div class=\"col-lg-12 m-0 p-0\">\n\t\t\t\t{% endif %}\n\n\t\t\t\t\t<nav class=\"p-3\">\n\t\t\t\t\t\t<div class=\"nav nav-tabs\" role=\"tablist\">\n\t\t\t\t\t\t\t<button class=\"nav-link active\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}toggle=\"tab\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}target=\"#B7894CC1_1DAA_4A7E_B7D1_DBDF6F06AC73\" type=\"button\" role=\"tab\"><i class=\"bi bi-box-arrow-in-right\"></i> Sign In</button>\n\t\t\t\t\t\t\t{% if createAccountAllowed %}\n\t\t\t\t\t\t\t<button class=\"nav-link xxxxxx\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}toggle=\"tab\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}target=\"#EE055CD4_E58F_4834_8020_986AE3F8D67D\" type=\"button\" role=\"tab\"><i class=\"bi bi-person-plus\"></i> Sign Up</button>\n\t\t\t\t\t\t\t{% endif %}\n\t\t\t\t\t\t\t{% if changePasswordAllowed %}\n\t\t\t\t\t\t\t<button class=\"nav-link xxxxxx\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}toggle=\"tab\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}target=\"#DA2047A2_9E5D_420D_B6E7_FA261D2EF10F\" type=\"button\" role=\"tab\"><i class=\"bi bi-bandaid\"></i> Reset Password</button>\n\t\t\t\t\t\t\t{% endif %}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</nav>\n\n\t\t\t\t\t<div class=\"tab-content px-3 pb-3\" style=\"height: 390px; overflow-y: scroll;\">\n\n\t\t\t\t\t\t<!-- *************************************************************************************** -->\n\n\t\t\t\t\t\t<form class=\"tab-pane fade show active\" role=\"tabpanel\" id=\"B7894CC1_1DAA_4A7E_B7D1_DBDF6F06AC73\">\n\n\t\t\t\t\t\t\t<h1 class=\"fw-bold\">{{ signInText|e }}</h1>\n\n\t\t\t\t\t\t\t<div class=\"mb-3\">\n\t\t\t\t\t\t\t\t<label for=\"E64F24B2_33E6_4DED_9B24_28BE04219613\">Username<span class=\"text-danger\">*</span></label>\n\t\t\t\t\t\t\t\t<input class=\"form-control form-control-sm\" type=\"text\" name=\"username\" id=\"E64F24B2_33E6_4DED_9B24_28BE04219613\" required=\"required\" autocomplete=\"off\" autocapitalize=\"off\" spellcheck=\"false\" placeholder=\"Type your username...\" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"mb-3\">\n\t\t\t\t\t\t\t\t<label for=\"A4DFD039_034F_4D10_9668_385AEF4FBBB9\">Password<span class=\"text-danger\">*</span></label>\n\t\t\t\t\t\t\t\t<input class=\"form-control form-control-sm\" type=\"password\" name=\"password\" id=\"A4DFD039_034F_4D10_9668_385AEF4FBBB9\" required=\"required\" autocomplete=\"off\" autocapitalize=\"off\" spellcheck=\"false\" placeholder=\"Type your password...\" />\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t{% if passwordAuthenticationAllowed %}\n\t\t\t\t\t\t\t<button class=\"btn btn-primary shadow w-100 mt-3\" type=\"submit\">\n\t\t\t\t\t\t\t\tSign In by Username\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t{% endif %}\n\n\t\t\t\t\t\t\t{% if certificateAuthenticationAllowed %}\n\t\t\t\t\t\t\t<button class=\"btn btn-primary shadow w-100 mt-3\" type=\"button\" onclick=\"amiAuth.form_login2();\">\n\t\t\t\t\t\t\t\tSign In by Certificate\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t{% endif %}\n\n\t\t\t\t\t\t\t{% if ssoAuthenticationAllowed %}\n\t\t\t\t\t\t\t<button class=\"btn btn-light shadow w-100 mt-3\" type=\"button\" onclick=\"amiAuth.sso();\">\n\t\t\t\t\t\t\t\tSingle Sign-On\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t{% endif %}\n\n\t\t\t\t\t\t</form>\n\n\t\t\t\t\t\t<!-- *************************************************************************************** -->\n\n\t\t\t\t\t\t{% if createAccountAllowed %}\n\t\t\t\t\t\t<form class=\"tab-pane fade xxxx xxxxxx\" role=\"tabpanel\" id=\"EE055CD4_E58F_4834_8020_986AE3F8D67D\">\n\n\t\t\t\t\t\t\t<h1 class=\"fw-bold\">Sign Up</h1>\n\n\t\t\t\t\t\t\t{% if captchaAllowed %}\n\t\t\t\t\t\t\t<input type=\"hidden\" name=\"captcha_hash\" id=\"FD95B3FA_C808_0E08_2D1E_0FE0E3871101\" />\n\t\t\t\t\t\t\t{% endif %}\n\n\t\t\t\t\t\t\t<div class=\"bg-light2 p-2 mb-3\">\n\n\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"mb-3\">\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"D752CE80_49C3_4BDC_8B1A_8ED6BD57C538\">First name<span class=\"text-danger\">*</span></label>\n\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control form-control-sm\" type=\"text\" name=\"first_name\" id=\"D752CE80_49C3_4BDC_8B1A_8ED6BD57C538\" tabindex=\"1\" required=\"required\" placeholder=\"Type your first name...\" />\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"mb-3\">\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"A9A08864_6A32_45A4_8898_C167564DB8BB\">Username<span class=\"text-danger\">*</span></label>\n\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control form-control-sm\" type=\"text\" name=\"username\" id=\"A9A08864_6A32_45A4_8898_C167564DB8BB\" tabindex=\"3\" required=\"required\" placeholder=\"Choose a username...\" />\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"mb-3\">\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"E6E30EEC_15EE_4FCF_9809_2B8EC2FEF388\">Password<span class=\"text-danger\">*</span></label>\n\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control form-control-sm\" type=\"password\" name=\"password\" id=\"E6E30EEC_15EE_4FCF_9809_2B8EC2FEF388\" tabindex=\"5\" required=\"required\" placeholder=\"Choose a password...\" />\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t{% if captchaAllowed %}\n\t\t\t\t\t\t\t\t\t\t<div class=\"mb-3\">\n\t\t\t\t\t\t\t\t\t\t\t<label>Captcha</label>\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-control form-control-sm\" id=\"AC9836E6_2A20_8711_39D5_0E8340561078\" style=\"background-size: 100% 100%;\"></div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t{% endif %}\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"mb-3\">\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"B3E6D18C_ABA3_402C_88A2_55FA99555A7A\">Last name<span class=\"text-danger\">*</span></label>\n\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control form-control-sm\" type=\"text\" name=\"last_name\" id=\"B3E6D18C_ABA3_402C_88A2_55FA99555A7A\" tabindex=\"2\" required=\"required\" placeholder=\"Type your last name...\" />\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"mb-3\">\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"D1007165_B40F_4DAE_BA50_853F2C9DA32D\">Email<span class=\"text-danger\">*</span></label>\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"email\" class=\"form-control form-control-sm\" name=\"email\" id=\"D1007165_B40F_4DAE_BA50_853F2C9DA32D\" tabindex=\"4\" required=\"required\" placeholder=\"Type your email...\" />\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"mb-3\">\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187\">Password<span class=\"text-danger\">*</span></label>\n\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control form-control-sm\" type=\"password\" name=\"xxxx\" id=\"CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187\" tabindex=\"6\" required=\"required\" placeholder=\"Confirm the password...\" />\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t{% if captchaAllowed %}\n\t\t\t\t\t\t\t\t\t\t<div class=\"mb-3\">\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"F36FED50_1ACC_CD15_ABEC_6E06247BE2DD\">Captcha<span class=\"text-danger\">*</span></label>\n\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control form-control-sm\" type=\"text\" name=\"captcha_text\" id=\"F36FED50_1ACC_CD15_ABEC_6E06247BE2DD\" tabindex=\"7\" required=\"required\" placeholder=\"Confirm the captcha...\" />\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t{% endif %}\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"mb-1 text-start\">\n\t\t\t\t\t\t\t\t\t<div class=\"custom-control custom-checkbox\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"custom-control-input\" name=\"attachCert\" id=\"A09AE316_7068_4BC1_96A9_6B87D28863FE\" tabindex=\"8\" checked=\"checked\" />\n\t\t\t\t\t\t\t\t\t\t<label class=\"custom-control-label\" for=\"A09AE316_7068_4BC1_96A9_6B87D28863FE\">Attach the current certificate</label>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<iframe class=\"form-control form-control-sm mb-3\" id=\"C3E94F6D_48E0_86C0_3534_691728E492F4\" style=\"padding: 1px; height: 220px; width: 100%;\"></iframe>\n\n\t\t\t\t\t\t\t<div class=\"text-end mb-3\">\n\t\t\t\t\t\t\t\t<div class=\"custom-control custom-checkbox\">\n\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"custom-control-input\" name=\"agree\" id=\"C443738D_16BD_469F_1430_84EC13924118\" tabindex=\"9\" xxxxxxx=\"xxxxxxx\" />\n\t\t\t\t\t\t\t\t\t<label class=\"custom-control-label\" for=\"C443738D_16BD_469F_1430_84EC13924118\">I agree with the privacy policy</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"text-end mb-0\">\n\t\t\t\t\t\t\t\t<button class=\"btn btn-outline-secondary\" type=\"button\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}dismiss=\"modal\">Close</button>\n\t\t\t\t\t\t\t\t<button class=\"btn btn-primary shadowed\" type=\"submit\">Create</button>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t</form>\n\t\t\t\t\t\t{% endif %}\n\n\t\t\t\t\t\t<!-- *************************************************************************************** -->\n\n\t\t\t\t\t\t{% if changePasswordAllowed %}\n\t\t\t\t\t\t<form class=\"tab-pane fade xxxx xxxxxx\" role=\"tabpanel\" id=\"DA2047A2_9E5D_420D_B6E7_FA261D2EF10F\">\n\n\t\t\t\t\t\t\t<h1 class=\"fw-bold\">Reset Password</h1>\n\n\t\t\t\t\t\t\t{% if captchaAllowed %}\n\t\t\t\t\t\t\t<input type=\"hidden\" name=\"captcha_hash\" id=\"A63C0110_E591_6FCE_6D7A_02EEBC094199\" />\n\t\t\t\t\t\t\t{% endif %}\n\n\t\t\t\t\t\t\t<div class=\"bg-light2 p-2 mb-3\">\n\n\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"mb-{% if captchaAllowed %}3{% else %}1{% endif %}\">\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"F0B93AF7_6049_4271_B1C9_C494A012D6D0\">Username<span class=\"text-danger\">*</span></label>\n\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control form-control-sm\" type=\"text\" name=\"username\" id=\"F0B93AF7_6049_4271_B1C9_C494A012D6D0\" required=\"required\" placeholder=\"Type your username...\" />\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t{% if captchaAllowed %}\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"mb-1\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"EA79605C_6EFF_4C77_9D70_88254B00FD52\">Captcha<span class=\"text-danger\">*</span></label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-control form-control-sm\" id=\"EA79605C_6EFF_4C77_9D70_88254B00FD52\" style=\"background-size: 100% 100%;\"></div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"mb-1\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"ECCBE7F1_1D33_169C_313E_C462B19DCDA0\">Captcha<span class=\"text-danger\">*</span></label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control form-control-sm\" type=\"text\" name=\"captcha_text\" id=\"ECCBE7F1_1D33_169C_313E_C462B19DCDA0\" tabindex=\"7\" required=\"required\" placeholder=\"Confirm the captcha...\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t{% endif %}\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"text-end\">\n\t\t\t\t\t\t\t\t<button class=\"btn btn-outline-secondary\" type=\"button\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}dismiss=\"modal\">Close</button>\n\t\t\t\t\t\t\t\t<button class=\"btn btn-primary shadowed\" type=\"submit\">Reset</button>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t</form>\n\t\t\t\t\t\t{% endif %}\n\n\t\t\t\t\t\t<!-- *************************************************************************************** -->\n\n\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n";

/***/ }),

/***/ 3988:
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"toast mb-2\" role=\"alert\" {% if fadeOut %}data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}delay=\"60000\" {% else %}data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}autohide=\"false\"{% endif %} data-ami-hash=\"{{ hash }}\" data-ami-cnt=\"1\">\n\t<div class=\"toast-header py-1\">\n\t\t<strong class=\"me-auto text-{{ clazz|e }}\">{{ title|e }}</strong>\n\t\t<small>{{ date|e }}</small>\n\t\t<button class=\"btn btn-link text-muted p-0 ms-2\" type=\"button\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}dismiss=\"toast\">\n\t\t\t<i class=\"bi bi-x-circle\"></i>\n\t\t</button>\n\t</div>\n\t<div class=\"toast-body\">\n\t\t{{ message|e }}\n\t</div>\n</div>\n";

/***/ }),

/***/ 7378:
/***/ ((module) => {

"use strict";
module.exports = "<li class=\"nav-item xxxxxxxx\">\n\t{% if ssoAuthenticationAllowed %}\n\t<button class=\"btn btn-outline-secondary\" type=\"button\" onclick=\"amiAuth.sso()\">\n\t\t<i class=\"bi bi-box-arrow-in-right\"></i> {{ awfInfo.ssoLabel|default('Single Sign-On') }}\n\t</button>\n\t{% endif %}\n\t<button class=\"btn btn-primary\" type=\"button\" onclick=\"amiAuth.signIn()\"><i class=\"bi bi-box-arrow-in-right\"></i> Sign In</button>\n</li>\n";

/***/ }),

/***/ 6549:
/***/ ((module) => {

"use strict";
module.exports = "<li class=\"nav-item xxxxxxxx\">\n\t{{ icon }}\n</li>\n{% if bookmarksAllowed %}\n<li class=\"nav-item dropdown\">\n\t<a class=\"nav-link dropdown-toggle\" href=\"#\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}toggle=\"dropdown\">\n\t\t<i class=\"bi bi-star-fill\"></i>\n\t</a>\n\t<div class=\"dropdown-menu\" id=\"ami_bookmark_menu_content\">\n\t\t<a class=\"dropdown-item xxxxxxxx\" href=\"{{WEBAPP_URL}}?subapp=BookmarkEditor&userdata=bookmarks\" target=\"_blank\">Edit bookmarks</a>\n\t\t<div class=\"dropdown-divider\"></div>\n\t\t{% for hash, bookmark in bookmarkInfo %}\n\t\t<a class=\"dropdown-item\" href=\"{{WEBAPP_URL}}?v={{ hash|e }}\" target=\"_blank\">{{ bookmark.name|e }}</a>\n\t\t{% else %}\n\t\t<div class=\"dropdown-item text-muted\">-- empty --</div>\n\t\t{% endfor %}\n\t</div>\n</li>\n{% endif %}\n{% if dashboardsAllowed %}\n\t<li class=\"nav-item dropdown\">\n\t\t<a class=\"nav-link dropdown-toggle\" href=\"#\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}toggle=\"dropdown\">\n\t\t\t<i class=\"bi bi-speedometer\"></i>\n\t\t</a>\n\t\t<div class=\"dropdown-menu\" id=\"ami_dashboard_menu_content\">\n\t\t\t<a class=\"dropdown-item xxxxxxxx\" href=\"{{WEBAPP_URL}}?subapp=BookmarkEditor&userdata=dashboards\" target=\"_blank\">Edit dashboards</a>\n\t\t\t<div class=\"dropdown-divider\"></div>\n\t\t\t{% for hash, dashboard in dashboardInfo %}\n\t\t\t<a class=\"dropdown-item\" href=\"{{WEBAPP_URL}}?v={{ hash|e }}\" target=\"_blank\">{{ dashboard.name|e }}</a>\n\t\t\t{% else %}\n\t\t\t<div class=\"dropdown-item text-muted\">-- empty --</div>\n\t\t\t{% endfor %}\n\t\t</div>\n\t</li>\n{% endif %}\n<li class=\"nav-item dropdown\">\n\t<a class=\"nav-link dropdown-toggle\" href=\"#\" data-{% if BOOTSTRAP_VERSION > 4 %}bs-{% endif %}toggle=\"dropdown\">\n\t\t<i class=\"bi bi-person-circle\"></i> {{ userInfo.AMIUser|e }}\n\t</a>\n\t<div class=\"dropdown-menu\">\n\t\t{% if changeInfoAllowed %}\n\t\t<a class=\"dropdown-item\" href=\"javascript:window.amiAuth.changeInfo();\">Change Information</a>\n\t\t{% endif %}\n\t\t{% if changePasswordAllowed %}\n\t\t<a class=\"dropdown-item\" href=\"javascript:window.amiAuth.changePass();\">Change Password</a>\n\t\t{% endif %}\n\t\t{% if changeCertificateAllowed %}\n\t\t<a class=\"dropdown-item\" href=\"javascript:window.amiAuth.changeCertificate();\">Change Certificate</a>\n\t\t{% endif %}\n\t\t<a class=\"dropdown-item\" href=\"javascript:window.amiAuth.accountStatus();\">Account Status</a>\n\t\t<div id=\"ami_user_menu_content\"></div>\n\t</div>\n</li>\n{% if signOutAllowed %}\n<li class=\"nav-item xxxxxxxx\">\n\t<button class=\"btn btn-outline-primary mt-1 mt-lg-0 ms-0 ms-lg-1\" type=\"button\" onclick=\"window.amiAuth.signOut();\">\n\t\t<i class=\"bi bi-box-arrow-right\"></i> Sign Out\n\t</button>\n</li>\n{% endif %}\n";

/***/ }),

/***/ 8488:
/***/ ((module) => {

"use strict";
module.exports = moment;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "assets/js/chunks/" + chunkId + ".min.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "awf:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			72: 0,
/******/ 			990: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkawf"] = self["webpackChunkawf"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./src/js/AMIObject.js


var $this;

if (typeof window !== 'undefined') {
  $this = window;
} else if (typeof __webpack_require__.g !== 'undefined') {
  $this = __webpack_require__.g;
} else {
  throw 'Neither \'window\' nor \'global\' is defined';
}

function _$createNamespace($name, x) {
  var i;
  var parent = $this;
  var parts = $name.split(/\s*\.\s*/g),
      l = parts.length - 1;

  for (i = 0; i < l; i++) {
    if (parent[parts[i]]) {
      parent = parent[parts[i]];
    } else {
      parent = parent[parts[i]] = {};
    }
  }

  parent[parts[i]] = x;
}

function _$addToNamespace($name, x) {
  var i;
  var parent = $this;
  var parts = $name.split(/\s*\.\s*/g),
      l = parts.length - 1;

  for (i = 0; i < l; i++) {
    if (parent[parts[i]]) {
      parent = parent[parts[i]];
    } else {
      throw "'" + $name + "' ('" + parts[i] + "') not declared";
    }
  }

  parent[parts[i]] = x;
}

function $AMINamespace($name, $descr) {
  $descr = $descr || {};
  $descr.$name = $name;

  _$createNamespace($name, $descr);

  if ($descr.$) {
    $descr.$.apply($descr);
  }
}
function $AMIInterface($name, $descr) {
  $descr = $descr || {};

  var $class = function $class() {
    throw 'could nor instantiate interface';
  };

  if ($descr.$extends) {
    throw '`$extends` not allowed for interface';
  }

  if ($descr.$implements) {
    throw '`$implements` not allowed for interface';
  }

  if ($descr.$) {
    throw '`$` not allowed for interface';
  }

  if ($descr.$init) {
    throw '`$init` not allowed for interface';
  }

  $class.$name = $name;
  $class.$class = $class;
  $class.$members = $descr;

  _$addToNamespace($name, $class);
}
function $AMIClass($name, $descr) {
  $descr = $descr || {};
  var $super = $descr.$extends instanceof Function ? $descr.$extends.prototype : {};
  var $super_implements = $super.$implements instanceof Array ? $super.$implements : [];
  var $descr_implements = $descr.$implements instanceof Array ? $descr.$implements : [];

  var $class = function $class() {
    for (var i in this.$implements) {
      if (this.$implements.hasOwnProperty(i)) {
          var $interface = this.$implements[i];

          for (var j in $interface.$members) {
            if ($interface.$members.hasOwnProperty(j)) {
                var $member = $interface.$members[j];

                if (typeof this[j] !== typeof $member) {
                  alert("class '" + this.$name + "' must implement '" + $interface.$name + "." + j + "'");
                }
              }
          }
        }
    }

    var _super = this.$class._internal_super;
    var _added = this.$class._internal_added;
    this.$super = {};

    for (var name in _super) {
      if (_super.hasOwnProperty(name)) {
          this.$super[name] = function (_super, name, that) {
            return function () {
              return _super[name].apply(that, arguments);
            };
          }(_super, name, this);
        }
    }

    this.$added = {};

    for (var _name in _added) {
      if (_added.hasOwnProperty(_name)) {
          this.$added[_name] = function (_added, name, that) {
            return function () {
              return _added[name].apply(that, arguments);
            };
          }(_added, _name, this);
        }
    }

    if (this.$init) {
      this.$init.apply(this, arguments);
    }
  };

  $class._internal_super = {};
  $class._internal_added = {};

  for (var name in $super) {
    if (name === '$init' || name.charAt(0) !== '$' || $super.hasOwnProperty(name)) {
      $class._internal_super[name] = $super[name];
      $class.prototype[name] = $super[name];
    }
  }

  for (var _name2 in $descr) {
    if (_name2 === '$init' || _name2.charAt(0) !== '$' || $descr.hasOwnProperty(_name2)) {
      $class._internal_added[_name2] = $descr[_name2];
      $class.prototype[_name2] = $descr[_name2];
    }
  }

  $class.prototype.$name = $name;
  $class.prototype.$class = $class;
  $class.prototype.$implements = $super_implements.concat($descr_implements);

  _$addToNamespace($name, $class);

  if ($descr.$) {
    $descr.$.apply($class);
  }
}

if (typeof jQuery !== 'undefined') {
  jQuery.Namespace = $AMINamespace;
  jQuery.Interface = $AMIInterface;
  jQuery.Class = $AMIClass;
}
// EXTERNAL MODULE: ./node_modules/jspath/index.js
var jspath = __webpack_require__(6915);
var jspath_default = /*#__PURE__*/__webpack_require__.n(jspath);
;// CONCATENATED MODULE: ./node_modules/ami-http-client/src/client.js
/*!
 * AMI HTTP Client Java
 *
 * Copyright (c) 2014-2021 The AMI Team, CNRS/LPSC
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */



/*--------------------------------------------------------------------------------------------------------------------*/



/*--------------------------------------------------------------------------------------------------------------------*/
/* CLIENT                                                                                                             */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Class representing an AMI HTTP client
 */

class AMIHTTPClient
{
	/*----------------------------------------------------------------------------------------------------------------*/
	/* PUBLIC VARIABLES                                                                                               */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Library version
	 * @type {string}
	 */

	version = '{{VERSION}}';

	/*----------------------------------------------------------------------------------------------------------------*/
	/* PRIVATE VARIABLES                                                                                              */
	/*----------------------------------------------------------------------------------------------------------------*/

	#endpoint = '';

	#converter = 'AMIXmlToJson.xsl';

	#paramRegExp = new RegExp('-\\W*([a-zA-Z][a-zA-Z0-9]*)\\W*=\\W*\\?', 'g');

	/*----------------------------------------------------------------------------------------------------------------*/
	/* METHODS                                                                                                        */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * An AMI HTTP client
	 * @param {string} endpoint the endpoint
	 * @returns {AMIHTTPClient} The AMI HTTP client
	 */

	constructor(endpoint)
	{
		this.#endpoint = endpoint;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Get the client HTTP endpoint
	 * @returns {string} The client HTTP endpoint
	 */

	getEndpoint()
	{
		return this.#endpoint;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Executes an AMI command
	 * @param {string} command the AMI command
	 * @param {Object<string,*>} [options={}] dictionary of settings (endpoint, converter, extras, params, context, timeout)
	 * @returns {$.Promise} A JQuery promise object
	 */

	execute(command, options)
	{
		options = options || {};

		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const endpoint = (options.endpoint || this.#endpoint).trim();
		const converter = (options.converter || this.#converter).trim();

		const extras = options.extras || {};
		const params = options.params || [];

		const context = options.context || result;
		const timeout = options.timeout || 120000;

		/*------------------------------------------------------------------------------------------------------------*/

		command = (command || '').trim().replace(this.#paramRegExp, (x, y) => {

			const rawValue = params.shift();

			return Object.prototype.toString.call(rawValue) === '[object String]' ? `-${y}=${JSON.stringify(rawValue)}`
			                                                                      : `-${y}="${JSON.stringify(rawValue)}"`
			;
		});

		/*------------------------------------------------------------------------------------------------------------*/

		const data = {
			Command: command,
			Converter: converter,
			...extras,
		};

		/*------------------------------------------------------------------------------------------------------------*/

		const url               = endpoint                      ;
		const urlWithParameters = endpoint + '?' + $.param(data);

		/*------------------------------------------------------------------------------------------------------------*/

		if(converter === 'AMIXmlToJson.xsl')
		{
			/*--------------------------------------------------------------------------------------------------------*/
			/* JSON FORMAT                                                                                            */
			/*--------------------------------------------------------------------------------------------------------*/

			$.ajax({
				url: url,
				data: data,
				type: 'POST',
				timeout: timeout,
				dataType: 'json',
				xhrFields: {
					withCredentials: true
				},
				success: (data) => {

					const info = jspath_default().apply('.AMIMessage.info.$', data);
					const error = jspath_default().apply('.AMIMessage.error.$', data);

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

					if(textStatus === ((('error'))))
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

			/*--------------------------------------------------------------------------------------------------------*/
		}
		else
		{
			/*--------------------------------------------------------------------------------------------------------*/
			/* OTHER FORMATS                                                                                          */
			/*--------------------------------------------------------------------------------------------------------*/

			$.ajax({
				url: url,
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

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	#guest()
	{
		return {
			AMIUser: 'guest',
			guestUser: 'guest',
			clientDNInAMI: '',
			issuerDNInAMI: '',
			clientDNInSession: '',
			issuerDNInSession: '',
			notBefore: '',
			notAfter: '',
			firstName: 'guest',
			lastName: 'guest',
			email: 'N/A',
			country: 'N/A',
			valid: 'false',
			certEnabled: 'false',
			vomsEnabled: 'false',
		}
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * @param {$.Promise}
	 * @param {Object<string,*>} [options={}]
	 * @returns {$.Promise} A JQuery promise object
	 */

	#getUserInfo(deferred, options)
	{
		options = options || {};

		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const context = options.context || result;

		/*------------------------------------------------------------------------------------------------------------*/

		deferred.then((data, message) => {

			const userInfo = {};
			const roleInfo = {};
			const bookmarkInfo = {};
			const dashboardInfo = {};
			const awfInfo = {};

			/*--------------------------------------------------------------------------------------------------------*/

			jspath_default().apply('..rowset{.@type==="user"}.row.field', data).forEach((item) => {

				userInfo[item['@name']] = item['$'];
			});

			/*--------------------------------------------------------------------------------------------------------*/

			jspath_default().apply('..rowset{.@type==="awf"}.row.field', data).forEach((item) => {

				awfInfo[item['@name']] = item['$'];
			});

			/*--------------------------------------------------------------------------------------------------------*/

			jspath_default().apply('..rowset{.@type==="role"}.row', data).forEach((row) => {

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

			/*--------------------------------------------------------------------------------------------------------*/

			jspath_default().apply('..rowset{.@type==="bookmark"}.row', data).forEach((row) => {

				let hash = '';
				const bookmark = {};

				row.field.forEach((field) => {

					bookmark[field['@name']] = field['$'];

					if(field['@name'] === 'hash')
					{
						hash = field['$'];
					}
				});

				bookmarkInfo[hash] = bookmark;
			});

			/*--------------------------------------------------------------------------------------------------------*/

			jspath_default().apply('..rowset{.@type==="dashboard"}.row', data).forEach((row) => {

				let hash = '';
				const dashboard = {};

				row.field.forEach((field) => {

					dashboard[field['@name']] = field['$'];

					if(field['@name'] === 'hash')
					{
						hash = field['$'];
					}
				});

				dashboardInfo[hash] = dashboard;
			});

			/*--------------------------------------------------------------------------------------------------------*/

			result.resolveWith(context, [data, message, userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo]);

		}, (data, message) => {

			result.rejectWith(context, [data, message, this.#guest(), {}, {}, {}, {}]);
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Sign in by code
	 * @param {string} code the code
	 * @param {Object<string,*>} [options={}] dictionary of optional parameters (endpoint, converter, context, timeout)
	 * @returns {$.Promise} A JQuery promise object
	 */

	signInByCode(code, options)
	{
		return this.#getUserInfo(
			this.execute('GetSessionInfo -AMIUser="__oidc_code__" -AMIPass=?', {extras: {'NoCert': null}, params: [code]}),
			options
		);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Sign in by token
	 * @param {string} token the token
	 * @param {Object<string,*>} [options={}] dictionary of optional parameters (endpoint, converter, context, timeout)
	 * @returns {$.Promise} A JQuery promise object
	 */

	signInByToken(token, options)
	{
		return this.#getUserInfo(
			this.execute('GetSessionInfo -AMIUser="__oidc_token__" -AMIPass=?', {extras: {'NoCert': null}, params: [token]}),
			options
		);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Sign in by password
	 * @param {string} username the username
	 * @param {string} password the password
	 * @param {Object<string,*>} [options={}] dictionary of optional parameters (endpoint, converter, context, timeout)
	 * @returns {$.Promise} A JQuery promise object
	 */

	signInByPassword(username, password, options)
	{
		return this.#getUserInfo(
			this.execute('GetSessionInfo -AMIUser=? -AMIPass=?', {extras: {'NoCert': null}, params: [username, password]}),
			options
		);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Sign in by certificate
	 * @param {Object<string,*>} [options={}] dictionary of optional parameters (endpoint, converter, context, timeout)
	 * @returns {$.Promise} A JQuery promise object
	 */

	signInByCertificate(options)
	{
		return this.#getUserInfo(
			this.execute('GetSessionInfo', {extras: {}, params: []}),
			options
		);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Sign out
	 * @param {Object<string,*>} [options={}] dictionary of optional parameters (endpoint, converter, context, timeout)
	 * @returns {$.Promise} A JQuery promise object
	 */

	signOut(options)
	{
		return this.#getUserInfo(
			this.execute('GetSessionInfo -AMIUser=? -AMIPass=?', {extras: {'NoCert': null}, params: [(((''))), ((('')))]}),
			options
		);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Finds data within the given JSON, see {@link https://github.com/dfilatov/jspath}
	 * @param {string} path the path
	 * @param {Object<string,*>} json the JSON
	 * @returns {Array<*>} The resulting array
	 */

	jspath(path, json)
	{
		return jspath_default().apply(path, json);
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/
/* BROWSER & MODULE SUPPORT                                                                                           */
/*--------------------------------------------------------------------------------------------------------------------*/

if(typeof window !== 'undefined') window.AMIHTTPClient = AMIHTTPClient;

/*--------------------------------------------------------------------------------------------------------------------*/

/* harmony default export */ const client = (AMIHTTPClient);

/*--------------------------------------------------------------------------------------------------------------------*/

;// CONCATENATED MODULE: ./node_modules/ami-http-client/index.js
/*--------------------------------------------------------------------------------------------------------------------*/



/*--------------------------------------------------------------------------------------------------------------------*/



/*--------------------------------------------------------------------------------------------------------------------*/

/* harmony default export */ const ami_http_client = (client);

/*--------------------------------------------------------------------------------------------------------------------*/

// EXTERNAL MODULE: ./node_modules/paho-mqtt/paho-mqtt.js
var paho_mqtt = __webpack_require__(8295);
;// CONCATENATED MODULE: ./node_modules/ami-mqtt-client/src/client.js
/*!
 * AMI MQTT Client Java
 *
 * Copyright (c) 2014-2021 The AMI Team, CNRS/LPSC
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */



/*--------------------------------------------------------------------------------------------------------------------*/





/*--------------------------------------------------------------------------------------------------------------------*/
/* JWT                                                                                                                */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Parse a JWT token
 * @param {string} token the JWT token
 * @returns {Object<string,string>} The JWT token content
 */

function parseJwt(token)
{
	try
	{
		const parts = token.split('.');

		if(parts.length > 1)
		{
			/*--------------------------------------------------------------------------------------------------------*/
			/* DECODE PAYLOAD                                                                                         */
			/*--------------------------------------------------------------------------------------------------------*/

			const payload = decodeURIComponent(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')).split('').map((c) => {

				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);

			}).join(''));

			/*--------------------------------------------------------------------------------------------------------*/
			/* PARSE PAYLOAD                                                                                          */
			/*--------------------------------------------------------------------------------------------------------*/

			return JSON.parse(payload);

			/*--------------------------------------------------------------------------------------------------------*/
		}
		else
		{
			return {};
		}
	}
	catch(e)
	{
		return {};
	}
}

/*--------------------------------------------------------------------------------------------------------------------*/
/* CLIENT                                                                                                             */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Class representing an AMI MQTT client
 */

class AMIMQTTClient
{
	/*----------------------------------------------------------------------------------------------------------------*/
	/* PUBLIC VARIABLES                                                                                               */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Library version
	 * @type {String}
	 */

	version = '{{VERSION}}';

	/*----------------------------------------------------------------------------------------------------------------*/
	/* PRIVATE VARIABLES                                                                                              */
	/*----------------------------------------------------------------------------------------------------------------*/

	#L = {};

	#cnt = 0x01;

	#converter = 'AMIXmlToJson.xsl';

	#paramRegExp = new RegExp('-\\W*([a-zA-Z][a-zA-Z0-9]*)\\W*=\\W*\\?', 'g');

	#responseRegExp = new RegExp('AMI-RESPONSE<([0-9]+),(true|false)>(.*)', 's');

	/*----------------------------------------------------------------------------------------------------------------*/
	/* PUBLIC METHODS                                                                                                 */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * An AMI MQTT client
	 * @param {string} endpoint the endpoint
	 * @param {Object<string,*>} [options={}] dictionary of optional parameters (onConnected, onConnectionLost, onMessageArrived, onMessageDelivered)
	 * @returns {AMIMQTTClient} The AMI MQTT client
	 */

	constructor(endpoint, options)
	{
		options = options || {};

		/*------------------------------------------------------------------------------------------------------------*/

		const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {

			const r = 16 * Math.random(), v = (c === 'x') ? (r | 0x000000000)
			                                              : (r & 0x03 | 0x08)
			;

			return v.toString(16);
		});

		/*------------------------------------------------------------------------------------------------------------*/

		this._uuid = uuid;

		this._endpoint = endpoint;

		/*------------------------------------------------------------------------------------------------------------*/

		this._userOnConnected        = options.onConnected        || null;
		this._userOnConnectionLost   = options.onConnectionLost   || null;
		this._userOnMessageArrived   = options.onMessageArrived   || null;
		this._userOnMessageDelivered = options.onMessageDelivered || null;

		/*------------------------------------------------------------------------------------------------------------*/

		const url = new URL(endpoint);

		/*------------------------------------------------------------------------------------------------------------*/

		this._useSSL = url.protocol === 'wss:';

		/*------------------------------------------------------------------------------------------------------------*/

		this._client = new paho_mqtt.Client(url.hostname, parseInt(url.port || '443'), url.pathname, uuid);

		/*------------------------------------------------------------------------------------------------------------*/

		this._client.onConnected        = (...args) => this.#onConnected       .apply(this, args);
		this._client.onConnectionLost   = (...args) => this.#onConnectionLost  .apply(this, args);
		this._client.onMessageArrived   = (...args) => this.#onMessageArrived  .apply(this, args);
		this._client.onMessageDelivered = (...args) => this.#onMessageDelivered.apply(this, args);

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Sign in by JWT token
	 * @param {string} password the password
	 * @param {string} serverName the server name
	 * @returns {$.Promise} A JQuery promise object
	 */

	signInByToken(password, serverName)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const username = parseJwt(password).sub;

		/*------------------------------------------------------------------------------------------------------------*/

		if(username)
		{
			/*--------------------------------------------------------------------------------------------------------*/

			this._username = username;

			this._serverName = serverName;

			/*--------------------------------------------------------------------------------------------------------*/

			this._client.connect({
				useSSL: this._useSSL,
				userName: username,
				password: password,
				reconnect: true,
				/**/
				onSuccess: () => { result.resolve(this._uuid); },
				onFailure: (x, y, errorMessage) => { result.reject(errorMessage); },
			});

			/*--------------------------------------------------------------------------------------------------------*/
		}
		else
		{
			result.reject('invalid token');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Sign out
	 * @returns {$.Promise} A JQuery promise object
	 */

	signOut()
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		try
		{
			this._client.disconnect();

			result.resolve(this._uuid);
		}
		catch(errorMessage)
		{
			result.resolve(errorMessage);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Get the client UUID
	 * @returns {string} The client UUID
	 */

	getUUID()
	{
		return this._uuid;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Get the endpoint
	 * @returns {string} The endpoint
	 */

	getEndpoint()
	{
		return this._endpoint;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Get the username
	 * @returns {string} The username
	 */

	getUsername()
	{
		return this._username;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Subscribe a MQTT topic
	 * @param {string} topic the topic
	 * @param {Object<string,*>} [options={}] dictionary of optional parameters (qos=0,1,2, timeout [ms])
	 * @returns {$.Promise} A JQuery promise object
	 */

	subscribe(topic, options)
	{
		options = options || {};

		const result = $.Deferred();

		this._client.subscribe(
			topic,
			{
				qos: options.qos || 0,
				timeout: options.timeout || 10000,
				/**/
				onSuccess: () => { result.resolve(); },
				onFailure: (x, y, errorMessage) => { result.reject(errorMessage); },
			}
		);

		return result.promise();
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Unsubscribe a MQTT topic
	 * @param {string} topic the topic
	 * @param {Object<string,*>} [options={}] dictionary of optional parameters (qos=0,1,2, timeout [ms])
	 * @returns {$.Promise} A JQuery promise object
	 */

	unsubscribe(topic, options)
	{
		options = options || {};

		const result = $.Deferred();

		this._client.unsubscribe(
			topic,
			{
				qos: options.qos || 0,
				timeout: options.timeout || 10000,
				/**/
				onSuccess: () => { result.resolve(); },
				onFailure: (x, y, errorMessage) => { result.reject(errorMessage); },
			}
		);

		return result.promise();
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Sends a MQTT message
	 * @param {string} topic the topic
	 * @param {string} payload the payload
	 * @param {Object<string,*>} [options={}] dictionary of optional parameters (qos=0,1,2, retained=true,false)
	 * @returns {$.Promise} A JQuery promise object
	 */

	send(topic, payload, options)
	{
		options = options || {};

		/*------------------------------------------------------------------------------------------------------------*/

		const token = this.#cnt++;

		/*------------------------------------------------------------------------------------------------------------*/

		const message = new paho_mqtt.Message(payload);

		message.token    = token;
		message.topic    = topic;
		message.qos      = options.qos      || 0x000;
		message.retained = options.retained || false;

		/*------------------------------------------------------------------------------------------------------------*/

		this._client.send(message);

		/*------------------------------------------------------------------------------------------------------------*/

		return $.Deferred().resolve(token).promise();

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Executes an AMI command
	 * @param {string} command the AMI command
	 * @param {Object<string,*>} [options={}] dictionary of optional parameters (serverName, converter, timeout [ms])
	 * @returns {$.Promise} A JQuery promise object
	 */

	execute(command, options)
	{
		options = options || {};

		/*------------------------------------------------------------------------------------------------------------*/

		const token = this.#cnt++;

		/*------------------------------------------------------------------------------------------------------------*/

		const params = options.params || [];

		/*------------------------------------------------------------------------------------------------------------*/

		const serverName = ('serverName' in options) ? (options.serverName || this._serverName) : this._serverName;

		const converter = ('converter' in options) ? (options.converter || /*--*/ '' /*--*/) : this.#converter;

		/*------------------------------------------------------------------------------------------------------------*/

		command = (command || '').trim().replace(this.#paramRegExp, (x, y) => {

			const rawValue = params.shift();

			return Object.prototype.toString.call(rawValue) === '[object String]' ? `-${y}=${JSON.stringify(rawValue)}`
			                                                                      : `-${y}="${JSON.stringify(rawValue)}"`
			;
		});

		/*------------------------------------------------------------------------------------------------------------*/

		const topic = `ami/${serverName}/command/${converter}`;

		const message = new paho_mqtt.Message(`AMI-COMMAND<${token},"${this._uuid}","${this._username}">${command}`);

		message.token    = token;
		message.topic    = topic;
		message.qos      = options.qos      || 0x000;
		message.retained = options.retained || false;

		/*------------------------------------------------------------------------------------------------------------*/

		this._client.send(message);

		/*------------------------------------------------------------------------------------------------------------*/

		const result = this.#L[token] = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		setTimeout(() => {

			if(token in this.#L)
			{
				this.#L[token].reject('timeout', token);

				delete this.#L[token];
			}

		}, options.timeout || 10000);

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Finds data within the given JSON, see {@link https://github.com/dfilatov/jspath}
	 * @param {string} path the path
	 * @param {Object<string,*>} json the JSON
	 * @returns {Array<*>} The resulting array
	 */

	jspath(path, json)
	{
		return jspath_default().apply(path, json);
	}

	/*----------------------------------------------------------------------------------------------------------------*/
	/* PRIVATE METHODS                                                                                                */
	/*----------------------------------------------------------------------------------------------------------------*/

	#onConnected(reconnect, serverURL)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		if(reconnect) {
			console.log(`onConnected: client \`${this._uuid}\` reconnected to server URL \`${serverURL}\``);
		}
		else {
			console.log(`onConnected: client \`${this._uuid}\` connected to server URL \`${serverURL}\``);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		this.subscribe(this._uuid).always(() => {

			if(this._userOnConnected)
			{
				this._userOnConnected(reconnect, serverURL);
			}
		});

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	#onConnectionLost(responseObject)
	{
		if(responseObject.errorCode !== 0)
		{
			console.log(`onConnectionLost: client \`${this._uuid}\` disconnected, cause: ${responseObject.errorMessage}`);

			if(this._userOnConnectionLost)
			{
				this._userOnConnectionLost(responseObject.errorMessage);
			}
		}
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	#onMessageArrived(message)
	{
		const m = message.payloadString.match(this.#responseRegExp);

		if(message.topic === this._uuid && m)
		{
			/*--------------------------------------------------------------------------------------------------------*/
			/* AMI COMMAND RESULT MESSAGE                                                                             */
			/*--------------------------------------------------------------------------------------------------------*/

			const token = parseInt(m[1]);

			const json = /*----*/(m[2]);

			const data = /*---*/(m[3]);

			/*--------------------------------------------------------------------------------------------------------*/

			if(token in this.#L)
			{
				if(json === 'true')
				{
					const json = JSON.parse(data);

					const info = jspath_default().apply('.AMIMessage.info.$', json);
					const error = jspath_default().apply('.AMIMessage.error.$', json);

					if(error.length === 0)
					{
						this.#L[token].resolve(json, info.join('. '), token);
					}
					else
					{
						this.#L[token].reject(json, error.join('. '), token);
					}
				}
				else
				{
					this.#L[token].resolve(data, '', token);
				}

				delete this.#L[token];
			}

			/*--------------------------------------------------------------------------------------------------------*/
		}
		else
		{
			/*--------------------------------------------------------------------------------------------------------*/
			/* OTHER MESSAGE                                                                                          */
			/*--------------------------------------------------------------------------------------------------------*/

			if(this._userOnMessageArrived)
			{
				this._userOnMessageArrived(message.topic, message.payloadString, message.qos, message.retained);
			}

			/*--------------------------------------------------------------------------------------------------------*/
		}
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	#onMessageDelivered(message)
	{
		if(this._userOnMessageDelivered)
		{
			this._userOnMessageDelivered(message.token);
		}
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/
/* BROWSER SUPPORT                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

if(typeof window !== 'undefined') window.AMIMQTTClient = AMIMQTTClient;

/*--------------------------------------------------------------------------------------------------------------------*/

/* harmony default export */ const src_client = (AMIMQTTClient);

/*--------------------------------------------------------------------------------------------------------------------*/

;// CONCATENATED MODULE: ./node_modules/ami-mqtt-client/index.js
/*--------------------------------------------------------------------------------------------------------------------*/



/*--------------------------------------------------------------------------------------------------------------------*/



/*--------------------------------------------------------------------------------------------------------------------*/

/* harmony default export */ const ami_mqtt_client = (src_client);

/*--------------------------------------------------------------------------------------------------------------------*/

;// CONCATENATED MODULE: ./src/js/AMICommand.js


function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }




var _httpClient = _classPrivateFieldLooseKey("httpClient");

var _mqttClient = _classPrivateFieldLooseKey("mqttClient");

var AMICommand = function () {
  function AMICommand() {
    Object.defineProperty(this, _httpClient, {
      writable: true,
      value: null
    });
    Object.defineProperty(this, _mqttClient, {
      writable: true,
      value: null
    });
  }

  var _proto = AMICommand.prototype;

  _proto.initHttpClient = function initHttpClient(endpoint) {
    _classPrivateFieldLooseBase(this, _httpClient)[_httpClient] = new ami_http_client(endpoint);
  };

  _proto.initMqttClient = function initMqttClient(endpoint) {
    _classPrivateFieldLooseBase(this, _mqttClient)[_mqttClient] = new ami_mqtt_client(endpoint);
  };

  _proto.getHttpEndpoint = function getHttpEndpoint() {
    return _classPrivateFieldLooseBase(this, _httpClient)[_httpClient] ? _classPrivateFieldLooseBase(this, _httpClient)[_httpClient].getEndpoint() : '';
  };

  _proto.getMqttEndpoint = function getMqttEndpoint() {
    return _classPrivateFieldLooseBase(this, _mqttClient)[_mqttClient] ? _classPrivateFieldLooseBase(this, _mqttClient)[_mqttClient].getEndpoint() : '';
  };

  _proto.execute = function execute(command, options) {
    return typeof options === 'object' && 'mqtt' in options ? _classPrivateFieldLooseBase(this, _mqttClient)[_mqttClient].execute(command, options) : _classPrivateFieldLooseBase(this, _httpClient)[_httpClient].execute(command, options);
  };

  _proto.mqttSignInByToken = function mqttSignInByToken(token, serverName) {
    return _classPrivateFieldLooseBase(this, _mqttClient)[_mqttClient].signInByToken(token, serverName);
  };

  _proto.mqttSignOut = function mqttSignOut(options) {
    return _classPrivateFieldLooseBase(this, _mqttClient)[_mqttClient].signOut(options);
  };

  _proto.signInByCode = function signInByCode(code, options) {
    return _classPrivateFieldLooseBase(this, _httpClient)[_httpClient].signInByCode(code, options);
  };

  _proto.signInByToken = function signInByToken(token, options) {
    return _classPrivateFieldLooseBase(this, _httpClient)[_httpClient].signInByToken(token, options);
  };

  _proto.signInByPassword = function signInByPassword(username, password, options) {
    return _classPrivateFieldLooseBase(this, _httpClient)[_httpClient].signInByPassword(username, password, options);
  };

  _proto.signInByCertificate = function signInByCertificate(options) {
    return _classPrivateFieldLooseBase(this, _httpClient)[_httpClient].signInByCertificate(options);
  };

  _proto.signOut = function signOut(options) {
    return _classPrivateFieldLooseBase(this, _httpClient)[_httpClient].signOut(options).always(function () {});
  };

  _proto.attachCertificate = function attachCertificate(options) {
    options = options || {};
    return this.execute('GetSessionInfo -attachCert', options);
  };

  _proto.detachCertificate = function detachCertificate(options) {
    options = options || {};
    return this.execute('GetSessionInfo -detachCert', options);
  };

  _proto.addUser = function addUser(username, password, firstName, lastName, email, captchaHash, captchaText, attachCert, agree, options) {
    options = options || {};
    options.params = [username, password, firstName, lastName, email, captchaHash, captchaText];
    return this.execute("AddUser -amiLogin=? -amiPassword=? -firstName=? -lastName=? -email=? -captchaHash=? -captchaText=? " + (attachCert ? ' -attachCert' : '') + (agree ? ' -agree' : ''), options);
  };

  _proto.changeInfo = function changeInfo(firstName, lastName, email, options) {
    options = options || {};
    options.params = [firstName, lastName, email];
    return this.execute('SetUserInfo -firstName=? -lastName=? -email=?', options);
  };

  _proto.changePassword = function changePassword(username, oldPassword, newPassword, options) {
    options = options || {};
    options.params = [username, oldPassword, newPassword];
    return this.execute('ChangePassword -amiLogin=? -amiPasswordOld=? -amiPasswordNew=?', options);
  };

  _proto.resetPassword = function resetPassword(username, captchaHash, captchaText, options) {
    options = options || {};
    options.params = [username, captchaHash, captchaText];
    return this.execute('ResetPassword -amiLogin=? -captchaHash=? -captchaText=?', options);
  };

  return AMICommand;
}();

/* harmony default export */ const js_AMICommand = (new AMICommand());
// EXTERNAL MODULE: ./node_modules/ami-twig/index.js
var ami_twig = __webpack_require__(444);
;// CONCATENATED MODULE: ./src/js/utilities/tools.js



function _internal_then(deferred, doneCallback, failCallback) {
  if (deferred && deferred.then) {
    deferred.then(doneCallback, failCallback);
  } else {
    doneCallback();
  }
}
function _internal_always(deferred, alwaysCallback) {
  if (deferred && deferred.always) {
    deferred.always(alwaysCallback);
  } else {
    alwaysCallback();
  }
}
function typeOf(x) {
  var name = Object.prototype.toString.call(x);
  return name.startsWith('[object ') ? name.substring(8, name.length - 1) : '';
}
function isString(x) {
  return ami_twig/* default.stdlib.isString */.Z.stdlib.isString(x);
}
function isArray(x) {
  return ami_twig/* default.stdlib.isArray */.Z.stdlib.isArray(x);
}
function isObject(x) {
  return ami_twig/* default.stdlib.isObject */.Z.stdlib.isObject(x);
}
function isSet(x) {
  return ami_twig/* default.stdlib.isSet */.Z.stdlib.isSet(x);
}
function isMap(x) {
  return ami_twig/* default.stdlib.isMap */.Z.stdlib.isMap(x);
}
function asArray(x) {
  return Array.isArray(x) ? x : [x];
}
function setupParams(immutables, defaults, options) {
  var result = {};

  if (options) {
    for (var _i = 0, _Object$entries = Object.entries(options); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _Object$entries[_i],
          key = _Object$entries$_i[0],
          val = _Object$entries$_i[1];
      result[key] = val;
    }
  }

  if (defaults) {
    for (var _i2 = 0, _Object$entries2 = Object.entries(defaults); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _Object$entries2[_i2],
          _key = _Object$entries2$_i[0],
          _val = _Object$entries2$_i[1];

      if (!(_key in result)) {
        result[_key] = _val;
      }
    }
  }

  if (immutables) {
    for (var _i3 = 0, _Object$entries3 = Object.entries(immutables); _i3 < _Object$entries3.length; _i3++) {
      var _Object$entries3$_i = _Object$entries3[_i3],
          _key2 = _Object$entries3$_i[0],
          _val2 = _Object$entries3$_i[1];
      result[_key2] = _val2;
    }
  }

  return result;
}
function setup(optionNames, optionDefaults, options) {
  var result = [];
  var l = optionNames.length;
  var m = optionDefaults.length;

  if (l !== m) {
    throw 'internal error';
  }

  if (options) {
    for (var i = 0; i < l; i++) {
      result.push(optionNames[i] in options ? options[optionNames[i]] : optionDefaults[i]);
    }
  } else {
    for (var _i4 = 0; _i4 < l; _i4++) {
      result.push(optionDefaults[_i4]);
    }
  }

  return result;
}
;// CONCATENATED MODULE: ./src/js/AMIRouter.js


function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function AMIRouter_classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var AMIRouter_id = 0;

function AMIRouter_classPrivateFieldLooseKey(name) { return "__private_" + AMIRouter_id++ + "_" + name; }



var _webAppURL = AMIRouter_classPrivateFieldLooseKey("webAppURL");

var _webAppArgs = AMIRouter_classPrivateFieldLooseKey("webAppArgs");

var _webAppHash = AMIRouter_classPrivateFieldLooseKey("webAppHash");

var _scriptURL = AMIRouter_classPrivateFieldLooseKey("scriptURL");

var _scriptArgs = AMIRouter_classPrivateFieldLooseKey("scriptArgs");

var _scriptHash = AMIRouter_classPrivateFieldLooseKey("scriptHash");

var _originURL = AMIRouter_classPrivateFieldLooseKey("originURL");

var _routes = AMIRouter_classPrivateFieldLooseKey("routes");

var _findThisJs = AMIRouter_classPrivateFieldLooseKey("findThisJs");

var _searchParamToDict = AMIRouter_classPrivateFieldLooseKey("searchParamToDict");

var _eatSlashes = AMIRouter_classPrivateFieldLooseKey("eatSlashes");

var _buildURL = AMIRouter_classPrivateFieldLooseKey("buildURL");

var _goto = AMIRouter_classPrivateFieldLooseKey("goto");

var AMIRouter = function () {
  function AMIRouter(_prodJsFilename, _devJsFilename) {
    Object.defineProperty(this, _goto, {
      value: _goto2
    });
    Object.defineProperty(this, _buildURL, {
      value: _buildURL2
    });
    Object.defineProperty(this, _eatSlashes, {
      value: _eatSlashes2
    });
    Object.defineProperty(this, _searchParamToDict, {
      value: _searchParamToDict2
    });
    Object.defineProperty(this, _findThisJs, {
      value: _findThisJs2
    });
    Object.defineProperty(this, _webAppURL, {
      writable: true,
      value: ''
    });
    Object.defineProperty(this, _webAppArgs, {
      writable: true,
      value: {}
    });
    Object.defineProperty(this, _webAppHash, {
      writable: true,
      value: ''
    });
    Object.defineProperty(this, _scriptURL, {
      writable: true,
      value: ''
    });
    Object.defineProperty(this, _scriptArgs, {
      writable: true,
      value: {}
    });
    Object.defineProperty(this, _scriptHash, {
      writable: true,
      value: ''
    });
    Object.defineProperty(this, _originURL, {
      writable: true,
      value: ''
    });
    Object.defineProperty(this, _routes, {
      writable: true,
      value: []
    });
    var webappUrl = new URL(window.location);

    var scriptUrl = AMIRouter_classPrivateFieldLooseBase(this, _findThisJs)[_findThisJs](_prodJsFilename, _devJsFilename);

    if (!scriptUrl) {
      throw "cannot find neither '" + _prodJsFilename + "' nor '" + _devJsFilename + "'";
    }

    AMIRouter_classPrivateFieldLooseBase(this, _webAppURL)[_webAppURL] = webappUrl.protocol === 'file:' ? "file://" + webappUrl.pathname : "" + webappUrl.origin + webappUrl.pathname;
    AMIRouter_classPrivateFieldLooseBase(this, _webAppArgs)[_webAppArgs] = AMIRouter_classPrivateFieldLooseBase(this, _searchParamToDict)[_searchParamToDict](webappUrl);
    AMIRouter_classPrivateFieldLooseBase(this, _webAppHash)[_webAppHash] = webappUrl.hash.substring(1);
    AMIRouter_classPrivateFieldLooseBase(this, _scriptURL)[_scriptURL] = scriptUrl.protocol === 'file:' ? "file://" + scriptUrl.pathname : "" + scriptUrl.origin + scriptUrl.pathname;
    AMIRouter_classPrivateFieldLooseBase(this, _scriptArgs)[_scriptArgs] = AMIRouter_classPrivateFieldLooseBase(this, _searchParamToDict)[_searchParamToDict](scriptUrl);
    AMIRouter_classPrivateFieldLooseBase(this, _scriptHash)[_scriptHash] = scriptUrl.hash.substring(1);
    var idx;

    if ((idx = AMIRouter_classPrivateFieldLooseBase(this, _scriptURL)[_scriptURL].indexOf(_prodJsFilename)) > 0) {
      AMIRouter_classPrivateFieldLooseBase(this, _originURL)[_originURL] = AMIRouter_classPrivateFieldLooseBase(this, _eatSlashes)[_eatSlashes](AMIRouter_classPrivateFieldLooseBase(this, _scriptURL)[_scriptURL].substring(0, idx));
    } else if ((idx = AMIRouter_classPrivateFieldLooseBase(this, _scriptURL)[_scriptURL].indexOf(_devJsFilename)) > 0) {
      AMIRouter_classPrivateFieldLooseBase(this, _originURL)[_originURL] = AMIRouter_classPrivateFieldLooseBase(this, _eatSlashes)[_eatSlashes](AMIRouter_classPrivateFieldLooseBase(this, _scriptURL)[_scriptURL].substring(0, idx));
    }
  }

  var _proto = AMIRouter.prototype;

  _proto.getWebAppURL = function getWebAppURL() {
    return AMIRouter_classPrivateFieldLooseBase(this, _webAppURL)[_webAppURL];
  };

  _proto.getWebAppArgs = function getWebAppArgs() {
    return AMIRouter_classPrivateFieldLooseBase(this, _webAppArgs)[_webAppArgs];
  };

  _proto.getWebAppHash = function getWebAppHash() {
    return AMIRouter_classPrivateFieldLooseBase(this, _webAppHash)[_webAppHash];
  };

  _proto.getScriptURL = function getScriptURL() {
    return AMIRouter_classPrivateFieldLooseBase(this, _scriptURL)[_scriptURL];
  };

  _proto.getScriptArgs = function getScriptArgs() {
    return AMIRouter_classPrivateFieldLooseBase(this, _scriptArgs)[_scriptArgs];
  };

  _proto.getWebappHash = function getWebappHash() {
    return AMIRouter_classPrivateFieldLooseBase(this, _scriptHash)[_scriptHash];
  };

  _proto.getOriginURL = function getOriginURL() {
    return AMIRouter_classPrivateFieldLooseBase(this, _originURL)[_originURL];
  };

  _proto.append = function append(regExp, callback) {
    AMIRouter_classPrivateFieldLooseBase(this, _routes)[_routes].unshift({
      regExp: regExp,
      callback: callback
    });

    return this;
  };

  _proto.remove = function remove(regExp) {
    AMIRouter_classPrivateFieldLooseBase(this, _routes)[_routes] = AMIRouter_classPrivateFieldLooseBase(this, _routes)[_routes].filter(function (route) {
      return route.regExp.toString() !== regExp.toString();
    });
    return this;
  };

  _proto.check = function check() {
    var m;

    for (var i = 0; i < AMIRouter_classPrivateFieldLooseBase(this, _routes)[_routes].length; i++) {
      m = AMIRouter_classPrivateFieldLooseBase(this, _webAppHash)[_webAppHash].match(AMIRouter_classPrivateFieldLooseBase(this, _routes)[_routes][i].regExp);

      if (m) {
        AMIRouter_classPrivateFieldLooseBase(this, _routes)[_routes][i].callback.apply(this, m);

        return true;
      }
    }

    return false;
  };

  _proto.appendHistoryEntry = function appendHistoryEntry(options) {
    if (history.pushState) {
      var _tools$setup = setup(['context', 'searchParams', 'hash'], [{}, {}, null], options),
          context = _tools$setup[0],
          searchParams = _tools$setup[1],
          hash = _tools$setup[2];

      var url = AMIRouter_classPrivateFieldLooseBase(this, _buildURL)[_buildURL](searchParams, hash);

      if (window.location !== url.toString()) {
        history.pushState(context, null, url.toString());
      }

      AMIRouter_classPrivateFieldLooseBase(this, _goto)[_goto](url.hash);

      return true;
    }

    return false;
  };

  _proto.replaceHistoryEntry = function replaceHistoryEntry(options) {
    if (history.replaceState) {
      var _tools$setup2 = setup(['context', 'searchParams', 'hash'], [{}, {}, null], options),
          context = _tools$setup2[0],
          searchParams = _tools$setup2[1],
          hash = _tools$setup2[2];

      var url = AMIRouter_classPrivateFieldLooseBase(this, _buildURL)[_buildURL](searchParams, hash);

      if (window.location !== url.toString()) {
        history.replaceState(context, null, url.toString());
      }

      AMIRouter_classPrivateFieldLooseBase(this, _goto)[_goto](url.hash);

      return true;
    }

    return false;
  };

  return AMIRouter;
}();

function _findThisJs2(prodJsFilename, devJsFilename) {
  var scripts = document.getElementsByTagName('script');

  for (var i = 0; i < scripts.length; i++) {
    try {
      var url = new URL(scripts[i].src);

      if (url.pathname.endsWith(prodJsFilename) > 0 || url.pathname.endsWith(devJsFilename) > 0) {
        return url;
      }
    } catch (e) {}
  }

  return null;
}

function _searchParamToDict2(url) {
  var result = {};

  for (var _iterator = _createForOfIteratorHelperLoose(url.searchParams.entries()), _step; !(_step = _iterator()).done;) {
    var _step$value = _step.value,
        key = _step$value[0],
        val = _step$value[1];
    result[key] = val;
  }

  return result;
}

function _eatSlashes2(url) {
  url = url.trim();

  while (url[url.length - 1] === '/') {
    url = url.substring(0, url.length - 1);
  }

  return url;
}

function _buildURL2(searchParams, hash) {
  var result = new URL(AMIRouter_classPrivateFieldLooseBase(this, _webAppURL)[_webAppURL]);

  for (var _i = 0, _Object$entries = Object.entries(searchParams); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _Object$entries[_i],
        name = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    if (typeof value === 'string') {
      result.searchParams.set(name, value);
    }
  }

  if (hash) {
    result.hash = hash;
  }

  return result;
}

function _goto2(hash) {
  if (hash) {
    setTimeout(function () {
      var el = $(hash);

      if (el.length > 0) {
        $(document).scrollTop(el.offset().top);
      }
    }, 1000);
  }
}

/* harmony default export */ const js_AMIRouter = (new AMIRouter('js/ami.min.js', 'js/ami.js'));
;// CONCATENATED MODULE: ./src/js/utilities/locks.js


function _throwError() {
  throw Error();
}

function getStack() {
  try {
    _throwError();
  } catch (e1) {
    try {
      return e1.stack;
    } catch (e2) {
      return '';
    }
  }
}
var _curLockCnt = 0;
var _tmpLockCnt = 0;
function lock() {
  var lines = getStack().split('\n');

  if (lines.length > 3) {
    console.log("lock[" + _curLockCnt + "] :: " + lines[3]);
  }

  if (_curLockCnt <= 0) {
    $('#ami_locker').css('display', 'flex');
    _curLockCnt = 1;
  } else {
    _curLockCnt++;
  }
}
function unlock() {
  if (_curLockCnt <= 1) {
    $('#ami_locker').css('display', 'none');
    _curLockCnt = 0;
  } else {
    _curLockCnt--;
  }

  var lines = getStack().split('\n');

  if (lines.length > 3) {
    console.log("unlock[" + _curLockCnt + "] :: " + lines[3]);
  }
}
function modalLeave() {
  var lines = getStack().split('\n');

  if (lines.length > 2) {
    console.log("modalLock[" + _curLockCnt + "] :: " + lines[2]);
  }

  _curLockCnt = _tmpLockCnt;

  if (_curLockCnt > 0) {
    $('#ami_locker').css('display', 'flex');
  }
}
function modalEnter() {
  _tmpLockCnt = _curLockCnt;

  if (_curLockCnt > 0) {
    $('#ami_locker').css('display', 'none');
  }

  var lines = getStack().split('\n');

  if (lines.length > 2) {
    console.log("modalUnlock[" + _curLockCnt + "] :: " + lines[2]);
  }
}
var _canLeave = true;
function canLeave(canLeave) {
  _canLeave = canLeave;
}
;// CONCATENATED MODULE: ./src/js/utilities/strings.js



function base64Encode(s) {
  return btoa(encodeURIComponent(s || '').replace(/%([0-9A-F]{2})/g, function (_, $1) {
    return String.fromCharCode(parseInt($1, 16));
  })).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
}
function base64Decode(s) {
  return decodeURIComponent(atob((s || '').replace(/-/g, '+').replace(/_/g, '/')).split('').map(function (c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
var _replace = ami_twig/* default.stdlib._replace */.Z.stdlib._replace;
var _textToHtmlX = ['&', '"', '<', '>'];
var _textToHtmlY = ['&amp;', '&quot;', '&lt;', '&gt;'];
function textToHtml(s) {
  return _replace(s || '', _textToHtmlX, _textToHtmlY);
}
function htmlToText(s) {
  return _replace(s || '', _textToHtmlY, _textToHtmlX);
}
var _textToStringX = ['\\', '\r', '\n', '"', '\''];
var _textToStringY = ['\\\\', '\\r', '\\n', '\\"', '\\\''];
function textToString(s) {
  return _replace(s || '', _textToStringX, _textToStringY);
}
function stringToText(s) {
  return _replace(s || '', _textToStringY, _textToStringX);
}
var _htmlToStringX = ['\\', '\r', '\n', '&quot;', '\''];
var _htmlToStringY = ['\\\\', '\\r', '\\n', '\\&quot;', '\\\''];
function htmlToString(s) {
  return _replace(s || '', _htmlToStringX, _htmlToStringY);
}
function stringToHtml(s) {
  return _replace(s || '', _htmlToStringY, _htmlToStringX);
}
var _textToSQLX = ['\''];
var _textToSQLY = ['\'\''];
function textToSQL(s) {
  return _replace(s || '', _textToSQLX, _textToSQLY);
}
function sqlToText(s) {
  return _replace(s || '', _textToSQLY, _textToSQLX);
}
// EXTERNAL MODULE: ./src/twigs/message.twig
var twigs_message = __webpack_require__(3988);
;// CONCATENATED MODULE: ./src/js/utilities/messages.js






var _linkExp = /\[\s*([^\s\]]*)\s*]\(\s*([^\s)]*)\s*\)/g;

function _publishAlert(clazz, title, message, fadeOut) {
  if (Array.isArray(message)) {
    message = message.map(function (MESSAGE) {
      return (MESSAGE || '').toString();
    }).join('. ');
  } else {
    message = (message || '').toString();
  }

  var hash = message.hashCode();
  var date = moment().format('DD MMM, HH:mm:ss');
  var toast = $("#ami_alert_content > .toast[data-ami-hash=\"" + hash + "\"]");

  if (toast.length === 0) {
    var html = formatTWIG(twigs_message, {
      date: date,
      hash: hash,
      clazz: clazz,
      title: title,
      fadeOut: fadeOut,
      message: message
    });
    $('#ami_alert_content').append(html.replace(_linkExp, '<a href="$1" target="_blank">$2</a>')).promise().done(function () {
      $("#ami_alert_content > .toast[data-ami-hash=\"" + hash + "\"]").toast('show');
    });
  } else {
    toast.find('.toast-header > strong').html(textToHtml(title) + (" <span class=\"badge badge-" + clazz + "\">" + toast.attr('data-ami-cnt', parseInt(toast.attr('data-ami-cnt')) + 1).attr('data-ami-cnt') + "</span>"));
    toast.find('.toast-header > small').html(textToHtml(date));
    toast.toast('show');
  }

  console.log("AMI :: " + title.toUpperCase() + ": " + message + "\n" + getStack());
  $(document).scrollTop(0);
  unlock();
}

function info(message, fadeOut) {
  _publishAlert('info', 'Info', message, fadeOut);
}
function success(message, fadeOut) {
  _publishAlert('success', 'Success', message, fadeOut);
}
function warning(message, fadeOut) {
  _publishAlert('warning', 'Warning', message, fadeOut);
}
function error(message, fadeOut) {
  _publishAlert('danger', 'Error', message, fadeOut);
}
function flush() {
  $('#ami_alert_content').empty();
}
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(3379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(7795);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(569);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(3565);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(9216);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(4589);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[4].use[2]!./node_modules/flatpickr/dist/flatpickr.min.css
var flatpickr_min = __webpack_require__(8001);
;// CONCATENATED MODULE: ./node_modules/flatpickr/dist/flatpickr.min.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(flatpickr_min/* default */.Z, options);




       /* harmony default export */ const dist_flatpickr_min = (flatpickr_min/* default */.Z && flatpickr_min/* default.locals */.Z.locals ? flatpickr_min/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./node_modules/flatpickr/dist/esm/types/options.js
const HOOKS = [
    "onChange",
    "onClose",
    "onDayCreate",
    "onDestroy",
    "onKeyDown",
    "onMonthChange",
    "onOpen",
    "onParseConfig",
    "onReady",
    "onValueUpdate",
    "onYearChange",
    "onPreCalendarPosition",
];
const defaults = {
    _disable: [],
    allowInput: false,
    allowInvalidPreload: false,
    altFormat: "F j, Y",
    altInput: false,
    altInputClass: "form-control input",
    animate: typeof window === "object" &&
        window.navigator.userAgent.indexOf("MSIE") === -1,
    ariaDateFormat: "F j, Y",
    autoFillDefaultTime: true,
    clickOpens: true,
    closeOnSelect: true,
    conjunction: ", ",
    dateFormat: "Y-m-d",
    defaultHour: 12,
    defaultMinute: 0,
    defaultSeconds: 0,
    disable: [],
    disableMobile: false,
    enableSeconds: false,
    enableTime: false,
    errorHandler: (err) => typeof console !== "undefined" && console.warn(err),
    getWeek: (givenDate) => {
        const date = new Date(givenDate.getTime());
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
        var week1 = new Date(date.getFullYear(), 0, 4);
        return (1 +
            Math.round(((date.getTime() - week1.getTime()) / 86400000 -
                3 +
                ((week1.getDay() + 6) % 7)) /
                7));
    },
    hourIncrement: 1,
    ignoredFocusElements: [],
    inline: false,
    locale: "default",
    minuteIncrement: 5,
    mode: "single",
    monthSelectorType: "dropdown",
    nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
    noCalendar: false,
    now: new Date(),
    onChange: [],
    onClose: [],
    onDayCreate: [],
    onDestroy: [],
    onKeyDown: [],
    onMonthChange: [],
    onOpen: [],
    onParseConfig: [],
    onReady: [],
    onValueUpdate: [],
    onYearChange: [],
    onPreCalendarPosition: [],
    plugins: [],
    position: "auto",
    positionElement: undefined,
    prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
    shorthandCurrentMonth: false,
    showMonths: 1,
    static: false,
    time_24hr: false,
    weekNumbers: false,
    wrap: false,
};

;// CONCATENATED MODULE: ./node_modules/flatpickr/dist/esm/l10n/default.js
const english = {
    weekdays: {
        shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        longhand: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
    },
    months: {
        shorthand: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        longhand: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
    },
    daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    firstDayOfWeek: 0,
    ordinal: (nth) => {
        const s = nth % 100;
        if (s > 3 && s < 21)
            return "th";
        switch (s % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    },
    rangeSeparator: " to ",
    weekAbbreviation: "Wk",
    scrollTitle: "Scroll to increment",
    toggleTitle: "Click to toggle",
    amPM: ["AM", "PM"],
    yearAriaLabel: "Year",
    monthAriaLabel: "Month",
    hourAriaLabel: "Hour",
    minuteAriaLabel: "Minute",
    time_24hr: false,
};
/* harmony default export */ const l10n_default = (english);

;// CONCATENATED MODULE: ./node_modules/flatpickr/dist/esm/utils/index.js
const pad = (number, length = 2) => `000${number}`.slice(length * -1);
const utils_int = (bool) => (bool === true ? 1 : 0);
function debounce(fn, wait) {
    let t;
    return function () {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, arguments), wait);
    };
}
const arrayify = (obj) => obj instanceof Array ? obj : [obj];

;// CONCATENATED MODULE: ./node_modules/flatpickr/dist/esm/utils/dom.js
function toggleClass(elem, className, bool) {
    if (bool === true)
        return elem.classList.add(className);
    elem.classList.remove(className);
}
function createElement(tag, className, content) {
    const e = window.document.createElement(tag);
    className = className || "";
    content = content || "";
    e.className = className;
    if (content !== undefined)
        e.textContent = content;
    return e;
}
function clearNode(node) {
    while (node.firstChild)
        node.removeChild(node.firstChild);
}
function findParent(node, condition) {
    if (condition(node))
        return node;
    else if (node.parentNode)
        return findParent(node.parentNode, condition);
    return undefined;
}
function createNumberInput(inputClassName, opts) {
    const wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
    if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
        numInput.type = "number";
    }
    else {
        numInput.type = "text";
        numInput.pattern = "\\d*";
    }
    if (opts !== undefined)
        for (const key in opts)
            numInput.setAttribute(key, opts[key]);
    wrapper.appendChild(numInput);
    wrapper.appendChild(arrowUp);
    wrapper.appendChild(arrowDown);
    return wrapper;
}
function getEventTarget(event) {
    try {
        if (typeof event.composedPath === "function") {
            const path = event.composedPath();
            return path[0];
        }
        return event.target;
    }
    catch (error) {
        return event.target;
    }
}

;// CONCATENATED MODULE: ./node_modules/flatpickr/dist/esm/utils/formatting.js

const doNothing = () => undefined;
const monthToStr = (monthNumber, shorthand, locale) => locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];
const revFormat = {
    D: doNothing,
    F: function (dateObj, monthName, locale) {
        dateObj.setMonth(locale.months.longhand.indexOf(monthName));
    },
    G: (dateObj, hour) => {
        dateObj.setHours(parseFloat(hour));
    },
    H: (dateObj, hour) => {
        dateObj.setHours(parseFloat(hour));
    },
    J: (dateObj, day) => {
        dateObj.setDate(parseFloat(day));
    },
    K: (dateObj, amPM, locale) => {
        dateObj.setHours((dateObj.getHours() % 12) +
            12 * utils_int(new RegExp(locale.amPM[1], "i").test(amPM)));
    },
    M: function (dateObj, shortMonth, locale) {
        dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
    },
    S: (dateObj, seconds) => {
        dateObj.setSeconds(parseFloat(seconds));
    },
    U: (_, unixSeconds) => new Date(parseFloat(unixSeconds) * 1000),
    W: function (dateObj, weekNum, locale) {
        const weekNumber = parseInt(weekNum);
        const date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
        date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
        return date;
    },
    Y: (dateObj, year) => {
        dateObj.setFullYear(parseFloat(year));
    },
    Z: (_, ISODate) => new Date(ISODate),
    d: (dateObj, day) => {
        dateObj.setDate(parseFloat(day));
    },
    h: (dateObj, hour) => {
        dateObj.setHours(parseFloat(hour));
    },
    i: (dateObj, minutes) => {
        dateObj.setMinutes(parseFloat(minutes));
    },
    j: (dateObj, day) => {
        dateObj.setDate(parseFloat(day));
    },
    l: doNothing,
    m: (dateObj, month) => {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    n: (dateObj, month) => {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    s: (dateObj, seconds) => {
        dateObj.setSeconds(parseFloat(seconds));
    },
    u: (_, unixMillSeconds) => new Date(parseFloat(unixMillSeconds)),
    w: doNothing,
    y: (dateObj, year) => {
        dateObj.setFullYear(2000 + parseFloat(year));
    },
};
const tokenRegex = {
    D: "(\\w+)",
    F: "(\\w+)",
    G: "(\\d\\d|\\d)",
    H: "(\\d\\d|\\d)",
    J: "(\\d\\d|\\d)\\w+",
    K: "",
    M: "(\\w+)",
    S: "(\\d\\d|\\d)",
    U: "(.+)",
    W: "(\\d\\d|\\d)",
    Y: "(\\d{4})",
    Z: "(.+)",
    d: "(\\d\\d|\\d)",
    h: "(\\d\\d|\\d)",
    i: "(\\d\\d|\\d)",
    j: "(\\d\\d|\\d)",
    l: "(\\w+)",
    m: "(\\d\\d|\\d)",
    n: "(\\d\\d|\\d)",
    s: "(\\d\\d|\\d)",
    u: "(.+)",
    w: "(\\d\\d|\\d)",
    y: "(\\d{2})",
};
const formats = {
    Z: (date) => date.toISOString(),
    D: function (date, locale, options) {
        return locale.weekdays.shorthand[formats.w(date, locale, options)];
    },
    F: function (date, locale, options) {
        return monthToStr(formats.n(date, locale, options) - 1, false, locale);
    },
    G: function (date, locale, options) {
        return pad(formats.h(date, locale, options));
    },
    H: (date) => pad(date.getHours()),
    J: function (date, locale) {
        return locale.ordinal !== undefined
            ? date.getDate() + locale.ordinal(date.getDate())
            : date.getDate();
    },
    K: (date, locale) => locale.amPM[utils_int(date.getHours() > 11)],
    M: function (date, locale) {
        return monthToStr(date.getMonth(), true, locale);
    },
    S: (date) => pad(date.getSeconds()),
    U: (date) => date.getTime() / 1000,
    W: function (date, _, options) {
        return options.getWeek(date);
    },
    Y: (date) => pad(date.getFullYear(), 4),
    d: (date) => pad(date.getDate()),
    h: (date) => (date.getHours() % 12 ? date.getHours() % 12 : 12),
    i: (date) => pad(date.getMinutes()),
    j: (date) => date.getDate(),
    l: function (date, locale) {
        return locale.weekdays.longhand[date.getDay()];
    },
    m: (date) => pad(date.getMonth() + 1),
    n: (date) => date.getMonth() + 1,
    s: (date) => date.getSeconds(),
    u: (date) => date.getTime(),
    w: (date) => date.getDay(),
    y: (date) => String(date.getFullYear()).substring(2),
};

;// CONCATENATED MODULE: ./node_modules/flatpickr/dist/esm/utils/dates.js



const createDateFormatter = ({ config = defaults, l10n = english, isMobile = false, }) => (dateObj, frmt, overrideLocale) => {
    const locale = overrideLocale || l10n;
    if (config.formatDate !== undefined && !isMobile) {
        return config.formatDate(dateObj, frmt, locale);
    }
    return frmt
        .split("")
        .map((c, i, arr) => formats[c] && arr[i - 1] !== "\\"
        ? formats[c](dateObj, locale, config)
        : c !== "\\"
            ? c
            : "")
        .join("");
};
const createDateParser = ({ config = defaults, l10n = english }) => (date, givenFormat, timeless, customLocale) => {
    if (date !== 0 && !date)
        return undefined;
    const locale = customLocale || l10n;
    let parsedDate;
    const dateOrig = date;
    if (date instanceof Date)
        parsedDate = new Date(date.getTime());
    else if (typeof date !== "string" &&
        date.toFixed !== undefined)
        parsedDate = new Date(date);
    else if (typeof date === "string") {
        const format = givenFormat || (config || defaults).dateFormat;
        const datestr = String(date).trim();
        if (datestr === "today") {
            parsedDate = new Date();
            timeless = true;
        }
        else if (/Z$/.test(datestr) ||
            /GMT$/.test(datestr))
            parsedDate = new Date(date);
        else if (config && config.parseDate)
            parsedDate = config.parseDate(date, format);
        else {
            parsedDate =
                !config || !config.noCalendar
                    ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                    : new Date(new Date().setHours(0, 0, 0, 0));
            let matched, ops = [];
            for (let i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                const token = format[i];
                const isBackSlash = token === "\\";
                const escaped = format[i - 1] === "\\" || isBackSlash;
                if (tokenRegex[token] && !escaped) {
                    regexStr += tokenRegex[token];
                    const match = new RegExp(regexStr).exec(date);
                    if (match && (matched = true)) {
                        ops[token !== "Y" ? "push" : "unshift"]({
                            fn: revFormat[token],
                            val: match[++matchIndex],
                        });
                    }
                }
                else if (!isBackSlash)
                    regexStr += ".";
                ops.forEach(({ fn, val }) => (parsedDate = fn(parsedDate, val, locale) || parsedDate));
            }
            parsedDate = matched ? parsedDate : undefined;
        }
    }
    if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
        config.errorHandler(new Error(`Invalid date provided: ${dateOrig}`));
        return undefined;
    }
    if (timeless === true)
        parsedDate.setHours(0, 0, 0, 0);
    return parsedDate;
};
function compareDates(date1, date2, timeless = true) {
    if (timeless !== false) {
        return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
            new Date(date2.getTime()).setHours(0, 0, 0, 0));
    }
    return date1.getTime() - date2.getTime();
}
function compareTimes(date1, date2) {
    return (3600 * (date1.getHours() - date2.getHours()) +
        60 * (date1.getMinutes() - date2.getMinutes()) +
        date1.getSeconds() -
        date2.getSeconds());
}
const isBetween = (ts, ts1, ts2) => {
    return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
};
const duration = {
    DAY: 86400000,
};
function getDefaultHours(config) {
    let hours = config.defaultHour;
    let minutes = config.defaultMinute;
    let seconds = config.defaultSeconds;
    if (config.minDate !== undefined) {
        const minHour = config.minDate.getHours();
        const minMinutes = config.minDate.getMinutes();
        const minSeconds = config.minDate.getSeconds();
        if (hours < minHour) {
            hours = minHour;
        }
        if (hours === minHour && minutes < minMinutes) {
            minutes = minMinutes;
        }
        if (hours === minHour && minutes === minMinutes && seconds < minSeconds)
            seconds = config.minDate.getSeconds();
    }
    if (config.maxDate !== undefined) {
        const maxHr = config.maxDate.getHours();
        const maxMinutes = config.maxDate.getMinutes();
        hours = Math.min(hours, maxHr);
        if (hours === maxHr)
            minutes = Math.min(maxMinutes, minutes);
        if (hours === maxHr && minutes === maxMinutes)
            seconds = config.maxDate.getSeconds();
    }
    return { hours, minutes, seconds };
}

// EXTERNAL MODULE: ./node_modules/flatpickr/dist/esm/utils/polyfills.js
var polyfills = __webpack_require__(1895);
;// CONCATENATED MODULE: ./node_modules/flatpickr/dist/esm/index.js







const DEBOUNCED_CHANGE_MS = 300;
function FlatpickrInstance(element, instanceConfig) {
    const self = {
        config: Object.assign(Object.assign({}, defaults), flatpickr.defaultConfig),
        l10n: l10n_default,
    };
    self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
    self._handlers = [];
    self.pluginElements = [];
    self.loadedPlugins = [];
    self._bind = bind;
    self._setHoursFromDate = setHoursFromDate;
    self._positionCalendar = positionCalendar;
    self.changeMonth = changeMonth;
    self.changeYear = changeYear;
    self.clear = clear;
    self.close = close;
    self._createElement = createElement;
    self.destroy = destroy;
    self.isEnabled = isEnabled;
    self.jumpToDate = jumpToDate;
    self.open = open;
    self.redraw = redraw;
    self.set = set;
    self.setDate = setDate;
    self.toggle = toggle;
    function setupHelperFunctions() {
        self.utils = {
            getDaysInMonth(month = self.currentMonth, yr = self.currentYear) {
                if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                    return 29;
                return self.l10n.daysInMonth[month];
            },
        };
    }
    function init() {
        self.element = self.input = element;
        self.isOpen = false;
        parseConfig();
        setupLocale();
        setupInputs();
        setupDates();
        setupHelperFunctions();
        if (!self.isMobile)
            build();
        bindEvents();
        if (self.selectedDates.length || self.config.noCalendar) {
            if (self.config.enableTime) {
                setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj : undefined);
            }
            updateValue(false);
        }
        setCalendarWidth();
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (!self.isMobile && isSafari) {
            positionCalendar();
        }
        triggerEvent("onReady");
    }
    function bindToInstance(fn) {
        return fn.bind(self);
    }
    function setCalendarWidth() {
        const config = self.config;
        if (config.weekNumbers === false && config.showMonths === 1) {
            return;
        }
        else if (config.noCalendar !== true) {
            window.requestAnimationFrame(function () {
                if (self.calendarContainer !== undefined) {
                    self.calendarContainer.style.visibility = "hidden";
                    self.calendarContainer.style.display = "block";
                }
                if (self.daysContainer !== undefined) {
                    const daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
                    self.daysContainer.style.width = daysWidth + "px";
                    self.calendarContainer.style.width =
                        daysWidth +
                            (self.weekWrapper !== undefined
                                ? self.weekWrapper.offsetWidth
                                : 0) +
                            "px";
                    self.calendarContainer.style.removeProperty("visibility");
                    self.calendarContainer.style.removeProperty("display");
                }
            });
        }
    }
    function updateTime(e) {
        if (self.selectedDates.length === 0) {
            const defaultDate = self.config.minDate === undefined ||
                compareDates(new Date(), self.config.minDate) >= 0
                ? new Date()
                : new Date(self.config.minDate.getTime());
            const defaults = getDefaultHours(self.config);
            defaultDate.setHours(defaults.hours, defaults.minutes, defaults.seconds, defaultDate.getMilliseconds());
            self.selectedDates = [defaultDate];
            self.latestSelectedDateObj = defaultDate;
        }
        if (e !== undefined && e.type !== "blur") {
            timeWrapper(e);
        }
        const prevValue = self._input.value;
        setHoursFromInputs();
        updateValue();
        if (self._input.value !== prevValue) {
            self._debouncedChange();
        }
    }
    function ampm2military(hour, amPM) {
        return (hour % 12) + 12 * utils_int(amPM === self.l10n.amPM[1]);
    }
    function military2ampm(hour) {
        switch (hour % 24) {
            case 0:
            case 12:
                return 12;
            default:
                return hour % 12;
        }
    }
    function setHoursFromInputs() {
        if (self.hourElement === undefined || self.minuteElement === undefined)
            return;
        let hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
            ? (parseInt(self.secondElement.value, 10) || 0) % 60
            : 0;
        if (self.amPM !== undefined) {
            hours = ampm2military(hours, self.amPM.textContent);
        }
        const limitMinHours = self.config.minTime !== undefined ||
            (self.config.minDate &&
                self.minDateHasTime &&
                self.latestSelectedDateObj &&
                compareDates(self.latestSelectedDateObj, self.config.minDate, true) ===
                    0);
        const limitMaxHours = self.config.maxTime !== undefined ||
            (self.config.maxDate &&
                self.maxDateHasTime &&
                self.latestSelectedDateObj &&
                compareDates(self.latestSelectedDateObj, self.config.maxDate, true) ===
                    0);
        if (limitMaxHours) {
            const maxTime = self.config.maxTime !== undefined
                ? self.config.maxTime
                : self.config.maxDate;
            hours = Math.min(hours, maxTime.getHours());
            if (hours === maxTime.getHours())
                minutes = Math.min(minutes, maxTime.getMinutes());
            if (minutes === maxTime.getMinutes())
                seconds = Math.min(seconds, maxTime.getSeconds());
        }
        if (limitMinHours) {
            const minTime = self.config.minTime !== undefined
                ? self.config.minTime
                : self.config.minDate;
            hours = Math.max(hours, minTime.getHours());
            if (hours === minTime.getHours() && minutes < minTime.getMinutes())
                minutes = minTime.getMinutes();
            if (minutes === minTime.getMinutes())
                seconds = Math.max(seconds, minTime.getSeconds());
        }
        setHours(hours, minutes, seconds);
    }
    function setHoursFromDate(dateObj) {
        const date = dateObj || self.latestSelectedDateObj;
        if (date) {
            setHours(date.getHours(), date.getMinutes(), date.getSeconds());
        }
    }
    function setHours(hours, minutes, seconds) {
        if (self.latestSelectedDateObj !== undefined) {
            self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
        }
        if (!self.hourElement || !self.minuteElement || self.isMobile)
            return;
        self.hourElement.value = pad(!self.config.time_24hr
            ? ((12 + hours) % 12) + 12 * utils_int(hours % 12 === 0)
            : hours);
        self.minuteElement.value = pad(minutes);
        if (self.amPM !== undefined)
            self.amPM.textContent = self.l10n.amPM[utils_int(hours >= 12)];
        if (self.secondElement !== undefined)
            self.secondElement.value = pad(seconds);
    }
    function onYearInput(event) {
        const eventTarget = getEventTarget(event);
        const year = parseInt(eventTarget.value) + (event.delta || 0);
        if (year / 1000 > 1 ||
            (event.key === "Enter" && !/[^\d]/.test(year.toString()))) {
            changeYear(year);
        }
    }
    function bind(element, event, handler, options) {
        if (event instanceof Array)
            return event.forEach((ev) => bind(element, ev, handler, options));
        if (element instanceof Array)
            return element.forEach((el) => bind(el, event, handler, options));
        element.addEventListener(event, handler, options);
        self._handlers.push({
            remove: () => element.removeEventListener(event, handler),
        });
    }
    function triggerChange() {
        triggerEvent("onChange");
    }
    function bindEvents() {
        if (self.config.wrap) {
            ["open", "close", "toggle", "clear"].forEach((evt) => {
                Array.prototype.forEach.call(self.element.querySelectorAll(`[data-${evt}]`), (el) => bind(el, "click", self[evt]));
            });
        }
        if (self.isMobile) {
            setupMobile();
            return;
        }
        const debouncedResize = debounce(onResize, 50);
        self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
        if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
            bind(self.daysContainer, "mouseover", (e) => {
                if (self.config.mode === "range")
                    onMouseOver(getEventTarget(e));
            });
        bind(window.document.body, "keydown", onKeyDown);
        if (!self.config.inline && !self.config.static)
            bind(window, "resize", debouncedResize);
        if (window.ontouchstart !== undefined)
            bind(window.document, "touchstart", documentClick);
        else
            bind(window.document, "mousedown", documentClick);
        bind(window.document, "focus", documentClick, { capture: true });
        if (self.config.clickOpens === true) {
            bind(self._input, "focus", self.open);
            bind(self._input, "click", self.open);
        }
        if (self.daysContainer !== undefined) {
            bind(self.monthNav, "click", onMonthNavClick);
            bind(self.monthNav, ["keyup", "increment"], onYearInput);
            bind(self.daysContainer, "click", selectDate);
        }
        if (self.timeContainer !== undefined &&
            self.minuteElement !== undefined &&
            self.hourElement !== undefined) {
            const selText = (e) => getEventTarget(e).select();
            bind(self.timeContainer, ["increment"], updateTime);
            bind(self.timeContainer, "blur", updateTime, { capture: true });
            bind(self.timeContainer, "click", timeIncrement);
            bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
            if (self.secondElement !== undefined)
                bind(self.secondElement, "focus", () => self.secondElement && self.secondElement.select());
            if (self.amPM !== undefined) {
                bind(self.amPM, "click", (e) => {
                    updateTime(e);
                    triggerChange();
                });
            }
        }
        if (self.config.allowInput) {
            bind(self._input, "blur", onBlur);
        }
    }
    function jumpToDate(jumpDate, triggerChange) {
        const jumpTo = jumpDate !== undefined
            ? self.parseDate(jumpDate)
            : self.latestSelectedDateObj ||
                (self.config.minDate && self.config.minDate > self.now
                    ? self.config.minDate
                    : self.config.maxDate && self.config.maxDate < self.now
                        ? self.config.maxDate
                        : self.now);
        const oldYear = self.currentYear;
        const oldMonth = self.currentMonth;
        try {
            if (jumpTo !== undefined) {
                self.currentYear = jumpTo.getFullYear();
                self.currentMonth = jumpTo.getMonth();
            }
        }
        catch (e) {
            e.message = "Invalid date supplied: " + jumpTo;
            self.config.errorHandler(e);
        }
        if (triggerChange && self.currentYear !== oldYear) {
            triggerEvent("onYearChange");
            buildMonthSwitch();
        }
        if (triggerChange &&
            (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
            triggerEvent("onMonthChange");
        }
        self.redraw();
    }
    function timeIncrement(e) {
        const eventTarget = getEventTarget(e);
        if (~eventTarget.className.indexOf("arrow"))
            incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
    }
    function incrementNumInput(e, delta, inputElem) {
        const target = e && getEventTarget(e);
        const input = inputElem ||
            (target && target.parentNode && target.parentNode.firstChild);
        const event = createEvent("increment");
        event.delta = delta;
        input && input.dispatchEvent(event);
    }
    function build() {
        const fragment = window.document.createDocumentFragment();
        self.calendarContainer = createElement("div", "flatpickr-calendar");
        self.calendarContainer.tabIndex = -1;
        if (!self.config.noCalendar) {
            fragment.appendChild(buildMonthNav());
            self.innerContainer = createElement("div", "flatpickr-innerContainer");
            if (self.config.weekNumbers) {
                const { weekWrapper, weekNumbers } = buildWeeks();
                self.innerContainer.appendChild(weekWrapper);
                self.weekNumbers = weekNumbers;
                self.weekWrapper = weekWrapper;
            }
            self.rContainer = createElement("div", "flatpickr-rContainer");
            self.rContainer.appendChild(buildWeekdays());
            if (!self.daysContainer) {
                self.daysContainer = createElement("div", "flatpickr-days");
                self.daysContainer.tabIndex = -1;
            }
            buildDays();
            self.rContainer.appendChild(self.daysContainer);
            self.innerContainer.appendChild(self.rContainer);
            fragment.appendChild(self.innerContainer);
        }
        if (self.config.enableTime) {
            fragment.appendChild(buildTime());
        }
        toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
        toggleClass(self.calendarContainer, "animate", self.config.animate === true);
        toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
        self.calendarContainer.appendChild(fragment);
        const customAppend = self.config.appendTo !== undefined &&
            self.config.appendTo.nodeType !== undefined;
        if (self.config.inline || self.config.static) {
            self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
            if (self.config.inline) {
                if (!customAppend && self.element.parentNode)
                    self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                else if (self.config.appendTo !== undefined)
                    self.config.appendTo.appendChild(self.calendarContainer);
            }
            if (self.config.static) {
                const wrapper = createElement("div", "flatpickr-wrapper");
                if (self.element.parentNode)
                    self.element.parentNode.insertBefore(wrapper, self.element);
                wrapper.appendChild(self.element);
                if (self.altInput)
                    wrapper.appendChild(self.altInput);
                wrapper.appendChild(self.calendarContainer);
            }
        }
        if (!self.config.static && !self.config.inline)
            (self.config.appendTo !== undefined
                ? self.config.appendTo
                : window.document.body).appendChild(self.calendarContainer);
    }
    function createDay(className, date, dayNumber, i) {
        const dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
        dayElement.dateObj = date;
        dayElement.$i = i;
        dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
        if (className.indexOf("hidden") === -1 &&
            compareDates(date, self.now) === 0) {
            self.todayDateElem = dayElement;
            dayElement.classList.add("today");
            dayElement.setAttribute("aria-current", "date");
        }
        if (dateIsEnabled) {
            dayElement.tabIndex = -1;
            if (isDateSelected(date)) {
                dayElement.classList.add("selected");
                self.selectedDateElem = dayElement;
                if (self.config.mode === "range") {
                    toggleClass(dayElement, "startRange", self.selectedDates[0] &&
                        compareDates(date, self.selectedDates[0], true) === 0);
                    toggleClass(dayElement, "endRange", self.selectedDates[1] &&
                        compareDates(date, self.selectedDates[1], true) === 0);
                    if (className === "nextMonthDay")
                        dayElement.classList.add("inRange");
                }
            }
        }
        else {
            dayElement.classList.add("flatpickr-disabled");
        }
        if (self.config.mode === "range") {
            if (isDateInRange(date) && !isDateSelected(date))
                dayElement.classList.add("inRange");
        }
        if (self.weekNumbers &&
            self.config.showMonths === 1 &&
            className !== "prevMonthDay" &&
            dayNumber % 7 === 1) {
            self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
        }
        triggerEvent("onDayCreate", dayElement);
        return dayElement;
    }
    function focusOnDayElem(targetNode) {
        targetNode.focus();
        if (self.config.mode === "range")
            onMouseOver(targetNode);
    }
    function getFirstAvailableDay(delta) {
        const startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
        const endMonth = delta > 0 ? self.config.showMonths : -1;
        for (let m = startMonth; m != endMonth; m += delta) {
            const month = self.daysContainer.children[m];
            const startIndex = delta > 0 ? 0 : month.children.length - 1;
            const endIndex = delta > 0 ? month.children.length : -1;
            for (let i = startIndex; i != endIndex; i += delta) {
                const c = month.children[i];
                if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
                    return c;
            }
        }
        return undefined;
    }
    function getNextAvailableDay(current, delta) {
        const givenMonth = current.className.indexOf("Month") === -1
            ? current.dateObj.getMonth()
            : self.currentMonth;
        const endMonth = delta > 0 ? self.config.showMonths : -1;
        const loopDelta = delta > 0 ? 1 : -1;
        for (let m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
            const month = self.daysContainer.children[m];
            const startIndex = givenMonth - self.currentMonth === m
                ? current.$i + delta
                : delta < 0
                    ? month.children.length - 1
                    : 0;
            const numMonthDays = month.children.length;
            for (let i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
                const c = month.children[i];
                if (c.className.indexOf("hidden") === -1 &&
                    isEnabled(c.dateObj) &&
                    Math.abs(current.$i - i) >= Math.abs(delta))
                    return focusOnDayElem(c);
            }
        }
        self.changeMonth(loopDelta);
        focusOnDay(getFirstAvailableDay(loopDelta), 0);
        return undefined;
    }
    function focusOnDay(current, offset) {
        const dayFocused = isInView(document.activeElement || document.body);
        const startElem = current !== undefined
            ? current
            : dayFocused
                ? document.activeElement
                : self.selectedDateElem !== undefined && isInView(self.selectedDateElem)
                    ? self.selectedDateElem
                    : self.todayDateElem !== undefined && isInView(self.todayDateElem)
                        ? self.todayDateElem
                        : getFirstAvailableDay(offset > 0 ? 1 : -1);
        if (startElem === undefined) {
            self._input.focus();
        }
        else if (!dayFocused) {
            focusOnDayElem(startElem);
        }
        else {
            getNextAvailableDay(startElem, offset);
        }
    }
    function buildMonthDays(year, month) {
        const firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
        const prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
        const daysInMonth = self.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
        let dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
        for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
            days.appendChild(createDay(prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
        }
        for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
            days.appendChild(createDay("", new Date(year, month, dayNumber), dayNumber, dayIndex));
        }
        for (let dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth &&
            (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
            days.appendChild(createDay(nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
        }
        const dayContainer = createElement("div", "dayContainer");
        dayContainer.appendChild(days);
        return dayContainer;
    }
    function buildDays() {
        if (self.daysContainer === undefined) {
            return;
        }
        clearNode(self.daysContainer);
        if (self.weekNumbers)
            clearNode(self.weekNumbers);
        const frag = document.createDocumentFragment();
        for (let i = 0; i < self.config.showMonths; i++) {
            const d = new Date(self.currentYear, self.currentMonth, 1);
            d.setMonth(self.currentMonth + i);
            frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
        }
        self.daysContainer.appendChild(frag);
        self.days = self.daysContainer.firstChild;
        if (self.config.mode === "range" && self.selectedDates.length === 1) {
            onMouseOver();
        }
    }
    function buildMonthSwitch() {
        if (self.config.showMonths > 1 ||
            self.config.monthSelectorType !== "dropdown")
            return;
        const shouldBuildMonth = function (month) {
            if (self.config.minDate !== undefined &&
                self.currentYear === self.config.minDate.getFullYear() &&
                month < self.config.minDate.getMonth()) {
                return false;
            }
            return !(self.config.maxDate !== undefined &&
                self.currentYear === self.config.maxDate.getFullYear() &&
                month > self.config.maxDate.getMonth());
        };
        self.monthsDropdownContainer.tabIndex = -1;
        self.monthsDropdownContainer.innerHTML = "";
        for (let i = 0; i < 12; i++) {
            if (!shouldBuildMonth(i))
                continue;
            const month = createElement("option", "flatpickr-monthDropdown-month");
            month.value = new Date(self.currentYear, i).getMonth().toString();
            month.textContent = monthToStr(i, self.config.shorthandCurrentMonth, self.l10n);
            month.tabIndex = -1;
            if (self.currentMonth === i) {
                month.selected = true;
            }
            self.monthsDropdownContainer.appendChild(month);
        }
    }
    function buildMonth() {
        const container = createElement("div", "flatpickr-month");
        const monthNavFragment = window.document.createDocumentFragment();
        let monthElement;
        if (self.config.showMonths > 1 ||
            self.config.monthSelectorType === "static") {
            monthElement = createElement("span", "cur-month");
        }
        else {
            self.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
            self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
            bind(self.monthsDropdownContainer, "change", (e) => {
                const target = getEventTarget(e);
                const selectedMonth = parseInt(target.value, 10);
                self.changeMonth(selectedMonth - self.currentMonth);
                triggerEvent("onMonthChange");
            });
            buildMonthSwitch();
            monthElement = self.monthsDropdownContainer;
        }
        const yearInput = createNumberInput("cur-year", { tabindex: "-1" });
        const yearElement = yearInput.getElementsByTagName("input")[0];
        yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
        if (self.config.minDate) {
            yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
        }
        if (self.config.maxDate) {
            yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
            yearElement.disabled =
                !!self.config.minDate &&
                    self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
        }
        const currentMonth = createElement("div", "flatpickr-current-month");
        currentMonth.appendChild(monthElement);
        currentMonth.appendChild(yearInput);
        monthNavFragment.appendChild(currentMonth);
        container.appendChild(monthNavFragment);
        return {
            container,
            yearElement,
            monthElement,
        };
    }
    function buildMonths() {
        clearNode(self.monthNav);
        self.monthNav.appendChild(self.prevMonthNav);
        if (self.config.showMonths) {
            self.yearElements = [];
            self.monthElements = [];
        }
        for (let m = self.config.showMonths; m--;) {
            const month = buildMonth();
            self.yearElements.push(month.yearElement);
            self.monthElements.push(month.monthElement);
            self.monthNav.appendChild(month.container);
        }
        self.monthNav.appendChild(self.nextMonthNav);
    }
    function buildMonthNav() {
        self.monthNav = createElement("div", "flatpickr-months");
        self.yearElements = [];
        self.monthElements = [];
        self.prevMonthNav = createElement("span", "flatpickr-prev-month");
        self.prevMonthNav.innerHTML = self.config.prevArrow;
        self.nextMonthNav = createElement("span", "flatpickr-next-month");
        self.nextMonthNav.innerHTML = self.config.nextArrow;
        buildMonths();
        Object.defineProperty(self, "_hidePrevMonthArrow", {
            get: () => self.__hidePrevMonthArrow,
            set(bool) {
                if (self.__hidePrevMonthArrow !== bool) {
                    toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
                    self.__hidePrevMonthArrow = bool;
                }
            },
        });
        Object.defineProperty(self, "_hideNextMonthArrow", {
            get: () => self.__hideNextMonthArrow,
            set(bool) {
                if (self.__hideNextMonthArrow !== bool) {
                    toggleClass(self.nextMonthNav, "flatpickr-disabled", bool);
                    self.__hideNextMonthArrow = bool;
                }
            },
        });
        self.currentYearElement = self.yearElements[0];
        updateNavigationCurrentMonth();
        return self.monthNav;
    }
    function buildTime() {
        self.calendarContainer.classList.add("hasTime");
        if (self.config.noCalendar)
            self.calendarContainer.classList.add("noCalendar");
        const defaults = getDefaultHours(self.config);
        self.timeContainer = createElement("div", "flatpickr-time");
        self.timeContainer.tabIndex = -1;
        const separator = createElement("span", "flatpickr-time-separator", ":");
        const hourInput = createNumberInput("flatpickr-hour", {
            "aria-label": self.l10n.hourAriaLabel,
        });
        self.hourElement = hourInput.getElementsByTagName("input")[0];
        const minuteInput = createNumberInput("flatpickr-minute", {
            "aria-label": self.l10n.minuteAriaLabel,
        });
        self.minuteElement = minuteInput.getElementsByTagName("input")[0];
        self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
        self.hourElement.value = pad(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getHours()
            : self.config.time_24hr
                ? defaults.hours
                : military2ampm(defaults.hours));
        self.minuteElement.value = pad(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getMinutes()
            : defaults.minutes);
        self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
        self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
        self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
        self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
        self.hourElement.setAttribute("maxlength", "2");
        self.minuteElement.setAttribute("min", "0");
        self.minuteElement.setAttribute("max", "59");
        self.minuteElement.setAttribute("maxlength", "2");
        self.timeContainer.appendChild(hourInput);
        self.timeContainer.appendChild(separator);
        self.timeContainer.appendChild(minuteInput);
        if (self.config.time_24hr)
            self.timeContainer.classList.add("time24hr");
        if (self.config.enableSeconds) {
            self.timeContainer.classList.add("hasSeconds");
            const secondInput = createNumberInput("flatpickr-second");
            self.secondElement = secondInput.getElementsByTagName("input")[0];
            self.secondElement.value = pad(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getSeconds()
                : defaults.seconds);
            self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
            self.secondElement.setAttribute("min", "0");
            self.secondElement.setAttribute("max", "59");
            self.secondElement.setAttribute("maxlength", "2");
            self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
            self.timeContainer.appendChild(secondInput);
        }
        if (!self.config.time_24hr) {
            self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[utils_int((self.latestSelectedDateObj
                ? self.hourElement.value
                : self.config.defaultHour) > 11)]);
            self.amPM.title = self.l10n.toggleTitle;
            self.amPM.tabIndex = -1;
            self.timeContainer.appendChild(self.amPM);
        }
        return self.timeContainer;
    }
    function buildWeekdays() {
        if (!self.weekdayContainer)
            self.weekdayContainer = createElement("div", "flatpickr-weekdays");
        else
            clearNode(self.weekdayContainer);
        for (let i = self.config.showMonths; i--;) {
            const container = createElement("div", "flatpickr-weekdaycontainer");
            self.weekdayContainer.appendChild(container);
        }
        updateWeekdays();
        return self.weekdayContainer;
    }
    function updateWeekdays() {
        if (!self.weekdayContainer) {
            return;
        }
        const firstDayOfWeek = self.l10n.firstDayOfWeek;
        let weekdays = [...self.l10n.weekdays.shorthand];
        if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
            weekdays = [
                ...weekdays.splice(firstDayOfWeek, weekdays.length),
                ...weekdays.splice(0, firstDayOfWeek),
            ];
        }
        for (let i = self.config.showMonths; i--;) {
            self.weekdayContainer.children[i].innerHTML = `
      <span class='flatpickr-weekday'>
        ${weekdays.join("</span><span class='flatpickr-weekday'>")}
      </span>
      `;
        }
    }
    function buildWeeks() {
        self.calendarContainer.classList.add("hasWeeks");
        const weekWrapper = createElement("div", "flatpickr-weekwrapper");
        weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
        const weekNumbers = createElement("div", "flatpickr-weeks");
        weekWrapper.appendChild(weekNumbers);
        return {
            weekWrapper,
            weekNumbers,
        };
    }
    function changeMonth(value, isOffset = true) {
        const delta = isOffset ? value : value - self.currentMonth;
        if ((delta < 0 && self._hidePrevMonthArrow === true) ||
            (delta > 0 && self._hideNextMonthArrow === true))
            return;
        self.currentMonth += delta;
        if (self.currentMonth < 0 || self.currentMonth > 11) {
            self.currentYear += self.currentMonth > 11 ? 1 : -1;
            self.currentMonth = (self.currentMonth + 12) % 12;
            triggerEvent("onYearChange");
            buildMonthSwitch();
        }
        buildDays();
        triggerEvent("onMonthChange");
        updateNavigationCurrentMonth();
    }
    function clear(triggerChangeEvent = true, toInitial = true) {
        self.input.value = "";
        if (self.altInput !== undefined)
            self.altInput.value = "";
        if (self.mobileInput !== undefined)
            self.mobileInput.value = "";
        self.selectedDates = [];
        self.latestSelectedDateObj = undefined;
        if (toInitial === true) {
            self.currentYear = self._initialDate.getFullYear();
            self.currentMonth = self._initialDate.getMonth();
        }
        if (self.config.enableTime === true) {
            const { hours, minutes, seconds } = getDefaultHours(self.config);
            setHours(hours, minutes, seconds);
        }
        self.redraw();
        if (triggerChangeEvent)
            triggerEvent("onChange");
    }
    function close() {
        self.isOpen = false;
        if (!self.isMobile) {
            if (self.calendarContainer !== undefined) {
                self.calendarContainer.classList.remove("open");
            }
            if (self._input !== undefined) {
                self._input.classList.remove("active");
            }
        }
        triggerEvent("onClose");
    }
    function destroy() {
        if (self.config !== undefined)
            triggerEvent("onDestroy");
        for (let i = self._handlers.length; i--;) {
            self._handlers[i].remove();
        }
        self._handlers = [];
        if (self.mobileInput) {
            if (self.mobileInput.parentNode)
                self.mobileInput.parentNode.removeChild(self.mobileInput);
            self.mobileInput = undefined;
        }
        else if (self.calendarContainer && self.calendarContainer.parentNode) {
            if (self.config.static && self.calendarContainer.parentNode) {
                const wrapper = self.calendarContainer.parentNode;
                wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                if (wrapper.parentNode) {
                    while (wrapper.firstChild)
                        wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                    wrapper.parentNode.removeChild(wrapper);
                }
            }
            else
                self.calendarContainer.parentNode.removeChild(self.calendarContainer);
        }
        if (self.altInput) {
            self.input.type = "text";
            if (self.altInput.parentNode)
                self.altInput.parentNode.removeChild(self.altInput);
            delete self.altInput;
        }
        if (self.input) {
            self.input.type = self.input._type;
            self.input.classList.remove("flatpickr-input");
            self.input.removeAttribute("readonly");
        }
        [
            "_showTimeInput",
            "latestSelectedDateObj",
            "_hideNextMonthArrow",
            "_hidePrevMonthArrow",
            "__hideNextMonthArrow",
            "__hidePrevMonthArrow",
            "isMobile",
            "isOpen",
            "selectedDateElem",
            "minDateHasTime",
            "maxDateHasTime",
            "days",
            "daysContainer",
            "_input",
            "_positionElement",
            "innerContainer",
            "rContainer",
            "monthNav",
            "todayDateElem",
            "calendarContainer",
            "weekdayContainer",
            "prevMonthNav",
            "nextMonthNav",
            "monthsDropdownContainer",
            "currentMonthElement",
            "currentYearElement",
            "navigationCurrentMonth",
            "selectedDateElem",
            "config",
        ].forEach((k) => {
            try {
                delete self[k];
            }
            catch (_) { }
        });
    }
    function isCalendarElem(elem) {
        if (self.config.appendTo && self.config.appendTo.contains(elem))
            return true;
        return self.calendarContainer.contains(elem);
    }
    function documentClick(e) {
        if (self.isOpen && !self.config.inline) {
            const eventTarget = getEventTarget(e);
            const isCalendarElement = isCalendarElem(eventTarget);
            const isInput = eventTarget === self.input ||
                eventTarget === self.altInput ||
                self.element.contains(eventTarget) ||
                (e.path &&
                    e.path.indexOf &&
                    (~e.path.indexOf(self.input) ||
                        ~e.path.indexOf(self.altInput)));
            const lostFocus = e.type === "blur"
                ? isInput &&
                    e.relatedTarget &&
                    !isCalendarElem(e.relatedTarget)
                : !isInput &&
                    !isCalendarElement &&
                    !isCalendarElem(e.relatedTarget);
            const isIgnored = !self.config.ignoredFocusElements.some((elem) => elem.contains(eventTarget));
            if (lostFocus && isIgnored) {
                if (self.timeContainer !== undefined &&
                    self.minuteElement !== undefined &&
                    self.hourElement !== undefined &&
                    self.input.value !== "" &&
                    self.input.value !== undefined) {
                    updateTime();
                }
                self.close();
                if (self.config &&
                    self.config.mode === "range" &&
                    self.selectedDates.length === 1) {
                    self.clear(false);
                    self.redraw();
                }
            }
        }
    }
    function changeYear(newYear) {
        if (!newYear ||
            (self.config.minDate && newYear < self.config.minDate.getFullYear()) ||
            (self.config.maxDate && newYear > self.config.maxDate.getFullYear()))
            return;
        const newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
        self.currentYear = newYearNum || self.currentYear;
        if (self.config.maxDate &&
            self.currentYear === self.config.maxDate.getFullYear()) {
            self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
        }
        else if (self.config.minDate &&
            self.currentYear === self.config.minDate.getFullYear()) {
            self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
        }
        if (isNewYear) {
            self.redraw();
            triggerEvent("onYearChange");
            buildMonthSwitch();
        }
    }
    function isEnabled(date, timeless = true) {
        var _a;
        const dateToCheck = self.parseDate(date, undefined, timeless);
        if ((self.config.minDate &&
            dateToCheck &&
            compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
            (self.config.maxDate &&
                dateToCheck &&
                compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
            return false;
        if (!self.config.enable && self.config.disable.length === 0)
            return true;
        if (dateToCheck === undefined)
            return false;
        const bool = !!self.config.enable, array = (_a = self.config.enable) !== null && _a !== void 0 ? _a : self.config.disable;
        for (let i = 0, d; i < array.length; i++) {
            d = array[i];
            if (typeof d === "function" &&
                d(dateToCheck))
                return bool;
            else if (d instanceof Date &&
                dateToCheck !== undefined &&
                d.getTime() === dateToCheck.getTime())
                return bool;
            else if (typeof d === "string") {
                const parsed = self.parseDate(d, undefined, true);
                return parsed && parsed.getTime() === dateToCheck.getTime()
                    ? bool
                    : !bool;
            }
            else if (typeof d === "object" &&
                dateToCheck !== undefined &&
                d.from &&
                d.to &&
                dateToCheck.getTime() >= d.from.getTime() &&
                dateToCheck.getTime() <= d.to.getTime())
                return bool;
        }
        return !bool;
    }
    function isInView(elem) {
        if (self.daysContainer !== undefined)
            return (elem.className.indexOf("hidden") === -1 &&
                elem.className.indexOf("flatpickr-disabled") === -1 &&
                self.daysContainer.contains(elem));
        return false;
    }
    function onBlur(e) {
        const isInput = e.target === self._input;
        if (isInput &&
            (self.selectedDates.length > 0 || self._input.value.length > 0) &&
            !(e.relatedTarget && isCalendarElem(e.relatedTarget))) {
            self.setDate(self._input.value, true, e.target === self.altInput
                ? self.config.altFormat
                : self.config.dateFormat);
        }
    }
    function onKeyDown(e) {
        const eventTarget = getEventTarget(e);
        const isInput = self.config.wrap
            ? element.contains(eventTarget)
            : eventTarget === self._input;
        const allowInput = self.config.allowInput;
        const allowKeydown = self.isOpen && (!allowInput || !isInput);
        const allowInlineKeydown = self.config.inline && isInput && !allowInput;
        if (e.keyCode === 13 && isInput) {
            if (allowInput) {
                self.setDate(self._input.value, true, eventTarget === self.altInput
                    ? self.config.altFormat
                    : self.config.dateFormat);
                return eventTarget.blur();
            }
            else {
                self.open();
            }
        }
        else if (isCalendarElem(eventTarget) ||
            allowKeydown ||
            allowInlineKeydown) {
            const isTimeObj = !!self.timeContainer &&
                self.timeContainer.contains(eventTarget);
            switch (e.keyCode) {
                case 13:
                    if (isTimeObj) {
                        e.preventDefault();
                        updateTime();
                        focusAndClose();
                    }
                    else
                        selectDate(e);
                    break;
                case 27:
                    e.preventDefault();
                    focusAndClose();
                    break;
                case 8:
                case 46:
                    if (isInput && !self.config.allowInput) {
                        e.preventDefault();
                        self.clear();
                    }
                    break;
                case 37:
                case 39:
                    if (!isTimeObj && !isInput) {
                        e.preventDefault();
                        if (self.daysContainer !== undefined &&
                            (allowInput === false ||
                                (document.activeElement && isInView(document.activeElement)))) {
                            const delta = e.keyCode === 39 ? 1 : -1;
                            if (!e.ctrlKey)
                                focusOnDay(undefined, delta);
                            else {
                                e.stopPropagation();
                                changeMonth(delta);
                                focusOnDay(getFirstAvailableDay(1), 0);
                            }
                        }
                    }
                    else if (self.hourElement)
                        self.hourElement.focus();
                    break;
                case 38:
                case 40:
                    e.preventDefault();
                    const delta = e.keyCode === 40 ? 1 : -1;
                    if ((self.daysContainer &&
                        eventTarget.$i !== undefined) ||
                        eventTarget === self.input ||
                        eventTarget === self.altInput) {
                        if (e.ctrlKey) {
                            e.stopPropagation();
                            changeYear(self.currentYear - delta);
                            focusOnDay(getFirstAvailableDay(1), 0);
                        }
                        else if (!isTimeObj)
                            focusOnDay(undefined, delta * 7);
                    }
                    else if (eventTarget === self.currentYearElement) {
                        changeYear(self.currentYear - delta);
                    }
                    else if (self.config.enableTime) {
                        if (!isTimeObj && self.hourElement)
                            self.hourElement.focus();
                        updateTime(e);
                        self._debouncedChange();
                    }
                    break;
                case 9:
                    if (isTimeObj) {
                        const elems = [
                            self.hourElement,
                            self.minuteElement,
                            self.secondElement,
                            self.amPM,
                        ]
                            .concat(self.pluginElements)
                            .filter((x) => x);
                        const i = elems.indexOf(eventTarget);
                        if (i !== -1) {
                            const target = elems[i + (e.shiftKey ? -1 : 1)];
                            e.preventDefault();
                            (target || self._input).focus();
                        }
                    }
                    else if (!self.config.noCalendar &&
                        self.daysContainer &&
                        self.daysContainer.contains(eventTarget) &&
                        e.shiftKey) {
                        e.preventDefault();
                        self._input.focus();
                    }
                    break;
                default:
                    break;
            }
        }
        if (self.amPM !== undefined && eventTarget === self.amPM) {
            switch (e.key) {
                case self.l10n.amPM[0].charAt(0):
                case self.l10n.amPM[0].charAt(0).toLowerCase():
                    self.amPM.textContent = self.l10n.amPM[0];
                    setHoursFromInputs();
                    updateValue();
                    break;
                case self.l10n.amPM[1].charAt(0):
                case self.l10n.amPM[1].charAt(0).toLowerCase():
                    self.amPM.textContent = self.l10n.amPM[1];
                    setHoursFromInputs();
                    updateValue();
                    break;
            }
        }
        if (isInput || isCalendarElem(eventTarget)) {
            triggerEvent("onKeyDown", e);
        }
    }
    function onMouseOver(elem) {
        if (self.selectedDates.length !== 1 ||
            (elem &&
                (!elem.classList.contains("flatpickr-day") ||
                    elem.classList.contains("flatpickr-disabled"))))
            return;
        const hoverDate = elem
            ? elem.dateObj.getTime()
            : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
        let containsDisabled = false;
        let minRange = 0, maxRange = 0;
        for (let t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
            if (!isEnabled(new Date(t), true)) {
                containsDisabled =
                    containsDisabled || (t > rangeStartDate && t < rangeEndDate);
                if (t < initialDate && (!minRange || t > minRange))
                    minRange = t;
                else if (t > initialDate && (!maxRange || t < maxRange))
                    maxRange = t;
            }
        }
        for (let m = 0; m < self.config.showMonths; m++) {
            const month = self.daysContainer.children[m];
            for (let i = 0, l = month.children.length; i < l; i++) {
                const dayElem = month.children[i], date = dayElem.dateObj;
                const timestamp = date.getTime();
                const outOfRange = (minRange > 0 && timestamp < minRange) ||
                    (maxRange > 0 && timestamp > maxRange);
                if (outOfRange) {
                    dayElem.classList.add("notAllowed");
                    ["inRange", "startRange", "endRange"].forEach((c) => {
                        dayElem.classList.remove(c);
                    });
                    continue;
                }
                else if (containsDisabled && !outOfRange)
                    continue;
                ["startRange", "inRange", "endRange", "notAllowed"].forEach((c) => {
                    dayElem.classList.remove(c);
                });
                if (elem !== undefined) {
                    elem.classList.add(hoverDate <= self.selectedDates[0].getTime()
                        ? "startRange"
                        : "endRange");
                    if (initialDate < hoverDate && timestamp === initialDate)
                        dayElem.classList.add("startRange");
                    else if (initialDate > hoverDate && timestamp === initialDate)
                        dayElem.classList.add("endRange");
                    if (timestamp >= minRange &&
                        (maxRange === 0 || timestamp <= maxRange) &&
                        isBetween(timestamp, initialDate, hoverDate))
                        dayElem.classList.add("inRange");
                }
            }
        }
    }
    function onResize() {
        if (self.isOpen && !self.config.static && !self.config.inline)
            positionCalendar();
    }
    function open(e, positionElement = self._positionElement) {
        if (self.isMobile === true) {
            if (e) {
                e.preventDefault();
                const eventTarget = getEventTarget(e);
                if (eventTarget) {
                    eventTarget.blur();
                }
            }
            if (self.mobileInput !== undefined) {
                self.mobileInput.focus();
                self.mobileInput.click();
            }
            triggerEvent("onOpen");
            return;
        }
        else if (self._input.disabled || self.config.inline) {
            return;
        }
        const wasOpen = self.isOpen;
        self.isOpen = true;
        if (!wasOpen) {
            self.calendarContainer.classList.add("open");
            self._input.classList.add("active");
            triggerEvent("onOpen");
            positionCalendar(positionElement);
        }
        if (self.config.enableTime === true && self.config.noCalendar === true) {
            if (self.config.allowInput === false &&
                (e === undefined ||
                    !self.timeContainer.contains(e.relatedTarget))) {
                setTimeout(() => self.hourElement.select(), 50);
            }
        }
    }
    function minMaxDateSetter(type) {
        return (date) => {
            const dateObj = (self.config[`_${type}Date`] = self.parseDate(date, self.config.dateFormat));
            const inverseDateObj = self.config[`_${type === "min" ? "max" : "min"}Date`];
            if (dateObj !== undefined) {
                self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                    dateObj.getHours() > 0 ||
                        dateObj.getMinutes() > 0 ||
                        dateObj.getSeconds() > 0;
            }
            if (self.selectedDates) {
                self.selectedDates = self.selectedDates.filter((d) => isEnabled(d));
                if (!self.selectedDates.length && type === "min")
                    setHoursFromDate(dateObj);
                updateValue();
            }
            if (self.daysContainer) {
                redraw();
                if (dateObj !== undefined)
                    self.currentYearElement[type] = dateObj.getFullYear().toString();
                else
                    self.currentYearElement.removeAttribute(type);
                self.currentYearElement.disabled =
                    !!inverseDateObj &&
                        dateObj !== undefined &&
                        inverseDateObj.getFullYear() === dateObj.getFullYear();
            }
        };
    }
    function parseConfig() {
        const boolOpts = [
            "wrap",
            "weekNumbers",
            "allowInput",
            "allowInvalidPreload",
            "clickOpens",
            "time_24hr",
            "enableTime",
            "noCalendar",
            "altInput",
            "shorthandCurrentMonth",
            "inline",
            "static",
            "enableSeconds",
            "disableMobile",
        ];
        const userConfig = Object.assign(Object.assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
        const formats = {};
        self.config.parseDate = userConfig.parseDate;
        self.config.formatDate = userConfig.formatDate;
        Object.defineProperty(self.config, "enable", {
            get: () => self.config._enable,
            set: (dates) => {
                self.config._enable = parseDateRules(dates);
            },
        });
        Object.defineProperty(self.config, "disable", {
            get: () => self.config._disable,
            set: (dates) => {
                self.config._disable = parseDateRules(dates);
            },
        });
        const timeMode = userConfig.mode === "time";
        if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
            const defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
            formats.dateFormat =
                userConfig.noCalendar || timeMode
                    ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                    : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
        }
        if (userConfig.altInput &&
            (userConfig.enableTime || timeMode) &&
            !userConfig.altFormat) {
            const defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
            formats.altFormat =
                userConfig.noCalendar || timeMode
                    ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                    : defaultAltFormat + ` h:i${userConfig.enableSeconds ? ":S" : ""} K`;
        }
        Object.defineProperty(self.config, "minDate", {
            get: () => self.config._minDate,
            set: minMaxDateSetter("min"),
        });
        Object.defineProperty(self.config, "maxDate", {
            get: () => self.config._maxDate,
            set: minMaxDateSetter("max"),
        });
        const minMaxTimeSetter = (type) => (val) => {
            self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
        };
        Object.defineProperty(self.config, "minTime", {
            get: () => self.config._minTime,
            set: minMaxTimeSetter("min"),
        });
        Object.defineProperty(self.config, "maxTime", {
            get: () => self.config._maxTime,
            set: minMaxTimeSetter("max"),
        });
        if (userConfig.mode === "time") {
            self.config.noCalendar = true;
            self.config.enableTime = true;
        }
        Object.assign(self.config, formats, userConfig);
        for (let i = 0; i < boolOpts.length; i++)
            self.config[boolOpts[i]] =
                self.config[boolOpts[i]] === true ||
                    self.config[boolOpts[i]] === "true";
        HOOKS.filter((hook) => self.config[hook] !== undefined).forEach((hook) => {
            self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
        });
        self.isMobile =
            !self.config.disableMobile &&
                !self.config.inline &&
                self.config.mode === "single" &&
                !self.config.disable.length &&
                !self.config.enable &&
                !self.config.weekNumbers &&
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        for (let i = 0; i < self.config.plugins.length; i++) {
            const pluginConf = self.config.plugins[i](self) || {};
            for (const key in pluginConf) {
                if (HOOKS.indexOf(key) > -1) {
                    self.config[key] = arrayify(pluginConf[key])
                        .map(bindToInstance)
                        .concat(self.config[key]);
                }
                else if (typeof userConfig[key] === "undefined")
                    self.config[key] = pluginConf[key];
            }
        }
        if (!userConfig.altInputClass) {
            self.config.altInputClass =
                getInputElem().className + " " + self.config.altInputClass;
        }
        triggerEvent("onParseConfig");
    }
    function getInputElem() {
        return self.config.wrap
            ? element.querySelector("[data-input]")
            : element;
    }
    function setupLocale() {
        if (typeof self.config.locale !== "object" &&
            typeof flatpickr.l10ns[self.config.locale] === "undefined")
            self.config.errorHandler(new Error(`flatpickr: invalid locale ${self.config.locale}`));
        self.l10n = Object.assign(Object.assign({}, flatpickr.l10ns.default), (typeof self.config.locale === "object"
            ? self.config.locale
            : self.config.locale !== "default"
                ? flatpickr.l10ns[self.config.locale]
                : undefined));
        tokenRegex.K = `(${self.l10n.amPM[0]}|${self.l10n.amPM[1]}|${self.l10n.amPM[0].toLowerCase()}|${self.l10n.amPM[1].toLowerCase()})`;
        const userConfig = Object.assign(Object.assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
        if (userConfig.time_24hr === undefined &&
            flatpickr.defaultConfig.time_24hr === undefined) {
            self.config.time_24hr = self.l10n.time_24hr;
        }
        self.formatDate = createDateFormatter(self);
        self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
    }
    function positionCalendar(customPositionElement) {
        if (typeof self.config.position === "function") {
            return void self.config.position(self, customPositionElement);
        }
        if (self.calendarContainer === undefined)
            return;
        triggerEvent("onPreCalendarPosition");
        const positionElement = customPositionElement || self._positionElement;
        const calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, ((acc, child) => acc + child.offsetHeight), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" ||
            (configPosVertical !== "below" &&
                distanceFromBottom < calendarHeight &&
                inputBounds.top > calendarHeight);
        const top = window.pageYOffset +
            inputBounds.top +
            (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
        toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
        toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
        if (self.config.inline)
            return;
        let left = window.pageXOffset + inputBounds.left;
        let isCenter = false;
        let isRight = false;
        if (configPosHorizontal === "center") {
            left -= (calendarWidth - inputBounds.width) / 2;
            isCenter = true;
        }
        else if (configPosHorizontal === "right") {
            left -= calendarWidth - inputBounds.width;
            isRight = true;
        }
        toggleClass(self.calendarContainer, "arrowLeft", !isCenter && !isRight);
        toggleClass(self.calendarContainer, "arrowCenter", isCenter);
        toggleClass(self.calendarContainer, "arrowRight", isRight);
        const right = window.document.body.offsetWidth -
            (window.pageXOffset + inputBounds.right);
        const rightMost = left + calendarWidth > window.document.body.offsetWidth;
        const centerMost = right + calendarWidth > window.document.body.offsetWidth;
        toggleClass(self.calendarContainer, "rightMost", rightMost);
        if (self.config.static)
            return;
        self.calendarContainer.style.top = `${top}px`;
        if (!rightMost) {
            self.calendarContainer.style.left = `${left}px`;
            self.calendarContainer.style.right = "auto";
        }
        else if (!centerMost) {
            self.calendarContainer.style.left = "auto";
            self.calendarContainer.style.right = `${right}px`;
        }
        else {
            const doc = getDocumentStyleSheet();
            if (doc === undefined)
                return;
            const bodyWidth = window.document.body.offsetWidth;
            const centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
            const centerBefore = ".flatpickr-calendar.centerMost:before";
            const centerAfter = ".flatpickr-calendar.centerMost:after";
            const centerIndex = doc.cssRules.length;
            const centerStyle = `{left:${inputBounds.left}px;right:auto;}`;
            toggleClass(self.calendarContainer, "rightMost", false);
            toggleClass(self.calendarContainer, "centerMost", true);
            doc.insertRule(`${centerBefore},${centerAfter}${centerStyle}`, centerIndex);
            self.calendarContainer.style.left = `${centerLeft}px`;
            self.calendarContainer.style.right = "auto";
        }
    }
    function getDocumentStyleSheet() {
        let editableSheet = null;
        for (let i = 0; i < document.styleSheets.length; i++) {
            const sheet = document.styleSheets[i];
            try {
                sheet.cssRules;
            }
            catch (err) {
                continue;
            }
            editableSheet = sheet;
            break;
        }
        return editableSheet != null ? editableSheet : createStyleSheet();
    }
    function createStyleSheet() {
        const style = document.createElement("style");
        document.head.appendChild(style);
        return style.sheet;
    }
    function redraw() {
        if (self.config.noCalendar || self.isMobile)
            return;
        buildMonthSwitch();
        updateNavigationCurrentMonth();
        buildDays();
    }
    function focusAndClose() {
        self._input.focus();
        if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
            navigator.msMaxTouchPoints !== undefined) {
            setTimeout(self.close, 0);
        }
        else {
            self.close();
        }
    }
    function selectDate(e) {
        e.preventDefault();
        e.stopPropagation();
        const isSelectable = (day) => day.classList &&
            day.classList.contains("flatpickr-day") &&
            !day.classList.contains("flatpickr-disabled") &&
            !day.classList.contains("notAllowed");
        const t = findParent(getEventTarget(e), isSelectable);
        if (t === undefined)
            return;
        const target = t;
        const selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
        const shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth ||
            selectedDate.getMonth() >
                self.currentMonth + self.config.showMonths - 1) &&
            self.config.mode !== "range";
        self.selectedDateElem = target;
        if (self.config.mode === "single")
            self.selectedDates = [selectedDate];
        else if (self.config.mode === "multiple") {
            const selectedIndex = isDateSelected(selectedDate);
            if (selectedIndex)
                self.selectedDates.splice(parseInt(selectedIndex), 1);
            else
                self.selectedDates.push(selectedDate);
        }
        else if (self.config.mode === "range") {
            if (self.selectedDates.length === 2) {
                self.clear(false, false);
            }
            self.latestSelectedDateObj = selectedDate;
            self.selectedDates.push(selectedDate);
            if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                self.selectedDates.sort((a, b) => a.getTime() - b.getTime());
        }
        setHoursFromInputs();
        if (shouldChangeMonth) {
            const isNewYear = self.currentYear !== selectedDate.getFullYear();
            self.currentYear = selectedDate.getFullYear();
            self.currentMonth = selectedDate.getMonth();
            if (isNewYear) {
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
            triggerEvent("onMonthChange");
        }
        updateNavigationCurrentMonth();
        buildDays();
        updateValue();
        if (!shouldChangeMonth &&
            self.config.mode !== "range" &&
            self.config.showMonths === 1)
            focusOnDayElem(target);
        else if (self.selectedDateElem !== undefined &&
            self.hourElement === undefined) {
            self.selectedDateElem && self.selectedDateElem.focus();
        }
        if (self.hourElement !== undefined)
            self.hourElement !== undefined && self.hourElement.focus();
        if (self.config.closeOnSelect) {
            const single = self.config.mode === "single" && !self.config.enableTime;
            const range = self.config.mode === "range" &&
                self.selectedDates.length === 2 &&
                !self.config.enableTime;
            if (single || range) {
                focusAndClose();
            }
        }
        triggerChange();
    }
    const CALLBACKS = {
        locale: [setupLocale, updateWeekdays],
        showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
        minDate: [jumpToDate],
        maxDate: [jumpToDate],
        clickOpens: [
            () => {
                if (self.config.clickOpens === true) {
                    bind(self._input, "focus", self.open);
                    bind(self._input, "click", self.open);
                }
                else {
                    self._input.removeEventListener("focus", self.open);
                    self._input.removeEventListener("click", self.open);
                }
            },
        ],
    };
    function set(option, value) {
        if (option !== null && typeof option === "object") {
            Object.assign(self.config, option);
            for (const key in option) {
                if (CALLBACKS[key] !== undefined)
                    CALLBACKS[key].forEach((x) => x());
            }
        }
        else {
            self.config[option] = value;
            if (CALLBACKS[option] !== undefined)
                CALLBACKS[option].forEach((x) => x());
            else if (HOOKS.indexOf(option) > -1)
                self.config[option] = arrayify(value);
        }
        self.redraw();
        updateValue(true);
    }
    function setSelectedDate(inputDate, format) {
        let dates = [];
        if (inputDate instanceof Array)
            dates = inputDate.map((d) => self.parseDate(d, format));
        else if (inputDate instanceof Date || typeof inputDate === "number")
            dates = [self.parseDate(inputDate, format)];
        else if (typeof inputDate === "string") {
            switch (self.config.mode) {
                case "single":
                case "time":
                    dates = [self.parseDate(inputDate, format)];
                    break;
                case "multiple":
                    dates = inputDate
                        .split(self.config.conjunction)
                        .map((date) => self.parseDate(date, format));
                    break;
                case "range":
                    dates = inputDate
                        .split(self.l10n.rangeSeparator)
                        .map((date) => self.parseDate(date, format));
                    break;
                default:
                    break;
            }
        }
        else
            self.config.errorHandler(new Error(`Invalid date supplied: ${JSON.stringify(inputDate)}`));
        self.selectedDates = (self.config.allowInvalidPreload
            ? dates
            : dates.filter((d) => d instanceof Date && isEnabled(d, false)));
        if (self.config.mode === "range")
            self.selectedDates.sort((a, b) => a.getTime() - b.getTime());
    }
    function setDate(date, triggerChange = false, format = self.config.dateFormat) {
        if ((date !== 0 && !date) || (date instanceof Array && date.length === 0))
            return self.clear(triggerChange);
        setSelectedDate(date, format);
        self.latestSelectedDateObj =
            self.selectedDates[self.selectedDates.length - 1];
        self.redraw();
        jumpToDate(undefined, triggerChange);
        setHoursFromDate();
        if (self.selectedDates.length === 0) {
            self.clear(false);
        }
        updateValue(triggerChange);
        if (triggerChange)
            triggerEvent("onChange");
    }
    function parseDateRules(arr) {
        return arr
            .slice()
            .map((rule) => {
            if (typeof rule === "string" ||
                typeof rule === "number" ||
                rule instanceof Date) {
                return self.parseDate(rule, undefined, true);
            }
            else if (rule &&
                typeof rule === "object" &&
                rule.from &&
                rule.to)
                return {
                    from: self.parseDate(rule.from, undefined),
                    to: self.parseDate(rule.to, undefined),
                };
            return rule;
        })
            .filter((x) => x);
    }
    function setupDates() {
        self.selectedDates = [];
        self.now = self.parseDate(self.config.now) || new Date();
        const preloadedDate = self.config.defaultDate ||
            ((self.input.nodeName === "INPUT" ||
                self.input.nodeName === "TEXTAREA") &&
                self.input.placeholder &&
                self.input.value === self.input.placeholder
                ? null
                : self.input.value);
        if (preloadedDate)
            setSelectedDate(preloadedDate, self.config.dateFormat);
        self._initialDate =
            self.selectedDates.length > 0
                ? self.selectedDates[0]
                : self.config.minDate &&
                    self.config.minDate.getTime() > self.now.getTime()
                    ? self.config.minDate
                    : self.config.maxDate &&
                        self.config.maxDate.getTime() < self.now.getTime()
                        ? self.config.maxDate
                        : self.now;
        self.currentYear = self._initialDate.getFullYear();
        self.currentMonth = self._initialDate.getMonth();
        if (self.selectedDates.length > 0)
            self.latestSelectedDateObj = self.selectedDates[0];
        if (self.config.minTime !== undefined)
            self.config.minTime = self.parseDate(self.config.minTime, "H:i");
        if (self.config.maxTime !== undefined)
            self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
        self.minDateHasTime =
            !!self.config.minDate &&
                (self.config.minDate.getHours() > 0 ||
                    self.config.minDate.getMinutes() > 0 ||
                    self.config.minDate.getSeconds() > 0);
        self.maxDateHasTime =
            !!self.config.maxDate &&
                (self.config.maxDate.getHours() > 0 ||
                    self.config.maxDate.getMinutes() > 0 ||
                    self.config.maxDate.getSeconds() > 0);
    }
    function setupInputs() {
        self.input = getInputElem();
        if (!self.input) {
            self.config.errorHandler(new Error("Invalid input element specified"));
            return;
        }
        self.input._type = self.input.type;
        self.input.type = "text";
        self.input.classList.add("flatpickr-input");
        self._input = self.input;
        if (self.config.altInput) {
            self.altInput = createElement(self.input.nodeName, self.config.altInputClass);
            self._input = self.altInput;
            self.altInput.placeholder = self.input.placeholder;
            self.altInput.disabled = self.input.disabled;
            self.altInput.required = self.input.required;
            self.altInput.tabIndex = self.input.tabIndex;
            self.altInput.type = "text";
            self.input.setAttribute("type", "hidden");
            if (!self.config.static && self.input.parentNode)
                self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
        }
        if (!self.config.allowInput)
            self._input.setAttribute("readonly", "readonly");
        self._positionElement = self.config.positionElement || self._input;
    }
    function setupMobile() {
        const inputType = self.config.enableTime
            ? self.config.noCalendar
                ? "time"
                : "datetime-local"
            : "date";
        self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
        self.mobileInput.tabIndex = 1;
        self.mobileInput.type = inputType;
        self.mobileInput.disabled = self.input.disabled;
        self.mobileInput.required = self.input.required;
        self.mobileInput.placeholder = self.input.placeholder;
        self.mobileFormatStr =
            inputType === "datetime-local"
                ? "Y-m-d\\TH:i:S"
                : inputType === "date"
                    ? "Y-m-d"
                    : "H:i:S";
        if (self.selectedDates.length > 0) {
            self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
        }
        if (self.config.minDate)
            self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
        if (self.config.maxDate)
            self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
        if (self.input.getAttribute("step"))
            self.mobileInput.step = String(self.input.getAttribute("step"));
        self.input.type = "hidden";
        if (self.altInput !== undefined)
            self.altInput.type = "hidden";
        try {
            if (self.input.parentNode)
                self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
        }
        catch (_a) { }
        bind(self.mobileInput, "change", (e) => {
            self.setDate(getEventTarget(e).value, false, self.mobileFormatStr);
            triggerEvent("onChange");
            triggerEvent("onClose");
        });
    }
    function toggle(e) {
        if (self.isOpen === true)
            return self.close();
        self.open(e);
    }
    function triggerEvent(event, data) {
        if (self.config === undefined)
            return;
        const hooks = self.config[event];
        if (hooks !== undefined && hooks.length > 0) {
            for (let i = 0; hooks[i] && i < hooks.length; i++)
                hooks[i](self.selectedDates, self.input.value, self, data);
        }
        if (event === "onChange") {
            self.input.dispatchEvent(createEvent("change"));
            self.input.dispatchEvent(createEvent("input"));
        }
    }
    function createEvent(name) {
        const e = document.createEvent("Event");
        e.initEvent(name, true, true);
        return e;
    }
    function isDateSelected(date) {
        for (let i = 0; i < self.selectedDates.length; i++) {
            if (compareDates(self.selectedDates[i], date) === 0)
                return "" + i;
        }
        return false;
    }
    function isDateInRange(date) {
        if (self.config.mode !== "range" || self.selectedDates.length < 2)
            return false;
        return (compareDates(date, self.selectedDates[0]) >= 0 &&
            compareDates(date, self.selectedDates[1]) <= 0);
    }
    function updateNavigationCurrentMonth() {
        if (self.config.noCalendar || self.isMobile || !self.monthNav)
            return;
        self.yearElements.forEach((yearElement, i) => {
            const d = new Date(self.currentYear, self.currentMonth, 1);
            d.setMonth(self.currentMonth + i);
            if (self.config.showMonths > 1 ||
                self.config.monthSelectorType === "static") {
                self.monthElements[i].textContent =
                    monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
            }
            else {
                self.monthsDropdownContainer.value = d.getMonth().toString();
            }
            yearElement.value = d.getFullYear().toString();
        });
        self._hidePrevMonthArrow =
            self.config.minDate !== undefined &&
                (self.currentYear === self.config.minDate.getFullYear()
                    ? self.currentMonth <= self.config.minDate.getMonth()
                    : self.currentYear < self.config.minDate.getFullYear());
        self._hideNextMonthArrow =
            self.config.maxDate !== undefined &&
                (self.currentYear === self.config.maxDate.getFullYear()
                    ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                    : self.currentYear > self.config.maxDate.getFullYear());
    }
    function getDateStr(format) {
        return self.selectedDates
            .map((dObj) => self.formatDate(dObj, format))
            .filter((d, i, arr) => self.config.mode !== "range" ||
            self.config.enableTime ||
            arr.indexOf(d) === i)
            .join(self.config.mode !== "range"
            ? self.config.conjunction
            : self.l10n.rangeSeparator);
    }
    function updateValue(triggerChange = true) {
        if (self.mobileInput !== undefined && self.mobileFormatStr) {
            self.mobileInput.value =
                self.latestSelectedDateObj !== undefined
                    ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                    : "";
        }
        self.input.value = getDateStr(self.config.dateFormat);
        if (self.altInput !== undefined) {
            self.altInput.value = getDateStr(self.config.altFormat);
        }
        if (triggerChange !== false)
            triggerEvent("onValueUpdate");
    }
    function onMonthNavClick(e) {
        const eventTarget = getEventTarget(e);
        const isPrevMonth = self.prevMonthNav.contains(eventTarget);
        const isNextMonth = self.nextMonthNav.contains(eventTarget);
        if (isPrevMonth || isNextMonth) {
            changeMonth(isPrevMonth ? -1 : 1);
        }
        else if (self.yearElements.indexOf(eventTarget) >= 0) {
            eventTarget.select();
        }
        else if (eventTarget.classList.contains("arrowUp")) {
            self.changeYear(self.currentYear + 1);
        }
        else if (eventTarget.classList.contains("arrowDown")) {
            self.changeYear(self.currentYear - 1);
        }
    }
    function timeWrapper(e) {
        e.preventDefault();
        const isKeyDown = e.type === "keydown", eventTarget = getEventTarget(e), input = eventTarget;
        if (self.amPM !== undefined && eventTarget === self.amPM) {
            self.amPM.textContent =
                self.l10n.amPM[utils_int(self.amPM.textContent === self.l10n.amPM[0])];
        }
        const min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta ||
            (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
        let newValue = curValue + step * delta;
        if (typeof input.value !== "undefined" && input.value.length === 2) {
            const isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
            if (newValue < min) {
                newValue =
                    max +
                        newValue +
                        utils_int(!isHourElem) +
                        (utils_int(isHourElem) && utils_int(!self.amPM));
                if (isMinuteElem)
                    incrementNumInput(undefined, -1, self.hourElement);
            }
            else if (newValue > max) {
                newValue =
                    input === self.hourElement ? newValue - max - utils_int(!self.amPM) : min;
                if (isMinuteElem)
                    incrementNumInput(undefined, 1, self.hourElement);
            }
            if (self.amPM &&
                isHourElem &&
                (step === 1
                    ? newValue + curValue === 23
                    : Math.abs(newValue - curValue) > step)) {
                self.amPM.textContent =
                    self.l10n.amPM[utils_int(self.amPM.textContent === self.l10n.amPM[0])];
            }
            input.value = pad(newValue);
        }
    }
    init();
    return self;
}
function _flatpickr(nodeList, config) {
    const nodes = Array.prototype.slice
        .call(nodeList)
        .filter((x) => x instanceof HTMLElement);
    const instances = [];
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        try {
            if (node.getAttribute("data-fp-omit") !== null)
                continue;
            if (node._flatpickr !== undefined) {
                node._flatpickr.destroy();
                node._flatpickr = undefined;
            }
            node._flatpickr = FlatpickrInstance(node, config || {});
            instances.push(node._flatpickr);
        }
        catch (e) {
            console.error(e);
        }
    }
    return instances.length === 1 ? instances[0] : instances;
}
if (typeof HTMLElement !== "undefined" &&
    typeof HTMLCollection !== "undefined" &&
    typeof NodeList !== "undefined") {
    HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
    HTMLElement.prototype.flatpickr = function (config) {
        return _flatpickr([this], config);
    };
}
var flatpickr = function (selector, config) {
    if (typeof selector === "string") {
        return _flatpickr(window.document.querySelectorAll(selector), config);
    }
    else if (selector instanceof Node) {
        return _flatpickr([selector], config);
    }
    else {
        return _flatpickr(selector, config);
    }
};
flatpickr.defaultConfig = {};
flatpickr.l10ns = {
    en: Object.assign({}, l10n_default),
    default: Object.assign({}, l10n_default),
};
flatpickr.localize = (l10n) => {
    flatpickr.l10ns.default = Object.assign(Object.assign({}, flatpickr.l10ns.default), l10n);
};
flatpickr.setDefaults = (config) => {
    flatpickr.defaultConfig = Object.assign(Object.assign({}, flatpickr.defaultConfig), config);
};
flatpickr.parseDate = createDateParser({});
flatpickr.formatDate = createDateFormatter({});
flatpickr.compareDates = compareDates;
if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
    jQuery.fn.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
}
Date.prototype.fp_incr = function (days) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
};
if (typeof window !== "undefined") {
    window.flatpickr = flatpickr;
}
/* harmony default export */ const esm = ((/* unused pure expression or super */ null && (flatpickr)));

;// CONCATENATED MODULE: ./src/js/utilities/view.js









function fillBreadcrumb(items) {
  var s;

  if (isArray(items)) {
    s = items.map(function (item) {
      return "<li class=\"breadcrumb-item\">" + item.replace(/{{ORIGIN_URL}}/g, js_AMIRouter.getOriginURL).replace(/{{WEBAPP_URL}}/g, js_AMIRouter.getWebAppURL()) + "</li>";
    }).join('');
  } else if (isString(items)) {
    s = items.replace(/{{ORIGIN_URL}}/g, js_AMIRouter.getOriginURL).replace(/{{WEBAPP_URL}}/g, js_AMIRouter.getWebAppURL());
  } else {
    s = '';
  }

  $('#ami_breadcrumb_content').html(s);
}
var _idRegExp = /[a-zA-Z][a-zA-Z0-9]{7}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{12}/g;
var _datetimeFormat = 'yyyy-MM-dd HH:mm:ss.SSSSSS';
var _dateFormat = 'yyyy-MM-dd';
var _timeHMSFormat = 'HH:mm:ss.SSSSSS';
var _timeHMFormat = 'HH:mm';

function _parseDatetime(s, format) {
  format = moment().toMomentFormatString(format);
  return moment(s, format, true).toDate();
}

function _formatDatetime(date, format) {
  format = moment().toMomentFormatString(format);
  return moment(date).format(format);
}

function _injectMonaco(editors, monaco) {
  editors.each(function (_, item) {
    var textarea = $(item);
    var div = $('<div>', {
      'class': textarea.attr('class').replace(/form-editor[\-a-zA-Z]*/g, 'form-editor-monaco'),
      'style': textarea.attr('style')
    });
    div.insertAfter(textarea).promise().done(function () {
      var lang = textarea.attr('data-lang') || '';
      var theme = textarea.attr('data-theme') || 'vs';
      var wordWrap = textarea.attr('data-word-wrap') || 'false';
      var readOnly = textarea.attr('data-read-only') || 'false';
      var showGutter = textarea.attr('data-show-gutter') || 'false';
      var showMiniMap = textarea.attr('data-show-minimap') || 'false';
      var automaticLayout = textarea.attr('data-automatic-layout') || 'false';
      var renderWhitespace = textarea.attr('data-render-whitespace') || 'false';
      var highlightActiveLine = textarea.attr('data-highlight-active-line') || 'false';
      var editor = monaco.editor.create(div[0], {
        value: item.value,
        theme: theme,
        language: lang,
        wordWrap: wordWrap === 'true',
        readOnly: readOnly === 'true',
        minimap: {
          enabled: showMiniMap === 'true'
        },
        automaticLayout: automaticLayout === 'true',
        renderWhitespace: renderWhitespace === 'true',
        lineNumbers: showGutter === 'true' ? 'on' : 'off',
        renderLineHighlight: highlightActiveLine === 'true' ? 'line' : 'none',
        insertSpaces: false,
        overviewRulerLanes: 0x00,
        overviewRulerBorder: false,
        scrollBeyondLastLine: false,
        hideCursorInOverviewRuler: true,
        scrollbar: {
          alwaysConsumeMouseWheel: false
        }
      });
      textarea.data('editor', editor);
      editor.onDidChangeModelContent(function () {
        item.value = editor.getValue();
        $(item).trigger('change');
      });

      var updateHeight = function updateHeight() {
        try {
          editor.layout({
            width: div.width(),
            height: editor.getContentHeight()
          });
        } catch (_unused) {}
      };

      editor.onDidContentSizeChange(updateHeight);
      updateHeight();
    });
  });
}

function _xxxHTML(selector, twig, mode, options) {
  var result = $.Deferred();

  var _tools$setup = setup(['context', 'scope', 'dict', 'twigs'], [result, null, {}, {}], options),
      context = _tools$setup[0],
      scope = _tools$setup[1],
      dict = _tools$setup[2],
      twigs = _tools$setup[3];

  if (scope) {
    twig = twig.replace(_idRegExp, function (id) {
      return id + "_scope" + scope;
    });
  }

  var html = formatTWIG(twig, dict, twigs);
  var promise;
  var el = $(selector),
      el2;

  switch (mode) {
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
      el2 = $(el.is('[id]') ? html.replace(/^\s*(<[a-zA-Z_-]+)/, "$1 id=\"" + el.attr('id') + "\"") : html);
      promise = el.replaceWith(el2).promise();
      el = el2;
      break;

    default:
      throw 'internal error';
  }

  promise.done(function () {
    var _find = mode === 3 ? function (_selector) {
      return el.find(_selector).addBack(_selector);
    } : function (_selector) {
      return el.find(_selector);
    };

    if (js_AMIWebApp.bootstrapVersion < 5) {
      _find('*').each(function (idx, element) {
        $(element.attributes).each(function (idx, attribute) {
          if (attribute.name.startsWith('data-bs-')) {
            element.setAttribute("data-" + attribute.name.substring(8), attribute.value);
          }
        });
      });
    }

    if (jQuery.fn.tooltip) {
      _find('[data-toggle="tooltip"],[data-bs-toggle="tooltip"]').tooltip({
        html: false,
        delay: {
          show: 500,
          hide: 100
        }
      });
    }

    if (jQuery.fn.popover) {
      _find('[data-toggle="popover"],[data-bs-toggle="popover"]').popover({
        html: true,
        delay: {
          show: 500,
          hide: 100
        }
      });
    }

    _find('input.form-datetime').flatpickr({
      time_24hr: true,
      enableTime: true,
      enableSeconds: true,
      noCalendar: false,
      dateFormat: _datetimeFormat,
      parseDate: _parseDatetime,
      formatDate: _formatDatetime
    });

    _find('input.form-date').flatpickr({
      time_24hr: true,
      enableTime: false,
      enableSeconds: false,
      noCalendar: false,
      dateFormat: _dateFormat,
      parseDate: _parseDatetime,
      formatDate: _formatDatetime
    });

    _find('input.form-time').flatpickr({
      time_24hr: true,
      enableTime: true,
      enableSeconds: true,
      noCalendar: true,
      dateFormat: _timeHMSFormat,
      parseDate: _parseDatetime,
      formatDate: _formatDatetime
    });

    _find('input.form-time-hm').flatpickr({
      time_24hr: true,
      enableTime: true,
      enableSeconds: false,
      noCalendar: true,
      dateFormat: _timeHMFormat,
      parseDate: _parseDatetime,
      formatDate: _formatDatetime
    });

    var editors = _find('.form-editor:not(.form-editor-done)').addClass('form-editor-done');

    if (editors.length > 0) {
      if (typeof window.monaco === 'undefined') {
        Promise.all(/* import() */[__webpack_require__.e(552), __webpack_require__.e(164)]).then(__webpack_require__.bind(__webpack_require__, 1401)).then(function (windowMonaco) {
          _injectMonaco(editors, window.monaco = windowMonaco);

          result.resolveWith(context, [el, html]);
        });
      } else {
        _injectMonaco(editors, window.monaco);

        result.resolveWith(context, [el, html]);
      }
    } else {
      result.resolveWith(context, [el, html]);
    }
  });
  return result.promise();
}

function view_replaceHTML(selector, twig, options) {
  return _xxxHTML(selector, twig, 0, options);
}
function view_prependHTML(selector, twig, options) {
  return _xxxHTML(selector, twig, 1, options);
}
function view_appendHTML(selector, twig, options) {
  return _xxxHTML(selector, twig, 2, options);
}
function parentHTML(selector, twig, options) {
  return _xxxHTML(selector, twig, 3, options);
}
function setDateTimeFormats(datetimePrecision, datetimeFormat, dateFormat, timePrecision, timeHMSFormat, timeHMFormat) {
  _datetimeFormat = datetimeFormat || 'yyyy-MM-dd HH:mm:ss';
  _dateFormat = dateFormat || 'yyyy-MM-dd';
  _timeHMSFormat = timeHMSFormat || 'HH:mm:ss';
  _timeHMFormat = timeHMFormat || 'HH:mm';

  if (datetimePrecision > 0) {
    _datetimeFormat += "." + 'S'.repeat(datetimePrecision);
  }

  if (timePrecision > 0) {
    _timeHMSFormat += "." + 'S'.repeat(timePrecision);
  }
}
function formatTWIG(twig, dict, twigs) {
  var result = [];

  var render = function render(twig, dict, twigs) {
    if (!isMap(dict)) {
      dict = {};
    }

    if (!isMap(twigs)) {
      twigs = {};
    }

    dict['ORIGIN_URL'] = js_AMIRouter.getOriginURL();
    dict['WEBAPP_URL'] = js_AMIRouter.getWebAppURL();
    dict['BOOTSTRAP_VERSION'] = js_AMIWebApp.bootstrapVersion;
    return ami_twig/* default.engine.render */.Z.engine.render(twig, dict, twigs);
  };

  asArray(dict).forEach(function (DICT) {
    try {
      result.push(render(twig, DICT, twigs));
    } catch (e) {
      error("TWIG parsing error: " + e.message);
    }
  });
  return result.join('');
}
;// CONCATENATED MODULE: ./src/js/utilities/jsdoc.js


function jsdoc_createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = jsdoc_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function jsdoc_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return jsdoc_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return jsdoc_arrayLikeToArray(o, minLen); }

function jsdoc_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function jsdoc_classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var jsdoc_id = 0;

function jsdoc_classPrivateFieldLooseKey(name) { return "__private_" + jsdoc_id++ + "_" + name; }



var jsdoc_linkExp = jsdoc_classPrivateFieldLooseKey("linkExp");

var _menuSelector = jsdoc_classPrivateFieldLooseKey("menuSelector");

var _bodySelector = jsdoc_classPrivateFieldLooseKey("bodySelector");

var _json = jsdoc_classPrivateFieldLooseKey("json");

var _makeMenu = jsdoc_classPrivateFieldLooseKey("makeMenu");

var _makeSubMenu = jsdoc_classPrivateFieldLooseKey("makeSubMenu");

var _makeContent = jsdoc_classPrivateFieldLooseKey("makeContent");

var _makeVariable = jsdoc_classPrivateFieldLooseKey("makeVariable");

var _makeVariableSignature = jsdoc_classPrivateFieldLooseKey("makeVariableSignature");

var _makeFunction = jsdoc_classPrivateFieldLooseKey("makeFunction");

var _makeFunctionSignature = jsdoc_classPrivateFieldLooseKey("makeFunctionSignature");

var _makeFunctionParameters = jsdoc_classPrivateFieldLooseKey("makeFunctionParameters");

var _makeFunctionExceptions = jsdoc_classPrivateFieldLooseKey("makeFunctionExceptions");

var _makeFunctionReturn = jsdoc_classPrivateFieldLooseKey("makeFunctionReturn");

var _makeAlias = jsdoc_classPrivateFieldLooseKey("makeAlias");

var _makeDesc = jsdoc_classPrivateFieldLooseKey("makeDesc");

var _makeParam = jsdoc_classPrivateFieldLooseKey("makeParam");

var _makeType = jsdoc_classPrivateFieldLooseKey("makeType");

var _makeDetails = jsdoc_classPrivateFieldLooseKey("makeDetails");

var _makeExamples = jsdoc_classPrivateFieldLooseKey("makeExamples");

var AMIJSDoc = function AMIJSDoc(menuSelector, bodySelector, json) {
  Object.defineProperty(this, _makeContent, {
    value: _makeContent2
  });
  Object.defineProperty(this, _makeSubMenu, {
    value: _makeSubMenu2
  });
  Object.defineProperty(this, _makeMenu, {
    value: _makeMenu2
  });
  Object.defineProperty(this, _menuSelector, {
    writable: true,
    value: null
  });
  Object.defineProperty(this, _bodySelector, {
    writable: true,
    value: null
  });
  Object.defineProperty(this, _json, {
    writable: true,
    value: null
  });
  jsdoc_classPrivateFieldLooseBase(this, _menuSelector)[_menuSelector] = menuSelector;
  jsdoc_classPrivateFieldLooseBase(this, _bodySelector)[_bodySelector] = bodySelector;
  jsdoc_classPrivateFieldLooseBase(this, _json)[_json] = json;

  jsdoc_classPrivateFieldLooseBase(this, _makeMenu)[_makeMenu]();
};

function _makeMenu2() {
  var _this = this;

  var s = "\n<a class=\"list-group-item list-group-item-action p-2\" href=\"\">\n\t<i class=\"bi bi-house\"></i> Home\n</a>\n\n<div class=\"list-group-item list-group-item-action p-2\">\n\n\t" + jsdoc_classPrivateFieldLooseBase(this, _makeSubMenu)[_makeSubMenu]('Global', 'global') + "\n\t" + jsdoc_classPrivateFieldLooseBase(this, _makeSubMenu)[_makeSubMenu]('Namespace', 'namespaces') + "\n\t" + jsdoc_classPrivateFieldLooseBase(this, _makeSubMenu)[_makeSubMenu]('Interface', 'interfaces') + "\n\t" + jsdoc_classPrivateFieldLooseBase(this, _makeSubMenu)[_makeSubMenu]('Class', 'classes') + "\n\n</div>\n";
  $(jsdoc_classPrivateFieldLooseBase(this, _menuSelector)[_menuSelector]).html(s.trim()).promise().done(function (_) {
    $(jsdoc_classPrivateFieldLooseBase(_this, _menuSelector)[_menuSelector]).find('a[data-name][data-cat][data-name]').click(function (e) {
      var el = $(e.currentTarget);
      e.preventDefault();

      jsdoc_classPrivateFieldLooseBase(_this, _makeContent)[_makeContent](el.attr('data-title'), el.attr('data-cat'), el.attr('data-name'));
    });
  });
}

function _makeSubMenu2(title, cat) {
  var result = [];
  var items;

  if (cat === 'global') {
    items = [];

    if (jsdoc_classPrivateFieldLooseBase(this, _json)[_json]['variables']) {
      items = items.concat(jsdoc_classPrivateFieldLooseBase(this, _json)[_json]['variables']);
    }

    if (jsdoc_classPrivateFieldLooseBase(this, _json)[_json]['functions']) {
      items = items.concat(jsdoc_classPrivateFieldLooseBase(this, _json)[_json]['functions']);
    }
  } else {
    items = jsdoc_classPrivateFieldLooseBase(this, _json)[_json][cat];
  }

  if (Array.isArray(items) && items.length > 0) {
    result.push('<div>');
    result.push("<a href=\"#jsdoc_menu_" + title.toLowerCase() + "\" data-toggle=\"collapse\" data-bs-toggle=\"collapse\"><i class=\"bi bi-book\"></i> " + textToHtml(title) + "</a>");
    result.push("<ul class=\"collapse mb-0\" id=\"jsdoc_menu_" + title.toLowerCase() + "\">" + items.map(function (_item) {
      return "<li><a href=\"#\" data-title=\"" + textToHtml(title) + "\" data-cat=\"" + textToHtml(cat) + "\" data-name=\"" + textToHtml(_item.name) + "\">" + textToHtml(_item.name) + "</a></li>";
    }).join('') + "</ul>");
    result.push('</div>');
  }

  return result.join('');
}

function _makeContent2(title, cat, name) {
  var s = [];
  var item;

  if (cat === 'global') {
    item = {
      name: 'variables and functions',
      variables: jsdoc_classPrivateFieldLooseBase(this, _json)[_json]['variables'],
      functions: jsdoc_classPrivateFieldLooseBase(this, _json)[_json]['functions']
    };
  } else {
    item = jsdoc_classPrivateFieldLooseBase(this, _json)[_json][cat].filter(function (item) {
      return item.name === name;
    })[0];
  }

  s.push('<div class="card">');
  s.push('<div class="card-body bg-light">');
  s.push("<h1>" + textToHtml(title) + ": " + textToHtml(item.name) + "</h1>");
  s.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeAlias)[_makeAlias](item));
  s.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeDesc)[_makeDesc](item));
  s.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeDetails)[_makeDetails](item));
  s.push('</div>');
  s.push('</div>');

  if (item.konstructor) {
    s.push('<h4 class="mt-3">Constructor</h4>');
    s.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeFunction)[_makeFunction](item.konstructor));
  }

  if (Array.isArray(item.variables)) {
    s.push('<h4 class="mt-3">Members</h4>');

    for (var _iterator = jsdoc_createForOfIteratorHelperLoose(item.variables), _step; !(_step = _iterator()).done;) {
      var _variable = _step.value;
      s.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeVariable)[_makeVariable](_variable));
    }
  }

  if (Array.isArray(item.functions)) {
    s.push('<h4 class="mt-3">Methods</h4>');

    for (var _iterator2 = jsdoc_createForOfIteratorHelperLoose(item.functions), _step2; !(_step2 = _iterator2()).done;) {
      var _function = _step2.value;
      s.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeFunction)[_makeFunction](_function));
    }
  }

  if (Array.isArray(item.events)) {
    s.push('<h4 class="mt-3">Events</h4>');

    for (var _iterator3 = jsdoc_createForOfIteratorHelperLoose(item.events), _step3; !(_step3 = _iterator3()).done;) {
      var _event = _step3.value;
      s.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeFunction)[_makeFunction](_event));
    }
  }

  $(jsdoc_classPrivateFieldLooseBase(this, _bodySelector)[_bodySelector]).html(s.join(''));
}

function _makeVariable2(variable) {
  var result = [];
  result.push("<hr id=\"jsdoc_variable_" + variable.name + "\" />");
  result.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeVariableSignature)[_makeVariableSignature](variable));
  result.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeAlias)[_makeAlias](variable));
  result.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeDesc)[_makeDesc](variable));
  result.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeDetails)[_makeDetails](variable));
  return result.join('');
}

function _makeVariableSignature2(variable) {
  var result = [];
  result.push("<span class=\"signature-name\">" + textToHtml(variable.name) + "</span>");
  result.push("<span class=\"signature-attrs\">: {" + jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeType)[_makeType](variable) + "}</span>");
  return result.join('');
}

function _makeFunction2(method) {
  var result = [];
  result.push("<hr id=\"jsdoc_method_" + method.name + "\" />");
  result.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeFunctionSignature)[_makeFunctionSignature](method));
  result.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeAlias)[_makeAlias](method));
  result.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeDesc)[_makeDesc](method));
  result.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeFunctionParameters)[_makeFunctionParameters](method));
  result.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeDetails)[_makeDetails](method));
  result.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeFunctionExceptions)[_makeFunctionExceptions](method));
  result.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeFunctionReturn)[_makeFunctionReturn](method));
  result.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeExamples)[_makeExamples](method));
  return result.join('');
}

function _makeFunctionSignature2(method) {
  var result = [];
  result.push("<span class=\"signature-name\">" + textToHtml(method.name) + "</span>");

  if (method.params) {
    var L = method.params.map(function (_param) {
      return jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeParam)[_makeParam](_param);
    });
    result.push("<span class=\"signature-params\">(" + L.join(', ') + ")</span>");
  }

  if (method.returns) {
    var _L = method.returns.map(function (_return) {
      return jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeType)[_makeType](_return);
    });

    result.push("<span class=\"signature-attrs\"> &rarr; {" + _L.join(' or ') + "}</span>");
  }

  return result.join('');
}

function _makeFunctionParameters2(method) {
  var result = [];

  if (method.params.length > 0) {
    var L1 = [],
        L2 = [],
        L3 = [],
        L4 = [],
        L5 = [],
        L6 = [];
    var cnt1 = 0,
        cnt2 = 0,
        cnt3 = 0,
        cnt4 = 0,
        cnt5 = 0,
        cnt6 = 0;

    for (var _iterator4 = jsdoc_createForOfIteratorHelperLoose(method.params), _step4; !(_step4 = _iterator4()).done;) {
      var _params = _step4.value;
      L1.push(textToHtml(_params['name']));
      L2.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeType)[_makeType](_params));
      L3.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeDesc)[_makeDesc](_params));
      L4.push(textToHtml(_params['default']));
      L5.push(_params['optional']);
      L6.push(_params['nullable']);

      if (_params['name']) {
        cnt1++;
      }

      if (_params['type']) {
        cnt2++;
      }

      if (_params['desc']) {
        cnt3++;
      }

      if (_params['default']) {
        cnt4++;
      }

      if (_params['optional']) {
        cnt5++;
      }

      if (_params['nullable']) {
        cnt6++;
      }
    }

    result.push('<h5 class="mt-2"><strong>Parameters:</strong></h5>');
    result.push('<table class="table table-sm table-hover table-striped table-bordered" style="width: auto;">');
    result.push('<thead>');
    result.push('<tr>');

    if (cnt1 > 0) {
      result.push('<th>Name</th>');
    }

    if (cnt2 > 0) {
      result.push('<th>Type</th>');
    }

    if (cnt4 > 0) {
      result.push('<th>Default</th>');
    }

    if (cnt5 > 0) {
      result.push('<th>Optional</th>');
    }

    if (cnt6 > 0) {
      result.push('<th>Nullable</th>');
    }

    if (cnt3 > 0) {
      result.push('<th>Description</th>');
    }

    result.push('</tr>');
    result.push('</thead>');
    result.push('<tbody>');

    for (var i in method.params) {
      result.push('<tr>');

      if (cnt1 > 0) {
        result.push("<td>" + L1[i] + "</td>");
      }

      if (cnt2 > 0) {
        result.push("<td>" + L2[i] + "</td>");
      }

      if (cnt4 > 0) {
        result.push("<td>" + L4[i] + "</td>");
      }

      if (cnt5 > 0) {
        result.push("<td class=\"text-center\">" + (L5[i] ? '✓' : '') + "</td>");
      }

      if (cnt6 > 0) {
        result.push("<td class=\"text-center\">" + (L6[i] ? '✓' : '') + "</td>");
      }

      if (cnt3 > 0) {
        result.push("<td>" + L3[i] + "</td>");
      }

      result.push('</tr>');
    }

    result.push('</tbody>');
    result.push('</table>');
  }

  return result.join('');
}

function _makeFunctionExceptions2(method) {
  var result = [];

  if (Array.isArray(method.exceptions)) {
    for (var _iterator5 = jsdoc_createForOfIteratorHelperLoose(method.exceptions), _step5; !(_step5 = _iterator5()).done;) {
      var _exception = _step5.value;
      result.push('<h5 class="mt-2"><strong>Throws:</strong></h5>');
      result.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeDesc)[_makeDesc](_exception));
      result.push("<div>Type: <span class=\"signature-attrs\">" + jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeType)[_makeType](_exception) + "</span></div>");
    }
  }

  return result.join('');
}

function _makeFunctionReturn2(method) {
  var result = [];

  if (Array.isArray(method.returns)) {
    for (var _iterator6 = jsdoc_createForOfIteratorHelperLoose(method.returns), _step6; !(_step6 = _iterator6()).done;) {
      var _return = _step6.value;
      result.push('<h5 class="mt-2"><strong>Returns:</strong></h5>');
      result.push(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeDesc)[_makeDesc](_return));
      result.push("<div>Type: <span class=\"signature-attrs\">" + jsdoc_classPrivateFieldLooseBase(AMIJSDoc, _makeType)[_makeType](_return) + "</span></div>");
    }
  }

  return result.join('');
}

function _makeAlias2(x) {
  var result = [];

  if (x.alias) {
    result.push('<div>');
    result.push("Alias: " + textToHtml(x.alias));
    result.push('</div>');
  }

  return result.join('');
}

function _makeDesc2(x) {
  var result = [];

  if (x.desc) {
    result.push('<div>');
    result.push(textToHtml(x.desc).replace(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, jsdoc_linkExp)[jsdoc_linkExp], function (_, x, y) {
      return "<a href=\"" + y + "\">" + (x || y) + "</a>";
    }));
    result.push('</div>');
  }

  return result.join('');
}

function _makeParam2(x) {
  var result = [];
  result.push(textToHtml(x.name));

  if (x.optional) {
    result.push('<sup class="signature-params-attrs">opt.</sup>');
  }

  if (x.nullable) {
    result.push('<sup class="signature-params-attrs">null.</sup>');
  }

  return result.join('');
}

function _makeType2(x) {
  return x.type.map(function (y) {
    return "<i>" + textToHtml(y.replace(/\s*/g, '')) + "</i>";
  }).join(' or ');
}

function _makeDetails2(x) {
  var result = [];

  if (Array.isArray(x.implements) && x.implements.length > 0) {
    result.push("<div>Implements: " + textToHtml(x.implements.join(', ')) + "</div>");
  }

  if (Array.isArray(x.inherits) && x.inherits.length > 0) {
    result.push("<div>Inherits: " + textToHtml(x.inherits.join(', ')) + "</div>");
  }

  var version = [];
  var author = [];
  var see = [];

  if (x.version) {
    version.push("<dt>Version:</dt><dd>" + textToHtml(x.version) + "</dd>");
  }

  if (Array.isArray(x.author)) {
    for (var _iterator7 = jsdoc_createForOfIteratorHelperLoose(x.author), _step7; !(_step7 = _iterator7()).done;) {
      var _author = _step7.value;

      var _AUTHOR = _author.replace(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, jsdoc_linkExp)[jsdoc_linkExp], function (_, x, y) {
        return "<a href=\"" + y + "\">" + (x || y) + "</a>";
      });

      author.push("<dt>Author:</dt><dd>" + _AUTHOR + "</dd>");
    }
  }

  if (Array.isArray(x.see)) {
    for (var _iterator8 = jsdoc_createForOfIteratorHelperLoose(x.see), _step8; !(_step8 = _iterator8()).done;) {
      var _see = _step8.value;

      var _SEE = _see.replace(jsdoc_classPrivateFieldLooseBase(AMIJSDoc, jsdoc_linkExp)[jsdoc_linkExp], function (_, x, y) {
        return "<a href=\"" + y + "\">" + (x || y) + "</a>";
      });

      see.push("<dt>See:</dt><dd>" + _SEE + "</dd>");
    }
  }

  if (author.length > 0 || version.length > 0 || see.length > 0) {
    result.push('<dl class="details">');
    result.push(version.join(''));
    result.push(author.join(''));
    result.push(see.join(''));
    result.push('</dl>');
  }

  return result.join('');
}

function _makeExamples2(x, mode) {
  var result = [];

  if (Array.isArray(x.examples)) {
    for (var _iterator9 = jsdoc_createForOfIteratorHelperLoose(x.examples), _step9; !(_step9 = _iterator9()).done;) {
      var _example = _step9.value;
      result.push('<h5 class="mt-2"><strong>Example:</strong></h5>');
      result.push("<textarea class=\"form-editor\" data-mode=\"" + textToHtml(mode) + "\">" + textToHtml(_example) + "</textarea>");
    }
  }

  return result.join('');
}

Object.defineProperty(AMIJSDoc, _makeExamples, {
  value: _makeExamples2
});
Object.defineProperty(AMIJSDoc, _makeDetails, {
  value: _makeDetails2
});
Object.defineProperty(AMIJSDoc, _makeType, {
  value: _makeType2
});
Object.defineProperty(AMIJSDoc, _makeParam, {
  value: _makeParam2
});
Object.defineProperty(AMIJSDoc, _makeDesc, {
  value: _makeDesc2
});
Object.defineProperty(AMIJSDoc, _makeAlias, {
  value: _makeAlias2
});
Object.defineProperty(AMIJSDoc, _makeFunctionReturn, {
  value: _makeFunctionReturn2
});
Object.defineProperty(AMIJSDoc, _makeFunctionExceptions, {
  value: _makeFunctionExceptions2
});
Object.defineProperty(AMIJSDoc, _makeFunctionParameters, {
  value: _makeFunctionParameters2
});
Object.defineProperty(AMIJSDoc, _makeFunctionSignature, {
  value: _makeFunctionSignature2
});
Object.defineProperty(AMIJSDoc, _makeFunction, {
  value: _makeFunction2
});
Object.defineProperty(AMIJSDoc, _makeVariableSignature, {
  value: _makeVariableSignature2
});
Object.defineProperty(AMIJSDoc, _makeVariable, {
  value: _makeVariable2
});
Object.defineProperty(AMIJSDoc, jsdoc_linkExp, {
  writable: true,
  value: /(?:\[\s*([^\s\]]+)\s*])?{@link\s+([^\s}]+)\s*}/g
});
function renderJSDoc(menuSelector, bodySelector, json) {
  return new AMIJSDoc(menuSelector, bodySelector, json);
}
;// CONCATENATED MODULE: ./src/js/utilities/controls.js








var _controls = {};
function loadControl(control, options) {
  var result = $.Deferred();

  var _tools$setup = setup(['context', 'cache'], [result, false], options),
      context = _tools$setup[0],
      cache = _tools$setup[1];

  if (control.indexOf('ctrl:') === 0) {
    control = control.substring(5);
  }

  var descr = _controls[control.toLowerCase()];

  if (descr) {
    try {
      loadScripts(js_AMIRouter.getOriginURL() + "/" + descr.file, {
        cache: cache
      }).then(function (loaded) {
        var clazz = window[descr.clazz];
        var promise = loaded[0] ? clazz.prototype.onReady.apply(clazz.prototype) : null;

        _internal_then(promise, function () {
          result.resolveWith(context, [clazz]);
        }, function (message) {
          result.rejectWith(context, ["cannot load control '" + control + "': " + message]);
        });
      }, function (message) {
        result.rejectWith(context, ["cannot load control '" + control + "': " + message]);
      });
    } catch (message) {
      result.rejectWith(context, ["cannot load control '" + control + "': " + message]);
    }
  } else {
    result.rejectWith(context, ["cannot load control '" + control + "': not found"]);
  }

  return result.promise();
}
function controls_createControl(parent, owner, control, params, options) {
  var result = $.Deferred();

  var _tools$setup2 = setup(['context'], [result], options),
      context = _tools$setup2[0];

  loadControl(control, options).done(function (constructor) {
    var instance = new constructor(parent, owner);

    _internal_then(constructor.prototype.render.apply(instance, params), function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      result.resolveWith(context, [instance].concat(args));
    }, function (message) {
      result.rejectWith(context, [message]);
    });
  }).fail(function (message) {
    result.rejectWith(context, [message]);
  });
  return result.promise();
}
function controls_createControlInBody(parent, owner, control, controlParams, controlOptions, ownerOptions, options) {
  var result = $.Deferred();

  var _tools$setup3 = setup(['context'], [result], options),
      context = _tools$setup3[0];

  try {
    var PARAMS = [];
    var OPTIONS = {};

    for (var key in ownerOptions) {
      OPTIONS[key] = ownerOptions[key];
    }

    for (var _key2 in controlOptions) {
      OPTIONS[_key2] = controlOptions[_key2];
    }

    Array.prototype.push.apply(PARAMS, controlParams);
    PARAMS.push(OPTIONS);
    controls_createControl(parent, owner, control, PARAMS).done(function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
        args[_key3] = arguments[_key3];
      }

      result.resolveWith(context, args);
    }).fail(function (message) {
      result.rejectWith(context, [message]);
    });
  } catch (message) {
    result.rejectWith(context, [message]);
  }

  return result.promise();
}
function controls_createControlInContainer(parent, owner, control, controlParams, controlOptions, ownerOptions, icon, title, options) {
  var result = $.Deferred();

  var _tools$setup4 = setup(['context'], [result], options),
      context = _tools$setup4[0];

  try {
    parent.appendItem("<i class=\"bi bi-" + textToHtml(icon) + "\"></i> " + textToHtml(title)).done(function (selector) {
      var PARAMS = [];
      var OPTIONS = {};

      for (var key in ownerOptions) {
        OPTIONS[key] = ownerOptions[key];
      }

      for (var _key4 in controlOptions) {
        OPTIONS[_key4] = controlOptions[_key4];
      }

      PARAMS.push(selector);
      Array.prototype.push.apply(PARAMS, controlParams);
      PARAMS.push(OPTIONS);
      controls_createControl(parent, owner, control, PARAMS).done(function () {
        for (var _len3 = arguments.length, args = new Array(_len3), _key5 = 0; _key5 < _len3; _key5++) {
          args[_key5] = arguments[_key5];
        }

        result.resolveWith(context, args);
      }).fail(function (message) {
        result.rejectWith(context, [message]);
      });
    });
  } catch (message) {
    result.rejectWith(context, [message]);
  }

  return result.promise();
}

function _parseJSON(s, _default) {
  try {
    return JSON.parse(s);
  } catch (e) {
    return _default;
  }
}

function controls_createControlFromWebLink(parent, owner, el, ownerOptions, options) {
  var dataCtrl = el.hasAttribute('data-ctrl') ? el.getAttribute('data-ctrl') : '';
  var dataCtrlLocation = el.hasAttribute('data-ctrl-location') ? el.getAttribute('data-ctrl-location') : '';
  var dataParams = el.hasAttribute('data-params') ? _parseJSON(el.getAttribute('data-params'), []) : [];
  var dataOptions = el.hasAttribute('data-options') ? _parseJSON(el.getAttribute('data-options'), {}) : el.hasAttribute('data-settings') ? _parseJSON(el.getAttribute('data-settings'), {}) : {};
  var dataIcon = el.hasAttribute('data-icon') ? el.getAttribute('data-icon') : 'question';
  var dataTitle = el.hasAttribute('data-title') ? el.getAttribute('data-title') : 'Unknown';
  lock();

  if (dataCtrlLocation === 'body') {
    return controls_createControlInBody(parent, owner, dataCtrl, dataParams, dataOptions, ownerOptions, options).done(function () {
      unlock();
    }).fail(function (message) {
      error(message);
    });
  } else {
    return controls_createControlInContainer(parent, owner, dataCtrl, dataParams, dataOptions, ownerOptions, dataIcon, dataTitle, options).done(function () {
      unlock();
    }).fail(function (message) {
      error(message);
    });
  }
}
;// CONCATENATED MODULE: ./src/js/utilities/resources.js





var _sheets = [];
var _scripts = [];

function _getExtension(url) {
  var idx = url.lastIndexOf('.');
  return idx > 0 ? url.substring(idx) : '';
}

function _getDataType(url, dataType) {
  var result;

  if (dataType === 'auto') {
    if (url.indexOf('ctrl:') === 0) {
      result = 'control';
    } else if (url.indexOf('subapp:') === 0) {
      result = 'subapp';
    } else {
      switch (_getExtension(url).toLowerCase()) {
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
  } else {
    result = dataType;
  }

  return result;
}

function __loadXXX(deferred, result, urls, dataType, context, cache) {
  if (urls.length === 0) {
    deferred.resolveWith(context, [result]);
    return;
  }

  var url = urls.shift().trim();

  var dataTYPE = _getDataType(url, dataType);

  switch (dataTYPE) {
    case 'control':
      loadControl(url).then(function (data) {
        result.push(data);

        __loadXXX(deferred, result, urls, dataType, context, cache);
      }, function (message) {
        deferred.rejectWith(context, [message]);
      });
      break;

    case 'subapp':
      loadSubApp(url).then(function (data) {
        result.push(data);

        __loadXXX(deferred, result, urls, dataType, context, cache);
      }, function (message) {
        deferred.rejectWith(context, [message]);
      });
      break;

    case 'sheet':
      if (_sheets.indexOf(url) >= 0) {
        result.push(false);

        __loadXXX(deferred, result, urls, dataType, context, cache);
      } else {
        $.ajax({
          url: url,
          async: false,
          cache: cache,
          crossDomain: true,
          dataType: dataTYPE
        }).then(function () {
          result.push(true);

          _sheets.push(url);

          __loadXXX(deferred, result, urls, dataType, context, cache);
        }, function () {
          deferred.rejectWith(context, ["cannot load '" + url + "'"]);
        });
      }

      break;

    case 'script':
      if (_scripts.indexOf(url) >= 0) {
        result.push(false);

        __loadXXX(deferred, result, urls, dataType, context, cache);
      } else {
        $.ajax({
          url: url,
          async: false,
          cache: cache,
          crossDomain: true,
          dataType: dataTYPE
        }).then(function () {
          result.push(true);

          _scripts.push(url);

          __loadXXX(deferred, result, urls, dataType, context, cache);
        }, function () {
          deferred.rejectWith(context, ["cannot load '" + url + "'"]);
        });
      }

      break;

    default:
      $.ajax({
        url: url,
        async: true,
        cache: cache,
        crossDomain: true,
        dataType: dataTYPE
      }).then(function (data) {
        result.push(data);

        __loadXXX(deferred, result, urls, dataType, context, cache);
      }, function () {
        deferred.rejectWith(context, ["cannot load '" + url + "'"]);
      });
      break;
  }
}

function _loadXXX(urls, dataType, options) {
  var deferred = $.Deferred();

  var _tools$setup = setup(['context', 'cache'], [deferred, false], options),
      context = _tools$setup[0],
      cache = _tools$setup[1];

  __loadXXX(deferred, [], asArray(urls), dataType, context, cache);

  return deferred.promise();
}

function loadResources(urls, options) {
  return _loadXXX(urls, 'auto', options);
}
function loadSheets(urls, options) {
  return _loadXXX(urls, 'sheet', options);
}
function loadScripts(urls, options) {
  return _loadXXX(urls, 'script', options);
}
function loadJSONs(urls, options) {
  return _loadXXX(urls, 'json', options);
}
function loadXMLs(urls, options) {
  return _loadXXX(urls, 'xml', options);
}
function loadHTMLs(urls, options) {
  return _loadXXX(urls, 'text', options);
}
function loadTWIGs(urls, options) {
  return _loadXXX(urls, 'text', options);
}
function loadTexts(urls, options) {
  return _loadXXX(urls, 'text', options);
}
// EXTERNAL MODULE: ./src/twigs/sign_in_button.twig
var sign_in_button = __webpack_require__(7378);
// EXTERNAL MODULE: ./src/twigs/sign_out_button.twig
var sign_out_button = __webpack_require__(6549);
// EXTERNAL MODULE: ./src/twigs/Modals/sign_in_modal.twig
var sign_in_modal = __webpack_require__(8841);
// EXTERNAL MODULE: ./src/twigs/Modals/change_info_modal.twig
var change_info_modal = __webpack_require__(3111);
// EXTERNAL MODULE: ./src/twigs/Modals/change_pass_modal.twig
var change_pass_modal = __webpack_require__(3334);
// EXTERNAL MODULE: ./src/twigs/Modals/change_cert_modal.twig
var change_cert_modal = __webpack_require__(5373);
// EXTERNAL MODULE: ./src/twigs/Modals/account_modal.twig
var account_modal = __webpack_require__(5662);
// EXTERNAL MODULE: ./src/images/certificate-green.png
var certificate_green = __webpack_require__(5095);
// EXTERNAL MODULE: ./src/images/certificate-pink.png
var certificate_pink = __webpack_require__(7148);
// EXTERNAL MODULE: ./node_modules/qrcode/lib/browser.js
var browser = __webpack_require__(2592);
;// CONCATENATED MODULE: ./src/js/AMIAuth.js


function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function AMIAuth_classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var AMIAuth_id = 0;

function AMIAuth_classPrivateFieldLooseKey(name) { return "__private_" + AMIAuth_id++ + "_" + name; }



















var _flags = AMIAuth_classPrivateFieldLooseKey("flags");

var _userInfo = AMIAuth_classPrivateFieldLooseKey("userInfo");

var _roleInfo = AMIAuth_classPrivateFieldLooseKey("roleInfo");

var _bookmarkInfo = AMIAuth_classPrivateFieldLooseKey("bookmarkInfo");

var _dashboardInfo = AMIAuth_classPrivateFieldLooseKey("dashboardInfo");

var _awfInfo = AMIAuth_classPrivateFieldLooseKey("awfInfo");

var _setupAWF = AMIAuth_classPrivateFieldLooseKey("setupAWF");

var _clean = AMIAuth_classPrivateFieldLooseKey("clean");

var _update = AMIAuth_classPrivateFieldLooseKey("update");

var AMIAuth = function () {
  function AMIAuth() {
    Object.defineProperty(this, _update, {
      value: _update2
    });
    Object.defineProperty(this, _flags, {
      writable: true,
      value: {}
    });
    Object.defineProperty(this, _userInfo, {
      writable: true,
      value: {}
    });
    Object.defineProperty(this, _roleInfo, {
      writable: true,
      value: {}
    });
    Object.defineProperty(this, _bookmarkInfo, {
      writable: true,
      value: {}
    });
    Object.defineProperty(this, _dashboardInfo, {
      writable: true,
      value: {}
    });
    Object.defineProperty(this, _awfInfo, {
      writable: true,
      value: {}
    });
  }

  var _proto = AMIAuth.prototype;

  _proto.init = function init(signInImageURL, signInText, ssoAutoAuthentication, ssoAuthenticationAllowed, passwordAuthenticationAllowed, certificateAuthenticationAllowed, signOutAllowed, createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed, captchaAllowed, bookmarksAllowed, dashboardsAllowed) {
    var _this = this;

    var result = $.Deferred();
    AMIAuth_classPrivateFieldLooseBase(this, _flags)[_flags] = {
      signInImageURL: signInImageURL,
      signInText: signInText,
      ssoAutoAuthentication: ssoAutoAuthentication,
      ssoAuthenticationAllowed: ssoAuthenticationAllowed,
      passwordAuthenticationAllowed: passwordAuthenticationAllowed,
      certificateAuthenticationAllowed: certificateAuthenticationAllowed,
      signOutAllowed: signOutAllowed,
      createAccountAllowed: createAccountAllowed,
      changeInfoAllowed: changeInfoAllowed,
      changePasswordAllowed: changePasswordAllowed,
      changeCertificateAllowed: changeCertificateAllowed,
      captchaAllowed: captchaAllowed,
      bookmarksAllowed: bookmarksAllowed,
      dashboardsAllowed: dashboardsAllowed
    };
    js_AMIWebApp.appendHTML('body', sign_in_modal + change_info_modal + change_pass_modal + change_cert_modal + account_modal, {
      dict: AMIAuth_classPrivateFieldLooseBase(this, _flags)[_flags]
    }).done(function () {
      $('#B7894CC1_1DAA_4A7E_B7D1_DBDF6F06AC73').submit(function (e) {
        _this.form_login(e);
      });
      $('#EE055CD4_E58F_4834_8020_986AE3F8D67D').submit(function (e) {
        _this.form_addUser(e);
      });
      $('#DA2047A2_9E5D_420D_B6E7_FA261D2EF10F').submit(function (e) {
        _this.form_remindPass(e);
      });
      $('#D9EAF998_ED8E_44D2_A0BE_8C5CF5E438BD').submit(function (e) {
        _this.form_changeInfo(e);
      });
      $('#E92A1097_983B_4857_875F_07E4659B41B0').submit(function (e) {
        _this.form_changePass(e);
      });
      $('#E6E30EEC_15EE_4FCF_9809_2B8EC2FEF388,#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').change(function () {
        var el1 = $('#E6E30EEC_15EE_4FCF_9809_2B8EC2FEF388');
        var el2 = $('#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187');
        var pass1 = el1.val();
        var pass2 = el2.val();
        el2.get(0).setCustomValidity(pass1.length > 0 && pass2.length > 0 && pass1 !== pass2 ? 'Passwords don\'t match.' : '');
      });
      $('#D487FE72_8D95_4048_BEA3_252274862AF4,#EE1DA58C_3761_4734_A9C2_E808CDD7EE77').change(function () {
        var el1 = $('#D487FE72_8D95_4048_BEA3_252274862AF4');
        var el2 = $('#EE1DA58C_3761_4734_A9C2_E808CDD7EE77');
        var pass1 = el1.val();
        var pass2 = el2.val();
        el2.get(0).setCustomValidity(pass1.length > 0 && pass2.length > 0 && pass1 !== pass2 ? 'Passwords don\'t match.' : '');
      });
    });

    window.onmessage = function (e) {
      if (js_AMIRouter.getOriginURL().startsWith(e.origin)) {
        var promise;

        if ('oidc_code' in e.data) {
          js_AMIWebApp.lock();
          promise = js_AMICommand.signInByCode(e.data.oidc_code);
        } else if ('oidc_token' in e.data) {
          js_AMIWebApp.lock();
          promise = js_AMICommand.signInByToken(e.data.oidc_token);
        } else {
          return;
        }

        promise.fail(function (data, message, userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo) {
          AMIAuth_classPrivateFieldLooseBase(_this, _update)[_update](userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo).always(function () {
            js_AMIWebApp.error(message, true);
          });
        }).done(function (data, message, userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo) {
          AMIAuth_classPrivateFieldLooseBase(_this, _update)[_update](userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo).fail(function (message) {
            js_AMIWebApp.error(message, true);
          }).done(function () {
            if ((userInfo.AMIUser || 'guest') === (userInfo.guestUser || 'guest')) {
              js_AMIWebApp.error('Authentification failed', true);
            } else {
              $('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('hide');

              AMIAuth_classPrivateFieldLooseBase(AMIAuth, _clean)[_clean]();

              js_AMIWebApp.unlock();
            }
          });
        });
      }
    };

    var userdata = js_AMIRouter.getWebAppArgs()['userdata'] || '';
    js_AMICommand.signInByCertificate().fail(function (data, message, userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo) {
      AMIAuth_classPrivateFieldLooseBase(_this, _update)[_update](userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo).always(function () {
        result.reject(message);
      });
    }).done(function (data, message, userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo) {
      _internal_then(js_AMIWebApp.onReady(userdata), function () {
        js_AMIWebApp._isReady = true;

        AMIAuth_classPrivateFieldLooseBase(_this, _update)[_update](userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo).then(function (message) {
          result.resolve(message);
        }, function (message) {
          result.reject(message);
        });
      }, function (message) {
        js_AMIWebApp._isReady = true;

        AMIAuth_classPrivateFieldLooseBase(_this, _update)[_update](userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo).then(function () {
          result.reject(message);
        }, function () {
          result.reject(message);
        });
      });
    });
    return result;
  };

  _proto.getMqttEndpoint = function getMqttEndpoint() {
    return AMIAuth_classPrivateFieldLooseBase(this, _awfInfo)[_awfInfo].mqttEndpoint || '';
  };

  _proto.getMqttToken = function getMqttToken() {
    return AMIAuth_classPrivateFieldLooseBase(this, _awfInfo)[_awfInfo].mqttToken || '';
  };

  _proto.getUserInfo = function getUserInfo() {
    return AMIAuth_classPrivateFieldLooseBase(this, _userInfo)[_userInfo];
  };

  _proto.getRoleInfo = function getRoleInfo() {
    return AMIAuth_classPrivateFieldLooseBase(this, _roleInfo)[_roleInfo];
  };

  _proto.getBookmarkInfo = function getBookmarkInfo() {
    return AMIAuth_classPrivateFieldLooseBase(this, _bookmarkInfo)[_bookmarkInfo];
  };

  _proto.getDashboardInfo = function getDashboardInfo() {
    return AMIAuth_classPrivateFieldLooseBase(this, _dashboardInfo)[_dashboardInfo];
  };

  _proto.getAWFInfo = function getAWFInfo() {
    return AMIAuth_classPrivateFieldLooseBase(this, _awfInfo)[_awfInfo];
  };

  _proto.getUser = function getUser() {
    return AMIAuth_classPrivateFieldLooseBase(this, _userInfo)[_userInfo].AMIUser || 'guest';
  };

  _proto.getGuest = function getGuest() {
    return AMIAuth_classPrivateFieldLooseBase(this, _userInfo)[_userInfo].guestUser || 'guest';
  };

  _proto.getNotBeforeDate = function getNotBeforeDate() {
    return AMIAuth_classPrivateFieldLooseBase(this, _userInfo)[_userInfo].notBefore || '';
  };

  _proto.getNotAfterDate = function getNotAfterDate() {
    return AMIAuth_classPrivateFieldLooseBase(this, _userInfo)[_userInfo].notAfter || '';
  };

  _proto.getClientDN = function getClientDN() {
    return AMIAuth_classPrivateFieldLooseBase(this, _userInfo)[_userInfo].clientDNInSession || '';
  };

  _proto.getIssuerDN = function getIssuerDN() {
    return AMIAuth_classPrivateFieldLooseBase(this, _userInfo)[_userInfo].issuerDNInSession || '';
  };

  _proto.isValid = function isValid() {
    return (AMIAuth_classPrivateFieldLooseBase(this, _userInfo)[_userInfo].valid || 'false') !== 'false';
  };

  _proto.isAuthenticated = function isAuthenticated() {
    return this.getUser() !== this.getGuest();
  };

  _proto.hasRole = function hasRole(roleName) {
    return roleName in AMIAuth_classPrivateFieldLooseBase(this, _roleInfo)[_roleInfo];
  };

  _proto.update = function update() {
    var _this2 = this;

    js_AMIWebApp.lock();
    return js_AMICommand.signInByCertificate().done(function (data, message, userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo) {
      AMIAuth_classPrivateFieldLooseBase(_this2, _update)[_update](userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo).always(function () {
        js_AMIWebApp.unlock();
      });
    });
  };

  _proto.sso = function sso() {
    AMIAuth_classPrivateFieldLooseBase(AMIAuth, _clean)[_clean]();

    window.open(AMIAuth_classPrivateFieldLooseBase(this, _awfInfo)[_awfInfo].ssoAuthURL ? AMIAuth_classPrivateFieldLooseBase(this, _awfInfo)[_awfInfo].ssoAuthURL + "?response_type=code&client_id=" + encodeURIComponent(AMIAuth_classPrivateFieldLooseBase(this, _awfInfo)[_awfInfo].ssoClientId || '') + "&redirect_uri=" + encodeURIComponent(js_AMIRouter.getOriginURL()) + "/docs/sso.html" : js_AMIRouter.getOriginURL() + "/docs/sso_not_configured.html", AMIAuth_classPrivateFieldLooseBase(this, _awfInfo)[_awfInfo].ssoLabel || 'Single Sign-On', 'location=no, menubar=no, status=no, scrollbars=no, width=800, height=525');
  };

  _proto.signIn = function signIn() {
    AMIAuth_classPrivateFieldLooseBase(AMIAuth, _clean)[_clean]();

    if (AMIAuth_classPrivateFieldLooseBase(this, _flags)[_flags].captchaAllowed) {
      js_AMICommand.execute('GenerateCaptcha').then(function (data) {
        var image = js_AMIWebApp.jspath('..field{.@name==="image"}.$', data)[0] || '';
        var hash = js_AMIWebApp.jspath('..field{.@name==="hash"}.$', data)[0] || '';
        $('#AC9836E6_2A20_8711_39D5_0E8340561078').css('background-image', "url('" + image + "')");
        $('#EA79605C_6EFF_4C77_9D70_88254B00FD52').css('background-image', "url('" + image + "')");
        $('#FD95B3FA_C808_0E08_2D1E_0FE0E3871101').val(hash);
        $('#A63C0110_E591_6FCE_6D7A_02EEBC094199').val(hash);
        $('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('show');
      }, function (data, message) {
        js_AMIWebApp.error(message);
      });
    } else {
      $('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('show');
    }
  };

  _proto.signOut = function signOut() {
    var _this3 = this;

    js_AMIWebApp.lock();
    return js_AMICommand.signOut().always(function (data, message, userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo) {
      AMIAuth_classPrivateFieldLooseBase(_this3, _update)[_update](userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo).then(function () {
        js_AMIWebApp.unlock();
      }, function (message) {
        js_AMIWebApp.error(message, true);
      });
    });
  };

  _proto.changeInfo = function changeInfo() {
    AMIAuth_classPrivateFieldLooseBase(AMIAuth, _clean)[_clean]();

    $('#D9EAF998_ED8E_44D2_A0BE_8C5CF5E438BD').modal('show');
  };

  _proto.changePass = function changePass() {
    AMIAuth_classPrivateFieldLooseBase(AMIAuth, _clean)[_clean]();

    $('#E92A1097_983B_4857_875F_07E4659B41B0').modal('show');
  };

  _proto.changeCertificate = function changeCertificate() {
    AMIAuth_classPrivateFieldLooseBase(AMIAuth, _clean)[_clean]();

    $('#ECB92A89_A706_7C76_E248_E57D14C8B205').modal('show');
  };

  _proto.accountStatus = function accountStatus() {
    AMIAuth_classPrivateFieldLooseBase(AMIAuth, _clean)[_clean]();

    $('#AB1CB183_96EB_4116_8A9E_4409BE058F34').modal('show');
  };

  _proto.form_login = function form_login(e) {
    e.preventDefault();
    var values = $(e.target).serializeObject();
    return this.form_login2(values['username'], values['password']);
  };

  _proto.form_login2 = function form_login2(username, password) {
    var _this4 = this;

    var promise = username && password ? js_AMICommand.signInByPassword(username.trim(), password.trim()) : js_AMICommand.signInByCertificate();
    js_AMIWebApp.lock();
    promise.then(function (data, message, userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo) {
      AMIAuth_classPrivateFieldLooseBase(_this4, _update)[_update](userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo).then(function () {
        if ((userInfo.AMIUser || 'guest') !== (userInfo.guestUser || 'guest')) {
          $('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('hide');

          AMIAuth_classPrivateFieldLooseBase(AMIAuth, _clean)[_clean]();

          js_AMIWebApp.unlock();
        }
      }, function (message) {
        if ((userInfo.AMIUser || 'guest') !== (userInfo.guestUser || 'guest')) {
          $('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('hide');
          js_AMIWebApp.error(message, true);
        }
      });

      if ((userInfo.AMIUser || 'guest') === (userInfo.guestUser || 'guest')) {
        var _message = 'Authentication failed.';

        if (userInfo.clientDNInSession || userInfo.issuerDNInSession) {
          _message += "Client DN in session: " + js_AMIWebApp.textToHtml(userInfo.clientDNInSession) + "." + ("Issuer DN in session: " + js_AMIWebApp.textToHtml(userInfo.issuerDNInSession) + ".");
        }

        js_AMIWebApp.error(_message, true);
      }
    }, function (data, message, userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo) {
      AMIAuth_classPrivateFieldLooseBase(_this4, _update)[_update](userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo).always(function () {
        js_AMIWebApp.error(message, true);
      });
    });
    return promise;
  };

  _proto.form_addUser = function form_addUser(e) {
    e.preventDefault();
    var values = $(e.target).serializeObject();
    js_AMIWebApp.lock();
    js_AMICommand.addUser(values['username'], values['password'], values['first_name'], values['last_name'], values['email'], values['captcha_hash'], values['captcha_text'], 'attachCert' in values, 'agree' in values).then(function (data, message) {
      js_AMIWebApp.success(message, true);
    }, function (data, message) {
      js_AMIWebApp.error(message, true);
    });
  };

  _proto.form_remindPass = function form_remindPass(e) {
    e.preventDefault();
    var values = $(e.target).serializeObject();
    js_AMIWebApp.lock();
    js_AMICommand.resetPassword(values['username'], values['captcha_hash'], values['captcha_text']).then(function (data, message) {
      js_AMIWebApp.success(message, true);
    }, function (data, message) {
      js_AMIWebApp.error(message, true);
    });
  };

  _proto.form_changeInfo = function form_changeInfo(e) {
    e.preventDefault();
    var values = $(e.target).serializeObject();
    js_AMIWebApp.lock();
    js_AMICommand.changeInfo(values['first_name'], values['last_name'], values['email']).then(function (data, message) {
      js_AMIWebApp.success(message, true);
    }, function (data, message) {
      js_AMIWebApp.error(message, true);
    });
  };

  _proto.form_changePass = function form_changePass(e) {
    e.preventDefault();
    var values = $(e.target).serializeObject();
    js_AMIWebApp.lock();
    js_AMICommand.changePassword(AMIAuth_classPrivateFieldLooseBase(this, _userInfo)[_userInfo].AMIUser || 'guest', values['old_password'], values['new_password']).then(function (data, message) {
      js_AMIWebApp.success(message, true);
    }, function (data, message) {
      js_AMIWebApp.error(message, true);
    });
  };

  _proto.form_attachCert = function form_attachCert() {
    var _this5 = this;

    js_AMIWebApp.lock();
    return js_AMICommand.attachCertificate().then(function (data, message) {
      $('#C9297C00_920D_4AE6_8A20_B0DDB383CC6A').val(AMIAuth_classPrivateFieldLooseBase(_this5, _userInfo)[_userInfo].issuerDNInAMI = AMIAuth_classPrivateFieldLooseBase(_this5, _userInfo)[_userInfo].issuerDNInSession);
      $('#D4B29AC0_4867_815B_8657_5A1D623C29CF').val(AMIAuth_classPrivateFieldLooseBase(_this5, _userInfo)[_userInfo].clientDNInAMI = AMIAuth_classPrivateFieldLooseBase(_this5, _userInfo)[_userInfo].clientDNInSession);
      $('#DB0223B3_D721_7EEB_50B8_032A04C7D218').prop('disabled', true);
      $('#B39BA3DE_4BA7_CE2F_BB80_BB6F4A5CB2A2').prop('disabled', false);

      AMIAuth_classPrivateFieldLooseBase(_this5, _update)[_update](AMIAuth_classPrivateFieldLooseBase(_this5, _userInfo)[_userInfo], AMIAuth_classPrivateFieldLooseBase(_this5, _roleInfo)[_roleInfo], AMIAuth_classPrivateFieldLooseBase(_this5, _bookmarkInfo)[_bookmarkInfo], AMIAuth_classPrivateFieldLooseBase(_this5, _dashboardInfo)[_dashboardInfo], AMIAuth_classPrivateFieldLooseBase(_this5, _awfInfo)[_awfInfo]).then(function () {
        js_AMIWebApp.success(message, true);
      }, function (message) {
        js_AMIWebApp.error(message, true);
      });
    }, function (data, message) {
      js_AMIWebApp.error(message, true);
    });
  };

  _proto.form_detachCert = function form_detachCert() {
    var _this6 = this;

    js_AMIWebApp.lock();
    return js_AMICommand.detachCertificate().then(function (data, message) {
      $('#C9297C00_920D_4AE6_8A20_B0DDB383CC6A').val(AMIAuth_classPrivateFieldLooseBase(_this6, _userInfo)[_userInfo].issuerDNInAMI = '');
      $('#D4B29AC0_4867_815B_8657_5A1D623C29CF').val(AMIAuth_classPrivateFieldLooseBase(_this6, _userInfo)[_userInfo].clientDNInAMI = '');
      $('#DB0223B3_D721_7EEB_50B8_032A04C7D218').prop('disabled', !AMIAuth_classPrivateFieldLooseBase(_this6, _userInfo)[_userInfo].clientDNInSession || !AMIAuth_classPrivateFieldLooseBase(_this6, _userInfo)[_userInfo].issuerDNInSession);
      $('#B39BA3DE_4BA7_CE2F_BB80_BB6F4A5CB2A2').prop('disabled', true);

      AMIAuth_classPrivateFieldLooseBase(_this6, _update)[_update](AMIAuth_classPrivateFieldLooseBase(_this6, _userInfo)[_userInfo], AMIAuth_classPrivateFieldLooseBase(_this6, _roleInfo)[_roleInfo], AMIAuth_classPrivateFieldLooseBase(_this6, _bookmarkInfo)[_bookmarkInfo], AMIAuth_classPrivateFieldLooseBase(_this6, _dashboardInfo)[_dashboardInfo], AMIAuth_classPrivateFieldLooseBase(_this6, _awfInfo)[_awfInfo]).then(function () {
        js_AMIWebApp.success(message, true);
      }, function (message) {
        js_AMIWebApp.error(message, true);
      });
    }, function (data, message) {
      js_AMIWebApp.error(message, true);
    });
  };

  return AMIAuth;
}();

function _setupAWF2(awfInfo) {
  try {
    var result = JSON.parse(base64Decode(awfInfo.config));
    setDateTimeFormats(result['datetimePrecision'], result['datetimeFormat'], result['dateFormat'], result['timePrecision'], result['timeHMSFormat'], result['timeHMFormat']);
    return result;
  } catch (e) {
    return {};
  }
}

function _clean2() {
  $('#B7894CC1_1DAA_4A7E_B7D1_DBDF6F06AC73').trigger('reset');
  $('#EE055CD4_E58F_4834_8020_986AE3F8D67D').trigger('reset');
  $('#DA2047A2_9E5D_420D_B6E7_FA261D2EF10F').trigger('reset');
  $('#E92A1097_983B_4857_875F_07E4659B41B0').trigger('reset');
}

function _update2(userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo) {
  var result = $.Deferred();
  awfInfo = AMIAuth_classPrivateFieldLooseBase(AMIAuth, _setupAWF)[_setupAWF](awfInfo);
  $('#A09AE316_7068_4BC1_96A9_6B87D28863FE').prop('disabled', !userInfo.clientDNInSession || !userInfo.issuerDNInSession);
  $('#C3E94F6D_48E0_86C0_3534_691728E492F4').attr('src', awfInfo.privacyPolicyURL || js_AMIWebApp.originURL + "/docs/privacy_policy.html");
  $('#E50FF8BD_B0F5_CD72_F9DC_FC2BFA5DBA27').attr('src', awfInfo.privacyPolicyURL || js_AMIWebApp.originURL + "/docs/privacy_policy.html");

  var dict = _extends({}, AMIAuth_classPrivateFieldLooseBase(this, _flags)[_flags], {
    userInfo: AMIAuth_classPrivateFieldLooseBase(this, _userInfo)[_userInfo] = userInfo,
    roleInfo: AMIAuth_classPrivateFieldLooseBase(this, _roleInfo)[_roleInfo] = roleInfo,
    bookmarkInfo: AMIAuth_classPrivateFieldLooseBase(this, _bookmarkInfo)[_bookmarkInfo] = bookmarkInfo,
    dashboardInfo: AMIAuth_classPrivateFieldLooseBase(this, _dashboardInfo)[_dashboardInfo] = dashboardInfo,
    awfInfo: AMIAuth_classPrivateFieldLooseBase(this, _awfInfo)[_awfInfo] = awfInfo
  });

  var user = userInfo.AMIUser || 'guest';
  var guest = userInfo.guestUser || 'guest';

  if (user !== guest) {
    var firstName = userInfo.firstName || '';
    var lastName = userInfo.lastName || '';
    var email = userInfo.email || '';
    var clientDNInSession = userInfo.clientDNInSession || '';
    var issuerDNInSession = userInfo.issuerDNInSession || '';
    var clientDNInAMI = userInfo.clientDNInAMI || '';
    var issuerDNInAMI = userInfo.issuerDNInAMI || '';
    var notBefore = userInfo.notBefore || '';
    var notAfter = userInfo.notAfter || '';
    var valid = userInfo.valid || 'false';
    $('#E513F27D_5521_4B08_BF61_52AFB81356F7').val(firstName);
    $('#AFF0B5C0_BEEC_4842_916D_DCBA7F589195').val(lastName);
    $('#C587486B_62C0_4B6E_9288_D8F9F89D157B').val(email);
    $('#ABEB0291_40B0_414A_A42B_E7EABB9B487E').val(firstName);
    $('#A5AFDB62_1034_4F66_A3E6_9341B31FA290').val(lastName);
    $('#D730A774_05EA_47AB_A0C8_D92753802E3E').val(email);
    $('#FE2F6232_C256_4B80_939C_EBEC90320308').val(issuerDNInSession);
    $('#F42FAF6B_2C8D_4142_8BD9_E5BCDCAA05AA').val(issuerDNInAMI);
    $('#C76805D7_1E86_4231_9071_1D04783423BB').val(clientDNInSession);
    $('#D1BEE3BF_9161_41DC_BC53_C44FFE4D2522').val(clientDNInAMI);

    if (issuerDNInSession && clientDNInSession) {
      $('#C8B8F968_CCAA_26DF_8665_2B518189E3DE').val(issuerDNInSession);
      $('#A962ED59_DB71_C10C_6173_3615C6F48028').val(clientDNInSession);
      $('#DB0223B3_D721_7EEB_50B8_032A04C7D218').prop('disabled', issuerDNInSession === issuerDNInAMI && clientDNInSession === clientDNInAMI);
    } else {
      $('#C9297C00_920D_4AE6_8A20_B0DDB383CC6A').val('N/A');
      $('#D4B29AC0_4867_815B_8657_5A1D623C29CF').val('N/A');
      $('#DB0223B3_D721_7EEB_50B8_032A04C7D218').prop('disabled', true);
    }

    if (issuerDNInAMI && clientDNInAMI) {
      $('#C9297C00_920D_4AE6_8A20_B0DDB383CC6A').val(issuerDNInAMI);
      $('#D4B29AC0_4867_815B_8657_5A1D623C29CF').val(clientDNInAMI);
      $('#B39BA3DE_4BA7_CE2F_BB80_BB6F4A5CB2A2').prop('disabled', false);
    } else {
      $('#C9297C00_920D_4AE6_8A20_B0DDB383CC6A').val('N/A');
      $('#D4B29AC0_4867_815B_8657_5A1D623C29CF').val('N/A');
      $('#B39BA3DE_4BA7_CE2F_BB80_BB6F4A5CB2A2').prop('disabled', true);
    }

    var table = [];

    for (var role in roleInfo) {
      table.push('<tr>');
      table.push("<td>" + js_AMIWebApp.textToHtml(roleInfo[role].name || 'N/A') + "</td>");
      table.push("<td>" + js_AMIWebApp.textToHtml(roleInfo[role].description || 'N/A') + "</td>");
      table.push('</tr>');
    }

    $('#BB07676B_EACA_9B42_ED51_477DB2976041').html(table.join(''));
    var icon = '';
    var message = '';
    var bgColor;
    var fgColor;

    if (valid !== 'false') {
      if (!AMIAuth_classPrivateFieldLooseBase(this, _flags)[_flags].ssoAutoAuthentication) {
        if (clientDNInSession && clientDNInAMI && issuerDNInSession && issuerDNInAMI && (clientDNInSession !== clientDNInAMI || issuerDNInSession !== issuerDNInAMI)) {
          message = 'The X.509 certificate in the session differs from the one in AMI.';
        }
      }

      if (message) {
        $('#D944B01D_2E8D_4EE9_9DCC_2691438BBA16').html("<i class=\"bi bi-info-circle text-warning\"></i> " + message);
        icon = "\n<a class=\"nav-link text-warning\" href=\"javascript:amiLogin.accountStatus();\">\n\t<i class=\"bi bi-info-circle\"></i>\n</a>";
      }

      $('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').css('color', '#006400').html('<i class="bi bi-asterisk"></i> valid <i class="bi bi-asterisk"></i>').closest('.rounded').css('background', "#B8D49B url(\"" + certificate_green + "\") no-repeat center center").css('background-size', 'cover');
      $('#E91280F6_E7C6_3E53_A457_646995C99317').text("valid from " + (notBefore || 'N/A') + " to " + (notAfter || 'N/A'));
      bgColor = '#B8D49B';
      fgColor = '#006400';
    } else {
      if (!AMIAuth_classPrivateFieldLooseBase(this, _flags)[_flags].ssoAutoAuthentication) {
        message = 'Check your membership.';
      }

      if (message) {
        $('#D944B01D_2E8D_4EE9_9DCC_2691438BBA16').html("<i class=\"bi bi-info-circle text-danger\"></i> " + message);
        icon = "\n<a class=\"nav-link text-danger\" href=\"javascript:amiAuth.accountStatus();\">\n\t<i class=\"bi bi-info-circle\"></i>\n</a>";
      }

      $('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').css('color', '#DC3545').html('<i class="bi bi-asterisk"></i> invalid <i class="bi bi-asterisk"></i>').closest('.rounded').css('background', "#E8C8CF url(\"" + certificate_pink + "\") no-repeat center center").css('background-size', 'cover');
      $('#E91280F6_E7C6_3E53_A457_646995C99317').text("valid from " + (notBefore || 'N/A') + " to " + (notAfter || 'N/A'));
      bgColor = '#E8C8CF';
      fgColor = '#DC3545';
    }

    browser.toCanvas(document.getElementById('EC948084_8C0A_CEBF_58C9_086046AB2456'), user + "|" + firstName + " " + lastName + "|" + email + "|" + clientDNInAMI + "|" + issuerDNInAMI, {
      color: {
        dark: fgColor,
        light: bgColor
      },
      margin: 0,
      width: 150
    });
    dict['user'] = user;
    dict['icon'] = icon;
    js_AMIWebApp.replaceHTML('#ami_login_menu_content', sign_out_button, {
      dict: dict
    }).done(function () {
      triggerLogin().then(function () {
        result.resolve();
      }, function (message) {
        result.reject(message);
      });
    });
  } else {
    js_AMIWebApp.replaceHTML('#ami_login_menu_content', sign_in_button, {
      dict: dict
    }).done(function () {
      triggerLogout().then(function () {
        result.resolve();
      }, function (message) {
        result.reject(message);
      });
    });
  }

  return result.promise();
}

Object.defineProperty(AMIAuth, _clean, {
  value: _clean2
});
Object.defineProperty(AMIAuth, _setupAWF, {
  value: _setupAWF2
});
/* harmony default export */ const js_AMIAuth = (new AMIAuth());
;// CONCATENATED MODULE: ./src/js/utilities/subapps.js












var _subapps = {};

var _currentSubappInstance = new function () {
  this.onReady = function () {};

  this.onExit = function () {};

  this.onLogin = function () {};

  this.onLogout = function () {};
}();

var _currentUserdata = null;
function triggerLogin() {
  var result = $.Deferred();

  if (js_AMIWebApp._isReady) {
    _internal_then(_currentSubappInstance.onLogin(_currentUserdata), function (message) {
      _internal_always(js_AMIWebApp.onRefresh(true), function () {
        result.resolve(message);
      });
    }, function (message) {
      _internal_always(js_AMIWebApp.onRefresh(true), function () {
        result.reject(message);
      });
    });
  } else {
    result.resolve();
  }

  return result.promise();
}
function triggerLogout() {
  var result = $.Deferred();

  if (js_AMIWebApp._isReady) {
    _internal_then(_currentSubappInstance.onLogout(_currentUserdata), function (message) {
      _internal_always(js_AMIWebApp.onRefresh(false), function () {
        result.resolve(message);
      });
    }, function (message) {
      _internal_always(js_AMIWebApp.onRefresh(false), function () {
        result.reject(message);
      });
    });
  } else {
    result.resolve();
  }

  return result.promise();
}
function loadSubApp(subapp, userdata, options) {
  var result = $.Deferred();

  var _tools$setup = setup(['context', 'hash', 'cache'], [result, null, false], options),
      context = _tools$setup[0],
      hash = _tools$setup[1],
      cache = _tools$setup[2];

  result.always(function () {
    unlock();
  });
  lock();

  if (subapp.indexOf('subapp:') === 0) {
    subapp = subapp.substring(7);
  }

  var descr = _subapps[subapp.toLowerCase()];

  if (descr) {
    try {
      loadScripts(js_AMIRouter.getOriginURL() + "/" + descr.file, {
        cache: cache
      }).then(function () {
        _internal_always(_currentSubappInstance.onExit(userdata), function () {
          _currentSubappInstance = window[descr.instance];
          _currentUserdata = userdata;

          _internal_then(_currentSubappInstance.onReady(userdata), function () {
            var promise = js_AMIAuth.isAuthenticated() ? triggerLogin() : triggerLogout();
            promise.then(function () {
              js_AMIRouter.appendHistoryEntry({
                searchParams: {
                  'subapp': subapp,
                  'userdata': userdata
                },
                hash: hash
              });
              fillBreadcrumb(descr.breadcrumb);
              result.resolveWith(context, [_currentSubappInstance]);
            }, function (message) {
              result.rejectWith(context, ["cannot load subapp '" + subapp + "': " + message]);
            });
          }, function (message) {
            result.rejectWith(context, ["cannot load subapp '" + subapp + "': " + message]);
          });
        });
      }, function (message) {
        result.rejectWith(context, ["cannot load subapp '" + subapp + "': " + message]);
      });
    } catch (message) {
      result.rejectWith(context, ["cannot load subapp '" + subapp + "': " + message]);
    }
  } else {
    result.rejectWith(context, ["cannot load subapp '" + subapp + "': not found"]);
  }

  return result.promise();
}
function loadSubAppAlt(subapp, userdata, options) {
  loadSubApp(subapp, userdata, options).fail(function (message) {
    error(message);
  });
}
function loadSubAppByURL(defaultSubApp, defaultUserData) {
  var result = $.Deferred();
  var args = js_AMIRouter.getWebAppArgs();

  if (args['v']) {
    js_AMICommand.execute('GetHashInfo -hash=?', {
      params: [args['v']]
    }).fail(function (data, message) {
      result.reject(message);
    }).done(function (data) {
      var json;

      try {
        json = JSON.parse(jspath_default().apply('..field{.@name==="json"}.$', data)[0] || '{}');
      } catch (message) {
        json = {};
      }

      var subapp = json['subapp'] || defaultSubApp;
      var userdata = json['userdata'] || defaultUserData;
      loadSubApp(subapp, userdata, {
        defaultSubApp: defaultSubApp
      }).then(function () {
        result.resolve();
      }, function (message) {
        result.reject(message);
      });
    });
  } else {
    if (!js_AMIRouter.check()) {
      var subapp = args['subapp'] || defaultSubApp;
      var userdata = args['userdata'] || defaultUserData;
      loadSubApp(subapp, userdata).then(function () {
        result.resolve();
      }, function (message) {
        result.reject(message);
      });
    }
  }

  return result.promise();
}
;// CONCATENATED MODULE: ./src/js/AMIExtension.js



/* harmony default export */ function AMIExtension() {
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (s) {
      var base = 0x00000000000000000000;
      return this.indexOf(s, base) === base;
    };
  }

  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (s) {
      var base = this.length - s.length;
      return this.indexOf(s, base) === base;
    };
  }

  if (!String.prototype.hashCode) {
    String.prototype.hashCode = function () {
      var hash = 0;

      for (var i = 0; i < this.length; i++) {
        hash = (hash << 5) - hash + this.charCodeAt(i);
        hash |= 0;
      }

      return hash < 0 ? -hash : +hash;
    };
  }

  var _ami_internal_jQueryAjax = jQuery.ajax;

  jQuery.ajax = function (options) {
    if (typeof options === 'object' && options.dataType === 'sheet') {
      var result = $.Deferred();

      var _tools$setup = setup(['context', 'media', 'url'], [result, 'screen', ''], options),
          context = _tools$setup[0],
          media = _tools$setup[1],
          url = _tools$setup[2];

      if (url) {
        $(document.createElement('link')).attr({
          rel: 'stylesheet',
          type: 'text/css',
          media: media,
          href: url
        }).on('load', function () {
          result.resolveWith(context);
        }).on('error', function () {
          result.rejectWith(context);
        }).appendTo('head');
      } else {
        result.rejectWith(context);
      }

      return result.promise();
    } else {
      return _ami_internal_jQueryAjax.apply(this, arguments);
    }
  };

  var _ami_internal_jQueryVal = jQuery.fn.val;
  var _ami_internal_jQueryRemove = jQuery.fn.remove;

  var _ami_internal_jQueryRemoveEvent = new jQuery.Event('remove');

  jQuery.fn.extend({
    serializeObject: function serializeObject() {
      var result = {};
      this.serializeArray().forEach(function (item) {
        if (item.name in result) {
          if (Object.prototype.toString.call(result[item.name]) === '[object String]') {
            result[item.name] = [result[item.name]];
          }

          result[item.name].push(item.value || '');
        } else {
          result[item.name] = item.value || '';
        }
      });
      return result;
    },
    val: function val() {
      if (arguments.length === 0) {
          if (this.hasClass('form-editor-done')) {
            var editor = this.data('editor');
            if (editor) return editor.getValue();
            return '';
          }
        } else if (arguments.length === 1) {
          if (this.hasClass('form-editor-done')) {
            var _editor = this.data('editor');

            if (_editor) _editor.setValue(arguments[0]);
            return this;
          }
        }

      return _ami_internal_jQueryVal.apply(this, arguments);
    },
    remove: function remove() {
      $(this).trigger(_ami_internal_jQueryRemoveEvent);
      return _ami_internal_jQueryRemove.apply(this, arguments);
    }
  });
}
;// CONCATENATED MODULE: ./src/js/AMIInterface.js







function _setupCtx(ctxImmutables, ctxDefaults, ctxOptions, ctx, immutables, defaults, options) {
  if (options) {
    for (var _i = 0, _Object$entries = Object.entries(options); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _Object$entries[_i],
          key = _Object$entries$_i[0],
          val = _Object$entries$_i[1];
      ctxOptions[key] = val;
      ctx[key] = val;
    }
  }

  if (defaults) {
    for (var _i2 = 0, _Object$entries2 = Object.entries(defaults); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _Object$entries2[_i2],
          _key = _Object$entries2$_i[0],
          _val = _Object$entries2$_i[1];

      if (!(_key in ctx)) {
        if (_key !== 'context') {
          ctxDefaults[_key] = _val;
          ctxOptions[_key] = _val;
        }

        ctx[_key] = _val;
      }
    }
  }

  if (immutables) {
    for (var _i3 = 0, _Object$entries3 = Object.entries(immutables); _i3 < _Object$entries3.length; _i3++) {
      var _Object$entries3$_i = _Object$entries3[_i3],
          _key2 = _Object$entries3$_i[0],
          _val2 = _Object$entries3$_i[1];
      ctxImmutables[_key2] = _val2;
      ctx[_key2] = _val2;
    }
  }

  ctx.httpEndpoint = js_AMICommand.getHttpEndpoint();
  ctx.mqttEndpoint = js_AMICommand.getMqttEndpoint();
  return ctx;
}

/* harmony default export */ function AMIInterface() {
  $AMIInterface('ami.IControl', {
    onReady: function onReady() {},
    onRemove: function onRemove() {},
    patchId: function patchId(id) {},
    replaceHTML: function replaceHTML(selector, twig, options) {},
    prependHTML: function prependHTML(selector, twig, options) {},
    appendHTML: function appendHTML(selector, twig, options) {}
  });
  $AMIInterface('ami.IContainer', {
    render: function render(selector, options) {},
    prependItem: function prependItem(title, options) {},
    appendItem: function appendItem(title, options) {},
    removeItem: function removeItem(itemId) {},
    removeAllItems: function removeAllItems() {},
    isEmpty: function isEmpty() {}
  });
  $AMIClass('ami.Control', {
    $implements: [ami.IControl],
    $: function $() {
      ami.Control._instanceScopeCnt = 1;
    },
    $init: function $init(parent, owner) {
      this.ctxImmutables = {};
      this.ctxDefaults = {};
      this.ctxOptions = {};
      this.ctx = {};
      this._parent = parent || this;
      this._owner = owner || this;
      this._instanceScope = ami.Control._instanceScopeCnt++;
    },
    onReady: function onReady() {},
    onRemove: function onRemove() {},
    setParent: function setParent(parent) {
      return this._parent = parent || this;
    },
    getParent: function getParent() {
      return this._parent;
    },
    setOwner: function setOwner(owner) {
      return this._owner = owner || this;
    },
    getOwner: function getOwner() {
      return this._owner;
    },
    setSelector: function setSelector(selector) {
      var _this = this;

      if (selector) {
        $(selector).off('remove').on('remove', function () {
          _this.onRemove();
        });
      }

      return this._selector = selector || '';
    },
    getSelector: function getSelector() {
      return this._selector;
    },
    setupCtx: function setupCtx(immutables, defaults, options) {
      return _setupCtx(this.ctxImmutables, this.ctxDefaults, this.ctxOptions, this.ctx, immutables, defaults, options);
    },
    patchId: function patchId(id) {
      return id + "_scope" + this._instanceScope;
    },
    replaceHTML: function replaceHTML(selector, twig, options) {
      options = options || {};
      options.scope = this._instanceScope;
      return view_replaceHTML(selector, twig, options);
    },
    prependHTML: function prependHTML(selector, twig, options) {
      options = options || {};
      options.scope = this._instanceScope;
      return view_prependHTML(selector, twig, options);
    },
    appendHTML: function appendHTML(selector, twig, options) {
      options = options || {};
      options.scope = this._instanceScope;
      return view_appendHTML(selector, twig, options);
    },
    createControl: function createControl(parent, control, params, options) {
      return controls_createControl(parent, this, control, params, options);
    },
    createControlInBody: function createControlInBody(parent, control, controlParams, controlOptions, options) {
      return controls_createControlInBody(parent, this, control, controlParams, controlOptions, this.ctx, options);
    },
    createControlInContainer: function createControlInContainer(parent, control, controlParams, controlOptions, icon, title, options) {
      return controls_createControlInContainer(parent, this, control, controlParams, controlOptions, this.ctx, icon, title, options);
    },
    createControlFromWebLink: function createControlFromWebLink(parent, el, options) {
      return controls_createControlFromWebLink(parent, this, el, this.ctx, options);
    }
  });
  $AMIInterface('ami.ISubApp', {
    onReady: function onReady(userdata) {},
    onExit: function onExit(userdata) {},
    onLogin: function onLogin(userdata) {},
    onLogout: function onLogout(userdata) {}
  });
  $AMIClass('ami.SubApp', {
    $implements: [ami.ISubApp],
    $init: function $init() {
      this.ctxImmutables = {};
      this.ctxDefaults = {};
      this.ctxOptions = {};
      this.ctx = {};
    },
    onReady: function onReady() {},
    onExit: function onExit() {},
    onLogin: function onLogin() {},
    onLogout: function onLogout() {},
    setupCtx: function setupCtx(immutables, defaults, options) {
      return _setupCtx(this.ctxImmutables, this.ctxDefaults, this.ctxOptions, this.ctx, immutables, defaults, options);
    },
    createControl: function createControl(parent, control, params, options) {
      return controls_createControl(parent, this, control, params, options);
    },
    createControlInBody: function createControlInBody(parent, control, controlParams, controlOptions, options) {
      return controls_createControlInBody(parent, this, control, controlParams, controlOptions, this.ctx, options);
    },
    createControlInContainer: function createControlInContainer(parent, control, controlParams, controlOptions, icon, title, options) {
      return controls_createControlInContainer(parent, this, control, controlParams, controlOptions, this.ctx, icon, title, options);
    },
    createControlFromWebLink: function createControlFromWebLink(parent, el, options) {
      return controls_createControlFromWebLink(parent, this, el, this.ctx, options);
    }
  });
}
// EXTERNAL MODULE: ./src/images/lpsc.png
var lpsc = __webpack_require__(4998);
// EXTERNAL MODULE: ./src/images/cloud.png
var cloud = __webpack_require__(3507);
// EXTERNAL MODULE: ./src/images/glass.png
var glass = __webpack_require__(1067);
// EXTERNAL MODULE: ./src/images/padlock.png
var padlock = __webpack_require__(8475);
// EXTERNAL MODULE: ./src/images/logo.png
var logo = __webpack_require__(1702);
// EXTERNAL MODULE: ./src/images/background.jpg
var background = __webpack_require__(7122);
// EXTERNAL MODULE: ./src/images/sign_in_image.jpg
var sign_in_image = __webpack_require__(5546);
;// CONCATENATED MODULE: ./src/js/AMIWebApp.js


function AMIWebApp_classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var AMIWebApp_id = 0;

function AMIWebApp_classPrivateFieldLooseKey(name) { return "__private_" + AMIWebApp_id++ + "_" + name; }

























var _embedded = AMIWebApp_classPrivateFieldLooseKey("embedded");

var _noBootstrap = AMIWebApp_classPrivateFieldLooseKey("noBootstrap");

var _noMoment = AMIWebApp_classPrivateFieldLooseKey("noMoment");

var _noSelect = AMIWebApp_classPrivateFieldLooseKey("noSelect2");

var _globalDeferred = AMIWebApp_classPrivateFieldLooseKey("globalDeferred");

var AMIWebApp = function () {
  function AMIWebApp() {
    var _this = this;

    Object.defineProperty(this, _embedded, {
      writable: true,
      value: false
    });
    Object.defineProperty(this, _noBootstrap, {
      writable: true,
      value: false
    });
    Object.defineProperty(this, _noMoment, {
      writable: true,
      value: false
    });
    Object.defineProperty(this, _noSelect, {
      writable: true,
      value: false
    });
    Object.defineProperty(this, _globalDeferred, {
      writable: true,
      value: $.Deferred()
    });
    this._isReady = false;
    this.webAppURL = '';
    this.scriptURL = '';
    this.originURL = '';
    this.args = {};
    this.hash = '';
    this.bootstrapVersion = 4;
    this._internal_then = _internal_then;
    this._internal_always = _internal_always;
    this.typeOf = typeOf;
    this.asArray = asArray;
    this.isString = isString;
    this.isArray = isArray;
    this.isObject = isObject;
    this.isSet = isSet;
    this.isMap = isMap;
    this.setupParams = setupParams;
    this.setup = setup;
    this.getStack = getStack;
    this.lock = lock;
    this.unlock = unlock;
    this.modalEnter = modalEnter;
    this.modalLeave = modalLeave;
    this.canLeave = canLeave;
    this.error = error;
    this.info = info;
    this.success = success;
    this.warning = warning;
    this.flush = flush;
    this.base64Encode = base64Encode;
    this.base64Decode = base64Decode;
    this.textToHtml = textToHtml;
    this.htmlToText = htmlToText;
    this.textToString = textToString;
    this.stringToText = stringToText;
    this.htmlToString = htmlToString;
    this.stringToHtml = stringToHtml;
    this.textToSQL = textToSQL;
    this.sqlToText = sqlToText;
    this.fillBreadcrumb = fillBreadcrumb;
    this.replaceHTML = view_replaceHTML;
    this.prependHTML = view_prependHTML;
    this.appendHTML = view_appendHTML;
    this.parentHTML = parentHTML;
    this.formatTWIG = formatTWIG;
    this.renderJSDoc = renderJSDoc;
    this.jspath = (jspath_default()).apply;
    this.loadResources = loadResources;
    this.loadSheets = loadSheets;
    this.loadScripts = loadScripts;
    this.loadJSONs = loadJSONs;
    this.loadXMLs = loadXMLs;
    this.loadHTMLs = loadHTMLs;
    this.loadTWIGs = loadTWIGs;
    this.loadTexts = loadTexts;
    this._subapps = _subapps;
    this.loadSubApp = loadSubApp;
    this.loadSubAppAlt = loadSubAppAlt;
    this.loadSubAppByURL = loadSubAppByURL;
    this._controls = _controls;
    this.loadControl = loadControl;
    this.createControl = controls_createControl;
    this.createControlInBody = controls_createControlInBody;
    this.createControlInContainer = controls_createControlInContainer;
    this.createControlFromWebLink = controls_createControlFromWebLink;
    $AMINamespace('ami', {
      awf: {
        buildVersion: '2.0.0',
        commitIdAbbrev: '{{AMI_COMMIT_ID}}',
        command: js_AMICommand,
        router: js_AMIRouter,
        webapp: this,
        auth: js_AMIAuth
      },
      vue: {
        version: 'N/A'
      }
    });
    AMIExtension();
    AMIInterface();
    var scriptArgs = js_AMIRouter.getScriptArgs();
    AMIWebApp_classPrivateFieldLooseBase(this, _embedded)[_embedded] = 'embedded' in scriptArgs;
    AMIWebApp_classPrivateFieldLooseBase(this, _noBootstrap)[_noBootstrap] = 'nobootstrap' in scriptArgs;
    AMIWebApp_classPrivateFieldLooseBase(this, _noSelect)[_noSelect] = 'noselect2' in scriptArgs;
    AMIWebApp_classPrivateFieldLooseBase(this, _noMoment)[_noMoment] = 'nomoment' in scriptArgs;
    this.webAppURL = js_AMIRouter.getWebAppURL();
    this.scriptURL = js_AMIRouter.getScriptURL();
    this.originURL = js_AMIRouter.getOriginURL();
    this.args = js_AMIRouter.getWebAppArgs();
    this.hash = js_AMIRouter.getWebAppHash();
    this.bootstrapVersion = parseInt(scriptArgs.bootstrap);

    if (Number.isNaN(this.bootstrapVersion)) {
      this.bootstrapVersion = 4;
    }

    var resourcesCSS = [];
    var resourcesJS = [];

    if (!AMIWebApp_classPrivateFieldLooseBase(this, _noBootstrap)[_noBootstrap] && typeof jQuery.fn.modal !== 'function') {
      if (this.bootstrapVersion === 4) {
        resourcesJS.push(this.originURL + "/js/assets/css/bootstrap4.min.css");
        resourcesJS.push(this.originURL + "/js/assets/js/bootstrap4.bundle.min.js");
      } else {
        resourcesJS.push(this.originURL + "/js/assets/css/bootstrap5.min.css");
        resourcesJS.push(this.originURL + "/js/assets/js/bootstrap5.bundle.min.js");
      }
    }

    if (!AMIWebApp_classPrivateFieldLooseBase(this, _noSelect)[_noSelect] && typeof jQuery.fn.select2 !== 'function') {
      resourcesCSS.push(this.originURL + "/js/assets/css/select2.min.css");
      resourcesJS.push(this.originURL + "/js/assets/js/select2.min.js");
    }

    if (!AMIWebApp_classPrivateFieldLooseBase(this, _noMoment)[_noMoment] && typeof window.moment !== 'function') {
      resourcesJS.push(this.originURL + "/js/assets/js/moment.min.js");
    }

    loadResources([].concat(resourcesCSS, resourcesJS), {
      cache: true
    }).done(function (resources) {
      window.JSPath = (jspath_default());

      __webpack_require__(7371);

      __webpack_require__(2340)(window.moment);

      AMIWebApp_classPrivateFieldLooseBase(_this, _globalDeferred)[_globalDeferred].resolve(resources);
    }).fail(function (message) {
      AMIWebApp_classPrivateFieldLooseBase(_this, _globalDeferred)[_globalDeferred].reject(message);
    });
  }

  var _proto = AMIWebApp.prototype;

  _proto.isEmbedded = function isEmbedded() {
    return AMIWebApp_classPrivateFieldLooseBase(this, _embedded)[_embedded];
  };

  _proto.onReady = function onReady(userdata) {
    if (!AMIWebApp_classPrivateFieldLooseBase(this, _embedded)[_embedded]) {
      alert('error: \'amiWebApp.onReady()\' must be overloaded!');
    }

    return null;
  };

  _proto.onRefresh = function onRefresh(isAuth) {
    if (!AMIWebApp_classPrivateFieldLooseBase(this, _embedded)[_embedded]) {
      alert('error: \'amiWebApp.onRefresh()\' must be overloaded!');
    }

    return null;
  };

  _proto.start = function start(options) {
    var _this2 = this;

    AMIWebApp_classPrivateFieldLooseBase(this, _globalDeferred)[_globalDeferred].done(function () {
      var _tools$setup = setup(['logo_url', 'background_url', 'sign_in_image_url', 'home_url', 'contact_email', 'about_url', 'default_theme_url', 'dashboard_theme_url', 'locker_url', 'endpoint_url', 'sign_in_text', 'sso_auto_authentication', 'sso_authentication_allowed', 'password_authentication_allowed', 'certificate_authentication_allowed', 'sign_out_allowed', 'create_account_allowed', 'change_info_allowed', 'change_password_allowed', 'change_certificate_allowed', 'captcha_allowed', 'bookmarks_allowed', 'dashboards_allowed'], [logo, background, sign_in_image, _this2.webAppURL, 'ami@lpsc.in2p3.fr', 'https://cern.ch/ami/', _this2.originURL + "/twig/v" + _this2.bootstrapVersion + "/Themes/blue.twig", _this2.originURL + "/twig/v" + _this2.bootstrapVersion + "/Themes/cloud.twig", _this2.originURL + "/twig/v" + _this2.bootstrapVersion + "/Lockers/default.twig", _this2.originURL + "/AMI/FrontEnd", 'Welcome in AMI!', false, false, true, true, true, true, true, true, true, true, true, true], options),
          logoURL = _tools$setup[0],
          backgroundURL = _tools$setup[1],
          signInImageURL = _tools$setup[2],
          homeURL = _tools$setup[3],
          contactEmail = _tools$setup[4],
          aboutURL = _tools$setup[5],
          defaultThemeURL = _tools$setup[6],
          dashboardThemeURL = _tools$setup[7],
          lockerURL = _tools$setup[8],
          endpointURL = _tools$setup[9],
          signInText = _tools$setup[10],
          ssoAutoAuthentication = _tools$setup[11],
          ssoAuthenticationAllowed = _tools$setup[12],
          passwordAuthenticationAllowed = _tools$setup[13],
          certificateAuthenticationAllowed = _tools$setup[14],
          signOutAllowed = _tools$setup[15],
          createAccountAllowed = _tools$setup[16],
          changeInfoAllowed = _tools$setup[17],
          changePasswordAllowed = _tools$setup[18],
          changeCertificateAllowed = _tools$setup[19],
          captchaAllowed = _tools$setup[20],
          bookmarksAllowed = _tools$setup[21],
          dashboardsAllowed = _tools$setup[22];

      js_AMICommand.initHttpClient(endpointURL);

      window.onbeforeunload = function (e) {
        if (!_canLeave) {
          var f = e || window.event;

          if (f) {
            f.returnValue = 'Confirm that you want to leave this page?';
          }

          return 'Confirm that you want to leave this page?';
        }
      };

      var controlsURL = _this2.originURL + "/controls/CONTROLS.json";
      var subappsURL = _this2.originURL + "/subapps/SUBAPPS.json";
      $.ajax({
        url: controlsURL,
        cache: false,
        crossDomain: true,
        dataType: 'json'
      }).then(function (data1) {
        $.ajax({
          url: subappsURL,
          cache: false,
          crossDomain: true,
          dataType: 'json'
        }).then(function (data2) {
          for (var name in data1) {
            _controls[name.toLowerCase()] = data1[name];
          }

          for (var _name in data2) {
            _subapps[_name.toLowerCase()] = data2[_name];
          }

          if (!AMIWebApp_classPrivateFieldLooseBase(_this2, _embedded)[_embedded]) {
            var dict = {
              LOGO_URL: logoURL,
              BACKGROUND_URL: backgroundURL,
              HOME_URL: homeURL,
              CONTACT_EMAIL: contactEmail,
              ABOUT_URL: aboutURL
            };
            var themeURL = (js_AMIRouter.getWebAppArgs()['subapp'] || '').toLowerCase() === 'userdashboard' ? dashboardThemeURL : defaultThemeURL;
            $.ajax({
              url: themeURL,
              cache: true,
              crossDomain: true,
              dataType: 'text'
            }).then(function (data3) {
              $.ajax({
                url: lockerURL,
                cache: true,
                crossDomain: true,
                dataType: 'text'
              }).then(function (data4) {
                $('body').append(formatTWIG(data3, dict) + data4).promise().done(function () {
                  lock();
                  js_AMIAuth.init(signInImageURL, signInText, ssoAutoAuthentication, ssoAuthenticationAllowed, passwordAuthenticationAllowed, certificateAuthenticationAllowed, signOutAllowed, createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed, captchaAllowed, bookmarksAllowed, dashboardsAllowed).done(function () {
                    unlock();
                  }).fail(function (message) {
                    error(message);
                  });
                });
              }, function () {
                alert("could not open '" + lockerURL + "', please reload the page...");
              });
            }, function () {
              alert("could not open '" + themeURL + "', please reload the page...");
            });
          } else {
            var data3 = '';

            if ($('#ami_alert_content').length === 0) {
              data3 += '<div id="ami_alert_content"></div>';
            }

            if ($('#ami_login_menu_content').length === 0) {
              data3 += '<div id="ami_login_menu_content"></div>';
            }

            $.ajax({
              url: lockerURL,
              cache: true,
              crossDomain: true,
              dataType: 'text'
            }).done(function (data4) {
              $('body').prepend(data3 + data4).promise().done(function () {
                lock();
                js_AMIAuth.init(signInImageURL, signInText, ssoAutoAuthentication, ssoAuthenticationAllowed, passwordAuthenticationAllowed, certificateAuthenticationAllowed, signOutAllowed, createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed, captchaAllowed, bookmarksAllowed, dashboardsAllowed).done(function () {
                  unlock();
                }).fail(function (message) {
                  error(message);
                });
              });
            });
          }
        }, function () {
          alert("cannot open '" + subappsURL + "', please reload the page...");
        });
      }, function () {
        alert("cannot open '" + controlsURL + "', please reload the page...");
      });
    }).fail(function (message) {
      alert(message);
    });

    return this;
  };

  return AMIWebApp;
}();

/* harmony default export */ const js_AMIWebApp = (new AMIWebApp());
;// CONCATENATED MODULE: ./src/js/AMIDoc.js


/* harmony default export */ const AMIDoc = ({
  "namespaces": [{
    "name": "amiAuth",
    "alias": "amiLogin",
    "desc": "The AMI authentication subsystem",
    "implements": [],
    "inherits": [],
    "functions": [{
      "name": "getMqttEndpoint",
      "alias": "",
      "desc": "Gets the current MQTT endpoint",
      "params": [],
      "returns": [{
        "type": ["string"],
        "desc": "The current MQTT endpoint"
      }]
    }, {
      "name": "getMqttToken",
      "alias": "",
      "desc": "Gets the current MQTT token",
      "params": [],
      "returns": [{
        "type": ["string"],
        "desc": "The current MQTT token"
      }]
    }, {
      "name": "getUserInfo",
      "alias": "",
      "desc": "Gets the current user information",
      "params": [],
      "returns": [{
        "type": ["Object.<string, *>"],
        "desc": "The current user information"
      }]
    }, {
      "name": "getRoleInfo",
      "alias": "",
      "desc": "Gets the current role information",
      "params": [],
      "returns": [{
        "type": ["Object.<string, *>"],
        "desc": "The current role information"
      }]
    }, {
      "name": "getBookmarkInfo",
      "alias": "",
      "desc": "Gets the current bookmark information",
      "params": [],
      "returns": [{
        "type": ["Object.<string, *>"],
        "desc": "The current bookmark information"
      }]
    }, {
      "name": "getDashboardInfo",
      "alias": "",
      "desc": "Gets the current dashboard information",
      "params": [],
      "returns": [{
        "type": ["Object.<string, *>"],
        "desc": "The current dashboard information"
      }]
    }, {
      "name": "getAWFInfo",
      "alias": "",
      "desc": "Gets the current AMI Web Framework information",
      "params": [],
      "returns": [{
        "type": ["Object.<string, *>"],
        "desc": "The current AMI Web Framework information"
      }]
    }, {
      "name": "getUser",
      "alias": "",
      "desc": "Gets the current user",
      "params": [],
      "returns": [{
        "type": ["string"],
        "desc": "The current user"
      }]
    }, {
      "name": "getGuest",
      "alias": "",
      "desc": "Gets the current guest user",
      "params": [],
      "returns": [{
        "type": ["string"],
        "desc": "The current guest user"
      }]
    }, {
      "name": "getNotBeforeDate",
      "alias": "",
      "desc": "Gets the current user `not before` date",
      "params": [],
      "returns": [{
        "type": ["string"],
        "desc": "The current user `not before` date"
      }]
    }, {
      "name": "getNotAfterDate",
      "alias": "",
      "desc": "Gets the current user `not after` date",
      "params": [],
      "returns": [{
        "type": ["string"],
        "desc": "The current user `not after` date"
      }]
    }, {
      "name": "getClientDN",
      "alias": "",
      "desc": "Gets the current client DN",
      "params": [],
      "returns": [{
        "type": ["string"],
        "desc": "The current client DN"
      }]
    }, {
      "name": "getIssuerDN",
      "alias": "",
      "desc": "Gets the current issuer DN",
      "params": [],
      "returns": [{
        "type": ["string"],
        "desc": "The current issuer DN"
      }]
    }, {
      "name": "isValid",
      "alias": "",
      "desc": "Checks whether the user is valid or not",
      "params": [],
      "returns": [{
        "type": ["boolean"],
        "desc": ""
      }]
    }, {
      "name": "isAuthenticated",
      "alias": "",
      "desc": "Checks whether the user is authenticated or not",
      "params": [],
      "returns": [{
        "type": ["boolean"],
        "desc": ""
      }]
    }, {
      "name": "hasRole",
      "alias": "",
      "desc": "Checks whether the user has the given role or not",
      "params": [{
        "name": "roleName",
        "type": ["string"],
        "desc": "the role",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["boolean"],
        "desc": ""
      }]
    }, {
      "name": "update",
      "alias": "",
      "desc": "Update the user information",
      "params": [],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "sso",
      "alias": "",
      "desc": "Opens the SSO popup window",
      "params": []
    }, {
      "name": "signIn",
      "alias": "",
      "desc": "Signs in",
      "params": []
    }, {
      "name": "signOut",
      "alias": "",
      "desc": "Signs out",
      "params": []
    }, {
      "name": "changeInfo",
      "alias": "",
      "desc": "Opens the 'Change Info' modal window",
      "params": []
    }, {
      "name": "changePass",
      "alias": "",
      "desc": "Opens the 'Change Password' modal window",
      "params": []
    }, {
      "name": "changeCertificate",
      "alias": "",
      "desc": "Opens the 'Change Certificate' modal window",
      "params": []
    }, {
      "name": "accountStatus",
      "alias": "",
      "desc": "Opens the 'Account Status' modal window",
      "params": []
    }]
  }, {
    "name": "amiCommand",
    "alias": "",
    "desc": "The AMI command subsystem",
    "implements": [],
    "inherits": [],
    "functions": [{
      "name": "initHttpClient",
      "alias": "",
      "desc": "Initializes the HTTP client",
      "params": [{
        "name": "endpoint",
        "type": ["string"],
        "desc": "the HTTP endpoint",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }, {
      "name": "initMqttClient",
      "alias": "",
      "desc": "Initializes the MQTT client",
      "params": [{
        "name": "endpoint",
        "type": ["string"],
        "desc": "the MQTT endpoint",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }, {
      "name": "getHttpEndpoint",
      "alias": "",
      "desc": "Gets the HTTP endpoint",
      "params": [],
      "returns": [{
        "type": ["string"],
        "desc": ""
      }]
    }, {
      "name": "getMqttEndpoint",
      "alias": "",
      "desc": "Gets the MQTT endpoint",
      "params": [],
      "returns": [{
        "type": ["string"],
        "desc": ""
      }]
    }, {
      "name": "execute",
      "alias": "",
      "desc": "Executes an AMI command",
      "params": [{
        "name": "command",
        "type": ["string"],
        "desc": "the command",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (mqtt, endpoint, serverName, converter, extras, params, context, timeout)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "mqttSignInByToken",
      "alias": "",
      "desc": "Signs in by JWT token (MQTT client)",
      "params": [{
        "name": "token",
        "type": ["string"],
        "desc": "the password",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "serverName",
        "type": ["string"],
        "desc": "the server name",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "mqttSignOut",
      "alias": "",
      "desc": "Signs out (MQTT client)",
      "params": [{
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "signInByCode",
      "alias": "",
      "desc": "Signs in by code (HTTP client)",
      "params": [{
        "name": "code",
        "type": ["string"],
        "desc": "the code",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "signInByToken",
      "alias": "",
      "desc": "Signs in by token (HTTP client)",
      "params": [{
        "name": "token",
        "type": ["string"],
        "desc": "the token",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "signInByPassword",
      "alias": "",
      "desc": "Signs in by login/password (HTTP client)",
      "params": [{
        "name": "username",
        "type": ["string"],
        "desc": "the username",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "password",
        "type": ["string"],
        "desc": "the password",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "signInByCertificate",
      "alias": "",
      "desc": "Signs in by certificate (HTTP client)",
      "params": [{
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "signOut",
      "alias": "",
      "desc": "Signs out (HTTP client)",
      "params": [{
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "attachCertificate",
      "alias": "",
      "desc": "Attaches a certificate",
      "params": [{
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "detachCertificate",
      "alias": "",
      "desc": "Detaches a certificate",
      "params": [{
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "addUser",
      "alias": "",
      "desc": "Adds a new username",
      "params": [{
        "name": "username",
        "type": ["string"],
        "desc": "the username",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "password",
        "type": ["string"],
        "desc": "the password",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "firstName",
        "type": ["string"],
        "desc": "the first name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "lastName",
        "type": ["string"],
        "desc": "the last name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "email",
        "type": ["string"],
        "desc": "the email",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "captchaHash",
        "type": ["string"],
        "desc": "the captcha hash generated by AMI",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "captchaText",
        "type": ["string"],
        "desc": "the captcha text entered by the username",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "attachCert",
        "type": ["boolean"],
        "desc": "attach the current certificate",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "agree",
        "type": ["boolean"],
        "desc": "agree with the terms and conditions",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "changeInfo",
      "alias": "",
      "desc": "Changes the account information",
      "params": [{
        "name": "firstName",
        "type": ["string"],
        "desc": "the first name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "lastName",
        "type": ["string"],
        "desc": "the last name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "email",
        "type": ["string"],
        "desc": "the email",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "changePassword",
      "alias": "",
      "desc": "Changes the account password",
      "params": [{
        "name": "username",
        "type": ["string"],
        "desc": "the username",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "oldPassword",
        "type": ["string"],
        "desc": "the old password",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "newPassword",
        "type": ["string"],
        "desc": "the new password",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "resetPassword",
      "alias": "",
      "desc": "Resets the account password",
      "params": [{
        "name": "username",
        "type": ["string"],
        "desc": "the username",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "captchaHash",
        "type": ["string"],
        "desc": "the captcha hash generated by AMI",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "captchaText",
        "type": ["string"],
        "desc": "the captcha text entered by the username",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }]
  }, {
    "name": "amiRouter",
    "alias": "",
    "desc": "The AMI url routing subsystem",
    "implements": [],
    "inherits": [],
    "functions": [{
      "name": "getWebAppURL",
      "alias": "",
      "desc": "Gets the webapp URL",
      "params": [],
      "returns": [{
        "type": ["string"],
        "desc": "The webapp URL"
      }]
    }, {
      "name": "getWebAppArgs",
      "alias": "",
      "desc": "Gets the arguments of the webapp URL",
      "params": [],
      "returns": [{
        "type": ["Object.<string, string>"],
        "desc": "The arguments of the webapp URL"
      }]
    }, {
      "name": "getWebAppHash",
      "alias": "",
      "desc": "Gets the anchor part of the webapp URL",
      "params": [],
      "returns": [{
        "type": ["string"],
        "desc": "The anchor part of the webapp URL"
      }]
    }, {
      "name": "getScriptURL",
      "alias": "",
      "desc": "Gets the script URL",
      "params": [],
      "returns": [{
        "type": ["string"],
        "desc": "The script URL"
      }]
    }, {
      "name": "getScriptArgs",
      "alias": "",
      "desc": "Gets the arguments of the script URL",
      "params": [],
      "returns": [{
        "type": ["Object.<string, string>"],
        "desc": "The arguments of the the script URL"
      }]
    }, {
      "name": "getWebappHash",
      "alias": "",
      "desc": "Gets anchor part of the script URL",
      "params": [],
      "returns": [{
        "type": ["string"],
        "desc": "The anchor part of the script URL"
      }]
    }, {
      "name": "getOriginURL",
      "alias": "",
      "desc": "Gets the origin URL",
      "params": [],
      "returns": [{
        "type": ["string"],
        "desc": "The origin URL"
      }]
    }, {
      "name": "append",
      "alias": "",
      "desc": "Appends a routing rule",
      "params": [{
        "name": "regExp",
        "type": ["string"],
        "desc": "the regExp",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "callback",
        "type": ["function"],
        "desc": "the callback",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["AMIRouter"],
        "desc": "The amiRouter singleton"
      }]
    }, {
      "name": "remove",
      "alias": "",
      "desc": "Removes a routing rule",
      "params": [{
        "name": "regExp",
        "type": ["string"],
        "desc": "the regExp",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["AMIRouter"],
        "desc": "The amiRouter singleton"
      }]
    }, {
      "name": "check",
      "alias": "",
      "desc": "Checks whether the URL matches with a routing rule",
      "params": [],
      "returns": [{
        "type": ["boolean"],
        "desc": ""
      }]
    }, {
      "name": "appendHistoryEntry",
      "alias": "",
      "desc": "Appends a new history entry",
      "params": [{
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, searchParams, hash)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["boolean"],
        "desc": ""
      }]
    }, {
      "name": "replaceHistoryEntry",
      "alias": "",
      "desc": "Replaces the current history entry",
      "params": [{
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, searchParams, hash)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["boolean"],
        "desc": ""
      }]
    }]
  }, {
    "name": "amiWebApp",
    "alias": "",
    "desc": "The AMI webapp subsystem",
    "implements": [],
    "inherits": [],
    "variables": [{
      "name": "webAppURL",
      "alias": "",
      "type": ["string"],
      "desc": "The webapp URL"
    }, {
      "name": "scriptURL",
      "alias": "",
      "type": ["string"],
      "desc": "The script URL"
    }, {
      "name": "originURL",
      "alias": "",
      "type": ["string"],
      "desc": "The origin URL"
    }, {
      "name": "args",
      "alias": "",
      "type": ["Object.<string, string>"],
      "desc": "The arguments of the webapp URL"
    }, {
      "name": "hash",
      "alias": "",
      "type": ["string"],
      "desc": "The anchor part of the webapp URL"
    }, {
      "name": "bootstrapVersion",
      "alias": "",
      "type": ["number"],
      "desc": "The Twitter Bootstrap's version (default, 4)"
    }],
    "events": [{
      "name": "onReady",
      "alias": "",
      "desc": "This method must be overloaded and is called when the Web application starts",
      "params": [{
        "name": "userdata",
        "type": ["*"],
        "desc": "the user data",
        "default": "",
        "optional": "",
        "nullable": true
      }]
    }, {
      "name": "onRefresh",
      "alias": "",
      "desc": "This method must be overloaded and is called when the toolbar needs to be updated",
      "params": [{
        "name": "isAuth",
        "type": ["boolean"],
        "desc": "is the user authenticated",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }],
    "functions": [{
      "name": "start",
      "alias": "",
      "desc": "Starts the Web application",
      "params": [{
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (logo_url, background_url, sign_in_image_url, home_url, contact_email, about_url, default_theme_url, dashboard_theme_url, locker_url, endpoint_url, sso_auto_authentication, sso_authentication_allowed, password_authentication_allowed, certificate_authentication_allowed, sign_out_allowed, create_account_allowed, change_info_allowed, change_password_allowed, change_certificate_allowed, captcha_allowed, bookmarks_allowed, dashboards_allowed)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["AMIWebApp"],
        "desc": ""
      }]
    }, {
      "name": "_internal_then",
      "alias": "",
      "desc": "",
      "params": [{
        "name": "deferred",
        "type": ["$.Deferred"],
        "desc": "",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "doneCallback",
        "type": ["function"],
        "desc": "",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "failCallback",
        "type": ["function"],
        "desc": "",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }, {
      "name": "_internal_always",
      "alias": "",
      "desc": "",
      "params": [{
        "name": "deferred",
        "type": ["$.Deferred"],
        "desc": "",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "alwaysCallback",
        "type": ["function"],
        "desc": "",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }, {
      "name": "typeOf",
      "alias": "",
      "desc": "Gets the type name of the given object",
      "params": [{
        "name": "x",
        "type": ["*"],
        "desc": "the object",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["string"],
        "desc": "The type name of the given object"
      }]
    }, {
      "name": "asArray",
      "alias": "",
      "desc": "Turns the given object into an array if it is not already the case",
      "params": [{
        "name": "x",
        "type": ["*"],
        "desc": "the object",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["Array.<*>"],
        "desc": "The resulting array"
      }]
    }, {
      "name": "isString",
      "alias": "",
      "desc": "Checks whether the given object is a string",
      "params": [{
        "name": "x",
        "type": ["*"],
        "desc": "the object",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["boolean"],
        "desc": ""
      }]
    }, {
      "name": "isArray",
      "alias": "",
      "desc": "Checks whether the given object is an array",
      "params": [{
        "name": "x",
        "type": ["*"],
        "desc": "the object",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["boolean"],
        "desc": ""
      }]
    }, {
      "name": "isObject",
      "alias": "",
      "desc": "Checks whether the given object is an object",
      "params": [{
        "name": "x",
        "type": ["*"],
        "desc": "the object",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["boolean"],
        "desc": ""
      }]
    }, {
      "name": "isSet",
      "alias": "",
      "desc": "Checks whether the given object is a set",
      "params": [{
        "name": "x",
        "type": ["*"],
        "desc": "the object",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["boolean"],
        "desc": ""
      }]
    }, {
      "name": "isMap",
      "alias": "",
      "desc": "Checks whether the given object is a map",
      "params": [{
        "name": "x",
        "type": ["*"],
        "desc": "the object",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["boolean"],
        "desc": ""
      }]
    }, {
      "name": "setup",
      "alias": "",
      "desc": "",
      "params": [{
        "name": "optionNames",
        "type": ["Array.<string>"],
        "desc": "",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "optionDefaults",
        "type": ["Array.<*>"],
        "desc": "",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["Array.<*>"],
        "desc": ""
      }]
    }, {
      "name": "lock",
      "alias": "",
      "desc": "Locks the Web application",
      "params": []
    }, {
      "name": "unlock",
      "alias": "",
      "desc": "Unlocks the Web application",
      "params": []
    }, {
      "name": "modalEnter",
      "alias": "",
      "desc": "Enter the modal window",
      "params": []
    }, {
      "name": "modalLeave",
      "alias": "",
      "desc": "Leave the modal window",
      "params": []
    }, {
      "name": "canLeave",
      "alias": "",
      "desc": "Specifies whether leaving the current page must be confirmed or not",
      "params": [{
        "name": "canLeave",
        "type": [],
        "desc": "",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }, {
      "name": "error",
      "alias": "",
      "desc": "Shows an 'error' message",
      "params": [{
        "name": "message",
        "type": ["string", "Array.<string>"],
        "desc": "the message",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "fadeOut",
        "type": ["boolean"],
        "desc": "if True, the message disappears after 60s",
        "default": false,
        "optional": true,
        "nullable": ""
      }]
    }, {
      "name": "info",
      "alias": "",
      "desc": "Shows an 'info' message",
      "params": [{
        "name": "message",
        "type": ["string", "Array.<string>"],
        "desc": "the message",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "fadeOut",
        "type": ["boolean"],
        "desc": "if True, the message disappears after 60s",
        "default": false,
        "optional": true,
        "nullable": ""
      }]
    }, {
      "name": "success",
      "alias": "",
      "desc": "Shows a 'success' message",
      "params": [{
        "name": "message",
        "type": ["string", "Array.<string>"],
        "desc": "the message",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "fadeOut",
        "type": ["boolean"],
        "desc": "if True, the message disappears after 60s",
        "default": false,
        "optional": true,
        "nullable": ""
      }]
    }, {
      "name": "warning",
      "alias": "",
      "desc": "Shows a 'warning' message",
      "params": [{
        "name": "message",
        "type": ["string", "Array.<string>"],
        "desc": "the message",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "fadeOut",
        "type": ["boolean"],
        "desc": "if True, the message disappears after 60s",
        "default": false,
        "optional": true,
        "nullable": ""
      }]
    }, {
      "name": "flush",
      "alias": "",
      "desc": "Flushes messages",
      "params": []
    }, {
      "name": "base64Encode",
      "alias": "",
      "desc": "Encodes the given string to base64",
      "params": [{
        "name": "s",
        "type": ["string"],
        "desc": "the decoded string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["string"],
        "desc": "The encoded string"
      }]
    }, {
      "name": "base64Decode",
      "alias": "",
      "desc": "Decodes the given string from base64",
      "params": [{
        "name": "s",
        "type": ["string"],
        "desc": "the encoded string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["string"],
        "desc": "The decoded string"
      }]
    }, {
      "name": "textToHtml",
      "alias": "",
      "desc": "Escapes the given string from text to HTML",
      "params": [{
        "name": "s",
        "type": ["string"],
        "desc": "the unescaped string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["string"],
        "desc": "The escaped string"
      }]
    }, {
      "name": "htmlToText",
      "alias": "",
      "desc": "Unescapes the given string from HTML to text",
      "params": [{
        "name": "s",
        "type": ["string"],
        "desc": "the escaped string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["string"],
        "desc": "The unescaped string"
      }]
    }, {
      "name": "textToString",
      "alias": "",
      "desc": "Escapes the given string from text to JavaScript string",
      "params": [{
        "name": "s",
        "type": ["string"],
        "desc": "the unescaped string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["string"],
        "desc": "The escaped string"
      }]
    }, {
      "name": "stringToText",
      "alias": "",
      "desc": "Unescapes the given string from JavaScript string to text",
      "params": [{
        "name": "s",
        "type": ["string"],
        "desc": "the escaped string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["string"],
        "desc": "The unescaped string"
      }]
    }, {
      "name": "htmlToString",
      "alias": "",
      "desc": "Escapes the given string from HTML to JavaScript string",
      "params": [{
        "name": "s",
        "type": ["string"],
        "desc": "the unescaped string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["string"],
        "desc": "The escaped string"
      }]
    }, {
      "name": "stringToHtml",
      "alias": "",
      "desc": "Unescapes the given string from JavaScript string to HTML",
      "params": [{
        "name": "s",
        "type": ["string"],
        "desc": "the escaped string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["string"],
        "desc": "The unescaped string"
      }]
    }, {
      "name": "textToSQL",
      "alias": "",
      "desc": "Escapes the given string from text to SQL",
      "params": [{
        "name": "s",
        "type": ["string"],
        "desc": "the unescaped string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["string"],
        "desc": "The escaped string"
      }]
    }, {
      "name": "sqlToText",
      "alias": "",
      "desc": "Unescapes the given string from SQL to text",
      "params": [{
        "name": "s",
        "type": ["string"],
        "desc": "the escaped string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["string"],
        "desc": "The unescaped string"
      }]
    }, {
      "name": "fillBreadcrumb",
      "alias": "",
      "desc": "Fills the main breadcrumb",
      "params": [{
        "name": "items",
        "type": ["Array.<string>", "string"],
        "desc": "the array of HTML formatted items",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }, {
      "name": "replaceHTML",
      "alias": "",
      "desc": "Puts a HTML or TWIG fragment to the given target",
      "params": [{
        "name": "selector",
        "type": ["string"],
        "desc": "the target selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "twig",
        "type": ["string"],
        "desc": "the TWIG fragment",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, scope, dict, twigs)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "see": ["method [formatTWIG]{@link #jsdoc_method_formatTWIG}"],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "prependHTML",
      "alias": "",
      "desc": "Prepends a HTML or TWIG fragment to the given target",
      "params": [{
        "name": "selector",
        "type": ["string"],
        "desc": "the target selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "twig",
        "type": ["string"],
        "desc": "the TWIG fragment",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, scope, dict, twigs)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "see": ["method [formatTWIG]{@link #jsdoc_method_formatTWIG}"],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "appendHTML",
      "alias": "",
      "desc": "Appends a HTML or TWIG fragment to the given target",
      "params": [{
        "name": "selector",
        "type": ["string"],
        "desc": "the target selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "twig",
        "type": ["string"],
        "desc": "the TWIG fragment",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, scope, dict, twigs)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "see": ["method [formatTWIG]{@link #jsdoc_method_formatTWIG}"],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "parentHTML",
      "alias": "",
      "desc": "Puts a HTML or TWIG fragment to the given target",
      "params": [{
        "name": "selector",
        "type": ["string"],
        "desc": "the target selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "twig",
        "type": ["string"],
        "desc": "the TWIG fragment",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, scope, dict, twigs)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "see": ["method [formatTWIG]{@link #jsdoc_method_formatTWIG}"],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "formatTWIG",
      "alias": "",
      "desc": "Interprets the given TWIG string",
      "params": [{
        "name": "twig",
        "type": ["string"],
        "desc": "the TWIG string",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "dict",
        "type": ["Object.<string, *>", "Array.<Object.<string, *>>"],
        "desc": "the dictionary",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }, {
        "name": "twigs",
        "type": ["Object.<string, string>"],
        "desc": "dictionary of fragments",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "see": ["{@link https://twig.symfony.com/doc/}"],
      "returns": [{
        "type": ["string"],
        "desc": "The Interpreted TWIG string"
      }]
    }, {
      "name": "renderJSDoc",
      "alias": "",
      "desc": "Renders a AMI JSDoc documentation",
      "params": [{
        "name": "menuSelector",
        "type": ["string"],
        "desc": "selector of the menu div",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "bodySelector",
        "type": ["string"],
        "desc": "selector of the body div",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "json",
        "type": ["object"],
        "desc": "the JSON documentation",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["AMIJSDoc"],
        "desc": ""
      }]
    }, {
      "name": "loadResources",
      "alias": "",
      "desc": "Asynchronously loads resources by file extension",
      "params": [{
        "name": "urls",
        "type": ["Array.<string>", "string"],
        "desc": "the array of urls",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "loadSheets",
      "alias": "",
      "desc": "Asynchronously loads CSS sheets",
      "params": [{
        "name": "urls",
        "type": ["Array.<string>", "string"],
        "desc": "the array of urls",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "loadScripts",
      "alias": "",
      "desc": "Asynchronously loads JS scripts",
      "params": [{
        "name": "urls",
        "type": ["Array.<string>", "string"],
        "desc": "the array of urls",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "loadJSONs",
      "alias": "",
      "desc": "Asynchronously loads JSON files",
      "params": [{
        "name": "urls",
        "type": ["Array.<string>", "string"],
        "desc": "the array of urls",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "loadXMLs",
      "alias": "",
      "desc": "Asynchronously loads XML files",
      "params": [{
        "name": "urls",
        "type": ["Array.<string>", "string"],
        "desc": "the array of urls",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "loadHTMLs",
      "alias": "",
      "desc": "Asynchronously loads HTML files",
      "params": [{
        "name": "urls",
        "type": ["Array.<string>", "string"],
        "desc": "the array of urls",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "loadTWIGs",
      "alias": "",
      "desc": "Asynchronously loads TWIG files",
      "params": [{
        "name": "urls",
        "type": ["Array.<string>", "string"],
        "desc": "the array of urls",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "loadTexts",
      "alias": "",
      "desc": "Asynchronously loads text files",
      "params": [{
        "name": "urls",
        "type": ["Array.<string>", "string"],
        "desc": "the array of urls",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "loadSubApp",
      "alias": "",
      "desc": "Asynchronously loads a subapp",
      "params": [{
        "name": "subapp",
        "type": ["string"],
        "desc": "the subapp name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "userdata",
        "type": ["*"],
        "desc": "the user data",
        "default": "",
        "optional": true,
        "nullable": true
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, defaultSubApp, hash, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "loadSubAppAlt",
      "alias": "",
      "desc": "Asynchronously loads a subapp",
      "params": [{
        "name": "subapp",
        "type": ["string"],
        "desc": "the subapp name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "userdata",
        "type": ["*"],
        "desc": "the user data",
        "default": "",
        "optional": true,
        "nullable": true
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, defaultSubApp, hash, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["undefined"],
        "desc": "Nothing"
      }]
    }, {
      "name": "loadSubAppByURL",
      "alias": "",
      "desc": "Asynchronously loads a subapp by URL",
      "params": [{
        "name": "defaultSubApp",
        "type": ["string"],
        "desc": "if 'amiRouter.getArgs()[\"subapp\"]' is null, the default subapp name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "defaultUserData",
        "type": ["*"],
        "desc": "if 'amiRouter.getArgs()[\"userdata\"]' is null, the default user data",
        "default": "",
        "optional": "",
        "nullable": true
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "loadControl",
      "alias": "",
      "desc": "Asynchronously loads a control",
      "params": [{
        "name": "control",
        "type": ["string"],
        "desc": "the control name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "createControl",
      "alias": "",
      "desc": "Asynchronously creates a control",
      "params": [{
        "name": "parent",
        "type": ["*"],
        "desc": "the parent entity",
        "default": "",
        "optional": "",
        "nullable": true
      }, {
        "name": "owner",
        "type": ["*"],
        "desc": "the owner entity",
        "default": "",
        "optional": "",
        "nullable": true
      }, {
        "name": "control",
        "type": ["string"],
        "desc": "the control name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "params",
        "type": ["Array.<*>"],
        "desc": "the control's parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "createControlInBody",
      "alias": "",
      "desc": "Asynchronously creates a control in the body",
      "params": [{
        "name": "parent",
        "type": ["*"],
        "desc": "the parent entity",
        "default": "",
        "optional": "",
        "nullable": true
      }, {
        "name": "owner",
        "type": ["*"],
        "desc": "the owner entity",
        "default": "",
        "optional": "",
        "nullable": true
      }, {
        "name": "control",
        "type": ["string"],
        "desc": "the control name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "controlParams",
        "type": ["Array.<*>"],
        "desc": "the control's render method mandatory parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "controlOptions",
        "type": ["Object.<string, *>"],
        "desc": "the control's render method optional parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "ownerOptions",
        "type": ["Object.<string, *>"],
        "desc": "the owner's optional parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "createControlInContainer",
      "alias": "",
      "desc": "Asynchronously creates a control in a container",
      "params": [{
        "name": "parent",
        "type": ["*"],
        "desc": "the parent entity",
        "default": "",
        "optional": "",
        "nullable": true
      }, {
        "name": "owner",
        "type": ["*"],
        "desc": "the owner entity",
        "default": "",
        "optional": "",
        "nullable": true
      }, {
        "name": "control",
        "type": ["string"],
        "desc": "the control name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "controlParams",
        "type": ["Array.<*>"],
        "desc": "the control's render method mandatory parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "controlOptions",
        "type": ["Object.<string, *>"],
        "desc": "the control's render method optional parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "ownerOptions",
        "type": ["Object.<string, *>"],
        "desc": "the owner's optional parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "icon",
        "type": ["string"],
        "desc": "the icon",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "title",
        "type": ["string"],
        "desc": "the title",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "createControlFromWebLink",
      "alias": "",
      "desc": "Asynchronously creates a control in a container from a WEB link",
      "params": [{
        "name": "parent",
        "type": ["*"],
        "desc": "the parent entity",
        "default": "",
        "optional": "",
        "nullable": true
      }, {
        "name": "owner",
        "type": ["*"],
        "desc": "the owner entity",
        "default": "",
        "optional": "",
        "nullable": true
      }, {
        "name": "el",
        "type": ["Element"],
        "desc": "the HTML element",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "ownerOptions",
        "type": ["Object.<string, *>"],
        "desc": "the owner's optional parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }]
  }],
  "interfaces": [{
    "name": "ami.IControl",
    "alias": "",
    "desc": "The AMI control interface",
    "implements": [],
    "inherits": [],
    "functions": [{
      "name": "onReady",
      "alias": "",
      "desc": "Called when the control is ready to run",
      "params": [],
      "returns": [{
        "type": ["$.Promise", "$.Deferred", "undefined"],
        "desc": "A JQuery promise object, deferred object or nothing"
      }]
    }, {
      "name": "onRemove",
      "alias": "",
      "desc": "Called when the control is removed",
      "params": [],
      "returns": [{
        "type": ["$.Promise", "$.Deferred", "undefined"],
        "desc": "A JQuery promise object, deferred object or nothing"
      }]
    }, {
      "name": "patchId",
      "alias": "",
      "desc": "Patches an HTML identifier",
      "params": [{
        "name": "id",
        "type": ["string"],
        "desc": "the not patched HTML identifier",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["string"],
        "desc": "The patched HTML identifier"
      }]
    }, {
      "name": "replaceHTML",
      "alias": "",
      "desc": "Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}",
      "params": [{
        "name": "selector",
        "type": ["string"],
        "desc": "the target selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "twig",
        "type": ["string"],
        "desc": "the TWIG fragment",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, dict, twigs)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "prependHTML",
      "alias": "",
      "desc": "Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}",
      "params": [{
        "name": "selector",
        "type": ["string"],
        "desc": "the target selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "twig",
        "type": ["string"],
        "desc": "the TWIG fragment",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, dict, twigs)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "appendHTML",
      "alias": "",
      "desc": "Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}",
      "params": [{
        "name": "selector",
        "type": ["string"],
        "desc": "the target selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "twig",
        "type": ["string"],
        "desc": "the TWIG fragment",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, dict, twigs)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }]
  }, {
    "name": "ami.IContainer",
    "alias": "",
    "desc": "The AMI container interface",
    "implements": [],
    "inherits": [],
    "functions": [{
      "name": "render",
      "alias": "",
      "desc": "",
      "params": [{
        "name": "selector",
        "type": ["string"],
        "desc": "the selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (...)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "prependItem",
      "alias": "",
      "desc": "Prepends an item",
      "params": [{
        "name": "title",
        "type": ["string"],
        "desc": "the title",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (...)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object returning the new item's identifier"
      }]
    }, {
      "name": "appendItem",
      "alias": "",
      "desc": "Appends an item",
      "params": [{
        "name": "title",
        "type": ["string"],
        "desc": "the title",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (...)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object returning the new item's identifier"
      }]
    }, {
      "name": "removeItem",
      "alias": "",
      "desc": "Removes an item",
      "params": [{
        "name": "itemId",
        "type": ["string"],
        "desc": "the item identifier",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }, {
      "name": "removeAllItems",
      "alias": "",
      "desc": "Removes all items",
      "params": []
    }, {
      "name": "isEmpty",
      "alias": "",
      "desc": "Checks whether the container is empty or not",
      "params": [],
      "returns": [{
        "type": ["boolean"],
        "desc": ""
      }]
    }]
  }, {
    "name": "ami.ISubApp",
    "alias": "",
    "desc": "The AMI sub-application interface",
    "implements": [],
    "inherits": [],
    "functions": [{
      "name": "onReady",
      "alias": "",
      "desc": "Called when the sub-application is ready to run",
      "params": [{
        "name": "userdata",
        "type": ["*"],
        "desc": "the user data",
        "default": "",
        "optional": "",
        "nullable": true
      }],
      "returns": [{
        "type": ["$.Promise", "$.Deferred", "undefined"],
        "desc": "A JQuery promise object, deferred object or nothing"
      }]
    }, {
      "name": "onExit",
      "alias": "",
      "desc": "Called when the sub-application is about to exit",
      "params": [{
        "name": "userdata",
        "type": ["*"],
        "desc": "the user data",
        "default": "",
        "optional": "",
        "nullable": true
      }],
      "returns": [{
        "type": ["$.Promise", "$.Deferred", "undefined"],
        "desc": "A JQuery promise object, deferred object or nothing"
      }]
    }, {
      "name": "onLogin",
      "alias": "",
      "desc": "Called when logging in",
      "params": [{
        "name": "userdata",
        "type": ["*"],
        "desc": "the user data",
        "default": "",
        "optional": "",
        "nullable": true
      }],
      "returns": [{
        "type": ["$.Promise", "$.Deferred", "undefined"],
        "desc": "A JQuery promise object, deferred object or nothing"
      }]
    }, {
      "name": "onLogout",
      "alias": "",
      "desc": "Called when logging out",
      "params": [{
        "name": "userdata",
        "type": ["*"],
        "desc": "the user data",
        "default": "",
        "optional": "",
        "nullable": true
      }],
      "returns": [{
        "type": ["$.Promise", "$.Deferred", "undefined"],
        "desc": "A JQuery promise object, deferred object or nothing"
      }]
    }]
  }],
  "classes": [{
    "name": "ami.Control",
    "alias": "",
    "desc": "The basic AMI control",
    "implements": ["ami.IControl"],
    "inherits": [],
    "konstructor": {
      "name": "Control",
      "params": [{
        "name": "parent",
        "type": ["*"],
        "desc": "the parent entity",
        "optional": "",
        "nullable": true
      }, {
        "name": "owner",
        "type": ["*"],
        "desc": "the owner entity",
        "optional": "",
        "nullable": true
      }]
    },
    "functions": [{
      "name": "onReady",
      "alias": "",
      "desc": "Called when the control is ready to run",
      "params": [],
      "returns": [{
        "type": ["$.Promise", "$.Deferred", "undefined"],
        "desc": "A JQuery promise object, deferred object or nothing"
      }]
    }, {
      "name": "onRemove",
      "alias": "",
      "desc": "Called when the control is removed",
      "params": [],
      "returns": [{
        "type": ["$.Promise", "$.Deferred", "undefined"],
        "desc": "A JQuery promise object, deferred object or nothing"
      }]
    }, {
      "name": "patchId",
      "alias": "",
      "desc": "Patches an HTML identifier",
      "params": [{
        "name": "id",
        "type": ["string"],
        "desc": "the not patched HTML identifier",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["string"],
        "desc": "The patched HTML identifier"
      }]
    }, {
      "name": "replaceHTML",
      "alias": "",
      "desc": "Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}",
      "params": [{
        "name": "selector",
        "type": ["string"],
        "desc": "the target selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "twig",
        "type": ["string"],
        "desc": "the TWIG fragment",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, dict, twigs)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "prependHTML",
      "alias": "",
      "desc": "Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}",
      "params": [{
        "name": "selector",
        "type": ["string"],
        "desc": "the target selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "twig",
        "type": ["string"],
        "desc": "the TWIG fragment",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, dict, twigs)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "appendHTML",
      "alias": "",
      "desc": "Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}",
      "params": [{
        "name": "selector",
        "type": ["string"],
        "desc": "the target selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "twig",
        "type": ["string"],
        "desc": "the TWIG fragment",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, dict, twigs)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "setupCtx",
      "alias": "",
      "desc": "Sets up the control's context",
      "params": [{
        "name": "immutables",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of immutable parameters in the control's context",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "defaults",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of default values for optional parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of values for optional parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["Object.<string, *>"],
        "desc": "The resulting control's context"
      }]
    }, {
      "name": "createControl",
      "alias": "",
      "desc": "Asynchronously creates a control",
      "params": [{
        "name": "parent",
        "type": ["*"],
        "desc": "the parent entity",
        "default": "",
        "optional": "",
        "nullable": true
      }, {
        "name": "control",
        "type": ["string"],
        "desc": "the control name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "params",
        "type": ["Array.<*>"],
        "desc": "the control's parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "createControlInBody",
      "alias": "",
      "desc": "Asynchronously creates a control in the body",
      "params": [{
        "name": "parent",
        "type": ["*"],
        "desc": "the parent entity",
        "default": "",
        "optional": "",
        "nullable": true
      }, {
        "name": "control",
        "type": ["string"],
        "desc": "the control name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "controlParams",
        "type": ["Array.<*>"],
        "desc": "the control's render method mandatory parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "controlOptions",
        "type": ["Object.<string, *>"],
        "desc": "the control's render method optional parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "createControlInContainer",
      "alias": "",
      "desc": "Asynchronously creates a control in a container",
      "params": [{
        "name": "parent",
        "type": ["*"],
        "desc": "the parent entity",
        "default": "",
        "optional": "",
        "nullable": true
      }, {
        "name": "control",
        "type": ["string"],
        "desc": "the control name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "controlParams",
        "type": ["Array.<*>"],
        "desc": "the control's render method mandatory parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "controlOptions",
        "type": ["Object.<string, *>"],
        "desc": "the control's render method optional parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "icon",
        "type": ["string"],
        "desc": "the icon",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "title",
        "type": ["string"],
        "desc": "the title",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "createControlFromWebLink",
      "alias": "",
      "desc": "Asynchronously creates a control in a container from a WEB link",
      "params": [{
        "name": "parent",
        "type": ["*"],
        "desc": "the parent entity",
        "default": "",
        "optional": "",
        "nullable": true
      }, {
        "name": "el",
        "type": ["Element"],
        "desc": "the HTML element",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }]
  }, {
    "name": "ami.SubApp",
    "alias": "",
    "desc": "The basic AMI sub-application",
    "implements": ["ami.ISubApp"],
    "inherits": [],
    "konstructor": {
      "name": "SubApp",
      "params": []
    },
    "functions": [{
      "name": "onReady",
      "alias": "",
      "desc": "Called when the sub-application is ready to run",
      "params": [{
        "name": "userdata",
        "type": ["*"],
        "desc": "the user data",
        "default": "",
        "optional": "",
        "nullable": true
      }],
      "returns": [{
        "type": ["$.Promise", "$.Deferred", "undefined"],
        "desc": "A JQuery promise object, deferred object or nothing"
      }]
    }, {
      "name": "onExit",
      "alias": "",
      "desc": "Called when the sub-application is about to exit",
      "params": [{
        "name": "userdata",
        "type": ["*"],
        "desc": "the user data",
        "default": "",
        "optional": "",
        "nullable": true
      }],
      "returns": [{
        "type": ["$.Promise", "$.Deferred", "undefined"],
        "desc": "A JQuery promise object, deferred object or nothing"
      }]
    }, {
      "name": "onLogin",
      "alias": "",
      "desc": "Called when logging in",
      "params": [{
        "name": "userdata",
        "type": ["*"],
        "desc": "the user data",
        "default": "",
        "optional": "",
        "nullable": true
      }],
      "returns": [{
        "type": ["$.Promise", "$.Deferred", "undefined"],
        "desc": "A JQuery promise object, deferred object or nothing"
      }]
    }, {
      "name": "onLogout",
      "alias": "",
      "desc": "Called when logging out",
      "params": [{
        "name": "userdata",
        "type": ["*"],
        "desc": "the user data",
        "default": "",
        "optional": "",
        "nullable": true
      }],
      "returns": [{
        "type": ["$.Promise", "$.Deferred", "undefined"],
        "desc": "A JQuery promise object, deferred object or nothing"
      }]
    }, {
      "name": "setupCtx",
      "alias": "",
      "desc": "Sets up the application's context",
      "params": [{
        "name": "immutables",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of immutable parameters in the application's context",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "defaults",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of default values for optional parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of values for optional parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": ["Object.<string, *>"],
        "desc": "The resulting application's context"
      }]
    }, {
      "name": "createControl",
      "alias": "",
      "desc": "Asynchronously creates a control",
      "params": [{
        "name": "parent",
        "type": ["*"],
        "desc": "the parent entity",
        "default": "",
        "optional": "",
        "nullable": true
      }, {
        "name": "control",
        "type": ["string"],
        "desc": "the control name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "params",
        "type": ["Array.<*>"],
        "desc": "the control's parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "createControlInBody",
      "alias": "",
      "desc": "Asynchronously creates a control in the body",
      "params": [{
        "name": "parent",
        "type": ["*"],
        "desc": "the parent entity",
        "default": "",
        "optional": "",
        "nullable": true
      }, {
        "name": "control",
        "type": ["string"],
        "desc": "the control name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "controlParams",
        "type": ["Array.<*>"],
        "desc": "the control's render method mandatory parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "controlOptions",
        "type": ["Object.<string, *>"],
        "desc": "the control's render method optional parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "createControlInContainer",
      "alias": "",
      "desc": "Asynchronously creates a control in a container",
      "params": [{
        "name": "parent",
        "type": ["*"],
        "desc": "the parent entity",
        "default": "",
        "optional": "",
        "nullable": true
      }, {
        "name": "control",
        "type": ["string"],
        "desc": "the control name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "controlParams",
        "type": ["Array.<*>"],
        "desc": "the control's render method mandatory parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "controlOptions",
        "type": ["Object.<string, *>"],
        "desc": "the control's render method optional parameters",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "icon",
        "type": ["string"],
        "desc": "the icon",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "title",
        "type": ["string"],
        "desc": "the title",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }, {
      "name": "createControlFromWebLink",
      "alias": "",
      "desc": "Asynchronously creates a control in a container from a WEB link",
      "params": [{
        "name": "parent",
        "type": ["*"],
        "desc": "the parent entity",
        "default": "",
        "optional": "",
        "nullable": true
      }, {
        "name": "el",
        "type": ["Element"],
        "desc": "the HTML element",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": ["Object.<string, *>"],
        "desc": "dictionary of optional parameters (context, cache)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": ["$.Promise"],
        "desc": "A JQuery promise object"
      }]
    }]
  }],
  "functions": [{
    "name": "$AMINamespace",
    "alias": "",
    "desc": "Creates a new namespace",
    "params": [{
      "name": "$name",
      "type": ["string"],
      "desc": "the namespace name",
      "default": "",
      "optional": "",
      "nullable": ""
    }, {
      "name": "$descr",
      "type": ["Object.<string, *>"],
      "desc": "the namespace body",
      "default": "{}",
      "optional": true,
      "nullable": ""
    }]
  }, {
    "name": "$AMIInterface",
    "alias": "",
    "desc": "Creates a new interface",
    "params": [{
      "name": "$name",
      "type": ["string"],
      "desc": "the interface name",
      "default": "",
      "optional": "",
      "nullable": ""
    }, {
      "name": "$descr",
      "type": ["Object.<string, *>"],
      "desc": "the interface body",
      "default": "{}",
      "optional": true,
      "nullable": ""
    }]
  }, {
    "name": "$AMIClass",
    "alias": "",
    "desc": "Creates a new class",
    "params": [{
      "name": "$name",
      "type": ["string"],
      "desc": "the class name",
      "default": "",
      "optional": "",
      "nullable": ""
    }, {
      "name": "$descr",
      "type": ["Object.<string, *>"],
      "desc": "the class body",
      "default": "{}",
      "optional": true,
      "nullable": ""
    }]
  }]
});
;// CONCATENATED MODULE: ./index.js






window.$AMIClass = $AMIClass;
window.$AMINamespace = $AMINamespace;
window.$AMIInterface = $AMIInterface;
window.amiCommand = js_AMICommand;
window.amiRouter = js_AMIRouter;
window.amiWebApp = js_AMIWebApp;
window.amiLogin = js_AMIAuth;
window.amiAuth = js_AMIAuth;
window.amiDoc = AMIDoc;
})();

/******/ })()
;