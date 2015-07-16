/*!
 * AMITwig class
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/

function __all(iterable, x) {

	for(var i = 0; i < iterable.length; i++) {

		if(iterable[i] === x) {
			return false;
		}
	}

	return true;
}

/*-------------------------------------------------------------------------*/
/* CLASS AMITwig                                                           */
/*-------------------------------------------------------------------------*/

function AMITwig() {
	/*-----------------------------------------------------------------*/

	this.DIRECTIVE_RE = new RegExp('\{\%[ \t]*([a-zA-Z]+)(.*?)\%\}', 'm');

	this.VARIABLE_RE = new RegExp('\%\%[ \t]*([a-zA-Z_][a-zA-Z0-9_]*)(?:\.([a-zA-Z_][a-zA-Z0-9_]*))?[ \t]*\%\%', 'g');

	this.IDENT_RE = new RegExp('[a-zA-Z_][a-zA-Z0-9_]*', '');

	/*-----------------------------------------------------------------*/

	this.STACK_IF_NO = 0;
	this.STACK_IF_LOCK = 1;
	this.STACK_IF_UNLOCK = 2;
	this.STACK_FOR = 3;
	this.STACK_0 = 4;

	/*-----------------------------------------------------------------*/

	this._haveToBeEaten = {};

	this._haveToBeEaten[this.STACK_IF_NO] = false;
	this._haveToBeEaten[this.STACK_IF_LOCK] = false;
	this._haveToBeEaten[this.STACK_IF_UNLOCK] = true;
	this._haveToBeEaten[this.STACK_FOR] = true;
	this._haveToBeEaten[this.STACK_0] = true;

	/*-----------------------------------------------------------------*/

	this.error = function(line, s) {

		throw 'error, line `' + line + '`, ' + s;
	};

	/*-----------------------------------------------------------------*/

	this.render = function(s, dict) {

		var result = '';

		var stateStack = [this.STACK_0];
		var iterStack = [[   null   ]];
		var varStack = [    null    ];

		var line = 1;

		for(;; s = s.substr(COLUMN_NR)) {
			/*-------------------------------------------------*/
			/*                                                 */
			/*-------------------------------------------------*/

			var m = s.match(this.DIRECTIVE_RE);

			/*-------------------------------------------------*/
			/*                                                 */
			/*-------------------------------------------------*/

			var lastIndex = stateStack.length - 1;

			/*-------------------------------------------------*/
			/*                                                 */
			/*-------------------------------------------------*/

			if(m === null) {
				/*-----------------------------------------*/
				/*                                         */
				/*-----------------------------------------*/

				for(var i = 0; i < s.length; i++) {

					if(s.charAt(i) === '\n') {
						line++;
					}
				}

				/*-----------------------------------------*/
				/*                                         */
				/*-----------------------------------------*/

				if(this._haveToBeEaten[stateStack[lastIndex]] && __all(stateStack, this.STACK_IF_NO)) {

					result += s.replace(this.VARIABLE_RE, function(match, name, field) {

						if(!field) {
							return dict[name];
						} else {
							return dict[name][field];
						}
					});
				}

				/*-----------------------------------------*/
				/*                                         */
				/*-----------------------------------------*/

				var msg = [];

				for(var i = 1; i < stateStack.length; i++) {

					var x = stateStack[i];

					/*****/ if(x !== this.STACK_IF_NO
					           &&
					           x !== this.STACK_IF_LOCK
					           &&
					           x !== this.STACK_IF_UNLOCK
					 ) {
					 	msg.push('missing `endif`');

					 } else if(x !== this.STACK_FOR) {

					 	msg.push('missing `endfor`');
					 }
				}

				if(msg.length > 0) {
					this.error(line, msg.join(', '));
				}

				/*-----------------------------------------*/

				return result;
			}

			/*-------------------------------------------------*/
			/* GET STATEMENT NAME AND EXPRESSION               */
			/*-------------------------------------------------*/

			var name = m[1];
			var expr = m[2];

			/*-------------------------------------------------*/
			/* GET STATEMENT POSITION AND LINE NUMBER          */
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
				['and', 'in', 'is', 'not', 'or', '(', ')', '..', '==', '!=', '<', '>', '<=', '>='],
				['\'', '\"'],
				'\\',
				line
			)

			/*-------------------------------------------------*/
			/* TEXT                                            */
			/*-------------------------------------------------*/

			if(this._haveToBeEaten[stateStack[lastIndex]] && __all(stateStack, this.STACK_IF_NO)) {

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
			/* IF STATEMENT                                    */
			/*-------------------------------------------------*/

			/***/ if(name === 'if') {

				console.log('EXPR: ' + expr);

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
			/* ELSEIF STATEMENT                                */
			/*-------------------------------------------------*/

			else if(name === 'elseif') {

				/****/ if(stateStack[lastIndex] === this.STACK_IF_NO) {

					console.log('EXPR: ' + expr);

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
			/* ELSE STATEMENT                                  */
			/*-------------------------------------------------*/

			else if(name === 'else') {

				/****/ if(stateStack[lastIndex] === this.STACK_IF_NO) {

					stateStack[lastIndex] = this.STACK_IF_UNLOCK;

				} else if(stateStack[lastIndex] === this.STACK_IF_UNLOCK) {

					stateStack[lastIndex] = this.STACK_IF_LOCK;
				}
			}

			/*-------------------------------------------------*/
			/* ENDIF STATEMENT                                 */
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
			/* FOR STATEMENT                                   */
			/*-------------------------------------------------*/

			else if(name === 'for') {

				var theArray = [];

				var theVar = tokens[0];

				/****/ if(tokens.length === 3 && tokens[1] === 'in' && tokens[0].match(this.IDENT_RE) && tokens[2].match(this.IDENT_RE)) {

					if(tokens[2] in dict) {
						theArray = dict[tokens[2]];
					}

				} else if(tokens.length === 5 && tokens[1] === 'in' && tokens[0].match(this.IDENT_RE) && tokens[3] === '..') {

					var n1 = parseInt(tokens[2]);
					var n2 = parseInt(tokens[4]);

					/****/ if(!isNaN(n1)
					          &&
					          !isNaN(n2)
					 ) {
						for(var j = n1; j <= n2; j++) {
							theArray.push(j);
						}
			
					} else if(tokens[2].length === 3 && tokens[2][0] === '\'' && tokens[2][2] === '\''
					          &&
						  tokens[4].length === 3 && tokens[4][0] === '\'' && tokens[4][2] === '\''
					 ) {
						for(var j = tokens[2].charCodeAt(1); j <= tokens[4].charCodeAt(1); j++) {
							theArray.push(String.fromCharCode(j));
						}

					} else {
						this.error(line, 'syntax error in `range`');
					}

				} else {
					this.error(line, 'syntax error in `for`');
				}

				stateStack.push(this.STACK_FOR);
				iterStack.push(theArray);
				varStack.push(theVar);
			}

			/*-------------------------------------------------*/
			/* ENDFOR STATEMENT                                */
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
			/* UNKNOWN STATEMENT                               */
			/*-------------------------------------------------*/

			else {
				this.error(line, 'unknown statement `' + name + '`');
			}

			/*-------------------------------------------------*/
		}
	};

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiTwig = new AMITwig();

console.log(amiTwig.render('<html>\n<body>{% if test > 1 %} %%test.kk%% %%test%% {%endif%}{% for x in l %} %%x%% {% endfor %}</body></html>', {test: {kk: 'yuyuyu'}, l: [1, 2, 3]}));
console.log(amiTwig.render('<html>\n<body>{% if test > 1 %} %%test%% {%endif%}{% for x in l %} hello {% endfor %}</body></html>', {test: 2, l: [1, 2, 3]}));
console.log(amiTwig.render('<html>\n<body>{% if test > 1 %} %%test%% {%endif%}{% for x in 0..8 %} %%x%% {% endfor %}</body></html>', {test: 2, l: [1, 2, 3]}));
console.log(amiTwig.render('<html>\n<body>{% if test > 1 %} %%test%% {%endif%}{% for x in \'A\'..\'Z\' %} %%x%% {% endfor %}</body></html>\n', {test: 2, l: [1, 2, 3]}));
//console.log(amiTwig.render('<html>\n<body>{% if test > 1 %} %%test%% {%endif%}{% for x in \'\\\'\'..\'Z\' %} %%x%% {% endfor %}</body></html>', {test: 2, l: [1, 2, 3]}));

/*-------------------------------------------------------------------------*/
