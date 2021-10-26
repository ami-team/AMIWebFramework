/*!
 * AMI Web Framwork (AWF) 1.0.0
 *
 * Copyright (c) 2014-2021 CNRS/LPSC
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
 * Copyright © 2014-2021 CNRS/LPSC
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
							dict[sym1] = /*-----*/(i);
							dict[sym2] = iterValue[i];

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

		return (typeName === '[object Array]' && x.length === 0)
		       ||
		       (typeName === '[object Object]' && Object.keys(x).length === 0)
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isNumber': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Number]';
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

		if(this.isObject(y))
		{
			return x in y;
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
		 ) {
			return x.length;
		}

		if(this.isObject(x))
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

					for(const j in item) L.push(item[j]);
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
		return this.isObject(x) ? Object.keys(x) : [];
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

	'_textToStringX': ['\\'  , '\n' , '"'  , '\''  ],
	'_textToStringY': ['\\\\', '\\n', '\\"', '\\\''],

	/*----------------------------------------------------------------------------------------------------------------*/

	'_textToJsonStringX': ['\\'  , '\n' , '"'  ],
	'_textToJsonStringY': ['\\\\', '\\n', '\\"'],

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
		return this.isString(s) && this.isObject(dict) ? this._replace(s, Object.keys(dict), Object.values(dict))
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

/***/ 441:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(667);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(446), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(58), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(744), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(824), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(929), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(196), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(619), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(989), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(512), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_9___ = new URL(/* asset import */ __webpack_require__(883), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_10___ = new URL(/* asset import */ __webpack_require__(404), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_11___ = new URL(/* asset import */ __webpack_require__(592), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_12___ = new URL(/* asset import */ __webpack_require__(349), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___, { hash: "?#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___, { hash: "#open_sansregular" });
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___, { hash: "?#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_7___, { hash: "#open_sanslight" });
var ___CSS_LOADER_URL_REPLACEMENT_10___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_8___);
var ___CSS_LOADER_URL_REPLACEMENT_11___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_9___);
var ___CSS_LOADER_URL_REPLACEMENT_12___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_10___);
var ___CSS_LOADER_URL_REPLACEMENT_13___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_11___);
var ___CSS_LOADER_URL_REPLACEMENT_14___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_12___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face{font-family:\"Open Sans\";font-weight:normal;font-style:normal;src:url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");src:local(\"Open Sans\"),local(\"OpenSans\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"embedded-opentype\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format(\"woff\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format(\"woff2\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") format(\"svg\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ")}@font-face{font-family:\"Open Sans Light\";font-weight:normal;font-style:normal;src:url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ");src:local(\"Open Sans Light\"),local(\"OpenSans Light\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ") format(\"embedded-opentype\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ") format(\"woff\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ") format(\"woff2\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ") format(\"svg\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_10___ + ")}@font-face{font-family:\"Trochut\";font-weight:normal;font-style:normal;src:url(" + ___CSS_LOADER_URL_REPLACEMENT_11___ + ")}h1,h2,h3,h4,h5,h6{font-family:\"Open Sans Light\"}pre{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_12___ + ");border:1px solid #ced4da;border-radius:0.2rem;padding:0.5rem}.bg-light{background:#f8f9fa url(" + ___CSS_LOADER_URL_REPLACEMENT_13___ + ")}.bg-light2{background:#f8f9fa url(" + ___CSS_LOADER_URL_REPLACEMENT_14___ + ")}.breadcrumb{background:#e9ecef url(" + ___CSS_LOADER_URL_REPLACEMENT_14___ + ");padding:0.25rem 0.5rem}.card-header{background:#e9ecef url(" + ___CSS_LOADER_URL_REPLACEMENT_14___ + ")}.card-footer{background:#e9ecef url(" + ___CSS_LOADER_URL_REPLACEMENT_14___ + ")}.input-group-prepend>.form-control{border-top-right-radius:0 !important;border-bottom-right-radius:0 !important}.input-group-prepend>.form-control:not(:first-child){border-left:none;border-top-left-radius:0 !important;border-bottom-left-radius:0 !important}.input-group-append>.form-control{border-top-left-radius:0 !important;border-bottom-left-radius:0 !important}.input-group-append>.form-control:not(:first-child){border-left:none;border-top-right-radius:0 !important;border-bottom-right-radius:0 !important}.custom-select-sm{font-size:95%;padding:0 0.25rem}.modal-header{background:#f5f5f5 url(" + ___CSS_LOADER_URL_REPLACEMENT_13___ + ");border-radius:0.25rem 0.25rem 0 0}.modal-footer{background:#f5f5f5 url(" + ___CSS_LOADER_URL_REPLACEMENT_14___ + ");border-radius:0 0 0.25rem 0.25rem}.navbar-nav .dropdown-menu{padding:0.3rem 0rem}.navbar-nav .dropdown-divider{margin:0.2rem 0rem}.navbar-nav .dropdown-item{padding:0.2rem 1rem}@media (min-width: 768px){.navbar-nav>li>.dropdown-menu::before{border-bottom:7px solid rgba(0,0,0,0.2);border-left:7px solid transparent;border-right:7px solid transparent;content:\"\";display:inline-block;left:9px;position:absolute;top:-7px}.navbar-nav>li>.dropdown-menu::after{border-bottom:6px solid #fff;border-left:6px solid transparent;border-right:6px solid transparent;content:\"\";display:inline-block;left:10px;position:absolute;top:-6px}.navbar-nav.navbar-right>li>.dropdown-menu::before{left:auto;right:12px}.navbar-nav.navbar-right>li>.dropdown-menu::after{left:auto;right:13px}}.nav-tabs:not(.card-header-tabs){margin-bottom:0.5rem}.popover{z-index:2060}.tooltip{z-index:2070}#jsdoc_content{text-align:justify}#jsdoc_content h1{font-size:48px;font-weight:200;letter-spacing:-2px;margin:12px 24px 20px}#jsdoc_content .details{border-left:2px solid #DDD;clear:both;margin-top:10px;margin-bottom:00px}#jsdoc_content .details dt{float:left;padding-left:10px;width:120px}#jsdoc_content .signature-name,#jsdoc_content .signature-params,#jsdoc_content .signature-params-attrs,#jsdoc_content .signature-attrs{font-size:18px}#jsdoc_content .signature-name{color:#31708f}#jsdoc_content .signature-params{color:#000}#jsdoc_content .signature-params-attrs{color:#AAA;font-size:60%;font-style:italic}#jsdoc_content .signature-attrs{color:#AAA}#ami_alert_content{position:absolute;z-index:99999999;top:8px;right:8px}.ami-code{counter-reset:listing;text-align:left}.ami-code,.ami-code code{white-space:pre-wrap;word-break:break-all}.ami-code code .line-number{counter-increment:listing;display:inline-block;width:26px}.ami-code code .line-number:before{color:gray;content:counter(listing) \". \";font:800 65% / 1.5 sans-serif}.ace_editor,.form-editor{border:1px solid #ced4da;border-radius:0.2rem;width:100%}.form-editor-hidden{opacity:0;pointer-events:none;position:fixed;z-index:-9999;top:0;left:0;height:0;width:0}.form-group .select2-container--default,.input-group .select2-container--default{width:100% !important}.select2-container--default .select2-selection--single,.select2-container--default .select2-selection--multiple,.select2-container--default .select2-selection--multiple .select2-selection__choice{border:1px solid #ced4da !important;border-radius:0.2rem !important}.select2-container--default .select2-selection--single,.select2-container--default .select2-selection--single .select2-selection__arrow{height:calc(1.5em + 0.75rem + 2px) !important}.select2-container--default .select2-selection--single{padding:calc((1.5em + 0.75rem) / 2.0 - 14px) 0.25rem !important}.form-group-sm .select2-container--default .select2-selection--single,.form-group-sm .select2-container--default .select2-selection--single .select2-selection__arrow,.input-group-sm .select2-container--default .select2-selection--single,.input-group-sm .select2-container--default .select2-selection--single .select2-selection__arrow{height:calc(1.5em + 0.5rem + 2px) !important}.form-group-sm .select2-container--default .select2-selection--single,.input-group-sm .select2-container--default .select2-selection--single{padding:calc((1.5em + 0.5rem) / 2.0 - 14px) 0rem !important}.form-group-lg .select2-container--default .select2-selection--single,.form-group-lg .select2-container--default .select2-selection--single .select2-selection__arrow,.input-group-lg .select2-container--default .select2-selection--single,.input-group-lg .select2-container--default .select2-selection--single .select2-selection__arrow{height:calc(1.5em + 1.0rem + 2px) !important}.form-group-lg .select2-container--default .select2-selection--single,.input-group-lg .select2-container--default .select2-selection--single{padding:calc((1.5em + 1.0rem) / 2.0 - 14px) 0.5rem !important}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
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
      for (var _i = 0; _i < this.length; _i++) {
        var id = this[_i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i2 = 0; _i2 < modules.length; _i2++) {
      var item = [].concat(modules[_i2]);

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

/***/ 667:
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

/***/ 81:
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 915:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(583);

/***/ }),

/***/ 583:
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

/***/ 295:
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

/***/ 301:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(379);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(795);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(569);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(565);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(216);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(589);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ami_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(441);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ami_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ami_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ami_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ami_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ }),

/***/ 379:
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

/***/ 216:
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

/***/ 565:
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

/***/ 795:
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

/***/ 589:
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

/***/ 196:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/OpenSans-Light-webfont.eot";

/***/ }),

/***/ 989:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/OpenSans-Light-webfont.svg";

/***/ }),

/***/ 512:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/OpenSans-Light-webfont.ttf";

/***/ }),

