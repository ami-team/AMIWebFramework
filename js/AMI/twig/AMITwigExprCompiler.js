/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* ami.twig.expr.tokens                                                    */
/*-------------------------------------------------------------------------*/

$AMINamespace('ami.twig.expr.tokens', {
	/*-----------------------------------------------------------------*/

	$init: function()
	{
		this.PLUS_MINUS = [
			this.PLUS,
			this.MINUS,
		];

		this.MUL_FLDIV_DIV_MOD = [
			this.MUL,
			this.FLDIV,
			this.DIV,
			this.MOD,
		];

		this.NOT_PLUS_MINUS = [
			this.NOT,
			this.PLUS,
			this.MINUS,
		];

		this.RX = [
			this.RP,
			this.RB,
		];
	},

	/*-----------------------------------------------------------------*/
	/* REAL TOKENS                                                     */
	/*-----------------------------------------------------------------*/

	LOGICAL_OR: 100,
	LOGICAL_AND: 101,
	BITWISE_OR: 102,
	BITWISE_XOR: 103,
	BITWISE_AND: 104,
	CMP_OP: 105,
	IS: 106,
	IS_XXX: 107,
	XXX_WITH: 108,
	WITH: 109,
	MATCHES: 110,
	IN: 111,
	RANGE: 112,
	PLUS: 113,
	MINUS: 114,
	POWER: 115,
	MUL: 116,
	FLDIV: 117,
	DIV: 118,
	MOD: 119,
	NOT: 120,
	DOT: 121,
	COMMA: 122,
	LP: 123,
	RP: 124,
	LB: 125,
	RB: 126,
	TERMINAL: 127,
	SID: 128,

	/*-----------------------------------------------------------------*/
	/* VIRTUAL TOKENS                                                  */
	/*-----------------------------------------------------------------*/

	FUN: 200,
	VAR: 201,

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* ami.twig.expr.Tokenizer                                                 */
/*-------------------------------------------------------------------------*/

$AMIClass('ami.twig.expr.Tokenizer', {
	/*-----------------------------------------------------------------*/

	_spaces: [' ', '\t', '\n', '\r'],

	/*-----------------------------------------------------------------*/

	_tokenDefs: [
		'or', 'and',
		'b-or', 'b-xor', 'b-and',
		'is',
		'defined', 'null', 'empty', 'iterable', 'even', 'odd',
		'===', '==', '!==', '!=', '<=', '>=', '<', '>',
		'starts', 'ends',
		'with',
		'matches',
		'in',
		'+', '-', '**', '*', '//', '/', '%',
		'not',
		'..', '.', ',',
		'(', ')', '[', ']',
		/^[0-9]+\.[0-9]+/, /^[0-9]+/, /^'(\\'|[^\'])*'/, /^"(\\"|[^\"])*"/,
		/^[a-zA-Z_$][a-zA-Z0-9_$]*/,
	],

	/*-----------------------------------------------------------------*/

	_tokenTypes: [
		ami.twig.expr.tokens.LOGICAL_OR, ami.twig.expr.tokens.LOGICAL_AND,
		ami.twig.expr.tokens.BITWISE_OR, ami.twig.expr.tokens.BITWISE_XOR, ami.twig.expr.tokens.BITWISE_AND,
		ami.twig.expr.tokens.IS,
		ami.twig.expr.tokens.IS_XXX, ami.twig.expr.tokens.IS_XXX, ami.twig.expr.tokens.IS_XXX, ami.twig.expr.tokens.IS_XXX, ami.twig.expr.tokens.IS_XXX, ami.twig.expr.tokens.IS_XXX,
		ami.twig.expr.tokens.CMP_OP, ami.twig.expr.tokens.CMP_OP, ami.twig.expr.tokens.CMP_OP, ami.twig.expr.tokens.CMP_OP, ami.twig.expr.tokens.CMP_OP, ami.twig.expr.tokens.CMP_OP, ami.twig.expr.tokens.CMP_OP, ami.twig.expr.tokens.CMP_OP,
		ami.twig.expr.tokens.XXX_WITH, ami.twig.expr.tokens.XXX_WITH,
		ami.twig.expr.tokens.WITH,
		ami.twig.expr.tokens.MATCHES,
		ami.twig.expr.tokens.IN,
		ami.twig.expr.tokens.PLUS, ami.twig.expr.tokens.MINUS, ami.twig.expr.tokens.POWER, ami.twig.expr.tokens.MUL, ami.twig.expr.tokens.FLDIV, ami.twig.expr.tokens.DIV, ami.twig.expr.tokens.MOD,
		ami.twig.expr.tokens.NOT,
		ami.twig.expr.tokens.RANGE, ami.twig.expr.tokens.DOT, ami.twig.expr.tokens.COMMA,
		ami.twig.expr.tokens.LP, ami.twig.expr.tokens.RP, ami.twig.expr.tokens.LB, ami.twig.expr.tokens.RB,
		ami.twig.expr.tokens.TERMINAL, ami.twig.expr.tokens.TERMINAL, ami.twig.expr.tokens.TERMINAL, ami.twig.expr.tokens.TERMINAL,
		ami.twig.expr.tokens.SID,
	],

	/*-----------------------------------------------------------------*/

	$init: function(code, line)
	{
		/*---------------------------------------------------------*/

		var result = ami.tokenizer.tokenize(
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
	},

	/*-----------------------------------------------------------------*/

	next: function(n)
	{
		this.i += n || 1;
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
/* ami.twig.expr.Compiler                                                  */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG expression compiler
 * @see An online <a href="http://cern.ch/ami/twig/" target="_blank">demo</a>.
 * @class ami/twig/expr/Compiler
 * @param {String} code the code
 * @param {Number} line the line
 * @throws {String} The error description
 */

$AMIClass('ami.twig.expr.Compiler', /** @lends ami/twig/expr/Compiler# */ {
	/*-----------------------------------------------------------------*/

	$init: function(code, line)
	{
		/*---------------------------------------------------------*/

		this.tokenizer = new ami.twig.expr.Tokenizer(
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
		/* LogicalOr : LogicalAnd 'or' LogicalOr                   */
		/*           | LogicalAnd                                  */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.LOGICAL_OR))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
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
		/* LogicalAnd : BitwiseOr 'and' LogicalAnd                 */
		/*            | BitwiseOr                                  */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.LOGICAL_AND))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
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
		/* BitwiseOr : BitwiseXor 'b-or' BitwiseOr                 */
		/*           | BitwiseXor                                  */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.BITWISE_OR))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
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
		/* BitwiseXor : BitwiseAnd 'b-xor' parseBitwiseXor         */
		/*            | BitwiseAnd                                 */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.BITWISE_XOR))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
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
		/* BitwiseAnd : Comp 'b-and' BitwiseAnd                    */
		/*            | Comp                                       */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.BITWISE_AND))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
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
		/* Comp : AddSub 'is' 'not'? ('defined' | 'null' | ...)    */
		/*---------------------------------------------------------*/

		/**/ if(this.tokenizer.checkType(ami.twig.expr.tokens.IS))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			/* swap 'is' and 'not' */
			var swap = node;
			/* swap 'is' and 'not' */

			if(this.tokenizer.checkType(ami.twig.expr.tokens.NOT))
			{
				node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
				this.tokenizer.next();

				node.nodeLeft = swap;
				node.nodeRight = null;
			}

			if(this.tokenizer.checkType(ami.twig.expr.tokens.IS_XXX))
			{
				var right = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
				this.tokenizer.next();

				swap.nodeLeft = left;
				swap.nodeRight = right;
			}
			else
			{
				throw 'syntax error, line `' + this.line + '`, keyword `defined` or `null` or `empty` or `iterable` or `even` or `odd` expected';
			}

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | AddSub ('===' | '==' | ...) AddSub               */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(ami.twig.expr.tokens.CMP_OP))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | AddSub ('starts' | 'ends') `with` AddSub         */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(ami.twig.expr.tokens.XXX_WITH))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken() + 'with');
			this.tokenizer.next(2);

			var right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | AddSub 'matches' AddSub                          */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(ami.twig.expr.tokens.MATCHES))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | AddSub 'in' X                                    */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(ami.twig.expr.tokens.IN))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseX();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | AddSub                                           */
		/*---------------------------------------------------------*/

		return left;
	},

	/*-----------------------------------------------------------------*/

	parseAddSub: function()
	{
		var left = this.parseMulDiv();

		/*---------------------------------------------------------*/
		/* AddSub : MulDiv ('+' | '-') AddSub                      */
		/*        | MulDiv                                         */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.PLUS_MINUS))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
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
		/* MulDiv : Power ('*' | '//' | '/' | '%') MulDiv          */
		/*        | Power                                          */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.MUL_FLDIV_DIV_MOD))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
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
		/* Power : NotPlusMinus '**' Power                         */
		/*       | NotPlusMinus                                    */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.POWER))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
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
		/* NotPlusMinus : ('not' | '-' | '+') Y                    */
		/*              | Y                                        */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.NOT_PLUS_MINUS))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var left = this.parseY();

			node.nodeLeft = left;
			node.nodeRight = null;

			return node;
		}

		/*---------------------------------------------------------*/

		return this.parseY();
	},

	/*-----------------------------------------------------------------*/

	parseX: function()
	{
		/*---------------------------------------------------------*/
		/* X : FunVar | Terminal                                   */
		/*---------------------------------------------------------*/

		var node;

		if((node = this.parseFunVar())) {
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

	parseY: function()
	{
		/*---------------------------------------------------------*/
		/* X : Group | FunVar | Terminal                           */
		/*---------------------------------------------------------*/

		var node;

		if((node = this.parseGroup())) {
			return node;
		}

		if((node = this.parseFunVar())) {
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

		if(this.tokenizer.checkType(ami.twig.expr.tokens.LP))
		{
			this.tokenizer.next();

			var node = this.parseLogicalOr();

			if(this.tokenizer.checkType(ami.twig.expr.tokens.RP))
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

	parseFunVar: function()
	{
		/*---------------------------------------------------------*/
		/* FunVar : SID ('.' SID)* '(' Params ')'                  */
		/*        | SID ('.' SID)* '[' Params ']'                  */
		/*        | SID ('.' SID)*                                 */
		/*---------------------------------------------------------*/

		var qid = '.';

		if(this.tokenizer.checkType(ami.twig.expr.tokens.SID))
		{
			qid += this.tokenizer.peekToken();
			this.tokenizer.next();

			while(this.tokenizer.checkType(ami.twig.expr.tokens.DOT))
			{
				qid += this.tokenizer.peekToken();
				this.tokenizer.next();

				if(this.tokenizer.checkType(ami.twig.expr.tokens.SID))
				{
					qid += this.tokenizer.peekToken();
					this.tokenizer.next();
				}
				else
				{
					throw 'syntax error, line `' + this.line + '`, id expected';
				}
			}

			/*-------------------------------------------------*/
			/* FUNCTION                                        */
			/*-------------------------------------------------*/

			if(this.tokenizer.checkType(ami.twig.expr.tokens.LP))
			{
				this.tokenizer.next();

				var L = this._parseParams();

				if(this.tokenizer.checkType(ami.twig.expr.tokens.RP))
				{
					this.tokenizer.next();
				}
				else
				{
					throw 'syntax error, line `' + this.line + '`, `)` expected';
				}

				var result = new ami.twig.expr.Node(ami.twig.expr.tokens.FUN, 'ami.twig.stdlib' + qid);
				result.list = L;
				return result;
			}

			/*-------------------------------------------------*/
			/* VARIABLE                                        */
			/*-------------------------------------------------*/

			if(this.tokenizer.checkType(ami.twig.expr.tokens.LB))
			{
				this.tokenizer.next();

				var L = this._parseParams();

				if(this.tokenizer.checkType(ami.twig.expr.tokens.RB))
				{
					this.tokenizer.next();
				}
				else
				{
					throw 'syntax error, line `' + this.line + '`, `]` expected';
				}

				var result = new ami.twig.expr.Node(ami.twig.expr.tokens.VAR, ((((((('_'))))))) + qid);
				result.list = L;
				return result;
			}

			/*-------------------------------------------------*/

			return new ami.twig.expr.Node(ami.twig.expr.tokens.VAR, ((((((('_'))))))) + qid);

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/

		return null;
	},

	/*-----------------------------------------------------------------*/

	_parseParams: function()
	{
		var result = [];

		while(this.tokenizer.checkType(ami.twig.expr.tokens.RX) === false)
		{
			result.push(this.parseLogicalOr());

			if(this.tokenizer.checkType(ami.twig.expr.tokens.COMMA) === true)
			{
				this.tokenizer.next();
			}
			else
			{
				return result;
			}
		}

		return result;
	},

	/*-----------------------------------------------------------------*/

	parseTerminal: function()
	{
		/*---------------------------------------------------------*/
		/* Terminal : TERMINAL | RANGE                             */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.TERMINAL))
		{
			var left = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			if(this.tokenizer.checkType(ami.twig.expr.tokens.RANGE))
			{
				var node = new ami.twig.expr.Node(((ami.twig.expr.tokens.RANGE)), this.tokenizer.peekToken());
				this.tokenizer.next();

				if(this.tokenizer.checkType(ami.twig.expr.tokens.TERMINAL))
				{
					var right = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
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
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* ami.twig.expr.Node                                                      */
/*-------------------------------------------------------------------------*/

$AMIClass('ami.twig.expr.Node', {
	/*-----------------------------------------------------------------*/

	$init: function(nodeType, nodeValue)
	{
		this.nodeType = nodeType;
		this.nodeValue = nodeValue;
		this.nodeLeft = null;
		this.nodeRight = null;
		this.list = [];
	},

	/*-----------------------------------------------------------------*/

	_dump: function(nodes, edges, pCnt)
	{
		var cnt = pCnt[0];

		nodes.push('\tnode' + cnt + ' [label="' + this.nodeValue.replace(/"/g, '\\"') + '"];');

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

		for(var i in this.list)
		{
			var CNT = ++pCnt[0];
			edges.push('\tnode' + cnt + ' -> node' + CNT + ';');
			this.list[i]._dump(nodes, edges, pCnt);
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
