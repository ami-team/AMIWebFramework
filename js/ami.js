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
              block.list.forEach(function (item) {
                _this._render(result, item, dict, tmpls);
              });
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
        for (var _i5 in variables) {
          temp[_i5] = variables[_i5];
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

        for (var _i6 in node.dict) {
          L.push(_i6 + ':' + this._getJS(node.dict[_i6]));
        }

        return '{' + L.join(',') + '}';

      case amiTwig.expr.tokens.FUN:
        L = [];

        for (var _i7 in node.list) {
          L.push(this._getJS(node.list[_i7]));
        }

        return node.nodeValue + '(' + L.join(',') + ')';

      case amiTwig.expr.tokens.VAR:
        L = [];

        for (var _i8 in node.list) {
          L.push('[' + this._getJS(node.list[_i8]) + ']');
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

var _ami_internal_jQueryEach = jQuery.each;
var _ami_internal_jQueryAjax = jQuery.ajax;

jQuery.each = function (el, callback, context) {
  return _ami_internal_jQueryEach(el, context ? function (index, value) {
    return callback.call(context, index, value);
  } : callback);
};

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
      for (var _i9 = 0; _i9 < l; _i9++) {
        result.push(optionDefaults[_i9]);
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
    var _this5 = this;

    if (dict === void 0) {
      dict = {};
    }

    if (twigs === void 0) {
      twigs = {};
    }

    var result = [];

    var render = function render(twig, dict) {
      if (_this5.typeOf(dict) !== 'Object') {
        dict = {};
      }

      if (_this5.typeOf(twigs) !== 'Object') {
        twigs = {};
      }

      dict['ORIGIN_URL'] = _this5.originURL;
      dict['WEBAPP_URL'] = _this5.webAppURL;
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
  modalLock: function modalLock() {
    var lines = this.getStack().split('\n');

    if (lines.length > 2) {
      console.log('modalLock[' + this._lockCnt + '] :: ' + lines[2]);
    }

    this._lockCnt = this._tmpLockCnt;

    if (this._lockCnt > 0) {
      $('#ami_locker').css('display', 'flex');
    }
  },
  modalUnlock: function modalUnlock() {
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
    var _this6 = this;

    console.log('AMI ' + title.toUpperCase() + ': ' + message + '\n' + this.getStack());
    var html = '<div class="toast" role="alert" ' + (fadeOut ? 'data-delay="60000"' : 'data-autohide="false"') + '><div class="toast-header"><strong class="mr-auto ' + clazz + '">' + title + '</strong><small>' + this.textToHtml(window.moment().format('DD MMM, HH:mm:ss')) + '</small><button type="button" class="ml-2 mb-1 close" data-dismiss="toast"><span>&times;</span></button></div><div class="toast-body">' + this.textToHtml(message) + '</div></div>';
    var el = $('#ami_alert_content');
    el.append(html.replace(this._linkExp, '<a href="$1" target="_blank">$2</a>')).promise().done(function () {
      el.find('.toast:last-child').toast('show');
      $(document).scrollTop(0);

      _this6.unlock();
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
      var _this8$setup = _this8.setup(['logo_url', 'home_url', 'contact_email', 'about_url', 'theme_url', 'locker_url', 'endpoint_url', 'password_authentication_allowed', 'certificate_authentication_allowed', 'create_account_allowed', 'change_info_allowed', 'change_password_allowed', 'change_certificate_allowed'], [_this8.originURL + '/images/logo.png', _this8.webAppURL, 'ami@lpsc.in2p3.fr', 'http://cern.ch/ami/', _this8.originURL + '/twig/AMI/Theme/blue.twig', _this8.originURL + '/twig/AMI/Fragment/locker.twig', _this8.originURL + '/AMI/FrontEnd', true, true, true, true, true, true], settings),
          logoURL = _this8$setup[0],
          homeURL = _this8$setup[1],
          contactEmail = _this8$setup[2],
          aboutURL = _this8$setup[3],
          themeURL = _this8$setup[4],
          lockerURL = _this8$setup[5],
          endpointURL = _this8$setup[6],
          passwordAuthenticationAllowed = _this8$setup[7],
          certificateAuthenticationAllowed = _this8$setup[8],
          createAccountAllowed = _this8$setup[9],
          changeInfoAllowed = _this8$setup[10],
          changePasswordAllowed = _this8$setup[11],
          changeCertificateAllowed = _this8$setup[12];

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

                  amiLogin._start(passwordAuthenticationAllowed, certificateAuthenticationAllowed, createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed).done(function () {
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

                amiLogin._start(passwordAuthenticationAllowed, certificateAuthenticationAllowed, createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed).done(function () {
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
  onReady: function onReady() {}
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
    return this._selector = selector || '';
  },
  getSelector: function getSelector() {
    return this._selector;
  },
  patchId: function patchId(identifier) {
    return identifier + '_instance' + this.instanceSuffix;
  },
  replaceHTML: function replaceHTML(selector, twig, settings) {
    if (!settings) {
      settings = {};
    }

    settings.suffix = this.instanceSuffix;
    return amiWebApp.replaceHTML(selector, twig, settings);
  },
  prependHTML: function prependHTML(selector, twig, settings) {
    if (!settings) {
      settings = {};
    }

    settings.suffix = this.instanceSuffix;
    return amiWebApp.prependHTML(selector, twig, settings);
  },
  appendHTML: function appendHTML(selector, twig, settings) {
    if (!settings) {
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
  }
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
    var _this15 = this;

    var result = $.Deferred();
    amiWebApp.loadTWIGs([amiWebApp.originURL + '/twig/AMI/Fragment/login_button.twig', amiWebApp.originURL + '/twig/AMI/Fragment/logout_button.twig', amiWebApp.originURL + '/twig/AMI/Modal/login.twig']).done(function (data) {
      _this15.fragmentLoginButton = data[0];
      _this15.fragmentLogoutButton = data[1];
      var dict = {
        passwordAuthenticationAllowed: _this15.passwordAuthenticationAllowed = passwordAuthenticationAllowed,
        certificateAuthenticationAllowed: _this15.certificateAuthenticationAllowed = certificateAuthenticationAllowed,
        createAccountAllowed: _this15.createAccountAllowed = createAccountAllowed,
        changeInfoAllowed: _this15.changeInfoAllowed = changeInfoAllowed,
        changePasswordAllowed: _this15.changePasswordAllowed = changePasswordAllowed,
        changeCertificateAllowed: _this15.changeCertificateAllowed = changeCertificateAllowed
      };
      amiWebApp.appendHTML('body', data[2], {
        dict: dict
      }).done(function () {
        $('#B7894CC1_1DAA_4A7E_B7D1_DBDF6F06AC73').submit(function (e) {
          _this15.form_login(e);
        });
        $('#EE055CD4_E58F_4834_8020_986AE3F8D67D').submit(function (e) {
          _this15.form_addUser(e);
        });
        $('#DA2047A2_9E5D_420D_B6E7_FA261D2EF10F').submit(function (e) {
          _this15.form_remindPass(e);
        });
        $('#D9EAF998_ED8E_44D2_A0BE_8C5CF5E438BD').submit(function (e) {
          _this15.form_changeInfo(e);
        });
        $('#E92A1097_983B_4857_875F_07E4659B41B0').submit(function (e) {
          _this15.form_changePass(e);
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
        if (_this15.ssoInfo.url.startsWith(e.origin)) {
          var user = e.data.user;
          var pass = e.data.pass;

          if (user && pass) {
            _this15.form_login2(user, pass);
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
              _this15._update(userInfo, roleInfo, udpInfo, ssoInfo);
            }
          });
        }
      }, 30 * 1000);
      amiCommand.certLogin().fail(function (data, message, userInfo, roleInfo, udpInfo, ssoInfo) {
        _this15._update(userInfo, roleInfo, udpInfo, ssoInfo).always(function () {
          result.reject(message);
        });
      }).done(function (data, message, userInfo, roleInfo, udpInfo, ssoInfo) {
        _ami_internal_then(amiWebApp.onReady(userdata), function () {
          amiWebApp._isReady = true;

          _this15._update(userInfo, roleInfo, udpInfo, ssoInfo).then(function (message) {
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

        $('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').parent().css('background', '#B8D49B url("' + amiWebApp.originURL + '/images/certificate-green.png") no-repeat center center').css('background-size', 'cover');
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

        $('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').parent().css('background', '#E8C8CF url("' + amiWebApp.originURL + '/images/certificate-pink.png") no-repeat center center').css('background-size', 'cover');
        $('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').css('color', '#8B0000').html('<i class="fa fa-leaf"></i> invalid <i class="fa fa-leaf"></i>');
        $('#E91280F6_E7C6_3E53_A457_646995C99317').text(notBefore + ' - ' + notAfter);
      }

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
    var _this16 = this;

    amiWebApp.lock();
    return amiCommand.logout().always(function (data, message, userInfo, roleInfo, udpInfo, ssoInfo) {
      _this16._update(userInfo, roleInfo, udpInfo, ssoInfo).then(function () {
        _this16._unlock();
      }, function (message) {
        _this16._error(message);
      });
    });
  },
  form_login: function form_login(e) {
    e.preventDefault();
    var values = $(e.target).serializeObject();
    return this.form_login2(values['user'], values['pass']);
  },
  form_login2: function form_login2(user, pass) {
    var _this17 = this;

    var promise = user && pass ? amiCommand.passLogin(user.trim(), pass.trim()) : amiCommand.certLogin();
    amiWebApp.lock();
    promise.then(function (data, message, userInfo, roleInfo, udpInfo, ssoInfo) {
      _this17._update(userInfo, roleInfo, udpInfo, ssoInfo).then(function () {
        if (userInfo.AMIUser !== userInfo.guestUser) {
          $('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('hide');

          _this17._unlock();
        }
      }, function (message) {
        if (userInfo.AMIUser !== userInfo.guestUser) {
          $('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('hide');

          _this17._error(message);
        }
      });

      if (userInfo.AMIUser === userInfo.guestUser) {
        var _message = 'Authentication failed.';

        if (userInfo.clientDNInSession || userInfo.issuerDNInSession) {
          _message += ' Client DN in session: ' + amiWebApp.textToHtml(userInfo.clientDNInSession) + '.' + ' Issuer DN in session: ' + amiWebApp.textToHtml(userInfo.issuerDNInSession) + '.';
        }

        _this17._error(_message);
      }
    }, function (data, message, userInfo, roleInfo, udpInfo, ssoInfo) {
      _this17._update(userInfo, roleInfo, udpInfo, ssoInfo).always(function () {
        _this17._error(message);
      });
    });
  },
  form_attachCert: function form_attachCert() {
    var _this18 = this;

    var user = $('#E64F24B2_33E6_4DED_9B24_28BE04219613').val();
    var pass = $('#A4DFD039_034F_4D10_9668_385AEF4FBBB9').val();

    if (!user || !pass) {
      this._error('Please, fill all fields with a red star.');

      return;
    }

    amiWebApp.lock();
    amiCommand.attachCert(user, pass).then(function (data, message) {
      _this18._success(message);
    }, function (data, message) {
      _this18._error(message);
    });
  },
  form_detachCert: function form_detachCert() {
    var _this19 = this;

    var user = $('#E64F24B2_33E6_4DED_9B24_28BE04219613').val();
    var pass = $('#A4DFD039_034F_4D10_9668_385AEF4FBBB9').val();

    if (!user || !pass) {
      this._error('Please, fill all fields with a red star.');

      return;
    }

    amiWebApp.lock();
    amiCommand.detachCert(user, pass).then(function (data, message) {
      _this19._success(message);
    }, function (data, message) {
      _this19._error(message);
    });
  },
  form_addUser: function form_addUser(e) {
    var _this20 = this;

    e.preventDefault();
    var values = $(e.target).serializeObject();
    amiWebApp.lock();
    amiCommand.addUser(values['login'], values['pass'], values['first_name'], values['last_name'], values['email'], 'attach' in values, 'agree' in values).then(function (data, message) {
      _this20._success(message);
    }, function (data, message) {
      _this20._error(message);
    });
  },
  form_remindPass: function form_remindPass(e) {
    var _this21 = this;

    e.preventDefault();
    var values = $(e.target).serializeObject();
    amiWebApp.lock();
    amiCommand.resetPass(values['user']).then(function (data, message) {
      _this21._success(message);
    }, function (data, message) {
      _this21._error(message);
    });
  },
  form_changeInfo: function form_changeInfo(e) {
    var _this22 = this;

    e.preventDefault();
    var values = $(e.target).serializeObject();
    amiWebApp.lock();
    amiCommand.changeInfo(values['first_name'], values['last_name'], values['email']).then(function (data, message) {
      _this22._success(message);
    }, function (data, message) {
      _this22._error(message);
    });
  },
  form_changePass: function form_changePass(e) {
    var _this23 = this;

    e.preventDefault();
    var values = $(e.target).serializeObject();
    amiWebApp.lock();
    amiCommand.changePass(this.user, values['old_pass'], values['new_pass']).then(function (data, message) {
      _this23._success(message);
    }, function (data, message) {
      _this23._error(message);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFNSS9zcmMvbWFpbi5qcyIsIkFNSS9zcmMvdG9rZW5pemVyLmpzIiwiQU1JL3NyYy9leHByZXNzaW9uX2NvbXBpbGVyLmpzIiwiQU1JL3NyYy90ZW1wbGF0ZV9jb21waWxlci5qcyIsIkFNSS9zcmMvZW5naW5lLmpzIiwiQU1JL3NyYy9jYWNoZS5qcyIsIkFNSS9zcmMvc3RkbGliLmpzIiwiQU1JL3NyYy9pbnRlcnByZXRlci5qcyIsIkFNSS9leHRlcm5hbC9qc3BhdGguanMiLCJBTUkvQU1JRXh0ZW5zaW9uLmpzIiwiQU1JL0FNSU9iamVjdC5qcyIsIkFNSS9BTUlSb3V0ZXIuanMiLCJBTUkvQU1JV2ViQXBwLmpzIiwiQU1JL0FNSUludGVyZmFjZS5qcyIsIkFNSS9BTUlDb21tYW5kLmpzIiwiQU1JL0FNSUxvZ2luLmpzIiwiQU1JL0FNSURvYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQSxJQUFBLE9BQUEsR0FBQTtBQUNBLEVBQUEsT0FBQSxFQUFBO0FBREEsQ0FBQTs7QUFRQSxJQUFBLE9BQUEsT0FBQSxLQUFBLFdBQUEsRUFDQTtBQUNBLEVBQUEsT0FBRyxDQUFNLEVBQVQsR0FBVSxPQUFXLENBQUMsSUFBRCxDQUFyQjtBQUVDLEVBQUEsTUFBQSxDQUFPLE9BQVAsQ0FBYSxPQUFiLEdBQXdCLE9BQXhCO0FBQ0Q7O0FDeEJBLE9BQUEsQ0FBQSxTQUFBLEdBQUE7QUFHQyxFQUFBLFFBQUEsRUFBQSxrQkFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsRUFDRDtBQUNDLFFBQUEsU0FBVSxDQUFBLE1BQVYsS0FBeUIsVUFBTSxDQUFBLE1BQS9CLEVBQ0M7QUFDQSxZQUFHLHlDQUFIO0FBQ0M7O0FBRUQsUUFBQyxhQUFBLEdBQUEsRUFBRDtBQUNGLFFBQUEsWUFBQSxHQUFBLEVBQUE7QUFDRSxRQUFNLFlBQUEsR0FBZSxFQUFyQjtBQUVBLFFBQUEsQ0FB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QWxFUjtBQW1FQyxFQUFBLE1BQUksRUFBSSxHQW5FVDtBQW9FQyxFQUFBLElBQUEsRUFBTSxHQXBFUDtBQXFFQyxFQUFBLEtBQUEsRUFBTyxHQXJFUjtBQXNFQyxFQUFBLEtBQUssRUFBQyxHQXRFUDtBQXVFQyxFQUFBLEdBQUEsRUFBSyxHQXZFTjtBQXdFQyxFQUFBLEtBQUssRUFBRSxHQXhFUjtBQXlFQyxFQUFBLEdBQUcsRUFBRSxHQXpFTjtBQTBFQyxFQUFBLEdBQUEsRUFBSyxHQTFFTjtBQTJFQyxFQUFBLGVBQVMsRUFBQSxHQTNFVjtBQTRFQyxFQUFBLFFBQVMsRUFBQSxHQTVFVjtBQTZFQSxFQUFBLEtBQUUsRUFBQSxHQTdFRjtBQThFQSxFQUFBLEdBQUUsRUFBQSxHQTlFRjtBQStFQyxFQUFBLEtBQUssRUFBRSxHQS9FUjtBQWdGQyxFQUFBLElBQUksRUFBQyxHQWhGTjtBQWlGQyxFQUFBLEVBQUEsRUFBQSxHQWpGRDtBQWtGQyxFQUFBLEVBQUEsRUFBSSxHQWxGTDtBQW1GQyxFQUFBLEdBQUcsRUFBQyxHQW5GTDtBQW9GQyxFQUFBLEdBQUcsRUFBQyxHQXBGTDtBQXFGQyxFQUFBLEdBQUcsRUFBRSxHQXJGTjtBQXNGQyxFQUFBLEdBQUcsRUFBRSxHQXRGTjtBQXVGQyxFQUFBLEdBQUcsRUFBRSxHQXZGTjtBQXdGQyxFQUFBLFFBQVEsRUFBQyxHQXhGVjtBQThGQyxFQUFBLEdBQUEsRUFBQSxHQTlGRDtBQStGQSxFQUFBLEdBQUEsRUFBQSxHQS9GQTtBQWdHQyxFQUFBLEdBQUcsRUFBRSxHQWhHTjtBQWlHQyxFQUFBLEdBQUcsRUFBRTtBQWpHTixDQUFBO0FBd0dBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEtBQUE7O0FBTUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxTQUFBLEdBQUEsVUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO0FBR0MsT0FBQSxPQUFBLEdBQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLENBQUE7QUFJQSxPQUFBLFVBQUEsR0FBQSxDQUNELElBREMsRUFFQSxLQUZBLEVBR0MsTUFIRCxFQUlDLE9BSkQsRUFLQyxPQUxELEVBTUMsS0FORCxFQU9DLElBUEQsRUFRQyxTQVJELEVBU0MsTUFURCxFQVVDLE9BVkQsRUFXQyxVQVhELEVBWUMsTUFaRCxFQWFDLEtBYkQsRUFjQyxLQWRELEVBZUMsSUFmRCxFQWdCQyxLQWhCRCxFQWlCQyxJQWpCRCxFQWtCQyxJQWxCRCxFQW1CQyxJQW5CRCxFQW9CQyxHQXBCRCxFQXFCQyxHQXJCRCxFQXNCQyxnQkF0QkQsRUF1QkMsY0F2QkQsRUF3QkMsU0F4QkQsRUF5QkMsSUF6QkQsRUEwQkMsSUExQkQsRUEyQkMsR0EzQkQsRUE0QkMsR0E1QkQsRUE2QkMsR0E3QkQsRUE4QkMsSUE5QkQsRUErQkMsR0EvQkQsRUFnQ0MsSUFoQ0QsRUFpQ0MsR0FqQ0QsRUFrQ0MsR0FsQ0QsRUFtQ0MsSUFuQ0QsRUFvQ0MsR0FwQ0QsRUFxQ0MsR0FyQ0QsRUFzQ0MsR0F0Q0QsRUF1Q0MsR0F2Q0QsRUF3Q0MsR0F4Q0QsRUF5Q0MsR0F6Q0QsRUEwQ0MsR0ExQ0QsRUEyQ0MsR0EzQ0QsRUE0Q0MsR0E1Q0QsRUE2Q0MsR0E3Q0QsRUE4Q0MsR0E5Q0QsRUErQ0MsTUEvQ0QsRUFnREMsT0FoREQsRUFpREMsaUJBakRELEVBa0RDLFNBbERELEVBbURDLGdCQW5ERCxFQW9EQyxnQkFwREQsRUFxREMsMkJBckRELENBQUE7QUEwREEsT0FBQSxXQUFBLEdBQUEsQ0FDRCxPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxVQURDLEVBRUEsT0FBSyxDQUFBLElBQUwsQ0FBSyxNQUFMLENBQW9CLFdBRnBCLEVBR0MsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLFVBSHJCLEVBSUMsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLFdBSnJCLEVBS0MsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLFdBTHJCLEVBTUMsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEdBTnJCLEVBT0MsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEVBUHJCLEVBUUMsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLE9BUnJCLEVBU0MsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLElBVHJCLEVBVUMsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEtBVnJCLEVBV0MsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLFFBWHJCLEVBWUMsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLElBWnJCLEVBYUMsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEdBYnJCLEVBY0MsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLE1BZHJCLEVBZUMsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLE1BZnJCLEVBZ0JDLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixNQWhCckIsRUFpQkMsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLE1BakJyQixFQWtCQyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsTUFsQnJCLEVBbUJDLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixNQW5CckIsRUFvQkMsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLE1BcEJyQixFQXFCQyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsTUFyQnJCLEVBc0JDLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixXQXRCckIsRUF1QkMsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLFNBdkJyQixFQXdCQyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsT0F4QnJCLEVBeUJDLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixFQXpCckIsRUEwQkMsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEtBMUJyQixFQTJCQyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsTUEzQnJCLEVBNEJDLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixJQTVCckIsRUE2QkMsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEtBN0JyQixFQThCQyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsS0E5QnJCLEVBK0JDLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixHQS9CckIsRUFnQ0MsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEtBaENyQixFQWlDQyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsR0FqQ3JCLEVBa0NDLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixHQWxDckIsRUFtQ0MsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLGVBbkNyQixFQW9DQyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsUUFwQ3JCLEVBcUNDLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixLQXJDckIsRUFzQ0MsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEdBdENyQixFQXVDQyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsS0F2Q3JCLEVBd0NDLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixJQXhDckIsRUF5Q0MsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEVBekNyQixFQTBDQyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsRUExQ3JCLEVBMkNDLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixHQTNDckIsRUE0Q0MsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEdBNUNyQixFQTZDQyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsR0E3Q3JCLEVBOENDLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixHQTlDckIsRUErQ0MsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLFFBL0NyQixFQWdEQyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsUUFoRHJCLEVBaURDLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixRQWpEckIsRUFrREMsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLFFBbERyQixFQW1EQyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsUUFuRHJCLEVBb0RDLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixRQXBEckIsRUFxREMsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEdBckRyQixDQUFBOztBQTBEQSxPQUFBLEtBQUEsR0FBQSxVQUFBLElBQUEsRUFBQSxJQUFBLEVBQ0Q7QUFHRSxRQUFBLE1BQUEsR0FBQSxPQUFBLENBQUEsU0FBQSxDQUFBLFFBQUEsQ0FDRixJQURFLEVBRUEsSUFGQSxFQUdDLEtBQUssT0FITixFQUlDLEtBQUssVUFKTixFQUtDLEtBQUssV0FMTixFQU1DLElBTkQsQ0FBQTtBQVdBLFNBQUEsTUFBQSxHQUFBLE1BQUEsQ0FBQSxNQUFBO0FBQ0YsU0FBQSxLQUFBLEdBQUEsTUFBQSxDQUFBLEtBQUE7QUFFRSxTQUFLLENBQUwsR0FBSyxDQUFMO0FBR0YsR0FyQkM7O0FBeUJBLE9BQUEsSUFBQSxHQUFBLFVBQUEsQ0FBQSxFQUNEO0FBQUEsUUFEQyxDQUNEO0FBREMsTUFBQSxDQUNELEdBREMsQ0FDRDtBQUFBOztBQUNDLFNBQUssQ0FBTCxJQUFXLENBQVg7QUFDQyxHQUhEOztBQU9BLE9BQUEsT0FBQSxHQUFBLFlBQ0Q7QUFDQyxXQUFLLEtBQVEsQ0FBUixJQUFVLEtBQVEsTUFBUixDQUFVLE1BQXpCO0FBQ0MsR0FIRDs7QUFPQSxPQUFBLFNBQUEsR0FBQSxZQUNEO0FBQ0MsV0FBSyxLQUFBLE1BQUEsQ0FBWSxLQUFRLENBQXBCLENBQUw7QUFDQyxHQUhEOztBQU9BLE9BQUEsUUFBQSxHQUFBLFlBQ0Q7QUFDQyxXQUFLLEtBQVEsS0FBUixDQUFXLEtBQVEsQ0FBbkIsQ0FBTDtBQUNDLEdBSEQ7O0FBT0EsT0FBQSxTQUFBLEdBQUEsVUFBQSxJQUFBLEVBQ0Q7QUFDQyxRQUFJLEtBQUMsQ0FBRCxHQUFDLEtBQVksTUFBWixDQUFvQixNQUF6QixFQUNDO0FBQ0EsVUFBTyxJQUFJLEdBQUMsS0FBSyxLQUFMLENBQVksS0FBTSxDQUFsQixDQUFaO0FBRUMsYUFBTSxJQUFNLFlBQVksS0FBbEIsR0FBMEIsSUFBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLEtBQUEsQ0FBMUIsR0FBMEIsSUFBQSxLQUFBLElBQWhDO0FBQ0g7O0FBRUUsV0FBQyxLQUFEO0FBQ0YsR0FWQzs7QUFjQSxPQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQTtBQUdELENBak1BOztBQXVNQSxPQUFBLENBQUEsSUFBQSxDQUFBLFFBQUEsR0FBQSxVQUFBLElBQUEsRUFBQSxJQUFBLEVBQUE7QUFFQSxPQUFBLEtBQUEsQ0FBWSxJQUFaLEVBQWEsSUFBYjtBQUNBLENBSEE7O0FBT0EsT0FBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLENBQUEsU0FBQSxHQUFBO0FBR0MsRUFBQSxLQUFBLEVBQUEsZUFBQSxJQUFBLEVBQUEsSUFBQSxFQUNEO0FBR0UsU0FBQSxTQUFBLEdBQUEsSUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFNBQUEsQ0FDRixLQUFBLElBQUEsR0FBQSxJQURFLEVBRUEsS0FBSyxJQUFMLEdBQUssSUFGTCxDQUFBO0FBT0EsU0FBQSxRQUFBLEdBQUEsS0FBQSxtQkFBQSxFQUFBOztBQUlBLFFBQUEsS0FBQSxTQUFBLENBQUEsT0FBQSxPQUFBLEtBQUEsRUFDRjtBQUNFLFlBQU8seUJBQXlCLEtBQUssSUFBOUIsR0FBK0IsdUJBQS9CLEdBQStCLEtBQUEsU0FBQSxDQUFBLFNBQUEsRUFBL0IsR0FBK0IsR0FBdEM7QUFDQztBQUdILEdBeEJBO0FBNEJDLEVBQUEsSUFBQSxFQUFBLGdCQUNEO0FBQ0MsV0FBTSxLQUFBLFFBQUEsQ0FBVSxJQUFWLEVBQU47QUFDQyxHQS9CRjtBQW1DQyxFQUFBLG1CQUFBLEVBQUEsK0JBQ0Q7QUFDQyxRQUFBLElBQUEsR0FBQSxLQUFBLGNBQUEsRUFBQTtBQUFBLFFBQStCLEtBQS9CO0FBQUEsUUFBK0IsSUFBL0I7O0FBTUMsV0FBQSxLQUFBLFNBQUEsQ0FBQSxTQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsZUFBQSxDQUFBLEVBQ0Y7QUFDRSxNQUFBLElBQUssR0FBQyxJQUFLLE9BQUEsQ0FBUyxJQUFULENBQVUsSUFBZixDQUF3QixLQUFDLFNBQUQsQ0FBYyxRQUFkLEVBQXhCLEVBQTZDLEtBQUEsU0FBQSxDQUFpQixTQUFqQixFQUE3QyxDQUFOO0FBQ0MsV0FBQSxTQUFBLENBQUEsSUFBQTtBQUVBLE1BQUEsS0FBSyxHQUFBLEtBQUEsY0FBQSxFQUFMO0FBRUEsTUFBQSxJQUFBLENBQUssUUFBTCxHQUFhLElBQWI7QUFDSCxNQUFBLElBQUEsQ0FBQSxTQUFBLEdBQUEsS0FBQTtBQUVHLE1BQUEsSUFBSSxHQUFDLElBQUw7QUFDSDs7QUFJRSxXQUFBLElBQUE7QUFDRixHQTNEQTtBQStEQyxFQUFBLGNBQUEsRUFBQSwwQkFDRDtBQUNDLFFBQUEsSUFBQSxHQUFBLEtBQWdCLGVBQWhCLEVBQUE7QUFBQSxRQUEwQixLQUExQjtBQUFBLFFBQTBCLElBQTFCOztBQU1DLFdBQUEsS0FBQSxTQUFBLENBQUEsU0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxFQUNGO0FBQ0UsTUFBQSxJQUFLLEdBQUMsSUFBSyxPQUFBLENBQVMsSUFBVCxDQUFVLElBQWYsQ0FBd0IsS0FBQyxTQUFELENBQWMsUUFBZCxFQUF4QixFQUE2QyxLQUFVLFNBQVYsQ0FBWSxTQUFaLEVBQTdDLENBQU47QUFDQyxXQUFBLFNBQUEsQ0FBQSxJQUFBO0FBRUEsTUFBQSxLQUFLLEdBQUEsS0FBQSxlQUFBLEVBQUw7QUFFQSxNQUFBLElBQUEsQ0FBSyxRQUFMLEdBQWEsSUFBYjtBQUNILE1BQUEsSUFBQSxDQUFBLFNBQUEsR0FBQSxLQUFBO0FBRUcsTUFBQSxJQUFJLEdBQUMsSUFBTDtBQUNIOztBQUlFLFdBQUEsSUFBQTtBQUNGLEdBdkZBO0FBMkZDLEVBQUEsZUFBQSxFQUFBLDJCQUNEO0FBQ0MsUUFBQSxJQUFBLEdBQUEsS0FBaUIsY0FBakIsRUFBQTtBQUFBLFFBQTJCLEtBQTNCO0FBQUEsUUFBMkIsSUFBM0I7O0FBTUMsV0FBQSxLQUFBLFNBQUEsQ0FBQSxTQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsV0FBQSxDQUFBLEVBQ0Y7QUFDRSxNQUFBLElBQUssR0FBQyxJQUFLLE9BQUEsQ0FBUyxJQUFULENBQVUsSUFBZixDQUF3QixLQUFDLFNBQUQsQ0FBYyxRQUFkLEVBQXhCLEVBQTZDLEtBQVcsU0FBWCxDQUFhLFNBQWIsRUFBN0MsQ0FBTjtBQUNDLFdBQUEsU0FBQSxDQUFBLElBQUE7QUFFQSxNQUFBLEtBQUssR0FBQSxLQUFBLGNBQUEsRUFBTDtBQUVBLE1BQUEsSUFBQSxDQUFLLFFBQUwsR0FBYSxJQUFiO0FBQ0gsTUFBQSxJQUFBLENBQUEsU0FBQSxHQUFBLEtBQUE7QUFFRyxNQUFBLElBQUksR0FBQyxJQUFMO0FBQ0g7O0FBSUUsV0FBQSxJQUFBO0FBQ0YsR0FuSEE7QUF1SEMsRUFBQSxjQUFBLEVBQUEsMEJBQ0Q7QUFDQyxRQUFBLElBQUEsR0FBQSxLQUFnQixlQUFoQixFQUFBO0FBQUEsUUFBMEIsS0FBMUI7QUFBQSxRQUEwQixJQUExQjs7QUFNQyxXQUFBLEtBQUEsU0FBQSxDQUFBLFNBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxVQUFBLENBQUEsRUFDRjtBQUNFLE1BQUEsSUFBSyxHQUFDLElBQUssT0FBQSxDQUFTLElBQVQsQ0FBVSxJQUFmLENBQXdCLEtBQUMsU0FBRCxDQUFjLFFBQWQsRUFBeEIsRUFBNkMsS0FBVSxTQUFWLENBQVksU0FBWixFQUE3QyxDQUFOO0FBQ0MsV0FBQSxTQUFBLENBQUEsSUFBQTtBQUVBLE1BQUEsS0FBSyxHQUFBLEtBQUEsZUFBQSxFQUFMO0FBRUEsTUFBQSxJQUFBLENBQUssUUFBTCxHQUFhLElBQWI7QUFDSCxNQUFBLElBQUEsQ0FBQSxTQUFBLEdBQUEsS0FBQTtBQUVHLE1BQUEsSUFBSSxHQUFDLElBQUw7QUFDSDs7QUFJRSxXQUFBLElBQUE7QUFDRixHQS9JQTtBQW1KQyxFQUFBLGVBQUEsRUFBQSwyQkFDRDtBQUNDLFFBQUEsSUFBQSxHQUFBLEtBQWlCLGVBQWpCLEVBQUE7QUFBQSxRQUEyQixLQUEzQjtBQUFBLFFBQTJCLElBQTNCOztBQU1DLFdBQUEsS0FBQSxTQUFBLENBQUEsU0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLFdBQUEsQ0FBQSxFQUNGO0FBQ0UsTUFBQSxJQUFLLEdBQUMsSUFBSyxPQUFBLENBQVMsSUFBVCxDQUFVLElBQWYsQ0FBd0IsS0FBQyxTQUFELENBQWMsUUFBZCxFQUF4QixFQUE2QyxLQUFXLFNBQVgsQ0FBYSxTQUFiLEVBQTdDLENBQU47QUFDQyxXQUFBLFNBQUEsQ0FBQSxJQUFBO0FBRUEsTUFBQSxLQUFLLEdBQUEsS0FBQSxlQUFBLEVBQUw7QUFFQSxNQUFBLElBQUEsQ0FBSyxRQUFMLEdBQWEsSUFBYjtBQUNILE1BQUEsSUFBQSxDQUFBLFNBQUEsR0FBQSxLQUFBO0FBRUcsTUFBQSxJQUFJLEdBQUMsSUFBTDtBQUNIOztBQUlFLFdBQUEsSUFBQTtBQUNGLEdBM0tBO0FBK0tDLEVBQUEsZUFBQSxFQUFBLDJCQUNEO0FBQ0MsUUFBQSxJQUFBLEdBQUEsS0FBaUIsUUFBakIsRUFBQTtBQUFBLFFBQTJCLEtBQTNCO0FBQUEsUUFBMkIsSUFBM0I7O0FBTUMsV0FBQSxLQUFBLFNBQUEsQ0FBQSxTQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsV0FBQSxDQUFBLEVBQ0Y7QUFDRSxNQUFBLElBQUssR0FBQyxJQUFLLE9BQUEsQ0FBUyxJQUFULENBQVUsSUFBZixDQUF3QixLQUFDLFNBQUQsQ0FBYyxRQUFkLEVBQXhCLEVBQTZDLEtBQVcsU0FBWCxDQUFhLFNBQWIsRUFBN0MsQ0FBTjtBQUNDLFdBQUEsU0FBQSxDQUFBLElBQUE7QUFFQSxNQUFBLEtBQUssR0FBQSxLQUFBLFFBQUEsRUFBTDtBQUVBLE1BQUEsSUFBQSxDQUFLLFFBQUwsR0FBYSxJQUFiO0FBQ0gsTUFBQSxJQUFBLENBQUEsU0FBQSxHQUFBLEtBQUE7QUFFRyxNQUFBLElBQUksR0FBQyxJQUFMO0FBQ0g7O0FBSUUsV0FBQSxJQUFBO0FBQ0YsR0F2TUE7QUEyTUMsRUFBQSxRQUFBLEVBQUEsb0JBQ0Q7QUFDQyxRQUFBLEtBQUEsRUFBVSxJQUFWOztBQU1DLFFBQUEsS0FBQSxTQUFBLENBQUEsU0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUNGO0FBQ0UsTUFBQSxJQUFHLEdBQUssSUFBQSxPQUFVLENBQUEsSUFBVixDQUFVLElBQVYsQ0FBb0IsS0FBTyxTQUFQLENBQWEsUUFBYixFQUFwQixFQUE2QyxLQUFBLFNBQUEsQ0FBQSxTQUFBLEVBQTdDLENBQVI7QUFDQyxXQUFBLFNBQUEsQ0FBQSxJQUFBO0FBRUEsTUFBQSxLQUFLLEdBQUEsS0FBQSxTQUFBLEVBQUw7QUFFQSxNQUFBLElBQUEsQ0FBSyxRQUFMLEdBQWEsSUFBYjtBQUNILE1BQUEsSUFBQSxDQUFBLFNBQUEsR0FBQSxLQUFBO0FBRUcsYUFBSyxJQUFMO0FBQ0g7O0FBTUUsV0FBQSxLQUFBLFNBQUEsRUFBQTtBQUNGLEdBck9BO0FBeU9DLEVBQUEsU0FBQSxFQUFBLHFCQUNEO0FBQ0MsUUFBQSxJQUFTLEdBQUUsS0FBQSxXQUFBLEVBQVg7QUFBQSxRQUFxQixLQUFyQjtBQUFBLFFBQXFCLElBQXJCO0FBQUEsUUFBcUIsSUFBckI7O0FBTUMsUUFBQSxLQUFBLFNBQUEsQ0FBQSxTQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsRUFBQSxDQUFBLEVBQ0Y7QUFDRSxNQUFBLElBQUssR0FBRyxJQUFJLE9BQUMsQ0FBQSxJQUFELENBQVcsSUFBZixDQUFlLEtBQVUsU0FBVixDQUFzQixRQUF0QixFQUFmLEVBQWlELEtBQUEsU0FBQSxDQUFBLFNBQUEsRUFBakQsQ0FBUjtBQUNDLFdBQUEsU0FBQSxDQUFBLElBQUE7QUFHSCxNQUFBLElBQUEsR0FBQSxJQUFBOztBQUdHLFVBQUcsS0FBSyxTQUFMLENBQWUsU0FBZixDQUFzQixPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxHQUF0QixDQUFILEVBQ0g7QUFDRyxRQUFBLElBQUcsR0FBSyxJQUFBLE9BQVUsQ0FBQSxJQUFWLENBQVUsSUFBVixDQUFvQixLQUFPLFNBQVAsQ0FBYSxRQUFiLEVBQXBCLEVBQTZDLEtBQUEsU0FBQSxDQUFBLFNBQUEsRUFBN0MsQ0FBUjtBQUNDLGFBQUEsU0FBQSxDQUFBLElBQUE7QUFFQSxRQUFBLElBQUksQ0FBQyxRQUFMLEdBQWUsSUFBZjtBQUNKLFFBQUEsSUFBQSxDQUFBLFNBQUEsR0FBQSxJQUFBO0FBQ0k7O0FBRUQsVUFBQyxLQUFBLFNBQUEsQ0FBQSxTQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsTUFBQSxDQUFELEVBQ0g7QUFDRyxRQUFBLEtBQUcsR0FBSyxJQUFBLE9BQVUsQ0FBQSxJQUFWLENBQVUsSUFBVixDQUFvQixLQUFRLFNBQVIsQ0FBYSxRQUFiLEVBQXBCLEVBQWdELEtBQUEsU0FBQSxDQUFBLFNBQUEsRUFBaEQsQ0FBUjtBQUNDLGFBQUEsU0FBQSxDQUFBLElBQUE7QUFFQSxRQUFBLElBQUksQ0FBQyxRQUFMLEdBQWUsSUFBZjtBQUNKLFFBQUEsSUFBQSxDQUFBLFNBQUEsR0FBQSxLQUFBO0FBQ0ksT0FQRCxNQVNBO0FBQ0EsY0FBSSx5QkFBQSxLQUFBLElBQUEsR0FBQSw2RUFBSjtBQUNDOztBQUVELE1BQUEsSUFBQyxHQUFBLElBQUQ7QUFDSCxLQWhDRSxNQXNDQSxJQUFBLEtBQUEsU0FBQSxDQUFBLFNBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxNQUFBLENBQUEsRUFDRjtBQUNFLFFBQUEsSUFBSyxHQUFHLElBQUksT0FBQyxDQUFBLElBQUQsQ0FBVyxJQUFmLENBQWUsS0FBVSxTQUFWLENBQXNCLFFBQXRCLEVBQWYsRUFBNkMsS0FBUSxTQUFSLENBQVEsU0FBUixFQUE3QyxDQUFSO0FBQ0MsYUFBQSxTQUFBLENBQUEsSUFBQTtBQUVBLFFBQUEsS0FBSyxHQUFBLEtBQUEsV0FBQSxFQUFMO0FBRUEsUUFBQSxJQUFBLENBQUssUUFBTCxHQUFhLElBQWI7QUFDSCxRQUFBLElBQUEsQ0FBQSxTQUFBLEdBQUEsS0FBQTtBQUVHLFFBQUEsSUFBSSxHQUFDLElBQUw7QUFDSCxPQVhFLE1BaUJBLElBQUEsS0FBQSxTQUFBLENBQUEsU0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLFFBQUEsQ0FBQSxFQUNGO0FBQ0UsVUFBQSxJQUFLLEdBQUcsSUFBSSxPQUFDLENBQUEsSUFBRCxDQUFXLElBQWYsQ0FBZSxLQUFVLFNBQVYsQ0FBc0IsUUFBdEIsRUFBZixFQUE2QyxLQUFRLFNBQVIsQ0FBVSxTQUFWLEVBQTdDLENBQVI7QUFDQyxlQUFBLFNBQUEsQ0FBQSxJQUFBO0FBRUEsVUFBQSxLQUFLLEdBQUEsS0FBQSxXQUFBLEVBQUw7QUFFQSxVQUFBLElBQUEsQ0FBSyxRQUFMLEdBQWEsSUFBYjtBQUNILFVBQUEsSUFBQSxDQUFBLFNBQUEsR0FBQSxLQUFBO0FBRUcsVUFBQSxJQUFJLEdBQUMsSUFBTDtBQUNILFNBWEUsTUFpQkEsSUFBQSxLQUFBLFNBQUEsQ0FBQSxTQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsT0FBQSxDQUFBLEVBQ0Y7QUFDRSxZQUFBLElBQUssR0FBRyxJQUFJLE9BQUMsQ0FBQSxJQUFELENBQVcsSUFBZixDQUFlLEtBQVUsU0FBVixDQUFzQixRQUF0QixFQUFmLEVBQTZDLEtBQVMsU0FBVCxDQUFTLFNBQVQsRUFBN0MsQ0FBUjtBQUNDLGlCQUFBLFNBQUEsQ0FBQSxJQUFBO0FBRUEsWUFBQSxLQUFLLEdBQUEsS0FBQSxXQUFBLEVBQUw7QUFFQSxZQUFBLElBQUEsQ0FBSyxRQUFMLEdBQWEsSUFBYjtBQUNILFlBQUEsSUFBQSxDQUFBLFNBQUEsR0FBQSxLQUFBO0FBRUcsWUFBQSxJQUFJLEdBQUMsSUFBTDtBQUNILFdBWEUsTUFpQkEsSUFBQSxLQUFBLFNBQUEsQ0FBQSxTQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsRUFBQSxDQUFBLEVBQ0Y7QUFDRSxjQUFBLElBQUssR0FBRyxJQUFJLE9BQUMsQ0FBQSxJQUFELENBQVcsSUFBZixDQUFlLEtBQVUsU0FBVixDQUFzQixRQUF0QixFQUFmLEVBQWlELEtBQUEsU0FBQSxDQUFBLFNBQUEsRUFBakQsQ0FBUjtBQUNDLG1CQUFBLFNBQUEsQ0FBQSxJQUFBO0FBRUEsY0FBQSxLQUFLLEdBQUEsS0FBQSxXQUFBLEVBQUw7QUFFQSxjQUFBLElBQUEsQ0FBSyxRQUFMLEdBQWEsSUFBYjtBQUNILGNBQUEsSUFBQSxDQUFBLFNBQUEsR0FBQSxLQUFBO0FBRUcsY0FBQSxJQUFJLEdBQUMsSUFBTDtBQUNIOztBQU1FLFdBQUEsSUFBQTtBQUNGLEdBNVZBO0FBZ1dDLEVBQUEsV0FBQSxFQUFBLHVCQUNEO0FBQ0MsUUFBQSxJQUFBLEdBQVksS0FBQyxXQUFELEVBQVo7QUFBQSxRQUF1QixLQUF2QjtBQUFBLFFBQXVCLElBQXZCOztBQU1DLFdBQUEsS0FBQSxTQUFBLENBQUEsU0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxFQUNGO0FBQ0UsTUFBQSxJQUFLLEdBQUMsSUFBSyxPQUFBLENBQVMsSUFBVCxDQUFVLElBQWYsQ0FBd0IsS0FBQyxTQUFELENBQWMsUUFBZCxFQUF4QixFQUE2QyxLQUFVLFNBQVYsQ0FBWSxTQUFaLEVBQTdDLENBQU47QUFDQyxXQUFBLFNBQUEsQ0FBQSxJQUFBO0FBRUEsTUFBQSxLQUFLLEdBQUEsS0FBQSxXQUFBLEVBQUw7QUFFQSxNQUFBLElBQUEsQ0FBSyxRQUFMLEdBQWEsSUFBYjtBQUNILE1BQUEsSUFBQSxDQUFBLFNBQUEsR0FBQSxLQUFBO0FBRUcsTUFBQSxJQUFJLEdBQUMsSUFBTDtBQUNIOztBQUlFLFdBQUEsSUFBQTtBQUNGLEdBeFhBO0FBNFhDLEVBQUEsV0FBQSxFQUFBLHVCQUNEO0FBQ0MsUUFBQSxJQUFBLEdBQVksS0FBQyxjQUFELEVBQVo7QUFBQSxRQUF1QixLQUF2QjtBQUFBLFFBQXVCLElBQXZCOztBQU1DLFdBQUEsS0FBQSxTQUFBLENBQUEsU0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLGlCQUFBLENBQUEsRUFDRjtBQUNFLE1BQUEsSUFBSyxHQUFDLElBQUssT0FBQSxDQUFTLElBQVQsQ0FBVSxJQUFmLENBQXdCLEtBQUMsU0FBRCxDQUFjLFFBQWQsRUFBeEIsRUFBNkMsS0FBQSxTQUFBLENBQW1CLFNBQW5CLEVBQTdDLENBQU47QUFDQyxXQUFBLFNBQUEsQ0FBQSxJQUFBO0FBRUEsTUFBQSxLQUFLLEdBQUEsS0FBQSxjQUFBLEVBQUw7QUFFQSxNQUFBLElBQUEsQ0FBSyxRQUFMLEdBQWEsSUFBYjtBQUNILE1BQUEsSUFBQSxDQUFBLFNBQUEsR0FBQSxLQUFBO0FBRUcsTUFBQSxJQUFJLEdBQUMsSUFBTDtBQUNIOztBQUlFLFdBQUEsSUFBQTtBQUNGLEdBcFpBO0FBd1pDLEVBQUEsY0FBQSxFQUFBLDBCQUNEO0FBQ0MsUUFBQSxLQUFBLEVBQUEsSUFBQTs7QUFNQyxRQUFBLEtBQUEsU0FBQSxDQUFBLFNBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxVQUFBLENBQUEsRUFDRjtBQUNFLE1BQUEsSUFBRyxHQUFLLElBQUEsT0FBVSxDQUFBLElBQVYsQ0FBVSxJQUFWLENBQW9CLEtBQU8sU0FBUCxDQUFhLFFBQWIsRUFBcEIsRUFBd0MsS0FBWSxTQUFaLENBQVksU0FBWixFQUF4QyxDQUFSO0FBQ0MsV0FBQSxTQUFBLENBQUEsSUFBQTtBQUVBLE1BQUEsS0FBSyxHQUFBLEtBQUEsVUFBQSxFQUFMO0FBRUEsTUFBQSxJQUFBLENBQUssUUFBTCxHQUFhLElBQWI7QUFDSCxNQUFBLElBQUEsQ0FBQSxTQUFBLEdBQUEsS0FBQTtBQUVHLGFBQUssSUFBTDtBQUNIOztBQU1FLFdBQUEsS0FBQSxVQUFBLEVBQUE7QUFDRixHQWxiQTtBQXNiQyxFQUFBLFVBQUEsRUFBQSxzQkFDRDtBQUNDLFFBQUEsSUFBQSxHQUFZLEtBQUEsV0FBQSxFQUFaO0FBQUEsUUFBc0IsS0FBdEI7QUFBQSxRQUFzQixJQUF0Qjs7QUFNQyxXQUFBLEtBQUEsU0FBQSxDQUFBLFNBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsRUFDRjtBQUNFLE1BQUEsSUFBSyxHQUFDLElBQUssT0FBQSxDQUFTLElBQVQsQ0FBVSxJQUFmLENBQXdCLEtBQUMsU0FBRCxDQUFjLFFBQWQsRUFBeEIsRUFBa0QsS0FBRSxTQUFGLENBQUUsU0FBRixFQUFsRCxDQUFOO0FBQ0MsV0FBQSxTQUFBLENBQUEsSUFBQTtBQUVBLE1BQUEsS0FBSyxHQUFBLEtBQUEsV0FBQSxFQUFMO0FBRUEsTUFBQSxJQUFBLENBQUssUUFBTCxHQUFhLElBQWI7QUFDSCxNQUFBLElBQUEsQ0FBQSxTQUFBLEdBQUEsS0FBQTtBQUVHLE1BQUEsSUFBSSxHQUFDLElBQUw7QUFDSDs7QUFJRSxXQUFBLElBQUE7QUFDRixHQTljQTtBQWtkQyxFQUFBLFdBQUEsRUFBQSx1QkFDRDtBQUNDLFFBQUEsSUFBQSxHQUFZLEtBQUMsU0FBRCxFQUFaO0FBQUEsUUFBdUIsSUFBdkI7QUFBQSxRQUF1QixJQUF2Qjs7QUFNQyxXQUFBLEtBQUEsU0FBQSxDQUFBLFNBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsRUFDRjtBQUNFLFdBQU0sU0FBTixDQUFXLElBQVg7QUFFQyxNQUFBLElBQUksR0FBQyxLQUFBLFNBQUEsQ0FBaUIsSUFBakIsQ0FBTDs7QUFFQSxXQUFJLElBQUcsR0FBSSxJQUFYLEVBQVksSUFBUyxDQUFDLFFBQVYsS0FBZ0IsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsR0FBNUIsRUFBNEIsSUFBQSxHQUFBLElBQUEsQ0FBQSxRQUE1QjtBQUE0QjtBQUE1Qjs7QUFFQSxNQUFBLElBQUksQ0FBQSxJQUFKLENBQVUsT0FBVixDQUFpQixJQUFqQjtBQUVBLE1BQUEsSUFBSSxHQUFDLElBQUw7QUFDSDs7QUFJRSxXQUFBLElBQUE7QUFDRixHQTFlQTtBQThlQyxFQUFBLFNBQUEsRUFBQSxtQkFBQSxRQUFBLEVBQ0Q7QUFDQyxRQUFBLElBQVcsR0FBQSxLQUFRLFNBQVIsQ0FBa0IsUUFBbEIsQ0FBWDs7QUFFQyxRQUFBLElBQUEsRUFDRjtBQUdHLFVBQUEsSUFBQSxHQUFBLElBQUE7O0FBRUEsYUFBSSxJQUFNLENBQUMsUUFBUCxLQUFZLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEdBQWhCLEVBQWdCLElBQUEsR0FBQSxJQUFBLENBQUEsUUFBaEI7QUFBZ0I7QUFBaEI7O0FBSUEsVUFBQSxJQUFBLENBQUEsQ0FBQSxFQUNIO0FBQ00sWUFBTSxJQUFDLENBQUEsUUFBRCxLQUFDLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEdBQVAsRUFDRjtBQUNBLGNBQUksSUFBSSxDQUFBLFNBQUosSUFBa0IsT0FBSSxDQUFBLE1BQTFCLEVBQ0M7QUFDQSxZQUFBLElBQUcsQ0FBQSxTQUFILEdBQWtCLG9CQUFrQixJQUFBLENBQUEsU0FBcEM7QUFDQyxXQUhGLE1BS0M7QUFDQSxZQUFBLElBQUksQ0FBQSxTQUFKLEdBQUksT0FBQSxJQUFBLENBQUEsU0FBSjtBQUNDO0FBQ04sU0FWTSxNQVdBLElBQUEsSUFBQSxDQUFBLFFBQUEsS0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQ0Y7QUFDQSxVQUFBLElBQUssQ0FBQSxTQUFMLEdBQXlCLE9BQWMsSUFBQSxDQUFBLFNBQXZDO0FBQ0M7O0FBRUQsUUFBQSxJQUFDLENBQUEsQ0FBRCxHQUFDLEtBQUQ7QUFDSjtBQUdBOztBQUVFLFdBQUMsSUFBRDtBQUNGLEdBcmhCQTtBQXloQkMsRUFBQSxTQUFBLEVBQUEsbUJBQUEsUUFBQSxFQUNEO0FBQ0MsUUFBQSxJQUFTLEdBQUUsS0FBQSxTQUFBLENBQVMsUUFBVCxDQUFYO0FBQUEsUUFBNkIsS0FBN0I7QUFBQSxRQUE2QixJQUE3Qjs7QUFNQyxXQUFBLEtBQUEsU0FBQSxDQUFBLFNBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLENBQUEsRUFDRjtBQUNFLE1BQUEsSUFBSyxHQUFDLElBQUssT0FBQSxDQUFTLElBQVQsQ0FBVSxJQUFmLENBQXdCLEtBQUMsU0FBRCxDQUFjLFFBQWQsRUFBeEIsRUFBa0QsR0FBbEQsQ0FBTjtBQUNDLFdBQUEsU0FBQSxDQUFBLElBQUE7QUFFQSxNQUFBLEtBQUssR0FBQSxLQUFBLFNBQUEsQ0FBaUIsUUFBakIsQ0FBTDtBQUVBLE1BQUEsSUFBQSxDQUFLLFFBQUwsR0FBYSxJQUFiO0FBQ0gsTUFBQSxJQUFBLENBQUEsU0FBQSxHQUFBLEtBQUE7QUFFRyxNQUFBLElBQUksR0FBQyxJQUFMO0FBQ0g7O0FBSUUsV0FBQSxJQUFBO0FBQ0YsR0FqakJBO0FBcWpCQyxFQUFBLFNBQUEsRUFBQSxtQkFBQSxRQUFBLEVBQ0Q7QUFDQyxRQUFBLElBQVMsR0FBRSxLQUFBLE1BQUEsQ0FBUyxRQUFULENBQVg7QUFBQSxRQUE2QixLQUE3QjtBQUFBLFFBQTZCLElBQTdCOztBQU1DLFdBQUEsS0FBQSxTQUFBLENBQUEsU0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUNGO0FBQ0UsV0FBTSxTQUFOLENBQVcsSUFBWDtBQUVDLE1BQUEsS0FBSyxHQUFBLEtBQUEsbUJBQUEsRUFBTDs7QUFFQSxVQUFBLEtBQVEsU0FBUixDQUFhLFNBQWIsQ0FBYSxPQUFzQixDQUFBLElBQXRCLENBQXNCLE1BQXRCLENBQXNCLEdBQW5DLENBQUEsRUFDSDtBQUNHLGFBQUcsU0FBSCxDQUFRLElBQVI7QUFFQyxRQUFBLElBQUksR0FBQyxJQUFBLE9BQVUsQ0FBSSxJQUFkLENBQWlCLElBQWpCLENBQWlCLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEdBQWpCLEVBQWlCLElBQWpCLENBQUw7QUFFQSxRQUFBLElBQUksQ0FBQyxRQUFMLEdBQVcsSUFBWDtBQUNKLFFBQUEsSUFBQSxDQUFBLFNBQUEsR0FBQSxLQUFBO0FBRUksUUFBQSxJQUFJLEdBQUMsSUFBTDtBQUNKLE9BVkcsTUFZQTtBQUNBLGNBQUkseUJBQUEsS0FBQSxJQUFBLEdBQUEsaUJBQUo7QUFDQztBQUNKOztBQU1FLFdBQUEsSUFBQTtBQUNGLEdBemxCQTtBQTZsQkMsRUFBQSxNQUFBLEVBQUEsZ0JBQUEsUUFBQSxFQUNEO0FBQ0MsUUFBQSxJQUFBOztBQU1DLFFBQUEsSUFBQSxHQUFBLEtBQUEsVUFBQSxFQUFBLEVBQUE7QUFDRixhQUFBLElBQUE7QUFDRTs7QUFFQSxRQUFDLElBQUEsR0FBQSxLQUFBLFVBQUEsRUFBRCxFQUFDO0FBQ0gsYUFBQSxJQUFBO0FBQ0U7O0FBRUEsUUFBQyxJQUFBLEdBQUEsS0FBQSxXQUFBLEVBQUQsRUFBQztBQUNILGFBQUEsSUFBQTtBQUNFOztBQUVBLFFBQUMsSUFBQSxHQUFBLEtBQUEsV0FBQSxDQUFBLFFBQUEsQ0FBRCxFQUFDO0FBQ0gsYUFBQSxJQUFBO0FBQ0U7O0FBRUEsUUFBQyxJQUFBLEdBQUEsS0FBQSxhQUFBLEVBQUQsRUFBQztBQUNILGFBQUEsSUFBQTtBQUNFOztBQU1BLFVBQUEseUJBQUEsS0FBQSxJQUFBLEdBQUEsd0NBQUE7QUFHRixHQWhvQkE7QUFvb0JDLEVBQUEsVUFBQSxFQUFBLHNCQUNEO0FBQ0MsUUFBQSxJQUFBOztBQU1DLFFBQUEsS0FBQSxTQUFBLENBQUEsU0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUNGO0FBQ0UsV0FBRyxTQUFILENBQVEsSUFBUjtBQUVDLE1BQUEsSUFBSSxHQUFDLEtBQUEsbUJBQUEsRUFBTDs7QUFFQSxVQUFBLEtBQU8sU0FBUCxDQUFZLFNBQVosQ0FBWSxPQUFzQixDQUFBLElBQXRCLENBQXNCLE1BQXRCLENBQXNCLEVBQWxDLENBQUEsRUFDSDtBQUNHLGFBQUcsU0FBSCxDQUFRLElBQVI7QUFFQyxlQUFLLElBQUw7QUFDSixPQUxHLE1BT0E7QUFDQSxjQUFJLHlCQUFBLEtBQUEsSUFBQSxHQUFBLGlCQUFKO0FBQ0M7QUFDSjs7QUFJRSxXQUFBLElBQUE7QUFDRixHQWpxQkE7QUFxcUJDLEVBQUEsVUFBQSxFQUFBLHNCQUNEO0FBQ0MsUUFBQSxJQUFBLEVBQVcsSUFBWDs7QUFNQyxRQUFBLEtBQUEsU0FBQSxDQUFBLFNBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLENBQUEsRUFDRjtBQUNFLFdBQUcsU0FBSCxDQUFRLElBQVI7QUFFQyxNQUFBLElBQUksR0FBQyxLQUFBLGNBQUEsRUFBTDs7QUFFQSxVQUFBLEtBQU8sU0FBUCxDQUFZLFNBQVosQ0FBMEIsT0FBRyxDQUFBLElBQUgsQ0FBRyxNQUFILENBQUcsR0FBN0IsQ0FBQSxFQUNIO0FBQ0csYUFBRyxTQUFILENBQVEsSUFBUjtBQUVDLFFBQUEsSUFBSSxHQUFDLElBQUEsT0FBVSxDQUFJLElBQWQsQ0FBaUIsSUFBakIsQ0FBaUIsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsR0FBakIsRUFBaUIsT0FBakIsQ0FBTDtBQUVBLFFBQUEsSUFBSSxDQUFDLElBQUwsR0FBVyxJQUFYO0FBRUEsZUFBSyxJQUFMO0FBQ0osT0FURyxNQVdBO0FBQ0EsY0FBSSx5QkFBQSxLQUFBLElBQUEsR0FBQSxpQkFBSjtBQUNDO0FBQ0o7O0FBSUUsV0FBQSxJQUFBO0FBQ0YsR0F0c0JBO0FBMHNCQyxFQUFBLFdBQUEsRUFBQSx1QkFDRDtBQUNDLFFBQUEsSUFBQSxFQUFXLElBQVg7O0FBTUMsUUFBQSxLQUFBLFNBQUEsQ0FBQSxTQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLEVBQ0Y7QUFDRSxXQUFHLFNBQUgsQ0FBUSxJQUFSO0FBRUMsTUFBQSxJQUFJLEdBQUMsS0FBQSxjQUFBLEVBQUw7O0FBRUEsVUFBQSxLQUFPLFNBQVAsQ0FBWSxTQUFaLENBQTBCLE9BQUcsQ0FBQSxJQUFILENBQUcsTUFBSCxDQUFHLEdBQTdCLENBQUEsRUFDSDtBQUNHLGFBQUcsU0FBSCxDQUFRLElBQVI7QUFFQyxRQUFBLElBQUksR0FBQyxJQUFBLE9BQVUsQ0FBSSxJQUFkLENBQWlCLElBQWpCLENBQWlCLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEdBQWpCLEVBQWlCLFFBQWpCLENBQUw7QUFFQSxRQUFBLElBQUksQ0FBQyxJQUFMLEdBQVcsSUFBWDtBQUVBLGVBQUssSUFBTDtBQUNKLE9BVEcsTUFXQTtBQUNBLGNBQUkseUJBQUEsS0FBQSxJQUFBLEdBQUEsaUJBQUo7QUFDQztBQUNKOztBQUlFLFdBQUEsSUFBQTtBQUNGLEdBM3VCQTtBQSt1QkMsRUFBQSxXQUFBLEVBQUEscUJBQUEsUUFBQSxFQUNEO0FBQ0MsUUFBQSxJQUFBOztBQUVDLFFBQUcsS0FBSyxTQUFMLENBQU0sU0FBTixDQUFNLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEdBQU4sQ0FBSCxFQUNGO0FBQ0UsTUFBQSxJQUFHLEdBQUssSUFBQSxPQUFVLENBQUEsSUFBVixDQUFVLElBQVYsQ0FBb0IsQ0FBcEIsRUFBb0IsUUFBYSxHQUFBLFlBQVksS0FBQSxTQUFBLENBQUEsU0FBQSxFQUFaLEdBQVksS0FBQSxTQUFBLENBQUEsU0FBQSxFQUE3QyxDQUFSO0FBRUMsTUFBQSxJQUFJLENBQUMsQ0FBTCxHQUFPLElBQVA7QUFFQSxXQUFLLFNBQUwsQ0FBYyxJQUFkOztBQU1BLFVBQUEsS0FBQSxTQUFBLENBQUEsU0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUNIO0FBQ0csYUFBSyxTQUFMLENBQWEsSUFBYjtBQUVDLFFBQUEsSUFBSSxDQUFDLElBQUwsR0FBSyxLQUFVLGNBQVYsRUFBTDs7QUFFQSxZQUFBLEtBQUssU0FBTCxDQUFpQixTQUFqQixDQUFpQixPQUFpQixDQUFBLElBQWpCLENBQWlCLE1BQWpCLENBQWlCLEVBQWxDLENBQUEsRUFDSjtBQUNJLGVBQUcsU0FBSCxDQUFRLElBQVI7QUFFQyxVQUFBLElBQUksQ0FBQyxRQUFMLEdBQWUsT0FBTyxDQUFBLElBQVAsQ0FBTyxNQUFQLENBQU8sR0FBdEI7QUFDTCxTQUxJLE1BT0E7QUFDQSxnQkFBSSx5QkFBQSxLQUFBLElBQUEsR0FBQSxpQkFBSjtBQUNDO0FBQ0wsT0FoQkcsTUF1Qkg7QUFDRyxVQUFBLElBQUksQ0FBQSxRQUFKLEdBQUksUUFBQSxHQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsR0FDSCxPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxHQUREO0FBSUMsVUFBQSxJQUFDLENBQUEsSUFBRCxHQUFDLEVBQUQ7QUFDSjs7QUFJRyxhQUFBLElBQUE7QUFDSDs7QUFFRSxXQUFDLElBQUQ7QUFDRixHQXB5QkE7QUF3eUJDLEVBQUEsY0FBQSxFQUFBLDBCQUNEO0FBQ0MsUUFBQSxNQUFBLEdBQWdCLEVBQWhCOztBQUVDLFdBQU0sS0FBQSxTQUFBLENBQVksU0FBWixDQUFZLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEVBQVosTUFBWSxLQUFsQixFQUNGO0FBQ0UsV0FBTSxhQUFOLENBQW9CLE1BQXBCOztBQUVDLFVBQUEsS0FBSyxTQUFMLENBQWtCLFNBQWxCLENBQTJCLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEtBQTNCLE1BQTJCLElBQTNCLEVBQ0g7QUFDRyxhQUFHLFNBQUgsQ0FBUSxJQUFSO0FBQ0MsT0FIRCxNQUtBO0FBQ0E7QUFDQztBQUNKOztBQUVFLFdBQUMsTUFBRDtBQUNGLEdBM3pCQTtBQSt6QkMsRUFBQSxjQUFBLEVBQUEsMEJBQ0Q7QUFDQyxRQUFBLE1BQUEsR0FBZ0IsRUFBaEI7O0FBRUMsV0FBTSxLQUFBLFNBQUEsQ0FBWSxTQUFaLENBQVksT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsR0FBWixNQUFZLEtBQWxCLEVBQ0Y7QUFDRSxXQUFNLGFBQU4sQ0FBb0IsTUFBcEI7O0FBRUMsVUFBQSxLQUFLLFNBQUwsQ0FBa0IsU0FBbEIsQ0FBMkIsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsS0FBM0IsTUFBMkIsSUFBM0IsRUFDSDtBQUNHLGFBQUcsU0FBSCxDQUFRLElBQVI7QUFDQyxPQUhELE1BS0E7QUFDQTtBQUNDO0FBQ0o7O0FBRUUsV0FBQyxNQUFEO0FBQ0YsR0FsMUJBO0FBczFCQyxFQUFBLGFBQUEsRUFBQSx1QkFBQSxNQUFBLEVBQ0Q7QUFDQyxJQUFBLE1BQUEsQ0FBQSxJQUFBLENBQWEsS0FBRSxtQkFBRixFQUFiO0FBQ0MsR0F6MUJGO0FBNjFCQyxFQUFBLGFBQUEsRUFBQSx1QkFBQSxNQUFBLEVBQ0Q7QUFDQyxRQUFBLEtBQUEsU0FBQSxDQUFlLFNBQWYsQ0FBd0IsT0FBTyxDQUFBLElBQVAsQ0FBTyxNQUFQLENBQU8sUUFBL0IsQ0FBQSxFQUNDO0FBQ0EsVUFBTyxHQUFDLEdBQUEsS0FBVSxTQUFWLENBQW9CLFNBQXBCLEVBQVI7QUFDQyxXQUFBLFNBQUEsQ0FBQSxJQUFBOztBQUVBLFVBQUEsS0FBSyxTQUFMLENBQWUsU0FBZixDQUFzQixPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxLQUF0QixDQUFBLEVBQ0g7QUFFSSxhQUFBLFNBQUEsQ0FBQSxJQUFBO0FBSUEsUUFBQSxNQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsS0FBQSxtQkFBQSxFQUFBO0FBR0osT0FWRyxNQVlBO0FBQ0EsY0FBSSx5QkFBQSxLQUFBLElBQUEsR0FBQSxpQkFBSjtBQUNDO0FBQ0osS0FwQkMsTUFzQkM7QUFDQSxZQUFJLHlCQUFBLEtBQUEsSUFBQSxHQUFBLHNCQUFKO0FBQ0M7QUFDSCxHQXgzQkE7QUE0M0JDLEVBQUEsYUFBQSxFQUFBLHlCQUNEO0FBQ0MsUUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFlLElBQWY7O0FBTUMsUUFBQSxLQUFBLFNBQUEsQ0FBQSxTQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsUUFBQSxDQUFBLEVBQ0Y7QUFDRSxNQUFBLElBQUcsR0FBSyxJQUFBLE9BQVUsQ0FBQSxJQUFWLENBQVUsSUFBVixDQUFvQixLQUFPLFNBQVAsQ0FBYSxRQUFiLEVBQXBCLEVBQWdELEtBQUUsU0FBRixDQUFFLFNBQUYsRUFBaEQsQ0FBUjtBQUNDLFdBQUEsU0FBQSxDQUFBLElBQUE7O0FBRUEsVUFBQSxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXNCLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEtBQXRCLENBQUEsRUFDSDtBQUNHLFFBQUEsSUFBRyxHQUFLLElBQUEsT0FBVSxDQUFBLElBQVYsQ0FBVSxJQUFWLENBQW9CLEtBQU8sU0FBUCxDQUFhLFFBQWIsRUFBcEIsRUFBK0MsS0FBQSxTQUFBLENBQUEsU0FBQSxFQUEvQyxDQUFSO0FBQ0MsYUFBQSxTQUFBLENBQUEsSUFBQTs7QUFFQSxZQUFBLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBc0IsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsUUFBdEIsQ0FBQSxFQUNKO0FBQ0ksVUFBQSxLQUFHLEdBQUssSUFBQSxPQUFVLENBQUEsSUFBVixDQUFVLElBQVYsQ0FBb0IsS0FBUSxTQUFSLENBQWEsUUFBYixFQUFwQixFQUFrRCxLQUFBLFNBQUEsQ0FBQSxTQUFBLEVBQWxELENBQVI7QUFDQyxlQUFBLFNBQUEsQ0FBQSxJQUFBO0FBRUEsVUFBQSxJQUFJLENBQUMsUUFBTCxHQUFlLElBQWY7QUFDTCxVQUFBLElBQUEsQ0FBQSxTQUFBLEdBQUEsS0FBQTtBQUVLLGlCQUFLLElBQUw7QUFDTDtBQUNBLE9BZkcsTUFpQkE7QUFDQSxlQUFJLElBQUo7QUFDQztBQUNKOztBQUlFLFdBQUEsSUFBQTtBQUNGO0FBbDZCQSxDQUFBOztBQTI2QkEsT0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEdBQUEsVUFBQSxRQUFBLEVBQUEsU0FBQSxFQUFBO0FBRUEsT0FBQSxLQUFBLENBQVksUUFBWixFQUFvQixTQUFwQjtBQUNBLENBSEE7O0FBT0EsT0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsU0FBQSxHQUFBO0FBR0MsRUFBQSxLQUFBLEVBQUEsZUFBQSxRQUFBLEVBQUEsU0FBQSxFQUNEO0FBQ0UsU0FBSyxRQUFMLEdBQWUsUUFBZjtBQUNBLFNBQUEsU0FBQSxHQUFBLFNBQUE7QUFDQSxTQUFLLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxTQUFLLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxTQUFLLElBQUwsR0FBSyxJQUFMO0FBQ0EsU0FBSyxJQUFMLEdBQUssSUFBTDtBQUNBLEdBWEY7QUFlQyxFQUFBLEtBQUEsRUFBQSxlQUFBLEtBQUEsRUFBQSxLQUFBLEVBQUEsSUFBQSxFQUNEO0FBQ0MsUUFBSyxHQUFMO0FBRUMsUUFBSSxHQUFJLEdBQUEsSUFBQSxDQUFBLENBQUEsQ0FBUjtBQUVBLElBQUEsS0FBSyxDQUFDLElBQU4sQ0FBVyxXQUFTLEdBQVQsR0FBUyxXQUFULEdBQVMsS0FBQSxTQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsRUFBQSxLQUFBLENBQVQsR0FBUyxLQUFwQjs7QUFFQSxRQUFBLEtBQU0sUUFBTixFQUNGO0FBQ0UsTUFBQSxHQUFHLEdBQUksRUFBQyxJQUFBLENBQUEsQ0FBQSxDQUFSO0FBQ0MsTUFBQSxLQUFBLENBQUEsSUFBQSxDQUFBLFdBQUEsR0FBQSxHQUFBLFVBQUEsR0FBQSxHQUFBLEdBQUEsR0FBQTs7QUFDQSxXQUFLLFFBQUwsQ0FBYyxLQUFkLENBQWdCLEtBQWhCLEVBQWdCLEtBQWhCLEVBQWdCLElBQWhCO0FBQ0E7O0FBRUQsUUFBQyxLQUFBLFNBQUQsRUFDRjtBQUNFLE1BQUEsR0FBRyxHQUFJLEVBQUMsSUFBQSxDQUFBLENBQUEsQ0FBUjtBQUNDLE1BQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBLEdBQUEsR0FBQSxVQUFBLEdBQUEsR0FBQSxHQUFBLEdBQUE7O0FBQ0EsV0FBSyxTQUFMLENBQWMsS0FBZCxDQUFnQixLQUFoQixFQUFnQixLQUFoQixFQUFnQixJQUFoQjtBQUNBOztBQUVELFFBQUMsS0FBQSxJQUFELEVBQ0Y7QUFDRSxXQUFHLElBQUssQ0FBUixJQUFhLEtBQUEsSUFBYixFQUNDO0FBQ0EsUUFBQSxHQUFJLEdBQUEsRUFBSyxJQUFHLENBQUUsQ0FBRixDQUFaO0FBQ0MsUUFBQSxLQUFBLENBQUEsSUFBQSxDQUFBLFdBQUEsR0FBQSxHQUFBLFVBQUEsR0FBQSxHQUFBLEdBQUEsWUFBQSxHQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxFQUFBLEtBQUEsQ0FBQSxHQUFBLE1BQUE7O0FBQ0EsYUFBSyxJQUFMLENBQVEsQ0FBUixFQUFhLEtBQWIsQ0FBZ0IsS0FBaEIsRUFBZ0IsS0FBaEIsRUFBZ0IsSUFBaEI7QUFDQTtBQUNKOztBQUVFLFFBQUMsS0FBQSxJQUFELEVBQ0Y7QUFDRSxXQUFHLElBQUssRUFBUixJQUFhLEtBQUEsSUFBYixFQUNDO0FBQ0EsUUFBQSxHQUFJLEdBQUEsRUFBSyxJQUFHLENBQUUsQ0FBRixDQUFaO0FBQ0MsUUFBQSxLQUFBLENBQUEsSUFBQSxDQUFBLFdBQUEsR0FBQSxHQUFBLFVBQUEsR0FBQSxHQUFBLEdBQUEsWUFBQSxHQUFBLEVBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxFQUFBLEtBQUEsQ0FBQSxHQUFBLE1BQUE7O0FBQ0EsYUFBSyxJQUFMLENBQVEsRUFBUixFQUFhLEtBQWIsQ0FBZ0IsS0FBaEIsRUFBZ0IsS0FBaEIsRUFBZ0IsSUFBaEI7QUFDQTtBQUNKO0FBQ0EsR0F4REE7QUE0REMsRUFBQSxJQUFBLEVBQUEsZ0JBQ0Q7QUFDQyxRQUFNLEtBQUEsR0FBUSxFQUFkO0FBQ0MsUUFBQSxLQUFBLEdBQUEsRUFBQTs7QUFFQSxTQUFLLEtBQUwsQ0FBVyxLQUFYLEVBQWlCLEtBQWpCLEVBQWlCLENBQUEsQ0FBQSxDQUFqQjs7QUFFQSxXQUFLLG1DQUF5QixLQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBekIsR0FBeUIsSUFBekIsR0FBeUIsS0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQXpCLEdBQXlCLEtBQTlCO0FBQ0Y7QUFwRUEsQ0FBQTtBQ3B2Q0EsT0FBQSxDQUFBLElBQUEsR0FBQSxFQUFBOztBQU1BLE9BQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxHQUFBLFVBQUEsSUFBQSxFQUFBO0FBRUEsT0FBQSxLQUFBLENBQVksSUFBWjtBQUNBLENBSEE7O0FBT0EsT0FBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLENBQUEsU0FBQSxHQUFBO0FBR0MsRUFBQSxZQUFBLEVBQUEsd0NBSEQ7QUFLQyxFQUFBLFVBQUEsRUFBWSwyQkFMYjtBQVNDLEVBQUEsTUFBQSxFQUFBLGdCQUFBLENBQUEsRUFDRDtBQUNDLFFBQUEsTUFBUSxHQUFBLENBQVI7QUFFQyxRQUFJLENBQUEsR0FBTSxDQUFDLENBQUMsTUFBWjs7QUFFQSxTQUFBLElBQVEsQ0FBQyxHQUFHLENBQVosRUFBWSxDQUFBLEdBQU8sQ0FBbkIsRUFBbUIsQ0FBQSxFQUFuQixFQUNGO0FBQ0UsVUFBSSxDQUFBLENBQUEsQ0FBQSxDQUFBLEtBQVMsSUFBYixFQUFtQixNQUFJO0FBQ3RCOztBQUVELFdBQUMsTUFBRDtBQUNGLEdBckJBO0FBeUJDLEVBQUEsS0FBQSxFQUFBLGVBQUEsSUFBQSxFQUNEO0FBR0UsUUFBQSxJQUFBLEdBQUEsQ0FBQTtBQUVBLFFBQUksTUFBSjtBQUNGLFFBQUEsTUFBQTtBQUlFLFNBQUEsUUFBQSxHQUFBO0FBQ0YsTUFBQSxJQUFBLEVBQUEsSUFERTtBQUVBLE1BQUEsT0FBSyxFQUFBLE9BRkw7QUFHQyxNQUFBLFVBQVUsRUFBQyxFQUhaO0FBSUMsTUFBQSxNQUFBLEVBQVEsQ0FBQztBQUNULFFBQUEsVUFBVyxFQUFDLE9BREg7QUFFVCxRQUFBLElBQUEsRUFBTztBQUZFLE9BQUQsQ0FKVDtBQVFGLE1BQUEsS0FBUSxFQUFFO0FBUlIsS0FBQTtBQWFBLFFBQUEsTUFBQSxHQUFBLENBQUEsS0FBQSxRQUFBLENBQUE7QUFDRixRQUFBLE1BQUEsR0FBQSxDQUFBLGFBQUEsQ0FBQTtBQUVFLFFBQUEsSUFBQTs7QUFJQSxTQUFBLElBQUEsR0FBQSxJQUFBLENBQUEsT0FBQSxDQUFBLEtBQUEsVUFBQSxFQUFBLEVBQUEsQ0FBQSxHQUFBLElBQUEsR0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxFQUNGO0FBR0csVUFBQSxJQUFBLEdBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBO0FBQ0gsVUFBQSxJQUFBLEdBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBO0FBSUcsVUFBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLEtBQUEsQ0FBQSxLQUFBLFlBQUEsQ0FBQTs7QUFJQSxVQUFBLENBQUEsS0FBQSxJQUFBLEVBQ0g7QUFHSSxRQUFBLElBQUEsSUFBQSxLQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUE7QUFJQSxRQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsQ0FBQSxJQUFBLENBQUE7QUFDSixVQUFBLElBQUEsRUFBQSxJQURJO0FBRUEsVUFBQSxPQUFLLEVBQUEsT0FGTDtBQUdDLFVBQUEsVUFBVSxFQUFDLEVBSFo7QUFJQyxVQUFBLE1BQUEsRUFBUSxFQUpUO0FBS0MsVUFBQSxLQUFBLEVBQUE7QUFMRCxTQUFBO0FBVUEsWUFBQSxNQUFBLEdBQUEsRUFBQTs7QUFFQSxhQUFBLElBQU0sQ0FBQSxHQUFNLE1BQU0sQ0FBQSxNQUFOLEdBQU0sQ0FBbEIsRUFBa0IsQ0FBQSxHQUFBLENBQWxCLEVBQWtCLENBQUEsRUFBbEIsRUFDSjtBQUNRLGNBQUssTUFBRyxDQUFBLENBQUEsQ0FBSCxDQUFVLE9BQVYsS0FBc0IsSUFBM0IsRUFDSDtBQUNBLFlBQUEsTUFBTyxDQUFDLElBQVIsQ0FBUSx5QkFBUjtBQUNDLFdBSEUsTUFJRixJQUFPLE1BQU0sQ0FBQSxDQUFBLENBQU4sQ0FBTSxPQUFOLEtBQXNCLEtBQTdCLEVBQ0Q7QUFDQSxZQUFBLE1BQVEsQ0FBQSxJQUFSLENBQWMsMEJBQWQ7QUFDQztBQUNOOztBQUVJLFlBQUMsTUFBQSxDQUFBLE1BQUEsR0FBQSxDQUFELEVBQ0o7QUFDSSxnQkFBRyx5QkFBa0IsSUFBbEIsR0FBa0IsS0FBbEIsR0FBa0IsTUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQXJCO0FBQ0M7O0FBSUQ7QUFDSjs7QUFJRyxVQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0gsVUFBQSxPQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtBQUNHLFVBQU0sVUFBVSxHQUFHLENBQUEsQ0FBQSxDQUFBLENBQW5CO0FBRUEsTUFBQSxNQUFNLEdBQUEsQ0FBQSxDQUFBLEtBQUEsR0FBYSxZQUFuQjtBQUNILE1BQUEsTUFBQSxHQUFBLENBQUEsQ0FBQSxLQUFBLEdBQUEsS0FBQSxDQUFBLE1BQUE7QUFFRyxVQUFNLEtBQUssR0FBQSxJQUFPLENBQUMsTUFBUixDQUFjLENBQWQsRUFBYyxNQUFkLENBQVg7QUFDSCxVQUFBLEtBQUEsR0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsRUFBQSxNQUFBLENBQUE7QUFJRyxNQUFBLElBQUEsSUFBQSxLQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUE7O0FBSUEsVUFBQSxLQUFBLEVBQ0g7QUFDRyxRQUFBLElBQUcsR0FBSztBQUNQLFVBQUEsSUFBQSxFQUFBLElBRE87QUFFUCxVQUFBLE9BQVEsRUFBQSxPQUZEO0FBR04sVUFBQSxVQUFVLEVBQUMsRUFITDtBQUlOLFVBQUEsTUFBQSxFQUFRLEVBSkY7QUFLTixVQUFBLEtBQUEsRUFBQTtBQUxNLFNBQVI7QUFRQyxRQUFBLElBQUMsQ0FBQSxNQUFELENBQUMsSUFBRCxFQUFDLElBQUQsQ0FBQyxJQUFELENBQUMsSUFBRDtBQUNKOztBQUlHLGNBQUEsT0FBQTtBQUlDLGFBQUEsT0FBQTtBQUNKLGFBQUEsWUFBQTtBQUNJLGFBQUssV0FBTDtBQUNBLGFBQUssVUFBTDtBQUlDOztBQUlELGFBQUEsSUFBQTtBQUNKLGFBQUEsS0FBQTtBQUNJLGFBQUssU0FBTDtBQUVBLFVBQUEsSUFBSyxHQUFDO0FBQ1YsWUFBQSxJQUFBLEVBQUEsSUFEVTtBQUVMLFlBQUEsT0FBUSxFQUFBLE9BRkg7QUFHSixZQUFBLFVBQVUsRUFBQyxVQUhQO0FBSUosWUFBQSxNQUFBLEVBQVEsRUFKSjtBQUtKLFlBQUEsS0FBQSxFQUFBO0FBTEksV0FBTjtBQVFDLFVBQUEsSUFBRSxDQUFBLE1BQUYsQ0FBRSxJQUFGLEVBQUUsSUFBRixDQUFFLElBQUYsQ0FBRSxJQUFGO0FBRUE7O0FBSUQsYUFBQSxJQUFBO0FBQ0osYUFBQSxLQUFBO0FBRUksVUFBQSxJQUFLLEdBQUM7QUFDVixZQUFBLElBQUEsRUFBQSxJQURVO0FBRUwsWUFBQSxPQUFRLEVBQUEsT0FGSDtBQUdKLFlBQUEsTUFBTSxFQUFBLENBQUE7QUFDTixjQUFBLFVBQVMsRUFBQSxVQURIO0FBRU4sY0FBQSxJQUFBLEVBQU87QUFGRCxhQUFBLENBSEY7QUFPVixZQUFBLEtBQVcsRUFBRTtBQVBILFdBQU47QUFVQyxVQUFBLElBQUUsQ0FBQSxNQUFGLENBQUUsSUFBRixFQUFFLElBQUYsQ0FBRSxJQUFGLENBQUUsSUFBRjtBQUVBLFVBQUEsTUFBSyxDQUFBLElBQUwsQ0FBWSxJQUFaO0FBQ0wsVUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLElBQUE7QUFFSzs7QUFJRCxhQUFBLFFBQUE7QUFFQSxjQUFJLElBQUUsQ0FBQSxTQUFBLENBQUYsS0FBVSxJQUFkLEVBQ0o7QUFDSyxrQkFBTyx5QkFBcUIsSUFBckIsR0FBcUIsZ0NBQTVCO0FBQ0M7O0FBRUQsVUFBQSxJQUFDLEdBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxNQUFEO0FBRUEsVUFBQSxJQUFJLENBQUMsTUFBTCxDQUFZLElBQVosQ0FBWTtBQUNqQixZQUFBLFVBQUEsRUFBQSxVQURpQjtBQUVaLFlBQUEsSUFBSyxFQUFBO0FBRk8sV0FBWjtBQUtBLFVBQUEsTUFBRyxDQUFBLE1BQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFILEdBQUcsSUFBSDtBQUVBOztBQUlELGFBQUEsTUFBQTtBQUVBLGNBQUksSUFBRSxDQUFBLFNBQUEsQ0FBRixLQUFRLElBQVIsSUFFQSxJQUFJLENBQUEsU0FBQSxDQUFKLEtBQW9CLEtBRnhCLEVBR0k7QUFDUixrQkFBWSx5QkFBcUIsSUFBckIsR0FBcUIsOEJBQWpDO0FBQ007O0FBRUQsVUFBQSxJQUFDLEdBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxNQUFEO0FBRUEsVUFBQSxJQUFJLENBQUMsTUFBTCxDQUFZLElBQVosQ0FBWTtBQUNqQixZQUFBLFVBQUEsRUFBQSxPQURpQjtBQUVaLFlBQUEsSUFBSyxFQUFBO0FBRk8sV0FBWjtBQUtBLFVBQUEsTUFBRyxDQUFBLE1BQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFILEdBQUcsSUFBSDtBQUVBOztBQUlELGFBQUEsT0FBQTtBQUVBLGNBQUksSUFBRSxDQUFBLFNBQUEsQ0FBRixLQUFTLElBQWIsRUFDSjtBQUNLLGtCQUFPLHlCQUFxQixJQUFyQixHQUFxQiwrQkFBNUI7QUFDQzs7QUFFRCxVQUFBLE1BQUMsQ0FBQSxHQUFEO0FBQ0wsVUFBQSxNQUFBLENBQUEsR0FBQTtBQUVLOztBQUlELGFBQUEsUUFBQTtBQUVBLGNBQUksSUFBRSxDQUFBLFNBQUEsQ0FBRixLQUFVLEtBQWQsRUFDSjtBQUNLLGtCQUFPLHlCQUFzQixJQUF0QixHQUFzQixnQ0FBN0I7QUFDQzs7QUFFRCxVQUFBLE1BQUMsQ0FBQSxHQUFEO0FBQ0wsVUFBQSxNQUFBLENBQUEsR0FBQTtBQUVLOztBQUlEO0FBRUEsZ0JBQU8seUJBQUMsSUFBRCxHQUFDLHNCQUFELEdBQUMsT0FBRCxHQUFDLEdBQVI7QUEvSEQ7QUFxSUg7QUFHQSxHQXhSQTtBQTRSQyxFQUFBLElBQUEsRUFBQSxnQkFDRDtBQUNDLFdBQU0sSUFBQSxDQUFBLFNBQUEsQ0FBVSxLQUFBLFFBQVYsRUFBVSxJQUFWLEVBQVUsQ0FBVixDQUFOO0FBQ0M7QUEvUkYsQ0FBQTtBQ2JBLE9BQUEsQ0FBQSxNQUFBLEdBQUE7QUFHQyxFQUFBLFdBQUEsRUFBQSxzQkFIRDtBQU9DLEVBQUEsT0FBQSxFQUFBLGlCQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLEtBQUEsRUFDRDtBQUFBOztBQUFBLFFBREMsSUFDRDtBQURDLE1BQUEsSUFDRCxHQURDLEVBQ0Q7QUFBQTs7QUFBQSxRQURDLEtBQ0Q7QUFEQyxNQUFBLEtBQ0QsR0FEQyxFQUNEO0FBQUE7O0FBQ0MsUUFBQSxDQUFBO0FBRUMsUUFBSSxVQUFKO0FBRUEsU0FBSSxJQUFKLEdBQUksSUFBSjtBQUNGLFNBQUEsS0FBQSxHQUFBLEtBQUE7O0FBRUUsWUFBSyxJQUFNLENBQUMsT0FBWjtBQU1DLFdBQUEsSUFBQTtBQUNIO0FBR0ksVUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLFVBQUEsRUFBQSxJQUFBLENBQUEsSUFBQSxFQUFBLElBQUE7QUFJQTtBQUNKOztBQU1HLFdBQUEsS0FBQTtBQUNIO0FBR0ksVUFBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLFVBQUEsQ0FBQSxLQUFBLENBQUEsdUNBQUEsQ0FBQTs7QUFFQSxjQUFHLENBQUMsQ0FBSixFQUNKO0FBQ0ksa0JBQU0seUJBQUEsSUFBQSxDQUFBLElBQUEsR0FBQSw0QkFBTjtBQUNDOztBQUlELFVBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsSUFBQSxDQUFBLElBQUEsRUFBQSxJQUFBLENBQUE7QUFJQTtBQUNKOztBQU1HLFdBQUEsT0FBQTtBQUNIO0FBR0ksVUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLENBQUEsT0FBQSxDQUFBLEtBQUEsV0FBQSxFQUFBLFVBQUEsS0FBQSxFQUFBLFVBQUEsRUFBQTtBQUVBLGdCQUFBLEtBQU8sR0FBSyxPQUFLLENBQUEsSUFBTCxDQUFXLEtBQVgsQ0FBbUIsSUFBbkIsQ0FBd0IsVUFBeEIsRUFBcUMsSUFBQSxDQUFBLElBQXJDLEVBQThDLElBQTlDLENBQVo7QUFFQyxtQkFBSSxLQUFRLEtBQUEsSUFBUixJQUFxQixLQUFLLEtBQUssU0FBL0IsR0FBMkMsS0FBM0MsR0FBaUQsRUFBckQ7QUFDTCxXQUxJLENBQUE7QUFTQTtBQUNKOztBQU1HLFdBQUEsSUFBQTtBQUNILFdBQUEsT0FBQTtBQUNHO0FBR0MsVUFBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxVQUFBLEtBQUEsRUFBQTtBQUVBLFlBQUEsVUFBVyxHQUFDLEtBQU8sQ0FBQSxVQUFuQjs7QUFFQyxnQkFBQSxVQUFhLEtBQUssT0FBbEIsSUFBNkIsT0FBQyxDQUFBLElBQUQsQ0FBQyxLQUFELENBQUMsSUFBRCxDQUFDLFVBQUQsRUFBQyxJQUFBLENBQUEsSUFBRCxFQUFDLElBQUQsQ0FBN0IsRUFDTDtBQUNLLGNBQUEsS0FBRyxDQUFBLElBQUgsQ0FBRyxPQUFILENBQW9CLFVBQUEsSUFBQSxFQUFTO0FBRTVCLGdCQUFBLEtBQUssQ0FBQyxPQUFOLENBQVcsTUFBWCxFQUFvQixJQUFwQixFQUE0QixJQUE1QixFQUE4QixLQUE5QjtBQUNOLGVBSEs7QUFLQyxxQkFBRyxLQUFIO0FBQ047O0FBRUssbUJBQUMsSUFBRDtBQUNMLFdBZkk7QUFtQkE7QUFDSjs7QUFNRyxXQUFBLEtBQUE7QUFDSDtBQUdJLGNBQUEsSUFBQTtBQUNKLGNBQUEsSUFBQTtBQUNJLGNBQUksSUFBSjtBQUVBLFVBQUEsQ0FBQSxHQUFJLElBQUksQ0FBQyxNQUFMLENBQUssQ0FBTCxFQUFLLFVBQUwsQ0FBSyxLQUFMLENBQUsseUVBQUwsQ0FBSjs7QUFFQSxjQUFHLENBQUMsQ0FBSixFQUNKO0FBQ0ksWUFBQSxDQUFFLEdBQUcsSUFBQyxDQUFBLE1BQUQsQ0FBQyxDQUFELEVBQUMsVUFBRCxDQUFDLEtBQUQsQ0FBQyx3Q0FBRCxDQUFMOztBQUVDLGdCQUFHLENBQUMsQ0FBSixFQUNMO0FBQ0ssb0JBQU0seUJBQUEsSUFBQSxDQUFBLElBQUEsR0FBQSw0QkFBTjtBQUNDLGFBSEQsTUFLQTtBQUNBLGNBQUEsSUFBSSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUo7QUFDQyxjQUFBLElBQUEsR0FBQSxJQUFBO0FBQ0EsY0FBQSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUQsQ0FBUjtBQUNBO0FBQ04sV0FkSSxNQWdCQTtBQUNBLFlBQUEsSUFBSSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUo7QUFDQyxZQUFBLElBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsWUFBQSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUQsQ0FBUjtBQUNBOztBQUlELGNBQUEsU0FBQSxHQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxDQUFBLElBQUEsRUFBQSxJQUFBLENBQUE7QUFFQSxjQUFNLFFBQUEsR0FBVyxNQUFDLENBQUEsU0FBRCxDQUFjLFFBQWQsQ0FBeUIsSUFBekIsQ0FBK0IsU0FBL0IsQ0FBakI7QUFJQSxjQUFBLFNBQUE7O0FBRUEsY0FBRyxRQUFDLEtBQVUsaUJBQWQsRUFDSjtBQUNJLFlBQUEsU0FBRyxHQUFTLElBQUksR0FBRSxNQUFPLENBQUEsT0FBUCxDQUFnQixTQUFoQixDQUFGLEdBQ2YsTUFBQSxDQUFBLElBQUEsQ0FBQSxTQUFBLENBREQ7QUFHSixXQUxJLE1BT0E7QUFDQSxZQUFBLFNBQUksR0FBQSxTQUFKOztBQUVDLGdCQUFBLFFBQVcsS0FBQyxnQkFBWixJQUVHLFFBQVEsS0FBSyxpQkFGaEIsRUFHRztBQUNSLG9CQUFRLHlCQUE0QixJQUFFLENBQUEsSUFBOUIsR0FBOEIsZ0NBQXRDO0FBQ007O0FBRUQsZ0JBQUMsSUFBRCxFQUNMO0FBQ0ssb0JBQU8seUJBQUMsSUFBQSxDQUFBLElBQUQsR0FBQyxpQ0FBUjtBQUNDO0FBQ047O0FBSUksY0FBQSxDQUFBLEdBQUEsU0FBQSxDQUFBLE1BQUE7O0FBRUEsY0FBQSxDQUFBLEdBQU8sQ0FBUCxFQUNKO0FBQ0ksZ0JBQUssQ0FBQyxHQUFHLGdCQUFUO0FBRUMsZ0JBQU0sSUFBRSxHQUFBLElBQUEsQ0FBQSxNQUFBLENBQWlCLENBQWpCLEVBQWlCLElBQXpCOztBQUVBLGdCQUFBLElBQUEsRUFDTDtBQUdNLGtCQUFBLElBQUEsR0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBO0FBQ04sa0JBQUEsSUFBQSxHQUFBLElBQUEsQ0FBQSxJQUFBLENBQUE7QUFDTSxrQkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFBLE1BQUEsQ0FBakI7QUFJQSxjQUFBLElBQUEsQ0FBQSxJQUFBLEdBQUE7QUFBQSxnQkFBQSxNQUFBLEVBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUEsRUFBQSxJQUFBLENBQUEsTUFBQTtBQUFBLGVBQUE7O0FBSUEsbUVBQUEsU0FBQSx3Q0FDTjtBQUFBO0FBQUEsb0JBRE0sR0FDTjtBQUFBLG9CQURNLEdBQ047QUFDTSxnQkFBQSxJQUFJLENBQUEsSUFBQSxDQUFKLEdBQWMsR0FBZDtBQUNDLGdCQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxHQUFBO0FBRUEsZ0JBQUEsSUFBSSxDQUFDLElBQUwsQ0FBVSxLQUFWLEdBQWlCLENBQUEsS0FBQSxJQUFBLENBQWpCO0FBQ1AsZ0JBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUEsR0FBQSxDQUFBO0FBRU8sZ0JBQUEsSUFBSSxDQUFDLElBQUwsQ0FBVSxTQUFWLEdBQW9CLENBQUcsR0FBRyxDQUExQjtBQUNQLGdCQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxHQUFBLENBQUE7QUFDTyxnQkFBQSxDQUFBO0FBQ0EsZ0JBQUEsSUFBSSxDQUFDLElBQUwsQ0FBVSxRQUFWLEdBQXFCLENBQUEsR0FBQSxDQUFyQjtBQUNBLGdCQUFBLElBQUksQ0FBQSxJQUFKLENBQUksS0FBSixHQUFJLENBQUo7O0FBRUEscUJBQUksSUFBTSxDQUFWLElBQWUsSUFBZixFQUNQO0FBQ08sdUJBQUksT0FBSixDQUFjLE1BQWQsRUFBb0IsSUFBQSxDQUFBLENBQUEsQ0FBcEIsRUFBb0IsSUFBcEIsRUFBb0IsS0FBcEI7QUFDQztBQUNSOztBQUlNLGNBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLElBQUE7QUFDTixjQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxJQUFBO0FBQ00sY0FBQSxJQUFJLENBQUUsSUFBRixDQUFKLEdBQWUsSUFBZjtBQUdOLGFBekNLLE1BMkNBO0FBR0Msa0JBQUEsSUFBQSxHQUFBLElBQUEsQ0FBQSxJQUFBLENBQUE7QUFDTixrQkFBQSxLQUFBLEdBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQTtBQUlNLGNBQUEsSUFBQSxDQUFBLElBQUEsR0FBQTtBQUFBLGdCQUFBLE1BQUEsRUFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQSxFQUFBLElBQUEsQ0FBQSxNQUFBO0FBQUEsZUFBQTs7QUFJQSxvRUFBQSxTQUFBLDJDQUNOO0FBQUEsb0JBRE0sSUFDTjtBQUNNLGdCQUFBLElBQUksQ0FBQSxJQUFBLENBQUosR0FBYyxJQUFkO0FBRUMsZ0JBQUEsSUFBSSxDQUFDLElBQUwsQ0FBVSxLQUFWLEdBQWlCLENBQUEsS0FBQSxJQUFBLENBQWpCO0FBQ1AsZ0JBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUEsR0FBQSxDQUFBO0FBRU8sZ0JBQUEsSUFBSSxDQUFDLElBQUwsQ0FBVSxTQUFWLEdBQW9CLENBQUcsR0FBRyxDQUExQjtBQUNQLGdCQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxHQUFBLENBQUE7QUFDTyxnQkFBQSxDQUFBO0FBQ0EsZ0JBQUEsSUFBSSxDQUFDLElBQUwsQ0FBVSxRQUFWLEdBQXFCLENBQUEsR0FBQSxDQUFyQjtBQUNBLGdCQUFBLElBQUksQ0FBQSxJQUFKLENBQUksS0FBSixHQUFJLENBQUo7O0FBRUEscUJBQUksSUFBTSxFQUFWLElBQWUsSUFBZixFQUNQO0FBQ08sdUJBQUksT0FBSixDQUFjLE1BQWQsRUFBb0IsSUFBQSxDQUFBLEVBQUEsQ0FBcEIsRUFBb0IsSUFBcEIsRUFBb0IsS0FBcEI7QUFDQztBQUNSOztBQUlNLGNBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLEtBQUE7QUFDTixjQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxJQUFBO0FBR0E7QUFDQSxXQXZGSSxNQXlGQTtBQUNBLGdCQUFJLElBQUEsQ0FBQSxNQUFBLENBQUEsTUFBQSxHQUFBLENBQUosRUFDQztBQUNBLGtCQUFPLEtBQUMsR0FBTSxJQUFDLENBQUEsTUFBRCxDQUFZLENBQVosRUFBWSxJQUExQjs7QUFFQyxtQkFBQSxJQUFVLEdBQVYsSUFBYSxLQUFiLEVBQ047QUFDTSxxQkFBSSxPQUFKLENBQWMsTUFBZCxFQUFvQixLQUFBLENBQUEsR0FBQSxDQUFwQixFQUFvQixJQUFwQixFQUFvQixLQUFwQjtBQUNDO0FBQ1A7QUFDQTs7QUFJSTtBQUNKOztBQU1HLFdBQUEsU0FBQTtBQUNIO0FBR0ksY0FBQSxJQUFBLEdBQUEsSUFBQSxDQUFBLFVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLFlBQUE7O0FBRUksY0FBSyxDQUFDLEdBQUMsSUFBSyxDQUFBLEtBQUwsQ0FBSyw0QkFBTCxDQUFQLEVBQ1I7QUFDSSxZQUFBLFVBQVcsR0FBRSxDQUFBLENBQUEsQ0FBQSxDQUFiO0FBQ0MsWUFBQSxZQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtBQUNBLFlBQUEsWUFBWSxHQUFHLEtBQWY7QUFDQSxXQUxHLE1BTUgsSUFBQSxDQUFBLEdBQVksSUFBRyxDQUFBLEtBQUgsQ0FBUyxxQkFBVCxDQUFaLEVBQ0Q7QUFDQSxZQUFBLFVBQVcsR0FBRSxDQUFBLENBQUEsQ0FBQSxDQUFiO0FBQ0MsWUFBQSxZQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtBQUNBLFlBQUEsWUFBWSxHQUFHLElBQWY7QUFDQSxXQUxBLE1BTUEsSUFBQSxDQUFBLEdBQVksSUFBRyxDQUFBLEtBQUgsQ0FBUSxjQUFSLENBQVosRUFDRDtBQUNBLFlBQUEsVUFBVyxHQUFFLENBQUEsQ0FBQSxDQUFBLENBQWI7QUFDQyxZQUFBLFlBQUEsR0FBQSxJQUFBO0FBQ0EsWUFBQSxZQUFZLEdBQUcsS0FBZjtBQUNBLFdBTEEsTUFPRDtBQUNBLFlBQUEsVUFBSSxHQUFBLElBQUo7QUFDQyxZQUFBLFlBQUEsR0FBQSxJQUFBO0FBQ0EsWUFBQSxZQUFZLEdBQUMsSUFBYjtBQUNBOztBQUlELGNBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxVQUFBLEVBQUEsSUFBQSxDQUFBLElBQUEsRUFBQSxJQUFBLEtBQUEsRUFBQTs7QUFFQSxjQUFBLE1BQU0sQ0FBQSxTQUFOLENBQWlCLFFBQWpCLENBQTZCLElBQTdCLENBQThCLFFBQTlCLE1BQXlDLGlCQUF6QyxFQUNKO0FBQ0ksa0JBQUcsMEJBQThCLElBQUMsQ0FBQSxJQUEvQixHQUF5QyxvQkFBNUM7QUFDQzs7QUFJRCxjQUFBLFNBQUEsR0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxFQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxLQUFBLEVBQUE7O0FBRUEsY0FBQSxNQUFNLENBQUEsU0FBTixDQUFrQixRQUFsQixDQUEwQixJQUExQixDQUErQixTQUEvQixNQUEwQyxpQkFBMUMsRUFDSjtBQUNJLGtCQUFHLDBCQUE4QixJQUFDLENBQUEsSUFBL0IsR0FBMEMsb0JBQTdDO0FBQ0M7O0FBSUQsVUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsT0FBQSxDQUNKLFFBREksRUFFQSxTQUZBLEVBR0MsWUFIRCxFQUlDLEtBSkQsQ0FBQTtBQVNBO0FBQ0o7QUFoVkU7QUFzVkYsR0F0V0E7QUEwV0MsRUFBQSxNQUFBLEVBQUEsZ0JBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxLQUFBLEVBQ0Q7QUFBQSxRQURDLElBQ0Q7QUFEQyxNQUFBLElBQ0QsR0FEQyxFQUNEO0FBQUE7O0FBQUEsUUFEQyxLQUNEO0FBREMsTUFBQSxLQUNELEdBREMsRUFDRDtBQUFBOztBQUNDLFFBQU8sTUFBQyxHQUFRLEVBQWhCOztBQUVDLFlBQU0sTUFBTyxDQUFDLFNBQVIsQ0FBWSxRQUFaLENBQVksSUFBWixDQUFZLElBQVosQ0FBTjtBQUVBLFdBQU0saUJBQU47QUFDQyxhQUFBLE9BQUEsQ0FBQSxNQUFBLEVBQUEsSUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFFBQUEsQ0FBQSxJQUFBLEVBQUEsUUFBQSxFQUFBLElBQUEsRUFBQSxLQUFBOztBQUNBOztBQUVILFdBQUksaUJBQUo7QUFDQSxhQUFBLE9BQUEsQ0FBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxLQUFBOztBQUNHO0FBUkQ7O0FBV0EsV0FBQyxNQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBRDtBQUNGO0FBMVhBLENBQUE7QUNBQSxPQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsR0FBQTtBQUdDLEVBQUEsSUFBQSxFQUFBLEVBSEQ7QUFPQyxFQUFBLElBQUEsRUFBQSxlQUFBLFVBQUEsRUFBQSxJQUFBLEVBQUEsQ0FBQSxFQUNEO0FBR0UsUUFBQSxDQUFBOztBQUVBLFFBQUcsVUFBRyxJQUFBLEtBQUEsSUFBTixFQUNGO0FBQ0UsTUFBQSxDQUFFLEdBQUMsS0FBQSxJQUFBLENBQVcsVUFBWCxDQUFIO0FBQ0MsS0FIRCxNQUtBO0FBQ0EsTUFBQSxDQUFBLEdBQUksS0FBQSxJQUFBLENBQUEsVUFBQSxJQUFBLElBQUEsQ0FDSCxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUEsQ0FBQSxLQUFBLENBQ0UsSUFBRSxPQUFTLENBQUMsSUFBVixDQUFVLFFBQVosQ0FBMEIsVUFBMUIsRUFBK0IsSUFBL0IsQ0FERixDQURHLENBQUo7QUFLRjs7QUFJRSxRQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBO0FBRUEsV0FBTyxDQUFDLENBQUMsSUFBRixDQUFPLENBQVAsRUFBTyxDQUFQLENBQVA7QUFHRjtBQWpDQSxDQUFBO0FDQUEsT0FBQSxDQUFBLE1BQUEsR0FBQTtBQUtDLGlCQUFBLHFCQUFBLENBQUEsRUFDRDtBQUNFLFdBQUEsQ0FBQSxLQUFhLFNBQWI7QUFDQSxHQVJGO0FBWUMsZUFBQSxtQkFBQSxDQUFBLEVBQ0Q7QUFDRSxXQUFBLENBQUEsS0FBWSxTQUFaO0FBQ0EsR0FmRjtBQW1CQyxZQUFBLGdCQUFBLENBQUEsRUFDRDtBQUNFLFdBQU0sQ0FBRSxLQUFDLElBQVQ7QUFDQSxHQXRCRjtBQTBCQyxlQUFBLG1CQUFBLENBQUEsRUFDRDtBQUNFLFdBQUEsQ0FBQSxLQUFZLElBQVo7QUFDQSxHQTdCRjtBQWlDQyxhQUFBLGlCQUFBLENBQUEsRUFDRDtBQUNFLFFBQUEsQ0FBQSxLQUFTLElBQVQsSUFFRyxDQUFDLEtBQUssS0FGVCxJQUlHLENBQUMsS0FBSyxFQUpULEVBS0c7QUFDTCxhQUFVLElBQVY7QUFDRzs7QUFFRCxRQUFDLFFBQUEsR0FBQSxNQUFBLENBQUEsU0FBQSxDQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFEO0FBRUEsV0FBTSxRQUFVLEtBQUMsZ0JBQVgsSUFBNEIsQ0FBUSxDQUFDLE1BQVQsS0FBaUIsQ0FBN0MsSUFFRSxRQUFRLEtBQUssaUJBQWIsSUFBa0MsTUFBQyxDQUFNLElBQVAsQ0FBWSxDQUFaLEVBQWMsTUFBZCxLQUFjLENBRnhEO0FBSUYsR0FsREE7QUFzREMsY0FBQSxrQkFBQSxDQUFBLEVBQ0Q7QUFDRSxXQUFBLE1BQVcsQ0FBQSxTQUFYLENBQXNCLFFBQXRCLENBQXNCLElBQXRCLENBQXNCLENBQXRCLE1BQXNCLGlCQUF0QjtBQUNBLEdBekRGO0FBNkRDLGNBQUEsa0JBQUEsQ0FBQSxFQUNEO0FBQ0UsV0FBQSxNQUFXLENBQUEsU0FBWCxDQUFzQixRQUF0QixDQUFzQixJQUF0QixDQUFzQixDQUF0QixNQUFzQixpQkFBdEI7QUFDQSxHQWhFRjtBQW9FQyxhQUFBLGlCQUFBLENBQUEsRUFDRDtBQUNFLFdBQU8sTUFBRyxDQUFBLFNBQUgsQ0FBYyxRQUFkLENBQWMsSUFBZCxDQUFjLENBQWQsTUFBYyxnQkFBckI7QUFDQSxHQXZFRjtBQTJFQyxjQUFBLGtCQUFBLENBQUEsRUFDRDtBQUNFLFdBQUEsTUFBVyxDQUFBLFNBQVgsQ0FBc0IsUUFBdEIsQ0FBc0IsSUFBdEIsQ0FBc0IsQ0FBdEIsTUFBc0IsaUJBQXRCO0FBQ0EsR0E5RUY7QUFrRkMsZ0JBQUEsb0JBQUEsQ0FBQSxFQUNEO0FBQ0UsUUFBQSxRQUFhLEdBQUEsTUFBVSxDQUFDLFNBQVgsQ0FBVyxRQUFYLENBQVcsSUFBWCxDQUFXLENBQVgsQ0FBYjtBQUVBLFdBQU0sUUFBUyxLQUFFLGlCQUFYLElBRUMsUUFBUSxLQUFLLGdCQUZkLElBSUMsUUFBUSxLQUFLLGlCQUpwQjtBQU1GLEdBNUZBO0FBZ0dDLFlBQUEsZ0JBQUEsQ0FBQSxFQUNEO0FBQ0UsV0FBTSxLQUFHLFFBQUgsQ0FBYyxDQUFkLEtBQWMsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxNQUFBLENBQXBCO0FBQ0EsR0FuR0Y7QUF1R0MsV0FBQSxlQUFBLENBQUEsRUFDRDtBQUNFLFdBQU8sS0FBQyxRQUFELENBQVksQ0FBWixLQUFZLENBQUEsQ0FBQSxHQUFBLENBQUEsTUFBQSxDQUFuQjtBQUNBLEdBMUdGO0FBZ0hDLGdCQUFBLG9CQUFBLENBQUEsRUFBQSxDQUFBLEVBQ0Q7QUFDRSxRQUFBLEtBQUEsT0FBQSxDQUFhLENBQWIsS0FFRyxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBRkgsRUFHRztBQUNMLGFBQVUsQ0FBQSxDQUFBLE9BQUEsQ0FBVSxDQUFWLEtBQVcsQ0FBckI7QUFDRzs7QUFFRCxRQUFDLEtBQUEsUUFBQSxDQUFBLENBQUEsQ0FBRCxFQUNGO0FBQ0UsYUFBUSxDQUFBLElBQUEsQ0FBUjtBQUNDOztBQUVELFdBQUMsS0FBRDtBQUNGLEdBL0hBO0FBbUlDLGVBQUEsbUJBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQ0Q7QUFDRSxRQUFBLEtBQUEsUUFBQSxDQUFZLEVBQVosS0FFRyxLQUFLLFFBQUwsQ0FBYyxFQUFkLENBRkgsRUFHRztBQUNMLGFBQWtCLENBQUMsSUFBRyxFQUFaLElBRVEsQ0FBQyxJQUFrQixFQUZyQztBQUlBOztBQUVFLFFBQUMsS0FBQSxRQUFBLENBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxNQUFBLEtBQUEsQ0FBQSxJQUVFLEtBQUssUUFBTCxDQUFjLEVBQWQsQ0FGRixJQUV1QixFQUFFLENBQUMsTUFBSCxLQUFjLENBRnRDLEVBR0c7QUFDTCxhQUFVLENBQUEsQ0FBQSxVQUFBLENBQWEsQ0FBYixLQUFtQixFQUFBLENBQUEsVUFBQSxDQUFZLENBQVosQ0FBbkIsSUFFQyxDQUFDLENBQUMsVUFBRixDQUFhLENBQWIsS0FBbUIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxDQUFkLENBRjlCO0FBSUE7O0FBRUUsV0FBQyxLQUFEO0FBQ0YsR0ExSkE7QUE4SkMsV0FBQSxlQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsSUFBQSxFQUNEO0FBQUEsUUFEQyxJQUNEO0FBREMsTUFBQSxJQUNELEdBREMsQ0FDRDtBQUFBOztBQUNFLFFBQUssTUFBRyxHQUFBLEVBQVI7O0FBRUssUUFBQyxLQUFPLFFBQVAsQ0FBWSxFQUFaLEtBRUUsS0FBSyxRQUFMLENBQWMsRUFBZCxDQUZILEVBR1A7QUFDQSxXQUFBLElBQVUsQ0FBQSxHQUFLLEVBQWYsRUFBMkIsQ0FBQSxJQUFBLEVBQTNCLEVBQTJCLENBQUEsSUFBQSxJQUEzQixFQUNHO0FBQ0EsUUFBQSxNQUFPLENBQUMsSUFBUixDQUFnQyxDQUFoQztBQUNDO0FBQ0osS0FSTyxNQVNILElBQUEsS0FBQSxRQUFBLENBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxNQUFBLEtBQUEsQ0FBQSxJQUVNLEtBQUssUUFBTCxDQUFjLEVBQWQsQ0FGTixJQUUyQixFQUFFLENBQUMsTUFBSCxLQUFjLENBRnpDLEVBR0o7QUFDQSxXQUFBLElBQVUsR0FBQSxHQUFLLEVBQUEsQ0FBQSxVQUFBLENBQWEsQ0FBYixDQUFmLEVBQWlDLEdBQUMsSUFBQSxFQUFNLENBQUMsVUFBUCxDQUFZLENBQVosQ0FBbEMsRUFBOEMsR0FBQSxJQUFBLElBQTlDLEVBQ0c7QUFDQSxRQUFBLE1BQU8sQ0FBQyxJQUFSLENBQVksTUFBRyxDQUFBLFlBQUgsQ0FBb0IsR0FBcEIsQ0FBWjtBQUNDO0FBQ0o7O0FBRUUsV0FBQyxNQUFEO0FBQ0YsR0F0TEE7QUEwTEMsbUJBQUEsdUJBQUEsQ0FBQSxFQUNEO0FBQ0UsUUFBQSxLQUFBLFFBQUEsQ0FBZ0IsQ0FBaEIsS0FFRyxLQUFLLE9BQUwsQ0FBYSxDQUFiLENBRkgsRUFHRztBQUNMLGFBQVUsQ0FBQSxDQUFBLE1BQVY7QUFDRzs7QUFFRCxRQUFDLEtBQUEsUUFBQSxDQUFBLENBQUEsQ0FBRCxFQUNGO0FBQ0UsYUFBUSxNQUFBLENBQUEsSUFBQSxDQUFZLENBQVosRUFBWSxNQUFwQjtBQUNDOztBQUVELFdBQUMsQ0FBRDtBQUNGLEdBek1BO0FBNk1DLGtCQUFBLHNCQUFBLENBQUEsRUFDRDtBQUNFLFdBQUEsQ0FBQSxLQUFZLFFBQVosQ0FBZSxDQUFmLEtBQTBCLEtBQUEsT0FBQSxDQUFBLENBQUEsQ0FBMUIsS0FBMEIsQ0FBQSxDQUFBLE1BQUEsR0FBQSxDQUExQixHQUEwQixDQUFBLENBQUEsWUFBQSxDQUExQixHQUEwQixFQUExQjtBQUNBLEdBaE5GO0FBb05DLGlCQUFBLHFCQUFBLENBQUEsRUFDRDtBQUNFLFdBQUEsQ0FBQSxLQUFhLFFBQWIsQ0FBc0IsQ0FBdEIsS0FBeUIsS0FBQSxPQUFBLENBQUEsQ0FBQSxDQUF6QixLQUF5QixDQUFBLENBQUEsTUFBQSxHQUFBLENBQXpCLEdBQXlCLENBQUEsQ0FBQSxDQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsQ0FBekIsR0FBeUIsRUFBekI7QUFDQSxHQXZORjtBQTJOQyxrQkFBQSxzQkFBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFDRDtBQUNFLFdBQUEsS0FBWSxRQUFaLENBQWUsQ0FBZixLQUEyQixLQUFNLE9BQU4sQ0FBVyxDQUFYLENBQTNCLEdBQXNDLENBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsQ0FBdEMsR0FBc0MsSUFBdEM7QUFDQSxHQTlORjtBQWtPQyxrQkFBQSx3QkFDRDtBQUNFLFFBQUEsU0FBWSxDQUFBLE1BQVosR0FBZSxDQUFmLEVBQ0E7QUFHQyxVQUFBLEtBQUEsUUFBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUNIO0FBQ0csWUFBTyxDQUFDLEdBQUEsRUFBUjs7QUFFQyxhQUFBLElBQVUsQ0FBVixJQUFhLFNBQWIsRUFDSjtBQUNJLGNBQUksSUFBTyxHQUFHLFNBQUMsQ0FBUyxDQUFULENBQWY7O0FBRUMsY0FBQSxDQUFBLEtBQU0sUUFBTixDQUFhLElBQWIsQ0FBQSxFQUNMO0FBQ0ssbUJBQVEsSUFBUjtBQUNDOztBQUVELFVBQUEsQ0FBQyxDQUFBLElBQUQsQ0FBQyxTQUFBLENBQUEsQ0FBQSxDQUFEO0FBQ0w7O0FBRUksZUFBQyxDQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBRDtBQUNKOztBQUlHLFVBQUEsS0FBQSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQ0g7QUFDRyxZQUFPLEVBQUMsR0FBQSxFQUFSOztBQUVDLGFBQUEsSUFBVSxHQUFWLElBQWEsU0FBYixFQUNKO0FBQ0ksY0FBSSxLQUFPLEdBQUcsU0FBQyxDQUFTLEdBQVQsQ0FBZjs7QUFFQyxjQUFBLENBQUEsS0FBTSxPQUFOLENBQWEsS0FBYixDQUFBLEVBQ0w7QUFDSyxtQkFBUSxJQUFSO0FBQ0M7O0FBRUQsZUFBQyxJQUFBLENBQUQsSUFBQyxLQUFEO0FBQUMsWUFBQSxFQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFBRDtBQUNMOztBQUVJLGVBQUMsRUFBRDtBQUNKOztBQUlHLFVBQUEsS0FBQSxRQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQ0g7QUFDRyxZQUFPLENBQUMsR0FBQSxFQUFSOztBQUVDLGFBQUEsSUFBVSxHQUFWLElBQWEsU0FBYixFQUNKO0FBQ0ksY0FBSSxNQUFPLEdBQUcsU0FBQyxDQUFTLEdBQVQsQ0FBZjs7QUFFQyxjQUFBLENBQUEsS0FBTSxRQUFOLENBQWEsTUFBYixDQUFBLEVBQ0w7QUFDSyxtQkFBUSxJQUFSO0FBQ0M7O0FBRUQsZUFBQyxJQUFBLEdBQUQsSUFBQyxNQUFEO0FBQUMsWUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFEO0FBQ0w7O0FBRUksZUFBQyxDQUFEO0FBQ0o7QUFHQTs7QUFFRSxXQUFDLElBQUQ7QUFDRixHQXpTQTtBQTZTQyxpQkFBQSxxQkFBQSxDQUFBLEVBQ0Q7QUFDRSxXQUFBLEtBQVcsT0FBWCxDQUFjLENBQWQsSUFBeUIsQ0FBQSxDQUFBLElBQUEsRUFBekIsR0FBeUIsRUFBekI7QUFDQSxHQWhURjtBQW9UQyxvQkFBQSx3QkFBQSxDQUFBLEVBQ0Q7QUFDRSxXQUFBLEtBQUEsT0FBQSxDQUFpQixDQUFqQixJQUF5QixDQUFDLENBQUMsT0FBRixFQUF6QixHQUE0QixFQUE1QjtBQUNBLEdBdlRGO0FBMlRDLGlCQUFBLHFCQUFBLENBQUEsRUFBQSxHQUFBLEVBQ0Q7QUFDRSxXQUFBLEtBQVcsT0FBWCxDQUFjLENBQWQsSUFBeUIsQ0FBQyxDQUFBLElBQUQsQ0FBSyxHQUFMLENBQXpCLEdBQThCLEVBQTlCO0FBQ0EsR0E5VEY7QUFrVUMsaUJBQUEscUJBQUEsQ0FBQSxFQUNEO0FBQ0UsV0FBQSxLQUFXLFFBQVgsQ0FBYyxDQUFkLElBQXlCLE1BQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUF6QixHQUF5QixFQUF6QjtBQUNBLEdBclVGO0FBMlVDLGdCQUFBLG9CQUFBLEVBQUEsRUFBQSxFQUFBLEVBQ0Q7QUFDRSxRQUFBLEtBQUEsUUFBQSxDQUFhLEVBQWIsS0FFRyxLQUFLLFFBQUwsQ0FBYyxFQUFkLENBRkgsRUFHRztBQUNMLFVBQVMsSUFBQyxHQUFBLHFCQUFWO0FBRUcsYUFBTSxFQUFBLENBQUksT0FBSixDQUFPLEVBQVAsRUFBTyxJQUFQLE1BQU8sSUFBYjtBQUNIOztBQUVFLFdBQUMsS0FBRDtBQUNGLEdBdlZBO0FBMlZDLGNBQUEsa0JBQUEsRUFBQSxFQUFBLEVBQUEsRUFDRDtBQUNFLFFBQUEsS0FBUSxRQUFSLENBQVcsRUFBWCxLQUVHLEtBQUssUUFBTCxDQUFjLEVBQWQsQ0FGSCxFQUdHO0FBQ0wsVUFBUyxJQUFDLEdBQUEsRUFBUSxDQUFDLE1BQVQsR0FBWSxFQUFBLENBQUEsTUFBdEI7QUFFRyxhQUFNLEVBQUEsQ0FBSSxPQUFKLENBQVUsRUFBVixFQUFnQixJQUFoQixNQUFzQixJQUE1QjtBQUNIOztBQUVFLFdBQUMsS0FBRDtBQUNGLEdBdldBO0FBMldDLFdBQUEsZUFBQSxDQUFBLEVBQUEsS0FBQSxFQUNEO0FBQ0UsUUFBQSxLQUFRLFFBQVIsQ0FBbUIsQ0FBbkIsS0FFRyxLQUFLLFFBQUwsQ0FBYSxLQUFiLENBRkgsRUFHRztBQUNMLFVBQVMsSUFBQyxHQUFBLEtBQVMsQ0FBSyxPQUFkLENBQWUsR0FBZixDQUFWO0FBQ0csVUFBRyxJQUFBLEdBQUEsS0FBQSxDQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUg7O0FBRUEsVUFBQSxJQUFNLEtBQU0sQ0FBWixJQUFhLElBQU0sR0FBQSxJQUFuQixFQUNIO0FBQ0csWUFDQztBQUNBLGlCQUFHLElBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxTQUFBLENBQUEsSUFBQSxHQUFBLENBQUEsRUFBQSxJQUFBLENBQUEsRUFBQSxLQUFBLENBQUEsU0FBQSxDQUFBLElBQUEsR0FBQSxDQUFBLENBQUEsRUFBQSxJQUFBLENBQUEsQ0FBQSxDQUFIO0FBQ0MsU0FIRixDQUlILE9BQUssR0FBTCxFQUNJLENBRUM7QUFDTDtBQUNBOztBQUVFLFdBQUMsS0FBRDtBQUNGLEdBbFlBO0FBc1lDLG9CQUFBLHdCQUFBLEVBQUEsRUFBQSxFQUFBLEVBQ0Q7QUFDRSxXQUFBLEVBQUEsSUFBQSxFQUFBLElBQWlCLEVBQWpCO0FBQ0EsR0F6WUY7QUE2WUMsa0JBQUEsc0JBQUEsQ0FBQSxFQUNEO0FBQ0UsV0FBQSxLQUFZLFFBQVosQ0FBZSxDQUFmLElBQTBCLENBQUEsQ0FBQSxXQUFBLEVBQTFCLEdBQTBCLEVBQTFCO0FBQ0EsR0FoWkY7QUFvWkMsa0JBQUEsc0JBQUEsQ0FBQSxFQUNEO0FBQ0UsV0FBQSxLQUFZLFFBQVosQ0FBZSxDQUFmLElBQTBCLENBQUEsQ0FBQSxXQUFBLEVBQTFCLEdBQTBCLEVBQTFCO0FBQ0EsR0F2WkY7QUEyWkMsdUJBQUEsMkJBQUEsQ0FBQSxFQUNEO0FBQ0UsUUFBQSxLQUFBLFFBQUEsQ0FBaUIsQ0FBakIsQ0FBQSxFQUNBO0FBQ0EsYUFBUSxDQUFBLENBQUEsSUFBQSxHQUFTLFdBQVQsR0FBWSxPQUFaLENBQVksTUFBWixFQUFZLFVBQUEsQ0FBQSxFQUFBO0FBRW5CLGVBQVEsQ0FBQyxDQUFBLFdBQUQsRUFBUjtBQUNILE9BSFUsQ0FBUjtBQUlGOztBQUVFLFdBQUMsRUFBRDtBQUNGLEdBdGFBO0FBMGFDLGtCQUFBLHNCQUFBLENBQUEsRUFDRDtBQUNFLFFBQUEsS0FBQSxRQUFBLENBQWUsQ0FBZixDQUFBLEVBQ0E7QUFDQSxhQUFRLENBQUEsQ0FBQSxJQUFBLEdBQVMsV0FBVCxHQUFZLE9BQVosQ0FBWSxhQUFaLEVBQVksVUFBQSxDQUFBLEVBQUE7QUFFbkIsZUFBUSxDQUFDLENBQUEsV0FBRCxFQUFSO0FBQ0gsT0FIVSxDQUFSO0FBSUY7O0FBRUUsV0FBQyxFQUFEO0FBQ0YsR0FyYkE7QUF5YkMsaUJBQUEscUJBQUEsQ0FBQSxFQUNEO0FBQ0UsV0FBQSxLQUFXLFFBQVgsQ0FBYyxDQUFkLElBQXlCLENBQUEsQ0FBQSxJQUFBLEVBQXpCLEdBQ0EsRUFEQTtBQUdGLEdBOWJBO0FBa2NDLGNBQUEsa0JBQUEsQ0FBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQ0Q7QUFDRSxRQUFBLE1BQVcsR0FBQSxFQUFYO0FBRUEsUUFBTSxDQUFBLEdBQU8sQ0FBUCxDQUFZLE1BQWxCO0FBQ0YsUUFBQSxDQUFBLEdBQUEsT0FBQSxDQUFBLE1BQUE7QUFDRSxRQUFNLENBQUMsR0FBRyxPQUFJLENBQUksTUFBbEI7O0FBRUEsUUFBQSxDQUFBLElBQVEsQ0FBUixFQUNGO0FBQ0UsWUFBTyxnQkFBUDtBQUNDOztBQUVILElBQUEsSUFBRyxFQUFBLEtBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsRUFDSDtBQUNBLFVBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFGLENBQVksQ0FBWixDQUFiOztBQUVHLFdBQUEsSUFBUSxDQUFDLEdBQUcsQ0FBWixFQUFZLENBQUEsR0FBQSxDQUFaLEVBQXNCLENBQUMsSUFBRSxDQUF6QixFQUNIO0FBQ0csWUFBSSxDQUFBLENBQUEsT0FBQSxDQUFVLE9BQU8sQ0FBQyxDQUFELENBQWpCLE1BQXlCLENBQTdCLEVBQ0M7QUFDQSxVQUFBLE1BQUssQ0FBQSxJQUFMLENBQWEsT0FBTyxDQUFDLENBQUQsQ0FBcEI7QUFFQyxVQUFBLENBQUEsSUFBQSxPQUFZLENBQUEsQ0FBQSxDQUFaLENBQVksTUFBWjtBQUVBLG1CQUFLLElBQUw7QUFDTDtBQUNBOztBQUVHLE1BQUEsTUFBQyxDQUFBLElBQUQsQ0FBQyxDQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsRUFBQSxDQUFEO0FBQ0g7O0FBRUUsV0FBQyxNQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBRDtBQUNGLEdBbmVBO0FBdWVDLGtCQUFBLENBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxDQXZlRDtBQXdlQSxrQkFBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsTUFBQSxFQUFBLE1BQUEsQ0F4ZUE7QUE0ZUMsb0JBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLENBNWVEO0FBNmVBLG9CQUFBLENBQUEsTUFBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLEVBQUEsTUFBQSxDQTdlQTtBQWlmQyx3QkFBQSxDQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxDQWpmRDtBQWtmQSx3QkFBQSxDQUFBLE1BQUEsRUFBQSxLQUFBLEVBQUEsS0FBQSxDQWxmQTtBQXNmQyxtQkFBQSx1QkFBQSxDQUFBLEVBQUEsSUFBQSxFQUNEO0FBQ0UsUUFBQSxLQUFBLFFBQUEsQ0FBZ0IsQ0FBaEIsQ0FBQSxFQUNBO0FBQ0EsY0FBUSxJQUFBLElBQVEsTUFBaEI7QUFFQyxhQUFNLE1BQU47QUFDQyxhQUFBLFdBQUE7QUFDQSxpQkFBTSxLQUFNLFFBQU4sQ0FBTSxDQUFOLEVBQU0sS0FBQSxZQUFOLEVBQU0sS0FBQSxZQUFOLENBQU47O0FBRUosYUFBSyxJQUFMO0FBQ0EsYUFBQSxRQUFBO0FBQ0ksaUJBQVEsS0FBRSxRQUFGLENBQUUsQ0FBRixFQUFFLEtBQUEsY0FBRixFQUFFLEtBQUEsY0FBRixDQUFSOztBQUVKLGFBQUssTUFBTDtBQUNBLGlCQUFBLEtBQUEsUUFBQSxDQUFBLENBQUEsRUFBQSxLQUFBLGtCQUFBLEVBQUEsS0FBQSxrQkFBQSxDQUFBOztBQUVBLGFBQUssS0FBTDtBQUNBLGlCQUFBLGtCQUFBLENBQUEsQ0FBQSxDQUFBOztBQUVBO0FBQ0EsaUJBQUEsQ0FBQTtBQWpCRTtBQW1CRjs7QUFFRSxXQUFDLEVBQUQ7QUFDRixHQWhoQkE7QUFvaEJDLHVCQUFBLDJCQUFBLENBQUEsRUFDRDtBQUNFLFdBQUEsS0FBQSxRQUFBLENBQW9CLENBQXBCLElBQW9CLGtCQUFXLENBQUEsQ0FBQSxDQUEvQixHQUNBLEVBREE7QUFHRixHQXpoQkE7QUE2aEJDLGtCQUFBLHNCQUFBLENBQUEsRUFDRDtBQUNFLFdBQUEsS0FBWSxRQUFaLENBQWUsQ0FBZixJQUEwQixDQUFBLENBQUEsT0FBQSxDQUFBLEtBQUEsRUFBQSxPQUFBLENBQTFCLEdBQ0EsRUFEQTtBQUdGLEdBbGlCQTtBQXNpQkMsZ0JBQUEsb0JBQUEsQ0FBQSxFQUNEO0FBQ0UsV0FBQSxLQUFZLFFBQVosQ0FBcUIsQ0FBckIsSUFBd0IsQ0FBeEIsR0FDQSxFQURBO0FBR0YsR0EzaUJBO0FBK2lCQyxvQkFBQSx3QkFBQSxDQUFBLEVBQUEsSUFBQSxFQUNEO0FBQ0UsV0FBQSxLQUFBLFFBQUEsQ0FBaUIsQ0FBakIsS0FBMkIsS0FBRSxRQUFGLENBQU8sSUFBUCxDQUEzQixHQUFrQyxLQUFBLFFBQUEsQ0FBQSxDQUFBLEVBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFsQyxHQUNBLEVBREE7QUFHRixHQXBqQkE7QUF3akJDLGtCQUFBLHNCQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUNEO0FBQ0UsV0FBQSxLQUFZLFFBQVosQ0FBZSxDQUFmLElBQTBCLENBQUMsQ0FBQSxLQUFELENBQU0sR0FBTixFQUFVLEdBQVYsQ0FBMUIsR0FDQSxFQURBO0FBR0YsR0E3akJBO0FBbWtCQyxnQkFBQSxvQkFBQSxDQUFBLEVBQ0Q7QUFDRSxXQUFBLElBQVUsQ0FBRSxHQUFaLENBQWEsQ0FBYixDQUFBO0FBQ0EsR0F0a0JGO0FBMGtCQyxrQkFBQSxzQkFBQSxDQUFBLEVBQUEsSUFBQSxFQUNEO0FBQ0UsWUFBQSxJQUFBO0FBRUEsV0FBTSxNQUFOO0FBQ0MsZUFBQSxJQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQTs7QUFFSCxXQUFJLE9BQUo7QUFDQSxlQUFBLElBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBOztBQUVBO0FBQ0EsZUFBQSxJQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQTtBQVRFO0FBV0YsR0F2bEJBO0FBMmxCQyxTQUFBLGVBQ0Q7QUFHRSxRQUFBLElBQUEsR0FBQSxTQUFBLENBQUEsTUFBQSxLQUFBLENBQUEsS0FBQSxLQUFBLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUEsS0FBQSxRQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsU0FBZ0gsQ0FBQSxDQUFBLENBQWhILEdBQ0YsU0FERTtBQU1BLFFBQUEsTUFBQSxHQUFBLE1BQUEsQ0FBQSxpQkFBQTs7QUFFQSxTQUFJLElBQU0sQ0FBVixJQUFhLElBQWIsRUFDRjtBQUNFLFVBQUksQ0FBQSxLQUFNLFFBQU4sQ0FBZSxJQUFDLENBQUEsQ0FBQSxDQUFoQixDQUFKLEVBQ0M7QUFDQSxlQUFRLE1BQUMsQ0FBQSxHQUFUO0FBQ0M7O0FBRUQsVUFBQyxNQUFBLEdBQUEsSUFBQSxDQUFBLENBQUEsQ0FBRCxFQUNIO0FBQ0csUUFBQSxNQUFHLEdBQU8sSUFBRSxDQUFBLENBQUEsQ0FBWjtBQUNDO0FBQ0o7O0FBSUUsV0FBQSxNQUFBO0FBQ0YsR0F2bkJBO0FBMm5CQyxTQUFBLGVBQ0Q7QUFHRSxRQUFBLElBQUEsR0FBQSxTQUFBLENBQUEsTUFBQSxLQUFBLENBQUEsS0FBQSxLQUFBLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUEsS0FBQSxRQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsU0FBZ0gsQ0FBQSxDQUFBLENBQWhILEdBQ0YsU0FERTtBQU1BLFFBQUEsTUFBQSxHQUFBLE1BQUEsQ0FBQSxpQkFBQTs7QUFFQSxTQUFJLElBQU0sQ0FBVixJQUFhLElBQWIsRUFDRjtBQUNFLFVBQUksQ0FBQSxLQUFNLFFBQU4sQ0FBZSxJQUFDLENBQUEsQ0FBQSxDQUFoQixDQUFKLEVBQ0M7QUFDQSxlQUFRLE1BQUMsQ0FBQSxHQUFUO0FBQ0M7O0FBRUQsVUFBQyxNQUFBLEdBQUEsSUFBQSxDQUFBLENBQUEsQ0FBRCxFQUNIO0FBQ0csUUFBQSxNQUFHLEdBQU8sSUFBRSxDQUFBLENBQUEsQ0FBWjtBQUNDO0FBQ0o7O0FBSUUsV0FBQSxNQUFBO0FBQ0YsR0F2cEJBO0FBNnBCQyxZQUFBLGdCQUFBLENBQUEsRUFDRDtBQUNFLFFBQU0sQ0FBQSxHQUFHLElBQUEsQ0FBQSxNQUFBLEVBQVQ7O0FBRUEsUUFBQSxDQUFBLEVBQ0Y7QUFDRSxVQUFJLEtBQUMsT0FBRCxDQUFDLENBQUQsS0FFQSxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBRkosRUFHSTtBQUNOLFlBQVcsQ0FBQSxHQUFBLE1BQVUsQ0FBQyxJQUFYLENBQVcsQ0FBWCxDQUFYO0FBRUEsZUFBVyxDQUFDLENBQ1osQ0FBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsQ0FEWSxDQUFaO0FBR0E7O0FBRUcsVUFBQyxLQUFBLFFBQUEsQ0FBQSxDQUFBLENBQUQsRUFDSDtBQUNHLGVBQVEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLENBQVksQ0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFaLENBQUEsQ0FBUjtBQUNDOztBQUVELFVBQUMsS0FBQSxRQUFBLENBQUEsQ0FBQSxDQUFELEVBQ0g7QUFDRyxlQUFRLElBQUEsQ0FBQSxLQUFBLENBQVUsQ0FBRSxHQUFBLENBQVosQ0FBUjtBQUNDO0FBQ0o7O0FBRUUsSUFBQSxDQUFDLEdBQUEsTUFBQSxDQUFBLGdCQUFEO0FBRUEsV0FBSSxJQUFPLENBQUEsS0FBUCxDQUFPLENBQUEsR0FBQSxDQUFQLENBQUo7QUFDRixHQTVyQkE7QUFrc0JDLHdCQUFBLDRCQUFBLENBQUEsRUFBQSxNQUFBLEVBQ0Q7QUFDRSxXQUFBLElBQUEsQ0FBQSxTQUFBLENBQXFCLENBQXJCLEVBQXFCLElBQXJCLEVBQStCLEtBQUUsUUFBRixDQUFTLE1BQVQsSUFBUyxNQUFULEdBQVMsQ0FBeEMsQ0FBQTtBQUNBLEdBcnNCRjtBQXlzQkMsd0JBQUEsNEJBQUEsQ0FBQSxFQUFBLElBQUEsRUFDRDtBQUNFLFdBQUEsT0FBQSxNQUFBLEtBQXFCLFdBQXJCLEdBQXNDLE1BQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLENBQUEsQ0FBdEMsR0FDQSxFQURBO0FBR0YsR0E5c0JBO0FBb3RCQyxhQUFBLGlCQUFBLFFBQUEsRUFBQSxTQUFBLEVBQUEsV0FBQSxFQUFBLGFBQUEsRUFDRDtBQUFBLFFBREMsU0FDRDtBQURDLE1BQUEsU0FDRCxHQURDLEVBQ0Q7QUFBQTs7QUFBQSxRQURDLFdBQ0Q7QUFEQyxNQUFBLFdBQ0QsR0FEQyxJQUNEO0FBQUE7O0FBQUEsUUFEQyxhQUNEO0FBREMsTUFBQSxhQUNELEdBREMsS0FDRDtBQUFBOztBQUdFLFFBQUEsUUFBQSxJQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsS0FBQSxFQUNGO0FBQ0UsVUFBRyxJQUFRLEdBQUcsRUFBZDs7QUFJQyxVQUFBLFdBQUEsRUFDSDtBQUNHLGFBQUcsSUFBQSxDQUFILElBQWUsT0FBQSxDQUFBLE1BQUEsQ0FBQSxJQUFmLEVBQ0M7QUFDQSxVQUFBLElBQUksQ0FBQSxDQUFBLENBQUosR0FBVyxPQUFJLENBQUEsTUFBSixDQUFZLElBQVosQ0FBbUIsQ0FBbkIsQ0FBWDtBQUNDO0FBQ0w7O0FBSUcsVUFBQSxTQUFBLEVBQ0g7QUFDRyxhQUFHLElBQUEsR0FBSCxJQUFhLFNBQWIsRUFDQztBQUNBLFVBQUEsSUFBSSxDQUFBLEdBQUEsQ0FBSixHQUFlLFNBQUssQ0FBUyxHQUFULENBQXBCO0FBQ0M7QUFDTDs7QUFJRyxhQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsTUFBQSxDQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsS0FBQSxDQUFBLFFBQUEsQ0FBQSxFQUFBLElBQUEsQ0FBQTtBQUdIOztBQUlFLFFBQUEsQ0FBQSxhQUFBLEVBQ0Y7QUFDRSxZQUFJLG9DQUFjLFFBQWQsR0FBYyxHQUFsQjtBQUNDOztBQUVELFdBQUMsRUFBRDtBQUdGO0FBandCQSxDQUFBO0FBd3dCQSxPQUFBLENBQUEsTUFBQSxDQUFBLFFBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLGFBQUE7QUN4d0JBLE9BQUEsQ0FBQSxJQUFBLENBQUEsV0FBQSxHQUFBO0FBR0MsRUFBQSxNQUFBLEVBQUEsZ0JBQUEsSUFBQSxFQUNEO0FBQ0MsUUFBQSxDQUFBO0FBQ0MsUUFBQSxDQUFBO0FBQ0EsUUFBSSxJQUFKO0FBQ0EsUUFBSSxLQUFKO0FBQ0EsUUFBSSxRQUFKOztBQUVBLFlBQUksSUFBQSxDQUFRLFFBQVo7QUFNQyxXQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEdBQUE7QUFHQyxRQUFBLENBQUEsR0FBQSxFQUFBOztBQUVBLGFBQUksSUFBRyxDQUFQLElBQU8sSUFBQSxDQUFBLElBQVAsRUFDSjtBQUNJLFVBQUEsQ0FBQSxDQUFHLElBQUgsQ0FBZSxLQUFLLE1BQUwsQ0FBVSxJQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBVixDQUFmO0FBQ0M7O0FBSUQsZUFBQSxNQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsR0FBQTs7QUFNRCxXQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEdBQUE7QUFHQyxRQUFBLENBQUEsR0FBQSxFQUFBOztBQUVBLGFBQUksSUFBRyxHQUFQLElBQU8sSUFBQSxDQUFBLElBQVAsRUFDSjtBQUNJLFVBQUEsQ0FBQSxDQUFHLElBQUgsQ0FBSSxHQUFLLEdBQUcsR0FBUixHQUFXLEtBQUssTUFBTCxDQUFVLElBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFWLENBQWY7QUFDQzs7QUFJRCxlQUFBLE1BQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxHQUFBOztBQU1ELFdBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQTtBQUdILFFBQUEsQ0FBSyxHQUFBLEVBQUw7O0FBRUksYUFBSSxJQUFHLEdBQVAsSUFBTyxJQUFBLENBQUEsSUFBUCxFQUNKO0FBQ0ksVUFBQSxDQUFBLENBQUcsSUFBSCxDQUFJLEtBQVEsTUFBUixDQUFnQixJQUFJLENBQUMsSUFBTCxDQUFLLEdBQUwsQ0FBaEIsQ0FBSjtBQUNDOztBQUlMLGVBQUssSUFBQSxDQUFBLFNBQUEsR0FBQSxHQUFBLEdBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxHQUFMOztBQU1HLFdBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQTtBQUdDLFFBQUEsQ0FBQSxHQUFBLEVBQUE7O0FBRUEsYUFBSSxJQUFHLEdBQVAsSUFBTyxJQUFBLENBQUEsSUFBUCxFQUNKO0FBQ0ksVUFBQSxDQUFBLENBQUcsSUFBSCxDQUFJLE1BQVUsS0FBSyxNQUFMLENBQVcsSUFBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLENBQVgsQ0FBVixHQUFxQixHQUF6QjtBQUNDOztBQUlELGVBQUEsQ0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLFNBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxTQUFBOztBQU1ELFdBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsUUFBQTtBQUVBLGVBQUssSUFBTyxDQUFDLFNBQWI7O0FBTUEsV0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxFQUFBO0FBRUEsUUFBQSxJQUFLLEdBQUEsS0FBUSxNQUFSLENBQWEsSUFBTSxDQUFDLFFBQXBCLENBQUw7O0FBRUMsZ0JBQU8sSUFBSSxDQUFDLFNBQUwsQ0FBWSxRQUFuQjtBQUVBLGVBQU0sT0FBTSxDQUFBLElBQU4sQ0FBTSxNQUFOLENBQWdCLE9BQXRCO0FBQ0MsbUJBQUEsOEJBQUEsSUFBQSxHQUFBLEdBQUE7O0FBRUwsZUFBTSxPQUFRLENBQUEsSUFBUixDQUFnQixNQUFoQixDQUF1QixJQUE3QjtBQUNBLG1CQUFBLDJCQUFBLElBQUEsR0FBQSxHQUFBOztBQUVBLGVBQU0sT0FBUSxDQUFBLElBQVIsQ0FBZ0IsTUFBaEIsQ0FBdUIsS0FBN0I7QUFDQSxtQkFBQSw0QkFBQSxJQUFBLEdBQUEsR0FBQTs7QUFFQSxlQUFNLE9BQVEsQ0FBQSxJQUFSLENBQWdCLE1BQWhCLENBQXVCLFFBQTdCO0FBQ0EsbUJBQUEsK0JBQUEsSUFBQSxHQUFBLEdBQUE7O0FBRUEsZUFBTSxPQUFRLENBQUEsSUFBUixDQUFnQixNQUFoQixDQUF1QixJQUE3QjtBQUNBLG1CQUFBLDJCQUFBLElBQUEsR0FBQSxHQUFBOztBQUVBLGVBQU0sT0FBUSxDQUFBLElBQVIsQ0FBZ0IsTUFBaEIsQ0FBdUIsR0FBN0I7QUFDQSxtQkFBQSwwQkFBQSxJQUFBLEdBQUEsR0FBQTs7QUFFQTtBQUNBLGtCQUFBLGdCQUFBO0FBckJJOztBQTRCRCxXQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEVBQUE7QUFFQSxZQUFJLElBQUMsQ0FBQSxTQUFELENBQWMsUUFBZCxLQUF3QixPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxLQUE1QixFQUNIO0FBQ0ksVUFBQSxJQUFHLEdBQUssS0FBQSxNQUFBLENBQVUsSUFBQSxDQUFBLFFBQVYsQ0FBUjtBQUNDLFVBQUEsS0FBQSxHQUFBLEtBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxTQUFBLENBQUE7QUFFQSxpQkFBTywrQkFBNkIsSUFBN0IsR0FBNkIsR0FBN0IsR0FBNkIsS0FBN0IsR0FBNkIsR0FBcEM7QUFDTCxTQU5HLE1BUUM7QUFDQSxVQUFBLENBQUEsR0FBSSxLQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxDQUFKO0FBRUMsVUFBQSxJQUFJLEdBQUEsSUFBSyxDQUFBLFNBQUwsQ0FBaUIsUUFBakIsQ0FBMkIsU0FBL0I7QUFDTCxVQUFBLEtBQUEsR0FBQSxJQUFBLENBQUEsU0FBQSxDQUFBLFNBQUEsQ0FBQSxTQUFBO0FBRUssaUJBQU8sOEJBQTBCLENBQTFCLEdBQTBCLEdBQTFCLEdBQW9DLElBQXBDLEdBQW9DLEdBQXBDLEdBQW9DLEtBQXBDLEdBQW9DLEdBQTNDO0FBQ0w7O0FBTUcsV0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxXQUFBO0FBRUEsUUFBQSxJQUFLLEdBQUEsS0FBUSxNQUFSLENBQWEsSUFBTSxDQUFDLFFBQXBCLENBQUw7QUFDSCxRQUFBLEtBQUEsR0FBQSxLQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsU0FBQSxDQUFBO0FBRUksZUFBTywrQkFBNkIsSUFBN0IsR0FBNkIsR0FBN0IsR0FBNkIsS0FBN0IsR0FBNkIsR0FBcEM7O0FBTUQsV0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxTQUFBO0FBRUEsUUFBQSxJQUFLLEdBQUEsS0FBUSxNQUFSLENBQWEsSUFBTSxDQUFDLFFBQXBCLENBQUw7QUFDSCxRQUFBLEtBQUEsR0FBQSxLQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsU0FBQSxDQUFBO0FBRUksZUFBTyw2QkFBNkIsSUFBN0IsR0FBNkIsR0FBN0IsR0FBNkIsS0FBN0IsR0FBNkIsR0FBcEM7O0FBTUQsV0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxPQUFBO0FBRUEsUUFBQSxJQUFLLEdBQUEsS0FBUSxNQUFSLENBQWEsSUFBTSxDQUFDLFFBQXBCLENBQUw7QUFDSCxRQUFBLEtBQUEsR0FBQSxLQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsU0FBQSxDQUFBO0FBRUksZUFBTywwQkFBa0IsSUFBbEIsR0FBNkIsR0FBN0IsR0FBNkIsS0FBN0IsR0FBNkIsR0FBcEM7O0FBTUQsV0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxLQUFBO0FBRUEsUUFBQSxJQUFLLEdBQUEsS0FBUSxNQUFSLENBQWEsSUFBTSxDQUFDLFFBQXBCLENBQUw7QUFDSCxRQUFBLEtBQUEsR0FBQSxLQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsU0FBQSxDQUFBO0FBRUksZUFBTywwQkFBa0IsSUFBbEIsR0FBNkIsR0FBN0IsR0FBNkIsS0FBN0IsR0FBNkIsR0FBcEM7O0FBTUQsV0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBO0FBRUEsUUFBQSxJQUFLLEdBQUEsS0FBUSxNQUFSLENBQWEsSUFBTSxDQUFDLFFBQXBCLENBQUw7QUFDSCxRQUFBLEtBQUEsR0FBQSxLQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsU0FBQSxDQUFBOztBQUVJLFlBQUEsSUFBTyxDQUFDLFNBQVIsQ0FBYSxDQUFiLE1BQXlCLEdBQXpCLEVBQ0o7QUFDSSxpQkFBUSxJQUFBLEdBQUEsR0FBQSxHQUFhLEtBQXJCO0FBQ0MsU0FIRCxNQUtBO0FBQ0EsaUJBQUksSUFBQSxHQUFBLEdBQUEsR0FBQSxLQUFBLEdBQUEsR0FBSjtBQUNDOztBQU1GLFdBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsS0FBQTtBQUVBLFFBQUEsSUFBSyxHQUFBLEtBQVEsTUFBUixDQUFhLElBQU0sQ0FBQyxRQUFwQixDQUFMO0FBQ0gsUUFBQSxLQUFBLEdBQUEsS0FBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFNBQUEsQ0FBQTtBQUVJLGVBQU8sZ0JBQWEsSUFBYixHQUFrQixHQUFsQixHQUE2QixLQUE3QixHQUE2QixHQUFwQzs7QUFNRCxXQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEtBQUE7QUFFQSxRQUFBLElBQUssR0FBQSxLQUFRLE1BQVIsQ0FBYSxJQUFNLENBQUMsUUFBcEIsQ0FBTDtBQUNILFFBQUEsS0FBQSxHQUFBLEtBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxTQUFBLENBQUE7QUFFSSxlQUFPLGNBQWEsSUFBYixHQUFrQixHQUFsQixHQUEyQixLQUEzQixHQUE2QixHQUFwQzs7QUFNRCxXQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLGVBQUE7QUFFQSxRQUFBLElBQUssR0FBQSxLQUFRLE1BQVIsQ0FBYSxJQUFNLENBQUMsUUFBcEIsQ0FBTDtBQUNILFFBQUEsS0FBQSxHQUFBLEtBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxTQUFBLENBQUE7QUFFSSxlQUFPLE9BQU0sSUFBTixHQUFhLFFBQWIsR0FBa0IsS0FBbEIsR0FBNkIsSUFBcEM7O0FBSUQ7QUFLQyxZQUFBLElBQUEsQ0FBQSxRQUFBLEtBQUEsSUFBQSxJQUVHLElBQUksQ0FBQyxTQUFMLEtBQWtCLElBRnJCLEVBR0c7QUFDUCxVQUFBLFFBQVksR0FBQSxJQUFTLENBQUMsUUFBVixLQUFrQixPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxHQUFsQixHQUFrQixJQUFBLENBQUEsU0FBbEIsR0FBa0IsR0FBOUI7QUFFSyxpQkFBQSxRQUFZLEdBQUssR0FBakIsR0FBaUIsS0FBWSxNQUFaLENBQWEsSUFBUSxDQUFBLFNBQXJCLENBQWpCLEdBQXNELEdBQXREO0FBQ0w7O0FBRUksWUFBQyxJQUFBLENBQUEsUUFBQSxLQUFBLElBQUEsSUFFRSxJQUFJLENBQUMsU0FBTCxLQUFrQixJQUZyQixFQUdHO0FBQ1AsVUFBQSxRQUFZLEdBQUEsSUFBUyxDQUFDLFFBQVYsS0FBa0IsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsR0FBbEIsR0FBa0IsSUFBQSxDQUFBLFNBQWxCLEdBQWtCLEdBQTlCO0FBRUssaUJBQUEsTUFBWSxLQUFLLE1BQUwsQ0FBYSxJQUFJLENBQUMsUUFBbEIsQ0FBWixHQUEwQyxHQUExQyxHQUEyQyxRQUEzQztBQUNMOztBQU1JLFlBQUEsSUFBQSxDQUFBLFFBQUEsS0FBQSxJQUFBLElBRUcsSUFBSSxDQUFDLFNBQUwsS0FBa0IsSUFGckIsRUFHRztBQUNQLGtCQUFZLElBQUEsQ0FBQSxRQUFaO0FBSU0saUJBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsVUFBQTtBQUNOLGNBQUEsUUFBQSxHQUFBLElBQUE7QUFDTTs7QUFJQSxpQkFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxXQUFBO0FBQ04sY0FBQSxRQUFBLEdBQUEsSUFBQTtBQUNNOztBQUlBLGlCQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLFVBQUE7QUFDTixjQUFBLFFBQUEsR0FBQSxHQUFBO0FBQ007O0FBSUEsaUJBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsV0FBQTtBQUNOLGNBQUEsUUFBQSxHQUFBLEdBQUE7QUFDTTs7QUFJQSxpQkFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxXQUFBO0FBQ04sY0FBQSxRQUFBLEdBQUEsR0FBQTtBQUNNOztBQUlBLGlCQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLE1BQUE7QUFDTixjQUFBLFFBQUEsR0FBQSxHQUFBO0FBQ007O0FBSUE7QUFDTixjQUFBLFFBQUEsR0FBQSxJQUFBLENBQUEsU0FBQTtBQUNNO0FBMUNOOztBQStDSyxVQUFBLElBQUMsR0FBQSxLQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxDQUFEO0FBQ0wsVUFBQSxLQUFBLEdBQUEsS0FBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFNBQUEsQ0FBQTtBQUVLLGlCQUFPLE1BQU0sSUFBTixHQUFhLFFBQWIsR0FBa0IsS0FBbEIsR0FBNkIsR0FBcEM7QUFDTDs7QUE1VEU7QUFrVUYsR0E3VUE7QUFpVkMsRUFBQSxLQUFBLEVBQUEsZUFBQSxJQUFBLEVBQ0Q7QUFDQyxXQUFPLDJCQUFjLEtBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLENBQWQsR0FBYyxNQUFyQjtBQUNDLEdBcFZGO0FBd1ZDLEVBQUEsSUFBQSxFQUFBLGVBQUEsSUFBQSxFQUFBLENBQUEsRUFDRDtBQUNDLFFBQUksQ0FBQyxDQUFMLEVBQU0sQ0FBQSxHQUFBLEVBQUE7QUFFTCxXQUFPLElBQUksQ0FBQSxLQUFHLEtBQUgsQ0FBRyxJQUFILENBQUEsQ0FBSixDQUFPLElBQVAsQ0FBTyxDQUFQLEVBQU8sQ0FBUCxDQUFQO0FBQ0Y7QUE3VkEsQ0FBQTs7QUFvV0EsQ0FBQSxZQUFBO0FDcldBLE1BQUEsTUFBQSxHQUFBO0FBQ0ksSUFBQSxJQUFRLEVBQUUsQ0FEZDtBQUVRLElBQUEsUUFBSSxFQUFjLENBRjFCO0FBR1EsSUFBQSxRQUFRLEVBQVUsQ0FIMUI7QUFJUSxJQUFBLFFBQVEsRUFBVSxDQUoxQjtBQUtRLElBQUEsWUFBUSxFQUFVLENBTDFCO0FBTVEsSUFBQSxlQUFZLEVBQU0sQ0FOMUI7QUFPUSxJQUFBLFNBQUEsRUFBa0IsQ0FQMUI7QUFRUSxJQUFBLFdBQVMsRUFBUyxDQVIxQjtBQVNRLElBQUEsVUFBQSxFQUFrQixDQVQxQjtBQVVRLElBQUEsUUFBQSxFQUFrQixFQVYxQjtBQVdRLElBQUEsT0FBQSxFQUFrQjtBQVgxQixHQUFBOztBQWdCQSxNQUFBLEtBQUEsR0FBQSxZQUFBO0FBRUEsUUFBQSxLQUFBLEdBQUE7QUFDUSxNQUFBLEVBQU0sRUFBRyxDQURqQjtBQUVZLE1BQUEsR0FBRSxFQUFNLENBRnBCO0FBR1ksTUFBQSxHQUFHLEVBQUssQ0FIcEI7QUFJWSxNQUFBLElBQUcsRUFBSyxDQUpwQjtBQUtZLE1BQUEsSUFBSSxFQUFJLENBTHBCO0FBTVksTUFBQSxLQUFJLEVBQUksQ0FOcEI7QUFPWSxNQUFBLEdBQUEsRUFBUTtBQVBwQixLQUFBO0FBQUEsUUFTUSxRQUFFLEdBQUE7QUFDRixNQUFBLFdBQVksRUFBQSx1QkFEVjtBQUVFLE1BQUEsU0FBQSxFQUFjO0FBRmhCLEtBVFY7QUFjQSxRQUFBLElBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUE7O0FBRUEsYUFBQSxLQUFBLENBQUEsS0FBQSxFQUFBO0FBQ0ksTUFBQSxJQUFRLEdBQUMsS0FBTSxDQUFBLEtBQU4sQ0FBYyxFQUFkLENBQVQ7QUFDSSxNQUFBLEdBQUEsR0FBTSxDQUFOO0FBQ0EsTUFBQSxHQUFHLEdBQUcsSUFBTjtBQUNBLE1BQUEsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFYO0FBRVIsVUFBQSxHQUFBLEdBQUEsbUJBQUEsRUFBQTtBQUFBLFVBQ1ksS0FBSyxHQUFDLEdBQUEsRUFEbEI7O0FBR0EsVUFBQSxLQUFBLENBQUEsSUFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLEVBQUE7QUFDVyxRQUFBLGVBQWUsQ0FBQSxLQUFBLENBQWY7QUFDWDs7QUFFQSxhQUFBLEdBQUE7QUFDQTs7QUFFQSxhQUFBLG1CQUFBLEdBQUE7QUFDSSxVQUFRLElBQUMsR0FBQSx1QkFBdUIsRUFBaEM7QUFBQSxVQUNRLFFBRFI7O0FBR0osYUFBQSxLQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7QUFDUSxRQUFBLEdBQU07QUFDRixTQUFBLFFBQU0sS0FBQSxRQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBTixFQUFNLElBQU4sQ0FBTSx1QkFBQSxFQUFOO0FBQ1o7O0FBRUEsYUFBQSxRQUFBLEdBQ1E7QUFDSyxRQUFBLElBQUEsRUFBQSxNQUFBLENBQUEsV0FETDtBQUVRLFFBQUEsSUFBSSxFQUFHO0FBRmYsT0FEUixHQUtZLElBTFo7QUFNQTs7QUFFQSxhQUFBLHVCQUFBLEdBQUE7QUFDSSxhQUFTLEtBQUEsQ0FBQSxHQUFBLENBQUEsR0FDTCxrQkFBa0IsRUFEYixHQUVELFNBQUEsRUFGUjtBQUdKOztBQUVBLGFBQUEsa0JBQUEsR0FBQTtBQUNJLE1BQUEsTUFBUyxDQUFBLEdBQUEsQ0FBVDtBQUNJLFVBQUEsSUFBTSxHQUFBLG1CQUFNLEVBQVo7QUFDQSxNQUFBLE1BQUksQ0FBQSxHQUFBLENBQUo7QUFFUixVQUFBLEtBQUEsR0FBQSxFQUFBO0FBQUEsVUFDWSxJQURaOztBQUVBLGFBQVksSUFBSyxHQUFBLGNBQUEsRUFBakIsRUFBaUI7QUFDVCxRQUFBLEtBQU8sQ0FBQSxJQUFQLENBQWMsSUFBZDtBQUNSOztBQUVBLFVBQUEsQ0FBQSxLQUFBLENBQUEsTUFBQSxFQUFBO0FBQ1ksZUFBTSxJQUFOO0FBQ1osT0FGQSxNQUdTLElBQUEsSUFBQSxDQUFBLElBQUEsS0FBQSxNQUFBLENBQUEsSUFBQSxFQUFBO0FBQ0csUUFBQSxJQUFJLENBQUEsS0FBSixHQUFhLElBQUksQ0FBQyxLQUFMLENBQVcsTUFBWCxDQUFrQixLQUFsQixDQUFiO0FBQ0EsZUFBSyxJQUFMO0FBQ1o7O0FBRUEsTUFBQSxLQUFBLENBQUEsT0FBQSxDQUFBLElBQUE7QUFFQSxhQUFBO0FBQ1EsUUFBQSxJQUFRLEVBQUEsTUFBQSxDQUFBLElBRGhCO0FBRVksUUFBQSxLQUFJLEVBQUk7QUFGcEIsT0FBQTtBQUlBOztBQUVBLGFBQUEsY0FBQSxHQUFBO0FBQ0ksVUFBQSxLQUFTLENBQUEsR0FBQSxDQUFULEVBQVM7QUFDRixlQUFLLGlCQUFRLEVBQWI7QUFDWDs7QUFFQSxVQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUNXLGVBQUssb0JBQVEsRUFBYjtBQUNYOztBQUVBLFVBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQ1csZUFBSyxrQkFBUSxFQUFiO0FBQ1g7QUFDQTs7QUFFQSxhQUFBLFNBQUEsR0FBQTtBQUNJLFVBQUEsQ0FBUSxTQUFDLEVBQVQsRUFBcUI7QUFDYixRQUFBLGVBQWMsQ0FBQSxHQUFBLEVBQUEsQ0FBZDtBQUNaOztBQUVBLFVBQUEsUUFBQSxHQUFBLEtBQUE7QUFBQSxVQUNZLEtBRFo7O0FBR0EsVUFBQSxLQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7QUFDVyxRQUFBLEdBQUE7QUFDQyxRQUFBLFFBQU0sR0FBQSxJQUFOO0FBQ1osT0FIQSxNQUlTLElBQUEsVUFBQSxFQUFBLEVBQUE7QUFDRyxRQUFBLEtBQUksR0FBQSxHQUFBLEdBQVUsR0FBVixDQUFjLE1BQWQsQ0FBZSxDQUFmLENBQUo7QUFDWjs7QUFFQSxVQUFBLEtBQUEsR0FBQSxFQUFBO0FBQUEsVUFDWSxJQURaOztBQUVBLGFBQVksSUFBSyxHQUFBLGFBQUEsRUFBakIsRUFBaUI7QUFDVCxRQUFBLEtBQU8sQ0FBQSxJQUFQLENBQWMsSUFBZDtBQUNSOztBQUVBLGFBQUE7QUFDUSxRQUFBLElBQVEsRUFBQSxNQUFBLENBQUEsSUFEaEI7QUFFWSxRQUFBLFFBQUksRUFBTyxRQUZ2QjtBQUdZLFFBQUEsS0FBQSxFQUFXLEtBSHZCO0FBSVksUUFBQSxLQUFLLEVBQU07QUFKdkIsT0FBQTtBQU1BOztBQUVBLGFBQUEsYUFBQSxHQUFBO0FBQ0ksYUFBUyxhQUFlLEtBQ3BCLGFBQU8sRUFEYSxHQUVoQixjQUFhLEVBRnJCO0FBR0o7O0FBRUEsYUFBQSxhQUFBLEdBQUE7QUFDSSxVQUFRLFFBQUMsR0FBQSxHQUFhLEdBQUcsR0FBekI7QUFBQSxVQUNRLEtBQUEsR0FBUSxTQUFTLEVBRHpCO0FBQUEsVUFFUSxJQUZSOztBQUlKLFVBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLEtBQUEsQ0FBQSxJQUFBLEtBQUEsS0FBQSxDQUFBLEVBQUEsSUFBQSxLQUFBLENBQUEsSUFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLEVBQUE7QUFDVyxRQUFBLElBQUssR0FBQSxHQUFNLEdBQUcsR0FBZDtBQUNYOztBQUVBLGFBQUE7QUFDUSxRQUFBLElBQVEsRUFBQSxNQUFBLENBQUEsUUFEaEI7QUFFWSxRQUFBLFFBQUksRUFBTyxRQUZ2QjtBQUdZLFFBQUEsSUFBQSxFQUFXO0FBSHZCLE9BQUE7QUFLQTs7QUFFQSxhQUFBLGlCQUFBLEdBQUE7QUFDSSxNQUFBLE1BQVMsQ0FBQSxHQUFBLENBQVQ7QUFDSSxVQUFBLElBQU0sR0FBQSxZQUFNLEVBQVo7QUFDQSxNQUFBLE1BQUksQ0FBQSxHQUFBLENBQUo7QUFFUixhQUFBO0FBQ1EsUUFBQSxJQUFRLEVBQUEsTUFBQSxDQUFBLFFBRGhCO0FBRVksUUFBQSxHQUFBLEVBQU87QUFGbkIsT0FBQTtBQUlBOztBQUVBLGFBQUEsb0JBQUEsR0FBQTtBQUNJLE1BQUEsTUFBUyxDQUFBLEdBQUEsQ0FBVDtBQUNJLFVBQUEsSUFBTSxHQUFBLGtCQUFNLEVBQVo7QUFDQSxNQUFBLE1BQUksQ0FBQSxHQUFBLENBQUo7QUFFUixhQUFBO0FBQ1EsUUFBQSxJQUFRLEVBQUEsTUFBQSxDQUFBLFFBRGhCO0FBRVksUUFBQSxHQUFBLEVBQU87QUFGbkIsT0FBQTtBQUlBOztBQUVBLGFBQUEsa0JBQUEsR0FBQTtBQUNJLFVBQVEsSUFBQyxHQUFBLG1CQUFzQixFQUEvQjtBQUFBLFVBQ1EsUUFEUjs7QUFHSixhQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQTtBQUNRLFFBQUEsR0FBTTtBQUNGLFNBQUEsUUFBTSxLQUFBLFFBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFOLEVBQU0sSUFBTixDQUFNLG1CQUFBLEVBQU47QUFDWjs7QUFFQSxhQUFBLFFBQUEsR0FDUTtBQUNLLFFBQUEsSUFBQSxFQUFBLE1BQUEsQ0FBQSxZQURMO0FBRVEsUUFBQSxFQUFBLEVBQU8sSUFGZjtBQUdRLFFBQUEsSUFBRSxFQUFLO0FBSGYsT0FEUixHQU1ZLElBTlo7QUFPQTs7QUFFQSxhQUFBLG1CQUFBLEdBQUE7QUFDSSxVQUFRLElBQUMsR0FBQSxpQkFBdUIsRUFBaEM7QUFBQSxVQUNRLFFBRFI7O0FBR0osYUFBQSxLQUFBLENBQUEsSUFBQSxDQUFBLEVBQUE7QUFDUSxRQUFBLEdBQU07QUFDRixTQUFBLFFBQU0sS0FBQSxRQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBTixFQUFNLElBQU4sQ0FBTSxpQkFBQSxFQUFOO0FBQ1o7O0FBRUEsYUFBQSxRQUFBLEdBQ1E7QUFDSyxRQUFBLElBQUEsRUFBQSxNQUFBLENBQUEsWUFETDtBQUVRLFFBQUEsRUFBQSxFQUFPLElBRmY7QUFHUSxRQUFBLElBQUUsRUFBSztBQUhmLE9BRFIsR0FNWSxJQU5aO0FBT0E7O0FBRUEsYUFBQSxpQkFBQSxHQUFBO0FBQ0ksVUFBUSxJQUFDLEdBQUEsbUJBQXFCLEVBQTlCOztBQUVKLGFBQ1EsS0FBTSxDQUFBLElBQUEsQ0FBTixJQUFNLEtBQUEsQ0FBQSxJQUFBLENBQU4sSUFBTSxLQUFBLENBQUEsS0FBQSxDQUFOLElBQU0sS0FBQSxDQUFBLEtBQUEsQ0FBTixJQUNJLEtBQUssQ0FBQSxLQUFBLENBRFQsSUFDbUIsS0FBSyxDQUFBLEtBQUEsQ0FEeEIsSUFDa0MsS0FBSyxDQUFBLElBQUEsQ0FEdkMsSUFDa0QsS0FBSyxDQUFBLElBQUEsQ0FEdkQsSUFFSSxLQUFLLENBQUEsS0FBQSxDQUZULElBRW9CLEtBQUssQ0FBQSxLQUFBLENBRnpCLElBRW1DLEtBQUssQ0FBQSxJQUFBLENBRnhDLElBRWtELEtBQUssQ0FBQSxJQUFBLENBRnZELElBR0ksS0FBSyxDQUFBLEtBQUEsQ0FIVCxJQUdvQixLQUFLLENBQUEsS0FBQSxDQUh6QixJQUdtQyxLQUFDLENBQUssSUFBTCxDQUhwQyxJQUdrRCxLQUFDLENBQUssSUFBTCxDQUozRCxFQUtBO0FBQ1csUUFBQSxJQUFBLEdBQUE7QUFDSyxVQUFBLElBQUksRUFBQSxNQUFBLENBQUEsZUFEVDtBQUVLLFVBQUEsRUFBQSxFQUFPLEdBQUEsR0FBTSxHQUZsQjtBQUdLLFVBQUEsSUFBRSxFQUFLLENBQUEsSUFBQSxFQUFNLGlCQUFJLEVBQVY7QUFIWixTQUFBO0FBS1g7O0FBRUEsYUFBQSxJQUFBO0FBQ0E7O0FBRUEsYUFBQSxtQkFBQSxHQUFBO0FBQ0ksVUFBUSxJQUFDLEdBQUEsaUJBQXVCLEVBQWhDOztBQUVKLGFBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxLQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxFQUFBO0FBQ1EsUUFBQSxJQUFNLEdBQUs7QUFDSCxVQUFBLElBQUksRUFBQSxNQUFBLENBQUEsZUFERDtBQUVILFVBQUEsRUFBQSxFQUFPLEdBQUEsR0FBTSxHQUZWO0FBR0gsVUFBQSxJQUFFLEVBQUssQ0FBQSxJQUFBLEVBQU0sbUJBQUksRUFBVjtBQUhKLFNBQVg7QUFLUjs7QUFFQSxhQUFBLElBQUE7QUFDQTs7QUFFQSxhQUFBLGlCQUFBLEdBQUE7QUFDSSxVQUFRLElBQUMsR0FBQSx1QkFBcUIsRUFBOUI7O0FBRUosYUFBQSxLQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQ1EsUUFBQSxJQUFNLEdBQUs7QUFDSCxVQUFBLElBQUksRUFBQSxNQUFBLENBQUEsU0FERDtBQUVILFVBQUEsRUFBQSxFQUFPLEdBQUEsR0FBTSxHQUZWO0FBR0gsVUFBQSxJQUFFLEVBQUssQ0FBQSxJQUFBLEVBQU0sdUJBQUksRUFBVjtBQUhKLFNBQVg7QUFLUjs7QUFFQSxhQUFBLElBQUE7QUFDQTs7QUFFQSxhQUFBLHVCQUFBLEdBQUE7QUFDSSxVQUFRLElBQUMsR0FBQSxjQUFBLEVBQVQ7O0FBRUosYUFBQSxLQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUNRLFFBQUEsSUFBTSxHQUFLO0FBQ0gsVUFBQSxJQUFJLEVBQUEsTUFBQSxDQUFBLFNBREQ7QUFFSCxVQUFBLEVBQUEsRUFBTyxHQUFBLEdBQU0sR0FGVjtBQUdILFVBQUEsSUFBRSxFQUFLLENBQUEsSUFBQSxFQUFNLHVCQUFJLEVBQVY7QUFISixTQUFYO0FBS1I7O0FBRUEsYUFBQSxJQUFBO0FBQ0E7O0FBRUEsYUFBQSxZQUFBLEdBQUE7QUFDSSxVQUFBLEtBQVMsQ0FBQSxHQUFBLENBQVQsRUFBUztBQUNGLFFBQUEsR0FBQTtBQUNDLGVBQU07QUFDTixVQUFBLElBQVEsRUFBQSxNQUFBLENBQUEsUUFERjtBQUVGLFVBQUEsS0FBSSxFQUFJLGNBQU87QUFGYixTQUFOO0FBSVo7O0FBRUEsVUFBQSxRQUFBLEdBQUEsY0FBQSxFQUFBOztBQUNRLFVBQUcsS0FBQyxDQUFBLEdBQUEsQ0FBSixFQUFlO0FBQ1osUUFBQSxHQUFBOztBQUNDLFlBQUcsS0FBRyxDQUFBLEdBQUEsQ0FBTixFQUFNO0FBQ0gsaUJBQUs7QUFDSixZQUFBLElBQVEsRUFBQSxNQUFBLENBQUEsUUFESjtBQUVBLFlBQUEsT0FBSSxFQUFNO0FBRlYsV0FBTDtBQUlmOztBQUVBLGVBQUE7QUFDWSxVQUFBLElBQVEsRUFBQSxNQUFBLENBQUEsUUFEcEI7QUFFZ0IsVUFBQSxPQUFJLEVBQU0sUUFGMUI7QUFHZ0IsVUFBQSxLQUFBLEVBQVUsY0FBUztBQUhuQyxTQUFBO0FBS0E7O0FBRUEsYUFBQTtBQUNRLFFBQUEsSUFBUSxFQUFBLE1BQUEsQ0FBQSxRQURoQjtBQUVZLFFBQUEsR0FBQSxFQUFPO0FBRm5CLE9BQUE7QUFJQTs7QUFFQSxhQUFBLGNBQUEsR0FBQTtBQUNJLFVBQUEsS0FBUyxDQUFBLEdBQUEsQ0FBVCxJQUFTLEtBQWlCLENBQUMsR0FBRCxDQUExQixFQUEyQjtBQUNwQixlQUFLO0FBQ0osVUFBQSxJQUFRLEVBQUEsTUFBQSxDQUFBLFVBREo7QUFFQSxVQUFBLEVBQUEsRUFBTyxHQUFBLEdBQU0sR0FGYjtBQUdBLFVBQUEsR0FBRSxFQUFLLGNBQVU7QUFIakIsU0FBTDtBQUtYOztBQUVBLGFBQUEsZ0JBQUEsRUFBQTtBQUNBOztBQUVBLGFBQUEsZ0JBQUEsR0FBQTtBQUNJLFVBQVEsS0FBQyxHQUFBLFNBQWdCLEVBQXpCO0FBQUEsVUFDUSxJQUFBLEdBQU8sS0FBQyxDQUFBLElBRGhCOztBQUdKLFVBQUEsSUFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLElBQUEsSUFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLElBQUEsSUFBQSxLQUFBLEtBQUEsQ0FBQSxJQUFBLElBQUEsSUFBQSxLQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUE7QUFDVyxlQUFRO0FBQ1AsVUFBQSxJQUFRLEVBQUEsTUFBQSxDQUFBLE9BREQ7QUFFSCxVQUFBLEdBQUEsRUFBTyxHQUFBLEdBQU07QUFGVixTQUFSO0FBSVg7O0FBRUEsVUFBQSxTQUFBLEVBQUEsRUFBQTtBQUNXLGVBQUEsU0FBYyxFQUFkO0FBQ1g7O0FBRUEsVUFBQSxLQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7QUFDVyxlQUFLLGNBQVEsRUFBYjtBQUNYOztBQUVBLGFBQUEsZUFBQSxDQUFBLEdBQUEsRUFBQSxDQUFBO0FBQ0E7O0FBRUEsYUFBQSxjQUFBLEdBQUE7QUFDSSxNQUFBLE1BQVMsQ0FBQSxHQUFBLENBQVQ7QUFDSSxVQUFBLElBQU0sR0FBQSxrQkFBTSxFQUFaO0FBQ0EsTUFBQSxNQUFJLENBQUEsR0FBQSxDQUFKO0FBRVIsYUFBQSxJQUFBO0FBQ0E7O0FBRUEsYUFBQSxLQUFBLENBQUEsR0FBQSxFQUFBO0FBQ0ksVUFBUSxLQUFDLEdBQU0sU0FBTSxFQUFyQjtBQUNJLGFBQUksS0FBUSxDQUFBLElBQVIsS0FBaUIsS0FBRyxDQUFBLEtBQXBCLElBQW9CLEtBQUEsQ0FBQSxHQUFBLEtBQUEsR0FBeEI7QUFDUjs7QUFFQSxhQUFBLFNBQUEsR0FBQTtBQUNJLGFBQVMsYUFBYSxNQUFBLFVBQUEsRUFBYixJQUFhLEtBQUEsQ0FBQSxHQUFBLENBQXRCO0FBQ0o7O0FBRUEsYUFBQSxhQUFBLEdBQUE7QUFDSSxVQUFRLEtBQUMsR0FBQSxTQUFnQixFQUF6Qjs7QUFDSSxVQUFHLEtBQUMsQ0FBSyxJQUFOLEtBQVMsS0FBUyxDQUFHLEtBQXhCLEVBQXdCO0FBQ3JCLFlBQUssR0FBQyxHQUFLLEtBQUksQ0FBQSxHQUFmO0FBQ0MsZUFBTyxHQUFHLEtBQUssR0FBUixJQUFhLEdBQUEsS0FBQSxJQUFwQjtBQUNaOztBQUVBLGFBQUEsS0FBQTtBQUNBOztBQUVBLGFBQUEsVUFBQSxHQUFBO0FBQ0ksVUFBUSxLQUFDLEdBQUEsU0FBYyxFQUF2QjtBQUNJLGFBQUksS0FBUSxDQUFBLElBQVIsS0FBaUIsS0FBRyxDQUFBLEVBQXBCLElBQW9CLEtBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxNQUFBLEdBQXhCO0FBQ1I7O0FBRUEsYUFBQSxNQUFBLENBQUEsR0FBQSxFQUFBO0FBQ0ksVUFBUSxLQUFDLEdBQU8sR0FBRyxFQUFuQjs7QUFDSSxVQUFHLEtBQUMsQ0FBSyxJQUFOLEtBQWUsS0FBQSxDQUFBLEtBQWYsSUFBZSxLQUFBLENBQUEsR0FBQSxLQUFBLEdBQWxCLEVBQWtCO0FBQ2YsUUFBQSxlQUFlLENBQUEsS0FBQSxDQUFmO0FBQ1g7QUFDQTs7QUFFQSxhQUFBLFNBQUEsR0FBQTtBQUNJLFVBQUEsR0FBUyxLQUFBLElBQVQsRUFBcUI7QUFDZCxlQUFRLEdBQVI7QUFDWDs7QUFFQSxVQUFBLEdBQUEsR0FBQSxHQUFBO0FBQ1EsTUFBQSxHQUFHLEdBQUMsT0FBUyxFQUFiO0FBQ0EsTUFBQSxHQUFHLEdBQUcsR0FBTjtBQUVSLGFBQUEsR0FBQTtBQUNBOztBQUVBLGFBQUEsT0FBQSxHQUFBO0FBQ0ksYUFBUyxZQUFXLENBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFwQixFQUFvQjtBQUNoQixVQUFNLEdBQU47QUFDUjs7QUFFQSxVQUFBLEdBQUEsSUFBQSxHQUFBLEVBQUE7QUFDVyxlQUFPO0FBQ04sVUFBQSxJQUFRLEVBQUEsS0FBQSxDQUFBLEdBREY7QUFFRixVQUFBLEtBQUksRUFBSSxDQUFBLEdBQUEsRUFBTSxHQUFOO0FBRk4sU0FBUDtBQUlYOztBQUVBLFVBQUEsS0FBQSxHQUFBLGNBQUEsRUFBQTs7QUFDUSxVQUFHLEtBQUMsS0FDSyxLQUFFLEdBQUEsTUFBQSxFQURQLENBQUQsS0FFTSxLQUFLLEdBQUcsVUFBVSxFQUZ4QixNQUdNLEtBQUssR0FBRyxXQUFVLEVBSHhCLENBQUgsRUFHaUM7QUFDekMsZUFBaUIsS0FBakI7QUFDQTs7QUFFQSxNQUFBLEtBQUEsR0FBQTtBQUFBLFFBQUEsS0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBLEdBQUE7QUFBQSxPQUFBO0FBQ1EsTUFBQSxHQUFBLElBQU8sR0FBUCxHQUNJLEtBQUcsQ0FBRyxJQUFOLEdBQU8sS0FBQSxDQUFBLEdBRFgsR0FFSSxLQUFLLENBQUMsR0FBTixHQUFZLElBQUMsQ0FBQSxHQUFBLENBRmpCO0FBSVIsTUFBQSxlQUFBLENBQUEsS0FBQSxDQUFBO0FBQ0E7O0FBRUEsYUFBQSxHQUFBLEdBQUE7QUFDSSxVQUFRLEtBQVI7O0FBRUosVUFBQSxHQUFBLEVBQUE7QUFDVyxRQUFBLEdBQUksR0FBRSxHQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBTjtBQUNDLFFBQUEsS0FBSyxHQUFDLEdBQU47QUFDQSxRQUFBLEdBQUEsR0FBTSxJQUFOO0FBQ0EsZUFBTSxLQUFOO0FBQ1o7O0FBRUEsYUFBQSxPQUFBLEVBQUE7QUFDQTs7QUFFQSxhQUFBLE9BQUEsQ0FBQSxFQUFBLEVBQUE7QUFDSSxhQUFTLGFBQWEsT0FBYixDQUFhLEVBQWIsS0FBYSxDQUF0QjtBQUNKOztBQUVBLGFBQUEsWUFBQSxDQUFBLEVBQUEsRUFBQTtBQUNJLGFBQVMsVUFBWSxPQUFaLENBQWtCLEVBQWxCLElBQWtCLENBQUEsQ0FBM0I7QUFDSjs7QUFFQSxhQUFBLFNBQUEsQ0FBQSxFQUFBLEVBQUE7QUFDSSxhQUFTLEVBQUEsS0FBUyxHQUFULElBQWUsRUFBQSxLQUFBLEdBQWYsSUFBZSxFQUFBLEtBQUEsR0FBZixJQUFlLEVBQUEsSUFBQSxHQUFBLElBQUEsRUFBQSxJQUFBLEdBQWYsSUFBZSxFQUFBLElBQUEsR0FBQSxJQUFBLEVBQUEsSUFBQSxHQUF4QjtBQUNKOztBQUVBLGFBQUEsUUFBQSxDQUFBLEVBQUEsRUFBQTtBQUNJLGFBQVMsU0FBVyxDQUFDLEVBQUQsQ0FBWCxJQUFjLEVBQUEsSUFBQSxHQUFBLElBQUEsRUFBQSxJQUFBLEdBQXZCO0FBQ0o7O0FBRUEsYUFBQSxNQUFBLEdBQUE7QUFDSSxVQUFRLEVBQUMsR0FBQSxJQUFRLENBQUMsR0FBRCxDQUFqQjs7QUFFSixVQUFBLENBQUEsU0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FBQ1k7QUFDWjs7QUFFQSxVQUFBLEtBQUEsR0FBQSxHQUFBO0FBQUEsVUFDWSxFQUFBLEdBQUssRUFEakI7O0FBR0EsYUFBQSxFQUFBLEdBQUEsR0FBQSxHQUFBLEVBQUE7QUFDUSxRQUFBLEVBQUssR0FBRyxJQUFLLENBQUMsR0FBRCxDQUFiOztBQUNJLFlBQUcsQ0FBQyxRQUFNLENBQUcsRUFBSCxDQUFWLEVBQWU7QUFDWDtBQUNoQjs7QUFDWSxRQUFBLEVBQUMsSUFBQSxFQUFEO0FBQ1o7O0FBRUEsY0FBQSxFQUFBO0FBQ1EsYUFBUyxNQUFUO0FBQ0ksYUFBSyxPQUFMO0FBQ0ksaUJBQU87QUFDUCxZQUFBLElBQVEsRUFBQSxLQUFBLENBQUEsSUFERDtBQUVILFlBQUEsR0FBQSxFQUFRLEVBQUEsS0FBTSxNQUZYO0FBR0gsWUFBQSxLQUFHLEVBQUssQ0FBQSxLQUFBLEVBQVEsR0FBUjtBQUhMLFdBQVA7O0FBTWhCLGFBQUEsTUFBQTtBQUNnQixpQkFBTTtBQUNOLFlBQUEsSUFBUSxFQUFBLEtBQUEsQ0FBQSxJQURGO0FBRUYsWUFBQSxHQUFBLEVBQVEsSUFGTjtBQUdGLFlBQUEsS0FBRyxFQUFLLENBQUEsS0FBQSxFQUFLLEdBQUw7QUFITixXQUFOOztBQU1oQjtBQUNZLGlCQUFRO0FBQ0osWUFBQSxJQUFRLEVBQUEsS0FBQSxDQUFBLEVBREo7QUFFQSxZQUFBLEdBQUEsRUFBUSxFQUZSO0FBR0EsWUFBQSxLQUFHLEVBQUssQ0FBQSxLQUFBLEVBQUcsR0FBSDtBQUhSLFdBQVI7QUFqQlo7QUF1QkE7O0FBRUEsYUFBQSxVQUFBLEdBQUE7QUFDSSxVQUFBLElBQVMsQ0FBQSxHQUFBLENBQVQsS0FBcUIsR0FBckIsSUFBdUIsSUFBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLElBQXZCLEVBQXVCO0FBQ2hCO0FBQ1g7O0FBRUEsVUFBQSxJQUFBLEdBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBLFVBQ1ksS0FBSyxHQUFFLEVBQUEsR0FEbkI7QUFBQSxVQUVZLEdBQUEsR0FBTSxFQUZsQjtBQUFBLFVBR1ksUUFBTSxHQUFHLEtBSHJCO0FBQUEsVUFJWSxFQUpaOztBQU1BLGFBQUEsR0FBQSxHQUFBLEdBQUEsRUFBQTtBQUNRLFFBQUEsRUFBTSxHQUFHLElBQUcsQ0FBQSxHQUFLLEVBQUwsQ0FBWjs7QUFDSSxZQUFHLEVBQUUsS0FBSyxJQUFWLEVBQWE7QUFDVixVQUFBLEVBQUcsR0FBRyxJQUFDLENBQUEsR0FBTyxFQUFQLENBQVA7QUFDZixTQUZZLE1BR0MsSUFBQSxDQUFBLEVBQUEsS0FBQSxHQUFBLElBQUEsRUFBQSxLQUFBLElBQUEsS0FBQSxFQUFBLEtBQUEsSUFBQSxFQUFBO0FBQ0csVUFBQSxRQUFRLEdBQUcsSUFBWDtBQUNBO0FBQ2hCOztBQUNZLFFBQUEsR0FBQyxJQUFBLEVBQUQ7QUFDWjs7QUFFQSxVQUFBLFFBQUEsRUFBQTtBQUNXLGVBQVE7QUFDUCxVQUFBLElBQVEsRUFBQSxLQUFBLENBQUEsR0FERDtBQUVILFVBQUEsR0FBQSxFQUFNLEdBRkg7QUFHSCxVQUFBLEtBQUssRUFBQyxDQUFHLEtBQUgsRUFBSSxHQUFKO0FBSEgsU0FBUjtBQUtYO0FBQ0E7O0FBRUEsYUFBQSxXQUFBLEdBQUE7QUFDSSxVQUFRLEtBQUMsR0FBQSxHQUFUO0FBQUEsVUFDUSxFQUFBLEdBQUssSUFBRyxDQUFBLEdBQUEsQ0FEaEI7QUFBQSxVQUVRLE9BQUssR0FBSyxFQUFBLEtBQUssR0FGdkI7O0FBSUosVUFBQSxPQUFBLElBQUEsT0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FBQ1csWUFBQSxHQUFRLEdBQUcsRUFBWDs7QUFDQyxlQUFJLEVBQUksR0FBSixHQUFTLEdBQWIsRUFBYTtBQUNiLFVBQUEsRUFBSyxHQUFHLElBQUssQ0FBQyxHQUFELENBQWI7O0FBQ0ksY0FBRyxFQUFFLEtBQUssR0FBVixFQUFlO0FBQ1osZ0JBQUcsT0FBSCxFQUFhO0FBQ1Q7QUFDdkI7O0FBQ29CLFlBQUEsT0FBQyxHQUFBLElBQUQ7QUFDcEIsV0FMZ0IsTUFNQyxJQUFBLENBQUEsT0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FBQ0c7QUFDcEI7O0FBRUEsVUFBQSxHQUFBLElBQUEsRUFBQTtBQUNBOztBQUVBLGVBQUE7QUFDWSxVQUFBLElBQVEsRUFBQSxLQUFBLENBQUEsR0FEcEI7QUFFZ0IsVUFBQSxHQUFBLEVBQVEsT0FBTSxHQUFHLFVBQUMsQ0FBQSxHQUFBLENBQUosR0FBSSxRQUFBLENBQUEsR0FBQSxFQUFBLEVBQUEsQ0FGbEM7QUFHZ0IsVUFBQSxLQUFHLEVBQUssQ0FBQSxLQUFBLEVBQVEsR0FBUjtBQUh4QixTQUFBO0FBS0E7QUFDQTs7QUFFQSxhQUFBLGNBQUEsR0FBQTtBQUNJLFVBQVEsS0FBQyxHQUFBLEdBQVQ7QUFBQSxVQUNRLEdBQUEsR0FBTSxJQUFFLENBQUcsR0FBSCxDQURoQjtBQUFBLFVBRVEsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUUsQ0FBTixDQUZsQjs7QUFJSixVQUFBLEdBQUEsS0FBQSxHQUFBLEVBQUE7QUFDVyxZQUFJLE9BQUksQ0FBSSxHQUFKLENBQVIsRUFBYztBQUNWO0FBQ2Y7O0FBRUEsZUFBQSxJQUFBLENBQUEsRUFBQSxHQUFBLENBQUEsS0FBQSxHQUFBLEdBQ1k7QUFDSyxVQUFBLElBQUEsRUFBQSxLQUFBLENBQUEsS0FETDtBQUVRLFVBQUEsR0FBQSxFQUFRLElBRmhCO0FBR1EsVUFBQSxLQUFHLEVBQUssQ0FBQSxLQUFBLEVBQUssRUFBQSxHQUFMO0FBSGhCLFNBRFosR0FNZ0I7QUFDQyxVQUFBLElBQUEsRUFBQSxLQUFBLENBQUEsS0FERDtBQUVJLFVBQUEsR0FBQSxFQUFRLEdBRlo7QUFHSSxVQUFBLEtBQUcsRUFBSyxDQUFBLEtBQUEsRUFBSSxHQUFKO0FBSFosU0FOaEI7QUFXQTs7QUFFQSxVQUFBLEdBQUEsS0FBQSxHQUFBLEVBQUE7QUFDVyxZQUFJLEdBQUksR0FBQSxJQUFNLENBQUEsR0FBQSxHQUFBLENBQUEsQ0FBZDs7QUFDQyxZQUFHLEdBQUMsS0FBTSxHQUFWLEVBQWU7QUFDWixjQUFJLFFBQVEsT0FBUixDQUFVLEdBQVYsS0FBVSxDQUFkLEVBQWM7QUFDWCxtQkFBUztBQUNQLGNBQUEsSUFBUSxFQUFBLEtBQUEsQ0FBQSxLQUREO0FBRUgsY0FBQSxHQUFBLEVBQVEsR0FBQSxHQUFNLEdBQU4sR0FBWSxHQUZqQjtBQUdILGNBQUEsS0FBRyxFQUFLLENBQUEsS0FBQSxFQUFNLEdBQUssSUFBSSxDQUFmO0FBSEwsYUFBVDtBQUtsQjtBQUNBLFNBUlksTUFTQyxJQUFBLE1BQUEsT0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEVBQUE7QUFDRyxjQUFHLEdBQUEsS0FBTyxHQUFWLEVBQVU7QUFDUCxtQkFBUTtBQUNQLGNBQUEsSUFBUSxFQUFBLEtBQUEsQ0FBQSxLQUREO0FBRUgsY0FBQSxHQUFBLEVBQVEsR0FBQSxHQUFNLEdBQU4sR0FBWSxHQUZqQjtBQUdILGNBQUEsS0FBRyxFQUFLLENBQUEsS0FBQSxFQUFNLEdBQUssSUFBSSxDQUFmO0FBSEwsYUFBUjtBQUtuQjtBQUNBLFNBUmEsTUFTQSxJQUFBLFVBQUEsT0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEVBQUE7QUFDRyxpQkFBRztBQUNILFlBQUEsSUFBUSxFQUFBLEtBQUEsQ0FBQSxLQURMO0FBRUMsWUFBQSxHQUFBLEVBQVEsR0FBQSxHQUFNLEdBRmY7QUFHQyxZQUFBLEtBQUcsRUFBSyxDQUFBLEtBQUEsRUFBTSxHQUFJLElBQUEsQ0FBVjtBQUhULFdBQUg7QUFLaEI7QUFDQSxPQTNCQSxNQTRCUyxJQUFBLEdBQUEsS0FBQSxHQUFBLElBQUEsTUFBQSxPQUFBLENBQUEsR0FBQSxLQUFBLENBQUEsRUFBQTtBQUNHLGVBQU87QUFDUCxVQUFBLElBQVEsRUFBQSxLQUFBLENBQUEsS0FERDtBQUVILFVBQUEsR0FBQSxFQUFRLEdBQUEsR0FBTSxHQUZYO0FBR0gsVUFBQSxLQUFHLEVBQUssQ0FBQSxLQUFBLEVBQU0sR0FBSSxJQUFBLENBQVY7QUFITCxTQUFQO0FBS1o7O0FBRUEsVUFBQSxHQUFBLEtBQUEsR0FBQSxLQUFBLEdBQUEsS0FBQSxHQUFBLElBQUEsR0FBQSxLQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQ1csZUFBUTtBQUNQLFVBQUEsSUFBUSxFQUFBLEtBQUEsQ0FBQSxLQUREO0FBRUgsVUFBQSxHQUFBLEVBQVEsR0FBQSxHQUFNLEdBRlg7QUFHSCxVQUFBLEtBQUcsRUFBSyxDQUFBLEtBQUEsRUFBTSxHQUFJLElBQUEsQ0FBVjtBQUhMLFNBQVI7QUFLWDs7QUFFQSxVQUFBLG9CQUFBLE9BQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxFQUFBO0FBQ1UsZUFBQTtBQUNFLFVBQUEsSUFBUSxFQUFBLEtBQUEsQ0FBQSxLQURWO0FBRU0sVUFBQSxHQUFBLEVBQVEsR0FGZDtBQUdNLFVBQUEsS0FBRyxFQUFLLENBQUEsS0FBQSxFQUFJLEVBQUEsR0FBSjtBQUhkLFNBQUE7QUFLVjtBQUNBOztBQUVBLGFBQUEsZUFBQSxDQUFBLEtBQUEsRUFBQTtBQUNJLFVBQUEsS0FBUyxDQUFBLElBQVQsS0FBUyxLQUFnQixDQUFBLEdBQXpCLEVBQWlDO0FBQzFCLFFBQUEsVUFBVyxDQUFBLEtBQUEsRUFBSSxRQUFZLENBQUEsU0FBaEIsQ0FBWDtBQUNYOztBQUVBLE1BQUEsVUFBQSxDQUFBLEtBQUEsRUFBQSxRQUFBLENBQUEsV0FBQSxFQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUE7QUFDQTs7QUFFQSxhQUFBLFVBQUEsQ0FBQSxLQUFBLEVBQUEsYUFBQSxFQUFBO0FBQ0ksVUFBUSxJQUFDLEdBQUEsS0FBVyxDQUFBLFNBQVgsQ0FBa0IsS0FBbEIsQ0FBa0IsSUFBbEIsQ0FBaUMsU0FBakMsRUFBa0MsQ0FBbEMsQ0FBVDtBQUFBLFVBQ1EsR0FBQSxHQUFNLGFBQU8sQ0FBQSxPQUFQLENBQ0YsUUFERSxFQUVGLFVBQVMsQ0FBVCxFQUFTLEdBQVQsRUFBUztBQUNULGVBQVcsSUFBSSxDQUFDLEdBQUQsQ0FBSixJQUFPLEVBQWxCO0FBQ2hCLE9BSmtCLENBRGQ7QUFBQSxVQU1KLEtBQWdCLEdBQUcsSUFBQSxLQUFBLENBQUEsR0FBQSxDQU5mO0FBUUosTUFBQSxLQUFBLENBQUEsTUFBQSxHQUFBLEtBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRUEsWUFBQSxLQUFBO0FBQ0E7O0FBRUEsV0FBQSxLQUFBO0FBQ0EsR0F2b0JBLEVBQUE7O0FBMm9CQSxNQUFBLFNBQUEsR0FBQSxZQUFBO0FBRUEsUUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLFNBQUEsRUFBQSxVQUFBOztBQUVBLGFBQUEsVUFBQSxHQUFBO0FBQ0ksVUFBQSxVQUFTLENBQUEsTUFBVCxFQUF1QjtBQUNoQixlQUFBLFVBQWtCLENBQUMsS0FBbkIsRUFBQTtBQUNYOztBQUVBLFVBQUEsT0FBQSxHQUFBLE1BQUEsRUFBQSxTQUFBO0FBQ1EsTUFBQSxJQUFJLENBQUEsSUFBSixDQUFJLE9BQUo7QUFDQSxhQUFLLE9BQUw7QUFDUjs7QUFFQSxhQUFBLFdBQUEsR0FBQTtBQUNJLFVBQVEsSUFBQyxHQUFBLFNBQVQ7QUFBQSxVQUF3QixDQUFBLEdBQUEsSUFBQSxDQUFBLE1BQXhCOztBQUNJLGFBQUksQ0FBQSxFQUFKLEVBQVc7QUFDWCxRQUFBLFVBQVksQ0FBQSxJQUFaLENBQVksSUFBQSxDQUFBLENBQUEsQ0FBWjtBQUNSO0FBQ0E7O0FBRUEsYUFBQSxTQUFBLENBQUEsR0FBQSxFQUFBO0FBQ0ksTUFBQSxJQUFRLEdBQUMsRUFBVDtBQUNJLE1BQUEsSUFBSSxHQUFHLENBQUEsS0FBQSxDQUFQO0FBQ0EsTUFBQSxTQUFTLEdBQUcsQ0FBWjtBQUNBLE1BQUEsVUFBVSxHQUFHLEVBQWI7QUFFUixNQUFBLGFBQUEsQ0FBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLE1BQUEsQ0FBQTtBQUVBLE1BQUEsSUFBQSxDQUFBLE9BQUEsQ0FDWSxNQURaLEVBRVksS0FBSyxDQUFBLE9BQUwsR0FDQSx1QkFEQSxHQUVJLHVHQUpoQixFQUtnQixtQ0FMaEIsRUFNZ0IsR0FOaEIsRUFNbUIsSUFBTSxDQUFDLElBQVAsQ0FBUyxHQUFULENBTm5CLEVBTWtDLEdBTmxDOztBQVFBLFVBQUEsR0FBQSxDQUFBLElBQUEsS0FBQSxNQUFBLENBQUEsSUFBQSxFQUFBO0FBQ1csWUFBSSxRQUFTLEdBQUEsR0FBTSxDQUFDLEtBQVAsQ0FBYSxHQUFDLENBQUEsS0FBRCxDQUFDLE1BQUQsR0FBQyxDQUFkLENBQWI7O0FBQ0MsWUFBRyxRQUFDLElBQVcsUUFBSSxDQUFLLElBQVQsS0FBYyxNQUFNLENBQUEsUUFBaEMsSUFBNEMsU0FBQSxRQUFBLENBQUEsR0FBL0MsRUFBK0M7QUFDNUMsVUFBQSxJQUFBLENBQUEsSUFBQSxDQUFXLGVBQVg7QUFDZjtBQUNBOztBQUVBLE1BQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxhQUFBO0FBRUEsYUFBQSxJQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBQTtBQUNBOztBQUVBLGFBQUEsYUFBQSxDQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBO0FBQ0ksVUFBUSxLQUFDLEdBQUEsSUFBQSxDQUFBLEtBQVQ7QUFBQSxVQUNRLENBQUEsR0FBQSxDQURSO0FBQUEsVUFDZSxHQUFDLEdBQUssS0FBSyxDQUFDLE1BRDNCO0FBR0osTUFBQSxJQUFBLENBQUEsSUFBQSxDQUNZLElBRFosRUFDa0IsR0FEbEIsRUFDa0IsSUFBQSxDQUFBLFFBQUEsR0FBQSxNQUFBLEdBQUEsSUFBQSxDQUFBLEtBQUEsR0FBQSxXQUFBLElBQUEsQ0FBQSxLQUFBLEdBQUEsR0FEbEIsRUFDa0IsR0FEbEIsRUFFWSxXQUFXLElBQVgsR0FBZ0IsUUFBaEIsR0FBMkIsSUFBM0IsR0FBbUMsTUFBbkMsR0FBNkMsSUFBN0MsR0FBZ0QsS0FGNUQ7O0FBSUEsYUFBQSxDQUFBLEdBQUEsR0FBQSxFQUFBO0FBQ1EsWUFBUSxJQUFFLEdBQUssS0FBQyxDQUFBLENBQUEsRUFBQSxDQUFoQjs7QUFDSSxnQkFBSSxJQUFPLENBQUEsSUFBWDtBQUNBLGVBQU8sTUFBSyxDQUFJLFFBQWhCO0FBQ1EsWUFBQSxJQUFDLENBQUEsUUFBRCxLQUFpQixJQUFqQixHQUNJLDJCQUFtQixDQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxDQUR2QixHQUVJLGlCQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsRUFBNEIsSUFBNUIsQ0FGSjtBQUdwQjs7QUFFQSxlQUFBLE1BQUEsQ0FBQSxRQUFBO0FBQ29CLFlBQUEsd0JBQWlCLENBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLENBQWpCO0FBQ0E7O0FBRXBCLGVBQUEsTUFBQSxDQUFBLFFBQUE7QUFDb0IsWUFBQSxxQkFBaUIsQ0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsQ0FBakI7QUFDQTs7QUFFcEIsZUFBQSxNQUFBLENBQUEsV0FBQTtBQUNvQixZQUFBLG1CQUFtQixDQUFDLElBQUQsRUFBQyxJQUFELEVBQUMsSUFBRCxDQUFuQjtBQUNBO0FBakJSO0FBbUJaO0FBQ0E7O0FBRUEsYUFBQSxpQkFBQSxDQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBO0FBQ0ksVUFBQSxHQUFTLENBQUEsSUFBVCxFQUFTO0FBQ0YsWUFBSSxPQUFPLEdBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLENBQVg7QUFBQSxZQUNLLEdBQUEsR0FBQSxVQUFVLEVBRGY7QUFBQSxZQUN5QixDQUFBLEdBQUksVUFBTSxFQURuQztBQUFBLFlBQ21DLEdBQUEsR0FBQSxVQUFBLEVBRG5DO0FBQUEsWUFFSyxNQUFNLEdBQUEsVUFBYSxFQUZ4QjtBQUFBLFlBR0ssQ0FBQSxHQUFBLFVBQVMsRUFIZDtBQUFBLFlBR2MsR0FBVSxHQUFHLFVBQUEsRUFIM0I7QUFBQSxZQUcyQixNQUFBLEdBQUEsVUFBQSxFQUgzQjtBQUtYLFFBQUEsSUFBQSxDQUFBLElBQUEsQ0FDZ0IsR0FEaEIsRUFDcUIsT0FEckIsRUFDc0IsQ0FEdEIsRUFDc0IsTUFEdEIsRUFDc0IsR0FEdEIsRUFDc0IsR0FEdEIsRUFDc0IsR0FEdEIsRUFDc0IsVUFEdEIsRUFDc0IsTUFEdEIsRUFDc0IsT0FEdEIsRUFFZ0IsUUFGaEIsRUFFd0IsQ0FGeEIsRUFFNkIsR0FGN0IsRUFFaUMsR0FGakMsRUFFcUMsS0FGckMsRUFHaUIsTUFIakIsRUFHNEIsR0FINUIsRUFHaUMsR0FIakMsRUFHc0MsR0FIdEMsRUFHMEMsQ0FIMUMsRUFHNkMsTUFIN0MsRUFJb0IsS0FKcEIsRUFJMkIsTUFKM0IsRUFJaUMsWUFKakM7O0FBS0EsWUFBQSxHQUFBLENBQUEsSUFBQSxLQUEyQixHQUEzQixFQUFpQztBQUNsQixVQUFBLElBQUksQ0FBQSxJQUFKLENBQ00sWUFETixFQUNXLE1BRFgsRUFDVyxpQkFEWCxFQUVhLFdBRmIsRUFFdUIsTUFGdkIsRUFFK0IsTUFGL0IsRUFHaUIsR0FIakIsRUFHc0IsR0FIdEIsRUFHMEIsR0FIMUIsRUFHZ0MsVUFIaEMsRUFHeUMsTUFIekMsRUFHeUMsSUFIekMsRUFJZixHQUplLEVBS2EsUUFMYixFQU1jLE1BTmQsRUFNc0IsQ0FOdEIsRUFNc0IsTUFOdEIsRUFNc0IsTUFOdEIsRUFNc0IsS0FOdEIsRUFPcUIsS0FQckIsRUFPNEIsTUFQNUIsRUFPb0Msa0JBUHBDLEVBT2tELENBUGxELEVBT2tELE1BUGxELEVBUXdCLEdBUnhCLEVBUTRCLEdBUjVCLEVBUW1DLE1BUm5DLEVBUXNDLEdBUnRDLEVBUXNDLENBUnRDLEVBUXNDLElBUnRDO0FBU3lCLFVBQUEsbUJBQWtCLENBQUEsR0FBQSxFQUFPLEdBQVAsQ0FBbEI7QUFDeEMsVUFBQSxJQUFBLENBQUEsSUFBQSxDQUM4QixHQUQ5QixFQUVBLEdBRkEsRUFHQSxHQUhBLEVBSUEsR0FKQTtBQUtBLFNBaEJBLE1BaUJhO0FBQ0csVUFBQSxJQUFFLENBQUEsSUFBRixDQUNLLEdBREwsRUFDVSxHQURWLEVBQ1UsTUFEVixFQUNVLEdBRFYsRUFDVSxPQURWLEVBQ1UsSUFEVjtBQUVRLFVBQUEsbUJBQWtCLENBQUEsR0FBQSxFQUFLLEdBQUwsRUFBWSxNQUFaLEVBQW9CLEdBQXBCLENBQWxCO0FBQ3hCOztBQUNZLFFBQUEsSUFBQyxDQUFBLElBQUQsQ0FDSyxHQURMLEVBRVosR0FGWSxFQUdJLElBSEosRUFHUSxHQUhSLEVBR1EsR0FIUixFQUdRLFFBSFIsRUFHUSxNQUhSLEVBR1EsVUFIUixFQUdRLE1BSFIsRUFHUSxjQUhSLEVBSVEsZUFKUixFQUl5QixHQUp6QixFQUk4QixHQUo5QixFQUk4QixNQUo5QixFQUl3QyxLQUp4QyxFQUlrRCxHQUpsRCxFQUlrRCxVQUpsRCxFQUltRSxNQUpuRSxFQUl5RSxRQUp6RSxFQUl5RSxHQUp6RSxFQUl5RSxHQUp6RTtBQU1aLFFBQUEsV0FBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLE1BQUEsQ0FBQTtBQUNBO0FBQ0E7O0FBRUEsYUFBQSwyQkFBQSxDQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO0FBQ0ksVUFBUSxJQUFDLEdBQUEsR0FBQSxDQUFBLElBQVQ7QUFBQSxVQUNRLEdBQUEsR0FBTSxVQUFVLEVBRHhCO0FBQUEsVUFDd0IsTUFBQSxHQUFBLFVBQUEsRUFEeEI7QUFBQSxVQUN3QixTQUFBLEdBQUEsVUFBQSxFQUR4QjtBQUFBLFVBRVEsQ0FBQSxHQUFJLFVBQUUsRUFGZDtBQUFBLFVBRXdCLENBQUcsR0FBQyxVQUFTLEVBRnJDO0FBQUEsVUFFcUMsR0FBVSxHQUFHLFVBQVUsRUFGNUQ7QUFBQSxVQUdRLEdBQUcsR0FBQyxVQUFVLEVBSHRCO0FBQUEsVUFHNEIsR0FBRSxHQUFBLFVBQWMsRUFINUM7QUFLSixNQUFBLElBQUEsQ0FBQSxJQUFBLENBQ1ksR0FEWixFQUNpQixHQURqQixFQUNrQixPQURsQixFQUNrQixXQURsQixFQUNrQixHQURsQixFQUNrQixPQURsQixFQUVZLFFBRlosRUFFc0IsR0FGdEIsRUFFc0IsWUFGdEIsRUFHYSxNQUhiLEVBR3NCLEdBSHRCLEVBRzZCLEdBSDdCLEVBRzZCLFdBSDdCO0FBSUEsTUFBQSxJQUFBLEdBQ1ksSUFBQyxDQUFBLElBQUQsQ0FDSSxZQURKLEVBQ1UsTUFEVixFQUNVLGlCQURWLEVBQ1UsTUFEVixFQUNVLEtBRFYsQ0FEWixHQUdBLElBQWdCLENBQUMsSUFBakIsQ0FDZ0IsWUFEaEIsRUFDc0IsTUFEdEIsRUFDc0IsWUFEdEIsQ0FIQTtBQUtBLE1BQUEsSUFBQSxDQUFBLElBQUEsQ0FDa0IsU0FEbEIsRUFDa0IsT0FEbEIsRUFFb0IsV0FGcEIsRUFFaUMsTUFGakMsRUFFdUMsTUFGdkMsRUFHd0IsQ0FIeEIsRUFHd0IsTUFIeEIsRUFHaUMsR0FIakMsRUFHd0MsR0FIeEMsRUFHNkMsTUFIN0MsRUFHZ0QsVUFIaEQsRUFJd0IsUUFKeEIsRUFJa0MsQ0FKbEMsRUFJbUMsR0FKbkMsRUFJd0MsR0FKeEMsRUFJNkMsS0FKN0MsRUFLeUIsR0FMekIsRUFLaUMsR0FMakMsRUFLcUMsTUFMckMsRUFLOEMsR0FMOUMsRUFLa0QsQ0FMbEQsRUFLcUQsTUFMckQ7QUFNQSxNQUFBLElBQUEsSUFBQSxJQUFBLENBQUEsSUFBQSxDQUMwQixZQUQxQixFQUMwQixHQUQxQixFQUMwQixpQkFEMUIsQ0FBQTtBQUVnQyxNQUFBLG1CQUFtQixDQUFDLFNBQUQsRUFBVyxHQUFYLENBQW5CO0FBQ2hDLE1BQUEsSUFBQSxJQUFBLElBQUEsQ0FBQSxJQUFBLENBQzBCLEdBRDFCLENBQUE7QUFFQSxNQUFBLElBQUEsQ0FBQSxJQUFBLENBQ2tCLEdBRGxCLEVBRUEsR0FGQSxFQUdvQixRQUhwQjs7QUFJQSxVQUFBLElBQUEsRUFBQTtBQUNXLFlBQUksSUFBRyxLQUFBLEdBQVAsRUFBTztBQUNILFVBQUEsSUFBSyxDQUFBLElBQUwsQ0FDTSxHQUROLEVBQ1csR0FEWCxFQUNXLE1BRFgsRUFDVyxPQUFBLElBQUEsR0FBQSxLQURYO0FBRVMsVUFBQSxtQkFBa0IsQ0FBQSxHQUFBLEVBQU8sR0FBUCxDQUFsQjtBQUN4QjtBQUNBLE9BTkEsTUFPUztBQUNLLFFBQUEsbUJBQUEsQ0FBQSxHQUFBLEVBQUEsTUFBQSxDQUFBO0FBQ2QsUUFBQSxJQUFBLENBQUEsSUFBQSxDQUNzQixZQUR0QixFQUNzQixNQUR0QixFQUNzQixpQkFEdEI7QUFFQTs7QUFFQSxNQUFBLElBQUEsQ0FBQSxJQUFBLENBQ2tCLE1BRGxCLEVBQ2tCLENBRGxCLEVBQ2tCLE1BRGxCLEVBQ2tCLE1BRGxCLEVBQ2tCLEtBRGxCLEVBRWdDLEtBRmhDLEVBRXVDLE1BRnZDLEVBRStDLGtCQUYvQyxFQUU2RCxDQUY3RCxFQUU2RCxNQUY3RCxFQUdtQyxHQUhuQyxFQUd1QyxHQUh2QyxFQUc4QyxNQUg5QyxFQUdpRCxHQUhqRCxFQUdpRCxDQUhqRCxFQUdpRCxJQUhqRDtBQUlvQyxNQUFBLG1CQUFrQixDQUFBLFNBQUEsRUFBUSxHQUFSLENBQWxCO0FBQ0EsTUFBQSxJQUFBLEtBQUEsR0FBQSxJQUFBLG1CQUFrQyxDQUFFLEdBQUYsRUFBRSxHQUFGLENBQWxDO0FBQ3BDLE1BQUEsSUFBQSxDQUFBLElBQUEsQ0FDa0IsR0FEbEIsRUFFQSxHQUZBO0FBR0EsTUFBQSxJQUFBLElBQUEsSUFBQSxDQUFBLElBQUEsQ0FDcUIsR0FEckIsQ0FBQTtBQUVBLE1BQUEsSUFBQSxDQUFBLElBQUEsQ0FDa0IsR0FEbEIsRUFFb0IsU0FGcEIsRUFFd0IsWUFGeEIsRUFFd0IsR0FGeEIsRUFFd0IsaUJBRnhCLEVBRXdCLEdBRnhCLEVBRXdCLEdBRnhCLEVBRXdCLFNBRnhCLEVBRXdCLElBRnhCLEVBR0EsR0FIQSxFQUlBLEdBSkEsRUFLWSxJQUxaLEVBS2dCLEdBTGhCLEVBS2dCLEdBTGhCLEVBS2dCLEdBTGhCO0FBT0EsTUFBQSxXQUFBLENBQUEsR0FBQSxFQUFBLE1BQUEsRUFBQSxTQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsQ0FBQTtBQUNBOztBQUVBLGFBQUEsd0JBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQTtBQUNJLFVBQVEsTUFBQyxHQUFBLFVBQUEsRUFBVDtBQUFBLFVBQVMsQ0FBQSxHQUF5QixVQUFXLEVBQTdDO0FBQUEsVUFBaUQsR0FBRyxHQUFBLFVBQUEsRUFBcEQ7QUFBQSxVQUNRLElBQUEsR0FBTyxVQUFFLEVBRGpCO0FBQUEsVUFDMkIsT0FBUSxHQUFBLFVBQWMsRUFEakQ7QUFHSixNQUFBLElBQUEsQ0FBQSxJQUFBLENBQ1ksTUFEWixFQUNrQixPQURsQixFQUVZLENBRlosRUFFWSxNQUZaLEVBR1ksR0FIWixFQUdpQixHQUhqQixFQUdzQixHQUh0QixFQUdzQixVQUh0QixFQUlZLFFBSlosRUFJc0IsQ0FKdEIsRUFJeUIsR0FKekIsRUFJNkIsR0FKN0IsRUFJbUMsS0FKbkMsRUFLYSxPQUxiLEVBS3lCLEdBTHpCLEVBSzhCLEdBTDlCLEVBS21DLEdBTG5DLEVBS3NDLENBTHRDLEVBS3lDLE1BTHpDO0FBTWdCLE1BQUEsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFOLEVBQVcsSUFBWCxFQUFjLE9BQWQsQ0FBYjtBQUNoQixNQUFBLElBQUEsQ0FBQSxJQUFBLENBQ2EsYUFBSyxDQUFBLElBQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxDQURsQixFQUNrQixJQURsQixFQUNrQixNQURsQixFQUNrQixRQURsQixFQUNrQixPQURsQixFQUNrQixJQURsQixFQUVBLEdBRkEsRUFHWSxJQUhaLEVBR2dCLEdBSGhCLEVBR2dCLE1BSGhCLEVBR2dCLEdBSGhCO0FBS0EsTUFBQSxXQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsT0FBQSxFQUFBLElBQUEsQ0FBQTtBQUNBOztBQUVBLGFBQUEscUJBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQTtBQUNJLFVBQVEsU0FBQyxHQUFBLElBQUEsQ0FBQSxHQUFUO0FBQUEsVUFBOEIsT0FBOUI7QUFBQSxVQUFxQyxLQUFyQzs7QUFDSSxVQUFHLFNBQUMsQ0FBUyxHQUFiLEVBQWdCO0FBQ2IsWUFBQSxHQUFBLEdBQVUsVUFBTSxFQUFoQjtBQUNDLFFBQUEsYUFBVSxDQUFBLFNBQWEsQ0FBQSxHQUFiLEVBQWEsR0FBYixFQUFhLEdBQWIsQ0FBVjtBQUNBLFFBQUEsSUFBQSxDQUFBLElBQUEsQ0FDSSxHQURKLEVBQ1MsVUFEVCxFQUNVLEdBRFYsRUFDVSxHQURWLEVBQ1UsR0FEVixFQUNVLFdBRFYsRUFDVSxHQURWLEVBQ1UsSUFEVixFQUVJLElBRkosRUFFUyxHQUZULEVBRWMsR0FGZCxFQUVvQixHQUZwQixFQUV5QixHQUZ6QixFQUU4QixtQkFGOUIsRUFFaUQsR0FGakQsRUFFc0QsR0FGdEQsRUFFMkQsR0FGM0QsRUFFMkQsS0FGM0Q7QUFHWixRQUFBLFdBQXNCLENBQUEsR0FBQSxDQUF0QjtBQUNZLGVBQUEsS0FBQTtBQUNaLE9BUlEsTUFTQyxJQUFBLFNBQUEsQ0FBQSxPQUFBLEVBQUE7QUFDRyxZQUFHLFNBQUMsQ0FBUyxLQUFiLEVBQWM7QUFDWCxVQUFBLGFBQVUsQ0FBSyxTQUFHLENBQUEsT0FBUixFQUFRLE9BQUEsR0FBQSxVQUFBLEVBQVIsRUFBUSxHQUFSLENBQVY7QUFDQyxVQUFBLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBWCxFQUFrQixLQUFFLEdBQUEsVUFBVSxFQUE5QixFQUF3QyxHQUF4QyxDQUFiO0FBQ0EsVUFBQSxJQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsRUFBYyxHQUFkLEVBQWMsR0FBZCxFQUF3QixTQUF4QixFQUFxQyxPQUFyQyxFQUF1QyxHQUF2QyxFQUFpRCxLQUFqRCxFQUEwRCxJQUExRDtBQUNBLFVBQUEsV0FBVSxDQUFBLE9BQUEsRUFBVyxLQUFYLENBQVY7QUFDaEIsU0FMWSxNQU1DO0FBQ0csVUFBQSxhQUFFLENBQUEsU0FBQSxDQUFBLE9BQUEsRUFBQSxPQUFBLEdBQUEsVUFBQSxFQUFBLEVBQUEsR0FBQSxDQUFGO0FBQ0EsVUFBQSxJQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsRUFBYyxHQUFkLEVBQWMsR0FBZCxFQUF3QixTQUF4QixFQUFpQyxPQUFqQyxFQUEyQyxJQUEzQztBQUNBLFVBQUEsV0FBVSxDQUFBLE9BQUEsQ0FBVjtBQUNoQjtBQUNBLE9BWlMsTUFhQTtBQUNHLFFBQUEsYUFBRSxDQUFBLFNBQUEsQ0FBQSxLQUFBLEVBQUEsS0FBQSxHQUFBLFVBQUEsRUFBQSxFQUFBLEdBQUEsQ0FBRjtBQUNBLFFBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEVBQWMsR0FBZCxFQUFjLEdBQWQsRUFBd0IsV0FBeEIsRUFBdUMsS0FBdkMsRUFBdUMsSUFBdkM7QUFDQSxRQUFBLFdBQVUsQ0FBQSxLQUFBLENBQVY7QUFDWjtBQUNBOztBQUVBLGFBQUEsYUFBQSxDQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBO0FBQ0ksY0FBUyxJQUFBLENBQUEsSUFBVDtBQUNJLGFBQU8sTUFBSyxDQUFJLElBQWhCO0FBQ1EsVUFBQSxhQUFhLENBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxHQUFBLENBQWI7QUFDQTs7QUFFaEIsYUFBQSxNQUFBLENBQUEsV0FBQTtBQUNnQixVQUFBLG1CQUFtQixDQUFDLElBQUQsRUFBQyxJQUFELEVBQUMsR0FBRCxDQUFuQjtBQUNBOztBQUVoQixhQUFBLE1BQUEsQ0FBQSxlQUFBO0FBQ2dCLFVBQUEsdUJBQXVCLENBQUMsSUFBRCxFQUFDLElBQUQsRUFBQyxHQUFELENBQXZCO0FBQ0E7O0FBRWhCLGFBQUEsTUFBQSxDQUFBLFNBQUE7QUFDZ0IsVUFBQSxpQkFBaUIsQ0FBQyxJQUFELEVBQUMsSUFBRCxFQUFDLEdBQUQsQ0FBakI7QUFDQTs7QUFFaEIsYUFBQSxNQUFBLENBQUEsWUFBQTtBQUNnQixVQUFBLG9CQUFvQixDQUFDLElBQUQsRUFBQyxJQUFELEVBQUMsR0FBRCxDQUFwQjtBQUNBOztBQUVoQixhQUFBLE1BQUEsQ0FBQSxVQUFBO0FBQ2dCLFVBQUEsa0JBQWtCLENBQUMsSUFBRCxFQUFDLElBQUQsRUFBQyxHQUFELENBQWxCO0FBQ0E7O0FBRWhCLGFBQUEsTUFBQSxDQUFBLE9BQUE7QUFDZ0IsVUFBQSxJQUFDLENBQUEsSUFBRCxDQUFRLElBQVIsRUFBZ0IsR0FBaEI7QUFDQSxVQUFBLGdCQUFnQixDQUFBLElBQUssQ0FBQSxHQUFMLENBQWhCO0FBQ0EsVUFBQSxJQUFBLENBQUEsSUFBQSxDQUFBLEdBQUE7QUFDQTtBQTdCWjtBQStCSjs7QUFFQSxhQUFBLGdCQUFBLENBQUEsR0FBQSxFQUFBO0FBQ0ksTUFBQSxJQUFRLENBQUMsSUFBVCxDQUFTLE9BQUEsR0FBQSxLQUFvQixRQUFwQixHQUF1QixTQUFBLENBQUEsR0FBQSxDQUF2QixHQUF1QixHQUFBLEtBQUEsSUFBQSxHQUFBLE1BQUEsR0FBQSxHQUFoQztBQUNKOztBQUVBLGFBQUEsdUJBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQTtBQUNJLFVBQVEsSUFBQyxHQUFBLFVBQUEsRUFBVDtBQUFBLFVBQVMsSUFBd0IsR0FBQSxVQUFZLEVBQTdDO0FBQUEsVUFDUSxXQUFPLEdBQUEsVUFBYyxFQUQ3QjtBQUFBLFVBQ29DLFdBQVUsR0FBRyxVQUFBLEVBRGpEO0FBQUEsVUFFUSxDQUFBLEdBQUEsVUFBYyxFQUZ0QjtBQUFBLFVBRXNCLENBQUEsR0FBQSxVQUFjLEVBRnBDO0FBQUEsVUFHUSxJQUFJLEdBQUEsVUFBYSxFQUh6QjtBQUFBLFVBRzZCLElBQUMsR0FBQSxVQUFhLEVBSDNDO0FBQUEsVUFJUSxPQUFPLEdBQUEsSUFBQSxDQUFBLElBQUEsQ0FBYSxDQUFiLENBSmY7QUFBQSxVQUk2QixRQUFPLEdBQUEsSUFBVSxDQUFBLElBQVYsQ0FBYSxDQUFiLENBSnBDO0FBTUosTUFBQSxJQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsRUFBQSxVQUFBO0FBRUEsTUFBQSxhQUFBLENBQUEsT0FBQSxFQUFBLElBQUEsRUFBQSxHQUFBLENBQUE7QUFDUSxNQUFBLGFBQWEsQ0FBQyxRQUFELEVBQVUsSUFBVixFQUFnQixHQUFoQixDQUFiO0FBRVIsVUFBQSxhQUFBLEdBQUEsT0FBQSxDQUFBLElBQUEsS0FBQSxNQUFBLENBQUEsSUFBQTtBQUFBLFVBQ1ksaUJBQWdCLEdBQUEsUUFBWSxDQUFDLElBQWIsS0FBaUIsTUFBVyxDQUFDLE9BRHpEO0FBR0EsTUFBQSxJQUFBLENBQUEsSUFBQSxDQUFBLFdBQUEsRUFBQSxHQUFBO0FBQ1EsTUFBQSxhQUFVLEdBQUEsSUFBQSxDQUFBLElBQUEsQ0FBYSxPQUFiLENBQUEsR0FBa0IsSUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsQ0FBNUI7QUFFUixNQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsV0FBQSxFQUFBLEdBQUE7QUFDUSxNQUFBLGlCQUFVLEdBQUEsSUFBYSxDQUFBLElBQWIsQ0FBa0IsUUFBbEIsQ0FBQSxHQUFrQixJQUFBLENBQUEsSUFBQSxDQUFBLFFBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxDQUE1QjtBQUVSLE1BQUEsSUFBQSxDQUFBLElBQUEsQ0FDWSxLQURaO0FBRUEsTUFBQSxhQUFtQixJQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsV0FBQSxFQUFBLElBQUEsQ0FBbkI7QUFDUSxNQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxFQUFnQixrQkFBaEIsRUFDSyxJQURMLEVBQ2MsR0FEZCxFQUNrQixJQURsQixFQUN5QixNQUR6QixFQUVRLFdBRlIsRUFFbUIsVUFGbkIsRUFHUixHQUhRO0FBSVIsTUFBQSxpQkFBaUIsSUFBQSxJQUFBLENBQUEsSUFBQSxDQUNULEtBRFMsRUFDVCxXQURTLEVBQ1ksSUFEWixFQUNxQixJQURyQixFQUNzQixrQkFEdEIsRUFFRixJQUZFLEVBRUUsR0FGRixFQUVFLElBRkYsRUFFZSxNQUZmLEVBR0QsV0FIQyxFQUdVLFVBSFYsRUFJakIsR0FKaUIsQ0FBakI7QUFNQSxNQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxFQUFBLE1BQUEsRUFDWSxLQURaLEVBQ21CLFdBRG5CLEVBQzRCLEtBRDVCLEVBRWUsSUFGZixFQUVtQixHQUZuQixFQUVtQixJQUZuQixFQUVnQyxVQUZoQzs7QUFJQSxVQUFBLENBQUEsaUJBQUEsRUFBQTtBQUNZLFFBQUEsSUFBQSxDQUFBLElBQUEsQ0FDSSxLQURKLEVBQ1UsV0FEVixFQUNVLEtBRFYsRUFFTyxJQUZQLEVBRVcsR0FGWCxFQUVXLElBRlgsRUFFd0IsVUFGeEIsRUFHUSxRQUhSLEVBR2tCLENBSGxCLEVBR21CLEdBSG5CLEVBR3lCLElBSHpCLEVBRzJCLE1BSDNCLEVBR29DLElBSHBDLEVBR29DLEtBSHBDLEVBSVMsQ0FKVCxFQUljLE1BSmQsRUFLWSxRQUxaLEVBS3NCLENBTHRCLEVBS3NCLEdBTHRCLEVBS3NCLElBTHRCLEVBS3NCLEtBTHRCO0FBTWEsUUFBQSxjQUFpQixDQUFBLElBQUssQ0FBQyxFQUFOLEVBQVMsQ0FBQSxJQUFBLEVBQUksR0FBSixFQUFJLENBQUosRUFBSSxHQUFKLEVBQUksSUFBSixDQUFJLEVBQUosQ0FBVCxFQUFhLENBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsQ0FBQSxFQUFBLENBQWIsQ0FBakI7QUFDRyxRQUFBLElBQUEsQ0FBQSxJQUFBLENBQ0ksSUFESixFQUNVLFNBRFYsRUFFSSxRQUZKLEVBRzVCLEdBSDRCLEVBSUEsSUFKQSxFQUlJLENBSkosRUFJSSxHQUpKLEVBSzVCLEdBTDRCLEVBTUosSUFOSSxFQU1BLENBTkEsRUFNQSxHQU5BLEVBTzVCLEdBUDRCLEVBUTVCLEdBUjRCLEVBU1osUUFUWTtBQVU1Qjs7QUFDUSxNQUFBLElBQUMsQ0FBQSxJQUFELENBQ1UsUUFEVixFQUNVLENBRFYsRUFDVSxHQURWLEVBQ1UsSUFEVixFQUNVLEtBRFY7QUFFYSxNQUFBLGNBQWlCLENBQUEsSUFBSyxDQUFDLEVBQU4sRUFBUyxDQUFBLElBQUEsRUFBSSxHQUFKLEVBQUksQ0FBSixFQUFJLEdBQUosRUFBSSxJQUFKLENBQUksRUFBSixDQUFULEVBQWEsSUFBYixDQUFqQjtBQUNHLE1BQUEsSUFBQSxDQUFBLElBQUEsQ0FDSSxJQURKLEVBQ1UsU0FEVixFQUVJLFFBRkosRUFHeEIsR0FId0IsRUFJQSxJQUpBLEVBSUksQ0FKSixFQUlJLEdBSkosRUFLeEIsR0FMd0I7QUFPeEIsTUFBQSxpQkFBQSxJQUFBLElBQUEsQ0FBQSxJQUFBLENBQ1EsR0FEUixDQUFBO0FBR0EsTUFBQSxJQUFBLENBQUEsSUFBQSxDQUNZLEdBRFo7O0FBR0EsVUFBQSxDQUFBLGlCQUFBLEVBQUE7QUFDWSxRQUFBLElBQUEsQ0FBQSxJQUFBLENBQ0EsVUFEQSxFQUNVLFdBRFYsRUFDVSxLQURWLEVBRUMsSUFGRCxFQUVRLEdBRlIsRUFFWSxJQUZaLEVBRVksVUFGWixFQUdJLFFBSEosRUFHYyxDQUhkLEVBR2UsR0FIZixFQUdxQixJQUhyQixFQUd1QixLQUh2QjtBQUlLLFFBQUEsY0FBaUIsQ0FBQSxJQUFLLENBQUMsRUFBTixFQUFTLElBQVQsRUFBYSxDQUFBLElBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLENBQUEsRUFBQSxDQUFiLENBQWpCO0FBQ2pCLFFBQUEsSUFBQSxDQUFBLElBQUEsQ0FDc0IsSUFEdEIsRUFDc0IsU0FEdEIsRUFFd0IsUUFGeEIsRUFHQSxHQUhBLEVBSW9CLElBSnBCLEVBSXdCLENBSnhCLEVBSXdCLEdBSnhCLEVBS0EsR0FMQSxFQU1BLEdBTkE7QUFPQTs7QUFFQSxNQUFBLElBQUEsQ0FBQSxJQUFBLENBQ1ksUUFEWixFQUVhLElBRmIsRUFFcUIsR0FGckIsRUFFcUIsZUFBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxDQUZyQixFQUVxQixHQUZyQixFQUdBLEdBSEE7QUFLQSxNQUFBLFdBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxDQUFBO0FBQ0E7O0FBRUEsYUFBQSxjQUFBLENBQUEsRUFBQSxFQUFBLFFBQUEsRUFBQSxRQUFBLEVBQUE7QUFDSSxNQUFBLElBQVEsQ0FBQyxJQUFULENBQVMsS0FBVCxFQUFTLGVBQTJCLENBQUMsRUFBRCxDQUEzQixDQUE2QixRQUE3QixFQUF3QyxRQUF4QyxDQUFULEVBQWlELEtBQWpEO0FBQ0o7O0FBRUEsYUFBQSxvQkFBQSxDQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBO0FBQ0ksVUFBUSxhQUFDLEdBQUEsRUFBVDtBQUFBLFVBQ1EsSUFBQSxHQUFBLElBQUEsQ0FBQSxJQURSO0FBQUEsVUFDd0IsR0FBRyxHQUFBLElBQUEsQ0FBQSxNQUQzQjtBQUFBLFVBRVEsQ0FBQSxHQUFJLENBRlo7QUFBQSxVQUVlLEdBRmY7QUFJSixNQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxFQUFBLFVBQUE7O0FBQ1EsY0FBSyxJQUFLLENBQUEsRUFBVjtBQUNBLGFBQU8sSUFBUDtBQUNRLGlCQUFNLENBQUEsR0FBQSxHQUFOLEVBQU07QUFDTixZQUFBLGFBQWdCLENBQUEsSUFBaEIsQ0FBZ0IsR0FBQSxHQUFBLFVBQUEsRUFBaEI7QUFDSSxZQUFBLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBRCxDQUFMLEVBQVUsR0FBVixFQUFZLEdBQVosQ0FBYjtBQUNBLFlBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLEVBQWMsYUFBYyxDQUFHLElBQUUsQ0FBQSxDQUFBLEVBQUEsQ0FBTCxFQUFLLEdBQUwsQ0FBNUIsRUFBaUMsS0FBakM7QUFDcEI7O0FBQ2dCLFVBQUEsSUFBQyxDQUFBLElBQUQsQ0FBQyxJQUFELEVBQUMsU0FBRDtBQUNBOztBQUVoQixhQUFBLElBQUE7QUFDZ0IsaUJBQU0sQ0FBQSxHQUFBLEdBQU4sRUFBTTtBQUNOLFlBQUEsYUFBZ0IsQ0FBQSxJQUFoQixDQUFnQixHQUFBLEdBQUEsVUFBQSxFQUFoQjtBQUNJLFlBQUEsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFELENBQUwsRUFBVSxHQUFWLEVBQVksR0FBWixDQUFiO0FBQ0EsWUFBQSxJQUFBLENBQUEsSUFBQSxDQUNJLEtBREosRUFDVSxhQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLEdBQUEsQ0FEVixFQUNVLEtBRFYsRUFFTyxJQUZQLEVBRVcsU0FGWCxFQUdwQixHQUhvQjs7QUFJcEIsZ0JBQUEsQ0FBd0IsS0FBSyxDQUE3QixHQUE2QixHQUE3QixFQUE2QjtBQUNMLGNBQUEsSUFBSSxDQUFDLElBQUwsQ0FBUyxRQUFUO0FBQ3hCO0FBQ0E7O0FBQ2dCLFlBQUMsR0FBRDtBQUNBO0FBdkJSOztBQTBCUixhQUFBLEdBQUEsRUFBQSxFQUFBO0FBQ1EsUUFBQSxJQUFNLENBQUcsSUFBVCxDQUFjLEdBQWQ7QUFDUjs7QUFFQSxNQUFBLFdBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLGFBQUE7QUFDQTs7QUFFQSxhQUFBLGlCQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxHQUFBLEVBQUE7QUFDSSxVQUFRLElBQUMsR0FBQSxVQUFBLEVBQVQ7QUFBQSxVQUNRLElBQUksR0FBRyxVQUFVLEVBRHpCO0FBQUEsVUFFUSxJQUFJLEdBQUcsSUFBQSxDQUFBLElBRmY7QUFJSixNQUFBLGFBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsQ0FBQTtBQUNRLE1BQUEsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFELENBQUwsRUFBVSxJQUFWLEVBQWdCLEdBQWhCLENBQWI7QUFFUixNQUFBLElBQUEsQ0FBQSxJQUFBLENBQ1ksSUFEWixFQUNrQixHQURsQixFQUVZLGVBQVUsQ0FBQSxJQUFBLENBQUEsRUFBQSxDQUFWLENBQ0Esb0JBQXVCLENBQUUsSUFBQSxDQUFBLENBQUEsQ0FBRixFQUFFLElBQUYsQ0FEdkIsRUFFSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBRCxDQUFMLEVBQVUsSUFBVixDQUZ4QixDQUZaLEVBS0EsR0FMQTtBQU9BLE1BQUEsV0FBQSxDQUFBLElBQUEsRUFBQSxJQUFBLENBQUE7QUFDQTs7QUFFQSxhQUFBLGtCQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxHQUFBLEVBQUE7QUFDSSxVQUFRLEdBQUMsR0FBQSxVQUFBLEVBQVQ7QUFBQSxVQUNRLEdBQUcsR0FBRyxJQUFBLENBQUEsR0FEZDtBQUdKLE1BQUEsYUFBQSxDQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxDQUFBOztBQUVBLGNBQUEsSUFBQSxDQUFBLEVBQUE7QUFDUSxhQUFPLEdBQVA7QUFDUSxVQUFBLElBQUMsQ0FBSSxJQUFMLENBQUssSUFBTCxFQUFLLEtBQUwsRUFBSyxhQUFBLENBQUEsR0FBQSxFQUFBLEdBQUEsQ0FBQSxHQUFBLEdBQUw7QUFDQTs7QUFFaEIsYUFBQSxHQUFBO0FBQ2dCLFVBQUEsSUFBQyxDQUFJLElBQUwsQ0FBSyxJQUFMLEVBQUssS0FBTCxFQUFLLG9CQUFBLENBQUEsR0FBQSxFQUFBLEdBQUEsQ0FBQSxHQUFBLEdBQUw7QUFDQTtBQVBoQjs7QUFVQSxNQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUE7QUFDQTs7QUFFQSxhQUFBLG1CQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxHQUFBLEVBQUE7QUFDSSxVQUFRLE9BQUMsR0FBQSxFQUFUO0FBQUEsVUFDUSxJQUFBLEdBQU8sSUFBRyxDQUFBLElBRGxCO0FBQUEsVUFFUSxHQUFBLEdBQU0sSUFBQyxDQUFJLE1BRm5CO0FBQUEsVUFHUSxDQUFBLEdBQUksQ0FIWjs7QUFLSixhQUFBLENBQUEsR0FBQSxHQUFBLEVBQUE7QUFDUSxRQUFBLE9BQVUsQ0FBQSxJQUFWLENBQWdCLFVBQUEsRUFBaEI7QUFDSSxRQUFBLGFBQWEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEVBQVUsT0FBSSxDQUFBLENBQUEsRUFBQSxDQUFkLEVBQWMsR0FBZCxDQUFiO0FBQ1o7O0FBRUEsTUFBQSxJQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsRUFBQSxnQkFBQSxFQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsSUFBQTtBQUVBLE1BQUEsV0FBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsT0FBQTtBQUNBOztBQUVBLGFBQUEsU0FBQSxDQUFBLENBQUEsRUFBQTtBQUNJLGFBQVMsT0FBUyxDQUFDLENBQUMsT0FBRixDQUFLLEtBQUwsRUFBSyxNQUFMLEVBQUssT0FBTCxDQUFLLElBQUwsRUFBSyxNQUFMLENBQVQsR0FBYyxJQUF2QjtBQUNKOztBQUVBLGFBQUEsbUJBQUEsQ0FBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLE1BQUEsRUFBQSxHQUFBLEVBQUE7QUFDSSxNQUFBLElBQVEsQ0FBQyxJQUFULENBQ1EsWUFEUixFQUNjLEdBRGQsRUFDYyxvQkFEZCxFQUVZLFdBRlosRUFFeUIsR0FGekIsRUFFMkIsTUFGM0I7O0FBR0osVUFBQSxNQUFBLEVBQW1CO0FBQ1IsUUFBQSxJQUFBLENBQU0sSUFBTixDQUNNLEdBRE4sRUFDVyxNQURYO0FBRWEsUUFBQSxpQkFBUyxDQUFBLE1BQUEsRUFBQSxHQUFBLENBQVQ7QUFDeEIsUUFBQSxJQUFBLENBQUEsSUFBQSxDQUNzQixHQUR0QjtBQUVBOztBQUNRLE1BQUEsSUFBQyxDQUFBLElBQUQsQ0FDVSxHQURWLEVBQ1UsR0FEVixFQUNVLEdBRFYsRUFDVSxVQURWLEVBQ1UsR0FEVixFQUNVLFVBRFYsRUFDVSxHQURWLEVBQ1UsS0FEVixFQUNVLEdBRFYsRUFDVSxVQURWLEVBQ1UsR0FEVixFQUVSLEdBRlEsRUFHUSxRQUhSO0FBSVIsTUFBQSxNQUFBLElBQWlCLElBQUssQ0FBQSxJQUFMLENBQ0MsS0FERCxFQUNVLE1BRFYsRUFDVyxZQURYLEVBRU0sR0FGTixFQUVVLGlCQUZWLEVBRStCLEdBRi9CLEVBRStCLEdBRi9CLEVBRStCLE1BRi9CLEVBRStCLElBRi9CLEVBR08sTUFIUCxFQUdlLE9BSGYsRUFJakIsR0FKaUIsQ0FBakI7QUFLb0IsTUFBQSxpQkFBSyxDQUFBLEdBQUEsRUFBQSxHQUFBLENBQUw7QUFDcEIsTUFBQSxJQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsRUFDYSxHQURiLEVBRUEsR0FGQTtBQUdBOztBQUVBLGFBQUEsaUJBQUEsQ0FBQSxHQUFBLEVBQUEsR0FBQSxFQUFBO0FBQ0ksTUFBQSxJQUFRLENBQUMsSUFBVCxDQUFTLEdBQVQsRUFBUyxVQUFULEVBQStCLEdBQS9CLEVBQW9DLFFBQXBDLEVBQXNDLEdBQXRDLEVBQXNDLEtBQXRDLEVBQXNDLEdBQXRDLEVBQXNDLE9BQXRDLEVBQXNDLEdBQXRDO0FBQ0o7O0FBRUEsYUFBQSxhQUFBLENBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQTtBQUNJLGNBQVMsR0FBQSxDQUFBLElBQVQ7QUFDSSxhQUFPLE1BQVEsQ0FBQyxZQUFoQjtBQUNRLGlCQUFPLE9BQVA7O0FBRWhCLGFBQUEsTUFBQSxDQUFBLE9BQUE7QUFDZ0IsaUJBQU8sT0FBQyxPQUFSOztBQUVoQixhQUFBLE1BQUEsQ0FBQSxJQUFBO0FBQ2dCLGlCQUFPLE9BQU0sR0FBQSxhQUFiOztBQUVoQjtBQUNZLGlCQUFRLENBQUEsVUFBQSxFQUFBLE9BQUEsRUFBQSxnQkFBQSxFQUNKLE9BREksRUFDTSxHQUROLEVBRUEsUUFGQSxFQUVTLE9BRlQsRUFFYSxJQUZiLEVBRWEsT0FGYixFQUVhLGtCQUZiLEVBRWEsT0FGYixFQUVhLEdBRmIsRUFFYSxJQUZiLENBRWEsRUFGYixDQUFSO0FBWFI7QUFlSjs7QUFFQSxhQUFBLG9CQUFBLENBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQTtBQUNJLGNBQVMsR0FBQSxDQUFBLElBQVQ7QUFDSSxhQUFPLE1BQVEsQ0FBQyxPQUFoQjtBQUNRLGlCQUFPLE9BQVA7O0FBRWhCLGFBQUEsTUFBQSxDQUFBLElBQUE7QUFDZ0IsaUJBQU8sT0FBTSxHQUFBLEtBQWI7O0FBRWhCO0FBQ1ksaUJBQVEsQ0FBQSxTQUFBLEVBQUEsT0FBQSxFQUFBLElBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBUjtBQVJSO0FBVUo7O0FBRUEsYUFBQSxnQkFBQSxDQUFBLElBQUEsRUFBQSxJQUFBLEVBQUE7QUFDSSxhQUFTLENBQUEsU0FBQSxFQUFBLElBQUEsRUFBaUIseUJBQWpCLEVBQThCLElBQTlCLEVBQThCLGlCQUE5QixFQUNMLElBREssRUFDSSxXQURKLEVBQ2tCLElBRGxCLEVBQ3dCLFNBRHhCLEVBQ2tDLElBRGxDLENBQ3FDLEVBRHJDLENBQVQ7QUFFSjs7QUFFQSxhQUFBLFVBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ0ksYUFBUyxDQUFBLElBQUEsRUFBQSxZQUFBLEVBQXVCLElBQXZCLEVBQXdCLFlBQXhCLEVBQ0wsSUFESyxFQUNHLG9DQURILEVBQzBDLElBRDFDLEVBQzBDLGtDQUQxQyxFQUMwQyxJQUQxQyxDQUMwQyxFQUQxQyxDQUFUO0FBRUo7O0FBRUEsYUFBQSxjQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsRUFBQTtBQUNJLGFBQVMsQ0FBQSxTQUFBLEVBQWMsSUFBZCxFQUFvQix5QkFBcEIsRUFBNEIsSUFBNUIsRUFBNEIsaUJBQTVCLEVBQ0wsSUFESyxFQUNJLFlBREosRUFDbUIsSUFEbkIsRUFDeUIsWUFEekIsRUFFRCxJQUZDLEVBRUssZUFGTCxFQUVtQixJQUZuQixFQUUyQixPQUYzQixFQUVrQyxJQUZsQyxFQUVzQyxXQUZ0QyxFQUVzQyxJQUZ0QyxFQUVzQyxTQUZ0QyxFQUVzQyxJQUZ0QyxDQUVzQyxFQUZ0QyxDQUFUO0FBR0o7O0FBRUEsYUFBQSxRQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsRUFBQTtBQUNJLGFBQVMsQ0FBQSxJQUFBLEVBQVMsWUFBVCxFQUFzQixJQUF0QixFQUFzQixZQUF0QixFQUNMLEdBREssRUFDRyxJQURILEVBQ1MsR0FEVCxFQUNhLElBRGIsRUFDa0Isd0JBRGxCLEVBQzBDLEdBRDFDLEVBQzBDLElBRDFDLEVBQzBDLEdBRDFDLEVBQzBDLElBRDFDLEVBQzBDLHdCQUQxQyxFQUVELEdBRkMsRUFFSSxJQUZKLEVBRVUsOEJBRlYsRUFFMEMsR0FGMUMsRUFFK0MsSUFGL0MsRUFFb0Qsc0JBRnBELEVBR0QsSUFIQyxFQUdJLFdBSEosRUFHWSxJQUhaLEVBR3VCLFNBSHZCLEVBRzJCLElBSDNCLENBR3NDLEVBSHRDLENBQVQ7QUFJSjs7QUFFQSxhQUFBLGNBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ0ksYUFBUyxDQUFBLFNBQUEsRUFBYyxJQUFkLEVBQW9CLHlCQUFwQixFQUE0QixJQUE1QixFQUE0QixpQkFBNUIsRUFDTCxJQURLLEVBQ0ksV0FESixFQUNrQixJQURsQixFQUN3QixRQUR4QixFQUNrQyxJQURsQyxDQUNxQyxFQURyQyxDQUFUO0FBRUo7O0FBRUEsYUFBQSxRQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsRUFBQTtBQUNJLGFBQVMsQ0FBQSxJQUFBLEVBQVMsYUFBVCxFQUFzQixJQUF0QixFQUFzQixZQUF0QixFQUNMLElBREssRUFDRyxvQ0FESCxFQUMyQyxJQUQzQyxFQUMyQyxpQ0FEM0MsRUFDMkMsSUFEM0MsQ0FDMkMsRUFEM0MsQ0FBVDtBQUVKOztBQUVBLFFBQUEsZUFBQSxHQUFBO0FBQ1EsYUFBQSxXQUFtQixJQUFuQixFQUFtQixJQUFuQixFQUFtQjtBQUNmLGVBQVEsSUFBQSxHQUFTLEtBQVQsR0FBZSxJQUF2QjtBQUNaLE9BSEE7QUFLQSxZQUFBLFdBQUEsSUFBQSxFQUFBLElBQUEsRUFBQTtBQUNnQixlQUFHLENBQUEsU0FBQSxFQUFlLElBQWYsRUFBc0IseUJBQXRCLEVBQXNCLElBQXRCLEVBQXNCLGVBQXRCLEVBQ0gsSUFERyxFQUNNLG9CQUROLEVBQzRCLElBRDVCLEVBQ21DLHFCQUNsQyxJQUZELEVBRU8sSUFGUCxFQUVTLElBRlQsRUFFUyxJQUZULENBRXVCLEVBRnZCLENBQUg7QUFHaEIsT0FUQTtBQVdBLFlBQUEsV0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ2dCLGVBQUcsSUFBUSxHQUFDLElBQVQsR0FBZSxJQUFsQjtBQUNoQixPQWJBO0FBZUEsV0FBQSxXQUFBLElBQUEsRUFBQSxJQUFBLEVBQUE7QUFDZ0IsZUFBRSxJQUFTLEdBQUEsR0FBVCxHQUFlLElBQWpCO0FBQ2hCLE9BakJBO0FBbUJBLFlBQUEsV0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ2dCLGVBQUcsSUFBUSxHQUFDLElBQVQsR0FBZSxJQUFsQjtBQUNoQixPQXJCQTtBQXVCQSxXQUFBLFdBQUEsSUFBQSxFQUFBLElBQUEsRUFBQTtBQUNnQixlQUFFLElBQVMsR0FBQSxHQUFULEdBQWUsSUFBakI7QUFDaEIsT0F6QkE7QUEyQkEsYUFBQSxXQUFBLElBQUEsRUFBQSxJQUFBLEVBQUE7QUFDWSxlQUFRLElBQUEsR0FBUyxLQUFULEdBQWUsSUFBdkI7QUFDWixPQTdCQTtBQStCQSxZQUFBLFdBQUEsSUFBQSxFQUFBLElBQUEsRUFBQTtBQUNnQixlQUFHLElBQVEsR0FBQyxJQUFULEdBQWUsSUFBbEI7QUFDaEIsT0FqQ0E7QUFtQ0EsYUFBQSxnQkFuQ0E7QUFxQ0EsYUFBQSxXQUFBLElBQUEsRUFBQSxJQUFBLEVBQUE7QUFDWSxlQUFRLGdCQUFtQixDQUFDLElBQUQsRUFBRyxJQUFILENBQTNCO0FBQ1osT0F2Q0E7QUF5Q0EsWUFBQSxVQXpDQTtBQTJDQSxZQUFBLFdBQUEsSUFBQSxFQUFBLElBQUEsRUFBQTtBQUNnQixlQUFHLFVBQWMsQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUFqQjtBQUNoQixPQTdDQTtBQStDQSxhQUFBLGNBL0NBO0FBaURBLGFBQUEsV0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ1ksZUFBUSxjQUFlLENBQUEsSUFBQSxFQUFPLElBQVAsQ0FBdkI7QUFDWixPQW5EQTtBQXFEQSxZQUFBLFFBckRBO0FBdURBLFlBQUEsV0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ2dCLGVBQUcsUUFBUyxDQUFJLElBQUosRUFBVSxJQUFWLENBQVo7QUFDaEIsT0F6REE7QUEyREEsYUFBQSxjQTNEQTtBQTZEQSxhQUFBLFdBQUEsSUFBQSxFQUFBLElBQUEsRUFBQTtBQUNZLGVBQVEsY0FBZSxDQUFBLElBQUEsRUFBTyxJQUFQLENBQXZCO0FBQ1osT0EvREE7QUFpRUEsWUFBQSxXQUFBLElBQUEsRUFBQSxJQUFBLEVBQUE7QUFDZ0IsZUFBRyxRQUFTLENBQUksSUFBSixFQUFVLElBQVYsQ0FBWjtBQUNoQixPQW5FQTtBQXFFQSxZQUFBLFFBckVBO0FBdUVBLFdBQUEsV0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ2dCLGVBQUUsSUFBUyxHQUFBLEdBQVQsR0FBZSxJQUFqQjtBQUNoQixPQXpFQTtBQTJFQSxXQUFBLFdBQUEsSUFBQSxFQUFBLElBQUEsRUFBQTtBQUNnQixlQUFFLElBQVMsR0FBQSxHQUFULEdBQWUsSUFBakI7QUFDaEIsT0E3RUE7QUErRUEsV0FBQSxXQUFBLElBQUEsRUFBQSxJQUFBLEVBQUE7QUFDZ0IsZUFBRSxJQUFTLEdBQUEsR0FBVCxHQUFlLElBQWpCO0FBQ2hCLE9BakZBO0FBbUZBLFdBQUEsV0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ2dCLGVBQUUsSUFBUyxHQUFBLEdBQVQsR0FBZSxJQUFqQjtBQUNoQixPQXJGQTtBQXVGQSxXQUFBLFdBQUEsSUFBQSxFQUFBLElBQUEsRUFBQTtBQUNnQixlQUFFLElBQVMsR0FBQSxHQUFULEdBQWUsSUFBakI7QUFDaEI7QUF6RkEsS0FBQTtBQTRGQSxXQUFBLFNBQUE7QUFDQSxHQXBwQkEsRUFBQTs7QUFzcEJBLFdBQUEsT0FBQSxDQUFBLElBQUEsRUFBQTtBQUNBLFdBQVMsUUFBUSxDQUFBLFlBQUEsRUFBTyxTQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFQLENBQWpCO0FBQ0E7O0FBRUEsTUFBQSxLQUFBLEdBQUEsRUFBQTtBQUFBLE1BQ0ksU0FBUSxHQUFHLEVBRGY7QUFBQSxNQUVJLE1BQUEsR0FBUztBQUNULElBQUEsU0FBVSxFQUFBO0FBREQsR0FGYjtBQUFBLE1BS0ksY0FBRSxHQUFBO0FBQ0YsSUFBQSxTQUFBLEVBQWdCLG1CQUFFLE1BQUYsRUFBRSxNQUFGLEVBQUU7QUFDZCxVQUFBLE1BQVksR0FBQSxNQUFaLElBQXFCLFNBQWMsQ0FBQyxNQUFmLEdBQWlCLE1BQXRDLEVBQXNDO0FBQy9CLFlBQUEsV0FBZ0IsR0FBRyxTQUFTLENBQUMsTUFBVixDQUFpQixDQUFqQixFQUFtQixTQUFTLENBQUEsTUFBVCxHQUFTLE1BQTVCLENBQW5CO0FBQUEsWUFDSyxDQUFBLEdBQUEsV0FBYyxDQUFBLE1BRG5COztBQUdmLGVBQUEsQ0FBQSxFQUFBLEVBQUE7QUFDZ0IsaUJBQVcsS0FBQyxDQUFBLFdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBWjtBQUNoQjtBQUNBO0FBQ0E7QUFWTSxHQUxOOztBQWtCQSxNQUFBLElBQUEsR0FBQSxTQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUEsR0FBQSxFQUFBLE1BQUEsRUFBQTtBQUNJLFFBQUEsQ0FBSSxLQUFHLENBQUEsSUFBQSxDQUFQLEVBQWdCO0FBQ1osTUFBQSxLQUFLLENBQUMsSUFBRCxDQUFMLEdBQWMsT0FBQSxDQUFBLElBQUEsQ0FBZDs7QUFDQSxVQUFBLFNBQVksQ0FBQyxJQUFiLENBQWMsSUFBZCxJQUEwQixNQUFFLENBQUEsU0FBNUIsRUFBNEI7QUFDekIsZUFBQSxLQUFVLENBQUksU0FBUyxDQUFBLEtBQVQsRUFBSixDQUFWO0FBQ1g7QUFDQTs7QUFFQSxXQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUEsTUFBQSxJQUFBLEVBQUEsQ0FBQTtBQUNBLEdBVEE7O0FBV0EsRUFBQSxJQUFBLENBQUEsT0FBQSxHQUFBLE9BQUE7O0FBRUEsRUFBQSxJQUFBLENBQUEsTUFBQSxHQUFBLFVBQUEsT0FBQSxFQUFBO0FBQ0ksUUFBQyxDQUFBLFNBQVMsQ0FBQSxNQUFWLEVBQW1CO0FBQ2YsYUFBQSxNQUFBO0FBQ1I7O0FBRUEsU0FBQSxJQUFBLElBQUEsSUFBQSxPQUFBLEVBQUE7QUFDUSxVQUFHLE9BQU0sQ0FBRSxjQUFSLENBQW1CLElBQW5CLENBQUgsRUFBc0I7QUFDbkIsUUFBQSxjQUFRLENBQUEsSUFBQSxDQUFSLElBQXVCLGNBQVksQ0FBQSxJQUFBLENBQVosQ0FBbUIsTUFBUSxDQUFBLElBQUEsQ0FBM0IsRUFBbUMsT0FBUyxDQUFDLElBQUQsQ0FBNUMsQ0FBdkI7QUFDQyxRQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsR0FBZSxPQUFNLENBQUUsSUFBRixDQUFyQjtBQUNaO0FBQ0E7QUFDQSxHQVhBOztBQWFBLEVBQUEsSUFBQSxDQUFBLE9BQUEsR0FBQSxPQUFBO0FBRUEsRUFBQSxJQUFBLENBQUEsS0FBQSxHQUFBLElBQUE7O0FBRUEsTUFBQSxPQUFBLE1BQUEsS0FBQSxRQUFBLElBQUEsT0FBQSxNQUFBLENBQUEsT0FBQSxLQUFBLFFBQUEsRUFBQTtBQUNHLElBQUEsTUFBTyxDQUFBLE9BQVAsR0FBa0IsSUFBbEI7QUFDSCxHQUZBLE1BR0MsSUFBQSxPQUFBLE9BQUEsS0FBQSxRQUFBLEVBQUE7QUFDRyxJQUFBLE9BQUksQ0FBQSxNQUFKLENBQVcsUUFBWCxFQUF3QixVQUFVLE9BQVYsRUFBVTtBQUNsQyxNQUFBLE9BQVEsQ0FBQSxJQUFBLENBQVI7QUFDSixLQUZJO0FBR0osR0FKQyxNQUtBLElBQUEsT0FBQSxNQUFBLEtBQUEsVUFBQSxFQUFBO0FBQ0csSUFBQSxNQUFJLENBQUEsVUFBTyxPQUFQLEVBQW1CLE9BQW5CLEVBQThCLE1BQTlCLEVBQStCO0FBQ25DLE1BQUEsTUFBTyxDQUFBLE9BQVAsR0FBZ0IsSUFBaEI7QUFDSixLQUZRLENBQUo7QUFHSixHQUpDLE1BS0E7QUFDRyxJQUFBLE1BQUUsQ0FBQSxNQUFGLEdBQUUsSUFBRjtBQUNKO0FBRUEsQ0RqaENBOztBRW5XQSxJQUFBLENBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxVQUFBLEVBQ0E7QUFDQyxFQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsVUFBQSxHQUFBLFVBQUEsQ0FBQSxFQUNBO0FBQ0MsUUFBQSxJQUFBLEdBQUEsc0JBQUE7QUFFRixXQUFBLEtBQUEsT0FBQSxDQUFBLENBQUEsRUFBQSxJQUFBLE1BQUEsSUFBQTtBQUNFLEdBTEQ7QUFNQTs7QUFJRCxJQUFBLENBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxRQUFBLEVBQ0E7QUFDQyxFQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsUUFBQSxHQUFBLFVBQUEsQ0FBQSxFQUNBO0FBQ0MsUUFBQSxJQUFBLEdBQUEsS0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLE1BQUE7QUFFRixXQUFBLEtBQUEsT0FBQSxDQUFBLENBQUEsRUFBQSxJQUFBLE1BQUEsSUFBQTtBQUNFLEdBTEQ7QUFNQTs7QUFNRCxJQUFBLHdCQUFBLEdBQUEsTUFBQSxDQUFBLElBQUE7QUFDQSxJQUFJLHdCQUF3QixHQUFHLE1BQU0sQ0FBQyxJQUF0Qzs7QUFJQSxNQUFBLENBQUEsSUFBQSxHQUFBLFVBQUEsRUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLEVBQ0E7QUFDQyxTQUFBLHdCQUFBLENBQUEsRUFBQSxFQUFBLE9BQUEsR0FBQSxVQUFBLEtBQUEsRUFBQSxLQUFBO0FBQUEsV0FBQSxRQUFBLENBQUEsSUFBQSxDQUFBLE9BQUEsRUFBQSxLQUFBLEVBQUEsS0FBQSxDQUFBO0FBQUEsR0FBQSxHQUFBLFFBQUEsQ0FBQTtBQUNBLENBSEQ7O0FBT0EsTUFBQSxDQUFBLElBQUEsR0FBQSxVQUFBLFFBQUEsRUFDQTtBQUNDLE1BQUEsT0FBQSxRQUFBLEtBQUEsUUFBQSxJQUVHLFFBQUUsQ0FBQSxRQUFGLEtBQUUsT0FGTCxFQUdHO0FBQ0YsUUFBRyxNQUFBLEdBQUEsQ0FBQSxDQUFBLFFBQUEsRUFBSDs7QUFERSwyQkFHSixTQUFBLENBQUEsS0FBQSxDQUNFLENBQUEsU0FBQSxFQUFPLEtBQVAsQ0FERixFQUVHLENBQUEsTUFBQSxFQUFTLEVBQVQsQ0FGSCxFQUdHLFFBSEgsQ0FISTtBQUFBLFFBR0osT0FISTtBQUFBLFFBR0osR0FISTs7QUFXSixRQUFBLEdBQUEsRUFDRTtBQUNDLE1BQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxrREFBQSxHQUFBLEdBQUEsV0FBQSxFQUFBLE9BQUEsR0FBQSxJQUFBLENBQUEsWUFBQTtBQUVILFFBQUEsTUFBQSxDQUFBLFdBQUEsQ0FBQSxPQUFBO0FBQ0ksT0FIRDtBQUlBLEtBTkgsTUFRRTtBQUNDLE1BQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxPQUFBO0FBQ0E7O0FBSUgsV0FBQSxNQUFBLENBQUEsT0FBQSxFQUFBO0FBQ0UsR0E3QkQsTUErQkE7QUFHRCxXQUFBLHdCQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsRUFBQSxTQUFBLENBQUE7QUFHRTtBQUNELENBeENEOztBQTRDQSxNQUFBLENBQUEsRUFBQSxDQUFBLE1BQUEsQ0FBQTtBQUdBLEVBQUEsWUFBQSxFQUFBLHNCQUFBLFFBQUEsRUFDQztBQUNDLFdBQUEsS0FBQSxJQUFBLENBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUE7QUFDQSxHQU5GO0FBVUEsRUFBQSxlQUFBLEVBQUEsMkJBQ0M7QUFDQyxRQUFBLE1BQUEsR0FBQSxFQUFBO0FBRUYsU0FBQSxjQUFBLEdBQUEsT0FBQSxDQUFBLFVBQUEsSUFBQSxFQUFBO0FBRUEsVUFBQSxJQUFBLENBQUEsSUFBQSxJQUFBLE1BQUEsRUFDRztBQUNDLFlBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxRQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsaUJBQUEsRUFDQTtBQUNDLFVBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLENBQUE7QUFDQTs7QUFFTCxRQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLElBQUEsRUFBQTtBQUNJLE9BUkosTUFVRztBQUNDLFFBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsS0FBQSxJQUFBLEVBQUE7QUFDQTtBQUNELEtBZkg7QUFpQkEsV0FBQSxNQUFBO0FBQ0U7QUFoQ0YsQ0FBQTtBQXlDQSxJQUFBLHlCQUFBLEdBQUEsSUFBQTtBQUlBLENBQUEsQ0FBQSxRQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsZUFBQSxFQUFBLFFBQUEsRUFBQSxVQUFBLENBQUEsRUFBQTtBQUVBLE1BQUEsRUFBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsYUFBQSxDQUFBO0FBRUEsRUFBQSxVQUFBLENBQUEsWUFBQTtBQUVBLElBQUEsQ0FBQSxDQUFBLDZCQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsU0FBQSxFQUFBLHlCQUFBLEVBQUE7QUFDYSxJQUFBLEVBQU0sQ0FBZ0IsR0FBdEIsQ0FBeUIsU0FBekIsRUFBcUMseUJBQXlCLEVBQTlEO0FBRWIsR0FMQSxFQUtBLEVBTEEsQ0FBQTtBQU1DLENBVkQ7O0FDL0hBLFNBQUEsaUJBQUEsQ0FBQSxLQUFBLEVBQUEsQ0FBQSxFQUNBO0FBQ0MsTUFBQSxNQUFBLEdBQUEsTUFBQTtBQUVELE1BQUEsS0FBQSxHQUFBLEtBQUEsQ0FBQSxLQUFBLENBQUEsV0FBQSxDQUFBO0FBQUEsTUFBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBOztBQUVBLE9BQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQ0M7QUFDQyxRQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFDQTtBQUNDLE1BQUEsTUFBQSxHQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQSxLQUhELE1BS0E7QUFDQyxNQUFBLE1BQUEsR0FBQSxNQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQTtBQUNBO0FBQ0Q7O0FBRUYsRUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUNDOztBQUlELFNBQUEsZ0JBQUEsQ0FBQSxLQUFBLEVBQUEsQ0FBQSxFQUNBO0FBQ0MsTUFBQSxNQUFBLEdBQUEsTUFBQTtBQUVELE1BQUEsS0FBQSxHQUFBLEtBQUEsQ0FBQSxLQUFBLENBQUEsV0FBQSxDQUFBO0FBQUEsTUFBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBOztBQUVBLE9BQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQ0M7QUFDQyxRQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFDQTtBQUNDLE1BQUEsTUFBQSxHQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQSxLQUhELE1BS0E7QUFDQyxZQUFBLE1BQUEsS0FBQSxHQUFBLE1BQUEsR0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsaUJBQUE7QUFDQTtBQUNEOztBQUVGLEVBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUE7QUFDQzs7QUFZRCxTQUFBLGFBQUEsQ0FBQSxLQUFBLEVBQUEsTUFBQSxFQUNBO0FBQ0MsTUFBQSxDQUFBLE1BQUEsRUFDQTtBQUNDLElBQUEsTUFBQSxHQUFBLEVBQUE7QUFDQTs7QUFJRixFQUFBLE1BQUEsQ0FBQSxLQUFBLEdBQUEsS0FBQTs7QUFJQSxFQUFBLGlCQUFBLENBQUEsS0FBQSxFQUFBLE1BQUEsQ0FBQTs7QUFJQSxNQUFBLE1BQUEsQ0FBQSxDQUFBLEVBQ0M7QUFDQyxJQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxDQUFBLE1BQUE7QUFDQTtBQUdE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Q0MsSUFBQSxDQUFBLENBQUEsY0FBQTtBQUlGLFFBQUEsTUFBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsZUFBQSxFQUFBO0FBSUEsSUFBQSxTQUFBLENBQUEsSUFBQTtBQUVBLElBQUEsVUFBQSxDQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsT0FBQSxDQUFBLEVBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxFQUFBLE1BQUEsQ0FBQSxZQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsV0FBQSxDQUFBLEVBQUEsTUFBQSxDQUFBLE9BQUEsQ0FBQSxFQUFBLFlBQUEsTUFBQSxFQUFBLFdBQUEsTUFBQSxFQUFBLElBQUEsQ0FBQSxVQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7QUFFQSxNQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsT0FBQTtBQUVBLEtBSkEsRUFJQSxVQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7QUFFQSxNQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsT0FBQTtBQUNHLEtBUEg7QUFVRSxHQWwyQkY7QUFzMkJBLEVBQUEsZUFBQSxFQUFBLHlCQUFBLENBQUEsRUFDQztBQUFBOztBQUNDLElBQUEsQ0FBQSxDQUFBLGNBQUE7QUFJRixRQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLGVBQUEsRUFBQTtBQUlBLElBQUEsU0FBQSxDQUFBLElBQUE7QUFFQSxJQUFBLFVBQUEsQ0FBQSxTQUFBLENBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxFQUFBLElBQUEsQ0FBQSxVQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7QUFFQSxNQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsT0FBQTtBQUVBLEtBSkEsRUFJQSxVQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7QUFFQSxNQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsT0FBQTtBQUNHLEtBUEg7QUFVRSxHQTUzQkY7QUFnNEJBLEVBQUEsZUFBQSxFQUFBLHlCQUFBLENBQUEsRUFDQztBQUFBOztBQUNDLElBQUEsQ0FBQSxDQUFBLGNBQUE7QUFJRixRQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLGVBQUEsRUFBQTtBQUlBLElBQUEsU0FBQSxDQUFBLElBQUE7QUFFQSxJQUFBLFVBQUEsQ0FBQSxVQUFBLENBQUEsTUFBQSxDQUFBLFlBQUEsQ0FBQSxFQUFBLE1BQUEsQ0FBQSxXQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsT0FBQSxDQUFBLEVBQUEsSUFBQSxDQUFBLFVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUVBLE1BQUEsT0FBQSxDQUFBLFFBQUEsQ0FBQSxPQUFBO0FBRUEsS0FKQSxFQUlBLFVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUVBLE1BQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxPQUFBO0FBQ0csS0FQSDtBQVVFLEdBdDVCRjtBQTA1QkEsRUFBQSxlQUFBLEVBQUEseUJBQUEsQ0FBQSxFQUNDO0FBQUE7O0FBQ0MsSUFBQSxDQUFBLENBQUEsY0FBQTtBQUlGLFFBQUEsTUFBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsZUFBQSxFQUFBO0FBSUEsSUFBQSxTQUFBLENBQUEsSUFBQTtBQUVBLElBQUEsVUFBQSxDQUFBLFVBQUEsQ0FBQSxLQUFBLElBQUEsRUFBQSxNQUFBLENBQUEsVUFBQSxDQUFBLEVBQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxFQUFBLElBQUEsQ0FBQSxVQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7QUFFQSxNQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsT0FBQTtBQUVBLEtBSkEsRUFJQSxVQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7QUFFQSxNQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsT0FBQTtBQUNHLEtBUEg7QUFVRTtBQWg3QkYsQ0FBQSxDQUFBOzs7Ozs7Ozs7Ozs7QUNNQSxJQUFBLE1BQUEsR0FBQTtBQUFBLGVBQUEsQ0FBQTtBQUFBLFlBQUEsZUFBQTtBQUFBLFlBQUEsd0JBQUE7QUFBQSxjQUFBLENBQUE7QUFBQSxjQUFBLE9BQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLG9CQUFBO0FBQUEsaUJBQUEsRUFBQTtBQUFBLGtCQUFBLEVBQUE7QUFBQSxrQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsb0JBQUE7QUFBQSxpQkFBQSxFQUFBO0FBQUEsa0JBQUEsSUFBQTtBQUFBLGtCQUFBO0FBQUEsS0FBQTtBQUFBLEdBQUEsRUFBQTtBQUFBLFlBQUEsZUFBQTtBQUFBLFlBQUEsd0JBQUE7QUFBQSxjQUFBLENBQUE7QUFBQSxjQUFBLE9BQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLG9CQUFBO0FBQUEsaUJBQUEsRUFBQTtBQUFBLGtCQUFBLEVBQUE7QUFBQSxrQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsb0JBQUE7QUFBQSxpQkFBQSxFQUFBO0FBQUEsa0JBQUEsSUFBQTtBQUFBLGtCQUFBO0FBQUEsS0FBQTtBQUFBLEdBQUEsRUFBQTtBQUFBLFlBQUEsV0FBQTtBQUFBLFlBQUEsb0JBQUE7QUFBQSxjQUFBLENBQUE7QUFBQSxjQUFBLE9BQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLGdCQUFBO0FBQUEsaUJBQUEsRUFBQTtBQUFBLGtCQUFBLEVBQUE7QUFBQSxrQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsZ0JBQUE7QUFBQSxpQkFBQSxFQUFBO0FBQUEsa0JBQUEsSUFBQTtBQUFBLGtCQUFBO0FBQUEsS0FBQTtBQUFBLEdBQUEsQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxZQUFBLFdBQUE7QUFBQSxZQUFBLCtCQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGNBQUEsY0FBQTtBQUFBLGNBQUEsMkJBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGNBQUE7QUFBQSxjQUFBLHFCQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxjQUFBO0FBQUEsY0FBQSxxQkFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsd0NBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLGtEQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxnQkFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsd0JBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsYUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsV0FBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsNEJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxXQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxPQUFBO0FBQUEsY0FBQSxvREFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsb0JBQUE7QUFBQSxjQUFBLDRCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsY0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGlCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxxQkFBQTtBQUFBLGNBQUEsbUNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxjQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsaUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBO0FBQUEsR0FBQSxFQUFBO0FBQUEsWUFBQSxXQUFBO0FBQUEsWUFBQSwwQkFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsTUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLE1BQUE7QUFBQSxjQUFBLGdCQUFBO0FBQUEsY0FBQTtBQUFBLEtBQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLHdEQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSxzRkFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsNENBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxzQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsOENBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxvQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsY0FBQTtBQUFBLGNBQUEseURBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxzQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsY0FBQTtBQUFBLGNBQUEsMkRBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxvQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsY0FBQTtBQUFBLGNBQUEseURBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxzQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsY0FBQTtBQUFBLGNBQUEsMkRBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxvQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsMkNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxzQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsNkNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxvQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsY0FBQTtBQUFBLGNBQUEsNkJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxvQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsY0FBQTtBQUFBLGNBQUEsNkJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxvQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsZUFBQTtBQUFBLGNBQUEsNkNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLENBQUEsT0FBQSxFQUFBLFFBQUEsQ0FBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLGlDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLENBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxhQUFBO0FBQUEsY0FBQSxpQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsUUFBQSxDQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsaUNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLENBQUEsT0FBQSxFQUFBLFFBQUEsQ0FBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFVBQUE7QUFBQSxjQUFBLGdDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLENBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSxpQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsUUFBQSxDQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsaUNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLENBQUEsT0FBQSxFQUFBLFFBQUEsQ0FBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLGlDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLENBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxhQUFBO0FBQUEsY0FBQSwyR0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHFCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSx1REFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsK0dBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxxQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsdURBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLDhHQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEscUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHVEQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSx5RkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGlCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxDQUFBLFFBQUEsRUFBQSxPQUFBLENBQUE7QUFBQSxnQkFBQSxnQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHlCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSxrRkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxNQUFBO0FBQUEsY0FBQSwyQkFBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSw2QkFBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxVQUFBO0FBQUEsY0FBQSw4R0FBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxhQUFBO0FBQUEsY0FBQSwrR0FBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxNQUFBO0FBQUEsY0FBQSx5QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBO0FBQUEsZ0JBQUEsYUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLDJDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLDJCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxDQUFBLFFBQUEsRUFBQSxPQUFBLENBQUE7QUFBQSxnQkFBQSxhQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsMkNBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsMkJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLENBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQTtBQUFBLGdCQUFBLGFBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSwyQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxPQUFBO0FBQUEsY0FBQSwwQkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBO0FBQUEsZ0JBQUEsYUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLDJDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLE9BQUE7QUFBQSxjQUFBLGtCQUFBO0FBQUEsZ0JBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGdCQUFBO0FBQUEsY0FBQSwwQkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLE9BQUE7QUFBQSxjQUFBLDRCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEscVFBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsZ0NBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSwyQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxlQUFBO0FBQUEsY0FBQSxpQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEscUJBQUE7QUFBQSxjQUFBLGdEQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLHVCQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsaUJBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxnQkFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLDBCQUFBO0FBQUEsY0FBQSxnREFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSx1QkFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLGlCQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsZ0JBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLDBCQUFBO0FBQUEsY0FBQSxnRUFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLElBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxnQkFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLCtCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsR0FBQTtBQUFBLGdCQUFBLGVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsaUJBQUE7QUFBQSxjQUFBLHVCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLGVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsNkRBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsaUJBQUE7QUFBQSxnQkFBQSxHQUFBO0FBQUEsZ0JBQUEsa0VBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLENBQUE7QUFBQSxjQUFBLENBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLDhFQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSxtRkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUE7QUFBQSxHQUFBLEVBQUE7QUFBQSxZQUFBLFlBQUE7QUFBQSxZQUFBLDJCQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGNBQUEsVUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBO0FBQUEsS0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEseUJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxhQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsd0ZBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLDJCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGNBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsd0JBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsVUFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSx3QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxjQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLHdCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGNBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsaUJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsY0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxXQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGdCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsZUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFdBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxnQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLHFDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLGlDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFdBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsZ0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxlQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsV0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSw4QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLDZCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQTtBQUFBLEdBQUEsRUFBQTtBQUFBLFlBQUEsVUFBQTtBQUFBLFlBQUEsa0NBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsY0FBQSxhQUFBO0FBQUEsY0FBQSwyQkFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsMkJBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLDJDQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSxxQ0FBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsdUJBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFVBQUE7QUFBQSxjQUFBLHFCQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxhQUFBO0FBQUEsY0FBQSxvQkFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsb0JBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGlCQUFBO0FBQUEsY0FBQSwwQ0FBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsNENBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxLQUFBO0FBQUEsY0FBQSw4QkFBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSxpQ0FBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSxzQ0FBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSwwQ0FBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxlQUFBO0FBQUEsY0FBQSx5Q0FBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsZ0JBQUE7QUFBQSxLQUFBO0FBQUEsR0FBQSxDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLFlBQUEsY0FBQTtBQUFBLFlBQUEsMkJBQUE7QUFBQSxrQkFBQSxFQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLDRCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLElBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsK0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGFBQUE7QUFBQSxjQUFBLDJHQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEscUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHdDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxhQUFBO0FBQUEsY0FBQSwrR0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHFCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSx3Q0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsOEdBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxxQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsd0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLHlDQUFBO0FBQUEsZ0JBQUE7QUFBQSxLQUFBO0FBQUEsR0FBQSxFQUFBO0FBQUEsWUFBQSxhQUFBO0FBQUEsWUFBQSxtQ0FBQTtBQUFBLGtCQUFBLEVBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsaURBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLEdBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLGtEQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxHQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSx3QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsR0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsVUFBQTtBQUFBLGNBQUEseUJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLEdBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBO0FBQUEsR0FBQSxDQUFBO0FBQUEsYUFBQSxDQUFBO0FBQUEsWUFBQSxhQUFBO0FBQUEsWUFBQSx1QkFBQTtBQUFBLGtCQUFBLENBQUEsY0FBQSxDQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLG1CQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsZ0JBQUE7QUFBQSxLQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsNEJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsSUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSwrQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsMkdBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxxQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsd0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGFBQUE7QUFBQSxjQUFBLCtHQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEscUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHdDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSw4R0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHFCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSx3Q0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEseUNBQUE7QUFBQSxnQkFBQTtBQUFBLEtBQUE7QUFBQSxHQUFBLEVBQUE7QUFBQSxZQUFBLFlBQUE7QUFBQSxZQUFBLCtCQUFBO0FBQUEsa0JBQUEsQ0FBQSxhQUFBLENBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsbUJBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLEtBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSxpREFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsR0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsa0RBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLEdBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLHdCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxHQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxVQUFBO0FBQUEsY0FBQSx5QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsR0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXt7WUVBUn19IFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbnZhciBhbWlUd2lnID0ge1xuXHR2ZXJzaW9uOiAnMS4xLjAnXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGV4cG9ydHMuYW1pVHdpZyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmlmKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJylcbntcblx0YW1pVHdpZy5mcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cblx0bW9kdWxlLmV4cG9ydHMuYW1pVHdpZyA9IGFtaVR3aWc7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRva2VuaXplciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRva2VuaXplciA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0b2tlbml6ZTogZnVuY3Rpb24oY29kZSwgbGluZSwgc3BhY2VzLCB0b2tlbkRlZnMsIHRva2VuVHlwZXMsIGVycm9yKVxuXHR7XG5cdFx0aWYodG9rZW5EZWZzLmxlbmd0aCAhPT0gdG9rZW5UeXBlcy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2B0b2tlbkRlZnMubGVuZ3RoICE9IHRva2VuVHlwZXMubGVuZ3RoYCc7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVzdWx0X3Rva2VucyA9IFtdO1xuXHRcdGNvbnN0IHJlc3VsdF90eXBlcyA9IFtdO1xuXHRcdGNvbnN0IHJlc3VsdF9saW5lcyA9IFtdO1xuXG5cdFx0bGV0IGkgPSAweDAwMDAwMDAwMDtcblx0XHRjb25zdCBsID0gY29kZS5sZW5ndGg7XG5cblx0XHRsZXQgd29yZCA9ICcnLCB0b2tlbiwgYztcblxuX19sMDpcdFx0d2hpbGUoaSA8IGwpXG5cdFx0e1xuXHRcdFx0YyA9IGNvZGUuY2hhckF0KDApO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIENPVU5UIExJTkVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKGMgPT09ICdcXG4nKVxuXHRcdFx0e1xuXHRcdFx0XHRsaW5lKys7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRUFUIFNQQUNFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYoc3BhY2VzLmluZGV4T2YoYykgPj0gMClcblx0XHRcdHtcblx0XHRcdFx0aWYod29yZClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdpbnZhbGlkIHRva2VuIGAnICsgd29yZCArICdgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2goLTEpO1xuXHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdHdvcmQgPSAnJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZygxKTtcblx0XHRcdFx0aSArPSAxO1xuXG5cdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRUFUIFJFR0VYRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Zm9yKGNvbnN0IGogaW4gdG9rZW5EZWZzKVxuXHRcdFx0e1xuXHRcdFx0XHR0b2tlbiA9IHRoaXMuX21hdGNoKGNvZGUsIHRva2VuRGVmc1tqXSk7XG5cblx0XHRcdFx0aWYodG9rZW4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZih3b3JkKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh3b3JkKTtcblx0XHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdFx0d29yZCA9ICcnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh0b2tlbik7XG5cdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2godG9rZW5UeXBlc1tqXSk7XG5cdFx0XHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG5cblx0XHRcdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcodG9rZW4ubGVuZ3RoKTtcblx0XHRcdFx0XHRpICs9IHRva2VuLmxlbmd0aDtcblxuXHRcdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFQVQgUkVNQUlOSU5HIENIQVJBQ1RFUkVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR3b3JkICs9IGM7XG5cblx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZygxKTtcblx0XHRcdGkgKz0gMTtcblxuLypcdFx0XHRjb250aW51ZSBfX2wwO1xuICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHRpZih3b3JkKVxuXHRcdHtcblx0XHRcdGlmKGVycm9yKVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh3b3JkKTtcblx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuLypcdFx0XHR3b3JkID0gJyc7XG4gKi9cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHRva2VuczogcmVzdWx0X3Rva2Vucyxcblx0XHRcdHR5cGVzOiByZXN1bHRfdHlwZXMsXG5cdFx0XHRsaW5lczogcmVzdWx0X2xpbmVzLFxuXHRcdH07XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfbWF0Y2g6IGZ1bmN0aW9uKHMsIHN0cmluZ09yUmVnRXhwKVxuXHR7XG5cdFx0bGV0IG07XG5cblx0XHRpZihzdHJpbmdPclJlZ0V4cCBpbnN0YW5jZW9mIFJlZ0V4cClcblx0XHR7XG5cdFx0XHRtID0gcy5tYXRjaChzdHJpbmdPclJlZ0V4cCk7XG5cblx0XHRcdHJldHVybiBtICE9PSBudWxsICYmIHRoaXMuX2NoZWNrTmV4dENoYXIocywgLyotKi9tWzBdLyotKi8pID8gLyotKi9tWzBdLyotKi8gOiBudWxsO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0bSA9IHMuaW5kZXhPZihzdHJpbmdPclJlZ0V4cCk7XG5cblx0XHRcdHJldHVybiBtID09PSAweDAwICYmIHRoaXMuX2NoZWNrTmV4dENoYXIocywgc3RyaW5nT3JSZWdFeHApID8gc3RyaW5nT3JSZWdFeHAgOiBudWxsO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9hbG51bTogW1xuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSxcblx0XHQxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAxLFxuXHRcdDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsXG5cdFx0MSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdF0sXG5cblx0X2NoZWNrTmV4dENoYXI6IGZ1bmN0aW9uKHMsIHRva2VuKVxuXHR7XG5cdFx0Y29uc3QgbGVuZ3RoID0gdG9rZW4ubGVuZ3RoO1xuXG5cdFx0Y29uc3QgY2hhckNvZGUyID0gcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDApO1xuXHRcdGNvbnN0IGNoYXJDb2RlMSA9IHMuY2hhckNvZGVBdChsZW5ndGggLSAxKTtcblxuXHRcdHJldHVybiBpc05hTihjaGFyQ29kZTIpXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHRoaXMuX2FsbnVtW2NoYXJDb2RlMl0gPT09IDBcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdGhpcy5fYWxudW1bY2hhckNvZGUxXSA9PT0gMFxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwciA9IHt9O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci50b2tlbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci50b2tlbnMgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBDT01QT1NJVEUgVE9LRU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5JU19YWFggPSBbXG5cdFx0XHR0aGlzLkRFRklORUQsXG5cdFx0XHR0aGlzLk5VTEwsXG5cdFx0XHR0aGlzLkVNUFRZLFxuXHRcdFx0dGhpcy5JVEVSQUJMRSxcblx0XHRcdHRoaXMuRVZFTixcblx0XHRcdHRoaXMuT0RELFxuXHRcdF07XG5cblx0XHR0aGlzLlhYWF9XSVRIID0gW1xuXHRcdFx0dGhpcy5TVEFSVFNfV0lUSCxcblx0XHRcdHRoaXMuRU5EU19XSVRILFxuXHRcdF07XG5cblx0XHR0aGlzLlBMVVNfTUlOVVMgPSBbXG5cdFx0XHR0aGlzLkNPTkNBVCxcblx0XHRcdHRoaXMuUExVUyxcblx0XHRcdHRoaXMuTUlOVVMsXG5cdFx0XTtcblxuXHRcdHRoaXMuTVVMX0ZMRElWX0RJVl9NT0QgPSBbXG5cdFx0XHR0aGlzLk1VTCxcblx0XHRcdHRoaXMuRkxESVYsXG5cdFx0XHR0aGlzLkRJVixcblx0XHRcdHRoaXMuTU9ELFxuXHRcdF07XG5cblx0XHR0aGlzLlJYID0gW1xuXHRcdFx0dGhpcy5SUCxcblx0XHRcdHRoaXMuUkIxLFxuXHRcdF07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUkVBTCBUT0tFTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRMT0dJQ0FMX09SOiAxMDAsXG5cdExPR0lDQUxfQU5EOiAxMDEsXG5cdEJJVFdJU0VfT1I6IDEwMixcblx0QklUV0lTRV9YT1I6IDEwMyxcblx0QklUV0lTRV9BTkQ6IDEwNCxcblx0Tk9UOiAxMDUsXG5cdElTOiAxMDYsXG5cdERFRklORUQ6IDEwNyxcblx0TlVMTDogMTA4LFxuXHRFTVBUWTogMTA5LFxuXHRJVEVSQUJMRTogMTEwLFxuXHRFVkVOOiAxMTEsXG5cdE9ERDogMTEyLFxuXHRDTVBfT1A6IDExMyxcblx0U1RBUlRTX1dJVEg6IDExNCxcblx0RU5EU19XSVRIOiAxMTUsXG5cdE1BVENIRVM6IDExNixcblx0SU46IDExNyxcblx0UkFOR0U6IDExOCxcblx0Q09OQ0FUOiAxMTksXG5cdFBMVVM6IDEyMCxcblx0TUlOVVM6IDEyMSxcblx0UE9XRVI6IDEyMixcblx0TVVMOiAxMjMsXG5cdEZMRElWOiAxMjQsXG5cdERJVjogMTI1LFxuXHRNT0Q6IDEyNixcbiBcdERPVUJMRV9RVUVTVElPTjogMTI3LFxuIFx0UVVFU1RJT046IDEyOCxcblx0Q09MT046IDEyOSxcblx0RE9UOiAxMzAsXG5cdENPTU1BOiAxMzEsXG5cdFBJUEU6IDEzMixcblx0TFA6IDEzMyxcblx0UlA6IDEzNCxcblx0TEIxOiAxMzUsXG5cdFJCMTogMTM2LFxuXHRMQjI6IDEzNyxcblx0UkIyOiAxMzgsXG5cdFNJRDogMTM5LFxuXHRURVJNSU5BTDogMTQwLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFZJUlRVQUwgVE9LRU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0TFNUOiAyMDAsXG5cdERJQzogMjAxLFxuXHRGVU46IDIwMixcblx0VkFSOiAyMDMsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIudG9rZW5zLiRpbml0KCk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLlRva2VuaXplciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLlRva2VuaXplciA9IGZ1bmN0aW9uKGNvZGUsIGxpbmUpIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLl9zcGFjZXMgPSBbJyAnLCAnXFx0JywgJ1xcbicsICdcXHInXTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuX3Rva2VuRGVmcyA9IFtcblx0XHQnb3InLFxuXHRcdCdhbmQnLFxuXHRcdCdiLW9yJyxcblx0XHQnYi14b3InLFxuXHRcdCdiLWFuZCcsXG5cdFx0J25vdCcsXG5cdFx0J2lzJyxcblx0XHQnZGVmaW5lZCcsXG5cdFx0J251bGwnLFxuXHRcdCdlbXB0eScsXG5cdFx0J2l0ZXJhYmxlJyxcblx0XHQnZXZlbicsXG5cdFx0J29kZCcsXG5cdFx0Jz09PScsXG5cdFx0Jz09Jyxcblx0XHQnIT09Jyxcblx0XHQnIT0nLFxuXHRcdCc8PScsXG5cdFx0Jz49Jyxcblx0XHQnPCcsXG5cdFx0Jz4nLFxuXHRcdC9ec3RhcnRzXFxzK3dpdGgvLFxuXHRcdC9eZW5kc1xccyt3aXRoLyxcblx0XHQnbWF0Y2hlcycsXG5cdFx0J2luJyxcblx0XHQnLi4nLFxuXHRcdCd+Jyxcblx0XHQnKycsXG5cdFx0Jy0nLFxuXHRcdCcqKicsXG5cdFx0JyonLFxuXHRcdCcvLycsXG5cdFx0Jy8nLFxuXHRcdCclJyxcblx0XHQnPz8nLFxuXHRcdCc/Jyxcblx0XHQnOicsXG5cdFx0Jy4nLFxuXHRcdCcsJyxcblx0XHQnfCcsXG5cdFx0JygnLFxuXHRcdCcpJyxcblx0XHQnWycsXG5cdFx0J10nLFxuXHRcdCd7Jyxcblx0XHQnfScsXG5cdFx0J3RydWUnLFxuXHRcdCdmYWxzZScsXG5cdFx0L15bMC05XStcXC5bMC05XSsvLFxuXHRcdC9eWzAtOV0rLyxcblx0XHQvXicoXFxcXCd8W14nXSkqJy8sXG5cdFx0L15cIihcXFxcXCJ8W15cIl0pKlwiLyxcblx0XHQvXlthLXpBLVpfJF1bYS16QS1aMC05XyRdKi8sXG5cdF07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLl90b2tlblR5cGVzID0gW1xuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfQU5ELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfWE9SLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9BTkQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5OT1QsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5JUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRFRklORUQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5OVUxMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRU1QVFksXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5JVEVSQUJMRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkVWRU4sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5PREQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5TVEFSVFNfV0lUSCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkVORFNfV0lUSCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1BVENIRVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5JTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJBTkdFLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ09OQ0FULFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUExVUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1JTlVTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVIsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NVUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5GTERJVixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRJVixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1PRCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRPVUJMRV9RVUVTVElPTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlFVRVNUSU9OLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ09MT04sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ET1QsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DT01NQSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBJUEUsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJQLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTEIxLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUkIxLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTEIyLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUkIyLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuU0lELFxuXHRdO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy4kaW5pdCA9IGZ1bmN0aW9uKGNvZGUsIGxpbmUpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCByZXN1bHQgPSBhbWlUd2lnLnRva2VuaXplci50b2tlbml6ZShcblx0XHRcdGNvZGUsXG5cdFx0XHRsaW5lLFxuXHRcdFx0dGhpcy5fc3BhY2VzLFxuXHRcdFx0dGhpcy5fdG9rZW5EZWZzLFxuXHRcdFx0dGhpcy5fdG9rZW5UeXBlcyxcblx0XHRcdHRydWVcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy50b2tlbnMgPSByZXN1bHQudG9rZW5zO1xuXHRcdHRoaXMudHlwZXMgPSByZXN1bHQudHlwZXM7XG5cblx0XHR0aGlzLmkgPSAwO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5uZXh0ID0gZnVuY3Rpb24obiA9IDEpXG5cdHtcblx0XHR0aGlzLmkgKz0gbjtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuaXNFbXB0eSA9IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmkgPj0gdGhpcy50b2tlbnMubGVuZ3RoO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5wZWVrVG9rZW4gPSBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50b2tlbnNbdGhpcy5pXTtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMucGVla1R5cGUgPSBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50eXBlc1t0aGlzLmldO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5jaGVja1R5cGUgPSBmdW5jdGlvbih0eXBlKVxuXHR7XG5cdFx0aWYodGhpcy5pIDwgdGhpcy50b2tlbnMubGVuZ3RoKVxuXHRcdHtcblx0XHRcdGNvbnN0IFRZUEUgPSB0aGlzLnR5cGVzW3RoaXMuaV07XG5cblx0XHRcdHJldHVybiAodHlwZSBpbnN0YW5jZW9mIEFycmF5KSA/ICh0eXBlLmluZGV4T2YoVFlQRSkgPj0gMCkgOiAodHlwZSA9PT0gVFlQRSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy4kaW5pdChjb2RlLCBsaW5lKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuQ29tcGlsZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuQ29tcGlsZXIgPSBmdW5jdGlvbihjb2RlLCBsaW5lKSB7XG5cblx0dGhpcy4kaW5pdChjb2RlLCBsaW5lKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuQ29tcGlsZXIucHJvdG90eXBlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihjb2RlLCBsaW5lKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy50b2tlbml6ZXIgPSBuZXcgYW1pVHdpZy5leHByLlRva2VuaXplcihcblx0XHRcdHRoaXMuY29kZSA9IGNvZGUsXG5cdFx0XHR0aGlzLmxpbmUgPSBsaW5lXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMucm9vdE5vZGUgPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmlzRW1wdHkoKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCB1bmV4cGVjdGVkIHRva2VuIGAnICsgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkgKyAnYCc7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZHVtcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucm9vdE5vZGUuZHVtcCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VOdWxsQ29hbGVzY2luZzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTG9naWNhbE9yKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE51bGxDb2FsZXNjaW5nIDogTG9naWNhbE9yICgnPz8nIExvZ2ljYWxPcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5ET1VCTEVfUVVFU1RJT04pKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VMb2dpY2FsT3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTG9naWNhbE9yOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VMb2dpY2FsQW5kKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIExvZ2ljYWxPciA6IExvZ2ljYWxBbmQgKCdvcicgTG9naWNhbEFuZCkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX09SKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTG9naWNhbEFuZCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VMb2dpY2FsQW5kOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VCaXR3aXNlT3IoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTG9naWNhbEFuZCA6IEJpdHdpc2VPciAoJ2FuZCcgQml0d2lzZU9yKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfQU5EKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQml0d2lzZU9yKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VPcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQml0d2lzZVhvcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBCaXR3aXNlT3IgOiBCaXR3aXNlWG9yICgnYi1vcicgQml0d2lzZVhvcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUJpdHdpc2VYb3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQml0d2lzZVhvcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQml0d2lzZUFuZCgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBCaXR3aXNlWG9yIDogQml0d2lzZUFuZCAoJ2IteG9yJyBCaXR3aXNlQW5kKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9YT1IpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VCaXR3aXNlQW5kKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VBbmQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZU5vdCgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBCaXR3aXNlQW5kIDogTm90ICgnYi1hbmQnIE5vdCkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9BTkQpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VOb3QoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTm90OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTm90IDogJ25vdCcgQ29tcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUNvbXAoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IG51bGw7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgIHwgQ29tcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiB0aGlzLnBhcnNlQ29tcCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VDb21wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VBZGRTdWIoKSwgcmlnaHQsIG5vZGUsIHN3YXA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQ29tcCA6IEFkZFN1YiAnaXMnICdub3QnPyAoJ2RlZmluZWQnIHwgJ251bGwnIHwgLi4uKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdC8qKi8gaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuSVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHQvKiBzd2FwICdpcycgYW5kICdub3QnICovXG5cdFx0XHRzd2FwID0gbm9kZTtcblx0XHRcdC8qIHN3YXAgJ2lzJyBhbmQgJ25vdCcgKi9cblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSlcblx0XHRcdHtcblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHRcdFx0bm9kZS5ub2RlUmlnaHQgPSBzd2FwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JU19YWFgpKVxuXHRcdFx0e1xuXHRcdFx0XHRyaWdodCA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRzd2FwLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdFx0c3dhcC5ub2RlUmlnaHQgPSByaWdodDtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBrZXl3b3JkIGBkZWZpbmVkYCwgYG51bGxgLCBgZW1wdHlgLCBgaXRlcmFibGVgLCBgZXZlbmAgb3IgYG9kZGAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAoJz09PScgfCAnPT0nIHwgLi4uKSBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgKCdzdGFydHMnIHwgJ2VuZHMnKSBgd2l0aGAgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlhYWF9XSVRIKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgJ21hdGNoZXMnIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk1BVENIRVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAnaW4nIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuSU4pKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VBZGRTdWI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZU11bERpdigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBBZGRTdWIgOiBNdWxEaXYgKCgnKycgfCAnLScpIE11bERpdikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUExVU19NSU5VUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZU11bERpdigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VNdWxEaXY6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZVBsdXNNaW51cygpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBNdWxEaXYgOiBQbHVzTWludXMgKCgnKicgfCAnLy8nIHwgJy8nIHwgJyUnKSBQbHVzTWludXMpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTVVMX0ZMRElWX0RJVl9NT0QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VQbHVzTWludXMoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlUGx1c01pbnVzOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogUGx1c01pbnVzIDogKCctJyB8ICcrJykgUG93ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVNfTUlOVVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VQb3dlcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgICAgICAgfCBEb3QxICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHRoaXMucGFyc2VQb3dlcigpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VQb3dlcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlRmlsdGVyKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFBvd2VyIDogRmlsdGVyICgnKionIEZpbHRlcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QT1dFUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUZpbHRlcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VGaWx0ZXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZURvdDEoKSwgbm9kZSwgdGVtcDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBGaWx0ZXIgOiBEb3QxICgnfCcgRG90MSkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUElQRSkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRub2RlID0gdGhpcy5wYXJzZURvdDEodHJ1ZSk7XG5cblx0XHRcdGZvcih0ZW1wID0gbm9kZTsgdGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5ET1Q7IHRlbXAgPSB0ZW1wLm5vZGVMZWZ0KTtcblxuXHRcdFx0dGVtcC5saXN0LnVuc2hpZnQobGVmdCk7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VEb3QxOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGNvbnN0IG5vZGUgPSB0aGlzLnBhcnNlRG90Mihpc0ZpbHRlcik7XG5cblx0XHRpZihub2RlKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsZXQgdGVtcCA9IG5vZGU7XG5cblx0XHRcdGZvcig7IHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuRE9UOyB0ZW1wID0gdGVtcC5ub2RlTGVmdCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0ZW1wLnEpXG5cdFx0XHR7XG5cdFx0XHRcdC8qKi8gaWYodGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5GVU4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZih0ZW1wLm5vZGVWYWx1ZSBpbiBhbWlUd2lnLnN0ZGxpYilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9ICdhbWlUd2lnLnN0ZGxpYi4nICsgdGVtcC5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9IC8qLS0tKi8nXy4nLyotLS0qLyArIHRlbXAubm9kZVZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuVkFSKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAvKi0tLSovJ18uJy8qLS0tKi8gKyB0ZW1wLm5vZGVWYWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRlbXAucSA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHRyZXR1cm4gbm9kZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRG90MjogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VEb3QzKGlzRmlsdGVyKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogRG90MiA6IERvdDMgKCcuJyBEb3QzKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCAnLicpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VEb3QzKGlzRmlsdGVyKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRG90MzogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VYKGlzRmlsdGVyKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogRG90MyA6IFggKCdbJyBOdWxsQ29hbGVzY2luZyAnXScpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxCMSkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjEpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCwgJ1tdJyk7XG5cblx0XHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYF1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICAgICB8IFggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VYOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFggOiBHcm91cCB8IEFycmF5IHwgT2JqZWN0IHwgRnVuVmFyIHwgVGVybWluYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VHcm91cCgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlQXJyYXkoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZU9iamVjdCgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlRnVuVmFyKGlzRmlsdGVyKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZVRlcm1pbmFsKCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogU1lOVEFYIEVSUk9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgc3ludGF4IGVycm9yIG9yIHR1bmNhdGVkIGV4cHJlc3Npb24nO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VHcm91cDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogR3JvdXAgOiAnKCcgTnVsbENvYWxlc2NpbmcgJyknICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxQKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdG5vZGUgPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUlApKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYClgIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQXJyYXk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBub2RlLCBsaXN0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEFycmF5IDogJ1snIFNpbmdsZXRzICddJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MQjEpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0bGlzdCA9IHRoaXMuX3BhcnNlU2luZ2xldHMoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIxKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoYW1pVHdpZy5leHByLnRva2Vucy5MU1QsICdBcnJheScpO1xuXG5cdFx0XHRcdG5vZGUubGlzdCA9IGxpc3Q7XG5cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYF1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlT2JqZWN0OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbm9kZSwgZGljdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBPYmplY3QgOiAneycgRG91YmxldHMgJ30nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIyKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGRpY3QgPSB0aGlzLl9wYXJzZURvdWJsZXRzKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMikpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKGFtaVR3aWcuZXhwci50b2tlbnMuRElDLCAnT2JqZWN0Jyk7XG5cblx0XHRcdFx0bm9kZS5kaWN0ID0gZGljdDtcblxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgfWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VGdW5WYXI6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5TSUQpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoMCwgaXNGaWx0ZXIgPyAnZmlsdGVyXycgKyB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSA6IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblxuXHRcdFx0bm9kZS5xID0gdHJ1ZTtcblxuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZ1blZhciA6IFNJRCAnKCcgU2luZ2xldHMgJyknICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdC8qKi8gaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTFApKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gdGhpcy5fcGFyc2VTaW5nbGV0cygpO1xuXG5cdFx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJQKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRcdG5vZGUubm9kZVR5cGUgPSBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTjtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGApYCBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiAgICAgICAgfCBTSUQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdG5vZGUubm9kZVR5cGUgPSBpc0ZpbHRlciA/IGFtaVR3aWcuZXhwci50b2tlbnMuRlVOXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICA6IGFtaVR3aWcuZXhwci50b2tlbnMuVkFSXG5cdFx0XHRcdDtcblxuXHRcdFx0XHRub2RlLmxpc3QgPSBbXTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlU2luZ2xldHM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUlgpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aGlzLl9wYXJzZVNpbmdsZXQocmVzdWx0KTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ09NTUEpID09PSB0cnVlKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VEb3VibGV0czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0ge307XG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjIpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aGlzLl9wYXJzZURvdWJsZXQocmVzdWx0KTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ09NTUEpID09PSB0cnVlKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VTaW5nbGV0OiBmdW5jdGlvbihyZXN1bHQpXG5cdHtcblx0XHRyZXN1bHQucHVzaCh0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VEb3VibGV0OiBmdW5jdGlvbihyZXN1bHQpXG5cdHtcblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCkpXG5cdFx0e1xuXHRcdFx0Y29uc3Qga2V5ID0gdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTE9OKSlcblx0XHRcdHtcbi8qXHRcdFx0XHRjb25zdCBjb2xvbiA9IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpO1xuICovXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHRba2V5XSA9IHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYDpgIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgdGVybWluYWwgZXhwZWN0ZWQnO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlVGVybWluYWw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0LCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBUZXJtaW5hbCA6IFRFUk1JTkFMIHwgUkFOR0UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwpKVxuXHRcdHtcblx0XHRcdGxlZnQgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQU5HRSkpXG5cdFx0XHR7XG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmlnaHQgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gbGVmdDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuTm9kZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuTm9kZSA9IGZ1bmN0aW9uKG5vZGVUeXBlLCBub2RlVmFsdWUpIHtcblxuXHR0aGlzLiRpbml0KG5vZGVUeXBlLCBub2RlVmFsdWUpO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ob2RlLnByb3RvdHlwZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24obm9kZVR5cGUsIG5vZGVWYWx1ZSlcblx0e1xuXHRcdHRoaXMubm9kZVR5cGUgPSBub2RlVHlwZTtcblx0XHR0aGlzLm5vZGVWYWx1ZSA9IG5vZGVWYWx1ZTtcblx0XHR0aGlzLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHR0aGlzLm5vZGVSaWdodCA9IG51bGw7XG5cdFx0dGhpcy5saXN0ID0gbnVsbDtcblx0XHR0aGlzLmRpY3QgPSBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2R1bXA6IGZ1bmN0aW9uKG5vZGVzLCBlZGdlcywgcENudClcblx0e1xuXHRcdGxldCBDTlQ7XG5cblx0XHRjb25zdCBjbnQgPSBwQ250WzBdO1xuXG5cdFx0bm9kZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIFtsYWJlbD1cIicgKyB0aGlzLm5vZGVWYWx1ZS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCJdOycpO1xuXG5cdFx0aWYodGhpcy5ub2RlTGVmdClcblx0XHR7XG5cdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnOycpO1xuXHRcdFx0dGhpcy5ub2RlTGVmdC5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMubm9kZVJpZ2h0KVxuXHRcdHtcblx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICc7Jyk7XG5cdFx0XHR0aGlzLm5vZGVSaWdodC5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMubGlzdClcblx0XHR7XG5cdFx0XHRmb3IoY29uc3QgaSBpbiB0aGlzLmxpc3QpXG5cdFx0XHR7XG5cdFx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJyBbbGFiZWw9XCJbJyArIGkucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ11cIl07Jyk7XG5cdFx0XHRcdHRoaXMubGlzdFtpXS5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmKHRoaXMuZGljdClcblx0XHR7XG5cdFx0XHRmb3IoY29uc3QgaSBpbiB0aGlzLmRpY3QpXG5cdFx0XHR7XG5cdFx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJyBbbGFiZWw9XCJbJyArIGkucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ11cIl07Jyk7XG5cdFx0XHRcdHRoaXMuZGljdFtpXS5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGR1bXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IG5vZGVzID0gW107XG5cdFx0Y29uc3QgZWRnZXMgPSBbXTtcblxuXHRcdHRoaXMuX2R1bXAobm9kZXMsIGVkZ2VzLCBbMF0pO1xuXG5cdFx0cmV0dXJuICdkaWdyYXBoIGFzdCB7XFxuXFx0cmFua2Rpcj1UQjtcXG4nICsgbm9kZXMuam9pbignXFxuJykgKyAnXFxuJyArIGVkZ2VzLmpvaW4oJ1xcbicpICsgJ1xcbn0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy50bXBsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsID0ge307XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy50bXBsLkNvbXBpbGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsLkNvbXBpbGVyID0gZnVuY3Rpb24odG1wbCkge1xuXG5cdHRoaXMuJGluaXQodG1wbCk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsLkNvbXBpbGVyLnByb3RvdHlwZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRTVEFURU1FTlRfUkU6IC9cXHslXFxzKihbYS16QS1aXSspXFxzKigoPzoufFxcbikqPylcXHMqJVxcfS8sXG5cblx0Q09NTUVOVF9SRTogL1xceyNcXHMqKCg/Oi58XFxuKSo/KVxccyojXFx9L2csXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfY291bnQ6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRsZXQgcmVzdWx0ID0gMDtcblxuXHRcdGNvbnN0IGwgPSBzLmxlbmd0aDtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpKyspXG5cdFx0e1xuXHRcdFx0aWYoc1tpXSA9PT0gJ1xcbicpIHJlc3VsdCsrO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24odG1wbClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBsaW5lID0gMTtcblxuXHRcdGxldCBjb2x1bW47XG5cdFx0bGV0IENPTFVNTjtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMucm9vdE5vZGUgPSB7XG5cdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0a2V5d29yZDogJ0Byb290Jyxcblx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0YmxvY2tzOiBbe1xuXHRcdFx0XHRleHByZXNzaW9uOiAnQHRydWUnLFxuXHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdH1dLFxuXHRcdFx0dmFsdWU6ICcnLFxuXHRcdH07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBzdGFjazEgPSBbdGhpcy5yb290Tm9kZV07XG5cdFx0Y29uc3Qgc3RhY2syID0gWzB4MDAwMDAwMDAwMDBdO1xuXG5cdFx0bGV0IGl0ZW07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRmb3IodG1wbCA9IHRtcGwucmVwbGFjZSh0aGlzLkNPTU1FTlRfUkUsICcnKTs7IHRtcGwgPSB0bXBsLnN1YnN0cihDT0xVTU4pKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBjdXJyID0gc3RhY2sxW3N0YWNrMS5sZW5ndGggLSAxXTtcblx0XHRcdCBsZXQgIGluZHggPSBzdGFjazJbc3RhY2syLmxlbmd0aCAtIDFdO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgbSA9IHRtcGwubWF0Y2godGhpcy5TVEFURU1FTlRfUkUpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYobSA9PT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsaW5lICs9IHRoaXMuX2NvdW50KHRtcGwpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKHtcblx0XHRcdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0XHRcdGtleXdvcmQ6ICdAdGV4dCcsXG5cdFx0XHRcdFx0ZXhwcmVzc2lvbjogJycsXG5cdFx0XHRcdFx0YmxvY2tzOiBbXSxcblx0XHRcdFx0XHR2YWx1ZTogdG1wbCxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBlcnJvcnMgPSBbXTtcblxuXHRcdFx0XHRmb3IobGV0IGkgPSBzdGFjazEubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8qKi8gaWYoc3RhY2sxW2ldLmtleXdvcmQgPT09ICdpZicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZXJyb3JzLnB1c2goJ21pc3Npbmcga2V5d29yZCBgZW5kaWZgJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYoc3RhY2sxW2ldLmtleXdvcmQgPT09ICdmb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHQgXHRlcnJvcnMucHVzaCgnbWlzc2luZyBrZXl3b3JkIGBlbmRmb3JgJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoZXJyb3JzLmxlbmd0aCA+IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCAnICsgZXJyb3JzLmpvaW4oJywgJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgbWF0Y2ggPSBtWzBdO1xuXHRcdFx0Y29uc3Qga2V5d29yZCA9IG1bMV07XG5cdFx0XHRjb25zdCBleHByZXNzaW9uID0gbVsyXTtcblxuXHRcdFx0Y29sdW1uID0gbS5pbmRleCArIDB4MDAwMDAwMDAwMDtcblx0XHRcdENPTFVNTiA9IG0uaW5kZXggKyBtYXRjaC5sZW5ndGg7XG5cblx0XHRcdGNvbnN0IHZhbHVlID0gdG1wbC5zdWJzdHIoMCwgY29sdW1uKTtcblx0XHRcdGNvbnN0IFZBTFVFID0gdG1wbC5zdWJzdHIoMCwgQ09MVU1OKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGxpbmUgKz0gdGhpcy5fY291bnQoVkFMVUUpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodmFsdWUpXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRrZXl3b3JkOiAnQHRleHQnLFxuXHRcdFx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0c3dpdGNoKGtleXdvcmQpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZmx1c2gnOlxuXHRcdFx0XHRjYXNlICdhdXRvZXNjYXBlJzpcblx0XHRcdFx0Y2FzZSAnc3BhY2VsZXNzJzpcblx0XHRcdFx0Y2FzZSAndmVyYmF0aW0nOlxuXG5cdFx0XHRcdFx0LyogSUdOT1JFICovXG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2RvJzpcblx0XHRcdFx0Y2FzZSAnc2V0Jzpcblx0XHRcdFx0Y2FzZSAnaW5jbHVkZSc6XG5cblx0XHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRcdGtleXdvcmQ6IGtleXdvcmQsXG5cdFx0XHRcdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0XHRcdFx0YmxvY2tzOiBbXSxcblx0XHRcdFx0XHRcdHZhbHVlOiAnJyxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdpZic6XG5cdFx0XHRcdGNhc2UgJ2Zvcic6XG5cblx0XHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRcdGtleXdvcmQ6IGtleXdvcmQsXG5cdFx0XHRcdFx0XHRibG9ja3M6IFt7XG5cdFx0XHRcdFx0XHRcdGV4cHJlc3Npb246IGV4cHJlc3Npb24sXG5cdFx0XHRcdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0XHRcdFx0fV0sXG5cdFx0XHRcdFx0XHR2YWx1ZTogJycsXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaChpdGVtKTtcblxuXHRcdFx0XHRcdHN0YWNrMS5wdXNoKGl0ZW0pO1xuXHRcdFx0XHRcdHN0YWNrMi5wdXNoKDB4MDApO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbHNlaWYnOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZWxzZWlmYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aW5keCA9IGN1cnIuYmxvY2tzLmxlbmd0aDtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzLnB1c2goe1xuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogZXhwcmVzc2lvbixcblx0XHRcdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0c3RhY2syW3N0YWNrMi5sZW5ndGggLSAxXSA9IGluZHg7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2Vsc2UnOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnaWYnXG5cdFx0XHRcdFx0ICAgJiZcblx0XHRcdFx0XHQgICBjdXJyWydrZXl3b3JkJ10gIT09ICdmb3InXG5cdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbHNlYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aW5keCA9IGN1cnIuYmxvY2tzLmxlbmd0aDtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzLnB1c2goe1xuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogJ0B0cnVlJyxcblx0XHRcdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0c3RhY2syW3N0YWNrMi5sZW5ndGggLSAxXSA9IGluZHg7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2VuZGlmJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVuZGlmYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c3RhY2sxLnBvcCgpO1xuXHRcdFx0XHRcdHN0YWNrMi5wb3AoKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZW5kZm9yJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2ZvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbmRmb3JgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzdGFjazEucG9wKCk7XG5cdFx0XHRcdFx0c3RhY2syLnBvcCgpO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5rbm93biBrZXl3b3JkIGAnICsga2V5d29yZCArICdgJztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5yb290Tm9kZSwgbnVsbCwgMik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmVuZ2luZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmVuZ2luZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRWQVJJQUJMRV9SRTogL1xce1xce1xccyooLio/KVxccypcXH1cXH0vZyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9yZW5kZXI6IGZ1bmN0aW9uKHJlc3VsdCwgaXRlbSwgZGljdCA9IHt9LCB0bXBscyA9IHt9KVxuXHR7XG5cdFx0bGV0IG07XG5cblx0XHRsZXQgZXhwcmVzc2lvbjtcblxuXHRcdHRoaXMuZGljdCA9IGRpY3Q7XG5cdFx0dGhpcy50bXBscyA9IHRtcGxzO1xuXG5cdFx0c3dpdGNoKGl0ZW0ua2V5d29yZClcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERPICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2RvJzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChpdGVtLmV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTRVQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdzZXQnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdG0gPSBpdGVtLmV4cHJlc3Npb24ubWF0Y2goLyhbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzKj1cXHMqKC4rKS8pXG5cblx0XHRcdFx0aWYoIW0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIGludmFsaWQgYHNldGAgc3RhdGVtZW50Jztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0ZGljdFttWzFdXSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKG1bMl0sIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBAVEVYVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdAdGV4dCc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbS52YWx1ZS5yZXBsYWNlKHRoaXMuVkFSSUFCTEVfUkUsIGZ1bmN0aW9uKG1hdGNoLCBleHByZXNzaW9uKSB7XG5cblx0XHRcdFx0XHRsZXQgdmFsdWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6ICcnO1xuXHRcdFx0XHR9KSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJRiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdpZic6XG5cdFx0XHRjYXNlICdAcm9vdCc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aXRlbS5ibG9ja3MuZXZlcnkoKGJsb2NrKSA9PiB7XG5cblx0XHRcdFx0XHRleHByZXNzaW9uID0gYmxvY2suZXhwcmVzc2lvbjtcblxuXHRcdFx0XHRcdGlmKGV4cHJlc3Npb24gPT09ICdAdHJ1ZScgfHwgYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRibG9jay5saXN0LmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBpdGVtLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2Zvcic6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IHN5bTE7XG5cdFx0XHRcdGxldCBzeW0yO1xuXHRcdFx0XHRsZXQgZXhwcjtcblxuXHRcdFx0XHRtID0gaXRlbS5ibG9ja3NbMF0uZXhwcmVzc2lvbi5tYXRjaCgvKFthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMqLFxccyooW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccytpblxccysoLispLylcblxuXHRcdFx0XHRpZighbSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG0gPSBpdGVtLmJsb2Nrc1swXS5leHByZXNzaW9uLm1hdGNoKC8oW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccytpblxccysoLispLylcblxuXHRcdFx0XHRcdGlmKCFtKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgaW52YWxpZCBgZm9yYCBzdGF0ZW1lbnQnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c3ltMSA9IG1bMV07XG5cdFx0XHRcdFx0XHRzeW0yID0gbnVsbDtcblx0XHRcdFx0XHRcdGV4cHIgPSBtWzJdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRzeW0xID0gbVsxXTtcblx0XHRcdFx0XHRzeW0yID0gbVsyXTtcblx0XHRcdFx0XHRleHByID0gbVszXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3Qgb3JpZ1ZhbHVlID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwciwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvcmlnVmFsdWUpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IGl0ZXJWYWx1ZTtcblxuXHRcdFx0XHRpZih0eXBlTmFtZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpdGVyVmFsdWUgPSBzeW0yID8gT2JqZWN0LmVudHJpZXMob3JpZ1ZhbHVlKVxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgOiBPYmplY3Qua2V5cyhvcmlnVmFsdWUpXG5cdFx0XHRcdFx0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGl0ZXJWYWx1ZSA9IG9yaWdWYWx1ZTtcblxuXHRcdFx0XHRcdGlmKHR5cGVOYW1lICE9PSAnW29iamVjdCBBcnJheV0nXG5cdFx0XHRcdFx0ICAgJiZcblx0XHRcdFx0XHQgICB0eXBlTmFtZSAhPT0gJ1tvYmplY3QgU3RyaW5nXSdcblx0XHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIHJpZ2h0IG9wZXJhbmRlIG5vdCBpdGVyYWJsZSc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoc3ltMilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIHJpZ2h0IG9wZXJhbmRlIG5vdCBhbiBvYmplY3QnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgbCA9IGl0ZXJWYWx1ZS5sZW5ndGg7XG5cblx0XHRcdFx0aWYobCA+IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZXQgayA9IDB4MDAwMDAwMDAwMDAwMDA7XG5cblx0XHRcdFx0XHRjb25zdCBsaXN0ID0gaXRlbS5ibG9ja3NbMF0ubGlzdDtcblxuXHRcdFx0XHRcdGlmKHN5bTIpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNvbnN0IG9sZDEgPSBkaWN0WyhzeW0xKV07XG5cdFx0XHRcdFx0XHRjb25zdCBvbGQyID0gZGljdFsoc3ltMildO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMyA9IGRpY3RbJ2xvb3AnXTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3QubG9vcCA9IHtsZW5ndGg6IGwsIHBhcmVudDogZGljdFsnbG9vcCddfTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGZvcihjb25zdCBba2V5LCB2YWxdIG9mIGl0ZXJWYWx1ZSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0ZGljdFtzeW0xXSA9IGtleTtcblx0XHRcdFx0XHRcdFx0ZGljdFtzeW0yXSA9IHZhbDtcblxuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuZmlyc3QgPSAoayA9PT0gKDAgLSAwKSk7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5sYXN0ID0gKGsgPT09IChsIC0gMSkpO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5yZXZpbmRleDAgPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4MCA9IGs7XG5cdFx0XHRcdFx0XHRcdGsrKztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4ID0gbCAtIGs7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5pbmRleCA9IGs7XG5cblx0XHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gbGlzdClcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGxpc3Rbal0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGljdFsnbG9vcCddID0gb2xkMztcblx0XHRcdFx0XHRcdGRpY3RbKHN5bTIpXSA9IG9sZDI7XG5cdFx0XHRcdFx0XHRkaWN0WyhzeW0xKV0gPSBvbGQxO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjb25zdCBvbGQxID0gZGljdFsoc3ltMSldO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMiA9IGRpY3RbJ2xvb3AnXTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3QubG9vcCA9IHtsZW5ndGg6IGwsIHBhcmVudDogZGljdFsnbG9vcCddfTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGZvcihjb25zdCB2YWwgb2YgaXRlclZhbHVlKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRkaWN0W3N5bTFdID0gdmFsO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5maXJzdCA9IChrID09PSAoMCAtIDApKTtcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmxhc3QgPSAoayA9PT0gKGwgLSAxKSk7XG5cblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4MCA9IGwgLSBrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXgwID0gaztcblx0XHRcdFx0XHRcdFx0aysrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AucmV2aW5kZXggPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4ID0gaztcblxuXHRcdFx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBsaXN0KVxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbGlzdFtqXSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkaWN0Wydsb29wJ10gPSBvbGQyO1xuXHRcdFx0XHRcdFx0ZGljdFsoc3ltMSldID0gb2xkMTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKGl0ZW0uYmxvY2tzLmxlbmd0aCA+IDEpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Y29uc3QgbGlzdCA9IGl0ZW0uYmxvY2tzWzFdLmxpc3Q7XG5cblx0XHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGxpc3QpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGxpc3Rbal0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElOQ0xVREUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2luY2x1ZGUnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBtXzFfID0gaXRlbS5leHByZXNzaW9uLCB3aXRoX3N1YmV4cHIsIHdpdGhfY29udGV4dDtcblxuXHRcdFx0XHQvKiovIGlmKChtID0gbV8xXy5tYXRjaCgvKC4rKVxccyt3aXRoXFxzKyguKylcXHMrb25seSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSBtWzJdO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYoKG0gPSBtXzFfLm1hdGNoKC8oLispXFxzK3dpdGhcXHMrKC4rKSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSBtWzJdO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZigobSA9IG1fMV8ubWF0Y2goLyguKylcXHMrb25seSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSAne30nO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtXzFfO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9ICd7fSc7XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgZmlsZU5hbWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpIHx8ICcnO1xuXG5cdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChmaWxlTmFtZSkgIT09ICdbb2JqZWN0IFN0cmluZ10nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgc3RyaW5nIGV4cGVjdGVkJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgdmFyaWFibGVzID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwod2l0aF9zdWJleHByLCBpdGVtLmxpbmUsIGRpY3QpIHx8IHt9O1xuXG5cdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YXJpYWJsZXMpICE9PSAnW29iamVjdCBPYmplY3RdJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIG9iamVjdCBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGFtaVR3aWcuc3RkbGliLmluY2x1ZGUoXG5cdFx0XHRcdFx0ZmlsZU5hbWUsXG5cdFx0XHRcdFx0dmFyaWFibGVzLFxuXHRcdFx0XHRcdHdpdGhfY29udGV4dCxcblx0XHRcdFx0XHRmYWxzZVxuXHRcdFx0XHQpKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW5kZXI6IGZ1bmN0aW9uKHRtcGwsIGRpY3QgPSB7fSwgdG1wbHMgPSB7fSlcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0c3dpdGNoKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0bXBsKSlcblx0XHR7XG5cdFx0XHRjYXNlICdbb2JqZWN0IFN0cmluZ10nOlxuXHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBuZXcgYW1pVHdpZy50bXBsLkNvbXBpbGVyKHRtcGwpLnJvb3ROb2RlLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdbb2JqZWN0IE9iamVjdF0nOlxuXHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCAvKi0tLS0tLS0tLS0tLS0tKi90bXBsLyotLS0tLS0tLS0tLS0tLSovLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuY2FjaGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuY2FjaGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZGljdDoge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRldmFsOiBmdW5jdGlvbihleHByZXNzaW9uLCBsaW5lLCBfKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGY7XG5cblx0XHRpZihleHByZXNzaW9uIGluIHRoaXMuZGljdClcblx0XHR7XG5cdFx0XHRmID0gdGhpcy5kaWN0W2V4cHJlc3Npb25dO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0ZiA9IHRoaXMuZGljdFtleHByZXNzaW9uXSA9IGV2YWwoXG5cdFx0XHRcdGFtaVR3aWcuZXhwci5pbnRlcnByZXRlci5nZXRKUyhcblx0XHRcdFx0XHRuZXcgYW1pVHdpZy5leHByLkNvbXBpbGVyKGV4cHJlc3Npb24sIGxpbmUpXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIV8pIF8gPSB7fTtcblxuXHRcdHJldHVybiBmLmNhbGwoXywgXyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnN0ZGxpYiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnN0ZGxpYiA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVkFSSUFCTEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNVbmRlZmluZWQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggPT09IHVuZGVmaW5lZDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0RlZmluZWQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggIT09IHVuZGVmaW5lZDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc051bGwnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggPT09IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNOb3ROdWxsJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ICE9PSBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzRW1wdHknOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0aWYoeCA9PT0gbnVsbFxuXHRcdCAgIHx8XG5cdFx0ICAgeCA9PT0gZmFsc2Vcblx0XHQgICB8fFxuXHRcdCAgIHggPT09ICgoJycpKVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGNvbnN0IHR5cGVOYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuICh0eXBlTmFtZSA9PT0gJ1tvYmplY3QgQXJyYXldJyAmJiB4Lmxlbmd0aCA9PT0gMClcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgKHR5cGVOYW1lID09PSAnW29iamVjdCBPYmplY3RdJyAmJiBPYmplY3Qua2V5cyh4KS5sZW5ndGggPT09IDApXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTnVtYmVyJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IE51bWJlcl0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzU3RyaW5nJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzQXJyYXknOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc09iamVjdCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBPYmplY3RdJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0l0ZXJhYmxlJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGNvbnN0IHR5cGVOYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuIHR5cGVOYW1lID09PSAnW29iamVjdCBTdHJpbmddJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgQXJyYXldJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNFdmVuJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzTnVtYmVyKHgpICYmICh4ICYgMSkgPT09IDA7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNPZGQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNOdW1iZXIoeCkgJiYgKHggJiAxKSA9PT0gMTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBJVEVSQUJMRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0luT2JqZWN0JzogZnVuY3Rpb24oeCwgeSlcblx0e1xuXHRcdGlmKHRoaXMuaXNBcnJheSh5KVxuXHRcdCAgIHx8XG5cdFx0ICAgdGhpcy5pc1N0cmluZyh5KVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB5LmluZGV4T2YoeCkgPj0gMDtcblx0XHR9XG5cblx0XHRpZih0aGlzLmlzT2JqZWN0KHkpKVxuXHRcdHtcblx0XHRcdHJldHVybiB4IGluIHk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzSW5SYW5nZSc6IGZ1bmN0aW9uKHgsIHgxLCB4Milcblx0e1xuXHRcdGlmKHRoaXMuaXNOdW1iZXIoeDEpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzTnVtYmVyKHgyKVxuXHRcdCApIHtcblx0XHRcdHJldHVybiAoLyotLS0qL3gvKi0tLSovID49IC8qLS0tKi94MS8qLS0tKi8pXG5cdFx0XHQgICAgICAgJiZcblx0XHRcdCAgICAgICAoLyotLS0qL3gvKi0tLSovIDw9IC8qLS0tKi94Mi8qLS0tKi8pXG5cdFx0XHQ7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5pc1N0cmluZyh4MSkgJiYgeDEubGVuZ3RoID09PSAxXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHgyKSAmJiB4Mi5sZW5ndGggPT09IDFcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4gKHguY2hhckNvZGVBdCgwKSA+PSB4MS5jaGFyQ29kZUF0KDApKVxuXHRcdFx0ICAgICAgICYmXG5cdFx0XHQgICAgICAgKHguY2hhckNvZGVBdCgwKSA8PSB4Mi5jaGFyQ29kZUF0KDApKVxuXHRcdFx0O1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdyYW5nZSc6IGZ1bmN0aW9uKHgxLCB4Miwgc3RlcCA9IDEpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdC8qKi8gaWYodGhpcy5pc051bWJlcih4MSlcblx0XHQgICAgICAgICYmXG5cdFx0ICAgICAgICB0aGlzLmlzTnVtYmVyKHgyKVxuXHRcdCApIHtcblx0XHRcdGZvcihsZXQgaSA9IC8qLS0tKi94MS8qLS0tKi87IGkgPD0gLyotLS0qL3gyLyotLS0qLzsgaSArPSBzdGVwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQucHVzaCgvKi0tLS0tLS0tLS0tLS0tLSovKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLmlzU3RyaW5nKHgxKSAmJiB4MS5sZW5ndGggPT09IDFcblx0XHQgICAgICAgICYmXG5cdFx0ICAgICAgICB0aGlzLmlzU3RyaW5nKHgyKSAmJiB4Mi5sZW5ndGggPT09IDFcblx0XHQgKSB7XG5cdFx0XHRmb3IobGV0IGkgPSB4MS5jaGFyQ29kZUF0KDApOyBpIDw9IHgyLmNoYXJDb2RlQXQoMCk7IGkgKz0gc3RlcClcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbGVuZ3RoJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoeClcblx0XHQgICB8fFxuXHRcdCAgIHRoaXMuaXNBcnJheSh4KVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB4Lmxlbmd0aDtcblx0XHR9XG5cblx0XHRpZih0aGlzLmlzT2JqZWN0KHgpKVxuXHRcdHtcblx0XHRcdHJldHVybiBPYmplY3Qua2V5cyh4KS5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIDA7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2ZpcnN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpICYmIHgubGVuZ3RoID4gMCA/IHhbMHgwMDAwMDAwMDAwXSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sYXN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpICYmIHgubGVuZ3RoID4gMCA/IHhbeC5sZW5ndGggLSAxXSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9zbGljZSc6IGZ1bmN0aW9uKHgsIGlkeDEsIGlkeDIpXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMuaXNTdHJpbmcoeCkgfHwgdGhpcy5pc0FycmF5KHgpKSA/IHguc2xpY2UoaWR4MSwgaWR4MikgOiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9tZXJnZSc6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPiAxKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmlzU3RyaW5nKGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNTdHJpbmcoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0TC5wdXNoKGFyZ3VtZW50c1tpXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gTC5qb2luKCcnKTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRoaXMuaXNBcnJheShhcmd1bWVudHNbMF0pKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYXJndW1lbnRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzQXJyYXkoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gaXRlbSkgTC5wdXNoKGl0ZW1bal0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIEw7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmlzT2JqZWN0KGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEQgPSB7fTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNPYmplY3QoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gaXRlbSkgRFtqXSA9IGl0ZW1bal07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gRDtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NvcnQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHguc29ydCgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3JldmVyc2UnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHgucmV2ZXJzZSgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pvaW4nOiBmdW5jdGlvbih4LCBzZXApXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5qb2luKHNlcCkgOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfa2V5cyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc09iamVjdCh4KSA/IE9iamVjdC5rZXlzKHgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogU1RSSU5HUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnc3RhcnRzV2l0aCc6IGZ1bmN0aW9uKHMxLCBzMilcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoczEpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHMyKVxuXHRcdCApIHtcblx0XHRcdGNvbnN0IGJhc2UgPSAweDAwMDAwMDAwMDAwMDAwMDAwMDA7XG5cblx0XHRcdHJldHVybiBzMS5pbmRleE9mKHMyLCBiYXNlKSA9PT0gYmFzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZW5kc1dpdGgnOiBmdW5jdGlvbihzMSwgczIpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMxKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyhzMilcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBiYXNlID0gczEubGVuZ3RoIC0gczIubGVuZ3RoO1xuXG5cdFx0XHRyZXR1cm4gczEuaW5kZXhPZihzMiwgYmFzZSkgPT09IGJhc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21hdGNoJzogZnVuY3Rpb24ocywgcmVnZXgpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKCgocykpKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyhyZWdleClcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBpZHgxID0gcmVnZXguICBpbmRleE9mICAoJy8nKTtcblx0XHRcdGNvbnN0IGlkeDIgPSByZWdleC5sYXN0SW5kZXhPZignLycpO1xuXG5cdFx0XHRpZihpZHgxID09PSAwIHx8IGlkeDEgPCBpZHgyKVxuXHRcdFx0e1xuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4LnN1YnN0cmluZyhpZHgxICsgMSwgaWR4MiksIHJlZ2V4LnN1YnN0cmluZyhpZHgyICsgMSkpLnRlc3Qocyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2goZXJyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0LyogSUdOT1JFICovXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2RlZmF1bHQnOiBmdW5jdGlvbihzMSwgczIpXG5cdHtcblx0XHRyZXR1cm4gczEgfHwgczIgfHwgJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2xvd2VyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy50b0xvd2VyQ2FzZSgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3VwcGVyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy50b1VwcGVyQ2FzZSgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2NhcGl0YWxpemUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gcy50cmltKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9eXFxTL2csIGZ1bmN0aW9uKGMpIHtcblxuXHRcdFx0XHRyZXR1cm4gYy50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl90aXRsZSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMpKVxuXHRcdHtcblx0XHRcdHJldHVybiBzLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyg/Ol58XFxzKVxcUy9nLCBmdW5jdGlvbihjKSB7XG5cblx0XHRcdFx0cmV0dXJuIGMudG9VcHBlckNhc2UoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdHJpbSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudHJpbSgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfcmVwbGFjZSc6IGZ1bmN0aW9uKHMsIG9sZFN0cnMsIG5ld1N0cnMpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdGNvbnN0IGwgPSAoKChzKSkpLmxlbmd0aDtcblx0XHRjb25zdCBtID0gb2xkU3Rycy5sZW5ndGg7XG5cdFx0Y29uc3QgbiA9IG5ld1N0cnMubGVuZ3RoO1xuXG5cdFx0aWYobSAhPSBuKVxuXHRcdHtcblx0XHRcdHRocm93ICdpbnRlcm5hbCBlcnJvcic7XG5cdFx0fVxuXG5fX2wwOlx0Zm9yKGxldCBpID0gMDsgaSA8IGw7IGkgKz0gMClcblx0XHR7XG5cdFx0XHRjb25zdCBwID0gcy5zdWJzdHJpbmcoaSk7XG5cblx0XHRcdGZvcihsZXQgaiA9IDA7IGogPCBtOyBqICs9IDEpXG5cdFx0XHR7XG5cdFx0XHRcdGlmKHAuaW5kZXhPZihvbGRTdHJzW2pdKSA9PT0gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKG5ld1N0cnNbal0pO1xuXG5cdFx0XHRcdFx0aSArPSBvbGRTdHJzW2pdLmxlbmd0aDtcblxuXHRcdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmVzdWx0LnB1c2gocy5jaGFyQXQoaSsrKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfdGV4dFRvSHRtbFgnOiBbJyYnICAgICwgJ1wiJyAgICAgLCAnPCcgICAsICc+JyAgIF0sXG5cdCdfdGV4dFRvSHRtbFknOiBbJyZhbXA7JywgJyZxdW90OycsICcmbHQ7JywgJyZndDsnXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfdGV4dFRvU3RyaW5nWCc6IFsnXFxcXCcgICwgJ1xcbicgLCAnXCInICAsICdcXCcnICBdLFxuXHQnX3RleHRUb1N0cmluZ1knOiBbJ1xcXFxcXFxcJywgJ1xcXFxuJywgJ1xcXFxcIicsICdcXFxcXFwnJ10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3RleHRUb0pzb25TdHJpbmdYJzogWydcXFxcJyAgLCAnXFxuJyAsICdcIicgIF0sXG5cdCdfdGV4dFRvSnNvblN0cmluZ1knOiBbJ1xcXFxcXFxcJywgJ1xcXFxuJywgJ1xcXFxcIiddLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9lc2NhcGUnOiBmdW5jdGlvbihzLCBtb2RlKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRzd2l0Y2gobW9kZSB8fCAnaHRtbCcpXG5cdFx0XHR7XG5cdFx0XHRcdGNhc2UgJ2h0bWwnOlxuXHRcdFx0XHRjYXNlICdodG1sX2F0dHInOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb0h0bWxYLCB0aGlzLl90ZXh0VG9IdG1sWSk7XG5cblx0XHRcdFx0Y2FzZSAnanMnOlxuXHRcdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb1N0cmluZ1gsIHRoaXMuX3RleHRUb1N0cmluZ1kpO1xuXG5cdFx0XHRcdGNhc2UgJ2pzb24nOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb0pzb25TdHJpbmdYLCB0aGlzLl90ZXh0VG9Kc29uU3RyaW5nWSk7XG5cblx0XHRcdFx0Y2FzZSAndXJsJzpcblx0XHRcdFx0XHRyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHMpO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIHM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl91cmxfZW5jb2RlJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gZW5jb2RlVVJJQ29tcG9uZW50KHMpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbmwyYnInOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnJlcGxhY2UoL1xcbi9nLCAnPGJyLz4nKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3Jhdyc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHNcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yZXBsYWNlJzogZnVuY3Rpb24ocywgZGljdClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpICYmIHRoaXMuaXNPYmplY3QoZGljdCkgPyB0aGlzLl9yZXBsYWNlKHMsIE9iamVjdC5rZXlzKGRpY3QpLCBPYmplY3QudmFsdWVzKGRpY3QpKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfc3BsaXQnOiBmdW5jdGlvbihzLCBzZXAsIG1heClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy5zcGxpdChzZXAsIG1heClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6IFtdXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIE5VTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9hYnMnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE1hdGguYWJzKHgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yb3VuZCc6IGZ1bmN0aW9uKHgsIG1vZGUpXG5cdHtcblx0XHRzd2l0Y2gobW9kZSlcblx0XHR7XG5cdFx0XHRjYXNlICdjZWlsJzpcblx0XHRcdFx0cmV0dXJuIE1hdGguY2VpbCh4KTtcblxuXHRcdFx0Y2FzZSAnZmxvb3InOlxuXHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih4KTtcblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIE1hdGgucm91bmQoeCk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21pbic6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGFyZ3MgPSAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgJiYgKHRoaXMuaXNBcnJheShhcmd1bWVudHNbMF0pIHx8IHRoaXMuaXNPYmplY3QoYXJndW1lbnRzWzBdKSkgPyBhcmd1bWVudHNbMF1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYXJndW1lbnRzXG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHJlc3VsdCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcblxuXHRcdGZvcihjb25zdCBpIGluIGFyZ3MpXG5cdFx0e1xuXHRcdFx0aWYoIXRoaXMuaXNOdW1iZXIoYXJnc1tpXSkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBOdW1iZXIuTmFOO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihyZXN1bHQgPiBhcmdzW2ldKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSBhcmdzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnbWF4JzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgYXJncyA9IChhcmd1bWVudHMubGVuZ3RoID09PSAxKSAmJiAodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkgfHwgdGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKSA/IGFyZ3VtZW50c1swXVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhcmd1bWVudHNcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgcmVzdWx0ID0gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO1xuXG5cdFx0Zm9yKGNvbnN0IGkgaW4gYXJncylcblx0XHR7XG5cdFx0XHRpZighdGhpcy5pc051bWJlcihhcmdzW2ldKSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIE51bWJlci5OYU47XG5cdFx0XHR9XG5cblx0XHRcdGlmKHJlc3VsdCA8IGFyZ3NbaV0pXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdCA9IGFyZ3NbaV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBSQU5ET00gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdyYW5kb20nOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0Y29uc3QgeSA9IE1hdGgucmFuZG9tKCk7XG5cblx0XHRpZih4KVxuXHRcdHtcblx0XHRcdGlmKHRoaXMuaXNBcnJheSh4KVxuXHRcdFx0ICAgfHxcblx0XHRcdCAgIHRoaXMuaXNPYmplY3QoeClcblx0XHRcdCApIHtcblx0XHRcdCBcdGNvbnN0IFggPSBPYmplY3Qua2V5cyh4KTtcblxuXHRcdFx0XHRyZXR1cm4geFtcblx0XHRcdFx0XHRYW01hdGguZmxvb3IoWC5sZW5ndGggKiB5KV1cblx0XHRcdFx0XTtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy5pc1N0cmluZyh4KSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIHhbTWF0aC5mbG9vcih4Lmxlbmd0aCAqIHkpXTtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy5pc051bWJlcih4KSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoeCAqIHkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHggPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcblxuXHRcdHJldHVybiBNYXRoLmZsb29yKHggKiB5KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBKU09OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfanNvbl9lbmNvZGUnOiBmdW5jdGlvbih4LCBpbmRlbnQpXG5cdHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoeCwgbnVsbCwgdGhpcy5pc051bWJlcihpbmRlbnQpID8gaW5kZW50IDogMik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pzb25fanNwYXRoJzogZnVuY3Rpb24oeCwgcGF0aClcblx0e1xuXHRcdHJldHVybiB0eXBlb2YgSlNQYXRoICE9PSAndW5kZWZpbmVkJyA/IEpTUGF0aC5hcHBseShwYXRoLCB4KVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFRFTVBMQVRFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2luY2x1ZGUnOiBmdW5jdGlvbihmaWxlTmFtZSwgdmFyaWFibGVzID0ge30sIHdpdGhDb250ZXh0ID0gdHJ1ZSwgaWdub3JlTWlzc2luZyA9IGZhbHNlKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoZmlsZU5hbWUgaW4gYW1pVHdpZy5lbmdpbmUudG1wbHMpXG5cdFx0e1xuXHRcdFx0Y29uc3QgdGVtcCA9IHt9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYod2l0aENvbnRleHQpXG5cdFx0XHR7XG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFtaVR3aWcuZW5naW5lLmRpY3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZW1wW2ldID0gYW1pVHdpZy5lbmdpbmUuZGljdFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodmFyaWFibGVzKVxuXHRcdFx0e1xuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiAvKi0qL3ZhcmlhYmxlcy8qLSovKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGVtcFtpXSA9IC8qLSovdmFyaWFibGVzLyotKi9baV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJldHVybiBhbWlUd2lnLmVuZ2luZS5yZW5kZXIoYW1pVHdpZy5lbmdpbmUudG1wbHNbZmlsZU5hbWVdLCB0ZW1wKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIWlnbm9yZU1pc3NpbmcpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGNvdWxkIG5vdCBvcGVuIGAnICsgZmlsZU5hbWUgKyAnYCc7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5zdGRsaWIuZmlsdGVyX2UgPSBhbWlUd2lnLnN0ZGxpYi5maWx0ZXJfZXNjYXBlO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLmludGVycHJldGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLmludGVycHJldGVyID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9nZXRKUzogZnVuY3Rpb24obm9kZSlcblx0e1xuXHRcdGxldCBMO1xuXHRcdGxldCB4O1xuXHRcdGxldCBsZWZ0O1xuXHRcdGxldCByaWdodDtcblx0XHRsZXQgb3BlcmF0b3I7XG5cblx0XHRzd2l0Y2gobm9kZS5ub2RlVHlwZSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIExTVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5MU1Q6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUubGlzdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaCgvKi0tLS0tKi8gdGhpcy5fZ2V0SlMobm9kZS5saXN0W2ldKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiAnWycgKyBMLmpvaW4oJywnKSArICddJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBESUMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRElDOlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmRpY3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2goaSArICc6JyArIHRoaXMuX2dldEpTKG5vZGUuZGljdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gJ3snICsgTC5qb2luKCcsJykgKyAnfSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRlVOICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTjpcblx0XHQgXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUubGlzdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaCh0aGlzLl9nZXRKUyhub2RlLmxpc3RbaV0pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHQgXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiBub2RlLm5vZGVWYWx1ZSArICcoJyArIEwuam9pbignLCcpICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFZBUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5WQVI6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUubGlzdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaCgnWycgKyB0aGlzLl9nZXRKUyhub2RlLmxpc3RbaV0pICsgJ10nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuIEwubGVuZ3RoID4gMCA/IG5vZGUubm9kZVZhbHVlICsgTC5qb2luKCcnKSA6IG5vZGUubm9kZVZhbHVlO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFRFUk1JTkFMICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTDpcblxuXHRcdFx0XHRyZXR1cm4gbm9kZS5ub2RlVmFsdWU7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLklTOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblxuXHRcdFx0XHRzd2l0Y2gobm9kZS5ub2RlUmlnaHQubm9kZVR5cGUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuREVGSU5FRDpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNEZWZpbmVkKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLk5VTEw6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzTnVsbCgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5FTVBUWTpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNFbXB0eSgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5JVEVSQUJMRTpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNJdGVyYWJsZSgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5FVkVOOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0V2ZW4oJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuT0REOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc09kZCgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSU4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLklOOlxuXG5cdFx0XHRcdGlmKG5vZGUubm9kZVJpZ2h0Lm5vZGVUeXBlICE9PSBhbWlUd2lnLmV4cHIudG9rZW5zLlJBTkdFKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0luT2JqZWN0KCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0eCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXG5cdFx0XHRcdFx0bGVmdCA9IG5vZGUubm9kZVJpZ2h0Lm5vZGVMZWZ0Lm5vZGVWYWx1ZTtcblx0XHRcdFx0XHRyaWdodCA9IG5vZGUubm9kZVJpZ2h0Lm5vZGVSaWdodC5ub2RlVmFsdWU7XG5cblx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzSW5SYW5nZSgnICsgeCArICcsJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNUQVJUU19XSVRIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5TVEFSVFNfV0lUSDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuc3RhcnRzV2l0aCgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVORFNfV0lUSCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5FTkRTX1dJVEg6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmVuZHNXaXRoKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogTUFUQ0hFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLk1BVENIRVM6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLm1hdGNoKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogUkFOR0UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlJBTkdFOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5yYW5nZSgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERPVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ET1Q6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRpZihub2RlLm5vZGVWYWx1ZVswXSA9PT0gJy4nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIGxlZnQgKyAnLicgKyByaWdodDtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gbGVmdCArICdbJyArIHJpZ2h0ICsgJ10nO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRkxESVYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkZMRElWOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdNYXRoLmZsb29yKCcgKyBsZWZ0ICsgJy8nICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogUE9XRVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlBPV0VSOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdNYXRoLnBvdygnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERPVUJMRV9RVUVTVElPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ET1VCTEVfUVVFU1RJT046XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJygoJyArIGxlZnQgKyAnKSB8fCAoJyArIHJpZ2h0ICsgJykpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdC8qIFVOSUFSWSBPUEVSQVRPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYobm9kZS5ub2RlTGVmdCA9PT0gbnVsbFxuXHRcdFx0XHQgICAmJlxuXHRcdFx0XHQgICBub2RlLm5vZGVSaWdodCAhPT0gbnVsbFxuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0b3BlcmF0b3IgPSAobm9kZS5ub2RlVHlwZSAhPT0gYW1pVHdpZy5leHByLnRva2Vucy5OT1QpID8gbm9kZS5ub2RlVmFsdWUgOiAnISc7XG5cblx0XHRcdFx0XHRyZXR1cm4gb3BlcmF0b3IgKyAnKCcgKyB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCkgKyAnKSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ICE9PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ID09PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRvcGVyYXRvciA9IChub2RlLm5vZGVUeXBlICE9PSBhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkgPyBub2RlLm5vZGVWYWx1ZSA6ICchJztcblxuXHRcdFx0XHRcdHJldHVybiAnKCcgKyB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KSArICcpJyArIG9wZXJhdG9yO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogQklOQVJZIE9QRVJBVE9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ICE9PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ICE9PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRzd2l0Y2gobm9kZS5ub2RlVHlwZSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfT1I6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJ3x8Jztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9BTkQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJyYmJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnfCc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfWE9SOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICdeJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9BTkQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJyYnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5DT05DQVQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJysnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gbm9kZS5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gJygnICsgbGVmdCArIG9wZXJhdG9yICsgcmlnaHQgKyAnKSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0SlM6IGZ1bmN0aW9uKGV4cHIpXG5cdHtcblx0XHRyZXR1cm4gJyhmdW5jdGlvbihfKSB7IHJldHVybiAnICsgdGhpcy5fZ2V0SlMoZXhwci5yb290Tm9kZSkgKyAnOyB9KSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRldmFsOiBmdW5jdGlvbihleHByLCBfKVxuXHR7XG5cdFx0aWYoIV8pIF8gPSB7fTtcblxuXHRcdHJldHVybiBldmFsKHRoaXMuZ2V0SlMoZXhwcikpLmNhbGwoXywgXyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiKGZ1bmN0aW9uKCkge1xuXG52YXIgU1lOVEFYID0ge1xuICAgICAgICBQQVRIICAgICAgICAgICAgOiAxLFxuICAgICAgICBTRUxFQ1RPUiAgICAgICAgOiAyLFxuICAgICAgICBPQkpfUFJFRCAgICAgICAgOiAzLFxuICAgICAgICBQT1NfUFJFRCAgICAgICAgOiA0LFxuICAgICAgICBMT0dJQ0FMX0VYUFIgICAgOiA1LFxuICAgICAgICBDT01QQVJJU09OX0VYUFIgOiA2LFxuICAgICAgICBNQVRIX0VYUFIgICAgICAgOiA3LFxuICAgICAgICBDT05DQVRfRVhQUiAgICAgOiA4LFxuICAgICAgICBVTkFSWV9FWFBSICAgICAgOiA5LFxuICAgICAgICBQT1NfRVhQUiAgICAgICAgOiAxMCxcbiAgICAgICAgTElURVJBTCAgICAgICAgIDogMTFcbiAgICB9O1xuXG4vLyBwYXJzZXJcblxudmFyIHBhcnNlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIFRPS0VOID0ge1xuICAgICAgICAgICAgSUQgICAgOiAxLFxuICAgICAgICAgICAgTlVNICAgOiAyLFxuICAgICAgICAgICAgU1RSICAgOiAzLFxuICAgICAgICAgICAgQk9PTCAgOiA0LFxuICAgICAgICAgICAgTlVMTCAgOiA1LFxuICAgICAgICAgICAgUFVOQ1QgOiA2LFxuICAgICAgICAgICAgRU9QICAgOiA3XG4gICAgICAgIH0sXG4gICAgICAgIE1FU1NBR0VTID0ge1xuICAgICAgICAgICAgVU5FWFBfVE9LRU4gOiAnVW5leHBlY3RlZCB0b2tlbiBcIiUwXCInLFxuICAgICAgICAgICAgVU5FWFBfRU9QICAgOiAnVW5leHBlY3RlZCBlbmQgb2YgcGF0aCdcbiAgICAgICAgfTtcblxuICAgIHZhciBwYXRoLCBpZHgsIGJ1ZiwgbGVuO1xuXG4gICAgZnVuY3Rpb24gcGFyc2UoX3BhdGgpIHtcbiAgICAgICAgcGF0aCA9IF9wYXRoLnNwbGl0KCcnKTtcbiAgICAgICAgaWR4ID0gMDtcbiAgICAgICAgYnVmID0gbnVsbDtcbiAgICAgICAgbGVuID0gcGF0aC5sZW5ndGg7XG5cbiAgICAgICAgdmFyIHJlcyA9IHBhcnNlUGF0aENvbmNhdEV4cHIoKSxcbiAgICAgICAgICAgIHRva2VuID0gbGV4KCk7XG5cbiAgICAgICAgaWYodG9rZW4udHlwZSAhPT0gVE9LRU4uRU9QKSB7XG4gICAgICAgICAgICB0aHJvd1VuZXhwZWN0ZWQodG9rZW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBhdGhDb25jYXRFeHByKCkge1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlUGF0aENvbmNhdFBhcnRFeHByKCksXG4gICAgICAgICAgICBvcGVyYW5kcztcblxuICAgICAgICB3aGlsZShtYXRjaCgnfCcpKSB7XG4gICAgICAgICAgICBsZXgoKTtcbiAgICAgICAgICAgIChvcGVyYW5kcyB8fCAob3BlcmFuZHMgPSBbZXhwcl0pKS5wdXNoKHBhcnNlUGF0aENvbmNhdFBhcnRFeHByKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wZXJhbmRzP1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguQ09OQ0FUX0VYUFIsXG4gICAgICAgICAgICAgICAgYXJncyA6IG9wZXJhbmRzXG4gICAgICAgICAgICB9IDpcbiAgICAgICAgICAgIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQYXRoQ29uY2F0UGFydEV4cHIoKSB7XG4gICAgICAgIHJldHVybiBtYXRjaCgnKCcpP1xuICAgICAgICAgICAgcGFyc2VQYXRoR3JvdXBFeHByKCkgOlxuICAgICAgICAgICAgcGFyc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQYXRoR3JvdXBFeHByKCkge1xuICAgICAgICBleHBlY3QoJygnKTtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZVBhdGhDb25jYXRFeHByKCk7XG4gICAgICAgIGV4cGVjdCgnKScpO1xuXG4gICAgICAgIHZhciBwYXJ0cyA9IFtdLFxuICAgICAgICAgICAgcGFydDtcbiAgICAgICAgd2hpbGUoKHBhcnQgPSBwYXJzZVByZWRpY2F0ZSgpKSkge1xuICAgICAgICAgICAgcGFydHMucHVzaChwYXJ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFwYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBleHByO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZXhwci50eXBlID09PSBTWU5UQVguUEFUSCkge1xuICAgICAgICAgICAgZXhwci5wYXJ0cyA9IGV4cHIucGFydHMuY29uY2F0KHBhcnRzKTtcbiAgICAgICAgICAgIHJldHVybiBleHByO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFydHMudW5zaGlmdChleHByKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSAgOiBTWU5UQVguUEFUSCxcbiAgICAgICAgICAgIHBhcnRzIDogcGFydHNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVByZWRpY2F0ZSgpIHtcbiAgICAgICAgaWYobWF0Y2goJ1snKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlUG9zUHJlZGljYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtYXRjaCgneycpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VPYmplY3RQcmVkaWNhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1hdGNoKCcoJykpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVBhdGhHcm91cEV4cHIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUGF0aCgpIHtcbiAgICAgICAgaWYoIW1hdGNoUGF0aCgpKSB7XG4gICAgICAgICAgICB0aHJvd1VuZXhwZWN0ZWQobGV4KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZyb21Sb290ID0gZmFsc2UsXG4gICAgICAgICAgICBzdWJzdDtcblxuICAgICAgICBpZihtYXRjaCgnXicpKSB7XG4gICAgICAgICAgICBsZXgoKTtcbiAgICAgICAgICAgIGZyb21Sb290ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKG1hdGNoU3Vic3QoKSkge1xuICAgICAgICAgICAgc3Vic3QgPSBsZXgoKS52YWwuc3Vic3RyKDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBhcnRzID0gW10sXG4gICAgICAgICAgICBwYXJ0O1xuICAgICAgICB3aGlsZSgocGFydCA9IHBhcnNlUGF0aFBhcnQoKSkpIHtcbiAgICAgICAgICAgIHBhcnRzLnB1c2gocGFydCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSAgICAgOiBTWU5UQVguUEFUSCxcbiAgICAgICAgICAgIGZyb21Sb290IDogZnJvbVJvb3QsXG4gICAgICAgICAgICBzdWJzdCAgICA6IHN1YnN0LFxuICAgICAgICAgICAgcGFydHMgICAgOiBwYXJ0c1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUGF0aFBhcnQoKSB7XG4gICAgICAgIHJldHVybiBtYXRjaFNlbGVjdG9yKCk/XG4gICAgICAgICAgICBwYXJzZVNlbGVjdG9yKCkgOlxuICAgICAgICAgICAgcGFyc2VQcmVkaWNhdGUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVNlbGVjdG9yKCkge1xuICAgICAgICB2YXIgc2VsZWN0b3IgPSBsZXgoKS52YWwsXG4gICAgICAgICAgICB0b2tlbiA9IGxvb2thaGVhZCgpLFxuICAgICAgICAgICAgcHJvcDtcblxuICAgICAgICBpZihtYXRjaCgnKicpIHx8IHRva2VuLnR5cGUgPT09IFRPS0VOLklEIHx8IHRva2VuLnR5cGUgPT09IFRPS0VOLlNUUikge1xuICAgICAgICAgICAgcHJvcCA9IGxleCgpLnZhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlICAgICA6IFNZTlRBWC5TRUxFQ1RPUixcbiAgICAgICAgICAgIHNlbGVjdG9yIDogc2VsZWN0b3IsXG4gICAgICAgICAgICBwcm9wICAgICA6IHByb3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBvc1ByZWRpY2F0ZSgpIHtcbiAgICAgICAgZXhwZWN0KCdbJyk7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VQb3NFeHByKCk7XG4gICAgICAgIGV4cGVjdCgnXScpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlIDogU1lOVEFYLlBPU19QUkVELFxuICAgICAgICAgICAgYXJnICA6IGV4cHJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZU9iamVjdFByZWRpY2F0ZSgpIHtcbiAgICAgICAgZXhwZWN0KCd7Jyk7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VMb2dpY2FsT1JFeHByKCk7XG4gICAgICAgIGV4cGVjdCgnfScpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlIDogU1lOVEFYLk9CSl9QUkVELFxuICAgICAgICAgICAgYXJnICA6IGV4cHJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUxvZ2ljYWxPUkV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VMb2dpY2FsQU5ERXhwcigpLFxuICAgICAgICAgICAgb3BlcmFuZHM7XG5cbiAgICAgICAgd2hpbGUobWF0Y2goJ3x8JykpIHtcbiAgICAgICAgICAgIGxleCgpO1xuICAgICAgICAgICAgKG9wZXJhbmRzIHx8IChvcGVyYW5kcyA9IFtleHByXSkpLnB1c2gocGFyc2VMb2dpY2FsQU5ERXhwcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcGVyYW5kcz9cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLkxPR0lDQUxfRVhQUixcbiAgICAgICAgICAgICAgICBvcCAgIDogJ3x8JyxcbiAgICAgICAgICAgICAgICBhcmdzIDogb3BlcmFuZHNcbiAgICAgICAgICAgIH0gOlxuICAgICAgICAgICAgZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUxvZ2ljYWxBTkRFeHByKCkge1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlRXF1YWxpdHlFeHByKCksXG4gICAgICAgICAgICBvcGVyYW5kcztcblxuICAgICAgICB3aGlsZShtYXRjaCgnJiYnKSkge1xuICAgICAgICAgICAgbGV4KCk7XG4gICAgICAgICAgICAob3BlcmFuZHMgfHwgKG9wZXJhbmRzID0gW2V4cHJdKSkucHVzaChwYXJzZUVxdWFsaXR5RXhwcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcGVyYW5kcz9cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLkxPR0lDQUxfRVhQUixcbiAgICAgICAgICAgICAgICBvcCAgIDogJyYmJyxcbiAgICAgICAgICAgICAgICBhcmdzIDogb3BlcmFuZHNcbiAgICAgICAgICAgIH0gOlxuICAgICAgICAgICAgZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUVxdWFsaXR5RXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZVJlbGF0aW9uYWxFeHByKCk7XG5cbiAgICAgICAgd2hpbGUoXG4gICAgICAgICAgICBtYXRjaCgnPT0nKSB8fCBtYXRjaCgnIT0nKSB8fCBtYXRjaCgnPT09JykgfHwgbWF0Y2goJyE9PScpIHx8XG4gICAgICAgICAgICBtYXRjaCgnXj09JykgfHwgbWF0Y2goJz09XicpIHx8bWF0Y2goJ149JykgfHwgbWF0Y2goJz1eJykgfHxcbiAgICAgICAgICAgIG1hdGNoKCckPT0nKSB8fCBtYXRjaCgnPT0kJykgfHwgbWF0Y2goJyQ9JykgfHwgbWF0Y2goJz0kJykgfHxcbiAgICAgICAgICAgIG1hdGNoKCcqPT0nKSB8fCBtYXRjaCgnPT0qJyl8fCBtYXRjaCgnKj0nKSB8fCBtYXRjaCgnPSonKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGV4cHIgPSB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5DT01QQVJJU09OX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6IGxleCgpLnZhbCxcbiAgICAgICAgICAgICAgICBhcmdzIDogW2V4cHIsIHBhcnNlRXF1YWxpdHlFeHByKCldXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VSZWxhdGlvbmFsRXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZUFkZGl0aXZlRXhwcigpO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCc8JykgfHwgbWF0Y2goJz4nKSB8fCBtYXRjaCgnPD0nKSB8fCBtYXRjaCgnPj0nKSkge1xuICAgICAgICAgICAgZXhwciA9IHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLkNPTVBBUklTT05fRVhQUixcbiAgICAgICAgICAgICAgICBvcCAgIDogbGV4KCkudmFsLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBbZXhwciwgcGFyc2VSZWxhdGlvbmFsRXhwcigpXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlQWRkaXRpdmVFeHByKCkge1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlTXVsdGlwbGljYXRpdmVFeHByKCk7XG5cbiAgICAgICAgd2hpbGUobWF0Y2goJysnKSB8fCBtYXRjaCgnLScpKSB7XG4gICAgICAgICAgICBleHByID0ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguTUFUSF9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiBsZXgoKS52YWwsXG4gICAgICAgICAgICAgICAgYXJncyA6IFtleHByLCBwYXJzZU11bHRpcGxpY2F0aXZlRXhwcigpXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlTXVsdGlwbGljYXRpdmVFeHByKCkge1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlVW5hcnlFeHByKCk7XG5cbiAgICAgICAgd2hpbGUobWF0Y2goJyonKSB8fCBtYXRjaCgnLycpIHx8IG1hdGNoKCclJykpIHtcbiAgICAgICAgICAgIGV4cHIgPSB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5NQVRIX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6IGxleCgpLnZhbCxcbiAgICAgICAgICAgICAgICBhcmdzIDogW2V4cHIsIHBhcnNlTXVsdGlwbGljYXRpdmVFeHByKCldXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQb3NFeHByKCkge1xuICAgICAgICBpZihtYXRjaCgnOicpKSB7XG4gICAgICAgICAgICBsZXgoKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgOiBTWU5UQVguUE9TX0VYUFIsXG4gICAgICAgICAgICAgICAgdG9JZHggOiBwYXJzZVVuYXJ5RXhwcigpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZyb21FeHByID0gcGFyc2VVbmFyeUV4cHIoKTtcbiAgICAgICAgaWYobWF0Y2goJzonKSkge1xuICAgICAgICAgICAgbGV4KCk7XG4gICAgICAgICAgICBpZihtYXRjaCgnXScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgICA6IFNZTlRBWC5QT1NfRVhQUixcbiAgICAgICAgICAgICAgICAgICAgZnJvbUlkeCA6IGZyb21FeHByXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICAgIDogU1lOVEFYLlBPU19FWFBSLFxuICAgICAgICAgICAgICAgIGZyb21JZHggOiBmcm9tRXhwcixcbiAgICAgICAgICAgICAgICB0b0lkeCAgIDogcGFyc2VVbmFyeUV4cHIoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlIDogU1lOVEFYLlBPU19FWFBSLFxuICAgICAgICAgICAgaWR4ICA6IGZyb21FeHByXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VVbmFyeUV4cHIoKSB7XG4gICAgICAgIGlmKG1hdGNoKCchJykgfHwgbWF0Y2goJy0nKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLlVOQVJZX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6IGxleCgpLnZhbCxcbiAgICAgICAgICAgICAgICBhcmcgIDogcGFyc2VVbmFyeUV4cHIoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJzZVByaW1hcnlFeHByKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQcmltYXJ5RXhwcigpIHtcbiAgICAgICAgdmFyIHRva2VuID0gbG9va2FoZWFkKCksXG4gICAgICAgICAgICB0eXBlID0gdG9rZW4udHlwZTtcblxuICAgICAgICBpZih0eXBlID09PSBUT0tFTi5TVFIgfHwgdHlwZSA9PT0gVE9LRU4uTlVNIHx8IHR5cGUgPT09IFRPS0VOLkJPT0wgfHwgdHlwZSA9PT0gVE9LRU4uTlVMTCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLkxJVEVSQUwsXG4gICAgICAgICAgICAgICAgdmFsICA6IGxleCgpLnZhbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1hdGNoUGF0aCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VQYXRoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtYXRjaCgnKCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VHcm91cEV4cHIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aHJvd1VuZXhwZWN0ZWQobGV4KCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlR3JvdXBFeHByKCkge1xuICAgICAgICBleHBlY3QoJygnKTtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZUxvZ2ljYWxPUkV4cHIoKTtcbiAgICAgICAgZXhwZWN0KCcpJyk7XG5cbiAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2godmFsKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGxvb2thaGVhZCgpO1xuICAgICAgICByZXR1cm4gdG9rZW4udHlwZSA9PT0gVE9LRU4uUFVOQ1QgJiYgdG9rZW4udmFsID09PSB2YWw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2hQYXRoKCkge1xuICAgICAgICByZXR1cm4gbWF0Y2hTZWxlY3RvcigpIHx8IG1hdGNoU3Vic3QoKSB8fCBtYXRjaCgnXicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoU2VsZWN0b3IoKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGxvb2thaGVhZCgpO1xuICAgICAgICBpZih0b2tlbi50eXBlID09PSBUT0tFTi5QVU5DVCkge1xuICAgICAgICAgICAgdmFyIHZhbCA9IHRva2VuLnZhbDtcbiAgICAgICAgICAgIHJldHVybiB2YWwgPT09ICcuJyB8fCB2YWwgPT09ICcuLic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2hTdWJzdCgpIHtcbiAgICAgICAgdmFyIHRva2VuID0gbG9va2FoZWFkKCk7XG4gICAgICAgIHJldHVybiB0b2tlbi50eXBlID09PSBUT0tFTi5JRCAmJiB0b2tlbi52YWxbMF0gPT09ICckJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHBlY3QodmFsKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGxleCgpO1xuICAgICAgICBpZih0b2tlbi50eXBlICE9PSBUT0tFTi5QVU5DVCB8fCB0b2tlbi52YWwgIT09IHZhbCkge1xuICAgICAgICAgICAgdGhyb3dVbmV4cGVjdGVkKHRva2VuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvb2thaGVhZCgpIHtcbiAgICAgICAgaWYoYnVmICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gYnVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBvcyA9IGlkeDtcbiAgICAgICAgYnVmID0gYWR2YW5jZSgpO1xuICAgICAgICBpZHggPSBwb3M7XG5cbiAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZHZhbmNlKCkge1xuICAgICAgICB3aGlsZShpc1doaXRlU3BhY2UocGF0aFtpZHhdKSkge1xuICAgICAgICAgICAgKytpZHg7XG4gICAgICAgIH1cblxuICAgICAgICBpZihpZHggPj0gbGVuKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uRU9QLFxuICAgICAgICAgICAgICAgIHJhbmdlIDogW2lkeCwgaWR4XVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b2tlbiA9IHNjYW5QdW5jdHVhdG9yKCk7XG4gICAgICAgIGlmKHRva2VuIHx8XG4gICAgICAgICAgICAgICAgKHRva2VuID0gc2NhbklkKCkpIHx8XG4gICAgICAgICAgICAgICAgKHRva2VuID0gc2NhblN0cmluZygpKSB8fFxuICAgICAgICAgICAgICAgICh0b2tlbiA9IHNjYW5OdW1lcmljKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgIH1cblxuICAgICAgICB0b2tlbiA9IHsgcmFuZ2UgOiBbaWR4LCBpZHhdIH07XG4gICAgICAgIGlkeCA+PSBsZW4/XG4gICAgICAgICAgICB0b2tlbi50eXBlID0gVE9LRU4uRU9QIDpcbiAgICAgICAgICAgIHRva2VuLnZhbCA9IHBhdGhbaWR4XTtcblxuICAgICAgICB0aHJvd1VuZXhwZWN0ZWQodG9rZW4pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxleCgpIHtcbiAgICAgICAgdmFyIHRva2VuO1xuXG4gICAgICAgIGlmKGJ1Zikge1xuICAgICAgICAgICAgaWR4ID0gYnVmLnJhbmdlWzFdO1xuICAgICAgICAgICAgdG9rZW4gPSBidWY7XG4gICAgICAgICAgICBidWYgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFkdmFuY2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0RpZ2l0KGNoKSB7XG4gICAgICAgIHJldHVybiAnMDEyMzQ1Njc4OScuaW5kZXhPZihjaCkgPj0gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1doaXRlU3BhY2UoY2gpIHtcbiAgICAgICAgcmV0dXJuICcgXFxyXFxuXFx0Jy5pbmRleE9mKGNoKSA+IC0xO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzSWRTdGFydChjaCkge1xuICAgICAgICByZXR1cm4gY2ggPT09ICckJyB8fCBjaCA9PT0gJ0AnIHx8IGNoID09PSAnXycgfHwgKGNoID49ICdhJyAmJiBjaCA8PSAneicpIHx8IChjaCA+PSAnQScgJiYgY2ggPD0gJ1onKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0lkUGFydChjaCkge1xuICAgICAgICByZXR1cm4gaXNJZFN0YXJ0KGNoKSB8fCAoY2ggPj0gJzAnICYmIGNoIDw9ICc5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2NhbklkKCkge1xuICAgICAgICB2YXIgY2ggPSBwYXRoW2lkeF07XG5cbiAgICAgICAgaWYoIWlzSWRTdGFydChjaCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGFydCA9IGlkeCxcbiAgICAgICAgICAgIGlkID0gY2g7XG5cbiAgICAgICAgd2hpbGUoKytpZHggPCBsZW4pIHtcbiAgICAgICAgICAgIGNoID0gcGF0aFtpZHhdO1xuICAgICAgICAgICAgaWYoIWlzSWRQYXJ0KGNoKSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWQgKz0gY2g7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2goaWQpIHtcbiAgICAgICAgICAgIGNhc2UgJ3RydWUnOlxuICAgICAgICAgICAgY2FzZSAnZmFsc2UnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uQk9PTCxcbiAgICAgICAgICAgICAgICAgICAgdmFsICAgOiBpZCA9PT0gJ3RydWUnLFxuICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4XVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNhc2UgJ251bGwnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uTlVMTCxcbiAgICAgICAgICAgICAgICAgICAgdmFsICAgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4XVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5JRCxcbiAgICAgICAgICAgICAgICAgICAgdmFsICAgOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeF1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2NhblN0cmluZygpIHtcbiAgICAgICAgaWYocGF0aFtpZHhdICE9PSAnXCInICYmIHBhdGhbaWR4XSAhPT0gJ1xcJycpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvcmlnID0gcGF0aFtpZHhdLFxuICAgICAgICAgICAgc3RhcnQgPSArK2lkeCxcbiAgICAgICAgICAgIHN0ciA9ICcnLFxuICAgICAgICAgICAgZW9zRm91bmQgPSBmYWxzZSxcbiAgICAgICAgICAgIGNoO1xuXG4gICAgICAgIHdoaWxlKGlkeCA8IGxlbikge1xuICAgICAgICAgICAgY2ggPSBwYXRoW2lkeCsrXTtcbiAgICAgICAgICAgIGlmKGNoID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgICBjaCA9IHBhdGhbaWR4KytdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZigoY2ggPT09ICdcIicgfHwgY2ggPT09ICdcXCcnKSAmJiBjaCA9PT0gb3JpZykge1xuICAgICAgICAgICAgICAgIGVvc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0ciArPSBjaDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGVvc0ZvdW5kKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBUT0tFTi5TVFIsXG4gICAgICAgICAgICAgICAgdmFsIDogc3RyLFxuICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHhdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2Nhbk51bWVyaWMoKSB7XG4gICAgICAgIHZhciBzdGFydCA9IGlkeCxcbiAgICAgICAgICAgIGNoID0gcGF0aFtpZHhdLFxuICAgICAgICAgICAgaXNGbG9hdCA9IGNoID09PSAnLic7XG5cbiAgICAgICAgaWYoaXNGbG9hdCB8fCBpc0RpZ2l0KGNoKSkge1xuICAgICAgICAgICAgdmFyIG51bSA9IGNoO1xuICAgICAgICAgICAgd2hpbGUoKytpZHggPCBsZW4pIHtcbiAgICAgICAgICAgICAgICBjaCA9IHBhdGhbaWR4XTtcbiAgICAgICAgICAgICAgICBpZihjaCA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGlzRmxvYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpc0Zsb2F0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZighaXNEaWdpdChjaCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbnVtICs9IGNoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uTlVNLFxuICAgICAgICAgICAgICAgIHZhbCAgIDogaXNGbG9hdD8gcGFyc2VGbG9hdChudW0pIDogcGFyc2VJbnQobnVtLCAxMCksXG4gICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY2FuUHVuY3R1YXRvcigpIHtcbiAgICAgICAgdmFyIHN0YXJ0ID0gaWR4LFxuICAgICAgICAgICAgY2gxID0gcGF0aFtpZHhdLFxuICAgICAgICAgICAgY2gyID0gcGF0aFtpZHggKyAxXTtcblxuICAgICAgICBpZihjaDEgPT09ICcuJykge1xuICAgICAgICAgICAgaWYoaXNEaWdpdChjaDIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aFsrK2lkeF0gPT09ICcuJz9cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogJy4uJyxcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsICsraWR4XVxuICAgICAgICAgICAgICAgIH0gOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICAgICAgdmFsICAgOiAnLicsXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHhdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNoMiA9PT0gJz0nKSB7XG4gICAgICAgICAgICB2YXIgY2gzID0gcGF0aFtpZHggKyAyXTtcbiAgICAgICAgICAgIGlmKGNoMyA9PT0gJz0nKSB7XG4gICAgICAgICAgICAgICAgaWYoJz0hXiQqJy5pbmRleE9mKGNoMSkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCAgIDogY2gxICsgY2gyICsgY2gzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeCArPSAzXVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoJ14kKicuaW5kZXhPZihjaDMpID49IDApIHtcbiAgICAgICAgICAgICAgICBpZihjaDEgPT09ICc9Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCAgIDogY2gxICsgY2gyICsgY2gzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeCArPSAzXVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoJz0hXiQqPjwnLmluZGV4T2YoY2gxKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICAgICAgdmFsICAgOiBjaDEgKyBjaDIsXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHggKz0gMl1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoY2gxID09PSAnPScgJiYgJ14kKicuaW5kZXhPZihjaDIpID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSArIGNoMixcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4ICs9IDJdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2gxID09PSBjaDIgJiYgKGNoMSA9PT0gJ3wnIHx8IGNoMSA9PT0gJyYnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgIHZhbCAgIDogY2gxICsgY2gyLFxuICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHggKz0gMl1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZignOnt9KClbXV4rLSovJSE+PHwnLmluZGV4T2YoY2gxKSA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgdmFsICAgOiBjaDEsXG4gICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsICsraWR4XVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRocm93VW5leHBlY3RlZCh0b2tlbikge1xuICAgICAgICBpZih0b2tlbi50eXBlID09PSBUT0tFTi5FT1ApIHtcbiAgICAgICAgICAgIHRocm93RXJyb3IodG9rZW4sIE1FU1NBR0VTLlVORVhQX0VPUCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvd0Vycm9yKHRva2VuLCBNRVNTQUdFUy5VTkVYUF9UT0tFTiwgdG9rZW4udmFsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0aHJvd0Vycm9yKHRva2VuLCBtZXNzYWdlRm9ybWF0KSB7XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSxcbiAgICAgICAgICAgIG1zZyA9IG1lc3NhZ2VGb3JtYXQucmVwbGFjZShcbiAgICAgICAgICAgICAgICAvJShcXGQpL2csXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oXywgaWR4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcmdzW2lkeF0gfHwgJyc7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBlcnJvciA9IG5ldyBFcnJvcihtc2cpO1xuXG4gICAgICAgIGVycm9yLmNvbHVtbiA9IHRva2VuLnJhbmdlWzBdO1xuXG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJzZTtcbn0pKCk7XG5cbi8vIHRyYW5zbGF0b3JcblxudmFyIHRyYW5zbGF0ZSA9IChmdW5jdGlvbigpIHtcblxuICAgIHZhciBib2R5LCB2YXJzLCBsYXN0VmFySWQsIHVudXNlZFZhcnM7XG5cbiAgICBmdW5jdGlvbiBhY3F1aXJlVmFyKCkge1xuICAgICAgICBpZih1bnVzZWRWYXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHVudXNlZFZhcnMuc2hpZnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB2YXJOYW1lID0gJ3YnICsgKytsYXN0VmFySWQ7XG4gICAgICAgIHZhcnMucHVzaCh2YXJOYW1lKTtcbiAgICAgICAgcmV0dXJuIHZhck5hbWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVsZWFzZVZhcnMoKSB7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzLCBpID0gYXJncy5sZW5ndGg7XG4gICAgICAgIHdoaWxlKGktLSkge1xuICAgICAgICAgICAgdW51c2VkVmFycy5wdXNoKGFyZ3NbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKGFzdCkge1xuICAgICAgICBib2R5ID0gW107XG4gICAgICAgIHZhcnMgPSBbJ3JlcyddO1xuICAgICAgICBsYXN0VmFySWQgPSAwO1xuICAgICAgICB1bnVzZWRWYXJzID0gW107XG5cbiAgICAgICAgdHJhbnNsYXRlRXhwcihhc3QsICdyZXMnLCAnZGF0YScpO1xuXG4gICAgICAgIGJvZHkudW5zaGlmdChcbiAgICAgICAgICAgICd2YXIgJyxcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXk/XG4gICAgICAgICAgICAgICAgJ2lzQXJyID0gQXJyYXkuaXNBcnJheScgOlxuICAgICAgICAgICAgICAgICd0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcsIGlzQXJyID0gZnVuY3Rpb24obykgeyByZXR1cm4gdG9TdHIuY2FsbChvKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiOyB9JyxcbiAgICAgICAgICAgICAgICAnLCBjb25jYXQgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0JyxcbiAgICAgICAgICAgICAgICAnLCcsIHZhcnMuam9pbignLCcpLCAnOycpO1xuXG4gICAgICAgIGlmKGFzdC50eXBlID09PSBTWU5UQVguUEFUSCkge1xuICAgICAgICAgICAgdmFyIGxhc3RQYXJ0ID0gYXN0LnBhcnRzW2FzdC5wYXJ0cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmKGxhc3RQYXJ0ICYmIGxhc3RQYXJ0LnR5cGUgPT09IFNZTlRBWC5QT1NfUFJFRCAmJiAnaWR4JyBpbiBsYXN0UGFydC5hcmcpIHtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goJ3JlcyA9IHJlc1swXTsnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJvZHkucHVzaCgncmV0dXJuIHJlczsnKTtcblxuICAgICAgICByZXR1cm4gYm9keS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVQYXRoKHBhdGgsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgcGFydHMgPSBwYXRoLnBhcnRzLFxuICAgICAgICAgICAgaSA9IDAsIGxlbiA9IHBhcnRzLmxlbmd0aDtcblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICBkZXN0LCAnPScsIHBhdGguZnJvbVJvb3Q/ICdkYXRhJyA6IHBhdGguc3Vic3Q/ICdzdWJzdC4nICsgcGF0aC5zdWJzdCA6IGN0eCwgJzsnLFxuICAgICAgICAgICAgJ2lzQXJyKCcgKyBkZXN0ICsgJykgfHwgKCcgKyBkZXN0ICsgJyA9IFsnICsgZGVzdCArICddKTsnKTtcblxuICAgICAgICB3aGlsZShpIDwgbGVuKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHBhcnRzW2krK107XG4gICAgICAgICAgICBzd2l0Y2goaXRlbS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBTWU5UQVguU0VMRUNUT1I6XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0b3IgPT09ICcuLic/XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVEZXNjZW5kYW50U2VsZWN0b3IoaXRlbSwgZGVzdCwgZGVzdCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlU2VsZWN0b3IoaXRlbSwgZGVzdCwgZGVzdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBTWU5UQVguT0JKX1BSRUQ6XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZU9iamVjdFByZWRpY2F0ZShpdGVtLCBkZXN0LCBkZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFNZTlRBWC5QT1NfUFJFRDpcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlUG9zUHJlZGljYXRlKGl0ZW0sIGRlc3QsIGRlc3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgU1lOVEFYLkNPTkNBVF9FWFBSOlxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVDb25jYXRFeHByKGl0ZW0sIGRlc3QsIGRlc3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZVNlbGVjdG9yKHNlbCwgZGVzdCwgY3R4KSB7XG4gICAgICAgIGlmKHNlbC5wcm9wKSB7XG4gICAgICAgICAgICB2YXIgcHJvcFN0ciA9IGVzY2FwZVN0cihzZWwucHJvcCksXG4gICAgICAgICAgICAgICAgcmVzID0gYWNxdWlyZVZhcigpLCBpID0gYWNxdWlyZVZhcigpLCBsZW4gPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICAgICAgY3VyQ3R4ID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgICAgIGogPSBhY3F1aXJlVmFyKCksIHZhbCA9IGFjcXVpcmVWYXIoKSwgdG1wQXJyID0gYWNxdWlyZVZhcigpO1xuXG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgcmVzLCAnPSBbXTsnLCBpLCAnPSAwOycsIGxlbiwgJz0nLCBjdHgsICcubGVuZ3RoOycsIHRtcEFyciwgJz0gW107JyxcbiAgICAgICAgICAgICAgICAnd2hpbGUoJywgaSwgJzwnLCBsZW4sICcpIHsnLFxuICAgICAgICAgICAgICAgICAgICBjdXJDdHgsICc9JywgY3R4LCAnWycsIGksICcrK107JyxcbiAgICAgICAgICAgICAgICAgICAgJ2lmKCcsIGN1ckN0eCwgJyE9IG51bGwpIHsnKTtcbiAgICAgICAgICAgIGlmKHNlbC5wcm9wID09PSAnKicpIHtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAnaWYodHlwZW9mICcsIGN1ckN0eCwgJz09PSBcIm9iamVjdFwiKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWYoaXNBcnIoJywgY3VyQ3R4LCAnKSkgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcywgJz0nLCByZXMsICcuY29uY2F0KCcsIGN1ckN0eCwgJyk7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Vsc2UgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmb3IoJywgaiwgJyBpbiAnLCBjdXJDdHgsICcpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKCcsIGN1ckN0eCwgJy5oYXNPd25Qcm9wZXJ0eSgnLCBqLCAnKSkgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLCAnPScsIGN1ckN0eCwgJ1snLCBqLCAnXTsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVBcHBlbmRUb0FycmF5KHJlcywgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCwgJz0nLCBjdXJDdHgsICdbJywgcHJvcFN0ciwgJ107Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVBcHBlbmRUb0FycmF5KHJlcywgdmFsLCB0bXBBcnIsIGxlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgZGVzdCwgJz0nLCBsZW4sICc+IDEgJiYnLCB0bXBBcnIsICcubGVuZ3RoPycsIHRtcEFyciwgJy5sZW5ndGggPiAxPycsXG4gICAgICAgICAgICAgICAgICAgICdjb25jYXQuYXBwbHkoJywgcmVzLCAnLCcsIHRtcEFyciwgJykgOicsIHJlcywgJy5jb25jYXQoJywgdG1wQXJyLCAnWzBdKSA6JywgcmVzLCAnOycpO1xuXG4gICAgICAgICAgICByZWxlYXNlVmFycyhyZXMsIGksIGxlbiwgY3VyQ3R4LCBqLCB2YWwsIHRtcEFycik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVEZXNjZW5kYW50U2VsZWN0b3Ioc2VsLCBkZXN0LCBiYXNlQ3R4KSB7XG4gICAgICAgIHZhciBwcm9wID0gc2VsLnByb3AsXG4gICAgICAgICAgICBjdHggPSBhY3F1aXJlVmFyKCksIGN1ckN0eCA9IGFjcXVpcmVWYXIoKSwgY2hpbGRDdHhzID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgaSA9IGFjcXVpcmVWYXIoKSwgaiA9IGFjcXVpcmVWYXIoKSwgdmFsID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgbGVuID0gYWNxdWlyZVZhcigpLCByZXMgPSBhY3F1aXJlVmFyKCk7XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgY3R4LCAnPScsIGJhc2VDdHgsICcuc2xpY2UoKSwnLCByZXMsICc9IFtdOycsXG4gICAgICAgICAgICAnd2hpbGUoJywgY3R4LCAnLmxlbmd0aCkgeycsXG4gICAgICAgICAgICAgICAgY3VyQ3R4LCAnPScsIGN0eCwgJy5zaGlmdCgpOycpO1xuICAgICAgICBwcm9wP1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICdpZih0eXBlb2YgJywgY3VyQ3R4LCAnPT09IFwib2JqZWN0XCIgJiYnLCBjdXJDdHgsICcpIHsnKSA6XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgJ2lmKHR5cGVvZiAnLCBjdXJDdHgsICchPSBudWxsKSB7Jyk7XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRDdHhzLCAnPSBbXTsnLFxuICAgICAgICAgICAgICAgICAgICAnaWYoaXNBcnIoJywgY3VyQ3R4LCAnKSkgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICBpLCAnPSAwLCcsIGxlbiwgJz0nLCBjdXJDdHgsICcubGVuZ3RoOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnd2hpbGUoJywgaSwgJzwnLCBsZW4sICcpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCwgJz0nLCBjdXJDdHgsICdbJywgaSwgJysrXTsnKTtcbiAgICAgICAgcHJvcCAmJiBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKHR5cGVvZiAnLCB2YWwsICc9PT0gXCJvYmplY3RcIikgeycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVBcHBlbmRUb0FycmF5KGNoaWxkQ3R4cywgdmFsKTtcbiAgICAgICAgcHJvcCAmJiBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICdlbHNlIHsnKTtcbiAgICAgICAgaWYocHJvcCkge1xuICAgICAgICAgICAgaWYocHJvcCAhPT0gJyonKSB7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsLCAnPScsIGN1ckN0eCwgJ1tcIicgKyBwcm9wICsgJ1wiXTsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZUFwcGVuZFRvQXJyYXkocmVzLCB2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIGN1ckN0eCk7XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAnaWYodHlwZW9mICcsIGN1ckN0eCwgJz09PSBcIm9iamVjdFwiKSB7Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZvcignLCBqLCAnIGluICcsIGN1ckN0eCwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZignLCBjdXJDdHgsICcuaGFzT3duUHJvcGVydHkoJywgaiwgJykpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLCAnPScsIGN1ckN0eCwgJ1snLCBqLCAnXTsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZUFwcGVuZFRvQXJyYXkoY2hpbGRDdHhzLCB2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcCA9PT0gJyonICYmIGlubGluZUFwcGVuZFRvQXJyYXkocmVzLCB2YWwpO1xuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScpO1xuICAgICAgICBwcm9wIHx8IGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZEN0eHMsICcubGVuZ3RoICYmJywgY3R4LCAnLnVuc2hpZnQuYXBwbHkoJywgY3R4LCAnLCcsIGNoaWxkQ3R4cywgJyk7JyxcbiAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAnfScsXG4gICAgICAgICAgICBkZXN0LCAnPScsIHJlcywgJzsnKTtcblxuICAgICAgICByZWxlYXNlVmFycyhjdHgsIGN1ckN0eCwgY2hpbGRDdHhzLCBpLCBqLCB2YWwsIGxlbiwgcmVzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVPYmplY3RQcmVkaWNhdGUoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciByZXNWYXIgPSBhY3F1aXJlVmFyKCksIGkgPSBhY3F1aXJlVmFyKCksIGxlbiA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGNvbmQgPSBhY3F1aXJlVmFyKCksIGN1ckl0ZW0gPSBhY3F1aXJlVmFyKCk7XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgcmVzVmFyLCAnPSBbXTsnLFxuICAgICAgICAgICAgaSwgJz0gMDsnLFxuICAgICAgICAgICAgbGVuLCAnPScsIGN0eCwgJy5sZW5ndGg7JyxcbiAgICAgICAgICAgICd3aGlsZSgnLCBpLCAnPCcsIGxlbiwgJykgeycsXG4gICAgICAgICAgICAgICAgY3VySXRlbSwgJz0nLCBjdHgsICdbJywgaSwgJysrXTsnKTtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVFeHByKGV4cHIuYXJnLCBjb25kLCBjdXJJdGVtKTtcbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgIGNvbnZlcnRUb0Jvb2woZXhwci5hcmcsIGNvbmQpLCAnJiYnLCByZXNWYXIsICcucHVzaCgnLCBjdXJJdGVtLCAnKTsnLFxuICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgZGVzdCwgJz0nLCByZXNWYXIsICc7Jyk7XG5cbiAgICAgICAgcmVsZWFzZVZhcnMocmVzVmFyLCBpLCBsZW4sIGN1ckl0ZW0sIGNvbmQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZVBvc1ByZWRpY2F0ZShpdGVtLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIGFycmF5RXhwciA9IGl0ZW0uYXJnLCBmcm9tSWR4LCB0b0lkeDtcbiAgICAgICAgaWYoYXJyYXlFeHByLmlkeCkge1xuICAgICAgICAgICAgdmFyIGlkeCA9IGFjcXVpcmVWYXIoKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJyYXlFeHByLmlkeCwgaWR4LCBjdHgpO1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgIGlkeCwgJzwgMCAmJiAoJywgaWR4LCAnPScsIGN0eCwgJy5sZW5ndGggKycsIGlkeCwgJyk7JyxcbiAgICAgICAgICAgICAgICBkZXN0LCAnPScsIGN0eCwgJ1snLCBpZHgsICddID09IG51bGw/IFtdIDogWycsIGN0eCwgJ1snLCBpZHgsICddXTsnKTtcbiAgICAgICAgICAgIHJlbGVhc2VWYXJzKGlkeCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhcnJheUV4cHIuZnJvbUlkeCkge1xuICAgICAgICAgICAgaWYoYXJyYXlFeHByLnRvSWR4KSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcnJheUV4cHIuZnJvbUlkeCwgZnJvbUlkeCA9IGFjcXVpcmVWYXIoKSwgY3R4KTtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFycmF5RXhwci50b0lkeCwgdG9JZHggPSBhY3F1aXJlVmFyKCksIGN0eCk7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9JywgY3R4LCAnLnNsaWNlKCcsIGZyb21JZHgsICcsJywgdG9JZHgsICcpOycpO1xuICAgICAgICAgICAgICAgIHJlbGVhc2VWYXJzKGZyb21JZHgsIHRvSWR4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJyYXlFeHByLmZyb21JZHgsIGZyb21JZHggPSBhY3F1aXJlVmFyKCksIGN0eCk7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9JywgY3R4LCAnLnNsaWNlKCcsIGZyb21JZHgsICcpOycpO1xuICAgICAgICAgICAgICAgIHJlbGVhc2VWYXJzKGZyb21JZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcnJheUV4cHIudG9JZHgsIHRvSWR4ID0gYWNxdWlyZVZhcigpLCBjdHgpO1xuICAgICAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9JywgY3R4LCAnLnNsaWNlKDAsJywgdG9JZHgsICcpOycpO1xuICAgICAgICAgICAgcmVsZWFzZVZhcnModG9JZHgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlRXhwcihleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgc3dpdGNoKGV4cHIudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTWU5UQVguUEFUSDpcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVQYXRoKGV4cHIsIGRlc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkNPTkNBVF9FWFBSOlxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUNvbmNhdEV4cHIoZXhwciwgZGVzdCwgY3R4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguQ09NUEFSSVNPTl9FWFBSOlxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUNvbXBhcmlzb25FeHByKGV4cHIsIGRlc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLk1BVEhfRVhQUjpcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVNYXRoRXhwcihleHByLCBkZXN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5MT0dJQ0FMX0VYUFI6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlTG9naWNhbEV4cHIoZXhwciwgZGVzdCwgY3R4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguVU5BUllfRVhQUjpcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVVbmFyeUV4cHIoZXhwciwgZGVzdCwgY3R4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguTElURVJBTDpcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0nKTtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVMaXRlcmFsKGV4cHIudmFsKTtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goJzsnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUxpdGVyYWwodmFsKSB7XG4gICAgICAgIGJvZHkucHVzaCh0eXBlb2YgdmFsID09PSAnc3RyaW5nJz8gZXNjYXBlU3RyKHZhbCkgOiB2YWwgPT09IG51bGw/ICdudWxsJyA6IHZhbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlQ29tcGFyaXNvbkV4cHIoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciB2YWwxID0gYWNxdWlyZVZhcigpLCB2YWwyID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgaXNWYWwxQXJyYXkgPSBhY3F1aXJlVmFyKCksIGlzVmFsMkFycmF5ID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgaSA9IGFjcXVpcmVWYXIoKSwgaiA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGxlbjEgPSBhY3F1aXJlVmFyKCksIGxlbjIgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBsZWZ0QXJnID0gZXhwci5hcmdzWzBdLCByaWdodEFyZyA9IGV4cHIuYXJnc1sxXTtcblxuICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0gZmFsc2U7Jyk7XG5cbiAgICAgICAgdHJhbnNsYXRlRXhwcihsZWZ0QXJnLCB2YWwxLCBjdHgpO1xuICAgICAgICB0cmFuc2xhdGVFeHByKHJpZ2h0QXJnLCB2YWwyLCBjdHgpO1xuXG4gICAgICAgIHZhciBpc0xlZnRBcmdQYXRoID0gbGVmdEFyZy50eXBlID09PSBTWU5UQVguUEFUSCxcbiAgICAgICAgICAgIGlzUmlnaHRBcmdMaXRlcmFsID0gcmlnaHRBcmcudHlwZSA9PT0gU1lOVEFYLkxJVEVSQUw7XG5cbiAgICAgICAgYm9keS5wdXNoKGlzVmFsMUFycmF5LCAnPScpO1xuICAgICAgICBpc0xlZnRBcmdQYXRoPyBib2R5LnB1c2goJ3RydWU7JykgOiBib2R5LnB1c2goJ2lzQXJyKCcsIHZhbDEsICcpOycpO1xuXG4gICAgICAgIGJvZHkucHVzaChpc1ZhbDJBcnJheSwgJz0nKTtcbiAgICAgICAgaXNSaWdodEFyZ0xpdGVyYWw/IGJvZHkucHVzaCgnZmFsc2U7JykgOiBib2R5LnB1c2goJ2lzQXJyKCcsIHZhbDIsICcpOycpO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICdpZignKTtcbiAgICAgICAgaXNMZWZ0QXJnUGF0aCB8fCBib2R5LnB1c2goaXNWYWwxQXJyYXksICcmJicpO1xuICAgICAgICBib2R5LnB1c2godmFsMSwgJy5sZW5ndGggPT09IDEpIHsnLFxuICAgICAgICAgICAgICAgIHZhbDEsICc9JywgdmFsMSwgJ1swXTsnLFxuICAgICAgICAgICAgICAgIGlzVmFsMUFycmF5LCAnPSBmYWxzZTsnLFxuICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgaXNSaWdodEFyZ0xpdGVyYWwgfHwgYm9keS5wdXNoKFxuICAgICAgICAgICAgJ2lmKCcsIGlzVmFsMkFycmF5LCAnJiYnLCB2YWwyLCAnLmxlbmd0aCA9PT0gMSkgeycsXG4gICAgICAgICAgICAgICAgdmFsMiwgJz0nLCB2YWwyLCAnWzBdOycsXG4gICAgICAgICAgICAgICAgaXNWYWwyQXJyYXksICc9IGZhbHNlOycsXG4gICAgICAgICAgICAnfScpO1xuXG4gICAgICAgIGJvZHkucHVzaChpLCAnPSAwOycsXG4gICAgICAgICAgICAnaWYoJywgaXNWYWwxQXJyYXksICcpIHsnLFxuICAgICAgICAgICAgICAgIGxlbjEsICc9JywgdmFsMSwgJy5sZW5ndGg7Jyk7XG5cbiAgICAgICAgaWYoIWlzUmlnaHRBcmdMaXRlcmFsKSB7XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgJ2lmKCcsIGlzVmFsMkFycmF5LCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgbGVuMiwgJz0nLCB2YWwyLCAnLmxlbmd0aDsnLFxuICAgICAgICAgICAgICAgICAgICAnd2hpbGUoJywgaSwgJzwnLCBsZW4xLCAnJiYgIScsIGRlc3QsICcpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaiwgJz0gMDsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3doaWxlKCcsIGosICc8JywgbGVuMiwgJykgeycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQ29uZGl0aW9uKGV4cHIub3AsIFt2YWwxLCAnWycsIGksICddJ10uam9pbignJyksIFt2YWwyLCAnWycsIGosICddJ10uam9pbignJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdCwgJz0gdHJ1ZTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYnJlYWs7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJysrJywgaiwgJzsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJysrJywgaSwgJzsnLFxuICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICdlbHNlIHsnKTtcbiAgICAgICAgfVxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICd3aGlsZSgnLCBpLCAnPCcsIGxlbjEsICcpIHsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQ29uZGl0aW9uKGV4cHIub3AsIFt2YWwxLCAnWycsIGksICddJ10uam9pbignJyksIHZhbDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3QsICc9IHRydWU7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYnJlYWs7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICcrKycsIGksICc7JyxcbiAgICAgICAgICAgICAgICAgICAgJ30nKTtcblxuICAgICAgICBpc1JpZ2h0QXJnTGl0ZXJhbCB8fCBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgJ30nKTtcblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAnfScpO1xuXG4gICAgICAgIGlmKCFpc1JpZ2h0QXJnTGl0ZXJhbCkge1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgJ2Vsc2UgaWYoJywgaXNWYWwyQXJyYXksJykgeycsXG4gICAgICAgICAgICAgICAgbGVuMiwgJz0nLCB2YWwyLCAnLmxlbmd0aDsnLFxuICAgICAgICAgICAgICAgICd3aGlsZSgnLCBpLCAnPCcsIGxlbjIsICcpIHsnKTtcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVDb25kaXRpb24oZXhwci5vcCwgdmFsMSwgW3ZhbDIsICdbJywgaSwgJ10nXS5qb2luKCcnKSk7XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0LCAnPSB0cnVlOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnYnJlYWs7JyxcbiAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAnKysnLCBpLCAnOycsXG4gICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICdlbHNlIHsnLFxuICAgICAgICAgICAgICAgIGRlc3QsICc9JywgYmluYXJ5T3BlcmF0b3JzW2V4cHIub3BdKHZhbDEsIHZhbDIpLCAnOycsXG4gICAgICAgICAgICAnfScpO1xuXG4gICAgICAgIHJlbGVhc2VWYXJzKHZhbDEsIHZhbDIsIGlzVmFsMUFycmF5LCBpc1ZhbDJBcnJheSwgaSwgaiwgbGVuMSwgbGVuMik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd3JpdGVDb25kaXRpb24ob3AsIHZhbDFFeHByLCB2YWwyRXhwcikge1xuICAgICAgICBib2R5LnB1c2goJ2lmKCcsIGJpbmFyeU9wZXJhdG9yc1tvcF0odmFsMUV4cHIsIHZhbDJFeHByKSwgJykgeycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUxvZ2ljYWxFeHByKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgY29uZGl0aW9uVmFycyA9IFtdLFxuICAgICAgICAgICAgYXJncyA9IGV4cHIuYXJncywgbGVuID0gYXJncy5sZW5ndGgsXG4gICAgICAgICAgICBpID0gMCwgdmFsO1xuXG4gICAgICAgIGJvZHkucHVzaChkZXN0LCAnPSBmYWxzZTsnKTtcbiAgICAgICAgc3dpdGNoKGV4cHIub3ApIHtcbiAgICAgICAgICAgIGNhc2UgJyYmJzpcbiAgICAgICAgICAgICAgICB3aGlsZShpIDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvblZhcnMucHVzaCh2YWwgPSBhY3F1aXJlVmFyKCkpO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFyZ3NbaV0sIHZhbCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYm9keS5wdXNoKCdpZignLCBjb252ZXJ0VG9Cb29sKGFyZ3NbaSsrXSwgdmFsKSwgJykgeycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0gdHJ1ZTsnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnfHwnOlxuICAgICAgICAgICAgICAgIHdoaWxlKGkgPCBsZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uVmFycy5wdXNoKHZhbCA9IGFjcXVpcmVWYXIoKSk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnc1tpXSwgdmFsLCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAnaWYoJywgY29udmVydFRvQm9vbChhcmdzW2ldLCB2YWwpLCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0LCAnPSB0cnVlOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnfScpO1xuICAgICAgICAgICAgICAgICAgICBpZihpKysgKyAxIDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5LnB1c2goJ2Vsc2UgeycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC0tbGVuO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUobGVuLS0pIHtcbiAgICAgICAgICAgIGJvZHkucHVzaCgnfScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVsZWFzZVZhcnMuYXBwbHkobnVsbCwgY29uZGl0aW9uVmFycyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlTWF0aEV4cHIoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciB2YWwxID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgdmFsMiA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGFyZ3MgPSBleHByLmFyZ3M7XG5cbiAgICAgICAgdHJhbnNsYXRlRXhwcihhcmdzWzBdLCB2YWwxLCBjdHgpO1xuICAgICAgICB0cmFuc2xhdGVFeHByKGFyZ3NbMV0sIHZhbDIsIGN0eCk7XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgZGVzdCwgJz0nLFxuICAgICAgICAgICAgYmluYXJ5T3BlcmF0b3JzW2V4cHIub3BdKFxuICAgICAgICAgICAgICAgIGNvbnZlcnRUb1NpbmdsZVZhbHVlKGFyZ3NbMF0sIHZhbDEpLFxuICAgICAgICAgICAgICAgIGNvbnZlcnRUb1NpbmdsZVZhbHVlKGFyZ3NbMV0sIHZhbDIpKSxcbiAgICAgICAgICAgICc7Jyk7XG5cbiAgICAgICAgcmVsZWFzZVZhcnModmFsMSwgdmFsMik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlVW5hcnlFeHByKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgdmFsID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgYXJnID0gZXhwci5hcmc7XG5cbiAgICAgICAgdHJhbnNsYXRlRXhwcihhcmcsIHZhbCwgY3R4KTtcblxuICAgICAgICBzd2l0Y2goZXhwci5vcCkge1xuICAgICAgICAgICAgY2FzZSAnISc6XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9ICEnLCBjb252ZXJ0VG9Cb29sKGFyZywgdmFsKSArICc7Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJy0nOlxuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPSAtJywgY29udmVydFRvU2luZ2xlVmFsdWUoYXJnLCB2YWwpICsgJzsnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbGVhc2VWYXJzKHZhbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlQ29uY2F0RXhwcihleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIGFyZ1ZhcnMgPSBbXSxcbiAgICAgICAgICAgIGFyZ3MgPSBleHByLmFyZ3MsXG4gICAgICAgICAgICBsZW4gPSBhcmdzLmxlbmd0aCxcbiAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgIHdoaWxlKGkgPCBsZW4pIHtcbiAgICAgICAgICAgIGFyZ1ZhcnMucHVzaChhY3F1aXJlVmFyKCkpO1xuICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcmdzW2ldLCBhcmdWYXJzW2krK10sIGN0eCk7XG4gICAgICAgIH1cblxuICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0gY29uY2F0LmNhbGwoJywgYXJnVmFycy5qb2luKCcsJyksICcpOycpO1xuXG4gICAgICAgIHJlbGVhc2VWYXJzLmFwcGx5KG51bGwsIGFyZ1ZhcnMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVzY2FwZVN0cihzKSB7XG4gICAgICAgIHJldHVybiAnXFwnJyArIHMucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKS5yZXBsYWNlKC8nL2csICdcXFxcXFwnJykgKyAnXFwnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbmxpbmVBcHBlbmRUb0FycmF5KHJlcywgdmFsLCB0bXBBcnIsIGxlbikge1xuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAnaWYodHlwZW9mICcsIHZhbCwgJyE9PSBcInVuZGVmaW5lZFwiKSB7JyxcbiAgICAgICAgICAgICAgICAnaWYoaXNBcnIoJywgdmFsLCAnKSkgeycpO1xuICAgICAgICBpZih0bXBBcnIpIHtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgbGVuLCAnPiAxPycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lUHVzaFRvQXJyYXkodG1wQXJyLCB2YWwpO1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgJzonKTtcbiAgICAgICAgfVxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgIHJlcywgJz0nLCByZXMsICcubGVuZ3RoPycsIHJlcywgJy5jb25jYXQoJywgdmFsLCAnKSA6JywgdmFsLCAnLnNsaWNlKCknLCAnOycsXG4gICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICdlbHNlIHsnKTtcbiAgICAgICAgdG1wQXJyICYmIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgJ2lmKCcsIHRtcEFyciwgJy5sZW5ndGgpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLCAnPSBjb25jYXQuYXBwbHkoJywgcmVzLCAnLCcsIHRtcEFyciwgJyk7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcEFyciwgJz0gW107JyxcbiAgICAgICAgICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgICAgICAgICAgICAgaW5saW5lUHVzaFRvQXJyYXkocmVzLCB2YWwpO1xuICAgICAgICBib2R5LnB1c2goJzsnLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICd9Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5saW5lUHVzaFRvQXJyYXkocmVzLCB2YWwpIHtcbiAgICAgICAgYm9keS5wdXNoKHJlcywgJy5sZW5ndGg/JywgcmVzLCAnLnB1c2goJywgdmFsLCAnKSA6JywgIHJlcywgJ1swXSA9JywgdmFsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb252ZXJ0VG9Cb29sKGFyZywgdmFyTmFtZSkge1xuICAgICAgICBzd2l0Y2goYXJnLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkxPR0lDQUxfRVhQUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyTmFtZTtcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguTElURVJBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJyEhJyArIHZhck5hbWU7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLlBBVEg6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhck5hbWUgKyAnLmxlbmd0aCA+IDAnO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBbJyh0eXBlb2YgJywgdmFyTmFtZSwgJz09PSBcImJvb2xlYW5cIj8nLFxuICAgICAgICAgICAgICAgICAgICB2YXJOYW1lLCAnOicsXG4gICAgICAgICAgICAgICAgICAgICdpc0FycignLCB2YXJOYW1lLCAnKT8nLCB2YXJOYW1lLCAnLmxlbmd0aCA+IDAgOiAhIScsIHZhck5hbWUsICcpJ10uam9pbignJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb252ZXJ0VG9TaW5nbGVWYWx1ZShhcmcsIHZhck5hbWUpIHtcbiAgICAgICAgc3dpdGNoKGFyZy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5MSVRFUkFMOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YXJOYW1lO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5QQVRIOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YXJOYW1lICsgJ1swXSc7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnKGlzQXJyKCcsIHZhck5hbWUsICcpPycsIHZhck5hbWUsICdbMF0gOiAnLCB2YXJOYW1lLCAnKSddLmpvaW4oJycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RhcnRzV2l0aFN0cmljdCh2YWwxLCB2YWwyKSB7XG4gICAgICAgIHJldHVybiBbJ3R5cGVvZiAnLCB2YWwxLCAnPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mICcsIHZhbDIsICc9PT0gXCJzdHJpbmdcIiAmJicsXG4gICAgICAgICAgICB2YWwxLCAnLmluZGV4T2YoJywgdmFsMiwgJykgPT09IDAnXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGFydHNXaXRoKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgcmV0dXJuIFt2YWwxLCAnIT0gbnVsbCAmJicsIHZhbDIsICchPSBudWxsICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJywgdmFsMiwgJy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkpID09PSAwJ10uam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kc1dpdGhTdHJpY3QodmFsMSwgdmFsMikge1xuICAgICAgICByZXR1cm4gWyd0eXBlb2YgJywgdmFsMSwgJz09PSBcInN0cmluZ1wiICYmIHR5cGVvZiAnLCB2YWwyLCAnPT09IFwic3RyaW5nXCIgJiYnLFxuICAgICAgICAgICAgdmFsMSwgJy5sZW5ndGggPj0nLCB2YWwyLCAnLmxlbmd0aCAmJicsXG4gICAgICAgICAgICB2YWwxLCAnLmxhc3RJbmRleE9mKCcsIHZhbDIsICcpID09PScsIHZhbDEsICcubGVuZ3RoIC0nLCB2YWwyLCAnLmxlbmd0aCddLmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZHNXaXRoKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgcmV0dXJuIFt2YWwxLCAnIT0gbnVsbCAmJicsIHZhbDIsICchPSBudWxsICYmJyxcbiAgICAgICAgICAgICcoJywgdmFsMSwgJz0nLCB2YWwxLCAnLnRvU3RyaW5nKCkpLmxlbmd0aCA+PScsICcoJywgdmFsMiwgJz0nLCB2YWwyLCAnLnRvU3RyaW5nKCkpLmxlbmd0aCAmJicsXG4gICAgICAgICAgICAnKCcsIHZhbDEsICcudG9Mb3dlckNhc2UoKSkubGFzdEluZGV4T2YoJywgJygnLCB2YWwyLCAnLnRvTG93ZXJDYXNlKCkpKSA9PT0nLFxuICAgICAgICAgICAgdmFsMSwgJy5sZW5ndGggLScsIHZhbDIsICcubGVuZ3RoJ10uam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29udGFpbnNTdHJpY3QodmFsMSwgdmFsMikge1xuICAgICAgICByZXR1cm4gWyd0eXBlb2YgJywgdmFsMSwgJz09PSBcInN0cmluZ1wiICYmIHR5cGVvZiAnLCB2YWwyLCAnPT09IFwic3RyaW5nXCIgJiYnLFxuICAgICAgICAgICAgdmFsMSwgJy5pbmRleE9mKCcsIHZhbDIsICcpID4gLTEnXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb250YWlucyh2YWwxLCB2YWwyKSB7XG4gICAgICAgIHJldHVybiBbdmFsMSwgJyE9IG51bGwgJiYgJywgdmFsMiwgJyE9IG51bGwgJiYnLFxuICAgICAgICAgICAgdmFsMSwgJy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignLCB2YWwyLCAnLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkgPiAtMSddLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHZhciBiaW5hcnlPcGVyYXRvcnMgPSB7XG4gICAgICAgICAgICAnPT09JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICc9PT0nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICc9PScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsndHlwZW9mICcsIHZhbDEsICc9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgJywgdmFsMiwgJz09PSBcInN0cmluZ1wiPycsXG4gICAgICAgICAgICAgICAgICAgIHZhbDEsICcudG9Mb3dlckNhc2UoKSA9PT0nLCB2YWwyLCAnLnRvTG93ZXJDYXNlKCkgOicgK1xuICAgICAgICAgICAgICAgICAgICB2YWwxLCAnPT0nLCB2YWwyXS5qb2luKCcnKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICc+PScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnPj0nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICc+JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICc+JyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnPD0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJzw9JyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnPCcgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnPCcgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyE9PScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnIT09JyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnIT0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJyE9JyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnXj09JyA6IHN0YXJ0c1dpdGhTdHJpY3QsXG5cbiAgICAgICAgICAgICc9PV4nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGFydHNXaXRoU3RyaWN0KHZhbDIsIHZhbDEpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJ149JyA6IHN0YXJ0c1dpdGgsXG5cbiAgICAgICAgICAgICc9XicgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0c1dpdGgodmFsMiwgdmFsMSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnJD09JyA6IGVuZHNXaXRoU3RyaWN0LFxuXG4gICAgICAgICAgICAnPT0kJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW5kc1dpdGhTdHJpY3QodmFsMiwgdmFsMSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnJD0nIDogZW5kc1dpdGgsXG5cbiAgICAgICAgICAgICc9JCcgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVuZHNXaXRoKHZhbDIsIHZhbDEpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyo9PScgOiBjb250YWluc1N0cmljdCxcblxuICAgICAgICAgICAgJz09KicgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5zU3RyaWN0KHZhbDIsIHZhbDEpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJz0qJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbnModmFsMiwgdmFsMSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnKj0nIDogY29udGFpbnMsXG5cbiAgICAgICAgICAgICcrJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICcrJyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnLScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnLScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyonIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJyonICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICcvJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICcvJyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnJScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnJScgKyB2YWwyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0ZTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGNvbXBpbGUocGF0aCkge1xuICAgIHJldHVybiBGdW5jdGlvbignZGF0YSxzdWJzdCcsIHRyYW5zbGF0ZShwYXJzZShwYXRoKSkpO1xufVxuXG52YXIgY2FjaGUgPSB7fSxcbiAgICBjYWNoZUtleXMgPSBbXSxcbiAgICBwYXJhbXMgPSB7XG4gICAgICAgIGNhY2hlU2l6ZSA6IDEwMFxuICAgIH0sXG4gICAgc2V0UGFyYW1zSG9va3MgPSB7XG4gICAgICAgIGNhY2hlU2l6ZSA6IGZ1bmN0aW9uKG9sZFZhbCwgbmV3VmFsKSB7XG4gICAgICAgICAgICBpZihuZXdWYWwgPCBvbGRWYWwgJiYgY2FjaGVLZXlzLmxlbmd0aCA+IG5ld1ZhbCkge1xuICAgICAgICAgICAgICAgIHZhciByZW1vdmVkS2V5cyA9IGNhY2hlS2V5cy5zcGxpY2UoMCwgY2FjaGVLZXlzLmxlbmd0aCAtIG5ld1ZhbCksXG4gICAgICAgICAgICAgICAgICAgIGkgPSByZW1vdmVkS2V5cy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICB3aGlsZShpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNhY2hlW3JlbW92ZWRLZXlzW2ldXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG52YXIgZGVjbCA9IGZ1bmN0aW9uKHBhdGgsIGN0eCwgc3Vic3RzKSB7XG4gICAgaWYoIWNhY2hlW3BhdGhdKSB7XG4gICAgICAgIGNhY2hlW3BhdGhdID0gY29tcGlsZShwYXRoKTtcbiAgICAgICAgaWYoY2FjaGVLZXlzLnB1c2gocGF0aCkgPiBwYXJhbXMuY2FjaGVTaXplKSB7XG4gICAgICAgICAgICBkZWxldGUgY2FjaGVbY2FjaGVLZXlzLnNoaWZ0KCldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhY2hlW3BhdGhdKGN0eCwgc3Vic3RzIHx8IHt9KTtcbn07XG5cbmRlY2wudmVyc2lvbiA9ICcwLjQuMCc7XG5cbmRlY2wucGFyYW1zID0gZnVuY3Rpb24oX3BhcmFtcykge1xuICAgIGlmKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG4gICAgZm9yKHZhciBuYW1lIGluIF9wYXJhbXMpIHtcbiAgICAgICAgaWYoX3BhcmFtcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgICAgICAgICAgc2V0UGFyYW1zSG9va3NbbmFtZV0gJiYgc2V0UGFyYW1zSG9va3NbbmFtZV0ocGFyYW1zW25hbWVdLCBfcGFyYW1zW25hbWVdKTtcbiAgICAgICAgICAgIHBhcmFtc1tuYW1lXSA9IF9wYXJhbXNbbmFtZV07XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5kZWNsLmNvbXBpbGUgPSBjb21waWxlO1xuXG5kZWNsLmFwcGx5ID0gZGVjbDtcblxuaWYodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZGVjbDtcbn1cbmVsc2UgaWYodHlwZW9mIG1vZHVsZXMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlcy5kZWZpbmUoJ2pzcGF0aCcsIGZ1bmN0aW9uKHByb3ZpZGUpIHtcbiAgICAgICAgcHJvdmlkZShkZWNsKTtcbiAgICB9KTtcbn1cbmVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGRlZmluZShmdW5jdGlvbihyZXF1aXJlLCBleHBvcnRzLCBtb2R1bGUpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBkZWNsO1xuICAgIH0pO1xufVxuZWxzZSB7XG4gICAgd2luZG93LkpTUGF0aCA9IGRlY2w7XG59XG5cbn0pKCk7XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEVTNiBFWFRFTlNJT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmlmKCFTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgpXG57XG5cdFN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCA9IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRjb25zdCBiYXNlID0gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDtcblxuXHRcdHJldHVybiB0aGlzLmluZGV4T2YocywgYmFzZSkgPT09IGJhc2U7XG5cdH07XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pZighU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aClcbntcblx0U3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCA9IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRjb25zdCBiYXNlID0gdGhpcy5sZW5ndGggLSBzLmxlbmd0aDtcblxuXHRcdHJldHVybiB0aGlzLmluZGV4T2YocywgYmFzZSkgPT09IGJhc2U7XG5cdH07XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogSlFVRVJZIEVYVEVOU0lPTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxudmFyIF9hbWlfaW50ZXJuYWxfalF1ZXJ5RWFjaCA9IGpRdWVyeS5lYWNoO1xudmFyIF9hbWlfaW50ZXJuYWxfalF1ZXJ5QWpheCA9IGpRdWVyeS5hamF4O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxualF1ZXJ5LmVhY2ggPSBmdW5jdGlvbihlbCwgY2FsbGJhY2ssIGNvbnRleHQpXG57XG5cdHJldHVybiBfYW1pX2ludGVybmFsX2pRdWVyeUVhY2goZWwsIGNvbnRleHQgPyAoaW5kZXgsIHZhbHVlKSA9PiBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGluZGV4LCB2YWx1ZSkgOiBjYWxsYmFjayk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxualF1ZXJ5LmFqYXggPSBmdW5jdGlvbihzZXR0aW5ncylcbntcblx0aWYodHlwZW9mIHNldHRpbmdzID09PSAnb2JqZWN0J1xuXHQgICAmJlxuXHQgICBzZXR0aW5ncy5kYXRhVHlwZSA9PT0gJ3NoZWV0J1xuXHQgKSB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHQsIHVybF0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnLCAndXJsJ10sXG5cdFx0XHRbcmVzdWx0LCAnJ10sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdClcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHVybClcblx0XHR7XG5cdFx0XHQkKCdoZWFkJykuYXBwZW5kKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIicgKyB1cmwgKyAnXCI+PC9saW5rPicpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBfYW1pX2ludGVybmFsX2pRdWVyeUFqYXguYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fVxufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZpbmRXaXRoU2VsZjogZnVuY3Rpb24oc2VsZWN0b3IpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5maW5kKHNlbGVjdG9yKS5hZGRCYWNrKHNlbGVjdG9yKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNlcmlhbGl6ZU9iamVjdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0ge307XG5cblx0XHR0aGlzLnNlcmlhbGl6ZUFycmF5KCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRpZihpdGVtLm5hbWUgaW4gcmVzdWx0KVxuXHRcdFx0e1xuXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocmVzdWx0W2l0ZW0ubmFtZV0pID09PSAnW29iamVjdCBTdHJpbmddJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdFtpdGVtLm5hbWVdID0gW3Jlc3VsdFtpdGVtLm5hbWVdXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlc3VsdFtpdGVtLm5hbWVdLnB1c2goaXRlbS52YWx1ZSB8fCAnJyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZSB8fCAnJztcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEJPT1RTVFJBUCBFWFRFTlNJT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbnZhciBfYW1pX2ludGVybmFsX21vZGFsWkluZGV4ID0gMTA1MDtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiQoZG9jdW1lbnQpLm9uKCdzaG93LmJzLm1vZGFsJywgJy5tb2RhbCcsIChlKSA9PiB7XG5cblx0Y29uc3QgZWwgPSAkKGUuY3VycmVudFRhcmdldCk7XG5cblx0c2V0VGltZW91dCgoKSA9PiB7XG5cblx0XHQkKCdib2R5ID4gLm1vZGFsLWJhY2tkcm9wOmxhc3QnKS5jc3MoJ3otaW5kZXgnLCBfYW1pX2ludGVybmFsX21vZGFsWkluZGV4KyspO1xuXHRcdC8qLS0tLS0tLS0tLS0qL2VsLyotLS0tLS0tLS0tLSovLmNzcygnei1pbmRleCcsIF9hbWlfaW50ZXJuYWxfbW9kYWxaSW5kZXgrKyk7XG5cblx0fSwgMTApO1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBOQU1FU1BBQ0UgSEVMUEVSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5mdW5jdGlvbiBfJGNyZWF0ZU5hbWVzcGFjZSgkbmFtZSwgeClcbntcblx0bGV0IHBhcmVudCA9IHdpbmRvdztcblxuXHRjb25zdCBwYXJ0cyA9ICRuYW1lLnNwbGl0KC9cXHMqXFwuXFxzKi9nKSwgbCA9IHBhcnRzLmxlbmd0aCAtIDE7XG5cblx0Zm9yKHZhciBpID0gMDsgaSA8IGw7IGkrKylcblx0e1xuXHRcdGlmKHBhcmVudFtwYXJ0c1tpXV0pXG5cdFx0e1xuXHRcdFx0cGFyZW50ID0gcGFyZW50W3BhcnRzW2ldXTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHBhcmVudCA9IHBhcmVudFtwYXJ0c1tpXV0gPSB7fTtcblx0XHR9XG5cdH1cblxuXHRwYXJlbnRbcGFydHNbaV1dID0geDtcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIF8kYWRkVG9OYW1lc3BhY2UoJG5hbWUsIHgpXG57XG5cdGxldCBwYXJlbnQgPSB3aW5kb3c7XG5cblx0Y29uc3QgcGFydHMgPSAkbmFtZS5zcGxpdCgvXFxzKlxcLlxccyovZyksIGwgPSBwYXJ0cy5sZW5ndGggLSAxO1xuXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsOyBpKyspXG5cdHtcblx0XHRpZihwYXJlbnRbcGFydHNbaV1dKVxuXHRcdHtcblx0XHRcdHBhcmVudCA9IHBhcmVudFtwYXJ0c1tpXV07XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aHJvdyAnYCcgKyAkbmFtZSArICdgIChgJyArIHBhcnRzW2ldICsgJ2ApIG5vdCBkZWNsYXJlZCc7XG5cdFx0fVxuXHR9XG5cblx0cGFyZW50W3BhcnRzW2ldXSA9IHg7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogTkFNRVNQQUNFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gICogQ3JlYXRlIGEgbmV3IG5hbWVzcGFjZVxuICAqIEBwYXJhbSB7U3RyaW5nfSAkbmFtZSB0aGUgbmFtZXNwYWNlIG5hbWVcbiAgKiBAcGFyYW0ge09iamVjdH0gWyRkZXNjcl0gdGhlIG5hbWVzcGFjZSBib2R5XG4gICovXG5cbmZ1bmN0aW9uICRBTUlOYW1lc3BhY2UoJG5hbWUsICRkZXNjcilcbntcblx0aWYoISRkZXNjcilcblx0e1xuXHRcdCRkZXNjciA9IHt9O1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZGVzY3IuJG5hbWUgPSAkbmFtZTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF8kY3JlYXRlTmFtZXNwYWNlKCRuYW1lLCAkZGVzY3IpO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0aWYoJGRlc2NyLiQpXG5cdHtcblx0XHQkZGVzY3IuJC5hcHBseSgkZGVzY3IpO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBJTlRFUkZBQ0VTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAgKiBDcmVhdGUgYSBuZXcgaW50ZXJmYWNlXG4gICogQHBhcmFtIHtTdHJpbmd9ICRuYW1lIHRoZSBpbnRlcmZhY2UgbmFtZVxuICAqIEBwYXJhbSB7T2JqZWN0fSBbJGRlc2NyXSB0aGUgaW50ZXJmYWNlIGJvZHlcbiAgKi9cblxuZnVuY3Rpb24gJEFNSUludGVyZmFjZSgkbmFtZSwgJGRlc2NyKVxue1xuXHRpZighJGRlc2NyKVxuXHR7XG5cdFx0JGRlc2NyID0ge307XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNvbnN0ICRjbGFzcyA9IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRocm93ICdjb3VsZCBub3IgaW5zdGFudGlhdGUgaW50ZXJmYWNlJztcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGlmKCRkZXNjci4kZXh0ZW5kcylcblx0e1xuXHRcdHRocm93ICdgJGV4dGVuZHNgIG5vdCBhbGxvd2VkIGZvciBpbnRlcmZhY2UnO1xuXHR9XG5cblx0aWYoJGRlc2NyLiRpbXBsZW1lbnRzKVxuXHR7XG5cdFx0dGhyb3cgJ2AkaW1wbGVtZW50c2Agbm90IGFsbG93ZWQgZm9yIGludGVyZmFjZSc7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGlmKCRkZXNjci4kKVxuXHR7XG5cdFx0dGhyb3cgJ2AkYCBub3QgYWxsb3dlZCBmb3IgaW50ZXJmYWNlJztcblx0fVxuXG5cdGlmKCRkZXNjci4kaW5pdClcblx0e1xuXHRcdHRocm93ICdgJGluaXRgIG5vdCBhbGxvd2VkIGZvciBpbnRlcmZhY2UnO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkY2xhc3MuJG5hbWUgPSAkbmFtZTtcblx0JGNsYXNzLiRjbGFzcyA9ICRjbGFzcztcblx0JGNsYXNzLiRtZW1iZXJzID0gJGRlc2NyO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XyRhZGRUb05hbWVzcGFjZSgkbmFtZSwgJGNsYXNzKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIENMQVNTRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICAqIENyZWF0ZSBhIG5ldyBjbGFzc1xuICAqIEBwYXJhbSB7U3RyaW5nfSAkbmFtZSB0aGUgY2xhc3MgbmFtZVxuICAqIEBwYXJhbSB7T2JqZWN0fSBbJGRlc2NyXSB0aGUgY2xhc3MgYm9keVxuICAqL1xuXG5mdW5jdGlvbiAkQU1JQ2xhc3MoJG5hbWUsICRkZXNjcilcbntcblx0aWYoISRkZXNjcilcblx0e1xuXHRcdCRkZXNjciA9IHt9O1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjb25zdCAkc3VwZXIgPSAoJGRlc2NyLiRleHRlbmRzIGluc3RhbmNlb2YgRnVuY3Rpb24pID8gJGRlc2NyLiRleHRlbmRzLnByb3RvdHlwZSA6IHt9O1xuXG5cdGNvbnN0ICRzdXBlcl9pbXBsZW1lbnRzID0gKCRzdXBlci4kaW1wbGVtZW50cyBpbnN0YW5jZW9mIEFycmF5KSA/ICRzdXBlci4kaW1wbGVtZW50cyA6IFtdO1xuXHRjb25zdCAkZGVzY3JfaW1wbGVtZW50cyA9ICgkZGVzY3IuJGltcGxlbWVudHMgaW5zdGFuY2VvZiBBcnJheSkgPyAkZGVzY3IuJGltcGxlbWVudHMgOiBbXTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNvbnN0ICRjbGFzcyA9IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGZvcihjb25zdCBpIGluIHRoaXMuJGltcGxlbWVudHMpXG5cdFx0e1xuXHRcdFx0aWYodGhpcy4kaW1wbGVtZW50cy5oYXNPd25Qcm9wZXJ0eShpKSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgJGludGVyZmFjZSA9IHRoaXMuJGltcGxlbWVudHNbaV07XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gJGludGVyZmFjZS4kbWVtYmVycylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKCRpbnRlcmZhY2UuJG1lbWJlcnMuaGFzT3duUHJvcGVydHkoaikpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Y29uc3QgJG1lbWJlciA9ICRpbnRlcmZhY2UuJG1lbWJlcnNbal07XG5cblx0XHRcdFx0XHRcdGlmKHR5cGVvZih0aGlzW2pdKSAhPT0gdHlwZW9mKCRtZW1iZXIpKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aHJvdyAnY2xhc3MgYCcgKyB0aGlzLiRuYW1lICsgJ2Agd2l0aCBtdXN0IGltcGxlbWVudCBgJyArICRpbnRlcmZhY2UuJG5hbWUgKyAnLicgKyBqICsgJ2AnO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IF9zdXBlciA9IHRoaXMuJGNsYXNzLl9pbnRlcm5hbF9zdXBlcjtcblx0XHRjb25zdCBfYWRkZWQgPSB0aGlzLiRjbGFzcy5faW50ZXJuYWxfYWRkZWQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLiRzdXBlciA9IHt9O1xuXG5cdFx0Zm9yKGNvbnN0IG5hbWUgaW4gX3N1cGVyKVxuXHRcdHtcblx0XHRcdGlmKF9zdXBlci5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcblx0XHRcdHtcblx0XHRcdFx0dGhpcy4kc3VwZXJbbmFtZV0gPSAoKF9zdXBlciwgbmFtZSwgdGhhdCkgPT4gZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRyZXR1cm4gX3N1cGVyW25hbWVdLmFwcGx5KHRoYXQsIGFyZ3VtZW50cylcblxuXHRcdFx0XHR9KShfc3VwZXIsIG5hbWUsIHRoaXMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuJGFkZGVkID0ge307XG5cblx0XHRmb3IoY29uc3QgbmFtZSBpbiBfYWRkZWQpXG5cdFx0e1xuXHRcdFx0aWYoX2FkZGVkLmhhc093blByb3BlcnR5KG5hbWUpKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLiRhZGRlZFtuYW1lXSA9ICgoX2FkZGVkLCBuYW1lLCB0aGF0KSA9PiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdHJldHVybiBfYWRkZWRbbmFtZV0uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcblxuXHRcdFx0XHR9KShfYWRkZWQsIG5hbWUsIHRoaXMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMuJGluaXQpXG5cdFx0e1xuXHRcdFx0dGhpcy4kaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRjbGFzcy5faW50ZXJuYWxfc3VwZXIgPSB7fTtcblx0JGNsYXNzLl9pbnRlcm5hbF9hZGRlZCA9IHt9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9yKGNvbnN0IG5hbWUgaW4gJHN1cGVyKVxuXHR7XG5cdFx0aWYobmFtZSA9PT0gJyRpbml0J1xuXHRcdCAgIHx8XG5cdFx0ICAgbmFtZS5jaGFyQXQoMCkgIT09ICckJ1xuXHRcdCAgIHx8XG5cdFx0ICAgJHN1cGVyLmhhc093blByb3BlcnR5KG5hbWUpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5cdFx0ICkge1xuXHRcdFx0JGNsYXNzLl9pbnRlcm5hbF9zdXBlcltuYW1lXSA9ICRzdXBlcltuYW1lXTtcblxuXHRcdFx0JGNsYXNzLnByb3RvdHlwZVtuYW1lXSA9ICRzdXBlcltuYW1lXTtcblx0XHR9XG5cdH1cblxuXHRmb3IoY29uc3QgbmFtZSBpbiAkZGVzY3IpXG5cdHtcblx0XHRpZihuYW1lID09PSAnJGluaXQnXG5cdFx0ICAgfHxcblx0XHQgICBuYW1lLmNoYXJBdCgwKSAhPT0gJyQnXG5cdFx0ICAgfHxcblx0XHQgICAkZGVzY3IuaGFzT3duUHJvcGVydHkobmFtZSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcblx0XHQgKSB7XG5cdFx0XHQkY2xhc3MuX2ludGVybmFsX2FkZGVkW25hbWVdID0gJGRlc2NyW25hbWVdO1xuXG5cdFx0XHQkY2xhc3MucHJvdG90eXBlW25hbWVdID0gJGRlc2NyW25hbWVdO1xuXHRcdH1cblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGNsYXNzLnByb3RvdHlwZS4kbmFtZSA9ICRuYW1lO1xuXHQkY2xhc3MucHJvdG90eXBlLiRjbGFzcyA9ICRjbGFzcztcblx0JGNsYXNzLnByb3RvdHlwZS4kaW1wbGVtZW50cyA9ICRzdXBlcl9pbXBsZW1lbnRzLmNvbmNhdCgkZGVzY3JfaW1wbGVtZW50cyk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfJGFkZFRvTmFtZXNwYWNlKCRuYW1lLCAkY2xhc3MpO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0aWYoJGRlc2NyLiQpXG5cdHtcblx0XHQkZGVzY3IuJC5hcHBseSgkY2xhc3MpO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBOb2RlSlMgRVhURU5TSU9OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pZih0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpXG57XG5cdG1vZHVsZS5leHBvcnRzLk5hbWVzcGFjZSA9ICRBTUlOYW1lc3BhY2U7XG5cdG1vZHVsZS5leHBvcnRzLkludGVyZmFjZSA9ICRBTUlJbnRlcmZhY2U7XG5cdG1vZHVsZS5leHBvcnRzLiAgQ2xhc3MgICA9ICAgJEFNSUNsYXNzICA7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogSlFVRVJZIEVYVEVOU0lPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaWYodHlwZW9mIGpRdWVyeSAhPT0gJ3VuZGVmaW5lZCcpXG57XG5cdGpRdWVyeS5OYW1lc3BhY2UgPSAkQU1JTmFtZXNwYWNlO1xuXHRqUXVlcnkuSW50ZXJmYWNlID0gJEFNSUludGVyZmFjZTtcblx0alF1ZXJ5LiAgQ2xhc3MgICA9ICAgJEFNSUNsYXNzICA7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIEFNSSB1cmwgcm91dGluZyBzdWJzeXN0ZW1cbiAqIEBuYW1lc3BhY2UgYW1pUm91dGVyXG4gKi9cblxuJEFNSU5hbWVzcGFjZSgnYW1pUm91dGVyJywgLyoqIEBsZW5kcyBhbWlSb3V0ZXIgKi8ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQUklWQVRFIE1FTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9zY3JpcHRVUkw6ICcnLFxuXHRfb3JpZ2luVVJMOiAnJyxcblx0X3dlYkFwcFVSTDogJycsXG5cblx0X2hhc2g6ICcnLFxuXHRfYXJnczogW10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcm91dGVzOiBbXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQUklWQVRFIE1FVEhPRFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9lYXRTbGFzaGVzOiBmdW5jdGlvbih1cmwpXG5cdHtcblx0XHR1cmwgPSB1cmwudHJpbSgpO1xuXG5cdFx0d2hpbGUodXJsW3VybC5sZW5ndGggLSAxXSA9PT0gJy8nKVxuXHRcdHtcblx0XHRcdHVybCA9IHVybC5zdWJzdHJpbmcoMCwgdXJsLmxlbmd0aCAtIDEpO1xuXHRcdH1cblxuXHRcdHJldHVybiB1cmw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogU1RBVElDIENPTlNUUlVDVE9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkOiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLl9hcmdzLmxlbmd0aCA9IDA7XG5cdFx0dGhpcy5fcm91dGVzLmxlbmd0aCA9IDA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCAgaHJlZiAgPSB3aW5kb3cubG9jYXRpb24uIGhyZWYgLnRyaW0oKTtcblx0XHRjb25zdCAgaGFzaCAgPSB3aW5kb3cubG9jYXRpb24uIGhhc2ggLnRyaW0oKTtcblx0XHRjb25zdCBzZWFyY2ggPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnRyaW0oKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogU0NSSVBUX1VSTCBBTkQgT1JJR0lOX1VSTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGZvcihsZXQgaWR4LCBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspXG5cdFx0e1xuXHRcdFx0aWR4ID0gc2NyaXB0c1tpXS5zcmMuaW5kZXhPZignanMvYW1pLicpO1xuXG5cdFx0XHRpZihpZHggPiAwKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLl9zY3JpcHRVUkwgPSBzY3JpcHRzW2ldLnNyYztcblxuXHRcdFx0XHR0aGlzLl9vcmlnaW5VUkwgPSB0aGlzLl9lYXRTbGFzaGVzKFxuXHRcdFx0XHRcdHRoaXMuX3NjcmlwdFVSTC5zdWJzdHJpbmcoMCwgaWR4KVxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBXRUJBUFBfVVJMICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5fd2ViQXBwVVJMID0gdGhpcy5fZWF0U2xhc2hlcyhcblx0XHRcdGhyZWYucmVwbGFjZSgvKD86XFwjfFxcPykuKiQvLCAnJylcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEhBU0ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLl9oYXNoID0gdGhpcy5fZWF0U2xhc2hlcyhcblx0XHRcdGhhc2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1xcPy4qJC8sICcnKVxuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQVJHUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHNlYXJjaClcblx0XHR7XG5cdFx0XHRzZWFyY2guc3Vic3RyaW5nKDEpLnNwbGl0KCcmJykuZm9yRWFjaCgocGFyYW0pID0+IHtcblxuXHRcdFx0XHRjb25zdCBwYXJ0cyA9IHBhcmFtLnNwbGl0KCc9Jyk7XG5cblx0XHRcdFx0LyoqLyBpZihwYXJ0cy5sZW5ndGggPT09IDEpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLl9hcmdzW2RlY29kZVVSSUNvbXBvbmVudChwYXJ0c1swXSldID0gLyotLS0tLS0tLSovICcnIC8qLS0tLS0tLS0qLztcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKHBhcnRzLmxlbmd0aCA9PT0gMilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuX2FyZ3NbZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFydHNbMV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FVEhPRFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIEFXRidzIHNjcmlwdCBVUkxcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBBV0YncyBzY3JpcHQgVVJMXG5cdCAgKi9cblxuXHRnZXRTY3JpcHRVUkw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zY3JpcHRVUkw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIG9yaWdpbiBVUkxcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBvcmlnaW4gVVJMXG5cdCAgKi9cblxuXHRnZXRPcmlnaW5VUkw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9vcmlnaW5VUkw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIHdlYmFwcCBVUkxcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSB3ZWJhcHAgVVJMXG5cdCAgKi9cblxuXHRnZXRXZWJBcHBVUkw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl93ZWJBcHBVUkw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIGFuY2hvciBwYXJ0IG9mIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgYW5jaG9yIHBhcnQgb2YgdGhlIHdlYmFwcCBVUkxcblx0ICAqL1xuXG5cdGdldEhhc2g6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9oYXNoO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBhcmd1bWVudHMgZXh0cmFjdGVkIGZyb20gdGhlIHdlYmFwcCBVUkxcblx0ICAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fSBUaGUgYXJndW1lbnRzIGV4dHJhY3RlZCBmcm9tIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKi9cblxuXHRnZXRBcmdzOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYXJncztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXBwZW5kcyBhIHJvdXRpbmcgcnVsZVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHJlZ0V4cCB0aGUgcmVnRXhwXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gaGFuZGxlciB0aGUgaGFuZGxlclxuXHQgICogQHJldHVybnMge05hbWVzcGFjZX0gVGhlIGFtaVJvdXRlciBzaW5nbGV0b25cblx0ICAqL1xuXG5cdGFwcGVuZDogZnVuY3Rpb24ocmVnRXhwLCBoYW5kbGVyKVxuXHR7XG5cdFx0dGhpcy5fcm91dGVzLnVuc2hpZnQoe1xuXHRcdFx0cmVnRXhwOiByZWdFeHAsXG5cdFx0XHRoYW5kbGVyOiBoYW5kbGVyLFxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFJlbW92ZXMgc29tZSByb3V0aW5nIHJ1bGVzXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcmVnRXhwIHRoZSByZWdFeHBcblx0ICAqIEByZXR1cm5zIHtOYW1lc3BhY2V9IFRoZSBhbWlSb3V0ZXIgc2luZ2xldG9uXG5cdCAgKi9cblxuXHRyZW1vdmU6IGZ1bmN0aW9uKHJlZ0V4cClcblx0e1xuXHRcdHRoaXMuX3JvdXRlcyA9IHRoaXMuX3JvdXRlcy5maWx0ZXIoKHJvdXRlKSA9PiB7XG5cblx0XHRcdHJldHVybiByb3V0ZS5yZWdFeHAudG9TdHJpbmcoKSAhPT0gcmVnRXhwLnRvU3RyaW5nKCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hlY2tzIHdoZXRoZXIgdGhlIFVSTCBtYXRjaGVzIHdpdGggYSByb3V0aW5nIHJ1bGVcblx0ICAqIEByZXR1cm5zIHtCb29sZWFufVxuXHQgICovXG5cblx0Y2hlY2s6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBtO1xuXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX3JvdXRlcy5sZW5ndGg7IGkrKylcblx0XHR7XG5cdFx0XHRtID0gdGhpcy5faGFzaC5tYXRjaCh0aGlzLl9yb3V0ZXNbaV0ucmVnRXhwKTtcblxuXHRcdFx0aWYobSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5fcm91dGVzW2ldLmhhbmRsZXIuYXBwbHkoYW1pUm91dGVyLCBtKTtcblxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFwcGVuZCBhIG5ldyBoaXN0b3J5IGVudHJ5XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCB0aGUgbmV3IHBhdGhcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGV4dD1udWxsXSB0aGUgbmV3IGNvbnRleHRcblx0ICAqIEByZXR1cm5zIHtCb29sZWFufVxuXHQgICovXG5cblx0YXBwZW5kSGlzdG9yeUVudHJ5OiBmdW5jdGlvbihwYXRoLCBjb250ZXh0ID0gbnVsbClcblx0e1xuXHRcdGlmKGhpc3RvcnkucHVzaFN0YXRlKVxuXHRcdHtcblx0XHRcdGhpc3RvcnkucHVzaFN0YXRlKGNvbnRleHQsIG51bGwsIHRoaXMuX3dlYkFwcFVSTCArIHRoaXMuX2VhdFNsYXNoZXMocGF0aCkpO1xuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFJlcGxhY2UgdGhlIGN1cnJlbnQgaGlzdG9yeSBlbnRyeVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggdGhlIG5ldyBwYXRoXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHQ9bnVsbF0gdGhlIG5ldyBjb250ZXh0XG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdHJlcGxhY2VIaXN0b3J5RW50cnk6IGZ1bmN0aW9uKHBhdGgsIGNvbnRleHQgPSBudWxsKVxuXHR7XG5cdFx0aWYoaGlzdG9yeS5yZXBsYWNlU3RhdGUpXG5cdFx0e1xuXHRcdFx0aGlzdG9yeS5yZXBsYWNlU3RhdGUoY29udGV4dCwgbnVsbCwgdGhpcy5fd2ViQXBwVVJMICsgdGhpcy5fZWF0U2xhc2hlcyhwYXRoKSk7XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kQU1JTmFtZXNwYWNlKCdhbWknLCB7XG5cblx0dmVyc2lvbjogJzAuMC4xJyxcblx0Y29tbWl0X2lkOiAne3tBTUlfQ09NTUlUX0lEfX0nLFxufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogSU5URVJOQUwgRlVOQ1RJT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZnVuY3Rpb24gX2FtaV9pbnRlcm5hbF90aGVuKGRlZmVycmVkLCBkb25lRnVuYywgZmFpbEZ1bmMpXG57XG5cdGlmKGRlZmVycmVkICYmIGRlZmVycmVkLnRoZW4pXG5cdHtcblx0XHRkZWZlcnJlZC50aGVuKGRvbmVGdW5jLCBmYWlsRnVuYyk7XG5cdH1cblx0ZWxzZVxuXHR7XG5cdFx0ZG9uZUZ1bmMoKTtcblx0fVxufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZnVuY3Rpb24gX2FtaV9pbnRlcm5hbF9hbHdheXMoZGVmZXJyZWQsIGFsd2F5c0Z1bmMpXG57XG5cdGlmKGRlZmVycmVkICYmIGRlZmVycmVkLmFsd2F5cylcblx0e1xuXHRcdGRlZmVycmVkLmFsd2F5cyhhbHdheXNGdW5jKTtcblx0fVxuXHRlbHNlXG5cdHtcblx0XHRhbHdheXNGdW5jKCk7XG5cdH1cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlXZWJBcHAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBBTUkgd2ViYXBwIHN1YnN5c3RlbVxuICogQG5hbWVzcGFjZSBhbWlXZWJBcHBcbiAqL1xuXG4kQU1JTmFtZXNwYWNlKCdhbWlXZWJBcHAnLCAvKiogQGxlbmRzIGFtaVdlYkFwcCAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBSSVZBVEUgTUVNQkVSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2lkUmVnRXhwOiBuZXcgUmVnRXhwKCdbYS16QS1aXVthLXpBLVowLTldezd9X1thLXpBLVowLTldezR9X1thLXpBLVowLTldezR9X1thLXpBLVowLTldezR9X1thLXpBLVowLTldezEyfScsICdnJyksXG5cblx0X2xpbmtFeHA6IG5ldyBSZWdFeHAoJ1xcXFxbKFteXFxcXF1dKilcXFxcXVxcXFwoKFteXFxcXCldKilcXFxcKScsICdnJyksXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZW1iZWRkZWQ6IGZhbHNlLFxuXHRfbm9Cb290c3RyYXA6IGZhbHNlLFxuXHRfbm9EYXRlVGltZVBpY2tlcjogZmFsc2UsXG5cdF9ub1NlbGVjdDI6IGZhbHNlLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2dsb2JhbERlZmVycmVkOiAkLkRlZmVycmVkKCksXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfc2hlZXRzOiBbXSxcblx0X3NjcmlwdHM6IFtdLFxuXG5cdF9jb250cm9sczoge30sXG5cdF9zdWJhcHBzOiB7fSxcblxuXHRfaXNSZWFkeTogZmFsc2UsXG5cdF9jYW5MZWF2ZTogdHJ1ZSxcblx0X2xvY2tDbnQ6IDB4MDAsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfY3VycmVudFN1YkFwcEluc3RhbmNlOiBuZXcgZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5vblJlYWR5ID0gZnVuY3Rpb24oKSB7fTtcblx0XHR0aGlzLm9uRXhpdCA9IGZ1bmN0aW9uKCkge307XG5cdFx0dGhpcy5vbkxvZ2luID0gZnVuY3Rpb24oKSB7fTtcblx0XHR0aGlzLm9uTG9nb3V0ID0gZnVuY3Rpb24oKSB7fTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQVUJMSUMgTUVNQkVSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogVGhlIG9yaWdpbiBVUkxcblx0ICAqIEB0eXBlIHtTdHJpbmd9XG5cdCAgKi9cblxuXHRvcmlnaW5VUkw6ICcvJyxcblxuXHQvKipcblx0ICAqIFRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICovXG5cblx0d2ViQXBwVVJMOiAnLycsXG5cblx0LyoqXG5cdCAgKiBUaGUgYW5jaG9yIHBhcnQgb2YgdGhlIHdlYmFwcCBVUkxcblx0ICAqIEB0eXBlIHtTdHJpbmd9XG5cdCAgKi9cblxuXHRoYXNoOiAnJyxcblxuXHQvKipcblx0ICAqIFRoZSBhcmd1bWVudHMgZXh0cmFjdGVkIGZyb20gdGhlIHdlYmFwcCBVUkxcblx0ICAqIEB0eXBlIHtBcnJheTxTdHJpbmc+fVxuXHQgICovXG5cblx0YXJnczoge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogU1RBVElDIENPTlNUUlVDVE9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkOiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogR0VUIEZMQUdTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVybCA9IGFtaVJvdXRlci5nZXRTY3JpcHRVUkwoKTtcblxuXHRcdGNvbnN0IGlkeCA9IHVybC5pbmRleE9mKCc/Jyk7XG5cblx0XHRpZihpZHggPiAwKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBmbGFncyA9IHVybC5zdWJzdHJpbmcoaWR4KS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0dGhpcy5fZW1iZWRkZWQgPSAoZmxhZ3MuaW5kZXhPZignZW1iZWRkZWQnKSA+PSAwKTtcblxuXHRcdFx0dGhpcy5fbm9Cb290c3RyYXAgPSAoZmxhZ3MuaW5kZXhPZignbm9ib290c3RyYXAnKSA+PSAwKTtcblxuXHRcdFx0dGhpcy5fbm9EYXRlVGltZVBpY2tlciA9IChmbGFncy5pbmRleE9mKCdub2RhdGV0aW1lcGlja2VyJykgPj0gMCk7XG5cblx0XHRcdHRoaXMuX25vU2VsZWN0MiA9IChmbGFncy5pbmRleE9mKCdub3NlbGVjdDInKSA+PSAwKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEdFVCBVUkxTLCBIQVNIIEFORCBBUkdTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLm9yaWdpblVSTCA9IGFtaVJvdXRlci5nZXRPcmlnaW5VUkwoKTtcblx0XHR0aGlzLndlYkFwcFVSTCA9IGFtaVJvdXRlci5nZXRXZWJBcHBVUkwoKTtcblxuXHRcdHRoaXMuaGFzaCA9IGFtaVJvdXRlci5nZXRIYXNoKCk7XG5cdFx0dGhpcy5hcmdzID0gYW1pUm91dGVyLmdldEFyZ3MoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBMT0FEIFNIRUVUUyBBTkQgU0NSSVBUUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgcmVzb3VyY2VzQ1NTID0gW107XG5cdFx0Y29uc3QgcmVzb3VyY2VzSlMgPSBbXTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKCF3aW5kb3cuUG9wcGVyKSB7XG5cdFx0XHRyZXNvdXJjZXNKUy5wdXNoKHRoaXMub3JpZ2luVVJMICsgJy9qcy9wb3BwZXIubWluLmpzJyk7XG5cdFx0fVxuXG5cdFx0aWYoIXdpbmRvdy5tb21lbnQpIHtcblx0XHRcdHJlc291cmNlc0pTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2pzL21vbWVudC5taW4uanMnKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighdGhpcy5fbm9Cb290c3RyYXAgJiYgKHR5cGVvZiBqUXVlcnkuZm4ubW9kYWwpICE9PSAnZnVuY3Rpb24nKVxuXHRcdHtcblx0XHRcdHJlc291cmNlc0NTUy5wdXNoKHRoaXMub3JpZ2luVVJMICsgJy9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnKTtcblx0XHRcdHJlc291cmNlc0pTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2pzL2Jvb3RzdHJhcC5taW4uanMnKTtcblx0XHR9XG5cblx0XHRpZighdGhpcy5fbm9EYXRlVGltZVBpY2tlciAmJiAodHlwZW9mIGpRdWVyeS5mbi5kYXRldGltZXBpY2tlcikgIT09ICdmdW5jdGlvbicpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzQ1NTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXIubWluLmNzcycpO1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyLm1pbi5qcycpO1xuXHRcdH1cblxuXHRcdGlmKCF0aGlzLl9ub1NlbGVjdDIgJiYgKHR5cGVvZiBqUXVlcnkuZm4uc2VsZWN0MikgIT09ICdmdW5jdGlvbicpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzQ1NTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9zZWxlY3QyLm1pbi5jc3MnKTtcblx0XHRcdHJlc291cmNlc0pTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2pzL3NlbGVjdDIubWluLmpzJyk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdC4uLnJlc291cmNlc0NTUyxcblx0XHRcdHRoaXMub3JpZ2luVVJMICsgJy9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnLFxuXHRcdFx0dGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9hbWkubWluLmNzcycsXG5cdFx0XHQuLi5yZXNvdXJjZXNKUyxcblx0XHRdKS5kb25lKCgvKi0tLSovKSA9PiB7XG5cblx0XHRcdHRoaXMuX2dsb2JhbERlZmVycmVkLnJlc29sdmUoLyotLS0qLyk7XG5cblx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2dsb2JhbERlZmVycmVkLnJlamVjdChtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBNT0RFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hlY2tzIHdoZXRoZXIgdGhlIFdlYkFwcCBpcyBleGVjdXRlZCBpbiBlbWJlZGRlZCBtb2RlXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGlzRW1iZWRkZWQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9lbWJlZGRlZDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hlY2tzIHdoZXRoZXIgdGhlIFdlYkFwcCBpcyBleGVjdXRlZCBsb2NhbGx5IChmaWxlOi8vLCBsb2NhbGhvc3QsIDEyNy4wLjAuMSBvciA6OjEpXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGlzTG9jYWw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gKCgnZmlsZTonKSlcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUgPT09ICdsb2NhbGhvc3QnXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnMTI3LjAuMC4xJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gKCgoJzo6MScpKSlcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVE9PTFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0eXBlT2Y6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCBuYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuIG5hbWUuc3RhcnRzV2l0aCgnW29iamVjdCAnKSA/IG5hbWUuc3Vic3RyaW5nKDgsIG5hbWUubGVuZ3RoIC0gMSlcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogLyotLS0tLS0tLS0tLSovICcnIC8qLS0tLS0tLS0tLS0qL1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGFzQXJyYXk6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50eXBlT2YoeCkgPT09ICdBcnJheScgPyAoeClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbeF1cblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXR1cDogZnVuY3Rpb24ob3B0aW9uTmFtZXMsIG9wdGlvbkRlZmF1bHRzLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgbCA9IG9wdGlvbk5hbWVzLmxlbmd0aDtcblx0XHRjb25zdCBtID0gb3B0aW9uRGVmYXVsdHMubGVuZ3RoO1xuXG5cdFx0aWYobCAhPT0gbSlcblx0XHR7XG5cdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHNldHRpbmdzKSB7XG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKG9wdGlvbk5hbWVzW2ldIGluIHNldHRpbmdzID8gc2V0dGluZ3Nbb3B0aW9uTmFtZXNbaV1dIDogb3B0aW9uRGVmYXVsdHNbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcblx0XHRcdFx0cmVzdWx0LnB1c2goLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyBvcHRpb25EZWZhdWx0c1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlcGxhY2U6IGFtaVR3aWcuc3RkbGliLl9yZXBsYWNlLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3RleHRUb0h0bWxYOiBbJyYnICAgICwgJ1wiJyAgICAgLCAnPCcgICAsICc+JyAgIF0sXG5cdF90ZXh0VG9IdG1sWTogWycmYW1wOycsICcmcXVvdDsnLCAnJmx0OycsICcmZ3Q7J10sXG5cblx0LyoqXG5cdCAgKiBFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIEhUTUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0dGV4dFRvSHRtbDogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5fdGV4dFRvSHRtbFgsIHRoaXMuX3RleHRUb0h0bWxZKTtcblx0fSxcblxuXHQvKipcblx0ICAqIFVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSFRNTCB0byB0ZXh0XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGh0bWxUb1RleHQ6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKHMgfHwgJycsIHRoaXMuX3RleHRUb0h0bWxZLCB0aGlzLl90ZXh0VG9IdG1sWCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfdGV4dFRvU3RyaW5nWDogWydcXFxcJyAgLCAnXFxuJyAsICdcIicgICwgJ1xcJycgIF0sXG5cdF90ZXh0VG9TdHJpbmdZOiBbJ1xcXFxcXFxcJywgJ1xcXFxuJywgJ1xcXFxcIicsICdcXFxcXFwnJ10sXG5cblx0LyoqXG5cdCAgKiBFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIEphdmFTY3JpcHQgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSB1bmVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdHRleHRUb1N0cmluZzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5fdGV4dFRvU3RyaW5nWCwgdGhpcy5fdGV4dFRvU3RyaW5nWSk7XG5cdH0sXG5cblx0LyoqXG5cdCAgKiBVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEphdmFTY3JpcHQgc3RyaW5nIHRvIHRleHRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0c3RyaW5nVG9UZXh0OiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TdHJpbmdZLCB0aGlzLl90ZXh0VG9TdHJpbmdYKTtcblxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2h0bWxUb1N0cmluZ1g6IFsnXFxcXCcgICwgJ1xcbicgLCAnJnF1b3Q7JyAgLCAnXFwnJyAgXSxcblx0X2h0bWxUb1N0cmluZ1k6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXCZxdW90OycsICdcXFxcXFwnJ10sXG5cblx0LyoqXG5cdCAgKiBFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBIVE1MIHRvIEphdmFTY3JpcHQgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSB1bmVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGh0bWxUb1N0cmluZzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5faHRtbFRvU3RyaW5nWCwgdGhpcy5faHRtbFRvU3RyaW5nWSk7XG5cdH0sXG5cblx0LyoqXG5cdCAgKiBVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEphdmFTY3JpcHQgc3RyaW5nIHRvIEhUTUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0c3RyaW5nVG9IdG1sOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl9odG1sVG9TdHJpbmdZLCB0aGlzLl9odG1sVG9TdHJpbmdYKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF90ZXh0VG9TUUxYOiBbJ1xcJycgIF0sXG5cdF90ZXh0VG9TUUxZOiBbJ1xcJ1xcJyddLFxuXG5cdC8qKlxuXHQgICogRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBTUUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0dGV4dFRvU1FMOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TUUxYLCB0aGlzLl90ZXh0VG9TUUxZKTtcblx0fSxcblxuXHQvKipcblx0ICAqIFVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gU1FMIHRvIHRleHRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0c3FsVG9UZXh0OiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TUUxZLCB0aGlzLl90ZXh0VG9TUUxYKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBCQVNFNjQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9iYXNlNjQ6ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OS1fJyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRW5jb2RlcyAoUkZDIDQ2NDgpIGEgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBkZWNvZGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGVuY29kZWQgc3RyaW5nXG5cdCAgKi9cblxuXHRiYXNlNjRFbmNvZGU6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRsZXQgdztcblxuXHRcdGNvbnN0IGUgPSBbXTtcblxuXHRcdGNvbnN0IGwgPSBzLmxlbmd0aCwgbSA9IGwgJSAzO1xuXG5cdFx0Y29uc3QgdGhpc19iYXNlNjQgPSB0aGlzLl9iYXNlNjQ7XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDspXG5cdFx0e1xuXHRcdFx0dyA9IHMuY2hhckNvZGVBdChpKyspIDw8IDE2XG5cdFx0XHQgICAgfFxuXHRcdFx0ICAgIHMuY2hhckNvZGVBdChpKyspIDw8IDhcblx0XHRcdCAgICB8XG5cdFx0XHQgICAgcy5jaGFyQ29kZUF0KGkrKykgPDwgMFxuXHRcdFx0O1xuXG5cdFx0XHRlLnB1c2godGhpc19iYXNlNjQuY2hhckF0KCh3ID4+IDE4KSAmIDB4M0YpKTtcblx0XHRcdGUucHVzaCh0aGlzX2Jhc2U2NC5jaGFyQXQoKHcgPj4gMTIpICYgMHgzRikpO1xuXHRcdFx0ZS5wdXNoKHRoaXNfYmFzZTY0LmNoYXJBdCgodyA+PiA2KSAmIDB4M0YpKTtcblx0XHRcdGUucHVzaCh0aGlzX2Jhc2U2NC5jaGFyQXQoKHcgPj4gMCkgJiAweDNGKSk7XG5cdFx0fVxuXG5cdFx0LyoqLyBpZihtID09PSAxKSB7XG5cdFx0XHRlLnNwbGljZSgtMiwgMik7XG5cdFx0fVxuXHRcdGVsc2UgaWYobSA9PT0gMikge1xuXHRcdFx0ZS5zcGxpY2UoLTEsIDEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBlLmpvaW4oJycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBEZWNvZGVzIChSRkMgNDY0OCkgYSBzdHJpbmdcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVuY29kZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZGVjb2RlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGJhc2U2NERlY29kZTogZnVuY3Rpb24ocylcblx0e1xuXHRcdGxldCB3O1xuXG5cdFx0Y29uc3QgZSA9IFtdO1xuXG5cdFx0Y29uc3QgbCA9IHMubGVuZ3RoLCBtID0gbCAlIDQ7XG5cblx0XHRjb25zdCB0aGlzX2Jhc2U2NCA9IHRoaXMuX2Jhc2U2NDtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOylcblx0XHR7XG5cdFx0XHR3ID0gdGhpc19iYXNlNjQuaW5kZXhPZihzLmNoYXJBdChpKyspKSA8PCAxOFxuXHRcdFx0ICAgIHxcblx0XHRcdCAgICB0aGlzX2Jhc2U2NC5pbmRleE9mKHMuY2hhckF0KGkrKykpIDw8IDEyXG5cdFx0XHQgICAgfFxuXHRcdFx0ICAgIHRoaXNfYmFzZTY0LmluZGV4T2Yocy5jaGFyQXQoaSsrKSkgPDwgNlxuXHRcdFx0ICAgIHxcblx0XHRcdCAgICB0aGlzX2Jhc2U2NC5pbmRleE9mKHMuY2hhckF0KGkrKykpIDw8IDBcblx0XHRcdDtcblxuXHRcdFx0ZS5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoKHcgPj4+IDE2KSAmIDB4RkYpKTtcblx0XHRcdGUucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh3ID4+PiA4KSAmIDB4RkYpKTtcblx0XHRcdGUucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh3ID4+PiAwKSAmIDB4RkYpKTtcblx0XHR9XG5cblx0XHQvKiovIGlmKG0gPT09IDIpIHtcblx0XHRcdGUuc3BsaWNlKC0yLCAyKTtcblx0XHR9XG5cdFx0ZWxzZSBpZihtID09PSAzKSB7XG5cdFx0XHRlLnNwbGljZSgtMSwgMSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGUuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogRFlOQU1JQyBSRVNPVVJDRSBMT0FESU5HICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZ2V0RXh0ZW5zaW9uOiBmdW5jdGlvbih1cmwpXG5cdHtcblx0XHRjb25zdCBpZHggPSB1cmwubGFzdEluZGV4T2YoJy4nKTtcblxuXHRcdHJldHVybiBpZHggPiAwID8gdXJsLnN1YnN0cmluZyhpZHgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZ2V0RGF0YVR5cGU6IGZ1bmN0aW9uKHVybCwgZGF0YVR5cGUpXG5cdHtcblx0XHRsZXQgcmVzdWx0O1xuXG5cdFx0aWYoZGF0YVR5cGUgPT09ICdhdXRvJylcblx0XHR7XG5cdFx0XHQvKiovIGlmKHVybC5pbmRleE9mKCdjdHJsOicpID09PSAwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSAnY29udHJvbCc7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmKHVybC5pbmRleE9mKCdzdWJhcHA6JykgPT09IDApXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdCA9ICdzdWJhcHAnO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRzd2l0Y2godGhpcy5fZ2V0RXh0ZW5zaW9uKHVybCkudG9Mb3dlckNhc2UoKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNhc2UgJy5jc3MnOlxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gJ3NoZWV0Jztcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAnLmpzJzpcblx0XHRcdFx0XHRcdHJlc3VsdCA9ICdzY3JpcHQnO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICcuanNvbic6XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAnanNvbic7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJy54bWwnOlxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gJ3htbCc7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAndGV4dCc7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0ID0gZGF0YVR5cGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9fbG9hZFhYWDogZnVuY3Rpb24oZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpXG5cdHtcblx0XHRpZih1cmxzLmxlbmd0aCA9PT0gMClcblx0XHR7XG5cdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVzb2x2ZVdpdGgoY29udGV4dCwgW3Jlc3VsdF0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVybCA9IHVybHMuc2hpZnQoKS50cmltKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkYXRhVFlQRSA9IHRoaXMuX2dldERhdGFUeXBlKHVybCwgZGF0YVR5cGUpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0c3dpdGNoKGRhdGFUWVBFKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQ09OVFJPTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnY29udHJvbCc6XG5cblx0XHRcdFx0dGhpcy5sb2FkQ29udHJvbCh1cmwpLnRoZW4oKGRhdGEpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGRhdGEpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU1VCQVBQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnc3ViYXBwJzpcblxuXHRcdFx0XHR0aGlzLmxvYWRTdWJBcHAodXJsKS50aGVuKChkYXRhKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucHVzaChkYXRhKTtcblxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgcmVzdWx0LCB1cmxzLCBkYXRhVHlwZSwgY29udGV4dCk7XG5cblx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNIRUVUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ3NoZWV0JzpcblxuXHRcdFx0XHRpZih0aGlzLl9zaGVldHMuaW5kZXhPZih1cmwpID49IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChmYWxzZSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0XHR1cmw6IHVybCxcblx0XHRcdFx0XHRcdGFzeW5jOiBmYWxzZSxcblx0XHRcdFx0XHRcdGNhY2hlOiBmYWxzZSxcblx0XHRcdFx0XHRcdGNyb3NzRG9tYWluOiB0cnVlLFxuXHRcdFx0XHRcdFx0ZGF0YVR5cGU6IGRhdGFUWVBFLFxuXHRcdFx0XHRcdH0pLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaCh0cnVlKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5fc2hlZXRzLnB1c2godXJsKTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblxuXHRcdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBgJyArIHVybCArICdgJ10pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU0NSSVBUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnc2NyaXB0JzpcblxuXHRcdFx0XHRpZih0aGlzLl9zY3JpcHRzLmluZGV4T2YodXJsKSA+PSAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goZmFsc2UpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRcdFx0XHRhc3luYzogZmFsc2UsXG5cdFx0XHRcdFx0XHRjYWNoZTogZmFsc2UsXG5cdFx0XHRcdFx0XHRjcm9zc0RvbWFpbjogdHJ1ZSxcblx0XHRcdFx0XHRcdGRhdGFUeXBlOiBkYXRhVFlQRSxcblx0XHRcdFx0XHR9KS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnB1c2godHJ1ZSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuX3NjcmlwdHMucHVzaCh1cmwpO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIGAnICsgdXJsICsgJ2AnXSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBPVEhFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRcdFx0YXN5bmM6IHRydWUsXG5cdFx0XHRcdFx0Y2FjaGU6IGZhbHNlLFxuXHRcdFx0XHRcdGNyb3NzRG9tYWluOiB0cnVlLFxuXHRcdFx0XHRcdGRhdGFUeXBlOiBkYXRhVFlQRSxcblx0XHRcdFx0fSkudGhlbigoZGF0YSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goZGF0YSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgYCcgKyB1cmwgKyAnYCddKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9sb2FkWFhYOiBmdW5jdGlvbih1cmxzLCBkYXRhVHlwZSwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtkZWZlcnJlZF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgW10sIHRoaXMuYXNBcnJheSh1cmxzKSwgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgcmVzb3VyY2VzIGJ5IGV4dGVuc2lvblxuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRSZXNvdXJjZXM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ2F1dG8nLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIENTUyBzaGVldHNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkU2hlZXRzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICdzaGVldCcsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgSlMgc2NyaXB0c1xuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRTY3JpcHRzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICdzY3JpcHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIEpTT04gZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkSlNPTnM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ2pzb24nLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIFhNTCBmaWxlc1xuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRYTUxzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICd4bWwnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIEhUTUwgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkSFRNTHM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ3RleHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIFRXSUcgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkVFdJR3M6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ3RleHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIHRleHQgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkVGV4dHM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ3RleHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSFRNTCBDT05URU5UICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfeHh4SFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIG1vZGUsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHQsIHN1ZmZpeCwgZGljdCwgdHdpZ3NdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCcsICdzdWZmaXgnLCAnZGljdCcsICd0d2lncyddLFxuXHRcdFx0W3Jlc3VsdCwgbnVsbCwgbnVsbCwgbnVsbF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihzdWZmaXgpXG5cdFx0e1xuXHRcdFx0dHdpZyA9IHR3aWcucmVwbGFjZSh0aGlzLl9pZFJlZ0V4cCwgZnVuY3Rpb24oaWQpIHtcblxuXHRcdFx0XHRyZXR1cm4gaWQgKyAnX2luc3RhbmNlJyArIHN1ZmZpeDtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IGh0bWwgPSB0aGlzLmZvcm1hdFRXSUcodHdpZywgZGljdCwgdHdpZ3MpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHByb21pc2U7XG5cblx0XHRsZXQgZWwgPSAkKHNlbGVjdG9yKTtcblxuXHRcdHN3aXRjaChtb2RlKVxuXHRcdHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0cHJvbWlzZSA9IGVsLmh0bWwoaHRtbCkucHJvbWlzZSgpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRwcm9taXNlID0gZWwucHJlcGVuZChodG1sKS5wcm9taXNlKCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdHByb21pc2UgPSBlbC5hcHBlbmQoaHRtbCkucHJvbWlzZSgpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRwcm9taXNlID0gZWwucmVwbGFjZVdpdGgoZWwuaXMoJ1tpZF0nKSA/IGh0bWwucmVwbGFjZSgvXlxccyooPFthLXpBLVpfLV0rKS8sICckMSBpZD1cIicgKyBlbC5hdHRyKCdpZCcpICsgJ1wiJykgOiBodG1sKS5wcm9taXNlKCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHByb21pc2UuZG9uZSgoKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsZXQgZWwgPSAkKHNlbGVjdG9yKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IF9maW5kID0gKG1vZGUgPT09IDMpID8gKF9zZWxlY3RvcikgPT4gZWwuZmluZFdpdGhTZWxmKF9zZWxlY3Rvcilcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKF9zZWxlY3RvcikgPT4gZWwuICAgIGZpbmQgICAgKF9zZWxlY3Rvcilcblx0XHRcdDtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKGpRdWVyeS5mbi50b29sdGlwKVxuXHRcdFx0e1xuXHRcdFx0XHRfZmluZCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoe1xuXHRcdFx0XHRcdGh0bWw6IGZhbHNlLFxuXHRcdFx0XHRcdGRlbGF5OiB7XG5cdFx0XHRcdFx0XHRzaG93OiA1MDAsXG5cdFx0XHRcdFx0XHRoaWRlOiAxMDAsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihqUXVlcnkuZm4ucG9wb3Zlcilcblx0XHRcdHtcblx0XHRcdFx0X2ZpbmQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5wb3BvdmVyKHtcblx0XHRcdFx0XHRodG1sOiB0cnVlLFxuXHRcdFx0XHRcdGRlbGF5OiB7XG5cdFx0XHRcdFx0XHRzaG93OiA1MDAsXG5cdFx0XHRcdFx0XHRoaWRlOiAxMDAsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihqUXVlcnkuZm4uZGF0ZXRpbWVwaWNrZXIpXG5cdFx0XHR7XG5cdFx0XHRcdF9maW5kKCcuZm9ybS1kYXRldGltZScpLmRhdGV0aW1lcGlja2VyKHtcblx0XHRcdFx0XHRmb3JtYXQ6ICdZWVlZLU1NLUREIEhIOm1tOnNzLlNTU1NTUydcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0X2ZpbmQoJy5mb3JtLWRhdGUnKS5kYXRldGltZXBpY2tlcih7XG5cdFx0XHRcdFx0Zm9ybWF0OiAnWVlZWS1NTS1ERCdcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0X2ZpbmQoJy5mb3JtLXRpbWUnKS5kYXRldGltZXBpY2tlcih7XG5cdFx0XHRcdFx0Zm9ybWF0OiAnSEg6bW06c3MnXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdF9maW5kKCcuZm9ybS10aW1lLWhtJykuZGF0ZXRpbWVwaWNrZXIoe1xuXHRcdFx0XHRcdGZvcm1hdDogJ0hIOm1tJ1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZWxdKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUHV0cyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgdGhlIHRhcmdldCBzZWxlY3RvclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgZnJhZ21lbnRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIHN1ZmZpeCwgZGljdCwgdHdpZ3MpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRyZXBsYWNlSFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3h4eEhUTUwoc2VsZWN0b3IsIHR3aWcsIDAsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUHJlcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIHRoZSB0YXJnZXQgc2VsZWN0b3Jcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0d2lnIHRoZSBUV0lHIGZyYWdtZW50XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBzdWZmaXgsIGRpY3QsIHR3aWdzKVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0cHJlcGVuZEhUTUw6IGZ1bmN0aW9uKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl94eHhIVE1MKHNlbGVjdG9yLCB0d2lnLCAxLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFwcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIHRoZSB0YXJnZXQgc2VsZWN0b3Jcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0d2lnIHRoZSBUV0lHIGZyYWdtZW50XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBzdWZmaXgsIGRpY3QsIHR3aWdzKVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0YXBwZW5kSFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3h4eEhUTUwoc2VsZWN0b3IsIHR3aWcsIDIsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogSW50ZXJwcmV0ZXMgdGhlIGdpdmVuIFRXSUcgc3RyaW5nLCBzZWUge0BsaW5rIGh0dHA6Ly90d2lnLnNlbnNpb2xhYnMub3JnL2RvY3VtZW50YXRpb259XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBzdHJpbmdcblx0ICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBbZGljdF0gdGhlIGRpY3Rpb25hcnlcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbdHdpZ3NdIGRpY3Rpb25hcnkgb2YgZnJhZ21lbnRzXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgSW50ZXJwcmV0ZWQgVFdJRyBzdHJpbmdcblx0ICAqL1xuXG5cdGZvcm1hdFRXSUc6IGZ1bmN0aW9uKHR3aWcsIGRpY3QgPSB7fSwgdHdpZ3MgPSB7fSlcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgcmVuZGVyID0gKHR3aWcsIGRpY3QpID0+IHtcblxuXHRcdFx0aWYodGhpcy50eXBlT2YoZGljdCkgIT09ICdPYmplY3QnKVxuXHRcdFx0e1xuXHRcdFx0XHRkaWN0ID0ge307XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMudHlwZU9mKHR3aWdzKSAhPT0gJ09iamVjdCcpXG5cdFx0XHR7XG5cdFx0XHRcdHR3aWdzID0ge307XG5cdFx0XHR9XG5cblx0XHRcdGRpY3RbJ09SSUdJTl9VUkwnXSA9IHRoaXMub3JpZ2luVVJMO1xuXHRcdFx0ZGljdFsnV0VCQVBQX1VSTCddID0gdGhpcy53ZWJBcHBVUkw7XG5cblx0XHRcdHJldHVybiBhbWlUd2lnLmVuZ2luZS5yZW5kZXIodHdpZywgZGljdCwgdHdpZ3MpO1xuXHRcdH07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0cnlcblx0XHR7XG5cdFx0XHRpZih0aGlzLnR5cGVPZihkaWN0KSA9PT0gJ0FycmF5Jylcblx0XHRcdHtcblx0XHRcdFx0ZGljdC5mb3JFYWNoKChESUNUKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucHVzaChyZW5kZXIodHdpZywgRElDVCwgdHdpZ3MpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKHJlbmRlcih0d2lnLCBkaWN0LCB0d2lncykpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRjYXRjaChlcnJvcilcblx0XHR7XG5cdFx0XHRyZXN1bHQubGVuZ3RoID0gMDtcblxuXHRcdFx0dGhpcy5lcnJvcignVFdJRyBwYXJzaW5nIGVycm9yOiAnICsgZXJyb3IubWVzc2FnZSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBKU1BBVEggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRmluZHMgZGF0YSB3aXRoaW4gdGhlIGdpdmVuIEpTT04sIHNlZSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2RmaWxhdG92L2pzcGF0aH1cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIHRoZSBwYXRoXG5cdCAgKiBAcGFyYW0ge09iamVjdH0ganNvbiB0aGUgSlNPTlxuXHQgICogQHJldHVybnMge0FycmF5fSBUaGUgcmVzdWx0aW5nIGFycmF5XG5cdCAgKi9cblxuXHRqc3BhdGg6IGZ1bmN0aW9uKHBhdGgsIGpzb24pXG5cdHtcblx0XHRyZXR1cm4gSlNQYXRoLmFwcGx5KHBhdGgsIGpzb24pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNUQUNLICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0U3RhY2s6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRyeVxuXHRcdHtcblx0XHRcdHRocm93IEVycm9yKCk7XG5cdFx0fVxuXHRcdGNhdGNoKGUxKVxuXHRcdHtcblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gZTEuc3RhY2s7XG5cdFx0XHR9XG5cdFx0XHRjYXRjaChlMilcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuICgoKCcnKSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBMT0NLICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogTG9ja3MgdGhlIFdlYiBhcHBsaWNhdGlvblxuXHQgICovXG5cblx0bG9jazogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxpbmVzID0gdGhpcy5nZXRTdGFjaygpLnNwbGl0KCdcXG4nKTtcblxuXHRcdGlmKGxpbmVzLmxlbmd0aCA+IDIpXG5cdFx0e1xuXHRcdFx0Y29uc29sZS5sb2coJ2xvY2tbJyArIHRoaXMuX2xvY2tDbnQgKyAnXSA6OiAnICsgbGluZXNbMl0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblx0XHR9XG5cblx0XHQvKiovXG5cblx0XHRpZih0aGlzLl9sb2NrQ250IDw9IDApXG5cdFx0e1xuXHRcdFx0JCgnI2FtaV9sb2NrZXInKS5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xuXG5cdFx0XHR0aGlzLl9sb2NrQ250ID0gMTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRoaXMuX2xvY2tDbnQrKztcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFVubG9ja3MgdGhlIFdlYiBhcHBsaWNhdGlvblxuXHQgICovXG5cblx0dW5sb2NrOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZih0aGlzLl9sb2NrQ250IDw9IDEpXG5cdFx0e1xuXHRcdFx0JCgnI2FtaV9sb2NrZXInKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG5cdFx0XHR0aGlzLl9sb2NrQ250ID0gMDtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRoaXMuX2xvY2tDbnQtLTtcblx0XHR9XG5cblx0XHQvKiovXG5cblx0XHRsZXQgbGluZXMgPSB0aGlzLmdldFN0YWNrKCkuc3BsaXQoJ1xcbicpO1xuXG5cdFx0aWYobGluZXMubGVuZ3RoID4gMilcblx0XHR7XG5cdFx0XHRjb25zb2xlLmxvZygndW5sb2NrWycgKyB0aGlzLl9sb2NrQ250ICsgJ10gOjogJyArIGxpbmVzWzJdKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0bW9kYWxMb2NrOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGluZXMgPSB0aGlzLmdldFN0YWNrKCkuc3BsaXQoJ1xcbicpO1xuXG5cdFx0aWYobGluZXMubGVuZ3RoID4gMilcblx0XHR7XG5cdFx0XHRjb25zb2xlLmxvZygnbW9kYWxMb2NrWycgKyB0aGlzLl9sb2NrQ250ICsgJ10gOjogJyArIGxpbmVzWzJdKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cdFx0fVxuXG5cdFx0LyoqL1xuXG5cdFx0dGhpcy5fbG9ja0NudCA9IHRoaXMuX3RtcExvY2tDbnQ7XG5cblx0XHRpZih0aGlzLl9sb2NrQ250ID4gMClcblx0XHR7XG5cdFx0XHQkKCcjYW1pX2xvY2tlcicpLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0bW9kYWxVbmxvY2s6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuX3RtcExvY2tDbnQgPSB0aGlzLl9sb2NrQ250O1xuXG5cdFx0aWYodGhpcy5fbG9ja0NudCA+IDApXG5cdFx0e1xuXHRcdFx0JCgnI2FtaV9sb2NrZXInKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXHRcdH1cblxuXHRcdC8qKi9cblxuXHRcdGxldCBsaW5lcyA9IHRoaXMuZ2V0U3RhY2soKS5zcGxpdCgnXFxuJyk7XG5cblx0XHRpZihsaW5lcy5sZW5ndGggPiAyKVxuXHRcdHtcblx0XHRcdGNvbnNvbGUubG9nKCdtb2RhbFVubG9ja1snICsgdGhpcy5fbG9ja0NudCArICddIDo6ICcgKyBsaW5lc1syXSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRW5hYmxlcyB0aGUgbWVzc2FnZSBpbiBhIGNvbmZpcm1hdGlvbiBkaWFsb2cgYm94IHRvIGluZm9ybSB0aGF0IHRoZSB1c2VyIGlzIGFib3V0IHRvIGxlYXZlIHRoZSBjdXJyZW50IHBhZ2UuXG5cdCAgKi9cblxuXHRjYW5MZWF2ZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2FuTGVhdmUgPSB0cnVlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBEaXNhYmxlcyB0aGUgbWVzc2FnZSBpbiBhIGNvbmZpcm1hdGlvbiBkaWFsb2cgYm94IHRvIGluZm9ybSB0aGF0IHRoZSB1c2VyIGlzIGFib3V0IHRvIGxlYXZlIHRoZSBjdXJyZW50IHBhZ2UuXG5cdCAgKi9cblxuXHRjYW5ub3RMZWF2ZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2FuTGVhdmUgPSBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBNRVNTQUdFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9wdWJsaXNoQWxlcnQ6IGZ1bmN0aW9uKGNsYXp6LCB0aXRsZSwgbWVzc2FnZSwgZmFkZU91dClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnNvbGUubG9nKCdBTUkgJyArIHRpdGxlLnRvVXBwZXJDYXNlKCkgKyAnOiAnICsgbWVzc2FnZSArICdcXG4nICsgdGhpcy5nZXRTdGFjaygpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBodG1sID0gJzxkaXYgY2xhc3M9XCJ0b2FzdFwiIHJvbGU9XCJhbGVydFwiICcgKyAoZmFkZU91dCA/ICdkYXRhLWRlbGF5PVwiNjAwMDBcIicgOiAnZGF0YS1hdXRvaGlkZT1cImZhbHNlXCInKSArICc+PGRpdiBjbGFzcz1cInRvYXN0LWhlYWRlclwiPjxzdHJvbmcgY2xhc3M9XCJtci1hdXRvICcgKyBjbGF6eiArICdcIj4nICsgdGl0bGUgKyAnPC9zdHJvbmc+PHNtYWxsPicgKyB0aGlzLnRleHRUb0h0bWwod2luZG93Lm1vbWVudCgpLmZvcm1hdCgnREQgTU1NLCBISDptbTpzcycpKSArICc8L3NtYWxsPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWwtMiBtYi0xIGNsb3NlXCIgZGF0YS1kaXNtaXNzPVwidG9hc3RcIj48c3Bhbj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPjwvZGl2PjxkaXYgY2xhc3M9XCJ0b2FzdC1ib2R5XCI+JyArIHRoaXMudGV4dFRvSHRtbChtZXNzYWdlKSArICc8L2Rpdj48L2Rpdj4nO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZWwgPSAkKCcjYW1pX2FsZXJ0X2NvbnRlbnQnKTtcblxuXHRcdGVsLmFwcGVuZChodG1sLnJlcGxhY2UodGhpcy5fbGlua0V4cCwgJzxhIGhyZWY9XCIkMVwiIHRhcmdldD1cIl9ibGFua1wiPiQyPC9hPicpKS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdGVsLmZpbmQoJy50b2FzdDpsYXN0LWNoaWxkJykudG9hc3QoJ3Nob3cnKTtcblxuXHRcdFx0JChkb2N1bWVudCkuc2Nyb2xsVG9wKDApO1xuXG5cdFx0XHR0aGlzLnVubG9jaygpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTaG93cyBhbiAnaW5mbycgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IG1lc3NhZ2UgdGhlIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZhZGVPdXQ9ZmFsc2VdIGlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXG5cdCAgKi9cblxuXHRpbmZvOiBmdW5jdGlvbihtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0aWYodGhpcy50eXBlT2YobWVzc2FnZSkgPT09ICdBcnJheScpXG5cdFx0e1xuXHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2Uuam9pbignLiAnKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wdWJsaXNoQWxlcnQoJ3RleHQtaW5mbycsICdJbmZvJywgbWVzc2FnZSwgZmFkZU91dCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFNob3dzIGEgJ3N1Y2Nlc3MnIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBtZXNzYWdlIHRoZSBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge0Jvb2xlYW59IFtmYWRlT3V0PWZhbHNlXSBpZiBUcnVlLCB0aGUgbWVzc2FnZSBkaXNhcHBlYXJzIGFmdGVyIDYwc1xuXHQgICovXG5cblx0c3VjY2VzczogZnVuY3Rpb24obWVzc2FnZSwgZmFkZU91dClcblx0e1xuXHRcdGlmKHRoaXMudHlwZU9mKG1lc3NhZ2UpID09PSAnQXJyYXknKVxuXHRcdHtcblx0XHRcdG1lc3NhZ2UgPSBtZXNzYWdlLmpvaW4oJy4gJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fcHVibGlzaEFsZXJ0KCd0ZXh0LXN1Y2Nlc3MnLCAnU3VjY2VzcycsIG1lc3NhZ2UsIGZhZGVPdXQpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTaG93cyBhICd3YXJuaW5nJyBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbWVzc2FnZSB0aGUgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtCb29sZWFufSBbZmFkZU91dD1mYWxzZV0gaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcblx0ICAqL1xuXG5cdHdhcm5pbmc6IGZ1bmN0aW9uKG1lc3NhZ2UsIGZhZGVPdXQpXG5cdHtcblx0XHRpZih0aGlzLnR5cGVPZihtZXNzYWdlKSA9PT0gJ0FycmF5Jylcblx0XHR7XG5cdFx0XHRtZXNzYWdlID0gbWVzc2FnZS5qb2luKCcuICcpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3B1Ymxpc2hBbGVydCgndGV4dC13YXJuaW5nJywgJ1dhcm5pbmcnLCBtZXNzYWdlLCBmYWRlT3V0KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU2hvd3MgYW4gJ2Vycm9yJyBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbWVzc2FnZSB0aGUgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtCb29sZWFufSBbZmFkZU91dD1mYWxzZV0gaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcblx0ICAqL1xuXG5cdGVycm9yOiBmdW5jdGlvbihtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0aWYodGhpcy50eXBlT2YobWVzc2FnZSkgPT09ICdBcnJheScpXG5cdFx0e1xuXHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2Uuam9pbignLiAnKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wdWJsaXNoQWxlcnQoJ3RleHQtZGFuZ2VyJywgJ0Vycm9yJywgbWVzc2FnZSwgZmFkZU91dCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEZsdXNoZXMgbWVzc2FnZXNcblx0ICAqL1xuXG5cdGZsdXNoOiBmdW5jdGlvbigpXG5cdHtcblx0XHQkKCcjYW1pX2FsZXJ0X2NvbnRlbnQnKS5lbXB0eSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIEJSRUFEQ1JVTUIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBGaWxsIHRoZSBtYWluIGJyZWFkY3J1bWJcblx0ICAqIEBwYXJhbSB7QXJyYXl9IGl0ZW1zIHRoZSBhcnJheSBvZiBpdGVtcyAoSFRNTCBmb3JtYXQpXG5cdCAgKi9cblxuXHRmaWxsQnJlYWRjcnVtYjogZnVuY3Rpb24oaXRlbXMpXG5cdHtcblx0XHRsZXQgcyA9IHRoaXMudHlwZU9mKGl0ZW1zKSA9PT0gJ0FycmF5JyA/IGl0ZW1zLm1hcCgoaXRlbSkgPT4gJzxsaSBjbGFzcz1cImJyZWFkY3J1bWItaXRlbVwiPicgKyBpdGVtLnJlcGxhY2UoL3t7V0VCQVBQX1VSTH19L2csIHRoaXMud2ViQXBwVVJMKSArICc8L2xpPicpLmpvaW4oJycpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblxuXHRcdCQoJyNhbWlfYnJlYWRjcnVtYl9jb250ZW50JykuaHRtbChzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBXRUIgQVBQTElDQVRJT04gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogVGhpcyBtZXRob2QgbXVzdCBiZSBvdmVybG9hZGVkIGFuZCBpcyBjYWxsZWQgd2hlbiB0aGUgV2ViIGFwcGxpY2F0aW9uIHN0YXJ0c1xuXHQgICogQGV2ZW50IGFtaVdlYkFwcCNvblJlYWR5XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlckRhdGFcblx0ICAqL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKCF0aGlzLl9lbWJlZGRlZClcblx0XHR7XG5cdFx0XHRhbGVydCgnZXJyb3I6IGBhbWlXZWJBcHAub25SZWFkeSgpYCBtdXN0IGJlIG92ZXJsb2FkZWQhJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFRoaXMgbWV0aG9kIG11c3QgYmUgb3ZlcmxvYWRlZCBhbmQgaXMgY2FsbGVkIHdoZW4gdGhlIHRvb2xiYXIgbmVlZHMgdG8gYmUgdXBkYXRlZFxuXHQgICogQGV2ZW50IGFtaVdlYkFwcCNvblJlZnJlc2hcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNBdXRoXG5cdCAgKi9cblxuXHRvblJlZnJlc2g6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKCF0aGlzLl9lbWJlZGRlZClcblx0XHR7XG5cdFx0XHRhbGVydCgnZXJyb3I6IGBhbWlXZWJBcHAub25SZWZyZXNoKClgIG11c3QgYmUgb3ZlcmxvYWRlZCEnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU3RhcnRzIHRoZSBXZWIgYXBwbGljYXRpb25cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGxvZ29fdXJsLCBob21lX3VybCwgY29udGFjdF9lbWFpbCwgYWJvdXRfdXJsLCB0aGVtZV91cmwsIGxvY2tlcl91cmwsIHBhc3N3b3JkX2F1dGhlbnRpY2F0aW9uX2FsbG93ZWQsIGNlcnRpZmljYXRlX2F1dGhlbnRpY2F0aW9uX2FsbG93ZWQsIGNyZWF0ZV9hY2NvdW50X2FsbG93ZWQsIGNoYW5nZV9pbmZvX2FsbG93ZWQsIGNoYW5nZV9wYXNzd29yZF9hbGxvd2VkLCBjaGFuZ2VfY2VydGlmaWNhdGVfYWxsb3dlZClcblx0ICAqL1xuXG5cdHN0YXJ0OiBmdW5jdGlvbihzZXR0aW5ncylcblx0e1xuXHRcdHRoaXMuX2dsb2JhbERlZmVycmVkLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgW1xuXHRcdFx0XHRsb2dvVVJMLCBob21lVVJMLCBjb250YWN0RW1haWwsXG5cdFx0XHRcdGFib3V0VVJMLCB0aGVtZVVSTCwgbG9ja2VyVVJMLCBlbmRwb2ludFVSTCxcblx0XHRcdFx0cGFzc3dvcmRBdXRoZW50aWNhdGlvbkFsbG93ZWQsIGNlcnRpZmljYXRlQXV0aGVudGljYXRpb25BbGxvd2VkLFxuXHRcdFx0XHRjcmVhdGVBY2NvdW50QWxsb3dlZCwgY2hhbmdlSW5mb0FsbG93ZWQsIGNoYW5nZVBhc3N3b3JkQWxsb3dlZCwgY2hhbmdlQ2VydGlmaWNhdGVBbGxvd2VkXG5cdFx0XHRdID0gdGhpcy5zZXR1cChbXG5cdFx0XHRcdCdsb2dvX3VybCcsICdob21lX3VybCcsICdjb250YWN0X2VtYWlsJyxcblx0XHRcdFx0J2Fib3V0X3VybCcsICd0aGVtZV91cmwnLCAnbG9ja2VyX3VybCcsICdlbmRwb2ludF91cmwnLFxuXHRcdFx0XHQncGFzc3dvcmRfYXV0aGVudGljYXRpb25fYWxsb3dlZCcsICdjZXJ0aWZpY2F0ZV9hdXRoZW50aWNhdGlvbl9hbGxvd2VkJyxcblx0XHRcdFx0J2NyZWF0ZV9hY2NvdW50X2FsbG93ZWQnLCAnY2hhbmdlX2luZm9fYWxsb3dlZCcsICdjaGFuZ2VfcGFzc3dvcmRfYWxsb3dlZCcsICdjaGFuZ2VfY2VydGlmaWNhdGVfYWxsb3dlZCcsXG5cdFx0XHRdLCBbXG5cdFx0XHRcdHRoaXMub3JpZ2luVVJMXG5cdFx0XHRcdFx0KyAnL2ltYWdlcy9sb2dvLnBuZycsXG5cdFx0XHRcdHRoaXMud2ViQXBwVVJMLFxuXHRcdFx0XHQnYW1pQGxwc2MuaW4ycDMuZnInLFxuXHRcdFx0XHQnaHR0cDovL2Nlcm4uY2gvYW1pLycsXG5cdFx0XHRcdHRoaXMub3JpZ2luVVJMICsgJy90d2lnL0FNSS9UaGVtZS9ibHVlLnR3aWcnLFxuXHRcdFx0XHR0aGlzLm9yaWdpblVSTCArICcvdHdpZy9BTUkvRnJhZ21lbnQvbG9ja2VyLnR3aWcnLFxuXHRcdFx0XHR0aGlzLm9yaWdpblVSTCArICcvQU1JL0Zyb250RW5kJyxcblx0XHRcdFx0dHJ1ZSwgdHJ1ZSxcblx0XHRcdFx0dHJ1ZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSxcblx0XHRcdF0sIHNldHRpbmdzKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGFtaUNvbW1hbmQuZW5kcG9pbnQgPSBlbmRwb2ludFVSTDtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IChlKSA9PiB7XG5cblx0XHRcdFx0aWYoIXRoaXMuX2NhbkxlYXZlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgZiA9IGUgfHwgd2luZG93LmV2ZW50O1xuXG5cdFx0XHRcdFx0aWYoZilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRmLnJldHVyblZhbHVlID0gJ0NvbmZpcm0gdGhhdCB5b3Ugd2FudCB0byBsZWF2ZSB0aGlzIHBhZ2U/Jztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gJ0NvbmZpcm0gdGhhdCB5b3Ugd2FudCB0byBsZWF2ZSB0aGlzIHBhZ2U/Jztcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGNvbnRyb2xzVVJMID0gdGhpcy5vcmlnaW5VUkwgKyAnL2NvbnRyb2xzL0NPTlRST0xTLmpzb24nO1xuXG5cdFx0XHRjb25zdCBzdWJhcHBzVVJMID0gdGhpcy5vcmlnaW5VUkwgKyAnL3N1YmFwcHMvU1VCQVBQUy5qc29uJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQuYWpheCh7dXJsOiBjb250cm9sc1VSTCwgY2FjaGU6IGZhbHNlLCBjcm9zc0RvbWFpbjogdHJ1ZSwgZGF0YVR5cGU6ICdqc29uJ30pLnRoZW4oKGRhdGExKSA9PiB7XG5cblx0XHRcdFx0JC5hamF4KHt1cmw6IHN1YmFwcHNVUkwsIGNhY2hlOiBmYWxzZSwgY3Jvc3NEb21haW46IHRydWUsIGRhdGFUeXBlOiAnanNvbid9KS50aGVuKChkYXRhMikgPT4ge1xuXG5cdFx0XHRcdFx0Zm9yKGNvbnN0IG5hbWUgaW4gZGF0YTEpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2NvbnRyb2xzW25hbWUudG9Mb3dlckNhc2UoKV0gPSBkYXRhMVtuYW1lXTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IoY29uc3QgbmFtZSBpbiBkYXRhMikge1xuXHRcdFx0XHRcdFx0dGhpcy5fc3ViYXBwc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gZGF0YTJbbmFtZV07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoIXRoaXMuX2VtYmVkZGVkKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0XHRcdFx0XHRMT0dPX1VSTDogbG9nb1VSTCxcblx0XHRcdFx0XHRcdFx0SE9NRV9VUkw6IGhvbWVVUkwsXG5cdFx0XHRcdFx0XHRcdENPTlRBQ1RfRU1BSUw6IGNvbnRhY3RFbWFpbCxcblx0XHRcdFx0XHRcdFx0QUJPVVRfVVJMOiBhYm91dFVSTCxcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHQkLmFqYXgoe3VybDogdGhlbWVVUkwsIGNhY2hlOiB0cnVlLCBjcm9zc0RvbWFpbjogdHJ1ZSwgZGF0YVR5cGU6ICd0ZXh0J30pLnRoZW4oKGRhdGEzKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0JC5hamF4KHt1cmw6IGxvY2tlclVSTCwgY2FjaGU6IHRydWUsIGNyb3NzRG9tYWluOiB0cnVlLCBkYXRhVHlwZTogJ3RleHQnfSkudGhlbigoZGF0YTQpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdCQoJ2JvZHknKS5hcHBlbmQodGhpcy5mb3JtYXRUV0lHKGRhdGEzLCBkaWN0KSArIGRhdGE0KS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMubG9jaygpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRhbWlMb2dpbi5fc3RhcnQoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHBhc3N3b3JkQXV0aGVudGljYXRpb25BbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjZXJ0aWZpY2F0ZUF1dGhlbnRpY2F0aW9uQWxsb3dlZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y3JlYXRlQWNjb3VudEFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNoYW5nZUluZm9BbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjaGFuZ2VQYXNzd29yZEFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNoYW5nZUNlcnRpZmljYXRlQWxsb3dlZFxuXHRcdFx0XHRcdFx0XHRcdFx0KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnVubG9jaygpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5lcnJvcihtZXNzYWdlKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdGFsZXJ0KCdjb3VsZCBub3Qgb3BlbiBgJyArIGxvY2tlclVSTCArICdgLCBwbGVhc2UgcmVsb2FkIHRoZSBwYWdlLi4uJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRhbGVydCgnY291bGQgbm90IG9wZW4gYCcgKyB0aGVtZVVSTCArICdgLCBwbGVhc2UgcmVsb2FkIHRoZSBwYWdlLi4uJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRsZXQgZGF0YTMgPSAnJztcblxuXHRcdFx0XHRcdFx0aWYoJCgnI2FtaV9hbGVydF9jb250ZW50JykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdGRhdGEzICs9ICc8ZGl2IGlkPVwiYW1pX2FsZXJ0X2NvbnRlbnRcIj48L2Rpdj4nO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZigkKCcjYW1pX2xvZ2luX21lbnVfY29udGVudCcpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRkYXRhMyArPSAnPGRpdiBpZD1cImFtaV9sb2dpbl9tZW51X2NvbnRlbnRcIj48L2Rpdj4nO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0JC5hamF4KHt1cmw6IGxvY2tlclVSTCwgY2FjaGU6IHRydWUsIGNyb3NzRG9tYWluOiB0cnVlLCBkYXRhVHlwZTogJ3RleHQnfSkuZG9uZSgoZGF0YTQpID0+IHtcblxuXHRcdFx0XHRcdFx0XHQkKCdib2R5JykucHJlcGVuZChkYXRhMyArIGRhdGE0KS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHR0aGlzLmxvY2soKTtcblxuXHRcdFx0XHRcdFx0XHRcdGFtaUxvZ2luLl9zdGFydChcblx0XHRcdFx0XHRcdFx0XHRcdHBhc3N3b3JkQXV0aGVudGljYXRpb25BbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2VydGlmaWNhdGVBdXRoZW50aWNhdGlvbkFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRjcmVhdGVBY2NvdW50QWxsb3dlZCxcblx0XHRcdFx0XHRcdFx0XHRcdGNoYW5nZUluZm9BbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2hhbmdlUGFzc3dvcmRBbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2hhbmdlQ2VydGlmaWNhdGVBbGxvd2VkXG5cdFx0XHRcdFx0XHRcdFx0KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy51bmxvY2soKTtcblxuXHRcdFx0XHRcdFx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5lcnJvcihtZXNzYWdlKTtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdGFsZXJ0KCdjb3VsZCBub3Qgb3BlbiBgJyArIHN1YmFwcHNVUkwgKyAnYCwgcGxlYXNlIHJlbG9hZCB0aGUgcGFnZS4uLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9LCAoKSA9PiB7XG5cblx0XHRcdFx0YWxlcnQoJ2NvdWxkIG5vdCBvcGVuIGAnICsgY29udHJvbHNVUkwgKyAnYCwgcGxlYXNlIHJlbG9hZCB0aGUgcGFnZS4uLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFsZXJ0KG1lc3NhZ2UpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBDT05UUk9MUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgYSBjb250cm9sXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gY29udHJvbCB0aGUgYXJyYXkgb2YgY29udHJvbCBuYW1lXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZENvbnRyb2w6IGZ1bmN0aW9uKGNvbnRyb2wsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihjb250cm9sLmluZGV4T2YoJ2N0cmw6JykgPT09IDApXG5cdFx0e1xuXHRcdFx0Y29udHJvbCA9IGNvbnRyb2wuc3Vic3RyaW5nKDUpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGRlc2NyID0gdGhpcy5fY29udHJvbHNbY29udHJvbC50b0xvd2VyQ2FzZSgpXTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKGRlc2NyKVxuXHRcdHtcblx0XHRcdHRoaXMubG9hZFNjcmlwdHModGhpcy5vcmlnaW5VUkwgKyAnLycgKyBkZXNjci5maWxlKS50aGVuKChsb2FkZWQpID0+IHtcblxuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGNsYXp6ID0gd2luZG93W1xuXHRcdFx0XHRcdFx0ZGVzY3IuY2xhenpcblx0XHRcdFx0XHRdO1xuXG5cdFx0XHRcdFx0Y29uc3QgcHJvbWlzZSA9IGxvYWRlZFswXSA/IGNsYXp6LnByb3RvdHlwZS5vblJlYWR5LmFwcGx5KGNsYXp6LnByb3RvdHlwZSlcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgIDogLyotLS0tLS0tLS0tLS0tLS0tKi8gbnVsbCAvKi0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdF9hbWlfaW50ZXJuYWxfdGhlbihwcm9taXNlLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbLyotLS0tLS0tLS0tLS0tLS0tLS0tLSovIGNsYXp6IC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0qL10pO1xuXG5cdFx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBjb250cm9sIGAnICsgY29udHJvbCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoKG1lc3NhZ2UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIGNvbnRyb2wgYCcgKyBjb250cm9sICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIGNvbnRyb2wgYCcgKyBjb250cm9sICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGZpbmQgY29udHJvbCBgJyArIGNvbnRyb2wgKyAnYCddKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtwYXJlbnRdID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtvd25lcl0gPz8/XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gY29udHJvbCA/Pz9cblx0ICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjcmVhdGVDb250cm9sOiBmdW5jdGlvbihwYXJlbnQsIG93bmVyLCBjb250cm9sLCBwYXJhbXMsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmxvYWRDb250cm9sKGNvbnRyb2wsIHNldHRpbmdzKS5kb25lKChjb25zdHJ1Y3RvcikgPT4ge1xuXG5cdFx0XHRsZXQgaW5zdGFuY2UgPSBuZXcgY29uc3RydWN0b3IocGFyZW50LCBvd25lcik7XG5cblx0XHRcdF9hbWlfaW50ZXJuYWxfdGhlbihjb25zdHJ1Y3Rvci5wcm90b3R5cGUucmVuZGVyLmFwcGx5KGluc3RhbmNlLCBwYXJhbXMpLCBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2luc3RhbmNlXS5jb25jYXQoWy4uLmFyZ3VtZW50c10pKTtcblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbCBpbiBhIGNvbnRhaW5lclxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtwYXJlbnRdID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtvd25lcl0gPz8/XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gY29udHJvbCA/Pz9cblx0ICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtc1dpdGhvdXRTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBjb250cm9sU2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50U2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y3JlYXRlQ29udHJvbEluQm9keTogZnVuY3Rpb24ocGFyZW50LCBvd25lciwgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSB0aGlzLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRyeVxuXHRcdHtcblx0XHRcdGxldCBQQVJBTVMgPSBbXTtcblx0XHRcdGxldCBTRVRUSU5HUyA9IHt9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Zm9yKGxldCBrZXkgaW4gcGFyZW50U2V0dGluZ3MpIHtcblx0XHRcdFx0U0VUVElOR1Nba2V5XSA9IHBhcmVudFNldHRpbmdzW2tleV07XG5cdFx0XHR9XG5cblx0XHRcdGZvcihsZXQga2V5IGluIGNvbnRyb2xTZXR0aW5ncykge1xuXHRcdFx0XHRTRVRUSU5HU1trZXldID0gY29udHJvbFNldHRpbmdzW2tleV07XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQvLy8vLy8ucHVzaChzZWxlY3Rvcik7XG5cblx0XHRcdEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KFBBUkFNUywgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncyk7XG5cblx0XHRcdFBBUkFNUy5wdXNoKFNFVFRJTkdTKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRoaXMuY3JlYXRlQ29udHJvbChwYXJlbnQsIG93bmVyLCBjb250cm9sLCBQQVJBTVMpLmRvbmUoZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFsuLi5hcmd1bWVudHNdKTtcblxuXHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXHRcdGNhdGNoKG1lc3NhZ2UpXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbCBpbiBhIGNvbnRhaW5lclxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtwYXJlbnRdID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtvd25lcl0gPz8/XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gY29udHJvbCA/Pz9cblx0ICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtc1dpdGhvdXRTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBjb250cm9sU2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50U2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gaWNvbiA/Pz9cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0aXRsZSA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjcmVhdGVDb250cm9sSW5Db250YWluZXI6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIsIGNvbnRyb2wsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MsIGNvbnRyb2xTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIGljb24sIHRpdGxlLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0cGFyZW50LmFwcGVuZEl0ZW0oJzxpIGNsYXNzPVwiZmEgZmEtJyArIHRoaXMudGV4dFRvSHRtbChpY29uKSArICdcIj48L2k+ICcgKyB0aGlzLnRleHRUb0h0bWwodGl0bGUpKS5kb25lKChzZWxlY3RvcikgPT4ge1xuXG5cdFx0XHRcdGxldCBQQVJBTVMgPSBbXTtcblx0XHRcdFx0bGV0IFNFVFRJTkdTID0ge307XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRmb3IobGV0IGtleSBpbiBwYXJlbnRTZXR0aW5ncykge1xuXHRcdFx0XHRcdFNFVFRJTkdTW2tleV0gPSBwYXJlbnRTZXR0aW5nc1trZXldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yKGxldCBrZXkgaW4gY29udHJvbFNldHRpbmdzKSB7XG5cdFx0XHRcdFx0U0VUVElOR1Nba2V5XSA9IGNvbnRyb2xTZXR0aW5nc1trZXldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRQQVJBTVMucHVzaChzZWxlY3Rvcik7XG5cblx0XHRcdFx0QXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoUEFSQU1TLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzKTtcblxuXHRcdFx0XHRQQVJBTVMucHVzaChTRVRUSU5HUyk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHR0aGlzLmNyZWF0ZUNvbnRyb2wocGFyZW50LCBvd25lciwgY29udHJvbCwgUEFSQU1TKS5kb25lKGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFsuLi5hcmd1bWVudHNdKTtcblxuXHRcdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGNhdGNoKG1lc3NhZ2UpXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbCBpbiBhIGNvbnRhaW5lciBmcm9tIGEgV0VCIGxpbmtcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyZW50XSA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbb3duZXJdID8/P1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IGVsID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNyZWF0ZUNvbnRyb2xGcm9tV2ViTGluazogZnVuY3Rpb24ocGFyZW50LCBvd25lciwgZWwsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncylcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBkYXRhQ3RybCA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1jdHJsJykgPyBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY3RybCcpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXG5cdFx0bGV0IGRhdGFDdHJsTG9jYXRpb24gPSBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtY3RybC1sb2NhdGlvbicpID8gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWN0cmwtbG9jYXRpb24nKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGRhdGFQYXJhbXMgPSBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtcGFyYW1zJykgPyBKU09OLnBhcnNlKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wYXJhbXMnKSlcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdXG5cdFx0O1xuXG5cdFx0bGV0IGRhdGFTZXR0aW5ncyA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zZXR0aW5ncycpID8gSlNPTi5wYXJzZShlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2V0dGluZ3MnKSlcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB7fVxuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBkYXRhSWNvbiA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1pY29uJykgPyBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWNvbicpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdxdWVzdGlvbidcblx0XHQ7XG5cblx0XHRsZXQgZGF0YVRpdGxlID0gZWwuaGFzQXR0cmlidXRlKCdkYXRhLXRpdGxlJykgPyBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGl0bGUnKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdVbmtub3duJ1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMubG9jaygpO1xuXG5cdFx0LyoqLyBpZihkYXRhQ3RybExvY2F0aW9uID09PSAnYm9keScpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlQ29udHJvbEluQm9keShwYXJlbnQsIG93bmVyLCBkYXRhQ3RybCwgZGF0YVBhcmFtcywgZGF0YVNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMudW5sb2NrKCk7XG5cblx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHR0aGlzLmVycm9yKG1lc3NhZ2UpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVDb250cm9sSW5Db250YWluZXIocGFyZW50LCBvd25lciwgZGF0YUN0cmwsIGRhdGFQYXJhbXMsIGRhdGFTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIGRhdGFJY29uLCBkYXRhVGl0bGUsIHNldHRpbmdzKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLnVubG9jaygpO1xuXG5cdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5lcnJvcihtZXNzYWdlKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBTVUJBUFBTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRyaWdnZXJMb2dpbjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy5faXNSZWFkeSlcblx0XHR7XG5cdFx0XHRfYW1pX2ludGVybmFsX3RoZW4odGhpcy5fY3VycmVudFN1YkFwcEluc3RhbmNlLm9uTG9naW4odGhpcy5hcmdzWyd1c2VyZGF0YSddKSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRfYW1pX2ludGVybmFsX2Fsd2F5cyh0aGlzLm9uUmVmcmVzaCh0cnVlKSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdF9hbWlfaW50ZXJuYWxfYWx3YXlzKHRoaXMub25SZWZyZXNoKHRydWUpLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRyaWdnZXJMb2dvdXQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMuX2lzUmVhZHkpXG5cdFx0e1xuXHRcdFx0X2FtaV9pbnRlcm5hbF90aGVuKHRoaXMuX2N1cnJlbnRTdWJBcHBJbnN0YW5jZS5vbkxvZ291dCh0aGlzLmFyZ3NbJ3VzZXJkYXRhJ10pLCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdF9hbWlfaW50ZXJuYWxfYWx3YXlzKHRoaXMub25SZWZyZXNoKGZhbHNlKSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdF9hbWlfaW50ZXJuYWxfYWx3YXlzKHRoaXMub25SZWZyZXNoKGZhbHNlKSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZXNvbHZlKCk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIGEgc3ViYXBwXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3ViYXBwIHRoZSBzdWJhcHBcblx0ICAqIEBwYXJhbSB7P30gW3VzZXJkYXRhXSB0aGUgdXNlciBkYXRhXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZFN1YkFwcDogZnVuY3Rpb24oc3ViYXBwLCB1c2VyZGF0YSwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSB0aGlzLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMubG9jaygpO1xuXG5cdFx0cmVzdWx0LmFsd2F5cygoKSA9PiB7XG5cblx0XHRcdHRoaXMudW5sb2NrKCk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihzdWJhcHAuaW5kZXhPZignc3ViYXBwOicpID09PSAwKVxuXHRcdHtcblx0XHRcdHN1YmFwcCA9IHN1YmFwcC5zdWJzdHJpbmcoNyk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZGVzY3IgPSB0aGlzLl9zdWJhcHBzW3N1YmFwcC50b0xvd2VyQ2FzZSgpXTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKGRlc2NyKVxuXHRcdHtcblx0XHRcdHRoaXMubG9hZFNjcmlwdHModGhpcy5vcmlnaW5VUkwgKyAnLycgKyBkZXNjci5maWxlKS50aGVuKChsb2FkZWQpID0+IHtcblxuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuX2N1cnJlbnRTdWJBcHBJbnN0YW5jZS5vbkV4aXQodXNlcmRhdGEpO1xuXG5cdFx0XHRcdFx0Y29uc3QgaW5zdGFuY2UgPSB3aW5kb3dbZGVzY3IuaW5zdGFuY2VdO1xuXG5cdFx0XHRcdFx0dGhpcy5fY3VycmVudFN1YkFwcEluc3RhbmNlID0gaW5zdGFuY2U7XG5cblx0XHRcdFx0XHQvKiovXG5cblx0XHRcdFx0XHR0aGlzLmZpbGxCcmVhZGNydW1iKGRlc2NyLmJyZWFkY3J1bWIpO1xuXG5cdFx0XHRcdFx0Y29uc3QgcHJvbWlzZSA9IGxvYWRlZFswXSA/IGluc3RhbmNlLm9uUmVhZHkodXNlcmRhdGEpXG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICA6IC8qLS0tLS0tKi8gbnVsbCAvKi0tLS0tLSovXG5cdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0X2FtaV9pbnRlcm5hbF90aGVuKHByb21pc2UsICgpID0+IHtcblxuXHRcdFx0XHRcdFx0Y29uc3QgcHJvbWlzZSA9IGFtaUxvZ2luLmlzQXV0aGVudGljYXRlZCgpID8gdGhpcy50cmlnZ2VyTG9naW4oKVxuXHRcdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy50cmlnZ2VyTG9nb3V0KClcblx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdFx0cHJvbWlzZS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgWy8qLS0tLS0tLS0tLS0tLS0tLS0tKi8gaW5zdGFuY2UgLyotLS0tLS0tLS0tLS0tLS0tLS0qL10pO1xuXG5cdFx0XHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgc3ViYXBwIGAnICsgc3ViYXBwICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgc3ViYXBwIGAnICsgc3ViYXBwICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2gobWVzc2FnZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgc3ViYXBwIGAnICsgc3ViYXBwICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIHN1YmFwcCBgJyArIHN1YmFwcCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBmaW5kIHN1YmFwcCBgJyArIHN1YmFwcCArICdgJ10pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBMb2FkcyBhIHN1YmFwcCBieSBVUkxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBkZWZhdWx0U3ViQXBwIGlmICdhbWlXZWJBcHAuYXJnc1tcInN1YmFwcFwiXScgaXMgbnVsbCwgdGhlIGRlZmF1bHQgc3ViYXBwXG5cdCAgKiBAcGFyYW0gez99IFtkZWZhdWx0VXNlckRhdGFdIGlmICdhbWlXZWJBcHAuYXJnc1tcInVzZXJkYXRhXCJdJyBpcyBudWxsLCB0aGUgZGVmYXVsdCB1c2VyIGRhdGFcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRTdWJBcHBCeVVSTDogZnVuY3Rpb24oZGVmYXVsdFN1YkFwcCwgZGVmYXVsdFVzZXJEYXRhKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0aWYodGhpcy5hcmdzWyd2J10pXG5cdFx0e1xuXHRcdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdHZXRIYXNoSW5mbyAtaGFzaD1cIicgKyB0aGlzLnRleHRUb1N0cmluZyh0aGlzLmFyZ3NbJ3YnXSkgKyAnXCInKS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblxuXHRcdFx0fSkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRcdGxldCBqc29uO1xuXG5cdFx0XHRcdHRyeVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0anNvbiA9IEpTT04ucGFyc2UodGhpcy5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJqc29uXCJ9LiQnLCBkYXRhKVswXSB8fCAne30nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaChtZXNzYWdlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0anNvbiA9IHsvKiBFTVBUWSBKU09OICAgRU1QVFkgSlNPTiAgIEVNUFRZIEpTT04gICBFTVBUWSBKU09OICAgRU1QVFkgSlNPTiAqL307XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IHN1YmFwcCA9IGpzb25bJ3N1YmFwcCddIHx8IGRlZmF1bHRTdWJBcHA7XG5cdFx0XHRcdGNvbnN0IHVzZXJkYXRhID0ganNvblsndXNlcmRhdGEnXSB8fCBkZWZhdWx0VXNlckRhdGE7XG5cblx0XHRcdFx0dGhpcy5sb2FkU3ViQXBwKHN1YmFwcCwgdXNlcmRhdGEpLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0aWYoIWFtaVJvdXRlci5jaGVjaygpKVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IHN1YmFwcCA9IHRoaXMuYXJnc1snc3ViYXBwJ10gfHwgZGVmYXVsdFN1YkFwcDtcblx0XHRcdFx0Y29uc3QgdXNlcmRhdGEgPSB0aGlzLmFyZ3NbJ3VzZXJkYXRhJ10gfHwgZGVmYXVsdFVzZXJEYXRhO1xuXG5cdFx0XHRcdHRoaXMubG9hZFN1YkFwcChzdWJhcHAsIHVzZXJkYXRhKS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlKCk7XG5cblx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWkuSUNvbnRyb2wgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBBTUkgY29udHJvbCBpbnRlcmZhY2VcbiAqIEBpbnRlcmZhY2UgYW1pLklDb250cm9sXG4gKi9cblxuJEFNSUludGVyZmFjZSgnYW1pLklDb250cm9sJywgLyoqIEBsZW5kcyBhbWkuSUNvbnRyb2wgKi8ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUGF0Y2hlcyBhbiBIVE1MIGlkZW50aWZpZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBpZCB0aGUgdW5wYXRjaGVkIEhUTUwgaWRlbnRpZmllclxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIHBhdGNoZWQgSFRNTCBpZGVudGlmaWVyXG5cdCAgKi9cblxuXHRwYXRjaElkOiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBQdXRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdHJlcGxhY2VIVE1MOiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBQcmVwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgdGhlIHRhcmdldCBzZWxlY3RvclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgZnJhZ21lbnRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRwcmVwZW5kSFRNTDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXBwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgdGhlIHRhcmdldCBzZWxlY3RvclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgZnJhZ21lbnRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRhcHBlbmRIVE1MOiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDYWxsZWQgd2hlbiB0aGUgY29udHJvbCBpcyByZWFkeSB0byBydW5cblx0ICAqL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaS5JU3ViQXBwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIEFNSSBzdWItYXBwbGljYXRpb24gaW50ZXJmYWNlXG4gKiBAaW50ZXJmYWNlIGFtaS5JU3ViQXBwXG4gKi9cblxuJEFNSUludGVyZmFjZSgnYW1pLklTdWJBcHAnLCAvKiogQGxlbmRzIGFtaS5JU3ViQXBwICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENhbGxlZCB3aGVuIHRoZSBzdWItYXBwbGljYXRpb24gaXMgcmVhZHkgdG8gcnVuXG5cdCAgKiBAcGFyYW0gez99IHVzZXJkYXRhIHVzZXJkYXRhXG5cdCAgKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIGFib3V0IHRvIGV4aXRcblx0ICAqIEBwYXJhbSB7P30gdXNlcmRhdGEgdXNlcmRhdGFcblx0ICAqL1xuXG5cdG9uRXhpdDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2FsbGVkIHdoZW4gbG9nZ2luZyBpblxuXHQgICogQHBhcmFtIHs/fSB1c2VyZGF0YSB1c2VyZGF0YVxuXHQgICovXG5cblx0b25Mb2dpbjogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2FsbGVkIHdoZW4gbG9nZ2luZyBvdXRcblx0ICAqIEBwYXJhbSB7P30gdXNlcmRhdGEgdXNlcmRhdGFcblx0ICAqL1xuXG5cdG9uTG9nb3V0OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWkuQ29udHJvbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBiYXNpYyBBTUkgY29udHJvbFxuICogQGNsYXNzIGFtaS5Db250cm9sXG4gKiBAaW1wbGVtZW50cyB7YW1pLklDb250cm9sfVxuICovXG5cbiRBTUlDbGFzcygnYW1pLkNvbnRyb2wnLCAvKiogQGxlbmRzIGFtaS5Db250cm9sICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW1wbGVtZW50czogW2FtaS5JQ29udHJvbF0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkOiBmdW5jdGlvbigpXG5cdHtcblx0XHRhbWkuQ29udHJvbC5pbnN0YW5jZUNudCA9IDE7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24ocGFyZW50LCBvd25lcilcblx0e1xuXHRcdHRoaXMuX3BhcmVudCA9IHBhcmVudCB8fCB0aGlzO1xuXHRcdHRoaXMuX293bmVyID0gb3duZXIgfHwgdGhpcztcblxuXHRcdHRoaXMuaW5zdGFuY2VTdWZmaXggPSBhbWkuQ29udHJvbC5pbnN0YW5jZUNudCsrO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0UGFyZW50OiBmdW5jdGlvbihwYXJlbnQpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGFyZW50ID0gKHBhcmVudCB8fCB0aGlzKTtcblx0fSxcblxuXHRnZXRQYXJlbnQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wYXJlbnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRPd25lcjogZnVuY3Rpb24ob3duZXIpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fb3duZXIgPSAob3duZXIgfHwgdGhpcyk7XG5cdH0sXG5cblx0Z2V0T3duZXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9vd25lcjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldFNlbGVjdG9yOiBmdW5jdGlvbihzZWxlY3Rvcilcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zZWxlY3RvciA9IChzZWxlY3RvciB8fCAnJyk7XG5cdH0sXG5cblx0Z2V0U2VsZWN0b3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zZWxlY3Rvcjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhdGNoSWQ6IGZ1bmN0aW9uKGlkZW50aWZpZXIpXG5cdHtcblx0XHRyZXR1cm4gaWRlbnRpZmllciArICdfaW5zdGFuY2UnICsgdGhpcy5pbnN0YW5jZVN1ZmZpeDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlcGxhY2VIVE1MOiBmdW5jdGlvbihzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpXG5cdHtcblx0XHRpZighc2V0dGluZ3MpXG5cdFx0e1xuXHRcdFx0c2V0dGluZ3MgPSB7fTtcblx0XHR9XG5cblx0XHRzZXR0aW5ncy5zdWZmaXggPSB0aGlzLmluc3RhbmNlU3VmZml4O1xuXG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5yZXBsYWNlSFRNTChzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cHJlcGVuZEhUTUw6IGZ1bmN0aW9uKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncylcblx0e1xuXHRcdGlmKCFzZXR0aW5ncylcblx0XHR7XG5cdFx0XHRzZXR0aW5ncyA9IHt9O1xuXHRcdH1cblxuXHRcdHNldHRpbmdzLnN1ZmZpeCA9IHRoaXMuaW5zdGFuY2VTdWZmaXg7XG5cblx0XHRyZXR1cm4gYW1pV2ViQXBwLnByZXBlbmRIVE1MKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRhcHBlbmRIVE1MOiBmdW5jdGlvbihzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpXG5cdHtcblx0XHRpZighc2V0dGluZ3MpXG5cdFx0e1xuXHRcdFx0c2V0dGluZ3MgPSB7fTtcblx0XHR9XG5cblx0XHRzZXR0aW5ncy5zdWZmaXggPSB0aGlzLmluc3RhbmNlU3VmZml4O1xuXG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5hcHBlbmRIVE1MKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjcmVhdGVDb250cm9sOiBmdW5jdGlvbihwYXJlbnQsIGNvbnRyb2wsIHBhcmFtcywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2wocGFyZW50LCB0aGlzLCBjb250cm9sLCBwYXJhbXMsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNyZWF0ZUNvbnRyb2xJbkJvZHk6IGZ1bmN0aW9uKHBhcmVudCwgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2xJbkJvZHkocGFyZW50LCB0aGlzLCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjcmVhdGVDb250cm9sSW5Db250YWluZXI6IGZ1bmN0aW9uKHBhcmVudCwgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgaWNvbiwgdGl0bGUsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5jcmVhdGVDb250cm9sSW5Db250YWluZXIocGFyZW50LCB0aGlzLCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBpY29uLCB0aXRsZSwgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y3JlYXRlQ29udHJvbEZyb21XZWJMaW5rOiBmdW5jdGlvbihwYXJlbnQsIGVsLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2xGcm9tV2ViTGluayhwYXJlbnQsIHRoaXMsIGVsLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWkuU3ViQXBwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBiYXNpYyBBTUkgc3ViLWFwcGxpY2F0aW9uXG4gKiBAY2xhc3MgYW1pLlN1YkFwcFxuICogQGltcGxlbWVudHMge2FtaS5JU3ViQXBwfVxuICovXG5cbiRBTUlDbGFzcygnYW1pLlN1YkFwcCcsIC8qKiBAbGVuZHMgYW1pLlN1YkFwcCAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGltcGxlbWVudHM6IFthbWkuSVN1YkFwcF0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvbkV4aXQ6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvbkxvZ2luOiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25Mb2dvdXQ6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pQ29tbWFuZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgQU1JIGNvbW1hbmQgc3Vic3lzdGVtXG4gKiBAbmFtZXNwYWNlIGFtaUNvbW1hbmRcbiAqL1xuXG4kQU1JTmFtZXNwYWNlKCdhbWlDb21tYW5kJywgLyoqIEBsZW5kcyBhbWlDb21tYW5kICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIERlZmF1bHQgZW5kcG9pbnRcblx0ICAqIEB0eXBlIHtTdHJpbmd9XG5cdCAgKi9cblxuXHRlbmRwb2ludDogJ2h0dHA6Ly94eHl5Lnp6JyxcblxuXHQvKipcblx0ICAqIERlZmF1bHQgY29udmVydGVyXG5cdCAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICovXG5cblx0Y29udmVydGVyOiAnQU1JWG1sVG9Kc29uLnhzbCcsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FVEhPRFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEV4ZWN1dGVzIGFuIEFNSSBjb21tYW5kXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gY29tbWFuZCB0aGUgY29tbWFuZFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZW5kcG9pbnQsIGNvbnZlcnRlciwgdGltZW91dCwgZXh0cmFQYXJhbSwgZXh0cmFWYWx1ZSlcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGV4ZWN1dGU6IGZ1bmN0aW9uKGNvbW1hbmQsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2VuZHBvaW50LCBjb252ZXJ0ZXIsIGNvbnRleHQsIHRpbWVvdXQsIGV4dHJhUGFyYW0sIGV4dHJhVmFsdWVdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0WydlbmRwb2ludCcsICdjb252ZXJ0ZXInLCAnY29udGV4dCcsICd0aW1lb3V0JywgJ2V4dHJhUGFyYW0nLCAnZXh0cmFWYWx1ZSddLFxuXHRcdFx0W3RoaXMuZW5kcG9pbnQsIHRoaXMuY29udmVydGVyLCByZXN1bHQsIDIgKiA2MCAqIDEwMDAsIG51bGwsIG51bGxdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgVVJMID0gZW5kcG9pbnQudHJpbSgpO1xuXHRcdGNvbnN0IENPTU1BTkQgPSBjb21tYW5kLnRyaW0oKTtcblx0XHRjb25zdCBDT05WRVJURVIgPSBjb252ZXJ0ZXIudHJpbSgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZGF0YSA9IHtcblx0XHRcdENvbW1hbmQ6IENPTU1BTkQsXG5cdFx0XHRDb252ZXJ0ZXI6IENPTlZFUlRFUixcblx0XHR9O1xuXG5cdFx0aWYoZXh0cmFQYXJhbSlcblx0XHR7XG5cdFx0XHRkYXRhW2V4dHJhUGFyYW1dID0gZXh0cmFWYWx1ZSA/IGV4dHJhVmFsdWVcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKCgobnVsbCkpKVxuXHRcdFx0O1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVybFdpdGhQYXJhbWV0ZXJzID0gVVJMICsgJz8nICsgJC5wYXJhbShkYXRhKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKENPTlZFUlRFUiA9PT0gJ0FNSVhtbFRvSnNvbi54c2wnKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSlNPTiBGT1JNQVQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dXJsOiBVUkwsXG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0dGltZW91dDogdGltZW91dCxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0eGhyRmllbGRzOiB7XG5cdFx0XHRcdFx0d2l0aENyZWRlbnRpYWxzOiB0cnVlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG5cblx0XHRcdFx0XHRjb25zdCBpbmZvID0gSlNQYXRoLmFwcGx5KCcuQU1JTWVzc2FnZS5pbmZvLiQnLCBkYXRhKTtcblx0XHRcdFx0XHRjb25zdCBlcnJvciA9IEpTUGF0aC5hcHBseSgnLkFNSU1lc3NhZ2UuZXJyb3IuJCcsIGRhdGEpO1xuXG5cdFx0XHRcdFx0aWYoZXJyb3IubGVuZ3RoID09PSAwKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZGF0YSwgaW5mby5qb2luKCcuICcpLCB1cmxXaXRoUGFyYW1ldGVyc10pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGEsIGVycm9yLmpvaW4oJy4gJyksIHVybFdpdGhQYXJhbWV0ZXJzXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRlcnJvcjogKGpxWEhSLCB0ZXh0U3RhdHVzKSA9PiB7XG5cblx0XHRcdFx0XHRpZih0ZXh0U3RhdHVzID09PSAnZXJyb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRleHRTdGF0dXMgPSAnc2VydmljZSB0ZW1wb3JhcmlseSB1bnJlYWNoYWJsZSc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYodGV4dFN0YXR1cyA9PT0gJ3BhcnNlcmVycm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZXh0U3RhdHVzID0gJ3Jlc291cmNlIHRlbXBvcmFyaWx5IHVucmVhY2hhYmxlJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjb25zdCBkYXRhID0geydBTUlNZXNzYWdlJzogW3snZXJyb3InOiBbeyckJzogdGV4dFN0YXR1c31dfV19O1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGEsIHRleHRTdGF0dXMsIHVybFdpdGhQYXJhbWV0ZXJzXSk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogT1RIRVIgRk9STUFUUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dXJsOiBVUkwsXG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0dGltZW91dDogdGltZW91dCxcblx0XHRcdFx0ZGF0YVR5cGU6ICd0ZXh0Jyxcblx0XHRcdFx0eGhyRmllbGRzOiB7XG5cdFx0XHRcdFx0d2l0aENyZWRlbnRpYWxzOiB0cnVlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2RhdGEsIGRhdGEsIHVybFdpdGhQYXJhbWV0ZXJzXSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVycm9yOiAoanFYSFIsIHRleHRTdGF0dXMpID0+IHtcblxuXHRcdFx0XHRcdGlmKHRleHRTdGF0dXMgPT09ICdlcnJvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGV4dFN0YXR1cyA9ICdzZXJ2aWNlIHRlbXBvcmFyaWx5IHVucmVhY2hhYmxlJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbdGV4dFN0YXR1cywgdGV4dFN0YXR1cywgdXJsV2l0aFBhcmFtZXRlcnNdKTtcblx0XHRcdFx0fSxcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogTG9ncyBpbiBieSBsb2dpbi9wYXNzd29yZFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHVzZXIgdGhlIHVzZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBwYXNzIHRoZSBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdHBhc3NMb2dpbjogZnVuY3Rpb24odXNlciwgcGFzcywgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5leGVjdXRlKCdHZXRTZXNzaW9uSW5mbyAtQU1JVXNlcj1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHVzZXIpICsgJ1wiIC1BTUlQYXNzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcocGFzcykgKyAnXCInLCB7ZXh0cmFQYXJhbTogJ05vQ2VydCd9KS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGNvbnN0IHVzZXJJbmZvID0ge307XG5cdFx0XHRjb25zdCByb2xlSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3QgdWRwSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgc3NvSW5mbyA9IHt9XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJ1c2VyXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1c2VySW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwidWRwXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1ZHBJbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJzc29cIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHNzb0luZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInJvbGVcIn0ucm93JywgZGF0YSkuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0bGV0IG5hbWUgPSAnJztcblx0XHRcdFx0Y29uc3Qgcm9sZSA9IHt9O1xuXG5cdFx0XHRcdHJvdy5maWVsZC5mb3JFYWNoKChmaWVsZCkgPT4ge1xuXG5cdFx0XHRcdFx0cm9sZVtmaWVsZFsnQG5hbWUnXV0gPSBmaWVsZFsnJCddO1xuXG5cdFx0XHRcdFx0aWYoZmllbGRbJ0BuYW1lJ10gPT09ICduYW1lJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lID0gZmllbGRbJyQnXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJvbGVJbmZvW25hbWVdID0gcm9sZTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2RhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mb10pO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGEsIG1lc3NhZ2UsIHtBTUlVc2VyOiAnZ3Vlc3QnLCBndWVzdFVzZXI6ICdndWVzdCd9LCB7fSwge30sIHt9XSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogTG9ncyBpbiBieSBjZXJ0aWZpY2F0ZVxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNlcnRMb2dpbjogZnVuY3Rpb24oc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5leGVjdXRlKCdHZXRTZXNzaW9uSW5mbycpLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0Y29uc3QgdXNlckluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHJvbGVJbmZvID0ge307XG5cdFx0XHRjb25zdCB1ZHBJbmZvID0ge307XG5cdFx0XHRjb25zdCBzc29JbmZvID0ge307XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJ1c2VyXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1c2VySW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwidWRwXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1ZHBJbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJzc29cIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHNzb0luZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInJvbGVcIn0ucm93JywgZGF0YSkuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0bGV0IG5hbWUgPSAnJztcblx0XHRcdFx0Y29uc3Qgcm9sZSA9IHt9O1xuXG5cdFx0XHRcdHJvdy5maWVsZC5mb3JFYWNoKChmaWVsZCkgPT4ge1xuXG5cdFx0XHRcdFx0cm9sZVtmaWVsZFsnQG5hbWUnXV0gPSBmaWVsZFsnJCddO1xuXG5cdFx0XHRcdFx0aWYoZmllbGRbJ0BuYW1lJ10gPT09ICduYW1lJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lID0gZmllbGRbJyQnXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJvbGVJbmZvW25hbWVdID0gcm9sZTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2RhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mb10pO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGEsIG1lc3NhZ2UsIHtBTUlVc2VyOiAnZ3Vlc3QnLCBndWVzdFVzZXI6ICdndWVzdCd9LCB7fSwge30sIHt9XSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogTG9ncyBvdXRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2dvdXQ6IGZ1bmN0aW9uKHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuZXhlY3V0ZSgnR2V0U2Vzc2lvbkluZm8gLUFNSVVzZXI9XCJcIiAtQU1JUGFzcz1cIlwiJywge2V4dHJhUGFyYW06ICdOb0NlcnQnfSkudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRjb25zdCB1c2VySW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgcm9sZUluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHVkcEluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHNzb0luZm8gPSB7fVxuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwidXNlclwifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0dXNlckluZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInVkcFwifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0dWRwSW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwic3NvXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHRzc29JbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJyb2xlXCJ9LnJvdycsIGRhdGEpLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGxldCBuYW1lID0gJyc7XG5cdFx0XHRcdGNvbnN0IHJvbGUgPSB7fTtcblxuXHRcdFx0XHRyb3cuZmllbGQuZm9yRWFjaCgoZmllbGQpID0+IHtcblxuXHRcdFx0XHRcdHJvbGVbZmllbGRbJ0BuYW1lJ11dID0gZmllbGRbJyQnXTtcblxuXHRcdFx0XHRcdGlmKGZpZWxkWydAbmFtZSddID09PSAnbmFtZScpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZSA9IGZpZWxkWyckJ107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyb2xlSW5mb1tuYW1lXSA9IHJvbGU7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm9dKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFtkYXRhLCBtZXNzYWdlLCB7QU1JVXNlcjogJ2d1ZXN0JywgZ3Vlc3RVc2VyOiAnZ3Vlc3QnfSwge30sIHt9LCB7fV0pO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEF0dGFjaGVzIGEgY2VydGlmaWNhdGVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyIHRoZSB1c2VyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGFzcyB0aGUgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRhdHRhY2hDZXJ0OiBmdW5jdGlvbih1c2VyLCBwYXNzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGUoJ0dldFNlc3Npb25JbmZvIC1hdHRhY2hDZXJ0IC1hbWlMb2dpbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHVzZXIpICsgJ1wiIC1hbWlQYXNzd29yZD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHBhc3MpICsgJ1wiJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBEZXRhY2hlcyBhIGNlcnRpZmljYXRlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlciB0aGUgdXNlclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhc3MgdGhlIHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0ZGV0YWNoQ2VydDogZnVuY3Rpb24odXNlciwgcGFzcywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5leGVjdXRlKCdHZXRTZXNzaW9uSW5mbyAtZGV0YWNoQ2VydCAtYW1pTG9naW49XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh1c2VyKSArICdcIiAtYW1pUGFzc3dvcmQ9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwYXNzKSArICdcIicsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQWRkcyBhIG5ldyB1c2VyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlciB0aGUgdXNlclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhc3MgdGhlIHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gZmlyc3ROYW1lIHRoZSBmaXJzdCBuYW1lXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gbGFzdE5hbWUgdGhlIGxhc3QgbmFtZVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGVtYWlsIHRoZSBlbWFpbFxuXHQgICogQHBhcmFtIHtCb29sZWFufSBhdHRhY2ggYXR0YWNoIHRoZSBjdXJyZW50IGNlcnRpZmljYXRlXG5cdCAgKiBAcGFyYW0ge0Jvb2xlYW59IGFncmVlIGFncmVlIHdpdGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0YWRkVXNlcjogZnVuY3Rpb24odXNlciwgcGFzcywgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIGF0dGFjaCwgYWdyZWUsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZSgnQWRkVXNlciAtYW1pTG9naW49XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh1c2VyKSArICdcIiAtYW1pUGFzc3dvcmQ9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwYXNzKSArICdcIiAtZmlyc3ROYW1lPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZmlyc3ROYW1lKSArICdcIiAtbGFzdE5hbWU9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhsYXN0TmFtZSkgKyAnXCIgLWVtYWlsPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZW1haWwpICsgJ1wiJyArIChhdHRhY2ggPyAnIC1hdHRhY2gnIDogJycpICsgKGFncmVlID8gJyAtYWdyZWUnIDogJycpLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENoYW5nZXMgdGhlIGFjY291bnQgaW5mb3JtYXRpb25cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBmaXJzdE5hbWUgdGhlIGZpcnN0IG5hbWVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBsYXN0TmFtZSB0aGUgbGFzdCBuYW1lXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gZW1haWwgdGhlIGVtYWlsXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y2hhbmdlSW5mbzogZnVuY3Rpb24oZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZSgnU2V0VXNlckluZm8gLWZpcnN0TmFtZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGZpcnN0TmFtZSkgKyAnXCIgLWxhc3ROYW1lPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcobGFzdE5hbWUpICsgJ1wiIC1lbWFpbD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGVtYWlsKSArICdcIicsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hhbmdlcyB0aGUgYWNjb3VudCBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHVzZXIgdGhlIHVzZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRQYXNzIHRoZSBvbGQgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBuZXdQYXNzIHRoZSBuZXcgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjaGFuZ2VQYXNzOiBmdW5jdGlvbih1c2VyLCBvbGRQYXNzLCBuZXdQYXNzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGUoJ0NoYW5nZVBhc3N3b3JkIC1hbWlMb2dpbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHVzZXIpICsgJ1wiIC1hbWlQYXNzd29yZE9sZD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKG9sZFBhc3MpICsgJ1wiIC1hbWlQYXNzd29yZE5ldz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKG5ld1Bhc3MpICsgJ1wiJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBSZXNldHMgdGhlIGFjY291bnQgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyIHRoZSB1c2VyXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0cmVzZXRQYXNzOiBmdW5jdGlvbih1c2VyLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGUoJ1Jlc2V0UGFzc3dvcmQgLWFtaUxvZ2luPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodXNlcikgKyAnXCInLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pTG9naW4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgQU1JIGF1dGhlbnRpY2F0aW9uIHN1YnN5c3RlbVxuICogQG5hbWVzcGFjZSBhbWlMb2dpblxuICovXG5cbiRBTUlOYW1lc3BhY2UoJ2FtaUxvZ2luJywgLyoqIEBsZW5kcyBhbWlMb2dpbiAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBVQkxJQyBNRU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFzc3dvcmRBdXRoZW50aWNhdGlvbkFsbG93ZWQ6IHRydWUsXG5cdGNlcnRpZmljYXRlQXV0aGVudGljYXRpb25BbGxvd2VkOiB0cnVlLFxuXHRjcmVhdGVBY2NvdW50QWxsb3dlZDogdHJ1ZSxcblx0Y2hhbmdlSW5mb0FsbG93ZWQ6IHRydWUsXG5cdGNoYW5nZVBhc3N3b3JkQWxsb3dlZDogdHJ1ZSxcblx0Y2hhbmdlQ2VydGlmaWNhdGVBbGxvd2VkOiB0cnVlLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dXNlcjogJ2d1ZXN0Jyxcblx0Z3Vlc3Q6ICdndWVzdCcsXG5cblx0Y2xpZW50RE46ICcnLCAvLyBmYWlyZSBkaXNwYXJhaXRyZSBjZXMgdmFyaWFibGVzIGV0IGxlcyBnZXR0ZXJzXG5cdGlzc3VlckROOiAnJywgLy8gZmFpcmUgZGlzcGFyYWl0cmUgY2VzIHZhcmlhYmxlcyBldCBsZXMgZ2V0dGVyc1xuXG5cdG5vdEJlZm9yZTogJycsIC8vIGZhaXJlIGRpc3BhcmFpdHJlIGNlcyB2YXJpYWJsZXMgZXQgbGVzIGdldHRlcnNcblx0bm90QWZ0ZXI6ICcnLCAvLyBmYWlyZSBkaXNwYXJhaXRyZSBjZXMgdmFyaWFibGVzIGV0IGxlcyBnZXR0ZXJzXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR1c2VySW5mbzoge30sXG5cdHJvbGVJbmZvOiB7fSxcblx0dWRwSW5mbzoge30sXG5cdHNzb0luZm86IHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBSSVZBVEUgTUVUSE9EUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3N0YXJ0OiBmdW5jdGlvbihwYXNzd29yZEF1dGhlbnRpY2F0aW9uQWxsb3dlZCwgY2VydGlmaWNhdGVBdXRoZW50aWNhdGlvbkFsbG93ZWQsIGNyZWF0ZUFjY291bnRBbGxvd2VkLCBjaGFuZ2VJbmZvQWxsb3dlZCwgY2hhbmdlUGFzc3dvcmRBbGxvd2VkLCBjaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWQpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9hZFRXSUdzKFtcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL3R3aWcvQU1JL0ZyYWdtZW50L2xvZ2luX2J1dHRvbi50d2lnJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL3R3aWcvQU1JL0ZyYWdtZW50L2xvZ291dF9idXR0b24udHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy90d2lnL0FNSS9Nb2RhbC9sb2dpbi50d2lnJyxcblx0XHRdKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLmZyYWdtZW50TG9naW5CdXR0b24gPSBkYXRhWzBdO1xuXHRcdFx0dGhpcy5mcmFnbWVudExvZ291dEJ1dHRvbiA9IGRhdGFbMV07XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0XHRwYXNzd29yZEF1dGhlbnRpY2F0aW9uQWxsb3dlZDogdGhpcy5wYXNzd29yZEF1dGhlbnRpY2F0aW9uQWxsb3dlZCA9IHBhc3N3b3JkQXV0aGVudGljYXRpb25BbGxvd2VkLFxuXHRcdFx0XHRjZXJ0aWZpY2F0ZUF1dGhlbnRpY2F0aW9uQWxsb3dlZDogdGhpcy5jZXJ0aWZpY2F0ZUF1dGhlbnRpY2F0aW9uQWxsb3dlZCA9IGNlcnRpZmljYXRlQXV0aGVudGljYXRpb25BbGxvd2VkLFxuXHRcdFx0XHRjcmVhdGVBY2NvdW50QWxsb3dlZDogdGhpcy5jcmVhdGVBY2NvdW50QWxsb3dlZCA9IGNyZWF0ZUFjY291bnRBbGxvd2VkLFxuXHRcdFx0XHRjaGFuZ2VJbmZvQWxsb3dlZDogdGhpcy5jaGFuZ2VJbmZvQWxsb3dlZCA9IGNoYW5nZUluZm9BbGxvd2VkLFxuXHRcdFx0XHRjaGFuZ2VQYXNzd29yZEFsbG93ZWQ6IHRoaXMuY2hhbmdlUGFzc3dvcmRBbGxvd2VkID0gY2hhbmdlUGFzc3dvcmRBbGxvd2VkLFxuXHRcdFx0XHRjaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWQ6IHRoaXMuY2hhbmdlQ2VydGlmaWNhdGVBbGxvd2VkID0gY2hhbmdlQ2VydGlmaWNhdGVBbGxvd2VkLFxuXHRcdFx0fTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGFtaVdlYkFwcC5hcHBlbmRIVE1MKCdib2R5JywgZGF0YVsyXSwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdCQoJyNCNzg5NENDMV8xREFBXzRBN0VfQjdEMV9EQkRGNkYwNkFDNzMnKS5zdWJtaXQoKGUpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuZm9ybV9sb2dpbihlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnI0VFMDU1Q0Q0X0U1OEZfNDgzNF84MDIwXzk4NkFFM0Y4RDY3RCcpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5mb3JtX2FkZFVzZXIoZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdCQoJyNEQTIwNDdBMl85RTVEXzQyMERfQjZFN19GQTI2MUQyRUYxMEYnKS5zdWJtaXQoKGUpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuZm9ybV9yZW1pbmRQYXNzKGUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcjRDlFQUY5OThfRUQ4RV80NEQyX0EwQkVfOEM1Q0Y1RTQzOEJEJykuc3VibWl0KChlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmZvcm1fY2hhbmdlSW5mbyhlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnI0U5MkExMDk3Xzk4M0JfNDg1N184NzVGXzA3RTQ2NTlCNDFCMCcpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5mb3JtX2NoYW5nZVBhc3MoZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0U2RTMwRUVDXzE1RUVfNEZDRl85ODA5XzJCOEVDMkZFRjM4OCwjQ0NEOEU2RjFfNkRGOF80QkREX0EwRUNfQzNDMzgwODMwMTg3JykuY2hhbmdlKCgpID0+IHtcblxuXHRcdFx0XHRcdGNvbnN0IHBhc3MxID0gJCgnI0U2RTMwRUVDXzE1RUVfNEZDRl85ODA5XzJCOEVDMkZFRjM4OCcpLnZhbCgpO1xuXHRcdFx0XHRcdGNvbnN0IHBhc3MyID0gJCgnI0NDRDhFNkYxXzZERjhfNEJERF9BMEVDX0MzQzM4MDgzMDE4NycpLnZhbCgpO1xuXG5cdFx0XHRcdFx0JCgnI0NDRDhFNkYxXzZERjhfNEJERF9BMEVDX0MzQzM4MDgzMDE4NycpLmdldCgwKS5zZXRDdXN0b21WYWxpZGl0eShcblx0XHRcdFx0XHRcdHBhc3MxLmxlbmd0aCA+IDAgJiYgcGFzczIubGVuZ3RoID4gMCAmJiBwYXNzMSAhPT0gcGFzczIgPyAnUGFzc3dvcmRzIGRvblxcJ3QgbWF0Y2guJyA6ICcnXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnI0Q0ODdGRTcyXzhEOTVfNDA0OF9CRUEzXzI1MjI3NDg2MkFGNCwjRUUxREE1OENfMzc2MV80NzM0X0E5QzJfRTgwOENERDdFRTc3JykuY2hhbmdlKCgpID0+IHtcblxuXHRcdFx0XHRcdGNvbnN0IHBhc3MxID0gJCgnI0Q0ODdGRTcyXzhEOTVfNDA0OF9CRUEzXzI1MjI3NDg2MkFGNCcpLnZhbCgpO1xuXHRcdFx0XHRcdGNvbnN0IHBhc3MyID0gJCgnI0VFMURBNThDXzM3NjFfNDczNF9BOUMyX0U4MDhDREQ3RUU3NycpLnZhbCgpO1xuXG5cdFx0XHRcdFx0JCgnI0VFMURBNThDXzM3NjFfNDczNF9BOUMyX0U4MDhDREQ3RUU3NycpLmdldCgwKS5zZXRDdXN0b21WYWxpZGl0eShcblx0XHRcdFx0XHRcdHBhc3MxLmxlbmd0aCA+IDAgJiYgcGFzczIubGVuZ3RoID4gMCAmJiBwYXNzMSAhPT0gcGFzczIgPyAnUGFzc3dvcmRzIGRvblxcJ3QgbWF0Y2guJyA6ICcnXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZSkgPT4ge1xuXG5cdFx0XHRcdGlmKHRoaXMuc3NvSW5mby51cmwuc3RhcnRzV2l0aChlLm9yaWdpbikpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCB1c2VyID0gZS5kYXRhLnVzZXI7XG5cdFx0XHRcdFx0Y29uc3QgcGFzcyA9IGUuZGF0YS5wYXNzO1xuXG5cdFx0XHRcdFx0aWYodXNlciAmJiBwYXNzKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRoaXMuZm9ybV9sb2dpbjIodXNlciwgcGFzcyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZS5zb3VyY2UuY2xvc2UoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9LCBmYWxzZSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCB1c2VyZGF0YSA9IGFtaVdlYkFwcC5hcmdzWyd1c2VyZGF0YSddIHx8ICcnO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0c2V0SW50ZXJ2YWwoKCkgPT4ge1xuXG5cdFx0XHRcdGlmKGFtaVdlYkFwcC5faXNSZWFkeSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFtaUNvbW1hbmQuY2VydExvZ2luKCkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cblx0XHRcdFx0XHR9KS5kb25lKChkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pID0+IHtcblxuXHRcdFx0XHRcdFx0aWYoKHVzZXJJbmZvLkFNSVVzZXIgfHwgJycpID09PSAodXNlckluZm8uZ3Vlc3RVc2VyIHx8ICcnKSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fdXBkYXRlKHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSwgMzAgKiAxMDAwKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGFtaUNvbW1hbmQuY2VydExvZ2luKCkuZmFpbCgoZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5fdXBkYXRlKHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykuYWx3YXlzKCgvKi0tLSovKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSkuZG9uZSgoZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKSA9PiB7XG5cblx0XHRcdFx0X2FtaV9pbnRlcm5hbF90aGVuKGFtaVdlYkFwcC5vblJlYWR5KHVzZXJkYXRhKSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLl9pc1JlYWR5ID0gdHJ1ZTtcblxuXHRcdFx0XHRcdHRoaXMuX3VwZGF0ZSh1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pLnRoZW4oKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUobWVzc2FnZSk7XG5cblx0XHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuX2lzUmVhZHkgPSB0cnVlO1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9zdWNjZXNzOiBmdW5jdGlvbihtZXNzYWdlKVxuXHR7XG5cdFx0YW1pV2ViQXBwLnN1Y2Nlc3MobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblx0fSxcblxuXHRfZXJyb3I6IGZ1bmN0aW9uKG1lc3NhZ2UpXG5cdHtcblx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblx0fSxcblxuXHRfdW5sb2NrOiBmdW5jdGlvbigpXG5cdHtcblx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9jbGVhbjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0JCgnI0I3ODk0Q0MxXzFEQUFfNEE3RV9CN0QxX0RCREY2RjA2QUM3MycpLnRyaWdnZXIoJ3Jlc2V0Jyk7XG5cdFx0JCgnI0VFMDU1Q0Q0X0U1OEZfNDgzNF84MDIwXzk4NkFFM0Y4RDY3RCcpLnRyaWdnZXIoJ3Jlc2V0Jyk7XG5cdFx0JCgnI0RBMjA0N0EyXzlFNURfNDIwRF9CNkU3X0ZBMjYxRDJFRjEwRicpLnRyaWdnZXIoJ3Jlc2V0Jyk7XG5cdFx0JCgnI0U5MkExMDk3Xzk4M0JfNDg1N184NzVGXzA3RTQ2NTlCNDFCMCcpLnRyaWdnZXIoJ3Jlc2V0Jyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfdXBkYXRlOiBmdW5jdGlvbih1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1c2VyID0gdGhpcy51c2VyID0gdXNlckluZm8uQU1JVXNlciB8fCAnJztcblx0XHRjb25zdCBndWVzdCA9IHRoaXMuZ3Vlc3QgPSB1c2VySW5mby5ndWVzdFVzZXIgfHwgJyc7XG5cblx0XHRjb25zdCBub3RCZWZvcmUgPSB0aGlzLm5vdEJlZm9yZSA9IHVzZXJJbmZvLm5vdEJlZm9yZSB8fCAnJztcblx0XHRjb25zdCBub3RBZnRlciA9IHRoaXMubm90QWZ0ZXIgPSB1c2VySW5mby5ub3RBZnRlciB8fCAnJztcblxuXHRcdGNvbnN0IGNsaWVudEROSW5TZXNzaW9uID0gdGhpcy5jbGllbnRETiA9IHVzZXJJbmZvLmNsaWVudEROSW5TZXNzaW9uIHx8ICcnO1xuXHRcdGNvbnN0IGlzc3VlckROSW5TZXNzaW9uID0gdGhpcy5pc3N1ZXJETiA9IHVzZXJJbmZvLmlzc3VlckROSW5TZXNzaW9uIHx8ICcnO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0JCgnI0EwOUFFMzE2XzcwNjhfNEJDMV85NkE5XzZCODdEMjg4NjNGRScpLnByb3AoJ2Rpc2FibGVkJywgIWNsaWVudEROSW5TZXNzaW9uIHx8ICFpc3N1ZXJETkluU2Vzc2lvbik7XG5cblx0XHQkKCcjQzNFOTRGNkRfNDhFMF84NkMwXzM1MzRfNjkxNzI4RTQ5MkY0JykuYXR0cignc3JjJywgdWRwSW5mby50ZXJtc0FuZENvbmRpdGlvbnMgfHwgYW1pV2ViQXBwLm9yaWdpblVSTCArICcvZG9jcy90ZXJtc19hbmRfY29uZGl0aW9ucy5odG1sJyk7XG5cdFx0JCgnI0U1MEZGOEJEX0IwRjVfQ0Q3Ml9GOURDX0ZDMkJGQTVEQkEyNycpLmF0dHIoJ3NyYycsIHVkcEluZm8udGVybXNBbmRDb25kaXRpb25zIHx8IGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2RvY3MvdGVybXNfYW5kX2NvbmRpdGlvbnMuaHRtbCcpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy51c2VySW5mbyA9IHVzZXJJbmZvO1xuXHRcdHRoaXMucm9sZUluZm8gPSByb2xlSW5mbztcblx0XHR0aGlzLnVkcEluZm8gPSB1ZHBJbmZvO1xuXHRcdHRoaXMuc3NvSW5mbyA9IHNzb0luZm87XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0Y3JlYXRlQWNjb3VudEFsbG93ZWQ6IHRoaXMuY3JlYXRlQWNjb3VudEFsbG93ZWQsXG5cdFx0XHRjaGFuZ2VJbmZvQWxsb3dlZDogdGhpcy5jaGFuZ2VJbmZvQWxsb3dlZCxcblx0XHRcdGNoYW5nZVBhc3N3b3JkQWxsb3dlZDogdGhpcy5jaGFuZ2VQYXNzd29yZEFsbG93ZWQsXG5cdFx0XHRjaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWQ6IHRoaXMuY2hhbmdlQ2VydGlmaWNhdGVBbGxvd2VkLFxuXHRcdFx0LyoqL1xuXHRcdFx0c3NvX2xhYmVsOiBzc29JbmZvLmxhYmVsIHx8ICdTU08nLFxuXHRcdFx0c3NvX3VybDogc3NvSW5mby51cmwgfHwgJ0BOVUxMJyxcblx0XHR9O1xuXG5cdFx0aWYodXNlciAhPT0gZ3Vlc3QpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBHRVQgSU5GTyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCB2YWxpZCA9IHVzZXJJbmZvLnZhbGlkIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCBjZXJ0RW5hYmxlZCA9IHVzZXJJbmZvLmNlcnRFbmFibGVkIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCB2b21zRW5hYmxlZCA9IHVzZXJJbmZvLnZvbXNFbmFibGVkIHx8ICdmYWxzZSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBmaXJzdE5hbWUgPSB1c2VySW5mby5maXJzdE5hbWUgfHwgJyc7XG5cdFx0XHRjb25zdCBsYXN0TmFtZSA9IHVzZXJJbmZvLmxhc3ROYW1lIHx8ICcnO1xuXHRcdFx0Y29uc3QgZW1haWwgPSB1c2VySW5mby5lbWFpbCB8fCAnJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGNsaWVudEROSW5BTUkgPSB1c2VySW5mby5jbGllbnRETkluQU1JIHx8ICcnO1xuXHRcdFx0Y29uc3QgaXNzdWVyRE5JbkFNSSA9IHVzZXJJbmZvLmlzc3VlckROSW5BTUkgfHwgJyc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU0VUIElORk8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCgnI0U1MTNGMjdEXzU1MjFfNEIwOF9CRjYxXzUyQUZCODEzNTZGNycpLnZhbChmaXJzdE5hbWUpO1xuXHRcdFx0JCgnI0FGRjBCNUMwX0JFRUNfNDg0Ml85MTZEX0RDQkE3RjU4OTE5NScpLnZhbChsYXN0TmFtZSk7XG5cdFx0XHQkKCcjQzU4NzQ4NkJfNjJDMF80QjZFXzkyODhfRDhGOUY4OUQxNTdCJykudmFsKGVtYWlsKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQoJyNBQkVCMDI5MV80MEIwXzQxNEFfQTQyQl9FN0VBQkI5QjQ4N0UnKS52YWwoZmlyc3ROYW1lKTtcblx0XHRcdCQoJyNBNUFGREI2Ml8xMDM0XzRGNjZfQTNFNl85MzQxQjMxRkEyOTAnKS52YWwobGFzdE5hbWUpO1xuXHRcdFx0JCgnI0Q3MzBBNzc0XzA1RUFfNDdBQl9BMEM4X0Q5Mjc1MzgwMkUzRScpLnZhbChlbWFpbCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKCcjRDFCRUUzQkZfOTE2MV80MURDX0JDNTNfQzQ0RkZFNEQyNTIyJykudmFsKGNsaWVudEROSW5BTUkpO1xuXHRcdFx0JCgnI0M3NjgwNUQ3XzFFODZfNDIzMV85MDcxXzFEMDQ3ODM0MjNCQicpLnZhbChjbGllbnRETkluU2Vzc2lvbik7XG5cdFx0XHQkKCcjRjQyRkFGNkJfMkM4RF80MTQyXzhCRDlfRTVCQ0RDQUEwNUFBJykudmFsKGlzc3VlckROSW5BTUkpO1xuXHRcdFx0JCgnI0ZFMkY2MjMyX0MyNTZfNEI4MF85MzlDX0VCRUM5MDMyMDMwOCcpLnZhbChpc3N1ZXJETkluU2Vzc2lvbik7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsZXQgdGFibGUgPSBbXTtcblxuXHRcdFx0Zm9yKGxldCByb2xlIGluIHJvbGVJbmZvKVxuXHRcdFx0e1xuXHRcdFx0XHR0YWJsZS5wdXNoKCc8dHI+Jyk7XG5cdFx0XHRcdHRhYmxlLnB1c2goJzx0ZD4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwocm9sZUluZm9bcm9sZV0ubmFtZSB8fCAnTi9BJykgKyAnPC90ZD4nKTtcblx0XHRcdFx0dGFibGUucHVzaCgnPHRkPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChyb2xlSW5mb1tyb2xlXS5kZXNjcmlwdGlvbiB8fCAnTi9BJykgKyAnPC90ZD4nKTtcblx0XHRcdFx0dGFibGUucHVzaCgnPC90cj4nKTtcblx0XHRcdH1cblxuXHRcdFx0JCgnI0JCMDc2NzZCX0VBQ0FfOUI0Ml9FRDUxXzQ3N0RCMjk3NjA0MScpLmh0bWwodGFibGUuam9pbignJykpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIENIRUNLIFVTRVIgU1RBVFVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGxldCBpY29uID0gJyc7XG5cdFx0XHRsZXQgbWVzc2FnZSA9ICcnO1xuXG5cdFx0XHRpZih2YWxpZCAhPT0gJ2ZhbHNlJylcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogVkFMSUQgVVNFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihjZXJ0RW5hYmxlZCAhPT0gJ2ZhbHNlJyAmJiBjbGllbnRETkluQU1JICYmIGlzc3VlckROSW5BTUkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZighY2xpZW50RE5JblNlc3Npb25cblx0XHRcdFx0XHQgICB8fFxuXHRcdFx0XHRcdCAgICFpc3N1ZXJETkluU2Vzc2lvblxuXHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdG1lc3NhZ2UgPSAnSXQgaXMgcmVjb21tZW5kZWQgdG8gYXV0aGVudGljYXRlIHdpdGggYSBYLjUwOSBjZXJ0aWZpY2F0ZS4nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYoY2xpZW50RE5JbkFNSSAhPT0gY2xpZW50RE5JblNlc3Npb25cblx0XHRcdFx0XHRcdCAgIHx8XG5cdFx0XHRcdFx0XHQgICBpc3N1ZXJETkluQU1JICE9PSBpc3N1ZXJETkluU2Vzc2lvblxuXHRcdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0XHRtZXNzYWdlID0gJ1RoZSBYLjUwOSBjZXJ0aWZpY2F0ZSBpbiB0aGUgc2Vzc2lvbiBkaWZmZXJzIGZyb20gdGhlIG9uZSBpbiBBTUkuJztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKG1lc3NhZ2UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkKCcjRDk0NEIwMURfMkU4RF80RUU5XzlEQ0NfMjY5MTQzOEJCQTE2JykuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1pbmZvLWNpcmNsZSB0ZXh0LXdhcm5pbmdcIj48L2k+ICcgKyBtZXNzYWdlKTtcblxuXHRcdFx0XHRcdGljb24gPSAnPGEgY2xhc3M9XCJuYXYtbGluayB0ZXh0LXdhcm5pbmdcIiBocmVmPVwiamF2YXNjcmlwdDphbWlMb2dpbi5hY2NvdW50U3RhdHVzKCk7XCI+J1xuXHRcdFx0XHRcdCAgICAgICArXG5cdFx0XHRcdFx0ICAgICAgICc8aSBjbGFzcz1cImZhIGZhLWluZm8tY2lyY2xlXCI+PC9pPidcblx0XHRcdFx0XHQgICAgICAgK1xuXHRcdFx0XHRcdCAgICAgICAnPC9hPidcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdCQoJyNGM0ZGOUY0M19ERTcyXzQwQkJfQjFCQV9CN0IzQzkwMDI2NzEnKS5wYXJlbnQoKS5jc3MoJ2JhY2tncm91bmQnLCAnI0I4RDQ5QiB1cmwoXCInICsgYW1pV2ViQXBwLm9yaWdpblVSTCArICcvaW1hZ2VzL2NlcnRpZmljYXRlLWdyZWVuLnBuZ1wiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlcicpXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ2JhY2tncm91bmQtc2l6ZScsICdjb3ZlcicpXG5cdFx0XHRcdDtcblxuXHRcdFx0XHQkKCcjRjNGRjlGNDNfREU3Ml80MEJCX0IxQkFfQjdCM0M5MDAyNjcxJykuY3NzKCdjb2xvcicsICcjMDA2NDAwJylcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtbGVhZlwiPjwvaT4gdmFsaWQgPGkgY2xhc3M9XCJmYSBmYS1sZWFmXCI+PC9pPicpXG5cdFx0XHRcdDtcblxuXHRcdFx0XHQkKCcjRTkxMjgwRjZfRTdDNl8zRTUzX0E0NTdfNjQ2OTk1Qzk5MzE3JykudGV4dChub3RCZWZvcmUgKyAnIC0gJyArIG5vdEFmdGVyKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBJTlZBTElEIFVTRVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKHZvbXNFbmFibGVkICE9PSAnZmFsc2UnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoIWNsaWVudEROSW5BTUlcblx0XHRcdFx0XHQgICB8fFxuXHRcdFx0XHRcdCAgICFpc3N1ZXJETkluQU1JXG5cdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0bWVzc2FnZSA9ICdSZWdpc3RlciBhIHZhbGlkIFguNTA5IGNlcnRpZmljYXRlLic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRtZXNzYWdlID0gJ0NoZWNrIHlvdXIgdmlydHVhbCBvcmdhbml6YXRpb24gcm9sZXMuJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bWVzc2FnZSA9ICdVbmV4cGVjdGVkIGlzc3VlLCBjb250YWN0IHRoZSBBTUkgdGVhbS4nO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihtZXNzYWdlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgnI0Q5NDRCMDFEXzJFOERfNEVFOV85RENDXzI2OTE0MzhCQkExNicpLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGUgdGV4dC1kYW5nZXJcIj48L2k+ICcgKyBtZXNzYWdlKTtcblxuXHRcdFx0XHRcdGljb24gPSAnPGEgY2xhc3M9XCJuYXYtbGluayB0ZXh0LWRhbmdlclwiIGhyZWY9XCJqYXZhc2NyaXB0OmFtaUxvZ2luLmFjY291bnRTdGF0dXMoKTtcIj4nXG5cdFx0XHRcdFx0ICAgICAgICtcblx0XHRcdFx0XHQgICAgICAgJzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGVcIj48L2k+J1xuXHRcdFx0XHRcdCAgICAgICArXG5cdFx0XHRcdFx0ICAgICAgICc8L2E+J1xuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0YzRkY5RjQzX0RFNzJfNDBCQl9CMUJBX0I3QjNDOTAwMjY3MScpLnBhcmVudCgpLmNzcygnYmFja2dyb3VuZCcsICcjRThDOENGIHVybChcIicgKyBhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9pbWFnZXMvY2VydGlmaWNhdGUtcGluay5wbmdcIikgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXInKVxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCdiYWNrZ3JvdW5kLXNpemUnLCAnY292ZXInKVxuXHRcdFx0XHQ7XG5cblx0XHRcdFx0JCgnI0YzRkY5RjQzX0RFNzJfNDBCQl9CMUJBX0I3QjNDOTAwMjY3MScpLmNzcygnY29sb3InLCAnIzhCMDAwMCcpXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5odG1sKCc8aSBjbGFzcz1cImZhIGZhLWxlYWZcIj48L2k+IGludmFsaWQgPGkgY2xhc3M9XCJmYSBmYS1sZWFmXCI+PC9pPicpXG5cdFx0XHRcdDtcblxuXHRcdFx0XHQkKCcjRTkxMjgwRjZfRTdDNl8zRTUzX0E0NTdfNjQ2OTk1Qzk5MzE3JykudGV4dChub3RCZWZvcmUgKyAnIC0gJyArIG5vdEFmdGVyKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFVQREFURSBNRU5VIEJBUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGRpY3RbJ3VzZXInXSA9IHVzZXI7XG5cdFx0XHRkaWN0WydpY29uJ10gPSBpY29uO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX2xvZ2luX21lbnVfY29udGVudCcsIHRoaXMuZnJhZ21lbnRMb2dvdXRCdXR0b24sIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnRyaWdnZXJMb2dpbigpLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX2xvZ2luX21lbnVfY29udGVudCcsIHRoaXMuZnJhZ21lbnRMb2dpbkJ1dHRvbiwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudHJpZ2dlckxvZ291dCgpLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FVEhPRFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIHVzZXIgaW5mb3JtYXRpb25cblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBjdXJyZW50IHVzZXIgaW5mb3JtYXRpb25cblx0ICAqL1xuXG5cdGdldFVzZXJJbmZvOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy51c2VySW5mbztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgcm9sZSBpbmZvcm1hdGlvblxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGN1cnJlbnQgcm9sZSBpbmZvcm1hdGlvblxuXHQgICovXG5cblx0Z2V0Um9sZUluZm86IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnJvbGVJbmZvO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSB1c2VyIGRhdGEgcHJvdGVjdGlvbiBpbmZvcm1hdGlvblxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGN1cnJlbnQgdXNlciBkYXRhIHByb3RlY3Rpb24gaW5mb3JtYXRpb25cblx0ICAqL1xuXG5cdGdldFVQREluZm86IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnVkcEluZm87XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIHNpbmdsZSBzaWduIG9uIGluZm9ybWF0aW9uXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgY3VycmVudCBzaW5nbGUgc2lnbiBvbiBpbmZvcm1hdGlvblxuXHQgICovXG5cblx0Z2V0U1NPSW5mbzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuc3NvSW5mbztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgY3VycmVudCB1c2VyXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgY3VycmVudCB1c2VyXG5cdCAgKi9cblxuXHRnZXRVc2VyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy51c2VyO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBndWVzdCB1c2VyXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZ3Vlc3QgdXNlclxuXHQgICovXG5cblx0Z2V0R3Vlc3Q6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmd1ZXN0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBjbGllbnQgRE5cblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBjbGllbnQgRE5cblx0ICAqL1xuXG5cdGdldENsaWVudEROOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5jbGllbnRETjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgaXNzdWVyIEROXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgaXNzdWVyIEROXG5cdCAgKi9cblxuXHRnZXRJc3N1ZXJETjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNzdWVyRE47XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENoZWNrcyB3aGV0aGVyIHRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWRcblx0ICAqIEByZXR1cm5zIHtCb29sZWFufVxuXHQgICovXG5cblx0aXNBdXRoZW50aWNhdGVkOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy51c2VyICE9PSB0aGlzLmd1ZXN0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDaGVja3Mgd2hldGhlciB0aGUgdXNlciBoYXMgdGhlIGdpdmVuIHJvbGVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSByb2xlIHRoZSByb2xlXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGhhc1JvbGU6IGZ1bmN0aW9uKHJvbGVOYW1lKVxuXHR7XG5cdFx0cmV0dXJuIHJvbGVOYW1lIGluIHRoaXMucm9sZUluZm87XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnU1NPJyBtb2RhbCB3aW5kb3dcblx0ICAqL1xuXG5cdHNzbzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblxuXHRcdHdpbmRvdy5vcGVuKHRoaXMuc3NvSW5mby51cmwsICdTaW5nbGUgU2lnbi1PbicsICdtZW51YmFyPW5vLCBzdGF0dXM9bm8sIHNjcm9sbGJhcnM9bm8sIHdpZHRoPTgwMCwgaGVpZ2h0PTQ1MCcpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBPcGVucyB0aGUgJ1NpZ25JbicgbW9kYWwgd2luZG93XG5cdCAgKi9cblxuXHRzaWduSW46IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuX2NsZWFuKCk7XG5cblx0XHQkKCcjRDJCNUZBREVfOTdBM180QjhDXzg1NjFfN0E5QUVBQ0RCRTVCJykubW9kYWwoJ3Nob3cnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogT3BlbnMgdGhlICdDaGFuZ2UgSW5mbycgbW9kYWwgd2luZG93XG5cdCAgKi9cblxuXHRjaGFuZ2VJbmZvOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jbGVhbigpO1xuXG5cdFx0JCgnI0Q5RUFGOTk4X0VEOEVfNDREMl9BMEJFXzhDNUNGNUU0MzhCRCcpLm1vZGFsKCdzaG93Jyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnQ2hhbmdlIFBhc3N3b3JkJyBtb2RhbCB3aW5kb3dcblx0ICAqL1xuXG5cdGNoYW5nZVBhc3M6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuX2NsZWFuKCk7XG5cblx0XHQkKCcjRTkyQTEwOTdfOTgzQl80ODU3Xzg3NUZfMDdFNDY1OUI0MUIwJykubW9kYWwoJ3Nob3cnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogT3BlbnMgdGhlICdBY2NvdW50IFN0YXR1cycgbW9kYWwgd2luZG93XG5cdCAgKi9cblxuXHRhY2NvdW50U3RhdHVzOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jbGVhbigpO1xuXG5cdFx0JCgnI0FCMUNCMTgzXzk2RUJfNDExNl84QTlFXzQ0MDlCRTA1OEYzNCcpLm1vZGFsKCdzaG93Jyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFNpZ25zIG91dFxuXHQgICovXG5cblx0c2lnbk91dDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdHJldHVybiBhbWlDb21tYW5kLmxvZ291dCgpLmFsd2F5cygoZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKSA9PiB7XG5cblx0XHRcdHRoaXMuX3VwZGF0ZSh1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuX3VubG9jaygpO1xuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2xvZ2luOiBmdW5jdGlvbihlKVxuXHR7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gJChlLnRhcmdldCkuc2VyaWFsaXplT2JqZWN0KCk7XG5cblx0XHRyZXR1cm4gdGhpcy5mb3JtX2xvZ2luMih2YWx1ZXNbJ3VzZXInXSwgdmFsdWVzWydwYXNzJ10pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9sb2dpbjI6IGZ1bmN0aW9uKHVzZXIsIHBhc3MpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBwcm9taXNlID0gKHVzZXIgJiYgcGFzcykgPyBhbWlDb21tYW5kLnBhc3NMb2dpbih1c2VyLnRyaW0oKSwgcGFzcy50cmltKCkpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYW1pQ29tbWFuZC5jZXJ0TG9naW4oLyotLS0tLS0tLS0tLS0tLS0tLS0tLSovKVxuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRwcm9taXNlLnRoZW4oKGRhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykgPT4ge1xuXG5cdFx0XHR0aGlzLl91cGRhdGUodXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRpZih1c2VySW5mby5BTUlVc2VyICE9PSB1c2VySW5mby5ndWVzdFVzZXIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkKCcjRDJCNUZBREVfOTdBM180QjhDXzg1NjFfN0E5QUVBQ0RCRTVCJykubW9kYWwoJ2hpZGUnKTtcblxuXHRcdFx0XHRcdHRoaXMuX3VubG9jaygpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0aWYodXNlckluZm8uQU1JVXNlciAhPT0gdXNlckluZm8uZ3Vlc3RVc2VyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgnI0QyQjVGQURFXzk3QTNfNEI4Q184NTYxXzdBOUFFQUNEQkU1QicpLm1vZGFsKCdoaWRlJyk7XG5cblx0XHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmKHVzZXJJbmZvLkFNSVVzZXIgPT09IHVzZXJJbmZvLmd1ZXN0VXNlcilcblx0XHRcdHtcblx0XHRcdFx0bGV0IG1lc3NhZ2UgPSAnQXV0aGVudGljYXRpb24gZmFpbGVkLic7XG5cblx0XHRcdFx0aWYodXNlckluZm8uY2xpZW50RE5JblNlc3Npb24gfHwgdXNlckluZm8uaXNzdWVyRE5JblNlc3Npb24pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtZXNzYWdlICs9ICcgQ2xpZW50IEROIGluIHNlc3Npb246ICcgKyBhbWlXZWJBcHAudGV4dFRvSHRtbCh1c2VySW5mby5jbGllbnRETkluU2Vzc2lvbikgKyAnLidcblx0XHRcdFx0XHQgICAgICAgICAgICtcblx0XHRcdFx0XHQgICAgICAgICAgICcgSXNzdWVyIEROIGluIHNlc3Npb246ICcgKyBhbWlXZWJBcHAudGV4dFRvSHRtbCh1c2VySW5mby5pc3N1ZXJETkluU2Vzc2lvbikgKyAnLidcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdH1cblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pID0+IHtcblxuXHRcdFx0dGhpcy5fdXBkYXRlKHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykuYWx3YXlzKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9hdHRhY2hDZXJ0OiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1c2VyID0gJCgnI0U2NEYyNEIyXzMzRTZfNERFRF85QjI0XzI4QkUwNDIxOTYxMycpLnZhbCgpO1xuXHRcdGNvbnN0IHBhc3MgPSAkKCcjQTRERkQwMzlfMDM0Rl80RDEwXzk2NjhfMzg1QUVGNEZCQkI5JykudmFsKCk7XG5cblx0XHRpZighdXNlciB8fCAhcGFzcylcblx0XHR7XG5cdFx0XHR0aGlzLl9lcnJvcignUGxlYXNlLCBmaWxsIGFsbCBmaWVsZHMgd2l0aCBhIHJlZCBzdGFyLicpO1xuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdGFtaUNvbW1hbmQuYXR0YWNoQ2VydCh1c2VyLCBwYXNzKS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX3N1Y2Nlc3MobWVzc2FnZSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fZGV0YWNoQ2VydDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdXNlciA9ICQoJyNFNjRGMjRCMl8zM0U2XzRERURfOUIyNF8yOEJFMDQyMTk2MTMnKS52YWwoKTtcblx0XHRjb25zdCBwYXNzID0gJCgnI0E0REZEMDM5XzAzNEZfNEQxMF85NjY4XzM4NUFFRjRGQkJCOScpLnZhbCgpO1xuXG5cdFx0aWYoIXVzZXIgfHwgIXBhc3MpXG5cdFx0e1xuXHRcdFx0dGhpcy5fZXJyb3IoJ1BsZWFzZSwgZmlsbCBhbGwgZmllbGRzIHdpdGggYSByZWQgc3Rhci4nKTtcblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmRldGFjaENlcnQodXNlciwgcGFzcykudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2FkZFVzZXI6IGZ1bmN0aW9uKGUpXG5cdHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB2YWx1ZXMgPSAkKGUudGFyZ2V0KS5zZXJpYWxpemVPYmplY3QoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmFkZFVzZXIodmFsdWVzWydsb2dpbiddLCB2YWx1ZXNbJ3Bhc3MnXSwgdmFsdWVzWydmaXJzdF9uYW1lJ10sIHZhbHVlc1snbGFzdF9uYW1lJ10sIHZhbHVlc1snZW1haWwnXSwgJ2F0dGFjaCcgaW4gdmFsdWVzLCAnYWdyZWUnIGluIHZhbHVlcykudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX3JlbWluZFBhc3M6IGZ1bmN0aW9uKGUpXG5cdHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB2YWx1ZXMgPSAkKGUudGFyZ2V0KS5zZXJpYWxpemVPYmplY3QoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLnJlc2V0UGFzcyh2YWx1ZXNbJ3VzZXInXSkudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2NoYW5nZUluZm86IGZ1bmN0aW9uKGUpXG5cdHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB2YWx1ZXMgPSAkKGUudGFyZ2V0KS5zZXJpYWxpemVPYmplY3QoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmNoYW5nZUluZm8odmFsdWVzWydmaXJzdF9uYW1lJ10sIHZhbHVlc1snbGFzdF9uYW1lJ10sIHZhbHVlc1snZW1haWwnXSkudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2NoYW5nZVBhc3M6IGZ1bmN0aW9uKGUpXG5cdHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB2YWx1ZXMgPSAkKGUudGFyZ2V0KS5zZXJpYWxpemVPYmplY3QoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmNoYW5nZVBhc3ModGhpcy51c2VyLCB2YWx1ZXNbJ29sZF9wYXNzJ10sIHZhbHVlc1snbmV3X3Bhc3MnXSkudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qIVxuICogQU1JIFdlYiBGcmFtZXdvcmsgLSBBTUlEb2MuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAyMCBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qIGVzbGludC1kaXNhYmxlICovXG5cbnZhciBhbWlEb2MgPSB7XCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwiJEFNSU5hbWVzcGFjZVwiLFwiZGVzY1wiOlwiQ3JlYXRlIGEgbmV3IG5hbWVzcGFjZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIiRuYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBuYW1lc3BhY2UgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIiRkZXNjclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgbmFtZXNwYWNlIGJvZHlcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIiRBTUlJbnRlcmZhY2VcIixcImRlc2NcIjpcIkNyZWF0ZSBhIG5ldyBpbnRlcmZhY2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCIkbmFtZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgaW50ZXJmYWNlIG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCIkZGVzY3JcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIGludGVyZmFjZSBib2R5XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCIkQU1JQ2xhc3NcIixcImRlc2NcIjpcIkNyZWF0ZSBhIG5ldyBjbGFzc1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIiRuYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBjbGFzcyBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiJGRlc2NyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBjbGFzcyBib2R5XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfV0sXCJuYW1lc3BhY2VzXCI6W3tcIm5hbWVcIjpcImFtaVJvdXRlclwiLFwiZGVzY1wiOlwiVGhlIEFNSSB1cmwgcm91dGluZyBzdWJzeXN0ZW1cIixcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJnZXRTY3JpcHRVUkxcIixcImRlc2NcIjpcIkdldHMgdGhlIEFXRidzIHNjcmlwdCBVUkxcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBBV0YncyBzY3JpcHQgVVJMXCJ9XX0se1wibmFtZVwiOlwiZ2V0T3JpZ2luVVJMXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBvcmlnaW4gVVJMXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgb3JpZ2luIFVSTFwifV19LHtcIm5hbWVcIjpcImdldFdlYkFwcFVSTFwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgd2ViYXBwIFVSTFwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHdlYmFwcCBVUkxcIn1dfSx7XCJuYW1lXCI6XCJnZXRIYXNoXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBhbmNob3IgcGFydCBvZiB0aGUgd2ViYXBwIFVSTFwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGFuY2hvciBwYXJ0IG9mIHRoZSB3ZWJhcHAgVVJMXCJ9XX0se1wibmFtZVwiOlwiZ2V0QXJnc1wiLFwiZGVzY1wiOlwiR2V0cyB0aGUgYXJndW1lbnRzIGV4dHJhY3RlZCBmcm9tIHRoZSB3ZWJhcHAgVVJMXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQXJyYXkuPFN0cmluZz5cIixcImRlc2NcIjpcIlRoZSBhcmd1bWVudHMgZXh0cmFjdGVkIGZyb20gdGhlIHdlYmFwcCBVUkxcIn1dfSx7XCJuYW1lXCI6XCJhcHBlbmRcIixcImRlc2NcIjpcIkFwcGVuZHMgYSByb3V0aW5nIHJ1bGVcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJyZWdFeHBcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHJlZ0V4cFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImhhbmRsZXJcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIGhhbmRsZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIk5hbWVzcGFjZVwiLFwiZGVzY1wiOlwiVGhlIGFtaVJvdXRlciBzaW5nbGV0b25cIn1dfSx7XCJuYW1lXCI6XCJyZW1vdmVcIixcImRlc2NcIjpcIlJlbW92ZXMgc29tZSByb3V0aW5nIHJ1bGVzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicmVnRXhwXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSByZWdFeHBcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIk5hbWVzcGFjZVwiLFwiZGVzY1wiOlwiVGhlIGFtaVJvdXRlciBzaW5nbGV0b25cIn1dfSx7XCJuYW1lXCI6XCJjaGVja1wiLFwiZGVzY1wiOlwiQ2hlY2tzIHdoZXRoZXIgdGhlIFVSTCBtYXRjaGVzIHdpdGggYSByb3V0aW5nIHJ1bGVcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJhcHBlbmRIaXN0b3J5RW50cnlcIixcImRlc2NcIjpcIkFwcGVuZCBhIG5ldyBoaXN0b3J5IGVudHJ5XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGF0aFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgbmV3IHBhdGhcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250ZXh0XCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBuZXcgY29udGV4dFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX0se1wibmFtZVwiOlwicmVwbGFjZUhpc3RvcnlFbnRyeVwiLFwiZGVzY1wiOlwiUmVwbGFjZSB0aGUgY3VycmVudCBoaXN0b3J5IGVudHJ5XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGF0aFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgbmV3IHBhdGhcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250ZXh0XCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBuZXcgY29udGV4dFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX1dfSx7XCJuYW1lXCI6XCJhbWlXZWJBcHBcIixcImRlc2NcIjpcIlRoZSBBTUkgd2ViYXBwIHN1YnN5c3RlbVwiLFwidmFyaWFibGVzXCI6W3tcIm5hbWVcIjpcIm9yaWdpblVSTFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgb3JpZ2luIFVSTFwifSx7XCJuYW1lXCI6XCJ3ZWJBcHBVUkxcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHdlYmFwcCBVUkxcIn0se1wibmFtZVwiOlwiaGFzaFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgYW5jaG9yIHBhcnQgb2YgdGhlIHdlYmFwcCBVUkxcIn0se1wibmFtZVwiOlwiYXJnc1wiLFwidHlwZVwiOlwiQXJyYXkuPFN0cmluZz5cIixcImRlc2NcIjpcIlRoZSBhcmd1bWVudHMgZXh0cmFjdGVkIGZyb20gdGhlIHdlYmFwcCBVUkxcIn1dLFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcImlzRW1iZWRkZWRcIixcImRlc2NcIjpcIkNoZWNrcyB3aGV0aGVyIHRoZSBXZWJBcHAgaXMgZXhlY3V0ZWQgaW4gZW1iZWRkZWQgbW9kZVwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19LHtcIm5hbWVcIjpcImlzTG9jYWxcIixcImRlc2NcIjpcIkNoZWNrcyB3aGV0aGVyIHRoZSBXZWJBcHAgaXMgZXhlY3V0ZWQgbG9jYWxseSAoZmlsZTovLywgbG9jYWxob3N0LCAxMjcuMC4wLjEgb3IgOjoxKVwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19LHtcIm5hbWVcIjpcInRleHRUb0h0bWxcIixcImRlc2NcIjpcIkVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIHRleHQgdG8gSFRNTFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdW5lc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJodG1sVG9UZXh0XCIsXCJkZXNjXCI6XCJVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEhUTUwgdG8gdGV4dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHVuZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJ0ZXh0VG9TdHJpbmdcIixcImRlc2NcIjpcIkVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIHRleHQgdG8gSmF2YVNjcmlwdCBzdHJpbmdcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVuZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwic3RyaW5nVG9UZXh0XCIsXCJkZXNjXCI6XCJVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEphdmFTY3JpcHQgc3RyaW5nIHRvIHRleHRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSB1bmVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwiaHRtbFRvU3RyaW5nXCIsXCJkZXNjXCI6XCJFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBIVE1MIHRvIEphdmFTY3JpcHQgc3RyaW5nXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1bmVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBlc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcInN0cmluZ1RvSHRtbFwiLFwiZGVzY1wiOlwiVW5lc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBKYXZhU2NyaXB0IHN0cmluZyB0byBIVE1MXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgdW5lc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcInRleHRUb1NRTFwiLFwiZGVzY1wiOlwiRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBTUUxcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVuZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwic3FsVG9UZXh0XCIsXCJkZXNjXCI6XCJVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIFNRTCB0byB0ZXh0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgdW5lc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcImJhc2U2NEVuY29kZVwiLFwiZGVzY1wiOlwiRW5jb2RlcyAoUkZDIDQ2NDgpIGEgc3RyaW5nXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBkZWNvZGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZW5jb2RlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJiYXNlNjREZWNvZGVcIixcImRlc2NcIjpcIkRlY29kZXMgKFJGQyA0NjQ4KSBhIHN0cmluZ1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZW5jb2RlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGRlY29kZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwibG9hZFJlc291cmNlc1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgcmVzb3VyY2VzIGJ5IGV4dGVuc2lvblwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFNoZWV0c1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgQ1NTIHNoZWV0c1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFNjcmlwdHNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIEpTIHNjcmlwdHNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRKU09Oc1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgSlNPTiBmaWxlc1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFhNTHNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIFhNTCBmaWxlc1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZEhUTUxzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBIVE1MIGZpbGVzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkVFdJR3NcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIFRXSUcgZmlsZXNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRUZXh0c1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgdGV4dCBmaWxlc1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwicmVwbGFjZUhUTUxcIixcImRlc2NcIjpcIlB1dHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgc3VmZml4LCBkaWN0LCB0d2lncylcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInByZXBlbmRIVE1MXCIsXCJkZXNjXCI6XCJQcmVwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBzdWZmaXgsIGRpY3QsIHR3aWdzKVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiYXBwZW5kSFRNTFwiLFwiZGVzY1wiOlwiQXBwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBzdWZmaXgsIGRpY3QsIHR3aWdzKVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiZm9ybWF0VFdJR1wiLFwiZGVzY1wiOlwiSW50ZXJwcmV0ZXMgdGhlIGdpdmVuIFRXSUcgc3RyaW5nLCBzZWUge0BsaW5rIGh0dHA6Ly90d2lnLnNlbnNpb2xhYnMub3JnL2RvY3VtZW50YXRpb259XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJkaWN0XCIsXCJ0eXBlXCI6W1wiT2JqZWN0XCIsXCJBcnJheVwiXSxcImRlc2NcIjpcInRoZSBkaWN0aW9uYXJ5XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBmcmFnbWVudHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIEludGVycHJldGVkIFRXSUcgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwianNwYXRoXCIsXCJkZXNjXCI6XCJGaW5kcyBkYXRhIHdpdGhpbiB0aGUgZ2l2ZW4gSlNPTiwgc2VlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vZGZpbGF0b3YvanNwYXRofVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhdGhcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHBhdGhcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJqc29uXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBKU09OXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJBcnJheVwiLFwiZGVzY1wiOlwiVGhlIHJlc3VsdGluZyBhcnJheVwifV19LHtcIm5hbWVcIjpcImxvY2tcIixcImRlc2NcIjpcIkxvY2tzIHRoZSBXZWIgYXBwbGljYXRpb25cIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJ1bmxvY2tcIixcImRlc2NcIjpcIlVubG9ja3MgdGhlIFdlYiBhcHBsaWNhdGlvblwiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImNhbkxlYXZlXCIsXCJkZXNjXCI6XCJFbmFibGVzIHRoZSBtZXNzYWdlIGluIGEgY29uZmlybWF0aW9uIGRpYWxvZyBib3ggdG8gaW5mb3JtIHRoYXQgdGhlIHVzZXIgaXMgYWJvdXQgdG8gbGVhdmUgdGhlIGN1cnJlbnQgcGFnZS5cIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJjYW5ub3RMZWF2ZVwiLFwiZGVzY1wiOlwiRGlzYWJsZXMgdGhlIG1lc3NhZ2UgaW4gYSBjb25maXJtYXRpb24gZGlhbG9nIGJveCB0byBpbmZvcm0gdGhhdCB0aGUgdXNlciBpcyBhYm91dCB0byBsZWF2ZSB0aGUgY3VycmVudCBwYWdlLlwiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImluZm9cIixcImRlc2NcIjpcIlNob3dzIGFuICdpbmZvJyBtZXNzYWdlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwibWVzc2FnZVwiLFwidHlwZVwiOltcIlN0cmluZ1wiLFwiQXJyYXlcIl0sXCJkZXNjXCI6XCJ0aGUgbWVzc2FnZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImZhZGVPdXRcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcImlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJzdWNjZXNzXCIsXCJkZXNjXCI6XCJTaG93cyBhICdzdWNjZXNzJyBtZXNzYWdlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwibWVzc2FnZVwiLFwidHlwZVwiOltcIlN0cmluZ1wiLFwiQXJyYXlcIl0sXCJkZXNjXCI6XCJ0aGUgbWVzc2FnZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImZhZGVPdXRcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcImlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJ3YXJuaW5nXCIsXCJkZXNjXCI6XCJTaG93cyBhICd3YXJuaW5nJyBtZXNzYWdlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwibWVzc2FnZVwiLFwidHlwZVwiOltcIlN0cmluZ1wiLFwiQXJyYXlcIl0sXCJkZXNjXCI6XCJ0aGUgbWVzc2FnZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImZhZGVPdXRcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcImlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJlcnJvclwiLFwiZGVzY1wiOlwiU2hvd3MgYW4gJ2Vycm9yJyBtZXNzYWdlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwibWVzc2FnZVwiLFwidHlwZVwiOltcIlN0cmluZ1wiLFwiQXJyYXlcIl0sXCJkZXNjXCI6XCJ0aGUgbWVzc2FnZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImZhZGVPdXRcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcImlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJmbHVzaFwiLFwiZGVzY1wiOlwiRmx1c2hlcyBtZXNzYWdlc1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImZpbGxCcmVhZGNydW1iXCIsXCJkZXNjXCI6XCJGaWxsIHRoZSBtYWluIGJyZWFkY3J1bWJcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJpdGVtc1wiLFwidHlwZVwiOlwiQXJyYXlcIixcImRlc2NcIjpcInRoZSBhcnJheSBvZiBpdGVtcyAoSFRNTCBmb3JtYXQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJzdGFydFwiLFwiZGVzY1wiOlwiU3RhcnRzIHRoZSBXZWIgYXBwbGljYXRpb25cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChsb2dvX3VybCwgaG9tZV91cmwsIGNvbnRhY3RfZW1haWwsIGFib3V0X3VybCwgdGhlbWVfdXJsLCBsb2NrZXJfdXJsLCBwYXNzd29yZF9hdXRoZW50aWNhdGlvbl9hbGxvd2VkLCBjZXJ0aWZpY2F0ZV9hdXRoZW50aWNhdGlvbl9hbGxvd2VkLCBjcmVhdGVfYWNjb3VudF9hbGxvd2VkLCBjaGFuZ2VfaW5mb19hbGxvd2VkLCBjaGFuZ2VfcGFzc3dvcmRfYWxsb3dlZCwgY2hhbmdlX2NlcnRpZmljYXRlX2FsbG93ZWQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJsb2FkQ29udHJvbFwiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgYSBjb250cm9sXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiY29udHJvbFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgY29udHJvbCBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNyZWF0ZUNvbnRyb2xcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2xcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXJlbnRcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwib3duZXJcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udHJvbFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXJhbXNcIixcInR5cGVcIjpcIkFycmF5XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiY3JlYXRlQ29udHJvbEluQm9keVwiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbCBpbiBhIGNvbnRhaW5lclwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhcmVudFwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJvd25lclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250cm9sXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhcmFtc1dpdGhvdXRTZXR0aW5nc1wiLFwidHlwZVwiOlwiQXJyYXlcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRyb2xTZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXJlbnRTZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiY3JlYXRlQ29udHJvbEluQ29udGFpbmVyXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sIGluIGEgY29udGFpbmVyXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGFyZW50XCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIm93bmVyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRyb2xcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFyYW1zV2l0aG91dFNldHRpbmdzXCIsXCJ0eXBlXCI6XCJBcnJheVwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udHJvbFNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhcmVudFNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImljb25cIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidGl0bGVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNyZWF0ZUNvbnRyb2xGcm9tV2ViTGlua1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbCBpbiBhIGNvbnRhaW5lciBmcm9tIGEgV0VCIGxpbmtcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXJlbnRcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwib3duZXJcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZWxcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFyZW50U2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRTdWJBcHBcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIGEgc3ViYXBwXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3ViYXBwXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBzdWJhcHBcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidGhlIHVzZXIgZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkU3ViQXBwQnlVUkxcIixcImRlc2NcIjpcIkxvYWRzIGEgc3ViYXBwIGJ5IFVSTFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcImRlZmF1bHRTdWJBcHBcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiaWYgJ2FtaVdlYkFwcC5hcmdzW1xcXCJzdWJhcHBcXFwiXScgaXMgbnVsbCwgdGhlIGRlZmF1bHQgc3ViYXBwXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZGVmYXVsdFVzZXJEYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJpZiAnYW1pV2ViQXBwLmFyZ3NbXFxcInVzZXJkYXRhXFxcIl0nIGlzIG51bGwsIHRoZSBkZWZhdWx0IHVzZXIgZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX1dLFwiZXZlbnRzXCI6W3tcIm5hbWVcIjpcIm9uUmVhZHlcIixcImRlc2NcIjpcIlRoaXMgbWV0aG9kIG11c3QgYmUgb3ZlcmxvYWRlZCBhbmQgaXMgY2FsbGVkIHdoZW4gdGhlIFdlYiBhcHBsaWNhdGlvbiBzdGFydHNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyRGF0YVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uUmVmcmVzaFwiLFwiZGVzY1wiOlwiVGhpcyBtZXRob2QgbXVzdCBiZSBvdmVybG9hZGVkIGFuZCBpcyBjYWxsZWQgd2hlbiB0aGUgdG9vbGJhciBuZWVkcyB0byBiZSB1cGRhdGVkXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiaXNBdXRoXCIsXCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19XX0se1wibmFtZVwiOlwiYW1pQ29tbWFuZFwiLFwiZGVzY1wiOlwiVGhlIEFNSSBjb21tYW5kIHN1YnN5c3RlbVwiLFwidmFyaWFibGVzXCI6W3tcIm5hbWVcIjpcImVuZHBvaW50XCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIkRlZmF1bHQgZW5kcG9pbnRcIn0se1wibmFtZVwiOlwiY29udmVydGVyXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIkRlZmF1bHQgY29udmVydGVyXCJ9XSxcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJleGVjdXRlXCIsXCJkZXNjXCI6XCJFeGVjdXRlcyBhbiBBTUkgY29tbWFuZFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcImNvbW1hbmRcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGNvbW1hbmRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBlbmRwb2ludCwgY29udmVydGVyLCB0aW1lb3V0LCBleHRyYVBhcmFtLCBleHRyYVZhbHVlKVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwicGFzc0xvZ2luXCIsXCJkZXNjXCI6XCJMb2dzIGluIGJ5IGxvZ2luL3Bhc3N3b3JkXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhc3NcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNlcnRMb2dpblwiLFwiZGVzY1wiOlwiTG9ncyBpbiBieSBjZXJ0aWZpY2F0ZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2dvdXRcIixcImRlc2NcIjpcIkxvZ3Mgb3V0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImF0dGFjaENlcnRcIixcImRlc2NcIjpcIkF0dGFjaGVzIGEgY2VydGlmaWNhdGVcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1c2VyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFzc1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcGFzc3dvcmRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiZGV0YWNoQ2VydFwiLFwiZGVzY1wiOlwiRGV0YWNoZXMgYSBjZXJ0aWZpY2F0ZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVzZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXNzXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBwYXNzd29yZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJhZGRVc2VyXCIsXCJkZXNjXCI6XCJBZGRzIGEgbmV3IHVzZXJcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1c2VyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFzc1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcGFzc3dvcmRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJmaXJzdE5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGZpcnN0IG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJsYXN0TmFtZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgbGFzdCBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZW1haWxcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVtYWlsXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiYXR0YWNoXCIsXCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJhdHRhY2ggdGhlIGN1cnJlbnQgY2VydGlmaWNhdGVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJhZ3JlZVwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiYWdyZWUgd2l0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiY2hhbmdlSW5mb1wiLFwiZGVzY1wiOlwiQ2hhbmdlcyB0aGUgYWNjb3VudCBpbmZvcm1hdGlvblwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcImZpcnN0TmFtZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZmlyc3QgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImxhc3ROYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBsYXN0IG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJlbWFpbFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZW1haWxcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiY2hhbmdlUGFzc1wiLFwiZGVzY1wiOlwiQ2hhbmdlcyB0aGUgYWNjb3VudCBwYXNzd29yZFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVzZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJvbGRQYXNzXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBvbGQgcGFzc3dvcmRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJuZXdQYXNzXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBuZXcgcGFzc3dvcmRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwicmVzZXRQYXNzXCIsXCJkZXNjXCI6XCJSZXNldHMgdGhlIGFjY291bnQgcGFzc3dvcmRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1c2VyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19XX0se1wibmFtZVwiOlwiYW1pTG9naW5cIixcImRlc2NcIjpcIlRoZSBBTUkgYXV0aGVudGljYXRpb24gc3Vic3lzdGVtXCIsXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwiZ2V0VXNlckluZm9cIixcImRlc2NcIjpcIkdldHMgdGhlIHVzZXIgaW5mb3JtYXRpb25cIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBjdXJyZW50IHVzZXIgaW5mb3JtYXRpb25cIn1dfSx7XCJuYW1lXCI6XCJnZXRSb2xlSW5mb1wiLFwiZGVzY1wiOlwiR2V0cyB0aGUgcm9sZSBpbmZvcm1hdGlvblwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGN1cnJlbnQgcm9sZSBpbmZvcm1hdGlvblwifV19LHtcIm5hbWVcIjpcImdldFVQREluZm9cIixcImRlc2NcIjpcIkdldHMgdGhlIHVzZXIgZGF0YSBwcm90ZWN0aW9uIGluZm9ybWF0aW9uXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgY3VycmVudCB1c2VyIGRhdGEgcHJvdGVjdGlvbiBpbmZvcm1hdGlvblwifV19LHtcIm5hbWVcIjpcImdldFNTT0luZm9cIixcImRlc2NcIjpcIkdldHMgdGhlIHNpbmdsZSBzaWduIG9uIGluZm9ybWF0aW9uXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgY3VycmVudCBzaW5nbGUgc2lnbiBvbiBpbmZvcm1hdGlvblwifV19LHtcIm5hbWVcIjpcImdldFVzZXJcIixcImRlc2NcIjpcIkdldHMgdGhlIGN1cnJlbnQgdXNlclwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGN1cnJlbnQgdXNlclwifV19LHtcIm5hbWVcIjpcImdldEd1ZXN0XCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBndWVzdCB1c2VyXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZ3Vlc3QgdXNlclwifV19LHtcIm5hbWVcIjpcImdldENsaWVudEROXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBjbGllbnQgRE5cIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBjbGllbnQgRE5cIn1dfSx7XCJuYW1lXCI6XCJnZXRJc3N1ZXJETlwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgaXNzdWVyIEROXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgaXNzdWVyIEROXCJ9XX0se1wibmFtZVwiOlwiaXNBdXRoZW50aWNhdGVkXCIsXCJkZXNjXCI6XCJDaGVja3Mgd2hldGhlciB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX0se1wibmFtZVwiOlwiaGFzUm9sZVwiLFwiZGVzY1wiOlwiQ2hlY2tzIHdoZXRoZXIgdGhlIHVzZXIgaGFzIHRoZSBnaXZlbiByb2xlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicm9sZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcm9sZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX0se1wibmFtZVwiOlwic3NvXCIsXCJkZXNjXCI6XCJPcGVucyB0aGUgJ1NTTycgbW9kYWwgd2luZG93XCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwic2lnbkluXCIsXCJkZXNjXCI6XCJPcGVucyB0aGUgJ1NpZ25JbicgbW9kYWwgd2luZG93XCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiY2hhbmdlSW5mb1wiLFwiZGVzY1wiOlwiT3BlbnMgdGhlICdDaGFuZ2UgSW5mbycgbW9kYWwgd2luZG93XCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiY2hhbmdlUGFzc1wiLFwiZGVzY1wiOlwiT3BlbnMgdGhlICdDaGFuZ2UgUGFzc3dvcmQnIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImFjY291bnRTdGF0dXNcIixcImRlc2NcIjpcIk9wZW5zIHRoZSAnQWNjb3VudCBTdGF0dXMnIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcInNpZ25PdXRcIixcImRlc2NcIjpcIlNpZ25zIG91dFwiLFwicGFyYW1zXCI6W119XX1dLFwiaW50ZXJmYWNlc1wiOlt7XCJuYW1lXCI6XCJhbWkuSUNvbnRyb2xcIixcImRlc2NcIjpcIlRoZSBBTUkgY29udHJvbCBpbnRlcmZhY2VcIixcImltcGxlbWVudHNcIjpbXSxcImluaGVyaXRzXCI6W10sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwicGF0Y2hJZFwiLFwiZGVzY1wiOlwiUGF0Y2hlcyBhbiBIVE1MIGlkZW50aWZpZXJcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJpZFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdW5wYXRjaGVkIEhUTUwgaWRlbnRpZmllclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgcGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcIn1dfSx7XCJuYW1lXCI6XCJyZXBsYWNlSFRNTFwiLFwiZGVzY1wiOlwiUHV0cyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwicHJlcGVuZEhUTUxcIixcImRlc2NcIjpcIlByZXBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJhcHBlbmRIVE1MXCIsXCJkZXNjXCI6XCJBcHBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJvblJlYWR5XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiB0aGUgY29udHJvbCBpcyByZWFkeSB0byBydW5cIixcInBhcmFtc1wiOltdfV19LHtcIm5hbWVcIjpcImFtaS5JU3ViQXBwXCIsXCJkZXNjXCI6XCJUaGUgQU1JIHN1Yi1hcHBsaWNhdGlvbiBpbnRlcmZhY2VcIixcImltcGxlbWVudHNcIjpbXSxcImluaGVyaXRzXCI6W10sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyByZWFkeSB0byBydW5cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uRXhpdFwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyBhYm91dCB0byBleGl0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkxvZ2luXCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiBsb2dnaW5nIGluXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkxvZ291dFwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gbG9nZ2luZyBvdXRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19XX1dLFwiY2xhc3Nlc1wiOlt7XCJuYW1lXCI6XCJhbWkuQ29udHJvbFwiLFwiZGVzY1wiOlwiVGhlIGJhc2ljIEFNSSBjb250cm9sXCIsXCJpbXBsZW1lbnRzXCI6W1wiYW1pLklDb250cm9sXCJdLFwiaW5oZXJpdHNcIjpbXSxcImtvbnN0cnVjdG9yXCI6e1wibmFtZVwiOlwiQ29udHJvbFwiLFwicGFyYW1zXCI6W119LFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcInBhdGNoSWRcIixcImRlc2NcIjpcIlBhdGNoZXMgYW4gSFRNTCBpZGVudGlmaWVyXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiaWRcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVucGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHBhdGNoZWQgSFRNTCBpZGVudGlmaWVyXCJ9XX0se1wibmFtZVwiOlwicmVwbGFjZUhUTUxcIixcImRlc2NcIjpcIlB1dHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInByZXBlbmRIVE1MXCIsXCJkZXNjXCI6XCJQcmVwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiYXBwZW5kSFRNTFwiLFwiZGVzY1wiOlwiQXBwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgaXMgcmVhZHkgdG8gcnVuXCIsXCJwYXJhbXNcIjpbXX1dfSx7XCJuYW1lXCI6XCJhbWkuU3ViQXBwXCIsXCJkZXNjXCI6XCJUaGUgYmFzaWMgQU1JIHN1Yi1hcHBsaWNhdGlvblwiLFwiaW1wbGVtZW50c1wiOltcImFtaS5JU3ViQXBwXCJdLFwiaW5oZXJpdHNcIjpbXSxcImtvbnN0cnVjdG9yXCI6e1wibmFtZVwiOlwiU3ViQXBwXCIsXCJwYXJhbXNcIjpbXX0sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyByZWFkeSB0byBydW5cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uRXhpdFwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyBhYm91dCB0byBleGl0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkxvZ2luXCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiBsb2dnaW5nIGluXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkxvZ291dFwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gbG9nZ2luZyBvdXRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19XX1dfTtcblxuLyogZXNsaW50LWVuYWJsZSAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi8iXX0=
