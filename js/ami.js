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

if (!String.prototype.hashCode) {
  String.prototype.hashCode = function () {
    var hash = 0;
    var length = this.length;

    for (var i = 0; i < length; i++) {
      hash = (hash << 5) - hash + this.charCodeAt(i);
      hash |= 0;
    }

    return hash < 0 ? -hash : +hash;
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
            var minLines = parseInt(textarea.attr('data-minlines'));

            if (isNaN(minLines)) {
              minLines = 0x000001;
            }

            var maxLines = parseInt(textarea.attr('data-maxlines'));

            if (isNaN(maxLines)) {
              maxLines = Infinity;
            }

            ace.config.set('suffix', '.min.js');
            ace.config.set('basePath', _this5.originURL + '/js/3rd-party/ace');
            var editor = ace.edit(div[0], {
              mode: 'ace/mode/' + mode,
              theme: 'ace/theme/' + theme,
              wrap: 'true' === wrap,
              readOnly: 'true' === readOnly,
              showGutter: 'true' === showGutter,
              highlightActiveLine: 'true' === highlightActiveLine,
              minLines: minLines,
              maxLines: maxLines
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
    if (this.typeOf(message) === 'Array') {
      message = message.join('. ');
    }

    var hash = ('' + message).hashCode();
    var date = moment().format('DD MMM, HH:mm:ss');
    var toast = $('#ami_alert_content > .toast[data-hash="' + hash + '"]');

    if (toast.length === 0) {
      var html = ['<div class="toast" role="alert" ' + (fadeOut ? 'data-delay="60000"' : 'data-autohide="false"') + ' data-hash="' + hash + '" data-cnt="1">', '<div class="toast-header">', '<strong class="mr-auto text-' + clazz + '">' + this.textToHtml(title) + '</strong>', '<small>' + this.textToHtml(date) + '</small>', '<button class="ml-2 mb-1 close" type="button" data-dismiss="toast">', '&times;', '</button>', '</div>', '<div class="toast-body">', this.textToHtml(message), '</div>', '</div>'];
      $('#ami_alert_content').append(html.join('').replace(this._linkExp, '<a href="$1" target="_blank">$2</a>')).promise().done(function () {
        $('#ami_alert_content > .toast[data-hash="' + hash + '"]').toast('show');
      });
    } else {
      toast.find('.toast-header > strong').html(this.textToHtml(title) + ' <span class="badge badge-' + clazz + '">' + toast.attr('data-cnt', parseInt(toast.attr('data-cnt')) + 1).attr('data-cnt') + '</span>');
      toast.find('.toast-header > small').html(this.textToHtml(date));
      toast.toast('show');
    }

    console.log('AMI :: ' + title.toUpperCase() + ': ' + message + '\n' + this.getStack());
    $(document).scrollTop(0);
    this.unlock();
  },
  info: function info(message, fadeOut) {
    this._publishAlert('info', 'Info', message, fadeOut);
  },
  success: function success(message, fadeOut) {
    this._publishAlert('success', 'Success', message, fadeOut);
  },
  warning: function warning(message, fadeOut) {
    this._publishAlert('warning', 'Warning', message, fadeOut);
  },
  error: function error(message, fadeOut) {
    this._publishAlert('danger', 'Error', message, fadeOut);
  },
  flush: function flush() {
    $('#ami_alert_content').empty();
  },
  fillBreadcrumb: function fillBreadcrumb(items) {
    var _this7 = this;

    var s = this.typeOf(items) === 'Array' ? items.map(function (item) {
      return '<li class="breadcrumb-item">' + item.replace(/{{WEBAPP_URL}}/g, _this7.webAppURL) + '</li>';
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
    var _this8 = this;

    this._globalDeferred.done(function () {
      var _this8$setup = _this8.setup(['logo_url', 'home_url', 'webapp_url', 'contact_email', 'about_url', 'theme_url', 'locker_url', 'endpoint_url', 'password_authentication_allowed', 'certificate_authentication_allowed', 'create_account_allowed', 'change_info_allowed', 'change_password_allowed', 'change_certificate_allowed', 'bookmarksAllowed'], [_this8.originURL + '/images/logo.png', _this8.webAppURL, _this8.webAppURL, 'ami@lpsc.in2p3.fr', 'http://cern.ch/ami/', _this8.originURL + '/twig/AMI/Theme/blue.twig', _this8.originURL + '/twig/AMI/Fragment/locker.twig', _this8.originURL + '/AMI/FrontEnd', true, true, true, true, true, true, true], settings),
          logoURL = _this8$setup[0],
          homeURL = _this8$setup[1],
          webAppURL = _this8$setup[2],
          contactEmail = _this8$setup[3],
          aboutURL = _this8$setup[4],
          themeURL = _this8$setup[5],
          lockerURL = _this8$setup[6],
          endpointURL = _this8$setup[7],
          passwordAuthenticationAllowed = _this8$setup[8],
          certificateAuthenticationAllowed = _this8$setup[9],
          createAccountAllowed = _this8$setup[10],
          changeInfoAllowed = _this8$setup[11],
          changePasswordAllowed = _this8$setup[12],
          changeCertificateAllowed = _this8$setup[13],
          bookmarksAllowed = _this8$setup[14];

      amiWebApp.webAppURL = webAppURL;
      amiCommand.endpoint = endpointURL;

      window.onbeforeunload = function (e) {
        if (!_this8._canLeave) {
          var f = e || window.event;

          if (f) {
            f.returnValue = 'Confirm that you want to leave this page?';
          }

          return 'Confirm that you want to leave this page?';
        }
      };

      var controlsURL = _this8.originURL + '/controls/CONTROLS.json';
      var subappsURL = _this8.originURL + '/subapps/SUBAPPS.json';
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
            _this8._controls[name.toLowerCase()] = data1[name];
          }

          for (var _name3 in data2) {
            _this8._subapps[_name3.toLowerCase()] = data2[_name3];
          }

          if (!_this8._embedded) {
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
                $('body').append(_this8.formatTWIG(data3, dict) + data4).promise().done(function () {
                  _this8.lock();

                  amiLogin._start(passwordAuthenticationAllowed, certificateAuthenticationAllowed, createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed, bookmarksAllowed).done(function () {
                    _this8.unlock();
                  }).fail(function (message) {
                    _this8.error(message);
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
                _this8.lock();

                amiLogin._start(passwordAuthenticationAllowed, certificateAuthenticationAllowed, createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed, bookmarksAllowed).done(function () {
                  _this8.unlock();
                }).fail(function (message) {
                  _this8.error(message);
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
    var _this9 = this;

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

        _this9.createControl(parent, owner, control, PARAMS).done(function () {
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
    var _this10 = this;

    var dataCtrl = el.hasAttribute('data-ctrl') ? el.getAttribute('data-ctrl') : '';
    var dataCtrlLocation = el.hasAttribute('data-ctrl-location') ? el.getAttribute('data-ctrl-location') : '';
    var dataParams = el.hasAttribute('data-params') ? JSON.parse(el.getAttribute('data-params')) : [];
    var dataSettings = el.hasAttribute('data-settings') ? JSON.parse(el.getAttribute('data-settings')) : {};
    var dataIcon = el.hasAttribute('data-icon') ? el.getAttribute('data-icon') : 'question';
    var dataTitle = el.hasAttribute('data-title') ? el.getAttribute('data-title') : 'Unknown';
    this.lock();

    if (dataCtrlLocation === 'body') {
      return this.createControlInBody(parent, owner, dataCtrl, dataParams, dataSettings, parentSettings, settings).done(function () {
        _this10.unlock();
      }).fail(function (message) {
        _this10.error(message);
      });
    } else {
      return this.createControlInContainer(parent, owner, dataCtrl, dataParams, dataSettings, parentSettings, dataIcon, dataTitle, settings).done(function () {
        _this10.unlock();
      }).fail(function (message) {
        _this10.error(message);
      });
    }
  },
  triggerLogin: function triggerLogin() {
    var _this11 = this;

    var result = $.Deferred();

    if (this._isReady) {
      _ami_internal_then(this._currentSubAppInstance.onLogin(this.args['userdata']), function (message) {
        _ami_internal_always(_this11.onRefresh(true), function () {
          result.resolve(message);
        });
      }, function (message) {
        _ami_internal_always(_this11.onRefresh(true), function () {
          result.reject(message);
        });
      });
    } else {
      result.resolve();
    }

    return result.promise();
  },
  triggerLogout: function triggerLogout() {
    var _this12 = this;

    var result = $.Deferred();

    if (this._isReady) {
      _ami_internal_then(this._currentSubAppInstance.onLogout(this.args['userdata']), function (message) {
        _ami_internal_always(_this12.onRefresh(false), function () {
          result.resolve(message);
        });
      }, function (message) {
        _ami_internal_always(_this12.onRefresh(false), function () {
          result.reject(message);
        });
      });
    } else {
      result.resolve();
    }

    return result.promise();
  },
  loadSubApp: function loadSubApp(subapp, userdata, settings) {
    var _this13 = this;

    var result = $.Deferred();

    var _this$setup7 = this.setup(['context'], [result], settings),
        context = _this$setup7[0];

    this.lock();
    result.always(function () {
      _this13.unlock();
    });

    if (subapp.indexOf('subapp:') === 0) {
      subapp = subapp.substring(7);
    }

    var descr = this._subapps[subapp.toLowerCase()];

    if (descr) {
      this.loadScripts(this.originURL + '/' + descr.file).then(function (loaded) {
        try {
          _this13._currentSubAppInstance.onExit(userdata);

          var instance = window[descr.instance];
          _this13._currentSubAppInstance = instance;

          _this13.fillBreadcrumb(descr.breadcrumb);

          var promise = loaded[0] ? instance.onReady(userdata) : null;

          _ami_internal_then(promise, function () {
            var promise = amiLogin.isAuthenticated() ? _this13.triggerLogin() : _this13.triggerLogout();
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
    var _this14 = this;

    var result = $.Deferred();

    if (this.args['v']) {
      amiCommand.execute('GetHashInfo -hash="' + this.textToString(this.args['v']) + '"').fail(function (data, message) {
        result.reject(message);
      }).done(function (data) {
        var json;

        try {
          json = JSON.parse(_this14.jspath('..field{.@name==="json"}.$', data)[0] || '{}');
        } catch (message) {
          json = {};
        }

        var subapp = json['subapp'] || defaultSubApp;
        var userdata = json['userdata'] || defaultUserData;

        _this14.loadSubApp(subapp, userdata).then(function () {
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
    var _this15 = this;

    if (selector === void 0) {
      selector = '';
    }

    if (selector) {
      $(selector).on('remove', function () {
        _this15.onRemove();
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
      var bookmarkInfo = {};
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
      JSPath.apply('..rowset{.@type==="bookmark"}.row', data).forEach(function (row) {
        var hash = '';
        var bookmark = {};
        row.field.forEach(function (field) {
          bookmark[field['@name']] = field['$'];

          if (field['@name'] === 'hash') {
            hash = field['$'];
          }
        });
        bookmarkInfo[hash] = bookmark;
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
      result.resolveWith(context, [data, message, userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo]);
    }, function (data, message) {
      result.rejectWith(context, [data, message, {
        AMIUser: 'guest',
        guestUser: 'guest'
      }, {}, {}, {}, {}]);
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
      var bookmarkInfo = {};
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
      JSPath.apply('..rowset{.@type==="bookmark"}.row', data).forEach(function (row) {
        var hash = '';
        var bookmark = {};
        row.field.forEach(function (field) {
          bookmark[field['@name']] = field['$'];

          if (field['@name'] === 'hash') {
            hash = field['$'];
          }
        });
        bookmarkInfo[hash] = bookmark;
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
      result.resolveWith(context, [data, message, userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo]);
    }, function (data, message) {
      result.rejectWith(context, [data, message, {
        AMIUser: 'guest',
        guestUser: 'guest'
      }, {}, {}, {}, {}]);
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
      var bookmarkInfo = {};
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
      JSPath.apply('..rowset{.@type==="bookmark"}.row', data).forEach(function (row) {
        var hash = '';
        var bookmark = {};
        row.field.forEach(function (field) {
          bookmark[field['@name']] = field['$'];

          if (field['@name'] === 'hash') {
            hash = field['$'];
          }
        });
        bookmarkInfo[hash] = bookmark;
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
      result.resolveWith(context, [data, message, userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo]);
    }, function (data, message) {
      result.rejectWith(context, [data, message, {
        AMIUser: 'guest',
        guestUser: 'guest'
      }, {}, {}, {}, {}]);
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
  bookmarksAllowed: true,
  user: 'guest',
  guest: 'guest',
  clientDN: '',
  issuerDN: '',
  notBefore: '',
  notAfter: '',
  userInfo: {},
  roleInfo: {},
  bookmarkInfo: {},
  udpInfo: {},
  ssoInfo: {},
  _start: function _start(passwordAuthenticationAllowed, certificateAuthenticationAllowed, createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed, bookmarksAllowed) {
    var _this16 = this;

    var result = $.Deferred();
    amiWebApp.loadTWIGs([amiWebApp.originURL + '/twig/AMI/Fragment/login_button.twig', amiWebApp.originURL + '/twig/AMI/Fragment/logout_button.twig', amiWebApp.originURL + '/twig/AMI/Modal/login.twig']).done(function (data) {
      _this16.fragmentLoginButton = data[0];
      _this16.fragmentLogoutButton = data[1];
      var dict = {
        passwordAuthenticationAllowed: _this16.passwordAuthenticationAllowed = passwordAuthenticationAllowed,
        certificateAuthenticationAllowed: _this16.certificateAuthenticationAllowed = certificateAuthenticationAllowed,
        createAccountAllowed: _this16.createAccountAllowed = createAccountAllowed,
        changeInfoAllowed: _this16.changeInfoAllowed = changeInfoAllowed,
        changePasswordAllowed: _this16.changePasswordAllowed = changePasswordAllowed,
        changeCertificateAllowed: _this16.changeCertificateAllowed = changeCertificateAllowed,
        bookmarksAllowed: _this16.bookmarksAllowed = bookmarksAllowed
      };
      amiWebApp.appendHTML('body', data[2], {
        dict: dict
      }).done(function () {
        $('#B7894CC1_1DAA_4A7E_B7D1_DBDF6F06AC73').submit(function (e) {
          _this16.form_login(e);
        });
        $('#EE055CD4_E58F_4834_8020_986AE3F8D67D').submit(function (e) {
          _this16.form_addUser(e);
        });
        $('#DA2047A2_9E5D_420D_B6E7_FA261D2EF10F').submit(function (e) {
          _this16.form_remindPass(e);
        });
        $('#D9EAF998_ED8E_44D2_A0BE_8C5CF5E438BD').submit(function (e) {
          _this16.form_changeInfo(e);
        });
        $('#E92A1097_983B_4857_875F_07E4659B41B0').submit(function (e) {
          _this16.form_changePass(e);
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
        if (_this16.ssoInfo.url.startsWith(e.origin)) {
          var user = e.data.user;
          var pass = e.data.pass;

          if (user && pass) {
            _this16.form_login2(user, pass);
          }

          e.source.close();
        }
      }, false);
      var userdata = amiWebApp.args['userdata'] || '';
      setInterval(function () {
        if (amiWebApp._isReady) {
          amiCommand.certLogin().fail(function (data, message) {
            amiWebApp.lock();
            amiWebApp.error(message, true);
          }).done(function (data, message, userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo) {
            if ((userInfo.AMIUser || '') === (userInfo.guestUser || '')) {
              _this16._update(userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo);
            }
          });
        }
      }, 30 * 1000);
      amiCommand.certLogin().fail(function (data, message, userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo) {
        _this16._update(userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo).always(function () {
          result.reject(message);
        });
      }).done(function (data, message, userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo) {
        _ami_internal_then(amiWebApp.onReady(userdata), function () {
          amiWebApp._isReady = true;

          _this16._update(userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo).then(function (message) {
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
  _update: function _update(userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo) {
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
    this.bookmarkInfo = bookmarkInfo;
    this.udpInfo = udpInfo;
    this.ssoInfo = ssoInfo;
    var dict = {
      createAccountAllowed: this.createAccountAllowed,
      changeInfoAllowed: this.changeInfoAllowed,
      changePasswordAllowed: this.changePasswordAllowed,
      changeCertificateAllowed: this.changeCertificateAllowed,
      bookmarksAllowed: this.bookmarksAllowed,
      bookmarkInfo: this.bookmarkInfo,
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
      var bgColor = '';
      var fgColor = '';

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
        bgColor = '#B8D49B';
        fgColor = '#006400';
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
        $('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').css('color', '#DC3545').html('<i class="fa fa-leaf"></i> invalid <i class="fa fa-leaf"></i>');
        $('#E91280F6_E7C6_3E53_A457_646995C99317').text(notBefore + ' - ' + notAfter);
        bgColor = '#E8C8CF';
        fgColor = '#DC3545';
      }

      $('#EC948084_8C0A_CEBF_58C9_086046AB2456').qrcode({
        render: 'canvas',
        ecLevel: 'H',
        size: 150,
        fill: fgColor,
        background: bgColor,
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
  getBookmarkInfo: function getBookmarkInfo() {
    return this.bookmarkInfo;
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
  update: function update() {
    var _this17 = this;

    amiWebApp.lock();
    return amiCommand.certLogin().done(function (data, message, userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo) {
      _this17._update(userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo).always(function () {
        amiWebApp.unlock();
      });
    });
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
    return amiCommand.logout().always(function (data, message, userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo) {
      _this18._update(userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo).then(function () {
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
    promise.then(function (data, message, userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo) {
      _this19._update(userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo).then(function () {
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
    }, function (data, message, userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo) {
      _this19._update(userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo).always(function () {
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
        "desc": "dictionary of settings (logo_url, home_url, webapp_url, contact_email, about_url, theme_url, locker_url, password_authentication_allowed, certificate_authentication_allowed, create_account_allowed, change_info_allowed, change_password_allowed, change_certificate_allowed, bookmarksAllowed)",
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
      "desc": "Gets the user role information",
      "params": [],
      "returns": [{
        "type": "String",
        "desc": "The current role information"
      }]
    }, {
      "name": "getBookmarkInfo",
      "desc": "Gets the user bookmark information",
      "params": [],
      "returns": [{
        "type": "String",
        "desc": "The current user data protection information"
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
      "name": "update",
      "desc": "Update the user information",
      "params": [],
      "returns": [{
        "type": "$.Deferred",
        "desc": "A JQuery deferred object"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFNSS9zcmMvbWFpbi5qcyIsIkFNSS9zcmMvdG9rZW5pemVyLmpzIiwiQU1JL3NyYy9leHByZXNzaW9uX2NvbXBpbGVyLmpzIiwiQU1JL3NyYy90ZW1wbGF0ZV9jb21waWxlci5qcyIsIkFNSS9zcmMvZW5naW5lLmpzIiwiQU1JL3NyYy9jYWNoZS5qcyIsIkFNSS9zcmMvc3RkbGliLmpzIiwiQU1JL3NyYy9pbnRlcnByZXRlci5qcyIsIkFNSS9leHRlcm5hbC9qc3BhdGguanMiLCJBTUkvQU1JRXh0ZW5zaW9uLmpzIiwiQU1JL0FNSU9iamVjdC5qcyIsIkFNSS9BTUlSb3V0ZXIuanMiLCJBTUkvQU1JV2ViQXBwLmpzIiwiQU1JL0FNSUludGVyZmFjZS5qcyIsIkFNSS9BTUlDb21tYW5kLmpzIiwiQU1JL0FNSUxvZ2luLmpzIiwiQU1JL0FNSURvYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQSxJQUFBLE9BQUEsR0FBQTtBQUNBLEVBQUEsT0FBQSxFQUFBO0FBREEsQ0FBQTs7QUFRQSxJQUFBLE9BQUEsT0FBQSxLQUFBLFdBQUEsRUFDQTtBQUNBLEVBQUEsT0FBRyxDQUFNLEVBQVQsR0FBVSxPQUFXLENBQUMsSUFBRCxDQUFyQjtBQUVDLEVBQUEsTUFBQSxDQUFPLE9BQVAsQ0FBYSxPQUFiLEdBQXdCLE9BQXhCO0FBQ0Q7O0FDeEJBLE9BQUEsQ0FBQSxTQUFBLEdBQUE7QUFHQyxFQUFBLFFBQUEsRUFBQSxrQkFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsRUFDRDtBQUNDLFFBQUEsU0FBVSxDQUFBLE1BQVYsS0FBeUIsVUFBTSxDQUFBLE1BQS9CLEVBQ0M7QUFDQSxZQUFHLHlDQUFIO0FBQ0M7O0FBRUQsUUFBQyxhQUFBLEdBQUEsRUFBRDtBQUNGLFFBQUEsWUFBQSxHQUFBLEVBQUE7QUFDRSxRQUFNLFlBQUEsR0FBZSxFQUFyQjtBQUVBLFFBQUEsQ0FB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QWxFUjtBQW1FQyxFQUFBLE1BQUksRUFBSSxHQW5FVDtBQW9FQyxFQUFBLElBQUEsRUFBTSxHQXBFUDtBQXFFQyxFQUFBLEtBQUEsRUFBTyxHQXJFUjtBQXNFQyxFQUFBLEtBQUssRUFBQyxHQXRFUDtBQXVFQyxFQUFBLEdBQUEsRUFBSyxHQXZFTjtBQXdFQyxFQUFBLEtBQUssRUFBRSxHQXhFUjtBQXlFQyxFQUFBLEdBQUcsRUFBRSxHQXpFTjtBQTBFQyxFQUFBLEdBQUEsRUFBSyxHQTFFTjtBQTJFQyxFQUFBLGVBQVMsRUFBQSxHQTNFVjtBQTRFQyxFQUFBLFFBQVMsRUFBQSxHQTVFVjtBQTZFQSxFQUFBLEtBQUUsRUFBQSxHQTdFRjtBQThFQSxFQUFBLEdBQUUsRUFBQSxHQTlFRjtBQStFQyxFQUFBLEtBQUssRUFBRSxHQS9FUjtBQWdGQyxFQUFBLElBQUksRUFBQyxHQWhGTjtBQWlGQyxFQUFBLEVBQUEsRUFBQSxHQWpGRDtBQWtGQyxFQUFBLEVBQUEsRUFBSSxHQWxGTDtBQW1GQyxFQUFBLEdBQUcsRUFBQyxHQW5GTDtBQW9GQyxFQUFBLEdBQUcsRUFBQyxHQXBGTDtBQXFGQyxFQUFBLEdBQUcsRUFBRSxHQXJGTjtBQXNGQyxFQUFBLEdBQUcsRUFBRSxHQXRGTjtBQXVGQyxFQUFBLEdBQUcsRUFBRSxHQXZGTjtBQXdGQyxFQUFBLFFBQVEsRUFBQyxHQXhGVjtBQThGQyxFQUFBLEdBQUEsRUFBQSxHQTlGRDtBQStGQSxFQUFBLEdBQUEsRUFBQSxHQS9GQTtBQWdHQyxFQUFBLEdBQUcsRUFBRSxHQWhHTjtBQWlHQyxFQUFBLEdBQUcsRUFBRTtBQWpHTixDQUFBO0FBd0dBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEtBQUE7O0FBTUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxTQUFBLEdBQUEsVUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO0FBR0MsT0FBQSxPQUFBLEdBQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLENBQUE7QUFJQSxPQUFBLFVBQUEsR0FBQSxD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LFVBQUEsRUFDQTtBQUNDLEVBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxVQUFBLEdBQUEsVUFBQSxDQUFBLEVBQ0E7QUFDQyxRQUFBLElBQUEsR0FBQSxzQkFBQTtBQUVGLFdBQUEsS0FBQSxPQUFBLENBQUEsQ0FBQSxFQUFBLElBQUEsTUFBQSxJQUFBO0FBQ0UsR0FMRDtBQU1BOztBQUlELElBQUEsQ0FBQSxNQUFBLENBQUEsU0FBQSxDQUFBLFFBQUEsRUFDQTtBQUNDLEVBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxRQUFBLEdBQUEsVUFBQSxDQUFBLEVBQ0E7QUFDQyxRQUFBLElBQUEsR0FBQSxLQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsTUFBQTtBQUVGLFdBQUEsS0FBQSxPQUFBLENBQUEsQ0FBQSxFQUFBLElBQUEsTUFBQSxJQUFBO0FBQ0UsR0FMRDtBQU1BOztBQUlELElBQUEsQ0FBQSxNQUFBLENBQUEsU0FBQSxDQUFBLFFBQUEsRUFDQTtBQUNDLEVBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxRQUFBLEdBQUEsWUFDQTtBQUNDLFFBQUEsSUFBQSxHQUFBLENBQUE7QUFFRixRQUFBLE1BQUEsR0FBQSxLQUFBLE1BQUE7O0FBRUEsU0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsRUFDRTtBQUNDLE1BQUEsSUFBQSxHQUFBLENBQUEsSUFBQSxJQUFBLENBQUEsSUFBQSxJQUFBLEdBQUEsS0FBQSxVQUFBLENBQUEsQ0FBQSxDQUFBO0FBRUgsTUFBQSxJQUFBLElBQUEsQ0FBQTtBQUNHOztBQUVILFdBQUEsSUFBQSxHQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsR0FDUSxDQUFDLElBRFQ7QUFHRSxHQWhCRDtBQWlCQTs7QUFNRCxJQUFBLHdCQUFBLEdBQUEsTUFBQSxDQUFBLElBQUE7O0FBSUEsTUFBQSxDQUFBLElBQUEsR0FBQSxVQUFBLFFBQUEsRUFDQTtBQUNDLE1BQUEsT0FBQSxRQUFBLEtBQUEsUUFBQSxJQUVHLFFBQUUsQ0FBQSxRQUFG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S0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQTtBQUNBO0FBQ0Q7O0FBRUYsRUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUNDOztBQUlELFNBQUEsZ0JBQUEsQ0FBQSxLQUFBLEVBQUEsQ0FBQSxFQUNBO0FBQ0MsTUFBQSxNQUFBLEdBQUEsTUFBQTtBQUVELE1BQUEsS0FBQSxHQUFBLEtBQUEsQ0FBQSxLQUFBLENBQUEsV0FBQSxDQUFBO0FBQUEsTUFBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBOztBQUVBLE9BQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQ0M7QUFDQyxRQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFDQTtBQUNDLE1BQUEsTUFBQSxHQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQSxLQUhELE1BS0E7QUFDQyxZQUFBLE1BQUEsS0FBQSxHQUFBLE1BQUEsR0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsaUJBQUE7QUFDQTtBQUNEOztBQUVGLEVBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUE7QUFDQzs7QUFZRCxTQUFBLGFBQUEsQ0FBQSxLQUFBLEVBQUEsTUFBQSxFQUNBO0FBQ0MsTUFBQSxDQUFBLE1BQUEsRUFDQTtBQUNDLElBQUEsTUFBQSxHQUFBLEVBQUE7QUFDQTs7QUFJRixFQUFBLE1BQUEsQ0FBQSxLQUFBLEdBQUEsS0FBQTs7QUFJQSxFQUFBLGlCQUFBLENBQUEsS0FBQSxFQUFBLE1BQUEsQ0FBQTs7QUFJQSxNQUFBLE1BQUEsQ0FBQSxDQUFBLEVBQ0M7QUFDQyxJQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxDQUFBLE1BQUE7QUFDQTtBQUdEOztBQVlELFNBQUEsYUFBQSxDQUFBLEtBQUEsRUFBQSxNQUFBLEVBQ0E7QUFDQyxNQUFBLENBQUEsTUFBQSxFQUNBO0FBQ0MsSUFBQSxNQUFBLEdBQUEsRUFBQTtBQUNBOztBQUlGLE1BQUEsTUFBQSxHQUFBLFNBQUEsTUFBQSxHQUNDO0FBQ0MsVUFBQSxpQ0FBQTtBQUNBLEdBSEY7O0FBT0EsTUFBQSxNQUFBLENBQUEsUUFBQSxFQUNDO0FBQ0MsVUFBQSxzQ0FBQTtBQUNBOztBQUVGLE1BQUEsTUFBQSxDQUFBLFdBQUEsRUFDQztBQUNDLFVBQUEseUNBQUE7QUFDQTs7QUFJRixNQUFBLE1BQUEsQ0FBQSxDQUFBLEVBQ0M7QUFDQyxVQUFBLCtCQUFBO0FBQ0E7O0FBRUYsTUFBQSxNQUFBLENBQUEsS0FBQSxFQUNDO0FBQ0MsVUFBQSxtQ0FBQTtBQUNBOztBQUlGLEVBQUEsTUFBQSxDQUFBLEtBQUEsR0FBQSxLQUFBO0FBQ0MsRUFBQSxNQUFNLENBQUEsTUFBTixHQUFnQixNQUFoQjtBQUNBLEVBQUEsTUFBTSxDQUFBLFFBQU4sR0FBaUIsTUFBakI7O0FBSUQsRUFBQSxnQkFBQSxDQUFBLEtBQUEsRUFBQSxNQUFBLENBQUE7QUFHQzs7QUFZRCxTQUFBLFNBQUEsQ0FBQSxLQUFBLEVBQUEsTUFBQSxFQUNBO0FBQ0MsTUFBQSxDQUFBLE1BQUEsRUFDQTtBQUNDLElBQUEsTUFBQSxHQUFBLEVBQUE7QUFDQTs7QUFJRixNQUFBLE1BQUEsR0FBQSxNQUFBLENBQUEsUUFBQSxZQUFBLFFBQUEsR0FBQSxNQUFBLENBQUEsUUFBQSxDQUFBLFNBQUEsR0FBQSxFQUFBO0FBRUEsTUFBQSxpQkFBQSxHQUFBLE1BQUEsQ0FBQSxXQUFBLFlBQUEsS0FBQSxHQUFBLE1BQUEsQ0FBQSxXQUFBLEdBQUEsRUFBQTtBQUNDLE1BQU0saUJBQWlCLEdBQUcsTUFBTyxDQUFBLFdBQVAsWUFBK0IsS0FBL0IsR0FBd0MsTUFBTSxDQUFBLFdBQTlDLEdBQTZELEVBQXZGOztBQUlELE1BQUEsTUFBQSxHQUFBLFNBQUEsTUFBQSxHQUNDO0FBR0QsU0FBQSxJQUFBLENBQUEsSUFBQSxLQUFBLFdBQUEsRUFDRTtBQUNDLFVBQUEsS0FBQSxXQUFBLENBQUEsY0FBQSxDQUFBLENBQUEsQ0FBQSxFQUNBO0FBQ0MsY0FBQSxVQUFBLEdBQUEsS0FBQSxXQUFBLENBQUEsQ0FBQSxDQUFBOztBQUVKLGVBQUEsSUFBQSxDQUFBLElBQUEsVUFBQSxDQUFBLFFBQUEsRUFDSTtBQUNDLGdCQUFBLFVBQUEsQ0FBQSxRQUFBLENBQUEsY0FBQSxDQUFBLENBQUEsQ0FBQSxFQUNBO0FBQ0Msb0JBQUEsT0FBQSxHQUFBLFVBQUEsQ0FBQSxRQUFBLENBQUEsQ0FBQSxDQUFBOztBQUVOLG9CQUFBLE9BQUEsS0FBQSxDQUFBLENBQUEsS0FBQSxPQUFBLE9BQUEsRUFDTTtBQUNDLHdCQUFBLFlBQUEsS0FBQSxLQUFBLEdBQUEseUJBQUEsR0FBQSxVQUFBLENBQUEsS0FBQSxHQUFBLEdBQUEsR0FBQSxDQUFBLEdBQUEsR0FBQTtBQUNBO0FBQ0Q7QUFDRDtBQUNEO0FBQ0Q7O0FBSUgsUUFBQSxNQUFBLEdBQUEsS0FBQSxNQUFBLENBQUEsZUFBQTtBQUNFLFFBQU0sTUFBTSxHQUFHLEtBQUksTUFBSixDQUFZLGVBQTNCO0FBSUYsU0FBQSxNQUFBLEdBQUEsRUFBQTs7QUFFQSxTQUFBLElBQUEsSUFBQSxJQUFBLE1BQUEsRUFDRTtBQUNDLFVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxJQUFBLENBQUEsRUFDQTtBQUNDLGVBQUEsTUFBQSxDQUFBLElBQUEsSUFBQSxVQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsSUFBQTtBQUFBLG1CQUFBLFlBQUE7QUFFSixxQkFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsRUFBQSxTQUFBLENBQUE7QUFFQSxhQUpJO0FBQUEsV0FBQSxDQUlKLE1BSkksRUFJSixJQUpJLEVBSUosSUFKSSxDQUFBO0FBS0E7QUFDRDs7QUFJSCxTQUFBLE1BQUEsR0FBQSxFQUFBOztBQUVBLFNBQUEsSUFBQSxLQUFBLElBQUEsTUFBQSxFQUNFO0FBQ0MsVUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLEtBQUEsQ0FBQSxFQUNBO0FBQ0MsZUFBQSxNQUFBLENBQUEsS0FBQSxJQUFBLFVBQUEsTUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBO0FBQUEsbUJBQUEsWUFBQTtBQUVKLHFCQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLFNBQUEsQ0FBQTtBQUVBLGFBSkk7QUFBQSxXQUFBLENBSUosTUFKSSxFQUlKLEtBSkksRUFJSixJQUpJLENBQUE7QUFLQTtBQUNEOztBQUlILFFBQUEsS0FBQSxLQUFBLEVBQ0U7QUFDQyxXQUFBLEtBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLFNBQUE7QUFDQTtBQUdELEdBdEVGOztBQTBFQSxFQUFBLE1BQUEsQ0FBQSxlQUFBLEdBQUEsRUFBQTtBQUNDLEVBQUEsTUFBTSxDQUFDLGVBQVAsR0FBeUIsRUFBekI7O0FBSUQsT0FBQSxJQUFBLElBQUEsSUFBQSxNQUFBLEVBQ0M7QUFDQyxRQUFBLElBQUEsS0FBQSxPQUFBLElBRUcsSUFBRSxDQUFBLE1BQUYsQ0FBRSxDQUFGLE1BQUUsR0FGTCxJQUlHLE1BQUUsQ0FBQSxjQUFGLENBQUUsSUFBRixDQUpILEVBS0c7QUFDRixRQUFBLE1BQUcsQ0FBQSxlQUFILENBQUcsSUFBSCxJQUFHLE1BQUEsQ0FBQSxJQUFBLENBQUg7QUFFSCxRQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsSUFBQSxJQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUE7QUFDRztBQUNEOztBQUVGLE9BQUEsSUFBQSxNQUFBLElBQUEsTUFBQSxFQUNDO0FBQ0MsUUFBQSxNQUFBLEtBQUEsT0FBQSxJQUVHLE1BQUUsQ0FBQSxNQUFGLENBQUUsQ0FBRixNQUFFLEdBRkwsSUFJRyxNQUFFLENBQUEsY0FBRixDQUFFLE1BQUYsQ0FKSCxFQUtHO0FBQ0YsUUFBQSxNQUFHLENBQUEsZUFBSCxDQUFHLE1BQUgsSUFBRyxNQUFBLENBQUEsTUFBQSxDQUFIO0FBRUgsUUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLE1BQUEsSUFBQSxNQUFBLENBQUEsTUFBQSxDQUFBO0FBQ0c7QUFDRDs7QUFJRixFQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsS0FBQSxHQUFBLEtBQUE7QUFDQyxFQUFBLE1BQU0sQ0FBQyxTQUFQLENBQWdCLE1BQWhCLEdBQTBCLE1BQTFCO0FBQ0EsRUFBQSxNQUFNLENBQUMsU0FBUCxDQUFnQixXQUFoQixHQUEyQixpQkFBTSxDQUFBLE1BQU4sQ0FBTSxpQkFBTixDQUEzQjs7QUFJRCxFQUFBLGdCQUFBLENBQUEsS0FBQSxFQUFBLE1BQUEsQ0FBQTs7QUFJQSxNQUFBLE1BQUEsQ0FBQSxDQUFBLEVBQ0M7QUFDQyxJQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxDQUFBLE1BQUE7QUFDQTtBQUdEOztBQU1ELElBQUEsT0FBQSxPQUFBLEtBQUEsV0FBQSxFQUNBO0FBQ0MsRUFBQSxNQUFBLENBQUEsT0FBQSxDQUFBLFNBQUEsR0FBQSxhQUFBO0FBQ0EsRUFBQSxNQUFNLENBQUMsT0FBUCxDQUFlLFNBQWYsR0FBMkIsYUFBM0I7QUFDQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLENBQWUsS0FBZixHQUE0QixTQUE1QjtBQUNBOztBQU1ELElBQUEsT0FBQSxNQUFBLEtBQUEsV0FBQSxFQUNBO0FBQ0MsRUFBQSxNQUFBLENBQUEsU0FBQSxHQUFBLGFBQUE7QUFDQSxFQUFBLE1BQU0sQ0FBQyxTQUFQLEdBQW1CLGFBQW5CO0FBQ0EsRUFBQSxNQUFNLENBQUMsS0FBUCxHQUFvQixTQUFwQjtBQUNBOztBQ3RURCxhQUFBLENBQUEsV0FBQSxFQUFBO0FBS0EsRUFBQSxVQUFBLEVBQUEsRUFMQTtBQU1DLEVBQUEsVUFBVSxFQUFFLEVBTmI7QUFPQyxFQUFBLFVBQVUsRUFBRSxFQVBiO0FBU0EsRUFBQSxLQUFBLEVBQUEsRUFUQTtBQVVDLEVBQUEsS0FBSyxFQUFFLEVBVlI7QUFjQSxFQUFBLE9BQUEsRUFBQSxFQWRBO0FBb0JBLEVBQUEsV0FBQSxFQUFBLHFCQUFBLEdBQUEsRUFDQztBQUNDLElBQUEsR0FBQSxHQUFBLEdBQUEsQ0FBQSxJQUFBLEVBQUE7O0FBRUYsV0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsS0FBQSxHQUFBLEVBQ0U7QUFDQyxNQUFBLEdBQUEsR0FBQSxHQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsRUFBQSxHQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsQ0FBQTtBQUNBOztBQUVILFdBQUEsR0FBQTtBQUNFLEdBOUJGO0FBb0NBLEVBQUEsQ0FBQSxFQUFBLGFBQ0M7QUFBQTs7QUFHRCxTQUFBLEtBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQTtBQUNFLFNBQUssT0FBTCxDQUFXLE1BQVgsR0FBc0IsQ0FBdEI7QUFJRixRQUFBLElBQUEsR0FBQSxNQUFBLENBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUE7QUFDRSxRQUFPLElBQUksR0FBSSxNQUFNLENBQUMsUUFBUCxDQUFpQixJQUFqQixDQUF1QixJQUF2QixFQUFmO0FBQ0EsUUFBSyxNQUFNLEdBQUksTUFBTSxDQUFDLFFBQVAsQ0FBZ0IsTUFBaEIsQ0FBdUIsSUFBdkIsRUFBZjtBQUlGLFFBQUEsT0FBQSxHQUFBLFFBQUEsQ0FBQSxvQkFBQSxDQUFBLFFBQUEsQ0FBQTs7QUFNQSxTQUFBLElBQUEsR0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLE9BQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQ0U7QUFDQyxNQUFBLEdBQUEsR0FBQSxPQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLE9BQUEsQ0FBQSxTQUFBLENBQUE7O0FBRUgsVUFBQSxHQUFBLEdBQUEsQ0FBQSxFQUNHO0FBQ0MsYUFBQSxVQUFBLEdBQUEsT0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUE7QUFFSixhQUFBLFVBQUEsR0FBQSxLQUFBLFdBQUEsQ0FDSSxLQUFLLFVBQUwsQ0FBaUIsU0FBakIsQ0FBdUIsQ0FBdkIsRUFBdUIsR0FBdkIsQ0FESixDQUFBO0FBSUE7QUFDSTtBQUNEOztBQU1ILFNBQUEsVUFBQSxHQUFBLEtBQUEsV0FBQSxDQUNFLElBQUssQ0FBQSxPQUFMLENBQUssY0FBTCxFQUF1QixFQUF2QixDQURGLENBQUE7QUFRQSxTQUFBLEtBQUEsR0FBQSxLQUFBLFdBQUEsQ0FDRSxJQUFLLENBQUEsU0FBTCxDQUFhLENBQWIsRUFBa0IsT0FBbEIsQ0FBa0IsT0FBbEIsRUFBOEIsRUFBOUIsQ0FERixDQUFBOztBQVFBLFFBQUEsTUFBQSxFQUNFO0FBQ0MsTUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsRUFBQSxLQUFBLENBQUEsR0FBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEtBQUEsRUFBQTtBQUVILFlBQUEsS0FBQSxHQUFBLEtBQUEsQ0FBQSxLQUFBLENBQUEsR0FBQSxDQUFBOztBQUVBLFlBQUEsS0FBQSxDQUFBLE1BQUEsS0FBQSxDQUFBLEVBQ0k7QUFDQyxVQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsa0JBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxFQUFBO0FBQ0EsU0FITCxNQUlLLElBQUEsS0FBQSxDQUFBLE1BQUEsS0FBQSxDQUFBLEVBQ0Q7QUFDQyxVQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsa0JBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxrQkFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtBQUNBO0FBQ0QsT0FaRDtBQWFBO0FBR0QsR0EvR0Y7QUEwSEEsRUFBQSxZQUFBLEVBQUEsd0JBQ0M7QUFDQyxXQUFBLEtBQUEsVUFBQTtBQUNBLEdBN0hGO0FBc0lBLEVBQUEsWUFBQSxFQUFBLHdCQUNDO0FBQ0MsV0FBQSxLQUFBLFVBQUE7QUFDQSxHQXpJRjtBQWtKQSxFQUFBLFlBQUEsRUFBQSx3QkFDQztBQUNDLFdBQUEsS0FBQSxVQUFBO0FBQ0EsR0FySkY7QUE4SkEsRUFBQSxPQUFBLEVBQUEsbUJBQ0M7QUFDQyxXQUFBLEtBQUEsS0FBQTtBQUNBLEdBaktGO0FBMEtBLEVBQUEsT0FBQSxFQUFBLG1CQUNDO0FBQ0MsV0FBQSxLQUFBLEtBQUE7QUFDQSxHQTdLRjtBQXdMQSxFQUFBLE1BQUEsRUFBQSxnQkFBQSxNQUFBLEVBQUEsT0FBQSxFQUNDO0FBQ0MsU0FBQSxPQUFBLENBQUEsT0FBQSxDQUFBO0FBQ0EsTUFBQSxNQUFLLEVBQUEsTUFETDtBQUVDLE1BQUEsT0FBTyxFQUFDO0FBRlQsS0FBQTs7QUFLRixXQUFBLElBQUE7QUFDRSxHQWhNRjtBQTBNQSxFQUFBLE1BQUEsRUFBQSxnQkFBQSxNQUFBLEVBQ0M7QUFDQyxTQUFBLE9BQUEsR0FBQSxLQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsVUFBQSxLQUFBLEVBQUE7QUFFRixhQUFBLEtBQUEsQ0FBQSxNQUFBLENBQUEsUUFBQSxPQUFBLE1BQUEsQ0FBQSxRQUFBLEVBQUE7QUFDRyxLQUhELENBQUE7QUFLRixXQUFBLElBQUE7QUFDRSxHQWxORjtBQTJOQSxFQUFBLEtBQUEsRUFBQSxpQkFDQztBQUNDLFFBQUEsQ0FBQTs7QUFFRixTQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsS0FBQSxPQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxFQUNFO0FBQ0MsTUFBQSxDQUFBLEdBQUEsS0FBQSxLQUFBLENBQUEsS0FBQSxDQUFBLEtBQUEsT0FBQSxDQUFBLENBQUEsRUFBQSxNQUFBLENBQUE7O0FBRUgsVUFBQSxDQUFBLEVBQ0c7QUFDQyxhQUFBLE9BQUEsQ0FBQSxDQUFBLEVBQUEsT0FBQSxDQUFBLEtBQUEsQ0FBQSxTQUFBLEVBQUEsQ0FBQTs7QUFFSixlQUFBLElBQUE7QUFDSTtBQUNEOztBQUVILFdBQUEsS0FBQTtBQUNFLEdBNU9GO0FBdVBBLEVBQUEsa0JBQUEsRUFBQSw0QkFBQSxJQUFBLEVBQUEsT0FBQSxFQUNDO0FBQUEsUUFERCxPQUNDO0FBREQsTUFBQSxPQUNDLEdBREQsSUFDQztBQUFBOztBQUNDLFFBQUEsT0FBQSxDQUFBLFNBQUEsRUFDQTtBQUNDLE1BQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLEtBQUEsVUFBQSxHQUFBLEtBQUEsV0FBQSxDQUFBLElBQUEsQ0FBQTtBQUVILGFBQUEsSUFBQTtBQUNHOztBQUVILFdBQUEsS0FBQTtBQUNFLEdBalFGO0FBNFFBLEVBQUEsbUJBQUEsRUFBQSw2QkFBQSxJQUFBLEVBQUEsT0FBQSxFQUNDO0FBQUEsUUFERCxPQUNDO0FBREQsTUFBQSxPQUNDLEdBREQsSUFDQztBQUFBOztBQUNDLFFBQUEsT0FBQSxDQUFBLFlBQUEsRUFDQTtBQUNDLE1BQUEsT0FBQSxDQUFBLFlBQUEsQ0FBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLEtBQUEsVUFBQSxHQUFBLEtBQUEsV0FBQSxDQUFBLElBQUEsQ0FBQTtBQUVILGFBQUEsSUFBQTtBQUNHOztBQUVILFdBQUEsS0FBQTtBQUNFO0FBdFJGLENBQUEsQ0FBQTtBQ0hBLGFBQUEsQ0FBQSxLQUFBLEVBQUE7QUFFQSxFQUFBLE9BQUEsRUFBQSxPQUZBO0FBR0MsRUFBQSxTQUFTLEVBQUU7QUFIWixDQUFBLENBQUE7O0FBVUEsU0FBQSxrQkFBQSxDQUFBLFFBQUEsRUFBQSxRQUFBLEVBQUEsUUFBQSxFQUNBO0FBQ0MsTUFBQSxRQUFBLElBQUEsUUFBQSxDQUFBLElBQUEsRUFDQTtBQUNDLElBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsUUFBQTtBQUNBLEdBSEQsTUFLQTtBQUNDLElBQUEsUUFBQTtBQUNBO0FBQ0Q7O0FBSUQsU0FBQSxvQkFBQSxDQUFBLFFBQUEsRUFBQSxVQUFBLEVBQ0E7QUFDQyxNQUFBLFFBQUEsSUFBQSxRQUFBLENBQUEsTUFBQSxFQUNBO0FBQ0MsSUFBQSxRQUFBLENBQUEsTUFBQSxDQUFBLFVBQUE7QUFDQSxHQUhELE1BS0E7QUFDQyxJQUFBLFVBQUE7QUFDQTtBQUNEOztBQVdELGFBQUEsQ0FBQSxXQUFBLEVBQUE7QUFLQSxFQUFBLFNBQUEsRUFBQSxJQUFBLE1BQUEsQ0FBQSxxRkFBQSxFQUFBLEdBQUEsQ0FMQTtBQU9BLEVBQUEsUUFBQSxFQUFBLElBQUEsTUFBQSxDQUFBLGdDQUFBLEVBQUEsR0FBQSxDQVBBO0FBV0EsRUFBQSxTQUFBLEVBQUEsS0FYQTtBQVlDLEVBQUEsWUFBVyxFQUFBLEtBWlo7QUFhQyxFQUFBLGlCQUFjLEVBQUssS0FicEI7QUFjQyxFQUFBLFVBQUEsRUFBQSxLQWREO0FBa0JBLEVBQUEsZUFBQSxFQUFBLENBQUEsQ0FBQSxRQUFBLEVBbEJBO0FBc0JBLEVBQUEsT0FBQSxFQUFBLEVBdEJBO0FBdUJDLEVBQUEsUUFBUSxFQUFDLEVBdkJWO0FBeUJBLEVBQUEsU0FBQSxFQUFBLEVBekJBO0FBMEJDLEVBQUEsUUFBQSxFQUFVLEVBMUJYO0FBNEJBLEVBQUEsUUFBQSxFQUFBLEtBNUJBO0FBNkJDLEVBQUEsU0FBUyxFQUFDLElBN0JYO0FBOEJDLEVBQUEsUUFBQSxFQUFVLElBOUJYO0FBa0NBLEVBQUEsc0JBQUEsRUFBQSxJQUFBLFlBQ0M7QUFDQyxTQUFBLE9BQUEsR0FBQSxZQUFBLENBQUEsQ0FBQTs7QUFDQSxTQUFLLE1BQUwsR0FBYyxZQUFXLENBQUMsQ0FBMUI7O0FBQ0EsU0FBSyxPQUFMLEdBQWMsWUFBVyxDQUFHLENBQTVCOztBQUNBLFNBQUssUUFBTCxHQUFlLFlBQVcsQ0FBRyxDQUE3QjtBQUNBLEdBTkYsRUFsQ0E7QUFtREEsRUFBQSxTQUFBLEVBQUEsR0FuREE7QUEwREEsRUFBQSxTQUFBLEVBQUEsR0ExREE7QUFpRUEsRUFBQSxJQUFBLEVBQUEsRUFqRUE7QUF3RUEsRUFBQSxJQUFBLEVBQUEsRUF4RUE7QUE4RUEsRUFBQSxDQUFBLEVBQUEsYUFDQztBQUFBOztBQUtELFFBQUEsR0FBQSxHQUFBLFNBQUEsQ0FBQSxZQUFBLEVBQUE7QUFFQSxRQUFBLEdBQUEsR0FBQSxHQUFBLENBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQTs7QUFFQSxRQUFBLEdBQUEsR0FBQSxDQUFBLEVBQ0U7QUFHRixVQUFBLEtBQUEsR0FBQSxHQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsRUFBQSxXQUFBLEVBQUE7QUFJQSxXQUFBLFNBQUEsR0FBQSxLQUFBLENBQUEsT0FBQSxDQUFBLFVBQUEsS0FBQSxDQUFBO0FBRUEsV0FBQSxZQUFBLEdBQUEsS0FBQSxDQUFBLE9BQUEsQ0FBQSxhQUFBLEtBQUEsQ0FBQTtBQUVBLFdBQUEsaUJBQUEsR0FBQSxLQUFBLENBQUEsT0FBQSxDQUFBLGtCQUFBLEtBQUEsQ0FBQTtBQUVBLFdBQUEsVUFBQSxHQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsV0FBQSxLQUFBLENBQUE7QUFHRzs7QUFNSCxTQUFBLFNBQUEsR0FBQSxTQUFBLENBQUEsWUFBQSxFQUFBO0FBQ0UsU0FBSyxTQUFMLEdBQWlCLFNBQVMsQ0FBQyxZQUFWLEVBQWpCO0FBRUYsU0FBQSxJQUFBLEdBQUEsU0FBQSxDQUFBLE9BQUEsRUFBQTtBQUNFLFNBQUssSUFBTCxHQUFZLFNBQVMsQ0FBQyxPQUFWLEVBQVo7QUFNRixRQUFBLFlBQUEsR0FBQSxFQUFBO0FBQ0UsUUFBTSxXQUFBLEdBQWMsRUFBcEI7O0FBSUYsUUFBQSxDQUFBLE1BQUEsQ0FBQSxNQUFBLEVBQ0U7QUFDQyxNQUFBLFdBQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxTQUFBLEdBQUEsbUJBQUE7QUFDQTs7QUFFSCxRQUFBLENBQUEsTUFBQSxDQUFBLE1BQUEsRUFDRTtBQUNDLE1BQUEsV0FBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLFNBQUEsR0FBQSxtQkFBQTtBQUNBOztBQUlILFFBQUEsT0FBQSxNQUFBLENBQUEsRUFBQSxDQUFBLE1BQUEsS0FBQSxVQUFBLEVBQ0U7QUFDQyxNQUFBLFdBQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxTQUFBLEdBQUEsMEJBQUE7QUFDQTs7QUFJSCxRQUFBLENBQUEsS0FBQSxZQUFBLElBQUEsT0FBQSxNQUFBLENBQUEsRUFBQSxDQUFBLEtBQUEsS0FBQSxVQUFBLEVBQ0U7QUFDQyxNQUFBLFlBQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxTQUFBLEdBQUEsd0JBQUE7QUFDQSxNQUFBLFdBQUEsQ0FBWSxJQUFaLENBQWlCLEtBQUssU0FBTCxHQUFpQixzQkFBbEM7QUFDQTs7QUFFSCxRQUFBLENBQUEsS0FBQSxpQkFBQSxJQUFBLE9BQUEsTUFBQSxDQUFBLEVBQUEsQ0FBQSxjQUFBLEtBQUEsVUFBQSxFQUNFO0FBQ0MsTUFBQSxZQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsU0FBQSxHQUFBLHVDQUFBO0FBQ0EsTUFBQSxXQUFBLENBQVksSUFBWixDQUFpQixLQUFLLFNBQUwsR0FBaUIscUNBQWxDO0FBQ0E7O0FBRUgsUUFBQSxDQUFBLEtBQUEsVUFBQSxJQUFBLE9BQUEsTUFBQSxDQUFBLEVBQUEsQ0FBQSxPQUFBLEtBQUEsVUFBQSxFQUNFO0FBQ0MsTUFBQSxZQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsU0FBQSxHQUFBLHNCQUFBO0FBQ0EsTUFBQSxXQUFBLENBQVksSUFBWixDQUFpQixLQUFLLFNBQUwsR0FBaUIsb0JBQWxDO0FBQ0E7O0FBSUgsU0FBQSxhQUFBLFdBQ00sWUFETixHQUVHLEtBQUcsU0FBSCxHQUFnQiwyQkFGbkIsRUFHRyxLQUFLLFNBQUwsR0FBaUIsa0JBSHBCLEdBSUcsV0FKSCxHQUtHLElBTEgsQ0FLTSxZQUFZO0FBRWxCLE1BQUEsTUFBQSxDQUFBLGVBQUEsQ0FBQSxPQUFBO0FBRUEsS0FUQSxFQVNBLElBVEEsQ0FTQSxVQUFBLE9BQUEsRUFBQTtBQUVBLE1BQUEsTUFBQSxDQUFBLGVBQUEsQ0FBQSxNQUFBLENBQUEsT0FBQTtBQUNHLEtBWkg7QUFlRSxHQXBMRjtBQStMQSxFQUFBLFVBQUEsRUFBQSxzQkFDQztBQUNDLFdBQUEsS0FBQSxTQUFBO0FBQ0EsR0FsTUY7QUEyTUEsRUFBQSxPQUFBLEVBQUEsbUJBQ0M7QUFDQyxXQUFBLFFBQUEsQ0FBQSxRQUFBLENBQUEsUUFBQSxLQUFBLE9BQUEsSUFFTyxRQUFFLENBQUEsUUFBRixDQUFFLFFBQUYsS0FBRSxXQUZULElBSU8sUUFBRSxDQUFBLFFBQUYsQ0FBRSxRQUFGLEtBQUUsV0FKVCxJQU1PLFFBQUUsQ0FBQSxRQUFGLENBQUUsUUFBRixLQUFFLEtBTlQ7QUFRQSxHQXJORjtBQTJOQSxFQUFBLE1BQUEsRUFBQSxnQkFBQSxDQUFBLEVBQ0M7QUFDQyxRQUFBLElBQUEsR0FBQSxNQUFBLENBQUEsU0FBQSxDQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBO0FBRUYsV0FBQSxJQUFBLENBQUEsVUFBQSxDQUFBLFVBQUEsSUFBQSxJQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsRUFBQSxJQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsQ0FBQSxHQUN1RCxFQUR2RDtBQUdFLEdBbE9GO0FBc09BLEVBQUEsT0FBQSxFQUFBLGlCQUFBLENBQUEsRUFDQztBQUNDLFdBQUEsS0FBQSxNQUFBLENBQUEsQ0FBQSxNQUFBLE9BQUEsR0FBQSxDQUFBLEdBQ29DLENBQUMsQ0FBRCxDQURwQztBQUdBLEdBM09GO0FBK09BLEVBQUEsS0FBQSxFQUFBLGVBQUEsV0FBQSxFQUFBLGNBQUEsRUFBQSxRQUFBLEVBQ0M7QUFDQyxRQUFBLE1BQUEsR0FBQSxFQUFBO0FBSUYsUUFBQSxDQUFBLEdBQUEsV0FBQSxDQUFBLE1BQUE7QUFDRSxRQUFNLENBQUMsR0FBRyxjQUFZLENBQUEsTUFBdEI7O0FBRUYsUUFBQSxDQUFBLEtBQUEsQ0FBQSxFQUNFO0FBQ0MsWUFBQSxnQkFBQTtBQUNBOztBQUlILFFBQUEsUUFBQSxFQUFBO0FBQ0UsV0FBRyxJQUFBLENBQUEsR0FBVSxDQUFiLEVBQWMsQ0FBQSxHQUFBLENBQWQsRUFBYyxDQUFBLEVBQWQsRUFBYztBQUNiLFFBQUEsTUFBTyxDQUFDLElBQVIsQ0FBYSxXQUFVLENBQUEsQ0FBQSxDQUFWLElBQWUsUUFBZixHQUFlLFFBQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQSxDQUFBLENBQWYsR0FBZSxjQUFBLENBQUEsQ0FBQSxDQUE1QjtBQUNDO0FBQ0QsS0FKSCxNQUtHO0FBQ0QsV0FBSyxJQUFDLElBQUEsR0FBQSxDQUFOLEVBQU0sSUFBQSxHQUFBLENBQU4sRUFBTSxJQUFBLEVBQU4sRUFBTTtBQUNMLFFBQUEsTUFBTyxDQUFDLElBQVIsQ0FBNEIsY0FBQSxDQUFBLElBQUEsQ0FBNUI7QUFDQztBQUNEOztBQUlILFdBQUEsTUFBQTtBQUNFLEdBN1FGO0FBaVJBLEVBQUEsT0FBQSxFQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsUUFqUkE7QUFxUkEsRUFBQSxZQUFBLEVBQUEsQ0FBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLENBclJBO0FBc1JDLEVBQUEsWUFBWSxFQUFFLENBQUEsT0FBQSxFQUFVLFFBQVYsRUFBb0IsTUFBcEIsRUFBNEIsTUFBNUIsQ0F0UmY7QUE4UkEsRUFBQSxVQUFBLEVBQUEsb0JBQUEsQ0FBQSxFQUNDO0FBQ0MsV0FBQSxLQUFBLE9BQUEsQ0FBQSxDQUFBLElBQUEsRUFBQSxFQUFBLEtBQUEsWUFBQSxFQUFBLEtBQUEsWUFBQSxDQUFBO0FBQ0EsR0FqU0Y7QUF5U0EsRUFBQSxVQUFBLEVBQUEsb0JBQUEsQ0FBQSxFQUNDO0FBQ0MsV0FBQSxLQUFBLE9BQUEsQ0FBQSxDQUFBLElBQUEsRUFBQSxFQUFBLEtBQUEsWUFBQSxFQUFBLEtBQUEsWUFBQSxDQUFBO0FBQ0EsR0E1U0Y7QUFnVEEsRUFBQSxjQUFBLEVBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLENBaFRBO0FBaVRDLEVBQUEsY0FBYyxFQUFFLENBQUEsTUFBQSxFQUFTLEtBQVQsRUFBZ0IsS0FBaEIsRUFBdUIsTUFBdkIsQ0FqVGpCO0FBeVRBLEVBQUEsWUFBQSxFQUFBLHNCQUFBLENBQUEsRUFDQztBQUNDLFdBQUEsS0FBQSxPQUFBLENBQUEsQ0FBQSxJQUFBLEVBQUEsRUFBQSxLQUFBLGNBQUEsRUFBQSxLQUFBLGNBQUEsQ0FBQTtBQUNBLEdBNVRGO0FBb1VBLEVBQUEsWUFBQSxFQUFBLHNCQUFBLENBQUEsRUFDQztBQUNDLFdBQUEsS0FBQSxPQUFBLENBQUEsQ0FBQSxJQUFBLEVBQUEsRUFBQSxLQUFBLGNBQUEsRUFBQSxLQUFBLGNBQUEsQ0FBQTtBQUVGLEdBeFVBO0FBNFVBLEVBQUEsY0FBQSxFQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxRQUFBLEVBQUEsSUFBQSxDQTVVQTtBQTZVQyxFQUFBLGNBQWMsRUFBRSxDQUFBLE1BQUEsRUFBUyxLQUFULEVBQWdCLFVBQWhCLEVBQTRCLE1BQTVCLENBN1VqQjtBQXFWQSxFQUFBLFlBQUEsRUFBQSxzQkFBQSxDQUFBLEVBQ0M7QUFDQyxXQUFBLEtBQUEsT0FBQSxDQUFBLENBQUEsSUFBQSxFQUFBLEVBQUEsS0FBQSxjQUFBLEVBQUEsS0FBQSxjQUFBLENBQUE7QUFDQSxHQXhWRjtBQWdXQSxFQUFBLFlBQUEsRUFBQSxzQkFBQSxDQUFBLEVBQ0M7QUFDQyxXQUFBLEtBQUEsT0FBQSxDQUFBLENBQUEsSUFBQSxFQUFBLEVBQUEsS0FBQSxjQUFBLEVBQUEsS0FBQSxjQUFBLENBQUE7QUFDQSxHQW5XRjtBQXVXQSxFQUFBLFdBQUEsRUFBQSxDQUFBLElBQUEsQ0F2V0E7QUF3V0MsRUFBQSxXQUFXLEVBQUUsQ0FBQSxNQUFBLENBeFdkO0FBZ1hBLEVBQUEsU0FBQSxFQUFBLG1CQUFBLENBQUEsRUFDQztBQUNDLFdBQUEsS0FBQSxPQUFBLENBQUEsQ0FBQSxJQUFBLEVBQUEsRUFBQSxLQUFBLFdBQUEsRUFBQSxLQUFBLFdBQUEsQ0FBQTtBQUNBLEdBblhGO0FBMlhBLEVBQUEsU0FBQSxFQUFBLG1CQUFBLENBQUEsRUFDQztBQUNDLFdBQUEsS0FBQSxPQUFBLENBQUEsQ0FBQSxJQUFBLEVBQUEsRUFBQSxLQUFBLFdBQUEsRUFBQSxLQUFBLFdBQUEsQ0FBQTtBQUNBLEdBOVhGO0FBb1lBLEVBQUEsT0FBQSxFQUFBLGtFQXBZQTtBQThZQSxFQUFBLFlBQUEsRUFBQSxzQkFBQSxDQUFBLEVBQ0M7QUFDQyxRQUFBLENBQUE7QUFFRixRQUFBLENBQUEsR0FBQSxFQUFBO0FBRUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE1BQUE7QUFBQSxRQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUVBLFFBQUEsV0FBQSxHQUFBLEtBQUEsT0FBQTs7QUFFQSxTQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxHQUNFO0FBQ0MsTUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLEVBQUEsS0FBQSxFQUFBLEdBRUksQ0FBQyxDQUFBLFVBQUQsQ0FBQyxDQUFBLEVBQUQsS0FBQyxDQUZMLEdBSUksQ0FBQyxDQUFBLFVBQUQsQ0FBQyxDQUFBLEVBQUQsS0FBQyxDQUpMO0FBT0gsTUFBQSxDQUFBLENBQUEsSUFBQSxDQUFBLFdBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxJQUFBLEVBQUEsR0FBQSxJQUFBLENBQUE7QUFDRyxNQUFBLENBQUMsQ0FBQyxJQUFGLENBQU8sV0FBVyxDQUFDLE1BQVosQ0FBb0IsQ0FBQyxJQUFJLEVBQVAsR0FBYSxJQUEvQixDQUFQO0FBQ0EsTUFBQSxDQUFDLENBQUMsSUFBRixDQUFPLFdBQVcsQ0FBQyxNQUFaLENBQW9CLENBQUMsSUFBSSxDQUFQLEdBQVksSUFBOUIsQ0FBUDtBQUNBLE1BQUEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxXQUFXLENBQUMsTUFBWixDQUFvQixDQUFDLElBQUksQ0FBUCxHQUFZLElBQTlCLENBQVA7QUFDQTs7QUFFSCxRQUFBLENBQUEsS0FBQSxDQUFBLEVBQUE7QUFDRSxNQUFBLENBQUEsQ0FBQSxNQUFBLENBQVUsQ0FBQSxDQUFWLEVBQWMsQ0FBZDtBQUNDLEtBRkgsTUFHRyxJQUFBLENBQUEsS0FBQSxDQUFBLEVBQUE7QUFDRCxNQUFBLENBQUEsQ0FBQSxNQUFBLENBQVUsQ0FBQSxDQUFWLEVBQWMsQ0FBZDtBQUNDOztBQUVILFdBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLENBQUE7QUFDRSxHQS9hRjtBQXliQSxFQUFBLFlBQUEsRUFBQSxzQkFBQSxDQUFBLEVBQ0M7QUFDQyxRQUFBLENBQUE7QUFFRixRQUFBLENBQUEsR0FBQSxFQUFBO0FBRUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE1BQUE7QUFBQSxRQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUVBLFFBQUEsV0FBQSxHQUFBLEtBQUEsT0FBQTs7QUFFQSxTQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxHQUNFO0FBQ0MsTUFBQSxDQUFBLEdBQUEsV0FBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEtBQUEsRUFBQSxHQUVJLFdBQUMsQ0FBQSxPQUFELENBQUMsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBRCxLQUFDLEVBRkwsR0FJSSxXQUFDLENBQUEsT0FBRCxDQUFDLENBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxFQUFBLENBQUQsS0FBQyxDQUpMLEdBTUksV0FBQyxDQUFBLE9BQUQsQ0FBQyxDQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsRUFBQSxDQUFELEtBQUMsQ0FOTDtBQVNILE1BQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsWUFBQSxDQUFBLENBQUEsS0FBQSxFQUFBLEdBQUEsSUFBQSxDQUFBO0FBQ0csTUFBQSxDQUFDLENBQUMsSUFBRixDQUFPLE1BQU0sQ0FBQyxZQUFQLENBQXFCLENBQUMsS0FBSyxDQUFSLEdBQWEsSUFBaEMsQ0FBUDtBQUNBLE1BQUEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxNQUFNLENBQUMsWUFBUCxDQUFxQixDQUFDLEtBQUssQ0FBUixHQUFhLElBQWhDLENBQVA7QUFDQTs7QUFFSCxRQUFBLENBQUEsS0FBQSxDQUFBLEVBQUE7QUFDRSxNQUFBLENBQUEsQ0FBQSxNQUFBLENBQVUsQ0FBQSxDQUFWLEVBQWMsQ0FBZDtBQUNDLEtBRkgsTUFHRyxJQUFBLENBQUEsS0FBQSxDQUFBLEVBQUE7QUFDRCxNQUFBLENBQUEsQ0FBQSxNQUFBLENBQVUsQ0FBQSxDQUFWLEVBQWMsQ0FBZDtBQUNDOztBQUVILFdBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLENBQUE7QUFDRSxHQTNkRjtBQWllQSxFQUFBLGFBQUEsRUFBQSx1QkFBQSxHQUFBLEVBQ0M7QUFDQyxRQUFBLEdBQUEsR0FBQSxHQUFBLENBQUEsV0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUVGLFdBQUEsR0FBQSxHQUFBLENBQUEsR0FBQSxHQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLEVBQUE7QUFDRSxHQXRlRjtBQTBlQSxFQUFBLFlBQUEsRUFBQSxzQkFBQSxHQUFBLEVBQUEsUUFBQSxFQUNDO0FBQ0MsUUFBQSxNQUFBOztBQUVGLFFBQUEsUUFBQSxLQUFBLE1BQUEsRUFDRTtBQUNDLFVBQUEsR0FBQSxDQUFBLE9BQUEsQ0FBQSxPQUFBLE1BQUEsQ0FBQSxFQUNBO0FBQ0MsUUFBQSxNQUFBLEdBQUEsU0FBQTtBQUNBLE9BSEQsTUFJQyxJQUFBLEdBQUEsQ0FBQSxPQUFBLENBQUEsU0FBQSxNQUFBLENBQUEsRUFDRDtBQUNDLFFBQUEsTUFBQSxHQUFBLFFBQUE7QUFDQSxPQUhBLE1BS0Q7QUFDQyxnQkFBQSxLQUFBLGFBQUEsQ0FBQSxHQUFBLEVBQUEsV0FBQSxFQUFBO0FBRUMsZUFBQSxNQUFBO0FBQ0EsWUFBQSxNQUFPLEdBQUcsT0FBVjtBQUNDOztBQUVOLGVBQUEsS0FBQTtBQUNLLFlBQUEsTUFBTyxHQUFFLFFBQVQ7QUFDQzs7QUFFTixlQUFBLE9BQUE7QUFDSyxZQUFBLE1BQU8sR0FBQSxNQUFQO0FBQ0M7O0FBRU4sZUFBQSxNQUFBO0FBQ0ssWUFBQSxNQUFPLEdBQUcsS0FBVjtBQUNDOztBQUVOO0FBQ0ssWUFBQSxNQUFPLEdBQUMsTUFBUjtBQUNDO0FBcEJGO0FBc0JBO0FBQ0QsS0FuQ0gsTUFxQ0U7QUFDQyxNQUFBLE1BQUEsR0FBQSxRQUFBO0FBQ0E7O0FBRUgsV0FBQSxNQUFBO0FBQ0UsR0F4aEJGO0FBNGhCQSxFQUFBLFNBQUEsRUFBQSxtQkFBQSxRQUFBLEVBQUEsTUFBQSxFQUFBLElBQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxFQUNDO0FBQUE7O0FBQ0MsUUFBQSxJQUFBLENBQUEsTUFBQSxLQUFBLENBQUEsRUFDQTtBQUNDLGFBQUEsUUFBQSxDQUFBLFdBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQTtBQUNBOztBQUlILFFBQUEsR0FBQSxHQUFBLElBQUEsQ0FBQSxLQUFBLEdBQUEsSUFBQSxFQUFBOztBQUlBLFFBQUEsUUFBQSxHQUFBLEtBQUEsWUFBQSxDQUFBLEdBQUEsRUFBQSxRQUFBLENBQUE7O0FBSUEsWUFBQSxRQUFBO0FBTUEsV0FBQSxTQUFBO0FBRUEsYUFBQSxXQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsQ0FBQSxVQUFBLElBQUEsRUFBQTtBQUVBLFVBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBO0FBRUEsaUJBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxRQUFBLEVBQUEsTUFBQSxFQUFBLElBQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxDQUFBO0FBRUEsU0FOQSxFQU1BLFVBQUEsT0FBQSxFQUFBO0FBRUEsaUJBQUEsUUFBQSxDQUFBLFVBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQTtBQUNLLFNBVEw7QUFXQTs7QUFNQSxXQUFBLFFBQUE7QUFFQSxhQUFBLFVBQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxDQUFBLFVBQUEsSUFBQSxFQUFBO0FBRUEsVUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLElBQUE7QUFFQSxpQkFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLFFBQUEsRUFBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLENBQUE7QUFFQSxTQU5BLEVBTUEsVUFBQSxPQUFBLEVBQUE7QUFFQSxpQkFBQSxRQUFBLENBQUEsVUFBQSxDQUFBLE9BQUEsRUFBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBO0FBQ0ssU0FUTDtBQVdBOztBQU1BLFdBQUEsT0FBQTtBQUVBLFlBQUEsS0FBQSxPQUFBLENBQUEsT0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEVBQ0k7QUFDQyxVQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsS0FBQTtBQUVMLGlCQUFBLEtBQUEsU0FBQSxDQUFBLFFBQUEsRUFBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLENBQUE7QUFDSyxTQUxMLE1BT0k7QUFD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LElBQUEsRUFBQTtBQUVBLFFBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFDSSxPQUhKO0FBS0EsTUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLG9DQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLElBQUEsRUFBQTtBQUVBLFFBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFDSSxPQUhKO0FBS0EsTUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLG1DQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUVBLFlBQUEsSUFBQSxHQUFBLEVBQUE7QUFDSSxZQUFJLFFBQVUsR0FBQSxFQUFkO0FBRUosUUFBQSxHQUFBLENBQUEsS0FBQSxDQUFBLE9BQUEsQ0FBQSxVQUFBLEtBQUEsRUFBQTtBQUVBLFVBQUEsUUFBQSxDQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUE7O0FBRUEsY0FBQSxLQUFBLENBQUEsT0FBQSxDQUFBLEtBQUEsTUFBQSxFQUNLO0FBQ0MsWUFBQSxJQUFBLEdBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUNBO0FBQ0QsU0FSTDtBQVVBLFFBQUEsWUFBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLFFBQUE7QUFDSSxPQWhCSjtBQWtCQSxNQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsK0JBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBRUEsWUFBQSxJQUFBLEdBQUEsRUFBQTtBQUNJLFlBQUksSUFBTSxHQUFDLEVBQVg7QUFFSixRQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUEsT0FBQSxDQUFBLFVBQUEsS0FBQSxFQUFBO0FBRUEsVUFBQSxJQUFBLENBQUEsS0FBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQTs7QUFFQSxjQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsS0FBQSxNQUFBLEVBQ0s7QUFDQyxZQUFBLElBQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxDQUFBO0FBQ0E7QUFDRCxTQVJMO0FBVUEsUUFBQSxRQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsSUFBQTtBQUNJLE9BaEJKO0FBa0JBLE1BQUEsTUFBQSxDQUFBLFdBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxRQUFBLEVBQUEsWUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLENBQUE7QUFFQSxLQTdEQSxFQTZEQSxVQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7QUFFQSxNQUFBLE1BQUEsQ0FBQSxVQUFBLENBQUEsT0FBQSxFQUFBLENBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUFBLFFBQUEsT0FBQSxFQUFBLE9BQUE7QUFBQSxRQUFBLFNBQUEsRUFBQTtBQUFBLE9BQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBQUE7QUFDRyxLQWhFSDtBQW9FQSxXQUFBLE1BQUEsQ0FBQSxPQUFBLEVBQUE7QUFDRSxHQTdVRjtBQXVWQSxFQUFBLE1BQUEsRUFBQSxnQkFBQSxRQUFBLEVBQ0M7QUFDQyxRQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsUUFBQSxFQUFBOztBQURELDRCQUdELFNBQUEsQ0FBQSxLQUFBLENBQ0UsQ0FBQSxTQUFBLENBREYsRUFFRyxDQUFBLE1BQUEsQ0FGSCxFQUdHLFFBSEgsQ0FIQztBQUFBLFFBR0QsT0FIQzs7QUFXRCxTQUFBLE9BQUEsQ0FBQSx3Q0FBQSxFQUFBO0FBQUEsTUFBQSxVQUFBLEVBQUE7QUFBQSxLQUFBLEVBQUEsSUFBQSxDQUFBLFVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUVBLFVBQUEsUUFBQSxHQUFBLEVBQUE7QUFDRyxVQUFNLFFBQVEsR0FBRyxFQUFqQjtBQUNBLFVBQU0sWUFBVyxHQUFHLEVBQXBCO0FBQ0EsVUFBTSxPQUFBLEdBQUEsRUFBTjtBQUNBLFVBQU0sT0FBTyxHQUFHLEVBQWhCO0FBRUgsTUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLHFDQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLElBQUEsRUFBQTtBQUVBLFFBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFDSSxPQUhKO0FBS0EsTUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLG9DQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLElBQUEsRUFBQTtBQUVBLFFBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFDSSxPQUhKO0FBS0EsTUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLG9DQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLElBQUEsRUFBQTtBQUVBLFFBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFDSSxPQUhKO0FBS0EsTUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLG1DQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUVBLFlBQUEsSUFBQSxHQUFBLEVBQUE7QUFDSSxZQUFJLFFBQVUsR0FBQSxFQUFkO0FBRUosUUFBQSxHQUFBLENBQUEsS0FBQSxDQUFBLE9BQUEsQ0FBQSxVQUFBLEtBQUEsRUFBQTtBQUVBLFVBQUEsUUFBQSxDQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUE7O0FBRUEsY0FBQSxLQUFBLENBQUEsT0FBQSxDQUFBLEtBQUEsTUFBQSxFQUNLO0FBQ0MsWUFBQSxJQUFBLEdBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUNBO0FBQ0QsU0FSTDtBQVVBLFFBQUEsWUFBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLFFBQUE7QUFDSSxPQWhCSjtBQWtCQSxNQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsK0JBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBRUEsWUFBQSxJQUFBLEdBQUEsRUFBQTtBQUNJLFlBQUksSUFBTSxHQUFDLEVBQVg7QUFFSixRQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUEsT0FBQSxDQUFBLFVBQUEsS0FBQSxFQUFBO0FBRUEsVUFBQSxJQUFBLENBQUEsS0FBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQTs7QUFFQSxjQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsS0FBQSxNQUFBLEVBQ0s7QUFDQyxZQUFBLElBQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxDQUFBO0FBQ0E7QUFDRCxTQVJMO0FBVUEsUUFBQSxRQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsSUFBQTtBQUNJLE9BaEJKO0FBa0JBLE1BQUEsTUFBQSxDQUFBLFdBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxRQUFBLEVBQUEsWUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLENBQUE7QUFFQSxLQTdEQSxFQTZEQSxVQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7QUFFQSxNQUFBLE1BQUEsQ0FBQSxVQUFBLENBQUEsT0FBQSxFQUFBLENBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUFBLFFBQUEsT0FBQSxFQUFBLE9BQUE7QUFBQSxRQUFBLFNBQUEsRUFBQTtBQUFBLE9BQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBQUE7QUFDRyxLQWhFSDtBQW9FQSxXQUFBLE1BQUEsQ0FBQSxPQUFBLEVBQUE7QUFDRSxHQXhhRjtBQW9iQSxFQUFBLFVBQUEsRUFBQSxvQkFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUEsRUFDQztBQUNDLFdBQUEsS0FBQSxPQUFBLENBQUEsMkNBQUEsU0FBQSxDQUFBLFlBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxrQkFBQSxHQUFBLFNBQUEsQ0FBQSxZQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsR0FBQSxFQUFBLFFBQUEsQ0FBQTtBQUNBLEdBdmJGO0FBbWNBLEVBQUEsVUFBQSxFQUFBLG9CQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxFQUNDO0FBQ0MsV0FBQSxLQUFBLE9BQUEsQ0FBQSwyQ0FBQSxTQUFBLENBQUEsWUFBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLGtCQUFBLEdBQUEsU0FBQSxDQUFBLFlBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxHQUFBLEVBQUEsUUFBQSxDQUFBO0FBQ0EsR0F0Y0Y7QUF1ZEEsRUFBQSxPQUFBLEVBQUEsaUJBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxTQUFBLEVBQUEsUUFBQSxFQUFBLEtBQUEsRUFBQSxNQUFBLEVBQUEsS0FBQSxFQUFBLFFBQUEsRUFDQztBQUNDLFdBQUEsS0FBQSxPQUFBLENBQUEsd0JBQUEsU0FBQSxDQUFBLFlBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxrQkFBQSxHQUFBLFNBQUEsQ0FBQSxZQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsZ0JBQUEsR0FBQSxTQUFBLENBQUEsWUFBQSxDQUFBLFNBQUEsQ0FBQSxHQUFBLGVBQUEsR0FBQSxTQUFBLENBQUEsWUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLFlBQUEsR0FBQSxTQUFBLENBQUEsWUFBQSxDQUFBLEtBQUEsQ0FBQSxHQUFBLEdBQUEsSUFBQSxNQUFBLEdBQUEsVUFBQSxHQUFBLEVBQUEsS0FBQSxLQUFBLEdBQUEsU0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLFFBQUEsQ0FBQTtBQUNBLEdBMWRGO0FBdWVBLEVBQUEsVUFBQSxFQUFBLG9CQUFBLFNBQUEsRUFBQSxRQUFBLEVBQUEsS0FBQSxFQUFBLFFBQUEsRUFDQztBQUNDLFdBQUEsS0FBQSxPQUFBLENBQUEsNkJBQUEsU0FBQSxDQUFBLFlBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxlQUFBLEdBQUEsU0FBQSxDQUFBLFlBQUEsQ0FBQSxR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LE9BQUE7QUFZQSxNQUFBLFNBQUEsQ0FBQSxVQUFBLENBQUEsTUFBQSxFQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQTtBQUFBLFFBQUEsSUFBQSxFQUFBO0FBQUEsT0FBQSxFQUFBLElBQUEsQ0FBQSxZQUFBO0FBSUEsUUFBQSxDQUFBLENBQUEsdUNBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxVQUFBLENBQUEsRUFBQTtBQUVBLFVBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBO0FBQ0ssU0FITDtBQUtBLFFBQUEsQ0FBQSxDQUFBLHVDQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsVUFBQSxDQUFBLEVBQUE7QUFFQSxVQUFBLE9BQUEsQ0FBQSxZQUFBLENBQUEsQ0FBQTtBQUNLLFNBSEw7QUFLQSxRQUFBLENBQUEsQ0FBQSx1Q0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxFQUFBO0FBRUEsVUFBQSxPQUFBLENBQUEsZUFBQSxDQUFBLENBQUE7QUFDSyxTQUhMO0FBS0EsUUFBQSxDQUFBLENBQUEsdUNBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxVQUFBLENBQUEsRUFBQTtBQUVBLFVBQUEsT0FBQSxDQUFBLGVBQUEsQ0FBQSxDQUFBO0FBQ0ssU0FITDtBQUtBLFFBQUEsQ0FBQSxDQUFBLHVDQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsVUFBQSxDQUFBLEVBQUE7QUFFQSxVQUFBLE9BQUEsQ0FBQSxlQUFBLENBQUEsQ0FBQTtBQUNLLFNBSEw7QUFPQSxRQUFBLENBQUEsQ0FBQSw2RUFBQSxDQUFBLENBQUEsTUFBQSxDQUFBLFlBQUE7QUFFQSxjQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsdUNBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQTtBQUNLLGNBQU0sS0FBSyxHQUFHLENBQUEsQ0FBQSx1Q0FBQSxDQUFBLENBQTJDLEdBQTNDLEVBQWQ7QUFFTCxVQUFBLENBQUEsQ0FBQSx1Q0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsRUFBQSxpQkFBQSxDQUNLLEtBQUksQ0FBQSxNQUFKLEdBQUksQ0FBSixJQUFJLEtBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBSixJQUF3QyxLQUFNLEtBQUksS0FBbEQsR0FBa0QseUJBQWxELEdBQW9FLEVBRHpFO0FBR0ssU0FSTDtBQVVBLFFBQUEsQ0FBQSxDQUFBLDZFQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsWUFBQTtBQUVBLGNBQUEsS0FBQSxHQUFBLENBQUEsQ0FBQSx1Q0FBQSxDQUFBLENBQUEsR0FBQSxFQUFBO0FBQ0ssY0FBTSxLQUFLLEdBQUcsQ0FBQSxDQUFBLHVDQUFBLENBQUEsQ0FBMkMsR0FBM0MsRUFBZDtBQUVMLFVBQUEsQ0FBQSxDQUFBLHVDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLGlCQUFBLENBQ0ssS0FBSSxDQUFBLE1BQUosR0FBSSxDQUFKLElBQUksS0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFKLElBQXdDLEtBQU0sS0FBSSxLQUFsRCxHQUFrRCx5QkFBbEQsR0FBb0UsRUFEekU7QUFHSyxTQVJMO0FBV0ksT0FwREo7QUF3REEsTUFBQSxNQUFBLENBQUEsZ0JBQUEsQ0FBQSxTQUFBLEVBQUEsVUFBQSxDQUFBLEVBQUE7QUFFQSxZQUFBLE9BQUEsQ0FBQSxPQUFBLENBQUEsR0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLEVBQ0k7QUFDQyxjQUFBLElBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLElBQUE7QUFDQSxjQUFNLElBQUksR0FBRyxDQUFDLENBQUMsSUFBRixDQUFPLElBQXBCOztBQUVMLGNBQUEsSUFBQSxJQUFBLElBQUEsRUFDSztBQUNDLFlBQUEsT0FBQSxDQUFBLFdBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQTtBQUNBOztBQUVOLFVBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxLQUFBO0FBQ0s7QUFFTCxPQWZBLEVBZUEsS0FmQTtBQW1CQSxVQUFBLFFBQUEsR0FBQSxTQUFBLENBQUEsSUFBQSxDQUFBLFVBQUEsS0FBQSxFQUFBO0FBSUEsTUFBQSxXQUFBLENBQUEsWUFBQTtBQUVBLFlBQUEsU0FBQSxDQUFBLFFBQUEsRUFDSTtBQUNDLFVBQUEsVUFBQSxDQUFBLFNBQUEsR0FBQSxJQUFBLENBQUEsVUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO0FBRUwsWUFBQSxTQUFBLENBQUEsSUFBQTtBQUFBLFlBQUEsU0FBQSxDQUFBLEtBQUEsQ0FBQSxPQUFBLEVBQUEsSUFBQTtBQUVBLFdBSkssRUFJTCxJQUpLLENBSUwsVUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxRQUFBLEVBQUEsWUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUE7QUFFQSxnQkFBQSxDQUFBLFFBQUEsQ0FBQSxPQUFBLElBQUEsRUFBQSxPQUFBLFFBQUEsQ0FBQSxTQUFBLElBQUEsRUFBQSxDQUFBLEVBQ007QUFDQyxjQUFBLE9BQUEsQ0FBQSxPQUFBLENBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxZQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUE7QUFDQTtBQUNELFdBVkQ7QUFXQTtBQUVMLE9BakJBLEVBaUJBLEtBQUEsSUFqQkEsQ0FBQTtBQXFCQSxNQUFBLFVBQUEsQ0FBQSxTQUFBLEdBQUEsSUFBQSxDQUFBLFVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsUUFBQSxFQUFBLFlBQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBO0FBRUEsUUFBQSxPQUFBLENBQUEsT0FBQSxDQUFBLFFBQUEsRUFBQSxRQUFBLEVBQUEsWUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUEsTUFBQSxDQUFBLFlBQUE7QUFFQSxVQUFBLE1BQUEsQ0FBQSxNQUFBLENBQUEsT0FBQTtBQUNLLFNBSEw7QUFLQSxPQVBBLEVBT0EsSUFQQSxDQU9BLFVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsUUFBQSxFQUFBLFlBQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBO0FBRUEsUUFBQSxrQkFBQSxDQUFBLFNBQUEsQ0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBLEVBQUEsWUFBQTtBQUVBLFVBQUEsU0FB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QUFBLEVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLG9CQUFBO0FBQUEsaUJBQUEsRUFBQTtBQUFBLGtCQUFBLElBQUE7QUFBQSxrQkFBQTtBQUFBLEtBQUE7QUFBQSxHQUFBLEVBQUE7QUFBQSxZQUFBLGVBQUE7QUFBQSxZQUFBLHdCQUFBO0FBQUEsY0FBQSxDQUFBO0FBQUEsY0FBQSxPQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSxvQkFBQTtBQUFBLGlCQUFBLEVBQUE7QUFBQSxrQkFBQSxFQUFBO0FBQUEsa0JBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLG9CQUFBO0FBQUEsaUJBQUEsRUFBQTtBQUFBLGtCQUFBLElBQUE7QUFBQSxrQkFBQTtBQUFBLEtBQUE7QUFBQSxHQUFBLEVBQUE7QUFBQSxZQUFBLFdBQUE7QUFBQSxZQUFBLG9CQUFBO0FBQUEsY0FBQSxDQUFBO0FBQUEsY0FBQSxPQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSxnQkFBQTtBQUFBLGlCQUFBLEVBQUE7QUFBQSxrQkFBQSxFQUFBO0FBQUEsa0JBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLGdCQUFBO0FBQUEsaUJBQUEsRUFBQTtBQUFBLGtCQUFBLElBQUE7QUFBQSxrQkFBQTtBQUFBLEtBQUE7QUFBQSxHQUFBLENBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsWUFBQSxXQUFBO0FBQUEsWUFBQSwrQkFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxjQUFBLGNBQUE7QUFBQSxjQUFBLDJCQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxjQUFBO0FBQUEsY0FBQSxxQkFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsY0FBQTtBQUFBLGNBQUEscUJBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLHdDQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSxrREFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsZ0JBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLHdCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGFBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFdBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLDRCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsV0FBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsT0FBQTtBQUFBLGNBQUEsb0RBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLG9CQUFBO0FBQUEsY0FBQSw0QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGNBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxpQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEscUJBQUE7QUFBQSxjQUFBLG1DQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsY0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGlCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQTtBQUFBLEdBQUEsRUFBQTtBQUFBLFlBQUEsV0FBQTtBQUFBLFlBQUEsMEJBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLE1BQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxNQUFBO0FBQUEsY0FBQSxnQkFBQTtBQUFBLGNBQUE7QUFBQSxLQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSx3REFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsc0ZBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLDRDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsc0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLDhDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsb0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGNBQUE7QUFBQSxjQUFBLHlEQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsc0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGNBQUE7QUFBQSxjQUFBLDJEQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsb0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGNBQUE7QUFBQSxjQUFBLHlEQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsc0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGNBQUE7QUFBQSxjQUFBLDJEQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsb0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLDJDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsc0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLDZDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsb0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGNBQUE7QUFBQSxjQUFBLDZCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsb0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGNBQUE7QUFBQSxjQUFBLDZCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsb0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGVBQUE7QUFBQSxjQUFBLDZDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLENBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSxpQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsUUFBQSxDQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsaUNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLENBQUEsT0FBQSxFQUFBLFFBQUEsQ0FBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLGlDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLENBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxVQUFBO0FBQUEsY0FBQSxnQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsUUFBQSxDQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsaUNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLENBQUEsT0FBQSxFQUFBLFFBQUEsQ0FBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLGlDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLENBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSxpQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsUUFBQSxDQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsMkdBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxxQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsdURBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGFBQUE7QUFBQSxjQUFBLCtHQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEscUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHVEQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSw4R0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHFCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSx1REFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEseUZBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxpQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBO0FBQUEsZ0JBQUEsZ0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSx5QkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsa0ZBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsTUFBQTtBQUFBLGNBQUEsMkJBQUE7QUFBQSxnQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsNkJBQUE7QUFBQSxnQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsd0JBQUE7QUFBQSxnQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsd0JBQUE7QUFBQSxnQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsVUFBQTtBQUFBLGNBQUEsOEdBQUE7QUFBQSxnQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsK0dBQUE7QUFBQSxnQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsTUFBQTtBQUFBLGNBQUEseUJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLENBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQTtBQUFBLGdCQUFBLGFBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSwyQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSwyQkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBO0FBQUEsZ0JBQUEsYUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLDJDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLDJCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxDQUFBLFFBQUEsRUFBQSxPQUFBLENBQUE7QUFBQSxnQkFBQSxhQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsMkNBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsT0FBQTtBQUFBLGNBQUEsMEJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLENBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQTtBQUFBLGdCQUFBLGFBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSwyQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxPQUFBO0FBQUEsY0FBQSxrQkFBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxnQkFBQTtBQUFBLGNBQUEsMEJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxPQUFBO0FBQUEsY0FBQSw0QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLG1TQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGFBQUE7QUFBQSxjQUFBLGdDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsMkJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsZUFBQTtBQUFBLGNBQUEsaUNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLHFCQUFBO0FBQUEsY0FBQSw2Q0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSx1QkFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLGlCQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsZ0JBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSwwQkFBQTtBQUFBLGNBQUEsZ0RBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsdUJBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxpQkFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLGdCQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSwwQkFBQTtBQUFBLGNBQUEsZ0VBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxJQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsZ0JBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSwrQkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLEdBQUE7QUFBQSxnQkFBQSxlQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGlCQUFBO0FBQUEsY0FBQSx1QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxlQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLDZEQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLGlCQUFBO0FBQUEsZ0JBQUEsR0FBQTtBQUFBLGdCQUFBLGtFQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxDQUFBO0FBQUEsY0FBQSxDQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSw4RUFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsbUZBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBO0FBQUEsR0FBQSxFQUFBO0FBQUEsWUFBQSxZQUFBO0FBQUEsWUFBQSwyQkFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxjQUFBLFVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQTtBQUFBLEtBQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLHlCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsYUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHdGQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSwyQkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxjQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLHdCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLFVBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsd0JBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsY0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSx3QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxjQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLGlCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGNBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsV0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxnQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxXQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsZ0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxxQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSxpQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxXQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGdCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsZUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFdBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsOEJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSw2QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUE7QUFBQSxHQUFBLEVBQUE7QUFBQSxZQUFBLFVBQUE7QUFBQSxZQUFBLGtDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsMkJBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGFBQUE7QUFBQSxjQUFBLGdDQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxpQkFBQTtBQUFBLGNBQUEsb0NBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLDJDQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSxxQ0FBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsdUJBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFVBQUE7QUFBQSxjQUFBLHFCQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxhQUFBO0FBQUEsY0FBQSxvQkFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsb0JBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9B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QUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsd0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLDhHQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEscUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHdDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSx5Q0FBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxVQUFBO0FBQUEsY0FBQSxvQ0FBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQTtBQUFBLEdBQUEsRUFBQTtBQUFBLFlBQUEsYUFBQTtBQUFBLFlBQUEsbUNBQUE7QUFBQSxrQkFBQSxFQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLGlEQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxHQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSxrREFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsR0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsd0JBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLEdBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFVBQUE7QUFBQSxjQUFBLHlCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxHQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQTtBQUFBLEdBQUEsQ0FBQTtBQUFBLGFBQUEsQ0FBQTtBQUFBLFlBQUEsYUFBQTtBQUFBLFlBQUEsdUJBQUE7QUFBQSxrQkFBQSxDQUFBLGNBQUEsQ0FBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxtQkFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLDRCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLElBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsK0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGFBQUE7QUFBQSxjQUFBLDJHQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEscUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHdDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxhQUFBO0FBQUEsY0FBQSwrR0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHFCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSx3Q0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsOEdBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxxQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsd0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLHlDQUFBO0FBQUEsZ0JBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFVBQUE7QUFBQSxjQUFBLG9DQUFBO0FBQUEsZ0JBQUE7QUFBQSxLQUFBO0FBQUEsR0FBQSxFQUFBO0FBQUEsWUFBQSxZQUFBO0FBQUEsWUFBQSwrQkFBQTtBQUFBLGtCQUFBLENBQUEsYUFBQSxDQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLG1CQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxLQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsaURBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLEdBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLGtEQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxHQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSx3QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsR0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsVUFBQTtBQUFBLGNBQUEseUJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLEdBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBO0FBQUEsR0FBQTtBQUFBLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEFNSSBUd2lnIEVuZ2luZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC17e1lFQVJ9fSBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG52YXIgYW1pVHdpZyA9IHtcblx0dmVyc2lvbjogJzEuMS4wJ1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBleHBvcnRzLmFtaVR3aWcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pZih0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpXG57XG5cdGFtaVR3aWcuZnMgPSByZXF1aXJlKCdmcycpO1xuXG5cdG1vZHVsZS5leHBvcnRzLmFtaVR3aWcgPSBhbWlUd2lnO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy50b2tlbml6ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50b2tlbml6ZXIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dG9rZW5pemU6IGZ1bmN0aW9uKGNvZGUsIGxpbmUsIHNwYWNlcywgdG9rZW5EZWZzLCB0b2tlblR5cGVzLCBlcnJvcilcblx0e1xuXHRcdGlmKHRva2VuRGVmcy5sZW5ndGggIT09IHRva2VuVHlwZXMubGVuZ3RoKVxuXHRcdHtcblx0XHRcdHRocm93ICdgdG9rZW5EZWZzLmxlbmd0aCAhPSB0b2tlblR5cGVzLmxlbmd0aGAnO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlc3VsdF90b2tlbnMgPSBbXTtcblx0XHRjb25zdCByZXN1bHRfdHlwZXMgPSBbXTtcblx0XHRjb25zdCByZXN1bHRfbGluZXMgPSBbXTtcblxuXHRcdGxldCBpID0gMHgwMDAwMDAwMDA7XG5cdFx0Y29uc3QgbCA9IGNvZGUubGVuZ3RoO1xuXG5cdFx0bGV0IHdvcmQgPSAnJywgdG9rZW4sIGM7XG5cbl9fbDA6XHRcdHdoaWxlKGkgPCBsKVxuXHRcdHtcblx0XHRcdGMgPSBjb2RlLmNoYXJBdCgwKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBDT1VOVCBMSU5FUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihjID09PSAnXFxuJylcblx0XHRcdHtcblx0XHRcdFx0bGluZSsrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVBVCBTUEFDRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHNwYWNlcy5pbmRleE9mKGMpID49IDApXG5cdFx0XHR7XG5cdFx0XHRcdGlmKHdvcmQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZihlcnJvcilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVzdWx0X3Rva2Vucy5wdXNoKHdvcmQpO1xuXHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcblx0XHRcdFx0XHR3b3JkID0gJyc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcoMSk7XG5cdFx0XHRcdGkgKz0gMTtcblxuXHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVBVCBSRUdFWEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGZvcihjb25zdCBqIGluIHRva2VuRGVmcylcblx0XHRcdHtcblx0XHRcdFx0dG9rZW4gPSB0aGlzLl9tYXRjaChjb2RlLCB0b2tlbkRlZnNbal0pO1xuXG5cdFx0XHRcdGlmKHRva2VuKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYod29yZClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZihlcnJvcilcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhyb3cgJ2ludmFsaWQgdG9rZW4gYCcgKyB3b3JkICsgJ2AnO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRcdFx0XHRyZXN1bHRfdHlwZXMucHVzaCgtMSk7XG5cdFx0XHRcdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcblx0XHRcdFx0XHRcdHdvcmQgPSAnJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2godG9rZW4pO1xuXHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKHRva2VuVHlwZXNbal0pO1xuXHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXG5cdFx0XHRcdFx0Y29kZSA9IGNvZGUuc3Vic3RyaW5nKHRva2VuLmxlbmd0aCk7XG5cdFx0XHRcdFx0aSArPSB0b2tlbi5sZW5ndGg7XG5cblx0XHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRUFUIFJFTUFJTklORyBDSEFSQUNURVJFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0d29yZCArPSBjO1xuXG5cdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcoMSk7XG5cdFx0XHRpICs9IDE7XG5cbi8qXHRcdFx0Y29udGludWUgX19sMDtcbiAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0aWYod29yZClcblx0XHR7XG5cdFx0XHRpZihlcnJvcilcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ2ludmFsaWQgdG9rZW4gYCcgKyB3b3JkICsgJ2AnO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRyZXN1bHRfdHlwZXMucHVzaCgtMSk7XG5cdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcbi8qXHRcdFx0d29yZCA9ICcnO1xuICovXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHR0b2tlbnM6IHJlc3VsdF90b2tlbnMsXG5cdFx0XHR0eXBlczogcmVzdWx0X3R5cGVzLFxuXHRcdFx0bGluZXM6IHJlc3VsdF9saW5lcyxcblx0XHR9O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X21hdGNoOiBmdW5jdGlvbihzLCBzdHJpbmdPclJlZ0V4cClcblx0e1xuXHRcdGxldCBtO1xuXG5cdFx0aWYoc3RyaW5nT3JSZWdFeHAgaW5zdGFuY2VvZiBSZWdFeHApXG5cdFx0e1xuXHRcdFx0bSA9IHMubWF0Y2goc3RyaW5nT3JSZWdFeHApO1xuXG5cdFx0XHRyZXR1cm4gbSAhPT0gbnVsbCAmJiB0aGlzLl9jaGVja05leHRDaGFyKHMsIC8qLSovbVswXS8qLSovKSA/IC8qLSovbVswXS8qLSovIDogbnVsbDtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdG0gPSBzLmluZGV4T2Yoc3RyaW5nT3JSZWdFeHApO1xuXG5cdFx0XHRyZXR1cm4gbSA9PT0gMHgwMCAmJiB0aGlzLl9jaGVja05leHRDaGFyKHMsIHN0cmluZ09yUmVnRXhwKSA/IHN0cmluZ09yUmVnRXhwIDogbnVsbDtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfYWxudW06IFtcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsXG5cdFx0MSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMSxcblx0XHQwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLFxuXHRcdDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRdLFxuXG5cdF9jaGVja05leHRDaGFyOiBmdW5jdGlvbihzLCB0b2tlbilcblx0e1xuXHRcdGNvbnN0IGxlbmd0aCA9IHRva2VuLmxlbmd0aDtcblxuXHRcdGNvbnN0IGNoYXJDb2RlMiA9IHMuY2hhckNvZGVBdChsZW5ndGggLSAwKTtcblx0XHRjb25zdCBjaGFyQ29kZTEgPSBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMSk7XG5cblx0XHRyZXR1cm4gaXNOYU4oY2hhckNvZGUyKVxuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0aGlzLl9hbG51bVtjaGFyQ29kZTJdID09PSAwXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHRoaXMuX2FsbnVtW2NoYXJDb2RlMV0gPT09IDBcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIgPSB7fTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIudG9rZW5zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIudG9rZW5zID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQ09NUE9TSVRFIFRPS0VOUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuSVNfWFhYID0gW1xuXHRcdFx0dGhpcy5ERUZJTkVELFxuXHRcdFx0dGhpcy5OVUxMLFxuXHRcdFx0dGhpcy5FTVBUWSxcblx0XHRcdHRoaXMuSVRFUkFCTEUsXG5cdFx0XHR0aGlzLkVWRU4sXG5cdFx0XHR0aGlzLk9ERCxcblx0XHRdO1xuXG5cdFx0dGhpcy5YWFhfV0lUSCA9IFtcblx0XHRcdHRoaXMuU1RBUlRTX1dJVEgsXG5cdFx0XHR0aGlzLkVORFNfV0lUSCxcblx0XHRdO1xuXG5cdFx0dGhpcy5QTFVTX01JTlVTID0gW1xuXHRcdFx0dGhpcy5DT05DQVQsXG5cdFx0XHR0aGlzLlBMVVMsXG5cdFx0XHR0aGlzLk1JTlVTLFxuXHRcdF07XG5cblx0XHR0aGlzLk1VTF9GTERJVl9ESVZfTU9EID0gW1xuXHRcdFx0dGhpcy5NVUwsXG5cdFx0XHR0aGlzLkZMRElWLFxuXHRcdFx0dGhpcy5ESVYsXG5cdFx0XHR0aGlzLk1PRCxcblx0XHRdO1xuXG5cdFx0dGhpcy5SWCA9IFtcblx0XHRcdHRoaXMuUlAsXG5cdFx0XHR0aGlzLlJCMSxcblx0XHRdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFJFQUwgVE9LRU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0TE9HSUNBTF9PUjogMTAwLFxuXHRMT0dJQ0FMX0FORDogMTAxLFxuXHRCSVRXSVNFX09SOiAxMDIsXG5cdEJJVFdJU0VfWE9SOiAxMDMsXG5cdEJJVFdJU0VfQU5EOiAxMDQsXG5cdE5PVDogMTA1LFxuXHRJUzogMTA2LFxuXHRERUZJTkVEOiAxMDcsXG5cdE5VTEw6IDEwOCxcblx0RU1QVFk6IDEwOSxcblx0SVRFUkFCTEU6IDExMCxcblx0RVZFTjogMTExLFxuXHRPREQ6IDExMixcblx0Q01QX09QOiAxMTMsXG5cdFNUQVJUU19XSVRIOiAxMTQsXG5cdEVORFNfV0lUSDogMTE1LFxuXHRNQVRDSEVTOiAxMTYsXG5cdElOOiAxMTcsXG5cdFJBTkdFOiAxMTgsXG5cdENPTkNBVDogMTE5LFxuXHRQTFVTOiAxMjAsXG5cdE1JTlVTOiAxMjEsXG5cdFBPV0VSOiAxMjIsXG5cdE1VTDogMTIzLFxuXHRGTERJVjogMTI0LFxuXHRESVY6IDEyNSxcblx0TU9EOiAxMjYsXG4gXHRET1VCTEVfUVVFU1RJT046IDEyNyxcbiBcdFFVRVNUSU9OOiAxMjgsXG5cdENPTE9OOiAxMjksXG5cdERPVDogMTMwLFxuXHRDT01NQTogMTMxLFxuXHRQSVBFOiAxMzIsXG5cdExQOiAxMzMsXG5cdFJQOiAxMzQsXG5cdExCMTogMTM1LFxuXHRSQjE6IDEzNixcblx0TEIyOiAxMzcsXG5cdFJCMjogMTM4LFxuXHRTSUQ6IDEzOSxcblx0VEVSTUlOQUw6IDE0MCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBWSVJUVUFMIFRPS0VOUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdExTVDogMjAwLFxuXHRESUM6IDIwMSxcblx0RlVOOiAyMDIsXG5cdFZBUjogMjAzLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLnRva2Vucy4kaW5pdCgpO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5Ub2tlbml6ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ub2tlbml6ZXIgPSBmdW5jdGlvbihjb2RlLCBsaW5lKSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fc3BhY2VzID0gWycgJywgJ1xcdCcsICdcXG4nLCAnXFxyJ107XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLl90b2tlbkRlZnMgPSBbXG5cdFx0J29yJyxcblx0XHQnYW5kJyxcblx0XHQnYi1vcicsXG5cdFx0J2IteG9yJyxcblx0XHQnYi1hbmQnLFxuXHRcdCdub3QnLFxuXHRcdCdpcycsXG5cdFx0J2RlZmluZWQnLFxuXHRcdCdudWxsJyxcblx0XHQnZW1wdHknLFxuXHRcdCdpdGVyYWJsZScsXG5cdFx0J2V2ZW4nLFxuXHRcdCdvZGQnLFxuXHRcdCc9PT0nLFxuXHRcdCc9PScsXG5cdFx0JyE9PScsXG5cdFx0JyE9Jyxcblx0XHQnPD0nLFxuXHRcdCc+PScsXG5cdFx0JzwnLFxuXHRcdCc+Jyxcblx0XHQvXnN0YXJ0c1xccyt3aXRoLyxcblx0XHQvXmVuZHNcXHMrd2l0aC8sXG5cdFx0J21hdGNoZXMnLFxuXHRcdCdpbicsXG5cdFx0Jy4uJyxcblx0XHQnficsXG5cdFx0JysnLFxuXHRcdCctJyxcblx0XHQnKionLFxuXHRcdCcqJyxcblx0XHQnLy8nLFxuXHRcdCcvJyxcblx0XHQnJScsXG5cdFx0Jz8/Jyxcblx0XHQnPycsXG5cdFx0JzonLFxuXHRcdCcuJyxcblx0XHQnLCcsXG5cdFx0J3wnLFxuXHRcdCcoJyxcblx0XHQnKScsXG5cdFx0J1snLFxuXHRcdCddJyxcblx0XHQneycsXG5cdFx0J30nLFxuXHRcdCd0cnVlJyxcblx0XHQnZmFsc2UnLFxuXHRcdC9eWzAtOV0rXFwuWzAtOV0rLyxcblx0XHQvXlswLTldKy8sXG5cdFx0L14nKFxcXFwnfFteJ10pKicvLFxuXHRcdC9eXCIoXFxcXFwifFteXCJdKSpcIi8sXG5cdFx0L15bYS16QS1aXyRdW2EtekEtWjAtOV8kXSovLFxuXHRdO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fdG9rZW5UeXBlcyA9IFtcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX1hPUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5ELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTk9ULFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ERUZJTkVELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTlVMTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkVNUFRZLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSVRFUkFCTEUsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FVkVOLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuT0RELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuU1RBUlRTX1dJVEgsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FTkRTX1dJVEgsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NQVRDSEVTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSU4sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQU5HRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTkNBVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NSU5VUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBPV0VSLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTVVMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRkxESVYsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ESVYsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NT0QsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ET1VCTEVfUVVFU1RJT04sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5RVUVTVElPTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTE9OLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRE9ULFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ09NTUEsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5QSVBFLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTFAsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxCMSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJCMSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxCMixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJCMixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlNJRCxcblx0XTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuJGluaXQgPSBmdW5jdGlvbihjb2RlLCBsaW5lKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgcmVzdWx0ID0gYW1pVHdpZy50b2tlbml6ZXIudG9rZW5pemUoXG5cdFx0XHRjb2RlLFxuXHRcdFx0bGluZSxcblx0XHRcdHRoaXMuX3NwYWNlcyxcblx0XHRcdHRoaXMuX3Rva2VuRGVmcyxcblx0XHRcdHRoaXMuX3Rva2VuVHlwZXMsXG5cdFx0XHR0cnVlXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMudG9rZW5zID0gcmVzdWx0LnRva2Vucztcblx0XHR0aGlzLnR5cGVzID0gcmVzdWx0LnR5cGVzO1xuXG5cdFx0dGhpcy5pID0gMDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMubmV4dCA9IGZ1bmN0aW9uKG4gPSAxKVxuXHR7XG5cdFx0dGhpcy5pICs9IG47XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLmlzRW1wdHkgPSBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pID49IHRoaXMudG9rZW5zLmxlbmd0aDtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMucGVla1Rva2VuID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudG9rZW5zW3RoaXMuaV07XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLnBlZWtUeXBlID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudHlwZXNbdGhpcy5pXTtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuY2hlY2tUeXBlID0gZnVuY3Rpb24odHlwZSlcblx0e1xuXHRcdGlmKHRoaXMuaSA8IHRoaXMudG9rZW5zLmxlbmd0aClcblx0XHR7XG5cdFx0XHRjb25zdCBUWVBFID0gdGhpcy50eXBlc1t0aGlzLmldO1xuXG5cdFx0XHRyZXR1cm4gKHR5cGUgaW5zdGFuY2VvZiBBcnJheSkgPyAodHlwZS5pbmRleE9mKFRZUEUpID49IDApIDogKHR5cGUgPT09IFRZUEUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuJGluaXQoY29kZSwgbGluZSk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLkNvbXBpbGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLkNvbXBpbGVyID0gZnVuY3Rpb24oY29kZSwgbGluZSkge1xuXG5cdHRoaXMuJGluaXQoY29kZSwgbGluZSk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLkNvbXBpbGVyLnByb3RvdHlwZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24oY29kZSwgbGluZSlcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMudG9rZW5pemVyID0gbmV3IGFtaVR3aWcuZXhwci5Ub2tlbml6ZXIoXG5cdFx0XHR0aGlzLmNvZGUgPSBjb2RlLFxuXHRcdFx0dGhpcy5saW5lID0gbGluZVxuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnJvb3ROb2RlID0gdGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5pc0VtcHR5KCkgPT09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgdW5leHBlY3RlZCB0b2tlbiBgJyArIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpICsgJ2AnO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGR1bXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnJvb3ROb2RlLmR1bXAoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTnVsbENvYWxlc2Npbmc6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUxvZ2ljYWxPcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBOdWxsQ29hbGVzY2luZyA6IExvZ2ljYWxPciAoJz8/JyBMb2dpY2FsT3IpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuRE9VQkxFX1FVRVNUSU9OKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTG9naWNhbE9yKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUxvZ2ljYWxPcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTG9naWNhbEFuZCgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBMb2dpY2FsT3IgOiBMb2dpY2FsQW5kICgnb3InIExvZ2ljYWxBbmQpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUxvZ2ljYWxBbmQoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTG9naWNhbEFuZDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQml0d2lzZU9yKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIExvZ2ljYWxBbmQgOiBCaXR3aXNlT3IgKCdhbmQnIEJpdHdpc2VPcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUJpdHdpc2VPcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VCaXR3aXNlT3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VYb3IoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQml0d2lzZU9yIDogQml0d2lzZVhvciAoJ2Itb3InIEJpdHdpc2VYb3IpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfT1IpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VCaXR3aXNlWG9yKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VYb3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VBbmQoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQml0d2lzZVhvciA6IEJpdHdpc2VBbmQgKCdiLXhvcicgQml0d2lzZUFuZCkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfWE9SKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQml0d2lzZUFuZCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VCaXR3aXNlQW5kOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VOb3QoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQml0d2lzZUFuZCA6IE5vdCAoJ2ItYW5kJyBOb3QpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5EKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTm90KCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU5vdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE5vdCA6ICdub3QnIENvbXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5OT1QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VDb21wKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBudWxsO1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICB8IENvbXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gdGhpcy5wYXJzZUNvbXAoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQ29tcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQWRkU3ViKCksIHJpZ2h0LCBub2RlLCBzd2FwO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIENvbXAgOiBBZGRTdWIgJ2lzJyAnbm90Jz8gKCdkZWZpbmVkJyB8ICdudWxsJyB8IC4uLikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQvKiovIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLklTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0Lyogc3dhcCAnaXMnIGFuZCAnbm90JyAqL1xuXHRcdFx0c3dhcCA9IG5vZGU7XG5cdFx0XHQvKiBzd2FwICdpcycgYW5kICdub3QnICovXG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkpXG5cdFx0XHR7XG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZS5ub2RlTGVmdCA9IG51bGw7XG5cdFx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gc3dhcDtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuSVNfWFhYKSlcblx0XHRcdHtcblx0XHRcdFx0cmlnaHQgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0c3dhcC5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRcdHN3YXAubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwga2V5d29yZCBgZGVmaW5lZGAsIGBudWxsYCwgYGVtcHR5YCwgYGl0ZXJhYmxlYCwgYGV2ZW5gIG9yIGBvZGRgIGV4cGVjdGVkJztcblx0XHRcdH1cblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgKCc9PT0nIHwgJz09JyB8IC4uLikgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICgnc3RhcnRzJyB8ICdlbmRzJykgYHdpdGhgIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5YWFhfV0lUSCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICdtYXRjaGVzJyBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5NQVRDSEVTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgJ2luJyBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLklOKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQWRkU3ViOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VNdWxEaXYoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQWRkU3ViIDogTXVsRGl2ICgoJysnIHwgJy0nKSBNdWxEaXYpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVNfTUlOVVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VNdWxEaXYoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTXVsRGl2OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VQbHVzTWludXMoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTXVsRGl2IDogUGx1c01pbnVzICgoJyonIHwgJy8vJyB8ICcvJyB8ICclJykgUGx1c01pbnVzKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk1VTF9GTERJVl9ESVZfTU9EKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlUGx1c01pbnVzKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVBsdXNNaW51czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFBsdXNNaW51cyA6ICgnLScgfCAnKycpIFBvd2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QTFVTX01JTlVTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlUG93ZXIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IG51bGw7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICAgICAgIHwgRG90MSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiB0aGlzLnBhcnNlUG93ZXIoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlUG93ZXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUZpbHRlcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBQb3dlciA6IEZpbHRlciAoJyoqJyBGaWx0ZXIpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVIpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VGaWx0ZXIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRmlsdGVyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VEb3QxKCksIG5vZGUsIHRlbXA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogRmlsdGVyIDogRG90MSAoJ3wnIERvdDEpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBJUEUpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0bm9kZSA9IHRoaXMucGFyc2VEb3QxKHRydWUpO1xuXG5cdFx0XHRmb3IodGVtcCA9IG5vZGU7IHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuRE9UOyB0ZW1wID0gdGVtcC5ub2RlTGVmdCk7XG5cblx0XHRcdHRlbXAubGlzdC51bnNoaWZ0KGxlZnQpO1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRG90MTogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRjb25zdCBub2RlID0gdGhpcy5wYXJzZURvdDIoaXNGaWx0ZXIpO1xuXG5cdFx0aWYobm9kZSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGV0IHRlbXAgPSBub2RlO1xuXG5cdFx0XHRmb3IoOyB0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDsgdGVtcCA9IHRlbXAubm9kZUxlZnQpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGVtcC5xKVxuXHRcdFx0e1xuXHRcdFx0XHQvKiovIGlmKHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuRlVOKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYodGVtcC5ub2RlVmFsdWUgaW4gYW1pVHdpZy5zdGRsaWIpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAnYW1pVHdpZy5zdGRsaWIuJyArIHRlbXAubm9kZVZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAvKi0tLSovJ18uJy8qLS0tKi8gKyB0ZW1wLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZih0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRlbXAubm9kZVZhbHVlID0gLyotLS0qLydfLicvKi0tLSovICsgdGVtcC5ub2RlVmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0ZW1wLnEgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5vZGU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDI6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlRG90Myhpc0ZpbHRlciksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIERvdDIgOiBEb3QzICgnLicgRG90MykqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5ET1QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgJy4nKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlRG90Myhpc0ZpbHRlcik7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDM6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlWChpc0ZpbHRlciksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIERvdDMgOiBYICgnWycgTnVsbENvYWxlc2NpbmcgJ10nKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MQjEpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIxKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoYW1pVHdpZy5leHByLnRva2Vucy5ET1QsICdbXScpO1xuXG5cdFx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGBdYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgICAgfCBYICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlWDogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBYIDogR3JvdXAgfCBBcnJheSB8IE9iamVjdCB8IEZ1blZhciB8IFRlcm1pbmFsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlR3JvdXAoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZUFycmF5KCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VPYmplY3QoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZUZ1blZhcihpc0ZpbHRlcikpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VUZXJtaW5hbCgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFNZTlRBWCBFUlJPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIHN5bnRheCBlcnJvciBvciB0dW5jYXRlZCBleHByZXNzaW9uJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlR3JvdXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEdyb3VwIDogJygnIE51bGxDb2FsZXNjaW5nICcpJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MUCkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRub2RlID0gdGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJQKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGApYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUFycmF5OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbm9kZSwgbGlzdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBBcnJheSA6ICdbJyBTaW5nbGV0cyAnXScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIxKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGxpc3QgPSB0aGlzLl9wYXJzZVNpbmdsZXRzKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMSkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKGFtaVR3aWcuZXhwci50b2tlbnMuTFNULCAnQXJyYXknKTtcblxuXHRcdFx0XHRub2RlLmxpc3QgPSBsaXN0O1xuXG5cdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGBdYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU9iamVjdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGUsIGRpY3Q7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogT2JqZWN0IDogJ3snIERvdWJsZXRzICd9JyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxCMikpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRkaWN0ID0gdGhpcy5fcGFyc2VEb3VibGV0cygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjIpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkRJQywgJ09iamVjdCcpO1xuXG5cdFx0XHRcdG5vZGUuZGljdCA9IGRpY3Q7XG5cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYH1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRnVuVmFyOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuU0lEKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKDAsIGlzRmlsdGVyID8gJ2ZpbHRlcl8nICsgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkgOiB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cblx0XHRcdG5vZGUucSA9IHRydWU7XG5cblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGdW5WYXIgOiBTSUQgJygnIFNpbmdsZXRzICcpJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQvKiovIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxQKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUubGlzdCA9IHRoaXMuX3BhcnNlU2luZ2xldHMoKTtcblxuXHRcdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SUCkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0XHRub2RlLm5vZGVUeXBlID0gYW1pVHdpZy5leHByLnRva2Vucy5GVU47XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgKWAgZXhwZWN0ZWQnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogICAgICAgIHwgU0lEICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlLm5vZGVUeXBlID0gaXNGaWx0ZXIgPyBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTlxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgOiBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUlxuXHRcdFx0XHQ7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gW107XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9wYXJzZVNpbmdsZXRzOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJYKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0dGhpcy5fcGFyc2VTaW5nbGV0KHJlc3VsdCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BKSA9PT0gdHJ1ZSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlRG91YmxldHM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IHt9O1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIyKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0dGhpcy5fcGFyc2VEb3VibGV0KHJlc3VsdCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BKSA9PT0gdHJ1ZSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlU2luZ2xldDogZnVuY3Rpb24ocmVzdWx0KVxuXHR7XG5cdFx0cmVzdWx0LnB1c2godGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCkpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlRG91YmxldDogZnVuY3Rpb24ocmVzdWx0KVxuXHR7XG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwpKVxuXHRcdHtcblx0XHRcdGNvbnN0IGtleSA9IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DT0xPTikpXG5cdFx0XHR7XG4vKlx0XHRcdFx0Y29uc3QgY29sb24gPSB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKTtcbiAqL1x0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmVzdWx0W2tleV0gPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGA6YCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIHRlcm1pbmFsIGV4cGVjdGVkJztcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVRlcm1pbmFsOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogVGVybWluYWwgOiBURVJNSU5BTCB8IFJBTkdFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMKSlcblx0XHR7XG5cdFx0XHRsZWZ0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UpKVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJpZ2h0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIGxlZnQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLk5vZGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLk5vZGUgPSBmdW5jdGlvbihub2RlVHlwZSwgbm9kZVZhbHVlKSB7XG5cblx0dGhpcy4kaW5pdChub2RlVHlwZSwgbm9kZVZhbHVlKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuTm9kZS5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKG5vZGVUeXBlLCBub2RlVmFsdWUpXG5cdHtcblx0XHR0aGlzLm5vZGVUeXBlID0gbm9kZVR5cGU7XG5cdFx0dGhpcy5ub2RlVmFsdWUgPSBub2RlVmFsdWU7XG5cdFx0dGhpcy5ub2RlTGVmdCA9IG51bGw7XG5cdFx0dGhpcy5ub2RlUmlnaHQgPSBudWxsO1xuXHRcdHRoaXMubGlzdCA9IG51bGw7XG5cdFx0dGhpcy5kaWN0ID0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9kdW1wOiBmdW5jdGlvbihub2RlcywgZWRnZXMsIHBDbnQpXG5cdHtcblx0XHRsZXQgQ05UO1xuXG5cdFx0Y29uc3QgY250ID0gcENudFswXTtcblxuXHRcdG5vZGVzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyBbbGFiZWw9XCInICsgdGhpcy5ub2RlVmFsdWUucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ1wiXTsnKTtcblxuXHRcdGlmKHRoaXMubm9kZUxlZnQpXG5cdFx0e1xuXHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJzsnKTtcblx0XHRcdHRoaXMubm9kZUxlZnQuX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHR9XG5cblx0XHRpZih0aGlzLm5vZGVSaWdodClcblx0XHR7XG5cdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnOycpO1xuXHRcdFx0dGhpcy5ub2RlUmlnaHQuX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHR9XG5cblx0XHRpZih0aGlzLmxpc3QpXG5cdFx0e1xuXHRcdFx0Zm9yKGNvbnN0IGkgaW4gdGhpcy5saXN0KVxuXHRcdFx0e1xuXHRcdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICcgW2xhYmVsPVwiWycgKyBpLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICddXCJdOycpO1xuXHRcdFx0XHR0aGlzLmxpc3RbaV0uX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZih0aGlzLmRpY3QpXG5cdFx0e1xuXHRcdFx0Zm9yKGNvbnN0IGkgaW4gdGhpcy5kaWN0KVxuXHRcdFx0e1xuXHRcdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICcgW2xhYmVsPVwiWycgKyBpLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICddXCJdOycpO1xuXHRcdFx0XHR0aGlzLmRpY3RbaV0uX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCBub2RlcyA9IFtdO1xuXHRcdGNvbnN0IGVkZ2VzID0gW107XG5cblx0XHR0aGlzLl9kdW1wKG5vZGVzLCBlZGdlcywgWzBdKTtcblxuXHRcdHJldHVybiAnZGlncmFwaCBhc3Qge1xcblxcdHJhbmtkaXI9VEI7XFxuJyArIG5vZGVzLmpvaW4oJ1xcbicpICsgJ1xcbicgKyBlZGdlcy5qb2luKCdcXG4nKSArICdcXG59Jztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcudG1wbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG1wbCA9IHt9O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcudG1wbC5Db21waWxlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG1wbC5Db21waWxlciA9IGZ1bmN0aW9uKHRtcGwpIHtcblxuXHR0aGlzLiRpbml0KHRtcGwpO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG1wbC5Db21waWxlci5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0U1RBVEVNRU5UX1JFOiAvXFx7JVxccyooW2EtekEtWl0rKVxccyooKD86LnxcXG4pKj8pXFxzKiVcXH0vLFxuXG5cdENPTU1FTlRfUkU6IC9cXHsjXFxzKigoPzoufFxcbikqPylcXHMqI1xcfS9nLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2NvdW50OiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0bGV0IHJlc3VsdCA9IDA7XG5cblx0XHRjb25zdCBsID0gcy5sZW5ndGg7XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSsrKVxuXHRcdHtcblx0XHRcdGlmKHNbaV0gPT09ICdcXG4nKSByZXN1bHQrKztcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKHRtcGwpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgbGluZSA9IDE7XG5cblx0XHRsZXQgY29sdW1uO1xuXHRcdGxldCBDT0xVTU47XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnJvb3ROb2RlID0ge1xuXHRcdFx0bGluZTogbGluZSxcblx0XHRcdGtleXdvcmQ6ICdAcm9vdCcsXG5cdFx0XHRleHByZXNzaW9uOiAnJyxcblx0XHRcdGJsb2NrczogW3tcblx0XHRcdFx0ZXhwcmVzc2lvbjogJ0B0cnVlJyxcblx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHR9XSxcblx0XHRcdHZhbHVlOiAnJyxcblx0XHR9O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3Qgc3RhY2sxID0gW3RoaXMucm9vdE5vZGVdO1xuXHRcdGNvbnN0IHN0YWNrMiA9IFsweDAwMDAwMDAwMDAwXTtcblxuXHRcdGxldCBpdGVtO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Zm9yKHRtcGwgPSB0bXBsLnJlcGxhY2UodGhpcy5DT01NRU5UX1JFLCAnJyk7OyB0bXBsID0gdG1wbC5zdWJzdHIoQ09MVU1OKSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgY3VyciA9IHN0YWNrMVtzdGFjazEubGVuZ3RoIC0gMV07XG5cdFx0XHQgbGV0ICBpbmR4ID0gc3RhY2syW3N0YWNrMi5sZW5ndGggLSAxXTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IG0gPSB0bXBsLm1hdGNoKHRoaXMuU1RBVEVNRU5UX1JFKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKG0gPT09IG51bGwpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGluZSArPSB0aGlzLl9jb3VudCh0bXBsKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaCh7XG5cdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRrZXl3b3JkOiAnQHRleHQnLFxuXHRcdFx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0dmFsdWU6IHRtcGwsXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgZXJyb3JzID0gW107XG5cblx0XHRcdFx0Zm9yKGxldCBpID0gc3RhY2sxLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvKiovIGlmKHN0YWNrMVtpXS5rZXl3b3JkID09PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGVycm9ycy5wdXNoKCdtaXNzaW5nIGtleXdvcmQgYGVuZGlmYCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmKHN0YWNrMVtpXS5rZXl3b3JkID09PSAnZm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0IFx0ZXJyb3JzLnB1c2goJ21pc3Npbmcga2V5d29yZCBgZW5kZm9yYCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGVycm9ycy5sZW5ndGggPiAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgJyArIGVycm9ycy5qb2luKCcsICcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IG1hdGNoID0gbVswXTtcblx0XHRcdGNvbnN0IGtleXdvcmQgPSBtWzFdO1xuXHRcdFx0Y29uc3QgZXhwcmVzc2lvbiA9IG1bMl07XG5cblx0XHRcdGNvbHVtbiA9IG0uaW5kZXggKyAweDAwMDAwMDAwMDA7XG5cdFx0XHRDT0xVTU4gPSBtLmluZGV4ICsgbWF0Y2gubGVuZ3RoO1xuXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHRtcGwuc3Vic3RyKDAsIGNvbHVtbik7XG5cdFx0XHRjb25zdCBWQUxVRSA9IHRtcGwuc3Vic3RyKDAsIENPTFVNTik7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsaW5lICs9IHRoaXMuX2NvdW50KFZBTFVFKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHZhbHVlKVxuXHRcdFx0e1xuXHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0a2V5d29yZDogJ0B0ZXh0Jyxcblx0XHRcdFx0XHRleHByZXNzaW9uOiAnJyxcblx0XHRcdFx0XHRibG9ja3M6IFtdLFxuXHRcdFx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHN3aXRjaChrZXl3b3JkKVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2ZsdXNoJzpcblx0XHRcdFx0Y2FzZSAnYXV0b2VzY2FwZSc6XG5cdFx0XHRcdGNhc2UgJ3NwYWNlbGVzcyc6XG5cdFx0XHRcdGNhc2UgJ3ZlcmJhdGltJzpcblxuXHRcdFx0XHRcdC8qIElHTk9SRSAqL1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdkbyc6XG5cdFx0XHRcdGNhc2UgJ3NldCc6XG5cdFx0XHRcdGNhc2UgJ2luY2x1ZGUnOlxuXG5cdFx0XHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0XHRrZXl3b3JkOiBrZXl3b3JkLFxuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogZXhwcmVzc2lvbixcblx0XHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0XHR2YWx1ZTogJycsXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaChpdGVtKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnaWYnOlxuXHRcdFx0XHRjYXNlICdmb3InOlxuXG5cdFx0XHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0XHRrZXl3b3JkOiBrZXl3b3JkLFxuXHRcdFx0XHRcdFx0YmxvY2tzOiBbe1xuXHRcdFx0XHRcdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHRcdH1dLFxuXHRcdFx0XHRcdFx0dmFsdWU6ICcnLFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrc1tpbmR4XS5saXN0LnB1c2goaXRlbSk7XG5cblx0XHRcdFx0XHRzdGFjazEucHVzaChpdGVtKTtcblx0XHRcdFx0XHRzdGFjazIucHVzaCgweDAwKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZWxzZWlmJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVsc2VpZmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGluZHggPSBjdXJyLmJsb2Nrcy5sZW5ndGg7XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrcy5wdXNoKHtcblx0XHRcdFx0XHRcdGV4cHJlc3Npb246IGV4cHJlc3Npb24sXG5cdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHN0YWNrMltzdGFjazIubGVuZ3RoIC0gMV0gPSBpbmR4O1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbHNlJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJ1xuXHRcdFx0XHRcdCAgICYmXG5cdFx0XHRcdFx0ICAgY3Vyclsna2V5d29yZCddICE9PSAnZm9yJ1xuXHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZWxzZWAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGluZHggPSBjdXJyLmJsb2Nrcy5sZW5ndGg7XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrcy5wdXNoKHtcblx0XHRcdFx0XHRcdGV4cHJlc3Npb246ICdAdHJ1ZScsXG5cdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHN0YWNrMltzdGFjazIubGVuZ3RoIC0gMV0gPSBpbmR4O1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbmRpZic6XG5cblx0XHRcdFx0XHRpZihjdXJyWydrZXl3b3JkJ10gIT09ICdpZicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbmRpZmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHN0YWNrMS5wb3AoKTtcblx0XHRcdFx0XHRzdGFjazIucG9wKCk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2VuZGZvcic6XG5cblx0XHRcdFx0XHRpZihjdXJyWydrZXl3b3JkJ10gIT09ICdmb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZW5kZm9yYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c3RhY2sxLnBvcCgpO1xuXHRcdFx0XHRcdHN0YWNrMi5wb3AoKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVua25vd24ga2V5d29yZCBgJyArIGtleXdvcmQgKyAnYCc7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZHVtcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMucm9vdE5vZGUsIG51bGwsIDIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5lbmdpbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5lbmdpbmUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0VkFSSUFCTEVfUkU6IC9cXHtcXHtcXHMqKC4qPylcXHMqXFx9XFx9L2csXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcmVuZGVyOiBmdW5jdGlvbihyZXN1bHQsIGl0ZW0sIGRpY3QgPSB7fSwgdG1wbHMgPSB7fSlcblx0e1xuXHRcdGxldCBtO1xuXG5cdFx0bGV0IGV4cHJlc3Npb247XG5cblx0XHR0aGlzLmRpY3QgPSBkaWN0O1xuXHRcdHRoaXMudG1wbHMgPSB0bXBscztcblxuXHRcdHN3aXRjaChpdGVtLmtleXdvcmQpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBETyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdkbyc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YW1pVHdpZy5leHByLmNhY2hlLmV2YWwoaXRlbS5leHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU0VUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnc2V0Jzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRtID0gaXRlbS5leHByZXNzaW9uLm1hdGNoKC8oW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccyo9XFxzKiguKykvKVxuXG5cdFx0XHRcdGlmKCFtKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBpbnZhbGlkIGBzZXRgIHN0YXRlbWVudCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGRpY3RbbVsxXV0gPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChtWzJdLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQFRFWFQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnQHRleHQnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW0udmFsdWUucmVwbGFjZSh0aGlzLlZBUklBQkxFX1JFLCBmdW5jdGlvbihtYXRjaCwgZXhwcmVzc2lvbikge1xuXG5cdFx0XHRcdFx0bGV0IHZhbHVlID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHRcdHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiAnJztcblx0XHRcdFx0fSkpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSUYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnaWYnOlxuXHRcdFx0Y2FzZSAnQHJvb3QnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGl0ZW0uYmxvY2tzLmV2ZXJ5KChibG9jaykgPT4ge1xuXG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IGJsb2NrLmV4cHJlc3Npb247XG5cblx0XHRcdFx0XHRpZihleHByZXNzaW9uID09PSAnQHRydWUnIHx8IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYmxvY2subGlzdClcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgYmxvY2subGlzdFtpXSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRk9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnZm9yJzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgc3ltMTtcblx0XHRcdFx0bGV0IHN5bTI7XG5cdFx0XHRcdGxldCBleHByO1xuXG5cdFx0XHRcdG0gPSBpdGVtLmJsb2Nrc1swXS5leHByZXNzaW9uLm1hdGNoKC8oW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccyosXFxzKihbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzK2luXFxzKyguKykvKVxuXG5cdFx0XHRcdGlmKCFtKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bSA9IGl0ZW0uYmxvY2tzWzBdLmV4cHJlc3Npb24ubWF0Y2goLyhbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzK2luXFxzKyguKykvKVxuXG5cdFx0XHRcdFx0aWYoIW0pXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBpbnZhbGlkIGBmb3JgIHN0YXRlbWVudCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzeW0xID0gbVsxXTtcblx0XHRcdFx0XHRcdHN5bTIgPSBudWxsO1xuXHRcdFx0XHRcdFx0ZXhwciA9IG1bMl07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHN5bTEgPSBtWzFdO1xuXHRcdFx0XHRcdHN5bTIgPSBtWzJdO1xuXHRcdFx0XHRcdGV4cHIgPSBtWzNdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBvcmlnVmFsdWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdGNvbnN0IHR5cGVOYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9yaWdWYWx1ZSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgaXRlclZhbHVlO1xuXG5cdFx0XHRcdGlmKHR5cGVOYW1lID09PSAnW29iamVjdCBPYmplY3RdJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGl0ZXJWYWx1ZSA9IHN5bTIgPyBPYmplY3QuZW50cmllcyhvcmlnVmFsdWUpXG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICA6IE9iamVjdC5rZXlzKG9yaWdWYWx1ZSlcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aXRlclZhbHVlID0gb3JpZ1ZhbHVlO1xuXG5cdFx0XHRcdFx0aWYodHlwZU5hbWUgIT09ICdbb2JqZWN0IEFycmF5XSdcblx0XHRcdFx0XHQgICAmJlxuXHRcdFx0XHRcdCAgIHR5cGVOYW1lICE9PSAnW29iamVjdCBTdHJpbmddJ1xuXHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgcmlnaHQgb3BlcmFuZGUgbm90IGl0ZXJhYmxlJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZihzeW0yKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgcmlnaHQgb3BlcmFuZGUgbm90IGFuIG9iamVjdCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBsID0gaXRlclZhbHVlLmxlbmd0aDtcblxuXHRcdFx0XHRpZihsID4gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxldCBrID0gMHgwMDAwMDAwMDAwMDAwMDtcblxuXHRcdFx0XHRcdGNvbnN0IGxpc3QgPSBpdGVtLmJsb2Nrc1swXS5saXN0O1xuXG5cdFx0XHRcdFx0aWYoc3ltMilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMSA9IGRpY3RbKHN5bTEpXTtcblx0XHRcdFx0XHRcdGNvbnN0IG9sZDIgPSBkaWN0WyhzeW0yKV07XG5cdFx0XHRcdFx0XHRjb25zdCBvbGQzID0gZGljdFsnbG9vcCddO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGljdC5sb29wID0ge2xlbmd0aDogbCwgcGFyZW50OiBkaWN0Wydsb29wJ119O1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Zm9yKGNvbnN0IFtrZXksIHZhbF0gb2YgaXRlclZhbHVlKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRkaWN0W3N5bTFdID0ga2V5O1xuXHRcdFx0XHRcdFx0XHRkaWN0W3N5bTJdID0gdmFsO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5maXJzdCA9IChrID09PSAoMCAtIDApKTtcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmxhc3QgPSAoayA9PT0gKGwgLSAxKSk7XG5cblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4MCA9IGwgLSBrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXgwID0gaztcblx0XHRcdFx0XHRcdFx0aysrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AucmV2aW5kZXggPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4ID0gaztcblxuXHRcdFx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBsaXN0KVxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbGlzdFtqXSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkaWN0Wydsb29wJ10gPSBvbGQzO1xuXHRcdFx0XHRcdFx0ZGljdFsoc3ltMildID0gb2xkMjtcblx0XHRcdFx0XHRcdGRpY3RbKHN5bTEpXSA9IG9sZDE7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNvbnN0IG9sZDEgPSBkaWN0WyhzeW0xKV07XG5cdFx0XHRcdFx0XHRjb25zdCBvbGQyID0gZGljdFsnbG9vcCddO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGljdC5sb29wID0ge2xlbmd0aDogbCwgcGFyZW50OiBkaWN0Wydsb29wJ119O1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Zm9yKGNvbnN0IHZhbCBvZiBpdGVyVmFsdWUpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGRpY3Rbc3ltMV0gPSB2YWw7XG5cblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmZpcnN0ID0gKGsgPT09ICgwIC0gMCkpO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AubGFzdCA9IChrID09PSAobCAtIDEpKTtcblxuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AucmV2aW5kZXgwID0gbCAtIGs7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5pbmRleDAgPSBrO1xuXHRcdFx0XHRcdFx0XHRrKys7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5yZXZpbmRleCA9IGwgLSBrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXggPSBrO1xuXG5cdFx0XHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGxpc3QpXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBsaXN0W2pdLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3RbJ2xvb3AnXSA9IG9sZDI7XG5cdFx0XHRcdFx0XHRkaWN0WyhzeW0xKV0gPSBvbGQxO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoaXRlbS5ibG9ja3MubGVuZ3RoID4gMSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRjb25zdCBsaXN0ID0gaXRlbS5ibG9ja3NbMV0ubGlzdDtcblxuXHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gbGlzdClcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbGlzdFtqXSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSU5DTFVERSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnaW5jbHVkZSc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IG1fMV8gPSBpdGVtLmV4cHJlc3Npb24sIHdpdGhfc3ViZXhwciwgd2l0aF9jb250ZXh0O1xuXG5cdFx0XHRcdC8qKi8gaWYoKG0gPSBtXzFfLm1hdGNoKC8oLispXFxzK3dpdGhcXHMrKC4rKVxccytvbmx5JC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9IG1bMl07XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZigobSA9IG1fMV8ubWF0Y2goLyguKylcXHMrd2l0aFxccysoLispJC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9IG1bMl07XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKChtID0gbV8xXy5tYXRjaCgvKC4rKVxccytvbmx5JC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9ICd7fSc7XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IG1fMV87XG5cdFx0XHRcdFx0d2l0aF9zdWJleHByID0gJ3t9Jztcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBmaWxlTmFtZSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCkgfHwgJyc7XG5cblx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZpbGVOYW1lKSAhPT0gJ1tvYmplY3QgU3RyaW5nXScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBzdHJpbmcgZXhwZWN0ZWQnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCB2YXJpYWJsZXMgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbCh3aXRoX3N1YmV4cHIsIGl0ZW0ubGluZSwgZGljdCkgfHwge307XG5cblx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhcmlhYmxlcykgIT09ICdbb2JqZWN0IE9iamVjdF0nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgb2JqZWN0IGV4cGVjdGVkJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmVzdWx0LnB1c2goYW1pVHdpZy5zdGRsaWIuaW5jbHVkZShcblx0XHRcdFx0XHRmaWxlTmFtZSxcblx0XHRcdFx0XHR2YXJpYWJsZXMsXG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0LFxuXHRcdFx0XHRcdGZhbHNlXG5cdFx0XHRcdCkpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlbmRlcjogZnVuY3Rpb24odG1wbCwgZGljdCA9IHt9LCB0bXBscyA9IHt9KVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHRzd2l0Y2goT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRtcGwpKVxuXHRcdHtcblx0XHRcdGNhc2UgJ1tvYmplY3QgU3RyaW5nXSc6XG5cdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIG5ldyBhbWlUd2lnLnRtcGwuQ29tcGlsZXIodG1wbCkucm9vdE5vZGUsIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ1tvYmplY3QgT2JqZWN0XSc6XG5cdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIC8qLS0tLS0tLS0tLS0tLS0qL3RtcGwvKi0tLS0tLS0tLS0tLS0tKi8sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5jYWNoZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5jYWNoZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkaWN0OiB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGV2YWw6IGZ1bmN0aW9uKGV4cHJlc3Npb24sIGxpbmUsIF8pXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgZjtcblxuXHRcdGlmKGV4cHJlc3Npb24gaW4gdGhpcy5kaWN0KVxuXHRcdHtcblx0XHRcdGYgPSB0aGlzLmRpY3RbZXhwcmVzc2lvbl07XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRmID0gdGhpcy5kaWN0W2V4cHJlc3Npb25dID0gZXZhbChcblx0XHRcdFx0YW1pVHdpZy5leHByLmludGVycHJldGVyLmdldEpTKFxuXHRcdFx0XHRcdG5ldyBhbWlUd2lnLmV4cHIuQ29tcGlsZXIoZXhwcmVzc2lvbiwgbGluZSlcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighXykgXyA9IHt9O1xuXG5cdFx0cmV0dXJuIGYuY2FsbChfLCBfKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuc3RkbGliICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuc3RkbGliID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBWQVJJQUJMRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc1VuZGVmaW5lZCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCA9PT0gdW5kZWZpbmVkO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzRGVmaW5lZCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCAhPT0gdW5kZWZpbmVkO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTnVsbCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCA9PT0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc05vdE51bGwnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggIT09IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNFbXB0eSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRpZih4ID09PSBudWxsXG5cdFx0ICAgfHxcblx0XHQgICB4ID09PSBmYWxzZVxuXHRcdCAgIHx8XG5cdFx0ICAgeCA9PT0gKCgnJykpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgdHlwZU5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCk7XG5cblx0XHRyZXR1cm4gKHR5cGVOYW1lID09PSAnW29iamVjdCBBcnJheV0nICYmIHgubGVuZ3RoID09PSAwKVxuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICAodHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nICYmIE9iamVjdC5rZXlzKHgpLmxlbmd0aCA9PT0gMClcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNOdW1iZXInOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgTnVtYmVyXSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNTdHJpbmcnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNBcnJheSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcnJheV0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzT2JqZWN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzSXRlcmFibGUnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0Y29uc3QgdHlwZU5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCk7XG5cblx0XHRyZXR1cm4gdHlwZU5hbWUgPT09ICdbb2JqZWN0IFN0cmluZ10nXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHR5cGVOYW1lID09PSAnW29iamVjdCBBcnJheV0nXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHR5cGVOYW1lID09PSAnW29iamVjdCBPYmplY3RdJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0V2ZW4nOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNOdW1iZXIoeCkgJiYgKHggJiAxKSA9PT0gMDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc09kZCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc051bWJlcih4KSAmJiAoeCAmIDEpID09PSAxO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIElURVJBQkxFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzSW5PYmplY3QnOiBmdW5jdGlvbih4LCB5KVxuXHR7XG5cdFx0aWYodGhpcy5pc0FycmF5KHkpXG5cdFx0ICAgfHxcblx0XHQgICB0aGlzLmlzU3RyaW5nKHkpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHkuaW5kZXhPZih4KSA+PSAwO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNPYmplY3QoeSkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHggaW4geTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNJblJhbmdlJzogZnVuY3Rpb24oeCwgeDEsIHgyKVxuXHR7XG5cdFx0aWYodGhpcy5pc051bWJlcih4MSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNOdW1iZXIoeDIpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuICgvKi0tLSoveC8qLS0tKi8gPj0gLyotLS0qL3gxLyotLS0qLylcblx0XHRcdCAgICAgICAmJlxuXHRcdFx0ICAgICAgICgvKi0tLSoveC8qLS0tKi8gPD0gLyotLS0qL3gyLyotLS0qLylcblx0XHRcdDtcblx0XHR9XG5cblx0XHRpZih0aGlzLmlzU3RyaW5nKHgxKSAmJiB4MS5sZW5ndGggPT09IDFcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoeDIpICYmIHgyLmxlbmd0aCA9PT0gMVxuXHRcdCApIHtcblx0XHRcdHJldHVybiAoeC5jaGFyQ29kZUF0KDApID49IHgxLmNoYXJDb2RlQXQoMCkpXG5cdFx0XHQgICAgICAgJiZcblx0XHRcdCAgICAgICAoeC5jaGFyQ29kZUF0KDApIDw9IHgyLmNoYXJDb2RlQXQoMCkpXG5cdFx0XHQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J3JhbmdlJzogZnVuY3Rpb24oeDEsIHgyLCBzdGVwID0gMSlcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0LyoqLyBpZih0aGlzLmlzTnVtYmVyKHgxKVxuXHRcdCAgICAgICAgJiZcblx0XHQgICAgICAgIHRoaXMuaXNOdW1iZXIoeDIpXG5cdFx0ICkge1xuXHRcdFx0Zm9yKGxldCBpID0gLyotLS0qL3gxLyotLS0qLzsgaSA8PSAvKi0tLSoveDIvKi0tLSovOyBpICs9IHN0ZXApXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKC8qLS0tLS0tLS0tLS0tLS0tKi8oaSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmKHRoaXMuaXNTdHJpbmcoeDEpICYmIHgxLmxlbmd0aCA9PT0gMVxuXHRcdCAgICAgICAgJiZcblx0XHQgICAgICAgIHRoaXMuaXNTdHJpbmcoeDIpICYmIHgyLmxlbmd0aCA9PT0gMVxuXHRcdCApIHtcblx0XHRcdGZvcihsZXQgaSA9IHgxLmNoYXJDb2RlQXQoMCk7IGkgPD0geDIuY2hhckNvZGVBdCgwKTsgaSArPSBzdGVwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sZW5ndGgnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyh4KVxuXHRcdCAgIHx8XG5cdFx0ICAgdGhpcy5pc0FycmF5KHgpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHgubGVuZ3RoO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNPYmplY3QoeCkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIE9iamVjdC5rZXlzKHgpLmxlbmd0aDtcblx0XHR9XG5cblx0XHRyZXR1cm4gMDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfZmlyc3QnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLmlzU3RyaW5nKHgpIHx8IHRoaXMuaXNBcnJheSh4KSkgJiYgeC5sZW5ndGggPiAwID8geFsweDAwMDAwMDAwMDBdIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2xhc3QnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLmlzU3RyaW5nKHgpIHx8IHRoaXMuaXNBcnJheSh4KSkgJiYgeC5sZW5ndGggPiAwID8geFt4Lmxlbmd0aCAtIDFdIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NsaWNlJzogZnVuY3Rpb24oeCwgaWR4MSwgaWR4Milcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpID8geC5zbGljZShpZHgxLCBpZHgyKSA6IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX21lcmdlJzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRoaXMuaXNTdHJpbmcoYXJndW1lbnRzWzBdKSlcblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgTCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFyZ3VtZW50cylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGl0ZW0gPSBhcmd1bWVudHNbaV07XG5cblx0XHRcdFx0XHRpZighdGhpcy5pc1N0cmluZyhpdGVtKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRMLnB1c2goYXJndW1lbnRzW2ldKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBMLmpvaW4oJycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNBcnJheShpdGVtKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBpdGVtKSBMLnB1c2goaXRlbVtqXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gTDtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRoaXMuaXNPYmplY3QoYXJndW1lbnRzWzBdKSlcblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgRCA9IHt9O1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFyZ3VtZW50cylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGl0ZW0gPSBhcmd1bWVudHNbaV07XG5cblx0XHRcdFx0XHRpZighdGhpcy5pc09iamVjdChpdGVtKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBpdGVtKSBEW2pdID0gaXRlbVtqXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBEO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfc29ydCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5zb3J0KCkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfcmV2ZXJzZSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5yZXZlcnNlKCkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfam9pbic6IGZ1bmN0aW9uKHgsIHNlcClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4LmpvaW4oc2VwKSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9rZXlzJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzT2JqZWN0KHgpID8gT2JqZWN0LmtleXMoeCkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfY29sdW1uJzogZnVuY3Rpb24oeCwga2V5KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHgubWFwKCh2YWwpID0+IHZhbFtrZXldKSA6IFtdO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9iYXRjaCc6IGZ1bmN0aW9uKHgsIG4sIG1pc3NpbmcgPSAnJylcblx0e1xuXHQgICAgY29uc3QgcmVzdWx0ID0gW107XG5cblx0XHRpZih0aGlzLmlzQXJyYXkoeClcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNOdW1iZXIobilcblx0XHQgKSB7XG5cdFx0IFx0bGV0IGxhc3Q7XG5cblx0XHRcdGNvbnN0IGwgPSB4Lmxlbmd0aDtcblxuXHRcdFx0Y29uc3QgbSA9IE1hdGguY2VpbChsIC8gbikgKiBuO1xuXG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSArPSBuKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQucHVzaChsYXN0ID0geC5zbGljZShpLCBpICsgbikpO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IobGV0IGkgPSBsOyBpIDwgbTsgaSArPSAxKVxuXHRcdFx0e1xuXHRcdFx0XHRsYXN0LnB1c2gobWlzc2luZyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBTVFJJTkdTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdzdGFydHNXaXRoJzogZnVuY3Rpb24oczEsIHMyKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzMSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoczIpXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgYmFzZSA9IDB4MDAwMDAwMDAwMDAwMDAwMDAwMDtcblxuXHRcdFx0cmV0dXJuIHMxLmluZGV4T2YoczIsIGJhc2UpID09PSBiYXNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdlbmRzV2l0aCc6IGZ1bmN0aW9uKHMxLCBzMilcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoczEpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHMyKVxuXHRcdCApIHtcblx0XHRcdGNvbnN0IGJhc2UgPSBzMS5sZW5ndGggLSBzMi5sZW5ndGg7XG5cblx0XHRcdHJldHVybiBzMS5pbmRleE9mKHMyLCBiYXNlKSA9PT0gYmFzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnbWF0Y2gnOiBmdW5jdGlvbihzLCByZWdleClcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoKChzKSkpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHJlZ2V4KVxuXHRcdCApIHtcblx0XHRcdGNvbnN0IGlkeDEgPSByZWdleC4gIGluZGV4T2YgICgnLycpO1xuXHRcdFx0Y29uc3QgaWR4MiA9IHJlZ2V4Lmxhc3RJbmRleE9mKCcvJyk7XG5cblx0XHRcdGlmKGlkeDEgPT09IDAgfHwgaWR4MSA8IGlkeDIpXG5cdFx0XHR7XG5cdFx0XHRcdHRyeVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBSZWdFeHAocmVnZXguc3Vic3RyaW5nKGlkeDEgKyAxLCBpZHgyKSwgcmVnZXguc3Vic3RyaW5nKGlkeDIgKyAxKSkudGVzdChzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaChlcnIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvKiBJR05PUkUgKi9cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfZGVmYXVsdCc6IGZ1bmN0aW9uKHMxLCBzMilcblx0e1xuXHRcdHJldHVybiBzMSB8fCBzMiB8fCAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbG93ZXInOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnRvTG93ZXJDYXNlKCkgOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdXBwZXInOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnRvVXBwZXJDYXNlKCkgOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfY2FwaXRhbGl6ZSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMpKVxuXHRcdHtcblx0XHRcdHJldHVybiBzLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL15cXFMvZywgZnVuY3Rpb24oYykge1xuXG5cdFx0XHRcdHJldHVybiBjLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3RpdGxlJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcocykpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHMudHJpbSgpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvKD86XnxcXHMpXFxTL2csIGZ1bmN0aW9uKGMpIHtcblxuXHRcdFx0XHRyZXR1cm4gYy50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl90cmltJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy50cmltKClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J19yZXBsYWNlJzogZnVuY3Rpb24ocywgb2xkU3RycywgbmV3U3Rycylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0Y29uc3QgbCA9ICgoKHMpKSkubGVuZ3RoO1xuXHRcdGNvbnN0IG0gPSBvbGRTdHJzLmxlbmd0aDtcblx0XHRjb25zdCBuID0gbmV3U3Rycy5sZW5ndGg7XG5cblx0XHRpZihtICE9IG4pXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHR9XG5cbl9fbDA6XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSArPSAwKVxuXHRcdHtcblx0XHRcdGNvbnN0IHAgPSBzLnN1YnN0cmluZyhpKTtcblxuXHRcdFx0Zm9yKGxldCBqID0gMDsgaiA8IG07IGogKz0gMSlcblx0XHRcdHtcblx0XHRcdFx0aWYocC5pbmRleE9mKG9sZFN0cnNbal0pID09PSAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gobmV3U3Ryc1tqXSk7XG5cblx0XHRcdFx0XHRpICs9IG9sZFN0cnNbal0ubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Y29udGludWUgX19sMDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXN1bHQucHVzaChzLmNoYXJBdChpKyspKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J190ZXh0VG9IdG1sWCc6IFsnJicgICAgLCAnXCInICAgICAsICc8JyAgICwgJz4nICAgXSxcblx0J190ZXh0VG9IdG1sWSc6IFsnJmFtcDsnLCAnJnF1b3Q7JywgJyZsdDsnLCAnJmd0OyddLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J190ZXh0VG9TdHJpbmdYJzogWydcXFxcJyAgLCAnXFxuJyAsICdcIicgICwgJ1xcJycgIF0sXG5cdCdfdGV4dFRvU3RyaW5nWSc6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXFwiJywgJ1xcXFxcXCcnXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfdGV4dFRvSnNvblN0cmluZ1gnOiBbJ1xcXFwnICAsICdcXG4nICwgJ1wiJyAgXSxcblx0J190ZXh0VG9Kc29uU3RyaW5nWSc6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXFwiJ10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2VzY2FwZSc6IGZ1bmN0aW9uKHMsIG1vZGUpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMpKVxuXHRcdHtcblx0XHRcdHN3aXRjaChtb2RlIHx8ICdodG1sJylcblx0XHRcdHtcblx0XHRcdFx0Y2FzZSAnaHRtbCc6XG5cdFx0XHRcdGNhc2UgJ2h0bWxfYXR0cic6XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3JlcGxhY2UocywgdGhpcy5fdGV4dFRvSHRtbFgsIHRoaXMuX3RleHRUb0h0bWxZKTtcblxuXHRcdFx0XHRjYXNlICdqcyc6XG5cdFx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3JlcGxhY2UocywgdGhpcy5fdGV4dFRvU3RyaW5nWCwgdGhpcy5fdGV4dFRvU3RyaW5nWSk7XG5cblx0XHRcdFx0Y2FzZSAnanNvbic6XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3JlcGxhY2UocywgdGhpcy5fdGV4dFRvSnNvblN0cmluZ1gsIHRoaXMuX3RleHRUb0pzb25TdHJpbmdZKTtcblxuXHRcdFx0XHRjYXNlICd1cmwnOlxuXHRcdFx0XHRcdHJldHVybiBlbmNvZGVVUklDb21wb25lbnQocyk7XG5cblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRyZXR1cm4gcztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3VybF9lbmNvZGUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBlbmNvZGVVUklDb21wb25lbnQocylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9ubDJicic6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMucmVwbGFjZSgvXFxuL2csICc8YnIvPicpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfcmF3JzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gc1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3JlcGxhY2UnOiBmdW5jdGlvbihzLCBkaWN0KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgJiYgdGhpcy5pc09iamVjdChkaWN0KSA/IHRoaXMuX3JlcGxhY2UocywgT2JqZWN0LmtleXMoZGljdCksIE9iamVjdC52YWx1ZXMoZGljdCkpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9zcGxpdCc6IGZ1bmN0aW9uKHMsIHNlcCwgbWF4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnNwbGl0KHNlcCwgbWF4KVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogW11cblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogTlVNQkVSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2Ficyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gTWF0aC5hYnMoeCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3JvdW5kJzogZnVuY3Rpb24oeCwgbW9kZSlcblx0e1xuXHRcdHN3aXRjaChtb2RlKVxuXHRcdHtcblx0XHRcdGNhc2UgJ2NlaWwnOlxuXHRcdFx0XHRyZXR1cm4gTWF0aC5jZWlsKHgpO1xuXG5cdFx0XHRjYXNlICdmbG9vcic6XG5cdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKHgpO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gTWF0aC5yb3VuZCh4KTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnbWluJzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgYXJncyA9IChhcmd1bWVudHMubGVuZ3RoID09PSAxKSAmJiAodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkgfHwgdGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKSA/IGFyZ3VtZW50c1swXVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhcmd1bWVudHNcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgcmVzdWx0ID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuXG5cdFx0Zm9yKGNvbnN0IGkgaW4gYXJncylcblx0XHR7XG5cdFx0XHRpZighdGhpcy5pc051bWJlcihhcmdzW2ldKSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIE51bWJlci5OYU47XG5cdFx0XHR9XG5cblx0XHRcdGlmKHJlc3VsdCA+IGFyZ3NbaV0pXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdCA9IGFyZ3NbaV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdtYXgnOiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBhcmdzID0gKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpICYmICh0aGlzLmlzQXJyYXkoYXJndW1lbnRzWzBdKSB8fCB0aGlzLmlzT2JqZWN0KGFyZ3VtZW50c1swXSkpID8gYXJndW1lbnRzWzBdXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFyZ3VtZW50c1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCByZXN1bHQgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XG5cblx0XHRmb3IoY29uc3QgaSBpbiBhcmdzKVxuXHRcdHtcblx0XHRcdGlmKCF0aGlzLmlzTnVtYmVyKGFyZ3NbaV0pKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gTnVtYmVyLk5hTjtcblx0XHRcdH1cblxuXHRcdFx0aWYocmVzdWx0IDwgYXJnc1tpXSlcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0ID0gYXJnc1tpXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFJBTkRPTSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J3JhbmRvbSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCB5ID0gTWF0aC5yYW5kb20oKTtcblxuXHRcdGlmKHgpXG5cdFx0e1xuXHRcdFx0aWYodGhpcy5pc0FycmF5KHgpXG5cdFx0XHQgICB8fFxuXHRcdFx0ICAgdGhpcy5pc09iamVjdCh4KVxuXHRcdFx0ICkge1xuXHRcdFx0IFx0Y29uc3QgWCA9IE9iamVjdC5rZXlzKHgpO1xuXG5cdFx0XHRcdHJldHVybiB4W1xuXHRcdFx0XHRcdFhbTWF0aC5mbG9vcihYLmxlbmd0aCAqIHkpXVxuXHRcdFx0XHRdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLmlzU3RyaW5nKHgpKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4geFtNYXRoLmZsb29yKHgubGVuZ3RoICogeSldO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLmlzTnVtYmVyKHgpKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih4ICogeSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0eCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoeCAqIHkpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIEpTT04gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9qc29uX2VuY29kZSc6IGZ1bmN0aW9uKHgsIGluZGVudClcblx0e1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh4LCBudWxsLCB0aGlzLmlzTnVtYmVyKGluZGVudCkgPyBpbmRlbnQgOiAyKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfanNvbl9qc3BhdGgnOiBmdW5jdGlvbih4LCBwYXRoKVxuXHR7XG5cdFx0cmV0dXJuIHR5cGVvZiBKU1BhdGggIT09ICd1bmRlZmluZWQnID8gSlNQYXRoLmFwcGx5KHBhdGgsIHgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogW11cblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVEVNUExBVEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaW5jbHVkZSc6IGZ1bmN0aW9uKGZpbGVOYW1lLCB2YXJpYWJsZXMgPSB7fSwgd2l0aENvbnRleHQgPSB0cnVlLCBpZ25vcmVNaXNzaW5nID0gZmFsc2UpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihmaWxlTmFtZSBpbiBhbWlUd2lnLmVuZ2luZS50bXBscylcblx0XHR7XG5cdFx0XHRjb25zdCB0ZW1wID0ge307XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih3aXRoQ29udGV4dClcblx0XHRcdHtcblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYW1pVHdpZy5lbmdpbmUuZGljdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRlbXBbaV0gPSBhbWlUd2lnLmVuZ2luZS5kaWN0W2ldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih2YXJpYWJsZXMpXG5cdFx0XHR7XG5cdFx0XHRcdGZvcihjb25zdCBpIGluIC8qLSovdmFyaWFibGVzLyotKi8pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZW1wW2ldID0gLyotKi92YXJpYWJsZXMvKi0qL1tpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0cmV0dXJuIGFtaVR3aWcuZW5naW5lLnJlbmRlcihhbWlUd2lnLmVuZ2luZS50bXBsc1tmaWxlTmFtZV0sIHRlbXApO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighaWdub3JlTWlzc2luZylcblx0XHR7XG5cdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgY291bGQgbm90IG9wZW4gYCcgKyBmaWxlTmFtZSArICdgJztcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnN0ZGxpYi5maWx0ZXJfZSA9IGFtaVR3aWcuc3RkbGliLmZpbHRlcl9lc2NhcGU7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2dldEpTOiBmdW5jdGlvbihub2RlKVxuXHR7XG5cdFx0bGV0IEw7XG5cdFx0bGV0IHg7XG5cdFx0bGV0IGxlZnQ7XG5cdFx0bGV0IHJpZ2h0O1xuXHRcdGxldCBvcGVyYXRvcjtcblxuXHRcdHN3aXRjaChub2RlLm5vZGVUeXBlKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogTFNUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxTVDpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKC8qLS0tLS0qLyB0aGlzLl9nZXRKUyhub2RlLmxpc3RbaV0pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuICdbJyArIEwuam9pbignLCcpICsgJ10nO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERJQyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ESUM6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUuZGljdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaChpICsgJzonICsgdGhpcy5fZ2V0SlMobm9kZS5kaWN0W2ldKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiAneycgKyBMLmpvaW4oJywnKSArICd9JztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGVU4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRlVOOlxuXHRcdCBcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdCBcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuIG5vZGUubm9kZVZhbHVlICsgJygnICsgTC5qb2luKCcsJykgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogVkFSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUjpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKCdbJyArIHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkgKyAnXScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gTC5sZW5ndGggPiAwID8gbm9kZS5ub2RlVmFsdWUgKyBMLmpvaW4oJycpIDogbm9kZS5ub2RlVmFsdWU7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogVEVSTUlOQUwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMOlxuXG5cdFx0XHRcdHJldHVybiBub2RlLm5vZGVWYWx1ZTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSVM6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXG5cdFx0XHRcdHN3aXRjaChub2RlLm5vZGVSaWdodC5ub2RlVHlwZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ERUZJTkVEOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0RlZmluZWQoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTlVMTDpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNOdWxsKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVNUFRZOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0VtcHR5KCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLklURVJBQkxFOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0l0ZXJhYmxlKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVWRU46XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzRXZlbignICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5PREQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzT2RkKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHRocm93ICdpbnRlcm5hbCBlcnJvcic7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSU46XG5cblx0XHRcdFx0aWYobm9kZS5ub2RlUmlnaHQubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzSW5PYmplY3QoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR4ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cblx0XHRcdFx0XHRsZWZ0ID0gbm9kZS5ub2RlUmlnaHQubm9kZUxlZnQubm9kZVZhbHVlO1xuXHRcdFx0XHRcdHJpZ2h0ID0gbm9kZS5ub2RlUmlnaHQubm9kZVJpZ2h0Lm5vZGVWYWx1ZTtcblxuXHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNJblJhbmdlKCcgKyB4ICsgJywnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU1RBUlRTX1dJVEggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlNUQVJUU19XSVRIOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5zdGFydHNXaXRoKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRU5EU19XSVRIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVORFNfV0lUSDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuZW5kc1dpdGgoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBNQVRDSEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUzpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIubWF0Y2goJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBSQU5HRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0U6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLnJhbmdlKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRE9UICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZVZhbHVlWzBdID09PSAnLicpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gbGVmdCArICcuJyArIHJpZ2h0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBsZWZ0ICsgJ1snICsgcmlnaHQgKyAnXSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGTERJViAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRkxESVY6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ01hdGguZmxvb3IoJyArIGxlZnQgKyAnLycgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBQT1dFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVI6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ01hdGgucG93KCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRE9VQkxFX1FVRVNUSU9OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVUJMRV9RVUVTVElPTjpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnKCgnICsgbGVmdCArICcpIHx8ICgnICsgcmlnaHQgKyAnKSknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogVU5JQVJZIE9QRVJBVE9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ID09PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ICE9PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRvcGVyYXRvciA9IChub2RlLm5vZGVUeXBlICE9PSBhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkgPyBub2RlLm5vZGVWYWx1ZSA6ICchJztcblxuXHRcdFx0XHRcdHJldHVybiBvcGVyYXRvciArICcoJyArIHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KSArICcpJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKG5vZGUubm9kZUxlZnQgIT09IG51bGxcblx0XHRcdFx0ICAgJiZcblx0XHRcdFx0ICAgbm9kZS5ub2RlUmlnaHQgPT09IG51bGxcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdG9wZXJhdG9yID0gKG5vZGUubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSA/IG5vZGUubm9kZVZhbHVlIDogJyEnO1xuXG5cdFx0XHRcdFx0cmV0dXJuICcoJyArIHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpICsgJyknICsgb3BlcmF0b3I7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBCSU5BUlkgT1BFUkFUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZUxlZnQgIT09IG51bGxcblx0XHRcdFx0ICAgJiZcblx0XHRcdFx0ICAgbm9kZS5ub2RlUmlnaHQgIT09IG51bGxcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdHN3aXRjaChub2RlLm5vZGVUeXBlKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnfHwnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnJiYnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX09SOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICd8Jztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9YT1I6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJ14nO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX0FORDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnJic7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkNPTkNBVDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnKyc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSBub2RlLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRcdHJldHVybiAnKCcgKyBsZWZ0ICsgb3BlcmF0b3IgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRKUzogZnVuY3Rpb24oZXhwcilcblx0e1xuXHRcdHJldHVybiAnKGZ1bmN0aW9uKF8pIHsgcmV0dXJuICcgKyB0aGlzLl9nZXRKUyhleHByLnJvb3ROb2RlKSArICc7IH0pJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGV2YWw6IGZ1bmN0aW9uKGV4cHIsIF8pXG5cdHtcblx0XHRpZighXykgXyA9IHt9O1xuXG5cdFx0cmV0dXJuIGV2YWwodGhpcy5nZXRKUyhleHByKSkuY2FsbChfLCBfKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIoZnVuY3Rpb24oKSB7XG5cbnZhciBTWU5UQVggPSB7XG4gICAgICAgIFBBVEggICAgICAgICAgICA6IDEsXG4gICAgICAgIFNFTEVDVE9SICAgICAgICA6IDIsXG4gICAgICAgIE9CSl9QUkVEICAgICAgICA6IDMsXG4gICAgICAgIFBPU19QUkVEICAgICAgICA6IDQsXG4gICAgICAgIExPR0lDQUxfRVhQUiAgICA6IDUsXG4gICAgICAgIENPTVBBUklTT05fRVhQUiA6IDYsXG4gICAgICAgIE1BVEhfRVhQUiAgICAgICA6IDcsXG4gICAgICAgIENPTkNBVF9FWFBSICAgICA6IDgsXG4gICAgICAgIFVOQVJZX0VYUFIgICAgICA6IDksXG4gICAgICAgIFBPU19FWFBSICAgICAgICA6IDEwLFxuICAgICAgICBMSVRFUkFMICAgICAgICAgOiAxMVxuICAgIH07XG5cbi8vIHBhcnNlclxuXG52YXIgcGFyc2UgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgVE9LRU4gPSB7XG4gICAgICAgICAgICBJRCAgICA6IDEsXG4gICAgICAgICAgICBOVU0gICA6IDIsXG4gICAgICAgICAgICBTVFIgICA6IDMsXG4gICAgICAgICAgICBCT09MICA6IDQsXG4gICAgICAgICAgICBOVUxMICA6IDUsXG4gICAgICAgICAgICBQVU5DVCA6IDYsXG4gICAgICAgICAgICBFT1AgICA6IDdcbiAgICAgICAgfSxcbiAgICAgICAgTUVTU0FHRVMgPSB7XG4gICAgICAgICAgICBVTkVYUF9UT0tFTiA6ICdVbmV4cGVjdGVkIHRva2VuIFwiJTBcIicsXG4gICAgICAgICAgICBVTkVYUF9FT1AgICA6ICdVbmV4cGVjdGVkIGVuZCBvZiBwYXRoJ1xuICAgICAgICB9O1xuXG4gICAgdmFyIHBhdGgsIGlkeCwgYnVmLCBsZW47XG5cbiAgICBmdW5jdGlvbiBwYXJzZShfcGF0aCkge1xuICAgICAgICBwYXRoID0gX3BhdGguc3BsaXQoJycpO1xuICAgICAgICBpZHggPSAwO1xuICAgICAgICBidWYgPSBudWxsO1xuICAgICAgICBsZW4gPSBwYXRoLmxlbmd0aDtcblxuICAgICAgICB2YXIgcmVzID0gcGFyc2VQYXRoQ29uY2F0RXhwcigpLFxuICAgICAgICAgICAgdG9rZW4gPSBsZXgoKTtcblxuICAgICAgICBpZih0b2tlbi50eXBlICE9PSBUT0tFTi5FT1ApIHtcbiAgICAgICAgICAgIHRocm93VW5leHBlY3RlZCh0b2tlbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUGF0aENvbmNhdEV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VQYXRoQ29uY2F0UGFydEV4cHIoKSxcbiAgICAgICAgICAgIG9wZXJhbmRzO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCd8JykpIHtcbiAgICAgICAgICAgIGxleCgpO1xuICAgICAgICAgICAgKG9wZXJhbmRzIHx8IChvcGVyYW5kcyA9IFtleHByXSkpLnB1c2gocGFyc2VQYXRoQ29uY2F0UGFydEV4cHIoKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3BlcmFuZHM/XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5DT05DQVRfRVhQUixcbiAgICAgICAgICAgICAgICBhcmdzIDogb3BlcmFuZHNcbiAgICAgICAgICAgIH0gOlxuICAgICAgICAgICAgZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBhdGhDb25jYXRQYXJ0RXhwcigpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoKCcoJyk/XG4gICAgICAgICAgICBwYXJzZVBhdGhHcm91cEV4cHIoKSA6XG4gICAgICAgICAgICBwYXJzZVBhdGgoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBhdGhHcm91cEV4cHIoKSB7XG4gICAgICAgIGV4cGVjdCgnKCcpO1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlUGF0aENvbmNhdEV4cHIoKTtcbiAgICAgICAgZXhwZWN0KCcpJyk7XG5cbiAgICAgICAgdmFyIHBhcnRzID0gW10sXG4gICAgICAgICAgICBwYXJ0O1xuICAgICAgICB3aGlsZSgocGFydCA9IHBhcnNlUHJlZGljYXRlKCkpKSB7XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHBhcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXBhcnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihleHByLnR5cGUgPT09IFNZTlRBWC5QQVRIKSB7XG4gICAgICAgICAgICBleHByLnBhcnRzID0gZXhwci5wYXJ0cy5jb25jYXQocGFydHMpO1xuICAgICAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJ0cy51bnNoaWZ0KGV4cHIpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlICA6IFNZTlRBWC5QQVRILFxuICAgICAgICAgICAgcGFydHMgOiBwYXJ0c1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUHJlZGljYXRlKCkge1xuICAgICAgICBpZihtYXRjaCgnWycpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VQb3NQcmVkaWNhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1hdGNoKCd7JykpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZU9iamVjdFByZWRpY2F0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWF0Y2goJygnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlUGF0aEdyb3VwRXhwcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQYXRoKCkge1xuICAgICAgICBpZighbWF0Y2hQYXRoKCkpIHtcbiAgICAgICAgICAgIHRocm93VW5leHBlY3RlZChsZXgoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZnJvbVJvb3QgPSBmYWxzZSxcbiAgICAgICAgICAgIHN1YnN0O1xuXG4gICAgICAgIGlmKG1hdGNoKCdeJykpIHtcbiAgICAgICAgICAgIGxleCgpO1xuICAgICAgICAgICAgZnJvbVJvb3QgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYobWF0Y2hTdWJzdCgpKSB7XG4gICAgICAgICAgICBzdWJzdCA9IGxleCgpLnZhbC5zdWJzdHIoMSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGFydHMgPSBbXSxcbiAgICAgICAgICAgIHBhcnQ7XG4gICAgICAgIHdoaWxlKChwYXJ0ID0gcGFyc2VQYXRoUGFydCgpKSkge1xuICAgICAgICAgICAgcGFydHMucHVzaChwYXJ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlICAgICA6IFNZTlRBWC5QQVRILFxuICAgICAgICAgICAgZnJvbVJvb3QgOiBmcm9tUm9vdCxcbiAgICAgICAgICAgIHN1YnN0ICAgIDogc3Vic3QsXG4gICAgICAgICAgICBwYXJ0cyAgICA6IHBhcnRzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQYXRoUGFydCgpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoU2VsZWN0b3IoKT9cbiAgICAgICAgICAgIHBhcnNlU2VsZWN0b3IoKSA6XG4gICAgICAgICAgICBwYXJzZVByZWRpY2F0ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlU2VsZWN0b3IoKSB7XG4gICAgICAgIHZhciBzZWxlY3RvciA9IGxleCgpLnZhbCxcbiAgICAgICAgICAgIHRva2VuID0gbG9va2FoZWFkKCksXG4gICAgICAgICAgICBwcm9wO1xuXG4gICAgICAgIGlmKG1hdGNoKCcqJykgfHwgdG9rZW4udHlwZSA9PT0gVE9LRU4uSUQgfHwgdG9rZW4udHlwZSA9PT0gVE9LRU4uU1RSKSB7XG4gICAgICAgICAgICBwcm9wID0gbGV4KCkudmFsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgICAgIDogU1lOVEFYLlNFTEVDVE9SLFxuICAgICAgICAgICAgc2VsZWN0b3IgOiBzZWxlY3RvcixcbiAgICAgICAgICAgIHByb3AgICAgIDogcHJvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUG9zUHJlZGljYXRlKCkge1xuICAgICAgICBleHBlY3QoJ1snKTtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZVBvc0V4cHIoKTtcbiAgICAgICAgZXhwZWN0KCddJyk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguUE9TX1BSRUQsXG4gICAgICAgICAgICBhcmcgIDogZXhwclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlT2JqZWN0UHJlZGljYXRlKCkge1xuICAgICAgICBleHBlY3QoJ3snKTtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZUxvZ2ljYWxPUkV4cHIoKTtcbiAgICAgICAgZXhwZWN0KCd9Jyk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguT0JKX1BSRUQsXG4gICAgICAgICAgICBhcmcgIDogZXhwclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlTG9naWNhbE9SRXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZUxvZ2ljYWxBTkRFeHByKCksXG4gICAgICAgICAgICBvcGVyYW5kcztcblxuICAgICAgICB3aGlsZShtYXRjaCgnfHwnKSkge1xuICAgICAgICAgICAgbGV4KCk7XG4gICAgICAgICAgICAob3BlcmFuZHMgfHwgKG9wZXJhbmRzID0gW2V4cHJdKSkucHVzaChwYXJzZUxvZ2ljYWxBTkRFeHByKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wZXJhbmRzP1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguTE9HSUNBTF9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiAnfHwnLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBvcGVyYW5kc1xuICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlTG9naWNhbEFOREV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VFcXVhbGl0eUV4cHIoKSxcbiAgICAgICAgICAgIG9wZXJhbmRzO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCcmJicpKSB7XG4gICAgICAgICAgICBsZXgoKTtcbiAgICAgICAgICAgIChvcGVyYW5kcyB8fCAob3BlcmFuZHMgPSBbZXhwcl0pKS5wdXNoKHBhcnNlRXF1YWxpdHlFeHByKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wZXJhbmRzP1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguTE9HSUNBTF9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiAnJiYnLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBvcGVyYW5kc1xuICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlRXF1YWxpdHlFeHByKCkge1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlUmVsYXRpb25hbEV4cHIoKTtcblxuICAgICAgICB3aGlsZShcbiAgICAgICAgICAgIG1hdGNoKCc9PScpIHx8IG1hdGNoKCchPScpIHx8IG1hdGNoKCc9PT0nKSB8fCBtYXRjaCgnIT09JykgfHxcbiAgICAgICAgICAgIG1hdGNoKCdePT0nKSB8fCBtYXRjaCgnPT1eJykgfHxtYXRjaCgnXj0nKSB8fCBtYXRjaCgnPV4nKSB8fFxuICAgICAgICAgICAgbWF0Y2goJyQ9PScpIHx8IG1hdGNoKCc9PSQnKSB8fCBtYXRjaCgnJD0nKSB8fCBtYXRjaCgnPSQnKSB8fFxuICAgICAgICAgICAgbWF0Y2goJyo9PScpIHx8IG1hdGNoKCc9PSonKXx8IG1hdGNoKCcqPScpIHx8IG1hdGNoKCc9KicpXG4gICAgICAgICkge1xuICAgICAgICAgICAgZXhwciA9IHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLkNPTVBBUklTT05fRVhQUixcbiAgICAgICAgICAgICAgICBvcCAgIDogbGV4KCkudmFsLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBbZXhwciwgcGFyc2VFcXVhbGl0eUV4cHIoKV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVJlbGF0aW9uYWxFeHByKCkge1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlQWRkaXRpdmVFeHByKCk7XG5cbiAgICAgICAgd2hpbGUobWF0Y2goJzwnKSB8fCBtYXRjaCgnPicpIHx8IG1hdGNoKCc8PScpIHx8IG1hdGNoKCc+PScpKSB7XG4gICAgICAgICAgICBleHByID0ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguQ09NUEFSSVNPTl9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiBsZXgoKS52YWwsXG4gICAgICAgICAgICAgICAgYXJncyA6IFtleHByLCBwYXJzZVJlbGF0aW9uYWxFeHByKCldXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VBZGRpdGl2ZUV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VNdWx0aXBsaWNhdGl2ZUV4cHIoKTtcblxuICAgICAgICB3aGlsZShtYXRjaCgnKycpIHx8IG1hdGNoKCctJykpIHtcbiAgICAgICAgICAgIGV4cHIgPSB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5NQVRIX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6IGxleCgpLnZhbCxcbiAgICAgICAgICAgICAgICBhcmdzIDogW2V4cHIsIHBhcnNlTXVsdGlwbGljYXRpdmVFeHByKCldXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VNdWx0aXBsaWNhdGl2ZUV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VVbmFyeUV4cHIoKTtcblxuICAgICAgICB3aGlsZShtYXRjaCgnKicpIHx8IG1hdGNoKCcvJykgfHwgbWF0Y2goJyUnKSkge1xuICAgICAgICAgICAgZXhwciA9IHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLk1BVEhfRVhQUixcbiAgICAgICAgICAgICAgICBvcCAgIDogbGV4KCkudmFsLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBbZXhwciwgcGFyc2VNdWx0aXBsaWNhdGl2ZUV4cHIoKV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBvc0V4cHIoKSB7XG4gICAgICAgIGlmKG1hdGNoKCc6JykpIHtcbiAgICAgICAgICAgIGxleCgpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFNZTlRBWC5QT1NfRVhQUixcbiAgICAgICAgICAgICAgICB0b0lkeCA6IHBhcnNlVW5hcnlFeHByKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZnJvbUV4cHIgPSBwYXJzZVVuYXJ5RXhwcigpO1xuICAgICAgICBpZihtYXRjaCgnOicpKSB7XG4gICAgICAgICAgICBsZXgoKTtcbiAgICAgICAgICAgIGlmKG1hdGNoKCddJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICAgIDogU1lOVEFYLlBPU19FWFBSLFxuICAgICAgICAgICAgICAgICAgICBmcm9tSWR4IDogZnJvbUV4cHJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgICAgOiBTWU5UQVguUE9TX0VYUFIsXG4gICAgICAgICAgICAgICAgZnJvbUlkeCA6IGZyb21FeHByLFxuICAgICAgICAgICAgICAgIHRvSWR4ICAgOiBwYXJzZVVuYXJ5RXhwcigpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguUE9TX0VYUFIsXG4gICAgICAgICAgICBpZHggIDogZnJvbUV4cHJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVVuYXJ5RXhwcigpIHtcbiAgICAgICAgaWYobWF0Y2goJyEnKSB8fCBtYXRjaCgnLScpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguVU5BUllfRVhQUixcbiAgICAgICAgICAgICAgICBvcCAgIDogbGV4KCkudmFsLFxuICAgICAgICAgICAgICAgIGFyZyAgOiBwYXJzZVVuYXJ5RXhwcigpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcnNlUHJpbWFyeUV4cHIoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVByaW1hcnlFeHByKCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBsb29rYWhlYWQoKSxcbiAgICAgICAgICAgIHR5cGUgPSB0b2tlbi50eXBlO1xuXG4gICAgICAgIGlmKHR5cGUgPT09IFRPS0VOLlNUUiB8fCB0eXBlID09PSBUT0tFTi5OVU0gfHwgdHlwZSA9PT0gVE9LRU4uQk9PTCB8fCB0eXBlID09PSBUT0tFTi5OVUxMKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguTElURVJBTCxcbiAgICAgICAgICAgICAgICB2YWwgIDogbGV4KCkudmFsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWF0Y2hQYXRoKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVBhdGgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1hdGNoKCcoJykpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUdyb3VwRXhwcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRocm93VW5leHBlY3RlZChsZXgoKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VHcm91cEV4cHIoKSB7XG4gICAgICAgIGV4cGVjdCgnKCcpO1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlTG9naWNhbE9SRXhwcigpO1xuICAgICAgICBleHBlY3QoJyknKTtcblxuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaCh2YWwpIHtcbiAgICAgICAgdmFyIHRva2VuID0gbG9va2FoZWFkKCk7XG4gICAgICAgIHJldHVybiB0b2tlbi50eXBlID09PSBUT0tFTi5QVU5DVCAmJiB0b2tlbi52YWwgPT09IHZhbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaFBhdGgoKSB7XG4gICAgICAgIHJldHVybiBtYXRjaFNlbGVjdG9yKCkgfHwgbWF0Y2hTdWJzdCgpIHx8IG1hdGNoKCdeJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2hTZWxlY3RvcigpIHtcbiAgICAgICAgdmFyIHRva2VuID0gbG9va2FoZWFkKCk7XG4gICAgICAgIGlmKHRva2VuLnR5cGUgPT09IFRPS0VOLlBVTkNUKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gdG9rZW4udmFsO1xuICAgICAgICAgICAgcmV0dXJuIHZhbCA9PT0gJy4nIHx8IHZhbCA9PT0gJy4uJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaFN1YnN0KCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBsb29rYWhlYWQoKTtcbiAgICAgICAgcmV0dXJuIHRva2VuLnR5cGUgPT09IFRPS0VOLklEICYmIHRva2VuLnZhbFswXSA9PT0gJyQnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4cGVjdCh2YWwpIHtcbiAgICAgICAgdmFyIHRva2VuID0gbGV4KCk7XG4gICAgICAgIGlmKHRva2VuLnR5cGUgIT09IFRPS0VOLlBVTkNUIHx8IHRva2VuLnZhbCAhPT0gdmFsKSB7XG4gICAgICAgICAgICB0aHJvd1VuZXhwZWN0ZWQodG9rZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9va2FoZWFkKCkge1xuICAgICAgICBpZihidWYgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBidWY7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcG9zID0gaWR4O1xuICAgICAgICBidWYgPSBhZHZhbmNlKCk7XG4gICAgICAgIGlkeCA9IHBvcztcblxuICAgICAgICByZXR1cm4gYnVmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkdmFuY2UoKSB7XG4gICAgICAgIHdoaWxlKGlzV2hpdGVTcGFjZShwYXRoW2lkeF0pKSB7XG4gICAgICAgICAgICArK2lkeDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGlkeCA+PSBsZW4pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5FT1AsXG4gICAgICAgICAgICAgICAgcmFuZ2UgOiBbaWR4LCBpZHhdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRva2VuID0gc2NhblB1bmN0dWF0b3IoKTtcbiAgICAgICAgaWYodG9rZW4gfHxcbiAgICAgICAgICAgICAgICAodG9rZW4gPSBzY2FuSWQoKSkgfHxcbiAgICAgICAgICAgICAgICAodG9rZW4gPSBzY2FuU3RyaW5nKCkpIHx8XG4gICAgICAgICAgICAgICAgKHRva2VuID0gc2Nhbk51bWVyaWMoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRva2VuID0geyByYW5nZSA6IFtpZHgsIGlkeF0gfTtcbiAgICAgICAgaWR4ID49IGxlbj9cbiAgICAgICAgICAgIHRva2VuLnR5cGUgPSBUT0tFTi5FT1AgOlxuICAgICAgICAgICAgdG9rZW4udmFsID0gcGF0aFtpZHhdO1xuXG4gICAgICAgIHRocm93VW5leHBlY3RlZCh0b2tlbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGV4KCkge1xuICAgICAgICB2YXIgdG9rZW47XG5cbiAgICAgICAgaWYoYnVmKSB7XG4gICAgICAgICAgICBpZHggPSBidWYucmFuZ2VbMV07XG4gICAgICAgICAgICB0b2tlbiA9IGJ1ZjtcbiAgICAgICAgICAgIGJ1ZiA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYWR2YW5jZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRGlnaXQoY2gpIHtcbiAgICAgICAgcmV0dXJuICcwMTIzNDU2Nzg5Jy5pbmRleE9mKGNoKSA+PSAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzV2hpdGVTcGFjZShjaCkge1xuICAgICAgICByZXR1cm4gJyBcXHJcXG5cXHQnLmluZGV4T2YoY2gpID4gLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNJZFN0YXJ0KGNoKSB7XG4gICAgICAgIHJldHVybiBjaCA9PT0gJyQnIHx8IGNoID09PSAnQCcgfHwgY2ggPT09ICdfJyB8fCAoY2ggPj0gJ2EnICYmIGNoIDw9ICd6JykgfHwgKGNoID49ICdBJyAmJiBjaCA8PSAnWicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzSWRQYXJ0KGNoKSB7XG4gICAgICAgIHJldHVybiBpc0lkU3RhcnQoY2gpIHx8IChjaCA+PSAnMCcgJiYgY2ggPD0gJzknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY2FuSWQoKSB7XG4gICAgICAgIHZhciBjaCA9IHBhdGhbaWR4XTtcblxuICAgICAgICBpZighaXNJZFN0YXJ0KGNoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0YXJ0ID0gaWR4LFxuICAgICAgICAgICAgaWQgPSBjaDtcblxuICAgICAgICB3aGlsZSgrK2lkeCA8IGxlbikge1xuICAgICAgICAgICAgY2ggPSBwYXRoW2lkeF07XG4gICAgICAgICAgICBpZighaXNJZFBhcnQoY2gpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZCArPSBjaDtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaChpZCkge1xuICAgICAgICAgICAgY2FzZSAndHJ1ZSc6XG4gICAgICAgICAgICBjYXNlICdmYWxzZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5CT09MLFxuICAgICAgICAgICAgICAgICAgICB2YWwgICA6IGlkID09PSAndHJ1ZScsXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHhdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY2FzZSAnbnVsbCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5OVUxMLFxuICAgICAgICAgICAgICAgICAgICB2YWwgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHhdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLklELFxuICAgICAgICAgICAgICAgICAgICB2YWwgICA6IGlkLFxuICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4XVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY2FuU3RyaW5nKCkge1xuICAgICAgICBpZihwYXRoW2lkeF0gIT09ICdcIicgJiYgcGF0aFtpZHhdICE9PSAnXFwnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9yaWcgPSBwYXRoW2lkeF0sXG4gICAgICAgICAgICBzdGFydCA9ICsraWR4LFxuICAgICAgICAgICAgc3RyID0gJycsXG4gICAgICAgICAgICBlb3NGb3VuZCA9IGZhbHNlLFxuICAgICAgICAgICAgY2g7XG5cbiAgICAgICAgd2hpbGUoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICBjaCA9IHBhdGhbaWR4KytdO1xuICAgICAgICAgICAgaWYoY2ggPT09ICdcXFxcJykge1xuICAgICAgICAgICAgICAgIGNoID0gcGF0aFtpZHgrK107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKChjaCA9PT0gJ1wiJyB8fCBjaCA9PT0gJ1xcJycpICYmIGNoID09PSBvcmlnKSB7XG4gICAgICAgICAgICAgICAgZW9zRm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyICs9IGNoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZW9zRm91bmQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFRPS0VOLlNUUixcbiAgICAgICAgICAgICAgICB2YWwgOiBzdHIsXG4gICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY2FuTnVtZXJpYygpIHtcbiAgICAgICAgdmFyIHN0YXJ0ID0gaWR4LFxuICAgICAgICAgICAgY2ggPSBwYXRoW2lkeF0sXG4gICAgICAgICAgICBpc0Zsb2F0ID0gY2ggPT09ICcuJztcblxuICAgICAgICBpZihpc0Zsb2F0IHx8IGlzRGlnaXQoY2gpKSB7XG4gICAgICAgICAgICB2YXIgbnVtID0gY2g7XG4gICAgICAgICAgICB3aGlsZSgrK2lkeCA8IGxlbikge1xuICAgICAgICAgICAgICAgIGNoID0gcGF0aFtpZHhdO1xuICAgICAgICAgICAgICAgIGlmKGNoID09PSAnLicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoaXNGbG9hdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlzRmxvYXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKCFpc0RpZ2l0KGNoKSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBudW0gKz0gY2g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5OVU0sXG4gICAgICAgICAgICAgICAgdmFsICAgOiBpc0Zsb2F0PyBwYXJzZUZsb2F0KG51bSkgOiBwYXJzZUludChudW0sIDEwKSxcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4XVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjYW5QdW5jdHVhdG9yKCkge1xuICAgICAgICB2YXIgc3RhcnQgPSBpZHgsXG4gICAgICAgICAgICBjaDEgPSBwYXRoW2lkeF0sXG4gICAgICAgICAgICBjaDIgPSBwYXRoW2lkeCArIDFdO1xuXG4gICAgICAgIGlmKGNoMSA9PT0gJy4nKSB7XG4gICAgICAgICAgICBpZihpc0RpZ2l0KGNoMikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoWysraWR4XSA9PT0gJy4nP1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICAgICAgdmFsICAgOiAnLi4nLFxuICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgKytpZHhdXG4gICAgICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgICAgICB2YWwgICA6ICcuJyxcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeF1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2gyID09PSAnPScpIHtcbiAgICAgICAgICAgIHZhciBjaDMgPSBwYXRoW2lkeCArIDJdO1xuICAgICAgICAgICAgaWYoY2gzID09PSAnPScpIHtcbiAgICAgICAgICAgICAgICBpZignPSFeJConLmluZGV4T2YoY2gxKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsICAgOiBjaDEgKyBjaDIgKyBjaDMsXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4ICs9IDNdXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZignXiQqJy5pbmRleE9mKGNoMykgPj0gMCkge1xuICAgICAgICAgICAgICAgIGlmKGNoMSA9PT0gJz0nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsICAgOiBjaDEgKyBjaDIgKyBjaDMsXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4ICs9IDNdXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZignPSFeJCo+PCcuaW5kZXhPZihjaDEpID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSArIGNoMixcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeCArPSAyXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihjaDEgPT09ICc9JyAmJiAnXiQqJy5pbmRleE9mKGNoMikgPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgIHZhbCAgIDogY2gxICsgY2gyLFxuICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHggKz0gMl1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZihjaDEgPT09IGNoMiAmJiAoY2gxID09PSAnfCcgfHwgY2gxID09PSAnJicpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgdmFsICAgOiBjaDEgKyBjaDIsXG4gICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeCArPSAyXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCc6e30oKVtdXistKi8lIT48fCcuaW5kZXhPZihjaDEpID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSxcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgKytpZHhdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGhyb3dVbmV4cGVjdGVkKHRva2VuKSB7XG4gICAgICAgIGlmKHRva2VuLnR5cGUgPT09IFRPS0VOLkVPUCkge1xuICAgICAgICAgICAgdGhyb3dFcnJvcih0b2tlbiwgTUVTU0FHRVMuVU5FWFBfRU9QKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93RXJyb3IodG9rZW4sIE1FU1NBR0VTLlVORVhQX1RPS0VOLCB0b2tlbi52YWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRocm93RXJyb3IodG9rZW4sIG1lc3NhZ2VGb3JtYXQpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpLFxuICAgICAgICAgICAgbXNnID0gbWVzc2FnZUZvcm1hdC5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIC8lKFxcZCkvZyxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihfLCBpZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFyZ3NbaWR4XSB8fCAnJztcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yKG1zZyk7XG5cbiAgICAgICAgZXJyb3IuY29sdW1uID0gdG9rZW4ucmFuZ2VbMF07XG5cbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlO1xufSkoKTtcblxuLy8gdHJhbnNsYXRvclxuXG52YXIgdHJhbnNsYXRlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGJvZHksIHZhcnMsIGxhc3RWYXJJZCwgdW51c2VkVmFycztcblxuICAgIGZ1bmN0aW9uIGFjcXVpcmVWYXIoKSB7XG4gICAgICAgIGlmKHVudXNlZFZhcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdW51c2VkVmFycy5zaGlmdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHZhck5hbWUgPSAndicgKyArK2xhc3RWYXJJZDtcbiAgICAgICAgdmFycy5wdXNoKHZhck5hbWUpO1xuICAgICAgICByZXR1cm4gdmFyTmFtZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWxlYXNlVmFycygpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsIGkgPSBhcmdzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUoaS0tKSB7XG4gICAgICAgICAgICB1bnVzZWRWYXJzLnB1c2goYXJnc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGUoYXN0KSB7XG4gICAgICAgIGJvZHkgPSBbXTtcbiAgICAgICAgdmFycyA9IFsncmVzJ107XG4gICAgICAgIGxhc3RWYXJJZCA9IDA7XG4gICAgICAgIHVudXNlZFZhcnMgPSBbXTtcblxuICAgICAgICB0cmFuc2xhdGVFeHByKGFzdCwgJ3JlcycsICdkYXRhJyk7XG5cbiAgICAgICAgYm9keS51bnNoaWZ0KFxuICAgICAgICAgICAgJ3ZhciAnLFxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheT9cbiAgICAgICAgICAgICAgICAnaXNBcnIgPSBBcnJheS5pc0FycmF5JyA6XG4gICAgICAgICAgICAgICAgJ3RvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZywgaXNBcnIgPSBmdW5jdGlvbihvKSB7IHJldHVybiB0b1N0ci5jYWxsKG8pID09PSBcIltvYmplY3QgQXJyYXldXCI7IH0nLFxuICAgICAgICAgICAgICAgICcsIGNvbmNhdCA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQnLFxuICAgICAgICAgICAgICAgICcsJywgdmFycy5qb2luKCcsJyksICc7Jyk7XG5cbiAgICAgICAgaWYoYXN0LnR5cGUgPT09IFNZTlRBWC5QQVRIKSB7XG4gICAgICAgICAgICB2YXIgbGFzdFBhcnQgPSBhc3QucGFydHNbYXN0LnBhcnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYobGFzdFBhcnQgJiYgbGFzdFBhcnQudHlwZSA9PT0gU1lOVEFYLlBPU19QUkVEICYmICdpZHgnIGluIGxhc3RQYXJ0LmFyZykge1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaCgncmVzID0gcmVzWzBdOycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYm9keS5wdXNoKCdyZXR1cm4gcmVzOycpO1xuXG4gICAgICAgIHJldHVybiBib2R5LmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZVBhdGgocGF0aCwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IHBhdGgucGFydHMsXG4gICAgICAgICAgICBpID0gMCwgbGVuID0gcGFydHMubGVuZ3RoO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgIGRlc3QsICc9JywgcGF0aC5mcm9tUm9vdD8gJ2RhdGEnIDogcGF0aC5zdWJzdD8gJ3N1YnN0LicgKyBwYXRoLnN1YnN0IDogY3R4LCAnOycsXG4gICAgICAgICAgICAnaXNBcnIoJyArIGRlc3QgKyAnKSB8fCAoJyArIGRlc3QgKyAnID0gWycgKyBkZXN0ICsgJ10pOycpO1xuXG4gICAgICAgIHdoaWxlKGkgPCBsZW4pIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gcGFydHNbaSsrXTtcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFNZTlRBWC5TRUxFQ1RPUjpcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RvciA9PT0gJy4uJz9cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZURlc2NlbmRhbnRTZWxlY3RvcihpdGVtLCBkZXN0LCBkZXN0KSA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVTZWxlY3RvcihpdGVtLCBkZXN0LCBkZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFNZTlRBWC5PQkpfUFJFRDpcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlT2JqZWN0UHJlZGljYXRlKGl0ZW0sIGRlc3QsIGRlc3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgU1lOVEFYLlBPU19QUkVEOlxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVQb3NQcmVkaWNhdGUoaXRlbSwgZGVzdCwgZGVzdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBTWU5UQVguQ09OQ0FUX0VYUFI6XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUNvbmNhdEV4cHIoaXRlbSwgZGVzdCwgZGVzdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlU2VsZWN0b3Ioc2VsLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgaWYoc2VsLnByb3ApIHtcbiAgICAgICAgICAgIHZhciBwcm9wU3RyID0gZXNjYXBlU3RyKHNlbC5wcm9wKSxcbiAgICAgICAgICAgICAgICByZXMgPSBhY3F1aXJlVmFyKCksIGkgPSBhY3F1aXJlVmFyKCksIGxlbiA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgICAgICBjdXJDdHggPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICAgICAgaiA9IGFjcXVpcmVWYXIoKSwgdmFsID0gYWNxdWlyZVZhcigpLCB0bXBBcnIgPSBhY3F1aXJlVmFyKCk7XG5cbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICByZXMsICc9IFtdOycsIGksICc9IDA7JywgbGVuLCAnPScsIGN0eCwgJy5sZW5ndGg7JywgdG1wQXJyLCAnPSBbXTsnLFxuICAgICAgICAgICAgICAgICd3aGlsZSgnLCBpLCAnPCcsIGxlbiwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgIGN1ckN0eCwgJz0nLCBjdHgsICdbJywgaSwgJysrXTsnLFxuICAgICAgICAgICAgICAgICAgICAnaWYoJywgY3VyQ3R4LCAnIT0gbnVsbCkgeycpO1xuICAgICAgICAgICAgaWYoc2VsLnByb3AgPT09ICcqJykge1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICdpZih0eXBlb2YgJywgY3VyQ3R4LCAnPT09IFwib2JqZWN0XCIpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZihpc0FycignLCBjdXJDdHgsICcpKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLCAnPScsIHJlcywgJy5jb25jYXQoJywgY3VyQ3R4LCAnKTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZWxzZSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZvcignLCBqLCAnIGluICcsIGN1ckN0eCwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWYoJywgY3VyQ3R4LCAnLmhhc093blByb3BlcnR5KCcsIGosICcpKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwsICc9JywgY3VyQ3R4LCAnWycsIGosICddOycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZUFwcGVuZFRvQXJyYXkocmVzLCB2YWwpO1xuICAgICAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnfScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsLCAnPScsIGN1ckN0eCwgJ1snLCBwcm9wU3RyLCAnXTsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZUFwcGVuZFRvQXJyYXkocmVzLCB2YWwsIHRtcEFyciwgbGVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICBkZXN0LCAnPScsIGxlbiwgJz4gMSAmJicsIHRtcEFyciwgJy5sZW5ndGg/JywgdG1wQXJyLCAnLmxlbmd0aCA+IDE/JyxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbmNhdC5hcHBseSgnLCByZXMsICcsJywgdG1wQXJyLCAnKSA6JywgcmVzLCAnLmNvbmNhdCgnLCB0bXBBcnIsICdbMF0pIDonLCByZXMsICc7Jyk7XG5cbiAgICAgICAgICAgIHJlbGVhc2VWYXJzKHJlcywgaSwgbGVuLCBjdXJDdHgsIGosIHZhbCwgdG1wQXJyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZURlc2NlbmRhbnRTZWxlY3RvcihzZWwsIGRlc3QsIGJhc2VDdHgpIHtcbiAgICAgICAgdmFyIHByb3AgPSBzZWwucHJvcCxcbiAgICAgICAgICAgIGN0eCA9IGFjcXVpcmVWYXIoKSwgY3VyQ3R4ID0gYWNxdWlyZVZhcigpLCBjaGlsZEN0eHMgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBpID0gYWNxdWlyZVZhcigpLCBqID0gYWNxdWlyZVZhcigpLCB2YWwgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBsZW4gPSBhY3F1aXJlVmFyKCksIHJlcyA9IGFjcXVpcmVWYXIoKTtcblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICBjdHgsICc9JywgYmFzZUN0eCwgJy5zbGljZSgpLCcsIHJlcywgJz0gW107JyxcbiAgICAgICAgICAgICd3aGlsZSgnLCBjdHgsICcubGVuZ3RoKSB7JyxcbiAgICAgICAgICAgICAgICBjdXJDdHgsICc9JywgY3R4LCAnLnNoaWZ0KCk7Jyk7XG4gICAgICAgIHByb3A/XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgJ2lmKHR5cGVvZiAnLCBjdXJDdHgsICc9PT0gXCJvYmplY3RcIiAmJicsIGN1ckN0eCwgJykgeycpIDpcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAnaWYodHlwZW9mICcsIGN1ckN0eCwgJyE9IG51bGwpIHsnKTtcbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBjaGlsZEN0eHMsICc9IFtdOycsXG4gICAgICAgICAgICAgICAgICAgICdpZihpc0FycignLCBjdXJDdHgsICcpKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGksICc9IDAsJywgbGVuLCAnPScsIGN1ckN0eCwgJy5sZW5ndGg7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd3aGlsZSgnLCBpLCAnPCcsIGxlbiwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLCAnPScsIGN1ckN0eCwgJ1snLCBpLCAnKytdOycpO1xuICAgICAgICBwcm9wICYmIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWYodHlwZW9mICcsIHZhbCwgJz09PSBcIm9iamVjdFwiKSB7Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZUFwcGVuZFRvQXJyYXkoY2hpbGRDdHhzLCB2YWwpO1xuICAgICAgICBwcm9wICYmIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScpO1xuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgJ2Vsc2UgeycpO1xuICAgICAgICBpZihwcm9wKSB7XG4gICAgICAgICAgICBpZihwcm9wICE9PSAnKicpIHtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwsICc9JywgY3VyQ3R4LCAnW1wiJyArIHByb3AgKyAnXCJdOycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVBcHBlbmRUb0FycmF5KHJlcywgY3VyQ3R4KTtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICdpZih0eXBlb2YgJywgY3VyQ3R4LCAnPT09IFwib2JqZWN0XCIpIHsnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZm9yKCcsIGosICcgaW4gJywgY3VyQ3R4LCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKCcsIGN1ckN0eCwgJy5oYXNPd25Qcm9wZXJ0eSgnLCBqLCAnKSkgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwsICc9JywgY3VyQ3R4LCAnWycsIGosICddOycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShjaGlsZEN0eHMsIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wID09PSAnKicgJiYgaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIHZhbCk7XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgIHByb3AgfHwgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkQ3R4cywgJy5sZW5ndGggJiYnLCBjdHgsICcudW5zaGlmdC5hcHBseSgnLCBjdHgsICcsJywgY2hpbGRDdHhzLCAnKTsnLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgIGRlc3QsICc9JywgcmVzLCAnOycpO1xuXG4gICAgICAgIHJlbGVhc2VWYXJzKGN0eCwgY3VyQ3R4LCBjaGlsZEN0eHMsIGksIGosIHZhbCwgbGVuLCByZXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZU9iamVjdFByZWRpY2F0ZShleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIHJlc1ZhciA9IGFjcXVpcmVWYXIoKSwgaSA9IGFjcXVpcmVWYXIoKSwgbGVuID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgY29uZCA9IGFjcXVpcmVWYXIoKSwgY3VySXRlbSA9IGFjcXVpcmVWYXIoKTtcblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICByZXNWYXIsICc9IFtdOycsXG4gICAgICAgICAgICBpLCAnPSAwOycsXG4gICAgICAgICAgICBsZW4sICc9JywgY3R4LCAnLmxlbmd0aDsnLFxuICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuLCAnKSB7JyxcbiAgICAgICAgICAgICAgICBjdXJJdGVtLCAnPScsIGN0eCwgJ1snLCBpLCAnKytdOycpO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoZXhwci5hcmcsIGNvbmQsIGN1ckl0ZW0pO1xuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgY29udmVydFRvQm9vbChleHByLmFyZywgY29uZCksICcmJicsIHJlc1ZhciwgJy5wdXNoKCcsIGN1ckl0ZW0sICcpOycsXG4gICAgICAgICAgICAnfScsXG4gICAgICAgICAgICBkZXN0LCAnPScsIHJlc1ZhciwgJzsnKTtcblxuICAgICAgICByZWxlYXNlVmFycyhyZXNWYXIsIGksIGxlbiwgY3VySXRlbSwgY29uZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlUG9zUHJlZGljYXRlKGl0ZW0sIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgYXJyYXlFeHByID0gaXRlbS5hcmcsIGZyb21JZHgsIHRvSWR4O1xuICAgICAgICBpZihhcnJheUV4cHIuaWR4KSB7XG4gICAgICAgICAgICB2YXIgaWR4ID0gYWNxdWlyZVZhcigpO1xuICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcnJheUV4cHIuaWR4LCBpZHgsIGN0eCk7XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgaWR4LCAnPCAwICYmICgnLCBpZHgsICc9JywgY3R4LCAnLmxlbmd0aCArJywgaWR4LCAnKTsnLFxuICAgICAgICAgICAgICAgIGRlc3QsICc9JywgY3R4LCAnWycsIGlkeCwgJ10gPT0gbnVsbD8gW10gOiBbJywgY3R4LCAnWycsIGlkeCwgJ11dOycpO1xuICAgICAgICAgICAgcmVsZWFzZVZhcnMoaWR4KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFycmF5RXhwci5mcm9tSWR4KSB7XG4gICAgICAgICAgICBpZihhcnJheUV4cHIudG9JZHgpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFycmF5RXhwci5mcm9tSWR4LCBmcm9tSWR4ID0gYWNxdWlyZVZhcigpLCBjdHgpO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJyYXlFeHByLnRvSWR4LCB0b0lkeCA9IGFjcXVpcmVWYXIoKSwgY3R4KTtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0nLCBjdHgsICcuc2xpY2UoJywgZnJvbUlkeCwgJywnLCB0b0lkeCwgJyk7Jyk7XG4gICAgICAgICAgICAgICAgcmVsZWFzZVZhcnMoZnJvbUlkeCwgdG9JZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcnJheUV4cHIuZnJvbUlkeCwgZnJvbUlkeCA9IGFjcXVpcmVWYXIoKSwgY3R4KTtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0nLCBjdHgsICcuc2xpY2UoJywgZnJvbUlkeCwgJyk7Jyk7XG4gICAgICAgICAgICAgICAgcmVsZWFzZVZhcnMoZnJvbUlkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFycmF5RXhwci50b0lkeCwgdG9JZHggPSBhY3F1aXJlVmFyKCksIGN0eCk7XG4gICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0nLCBjdHgsICcuc2xpY2UoMCwnLCB0b0lkeCwgJyk7Jyk7XG4gICAgICAgICAgICByZWxlYXNlVmFycyh0b0lkeCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVFeHByKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICBzd2l0Y2goZXhwci50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5QQVRIOlxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVBhdGgoZXhwciwgZGVzdCwgY3R4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguQ09OQ0FUX0VYUFI6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlQ29uY2F0RXhwcihleHByLCBkZXN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5DT01QQVJJU09OX0VYUFI6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlQ29tcGFyaXNvbkV4cHIoZXhwciwgZGVzdCwgY3R4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguTUFUSF9FWFBSOlxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZU1hdGhFeHByKGV4cHIsIGRlc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkxPR0lDQUxfRVhQUjpcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVMb2dpY2FsRXhwcihleHByLCBkZXN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5VTkFSWV9FWFBSOlxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVVuYXJ5RXhwcihleHByLCBkZXN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5MSVRFUkFMOlxuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPScpO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUxpdGVyYWwoZXhwci52YWwpO1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaCgnOycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlTGl0ZXJhbCh2YWwpIHtcbiAgICAgICAgYm9keS5wdXNoKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnPyBlc2NhcGVTdHIodmFsKSA6IHZhbCA9PT0gbnVsbD8gJ251bGwnIDogdmFsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVDb21wYXJpc29uRXhwcihleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIHZhbDEgPSBhY3F1aXJlVmFyKCksIHZhbDIgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBpc1ZhbDFBcnJheSA9IGFjcXVpcmVWYXIoKSwgaXNWYWwyQXJyYXkgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBpID0gYWNxdWlyZVZhcigpLCBqID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgbGVuMSA9IGFjcXVpcmVWYXIoKSwgbGVuMiA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGxlZnRBcmcgPSBleHByLmFyZ3NbMF0sIHJpZ2h0QXJnID0gZXhwci5hcmdzWzFdO1xuXG4gICAgICAgIGJvZHkucHVzaChkZXN0LCAnPSBmYWxzZTsnKTtcblxuICAgICAgICB0cmFuc2xhdGVFeHByKGxlZnRBcmcsIHZhbDEsIGN0eCk7XG4gICAgICAgIHRyYW5zbGF0ZUV4cHIocmlnaHRBcmcsIHZhbDIsIGN0eCk7XG5cbiAgICAgICAgdmFyIGlzTGVmdEFyZ1BhdGggPSBsZWZ0QXJnLnR5cGUgPT09IFNZTlRBWC5QQVRILFxuICAgICAgICAgICAgaXNSaWdodEFyZ0xpdGVyYWwgPSByaWdodEFyZy50eXBlID09PSBTWU5UQVguTElURVJBTDtcblxuICAgICAgICBib2R5LnB1c2goaXNWYWwxQXJyYXksICc9Jyk7XG4gICAgICAgIGlzTGVmdEFyZ1BhdGg/IGJvZHkucHVzaCgndHJ1ZTsnKSA6IGJvZHkucHVzaCgnaXNBcnIoJywgdmFsMSwgJyk7Jyk7XG5cbiAgICAgICAgYm9keS5wdXNoKGlzVmFsMkFycmF5LCAnPScpO1xuICAgICAgICBpc1JpZ2h0QXJnTGl0ZXJhbD8gYm9keS5wdXNoKCdmYWxzZTsnKSA6IGJvZHkucHVzaCgnaXNBcnIoJywgdmFsMiwgJyk7Jyk7XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgJ2lmKCcpO1xuICAgICAgICBpc0xlZnRBcmdQYXRoIHx8IGJvZHkucHVzaChpc1ZhbDFBcnJheSwgJyYmJyk7XG4gICAgICAgIGJvZHkucHVzaCh2YWwxLCAnLmxlbmd0aCA9PT0gMSkgeycsXG4gICAgICAgICAgICAgICAgdmFsMSwgJz0nLCB2YWwxLCAnWzBdOycsXG4gICAgICAgICAgICAgICAgaXNWYWwxQXJyYXksICc9IGZhbHNlOycsXG4gICAgICAgICAgICAnfScpO1xuICAgICAgICBpc1JpZ2h0QXJnTGl0ZXJhbCB8fCBib2R5LnB1c2goXG4gICAgICAgICAgICAnaWYoJywgaXNWYWwyQXJyYXksICcmJicsIHZhbDIsICcubGVuZ3RoID09PSAxKSB7JyxcbiAgICAgICAgICAgICAgICB2YWwyLCAnPScsIHZhbDIsICdbMF07JyxcbiAgICAgICAgICAgICAgICBpc1ZhbDJBcnJheSwgJz0gZmFsc2U7JyxcbiAgICAgICAgICAgICd9Jyk7XG5cbiAgICAgICAgYm9keS5wdXNoKGksICc9IDA7JyxcbiAgICAgICAgICAgICdpZignLCBpc1ZhbDFBcnJheSwgJykgeycsXG4gICAgICAgICAgICAgICAgbGVuMSwgJz0nLCB2YWwxLCAnLmxlbmd0aDsnKTtcblxuICAgICAgICBpZighaXNSaWdodEFyZ0xpdGVyYWwpIHtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAnaWYoJywgaXNWYWwyQXJyYXksICcpIHsnLFxuICAgICAgICAgICAgICAgICAgICBsZW4yLCAnPScsIHZhbDIsICcubGVuZ3RoOycsXG4gICAgICAgICAgICAgICAgICAgICd3aGlsZSgnLCBpLCAnPCcsIGxlbjEsICcmJiAhJywgZGVzdCwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICBqLCAnPSAwOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnd2hpbGUoJywgaiwgJzwnLCBsZW4yLCAnKSB7Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVDb25kaXRpb24oZXhwci5vcCwgW3ZhbDEsICdbJywgaSwgJ10nXS5qb2luKCcnKSwgW3ZhbDIsICdbJywgaiwgJ10nXS5qb2luKCcnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0LCAnPSB0cnVlOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdicmVhazsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnKysnLCBqLCAnOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnKysnLCBpLCAnOycsXG4gICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgJ2Vsc2UgeycpO1xuICAgICAgICB9XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuMSwgJykgeycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVDb25kaXRpb24oZXhwci5vcCwgW3ZhbDEsICdbJywgaSwgJ10nXS5qb2luKCcnKSwgdmFsMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdCwgJz0gdHJ1ZTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdicmVhazsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJysrJywgaSwgJzsnLFxuICAgICAgICAgICAgICAgICAgICAnfScpO1xuXG4gICAgICAgIGlzUmlnaHRBcmdMaXRlcmFsIHx8IGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAnfScpO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICd9Jyk7XG5cbiAgICAgICAgaWYoIWlzUmlnaHRBcmdMaXRlcmFsKSB7XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAnZWxzZSBpZignLCBpc1ZhbDJBcnJheSwnKSB7JyxcbiAgICAgICAgICAgICAgICBsZW4yLCAnPScsIHZhbDIsICcubGVuZ3RoOycsXG4gICAgICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuMiwgJykgeycpO1xuICAgICAgICAgICAgICAgICAgICB3cml0ZUNvbmRpdGlvbihleHByLm9wLCB2YWwxLCBbdmFsMiwgJ1snLCBpLCAnXSddLmpvaW4oJycpKTtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3QsICc9IHRydWU7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdicmVhazsnLFxuICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICcrKycsIGksICc7JyxcbiAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAnfScpO1xuICAgICAgICB9XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgJ2Vsc2UgeycsXG4gICAgICAgICAgICAgICAgZGVzdCwgJz0nLCBiaW5hcnlPcGVyYXRvcnNbZXhwci5vcF0odmFsMSwgdmFsMiksICc7JyxcbiAgICAgICAgICAgICd9Jyk7XG5cbiAgICAgICAgcmVsZWFzZVZhcnModmFsMSwgdmFsMiwgaXNWYWwxQXJyYXksIGlzVmFsMkFycmF5LCBpLCBqLCBsZW4xLCBsZW4yKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3cml0ZUNvbmRpdGlvbihvcCwgdmFsMUV4cHIsIHZhbDJFeHByKSB7XG4gICAgICAgIGJvZHkucHVzaCgnaWYoJywgYmluYXJ5T3BlcmF0b3JzW29wXSh2YWwxRXhwciwgdmFsMkV4cHIpLCAnKSB7Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlTG9naWNhbEV4cHIoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciBjb25kaXRpb25WYXJzID0gW10sXG4gICAgICAgICAgICBhcmdzID0gZXhwci5hcmdzLCBsZW4gPSBhcmdzLmxlbmd0aCxcbiAgICAgICAgICAgIGkgPSAwLCB2YWw7XG5cbiAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9IGZhbHNlOycpO1xuICAgICAgICBzd2l0Y2goZXhwci5vcCkge1xuICAgICAgICAgICAgY2FzZSAnJiYnOlxuICAgICAgICAgICAgICAgIHdoaWxlKGkgPCBsZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uVmFycy5wdXNoKHZhbCA9IGFjcXVpcmVWYXIoKSk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnc1tpXSwgdmFsLCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBib2R5LnB1c2goJ2lmKCcsIGNvbnZlcnRUb0Jvb2woYXJnc1tpKytdLCB2YWwpLCAnKSB7Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPSB0cnVlOycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd8fCc6XG4gICAgICAgICAgICAgICAgd2hpbGUoaSA8IGxlbikge1xuICAgICAgICAgICAgICAgICAgICBjb25kaXRpb25WYXJzLnB1c2godmFsID0gYWNxdWlyZVZhcigpKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcmdzW2ldLCB2YWwsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICdpZignLCBjb252ZXJ0VG9Cb29sKGFyZ3NbaV0sIHZhbCksICcpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3QsICc9IHRydWU7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGkrKyArIDEgPCBsZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaCgnZWxzZSB7Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLS1sZW47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZShsZW4tLSkge1xuICAgICAgICAgICAgYm9keS5wdXNoKCd9Jyk7XG4gICAgICAgIH1cblxuICAgICAgICByZWxlYXNlVmFycy5hcHBseShudWxsLCBjb25kaXRpb25WYXJzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVNYXRoRXhwcihleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIHZhbDEgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICB2YWwyID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgYXJncyA9IGV4cHIuYXJncztcblxuICAgICAgICB0cmFuc2xhdGVFeHByKGFyZ3NbMF0sIHZhbDEsIGN0eCk7XG4gICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnc1sxXSwgdmFsMiwgY3R4KTtcblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICBkZXN0LCAnPScsXG4gICAgICAgICAgICBiaW5hcnlPcGVyYXRvcnNbZXhwci5vcF0oXG4gICAgICAgICAgICAgICAgY29udmVydFRvU2luZ2xlVmFsdWUoYXJnc1swXSwgdmFsMSksXG4gICAgICAgICAgICAgICAgY29udmVydFRvU2luZ2xlVmFsdWUoYXJnc1sxXSwgdmFsMikpLFxuICAgICAgICAgICAgJzsnKTtcblxuICAgICAgICByZWxlYXNlVmFycyh2YWwxLCB2YWwyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVVbmFyeUV4cHIoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciB2YWwgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBhcmcgPSBleHByLmFyZztcblxuICAgICAgICB0cmFuc2xhdGVFeHByKGFyZywgdmFsLCBjdHgpO1xuXG4gICAgICAgIHN3aXRjaChleHByLm9wKSB7XG4gICAgICAgICAgICBjYXNlICchJzpcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0gIScsIGNvbnZlcnRUb0Jvb2woYXJnLCB2YWwpICsgJzsnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnLSc6XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9IC0nLCBjb252ZXJ0VG9TaW5nbGVWYWx1ZShhcmcsIHZhbCkgKyAnOycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVsZWFzZVZhcnModmFsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVDb25jYXRFeHByKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgYXJnVmFycyA9IFtdLFxuICAgICAgICAgICAgYXJncyA9IGV4cHIuYXJncyxcbiAgICAgICAgICAgIGxlbiA9IGFyZ3MubGVuZ3RoLFxuICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgd2hpbGUoaSA8IGxlbikge1xuICAgICAgICAgICAgYXJnVmFycy5wdXNoKGFjcXVpcmVWYXIoKSk7XG4gICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFyZ3NbaV0sIGFyZ1ZhcnNbaSsrXSwgY3R4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJvZHkucHVzaChkZXN0LCAnPSBjb25jYXQuY2FsbCgnLCBhcmdWYXJzLmpvaW4oJywnKSwgJyk7Jyk7XG5cbiAgICAgICAgcmVsZWFzZVZhcnMuYXBwbHkobnVsbCwgYXJnVmFycyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXNjYXBlU3RyKHMpIHtcbiAgICAgICAgcmV0dXJuICdcXCcnICsgcy5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpLnJlcGxhY2UoLycvZywgJ1xcXFxcXCcnKSArICdcXCcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlubGluZUFwcGVuZFRvQXJyYXkocmVzLCB2YWwsIHRtcEFyciwgbGVuKSB7XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICdpZih0eXBlb2YgJywgdmFsLCAnIT09IFwidW5kZWZpbmVkXCIpIHsnLFxuICAgICAgICAgICAgICAgICdpZihpc0FycignLCB2YWwsICcpKSB7Jyk7XG4gICAgICAgIGlmKHRtcEFycikge1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBsZW4sICc+IDE/Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVQdXNoVG9BcnJheSh0bXBBcnIsIHZhbCk7XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAnOicpO1xuICAgICAgICB9XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgcmVzLCAnPScsIHJlcywgJy5sZW5ndGg/JywgcmVzLCAnLmNvbmNhdCgnLCB2YWwsICcpIDonLCB2YWwsICcuc2xpY2UoKScsICc7JyxcbiAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgJ2Vsc2UgeycpO1xuICAgICAgICB0bXBBcnIgJiYgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAnaWYoJywgdG1wQXJyLCAnLmxlbmd0aCkgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMsICc9IGNvbmNhdC5hcHBseSgnLCByZXMsICcsJywgdG1wQXJyLCAnKTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wQXJyLCAnPSBbXTsnLFxuICAgICAgICAgICAgICAgICAgICAnfScpO1xuICAgICAgICAgICAgICAgICAgICBpbmxpbmVQdXNoVG9BcnJheShyZXMsIHZhbCk7XG4gICAgICAgIGJvZHkucHVzaCgnOycsXG4gICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgJ30nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbmxpbmVQdXNoVG9BcnJheShyZXMsIHZhbCkge1xuICAgICAgICBib2R5LnB1c2gocmVzLCAnLmxlbmd0aD8nLCByZXMsICcucHVzaCgnLCB2YWwsICcpIDonLCAgcmVzLCAnWzBdID0nLCB2YWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbnZlcnRUb0Jvb2woYXJnLCB2YXJOYW1lKSB7XG4gICAgICAgIHN3aXRjaChhcmcudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTWU5UQVguTE9HSUNBTF9FWFBSOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YXJOYW1lO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5MSVRFUkFMOlxuICAgICAgICAgICAgICAgIHJldHVybiAnISEnICsgdmFyTmFtZTtcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguUEFUSDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyTmFtZSArICcubGVuZ3RoID4gMCc7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnKHR5cGVvZiAnLCB2YXJOYW1lLCAnPT09IFwiYm9vbGVhblwiPycsXG4gICAgICAgICAgICAgICAgICAgIHZhck5hbWUsICc6JyxcbiAgICAgICAgICAgICAgICAgICAgJ2lzQXJyKCcsIHZhck5hbWUsICcpPycsIHZhck5hbWUsICcubGVuZ3RoID4gMCA6ICEhJywgdmFyTmFtZSwgJyknXS5qb2luKCcnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbnZlcnRUb1NpbmdsZVZhbHVlKGFyZywgdmFyTmFtZSkge1xuICAgICAgICBzd2l0Y2goYXJnLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkxJVEVSQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhck5hbWU7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLlBBVEg6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhck5hbWUgKyAnWzBdJztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gWycoaXNBcnIoJywgdmFyTmFtZSwgJyk/JywgdmFyTmFtZSwgJ1swXSA6ICcsIHZhck5hbWUsICcpJ10uam9pbignJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGFydHNXaXRoU3RyaWN0KHZhbDEsIHZhbDIpIHtcbiAgICAgICAgcmV0dXJuIFsndHlwZW9mICcsIHZhbDEsICc9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgJywgdmFsMiwgJz09PSBcInN0cmluZ1wiICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcuaW5kZXhPZignLCB2YWwyLCAnKSA9PT0gMCddLmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0YXJ0c1dpdGgodmFsMSwgdmFsMikge1xuICAgICAgICByZXR1cm4gW3ZhbDEsICchPSBudWxsICYmJywgdmFsMiwgJyE9IG51bGwgJiYnLFxuICAgICAgICAgICAgdmFsMSwgJy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignLCB2YWwyLCAnLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkgPT09IDAnXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRzV2l0aFN0cmljdCh2YWwxLCB2YWwyKSB7XG4gICAgICAgIHJldHVybiBbJ3R5cGVvZiAnLCB2YWwxLCAnPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mICcsIHZhbDIsICc9PT0gXCJzdHJpbmdcIiAmJicsXG4gICAgICAgICAgICB2YWwxLCAnLmxlbmd0aCA+PScsIHZhbDIsICcubGVuZ3RoICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcubGFzdEluZGV4T2YoJywgdmFsMiwgJykgPT09JywgdmFsMSwgJy5sZW5ndGggLScsIHZhbDIsICcubGVuZ3RoJ10uam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kc1dpdGgodmFsMSwgdmFsMikge1xuICAgICAgICByZXR1cm4gW3ZhbDEsICchPSBudWxsICYmJywgdmFsMiwgJyE9IG51bGwgJiYnLFxuICAgICAgICAgICAgJygnLCB2YWwxLCAnPScsIHZhbDEsICcudG9TdHJpbmcoKSkubGVuZ3RoID49JywgJygnLCB2YWwyLCAnPScsIHZhbDIsICcudG9TdHJpbmcoKSkubGVuZ3RoICYmJyxcbiAgICAgICAgICAgICcoJywgdmFsMSwgJy50b0xvd2VyQ2FzZSgpKS5sYXN0SW5kZXhPZignLCAnKCcsIHZhbDIsICcudG9Mb3dlckNhc2UoKSkpID09PScsXG4gICAgICAgICAgICB2YWwxLCAnLmxlbmd0aCAtJywgdmFsMiwgJy5sZW5ndGgnXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb250YWluc1N0cmljdCh2YWwxLCB2YWwyKSB7XG4gICAgICAgIHJldHVybiBbJ3R5cGVvZiAnLCB2YWwxLCAnPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mICcsIHZhbDIsICc9PT0gXCJzdHJpbmdcIiAmJicsXG4gICAgICAgICAgICB2YWwxLCAnLmluZGV4T2YoJywgdmFsMiwgJykgPiAtMSddLmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbnRhaW5zKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgcmV0dXJuIFt2YWwxLCAnIT0gbnVsbCAmJiAnLCB2YWwyLCAnIT0gbnVsbCAmJicsXG4gICAgICAgICAgICB2YWwxLCAnLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKCcsIHZhbDIsICcudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSA+IC0xJ10uam9pbignJyk7XG4gICAgfVxuXG4gICAgdmFyIGJpbmFyeU9wZXJhdG9ycyA9IHtcbiAgICAgICAgICAgICc9PT0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJz09PScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJz09JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWyd0eXBlb2YgJywgdmFsMSwgJz09PSBcInN0cmluZ1wiICYmIHR5cGVvZiAnLCB2YWwyLCAnPT09IFwic3RyaW5nXCI/JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsMSwgJy50b0xvd2VyQ2FzZSgpID09PScsIHZhbDIsICcudG9Mb3dlckNhc2UoKSA6JyArXG4gICAgICAgICAgICAgICAgICAgIHZhbDEsICc9PScsIHZhbDJdLmpvaW4oJycpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJz49JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICc+PScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJz4nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJz4nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICc8PScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnPD0nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICc8JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICc8JyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnIT09JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICchPT0nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICchPScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnIT0nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICdePT0nIDogc3RhcnRzV2l0aFN0cmljdCxcblxuICAgICAgICAgICAgJz09XicgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0c1dpdGhTdHJpY3QodmFsMiwgdmFsMSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnXj0nIDogc3RhcnRzV2l0aCxcblxuICAgICAgICAgICAgJz1eJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhcnRzV2l0aCh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICckPT0nIDogZW5kc1dpdGhTdHJpY3QsXG5cbiAgICAgICAgICAgICc9PSQnIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbmRzV2l0aFN0cmljdCh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICckPScgOiBlbmRzV2l0aCxcblxuICAgICAgICAgICAgJz0kJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW5kc1dpdGgodmFsMiwgdmFsMSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnKj09JyA6IGNvbnRhaW5zU3RyaWN0LFxuXG4gICAgICAgICAgICAnPT0qJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbnNTdHJpY3QodmFsMiwgdmFsMSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnPSonIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWlucyh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICcqPScgOiBjb250YWlucyxcblxuICAgICAgICAgICAgJysnIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJysnICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICctJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICctJyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnKicgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnKicgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJy8nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJy8nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICclJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICclJyArIHZhbDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICByZXR1cm4gdHJhbnNsYXRlO1xufSkoKTtcblxuZnVuY3Rpb24gY29tcGlsZShwYXRoKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uKCdkYXRhLHN1YnN0JywgdHJhbnNsYXRlKHBhcnNlKHBhdGgpKSk7XG59XG5cbnZhciBjYWNoZSA9IHt9LFxuICAgIGNhY2hlS2V5cyA9IFtdLFxuICAgIHBhcmFtcyA9IHtcbiAgICAgICAgY2FjaGVTaXplIDogMTAwXG4gICAgfSxcbiAgICBzZXRQYXJhbXNIb29rcyA9IHtcbiAgICAgICAgY2FjaGVTaXplIDogZnVuY3Rpb24ob2xkVmFsLCBuZXdWYWwpIHtcbiAgICAgICAgICAgIGlmKG5ld1ZhbCA8IG9sZFZhbCAmJiBjYWNoZUtleXMubGVuZ3RoID4gbmV3VmFsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlbW92ZWRLZXlzID0gY2FjaGVLZXlzLnNwbGljZSgwLCBjYWNoZUtleXMubGVuZ3RoIC0gbmV3VmFsKSxcbiAgICAgICAgICAgICAgICAgICAgaSA9IHJlbW92ZWRLZXlzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIHdoaWxlKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY2FjaGVbcmVtb3ZlZEtleXNbaV1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbnZhciBkZWNsID0gZnVuY3Rpb24ocGF0aCwgY3R4LCBzdWJzdHMpIHtcbiAgICBpZighY2FjaGVbcGF0aF0pIHtcbiAgICAgICAgY2FjaGVbcGF0aF0gPSBjb21waWxlKHBhdGgpO1xuICAgICAgICBpZihjYWNoZUtleXMucHVzaChwYXRoKSA+IHBhcmFtcy5jYWNoZVNpemUpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjYWNoZVtjYWNoZUtleXMuc2hpZnQoKV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2FjaGVbcGF0aF0oY3R4LCBzdWJzdHMgfHwge30pO1xufTtcblxuZGVjbC52ZXJzaW9uID0gJzAuNC4wJztcblxuZGVjbC5wYXJhbXMgPSBmdW5jdGlvbihfcGFyYW1zKSB7XG4gICAgaWYoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG5cbiAgICBmb3IodmFyIG5hbWUgaW4gX3BhcmFtcykge1xuICAgICAgICBpZihfcGFyYW1zLmhhc093blByb3BlcnR5KG5hbWUpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgICAgICAgICBzZXRQYXJhbXNIb29rc1tuYW1lXSAmJiBzZXRQYXJhbXNIb29rc1tuYW1lXShwYXJhbXNbbmFtZV0sIF9wYXJhbXNbbmFtZV0pO1xuICAgICAgICAgICAgcGFyYW1zW25hbWVdID0gX3BhcmFtc1tuYW1lXTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmRlY2wuY29tcGlsZSA9IGNvbXBpbGU7XG5cbmRlY2wuYXBwbHkgPSBkZWNsO1xuXG5pZih0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBkZWNsO1xufVxuZWxzZSBpZih0eXBlb2YgbW9kdWxlcyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGVzLmRlZmluZSgnanNwYXRoJywgZnVuY3Rpb24ocHJvdmlkZSkge1xuICAgICAgICBwcm92aWRlKGRlY2wpO1xuICAgIH0pO1xufVxuZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uKHJlcXVpcmUsIGV4cG9ydHMsIG1vZHVsZSkge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGRlY2w7XG4gICAgfSk7XG59XG5lbHNlIHtcbiAgICB3aW5kb3cuSlNQYXRoID0gZGVjbDtcbn1cblxufSkoKTtcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogRVM2IEVYVEVOU0lPTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaWYoIVN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aClcbntcblx0U3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoID0gZnVuY3Rpb24ocylcblx0e1xuXHRcdGNvbnN0IGJhc2UgPSAweDAwMDAwMDAwMDAwMDAwMDAwMDAwO1xuXG5cdFx0cmV0dXJuIHRoaXMuaW5kZXhPZihzLCBiYXNlKSA9PT0gYmFzZTtcblx0fTtcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmlmKCFTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoKVxue1xuXHRTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoID0gZnVuY3Rpb24ocylcblx0e1xuXHRcdGNvbnN0IGJhc2UgPSB0aGlzLmxlbmd0aCAtIHMubGVuZ3RoO1xuXG5cdFx0cmV0dXJuIHRoaXMuaW5kZXhPZihzLCBiYXNlKSA9PT0gYmFzZTtcblx0fTtcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmlmKCFTdHJpbmcucHJvdG90eXBlLmhhc2hDb2RlKVxue1xuXHRTdHJpbmcucHJvdG90eXBlLmhhc2hDb2RlID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGhhc2ggPSAwO1xuXG5cdFx0Y29uc3QgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspXG5cdFx0e1xuXHRcdFx0aGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgdGhpcy5jaGFyQ29kZUF0KGkpO1xuXG5cdFx0XHRoYXNoIHw9IDA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGhhc2ggPCAwID8gLWhhc2hcblx0XHRcdFx0XHRcdDogK2hhc2hcblx0XHQ7XG5cdH07XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogSlFVRVJZIEVYVEVOU0lPTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuY29uc3QgX2FtaV9pbnRlcm5hbF9qUXVlcnlBamF4ID0galF1ZXJ5LmFqYXg7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5qUXVlcnkuYWpheCA9IGZ1bmN0aW9uKHNldHRpbmdzKVxue1xuXHRpZih0eXBlb2Ygc2V0dGluZ3MgPT09ICdvYmplY3QnXG5cdCAgICYmXG5cdCAgIHNldHRpbmdzLmRhdGFUeXBlID09PSAnc2hlZXQnXG5cdCApIHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dCwgdXJsXSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnY29udGV4dCcsICd1cmwnXSxcblx0XHRcdFtyZXN1bHQsICcnXSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodXJsKVxuXHRcdHtcblx0XHRcdCQoJ2hlYWQnKS5hcHBlbmQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiJyArIHVybCArICdcIj48L2xpbms+JykucHJvbWlzZSgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH1cblx0ZWxzZVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIF9hbWlfaW50ZXJuYWxfalF1ZXJ5QWpheC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuY29uc3QgX2FtaV9pbnRlcm5hbF9qUXVlcnlWYWwgPSBqUXVlcnkuZm4udmFsO1xuY29uc3QgX2FtaV9pbnRlcm5hbF9qUXVlcnlSZW1vdmUgPSBqUXVlcnkuZm4ucmVtb3ZlO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuY29uc3QgX2FtaV9pbnRlcm5hbF9yZW1vdmVFdnQgPSBuZXcgJC5FdmVudCgncmVtb3ZlJyk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmaW5kV2l0aFNlbGY6IGZ1bmN0aW9uKHNlbGVjdG9yKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZmluZChzZWxlY3RvcikuYWRkQmFjayhzZWxlY3Rvcik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXJpYWxpemVPYmplY3Q6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IHt9O1xuXG5cdFx0dGhpcy5zZXJpYWxpemVBcnJheSgpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0aWYoaXRlbS5uYW1lIGluIHJlc3VsdClcblx0XHRcdHtcblx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHJlc3VsdFtpdGVtLm5hbWVdKSA9PT0gJ1tvYmplY3QgU3RyaW5nXScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHRbaXRlbS5uYW1lXSA9IFtyZXN1bHRbaXRlbS5uYW1lXV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXN1bHRbaXRlbS5uYW1lXS5wdXNoKGl0ZW0udmFsdWUgfHwgJycpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHRbaXRlbS5uYW1lXSA9IGl0ZW0udmFsdWUgfHwgJyc7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dmFsOiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKiovIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIC8vIGdldHRlclxuXHRcdHtcblx0XHRcdGlmKHRoaXMuaGFzQ2xhc3MoJ2Zvcm0tZWRpdG9yLWhpZGRlbicpKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBzZXNzaW9uID0gdGhpcy5kYXRhKCdzZXNzaW9uJyk7XG5cblx0XHRcdFx0cmV0dXJuIHNlc3Npb24gPyBzZXNzaW9uLmdldFZhbHVlKCkgOiAnJztcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAxKSAvLyBzZXR0ZXJcblx0XHR7XG5cdFx0XHRpZih0aGlzLmhhc0NsYXNzKCdmb3JtLWVkaXRvci1oaWRkZW4nKSlcblx0XHRcdHtcblx0XHRcdFx0Y29uc3Qgc2Vzc2lvbiA9IHRoaXMuZGF0YSgnc2Vzc2lvbicpO1xuXG5cdFx0XHRcdGlmKHNlc3Npb24pIHNlc3Npb24uc2V0VmFsdWUoYXJndW1lbnRzWzBdKTsgcmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIF9hbWlfaW50ZXJuYWxfalF1ZXJ5VmFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW1vdmU6IGZ1bmN0aW9uKClcblx0e1xuXHRcdCQodGhpcykudHJpZ2dlcihfYW1pX2ludGVybmFsX3JlbW92ZUV2dCk7XG5cblx0XHRyZXR1cm4gX2FtaV9pbnRlcm5hbF9qUXVlcnlSZW1vdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogQk9PVFNUUkFQIEVYVEVOU0lPTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxubGV0IF9hbWlfaW50ZXJuYWxfbW9kYWxaSW5kZXggPSAxMDUwO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJChkb2N1bWVudCkub24oJ3Nob3cuYnMubW9kYWwnLCAnLm1vZGFsJywgKGUpID0+IHtcblxuXHRjb25zdCBlbCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblxuXHRzZXRUaW1lb3V0KCgpID0+IHtcblxuXHRcdCQoJ2JvZHkgPiAubW9kYWwtYmFja2Ryb3A6bGFzdCcpLmNzcygnei1pbmRleCcsIF9hbWlfaW50ZXJuYWxfbW9kYWxaSW5kZXgrKyk7XG5cdFx0LyotLS0tLS0tLS0tLSovZWwvKi0tLS0tLS0tLS0tKi8uY3NzKCd6LWluZGV4JywgX2FtaV9pbnRlcm5hbF9tb2RhbFpJbmRleCsrKTtcblxuXHR9LCAxMCk7XG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIE5BTUVTUEFDRSBIRUxQRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIF8kY3JlYXRlTmFtZXNwYWNlKCRuYW1lLCB4KVxue1xuXHRsZXQgcGFyZW50ID0gd2luZG93O1xuXG5cdGNvbnN0IHBhcnRzID0gJG5hbWUuc3BsaXQoL1xccypcXC5cXHMqL2cpLCBsID0gcGFydHMubGVuZ3RoIC0gMTtcblxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbDsgaSsrKVxuXHR7XG5cdFx0aWYocGFyZW50W3BhcnRzW2ldXSlcblx0XHR7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cGFyZW50ID0gcGFyZW50W3BhcnRzW2ldXSA9IHt9O1xuXHRcdH1cblx0fVxuXG5cdHBhcmVudFtwYXJ0c1tpXV0gPSB4O1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZnVuY3Rpb24gXyRhZGRUb05hbWVzcGFjZSgkbmFtZSwgeClcbntcblx0bGV0IHBhcmVudCA9IHdpbmRvdztcblxuXHRjb25zdCBwYXJ0cyA9ICRuYW1lLnNwbGl0KC9cXHMqXFwuXFxzKi9nKSwgbCA9IHBhcnRzLmxlbmd0aCAtIDE7XG5cblx0Zm9yKHZhciBpID0gMDsgaSA8IGw7IGkrKylcblx0e1xuXHRcdGlmKHBhcmVudFtwYXJ0c1tpXV0pXG5cdFx0e1xuXHRcdFx0cGFyZW50ID0gcGFyZW50W3BhcnRzW2ldXTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRocm93ICdgJyArICRuYW1lICsgJ2AgKGAnICsgcGFydHNbaV0gKyAnYCkgbm90IGRlY2xhcmVkJztcblx0XHR9XG5cdH1cblxuXHRwYXJlbnRbcGFydHNbaV1dID0geDtcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBOQU1FU1BBQ0VTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAgKiBDcmVhdGUgYSBuZXcgbmFtZXNwYWNlXG4gICogQHBhcmFtIHtTdHJpbmd9ICRuYW1lIHRoZSBuYW1lc3BhY2UgbmFtZVxuICAqIEBwYXJhbSB7T2JqZWN0fSBbJGRlc2NyXSB0aGUgbmFtZXNwYWNlIGJvZHlcbiAgKi9cblxuZnVuY3Rpb24gJEFNSU5hbWVzcGFjZSgkbmFtZSwgJGRlc2NyKVxue1xuXHRpZighJGRlc2NyKVxuXHR7XG5cdFx0JGRlc2NyID0ge307XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRkZXNjci4kbmFtZSA9ICRuYW1lO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XyRjcmVhdGVOYW1lc3BhY2UoJG5hbWUsICRkZXNjcik7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpZigkZGVzY3IuJClcblx0e1xuXHRcdCRkZXNjci4kLmFwcGx5KCRkZXNjcik7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIElOVEVSRkFDRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICAqIENyZWF0ZSBhIG5ldyBpbnRlcmZhY2VcbiAgKiBAcGFyYW0ge1N0cmluZ30gJG5hbWUgdGhlIGludGVyZmFjZSBuYW1lXG4gICogQHBhcmFtIHtPYmplY3R9IFskZGVzY3JdIHRoZSBpbnRlcmZhY2UgYm9keVxuICAqL1xuXG5mdW5jdGlvbiAkQU1JSW50ZXJmYWNlKCRuYW1lLCAkZGVzY3IpXG57XG5cdGlmKCEkZGVzY3IpXG5cdHtcblx0XHQkZGVzY3IgPSB7fTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y29uc3QgJGNsYXNzID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhyb3cgJ2NvdWxkIG5vciBpbnN0YW50aWF0ZSBpbnRlcmZhY2UnO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0aWYoJGRlc2NyLiRleHRlbmRzKVxuXHR7XG5cdFx0dGhyb3cgJ2AkZXh0ZW5kc2Agbm90IGFsbG93ZWQgZm9yIGludGVyZmFjZSc7XG5cdH1cblxuXHRpZigkZGVzY3IuJGltcGxlbWVudHMpXG5cdHtcblx0XHR0aHJvdyAnYCRpbXBsZW1lbnRzYCBub3QgYWxsb3dlZCBmb3IgaW50ZXJmYWNlJztcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0aWYoJGRlc2NyLiQpXG5cdHtcblx0XHR0aHJvdyAnYCRgIG5vdCBhbGxvd2VkIGZvciBpbnRlcmZhY2UnO1xuXHR9XG5cblx0aWYoJGRlc2NyLiRpbml0KVxuXHR7XG5cdFx0dGhyb3cgJ2AkaW5pdGAgbm90IGFsbG93ZWQgZm9yIGludGVyZmFjZSc7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRjbGFzcy4kbmFtZSA9ICRuYW1lO1xuXHQkY2xhc3MuJGNsYXNzID0gJGNsYXNzO1xuXHQkY2xhc3MuJG1lbWJlcnMgPSAkZGVzY3I7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfJGFkZFRvTmFtZXNwYWNlKCRuYW1lLCAkY2xhc3MpO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogQ0xBU1NFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gICogQ3JlYXRlIGEgbmV3IGNsYXNzXG4gICogQHBhcmFtIHtTdHJpbmd9ICRuYW1lIHRoZSBjbGFzcyBuYW1lXG4gICogQHBhcmFtIHtPYmplY3R9IFskZGVzY3JdIHRoZSBjbGFzcyBib2R5XG4gICovXG5cbmZ1bmN0aW9uICRBTUlDbGFzcygkbmFtZSwgJGRlc2NyKVxue1xuXHRpZighJGRlc2NyKVxuXHR7XG5cdFx0JGRlc2NyID0ge307XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNvbnN0ICRzdXBlciA9ICgkZGVzY3IuJGV4dGVuZHMgaW5zdGFuY2VvZiBGdW5jdGlvbikgPyAkZGVzY3IuJGV4dGVuZHMucHJvdG90eXBlIDoge307XG5cblx0Y29uc3QgJHN1cGVyX2ltcGxlbWVudHMgPSAoJHN1cGVyLiRpbXBsZW1lbnRzIGluc3RhbmNlb2YgQXJyYXkpID8gJHN1cGVyLiRpbXBsZW1lbnRzIDogW107XG5cdGNvbnN0ICRkZXNjcl9pbXBsZW1lbnRzID0gKCRkZXNjci4kaW1wbGVtZW50cyBpbnN0YW5jZW9mIEFycmF5KSA/ICRkZXNjci4kaW1wbGVtZW50cyA6IFtdO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y29uc3QgJGNsYXNzID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Zm9yKGNvbnN0IGkgaW4gdGhpcy4kaW1wbGVtZW50cylcblx0XHR7XG5cdFx0XHRpZih0aGlzLiRpbXBsZW1lbnRzLmhhc093blByb3BlcnR5KGkpKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCAkaW50ZXJmYWNlID0gdGhpcy4kaW1wbGVtZW50c1tpXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaiBpbiAkaW50ZXJmYWNlLiRtZW1iZXJzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoJGludGVyZmFjZS4kbWVtYmVycy5oYXNPd25Qcm9wZXJ0eShqKSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRjb25zdCAkbWVtYmVyID0gJGludGVyZmFjZS4kbWVtYmVyc1tqXTtcblxuXHRcdFx0XHRcdFx0aWYodHlwZW9mKHRoaXNbal0pICE9PSB0eXBlb2YoJG1lbWJlcikpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRocm93ICdjbGFzcyBgJyArIHRoaXMuJG5hbWUgKyAnYCB3aXRoIG11c3QgaW1wbGVtZW50IGAnICsgJGludGVyZmFjZS4kbmFtZSArICcuJyArIGogKyAnYCc7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgX3N1cGVyID0gdGhpcy4kY2xhc3MuX2ludGVybmFsX3N1cGVyO1xuXHRcdGNvbnN0IF9hZGRlZCA9IHRoaXMuJGNsYXNzLl9pbnRlcm5hbF9hZGRlZDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuJHN1cGVyID0ge307XG5cblx0XHRmb3IoY29uc3QgbmFtZSBpbiBfc3VwZXIpXG5cdFx0e1xuXHRcdFx0aWYoX3N1cGVyLmhhc093blByb3BlcnR5KG5hbWUpKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLiRzdXBlcltuYW1lXSA9ICgoX3N1cGVyLCBuYW1lLCB0aGF0KSA9PiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdHJldHVybiBfc3VwZXJbbmFtZV0uYXBwbHkodGhhdCwgYXJndW1lbnRzKVxuXG5cdFx0XHRcdH0pKF9zdXBlciwgbmFtZSwgdGhpcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy4kYWRkZWQgPSB7fTtcblxuXHRcdGZvcihjb25zdCBuYW1lIGluIF9hZGRlZClcblx0XHR7XG5cdFx0XHRpZihfYWRkZWQuaGFzT3duUHJvcGVydHkobmFtZSkpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuJGFkZGVkW25hbWVdID0gKChfYWRkZWQsIG5hbWUsIHRoYXQpID0+IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0cmV0dXJuIF9hZGRlZFtuYW1lXS5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuXG5cdFx0XHRcdH0pKF9hZGRlZCwgbmFtZSwgdGhpcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy4kaW5pdClcblx0XHR7XG5cdFx0XHR0aGlzLiRpbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGNsYXNzLl9pbnRlcm5hbF9zdXBlciA9IHt9O1xuXHQkY2xhc3MuX2ludGVybmFsX2FkZGVkID0ge307XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3IoY29uc3QgbmFtZSBpbiAkc3VwZXIpXG5cdHtcblx0XHRpZihuYW1lID09PSAnJGluaXQnXG5cdFx0ICAgfHxcblx0XHQgICBuYW1lLmNoYXJBdCgwKSAhPT0gJyQnXG5cdFx0ICAgfHxcblx0XHQgICAkc3VwZXIuaGFzT3duUHJvcGVydHkobmFtZSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcblx0XHQgKSB7XG5cdFx0XHQkY2xhc3MuX2ludGVybmFsX3N1cGVyW25hbWVdID0gJHN1cGVyW25hbWVdO1xuXG5cdFx0XHQkY2xhc3MucHJvdG90eXBlW25hbWVdID0gJHN1cGVyW25hbWVdO1xuXHRcdH1cblx0fVxuXG5cdGZvcihjb25zdCBuYW1lIGluICRkZXNjcilcblx0e1xuXHRcdGlmKG5hbWUgPT09ICckaW5pdCdcblx0XHQgICB8fFxuXHRcdCAgIG5hbWUuY2hhckF0KDApICE9PSAnJCdcblx0XHQgICB8fFxuXHRcdCAgICRkZXNjci5oYXNPd25Qcm9wZXJ0eShuYW1lKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuXHRcdCApIHtcblx0XHRcdCRjbGFzcy5faW50ZXJuYWxfYWRkZWRbbmFtZV0gPSAkZGVzY3JbbmFtZV07XG5cblx0XHRcdCRjbGFzcy5wcm90b3R5cGVbbmFtZV0gPSAkZGVzY3JbbmFtZV07XG5cdFx0fVxuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkY2xhc3MucHJvdG90eXBlLiRuYW1lID0gJG5hbWU7XG5cdCRjbGFzcy5wcm90b3R5cGUuJGNsYXNzID0gJGNsYXNzO1xuXHQkY2xhc3MucHJvdG90eXBlLiRpbXBsZW1lbnRzID0gJHN1cGVyX2ltcGxlbWVudHMuY29uY2F0KCRkZXNjcl9pbXBsZW1lbnRzKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF8kYWRkVG9OYW1lc3BhY2UoJG5hbWUsICRjbGFzcyk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpZigkZGVzY3IuJClcblx0e1xuXHRcdCRkZXNjci4kLmFwcGx5KCRjbGFzcyk7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIE5vZGVKUyBFWFRFTlNJT04gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmlmKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJylcbntcblx0bW9kdWxlLmV4cG9ydHMuTmFtZXNwYWNlID0gJEFNSU5hbWVzcGFjZTtcblx0bW9kdWxlLmV4cG9ydHMuSW50ZXJmYWNlID0gJEFNSUludGVyZmFjZTtcblx0bW9kdWxlLmV4cG9ydHMuICBDbGFzcyAgID0gICAkQU1JQ2xhc3MgIDtcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBKUVVFUlkgRVhURU5TSU9OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pZih0eXBlb2YgalF1ZXJ5ICE9PSAndW5kZWZpbmVkJylcbntcblx0alF1ZXJ5Lk5hbWVzcGFjZSA9ICRBTUlOYW1lc3BhY2U7XG5cdGpRdWVyeS5JbnRlcmZhY2UgPSAkQU1JSW50ZXJmYWNlO1xuXHRqUXVlcnkuICBDbGFzcyAgID0gICAkQU1JQ2xhc3MgIDtcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgQU1JIHVybCByb3V0aW5nIHN1YnN5c3RlbVxuICogQG5hbWVzcGFjZSBhbWlSb3V0ZXJcbiAqL1xuXG4kQU1JTmFtZXNwYWNlKCdhbWlSb3V0ZXInLCAvKiogQGxlbmRzIGFtaVJvdXRlciAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBSSVZBVEUgTUVNQkVSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3NjcmlwdFVSTDogJycsXG5cdF9vcmlnaW5VUkw6ICcnLFxuXHRfd2ViQXBwVVJMOiAnJyxcblxuXHRfaGFzaDogJycsXG5cdF9hcmdzOiBbXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9yb3V0ZXM6IFtdLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBSSVZBVEUgTUVUSE9EUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2VhdFNsYXNoZXM6IGZ1bmN0aW9uKHVybClcblx0e1xuXHRcdHVybCA9IHVybC50cmltKCk7XG5cblx0XHR3aGlsZSh1cmxbdXJsLmxlbmd0aCAtIDFdID09PSAnLycpXG5cdFx0e1xuXHRcdFx0dXJsID0gdXJsLnN1YnN0cmluZygwLCB1cmwubGVuZ3RoIC0gMSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVybDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBTVEFUSUMgQ09OU1RSVUNUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuX2FyZ3MubGVuZ3RoID0gMDtcblx0XHR0aGlzLl9yb3V0ZXMubGVuZ3RoID0gMDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0ICBocmVmICA9IHdpbmRvdy5sb2NhdGlvbi4gaHJlZiAudHJpbSgpO1xuXHRcdGNvbnN0ICBoYXNoICA9IHdpbmRvdy5sb2NhdGlvbi4gaGFzaCAudHJpbSgpO1xuXHRcdGNvbnN0IHNlYXJjaCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gudHJpbSgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3Qgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBTQ1JJUFRfVVJMIEFORCBPUklHSU5fVVJMICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Zm9yKGxldCBpZHgsIGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKylcblx0XHR7XG5cdFx0XHRpZHggPSBzY3JpcHRzW2ldLnNyYy5pbmRleE9mKCdqcy9hbWkuJyk7XG5cblx0XHRcdGlmKGlkeCA+IDApXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuX3NjcmlwdFVSTCA9IHNjcmlwdHNbaV0uc3JjO1xuXG5cdFx0XHRcdHRoaXMuX29yaWdpblVSTCA9IHRoaXMuX2VhdFNsYXNoZXMoXG5cdFx0XHRcdFx0dGhpcy5fc2NyaXB0VVJMLnN1YnN0cmluZygwLCBpZHgpXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFdFQkFQUF9VUkwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLl93ZWJBcHBVUkwgPSB0aGlzLl9lYXRTbGFzaGVzKFxuXHRcdFx0aHJlZi5yZXBsYWNlKC8oPzpcXCN8XFw/KS4qJC8sICcnKVxuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogSEFTSCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuX2hhc2ggPSB0aGlzLl9lYXRTbGFzaGVzKFxuXHRcdFx0aGFzaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvXFw/LiokLywgJycpXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBBUkdTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoc2VhcmNoKVxuXHRcdHtcblx0XHRcdHNlYXJjaC5zdWJzdHJpbmcoMSkuc3BsaXQoJyYnKS5mb3JFYWNoKChwYXJhbSkgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IHBhcnRzID0gcGFyYW0uc3BsaXQoJz0nKTtcblxuXHRcdFx0XHQvKiovIGlmKHBhcnRzLmxlbmd0aCA9PT0gMSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuX2FyZ3NbZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzBdKV0gPSAvKi0tLS0tLS0tKi8gJycgLyotLS0tLS0tLSovO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYocGFydHMubGVuZ3RoID09PSAyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5fYXJnc1tkZWNvZGVVUklDb21wb25lbnQocGFydHNbMF0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYXJ0c1sxXSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQVUJMSUMgTUVUSE9EUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgQVdGJ3Mgc2NyaXB0IFVSTFxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIEFXRidzIHNjcmlwdCBVUkxcblx0ICAqL1xuXG5cdGdldFNjcmlwdFVSTDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NjcmlwdFVSTDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgb3JpZ2luIFVSTFxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIG9yaWdpbiBVUkxcblx0ICAqL1xuXG5cdGdldE9yaWdpblVSTDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX29yaWdpblVSTDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgd2ViYXBwIFVSTFxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIHdlYmFwcCBVUkxcblx0ICAqL1xuXG5cdGdldFdlYkFwcFVSTDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3dlYkFwcFVSTDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgYW5jaG9yIHBhcnQgb2YgdGhlIHdlYmFwcCBVUkxcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBhbmNob3IgcGFydCBvZiB0aGUgd2ViYXBwIFVSTFxuXHQgICovXG5cblx0Z2V0SGFzaDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2hhc2g7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFxuXHQgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IFRoZSBhcmd1bWVudHMgZXh0cmFjdGVkIGZyb20gdGhlIHdlYmFwcCBVUkxcblx0ICAqL1xuXG5cdGdldEFyZ3M6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9hcmdzO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBcHBlbmRzIGEgcm91dGluZyBydWxlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcmVnRXhwIHRoZSByZWdFeHBcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBoYW5kbGVyIHRoZSBoYW5kbGVyXG5cdCAgKiBAcmV0dXJucyB7TmFtZXNwYWNlfSBUaGUgYW1pUm91dGVyIHNpbmdsZXRvblxuXHQgICovXG5cblx0YXBwZW5kOiBmdW5jdGlvbihyZWdFeHAsIGhhbmRsZXIpXG5cdHtcblx0XHR0aGlzLl9yb3V0ZXMudW5zaGlmdCh7XG5cdFx0XHRyZWdFeHA6IHJlZ0V4cCxcblx0XHRcdGhhbmRsZXI6IGhhbmRsZXIsXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUmVtb3ZlcyBzb21lIHJvdXRpbmcgcnVsZXNcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSByZWdFeHAgdGhlIHJlZ0V4cFxuXHQgICogQHJldHVybnMge05hbWVzcGFjZX0gVGhlIGFtaVJvdXRlciBzaW5nbGV0b25cblx0ICAqL1xuXG5cdHJlbW92ZTogZnVuY3Rpb24ocmVnRXhwKVxuXHR7XG5cdFx0dGhpcy5fcm91dGVzID0gdGhpcy5fcm91dGVzLmZpbHRlcigocm91dGUpID0+IHtcblxuXHRcdFx0cmV0dXJuIHJvdXRlLnJlZ0V4cC50b1N0cmluZygpICE9PSByZWdFeHAudG9TdHJpbmcoKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDaGVja3Mgd2hldGhlciB0aGUgVVJMIG1hdGNoZXMgd2l0aCBhIHJvdXRpbmcgcnVsZVxuXHQgICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAgKi9cblxuXHRjaGVjazogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG07XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fcm91dGVzLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdG0gPSB0aGlzLl9oYXNoLm1hdGNoKHRoaXMuX3JvdXRlc1tpXS5yZWdFeHApO1xuXG5cdFx0XHRpZihtKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLl9yb3V0ZXNbaV0uaGFuZGxlci5hcHBseShhbWlSb3V0ZXIsIG0pO1xuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXBwZW5kIGEgbmV3IGhpc3RvcnkgZW50cnlcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIHRoZSBuZXcgcGF0aFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0PW51bGxdIHRoZSBuZXcgY29udGV4dFxuXHQgICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAgKi9cblxuXHRhcHBlbmRIaXN0b3J5RW50cnk6IGZ1bmN0aW9uKHBhdGgsIGNvbnRleHQgPSBudWxsKVxuXHR7XG5cdFx0aWYoaGlzdG9yeS5wdXNoU3RhdGUpXG5cdFx0e1xuXHRcdFx0aGlzdG9yeS5wdXNoU3RhdGUoY29udGV4dCwgbnVsbCwgdGhpcy5fd2ViQXBwVVJMICsgdGhpcy5fZWF0U2xhc2hlcyhwYXRoKSk7XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUmVwbGFjZSB0aGUgY3VycmVudCBoaXN0b3J5IGVudHJ5XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCB0aGUgbmV3IHBhdGhcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGV4dD1udWxsXSB0aGUgbmV3IGNvbnRleHRcblx0ICAqIEByZXR1cm5zIHtCb29sZWFufVxuXHQgICovXG5cblx0cmVwbGFjZUhpc3RvcnlFbnRyeTogZnVuY3Rpb24ocGF0aCwgY29udGV4dCA9IG51bGwpXG5cdHtcblx0XHRpZihoaXN0b3J5LnJlcGxhY2VTdGF0ZSlcblx0XHR7XG5cdFx0XHRoaXN0b3J5LnJlcGxhY2VTdGF0ZShjb250ZXh0LCBudWxsLCB0aGlzLl93ZWJBcHBVUkwgKyB0aGlzLl9lYXRTbGFzaGVzKHBhdGgpKTtcblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlOYW1lc3BhY2UoJ2FtaScsIHtcblxuXHR2ZXJzaW9uOiAnMC4wLjEnLFxuXHRjb21taXRfaWQ6ICd7e0FNSV9DT01NSVRfSUR9fScsXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBJTlRFUk5BTCBGVU5DVElPTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5mdW5jdGlvbiBfYW1pX2ludGVybmFsX3RoZW4oZGVmZXJyZWQsIGRvbmVGdW5jLCBmYWlsRnVuYylcbntcblx0aWYoZGVmZXJyZWQgJiYgZGVmZXJyZWQudGhlbilcblx0e1xuXHRcdGRlZmVycmVkLnRoZW4oZG9uZUZ1bmMsIGZhaWxGdW5jKTtcblx0fVxuXHRlbHNlXG5cdHtcblx0XHRkb25lRnVuYygpO1xuXHR9XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5mdW5jdGlvbiBfYW1pX2ludGVybmFsX2Fsd2F5cyhkZWZlcnJlZCwgYWx3YXlzRnVuYylcbntcblx0aWYoZGVmZXJyZWQgJiYgZGVmZXJyZWQuYWx3YXlzKVxuXHR7XG5cdFx0ZGVmZXJyZWQuYWx3YXlzKGFsd2F5c0Z1bmMpO1xuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdGFsd2F5c0Z1bmMoKTtcblx0fVxufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVdlYkFwcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIEFNSSB3ZWJhcHAgc3Vic3lzdGVtXG4gKiBAbmFtZXNwYWNlIGFtaVdlYkFwcFxuICovXG5cbiRBTUlOYW1lc3BhY2UoJ2FtaVdlYkFwcCcsIC8qKiBAbGVuZHMgYW1pV2ViQXBwICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFJJVkFURSBNRU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfaWRSZWdFeHA6IG5ldyBSZWdFeHAoJ1thLXpBLVpdW2EtekEtWjAtOV17N31fW2EtekEtWjAtOV17NH1fW2EtekEtWjAtOV17NH1fW2EtekEtWjAtOV17NH1fW2EtekEtWjAtOV17MTJ9JywgJ2cnKSxcblxuXHRfbGlua0V4cDogbmV3IFJlZ0V4cCgnXFxcXFsoW15cXFxcXV0qKVxcXFxdXFxcXCgoW15cXFxcKV0qKVxcXFwpJywgJ2cnKSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9lbWJlZGRlZDogZmFsc2UsXG5cdF9ub0Jvb3RzdHJhcDogZmFsc2UsXG5cdF9ub0RhdGVUaW1lUGlja2VyOiBmYWxzZSxcblx0X25vU2VsZWN0MjogZmFsc2UsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZ2xvYmFsRGVmZXJyZWQ6ICQuRGVmZXJyZWQoKSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9zaGVldHM6IFtdLFxuXHRfc2NyaXB0czogW10sXG5cblx0X2NvbnRyb2xzOiB7fSxcblx0X3N1YmFwcHM6IHt9LFxuXG5cdF9pc1JlYWR5OiBmYWxzZSxcblx0X2NhbkxlYXZlOiB0cnVlLFxuXHRfbG9ja0NudDogMHgwMCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9jdXJyZW50U3ViQXBwSW5zdGFuY2U6IG5ldyBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLm9uUmVhZHkgPSBmdW5jdGlvbigpIHt9O1xuXHRcdHRoaXMub25FeGl0ID0gZnVuY3Rpb24oKSB7fTtcblx0XHR0aGlzLm9uTG9naW4gPSBmdW5jdGlvbigpIHt9O1xuXHRcdHRoaXMub25Mb2dvdXQgPSBmdW5jdGlvbigpIHt9O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBVQkxJQyBNRU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBUaGUgb3JpZ2luIFVSTFxuXHQgICogQHR5cGUge1N0cmluZ31cblx0ICAqL1xuXG5cdG9yaWdpblVSTDogJy8nLFxuXG5cdC8qKlxuXHQgICogVGhlIHdlYmFwcCBVUkxcblx0ICAqIEB0eXBlIHtTdHJpbmd9XG5cdCAgKi9cblxuXHR3ZWJBcHBVUkw6ICcvJyxcblxuXHQvKipcblx0ICAqIFRoZSBhbmNob3IgcGFydCBvZiB0aGUgd2ViYXBwIFVSTFxuXHQgICogQHR5cGUge1N0cmluZ31cblx0ICAqL1xuXG5cdGhhc2g6ICcnLFxuXG5cdC8qKlxuXHQgICogVGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFxuXHQgICogQHR5cGUge0FycmF5PFN0cmluZz59XG5cdCAgKi9cblxuXHRhcmdzOiB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBTVEFUSUMgQ09OU1RSVUNUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBHRVQgRkxBR1MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdXJsID0gYW1pUm91dGVyLmdldFNjcmlwdFVSTCgpO1xuXG5cdFx0Y29uc3QgaWR4ID0gdXJsLmluZGV4T2YoJz8nKTtcblxuXHRcdGlmKGlkeCA+IDApXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGZsYWdzID0gdXJsLnN1YnN0cmluZyhpZHgpLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLl9lbWJlZGRlZCA9IChmbGFncy5pbmRleE9mKCdlbWJlZGRlZCcpID49IDApO1xuXG5cdFx0XHR0aGlzLl9ub0Jvb3RzdHJhcCA9IChmbGFncy5pbmRleE9mKCdub2Jvb3RzdHJhcCcpID49IDApO1xuXG5cdFx0XHR0aGlzLl9ub0RhdGVUaW1lUGlja2VyID0gKGZsYWdzLmluZGV4T2YoJ25vZGF0ZXRpbWVwaWNrZXInKSA+PSAwKTtcblxuXHRcdFx0dGhpcy5fbm9TZWxlY3QyID0gKGZsYWdzLmluZGV4T2YoJ25vc2VsZWN0MicpID49IDApO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogR0VUIFVSTFMsIEhBU0ggQU5EIEFSR1MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMub3JpZ2luVVJMID0gYW1pUm91dGVyLmdldE9yaWdpblVSTCgpO1xuXHRcdHRoaXMud2ViQXBwVVJMID0gYW1pUm91dGVyLmdldFdlYkFwcFVSTCgpO1xuXG5cdFx0dGhpcy5oYXNoID0gYW1pUm91dGVyLmdldEhhc2goKTtcblx0XHR0aGlzLmFyZ3MgPSBhbWlSb3V0ZXIuZ2V0QXJncygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIExPQUQgU0hFRVRTIEFORCBTQ1JJUFRTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCByZXNvdXJjZXNDU1MgPSBbXTtcblx0XHRjb25zdCByZXNvdXJjZXNKUyA9IFtdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIXdpbmRvdy5Qb3BwZXIpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvcG9wcGVyLm1pbi5qcycpO1xuXHRcdH1cblxuXHRcdGlmKCF3aW5kb3cubW9tZW50KVxuXHRcdHtcblx0XHRcdHJlc291cmNlc0pTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2pzL21vbWVudC5taW4uanMnKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZigodHlwZW9mIGpRdWVyeS5mbi5xcmNvZGUpICE9PSAnZnVuY3Rpb24nKVxuXHRcdHtcblx0XHRcdHJlc291cmNlc0pTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2pzL2pxdWVyeS1xcmNvZGUubWluLmpzJyk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIXRoaXMuX25vQm9vdHN0cmFwICYmICh0eXBlb2YgalF1ZXJ5LmZuLm1vZGFsKSAhPT0gJ2Z1bmN0aW9uJylcblx0XHR7XG5cdFx0XHRyZXNvdXJjZXNDU1MucHVzaCh0aGlzLm9yaWdpblVSTCArICcvY3NzL2Jvb3RzdHJhcC5taW4uY3NzJyk7XG5cdFx0XHRyZXNvdXJjZXNKUy5wdXNoKHRoaXMub3JpZ2luVVJMICsgJy9qcy9ib290c3RyYXAubWluLmpzJyk7XG5cdFx0fVxuXG5cdFx0aWYoIXRoaXMuX25vRGF0ZVRpbWVQaWNrZXIgJiYgKHR5cGVvZiBqUXVlcnkuZm4uZGF0ZXRpbWVwaWNrZXIpICE9PSAnZnVuY3Rpb24nKVxuXHRcdHtcblx0XHRcdHJlc291cmNlc0NTUy5wdXNoKHRoaXMub3JpZ2luVVJMICsgJy9jc3MvYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyLm1pbi5jc3MnKTtcblx0XHRcdHJlc291cmNlc0pTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2pzL2Jvb3RzdHJhcC1kYXRldGltZXBpY2tlci5taW4uanMnKTtcblx0XHR9XG5cblx0XHRpZighdGhpcy5fbm9TZWxlY3QyICYmICh0eXBlb2YgalF1ZXJ5LmZuLnNlbGVjdDIpICE9PSAnZnVuY3Rpb24nKVxuXHRcdHtcblx0XHRcdHJlc291cmNlc0NTUy5wdXNoKHRoaXMub3JpZ2luVVJMICsgJy9jc3Mvc2VsZWN0Mi5taW4uY3NzJyk7XG5cdFx0XHRyZXNvdXJjZXNKUy5wdXNoKHRoaXMub3JpZ2luVVJMICsgJy9qcy9zZWxlY3QyLm1pbi5qcycpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMubG9hZFJlc291cmNlcyhbXG5cdFx0XHQuLi5yZXNvdXJjZXNDU1MsXG5cdFx0XHR0aGlzLm9yaWdpblVSTCArICcvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzJyxcblx0XHRcdHRoaXMub3JpZ2luVVJMICsgJy9jc3MvYW1pLm1pbi5jc3MnLFxuXHRcdFx0Li4ucmVzb3VyY2VzSlMsXG5cdFx0XSkuZG9uZSgoLyotLS0qLykgPT4ge1xuXG5cdFx0XHR0aGlzLl9nbG9iYWxEZWZlcnJlZC5yZXNvbHZlKC8qLS0tKi8pO1xuXG5cdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9nbG9iYWxEZWZlcnJlZC5yZWplY3QobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogTU9ERSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENoZWNrcyB3aGV0aGVyIHRoZSBXZWJBcHAgaXMgZXhlY3V0ZWQgaW4gZW1iZWRkZWQgbW9kZVxuXHQgICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAgKi9cblxuXHRpc0VtYmVkZGVkOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZW1iZWRkZWQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENoZWNrcyB3aGV0aGVyIHRoZSBXZWJBcHAgaXMgZXhlY3V0ZWQgbG9jYWxseSAoZmlsZTovLywgbG9jYWxob3N0LCAxMjcuMC4wLjEgb3IgOjoxKVxuXHQgICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAgKi9cblxuXHRpc0xvY2FsOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgPT09ICgoJ2ZpbGU6JykpXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnbG9jYWxob3N0J1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gJzEyNy4wLjAuMSdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUgPT09ICgoKCc6OjEnKSkpXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFRPT0xTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dHlwZU9mOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0Y29uc3QgbmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KTtcblxuXHRcdHJldHVybiBuYW1lLnN0YXJ0c1dpdGgoJ1tvYmplY3QgJykgPyBuYW1lLnN1YnN0cmluZyg4LCBuYW1lLmxlbmd0aCAtIDEpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IC8qLS0tLS0tLS0tLS0qLyAnJyAvKi0tLS0tLS0tLS0tKi9cblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRhc0FycmF5OiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudHlwZU9mKHgpID09PSAnQXJyYXknID8gKHgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogW3hdXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0dXA6IGZ1bmN0aW9uKG9wdGlvbk5hbWVzLCBvcHRpb25EZWZhdWx0cywgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGwgPSBvcHRpb25OYW1lcy5sZW5ndGg7XG5cdFx0Y29uc3QgbSA9IG9wdGlvbkRlZmF1bHRzLmxlbmd0aDtcblxuXHRcdGlmKGwgIT09IG0pXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihzZXR0aW5ncykge1xuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuXHRcdFx0XHRyZXN1bHQucHVzaChvcHRpb25OYW1lc1tpXSBpbiBzZXR0aW5ncyA/IHNldHRpbmdzW29wdGlvbk5hbWVzW2ldXSA6IG9wdGlvbkRlZmF1bHRzW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi8gb3B0aW9uRGVmYXVsdHNbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZXBsYWNlOiBhbWlUd2lnLnN0ZGxpYi5fcmVwbGFjZSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF90ZXh0VG9IdG1sWDogWycmJyAgICAsICdcIicgICAgICwgJzwnICAgLCAnPicgICBdLFxuXHRfdGV4dFRvSHRtbFk6IFsnJmFtcDsnLCAnJnF1b3Q7JywgJyZsdDsnLCAnJmd0OyddLFxuXG5cdC8qKlxuXHQgICogRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBIVE1MXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSB1bmVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdHRleHRUb0h0bWw6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKHMgfHwgJycsIHRoaXMuX3RleHRUb0h0bWxYLCB0aGlzLl90ZXh0VG9IdG1sWSk7XG5cdH0sXG5cblx0LyoqXG5cdCAgKiBVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEhUTUwgdG8gdGV4dFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyB0aGUgZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSB1bmVzY2FwZWQgc3RyaW5nXG5cdCAgKi9cblxuXHRodG1sVG9UZXh0OiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9IdG1sWSwgdGhpcy5fdGV4dFRvSHRtbFgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3RleHRUb1N0cmluZ1g6IFsnXFxcXCcgICwgJ1xcbicgLCAnXCInICAsICdcXCcnICBdLFxuXHRfdGV4dFRvU3RyaW5nWTogWydcXFxcXFxcXCcsICdcXFxcbicsICdcXFxcXCInLCAnXFxcXFxcJyddLFxuXG5cdC8qKlxuXHQgICogRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBKYXZhU2NyaXB0IHN0cmluZ1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyB0aGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKi9cblxuXHR0ZXh0VG9TdHJpbmc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKHMgfHwgJycsIHRoaXMuX3RleHRUb1N0cmluZ1gsIHRoaXMuX3RleHRUb1N0cmluZ1kpO1xuXHR9LFxuXG5cdC8qKlxuXHQgICogVW5lc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBKYXZhU2NyaXB0IHN0cmluZyB0byB0ZXh0XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdHN0cmluZ1RvVGV4dDogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5fdGV4dFRvU3RyaW5nWSwgdGhpcy5fdGV4dFRvU3RyaW5nWCk7XG5cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9odG1sVG9TdHJpbmdYOiBbJ1xcXFwnICAsICdcXG4nICwgJyZxdW90OycgICwgJ1xcJycgIF0sXG5cdF9odG1sVG9TdHJpbmdZOiBbJ1xcXFxcXFxcJywgJ1xcXFxuJywgJ1xcXFwmcXVvdDsnLCAnXFxcXFxcJyddLFxuXG5cdC8qKlxuXHQgICogRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSFRNTCB0byBKYXZhU2NyaXB0IHN0cmluZ1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyB0aGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKi9cblxuXHRodG1sVG9TdHJpbmc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKHMgfHwgJycsIHRoaXMuX2h0bWxUb1N0cmluZ1gsIHRoaXMuX2h0bWxUb1N0cmluZ1kpO1xuXHR9LFxuXG5cdC8qKlxuXHQgICogVW5lc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBKYXZhU2NyaXB0IHN0cmluZyB0byBIVE1MXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdHN0cmluZ1RvSHRtbDogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5faHRtbFRvU3RyaW5nWSwgdGhpcy5faHRtbFRvU3RyaW5nWCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfdGV4dFRvU1FMWDogWydcXCcnICBdLFxuXHRfdGV4dFRvU1FMWTogWydcXCdcXCcnXSxcblxuXHQvKipcblx0ICAqIEVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIHRleHQgdG8gU1FMXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSB1bmVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdHRleHRUb1NRTDogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5fdGV4dFRvU1FMWCwgdGhpcy5fdGV4dFRvU1FMWSk7XG5cdH0sXG5cblx0LyoqXG5cdCAgKiBVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIFNRTCB0byB0ZXh0XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdHNxbFRvVGV4dDogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5fdGV4dFRvU1FMWSwgdGhpcy5fdGV4dFRvU1FMWCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogQkFTRTY0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfYmFzZTY0OiAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODktXycsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEVuY29kZXMgKFJGQyA0NjQ4KSBhIHN0cmluZ1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyB0aGUgZGVjb2RlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBlbmNvZGVkIHN0cmluZ1xuXHQgICovXG5cblx0YmFzZTY0RW5jb2RlOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0bGV0IHc7XG5cblx0XHRjb25zdCBlID0gW107XG5cblx0XHRjb25zdCBsID0gcy5sZW5ndGgsIG0gPSBsICUgMztcblxuXHRcdGNvbnN0IHRoaXNfYmFzZTY0ID0gdGhpcy5fYmFzZTY0O1xuXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IGw7KVxuXHRcdHtcblx0XHRcdHcgPSBzLmNoYXJDb2RlQXQoaSsrKSA8PCAxNlxuXHRcdFx0ICAgIHxcblx0XHRcdCAgICBzLmNoYXJDb2RlQXQoaSsrKSA8PCA4XG5cdFx0XHQgICAgfFxuXHRcdFx0ICAgIHMuY2hhckNvZGVBdChpKyspIDw8IDBcblx0XHRcdDtcblxuXHRcdFx0ZS5wdXNoKHRoaXNfYmFzZTY0LmNoYXJBdCgodyA+PiAxOCkgJiAweDNGKSk7XG5cdFx0XHRlLnB1c2godGhpc19iYXNlNjQuY2hhckF0KCh3ID4+IDEyKSAmIDB4M0YpKTtcblx0XHRcdGUucHVzaCh0aGlzX2Jhc2U2NC5jaGFyQXQoKHcgPj4gNikgJiAweDNGKSk7XG5cdFx0XHRlLnB1c2godGhpc19iYXNlNjQuY2hhckF0KCh3ID4+IDApICYgMHgzRikpO1xuXHRcdH1cblxuXHRcdC8qKi8gaWYobSA9PT0gMSkge1xuXHRcdFx0ZS5zcGxpY2UoLTIsIDIpO1xuXHRcdH1cblx0XHRlbHNlIGlmKG0gPT09IDIpIHtcblx0XHRcdGUuc3BsaWNlKC0xLCAxKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZS5qb2luKCcnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRGVjb2RlcyAoUkZDIDQ2NDgpIGEgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBlbmNvZGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGRlY29kZWQgc3RyaW5nXG5cdCAgKi9cblxuXHRiYXNlNjREZWNvZGU6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRsZXQgdztcblxuXHRcdGNvbnN0IGUgPSBbXTtcblxuXHRcdGNvbnN0IGwgPSBzLmxlbmd0aCwgbSA9IGwgJSA0O1xuXG5cdFx0Y29uc3QgdGhpc19iYXNlNjQgPSB0aGlzLl9iYXNlNjQ7XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDspXG5cdFx0e1xuXHRcdFx0dyA9IHRoaXNfYmFzZTY0LmluZGV4T2Yocy5jaGFyQXQoaSsrKSkgPDwgMThcblx0XHRcdCAgICB8XG5cdFx0XHQgICAgdGhpc19iYXNlNjQuaW5kZXhPZihzLmNoYXJBdChpKyspKSA8PCAxMlxuXHRcdFx0ICAgIHxcblx0XHRcdCAgICB0aGlzX2Jhc2U2NC5pbmRleE9mKHMuY2hhckF0KGkrKykpIDw8IDZcblx0XHRcdCAgICB8XG5cdFx0XHQgICAgdGhpc19iYXNlNjQuaW5kZXhPZihzLmNoYXJBdChpKyspKSA8PCAwXG5cdFx0XHQ7XG5cblx0XHRcdGUucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh3ID4+PiAxNikgJiAweEZGKSk7XG5cdFx0XHRlLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgodyA+Pj4gOCkgJiAweEZGKSk7XG5cdFx0XHRlLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgodyA+Pj4gMCkgJiAweEZGKSk7XG5cdFx0fVxuXG5cdFx0LyoqLyBpZihtID09PSAyKSB7XG5cdFx0XHRlLnNwbGljZSgtMiwgMik7XG5cdFx0fVxuXHRcdGVsc2UgaWYobSA9PT0gMykge1xuXHRcdFx0ZS5zcGxpY2UoLTEsIDEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBlLmpvaW4oJycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIERZTkFNSUMgUkVTT1VSQ0UgTE9BRElORyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2dldEV4dGVuc2lvbjogZnVuY3Rpb24odXJsKVxuXHR7XG5cdFx0Y29uc3QgaWR4ID0gdXJsLmxhc3RJbmRleE9mKCcuJyk7XG5cblx0XHRyZXR1cm4gaWR4ID4gMCA/IHVybC5zdWJzdHJpbmcoaWR4KSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2dldERhdGFUeXBlOiBmdW5jdGlvbih1cmwsIGRhdGFUeXBlKVxuXHR7XG5cdFx0bGV0IHJlc3VsdDtcblxuXHRcdGlmKGRhdGFUeXBlID09PSAnYXV0bycpXG5cdFx0e1xuXHRcdFx0LyoqLyBpZih1cmwuaW5kZXhPZignY3RybDonKSA9PT0gMClcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0ID0gJ2NvbnRyb2wnO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZih1cmwuaW5kZXhPZignc3ViYXBwOicpID09PSAwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSAnc3ViYXBwJztcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0c3dpdGNoKHRoaXMuX2dldEV4dGVuc2lvbih1cmwpLnRvTG93ZXJDYXNlKCkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjYXNlICcuY3NzJzpcblx0XHRcdFx0XHRcdHJlc3VsdCA9ICdzaGVldCc7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJy5qcyc6XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAnc2NyaXB0Jztcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAnLmpzb24nOlxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gJ2pzb24nO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICcueG1sJzpcblx0XHRcdFx0XHRcdHJlc3VsdCA9ICd4bWwnO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gJ3RleHQnO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJlc3VsdCA9IGRhdGFUeXBlO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfX2xvYWRYWFg6IGZ1bmN0aW9uKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KVxuXHR7XG5cdFx0aWYodXJscy5sZW5ndGggPT09IDApXG5cdFx0e1xuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlc29sdmVXaXRoKGNvbnRleHQsIFtyZXN1bHRdKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1cmwgPSB1cmxzLnNoaWZ0KCkudHJpbSgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZGF0YVRZUEUgPSB0aGlzLl9nZXREYXRhVHlwZSh1cmwsIGRhdGFUeXBlKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHN3aXRjaChkYXRhVFlQRSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIENPTlRST0wgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2NvbnRyb2wnOlxuXG5cdFx0XHRcdHRoaXMubG9hZENvbnRyb2wodXJsKS50aGVuKChkYXRhKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucHVzaChkYXRhKTtcblxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgcmVzdWx0LCB1cmxzLCBkYXRhVHlwZSwgY29udGV4dCk7XG5cblx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNVQkFQUCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ3N1YmFwcCc6XG5cblx0XHRcdFx0dGhpcy5sb2FkU3ViQXBwKHVybCkudGhlbigoZGF0YSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goZGF0YSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTSEVFVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdzaGVldCc6XG5cblx0XHRcdFx0aWYodGhpcy5fc2hlZXRzLmluZGV4T2YodXJsKSA+PSAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goZmFsc2UpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRcdFx0XHRhc3luYzogZmFsc2UsXG5cdFx0XHRcdFx0XHRjYWNoZTogZmFsc2UsXG5cdFx0XHRcdFx0XHRjcm9zc0RvbWFpbjogdHJ1ZSxcblx0XHRcdFx0XHRcdGRhdGFUeXBlOiBkYXRhVFlQRSxcblx0XHRcdFx0XHR9KS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnB1c2godHJ1ZSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuX3NoZWV0cy5wdXNoKHVybCk7XG5cblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgcmVzdWx0LCB1cmxzLCBkYXRhVHlwZSwgY29udGV4dCk7XG5cblx0XHRcdFx0XHR9LCAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgYCcgKyB1cmwgKyAnYCddKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNDUklQVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ3NjcmlwdCc6XG5cblx0XHRcdFx0aWYodGhpcy5fc2NyaXB0cy5pbmRleE9mKHVybCkgPj0gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGZhbHNlKTtcblxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgcmVzdWx0LCB1cmxzLCBkYXRhVHlwZSwgY29udGV4dCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRcdHVybDogdXJsLFxuXHRcdFx0XHRcdFx0YXN5bmM6IGZhbHNlLFxuXHRcdFx0XHRcdFx0Y2FjaGU6IGZhbHNlLFxuXHRcdFx0XHRcdFx0Y3Jvc3NEb21haW46IHRydWUsXG5cdFx0XHRcdFx0XHRkYXRhVHlwZTogZGF0YVRZUEUsXG5cdFx0XHRcdFx0fSkudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKHRydWUpO1xuXG5cdFx0XHRcdFx0XHR0aGlzLl9zY3JpcHRzLnB1c2godXJsKTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblxuXHRcdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBgJyArIHVybCArICdgJ10pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogT1RIRVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdHVybDogdXJsLFxuXHRcdFx0XHRcdGFzeW5jOiB0cnVlLFxuXHRcdFx0XHRcdGNhY2hlOiBmYWxzZSxcblx0XHRcdFx0XHRjcm9zc0RvbWFpbjogdHJ1ZSxcblx0XHRcdFx0XHRkYXRhVHlwZTogZGF0YVRZUEUsXG5cdFx0XHRcdH0pLnRoZW4oKGRhdGEpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGRhdGEpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblxuXHRcdFx0XHR9LCAoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIGAnICsgdXJsICsgJ2AnXSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfbG9hZFhYWDogZnVuY3Rpb24odXJscywgZGF0YVR5cGUsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSB0aGlzLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbZGVmZXJyZWRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIFtdLCB0aGlzLmFzQXJyYXkodXJscyksIGRhdGFUeXBlLCBjb250ZXh0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIHJlc291cmNlcyBieSBleHRlbnNpb25cblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkUmVzb3VyY2VzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICdhdXRvJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyBDU1Mgc2hlZXRzXG5cdCAgKiBAcGFyYW0geyhBcnJheXxTdHJpbmcpfSB1cmxzIHRoZSBhcnJheSBvZiB1cmxzXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZFNoZWV0czogZnVuY3Rpb24odXJscywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbG9hZFhYWCh1cmxzLCAnc2hlZXQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIEpTIHNjcmlwdHNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkU2NyaXB0czogZnVuY3Rpb24odXJscywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbG9hZFhYWCh1cmxzLCAnc2NyaXB0Jywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyBKU09OIGZpbGVzXG5cdCAgKiBAcGFyYW0geyhBcnJheXxTdHJpbmcpfSB1cmxzIHRoZSBhcnJheSBvZiB1cmxzXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZEpTT05zOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICdqc29uJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyBYTUwgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkWE1MczogZnVuY3Rpb24odXJscywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbG9hZFhYWCh1cmxzLCAneG1sJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyBIVE1MIGZpbGVzXG5cdCAgKiBAcGFyYW0geyhBcnJheXxTdHJpbmcpfSB1cmxzIHRoZSBhcnJheSBvZiB1cmxzXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZEhUTUxzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICd0ZXh0Jywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyBUV0lHIGZpbGVzXG5cdCAgKiBAcGFyYW0geyhBcnJheXxTdHJpbmcpfSB1cmxzIHRoZSBhcnJheSBvZiB1cmxzXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZFRXSUdzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICd0ZXh0Jywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyB0ZXh0IGZpbGVzXG5cdCAgKiBAcGFyYW0geyhBcnJheXxTdHJpbmcpfSB1cmxzIHRoZSBhcnJheSBvZiB1cmxzXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZFRleHRzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICd0ZXh0Jywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIEhUTUwgQ09OVEVOVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3h4eEhUTUw6IGZ1bmN0aW9uKHNlbGVjdG9yLCB0d2lnLCBtb2RlLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0LCBzdWZmaXgsIGRpY3QsIHR3aWdzXSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnLCAnc3VmZml4JywgJ2RpY3QnLCAndHdpZ3MnXSxcblx0XHRcdFtyZXN1bHQsIG51bGwsIG51bGwsIG51bGxdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoc3VmZml4KVxuXHRcdHtcblx0XHRcdHR3aWcgPSB0d2lnLnJlcGxhY2UodGhpcy5faWRSZWdFeHAsIGZ1bmN0aW9uKGlkKSB7XG5cblx0XHRcdFx0cmV0dXJuIGlkICsgJ19pbnN0YW5jZScgKyBzdWZmaXg7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRjb25zdCBodG1sID0gdGhpcy5mb3JtYXRUV0lHKHR3aWcsIGRpY3QsIHR3aWdzKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBwcm9taXNlO1xuXG5cdFx0bGV0IGVsID0gJChzZWxlY3Rvcik7XG5cblx0XHRzd2l0Y2gobW9kZSlcblx0XHR7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdHByb21pc2UgPSBlbC5odG1sKGh0bWwpLnByb21pc2UoKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0cHJvbWlzZSA9IGVsLnByZXBlbmQoaHRtbCkucHJvbWlzZSgpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRwcm9taXNlID0gZWwuYXBwZW5kKGh0bWwpLnByb21pc2UoKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMzpcblx0XHRcdFx0cHJvbWlzZSA9IGVsLnJlcGxhY2VXaXRoKGVsLmlzKCdbaWRdJykgPyBodG1sLnJlcGxhY2UoL15cXHMqKDxbYS16QS1aXy1dKykvLCAnJDEgaWQ9XCInICsgZWwuYXR0cignaWQnKSArICdcIicpIDogaHRtbCkucHJvbWlzZSgpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRwcm9taXNlLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGV0IGVsID0gJChzZWxlY3Rvcik7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBfZmluZCA9IChtb2RlID09PSAzKSA/IChfc2VsZWN0b3IpID0+IGVsLmZpbmRXaXRoU2VsZihfc2VsZWN0b3IpXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICA6IChfc2VsZWN0b3IpID0+IGVsLiAgICBmaW5kICAgIChfc2VsZWN0b3IpXG5cdFx0XHQ7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihqUXVlcnkuZm4udG9vbHRpcClcblx0XHRcdHtcblx0XHRcdFx0X2ZpbmQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKHtcblx0XHRcdFx0XHRodG1sOiBmYWxzZSxcblx0XHRcdFx0XHRkZWxheToge1xuXHRcdFx0XHRcdFx0c2hvdzogNTAwLFxuXHRcdFx0XHRcdFx0aGlkZTogMTAwLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYoalF1ZXJ5LmZuLnBvcG92ZXIpXG5cdFx0XHR7XG5cdFx0XHRcdF9maW5kKCdbZGF0YS10b2dnbGU9XCJwb3BvdmVyXCJdJykucG9wb3Zlcih7XG5cdFx0XHRcdFx0aHRtbDogdHJ1ZSxcblx0XHRcdFx0XHRkZWxheToge1xuXHRcdFx0XHRcdFx0c2hvdzogNTAwLFxuXHRcdFx0XHRcdFx0aGlkZTogMTAwLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYoalF1ZXJ5LmZuLmRhdGV0aW1lcGlja2VyKVxuXHRcdFx0e1xuXHRcdFx0XHRfZmluZCgnLmZvcm0tZGF0ZXRpbWUnKS5kYXRldGltZXBpY2tlcih7XG5cdFx0XHRcdFx0Zm9ybWF0OiAnWVlZWS1NTS1ERCBISDptbTpzcy5TU1NTU1MnXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdF9maW5kKCcuZm9ybS1kYXRlJykuZGF0ZXRpbWVwaWNrZXIoe1xuXHRcdFx0XHRcdGZvcm1hdDogJ1lZWVktTU0tREQnXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdF9maW5kKCcuZm9ybS10aW1lJykuZGF0ZXRpbWVwaWNrZXIoe1xuXHRcdFx0XHRcdGZvcm1hdDogJ0hIOm1tOnNzJ1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRfZmluZCgnLmZvcm0tdGltZS1obScpLmRhdGV0aW1lcGlja2VyKHtcblx0XHRcdFx0XHRmb3JtYXQ6ICdISDptbSdcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih3aW5kb3cuYWNlKVxuXHRcdFx0e1xuXHRcdFx0XHRfZmluZCgnLmZvcm0tZWRpdG9yOm5vdCguZm9ybS1lZGl0b3ItaGlkZGVuKScpLmVhY2goKGluZHgsIGl0ZW0pID0+IHtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IHRleHRhcmVhID0gJChpdGVtKS5hZGRDbGFzcygnZm9ybS1lZGl0b3ItaGlkZGVuJyk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBkaXYgPSAkKCc8ZGl2PicsIHtcblx0XHRcdFx0XHRcdCdjbGFzcyc6IHRleHRhcmVhLmF0dHIoJ2NsYXNzJylcblx0XHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJ2Zvcm0tZWRpdG9yJywgJycpLnJlcGxhY2UoJ2Zvcm0tZWRpdG9yLWhpZGRlbicsICcnKSxcblx0XHRcdFx0XHRcdCdzdHlsZSc6IHRleHRhcmVhLmF0dHIoJ3N0eWxlJyksXG5cdFx0XHRcdFx0fSkuaW5zZXJ0QmVmb3JlKHRleHRhcmVhKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGRpdi5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjb25zdCBtb2RlID0gdGV4dGFyZWEuYXR0cignZGF0YS1tb2RlJykgfHwgJ3RleHQnO1xuXHRcdFx0XHRcdFx0Y29uc3QgdGhlbWUgPSB0ZXh0YXJlYS5hdHRyKCdkYXRhLXRoZW1lJykgfHwgJ2Nocm9tZSc7XG5cblx0XHRcdFx0XHRcdGNvbnN0IHdyYXAgPSB0ZXh0YXJlYS5hdHRyKCdkYXRhLXdyYXAnKSB8fCAnZmFsc2UnO1xuXHRcdFx0XHRcdFx0Y29uc3QgcmVhZE9ubHkgPSB0ZXh0YXJlYS5hdHRyKCdkYXRhLXJlYWQtb25seScpIHx8ICdmYWxzZSc7XG5cdFx0XHRcdFx0XHRjb25zdCBzaG93R3V0dGVyID0gdGV4dGFyZWEuYXR0cignZGF0YS1zaG93LWd1dHRlcicpIHx8ICd0cnVlJztcblx0XHRcdFx0XHRcdGNvbnN0IGhpZ2hsaWdodEFjdGl2ZUxpbmUgPSB0ZXh0YXJlYS5hdHRyKCdkYXRhLWhpZ2hsaWdodC1hY3RpdmUtbGluZScpIHx8ICdmYWxzZSc7XG5cblx0XHRcdFx0XHRcdGxldCBtaW5MaW5lcyA9IHBhcnNlSW50KHRleHRhcmVhLmF0dHIoJ2RhdGEtbWlubGluZXMnKSk7XG5cblx0XHRcdFx0XHRcdGlmKGlzTmFOKG1pbkxpbmVzKSkge1xuXHRcdFx0XHRcdFx0XHRtaW5MaW5lcyA9IDB4MDAwMDAxO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRsZXQgbWF4TGluZXMgPSBwYXJzZUludCh0ZXh0YXJlYS5hdHRyKCdkYXRhLW1heGxpbmVzJykpO1xuXG5cdFx0XHRcdFx0XHRpZihpc05hTihtYXhMaW5lcykpIHtcblx0XHRcdFx0XHRcdFx0bWF4TGluZXMgPSBJbmZpbml0eTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGFjZS5jb25maWcuc2V0KCdzdWZmaXgnLCAnLm1pbi5qcycpO1xuXG5cdFx0XHRcdFx0XHRhY2UuY29uZmlnLnNldCgnYmFzZVBhdGgnLCB0aGlzLm9yaWdpblVSTCArICcvanMvM3JkLXBhcnR5L2FjZScpO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y29uc3QgZWRpdG9yID0gYWNlLmVkaXQoZGl2WzBdLCB7XG5cdFx0XHRcdFx0XHRcdG1vZGU6ICdhY2UvbW9kZS8nICsgbW9kZSxcblx0XHRcdFx0XHRcdFx0dGhlbWU6ICdhY2UvdGhlbWUvJyArIHRoZW1lLFxuXHRcdFx0XHRcdFx0XHQvKiovXG5cdFx0XHRcdFx0XHRcdHdyYXA6ICd0cnVlJyA9PT0gd3JhcCxcblx0XHRcdFx0XHRcdFx0cmVhZE9ubHk6ICd0cnVlJyA9PT0gcmVhZE9ubHksXG5cdFx0XHRcdFx0XHRcdHNob3dHdXR0ZXI6ICd0cnVlJyA9PT0gc2hvd0d1dHRlcixcblx0XHRcdFx0XHRcdFx0aGlnaGxpZ2h0QWN0aXZlTGluZTogJ3RydWUnID09PSBoaWdobGlnaHRBY3RpdmVMaW5lLFxuXHRcdFx0XHRcdFx0XHQvKiovXG5cdFx0XHRcdFx0XHRcdG1pbkxpbmVzOiBtaW5MaW5lcyxcblx0XHRcdFx0XHRcdFx0bWF4TGluZXM6IG1heExpbmVzLFxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRlZGl0b3IucmVuZGVyZXIuc2V0U2Nyb2xsTWFyZ2luKDAsIDIpO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y29uc3Qgc2Vzc2lvbiA9IGVkaXRvci5nZXRTZXNzaW9uKCk7XG5cblx0XHRcdFx0XHRcdHRleHRhcmVhLmRhdGEoJ2VkaXRvcicsIGVkaXRvcik7XG5cdFx0XHRcdFx0XHR0ZXh0YXJlYS5kYXRhKCdzZXNzaW9uJywgc2Vzc2lvbik7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRzZXNzaW9uLm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0aXRlbS52YWx1ZSA9IHNlc3Npb24uZ2V0VmFsdWUoKTtcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRzZXNzaW9uLnNldFZhbHVlKGl0ZW0udmFsdWUpO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2VsXSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFB1dHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIHRoZSB0YXJnZXQgc2VsZWN0b3Jcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0d2lnIHRoZSBUV0lHIGZyYWdtZW50XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBzdWZmaXgsIGRpY3QsIHR3aWdzKVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0cmVwbGFjZUhUTUw6IGZ1bmN0aW9uKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl94eHhIVE1MKHNlbGVjdG9yLCB0d2lnLCAwLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFByZXBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgc3VmZml4LCBkaWN0LCB0d2lncylcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdHByZXBlbmRIVE1MOiBmdW5jdGlvbihzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5feHh4SFRNTChzZWxlY3RvciwgdHdpZywgMSwgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBcHBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgc3VmZml4LCBkaWN0LCB0d2lncylcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGFwcGVuZEhUTUw6IGZ1bmN0aW9uKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl94eHhIVE1MKHNlbGVjdG9yLCB0d2lnLCAyLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEludGVycHJldGVzIHRoZSBnaXZlbiBUV0lHIHN0cmluZywgc2VlIHtAbGluayBodHRwOi8vdHdpZy5zZW5zaW9sYWJzLm9yZy9kb2N1bWVudGF0aW9ufVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge09iamVjdHxBcnJheX0gW2RpY3RdIHRoZSBkaWN0aW9uYXJ5XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3R3aWdzXSBkaWN0aW9uYXJ5IG9mIGZyYWdtZW50c1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIEludGVycHJldGVkIFRXSUcgc3RyaW5nXG5cdCAgKi9cblxuXHRmb3JtYXRUV0lHOiBmdW5jdGlvbih0d2lnLCBkaWN0ID0ge30sIHR3aWdzID0ge30pXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHJlbmRlciA9ICh0d2lnLCBkaWN0KSA9PiB7XG5cblx0XHRcdGlmKHRoaXMudHlwZU9mKGRpY3QpICE9PSAnT2JqZWN0Jylcblx0XHRcdHtcblx0XHRcdFx0ZGljdCA9IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLnR5cGVPZih0d2lncykgIT09ICdPYmplY3QnKVxuXHRcdFx0e1xuXHRcdFx0XHR0d2lncyA9IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHRkaWN0WydPUklHSU5fVVJMJ10gPSB0aGlzLm9yaWdpblVSTDtcblx0XHRcdGRpY3RbJ1dFQkFQUF9VUkwnXSA9IHRoaXMud2ViQXBwVVJMO1xuXG5cdFx0XHRyZXR1cm4gYW1pVHdpZy5lbmdpbmUucmVuZGVyKHR3aWcsIGRpY3QsIHR3aWdzKTtcblx0XHR9O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0aWYodGhpcy50eXBlT2YoZGljdCkgPT09ICdBcnJheScpXG5cdFx0XHR7XG5cdFx0XHRcdGRpY3QuZm9yRWFjaCgoRElDVCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gocmVuZGVyKHR3aWcsIERJQ1QsIHR3aWdzKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQucHVzaChyZW5kZXIodHdpZywgZGljdCwgdHdpZ3MpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Y2F0Y2goZXJyb3IpXG5cdFx0e1xuXHRcdFx0cmVzdWx0Lmxlbmd0aCA9IDA7XG5cblx0XHRcdHRoaXMuZXJyb3IoJ1RXSUcgcGFyc2luZyBlcnJvcjogJyArIGVycm9yLm1lc3NhZ2UpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSlNQQVRIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEZpbmRzIGRhdGEgd2l0aGluIHRoZSBnaXZlbiBKU09OLCBzZWUge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9kZmlsYXRvdi9qc3BhdGh9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCB0aGUgcGF0aFxuXHQgICogQHBhcmFtIHtPYmplY3R9IGpzb24gdGhlIEpTT05cblx0ICAqIEByZXR1cm5zIHtBcnJheX0gVGhlIHJlc3VsdGluZyBhcnJheVxuXHQgICovXG5cblx0anNwYXRoOiBmdW5jdGlvbihwYXRoLCBqc29uKVxuXHR7XG5cdFx0cmV0dXJuIEpTUGF0aC5hcHBseShwYXRoLCBqc29uKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBTVEFDSyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldFN0YWNrOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0cnlcblx0XHR7XG5cdFx0XHR0aHJvdyBFcnJvcigpO1xuXHRcdH1cblx0XHRjYXRjaChlMSlcblx0XHR7XG5cdFx0XHR0cnlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIGUxLnN0YWNrO1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2goZTIpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiAoKCgnJykpKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogTE9DSyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIExvY2tzIHRoZSBXZWIgYXBwbGljYXRpb25cblx0ICAqL1xuXG5cdGxvY2s6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsaW5lcyA9IHRoaXMuZ2V0U3RhY2soKS5zcGxpdCgnXFxuJyk7XG5cblx0XHRpZihsaW5lcy5sZW5ndGggPiAyKVxuXHRcdHtcblx0XHRcdGNvbnNvbGUubG9nKCdsb2NrWycgKyB0aGlzLl9sb2NrQ250ICsgJ10gOjogJyArIGxpbmVzWzJdKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cdFx0fVxuXG5cdFx0LyoqL1xuXG5cdFx0aWYodGhpcy5fbG9ja0NudCA8PSAwKVxuXHRcdHtcblx0XHRcdCQoJyNhbWlfbG9ja2VyJykuY3NzKCdkaXNwbGF5JywgJ2ZsZXgnKTtcblxuXHRcdFx0dGhpcy5fbG9ja0NudCA9IDE7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aGlzLl9sb2NrQ250Kys7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBVbmxvY2tzIHRoZSBXZWIgYXBwbGljYXRpb25cblx0ICAqL1xuXG5cdHVubG9jazogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYodGhpcy5fbG9ja0NudCA8PSAxKVxuXHRcdHtcblx0XHRcdCQoJyNhbWlfbG9ja2VyJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuXHRcdFx0dGhpcy5fbG9ja0NudCA9IDA7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aGlzLl9sb2NrQ250LS07XG5cdFx0fVxuXG5cdFx0LyoqL1xuXG5cdFx0bGV0IGxpbmVzID0gdGhpcy5nZXRTdGFjaygpLnNwbGl0KCdcXG4nKTtcblxuXHRcdGlmKGxpbmVzLmxlbmd0aCA+IDIpXG5cdFx0e1xuXHRcdFx0Y29uc29sZS5sb2coJ3VubG9ja1snICsgdGhpcy5fbG9ja0NudCArICddIDo6ICcgKyBsaW5lc1syXSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogTGVhdmUgdGhlIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0bW9kYWxMZWF2ZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxpbmVzID0gdGhpcy5nZXRTdGFjaygpLnNwbGl0KCdcXG4nKTtcblxuXHRcdGlmKGxpbmVzLmxlbmd0aCA+IDIpXG5cdFx0e1xuXHRcdFx0Y29uc29sZS5sb2coJ21vZGFsTG9ja1snICsgdGhpcy5fbG9ja0NudCArICddIDo6ICcgKyBsaW5lc1syXSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXHRcdH1cblxuXHRcdC8qKi9cblxuXHRcdHRoaXMuX2xvY2tDbnQgPSB0aGlzLl90bXBMb2NrQ250O1xuXG5cdFx0aWYodGhpcy5fbG9ja0NudCA+IDApXG5cdFx0e1xuXHRcdFx0JCgnI2FtaV9sb2NrZXInKS5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRW50ZXIgdGhlIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0bW9kYWxFbnRlcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fdG1wTG9ja0NudCA9IHRoaXMuX2xvY2tDbnQ7XG5cblx0XHRpZih0aGlzLl9sb2NrQ250ID4gMClcblx0XHR7XG5cdFx0XHQkKCcjYW1pX2xvY2tlcicpLmNzcygnZGlzcGxheScsICdub25lJyk7XG5cdFx0fVxuXG5cdFx0LyoqL1xuXG5cdFx0bGV0IGxpbmVzID0gdGhpcy5nZXRTdGFjaygpLnNwbGl0KCdcXG4nKTtcblxuXHRcdGlmKGxpbmVzLmxlbmd0aCA+IDIpXG5cdFx0e1xuXHRcdFx0Y29uc29sZS5sb2coJ21vZGFsVW5sb2NrWycgKyB0aGlzLl9sb2NrQ250ICsgJ10gOjogJyArIGxpbmVzWzJdKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBFbmFibGVzIHRoZSBtZXNzYWdlIGluIGEgY29uZmlybWF0aW9uIGRpYWxvZyBib3ggdG8gaW5mb3JtIHRoYXQgdGhlIHVzZXIgaXMgYWJvdXQgdG8gbGVhdmUgdGhlIGN1cnJlbnQgcGFnZS5cblx0ICAqL1xuXG5cdGNhbkxlYXZlOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jYW5MZWF2ZSA9IHRydWU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIERpc2FibGVzIHRoZSBtZXNzYWdlIGluIGEgY29uZmlybWF0aW9uIGRpYWxvZyBib3ggdG8gaW5mb3JtIHRoYXQgdGhlIHVzZXIgaXMgYWJvdXQgdG8gbGVhdmUgdGhlIGN1cnJlbnQgcGFnZS5cblx0ICAqL1xuXG5cdGNhbm5vdExlYXZlOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jYW5MZWF2ZSA9IGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIE1FU1NBR0VTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3B1Ymxpc2hBbGVydDogZnVuY3Rpb24oY2xhenosIHRpdGxlLCBtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50eXBlT2YobWVzc2FnZSkgPT09ICdBcnJheScpXG5cdFx0e1xuXHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2Uuam9pbignLiAnKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBoYXNoID0gKCcnICsgbWVzc2FnZSkuaGFzaENvZGUoKTtcblxuXHRcdGNvbnN0IGRhdGUgPSBtb21lbnQoKS5mb3JtYXQoJ0REIE1NTSwgSEg6bW06c3MnKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHRvYXN0ID0gJCgnI2FtaV9hbGVydF9jb250ZW50ID4gLnRvYXN0W2RhdGEtaGFzaD1cIicgKyBoYXNoICsgJ1wiXScpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodG9hc3QubGVuZ3RoID09PSAwKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBodG1sID0gW1xuXHRcdFx0XHQnPGRpdiBjbGFzcz1cInRvYXN0XCIgcm9sZT1cImFsZXJ0XCIgJyArIChmYWRlT3V0ID8gJ2RhdGEtZGVsYXk9XCI2MDAwMFwiJyA6ICdkYXRhLWF1dG9oaWRlPVwiZmFsc2VcIicpICsgJyBkYXRhLWhhc2g9XCInICsgaGFzaCArICdcIiBkYXRhLWNudD1cIjFcIj4nLFxuXHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwidG9hc3QtaGVhZGVyXCI+Jyxcblx0XHRcdFx0XHRcdCc8c3Ryb25nIGNsYXNzPVwibXItYXV0byB0ZXh0LScgKyBjbGF6eiArICdcIj4nICsgdGhpcy50ZXh0VG9IdG1sKHRpdGxlKSArICc8L3N0cm9uZz4nLFxuXHRcdFx0XHRcdFx0JzxzbWFsbD4nICsgdGhpcy50ZXh0VG9IdG1sKGRhdGUpICsgJzwvc21hbGw+Jyxcblx0XHRcdFx0XHRcdCc8YnV0dG9uIGNsYXNzPVwibWwtMiBtYi0xIGNsb3NlXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtZGlzbWlzcz1cInRvYXN0XCI+Jyxcblx0XHRcdFx0XHRcdFx0JyZ0aW1lczsnLFxuXHRcdFx0XHRcdFx0JzwvYnV0dG9uPicsXG5cdFx0XHRcdFx0JzwvZGl2PicsXG5cdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJ0b2FzdC1ib2R5XCI+Jyxcblx0XHRcdFx0XHRcdHRoaXMudGV4dFRvSHRtbChtZXNzYWdlKSxcblx0XHRcdFx0XHQnPC9kaXY+Jyxcblx0XHRcdFx0JzwvZGl2PicsXG5cdFx0XHRdO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCgnI2FtaV9hbGVydF9jb250ZW50JykuYXBwZW5kKGh0bWwuam9pbignJykucmVwbGFjZSh0aGlzLl9saW5rRXhwLCAnPGEgaHJlZj1cIiQxXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JDI8L2E+JykpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHQkKCcjYW1pX2FsZXJ0X2NvbnRlbnQgPiAudG9hc3RbZGF0YS1oYXNoPVwiJyArIGhhc2ggKyAnXCJdJykudG9hc3QoJ3Nob3cnKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0b2FzdC5maW5kKCcudG9hc3QtaGVhZGVyID4gc3Ryb25nJykuaHRtbCh0aGlzLnRleHRUb0h0bWwodGl0bGUpXG5cdFx0XHRcdFx0KyAnIDxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtJyArIGNsYXp6ICsgJ1wiPicgKyB0b2FzdC5hdHRyKCdkYXRhLWNudCcsIHBhcnNlSW50KHRvYXN0LmF0dHIoJ2RhdGEtY250JykpICsgMSkuYXR0cignZGF0YS1jbnQnKSArICc8L3NwYW4+Jyk7XG5cdFx0XHR0b2FzdC5maW5kKCcudG9hc3QtaGVhZGVyID4gc21hbGwnKS5odG1sKHRoaXMudGV4dFRvSHRtbChkYXRlKSk7XG5cblx0XHRcdHRvYXN0LnRvYXN0KCdzaG93Jyk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnNvbGUubG9nKCdBTUkgOjogJyArIHRpdGxlLnRvVXBwZXJDYXNlKCkgKyAnOiAnICsgbWVzc2FnZSArICdcXG4nICsgdGhpcy5nZXRTdGFjaygpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cblx0XHQkKGRvY3VtZW50KS5zY3JvbGxUb3AoMCk7XG5cblx0XHR0aGlzLnVubG9jaygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTaG93cyBhbiAnaW5mbycgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IG1lc3NhZ2UgdGhlIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZhZGVPdXQ9ZmFsc2VdIGlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXG5cdCAgKi9cblxuXHRpbmZvOiBmdW5jdGlvbihtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0dGhpcy5fcHVibGlzaEFsZXJ0KCdpbmZvJywgJ0luZm8nLCBtZXNzYWdlLCBmYWRlT3V0KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU2hvd3MgYSAnc3VjY2VzcycgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IG1lc3NhZ2UgdGhlIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZhZGVPdXQ9ZmFsc2VdIGlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXG5cdCAgKi9cblxuXHRzdWNjZXNzOiBmdW5jdGlvbihtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0dGhpcy5fcHVibGlzaEFsZXJ0KCdzdWNjZXNzJywgJ1N1Y2Nlc3MnLCBtZXNzYWdlLCBmYWRlT3V0KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU2hvd3MgYSAnd2FybmluZycgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IG1lc3NhZ2UgdGhlIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZhZGVPdXQ9ZmFsc2VdIGlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXG5cdCAgKi9cblxuXHR3YXJuaW5nOiBmdW5jdGlvbihtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0dGhpcy5fcHVibGlzaEFsZXJ0KCd3YXJuaW5nJywgJ1dhcm5pbmcnLCBtZXNzYWdlLCBmYWRlT3V0KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU2hvd3MgYW4gJ2Vycm9yJyBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbWVzc2FnZSB0aGUgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtCb29sZWFufSBbZmFkZU91dD1mYWxzZV0gaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcblx0ICAqL1xuXG5cdGVycm9yOiBmdW5jdGlvbihtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0dGhpcy5fcHVibGlzaEFsZXJ0KCdkYW5nZXInLCAnRXJyb3InLCBtZXNzYWdlLCBmYWRlT3V0KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRmx1c2hlcyBtZXNzYWdlc1xuXHQgICovXG5cblx0Zmx1c2g6IGZ1bmN0aW9uKClcblx0e1xuXHRcdCQoJyNhbWlfYWxlcnRfY29udGVudCcpLmVtcHR5KCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogQlJFQURDUlVNQiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEZpbGwgdGhlIG1haW4gYnJlYWRjcnVtYlxuXHQgICogQHBhcmFtIHtBcnJheX0gaXRlbXMgdGhlIGFycmF5IG9mIGl0ZW1zIChIVE1MIGZvcm1hdClcblx0ICAqL1xuXG5cdGZpbGxCcmVhZGNydW1iOiBmdW5jdGlvbihpdGVtcylcblx0e1xuXHRcdGxldCBzID0gdGhpcy50eXBlT2YoaXRlbXMpID09PSAnQXJyYXknID8gaXRlbXMubWFwKChpdGVtKSA9PiAnPGxpIGNsYXNzPVwiYnJlYWRjcnVtYi1pdGVtXCI+JyArIGl0ZW0ucmVwbGFjZSgve3tXRUJBUFBfVVJMfX0vZywgdGhpcy53ZWJBcHBVUkwpICsgJzwvbGk+Jykuam9pbignJylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXG5cdFx0JCgnI2FtaV9icmVhZGNydW1iX2NvbnRlbnQnKS5odG1sKHMpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFdFQiBBUFBMSUNBVElPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBUaGlzIG1ldGhvZCBtdXN0IGJlIG92ZXJsb2FkZWQgYW5kIGlzIGNhbGxlZCB3aGVuIHRoZSBXZWIgYXBwbGljYXRpb24gc3RhcnRzXG5cdCAgKiBAZXZlbnQgYW1pV2ViQXBwI29uUmVhZHlcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyRGF0YVxuXHQgICovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoIXRoaXMuX2VtYmVkZGVkKVxuXHRcdHtcblx0XHRcdGFsZXJ0KCdlcnJvcjogYGFtaVdlYkFwcC5vblJlYWR5KClgIG11c3QgYmUgb3ZlcmxvYWRlZCEnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogVGhpcyBtZXRob2QgbXVzdCBiZSBvdmVybG9hZGVkIGFuZCBpcyBjYWxsZWQgd2hlbiB0aGUgdG9vbGJhciBuZWVkcyB0byBiZSB1cGRhdGVkXG5cdCAgKiBAZXZlbnQgYW1pV2ViQXBwI29uUmVmcmVzaFxuXHQgICogQHBhcmFtIHtCb29sZWFufSBpc0F1dGhcblx0ICAqL1xuXG5cdG9uUmVmcmVzaDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoIXRoaXMuX2VtYmVkZGVkKVxuXHRcdHtcblx0XHRcdGFsZXJ0KCdlcnJvcjogYGFtaVdlYkFwcC5vblJlZnJlc2goKWAgbXVzdCBiZSBvdmVybG9hZGVkIScpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTdGFydHMgdGhlIFdlYiBhcHBsaWNhdGlvblxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAobG9nb191cmwsIGhvbWVfdXJsLCB3ZWJhcHBfdXJsLCBjb250YWN0X2VtYWlsLCBhYm91dF91cmwsIHRoZW1lX3VybCwgbG9ja2VyX3VybCwgcGFzc3dvcmRfYXV0aGVudGljYXRpb25fYWxsb3dlZCwgY2VydGlmaWNhdGVfYXV0aGVudGljYXRpb25fYWxsb3dlZCwgY3JlYXRlX2FjY291bnRfYWxsb3dlZCwgY2hhbmdlX2luZm9fYWxsb3dlZCwgY2hhbmdlX3Bhc3N3b3JkX2FsbG93ZWQsIGNoYW5nZV9jZXJ0aWZpY2F0ZV9hbGxvd2VkLCBib29rbWFya3NBbGxvd2VkKVxuXHQgICovXG5cblx0c3RhcnQ6IGZ1bmN0aW9uKHNldHRpbmdzKVxuXHR7XG5cdFx0dGhpcy5fZ2xvYmFsRGVmZXJyZWQuZG9uZSgoKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBbXG5cdFx0XHRcdGxvZ29VUkwsIGhvbWVVUkwsIHdlYkFwcFVSTCwgY29udGFjdEVtYWlsLFxuXHRcdFx0XHRhYm91dFVSTCwgdGhlbWVVUkwsIGxvY2tlclVSTCwgZW5kcG9pbnRVUkwsXG5cdFx0XHRcdHBhc3N3b3JkQXV0aGVudGljYXRpb25BbGxvd2VkLCBjZXJ0aWZpY2F0ZUF1dGhlbnRpY2F0aW9uQWxsb3dlZCxcblx0XHRcdFx0Y3JlYXRlQWNjb3VudEFsbG93ZWQsIGNoYW5nZUluZm9BbGxvd2VkLCBjaGFuZ2VQYXNzd29yZEFsbG93ZWQsIGNoYW5nZUNlcnRpZmljYXRlQWxsb3dlZCxcblx0XHRcdFx0Ym9va21hcmtzQWxsb3dlZCxcblx0XHRcdF0gPSB0aGlzLnNldHVwKFtcblx0XHRcdFx0J2xvZ29fdXJsJywgJ2hvbWVfdXJsJywgJ3dlYmFwcF91cmwnLCAnY29udGFjdF9lbWFpbCcsXG5cdFx0XHRcdCdhYm91dF91cmwnLCAndGhlbWVfdXJsJywgJ2xvY2tlcl91cmwnLCAnZW5kcG9pbnRfdXJsJyxcblx0XHRcdFx0J3Bhc3N3b3JkX2F1dGhlbnRpY2F0aW9uX2FsbG93ZWQnLCAnY2VydGlmaWNhdGVfYXV0aGVudGljYXRpb25fYWxsb3dlZCcsXG5cdFx0XHRcdCdjcmVhdGVfYWNjb3VudF9hbGxvd2VkJywgJ2NoYW5nZV9pbmZvX2FsbG93ZWQnLCAnY2hhbmdlX3Bhc3N3b3JkX2FsbG93ZWQnLCAnY2hhbmdlX2NlcnRpZmljYXRlX2FsbG93ZWQnLFxuXHRcdFx0XHQnYm9va21hcmtzQWxsb3dlZCcsXG5cdFx0XHRdLCBbXG5cdFx0XHRcdHRoaXMub3JpZ2luVVJMXG5cdFx0XHRcdFx0KyAnL2ltYWdlcy9sb2dvLnBuZycsXG5cdFx0XHRcdHRoaXMud2ViQXBwVVJMLFxuXHRcdFx0XHR0aGlzLndlYkFwcFVSTCxcblx0XHRcdFx0J2FtaUBscHNjLmluMnAzLmZyJyxcblx0XHRcdFx0J2h0dHA6Ly9jZXJuLmNoL2FtaS8nLFxuXHRcdFx0XHR0aGlzLm9yaWdpblVSTCArICcvdHdpZy9BTUkvVGhlbWUvYmx1ZS50d2lnJyxcblx0XHRcdFx0dGhpcy5vcmlnaW5VUkwgKyAnL3R3aWcvQU1JL0ZyYWdtZW50L2xvY2tlci50d2lnJyxcblx0XHRcdFx0dGhpcy5vcmlnaW5VUkwgKyAnL0FNSS9Gcm9udEVuZCcsXG5cdFx0XHRcdHRydWUsIHRydWUsXG5cdFx0XHRcdHRydWUsIHRydWUsIHRydWUsIHRydWUsXG5cdFx0XHRcdHRydWUsXG5cdFx0XHRdLCBzZXR0aW5ncyk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRhbWlXZWJBcHAud2ViQXBwVVJMID0gd2ViQXBwVVJMO1xuXG5cdFx0XHRhbWlDb21tYW5kLmVuZHBvaW50ID0gZW5kcG9pbnRVUkw7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR3aW5kb3cub25iZWZvcmV1bmxvYWQgPSAoZSkgPT4ge1xuXG5cdFx0XHRcdGlmKCF0aGlzLl9jYW5MZWF2ZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGYgPSBlIHx8IHdpbmRvdy5ldmVudDtcblxuXHRcdFx0XHRcdGlmKGYpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Zi5yZXR1cm5WYWx1ZSA9ICdDb25maXJtIHRoYXQgeW91IHdhbnQgdG8gbGVhdmUgdGhpcyBwYWdlPyc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuICdDb25maXJtIHRoYXQgeW91IHdhbnQgdG8gbGVhdmUgdGhpcyBwYWdlPyc7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBjb250cm9sc1VSTCA9IHRoaXMub3JpZ2luVVJMICsgJy9jb250cm9scy9DT05UUk9MUy5qc29uJztcblxuXHRcdFx0Y29uc3Qgc3ViYXBwc1VSTCA9IHRoaXMub3JpZ2luVVJMICsgJy9zdWJhcHBzL1NVQkFQUFMuanNvbic7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkLmFqYXgoe3VybDogY29udHJvbHNVUkwsIGNhY2hlOiBmYWxzZSwgY3Jvc3NEb21haW46IHRydWUsIGRhdGFUeXBlOiAnanNvbid9KS50aGVuKChkYXRhMSkgPT4ge1xuXG5cdFx0XHRcdCQuYWpheCh7dXJsOiBzdWJhcHBzVVJMLCBjYWNoZTogZmFsc2UsIGNyb3NzRG9tYWluOiB0cnVlLCBkYXRhVHlwZTogJ2pzb24nfSkudGhlbigoZGF0YTIpID0+IHtcblxuXHRcdFx0XHRcdGZvcihjb25zdCBuYW1lIGluIGRhdGExKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9jb250cm9sc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gZGF0YTFbbmFtZV07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yKGNvbnN0IG5hbWUgaW4gZGF0YTIpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3N1YmFwcHNbbmFtZS50b0xvd2VyQ2FzZSgpXSA9IGRhdGEyW25hbWVdO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKCF0aGlzLl9lbWJlZGRlZClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y29uc3QgZGljdCA9IHtcblx0XHRcdFx0XHRcdFx0TE9HT19VUkw6IGxvZ29VUkwsXG5cdFx0XHRcdFx0XHRcdEhPTUVfVVJMOiBob21lVVJMLFxuXHRcdFx0XHRcdFx0XHRDT05UQUNUX0VNQUlMOiBjb250YWN0RW1haWwsXG5cdFx0XHRcdFx0XHRcdEFCT1VUX1VSTDogYWJvdXRVUkwsXG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0JC5hamF4KHt1cmw6IHRoZW1lVVJMLCBjYWNoZTogdHJ1ZSwgY3Jvc3NEb21haW46IHRydWUsIGRhdGFUeXBlOiAndGV4dCd9KS50aGVuKChkYXRhMykgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdCQuYWpheCh7dXJsOiBsb2NrZXJVUkwsIGNhY2hlOiB0cnVlLCBjcm9zc0RvbWFpbjogdHJ1ZSwgZGF0YVR5cGU6ICd0ZXh0J30pLnRoZW4oKGRhdGE0KSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHQkKCdib2R5JykuYXBwZW5kKHRoaXMuZm9ybWF0VFdJRyhkYXRhMywgZGljdCkgKyBkYXRhNCkucHJvbWlzZSgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmxvY2soKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0YW1pTG9naW4uX3N0YXJ0KFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRwYXNzd29yZEF1dGhlbnRpY2F0aW9uQWxsb3dlZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2VydGlmaWNhdGVBdXRoZW50aWNhdGlvbkFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNyZWF0ZUFjY291bnRBbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjaGFuZ2VJbmZvQWxsb3dlZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hhbmdlUGFzc3dvcmRBbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJvb2ttYXJrc0FsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHQpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMudW5sb2NrKCk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmVycm9yKG1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0YWxlcnQoJ2NvdWxkIG5vdCBvcGVuIGAnICsgbG9ja2VyVVJMICsgJ2AsIHBsZWFzZSByZWxvYWQgdGhlIHBhZ2UuLi4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdGFsZXJ0KCdjb3VsZCBub3Qgb3BlbiBgJyArIHRoZW1lVVJMICsgJ2AsIHBsZWFzZSByZWxvYWQgdGhlIHBhZ2UuLi4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGxldCBkYXRhMyA9ICcnO1xuXG5cdFx0XHRcdFx0XHRpZigkKCcjYW1pX2FsZXJ0X2NvbnRlbnQnKS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdFx0ZGF0YTMgKz0gJzxkaXYgaWQ9XCJhbWlfYWxlcnRfY29udGVudFwiPjwvZGl2Pic7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmKCQoJyNhbWlfbG9naW5fbWVudV9jb250ZW50JykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdGRhdGEzICs9ICc8ZGl2IGlkPVwiYW1pX2xvZ2luX21lbnVfY29udGVudFwiPjwvZGl2Pic7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHQkLmFqYXgoe3VybDogbG9ja2VyVVJMLCBjYWNoZTogdHJ1ZSwgY3Jvc3NEb21haW46IHRydWUsIGRhdGFUeXBlOiAndGV4dCd9KS5kb25lKChkYXRhNCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdCQoJ2JvZHknKS5wcmVwZW5kKGRhdGEzICsgZGF0YTQpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdHRoaXMubG9jaygpO1xuXG5cdFx0XHRcdFx0XHRcdFx0YW1pTG9naW4uX3N0YXJ0KFxuXHRcdFx0XHRcdFx0XHRcdFx0cGFzc3dvcmRBdXRoZW50aWNhdGlvbkFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRjZXJ0aWZpY2F0ZUF1dGhlbnRpY2F0aW9uQWxsb3dlZCxcblx0XHRcdFx0XHRcdFx0XHRcdGNyZWF0ZUFjY291bnRBbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2hhbmdlSW5mb0FsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRjaGFuZ2VQYXNzd29yZEFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRjaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRib29rbWFya3NBbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMudW5sb2NrKCk7XG5cblx0XHRcdFx0XHRcdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuZXJyb3IobWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9LCAoKSA9PiB7XG5cblx0XHRcdFx0XHRhbGVydCgnY291bGQgbm90IG9wZW4gYCcgKyBzdWJhcHBzVVJMICsgJ2AsIHBsZWFzZSByZWxvYWQgdGhlIHBhZ2UuLi4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdGFsZXJ0KCdjb3VsZCBub3Qgb3BlbiBgJyArIGNvbnRyb2xzVVJMICsgJ2AsIHBsZWFzZSByZWxvYWQgdGhlIHBhZ2UuLi4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbGVydChtZXNzYWdlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogQ09OVFJPTFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIGEgY29udHJvbFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGNvbnRyb2wgdGhlIGFycmF5IG9mIGNvbnRyb2wgbmFtZVxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRDb250cm9sOiBmdW5jdGlvbihjb250cm9sLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoY29udHJvbC5pbmRleE9mKCdjdHJsOicpID09PSAwKVxuXHRcdHtcblx0XHRcdGNvbnRyb2wgPSBjb250cm9sLnN1YnN0cmluZyg1KTtcblx0XHR9XG5cblx0XHRjb25zdCBkZXNjciA9IHRoaXMuX2NvbnRyb2xzW2NvbnRyb2wudG9Mb3dlckNhc2UoKV07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihkZXNjcilcblx0XHR7XG5cdFx0XHR0aGlzLmxvYWRTY3JpcHRzKHRoaXMub3JpZ2luVVJMICsgJy8nICsgZGVzY3IuZmlsZSkudGhlbigobG9hZGVkKSA9PiB7XG5cblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBjbGF6eiA9IHdpbmRvd1tcblx0XHRcdFx0XHRcdGRlc2NyLmNsYXp6XG5cdFx0XHRcdFx0XTtcblxuXHRcdFx0XHRcdGNvbnN0IHByb21pc2UgPSBsb2FkZWRbMF0gPyBjbGF6ei5wcm90b3R5cGUub25SZWFkeS5hcHBseShjbGF6ei5wcm90b3R5cGUpXG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICA6IC8qLS0tLS0tLS0tLS0tLS0tLSovIG51bGwgLyotLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRfYW1pX2ludGVybmFsX3RoZW4ocHJvbWlzZSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgWy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyBjbGF6eiAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tKi9dKTtcblxuXHRcdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgY29udHJvbCBgJyArIGNvbnRyb2wgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaChtZXNzYWdlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBjb250cm9sIGAnICsgY29udHJvbCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBjb250cm9sIGAnICsgY29udHJvbCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBmaW5kIGNvbnRyb2wgYCcgKyBjb250cm9sICsgJ2AnXSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2xcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyZW50XSA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbb3duZXJdID8/P1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IGNvbnRyb2wgPz8/XG5cdCAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y3JlYXRlQ29udHJvbDogZnVuY3Rpb24ocGFyZW50LCBvd25lciwgY29udHJvbCwgcGFyYW1zLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5sb2FkQ29udHJvbChjb250cm9sLCBzZXR0aW5ncykuZG9uZSgoY29uc3RydWN0b3IpID0+IHtcblxuXHRcdFx0bGV0IGluc3RhbmNlID0gbmV3IGNvbnN0cnVjdG9yKHBhcmVudCwgb3duZXIpO1xuXG5cdFx0XHRfYW1pX2ludGVybmFsX3RoZW4oY29uc3RydWN0b3IucHJvdG90eXBlLnJlbmRlci5hcHBseShpbnN0YW5jZSwgcGFyYW1zKSwgZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtpbnN0YW5jZV0uY29uY2F0KFsuLi5hcmd1bWVudHNdKSk7XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gdGhlIGJvZHlcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyZW50XSA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbb3duZXJdID8/P1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IGNvbnRyb2wgPz8/XG5cdCAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXNXaXRob3V0U2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gY29udHJvbFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNyZWF0ZUNvbnRyb2xJbkJvZHk6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIsIGNvbnRyb2wsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MsIGNvbnRyb2xTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0cnlcblx0XHR7XG5cdFx0XHRsZXQgUEFSQU1TID0gW107XG5cdFx0XHRsZXQgU0VUVElOR1MgPSB7fTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGZvcihsZXQga2V5IGluIHBhcmVudFNldHRpbmdzKSB7XG5cdFx0XHRcdFNFVFRJTkdTW2tleV0gPSBwYXJlbnRTZXR0aW5nc1trZXldO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IobGV0IGtleSBpbiBjb250cm9sU2V0dGluZ3MpIHtcblx0XHRcdFx0U0VUVElOR1Nba2V5XSA9IGNvbnRyb2xTZXR0aW5nc1trZXldO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Ly8vLy8vLnB1c2goc2VsZWN0b3IpO1xuXG5cdFx0XHRBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShQQVJBTVMsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MpO1xuXG5cdFx0XHRQQVJBTVMucHVzaChTRVRUSU5HUyk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLmNyZWF0ZUNvbnRyb2wocGFyZW50LCBvd25lciwgY29udHJvbCwgUEFSQU1TKS5kb25lKGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbLi4uYXJndW1lbnRzXSk7XG5cblx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblx0XHRjYXRjaChtZXNzYWdlKVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gYSBjb250YWluZXJcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyZW50XSA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbb3duZXJdID8/P1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IGNvbnRyb2wgPz8/XG5cdCAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXNXaXRob3V0U2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gY29udHJvbFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IGljb24gPz8/XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdGl0bGUgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y3JlYXRlQ29udHJvbEluQ29udGFpbmVyOiBmdW5jdGlvbihwYXJlbnQsIG93bmVyLCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBpY29uLCB0aXRsZSwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSB0aGlzLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRyeVxuXHRcdHtcblx0XHRcdHBhcmVudC5hcHBlbmRJdGVtKCc8aSBjbGFzcz1cImZhIGZhLScgKyB0aGlzLnRleHRUb0h0bWwoaWNvbikgKyAnXCI+PC9pPiAnICsgdGhpcy50ZXh0VG9IdG1sKHRpdGxlKSkuZG9uZSgoc2VsZWN0b3IpID0+IHtcblxuXHRcdFx0XHRsZXQgUEFSQU1TID0gW107XG5cdFx0XHRcdGxldCBTRVRUSU5HUyA9IHt9O1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Zm9yKGxldCBrZXkgaW4gcGFyZW50U2V0dGluZ3MpIHtcblx0XHRcdFx0XHRTRVRUSU5HU1trZXldID0gcGFyZW50U2V0dGluZ3Nba2V5XTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvcihsZXQga2V5IGluIGNvbnRyb2xTZXR0aW5ncykge1xuXHRcdFx0XHRcdFNFVFRJTkdTW2tleV0gPSBjb250cm9sU2V0dGluZ3Nba2V5XTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0UEFSQU1TLnB1c2goc2VsZWN0b3IpO1xuXG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KFBBUkFNUywgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncyk7XG5cblx0XHRcdFx0UEFSQU1TLnB1c2goU0VUVElOR1MpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0dGhpcy5jcmVhdGVDb250cm9sKHBhcmVudCwgb3duZXIsIGNvbnRyb2wsIFBBUkFNUykuZG9uZShmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbLi4uYXJndW1lbnRzXSk7XG5cblx0XHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRjYXRjaChtZXNzYWdlKVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gYSBjb250YWluZXIgZnJvbSBhIFdFQiBsaW5rXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmVudF0gPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW293bmVyXSA/Pz9cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBlbCA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjcmVhdGVDb250cm9sRnJvbVdlYkxpbms6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIsIGVsLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgZGF0YUN0cmwgPSBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtY3RybCcpID8gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWN0cmwnKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblxuXHRcdGxldCBkYXRhQ3RybExvY2F0aW9uID0gZWwuaGFzQXR0cmlidXRlKCdkYXRhLWN0cmwtbG9jYXRpb24nKSA/IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jdHJsLWxvY2F0aW9uJylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBkYXRhUGFyYW1zID0gZWwuaGFzQXR0cmlidXRlKCdkYXRhLXBhcmFtcycpID8gSlNPTi5wYXJzZShlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyYW1zJykpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbXVxuXHRcdDtcblxuXHRcdGxldCBkYXRhU2V0dGluZ3MgPSBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2V0dGluZ3MnKSA/IEpTT04ucGFyc2UoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNldHRpbmdzJykpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDoge31cblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgZGF0YUljb24gPSBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtaWNvbicpID8gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWljb24nKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAncXVlc3Rpb24nXG5cdFx0O1xuXG5cdFx0bGV0IGRhdGFUaXRsZSA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS10aXRsZScpID8gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRpdGxlJylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnVW5rbm93bidcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmxvY2soKTtcblxuXHRcdC8qKi8gaWYoZGF0YUN0cmxMb2NhdGlvbiA9PT0gJ2JvZHknKVxuXHRcdHtcblx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZUNvbnRyb2xJbkJvZHkocGFyZW50LCBvd25lciwgZGF0YUN0cmwsIGRhdGFQYXJhbXMsIGRhdGFTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIHNldHRpbmdzKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLnVubG9jaygpO1xuXG5cdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5lcnJvcihtZXNzYWdlKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlQ29udHJvbEluQ29udGFpbmVyKHBhcmVudCwgb3duZXIsIGRhdGFDdHJsLCBkYXRhUGFyYW1zLCBkYXRhU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBkYXRhSWNvbiwgZGF0YVRpdGxlLCBzZXR0aW5ncykuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy51bmxvY2soKTtcblxuXHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZXJyb3IobWVzc2FnZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogU1VCQVBQUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0cmlnZ2VyTG9naW46IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMuX2lzUmVhZHkpXG5cdFx0e1xuXHRcdFx0X2FtaV9pbnRlcm5hbF90aGVuKHRoaXMuX2N1cnJlbnRTdWJBcHBJbnN0YW5jZS5vbkxvZ2luKHRoaXMuYXJnc1sndXNlcmRhdGEnXSksIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0X2FtaV9pbnRlcm5hbF9hbHdheXModGhpcy5vblJlZnJlc2godHJ1ZSksICgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlKG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRfYW1pX2ludGVybmFsX2Fsd2F5cyh0aGlzLm9uUmVmcmVzaCh0cnVlKSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZXNvbHZlKCk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0cmlnZ2VyTG9nb3V0OiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLl9pc1JlYWR5KVxuXHRcdHtcblx0XHRcdF9hbWlfaW50ZXJuYWxfdGhlbih0aGlzLl9jdXJyZW50U3ViQXBwSW5zdGFuY2Uub25Mb2dvdXQodGhpcy5hcmdzWyd1c2VyZGF0YSddKSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRfYW1pX2ludGVybmFsX2Fsd2F5cyh0aGlzLm9uUmVmcmVzaChmYWxzZSksICgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlKG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRfYW1pX2ludGVybmFsX2Fsd2F5cyh0aGlzLm9uUmVmcmVzaChmYWxzZSksICgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyBhIHN1YmFwcFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHN1YmFwcCB0aGUgc3ViYXBwXG5cdCAgKiBAcGFyYW0gez99IFt1c2VyZGF0YV0gdGhlIHVzZXIgZGF0YVxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRTdWJBcHA6IGZ1bmN0aW9uKHN1YmFwcCwgdXNlcmRhdGEsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmxvY2soKTtcblxuXHRcdHJlc3VsdC5hbHdheXMoKCkgPT4ge1xuXG5cdFx0XHR0aGlzLnVubG9jaygpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoc3ViYXBwLmluZGV4T2YoJ3N1YmFwcDonKSA9PT0gMClcblx0XHR7XG5cdFx0XHRzdWJhcHAgPSBzdWJhcHAuc3Vic3RyaW5nKDcpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGRlc2NyID0gdGhpcy5fc3ViYXBwc1tzdWJhcHAudG9Mb3dlckNhc2UoKV07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihkZXNjcilcblx0XHR7XG5cdFx0XHR0aGlzLmxvYWRTY3JpcHRzKHRoaXMub3JpZ2luVVJMICsgJy8nICsgZGVzY3IuZmlsZSkudGhlbigobG9hZGVkKSA9PiB7XG5cblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLl9jdXJyZW50U3ViQXBwSW5zdGFuY2Uub25FeGl0KHVzZXJkYXRhKTtcblxuXHRcdFx0XHRcdGNvbnN0IGluc3RhbmNlID0gd2luZG93W2Rlc2NyLmluc3RhbmNlXTtcblxuXHRcdFx0XHRcdHRoaXMuX2N1cnJlbnRTdWJBcHBJbnN0YW5jZSA9IGluc3RhbmNlO1xuXG5cdFx0XHRcdFx0LyoqL1xuXG5cdFx0XHRcdFx0dGhpcy5maWxsQnJlYWRjcnVtYihkZXNjci5icmVhZGNydW1iKTtcblxuXHRcdFx0XHRcdGNvbnN0IHByb21pc2UgPSBsb2FkZWRbMF0gPyBpbnN0YW5jZS5vblJlYWR5KHVzZXJkYXRhKVxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgOiAvKi0tLS0tLSovIG51bGwgLyotLS0tLS0qL1xuXHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdF9hbWlfaW50ZXJuYWxfdGhlbihwcm9taXNlLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdGNvbnN0IHByb21pc2UgPSBhbWlMb2dpbi5pc0F1dGhlbnRpY2F0ZWQoKSA/IHRoaXMudHJpZ2dlckxvZ2luKClcblx0XHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMudHJpZ2dlckxvZ291dCgpXG5cdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdHByb21pc2UudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFsvKi0tLS0tLS0tLS0tLS0tLS0tLSovIGluc3RhbmNlIC8qLS0tLS0tLS0tLS0tLS0tLS0tKi9dKTtcblxuXHRcdFx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIHN1YmFwcCBgJyArIHN1YmFwcCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIHN1YmFwcCBgJyArIHN1YmFwcCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoKG1lc3NhZ2UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIHN1YmFwcCBgJyArIHN1YmFwcCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBzdWJhcHAgYCcgKyBzdWJhcHAgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgZmluZCBzdWJhcHAgYCcgKyBzdWJhcHAgKyAnYCddKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogTG9hZHMgYSBzdWJhcHAgYnkgVVJMXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gZGVmYXVsdFN1YkFwcCBpZiAnYW1pV2ViQXBwLmFyZ3NbXCJzdWJhcHBcIl0nIGlzIG51bGwsIHRoZSBkZWZhdWx0IHN1YmFwcFxuXHQgICogQHBhcmFtIHs/fSBbZGVmYXVsdFVzZXJEYXRhXSBpZiAnYW1pV2ViQXBwLmFyZ3NbXCJ1c2VyZGF0YVwiXScgaXMgbnVsbCwgdGhlIGRlZmF1bHQgdXNlciBkYXRhXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkU3ViQXBwQnlVUkw6IGZ1bmN0aW9uKGRlZmF1bHRTdWJBcHAsIGRlZmF1bHRVc2VyRGF0YSlcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGlmKHRoaXMuYXJnc1sndiddKVxuXHRcdHtcblx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnR2V0SGFzaEluZm8gLWhhc2g9XCInICsgdGhpcy50ZXh0VG9TdHJpbmcodGhpcy5hcmdzWyd2J10pICsgJ1wiJykuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cblx0XHRcdH0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0XHRsZXQganNvbjtcblxuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGpzb24gPSBKU09OLnBhcnNlKHRoaXMuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwianNvblwifS4kJywgZGF0YSlbMF0gfHwgJ3t9Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2gobWVzc2FnZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGpzb24gPSB7LyogRU1QVFkgSlNPTiAgIEVNUFRZIEpTT04gICBFTVBUWSBKU09OICAgRU1QVFkgSlNPTiAgIEVNUFRZIEpTT04gKi99O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBzdWJhcHAgPSBqc29uWydzdWJhcHAnXSB8fCBkZWZhdWx0U3ViQXBwO1xuXHRcdFx0XHRjb25zdCB1c2VyZGF0YSA9IGpzb25bJ3VzZXJkYXRhJ10gfHwgZGVmYXVsdFVzZXJEYXRhO1xuXG5cdFx0XHRcdHRoaXMubG9hZFN1YkFwcChzdWJhcHAsIHVzZXJkYXRhKS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlKCk7XG5cblx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGlmKCFhbWlSb3V0ZXIuY2hlY2soKSlcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBzdWJhcHAgPSB0aGlzLmFyZ3NbJ3N1YmFwcCddIHx8IGRlZmF1bHRTdWJBcHA7XG5cdFx0XHRcdGNvbnN0IHVzZXJkYXRhID0gdGhpcy5hcmdzWyd1c2VyZGF0YSddIHx8IGRlZmF1bHRVc2VyRGF0YTtcblxuXHRcdFx0XHR0aGlzLmxvYWRTdWJBcHAoc3ViYXBwLCB1c2VyZGF0YSkudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXG5cdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pLklDb250cm9sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgQU1JIGNvbnRyb2wgaW50ZXJmYWNlXG4gKiBAaW50ZXJmYWNlIGFtaS5JQ29udHJvbFxuICovXG5cbiRBTUlJbnRlcmZhY2UoJ2FtaS5JQ29udHJvbCcsIC8qKiBAbGVuZHMgYW1pLklDb250cm9sICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFBhdGNoZXMgYW4gSFRNTCBpZGVudGlmaWVyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gaWQgdGhlIHVucGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBwYXRjaGVkIEhUTUwgaWRlbnRpZmllclxuXHQgICovXG5cblx0cGF0Y2hJZDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUHV0cyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgdGhlIHRhcmdldCBzZWxlY3RvclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgZnJhZ21lbnRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRyZXBsYWNlSFRNTDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUHJlcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIHRoZSB0YXJnZXQgc2VsZWN0b3Jcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0d2lnIHRoZSBUV0lHIGZyYWdtZW50XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0cHJlcGVuZEhUTUw6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFwcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIHRoZSB0YXJnZXQgc2VsZWN0b3Jcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0d2lnIHRoZSBUV0lHIGZyYWdtZW50XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0YXBwZW5kSFRNTDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgaXMgcmVhZHkgdG8gcnVuXG5cdCAgKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDYWxsZWQgd2hlbiB0aGUgY29udHJvbCBpcyByZW1vdmVkXG5cdCAgKi9cblxuXHRvblJlbW92ZTogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pLklTdWJBcHAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgQU1JIHN1Yi1hcHBsaWNhdGlvbiBpbnRlcmZhY2VcbiAqIEBpbnRlcmZhY2UgYW1pLklTdWJBcHBcbiAqL1xuXG4kQU1JSW50ZXJmYWNlKCdhbWkuSVN1YkFwcCcsIC8qKiBAbGVuZHMgYW1pLklTdWJBcHAgKi8ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyByZWFkeSB0byBydW5cblx0ICAqIEBwYXJhbSB7P30gdXNlcmRhdGEgdXNlcmRhdGFcblx0ICAqL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENhbGxlZCB3aGVuIHRoZSBzdWItYXBwbGljYXRpb24gaXMgYWJvdXQgdG8gZXhpdFxuXHQgICogQHBhcmFtIHs/fSB1c2VyZGF0YSB1c2VyZGF0YVxuXHQgICovXG5cblx0b25FeGl0OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDYWxsZWQgd2hlbiBsb2dnaW5nIGluXG5cdCAgKiBAcGFyYW0gez99IHVzZXJkYXRhIHVzZXJkYXRhXG5cdCAgKi9cblxuXHRvbkxvZ2luOiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDYWxsZWQgd2hlbiBsb2dnaW5nIG91dFxuXHQgICogQHBhcmFtIHs/fSB1c2VyZGF0YSB1c2VyZGF0YVxuXHQgICovXG5cblx0b25Mb2dvdXQ6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaS5Db250cm9sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIGJhc2ljIEFNSSBjb250cm9sXG4gKiBAY2xhc3MgYW1pLkNvbnRyb2xcbiAqIEBpbXBsZW1lbnRzIHthbWkuSUNvbnRyb2x9XG4gKi9cblxuJEFNSUNsYXNzKCdhbWkuQ29udHJvbCcsIC8qKiBAbGVuZHMgYW1pLkNvbnRyb2wgKi8ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbXBsZW1lbnRzOiBbYW1pLklDb250cm9sXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGFtaS5Db250cm9sLmluc3RhbmNlQ250ID0gMTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihwYXJlbnQsIG93bmVyKVxuXHR7XG5cdFx0dGhpcy5fcGFyZW50ID0gKHBhcmVudCB8fCB0aGlzKTtcblx0XHR0aGlzLl9vd25lciA9IChvd25lciB8fCB0aGlzKTtcblxuXHRcdHRoaXMuaW5zdGFuY2VTdWZmaXggPSBhbWkuQ29udHJvbC5pbnN0YW5jZUNudCsrO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0UGFyZW50OiBmdW5jdGlvbihwYXJlbnQpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGFyZW50ID0gKHBhcmVudCB8fCB0aGlzKTtcblx0fSxcblxuXHRnZXRQYXJlbnQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wYXJlbnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRPd25lcjogZnVuY3Rpb24ob3duZXIpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fb3duZXIgPSAob3duZXIgfHwgdGhpcyk7XG5cdH0sXG5cblx0Z2V0T3duZXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9vd25lcjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldFNlbGVjdG9yOiBmdW5jdGlvbihzZWxlY3RvciA9ICcnKVxuXHR7XG5cdFx0aWYoc2VsZWN0b3IpXG5cdFx0e1xuXHRcdFx0JChzZWxlY3Rvcikub24oJ3JlbW92ZScsICgpID0+IHtcblxuXHRcdFx0XHR0aGlzLm9uUmVtb3ZlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5fc2VsZWN0b3IgPSBzZWxlY3Rvcjtcblx0fSxcblxuXHRnZXRTZWxlY3RvcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NlbGVjdG9yO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGF0Y2hJZDogZnVuY3Rpb24oaWRlbnRpZmllcilcblx0e1xuXHRcdHJldHVybiBpZGVudGlmaWVyICsgJ19pbnN0YW5jZScgKyB0aGlzLmluc3RhbmNlU3VmZml4O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVwbGFjZUhUTUw6IGZ1bmN0aW9uKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncyA9IHt9KVxuXHR7XG5cdFx0c2V0dGluZ3Muc3VmZml4ID0gdGhpcy5pbnN0YW5jZVN1ZmZpeDtcblxuXHRcdHJldHVybiBhbWlXZWJBcHAucmVwbGFjZUhUTUwoc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHByZXBlbmRIVE1MOiBmdW5jdGlvbihzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MgPSB7fSlcblx0e1xuXHRcdHNldHRpbmdzLnN1ZmZpeCA9IHRoaXMuaW5zdGFuY2VTdWZmaXg7XG5cblx0XHRyZXR1cm4gYW1pV2ViQXBwLnByZXBlbmRIVE1MKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRhcHBlbmRIVE1MOiBmdW5jdGlvbihzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MgPSB7fSlcblx0e1xuXHRcdHNldHRpbmdzLnN1ZmZpeCA9IHRoaXMuaW5zdGFuY2VTdWZmaXg7XG5cblx0XHRyZXR1cm4gYW1pV2ViQXBwLmFwcGVuZEhUTUwoc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNyZWF0ZUNvbnRyb2w6IGZ1bmN0aW9uKHBhcmVudCwgY29udHJvbCwgcGFyYW1zLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAuY3JlYXRlQ29udHJvbChwYXJlbnQsIHRoaXMsIGNvbnRyb2wsIHBhcmFtcywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y3JlYXRlQ29udHJvbEluQm9keTogZnVuY3Rpb24ocGFyZW50LCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAuY3JlYXRlQ29udHJvbEluQm9keShwYXJlbnQsIHRoaXMsIGNvbnRyb2wsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MsIGNvbnRyb2xTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lcjogZnVuY3Rpb24ocGFyZW50LCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBpY29uLCB0aXRsZSwgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lcihwYXJlbnQsIHRoaXMsIGNvbnRyb2wsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MsIGNvbnRyb2xTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIGljb24sIHRpdGxlLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjcmVhdGVDb250cm9sRnJvbVdlYkxpbms6IGZ1bmN0aW9uKHBhcmVudCwgZWwsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAuY3JlYXRlQ29udHJvbEZyb21XZWJMaW5rKHBhcmVudCwgdGhpcywgZWwsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvblJlbW92ZTogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pLlN1YkFwcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgYmFzaWMgQU1JIHN1Yi1hcHBsaWNhdGlvblxuICogQGNsYXNzIGFtaS5TdWJBcHBcbiAqIEBpbXBsZW1lbnRzIHthbWkuSVN1YkFwcH1cbiAqL1xuXG4kQU1JQ2xhc3MoJ2FtaS5TdWJBcHAnLCAvKiogQGxlbmRzIGFtaS5TdWJBcHAgKi8ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbXBsZW1lbnRzOiBbYW1pLklTdWJBcHBdLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25FeGl0OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25Mb2dpbjogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uTG9nb3V0OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaUNvbW1hbmQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIEFNSSBjb21tYW5kIHN1YnN5c3RlbVxuICogQG5hbWVzcGFjZSBhbWlDb21tYW5kXG4gKi9cblxuJEFNSU5hbWVzcGFjZSgnYW1pQ29tbWFuZCcsIC8qKiBAbGVuZHMgYW1pQ29tbWFuZCAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBVQkxJQyBNRU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBEZWZhdWx0IGVuZHBvaW50XG5cdCAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICovXG5cblx0ZW5kcG9pbnQ6ICdodHRwOi8veHh5eS56eicsXG5cblx0LyoqXG5cdCAgKiBEZWZhdWx0IGNvbnZlcnRlclxuXHQgICogQHR5cGUge1N0cmluZ31cblx0ICAqL1xuXG5cdGNvbnZlcnRlcjogJ0FNSVhtbFRvSnNvbi54c2wnLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBVQkxJQyBNRVRIT0RTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBFeGVjdXRlcyBhbiBBTUkgY29tbWFuZFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGNvbW1hbmQgdGhlIGNvbW1hbmRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGVuZHBvaW50LCBjb252ZXJ0ZXIsIHRpbWVvdXQsIGV4dHJhUGFyYW0sIGV4dHJhVmFsdWUpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRleGVjdXRlOiBmdW5jdGlvbihjb21tYW5kLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtlbmRwb2ludCwgY29udmVydGVyLCBjb250ZXh0LCB0aW1lb3V0LCBleHRyYVBhcmFtLCBleHRyYVZhbHVlXSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnZW5kcG9pbnQnLCAnY29udmVydGVyJywgJ2NvbnRleHQnLCAndGltZW91dCcsICdleHRyYVBhcmFtJywgJ2V4dHJhVmFsdWUnXSxcblx0XHRcdFt0aGlzLmVuZHBvaW50LCB0aGlzLmNvbnZlcnRlciwgcmVzdWx0LCAyICogNjAgKiAxMDAwLCBudWxsLCBudWxsXSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IFVSTCA9IGVuZHBvaW50LnRyaW0oKTtcblx0XHRjb25zdCBDT01NQU5EID0gY29tbWFuZC50cmltKCk7XG5cdFx0Y29uc3QgQ09OVkVSVEVSID0gY29udmVydGVyLnRyaW0oKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRhdGEgPSB7XG5cdFx0XHRDb21tYW5kOiBDT01NQU5ELFxuXHRcdFx0Q29udmVydGVyOiBDT05WRVJURVIsXG5cdFx0fTtcblxuXHRcdGlmKGV4dHJhUGFyYW0pXG5cdFx0e1xuXHRcdFx0ZGF0YVtleHRyYVBhcmFtXSA9IGV4dHJhVmFsdWUgPyBleHRyYVZhbHVlXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICgoKG51bGwpKSlcblx0XHRcdDtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1cmxXaXRoUGFyYW1ldGVycyA9IFVSTCArICc/JyArICQucGFyYW0oZGF0YSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihDT05WRVJURVIgPT09ICdBTUlYbWxUb0pzb24ueHNsJylcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEpTT04gRk9STUFUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHVybDogVVJMLFxuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdHRpbWVvdXQ6IHRpbWVvdXQsXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdHhockZpZWxkczoge1xuXHRcdFx0XHRcdHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xuXG5cdFx0XHRcdFx0Y29uc3QgaW5mbyA9IEpTUGF0aC5hcHBseSgnLkFNSU1lc3NhZ2UuaW5mby4kJywgZGF0YSk7XG5cdFx0XHRcdFx0Y29uc3QgZXJyb3IgPSBKU1BhdGguYXBwbHkoJy5BTUlNZXNzYWdlLmVycm9yLiQnLCBkYXRhKTtcblxuXHRcdFx0XHRcdGlmKGVycm9yLmxlbmd0aCA9PT0gMClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2RhdGEsIGluZm8uam9pbignLiAnKSwgdXJsV2l0aFBhcmFtZXRlcnNdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFtkYXRhLCBlcnJvci5qb2luKCcuICcpLCB1cmxXaXRoUGFyYW1ldGVyc10pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6IChqcVhIUiwgdGV4dFN0YXR1cykgPT4ge1xuXG5cdFx0XHRcdFx0aWYodGV4dFN0YXR1cyA9PT0gJ2Vycm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZXh0U3RhdHVzID0gJ3NlcnZpY2UgdGVtcG9yYXJpbHkgdW5yZWFjaGFibGUnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKHRleHRTdGF0dXMgPT09ICdwYXJzZXJlcnJvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGV4dFN0YXR1cyA9ICdyZXNvdXJjZSB0ZW1wb3JhcmlseSB1bnJlYWNoYWJsZSc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Y29uc3QgZGF0YSA9IHsnQU1JTWVzc2FnZSc6IFt7J2Vycm9yJzogW3snJCc6IHRleHRTdGF0dXN9XX1dfTtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFtkYXRhLCB0ZXh0U3RhdHVzLCB1cmxXaXRoUGFyYW1ldGVyc10pO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIE9USEVSIEZPUk1BVFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHVybDogVVJMLFxuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdHRpbWVvdXQ6IHRpbWVvdXQsXG5cdFx0XHRcdGRhdGFUeXBlOiAndGV4dCcsXG5cdFx0XHRcdHhockZpZWxkczoge1xuXHRcdFx0XHRcdHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtkYXRhLCBkYXRhLCB1cmxXaXRoUGFyYW1ldGVyc10pO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRlcnJvcjogKGpxWEhSLCB0ZXh0U3RhdHVzKSA9PiB7XG5cblx0XHRcdFx0XHRpZih0ZXh0U3RhdHVzID09PSAnZXJyb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRleHRTdGF0dXMgPSAnc2VydmljZSB0ZW1wb3JhcmlseSB1bnJlYWNoYWJsZSc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW3RleHRTdGF0dXMsIHRleHRTdGF0dXMsIHVybFdpdGhQYXJhbWV0ZXJzXSk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIExvZ3MgaW4gYnkgbG9naW4vcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyIHRoZSB1c2VyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGFzcyB0aGUgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRwYXNzTG9naW46IGZ1bmN0aW9uKHVzZXIsIHBhc3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuZXhlY3V0ZSgnR2V0U2Vzc2lvbkluZm8gLUFNSVVzZXI9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh1c2VyKSArICdcIiAtQU1JUGFzcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHBhc3MpICsgJ1wiJywge2V4dHJhUGFyYW06ICdOb0NlcnQnfSkudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRjb25zdCB1c2VySW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgcm9sZUluZm8gPSB7fTtcblx0XHRcdGNvbnN0IGJvb2ttYXJrSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3QgdWRwSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgc3NvSW5mbyA9IHt9O1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwidXNlclwifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0dXNlckluZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInVkcFwifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0dWRwSW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwic3NvXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHRzc29JbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJib29rbWFya1wifS5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRsZXQgaGFzaCA9ICcnO1xuXHRcdFx0XHRjb25zdCBib29rbWFyayA9IHt9O1xuXG5cdFx0XHRcdHJvdy5maWVsZC5mb3JFYWNoKChmaWVsZCkgPT4ge1xuXG5cdFx0XHRcdFx0Ym9va21hcmtbZmllbGRbJ0BuYW1lJ11dID0gZmllbGRbJyQnXTtcblxuXHRcdFx0XHRcdGlmKGZpZWxkWydAbmFtZSddID09PSAnaGFzaCcpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aGFzaCA9IGZpZWxkWyckJ107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRib29rbWFya0luZm9baGFzaF0gPSBib29rbWFyaztcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwicm9sZVwifS5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRsZXQgbmFtZSA9ICcnO1xuXHRcdFx0XHRjb25zdCByb2xlID0ge307XG5cblx0XHRcdFx0cm93LmZpZWxkLmZvckVhY2goKGZpZWxkKSA9PiB7XG5cblx0XHRcdFx0XHRyb2xlW2ZpZWxkWydAbmFtZSddXSA9IGZpZWxkWyckJ107XG5cblx0XHRcdFx0XHRpZihmaWVsZFsnQG5hbWUnXSA9PT0gJ25hbWUnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWUgPSBmaWVsZFsnJCddO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cm9sZUluZm9bbmFtZV0gPSByb2xlO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCBib29rbWFya0luZm8sIHVkcEluZm8sIHNzb0luZm9dKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFtkYXRhLCBtZXNzYWdlLCB7QU1JVXNlcjogJ2d1ZXN0JywgZ3Vlc3RVc2VyOiAnZ3Vlc3QnfSwge30sIHt9LCB7fSwge31dKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBMb2dzIGluIGJ5IGNlcnRpZmljYXRlXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y2VydExvZ2luOiBmdW5jdGlvbihzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmV4ZWN1dGUoJ0dldFNlc3Npb25JbmZvJykudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRjb25zdCB1c2VySW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgcm9sZUluZm8gPSB7fTtcblx0XHRcdGNvbnN0IGJvb2ttYXJrSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3QgdWRwSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgc3NvSW5mbyA9IHt9O1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwidXNlclwifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0dXNlckluZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInVkcFwifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0dWRwSW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwic3NvXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHRzc29JbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJib29rbWFya1wifS5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRsZXQgaGFzaCA9ICcnO1xuXHRcdFx0XHRjb25zdCBib29rbWFyayA9IHt9O1xuXG5cdFx0XHRcdHJvdy5maWVsZC5mb3JFYWNoKChmaWVsZCkgPT4ge1xuXG5cdFx0XHRcdFx0Ym9va21hcmtbZmllbGRbJ0BuYW1lJ11dID0gZmllbGRbJyQnXTtcblxuXHRcdFx0XHRcdGlmKGZpZWxkWydAbmFtZSddID09PSAnaGFzaCcpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aGFzaCA9IGZpZWxkWyckJ107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRib29rbWFya0luZm9baGFzaF0gPSBib29rbWFyaztcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwicm9sZVwifS5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRsZXQgbmFtZSA9ICcnO1xuXHRcdFx0XHRjb25zdCByb2xlID0ge307XG5cblx0XHRcdFx0cm93LmZpZWxkLmZvckVhY2goKGZpZWxkKSA9PiB7XG5cblx0XHRcdFx0XHRyb2xlW2ZpZWxkWydAbmFtZSddXSA9IGZpZWxkWyckJ107XG5cblx0XHRcdFx0XHRpZihmaWVsZFsnQG5hbWUnXSA9PT0gJ25hbWUnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWUgPSBmaWVsZFsnJCddO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cm9sZUluZm9bbmFtZV0gPSByb2xlO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCBib29rbWFya0luZm8sIHVkcEluZm8sIHNzb0luZm9dKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFtkYXRhLCBtZXNzYWdlLCB7QU1JVXNlcjogJ2d1ZXN0JywgZ3Vlc3RVc2VyOiAnZ3Vlc3QnfSwge30sIHt9LCB7fSwge31dKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBMb2dzIG91dFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvZ291dDogZnVuY3Rpb24oc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5leGVjdXRlKCdHZXRTZXNzaW9uSW5mbyAtQU1JVXNlcj1cIlwiIC1BTUlQYXNzPVwiXCInLCB7ZXh0cmFQYXJhbTogJ05vQ2VydCd9KS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGNvbnN0IHVzZXJJbmZvID0ge307XG5cdFx0XHRjb25zdCByb2xlSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3QgYm9va21hcmtJbmZvID0ge307XG5cdFx0XHRjb25zdCB1ZHBJbmZvID0ge307XG5cdFx0XHRjb25zdCBzc29JbmZvID0ge307XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJ1c2VyXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1c2VySW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwidWRwXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1ZHBJbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJzc29cIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHNzb0luZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cImJvb2ttYXJrXCJ9LnJvdycsIGRhdGEpLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGxldCBoYXNoID0gJyc7XG5cdFx0XHRcdGNvbnN0IGJvb2ttYXJrID0ge307XG5cblx0XHRcdFx0cm93LmZpZWxkLmZvckVhY2goKGZpZWxkKSA9PiB7XG5cblx0XHRcdFx0XHRib29rbWFya1tmaWVsZFsnQG5hbWUnXV0gPSBmaWVsZFsnJCddO1xuXG5cdFx0XHRcdFx0aWYoZmllbGRbJ0BuYW1lJ10gPT09ICdoYXNoJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRoYXNoID0gZmllbGRbJyQnXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGJvb2ttYXJrSW5mb1toYXNoXSA9IGJvb2ttYXJrO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJyb2xlXCJ9LnJvdycsIGRhdGEpLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGxldCBuYW1lID0gJyc7XG5cdFx0XHRcdGNvbnN0IHJvbGUgPSB7fTtcblxuXHRcdFx0XHRyb3cuZmllbGQuZm9yRWFjaCgoZmllbGQpID0+IHtcblxuXHRcdFx0XHRcdHJvbGVbZmllbGRbJ0BuYW1lJ11dID0gZmllbGRbJyQnXTtcblxuXHRcdFx0XHRcdGlmKGZpZWxkWydAbmFtZSddID09PSAnbmFtZScpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZSA9IGZpZWxkWyckJ107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyb2xlSW5mb1tuYW1lXSA9IHJvbGU7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIGJvb2ttYXJrSW5mbywgdWRwSW5mbywgc3NvSW5mb10pO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGEsIG1lc3NhZ2UsIHtBTUlVc2VyOiAnZ3Vlc3QnLCBndWVzdFVzZXI6ICdndWVzdCd9LCB7fSwge30sIHt9LCB7fV0pO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEF0dGFjaGVzIGEgY2VydGlmaWNhdGVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyIHRoZSB1c2VyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGFzcyB0aGUgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRhdHRhY2hDZXJ0OiBmdW5jdGlvbih1c2VyLCBwYXNzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGUoJ0dldFNlc3Npb25JbmZvIC1hdHRhY2hDZXJ0IC1hbWlMb2dpbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHVzZXIpICsgJ1wiIC1hbWlQYXNzd29yZD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHBhc3MpICsgJ1wiJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBEZXRhY2hlcyBhIGNlcnRpZmljYXRlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlciB0aGUgdXNlclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhc3MgdGhlIHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0ZGV0YWNoQ2VydDogZnVuY3Rpb24odXNlciwgcGFzcywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5leGVjdXRlKCdHZXRTZXNzaW9uSW5mbyAtZGV0YWNoQ2VydCAtYW1pTG9naW49XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh1c2VyKSArICdcIiAtYW1pUGFzc3dvcmQ9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwYXNzKSArICdcIicsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQWRkcyBhIG5ldyB1c2VyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlciB0aGUgdXNlclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhc3MgdGhlIHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gZmlyc3ROYW1lIHRoZSBmaXJzdCBuYW1lXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gbGFzdE5hbWUgdGhlIGxhc3QgbmFtZVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGVtYWlsIHRoZSBlbWFpbFxuXHQgICogQHBhcmFtIHtCb29sZWFufSBhdHRhY2ggYXR0YWNoIHRoZSBjdXJyZW50IGNlcnRpZmljYXRlXG5cdCAgKiBAcGFyYW0ge0Jvb2xlYW59IGFncmVlIGFncmVlIHdpdGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0YWRkVXNlcjogZnVuY3Rpb24odXNlciwgcGFzcywgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIGF0dGFjaCwgYWdyZWUsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZSgnQWRkVXNlciAtYW1pTG9naW49XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh1c2VyKSArICdcIiAtYW1pUGFzc3dvcmQ9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwYXNzKSArICdcIiAtZmlyc3ROYW1lPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZmlyc3ROYW1lKSArICdcIiAtbGFzdE5hbWU9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhsYXN0TmFtZSkgKyAnXCIgLWVtYWlsPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZW1haWwpICsgJ1wiJyArIChhdHRhY2ggPyAnIC1hdHRhY2gnIDogJycpICsgKGFncmVlID8gJyAtYWdyZWUnIDogJycpLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENoYW5nZXMgdGhlIGFjY291bnQgaW5mb3JtYXRpb25cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBmaXJzdE5hbWUgdGhlIGZpcnN0IG5hbWVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBsYXN0TmFtZSB0aGUgbGFzdCBuYW1lXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gZW1haWwgdGhlIGVtYWlsXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y2hhbmdlSW5mbzogZnVuY3Rpb24oZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZSgnU2V0VXNlckluZm8gLWZpcnN0TmFtZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGZpcnN0TmFtZSkgKyAnXCIgLWxhc3ROYW1lPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcobGFzdE5hbWUpICsgJ1wiIC1lbWFpbD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGVtYWlsKSArICdcIicsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hhbmdlcyB0aGUgYWNjb3VudCBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHVzZXIgdGhlIHVzZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRQYXNzIHRoZSBvbGQgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBuZXdQYXNzIHRoZSBuZXcgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjaGFuZ2VQYXNzOiBmdW5jdGlvbih1c2VyLCBvbGRQYXNzLCBuZXdQYXNzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGUoJ0NoYW5nZVBhc3N3b3JkIC1hbWlMb2dpbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHVzZXIpICsgJ1wiIC1hbWlQYXNzd29yZE9sZD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKG9sZFBhc3MpICsgJ1wiIC1hbWlQYXNzd29yZE5ldz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKG5ld1Bhc3MpICsgJ1wiJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBSZXNldHMgdGhlIGFjY291bnQgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyIHRoZSB1c2VyXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0cmVzZXRQYXNzOiBmdW5jdGlvbih1c2VyLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGUoJ1Jlc2V0UGFzc3dvcmQgLWFtaUxvZ2luPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodXNlcikgKyAnXCInLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pTG9naW4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgQU1JIGF1dGhlbnRpY2F0aW9uIHN1YnN5c3RlbVxuICogQG5hbWVzcGFjZSBhbWlMb2dpblxuICovXG5cbiRBTUlOYW1lc3BhY2UoJ2FtaUxvZ2luJywgLyoqIEBsZW5kcyBhbWlMb2dpbiAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBVQkxJQyBNRU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFzc3dvcmRBdXRoZW50aWNhdGlvbkFsbG93ZWQ6IHRydWUsXG5cdGNlcnRpZmljYXRlQXV0aGVudGljYXRpb25BbGxvd2VkOiB0cnVlLFxuXHRjcmVhdGVBY2NvdW50QWxsb3dlZDogdHJ1ZSxcblx0Y2hhbmdlSW5mb0FsbG93ZWQ6IHRydWUsXG5cdGNoYW5nZVBhc3N3b3JkQWxsb3dlZDogdHJ1ZSxcblx0Y2hhbmdlQ2VydGlmaWNhdGVBbGxvd2VkOiB0cnVlLFxuXHRib29rbWFya3NBbGxvd2VkOiB0cnVlLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dXNlcjogJ2d1ZXN0Jyxcblx0Z3Vlc3Q6ICdndWVzdCcsXG5cblx0Y2xpZW50RE46ICcnLCAvLyBmYWlyZSBkaXNwYXJhaXRyZSBjZXMgdmFyaWFibGVzIGV0IGxlcyBnZXR0ZXJzXG5cdGlzc3VlckROOiAnJywgLy8gZmFpcmUgZGlzcGFyYWl0cmUgY2VzIHZhcmlhYmxlcyBldCBsZXMgZ2V0dGVyc1xuXG5cdG5vdEJlZm9yZTogJycsIC8vIGZhaXJlIGRpc3BhcmFpdHJlIGNlcyB2YXJpYWJsZXMgZXQgbGVzIGdldHRlcnNcblx0bm90QWZ0ZXI6ICcnLCAvLyBmYWlyZSBkaXNwYXJhaXRyZSBjZXMgdmFyaWFibGVzIGV0IGxlcyBnZXR0ZXJzXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR1c2VySW5mbzoge30sXG5cdHJvbGVJbmZvOiB7fSxcblx0Ym9va21hcmtJbmZvOiB7fSxcblx0dWRwSW5mbzoge30sXG5cdHNzb0luZm86IHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBSSVZBVEUgTUVUSE9EUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3N0YXJ0OiBmdW5jdGlvbihwYXNzd29yZEF1dGhlbnRpY2F0aW9uQWxsb3dlZCwgY2VydGlmaWNhdGVBdXRoZW50aWNhdGlvbkFsbG93ZWQsIGNyZWF0ZUFjY291bnRBbGxvd2VkLCBjaGFuZ2VJbmZvQWxsb3dlZCwgY2hhbmdlUGFzc3dvcmRBbGxvd2VkLCBjaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWQsIGJvb2ttYXJrc0FsbG93ZWQpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9hZFRXSUdzKFtcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL3R3aWcvQU1JL0ZyYWdtZW50L2xvZ2luX2J1dHRvbi50d2lnJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL3R3aWcvQU1JL0ZyYWdtZW50L2xvZ291dF9idXR0b24udHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy90d2lnL0FNSS9Nb2RhbC9sb2dpbi50d2lnJyxcblx0XHRdKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLmZyYWdtZW50TG9naW5CdXR0b24gPSBkYXRhWzBdO1xuXHRcdFx0dGhpcy5mcmFnbWVudExvZ291dEJ1dHRvbiA9IGRhdGFbMV07XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0XHRwYXNzd29yZEF1dGhlbnRpY2F0aW9uQWxsb3dlZDogdGhpcy5wYXNzd29yZEF1dGhlbnRpY2F0aW9uQWxsb3dlZCA9IHBhc3N3b3JkQXV0aGVudGljYXRpb25BbGxvd2VkLFxuXHRcdFx0XHRjZXJ0aWZpY2F0ZUF1dGhlbnRpY2F0aW9uQWxsb3dlZDogdGhpcy5jZXJ0aWZpY2F0ZUF1dGhlbnRpY2F0aW9uQWxsb3dlZCA9IGNlcnRpZmljYXRlQXV0aGVudGljYXRpb25BbGxvd2VkLFxuXHRcdFx0XHRjcmVhdGVBY2NvdW50QWxsb3dlZDogdGhpcy5jcmVhdGVBY2NvdW50QWxsb3dlZCA9IGNyZWF0ZUFjY291bnRBbGxvd2VkLFxuXHRcdFx0XHRjaGFuZ2VJbmZvQWxsb3dlZDogdGhpcy5jaGFuZ2VJbmZvQWxsb3dlZCA9IGNoYW5nZUluZm9BbGxvd2VkLFxuXHRcdFx0XHRjaGFuZ2VQYXNzd29yZEFsbG93ZWQ6IHRoaXMuY2hhbmdlUGFzc3dvcmRBbGxvd2VkID0gY2hhbmdlUGFzc3dvcmRBbGxvd2VkLFxuXHRcdFx0XHRjaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWQ6IHRoaXMuY2hhbmdlQ2VydGlmaWNhdGVBbGxvd2VkID0gY2hhbmdlQ2VydGlmaWNhdGVBbGxvd2VkLFxuXHRcdFx0XHRib29rbWFya3NBbGxvd2VkOiB0aGlzLmJvb2ttYXJrc0FsbG93ZWQgPSBib29rbWFya3NBbGxvd2VkLFxuXHRcdFx0fTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGFtaVdlYkFwcC5hcHBlbmRIVE1MKCdib2R5JywgZGF0YVsyXSwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdCQoJyNCNzg5NENDMV8xREFBXzRBN0VfQjdEMV9EQkRGNkYwNkFDNzMnKS5zdWJtaXQoKGUpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuZm9ybV9sb2dpbihlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnI0VFMDU1Q0Q0X0U1OEZfNDgzNF84MDIwXzk4NkFFM0Y4RDY3RCcpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5mb3JtX2FkZFVzZXIoZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdCQoJyNEQTIwNDdBMl85RTVEXzQyMERfQjZFN19GQTI2MUQyRUYxMEYnKS5zdWJtaXQoKGUpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuZm9ybV9yZW1pbmRQYXNzKGUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcjRDlFQUY5OThfRUQ4RV80NEQyX0EwQkVfOEM1Q0Y1RTQzOEJEJykuc3VibWl0KChlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmZvcm1fY2hhbmdlSW5mbyhlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnI0U5MkExMDk3Xzk4M0JfNDg1N184NzVGXzA3RTQ2NTlCNDFCMCcpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5mb3JtX2NoYW5nZVBhc3MoZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0U2RTMwRUVDXzE1RUVfNEZDRl85ODA5XzJCOEVDMkZFRjM4OCwjQ0NEOEU2RjFfNkRGOF80QkREX0EwRUNfQzNDMzgwODMwMTg3JykuY2hhbmdlKCgpID0+IHtcblxuXHRcdFx0XHRcdGNvbnN0IHBhc3MxID0gJCgnI0U2RTMwRUVDXzE1RUVfNEZDRl85ODA5XzJCOEVDMkZFRjM4OCcpLnZhbCgpO1xuXHRcdFx0XHRcdGNvbnN0IHBhc3MyID0gJCgnI0NDRDhFNkYxXzZERjhfNEJERF9BMEVDX0MzQzM4MDgzMDE4NycpLnZhbCgpO1xuXG5cdFx0XHRcdFx0JCgnI0NDRDhFNkYxXzZERjhfNEJERF9BMEVDX0MzQzM4MDgzMDE4NycpLmdldCgwKS5zZXRDdXN0b21WYWxpZGl0eShcblx0XHRcdFx0XHRcdHBhc3MxLmxlbmd0aCA+IDAgJiYgcGFzczIubGVuZ3RoID4gMCAmJiBwYXNzMSAhPT0gcGFzczIgPyAnUGFzc3dvcmRzIGRvblxcJ3QgbWF0Y2guJyA6ICcnXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnI0Q0ODdGRTcyXzhEOTVfNDA0OF9CRUEzXzI1MjI3NDg2MkFGNCwjRUUxREE1OENfMzc2MV80NzM0X0E5QzJfRTgwOENERDdFRTc3JykuY2hhbmdlKCgpID0+IHtcblxuXHRcdFx0XHRcdGNvbnN0IHBhc3MxID0gJCgnI0Q0ODdGRTcyXzhEOTVfNDA0OF9CRUEzXzI1MjI3NDg2MkFGNCcpLnZhbCgpO1xuXHRcdFx0XHRcdGNvbnN0IHBhc3MyID0gJCgnI0VFMURBNThDXzM3NjFfNDczNF9BOUMyX0U4MDhDREQ3RUU3NycpLnZhbCgpO1xuXG5cdFx0XHRcdFx0JCgnI0VFMURBNThDXzM3NjFfNDczNF9BOUMyX0U4MDhDREQ3RUU3NycpLmdldCgwKS5zZXRDdXN0b21WYWxpZGl0eShcblx0XHRcdFx0XHRcdHBhc3MxLmxlbmd0aCA+IDAgJiYgcGFzczIubGVuZ3RoID4gMCAmJiBwYXNzMSAhPT0gcGFzczIgPyAnUGFzc3dvcmRzIGRvblxcJ3QgbWF0Y2guJyA6ICcnXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZSkgPT4ge1xuXG5cdFx0XHRcdGlmKHRoaXMuc3NvSW5mby51cmwuc3RhcnRzV2l0aChlLm9yaWdpbikpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCB1c2VyID0gZS5kYXRhLnVzZXI7XG5cdFx0XHRcdFx0Y29uc3QgcGFzcyA9IGUuZGF0YS5wYXNzO1xuXG5cdFx0XHRcdFx0aWYodXNlciAmJiBwYXNzKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRoaXMuZm9ybV9sb2dpbjIodXNlciwgcGFzcyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZS5zb3VyY2UuY2xvc2UoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9LCBmYWxzZSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCB1c2VyZGF0YSA9IGFtaVdlYkFwcC5hcmdzWyd1c2VyZGF0YSddIHx8ICcnO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0c2V0SW50ZXJ2YWwoKCkgPT4ge1xuXG5cdFx0XHRcdGlmKGFtaVdlYkFwcC5faXNSZWFkeSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFtaUNvbW1hbmQuY2VydExvZ2luKCkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRhbWlXZWJBcHAubG9jaygpOyBhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cblx0XHRcdFx0XHR9KS5kb25lKChkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIGJvb2ttYXJrSW5mbywgdWRwSW5mbywgc3NvSW5mbykgPT4ge1xuXG5cdFx0XHRcdFx0XHRpZigodXNlckluZm8uQU1JVXNlciB8fCAnJykgPT09ICh1c2VySW5mby5ndWVzdFVzZXIgfHwgJycpKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cGRhdGUodXNlckluZm8sIHJvbGVJbmZvLCBib29rbWFya0luZm8sIHVkcEluZm8sIHNzb0luZm8pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sIDMwICogMTAwMCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRhbWlDb21tYW5kLmNlcnRMb2dpbigpLmZhaWwoKGRhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgYm9va21hcmtJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5fdXBkYXRlKHVzZXJJbmZvLCByb2xlSW5mbywgYm9va21hcmtJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKS5hbHdheXMoKC8qLS0tKi8pID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9KS5kb25lKChkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIGJvb2ttYXJrSW5mbywgdWRwSW5mbywgc3NvSW5mbykgPT4ge1xuXG5cdFx0XHRcdF9hbWlfaW50ZXJuYWxfdGhlbihhbWlXZWJBcHAub25SZWFkeSh1c2VyZGF0YSksICgpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5faXNSZWFkeSA9IHRydWU7XG5cblx0XHRcdFx0XHR0aGlzLl91cGRhdGUodXNlckluZm8sIHJvbGVJbmZvLCBib29rbWFya0luZm8sIHVkcEluZm8sIHNzb0luZm8pLnRoZW4oKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUobWVzc2FnZSk7XG5cblx0XHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuX2lzUmVhZHkgPSB0cnVlO1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9zdWNjZXNzOiBmdW5jdGlvbihtZXNzYWdlKVxuXHR7XG5cdFx0YW1pV2ViQXBwLnN1Y2Nlc3MobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblx0fSxcblxuXHRfZXJyb3I6IGZ1bmN0aW9uKG1lc3NhZ2UpXG5cdHtcblx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblx0fSxcblxuXHRfdW5sb2NrOiBmdW5jdGlvbigpXG5cdHtcblx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9jbGVhbjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0JCgnI0I3ODk0Q0MxXzFEQUFfNEE3RV9CN0QxX0RCREY2RjA2QUM3MycpLnRyaWdnZXIoJ3Jlc2V0Jyk7XG5cdFx0JCgnI0VFMDU1Q0Q0X0U1OEZfNDgzNF84MDIwXzk4NkFFM0Y4RDY3RCcpLnRyaWdnZXIoJ3Jlc2V0Jyk7XG5cdFx0JCgnI0RBMjA0N0EyXzlFNURfNDIwRF9CNkU3X0ZBMjYxRDJFRjEwRicpLnRyaWdnZXIoJ3Jlc2V0Jyk7XG5cdFx0JCgnI0U5MkExMDk3Xzk4M0JfNDg1N184NzVGXzA3RTQ2NTlCNDFCMCcpLnRyaWdnZXIoJ3Jlc2V0Jyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfdXBkYXRlOiBmdW5jdGlvbih1c2VySW5mbywgcm9sZUluZm8sIGJvb2ttYXJrSW5mbywgdWRwSW5mbywgc3NvSW5mbylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVzZXIgPSB0aGlzLnVzZXIgPSB1c2VySW5mby5BTUlVc2VyIHx8ICcnO1xuXHRcdGNvbnN0IGd1ZXN0ID0gdGhpcy5ndWVzdCA9IHVzZXJJbmZvLmd1ZXN0VXNlciB8fCAnJztcblxuXHRcdGNvbnN0IG5vdEJlZm9yZSA9IHRoaXMubm90QmVmb3JlID0gdXNlckluZm8ubm90QmVmb3JlIHx8ICcnO1xuXHRcdGNvbnN0IG5vdEFmdGVyID0gdGhpcy5ub3RBZnRlciA9IHVzZXJJbmZvLm5vdEFmdGVyIHx8ICcnO1xuXG5cdFx0Y29uc3QgY2xpZW50RE5JblNlc3Npb24gPSB0aGlzLmNsaWVudEROID0gdXNlckluZm8uY2xpZW50RE5JblNlc3Npb24gfHwgJyc7XG5cdFx0Y29uc3QgaXNzdWVyRE5JblNlc3Npb24gPSB0aGlzLmlzc3VlckROID0gdXNlckluZm8uaXNzdWVyRE5JblNlc3Npb24gfHwgJyc7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQkKCcjQTA5QUUzMTZfNzA2OF80QkMxXzk2QTlfNkI4N0QyODg2M0ZFJykucHJvcCgnZGlzYWJsZWQnLCAhY2xpZW50RE5JblNlc3Npb24gfHwgIWlzc3VlckROSW5TZXNzaW9uKTtcblxuXHRcdCQoJyNDM0U5NEY2RF80OEUwXzg2QzBfMzUzNF82OTE3MjhFNDkyRjQnKS5hdHRyKCdzcmMnLCB1ZHBJbmZvLnRlcm1zQW5kQ29uZGl0aW9ucyB8fCBhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9kb2NzL3Rlcm1zX2FuZF9jb25kaXRpb25zLmh0bWwnKTtcblx0XHQkKCcjRTUwRkY4QkRfQjBGNV9DRDcyX0Y5RENfRkMyQkZBNURCQTI3JykuYXR0cignc3JjJywgdWRwSW5mby50ZXJtc0FuZENvbmRpdGlvbnMgfHwgYW1pV2ViQXBwLm9yaWdpblVSTCArICcvZG9jcy90ZXJtc19hbmRfY29uZGl0aW9ucy5odG1sJyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnVzZXJJbmZvID0gdXNlckluZm87XG5cdFx0dGhpcy5yb2xlSW5mbyA9IHJvbGVJbmZvO1xuXHRcdHRoaXMuYm9va21hcmtJbmZvID0gYm9va21hcmtJbmZvO1xuXHRcdHRoaXMudWRwSW5mbyA9IHVkcEluZm87XG5cdFx0dGhpcy5zc29JbmZvID0gc3NvSW5mbztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRjcmVhdGVBY2NvdW50QWxsb3dlZDogdGhpcy5jcmVhdGVBY2NvdW50QWxsb3dlZCxcblx0XHRcdGNoYW5nZUluZm9BbGxvd2VkOiB0aGlzLmNoYW5nZUluZm9BbGxvd2VkLFxuXHRcdFx0Y2hhbmdlUGFzc3dvcmRBbGxvd2VkOiB0aGlzLmNoYW5nZVBhc3N3b3JkQWxsb3dlZCxcblx0XHRcdGNoYW5nZUNlcnRpZmljYXRlQWxsb3dlZDogdGhpcy5jaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWQsXG5cdFx0XHRib29rbWFya3NBbGxvd2VkOiB0aGlzLmJvb2ttYXJrc0FsbG93ZWQsXG5cdFx0XHQvKiovXG5cdFx0XHRib29rbWFya0luZm86IHRoaXMuYm9va21hcmtJbmZvLFxuXHRcdFx0LyoqL1xuXHRcdFx0c3NvX2xhYmVsOiBzc29JbmZvLmxhYmVsIHx8ICdTU08nLFxuXHRcdFx0c3NvX3VybDogc3NvSW5mby51cmwgfHwgJ0BOVUxMJyxcblx0XHR9O1xuXG5cdFx0aWYodXNlciAhPT0gZ3Vlc3QpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBHRVQgSU5GTyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCB2YWxpZCA9IHVzZXJJbmZvLnZhbGlkIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCBjZXJ0RW5hYmxlZCA9IHVzZXJJbmZvLmNlcnRFbmFibGVkIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCB2b21zRW5hYmxlZCA9IHVzZXJJbmZvLnZvbXNFbmFibGVkIHx8ICdmYWxzZSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBmaXJzdE5hbWUgPSB1c2VySW5mby5maXJzdE5hbWUgfHwgJyc7XG5cdFx0XHRjb25zdCBsYXN0TmFtZSA9IHVzZXJJbmZvLmxhc3ROYW1lIHx8ICcnO1xuXHRcdFx0Y29uc3QgZW1haWwgPSB1c2VySW5mby5lbWFpbCB8fCAnJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGNsaWVudEROSW5BTUkgPSB1c2VySW5mby5jbGllbnRETkluQU1JIHx8ICcnO1xuXHRcdFx0Y29uc3QgaXNzdWVyRE5JbkFNSSA9IHVzZXJJbmZvLmlzc3VlckROSW5BTUkgfHwgJyc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU0VUIElORk8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCgnI0U1MTNGMjdEXzU1MjFfNEIwOF9CRjYxXzUyQUZCODEzNTZGNycpLnZhbChmaXJzdE5hbWUpO1xuXHRcdFx0JCgnI0FGRjBCNUMwX0JFRUNfNDg0Ml85MTZEX0RDQkE3RjU4OTE5NScpLnZhbChsYXN0TmFtZSk7XG5cdFx0XHQkKCcjQzU4NzQ4NkJfNjJDMF80QjZFXzkyODhfRDhGOUY4OUQxNTdCJykudmFsKGVtYWlsKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQoJyNBQkVCMDI5MV80MEIwXzQxNEFfQTQyQl9FN0VBQkI5QjQ4N0UnKS52YWwoZmlyc3ROYW1lKTtcblx0XHRcdCQoJyNBNUFGREI2Ml8xMDM0XzRGNjZfQTNFNl85MzQxQjMxRkEyOTAnKS52YWwobGFzdE5hbWUpO1xuXHRcdFx0JCgnI0Q3MzBBNzc0XzA1RUFfNDdBQl9BMEM4X0Q5Mjc1MzgwMkUzRScpLnZhbChlbWFpbCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKCcjRDFCRUUzQkZfOTE2MV80MURDX0JDNTNfQzQ0RkZFNEQyNTIyJykudmFsKGNsaWVudEROSW5BTUkpO1xuXHRcdFx0JCgnI0M3NjgwNUQ3XzFFODZfNDIzMV85MDcxXzFEMDQ3ODM0MjNCQicpLnZhbChjbGllbnRETkluU2Vzc2lvbik7XG5cdFx0XHQkKCcjRjQyRkFGNkJfMkM4RF80MTQyXzhCRDlfRTVCQ0RDQUEwNUFBJykudmFsKGlzc3VlckROSW5BTUkpO1xuXHRcdFx0JCgnI0ZFMkY2MjMyX0MyNTZfNEI4MF85MzlDX0VCRUM5MDMyMDMwOCcpLnZhbChpc3N1ZXJETkluU2Vzc2lvbik7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsZXQgdGFibGUgPSBbXTtcblxuXHRcdFx0Zm9yKGxldCByb2xlIGluIHJvbGVJbmZvKVxuXHRcdFx0e1xuXHRcdFx0XHR0YWJsZS5wdXNoKCc8dHI+Jyk7XG5cdFx0XHRcdHRhYmxlLnB1c2goJzx0ZD4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwocm9sZUluZm9bcm9sZV0ubmFtZSB8fCAnTi9BJykgKyAnPC90ZD4nKTtcblx0XHRcdFx0dGFibGUucHVzaCgnPHRkPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChyb2xlSW5mb1tyb2xlXS5kZXNjcmlwdGlvbiB8fCAnTi9BJykgKyAnPC90ZD4nKTtcblx0XHRcdFx0dGFibGUucHVzaCgnPC90cj4nKTtcblx0XHRcdH1cblxuXHRcdFx0JCgnI0JCMDc2NzZCX0VBQ0FfOUI0Ml9FRDUxXzQ3N0RCMjk3NjA0MScpLmh0bWwodGFibGUuam9pbignJykpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIENIRUNLIFVTRVIgU1RBVFVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGxldCBpY29uID0gJyc7XG5cdFx0XHRsZXQgbWVzc2FnZSA9ICcnO1xuXG5cdFx0XHRsZXQgYmdDb2xvciA9ICcnO1xuXHRcdFx0bGV0IGZnQ29sb3IgPSAnJztcblxuXHRcdFx0aWYodmFsaWQgIT09ICdmYWxzZScpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdC8qIFZBTElEIFVTRVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYoY2VydEVuYWJsZWQgIT09ICdmYWxzZScgJiYgY2xpZW50RE5JbkFNSSAmJiBpc3N1ZXJETkluQU1JKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoIWNsaWVudEROSW5TZXNzaW9uXG5cdFx0XHRcdFx0ICAgfHxcblx0XHRcdFx0XHQgICAhaXNzdWVyRE5JblNlc3Npb25cblx0XHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0XHRtZXNzYWdlID0gJ0l0IGlzIHJlY29tbWVuZGVkIHRvIGF1dGhlbnRpY2F0ZSB3aXRoIGEgWC41MDkgY2VydGlmaWNhdGUuJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmKGNsaWVudEROSW5BTUkgIT09IGNsaWVudEROSW5TZXNzaW9uXG5cdFx0XHRcdFx0XHQgICB8fFxuXHRcdFx0XHRcdFx0ICAgaXNzdWVyRE5JbkFNSSAhPT0gaXNzdWVyRE5JblNlc3Npb25cblx0XHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdFx0bWVzc2FnZSA9ICdUaGUgWC41MDkgY2VydGlmaWNhdGUgaW4gdGhlIHNlc3Npb24gZGlmZmVycyBmcm9tIHRoZSBvbmUgaW4gQU1JLic7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihtZXNzYWdlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgnI0Q5NDRCMDFEXzJFOERfNEVFOV85RENDXzI2OTE0MzhCQkExNicpLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGUgdGV4dC13YXJuaW5nXCI+PC9pPiAnICsgbWVzc2FnZSk7XG5cblx0XHRcdFx0XHRpY29uID0gJzxhIGNsYXNzPVwibmF2LWxpbmsgdGV4dC13YXJuaW5nXCIgaHJlZj1cImphdmFzY3JpcHQ6YW1pTG9naW4uYWNjb3VudFN0YXR1cygpO1wiPidcblx0XHRcdFx0XHQgICAgICAgK1xuXHRcdFx0XHRcdCAgICAgICAnPGkgY2xhc3M9XCJmYSBmYS1pbmZvLWNpcmNsZVwiPjwvaT4nXG5cdFx0XHRcdFx0ICAgICAgICtcblx0XHRcdFx0XHQgICAgICAgJzwvYT4nXG5cdFx0XHRcdFx0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHQkKCcjRjNGRjlGNDNfREU3Ml80MEJCX0IxQkFfQjdCM0M5MDAyNjcxJykuY2xvc2VzdCgnLnJvdW5kZWQnKS5jc3MoJ2JhY2tncm91bmQnLCAnI0I4RDQ5QiB1cmwoXCInICsgYW1pV2ViQXBwLm9yaWdpblVSTCArICcvaW1hZ2VzL2NlcnRpZmljYXRlLWdyZWVuLnBuZ1wiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlcicpXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnYmFja2dyb3VuZC1zaXplJywgJ2NvdmVyJylcblx0XHRcdFx0O1xuXG5cdFx0XHRcdCQoJyNGM0ZGOUY0M19ERTcyXzQwQkJfQjFCQV9CN0IzQzkwMDI2NzEnKS5jc3MoJ2NvbG9yJywgJyMwMDY0MDAnKVxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1sZWFmXCI+PC9pPiB2YWxpZCA8aSBjbGFzcz1cImZhIGZhLWxlYWZcIj48L2k+Jylcblx0XHRcdFx0O1xuXG5cdFx0XHRcdCQoJyNFOTEyODBGNl9FN0M2XzNFNTNfQTQ1N182NDY5OTVDOTkzMTcnKS50ZXh0KG5vdEJlZm9yZSArICcgLSAnICsgbm90QWZ0ZXIpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YmdDb2xvciA9ICcjQjhENDlCJztcblx0XHRcdFx0ZmdDb2xvciA9ICcjMDA2NDAwJztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBJTlZBTElEIFVTRVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKHZvbXNFbmFibGVkICE9PSAnZmFsc2UnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoIWNsaWVudEROSW5BTUlcblx0XHRcdFx0XHQgICB8fFxuXHRcdFx0XHRcdCAgICFpc3N1ZXJETkluQU1JXG5cdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0bWVzc2FnZSA9ICdSZWdpc3RlciBhIHZhbGlkIFguNTA5IGNlcnRpZmljYXRlLic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRtZXNzYWdlID0gJ0NoZWNrIHlvdXIgdmlydHVhbCBvcmdhbml6YXRpb24gcm9sZXMuJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bWVzc2FnZSA9ICdVbmV4cGVjdGVkIGlzc3VlLCBjb250YWN0IHRoZSBBTUkgdGVhbS4nO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihtZXNzYWdlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgnI0Q5NDRCMDFEXzJFOERfNEVFOV85RENDXzI2OTE0MzhCQkExNicpLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGUgdGV4dC1kYW5nZXJcIj48L2k+ICcgKyBtZXNzYWdlKTtcblxuXHRcdFx0XHRcdGljb24gPSAnPGEgY2xhc3M9XCJuYXYtbGluayB0ZXh0LWRhbmdlclwiIGhyZWY9XCJqYXZhc2NyaXB0OmFtaUxvZ2luLmFjY291bnRTdGF0dXMoKTtcIj4nXG5cdFx0XHRcdFx0ICAgICAgICtcblx0XHRcdFx0XHQgICAgICAgJzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGVcIj48L2k+J1xuXHRcdFx0XHRcdCAgICAgICArXG5cdFx0XHRcdFx0ICAgICAgICc8L2E+J1xuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0YzRkY5RjQzX0RFNzJfNDBCQl9CMUJBX0I3QjNDOTAwMjY3MScpLmNsb3Nlc3QoJy5yb3VuZGVkJykuY3NzKCdiYWNrZ3JvdW5kJywgJyNFOEM4Q0YgdXJsKFwiJyArIGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2ltYWdlcy9jZXJ0aWZpY2F0ZS1waW5rLnBuZ1wiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlcicpXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnYmFja2dyb3VuZC1zaXplJywgJ2NvdmVyJylcblx0XHRcdFx0O1xuXG5cdFx0XHRcdCQoJyNGM0ZGOUY0M19ERTcyXzQwQkJfQjFCQV9CN0IzQzkwMDI2NzEnKS5jc3MoJ2NvbG9yJywgJyNEQzM1NDUnKVxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1sZWFmXCI+PC9pPiBpbnZhbGlkIDxpIGNsYXNzPVwiZmEgZmEtbGVhZlwiPjwvaT4nKVxuXHRcdFx0XHQ7XG5cblx0XHRcdFx0JCgnI0U5MTI4MEY2X0U3QzZfM0U1M19BNDU3XzY0Njk5NUM5OTMxNycpLnRleHQobm90QmVmb3JlICsgJyAtICcgKyBub3RBZnRlcik7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRiZ0NvbG9yID0gJyNFOEM4Q0YnO1xuXHRcdFx0XHRmZ0NvbG9yID0gJyNEQzM1NDUnO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogVVBEQVRFIFFSQ09ERSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCgnI0VDOTQ4MDg0XzhDMEFfQ0VCRl81OEM5XzA4NjA0NkFCMjQ1NicpLnFyY29kZSh7XG5cdFx0XHRcdHJlbmRlcjogJ2NhbnZhcycsXG5cdFx0XHRcdGVjTGV2ZWw6ICdIJyxcblx0XHRcdFx0c2l6ZTogMTUwLFxuXHRcdFx0XHRmaWxsOiBmZ0NvbG9yLFxuXHRcdFx0XHRiYWNrZ3JvdW5kOiBiZ0NvbG9yLFxuXHRcdFx0XHR0ZXh0OiB1c2VyICsgJ3wnICsgZmlyc3ROYW1lICsgJyAnICsgbGFzdE5hbWUgKyAnfCcgKyBlbWFpbCArICd8JyArIGNsaWVudEROSW5BTUkgKyAnfCcgKyBpc3N1ZXJETkluQU1JLFxuXHRcdFx0XHRyYWRpdXM6IDAsXG5cdFx0XHRcdHF1aWV0OiAxLFxuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogVVBEQVRFIE1FTlUgQkFSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0ZGljdFsndXNlciddID0gdXNlcjtcblx0XHRcdGRpY3RbJ2ljb24nXSA9IGljb247XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRhbWlXZWJBcHAucmVwbGFjZUhUTUwoJyNhbWlfbG9naW5fbWVudV9jb250ZW50JywgdGhpcy5mcmFnbWVudExvZ291dEJ1dHRvbiwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudHJpZ2dlckxvZ2luKCkudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXG5cdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRhbWlXZWJBcHAucmVwbGFjZUhUTUwoJyNhbWlfbG9naW5fbWVudV9jb250ZW50JywgdGhpcy5mcmFnbWVudExvZ2luQnV0dG9uLCB7ZGljdDogZGljdH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC50cmlnZ2VyTG9nb3V0KCkudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXG5cdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQVUJMSUMgTUVUSE9EUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgdXNlciBpbmZvcm1hdGlvblxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGN1cnJlbnQgdXNlciBpbmZvcm1hdGlvblxuXHQgICovXG5cblx0Z2V0VXNlckluZm86IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnVzZXJJbmZvO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSB1c2VyIHJvbGUgaW5mb3JtYXRpb25cblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBjdXJyZW50IHJvbGUgaW5mb3JtYXRpb25cblx0ICAqL1xuXG5cdGdldFJvbGVJbmZvOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yb2xlSW5mbztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgdXNlciBib29rbWFyayBpbmZvcm1hdGlvblxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGN1cnJlbnQgdXNlciBkYXRhIHByb3RlY3Rpb24gaW5mb3JtYXRpb25cblx0ICAqL1xuXG5cdGdldEJvb2ttYXJrSW5mbzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuYm9va21hcmtJbmZvO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSB1c2VyIGRhdGEgcHJvdGVjdGlvbiBpbmZvcm1hdGlvblxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGN1cnJlbnQgdXNlciBkYXRhIHByb3RlY3Rpb24gaW5mb3JtYXRpb25cblx0ICAqL1xuXG5cdGdldFVQREluZm86IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnVkcEluZm87XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIHNpbmdsZSBzaWduIG9uIGluZm9ybWF0aW9uXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgY3VycmVudCBzaW5nbGUgc2lnbiBvbiBpbmZvcm1hdGlvblxuXHQgICovXG5cblx0Z2V0U1NPSW5mbzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuc3NvSW5mbztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgY3VycmVudCB1c2VyXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgY3VycmVudCB1c2VyXG5cdCAgKi9cblxuXHRnZXRVc2VyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy51c2VyO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBndWVzdCB1c2VyXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZ3Vlc3QgdXNlclxuXHQgICovXG5cblx0Z2V0R3Vlc3Q6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmd1ZXN0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBjbGllbnQgRE5cblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBjbGllbnQgRE5cblx0ICAqL1xuXG5cdGdldENsaWVudEROOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5jbGllbnRETjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgaXNzdWVyIEROXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgaXNzdWVyIEROXG5cdCAgKi9cblxuXHRnZXRJc3N1ZXJETjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNzdWVyRE47XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENoZWNrcyB3aGV0aGVyIHRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWRcblx0ICAqIEByZXR1cm5zIHtCb29sZWFufVxuXHQgICovXG5cblx0aXNBdXRoZW50aWNhdGVkOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy51c2VyICE9PSB0aGlzLmd1ZXN0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDaGVja3Mgd2hldGhlciB0aGUgdXNlciBoYXMgdGhlIGdpdmVuIHJvbGVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSByb2xlIHRoZSByb2xlXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGhhc1JvbGU6IGZ1bmN0aW9uKHJvbGVOYW1lKVxuXHR7XG5cdFx0cmV0dXJuIHJvbGVOYW1lIGluIHRoaXMucm9sZUluZm87XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFVwZGF0ZSB0aGUgdXNlciBpbmZvcm1hdGlvblxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0dXBkYXRlOiBmdW5jdGlvbigpXG5cdHtcblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0cmV0dXJuIGFtaUNvbW1hbmQuY2VydExvZ2luKCkuZG9uZSgoZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCBib29rbWFya0luZm8sIHVkcEluZm8sIHNzb0luZm8pID0+IHtcblxuXHRcdFx0dGhpcy5fdXBkYXRlKHVzZXJJbmZvLCByb2xlSW5mbywgYm9va21hcmtJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKS5hbHdheXMoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBPcGVucyB0aGUgJ1NTTycgbW9kYWwgd2luZG93XG5cdCAgKi9cblxuXHRzc286IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuX2NsZWFuKCk7XG5cblx0XHR3aW5kb3cub3Blbih0aGlzLnNzb0luZm8udXJsLCAnU2luZ2xlIFNpZ24tT24nLCAnbWVudWJhcj1ubywgc3RhdHVzPW5vLCBzY3JvbGxiYXJzPW5vLCB3aWR0aD04MDAsIGhlaWdodD00NTAnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogT3BlbnMgdGhlICdTaWduSW4nIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0c2lnbkluOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jbGVhbigpO1xuXG5cdFx0JCgnI0QyQjVGQURFXzk3QTNfNEI4Q184NTYxXzdBOUFFQUNEQkU1QicpLm1vZGFsKCdzaG93Jyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnQ2hhbmdlIEluZm8nIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0Y2hhbmdlSW5mbzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblxuXHRcdCQoJyNEOUVBRjk5OF9FRDhFXzQ0RDJfQTBCRV84QzVDRjVFNDM4QkQnKS5tb2RhbCgnc2hvdycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBPcGVucyB0aGUgJ0NoYW5nZSBQYXNzd29yZCcgbW9kYWwgd2luZG93XG5cdCAgKi9cblxuXHRjaGFuZ2VQYXNzOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jbGVhbigpO1xuXG5cdFx0JCgnI0U5MkExMDk3Xzk4M0JfNDg1N184NzVGXzA3RTQ2NTlCNDFCMCcpLm1vZGFsKCdzaG93Jyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnQWNjb3VudCBTdGF0dXMnIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0YWNjb3VudFN0YXR1czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblxuXHRcdCQoJyNBQjFDQjE4M185NkVCXzQxMTZfOEE5RV80NDA5QkUwNThGMzQnKS5tb2RhbCgnc2hvdycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTaWducyBvdXRcblx0ICAqL1xuXG5cdHNpZ25PdXQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRyZXR1cm4gYW1pQ29tbWFuZC5sb2dvdXQoKS5hbHdheXMoKGRhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgYm9va21hcmtJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKSA9PiB7XG5cblx0XHRcdHRoaXMuX3VwZGF0ZSh1c2VySW5mbywgcm9sZUluZm8sIGJvb2ttYXJrSW5mbywgdWRwSW5mbywgc3NvSW5mbykudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5fdW5sb2NrKCk7XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fbG9naW46IGZ1bmN0aW9uKGUpXG5cdHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRjb25zdCB2YWx1ZXMgPSAkKGUudGFyZ2V0KS5zZXJpYWxpemVPYmplY3QoKTtcblxuXHRcdHJldHVybiB0aGlzLmZvcm1fbG9naW4yKHZhbHVlc1sndXNlciddLCB2YWx1ZXNbJ3Bhc3MnXSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2xvZ2luMjogZnVuY3Rpb24odXNlciwgcGFzcylcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHByb21pc2UgPSAodXNlciAmJiBwYXNzKSA/IGFtaUNvbW1hbmQucGFzc0xvZ2luKHVzZXIudHJpbSgpLCBwYXNzLnRyaW0oKSlcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhbWlDb21tYW5kLmNlcnRMb2dpbigvKi0tLS0tLS0tLS0tLS0tLS0tLS0tKi8pXG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdHByb21pc2UudGhlbigoZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCBib29rbWFya0luZm8sIHVkcEluZm8sIHNzb0luZm8pID0+IHtcblxuXHRcdFx0dGhpcy5fdXBkYXRlKHVzZXJJbmZvLCByb2xlSW5mbywgYm9va21hcmtJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRpZih1c2VySW5mby5BTUlVc2VyICE9PSB1c2VySW5mby5ndWVzdFVzZXIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkKCcjRDJCNUZBREVfOTdBM180QjhDXzg1NjFfN0E5QUVBQ0RCRTVCJykubW9kYWwoJ2hpZGUnKTtcblxuXHRcdFx0XHRcdHRoaXMuX3VubG9jaygpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0aWYodXNlckluZm8uQU1JVXNlciAhPT0gdXNlckluZm8uZ3Vlc3RVc2VyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgnI0QyQjVGQURFXzk3QTNfNEI4Q184NTYxXzdBOUFFQUNEQkU1QicpLm1vZGFsKCdoaWRlJyk7XG5cblx0XHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmKHVzZXJJbmZvLkFNSVVzZXIgPT09IHVzZXJJbmZvLmd1ZXN0VXNlcilcblx0XHRcdHtcblx0XHRcdFx0bGV0IG1lc3NhZ2UgPSAnQXV0aGVudGljYXRpb24gZmFpbGVkLic7XG5cblx0XHRcdFx0aWYodXNlckluZm8uY2xpZW50RE5JblNlc3Npb24gfHwgdXNlckluZm8uaXNzdWVyRE5JblNlc3Npb24pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtZXNzYWdlICs9ICcgQ2xpZW50IEROIGluIHNlc3Npb246ICcgKyBhbWlXZWJBcHAudGV4dFRvSHRtbCh1c2VySW5mby5jbGllbnRETkluU2Vzc2lvbikgKyAnLidcblx0XHRcdFx0XHQgICAgICAgICAgICtcblx0XHRcdFx0XHQgICAgICAgICAgICcgSXNzdWVyIEROIGluIHNlc3Npb246ICcgKyBhbWlXZWJBcHAudGV4dFRvSHRtbCh1c2VySW5mby5pc3N1ZXJETkluU2Vzc2lvbikgKyAnLidcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdH1cblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIGJvb2ttYXJrSW5mbywgdWRwSW5mbywgc3NvSW5mbykgPT4ge1xuXG5cdFx0XHR0aGlzLl91cGRhdGUodXNlckluZm8sIHJvbGVJbmZvLCBib29rbWFya0luZm8sIHVkcEluZm8sIHNzb0luZm8pLmFsd2F5cygoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fYXR0YWNoQ2VydDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdXNlciA9ICQoJyNFNjRGMjRCMl8zM0U2XzRERURfOUIyNF8yOEJFMDQyMTk2MTMnKS52YWwoKTtcblx0XHRjb25zdCBwYXNzID0gJCgnI0E0REZEMDM5XzAzNEZfNEQxMF85NjY4XzM4NUFFRjRGQkJCOScpLnZhbCgpO1xuXG5cdFx0aWYoIXVzZXIgfHwgIXBhc3MpXG5cdFx0e1xuXHRcdFx0dGhpcy5fZXJyb3IoJ1BsZWFzZSwgZmlsbCBhbGwgZmllbGRzIHdpdGggYSByZWQgc3Rhci4nKTtcblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmF0dGFjaENlcnQodXNlciwgcGFzcykudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2RldGFjaENlcnQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVzZXIgPSAkKCcjRTY0RjI0QjJfMzNFNl80REVEXzlCMjRfMjhCRTA0MjE5NjEzJykudmFsKCk7XG5cdFx0Y29uc3QgcGFzcyA9ICQoJyNBNERGRDAzOV8wMzRGXzREMTBfOTY2OF8zODVBRUY0RkJCQjknKS52YWwoKTtcblxuXHRcdGlmKCF1c2VyIHx8ICFwYXNzKVxuXHRcdHtcblx0XHRcdHRoaXMuX2Vycm9yKCdQbGVhc2UsIGZpbGwgYWxsIGZpZWxkcyB3aXRoIGEgcmVkIHN0YXIuJyk7XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5kZXRhY2hDZXJ0KHVzZXIsIHBhc3MpLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9hZGRVc2VyOiBmdW5jdGlvbihlKVxuXHR7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gJChlLnRhcmdldCkuc2VyaWFsaXplT2JqZWN0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5hZGRVc2VyKHZhbHVlc1snbG9naW4nXSwgdmFsdWVzWydwYXNzJ10sIHZhbHVlc1snZmlyc3RfbmFtZSddLCB2YWx1ZXNbJ2xhc3RfbmFtZSddLCB2YWx1ZXNbJ2VtYWlsJ10sICdhdHRhY2gnIGluIHZhbHVlcywgJ2FncmVlJyBpbiB2YWx1ZXMpLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9yZW1pbmRQYXNzOiBmdW5jdGlvbihlKVxuXHR7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gJChlLnRhcmdldCkuc2VyaWFsaXplT2JqZWN0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5yZXNldFBhc3ModmFsdWVzWyd1c2VyJ10pLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9jaGFuZ2VJbmZvOiBmdW5jdGlvbihlKVxuXHR7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gJChlLnRhcmdldCkuc2VyaWFsaXplT2JqZWN0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5jaGFuZ2VJbmZvKHZhbHVlc1snZmlyc3RfbmFtZSddLCB2YWx1ZXNbJ2xhc3RfbmFtZSddLCB2YWx1ZXNbJ2VtYWlsJ10pLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9jaGFuZ2VQYXNzOiBmdW5jdGlvbihlKVxuXHR7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gJChlLnRhcmdldCkuc2VyaWFsaXplT2JqZWN0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5jaGFuZ2VQYXNzKHRoaXMudXNlciwgdmFsdWVzWydvbGRfcGFzcyddLCB2YWx1ZXNbJ25ld19wYXNzJ10pLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKiFcbiAqIEFNSSBXZWIgRnJhbWV3b3JrIC0gQU1JRG9jLmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMjAgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG5jb25zdCBhbWlEb2MgPSB7XCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwiJEFNSU5hbWVzcGFjZVwiLFwiZGVzY1wiOlwiQ3JlYXRlIGEgbmV3IG5hbWVzcGFjZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIiRuYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBuYW1lc3BhY2UgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIiRkZXNjclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgbmFtZXNwYWNlIGJvZHlcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIiRBTUlJbnRlcmZhY2VcIixcImRlc2NcIjpcIkNyZWF0ZSBhIG5ldyBpbnRlcmZhY2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCIkbmFtZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgaW50ZXJmYWNlIG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCIkZGVzY3JcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIGludGVyZmFjZSBib2R5XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCIkQU1JQ2xhc3NcIixcImRlc2NcIjpcIkNyZWF0ZSBhIG5ldyBjbGFzc1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIiRuYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBjbGFzcyBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiJGRlc2NyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBjbGFzcyBib2R5XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfV0sXCJuYW1lc3BhY2VzXCI6W3tcIm5hbWVcIjpcImFtaVJvdXRlclwiLFwiZGVzY1wiOlwiVGhlIEFNSSB1cmwgcm91dGluZyBzdWJzeXN0ZW1cIixcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJnZXRTY3JpcHRVUkxcIixcImRlc2NcIjpcIkdldHMgdGhlIEFXRidzIHNjcmlwdCBVUkxcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBBV0YncyBzY3JpcHQgVVJMXCJ9XX0se1wibmFtZVwiOlwiZ2V0T3JpZ2luVVJMXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBvcmlnaW4gVVJMXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgb3JpZ2luIFVSTFwifV19LHtcIm5hbWVcIjpcImdldFdlYkFwcFVSTFwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgd2ViYXBwIFVSTFwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHdlYmFwcCBVUkxcIn1dfSx7XCJuYW1lXCI6XCJnZXRIYXNoXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBhbmNob3IgcGFydCBvZiB0aGUgd2ViYXBwIFVSTFwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGFuY2hvciBwYXJ0IG9mIHRoZSB3ZWJhcHAgVVJMXCJ9XX0se1wibmFtZVwiOlwiZ2V0QXJnc1wiLFwiZGVzY1wiOlwiR2V0cyB0aGUgYXJndW1lbnRzIGV4dHJhY3RlZCBmcm9tIHRoZSB3ZWJhcHAgVVJMXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQXJyYXkuPFN0cmluZz5cIixcImRlc2NcIjpcIlRoZSBhcmd1bWVudHMgZXh0cmFjdGVkIGZyb20gdGhlIHdlYmFwcCBVUkxcIn1dfSx7XCJuYW1lXCI6XCJhcHBlbmRcIixcImRlc2NcIjpcIkFwcGVuZHMgYSByb3V0aW5nIHJ1bGVcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJyZWdFeHBcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHJlZ0V4cFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImhhbmRsZXJcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIGhhbmRsZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIk5hbWVzcGFjZVwiLFwiZGVzY1wiOlwiVGhlIGFtaVJvdXRlciBzaW5nbGV0b25cIn1dfSx7XCJuYW1lXCI6XCJyZW1vdmVcIixcImRlc2NcIjpcIlJlbW92ZXMgc29tZSByb3V0aW5nIHJ1bGVzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicmVnRXhwXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSByZWdFeHBcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIk5hbWVzcGFjZVwiLFwiZGVzY1wiOlwiVGhlIGFtaVJvdXRlciBzaW5nbGV0b25cIn1dfSx7XCJuYW1lXCI6XCJjaGVja1wiLFwiZGVzY1wiOlwiQ2hlY2tzIHdoZXRoZXIgdGhlIFVSTCBtYXRjaGVzIHdpdGggYSByb3V0aW5nIHJ1bGVcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJhcHBlbmRIaXN0b3J5RW50cnlcIixcImRlc2NcIjpcIkFwcGVuZCBhIG5ldyBoaXN0b3J5IGVudHJ5XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGF0aFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgbmV3IHBhdGhcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250ZXh0XCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBuZXcgY29udGV4dFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX0se1wibmFtZVwiOlwicmVwbGFjZUhpc3RvcnlFbnRyeVwiLFwiZGVzY1wiOlwiUmVwbGFjZSB0aGUgY3VycmVudCBoaXN0b3J5IGVudHJ5XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGF0aFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgbmV3IHBhdGhcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250ZXh0XCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBuZXcgY29udGV4dFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX1dfSx7XCJuYW1lXCI6XCJhbWlXZWJBcHBcIixcImRlc2NcIjpcIlRoZSBBTUkgd2ViYXBwIHN1YnN5c3RlbVwiLFwidmFyaWFibGVzXCI6W3tcIm5hbWVcIjpcIm9yaWdpblVSTFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgb3JpZ2luIFVSTFwifSx7XCJuYW1lXCI6XCJ3ZWJBcHBVUkxcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHdlYmFwcCBVUkxcIn0se1wibmFtZVwiOlwiaGFzaFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgYW5jaG9yIHBhcnQgb2YgdGhlIHdlYmFwcCBVUkxcIn0se1wibmFtZVwiOlwiYXJnc1wiLFwidHlwZVwiOlwiQXJyYXkuPFN0cmluZz5cIixcImRlc2NcIjpcIlRoZSBhcmd1bWVudHMgZXh0cmFjdGVkIGZyb20gdGhlIHdlYmFwcCBVUkxcIn1dLFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcImlzRW1iZWRkZWRcIixcImRlc2NcIjpcIkNoZWNrcyB3aGV0aGVyIHRoZSBXZWJBcHAgaXMgZXhlY3V0ZWQgaW4gZW1iZWRkZWQgbW9kZVwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19LHtcIm5hbWVcIjpcImlzTG9jYWxcIixcImRlc2NcIjpcIkNoZWNrcyB3aGV0aGVyIHRoZSBXZWJBcHAgaXMgZXhlY3V0ZWQgbG9jYWxseSAoZmlsZTovLywgbG9jYWxob3N0LCAxMjcuMC4wLjEgb3IgOjoxKVwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19LHtcIm5hbWVcIjpcInRleHRUb0h0bWxcIixcImRlc2NcIjpcIkVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIHRleHQgdG8gSFRNTFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdW5lc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJodG1sVG9UZXh0XCIsXCJkZXNjXCI6XCJVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEhUTUwgdG8gdGV4dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHVuZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJ0ZXh0VG9TdHJpbmdcIixcImRlc2NcIjpcIkVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIHRleHQgdG8gSmF2YVNjcmlwdCBzdHJpbmdcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVuZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwic3RyaW5nVG9UZXh0XCIsXCJkZXNjXCI6XCJVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEphdmFTY3JpcHQgc3RyaW5nIHRvIHRleHRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSB1bmVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwiaHRtbFRvU3RyaW5nXCIsXCJkZXNjXCI6XCJFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBIVE1MIHRvIEphdmFTY3JpcHQgc3RyaW5nXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1bmVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBlc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcInN0cmluZ1RvSHRtbFwiLFwiZGVzY1wiOlwiVW5lc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBKYXZhU2NyaXB0IHN0cmluZyB0byBIVE1MXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgdW5lc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcInRleHRUb1NRTFwiLFwiZGVzY1wiOlwiRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBTUUxcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVuZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwic3FsVG9UZXh0XCIsXCJkZXNjXCI6XCJVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIFNRTCB0byB0ZXh0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgdW5lc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcImJhc2U2NEVuY29kZVwiLFwiZGVzY1wiOlwiRW5jb2RlcyAoUkZDIDQ2NDgpIGEgc3RyaW5nXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBkZWNvZGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZW5jb2RlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJiYXNlNjREZWNvZGVcIixcImRlc2NcIjpcIkRlY29kZXMgKFJGQyA0NjQ4KSBhIHN0cmluZ1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZW5jb2RlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGRlY29kZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwibG9hZFJlc291cmNlc1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgcmVzb3VyY2VzIGJ5IGV4dGVuc2lvblwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFNoZWV0c1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgQ1NTIHNoZWV0c1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFNjcmlwdHNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIEpTIHNjcmlwdHNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRKU09Oc1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgSlNPTiBmaWxlc1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFhNTHNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIFhNTCBmaWxlc1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZEhUTUxzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBIVE1MIGZpbGVzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkVFdJR3NcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIFRXSUcgZmlsZXNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRUZXh0c1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgdGV4dCBmaWxlc1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwicmVwbGFjZUhUTUxcIixcImRlc2NcIjpcIlB1dHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgc3VmZml4LCBkaWN0LCB0d2lncylcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInByZXBlbmRIVE1MXCIsXCJkZXNjXCI6XCJQcmVwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBzdWZmaXgsIGRpY3QsIHR3aWdzKVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiYXBwZW5kSFRNTFwiLFwiZGVzY1wiOlwiQXBwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBzdWZmaXgsIGRpY3QsIHR3aWdzKVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiZm9ybWF0VFdJR1wiLFwiZGVzY1wiOlwiSW50ZXJwcmV0ZXMgdGhlIGdpdmVuIFRXSUcgc3RyaW5nLCBzZWUge0BsaW5rIGh0dHA6Ly90d2lnLnNlbnNpb2xhYnMub3JnL2RvY3VtZW50YXRpb259XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJkaWN0XCIsXCJ0eXBlXCI6W1wiT2JqZWN0XCIsXCJBcnJheVwiXSxcImRlc2NcIjpcInRoZSBkaWN0aW9uYXJ5XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBmcmFnbWVudHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIEludGVycHJldGVkIFRXSUcgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwianNwYXRoXCIsXCJkZXNjXCI6XCJGaW5kcyBkYXRhIHdpdGhpbiB0aGUgZ2l2ZW4gSlNPTiwgc2VlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vZGZpbGF0b3YvanNwYXRofVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhdGhcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHBhdGhcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJqc29uXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBKU09OXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJBcnJheVwiLFwiZGVzY1wiOlwiVGhlIHJlc3VsdGluZyBhcnJheVwifV19LHtcIm5hbWVcIjpcImxvY2tcIixcImRlc2NcIjpcIkxvY2tzIHRoZSBXZWIgYXBwbGljYXRpb25cIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJ1bmxvY2tcIixcImRlc2NcIjpcIlVubG9ja3MgdGhlIFdlYiBhcHBsaWNhdGlvblwiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcIm1vZGFsTGVhdmVcIixcImRlc2NcIjpcIkxlYXZlIHRoZSBtb2RhbCB3aW5kb3dcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJtb2RhbEVudGVyXCIsXCJkZXNjXCI6XCJFbnRlciB0aGUgbW9kYWwgd2luZG93XCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiY2FuTGVhdmVcIixcImRlc2NcIjpcIkVuYWJsZXMgdGhlIG1lc3NhZ2UgaW4gYSBjb25maXJtYXRpb24gZGlhbG9nIGJveCB0byBpbmZvcm0gdGhhdCB0aGUgdXNlciBpcyBhYm91dCB0byBsZWF2ZSB0aGUgY3VycmVudCBwYWdlLlwiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImNhbm5vdExlYXZlXCIsXCJkZXNjXCI6XCJEaXNhYmxlcyB0aGUgbWVzc2FnZSBpbiBhIGNvbmZpcm1hdGlvbiBkaWFsb2cgYm94IHRvIGluZm9ybSB0aGF0IHRoZSB1c2VyIGlzIGFib3V0IHRvIGxlYXZlIHRoZSBjdXJyZW50IHBhZ2UuXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiaW5mb1wiLFwiZGVzY1wiOlwiU2hvd3MgYW4gJ2luZm8nIG1lc3NhZ2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJtZXNzYWdlXCIsXCJ0eXBlXCI6W1wiU3RyaW5nXCIsXCJBcnJheVwiXSxcImRlc2NcIjpcInRoZSBtZXNzYWdlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmFkZU91dFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcInN1Y2Nlc3NcIixcImRlc2NcIjpcIlNob3dzIGEgJ3N1Y2Nlc3MnIG1lc3NhZ2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJtZXNzYWdlXCIsXCJ0eXBlXCI6W1wiU3RyaW5nXCIsXCJBcnJheVwiXSxcImRlc2NcIjpcInRoZSBtZXNzYWdlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmFkZU91dFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIndhcm5pbmdcIixcImRlc2NcIjpcIlNob3dzIGEgJ3dhcm5pbmcnIG1lc3NhZ2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJtZXNzYWdlXCIsXCJ0eXBlXCI6W1wiU3RyaW5nXCIsXCJBcnJheVwiXSxcImRlc2NcIjpcInRoZSBtZXNzYWdlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmFkZU91dFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcImVycm9yXCIsXCJkZXNjXCI6XCJTaG93cyBhbiAnZXJyb3InIG1lc3NhZ2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJtZXNzYWdlXCIsXCJ0eXBlXCI6W1wiU3RyaW5nXCIsXCJBcnJheVwiXSxcImRlc2NcIjpcInRoZSBtZXNzYWdlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmFkZU91dFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcImZsdXNoXCIsXCJkZXNjXCI6XCJGbHVzaGVzIG1lc3NhZ2VzXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiZmlsbEJyZWFkY3J1bWJcIixcImRlc2NcIjpcIkZpbGwgdGhlIG1haW4gYnJlYWRjcnVtYlwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIml0ZW1zXCIsXCJ0eXBlXCI6XCJBcnJheVwiLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIGl0ZW1zIChIVE1MIGZvcm1hdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcInN0YXJ0XCIsXCJkZXNjXCI6XCJTdGFydHMgdGhlIFdlYiBhcHBsaWNhdGlvblwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGxvZ29fdXJsLCBob21lX3VybCwgd2ViYXBwX3VybCwgY29udGFjdF9lbWFpbCwgYWJvdXRfdXJsLCB0aGVtZV91cmwsIGxvY2tlcl91cmwsIHBhc3N3b3JkX2F1dGhlbnRpY2F0aW9uX2FsbG93ZWQsIGNlcnRpZmljYXRlX2F1dGhlbnRpY2F0aW9uX2FsbG93ZWQsIGNyZWF0ZV9hY2NvdW50X2FsbG93ZWQsIGNoYW5nZV9pbmZvX2FsbG93ZWQsIGNoYW5nZV9wYXNzd29yZF9hbGxvd2VkLCBjaGFuZ2VfY2VydGlmaWNhdGVfYWxsb3dlZCwgYm9va21hcmtzQWxsb3dlZClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcImxvYWRDb250cm9sXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBhIGNvbnRyb2xcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJjb250cm9sXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBhcnJheSBvZiBjb250cm9sIG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiY3JlYXRlQ29udHJvbFwiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhcmVudFwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJvd25lclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250cm9sXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhcmFtc1wiLFwidHlwZVwiOlwiQXJyYXlcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjcmVhdGVDb250cm9sSW5Cb2R5XCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sIGluIHRoZSBib2R5XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGFyZW50XCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIm93bmVyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRyb2xcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFyYW1zV2l0aG91dFNldHRpbmdzXCIsXCJ0eXBlXCI6XCJBcnJheVwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udHJvbFNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhcmVudFNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjcmVhdGVDb250cm9sSW5Db250YWluZXJcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gYSBjb250YWluZXJcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXJlbnRcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwib3duZXJcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udHJvbFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXJhbXNXaXRob3V0U2V0dGluZ3NcIixcInR5cGVcIjpcIkFycmF5XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250cm9sU2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFyZW50U2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiaWNvblwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0aXRsZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiY3JlYXRlQ29udHJvbEZyb21XZWJMaW5rXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sIGluIGEgY29udGFpbmVyIGZyb20gYSBXRUIgbGlua1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhcmVudFwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJvd25lclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJlbFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXJlbnRTZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFN1YkFwcFwiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgYSBzdWJhcHBcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdWJhcHBcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHN1YmFwcFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ0aGUgdXNlciBkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRTdWJBcHBCeVVSTFwiLFwiZGVzY1wiOlwiTG9hZHMgYSBzdWJhcHAgYnkgVVJMXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiZGVmYXVsdFN1YkFwcFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJpZiAnYW1pV2ViQXBwLmFyZ3NbXFxcInN1YmFwcFxcXCJdJyBpcyBudWxsLCB0aGUgZGVmYXVsdCBzdWJhcHBcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJkZWZhdWx0VXNlckRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcImlmICdhbWlXZWJBcHAuYXJnc1tcXFwidXNlcmRhdGFcXFwiXScgaXMgbnVsbCwgdGhlIGRlZmF1bHQgdXNlciBkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfV0sXCJldmVudHNcIjpbe1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiVGhpcyBtZXRob2QgbXVzdCBiZSBvdmVybG9hZGVkIGFuZCBpcyBjYWxsZWQgd2hlbiB0aGUgV2ViIGFwcGxpY2F0aW9uIHN0YXJ0c1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJEYXRhXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwib25SZWZyZXNoXCIsXCJkZXNjXCI6XCJUaGlzIG1ldGhvZCBtdXN0IGJlIG92ZXJsb2FkZWQgYW5kIGlzIGNhbGxlZCB3aGVuIHRoZSB0b29sYmFyIG5lZWRzIHRvIGJlIHVwZGF0ZWRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJpc0F1dGhcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX1dfSx7XCJuYW1lXCI6XCJhbWlDb21tYW5kXCIsXCJkZXNjXCI6XCJUaGUgQU1JIGNvbW1hbmQgc3Vic3lzdGVtXCIsXCJ2YXJpYWJsZXNcIjpbe1wibmFtZVwiOlwiZW5kcG9pbnRcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiRGVmYXVsdCBlbmRwb2ludFwifSx7XCJuYW1lXCI6XCJjb252ZXJ0ZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiRGVmYXVsdCBjb252ZXJ0ZXJcIn1dLFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcImV4ZWN1dGVcIixcImRlc2NcIjpcIkV4ZWN1dGVzIGFuIEFNSSBjb21tYW5kXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiY29tbWFuZFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgY29tbWFuZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGVuZHBvaW50LCBjb252ZXJ0ZXIsIHRpbWVvdXQsIGV4dHJhUGFyYW0sIGV4dHJhVmFsdWUpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJwYXNzTG9naW5cIixcImRlc2NcIjpcIkxvZ3MgaW4gYnkgbG9naW4vcGFzc3dvcmRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1c2VyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFzc1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcGFzc3dvcmRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiY2VydExvZ2luXCIsXCJkZXNjXCI6XCJMb2dzIGluIGJ5IGNlcnRpZmljYXRlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvZ291dFwiLFwiZGVzY1wiOlwiTG9ncyBvdXRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiYXR0YWNoQ2VydFwiLFwiZGVzY1wiOlwiQXR0YWNoZXMgYSBjZXJ0aWZpY2F0ZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVzZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXNzXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBwYXNzd29yZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJkZXRhY2hDZXJ0XCIsXCJkZXNjXCI6XCJEZXRhY2hlcyBhIGNlcnRpZmljYXRlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhc3NcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImFkZFVzZXJcIixcImRlc2NcIjpcIkFkZHMgYSBuZXcgdXNlclwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVzZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXNzXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBwYXNzd29yZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImZpcnN0TmFtZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZmlyc3QgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImxhc3ROYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBsYXN0IG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJlbWFpbFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZW1haWxcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJhdHRhY2hcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcImF0dGFjaCB0aGUgY3VycmVudCBjZXJ0aWZpY2F0ZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImFncmVlXCIsXCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJhZ3JlZSB3aXRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9uc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjaGFuZ2VJbmZvXCIsXCJkZXNjXCI6XCJDaGFuZ2VzIHRoZSBhY2NvdW50IGluZm9ybWF0aW9uXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiZmlyc3ROYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBmaXJzdCBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwibGFzdE5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGxhc3QgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImVtYWlsXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlbWFpbFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjaGFuZ2VQYXNzXCIsXCJkZXNjXCI6XCJDaGFuZ2VzIHRoZSBhY2NvdW50IHBhc3N3b3JkXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIm9sZFBhc3NcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIG9sZCBwYXNzd29yZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIm5ld1Bhc3NcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIG5ldyBwYXNzd29yZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJyZXNldFBhc3NcIixcImRlc2NcIjpcIlJlc2V0cyB0aGUgYWNjb3VudCBwYXNzd29yZFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVzZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX1dfSx7XCJuYW1lXCI6XCJhbWlMb2dpblwiLFwiZGVzY1wiOlwiVGhlIEFNSSBhdXRoZW50aWNhdGlvbiBzdWJzeXN0ZW1cIixcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJnZXRVc2VySW5mb1wiLFwiZGVzY1wiOlwiR2V0cyB0aGUgdXNlciBpbmZvcm1hdGlvblwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGN1cnJlbnQgdXNlciBpbmZvcm1hdGlvblwifV19LHtcIm5hbWVcIjpcImdldFJvbGVJbmZvXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSB1c2VyIHJvbGUgaW5mb3JtYXRpb25cIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBjdXJyZW50IHJvbGUgaW5mb3JtYXRpb25cIn1dfSx7XCJuYW1lXCI6XCJnZXRCb29rbWFya0luZm9cIixcImRlc2NcIjpcIkdldHMgdGhlIHVzZXIgYm9va21hcmsgaW5mb3JtYXRpb25cIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBjdXJyZW50IHVzZXIgZGF0YSBwcm90ZWN0aW9uIGluZm9ybWF0aW9uXCJ9XX0se1wibmFtZVwiOlwiZ2V0VVBESW5mb1wiLFwiZGVzY1wiOlwiR2V0cyB0aGUgdXNlciBkYXRhIHByb3RlY3Rpb24gaW5mb3JtYXRpb25cIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBjdXJyZW50IHVzZXIgZGF0YSBwcm90ZWN0aW9uIGluZm9ybWF0aW9uXCJ9XX0se1wibmFtZVwiOlwiZ2V0U1NPSW5mb1wiLFwiZGVzY1wiOlwiR2V0cyB0aGUgc2luZ2xlIHNpZ24gb24gaW5mb3JtYXRpb25cIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBjdXJyZW50IHNpbmdsZSBzaWduIG9uIGluZm9ybWF0aW9uXCJ9XX0se1wibmFtZVwiOlwiZ2V0VXNlclwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgY3VycmVudCB1c2VyXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgY3VycmVudCB1c2VyXCJ9XX0se1wibmFtZVwiOlwiZ2V0R3Vlc3RcIixcImRlc2NcIjpcIkdldHMgdGhlIGd1ZXN0IHVzZXJcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBndWVzdCB1c2VyXCJ9XX0se1wibmFtZVwiOlwiZ2V0Q2xpZW50RE5cIixcImRlc2NcIjpcIkdldHMgdGhlIGNsaWVudCBETlwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGNsaWVudCBETlwifV19LHtcIm5hbWVcIjpcImdldElzc3VlckROXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBpc3N1ZXIgRE5cIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBpc3N1ZXIgRE5cIn1dfSx7XCJuYW1lXCI6XCJpc0F1dGhlbnRpY2F0ZWRcIixcImRlc2NcIjpcIkNoZWNrcyB3aGV0aGVyIHRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWRcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJoYXNSb2xlXCIsXCJkZXNjXCI6XCJDaGVja3Mgd2hldGhlciB0aGUgdXNlciBoYXMgdGhlIGdpdmVuIHJvbGVcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJyb2xlXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSByb2xlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJ1cGRhdGVcIixcImRlc2NcIjpcIlVwZGF0ZSB0aGUgdXNlciBpbmZvcm1hdGlvblwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInNzb1wiLFwiZGVzY1wiOlwiT3BlbnMgdGhlICdTU08nIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcInNpZ25JblwiLFwiZGVzY1wiOlwiT3BlbnMgdGhlICdTaWduSW4nIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImNoYW5nZUluZm9cIixcImRlc2NcIjpcIk9wZW5zIHRoZSAnQ2hhbmdlIEluZm8nIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImNoYW5nZVBhc3NcIixcImRlc2NcIjpcIk9wZW5zIHRoZSAnQ2hhbmdlIFBhc3N3b3JkJyBtb2RhbCB3aW5kb3dcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJhY2NvdW50U3RhdHVzXCIsXCJkZXNjXCI6XCJPcGVucyB0aGUgJ0FjY291bnQgU3RhdHVzJyBtb2RhbCB3aW5kb3dcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJzaWduT3V0XCIsXCJkZXNjXCI6XCJTaWducyBvdXRcIixcInBhcmFtc1wiOltdfV19XSxcImludGVyZmFjZXNcIjpbe1wibmFtZVwiOlwiYW1pLklDb250cm9sXCIsXCJkZXNjXCI6XCJUaGUgQU1JIGNvbnRyb2wgaW50ZXJmYWNlXCIsXCJpbXBsZW1lbnRzXCI6W10sXCJpbmhlcml0c1wiOltdLFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcInBhdGNoSWRcIixcImRlc2NcIjpcIlBhdGNoZXMgYW4gSFRNTCBpZGVudGlmaWVyXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiaWRcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVucGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHBhdGNoZWQgSFRNTCBpZGVudGlmaWVyXCJ9XX0se1wibmFtZVwiOlwicmVwbGFjZUhUTUxcIixcImRlc2NcIjpcIlB1dHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInByZXBlbmRIVE1MXCIsXCJkZXNjXCI6XCJQcmVwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiYXBwZW5kSFRNTFwiLFwiZGVzY1wiOlwiQXBwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgaXMgcmVhZHkgdG8gcnVuXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwib25SZW1vdmVcIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIHRoZSBjb250cm9sIGlzIHJlbW92ZWRcIixcInBhcmFtc1wiOltdfV19LHtcIm5hbWVcIjpcImFtaS5JU3ViQXBwXCIsXCJkZXNjXCI6XCJUaGUgQU1JIHN1Yi1hcHBsaWNhdGlvbiBpbnRlcmZhY2VcIixcImltcGxlbWVudHNcIjpbXSxcImluaGVyaXRzXCI6W10sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyByZWFkeSB0byBydW5cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uRXhpdFwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyBhYm91dCB0byBleGl0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkxvZ2luXCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiBsb2dnaW5nIGluXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkxvZ291dFwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gbG9nZ2luZyBvdXRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19XX1dLFwiY2xhc3Nlc1wiOlt7XCJuYW1lXCI6XCJhbWkuQ29udHJvbFwiLFwiZGVzY1wiOlwiVGhlIGJhc2ljIEFNSSBjb250cm9sXCIsXCJpbXBsZW1lbnRzXCI6W1wiYW1pLklDb250cm9sXCJdLFwiaW5oZXJpdHNcIjpbXSxcImtvbnN0cnVjdG9yXCI6e1wibmFtZVwiOlwiQ29udHJvbFwiLFwicGFyYW1zXCI6W119LFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcInBhdGNoSWRcIixcImRlc2NcIjpcIlBhdGNoZXMgYW4gSFRNTCBpZGVudGlmaWVyXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiaWRcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVucGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHBhdGNoZWQgSFRNTCBpZGVudGlmaWVyXCJ9XX0se1wibmFtZVwiOlwicmVwbGFjZUhUTUxcIixcImRlc2NcIjpcIlB1dHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInByZXBlbmRIVE1MXCIsXCJkZXNjXCI6XCJQcmVwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiYXBwZW5kSFRNTFwiLFwiZGVzY1wiOlwiQXBwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgaXMgcmVhZHkgdG8gcnVuXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwib25SZW1vdmVcIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIHRoZSBjb250cm9sIGlzIHJlbW92ZWRcIixcInBhcmFtc1wiOltdfV19LHtcIm5hbWVcIjpcImFtaS5TdWJBcHBcIixcImRlc2NcIjpcIlRoZSBiYXNpYyBBTUkgc3ViLWFwcGxpY2F0aW9uXCIsXCJpbXBsZW1lbnRzXCI6W1wiYW1pLklTdWJBcHBcIl0sXCJpbmhlcml0c1wiOltdLFwia29uc3RydWN0b3JcIjp7XCJuYW1lXCI6XCJTdWJBcHBcIixcInBhcmFtc1wiOltdfSxcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJvblJlYWR5XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIHJlYWR5IHRvIHJ1blwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ1c2VyZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwib25FeGl0XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIGFib3V0IHRvIGV4aXRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uTG9naW5cIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIGxvZ2dpbmcgaW5cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uTG9nb3V0XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiBsb2dnaW5nIG91dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ1c2VyZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX1dfV19O1xuXG4vKiBlc2xpbnQtZW5hYmxlICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