/***/ 619:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/OpenSans-Light-webfont.woff";

/***/ }),

/***/ 446:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/OpenSans-Regular-webfont.eot";

/***/ }),

/***/ 824:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/OpenSans-Regular-webfont.svg";

/***/ }),

/***/ 929:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/OpenSans-Regular-webfont.ttf";

/***/ }),

/***/ 58:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/OpenSans-Regular-webfont.woff";

/***/ }),

/***/ 744:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Opensans-Regular-webfont.woff2";

/***/ }),

/***/ 883:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Trochut-Regular.ttf";

/***/ }),

/***/ 122:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/background.jpg";

/***/ }),

/***/ 404:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/blueprint-dark.png";

/***/ }),

/***/ 702:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/logo.png";

/***/ }),

/***/ 592:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/stripe1.png";

/***/ }),

/***/ 349:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/stripe2.png";

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
/******/ 		// no chunk on demand loading
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
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: ./src/core/AMIObject.js


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _base;

if (typeof window !== 'undefined') {
  _base = window;
} else if (typeof __webpack_require__.g !== 'undefined') {
  _base = __webpack_require__.g;
} else {
  throw 'Neither \'window\' nor \'global\' is defined';
}

function _$createNamespace($name, x) {
  var i;
  var parent = _base;
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
  var parent = _base;
  var parts = $name.split(/\s*\.\s*/g),
      l = parts.length - 1;

  for (i = 0; i < l; i++) {
    if (parent[parts[i]]) {
      parent = parent[parts[i]];
    } else {
      throw "'".concat($name, "' ('").concat(parts[i], "') not declared");
    }
  }

  parent[parts[i]] = x;
}

