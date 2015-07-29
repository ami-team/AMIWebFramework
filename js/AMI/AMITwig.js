/*!
 * AMITwig class
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* AMITwig                                                                 */
/*-------------------------------------------------------------------------*/

var amiTwig = {
	/*-----------------------------------------------------------------*/

	STATEMENT_RE: /\{\%\s*([a-zA-Z_][a-zA-Z0-9_]*)(.*?)\%\}/m,

	VARIABLE_RE: /\%\%\s*([a-zA-Z_][a-zA-Z0-9_]*)(?:\.([a-zA-Z_][a-zA-Z0-9_]*))?\s*\%\%/g,

	/*-----------------------------------------------------------------*/

	STACK_IF_NO: 0,
	STACK_IF_LOCK: 1,
	STACK_IF_UNLOCK: 2,
	STACK_FOR: 3,
	STACK_FILTER: 4,
	STACK_0: 5,

	/*-----------------------------------------------------------------*/

	haveToBeShown: function(stateStack, lastIndex) {
		/*---------------------------------------------------------*/

		if(stateStack[lastIndex] === this.STACK_IF_NO
		   ||
		   stateStack[lastIndex] === this.STACK_IF_LOCK
		 ) {
			return false;
		}

		/*---------------------------------------------------------*/

		for(var i = 0; i < lastIndex; i++) {

			if(stateStack[i] === this.STACK_IF_NO) {

				return false;
			}
		}

		/*---------------------------------------------------------*/

		return true;
	},

	/*-----------------------------------------------------------------*/

	error: function(line, s) {

		throw 'syntax error, line `' + line + '`, ' + s;
	},

	/*-----------------------------------------------------------------*/

	render: function(s, dict) {

		dict = dict || {};

		var result = '';

		var stateStack = [this.STACK_0];
		var iterStack = [[   null   ]];
		var varStack = [    null    ];

		var line = 1;

		for(;; s = s.substr(COLUMN_NR)) {
			/*-------------------------------------------------*/
			/*                                                 */
			/*-------------------------------------------------*/

			var m = s.match(this.STATEMENT_RE);

			/*-------------------------------------------------*/
			/*                                                 */
			/*-------------------------------------------------*/

			var lastIndex = stateStack.length - 1;

			/*-------------------------------------------------*/
			/*                                                 */
			/*-------------------------------------------------*/

			if(m === null) {
				/*-----------------------------------------*/
				/* GET LINE NUMBER                         */
				/*-----------------------------------------*/

				for(var i = 0; i < s.length; i++) {

					if(s.charAt(i) === '\n') {
						line++;
					}
				}

				/*-----------------------------------------*/
				/* GENERATE HTML                           */
				/*-----------------------------------------*/

				if(this.haveToBeShown(stateStack, lastIndex)) {

					result += s.replace(this.VARIABLE_RE, function(match, name, field) {

						if(!field) {
							return dict[name];
						} else {
							return dict[name][field];
						}
					});
				}

				/*-----------------------------------------*/
				/* CHECK FOR NON-CLOSED BLOCKS             */
				/*-----------------------------------------*/

				var msg = [];

				for(var i = 1; i < stateStack.length; i++) {

					var x = stateStack[i];

					/*****/ if(x === this.STACK_IF_NO
					           ||
					           x === this.STACK_IF_LOCK
					           ||
					           x === this.STACK_IF_UNLOCK
					 ) {
					 	msg.push('missing `endif`');

					 } else if(x === this.STACK_FOR) {

					 	msg.push('missing `endfor`');

					 } else if(x === this.STACK_FILTER) {

					 	msg.push('missing `endfilter`');
					 }
				}

				if(msg.length > 0) {
					this.error(line, msg.join(', '));
				}

				/*-----------------------------------------*/

				return result;
			}

			/*-------------------------------------------------*/
			/* GET NAME AND EXPRESSION                         */
			/*-------------------------------------------------*/

			var name = m[1];
			var expr = m[2];

			/*-------------------------------------------------*/
			/* GET POSITION AND LINE NUMBER                    */
			/*-------------------------------------------------*/

			var column_nr = m.index;
			var COLUMN_NR = m.index;

			COLUMN_NR += m[0].length;

			for(var i = 0; i < COLUMN_NR; i++) {

				if(s.charAt(i) === '\n') {
					line++;
				}
			}

			/*-------------------------------------------------*/
			/* TOKENIZE                                        */
			/*-------------------------------------------------*/

			var tokens = amiTokenizer.tokenize(
				m[2],
				[' ', '\t', '\n'],
				['b-or', 'b-xor', 'b-and', '===', '==', '!==', '!=', '=', '<=', '>=', '<', '>', '+', '-', '**', '*', '//', '/', '..', '.', '|', '(', ')'],
				['\'', '\"'],
				'\\',
				line
			);

			/*-------------------------------------------------*/
			/* GENERATE HTML                                   */
			/*-------------------------------------------------*/

			if(this.haveToBeShown(stateStack, lastIndex)) {

				var NAME = varStack[varStack.length - 1];
				var VALUE = iterStack[iterStack.length - 1];

				for(var i = 0; i < VALUE.length; i++) {

					result += s.substr(0, column_nr).replace(this.VARIABLE_RE, function(match, name, field) {

						if(!field) {
							return (name === NAME) ? VALUE[i] : dict[name];
						} else {
							return (name === NAME) ? VALUE[i][field] : dict[name][field];
						}
					});
				}
			}

			/*-------------------------------------------------*/
			/* IF KEYWORD                                      */
			/*-------------------------------------------------*/

			/***/ if(name === 'if') {

				amiTwigExprCompiler.parse(tokens, line);

				if(false) {

					stateStack.push(this.STACK_IF_NO);
					iterStack.push([null]);
					varStack.push(null);
				} else {
					stateStack.push(this.STACK_IF_UNLOCK);
					iterStack.push([null]);
					varStack.push(null);
				}
			}

			/*-------------------------------------------------*/
			/* ELSEIF KEYWORD                                  */
			/*-------------------------------------------------*/

			else if(name === 'elseif') {

				/****/ if(stateStack[lastIndex] === this.STACK_IF_NO) {

					if(false) {
						stateStack[lastIndex] = this.STACK_IF_NO;
					} else {
						stateStack[lastIndex] = this.STACK_IF_UNLOCK;
					}

				} else if(stateStack[lastIndex] === this.STACK_IF_UNLOCK) {

					stateStack[lastIndex] = this.STACK_IF_LOCK;
				}
			}

			/*-------------------------------------------------*/
			/* ELSE KEYWORD                                    */
			/*-------------------------------------------------*/

			else if(name === 'else') {

				/****/ if(stateStack[lastIndex] === this.STACK_IF_NO) {

					stateStack[lastIndex] = this.STACK_IF_UNLOCK;

				} else if(stateStack[lastIndex] === this.STACK_IF_UNLOCK) {

					stateStack[lastIndex] = this.STACK_IF_LOCK;
				}
			}

			/*-------------------------------------------------*/
			/* ENDIF KEYWORD                                   */
			/*-------------------------------------------------*/

			else if(name === 'endif') {

				var last = stateStack[lastIndex];

				if(last !== this.STACK_IF_NO
				   &&
				   last !== this.STACK_IF_LOCK
				   &&
				   last !== this.STACK_IF_UNLOCK
				 ) {
					this.error(line, 'missing `if`');
				}

				stateStack.pop();
				iterStack.pop();
				varStack.pop();
			}

			/*-------------------------------------------------*/
			/* FOR KEYWORD                                     */
			/*-------------------------------------------------*/

			else if(name === 'for') {

				var _iter = [/******/];
				var _var = tokens[0];

				/****/ if(tokens.length === 3 && tokens[1] === 'in' && _ami_internal_ami_internal_isSId(tokens[0]) && _ami_internal_isSId(tokens[2])) {

					if(tokens[2] in dict) {
						_iter = dict[tokens[2]];
					}

				} else if(tokens.length === 5 && tokens[1] === 'in' && _ami_internal_isSId(tokens[0]) && tokens[3] === '..') {

					var n1 = parseInt(tokens[2]);
					var n2 = parseInt(tokens[4]);

					/****/ if(!isNaN(n1)
					          &&
					          !isNaN(n2)
					 ) {
						for(var j = n1; j <= n2; j++) {
							_iter.push(j);
						}
			
					} else if(tokens[2].length === 3 && tokens[2][0] === '\'' && tokens[2][2] === '\''
					          &&
						  tokens[4].length === 3 && tokens[4][0] === '\'' && tokens[4][2] === '\''
					 ) {
						for(var j = tokens[2].charCodeAt(1); j <= tokens[4].charCodeAt(1); j++) {
							_iter.push(String.fromCharCode(j));
						}

					} else {
						this.error(line, 'syntax error in `range`');
					}

				} else {
					this.error(line, 'syntax error in `for`');
				}

				stateStack.push(this.STACK_FOR);
				iterStack.push(_iter);
				varStack.push(_var);
			}

			/*-------------------------------------------------*/
			/* ENDFOR KEYWORD                                  */
			/*-------------------------------------------------*/

			else if(name === 'endfor') {

				var last = stateStack[lastIndex];

				if(last !== this.STACK_FOR) {
					this.error(line, 'missing `for`');
				}

				stateStack.pop();
				iterStack.pop();
				varStack.pop();
			}

			/*-------------------------------------------------*/
			/* FILTER KEYWORD                                  */
			/*-------------------------------------------------*/

			else if(name === 'filter') {

				stateStack.push(this.STACK_FILTER);
				iterStack.push([null]);
				varStack.push(null);
			}

			/*-------------------------------------------------*/
			/* ENDFILTER KEYWORD                               */
			/*-------------------------------------------------*/

			else if(name === 'endfilter') {

				var last = stateStack[lastIndex];

				if(last !== this.STACK_FILTER) {
					this.error(line, 'missing `filter`');
				}

				stateStack.pop();
				iterStack.pop();
				varStack.pop();
			}

			/*-------------------------------------------------*/
			/* UNKNOWN KEYWORD                                 */
			/*-------------------------------------------------*/

			else {
				this.error(line, 'unknown keyword `' + name + '`');
			}

			/*-------------------------------------------------*/
		}
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
