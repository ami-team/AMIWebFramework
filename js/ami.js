'use strict';
/*!
 * AMI Twig Engine
 *
 * Copyright (c) 2014-{{YEAR}} The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

function _createForOfIteratorHelperLoose(o) { var i = 0; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } i = o[Symbol.iterator](); return i.next.bind(i); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var amiTwig = {
  version: '1.1.0'
};

if (typeof exports !== 'undefined') {
  amiTwig.fs = require('fs');
  module.exports.amiTwig = amiTwig;
}

amiTwig.tokenizer = {
  tokenize: function tokenize(code, line, spaces, tokenDefs, tokenTypes, error) {
    if (tokenDefs.length !== tokenTypes.length) {
      throw '`tokenDefs.length != tokenTypes.length`';
    }

    var result_tokens = [];
    var result_types = [];
    var result_lines = [];
    var i = 0x000000000;
    var l = code.length;
    var word = '',
        token,
        c;

    __l0: while (i < l) {
      c = code.charAt(0);

      if (c === '\n') {
        line++;
      }

      if (spaces.indexOf(c) >= 0) {
        if (word) {
          if (error) {
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

      for (var j in tokenDefs) {
        token = this._match(code, tokenDefs[j]);

        if (token) {
          if (word) {
            if (error) {
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

      word += c;
      code = code.substring(1);
      i += 1;
    }

    if (word) {
      if (error) {
        throw 'invalid token `' + word + '`';
      }

      result_tokens.push(word);
      result_types.push(-1);
      result_lines.push(line);
    }

    return {
      tokens: result_tokens,
      types: result_types,
      lines: result_lines
    };
  },
  _match: function _match(s, stringOrRegExp) {
    var m;

    if (stringOrRegExp instanceof RegExp) {
      m = s.match(stringOrRegExp);
      return m !== null && this._checkNextChar(s, m[0]) ? m[0] : null;
    } else {
      m = s.indexOf(stringOrRegExp);
      return m === 0x00 && this._checkNextChar(s, stringOrRegExp) ? stringOrRegExp : null;
    }
  },
  _alnum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  _checkNextChar: function _checkNextChar(s, token) {
    var length = token.length;
    var charCode2 = s.charCodeAt(length - 0);
    var charCode1 = s.charCodeAt(length - 1);
    return isNaN(charCode2) || this._alnum[charCode2] === 0 || this._alnum[charCode1] === 0;
  }
};
amiTwig.expr = {};
amiTwig.expr.tokens = {
  $init: function $init() {
    this.IS_XXX = [this.DEFINED, this.NULL, this.EMPTY, this.ITERABLE, this.EVEN, this.ODD];
    this.XXX_WITH = [this.STARTS_WITH, this.ENDS_WITH];
    this.PLUS_MINUS = [this.CONCAT, this.PLUS, this.MINUS];
    this.MUL_FLDIV_DIV_MOD = [this.MUL, this.FLDIV, this.DIV, this.MOD];
    this.RX = [this.RP, this.RB1];
  },
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
  LST: 200,
  DIC: 201,
  FUN: 202,
  VAR: 203
};
amiTwig.expr.tokens.$init();

amiTwig.expr.Tokenizer = function (code, line) {
  this._spaces = [' ', '\t', '\n', '\r'];
  this._tokenDefs = ['or', 'and', 'b-or', 'b-xor', 'b-and', 'not', 'is', 'defined', 'null', 'empty', 'iterable', 'even', 'odd', '===', '==', '!==', '!=', '<=', '>=', '<', '>', /^starts\s+with/, /^ends\s+with/, 'matches', 'in', '..', '~', '+', '-', '**', '*', '//', '/', '%', '??', '?', ':', '.', ',', '|', '(', ')', '[', ']', '{', '}', 'true', 'false', /^[0-9]+\.[0-9]+/, /^[0-9]+/, /^'(\\'|[^'])*'/, /^"(\\"|[^"])*"/, /^[a-zA-Z_$][a-zA-Z0-9_$]*/];
  this._tokenTypes = [amiTwig.expr.tokens.LOGICAL_OR, amiTwig.expr.tokens.LOGICAL_AND, amiTwig.expr.tokens.BITWISE_OR, amiTwig.expr.tokens.BITWISE_XOR, amiTwig.expr.tokens.BITWISE_AND, amiTwig.expr.tokens.NOT, amiTwig.expr.tokens.IS, amiTwig.expr.tokens.DEFINED, amiTwig.expr.tokens.NULL, amiTwig.expr.tokens.EMPTY, amiTwig.expr.tokens.ITERABLE, amiTwig.expr.tokens.EVEN, amiTwig.expr.tokens.ODD, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.STARTS_WITH, amiTwig.expr.tokens.ENDS_WITH, amiTwig.expr.tokens.MATCHES, amiTwig.expr.tokens.IN, amiTwig.expr.tokens.RANGE, amiTwig.expr.tokens.CONCAT, amiTwig.expr.tokens.PLUS, amiTwig.expr.tokens.MINUS, amiTwig.expr.tokens.POWER, amiTwig.expr.tokens.MUL, amiTwig.expr.tokens.FLDIV, amiTwig.expr.tokens.DIV, amiTwig.expr.tokens.MOD, amiTwig.expr.tokens.DOUBLE_QUESTION, amiTwig.expr.tokens.QUESTION, amiTwig.expr.tokens.COLON, amiTwig.expr.tokens.DOT, amiTwig.expr.tokens.COMMA, amiTwig.expr.tokens.PIPE, amiTwig.expr.tokens.LP, amiTwig.expr.tokens.RP, amiTwig.expr.tokens.LB1, amiTwig.expr.tokens.RB1, amiTwig.expr.tokens.LB2, amiTwig.expr.tokens.RB2, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.SID];

  this.$init = function (code, line) {
    var result = amiTwig.tokenizer.tokenize(code, line, this._spaces, this._tokenDefs, this._tokenTypes, true);
    this.tokens = result.tokens;
    this.types = result.types;
    this.i = 0;
  };

  this.next = function (n) {
    if (n === void 0) {
      n = 1;
    }

    this.i += n;
  };

  this.isEmpty = function () {
    return this.i >= this.tokens.length;
  };

  this.peekToken = function () {
    return this.tokens[this.i];
  };

  this.peekType = function () {
    return this.types[this.i];
  };

  this.checkType = function (type) {
    if (this.i < this.tokens.length) {
      var TYPE = this.types[this.i];
      return type instanceof Array ? type.indexOf(TYPE) >= 0 : type === TYPE;
    }

    return false;
  };

  this.$init(code, line);
};

amiTwig.expr.Compiler = function (code, line) {
  this.$init(code, line);
};

amiTwig.expr.Compiler.prototype = {
  $init: function $init(code, line) {
    this.tokenizer = new amiTwig.expr.Tokenizer(this.code = code, this.line = line);
    this.rootNode = this.parseNullCoalescing();

    if (this.tokenizer.isEmpty() === false) {
      throw 'syntax error, line `' + this.line + '`, unexpected token `' + this.tokenizer.peekToken() + '`';
    }
  },
  dump: function dump() {
    return this.rootNode.dump();
  },
  parseNullCoalescing: function parseNullCoalescing() {
    var left = this.parseLogicalOr(),
        right,
        node;

    while (this.tokenizer.checkType(amiTwig.expr.tokens.DOUBLE_QUESTION)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parseLogicalOr();
      node.nodeLeft = left;
      node.nodeRight = right;
      left = node;
    }

    return left;
  },
  parseLogicalOr: function parseLogicalOr() {
    var left = this.parseLogicalAnd(),
        right,
        node;

    while (this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_OR)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parseLogicalAnd();
      node.nodeLeft = left;
      node.nodeRight = right;
      left = node;
    }

    return left;
  },
  parseLogicalAnd: function parseLogicalAnd() {
    var left = this.parseBitwiseOr(),
        right,
        node;

    while (this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_AND)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parseBitwiseOr();
      node.nodeLeft = left;
      node.nodeRight = right;
      left = node;
    }

    return left;
  },
  parseBitwiseOr: function parseBitwiseOr() {
    var left = this.parseBitwiseXor(),
        right,
        node;

    while (this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_OR)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parseBitwiseXor();
      node.nodeLeft = left;
      node.nodeRight = right;
      left = node;
    }

    return left;
  },
  parseBitwiseXor: function parseBitwiseXor() {
    var left = this.parseBitwiseAnd(),
        right,
        node;

    while (this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_XOR)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parseBitwiseAnd();
      node.nodeLeft = left;
      node.nodeRight = right;
      left = node;
    }

    return left;
  },
  parseBitwiseAnd: function parseBitwiseAnd() {
    var left = this.parseNot(),
        right,
        node;

    while (this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_AND)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parseNot();
      node.nodeLeft = left;
      node.nodeRight = right;
      left = node;
    }

    return left;
  },
  parseNot: function parseNot() {
    var right, node;

    if (this.tokenizer.checkType(amiTwig.expr.tokens.NOT)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parseComp();
      node.nodeLeft = null;
      node.nodeRight = right;
      return node;
    }

    return this.parseComp();
  },
  parseComp: function parseComp() {
    var left = this.parseAddSub(),
        right,
        node,
        swap;

    if (this.tokenizer.checkType(amiTwig.expr.tokens.IS)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      swap = node;

      if (this.tokenizer.checkType(amiTwig.expr.tokens.NOT)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        node.nodeLeft = null;
        node.nodeRight = swap;
      }

      if (this.tokenizer.checkType(amiTwig.expr.tokens.IS_XXX)) {
        right = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        swap.nodeLeft = left;
        swap.nodeRight = right;
      } else {
        throw 'syntax error, line `' + this.line + '`, keyword `defined`, `null`, `empty`, `iterable`, `even` or `odd` expected';
      }

      left = node;
    } else if (this.tokenizer.checkType(amiTwig.expr.tokens.CMP_OP)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseAddSub();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      } else if (this.tokenizer.checkType(amiTwig.expr.tokens.XXX_WITH)) {
          node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
          this.tokenizer.next();
          right = this.parseAddSub();
          node.nodeLeft = left;
          node.nodeRight = right;
          left = node;
        } else if (this.tokenizer.checkType(amiTwig.expr.tokens.MATCHES)) {
            node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
            this.tokenizer.next();
            right = this.parseAddSub();
            node.nodeLeft = left;
            node.nodeRight = right;
            left = node;
          } else if (this.tokenizer.checkType(amiTwig.expr.tokens.IN)) {
              node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
              this.tokenizer.next();
              right = this.parseAddSub();
              node.nodeLeft = left;
              node.nodeRight = right;
              left = node;
            }

    return left;
  },
  parseAddSub: function parseAddSub() {
    var left = this.parseMulDiv(),
        right,
        node;

    while (this.tokenizer.checkType(amiTwig.expr.tokens.PLUS_MINUS)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parseMulDiv();
      node.nodeLeft = left;
      node.nodeRight = right;
      left = node;
    }

    return left;
  },
  parseMulDiv: function parseMulDiv() {
    var left = this.parsePlusMinus(),
        right,
        node;

    while (this.tokenizer.checkType(amiTwig.expr.tokens.MUL_FLDIV_DIV_MOD)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parsePlusMinus();
      node.nodeLeft = left;
      node.nodeRight = right;
      left = node;
    }

    return left;
  },
  parsePlusMinus: function parsePlusMinus() {
    var right, node;

    if (this.tokenizer.checkType(amiTwig.expr.tokens.PLUS_MINUS)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parsePower();
      node.nodeLeft = null;
      node.nodeRight = right;
      return node;
    }

    return this.parsePower();
  },
  parsePower: function parsePower() {
    var left = this.parseFilter(),
        right,
        node;

    while (this.tokenizer.checkType(amiTwig.expr.tokens.POWER)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parseFilter();
      node.nodeLeft = left;
      node.nodeRight = right;
      left = node;
    }

    return left;
  },
  parseFilter: function parseFilter() {
    var left = this.parseDot1(),
        node,
        temp;

    while (this.tokenizer.checkType(amiTwig.expr.tokens.PIPE)) {
      this.tokenizer.next();
      node = this.parseDot1(true);

      for (temp = node; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft) {
        ;
      }

      temp.list.unshift(left);
      left = node;
    }

    return left;
  },
  parseDot1: function parseDot1(isFilter) {
    var node = this.parseDot2(isFilter);

    if (node) {
      var temp = node;

      for (; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft) {
        ;
      }

      if (temp.q) {
        if (temp.nodeType === amiTwig.expr.tokens.FUN) {
          if (temp.nodeValue in amiTwig.stdlib) {
            temp.nodeValue = 'amiTwig.stdlib.' + temp.nodeValue;
          } else {
            temp.nodeValue = '_.' + temp.nodeValue;
          }
        } else if (temp.nodeType === amiTwig.expr.tokens.VAR) {
          temp.nodeValue = '_.' + temp.nodeValue;
        }

        temp.q = false;
      }
    }

    return node;
  },
  parseDot2: function parseDot2(isFilter) {
    var left = this.parseDot3(isFilter),
        right,
        node;

    while (this.tokenizer.checkType(amiTwig.expr.tokens.DOT)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), '.');
      this.tokenizer.next();
      right = this.parseDot3(isFilter);
      node.nodeLeft = left;
      node.nodeRight = right;
      left = node;
    }

    return left;
  },
  parseDot3: function parseDot3(isFilter) {
    var left = this.parseX(isFilter),
        right,
        node;

    while (this.tokenizer.checkType(amiTwig.expr.tokens.LB1)) {
      this.tokenizer.next();
      right = this.parseNullCoalescing();

      if (this.tokenizer.checkType(amiTwig.expr.tokens.RB1)) {
        this.tokenizer.next();
        node = new amiTwig.expr.Node(amiTwig.expr.tokens.DOT, '[]');
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      } else {
        throw 'syntax error, line `' + this.line + '`, `]` expected';
      }
    }

    return left;
  },
  parseX: function parseX(isFilter) {
    var node;

    if (node = this.parseGroup()) {
      return node;
    }

    if (node = this.parseArray()) {
      return node;
    }

    if (node = this.parseObject()) {
      return node;
    }

    if (node = this.parseFunVar(isFilter)) {
      return node;
    }

    if (node = this.parseTerminal()) {
      return node;
    }

    throw 'syntax error, line `' + this.line + '`, syntax error or tuncated expression';
  },
  parseGroup: function parseGroup() {
    var node;

    if (this.tokenizer.checkType(amiTwig.expr.tokens.LP)) {
      this.tokenizer.next();
      node = this.parseNullCoalescing();

      if (this.tokenizer.checkType(amiTwig.expr.tokens.RP)) {
        this.tokenizer.next();
        return node;
      } else {
        throw 'syntax error, line `' + this.line + '`, `)` expected';
      }
    }

    return null;
  },
  parseArray: function parseArray() {
    var node, list;

    if (this.tokenizer.checkType(amiTwig.expr.tokens.LB1)) {
      this.tokenizer.next();
      list = this._parseSinglets();

      if (this.tokenizer.checkType(amiTwig.expr.tokens.RB1)) {
        this.tokenizer.next();
        node = new amiTwig.expr.Node(amiTwig.expr.tokens.LST, 'Array');
        node.list = list;
        return node;
      } else {
        throw 'syntax error, line `' + this.line + '`, `]` expected';
      }
    }

    return null;
  },
  parseObject: function parseObject() {
    var node, dict;

    if (this.tokenizer.checkType(amiTwig.expr.tokens.LB2)) {
      this.tokenizer.next();
      dict = this._parseDoublets();

      if (this.tokenizer.checkType(amiTwig.expr.tokens.RB2)) {
        this.tokenizer.next();
        node = new amiTwig.expr.Node(amiTwig.expr.tokens.DIC, 'Object');
        node.dict = dict;
        return node;
      } else {
        throw 'syntax error, line `' + this.line + '`, `}` expected';
      }
    }

    return null;
  },
  parseFunVar: function parseFunVar(isFilter) {
    var node;

    if (this.tokenizer.checkType(amiTwig.expr.tokens.SID)) {
      node = new amiTwig.expr.Node(0, isFilter ? 'filter_' + this.tokenizer.peekToken() : this.tokenizer.peekToken());
      node.q = true;
      this.tokenizer.next();

      if (this.tokenizer.checkType(amiTwig.expr.tokens.LP)) {
        this.tokenizer.next();
        node.list = this._parseSinglets();

        if (this.tokenizer.checkType(amiTwig.expr.tokens.RP)) {
          this.tokenizer.next();
          node.nodeType = amiTwig.expr.tokens.FUN;
        } else {
          throw 'syntax error, line `' + this.line + '`, `)` expected';
        }
      } else {
          node.nodeType = isFilter ? amiTwig.expr.tokens.FUN : amiTwig.expr.tokens.VAR;
          node.list = [];
        }

      return node;
    }

    return null;
  },
  _parseSinglets: function _parseSinglets() {
    var result = [];

    while (this.tokenizer.checkType(amiTwig.expr.tokens.RX) === false) {
      this._parseSinglet(result);

      if (this.tokenizer.checkType(amiTwig.expr.tokens.COMMA) === true) {
        this.tokenizer.next();
      } else {
        break;
      }
    }

    return result;
  },
  _parseDoublets: function _parseDoublets() {
    var result = {};

    while (this.tokenizer.checkType(amiTwig.expr.tokens.RB2) === false) {
      this._parseDoublet(result);

      if (this.tokenizer.checkType(amiTwig.expr.tokens.COMMA) === true) {
        this.tokenizer.next();
      } else {
        break;
      }
    }

    return result;
  },
  _parseSinglet: function _parseSinglet(result) {
    result.push(this.parseNullCoalescing());
  },
  _parseDoublet: function _parseDoublet(result) {
    if (this.tokenizer.checkType(amiTwig.expr.tokens.TERMINAL)) {
      var key = this.tokenizer.peekToken();
      this.tokenizer.next();

      if (this.tokenizer.checkType(amiTwig.expr.tokens.COLON)) {
        this.tokenizer.next();
        result[key] = this.parseNullCoalescing();
      } else {
        throw 'syntax error, line `' + this.line + '`, `:` expected';
      }
    } else {
      throw 'syntax error, line `' + this.line + '`, terminal expected';
    }
  },
  parseTerminal: function parseTerminal() {
    var left, right, node;

    if (this.tokenizer.checkType(amiTwig.expr.tokens.TERMINAL)) {
      left = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();

      if (this.tokenizer.checkType(amiTwig.expr.tokens.RANGE)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();

        if (this.tokenizer.checkType(amiTwig.expr.tokens.TERMINAL)) {
          right = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
          this.tokenizer.next();
          node.nodeLeft = left;
          node.nodeRight = right;
          return node;
        }
      } else {
        return left;
      }
    }

    return null;
  }
};

amiTwig.expr.Node = function (nodeType, nodeValue) {
  this.$init(nodeType, nodeValue);
};

amiTwig.expr.Node.prototype = {
  $init: function $init(nodeType, nodeValue) {
    this.nodeType = nodeType;
    this.nodeValue = nodeValue;
    this.nodeLeft = null;
    this.nodeRight = null;
    this.list = null;
    this.dict = null;
  },
  _dump: function _dump(nodes, edges, pCnt) {
    var CNT;
    var cnt = pCnt[0];
    nodes.push('\tnode' + cnt + ' [label="' + this.nodeValue.replace(/"/g, '\\"') + '"];');

    if (this.nodeLeft) {
      CNT = ++pCnt[0];
      edges.push('\tnode' + cnt + ' -> node' + CNT + ';');

      this.nodeLeft._dump(nodes, edges, pCnt);
    }

    if (this.nodeRight) {
      CNT = ++pCnt[0];
      edges.push('\tnode' + cnt + ' -> node' + CNT + ';');

      this.nodeRight._dump(nodes, edges, pCnt);
    }

    if (this.list) {
      for (var i in this.list) {
        CNT = ++pCnt[0];
        edges.push('\tnode' + cnt + ' -> node' + CNT + ' [label="[' + i.replace(/"/g, '\\"') + ']"];');

        this.list[i]._dump(nodes, edges, pCnt);
      }
    }

    if (this.dict) {
      for (var _i in this.dict) {
        CNT = ++pCnt[0];
        edges.push('\tnode' + cnt + ' -> node' + CNT + ' [label="[' + _i.replace(/"/g, '\\"') + ']"];');

        this.dict[_i]._dump(nodes, edges, pCnt);
      }
    }
  },
  dump: function dump() {
    var nodes = [];
    var edges = [];

    this._dump(nodes, edges, [0]);

    return 'digraph ast {\n\trankdir=TB;\n' + nodes.join('\n') + '\n' + edges.join('\n') + '\n}';
  }
};
amiTwig.tmpl = {};

amiTwig.tmpl.Compiler = function (tmpl) {
  this.$init(tmpl);
};

amiTwig.tmpl.Compiler.prototype = {
  STATEMENT_RE: /\{%\s*([a-zA-Z]+)\s*((?:.|\n)*?)\s*%\}/,
  COMMENT_RE: /\{#\s*((?:.|\n)*?)\s*#\}/g,
  _count: function _count(s) {
    var result = 0;
    var l = s.length;

    for (var i = 0; i < l; i++) {
      if (s[i] === '\n') result++;
    }

    return result;
  },
  $init: function $init(tmpl) {
    var line = 1;
    var column;
    var COLUMN;
    this.rootNode = {
      line: line,
      keyword: '@root',
      expression: '',
      blocks: [{
        expression: '@true',
        list: []
      }],
      value: ''
    };
    var stack1 = [this.rootNode];
    var stack2 = [0x00000000000];
    var item;

    for (tmpl = tmpl.replace(this.COMMENT_RE, '');; tmpl = tmpl.substr(COLUMN)) {
      var curr = stack1[stack1.length - 1];
      var indx = stack2[stack2.length - 1];
      var m = tmpl.match(this.STATEMENT_RE);

      if (m === null) {
        line += this._count(tmpl);
        curr.blocks[indx].list.push({
          line: line,
          keyword: '@text',
          expression: '',
          blocks: [],
          value: tmpl
        });
        var errors = [];

        for (var i = stack1.length - 1; i > 0; i--) {
          if (stack1[i].keyword === 'if') {
            errors.push('missing keyword `endif`');
          } else if (stack1[i].keyword === 'for') {
            errors.push('missing keyword `endfor`');
          }
        }

        if (errors.length > 0) {
          throw 'syntax error, line `' + line + '`, ' + errors.join(', ');
        }

        break;
      }

      var match = m[0];
      var keyword = m[1];
      var expression = m[2];
      column = m.index + 0x0000000000;
      COLUMN = m.index + match.length;
      var value = tmpl.substr(0, column);
      var VALUE = tmpl.substr(0, COLUMN);
      line += this._count(VALUE);

      if (value) {
        item = {
          line: line,
          keyword: '@text',
          expression: '',
          blocks: [],
          value: value
        };
        curr.blocks[indx].list.push(item);
      }

      switch (keyword) {
        case 'flush':
        case 'autoescape':
        case 'spaceless':
        case 'verbatim':
          break;

        case 'do':
        case 'set':
        case 'include':
          item = {
            line: line,
            keyword: keyword,
            expression: expression,
            blocks: [],
            value: ''
          };
          curr.blocks[indx].list.push(item);
          break;

        case 'if':
        case 'for':
          item = {
            line: line,
            keyword: keyword,
            blocks: [{
              expression: expression,
              list: []
            }],
            value: ''
          };
          curr.blocks[indx].list.push(item);
          stack1.push(item);
          stack2.push(0x00);
          break;

        case 'elseif':
          if (curr['keyword'] !== 'if') {
            throw 'syntax error, line `' + line + '`, unexpected keyword `elseif`';
          }

          indx = curr.blocks.length;
          curr.blocks.push({
            expression: expression,
            list: []
          });
          stack2[stack2.length - 1] = indx;
          break;

        case 'else':
          if (curr['keyword'] !== 'if' && curr['keyword'] !== 'for') {
            throw 'syntax error, line `' + line + '`, unexpected keyword `else`';
          }

          indx = curr.blocks.length;
          curr.blocks.push({
            expression: '@true',
            list: []
          });
          stack2[stack2.length - 1] = indx;
          break;

        case 'endif':
          if (curr['keyword'] !== 'if') {
            throw 'syntax error, line `' + line + '`, unexpected keyword `endif`';
          }

          stack1.pop();
          stack2.pop();
          break;

        case 'endfor':
          if (curr['keyword'] !== 'for') {
            throw 'syntax error, line `' + line + '`, unexpected keyword `endfor`';
          }

          stack1.pop();
          stack2.pop();
          break;

        default:
          throw 'syntax error, line `' + line + '`, unknown keyword `' + keyword + '`';
      }
    }
  },
  dump: function dump() {
    return JSON.stringify(this.rootNode, null, 2);
  }
};
amiTwig.engine = {
  VARIABLE_RE: /\{\{\s*(.*?)\s*\}\}/g,
  _render: function _render(result, item, dict, tmpls) {
    var _this = this;

    if (dict === void 0) {
      dict = {};
    }

    if (tmpls === void 0) {
      tmpls = {};
    }

    var m;
    var expression;
    this.dict = dict;
    this.tmpls = tmpls;

    switch (item.keyword) {
      case 'do':
        {
          amiTwig.expr.cache.eval(item.expression, item.line, dict);
          break;
        }

      case 'set':
        {
          m = item.expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(.+)/);

          if (!m) {
            throw 'syntax error, line `' + item.line + '`, invalid `set` statement';
          }

          dict[m[1]] = amiTwig.expr.cache.eval(m[2], item.line, dict);
          break;
        }

      case '@text':
        {
          result.push(item.value.replace(this.VARIABLE_RE, function (match, expression) {
            var value = amiTwig.expr.cache.eval(expression, item.line, dict);
            return value !== null && value !== undefined ? value : '';
          }));
          break;
        }

      case 'if':
      case '@root':
        {
          item.blocks.every(function (block) {
            expression = block.expression;

            if (expression === '@true' || amiTwig.expr.cache.eval(expression, item.line, dict)) {
              for (var i in block.list) {
                _this._render(result, block.list[i], dict, tmpls);
              }

              return false;
            }

            return true;
          });
          break;
        }

      case 'for':
        {
          var sym1;
          var sym2;
          var expr;
          m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*,\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/);

          if (!m) {
            m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/);

            if (!m) {
              throw 'syntax error, line `' + item.line + '`, invalid `for` statement';
            } else {
              sym1 = m[1];
              sym2 = null;
              expr = m[2];
            }
          } else {
            sym1 = m[1];
            sym2 = m[2];
            expr = m[3];
          }

          var origValue = amiTwig.expr.cache.eval(expr, item.line, dict);
          var typeName = Object.prototype.toString.call(origValue);
          var iterValue;

          if (typeName === '[object Object]') {
            iterValue = sym2 ? Object.entries(origValue) : Object.keys(origValue);
          } else {
            iterValue = origValue;

            if (typeName !== '[object Array]' && typeName !== '[object String]') {
              throw 'syntax error, line `' + item.line + '`, right operande not iterable';
            }

            if (sym2) {
              throw 'syntax error, line `' + item.line + '`, right operande not an object';
            }
          }

          var l = iterValue.length;

          if (l > 0) {
            var k = 0x00000000000000;
            var list = item.blocks[0].list;

            if (sym2) {
              var old1 = dict[sym1];
              var old2 = dict[sym2];
              var old3 = dict['loop'];
              dict.loop = {
                length: l,
                parent: dict['loop']
              };

              for (var _iterator = _createForOfIteratorHelperLoose(iterValue), _step; !(_step = _iterator()).done;) {
                var _step$value = _step.value,
                    key = _step$value[0],
                    val = _step$value[1];
                dict[sym1] = key;
                dict[sym2] = val;
                dict.loop.first = k === 0 - 0;
                dict.loop.last = k === l - 1;
                dict.loop.revindex0 = l - k;
                dict.loop.index0 = k;
                k++;
                dict.loop.revindex = l - k;
                dict.loop.index = k;

                for (var j in list) {
                  this._render(result, list[j], dict, tmpls);
                }
              }

              dict['loop'] = old3;
              dict[sym2] = old2;
              dict[sym1] = old1;
            } else {
              var _old = dict[sym1];
              var _old2 = dict['loop'];
              dict.loop = {
                length: l,
                parent: dict['loop']
              };

              for (var _iterator2 = _createForOfIteratorHelperLoose(iterValue), _step2; !(_step2 = _iterator2()).done;) {
                var _val = _step2.value;
                dict[sym1] = _val;
                dict.loop.first = k === 0 - 0;
                dict.loop.last = k === l - 1;
                dict.loop.revindex0 = l - k;
                dict.loop.index0 = k;
                k++;
                dict.loop.revindex = l - k;
                dict.loop.index = k;

                for (var _j in list) {
                  this._render(result, list[_j], dict, tmpls);
                }
              }

              dict['loop'] = _old2;
              dict[sym1] = _old;
            }
          } else {
            if (item.blocks.length > 1) {
              var _list = item.blocks[1].list;

              for (var _j2 in _list) {
                this._render(result, _list[_j2], dict, tmpls);
              }
            }
          }

          break;
        }

      case 'include':
        {
          var m_1_ = item.expression,
              with_subexpr,
              with_context;

          if (m = m_1_.match(/(.+)\s+with\s+(.+)\s+only$/)) {
            expression = m[1];
            with_subexpr = m[2];
            with_context = false;
          } else if (m = m_1_.match(/(.+)\s+with\s+(.+)$/)) {
            expression = m[1];
            with_subexpr = m[2];
            with_context = true;
          } else if (m = m_1_.match(/(.+)\s+only$/)) {
            expression = m[1];
            with_subexpr = '{}';
            with_context = false;
          } else {
            expression = m_1_;
            with_subexpr = '{}';
            with_context = true;
          }

          var fileName = amiTwig.expr.cache.eval(expression, item.line, dict) || '';

          if (Object.prototype.toString.call(fileName) !== '[object String]') {
            throw 'runtime error, line `' + item.line + '`, string expected';
          }

          var variables = amiTwig.expr.cache.eval(with_subexpr, item.line, dict) || {};

          if (Object.prototype.toString.call(variables) !== '[object Object]') {
            throw 'runtime error, line `' + item.line + '`, object expected';
          }

          result.push(amiTwig.stdlib.include(fileName, variables, with_context, false));
          break;
        }
    }
  },
  render: function render(tmpl, dict, tmpls) {
    if (dict === void 0) {
      dict = {};
    }

    if (tmpls === void 0) {
      tmpls = {};
    }

    var result = [];

    switch (Object.prototype.toString.call(tmpl)) {
      case '[object String]':
        this._render(result, new amiTwig.tmpl.Compiler(tmpl).rootNode, dict, tmpls);

        break;

      case '[object Object]':
        this._render(result, tmpl, dict, tmpls);

        break;
    }

    return result.join('');
  }
};
amiTwig.expr.cache = {
  dict: {},
  eval: function _eval(expression, line, _) {
    var f;

    if (expression in this.dict) {
      f = this.dict[expression];
    } else {
      f = this.dict[expression] = eval(amiTwig.expr.interpreter.getJS(new amiTwig.expr.Compiler(expression, line)));
    }

    if (!_) _ = {};
    return f.call(_, _);
  }
};
amiTwig.stdlib = {
  'isUndefined': function isUndefined(x) {
    return x === undefined;
  },
  'isDefined': function isDefined(x) {
    return x !== undefined;
  },
  'isNull': function isNull(x) {
    return x === null;
  },
  'isNotNull': function isNotNull(x) {
    return x !== null;
  },
  'isEmpty': function isEmpty(x) {
    if (x === null || x === false || x === '') {
      return true;
    }

    var typeName = Object.prototype.toString.call(x);
    return typeName === '[object Array]' && x.length === 0 || typeName === '[object Object]' && Object.keys(x).length === 0;
  },
  'isNumber': function isNumber(x) {
    return Object.prototype.toString.call(x) === '[object Number]';
  },
  'isString': function isString(x) {
    return Object.prototype.toString.call(x) === '[object String]';
  },
  'isArray': function isArray(x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  },
  'isObject': function isObject(x) {
    return Object.prototype.toString.call(x) === '[object Object]';
  },
  'isIterable': function isIterable(x) {
    var typeName = Object.prototype.toString.call(x);
    return typeName === '[object String]' || typeName === '[object Array]' || typeName === '[object Object]';
  },
  'isEven': function isEven(x) {
    return this.isNumber(x) && (x & 1) === 0;
  },
  'isOdd': function isOdd(x) {
    return this.isNumber(x) && (x & 1) === 1;
  },
  'isInObject': function isInObject(x, y) {
    if (this.isArray(y) || this.isString(y)) {
      return y.indexOf(x) >= 0;
    }

    if (this.isObject(y)) {
      return x in y;
    }

    return false;
  },
  'isInRange': function isInRange(x, x1, x2) {
    if (this.isNumber(x1) && this.isNumber(x2)) {
      return x >= x1 && x <= x2;
    }

    if (this.isString(x1) && x1.length === 1 && this.isString(x2) && x2.length === 1) {
      return x.charCodeAt(0) >= x1.charCodeAt(0) && x.charCodeAt(0) <= x2.charCodeAt(0);
    }

    return false;
  },
  'range': function range(x1, x2, step) {
    if (step === void 0) {
      step = 1;
    }

    var result = [];

    if (this.isNumber(x1) && this.isNumber(x2)) {
      for (var i = x1; i <= x2; i += step) {
        result.push(i);
      }
    } else if (this.isString(x1) && x1.length === 1 && this.isString(x2) && x2.length === 1) {
      for (var _i2 = x1.charCodeAt(0); _i2 <= x2.charCodeAt(0); _i2 += step) {
        result.push(String.fromCharCode(_i2));
      }
    }

    return result;
  },
  'filter_length': function filter_length(x) {
    if (this.isString(x) || this.isArray(x)) {
      return x.length;
    }

    if (this.isObject(x)) {
      return Object.keys(x).length;
    }

    return 0;
  },
  'filter_first': function filter_first(x) {
    return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[0x0000000000] : '';
  },
  'filter_last': function filter_last(x) {
    return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[x.length - 1] : '';
  },
  'filter_slice': function filter_slice(x, idx1, idx2) {
    return this.isString(x) || this.isArray(x) ? x.slice(idx1, idx2) : null;
  },
  'filter_merge': function filter_merge() {
    if (arguments.length > 1) {
      if (this.isString(arguments[0])) {
        var L = [];

        for (var i in arguments) {
          var item = arguments[i];

          if (!this.isString(item)) {
            return null;
          }

          L.push(arguments[i]);
        }

        return L.join('');
      }

      if (this.isArray(arguments[0])) {
        var _L = [];

        for (var _i3 in arguments) {
          var _item = arguments[_i3];

          if (!this.isArray(_item)) {
            return null;
          }

          for (var j in _item) {
            _L.push(_item[j]);
          }
        }

        return _L;
      }

      if (this.isObject(arguments[0])) {
        var D = {};

        for (var _i4 in arguments) {
          var _item2 = arguments[_i4];

          if (!this.isObject(_item2)) {
            return null;
          }

          for (var _j3 in _item2) {
            D[_j3] = _item2[_j3];
          }
        }

        return D;
      }
    }

    return null;
  },
  'filter_sort': function filter_sort(x) {
    return this.isArray(x) ? x.sort() : [];
  },
  'filter_reverse': function filter_reverse(x) {
    return this.isArray(x) ? x.reverse() : [];
  },
  'filter_join': function filter_join(x, sep) {
    return this.isArray(x) ? x.join(sep) : '';
  },
  'filter_keys': function filter_keys(x) {
    return this.isObject(x) ? Object.keys(x) : [];
  },
  'filter_column': function filter_column(x, key) {
    return this.isArray(x) ? x.map(function (val) {
      return val[key];
    }) : [];
  },
  'filter_batch': function filter_batch(x, n, missing) {
    if (missing === void 0) {
      missing = '';
    }

    var result = [];

    if (this.isArray(x) && this.isNumber(n)) {
      var last;
      var l = x.length;
      var m = Math.ceil(l / n) * n;

      for (var i = 0; i < l; i += n) {
        result.push(last = x.slice(i, i + n));
      }

      for (var _i5 = l; _i5 < m; _i5 += 1) {
        last.push(missing);
      }
    }

    return result;
  },
  'startsWith': function startsWith(s1, s2) {
    if (this.isString(s1) && this.isString(s2)) {
      var base = 0x0000000000000000000;
      return s1.indexOf(s2, base) === base;
    }

    return false;
  },
  'endsWith': function endsWith(s1, s2) {
    if (this.isString(s1) && this.isString(s2)) {
      var base = s1.length - s2.length;
      return s1.indexOf(s2, base) === base;
    }

    return false;
  },
  'match': function match(s, regex) {
    if (this.isString(s) && this.isString(regex)) {
      var idx1 = regex.indexOf('/');
      var idx2 = regex.lastIndexOf('/');

      if (idx1 === 0 || idx1 < idx2) {
        try {
          return new RegExp(regex.substring(idx1 + 1, idx2), regex.substring(idx2 + 1)).test(s);
        } catch (err) {}
      }
    }

    return false;
  },
  'filter_default': function filter_default(s1, s2) {
    return s1 || s2 || '';
  },
  'filter_lower': function filter_lower(s) {
    return this.isString(s) ? s.toLowerCase() : '';
  },
  'filter_upper': function filter_upper(s) {
    return this.isString(s) ? s.toUpperCase() : '';
  },
  'filter_capitalize': function filter_capitalize(s) {
    if (this.isString(s)) {
      return s.trim().toLowerCase().replace(/^\S/g, function (c) {
        return c.toUpperCase();
      });
    }

    return '';
  },
  'filter_title': function filter_title(s) {
    if (this.isString(s)) {
      return s.trim().toLowerCase().replace(/(?:^|\s)\S/g, function (c) {
        return c.toUpperCase();
      });
    }

    return '';
  },
  'filter_trim': function filter_trim(s) {
    return this.isString(s) ? s.trim() : '';
  },
  '_replace': function _replace(s, oldStrs, newStrs) {
    var result = [];
    var l = s.length;
    var m = oldStrs.length;
    var n = newStrs.length;

    if (m != n) {
      throw 'internal error';
    }

    __l0: for (var i = 0; i < l; i += 0) {
      var p = s.substring(i);

      for (var j = 0; j < m; j += 1) {
        if (p.indexOf(oldStrs[j]) === 0) {
          result.push(newStrs[j]);
          i += oldStrs[j].length;
          continue __l0;
        }
      }

      result.push(s.charAt(i++));
    }

    return result.join('');
  },
  '_textToHtmlX': ['&', '"', '<', '>'],
  '_textToHtmlY': ['&amp;', '&quot;', '&lt;', '&gt;'],
  '_textToStringX': ['\\', '\n', '"', '\''],
  '_textToStringY': ['\\\\', '\\n', '\\"', '\\\''],
  '_textToJsonStringX': ['\\', '\n', '"'],
  '_textToJsonStringY': ['\\\\', '\\n', '\\"'],
  'filter_escape': function filter_escape(s, mode) {
    if (this.isString(s)) {
      switch (mode || 'html') {
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
  'filter_url_encode': function filter_url_encode(s) {
    return this.isString(s) ? encodeURIComponent(s) : '';
  },
  'filter_nl2br': function filter_nl2br(s) {
    return this.isString(s) ? s.replace(/\n/g, '<br/>') : '';
  },
  'filter_raw': function filter_raw(s) {
    return this.isString(s) ? s : '';
  },
  'filter_replace': function filter_replace(s, dict) {
    return this.isString(s) && this.isObject(dict) ? this._replace(s, Object.keys(dict), Object.values(dict)) : '';
  },
  'filter_split': function filter_split(s, sep, max) {
    return this.isString(s) ? s.split(sep, max) : [];
  },
  'filter_abs': function filter_abs(x) {
    return Math.abs(x);
  },
  'filter_round': function filter_round(x, mode) {
    switch (mode) {
      case 'ceil':
        return Math.ceil(x);

      case 'floor':
        return Math.floor(x);

      default:
        return Math.round(x);
    }
  },
  'min': function min() {
    var args = arguments.length === 1 && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0] : arguments;
    var result = Number.POSITIVE_INFINITY;

    for (var i in args) {
      if (!this.isNumber(args[i])) {
        return Number.NaN;
      }

      if (result > args[i]) {
        result = args[i];
      }
    }

    return result;
  },
  'max': function max() {
    var args = arguments.length === 1 && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0] : arguments;
    var result = Number.NEGATIVE_INFINITY;

    for (var i in args) {
      if (!this.isNumber(args[i])) {
        return Number.NaN;
      }

      if (result < args[i]) {
        result = args[i];
      }
    }

    return result;
  },
  'random': function random(x) {
    var y = Math.random();

    if (x) {
      if (this.isArray(x) || this.isObject(x)) {
        var X = Object.keys(x);
        return x[X[Math.floor(X.length * y)]];
      }

      if (this.isString(x)) {
        return x[Math.floor(x.length * y)];
      }

      if (this.isNumber(x)) {
        return Math.floor(x * y);
      }
    }

    x = Number.MAX_SAFE_INTEGER;
    return Math.floor(x * y);
  },
  'filter_json_encode': function filter_json_encode(x, indent) {
    return JSON.stringify(x, null, this.isNumber(indent) ? indent : 2);
  },
  'filter_json_jspath': function filter_json_jspath(x, path) {
    return typeof JSPath !== 'undefined' ? JSPath.apply(path, x) : [];
  },
  'include': function include(fileName, variables, withContext, ignoreMissing) {
    if (variables === void 0) {
      variables = {};
    }

    if (withContext === void 0) {
      withContext = true;
    }

    if (ignoreMissing === void 0) {
      ignoreMissing = false;
    }

    if (fileName in amiTwig.engine.tmpls) {
      var temp = {};

      if (withContext) {
        for (var i in amiTwig.engine.dict) {
          temp[i] = amiTwig.engine.dict[i];
        }
      }

      if (variables) {
        for (var _i6 in variables) {
          temp[_i6] = variables[_i6];
        }
      }

      return amiTwig.engine.render(amiTwig.engine.tmpls[fileName], temp);
    }

    if (!ignoreMissing) {
      throw 'runtime error, could not open `' + fileName + '`';
    }

    return '';
  }
};
amiTwig.stdlib.filter_e = amiTwig.stdlib.filter_escape;
amiTwig.expr.interpreter = {
  _getJS: function _getJS(node) {
    var L;
    var x;
    var left;
    var right;
    var operator;

    switch (node.nodeType) {
      case amiTwig.expr.tokens.LST:
        L = [];

        for (var i in node.list) {
          L.push(this._getJS(node.list[i]));
        }

        return '[' + L.join(',') + ']';

      case amiTwig.expr.tokens.DIC:
        L = [];

        for (var _i7 in node.dict) {
          L.push(_i7 + ':' + this._getJS(node.dict[_i7]));
        }

        return '{' + L.join(',') + '}';

      case amiTwig.expr.tokens.FUN:
        L = [];

        for (var _i8 in node.list) {
          L.push(this._getJS(node.list[_i8]));
        }

        return node.nodeValue + '(' + L.join(',') + ')';

      case amiTwig.expr.tokens.VAR:
        L = [];

        for (var _i9 in node.list) {
          L.push('[' + this._getJS(node.list[_i9]) + ']');
        }

        return L.length > 0 ? node.nodeValue + L.join('') : node.nodeValue;

      case amiTwig.expr.tokens.TERMINAL:
        return node.nodeValue;

      case amiTwig.expr.tokens.IS:
        left = this._getJS(node.nodeLeft);

        switch (node.nodeRight.nodeType) {
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

      case amiTwig.expr.tokens.IN:
        if (node.nodeRight.nodeType !== amiTwig.expr.tokens.RANGE) {
          left = this._getJS(node.nodeLeft);
          right = this._getJS(node.nodeRight);
          return 'amiTwig.stdlib.isInObject(' + left + ',' + right + ')';
        } else {
          x = this._getJS(node.nodeLeft);
          left = node.nodeRight.nodeLeft.nodeValue;
          right = node.nodeRight.nodeRight.nodeValue;
          return 'amiTwig.stdlib.isInRange(' + x + ',' + left + ',' + right + ')';
        }

      case amiTwig.expr.tokens.STARTS_WITH:
        left = this._getJS(node.nodeLeft);
        right = this._getJS(node.nodeRight);
        return 'amiTwig.stdlib.startsWith(' + left + ',' + right + ')';

      case amiTwig.expr.tokens.ENDS_WITH:
        left = this._getJS(node.nodeLeft);
        right = this._getJS(node.nodeRight);
        return 'amiTwig.stdlib.endsWith(' + left + ',' + right + ')';

      case amiTwig.expr.tokens.MATCHES:
        left = this._getJS(node.nodeLeft);
        right = this._getJS(node.nodeRight);
        return 'amiTwig.stdlib.match(' + left + ',' + right + ')';

      case amiTwig.expr.tokens.RANGE:
        left = this._getJS(node.nodeLeft);
        right = this._getJS(node.nodeRight);
        return 'amiTwig.stdlib.range(' + left + ',' + right + ')';

      case amiTwig.expr.tokens.DOT:
        left = this._getJS(node.nodeLeft);
        right = this._getJS(node.nodeRight);

        if (node.nodeValue[0] === '.') {
          return left + '.' + right;
        } else {
          return left + '[' + right + ']';
        }

      case amiTwig.expr.tokens.FLDIV:
        left = this._getJS(node.nodeLeft);
        right = this._getJS(node.nodeRight);
        return 'Math.floor(' + left + '/' + right + ')';

      case amiTwig.expr.tokens.POWER:
        left = this._getJS(node.nodeLeft);
        right = this._getJS(node.nodeRight);
        return 'Math.pow(' + left + ',' + right + ')';

      case amiTwig.expr.tokens.DOUBLE_QUESTION:
        left = this._getJS(node.nodeLeft);
        right = this._getJS(node.nodeRight);
        return '((' + left + ') || (' + right + '))';

      default:
        if (node.nodeLeft === null && node.nodeRight !== null) {
          operator = node.nodeType !== amiTwig.expr.tokens.NOT ? node.nodeValue : '!';
          return operator + '(' + this._getJS(node.nodeRight) + ')';
        }

        if (node.nodeLeft !== null && node.nodeRight === null) {
          operator = node.nodeType !== amiTwig.expr.tokens.NOT ? node.nodeValue : '!';
          return '(' + this._getJS(node.nodeLeft) + ')' + operator;
        }

        if (node.nodeLeft !== null && node.nodeRight !== null) {
          switch (node.nodeType) {
            case amiTwig.expr.tokens.LOGICAL_OR:
              operator = '||';
              break;

            case amiTwig.expr.tokens.LOGICAL_AND:
              operator = '&&';
              break;

            case amiTwig.expr.tokens.BITWISE_OR:
              operator = '|';
              break;

            case amiTwig.expr.tokens.BITWISE_XOR:
              operator = '^';
              break;

            case amiTwig.expr.tokens.BITWISE_AND:
              operator = '&';
              break;

            case amiTwig.expr.tokens.CONCAT:
              operator = '+';
              break;

            default:
              operator = node.nodeValue;
              break;
          }

          left = this._getJS(node.nodeLeft);
          right = this._getJS(node.nodeRight);
          return '(' + left + operator + right + ')';
        }

    }
  },
  getJS: function getJS(expr) {
    return '(function(_) { return ' + this._getJS(expr.rootNode) + '; })';
  },
  eval: function _eval(expr, _) {
    if (!_) _ = {};
    return eval(this.getJS(expr)).call(_, _);
  }
};

(function () {
  var SYNTAX = {
    PATH: 1,
    SELECTOR: 2,
    OBJ_PRED: 3,
    POS_PRED: 4,
    LOGICAL_EXPR: 5,
    COMPARISON_EXPR: 6,
    MATH_EXPR: 7,
    CONCAT_EXPR: 8,
    UNARY_EXPR: 9,
    POS_EXPR: 10,
    LITERAL: 11
  };

  var parse = function () {
    var TOKEN = {
      ID: 1,
      NUM: 2,
      STR: 3,
      BOOL: 4,
      NULL: 5,
      PUNCT: 6,
      EOP: 7
    },
        MESSAGES = {
      UNEXP_TOKEN: 'Unexpected token "%0"',
      UNEXP_EOP: 'Unexpected end of path'
    };
    var path, idx, buf, len;

    function parse(_path) {
      path = _path.split('');
      idx = 0;
      buf = null;
      len = path.length;
      var res = parsePathConcatExpr(),
          token = lex();

      if (token.type !== TOKEN.EOP) {
        throwUnexpected(token);
      }

      return res;
    }

    function parsePathConcatExpr() {
      var expr = parsePathConcatPartExpr(),
          operands;

      while (match('|')) {
        lex();
        (operands || (operands = [expr])).push(parsePathConcatPartExpr());
      }

      return operands ? {
        type: SYNTAX.CONCAT_EXPR,
        args: operands
      } : expr;
    }

    function parsePathConcatPartExpr() {
      return match('(') ? parsePathGroupExpr() : parsePath();
    }

    function parsePathGroupExpr() {
      expect('(');
      var expr = parsePathConcatExpr();
      expect(')');
      var parts = [],
          part;

      while (part = parsePredicate()) {
        parts.push(part);
      }

      if (!parts.length) {
        return expr;
      } else if (expr.type === SYNTAX.PATH) {
        expr.parts = expr.parts.concat(parts);
        return expr;
      }

      parts.unshift(expr);
      return {
        type: SYNTAX.PATH,
        parts: parts
      };
    }

    function parsePredicate() {
      if (match('[')) {
        return parsePosPredicate();
      }

      if (match('{')) {
        return parseObjectPredicate();
      }

      if (match('(')) {
        return parsePathGroupExpr();
      }
    }

    function parsePath() {
      if (!matchPath()) {
        throwUnexpected(lex());
      }

      var fromRoot = false,
          subst;

      if (match('^')) {
        lex();
        fromRoot = true;
      } else if (matchSubst()) {
        subst = lex().val.substr(1);
      }

      var parts = [],
          part;

      while (part = parsePathPart()) {
        parts.push(part);
      }

      return {
        type: SYNTAX.PATH,
        fromRoot: fromRoot,
        subst: subst,
        parts: parts
      };
    }

    function parsePathPart() {
      return matchSelector() ? parseSelector() : parsePredicate();
    }

    function parseSelector() {
      var selector = lex().val,
          token = lookahead(),
          prop;

      if (match('*') || token.type === TOKEN.ID || token.type === TOKEN.STR) {
        prop = lex().val;
      }

      return {
        type: SYNTAX.SELECTOR,
        selector: selector,
        prop: prop
      };
    }

    function parsePosPredicate() {
      expect('[');
      var expr = parsePosExpr();
      expect(']');
      return {
        type: SYNTAX.POS_PRED,
        arg: expr
      };
    }

    function parseObjectPredicate() {
      expect('{');
      var expr = parseLogicalORExpr();
      expect('}');
      return {
        type: SYNTAX.OBJ_PRED,
        arg: expr
      };
    }

    function parseLogicalORExpr() {
      var expr = parseLogicalANDExpr(),
          operands;

      while (match('||')) {
        lex();
        (operands || (operands = [expr])).push(parseLogicalANDExpr());
      }

      return operands ? {
        type: SYNTAX.LOGICAL_EXPR,
        op: '||',
        args: operands
      } : expr;
    }

    function parseLogicalANDExpr() {
      var expr = parseEqualityExpr(),
          operands;

      while (match('&&')) {
        lex();
        (operands || (operands = [expr])).push(parseEqualityExpr());
      }

      return operands ? {
        type: SYNTAX.LOGICAL_EXPR,
        op: '&&',
        args: operands
      } : expr;
    }

    function parseEqualityExpr() {
      var expr = parseRelationalExpr();

      while (match('==') || match('!=') || match('===') || match('!==') || match('^==') || match('==^') || match('^=') || match('=^') || match('$==') || match('==$') || match('$=') || match('=$') || match('*==') || match('==*') || match('*=') || match('=*')) {
        expr = {
          type: SYNTAX.COMPARISON_EXPR,
          op: lex().val,
          args: [expr, parseEqualityExpr()]
        };
      }

      return expr;
    }

    function parseRelationalExpr() {
      var expr = parseAdditiveExpr();

      while (match('<') || match('>') || match('<=') || match('>=')) {
        expr = {
          type: SYNTAX.COMPARISON_EXPR,
          op: lex().val,
          args: [expr, parseRelationalExpr()]
        };
      }

      return expr;
    }

    function parseAdditiveExpr() {
      var expr = parseMultiplicativeExpr();

      while (match('+') || match('-')) {
        expr = {
          type: SYNTAX.MATH_EXPR,
          op: lex().val,
          args: [expr, parseMultiplicativeExpr()]
        };
      }

      return expr;
    }

    function parseMultiplicativeExpr() {
      var expr = parseUnaryExpr();

      while (match('*') || match('/') || match('%')) {
        expr = {
          type: SYNTAX.MATH_EXPR,
          op: lex().val,
          args: [expr, parseMultiplicativeExpr()]
        };
      }

      return expr;
    }

    function parsePosExpr() {
      if (match(':')) {
        lex();
        return {
          type: SYNTAX.POS_EXPR,
          toIdx: parseUnaryExpr()
        };
      }

      var fromExpr = parseUnaryExpr();

      if (match(':')) {
        lex();

        if (match(']')) {
          return {
            type: SYNTAX.POS_EXPR,
            fromIdx: fromExpr
          };
        }

        return {
          type: SYNTAX.POS_EXPR,
          fromIdx: fromExpr,
          toIdx: parseUnaryExpr()
        };
      }

      return {
        type: SYNTAX.POS_EXPR,
        idx: fromExpr
      };
    }

    function parseUnaryExpr() {
      if (match('!') || match('-')) {
        return {
          type: SYNTAX.UNARY_EXPR,
          op: lex().val,
          arg: parseUnaryExpr()
        };
      }

      return parsePrimaryExpr();
    }

    function parsePrimaryExpr() {
      var token = lookahead(),
          type = token.type;

      if (type === TOKEN.STR || type === TOKEN.NUM || type === TOKEN.BOOL || type === TOKEN.NULL) {
        return {
          type: SYNTAX.LITERAL,
          val: lex().val
        };
      }

      if (matchPath()) {
        return parsePath();
      }

      if (match('(')) {
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

      if (token.type === TOKEN.PUNCT) {
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

      if (token.type !== TOKEN.PUNCT || token.val !== val) {
        throwUnexpected(token);
      }
    }

    function lookahead() {
      if (buf !== null) {
        return buf;
      }

      var pos = idx;
      buf = advance();
      idx = pos;
      return buf;
    }

    function advance() {
      while (isWhiteSpace(path[idx])) {
        ++idx;
      }

      if (idx >= len) {
        return {
          type: TOKEN.EOP,
          range: [idx, idx]
        };
      }

      var token = scanPunctuator();

      if (token || (token = scanId()) || (token = scanString()) || (token = scanNumeric())) {
        return token;
      }

      token = {
        range: [idx, idx]
      };
      idx >= len ? token.type = TOKEN.EOP : token.val = path[idx];
      throwUnexpected(token);
    }

    function lex() {
      var token;

      if (buf) {
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
      return ch === '$' || ch === '@' || ch === '_' || ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z';
    }

    function isIdPart(ch) {
      return isIdStart(ch) || ch >= '0' && ch <= '9';
    }

    function scanId() {
      var ch = path[idx];

      if (!isIdStart(ch)) {
        return;
      }

      var start = idx,
          id = ch;

      while (++idx < len) {
        ch = path[idx];

        if (!isIdPart(ch)) {
          break;
        }

        id += ch;
      }

      switch (id) {
        case 'true':
        case 'false':
          return {
            type: TOKEN.BOOL,
            val: id === 'true',
            range: [start, idx]
          };

        case 'null':
          return {
            type: TOKEN.NULL,
            val: null,
            range: [start, idx]
          };

        default:
          return {
            type: TOKEN.ID,
            val: id,
            range: [start, idx]
          };
      }
    }

    function scanString() {
      if (path[idx] !== '"' && path[idx] !== '\'') {
        return;
      }

      var orig = path[idx],
          start = ++idx,
          str = '',
          eosFound = false,
          ch;

      while (idx < len) {
        ch = path[idx++];

        if (ch === '\\') {
          ch = path[idx++];
        } else if ((ch === '"' || ch === '\'') && ch === orig) {
          eosFound = true;
          break;
        }

        str += ch;
      }

      if (eosFound) {
        return {
          type: TOKEN.STR,
          val: str,
          range: [start, idx]
        };
      }
    }

    function scanNumeric() {
      var start = idx,
          ch = path[idx],
          isFloat = ch === '.';

      if (isFloat || isDigit(ch)) {
        var num = ch;

        while (++idx < len) {
          ch = path[idx];

          if (ch === '.') {
            if (isFloat) {
              return;
            }

            isFloat = true;
          } else if (!isDigit(ch)) {
            break;
          }

          num += ch;
        }

        return {
          type: TOKEN.NUM,
          val: isFloat ? parseFloat(num) : parseInt(num, 10),
          range: [start, idx]
        };
      }
    }

    function scanPunctuator() {
      var start = idx,
          ch1 = path[idx],
          ch2 = path[idx + 1];

      if (ch1 === '.') {
        if (isDigit(ch2)) {
          return;
        }

        return path[++idx] === '.' ? {
          type: TOKEN.PUNCT,
          val: '..',
          range: [start, ++idx]
        } : {
          type: TOKEN.PUNCT,
          val: '.',
          range: [start, idx]
        };
      }

      if (ch2 === '=') {
        var ch3 = path[idx + 2];

        if (ch3 === '=') {
          if ('=!^$*'.indexOf(ch1) >= 0) {
            return {
              type: TOKEN.PUNCT,
              val: ch1 + ch2 + ch3,
              range: [start, idx += 3]
            };
          }
        } else if ('^$*'.indexOf(ch3) >= 0) {
          if (ch1 === '=') {
            return {
              type: TOKEN.PUNCT,
              val: ch1 + ch2 + ch3,
              range: [start, idx += 3]
            };
          }
        } else if ('=!^$*><'.indexOf(ch1) >= 0) {
          return {
            type: TOKEN.PUNCT,
            val: ch1 + ch2,
            range: [start, idx += 2]
          };
        }
      } else if (ch1 === '=' && '^$*'.indexOf(ch2) >= 0) {
        return {
          type: TOKEN.PUNCT,
          val: ch1 + ch2,
          range: [start, idx += 2]
        };
      }

      if (ch1 === ch2 && (ch1 === '|' || ch1 === '&')) {
        return {
          type: TOKEN.PUNCT,
          val: ch1 + ch2,
          range: [start, idx += 2]
        };
      }

      if (':{}()[]^+-*/%!><|'.indexOf(ch1) >= 0) {
        return {
          type: TOKEN.PUNCT,
          val: ch1,
          range: [start, ++idx]
        };
      }
    }

    function throwUnexpected(token) {
      if (token.type === TOKEN.EOP) {
        throwError(token, MESSAGES.UNEXP_EOP);
      }

      throwError(token, MESSAGES.UNEXP_TOKEN, token.val);
    }

    function throwError(token, messageFormat) {
      var args = Array.prototype.slice.call(arguments, 2),
          msg = messageFormat.replace(/%(\d)/g, function (_, idx) {
        return args[idx] || '';
      }),
          error = new Error(msg);
      error.column = token.range[0];
      throw error;
    }

    return parse;
  }();

  var translate = function () {
    var body, vars, lastVarId, unusedVars;

    function acquireVar() {
      if (unusedVars.length) {
        return unusedVars.shift();
      }

      var varName = 'v' + ++lastVarId;
      vars.push(varName);
      return varName;
    }

    function releaseVars() {
      var args = arguments,
          i = args.length;

      while (i--) {
        unusedVars.push(args[i]);
      }
    }

    function translate(ast) {
      body = [];
      vars = ['res'];
      lastVarId = 0;
      unusedVars = [];
      translateExpr(ast, 'res', 'data');
      body.unshift('var ', Array.isArray ? 'isArr = Array.isArray' : 'toStr = Object.prototype.toString, isArr = function(o) { return toStr.call(o) === "[object Array]"; }', ', concat = Array.prototype.concat', ',', vars.join(','), ';');

      if (ast.type === SYNTAX.PATH) {
        var lastPart = ast.parts[ast.parts.length - 1];

        if (lastPart && lastPart.type === SYNTAX.POS_PRED && 'idx' in lastPart.arg) {
          body.push('res = res[0];');
        }
      }

      body.push('return res;');
      return body.join('');
    }

    function translatePath(path, dest, ctx) {
      var parts = path.parts,
          i = 0,
          len = parts.length;
      body.push(dest, '=', path.fromRoot ? 'data' : path.subst ? 'subst.' + path.subst : ctx, ';', 'isArr(' + dest + ') || (' + dest + ' = [' + dest + ']);');

      while (i < len) {
        var item = parts[i++];

        switch (item.type) {
          case SYNTAX.SELECTOR:
            item.selector === '..' ? translateDescendantSelector(item, dest, dest) : translateSelector(item, dest, dest);
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
      if (sel.prop) {
        var propStr = escapeStr(sel.prop),
            res = acquireVar(),
            i = acquireVar(),
            len = acquireVar(),
            curCtx = acquireVar(),
            j = acquireVar(),
            val = acquireVar(),
            tmpArr = acquireVar();
        body.push(res, '= [];', i, '= 0;', len, '=', ctx, '.length;', tmpArr, '= [];', 'while(', i, '<', len, ') {', curCtx, '=', ctx, '[', i, '++];', 'if(', curCtx, '!= null) {');

        if (sel.prop === '*') {
          body.push('if(typeof ', curCtx, '=== "object") {', 'if(isArr(', curCtx, ')) {', res, '=', res, '.concat(', curCtx, ');', '}', 'else {', 'for(', j, ' in ', curCtx, ') {', 'if(', curCtx, '.hasOwnProperty(', j, ')) {', val, '=', curCtx, '[', j, '];');
          inlineAppendToArray(res, val);
          body.push('}', '}', '}', '}');
        } else {
          body.push(val, '=', curCtx, '[', propStr, '];');
          inlineAppendToArray(res, val, tmpArr, len);
        }

        body.push('}', '}', dest, '=', len, '> 1 &&', tmpArr, '.length?', tmpArr, '.length > 1?', 'concat.apply(', res, ',', tmpArr, ') :', res, '.concat(', tmpArr, '[0]) :', res, ';');
        releaseVars(res, i, len, curCtx, j, val, tmpArr);
      }
    }

    function translateDescendantSelector(sel, dest, baseCtx) {
      var prop = sel.prop,
          ctx = acquireVar(),
          curCtx = acquireVar(),
          childCtxs = acquireVar(),
          i = acquireVar(),
          j = acquireVar(),
          val = acquireVar(),
          len = acquireVar(),
          res = acquireVar();
      body.push(ctx, '=', baseCtx, '.slice(),', res, '= [];', 'while(', ctx, '.length) {', curCtx, '=', ctx, '.shift();');
      prop ? body.push('if(typeof ', curCtx, '=== "object" &&', curCtx, ') {') : body.push('if(typeof ', curCtx, '!= null) {');
      body.push(childCtxs, '= [];', 'if(isArr(', curCtx, ')) {', i, '= 0,', len, '=', curCtx, '.length;', 'while(', i, '<', len, ') {', val, '=', curCtx, '[', i, '++];');
      prop && body.push('if(typeof ', val, '=== "object") {');
      inlineAppendToArray(childCtxs, val);
      prop && body.push('}');
      body.push('}', '}', 'else {');

      if (prop) {
        if (prop !== '*') {
          body.push(val, '=', curCtx, '["' + prop + '"];');
          inlineAppendToArray(res, val);
        }
      } else {
        inlineAppendToArray(res, curCtx);
        body.push('if(typeof ', curCtx, '=== "object") {');
      }

      body.push('for(', j, ' in ', curCtx, ') {', 'if(', curCtx, '.hasOwnProperty(', j, ')) {', val, '=', curCtx, '[', j, '];');
      inlineAppendToArray(childCtxs, val);
      prop === '*' && inlineAppendToArray(res, val);
      body.push('}', '}');
      prop || body.push('}');
      body.push('}', childCtxs, '.length &&', ctx, '.unshift.apply(', ctx, ',', childCtxs, ');', '}', '}', dest, '=', res, ';');
      releaseVars(ctx, curCtx, childCtxs, i, j, val, len, res);
    }

    function translateObjectPredicate(expr, dest, ctx) {
      var resVar = acquireVar(),
          i = acquireVar(),
          len = acquireVar(),
          cond = acquireVar(),
          curItem = acquireVar();
      body.push(resVar, '= [];', i, '= 0;', len, '=', ctx, '.length;', 'while(', i, '<', len, ') {', curItem, '=', ctx, '[', i, '++];');
      translateExpr(expr.arg, cond, curItem);
      body.push(convertToBool(expr.arg, cond), '&&', resVar, '.push(', curItem, ');', '}', dest, '=', resVar, ';');
      releaseVars(resVar, i, len, curItem, cond);
    }

    function translatePosPredicate(item, dest, ctx) {
      var arrayExpr = item.arg,
          fromIdx,
          toIdx;

      if (arrayExpr.idx) {
        var idx = acquireVar();
        translateExpr(arrayExpr.idx, idx, ctx);
        body.push(idx, '< 0 && (', idx, '=', ctx, '.length +', idx, ');', dest, '=', ctx, '[', idx, '] == null? [] : [', ctx, '[', idx, ']];');
        releaseVars(idx);
        return false;
      } else if (arrayExpr.fromIdx) {
        if (arrayExpr.toIdx) {
          translateExpr(arrayExpr.fromIdx, fromIdx = acquireVar(), ctx);
          translateExpr(arrayExpr.toIdx, toIdx = acquireVar(), ctx);
          body.push(dest, '=', ctx, '.slice(', fromIdx, ',', toIdx, ');');
          releaseVars(fromIdx, toIdx);
        } else {
          translateExpr(arrayExpr.fromIdx, fromIdx = acquireVar(), ctx);
          body.push(dest, '=', ctx, '.slice(', fromIdx, ');');
          releaseVars(fromIdx);
        }
      } else {
        translateExpr(arrayExpr.toIdx, toIdx = acquireVar(), ctx);
        body.push(dest, '=', ctx, '.slice(0,', toIdx, ');');
        releaseVars(toIdx);
      }
    }

    function translateExpr(expr, dest, ctx) {
      switch (expr.type) {
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
      body.push(typeof val === 'string' ? escapeStr(val) : val === null ? 'null' : val);
    }

    function translateComparisonExpr(expr, dest, ctx) {
      var val1 = acquireVar(),
          val2 = acquireVar(),
          isVal1Array = acquireVar(),
          isVal2Array = acquireVar(),
          i = acquireVar(),
          j = acquireVar(),
          len1 = acquireVar(),
          len2 = acquireVar(),
          leftArg = expr.args[0],
          rightArg = expr.args[1];
      body.push(dest, '= false;');
      translateExpr(leftArg, val1, ctx);
      translateExpr(rightArg, val2, ctx);
      var isLeftArgPath = leftArg.type === SYNTAX.PATH,
          isRightArgLiteral = rightArg.type === SYNTAX.LITERAL;
      body.push(isVal1Array, '=');
      isLeftArgPath ? body.push('true;') : body.push('isArr(', val1, ');');
      body.push(isVal2Array, '=');
      isRightArgLiteral ? body.push('false;') : body.push('isArr(', val2, ');');
      body.push('if(');
      isLeftArgPath || body.push(isVal1Array, '&&');
      body.push(val1, '.length === 1) {', val1, '=', val1, '[0];', isVal1Array, '= false;', '}');
      isRightArgLiteral || body.push('if(', isVal2Array, '&&', val2, '.length === 1) {', val2, '=', val2, '[0];', isVal2Array, '= false;', '}');
      body.push(i, '= 0;', 'if(', isVal1Array, ') {', len1, '=', val1, '.length;');

      if (!isRightArgLiteral) {
        body.push('if(', isVal2Array, ') {', len2, '=', val2, '.length;', 'while(', i, '<', len1, '&& !', dest, ') {', j, '= 0;', 'while(', j, '<', len2, ') {');
        writeCondition(expr.op, [val1, '[', i, ']'].join(''), [val2, '[', j, ']'].join(''));
        body.push(dest, '= true;', 'break;', '}', '++', j, ';', '}', '++', i, ';', '}', '}', 'else {');
      }

      body.push('while(', i, '<', len1, ') {');
      writeCondition(expr.op, [val1, '[', i, ']'].join(''), val2);
      body.push(dest, '= true;', 'break;', '}', '++', i, ';', '}');
      isRightArgLiteral || body.push('}');
      body.push('}');

      if (!isRightArgLiteral) {
        body.push('else if(', isVal2Array, ') {', len2, '=', val2, '.length;', 'while(', i, '<', len2, ') {');
        writeCondition(expr.op, val1, [val2, '[', i, ']'].join(''));
        body.push(dest, '= true;', 'break;', '}', '++', i, ';', '}', '}');
      }

      body.push('else {', dest, '=', binaryOperators[expr.op](val1, val2), ';', '}');
      releaseVars(val1, val2, isVal1Array, isVal2Array, i, j, len1, len2);
    }

    function writeCondition(op, val1Expr, val2Expr) {
      body.push('if(', binaryOperators[op](val1Expr, val2Expr), ') {');
    }

    function translateLogicalExpr(expr, dest, ctx) {
      var conditionVars = [],
          args = expr.args,
          len = args.length,
          i = 0,
          val;
      body.push(dest, '= false;');

      switch (expr.op) {
        case '&&':
          while (i < len) {
            conditionVars.push(val = acquireVar());
            translateExpr(args[i], val, ctx);
            body.push('if(', convertToBool(args[i++], val), ') {');
          }

          body.push(dest, '= true;');
          break;

        case '||':
          while (i < len) {
            conditionVars.push(val = acquireVar());
            translateExpr(args[i], val, ctx);
            body.push('if(', convertToBool(args[i], val), ') {', dest, '= true;', '}');

            if (i++ + 1 < len) {
              body.push('else {');
            }
          }

          --len;
          break;
      }

      while (len--) {
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
      body.push(dest, '=', binaryOperators[expr.op](convertToSingleValue(args[0], val1), convertToSingleValue(args[1], val2)), ';');
      releaseVars(val1, val2);
    }

    function translateUnaryExpr(expr, dest, ctx) {
      var val = acquireVar(),
          arg = expr.arg;
      translateExpr(arg, val, ctx);

      switch (expr.op) {
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

      while (i < len) {
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
      body.push('if(typeof ', val, '!== "undefined") {', 'if(isArr(', val, ')) {');

      if (tmpArr) {
        body.push(len, '> 1?');
        inlinePushToArray(tmpArr, val);
        body.push(':');
      }

      body.push(res, '=', res, '.length?', res, '.concat(', val, ') :', val, '.slice()', ';', '}', 'else {');
      tmpArr && body.push('if(', tmpArr, '.length) {', res, '= concat.apply(', res, ',', tmpArr, ');', tmpArr, '= [];', '}');
      inlinePushToArray(res, val);
      body.push(';', '}', '}');
    }

    function inlinePushToArray(res, val) {
      body.push(res, '.length?', res, '.push(', val, ') :', res, '[0] =', val);
    }

    function convertToBool(arg, varName) {
      switch (arg.type) {
        case SYNTAX.LOGICAL_EXPR:
          return varName;

        case SYNTAX.LITERAL:
          return '!!' + varName;

        case SYNTAX.PATH:
          return varName + '.length > 0';

        default:
          return ['(typeof ', varName, '=== "boolean"?', varName, ':', 'isArr(', varName, ')?', varName, '.length > 0 : !!', varName, ')'].join('');
      }
    }

    function convertToSingleValue(arg, varName) {
      switch (arg.type) {
        case SYNTAX.LITERAL:
          return varName;

        case SYNTAX.PATH:
          return varName + '[0]';

        default:
          return ['(isArr(', varName, ')?', varName, '[0] : ', varName, ')'].join('');
      }
    }

    function startsWithStrict(val1, val2) {
      return ['typeof ', val1, '=== "string" && typeof ', val2, '=== "string" &&', val1, '.indexOf(', val2, ') === 0'].join('');
    }

    function startsWith(val1, val2) {
      return [val1, '!= null &&', val2, '!= null &&', val1, '.toString().toLowerCase().indexOf(', val2, '.toString().toLowerCase()) === 0'].join('');
    }

    function endsWithStrict(val1, val2) {
      return ['typeof ', val1, '=== "string" && typeof ', val2, '=== "string" &&', val1, '.length >=', val2, '.length &&', val1, '.lastIndexOf(', val2, ') ===', val1, '.length -', val2, '.length'].join('');
    }

    function endsWith(val1, val2) {
      return [val1, '!= null &&', val2, '!= null &&', '(', val1, '=', val1, '.toString()).length >=', '(', val2, '=', val2, '.toString()).length &&', '(', val1, '.toLowerCase()).lastIndexOf(', '(', val2, '.toLowerCase())) ===', val1, '.length -', val2, '.length'].join('');
    }

    function containsStrict(val1, val2) {
      return ['typeof ', val1, '=== "string" && typeof ', val2, '=== "string" &&', val1, '.indexOf(', val2, ') > -1'].join('');
    }

    function contains(val1, val2) {
      return [val1, '!= null && ', val2, '!= null &&', val1, '.toString().toLowerCase().indexOf(', val2, '.toString().toLowerCase()) > -1'].join('');
    }

    var binaryOperators = {
      '===': function _(val1, val2) {
        return val1 + '===' + val2;
      },
      '==': function _(val1, val2) {
        return ['typeof ', val1, '=== "string" && typeof ', val2, '=== "string"?', val1, '.toLowerCase() ===', val2, '.toLowerCase() :' + val1, '==', val2].join('');
      },
      '>=': function _(val1, val2) {
        return val1 + '>=' + val2;
      },
      '>': function _(val1, val2) {
        return val1 + '>' + val2;
      },
      '<=': function _(val1, val2) {
        return val1 + '<=' + val2;
      },
      '<': function _(val1, val2) {
        return val1 + '<' + val2;
      },
      '!==': function _(val1, val2) {
        return val1 + '!==' + val2;
      },
      '!=': function _(val1, val2) {
        return val1 + '!=' + val2;
      },
      '^==': startsWithStrict,
      '==^': function _(val1, val2) {
        return startsWithStrict(val2, val1);
      },
      '^=': startsWith,
      '=^': function _(val1, val2) {
        return startsWith(val2, val1);
      },
      '$==': endsWithStrict,
      '==$': function $(val1, val2) {
        return endsWithStrict(val2, val1);
      },
      '$=': endsWith,
      '=$': function $(val1, val2) {
        return endsWith(val2, val1);
      },
      '*==': containsStrict,
      '==*': function _(val1, val2) {
        return containsStrict(val2, val1);
      },
      '=*': function _(val1, val2) {
        return contains(val2, val1);
      },
      '*=': contains,
      '+': function _(val1, val2) {
        return val1 + '+' + val2;
      },
      '-': function _(val1, val2) {
        return val1 + '-' + val2;
      },
      '*': function _(val1, val2) {
        return val1 + '*' + val2;
      },
      '/': function _(val1, val2) {
        return val1 + '/' + val2;
      },
      '%': function _(val1, val2) {
        return val1 + '%' + val2;
      }
    };
    return translate;
  }();

  function compile(path) {
    return Function('data,subst', translate(parse(path)));
  }

  var cache = {},
      cacheKeys = [],
      params = {
    cacheSize: 100
  },
      setParamsHooks = {
    cacheSize: function cacheSize(oldVal, newVal) {
      if (newVal < oldVal && cacheKeys.length > newVal) {
        var removedKeys = cacheKeys.splice(0, cacheKeys.length - newVal),
            i = removedKeys.length;

        while (i--) {
          delete cache[removedKeys[i]];
        }
      }
    }
  };

  var decl = function decl(path, ctx, substs) {
    if (!cache[path]) {
      cache[path] = compile(path);

      if (cacheKeys.push(path) > params.cacheSize) {
        delete cache[cacheKeys.shift()];
      }
    }

    return cache[path](ctx, substs || {});
  };

  decl.version = '0.4.0';

  decl.params = function (_params) {
    if (!arguments.length) {
      return params;
    }

    for (var name in _params) {
      if (_params.hasOwnProperty(name)) {
        setParamsHooks[name] && setParamsHooks[name](params[name], _params[name]);
        params[name] = _params[name];
      }
    }
  };

  decl.compile = compile;
  decl.apply = decl;

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = decl;
  } else if (typeof modules === 'object') {
    modules.define('jspath', function (provide) {
      provide(decl);
    });
  } else if (typeof define === 'function') {
    define(function (require, exports, module) {
      module.exports = decl;
    });
  } else {
    window.JSPath = decl;
  }
})();

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

var _ami_internal_jQueryAjax = jQuery.ajax;

jQuery.ajax = function (settings) {
  if (typeof settings === 'object' && settings.dataType === 'sheet') {
    var result = $.Deferred();

    var _amiWebApp$setup = amiWebApp.setup(['context', 'url'], [result, ''], settings),
        context = _amiWebApp$setup[0],
        url = _amiWebApp$setup[1];

    if (url) {
      $('head').append('<link rel="stylesheet" type="text/css" href="' + url + '"></link>').promise().done(function () {
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
  findWithSelf: function findWithSelf(selector) {
    return this.find(selector).addBack(selector);
  },
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

function _$createNamespace($name, x) {
  var parent = window;
  var parts = $name.split(/\s*\.\s*/g),
      l = parts.length - 1;

  for (var i = 0; i < l; i++) {
    if (parent[parts[i]]) {
      parent = parent[parts[i]];
    } else {
      parent = parent[parts[i]] = {};
    }
  }

  parent[parts[i]] = x;
}

function _$addToNamespace($name, x) {
  var parent = window;
  var parts = $name.split(/\s*\.\s*/g),
      l = parts.length - 1;

  for (var i = 0; i < l; i++) {
    if (parent[parts[i]]) {
      parent = parent[parts[i]];
    } else {
      throw '`' + $name + '` (`' + parts[i] + '`) not declared';
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

                if (typeof this[j] !== typeof $member) {
                  throw 'class `' + this.$name + '` with must implement `' + $interface.$name + '.' + j + '`';
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

if (typeof exports !== 'undefined') {
  module.exports.Namespace = $AMINamespace;
  module.exports.Interface = $AMIInterface;
  module.exports.Class = $AMIClass;
}

if (typeof jQuery !== 'undefined') {
  jQuery.Namespace = $AMINamespace;
  jQuery.Interface = $AMIInterface;
  jQuery.Class = $AMIClass;
}

$AMINamespace('amiRouter', {
  _scriptURL: '',
  _originURL: '',
  _webAppURL: '',
  _hash: '',
  _args: [],
  _routes: [],
  _eatSlashes: function _eatSlashes(url) {
    url = url.trim();

    while (url[url.length - 1] === '/') {
      url = url.substring(0, url.length - 1);
    }

    return url;
  },
  $: function $() {
    var _this2 = this;

    this._args.length = 0;
    this._routes.length = 0;
    var href = window.location.href.trim();
    var hash = window.location.hash.trim();
    var search = window.location.search.trim();
    var scripts = document.getElementsByTagName('script');

    for (var idx, i = 0; i < scripts.length; i++) {
      idx = scripts[i].src.indexOf('js/ami.');

      if (idx > 0) {
        this._scriptURL = scripts[i].src;
        this._originURL = this._eatSlashes(this._scriptURL.substring(0, idx));
        break;
      }
    }

    this._webAppURL = this._eatSlashes(href.replace(/(?:\#|\?).*$/, ''));
    this._hash = this._eatSlashes(hash.substring(1).replace(/\?.*$/, ''));

    if (search) {
      search.substring(1).split('&').forEach(function (param) {
        var parts = param.split('=');

        if (parts.length === 1) {
          _this2._args[decodeURIComponent(parts[0])] = '';
        } else if (parts.length === 2) {
          _this2._args[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
        }
      });
    }
  },
  getScriptURL: function getScriptURL() {
    return this._scriptURL;
  },
  getOriginURL: function getOriginURL() {
    return this._originURL;
  },
  getWebAppURL: function getWebAppURL() {
    return this._webAppURL;
  },
  getHash: function getHash() {
    return this._hash;
  },
  getArgs: function getArgs() {
    return this._args;
  },
  append: function append(regExp, handler) {
    this._routes.unshift({
      regExp: regExp,
      handler: handler
    });

    return this;
  },
  remove: function remove(regExp) {
    this._routes = this._routes.filter(function (route) {
      return route.regExp.toString() !== regExp.toString();
    });
    return this;
  },
  check: function check() {
    var m;

    for (var i = 0; i < this._routes.length; i++) {
      m = this._hash.match(this._routes[i].regExp);

      if (m) {
        this._routes[i].handler.apply(amiRouter, m);

        return true;
      }
    }

    return false;
  },
  appendHistoryEntry: function appendHistoryEntry(path, context) {
    if (context === void 0) {
      context = null;
    }

    if (history.pushState) {
      history.pushState(context, null, this._webAppURL + this._eatSlashes(path));
      return true;
    }

    return false;
  },
  replaceHistoryEntry: function replaceHistoryEntry(path, context) {
    if (context === void 0) {
      context = null;
    }

    if (history.replaceState) {
      history.replaceState(context, null, this._webAppURL + this._eatSlashes(path));
      return true;
    }

    return false;
  }
});
$AMINamespace('ami', {
  version: '0.0.1',
  commit_id: '{{AMI_COMMIT_ID}}'
});

function _ami_internal_then(deferred, doneFunc, failFunc) {
  if (deferred && deferred.then) {
    deferred.then(doneFunc, failFunc);
  } else {
    doneFunc();
  }
}

function _ami_internal_always(deferred, alwaysFunc) {
  if (deferred && deferred.always) {
    deferred.always(alwaysFunc);
  } else {
    alwaysFunc();
  }
}

$AMINamespace('amiWebApp', {
  _idRegExp: new RegExp('[a-zA-Z][a-zA-Z0-9]{7}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{12}', 'g'),
  _linkExp: new RegExp('\\[([^\\]]*)\\]\\(([^\\)]*)\\)', 'g'),
  _embedded: false,
  _noBootstrap: false,
  _noDateTimePicker: false,
  _noSelect2: false,
  _globalDeferred: $.Deferred(),
  _sheets: [],
  _scripts: [],
  _controls: {},
  _subapps: {},
  _isReady: false,
  _canLeave: true,
  _lockCnt: 0x00,
  _currentSubAppInstance: new function () {
    this.onReady = function () {};

    this.onExit = function () {};

    this.onLogin = function () {};

    this.onLogout = function () {};
  }(),
  originURL: '/',
  webAppURL: '/',
  hash: '',
  args: {},
  $: function $() {
    var _this3 = this;

    var url = amiRouter.getScriptURL();
    var idx = url.indexOf('?');

    if (idx > 0) {
      var flags = url.substring(idx).toLowerCase();
      this._embedded = flags.indexOf('embedded') >= 0;
      this._noBootstrap = flags.indexOf('nobootstrap') >= 0;
      this._noDateTimePicker = flags.indexOf('nodatetimepicker') >= 0;
      this._noSelect2 = flags.indexOf('noselect2') >= 0;
    }

    this.originURL = amiRouter.getOriginURL();
    this.webAppURL = amiRouter.getWebAppURL();
    this.hash = amiRouter.getHash();
    this.args = amiRouter.getArgs();
    var resourcesCSS = [];
    var resourcesJS = [];

    if (!window.Popper) {
      resourcesJS.push(this.originURL + '/js/popper.min.js');
    }

    if (!window.moment) {
      resourcesJS.push(this.originURL + '/js/moment.min.js');
    }

    if (typeof jQuery.fn.qrcode !== 'function') {
      resourcesJS.push(this.originURL + '/js/jquery-qrcode.min.js');
    }

    if (!this._noBootstrap && typeof jQuery.fn.modal !== 'function') {
      resourcesCSS.push(this.originURL + '/css/bootstrap.min.css');
      resourcesJS.push(this.originURL + '/js/bootstrap.min.js');
    }

    if (!this._noDateTimePicker && typeof jQuery.fn.datetimepicker !== 'function') {
      resourcesCSS.push(this.originURL + '/css/bootstrap-datetimepicker.min.css');
      resourcesJS.push(this.originURL + '/js/bootstrap-datetimepicker.min.js');
    }

    if (!this._noSelect2 && typeof jQuery.fn.select2 !== 'function') {
      resourcesCSS.push(this.originURL + '/css/select2.min.css');
      resourcesJS.push(this.originURL + '/js/select2.min.js');
    }

    this.loadResources([].concat(resourcesCSS, [this.originURL + '/css/font-awesome.min.css', this.originURL + '/css/ami.min.css'], resourcesJS)).done(function () {
      _this3._globalDeferred.resolve();
    }).fail(function (message) {
      _this3._globalDeferred.reject(message);
    });
  },
  isEmbedded: function isEmbedded() {
    return this._embedded;
  },
  isLocal: function isLocal() {
    return document.location.protocol === 'file:' || document.location.hostname === 'localhost' || document.location.hostname === '127.0.0.1' || document.location.hostname === '::1';
  },
  typeOf: function typeOf(x) {
    var name = Object.prototype.toString.call(x);
    return name.startsWith('[object ') ? name.substring(8, name.length - 1) : '';
  },
  asArray: function asArray(x) {
    return this.typeOf(x) === 'Array' ? x : [x];
  },
  setup: function setup(optionNames, optionDefaults, settings) {
    var result = [];
    var l = optionNames.length;
    var m = optionDefaults.length;

    if (l !== m) {
      throw 'internal error';
    }

    if (settings) {
      for (var i = 0; i < l; i++) {
        result.push(optionNames[i] in settings ? settings[optionNames[i]] : optionDefaults[i]);
      }
    } else {
      for (var _i10 = 0; _i10 < l; _i10++) {
        result.push(optionDefaults[_i10]);
      }
    }

    return result;
  },
  replace: amiTwig.stdlib._replace,
  _textToHtmlX: ['&', '"', '<', '>'],
  _textToHtmlY: ['&amp;', '&quot;', '&lt;', '&gt;'],
  textToHtml: function textToHtml(s) {
    return this.replace(s || '', this._textToHtmlX, this._textToHtmlY);
  },
  htmlToText: function htmlToText(s) {
    return this.replace(s || '', this._textToHtmlY, this._textToHtmlX);
  },
  _textToStringX: ['\\', '\n', '"', '\''],
  _textToStringY: ['\\\\', '\\n', '\\"', '\\\''],
  textToString: function textToString(s) {
    return this.replace(s || '', this._textToStringX, this._textToStringY);
  },
  stringToText: function stringToText(s) {
    return this.replace(s || '', this._textToStringY, this._textToStringX);
  },
  _htmlToStringX: ['\\', '\n', '&quot;', '\''],
  _htmlToStringY: ['\\\\', '\\n', '\\&quot;', '\\\''],
  htmlToString: function htmlToString(s) {
    return this.replace(s || '', this._htmlToStringX, this._htmlToStringY);
  },
  stringToHtml: function stringToHtml(s) {
    return this.replace(s || '', this._htmlToStringY, this._htmlToStringX);
  },
  _textToSQLX: ['\''],
  _textToSQLY: ['\'\''],
  textToSQL: function textToSQL(s) {
    return this.replace(s || '', this._textToSQLX, this._textToSQLY);
  },
  sqlToText: function sqlToText(s) {
    return this.replace(s || '', this._textToSQLY, this._textToSQLX);
  },
  _base64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
  base64Encode: function base64Encode(s) {
    var w;
    var e = [];
    var l = s.length,
        m = l % 3;
    var this_base64 = this._base64;

    for (var i = 0; i < l;) {
      w = s.charCodeAt(i++) << 16 | s.charCodeAt(i++) << 8 | s.charCodeAt(i++) << 0;
      e.push(this_base64.charAt(w >> 18 & 0x3F));
      e.push(this_base64.charAt(w >> 12 & 0x3F));
      e.push(this_base64.charAt(w >> 6 & 0x3F));
      e.push(this_base64.charAt(w >> 0 & 0x3F));
    }

    if (m === 1) {
      e.splice(-2, 2);
    } else if (m === 2) {
      e.splice(-1, 1);
    }

    return e.join('');
  },
  base64Decode: function base64Decode(s) {
    var w;
    var e = [];
    var l = s.length,
        m = l % 4;
    var this_base64 = this._base64;

    for (var i = 0; i < l;) {
      w = this_base64.indexOf(s.charAt(i++)) << 18 | this_base64.indexOf(s.charAt(i++)) << 12 | this_base64.indexOf(s.charAt(i++)) << 6 | this_base64.indexOf(s.charAt(i++)) << 0;
      e.push(String.fromCharCode(w >>> 16 & 0xFF));
      e.push(String.fromCharCode(w >>> 8 & 0xFF));
      e.push(String.fromCharCode(w >>> 0 & 0xFF));
    }

    if (m === 2) {
      e.splice(-2, 2);
    } else if (m === 3) {
      e.splice(-1, 1);
    }

    return e.join('');
  },
  _getExtension: function _getExtension(url) {
    var idx = url.lastIndexOf('.');
    return idx > 0 ? url.substring(idx) : '';
  },
  _getDataType: function _getDataType(url, dataType) {
    var result;

    if (dataType === 'auto') {
      if (url.indexOf('ctrl:') === 0) {
        result = 'control';
      } else if (url.indexOf('subapp:') === 0) {
        result = 'subapp';
      } else {
        switch (this._getExtension(url).toLowerCase()) {
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
  },
  __loadXXX: function __loadXXX(deferred, result, urls, dataType, context) {
    var _this4 = this;

    if (urls.length === 0) {
      return deferred.resolveWith(context, [result]);
    }

    var url = urls.shift().trim();

    var dataTYPE = this._getDataType(url, dataType);

    switch (dataTYPE) {
      case 'control':
        this.loadControl(url).then(function (data) {
          result.push(data);
          return _this4.__loadXXX(deferred, result, urls, dataType, context);
        }, function (message) {
          return deferred.rejectWith(context, [message]);
        });
        break;

      case 'subapp':
        this.loadSubApp(url).then(function (data) {
          result.push(data);
          return _this4.__loadXXX(deferred, result, urls, dataType, context);
        }, function (message) {
          return deferred.rejectWith(context, [message]);
        });
        break;

      case 'sheet':
        if (this._sheets.indexOf(url) >= 0) {
          result.push(false);
          return this.__loadXXX(deferred, result, urls, dataType, context);
        } else {
          $.ajax({
            url: url,
            async: false,
            cache: false,
            crossDomain: true,
            dataType: dataTYPE
          }).then(function () {
            result.push(true);

            _this4._sheets.push(url);

            return _this4.__loadXXX(deferred, result, urls, dataType, context);
          }, function () {
            return deferred.rejectWith(context, ['could not load `' + url + '`']);
          });
        }

        break;

      case 'script':
        if (this._scripts.indexOf(url) >= 0) {
          result.push(false);
          return this.__loadXXX(deferred, result, urls, dataType, context);
        } else {
          $.ajax({
            url: url,
            async: false,
            cache: false,
            crossDomain: true,
            dataType: dataTYPE
          }).then(function () {
            result.push(true);

            _this4._scripts.push(url);

            return _this4.__loadXXX(deferred, result, urls, dataType, context);
          }, function () {
            return deferred.rejectWith(context, ['could not load `' + url + '`']);
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
          return _this4.__loadXXX(deferred, result, urls, dataType, context);
        }, function () {
          return deferred.rejectWith(context, ['could not load `' + url + '`']);
        });
        break;
    }
  },
  _loadXXX: function _loadXXX(urls, dataType, settings) {
    var deferred = $.Deferred();

    var _this$setup = this.setup(['context'], [deferred], settings),
        context = _this$setup[0];

    this.__loadXXX(deferred, [], this.asArray(urls), dataType, context);

    return deferred.promise();
  },
  loadResources: function loadResources(urls, settings) {
    return this._loadXXX(urls, 'auto', settings);
  },
  loadSheets: function loadSheets(urls, settings) {
    return this._loadXXX(urls, 'sheet', settings);
  },
  loadScripts: function loadScripts(urls, settings) {
    return this._loadXXX(urls, 'script', settings);
  },
  loadJSONs: function loadJSONs(urls, settings) {
    return this._loadXXX(urls, 'json', settings);
  },
  loadXMLs: function loadXMLs(urls, settings) {
    return this._loadXXX(urls, 'xml', settings);
  },
  loadHTMLs: function loadHTMLs(urls, settings) {
    return this._loadXXX(urls, 'text', settings);
  },
  loadTWIGs: function loadTWIGs(urls, settings) {
    return this._loadXXX(urls, 'text', settings);
  },
  loadTexts: function loadTexts(urls, settings) {
    return this._loadXXX(urls, 'text', settings);
  },
  _xxxHTML: function _xxxHTML(selector, twig, mode, settings) {
    var _this5 = this;

    var result = $.Deferred();

    var _this$setup2 = this.setup(['context', 'suffix', 'dict', 'twigs'], [result, null, null, null], settings),
        context = _this$setup2[0],
        suffix = _this$setup2[1],
        dict = _this$setup2[2],
        twigs = _this$setup2[3];

    if (suffix) {
      twig = twig.replace(this._idRegExp, function (id) {
        return id + '_instance' + suffix;
      });
    }

    var html = this.formatTWIG(twig, dict, twigs);
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
        promise = el.replaceWith(el.is('[id]') ? html.replace(/^\s*(<[a-zA-Z_-]+)/, '$1 id="' + el.attr('id') + '"') : html).promise();
        break;

      default:
        throw 'internal error';
    }

    promise.done(function () {
      var el = $(selector);

      var _find = mode === 3 ? function (_selector) {
        return el.findWithSelf(_selector);
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

      if (jQuery.fn.datetimepicker) {
        _find('.form-datetime').datetimepicker({
          format: 'YYYY-MM-DD HH:mm:ss.SSSSSS'
        });

        _find('.form-date').datetimepicker({
          format: 'YYYY-MM-DD'
        });

        _find('.form-time').datetimepicker({
          format: 'HH:mm:ss'
        });

        _find('.form-time-hm').datetimepicker({
          format: 'HH:mm'
        });
      }

      if (window.ace) {
        _find('.form-editor:not(.form-editor-hidden)').each(function (indx, item) {
          var textarea = $(item).addClass('form-editor-hidden');
          var div = $('<div>', {
            'class': textarea.attr('class').replace('form-editor', '').replace('form-editor-hidden', ''),
            'style': textarea.attr('style')
          }).insertBefore(textarea);
          div.promise().done(function () {
            var mode = textarea.attr('data-mode') || 'text';
            var theme = textarea.attr('data-theme') || 'chrome';
            var wrap = textarea.attr('data-wrap') || 'false';
            var readOnly = textarea.attr('data-read-only') || 'false';
            var showGutter = textarea.attr('data-show-gutter') || 'true';
            var highlightActiveLine = textarea.attr('data-highlight-active-line') || 'false';
            ace.config.set('suffix', '.min.js');
            ace.config.set('basePath', _this5.originURL + '/js/3rd-party/ace');
            var editor = ace.edit(div[0], {
              mode: 'ace/mode/' + mode,
              theme: 'ace/theme/' + theme,
              wrap: 'true' === wrap,
              readOnly: 'true' === readOnly,
              showGutter: 'true' === showGutter,
              highlightActiveLine: 'true' === highlightActiveLine,
              minLines: 0x000001,
              maxLines: Infinity
            });
            editor.renderer.setScrollMargin(0, 2);
            var session = editor.getSession();
            textarea.data('editor', editor);
            textarea.data('session', session);
            session.on('change', function () {
              item.value = session.getValue();
            });
            session.setValue(item.value);
          });
        });
      }

      result.resolveWith(context, [el]);
    });
    return result.promise();
  },
  replaceHTML: function replaceHTML(selector, twig, settings) {
    return this._xxxHTML(selector, twig, 0, settings);
  },
  prependHTML: function prependHTML(selector, twig, settings) {
    return this._xxxHTML(selector, twig, 1, settings);
  },
  appendHTML: function appendHTML(selector, twig, settings) {
    return this._xxxHTML(selector, twig, 2, settings);
  },
  formatTWIG: function formatTWIG(twig, dict, twigs) {
    var _this6 = this;

    if (dict === void 0) {
      dict = {};
    }

    if (twigs === void 0) {
      twigs = {};
    }

    var result = [];

    var render = function render(twig, dict) {
      if (_this6.typeOf(dict) !== 'Object') {
        dict = {};
      }

      if (_this6.typeOf(twigs) !== 'Object') {
        twigs = {};
      }

      dict['ORIGIN_URL'] = _this6.originURL;
      dict['WEBAPP_URL'] = _this6.webAppURL;
      return amiTwig.engine.render(twig, dict, twigs);
    };

    try {
      if (this.typeOf(dict) === 'Array') {
        dict.forEach(function (DICT) {
          result.push(render(twig, DICT, twigs));
        });
      } else {
        result.push(render(twig, dict, twigs));
      }
    } catch (error) {
      result.length = 0;
      this.error('TWIG parsing error: ' + error.message);
    }

    return result.join('');
  },
  jspath: function jspath(path, json) {
    return JSPath.apply(path, json);
  },
  getStack: function getStack() {
    try {
      throw Error();
    } catch (e1) {
      try {
        return e1.stack;
      } catch (e2) {
        return '';
      }
    }
  },
  lock: function lock() {
    var lines = this.getStack().split('\n');

    if (lines.length > 2) {
      console.log('lock[' + this._lockCnt + '] :: ' + lines[2]);
    }

    if (this._lockCnt <= 0) {
      $('#ami_locker').css('display', 'flex');
      this._lockCnt = 1;
    } else {
      this._lockCnt++;
    }
  },
  unlock: function unlock() {
    if (this._lockCnt <= 1) {
      $('#ami_locker').css('display', 'none');
      this._lockCnt = 0;
    } else {
      this._lockCnt--;
    }

    var lines = this.getStack().split('\n');

    if (lines.length > 2) {
      console.log('unlock[' + this._lockCnt + '] :: ' + lines[2]);
    }
  },
  modalLeave: function modalLeave() {
    var lines = this.getStack().split('\n');

    if (lines.length > 2) {
      console.log('modalLock[' + this._lockCnt + '] :: ' + lines[2]);
    }

    this._lockCnt = this._tmpLockCnt;

    if (this._lockCnt > 0) {
      $('#ami_locker').css('display', 'flex');
    }
  },
  modalEnter: function modalEnter() {
    this._tmpLockCnt = this._lockCnt;

    if (this._lockCnt > 0) {
      $('#ami_locker').css('display', 'none');
    }

    var lines = this.getStack().split('\n');

    if (lines.length > 2) {
      console.log('modalUnlock[' + this._lockCnt + '] :: ' + lines[2]);
    }
  },
  canLeave: function canLeave() {
    this._canLeave = true;
  },
  cannotLeave: function cannotLeave() {
    this._canLeave = false;
  },
  _publishAlert: function _publishAlert(clazz, title, message, fadeOut) {
    var _this7 = this;

    console.log('AMI ' + title.toUpperCase() + ': ' + message + '\n' + this.getStack());
    var html = '<div class="toast" role="alert" ' + (fadeOut ? 'data-delay="60000"' : 'data-autohide="false"') + '><div class="toast-header"><strong class="mr-auto ' + clazz + '">' + title + '</strong><small>' + this.textToHtml(window.moment().format('DD MMM, HH:mm:ss')) + '</small><button type="button" class="ml-2 mb-1 close" data-dismiss="toast"><span>&times;</span></button></div><div class="toast-body">' + this.textToHtml(message) + '</div></div>';
    var el = $('#ami_alert_content');
    el.append(html.replace(this._linkExp, '<a href="$1" target="_blank">$2</a>')).promise().done(function () {
      el.find('.toast:last-child').toast('show');
      $(document).scrollTop(0);

      _this7.unlock();
    });
  },
  info: function info(message, fadeOut) {
    if (this.typeOf(message) === 'Array') {
      message = message.join('. ');
    }

    this._publishAlert('text-info', 'Info', message, fadeOut);
  },
  success: function success(message, fadeOut) {
    if (this.typeOf(message) === 'Array') {
      message = message.join('. ');
    }

    this._publishAlert('text-success', 'Success', message, fadeOut);
  },
  warning: function warning(message, fadeOut) {
    if (this.typeOf(message) === 'Array') {
      message = message.join('. ');
    }

    this._publishAlert('text-warning', 'Warning', message, fadeOut);
  },
  error: function error(message, fadeOut) {
    if (this.typeOf(message) === 'Array') {
      message = message.join('. ');
    }

    this._publishAlert('text-danger', 'Error', message, fadeOut);
  },
  flush: function flush() {
    $('#ami_alert_content').empty();
  },
  fillBreadcrumb: function fillBreadcrumb(items) {
    var _this8 = this;

    var s = this.typeOf(items) === 'Array' ? items.map(function (item) {
      return '<li class="breadcrumb-item">' + item.replace(/{{WEBAPP_URL}}/g, _this8.webAppURL) + '</li>';
    }).join('') : '';
    $('#ami_breadcrumb_content').html(s);
  },
  onReady: function onReady() {
    if (!this._embedded) {
      alert('error: `amiWebApp.onReady()` must be overloaded!');
    }
  },
  onRefresh: function onRefresh() {
    if (!this._embedded) {
      alert('error: `amiWebApp.onRefresh()` must be overloaded!');
    }
  },
  start: function start(settings) {
    var _this9 = this;

    this._globalDeferred.done(function () {
      var _this9$setup = _this9.setup(['logo_url', 'home_url', 'contact_email', 'about_url', 'theme_url', 'locker_url', 'endpoint_url', 'password_authentication_allowed', 'certificate_authentication_allowed', 'create_account_allowed', 'change_info_allowed', 'change_password_allowed', 'change_certificate_allowed'], [_this9.originURL + '/images/logo.png', _this9.webAppURL, 'ami@lpsc.in2p3.fr', 'http://cern.ch/ami/', _this9.originURL + '/twig/AMI/Theme/blue.twig', _this9.originURL + '/twig/AMI/Fragment/locker.twig', _this9.originURL + '/AMI/FrontEnd', true, true, true, true, true, true], settings),
          logoURL = _this9$setup[0],
          homeURL = _this9$setup[1],
          contactEmail = _this9$setup[2],
          aboutURL = _this9$setup[3],
          themeURL = _this9$setup[4],
          lockerURL = _this9$setup[5],
          endpointURL = _this9$setup[6],
          passwordAuthenticationAllowed = _this9$setup[7],
          certificateAuthenticationAllowed = _this9$setup[8],
          createAccountAllowed = _this9$setup[9],
          changeInfoAllowed = _this9$setup[10],
          changePasswordAllowed = _this9$setup[11],
          changeCertificateAllowed = _this9$setup[12];

      amiCommand.endpoint = endpointURL;

      window.onbeforeunload = function (e) {
        if (!_this9._canLeave) {
          var f = e || window.event;

          if (f) {
            f.returnValue = 'Confirm that you want to leave this page?';
          }

          return 'Confirm that you want to leave this page?';
        }
      };

      var controlsURL = _this9.originURL + '/controls/CONTROLS.json';
      var subappsURL = _this9.originURL + '/subapps/SUBAPPS.json';
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
            _this9._controls[name.toLowerCase()] = data1[name];
          }

          for (var _name3 in data2) {
            _this9._subapps[_name3.toLowerCase()] = data2[_name3];
          }

          if (!_this9._embedded) {
            var dict = {
              LOGO_URL: logoURL,
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
                $('body').append(_this9.formatTWIG(data3, dict) + data4).promise().done(function () {
                  _this9.lock();

                  amiLogin._start(passwordAuthenticationAllowed, certificateAuthenticationAllowed, createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed).done(function () {
                    _this9.unlock();
                  }).fail(function (message) {
                    _this9.error(message);
                  });
                });
              }, function () {
                alert('could not open `' + lockerURL + '`, please reload the page...');
              });
            }, function () {
              alert('could not open `' + themeURL + '`, please reload the page...');
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
                _this9.lock();

                amiLogin._start(passwordAuthenticationAllowed, certificateAuthenticationAllowed, createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed).done(function () {
                  _this9.unlock();
                }).fail(function (message) {
                  _this9.error(message);
                });
              });
            });
          }
        }, function () {
          alert('could not open `' + subappsURL + '`, please reload the page...');
        });
      }, function () {
        alert('could not open `' + controlsURL + '`, please reload the page...');
      });
    }).fail(function (message) {
      alert(message);
    });

    return this;
  },
  loadControl: function loadControl(control, settings) {
    var result = $.Deferred();

    var _this$setup3 = this.setup(['context'], [result], settings),
        context = _this$setup3[0];

    if (control.indexOf('ctrl:') === 0) {
      control = control.substring(5);
    }

    var descr = this._controls[control.toLowerCase()];

    if (descr) {
      this.loadScripts(this.originURL + '/' + descr.file).then(function (loaded) {
        try {
          var clazz = window[descr.clazz];
          var promise = loaded[0] ? clazz.prototype.onReady.apply(clazz.prototype) : null;

          _ami_internal_then(promise, function () {
            result.resolveWith(context, [clazz]);
          }, function (message) {
            result.rejectWith(context, ['could not load control `' + control + '`: ' + message]);
          });
        } catch (message) {
          result.rejectWith(context, ['could not load control `' + control + '`: ' + message]);
        }
      }, function (message) {
        result.rejectWith(context, ['could not load control `' + control + '`: ' + message]);
      });
    } else {
      result.rejectWith(context, ['could not find control `' + control + '`']);
    }

    return result.promise();
  },
  createControl: function createControl(parent, owner, control, params, settings) {
    var result = $.Deferred();

    var _this$setup4 = this.setup(['context'], [result], settings),
        context = _this$setup4[0];

    this.loadControl(control, settings).done(function (constructor) {
      var instance = new constructor(parent, owner);

      _ami_internal_then(constructor.prototype.render.apply(instance, params), function () {
        result.resolveWith(context, [instance].concat(Array.prototype.slice.call(arguments)));
      }, function (message) {
        result.rejectWith(context, [message]);
      });
    }).fail(function (message) {
      result.rejectWith(context, [message]);
    });
    return result.promise();
  },
  createControlInBody: function createControlInBody(parent, owner, control, controlParamsWithoutSettings, controlSettings, parentSettings, settings) {
    var result = $.Deferred();

    var _this$setup5 = this.setup(['context'], [result], settings),
        context = _this$setup5[0];

    try {
      var PARAMS = [];
      var SETTINGS = {};

      for (var key in parentSettings) {
        SETTINGS[key] = parentSettings[key];
      }

      for (var _key in controlSettings) {
        SETTINGS[_key] = controlSettings[_key];
      }

      Array.prototype.push.apply(PARAMS, controlParamsWithoutSettings);
      PARAMS.push(SETTINGS);
      this.createControl(parent, owner, control, PARAMS).done(function () {
        result.resolveWith(context, Array.prototype.slice.call(arguments));
      }).fail(function (message) {
        result.rejectWith(context, [message]);
      });
    } catch (message) {
      result.rejectWith(context, [message]);
    }

    return result.promise();
  },
  createControlInContainer: function createControlInContainer(parent, owner, control, controlParamsWithoutSettings, controlSettings, parentSettings, icon, title, settings) {
    var _this10 = this;

    var result = $.Deferred();

    var _this$setup6 = this.setup(['context'], [result], settings),
        context = _this$setup6[0];

    try {
      parent.appendItem('<i class="fa fa-' + this.textToHtml(icon) + '"></i> ' + this.textToHtml(title)).done(function (selector) {
        var PARAMS = [];
        var SETTINGS = {};

        for (var key in parentSettings) {
          SETTINGS[key] = parentSettings[key];
        }

        for (var _key2 in controlSettings) {
          SETTINGS[_key2] = controlSettings[_key2];
        }

        PARAMS.push(selector);
        Array.prototype.push.apply(PARAMS, controlParamsWithoutSettings);
        PARAMS.push(SETTINGS);

        _this10.createControl(parent, owner, control, PARAMS).done(function () {
          result.resolveWith(context, Array.prototype.slice.call(arguments));
        }).fail(function (message) {
          result.rejectWith(context, [message]);
        });
      });
    } catch (message) {
      result.rejectWith(context, [message]);
    }

    return result.promise();
  },
  createControlFromWebLink: function createControlFromWebLink(parent, owner, el, parentSettings, settings) {
    var _this11 = this;

    var dataCtrl = el.hasAttribute('data-ctrl') ? el.getAttribute('data-ctrl') : '';
    var dataCtrlLocation = el.hasAttribute('data-ctrl-location') ? el.getAttribute('data-ctrl-location') : '';
    var dataParams = el.hasAttribute('data-params') ? JSON.parse(el.getAttribute('data-params')) : [];
    var dataSettings = el.hasAttribute('data-settings') ? JSON.parse(el.getAttribute('data-settings')) : {};
    var dataIcon = el.hasAttribute('data-icon') ? el.getAttribute('data-icon') : 'question';
    var dataTitle = el.hasAttribute('data-title') ? el.getAttribute('data-title') : 'Unknown';
    this.lock();

    if (dataCtrlLocation === 'body') {
      return this.createControlInBody(parent, owner, dataCtrl, dataParams, dataSettings, parentSettings, settings).done(function () {
        _this11.unlock();
      }).fail(function (message) {
        _this11.error(message);
      });
    } else {
      return this.createControlInContainer(parent, owner, dataCtrl, dataParams, dataSettings, parentSettings, dataIcon, dataTitle, settings).done(function () {
        _this11.unlock();
      }).fail(function (message) {
        _this11.error(message);
      });
    }
  },
  triggerLogin: function triggerLogin() {
    var _this12 = this;

    var result = $.Deferred();

    if (this._isReady) {
      _ami_internal_then(this._currentSubAppInstance.onLogin(this.args['userdata']), function (message) {
        _ami_internal_always(_this12.onRefresh(true), function () {
          result.resolve(message);
        });
      }, function (message) {
        _ami_internal_always(_this12.onRefresh(true), function () {
          result.reject(message);
        });
      });
    } else {
      result.resolve();
    }

    return result.promise();
  },
  triggerLogout: function triggerLogout() {
    var _this13 = this;

    var result = $.Deferred();

    if (this._isReady) {
      _ami_internal_then(this._currentSubAppInstance.onLogout(this.args['userdata']), function (message) {
        _ami_internal_always(_this13.onRefresh(false), function () {
          result.resolve(message);
        });
      }, function (message) {
        _ami_internal_always(_this13.onRefresh(false), function () {
          result.reject(message);
        });
      });
    } else {
      result.resolve();
    }

    return result.promise();
  },
  loadSubApp: function loadSubApp(subapp, userdata, settings) {
    var _this14 = this;

    var result = $.Deferred();

    var _this$setup7 = this.setup(['context'], [result], settings),
        context = _this$setup7[0];

    this.lock();
    result.always(function () {
      _this14.unlock();
    });

    if (subapp.indexOf('subapp:') === 0) {
      subapp = subapp.substring(7);
    }

    var descr = this._subapps[subapp.toLowerCase()];

    if (descr) {
      this.loadScripts(this.originURL + '/' + descr.file).then(function (loaded) {
        try {
          _this14._currentSubAppInstance.onExit(userdata);

          var instance = window[descr.instance];
          _this14._currentSubAppInstance = instance;

          _this14.fillBreadcrumb(descr.breadcrumb);

          var promise = loaded[0] ? instance.onReady(userdata) : null;

          _ami_internal_then(promise, function () {
            var promise = amiLogin.isAuthenticated() ? _this14.triggerLogin() : _this14.triggerLogout();
            promise.then(function () {
              result.resolveWith(context, [instance]);
            }, function (message) {
              result.rejectWith(context, ['could not load subapp `' + subapp + '`: ' + message]);
            });
          }, function (message) {
            result.rejectWith(context, ['could not load subapp `' + subapp + '`: ' + message]);
          });
        } catch (message) {
          result.rejectWith(context, ['could not load subapp `' + subapp + '`: ' + message]);
        }
      }, function (message) {
        result.rejectWith(context, ['could not load subapp `' + subapp + '`: ' + message]);
      });
    } else {
      result.rejectWith(context, ['could not find subapp `' + subapp + '`']);
    }

    return result.promise();
  },
  loadSubAppByURL: function loadSubAppByURL(defaultSubApp, defaultUserData) {
    var _this15 = this;

    var result = $.Deferred();

    if (this.args['v']) {
      amiCommand.execute('GetHashInfo -hash="' + this.textToString(this.args['v']) + '"').fail(function (data, message) {
        result.reject(message);
      }).done(function (data) {
        var json;

        try {
          json = JSON.parse(_this15.jspath('..field{.@name==="json"}.$', data)[0] || '{}');
        } catch (message) {
          json = {};
        }

        var subapp = json['subapp'] || defaultSubApp;
        var userdata = json['userdata'] || defaultUserData;

        _this15.loadSubApp(subapp, userdata).then(function () {
          result.resolve();
        }, function (message) {
          result.reject(message);
        });
      });
    } else {
      if (!amiRouter.check()) {
        var subapp = this.args['subapp'] || defaultSubApp;
        var userdata = this.args['userdata'] || defaultUserData;
        this.loadSubApp(subapp, userdata).then(function () {
          result.resolve();
        }, function (message) {
          result.reject(message);
        });
      }
    }

    return result.promise();
  }
});
$AMIInterface('ami.IControl', {
  patchId: function patchId() {},
  replaceHTML: function replaceHTML() {},
  prependHTML: function prependHTML() {},
  appendHTML: function appendHTML() {},
  onReady: function onReady() {},
  onRemove: function onRemove() {}
});
$AMIInterface('ami.ISubApp', {
  onReady: function onReady() {},
  onExit: function onExit() {},
  onLogin: function onLogin() {},
  onLogout: function onLogout() {}
});
$AMIClass('ami.Control', {
  $implements: [ami.IControl],
  $: function $() {
    ami.Control.instanceCnt = 1;
  },
  $init: function $init(parent, owner) {
    this._parent = parent || this;
    this._owner = owner || this;
    this.instanceSuffix = ami.Control.instanceCnt++;
  },
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
    var _this16 = this;

    if (selector === void 0) {
      selector = '';
    }

    if (selector) {
      $(selector).on('remove', function () {
        _this16.onRemove();
      });
    }

    return this._selector = selector;
  },
  getSelector: function getSelector() {
    return this._selector;
  },
  patchId: function patchId(identifier) {
    return identifier + '_instance' + this.instanceSuffix;
  },
  replaceHTML: function replaceHTML(selector, twig, settings) {
    if (settings === void 0) {
      settings = {};
    }

    settings.suffix = this.instanceSuffix;
    return amiWebApp.replaceHTML(selector, twig, settings);
  },
  prependHTML: function prependHTML(selector, twig, settings) {
    if (settings === void 0) {
      settings = {};
    }

    settings.suffix = this.instanceSuffix;
    return amiWebApp.prependHTML(selector, twig, settings);
  },
  appendHTML: function appendHTML(selector, twig, settings) {
    if (settings === void 0) {
      settings = {};
    }

    settings.suffix = this.instanceSuffix;
    return amiWebApp.appendHTML(selector, twig, settings);
  },
  createControl: function createControl(parent, control, params, settings) {
    return amiWebApp.createControl(parent, this, control, params, settings);
  },
  createControlInBody: function createControlInBody(parent, control, controlParamsWithoutSettings, controlSettings, parentSettings, settings) {
    return amiWebApp.createControlInBody(parent, this, control, controlParamsWithoutSettings, controlSettings, parentSettings, settings);
  },
  createControlInContainer: function createControlInContainer(parent, control, controlParamsWithoutSettings, controlSettings, parentSettings, icon, title, settings) {
    return amiWebApp.createControlInContainer(parent, this, control, controlParamsWithoutSettings, controlSettings, parentSettings, icon, title, settings);
  },
  createControlFromWebLink: function createControlFromWebLink(parent, el, parentSettings, settings) {
    return amiWebApp.createControlFromWebLink(parent, this, el, parentSettings, settings);
  },
  onRemove: function onRemove() {}
});
$AMIClass('ami.SubApp', {
  $implements: [ami.ISubApp],
  onExit: function onExit() {},
  onLogin: function onLogin() {},
  onLogout: function onLogout() {}
});
$AMINamespace('amiCommand', {
  endpoint: 'http://xxyy.zz',
  converter: 'AMIXmlToJson.xsl',
  execute: function execute(command, settings) {
    var result = $.Deferred();

    var _amiWebApp$setup2 = amiWebApp.setup(['endpoint', 'converter', 'context', 'timeout', 'extraParam', 'extraValue'], [this.endpoint, this.converter, result, 2 * 60 * 1000, null, null], settings),
        endpoint = _amiWebApp$setup2[0],
        converter = _amiWebApp$setup2[1],
        context = _amiWebApp$setup2[2],
        timeout = _amiWebApp$setup2[3],
        extraParam = _amiWebApp$setup2[4],
        extraValue = _amiWebApp$setup2[5];

    var URL = endpoint.trim();
    var COMMAND = command.trim();
    var CONVERTER = converter.trim();
    var data = {
      Command: COMMAND,
      Converter: CONVERTER
    };

    if (extraParam) {
      data[extraParam] = extraValue ? extraValue : null;
    }

    var urlWithParameters = URL + '?' + $.param(data);

    if (CONVERTER === 'AMIXmlToJson.xsl') {
      $.ajax({
        url: URL,
        data: data,
        type: 'POST',
        timeout: timeout,
        dataType: 'json',
        xhrFields: {
          withCredentials: true
        },
        success: function success(data) {
          var info = JSPath.apply('.AMIMessage.info.$', data);
          var error = JSPath.apply('.AMIMessage.error.$', data);

          if (error.length === 0) {
            result.resolveWith(context, [data, info.join('. '), urlWithParameters]);
          } else {
            result.rejectWith(context, [data, error.join('. '), urlWithParameters]);
          }
        },
        error: function error(jqXHR, textStatus) {
          if (textStatus === 'error') {
            textStatus = 'service temporarily unreachable';
          }

          if (textStatus === 'parsererror') {
            textStatus = 'resource temporarily unreachable';
          }

          var data = {
            'AMIMessage': [{
              'error': [{
                '$': textStatus
              }]
            }]
          };
          result.rejectWith(context, [data, textStatus, urlWithParameters]);
        }
      });
    } else {
      $.ajax({
        url: URL,
        data: data,
        type: 'POST',
        timeout: timeout,
        dataType: 'text',
        xhrFields: {
          withCredentials: true
        },
        success: function success(data) {
          result.resolveWith(context, [data, data, urlWithParameters]);
        },
        error: function error(jqXHR, textStatus) {
          if (textStatus === 'error') {
            textStatus = 'service temporarily unreachable';
          }

          result.rejectWith(context, [textStatus, textStatus, urlWithParameters]);
        }
      });
    }

    return result.promise();
  },
  passLogin: function passLogin(user, pass, settings) {
    var result = $.Deferred();

    var _amiWebApp$setup3 = amiWebApp.setup(['context'], [result], settings),
        context = _amiWebApp$setup3[0];

    this.execute('GetSessionInfo -AMIUser="' + amiWebApp.textToString(user) + '" -AMIPass="' + amiWebApp.textToString(pass) + '"', {
      extraParam: 'NoCert'
    }).then(function (data, message) {
      var userInfo = {};
      var roleInfo = {};
      var udpInfo = {};
      var ssoInfo = {};
      JSPath.apply('..rowset{.@type==="user"}.row.field', data).forEach(function (item) {
        userInfo[item['@name']] = item['$'];
      });
      JSPath.apply('..rowset{.@type==="udp"}.row.field', data).forEach(function (item) {
        udpInfo[item['@name']] = item['$'];
      });
      JSPath.apply('..rowset{.@type==="sso"}.row.field', data).forEach(function (item) {
        ssoInfo[item['@name']] = item['$'];
      });
      JSPath.apply('..rowset{.@type==="role"}.row', data).forEach(function (row) {
        var name = '';
        var role = {};
        row.field.forEach(function (field) {
          role[field['@name']] = field['$'];

          if (field['@name'] === 'name') {
            name = field['$'];
          }
        });
        roleInfo[name] = role;
      });
      result.resolveWith(context, [data, message, userInfo, roleInfo, udpInfo, ssoInfo]);
    }, function (data, message) {
      result.rejectWith(context, [data, message, {
        AMIUser: 'guest',
        guestUser: 'guest'
      }, {}, {}, {}]);
    });
    return result.promise();
  },
  certLogin: function certLogin(settings) {
    var result = $.Deferred();

    var _amiWebApp$setup4 = amiWebApp.setup(['context'], [result], settings),
        context = _amiWebApp$setup4[0];

    this.execute('GetSessionInfo').then(function (data, message) {
      var userInfo = {};
      var roleInfo = {};
      var udpInfo = {};
      var ssoInfo = {};
      JSPath.apply('..rowset{.@type==="user"}.row.field', data).forEach(function (item) {
        userInfo[item['@name']] = item['$'];
      });
      JSPath.apply('..rowset{.@type==="udp"}.row.field', data).forEach(function (item) {
        udpInfo[item['@name']] = item['$'];
      });
      JSPath.apply('..rowset{.@type==="sso"}.row.field', data).forEach(function (item) {
        ssoInfo[item['@name']] = item['$'];
      });
      JSPath.apply('..rowset{.@type==="role"}.row', data).forEach(function (row) {
        var name = '';
        var role = {};
        row.field.forEach(function (field) {
          role[field['@name']] = field['$'];

          if (field['@name'] === 'name') {
            name = field['$'];
          }
        });
        roleInfo[name] = role;
      });
      result.resolveWith(context, [data, message, userInfo, roleInfo, udpInfo, ssoInfo]);
    }, function (data, message) {
      result.rejectWith(context, [data, message, {
        AMIUser: 'guest',
        guestUser: 'guest'
      }, {}, {}, {}]);
    });
    return result.promise();
  },
  logout: function logout(settings) {
    var result = $.Deferred();

    var _amiWebApp$setup5 = amiWebApp.setup(['context'], [result], settings),
        context = _amiWebApp$setup5[0];

    this.execute('GetSessionInfo -AMIUser="" -AMIPass=""', {
      extraParam: 'NoCert'
    }).then(function (data, message) {
      var userInfo = {};
      var roleInfo = {};
      var udpInfo = {};
      var ssoInfo = {};
      JSPath.apply('..rowset{.@type==="user"}.row.field', data).forEach(function (item) {
        userInfo[item['@name']] = item['$'];
      });
      JSPath.apply('..rowset{.@type==="udp"}.row.field', data).forEach(function (item) {
        udpInfo[item['@name']] = item['$'];
      });
      JSPath.apply('..rowset{.@type==="sso"}.row.field', data).forEach(function (item) {
        ssoInfo[item['@name']] = item['$'];
      });
      JSPath.apply('..rowset{.@type==="role"}.row', data).forEach(function (row) {
        var name = '';
        var role = {};
        row.field.forEach(function (field) {
          role[field['@name']] = field['$'];

          if (field['@name'] === 'name') {
            name = field['$'];
          }
        });
        roleInfo[name] = role;
      });
      result.resolveWith(context, [data, message, userInfo, roleInfo, udpInfo, ssoInfo]);
    }, function (data, message) {
      result.rejectWith(context, [data, message, {
        AMIUser: 'guest',
        guestUser: 'guest'
      }, {}, {}, {}]);
    });
    return result.promise();
  },
  attachCert: function attachCert(user, pass, settings) {
    return this.execute('GetSessionInfo -attachCert -amiLogin="' + amiWebApp.textToString(user) + '" -amiPassword="' + amiWebApp.textToString(pass) + '"', settings);
  },
  detachCert: function detachCert(user, pass, settings) {
    return this.execute('GetSessionInfo -detachCert -amiLogin="' + amiWebApp.textToString(user) + '" -amiPassword="' + amiWebApp.textToString(pass) + '"', settings);
  },
  addUser: function addUser(user, pass, firstName, lastName, email, attach, agree, settings) {
    return this.execute('AddUser -amiLogin="' + amiWebApp.textToString(user) + '" -amiPassword="' + amiWebApp.textToString(pass) + '" -firstName="' + amiWebApp.textToString(firstName) + '" -lastName="' + amiWebApp.textToString(lastName) + '" -email="' + amiWebApp.textToString(email) + '"' + (attach ? ' -attach' : '') + (agree ? ' -agree' : ''), settings);
  },
  changeInfo: function changeInfo(firstName, lastName, email, settings) {
    return this.execute('SetUserInfo -firstName="' + amiWebApp.textToString(firstName) + '" -lastName="' + amiWebApp.textToString(lastName) + '" -email="' + amiWebApp.textToString(email) + '"', settings);
  },
  changePass: function changePass(user, oldPass, newPass, settings) {
    return this.execute('ChangePassword -amiLogin="' + amiWebApp.textToString(user) + '" -amiPasswordOld="' + amiWebApp.textToString(oldPass) + '" -amiPasswordNew="' + amiWebApp.textToString(newPass) + '"', settings);
  },
  resetPass: function resetPass(user, settings) {
    return this.execute('ResetPassword -amiLogin="' + amiWebApp.textToString(user) + '"', settings);
  }
});
$AMINamespace('amiLogin', {
  passwordAuthenticationAllowed: true,
  certificateAuthenticationAllowed: true,
  createAccountAllowed: true,
  changeInfoAllowed: true,
  changePasswordAllowed: true,
  changeCertificateAllowed: true,
  user: 'guest',
  guest: 'guest',
  clientDN: '',
  issuerDN: '',
  notBefore: '',
  notAfter: '',
  userInfo: {},
  roleInfo: {},
  udpInfo: {},
  ssoInfo: {},
  _start: function _start(passwordAuthenticationAllowed, certificateAuthenticationAllowed, createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed) {
    var _this17 = this;

    var result = $.Deferred();
    amiWebApp.loadTWIGs([amiWebApp.originURL + '/twig/AMI/Fragment/login_button.twig', amiWebApp.originURL + '/twig/AMI/Fragment/logout_button.twig', amiWebApp.originURL + '/twig/AMI/Modal/login.twig']).done(function (data) {
      _this17.fragmentLoginButton = data[0];
      _this17.fragmentLogoutButton = data[1];
      var dict = {
        passwordAuthenticationAllowed: _this17.passwordAuthenticationAllowed = passwordAuthenticationAllowed,
        certificateAuthenticationAllowed: _this17.certificateAuthenticationAllowed = certificateAuthenticationAllowed,
        createAccountAllowed: _this17.createAccountAllowed = createAccountAllowed,
        changeInfoAllowed: _this17.changeInfoAllowed = changeInfoAllowed,
        changePasswordAllowed: _this17.changePasswordAllowed = changePasswordAllowed,
        changeCertificateAllowed: _this17.changeCertificateAllowed = changeCertificateAllowed
      };
      amiWebApp.appendHTML('body', data[2], {
        dict: dict
      }).done(function () {
        $('#B7894CC1_1DAA_4A7E_B7D1_DBDF6F06AC73').submit(function (e) {
          _this17.form_login(e);
        });
        $('#EE055CD4_E58F_4834_8020_986AE3F8D67D').submit(function (e) {
          _this17.form_addUser(e);
        });
        $('#DA2047A2_9E5D_420D_B6E7_FA261D2EF10F').submit(function (e) {
          _this17.form_remindPass(e);
        });
        $('#D9EAF998_ED8E_44D2_A0BE_8C5CF5E438BD').submit(function (e) {
          _this17.form_changeInfo(e);
        });
        $('#E92A1097_983B_4857_875F_07E4659B41B0').submit(function (e) {
          _this17.form_changePass(e);
        });
        $('#E6E30EEC_15EE_4FCF_9809_2B8EC2FEF388,#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').change(function () {
          var pass1 = $('#E6E30EEC_15EE_4FCF_9809_2B8EC2FEF388').val();
          var pass2 = $('#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').val();
          $('#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').get(0).setCustomValidity(pass1.length > 0 && pass2.length > 0 && pass1 !== pass2 ? 'Passwords don\'t match.' : '');
        });
        $('#D487FE72_8D95_4048_BEA3_252274862AF4,#EE1DA58C_3761_4734_A9C2_E808CDD7EE77').change(function () {
          var pass1 = $('#D487FE72_8D95_4048_BEA3_252274862AF4').val();
          var pass2 = $('#EE1DA58C_3761_4734_A9C2_E808CDD7EE77').val();
          $('#EE1DA58C_3761_4734_A9C2_E808CDD7EE77').get(0).setCustomValidity(pass1.length > 0 && pass2.length > 0 && pass1 !== pass2 ? 'Passwords don\'t match.' : '');
        });
      });
      window.addEventListener('message', function (e) {
        if (_this17.ssoInfo.url.startsWith(e.origin)) {
          var user = e.data.user;
          var pass = e.data.pass;

          if (user && pass) {
            _this17.form_login2(user, pass);
          }

          e.source.close();
        }
      }, false);
      var userdata = amiWebApp.args['userdata'] || '';
      setInterval(function () {
        if (amiWebApp._isReady) {
          amiCommand.certLogin().fail(function (data, message) {
            amiWebApp.error(message, true);
          }).done(function (data, message, userInfo, roleInfo, udpInfo, ssoInfo) {
            if ((userInfo.AMIUser || '') === (userInfo.guestUser || '')) {
              _this17._update(userInfo, roleInfo, udpInfo, ssoInfo);
            }
          });
        }
      }, 30 * 1000);
      amiCommand.certLogin().fail(function (data, message, userInfo, roleInfo, udpInfo, ssoInfo) {
        _this17._update(userInfo, roleInfo, udpInfo, ssoInfo).always(function () {
          result.reject(message);
        });
      }).done(function (data, message, userInfo, roleInfo, udpInfo, ssoInfo) {
        _ami_internal_then(amiWebApp.onReady(userdata), function () {
          amiWebApp._isReady = true;

          _this17._update(userInfo, roleInfo, udpInfo, ssoInfo).then(function (message) {
            result.resolve(message);
          }, function (message) {
            result.reject(message);
          });
        }, function (message) {
          amiWebApp._isReady = true;
          result.reject(message);
        });
      });
    }).fail(function (message) {
      result.reject(message);
    });
    return result.promise();
  },
  _success: function _success(message) {
    amiWebApp.success(message, true);

    this._clean();
  },
  _error: function _error(message) {
    amiWebApp.error(message, true);

    this._clean();
  },
  _unlock: function _unlock() {
    amiWebApp.unlock();

    this._clean();
  },
  _clean: function _clean() {
    $('#B7894CC1_1DAA_4A7E_B7D1_DBDF6F06AC73').trigger('reset');
    $('#EE055CD4_E58F_4834_8020_986AE3F8D67D').trigger('reset');
    $('#DA2047A2_9E5D_420D_B6E7_FA261D2EF10F').trigger('reset');
    $('#E92A1097_983B_4857_875F_07E4659B41B0').trigger('reset');
  },
  _update: function _update(userInfo, roleInfo, udpInfo, ssoInfo) {
    var result = $.Deferred();
    var user = this.user = userInfo.AMIUser || '';
    var guest = this.guest = userInfo.guestUser || '';
    var notBefore = this.notBefore = userInfo.notBefore || '';
    var notAfter = this.notAfter = userInfo.notAfter || '';
    var clientDNInSession = this.clientDN = userInfo.clientDNInSession || '';
    var issuerDNInSession = this.issuerDN = userInfo.issuerDNInSession || '';
    $('#A09AE316_7068_4BC1_96A9_6B87D28863FE').prop('disabled', !clientDNInSession || !issuerDNInSession);
    $('#C3E94F6D_48E0_86C0_3534_691728E492F4').attr('src', udpInfo.termsAndConditions || amiWebApp.originURL + '/docs/terms_and_conditions.html');
    $('#E50FF8BD_B0F5_CD72_F9DC_FC2BFA5DBA27').attr('src', udpInfo.termsAndConditions || amiWebApp.originURL + '/docs/terms_and_conditions.html');
    this.userInfo = userInfo;
    this.roleInfo = roleInfo;
    this.udpInfo = udpInfo;
    this.ssoInfo = ssoInfo;
    var dict = {
      createAccountAllowed: this.createAccountAllowed,
      changeInfoAllowed: this.changeInfoAllowed,
      changePasswordAllowed: this.changePasswordAllowed,
      changeCertificateAllowed: this.changeCertificateAllowed,
      sso_label: ssoInfo.label || 'SSO',
      sso_url: ssoInfo.url || '@NULL'
    };

    if (user !== guest) {
      var valid = userInfo.valid || 'false';
      var certEnabled = userInfo.certEnabled || 'false';
      var vomsEnabled = userInfo.vomsEnabled || 'false';
      var firstName = userInfo.firstName || '';
      var lastName = userInfo.lastName || '';
      var email = userInfo.email || '';
      var clientDNInAMI = userInfo.clientDNInAMI || '';
      var issuerDNInAMI = userInfo.issuerDNInAMI || '';
      $('#E513F27D_5521_4B08_BF61_52AFB81356F7').val(firstName);
      $('#AFF0B5C0_BEEC_4842_916D_DCBA7F589195').val(lastName);
      $('#C587486B_62C0_4B6E_9288_D8F9F89D157B').val(email);
      $('#ABEB0291_40B0_414A_A42B_E7EABB9B487E').val(firstName);
      $('#A5AFDB62_1034_4F66_A3E6_9341B31FA290').val(lastName);
      $('#D730A774_05EA_47AB_A0C8_D92753802E3E').val(email);
      $('#D1BEE3BF_9161_41DC_BC53_C44FFE4D2522').val(clientDNInAMI);
      $('#C76805D7_1E86_4231_9071_1D04783423BB').val(clientDNInSession);
      $('#F42FAF6B_2C8D_4142_8BD9_E5BCDCAA05AA').val(issuerDNInAMI);
      $('#FE2F6232_C256_4B80_939C_EBEC90320308').val(issuerDNInSession);
      var table = [];

      for (var role in roleInfo) {
        table.push('<tr>');
        table.push('<td>' + amiWebApp.textToHtml(roleInfo[role].name || 'N/A') + '</td>');
        table.push('<td>' + amiWebApp.textToHtml(roleInfo[role].description || 'N/A') + '</td>');
        table.push('</tr>');
      }

      $('#BB07676B_EACA_9B42_ED51_477DB2976041').html(table.join(''));
      var icon = '';
      var message = '';

      if (valid !== 'false') {
        if (certEnabled !== 'false' && clientDNInAMI && issuerDNInAMI) {
          if (!clientDNInSession || !issuerDNInSession) {
            message = 'It is recommended to authenticate with a X.509 certificate.';
          } else {
            if (clientDNInAMI !== clientDNInSession || issuerDNInAMI !== issuerDNInSession) {
              message = 'The X.509 certificate in the session differs from the one in AMI.';
            }
          }
        }

        if (message) {
          $('#D944B01D_2E8D_4EE9_9DCC_2691438BBA16').html('<i class="fa fa-info-circle text-warning"></i> ' + message);
          icon = '<a class="nav-link text-warning" href="javascript:amiLogin.accountStatus();">' + '<i class="fa fa-info-circle"></i>' + '</a>';
        }

        $('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').closest('.rounded').css('background', '#B8D49B url("' + amiWebApp.originURL + '/images/certificate-green.png") no-repeat center center').css('background-size', 'cover');
        $('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').css('color', '#006400').html('<i class="fa fa-leaf"></i> valid <i class="fa fa-leaf"></i>');
        $('#E91280F6_E7C6_3E53_A457_646995C99317').text(notBefore + ' - ' + notAfter);
      } else {
        if (vomsEnabled !== 'false') {
          if (!clientDNInAMI || !issuerDNInAMI) {
            message = 'Register a valid X.509 certificate.';
          } else {
            message = 'Check your virtual organization roles.';
          }
        } else {
          message = 'Unexpected issue, contact the AMI team.';
        }

        if (message) {
          $('#D944B01D_2E8D_4EE9_9DCC_2691438BBA16').html('<i class="fa fa-info-circle text-danger"></i> ' + message);
          icon = '<a class="nav-link text-danger" href="javascript:amiLogin.accountStatus();">' + '<i class="fa fa-info-circle"></i>' + '</a>';
        }

        $('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').closest('.rounded').css('background', '#E8C8CF url("' + amiWebApp.originURL + '/images/certificate-pink.png") no-repeat center center').css('background-size', 'cover');
        $('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').css('color', '#8B0000').html('<i class="fa fa-leaf"></i> invalid <i class="fa fa-leaf"></i>');
        $('#E91280F6_E7C6_3E53_A457_646995C99317').text(notBefore + ' - ' + notAfter);
      }

      $('#EC948084_8C0A_CEBF_58C9_086046AB2456').qrcode({
        render: 'canvas',
        ecLevel: 'H',
        size: 150,
        fill: 'rgba(000, 100, 000, 1.0)',
        background: 'rgba(184, 212, 155, 1.0)',
        text: user + '|' + firstName + ' ' + lastName + '|' + email + '|' + clientDNInAMI + '|' + issuerDNInAMI,
        radius: 0,
        quiet: 1
      });
      dict['user'] = user;
      dict['icon'] = icon;
      amiWebApp.replaceHTML('#ami_login_menu_content', this.fragmentLogoutButton, {
        dict: dict
      }).done(function () {
        amiWebApp.triggerLogin().then(function () {
          result.resolve();
        }, function (message) {
          result.reject(message);
        });
      });
    } else {
      amiWebApp.replaceHTML('#ami_login_menu_content', this.fragmentLoginButton, {
        dict: dict
      }).done(function () {
        amiWebApp.triggerLogout().then(function () {
          result.resolve();
        }, function (message) {
          result.reject(message);
        });
      });
    }

    return result.promise();
  },
  getUserInfo: function getUserInfo() {
    return this.userInfo;
  },
  getRoleInfo: function getRoleInfo() {
    return this.roleInfo;
  },
  getUPDInfo: function getUPDInfo() {
    return this.udpInfo;
  },
  getSSOInfo: function getSSOInfo() {
    return this.ssoInfo;
  },
  getUser: function getUser() {
    return this.user;
  },
  getGuest: function getGuest() {
    return this.guest;
  },
  getClientDN: function getClientDN() {
    return this.clientDN;
  },
  getIssuerDN: function getIssuerDN() {
    return this.issuerDN;
  },
  isAuthenticated: function isAuthenticated() {
    return this.user !== this.guest;
  },
  hasRole: function hasRole(roleName) {
    return roleName in this.roleInfo;
  },
  sso: function sso() {
    this._clean();

    window.open(this.ssoInfo.url, 'Single Sign-On', 'menubar=no, status=no, scrollbars=no, width=800, height=450');
  },
  signIn: function signIn() {
    this._clean();

    $('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('show');
  },
  changeInfo: function changeInfo() {
    this._clean();

    $('#D9EAF998_ED8E_44D2_A0BE_8C5CF5E438BD').modal('show');
  },
  changePass: function changePass() {
    this._clean();

    $('#E92A1097_983B_4857_875F_07E4659B41B0').modal('show');
  },
  accountStatus: function accountStatus() {
    this._clean();

    $('#AB1CB183_96EB_4116_8A9E_4409BE058F34').modal('show');
  },
  signOut: function signOut() {
    var _this18 = this;

    amiWebApp.lock();
    return amiCommand.logout().always(function (data, message, userInfo, roleInfo, udpInfo, ssoInfo) {
      _this18._update(userInfo, roleInfo, udpInfo, ssoInfo).then(function () {
        _this18._unlock();
      }, function (message) {
        _this18._error(message);
      });
    });
  },
  form_login: function form_login(e) {
    e.preventDefault();
    var values = $(e.target).serializeObject();
    return this.form_login2(values['user'], values['pass']);
  },
  form_login2: function form_login2(user, pass) {
    var _this19 = this;

    var promise = user && pass ? amiCommand.passLogin(user.trim(), pass.trim()) : amiCommand.certLogin();
    amiWebApp.lock();
    promise.then(function (data, message, userInfo, roleInfo, udpInfo, ssoInfo) {
      _this19._update(userInfo, roleInfo, udpInfo, ssoInfo).then(function () {
        if (userInfo.AMIUser !== userInfo.guestUser) {
          $('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('hide');

          _this19._unlock();
        }
      }, function (message) {
        if (userInfo.AMIUser !== userInfo.guestUser) {
          $('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('hide');

          _this19._error(message);
        }
      });

      if (userInfo.AMIUser === userInfo.guestUser) {
        var _message = 'Authentication failed.';

        if (userInfo.clientDNInSession || userInfo.issuerDNInSession) {
          _message += ' Client DN in session: ' + amiWebApp.textToHtml(userInfo.clientDNInSession) + '.' + ' Issuer DN in session: ' + amiWebApp.textToHtml(userInfo.issuerDNInSession) + '.';
        }

        _this19._error(_message);
      }
    }, function (data, message, userInfo, roleInfo, udpInfo, ssoInfo) {
      _this19._update(userInfo, roleInfo, udpInfo, ssoInfo).always(function () {
        _this19._error(message);
      });
    });
  },
  form_attachCert: function form_attachCert() {
    var _this20 = this;

    var user = $('#E64F24B2_33E6_4DED_9B24_28BE04219613').val();
    var pass = $('#A4DFD039_034F_4D10_9668_385AEF4FBBB9').val();

    if (!user || !pass) {
      this._error('Please, fill all fields with a red star.');

      return;
    }

    amiWebApp.lock();
    amiCommand.attachCert(user, pass).then(function (data, message) {
      _this20._success(message);
    }, function (data, message) {
      _this20._error(message);
    });
  },
  form_detachCert: function form_detachCert() {
    var _this21 = this;

    var user = $('#E64F24B2_33E6_4DED_9B24_28BE04219613').val();
    var pass = $('#A4DFD039_034F_4D10_9668_385AEF4FBBB9').val();

    if (!user || !pass) {
      this._error('Please, fill all fields with a red star.');

      return;
    }

    amiWebApp.lock();
    amiCommand.detachCert(user, pass).then(function (data, message) {
      _this21._success(message);
    }, function (data, message) {
      _this21._error(message);
    });
  },
  form_addUser: function form_addUser(e) {
    var _this22 = this;

    e.preventDefault();
    var values = $(e.target).serializeObject();
    amiWebApp.lock();
    amiCommand.addUser(values['login'], values['pass'], values['first_name'], values['last_name'], values['email'], 'attach' in values, 'agree' in values).then(function (data, message) {
      _this22._success(message);
    }, function (data, message) {
      _this22._error(message);
    });
  },
  form_remindPass: function form_remindPass(e) {
    var _this23 = this;

    e.preventDefault();
    var values = $(e.target).serializeObject();
    amiWebApp.lock();
    amiCommand.resetPass(values['user']).then(function (data, message) {
      _this23._success(message);
    }, function (data, message) {
      _this23._error(message);
    });
  },
  form_changeInfo: function form_changeInfo(e) {
    var _this24 = this;

    e.preventDefault();
    var values = $(e.target).serializeObject();
    amiWebApp.lock();
    amiCommand.changeInfo(values['first_name'], values['last_name'], values['email']).then(function (data, message) {
      _this24._success(message);
    }, function (data, message) {
      _this24._error(message);
    });
  },
  form_changePass: function form_changePass(e) {
    var _this25 = this;

    e.preventDefault();
    var values = $(e.target).serializeObject();
    amiWebApp.lock();
    amiCommand.changePass(this.user, values['old_pass'], values['new_pass']).then(function (data, message) {
      _this25._success(message);
    }, function (data, message) {
      _this25._error(message);
    });
  }
});
/*!
 * AMI Web Framework - AMIDoc.js
 *
 * Copyright (c) 2014-2020 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

var amiDoc = {
  "functions": [{
    "name": "$AMINamespace",
    "desc": "Create a new namespace",
    "params": [{
      "name": "$name",
      "type": "String",
      "desc": "the namespace name",
      "default": "",
      "optional": "",
      "nullable": ""
    }, {
      "name": "$descr",
      "type": "Object",
      "desc": "the namespace body",
      "default": "",
      "optional": true,
      "nullable": ""
    }]
  }, {
    "name": "$AMIInterface",
    "desc": "Create a new interface",
    "params": [{
      "name": "$name",
      "type": "String",
      "desc": "the interface name",
      "default": "",
      "optional": "",
      "nullable": ""
    }, {
      "name": "$descr",
      "type": "Object",
      "desc": "the interface body",
      "default": "",
      "optional": true,
      "nullable": ""
    }]
  }, {
    "name": "$AMIClass",
    "desc": "Create a new class",
    "params": [{
      "name": "$name",
      "type": "String",
      "desc": "the class name",
      "default": "",
      "optional": "",
      "nullable": ""
    }, {
      "name": "$descr",
      "type": "Object",
      "desc": "the class body",
      "default": "",
      "optional": true,
      "nullable": ""
    }]
  }],
  "namespaces": [{
    "name": "amiRouter",
    "desc": "The AMI url routing subsystem",
    "functions": [{
      "name": "getScriptURL",
      "desc": "Gets the AWF's script URL",
      "params": [],
      "returns": [{
        "type": "String",
        "desc": "The AWF's script URL"
      }]
    }, {
      "name": "getOriginURL",
      "desc": "Gets the origin URL",
      "params": [],
      "returns": [{
        "type": "String",
        "desc": "The origin URL"
      }]
    }, {
      "name": "getWebAppURL",
      "desc": "Gets the webapp URL",
      "params": [],
      "returns": [{
        "type": "String",
        "desc": "The webapp URL"
      }]
    }, {
      "name": "getHash",
      "desc": "Gets the anchor part of the webapp URL",
      "params": [],
      "returns": [{
        "type": "String",
        "desc": "The anchor part of the webapp URL"
      }]
    }, {
      "name": "getArgs",
      "desc": "Gets the arguments extracted from the webapp URL",
      "params": [],
      "returns": [{
        "type": "Array.<String>",
        "desc": "The arguments extracted from the webapp URL"
      }]
    }, {
      "name": "append",
      "desc": "Appends a routing rule",
      "params": [{
        "name": "regExp",
        "type": "String",
        "desc": "the regExp",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "handler",
        "type": "Object",
        "desc": "the handler",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": "Namespace",
        "desc": "The amiRouter singleton"
      }]
    }, {
      "name": "remove",
      "desc": "Removes some routing rules",
      "params": [{
        "name": "regExp",
        "type": "String",
        "desc": "the regExp",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": "Namespace",
        "desc": "The amiRouter singleton"
      }]
    }, {
      "name": "check",
      "desc": "Checks whether the URL matches with a routing rule",
      "params": [],
      "returns": [{
        "type": "Boolean",
        "desc": ""
      }]
    }, {
      "name": "appendHistoryEntry",
      "desc": "Append a new history entry",
      "params": [{
        "name": "path",
        "type": "String",
        "desc": "the new path",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "context",
        "type": "Object",
        "desc": "the new context",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "Boolean",
        "desc": ""
      }]
    }, {
      "name": "replaceHistoryEntry",
      "desc": "Replace the current history entry",
      "params": [{
        "name": "path",
        "type": "String",
        "desc": "the new path",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "context",
        "type": "Object",
        "desc": "the new context",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "Boolean",
        "desc": ""
      }]
    }]
  }, {
    "name": "amiWebApp",
    "desc": "The AMI webapp subsystem",
    "variables": [{
      "name": "originURL",
      "type": "String",
      "desc": "The origin URL"
    }, {
      "name": "webAppURL",
      "type": "String",
      "desc": "The webapp URL"
    }, {
      "name": "hash",
      "type": "String",
      "desc": "The anchor part of the webapp URL"
    }, {
      "name": "args",
      "type": "Array.<String>",
      "desc": "The arguments extracted from the webapp URL"
    }],
    "functions": [{
      "name": "isEmbedded",
      "desc": "Checks whether the WebApp is executed in embedded mode",
      "params": [],
      "returns": [{
        "type": "Boolean",
        "desc": ""
      }]
    }, {
      "name": "isLocal",
      "desc": "Checks whether the WebApp is executed locally (file://, localhost, 127.0.0.1 or ::1)",
      "params": [],
      "returns": [{
        "type": "Boolean",
        "desc": ""
      }]
    }, {
      "name": "textToHtml",
      "desc": "Escapes the given string from text to HTML",
      "params": [{
        "name": "string",
        "type": "String",
        "desc": "the unescaped string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": "String",
        "desc": "The escaped string"
      }]
    }, {
      "name": "htmlToText",
      "desc": "Unescapes the given string from HTML to text",
      "params": [{
        "name": "string",
        "type": "String",
        "desc": "the escaped string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": "String",
        "desc": "The unescaped string"
      }]
    }, {
      "name": "textToString",
      "desc": "Escapes the given string from text to JavaScript string",
      "params": [{
        "name": "string",
        "type": "String",
        "desc": "the unescaped string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": "String",
        "desc": "The escaped string"
      }]
    }, {
      "name": "stringToText",
      "desc": "Unescapes the given string from JavaScript string to text",
      "params": [{
        "name": "string",
        "type": "String",
        "desc": "the escaped string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": "String",
        "desc": "The unescaped string"
      }]
    }, {
      "name": "htmlToString",
      "desc": "Escapes the given string from HTML to JavaScript string",
      "params": [{
        "name": "string",
        "type": "String",
        "desc": "the unescaped string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": "String",
        "desc": "The escaped string"
      }]
    }, {
      "name": "stringToHtml",
      "desc": "Unescapes the given string from JavaScript string to HTML",
      "params": [{
        "name": "string",
        "type": "String",
        "desc": "the escaped string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": "String",
        "desc": "The unescaped string"
      }]
    }, {
      "name": "textToSQL",
      "desc": "Escapes the given string from text to SQL",
      "params": [{
        "name": "string",
        "type": "String",
        "desc": "the unescaped string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": "String",
        "desc": "The escaped string"
      }]
    }, {
      "name": "sqlToText",
      "desc": "Unescapes the given string from SQL to text",
      "params": [{
        "name": "string",
        "type": "String",
        "desc": "the escaped string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": "String",
        "desc": "The unescaped string"
      }]
    }, {
      "name": "base64Encode",
      "desc": "Encodes (RFC 4648) a string",
      "params": [{
        "name": "string",
        "type": "String",
        "desc": "the decoded string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": "String",
        "desc": "The encoded string"
      }]
    }, {
      "name": "base64Decode",
      "desc": "Decodes (RFC 4648) a string",
      "params": [{
        "name": "string",
        "type": "String",
        "desc": "the encoded string",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": "String",
        "desc": "The decoded string"
      }]
    }, {
      "name": "loadResources",
      "desc": "Asynchronously loads resources by extension",
      "params": [{
        "name": "urls",
        "type": ["Array", "String"],
        "desc": "the array of urls",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "loadSheets",
      "desc": "Asynchronously loads CSS sheets",
      "params": [{
        "name": "urls",
        "type": ["Array", "String"],
        "desc": "the array of urls",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "loadScripts",
      "desc": "Asynchronously loads JS scripts",
      "params": [{
        "name": "urls",
        "type": ["Array", "String"],
        "desc": "the array of urls",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "loadJSONs",
      "desc": "Asynchronously loads JSON files",
      "params": [{
        "name": "urls",
        "type": ["Array", "String"],
        "desc": "the array of urls",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "loadXMLs",
      "desc": "Asynchronously loads XML files",
      "params": [{
        "name": "urls",
        "type": ["Array", "String"],
        "desc": "the array of urls",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "loadHTMLs",
      "desc": "Asynchronously loads HTML files",
      "params": [{
        "name": "urls",
        "type": ["Array", "String"],
        "desc": "the array of urls",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "loadTWIGs",
      "desc": "Asynchronously loads TWIG files",
      "params": [{
        "name": "urls",
        "type": ["Array", "String"],
        "desc": "the array of urls",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "loadTexts",
      "desc": "Asynchronously loads text files",
      "params": [{
        "name": "urls",
        "type": ["Array", "String"],
        "desc": "the array of urls",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "replaceHTML",
      "desc": "Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}",
      "params": [{
        "name": "selector",
        "type": "String",
        "desc": "the target selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "twig",
        "type": "String",
        "desc": "the TWIG fragment",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context, suffix, dict, twigs)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "prependHTML",
      "desc": "Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}",
      "params": [{
        "name": "selector",
        "type": "String",
        "desc": "the target selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "twig",
        "type": "String",
        "desc": "the TWIG fragment",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context, suffix, dict, twigs)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "appendHTML",
      "desc": "Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}",
      "params": [{
        "name": "selector",
        "type": "String",
        "desc": "the target selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "twig",
        "type": "String",
        "desc": "the TWIG fragment",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context, suffix, dict, twigs)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "formatTWIG",
      "desc": "Interpretes the given TWIG string, see {@link http://twig.sensiolabs.org/documentation}",
      "params": [{
        "name": "twig",
        "type": "String",
        "desc": "the TWIG string",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "dict",
        "type": ["Object", "Array"],
        "desc": "the dictionary",
        "default": "",
        "optional": true,
        "nullable": ""
      }, {
        "name": "twigs",
        "type": "Object",
        "desc": "dictionary of fragments",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "String",
        "desc": "The Interpreted TWIG string"
      }]
    }, {
      "name": "jspath",
      "desc": "Finds data within the given JSON, see {@link https://github.com/dfilatov/jspath}",
      "params": [{
        "name": "path",
        "type": "String",
        "desc": "the path",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "json",
        "type": "Object",
        "desc": "the JSON",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": "Array",
        "desc": "The resulting array"
      }]
    }, {
      "name": "lock",
      "desc": "Locks the Web application",
      "params": []
    }, {
      "name": "unlock",
      "desc": "Unlocks the Web application",
      "params": []
    }, {
      "name": "modalLeave",
      "desc": "Leave the modal window",
      "params": []
    }, {
      "name": "modalEnter",
      "desc": "Enter the modal window",
      "params": []
    }, {
      "name": "canLeave",
      "desc": "Enables the message in a confirmation dialog box to inform that the user is about to leave the current page.",
      "params": []
    }, {
      "name": "cannotLeave",
      "desc": "Disables the message in a confirmation dialog box to inform that the user is about to leave the current page.",
      "params": []
    }, {
      "name": "info",
      "desc": "Shows an 'info' message",
      "params": [{
        "name": "message",
        "type": ["String", "Array"],
        "desc": "the message",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "fadeOut",
        "type": "Boolean",
        "desc": "if True, the message disappears after 60s",
        "default": "",
        "optional": true,
        "nullable": ""
      }]
    }, {
      "name": "success",
      "desc": "Shows a 'success' message",
      "params": [{
        "name": "message",
        "type": ["String", "Array"],
        "desc": "the message",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "fadeOut",
        "type": "Boolean",
        "desc": "if True, the message disappears after 60s",
        "default": "",
        "optional": true,
        "nullable": ""
      }]
    }, {
      "name": "warning",
      "desc": "Shows a 'warning' message",
      "params": [{
        "name": "message",
        "type": ["String", "Array"],
        "desc": "the message",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "fadeOut",
        "type": "Boolean",
        "desc": "if True, the message disappears after 60s",
        "default": "",
        "optional": true,
        "nullable": ""
      }]
    }, {
      "name": "error",
      "desc": "Shows an 'error' message",
      "params": [{
        "name": "message",
        "type": ["String", "Array"],
        "desc": "the message",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "fadeOut",
        "type": "Boolean",
        "desc": "if True, the message disappears after 60s",
        "default": "",
        "optional": true,
        "nullable": ""
      }]
    }, {
      "name": "flush",
      "desc": "Flushes messages",
      "params": []
    }, {
      "name": "fillBreadcrumb",
      "desc": "Fill the main breadcrumb",
      "params": [{
        "name": "items",
        "type": "Array",
        "desc": "the array of items (HTML format)",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }, {
      "name": "start",
      "desc": "Starts the Web application",
      "params": [{
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (logo_url, home_url, contact_email, about_url, theme_url, locker_url, password_authentication_allowed, certificate_authentication_allowed, create_account_allowed, change_info_allowed, change_password_allowed, change_certificate_allowed)",
        "default": "",
        "optional": true,
        "nullable": ""
      }]
    }, {
      "name": "loadControl",
      "desc": "Asynchronously loads a control",
      "params": [{
        "name": "control",
        "type": "String",
        "desc": "the array of control name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "createControl",
      "desc": "Asynchronously create a control",
      "params": [{
        "name": "parent",
        "type": "Object",
        "desc": "???",
        "default": "",
        "optional": true,
        "nullable": ""
      }, {
        "name": "owner",
        "type": "Object",
        "desc": "???",
        "default": "",
        "optional": true,
        "nullable": ""
      }, {
        "name": "control",
        "type": "String",
        "desc": "???",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "params",
        "type": "Array",
        "desc": "???",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "createControlInBody",
      "desc": "Asynchronously create a control in the body",
      "params": [{
        "name": "parent",
        "type": "Object",
        "desc": "???",
        "default": "",
        "optional": true,
        "nullable": ""
      }, {
        "name": "owner",
        "type": "Object",
        "desc": "???",
        "default": "",
        "optional": true,
        "nullable": ""
      }, {
        "name": "control",
        "type": "String",
        "desc": "???",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "paramsWithoutSettings",
        "type": "Array",
        "desc": "???",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "controlSettings",
        "type": "Object",
        "desc": "???",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "parentSettings",
        "type": "Object",
        "desc": "???",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "createControlInContainer",
      "desc": "Asynchronously create a control in a container",
      "params": [{
        "name": "parent",
        "type": "Object",
        "desc": "???",
        "default": "",
        "optional": true,
        "nullable": ""
      }, {
        "name": "owner",
        "type": "Object",
        "desc": "???",
        "default": "",
        "optional": true,
        "nullable": ""
      }, {
        "name": "control",
        "type": "String",
        "desc": "???",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "paramsWithoutSettings",
        "type": "Array",
        "desc": "???",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "controlSettings",
        "type": "Object",
        "desc": "???",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "parentSettings",
        "type": "Object",
        "desc": "???",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "icon",
        "type": "String",
        "desc": "???",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "title",
        "type": "String",
        "desc": "???",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "createControlFromWebLink",
      "desc": "Asynchronously create a control in a container from a WEB link",
      "params": [{
        "name": "parent",
        "type": "Object",
        "desc": "???",
        "default": "",
        "optional": true,
        "nullable": ""
      }, {
        "name": "owner",
        "type": "Object",
        "desc": "???",
        "default": "",
        "optional": true,
        "nullable": ""
      }, {
        "name": "el",
        "type": "String",
        "desc": "???",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "parentSettings",
        "type": "Object",
        "desc": "???",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "loadSubApp",
      "desc": "Asynchronously loads a subapp",
      "params": [{
        "name": "subapp",
        "type": "String",
        "desc": "the subapp",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "userdata",
        "type": "?",
        "desc": "the user data",
        "default": "",
        "optional": true,
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "loadSubAppByURL",
      "desc": "Loads a subapp by URL",
      "params": [{
        "name": "defaultSubApp",
        "type": "String",
        "desc": "if 'amiWebApp.args[\"subapp\"]' is null, the default subapp",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "defaultUserData",
        "type": "?",
        "desc": "if 'amiWebApp.args[\"userdata\"]' is null, the default user data",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }],
    "events": [{
      "name": "onReady",
      "desc": "This method must be overloaded and is called when the Web application starts",
      "params": [{
        "name": "userData",
        "type": "String",
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
        "type": "Boolean",
        "desc": "",
        "default": "",
        "optional": "",
        "nullable": ""
      }]
    }]
  }, {
    "name": "amiCommand",
    "desc": "The AMI command subsystem",
    "variables": [{
      "name": "endpoint",
      "type": "String",
      "desc": "Default endpoint"
    }, {
      "name": "converter",
      "type": "String",
      "desc": "Default converter"
    }],
    "functions": [{
      "name": "execute",
      "desc": "Executes an AMI command",
      "params": [{
        "name": "command",
        "type": "String",
        "desc": "the command",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context, endpoint, converter, timeout, extraParam, extraValue)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "passLogin",
      "desc": "Logs in by login/password",
      "params": [{
        "name": "user",
        "type": "String",
        "desc": "the user",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "pass",
        "type": "String",
        "desc": "the password",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "certLogin",
      "desc": "Logs in by certificate",
      "params": [{
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "logout",
      "desc": "Logs out",
      "params": [{
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "attachCert",
      "desc": "Attaches a certificate",
      "params": [{
        "name": "user",
        "type": "String",
        "desc": "the user",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "pass",
        "type": "String",
        "desc": "the password",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "detachCert",
      "desc": "Detaches a certificate",
      "params": [{
        "name": "user",
        "type": "String",
        "desc": "the user",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "pass",
        "type": "String",
        "desc": "the password",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "addUser",
      "desc": "Adds a new user",
      "params": [{
        "name": "user",
        "type": "String",
        "desc": "the user",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "pass",
        "type": "String",
        "desc": "the password",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "firstName",
        "type": "String",
        "desc": "the first name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "lastName",
        "type": "String",
        "desc": "the last name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "email",
        "type": "String",
        "desc": "the email",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "attach",
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
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
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
        "type": "String",
        "desc": "the first name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "lastName",
        "type": "String",
        "desc": "the last name",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "email",
        "type": "String",
        "desc": "the email",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "changePass",
      "desc": "Changes the account password",
      "params": [{
        "name": "user",
        "type": "String",
        "desc": "the user",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "oldPass",
        "type": "String",
        "desc": "the old password",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "newPass",
        "type": "String",
        "desc": "the new password",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "resetPass",
      "desc": "Resets the account password",
      "params": [{
        "name": "user",
        "type": "String",
        "desc": "the user",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }]
  }, {
    "name": "amiLogin",
    "desc": "The AMI authentication subsystem",
    "functions": [{
      "name": "getUserInfo",
      "desc": "Gets the user information",
      "params": [],
      "returns": [{
        "type": "String",
        "desc": "The current user information"
      }]
    }, {
      "name": "getRoleInfo",
      "desc": "Gets the role information",
      "params": [],
      "returns": [{
        "type": "String",
        "desc": "The current role information"
      }]
    }, {
      "name": "getUPDInfo",
      "desc": "Gets the user data protection information",
      "params": [],
      "returns": [{
        "type": "String",
        "desc": "The current user data protection information"
      }]
    }, {
      "name": "getSSOInfo",
      "desc": "Gets the single sign on information",
      "params": [],
      "returns": [{
        "type": "String",
        "desc": "The current single sign on information"
      }]
    }, {
      "name": "getUser",
      "desc": "Gets the current user",
      "params": [],
      "returns": [{
        "type": "String",
        "desc": "The current user"
      }]
    }, {
      "name": "getGuest",
      "desc": "Gets the guest user",
      "params": [],
      "returns": [{
        "type": "String",
        "desc": "The guest user"
      }]
    }, {
      "name": "getClientDN",
      "desc": "Gets the client DN",
      "params": [],
      "returns": [{
        "type": "String",
        "desc": "The client DN"
      }]
    }, {
      "name": "getIssuerDN",
      "desc": "Gets the issuer DN",
      "params": [],
      "returns": [{
        "type": "String",
        "desc": "The issuer DN"
      }]
    }, {
      "name": "isAuthenticated",
      "desc": "Checks whether the user is authenticated",
      "params": [],
      "returns": [{
        "type": "Boolean",
        "desc": ""
      }]
    }, {
      "name": "hasRole",
      "desc": "Checks whether the user has the given role",
      "params": [{
        "name": "role",
        "type": "String",
        "desc": "the role",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": "Boolean",
        "desc": ""
      }]
    }, {
      "name": "sso",
      "desc": "Opens the 'SSO' modal window",
      "params": []
    }, {
      "name": "signIn",
      "desc": "Opens the 'SignIn' modal window",
      "params": []
    }, {
      "name": "changeInfo",
      "desc": "Opens the 'Change Info' modal window",
      "params": []
    }, {
      "name": "changePass",
      "desc": "Opens the 'Change Password' modal window",
      "params": []
    }, {
      "name": "accountStatus",
      "desc": "Opens the 'Account Status' modal window",
      "params": []
    }, {
      "name": "signOut",
      "desc": "Signs out",
      "params": []
    }]
  }],
  "interfaces": [{
    "name": "ami.IControl",
    "desc": "The AMI control interface",
    "implements": [],
    "inherits": [],
    "functions": [{
      "name": "patchId",
      "desc": "Patches an HTML identifier",
      "params": [{
        "name": "id",
        "type": "String",
        "desc": "the unpatched HTML identifier",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": "String",
        "desc": "The patched HTML identifier"
      }]
    }, {
      "name": "replaceHTML",
      "desc": "Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}",
      "params": [{
        "name": "selector",
        "type": "String",
        "desc": "the target selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "twig",
        "type": "String",
        "desc": "the TWIG fragment",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context, dict)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "prependHTML",
      "desc": "Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}",
      "params": [{
        "name": "selector",
        "type": "String",
        "desc": "the target selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "twig",
        "type": "String",
        "desc": "the TWIG fragment",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context, dict)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "appendHTML",
      "desc": "Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}",
      "params": [{
        "name": "selector",
        "type": "String",
        "desc": "the target selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "twig",
        "type": "String",
        "desc": "the TWIG fragment",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context, dict)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "onReady",
      "desc": "Called when the control is ready to run",
      "params": []
    }, {
      "name": "onRemove",
      "desc": "Called when the control is removed",
      "params": []
    }]
  }, {
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
  "classes": [{
    "name": "ami.Control",
    "desc": "The basic AMI control",
    "implements": ["ami.IControl"],
    "inherits": [],
    "konstructor": {
      "name": "Control",
      "params": []
    },
    "functions": [{
      "name": "patchId",
      "desc": "Patches an HTML identifier",
      "params": [{
        "name": "id",
        "type": "String",
        "desc": "the unpatched HTML identifier",
        "default": "",
        "optional": "",
        "nullable": ""
      }],
      "returns": [{
        "type": "String",
        "desc": "The patched HTML identifier"
      }]
    }, {
      "name": "replaceHTML",
      "desc": "Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}",
      "params": [{
        "name": "selector",
        "type": "String",
        "desc": "the target selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "twig",
        "type": "String",
        "desc": "the TWIG fragment",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context, dict)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "prependHTML",
      "desc": "Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}",
      "params": [{
        "name": "selector",
        "type": "String",
        "desc": "the target selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "twig",
        "type": "String",
        "desc": "the TWIG fragment",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context, dict)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "appendHTML",
      "desc": "Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}",
      "params": [{
        "name": "selector",
        "type": "String",
        "desc": "the target selector",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "twig",
        "type": "String",
        "desc": "the TWIG fragment",
        "default": "",
        "optional": "",
        "nullable": ""
      }, {
        "name": "settings",
        "type": "Object",
        "desc": "dictionary of settings (context, dict)",
        "default": "",
        "optional": true,
        "nullable": ""
      }],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
      }]
    }, {
      "name": "onReady",
      "desc": "Called when the control is ready to run",
      "params": []
    }, {
      "name": "onRemove",
      "desc": "Called when the control is removed",
      "params": []
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
  }]
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFNSS9zcmMvbWFpbi5qcyIsIkFNSS9zcmMvdG9rZW5pemVyLmpzIiwiQU1JL3NyYy9leHByZXNzaW9uX2NvbXBpbGVyLmpzIiwiQU1JL3NyYy90ZW1wbGF0ZV9jb21waWxlci5qcyIsIkFNSS9zcmMvZW5naW5lLmpzIiwiQU1JL3NyYy9jYWNoZS5qcyIsIkFNSS9zcmMvc3RkbGliLmpzIiwiQU1JL3NyYy9pbnRlcnByZXRlci5qcyIsIkFNSS9leHRlcm5hbC9qc3BhdGguanMiLCJBTUkvQU1JRXh0ZW5zaW9uLmpzIiwiQU1JL0FNSU9iamVjdC5qcyIsIkFNSS9BTUlSb3V0ZXIuanMiLCJBTUkvQU1JV2ViQXBwLmpzIiwiQU1JL0FNSUludGVyZmFjZS5qcyIsIkFNSS9BTUlDb21tYW5kLmpzIiwiQU1JL0FNSUxvZ2luLmpzIiwiQU1JL0FNSURvYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQSxJQUFBLE9BQUEsR0FBQTtBQUNBLEVBQUEsT0FBQSxFQUFBO0FBREEsQ0FBQTs7QUFRQSxJQUFBLE9BQUEsT0FBQSxLQUFBLFdBQUEsRUFDQTtBQUNBLEVBQUEsT0FBRyxDQUFNLEVBQVQsR0FBVSxPQUFXLENBQUMsSUFBRCxDQUFyQjtBQUVDLEVBQUEsTUFBQSxDQUFPLE9BQVAsQ0FBYSxPQUFiLEdBQXdCLE9BQXhCO0FBQ0Q7O0FDeEJBLE9BQUEsQ0FBQSxTQUFBLEdBQUE7QUFHQyxFQUFBLFFBQUEsRUFBQSxrQkFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsRUFDRDtBQUNDLFFBQUEsU0FBVSxDQUFBLE1BQVYsS0FBeUIsVUFBTSxDQUFBLE1BQS9CLEVBQ0M7QUFDQSxZQUFHLHlDQUFIO0FBQ0M7O0FBRUQsUUFBQyxhQUFBLEdBQUEsRUFBRDtBQUNGLFFBQUEsWUFBQSxHQUFBLEVBQUE7QUFDRSxRQUFNLFlBQUEsR0FBZSxFQUFyQjtBQUVBLFFBQUEsQ0FB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QWxFUjtBQW1FQyxFQUFBLE1BQUksRUFBSSxHQW5FVDtBQW9FQyxFQUFBLElBQUEsRUFBTSxHQXBFUDtBQXFFQyxFQUFBLEtBQUEsRUFBTyxHQXJFUjtBQXNFQyxFQUFBLEtBQUssRUFBQyxHQXRFUDtBQXVFQyxFQUFBLEdBQUEsRUFBSyxHQXZFTjtBQXdFQyxFQUFBLEtBQUssRUFBRSxHQXhFUjtBQXlFQyxFQUFBLEdBQUcsRUFBRSxHQXpFTjtBQTBFQyxFQUFBLEdBQUEsRUFBSyxHQTFFTjtBQTJFQyxFQUFBLGVBQVMsRUFBQSxHQTNFVjtBQTRFQyxFQUFBLFFBQVMsRUFBQSxHQTVFVjtBQTZFQSxFQUFBLEtBQUUsRUFBQSxHQTdFRjtBQThFQSxFQUFBLEdBQUUsRUFBQSxHQTlFRjtBQStFQyxFQUFBLEtBQUssRUFBRSxHQS9FUjtBQWdGQyxFQUFBLElBQUksRUFBQyxHQWhGTjtBQWlGQyxFQUFBLEVBQUEsRUFBQSxHQWpGRDtBQWtGQyxFQUFBLEVBQUEsRUFBSSxHQWxGTDtBQW1GQyxFQUFBLEdBQUcsRUFBQyxHQW5GTDtBQW9GQyxFQUFBLEdBQUcsRUFBQyxHQXBGTDtBQXFGQyxFQUFBLEdBQUcsRUFBRSxHQXJGTjtBQXNGQyxFQUFBLEdBQUcsRUFBRSxHQXRGTjtBQXVGQyxFQUFBLEdBQUcsRUFBRSxHQXZGTjtBQXdGQyxFQUFBLFFBQVEsRUFBQyxHQXhGVjtBQThGQyxFQUFBLEdBQUEsRUFBQSxHQTlGRDtBQStGQSxFQUFBLEdBQUEsRUFBQSxHQS9GQTtBQWdHQyxFQUFBLEdBQUcsRUFBRSxHQWhHTjtBQWlHQyxFQUFBLEdBQUcsRUFBRTtBQWpHTixDQUFBO0FBd0dBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEtBQUE7O0FBTUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxTQUFBLEdBQUEsVUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO0FBR0MsT0FBQSxPQUFBLEdBQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLENBQUE7QUFJQSxPQUFBLFVBQUEsR0FBQSxD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QSxTQUFBLEVBQUEseUJBQUEsRUFBQTtBQUNhLElBQUEsRUFBTSxDQUFnQixHQUF0QixDQUF5QixTQUF6QixFQUFxQyx5QkFBeUIsRUFBOUQ7QUFFYixHQUxBLEVBS0EsRUFMQSxDQUFBO0FBTUMsQ0FWRDs7QUNuS0EsU0FBQSxpQkFBQSxDQUFBLEtBQUEsRUFBQSxDQUFBLEVBQ0E7QUFDQyxNQUFBLE1BQUEsR0FBQSxNQUFBO0FBRUQsTUFBQSxLQUFBLEdBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxXQUFBLENBQUE7QUFBQSxNQUFBLENBQUEsR0FBQSxLQUFBLENBQUEsTUFBQSxHQUFBLENBQUE7O0FBRUEsT0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsRUFDQztBQUNDLFFBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUNBO0FBQ0MsTUFBQSxNQUFBLEdBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtBQUNBLEtBSEQsTUFLQTtBQUNDLE1BQUEsTUFBQSxHQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxFQUFBO0FBQ0E7QUFDRDs7QUFFRixFQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBO0FBQ0M7O0FBSUQsU0FBQSxnQkFBQSxDQUFBLEtBQUEsRUFBQSxDQUFBLEVBQ0E7QUFDQyxNQUFBLE1BQUEsR0FBQSxNQUFBO0FBRUQsTUFBQSxLQUFBLEdBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxXQUFBLENBQUE7QUFBQSxNQUFBLENBQUEsR0FBQSxLQUFBLENBQUEsTUFBQSxHQUFBLENBQUE7O0FBRUEsT0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsRUFDQztBQUNDLFFBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUNBO0FBQ0MsTUFBQSxNQUFBLEdBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtBQUNBLEtBSEQsTUFLQTtBQUNDLFlBQUEsTUFBQSxLQUFBLEdBQUEsTUFBQSxHQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxpQkFBQTtBQUNBO0FBQ0Q7O0FBRUYsRUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUNDOztBQVlELFNBQUEsYUFBQSxDQUFBLEtBQUEsRUFBQSxNQUFBLEVBQ0E7QUFDQyxNQUFBLENBQUEsTUFBQSxFQUNBO0FBQ0MsSUFBQSxNQUFBLEdBQUEsRUFBQTtBQUNBOztBQUlGLEVBQUEsTUFBQSxDQUFBLEtBQUEsR0FBQSxLQUFBOztBQUlBLEVBQUEsaUJBQUEsQ0FBQSxLQUFBLEVBQUEsTUFBQSxDQUFBOztBQUlBLE1BQUEsTUFBQSxDQUFBLENBQUEsRUFDQztBQUNDLElBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsTUFBQTtBQUNBO0FBR0Q7O0FBWUQsU0FBQSxhQUFBLENBQUEsS0FBQSxFQUFBLE1BQUEsRUFDQTtBQUNDLE1BQUEsQ0FBQSxNQUFBLEVBQ0E7QUFDQyxJQUFBLE1BQUEsR0FBQSxFQUFBO0FBQ0E7O0FBSUYsTUFBQSxNQUFBLEdBQUEsU0FBQSxNQUFBLEdBQ0M7QUFDQyxVQUFBLGlDQUFBO0FBQ0EsR0FIRjs7QUFPQSxNQUFBLE1BQUEsQ0FBQSxRQUFBLEVBQ0M7QUFDQyxVQUFBLHNDQUFBO0FBQ0E7O0FBRUYsTUFBQSxNQUFBLENBQUEsV0FBQSxFQUNDO0FBQ0MsVUFBQSx5Q0FBQTtBQUNBOztBQUlGLE1BQUEsTUFBQSxDQUFBLENBQUEsRUFDQztBQUNDLFVBQUEsK0JBQUE7QUFDQTs7QUFFRixNQUFBLE1BQUEsQ0FBQSxLQUFBLEVBQ0M7QUFDQyxVQUFBLG1DQUFBO0FBQ0E7O0FBSUYsRUFBQSxNQUFBLENBQUEsS0FBQSxHQUFBLEtBQUE7QUFDQyxFQUFBLE1BQU0sQ0FBQSxNQUFOLEdBQWdCLE1BQWhCO0FBQ0EsRUFBQSxNQUFNLENBQUEsUUFBTixHQUFpQixNQUFqQjs7QUFJRCxFQUFBLGdCQUFBLENBQUEsS0FBQSxFQUFBLE1BQUEsQ0FBQTtBQUdDOztBQVlELFNBQUEsU0FBQSxDQUFBLEtBQUEsRUFBQSxNQUFBLEVBQ0E7QUFDQyxNQUFBLENBQUEsTUFBQSxFQUNBO0FBQ0MsSUFBQSxNQUFBLEdBQUEsRUFBQTtBQUNBOztBQUlGLE1BQUEsTUFBQSxHQUFBLE1BQUEsQ0FBQSxRQUFBLFlBQUEsUUFBQSxHQUFBLE1BQUEsQ0FBQSxRQUFBLENBQUEsU0FBQSxHQUFBLEVBQUE7QUFFQSxNQUFBLGlCQUFBLEdBQUEsTUFBQSxDQUFBLFdBQUEsWUFBQSxLQUFBLEdBQUEsTUFBQSxDQUFBLFdBQUEsR0FBQSxFQUFBO0FBQ0MsTUFBTSxpQkFBaUIsR0FBRyxNQUFPLENBQUEsV0FBUCxZQUErQixLQUEvQixHQUF3QyxNQUFNLENBQUEsV0FBOUMsR0FBNkQsRUFBdkY7O0FBSUQsTUFBQSxNQUFBLEdBQUEsU0FBQSxNQUFBLEdBQ0M7QUFHRCxTQUFBLElBQUEsQ0FBQSxJQUFBLEtBQUEsV0FBQSxFQUNFO0FBQ0MsVUFBQSxLQUFBLFdBQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQSxDQUFBLEVBQ0E7QUFDQyxjQUFBLFVBQUEsR0FBQSxLQUFBLFdBQUEsQ0FBQSxDQUFBLENBQUE7O0FBRUosZUFBQSxJQUFBLENBQUEsSUFBQSxVQUFBLENBQUEsUUFBQSxFQUNJO0FBQ0MsZ0JBQUEsVUFBQSxDQUFBLFFBQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQSxDQUFBLEVBQ0E7QUFDQyxvQkFBQSxPQUFBLEdBQUEsVUFBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBLENBQUE7O0FBRU4sb0JBQUEsT0FBQSxLQUFBLENBQUEsQ0FBQSxLQUFBLE9BQUEsT0FBQSxFQUNNO0FBQ0Msd0JBQUEsWUFBQSxLQUFBLEtBQUEsR0FBQSx5QkFBQSxHQUFBLFVBQUEsQ0FBQSxLQUFBLEdBQUEsR0FBQSxHQUFBLENBQUEsR0FBQSxHQUFBO0FBQ0E7QUFDRDtBQUNEO0FBQ0Q7QUFDRDs7QUFJSCxRQUFBLE1BQUEsR0FBQSxLQUFBLE1BQUEsQ0FBQSxlQUFBO0FBQ0UsUUFBTSxNQUFNLEdBQUcsS0FBSSxNQUFKLENBQVksZUFBM0I7QUFJRixTQUFBLE1BQUEsR0FBQSxFQUFBOztBQUVBLFNBQUEsSUFBQSxJQUFBLElBQUEsTUFBQSxFQUNFO0FBQ0MsVUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxFQUNBO0FBQ0MsZUFBQSxNQUFBLENBQUEsSUFBQSxJQUFBLFVBQUEsTUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBO0FBQUEsbUJBQUEsWUFBQTtBQUVKLHFCQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLFNBQUEsQ0FBQTtBQUVBLGFBSkk7QUFBQSxXQUFBLENBSUosTUFKSSxFQUlKLElBSkksRUFJSixJQUpJLENBQUE7QUFLQTtBQUNEOztBQUlILFNBQUEsTUFBQSxHQUFBLEVBQUE7O0FBRUEsU0FBQSxJQUFBLEtBQUEsSUFBQSxNQUFBLEVBQ0U7QUFDQyxVQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsS0FBQSxDQUFBLEVBQ0E7QUFDQyxlQUFBLE1BQUEsQ0FBQSxLQUFBLElBQUEsVUFBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLElBQUE7QUFBQSxtQkFBQSxZQUFBO0FBRUoscUJBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsU0FBQSxDQUFBO0FBRUEsYUFKSTtBQUFBLFdBQUEsQ0FJSixNQUpJLEVBSUosS0FKSSxFQUlKLElBSkksQ0FBQTtBQUtBO0FBQ0Q7O0FBSUgsUUFBQSxLQUFBLEtBQUEsRUFDRTtBQUNDLFdBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsU0FBQTtBQUNBO0FBR0QsR0F0RUY7O0FBMEVBLEVBQUEsTUFBQSxDQUFBLGVBQUEsR0FBQSxFQUFBO0FBQ0MsRUFBQSxNQUFNLENBQUMsZUFBUCxHQUF5QixFQUF6Qjs7QUFJRCxPQUFBLElBQUEsSUFBQSxJQUFBLE1BQUEsRUFDQztBQUNDLFFBQUEsSUFBQSxLQUFBLE9BQUEsSUFFRyxJQUFFLENBQUEsTUFBRixDQUFFLENBQUYsTUFBRSxHQUZMLElBSUcsTUFBRSxDQUFBLGNBQUYsQ0FBRSxJQUFGLENBSkgsRUFLRztBQUNGLFFBQUEsTUFBRyxDQUFBLGVBQUgsQ0FBRyxJQUFILElBQUcsTUFBQSxDQUFBLElBQUEsQ0FBSDtBQUVILFFBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxJQUFBLElBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQTtBQUNHO0FBQ0Q7O0FBRUYsT0FBQSxJQUFBLE1BQUEsSUFBQSxNQUFBLEVBQ0M7QUFDQyxRQUFBLE1BQUEsS0FBQSxPQUFBLElBRUcsTUFBRSxDQUFBLE1BQUYsQ0FBRSxDQUFGLE1BQUUsR0FGTCxJQUlHLE1BQUUsQ0FBQSxjQUFGLENBQUUsTUFBRixDQUpILEVBS0c7QUFDRixRQUFBLE1BQUcsQ0FBQSxlQUFILENBQUcsTUFBSCxJQUFHLE1BQUEsQ0FBQSxNQUFBLENBQUg7QUFFSCxRQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsTUFBQSxJQUFBLE1BQUEsQ0FBQSxNQUFBLENBQUE7QUFDRztBQUNEOztBQUlGLEVBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxLQUFBLEdBQUEsS0FBQTtBQUNDLEVBQUEsTUFBTSxDQUFDLFNBQVAsQ0FBZ0IsTUFBaEIsR0FBMEIsTUFBMUI7QUFDQSxFQUFBLE1BQU0sQ0FBQyxTQUFQLENBQWdCLFdBQWhCLEdBQTJCLGlCQUFNLENBQUEsTUFBTixDQUFNLGlCQUFOLENBQTNCOztBQUlELEVBQUEsZ0JBQUEsQ0FBQSxLQUFBLEVBQUEsTUFBQSxDQUFBOztBQUlBLE1BQUEsTUFBQSxDQUFBLENBQUEsRUFDQztBQUNDLElBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsTUFBQTtBQUNBO0FBR0Q7O0FBTUQsSUFBQSxPQUFBLE9BQUEsS0FBQSxXQUFBLEVBQ0E7QUFDQyxFQUFBLE1BQUEsQ0FBQSxPQUFBLENBQUEsU0FBQSxHQUFBLGFBQUE7QUFDQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLENBQWUsU0FBZixHQUEyQixhQUEzQjtBQUNBLEVBQUEsTUFBTSxDQUFDLE9BQVAsQ0FBZSxLQUFmLEdBQTRCLFNBQTVCO0FBQ0E7O0FBTUQsSUFBQSxPQUFBLE1BQUEsS0FBQSxXQUFBLEVBQ0E7QUFDQyxFQUFBLE1BQUEsQ0FBQSxTQUFBLEdBQUEsYUFBQTtBQUNBLEVBQUEsTUFBTSxDQUFDLFNBQVAsR0FBbUIsYUFBbkI7QUFDQSxFQUFBLE1BQU0sQ0FBQyxLQUFQLEdBQW9CLFNBQXBCO0FBQ0E7O0FDdFRELGFBQUEsQ0FBQSxXQUFBLEVBQUE7QUFLQSxFQUFBLFVBQUEsRUFBQSxFQUxBO0FBTUMsRUFBQSxVQUFVLEVBQUUsRUFOYjtBQU9DLEVBQUEsVUFBVSxFQUFFLEVBUGI7QUFTQSxFQUFBLEtBQUEsRUFBQSxFQVRBO0FBVUMsRUFBQSxLQUFLLEVBQUUsRUFWUjtBQWNBLEVBQUEsT0FBQSxFQUFBLEVBZEE7QUFvQkEsRUFBQSxXQUFBLEVBQUEscUJBQUEsR0FBQSxFQUNDO0FBQ0MsSUFBQSxHQUFBLEdBQUEsR0FBQSxDQUFBLElBQUEsRUFBQTs7QUFFRixXQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsQ0FBQSxLQUFBLEdBQUEsRUFDRTtBQUNDLE1BQUEsR0FBQSxHQUFBLEdBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxFQUFBLEdBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBO0FBQ0E7O0FBRUgsV0FBQSxHQUFBO0FBQ0UsR0E5QkY7QUFvQ0EsRUFBQSxDQUFBLEVBQUEsYUFDQztBQUFBOztBQUdELFNBQUEsS0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBO0FBQ0UsU0FBSyxPQUFMLENBQVcsTUFBWCxHQUFzQixDQUF0QjtBQUlGLFFBQUEsSUFBQSxHQUFBLE1BQUEsQ0FBQSxRQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsRUFBQTtBQUNFLFFBQU8sSUFBSSxHQUFJLE1BQU0sQ0FBQyxRQUFQLENBQWlCLElBQWpCLENBQXVCLElBQXZCLEVBQWY7QUFDQSxRQUFLLE1BQU0sR0FBSSxNQUFNLENBQUMsUUFBUCxDQUFnQixNQUFoQixDQUF1QixJQUF2QixFQUFmO0FBSUYsUUFBQSxPQUFBLEdBQUEsUUFBQSxDQUFBLG9CQUFBLENBQUEsUUFBQSxDQUFBOztBQU1BLFNBQUEsSUFBQSxHQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsT0FBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsRUFDRTtBQUNDLE1BQUEsR0FBQSxHQUFBLE9BQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQTs7QUFFSCxVQUFBLEdBQUEsR0FBQSxDQUFBLEVBQ0c7QUFDQyxhQUFBLFVBQUEsR0FBQSxPQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQTtBQUVKLGFBQUEsVUFBQSxHQUFBLEtBQUEsV0FBQSxDQUNJLEtBQUssVUFBTCxDQUFpQixTQUFqQixDQUF1QixDQUF2QixFQUF1QixHQUF2QixDQURKLENBQUE7QUFJQTtBQUNJO0FBQ0Q7O0FBTUgsU0FBQSxVQUFBLEdBQUEsS0FBQSxXQUFBLENBQ0UsSUFBSyxDQUFBLE9BQUwsQ0FBSyxjQUFMLEVBQXVCLEVBQXZCLENBREYsQ0FBQTtBQVFBLFNBQUEsS0FBQSxHQUFBLEtBQUEsV0FBQSxDQUNFLElBQUssQ0FBQSxTQUFMLENBQWEsQ0FBYixFQUFrQixPQUFsQixDQUFrQixPQUFsQixFQUE4QixFQUE5QixDQURGLENBQUE7O0FBUUEsUUFBQSxNQUFBLEVBQ0U7QUFDQyxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxFQUFBLEtBQUEsQ0FBQSxHQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsS0FBQSxFQUFBO0FBRUgsWUFBQSxLQUFBLEdBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUE7O0FBRUEsWUFBQSxLQUFBLENBQUEsTUFBQSxLQUFBLENBQUEsRUFDSTtBQUNDLFVBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxrQkFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLEVBQUE7QUFDQSxTQUhMLE1BSUssSUFBQSxLQUFBLENBQUEsTUFBQSxLQUFBLENBQUEsRUFDRDtBQUNDLFVBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxrQkFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLGtCQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0E7QUFDRCxPQVpEO0FBYUE7QUFHRCxHQS9HRjtBQTBIQSxFQUFBLFlBQUEsRUFBQSx3QkFDQztBQUNDLFdBQUEsS0FBQSxVQUFBO0FBQ0EsR0E3SEY7QUFzSUEsRUFBQSxZQUFBLEVBQUEsd0JBQ0M7QUFDQyxXQUFBLEtBQUEsVUFBQTtBQUNBLEdBeklGO0FBa0pBLEVBQUEsWUFBQSxFQUFBLHdCQUNDO0FBQ0MsV0FBQSxLQUFBLFVBQUE7QUFDQSxHQXJKRjtBQThKQSxFQUFBLE9BQUEsRUFBQSxtQkFDQztBQUNDLFdBQUEsS0FBQSxLQUFBO0FBQ0EsR0FqS0Y7QUEwS0EsRUFBQSxPQUFBLEVBQUEsbUJBQ0M7QUFDQyxXQUFBLEtBQUEsS0FBQTtBQUNBLEdBN0tGO0FBd0xBLEVBQUEsTUFBQSxFQUFBLGdCQUFBLE1BQUEsRUFBQSxPQUFBLEVBQ0M7QUFDQyxTQUFBLE9BQUEsQ0FBQSxPQUFBLENBQUE7QUFDQSxNQUFBLE1BQUssRUFBQSxNQURMO0FBRUMsTUFBQSxPQUFPLEVBQUM7QUFGVCxLQUFBOztBQUtGLFdBQUEsSUFBQTtBQUNFLEdBaE1GO0FBME1BLEVBQUEsTUFBQSxFQUFBLGdCQUFBLE1BQUEsRUFDQztBQUNDLFNBQUEsT0FBQSxHQUFBLEtBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxVQUFBLEtBQUEsRUFBQTtBQUVGLGFBQUEsS0FBQSxDQUFBLE1BQUEsQ0FBQSxRQUFBLE9BQUEsTUFBQSxDQUFBLFFBQUEsRUFBQTtBQUNHLEtBSEQsQ0FBQTtBQUtGLFdBQUEsSUFBQTtBQUNFLEdBbE5GO0FBMk5BLEVBQUEsS0FBQSxFQUFBLGlCQUNDO0FBQ0MsUUFBQSxDQUFBOztBQUVGLFNBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxLQUFBLE9BQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQ0U7QUFDQyxNQUFBLENBQUEsR0FBQSxLQUFBLEtBQUEsQ0FBQSxLQUFBLENBQUEsS0FBQSxPQUFBLENBQUEsQ0FBQSxFQUFBLE1BQUEsQ0FBQTs7QUFFSCxVQUFBLENBQUEsRUFDRztBQUNDLGFBQUEsT0FBQSxDQUFBLENBQUEsRUFBQSxPQUFBLENBQUEsS0FBQSxDQUFBLFNBQUEsRUFBQSxDQUFBOztBQUVKLGVBQUEsSUFBQTtBQUNJO0FBQ0Q7O0FBRUgsV0FBQSxLQUFBO0FBQ0UsR0E1T0Y7QUF1UEEsRUFBQSxrQkFBQSxFQUFBLDRCQUFBLElBQUEsRUFBQSxPQUFBLEVBQ0M7QUFBQSxRQURELE9BQ0M7QUFERCxNQUFBLE9BQ0MsR0FERCxJQUNDO0FBQUE7O0FBQ0MsUUFBQSxPQUFBLENBQUEsU0FBQSxFQUNBO0FBQ0MsTUFBQSxPQUFBLENBQUEsU0FBQSxDQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxVQUFBLEdBQUEsS0FBQSxXQUFBLENBQUEsSUFBQSxDQUFBO0FBRUgsYUFBQSxJQUFBO0FBQ0c7O0FBRUgsV0FBQSxLQUFBO0FBQ0UsR0FqUUY7QUE0UUEsRUFBQSxtQkFBQSxFQUFBLDZCQUFBLElBQUEsRUFBQSxPQUFBLEVBQ0M7QUFBQSxRQURELE9BQ0M7QUFERCxNQUFBLE9BQ0MsR0FERCxJQUNDO0FBQUE7O0FBQ0MsUUFBQSxPQUFBLENBQUEsWUFBQSxFQUNBO0FBQ0MsTUFBQSxPQUFBLENBQUEsWUFBQSxDQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxVQUFBLEdBQUEsS0FBQSxXQUFBLENBQUEsSUFBQSxDQUFBO0FBRUgsYUFBQSxJQUFBO0FBQ0c7O0FBRUgsV0FBQSxLQUFBO0FBQ0U7QUF0UkYsQ0FBQSxDQUFBO0FDSEEsYUFBQSxDQUFBLEtBQUEsRUFBQTtBQUVBLEVBQUEsT0FBQSxFQUFBLE9B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QUEsRUFBQSxHQUFBLENBQUEsQ0FBQSxvQkFBQSxDQUFBO0FBRUEsSUFBQSxFQUFBLENBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsS0FBQSxRQUFBLEVBQUEscUNBQUEsQ0FBQSxFQUFBLE9BQUEsR0FBQSxJQUFBLENBQUEsWUFBQTtBQUVBLE1BQUEsRUFBQSxDQUFBLElBQUEsQ0FBQSxtQkFBQSxFQUFBLEtBQUEsQ0FBQSxNQUFBO0FBRUEsTUFBQSxDQUFBLENBQUEsUUFBQSxDQUFBLENBQUEsU0FBQSxDQUFBLENBQUE7O0FBRUEsTUFBQSxNQUFBLENBQUEsTUFBQTtBQUNHLEtBUEg7QUFVRSxHQWwwQ0Y7QUE0MENBLEVBQUEsSUFBQSxFQUFBLGNBQUEsT0FBQSxFQUFBLE9BQUEsRUFDQztBQUNDLFFBQUEsS0FBQSxNQUFBLENBQUEsT0FBQSxNQUFBLE9BQUEsRUFDQTtBQUNDLE1BQUEsT0FBQSxHQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBO0FBQ0E7O0FBRUgsU0FBQSxhQUFBLENBQUEsV0FBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsT0FBQTtBQUNFLEdBcDFDRjtBQTgxQ0EsRUFBQSxPQUFBLEVBQUEsaUJBQUEsT0FBQSxFQUFBLE9BQUEsRUFDQztBQUNDLFFBQUEsS0FBQSxNQUFBLENBQUEsT0FBQSxNQUFBLE9BQUEsRUFDQTtBQUNDLE1BQUEsT0FBQSxHQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBO0FBQ0E7O0FBRUgsU0FBQSxhQUFBLENBQUEsY0FBQSxFQUFBLFNBQUEsRUFBQSxPQUFBLEVBQUEsT0FBQTtBQUNFLEdBdDJDRjtBQWczQ0EsRUFBQSxPQUFBLEVBQUEsaUJBQUEsT0FBQSxFQUFBLE9BQUEsRUFDQztBQUNDLFFBQUEsS0FBQSxNQUFBLENBQUEsT0FBQSxNQUFBLE9BQUEsRUFDQTtBQUNDLE1BQUEsT0FBQSxHQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBO0FBQ0E7O0FBRUgsU0FBQSxhQUFBLENBQUEsY0FBQSxF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QUFFQSxRQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBO0FBQ0ksT0FISjtBQUtBLE1BQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxvQ0FBQSxFQUFBLElBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxJQUFBLEVBQUE7QUFFQSxRQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBO0FBQ0ksT0FISjtBQUtBLE1BQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxvQ0FBQSxFQUFBLElBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxJQUFBLEVBQUE7QUFFQSxRQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBO0FBQ0ksT0FISjtBQUtBLE1BQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSwrQkFBQSxFQUFBLElBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFFQSxZQUFBLElBQUEsR0FBQSxFQUFBO0FBQ0ksWUFBSSxJQUFNLEdBQUMsRUFBWDtBQUVKLFFBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsVUFBQSxLQUFBLEVBQUE7QUFFQSxVQUFBLElBQUEsQ0FBQSxLQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxDQUFBOztBQUVBLGNBQUEsS0FBQSxDQUFBLE9BQUEsQ0FBQSxLQUFBLE1BQUEsRUFDSztBQUNDLFlBQUEsSUFBQSxHQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUE7QUFDQTtBQUNELFNBUkw7QUFVQSxRQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxJQUFBO0FBQ0ksT0FoQko7QUFrQkEsTUFBQSxNQUFBLENBQUEsV0FBQSxDQUFBLE9BQUEsRUFBQSxDQUFBLElBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxDQUFBO0FBRUEsS0ExQ0EsRUEwQ0EsVUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO0FBRUEsTUFBQSxNQUFBLENBQUEsVUFBQSxDQUFBLE9BQUEsRUFBQSxDQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7QUFBQSxRQUFBLE9BQUEsRUFBQSxPQUFBO0FBQUEsUUFBQSxTQUFBLEVBQUE7QUFBQSxPQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBQUE7QUFDRyxLQTdDSDtBQWlEQSxXQUFBLE1BQUEsQ0FBQSxPQUFBLEVBQUE7QUFDRSxHQXZTRjtBQWlUQSxFQUFBLE1BQUEsRUFBQSxnQkFBQSxRQUFBLEVBQ0M7QUFDQyxRQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsUUFBQSxFQUFBOztBQURELDRCQUdELFNBQUEsQ0FBQSxLQUFBLENBQ0UsQ0FBQSxTQUFBLENBREYsRUFFRyxDQUFBLE1BQUEsQ0FGSCxFQUdHLFFBSEgsQ0FIQztBQUFBLFFBR0QsT0FIQzs7QUFXRCxTQUFBLE9BQUEsQ0FBQSx3Q0FBQSxFQUFBO0FBQUEsTUFBQSxVQUFBLEVBQUE7QUFBQSxLQUFBLEVBQUEsSUFBQSxDQUFBLFVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUVBLFVBQUEsUUFBQSxHQUFBLEVBQUE7QUFDRyxVQUFNLFFBQVEsR0FBRyxFQUFqQjtBQUNBLFVBQU0sT0FBQSxHQUFVLEVBQWhCO0FBQ0EsVUFBTSxPQUFPLEdBQUcsRUFBaEI7QUFFSCxNQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEscUNBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsSUFBQSxFQUFBO0FBRUEsUUFBQSxRQUFBLENBQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUNJLE9BSEo7QUFLQSxNQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsb0NBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsSUFBQSxFQUFBO0FBRUEsUUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUNJLE9BSEo7QUFLQSxNQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsb0NBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsSUFBQSxFQUFBO0FBRUEsUUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUNJLE9BSEo7QUFLQSxNQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsK0JBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBRUEsWUFBQSxJQUFBLEdBQUEsRUFBQTtBQUNJLFlBQUksSUFBTSxHQUFDLEVBQVg7QUFFSixRQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUEsT0FBQSxDQUFBLFVBQUEsS0FBQSxFQUFBO0FBRUEsVUFBQSxJQUFBLENBQUEsS0FBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQTs7QUFFQSxjQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsS0FBQSxNQUFBLEVBQ0s7QUFDQyxZQUFBLElBQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxDQUFBO0FBQ0E7QUFDRCxTQVJMO0FBVUEsUUFBQSxRQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsSUFBQTtBQUNJLE9BaEJKO0FBa0JBLE1BQUEsTUFBQSxDQUFBLFdBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsQ0FBQTtBQUVBLEtBMUNBLEVBMENBLFVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUVBLE1BQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO0FBQUEsUUFBQSxPQUFBLEVBQUEsT0FBQTtBQUFBLFFBQUEsU0FBQSxFQUFBO0FBQUEsT0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxD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QUxoRDtBQU1JLFFBQUEsd0JBQXVCLEVBQUEsT0FBSyxDQUFBLHdCQUFMLEdBQTZCO0FBTnhELE9BQUE7QUFXQSxNQUFBLFNBQUEsQ0FBQSxVQUFBLENBQUEsTUFBQSxFQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQTtBQUFBLFFBQUEsSUFBQSxFQUFBO0FBQUEsT0FBQSxFQUFBLElBQUEsQ0FBQSxZQUFBO0FBSUEsUUFBQSxDQUFBLENBQUEsdUNBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxVQUFBLENBQUEsRUFBQTtBQUVBLFVBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBO0FBQ0ssU0FITDtBQUtBLFFBQUEsQ0FBQSxDQUFBLHVDQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsVUFBQSxDQUFBLEVBQUE7QUFFQSxVQUFBLE9BQUEsQ0FBQSxZQUFBLENBQUEsQ0FBQTtBQUNLLFNBSEw7QUFLQSxRQUFBLENBQUEsQ0FBQSx1Q0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxFQUFBO0FBRUEsVUFBQSxPQUFBLENBQUEsZUFBQSxDQUFBLENBQUE7QUFDSyxTQUhMO0FBS0EsUUFBQSxDQUFBLENBQUEsdUNBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxVQUFBLENBQUEsRUFBQTtBQUVBLFVBQUEsT0FBQSxDQUFBLGVBQUEsQ0FBQSxDQUFBO0FBQ0ssU0FITDtBQUtBLFFBQUEsQ0FBQSxDQUFBLHVDQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsVUFBQSxDQUFBLEVBQUE7QUFFQSxVQUFBLE9BQUEsQ0FBQSxlQUFBLENBQUEsQ0FBQTtBQUNLLFNBSEw7QUFPQSxRQUFBLENBQUEsQ0FBQSw2RUFBQSxDQUFBLENBQUEsTUFBQSxDQUFBLFlBQUE7QUFFQSxjQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsdUNBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQTtBQUNLLGNBQU0sS0FBSyxHQUFHLENBQUEsQ0FBQSx1Q0FBQSxDQUFBLENBQTJDLEdBQTNDLEVBQWQ7QUFFTCxVQUFBLENBQUEsQ0FBQSx1Q0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsRUFBQSxpQkFBQSxDQUNLLEtBQUksQ0FBQSxNQUFKLEdBQUksQ0FBSixJQUFJLEtBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBSixJQUF3QyxLQUFNLEtBQUksS0FBbEQsR0FBa0QseUJBQWxELEdBQW9FLEVBRHpFO0FBR0ssU0FSTDtBQVVBLFFBQUEsQ0FBQSxDQUFBLDZFQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsWUFBQTtBQUVBLGNBQUEsS0FBQSxHQUFBLENBQUEsQ0FBQSx1Q0FBQSxDQUFBLENBQUEsR0FBQSxFQUFBO0FBQ0ssY0FBTSxLQUFLLEdBQUcsQ0FBQSxDQUFBLHVDQUFBLENBQUEsQ0FBMkMsR0FBM0MsRUFBZDtBQUVMLFVBQUEsQ0FBQSxDQUFBLHVDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLGlCQUFBLENBQ0ssS0FBSSxDQUFBLE1BQUosR0FBSSxDQUFKLElBQUksS0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFKLElBQXdDLEtBQU0sS0FBSSxLQUFsRCxHQUFrRCx5QkFBbEQsR0FBb0UsRUFEekU7QUFHSyxTQVJMO0FBV0ksT0FwREo7QUF3REEsTUFBQSxNQUFBLENBQUEsZ0JBQUEsQ0FBQSxTQUFBLEVBQUEsVUFBQSxDQUFBLEVBQUE7QUFFQSxZQUFBLE9BQUEsQ0FBQSxPQUFBLENBQUEsR0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLEVBQ0k7QUFDQyxjQUFBLElBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLElBQUE7QUFDQSxjQUFNLElBQUksR0FBRyxDQUFDLENBQUMsSUFBRixDQUFPLElBQXBCOztBQUVMLGNBQUEsSUFBQSxJQUFBLElBQUEsRUFDSztBQUNDLFlBQUEsT0FBQSxDQUFBLFdBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQTtBQUNBOztBQUVOLFVBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxLQUFBO0FBQ0s7QUFFTCxPQWZBLEVBZUEsS0FmQTtBQW1CQSxVQUFBLFFBQUEsR0FBQSxTQUFBLENBQUEsSUFBQSxDQUFBLFVBQUEsS0FBQSxFQUFBO0FBSUEsTUFBQSxXQUFBLENBQUEsWUFBQTtBQUVBLFlBQUEsU0FBQSxDQUFBLFFBQUEsRUFDSTtBQUNDLFVBQUEsVUFBQSxDQUFBLFNBQUEsR0FBQSxJQUFBLENBQUEsVUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO0FBRUwsWUFBQSxTQUFBLENBQUEsS0FBQSxDQUFBLE9BQUEsRUFBQSxJQUFBO0FBRUEsV0FKSyxFQUlMLElBSkssQ0FJTCxVQUFBLElBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBO0FBRUEsZ0JBQUEsQ0FBQSxRQUFBLENBQUEsT0FBQSxJQUFBLEVBQUEsT0FBQSxRQUFBLENBQUEsU0FBQSxJQUFBLEVBQUEsQ0FBQSxFQUNNO0FBQ0MsY0FBQSxPQUFBLENBQUEsT0FBQSxDQUFBLFFBQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUE7QUFDQTtBQUNELFdBVkQ7QUFXQTtBQUVMLE9BakJBLEVBaUJBLEtBQUEsSUFqQkEsQ0FBQTtBQXFCQSxNQUFBLFVBQUEsQ0FBQSxTQUFBLEdBQUEsSUFBQSxDQUFBLFVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUE7QUFFQSxRQUFBLE9BQUEsQ0FBQSxPQUFBLENBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBLE1BQUEsQ0FBQSxZQUFBO0FBRUEsVUFBQSxNQUFBLENBQUEsTUFBQSxDQUFBLE9BQUE7QUFDSyxTQUhMO0FBS0EsT0FQQSxFQU9BLElBUEEsQ0FPQSxVQUFBLElBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBO0FBRUEsUUFBQSxrQkFBQSxDQUFBLFNBQUEsQ0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBLEVBQUEsWUFBQTtBQUVBLFVBQUEsU0FBQSxDQUFBLFFBQUEsR0FBQSxJQUFB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SUFBQSxNQUFBLEdBQUE7QUFBQSxlQUFBLENBQUE7QUFBQSxZQUFBLGVBQUE7QUFBQSxZQUFBLHdCQUFBO0FBQUEsY0FBQSxDQUFBO0FBQUEsY0FBQSxPQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSxvQkFBQTtBQUFBLGlCQUFBLEVBQUE7QUFBQSxrQkFBQSxFQUFBO0FBQUEsa0JBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLG9CQUFBO0FBQUEsaUJBQUEsRUFBQTtBQUFBLGtCQUFBLElBQUE7QUFBQSxrQkFBQTtBQUFBLEtBQUE7QUFBQSxHQUFBLEVBQUE7QUFBQSxZQUFBLGVBQUE7QUFBQSxZQUFBLHdCQUFBO0FBQUEsY0FBQSxDQUFBO0FBQUEsY0FBQSxPQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSxvQkFBQTtBQUFBLGlCQUFBLEVBQUE7QUFBQSxrQkFBQSxFQUFBO0FBQUEsa0JBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLG9CQUFBO0FBQUEsaUJBQUEsRUFBQTtBQUFBLGtCQUFBLElBQUE7QUFBQSxrQkFBQTtBQUFBLEtBQUE7QUFBQSxHQUFBLEVBQUE7QUFBQSxZQUFBLFdBQUE7QUFBQSxZQUFBLG9CQUFBO0FBQUEsY0FBQSxDQUFBO0FBQUEsY0FBQSxPQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSxnQkFBQTtBQUFBLGlCQUFBLEVBQUE7QUFBQSxrQkFBQSxFQUFBO0FBQUEsa0JBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLGdCQUFBO0FBQUEsaUJBQUEsRUFBQTtBQUFBLGtCQUFBLElBQUE7QUFBQSxrQkFBQTtBQUFBLEtBQUE7QUFBQSxHQUFBLENBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsWUFBQSxXQUFBO0FBQUEsWUFBQSwrQkFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxjQUFBLGNBQUE7QUFBQSxjQUFBLDJCQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxjQUFBO0FBQUEsY0FBQSxxQkFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsY0FBQTtBQUFBLGNBQUEscUJBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLHdDQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSxrREFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsZ0JBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLHdCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGFBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFdBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLDRCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsV0FBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsT0FBQTtBQUFBLGNBQUEsb0RBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLG9CQUFBO0FBQUEsY0FBQSw0QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGNBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxpQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEscUJBQUE7QUFBQSxjQUFBLG1DQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsY0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGlCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQTtBQUFBLEdBQUEsRUFBQTtBQUFBLFlBQUEsV0FBQTtBQUFBLFlBQUEsMEJBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLE1BQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxNQUFBO0FBQUEsY0FBQSxnQkFBQTtBQUFBLGNBQUE7QUFBQSxLQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSx3REFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsc0ZBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLDRDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsc0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLDhDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsb0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGNBQUE7QUFBQSxjQUFBLHlEQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsc0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGNBQUE7QUFBQSxjQUFBLDJEQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsb0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGNBQUE7QUFBQSxjQUFBLHlEQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsc0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGNBQUE7QUFBQSxjQUFBLDJEQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsb0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLDJDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsc0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLDZDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsb0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGNBQUE7QUFBQSxjQUFBLDZCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsb0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGNBQUE7QUFBQSxjQUFBLDZCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsb0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGVBQUE7QUFBQSxjQUFBLDZDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLENBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSxpQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsUUFBQSxDQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsaUNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLENBQUEsT0FBQSxFQUFBLFFBQUEsQ0FBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLGlDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLENBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxVQUFBO0FBQUEsY0FBQSxnQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsUUFBQSxDQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsaUNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLENBQUEsT0FBQSxFQUFBLFFBQUEsQ0FBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLGlDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLENBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSxpQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsUUFBQSxDQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsMkdBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxxQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsdURBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGFBQUE7QUFBQSxjQUFBLCtHQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEscUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHVEQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSw4R0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHFCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSx1REFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEseUZBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxpQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBO0FBQUEsZ0JBQUEsZ0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSx5QkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsa0ZBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsTUFBQTtBQUFBLGNBQUEsMkJBQUE7QUFBQSxnQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsNkJBQUE7QUFBQSxnQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsd0JBQUE7QUFBQSxnQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsd0JBQUE7QUFBQSxnQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsVUFBQTtBQUFBLGNBQUEsOEdBQUE7QUFBQSxnQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsK0dBQUE7QUFBQSxnQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsTUFBQTtBQUFBLGNBQUEseUJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLENBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQTtBQUFBLGdCQUFBLGFBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSwyQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSwyQkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBO0FBQUEsZ0JBQUEsYUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLDJDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLDJCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxDQUFBLFFBQUEsRUFBQSxPQUFBLENBQUE7QUFBQSxnQkFBQSxhQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsMkNBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsT0FBQTtBQUFBLGNBQUEsMEJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLENBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQTtBQUFBLGdCQUFBLGFBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSwyQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxPQUFBO0FBQUEsY0FBQSxrQkFBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxnQkFBQTtBQUFBLGNBQUEsMEJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxPQUFBO0FBQUEsY0FBQSw0QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHFRQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGFBQUE7QUFBQSxjQUFBLGdDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsMkJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsZUFBQTtBQUFBLGNBQUEsaUNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLHFCQUFBO0FBQUEsY0FBQSw2Q0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSx1QkFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLGlCQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsZ0JBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSwwQkFBQTtBQUFBLGNBQUEsZ0RBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsdUJBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxpQkFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLGdCQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSwwQkFBQTtBQUFBLGNBQUEsZ0VBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxJQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsZ0JBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSwrQkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLEdBQUE7QUFBQSxnQkFBQSxlQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGlCQUFBO0FBQUEsY0FBQSx1QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxlQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLDZEQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLGlCQUFBO0FBQUEsZ0JBQUEsR0FBQTtBQUFBLGdCQUFBLGtFQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxDQUFBO0FBQUEsY0FBQSxDQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSw4RUFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsbUZBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBO0FBQUEsR0FBQSxFQUFBO0FBQUEsWUFBQSxZQUFBO0FBQUEsWUFBQSwyQkFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxjQUFBLFVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQTtBQUFBLEtBQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLHlCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsYUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHdGQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSwyQkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxjQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLHdCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLFVBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsd0JBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsY0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSx3QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxjQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLGlCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGNBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsV0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxnQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxXQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsZ0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxxQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSxpQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxXQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGdCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsZUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFdBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsOEJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSw2QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUE7QUFBQSxHQUFBLEVBQUE7QUFBQSxZQUFBLFVBQUE7QUFBQSxZQUFBLGtDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsMkJBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGFBQUE7QUFBQSxjQUFBLDJCQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSwyQ0FBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEscUNBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLHVCQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxVQUFBO0FBQUEsY0FBQSxxQkFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsb0JBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGFBQUE7QUFBQSxjQUFBLG9CQUFBO0FBQUEsZ0JBQUEs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QSxRQUFBO0FBQUEsZ0JBQUEsd0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLDhHQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEscUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHdDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSx5Q0FBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxVQUFBO0FBQUEsY0FBQSxvQ0FBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQTtBQUFBLEdBQUEsRUFBQTtBQUFBLFlBQUEsYUFBQTtBQUFBLFlBQUEsbUNBQUE7QUFBQSxrQkFBQSxFQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLGlEQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxHQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSxrREFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsR0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsd0JBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLEdBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFVBQUE7QUFBQSxjQUFBLHlCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxHQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQTtBQUFBLEdBQUEsQ0FBQTtBQUFBLGFBQUEsQ0FBQTtBQUFBLFlBQUEsYUFBQTtBQUFBLFlBQUEsdUJBQUE7QUFBQSxrQkFBQSxDQUFBLGNBQUEsQ0FBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxtQkFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLDRCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLElBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsK0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGFBQUE7QUFBQSxjQUFBLDJHQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEscUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHdDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxhQUFBO0FBQUEsY0FBQSwrR0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHFCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSx3Q0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsOEdBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxxQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsd0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLHlDQUFBO0FBQUEsZ0JBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFVBQUE7QUFBQSxjQUFBLG9DQUFBO0FBQUEsZ0JBQUE7QUFBQSxLQUFBO0FBQUEsR0FBQSxFQUFBO0FBQUEsWUFBQSxZQUFBO0FBQUEsWUFBQSwrQkFBQTtBQUFBLGtCQUFBLENBQUEsYUFBQSxDQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLG1CQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxLQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsaURBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLEdBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLGtEQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxHQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSx3QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsR0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsVUFBQTtBQUFBLGNBQUEseUJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLEdBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBO0FBQUEsR0FBQTtBQUFBLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEFNSSBUd2lnIEVuZ2luZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC17e1lFQVJ9fSBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG52YXIgYW1pVHdpZyA9IHtcblx0dmVyc2lvbjogJzEuMS4wJ1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBleHBvcnRzLmFtaVR3aWcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pZih0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpXG57XG5cdGFtaVR3aWcuZnMgPSByZXF1aXJlKCdmcycpO1xuXG5cdG1vZHVsZS5leHBvcnRzLmFtaVR3aWcgPSBhbWlUd2lnO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy50b2tlbml6ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50b2tlbml6ZXIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dG9rZW5pemU6IGZ1bmN0aW9uKGNvZGUsIGxpbmUsIHNwYWNlcywgdG9rZW5EZWZzLCB0b2tlblR5cGVzLCBlcnJvcilcblx0e1xuXHRcdGlmKHRva2VuRGVmcy5sZW5ndGggIT09IHRva2VuVHlwZXMubGVuZ3RoKVxuXHRcdHtcblx0XHRcdHRocm93ICdgdG9rZW5EZWZzLmxlbmd0aCAhPSB0b2tlblR5cGVzLmxlbmd0aGAnO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlc3VsdF90b2tlbnMgPSBbXTtcblx0XHRjb25zdCByZXN1bHRfdHlwZXMgPSBbXTtcblx0XHRjb25zdCByZXN1bHRfbGluZXMgPSBbXTtcblxuXHRcdGxldCBpID0gMHgwMDAwMDAwMDA7XG5cdFx0Y29uc3QgbCA9IGNvZGUubGVuZ3RoO1xuXG5cdFx0bGV0IHdvcmQgPSAnJywgdG9rZW4sIGM7XG5cbl9fbDA6XHRcdHdoaWxlKGkgPCBsKVxuXHRcdHtcblx0XHRcdGMgPSBjb2RlLmNoYXJBdCgwKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBDT1VOVCBMSU5FUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihjID09PSAnXFxuJylcblx0XHRcdHtcblx0XHRcdFx0bGluZSsrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVBVCBTUEFDRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHNwYWNlcy5pbmRleE9mKGMpID49IDApXG5cdFx0XHR7XG5cdFx0XHRcdGlmKHdvcmQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZihlcnJvcilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVzdWx0X3Rva2Vucy5wdXNoKHdvcmQpO1xuXHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcblx0XHRcdFx0XHR3b3JkID0gJyc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcoMSk7XG5cdFx0XHRcdGkgKz0gMTtcblxuXHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVBVCBSRUdFWEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGZvcihjb25zdCBqIGluIHRva2VuRGVmcylcblx0XHRcdHtcblx0XHRcdFx0dG9rZW4gPSB0aGlzLl9tYXRjaChjb2RlLCB0b2tlbkRlZnNbal0pO1xuXG5cdFx0XHRcdGlmKHRva2VuKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYod29yZClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZihlcnJvcilcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhyb3cgJ2ludmFsaWQgdG9rZW4gYCcgKyB3b3JkICsgJ2AnO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRcdFx0XHRyZXN1bHRfdHlwZXMucHVzaCgtMSk7XG5cdFx0XHRcdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcblx0XHRcdFx0XHRcdHdvcmQgPSAnJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2godG9rZW4pO1xuXHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKHRva2VuVHlwZXNbal0pO1xuXHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXG5cdFx0XHRcdFx0Y29kZSA9IGNvZGUuc3Vic3RyaW5nKHRva2VuLmxlbmd0aCk7XG5cdFx0XHRcdFx0aSArPSB0b2tlbi5sZW5ndGg7XG5cblx0XHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRUFUIFJFTUFJTklORyBDSEFSQUNURVJFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0d29yZCArPSBjO1xuXG5cdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcoMSk7XG5cdFx0XHRpICs9IDE7XG5cbi8qXHRcdFx0Y29udGludWUgX19sMDtcbiAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0aWYod29yZClcblx0XHR7XG5cdFx0XHRpZihlcnJvcilcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ2ludmFsaWQgdG9rZW4gYCcgKyB3b3JkICsgJ2AnO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRyZXN1bHRfdHlwZXMucHVzaCgtMSk7XG5cdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcbi8qXHRcdFx0d29yZCA9ICcnO1xuICovXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHR0b2tlbnM6IHJlc3VsdF90b2tlbnMsXG5cdFx0XHR0eXBlczogcmVzdWx0X3R5cGVzLFxuXHRcdFx0bGluZXM6IHJlc3VsdF9saW5lcyxcblx0XHR9O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X21hdGNoOiBmdW5jdGlvbihzLCBzdHJpbmdPclJlZ0V4cClcblx0e1xuXHRcdGxldCBtO1xuXG5cdFx0aWYoc3RyaW5nT3JSZWdFeHAgaW5zdGFuY2VvZiBSZWdFeHApXG5cdFx0e1xuXHRcdFx0bSA9IHMubWF0Y2goc3RyaW5nT3JSZWdFeHApO1xuXG5cdFx0XHRyZXR1cm4gbSAhPT0gbnVsbCAmJiB0aGlzLl9jaGVja05leHRDaGFyKHMsIC8qLSovbVswXS8qLSovKSA/IC8qLSovbVswXS8qLSovIDogbnVsbDtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdG0gPSBzLmluZGV4T2Yoc3RyaW5nT3JSZWdFeHApO1xuXG5cdFx0XHRyZXR1cm4gbSA9PT0gMHgwMCAmJiB0aGlzLl9jaGVja05leHRDaGFyKHMsIHN0cmluZ09yUmVnRXhwKSA/IHN0cmluZ09yUmVnRXhwIDogbnVsbDtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfYWxudW06IFtcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsXG5cdFx0MSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMSxcblx0XHQwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLFxuXHRcdDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRdLFxuXG5cdF9jaGVja05leHRDaGFyOiBmdW5jdGlvbihzLCB0b2tlbilcblx0e1xuXHRcdGNvbnN0IGxlbmd0aCA9IHRva2VuLmxlbmd0aDtcblxuXHRcdGNvbnN0IGNoYXJDb2RlMiA9IHMuY2hhckNvZGVBdChsZW5ndGggLSAwKTtcblx0XHRjb25zdCBjaGFyQ29kZTEgPSBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMSk7XG5cblx0XHRyZXR1cm4gaXNOYU4oY2hhckNvZGUyKVxuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0aGlzLl9hbG51bVtjaGFyQ29kZTJdID09PSAwXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHRoaXMuX2FsbnVtW2NoYXJDb2RlMV0gPT09IDBcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIgPSB7fTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIudG9rZW5zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIudG9rZW5zID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQ09NUE9TSVRFIFRPS0VOUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuSVNfWFhYID0gW1xuXHRcdFx0dGhpcy5ERUZJTkVELFxuXHRcdFx0dGhpcy5OVUxMLFxuXHRcdFx0dGhpcy5FTVBUWSxcblx0XHRcdHRoaXMuSVRFUkFCTEUsXG5cdFx0XHR0aGlzLkVWRU4sXG5cdFx0XHR0aGlzLk9ERCxcblx0XHRdO1xuXG5cdFx0dGhpcy5YWFhfV0lUSCA9IFtcblx0XHRcdHRoaXMuU1RBUlRTX1dJVEgsXG5cdFx0XHR0aGlzLkVORFNfV0lUSCxcblx0XHRdO1xuXG5cdFx0dGhpcy5QTFVTX01JTlVTID0gW1xuXHRcdFx0dGhpcy5DT05DQVQsXG5cdFx0XHR0aGlzLlBMVVMsXG5cdFx0XHR0aGlzLk1JTlVTLFxuXHRcdF07XG5cblx0XHR0aGlzLk1VTF9GTERJVl9ESVZfTU9EID0gW1xuXHRcdFx0dGhpcy5NVUwsXG5cdFx0XHR0aGlzLkZMRElWLFxuXHRcdFx0dGhpcy5ESVYsXG5cdFx0XHR0aGlzLk1PRCxcblx0XHRdO1xuXG5cdFx0dGhpcy5SWCA9IFtcblx0XHRcdHRoaXMuUlAsXG5cdFx0XHR0aGlzLlJCMSxcblx0XHRdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFJFQUwgVE9LRU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0TE9HSUNBTF9PUjogMTAwLFxuXHRMT0dJQ0FMX0FORDogMTAxLFxuXHRCSVRXSVNFX09SOiAxMDIsXG5cdEJJVFdJU0VfWE9SOiAxMDMsXG5cdEJJVFdJU0VfQU5EOiAxMDQsXG5cdE5PVDogMTA1LFxuXHRJUzogMTA2LFxuXHRERUZJTkVEOiAxMDcsXG5cdE5VTEw6IDEwOCxcblx0RU1QVFk6IDEwOSxcblx0SVRFUkFCTEU6IDExMCxcblx0RVZFTjogMTExLFxuXHRPREQ6IDExMixcblx0Q01QX09QOiAxMTMsXG5cdFNUQVJUU19XSVRIOiAxMTQsXG5cdEVORFNfV0lUSDogMTE1LFxuXHRNQVRDSEVTOiAxMTYsXG5cdElOOiAxMTcsXG5cdFJBTkdFOiAxMTgsXG5cdENPTkNBVDogMTE5LFxuXHRQTFVTOiAxMjAsXG5cdE1JTlVTOiAxMjEsXG5cdFBPV0VSOiAxMjIsXG5cdE1VTDogMTIzLFxuXHRGTERJVjogMTI0LFxuXHRESVY6IDEyNSxcblx0TU9EOiAxMjYsXG4gXHRET1VCTEVfUVVFU1RJT046IDEyNyxcbiBcdFFVRVNUSU9OOiAxMjgsXG5cdENPTE9OOiAxMjksXG5cdERPVDogMTMwLFxuXHRDT01NQTogMTMxLFxuXHRQSVBFOiAxMzIsXG5cdExQOiAxMzMsXG5cdFJQOiAxMzQsXG5cdExCMTogMTM1LFxuXHRSQjE6IDEzNixcblx0TEIyOiAxMzcsXG5cdFJCMjogMTM4LFxuXHRTSUQ6IDEzOSxcblx0VEVSTUlOQUw6IDE0MCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBWSVJUVUFMIFRPS0VOUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdExTVDogMjAwLFxuXHRESUM6IDIwMSxcblx0RlVOOiAyMDIsXG5cdFZBUjogMjAzLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLnRva2Vucy4kaW5pdCgpO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5Ub2tlbml6ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ub2tlbml6ZXIgPSBmdW5jdGlvbihjb2RlLCBsaW5lKSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fc3BhY2VzID0gWycgJywgJ1xcdCcsICdcXG4nLCAnXFxyJ107XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLl90b2tlbkRlZnMgPSBbXG5cdFx0J29yJyxcblx0XHQnYW5kJyxcblx0XHQnYi1vcicsXG5cdFx0J2IteG9yJyxcblx0XHQnYi1hbmQnLFxuXHRcdCdub3QnLFxuXHRcdCdpcycsXG5cdFx0J2RlZmluZWQnLFxuXHRcdCdudWxsJyxcblx0XHQnZW1wdHknLFxuXHRcdCdpdGVyYWJsZScsXG5cdFx0J2V2ZW4nLFxuXHRcdCdvZGQnLFxuXHRcdCc9PT0nLFxuXHRcdCc9PScsXG5cdFx0JyE9PScsXG5cdFx0JyE9Jyxcblx0XHQnPD0nLFxuXHRcdCc+PScsXG5cdFx0JzwnLFxuXHRcdCc+Jyxcblx0XHQvXnN0YXJ0c1xccyt3aXRoLyxcblx0XHQvXmVuZHNcXHMrd2l0aC8sXG5cdFx0J21hdGNoZXMnLFxuXHRcdCdpbicsXG5cdFx0Jy4uJyxcblx0XHQnficsXG5cdFx0JysnLFxuXHRcdCctJyxcblx0XHQnKionLFxuXHRcdCcqJyxcblx0XHQnLy8nLFxuXHRcdCcvJyxcblx0XHQnJScsXG5cdFx0Jz8/Jyxcblx0XHQnPycsXG5cdFx0JzonLFxuXHRcdCcuJyxcblx0XHQnLCcsXG5cdFx0J3wnLFxuXHRcdCcoJyxcblx0XHQnKScsXG5cdFx0J1snLFxuXHRcdCddJyxcblx0XHQneycsXG5cdFx0J30nLFxuXHRcdCd0cnVlJyxcblx0XHQnZmFsc2UnLFxuXHRcdC9eWzAtOV0rXFwuWzAtOV0rLyxcblx0XHQvXlswLTldKy8sXG5cdFx0L14nKFxcXFwnfFteJ10pKicvLFxuXHRcdC9eXCIoXFxcXFwifFteXCJdKSpcIi8sXG5cdFx0L15bYS16QS1aXyRdW2EtekEtWjAtOV8kXSovLFxuXHRdO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fdG9rZW5UeXBlcyA9IFtcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX1hPUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5ELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTk9ULFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ERUZJTkVELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTlVMTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkVNUFRZLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSVRFUkFCTEUsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FVkVOLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuT0RELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuU1RBUlRTX1dJVEgsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FTkRTX1dJVEgsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NQVRDSEVTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSU4sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQU5HRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTkNBVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NSU5VUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBPV0VSLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTVVMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRkxESVYsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ESVYsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NT0QsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ET1VCTEVfUVVFU1RJT04sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5RVUVTVElPTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTE9OLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRE9ULFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ09NTUEsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5QSVBFLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTFAsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxCMSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJCMSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxCMixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJCMixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlNJRCxcblx0XTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuJGluaXQgPSBmdW5jdGlvbihjb2RlLCBsaW5lKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgcmVzdWx0ID0gYW1pVHdpZy50b2tlbml6ZXIudG9rZW5pemUoXG5cdFx0XHRjb2RlLFxuXHRcdFx0bGluZSxcblx0XHRcdHRoaXMuX3NwYWNlcyxcblx0XHRcdHRoaXMuX3Rva2VuRGVmcyxcblx0XHRcdHRoaXMuX3Rva2VuVHlwZXMsXG5cdFx0XHR0cnVlXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMudG9rZW5zID0gcmVzdWx0LnRva2Vucztcblx0XHR0aGlzLnR5cGVzID0gcmVzdWx0LnR5cGVzO1xuXG5cdFx0dGhpcy5pID0gMDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMubmV4dCA9IGZ1bmN0aW9uKG4gPSAxKVxuXHR7XG5cdFx0dGhpcy5pICs9IG47XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLmlzRW1wdHkgPSBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pID49IHRoaXMudG9rZW5zLmxlbmd0aDtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMucGVla1Rva2VuID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudG9rZW5zW3RoaXMuaV07XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLnBlZWtUeXBlID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudHlwZXNbdGhpcy5pXTtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuY2hlY2tUeXBlID0gZnVuY3Rpb24odHlwZSlcblx0e1xuXHRcdGlmKHRoaXMuaSA8IHRoaXMudG9rZW5zLmxlbmd0aClcblx0XHR7XG5cdFx0XHRjb25zdCBUWVBFID0gdGhpcy50eXBlc1t0aGlzLmldO1xuXG5cdFx0XHRyZXR1cm4gKHR5cGUgaW5zdGFuY2VvZiBBcnJheSkgPyAodHlwZS5pbmRleE9mKFRZUEUpID49IDApIDogKHR5cGUgPT09IFRZUEUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuJGluaXQoY29kZSwgbGluZSk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLkNvbXBpbGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLkNvbXBpbGVyID0gZnVuY3Rpb24oY29kZSwgbGluZSkge1xuXG5cdHRoaXMuJGluaXQoY29kZSwgbGluZSk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLkNvbXBpbGVyLnByb3RvdHlwZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24oY29kZSwgbGluZSlcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMudG9rZW5pemVyID0gbmV3IGFtaVR3aWcuZXhwci5Ub2tlbml6ZXIoXG5cdFx0XHR0aGlzLmNvZGUgPSBjb2RlLFxuXHRcdFx0dGhpcy5saW5lID0gbGluZVxuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnJvb3ROb2RlID0gdGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5pc0VtcHR5KCkgPT09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgdW5leHBlY3RlZCB0b2tlbiBgJyArIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpICsgJ2AnO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGR1bXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnJvb3ROb2RlLmR1bXAoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTnVsbENvYWxlc2Npbmc6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUxvZ2ljYWxPcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBOdWxsQ29hbGVzY2luZyA6IExvZ2ljYWxPciAoJz8/JyBMb2dpY2FsT3IpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuRE9VQkxFX1FVRVNUSU9OKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTG9naWNhbE9yKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUxvZ2ljYWxPcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTG9naWNhbEFuZCgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBMb2dpY2FsT3IgOiBMb2dpY2FsQW5kICgnb3InIExvZ2ljYWxBbmQpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUxvZ2ljYWxBbmQoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTG9naWNhbEFuZDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQml0d2lzZU9yKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIExvZ2ljYWxBbmQgOiBCaXR3aXNlT3IgKCdhbmQnIEJpdHdpc2VPcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUJpdHdpc2VPcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VCaXR3aXNlT3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VYb3IoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQml0d2lzZU9yIDogQml0d2lzZVhvciAoJ2Itb3InIEJpdHdpc2VYb3IpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfT1IpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VCaXR3aXNlWG9yKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VYb3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VBbmQoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQml0d2lzZVhvciA6IEJpdHdpc2VBbmQgKCdiLXhvcicgQml0d2lzZUFuZCkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfWE9SKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQml0d2lzZUFuZCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VCaXR3aXNlQW5kOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VOb3QoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQml0d2lzZUFuZCA6IE5vdCAoJ2ItYW5kJyBOb3QpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5EKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTm90KCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU5vdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE5vdCA6ICdub3QnIENvbXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5OT1QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VDb21wKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBudWxsO1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICB8IENvbXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gdGhpcy5wYXJzZUNvbXAoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQ29tcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQWRkU3ViKCksIHJpZ2h0LCBub2RlLCBzd2FwO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIENvbXAgOiBBZGRTdWIgJ2lzJyAnbm90Jz8gKCdkZWZpbmVkJyB8ICdudWxsJyB8IC4uLikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQvKiovIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLklTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0Lyogc3dhcCAnaXMnIGFuZCAnbm90JyAqL1xuXHRcdFx0c3dhcCA9IG5vZGU7XG5cdFx0XHQvKiBzd2FwICdpcycgYW5kICdub3QnICovXG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkpXG5cdFx0XHR7XG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZS5ub2RlTGVmdCA9IG51bGw7XG5cdFx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gc3dhcDtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuSVNfWFhYKSlcblx0XHRcdHtcblx0XHRcdFx0cmlnaHQgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0c3dhcC5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRcdHN3YXAubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwga2V5d29yZCBgZGVmaW5lZGAsIGBudWxsYCwgYGVtcHR5YCwgYGl0ZXJhYmxlYCwgYGV2ZW5gIG9yIGBvZGRgIGV4cGVjdGVkJztcblx0XHRcdH1cblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgKCc9PT0nIHwgJz09JyB8IC4uLikgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICgnc3RhcnRzJyB8ICdlbmRzJykgYHdpdGhgIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5YWFhfV0lUSCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICdtYXRjaGVzJyBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5NQVRDSEVTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgJ2luJyBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLklOKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQWRkU3ViOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VNdWxEaXYoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQWRkU3ViIDogTXVsRGl2ICgoJysnIHwgJy0nKSBNdWxEaXYpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVNfTUlOVVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VNdWxEaXYoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTXVsRGl2OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VQbHVzTWludXMoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTXVsRGl2IDogUGx1c01pbnVzICgoJyonIHwgJy8vJyB8ICcvJyB8ICclJykgUGx1c01pbnVzKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk1VTF9GTERJVl9ESVZfTU9EKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlUGx1c01pbnVzKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVBsdXNNaW51czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFBsdXNNaW51cyA6ICgnLScgfCAnKycpIFBvd2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QTFVTX01JTlVTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlUG93ZXIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IG51bGw7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICAgICAgIHwgRG90MSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiB0aGlzLnBhcnNlUG93ZXIoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlUG93ZXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUZpbHRlcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBQb3dlciA6IEZpbHRlciAoJyoqJyBGaWx0ZXIpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVIpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VGaWx0ZXIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRmlsdGVyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VEb3QxKCksIG5vZGUsIHRlbXA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogRmlsdGVyIDogRG90MSAoJ3wnIERvdDEpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBJUEUpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0bm9kZSA9IHRoaXMucGFyc2VEb3QxKHRydWUpO1xuXG5cdFx0XHRmb3IodGVtcCA9IG5vZGU7IHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuRE9UOyB0ZW1wID0gdGVtcC5ub2RlTGVmdCk7XG5cblx0XHRcdHRlbXAubGlzdC51bnNoaWZ0KGxlZnQpO1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRG90MTogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRjb25zdCBub2RlID0gdGhpcy5wYXJzZURvdDIoaXNGaWx0ZXIpO1xuXG5cdFx0aWYobm9kZSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGV0IHRlbXAgPSBub2RlO1xuXG5cdFx0XHRmb3IoOyB0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDsgdGVtcCA9IHRlbXAubm9kZUxlZnQpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGVtcC5xKVxuXHRcdFx0e1xuXHRcdFx0XHQvKiovIGlmKHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuRlVOKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYodGVtcC5ub2RlVmFsdWUgaW4gYW1pVHdpZy5zdGRsaWIpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAnYW1pVHdpZy5zdGRsaWIuJyArIHRlbXAubm9kZVZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAvKi0tLSovJ18uJy8qLS0tKi8gKyB0ZW1wLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZih0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRlbXAubm9kZVZhbHVlID0gLyotLS0qLydfLicvKi0tLSovICsgdGVtcC5ub2RlVmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0ZW1wLnEgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5vZGU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDI6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlRG90Myhpc0ZpbHRlciksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIERvdDIgOiBEb3QzICgnLicgRG90MykqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5ET1QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgJy4nKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlRG90Myhpc0ZpbHRlcik7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDM6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlWChpc0ZpbHRlciksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIERvdDMgOiBYICgnWycgTnVsbENvYWxlc2NpbmcgJ10nKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MQjEpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIxKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoYW1pVHdpZy5leHByLnRva2Vucy5ET1QsICdbXScpO1xuXG5cdFx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGBdYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgICAgfCBYICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlWDogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBYIDogR3JvdXAgfCBBcnJheSB8IE9iamVjdCB8IEZ1blZhciB8IFRlcm1pbmFsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlR3JvdXAoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZUFycmF5KCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VPYmplY3QoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZUZ1blZhcihpc0ZpbHRlcikpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VUZXJtaW5hbCgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFNZTlRBWCBFUlJPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIHN5bnRheCBlcnJvciBvciB0dW5jYXRlZCBleHByZXNzaW9uJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlR3JvdXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEdyb3VwIDogJygnIE51bGxDb2FsZXNjaW5nICcpJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MUCkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRub2RlID0gdGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJQKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGApYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUFycmF5OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbm9kZSwgbGlzdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBBcnJheSA6ICdbJyBTaW5nbGV0cyAnXScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIxKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGxpc3QgPSB0aGlzLl9wYXJzZVNpbmdsZXRzKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMSkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKGFtaVR3aWcuZXhwci50b2tlbnMuTFNULCAnQXJyYXknKTtcblxuXHRcdFx0XHRub2RlLmxpc3QgPSBsaXN0O1xuXG5cdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGBdYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU9iamVjdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGUsIGRpY3Q7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogT2JqZWN0IDogJ3snIERvdWJsZXRzICd9JyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxCMikpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRkaWN0ID0gdGhpcy5fcGFyc2VEb3VibGV0cygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjIpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkRJQywgJ09iamVjdCcpO1xuXG5cdFx0XHRcdG5vZGUuZGljdCA9IGRpY3Q7XG5cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYH1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRnVuVmFyOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuU0lEKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKDAsIGlzRmlsdGVyID8gJ2ZpbHRlcl8nICsgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkgOiB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cblx0XHRcdG5vZGUucSA9IHRydWU7XG5cblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGdW5WYXIgOiBTSUQgJygnIFNpbmdsZXRzICcpJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQvKiovIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxQKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUubGlzdCA9IHRoaXMuX3BhcnNlU2luZ2xldHMoKTtcblxuXHRcdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SUCkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0XHRub2RlLm5vZGVUeXBlID0gYW1pVHdpZy5leHByLnRva2Vucy5GVU47XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgKWAgZXhwZWN0ZWQnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogICAgICAgIHwgU0lEICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlLm5vZGVUeXBlID0gaXNGaWx0ZXIgPyBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTlxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgOiBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUlxuXHRcdFx0XHQ7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gW107XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9wYXJzZVNpbmdsZXRzOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJYKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0dGhpcy5fcGFyc2VTaW5nbGV0KHJlc3VsdCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BKSA9PT0gdHJ1ZSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlRG91YmxldHM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IHt9O1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIyKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0dGhpcy5fcGFyc2VEb3VibGV0KHJlc3VsdCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BKSA9PT0gdHJ1ZSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlU2luZ2xldDogZnVuY3Rpb24ocmVzdWx0KVxuXHR7XG5cdFx0cmVzdWx0LnB1c2godGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCkpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlRG91YmxldDogZnVuY3Rpb24ocmVzdWx0KVxuXHR7XG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwpKVxuXHRcdHtcblx0XHRcdGNvbnN0IGtleSA9IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DT0xPTikpXG5cdFx0XHR7XG4vKlx0XHRcdFx0Y29uc3QgY29sb24gPSB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKTtcbiAqL1x0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmVzdWx0W2tleV0gPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGA6YCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIHRlcm1pbmFsIGV4cGVjdGVkJztcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVRlcm1pbmFsOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogVGVybWluYWwgOiBURVJNSU5BTCB8IFJBTkdFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMKSlcblx0XHR7XG5cdFx0XHRsZWZ0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UpKVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJpZ2h0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIGxlZnQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLk5vZGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLk5vZGUgPSBmdW5jdGlvbihub2RlVHlwZSwgbm9kZVZhbHVlKSB7XG5cblx0dGhpcy4kaW5pdChub2RlVHlwZSwgbm9kZVZhbHVlKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuTm9kZS5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKG5vZGVUeXBlLCBub2RlVmFsdWUpXG5cdHtcblx0XHR0aGlzLm5vZGVUeXBlID0gbm9kZVR5cGU7XG5cdFx0dGhpcy5ub2RlVmFsdWUgPSBub2RlVmFsdWU7XG5cdFx0dGhpcy5ub2RlTGVmdCA9IG51bGw7XG5cdFx0dGhpcy5ub2RlUmlnaHQgPSBudWxsO1xuXHRcdHRoaXMubGlzdCA9IG51bGw7XG5cdFx0dGhpcy5kaWN0ID0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9kdW1wOiBmdW5jdGlvbihub2RlcywgZWRnZXMsIHBDbnQpXG5cdHtcblx0XHRsZXQgQ05UO1xuXG5cdFx0Y29uc3QgY250ID0gcENudFswXTtcblxuXHRcdG5vZGVzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyBbbGFiZWw9XCInICsgdGhpcy5ub2RlVmFsdWUucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ1wiXTsnKTtcblxuXHRcdGlmKHRoaXMubm9kZUxlZnQpXG5cdFx0e1xuXHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJzsnKTtcblx0XHRcdHRoaXMubm9kZUxlZnQuX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHR9XG5cblx0XHRpZih0aGlzLm5vZGVSaWdodClcblx0XHR7XG5cdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnOycpO1xuXHRcdFx0dGhpcy5ub2RlUmlnaHQuX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHR9XG5cblx0XHRpZih0aGlzLmxpc3QpXG5cdFx0e1xuXHRcdFx0Zm9yKGNvbnN0IGkgaW4gdGhpcy5saXN0KVxuXHRcdFx0e1xuXHRcdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICcgW2xhYmVsPVwiWycgKyBpLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICddXCJdOycpO1xuXHRcdFx0XHR0aGlzLmxpc3RbaV0uX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZih0aGlzLmRpY3QpXG5cdFx0e1xuXHRcdFx0Zm9yKGNvbnN0IGkgaW4gdGhpcy5kaWN0KVxuXHRcdFx0e1xuXHRcdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICcgW2xhYmVsPVwiWycgKyBpLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICddXCJdOycpO1xuXHRcdFx0XHR0aGlzLmRpY3RbaV0uX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCBub2RlcyA9IFtdO1xuXHRcdGNvbnN0IGVkZ2VzID0gW107XG5cblx0XHR0aGlzLl9kdW1wKG5vZGVzLCBlZGdlcywgWzBdKTtcblxuXHRcdHJldHVybiAnZGlncmFwaCBhc3Qge1xcblxcdHJhbmtkaXI9VEI7XFxuJyArIG5vZGVzLmpvaW4oJ1xcbicpICsgJ1xcbicgKyBlZGdlcy5qb2luKCdcXG4nKSArICdcXG59Jztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcudG1wbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG1wbCA9IHt9O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcudG1wbC5Db21waWxlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG1wbC5Db21waWxlciA9IGZ1bmN0aW9uKHRtcGwpIHtcblxuXHR0aGlzLiRpbml0KHRtcGwpO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG1wbC5Db21waWxlci5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0U1RBVEVNRU5UX1JFOiAvXFx7JVxccyooW2EtekEtWl0rKVxccyooKD86LnxcXG4pKj8pXFxzKiVcXH0vLFxuXG5cdENPTU1FTlRfUkU6IC9cXHsjXFxzKigoPzoufFxcbikqPylcXHMqI1xcfS9nLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2NvdW50OiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0bGV0IHJlc3VsdCA9IDA7XG5cblx0XHRjb25zdCBsID0gcy5sZW5ndGg7XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSsrKVxuXHRcdHtcblx0XHRcdGlmKHNbaV0gPT09ICdcXG4nKSByZXN1bHQrKztcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKHRtcGwpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgbGluZSA9IDE7XG5cblx0XHRsZXQgY29sdW1uO1xuXHRcdGxldCBDT0xVTU47XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnJvb3ROb2RlID0ge1xuXHRcdFx0bGluZTogbGluZSxcblx0XHRcdGtleXdvcmQ6ICdAcm9vdCcsXG5cdFx0XHRleHByZXNzaW9uOiAnJyxcblx0XHRcdGJsb2NrczogW3tcblx0XHRcdFx0ZXhwcmVzc2lvbjogJ0B0cnVlJyxcblx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHR9XSxcblx0XHRcdHZhbHVlOiAnJyxcblx0XHR9O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3Qgc3RhY2sxID0gW3RoaXMucm9vdE5vZGVdO1xuXHRcdGNvbnN0IHN0YWNrMiA9IFsweDAwMDAwMDAwMDAwXTtcblxuXHRcdGxldCBpdGVtO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Zm9yKHRtcGwgPSB0bXBsLnJlcGxhY2UodGhpcy5DT01NRU5UX1JFLCAnJyk7OyB0bXBsID0gdG1wbC5zdWJzdHIoQ09MVU1OKSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgY3VyciA9IHN0YWNrMVtzdGFjazEubGVuZ3RoIC0gMV07XG5cdFx0XHQgbGV0ICBpbmR4ID0gc3RhY2syW3N0YWNrMi5sZW5ndGggLSAxXTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IG0gPSB0bXBsLm1hdGNoKHRoaXMuU1RBVEVNRU5UX1JFKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKG0gPT09IG51bGwpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGluZSArPSB0aGlzLl9jb3VudCh0bXBsKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaCh7XG5cdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRrZXl3b3JkOiAnQHRleHQnLFxuXHRcdFx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0dmFsdWU6IHRtcGwsXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgZXJyb3JzID0gW107XG5cblx0XHRcdFx0Zm9yKGxldCBpID0gc3RhY2sxLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvKiovIGlmKHN0YWNrMVtpXS5rZXl3b3JkID09PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGVycm9ycy5wdXNoKCdtaXNzaW5nIGtleXdvcmQgYGVuZGlmYCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmKHN0YWNrMVtpXS5rZXl3b3JkID09PSAnZm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0IFx0ZXJyb3JzLnB1c2goJ21pc3Npbmcga2V5d29yZCBgZW5kZm9yYCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGVycm9ycy5sZW5ndGggPiAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgJyArIGVycm9ycy5qb2luKCcsICcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IG1hdGNoID0gbVswXTtcblx0XHRcdGNvbnN0IGtleXdvcmQgPSBtWzFdO1xuXHRcdFx0Y29uc3QgZXhwcmVzc2lvbiA9IG1bMl07XG5cblx0XHRcdGNvbHVtbiA9IG0uaW5kZXggKyAweDAwMDAwMDAwMDA7XG5cdFx0XHRDT0xVTU4gPSBtLmluZGV4ICsgbWF0Y2gubGVuZ3RoO1xuXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHRtcGwuc3Vic3RyKDAsIGNvbHVtbik7XG5cdFx0XHRjb25zdCBWQUxVRSA9IHRtcGwuc3Vic3RyKDAsIENPTFVNTik7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsaW5lICs9IHRoaXMuX2NvdW50KFZBTFVFKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHZhbHVlKVxuXHRcdFx0e1xuXHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0a2V5d29yZDogJ0B0ZXh0Jyxcblx0XHRcdFx0XHRleHByZXNzaW9uOiAnJyxcblx0XHRcdFx0XHRibG9ja3M6IFtdLFxuXHRcdFx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHN3aXRjaChrZXl3b3JkKVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2ZsdXNoJzpcblx0XHRcdFx0Y2FzZSAnYXV0b2VzY2FwZSc6XG5cdFx0XHRcdGNhc2UgJ3NwYWNlbGVzcyc6XG5cdFx0XHRcdGNhc2UgJ3ZlcmJhdGltJzpcblxuXHRcdFx0XHRcdC8qIElHTk9SRSAqL1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdkbyc6XG5cdFx0XHRcdGNhc2UgJ3NldCc6XG5cdFx0XHRcdGNhc2UgJ2luY2x1ZGUnOlxuXG5cdFx0XHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0XHRrZXl3b3JkOiBrZXl3b3JkLFxuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogZXhwcmVzc2lvbixcblx0XHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0XHR2YWx1ZTogJycsXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaChpdGVtKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnaWYnOlxuXHRcdFx0XHRjYXNlICdmb3InOlxuXG5cdFx0XHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0XHRrZXl3b3JkOiBrZXl3b3JkLFxuXHRcdFx0XHRcdFx0YmxvY2tzOiBbe1xuXHRcdFx0XHRcdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHRcdH1dLFxuXHRcdFx0XHRcdFx0dmFsdWU6ICcnLFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrc1tpbmR4XS5saXN0LnB1c2goaXRlbSk7XG5cblx0XHRcdFx0XHRzdGFjazEucHVzaChpdGVtKTtcblx0XHRcdFx0XHRzdGFjazIucHVzaCgweDAwKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZWxzZWlmJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVsc2VpZmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGluZHggPSBjdXJyLmJsb2Nrcy5sZW5ndGg7XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrcy5wdXNoKHtcblx0XHRcdFx0XHRcdGV4cHJlc3Npb246IGV4cHJlc3Npb24sXG5cdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHN0YWNrMltzdGFjazIubGVuZ3RoIC0gMV0gPSBpbmR4O1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbHNlJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJ1xuXHRcdFx0XHRcdCAgICYmXG5cdFx0XHRcdFx0ICAgY3Vyclsna2V5d29yZCddICE9PSAnZm9yJ1xuXHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZWxzZWAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGluZHggPSBjdXJyLmJsb2Nrcy5sZW5ndGg7XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrcy5wdXNoKHtcblx0XHRcdFx0XHRcdGV4cHJlc3Npb246ICdAdHJ1ZScsXG5cdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHN0YWNrMltzdGFjazIubGVuZ3RoIC0gMV0gPSBpbmR4O1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbmRpZic6XG5cblx0XHRcdFx0XHRpZihjdXJyWydrZXl3b3JkJ10gIT09ICdpZicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbmRpZmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHN0YWNrMS5wb3AoKTtcblx0XHRcdFx0XHRzdGFjazIucG9wKCk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2VuZGZvcic6XG5cblx0XHRcdFx0XHRpZihjdXJyWydrZXl3b3JkJ10gIT09ICdmb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZW5kZm9yYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c3RhY2sxLnBvcCgpO1xuXHRcdFx0XHRcdHN0YWNrMi5wb3AoKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVua25vd24ga2V5d29yZCBgJyArIGtleXdvcmQgKyAnYCc7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZHVtcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMucm9vdE5vZGUsIG51bGwsIDIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5lbmdpbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5lbmdpbmUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0VkFSSUFCTEVfUkU6IC9cXHtcXHtcXHMqKC4qPylcXHMqXFx9XFx9L2csXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcmVuZGVyOiBmdW5jdGlvbihyZXN1bHQsIGl0ZW0sIGRpY3QgPSB7fSwgdG1wbHMgPSB7fSlcblx0e1xuXHRcdGxldCBtO1xuXG5cdFx0bGV0IGV4cHJlc3Npb247XG5cblx0XHR0aGlzLmRpY3QgPSBkaWN0O1xuXHRcdHRoaXMudG1wbHMgPSB0bXBscztcblxuXHRcdHN3aXRjaChpdGVtLmtleXdvcmQpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBETyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdkbyc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YW1pVHdpZy5leHByLmNhY2hlLmV2YWwoaXRlbS5leHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU0VUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnc2V0Jzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRtID0gaXRlbS5leHByZXNzaW9uLm1hdGNoKC8oW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccyo9XFxzKiguKykvKVxuXG5cdFx0XHRcdGlmKCFtKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBpbnZhbGlkIGBzZXRgIHN0YXRlbWVudCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGRpY3RbbVsxXV0gPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChtWzJdLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQFRFWFQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnQHRleHQnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW0udmFsdWUucmVwbGFjZSh0aGlzLlZBUklBQkxFX1JFLCBmdW5jdGlvbihtYXRjaCwgZXhwcmVzc2lvbikge1xuXG5cdFx0XHRcdFx0bGV0IHZhbHVlID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHRcdHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiAnJztcblx0XHRcdFx0fSkpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSUYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnaWYnOlxuXHRcdFx0Y2FzZSAnQHJvb3QnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGl0ZW0uYmxvY2tzLmV2ZXJ5KChibG9jaykgPT4ge1xuXG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IGJsb2NrLmV4cHJlc3Npb247XG5cblx0XHRcdFx0XHRpZihleHByZXNzaW9uID09PSAnQHRydWUnIHx8IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYmxvY2subGlzdClcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgYmxvY2subGlzdFtpXSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRk9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnZm9yJzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgc3ltMTtcblx0XHRcdFx0bGV0IHN5bTI7XG5cdFx0XHRcdGxldCBleHByO1xuXG5cdFx0XHRcdG0gPSBpdGVtLmJsb2Nrc1swXS5leHByZXNzaW9uLm1hdGNoKC8oW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccyosXFxzKihbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzK2luXFxzKyguKykvKVxuXG5cdFx0XHRcdGlmKCFtKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bSA9IGl0ZW0uYmxvY2tzWzBdLmV4cHJlc3Npb24ubWF0Y2goLyhbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzK2luXFxzKyguKykvKVxuXG5cdFx0XHRcdFx0aWYoIW0pXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBpbnZhbGlkIGBmb3JgIHN0YXRlbWVudCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzeW0xID0gbVsxXTtcblx0XHRcdFx0XHRcdHN5bTIgPSBudWxsO1xuXHRcdFx0XHRcdFx0ZXhwciA9IG1bMl07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHN5bTEgPSBtWzFdO1xuXHRcdFx0XHRcdHN5bTIgPSBtWzJdO1xuXHRcdFx0XHRcdGV4cHIgPSBtWzNdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBvcmlnVmFsdWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdGNvbnN0IHR5cGVOYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9yaWdWYWx1ZSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgaXRlclZhbHVlO1xuXG5cdFx0XHRcdGlmKHR5cGVOYW1lID09PSAnW29iamVjdCBPYmplY3RdJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGl0ZXJWYWx1ZSA9IHN5bTIgPyBPYmplY3QuZW50cmllcyhvcmlnVmFsdWUpXG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICA6IE9iamVjdC5rZXlzKG9yaWdWYWx1ZSlcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aXRlclZhbHVlID0gb3JpZ1ZhbHVlO1xuXG5cdFx0XHRcdFx0aWYodHlwZU5hbWUgIT09ICdbb2JqZWN0IEFycmF5XSdcblx0XHRcdFx0XHQgICAmJlxuXHRcdFx0XHRcdCAgIHR5cGVOYW1lICE9PSAnW29iamVjdCBTdHJpbmddJ1xuXHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgcmlnaHQgb3BlcmFuZGUgbm90IGl0ZXJhYmxlJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZihzeW0yKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgcmlnaHQgb3BlcmFuZGUgbm90IGFuIG9iamVjdCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBsID0gaXRlclZhbHVlLmxlbmd0aDtcblxuXHRcdFx0XHRpZihsID4gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxldCBrID0gMHgwMDAwMDAwMDAwMDAwMDtcblxuXHRcdFx0XHRcdGNvbnN0IGxpc3QgPSBpdGVtLmJsb2Nrc1swXS5saXN0O1xuXG5cdFx0XHRcdFx0aWYoc3ltMilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMSA9IGRpY3RbKHN5bTEpXTtcblx0XHRcdFx0XHRcdGNvbnN0IG9sZDIgPSBkaWN0WyhzeW0yKV07XG5cdFx0XHRcdFx0XHRjb25zdCBvbGQzID0gZGljdFsnbG9vcCddO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGljdC5sb29wID0ge2xlbmd0aDogbCwgcGFyZW50OiBkaWN0Wydsb29wJ119O1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Zm9yKGNvbnN0IFtrZXksIHZhbF0gb2YgaXRlclZhbHVlKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRkaWN0W3N5bTFdID0ga2V5O1xuXHRcdFx0XHRcdFx0XHRkaWN0W3N5bTJdID0gdmFsO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5maXJzdCA9IChrID09PSAoMCAtIDApKTtcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmxhc3QgPSAoayA9PT0gKGwgLSAxKSk7XG5cblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4MCA9IGwgLSBrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXgwID0gaztcblx0XHRcdFx0XHRcdFx0aysrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AucmV2aW5kZXggPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4ID0gaztcblxuXHRcdFx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBsaXN0KVxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbGlzdFtqXSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkaWN0Wydsb29wJ10gPSBvbGQzO1xuXHRcdFx0XHRcdFx0ZGljdFsoc3ltMildID0gb2xkMjtcblx0XHRcdFx0XHRcdGRpY3RbKHN5bTEpXSA9IG9sZDE7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNvbnN0IG9sZDEgPSBkaWN0WyhzeW0xKV07XG5cdFx0XHRcdFx0XHRjb25zdCBvbGQyID0gZGljdFsnbG9vcCddO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGljdC5sb29wID0ge2xlbmd0aDogbCwgcGFyZW50OiBkaWN0Wydsb29wJ119O1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Zm9yKGNvbnN0IHZhbCBvZiBpdGVyVmFsdWUpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGRpY3Rbc3ltMV0gPSB2YWw7XG5cblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmZpcnN0ID0gKGsgPT09ICgwIC0gMCkpO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AubGFzdCA9IChrID09PSAobCAtIDEpKTtcblxuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AucmV2aW5kZXgwID0gbCAtIGs7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5pbmRleDAgPSBrO1xuXHRcdFx0XHRcdFx0XHRrKys7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5yZXZpbmRleCA9IGwgLSBrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXggPSBrO1xuXG5cdFx0XHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGxpc3QpXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBsaXN0W2pdLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3RbJ2xvb3AnXSA9IG9sZDI7XG5cdFx0XHRcdFx0XHRkaWN0WyhzeW0xKV0gPSBvbGQxO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoaXRlbS5ibG9ja3MubGVuZ3RoID4gMSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRjb25zdCBsaXN0ID0gaXRlbS5ibG9ja3NbMV0ubGlzdDtcblxuXHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gbGlzdClcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbGlzdFtqXSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSU5DTFVERSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnaW5jbHVkZSc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IG1fMV8gPSBpdGVtLmV4cHJlc3Npb24sIHdpdGhfc3ViZXhwciwgd2l0aF9jb250ZXh0O1xuXG5cdFx0XHRcdC8qKi8gaWYoKG0gPSBtXzFfLm1hdGNoKC8oLispXFxzK3dpdGhcXHMrKC4rKVxccytvbmx5JC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9IG1bMl07XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZigobSA9IG1fMV8ubWF0Y2goLyguKylcXHMrd2l0aFxccysoLispJC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9IG1bMl07XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKChtID0gbV8xXy5tYXRjaCgvKC4rKVxccytvbmx5JC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9ICd7fSc7XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IG1fMV87XG5cdFx0XHRcdFx0d2l0aF9zdWJleHByID0gJ3t9Jztcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBmaWxlTmFtZSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCkgfHwgJyc7XG5cblx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZpbGVOYW1lKSAhPT0gJ1tvYmplY3QgU3RyaW5nXScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBzdHJpbmcgZXhwZWN0ZWQnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCB2YXJpYWJsZXMgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbCh3aXRoX3N1YmV4cHIsIGl0ZW0ubGluZSwgZGljdCkgfHwge307XG5cblx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhcmlhYmxlcykgIT09ICdbb2JqZWN0IE9iamVjdF0nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgb2JqZWN0IGV4cGVjdGVkJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmVzdWx0LnB1c2goYW1pVHdpZy5zdGRsaWIuaW5jbHVkZShcblx0XHRcdFx0XHRmaWxlTmFtZSxcblx0XHRcdFx0XHR2YXJpYWJsZXMsXG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0LFxuXHRcdFx0XHRcdGZhbHNlXG5cdFx0XHRcdCkpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlbmRlcjogZnVuY3Rpb24odG1wbCwgZGljdCA9IHt9LCB0bXBscyA9IHt9KVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHRzd2l0Y2goT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRtcGwpKVxuXHRcdHtcblx0XHRcdGNhc2UgJ1tvYmplY3QgU3RyaW5nXSc6XG5cdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIG5ldyBhbWlUd2lnLnRtcGwuQ29tcGlsZXIodG1wbCkucm9vdE5vZGUsIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ1tvYmplY3QgT2JqZWN0XSc6XG5cdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIC8qLS0tLS0tLS0tLS0tLS0qL3RtcGwvKi0tLS0tLS0tLS0tLS0tKi8sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5jYWNoZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5jYWNoZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkaWN0OiB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGV2YWw6IGZ1bmN0aW9uKGV4cHJlc3Npb24sIGxpbmUsIF8pXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgZjtcblxuXHRcdGlmKGV4cHJlc3Npb24gaW4gdGhpcy5kaWN0KVxuXHRcdHtcblx0XHRcdGYgPSB0aGlzLmRpY3RbZXhwcmVzc2lvbl07XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRmID0gdGhpcy5kaWN0W2V4cHJlc3Npb25dID0gZXZhbChcblx0XHRcdFx0YW1pVHdpZy5leHByLmludGVycHJldGVyLmdldEpTKFxuXHRcdFx0XHRcdG5ldyBhbWlUd2lnLmV4cHIuQ29tcGlsZXIoZXhwcmVzc2lvbiwgbGluZSlcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighXykgXyA9IHt9O1xuXG5cdFx0cmV0dXJuIGYuY2FsbChfLCBfKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuc3RkbGliICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuc3RkbGliID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBWQVJJQUJMRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc1VuZGVmaW5lZCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCA9PT0gdW5kZWZpbmVkO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzRGVmaW5lZCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCAhPT0gdW5kZWZpbmVkO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTnVsbCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCA9PT0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc05vdE51bGwnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggIT09IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNFbXB0eSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRpZih4ID09PSBudWxsXG5cdFx0ICAgfHxcblx0XHQgICB4ID09PSBmYWxzZVxuXHRcdCAgIHx8XG5cdFx0ICAgeCA9PT0gKCgnJykpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgdHlwZU5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCk7XG5cblx0XHRyZXR1cm4gKHR5cGVOYW1lID09PSAnW29iamVjdCBBcnJheV0nICYmIHgubGVuZ3RoID09PSAwKVxuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICAodHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nICYmIE9iamVjdC5rZXlzKHgpLmxlbmd0aCA9PT0gMClcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNOdW1iZXInOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgTnVtYmVyXSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNTdHJpbmcnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNBcnJheSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcnJheV0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzT2JqZWN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzSXRlcmFibGUnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0Y29uc3QgdHlwZU5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCk7XG5cblx0XHRyZXR1cm4gdHlwZU5hbWUgPT09ICdbb2JqZWN0IFN0cmluZ10nXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHR5cGVOYW1lID09PSAnW29iamVjdCBBcnJheV0nXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHR5cGVOYW1lID09PSAnW29iamVjdCBPYmplY3RdJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0V2ZW4nOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNOdW1iZXIoeCkgJiYgKHggJiAxKSA9PT0gMDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc09kZCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc051bWJlcih4KSAmJiAoeCAmIDEpID09PSAxO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIElURVJBQkxFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzSW5PYmplY3QnOiBmdW5jdGlvbih4LCB5KVxuXHR7XG5cdFx0aWYodGhpcy5pc0FycmF5KHkpXG5cdFx0ICAgfHxcblx0XHQgICB0aGlzLmlzU3RyaW5nKHkpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHkuaW5kZXhPZih4KSA+PSAwO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNPYmplY3QoeSkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHggaW4geTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNJblJhbmdlJzogZnVuY3Rpb24oeCwgeDEsIHgyKVxuXHR7XG5cdFx0aWYodGhpcy5pc051bWJlcih4MSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNOdW1iZXIoeDIpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuICgvKi0tLSoveC8qLS0tKi8gPj0gLyotLS0qL3gxLyotLS0qLylcblx0XHRcdCAgICAgICAmJlxuXHRcdFx0ICAgICAgICgvKi0tLSoveC8qLS0tKi8gPD0gLyotLS0qL3gyLyotLS0qLylcblx0XHRcdDtcblx0XHR9XG5cblx0XHRpZih0aGlzLmlzU3RyaW5nKHgxKSAmJiB4MS5sZW5ndGggPT09IDFcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoeDIpICYmIHgyLmxlbmd0aCA9PT0gMVxuXHRcdCApIHtcblx0XHRcdHJldHVybiAoeC5jaGFyQ29kZUF0KDApID49IHgxLmNoYXJDb2RlQXQoMCkpXG5cdFx0XHQgICAgICAgJiZcblx0XHRcdCAgICAgICAoeC5jaGFyQ29kZUF0KDApIDw9IHgyLmNoYXJDb2RlQXQoMCkpXG5cdFx0XHQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J3JhbmdlJzogZnVuY3Rpb24oeDEsIHgyLCBzdGVwID0gMSlcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0LyoqLyBpZih0aGlzLmlzTnVtYmVyKHgxKVxuXHRcdCAgICAgICAgJiZcblx0XHQgICAgICAgIHRoaXMuaXNOdW1iZXIoeDIpXG5cdFx0ICkge1xuXHRcdFx0Zm9yKGxldCBpID0gLyotLS0qL3gxLyotLS0qLzsgaSA8PSAvKi0tLSoveDIvKi0tLSovOyBpICs9IHN0ZXApXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKC8qLS0tLS0tLS0tLS0tLS0tKi8oaSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmKHRoaXMuaXNTdHJpbmcoeDEpICYmIHgxLmxlbmd0aCA9PT0gMVxuXHRcdCAgICAgICAgJiZcblx0XHQgICAgICAgIHRoaXMuaXNTdHJpbmcoeDIpICYmIHgyLmxlbmd0aCA9PT0gMVxuXHRcdCApIHtcblx0XHRcdGZvcihsZXQgaSA9IHgxLmNoYXJDb2RlQXQoMCk7IGkgPD0geDIuY2hhckNvZGVBdCgwKTsgaSArPSBzdGVwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sZW5ndGgnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyh4KVxuXHRcdCAgIHx8XG5cdFx0ICAgdGhpcy5pc0FycmF5KHgpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHgubGVuZ3RoO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNPYmplY3QoeCkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIE9iamVjdC5rZXlzKHgpLmxlbmd0aDtcblx0XHR9XG5cblx0XHRyZXR1cm4gMDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfZmlyc3QnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLmlzU3RyaW5nKHgpIHx8IHRoaXMuaXNBcnJheSh4KSkgJiYgeC5sZW5ndGggPiAwID8geFsweDAwMDAwMDAwMDBdIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2xhc3QnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLmlzU3RyaW5nKHgpIHx8IHRoaXMuaXNBcnJheSh4KSkgJiYgeC5sZW5ndGggPiAwID8geFt4Lmxlbmd0aCAtIDFdIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NsaWNlJzogZnVuY3Rpb24oeCwgaWR4MSwgaWR4Milcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpID8geC5zbGljZShpZHgxLCBpZHgyKSA6IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX21lcmdlJzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRoaXMuaXNTdHJpbmcoYXJndW1lbnRzWzBdKSlcblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgTCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFyZ3VtZW50cylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGl0ZW0gPSBhcmd1bWVudHNbaV07XG5cblx0XHRcdFx0XHRpZighdGhpcy5pc1N0cmluZyhpdGVtKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRMLnB1c2goYXJndW1lbnRzW2ldKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBMLmpvaW4oJycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNBcnJheShpdGVtKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBpdGVtKSBMLnB1c2goaXRlbVtqXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gTDtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRoaXMuaXNPYmplY3QoYXJndW1lbnRzWzBdKSlcblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgRCA9IHt9O1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFyZ3VtZW50cylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGl0ZW0gPSBhcmd1bWVudHNbaV07XG5cblx0XHRcdFx0XHRpZighdGhpcy5pc09iamVjdChpdGVtKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBpdGVtKSBEW2pdID0gaXRlbVtqXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBEO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfc29ydCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5zb3J0KCkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfcmV2ZXJzZSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5yZXZlcnNlKCkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfam9pbic6IGZ1bmN0aW9uKHgsIHNlcClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4LmpvaW4oc2VwKSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9rZXlzJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzT2JqZWN0KHgpID8gT2JqZWN0LmtleXMoeCkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfY29sdW1uJzogZnVuY3Rpb24oeCwga2V5KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHgubWFwKCh2YWwpID0+IHZhbFtrZXldKSA6IFtdO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9iYXRjaCc6IGZ1bmN0aW9uKHgsIG4sIG1pc3NpbmcgPSAnJylcblx0e1xuXHQgICAgY29uc3QgcmVzdWx0ID0gW107XG5cblx0XHRpZih0aGlzLmlzQXJyYXkoeClcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNOdW1iZXIobilcblx0XHQgKSB7XG5cdFx0IFx0bGV0IGxhc3Q7XG5cblx0XHRcdGNvbnN0IGwgPSB4Lmxlbmd0aDtcblxuXHRcdFx0Y29uc3QgbSA9IE1hdGguY2VpbChsIC8gbikgKiBuO1xuXG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSArPSBuKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQucHVzaChsYXN0ID0geC5zbGljZShpLCBpICsgbikpO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IobGV0IGkgPSBsOyBpIDwgbTsgaSArPSAxKVxuXHRcdFx0e1xuXHRcdFx0XHRsYXN0LnB1c2gobWlzc2luZyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBTVFJJTkdTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdzdGFydHNXaXRoJzogZnVuY3Rpb24oczEsIHMyKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzMSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoczIpXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgYmFzZSA9IDB4MDAwMDAwMDAwMDAwMDAwMDAwMDtcblxuXHRcdFx0cmV0dXJuIHMxLmluZGV4T2YoczIsIGJhc2UpID09PSBiYXNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdlbmRzV2l0aCc6IGZ1bmN0aW9uKHMxLCBzMilcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoczEpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHMyKVxuXHRcdCApIHtcblx0XHRcdGNvbnN0IGJhc2UgPSBzMS5sZW5ndGggLSBzMi5sZW5ndGg7XG5cblx0XHRcdHJldHVybiBzMS5pbmRleE9mKHMyLCBiYXNlKSA9PT0gYmFzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnbWF0Y2gnOiBmdW5jdGlvbihzLCByZWdleClcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoKChzKSkpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHJlZ2V4KVxuXHRcdCApIHtcblx0XHRcdGNvbnN0IGlkeDEgPSByZWdleC4gIGluZGV4T2YgICgnLycpO1xuXHRcdFx0Y29uc3QgaWR4MiA9IHJlZ2V4Lmxhc3RJbmRleE9mKCcvJyk7XG5cblx0XHRcdGlmKGlkeDEgPT09IDAgfHwgaWR4MSA8IGlkeDIpXG5cdFx0XHR7XG5cdFx0XHRcdHRyeVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBSZWdFeHAocmVnZXguc3Vic3RyaW5nKGlkeDEgKyAxLCBpZHgyKSwgcmVnZXguc3Vic3RyaW5nKGlkeDIgKyAxKSkudGVzdChzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaChlcnIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvKiBJR05PUkUgKi9cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfZGVmYXVsdCc6IGZ1bmN0aW9uKHMxLCBzMilcblx0e1xuXHRcdHJldHVybiBzMSB8fCBzMiB8fCAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbG93ZXInOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnRvTG93ZXJDYXNlKCkgOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdXBwZXInOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnRvVXBwZXJDYXNlKCkgOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfY2FwaXRhbGl6ZSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMpKVxuXHRcdHtcblx0XHRcdHJldHVybiBzLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL15cXFMvZywgZnVuY3Rpb24oYykge1xuXG5cdFx0XHRcdHJldHVybiBjLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3RpdGxlJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcocykpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHMudHJpbSgpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvKD86XnxcXHMpXFxTL2csIGZ1bmN0aW9uKGMpIHtcblxuXHRcdFx0XHRyZXR1cm4gYy50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl90cmltJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy50cmltKClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J19yZXBsYWNlJzogZnVuY3Rpb24ocywgb2xkU3RycywgbmV3U3Rycylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0Y29uc3QgbCA9ICgoKHMpKSkubGVuZ3RoO1xuXHRcdGNvbnN0IG0gPSBvbGRTdHJzLmxlbmd0aDtcblx0XHRjb25zdCBuID0gbmV3U3Rycy5sZW5ndGg7XG5cblx0XHRpZihtICE9IG4pXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHR9XG5cbl9fbDA6XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSArPSAwKVxuXHRcdHtcblx0XHRcdGNvbnN0IHAgPSBzLnN1YnN0cmluZyhpKTtcblxuXHRcdFx0Zm9yKGxldCBqID0gMDsgaiA8IG07IGogKz0gMSlcblx0XHRcdHtcblx0XHRcdFx0aWYocC5pbmRleE9mKG9sZFN0cnNbal0pID09PSAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gobmV3U3Ryc1tqXSk7XG5cblx0XHRcdFx0XHRpICs9IG9sZFN0cnNbal0ubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Y29udGludWUgX19sMDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXN1bHQucHVzaChzLmNoYXJBdChpKyspKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J190ZXh0VG9IdG1sWCc6IFsnJicgICAgLCAnXCInICAgICAsICc8JyAgICwgJz4nICAgXSxcblx0J190ZXh0VG9IdG1sWSc6IFsnJmFtcDsnLCAnJnF1b3Q7JywgJyZsdDsnLCAnJmd0OyddLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J190ZXh0VG9TdHJpbmdYJzogWydcXFxcJyAgLCAnXFxuJyAsICdcIicgICwgJ1xcJycgIF0sXG5cdCdfdGV4dFRvU3RyaW5nWSc6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXFwiJywgJ1xcXFxcXCcnXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfdGV4dFRvSnNvblN0cmluZ1gnOiBbJ1xcXFwnICAsICdcXG4nICwgJ1wiJyAgXSxcblx0J190ZXh0VG9Kc29uU3RyaW5nWSc6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXFwiJ10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2VzY2FwZSc6IGZ1bmN0aW9uKHMsIG1vZGUpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMpKVxuXHRcdHtcblx0XHRcdHN3aXRjaChtb2RlIHx8ICdodG1sJylcblx0XHRcdHtcblx0XHRcdFx0Y2FzZSAnaHRtbCc6XG5cdFx0XHRcdGNhc2UgJ2h0bWxfYXR0cic6XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3JlcGxhY2UocywgdGhpcy5fdGV4dFRvSHRtbFgsIHRoaXMuX3RleHRUb0h0bWxZKTtcblxuXHRcdFx0XHRjYXNlICdqcyc6XG5cdFx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3JlcGxhY2UocywgdGhpcy5fdGV4dFRvU3RyaW5nWCwgdGhpcy5fdGV4dFRvU3RyaW5nWSk7XG5cblx0XHRcdFx0Y2FzZSAnanNvbic6XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3JlcGxhY2UocywgdGhpcy5fdGV4dFRvSnNvblN0cmluZ1gsIHRoaXMuX3RleHRUb0pzb25TdHJpbmdZKTtcblxuXHRcdFx0XHRjYXNlICd1cmwnOlxuXHRcdFx0XHRcdHJldHVybiBlbmNvZGVVUklDb21wb25lbnQocyk7XG5cblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRyZXR1cm4gcztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3VybF9lbmNvZGUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBlbmNvZGVVUklDb21wb25lbnQocylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9ubDJicic6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMucmVwbGFjZSgvXFxuL2csICc8YnIvPicpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfcmF3JzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gc1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3JlcGxhY2UnOiBmdW5jdGlvbihzLCBkaWN0KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgJiYgdGhpcy5pc09iamVjdChkaWN0KSA/IHRoaXMuX3JlcGxhY2UocywgT2JqZWN0LmtleXMoZGljdCksIE9iamVjdC52YWx1ZXMoZGljdCkpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9zcGxpdCc6IGZ1bmN0aW9uKHMsIHNlcCwgbWF4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnNwbGl0KHNlcCwgbWF4KVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogW11cblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogTlVNQkVSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2Ficyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gTWF0aC5hYnMoeCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3JvdW5kJzogZnVuY3Rpb24oeCwgbW9kZSlcblx0e1xuXHRcdHN3aXRjaChtb2RlKVxuXHRcdHtcblx0XHRcdGNhc2UgJ2NlaWwnOlxuXHRcdFx0XHRyZXR1cm4gTWF0aC5jZWlsKHgpO1xuXG5cdFx0XHRjYXNlICdmbG9vcic6XG5cdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKHgpO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gTWF0aC5yb3VuZCh4KTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnbWluJzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgYXJncyA9IChhcmd1bWVudHMubGVuZ3RoID09PSAxKSAmJiAodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkgfHwgdGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKSA/IGFyZ3VtZW50c1swXVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhcmd1bWVudHNcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgcmVzdWx0ID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuXG5cdFx0Zm9yKGNvbnN0IGkgaW4gYXJncylcblx0XHR7XG5cdFx0XHRpZighdGhpcy5pc051bWJlcihhcmdzW2ldKSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIE51bWJlci5OYU47XG5cdFx0XHR9XG5cblx0XHRcdGlmKHJlc3VsdCA+IGFyZ3NbaV0pXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdCA9IGFyZ3NbaV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdtYXgnOiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBhcmdzID0gKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpICYmICh0aGlzLmlzQXJyYXkoYXJndW1lbnRzWzBdKSB8fCB0aGlzLmlzT2JqZWN0KGFyZ3VtZW50c1swXSkpID8gYXJndW1lbnRzWzBdXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFyZ3VtZW50c1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCByZXN1bHQgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XG5cblx0XHRmb3IoY29uc3QgaSBpbiBhcmdzKVxuXHRcdHtcblx0XHRcdGlmKCF0aGlzLmlzTnVtYmVyKGFyZ3NbaV0pKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gTnVtYmVyLk5hTjtcblx0XHRcdH1cblxuXHRcdFx0aWYocmVzdWx0IDwgYXJnc1tpXSlcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0ID0gYXJnc1tpXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFJBTkRPTSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J3JhbmRvbSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCB5ID0gTWF0aC5yYW5kb20oKTtcblxuXHRcdGlmKHgpXG5cdFx0e1xuXHRcdFx0aWYodGhpcy5pc0FycmF5KHgpXG5cdFx0XHQgICB8fFxuXHRcdFx0ICAgdGhpcy5pc09iamVjdCh4KVxuXHRcdFx0ICkge1xuXHRcdFx0IFx0Y29uc3QgWCA9IE9iamVjdC5rZXlzKHgpO1xuXG5cdFx0XHRcdHJldHVybiB4W1xuXHRcdFx0XHRcdFhbTWF0aC5mbG9vcihYLmxlbmd0aCAqIHkpXVxuXHRcdFx0XHRdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLmlzU3RyaW5nKHgpKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4geFtNYXRoLmZsb29yKHgubGVuZ3RoICogeSldO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLmlzTnVtYmVyKHgpKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih4ICogeSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0eCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoeCAqIHkpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIEpTT04gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9qc29uX2VuY29kZSc6IGZ1bmN0aW9uKHgsIGluZGVudClcblx0e1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh4LCBudWxsLCB0aGlzLmlzTnVtYmVyKGluZGVudCkgPyBpbmRlbnQgOiAyKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfanNvbl9qc3BhdGgnOiBmdW5jdGlvbih4LCBwYXRoKVxuXHR7XG5cdFx0cmV0dXJuIHR5cGVvZiBKU1BhdGggIT09ICd1bmRlZmluZWQnID8gSlNQYXRoLmFwcGx5KHBhdGgsIHgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogW11cblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVEVNUExBVEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaW5jbHVkZSc6IGZ1bmN0aW9uKGZpbGVOYW1lLCB2YXJpYWJsZXMgPSB7fSwgd2l0aENvbnRleHQgPSB0cnVlLCBpZ25vcmVNaXNzaW5nID0gZmFsc2UpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihmaWxlTmFtZSBpbiBhbWlUd2lnLmVuZ2luZS50bXBscylcblx0XHR7XG5cdFx0XHRjb25zdCB0ZW1wID0ge307XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih3aXRoQ29udGV4dClcblx0XHRcdHtcblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYW1pVHdpZy5lbmdpbmUuZGljdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRlbXBbaV0gPSBhbWlUd2lnLmVuZ2luZS5kaWN0W2ldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih2YXJpYWJsZXMpXG5cdFx0XHR7XG5cdFx0XHRcdGZvcihjb25zdCBpIGluIC8qLSovdmFyaWFibGVzLyotKi8pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZW1wW2ldID0gLyotKi92YXJpYWJsZXMvKi0qL1tpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0cmV0dXJuIGFtaVR3aWcuZW5naW5lLnJlbmRlcihhbWlUd2lnLmVuZ2luZS50bXBsc1tmaWxlTmFtZV0sIHRlbXApO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighaWdub3JlTWlzc2luZylcblx0XHR7XG5cdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgY291bGQgbm90IG9wZW4gYCcgKyBmaWxlTmFtZSArICdgJztcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnN0ZGxpYi5maWx0ZXJfZSA9IGFtaVR3aWcuc3RkbGliLmZpbHRlcl9lc2NhcGU7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2dldEpTOiBmdW5jdGlvbihub2RlKVxuXHR7XG5cdFx0bGV0IEw7XG5cdFx0bGV0IHg7XG5cdFx0bGV0IGxlZnQ7XG5cdFx0bGV0IHJpZ2h0O1xuXHRcdGxldCBvcGVyYXRvcjtcblxuXHRcdHN3aXRjaChub2RlLm5vZGVUeXBlKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogTFNUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxTVDpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKC8qLS0tLS0qLyB0aGlzLl9nZXRKUyhub2RlLmxpc3RbaV0pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuICdbJyArIEwuam9pbignLCcpICsgJ10nO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERJQyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ESUM6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUuZGljdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaChpICsgJzonICsgdGhpcy5fZ2V0SlMobm9kZS5kaWN0W2ldKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiAneycgKyBMLmpvaW4oJywnKSArICd9JztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGVU4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRlVOOlxuXHRcdCBcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdCBcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuIG5vZGUubm9kZVZhbHVlICsgJygnICsgTC5qb2luKCcsJykgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogVkFSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUjpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKCdbJyArIHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkgKyAnXScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gTC5sZW5ndGggPiAwID8gbm9kZS5ub2RlVmFsdWUgKyBMLmpvaW4oJycpIDogbm9kZS5ub2RlVmFsdWU7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogVEVSTUlOQUwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMOlxuXG5cdFx0XHRcdHJldHVybiBub2RlLm5vZGVWYWx1ZTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSVM6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXG5cdFx0XHRcdHN3aXRjaChub2RlLm5vZGVSaWdodC5ub2RlVHlwZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ERUZJTkVEOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0RlZmluZWQoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTlVMTDpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNOdWxsKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVNUFRZOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0VtcHR5KCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLklURVJBQkxFOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0l0ZXJhYmxlKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVWRU46XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzRXZlbignICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5PREQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzT2RkKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHRocm93ICdpbnRlcm5hbCBlcnJvcic7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSU46XG5cblx0XHRcdFx0aWYobm9kZS5ub2RlUmlnaHQubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzSW5PYmplY3QoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR4ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cblx0XHRcdFx0XHRsZWZ0ID0gbm9kZS5ub2RlUmlnaHQubm9kZUxlZnQubm9kZVZhbHVlO1xuXHRcdFx0XHRcdHJpZ2h0ID0gbm9kZS5ub2RlUmlnaHQubm9kZVJpZ2h0Lm5vZGVWYWx1ZTtcblxuXHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNJblJhbmdlKCcgKyB4ICsgJywnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU1RBUlRTX1dJVEggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlNUQVJUU19XSVRIOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5zdGFydHNXaXRoKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRU5EU19XSVRIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVORFNfV0lUSDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuZW5kc1dpdGgoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBNQVRDSEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUzpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIubWF0Y2goJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBSQU5HRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0U6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLnJhbmdlKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRE9UICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZVZhbHVlWzBdID09PSAnLicpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gbGVmdCArICcuJyArIHJpZ2h0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBsZWZ0ICsgJ1snICsgcmlnaHQgKyAnXSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGTERJViAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRkxESVY6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ01hdGguZmxvb3IoJyArIGxlZnQgKyAnLycgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBQT1dFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVI6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ01hdGgucG93KCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRE9VQkxFX1FVRVNUSU9OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVUJMRV9RVUVTVElPTjpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnKCgnICsgbGVmdCArICcpIHx8ICgnICsgcmlnaHQgKyAnKSknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogVU5JQVJZIE9QRVJBVE9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ID09PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ICE9PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRvcGVyYXRvciA9IChub2RlLm5vZGVUeXBlICE9PSBhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkgPyBub2RlLm5vZGVWYWx1ZSA6ICchJztcblxuXHRcdFx0XHRcdHJldHVybiBvcGVyYXRvciArICcoJyArIHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KSArICcpJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKG5vZGUubm9kZUxlZnQgIT09IG51bGxcblx0XHRcdFx0ICAgJiZcblx0XHRcdFx0ICAgbm9kZS5ub2RlUmlnaHQgPT09IG51bGxcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdG9wZXJhdG9yID0gKG5vZGUubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSA/IG5vZGUubm9kZVZhbHVlIDogJyEnO1xuXG5cdFx0XHRcdFx0cmV0dXJuICcoJyArIHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpICsgJyknICsgb3BlcmF0b3I7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBCSU5BUlkgT1BFUkFUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZUxlZnQgIT09IG51bGxcblx0XHRcdFx0ICAgJiZcblx0XHRcdFx0ICAgbm9kZS5ub2RlUmlnaHQgIT09IG51bGxcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdHN3aXRjaChub2RlLm5vZGVUeXBlKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnfHwnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnJiYnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX09SOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICd8Jztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9YT1I6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJ14nO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX0FORDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnJic7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkNPTkNBVDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnKyc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSBub2RlLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRcdHJldHVybiAnKCcgKyBsZWZ0ICsgb3BlcmF0b3IgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRKUzogZnVuY3Rpb24oZXhwcilcblx0e1xuXHRcdHJldHVybiAnKGZ1bmN0aW9uKF8pIHsgcmV0dXJuICcgKyB0aGlzLl9nZXRKUyhleHByLnJvb3ROb2RlKSArICc7IH0pJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGV2YWw6IGZ1bmN0aW9uKGV4cHIsIF8pXG5cdHtcblx0XHRpZighXykgXyA9IHt9O1xuXG5cdFx0cmV0dXJuIGV2YWwodGhpcy5nZXRKUyhleHByKSkuY2FsbChfLCBfKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIoZnVuY3Rpb24oKSB7XG5cbnZhciBTWU5UQVggPSB7XG4gICAgICAgIFBBVEggICAgICAgICAgICA6IDEsXG4gICAgICAgIFNFTEVDVE9SICAgICAgICA6IDIsXG4gICAgICAgIE9CSl9QUkVEICAgICAgICA6IDMsXG4gICAgICAgIFBPU19QUkVEICAgICAgICA6IDQsXG4gICAgICAgIExPR0lDQUxfRVhQUiAgICA6IDUsXG4gICAgICAgIENPTVBBUklTT05fRVhQUiA6IDYsXG4gICAgICAgIE1BVEhfRVhQUiAgICAgICA6IDcsXG4gICAgICAgIENPTkNBVF9FWFBSICAgICA6IDgsXG4gICAgICAgIFVOQVJZX0VYUFIgICAgICA6IDksXG4gICAgICAgIFBPU19FWFBSICAgICAgICA6IDEwLFxuICAgICAgICBMSVRFUkFMICAgICAgICAgOiAxMVxuICAgIH07XG5cbi8vIHBhcnNlclxuXG52YXIgcGFyc2UgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgVE9LRU4gPSB7XG4gICAgICAgICAgICBJRCAgICA6IDEsXG4gICAgICAgICAgICBOVU0gICA6IDIsXG4gICAgICAgICAgICBTVFIgICA6IDMsXG4gICAgICAgICAgICBCT09MICA6IDQsXG4gICAgICAgICAgICBOVUxMICA6IDUsXG4gICAgICAgICAgICBQVU5DVCA6IDYsXG4gICAgICAgICAgICBFT1AgICA6IDdcbiAgICAgICAgfSxcbiAgICAgICAgTUVTU0FHRVMgPSB7XG4gICAgICAgICAgICBVTkVYUF9UT0tFTiA6ICdVbmV4cGVjdGVkIHRva2VuIFwiJTBcIicsXG4gICAgICAgICAgICBVTkVYUF9FT1AgICA6ICdVbmV4cGVjdGVkIGVuZCBvZiBwYXRoJ1xuICAgICAgICB9O1xuXG4gICAgdmFyIHBhdGgsIGlkeCwgYnVmLCBsZW47XG5cbiAgICBmdW5jdGlvbiBwYXJzZShfcGF0aCkge1xuICAgICAgICBwYXRoID0gX3BhdGguc3BsaXQoJycpO1xuICAgICAgICBpZHggPSAwO1xuICAgICAgICBidWYgPSBudWxsO1xuICAgICAgICBsZW4gPSBwYXRoLmxlbmd0aDtcblxuICAgICAgICB2YXIgcmVzID0gcGFyc2VQYXRoQ29uY2F0RXhwcigpLFxuICAgICAgICAgICAgdG9rZW4gPSBsZXgoKTtcblxuICAgICAgICBpZih0b2tlbi50eXBlICE9PSBUT0tFTi5FT1ApIHtcbiAgICAgICAgICAgIHRocm93VW5leHBlY3RlZCh0b2tlbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUGF0aENvbmNhdEV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VQYXRoQ29uY2F0UGFydEV4cHIoKSxcbiAgICAgICAgICAgIG9wZXJhbmRzO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCd8JykpIHtcbiAgICAgICAgICAgIGxleCgpO1xuICAgICAgICAgICAgKG9wZXJhbmRzIHx8IChvcGVyYW5kcyA9IFtleHByXSkpLnB1c2gocGFyc2VQYXRoQ29uY2F0UGFydEV4cHIoKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3BlcmFuZHM/XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5DT05DQVRfRVhQUixcbiAgICAgICAgICAgICAgICBhcmdzIDogb3BlcmFuZHNcbiAgICAgICAgICAgIH0gOlxuICAgICAgICAgICAgZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBhdGhDb25jYXRQYXJ0RXhwcigpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoKCcoJyk/XG4gICAgICAgICAgICBwYXJzZVBhdGhHcm91cEV4cHIoKSA6XG4gICAgICAgICAgICBwYXJzZVBhdGgoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBhdGhHcm91cEV4cHIoKSB7XG4gICAgICAgIGV4cGVjdCgnKCcpO1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlUGF0aENvbmNhdEV4cHIoKTtcbiAgICAgICAgZXhwZWN0KCcpJyk7XG5cbiAgICAgICAgdmFyIHBhcnRzID0gW10sXG4gICAgICAgICAgICBwYXJ0O1xuICAgICAgICB3aGlsZSgocGFydCA9IHBhcnNlUHJlZGljYXRlKCkpKSB7XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHBhcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXBhcnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihleHByLnR5cGUgPT09IFNZTlRBWC5QQVRIKSB7XG4gICAgICAgICAgICBleHByLnBhcnRzID0gZXhwci5wYXJ0cy5jb25jYXQocGFydHMpO1xuICAgICAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJ0cy51bnNoaWZ0KGV4cHIpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlICA6IFNZTlRBWC5QQVRILFxuICAgICAgICAgICAgcGFydHMgOiBwYXJ0c1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUHJlZGljYXRlKCkge1xuICAgICAgICBpZihtYXRjaCgnWycpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VQb3NQcmVkaWNhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1hdGNoKCd7JykpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZU9iamVjdFByZWRpY2F0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWF0Y2goJygnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlUGF0aEdyb3VwRXhwcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQYXRoKCkge1xuICAgICAgICBpZighbWF0Y2hQYXRoKCkpIHtcbiAgICAgICAgICAgIHRocm93VW5leHBlY3RlZChsZXgoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZnJvbVJvb3QgPSBmYWxzZSxcbiAgICAgICAgICAgIHN1YnN0O1xuXG4gICAgICAgIGlmKG1hdGNoKCdeJykpIHtcbiAgICAgICAgICAgIGxleCgpO1xuICAgICAgICAgICAgZnJvbVJvb3QgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYobWF0Y2hTdWJzdCgpKSB7XG4gICAgICAgICAgICBzdWJzdCA9IGxleCgpLnZhbC5zdWJzdHIoMSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGFydHMgPSBbXSxcbiAgICAgICAgICAgIHBhcnQ7XG4gICAgICAgIHdoaWxlKChwYXJ0ID0gcGFyc2VQYXRoUGFydCgpKSkge1xuICAgICAgICAgICAgcGFydHMucHVzaChwYXJ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlICAgICA6IFNZTlRBWC5QQVRILFxuICAgICAgICAgICAgZnJvbVJvb3QgOiBmcm9tUm9vdCxcbiAgICAgICAgICAgIHN1YnN0ICAgIDogc3Vic3QsXG4gICAgICAgICAgICBwYXJ0cyAgICA6IHBhcnRzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQYXRoUGFydCgpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoU2VsZWN0b3IoKT9cbiAgICAgICAgICAgIHBhcnNlU2VsZWN0b3IoKSA6XG4gICAgICAgICAgICBwYXJzZVByZWRpY2F0ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlU2VsZWN0b3IoKSB7XG4gICAgICAgIHZhciBzZWxlY3RvciA9IGxleCgpLnZhbCxcbiAgICAgICAgICAgIHRva2VuID0gbG9va2FoZWFkKCksXG4gICAgICAgICAgICBwcm9wO1xuXG4gICAgICAgIGlmKG1hdGNoKCcqJykgfHwgdG9rZW4udHlwZSA9PT0gVE9LRU4uSUQgfHwgdG9rZW4udHlwZSA9PT0gVE9LRU4uU1RSKSB7XG4gICAgICAgICAgICBwcm9wID0gbGV4KCkudmFsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgICAgIDogU1lOVEFYLlNFTEVDVE9SLFxuICAgICAgICAgICAgc2VsZWN0b3IgOiBzZWxlY3RvcixcbiAgICAgICAgICAgIHByb3AgICAgIDogcHJvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUG9zUHJlZGljYXRlKCkge1xuICAgICAgICBleHBlY3QoJ1snKTtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZVBvc0V4cHIoKTtcbiAgICAgICAgZXhwZWN0KCddJyk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguUE9TX1BSRUQsXG4gICAgICAgICAgICBhcmcgIDogZXhwclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlT2JqZWN0UHJlZGljYXRlKCkge1xuICAgICAgICBleHBlY3QoJ3snKTtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZUxvZ2ljYWxPUkV4cHIoKTtcbiAgICAgICAgZXhwZWN0KCd9Jyk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguT0JKX1BSRUQsXG4gICAgICAgICAgICBhcmcgIDogZXhwclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlTG9naWNhbE9SRXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZUxvZ2ljYWxBTkRFeHByKCksXG4gICAgICAgICAgICBvcGVyYW5kcztcblxuICAgICAgICB3aGlsZShtYXRjaCgnfHwnKSkge1xuICAgICAgICAgICAgbGV4KCk7XG4gICAgICAgICAgICAob3BlcmFuZHMgfHwgKG9wZXJhbmRzID0gW2V4cHJdKSkucHVzaChwYXJzZUxvZ2ljYWxBTkRFeHByKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wZXJhbmRzP1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguTE9HSUNBTF9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiAnfHwnLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBvcGVyYW5kc1xuICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlTG9naWNhbEFOREV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VFcXVhbGl0eUV4cHIoKSxcbiAgICAgICAgICAgIG9wZXJhbmRzO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCcmJicpKSB7XG4gICAgICAgICAgICBsZXgoKTtcbiAgICAgICAgICAgIChvcGVyYW5kcyB8fCAob3BlcmFuZHMgPSBbZXhwcl0pKS5wdXNoKHBhcnNlRXF1YWxpdHlFeHByKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wZXJhbmRzP1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguTE9HSUNBTF9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiAnJiYnLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBvcGVyYW5kc1xuICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlRXF1YWxpdHlFeHByKCkge1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlUmVsYXRpb25hbEV4cHIoKTtcblxuICAgICAgICB3aGlsZShcbiAgICAgICAgICAgIG1hdGNoKCc9PScpIHx8IG1hdGNoKCchPScpIHx8IG1hdGNoKCc9PT0nKSB8fCBtYXRjaCgnIT09JykgfHxcbiAgICAgICAgICAgIG1hdGNoKCdePT0nKSB8fCBtYXRjaCgnPT1eJykgfHxtYXRjaCgnXj0nKSB8fCBtYXRjaCgnPV4nKSB8fFxuICAgICAgICAgICAgbWF0Y2goJyQ9PScpIHx8IG1hdGNoKCc9PSQnKSB8fCBtYXRjaCgnJD0nKSB8fCBtYXRjaCgnPSQnKSB8fFxuICAgICAgICAgICAgbWF0Y2goJyo9PScpIHx8IG1hdGNoKCc9PSonKXx8IG1hdGNoKCcqPScpIHx8IG1hdGNoKCc9KicpXG4gICAgICAgICkge1xuICAgICAgICAgICAgZXhwciA9IHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLkNPTVBBUklTT05fRVhQUixcbiAgICAgICAgICAgICAgICBvcCAgIDogbGV4KCkudmFsLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBbZXhwciwgcGFyc2VFcXVhbGl0eUV4cHIoKV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVJlbGF0aW9uYWxFeHByKCkge1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlQWRkaXRpdmVFeHByKCk7XG5cbiAgICAgICAgd2hpbGUobWF0Y2goJzwnKSB8fCBtYXRjaCgnPicpIHx8IG1hdGNoKCc8PScpIHx8IG1hdGNoKCc+PScpKSB7XG4gICAgICAgICAgICBleHByID0ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguQ09NUEFSSVNPTl9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiBsZXgoKS52YWwsXG4gICAgICAgICAgICAgICAgYXJncyA6IFtleHByLCBwYXJzZVJlbGF0aW9uYWxFeHByKCldXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VBZGRpdGl2ZUV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VNdWx0aXBsaWNhdGl2ZUV4cHIoKTtcblxuICAgICAgICB3aGlsZShtYXRjaCgnKycpIHx8IG1hdGNoKCctJykpIHtcbiAgICAgICAgICAgIGV4cHIgPSB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5NQVRIX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6IGxleCgpLnZhbCxcbiAgICAgICAgICAgICAgICBhcmdzIDogW2V4cHIsIHBhcnNlTXVsdGlwbGljYXRpdmVFeHByKCldXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VNdWx0aXBsaWNhdGl2ZUV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VVbmFyeUV4cHIoKTtcblxuICAgICAgICB3aGlsZShtYXRjaCgnKicpIHx8IG1hdGNoKCcvJykgfHwgbWF0Y2goJyUnKSkge1xuICAgICAgICAgICAgZXhwciA9IHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLk1BVEhfRVhQUixcbiAgICAgICAgICAgICAgICBvcCAgIDogbGV4KCkudmFsLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBbZXhwciwgcGFyc2VNdWx0aXBsaWNhdGl2ZUV4cHIoKV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBvc0V4cHIoKSB7XG4gICAgICAgIGlmKG1hdGNoKCc6JykpIHtcbiAgICAgICAgICAgIGxleCgpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFNZTlRBWC5QT1NfRVhQUixcbiAgICAgICAgICAgICAgICB0b0lkeCA6IHBhcnNlVW5hcnlFeHByKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZnJvbUV4cHIgPSBwYXJzZVVuYXJ5RXhwcigpO1xuICAgICAgICBpZihtYXRjaCgnOicpKSB7XG4gICAgICAgICAgICBsZXgoKTtcbiAgICAgICAgICAgIGlmKG1hdGNoKCddJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICAgIDogU1lOVEFYLlBPU19FWFBSLFxuICAgICAgICAgICAgICAgICAgICBmcm9tSWR4IDogZnJvbUV4cHJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgICAgOiBTWU5UQVguUE9TX0VYUFIsXG4gICAgICAgICAgICAgICAgZnJvbUlkeCA6IGZyb21FeHByLFxuICAgICAgICAgICAgICAgIHRvSWR4ICAgOiBwYXJzZVVuYXJ5RXhwcigpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguUE9TX0VYUFIsXG4gICAgICAgICAgICBpZHggIDogZnJvbUV4cHJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVVuYXJ5RXhwcigpIHtcbiAgICAgICAgaWYobWF0Y2goJyEnKSB8fCBtYXRjaCgnLScpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguVU5BUllfRVhQUixcbiAgICAgICAgICAgICAgICBvcCAgIDogbGV4KCkudmFsLFxuICAgICAgICAgICAgICAgIGFyZyAgOiBwYXJzZVVuYXJ5RXhwcigpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcnNlUHJpbWFyeUV4cHIoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVByaW1hcnlFeHByKCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBsb29rYWhlYWQoKSxcbiAgICAgICAgICAgIHR5cGUgPSB0b2tlbi50eXBlO1xuXG4gICAgICAgIGlmKHR5cGUgPT09IFRPS0VOLlNUUiB8fCB0eXBlID09PSBUT0tFTi5OVU0gfHwgdHlwZSA9PT0gVE9LRU4uQk9PTCB8fCB0eXBlID09PSBUT0tFTi5OVUxMKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguTElURVJBTCxcbiAgICAgICAgICAgICAgICB2YWwgIDogbGV4KCkudmFsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWF0Y2hQYXRoKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVBhdGgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1hdGNoKCcoJykpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUdyb3VwRXhwcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRocm93VW5leHBlY3RlZChsZXgoKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VHcm91cEV4cHIoKSB7XG4gICAgICAgIGV4cGVjdCgnKCcpO1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlTG9naWNhbE9SRXhwcigpO1xuICAgICAgICBleHBlY3QoJyknKTtcblxuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaCh2YWwpIHtcbiAgICAgICAgdmFyIHRva2VuID0gbG9va2FoZWFkKCk7XG4gICAgICAgIHJldHVybiB0b2tlbi50eXBlID09PSBUT0tFTi5QVU5DVCAmJiB0b2tlbi52YWwgPT09IHZhbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaFBhdGgoKSB7XG4gICAgICAgIHJldHVybiBtYXRjaFNlbGVjdG9yKCkgfHwgbWF0Y2hTdWJzdCgpIHx8IG1hdGNoKCdeJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2hTZWxlY3RvcigpIHtcbiAgICAgICAgdmFyIHRva2VuID0gbG9va2FoZWFkKCk7XG4gICAgICAgIGlmKHRva2VuLnR5cGUgPT09IFRPS0VOLlBVTkNUKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gdG9rZW4udmFsO1xuICAgICAgICAgICAgcmV0dXJuIHZhbCA9PT0gJy4nIHx8IHZhbCA9PT0gJy4uJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaFN1YnN0KCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBsb29rYWhlYWQoKTtcbiAgICAgICAgcmV0dXJuIHRva2VuLnR5cGUgPT09IFRPS0VOLklEICYmIHRva2VuLnZhbFswXSA9PT0gJyQnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4cGVjdCh2YWwpIHtcbiAgICAgICAgdmFyIHRva2VuID0gbGV4KCk7XG4gICAgICAgIGlmKHRva2VuLnR5cGUgIT09IFRPS0VOLlBVTkNUIHx8IHRva2VuLnZhbCAhPT0gdmFsKSB7XG4gICAgICAgICAgICB0aHJvd1VuZXhwZWN0ZWQodG9rZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9va2FoZWFkKCkge1xuICAgICAgICBpZihidWYgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBidWY7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcG9zID0gaWR4O1xuICAgICAgICBidWYgPSBhZHZhbmNlKCk7XG4gICAgICAgIGlkeCA9IHBvcztcblxuICAgICAgICByZXR1cm4gYnVmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkdmFuY2UoKSB7XG4gICAgICAgIHdoaWxlKGlzV2hpdGVTcGFjZShwYXRoW2lkeF0pKSB7XG4gICAgICAgICAgICArK2lkeDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGlkeCA+PSBsZW4pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5FT1AsXG4gICAgICAgICAgICAgICAgcmFuZ2UgOiBbaWR4LCBpZHhdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRva2VuID0gc2NhblB1bmN0dWF0b3IoKTtcbiAgICAgICAgaWYodG9rZW4gfHxcbiAgICAgICAgICAgICAgICAodG9rZW4gPSBzY2FuSWQoKSkgfHxcbiAgICAgICAgICAgICAgICAodG9rZW4gPSBzY2FuU3RyaW5nKCkpIHx8XG4gICAgICAgICAgICAgICAgKHRva2VuID0gc2Nhbk51bWVyaWMoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRva2VuID0geyByYW5nZSA6IFtpZHgsIGlkeF0gfTtcbiAgICAgICAgaWR4ID49IGxlbj9cbiAgICAgICAgICAgIHRva2VuLnR5cGUgPSBUT0tFTi5FT1AgOlxuICAgICAgICAgICAgdG9rZW4udmFsID0gcGF0aFtpZHhdO1xuXG4gICAgICAgIHRocm93VW5leHBlY3RlZCh0b2tlbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGV4KCkge1xuICAgICAgICB2YXIgdG9rZW47XG5cbiAgICAgICAgaWYoYnVmKSB7XG4gICAgICAgICAgICBpZHggPSBidWYucmFuZ2VbMV07XG4gICAgICAgICAgICB0b2tlbiA9IGJ1ZjtcbiAgICAgICAgICAgIGJ1ZiA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYWR2YW5jZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRGlnaXQoY2gpIHtcbiAgICAgICAgcmV0dXJuICcwMTIzNDU2Nzg5Jy5pbmRleE9mKGNoKSA+PSAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzV2hpdGVTcGFjZShjaCkge1xuICAgICAgICByZXR1cm4gJyBcXHJcXG5cXHQnLmluZGV4T2YoY2gpID4gLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNJZFN0YXJ0KGNoKSB7XG4gICAgICAgIHJldHVybiBjaCA9PT0gJyQnIHx8IGNoID09PSAnQCcgfHwgY2ggPT09ICdfJyB8fCAoY2ggPj0gJ2EnICYmIGNoIDw9ICd6JykgfHwgKGNoID49ICdBJyAmJiBjaCA8PSAnWicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzSWRQYXJ0KGNoKSB7XG4gICAgICAgIHJldHVybiBpc0lkU3RhcnQoY2gpIHx8IChjaCA+PSAnMCcgJiYgY2ggPD0gJzknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY2FuSWQoKSB7XG4gICAgICAgIHZhciBjaCA9IHBhdGhbaWR4XTtcblxuICAgICAgICBpZighaXNJZFN0YXJ0KGNoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0YXJ0ID0gaWR4LFxuICAgICAgICAgICAgaWQgPSBjaDtcblxuICAgICAgICB3aGlsZSgrK2lkeCA8IGxlbikge1xuICAgICAgICAgICAgY2ggPSBwYXRoW2lkeF07XG4gICAgICAgICAgICBpZighaXNJZFBhcnQoY2gpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZCArPSBjaDtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaChpZCkge1xuICAgICAgICAgICAgY2FzZSAndHJ1ZSc6XG4gICAgICAgICAgICBjYXNlICdmYWxzZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5CT09MLFxuICAgICAgICAgICAgICAgICAgICB2YWwgICA6IGlkID09PSAndHJ1ZScsXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHhdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY2FzZSAnbnVsbCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5OVUxMLFxuICAgICAgICAgICAgICAgICAgICB2YWwgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHhdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLklELFxuICAgICAgICAgICAgICAgICAgICB2YWwgICA6IGlkLFxuICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4XVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY2FuU3RyaW5nKCkge1xuICAgICAgICBpZihwYXRoW2lkeF0gIT09ICdcIicgJiYgcGF0aFtpZHhdICE9PSAnXFwnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9yaWcgPSBwYXRoW2lkeF0sXG4gICAgICAgICAgICBzdGFydCA9ICsraWR4LFxuICAgICAgICAgICAgc3RyID0gJycsXG4gICAgICAgICAgICBlb3NGb3VuZCA9IGZhbHNlLFxuICAgICAgICAgICAgY2g7XG5cbiAgICAgICAgd2hpbGUoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICBjaCA9IHBhdGhbaWR4KytdO1xuICAgICAgICAgICAgaWYoY2ggPT09ICdcXFxcJykge1xuICAgICAgICAgICAgICAgIGNoID0gcGF0aFtpZHgrK107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKChjaCA9PT0gJ1wiJyB8fCBjaCA9PT0gJ1xcJycpICYmIGNoID09PSBvcmlnKSB7XG4gICAgICAgICAgICAgICAgZW9zRm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyICs9IGNoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZW9zRm91bmQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFRPS0VOLlNUUixcbiAgICAgICAgICAgICAgICB2YWwgOiBzdHIsXG4gICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY2FuTnVtZXJpYygpIHtcbiAgICAgICAgdmFyIHN0YXJ0ID0gaWR4LFxuICAgICAgICAgICAgY2ggPSBwYXRoW2lkeF0sXG4gICAgICAgICAgICBpc0Zsb2F0ID0gY2ggPT09ICcuJztcblxuICAgICAgICBpZihpc0Zsb2F0IHx8IGlzRGlnaXQoY2gpKSB7XG4gICAgICAgICAgICB2YXIgbnVtID0gY2g7XG4gICAgICAgICAgICB3aGlsZSgrK2lkeCA8IGxlbikge1xuICAgICAgICAgICAgICAgIGNoID0gcGF0aFtpZHhdO1xuICAgICAgICAgICAgICAgIGlmKGNoID09PSAnLicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoaXNGbG9hdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlzRmxvYXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKCFpc0RpZ2l0KGNoKSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBudW0gKz0gY2g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5OVU0sXG4gICAgICAgICAgICAgICAgdmFsICAgOiBpc0Zsb2F0PyBwYXJzZUZsb2F0KG51bSkgOiBwYXJzZUludChudW0sIDEwKSxcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4XVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjYW5QdW5jdHVhdG9yKCkge1xuICAgICAgICB2YXIgc3RhcnQgPSBpZHgsXG4gICAgICAgICAgICBjaDEgPSBwYXRoW2lkeF0sXG4gICAgICAgICAgICBjaDIgPSBwYXRoW2lkeCArIDFdO1xuXG4gICAgICAgIGlmKGNoMSA9PT0gJy4nKSB7XG4gICAgICAgICAgICBpZihpc0RpZ2l0KGNoMikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoWysraWR4XSA9PT0gJy4nP1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICAgICAgdmFsICAgOiAnLi4nLFxuICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgKytpZHhdXG4gICAgICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgICAgICB2YWwgICA6ICcuJyxcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeF1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2gyID09PSAnPScpIHtcbiAgICAgICAgICAgIHZhciBjaDMgPSBwYXRoW2lkeCArIDJdO1xuICAgICAgICAgICAgaWYoY2gzID09PSAnPScpIHtcbiAgICAgICAgICAgICAgICBpZignPSFeJConLmluZGV4T2YoY2gxKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsICAgOiBjaDEgKyBjaDIgKyBjaDMsXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4ICs9IDNdXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZignXiQqJy5pbmRleE9mKGNoMykgPj0gMCkge1xuICAgICAgICAgICAgICAgIGlmKGNoMSA9PT0gJz0nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsICAgOiBjaDEgKyBjaDIgKyBjaDMsXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4ICs9IDNdXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZignPSFeJCo+PCcuaW5kZXhPZihjaDEpID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSArIGNoMixcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeCArPSAyXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihjaDEgPT09ICc9JyAmJiAnXiQqJy5pbmRleE9mKGNoMikgPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgIHZhbCAgIDogY2gxICsgY2gyLFxuICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHggKz0gMl1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZihjaDEgPT09IGNoMiAmJiAoY2gxID09PSAnfCcgfHwgY2gxID09PSAnJicpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgdmFsICAgOiBjaDEgKyBjaDIsXG4gICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeCArPSAyXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCc6e30oKVtdXistKi8lIT48fCcuaW5kZXhPZihjaDEpID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSxcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgKytpZHhdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGhyb3dVbmV4cGVjdGVkKHRva2VuKSB7XG4gICAgICAgIGlmKHRva2VuLnR5cGUgPT09IFRPS0VOLkVPUCkge1xuICAgICAgICAgICAgdGhyb3dFcnJvcih0b2tlbiwgTUVTU0FHRVMuVU5FWFBfRU9QKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93RXJyb3IodG9rZW4sIE1FU1NBR0VTLlVORVhQX1RPS0VOLCB0b2tlbi52YWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRocm93RXJyb3IodG9rZW4sIG1lc3NhZ2VGb3JtYXQpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpLFxuICAgICAgICAgICAgbXNnID0gbWVzc2FnZUZvcm1hdC5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIC8lKFxcZCkvZyxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihfLCBpZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFyZ3NbaWR4XSB8fCAnJztcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yKG1zZyk7XG5cbiAgICAgICAgZXJyb3IuY29sdW1uID0gdG9rZW4ucmFuZ2VbMF07XG5cbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlO1xufSkoKTtcblxuLy8gdHJhbnNsYXRvclxuXG52YXIgdHJhbnNsYXRlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGJvZHksIHZhcnMsIGxhc3RWYXJJZCwgdW51c2VkVmFycztcblxuICAgIGZ1bmN0aW9uIGFjcXVpcmVWYXIoKSB7XG4gICAgICAgIGlmKHVudXNlZFZhcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdW51c2VkVmFycy5zaGlmdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHZhck5hbWUgPSAndicgKyArK2xhc3RWYXJJZDtcbiAgICAgICAgdmFycy5wdXNoKHZhck5hbWUpO1xuICAgICAgICByZXR1cm4gdmFyTmFtZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWxlYXNlVmFycygpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsIGkgPSBhcmdzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUoaS0tKSB7XG4gICAgICAgICAgICB1bnVzZWRWYXJzLnB1c2goYXJnc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGUoYXN0KSB7XG4gICAgICAgIGJvZHkgPSBbXTtcbiAgICAgICAgdmFycyA9IFsncmVzJ107XG4gICAgICAgIGxhc3RWYXJJZCA9IDA7XG4gICAgICAgIHVudXNlZFZhcnMgPSBbXTtcblxuICAgICAgICB0cmFuc2xhdGVFeHByKGFzdCwgJ3JlcycsICdkYXRhJyk7XG5cbiAgICAgICAgYm9keS51bnNoaWZ0KFxuICAgICAgICAgICAgJ3ZhciAnLFxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheT9cbiAgICAgICAgICAgICAgICAnaXNBcnIgPSBBcnJheS5pc0FycmF5JyA6XG4gICAgICAgICAgICAgICAgJ3RvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZywgaXNBcnIgPSBmdW5jdGlvbihvKSB7IHJldHVybiB0b1N0ci5jYWxsKG8pID09PSBcIltvYmplY3QgQXJyYXldXCI7IH0nLFxuICAgICAgICAgICAgICAgICcsIGNvbmNhdCA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQnLFxuICAgICAgICAgICAgICAgICcsJywgdmFycy5qb2luKCcsJyksICc7Jyk7XG5cbiAgICAgICAgaWYoYXN0LnR5cGUgPT09IFNZTlRBWC5QQVRIKSB7XG4gICAgICAgICAgICB2YXIgbGFzdFBhcnQgPSBhc3QucGFydHNbYXN0LnBhcnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYobGFzdFBhcnQgJiYgbGFzdFBhcnQudHlwZSA9PT0gU1lOVEFYLlBPU19QUkVEICYmICdpZHgnIGluIGxhc3RQYXJ0LmFyZykge1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaCgncmVzID0gcmVzWzBdOycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYm9keS5wdXNoKCdyZXR1cm4gcmVzOycpO1xuXG4gICAgICAgIHJldHVybiBib2R5LmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZVBhdGgocGF0aCwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IHBhdGgucGFydHMsXG4gICAgICAgICAgICBpID0gMCwgbGVuID0gcGFydHMubGVuZ3RoO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgIGRlc3QsICc9JywgcGF0aC5mcm9tUm9vdD8gJ2RhdGEnIDogcGF0aC5zdWJzdD8gJ3N1YnN0LicgKyBwYXRoLnN1YnN0IDogY3R4LCAnOycsXG4gICAgICAgICAgICAnaXNBcnIoJyArIGRlc3QgKyAnKSB8fCAoJyArIGRlc3QgKyAnID0gWycgKyBkZXN0ICsgJ10pOycpO1xuXG4gICAgICAgIHdoaWxlKGkgPCBsZW4pIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gcGFydHNbaSsrXTtcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFNZTlRBWC5TRUxFQ1RPUjpcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RvciA9PT0gJy4uJz9cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZURlc2NlbmRhbnRTZWxlY3RvcihpdGVtLCBkZXN0LCBkZXN0KSA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVTZWxlY3RvcihpdGVtLCBkZXN0LCBkZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFNZTlRBWC5PQkpfUFJFRDpcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlT2JqZWN0UHJlZGljYXRlKGl0ZW0sIGRlc3QsIGRlc3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgU1lOVEFYLlBPU19QUkVEOlxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVQb3NQcmVkaWNhdGUoaXRlbSwgZGVzdCwgZGVzdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBTWU5UQVguQ09OQ0FUX0VYUFI6XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUNvbmNhdEV4cHIoaXRlbSwgZGVzdCwgZGVzdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlU2VsZWN0b3Ioc2VsLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgaWYoc2VsLnByb3ApIHtcbiAgICAgICAgICAgIHZhciBwcm9wU3RyID0gZXNjYXBlU3RyKHNlbC5wcm9wKSxcbiAgICAgICAgICAgICAgICByZXMgPSBhY3F1aXJlVmFyKCksIGkgPSBhY3F1aXJlVmFyKCksIGxlbiA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgICAgICBjdXJDdHggPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICAgICAgaiA9IGFjcXVpcmVWYXIoKSwgdmFsID0gYWNxdWlyZVZhcigpLCB0bXBBcnIgPSBhY3F1aXJlVmFyKCk7XG5cbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICByZXMsICc9IFtdOycsIGksICc9IDA7JywgbGVuLCAnPScsIGN0eCwgJy5sZW5ndGg7JywgdG1wQXJyLCAnPSBbXTsnLFxuICAgICAgICAgICAgICAgICd3aGlsZSgnLCBpLCAnPCcsIGxlbiwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgIGN1ckN0eCwgJz0nLCBjdHgsICdbJywgaSwgJysrXTsnLFxuICAgICAgICAgICAgICAgICAgICAnaWYoJywgY3VyQ3R4LCAnIT0gbnVsbCkgeycpO1xuICAgICAgICAgICAgaWYoc2VsLnByb3AgPT09ICcqJykge1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICdpZih0eXBlb2YgJywgY3VyQ3R4LCAnPT09IFwib2JqZWN0XCIpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZihpc0FycignLCBjdXJDdHgsICcpKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLCAnPScsIHJlcywgJy5jb25jYXQoJywgY3VyQ3R4LCAnKTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZWxzZSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZvcignLCBqLCAnIGluICcsIGN1ckN0eCwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWYoJywgY3VyQ3R4LCAnLmhhc093blByb3BlcnR5KCcsIGosICcpKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwsICc9JywgY3VyQ3R4LCAnWycsIGosICddOycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZUFwcGVuZFRvQXJyYXkocmVzLCB2YWwpO1xuICAgICAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnfScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsLCAnPScsIGN1ckN0eCwgJ1snLCBwcm9wU3RyLCAnXTsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZUFwcGVuZFRvQXJyYXkocmVzLCB2YWwsIHRtcEFyciwgbGVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICBkZXN0LCAnPScsIGxlbiwgJz4gMSAmJicsIHRtcEFyciwgJy5sZW5ndGg/JywgdG1wQXJyLCAnLmxlbmd0aCA+IDE/JyxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbmNhdC5hcHBseSgnLCByZXMsICcsJywgdG1wQXJyLCAnKSA6JywgcmVzLCAnLmNvbmNhdCgnLCB0bXBBcnIsICdbMF0pIDonLCByZXMsICc7Jyk7XG5cbiAgICAgICAgICAgIHJlbGVhc2VWYXJzKHJlcywgaSwgbGVuLCBjdXJDdHgsIGosIHZhbCwgdG1wQXJyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZURlc2NlbmRhbnRTZWxlY3RvcihzZWwsIGRlc3QsIGJhc2VDdHgpIHtcbiAgICAgICAgdmFyIHByb3AgPSBzZWwucHJvcCxcbiAgICAgICAgICAgIGN0eCA9IGFjcXVpcmVWYXIoKSwgY3VyQ3R4ID0gYWNxdWlyZVZhcigpLCBjaGlsZEN0eHMgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBpID0gYWNxdWlyZVZhcigpLCBqID0gYWNxdWlyZVZhcigpLCB2YWwgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBsZW4gPSBhY3F1aXJlVmFyKCksIHJlcyA9IGFjcXVpcmVWYXIoKTtcblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICBjdHgsICc9JywgYmFzZUN0eCwgJy5zbGljZSgpLCcsIHJlcywgJz0gW107JyxcbiAgICAgICAgICAgICd3aGlsZSgnLCBjdHgsICcubGVuZ3RoKSB7JyxcbiAgICAgICAgICAgICAgICBjdXJDdHgsICc9JywgY3R4LCAnLnNoaWZ0KCk7Jyk7XG4gICAgICAgIHByb3A/XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgJ2lmKHR5cGVvZiAnLCBjdXJDdHgsICc9PT0gXCJvYmplY3RcIiAmJicsIGN1ckN0eCwgJykgeycpIDpcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAnaWYodHlwZW9mICcsIGN1ckN0eCwgJyE9IG51bGwpIHsnKTtcbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBjaGlsZEN0eHMsICc9IFtdOycsXG4gICAgICAgICAgICAgICAgICAgICdpZihpc0FycignLCBjdXJDdHgsICcpKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGksICc9IDAsJywgbGVuLCAnPScsIGN1ckN0eCwgJy5sZW5ndGg7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd3aGlsZSgnLCBpLCAnPCcsIGxlbiwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLCAnPScsIGN1ckN0eCwgJ1snLCBpLCAnKytdOycpO1xuICAgICAgICBwcm9wICYmIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWYodHlwZW9mICcsIHZhbCwgJz09PSBcIm9iamVjdFwiKSB7Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZUFwcGVuZFRvQXJyYXkoY2hpbGRDdHhzLCB2YWwpO1xuICAgICAgICBwcm9wICYmIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScpO1xuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgJ2Vsc2UgeycpO1xuICAgICAgICBpZihwcm9wKSB7XG4gICAgICAgICAgICBpZihwcm9wICE9PSAnKicpIHtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwsICc9JywgY3VyQ3R4LCAnW1wiJyArIHByb3AgKyAnXCJdOycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVBcHBlbmRUb0FycmF5KHJlcywgY3VyQ3R4KTtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICdpZih0eXBlb2YgJywgY3VyQ3R4LCAnPT09IFwib2JqZWN0XCIpIHsnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZm9yKCcsIGosICcgaW4gJywgY3VyQ3R4LCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKCcsIGN1ckN0eCwgJy5oYXNPd25Qcm9wZXJ0eSgnLCBqLCAnKSkgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwsICc9JywgY3VyQ3R4LCAnWycsIGosICddOycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShjaGlsZEN0eHMsIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wID09PSAnKicgJiYgaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIHZhbCk7XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgIHByb3AgfHwgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkQ3R4cywgJy5sZW5ndGggJiYnLCBjdHgsICcudW5zaGlmdC5hcHBseSgnLCBjdHgsICcsJywgY2hpbGRDdHhzLCAnKTsnLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgIGRlc3QsICc9JywgcmVzLCAnOycpO1xuXG4gICAgICAgIHJlbGVhc2VWYXJzKGN0eCwgY3VyQ3R4LCBjaGlsZEN0eHMsIGksIGosIHZhbCwgbGVuLCByZXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZU9iamVjdFByZWRpY2F0ZShleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIHJlc1ZhciA9IGFjcXVpcmVWYXIoKSwgaSA9IGFjcXVpcmVWYXIoKSwgbGVuID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgY29uZCA9IGFjcXVpcmVWYXIoKSwgY3VySXRlbSA9IGFjcXVpcmVWYXIoKTtcblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICByZXNWYXIsICc9IFtdOycsXG4gICAgICAgICAgICBpLCAnPSAwOycsXG4gICAgICAgICAgICBsZW4sICc9JywgY3R4LCAnLmxlbmd0aDsnLFxuICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuLCAnKSB7JyxcbiAgICAgICAgICAgICAgICBjdXJJdGVtLCAnPScsIGN0eCwgJ1snLCBpLCAnKytdOycpO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoZXhwci5hcmcsIGNvbmQsIGN1ckl0ZW0pO1xuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgY29udmVydFRvQm9vbChleHByLmFyZywgY29uZCksICcmJicsIHJlc1ZhciwgJy5wdXNoKCcsIGN1ckl0ZW0sICcpOycsXG4gICAgICAgICAgICAnfScsXG4gICAgICAgICAgICBkZXN0LCAnPScsIHJlc1ZhciwgJzsnKTtcblxuICAgICAgICByZWxlYXNlVmFycyhyZXNWYXIsIGksIGxlbiwgY3VySXRlbSwgY29uZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlUG9zUHJlZGljYXRlKGl0ZW0sIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgYXJyYXlFeHByID0gaXRlbS5hcmcsIGZyb21JZHgsIHRvSWR4O1xuICAgICAgICBpZihhcnJheUV4cHIuaWR4KSB7XG4gICAgICAgICAgICB2YXIgaWR4ID0gYWNxdWlyZVZhcigpO1xuICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcnJheUV4cHIuaWR4LCBpZHgsIGN0eCk7XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgaWR4LCAnPCAwICYmICgnLCBpZHgsICc9JywgY3R4LCAnLmxlbmd0aCArJywgaWR4LCAnKTsnLFxuICAgICAgICAgICAgICAgIGRlc3QsICc9JywgY3R4LCAnWycsIGlkeCwgJ10gPT0gbnVsbD8gW10gOiBbJywgY3R4LCAnWycsIGlkeCwgJ11dOycpO1xuICAgICAgICAgICAgcmVsZWFzZVZhcnMoaWR4KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFycmF5RXhwci5mcm9tSWR4KSB7XG4gICAgICAgICAgICBpZihhcnJheUV4cHIudG9JZHgpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFycmF5RXhwci5mcm9tSWR4LCBmcm9tSWR4ID0gYWNxdWlyZVZhcigpLCBjdHgpO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJyYXlFeHByLnRvSWR4LCB0b0lkeCA9IGFjcXVpcmVWYXIoKSwgY3R4KTtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0nLCBjdHgsICcuc2xpY2UoJywgZnJvbUlkeCwgJywnLCB0b0lkeCwgJyk7Jyk7XG4gICAgICAgICAgICAgICAgcmVsZWFzZVZhcnMoZnJvbUlkeCwgdG9JZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcnJheUV4cHIuZnJvbUlkeCwgZnJvbUlkeCA9IGFjcXVpcmVWYXIoKSwgY3R4KTtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0nLCBjdHgsICcuc2xpY2UoJywgZnJvbUlkeCwgJyk7Jyk7XG4gICAgICAgICAgICAgICAgcmVsZWFzZVZhcnMoZnJvbUlkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFycmF5RXhwci50b0lkeCwgdG9JZHggPSBhY3F1aXJlVmFyKCksIGN0eCk7XG4gICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0nLCBjdHgsICcuc2xpY2UoMCwnLCB0b0lkeCwgJyk7Jyk7XG4gICAgICAgICAgICByZWxlYXNlVmFycyh0b0lkeCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVFeHByKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICBzd2l0Y2goZXhwci50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5QQVRIOlxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVBhdGgoZXhwciwgZGVzdCwgY3R4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguQ09OQ0FUX0VYUFI6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlQ29uY2F0RXhwcihleHByLCBkZXN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5DT01QQVJJU09OX0VYUFI6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlQ29tcGFyaXNvbkV4cHIoZXhwciwgZGVzdCwgY3R4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguTUFUSF9FWFBSOlxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZU1hdGhFeHByKGV4cHIsIGRlc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkxPR0lDQUxfRVhQUjpcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVMb2dpY2FsRXhwcihleHByLCBkZXN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5VTkFSWV9FWFBSOlxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVVuYXJ5RXhwcihleHByLCBkZXN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5MSVRFUkFMOlxuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPScpO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUxpdGVyYWwoZXhwci52YWwpO1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaCgnOycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlTGl0ZXJhbCh2YWwpIHtcbiAgICAgICAgYm9keS5wdXNoKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnPyBlc2NhcGVTdHIodmFsKSA6IHZhbCA9PT0gbnVsbD8gJ251bGwnIDogdmFsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVDb21wYXJpc29uRXhwcihleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIHZhbDEgPSBhY3F1aXJlVmFyKCksIHZhbDIgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBpc1ZhbDFBcnJheSA9IGFjcXVpcmVWYXIoKSwgaXNWYWwyQXJyYXkgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBpID0gYWNxdWlyZVZhcigpLCBqID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgbGVuMSA9IGFjcXVpcmVWYXIoKSwgbGVuMiA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGxlZnRBcmcgPSBleHByLmFyZ3NbMF0sIHJpZ2h0QXJnID0gZXhwci5hcmdzWzFdO1xuXG4gICAgICAgIGJvZHkucHVzaChkZXN0LCAnPSBmYWxzZTsnKTtcblxuICAgICAgICB0cmFuc2xhdGVFeHByKGxlZnRBcmcsIHZhbDEsIGN0eCk7XG4gICAgICAgIHRyYW5zbGF0ZUV4cHIocmlnaHRBcmcsIHZhbDIsIGN0eCk7XG5cbiAgICAgICAgdmFyIGlzTGVmdEFyZ1BhdGggPSBsZWZ0QXJnLnR5cGUgPT09IFNZTlRBWC5QQVRILFxuICAgICAgICAgICAgaXNSaWdodEFyZ0xpdGVyYWwgPSByaWdodEFyZy50eXBlID09PSBTWU5UQVguTElURVJBTDtcblxuICAgICAgICBib2R5LnB1c2goaXNWYWwxQXJyYXksICc9Jyk7XG4gICAgICAgIGlzTGVmdEFyZ1BhdGg/IGJvZHkucHVzaCgndHJ1ZTsnKSA6IGJvZHkucHVzaCgnaXNBcnIoJywgdmFsMSwgJyk7Jyk7XG5cbiAgICAgICAgYm9keS5wdXNoKGlzVmFsMkFycmF5LCAnPScpO1xuICAgICAgICBpc1JpZ2h0QXJnTGl0ZXJhbD8gYm9keS5wdXNoKCdmYWxzZTsnKSA6IGJvZHkucHVzaCgnaXNBcnIoJywgdmFsMiwgJyk7Jyk7XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgJ2lmKCcpO1xuICAgICAgICBpc0xlZnRBcmdQYXRoIHx8IGJvZHkucHVzaChpc1ZhbDFBcnJheSwgJyYmJyk7XG4gICAgICAgIGJvZHkucHVzaCh2YWwxLCAnLmxlbmd0aCA9PT0gMSkgeycsXG4gICAgICAgICAgICAgICAgdmFsMSwgJz0nLCB2YWwxLCAnWzBdOycsXG4gICAgICAgICAgICAgICAgaXNWYWwxQXJyYXksICc9IGZhbHNlOycsXG4gICAgICAgICAgICAnfScpO1xuICAgICAgICBpc1JpZ2h0QXJnTGl0ZXJhbCB8fCBib2R5LnB1c2goXG4gICAgICAgICAgICAnaWYoJywgaXNWYWwyQXJyYXksICcmJicsIHZhbDIsICcubGVuZ3RoID09PSAxKSB7JyxcbiAgICAgICAgICAgICAgICB2YWwyLCAnPScsIHZhbDIsICdbMF07JyxcbiAgICAgICAgICAgICAgICBpc1ZhbDJBcnJheSwgJz0gZmFsc2U7JyxcbiAgICAgICAgICAgICd9Jyk7XG5cbiAgICAgICAgYm9keS5wdXNoKGksICc9IDA7JyxcbiAgICAgICAgICAgICdpZignLCBpc1ZhbDFBcnJheSwgJykgeycsXG4gICAgICAgICAgICAgICAgbGVuMSwgJz0nLCB2YWwxLCAnLmxlbmd0aDsnKTtcblxuICAgICAgICBpZighaXNSaWdodEFyZ0xpdGVyYWwpIHtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAnaWYoJywgaXNWYWwyQXJyYXksICcpIHsnLFxuICAgICAgICAgICAgICAgICAgICBsZW4yLCAnPScsIHZhbDIsICcubGVuZ3RoOycsXG4gICAgICAgICAgICAgICAgICAgICd3aGlsZSgnLCBpLCAnPCcsIGxlbjEsICcmJiAhJywgZGVzdCwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICBqLCAnPSAwOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnd2hpbGUoJywgaiwgJzwnLCBsZW4yLCAnKSB7Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVDb25kaXRpb24oZXhwci5vcCwgW3ZhbDEsICdbJywgaSwgJ10nXS5qb2luKCcnKSwgW3ZhbDIsICdbJywgaiwgJ10nXS5qb2luKCcnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0LCAnPSB0cnVlOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdicmVhazsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnKysnLCBqLCAnOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnKysnLCBpLCAnOycsXG4gICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgJ2Vsc2UgeycpO1xuICAgICAgICB9XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuMSwgJykgeycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVDb25kaXRpb24oZXhwci5vcCwgW3ZhbDEsICdbJywgaSwgJ10nXS5qb2luKCcnKSwgdmFsMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdCwgJz0gdHJ1ZTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdicmVhazsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJysrJywgaSwgJzsnLFxuICAgICAgICAgICAgICAgICAgICAnfScpO1xuXG4gICAgICAgIGlzUmlnaHRBcmdMaXRlcmFsIHx8IGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAnfScpO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICd9Jyk7XG5cbiAgICAgICAgaWYoIWlzUmlnaHRBcmdMaXRlcmFsKSB7XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAnZWxzZSBpZignLCBpc1ZhbDJBcnJheSwnKSB7JyxcbiAgICAgICAgICAgICAgICBsZW4yLCAnPScsIHZhbDIsICcubGVuZ3RoOycsXG4gICAgICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuMiwgJykgeycpO1xuICAgICAgICAgICAgICAgICAgICB3cml0ZUNvbmRpdGlvbihleHByLm9wLCB2YWwxLCBbdmFsMiwgJ1snLCBpLCAnXSddLmpvaW4oJycpKTtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3QsICc9IHRydWU7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdicmVhazsnLFxuICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICcrKycsIGksICc7JyxcbiAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAnfScpO1xuICAgICAgICB9XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgJ2Vsc2UgeycsXG4gICAgICAgICAgICAgICAgZGVzdCwgJz0nLCBiaW5hcnlPcGVyYXRvcnNbZXhwci5vcF0odmFsMSwgdmFsMiksICc7JyxcbiAgICAgICAgICAgICd9Jyk7XG5cbiAgICAgICAgcmVsZWFzZVZhcnModmFsMSwgdmFsMiwgaXNWYWwxQXJyYXksIGlzVmFsMkFycmF5LCBpLCBqLCBsZW4xLCBsZW4yKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3cml0ZUNvbmRpdGlvbihvcCwgdmFsMUV4cHIsIHZhbDJFeHByKSB7XG4gICAgICAgIGJvZHkucHVzaCgnaWYoJywgYmluYXJ5T3BlcmF0b3JzW29wXSh2YWwxRXhwciwgdmFsMkV4cHIpLCAnKSB7Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlTG9naWNhbEV4cHIoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciBjb25kaXRpb25WYXJzID0gW10sXG4gICAgICAgICAgICBhcmdzID0gZXhwci5hcmdzLCBsZW4gPSBhcmdzLmxlbmd0aCxcbiAgICAgICAgICAgIGkgPSAwLCB2YWw7XG5cbiAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9IGZhbHNlOycpO1xuICAgICAgICBzd2l0Y2goZXhwci5vcCkge1xuICAgICAgICAgICAgY2FzZSAnJiYnOlxuICAgICAgICAgICAgICAgIHdoaWxlKGkgPCBsZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uVmFycy5wdXNoKHZhbCA9IGFjcXVpcmVWYXIoKSk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnc1tpXSwgdmFsLCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBib2R5LnB1c2goJ2lmKCcsIGNvbnZlcnRUb0Jvb2woYXJnc1tpKytdLCB2YWwpLCAnKSB7Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPSB0cnVlOycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd8fCc6XG4gICAgICAgICAgICAgICAgd2hpbGUoaSA8IGxlbikge1xuICAgICAgICAgICAgICAgICAgICBjb25kaXRpb25WYXJzLnB1c2godmFsID0gYWNxdWlyZVZhcigpKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcmdzW2ldLCB2YWwsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICdpZignLCBjb252ZXJ0VG9Cb29sKGFyZ3NbaV0sIHZhbCksICcpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3QsICc9IHRydWU7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGkrKyArIDEgPCBsZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaCgnZWxzZSB7Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLS1sZW47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZShsZW4tLSkge1xuICAgICAgICAgICAgYm9keS5wdXNoKCd9Jyk7XG4gICAgICAgIH1cblxuICAgICAgICByZWxlYXNlVmFycy5hcHBseShudWxsLCBjb25kaXRpb25WYXJzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVNYXRoRXhwcihleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIHZhbDEgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICB2YWwyID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgYXJncyA9IGV4cHIuYXJncztcblxuICAgICAgICB0cmFuc2xhdGVFeHByKGFyZ3NbMF0sIHZhbDEsIGN0eCk7XG4gICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnc1sxXSwgdmFsMiwgY3R4KTtcblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICBkZXN0LCAnPScsXG4gICAgICAgICAgICBiaW5hcnlPcGVyYXRvcnNbZXhwci5vcF0oXG4gICAgICAgICAgICAgICAgY29udmVydFRvU2luZ2xlVmFsdWUoYXJnc1swXSwgdmFsMSksXG4gICAgICAgICAgICAgICAgY29udmVydFRvU2luZ2xlVmFsdWUoYXJnc1sxXSwgdmFsMikpLFxuICAgICAgICAgICAgJzsnKTtcblxuICAgICAgICByZWxlYXNlVmFycyh2YWwxLCB2YWwyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVVbmFyeUV4cHIoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciB2YWwgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBhcmcgPSBleHByLmFyZztcblxuICAgICAgICB0cmFuc2xhdGVFeHByKGFyZywgdmFsLCBjdHgpO1xuXG4gICAgICAgIHN3aXRjaChleHByLm9wKSB7XG4gICAgICAgICAgICBjYXNlICchJzpcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0gIScsIGNvbnZlcnRUb0Jvb2woYXJnLCB2YWwpICsgJzsnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnLSc6XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9IC0nLCBjb252ZXJ0VG9TaW5nbGVWYWx1ZShhcmcsIHZhbCkgKyAnOycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVsZWFzZVZhcnModmFsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVDb25jYXRFeHByKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgYXJnVmFycyA9IFtdLFxuICAgICAgICAgICAgYXJncyA9IGV4cHIuYXJncyxcbiAgICAgICAgICAgIGxlbiA9IGFyZ3MubGVuZ3RoLFxuICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgd2hpbGUoaSA8IGxlbikge1xuICAgICAgICAgICAgYXJnVmFycy5wdXNoKGFjcXVpcmVWYXIoKSk7XG4gICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFyZ3NbaV0sIGFyZ1ZhcnNbaSsrXSwgY3R4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJvZHkucHVzaChkZXN0LCAnPSBjb25jYXQuY2FsbCgnLCBhcmdWYXJzLmpvaW4oJywnKSwgJyk7Jyk7XG5cbiAgICAgICAgcmVsZWFzZVZhcnMuYXBwbHkobnVsbCwgYXJnVmFycyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXNjYXBlU3RyKHMpIHtcbiAgICAgICAgcmV0dXJuICdcXCcnICsgcy5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpLnJlcGxhY2UoLycvZywgJ1xcXFxcXCcnKSArICdcXCcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlubGluZUFwcGVuZFRvQXJyYXkocmVzLCB2YWwsIHRtcEFyciwgbGVuKSB7XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICdpZih0eXBlb2YgJywgdmFsLCAnIT09IFwidW5kZWZpbmVkXCIpIHsnLFxuICAgICAgICAgICAgICAgICdpZihpc0FycignLCB2YWwsICcpKSB7Jyk7XG4gICAgICAgIGlmKHRtcEFycikge1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBsZW4sICc+IDE/Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVQdXNoVG9BcnJheSh0bXBBcnIsIHZhbCk7XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAnOicpO1xuICAgICAgICB9XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgcmVzLCAnPScsIHJlcywgJy5sZW5ndGg/JywgcmVzLCAnLmNvbmNhdCgnLCB2YWwsICcpIDonLCB2YWwsICcuc2xpY2UoKScsICc7JyxcbiAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgJ2Vsc2UgeycpO1xuICAgICAgICB0bXBBcnIgJiYgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAnaWYoJywgdG1wQXJyLCAnLmxlbmd0aCkgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMsICc9IGNvbmNhdC5hcHBseSgnLCByZXMsICcsJywgdG1wQXJyLCAnKTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wQXJyLCAnPSBbXTsnLFxuICAgICAgICAgICAgICAgICAgICAnfScpO1xuICAgICAgICAgICAgICAgICAgICBpbmxpbmVQdXNoVG9BcnJheShyZXMsIHZhbCk7XG4gICAgICAgIGJvZHkucHVzaCgnOycsXG4gICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgJ30nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbmxpbmVQdXNoVG9BcnJheShyZXMsIHZhbCkge1xuICAgICAgICBib2R5LnB1c2gocmVzLCAnLmxlbmd0aD8nLCByZXMsICcucHVzaCgnLCB2YWwsICcpIDonLCAgcmVzLCAnWzBdID0nLCB2YWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbnZlcnRUb0Jvb2woYXJnLCB2YXJOYW1lKSB7XG4gICAgICAgIHN3aXRjaChhcmcudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTWU5UQVguTE9HSUNBTF9FWFBSOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YXJOYW1lO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5MSVRFUkFMOlxuICAgICAgICAgICAgICAgIHJldHVybiAnISEnICsgdmFyTmFtZTtcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguUEFUSDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyTmFtZSArICcubGVuZ3RoID4gMCc7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnKHR5cGVvZiAnLCB2YXJOYW1lLCAnPT09IFwiYm9vbGVhblwiPycsXG4gICAgICAgICAgICAgICAgICAgIHZhck5hbWUsICc6JyxcbiAgICAgICAgICAgICAgICAgICAgJ2lzQXJyKCcsIHZhck5hbWUsICcpPycsIHZhck5hbWUsICcubGVuZ3RoID4gMCA6ICEhJywgdmFyTmFtZSwgJyknXS5qb2luKCcnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbnZlcnRUb1NpbmdsZVZhbHVlKGFyZywgdmFyTmFtZSkge1xuICAgICAgICBzd2l0Y2goYXJnLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkxJVEVSQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhck5hbWU7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLlBBVEg6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhck5hbWUgKyAnWzBdJztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gWycoaXNBcnIoJywgdmFyTmFtZSwgJyk/JywgdmFyTmFtZSwgJ1swXSA6ICcsIHZhck5hbWUsICcpJ10uam9pbignJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGFydHNXaXRoU3RyaWN0KHZhbDEsIHZhbDIpIHtcbiAgICAgICAgcmV0dXJuIFsndHlwZW9mICcsIHZhbDEsICc9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgJywgdmFsMiwgJz09PSBcInN0cmluZ1wiICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcuaW5kZXhPZignLCB2YWwyLCAnKSA9PT0gMCddLmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0YXJ0c1dpdGgodmFsMSwgdmFsMikge1xuICAgICAgICByZXR1cm4gW3ZhbDEsICchPSBudWxsICYmJywgdmFsMiwgJyE9IG51bGwgJiYnLFxuICAgICAgICAgICAgdmFsMSwgJy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignLCB2YWwyLCAnLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkgPT09IDAnXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRzV2l0aFN0cmljdCh2YWwxLCB2YWwyKSB7XG4gICAgICAgIHJldHVybiBbJ3R5cGVvZiAnLCB2YWwxLCAnPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mICcsIHZhbDIsICc9PT0gXCJzdHJpbmdcIiAmJicsXG4gICAgICAgICAgICB2YWwxLCAnLmxlbmd0aCA+PScsIHZhbDIsICcubGVuZ3RoICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcubGFzdEluZGV4T2YoJywgdmFsMiwgJykgPT09JywgdmFsMSwgJy5sZW5ndGggLScsIHZhbDIsICcubGVuZ3RoJ10uam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kc1dpdGgodmFsMSwgdmFsMikge1xuICAgICAgICByZXR1cm4gW3ZhbDEsICchPSBudWxsICYmJywgdmFsMiwgJyE9IG51bGwgJiYnLFxuICAgICAgICAgICAgJygnLCB2YWwxLCAnPScsIHZhbDEsICcudG9TdHJpbmcoKSkubGVuZ3RoID49JywgJygnLCB2YWwyLCAnPScsIHZhbDIsICcudG9TdHJpbmcoKSkubGVuZ3RoICYmJyxcbiAgICAgICAgICAgICcoJywgdmFsMSwgJy50b0xvd2VyQ2FzZSgpKS5sYXN0SW5kZXhPZignLCAnKCcsIHZhbDIsICcudG9Mb3dlckNhc2UoKSkpID09PScsXG4gICAgICAgICAgICB2YWwxLCAnLmxlbmd0aCAtJywgdmFsMiwgJy5sZW5ndGgnXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb250YWluc1N0cmljdCh2YWwxLCB2YWwyKSB7XG4gICAgICAgIHJldHVybiBbJ3R5cGVvZiAnLCB2YWwxLCAnPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mICcsIHZhbDIsICc9PT0gXCJzdHJpbmdcIiAmJicsXG4gICAgICAgICAgICB2YWwxLCAnLmluZGV4T2YoJywgdmFsMiwgJykgPiAtMSddLmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbnRhaW5zKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgcmV0dXJuIFt2YWwxLCAnIT0gbnVsbCAmJiAnLCB2YWwyLCAnIT0gbnVsbCAmJicsXG4gICAgICAgICAgICB2YWwxLCAnLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKCcsIHZhbDIsICcudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSA+IC0xJ10uam9pbignJyk7XG4gICAgfVxuXG4gICAgdmFyIGJpbmFyeU9wZXJhdG9ycyA9IHtcbiAgICAgICAgICAgICc9PT0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJz09PScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJz09JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWyd0eXBlb2YgJywgdmFsMSwgJz09PSBcInN0cmluZ1wiICYmIHR5cGVvZiAnLCB2YWwyLCAnPT09IFwic3RyaW5nXCI/JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsMSwgJy50b0xvd2VyQ2FzZSgpID09PScsIHZhbDIsICcudG9Mb3dlckNhc2UoKSA6JyArXG4gICAgICAgICAgICAgICAgICAgIHZhbDEsICc9PScsIHZhbDJdLmpvaW4oJycpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJz49JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICc+PScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJz4nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJz4nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICc8PScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnPD0nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICc8JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICc8JyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnIT09JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICchPT0nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICchPScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnIT0nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICdePT0nIDogc3RhcnRzV2l0aFN0cmljdCxcblxuICAgICAgICAgICAgJz09XicgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0c1dpdGhTdHJpY3QodmFsMiwgdmFsMSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnXj0nIDogc3RhcnRzV2l0aCxcblxuICAgICAgICAgICAgJz1eJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhcnRzV2l0aCh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICckPT0nIDogZW5kc1dpdGhTdHJpY3QsXG5cbiAgICAgICAgICAgICc9PSQnIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbmRzV2l0aFN0cmljdCh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICckPScgOiBlbmRzV2l0aCxcblxuICAgICAgICAgICAgJz0kJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW5kc1dpdGgodmFsMiwgdmFsMSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnKj09JyA6IGNvbnRhaW5zU3RyaWN0LFxuXG4gICAgICAgICAgICAnPT0qJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbnNTdHJpY3QodmFsMiwgdmFsMSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnPSonIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWlucyh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICcqPScgOiBjb250YWlucyxcblxuICAgICAgICAgICAgJysnIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJysnICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICctJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICctJyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnKicgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnKicgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJy8nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJy8nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICclJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICclJyArIHZhbDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICByZXR1cm4gdHJhbnNsYXRlO1xufSkoKTtcblxuZnVuY3Rpb24gY29tcGlsZShwYXRoKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uKCdkYXRhLHN1YnN0JywgdHJhbnNsYXRlKHBhcnNlKHBhdGgpKSk7XG59XG5cbnZhciBjYWNoZSA9IHt9LFxuICAgIGNhY2hlS2V5cyA9IFtdLFxuICAgIHBhcmFtcyA9IHtcbiAgICAgICAgY2FjaGVTaXplIDogMTAwXG4gICAgfSxcbiAgICBzZXRQYXJhbXNIb29rcyA9IHtcbiAgICAgICAgY2FjaGVTaXplIDogZnVuY3Rpb24ob2xkVmFsLCBuZXdWYWwpIHtcbiAgICAgICAgICAgIGlmKG5ld1ZhbCA8IG9sZFZhbCAmJiBjYWNoZUtleXMubGVuZ3RoID4gbmV3VmFsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlbW92ZWRLZXlzID0gY2FjaGVLZXlzLnNwbGljZSgwLCBjYWNoZUtleXMubGVuZ3RoIC0gbmV3VmFsKSxcbiAgICAgICAgICAgICAgICAgICAgaSA9IHJlbW92ZWRLZXlzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIHdoaWxlKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY2FjaGVbcmVtb3ZlZEtleXNbaV1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbnZhciBkZWNsID0gZnVuY3Rpb24ocGF0aCwgY3R4LCBzdWJzdHMpIHtcbiAgICBpZighY2FjaGVbcGF0aF0pIHtcbiAgICAgICAgY2FjaGVbcGF0aF0gPSBjb21waWxlKHBhdGgpO1xuICAgICAgICBpZihjYWNoZUtleXMucHVzaChwYXRoKSA+IHBhcmFtcy5jYWNoZVNpemUpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjYWNoZVtjYWNoZUtleXMuc2hpZnQoKV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2FjaGVbcGF0aF0oY3R4LCBzdWJzdHMgfHwge30pO1xufTtcblxuZGVjbC52ZXJzaW9uID0gJzAuNC4wJztcblxuZGVjbC5wYXJhbXMgPSBmdW5jdGlvbihfcGFyYW1zKSB7XG4gICAgaWYoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG5cbiAgICBmb3IodmFyIG5hbWUgaW4gX3BhcmFtcykge1xuICAgICAgICBpZihfcGFyYW1zLmhhc093blByb3BlcnR5KG5hbWUpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgICAgICAgICBzZXRQYXJhbXNIb29rc1tuYW1lXSAmJiBzZXRQYXJhbXNIb29rc1tuYW1lXShwYXJhbXNbbmFtZV0sIF9wYXJhbXNbbmFtZV0pO1xuICAgICAgICAgICAgcGFyYW1zW25hbWVdID0gX3BhcmFtc1tuYW1lXTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmRlY2wuY29tcGlsZSA9IGNvbXBpbGU7XG5cbmRlY2wuYXBwbHkgPSBkZWNsO1xuXG5pZih0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBkZWNsO1xufVxuZWxzZSBpZih0eXBlb2YgbW9kdWxlcyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGVzLmRlZmluZSgnanNwYXRoJywgZnVuY3Rpb24ocHJvdmlkZSkge1xuICAgICAgICBwcm92aWRlKGRlY2wpO1xuICAgIH0pO1xufVxuZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uKHJlcXVpcmUsIGV4cG9ydHMsIG1vZHVsZSkge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGRlY2w7XG4gICAgfSk7XG59XG5lbHNlIHtcbiAgICB3aW5kb3cuSlNQYXRoID0gZGVjbDtcbn1cblxufSkoKTtcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogRVM2IEVYVEVOU0lPTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaWYoIVN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aClcbntcblx0U3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoID0gZnVuY3Rpb24ocylcblx0e1xuXHRcdGNvbnN0IGJhc2UgPSAweDAwMDAwMDAwMDAwMDAwMDAwMDAwO1xuXG5cdFx0cmV0dXJuIHRoaXMuaW5kZXhPZihzLCBiYXNlKSA9PT0gYmFzZTtcblx0fTtcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmlmKCFTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoKVxue1xuXHRTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoID0gZnVuY3Rpb24ocylcblx0e1xuXHRcdGNvbnN0IGJhc2UgPSB0aGlzLmxlbmd0aCAtIHMubGVuZ3RoO1xuXG5cdFx0cmV0dXJuIHRoaXMuaW5kZXhPZihzLCBiYXNlKSA9PT0gYmFzZTtcblx0fTtcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBKUVVFUlkgRVhURU5TSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5jb25zdCBfYW1pX2ludGVybmFsX2pRdWVyeUFqYXggPSBqUXVlcnkuYWpheDtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmpRdWVyeS5hamF4ID0gZnVuY3Rpb24oc2V0dGluZ3MpXG57XG5cdGlmKHR5cGVvZiBzZXR0aW5ncyA9PT0gJ29iamVjdCdcblx0ICAgJiZcblx0ICAgc2V0dGluZ3MuZGF0YVR5cGUgPT09ICdzaGVldCdcblx0ICkge1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0LCB1cmxdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0JywgJ3VybCddLFxuXHRcdFx0W3Jlc3VsdCwgJyddLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpXG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih1cmwpXG5cdFx0e1xuXHRcdFx0JCgnaGVhZCcpLmFwcGVuZCgnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCInICsgdXJsICsgJ1wiPjwvbGluaz4nKS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0KTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fVxuXHRlbHNlXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gX2FtaV9pbnRlcm5hbF9qUXVlcnlBamF4LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH1cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5jb25zdCBfYW1pX2ludGVybmFsX2pRdWVyeVZhbCA9IGpRdWVyeS5mbi52YWw7XG5jb25zdCBfYW1pX2ludGVybmFsX2pRdWVyeVJlbW92ZSA9IGpRdWVyeS5mbi5yZW1vdmU7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5jb25zdCBfYW1pX2ludGVybmFsX3JlbW92ZUV2dCA9IG5ldyAkLkV2ZW50KCdyZW1vdmUnKTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZpbmRXaXRoU2VsZjogZnVuY3Rpb24oc2VsZWN0b3IpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5maW5kKHNlbGVjdG9yKS5hZGRCYWNrKHNlbGVjdG9yKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNlcmlhbGl6ZU9iamVjdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0ge307XG5cblx0XHR0aGlzLnNlcmlhbGl6ZUFycmF5KCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRpZihpdGVtLm5hbWUgaW4gcmVzdWx0KVxuXHRcdFx0e1xuXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocmVzdWx0W2l0ZW0ubmFtZV0pID09PSAnW29iamVjdCBTdHJpbmddJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdFtpdGVtLm5hbWVdID0gW3Jlc3VsdFtpdGVtLm5hbWVdXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlc3VsdFtpdGVtLm5hbWVdLnB1c2goaXRlbS52YWx1ZSB8fCAnJyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZSB8fCAnJztcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR2YWw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qKi8gaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgLy8gZ2V0dGVyXG5cdFx0e1xuXHRcdFx0aWYodGhpcy5oYXNDbGFzcygnZm9ybS1lZGl0b3ItaGlkZGVuJykpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IHNlc3Npb24gPSB0aGlzLmRhdGEoJ3Nlc3Npb24nKTtcblxuXHRcdFx0XHRyZXR1cm4gc2Vzc2lvbiA/IHNlc3Npb24uZ2V0VmFsdWUoKSA6ICcnO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIC8vIHNldHRlclxuXHRcdHtcblx0XHRcdGlmKHRoaXMuaGFzQ2xhc3MoJ2Zvcm0tZWRpdG9yLWhpZGRlbicpKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBzZXNzaW9uID0gdGhpcy5kYXRhKCdzZXNzaW9uJyk7XG5cblx0XHRcdFx0aWYoc2Vzc2lvbikgc2Vzc2lvbi5zZXRWYWx1ZShhcmd1bWVudHNbMF0pOyByZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gX2FtaV9pbnRlcm5hbF9qUXVlcnlWYWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlbW92ZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0JCh0aGlzKS50cmlnZ2VyKF9hbWlfaW50ZXJuYWxfcmVtb3ZlRXZ0KTtcblxuXHRcdHJldHVybiBfYW1pX2ludGVybmFsX2pRdWVyeVJlbW92ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBCT09UU1RSQVAgRVhURU5TSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5sZXQgX2FtaV9pbnRlcm5hbF9tb2RhbFpJbmRleCA9IDEwNTA7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kKGRvY3VtZW50KS5vbignc2hvdy5icy5tb2RhbCcsICcubW9kYWwnLCAoZSkgPT4ge1xuXG5cdGNvbnN0IGVsID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXG5cdHNldFRpbWVvdXQoKCkgPT4ge1xuXG5cdFx0JCgnYm9keSA+IC5tb2RhbC1iYWNrZHJvcDpsYXN0JykuY3NzKCd6LWluZGV4JywgX2FtaV9pbnRlcm5hbF9tb2RhbFpJbmRleCsrKTtcblx0XHQvKi0tLS0tLS0tLS0tKi9lbC8qLS0tLS0tLS0tLS0qLy5jc3MoJ3otaW5kZXgnLCBfYW1pX2ludGVybmFsX21vZGFsWkluZGV4KyspO1xuXG5cdH0sIDEwKTtcbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogTkFNRVNQQUNFIEhFTFBFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZnVuY3Rpb24gXyRjcmVhdGVOYW1lc3BhY2UoJG5hbWUsIHgpXG57XG5cdGxldCBwYXJlbnQgPSB3aW5kb3c7XG5cblx0Y29uc3QgcGFydHMgPSAkbmFtZS5zcGxpdCgvXFxzKlxcLlxccyovZyksIGwgPSBwYXJ0cy5sZW5ndGggLSAxO1xuXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsOyBpKyspXG5cdHtcblx0XHRpZihwYXJlbnRbcGFydHNbaV1dKVxuXHRcdHtcblx0XHRcdHBhcmVudCA9IHBhcmVudFtwYXJ0c1tpXV07XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dID0ge307XG5cdFx0fVxuXHR9XG5cblx0cGFyZW50W3BhcnRzW2ldXSA9IHg7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5mdW5jdGlvbiBfJGFkZFRvTmFtZXNwYWNlKCRuYW1lLCB4KVxue1xuXHRsZXQgcGFyZW50ID0gd2luZG93O1xuXG5cdGNvbnN0IHBhcnRzID0gJG5hbWUuc3BsaXQoL1xccypcXC5cXHMqL2cpLCBsID0gcGFydHMubGVuZ3RoIC0gMTtcblxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbDsgaSsrKVxuXHR7XG5cdFx0aWYocGFyZW50W3BhcnRzW2ldXSlcblx0XHR7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2AnICsgJG5hbWUgKyAnYCAoYCcgKyBwYXJ0c1tpXSArICdgKSBub3QgZGVjbGFyZWQnO1xuXHRcdH1cblx0fVxuXG5cdHBhcmVudFtwYXJ0c1tpXV0gPSB4O1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIE5BTUVTUEFDRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICAqIENyZWF0ZSBhIG5ldyBuYW1lc3BhY2VcbiAgKiBAcGFyYW0ge1N0cmluZ30gJG5hbWUgdGhlIG5hbWVzcGFjZSBuYW1lXG4gICogQHBhcmFtIHtPYmplY3R9IFskZGVzY3JdIHRoZSBuYW1lc3BhY2UgYm9keVxuICAqL1xuXG5mdW5jdGlvbiAkQU1JTmFtZXNwYWNlKCRuYW1lLCAkZGVzY3IpXG57XG5cdGlmKCEkZGVzY3IpXG5cdHtcblx0XHQkZGVzY3IgPSB7fTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGRlc2NyLiRuYW1lID0gJG5hbWU7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfJGNyZWF0ZU5hbWVzcGFjZSgkbmFtZSwgJGRlc2NyKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGlmKCRkZXNjci4kKVxuXHR7XG5cdFx0JGRlc2NyLiQuYXBwbHkoJGRlc2NyKTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogSU5URVJGQUNFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gICogQ3JlYXRlIGEgbmV3IGludGVyZmFjZVxuICAqIEBwYXJhbSB7U3RyaW5nfSAkbmFtZSB0aGUgaW50ZXJmYWNlIG5hbWVcbiAgKiBAcGFyYW0ge09iamVjdH0gWyRkZXNjcl0gdGhlIGludGVyZmFjZSBib2R5XG4gICovXG5cbmZ1bmN0aW9uICRBTUlJbnRlcmZhY2UoJG5hbWUsICRkZXNjcilcbntcblx0aWYoISRkZXNjcilcblx0e1xuXHRcdCRkZXNjciA9IHt9O1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjb25zdCAkY2xhc3MgPSBmdW5jdGlvbigpXG5cdHtcblx0XHR0aHJvdyAnY291bGQgbm9yIGluc3RhbnRpYXRlIGludGVyZmFjZSc7XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpZigkZGVzY3IuJGV4dGVuZHMpXG5cdHtcblx0XHR0aHJvdyAnYCRleHRlbmRzYCBub3QgYWxsb3dlZCBmb3IgaW50ZXJmYWNlJztcblx0fVxuXG5cdGlmKCRkZXNjci4kaW1wbGVtZW50cylcblx0e1xuXHRcdHRocm93ICdgJGltcGxlbWVudHNgIG5vdCBhbGxvd2VkIGZvciBpbnRlcmZhY2UnO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpZigkZGVzY3IuJClcblx0e1xuXHRcdHRocm93ICdgJGAgbm90IGFsbG93ZWQgZm9yIGludGVyZmFjZSc7XG5cdH1cblxuXHRpZigkZGVzY3IuJGluaXQpXG5cdHtcblx0XHR0aHJvdyAnYCRpbml0YCBub3QgYWxsb3dlZCBmb3IgaW50ZXJmYWNlJztcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGNsYXNzLiRuYW1lID0gJG5hbWU7XG5cdCRjbGFzcy4kY2xhc3MgPSAkY2xhc3M7XG5cdCRjbGFzcy4kbWVtYmVycyA9ICRkZXNjcjtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF8kYWRkVG9OYW1lc3BhY2UoJG5hbWUsICRjbGFzcyk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBDTEFTU0VTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAgKiBDcmVhdGUgYSBuZXcgY2xhc3NcbiAgKiBAcGFyYW0ge1N0cmluZ30gJG5hbWUgdGhlIGNsYXNzIG5hbWVcbiAgKiBAcGFyYW0ge09iamVjdH0gWyRkZXNjcl0gdGhlIGNsYXNzIGJvZHlcbiAgKi9cblxuZnVuY3Rpb24gJEFNSUNsYXNzKCRuYW1lLCAkZGVzY3IpXG57XG5cdGlmKCEkZGVzY3IpXG5cdHtcblx0XHQkZGVzY3IgPSB7fTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y29uc3QgJHN1cGVyID0gKCRkZXNjci4kZXh0ZW5kcyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSA/ICRkZXNjci4kZXh0ZW5kcy5wcm90b3R5cGUgOiB7fTtcblxuXHRjb25zdCAkc3VwZXJfaW1wbGVtZW50cyA9ICgkc3VwZXIuJGltcGxlbWVudHMgaW5zdGFuY2VvZiBBcnJheSkgPyAkc3VwZXIuJGltcGxlbWVudHMgOiBbXTtcblx0Y29uc3QgJGRlc2NyX2ltcGxlbWVudHMgPSAoJGRlc2NyLiRpbXBsZW1lbnRzIGluc3RhbmNlb2YgQXJyYXkpID8gJGRlc2NyLiRpbXBsZW1lbnRzIDogW107XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjb25zdCAkY2xhc3MgPSBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRmb3IoY29uc3QgaSBpbiB0aGlzLiRpbXBsZW1lbnRzKVxuXHRcdHtcblx0XHRcdGlmKHRoaXMuJGltcGxlbWVudHMuaGFzT3duUHJvcGVydHkoaSkpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0ICRpbnRlcmZhY2UgPSB0aGlzLiRpbXBsZW1lbnRzW2ldO1xuXG5cdFx0XHRcdGZvcihjb25zdCBqIGluICRpbnRlcmZhY2UuJG1lbWJlcnMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZigkaW50ZXJmYWNlLiRtZW1iZXJzLmhhc093blByb3BlcnR5KGopKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGNvbnN0ICRtZW1iZXIgPSAkaW50ZXJmYWNlLiRtZW1iZXJzW2pdO1xuXG5cdFx0XHRcdFx0XHRpZih0eXBlb2YodGhpc1tqXSkgIT09IHR5cGVvZigkbWVtYmVyKSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhyb3cgJ2NsYXNzIGAnICsgdGhpcy4kbmFtZSArICdgIHdpdGggbXVzdCBpbXBsZW1lbnQgYCcgKyAkaW50ZXJmYWNlLiRuYW1lICsgJy4nICsgaiArICdgJztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBfc3VwZXIgPSB0aGlzLiRjbGFzcy5faW50ZXJuYWxfc3VwZXI7XG5cdFx0Y29uc3QgX2FkZGVkID0gdGhpcy4kY2xhc3MuX2ludGVybmFsX2FkZGVkO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy4kc3VwZXIgPSB7fTtcblxuXHRcdGZvcihjb25zdCBuYW1lIGluIF9zdXBlcilcblx0XHR7XG5cdFx0XHRpZihfc3VwZXIuaGFzT3duUHJvcGVydHkobmFtZSkpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuJHN1cGVyW25hbWVdID0gKChfc3VwZXIsIG5hbWUsIHRoYXQpID0+IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0cmV0dXJuIF9zdXBlcltuYW1lXS5hcHBseSh0aGF0LCBhcmd1bWVudHMpXG5cblx0XHRcdFx0fSkoX3N1cGVyLCBuYW1lLCB0aGlzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLiRhZGRlZCA9IHt9O1xuXG5cdFx0Zm9yKGNvbnN0IG5hbWUgaW4gX2FkZGVkKVxuXHRcdHtcblx0XHRcdGlmKF9hZGRlZC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcblx0XHRcdHtcblx0XHRcdFx0dGhpcy4kYWRkZWRbbmFtZV0gPSAoKF9hZGRlZCwgbmFtZSwgdGhhdCkgPT4gZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRyZXR1cm4gX2FkZGVkW25hbWVdLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG5cblx0XHRcdFx0fSkoX2FkZGVkLCBuYW1lLCB0aGlzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLiRpbml0KVxuXHRcdHtcblx0XHRcdHRoaXMuJGluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkY2xhc3MuX2ludGVybmFsX3N1cGVyID0ge307XG5cdCRjbGFzcy5faW50ZXJuYWxfYWRkZWQgPSB7fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcihjb25zdCBuYW1lIGluICRzdXBlcilcblx0e1xuXHRcdGlmKG5hbWUgPT09ICckaW5pdCdcblx0XHQgICB8fFxuXHRcdCAgIG5hbWUuY2hhckF0KDApICE9PSAnJCdcblx0XHQgICB8fFxuXHRcdCAgICRzdXBlci5oYXNPd25Qcm9wZXJ0eShuYW1lKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuXHRcdCApIHtcblx0XHRcdCRjbGFzcy5faW50ZXJuYWxfc3VwZXJbbmFtZV0gPSAkc3VwZXJbbmFtZV07XG5cblx0XHRcdCRjbGFzcy5wcm90b3R5cGVbbmFtZV0gPSAkc3VwZXJbbmFtZV07XG5cdFx0fVxuXHR9XG5cblx0Zm9yKGNvbnN0IG5hbWUgaW4gJGRlc2NyKVxuXHR7XG5cdFx0aWYobmFtZSA9PT0gJyRpbml0J1xuXHRcdCAgIHx8XG5cdFx0ICAgbmFtZS5jaGFyQXQoMCkgIT09ICckJ1xuXHRcdCAgIHx8XG5cdFx0ICAgJGRlc2NyLmhhc093blByb3BlcnR5KG5hbWUpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5cdFx0ICkge1xuXHRcdFx0JGNsYXNzLl9pbnRlcm5hbF9hZGRlZFtuYW1lXSA9ICRkZXNjcltuYW1lXTtcblxuXHRcdFx0JGNsYXNzLnByb3RvdHlwZVtuYW1lXSA9ICRkZXNjcltuYW1lXTtcblx0XHR9XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRjbGFzcy5wcm90b3R5cGUuJG5hbWUgPSAkbmFtZTtcblx0JGNsYXNzLnByb3RvdHlwZS4kY2xhc3MgPSAkY2xhc3M7XG5cdCRjbGFzcy5wcm90b3R5cGUuJGltcGxlbWVudHMgPSAkc3VwZXJfaW1wbGVtZW50cy5jb25jYXQoJGRlc2NyX2ltcGxlbWVudHMpO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XyRhZGRUb05hbWVzcGFjZSgkbmFtZSwgJGNsYXNzKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGlmKCRkZXNjci4kKVxuXHR7XG5cdFx0JGRlc2NyLiQuYXBwbHkoJGNsYXNzKTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogTm9kZUpTIEVYVEVOU0lPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaWYodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKVxue1xuXHRtb2R1bGUuZXhwb3J0cy5OYW1lc3BhY2UgPSAkQU1JTmFtZXNwYWNlO1xuXHRtb2R1bGUuZXhwb3J0cy5JbnRlcmZhY2UgPSAkQU1JSW50ZXJmYWNlO1xuXHRtb2R1bGUuZXhwb3J0cy4gIENsYXNzICAgPSAgICRBTUlDbGFzcyAgO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEpRVUVSWSBFWFRFTlNJT04gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmlmKHR5cGVvZiBqUXVlcnkgIT09ICd1bmRlZmluZWQnKVxue1xuXHRqUXVlcnkuTmFtZXNwYWNlID0gJEFNSU5hbWVzcGFjZTtcblx0alF1ZXJ5LkludGVyZmFjZSA9ICRBTUlJbnRlcmZhY2U7XG5cdGpRdWVyeS4gIENsYXNzICAgPSAgICRBTUlDbGFzcyAgO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBBTUkgdXJsIHJvdXRpbmcgc3Vic3lzdGVtXG4gKiBAbmFtZXNwYWNlIGFtaVJvdXRlclxuICovXG5cbiRBTUlOYW1lc3BhY2UoJ2FtaVJvdXRlcicsIC8qKiBAbGVuZHMgYW1pUm91dGVyICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFJJVkFURSBNRU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfc2NyaXB0VVJMOiAnJyxcblx0X29yaWdpblVSTDogJycsXG5cdF93ZWJBcHBVUkw6ICcnLFxuXG5cdF9oYXNoOiAnJyxcblx0X2FyZ3M6IFtdLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3JvdXRlczogW10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFJJVkFURSBNRVRIT0RTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZWF0U2xhc2hlczogZnVuY3Rpb24odXJsKVxuXHR7XG5cdFx0dXJsID0gdXJsLnRyaW0oKTtcblxuXHRcdHdoaWxlKHVybFt1cmwubGVuZ3RoIC0gMV0gPT09ICcvJylcblx0XHR7XG5cdFx0XHR1cmwgPSB1cmwuc3Vic3RyaW5nKDAsIHVybC5sZW5ndGggLSAxKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdXJsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNUQVRJQyBDT05TVFJVQ1RPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5fYXJncy5sZW5ndGggPSAwO1xuXHRcdHRoaXMuX3JvdXRlcy5sZW5ndGggPSAwO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgIGhyZWYgID0gd2luZG93LmxvY2F0aW9uLiBocmVmIC50cmltKCk7XG5cdFx0Y29uc3QgIGhhc2ggID0gd2luZG93LmxvY2F0aW9uLiBoYXNoIC50cmltKCk7XG5cdFx0Y29uc3Qgc2VhcmNoID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC50cmltKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFNDUklQVF9VUkwgQU5EIE9SSUdJTl9VUkwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRmb3IobGV0IGlkeCwgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdGlkeCA9IHNjcmlwdHNbaV0uc3JjLmluZGV4T2YoJ2pzL2FtaS4nKTtcblxuXHRcdFx0aWYoaWR4ID4gMClcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5fc2NyaXB0VVJMID0gc2NyaXB0c1tpXS5zcmM7XG5cblx0XHRcdFx0dGhpcy5fb3JpZ2luVVJMID0gdGhpcy5fZWF0U2xhc2hlcyhcblx0XHRcdFx0XHR0aGlzLl9zY3JpcHRVUkwuc3Vic3RyaW5nKDAsIGlkeClcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogV0VCQVBQX1VSTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuX3dlYkFwcFVSTCA9IHRoaXMuX2VhdFNsYXNoZXMoXG5cdFx0XHRocmVmLnJlcGxhY2UoLyg/OlxcI3xcXD8pLiokLywgJycpXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBIQVNIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5faGFzaCA9IHRoaXMuX2VhdFNsYXNoZXMoXG5cdFx0XHRoYXNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXD8uKiQvLCAnJylcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEFSR1MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihzZWFyY2gpXG5cdFx0e1xuXHRcdFx0c2VhcmNoLnN1YnN0cmluZygxKS5zcGxpdCgnJicpLmZvckVhY2goKHBhcmFtKSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgcGFydHMgPSBwYXJhbS5zcGxpdCgnPScpO1xuXG5cdFx0XHRcdC8qKi8gaWYocGFydHMubGVuZ3RoID09PSAxKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5fYXJnc1tkZWNvZGVVUklDb21wb25lbnQocGFydHNbMF0pXSA9IC8qLS0tLS0tLS0qLyAnJyAvKi0tLS0tLS0tKi87XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZihwYXJ0cy5sZW5ndGggPT09IDIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLl9hcmdzW2RlY29kZVVSSUNvbXBvbmVudChwYXJ0c1swXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBVQkxJQyBNRVRIT0RTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBBV0YncyBzY3JpcHQgVVJMXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgQVdGJ3Mgc2NyaXB0IFVSTFxuXHQgICovXG5cblx0Z2V0U2NyaXB0VVJMOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2NyaXB0VVJMO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBvcmlnaW4gVVJMXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgb3JpZ2luIFVSTFxuXHQgICovXG5cblx0Z2V0T3JpZ2luVVJMOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fb3JpZ2luVVJMO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgd2ViYXBwIFVSTFxuXHQgICovXG5cblx0Z2V0V2ViQXBwVVJMOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fd2ViQXBwVVJMO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBhbmNob3IgcGFydCBvZiB0aGUgd2ViYXBwIFVSTFxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGFuY2hvciBwYXJ0IG9mIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKi9cblxuXHRnZXRIYXNoOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faGFzaDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgYXJndW1lbnRzIGV4dHJhY3RlZCBmcm9tIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gVGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFxuXHQgICovXG5cblx0Z2V0QXJnczogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2FyZ3M7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFwcGVuZHMgYSByb3V0aW5nIHJ1bGVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSByZWdFeHAgdGhlIHJlZ0V4cFxuXHQgICogQHBhcmFtIHtPYmplY3R9IGhhbmRsZXIgdGhlIGhhbmRsZXJcblx0ICAqIEByZXR1cm5zIHtOYW1lc3BhY2V9IFRoZSBhbWlSb3V0ZXIgc2luZ2xldG9uXG5cdCAgKi9cblxuXHRhcHBlbmQ6IGZ1bmN0aW9uKHJlZ0V4cCwgaGFuZGxlcilcblx0e1xuXHRcdHRoaXMuX3JvdXRlcy51bnNoaWZ0KHtcblx0XHRcdHJlZ0V4cDogcmVnRXhwLFxuXHRcdFx0aGFuZGxlcjogaGFuZGxlcixcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBSZW1vdmVzIHNvbWUgcm91dGluZyBydWxlc1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IHJlZ0V4cCB0aGUgcmVnRXhwXG5cdCAgKiBAcmV0dXJucyB7TmFtZXNwYWNlfSBUaGUgYW1pUm91dGVyIHNpbmdsZXRvblxuXHQgICovXG5cblx0cmVtb3ZlOiBmdW5jdGlvbihyZWdFeHApXG5cdHtcblx0XHR0aGlzLl9yb3V0ZXMgPSB0aGlzLl9yb3V0ZXMuZmlsdGVyKChyb3V0ZSkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gcm91dGUucmVnRXhwLnRvU3RyaW5nKCkgIT09IHJlZ0V4cC50b1N0cmluZygpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENoZWNrcyB3aGV0aGVyIHRoZSBVUkwgbWF0Y2hlcyB3aXRoIGEgcm91dGluZyBydWxlXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGNoZWNrOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbTtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9yb3V0ZXMubGVuZ3RoOyBpKyspXG5cdFx0e1xuXHRcdFx0bSA9IHRoaXMuX2hhc2gubWF0Y2godGhpcy5fcm91dGVzW2ldLnJlZ0V4cCk7XG5cblx0XHRcdGlmKG0pXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuX3JvdXRlc1tpXS5oYW5kbGVyLmFwcGx5KGFtaVJvdXRlciwgbSk7XG5cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBcHBlbmQgYSBuZXcgaGlzdG9yeSBlbnRyeVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggdGhlIG5ldyBwYXRoXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHQ9bnVsbF0gdGhlIG5ldyBjb250ZXh0XG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGFwcGVuZEhpc3RvcnlFbnRyeTogZnVuY3Rpb24ocGF0aCwgY29udGV4dCA9IG51bGwpXG5cdHtcblx0XHRpZihoaXN0b3J5LnB1c2hTdGF0ZSlcblx0XHR7XG5cdFx0XHRoaXN0b3J5LnB1c2hTdGF0ZShjb250ZXh0LCBudWxsLCB0aGlzLl93ZWJBcHBVUkwgKyB0aGlzLl9lYXRTbGFzaGVzKHBhdGgpKTtcblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBSZXBsYWNlIHRoZSBjdXJyZW50IGhpc3RvcnkgZW50cnlcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIHRoZSBuZXcgcGF0aFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0PW51bGxdIHRoZSBuZXcgY29udGV4dFxuXHQgICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAgKi9cblxuXHRyZXBsYWNlSGlzdG9yeUVudHJ5OiBmdW5jdGlvbihwYXRoLCBjb250ZXh0ID0gbnVsbClcblx0e1xuXHRcdGlmKGhpc3RvcnkucmVwbGFjZVN0YXRlKVxuXHRcdHtcblx0XHRcdGhpc3RvcnkucmVwbGFjZVN0YXRlKGNvbnRleHQsIG51bGwsIHRoaXMuX3dlYkFwcFVSTCArIHRoaXMuX2VhdFNsYXNoZXMocGF0aCkpO1xuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSU5hbWVzcGFjZSgnYW1pJywge1xuXG5cdHZlcnNpb246ICcwLjAuMScsXG5cdGNvbW1pdF9pZDogJ3t7QU1JX0NPTU1JVF9JRH19Jyxcbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIElOVEVSTkFMIEZVTkNUSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIF9hbWlfaW50ZXJuYWxfdGhlbihkZWZlcnJlZCwgZG9uZUZ1bmMsIGZhaWxGdW5jKVxue1xuXHRpZihkZWZlcnJlZCAmJiBkZWZlcnJlZC50aGVuKVxuXHR7XG5cdFx0ZGVmZXJyZWQudGhlbihkb25lRnVuYywgZmFpbEZ1bmMpO1xuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdGRvbmVGdW5jKCk7XG5cdH1cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIF9hbWlfaW50ZXJuYWxfYWx3YXlzKGRlZmVycmVkLCBhbHdheXNGdW5jKVxue1xuXHRpZihkZWZlcnJlZCAmJiBkZWZlcnJlZC5hbHdheXMpXG5cdHtcblx0XHRkZWZlcnJlZC5hbHdheXMoYWx3YXlzRnVuYyk7XG5cdH1cblx0ZWxzZVxuXHR7XG5cdFx0YWx3YXlzRnVuYygpO1xuXHR9XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pV2ViQXBwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgQU1JIHdlYmFwcCBzdWJzeXN0ZW1cbiAqIEBuYW1lc3BhY2UgYW1pV2ViQXBwXG4gKi9cblxuJEFNSU5hbWVzcGFjZSgnYW1pV2ViQXBwJywgLyoqIEBsZW5kcyBhbWlXZWJBcHAgKi8ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQUklWQVRFIE1FTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9pZFJlZ0V4cDogbmV3IFJlZ0V4cCgnW2EtekEtWl1bYS16QS1aMC05XXs3fV9bYS16QS1aMC05XXs0fV9bYS16QS1aMC05XXs0fV9bYS16QS1aMC05XXs0fV9bYS16QS1aMC05XXsxMn0nLCAnZycpLFxuXG5cdF9saW5rRXhwOiBuZXcgUmVnRXhwKCdcXFxcWyhbXlxcXFxdXSopXFxcXF1cXFxcKChbXlxcXFwpXSopXFxcXCknLCAnZycpLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2VtYmVkZGVkOiBmYWxzZSxcblx0X25vQm9vdHN0cmFwOiBmYWxzZSxcblx0X25vRGF0ZVRpbWVQaWNrZXI6IGZhbHNlLFxuXHRfbm9TZWxlY3QyOiBmYWxzZSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9nbG9iYWxEZWZlcnJlZDogJC5EZWZlcnJlZCgpLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3NoZWV0czogW10sXG5cdF9zY3JpcHRzOiBbXSxcblxuXHRfY29udHJvbHM6IHt9LFxuXHRfc3ViYXBwczoge30sXG5cblx0X2lzUmVhZHk6IGZhbHNlLFxuXHRfY2FuTGVhdmU6IHRydWUsXG5cdF9sb2NrQ250OiAweDAwLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2N1cnJlbnRTdWJBcHBJbnN0YW5jZTogbmV3IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMub25SZWFkeSA9IGZ1bmN0aW9uKCkge307XG5cdFx0dGhpcy5vbkV4aXQgPSBmdW5jdGlvbigpIHt9O1xuXHRcdHRoaXMub25Mb2dpbiA9IGZ1bmN0aW9uKCkge307XG5cdFx0dGhpcy5vbkxvZ291dCA9IGZ1bmN0aW9uKCkge307XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFRoZSBvcmlnaW4gVVJMXG5cdCAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICovXG5cblx0b3JpZ2luVVJMOiAnLycsXG5cblx0LyoqXG5cdCAgKiBUaGUgd2ViYXBwIFVSTFxuXHQgICogQHR5cGUge1N0cmluZ31cblx0ICAqL1xuXG5cdHdlYkFwcFVSTDogJy8nLFxuXG5cdC8qKlxuXHQgICogVGhlIGFuY2hvciBwYXJ0IG9mIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICovXG5cblx0aGFzaDogJycsXG5cblx0LyoqXG5cdCAgKiBUaGUgYXJndW1lbnRzIGV4dHJhY3RlZCBmcm9tIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAdHlwZSB7QXJyYXk8U3RyaW5nPn1cblx0ICAqL1xuXG5cdGFyZ3M6IHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNUQVRJQyBDT05TVFJVQ1RPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEdFVCBGTEFHUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1cmwgPSBhbWlSb3V0ZXIuZ2V0U2NyaXB0VVJMKCk7XG5cblx0XHRjb25zdCBpZHggPSB1cmwuaW5kZXhPZignPycpO1xuXG5cdFx0aWYoaWR4ID4gMClcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgZmxhZ3MgPSB1cmwuc3Vic3RyaW5nKGlkeCkudG9Mb3dlckNhc2UoKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRoaXMuX2VtYmVkZGVkID0gKGZsYWdzLmluZGV4T2YoJ2VtYmVkZGVkJykgPj0gMCk7XG5cblx0XHRcdHRoaXMuX25vQm9vdHN0cmFwID0gKGZsYWdzLmluZGV4T2YoJ25vYm9vdHN0cmFwJykgPj0gMCk7XG5cblx0XHRcdHRoaXMuX25vRGF0ZVRpbWVQaWNrZXIgPSAoZmxhZ3MuaW5kZXhPZignbm9kYXRldGltZXBpY2tlcicpID49IDApO1xuXG5cdFx0XHR0aGlzLl9ub1NlbGVjdDIgPSAoZmxhZ3MuaW5kZXhPZignbm9zZWxlY3QyJykgPj0gMCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBHRVQgVVJMUywgSEFTSCBBTkQgQVJHUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5vcmlnaW5VUkwgPSBhbWlSb3V0ZXIuZ2V0T3JpZ2luVVJMKCk7XG5cdFx0dGhpcy53ZWJBcHBVUkwgPSBhbWlSb3V0ZXIuZ2V0V2ViQXBwVVJMKCk7XG5cblx0XHR0aGlzLmhhc2ggPSBhbWlSb3V0ZXIuZ2V0SGFzaCgpO1xuXHRcdHRoaXMuYXJncyA9IGFtaVJvdXRlci5nZXRBcmdzKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTE9BRCBTSEVFVFMgQU5EIFNDUklQVFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHJlc291cmNlc0NTUyA9IFtdO1xuXHRcdGNvbnN0IHJlc291cmNlc0pTID0gW107XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighd2luZG93LlBvcHBlcilcblx0XHR7XG5cdFx0XHRyZXNvdXJjZXNKUy5wdXNoKHRoaXMub3JpZ2luVVJMICsgJy9qcy9wb3BwZXIubWluLmpzJyk7XG5cdFx0fVxuXG5cdFx0aWYoIXdpbmRvdy5tb21lbnQpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvbW9tZW50Lm1pbi5qcycpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKCh0eXBlb2YgalF1ZXJ5LmZuLnFyY29kZSkgIT09ICdmdW5jdGlvbicpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvanF1ZXJ5LXFyY29kZS5taW4uanMnKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighdGhpcy5fbm9Cb290c3RyYXAgJiYgKHR5cGVvZiBqUXVlcnkuZm4ubW9kYWwpICE9PSAnZnVuY3Rpb24nKVxuXHRcdHtcblx0XHRcdHJlc291cmNlc0NTUy5wdXNoKHRoaXMub3JpZ2luVVJMICsgJy9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnKTtcblx0XHRcdHJlc291cmNlc0pTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2pzL2Jvb3RzdHJhcC5taW4uanMnKTtcblx0XHR9XG5cblx0XHRpZighdGhpcy5fbm9EYXRlVGltZVBpY2tlciAmJiAodHlwZW9mIGpRdWVyeS5mbi5kYXRldGltZXBpY2tlcikgIT09ICdmdW5jdGlvbicpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzQ1NTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXIubWluLmNzcycpO1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyLm1pbi5qcycpO1xuXHRcdH1cblxuXHRcdGlmKCF0aGlzLl9ub1NlbGVjdDIgJiYgKHR5cGVvZiBqUXVlcnkuZm4uc2VsZWN0MikgIT09ICdmdW5jdGlvbicpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzQ1NTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9zZWxlY3QyLm1pbi5jc3MnKTtcblx0XHRcdHJlc291cmNlc0pTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2pzL3NlbGVjdDIubWluLmpzJyk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdC4uLnJlc291cmNlc0NTUyxcblx0XHRcdHRoaXMub3JpZ2luVVJMICsgJy9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnLFxuXHRcdFx0dGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9hbWkubWluLmNzcycsXG5cdFx0XHQuLi5yZXNvdXJjZXNKUyxcblx0XHRdKS5kb25lKCgvKi0tLSovKSA9PiB7XG5cblx0XHRcdHRoaXMuX2dsb2JhbERlZmVycmVkLnJlc29sdmUoLyotLS0qLyk7XG5cblx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2dsb2JhbERlZmVycmVkLnJlamVjdChtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBNT0RFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hlY2tzIHdoZXRoZXIgdGhlIFdlYkFwcCBpcyBleGVjdXRlZCBpbiBlbWJlZGRlZCBtb2RlXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGlzRW1iZWRkZWQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9lbWJlZGRlZDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hlY2tzIHdoZXRoZXIgdGhlIFdlYkFwcCBpcyBleGVjdXRlZCBsb2NhbGx5IChmaWxlOi8vLCBsb2NhbGhvc3QsIDEyNy4wLjAuMSBvciA6OjEpXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGlzTG9jYWw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gKCgnZmlsZTonKSlcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUgPT09ICdsb2NhbGhvc3QnXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnMTI3LjAuMC4xJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gKCgoJzo6MScpKSlcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVE9PTFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0eXBlT2Y6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCBuYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuIG5hbWUuc3RhcnRzV2l0aCgnW29iamVjdCAnKSA/IG5hbWUuc3Vic3RyaW5nKDgsIG5hbWUubGVuZ3RoIC0gMSlcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogLyotLS0tLS0tLS0tLSovICcnIC8qLS0tLS0tLS0tLS0qL1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGFzQXJyYXk6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50eXBlT2YoeCkgPT09ICdBcnJheScgPyAoeClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbeF1cblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXR1cDogZnVuY3Rpb24ob3B0aW9uTmFtZXMsIG9wdGlvbkRlZmF1bHRzLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgbCA9IG9wdGlvbk5hbWVzLmxlbmd0aDtcblx0XHRjb25zdCBtID0gb3B0aW9uRGVmYXVsdHMubGVuZ3RoO1xuXG5cdFx0aWYobCAhPT0gbSlcblx0XHR7XG5cdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHNldHRpbmdzKSB7XG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKG9wdGlvbk5hbWVzW2ldIGluIHNldHRpbmdzID8gc2V0dGluZ3Nbb3B0aW9uTmFtZXNbaV1dIDogb3B0aW9uRGVmYXVsdHNbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcblx0XHRcdFx0cmVzdWx0LnB1c2goLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyBvcHRpb25EZWZhdWx0c1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlcGxhY2U6IGFtaVR3aWcuc3RkbGliLl9yZXBsYWNlLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3RleHRUb0h0bWxYOiBbJyYnICAgICwgJ1wiJyAgICAgLCAnPCcgICAsICc+JyAgIF0sXG5cdF90ZXh0VG9IdG1sWTogWycmYW1wOycsICcmcXVvdDsnLCAnJmx0OycsICcmZ3Q7J10sXG5cblx0LyoqXG5cdCAgKiBFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIEhUTUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0dGV4dFRvSHRtbDogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5fdGV4dFRvSHRtbFgsIHRoaXMuX3RleHRUb0h0bWxZKTtcblx0fSxcblxuXHQvKipcblx0ICAqIFVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSFRNTCB0byB0ZXh0XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGh0bWxUb1RleHQ6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKHMgfHwgJycsIHRoaXMuX3RleHRUb0h0bWxZLCB0aGlzLl90ZXh0VG9IdG1sWCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfdGV4dFRvU3RyaW5nWDogWydcXFxcJyAgLCAnXFxuJyAsICdcIicgICwgJ1xcJycgIF0sXG5cdF90ZXh0VG9TdHJpbmdZOiBbJ1xcXFxcXFxcJywgJ1xcXFxuJywgJ1xcXFxcIicsICdcXFxcXFwnJ10sXG5cblx0LyoqXG5cdCAgKiBFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIEphdmFTY3JpcHQgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSB1bmVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdHRleHRUb1N0cmluZzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5fdGV4dFRvU3RyaW5nWCwgdGhpcy5fdGV4dFRvU3RyaW5nWSk7XG5cdH0sXG5cblx0LyoqXG5cdCAgKiBVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEphdmFTY3JpcHQgc3RyaW5nIHRvIHRleHRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0c3RyaW5nVG9UZXh0OiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TdHJpbmdZLCB0aGlzLl90ZXh0VG9TdHJpbmdYKTtcblxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2h0bWxUb1N0cmluZ1g6IFsnXFxcXCcgICwgJ1xcbicgLCAnJnF1b3Q7JyAgLCAnXFwnJyAgXSxcblx0X2h0bWxUb1N0cmluZ1k6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXCZxdW90OycsICdcXFxcXFwnJ10sXG5cblx0LyoqXG5cdCAgKiBFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBIVE1MIHRvIEphdmFTY3JpcHQgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSB1bmVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGh0bWxUb1N0cmluZzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5faHRtbFRvU3RyaW5nWCwgdGhpcy5faHRtbFRvU3RyaW5nWSk7XG5cdH0sXG5cblx0LyoqXG5cdCAgKiBVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEphdmFTY3JpcHQgc3RyaW5nIHRvIEhUTUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0c3RyaW5nVG9IdG1sOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl9odG1sVG9TdHJpbmdZLCB0aGlzLl9odG1sVG9TdHJpbmdYKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF90ZXh0VG9TUUxYOiBbJ1xcJycgIF0sXG5cdF90ZXh0VG9TUUxZOiBbJ1xcJ1xcJyddLFxuXG5cdC8qKlxuXHQgICogRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBTUUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0dGV4dFRvU1FMOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TUUxYLCB0aGlzLl90ZXh0VG9TUUxZKTtcblx0fSxcblxuXHQvKipcblx0ICAqIFVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gU1FMIHRvIHRleHRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0c3FsVG9UZXh0OiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TUUxZLCB0aGlzLl90ZXh0VG9TUUxYKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBCQVNFNjQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9iYXNlNjQ6ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OS1fJyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRW5jb2RlcyAoUkZDIDQ2NDgpIGEgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBkZWNvZGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGVuY29kZWQgc3RyaW5nXG5cdCAgKi9cblxuXHRiYXNlNjRFbmNvZGU6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRsZXQgdztcblxuXHRcdGNvbnN0IGUgPSBbXTtcblxuXHRcdGNvbnN0IGwgPSBzLmxlbmd0aCwgbSA9IGwgJSAzO1xuXG5cdFx0Y29uc3QgdGhpc19iYXNlNjQgPSB0aGlzLl9iYXNlNjQ7XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDspXG5cdFx0e1xuXHRcdFx0dyA9IHMuY2hhckNvZGVBdChpKyspIDw8IDE2XG5cdFx0XHQgICAgfFxuXHRcdFx0ICAgIHMuY2hhckNvZGVBdChpKyspIDw8IDhcblx0XHRcdCAgICB8XG5cdFx0XHQgICAgcy5jaGFyQ29kZUF0KGkrKykgPDwgMFxuXHRcdFx0O1xuXG5cdFx0XHRlLnB1c2godGhpc19iYXNlNjQuY2hhckF0KCh3ID4+IDE4KSAmIDB4M0YpKTtcblx0XHRcdGUucHVzaCh0aGlzX2Jhc2U2NC5jaGFyQXQoKHcgPj4gMTIpICYgMHgzRikpO1xuXHRcdFx0ZS5wdXNoKHRoaXNfYmFzZTY0LmNoYXJBdCgodyA+PiA2KSAmIDB4M0YpKTtcblx0XHRcdGUucHVzaCh0aGlzX2Jhc2U2NC5jaGFyQXQoKHcgPj4gMCkgJiAweDNGKSk7XG5cdFx0fVxuXG5cdFx0LyoqLyBpZihtID09PSAxKSB7XG5cdFx0XHRlLnNwbGljZSgtMiwgMik7XG5cdFx0fVxuXHRcdGVsc2UgaWYobSA9PT0gMikge1xuXHRcdFx0ZS5zcGxpY2UoLTEsIDEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBlLmpvaW4oJycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBEZWNvZGVzIChSRkMgNDY0OCkgYSBzdHJpbmdcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVuY29kZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZGVjb2RlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGJhc2U2NERlY29kZTogZnVuY3Rpb24ocylcblx0e1xuXHRcdGxldCB3O1xuXG5cdFx0Y29uc3QgZSA9IFtdO1xuXG5cdFx0Y29uc3QgbCA9IHMubGVuZ3RoLCBtID0gbCAlIDQ7XG5cblx0XHRjb25zdCB0aGlzX2Jhc2U2NCA9IHRoaXMuX2Jhc2U2NDtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOylcblx0XHR7XG5cdFx0XHR3ID0gdGhpc19iYXNlNjQuaW5kZXhPZihzLmNoYXJBdChpKyspKSA8PCAxOFxuXHRcdFx0ICAgIHxcblx0XHRcdCAgICB0aGlzX2Jhc2U2NC5pbmRleE9mKHMuY2hhckF0KGkrKykpIDw8IDEyXG5cdFx0XHQgICAgfFxuXHRcdFx0ICAgIHRoaXNfYmFzZTY0LmluZGV4T2Yocy5jaGFyQXQoaSsrKSkgPDwgNlxuXHRcdFx0ICAgIHxcblx0XHRcdCAgICB0aGlzX2Jhc2U2NC5pbmRleE9mKHMuY2hhckF0KGkrKykpIDw8IDBcblx0XHRcdDtcblxuXHRcdFx0ZS5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoKHcgPj4+IDE2KSAmIDB4RkYpKTtcblx0XHRcdGUucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh3ID4+PiA4KSAmIDB4RkYpKTtcblx0XHRcdGUucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh3ID4+PiAwKSAmIDB4RkYpKTtcblx0XHR9XG5cblx0XHQvKiovIGlmKG0gPT09IDIpIHtcblx0XHRcdGUuc3BsaWNlKC0yLCAyKTtcblx0XHR9XG5cdFx0ZWxzZSBpZihtID09PSAzKSB7XG5cdFx0XHRlLnNwbGljZSgtMSwgMSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGUuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogRFlOQU1JQyBSRVNPVVJDRSBMT0FESU5HICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZ2V0RXh0ZW5zaW9uOiBmdW5jdGlvbih1cmwpXG5cdHtcblx0XHRjb25zdCBpZHggPSB1cmwubGFzdEluZGV4T2YoJy4nKTtcblxuXHRcdHJldHVybiBpZHggPiAwID8gdXJsLnN1YnN0cmluZyhpZHgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZ2V0RGF0YVR5cGU6IGZ1bmN0aW9uKHVybCwgZGF0YVR5cGUpXG5cdHtcblx0XHRsZXQgcmVzdWx0O1xuXG5cdFx0aWYoZGF0YVR5cGUgPT09ICdhdXRvJylcblx0XHR7XG5cdFx0XHQvKiovIGlmKHVybC5pbmRleE9mKCdjdHJsOicpID09PSAwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSAnY29udHJvbCc7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmKHVybC5pbmRleE9mKCdzdWJhcHA6JykgPT09IDApXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdCA9ICdzdWJhcHAnO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRzd2l0Y2godGhpcy5fZ2V0RXh0ZW5zaW9uKHVybCkudG9Mb3dlckNhc2UoKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNhc2UgJy5jc3MnOlxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gJ3NoZWV0Jztcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAnLmpzJzpcblx0XHRcdFx0XHRcdHJlc3VsdCA9ICdzY3JpcHQnO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICcuanNvbic6XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAnanNvbic7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJy54bWwnOlxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gJ3htbCc7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAndGV4dCc7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0ID0gZGF0YVR5cGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9fbG9hZFhYWDogZnVuY3Rpb24oZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpXG5cdHtcblx0XHRpZih1cmxzLmxlbmd0aCA9PT0gMClcblx0XHR7XG5cdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVzb2x2ZVdpdGgoY29udGV4dCwgW3Jlc3VsdF0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVybCA9IHVybHMuc2hpZnQoKS50cmltKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkYXRhVFlQRSA9IHRoaXMuX2dldERhdGFUeXBlKHVybCwgZGF0YVR5cGUpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0c3dpdGNoKGRhdGFUWVBFKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQ09OVFJPTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnY29udHJvbCc6XG5cblx0XHRcdFx0dGhpcy5sb2FkQ29udHJvbCh1cmwpLnRoZW4oKGRhdGEpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGRhdGEpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU1VCQVBQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnc3ViYXBwJzpcblxuXHRcdFx0XHR0aGlzLmxvYWRTdWJBcHAodXJsKS50aGVuKChkYXRhKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucHVzaChkYXRhKTtcblxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgcmVzdWx0LCB1cmxzLCBkYXRhVHlwZSwgY29udGV4dCk7XG5cblx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNIRUVUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ3NoZWV0JzpcblxuXHRcdFx0XHRpZih0aGlzLl9zaGVldHMuaW5kZXhPZih1cmwpID49IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChmYWxzZSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0XHR1cmw6IHVybCxcblx0XHRcdFx0XHRcdGFzeW5jOiBmYWxzZSxcblx0XHRcdFx0XHRcdGNhY2hlOiBmYWxzZSxcblx0XHRcdFx0XHRcdGNyb3NzRG9tYWluOiB0cnVlLFxuXHRcdFx0XHRcdFx0ZGF0YVR5cGU6IGRhdGFUWVBFLFxuXHRcdFx0XHRcdH0pLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaCh0cnVlKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5fc2hlZXRzLnB1c2godXJsKTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblxuXHRcdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBgJyArIHVybCArICdgJ10pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU0NSSVBUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnc2NyaXB0JzpcblxuXHRcdFx0XHRpZih0aGlzLl9zY3JpcHRzLmluZGV4T2YodXJsKSA+PSAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goZmFsc2UpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRcdFx0XHRhc3luYzogZmFsc2UsXG5cdFx0XHRcdFx0XHRjYWNoZTogZmFsc2UsXG5cdFx0XHRcdFx0XHRjcm9zc0RvbWFpbjogdHJ1ZSxcblx0XHRcdFx0XHRcdGRhdGFUeXBlOiBkYXRhVFlQRSxcblx0XHRcdFx0XHR9KS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnB1c2godHJ1ZSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuX3NjcmlwdHMucHVzaCh1cmwpO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIGAnICsgdXJsICsgJ2AnXSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBPVEhFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRcdFx0YXN5bmM6IHRydWUsXG5cdFx0XHRcdFx0Y2FjaGU6IGZhbHNlLFxuXHRcdFx0XHRcdGNyb3NzRG9tYWluOiB0cnVlLFxuXHRcdFx0XHRcdGRhdGFUeXBlOiBkYXRhVFlQRSxcblx0XHRcdFx0fSkudGhlbigoZGF0YSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goZGF0YSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgYCcgKyB1cmwgKyAnYCddKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9sb2FkWFhYOiBmdW5jdGlvbih1cmxzLCBkYXRhVHlwZSwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtkZWZlcnJlZF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgW10sIHRoaXMuYXNBcnJheSh1cmxzKSwgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgcmVzb3VyY2VzIGJ5IGV4dGVuc2lvblxuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRSZXNvdXJjZXM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ2F1dG8nLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIENTUyBzaGVldHNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkU2hlZXRzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICdzaGVldCcsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgSlMgc2NyaXB0c1xuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRTY3JpcHRzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICdzY3JpcHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIEpTT04gZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkSlNPTnM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ2pzb24nLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIFhNTCBmaWxlc1xuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRYTUxzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICd4bWwnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIEhUTUwgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkSFRNTHM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ3RleHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIFRXSUcgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkVFdJR3M6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ3RleHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIHRleHQgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkVGV4dHM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ3RleHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSFRNTCBDT05URU5UICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfeHh4SFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIG1vZGUsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHQsIHN1ZmZpeCwgZGljdCwgdHdpZ3NdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCcsICdzdWZmaXgnLCAnZGljdCcsICd0d2lncyddLFxuXHRcdFx0W3Jlc3VsdCwgbnVsbCwgbnVsbCwgbnVsbF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihzdWZmaXgpXG5cdFx0e1xuXHRcdFx0dHdpZyA9IHR3aWcucmVwbGFjZSh0aGlzLl9pZFJlZ0V4cCwgZnVuY3Rpb24oaWQpIHtcblxuXHRcdFx0XHRyZXR1cm4gaWQgKyAnX2luc3RhbmNlJyArIHN1ZmZpeDtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IGh0bWwgPSB0aGlzLmZvcm1hdFRXSUcodHdpZywgZGljdCwgdHdpZ3MpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHByb21pc2U7XG5cblx0XHRsZXQgZWwgPSAkKHNlbGVjdG9yKTtcblxuXHRcdHN3aXRjaChtb2RlKVxuXHRcdHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0cHJvbWlzZSA9IGVsLmh0bWwoaHRtbCkucHJvbWlzZSgpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRwcm9taXNlID0gZWwucHJlcGVuZChodG1sKS5wcm9taXNlKCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdHByb21pc2UgPSBlbC5hcHBlbmQoaHRtbCkucHJvbWlzZSgpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRwcm9taXNlID0gZWwucmVwbGFjZVdpdGgoZWwuaXMoJ1tpZF0nKSA/IGh0bWwucmVwbGFjZSgvXlxccyooPFthLXpBLVpfLV0rKS8sICckMSBpZD1cIicgKyBlbC5hdHRyKCdpZCcpICsgJ1wiJykgOiBodG1sKS5wcm9taXNlKCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHByb21pc2UuZG9uZSgoKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsZXQgZWwgPSAkKHNlbGVjdG9yKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IF9maW5kID0gKG1vZGUgPT09IDMpID8gKF9zZWxlY3RvcikgPT4gZWwuZmluZFdpdGhTZWxmKF9zZWxlY3Rvcilcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKF9zZWxlY3RvcikgPT4gZWwuICAgIGZpbmQgICAgKF9zZWxlY3Rvcilcblx0XHRcdDtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKGpRdWVyeS5mbi50b29sdGlwKVxuXHRcdFx0e1xuXHRcdFx0XHRfZmluZCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoe1xuXHRcdFx0XHRcdGh0bWw6IGZhbHNlLFxuXHRcdFx0XHRcdGRlbGF5OiB7XG5cdFx0XHRcdFx0XHRzaG93OiA1MDAsXG5cdFx0XHRcdFx0XHRoaWRlOiAxMDAsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihqUXVlcnkuZm4ucG9wb3Zlcilcblx0XHRcdHtcblx0XHRcdFx0X2ZpbmQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5wb3BvdmVyKHtcblx0XHRcdFx0XHRodG1sOiB0cnVlLFxuXHRcdFx0XHRcdGRlbGF5OiB7XG5cdFx0XHRcdFx0XHRzaG93OiA1MDAsXG5cdFx0XHRcdFx0XHRoaWRlOiAxMDAsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihqUXVlcnkuZm4uZGF0ZXRpbWVwaWNrZXIpXG5cdFx0XHR7XG5cdFx0XHRcdF9maW5kKCcuZm9ybS1kYXRldGltZScpLmRhdGV0aW1lcGlja2VyKHtcblx0XHRcdFx0XHRmb3JtYXQ6ICdZWVlZLU1NLUREIEhIOm1tOnNzLlNTU1NTUydcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0X2ZpbmQoJy5mb3JtLWRhdGUnKS5kYXRldGltZXBpY2tlcih7XG5cdFx0XHRcdFx0Zm9ybWF0OiAnWVlZWS1NTS1ERCdcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0X2ZpbmQoJy5mb3JtLXRpbWUnKS5kYXRldGltZXBpY2tlcih7XG5cdFx0XHRcdFx0Zm9ybWF0OiAnSEg6bW06c3MnXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdF9maW5kKCcuZm9ybS10aW1lLWhtJykuZGF0ZXRpbWVwaWNrZXIoe1xuXHRcdFx0XHRcdGZvcm1hdDogJ0hIOm1tJ1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHdpbmRvdy5hY2UpXG5cdFx0XHR7XG5cdFx0XHRcdF9maW5kKCcuZm9ybS1lZGl0b3I6bm90KC5mb3JtLWVkaXRvci1oaWRkZW4pJykuZWFjaCgoaW5keCwgaXRlbSkgPT4ge1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgdGV4dGFyZWEgPSAkKGl0ZW0pLmFkZENsYXNzKCdmb3JtLWVkaXRvci1oaWRkZW4nKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGRpdiA9ICQoJzxkaXY+Jywge1xuXHRcdFx0XHRcdFx0J2NsYXNzJzogdGV4dGFyZWEuYXR0cignY2xhc3MnKVxuXHRcdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAucmVwbGFjZSgnZm9ybS1lZGl0b3InLCAnJykucmVwbGFjZSgnZm9ybS1lZGl0b3ItaGlkZGVuJywgJycpLFxuXHRcdFx0XHRcdFx0J3N0eWxlJzogdGV4dGFyZWEuYXR0cignc3R5bGUnKSxcblx0XHRcdFx0XHR9KS5pbnNlcnRCZWZvcmUodGV4dGFyZWEpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0ZGl2LnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNvbnN0IG1vZGUgPSB0ZXh0YXJlYS5hdHRyKCdkYXRhLW1vZGUnKSB8fCAndGV4dCc7XG5cdFx0XHRcdFx0XHRjb25zdCB0aGVtZSA9IHRleHRhcmVhLmF0dHIoJ2RhdGEtdGhlbWUnKSB8fCAnY2hyb21lJztcblxuXHRcdFx0XHRcdFx0Y29uc3Qgd3JhcCA9IHRleHRhcmVhLmF0dHIoJ2RhdGEtd3JhcCcpIHx8ICdmYWxzZSc7XG5cdFx0XHRcdFx0XHRjb25zdCByZWFkT25seSA9IHRleHRhcmVhLmF0dHIoJ2RhdGEtcmVhZC1vbmx5JykgfHwgJ2ZhbHNlJztcblx0XHRcdFx0XHRcdGNvbnN0IHNob3dHdXR0ZXIgPSB0ZXh0YXJlYS5hdHRyKCdkYXRhLXNob3ctZ3V0dGVyJykgfHwgJ3RydWUnO1xuXHRcdFx0XHRcdFx0Y29uc3QgaGlnaGxpZ2h0QWN0aXZlTGluZSA9IHRleHRhcmVhLmF0dHIoJ2RhdGEtaGlnaGxpZ2h0LWFjdGl2ZS1saW5lJykgfHwgJ2ZhbHNlJztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGFjZS5jb25maWcuc2V0KCdzdWZmaXgnLCAnLm1pbi5qcycpO1xuXG5cdFx0XHRcdFx0XHRhY2UuY29uZmlnLnNldCgnYmFzZVBhdGgnLCB0aGlzLm9yaWdpblVSTCArICcvanMvM3JkLXBhcnR5L2FjZScpO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y29uc3QgZWRpdG9yID0gYWNlLmVkaXQoZGl2WzBdLCB7XG5cdFx0XHRcdFx0XHRcdG1vZGU6ICdhY2UvbW9kZS8nICsgbW9kZSxcblx0XHRcdFx0XHRcdFx0dGhlbWU6ICdhY2UvdGhlbWUvJyArIHRoZW1lLFxuXHRcdFx0XHRcdFx0XHQvKiovXG5cdFx0XHRcdFx0XHRcdHdyYXA6ICd0cnVlJyA9PT0gd3JhcCxcblx0XHRcdFx0XHRcdFx0cmVhZE9ubHk6ICd0cnVlJyA9PT0gcmVhZE9ubHksXG5cdFx0XHRcdFx0XHRcdHNob3dHdXR0ZXI6ICd0cnVlJyA9PT0gc2hvd0d1dHRlcixcblx0XHRcdFx0XHRcdFx0aGlnaGxpZ2h0QWN0aXZlTGluZTogJ3RydWUnID09PSBoaWdobGlnaHRBY3RpdmVMaW5lLFxuXHRcdFx0XHRcdFx0XHQvKiovXG5cdFx0XHRcdFx0XHRcdG1pbkxpbmVzOiAweDAwMDAwMSxcblx0XHRcdFx0XHRcdFx0bWF4TGluZXM6IEluZmluaXR5LFxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRlZGl0b3IucmVuZGVyZXIuc2V0U2Nyb2xsTWFyZ2luKDAsIDIpO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y29uc3Qgc2Vzc2lvbiA9IGVkaXRvci5nZXRTZXNzaW9uKCk7XG5cblx0XHRcdFx0XHRcdHRleHRhcmVhLmRhdGEoJ2VkaXRvcicsIGVkaXRvcik7XG5cdFx0XHRcdFx0XHR0ZXh0YXJlYS5kYXRhKCdzZXNzaW9uJywgc2Vzc2lvbik7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRzZXNzaW9uLm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0aXRlbS52YWx1ZSA9IHNlc3Npb24uZ2V0VmFsdWUoKTtcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRzZXNzaW9uLnNldFZhbHVlKGl0ZW0udmFsdWUpO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2VsXSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFB1dHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIHRoZSB0YXJnZXQgc2VsZWN0b3Jcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0d2lnIHRoZSBUV0lHIGZyYWdtZW50XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBzdWZmaXgsIGRpY3QsIHR3aWdzKVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0cmVwbGFjZUhUTUw6IGZ1bmN0aW9uKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl94eHhIVE1MKHNlbGVjdG9yLCB0d2lnLCAwLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFByZXBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgc3VmZml4LCBkaWN0LCB0d2lncylcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdHByZXBlbmRIVE1MOiBmdW5jdGlvbihzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5feHh4SFRNTChzZWxlY3RvciwgdHdpZywgMSwgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBcHBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgc3VmZml4LCBkaWN0LCB0d2lncylcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGFwcGVuZEhUTUw6IGZ1bmN0aW9uKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl94eHhIVE1MKHNlbGVjdG9yLCB0d2lnLCAyLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEludGVycHJldGVzIHRoZSBnaXZlbiBUV0lHIHN0cmluZywgc2VlIHtAbGluayBodHRwOi8vdHdpZy5zZW5zaW9sYWJzLm9yZy9kb2N1bWVudGF0aW9ufVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge09iamVjdHxBcnJheX0gW2RpY3RdIHRoZSBkaWN0aW9uYXJ5XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3R3aWdzXSBkaWN0aW9uYXJ5IG9mIGZyYWdtZW50c1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIEludGVycHJldGVkIFRXSUcgc3RyaW5nXG5cdCAgKi9cblxuXHRmb3JtYXRUV0lHOiBmdW5jdGlvbih0d2lnLCBkaWN0ID0ge30sIHR3aWdzID0ge30pXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHJlbmRlciA9ICh0d2lnLCBkaWN0KSA9PiB7XG5cblx0XHRcdGlmKHRoaXMudHlwZU9mKGRpY3QpICE9PSAnT2JqZWN0Jylcblx0XHRcdHtcblx0XHRcdFx0ZGljdCA9IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLnR5cGVPZih0d2lncykgIT09ICdPYmplY3QnKVxuXHRcdFx0e1xuXHRcdFx0XHR0d2lncyA9IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHRkaWN0WydPUklHSU5fVVJMJ10gPSB0aGlzLm9yaWdpblVSTDtcblx0XHRcdGRpY3RbJ1dFQkFQUF9VUkwnXSA9IHRoaXMud2ViQXBwVVJMO1xuXG5cdFx0XHRyZXR1cm4gYW1pVHdpZy5lbmdpbmUucmVuZGVyKHR3aWcsIGRpY3QsIHR3aWdzKTtcblx0XHR9O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0aWYodGhpcy50eXBlT2YoZGljdCkgPT09ICdBcnJheScpXG5cdFx0XHR7XG5cdFx0XHRcdGRpY3QuZm9yRWFjaCgoRElDVCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gocmVuZGVyKHR3aWcsIERJQ1QsIHR3aWdzKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQucHVzaChyZW5kZXIodHdpZywgZGljdCwgdHdpZ3MpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Y2F0Y2goZXJyb3IpXG5cdFx0e1xuXHRcdFx0cmVzdWx0Lmxlbmd0aCA9IDA7XG5cblx0XHRcdHRoaXMuZXJyb3IoJ1RXSUcgcGFyc2luZyBlcnJvcjogJyArIGVycm9yLm1lc3NhZ2UpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSlNQQVRIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEZpbmRzIGRhdGEgd2l0aGluIHRoZSBnaXZlbiBKU09OLCBzZWUge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9kZmlsYXRvdi9qc3BhdGh9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCB0aGUgcGF0aFxuXHQgICogQHBhcmFtIHtPYmplY3R9IGpzb24gdGhlIEpTT05cblx0ICAqIEByZXR1cm5zIHtBcnJheX0gVGhlIHJlc3VsdGluZyBhcnJheVxuXHQgICovXG5cblx0anNwYXRoOiBmdW5jdGlvbihwYXRoLCBqc29uKVxuXHR7XG5cdFx0cmV0dXJuIEpTUGF0aC5hcHBseShwYXRoLCBqc29uKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBTVEFDSyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldFN0YWNrOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0cnlcblx0XHR7XG5cdFx0XHR0aHJvdyBFcnJvcigpO1xuXHRcdH1cblx0XHRjYXRjaChlMSlcblx0XHR7XG5cdFx0XHR0cnlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIGUxLnN0YWNrO1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2goZTIpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiAoKCgnJykpKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogTE9DSyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIExvY2tzIHRoZSBXZWIgYXBwbGljYXRpb25cblx0ICAqL1xuXG5cdGxvY2s6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsaW5lcyA9IHRoaXMuZ2V0U3RhY2soKS5zcGxpdCgnXFxuJyk7XG5cblx0XHRpZihsaW5lcy5sZW5ndGggPiAyKVxuXHRcdHtcblx0XHRcdGNvbnNvbGUubG9nKCdsb2NrWycgKyB0aGlzLl9sb2NrQ250ICsgJ10gOjogJyArIGxpbmVzWzJdKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cdFx0fVxuXG5cdFx0LyoqL1xuXG5cdFx0aWYodGhpcy5fbG9ja0NudCA8PSAwKVxuXHRcdHtcblx0XHRcdCQoJyNhbWlfbG9ja2VyJykuY3NzKCdkaXNwbGF5JywgJ2ZsZXgnKTtcblxuXHRcdFx0dGhpcy5fbG9ja0NudCA9IDE7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aGlzLl9sb2NrQ250Kys7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBVbmxvY2tzIHRoZSBXZWIgYXBwbGljYXRpb25cblx0ICAqL1xuXG5cdHVubG9jazogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYodGhpcy5fbG9ja0NudCA8PSAxKVxuXHRcdHtcblx0XHRcdCQoJyNhbWlfbG9ja2VyJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuXHRcdFx0dGhpcy5fbG9ja0NudCA9IDA7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aGlzLl9sb2NrQ250LS07XG5cdFx0fVxuXG5cdFx0LyoqL1xuXG5cdFx0bGV0IGxpbmVzID0gdGhpcy5nZXRTdGFjaygpLnNwbGl0KCdcXG4nKTtcblxuXHRcdGlmKGxpbmVzLmxlbmd0aCA+IDIpXG5cdFx0e1xuXHRcdFx0Y29uc29sZS5sb2coJ3VubG9ja1snICsgdGhpcy5fbG9ja0NudCArICddIDo6ICcgKyBsaW5lc1syXSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogTGVhdmUgdGhlIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0bW9kYWxMZWF2ZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxpbmVzID0gdGhpcy5nZXRTdGFjaygpLnNwbGl0KCdcXG4nKTtcblxuXHRcdGlmKGxpbmVzLmxlbmd0aCA+IDIpXG5cdFx0e1xuXHRcdFx0Y29uc29sZS5sb2coJ21vZGFsTG9ja1snICsgdGhpcy5fbG9ja0NudCArICddIDo6ICcgKyBsaW5lc1syXSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXHRcdH1cblxuXHRcdC8qKi9cblxuXHRcdHRoaXMuX2xvY2tDbnQgPSB0aGlzLl90bXBMb2NrQ250O1xuXG5cdFx0aWYodGhpcy5fbG9ja0NudCA+IDApXG5cdFx0e1xuXHRcdFx0JCgnI2FtaV9sb2NrZXInKS5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRW50ZXIgdGhlIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0bW9kYWxFbnRlcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fdG1wTG9ja0NudCA9IHRoaXMuX2xvY2tDbnQ7XG5cblx0XHRpZih0aGlzLl9sb2NrQ250ID4gMClcblx0XHR7XG5cdFx0XHQkKCcjYW1pX2xvY2tlcicpLmNzcygnZGlzcGxheScsICdub25lJyk7XG5cdFx0fVxuXG5cdFx0LyoqL1xuXG5cdFx0bGV0IGxpbmVzID0gdGhpcy5nZXRTdGFjaygpLnNwbGl0KCdcXG4nKTtcblxuXHRcdGlmKGxpbmVzLmxlbmd0aCA+IDIpXG5cdFx0e1xuXHRcdFx0Y29uc29sZS5sb2coJ21vZGFsVW5sb2NrWycgKyB0aGlzLl9sb2NrQ250ICsgJ10gOjogJyArIGxpbmVzWzJdKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBFbmFibGVzIHRoZSBtZXNzYWdlIGluIGEgY29uZmlybWF0aW9uIGRpYWxvZyBib3ggdG8gaW5mb3JtIHRoYXQgdGhlIHVzZXIgaXMgYWJvdXQgdG8gbGVhdmUgdGhlIGN1cnJlbnQgcGFnZS5cblx0ICAqL1xuXG5cdGNhbkxlYXZlOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jYW5MZWF2ZSA9IHRydWU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIERpc2FibGVzIHRoZSBtZXNzYWdlIGluIGEgY29uZmlybWF0aW9uIGRpYWxvZyBib3ggdG8gaW5mb3JtIHRoYXQgdGhlIHVzZXIgaXMgYWJvdXQgdG8gbGVhdmUgdGhlIGN1cnJlbnQgcGFnZS5cblx0ICAqL1xuXG5cdGNhbm5vdExlYXZlOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jYW5MZWF2ZSA9IGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIE1FU1NBR0VTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3B1Ymxpc2hBbGVydDogZnVuY3Rpb24oY2xhenosIHRpdGxlLCBtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc29sZS5sb2coJ0FNSSAnICsgdGl0bGUudG9VcHBlckNhc2UoKSArICc6ICcgKyBtZXNzYWdlICsgJ1xcbicgKyB0aGlzLmdldFN0YWNrKCkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGh0bWwgPSAnPGRpdiBjbGFzcz1cInRvYXN0XCIgcm9sZT1cImFsZXJ0XCIgJyArIChmYWRlT3V0ID8gJ2RhdGEtZGVsYXk9XCI2MDAwMFwiJyA6ICdkYXRhLWF1dG9oaWRlPVwiZmFsc2VcIicpICsgJz48ZGl2IGNsYXNzPVwidG9hc3QtaGVhZGVyXCI+PHN0cm9uZyBjbGFzcz1cIm1yLWF1dG8gJyArIGNsYXp6ICsgJ1wiPicgKyB0aXRsZSArICc8L3N0cm9uZz48c21hbGw+JyArIHRoaXMudGV4dFRvSHRtbCh3aW5kb3cubW9tZW50KCkuZm9ybWF0KCdERCBNTU0sIEhIOm1tOnNzJykpICsgJzwvc21hbGw+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtbC0yIG1iLTEgY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJ0b2FzdFwiPjxzcGFuPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+PC9kaXY+PGRpdiBjbGFzcz1cInRvYXN0LWJvZHlcIj4nICsgdGhpcy50ZXh0VG9IdG1sKG1lc3NhZ2UpICsgJzwvZGl2PjwvZGl2Pic7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBlbCA9ICQoJyNhbWlfYWxlcnRfY29udGVudCcpO1xuXG5cdFx0ZWwuYXBwZW5kKGh0bWwucmVwbGFjZSh0aGlzLl9saW5rRXhwLCAnPGEgaHJlZj1cIiQxXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JDI8L2E+JykpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0ZWwuZmluZCgnLnRvYXN0Omxhc3QtY2hpbGQnKS50b2FzdCgnc2hvdycpO1xuXG5cdFx0XHQkKGRvY3VtZW50KS5zY3JvbGxUb3AoMCk7XG5cblx0XHRcdHRoaXMudW5sb2NrKCk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFNob3dzIGFuICdpbmZvJyBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbWVzc2FnZSB0aGUgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtCb29sZWFufSBbZmFkZU91dD1mYWxzZV0gaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcblx0ICAqL1xuXG5cdGluZm86IGZ1bmN0aW9uKG1lc3NhZ2UsIGZhZGVPdXQpXG5cdHtcblx0XHRpZih0aGlzLnR5cGVPZihtZXNzYWdlKSA9PT0gJ0FycmF5Jylcblx0XHR7XG5cdFx0XHRtZXNzYWdlID0gbWVzc2FnZS5qb2luKCcuICcpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3B1Ymxpc2hBbGVydCgndGV4dC1pbmZvJywgJ0luZm8nLCBtZXNzYWdlLCBmYWRlT3V0KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU2hvd3MgYSAnc3VjY2VzcycgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IG1lc3NhZ2UgdGhlIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZhZGVPdXQ9ZmFsc2VdIGlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXG5cdCAgKi9cblxuXHRzdWNjZXNzOiBmdW5jdGlvbihtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0aWYodGhpcy50eXBlT2YobWVzc2FnZSkgPT09ICdBcnJheScpXG5cdFx0e1xuXHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2Uuam9pbignLiAnKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wdWJsaXNoQWxlcnQoJ3RleHQtc3VjY2VzcycsICdTdWNjZXNzJywgbWVzc2FnZSwgZmFkZU91dCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFNob3dzIGEgJ3dhcm5pbmcnIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBtZXNzYWdlIHRoZSBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge0Jvb2xlYW59IFtmYWRlT3V0PWZhbHNlXSBpZiBUcnVlLCB0aGUgbWVzc2FnZSBkaXNhcHBlYXJzIGFmdGVyIDYwc1xuXHQgICovXG5cblx0d2FybmluZzogZnVuY3Rpb24obWVzc2FnZSwgZmFkZU91dClcblx0e1xuXHRcdGlmKHRoaXMudHlwZU9mKG1lc3NhZ2UpID09PSAnQXJyYXknKVxuXHRcdHtcblx0XHRcdG1lc3NhZ2UgPSBtZXNzYWdlLmpvaW4oJy4gJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fcHVibGlzaEFsZXJ0KCd0ZXh0LXdhcm5pbmcnLCAnV2FybmluZycsIG1lc3NhZ2UsIGZhZGVPdXQpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTaG93cyBhbiAnZXJyb3InIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBtZXNzYWdlIHRoZSBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge0Jvb2xlYW59IFtmYWRlT3V0PWZhbHNlXSBpZiBUcnVlLCB0aGUgbWVzc2FnZSBkaXNhcHBlYXJzIGFmdGVyIDYwc1xuXHQgICovXG5cblx0ZXJyb3I6IGZ1bmN0aW9uKG1lc3NhZ2UsIGZhZGVPdXQpXG5cdHtcblx0XHRpZih0aGlzLnR5cGVPZihtZXNzYWdlKSA9PT0gJ0FycmF5Jylcblx0XHR7XG5cdFx0XHRtZXNzYWdlID0gbWVzc2FnZS5qb2luKCcuICcpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3B1Ymxpc2hBbGVydCgndGV4dC1kYW5nZXInLCAnRXJyb3InLCBtZXNzYWdlLCBmYWRlT3V0KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRmx1c2hlcyBtZXNzYWdlc1xuXHQgICovXG5cblx0Zmx1c2g6IGZ1bmN0aW9uKClcblx0e1xuXHRcdCQoJyNhbWlfYWxlcnRfY29udGVudCcpLmVtcHR5KCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogQlJFQURDUlVNQiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEZpbGwgdGhlIG1haW4gYnJlYWRjcnVtYlxuXHQgICogQHBhcmFtIHtBcnJheX0gaXRlbXMgdGhlIGFycmF5IG9mIGl0ZW1zIChIVE1MIGZvcm1hdClcblx0ICAqL1xuXG5cdGZpbGxCcmVhZGNydW1iOiBmdW5jdGlvbihpdGVtcylcblx0e1xuXHRcdGxldCBzID0gdGhpcy50eXBlT2YoaXRlbXMpID09PSAnQXJyYXknID8gaXRlbXMubWFwKChpdGVtKSA9PiAnPGxpIGNsYXNzPVwiYnJlYWRjcnVtYi1pdGVtXCI+JyArIGl0ZW0ucmVwbGFjZSgve3tXRUJBUFBfVVJMfX0vZywgdGhpcy53ZWJBcHBVUkwpICsgJzwvbGk+Jykuam9pbignJylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXG5cdFx0JCgnI2FtaV9icmVhZGNydW1iX2NvbnRlbnQnKS5odG1sKHMpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFdFQiBBUFBMSUNBVElPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBUaGlzIG1ldGhvZCBtdXN0IGJlIG92ZXJsb2FkZWQgYW5kIGlzIGNhbGxlZCB3aGVuIHRoZSBXZWIgYXBwbGljYXRpb24gc3RhcnRzXG5cdCAgKiBAZXZlbnQgYW1pV2ViQXBwI29uUmVhZHlcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyRGF0YVxuXHQgICovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoIXRoaXMuX2VtYmVkZGVkKVxuXHRcdHtcblx0XHRcdGFsZXJ0KCdlcnJvcjogYGFtaVdlYkFwcC5vblJlYWR5KClgIG11c3QgYmUgb3ZlcmxvYWRlZCEnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogVGhpcyBtZXRob2QgbXVzdCBiZSBvdmVybG9hZGVkIGFuZCBpcyBjYWxsZWQgd2hlbiB0aGUgdG9vbGJhciBuZWVkcyB0byBiZSB1cGRhdGVkXG5cdCAgKiBAZXZlbnQgYW1pV2ViQXBwI29uUmVmcmVzaFxuXHQgICogQHBhcmFtIHtCb29sZWFufSBpc0F1dGhcblx0ICAqL1xuXG5cdG9uUmVmcmVzaDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoIXRoaXMuX2VtYmVkZGVkKVxuXHRcdHtcblx0XHRcdGFsZXJ0KCdlcnJvcjogYGFtaVdlYkFwcC5vblJlZnJlc2goKWAgbXVzdCBiZSBvdmVybG9hZGVkIScpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTdGFydHMgdGhlIFdlYiBhcHBsaWNhdGlvblxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAobG9nb191cmwsIGhvbWVfdXJsLCBjb250YWN0X2VtYWlsLCBhYm91dF91cmwsIHRoZW1lX3VybCwgbG9ja2VyX3VybCwgcGFzc3dvcmRfYXV0aGVudGljYXRpb25fYWxsb3dlZCwgY2VydGlmaWNhdGVfYXV0aGVudGljYXRpb25fYWxsb3dlZCwgY3JlYXRlX2FjY291bnRfYWxsb3dlZCwgY2hhbmdlX2luZm9fYWxsb3dlZCwgY2hhbmdlX3Bhc3N3b3JkX2FsbG93ZWQsIGNoYW5nZV9jZXJ0aWZpY2F0ZV9hbGxvd2VkKVxuXHQgICovXG5cblx0c3RhcnQ6IGZ1bmN0aW9uKHNldHRpbmdzKVxuXHR7XG5cdFx0dGhpcy5fZ2xvYmFsRGVmZXJyZWQuZG9uZSgoKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBbXG5cdFx0XHRcdGxvZ29VUkwsIGhvbWVVUkwsIGNvbnRhY3RFbWFpbCxcblx0XHRcdFx0YWJvdXRVUkwsIHRoZW1lVVJMLCBsb2NrZXJVUkwsIGVuZHBvaW50VVJMLFxuXHRcdFx0XHRwYXNzd29yZEF1dGhlbnRpY2F0aW9uQWxsb3dlZCwgY2VydGlmaWNhdGVBdXRoZW50aWNhdGlvbkFsbG93ZWQsXG5cdFx0XHRcdGNyZWF0ZUFjY291bnRBbGxvd2VkLCBjaGFuZ2VJbmZvQWxsb3dlZCwgY2hhbmdlUGFzc3dvcmRBbGxvd2VkLCBjaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWRcblx0XHRcdF0gPSB0aGlzLnNldHVwKFtcblx0XHRcdFx0J2xvZ29fdXJsJywgJ2hvbWVfdXJsJywgJ2NvbnRhY3RfZW1haWwnLFxuXHRcdFx0XHQnYWJvdXRfdXJsJywgJ3RoZW1lX3VybCcsICdsb2NrZXJfdXJsJywgJ2VuZHBvaW50X3VybCcsXG5cdFx0XHRcdCdwYXNzd29yZF9hdXRoZW50aWNhdGlvbl9hbGxvd2VkJywgJ2NlcnRpZmljYXRlX2F1dGhlbnRpY2F0aW9uX2FsbG93ZWQnLFxuXHRcdFx0XHQnY3JlYXRlX2FjY291bnRfYWxsb3dlZCcsICdjaGFuZ2VfaW5mb19hbGxvd2VkJywgJ2NoYW5nZV9wYXNzd29yZF9hbGxvd2VkJywgJ2NoYW5nZV9jZXJ0aWZpY2F0ZV9hbGxvd2VkJyxcblx0XHRcdF0sIFtcblx0XHRcdFx0dGhpcy5vcmlnaW5VUkxcblx0XHRcdFx0XHQrICcvaW1hZ2VzL2xvZ28ucG5nJyxcblx0XHRcdFx0dGhpcy53ZWJBcHBVUkwsXG5cdFx0XHRcdCdhbWlAbHBzYy5pbjJwMy5mcicsXG5cdFx0XHRcdCdodHRwOi8vY2Vybi5jaC9hbWkvJyxcblx0XHRcdFx0dGhpcy5vcmlnaW5VUkwgKyAnL3R3aWcvQU1JL1RoZW1lL2JsdWUudHdpZycsXG5cdFx0XHRcdHRoaXMub3JpZ2luVVJMICsgJy90d2lnL0FNSS9GcmFnbWVudC9sb2NrZXIudHdpZycsXG5cdFx0XHRcdHRoaXMub3JpZ2luVVJMICsgJy9BTUkvRnJvbnRFbmQnLFxuXHRcdFx0XHR0cnVlLCB0cnVlLFxuXHRcdFx0XHR0cnVlLCB0cnVlLCB0cnVlLCB0cnVlLFxuXHRcdFx0XSwgc2V0dGluZ3MpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pQ29tbWFuZC5lbmRwb2ludCA9IGVuZHBvaW50VVJMO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0d2luZG93Lm9uYmVmb3JldW5sb2FkID0gKGUpID0+IHtcblxuXHRcdFx0XHRpZighdGhpcy5fY2FuTGVhdmUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBmID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG5cblx0XHRcdFx0XHRpZihmKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGYucmV0dXJuVmFsdWUgPSAnQ29uZmlybSB0aGF0IHlvdSB3YW50IHRvIGxlYXZlIHRoaXMgcGFnZT8nO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiAnQ29uZmlybSB0aGF0IHlvdSB3YW50IHRvIGxlYXZlIHRoaXMgcGFnZT8nO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgY29udHJvbHNVUkwgPSB0aGlzLm9yaWdpblVSTCArICcvY29udHJvbHMvQ09OVFJPTFMuanNvbic7XG5cblx0XHRcdGNvbnN0IHN1YmFwcHNVUkwgPSB0aGlzLm9yaWdpblVSTCArICcvc3ViYXBwcy9TVUJBUFBTLmpzb24nO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JC5hamF4KHt1cmw6IGNvbnRyb2xzVVJMLCBjYWNoZTogZmFsc2UsIGNyb3NzRG9tYWluOiB0cnVlLCBkYXRhVHlwZTogJ2pzb24nfSkudGhlbigoZGF0YTEpID0+IHtcblxuXHRcdFx0XHQkLmFqYXgoe3VybDogc3ViYXBwc1VSTCwgY2FjaGU6IGZhbHNlLCBjcm9zc0RvbWFpbjogdHJ1ZSwgZGF0YVR5cGU6ICdqc29uJ30pLnRoZW4oKGRhdGEyKSA9PiB7XG5cblx0XHRcdFx0XHRmb3IoY29uc3QgbmFtZSBpbiBkYXRhMSkge1xuXHRcdFx0XHRcdFx0dGhpcy5fY29udHJvbHNbbmFtZS50b0xvd2VyQ2FzZSgpXSA9IGRhdGExW25hbWVdO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGZvcihjb25zdCBuYW1lIGluIGRhdGEyKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9zdWJhcHBzW25hbWUudG9Mb3dlckNhc2UoKV0gPSBkYXRhMltuYW1lXTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZighdGhpcy5fZW1iZWRkZWQpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRcdFx0XHRcdExPR09fVVJMOiBsb2dvVVJMLFxuXHRcdFx0XHRcdFx0XHRIT01FX1VSTDogaG9tZVVSTCxcblx0XHRcdFx0XHRcdFx0Q09OVEFDVF9FTUFJTDogY29udGFjdEVtYWlsLFxuXHRcdFx0XHRcdFx0XHRBQk9VVF9VUkw6IGFib3V0VVJMLFxuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdCQuYWpheCh7dXJsOiB0aGVtZVVSTCwgY2FjaGU6IHRydWUsIGNyb3NzRG9tYWluOiB0cnVlLCBkYXRhVHlwZTogJ3RleHQnfSkudGhlbigoZGF0YTMpID0+IHtcblxuXHRcdFx0XHRcdFx0XHQkLmFqYXgoe3VybDogbG9ja2VyVVJMLCBjYWNoZTogdHJ1ZSwgY3Jvc3NEb21haW46IHRydWUsIGRhdGFUeXBlOiAndGV4dCd9KS50aGVuKChkYXRhNCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0JCgnYm9keScpLmFwcGVuZCh0aGlzLmZvcm1hdFRXSUcoZGF0YTMsIGRpY3QpICsgZGF0YTQpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5sb2NrKCk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGFtaUxvZ2luLl9zdGFydChcblx0XHRcdFx0XHRcdFx0XHRcdFx0cGFzc3dvcmRBdXRoZW50aWNhdGlvbkFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNlcnRpZmljYXRlQXV0aGVudGljYXRpb25BbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjcmVhdGVBY2NvdW50QWxsb3dlZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hhbmdlSW5mb0FsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNoYW5nZVBhc3N3b3JkQWxsb3dlZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hhbmdlQ2VydGlmaWNhdGVBbGxvd2VkXG5cdFx0XHRcdFx0XHRcdFx0XHQpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMudW5sb2NrKCk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmVycm9yKG1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0YWxlcnQoJ2NvdWxkIG5vdCBvcGVuIGAnICsgbG9ja2VyVVJMICsgJ2AsIHBsZWFzZSByZWxvYWQgdGhlIHBhZ2UuLi4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdGFsZXJ0KCdjb3VsZCBub3Qgb3BlbiBgJyArIHRoZW1lVVJMICsgJ2AsIHBsZWFzZSByZWxvYWQgdGhlIHBhZ2UuLi4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGxldCBkYXRhMyA9ICcnO1xuXG5cdFx0XHRcdFx0XHRpZigkKCcjYW1pX2FsZXJ0X2NvbnRlbnQnKS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdFx0ZGF0YTMgKz0gJzxkaXYgaWQ9XCJhbWlfYWxlcnRfY29udGVudFwiPjwvZGl2Pic7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmKCQoJyNhbWlfbG9naW5fbWVudV9jb250ZW50JykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdGRhdGEzICs9ICc8ZGl2IGlkPVwiYW1pX2xvZ2luX21lbnVfY29udGVudFwiPjwvZGl2Pic7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHQkLmFqYXgoe3VybDogbG9ja2VyVVJMLCBjYWNoZTogdHJ1ZSwgY3Jvc3NEb21haW46IHRydWUsIGRhdGFUeXBlOiAndGV4dCd9KS5kb25lKChkYXRhNCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdCQoJ2JvZHknKS5wcmVwZW5kKGRhdGEzICsgZGF0YTQpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdHRoaXMubG9jaygpO1xuXG5cdFx0XHRcdFx0XHRcdFx0YW1pTG9naW4uX3N0YXJ0KFxuXHRcdFx0XHRcdFx0XHRcdFx0cGFzc3dvcmRBdXRoZW50aWNhdGlvbkFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRjZXJ0aWZpY2F0ZUF1dGhlbnRpY2F0aW9uQWxsb3dlZCxcblx0XHRcdFx0XHRcdFx0XHRcdGNyZWF0ZUFjY291bnRBbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2hhbmdlSW5mb0FsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRjaGFuZ2VQYXNzd29yZEFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRjaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWRcblx0XHRcdFx0XHRcdFx0XHQpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnVubG9jaygpO1xuXG5cdFx0XHRcdFx0XHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmVycm9yKG1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0YWxlcnQoJ2NvdWxkIG5vdCBvcGVuIGAnICsgc3ViYXBwc1VSTCArICdgLCBwbGVhc2UgcmVsb2FkIHRoZSBwYWdlLi4uJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRhbGVydCgnY291bGQgbm90IG9wZW4gYCcgKyBjb250cm9sc1VSTCArICdgLCBwbGVhc2UgcmVsb2FkIHRoZSBwYWdlLi4uJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YWxlcnQobWVzc2FnZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIENPTlRST0xTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyBhIGNvbnRyb2xcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBjb250cm9sIHRoZSBhcnJheSBvZiBjb250cm9sIG5hbWVcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkQ29udHJvbDogZnVuY3Rpb24oY29udHJvbCwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSB0aGlzLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKGNvbnRyb2wuaW5kZXhPZignY3RybDonKSA9PT0gMClcblx0XHR7XG5cdFx0XHRjb250cm9sID0gY29udHJvbC5zdWJzdHJpbmcoNSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZGVzY3IgPSB0aGlzLl9jb250cm9sc1tjb250cm9sLnRvTG93ZXJDYXNlKCldO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoZGVzY3IpXG5cdFx0e1xuXHRcdFx0dGhpcy5sb2FkU2NyaXB0cyh0aGlzLm9yaWdpblVSTCArICcvJyArIGRlc2NyLmZpbGUpLnRoZW4oKGxvYWRlZCkgPT4ge1xuXG5cdFx0XHRcdHRyeVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgY2xhenogPSB3aW5kb3dbXG5cdFx0XHRcdFx0XHRkZXNjci5jbGF6elxuXHRcdFx0XHRcdF07XG5cblx0XHRcdFx0XHRjb25zdCBwcm9taXNlID0gbG9hZGVkWzBdID8gY2xhenoucHJvdG90eXBlLm9uUmVhZHkuYXBwbHkoY2xhenoucHJvdG90eXBlKVxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgOiAvKi0tLS0tLS0tLS0tLS0tLS0qLyBudWxsIC8qLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0X2FtaV9pbnRlcm5hbF90aGVuKHByb21pc2UsICgpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFsvKi0tLS0tLS0tLS0tLS0tLS0tLS0tKi8gY2xhenogLyotLS0tLS0tLS0tLS0tLS0tLS0tLSovXSk7XG5cblx0XHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIGNvbnRyb2wgYCcgKyBjb250cm9sICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2gobWVzc2FnZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgY29udHJvbCBgJyArIGNvbnRyb2wgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgY29udHJvbCBgJyArIGNvbnRyb2wgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgZmluZCBjb250cm9sIGAnICsgY29udHJvbCArICdgJ10pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmVudF0gPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW293bmVyXSA/Pz9cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBjb250cm9sID8/P1xuXHQgICogQHBhcmFtIHtBcnJheX0gcGFyYW1zID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNyZWF0ZUNvbnRyb2w6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIsIGNvbnRyb2wsIHBhcmFtcywgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSB0aGlzLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMubG9hZENvbnRyb2woY29udHJvbCwgc2V0dGluZ3MpLmRvbmUoKGNvbnN0cnVjdG9yKSA9PiB7XG5cblx0XHRcdGxldCBpbnN0YW5jZSA9IG5ldyBjb25zdHJ1Y3RvcihwYXJlbnQsIG93bmVyKTtcblxuXHRcdFx0X2FtaV9pbnRlcm5hbF90aGVuKGNvbnN0cnVjdG9yLnByb3RvdHlwZS5yZW5kZXIuYXBwbHkoaW5zdGFuY2UsIHBhcmFtcyksIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbaW5zdGFuY2VdLmNvbmNhdChbLi4uYXJndW1lbnRzXSkpO1xuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sIGluIHRoZSBib2R5XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmVudF0gPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW293bmVyXSA/Pz9cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBjb250cm9sID8/P1xuXHQgICogQHBhcmFtIHtBcnJheX0gcGFyYW1zV2l0aG91dFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IGNvbnRyb2xTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjcmVhdGVDb250cm9sSW5Cb2R5OiBmdW5jdGlvbihwYXJlbnQsIG93bmVyLCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0bGV0IFBBUkFNUyA9IFtdO1xuXHRcdFx0bGV0IFNFVFRJTkdTID0ge307XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRmb3IobGV0IGtleSBpbiBwYXJlbnRTZXR0aW5ncykge1xuXHRcdFx0XHRTRVRUSU5HU1trZXldID0gcGFyZW50U2V0dGluZ3Nba2V5XTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGxldCBrZXkgaW4gY29udHJvbFNldHRpbmdzKSB7XG5cdFx0XHRcdFNFVFRJTkdTW2tleV0gPSBjb250cm9sU2V0dGluZ3Nba2V5XTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdC8vLy8vLy5wdXNoKHNlbGVjdG9yKTtcblxuXHRcdFx0QXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoUEFSQU1TLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzKTtcblxuXHRcdFx0UEFSQU1TLnB1c2goU0VUVElOR1MpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0dGhpcy5jcmVhdGVDb250cm9sKHBhcmVudCwgb3duZXIsIGNvbnRyb2wsIFBBUkFNUykuZG9uZShmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgWy4uLmFyZ3VtZW50c10pO1xuXG5cdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cdFx0Y2F0Y2gobWVzc2FnZSlcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sIGluIGEgY29udGFpbmVyXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmVudF0gPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW293bmVyXSA/Pz9cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBjb250cm9sID8/P1xuXHQgICogQHBhcmFtIHtBcnJheX0gcGFyYW1zV2l0aG91dFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IGNvbnRyb2xTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBpY29uID8/P1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IHRpdGxlID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lcjogZnVuY3Rpb24ocGFyZW50LCBvd25lciwgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgaWNvbiwgdGl0bGUsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0cnlcblx0XHR7XG5cdFx0XHRwYXJlbnQuYXBwZW5kSXRlbSgnPGkgY2xhc3M9XCJmYSBmYS0nICsgdGhpcy50ZXh0VG9IdG1sKGljb24pICsgJ1wiPjwvaT4gJyArIHRoaXMudGV4dFRvSHRtbCh0aXRsZSkpLmRvbmUoKHNlbGVjdG9yKSA9PiB7XG5cblx0XHRcdFx0bGV0IFBBUkFNUyA9IFtdO1xuXHRcdFx0XHRsZXQgU0VUVElOR1MgPSB7fTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGZvcihsZXQga2V5IGluIHBhcmVudFNldHRpbmdzKSB7XG5cdFx0XHRcdFx0U0VUVElOR1Nba2V5XSA9IHBhcmVudFNldHRpbmdzW2tleV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IobGV0IGtleSBpbiBjb250cm9sU2V0dGluZ3MpIHtcblx0XHRcdFx0XHRTRVRUSU5HU1trZXldID0gY29udHJvbFNldHRpbmdzW2tleV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFBBUkFNUy5wdXNoKHNlbGVjdG9yKTtcblxuXHRcdFx0XHRBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShQQVJBTVMsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MpO1xuXG5cdFx0XHRcdFBBUkFNUy5wdXNoKFNFVFRJTkdTKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHRoaXMuY3JlYXRlQ29udHJvbChwYXJlbnQsIG93bmVyLCBjb250cm9sLCBQQVJBTVMpLmRvbmUoZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgWy4uLmFyZ3VtZW50c10pO1xuXG5cdFx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Y2F0Y2gobWVzc2FnZSlcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sIGluIGEgY29udGFpbmVyIGZyb20gYSBXRUIgbGlua1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtwYXJlbnRdID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtvd25lcl0gPz8/XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gZWwgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50U2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y3JlYXRlQ29udHJvbEZyb21XZWJMaW5rOiBmdW5jdGlvbihwYXJlbnQsIG93bmVyLCBlbCwgcGFyZW50U2V0dGluZ3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGRhdGFDdHJsID0gZWwuaGFzQXR0cmlidXRlKCdkYXRhLWN0cmwnKSA/IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jdHJsJylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cblx0XHRsZXQgZGF0YUN0cmxMb2NhdGlvbiA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1jdHJsLWxvY2F0aW9uJykgPyBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY3RybC1sb2NhdGlvbicpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgZGF0YVBhcmFtcyA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1wYXJhbXMnKSA/IEpTT04ucGFyc2UoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXBhcmFtcycpKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogW11cblx0XHQ7XG5cblx0XHRsZXQgZGF0YVNldHRpbmdzID0gZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNldHRpbmdzJykgPyBKU09OLnBhcnNlKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zZXR0aW5ncycpKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHt9XG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGRhdGFJY29uID0gZWwuaGFzQXR0cmlidXRlKCdkYXRhLWljb24nKSA/IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1pY29uJylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3F1ZXN0aW9uJ1xuXHRcdDtcblxuXHRcdGxldCBkYXRhVGl0bGUgPSBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdGl0bGUnKSA/IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS10aXRsZScpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ1Vua25vd24nXG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5sb2NrKCk7XG5cblx0XHQvKiovIGlmKGRhdGFDdHJsTG9jYXRpb24gPT09ICdib2R5Jylcblx0XHR7XG5cdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVDb250cm9sSW5Cb2R5KHBhcmVudCwgb3duZXIsIGRhdGFDdHJsLCBkYXRhUGFyYW1zLCBkYXRhU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncykuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy51bmxvY2soKTtcblxuXHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZXJyb3IobWVzc2FnZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lcihwYXJlbnQsIG93bmVyLCBkYXRhQ3RybCwgZGF0YVBhcmFtcywgZGF0YVNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgZGF0YUljb24sIGRhdGFUaXRsZSwgc2V0dGluZ3MpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMudW5sb2NrKCk7XG5cblx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHR0aGlzLmVycm9yKG1lc3NhZ2UpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNVQkFQUFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dHJpZ2dlckxvZ2luOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLl9pc1JlYWR5KVxuXHRcdHtcblx0XHRcdF9hbWlfaW50ZXJuYWxfdGhlbih0aGlzLl9jdXJyZW50U3ViQXBwSW5zdGFuY2Uub25Mb2dpbih0aGlzLmFyZ3NbJ3VzZXJkYXRhJ10pLCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdF9hbWlfaW50ZXJuYWxfYWx3YXlzKHRoaXMub25SZWZyZXNoKHRydWUpLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZShtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0X2FtaV9pbnRlcm5hbF9hbHdheXModGhpcy5vblJlZnJlc2godHJ1ZSksICgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dHJpZ2dlckxvZ291dDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy5faXNSZWFkeSlcblx0XHR7XG5cdFx0XHRfYW1pX2ludGVybmFsX3RoZW4odGhpcy5fY3VycmVudFN1YkFwcEluc3RhbmNlLm9uTG9nb3V0KHRoaXMuYXJnc1sndXNlcmRhdGEnXSksIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0X2FtaV9pbnRlcm5hbF9hbHdheXModGhpcy5vblJlZnJlc2goZmFsc2UpLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZShtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0X2FtaV9pbnRlcm5hbF9hbHdheXModGhpcy5vblJlZnJlc2goZmFsc2UpLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgYSBzdWJhcHBcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdWJhcHAgdGhlIHN1YmFwcFxuXHQgICogQHBhcmFtIHs/fSBbdXNlcmRhdGFdIHRoZSB1c2VyIGRhdGFcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkU3ViQXBwOiBmdW5jdGlvbihzdWJhcHAsIHVzZXJkYXRhLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5sb2NrKCk7XG5cblx0XHRyZXN1bHQuYWx3YXlzKCgpID0+IHtcblxuXHRcdFx0dGhpcy51bmxvY2soKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHN1YmFwcC5pbmRleE9mKCdzdWJhcHA6JykgPT09IDApXG5cdFx0e1xuXHRcdFx0c3ViYXBwID0gc3ViYXBwLnN1YnN0cmluZyg3KTtcblx0XHR9XG5cblx0XHRjb25zdCBkZXNjciA9IHRoaXMuX3N1YmFwcHNbc3ViYXBwLnRvTG93ZXJDYXNlKCldO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoZGVzY3IpXG5cdFx0e1xuXHRcdFx0dGhpcy5sb2FkU2NyaXB0cyh0aGlzLm9yaWdpblVSTCArICcvJyArIGRlc2NyLmZpbGUpLnRoZW4oKGxvYWRlZCkgPT4ge1xuXG5cdFx0XHRcdHRyeVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5fY3VycmVudFN1YkFwcEluc3RhbmNlLm9uRXhpdCh1c2VyZGF0YSk7XG5cblx0XHRcdFx0XHRjb25zdCBpbnN0YW5jZSA9IHdpbmRvd1tkZXNjci5pbnN0YW5jZV07XG5cblx0XHRcdFx0XHR0aGlzLl9jdXJyZW50U3ViQXBwSW5zdGFuY2UgPSBpbnN0YW5jZTtcblxuXHRcdFx0XHRcdC8qKi9cblxuXHRcdFx0XHRcdHRoaXMuZmlsbEJyZWFkY3J1bWIoZGVzY3IuYnJlYWRjcnVtYik7XG5cblx0XHRcdFx0XHRjb25zdCBwcm9taXNlID0gbG9hZGVkWzBdID8gaW5zdGFuY2Uub25SZWFkeSh1c2VyZGF0YSlcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgIDogLyotLS0tLS0qLyBudWxsIC8qLS0tLS0tKi9cblx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRfYW1pX2ludGVybmFsX3RoZW4ocHJvbWlzZSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRjb25zdCBwcm9taXNlID0gYW1pTG9naW4uaXNBdXRoZW50aWNhdGVkKCkgPyB0aGlzLnRyaWdnZXJMb2dpbigpXG5cdFx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnRyaWdnZXJMb2dvdXQoKVxuXHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0XHRwcm9taXNlLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbLyotLS0tLS0tLS0tLS0tLS0tLS0qLyBpbnN0YW5jZSAvKi0tLS0tLS0tLS0tLS0tLS0tLSovXSk7XG5cblx0XHRcdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBzdWJhcHAgYCcgKyBzdWJhcHAgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBzdWJhcHAgYCcgKyBzdWJhcHAgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaChtZXNzYWdlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBzdWJhcHAgYCcgKyBzdWJhcHAgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgc3ViYXBwIGAnICsgc3ViYXBwICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGZpbmQgc3ViYXBwIGAnICsgc3ViYXBwICsgJ2AnXSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIExvYWRzIGEgc3ViYXBwIGJ5IFVSTFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGRlZmF1bHRTdWJBcHAgaWYgJ2FtaVdlYkFwcC5hcmdzW1wic3ViYXBwXCJdJyBpcyBudWxsLCB0aGUgZGVmYXVsdCBzdWJhcHBcblx0ICAqIEBwYXJhbSB7P30gW2RlZmF1bHRVc2VyRGF0YV0gaWYgJ2FtaVdlYkFwcC5hcmdzW1widXNlcmRhdGFcIl0nIGlzIG51bGwsIHRoZSBkZWZhdWx0IHVzZXIgZGF0YVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZFN1YkFwcEJ5VVJMOiBmdW5jdGlvbihkZWZhdWx0U3ViQXBwLCBkZWZhdWx0VXNlckRhdGEpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRpZih0aGlzLmFyZ3NbJ3YnXSlcblx0XHR7XG5cdFx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0dldEhhc2hJbmZvIC1oYXNoPVwiJyArIHRoaXMudGV4dFRvU3RyaW5nKHRoaXMuYXJnc1sndiddKSArICdcIicpLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXG5cdFx0XHR9KS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdFx0bGV0IGpzb247XG5cblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRqc29uID0gSlNPTi5wYXJzZSh0aGlzLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImpzb25cIn0uJCcsIGRhdGEpWzBdIHx8ICd7fScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoKG1lc3NhZ2UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRqc29uID0gey8qIEVNUFRZIEpTT04gICBFTVBUWSBKU09OICAgRU1QVFkgSlNPTiAgIEVNUFRZIEpTT04gICBFTVBUWSBKU09OICovfTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3Qgc3ViYXBwID0ganNvblsnc3ViYXBwJ10gfHwgZGVmYXVsdFN1YkFwcDtcblx0XHRcdFx0Y29uc3QgdXNlcmRhdGEgPSBqc29uWyd1c2VyZGF0YSddIHx8IGRlZmF1bHRVc2VyRGF0YTtcblxuXHRcdFx0XHR0aGlzLmxvYWRTdWJBcHAoc3ViYXBwLCB1c2VyZGF0YSkudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXG5cdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRpZighYW1pUm91dGVyLmNoZWNrKCkpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3Qgc3ViYXBwID0gdGhpcy5hcmdzWydzdWJhcHAnXSB8fCBkZWZhdWx0U3ViQXBwO1xuXHRcdFx0XHRjb25zdCB1c2VyZGF0YSA9IHRoaXMuYXJnc1sndXNlcmRhdGEnXSB8fCBkZWZhdWx0VXNlckRhdGE7XG5cblx0XHRcdFx0dGhpcy5sb2FkU3ViQXBwKHN1YmFwcCwgdXNlcmRhdGEpLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaS5JQ29udHJvbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIEFNSSBjb250cm9sIGludGVyZmFjZVxuICogQGludGVyZmFjZSBhbWkuSUNvbnRyb2xcbiAqL1xuXG4kQU1JSW50ZXJmYWNlKCdhbWkuSUNvbnRyb2wnLCAvKiogQGxlbmRzIGFtaS5JQ29udHJvbCAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBQYXRjaGVzIGFuIEhUTUwgaWRlbnRpZmllclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGlkIHRoZSB1bnBhdGNoZWQgSFRNTCBpZGVudGlmaWVyXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcblx0ICAqL1xuXG5cdHBhdGNoSWQ6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFB1dHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIHRoZSB0YXJnZXQgc2VsZWN0b3Jcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0d2lnIHRoZSBUV0lHIGZyYWdtZW50XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0cmVwbGFjZUhUTUw6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFByZXBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdHByZXBlbmRIVE1MOiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBcHBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGFwcGVuZEhUTUw6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENhbGxlZCB3aGVuIHRoZSBjb250cm9sIGlzIHJlYWR5IHRvIHJ1blxuXHQgICovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgaXMgcmVtb3ZlZFxuXHQgICovXG5cblx0b25SZW1vdmU6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaS5JU3ViQXBwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIEFNSSBzdWItYXBwbGljYXRpb24gaW50ZXJmYWNlXG4gKiBAaW50ZXJmYWNlIGFtaS5JU3ViQXBwXG4gKi9cblxuJEFNSUludGVyZmFjZSgnYW1pLklTdWJBcHAnLCAvKiogQGxlbmRzIGFtaS5JU3ViQXBwICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENhbGxlZCB3aGVuIHRoZSBzdWItYXBwbGljYXRpb24gaXMgcmVhZHkgdG8gcnVuXG5cdCAgKiBAcGFyYW0gez99IHVzZXJkYXRhIHVzZXJkYXRhXG5cdCAgKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIGFib3V0IHRvIGV4aXRcblx0ICAqIEBwYXJhbSB7P30gdXNlcmRhdGEgdXNlcmRhdGFcblx0ICAqL1xuXG5cdG9uRXhpdDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2FsbGVkIHdoZW4gbG9nZ2luZyBpblxuXHQgICogQHBhcmFtIHs/fSB1c2VyZGF0YSB1c2VyZGF0YVxuXHQgICovXG5cblx0b25Mb2dpbjogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2FsbGVkIHdoZW4gbG9nZ2luZyBvdXRcblx0ICAqIEBwYXJhbSB7P30gdXNlcmRhdGEgdXNlcmRhdGFcblx0ICAqL1xuXG5cdG9uTG9nb3V0OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWkuQ29udHJvbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBiYXNpYyBBTUkgY29udHJvbFxuICogQGNsYXNzIGFtaS5Db250cm9sXG4gKiBAaW1wbGVtZW50cyB7YW1pLklDb250cm9sfVxuICovXG5cbiRBTUlDbGFzcygnYW1pLkNvbnRyb2wnLCAvKiogQGxlbmRzIGFtaS5Db250cm9sICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW1wbGVtZW50czogW2FtaS5JQ29udHJvbF0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkOiBmdW5jdGlvbigpXG5cdHtcblx0XHRhbWkuQ29udHJvbC5pbnN0YW5jZUNudCA9IDE7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24ocGFyZW50LCBvd25lcilcblx0e1xuXHRcdHRoaXMuX3BhcmVudCA9IChwYXJlbnQgfHwgdGhpcyk7XG5cdFx0dGhpcy5fb3duZXIgPSAob3duZXIgfHwgdGhpcyk7XG5cblx0XHR0aGlzLmluc3RhbmNlU3VmZml4ID0gYW1pLkNvbnRyb2wuaW5zdGFuY2VDbnQrKztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldFBhcmVudDogZnVuY3Rpb24ocGFyZW50KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BhcmVudCA9IChwYXJlbnQgfHwgdGhpcyk7XG5cdH0sXG5cblx0Z2V0UGFyZW50OiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGFyZW50O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0T3duZXI6IGZ1bmN0aW9uKG93bmVyKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX293bmVyID0gKG93bmVyIHx8IHRoaXMpO1xuXHR9LFxuXG5cdGdldE93bmVyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fb3duZXI7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRTZWxlY3RvcjogZnVuY3Rpb24oc2VsZWN0b3IgPSAnJylcblx0e1xuXHRcdGlmKHNlbGVjdG9yKVxuXHRcdHtcblx0XHRcdCQoc2VsZWN0b3IpLm9uKCdyZW1vdmUnLCAoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5vblJlbW92ZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuX3NlbGVjdG9yID0gc2VsZWN0b3I7XG5cdH0sXG5cblx0Z2V0U2VsZWN0b3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zZWxlY3Rvcjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhdGNoSWQ6IGZ1bmN0aW9uKGlkZW50aWZpZXIpXG5cdHtcblx0XHRyZXR1cm4gaWRlbnRpZmllciArICdfaW5zdGFuY2UnICsgdGhpcy5pbnN0YW5jZVN1ZmZpeDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlcGxhY2VIVE1MOiBmdW5jdGlvbihzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MgPSB7fSlcblx0e1xuXHRcdHNldHRpbmdzLnN1ZmZpeCA9IHRoaXMuaW5zdGFuY2VTdWZmaXg7XG5cblx0XHRyZXR1cm4gYW1pV2ViQXBwLnJlcGxhY2VIVE1MKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwcmVwZW5kSFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzID0ge30pXG5cdHtcblx0XHRzZXR0aW5ncy5zdWZmaXggPSB0aGlzLmluc3RhbmNlU3VmZml4O1xuXG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5wcmVwZW5kSFRNTChzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YXBwZW5kSFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzID0ge30pXG5cdHtcblx0XHRzZXR0aW5ncy5zdWZmaXggPSB0aGlzLmluc3RhbmNlU3VmZml4O1xuXG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5hcHBlbmRIVE1MKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjcmVhdGVDb250cm9sOiBmdW5jdGlvbihwYXJlbnQsIGNvbnRyb2wsIHBhcmFtcywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2wocGFyZW50LCB0aGlzLCBjb250cm9sLCBwYXJhbXMsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNyZWF0ZUNvbnRyb2xJbkJvZHk6IGZ1bmN0aW9uKHBhcmVudCwgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2xJbkJvZHkocGFyZW50LCB0aGlzLCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjcmVhdGVDb250cm9sSW5Db250YWluZXI6IGZ1bmN0aW9uKHBhcmVudCwgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgaWNvbiwgdGl0bGUsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5jcmVhdGVDb250cm9sSW5Db250YWluZXIocGFyZW50LCB0aGlzLCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBpY29uLCB0aXRsZSwgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y3JlYXRlQ29udHJvbEZyb21XZWJMaW5rOiBmdW5jdGlvbihwYXJlbnQsIGVsLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2xGcm9tV2ViTGluayhwYXJlbnQsIHRoaXMsIGVsLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25SZW1vdmU6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaS5TdWJBcHAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIGJhc2ljIEFNSSBzdWItYXBwbGljYXRpb25cbiAqIEBjbGFzcyBhbWkuU3ViQXBwXG4gKiBAaW1wbGVtZW50cyB7YW1pLklTdWJBcHB9XG4gKi9cblxuJEFNSUNsYXNzKCdhbWkuU3ViQXBwJywgLyoqIEBsZW5kcyBhbWkuU3ViQXBwICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW1wbGVtZW50czogW2FtaS5JU3ViQXBwXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uRXhpdDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uTG9naW46IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvbkxvZ291dDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlDb21tYW5kICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBBTUkgY29tbWFuZCBzdWJzeXN0ZW1cbiAqIEBuYW1lc3BhY2UgYW1pQ29tbWFuZFxuICovXG5cbiRBTUlOYW1lc3BhY2UoJ2FtaUNvbW1hbmQnLCAvKiogQGxlbmRzIGFtaUNvbW1hbmQgKi8ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQVUJMSUMgTUVNQkVSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRGVmYXVsdCBlbmRwb2ludFxuXHQgICogQHR5cGUge1N0cmluZ31cblx0ICAqL1xuXG5cdGVuZHBvaW50OiAnaHR0cDovL3h4eXkuenonLFxuXG5cdC8qKlxuXHQgICogRGVmYXVsdCBjb252ZXJ0ZXJcblx0ICAqIEB0eXBlIHtTdHJpbmd9XG5cdCAgKi9cblxuXHRjb252ZXJ0ZXI6ICdBTUlYbWxUb0pzb24ueHNsJyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQVUJMSUMgTUVUSE9EUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRXhlY3V0ZXMgYW4gQU1JIGNvbW1hbmRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBjb21tYW5kIHRoZSBjb21tYW5kXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBlbmRwb2ludCwgY29udmVydGVyLCB0aW1lb3V0LCBleHRyYVBhcmFtLCBleHRyYVZhbHVlKVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0ZXhlY3V0ZTogZnVuY3Rpb24oY29tbWFuZCwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbZW5kcG9pbnQsIGNvbnZlcnRlciwgY29udGV4dCwgdGltZW91dCwgZXh0cmFQYXJhbSwgZXh0cmFWYWx1ZV0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbJ2VuZHBvaW50JywgJ2NvbnZlcnRlcicsICdjb250ZXh0JywgJ3RpbWVvdXQnLCAnZXh0cmFQYXJhbScsICdleHRyYVZhbHVlJ10sXG5cdFx0XHRbdGhpcy5lbmRwb2ludCwgdGhpcy5jb252ZXJ0ZXIsIHJlc3VsdCwgMiAqIDYwICogMTAwMCwgbnVsbCwgbnVsbF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBVUkwgPSBlbmRwb2ludC50cmltKCk7XG5cdFx0Y29uc3QgQ09NTUFORCA9IGNvbW1hbmQudHJpbSgpO1xuXHRcdGNvbnN0IENPTlZFUlRFUiA9IGNvbnZlcnRlci50cmltKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkYXRhID0ge1xuXHRcdFx0Q29tbWFuZDogQ09NTUFORCxcblx0XHRcdENvbnZlcnRlcjogQ09OVkVSVEVSLFxuXHRcdH07XG5cblx0XHRpZihleHRyYVBhcmFtKVxuXHRcdHtcblx0XHRcdGRhdGFbZXh0cmFQYXJhbV0gPSBleHRyYVZhbHVlID8gZXh0cmFWYWx1ZVxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAoKChudWxsKSkpXG5cdFx0XHQ7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdXJsV2l0aFBhcmFtZXRlcnMgPSBVUkwgKyAnPycgKyAkLnBhcmFtKGRhdGEpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoQ09OVkVSVEVSID09PSAnQU1JWG1sVG9Kc29uLnhzbCcpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBKU09OIEZPUk1BVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR1cmw6IFVSTCxcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHR0aW1lb3V0OiB0aW1lb3V0LFxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHR4aHJGaWVsZHM6IHtcblx0XHRcdFx0XHR3aXRoQ3JlZGVudGlhbHM6IHRydWVcblx0XHRcdFx0fSxcblx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcblxuXHRcdFx0XHRcdGNvbnN0IGluZm8gPSBKU1BhdGguYXBwbHkoJy5BTUlNZXNzYWdlLmluZm8uJCcsIGRhdGEpO1xuXHRcdFx0XHRcdGNvbnN0IGVycm9yID0gSlNQYXRoLmFwcGx5KCcuQU1JTWVzc2FnZS5lcnJvci4kJywgZGF0YSk7XG5cblx0XHRcdFx0XHRpZihlcnJvci5sZW5ndGggPT09IDApXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtkYXRhLCBpbmZvLmpvaW4oJy4gJyksIHVybFdpdGhQYXJhbWV0ZXJzXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbZGF0YSwgZXJyb3Iuam9pbignLiAnKSwgdXJsV2l0aFBhcmFtZXRlcnNdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVycm9yOiAoanFYSFIsIHRleHRTdGF0dXMpID0+IHtcblxuXHRcdFx0XHRcdGlmKHRleHRTdGF0dXMgPT09ICdlcnJvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGV4dFN0YXR1cyA9ICdzZXJ2aWNlIHRlbXBvcmFyaWx5IHVucmVhY2hhYmxlJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZih0ZXh0U3RhdHVzID09PSAncGFyc2VyZXJyb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRleHRTdGF0dXMgPSAncmVzb3VyY2UgdGVtcG9yYXJpbHkgdW5yZWFjaGFibGUnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGNvbnN0IGRhdGEgPSB7J0FNSU1lc3NhZ2UnOiBbeydlcnJvcic6IFt7JyQnOiB0ZXh0U3RhdHVzfV19XX07XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbZGF0YSwgdGV4dFN0YXR1cywgdXJsV2l0aFBhcmFtZXRlcnNdKTtcblx0XHRcdFx0fSxcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9IGVsc2Uge1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBPVEhFUiBGT1JNQVRTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR1cmw6IFVSTCxcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHR0aW1lb3V0OiB0aW1lb3V0LFxuXHRcdFx0XHRkYXRhVHlwZTogJ3RleHQnLFxuXHRcdFx0XHR4aHJGaWVsZHM6IHtcblx0XHRcdFx0XHR3aXRoQ3JlZGVudGlhbHM6IHRydWVcblx0XHRcdFx0fSxcblx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZGF0YSwgZGF0YSwgdXJsV2l0aFBhcmFtZXRlcnNdKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6IChqcVhIUiwgdGV4dFN0YXR1cykgPT4ge1xuXG5cdFx0XHRcdFx0aWYodGV4dFN0YXR1cyA9PT0gJ2Vycm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZXh0U3RhdHVzID0gJ3NlcnZpY2UgdGVtcG9yYXJpbHkgdW5yZWFjaGFibGUnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFt0ZXh0U3RhdHVzLCB0ZXh0U3RhdHVzLCB1cmxXaXRoUGFyYW1ldGVyc10pO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBMb2dzIGluIGJ5IGxvZ2luL3Bhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlciB0aGUgdXNlclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhc3MgdGhlIHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0cGFzc0xvZ2luOiBmdW5jdGlvbih1c2VyLCBwYXNzLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmV4ZWN1dGUoJ0dldFNlc3Npb25JbmZvIC1BTUlVc2VyPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodXNlcikgKyAnXCIgLUFNSVBhc3M9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwYXNzKSArICdcIicsIHtleHRyYVBhcmFtOiAnTm9DZXJ0J30pLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0Y29uc3QgdXNlckluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHJvbGVJbmZvID0ge307XG5cdFx0XHRjb25zdCB1ZHBJbmZvID0ge307XG5cdFx0XHRjb25zdCBzc29JbmZvID0ge31cblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInVzZXJcIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHVzZXJJbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJ1ZHBcIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHVkcEluZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInNzb1wifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0c3NvSW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwicm9sZVwifS5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRsZXQgbmFtZSA9ICcnO1xuXHRcdFx0XHRjb25zdCByb2xlID0ge307XG5cblx0XHRcdFx0cm93LmZpZWxkLmZvckVhY2goKGZpZWxkKSA9PiB7XG5cblx0XHRcdFx0XHRyb2xlW2ZpZWxkWydAbmFtZSddXSA9IGZpZWxkWyckJ107XG5cblx0XHRcdFx0XHRpZihmaWVsZFsnQG5hbWUnXSA9PT0gJ25hbWUnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWUgPSBmaWVsZFsnJCddO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cm9sZUluZm9bbmFtZV0gPSByb2xlO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvXSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbZGF0YSwgbWVzc2FnZSwge0FNSVVzZXI6ICdndWVzdCcsIGd1ZXN0VXNlcjogJ2d1ZXN0J30sIHt9LCB7fSwge31dKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBMb2dzIGluIGJ5IGNlcnRpZmljYXRlXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y2VydExvZ2luOiBmdW5jdGlvbihzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmV4ZWN1dGUoJ0dldFNlc3Npb25JbmZvJykudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRjb25zdCB1c2VySW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgcm9sZUluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHVkcEluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHNzb0luZm8gPSB7fTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInVzZXJcIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHVzZXJJbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJ1ZHBcIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHVkcEluZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInNzb1wifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0c3NvSW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwicm9sZVwifS5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRsZXQgbmFtZSA9ICcnO1xuXHRcdFx0XHRjb25zdCByb2xlID0ge307XG5cblx0XHRcdFx0cm93LmZpZWxkLmZvckVhY2goKGZpZWxkKSA9PiB7XG5cblx0XHRcdFx0XHRyb2xlW2ZpZWxkWydAbmFtZSddXSA9IGZpZWxkWyckJ107XG5cblx0XHRcdFx0XHRpZihmaWVsZFsnQG5hbWUnXSA9PT0gJ25hbWUnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWUgPSBmaWVsZFsnJCddO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cm9sZUluZm9bbmFtZV0gPSByb2xlO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvXSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbZGF0YSwgbWVzc2FnZSwge0FNSVVzZXI6ICdndWVzdCcsIGd1ZXN0VXNlcjogJ2d1ZXN0J30sIHt9LCB7fSwge31dKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBMb2dzIG91dFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvZ291dDogZnVuY3Rpb24oc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5leGVjdXRlKCdHZXRTZXNzaW9uSW5mbyAtQU1JVXNlcj1cIlwiIC1BTUlQYXNzPVwiXCInLCB7ZXh0cmFQYXJhbTogJ05vQ2VydCd9KS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGNvbnN0IHVzZXJJbmZvID0ge307XG5cdFx0XHRjb25zdCByb2xlSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3QgdWRwSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgc3NvSW5mbyA9IHt9XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJ1c2VyXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1c2VySW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwidWRwXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1ZHBJbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJzc29cIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHNzb0luZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInJvbGVcIn0ucm93JywgZGF0YSkuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0bGV0IG5hbWUgPSAnJztcblx0XHRcdFx0Y29uc3Qgcm9sZSA9IHt9O1xuXG5cdFx0XHRcdHJvdy5maWVsZC5mb3JFYWNoKChmaWVsZCkgPT4ge1xuXG5cdFx0XHRcdFx0cm9sZVtmaWVsZFsnQG5hbWUnXV0gPSBmaWVsZFsnJCddO1xuXG5cdFx0XHRcdFx0aWYoZmllbGRbJ0BuYW1lJ10gPT09ICduYW1lJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lID0gZmllbGRbJyQnXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJvbGVJbmZvW25hbWVdID0gcm9sZTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2RhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mb10pO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGEsIG1lc3NhZ2UsIHtBTUlVc2VyOiAnZ3Vlc3QnLCBndWVzdFVzZXI6ICdndWVzdCd9LCB7fSwge30sIHt9XSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXR0YWNoZXMgYSBjZXJ0aWZpY2F0ZVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHVzZXIgdGhlIHVzZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBwYXNzIHRoZSBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGF0dGFjaENlcnQ6IGZ1bmN0aW9uKHVzZXIsIHBhc3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZSgnR2V0U2Vzc2lvbkluZm8gLWF0dGFjaENlcnQgLWFtaUxvZ2luPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodXNlcikgKyAnXCIgLWFtaVBhc3N3b3JkPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcocGFzcykgKyAnXCInLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIERldGFjaGVzIGEgY2VydGlmaWNhdGVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyIHRoZSB1c2VyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGFzcyB0aGUgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRkZXRhY2hDZXJ0OiBmdW5jdGlvbih1c2VyLCBwYXNzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGUoJ0dldFNlc3Npb25JbmZvIC1kZXRhY2hDZXJ0IC1hbWlMb2dpbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHVzZXIpICsgJ1wiIC1hbWlQYXNzd29yZD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHBhc3MpICsgJ1wiJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBZGRzIGEgbmV3IHVzZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyIHRoZSB1c2VyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGFzcyB0aGUgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBmaXJzdE5hbWUgdGhlIGZpcnN0IG5hbWVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBsYXN0TmFtZSB0aGUgbGFzdCBuYW1lXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gZW1haWwgdGhlIGVtYWlsXG5cdCAgKiBAcGFyYW0ge0Jvb2xlYW59IGF0dGFjaCBhdHRhY2ggdGhlIGN1cnJlbnQgY2VydGlmaWNhdGVcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gYWdyZWUgYWdyZWUgd2l0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRhZGRVc2VyOiBmdW5jdGlvbih1c2VyLCBwYXNzLCBmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbCwgYXR0YWNoLCBhZ3JlZSwgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5leGVjdXRlKCdBZGRVc2VyIC1hbWlMb2dpbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHVzZXIpICsgJ1wiIC1hbWlQYXNzd29yZD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHBhc3MpICsgJ1wiIC1maXJzdE5hbWU9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhmaXJzdE5hbWUpICsgJ1wiIC1sYXN0TmFtZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGxhc3ROYW1lKSArICdcIiAtZW1haWw9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhlbWFpbCkgKyAnXCInICsgKGF0dGFjaCA/ICcgLWF0dGFjaCcgOiAnJykgKyAoYWdyZWUgPyAnIC1hZ3JlZScgOiAnJyksIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hhbmdlcyB0aGUgYWNjb3VudCBpbmZvcm1hdGlvblxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGZpcnN0TmFtZSB0aGUgZmlyc3QgbmFtZVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGxhc3ROYW1lIHRoZSBsYXN0IG5hbWVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBlbWFpbCB0aGUgZW1haWxcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjaGFuZ2VJbmZvOiBmdW5jdGlvbihmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbCwgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5leGVjdXRlKCdTZXRVc2VySW5mbyAtZmlyc3ROYW1lPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZmlyc3ROYW1lKSArICdcIiAtbGFzdE5hbWU9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhsYXN0TmFtZSkgKyAnXCIgLWVtYWlsPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZW1haWwpICsgJ1wiJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDaGFuZ2VzIHRoZSBhY2NvdW50IHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlciB0aGUgdXNlclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IG9sZFBhc3MgdGhlIG9sZCBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IG5ld1Bhc3MgdGhlIG5ldyBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNoYW5nZVBhc3M6IGZ1bmN0aW9uKHVzZXIsIG9sZFBhc3MsIG5ld1Bhc3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZSgnQ2hhbmdlUGFzc3dvcmQgLWFtaUxvZ2luPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodXNlcikgKyAnXCIgLWFtaVBhc3N3b3JkT2xkPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcob2xkUGFzcykgKyAnXCIgLWFtaVBhc3N3b3JkTmV3PVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcobmV3UGFzcykgKyAnXCInLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFJlc2V0cyB0aGUgYWNjb3VudCBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHVzZXIgdGhlIHVzZXJcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRyZXNldFBhc3M6IGZ1bmN0aW9uKHVzZXIsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZSgnUmVzZXRQYXNzd29yZCAtYW1pTG9naW49XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh1c2VyKSArICdcIicsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlMb2dpbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBBTUkgYXV0aGVudGljYXRpb24gc3Vic3lzdGVtXG4gKiBAbmFtZXNwYWNlIGFtaUxvZ2luXG4gKi9cblxuJEFNSU5hbWVzcGFjZSgnYW1pTG9naW4nLCAvKiogQGxlbmRzIGFtaUxvZ2luICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXNzd29yZEF1dGhlbnRpY2F0aW9uQWxsb3dlZDogdHJ1ZSxcblx0Y2VydGlmaWNhdGVBdXRoZW50aWNhdGlvbkFsbG93ZWQ6IHRydWUsXG5cdGNyZWF0ZUFjY291bnRBbGxvd2VkOiB0cnVlLFxuXHRjaGFuZ2VJbmZvQWxsb3dlZDogdHJ1ZSxcblx0Y2hhbmdlUGFzc3dvcmRBbGxvd2VkOiB0cnVlLFxuXHRjaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWQ6IHRydWUsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR1c2VyOiAnZ3Vlc3QnLFxuXHRndWVzdDogJ2d1ZXN0JyxcblxuXHRjbGllbnRETjogJycsIC8vIGZhaXJlIGRpc3BhcmFpdHJlIGNlcyB2YXJpYWJsZXMgZXQgbGVzIGdldHRlcnNcblx0aXNzdWVyRE46ICcnLCAvLyBmYWlyZSBkaXNwYXJhaXRyZSBjZXMgdmFyaWFibGVzIGV0IGxlcyBnZXR0ZXJzXG5cblx0bm90QmVmb3JlOiAnJywgLy8gZmFpcmUgZGlzcGFyYWl0cmUgY2VzIHZhcmlhYmxlcyBldCBsZXMgZ2V0dGVyc1xuXHRub3RBZnRlcjogJycsIC8vIGZhaXJlIGRpc3BhcmFpdHJlIGNlcyB2YXJpYWJsZXMgZXQgbGVzIGdldHRlcnNcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHVzZXJJbmZvOiB7fSxcblx0cm9sZUluZm86IHt9LFxuXHR1ZHBJbmZvOiB7fSxcblx0c3NvSW5mbzoge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFJJVkFURSBNRVRIT0RTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfc3RhcnQ6IGZ1bmN0aW9uKHBhc3N3b3JkQXV0aGVudGljYXRpb25BbGxvd2VkLCBjZXJ0aWZpY2F0ZUF1dGhlbnRpY2F0aW9uQWxsb3dlZCwgY3JlYXRlQWNjb3VudEFsbG93ZWQsIGNoYW5nZUluZm9BbGxvd2VkLCBjaGFuZ2VQYXNzd29yZEFsbG93ZWQsIGNoYW5nZUNlcnRpZmljYXRlQWxsb3dlZClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2FkVFdJR3MoW1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvdHdpZy9BTUkvRnJhZ21lbnQvbG9naW5fYnV0dG9uLnR3aWcnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvdHdpZy9BTUkvRnJhZ21lbnQvbG9nb3V0X2J1dHRvbi50d2lnJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL3R3aWcvQU1JL01vZGFsL2xvZ2luLnR3aWcnLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRoaXMuZnJhZ21lbnRMb2dpbkJ1dHRvbiA9IGRhdGFbMF07XG5cdFx0XHR0aGlzLmZyYWdtZW50TG9nb3V0QnV0dG9uID0gZGF0YVsxXTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRcdHBhc3N3b3JkQXV0aGVudGljYXRpb25BbGxvd2VkOiB0aGlzLnBhc3N3b3JkQXV0aGVudGljYXRpb25BbGxvd2VkID0gcGFzc3dvcmRBdXRoZW50aWNhdGlvbkFsbG93ZWQsXG5cdFx0XHRcdGNlcnRpZmljYXRlQXV0aGVudGljYXRpb25BbGxvd2VkOiB0aGlzLmNlcnRpZmljYXRlQXV0aGVudGljYXRpb25BbGxvd2VkID0gY2VydGlmaWNhdGVBdXRoZW50aWNhdGlvbkFsbG93ZWQsXG5cdFx0XHRcdGNyZWF0ZUFjY291bnRBbGxvd2VkOiB0aGlzLmNyZWF0ZUFjY291bnRBbGxvd2VkID0gY3JlYXRlQWNjb3VudEFsbG93ZWQsXG5cdFx0XHRcdGNoYW5nZUluZm9BbGxvd2VkOiB0aGlzLmNoYW5nZUluZm9BbGxvd2VkID0gY2hhbmdlSW5mb0FsbG93ZWQsXG5cdFx0XHRcdGNoYW5nZVBhc3N3b3JkQWxsb3dlZDogdGhpcy5jaGFuZ2VQYXNzd29yZEFsbG93ZWQgPSBjaGFuZ2VQYXNzd29yZEFsbG93ZWQsXG5cdFx0XHRcdGNoYW5nZUNlcnRpZmljYXRlQWxsb3dlZDogdGhpcy5jaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWQgPSBjaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWQsXG5cdFx0XHR9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pV2ViQXBwLmFwcGVuZEhUTUwoJ2JvZHknLCBkYXRhWzJdLCB7ZGljdDogZGljdH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0I3ODk0Q0MxXzFEQUFfNEE3RV9CN0QxX0RCREY2RjA2QUM3MycpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5mb3JtX2xvZ2luKGUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcjRUUwNTVDRDRfRTU4Rl80ODM0XzgwMjBfOTg2QUUzRjhENjdEJykuc3VibWl0KChlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmZvcm1fYWRkVXNlcihlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnI0RBMjA0N0EyXzlFNURfNDIwRF9CNkU3X0ZBMjYxRDJFRjEwRicpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5mb3JtX3JlbWluZFBhc3MoZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdCQoJyNEOUVBRjk5OF9FRDhFXzQ0RDJfQTBCRV84QzVDRjVFNDM4QkQnKS5zdWJtaXQoKGUpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuZm9ybV9jaGFuZ2VJbmZvKGUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcjRTkyQTEwOTdfOTgzQl80ODU3Xzg3NUZfMDdFNDY1OUI0MUIwJykuc3VibWl0KChlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmZvcm1fY2hhbmdlUGFzcyhlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHQkKCcjRTZFMzBFRUNfMTVFRV80RkNGXzk4MDlfMkI4RUMyRkVGMzg4LCNDQ0Q4RTZGMV82REY4XzRCRERfQTBFQ19DM0MzODA4MzAxODcnKS5jaGFuZ2UoKCkgPT4ge1xuXG5cdFx0XHRcdFx0Y29uc3QgcGFzczEgPSAkKCcjRTZFMzBFRUNfMTVFRV80RkNGXzk4MDlfMkI4RUMyRkVGMzg4JykudmFsKCk7XG5cdFx0XHRcdFx0Y29uc3QgcGFzczIgPSAkKCcjQ0NEOEU2RjFfNkRGOF80QkREX0EwRUNfQzNDMzgwODMwMTg3JykudmFsKCk7XG5cblx0XHRcdFx0XHQkKCcjQ0NEOEU2RjFfNkRGOF80QkREX0EwRUNfQzNDMzgwODMwMTg3JykuZ2V0KDApLnNldEN1c3RvbVZhbGlkaXR5KFxuXHRcdFx0XHRcdFx0cGFzczEubGVuZ3RoID4gMCAmJiBwYXNzMi5sZW5ndGggPiAwICYmIHBhc3MxICE9PSBwYXNzMiA/ICdQYXNzd29yZHMgZG9uXFwndCBtYXRjaC4nIDogJydcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcjRDQ4N0ZFNzJfOEQ5NV80MDQ4X0JFQTNfMjUyMjc0ODYyQUY0LCNFRTFEQTU4Q18zNzYxXzQ3MzRfQTlDMl9FODA4Q0REN0VFNzcnKS5jaGFuZ2UoKCkgPT4ge1xuXG5cdFx0XHRcdFx0Y29uc3QgcGFzczEgPSAkKCcjRDQ4N0ZFNzJfOEQ5NV80MDQ4X0JFQTNfMjUyMjc0ODYyQUY0JykudmFsKCk7XG5cdFx0XHRcdFx0Y29uc3QgcGFzczIgPSAkKCcjRUUxREE1OENfMzc2MV80NzM0X0E5QzJfRTgwOENERDdFRTc3JykudmFsKCk7XG5cblx0XHRcdFx0XHQkKCcjRUUxREE1OENfMzc2MV80NzM0X0E5QzJfRTgwOENERDdFRTc3JykuZ2V0KDApLnNldEN1c3RvbVZhbGlkaXR5KFxuXHRcdFx0XHRcdFx0cGFzczEubGVuZ3RoID4gMCAmJiBwYXNzMi5sZW5ndGggPiAwICYmIHBhc3MxICE9PSBwYXNzMiA/ICdQYXNzd29yZHMgZG9uXFwndCBtYXRjaC4nIDogJydcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChlKSA9PiB7XG5cblx0XHRcdFx0aWYodGhpcy5zc29JbmZvLnVybC5zdGFydHNXaXRoKGUub3JpZ2luKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IHVzZXIgPSBlLmRhdGEudXNlcjtcblx0XHRcdFx0XHRjb25zdCBwYXNzID0gZS5kYXRhLnBhc3M7XG5cblx0XHRcdFx0XHRpZih1c2VyICYmIHBhc3MpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhpcy5mb3JtX2xvZ2luMih1c2VyLCBwYXNzKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRlLnNvdXJjZS5jbG9zZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sIGZhbHNlKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IHVzZXJkYXRhID0gYW1pV2ViQXBwLmFyZ3NbJ3VzZXJkYXRhJ10gfHwgJyc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRzZXRJbnRlcnZhbCgoKSA9PiB7XG5cblx0XHRcdFx0aWYoYW1pV2ViQXBwLl9pc1JlYWR5KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YW1pQ29tbWFuZC5jZXJ0TG9naW4oKS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblxuXHRcdFx0XHRcdH0pLmRvbmUoKGRhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykgPT4ge1xuXG5cdFx0XHRcdFx0XHRpZigodXNlckluZm8uQU1JVXNlciB8fCAnJykgPT09ICh1c2VySW5mby5ndWVzdFVzZXIgfHwgJycpKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cGRhdGUodXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9LCAzMCAqIDEwMDApO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pQ29tbWFuZC5jZXJ0TG9naW4oKS5mYWlsKChkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pID0+IHtcblxuXHRcdFx0XHR0aGlzLl91cGRhdGUodXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKS5hbHdheXMoKC8qLS0tKi8pID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9KS5kb25lKChkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pID0+IHtcblxuXHRcdFx0XHRfYW1pX2ludGVybmFsX3RoZW4oYW1pV2ViQXBwLm9uUmVhZHkodXNlcmRhdGEpLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuX2lzUmVhZHkgPSB0cnVlO1xuXG5cdFx0XHRcdFx0dGhpcy5fdXBkYXRlKHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykudGhlbigobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZShtZXNzYWdlKTtcblxuXHRcdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5faXNSZWFkeSA9IHRydWU7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3N1Y2Nlc3M6IGZ1bmN0aW9uKG1lc3NhZ2UpXG5cdHtcblx0XHRhbWlXZWJBcHAuc3VjY2VzcyhtZXNzYWdlLCB0cnVlKTtcblx0XHR0aGlzLl9jbGVhbigpO1xuXHR9LFxuXG5cdF9lcnJvcjogZnVuY3Rpb24obWVzc2FnZSlcblx0e1xuXHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR0aGlzLl9jbGVhbigpO1xuXHR9LFxuXG5cdF91bmxvY2s6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHR0aGlzLl9jbGVhbigpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2NsZWFuOiBmdW5jdGlvbigpXG5cdHtcblx0XHQkKCcjQjc4OTRDQzFfMURBQV80QTdFX0I3RDFfREJERjZGMDZBQzczJykudHJpZ2dlcigncmVzZXQnKTtcblx0XHQkKCcjRUUwNTVDRDRfRTU4Rl80ODM0XzgwMjBfOTg2QUUzRjhENjdEJykudHJpZ2dlcigncmVzZXQnKTtcblx0XHQkKCcjREEyMDQ3QTJfOUU1RF80MjBEX0I2RTdfRkEyNjFEMkVGMTBGJykudHJpZ2dlcigncmVzZXQnKTtcblx0XHQkKCcjRTkyQTEwOTdfOTgzQl80ODU3Xzg3NUZfMDdFNDY1OUI0MUIwJykudHJpZ2dlcigncmVzZXQnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF91cGRhdGU6IGZ1bmN0aW9uKHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVzZXIgPSB0aGlzLnVzZXIgPSB1c2VySW5mby5BTUlVc2VyIHx8ICcnO1xuXHRcdGNvbnN0IGd1ZXN0ID0gdGhpcy5ndWVzdCA9IHVzZXJJbmZvLmd1ZXN0VXNlciB8fCAnJztcblxuXHRcdGNvbnN0IG5vdEJlZm9yZSA9IHRoaXMubm90QmVmb3JlID0gdXNlckluZm8ubm90QmVmb3JlIHx8ICcnO1xuXHRcdGNvbnN0IG5vdEFmdGVyID0gdGhpcy5ub3RBZnRlciA9IHVzZXJJbmZvLm5vdEFmdGVyIHx8ICcnO1xuXG5cdFx0Y29uc3QgY2xpZW50RE5JblNlc3Npb24gPSB0aGlzLmNsaWVudEROID0gdXNlckluZm8uY2xpZW50RE5JblNlc3Npb24gfHwgJyc7XG5cdFx0Y29uc3QgaXNzdWVyRE5JblNlc3Npb24gPSB0aGlzLmlzc3VlckROID0gdXNlckluZm8uaXNzdWVyRE5JblNlc3Npb24gfHwgJyc7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQkKCcjQTA5QUUzMTZfNzA2OF80QkMxXzk2QTlfNkI4N0QyODg2M0ZFJykucHJvcCgnZGlzYWJsZWQnLCAhY2xpZW50RE5JblNlc3Npb24gfHwgIWlzc3VlckROSW5TZXNzaW9uKTtcblxuXHRcdCQoJyNDM0U5NEY2RF80OEUwXzg2QzBfMzUzNF82OTE3MjhFNDkyRjQnKS5hdHRyKCdzcmMnLCB1ZHBJbmZvLnRlcm1zQW5kQ29uZGl0aW9ucyB8fCBhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9kb2NzL3Rlcm1zX2FuZF9jb25kaXRpb25zLmh0bWwnKTtcblx0XHQkKCcjRTUwRkY4QkRfQjBGNV9DRDcyX0Y5RENfRkMyQkZBNURCQTI3JykuYXR0cignc3JjJywgdWRwSW5mby50ZXJtc0FuZENvbmRpdGlvbnMgfHwgYW1pV2ViQXBwLm9yaWdpblVSTCArICcvZG9jcy90ZXJtc19hbmRfY29uZGl0aW9ucy5odG1sJyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnVzZXJJbmZvID0gdXNlckluZm87XG5cdFx0dGhpcy5yb2xlSW5mbyA9IHJvbGVJbmZvO1xuXHRcdHRoaXMudWRwSW5mbyA9IHVkcEluZm87XG5cdFx0dGhpcy5zc29JbmZvID0gc3NvSW5mbztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRjcmVhdGVBY2NvdW50QWxsb3dlZDogdGhpcy5jcmVhdGVBY2NvdW50QWxsb3dlZCxcblx0XHRcdGNoYW5nZUluZm9BbGxvd2VkOiB0aGlzLmNoYW5nZUluZm9BbGxvd2VkLFxuXHRcdFx0Y2hhbmdlUGFzc3dvcmRBbGxvd2VkOiB0aGlzLmNoYW5nZVBhc3N3b3JkQWxsb3dlZCxcblx0XHRcdGNoYW5nZUNlcnRpZmljYXRlQWxsb3dlZDogdGhpcy5jaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWQsXG5cdFx0XHQvKiovXG5cdFx0XHRzc29fbGFiZWw6IHNzb0luZm8ubGFiZWwgfHwgJ1NTTycsXG5cdFx0XHRzc29fdXJsOiBzc29JbmZvLnVybCB8fCAnQE5VTEwnLFxuXHRcdH07XG5cblx0XHRpZih1c2VyICE9PSBndWVzdClcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEdFVCBJTkZPICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IHZhbGlkID0gdXNlckluZm8udmFsaWQgfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IGNlcnRFbmFibGVkID0gdXNlckluZm8uY2VydEVuYWJsZWQgfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IHZvbXNFbmFibGVkID0gdXNlckluZm8udm9tc0VuYWJsZWQgfHwgJ2ZhbHNlJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGZpcnN0TmFtZSA9IHVzZXJJbmZvLmZpcnN0TmFtZSB8fCAnJztcblx0XHRcdGNvbnN0IGxhc3ROYW1lID0gdXNlckluZm8ubGFzdE5hbWUgfHwgJyc7XG5cdFx0XHRjb25zdCBlbWFpbCA9IHVzZXJJbmZvLmVtYWlsIHx8ICcnO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgY2xpZW50RE5JbkFNSSA9IHVzZXJJbmZvLmNsaWVudEROSW5BTUkgfHwgJyc7XG5cdFx0XHRjb25zdCBpc3N1ZXJETkluQU1JID0gdXNlckluZm8uaXNzdWVyRE5JbkFNSSB8fCAnJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTRVQgSU5GTyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKCcjRTUxM0YyN0RfNTUyMV80QjA4X0JGNjFfNTJBRkI4MTM1NkY3JykudmFsKGZpcnN0TmFtZSk7XG5cdFx0XHQkKCcjQUZGMEI1QzBfQkVFQ180ODQyXzkxNkRfRENCQTdGNTg5MTk1JykudmFsKGxhc3ROYW1lKTtcblx0XHRcdCQoJyNDNTg3NDg2Ql82MkMwXzRCNkVfOTI4OF9EOEY5Rjg5RDE1N0InKS52YWwoZW1haWwpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCgnI0FCRUIwMjkxXzQwQjBfNDE0QV9BNDJCX0U3RUFCQjlCNDg3RScpLnZhbChmaXJzdE5hbWUpO1xuXHRcdFx0JCgnI0E1QUZEQjYyXzEwMzRfNEY2Nl9BM0U2XzkzNDFCMzFGQTI5MCcpLnZhbChsYXN0TmFtZSk7XG5cdFx0XHQkKCcjRDczMEE3NzRfMDVFQV80N0FCX0EwQzhfRDkyNzUzODAyRTNFJykudmFsKGVtYWlsKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQoJyNEMUJFRTNCRl85MTYxXzQxRENfQkM1M19DNDRGRkU0RDI1MjInKS52YWwoY2xpZW50RE5JbkFNSSk7XG5cdFx0XHQkKCcjQzc2ODA1RDdfMUU4Nl80MjMxXzkwNzFfMUQwNDc4MzQyM0JCJykudmFsKGNsaWVudEROSW5TZXNzaW9uKTtcblx0XHRcdCQoJyNGNDJGQUY2Ql8yQzhEXzQxNDJfOEJEOV9FNUJDRENBQTA1QUEnKS52YWwoaXNzdWVyRE5JbkFNSSk7XG5cdFx0XHQkKCcjRkUyRjYyMzJfQzI1Nl80QjgwXzkzOUNfRUJFQzkwMzIwMzA4JykudmFsKGlzc3VlckROSW5TZXNzaW9uKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGxldCB0YWJsZSA9IFtdO1xuXG5cdFx0XHRmb3IobGV0IHJvbGUgaW4gcm9sZUluZm8pXG5cdFx0XHR7XG5cdFx0XHRcdHRhYmxlLnB1c2goJzx0cj4nKTtcblx0XHRcdFx0dGFibGUucHVzaCgnPHRkPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChyb2xlSW5mb1tyb2xlXS5uYW1lIHx8ICdOL0EnKSArICc8L3RkPicpO1xuXHRcdFx0XHR0YWJsZS5wdXNoKCc8dGQ+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKHJvbGVJbmZvW3JvbGVdLmRlc2NyaXB0aW9uIHx8ICdOL0EnKSArICc8L3RkPicpO1xuXHRcdFx0XHR0YWJsZS5wdXNoKCc8L3RyPicpO1xuXHRcdFx0fVxuXG5cdFx0XHQkKCcjQkIwNzY3NkJfRUFDQV85QjQyX0VENTFfNDc3REIyOTc2MDQxJykuaHRtbCh0YWJsZS5qb2luKCcnKSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQ0hFQ0sgVVNFUiBTVEFUVVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGV0IGljb24gPSAnJztcblx0XHRcdGxldCBtZXNzYWdlID0gJyc7XG5cblx0XHRcdGlmKHZhbGlkICE9PSAnZmFsc2UnKVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBWQUxJRCBVU0VSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKGNlcnRFbmFibGVkICE9PSAnZmFsc2UnICYmIGNsaWVudEROSW5BTUkgJiYgaXNzdWVyRE5JbkFNSSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKCFjbGllbnRETkluU2Vzc2lvblxuXHRcdFx0XHRcdCAgIHx8XG5cdFx0XHRcdFx0ICAgIWlzc3VlckROSW5TZXNzaW9uXG5cdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0bWVzc2FnZSA9ICdJdCBpcyByZWNvbW1lbmRlZCB0byBhdXRoZW50aWNhdGUgd2l0aCBhIFguNTA5IGNlcnRpZmljYXRlLic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZihjbGllbnRETkluQU1JICE9PSBjbGllbnRETkluU2Vzc2lvblxuXHRcdFx0XHRcdFx0ICAgfHxcblx0XHRcdFx0XHRcdCAgIGlzc3VlckROSW5BTUkgIT09IGlzc3VlckROSW5TZXNzaW9uXG5cdFx0XHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0XHRcdG1lc3NhZ2UgPSAnVGhlIFguNTA5IGNlcnRpZmljYXRlIGluIHRoZSBzZXNzaW9uIGRpZmZlcnMgZnJvbSB0aGUgb25lIGluIEFNSS4nO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYobWVzc2FnZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCQoJyNEOTQ0QjAxRF8yRThEXzRFRTlfOURDQ18yNjkxNDM4QkJBMTYnKS5odG1sKCc8aSBjbGFzcz1cImZhIGZhLWluZm8tY2lyY2xlIHRleHQtd2FybmluZ1wiPjwvaT4gJyArIG1lc3NhZ2UpO1xuXG5cdFx0XHRcdFx0aWNvbiA9ICc8YSBjbGFzcz1cIm5hdi1saW5rIHRleHQtd2FybmluZ1wiIGhyZWY9XCJqYXZhc2NyaXB0OmFtaUxvZ2luLmFjY291bnRTdGF0dXMoKTtcIj4nXG5cdFx0XHRcdFx0ICAgICAgICtcblx0XHRcdFx0XHQgICAgICAgJzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGVcIj48L2k+J1xuXHRcdFx0XHRcdCAgICAgICArXG5cdFx0XHRcdFx0ICAgICAgICc8L2E+J1xuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0YzRkY5RjQzX0RFNzJfNDBCQl9CMUJBX0I3QjNDOTAwMjY3MScpLmNsb3Nlc3QoJy5yb3VuZGVkJykuY3NzKCdiYWNrZ3JvdW5kJywgJyNCOEQ0OUIgdXJsKFwiJyArIGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2ltYWdlcy9jZXJ0aWZpY2F0ZS1ncmVlbi5wbmdcIikgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXInKVxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ2JhY2tncm91bmQtc2l6ZScsICdjb3ZlcicpXG5cdFx0XHRcdDtcblxuXHRcdFx0XHQkKCcjRjNGRjlGNDNfREU3Ml80MEJCX0IxQkFfQjdCM0M5MDAyNjcxJykuY3NzKCdjb2xvcicsICcjMDA2NDAwJylcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtbGVhZlwiPjwvaT4gdmFsaWQgPGkgY2xhc3M9XCJmYSBmYS1sZWFmXCI+PC9pPicpXG5cdFx0XHRcdDtcblxuXHRcdFx0XHQkKCcjRTkxMjgwRjZfRTdDNl8zRTUzX0E0NTdfNjQ2OTk1Qzk5MzE3JykudGV4dChub3RCZWZvcmUgKyAnIC0gJyArIG5vdEFmdGVyKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBJTlZBTElEIFVTRVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKHZvbXNFbmFibGVkICE9PSAnZmFsc2UnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoIWNsaWVudEROSW5BTUlcblx0XHRcdFx0XHQgICB8fFxuXHRcdFx0XHRcdCAgICFpc3N1ZXJETkluQU1JXG5cdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0bWVzc2FnZSA9ICdSZWdpc3RlciBhIHZhbGlkIFguNTA5IGNlcnRpZmljYXRlLic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRtZXNzYWdlID0gJ0NoZWNrIHlvdXIgdmlydHVhbCBvcmdhbml6YXRpb24gcm9sZXMuJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bWVzc2FnZSA9ICdVbmV4cGVjdGVkIGlzc3VlLCBjb250YWN0IHRoZSBBTUkgdGVhbS4nO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihtZXNzYWdlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgnI0Q5NDRCMDFEXzJFOERfNEVFOV85RENDXzI2OTE0MzhCQkExNicpLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGUgdGV4dC1kYW5nZXJcIj48L2k+ICcgKyBtZXNzYWdlKTtcblxuXHRcdFx0XHRcdGljb24gPSAnPGEgY2xhc3M9XCJuYXYtbGluayB0ZXh0LWRhbmdlclwiIGhyZWY9XCJqYXZhc2NyaXB0OmFtaUxvZ2luLmFjY291bnRTdGF0dXMoKTtcIj4nXG5cdFx0XHRcdFx0ICAgICAgICtcblx0XHRcdFx0XHQgICAgICAgJzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGVcIj48L2k+J1xuXHRcdFx0XHRcdCAgICAgICArXG5cdFx0XHRcdFx0ICAgICAgICc8L2E+J1xuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0YzRkY5RjQzX0RFNzJfNDBCQl9CMUJBX0I3QjNDOTAwMjY3MScpLmNsb3Nlc3QoJy5yb3VuZGVkJykuY3NzKCdiYWNrZ3JvdW5kJywgJyNFOEM4Q0YgdXJsKFwiJyArIGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2ltYWdlcy9jZXJ0aWZpY2F0ZS1waW5rLnBuZ1wiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlcicpXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnYmFja2dyb3VuZC1zaXplJywgJ2NvdmVyJylcblx0XHRcdFx0O1xuXG5cdFx0XHRcdCQoJyNGM0ZGOUY0M19ERTcyXzQwQkJfQjFCQV9CN0IzQzkwMDI2NzEnKS5jc3MoJ2NvbG9yJywgJyM4QjAwMDAnKVxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1sZWFmXCI+PC9pPiBpbnZhbGlkIDxpIGNsYXNzPVwiZmEgZmEtbGVhZlwiPjwvaT4nKVxuXHRcdFx0XHQ7XG5cblx0XHRcdFx0JCgnI0U5MTI4MEY2X0U3QzZfM0U1M19BNDU3XzY0Njk5NUM5OTMxNycpLnRleHQobm90QmVmb3JlICsgJyAtICcgKyBub3RBZnRlcik7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBVUERBVEUgUVJDT0RFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKCcjRUM5NDgwODRfOEMwQV9DRUJGXzU4QzlfMDg2MDQ2QUIyNDU2JykucXJjb2RlKHtcblx0XHRcdFx0cmVuZGVyOiAnY2FudmFzJyxcblx0XHRcdFx0ZWNMZXZlbDogJ0gnLFxuXHRcdFx0XHRzaXplOiAxNTAsXG5cdFx0XHRcdGZpbGw6ICdyZ2JhKDAwMCwgMTAwLCAwMDAsIDEuMCknLFxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAncmdiYSgxODQsIDIxMiwgMTU1LCAxLjApJyxcblx0XHRcdFx0dGV4dDogdXNlciArICd8JyArIGZpcnN0TmFtZSArICcgJyArIGxhc3ROYW1lICsgJ3wnICsgZW1haWwgKyAnfCcgKyBjbGllbnRETkluQU1JICsgJ3wnICsgaXNzdWVyRE5JbkFNSSxcblx0XHRcdFx0cmFkaXVzOiAwLFxuXHRcdFx0XHRxdWlldDogMSxcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFVQREFURSBNRU5VIEJBUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGRpY3RbJ3VzZXInXSA9IHVzZXI7XG5cdFx0XHRkaWN0WydpY29uJ10gPSBpY29uO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX2xvZ2luX21lbnVfY29udGVudCcsIHRoaXMuZnJhZ21lbnRMb2dvdXRCdXR0b24sIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnRyaWdnZXJMb2dpbigpLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX2xvZ2luX21lbnVfY29udGVudCcsIHRoaXMuZnJhZ21lbnRMb2dpbkJ1dHRvbiwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudHJpZ2dlckxvZ291dCgpLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FVEhPRFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIHVzZXIgaW5mb3JtYXRpb25cblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBjdXJyZW50IHVzZXIgaW5mb3JtYXRpb25cblx0ICAqL1xuXG5cdGdldFVzZXJJbmZvOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy51c2VySW5mbztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgcm9sZSBpbmZvcm1hdGlvblxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGN1cnJlbnQgcm9sZSBpbmZvcm1hdGlvblxuXHQgICovXG5cblx0Z2V0Um9sZUluZm86IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnJvbGVJbmZvO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSB1c2VyIGRhdGEgcHJvdGVjdGlvbiBpbmZvcm1hdGlvblxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGN1cnJlbnQgdXNlciBkYXRhIHByb3RlY3Rpb24gaW5mb3JtYXRpb25cblx0ICAqL1xuXG5cdGdldFVQREluZm86IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnVkcEluZm87XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIHNpbmdsZSBzaWduIG9uIGluZm9ybWF0aW9uXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgY3VycmVudCBzaW5nbGUgc2lnbiBvbiBpbmZvcm1hdGlvblxuXHQgICovXG5cblx0Z2V0U1NPSW5mbzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuc3NvSW5mbztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgY3VycmVudCB1c2VyXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgY3VycmVudCB1c2VyXG5cdCAgKi9cblxuXHRnZXRVc2VyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy51c2VyO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBndWVzdCB1c2VyXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZ3Vlc3QgdXNlclxuXHQgICovXG5cblx0Z2V0R3Vlc3Q6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmd1ZXN0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBjbGllbnQgRE5cblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBjbGllbnQgRE5cblx0ICAqL1xuXG5cdGdldENsaWVudEROOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5jbGllbnRETjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgaXNzdWVyIEROXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgaXNzdWVyIEROXG5cdCAgKi9cblxuXHRnZXRJc3N1ZXJETjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNzdWVyRE47XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENoZWNrcyB3aGV0aGVyIHRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWRcblx0ICAqIEByZXR1cm5zIHtCb29sZWFufVxuXHQgICovXG5cblx0aXNBdXRoZW50aWNhdGVkOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy51c2VyICE9PSB0aGlzLmd1ZXN0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDaGVja3Mgd2hldGhlciB0aGUgdXNlciBoYXMgdGhlIGdpdmVuIHJvbGVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSByb2xlIHRoZSByb2xlXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGhhc1JvbGU6IGZ1bmN0aW9uKHJvbGVOYW1lKVxuXHR7XG5cdFx0cmV0dXJuIHJvbGVOYW1lIGluIHRoaXMucm9sZUluZm87XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnU1NPJyBtb2RhbCB3aW5kb3dcblx0ICAqL1xuXG5cdHNzbzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblxuXHRcdHdpbmRvdy5vcGVuKHRoaXMuc3NvSW5mby51cmwsICdTaW5nbGUgU2lnbi1PbicsICdtZW51YmFyPW5vLCBzdGF0dXM9bm8sIHNjcm9sbGJhcnM9bm8sIHdpZHRoPTgwMCwgaGVpZ2h0PTQ1MCcpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBPcGVucyB0aGUgJ1NpZ25JbicgbW9kYWwgd2luZG93XG5cdCAgKi9cblxuXHRzaWduSW46IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuX2NsZWFuKCk7XG5cblx0XHQkKCcjRDJCNUZBREVfOTdBM180QjhDXzg1NjFfN0E5QUVBQ0RCRTVCJykubW9kYWwoJ3Nob3cnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogT3BlbnMgdGhlICdDaGFuZ2UgSW5mbycgbW9kYWwgd2luZG93XG5cdCAgKi9cblxuXHRjaGFuZ2VJbmZvOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jbGVhbigpO1xuXG5cdFx0JCgnI0Q5RUFGOTk4X0VEOEVfNDREMl9BMEJFXzhDNUNGNUU0MzhCRCcpLm1vZGFsKCdzaG93Jyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnQ2hhbmdlIFBhc3N3b3JkJyBtb2RhbCB3aW5kb3dcblx0ICAqL1xuXG5cdGNoYW5nZVBhc3M6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuX2NsZWFuKCk7XG5cblx0XHQkKCcjRTkyQTEwOTdfOTgzQl80ODU3Xzg3NUZfMDdFNDY1OUI0MUIwJykubW9kYWwoJ3Nob3cnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogT3BlbnMgdGhlICdBY2NvdW50IFN0YXR1cycgbW9kYWwgd2luZG93XG5cdCAgKi9cblxuXHRhY2NvdW50U3RhdHVzOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jbGVhbigpO1xuXG5cdFx0JCgnI0FCMUNCMTgzXzk2RUJfNDExNl84QTlFXzQ0MDlCRTA1OEYzNCcpLm1vZGFsKCdzaG93Jyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFNpZ25zIG91dFxuXHQgICovXG5cblx0c2lnbk91dDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdHJldHVybiBhbWlDb21tYW5kLmxvZ291dCgpLmFsd2F5cygoZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKSA9PiB7XG5cblx0XHRcdHRoaXMuX3VwZGF0ZSh1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuX3VubG9jaygpO1xuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2xvZ2luOiBmdW5jdGlvbihlKVxuXHR7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gJChlLnRhcmdldCkuc2VyaWFsaXplT2JqZWN0KCk7XG5cblx0XHRyZXR1cm4gdGhpcy5mb3JtX2xvZ2luMih2YWx1ZXNbJ3VzZXInXSwgdmFsdWVzWydwYXNzJ10pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9sb2dpbjI6IGZ1bmN0aW9uKHVzZXIsIHBhc3MpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBwcm9taXNlID0gKHVzZXIgJiYgcGFzcykgPyBhbWlDb21tYW5kLnBhc3NMb2dpbih1c2VyLnRyaW0oKSwgcGFzcy50cmltKCkpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYW1pQ29tbWFuZC5jZXJ0TG9naW4oLyotLS0tLS0tLS0tLS0tLS0tLS0tLSovKVxuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRwcm9taXNlLnRoZW4oKGRhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykgPT4ge1xuXG5cdFx0XHR0aGlzLl91cGRhdGUodXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRpZih1c2VySW5mby5BTUlVc2VyICE9PSB1c2VySW5mby5ndWVzdFVzZXIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkKCcjRDJCNUZBREVfOTdBM180QjhDXzg1NjFfN0E5QUVBQ0RCRTVCJykubW9kYWwoJ2hpZGUnKTtcblxuXHRcdFx0XHRcdHRoaXMuX3VubG9jaygpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0aWYodXNlckluZm8uQU1JVXNlciAhPT0gdXNlckluZm8uZ3Vlc3RVc2VyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgnI0QyQjVGQURFXzk3QTNfNEI4Q184NTYxXzdBOUFFQUNEQkU1QicpLm1vZGFsKCdoaWRlJyk7XG5cblx0XHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmKHVzZXJJbmZvLkFNSVVzZXIgPT09IHVzZXJJbmZvLmd1ZXN0VXNlcilcblx0XHRcdHtcblx0XHRcdFx0bGV0IG1lc3NhZ2UgPSAnQXV0aGVudGljYXRpb24gZmFpbGVkLic7XG5cblx0XHRcdFx0aWYodXNlckluZm8uY2xpZW50RE5JblNlc3Npb24gfHwgdXNlckluZm8uaXNzdWVyRE5JblNlc3Npb24pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtZXNzYWdlICs9ICcgQ2xpZW50IEROIGluIHNlc3Npb246ICcgKyBhbWlXZWJBcHAudGV4dFRvSHRtbCh1c2VySW5mby5jbGllbnRETkluU2Vzc2lvbikgKyAnLidcblx0XHRcdFx0XHQgICAgICAgICAgICtcblx0XHRcdFx0XHQgICAgICAgICAgICcgSXNzdWVyIEROIGluIHNlc3Npb246ICcgKyBhbWlXZWJBcHAudGV4dFRvSHRtbCh1c2VySW5mby5pc3N1ZXJETkluU2Vzc2lvbikgKyAnLidcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdH1cblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pID0+IHtcblxuXHRcdFx0dGhpcy5fdXBkYXRlKHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykuYWx3YXlzKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9hdHRhY2hDZXJ0OiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1c2VyID0gJCgnI0U2NEYyNEIyXzMzRTZfNERFRF85QjI0XzI4QkUwNDIxOTYxMycpLnZhbCgpO1xuXHRcdGNvbnN0IHBhc3MgPSAkKCcjQTRERkQwMzlfMDM0Rl80RDEwXzk2NjhfMzg1QUVGNEZCQkI5JykudmFsKCk7XG5cblx0XHRpZighdXNlciB8fCAhcGFzcylcblx0XHR7XG5cdFx0XHR0aGlzLl9lcnJvcignUGxlYXNlLCBmaWxsIGFsbCBmaWVsZHMgd2l0aCBhIHJlZCBzdGFyLicpO1xuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdGFtaUNvbW1hbmQuYXR0YWNoQ2VydCh1c2VyLCBwYXNzKS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX3N1Y2Nlc3MobWVzc2FnZSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fZGV0YWNoQ2VydDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdXNlciA9ICQoJyNFNjRGMjRCMl8zM0U2XzRERURfOUIyNF8yOEJFMDQyMTk2MTMnKS52YWwoKTtcblx0XHRjb25zdCBwYXNzID0gJCgnI0E0REZEMDM5XzAzNEZfNEQxMF85NjY4XzM4NUFFRjRGQkJCOScpLnZhbCgpO1xuXG5cdFx0aWYoIXVzZXIgfHwgIXBhc3MpXG5cdFx0e1xuXHRcdFx0dGhpcy5fZXJyb3IoJ1BsZWFzZSwgZmlsbCBhbGwgZmllbGRzIHdpdGggYSByZWQgc3Rhci4nKTtcblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmRldGFjaENlcnQodXNlciwgcGFzcykudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2FkZFVzZXI6IGZ1bmN0aW9uKGUpXG5cdHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB2YWx1ZXMgPSAkKGUudGFyZ2V0KS5zZXJpYWxpemVPYmplY3QoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmFkZFVzZXIodmFsdWVzWydsb2dpbiddLCB2YWx1ZXNbJ3Bhc3MnXSwgdmFsdWVzWydmaXJzdF9uYW1lJ10sIHZhbHVlc1snbGFzdF9uYW1lJ10sIHZhbHVlc1snZW1haWwnXSwgJ2F0dGFjaCcgaW4gdmFsdWVzLCAnYWdyZWUnIGluIHZhbHVlcykudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX3JlbWluZFBhc3M6IGZ1bmN0aW9uKGUpXG5cdHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB2YWx1ZXMgPSAkKGUudGFyZ2V0KS5zZXJpYWxpemVPYmplY3QoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLnJlc2V0UGFzcyh2YWx1ZXNbJ3VzZXInXSkudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2NoYW5nZUluZm86IGZ1bmN0aW9uKGUpXG5cdHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB2YWx1ZXMgPSAkKGUudGFyZ2V0KS5zZXJpYWxpemVPYmplY3QoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmNoYW5nZUluZm8odmFsdWVzWydmaXJzdF9uYW1lJ10sIHZhbHVlc1snbGFzdF9uYW1lJ10sIHZhbHVlc1snZW1haWwnXSkudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2NoYW5nZVBhc3M6IGZ1bmN0aW9uKGUpXG5cdHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB2YWx1ZXMgPSAkKGUudGFyZ2V0KS5zZXJpYWxpemVPYmplY3QoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmNoYW5nZVBhc3ModGhpcy51c2VyLCB2YWx1ZXNbJ29sZF9wYXNzJ10sIHZhbHVlc1snbmV3X3Bhc3MnXSkudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qIVxuICogQU1JIFdlYiBGcmFtZXdvcmsgLSBBTUlEb2MuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAyMCBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qIGVzbGludC1kaXNhYmxlICovXG5cbmNvbnN0IGFtaURvYyA9IHtcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCIkQU1JTmFtZXNwYWNlXCIsXCJkZXNjXCI6XCJDcmVhdGUgYSBuZXcgbmFtZXNwYWNlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiJG5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIG5hbWVzcGFjZSBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiJGRlc2NyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBuYW1lc3BhY2UgYm9keVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwiJEFNSUludGVyZmFjZVwiLFwiZGVzY1wiOlwiQ3JlYXRlIGEgbmV3IGludGVyZmFjZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIiRuYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBpbnRlcmZhY2UgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIiRkZXNjclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgaW50ZXJmYWNlIGJvZHlcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIiRBTUlDbGFzc1wiLFwiZGVzY1wiOlwiQ3JlYXRlIGEgbmV3IGNsYXNzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiJG5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGNsYXNzIG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCIkZGVzY3JcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIGNsYXNzIGJvZHlcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19XSxcIm5hbWVzcGFjZXNcIjpbe1wibmFtZVwiOlwiYW1pUm91dGVyXCIsXCJkZXNjXCI6XCJUaGUgQU1JIHVybCByb3V0aW5nIHN1YnN5c3RlbVwiLFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcImdldFNjcmlwdFVSTFwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgQVdGJ3Mgc2NyaXB0IFVSTFwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIEFXRidzIHNjcmlwdCBVUkxcIn1dfSx7XCJuYW1lXCI6XCJnZXRPcmlnaW5VUkxcIixcImRlc2NcIjpcIkdldHMgdGhlIG9yaWdpbiBVUkxcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBvcmlnaW4gVVJMXCJ9XX0se1wibmFtZVwiOlwiZ2V0V2ViQXBwVVJMXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSB3ZWJhcHAgVVJMXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgd2ViYXBwIFVSTFwifV19LHtcIm5hbWVcIjpcImdldEhhc2hcIixcImRlc2NcIjpcIkdldHMgdGhlIGFuY2hvciBwYXJ0IG9mIHRoZSB3ZWJhcHAgVVJMXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgYW5jaG9yIHBhcnQgb2YgdGhlIHdlYmFwcCBVUkxcIn1dfSx7XCJuYW1lXCI6XCJnZXRBcmdzXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBhcmd1bWVudHMgZXh0cmFjdGVkIGZyb20gdGhlIHdlYmFwcCBVUkxcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJBcnJheS48U3RyaW5nPlwiLFwiZGVzY1wiOlwiVGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFwifV19LHtcIm5hbWVcIjpcImFwcGVuZFwiLFwiZGVzY1wiOlwiQXBwZW5kcyBhIHJvdXRpbmcgcnVsZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInJlZ0V4cFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcmVnRXhwXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiaGFuZGxlclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgaGFuZGxlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiTmFtZXNwYWNlXCIsXCJkZXNjXCI6XCJUaGUgYW1pUm91dGVyIHNpbmdsZXRvblwifV19LHtcIm5hbWVcIjpcInJlbW92ZVwiLFwiZGVzY1wiOlwiUmVtb3ZlcyBzb21lIHJvdXRpbmcgcnVsZXNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJyZWdFeHBcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHJlZ0V4cFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiTmFtZXNwYWNlXCIsXCJkZXNjXCI6XCJUaGUgYW1pUm91dGVyIHNpbmdsZXRvblwifV19LHtcIm5hbWVcIjpcImNoZWNrXCIsXCJkZXNjXCI6XCJDaGVja3Mgd2hldGhlciB0aGUgVVJMIG1hdGNoZXMgd2l0aCBhIHJvdXRpbmcgcnVsZVwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19LHtcIm5hbWVcIjpcImFwcGVuZEhpc3RvcnlFbnRyeVwiLFwiZGVzY1wiOlwiQXBwZW5kIGEgbmV3IGhpc3RvcnkgZW50cnlcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXRoXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBuZXcgcGF0aFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRleHRcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIG5ldyBjb250ZXh0XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJyZXBsYWNlSGlzdG9yeUVudHJ5XCIsXCJkZXNjXCI6XCJSZXBsYWNlIHRoZSBjdXJyZW50IGhpc3RvcnkgZW50cnlcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXRoXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBuZXcgcGF0aFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRleHRcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIG5ldyBjb250ZXh0XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfV19LHtcIm5hbWVcIjpcImFtaVdlYkFwcFwiLFwiZGVzY1wiOlwiVGhlIEFNSSB3ZWJhcHAgc3Vic3lzdGVtXCIsXCJ2YXJpYWJsZXNcIjpbe1wibmFtZVwiOlwib3JpZ2luVVJMXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBvcmlnaW4gVVJMXCJ9LHtcIm5hbWVcIjpcIndlYkFwcFVSTFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgd2ViYXBwIFVSTFwifSx7XCJuYW1lXCI6XCJoYXNoXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBhbmNob3IgcGFydCBvZiB0aGUgd2ViYXBwIFVSTFwifSx7XCJuYW1lXCI6XCJhcmdzXCIsXCJ0eXBlXCI6XCJBcnJheS48U3RyaW5nPlwiLFwiZGVzY1wiOlwiVGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFwifV0sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwiaXNFbWJlZGRlZFwiLFwiZGVzY1wiOlwiQ2hlY2tzIHdoZXRoZXIgdGhlIFdlYkFwcCBpcyBleGVjdXRlZCBpbiBlbWJlZGRlZCBtb2RlXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX0se1wibmFtZVwiOlwiaXNMb2NhbFwiLFwiZGVzY1wiOlwiQ2hlY2tzIHdoZXRoZXIgdGhlIFdlYkFwcCBpcyBleGVjdXRlZCBsb2NhbGx5IChmaWxlOi8vLCBsb2NhbGhvc3QsIDEyNy4wLjAuMSBvciA6OjEpXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX0se1wibmFtZVwiOlwidGV4dFRvSHRtbFwiLFwiZGVzY1wiOlwiRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBIVE1MXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1bmVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBlc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcImh0bWxUb1RleHRcIixcImRlc2NcIjpcIlVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSFRNTCB0byB0ZXh0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgdW5lc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcInRleHRUb1N0cmluZ1wiLFwiZGVzY1wiOlwiRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBKYXZhU2NyaXB0IHN0cmluZ1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdW5lc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJzdHJpbmdUb1RleHRcIixcImRlc2NcIjpcIlVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSmF2YVNjcmlwdCBzdHJpbmcgdG8gdGV4dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHVuZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJodG1sVG9TdHJpbmdcIixcImRlc2NcIjpcIkVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEhUTUwgdG8gSmF2YVNjcmlwdCBzdHJpbmdcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVuZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwic3RyaW5nVG9IdG1sXCIsXCJkZXNjXCI6XCJVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEphdmFTY3JpcHQgc3RyaW5nIHRvIEhUTUxcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSB1bmVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwidGV4dFRvU1FMXCIsXCJkZXNjXCI6XCJFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIFNRTFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdW5lc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJzcWxUb1RleHRcIixcImRlc2NcIjpcIlVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gU1FMIHRvIHRleHRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSB1bmVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwiYmFzZTY0RW5jb2RlXCIsXCJkZXNjXCI6XCJFbmNvZGVzIChSRkMgNDY0OCkgYSBzdHJpbmdcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGRlY29kZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBlbmNvZGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcImJhc2U2NERlY29kZVwiLFwiZGVzY1wiOlwiRGVjb2RlcyAoUkZDIDQ2NDgpIGEgc3RyaW5nXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlbmNvZGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZGVjb2RlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJsb2FkUmVzb3VyY2VzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyByZXNvdXJjZXMgYnkgZXh0ZW5zaW9uXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkU2hlZXRzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBDU1Mgc2hlZXRzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkU2NyaXB0c1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgSlMgc2NyaXB0c1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZEpTT05zXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBKU09OIGZpbGVzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkWE1Mc1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgWE1MIGZpbGVzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkSFRNTHNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIEhUTUwgZmlsZXNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRUV0lHc1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgVFdJRyBmaWxlc1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFRleHRzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyB0ZXh0IGZpbGVzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJyZXBsYWNlSFRNTFwiLFwiZGVzY1wiOlwiUHV0cyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBzdWZmaXgsIGRpY3QsIHR3aWdzKVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwicHJlcGVuZEhUTUxcIixcImRlc2NcIjpcIlByZXBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIHN1ZmZpeCwgZGljdCwgdHdpZ3MpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJhcHBlbmRIVE1MXCIsXCJkZXNjXCI6XCJBcHBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIHN1ZmZpeCwgZGljdCwgdHdpZ3MpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJmb3JtYXRUV0lHXCIsXCJkZXNjXCI6XCJJbnRlcnByZXRlcyB0aGUgZ2l2ZW4gVFdJRyBzdHJpbmcsIHNlZSB7QGxpbmsgaHR0cDovL3R3aWcuc2Vuc2lvbGFicy5vcmcvZG9jdW1lbnRhdGlvbn1cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImRpY3RcIixcInR5cGVcIjpbXCJPYmplY3RcIixcIkFycmF5XCJdLFwiZGVzY1wiOlwidGhlIGRpY3Rpb25hcnlcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIGZyYWdtZW50c1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgSW50ZXJwcmV0ZWQgVFdJRyBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJqc3BhdGhcIixcImRlc2NcIjpcIkZpbmRzIGRhdGEgd2l0aGluIHRoZSBnaXZlbiBKU09OLCBzZWUge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9kZmlsYXRvdi9qc3BhdGh9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGF0aFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcGF0aFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImpzb25cIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIEpTT05cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkFycmF5XCIsXCJkZXNjXCI6XCJUaGUgcmVzdWx0aW5nIGFycmF5XCJ9XX0se1wibmFtZVwiOlwibG9ja1wiLFwiZGVzY1wiOlwiTG9ja3MgdGhlIFdlYiBhcHBsaWNhdGlvblwiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcInVubG9ja1wiLFwiZGVzY1wiOlwiVW5sb2NrcyB0aGUgV2ViIGFwcGxpY2F0aW9uXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwibW9kYWxMZWF2ZVwiLFwiZGVzY1wiOlwiTGVhdmUgdGhlIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcIm1vZGFsRW50ZXJcIixcImRlc2NcIjpcIkVudGVyIHRoZSBtb2RhbCB3aW5kb3dcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJjYW5MZWF2ZVwiLFwiZGVzY1wiOlwiRW5hYmxlcyB0aGUgbWVzc2FnZSBpbiBhIGNvbmZpcm1hdGlvbiBkaWFsb2cgYm94IHRvIGluZm9ybSB0aGF0IHRoZSB1c2VyIGlzIGFib3V0IHRvIGxlYXZlIHRoZSBjdXJyZW50IHBhZ2UuXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiY2Fubm90TGVhdmVcIixcImRlc2NcIjpcIkRpc2FibGVzIHRoZSBtZXNzYWdlIGluIGEgY29uZmlybWF0aW9uIGRpYWxvZyBib3ggdG8gaW5mb3JtIHRoYXQgdGhlIHVzZXIgaXMgYWJvdXQgdG8gbGVhdmUgdGhlIGN1cnJlbnQgcGFnZS5cIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJpbmZvXCIsXCJkZXNjXCI6XCJTaG93cyBhbiAnaW5mbycgbWVzc2FnZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIm1lc3NhZ2VcIixcInR5cGVcIjpbXCJTdHJpbmdcIixcIkFycmF5XCJdLFwiZGVzY1wiOlwidGhlIG1lc3NhZ2VcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJmYWRlT3V0XCIsXCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJpZiBUcnVlLCB0aGUgbWVzc2FnZSBkaXNhcHBlYXJzIGFmdGVyIDYwc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwic3VjY2Vzc1wiLFwiZGVzY1wiOlwiU2hvd3MgYSAnc3VjY2VzcycgbWVzc2FnZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIm1lc3NhZ2VcIixcInR5cGVcIjpbXCJTdHJpbmdcIixcIkFycmF5XCJdLFwiZGVzY1wiOlwidGhlIG1lc3NhZ2VcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJmYWRlT3V0XCIsXCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJpZiBUcnVlLCB0aGUgbWVzc2FnZSBkaXNhcHBlYXJzIGFmdGVyIDYwc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwid2FybmluZ1wiLFwiZGVzY1wiOlwiU2hvd3MgYSAnd2FybmluZycgbWVzc2FnZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIm1lc3NhZ2VcIixcInR5cGVcIjpbXCJTdHJpbmdcIixcIkFycmF5XCJdLFwiZGVzY1wiOlwidGhlIG1lc3NhZ2VcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJmYWRlT3V0XCIsXCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJpZiBUcnVlLCB0aGUgbWVzc2FnZSBkaXNhcHBlYXJzIGFmdGVyIDYwc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwiZXJyb3JcIixcImRlc2NcIjpcIlNob3dzIGFuICdlcnJvcicgbWVzc2FnZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIm1lc3NhZ2VcIixcInR5cGVcIjpbXCJTdHJpbmdcIixcIkFycmF5XCJdLFwiZGVzY1wiOlwidGhlIG1lc3NhZ2VcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJmYWRlT3V0XCIsXCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJpZiBUcnVlLCB0aGUgbWVzc2FnZSBkaXNhcHBlYXJzIGFmdGVyIDYwc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwiZmx1c2hcIixcImRlc2NcIjpcIkZsdXNoZXMgbWVzc2FnZXNcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJmaWxsQnJlYWRjcnVtYlwiLFwiZGVzY1wiOlwiRmlsbCB0aGUgbWFpbiBicmVhZGNydW1iXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiaXRlbXNcIixcInR5cGVcIjpcIkFycmF5XCIsXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgaXRlbXMgKEhUTUwgZm9ybWF0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwic3RhcnRcIixcImRlc2NcIjpcIlN0YXJ0cyB0aGUgV2ViIGFwcGxpY2F0aW9uXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAobG9nb191cmwsIGhvbWVfdXJsLCBjb250YWN0X2VtYWlsLCBhYm91dF91cmwsIHRoZW1lX3VybCwgbG9ja2VyX3VybCwgcGFzc3dvcmRfYXV0aGVudGljYXRpb25fYWxsb3dlZCwgY2VydGlmaWNhdGVfYXV0aGVudGljYXRpb25fYWxsb3dlZCwgY3JlYXRlX2FjY291bnRfYWxsb3dlZCwgY2hhbmdlX2luZm9fYWxsb3dlZCwgY2hhbmdlX3Bhc3N3b3JkX2FsbG93ZWQsIGNoYW5nZV9jZXJ0aWZpY2F0ZV9hbGxvd2VkKVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwibG9hZENvbnRyb2xcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIGEgY29udHJvbFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcImNvbnRyb2xcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIGNvbnRyb2wgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjcmVhdGVDb250cm9sXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGFyZW50XCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIm93bmVyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRyb2xcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFyYW1zXCIsXCJ0eXBlXCI6XCJBcnJheVwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNyZWF0ZUNvbnRyb2xJbkJvZHlcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gdGhlIGJvZHlcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXJlbnRcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwib3duZXJcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udHJvbFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXJhbXNXaXRob3V0U2V0dGluZ3NcIixcInR5cGVcIjpcIkFycmF5XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250cm9sU2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFyZW50U2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lclwiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbCBpbiBhIGNvbnRhaW5lclwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhcmVudFwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJvd25lclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250cm9sXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhcmFtc1dpdGhvdXRTZXR0aW5nc1wiLFwidHlwZVwiOlwiQXJyYXlcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRyb2xTZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXJlbnRTZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJpY29uXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInRpdGxlXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjcmVhdGVDb250cm9sRnJvbVdlYkxpbmtcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gYSBjb250YWluZXIgZnJvbSBhIFdFQiBsaW5rXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGFyZW50XCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIm93bmVyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImVsXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhcmVudFNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkU3ViQXBwXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBhIHN1YmFwcFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN1YmFwcFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgc3ViYXBwXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInRoZSB1c2VyIGRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFN1YkFwcEJ5VVJMXCIsXCJkZXNjXCI6XCJMb2FkcyBhIHN1YmFwcCBieSBVUkxcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJkZWZhdWx0U3ViQXBwXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcImlmICdhbWlXZWJBcHAuYXJnc1tcXFwic3ViYXBwXFxcIl0nIGlzIG51bGwsIHRoZSBkZWZhdWx0IHN1YmFwcFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImRlZmF1bHRVc2VyRGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwiaWYgJ2FtaVdlYkFwcC5hcmdzW1xcXCJ1c2VyZGF0YVxcXCJdJyBpcyBudWxsLCB0aGUgZGVmYXVsdCB1c2VyIGRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19XSxcImV2ZW50c1wiOlt7XCJuYW1lXCI6XCJvblJlYWR5XCIsXCJkZXNjXCI6XCJUaGlzIG1ldGhvZCBtdXN0IGJlIG92ZXJsb2FkZWQgYW5kIGlzIGNhbGxlZCB3aGVuIHRoZSBXZWIgYXBwbGljYXRpb24gc3RhcnRzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlckRhdGFcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvblJlZnJlc2hcIixcImRlc2NcIjpcIlRoaXMgbWV0aG9kIG11c3QgYmUgb3ZlcmxvYWRlZCBhbmQgaXMgY2FsbGVkIHdoZW4gdGhlIHRvb2xiYXIgbmVlZHMgdG8gYmUgdXBkYXRlZFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcImlzQXV0aFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfV19LHtcIm5hbWVcIjpcImFtaUNvbW1hbmRcIixcImRlc2NcIjpcIlRoZSBBTUkgY29tbWFuZCBzdWJzeXN0ZW1cIixcInZhcmlhYmxlc1wiOlt7XCJuYW1lXCI6XCJlbmRwb2ludFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJEZWZhdWx0IGVuZHBvaW50XCJ9LHtcIm5hbWVcIjpcImNvbnZlcnRlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJEZWZhdWx0IGNvbnZlcnRlclwifV0sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwiZXhlY3V0ZVwiLFwiZGVzY1wiOlwiRXhlY3V0ZXMgYW4gQU1JIGNvbW1hbmRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJjb21tYW5kXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBjb21tYW5kXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZW5kcG9pbnQsIGNvbnZlcnRlciwgdGltZW91dCwgZXh0cmFQYXJhbSwgZXh0cmFWYWx1ZSlcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInBhc3NMb2dpblwiLFwiZGVzY1wiOlwiTG9ncyBpbiBieSBsb2dpbi9wYXNzd29yZFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVzZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXNzXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBwYXNzd29yZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjZXJ0TG9naW5cIixcImRlc2NcIjpcIkxvZ3MgaW4gYnkgY2VydGlmaWNhdGVcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9nb3V0XCIsXCJkZXNjXCI6XCJMb2dzIG91dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJhdHRhY2hDZXJ0XCIsXCJkZXNjXCI6XCJBdHRhY2hlcyBhIGNlcnRpZmljYXRlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhc3NcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImRldGFjaENlcnRcIixcImRlc2NcIjpcIkRldGFjaGVzIGEgY2VydGlmaWNhdGVcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1c2VyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFzc1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcGFzc3dvcmRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiYWRkVXNlclwiLFwiZGVzY1wiOlwiQWRkcyBhIG5ldyB1c2VyXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhc3NcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmlyc3ROYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBmaXJzdCBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwibGFzdE5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGxhc3QgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImVtYWlsXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlbWFpbFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImF0dGFjaFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiYXR0YWNoIHRoZSBjdXJyZW50IGNlcnRpZmljYXRlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiYWdyZWVcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcImFncmVlIHdpdGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNoYW5nZUluZm9cIixcImRlc2NcIjpcIkNoYW5nZXMgdGhlIGFjY291bnQgaW5mb3JtYXRpb25cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJmaXJzdE5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGZpcnN0IG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJsYXN0TmFtZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgbGFzdCBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZW1haWxcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVtYWlsXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNoYW5nZVBhc3NcIixcImRlc2NcIjpcIkNoYW5nZXMgdGhlIGFjY291bnQgcGFzc3dvcmRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1c2VyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwib2xkUGFzc1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgb2xkIHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwibmV3UGFzc1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgbmV3IHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInJlc2V0UGFzc1wiLFwiZGVzY1wiOlwiUmVzZXRzIHRoZSBhY2NvdW50IHBhc3N3b3JkXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfV19LHtcIm5hbWVcIjpcImFtaUxvZ2luXCIsXCJkZXNjXCI6XCJUaGUgQU1JIGF1dGhlbnRpY2F0aW9uIHN1YnN5c3RlbVwiLFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcImdldFVzZXJJbmZvXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSB1c2VyIGluZm9ybWF0aW9uXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgY3VycmVudCB1c2VyIGluZm9ybWF0aW9uXCJ9XX0se1wibmFtZVwiOlwiZ2V0Um9sZUluZm9cIixcImRlc2NcIjpcIkdldHMgdGhlIHJvbGUgaW5mb3JtYXRpb25cIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBjdXJyZW50IHJvbGUgaW5mb3JtYXRpb25cIn1dfSx7XCJuYW1lXCI6XCJnZXRVUERJbmZvXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSB1c2VyIGRhdGEgcHJvdGVjdGlvbiBpbmZvcm1hdGlvblwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGN1cnJlbnQgdXNlciBkYXRhIHByb3RlY3Rpb24gaW5mb3JtYXRpb25cIn1dfSx7XCJuYW1lXCI6XCJnZXRTU09JbmZvXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBzaW5nbGUgc2lnbiBvbiBpbmZvcm1hdGlvblwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGN1cnJlbnQgc2luZ2xlIHNpZ24gb24gaW5mb3JtYXRpb25cIn1dfSx7XCJuYW1lXCI6XCJnZXRVc2VyXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBjdXJyZW50IHVzZXJcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBjdXJyZW50IHVzZXJcIn1dfSx7XCJuYW1lXCI6XCJnZXRHdWVzdFwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgZ3Vlc3QgdXNlclwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGd1ZXN0IHVzZXJcIn1dfSx7XCJuYW1lXCI6XCJnZXRDbGllbnRETlwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgY2xpZW50IEROXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgY2xpZW50IEROXCJ9XX0se1wibmFtZVwiOlwiZ2V0SXNzdWVyRE5cIixcImRlc2NcIjpcIkdldHMgdGhlIGlzc3VlciBETlwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGlzc3VlciBETlwifV19LHtcIm5hbWVcIjpcImlzQXV0aGVudGljYXRlZFwiLFwiZGVzY1wiOlwiQ2hlY2tzIHdoZXRoZXIgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZFwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19LHtcIm5hbWVcIjpcImhhc1JvbGVcIixcImRlc2NcIjpcIkNoZWNrcyB3aGV0aGVyIHRoZSB1c2VyIGhhcyB0aGUgZ2l2ZW4gcm9sZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInJvbGVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHJvbGVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19LHtcIm5hbWVcIjpcInNzb1wiLFwiZGVzY1wiOlwiT3BlbnMgdGhlICdTU08nIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcInNpZ25JblwiLFwiZGVzY1wiOlwiT3BlbnMgdGhlICdTaWduSW4nIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImNoYW5nZUluZm9cIixcImRlc2NcIjpcIk9wZW5zIHRoZSAnQ2hhbmdlIEluZm8nIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImNoYW5nZVBhc3NcIixcImRlc2NcIjpcIk9wZW5zIHRoZSAnQ2hhbmdlIFBhc3N3b3JkJyBtb2RhbCB3aW5kb3dcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJhY2NvdW50U3RhdHVzXCIsXCJkZXNjXCI6XCJPcGVucyB0aGUgJ0FjY291bnQgU3RhdHVzJyBtb2RhbCB3aW5kb3dcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJzaWduT3V0XCIsXCJkZXNjXCI6XCJTaWducyBvdXRcIixcInBhcmFtc1wiOltdfV19XSxcImludGVyZmFjZXNcIjpbe1wibmFtZVwiOlwiYW1pLklDb250cm9sXCIsXCJkZXNjXCI6XCJUaGUgQU1JIGNvbnRyb2wgaW50ZXJmYWNlXCIsXCJpbXBsZW1lbnRzXCI6W10sXCJpbmhlcml0c1wiOltdLFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcInBhdGNoSWRcIixcImRlc2NcIjpcIlBhdGNoZXMgYW4gSFRNTCBpZGVudGlmaWVyXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiaWRcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVucGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHBhdGNoZWQgSFRNTCBpZGVudGlmaWVyXCJ9XX0se1wibmFtZVwiOlwicmVwbGFjZUhUTUxcIixcImRlc2NcIjpcIlB1dHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInByZXBlbmRIVE1MXCIsXCJkZXNjXCI6XCJQcmVwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiYXBwZW5kSFRNTFwiLFwiZGVzY1wiOlwiQXBwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgaXMgcmVhZHkgdG8gcnVuXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwib25SZW1vdmVcIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIHRoZSBjb250cm9sIGlzIHJlbW92ZWRcIixcInBhcmFtc1wiOltdfV19LHtcIm5hbWVcIjpcImFtaS5JU3ViQXBwXCIsXCJkZXNjXCI6XCJUaGUgQU1JIHN1Yi1hcHBsaWNhdGlvbiBpbnRlcmZhY2VcIixcImltcGxlbWVudHNcIjpbXSxcImluaGVyaXRzXCI6W10sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyByZWFkeSB0byBydW5cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uRXhpdFwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyBhYm91dCB0byBleGl0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkxvZ2luXCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiBsb2dnaW5nIGluXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkxvZ291dFwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gbG9nZ2luZyBvdXRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19XX1dLFwiY2xhc3Nlc1wiOlt7XCJuYW1lXCI6XCJhbWkuQ29udHJvbFwiLFwiZGVzY1wiOlwiVGhlIGJhc2ljIEFNSSBjb250cm9sXCIsXCJpbXBsZW1lbnRzXCI6W1wiYW1pLklDb250cm9sXCJdLFwiaW5oZXJpdHNcIjpbXSxcImtvbnN0cnVjdG9yXCI6e1wibmFtZVwiOlwiQ29udHJvbFwiLFwicGFyYW1zXCI6W119LFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcInBhdGNoSWRcIixcImRlc2NcIjpcIlBhdGNoZXMgYW4gSFRNTCBpZGVudGlmaWVyXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiaWRcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVucGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHBhdGNoZWQgSFRNTCBpZGVudGlmaWVyXCJ9XX0se1wibmFtZVwiOlwicmVwbGFjZUhUTUxcIixcImRlc2NcIjpcIlB1dHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInByZXBlbmRIVE1MXCIsXCJkZXNjXCI6XCJQcmVwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiYXBwZW5kSFRNTFwiLFwiZGVzY1wiOlwiQXBwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgaXMgcmVhZHkgdG8gcnVuXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwib25SZW1vdmVcIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIHRoZSBjb250cm9sIGlzIHJlbW92ZWRcIixcInBhcmFtc1wiOltdfV19LHtcIm5hbWVcIjpcImFtaS5TdWJBcHBcIixcImRlc2NcIjpcIlRoZSBiYXNpYyBBTUkgc3ViLWFwcGxpY2F0aW9uXCIsXCJpbXBsZW1lbnRzXCI6W1wiYW1pLklTdWJBcHBcIl0sXCJpbmhlcml0c1wiOltdLFwia29uc3RydWN0b3JcIjp7XCJuYW1lXCI6XCJTdWJBcHBcIixcInBhcmFtc1wiOltdfSxcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJvblJlYWR5XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIHJlYWR5IHRvIHJ1blwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ1c2VyZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwib25FeGl0XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIGFib3V0IHRvIGV4aXRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uTG9naW5cIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIGxvZ2dpbmcgaW5cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uTG9nb3V0XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiBsb2dnaW5nIG91dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ1c2VyZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX1dfV19O1xuXG4vKiBlc2xpbnQtZW5hYmxlICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