function $AMINamespace($name, $descr) {
  if (!$descr) {
    $descr = {};
  }

  $descr.$name = $name;

  _$createNamespace($name, $descr);

  if ($descr.$) {
    $descr.$.apply($descr);
  }
}
function $AMIInterface($name, $descr) {
  if (!$descr) {
    $descr = {};
  }

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
  if (!$descr) {
    $descr = {};
  }

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

                if (_typeof(this[j]) !== _typeof($member)) {
                  throw "class '".concat(this.$name, "' with must implement '").concat($interface.$name, ".").concat(j, "'");
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
_base.$AMINamespace = $AMINamespace;
_base.$AMIInterface = $AMIInterface;
_base.$AMIClass = $AMIClass;

if (typeof jQuery !== 'undefined') {
  jQuery.Namespace = $AMINamespace;
  jQuery.Interface = $AMIInterface;
  jQuery.Class = $AMIClass;
}
// EXTERNAL MODULE: ./node_modules/jspath/index.js
var jspath = __webpack_require__(915);
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

/** Class representing AMI HTTP client
  */

class AMIHTTPClient
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

	#endpoint = '';

	#converter = 'AMIXmlToJson.xsl';

	#paramRegExp = new RegExp('-\\W*([a-zA-Z][a-zA-Z0-9]*)\\W*=\\W*\\?', 'g');

	/*----------------------------------------------------------------------------------------------------------------*/
	/* METHODS                                                                                                        */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * An AMI HTTP client
	  * @param {String} endpoint the endpoint
	  * @returns {AMIHTTPClient} The AMI HTTP client
	  */

	constructor(endpoint)
	{
		this.#endpoint = endpoint;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Executes an AMI command
	  * @param {String} command the AMI command
	  * @param {Object} [options] dictionary of settings (endpoint, converter, extras, params, context, timeout)
	  * @returns {$.Deferred} A JQuery deferred object
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

			return `-${y}="${String(params.shift()).replace('\\', '\\\\').replace('\n', '\\n').replace('"', '\\"').replace('\'', '\\\'')}"`;
		});

		/*------------------------------------------------------------------------------------------------------------*/

		const data = {
			...extras,
			Command: command,
			Converter: converter,
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

	#g()
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
			const udpInfo = {};
			const ssoInfo = {};

			/*--------------------------------------------------------------------------------------------------------*/

			jspath_default().apply('..rowset{.@type==="user"}.row.field', data).forEach((item) => {

				userInfo[item['@name']] = item['$'];
			});

			/*--------------------------------------------------------------------------------------------------------*/

			jspath_default().apply('..rowset{.@type==="udp"}.row.field', data).forEach((item) => {

				udpInfo[item['@name']] = item['$'];
			});

			/*--------------------------------------------------------------------------------------------------------*/

			jspath_default().apply('..rowset{.@type==="sso"}.row.field', data).forEach((item) => {

				ssoInfo[item['@name']] = item['$'];
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

			result.resolveWith(context, [data, message, userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo]);

		}, (data, message) => {

			result.rejectWith(context, [data, message, this.#g(), {}, {}, {}, {}]);
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Sign in by password
	  * @param {username} username the username
	  * @param {password} password the password
	  * @param {Object} [options] dictionary of optional parameters (endpoint, converter, context, timeout)
	  * @returns {$.Deferred} A JQuery deferred object
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
	  * @param {Object} [options] dictionary of optional parameters (endpoint, converter, context, timeout)
	  * @returns {$.Deferred} A JQuery deferred object
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
	  * @param {Object} [options] dictionary of optional parameters (endpoint, converter, context, timeout)
	  * @returns {$.Deferred} A JQuery deferred object
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
	  * @param {String} path the path
	  * @param {Object} json the JSON
	  * @returns {Array} The resulting array
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
var paho_mqtt = __webpack_require__(295);
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

			const uriEncodedPayload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')).split('').map((c) => {

				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);

			}).join('');

			/*--------------------------------------------------------------------------------------------------------*/

			const payload = decodeURIComponent(uriEncodedPayload);

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

/** Class representing AMI MQTT client
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
	  * @param {String} endpoint the endpoint
	  * @param {Object} [options] dictionary of optional parameters (onConnected, onConnectionLost, onMessageArrived, onMessageDelivered)
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
	  * @param {String} password the password
	  * @param {String} serverName the server name
	  * @returns {$.Deferred} A JQuery deferred object
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
	  * @returns {$.Deferred} A JQuery deferred object
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
	  * @returns {String} The client UUID
	  */

	getUUID()
	{
		return this._uuid;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Get the endpoint
	  * @returns {String} The endpoint
	  */

	getEndpoint()
	{
		return this._endpoint;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Get the username
	  * @returns {String} The username
	  */

	getUsername()
	{
		return this._username;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Subscribe a MQTT topic
	  * @param {String} topic the topic
	  * @param {Object} [options] dictionary of optional parameters (qos=0,1,2, timeout [ms])
	  * @returns {$.Deferred} A JQuery deferred object
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
	  * @param {String} topic the topic
	  * @param {Object} [options] dictionary of optional parameters (qos=0,1,2, timeout [ms])
	  * @returns {$.Deferred} A JQuery deferred object
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
	  * @param {String} topic the topic
	  * @param {String} payload the payload
	  * @param {Object} [options] dictionary of optional parameters (qos=0,1,2, retained=true,false)
	  * @returns {$.Deferred} A JQuery deferred object
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
	  * @param {String} command the AMI command
	  * @param {Object} [options] dictionary of optional parameters (serverName, converter, timeout [ms])
	  * @returns {$.Deferred} A JQuery deferred object
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

			return `-${y}="${String(params.shift()).replace('\\', '\\\\').replace('\n', '\\n').replace('"', '\\"').replace('\'', '\\\'')}"`;
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
	  * @param {String} path the path
	  * @param {Object} json the JSON
	  * @returns {Array} The resulting array
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

;// CONCATENATED MODULE: ./src/core/AMICommand.js


function AMICommand_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { AMICommand_typeof = function _typeof(obj) { return typeof obj; }; } else { AMICommand_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return AMICommand_typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }




var _httpClient = new WeakMap();

var _mqttClient = new WeakMap();

var AMICommand = function () {
  function AMICommand() {
    _classCallCheck(this, AMICommand);

    _classPrivateFieldInitSpec(this, _httpClient, {
      writable: true,
      value: ''
    });

    _classPrivateFieldInitSpec(this, _mqttClient, {
      writable: true,
      value: ''
    });
  }

  _createClass(AMICommand, [{
    key: "init",
    value: function init(httpEndpoint, mqttEndpoint) {
      _classPrivateFieldSet(this, _httpClient, new ami_http_client(httpEndpoint));

      _classPrivateFieldSet(this, _mqttClient, new ami_mqtt_client(mqttEndpoint));
    }
  }, {
    key: "getHTTPEndpoint",
    value: function getHTTPEndpoint() {
      return _classPrivateFieldGet(this, _httpClient);
    }
  }, {
    key: "getMQTTEndpoint",
    value: function getMQTTEndpoint() {
      return _classPrivateFieldGet(this, _mqttClient);
    }
  }, {
    key: "execute",
    value: function execute(command, options) {
      return AMICommand_typeof(options) === 'object' && 'mqtt' in options ? _classPrivateFieldGet(this, _mqttClient).execute(command, options) : _classPrivateFieldGet(this, _httpClient).execute(command, options);
    }
  }, {
    key: "mqttSignInByToken",
    value: function mqttSignInByToken(token, serverName) {
      return _classPrivateFieldGet(this, _mqttClient).signInByToken(token, serverName);
    }
  }, {
    key: "mqttSignOut",
    value: function mqttSignOut(options) {
      return _classPrivateFieldGet(this, _mqttClient).signOut(options);
    }
  }, {
    key: "signInByPassword",
    value: function signInByPassword(username, password, options) {
      _classPrivateFieldGet(this, _httpClient).signInByPassword(username, password, options);
    }
  }, {
    key: "signInByCertificate",
    value: function signInByCertificate(options) {
      return _classPrivateFieldGet(this, _httpClient).signInByCertificate(options);
    }
  }, {
    key: "signOut",
    value: function signOut(options) {
      var _this = this;

      return _classPrivateFieldGet(this, _httpClient).signOut(options).always(function () {
        return _classPrivateFieldGet(_this, _mqttClient).signOut(options).done(function () {
          console.log('MQTT connection closed too');
        });
      });
    }
  }, {
    key: "attachCertificate",
    value: function attachCertificate(username, password, options) {
      options = options || {};
      options.params = [username, password];
      return this.execute('GetSessionInfo -attachCert -amiLogin=? -amiPassword=?', options);
    }
  }, {
    key: "detachCertificate",
    value: function detachCertificate(username, password, options) {
      options = options || {};
      options.params = [username, password];
      return this.execute('GetSessionInfo -detachCert -amiLogin=? -amiPassword=?', options);
    }
  }, {
    key: "addUser",
    value: function addUser(username, password, firstName, lastName, email, captchaHash, captchaText, attachCert, agree, options) {
      options = options || {};
      options.params = [username, password, firstName, lastName, email, captchaHash, captchaText];
      return this.execute('AddUser -amiLogin=? -amiPassword=? -firstName=? -lastName=? -email=? -captchaHash=? -captchaText=? ' + (attachCert ? ' -attachCert' : '') + (agree ? ' -agree' : ''), options);
    }
  }, {
    key: "changeInfo",
    value: function changeInfo(firstName, lastName, email, options) {
      options = options || {};
      options.params = [firstName, lastName, email];
      return this.execute('SetUserInfo -firstName=? -lastName=? -email=?', options);
    }
  }, {
    key: "changePassword",
    value: function changePassword(username, oldPassword, newPassword, options) {
      options = options || {};
      options.params = [username, oldPassword, newPassword];
      return this.execute('ChangePassword -amiLogin=? -amiPasswordOld=? -amiPasswordNew=?', options);
    }
  }, {
    key: "resetPassword",
    value: function resetPassword(username, captchaHash, captchaText, options) {
      options = options || {};
      options.params = [username, captchaHash, captchaText];
      return this.execute('ResetPassword -amiLogin=? -captchaHash=? -captchaText=?', options);
    }
  }]);

  return AMICommand;
}();

var AMICommand_amiCommand = new AMICommand();

if (typeof window !== 'undefined') {
  window.amiCommand = AMICommand_amiCommand;
}

/* harmony default export */ const core_AMICommand = (AMICommand_amiCommand);
;// CONCATENATED MODULE: ./src/core/AMIInterface.js


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var ami = {};

if (typeof window !== 'undefined') {
  window.ami = ami;
}

/* harmony default export */ const AMIInterface = (ami);

function _setupCtx(ctxDefaults, ctxOptionals, ctxOptions, ctx, defaults, optionals, options) {
  if (options) {
    for (var _i = 0, _Object$entries = Object.entries(options); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          val = _Object$entries$_i[1];

      ctxOptions[key] = val;
      ctx[key] = val;
    }
  }

  if (optionals) {
    for (var _i2 = 0, _Object$entries2 = Object.entries(optionals); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
          _key = _Object$entries2$_i[0],
          _val = _Object$entries2$_i[1];

      if (!(_key in ctx)) {
        if (_key !== 'context') {
          ctxOptionals[_key] = _val;
        }

        ctx[_key] = _val;
      }
    }
  }

  if (defaults) {
    for (var _i3 = 0, _Object$entries3 = Object.entries(defaults); _i3 < _Object$entries3.length; _i3++) {
      var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
          _key2 = _Object$entries3$_i[0],
          _val2 = _Object$entries3$_i[1];

      ctxDefaults[_key2] = _val2;
      ctx[_key2] = _val2;
    }
  }

  ctx.httpEndpoint = core_AMICommand.getHTTPEndpoint();
  ctx.mqttEndpoint = core_AMICommand.getMQTTEndpoint();
  return ctx;
}

$AMIInterface('ami.ISubApp', {
  onReady: function onReady(userdata) {},
  onExit: function onExit(userdata) {},
  onLogin: function onLogin(userdata) {},
  onLogout: function onLogout(userdata) {}
});
$AMIClass('ami.SubApp', {
  $implements: [ami.ISubApp],
  ctxDefaults: {},
  ctxOptionals: {},
  ctxOptions: {},
  ctx: {},
  setupCtx: function setupCtx(defaults, optionals, settings) {
    return _setupCtx(this.ctxDefaults, this.ctxOptionals, this.ctxOptions, this.ctx, defaults, optionals, settings);
  },
  onExit: function onExit() {},
  onLogin: function onLogin() {},
  onLogout: function onLogout() {}
});
;// CONCATENATED MODULE: ./src/core/utilities/tools.js


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
function asArray(x) {
  return Array.isArray(x) ? x : [x];
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
    for (var _i = 0; _i < l; _i++) {
      result.push(optionDefaults[_i]);
    }
  }

  return result;
}
;// CONCATENATED MODULE: ./src/core/utilities/locks.js


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

  if (lines.length > 2) {
    console.log("lock[".concat(_curLockCnt, "] :: ").concat(lines[2]));
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

  if (lines.length > 2) {
    console.log("unlock[".concat(_curLockCnt, "] :: ").concat(lines[2]));
  }
}
function modalLeave() {
  var lines = getStack().split('\n');

  if (lines.length > 2) {
    console.log("modalLock[".concat(_curLockCnt, "] :: ").concat(lines[2]));
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
    console.log("modalUnlock[".concat(_curLockCnt, "] :: ").concat(lines[2]));
  }
}
var _canLeave = true;
function canLeave(canLeave) {
  _canLeave = canLeave;
}
// EXTERNAL MODULE: ./node_modules/ami-twig/index.js
var ami_twig = __webpack_require__(444);
;// CONCATENATED MODULE: ./src/core/utilities/text.js



var _replace = ami_twig/* default.stdlib._replace */.Z.stdlib._replace;
var _textToHtmlX = ['&', '"', '<', '>'];
var _textToHtmlY = ['&amp;', '&quot;', '&lt;', '&gt;'];
function textToHtml(s) {
  return _replace(s || '', _textToHtmlX, _textToHtmlY);
}
function htmlToText(s) {
  return _replace(s || '', _textToHtmlY, _textToHtmlX);
}
var _textToStringX = ['\\', '\n', '"', '\''];
var _textToStringY = ['\\\\', '\\n', '\\"', '\\\''];
function textToString(s) {
  return _replace(s || '', _textToStringX, _textToStringY);
}
function stringToText(s) {
  return _replace(s || '', _textToStringY, _textToStringX);
}
var _htmlToStringX = ['\\', '\n', '&quot;', '\''];
var _htmlToStringY = ['\\\\', '\\n', '\\&quot;', '\\\''];
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
;// CONCATENATED MODULE: ./src/core/utilities/messages.js





var _linkExp = new RegExp('\\[([^\\]]*)]\\(([^)]*)\\)', 'g');

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
  var toast = $("#ami_alert_content > .toast[data-hash=\"".concat(hash, "\"]"));

  if (toast.length === 0) {
    var html = "\n<div class=\"toast\" role=\"alert\" ".concat(fadeOut ? 'data-delay="60000"' : 'data-autohide="false"', " data-hash=\"").concat(hash, "\" data-cnt=\"1\">\n\t<div class=\"toast-header\">\n\t\t<strong class=\"mr-auto text-").concat(clazz, "\">").concat(textToHtml(title), "</strong>\n\t\t<small class=\"ml-2\">").concat(textToHtml(date), "</small>\n\t\t<button class=\"ml-2 mb-1 close\" type=\"button\" data-dismiss=\"toast\">\n\t\t\t&times;\n\t\t</button>\n\t</div>\n\t<div class=\"toast-body\">\n\t\t").concat(textToHtml(message), "\n\t</div>\n</div>\n");
    $('#ami_alert_content').append(html.replace(_linkExp, '<a href="' + '$1' + '" target="_blank">$2</a>')).promise().done(function () {
      $("#ami_alert_content > .toast[data-hash=\"".concat(hash, "\"]")).toast('show');
    });
  } else {
    toast.find('.toast-header > strong').html(textToHtml(title) + " <span class=\"badge badge-".concat(clazz, "\">").concat(toast.attr('data-cnt', parseInt(toast.attr('data-cnt')) + 1).attr('data-cnt'), "</span>"));
    toast.find('.toast-header > small').html(textToHtml(date));
    toast.toast('show');
  }

  console.log("AMI :: ".concat(title.toUpperCase(), ": ").concat(message, "\n").concat(getStack()));
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
;// CONCATENATED MODULE: ./src/core/AMIRouter.js


function AMIRouter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AMIRouter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function AMIRouter_createClass(Constructor, protoProps, staticProps) { if (protoProps) AMIRouter_defineProperties(Constructor.prototype, protoProps); if (staticProps) AMIRouter_defineProperties(Constructor, staticProps); return Constructor; }

function AMIRouter_classPrivateFieldInitSpec(obj, privateMap, value) { AMIRouter_checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function AMIRouter_checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function AMIRouter_classPrivateFieldGet(receiver, privateMap) { var descriptor = AMIRouter_classExtractFieldDescriptor(receiver, privateMap, "get"); return AMIRouter_classApplyDescriptorGet(receiver, descriptor); }

function AMIRouter_classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function AMIRouter_classPrivateFieldSet(receiver, privateMap, value) { var descriptor = AMIRouter_classExtractFieldDescriptor(receiver, privateMap, "set"); AMIRouter_classApplyDescriptorSet(receiver, descriptor, value); return value; }

function AMIRouter_classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function AMIRouter_classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _webAppURL = new WeakMap();

var _webAppArgs = new WeakMap();

var _webAppHash = new WeakMap();

var _scriptURL = new WeakMap();

var _scriptArgs = new WeakMap();

var _scriptHash = new WeakMap();

var _originURL = new WeakMap();

var _routes = new WeakMap();

var AMIRouter = function () {
  function AMIRouter(prodJsFilename, devJsFilename) {
    AMIRouter_classCallCheck(this, AMIRouter);

    AMIRouter_classPrivateFieldInitSpec(this, _webAppURL, {
      writable: true,
      value: ''
    });

    AMIRouter_classPrivateFieldInitSpec(this, _webAppArgs, {
      writable: true,
      value: {}
    });

    AMIRouter_classPrivateFieldInitSpec(this, _webAppHash, {
      writable: true,
      value: ''
    });

    AMIRouter_classPrivateFieldInitSpec(this, _scriptURL, {
      writable: true,
      value: ''
    });

    AMIRouter_classPrivateFieldInitSpec(this, _scriptArgs, {
      writable: true,
      value: {}
    });

    AMIRouter_classPrivateFieldInitSpec(this, _scriptHash, {
      writable: true,
      value: ''
    });

    AMIRouter_classPrivateFieldInitSpec(this, _originURL, {
      writable: true,
      value: ''
    });

    AMIRouter_classPrivateFieldInitSpec(this, _routes, {
      writable: true,
      value: []
    });

    var webappUrl = new URL(window.location);

    var scriptUrl = this._findThisJs(prodJsFilename, devJsFilename);

    if (!scriptUrl) {
      throw "cannot find neither '".concat(prodJsFilename, "' nor '").concat(devJsFilename, "'");
    }

    AMIRouter_classPrivateFieldSet(this, _webAppURL, webappUrl.protocol === 'file:' ? "file://".concat(webappUrl.pathname) : "".concat(webappUrl.origin).concat(webappUrl.pathname));

    AMIRouter_classPrivateFieldSet(this, _webAppArgs, this._parseSearchString(webappUrl.search));

    AMIRouter_classPrivateFieldSet(this, _webAppHash, webappUrl.hash.substring(1));

    AMIRouter_classPrivateFieldSet(this, _scriptURL, scriptUrl.protocol === 'file:' ? "file://".concat(scriptUrl.pathname) : "".concat(scriptUrl.origin).concat(scriptUrl.pathname));

    AMIRouter_classPrivateFieldSet(this, _scriptArgs, this._parseSearchString(scriptUrl.search));

    AMIRouter_classPrivateFieldSet(this, _scriptHash, scriptUrl.hash.substring(1));

    var idx;

    if ((idx = AMIRouter_classPrivateFieldGet(this, _scriptURL).indexOf(prodJsFilename)) > 0) {
      AMIRouter_classPrivateFieldSet(this, _originURL, this._eatSlashes(AMIRouter_classPrivateFieldGet(this, _scriptURL).substring(0, idx)));
    } else if ((idx = AMIRouter_classPrivateFieldGet(this, _scriptURL).indexOf(devJsFilename)) > 0) {
      AMIRouter_classPrivateFieldSet(this, _originURL, this._eatSlashes(AMIRouter_classPrivateFieldGet(this, _scriptURL).substring(0, idx)));
    }
  }

  AMIRouter_createClass(AMIRouter, [{
    key: "_findThisJs",
    value: function _findThisJs(prodJsFilename, devJsFilename) {
      var scripts = document.getElementsByTagName('script');

      for (var i = 0; i < scripts.length; i++) {
        var url = new URL(scripts[i].src);

        if (url.pathname.endsWith(prodJsFilename) > 0 || url.pathname.endsWith(devJsFilename) > 0) {
          return url;
        }
      }

      return null;
    }
  }, {
    key: "_parseSearchString",
    value: function _parseSearchString(search) {
      var result = {};
      search.substring(1).split('&').forEach(function (param) {
        var parts = param.split('=');

        if (parts.length === 1) {
          result[decodeURIComponent(parts[0]).toLowerCase()] = '';
        } else if (parts.length === 2) {
          result[decodeURIComponent(parts[0]).toLowerCase()] = decodeURIComponent(parts[1]);
        }
      });
      return result;
    }
  }, {
    key: "_eatSlashes",
    value: function _eatSlashes(url) {
      url = url.trim();

      while (url[url.length - 1] === '/') {
        url = url.substring(0, url.length - 1);
      }

      return url;
    }
  }, {
    key: "getWebAppURL",
    value: function getWebAppURL() {
      return AMIRouter_classPrivateFieldGet(this, _webAppURL);
    }
  }, {
    key: "getWebAppArgs",
    value: function getWebAppArgs() {
      return AMIRouter_classPrivateFieldGet(this, _webAppArgs);
    }
  }, {
    key: "getWebAppHash",
    value: function getWebAppHash() {
      return AMIRouter_classPrivateFieldGet(this, _webAppHash);
    }
  }, {
    key: "getScriptURL",
    value: function getScriptURL() {
      return AMIRouter_classPrivateFieldGet(this, _scriptURL);
    }
  }, {
    key: "getScriptArgs",
    value: function getScriptArgs() {
      return AMIRouter_classPrivateFieldGet(this, _scriptArgs);
    }
  }, {
    key: "getWebappHash",
    value: function getWebappHash() {
      return AMIRouter_classPrivateFieldGet(this, _scriptHash);
    }
  }, {
    key: "getOriginURL",
    value: function getOriginURL() {
      return AMIRouter_classPrivateFieldGet(this, _originURL);
    }
  }, {
    key: "append",
    value: function append(regExp, handler) {
      AMIRouter_classPrivateFieldGet(this, _routes).unshift({
        regExp: regExp,
        handler: handler
      });

      return this;
    }
  }, {
    key: "remove",
    value: function remove(regExp) {
      AMIRouter_classPrivateFieldSet(this, _routes, AMIRouter_classPrivateFieldGet(this, _routes).filter(function (route) {
        return route.regExp.toString() !== regExp.toString();
      }));

      return this;
    }
  }, {
    key: "check",
    value: function check() {
      var m;

      for (var i = 0; i < AMIRouter_classPrivateFieldGet(this, _routes).length; i++) {
        m = AMIRouter_classPrivateFieldGet(this, _webAppHash).match(AMIRouter_classPrivateFieldGet(this, _routes)[i].regExp);

        if (m) {
          AMIRouter_classPrivateFieldGet(this, _routes)[i].handler.apply(amiRouter, m);

          return true;
        }
      }

      return false;
    }
  }, {
    key: "appendHistoryEntry",
    value: function appendHistoryEntry(path) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (history.pushState) {
        history.pushState(context, null, AMIRouter_classPrivateFieldGet(this, _webAppURL) + this._eatSlashes(path));
        return true;
      }

      return false;
    }
  }, {
    key: "replaceHistoryEntry",
    value: function replaceHistoryEntry(path) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (history.replaceState) {
        history.replaceState(context, null, AMIRouter_classPrivateFieldGet(this, _webAppURL) + this._eatSlashes(path));
        return true;
      }

      return false;
    }
  }]);

  return AMIRouter;
}();

var amiRouter = new AMIRouter('js/ami.min.js', 'js/ami.js');

if (typeof window !== 'undefined') {
  window.amiRouter = amiRouter;
}

/* harmony default export */ const core_AMIRouter = (amiRouter);
;// CONCATENATED MODULE: ./src/core/utilities/view.js


function view_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { view_typeof = function _typeof(obj) { return typeof obj; }; } else { view_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return view_typeof(obj); }

function view_slicedToArray(arr, i) { return view_arrayWithHoles(arr) || view_iterableToArrayLimit(arr, i) || view_unsupportedIterableToArray(arr, i) || view_nonIterableRest(); }

function view_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function view_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return view_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return view_arrayLikeToArray(o, minLen); }

function view_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function view_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function view_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





function fillBreadcrumb(items) {
  var s = Array.isArray(items) ? items.map(function (item) {
    return "<li class=\"breadcrumb-item\">".concat(item.replace(/{{ORIGIN_URL}}/g, core_AMIRouter.getOriginURL).replace(/{{WEBAPP_URL}}/g, core_AMIRouter.getWebAppURL()), "</li>");
  }).join('') : '';
  $('#ami_breadcrumb_content').html(s);
}

var _idRegExp = new RegExp('[a-zA-Z][a-zA-Z0-9]{7}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{12}', 'g');

function _xxxHTML(selector, twig, mode, options) {
  var result = $.Deferred();

  var _setup = setup(['context', 'suffix', 'dict', 'twigs'], [result, null, {}, {}], options),
      _setup2 = view_slicedToArray(_setup, 4),
      context = _setup2[0],
      suffix = _setup2[1],
      dict = _setup2[2],
      twigs = _setup2[3];

  if (suffix) {
    twig = twig.replace(_idRegExp, function (id) {
      return "".concat(id, "_instance").concat(suffix);
    });
  }

  var html = formatTWIG(twig, dict, twigs);
  var promise;
  var el = $(selector);

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
      promise = el.replaceWith(el.is('[id]') ? html.replace(/^\s*(<[a-zA-Z_-]+)/, "$1 id=\"".concat(el.attr('id'), "\"")) : html).promise();
      break;

    default:
      throw 'internal error';
  }

  promise.done(function () {
    var el = $(selector);

    var _find = mode === 3 ? function (_selector) {
      return el.find(selector).addBack(selector);
    } : function (_selector) {
      return el.find(_selector);
    };

    if (jQuery.fn.tooltip) {
      _find('[data-toggle="tooltip"]').tooltip({
        html: false,
        delay: {
          show: 500,
          hide: 100
        }
      });
    }

    if (jQuery.fn.popover) {
      _find('[data-toggle="popover"]').popover({
        html: true,
        delay: {
          show: 500,
          hide: 100
        }
      });
    }

    result.resolveWith(context, [el]);
  });
  return result.promise();
}

function replaceHTML(selector, twig, options) {
  return _xxxHTML(selector, twig, 0, options);
}
function prependHTML(selector, twig, options) {
  return _xxxHTML(selector, twig, 1, options);
}
function appendHTML(selector, twig, options) {
  return _xxxHTML(selector, twig, 2, options);
}
function formatTWIG(twig, dict, twigs) {
  var result = [];

  var render = function render(twig, dict) {
    if (view_typeof(dict) !== 'object') {
      dict = {};
    }

    if (view_typeof(dict) !== 'object') {
      twigs = {};
    }

    dict['ORIGIN_URL'] = core_AMIRouter.getOriginURL();
    dict['WEBAPP_URL'] = core_AMIRouter.getWebAppURL();
    return ami_twig/* default.engine.render */.Z.engine.render(twig, dict, twigs);
  };

  asArray(dict).forEach(function (DICT) {
    try {
      result.push(render(twig, DICT, twigs));
    } catch (e) {
      error("TWIG parsing error: ".concat(e.message));
    }
  });
  return result.join('');
}
;// CONCATENATED MODULE: ./src/core/utilities/controls.js


function controls_slicedToArray(arr, i) { return controls_arrayWithHoles(arr) || controls_iterableToArrayLimit(arr, i) || controls_unsupportedIterableToArray(arr, i) || controls_nonIterableRest(); }

function controls_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function controls_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return controls_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return controls_arrayLikeToArray(o, minLen); }

function controls_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function controls_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function controls_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var _controls = {};
function loadControl(control, options) {
  var result = $.Deferred();

  var _setup = setup(['context'], [result], options),
      _setup2 = controls_slicedToArray(_setup, 1),
      context = _setup2[0];

  if (control.indexOf('ctrl:') === 0) {
    control = control.substring(5);
  }

  var descr = _controls[control.toLowerCase()];

  if (descr) {
    loadScripts("".concat(core_AMIRouter.getOriginURL(), "/").concat(descr.file)).then(function (loaded) {
      try {
        var clazz = window[descr.clazz];
        var promise = loaded[0] ? clazz.prototype.onReady.apply(clazz.prototype) : null;

        _internal_then(promise, function () {
          result.resolveWith(context, [clazz]);
        }, function (message) {
          result.rejectWith(context, ["cannot load control '".concat(control, "': ").concat(message)]);
        });
      } catch (message) {
        result.rejectWith(context, ["cannot load control '".concat(control, "': ").concat(message)]);
      }
    }, function (message) {
      result.rejectWith(context, ["cannot load control '".concat(control, "': ").concat(message)]);
    });
  } else {
    result.rejectWith(context, ["cannot load control '".concat(control, "': undefined")]);
  }

  return result.promise();
}
function createControl(parent, owner, control, params, options) {
  var result = $.Deferred();

  var _setup3 = setup(['context'], [result], options),
      _setup4 = controls_slicedToArray(_setup3, 1),
      context = _setup4[0];

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
function createControlInBody(parent, owner, control, controlParamsWithoutOptions, controlOptions, parentOptions, options) {
  var result = $.Deferred();

  var _setup5 = setup(['context'], [result], options),
      _setup6 = controls_slicedToArray(_setup5, 1),
      context = _setup6[0];

  try {
    var PARAMS = [];
    var SETTINGS = {};

    for (var key in parentOptions) {
      SETTINGS[key] = parentOptions[key];
    }

    for (var _key2 in controlOptions) {
      SETTINGS[_key2] = controlOptions[_key2];
    }

    Array.prototype.push.apply(PARAMS, controlParamsWithoutOptions);
    PARAMS.push(SETTINGS);
    createControl(parent, owner, control, PARAMS).done(function () {
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
function createControlInContainer(parent, owner, control, controlParamsWithoutOptions, controlOptions, parentOptions, icon, title, options) {
  var result = $.Deferred();

  var _setup7 = setup(['context'], [result], options),
      _setup8 = controls_slicedToArray(_setup7, 1),
      context = _setup8[0];

  try {
    parent.appendItem("<i class=\"fa fa-".concat(textToHtml(icon), "\"></i> ").concat(textToHtml(title))).done(function (selector) {
      var PARAMS = [];
      var SETTINGS = {};

      for (var key in parentOptions) {
        SETTINGS[key] = parentOptions[key];
      }

      for (var _key4 in controlOptions) {
        SETTINGS[_key4] = controlOptions[_key4];
      }

      PARAMS.push(selector);
      Array.prototype.push.apply(PARAMS, controlParamsWithoutOptions);
      PARAMS.push(SETTINGS);
      createControl(parent, owner, control, PARAMS).done(function () {
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
function createControlFromWebLink(parent, owner, el, parentOptions, options) {
  var dataCtrl = el.hasAttribute('data-ctrl') ? el.getAttribute('data-ctrl') : '';
  var dataCtrlLocation = el.hasAttribute('data-ctrl-location') ? el.getAttribute('data-ctrl-location') : '';
  var dataParams = el.hasAttribute('data-params') ? JSON.parse(el.getAttribute('data-params')) : [];
  var dataOptions = el.hasAttribute('data-settings') ? JSON.parse(el.getAttribute('data-settings')) : {};
  var dataIcon = el.hasAttribute('data-icon') ? el.getAttribute('data-icon') : 'question';
  var dataTitle = el.hasAttribute('data-title') ? el.getAttribute('data-title') : 'Unknown';
  lock();

  if (dataCtrlLocation === 'body') {
    return createControlInBody(parent, owner, dataCtrl, dataParams, dataOptions, parentOptions, options).done(function () {
      unlock();
    }).fail(function (message) {
      error(message);
    });
  } else {
    return createControlInContainer(parent, owner, dataCtrl, dataParams, dataOptions, parentOptions, dataIcon, dataTitle, options).done(function () {
      unlock();
    }).fail(function (message) {
      error(message);
    });
  }
}
;// CONCATENATED MODULE: ./src/core/utilities/ressources.js


function ressources_slicedToArray(arr, i) { return ressources_arrayWithHoles(arr) || ressources_iterableToArrayLimit(arr, i) || ressources_unsupportedIterableToArray(arr, i) || ressources_nonIterableRest(); }

function ressources_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function ressources_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return ressources_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ressources_arrayLikeToArray(o, minLen); }

function ressources_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ressources_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function ressources_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




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

function __loadXXX(deferred, result, urls, dataType, context) {
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

        __loadXXX(deferred, result, urls, dataType, context);
      }, function (message) {
        deferred.rejectWith(context, [message]);
      });
      break;

    case 'subapp':
      loadSubApp(url).then(function (data) {
        result.push(data);

        __loadXXX(deferred, result, urls, dataType, context);
      }, function (message) {
        deferred.rejectWith(context, [message]);
      });
      break;

    case 'sheet':
      if (_sheets.indexOf(url) >= 0) {
        result.push(false);

        __loadXXX(deferred, result, urls, dataType, context);
      } else {
        $.ajax({
          url: url,
          async: false,
          cache: false,
          crossDomain: true,
          dataType: dataTYPE
        }).then(function () {
          result.push(true);

          _sheets.push(url);

          __loadXXX(deferred, result, urls, dataType, context);
        }, function () {
          deferred.rejectWith(context, ["cannot load '".concat(url, "'")]);
        });
      }

      break;

    case 'script':
      if (_scripts.indexOf(url) >= 0) {
        result.push(false);

        __loadXXX(deferred, result, urls, dataType, context);
      } else {
        $.ajax({
          url: url,
          async: false,
          cache: false,
          crossDomain: true,
          dataType: dataTYPE
        }).then(function () {
          result.push(true);

          _scripts.push(url);

          __loadXXX(deferred, result, urls, dataType, context);
        }, function () {
          deferred.rejectWith(context, ["cannot load '".concat(url, "'")]);
        });
      }

      break;

    default:
      $.ajax({
        url: url,
        async: true,
        cache: false,
        crossDomain: true,
        dataType: dataTYPE
      }).then(function (data) {
        result.push(data);

        __loadXXX(deferred, result, urls, dataType, context);
      }, function () {
        deferred.rejectWith(context, ["cannot load '".concat(url, "'")]);
      });
      break;
  }
}

function _loadXXX(urls, dataType, options) {
  var deferred = $.Deferred();

  var _setup = setup(['context'], [deferred], options),
      _setup2 = ressources_slicedToArray(_setup, 1),
      context = _setup2[0];

  __loadXXX(deferred, [], asArray(urls), dataType, context);

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
;// CONCATENATED MODULE: ./src/core/utilities/subapps.js


function subapps_slicedToArray(arr, i) { return subapps_arrayWithHoles(arr) || subapps_iterableToArrayLimit(arr, i) || subapps_unsupportedIterableToArray(arr, i) || subapps_nonIterableRest(); }

function subapps_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function subapps_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return subapps_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return subapps_arrayLikeToArray(o, minLen); }

function subapps_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function subapps_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function subapps_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









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

  if (core_AMIWebApp._isReady) {
    _internal_then(_currentSubappInstance.onLogin(_currentUserdata), function (message) {
      _internal_always(core_AMIWebApp.onRefresh(true), function () {
        result.resolve(message);
      });
    }, function (message) {
      _internal_always(core_AMIWebApp.onRefresh(true), function () {
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

  if (core_AMIWebApp._isReady) {
    _internal_then(_currentSubappInstance.onLogout(_currentUserdata), function (message) {
      _internal_always(core_AMIWebApp.onRefresh(false), function () {
        result.resolve(message);
      });
    }, function (message) {
      _internal_always(core_AMIWebApp.onRefresh(false), function () {
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

  var _setup = setup(['context'], [result], options),
      _setup2 = subapps_slicedToArray(_setup, 1),
      context = _setup2[0];

  result.always(function () {
    unlock();
  });
  lock();

  if (subapp.indexOf('subapp:') === 0) {
    subapp = subapp.substring(7);
  }

  var descr = _subapps[subapp.toLowerCase()];

  if (descr) {
    loadScripts("".concat(core_AMIRouter.getOriginURL(), "/").concat(descr.file)).then(function (loaded) {
      fillBreadcrumb(descr.breadcrumb);

      try {
        _currentSubappInstance.onExit(userdata);

        var instance = window[descr.instance];
        _currentSubappInstance = instance;
        var promise = loaded[0] ? instance.onReady(userdata) : null;

        _internal_then(promise, function () {
          var promise = core_AMIAuth.isAuthenticated() ? triggerLogin() : triggerLogout();
          promise.then(function () {
            result.resolveWith(context, [instance]);
          }, function (message) {
            result.rejectWith(context, ["cannot load subapp '".concat(subapp, "': ").concat(message)]);
          });
        }, function (message) {
          result.rejectWith(context, ["cannot load subapp '".concat(subapp, "': ").concat(message)]);
        });
      } catch (message) {
        result.rejectWith(context, ["cannot load subapp '".concat(subapp, "': ").concat(message)]);
      }
    }, function (message) {
      result.rejectWith(context, ["cannot load subapp '".concat(subapp, "': ").concat(message)]);
    });
  } else {
    result.rejectWith(context, ["cannot load subapp '".concat(subapp, "': undefined")]);
  }

  return result.promise();
}
function loadSubAppByURL(defaultSubApp, defaultUserData) {
  var result = $.Deferred();
  var args = core_AMIRouter.getWebAppArgs();

  if (args['v']) {
    amiCommand.execute('GetHashInfo -hash=?', {
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
      loadSubApp(subapp, userdata).then(function () {
        result.resolve();
      }, function (message) {
        result.reject(message);
      });
    });
  } else {
    if (!core_AMIRouter.check()) {
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
;// CONCATENATED MODULE: ./src/core/AMIAuth.js


function AMIAuth_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AMIAuth_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function AMIAuth_createClass(Constructor, protoProps, staticProps) { if (protoProps) AMIAuth_defineProperties(Constructor.prototype, protoProps); if (staticProps) AMIAuth_defineProperties(Constructor, staticProps); return Constructor; }






var AMIAuth = function () {
  function AMIAuth() {
    AMIAuth_classCallCheck(this, AMIAuth);
  }

  AMIAuth_createClass(AMIAuth, [{
    key: "init",
    value: function init(ssoAutoAuthentication, ssoAuthenticationAllowed, passwordAuthenticationAllowed, certificateAuthenticationAllowed, logoutAllowed, createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed, captchaAllowed, bookmarksAllowed) {
      var result = $.Deferred();
      var userdata = core_AMIRouter.getWebAppArgs()['userdata'] || '';

      _internal_then(core_AMIWebApp.onReady(userdata), function () {
        core_AMIWebApp._isReady = true;
        triggerLogin();
        result.resolve();
      }, function (message) {
        core_AMIWebApp._isReady = true;
        triggerLogin();
        result.reject(message);
      });

      return result;
    }
  }, {
    key: "isAuthenticated",
    value: function isAuthenticated() {
      return false;
    }
  }]);

  return AMIAuth;
}();

var amiAuth = new AMIAuth();

if (typeof window !== 'undefined') {
  window.amiAuth = amiAuth;
}

/* harmony default export */ const core_AMIAuth = (amiAuth);
;// CONCATENATED MODULE: ./src/core/AMIExtension.js


function AMIExtension_slicedToArray(arr, i) { return AMIExtension_arrayWithHoles(arr) || AMIExtension_iterableToArrayLimit(arr, i) || AMIExtension_unsupportedIterableToArray(arr, i) || AMIExtension_nonIterableRest(); }

function AMIExtension_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function AMIExtension_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return AMIExtension_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return AMIExtension_arrayLikeToArray(o, minLen); }

function AMIExtension_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function AMIExtension_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function AMIExtension_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function AMIExtension_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { AMIExtension_typeof = function _typeof(obj) { return typeof obj; }; } else { AMIExtension_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return AMIExtension_typeof(obj); }


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
    if (AMIExtension_typeof(options) === 'object' && options.dataType === 'sheet') {
      var result = $.Deferred();

      var _setup = setup(['context', 'url'], [result, ''], options),
          _setup2 = AMIExtension_slicedToArray(_setup, 2),
          context = _setup2[0],
          url = _setup2[1];

      if (url) {
        $('head').append("<link rel=\"stylesheet\" type=\"text/css\" href=\"".concat(url, "\"></link>")).promise().done(function () {
          result.resolveWith(context);
        });
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

  var _ami_internal_removeEvt = new $.Event('remove');

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
          if (this.hasClass('form-editor-hidden')) {
            var session = this.data('session');
            return session ? session.getValue() : '';
          }
        } else if (arguments.length === 1) {
          if (this.hasClass('form-editor-hidden')) {
            var _session = this.data('session');

            if (_session) _session.setValue(arguments[0]);
            return this;
          }
        }

      return _ami_internal_jQueryVal.apply(this, arguments);
    },
    remove: function remove() {
      $(this).trigger(_ami_internal_removeEvt);
      return _ami_internal_jQueryRemove.apply(this, arguments);
    }
  });
  var _ami_internal_modalZIndex = 1050;
  $(document).on('show.bs.modal', '.modal', function (e) {
    var el = $(e.currentTarget);
    setTimeout(function () {
      $('body > .modal-backdrop:last').css('z-index', _ami_internal_modalZIndex++);
      el.css('z-index', _ami_internal_modalZIndex++);
    }, 10);
  });
}
// EXTERNAL MODULE: ./src/images/logo.png
var logo = __webpack_require__(702);
// EXTERNAL MODULE: ./src/images/background.jpg
var background = __webpack_require__(122);
;// CONCATENATED MODULE: ./src/core/AMIWebApp.js


function AMIWebApp_slicedToArray(arr, i) { return AMIWebApp_arrayWithHoles(arr) || AMIWebApp_iterableToArrayLimit(arr, i) || AMIWebApp_unsupportedIterableToArray(arr, i) || AMIWebApp_nonIterableRest(); }

function AMIWebApp_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function AMIWebApp_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return AMIWebApp_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return AMIWebApp_arrayLikeToArray(o, minLen); }

function AMIWebApp_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function AMIWebApp_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function AMIWebApp_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function AMIWebApp_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AMIWebApp_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function AMIWebApp_createClass(Constructor, protoProps, staticProps) { if (protoProps) AMIWebApp_defineProperties(Constructor.prototype, protoProps); if (staticProps) AMIWebApp_defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function AMIWebApp_classPrivateFieldInitSpec(obj, privateMap, value) { AMIWebApp_checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function AMIWebApp_checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function AMIWebApp_classPrivateFieldGet(receiver, privateMap) { var descriptor = AMIWebApp_classExtractFieldDescriptor(receiver, privateMap, "get"); return AMIWebApp_classApplyDescriptorGet(receiver, descriptor); }

function AMIWebApp_classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function AMIWebApp_classPrivateFieldSet(receiver, privateMap, value) { var descriptor = AMIWebApp_classExtractFieldDescriptor(receiver, privateMap, "set"); AMIWebApp_classApplyDescriptorSet(receiver, descriptor, value); return value; }

function AMIWebApp_classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function AMIWebApp_classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }















var _embedded = new WeakMap();

var _noBootstrap = new WeakMap();

var _noDateTimePicker = new WeakMap();

var _noSelect = new WeakMap();

var AMIWebApp = function () {
  function AMIWebApp() {
    var _this = this;

    AMIWebApp_classCallCheck(this, AMIWebApp);

    AMIWebApp_classPrivateFieldInitSpec(this, _embedded, {
      writable: true,
      value: false
    });

    AMIWebApp_classPrivateFieldInitSpec(this, _noBootstrap, {
      writable: true,
      value: false
    });

    AMIWebApp_classPrivateFieldInitSpec(this, _noDateTimePicker, {
      writable: true,
      value: false
    });

    AMIWebApp_classPrivateFieldInitSpec(this, _noSelect, {
      writable: true,
      value: false
    });

    _defineProperty(this, "_globalDeferred", $.Deferred());

    _defineProperty(this, "_isReady", false);

    _defineProperty(this, "webAppURL", '');

    _defineProperty(this, "scriptURL", '');

    _defineProperty(this, "originURL", '');

    _defineProperty(this, "args", {});

    _defineProperty(this, "hash", '');

    _defineProperty(this, "typeOf", typeOf);

    _defineProperty(this, "asArray", asArray);

    _defineProperty(this, "setup", setup);

    _defineProperty(this, "getStack", getStack);

    _defineProperty(this, "lock", lock);

    _defineProperty(this, "unlock", unlock);

    _defineProperty(this, "modalEnter", modalEnter);

    _defineProperty(this, "modalLeave", modalLeave);

    _defineProperty(this, "canLeave", canLeave);

    _defineProperty(this, "error", error);

    _defineProperty(this, "info", info);

    _defineProperty(this, "success", success);

    _defineProperty(this, "warning", warning);

    _defineProperty(this, "flush", flush);

    _defineProperty(this, "textToHtml", textToHtml);

    _defineProperty(this, "htmlToText", htmlToText);

    _defineProperty(this, "textToString", textToString);

    _defineProperty(this, "stringToText", stringToText);

    _defineProperty(this, "htmlToString", htmlToString);

    _defineProperty(this, "stringToHtml", stringToHtml);

    _defineProperty(this, "textToSQL", textToSQL);

    _defineProperty(this, "sqlToText", sqlToText);

    _defineProperty(this, "fillBreadcrumb", fillBreadcrumb);

    _defineProperty(this, "replaceHTML", replaceHTML);

    _defineProperty(this, "prependHTML", prependHTML);

    _defineProperty(this, "appendHTML", appendHTML);

    _defineProperty(this, "formatTWIG", formatTWIG);

    _defineProperty(this, "loadResources", loadResources);

    _defineProperty(this, "loadSheets", loadSheets);

    _defineProperty(this, "loadScripts", loadScripts);

    _defineProperty(this, "loadJSONs", loadJSONs);

    _defineProperty(this, "loadXMLs", loadXMLs);

    _defineProperty(this, "loadHTMLs", loadHTMLs);

    _defineProperty(this, "loadTWIGs", loadTWIGs);

    _defineProperty(this, "loadTexts", loadTexts);

    _defineProperty(this, "loadSubApp", loadSubApp);

    _defineProperty(this, "loadSubAppByURL", loadSubAppByURL);

    _defineProperty(this, "loadControl", loadControl);

    _defineProperty(this, "createControl", createControl);

    _defineProperty(this, "createControlInBody", createControlInBody);

    _defineProperty(this, "createControlInContainer", createControlInContainer);

    _defineProperty(this, "createControlFromWebLink", createControlFromWebLink);

    AMIExtension();
    var scriptArgs = core_AMIRouter.getScriptArgs();

    AMIWebApp_classPrivateFieldSet(this, _embedded, 'embedded' in scriptArgs);

    AMIWebApp_classPrivateFieldSet(this, _noBootstrap, 'nobootstrap' in scriptArgs);

    AMIWebApp_classPrivateFieldSet(this, _noDateTimePicker, 'nodatetimepicker' in scriptArgs);

    AMIWebApp_classPrivateFieldSet(this, _noSelect, 'noselect2' in scriptArgs);

    this.webAppURL = core_AMIRouter.getWebAppURL();
    this.scriptURL = core_AMIRouter.getScriptURL();
    this.originURL = core_AMIRouter.getOriginURL();
    this.args = core_AMIRouter.getWebAppArgs();
    this.hash = core_AMIRouter.getWebAppHash();
    var resourcesCSS = [];
    var resourcesJS = [];

    if (!window.Popper) {
      resourcesJS.push("".concat(this.originURL, "/js/assets/js/popper.min.js"));
    }

    if (!window.moment) {
      resourcesJS.push("".concat(this.originURL, "/js/assets/js/moment.min.js"));
    }

    if (!AMIWebApp_classPrivateFieldGet(this, _noBootstrap) && typeof jQuery.fn.modal !== 'function') {
      resourcesJS.push("".concat(this.originURL, "/js/assets/css/bootstrap.min.css"));
      resourcesJS.push("".concat(this.originURL, "/js/assets/js/bootstrap.min.js"));
    }

    if (!AMIWebApp_classPrivateFieldGet(this, _noSelect) && typeof jQuery.fn.select2 !== 'function') {
      resourcesCSS.push("".concat(this.originURL, "/js/assets/css/select2.min.css"));
      resourcesJS.push("".concat(this.originURL, "/js/assets/js/select2.min.js"));
    }

    this.loadResources([].concat(resourcesCSS, resourcesJS)).done(function (resources) {
      _this._globalDeferred.resolve(resources);
    }).fail(function (message) {
      _this._globalDeferred.reject(message);
    }).always(function () {
      __webpack_require__(301);
    });
  }

  AMIWebApp_createClass(AMIWebApp, [{
    key: "onReady",
    value: function onReady(userdata) {
      if (!AMIWebApp_classPrivateFieldGet(this, _embedded)) {
        alert('error: \'amiWebApp.onReady()\' must be overloaded!');
      }

      return null;
    }
  }, {
    key: "onRefresh",
    value: function onRefresh(isAuth) {
      if (!AMIWebApp_classPrivateFieldGet(this, _embedded)) {
        alert('error: \'amiWebApp.onRefresh()\' must be overloaded!');
      }

      return null;
    }
  }, {
    key: "start",
    value: function start(options) {
      var _this2 = this;

      this._globalDeferred.done(function () {
        var _setup = setup(['logo_url', 'background_url', 'home_url', 'contact_email', 'about_url', 'theme_url', 'locker_url', 'http_endpoint_url', 'mqtt_endpoint_url', 'sso_auto_authentication', 'sso_authentication_allowed', 'password_authentication_allowed', 'certificate_authentication_allowed', 'logout_allowed', 'create_account_allowed', 'change_info_allowed', 'change_password_allowed', 'change_certificate_allowed', 'captcha_allowed', 'bookmarks_allowed'], [logo, background, _this2.webAppURL, 'ami@lpsc.in2p3.fr', 'https://cern.ch/ami/', _this2.originURL + '/twig/Themes/blue.twig', _this2.originURL + '/twig/Lockers/default.twig', _this2.originURL + '/AMI/FrontEnd', _this2.originURL + '/MQTT', false, false, true, true, true, true, true, true, true, true, true], options),
            _setup2 = AMIWebApp_slicedToArray(_setup, 20),
            logoURL = _setup2[0],
            backgroundURL = _setup2[1],
            homeURL = _setup2[2],
            contactEmail = _setup2[3],
            aboutURL = _setup2[4],
            themeURL = _setup2[5],
            lockerURL = _setup2[6],
            httpEndpointURL = _setup2[7],
            mqttEndpointURL = _setup2[8],
            ssoAutoAuthentication = _setup2[9],
            ssoAuthenticationAllowed = _setup2[10],
            passwordAuthenticationAllowed = _setup2[11],
            certificateAuthenticationAllowed = _setup2[12],
            logoutAllowed = _setup2[13],
            createAccountAllowed = _setup2[14],
            changeInfoAllowed = _setup2[15],
            changePasswordAllowed = _setup2[16],
            changeCertificateAllowed = _setup2[17],
            captchaAllowed = _setup2[18],
            bookmarksAllowed = _setup2[19];

        amiCommand.init(httpEndpointURL, mqttEndpointURL);

        window.onbeforeunload = function (e) {
          if (!_canLeave) {
            var f = e || window.event;

            if (f) {
              f.returnValue = 'Confirm that you want to leave this page?';
            }

            return 'Confirm that you want to leave this page?';
          }
        };

        var controlsURL = "".concat(_this2.originURL, "/controls/CONTROLS.json");
        var subappsURL = "".concat(_this2.originURL, "/subapps/SUBAPPS.json");
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

            if (!AMIWebApp_classPrivateFieldGet(_this2, _embedded)) {
              var dict = {
                LOGO_URL: logoURL,
                BACKGROUND_URL: backgroundURL,
                HOME_URL: homeURL,
                CONTACT_EMAIL: contactEmail,
                ABOUT_URL: aboutURL
              };
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
                    core_AMIAuth.init(ssoAutoAuthentication, ssoAuthenticationAllowed, passwordAuthenticationAllowed, certificateAuthenticationAllowed, logoutAllowed, createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed, captchaAllowed, bookmarksAllowed).done(function () {
                      unlock();
                    }).fail(function (message) {
                      error(message);
                    });
                  });
                }, function () {
                  alert("could not open '".concat(lockerURL, "', please reload the page..."));
                });
              }, function () {
                alert("could not open '".concat(themeURL, "', please reload the page..."));
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
                  core_AMIAuth.init(ssoAutoAuthentication, ssoAuthenticationAllowed, passwordAuthenticationAllowed, certificateAuthenticationAllowed, logoutAllowed, createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed, captchaAllowed, bookmarksAllowed).done(function () {
                    unlock();
                  }).fail(function (message) {
                    error(message);
                  });
                });
              });
            }
          }, function () {
            alert("cannot open '".concat(subappsURL, "', please reload the page..."));
          });
        }, function () {
          alert("cannot open '".concat(controlsURL, "', please reload the page..."));
        });
      }).fail(function (message) {
        alert(message);
      });

      return this;
    }
  }]);

  return AMIWebApp;
}();

var amiWebApp = new AMIWebApp();

if (typeof window !== 'undefined') {
  window.amiWebApp = amiWebApp;
}

/* harmony default export */ const core_AMIWebApp = (amiWebApp);
;// CONCATENATED MODULE: ./src/core/AMIDoc.js


var amiDoc = {
  "classes": [{
    "name": "AMICommand",
    "desc": "",
    "implements": [],
    "inherits": [],
    "konstructor": {
      "name": "AMICommand",
      "params": []
    },
    "functions": [{
      "name": "init",
      "desc": "",
      "params": [{
        "name": "httpEndpoint",
        "type": "string",
        "desc": "the HTTP endpoint",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "mqttEndpoint",
        "type": "string",
        "desc": "the MQTT endpoint",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }, {
      "name": "getHTTPEndpoint",
      "desc": "Get the HTTP endpoint",
      "params": [],
      "returns": [{
        "type": "string",
        "desc": ""
      }]
    }, {
      "name": "getMQTTEndpoint",
      "desc": "Get the MQTT endpoint",
      "params": [],
      "returns": [{
        "type": "string",
        "desc": ""
      }]
    }, {
      "name": "execute",
      "desc": "Executes an AMI command",
      "params": [{
        "name": "command",
        "type": "string",
        "desc": "the command",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": "Object.<string, *>",
        "desc": "dictionary of optional parameters (mqtt, endpoint, serverName, converter, extras, params, context, timeout)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "mqttSignInByToken",
      "desc": "Signs in by JWT token (MQTT client)",
      "params": [{
        "name": "token",
        "type": "string",
        "desc": "the password",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "serverName",
        "type": "string",
        "desc": "the server name",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "mqttSignOut",
      "desc": "Signs out (MQTT client)",
      "params": [{
        "name": "options",
        "type": "Object.<string, *>",
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "signInByPassword",
      "desc": "Signs in by login/password (HTTP client)",
      "params": [{
        "name": "username",
        "type": "string",
        "desc": "the username",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "password",
        "type": "string",
        "desc": "the password",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": "Object.<string, *>",
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "signInByCertificate",
      "desc": "Signs in by certificate (HTTP client)",
      "params": [{
        "name": "options",
        "type": "Object.<string, *>",
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "signOut",
      "desc": "Signs out (HTTP client)",
      "params": [{
        "name": "options",
        "type": "Object.<string, *>",
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "attachCertificate",
      "desc": "Attaches a certificate",
      "params": [{
        "name": "username",
        "type": "string",
        "desc": "the username",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "password",
        "type": "string",
        "desc": "the password",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": "Object.<string, *>",
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "detachCertificate",
      "desc": "Detaches a certificate",
      "params": [{
        "name": "username",
        "type": "string",
        "desc": "the username",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "password",
        "type": "string",
        "desc": "the password",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": "Object.<string, *>",
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "addUser",
      "desc": "Adds a new username",
      "params": [{
        "name": "username",
        "type": "string",
        "desc": "the username",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "password",
        "type": "string",
        "desc": "the password",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "firstName",
        "type": "string",
        "desc": "the first name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "lastName",
        "type": "string",
        "desc": "the last name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "email",
        "type": "string",
        "desc": "the email",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "captchaHash",
        "type": "string",
        "desc": "the captcha hash generated by AMI",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "captchaText",
        "type": "string",
        "desc": "the captcha text entered by the username",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "attachCert",
        "type": "Boolean",
        "desc": "attach the current certificate",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "agree",
        "type": "Boolean",
        "desc": "agree with the terms and conditions",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": "Object.<string, *>",
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "changeInfo",
      "desc": "Changes the account information",
      "params": [{
        "name": "firstName",
        "type": "string",
        "desc": "the first name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "lastName",
        "type": "string",
        "desc": "the last name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "email",
        "type": "string",
        "desc": "the email",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": "Object.<string, *>",
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "changePassword",
      "desc": "Changes the account password",
      "params": [{
        "name": "username",
        "type": "string",
        "desc": "the username",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "oldPassword",
        "type": "string",
        "desc": "the old password",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "newPassword",
        "type": "string",
        "desc": "the new password",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": "Object.<string, *>",
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "resetPassword",
      "desc": "Resets the account password",
      "params": [{
        "name": "username",
        "type": "string",
        "desc": "the username",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "captchaHash",
        "type": "string",
        "desc": "the captcha hash generated by AMI",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "captchaText",
        "type": "string",
        "desc": "the captcha text entered by the username",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "options",
        "type": "Object.<string, *>",
        "desc": "dictionary of optional parameters (context)",
        "default": "{}",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }]
  }, {
    "name": "ami.SubApp",
    "desc": "The basic AMI sub-application",
    "implements": ["ami.ISubApp"],
    "inherits": [],
    "konstructor": {
      "name": "SubApp",
      "params": []
    },
    "functions": [{
      "name": "onReady",
      "desc": "Called when the sub-application is ready to run",
      "params": [{
        "name": "userdata",
        "type": "?",
        "desc": "userdata",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }, {
      "name": "onExit",
      "desc": "Called when the sub-application is about to exit",
      "params": [{
        "name": "userdata",
        "type": "?",
        "desc": "userdata",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }, {
      "name": "onLogin",
      "desc": "Called when logging in",
      "params": [{
        "name": "userdata",
        "type": "?",
        "desc": "userdata",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }, {
      "name": "onLogout",
      "desc": "Called when logging out",
      "params": [{
        "name": "userdata",
        "type": "?",
        "desc": "userdata",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }]
  }],
  "functions": [{
    "name": "_setupCtx",
    "desc": "",
    "params": [{
      "name": "ctxDefaults",
      "type": "Object.<string, *>",
      "desc": "",
      "default": "",
      "optional": "",
      "nullable": ""
    }, {
      "name": "ctxOptionals",
      "type": "Object.<string, *>",
      "desc": "",
      "default": "",
      "optional": "",
      "nullable": ""
    }, {
      "name": "ctxOptions",
      "type": "Object.<string, *>",
      "desc": "",
      "default": "",
      "optional": "",
      "nullable": ""
    }, {
      "name": "ctx",
      "type": "Object.<string, *>",
      "desc": "",
      "default": "",
      "optional": "",
      "nullable": ""
    }, {
      "name": "defaults",
      "type": "Object.<string, *>",
      "desc": "",
      "default": "",
      "optional": "",
      "nullable": ""
    }, {
      "name": "optionals",
      "type": "Object.<string, *>",
      "desc": "",
      "default": "",
      "optional": "",
      "nullable": ""
    }, {
      "name": "options",
      "type": "Object.<string, *>",
      "desc": "",
      "default": "",
      "optional": "",
      "nullable": ""
    }],
    "returns": [{
      "type": "Object.<string, *>",
      "desc": ""
    }]
  }, {
    "name": "_$createNamespace",
    "desc": "",
    "params": [{
      "name": "$name",
      "type": "string",
      "desc": "",
      "default": "",
      "optional": "",
      "nullable": ""
    }, {
      "name": "x",
      "type": "Object.<string, *>",
      "desc": "",
      "default": "",
      "optional": "",
      "nullable": ""
    }]
  }, {
    "name": "_$addToNamespace",
    "desc": "",
    "params": [{
      "name": "$name",
      "type": "string",
      "desc": "",
      "default": "",
      "optional": "",
      "nullable": ""
    }, {
      "name": "x",
      "type": "Object.<string, *>",
      "desc": "",
      "default": "",
      "optional": "",
      "nullable": ""
    }]
  }, {
    "name": "$AMINamespace",
    "desc": "Create a new namespace",
    "params": [{
      "name": "$name",
      "type": "string",
      "desc": "the namespace name",
      "default": "",
      "optional": "",
      "nullable": ""
    }, {
      "name": "$descr",
      "type": "Object.<string, *>",
      "desc": "the namespace body",
      "default": "{}",
      "optional": true,
      "nullable": ""
    }]
  }, {
    "name": "$AMIInterface",
    "desc": "Create a new interface",
    "params": [{
      "name": "$name",
      "type": "string",
      "desc": "the interface name",
      "default": "",
      "optional": "",
      "nullable": ""
    }, {
      "name": "$descr",
      "type": "Object.<string, *>",
      "desc": "the interface body",
      "default": "{}",
      "optional": true,
      "nullable": ""
    }]
  }, {
    "name": "$AMIClass",
    "desc": "Create a new class",
    "params": [{
      "name": "$name",
      "type": "string",
      "desc": "the class name",
      "default": "",
      "optional": "",
      "nullable": ""
    }, {
      "name": "$descr",
      "type": "Object.<string, *>",
      "desc": "the class body",
      "default": "{}",
      "optional": true,
      "nullable": ""
    }]
  }],
  "interfaces": [{
    "name": "ami.ISubApp",
    "desc": "The AMI sub-application interface",
    "implements": [],
    "inherits": [],
    "functions": [{
      "name": "onReady",
      "desc": "Called when the sub-application is ready to run",
      "params": [{
        "name": "userdata",
        "type": "?",
        "desc": "userdata",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }, {
      "name": "onExit",
      "desc": "Called when the sub-application is about to exit",
      "params": [{
        "name": "userdata",
        "type": "?",
        "desc": "userdata",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }, {
      "name": "onLogin",
      "desc": "Called when logging in",
      "params": [{
        "name": "userdata",
        "type": "?",
        "desc": "userdata",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }, {
      "name": "onLogout",
      "desc": "Called when logging out",
      "params": [{
        "name": "userdata",
        "type": "?",
        "desc": "userdata",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }]
  }],
  "namespaces": [{
    "name": "amiRouter",
    "desc": "The AMI url routing subsystem"
  }, {
    "name": "amiWebApp",
    "desc": "The AMI webapp subsystem",
    "events": [{
      "name": "onReady",
      "desc": "This method must be overloaded and is called when the Web application starts",
      "params": [{
        "name": "userdata",
        "type": "string",
        "desc": "",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }, {
      "name": "onRefresh",
      "desc": "This method must be overloaded and is called when the toolbar needs to be updated",
      "params": [{
        "name": "isAuth",
        "type": "boolean",
        "desc": "",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }]
  }]
};
/* harmony default export */ const AMIDoc = (amiDoc);
;// CONCATENATED MODULE: ./index.js






/* harmony default export */ const index = ({
  $AMIClass: $AMIClass,
  $AMINamespace: $AMINamespace,
  $AMIInterface: $AMIInterface,
  amiInterface: AMIInterface,
  amiCommand: core_AMICommand,
  amiWebApp: core_AMIWebApp,
  amiAuth: core_AMIAuth,
  amiDoc: AMIDoc
});
})();

/******/ })()
;