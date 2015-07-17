/*!
 * AMITwigExprParser class
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/

function _isNumber(s) {

	return isNaN(s) === false;
}

/*-------------------------------------------------------------------------*/

function _isString(s) {

	var length = s.length - 1;

	return length >= 2
	       &&
	       (
	           (s[0] === '\'' && s[s.length - 1] === '\'')
	           ||
	           (s[0] === '\"' && s[s.length - 1] === '\"')
	       )
	;
}

/*-------------------------------------------------------------------------*/

function _isIdent(s) {

	return s.match(/^[a-zA-Z_]\w*$/) !== null;
}

/*-------------------------------------------------------------------------*/
/* CLASS AMITwigExprTokenizer                                              */
/*-------------------------------------------------------------------------*/

function AMITwigExprTokenizer(tokens, line) {
	/*-----------------------------------------------------------------*/

	this.LP = 4;
	this.RP = 5;

	/*-----------------------------------------------------------------*/

	this.i = 0;

	this.tokens = tokens;
	this.types = [/**/];

	for(var i = 0; i < tokens.length; i++) {

		var token = tokens[i];

		/****/ if(token === 'or') {
			this.types.push(TWIG_EXPR_NODE_TYPE_OR);
		} else if(token === 'and') {
			this.types.push(TWIG_EXPR_NODE_TYPE_AND);
		} else if(token === '==') {
			this.types.push(TWIG_EXPR_NODE_TYPE_EQ);
		} else if(token === '!=') {
			this.types.push(TWIG_EXPR_NODE_TYPE_NE);
		} else if(token === '<') {
			this.types.push(TWIG_EXPR_NODE_TYPE_GT);
		} else if(token === '>') {
			this.types.push(TWIG_EXPR_NODE_TYPE_LT);
		} else if(token === '<=') {
			this.types.push(TWIG_EXPR_NODE_TYPE_GTE);
		} else if(token === '>=') {
			this.types.push(TWIG_EXPR_NODE_TYPE_LTE);
		} else if(token === 'is') {
			this.types.push(TWIG_EXPR_NODE_TYPE_IS);
		} else if(token === 'defined') {
			this.types.push(TWIG_EXPR_NODE_TYPE_DEFINED);
		} else if(token === 'empty') {
			this.types.push(TWIG_EXPR_NODE_TYPE_EMPTY);
		} else if(token === 'in') {
			this.types.push(TWIG_EXPR_NODE_TYPE_IN);
		} else if(token === '..') {
			this.types.push(TWIG_EXPR_NODE_TYPE_RANGE);
		} else if(token === '+') {
			this.types.push(TWIG_EXPR_NODE_TYPE_PLUS);
		} else if(token === '-') {
			this.types.push(TWIG_EXPR_NODE_TYPE_MINUS);
		} else if(token === '*') {
			this.types.push(TWIG_EXPR_NODE_TYPE_MUL);
		} else if(token === '/') {
			this.types.push(TWIG_EXPR_NODE_TYPE_DIV);
		} else if(token === '%') {
			this.types.push(TWIG_EXPR_NODE_TYPE_MOD);
		} else if(token === 'not') {
			this.types.push(TWIG_EXPR_NODE_TYPE_NOT);
		} else if(token === '(') {
			this.types.push(this.LP);
		} else if(token === ')') {
			this.types.push(this.RP);
		} else if(token === '.') {
			this.types.push(TWIG_EXPR_NODE_TYPE_DOT);
		} else if(token === 'true') {
			this.types.push(TWIG_EXPR_NODE_TYPE_BOOL);
		} else if(token === 'false') {
			this.types.push(TWIG_EXPR_NODE_TYPE_BOOL);
		} else if(_isNumber(token)) {
			this.types.push(TWIG_EXPR_NODE_TYPE_NUM);
		} else if(_isString(token)) {
			this.types.push(TWIG_EXPR_NODE_TYPE_STR);
		} else if(_isIdent(token)) {
			this.types.push(TWIG_EXPR_NODE_TYPE_ID);
		} else {
			throw 'error, line `' + line + '`, unknown token `' + token + '`';
		}
	}

	/*-----------------------------------------------------------------*/

	this.hasNext = function() {

		return this.i < this.tokens.length;
	};

	/*-----------------------------------------------------------------*/

	this.next = function() {

		this.i++;
	};

	/*-----------------------------------------------------------------*/

	this.peekToken = function() {

		return this.tokens[this.i];
	};

	/*-----------------------------------------------------------------*/

	this.peekType = function() {

		return this.types[this.i];
	};

	/*-----------------------------------------------------------------*/

	this.checkType = function(type) {

		var TYPE = this.types[this.i];

		return (type instanceof Array) ? (type.indexOf(TYPE) >= 0) : (type === TYPE);
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* CLASS AMITwigExprParser                                                 */
/*-------------------------------------------------------------------------*/

function AMITwigExprParser() {
	/*-----------------------------------------------------------------*/

	this.parse = function(tokens, line) {

		this.tokenizer = new AMITwigExprTokenizer(tokens, this.line = line);

		this.rootElement = this.parseOr();
	};

	/*-----------------------------------------------------------------*/

	this.parseOr = function() {
		/*---------------------------------------------------------*/
		/* Or : And ('or' And)*                                    */
		/*---------------------------------------------------------*/

		var left = this.parseAnd();

		if(this.tokenizer.hasNext() && this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_OR)) {

			var node = new AMITwigExprNode(TWIG_EXPR_NODE_TYPE_OR);
			this.tokenizer.next();

			var right = this.parseOr();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseAnd = function() {
		/*---------------------------------------------------------*/
		/* And : Comp ('and' Comp)*                                */
		/*---------------------------------------------------------*/

		var left = this.parseComp();

		if(this.tokenizer.hasNext() && this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_AND)) {

			var node = new AMITwigExprNode(TWIG_EXPR_NODE_TYPE_AND);
			this.tokenizer.next();

			var right = this.parseAnd();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseComp = function() {
		/*---------------------------------------------------------*/
		/* Comp : AddSub (('<' | '>' | ...) AddSub)?               */
		/*---------------------------------------------------------*/

		var left = this.parseAddSub();

		if(this.tokenizer.hasNext() && this.tokenizer.checkType([TWIG_EXPR_NODE_TYPE_EQ, TWIG_EXPR_NODE_TYPE_NE, TWIG_EXPR_NODE_TYPE_GT, TWIG_EXPR_NODE_TYPE_LT, TWIG_EXPR_NODE_TYPE_GTE, TWIG_EXPR_NODE_TYPE_LTE])) {

			var node = new AMITwigExprNode(this.tokenizer.peekType());
			this.tokenizer.next();

			var right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseAddSub = function() {
		/*---------------------------------------------------------*/
		/* AddSub : MulDiv (('+' | '-') MulDiv)*                   */
		/*---------------------------------------------------------*/

		var left = this.parseMulDiv();

		if(this.tokenizer.hasNext() && this.tokenizer.checkType([TWIG_EXPR_NODE_TYPE_PLUS, TWIG_EXPR_NODE_TYPE_MINUS])) {

			var node = new AMITwigExprNode(this.tokenizer.peekType());
			this.tokenizer.next();

			var right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseMulDiv = function() {
		/*---------------------------------------------------------*/
		/* MulDiv : NotPlusMinus (('*' | '/' | '%') NotPlusMinus)* */
		/*---------------------------------------------------------*/

		var left = this.parseNotPlusMinus();

		if(this.tokenizer.hasNext() && this.tokenizer.checkType([TWIG_EXPR_NODE_TYPE_MUL, TWIG_EXPR_NODE_TYPE_DIV, TWIG_EXPR_NODE_TYPE_MOD])) {

			var node = new AMITwigExprNode(this.tokenizer.peekType());
			this.tokenizer.next();

			var right = this.parseMulDiv();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseNotPlusMinus = function() {
		/*---------------------------------------------------------*/
		/* NotPlusMinus : ('!' | '-' | '+')? X                     */
		/*---------------------------------------------------------*/

		if(this.tokenizer.hasNext() && this.tokenizer.checkType([TWIG_EXPR_NODE_TYPE_NOT, TWIG_EXPR_NODE_TYPE_PLUS, TWIG_EXPR_NODE_TYPE_MINUS])) {

			var node = new AMITwigExprNode(this.tokenizer.peekType());
			this.tokenizer.next();

			var left_and_right = this.parseX();

			node.nodeLeft = left_and_right;
			node.nodeRight = left_and_right;

			return node;
		}

		return this.parseX();
	};

	/*-----------------------------------------------------------------*/

	this.parseX = function() {
		/*---------------------------------------------------------*/
		/* X : Group | QId | Terminal                              */
		/*---------------------------------------------------------*/

		var node;

		if((node = this.parseGroup()) !== null) {
			return node;
		}

		if((node = this.parseQId()) !== null) {
			return node;
		}

		if((node = this.parseTerminal()) !== null) {
			return node;
		}

		throw 'error, line `' + this.line + '`, syntax error or tuncated expression';
	};

	/*-----------------------------------------------------------------*/

	this.parseGroup = function() {
		/*---------------------------------------------------------*/
		/* Group : '(' parseOr ')'                                 */
		/*---------------------------------------------------------*/

		if(this.tokenizer.hasNext() && this.tokenizer.checkType(this.tokenizer.LP)) {
			this.tokenizer.next();

			var node = this.parseOr();

			if(this.tokenizer.hasNext() && this.tokenizer.checkType(this.tokenizer.RP)) {
				this.tokenizer.next();

				return node;
			}

			throw 'error, line `' + this.line + '`, `)` expected';
		}

		return null;
	};

	/*-----------------------------------------------------------------*/

	this.parseQId = function() {
		/*---------------------------------------------------------*/
		/* QId : ID(.ID)?                                          */
		/*---------------------------------------------------------*/

		var qid = '';

		if(this.tokenizer.hasNext() && this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_ID)) {

			qid += this.tokenizer.peekToken();
			this.tokenizer.next();

			if(this.tokenizer.hasNext() && this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_DOT)) {

				qid += this.tokenizer.peekToken();
				this.tokenizer.next();

				if(this.tokenizer.hasNext() && this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_ID)) {

					qid += this.tokenizer.peekToken();
					this.tokenizer.next();
				}
			}

			return new AMITwigExprNode(TWIG_EXPR_NODE_TYPE_ID, qid);
		}

		return null;
	};

	/*-----------------------------------------------------------------*/

	this.parseTerminal = function() {
		/*---------------------------------------------------------*/
		/* Terminal : NUM | STR                                    */
		/*---------------------------------------------------------*/

		if(this.tokenizer.hasNext() && this.tokenizer.checkType([TWIG_EXPR_NODE_TYPE_NUM, TWIG_EXPR_NODE_TYPE_STR])) {

			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			return node;
		}

		return null;
	};

	/*-----------------------------------------------------------------*/

	this.parseRange = function(e) {
		/*---------------------------------------------------------*/
		/* Range : Terminal '..' Terminal                          */
		/*---------------------------------------------------------*/

		if(this.tokenizer.hasNext() && this.tokenizer.checkType([TWIG_EXPR_NODE_TYPE_NUM, TWIG_EXPR_NODE_TYPE_STR])) {

			var left = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			if(this.tokenizer.hasNext() && this.tokenizer.checkType(/*-------*/ TWIG_EXPR_NODE_TYPE_RANGE /*-------*/)) {

				var node = new AMITwigExprNode(TWIG_EXPR_NODE_TYPE_RANGE, this.tokenizer.peekToken());
				this.tokenizer.next();

				if(this.tokenizer.hasNext() && this.tokenizer.checkType([TWIG_EXPR_NODE_TYPE_NUM, TWIG_EXPR_NODE_TYPE_STR])) {

					var right = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
					this.tokenizer.next();

					node.nodeLeft = left;
					node.nodeRight = right;

					return node;
				}
			}
		}

		throw 'error, line `' + this.line + '`, invalid range';
	};

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* CLASS AMITwigExprNode                                                   */
/*-------------------------------------------------------------------------*/

TWIG_EXPR_NODE_TYPE_OR = 100;
TWIG_EXPR_NODE_TYPE_AND = 101;

TWIG_EXPR_NODE_TYPE_EQ = 102;
TWIG_EXPR_NODE_TYPE_NE = 103;
TWIG_EXPR_NODE_TYPE_GT = 104;
TWIG_EXPR_NODE_TYPE_LT = 105;
TWIG_EXPR_NODE_TYPE_GTE = 106;
TWIG_EXPR_NODE_TYPE_LTE = 107;

TWIG_EXPR_NODE_TYPE_IS = 108;
TWIG_EXPR_NODE_TYPE_DEFINED = 109;
TWIG_EXPR_NODE_TYPE_EMPTY = 110;
TWIG_EXPR_NODE_TYPE_IN = 111;
TWIG_EXPR_NODE_TYPE_RANGE = 112;

TWIG_EXPR_NODE_TYPE_PLUS = 113;
TWIG_EXPR_NODE_TYPE_MINUS = 114;

TWIG_EXPR_NODE_TYPE_MUL = 115;
TWIG_EXPR_NODE_TYPE_DIV = 116;
TWIG_EXPR_NODE_TYPE_MOD = 117;

TWIG_EXPR_NODE_TYPE_NOT = 118;

TWIG_EXPR_NODE_TYPE_ID = 119;
TWIG_EXPR_NODE_TYPE_DOT = 120;

TWIG_EXPR_NODE_TYPE_BOOL = 121;
TWIG_EXPR_NODE_TYPE_NUM = 122;
TWIG_EXPR_NODE_TYPE_STR = 123;

/*-------------------------------------------------------------------------*/

function AMITwigExprNode(nodeType, nodeValue) {

	this.nodeType = nodeType
	this.nodeValue = nodeValue
	this.nodeLeft = null;
	this.nodeRight = null;
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiTwigExprParser = new AMITwigExprParser();

/*-------------------------------------------------------------------------*/
