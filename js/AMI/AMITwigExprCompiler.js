/*!
 * AMITwigExprCompiler class
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* CLASS AMITwigExprTokenizer                                              */
/*-------------------------------------------------------------------------*/

var _ami_internal_num_regex = /^[0-9]+$/;
var _ami_internal_sid_regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

/*-------------------------------------------------------------------------*/

function _isNum(s) {

	return s.match(_ami_internal_num_regex) !== null;
}

/*-------------------------------------------------------------------------*/

function _isStr(s) {

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

function _isSId(s) {

	return s.match(_ami_internal_sid_regex) !== null;
}

/*-------------------------------------------------------------------------*/

function AMITwigExprTokenizer(tokens, line) {
	/*-----------------------------------------------------------------*/

	this.LP = 4;
	this.RP = 5;

	/*-----------------------------------------------------------------*/

	this.dict = {
		'or': TWIG_EXPR_NODE_TYPE_OR,
		'and': TWIG_EXPR_NODE_TYPE_AND,
		'==': TWIG_EXPR_NODE_TYPE_EQ,
		'!=': TWIG_EXPR_NODE_TYPE_NE,
		'<=': TWIG_EXPR_NODE_TYPE_GTE,
		'>=': TWIG_EXPR_NODE_TYPE_LTE,
		'<': TWIG_EXPR_NODE_TYPE_GT,
		'>': TWIG_EXPR_NODE_TYPE_LT,
		'is': TWIG_EXPR_NODE_TYPE_IS,
		'defined': TWIG_EXPR_NODE_TYPE_DEFINED,
		'empty': TWIG_EXPR_NODE_TYPE_EMPTY,
		'even': TWIG_EXPR_NODE_TYPE_EVEN,
		'odd': TWIG_EXPR_NODE_TYPE_ODD,
		'starts': TWIG_EXPR_NODE_TYPE_STARTS,
		'ends': TWIG_EXPR_NODE_TYPE_ENDS,
		'with': TWIG_EXPR_NODE_TYPE_WITH,
		'matches': TWIG_EXPR_NODE_TYPE_MATCHES,
		'in': TWIG_EXPR_NODE_TYPE_IN,
		'..': TWIG_EXPR_NODE_TYPE_RANGE,
		'+': TWIG_EXPR_NODE_TYPE_PLUS,
		'-': TWIG_EXPR_NODE_TYPE_MINUS,
		'*': TWIG_EXPR_NODE_TYPE_MUL,
		'/': TWIG_EXPR_NODE_TYPE_DIV,
		'%': TWIG_EXPR_NODE_TYPE_MOD,
		'not': TWIG_EXPR_NODE_TYPE_NOT,
		'(': this.LP,
		')': this.RP,
		'.': TWIG_EXPR_NODE_TYPE_DOT,
		'true': TWIG_EXPR_NODE_TYPE_BOOL,
		'false': TWIG_EXPR_NODE_TYPE_BOOL,
	};

	/*-----------------------------------------------------------------*/

	this.tokens = tokens;
	this.types = [/**/];

	this.i = 0;

	/*-----------------------------------------------------------------*/

	var token;
	var type;

	for(var indx = 0; indx < tokens.length; indx++) {

		token = this.tokens[indx];
		type = this.dict[token];

		if(type) {
			this.types.push(type);
		} else if(_isNum(token)) {
			this.types.push(TWIG_EXPR_NODE_TYPE_NUM);
		} else if(_isStr(token)) {
			this.types.push(TWIG_EXPR_NODE_TYPE_STR);
		} else if(_isSId(token)) {
			this.types.push(TWIG_EXPR_NODE_TYPE_SID);
		} else {
			throw 'error, line `' + line + '`, unknown token `' + token + '`';
		}
	}

	/*-----------------------------------------------------------------*/

	this.next = function() {

		this.i++;
	};

	/*-----------------------------------------------------------------*/

	this.isEmpty = function() {

		return this.i >= this.tokens.length;
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

		if(this.i < this.tokens.length) {

			var TYPE = this.types[this.i];

			return (type instanceof Array) ? (type.indexOf(TYPE) >= 0) : (type === TYPE);
		}
		
		return false;
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* CLASS AMITwigExprCompiler                                               */
/*-------------------------------------------------------------------------*/

function AMITwigExprCompiler() {
	/*-----------------------------------------------------------------*/

	this.parse = function(tokens, line) {
		/*---------------------------------------------------------*/

		this.tokenizer = new AMITwigExprTokenizer(tokens, this.line = line);

		/*---------------------------------------------------------*/

		this.rootElement = this.parseOr();

		if(!this.tokenizer.isEmpty()) {
			throw 'error, line `' + this.line + '`, unexpected token `' + this.tokenizer.peekToken() + '`';
		}

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.parseOr = function() {

		var left = this.parseAnd();

		/*---------------------------------------------------------*/
		/* Or : And ('or' And)*                                    */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_OR)) {

			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseOr();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseAnd = function() {

		var left = this.parseComp();

		/*---------------------------------------------------------*/
		/* And : Comp ('and' Comp)*                                */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_AND)) {

			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseAnd();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseComp = function() {

		var left = this.parseAddSub();

		/*---------------------------------------------------------*/
		/* Comp : AddSub (('<' | '>' | ...) AddSub)?               */
		/*---------------------------------------------------------*/

		/**/ if(this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_CMP_OPERATOR)) {

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

		else if(this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_IS)) {

			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var temp = node;

			if(this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_NOT)) {

				/**/ node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
				this.tokenizer.next();

				node.nodeLeft = temp;
				node.nodeRight = null;
			}

			if(this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_IS_XXX)) {

				var right = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
				this.tokenizer.next();

				temp.nodeLeft = left;
				temp.nodeRight = right;

			} else {
				throw 'error, line `' + this.line + '`, `defined`, `empty`, `even` or `odd` expected';
			}

			left = node;
		}

		/*---------------------------------------------------------*/
		/* Comp : AddSub (('starts' | 'ends') `width` AddSub)?     */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_XXX_WITH)) {

			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken() + 'with');
			this.tokenizer.next();

			if(this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_WITH)) {
				this.tokenizer.next();
			} else {
				throw 'error, line `' + this.line + '`, `width` expected';
			}

			var right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/* Comp : AddSub ('matches' AddSub)?                       */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_MATCHES)) {

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

		else if(this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_IN)) {

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

	this.parseAddSub = function() {

		var left = this.parseMulDiv();

		/*---------------------------------------------------------*/
		/* AddSub : MulDiv (('+' | '-') MulDiv)*                   */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType([TWIG_EXPR_NODE_TYPE_PLUS, TWIG_EXPR_NODE_TYPE_MINUS])) {

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

	this.parseMulDiv = function() {

		var left = this.parseNotPlusMinus();

		/*---------------------------------------------------------*/
		/* MulDiv : NotPlusMinus (('*' | '/' | '%') NotPlusMinus)* */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType([TWIG_EXPR_NODE_TYPE_MUL, TWIG_EXPR_NODE_TYPE_DIV, TWIG_EXPR_NODE_TYPE_MOD])) {

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

	this.parseNotPlusMinus = function() {
		/*---------------------------------------------------------*/
		/* NotPlusMinus : ('!' | '-' | '+')? X                     */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType([TWIG_EXPR_NODE_TYPE_NOT, TWIG_EXPR_NODE_TYPE_PLUS, TWIG_EXPR_NODE_TYPE_MINUS])) {

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

		/*---------------------------------------------------------*/

		throw 'error, line `' + this.line + '`, syntax error or tuncated expression';

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.parseGroup = function() {
		/*---------------------------------------------------------*/
		/* Group : '(' Or ')'                                      */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(this.tokenizer.LP)) {

			this.tokenizer.next();

			var node = this.parseOr();

			if(this.tokenizer.checkType(this.tokenizer.RP)) {

				this.tokenizer.next();

				return node;
			}

			throw 'error, line `' + this.line + '`, `)` expected';
		}

		/*---------------------------------------------------------*/

		return null;
	};

	/*-----------------------------------------------------------------*/

	this.parseQId = function() {
		/*---------------------------------------------------------*/
		/* QId : SID('.' SID)*                                     */
		/*---------------------------------------------------------*/

		var qid = '';

		if(this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_SID)) {

			qid += this.tokenizer.peekToken();
			this.tokenizer.next();

			while(this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_DOT)) {

				qid += this.tokenizer.peekToken();
				this.tokenizer.next();

				if(this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_SID)) {

					qid += this.tokenizer.peekToken();
					this.tokenizer.next();

				} else {
					throw 'error, line `' + this.line + '`, identifier expected';
				}
			}

			return new AMITwigExprNode(TWIG_EXPR_NODE_TYPE_SID, qid);
		}

		/*---------------------------------------------------------*/

		return null;
	};

	/*-----------------------------------------------------------------*/

	this.parseTerminal = function() {
		/*---------------------------------------------------------*/
		/* Terminal : NUM | STR                                    */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_TERMINAL)) {

			var node = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			return node;
		}

		/*---------------------------------------------------------*/

		return null;
	};

	/*-----------------------------------------------------------------*/

	this.parseRange = function(e) {
		/*---------------------------------------------------------*/
		/* Range : QId                                             */
		/*---------------------------------------------------------*/

		var node = this.parseQId();

		if(node != null) {
			return node;
		}

		/*---------------------------------------------------------*/
		/* Range : Terminal '..' Terminal                          */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_TERMINAL)) {

			var left = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			if(this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_RANGE)) {

				var node = new AMITwigExprNode(TWIG_EXPR_NODE_TYPE_RANGE, this.tokenizer.peekToken());
				this.tokenizer.next();

				if(this.tokenizer.checkType(TWIG_EXPR_NODE_TYPE_TERMINAL)) {

					var right = new AMITwigExprNode(this.tokenizer.peekType(), this.tokenizer.peekToken());
					this.tokenizer.next();

					node.nodeLeft = left;
					node.nodeRight = right;

					return node;
				}
			}
		}

		/*---------------------------------------------------------*/

		throw 'error, line `' + this.line + '`, invalid range';

		/*---------------------------------------------------------*/
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
TWIG_EXPR_NODE_TYPE_GTE = 104;
TWIG_EXPR_NODE_TYPE_LTE = 105;
TWIG_EXPR_NODE_TYPE_GT = 106;
TWIG_EXPR_NODE_TYPE_LT = 107;

TWIG_EXPR_NODE_TYPE_IS = 108;
TWIG_EXPR_NODE_TYPE_DEFINED = 109;
TWIG_EXPR_NODE_TYPE_EMPTY = 110;
TWIG_EXPR_NODE_TYPE_EVEN = 111;
TWIG_EXPR_NODE_TYPE_ODD = 112;
TWIG_EXPR_NODE_TYPE_STARTS = 113;
TWIG_EXPR_NODE_TYPE_ENDS = 114;
TWIG_EXPR_NODE_TYPE_WITH = 115;
TWIG_EXPR_NODE_TYPE_MATCHES = 116;
TWIG_EXPR_NODE_TYPE_IN = 117;
TWIG_EXPR_NODE_TYPE_RANGE = 118;

TWIG_EXPR_NODE_TYPE_PLUS = 119;
TWIG_EXPR_NODE_TYPE_MINUS = 120;

TWIG_EXPR_NODE_TYPE_MUL = 121;
TWIG_EXPR_NODE_TYPE_DIV = 122;
TWIG_EXPR_NODE_TYPE_MOD = 123;

TWIG_EXPR_NODE_TYPE_NOT = 124;

TWIG_EXPR_NODE_TYPE_SID = 125;
TWIG_EXPR_NODE_TYPE_DOT = 126;

TWIG_EXPR_NODE_TYPE_BOOL = 127;
TWIG_EXPR_NODE_TYPE_NUM = 128;
TWIG_EXPR_NODE_TYPE_STR = 129;

/*-------------------------------------------------------------------------*/

TWIG_EXPR_NODE_TYPE_CMP_OPERATOR = [
	TWIG_EXPR_NODE_TYPE_EQ,
	TWIG_EXPR_NODE_TYPE_NE,
	TWIG_EXPR_NODE_TYPE_GT,
	TWIG_EXPR_NODE_TYPE_LT,
	TWIG_EXPR_NODE_TYPE_GTE,
	TWIG_EXPR_NODE_TYPE_LTE,
];

TWIG_EXPR_NODE_TYPE_IS_XXX = [
	TWIG_EXPR_NODE_TYPE_DEFINED,
	TWIG_EXPR_NODE_TYPE_EMPTY,
	TWIG_EXPR_NODE_TYPE_EVEN,
	TWIG_EXPR_NODE_TYPE_ODD
];

TWIG_EXPR_NODE_TYPE_XXX_WITH = [
	TWIG_EXPR_NODE_TYPE_STARTS,
	TWIG_EXPR_NODE_TYPE_ENDS,
];

TWIG_EXPR_NODE_TYPE_TERMINAL = [
	TWIG_EXPR_NODE_TYPE_NUM,
	TWIG_EXPR_NODE_TYPE_STR,
];

/*-------------------------------------------------------------------------*/

function AMITwigExprNode(nodeType, nodeValue) {
	/*-----------------------------------------------------------------*/

	this.nodeType = nodeType
	this.nodeValue = nodeValue
	this.nodeLeft = null;
	this.nodeRight = null;

	/*-----------------------------------------------------------------*/

	this._dump = function(nodes, edges, pCnt) {

		var cnt = pCnt[0];

		nodes.push('\tnode' + cnt + ' [label="' + this.nodeValue.replace('"', '\\"') + '"];');

		if(this.nodeLeft) {
			var CNT = ++pCnt[0];
			edges.push('\tnode' + cnt + ' -> node' + CNT + ';');
			this.nodeLeft._dump(nodes, edges, pCnt);
		}

		if(this.nodeRight) {
			var CNT = ++pCnt[0];
			edges.push('\tnode' + cnt + ' -> node' + CNT + ';');
			this.nodeRight._dump(nodes, edges, pCnt);
		}
	};

	/*-----------------------------------------------------------------*/

	this.dump = function() {

		var nodes = [];
		var edges = [];

		this._dump(nodes, edges, [0]);

		return 'digraph ast {\n\trankdir=TB;\n' + nodes.join('\n') + '\n' + edges.join('\n') + '\n}';
	};

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiTwigExprParser = new AMITwigExprCompiler();

/*-------------------------------------------------------------------------*/
