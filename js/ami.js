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
var _ami_internal_jQueryVal = jQuery.fn.val;

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
    if (parent === void 0) {
      parent = this;
    }

    if (owner === void 0) {
      owner = this;
    }

    this._parent = parent;
    this._owner = owner;
    this.instanceSuffix = ami.Control.instanceCnt++;
  },
  setParent: function setParent(parent) {
    if (parent === void 0) {
      parent = this;
    }

    return this._parent = parent;
  },
  getParent: function getParent() {
    return this._parent;
  },
  setOwner: function setOwner(owner) {
    if (owner === void 0) {
      owner = this;
    }

    return this._owner = owner;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFNSS9zcmMvbWFpbi5qcyIsIkFNSS9zcmMvdG9rZW5pemVyLmpzIiwiQU1JL3NyYy9leHByZXNzaW9uX2NvbXBpbGVyLmpzIiwiQU1JL3NyYy90ZW1wbGF0ZV9jb21waWxlci5qcyIsIkFNSS9zcmMvZW5naW5lLmpzIiwiQU1JL3NyYy9jYWNoZS5qcyIsIkFNSS9zcmMvc3RkbGliLmpzIiwiQU1JL3NyYy9pbnRlcnByZXRlci5qcyIsIkFNSS9leHRlcm5hbC9qc3BhdGguanMiLCJBTUkvQU1JRXh0ZW5zaW9uLmpzIiwiQU1JL0FNSU9iamVjdC5qcyIsIkFNSS9BTUlSb3V0ZXIuanMiLCJBTUkvQU1JV2ViQXBwLmpzIiwiQU1JL0FNSUludGVyZmFjZS5qcyIsIkFNSS9BTUlDb21tYW5kLmpzIiwiQU1JL0FNSUxvZ2luLmpzIiwiQU1JL0FNSURvYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQSxJQUFBLE9BQUEsR0FBQTtBQUNBLEVBQUEsT0FBQSxFQUFBO0FBREEsQ0FBQTs7QUFRQSxJQUFBLE9BQUEsT0FBQSxLQUFBLFdBQUEsRUFDQTtBQUNBLEVBQUEsT0FBRyxDQUFNLEVBQVQsR0FBVSxPQUFXLENBQUMsSUFBRCxDQUFyQjtBQUVDLEVBQUEsTUFBQSxDQUFPLE9BQVAsQ0FBYSxPQUFiLEdBQXdCLE9BQXhCO0FBQ0Q7O0FDeEJBLE9BQUEsQ0FBQSxTQUFBLEdBQUE7QUFHQyxFQUFBLFFBQUEsRUFBQSxrQkFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsRUFDRDtBQUNDLFFBQUEsU0FBVSxDQUFBLE1BQVYsS0FBeUIsVUFBTSxDQUFBLE1BQS9CLEVBQ0M7QUFDQSxZQUFHLHlDQUFIO0FBQ0M7O0FBRUQsUUFBQyxhQUFBLEdBQUEsRUFBRDtBQUNGLFFBQUEsWUFBQSxHQUFBLEVBQUE7QUFDRSxRQUFNLFlBQUEsR0FBZSxFQUFyQjtBQUVBLFFBQUEsQ0FB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QWxFUjtBQW1FQyxFQUFBLE1BQUksRUFBSSxHQW5FVDtBQW9FQyxFQUFBLElBQUEsRUFBTSxHQXBFUDtBQXFFQyxFQUFBLEtBQUEsRUFBTyxHQXJFUjtBQXNFQyxFQUFBLEtBQUssRUFBQyxHQXRFUDtBQXVFQyxFQUFBLEdBQUEsRUFBSyxHQXZFTjtBQXdFQyxFQUFBLEtBQUssRUFBRSxHQXhFUjtBQXlFQyxFQUFBLEdBQUcsRUFBRSxHQXpFTjtBQTBFQyxFQUFBLEdBQUEsRUFBSyxHQTFFTjtBQTJFQyxFQUFBLGVBQVMsRUFBQSxHQTNFVjtBQTRFQyxFQUFBLFFBQVMsRUFBQSxHQTVFVjtBQTZFQSxFQUFBLEtBQUUsRUFBQSxHQTdFRjtBQThFQSxFQUFBLEdBQUUsRUFBQSxHQTlFRjtBQStFQyxFQUFBLEtBQUssRUFBRSxHQS9FUjtBQWdGQyxFQUFBLElBQUksRUFBQyxHQWhGTjtBQWlGQyxFQUFBLEVBQUEsRUFBQSxHQWpGRDtBQWtGQyxFQUFBLEVBQUEsRUFBSSxHQWxGTDtBQW1GQyxFQUFBLEdBQUcsRUFBQyxHQW5GTDtBQW9GQyxFQUFBLEdBQUcsRUFBQyxHQXBGTDtBQXFGQyxFQUFBLEdBQUcsRUFBRSxHQXJGTjtBQXNGQyxFQUFBLEdBQUcsRUFBRSxHQXRGTjtBQXVGQyxFQUFBLEdBQUcsRUFBRSxHQXZGTjtBQXdGQyxFQUFBLFFBQVEsRUFBQyxHQXhGVjtBQThGQyxFQUFBLEdBQUEsRUFBQSxHQTlGRDtBQStGQSxFQUFBLEdBQUEsRUFBQSxHQS9GQTtBQWdHQyxFQUFBLEdBQUcsRUFBRSxHQWhHTjtBQWlHQyxFQUFBLEdBQUcsRUFBRTtBQWpHTixDQUFBO0FBd0dBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEtBQUE7O0FBTUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxTQUFBLEdBQUEsVUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO0FBR0MsT0FBQSxPQUFBLEdBQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLENBQUE7QUFJQSxPQUFBLFVBQUEsR0FBQSxD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Q0FBQSxHQUFBLEtBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQTs7QUFFQSxPQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxFQUNDO0FBQ0MsUUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQ0E7QUFDQyxNQUFBLE1BQUEsR0FBQSxNQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsS0FIRCxNQUtBO0FBQ0MsTUFBQSxNQUFBLEdBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUE7QUFDQTtBQUNEOztBQUVGLEVBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUE7QUFDQzs7QUFJRCxTQUFBLGdCQUFBLENBQUEsS0FBQSxFQUFBLENBQUEsRUFDQTtBQUNDLE1BQUEsTUFBQSxHQUFBLE1BQUE7QUFFRCxNQUFBLEtBQUEsR0FBQSxLQUFBLENBQUEsS0FBQSxDQUFBLFdBQUEsQ0FBQTtBQUFBLE1BQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQTs7QUFFQSxPQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxFQUNDO0FBQ0MsUUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQ0E7QUFDQyxNQUFBLE1BQUEsR0FBQSxNQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsS0FIRCxNQUtBO0FBQ0MsWUFBQSxNQUFBLEtBQUEsR0FBQSxNQUFBLEdBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLGlCQUFBO0FBQ0E7QUFDRDs7QUFFRixFQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBO0FBQ0M7O0FBWUQsU0FBQSxhQUFBLENBQUEsS0FBQSxFQUFBLE1BQUEsRUFDQTtBQUNDLE1BQUEsQ0FBQSxNQUFBLEVBQ0E7QUFDQyxJQUFBLE1BQUEsR0FBQSxFQUFBO0FBQ0E7O0FBSUYsRUFBQSxNQUFBLENBQUEsS0FBQSxHQUFBLEtBQUE7O0FBSUEsRUFBQSxpQkFBQSxDQUFBLEtBQUEsRUFBQSxNQUFBLENBQUE7O0FBSUEsTUFBQSxNQUFBLENBQUEsQ0FBQSxFQUNDO0FBQ0MsSUFBQSxNQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxNQUFBO0FBQ0E7QUFHRDs7QUFZRCxTQUFBLGFBQUEsQ0FBQSxLQUFBLEVBQUEsTUFBQSxFQUNBO0FBQ0MsTUFBQSxDQUFBLE1BQUEsRUFDQTtBQUNDLElBQUEsTUFBQSxHQUFBLEVBQUE7QUFDQTs7QUFJRixNQUFBLE1BQUEsR0FBQSxTQUFBLE1BQUEsR0FDQztBQUNDLFVBQUEsaUNBQUE7QUFDQSxHQUhGOztBQU9BLE1BQUEsTUFBQSxDQUFBLFFBQUEsRUFDQztBQUNDLFVBQUEsc0NBQUE7QUFDQTs7QUFFRixNQUFBLE1BQUEsQ0FBQSxXQUFBLEVBQ0M7QUFDQyxVQUFBLHlDQUFBO0FBQ0E7O0FBSUYsTUFBQSxNQUFBLENBQUEsQ0FBQSxFQUNDO0FBQ0MsVUFBQSwrQkFBQTtBQUNBOztBQUVGLE1BQUEsTUFBQSxDQUFBLEtBQUEsRUFDQztBQUNDLFVBQUEsbUNBQUE7QUFDQTs7QUFJRixFQUFBLE1BQUEsQ0FBQSxLQUFBLEdBQUEsS0FBQTtBQUNDLEVBQUEsTUFBTSxDQUFBLE1BQU4sR0FBZ0IsTUFBaEI7QUFDQSxFQUFBLE1BQU0sQ0FBQSxRQUFOLEdBQWlCLE1BQWpCOztBQUlELEVBQUEsZ0JBQUEsQ0FBQSxLQUFBLEVBQUEsTUFBQSxDQUFBO0FBR0M7O0FBWUQsU0FBQSxTQUFBLENBQUEsS0FBQSxFQUFBLE1BQUEsRUFDQTtBQUNDLE1BQUEsQ0FBQSxNQUFBLEVBQ0E7QUFDQyxJQUFBLE1BQUEsR0FBQSxFQUFBO0FBQ0E7O0FBSUYsTUFBQSxNQUFBLEdBQUEsTUFBQSxDQUFBLFFBQUEsWUFBQSxRQUFBLEdBQUEsTUFBQSxDQUFBLFFBQUEsQ0FBQSxTQUFBLEdBQUEsRUFBQTtBQUVBLE1BQUEsaUJBQUEsR0FBQSxNQUFBLENBQUEsV0FBQSxZQUFBLEtBQUEsR0FBQSxNQUFBLENBQUEsV0FBQSxHQUFBLEVBQUE7QUFDQyxNQUFNLGlCQUFpQixHQUFHLE1BQU8sQ0FBQSxXQUFQLFlBQStCLEtBQS9CLEdBQXdDLE1BQU0sQ0FBQSxXQUE5QyxHQUE2RCxFQUF2Rjs7QUFJRCxNQUFBLE1BQUEsR0FBQSxTQUFBLE1BQUEsR0FDQztBQUdELFNBQUEsSUFBQSxDQUFBLElBQUEsS0FBQSxXQUFBLEVBQ0U7QUFDQyxVQUFBLEtBQUEsV0FBQSxDQUFBLGNBQUEsQ0FBQSxDQUFBLENBQUEsRUFDQTtBQUNDLGNBQUEsVUFBQSxHQUFBLEtBQUEsV0FBQSxDQUFBLENBQUEsQ0FBQTs7QUFFSixlQUFBLElBQUEsQ0FBQSxJQUFBLFVBQUEsQ0FBQSxRQUFBLEVBQ0k7QUFDQyxnQkFBQSxVQUFBLENBQUEsUUFBQSxDQUFBLGNBQUEsQ0FBQSxDQUFBLENBQUEsRUFDQTtBQUNDLG9CQUFBLE9BQUEsR0FBQSxVQUFBLENBQUEsUUFBQSxDQUFBLENBQUEsQ0FBQTs7QUFFTixvQkFBQSxPQUFBLEtBQUEsQ0FBQSxDQUFBLEtBQUEsT0FBQSxPQUFBLEVBQ007QUFDQyx3QkFBQSxZQUFBLEtBQUEsS0FBQSxHQUFBLHlCQUFBLEdBQUEsVUFBQSxDQUFBLEtBQUEsR0FBQSxHQUFBLEdBQUEsQ0FBQSxHQUFBLEdBQUE7QUFDQTtBQUNEO0FBQ0Q7QUFDRDtBQUNEOztBQUlILFFBQUEsTUFBQSxHQUFBLEtBQUEsTUFBQSxDQUFBLGVBQUE7QUFDRSxRQUFNLE1BQU0sR0FBRyxLQUFJLE1BQUosQ0FBWSxlQUEzQjtBQUlGLFNBQUEsTUFBQSxHQUFBLEVBQUE7O0FBRUEsU0FBQSxJQUFBLElBQUEsSUFBQSxNQUFBLEVBQ0U7QUFDQyxVQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLEVBQ0E7QUFDQyxlQUFBLE1BQUEsQ0FBQSxJQUFBLElBQUEsVUFBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLElBQUE7QUFBQSxtQkFBQSxZQUFBO0FBRUoscUJBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsU0FBQSxDQUFBO0FBRUEsYUFKSTtBQUFBLFdBQUEsQ0FJSixNQUpJLEVBSUosSUFKSSxFQUlKLElBSkksQ0FBQTtBQUtBO0FBQ0Q7O0FBSUgsU0FBQSxNQUFBLEdBQUEsRUFBQTs7QUFFQSxTQUFBLElBQUEsS0FBQSxJQUFBLE1BQUEsRUFDRTtBQUNDLFVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxLQUFBLENBQUEsRUFDQTtBQUNDLGVBQUEsTUFBQSxDQUFBLEtBQUEsSUFBQSxVQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsSUFBQTtBQUFBLG1CQUFBLFlBQUE7QUFFSixxQkFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsRUFBQSxTQUFBLENBQUE7QUFFQSxhQUpJO0FBQUEsV0FBQSxDQUlKLE1BSkksRUFJSixLQUpJLEVBSUosSUFKSSxDQUFBO0FBS0E7QUFDRDs7QUFJSCxRQUFBLEtBQUEsS0FBQSxFQUNFO0FBQ0MsV0FBQSxLQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsRUFBQSxTQUFBO0FBQ0E7QUFHRCxHQXRFRjs7QUEwRUEsRUFBQSxNQUFBLENBQUEsZUFBQSxHQUFBLEVBQUE7QUFDQyxFQUFBLE1BQU0sQ0FBQyxlQUFQLEdBQXlCLEVBQXpCOztBQUlELE9BQUEsSUFBQSxJQUFBLElBQUEsTUFBQSxFQUNDO0FBQ0MsUUFBQSxJQUFBLEtBQUEsT0FBQSxJQUVHLElBQUUsQ0FBQSxNQUFGLENBQUUsQ0FBRixNQUFFLEdBRkwsSUFJRyxNQUFFLENBQUEsY0FBRixDQUFFLElBQUYsQ0FKSCxFQUtHO0FBQ0YsUUFBQSxNQUFHLENBQUEsZUFBSCxDQUFHLElBQUgsSUFBRyxNQUFBLENBQUEsSUFBQSxDQUFIO0FBRUgsUUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLElBQUEsSUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBO0FBQ0c7QUFDRDs7QUFFRixPQUFBLElBQUEsTUFBQSxJQUFBLE1BQUEsRUFDQztBQUNDLFFBQUEsTUFBQSxLQUFBLE9BQUEsSUFFRyxNQUFFLENBQUEsTUFBRixDQUFFLENBQUYsTUFBRSxHQUZMLElBSUcsTUFBRSxDQUFBLGNBQUYsQ0FBRSxNQUFGLENBSkgsRUFLRztBQUNGLFFBQUEsTUFBRyxDQUFBLGVBQUgsQ0FBRyxNQUFILElBQUcsTUFBQSxDQUFBLE1BQUEsQ0FBSDtBQUVILFFBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxNQUFBLElBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQTtBQUNHO0FBQ0Q7O0FBSUYsRUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLEtBQUEsR0FBQSxLQUFBO0FBQ0MsRUFBQSxNQUFNLENBQUMsU0FBUCxDQUFnQixNQUFoQixHQUEwQixNQUExQjtBQUNBLEVBQUEsTUFBTSxDQUFDLFNBQVAsQ0FBZ0IsV0FBaEIsR0FBMkIsaUJBQU0sQ0FBQSxNQUFOLENBQU0saUJBQU4sQ0FBM0I7O0FBSUQsRUFBQSxnQkFBQSxDQUFBLEtBQUEsRUFBQSxNQUFBLENBQUE7O0FBSUEsTUFBQSxNQUFBLENBQUEsQ0FBQSxFQUNDO0FBQ0MsSUFBQSxNQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxNQUFBO0FBQ0E7QUFHRDs7QUFNRCxJQUFBLE9BQUEsT0FBQSxLQUFBLFdBQUEsRUFDQTtBQUNDLEVBQUEsTUFBQSxDQUFBLE9BQUEsQ0FBQSxTQUFBLEdBQUEsYUFBQTtBQUNBLEVBQUEsTUFBTSxDQUFDLE9BQVAsQ0FBZSxTQUFmLEdBQTJCLGFBQTNCO0FBQ0EsRUFBQSxNQUFNLENBQUMsT0FBUCxDQUFlLEtBQWYsR0FBNEIsU0FBNUI7QUFDQTs7QUFNRCxJQUFBLE9BQUEsTUFBQSxLQUFBLFdBQUEsRUFDQTtBQUNDLEVBQUEsTUFBQSxDQUFBLFNBQUEsR0FBQSxhQUFBO0FBQ0EsRUFBQSxNQUFNLENBQUMsU0FBUCxHQUFtQixhQUFuQjtBQUNBLEVBQUEsTUFBTSxDQUFDLEtBQVAsR0FBb0IsU0FBcEI7QUFDQTs7QUN0VEQsYUFBQSxDQUFBLFdBQUEsRUFBQTtBQUtBLEVBQUEsVUFBQSxFQUFBLEVBTEE7QUFNQyxFQUFBLFVBQVUsRUFBRSxFQU5iO0FBT0MsRUFBQSxVQUFVLEVBQUUsRUFQYjtBQVNBLEVBQUEsS0FBQSxFQUFBLEVBVEE7QUFVQyxFQUFBLEtBQUssRUFBRSxFQVZSO0FBY0EsRUFBQSxPQUFBLEVBQUEsRUFkQTtBQW9CQSxFQUFBLFdBQUEsRUFBQSxxQkFBQSxHQUFBLEVBQ0M7QUFDQyxJQUFBLEdBQUEsR0FBQSxHQUFBLENBQUEsSUFBQSxFQUFBOztBQUVGLFdBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLEtBQUEsR0FBQSxFQUNFO0FBQ0MsTUFBQSxHQUFBLEdBQUEsR0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLEVBQUEsR0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUE7QUFDQTs7QUFFSCxXQUFBLEdBQUE7QUFDRSxHQTlCRjtBQW9DQSxFQUFBLENBQUEsRUFBQSxhQUNDO0FBQUE7O0FBR0QsU0FBQSxLQUFBLENBQUEsTUFBQSxHQUFBLENBQUE7QUFDRSxTQUFLLE9BQUwsQ0FBVyxNQUFYLEdBQXNCLENBQXRCO0FBSUYsUUFBQSxJQUFBLEdBQUEsTUFBQSxDQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxFQUFBO0FBQ0UsUUFBTyxJQUFJLEdBQUksTUFBTSxDQUFDLFFBQVAsQ0FBaUIsSUFBakIsQ0FBdUIsSUFBdkIsRUFBZjtBQUNBLFFBQUssTUFBTSxHQUFJLE1BQU0sQ0FBQyxRQUFQLENBQWdCLE1BQWhCLENBQXVCLElBQXZCLEVBQWY7QUFJRixRQUFBLE9BQUEsR0FBQSxRQUFBLENBQUEsb0JBQUEsQ0FBQSxRQUFBLENBQUE7O0FBTUEsU0FBQSxJQUFBLEdBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxFQUNFO0FBQ0MsTUFBQSxHQUFBLEdBQUEsT0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxPQUFBLENBQUEsU0FBQSxDQUFBOztBQUVILFVBQUEsR0FBQSxHQUFBLENBQUEsRUFDRztBQUNDLGFBQUEsVUFBQSxHQUFBLE9BQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBO0FBRUosYUFBQSxVQUFBLEdBQUEsS0FBQSxXQUFBLENBQ0ksS0FBSyxVQUFMLENBQWlCLFNBQWpCLENBQXVCLENBQXZCLEVBQXVCLEdBQXZCLENBREosQ0FBQTtBQUlBO0FBQ0k7QUFDRDs7QUFNSCxTQUFBLFVBQUEsR0FBQSxLQUFBLFdBQUEsQ0FDRSxJQUFLLENBQUEsT0FBTCxDQUFLLGNBQUwsRUFBdUIsRUFBdkIsQ0FERixDQUFBO0FBUUEsU0FBQSxLQUFBLEdBQUEsS0FBQSxXQUFBLENBQ0UsSUFBSyxDQUFBLFNBQUwsQ0FBYSxDQUFiLEVBQWtCLE9BQWxCLENBQWtCLE9BQWxCLEVBQThCLEVBQTlCLENBREYsQ0FBQTs7QUFRQSxRQUFBLE1BQUEsRUFDRTtBQUNDLE1BQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLEVBQUEsS0FBQSxDQUFBLEdBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxLQUFBLEVBQUE7QUFFSCxZQUFBLEtBQUEsR0FBQSxLQUFBLENBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQTs7QUFFQSxZQUFBLEtBQUEsQ0FBQSxNQUFBLEtBQUEsQ0FBQSxFQUNJO0FBQ0MsVUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLGtCQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsRUFBQTtBQUNBLFNBSEwsTUFJSyxJQUFBLEtBQUEsQ0FBQSxNQUFBLEtBQUEsQ0FBQSxFQUNEO0FBQ0MsVUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLGtCQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsa0JBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQTtBQUNELE9BWkQ7QUFhQTtBQUdELEdBL0dGO0FBMEhBLEVBQUEsWUFBQSxFQUFBLHdCQUNDO0FBQ0MsV0FBQSxLQUFBLFVBQUE7QUFDQSxHQTdIRjtBQXNJQSxFQUFBLFlBQUEsRUFBQSx3QkFDQztBQUNDLFdBQUEsS0FBQSxVQUFBO0FBQ0EsR0F6SUY7QUFrSkEsRUFBQSxZQUFBLEVBQUEsd0JBQ0M7QUFDQyxXQUFBLEtBQUEsVUFBQTtBQUNBLEdBckpGO0FBOEpBLEVBQUEsT0FBQSxFQUFBLG1CQUNDO0FBQ0MsV0FBQSxLQUFBLEtBQUE7QUFDQSxHQWpLRjtBQTBLQSxFQUFBLE9BQUEsRUFBQSxtQkFDQztBQUNDLFdBQUEsS0FBQSxLQUFBO0FBQ0EsR0E3S0Y7QUF3TEEsRUFBQSxNQUFBLEVBQUEsZ0JBQUEsTUFBQSxFQUFBLE9BQUEsRUFDQztBQUNDLFNBQUEsT0FBQSxDQUFBLE9BQUEsQ0FBQTtBQUNBLE1BQUEsTUFBSyxFQUFBLE1BREw7QUFFQyxNQUFBLE9BQU8sRUFBQztBQUZULEtBQUE7O0FBS0YsV0FBQSxJQUFBO0FBQ0UsR0FoTUY7QUEwTUEsRUFBQSxNQUFBLEVBQUEsZ0JBQUEsTUFBQSxFQUNDO0FBQ0MsU0FBQSxPQUFBLEdBQUEsS0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLFVBQUEsS0FBQSxFQUFBO0FBRUYsYUFBQSxLQUFBLENBQUEsTUFBQSxDQUFBLFFBQUEsT0FBQSxNQUFBLENBQUEsUUFBQSxFQUFBO0FBQ0csS0FIRCxDQUFBO0FBS0YsV0FBQSxJQUFBO0FBQ0UsR0FsTkY7QUEyTkEsRUFBQSxLQUFBLEVBQUEsaUJBQ0M7QUFDQyxRQUFBLENBQUE7O0FBRUYsU0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLEtBQUEsT0FBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsRUFDRTtBQUNDLE1BQUEsQ0FBQSxHQUFBLEtBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxLQUFBLE9BQUEsQ0FBQSxDQUFBLEVBQUEsTUFBQSxDQUFBOztBQUVILFVBQUEsQ0FBQSxFQUNHO0FBQ0MsYUFBQSxPQUFBLENBQUEsQ0FBQSxFQUFBLE9BQUEsQ0FBQSxLQUFBLENBQUEsU0FBQSxFQUFBLENBQUE7O0FBRUosZUFBQSxJQUFBO0FBQ0k7QUFDRDs7QUFFSCxXQUFBLEtBQUE7QUFDRSxHQTVPRjtBQXVQQSxFQUFBLGtCQUFBLEVBQUEsNEJBQUEsSUFBQSxFQUFBLE9BQUEsRUFDQztBQUFBLFFBREQsT0FDQztBQURELE1BQUEsT0FDQyxHQURELElBQ0M7QUFBQTs7QUFDQyxRQUFBLE9BQUEsQ0FBQSxTQUFBLEVBQ0E7QUFDQyxNQUFBLE9BQUEsQ0FBQSxTQUFBLENBQUEsT0FBQSxFQUFBLElBQUEsRUFBQSxLQUFBLFVBQUEsR0FBQSxLQUFBLFdBQUEsQ0FBQSxJQUFBLENBQUE7QUFFSCxhQUFBLElBQUE7QUFDRzs7QUFFSCxXQUFBLEtBQUE7QUFDRSxHQWpRRjtBQTRRQSxFQUFBLG1CQUFBLEVBQUEsNkJBQUEsSUFBQSxFQUFBLE9BQUEsRUFDQztBQUFBLFFBREQsT0FDQztBQURELE1BQUEsT0FDQyxHQURELElBQ0M7QUFBQTs7QUFDQyxRQUFBLE9BQUEsQ0FBQSxZQUFBLEVBQ0E7QUFDQyxNQUFBLE9BQUEsQ0FBQSxZQUFBLENBQUEsT0FBQSxFQUFBLElBQUEsRUFBQSxLQUFBLFVBQUEsR0FBQSxLQUFBLFdBQUEsQ0FBQSxJQUFBLENBQUE7QUFFSCxhQUFBLElBQUE7QUFDRzs7QUFFSCxXQUFBLEtBQUE7QUFDRTtBQXRSRixDQUFBLENBQUE7QUNIQSxhQUFBLENBQUEsS0FBQSxFQUFBO0FBRUEsRUFBQSxPQUFBLEVBQUEsT0FGQTtBQUdDLEVBQUEsU0FBUyxFQUFFO0FBSFosQ0FBQSxDQUFBOztBQVVBLFNBQUEsa0JBQUEsQ0FBQSxRQUFBLEVBQUEsUUFBQSxFQUFBLFFBQUEsRUFDQTtBQUNDLE1BQUEsUUFBQSxJQUFBLFFBQUEsQ0FBQSxJQUFBLEVBQ0E7QUFDQyxJQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxFQUFBLFFBQUE7QUFDQSxHQUhELE1BS0E7QUFDQyxJQUFBLFFBQUE7QUFDQTtBQUNEOztBQUlELFNBQUEsb0JBQUEsQ0FBQSxRQUFBLEVBQUEsVUFBQSxFQUNBO0FBQ0MsTUFBQSxRQUFBLElBQUEsUUFBQSxDQUFBLE1BQUEsRUFDQTtBQUNDLElBQUEsUUFBQSxDQUFBLE1BQUEsQ0FBQSxVQUFBO0FBQ0EsR0FIRCxNQUtBO0FBQ0MsSUFBQSxVQUFBO0FBQ0E7QUFDRDs7QUFXRCxhQUFBLENBQUEsV0FBQSxFQUFBO0FBS0EsRUFBQSxTQUFBLEVBQUEsSUFBQSxNQUFBLENBQUEscUZBQUEsRUFBQSxHQUFBLENBTEE7QUFPQSxFQUFBLFFBQUEsRUFBQSxJQUFBLE1BQUEsQ0FBQSxnQ0FBQSxFQUFBLEdBQUEsQ0FQQTtBQVdBLEVBQUEsU0FBQSxFQUFBLEtBWEE7QUFZQyxFQUFBLFlBQVcsRUFBQSxLQVpaO0FBYUMsRUFBQSxpQkFBYyxFQUFLLEtBYnBCO0FBY0MsRUFBQSxVQUFBLEVBQUEsS0FkRDtBQWtCQSxFQUFBLGVBQUEsRUFBQSxDQUFBLENBQUEsUUFBQSxFQWxCQTtBQXNCQSxFQUFBLE9BQUEsRUFBQSxFQXRCQTtBQXVCQyxFQUFBLFFBQVEsRUFBQyxFQXZCVjtBQXlCQSxFQUFBLFNBQUEsRUFBQSxFQXpCQTtBQTBCQyxFQUFBLFFBQUEsRUFBVSxFQTFCWDtBQTRCQSxFQUFBLFFBQUEsRUFBQSxLQTVCQTtBQTZCQyxFQUFBLFNBQVMsRUFBQyxJQTdCWDtBQThCQyxFQUFBLFFBQUEsRUFBVSxJQTlCWDtBQWtDQSxFQUFBLHNCQUFBLEVBQUEsSUFBQSxZQUNDO0FBQ0MsU0FBQSxPQUFBLEdBQUEsWUFBQSxDQUFBLENBQUE7O0FBQ0EsU0FBSyxNQUFMLEdBQWMsWUFBVyxDQUFDLENBQTFCOztBQUNBLFNBQUssT0FBTCxHQUFjLFlBQVcsQ0FBRyxDQUE1Qjs7QUFDQSxTQUFLLFFBQUwsR0FBZSxZQUFXLENBQUcsQ0FBN0I7QUFDQSxHQU5GLEVBbENBO0FBbURBLEVBQUEsU0FBQSxFQUFBLEdBbkRBO0FBMERBLEVBQUEsU0FBQSxFQUFBLEdBMURBO0FBaUVBLEVBQUEsSUFBQSxFQUFBLEVBakVBO0FBd0VBLEVBQUEsSUFBQSxFQUFBLEVBeEVBO0FBOEVBLEVBQUEsQ0FBQSxFQUFBLGFBQ0M7QUFBQTs7QUFLRCxRQUFBLEdBQUEsR0FBQSxTQUFBLENBQUEsWUFBQSxFQUFBO0FBRUEsUUFBQSxHQUFBLEdBQUEsR0FBQSxDQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUE7O0FBRUEsUUFBQSxHQUFBLEdBQUEsQ0FBQSxFQUNFO0FBR0YsVUFBQSxLQUFBLEdBQUEsR0FBQSxDQUFBLFNBQUEsQ0FBQSxHQUFBLEVBQUEsV0FBQSxFQUFBO0FBSUEsV0FBQSxTQUFBLEdBQUEsS0FBQSxDQUFBLE9BQUEsQ0FBQSxVQUFBLEtBQUEsQ0FBQTtBQUVBLFdBQUEsWUFBQSxHQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsYUFBQSxLQUFBLENBQUE7QUFFQSxXQUFBLGlCQUFBLEdBQUEsS0FBQSxDQUFBLE9BQUEsQ0FBQSxrQkFBQSxLQUFBLENBQUE7QUFFQSxXQUFBLFVBQUEsR0FBQSxLQUFBLENBQUEsT0FBQSxDQUFBLFdBQUEsS0FBQSxDQUFBO0FBR0c7O0FBTUgsU0FBQSxTQUFBLEdBQUEsU0FBQSxDQUFBLFlBQUEsRUFBQTtBQUNFLFNBQUssU0FBTCxHQUFpQixTQUFTLENBQUMsWUFBVixFQUFqQjtBQUVGLFNBQUEsSUFBQSxHQUFBLFNBQUEsQ0FBQSxPQUFBLEVBQUE7QUFDRSxTQUFLLElBQUwsR0FBWSxTQUFTLENBQUMsT0FBVixFQUFaO0FBTUYsUUFBQSxZQUFBLEdBQUEsRUFBQTtBQUNFLFFBQU0sV0FBQSxHQUFjLEVBQXBCOztBQUlGLFFBQUEsQ0FBQSxNQUFBLENBQUEsTUFBQSxFQUNFO0FBQ0MsTUFBQSxXQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsU0FBQSxHQUFBLG1CQUFBO0FBQ0E7O0FBRUgsUUFBQSxDQUFBLE1BQUEsQ0FBQSxNQUFBLEVBQ0U7QUFDQyxNQUFBLFdBQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxTQUFBLEdBQUEsbUJBQUE7QUFDQTs7QUFJSCxRQUFBLE9BQUEsTUFBQSxDQUFBLEVBQUEsQ0FBQSxNQUFBLEtBQUEsVUFBQSxFQUNFO0FBQ0MsTUFBQSxXQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsU0FBQSxHQUFBLDBCQUFBO0FBQ0E7O0FBSUgsUUFBQSxDQUFBLEtBQUEsWUFBQSxJQUFBLE9BQUEsTUFBQSxDQUFBLEVBQUEsQ0FBQSxLQUFBLEtBQUEsVUFBQSxFQUNFO0FBQ0MsTUFBQSxZQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsU0FBQSxHQUFBLHdCQUFBO0FBQ0EsTUFBQSxXQUFBLENBQVksSUFBWixDQUFpQixLQUFLLFNBQUwsR0FBaUIsc0JBQWxDO0FBQ0E7O0FBRUgsUUFBQSxDQUFBLEtBQUEsaUJBQUEsSUFBQSxPQUFBLE1BQUEsQ0FBQSxFQUFBLENBQUEsY0FBQSxLQUFBLFVBQUEsRUFDRTtBQUNDLE1BQUEsWUFBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLFNBQUEsR0FBQSx1Q0FBQTtBQUNBLE1BQUEsV0FBQSxDQUFZLElBQVosQ0FBaUIsS0FBSyxTQUFMLEdBQWlCLHFDQUFsQztBQUNBOztBQUVILFFBQUEsQ0FBQSxLQUFBLFVBQUEsSUFBQSxPQUFBLE1BQUEsQ0FBQSxFQUFBLENBQUEsT0FBQSxLQUFBLFVBQUEsRUFDRTtBQUNDLE1BQUEsWUFBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLFNBQUEsR0FBQSxzQkFBQTtBQUNBLE1BQUEsV0FBQSxDQUFZLElBQVosQ0FBaUIsS0FBSyxTQUFMLEdBQWlCLG9CQUFsQztBQUNBOztBQUlILFNBQUEsYUFBQSxXQUNNLFlBRE4sR0FFRyxLQUFHLFNBQUgsR0FBZ0IsMkJBRm5CLEVBR0csS0FBSyxTQUFMLEdBQWlCLGtCQUhwQixHQUlHLFdBSkgsR0FLRyxJQUxILENBS00sWUFBWTtBQUVsQixNQUFBLE1BQUEsQ0FBQSxlQUFBLENBQUEsT0FBQTtBQUVBLEtBVEEsRUFTQSxJQVRBLENBU0EsVUFBQSxPQUFBLEVBQUE7QUFFQSxNQUFBLE1BQUEsQ0FBQSxlQUFBLENBQUEsTUFBQSxDQUFBLE9BQUE7QUFDRyxLQVpIO0FBZUUsR0FwTEY7QUErTEEsRUFBQSxVQUFBLEVBQUEsc0JBQ0M7QUFDQyxXQUFBLEtBQUEsU0FBQTtBQUNBLEdBbE1GO0FBMk1BLEVBQUEsT0FBQSxFQUFBLG1CQUNDO0FBQ0MsV0FBQSxRQUFBLENBQUEsUUFBQSxDQUFBLFFBQUEsS0FBQSxPQUFBLElBRU8sUUFBRSxDQUFBLFFBQUYsQ0FBRSxRQUFGLEtBQUUsV0FGVCxJQUlPLFFBQUUsQ0FBQSxRQUFGLENBQUUsUUFBRixLQUFFLFdBSlQsSUFNTyxRQUFFLENBQUEsUUFBRixDQUFFLFFBQUYsS0FBRSxLQU5UO0FBUUEsR0FyTkY7QUEyTkEsRUFBQSxNQUFBLEVBQUEsZ0JBQUEsQ0FBQSxFQUNDO0FBQ0MsUUFBQSxJQUFBLEdBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxRQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQTtBQUVGLFdBQUEsSUFBQSxDQUFBLFVBQUEsQ0FBQSxVQUFBLElBQUEsSUFBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLEVBQUEsSUFBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsR0FDdUQsRUFEdkQ7QUFHRSxHQWxPRjtBQXNPQSxFQUFBLE9BQUEsRUFBQSxpQkFBQSxDQUFBLEVBQ0M7QUFDQyxXQUFBLEtBQUEsTUFBQSxDQUFBLENBQUEsTUFBQSxPQUFBLEdBQUEsQ0FBQSxHQUNvQyxDQUFDLENBQUQsQ0FEcEM7QUFHQSxHQTNPRjtBQStPQSxFQUFBLEtBQUEsRUFBQSxlQUFBLFdBQUEsRUFBQSxjQUFBLEVBQUEsUUFBQSxFQUNDO0FBQ0MsUUFBQSxNQUFBLEdBQUEsRUFBQTtBQUlGLFFBQUEsQ0FBQSxHQUFBLFdBQUEsQ0FBQSxNQUFBO0FBQ0UsUUFBTSxDQUFDLEdBQUcsY0FBWSxDQUFBLE1BQXRCOztBQUVGLFFBQUEsQ0FBQSxLQUFBLENBQUEsRUFDRTtBQUNDLFlBQUEsZ0JBQUE7QUFDQTs7QUFJSCxRQUFBLFFBQUEsRUFBQTtBQUNFLFdBQUcsSUFBQSxDQUFBLEdBQVUsQ0FBYixFQUFjLENBQUEsR0FBQSxDQUFkLEVBQWMsQ0FBQSxFQUFkLEVBQWM7QUFDYixRQUFBLE1BQU8sQ0FBQyxJQUFSLENBQWEsV0FBVSxDQUFBLENBQUEsQ0FBVixJQUFlLFFBQWYsR0FBZSxRQUFBLENBQUEsV0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFmLEdBQWUsY0FBQSxDQUFBLENBQUEsQ0FBNUI7QUFDQztBQUNELEtBSkgsTUFLRztBQUNELFdBQUssSUFBQyxJQUFBLEdBQUEsQ0FBTixFQUFNLElBQUEsR0FBQSxDQUFOLEVBQU0sSUFBQSxFQUFOLEVBQU07QUFDTCxRQUFBLE1BQU8sQ0FBQyxJQUFSLENBQTRCLGNBQUEsQ0FBQSxJQUFBLENBQTVCO0FBQ0M7QUFDRDs7QUFJSCxXQUFBLE1BQUE7QUFDRSxHQTdRRjtBQWlSQSxFQUFBLE9BQUEsRUFBQSxPQUFBLENBQUEsTUFBQSxDQUFBLFFBalJBO0FBcVJBLEVBQUEsWUFBQSxFQUFBLENBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxDQXJSQTtBQXNSQyxFQUFBLFlBQVksRUFBRSxDQUFBLE9BQUEsRUFBVSxRQUFWLEVBQW9CLE1BQXBCLEVBQTRCLE1BQTVCLENBdFJmO0FBOFJBLEVBQUEsVUFBQSxFQUFBLG9CQUFBLENBQUEsRUFDQztBQUNDLFdBQUEsS0FBQSxPQUFBLENBQUEsQ0FBQSxJQUFBLEVBQUEsRUFBQSxLQUFBLFlBQUEsRUFBQSxLQUFBLFlBQUEsQ0FBQTtBQUNBLEdBalNGO0FBeVNBLEVBQUEsVUFBQSxFQUFBLG9CQUFBLENBQUEsRUFDQztBQUNDLFdBQUEsS0FBQSxPQUFBLENBQUEsQ0FBQSxJQUFBLEVBQUEsRUFBQSxLQUFBLFlBQUEsRUFBQSxLQUFBLFlBQUEsQ0FBQTtBQUNBLEdBNVNGO0FBZ1RBLEVBQUEsY0FBQSxFQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxDQWhUQTtBQWlUQyxFQUFBLGNBQWMsRUFBRSxDQUFBLE1BQUEsRUFBUyxLQUFULEVBQWdCLEtBQWhCLEVBQXVCLE1BQXZCLENBalRqQjtBQXlUQSxFQUFBLFlBQUEsRUFBQSxzQkFBQSxDQUFBLEVBQ0M7QUFDQyxXQUFBLEtBQUEsT0FBQSxDQUFBLENBQUEsSUFBQSxFQUFBLEVBQUEsS0FBQSxjQUFBLEVBQUEsS0FBQSxjQUFBLENBQUE7QUFDQSxHQTVURjtBQW9VQSxFQUFBLFlBQUEsRUFBQSxzQkFBQSxDQUFBLEVBQ0M7QUFDQyxXQUFBLEtBQUEsT0FBQSxDQUFBLENBQUEsSUFBQSxFQUFBLEVBQUEsS0FBQSxjQUFBLEVBQUEsS0FBQSxjQUFBLENBQUE7QUFFRixHQXhVQTtBQTRVQSxFQUFBLGNBQUEsRUFBQSxDQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxFQUFBLElBQUEsQ0E1VUE7QUE2VUMsRUFBQSxjQUFjLEVBQUUsQ0FBQSxNQUFBLEVBQVMsS0FBVCxFQUFnQixVQUFoQixFQUE0QixNQUE1QixDQTdVakI7QUFxVkEsRUFBQSxZQUFBLEVBQUEsc0JBQUEsQ0FBQSxFQUNDO0FBQ0MsV0FBQSxLQUFBLE9BQUEsQ0FBQSxDQUFBLElBQUEsRUFBQSxFQUFBLEtBQUEsY0FBQSxFQUFBLEtBQUEsY0FBQSxDQUFBO0FBQ0EsR0F4VkY7QUFnV0EsRUFBQSxZQUFBLEVBQUEsc0JBQUEsQ0FBQSxFQUNDO0FBQ0MsV0FBQSxLQUFBLE9BQUEsQ0FBQSxDQUFBLElBQUEsRUFBQSxFQUFBLEtBQUEsY0FBQSxFQUFBLEtBQUEsY0FBQSxDQUFBO0FBQ0EsR0FuV0Y7QUF1V0EsRUFBQSxXQUFBLEVBQUEsQ0FBQSxJQUFBLENBdldBO0FBd1dDLEVBQUEsV0FBVyxFQUFFLENBQUEsTUFBQSxDQXhXZDtBQWdYQSxFQUFBLFNBQUEsRUFBQSxtQkFBQSxDQUFBLEVBQ0M7QUFDQyxXQUFBLEtBQUEsT0FBQSxDQUFBLENBQUEsSUFBQSxFQUFBLEVBQUEsS0FBQSxXQUFBLEVBQUEsS0FBQSxXQUFBLENBQUE7QUFDQSxHQW5YRjtBQTJYQSxFQUFBLFNBQUEsRUFBQSxtQkFBQSxDQUFBLEVBQ0M7QUFDQyxXQUFBLEtBQUEsT0FBQSxDQUFBLENBQUEsSUFBQSxFQUFBLEVBQUEsS0FBQSxXQUFBLEVBQUEsS0FBQSxXQUFBLENBQUE7QUFDQSxHQTlYRjtBQW9ZQSxFQUFBLE9BQUEsRUFBQSxrRUFwWUE7QUE4WUEsRUFBQSxZQUFBLEVBQUEsc0JBQUEsQ0FBQSxFQUNDO0FBQ0MsUUFBQSxDQUFBO0FBRUYsUUFBQSxDQUFBLEdBQUEsRUFBQTtBQUVBLFFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxNQUFBO0FBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUE7QUFFQSxRQUFBLFdBQUEsR0FBQSxLQUFBLE9BQUE7O0FBRUEsU0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsR0FDRTtBQUNDLE1BQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxFQUFBLEtBQUEsRUFBQSxHQUVJLENBQUMsQ0FBQSxVQUFELENBQUMsQ0FBQSxFQUFELEtBQUMsQ0FGTCxHQUlJLENBQUMsQ0FBQSxVQUFELENBQUMsQ0FBQSxFQUFELEtBQUMsQ0FKTDtBQU9ILE1BQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsSUFBQSxFQUFBLEdBQUEsSUFBQSxDQUFBO0FBQ0csTUFBQSxDQUFDLENBQUMsSUFBRixDQUFPLFdBQVcsQ0FBQyxNQUFaLENBQW9CLENBQUMsSUFBSSxFQUFQLEdBQWEsSUFBL0IsQ0FBUDtBQUNBLE1BQUEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxXQUFXLENBQUMsTUFBWixDQUFvQixDQUFDLElBQUksQ0FBUCxHQUFZLElBQTlCLENBQVA7QUFDQSxNQUFBLENBQUMsQ0FBQyxJQUFGLENBQU8sV0FBVyxDQUFDLE1BQVosQ0FBb0IsQ0FBQyxJQUFJLENBQVAsR0FBWSxJQUE5QixDQUFQO0FBQ0E7O0FBRUgsUUFBQSxDQUFBLEtBQUEsQ0FBQSxFQUFBO0FBQ0UsTUFBQSxDQUFBLENBQUEsTUFBQSxDQUFVLENBQUEsQ0FBVixFQUFjLENBQWQ7QUFDQyxLQUZILE1BR0csSUFBQSxDQUFBLEtBQUEsQ0FBQSxFQUFBO0FBQ0QsTUFBQSxDQUFBLENBQUEsTUFBQSxDQUFVLENBQUEsQ0FBVixFQUFjLENBQWQ7QUFDQzs7QUFFSCxXQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQSxDQUFBO0FBQ0UsR0EvYUY7QUF5YkEsRUFBQSxZQUFBLEVBQUEsc0JBQUEsQ0FBQSxFQUNDO0FBQ0MsUUFBQSxDQUFBO0FBRUYsUUFBQSxDQUFBLEdBQUEsRUFBQTtBQUVBLFFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxNQUFBO0FBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUE7QUFFQSxRQUFBLFdBQUEsR0FBQSxLQUFBLE9BQUE7O0FBRUEsU0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsR0FDRTtBQUNDLE1BQUEsQ0FBQSxHQUFBLFdBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxLQUFBLEVBQUEsR0FFSSxXQUFDLENBQUEsT0FBRCxDQUFDLENBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxFQUFBLENBQUQsS0FBQyxFQUZMLEdBSUksV0FBQyxDQUFBLE9BQUQsQ0FBQyxDQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsRUFBQSxDQUFELEtBQUMsQ0FKTCxHQU1JLFdBQUMsQ0FBQSxPQUFELENBQUMsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBRCxLQUFDLENBTkw7QUFTSCxNQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLFlBQUEsQ0FBQSxDQUFBLEtBQUEsRUFBQSxHQUFBLElBQUEsQ0FBQTtBQUNHLE1BQUEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxNQUFNLENBQUMsWUFBUCxDQUFxQixDQUFDLEtBQUssQ0FBUixHQUFhLElBQWhDLENBQVA7QUFDQSxNQUFBLENBQUMsQ0FBQyxJQUFGLENBQU8sTUFBTSxDQUFDLFlBQVAsQ0FBcUIsQ0FBQyxLQUFLLENBQVIsR0FBYSxJQUFoQyxDQUFQO0FBQ0E7O0FBRUgsUUFBQSxDQUFBLEtBQUEsQ0FBQSxFQUFBO0FBQ0UsTUFBQSxDQUFBLENBQUEsTUFBQSxDQUFVLENBQUEsQ0FBVixFQUFjLENBQWQ7QUFDQyxLQUZILE1BR0csSUFBQSxDQUFBLEtBQUEsQ0FBQSxFQUFBO0FBQ0QsTUFBQSxDQUFBLENBQUEsTUFBQSxDQUFVLENBQUEsQ0FBVixFQUFjLENBQWQ7QUFDQzs7QUFFSCxXQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQSxDQUFBO0FBQ0UsR0EzZEY7QUFpZUEsRUFBQSxhQUFBLEVBQUEsdUJBQUEsR0FBQSxFQUNDO0FBQ0MsUUFBQSxHQUFBLEdBQUEsR0FBQSxDQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUE7QUFFRixXQUFBLEdBQUEsR0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLFNBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxFQUFBO0FBQ0UsR0F0ZUY7QUEwZUEsRUFBQSxZQUFBLEVBQUEsc0JBQUEsR0FBQSxFQUFBLFFBQUEsRUFDQztBQUNDLFFBQUEsTUFBQTs7QUFFRixRQUFBLFFBQUEsS0FBQSxNQUFBLEVBQ0U7QUFDQyxVQUFBLEdBQUEsQ0FBQSxPQUFBLENBQUEsT0FBQSxNQUFBLENBQUEsRUFDQTtBQUNDLFFBQUEsTUFBQSxHQUFBLFNBQUE7QUFDQSxPQUhELE1BSUMsSUFBQSxHQUFBLENBQUEsT0FBQSxDQUFBLFNBQUEsTUFBQSxDQUFBLEVBQ0Q7QUFDQyxRQUFBLE1BQUEsR0FBQSxRQUFBO0FBQ0EsT0FIQSxNQUtEO0FBQ0MsZ0JBQUEsS0FBQSxhQUFBLENBQUEsR0FBQSxFQUFBLFdBQUEsRUFBQTtBQUVDLGVBQUEsTUFBQTtBQUNBLFlBQUEsTUFBTyxHQUFHLE9BQVY7QUFDQzs7QUFFTixlQUFBLEtBQUE7QUFDSyxZQUFBLE1BQU8sR0FBRSxRQUFUO0FBQ0M7O0FBRU4sZUFBQSxPQUFBO0FBQ0ssWUFBQSxNQUFPLEdBQUEsTUFBUDtBQUNDOztBQUVOLGVBQUEsTUFBQTtBQUNLLFlBQUEsTUFBTyxHQUFHLEtBQVY7QUFDQzs7QUFFTjtBQUNLLFlBQUEsTUFBTyxHQUFDLE1BQVI7QUFDQztBQXBCRjtBQXNCQTtBQUNELEtBbkNILE1BcUNFO0FBQ0MsTUFBQSxNQUFBLEdBQUEsUUFBQTtBQUNBOztBQUVILFdBQUEsTUFBQTtBQUNFLEdBeGhCRjtBQTRoQkEsRUFBQSxTQUFBLEVBQUEsbUJBQUEsUUFBQSxFQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsRUFDQztBQUFBOztBQUNDLFFBQUEsSUFBQSxDQUFBLE1BQUEsS0FBQSxDQUFBLEVBQ0E7QUFDQyxhQUFBLFFBQUEsQ0FBQSxXQUFBLENBQUEsT0FBQSxFQUFBLENBQUEsTUFBQSxDQUFBLENBQUE7QUFDQTs7QUFJSCxRQUFBLEdBQUEsR0FBQSxJQUFBLENBQUEsS0FBQSxHQUFBLElBQUEsRUFBQTs7QUFJQSxRQUFBLFFBQUEsR0FBQSxLQUFBLFlBQUEsQ0FBQSxHQUFBLEVBQUEsUUFBQSxDQUFBOztBQUlBLFlBQUEsUUFBQTtBQU1BLFdBQUEsU0FBQTtBQUVBLGFBQUEsV0FBQSxDQUFBLEdBQUEsRUFBQSxJQUFBLENBQUEsVUFBQSxJQUFBLEVBQUE7QUFFQSxVQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsSUFBQTtBQUVBLGlCQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsUUFBQSxFQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQTtBQUVBLFNBTkEsRUFNQSxVQUFBLE9BQUEsRUFBQTtBQUVBLGlCQUFBLFFBQUEsQ0FBQSxVQUFBLENBQUEsT0FBQSxFQUFBLENBQUEsT0FBQSxDQUFBLENBQUE7QUFDSyxTQVRMO0FBV0E7O0FBTUEsV0FBQSxRQUFBO0FBRUEsYUFBQSxVQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsQ0FBQSxVQUFBLElBQUEsRUFBQTtBQUVBLFVBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBO0FBRUEsaUJBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxRQUFBLEVBQUEsTUFBQSxFQUFBLElBQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxDQUFBO0FBRUEsU0FOQSxFQU1BLFVBQUEsT0FBQSxFQUFBO0FBRUEsaUJBQUEsUUFBQSxDQUFB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QUFDQSxVQUFNLE9BQUEsR0FBVSxFQUFoQjtBQUNBLFVBQU0sT0FBTyxHQUFHLEVBQWhCO0FBRUgsTUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLHFDQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLElBQUEsRUFBQTtBQUVBLFFBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFDSSxPQUhKO0FBS0EsTUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLG9DQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLElBQUEsRUFBQTtBQUVBLFFBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFDSSxPQUhKO0FBS0EsTUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLG9DQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLElBQUEsRUFBQTtBQUVBLFFBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFDSSxPQUhKO0FBS0EsTUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLCtCQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUVBLFlBQUEsSUFBQSxHQUFBLEVBQUE7QUFDSSxZQUFJLElBQU0sR0FBQyxFQUFYO0FBRUosUUFBQSxHQUFBLENBQUEsS0FBQSxDQUFBLE9BQUEsQ0FBQSxVQUFBLEtBQUEsRUFBQTtBQUVBLFVBQUEsSUFBQSxDQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUE7O0FBRUEsY0FBQSxLQUFBLENBQUEsT0FBQSxDQUFBLEtBQUEsTUFBQSxFQUNLO0FBQ0MsWUFBQSxJQUFBLEdBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUNBO0FBQ0QsU0FSTDtBQVVBLFFBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLElBQUE7QUFDSSxPQWhCSjtBQWtCQSxNQUFBLE1BQUEsQ0FBQSxXQUFBLENBQUEsT0FBQSxFQUFBLENBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLENBQUE7QUFFQSxLQTFDQSxFQTBDQSxVQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7QUFFQSxNQUFBLE1BQUEsQ0FBQSxVQUFBLENBQUEsT0FBQSxFQUFBLENBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUFBLFFBQUEsT0FBQSxFQUFBLE9BQUE7QUFBQSxRQUFBLFNBQUEsRUFBQTtBQUFBLE9BQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQTtBQUNHLEtBN0NIO0FBaURBLFdBQUEsTUFBQSxDQUFBLE9BQUEsRUFBQTtBQUNFLEdBL05GO0FBeU9BLEVBQUEsU0FBQSxFQUFBLG1CQUFBLFFBQUEsRUFDQztBQUNDLFFBQUEsTUFBQSxHQUFBLENBQUEsQ0FBQSxRQUFBLEVBQUE7O0FBREQsNEJBR0QsU0FBQSxDQUFBLEtBQUEsQ0FDRSxDQUFBLFNBQUEsQ0FERixFQUVHLENBQUEsTUFBQSxDQUZILEVBR0csUUFISCxDQUhDO0FBQUEsUUFHRCxPQUhDOztBQVdELFNBQUEsT0FBQSxDQUFBLGdCQUFBLEVBQUEsSUFBQSxDQUFBLFVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUVBLFVBQUEsUUFBQSxHQUFBLEVBQUE7QUFDRyxVQUFNLFFBQVEsR0FBRyxFQUFqQjtBQUNBLFVBQU0sT0FBQSxHQUFVLEVBQWhCO0FBQ0EsVUFBTSxPQUFPLEdBQUcsRUFBaEI7QUFFSCxNQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEscUNBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsSUFBQSxFQUFBO0FBRUEsUUFBQSxRQUFBLENBQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUNJLE9BSEo7QUFLQSxNQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsb0NBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsSUFBQSxFQUFBO0FBRUEsUUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUNJLE9BSEo7QUFLQSxNQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsb0NBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsSUFBQSxFQUFBO0FBRUEsUUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUNJLE9BSEo7QUFLQSxNQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsK0JBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBRUEsWUFBQSxJQUFBLEdBQUEsRUFBQTtBQUNJLFlBQUksSUFBTSxHQUFDLEVBQVg7QUFFSixRQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUEsT0FBQSxDQUFBLFVBQUEsS0FBQSxFQUFBO0FBRUEsVUFBQSxJQUFBLENBQUEsS0FBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQTs7QUFFQSxjQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsS0FBQSxNQUFBLEVBQ0s7QUFDQyxZQUFBLElBQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxDQUFBO0FBQ0E7QUFDRCxTQVJMO0FBVUEsUUFBQSxRQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsSUFBQTtBQUNJLE9BaEJKO0FBa0JBLE1BQUEsTUFBQSxDQUFBLFdBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsQ0FBQTtBQUVBLEtBMUNBLEVBMENBLFVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUVBLE1BQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO0FBQUEsUUFBQSxPQUFBLEVBQUEsT0FBQTtBQUFBLFFBQUEsU0FBQSxFQUFBO0FBQUEsT0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxDQUFBO0FBQ0csS0E3Q0g7QUFpREEsV0FBQSxNQUFBLENBQUEsT0FBQSxFQUFBO0FBQ0UsR0F2U0Y7QUFpVEEsRUFBQSxNQUFBLEVBQUEsZ0JBQUEsUUFBQSxFQUNDO0FBQ0MsUUFBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLFFBQUEsRUFBQTs7QUFERCw0QkFHRCxTQUFBLENBQUEsS0FBQSxDQUNFLENBQUEsU0FBQSxDQURGLEVBRUcsQ0FBQSxNQUFBLENBRkgsRUFHRyxRQUhILENBSEM7QUFBQSxRQUdELE9BSEM7O0FBV0QsU0FBQSxPQUFBLENBQUEsd0NBQUEsRUFBQTtBQUFBLE1BQUEsVUFBQSxFQUFBO0FBQUEsS0FBQSxFQUFBLElBQUEsQ0FBQSxVQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7QUFFQSxVQUFBLFFBQUEsR0FBQSxFQUFBO0FBQ0csVUFBTSxRQUFRLEdBQUcsRUFBakI7QUFDQSxVQUFNLE9BQUEsR0FBVSxFQUFoQjtBQUNBLFVBQU0sT0FBTyxHQUFHLEVBQWhCO0FBRUgsTUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLHFDQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLElBQUEsRUFBQTtBQUVBLFFBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFDSSxPQUhKO0FBS0EsTUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLG9DQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLElBQUEsRUFBQTtBQUVBLFFBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFDSSxPQUhKO0FBS0EsTUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLG9DQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLElBQUEsRUFBQTtBQUVBLFFBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFDSSxPQUhKO0FBS0EsTUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLCtCQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUVBLFlBQUEsSUFBQSxHQUFBLEVBQUE7QUFDSSxZQUFJLElBQU0sR0FBQyxFQUFYO0FBRUosUUFBQSxHQUFBLENBQUEsS0FBQSxDQUFBLE9BQUEsQ0FBQSxVQUFBLEtBQUEsRUFBQTtBQUVBLFVBQUEsSUFBQSxDQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUE7O0FBRUEsY0FBQSxLQUFBLENBQUEsT0FBQSxDQUFBLEtBQUEsTUFBQSxFQUNLO0FBQ0MsWUFBQSxJQUFBLEdBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUNBO0FBQ0QsU0FSTDtBQVVBLFFBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLElBQUE7QUFDSSxPQWhCSjtBQWtCQSxNQUFBLE1BQUEsQ0FBQSxXQUFBLENBQUEsT0FBQSxFQUFBLENBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLENBQUE7QUFFQSxLQTFDQSxFQTBDQSxVQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7QUFFQSxNQUFBLE1BQUEsQ0FBQSxVQUFBLENBQUEsT0FBQSxFQUFBLENBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUFBLFFBQUEsT0FBQSxFQUFBLE9BQUE7QUFBQSxRQUFBLFNBQUEsRUFBQTtBQUFBLE9BQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQTtBQUNHLEtBN0NIO0FBaURBLFdBQUEsTUFBQSxDQUFBLE9BQUEsRUFBQTtBQUNFLEdBL1dGO0FBMlhBLEVBQUEsVUFBQSxFQUFBLG9CQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxFQUNDO0FBQ0MsV0FBQSxLQUFBLE9BQUEsQ0FBQSwyQ0FBQSxTQUFBLENBQUEsWUFBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLGtCQUFBLEdBQUEsU0FBQSxDQUFBLFlBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxHQUFBLEVBQUEsUUFBQSxDQUFBO0FBQ0EsR0E5WEY7QUEwWUEsRUFBQSxVQUFBLEVBQUEsb0JBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxRQUFBLEVBQ0M7QUFDQyxXQUFBLEtBQUEsT0FBQSxDQUFBLDJDQUFBLFNBQUEsQ0FBQSxZQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsa0JBQUEsR0FBQSxTQUFBLENBQUEsWUFBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLEdBQUEsRUFBQSxRQUFBLENBQUE7QUFDQSxHQTdZRjtBQThaQSxFQUFBLE9BQUEsRUFBQSxpQkFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLFNBQUEsRUFBQSxRQUFBLEVBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQSxLQUFBLEVBQUEsUUFBQSxFQUNDO0FBQ0MsV0FBQSxLQUFBLE9BQUEsQ0FBQSx3QkFBQSxTQUFBLENBQUEsWUFBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLGtCQUFBLEdBQUEsU0FBQSxDQUFBLFlBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxnQkFBQSxHQUFBLFNBQUEsQ0FBQSxZQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsZUFBQSxHQUFBLFNBQUEsQ0FBQSxZQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsWUFBQSxHQUFBLFNBQUEsQ0FBQSxZQUFBLENBQUEsS0FBQSxDQUFBLEdBQUEsR0FBQSxJQUFBLE1BQUEsR0FBQSxVQUFBLEdBQUEsRUFBQSxLQUFBLEtBQUEsR0FBQSxTQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsUUFBQSxDQUFBO0FBQ0EsR0FqYUY7QUE4YUEsRUFBQSxVQUFBLEVBQUEsb0JBQUEsU0FBQSxFQUFBLFFBQUEsRUFBQSxLQUFBLEVBQUEsUUFBQSxFQUNDO0FBQ0MsV0FBQSxLQUFBLE9BQUEsQ0FBQSw2QkFBQSxTQUFBLENBQUEsWUFBQSxDQUFBLFNBQUEsQ0FBQSxHQUFBLGVBQUEsR0FBQSxTQUFBLENBQUEsWUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLFlBQUEsR0FBQSxTQUFBLENBQUEsWUFBQSxDQUFBLEtBQUEsQ0FBQSxHQUFBLEdBQUEsRUFBQSxRQUFBLENBQUE7QUFDQSxHQWpiRjtBQThiQSxFQUFBLFVBQUEsRUFBQSxvQkFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLEVBQ0M7QUFDQyxXQUFBLEtBQUEsT0FBQSxDQUFBLCtCQUFBLFNBQUEsQ0FBQSxZQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEscUJBQUEsR0FBQSxTQUFBLENBQUEsWUFBQSxDQUFBLE9BQUEsQ0FBQSxHQUFBLHFCQUFBLEdBQUEsU0FBQSxDQUFBLFlBQUEsQ0FBQSxPQUFBLENBQUEsR0FBQSxHQUFBLEVBQUEsUUFBQSxDQUFBO0FBQ0EsR0FqY0Y7QUE0Y0EsRUFBQSxTQUFBLEVBQUEsbUJBQUEsSUFBQSxFQUFBLFFBQUEsRUFDQztBQUNDLFdBQUEsS0FBQSxPQUFBLENBQUEsOEJBQUEsU0FBQSxDQUFBLFlBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxHQUFBLEVBQUEsUUFBQSxDQUFBO0FBQ0E7QUEvY0YsQ0FBQSxDQUFBO0FDQUEsYUFBQSxDQUFBLFVBQUEsRUFBQTtBQUtBLEVBQUEsNkJBQUEsRUFBQSxJQUxBO0FBTUMsRUFBQSxnQ0FBK0IsRUFBQSxJQU5oQztBQU9DLEVBQUEsb0JBQUEsRUFBQSxJQVBEO0FBUUMsRUFBQSxpQkFBQSxFQUFBLElBUkQ7QUFTQyxFQUFBLHFCQUFtQixFQUFJLElBVHhCO0FBVUMsRUFBQSx3QkFBdUIsRUFBQSxJQVZ4QjtBQWNBLEVBQUEsSUFBQSxFQUFBLE9BZEE7QUFlQyxFQUFBLEtBQUssRUFBRSxPQWZSO0FBaUJBLEVBQUEsUUFBQSxFQUFBLEVBakJBO0FBa0JDLEVBQUEsUUFBUSxFQUFFLEVBbEJYO0FBb0JBLEVBQUEsU0FBQSxFQUFBLEVBcEJBO0FBcUJDLEVBQUEsUUFBQSxFQUFVLEVBckJYO0FBeUJBLEVBQUEsUUFBQSxFQUFBLEVBekJBO0FBMEJDLEVBQUEsUUFBUSxFQUFFLEVBMUJYO0FBMkJDLEVBQUEsT0FBQSxFQUFTLEVBM0JWO0FBNEJDLEVBQUEsT0FBTyxFQUFFLEVBNUJWO0FBa0NBLEVBQUEsTUFBQSxFQUFBLGdCQUFBLDZCQUFBLEVBQUEsZ0NBQUEsRUFBQSxvQkFBQSxFQUFBLGlCQUFBLEVBQUEscUJBQUEsRUFBQSx3QkFBQSxFQUNDO0FBQUE7O0FBQ0MsUUFBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLFFBQUEsRUFBQTtBQUlGLElBQUEsU0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUNFLFNBQVUsQ0FBQSxTQUFWLEdBQXFCLHNDQUR2QixFQUVHLFNBQVMsQ0FBQyxTQUFWLEdBQXNCLHVDQUZ6QixFQUdHLFNBQVMsQ0FBQyxTQUFWLEdBQXNCLDRCQUh6QixDQUFBLEVBSUcsSUFKSCxDQUlHLFVBQUEsSUFBQSxFQUFVO0FBSWIsTUFBQSxPQUFBLENBQUEsbUJBQUEsR0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0csTUFBQSxPQUFJLENBQUMsb0JBQUwsR0FBMkIsSUFBSyxDQUFDLENBQUQsQ0FBaEM7QUFJSCxVQUFBLElBQUEsR0FBQTtBQUNHLFFBQUEsNkJBQWMsRUFBQSxPQUFBLENBQUEsNkJBQUEsR0FBQSw2QkFEakI7QUFFSSxRQUFBLGdDQUErQixFQUFBLE9BQUssQ0FBQSxnQ0FBTCxHQUFxQyxnQ0FGeEU7QUFHSSxRQUFBLG9CQUFBLEVBQUEsT0FBQSxDQUFBLG9CQUFBLEdBQXVDLG9CQUgzQztBQUlJLFFBQUEsaUJBQUEsRUFBQSxPQUFzQixDQUFBLGlCQUF0QixHQUEyQixpQkFKL0I7QUFLSSxRQUFBLHFCQUFtQixFQUFJLE9BQUMsQ0FBQSxxQkFBRCxHQUFxQixxQkFMaEQ7QUFNSSxRQUFBLHdCQUF1QixFQUFBLE9BQUssQ0FBQSx3QkFBTCxHQUE2QjtBQU54RCxPQUFBO0FBV0EsTUFBQSxTQUFBLENBQUEsVUFBQSxDQUFBLE1BQUEsRUFBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUE7QUFBQSxRQUFBLElBQUEsRUFBQTtBQUFBLE9BQUEsRUFBQSxJQUFBLENBQUEsWUFBQTtBQUlBLFFBQUEsQ0FBQSxDQUFBLHVDQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsVUFBQSxDQUFBLEVBQUE7QUFFQSxVQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQTtBQUNLLFNBSEw7QUFLQSxRQUFBLENBQUEsQ0FBQSx1Q0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxFQUFBO0FBRUEsVUFBQSxPQUFBLENBQUEsWUFBQSxDQUFBLENBQUE7QUFDSyxTQUhMO0FBS0EsUUFBQSxDQUFBLENBQUEsdUNBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxVQUFBLENBQUEsRUFBQTtBQUVBLFVBQUEsT0FBQSxDQUFBLGVBQUEsQ0FBQSxDQUFBO0FBQ0ssU0FITDtBQUtBLFFBQUEsQ0FBQSxDQUFBLHVDQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsVUFBQSxDQUFBLEVBQUE7QUFFQSxVQUFBLE9BQUEsQ0FBQSxlQUFBLENBQUEsQ0FBQTtBQUNLLFNBSEw7QUFLQSxRQUFBLENBQUEsQ0FBQSx1Q0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxFQUFBO0FBRUEsVUFBQSxPQUFBLENBQUEsZUFBQSxDQUFBLENBQUE7QUFDSyxTQUhMO0FBT0EsUUFBQSxDQUFBLENBQUEsNkVBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxZQUFBO0FBRUEsY0FBQSxLQUFBLEdBQUEsQ0FBQSxDQUFBLHVDQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUE7QUFDSyxjQUFNLEtBQUssR0FBRyxDQUFBLENBQUEsdUNBQUEsQ0FBQSxDQUEyQyxHQUEzQyxFQUFkO0FBRUwsVUFBQSxDQUFBLENBQUEsdUNBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUEsaUJBQUEsQ0FDSyxLQUFJLENBQUEsTUFBSixHQUFJLENBQUosSUFBSSxLQUFBLENBQUEsTUFBQSxHQUFBLENBQUosSUFBd0MsS0FBTSxLQUFJLEtBQWxELEdBQWtELHlCQUFsRCxHQUFvRSxFQUR6RTtBQUdLLFNBUkw7QUFVQSxRQUFBLENBQUEsQ0FBQSw2RUFBQSxDQUFBLENBQUEsTUFBQSxDQUFBLFlBQUE7QUFFQSxjQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsdUNBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQTtBQUNLLGNBQU0sS0FBSyxHQUFHLENBQUEsQ0FBQSx1Q0FBQSxDQUFBLENBQTJDLEdBQTNDLEVBQWQ7QUFFTCxVQUFBLENBQUEsQ0FBQSx1Q0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsRUFBQSxpQkFBQSxDQUNLLEtBQUksQ0FBQSxNQUFKLEdBQUksQ0FBSixJQUFJLEtBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBSixJQUF3QyxLQUFNLEtBQUksS0FBbEQsR0FBa0QseUJBQWxELEdBQW9FLEVBRHpFO0FBR0ssU0FSTDtBQVdJLE9BcERKO0FBd0RBLE1BQUEsTUFBQSxDQUFBLGdCQUFBLENBQUEsU0FBQSxFQUFBLFVBQUEsQ0FBQSxFQUFBO0FBRUEsWUFBQSxPQUFBLENBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxFQUNJO0FBQ0MsY0FBQSxJQUFBLEdBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBO0FBQ0EsY0FBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUYsQ0FBTyxJQUFwQjs7QUFFTCxjQUFBLElBQUEsSUFBQSxJQUFBLEVBQ0s7QUFDQyxZQUFBLE9BQUEsQ0FBQSxXQUFBLENBQUEsSUFBQSxFQUFBLElBQUE7QUFDQTs7QUFFTixVQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsS0FBQTtBQUNLO0FBRUwsT0FmQSxFQWVBLEtBZkE7QUFtQkEsVUFBQSxRQUFBLEdBQUEsU0FBQSxDQUFBLElBQUEsQ0FBQSxVQUFBLEtBQUEsRUFBQTtBQUlBLE1BQUEsV0FBQSxDQUFBLFlBQUE7QUFFQSxZQUFBLFNBQUEsQ0FBQSxRQUFBLEVBQ0k7QUFDQyxVQUFBLFVBQUEsQ0FBQSxTQUFBLEdBQUEsSUFBQSxDQUFBLFVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUVMLFlBQUEsU0FBQSxDQUFBLEtBQUEsQ0FBQSxPQUFBLEVBQUEsSUFBQTtBQUVBLFdBSkssRUFJTCxJQUpLLENBSUwsVUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQTtBQUVBLGdCQUFBLENBQUEsUUFBQSxDQUFBLE9BQUEsSUFBQSxFQUFBLE9BQUEsUUFBQSxDQUFBLFNBQUEsSUFBQSxFQUFBLENBQUEsRUFDTTtBQUNDLGNBQUEsT0FBQSxDQUFBLE9BQUEsQ0FBQSxRQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBO0FBQ0E7QUFDRCxXQVZEO0FBV0E7QUFFTCxPQWpCQSxFQWlCQSxLQUFBLElBakJBLENBQUE7QUFxQkEsTUFBQSxVQUFBLENBQUEsU0FBQSxHQUFBLElBQUEsQ0FBQSxVQUFBLElBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBO0FBRUEsUUFBQSxPQUFBLENBQUEsT0FBQSxDQUFBLFFBQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxNQUFBLENBQUEsWUFBQTtBQUVBLFVBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxPQUFBO0FBQ0ssU0FITDtBQUtBLE9BUEEsRUFPQSxJQVBBLENBT0EsVUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQTtBQUVBLFFBQUEsa0JBQUEsQ0FBQSxTQUFBLENBQUEsT0FBQSxDQUFBLFFBQUEsQ0FBQSxFQUFBLFlBQUE7QUFFQSxVQUFBLFNBQUEsQ0FBQSxRQUFBLEdBQUEsSUFBQTs7QUFFQSxVQUFBLE9BQUEsQ0FBQSxPQUFBLENBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBLElBQUEsQ0FBQSxVQUFBLE9BQUEsRUFBQTtBQUVB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SUYsUUFBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxlQUFBLEVBQUE7QUFJQSxJQUFBLFNBQUEsQ0FBQSxJQUFBO0FBRUEsSUFBQSxVQUFBLENBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxPQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsTUFBQSxDQUFBLEVBQUEsTUFBQSxDQUFBLFlBQUEsQ0FBQSxFQUFBLE1BQUEsQ0FBQSxXQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsT0FBQSxDQUFBLEVBQUEsWUFBQSxNQUFBLEVBQUEsV0FBQSxNQUFBLEVBQUEsSUFBQSxDQUFBLFVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUVBLE1BQUEsT0FBQSxDQUFBLFFBQUEsQ0FBQSxPQUFBO0FBRUEsS0FKQSxFQUlBLFVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUVBLE1BQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxPQUFBO0FBQ0csS0FQSDtBQVVFLEdBajNCRjtBQXEzQkEsRUFBQSxlQUFBLEVBQUEseUJBQUEsQ0FBQSxFQUNDO0FBQUE7O0FBQ0MsSUFBQSxDQUFBLENBQUEsY0FBQTtBQUlGLFFBQUEsTUFBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsZUFBQSxFQUFBO0FBSUEsSUFBQSxTQUFBLENBQUEsSUFBQTtBQUVBLElBQUEsVUFBQSxDQUFBLFNBQUEsQ0FBQSxNQUFBLENBQUEsTUFBQSxDQUFBLEVBQUEsSUFBQSxDQUFBLFVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUVBLE1BQUEsT0FBQSxDQUFBLFFBQUEsQ0FBQSxPQUFBO0FBRUEsS0FKQSxFQUlBLFVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUVBLE1BQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxPQUFBO0FBQ0csS0FQSDtBQVVFLEdBMzRCRjtBQSs0QkEsRUFBQSxlQUFBLEVBQUEseUJBQUEsQ0FBQSxFQUNDO0FBQUE7O0FBQ0MsSUFBQSxDQUFBLENBQUEsY0FBQTtBQUlGLFFBQUEsTUFBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsZUFBQSxFQUFBO0FBSUEsSUFBQSxTQUFBLENBQUEsSUFBQTtBQUVBLElBQUEsVUFBQSxDQUFBLFVBQUEsQ0FBQSxNQUFBLENBQUEsWUFBQSxDQUFBLEVBQUEsTUFBQSxDQUFBLFdBQUEsQ0FBQSxFQUFBLE1BQUEsQ0FBQSxPQUFBLENBQUEsRUFBQSxJQUFBLENBQUEsVUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO0FBRUEsTUFBQSxPQUFBLENBQUEsUUFBQSxDQUFBLE9BQUE7QUFFQSxLQUpBLEVBSUEsVUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO0FBRUEsTUFBQSxPQUFBLENBQUEsTUFBQSxDQUFBLE9BQUE7QUFDRyxLQVBIO0FBVUUsR0FyNkJGO0FBeTZCQSxFQUFBLGVBQUEsRUFBQSx5QkFBQSxDQUFBLEVBQ0M7QUFBQTs7QUFDQyxJQUFBLENBQUEsQ0FBQSxjQUFBO0FBSUYsUUFBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxlQUFBLEVBQUE7QUFJQSxJQUFBLFNBQUEsQ0FBQSxJQUFBO0FBRUEsSUFBQSxVQUFBLENBQUEsVUFBQSxDQUFBLEtBQUEsSUFBQSxFQUFBLE1BQUEsQ0FBQSxVQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsVUFBQSxDQUFBLEVBQUEsSUFBQSxDQUFBLFVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUVBLE1BQUEsT0FBQSxDQUFBLFFBQUEsQ0FBQSxPQUFBO0FBRUEsS0FKQSxFQUlBLFVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUVBLE1BQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxPQUFBO0FBQ0csS0FQSDtBQVVFO0FBLzdCRixDQUFBLENBQUE7Ozs7Ozs7Ozs7OztBQ01BLElBQUEsTUFBQSxHQUFBO0FBQUEsZUFBQSxDQUFBO0FBQUEsWUFBQSxlQUFBO0FBQUEsWUFBQSx3QkFBQTtBQUFBLGNBQUEsQ0FBQTtBQUFBLGNBQUEsT0FBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsb0JBQUE7QUFBQSxpQkFBQSxFQUFBO0FBQUEsa0JBQUEsRUFBQTtBQUFBLGtCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSxvQkFBQTtBQUFBLGlCQUFBLEVBQUE7QUFBQSxrQkFBQSxJQUFBO0FBQUEsa0JBQUE7QUFBQSxLQUFBO0FBQUEsR0FBQSxFQUFBO0FBQUEsWUFBQSxlQUFBO0FBQUEsWUFBQSx3QkFBQTtBQUFBLGNBQUEsQ0FBQTtBQUFBLGNBQUEsT0FBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsb0JBQUE7QUFBQSxpQkFBQSxFQUFBO0FBQUEsa0JBQUEsRUFBQTtBQUFBLGtCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSxvQkFBQTtBQUFBLGlCQUFBLEVBQUE7QUFBQSxrQkFBQSxJQUFBO0FBQUEsa0JBQUE7QUFBQSxLQUFBO0FBQUEsR0FBQSxFQUFBO0FBQUEsWUFBQSxXQUFBO0FBQUEsWUFBQSxvQkFBQTtBQUFBLGNBQUEsQ0FBQTtBQUFBLGNBQUEsT0FBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsZ0JBQUE7QUFBQSxpQkFBQSxFQUFBO0FBQUEsa0JBQUEsRUFBQTtBQUFBLGtCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSxnQkFBQTtBQUFBLGlCQUFBLEVBQUE7QUFBQSxrQkFBQSxJQUFBO0FBQUEsa0JBQUE7QUFBQSxLQUFBO0FBQUEsR0FBQSxDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLFlBQUEsV0FBQTtBQUFBLFlBQUEsK0JBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsY0FBQSxjQUFBO0FBQUEsY0FBQSwyQkFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsY0FBQTtBQUFBLGNBQUEscUJBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGNBQUE7QUFBQSxjQUFBLHFCQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSx3Q0FBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsa0RBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLGdCQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSx3QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxhQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxXQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSw0QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFdBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLE9BQUE7QUFBQSxjQUFBLG9EQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxvQkFBQTtBQUFBLGNBQUEsNEJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxjQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsaUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLHFCQUFBO0FBQUEsY0FBQSxtQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGNBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxpQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUE7QUFBQSxHQUFBLEVBQUE7QUFBQSxZQUFBLFdBQUE7QUFBQSxZQUFBLDBCQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxNQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsTUFBQTtBQUFBLGNBQUEsZ0JBQUE7QUFBQSxjQUFBO0FBQUEsS0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsd0RBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLHNGQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSw0Q0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHNCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSw4Q0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLG9CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxjQUFBO0FBQUEsY0FBQSx5REFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHNCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxjQUFBO0FBQUEsY0FBQSwyREFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLG9CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxjQUFBO0FBQUEsY0FBQSx5REFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHNCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxjQUFBO0FBQUEsY0FBQSwyREFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLG9CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSwyQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHNCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSw2Q0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLG9CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxjQUFBO0FBQUEsY0FBQSw2QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLG9CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxjQUFBO0FBQUEsY0FBQSw2QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLG9CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxlQUFBO0FBQUEsY0FBQSw2Q0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsUUFBQSxDQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsaUNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLENBQUEsT0FBQSxFQUFBLFFBQUEsQ0FBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGFBQUE7QUFBQSxjQUFBLGlDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLENBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSxpQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsUUFBQSxDQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsVUFBQTtBQUFBLGNBQUEsZ0NBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLENBQUEsT0FBQSxFQUFBLFFBQUEsQ0FBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLGlDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLENBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSxpQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsUUFBQSxDQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsaUNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLENBQUEsT0FBQSxFQUFBLFFBQUEsQ0FBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGFBQUE7QUFBQSxjQUFBLDJHQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEscUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHVEQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxhQUFBO0FBQUEsY0FBQSwrR0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHFCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSx1REFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsOEdBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxxQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsdURBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLHlGQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsaUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLENBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQTtBQUFBLGdCQUFBLGdCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEseUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLGtGQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLE1BQUE7QUFBQSxjQUFBLDJCQUFBO0FBQUEsZ0JBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLDZCQUFBO0FBQUEsZ0JBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLHdCQUFBO0FBQUEsZ0JBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLHdCQUFBO0FBQUEsZ0JBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFVBQUE7QUFBQSxjQUFBLDhHQUFBO0FBQUEsZ0JBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGFBQUE7QUFBQSxjQUFBLCtHQUFBO0FBQUEsZ0JBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLE1BQUE7QUFBQSxjQUFBLHlCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxDQUFBLFFBQUEsRUFBQSxPQUFBLENBQUE7QUFBQSxnQkFBQSxhQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsMkNBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsMkJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLENBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQTtBQUFBLGdCQUFBLGFBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSwyQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSwyQkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBO0FBQUEsZ0JBQUEsYUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLDJDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLE9BQUE7QUFBQSxjQUFBLDBCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxDQUFBLFFBQUEsRUFBQSxPQUFBLENBQUE7QUFBQSxnQkFBQSxhQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsMkNBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsT0FBQTtBQUFBLGNBQUEsa0JBQUE7QUFBQSxnQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsZ0JBQUE7QUFBQSxjQUFBLDBCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsT0FBQTtBQUFBLGNBQUEsNEJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxxUUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxhQUFBO0FBQUEsY0FBQSxnQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLDJCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGVBQUE7QUFBQSxjQUFBLGlDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxxQkFBQTtBQUFBLGNBQUEsNkNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsdUJBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxpQkFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLGdCQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsMEJBQUE7QUFBQSxjQUFBLGdEQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLHVCQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsaUJBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxnQkFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsMEJBQUE7QUFBQSxjQUFBLGdFQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsSUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLGdCQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsK0JBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxHQUFBO0FBQUEsZ0JBQUEsZUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxpQkFBQTtBQUFBLGNBQUEsdUJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsZUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSw2REFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxpQkFBQTtBQUFBLGdCQUFBLEdBQUE7QUFBQSxnQkFBQSxrRUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsQ0FBQTtBQUFBLGNBQUEsQ0FBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsOEVBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLG1GQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQTtBQUFBLEdBQUEsRUFBQTtBQUFBLFlBQUEsWUFBQTtBQUFBLFlBQUEsMkJBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsY0FBQSxVQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUE7QUFBQSxLQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSx5QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGFBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSx3RkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsMkJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsY0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSx3QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSxVQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLHdCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGNBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsd0JBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsY0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSxpQkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxjQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFdBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsZ0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxlQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsV0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLGdDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEscUNBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsaUNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsV0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxnQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxXQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLDhCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsNkJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBO0FBQUEsR0FBQSxFQUFBO0FBQUEsWUFBQSxVQUFBO0FBQUEsWUFBQSxrQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxjQUFBLGFBQUE7QUFBQSxjQUFBLDJCQUFBO0FBQUEsZ0JBQUEsRUFBQTtB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QUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsMkdBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxxQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsd0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGFBQUE7QUFBQSxjQUFBLCtHQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEscUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHdDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSw4R0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHFCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSx3Q0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEseUNBQUE7QUFBQSxnQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsVUFBQTtBQUFBLGNBQUEsb0NBQUE7QUFBQSxnQkFBQTtBQUFBLEtBQUE7QUFBQSxHQUFBLEVBQUE7QUFBQSxZQUFBLGFBQUE7QUFBQSxZQUFBLG1DQUFBO0FBQUEsa0JBQUEsRUFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSxpREFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsR0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsa0RBQUE7QUFBQSxnQkFBQSxDQUFBO0FB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QSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHdDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSx5Q0FBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxVQUFBO0FBQUEsY0FBQSxvQ0FBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQTtBQUFBLEdBQUEsRUFBQTtBQUFBLFlBQUEsWUFBQTtBQUFBLFlBQUEsK0JBQUE7QUFBQSxrQkFBQSxDQUFBLGFBQUEsQ0FBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxtQkFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLGlEQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxHQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSxrREFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsR0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsd0JBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLEdBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFVBQUE7QUFBQSxjQUFBLHlCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxHQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQTtBQUFBLEdBQUE7QUFBQSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgVHdpZyBFbmdpbmVcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQte3tZRUFSfX0gVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxudmFyIGFtaVR3aWcgPSB7XG5cdHZlcnNpb246ICcxLjEuMCdcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogZXhwb3J0cy5hbWlUd2lnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaWYodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKVxue1xuXHRhbWlUd2lnLmZzID0gcmVxdWlyZSgnZnMnKTtcblxuXHRtb2R1bGUuZXhwb3J0cy5hbWlUd2lnID0gYW1pVHdpZztcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcudG9rZW5pemVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG9rZW5pemVyID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRva2VuaXplOiBmdW5jdGlvbihjb2RlLCBsaW5lLCBzcGFjZXMsIHRva2VuRGVmcywgdG9rZW5UeXBlcywgZXJyb3IpXG5cdHtcblx0XHRpZih0b2tlbkRlZnMubGVuZ3RoICE9PSB0b2tlblR5cGVzLmxlbmd0aClcblx0XHR7XG5cdFx0XHR0aHJvdyAnYHRva2VuRGVmcy5sZW5ndGggIT0gdG9rZW5UeXBlcy5sZW5ndGhgJztcblx0XHR9XG5cblx0XHRjb25zdCByZXN1bHRfdG9rZW5zID0gW107XG5cdFx0Y29uc3QgcmVzdWx0X3R5cGVzID0gW107XG5cdFx0Y29uc3QgcmVzdWx0X2xpbmVzID0gW107XG5cblx0XHRsZXQgaSA9IDB4MDAwMDAwMDAwO1xuXHRcdGNvbnN0IGwgPSBjb2RlLmxlbmd0aDtcblxuXHRcdGxldCB3b3JkID0gJycsIHRva2VuLCBjO1xuXG5fX2wwOlx0XHR3aGlsZShpIDwgbClcblx0XHR7XG5cdFx0XHRjID0gY29kZS5jaGFyQXQoMCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQ09VTlQgTElORVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYoYyA9PT0gJ1xcbicpXG5cdFx0XHR7XG5cdFx0XHRcdGxpbmUrKztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFQVQgU1BBQ0VTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihzcGFjZXMuaW5kZXhPZihjKSA+PSAwKVxuXHRcdFx0e1xuXHRcdFx0XHRpZih3b3JkKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoZXJyb3IpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ2ludmFsaWQgdG9rZW4gYCcgKyB3b3JkICsgJ2AnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh3b3JkKTtcblx0XHRcdFx0XHRyZXN1bHRfdHlwZXMucHVzaCgtMSk7XG5cdFx0XHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG5cdFx0XHRcdFx0d29yZCA9ICcnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29kZSA9IGNvZGUuc3Vic3RyaW5nKDEpO1xuXHRcdFx0XHRpICs9IDE7XG5cblx0XHRcdFx0Y29udGludWUgX19sMDtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFQVQgUkVHRVhFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRmb3IoY29uc3QgaiBpbiB0b2tlbkRlZnMpXG5cdFx0XHR7XG5cdFx0XHRcdHRva2VuID0gdGhpcy5fbWF0Y2goY29kZSwgdG9rZW5EZWZzW2pdKTtcblxuXHRcdFx0XHRpZih0b2tlbilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKHdvcmQpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYoZXJyb3IpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRocm93ICdpbnZhbGlkIHRva2VuIGAnICsgd29yZCArICdgJztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmVzdWx0X3Rva2Vucy5wdXNoKHdvcmQpO1xuXHRcdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2goLTEpO1xuXHRcdFx0XHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG5cdFx0XHRcdFx0XHR3b3JkID0gJyc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVzdWx0X3Rva2Vucy5wdXNoKHRva2VuKTtcblx0XHRcdFx0XHRyZXN1bHRfdHlwZXMucHVzaCh0b2tlblR5cGVzW2pdKTtcblx0XHRcdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcblxuXHRcdFx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZyh0b2tlbi5sZW5ndGgpO1xuXHRcdFx0XHRcdGkgKz0gdG9rZW4ubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Y29udGludWUgX19sMDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVBVCBSRU1BSU5JTkcgQ0hBUkFDVEVSRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHdvcmQgKz0gYztcblxuXHRcdFx0Y29kZSA9IGNvZGUuc3Vic3RyaW5nKDEpO1xuXHRcdFx0aSArPSAxO1xuXG4vKlx0XHRcdGNvbnRpbnVlIF9fbDA7XG4gKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdGlmKHdvcmQpXG5cdFx0e1xuXHRcdFx0aWYoZXJyb3IpXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdpbnZhbGlkIHRva2VuIGAnICsgd29yZCArICdgJztcblx0XHRcdH1cblxuXHRcdFx0cmVzdWx0X3Rva2Vucy5wdXNoKHdvcmQpO1xuXHRcdFx0cmVzdWx0X3R5cGVzLnB1c2goLTEpO1xuXHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG4vKlx0XHRcdHdvcmQgPSAnJztcbiAqL1x0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9rZW5zOiByZXN1bHRfdG9rZW5zLFxuXHRcdFx0dHlwZXM6IHJlc3VsdF90eXBlcyxcblx0XHRcdGxpbmVzOiByZXN1bHRfbGluZXMsXG5cdFx0fTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9tYXRjaDogZnVuY3Rpb24ocywgc3RyaW5nT3JSZWdFeHApXG5cdHtcblx0XHRsZXQgbTtcblxuXHRcdGlmKHN0cmluZ09yUmVnRXhwIGluc3RhbmNlb2YgUmVnRXhwKVxuXHRcdHtcblx0XHRcdG0gPSBzLm1hdGNoKHN0cmluZ09yUmVnRXhwKTtcblxuXHRcdFx0cmV0dXJuIG0gIT09IG51bGwgJiYgdGhpcy5fY2hlY2tOZXh0Q2hhcihzLCAvKi0qL21bMF0vKi0qLykgPyAvKi0qL21bMF0vKi0qLyA6IG51bGw7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRtID0gcy5pbmRleE9mKHN0cmluZ09yUmVnRXhwKTtcblxuXHRcdFx0cmV0dXJuIG0gPT09IDB4MDAgJiYgdGhpcy5fY2hlY2tOZXh0Q2hhcihzLCBzdHJpbmdPclJlZ0V4cCkgPyBzdHJpbmdPclJlZ0V4cCA6IG51bGw7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2FsbnVtOiBbXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLFxuXHRcdDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDAsIDEsXG5cdFx0MCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSxcblx0XHQxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XSxcblxuXHRfY2hlY2tOZXh0Q2hhcjogZnVuY3Rpb24ocywgdG9rZW4pXG5cdHtcblx0XHRjb25zdCBsZW5ndGggPSB0b2tlbi5sZW5ndGg7XG5cblx0XHRjb25zdCBjaGFyQ29kZTIgPSBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMCk7XG5cdFx0Y29uc3QgY2hhckNvZGUxID0gcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDEpO1xuXG5cdFx0cmV0dXJuIGlzTmFOKGNoYXJDb2RlMilcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdGhpcy5fYWxudW1bY2hhckNvZGUyXSA9PT0gMFxuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0aGlzLl9hbG51bVtjaGFyQ29kZTFdID09PSAwXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByID0ge307XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLnRva2VucyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLnRva2VucyA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIENPTVBPU0lURSBUT0tFTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLklTX1hYWCA9IFtcblx0XHRcdHRoaXMuREVGSU5FRCxcblx0XHRcdHRoaXMuTlVMTCxcblx0XHRcdHRoaXMuRU1QVFksXG5cdFx0XHR0aGlzLklURVJBQkxFLFxuXHRcdFx0dGhpcy5FVkVOLFxuXHRcdFx0dGhpcy5PREQsXG5cdFx0XTtcblxuXHRcdHRoaXMuWFhYX1dJVEggPSBbXG5cdFx0XHR0aGlzLlNUQVJUU19XSVRILFxuXHRcdFx0dGhpcy5FTkRTX1dJVEgsXG5cdFx0XTtcblxuXHRcdHRoaXMuUExVU19NSU5VUyA9IFtcblx0XHRcdHRoaXMuQ09OQ0FULFxuXHRcdFx0dGhpcy5QTFVTLFxuXHRcdFx0dGhpcy5NSU5VUyxcblx0XHRdO1xuXG5cdFx0dGhpcy5NVUxfRkxESVZfRElWX01PRCA9IFtcblx0XHRcdHRoaXMuTVVMLFxuXHRcdFx0dGhpcy5GTERJVixcblx0XHRcdHRoaXMuRElWLFxuXHRcdFx0dGhpcy5NT0QsXG5cdFx0XTtcblxuXHRcdHRoaXMuUlggPSBbXG5cdFx0XHR0aGlzLlJQLFxuXHRcdFx0dGhpcy5SQjEsXG5cdFx0XTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBSRUFMIFRPS0VOUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdExPR0lDQUxfT1I6IDEwMCxcblx0TE9HSUNBTF9BTkQ6IDEwMSxcblx0QklUV0lTRV9PUjogMTAyLFxuXHRCSVRXSVNFX1hPUjogMTAzLFxuXHRCSVRXSVNFX0FORDogMTA0LFxuXHROT1Q6IDEwNSxcblx0SVM6IDEwNixcblx0REVGSU5FRDogMTA3LFxuXHROVUxMOiAxMDgsXG5cdEVNUFRZOiAxMDksXG5cdElURVJBQkxFOiAxMTAsXG5cdEVWRU46IDExMSxcblx0T0REOiAxMTIsXG5cdENNUF9PUDogMTEzLFxuXHRTVEFSVFNfV0lUSDogMTE0LFxuXHRFTkRTX1dJVEg6IDExNSxcblx0TUFUQ0hFUzogMTE2LFxuXHRJTjogMTE3LFxuXHRSQU5HRTogMTE4LFxuXHRDT05DQVQ6IDExOSxcblx0UExVUzogMTIwLFxuXHRNSU5VUzogMTIxLFxuXHRQT1dFUjogMTIyLFxuXHRNVUw6IDEyMyxcblx0RkxESVY6IDEyNCxcblx0RElWOiAxMjUsXG5cdE1PRDogMTI2LFxuIFx0RE9VQkxFX1FVRVNUSU9OOiAxMjcsXG4gXHRRVUVTVElPTjogMTI4LFxuXHRDT0xPTjogMTI5LFxuXHRET1Q6IDEzMCxcblx0Q09NTUE6IDEzMSxcblx0UElQRTogMTMyLFxuXHRMUDogMTMzLFxuXHRSUDogMTM0LFxuXHRMQjE6IDEzNSxcblx0UkIxOiAxMzYsXG5cdExCMjogMTM3LFxuXHRSQjI6IDEzOCxcblx0U0lEOiAxMzksXG5cdFRFUk1JTkFMOiAxNDAsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVklSVFVBTCBUT0tFTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRMU1Q6IDIwMCxcblx0RElDOiAyMDEsXG5cdEZVTjogMjAyLFxuXHRWQVI6IDIwMyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci50b2tlbnMuJGluaXQoKTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuVG9rZW5pemVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuVG9rZW5pemVyID0gZnVuY3Rpb24oY29kZSwgbGluZSkge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuX3NwYWNlcyA9IFsnICcsICdcXHQnLCAnXFxuJywgJ1xcciddO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fdG9rZW5EZWZzID0gW1xuXHRcdCdvcicsXG5cdFx0J2FuZCcsXG5cdFx0J2Itb3InLFxuXHRcdCdiLXhvcicsXG5cdFx0J2ItYW5kJyxcblx0XHQnbm90Jyxcblx0XHQnaXMnLFxuXHRcdCdkZWZpbmVkJyxcblx0XHQnbnVsbCcsXG5cdFx0J2VtcHR5Jyxcblx0XHQnaXRlcmFibGUnLFxuXHRcdCdldmVuJyxcblx0XHQnb2RkJyxcblx0XHQnPT09Jyxcblx0XHQnPT0nLFxuXHRcdCchPT0nLFxuXHRcdCchPScsXG5cdFx0Jzw9Jyxcblx0XHQnPj0nLFxuXHRcdCc8Jyxcblx0XHQnPicsXG5cdFx0L15zdGFydHNcXHMrd2l0aC8sXG5cdFx0L15lbmRzXFxzK3dpdGgvLFxuXHRcdCdtYXRjaGVzJyxcblx0XHQnaW4nLFxuXHRcdCcuLicsXG5cdFx0J34nLFxuXHRcdCcrJyxcblx0XHQnLScsXG5cdFx0JyoqJyxcblx0XHQnKicsXG5cdFx0Jy8vJyxcblx0XHQnLycsXG5cdFx0JyUnLFxuXHRcdCc/PycsXG5cdFx0Jz8nLFxuXHRcdCc6Jyxcblx0XHQnLicsXG5cdFx0JywnLFxuXHRcdCd8Jyxcblx0XHQnKCcsXG5cdFx0JyknLFxuXHRcdCdbJyxcblx0XHQnXScsXG5cdFx0J3snLFxuXHRcdCd9Jyxcblx0XHQndHJ1ZScsXG5cdFx0J2ZhbHNlJyxcblx0XHQvXlswLTldK1xcLlswLTldKy8sXG5cdFx0L15bMC05XSsvLFxuXHRcdC9eJyhcXFxcJ3xbXiddKSonLyxcblx0XHQvXlwiKFxcXFxcInxbXlwiXSkqXCIvLFxuXHRcdC9eW2EtekEtWl8kXVthLXpBLVowLTlfJF0qLyxcblx0XTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuX3Rva2VuVHlwZXMgPSBbXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX09SLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9BTkQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX09SLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9YT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX0FORCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLklTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuREVGSU5FRCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk5VTEwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FTVBUWSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLklURVJBQkxFLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRVZFTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk9ERCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlNUQVJUU19XSVRILFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRU5EU19XSVRILFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLklOLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DT05DQVQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5QTFVTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTUlOVVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5QT1dFUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1VTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkZMRElWLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRElWLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTU9ELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRE9VQkxFX1FVRVNUSU9OLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUVVFU1RJT04sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DT0xPTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUElQRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxQLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUlAsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MQjEsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQjEsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MQjIsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQjIsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5TSUQsXG5cdF07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLiRpbml0ID0gZnVuY3Rpb24oY29kZSwgbGluZSlcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHJlc3VsdCA9IGFtaVR3aWcudG9rZW5pemVyLnRva2VuaXplKFxuXHRcdFx0Y29kZSxcblx0XHRcdGxpbmUsXG5cdFx0XHR0aGlzLl9zcGFjZXMsXG5cdFx0XHR0aGlzLl90b2tlbkRlZnMsXG5cdFx0XHR0aGlzLl90b2tlblR5cGVzLFxuXHRcdFx0dHJ1ZVxuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnRva2VucyA9IHJlc3VsdC50b2tlbnM7XG5cdFx0dGhpcy50eXBlcyA9IHJlc3VsdC50eXBlcztcblxuXHRcdHRoaXMuaSA9IDA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLm5leHQgPSBmdW5jdGlvbihuID0gMSlcblx0e1xuXHRcdHRoaXMuaSArPSBuO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5pc0VtcHR5ID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaSA+PSB0aGlzLnRva2Vucy5sZW5ndGg7XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLnBlZWtUb2tlbiA9IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnRva2Vuc1t0aGlzLmldO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5wZWVrVHlwZSA9IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnR5cGVzW3RoaXMuaV07XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLmNoZWNrVHlwZSA9IGZ1bmN0aW9uKHR5cGUpXG5cdHtcblx0XHRpZih0aGlzLmkgPCB0aGlzLnRva2Vucy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0Y29uc3QgVFlQRSA9IHRoaXMudHlwZXNbdGhpcy5pXTtcblxuXHRcdFx0cmV0dXJuICh0eXBlIGluc3RhbmNlb2YgQXJyYXkpID8gKHR5cGUuaW5kZXhPZihUWVBFKSA+PSAwKSA6ICh0eXBlID09PSBUWVBFKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLiRpbml0KGNvZGUsIGxpbmUpO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5Db21waWxlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Db21waWxlciA9IGZ1bmN0aW9uKGNvZGUsIGxpbmUpIHtcblxuXHR0aGlzLiRpbml0KGNvZGUsIGxpbmUpO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Db21waWxlci5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKGNvZGUsIGxpbmUpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnRva2VuaXplciA9IG5ldyBhbWlUd2lnLmV4cHIuVG9rZW5pemVyKFxuXHRcdFx0dGhpcy5jb2RlID0gY29kZSxcblx0XHRcdHRoaXMubGluZSA9IGxpbmVcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5yb290Tm9kZSA9IHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuaXNFbXB0eSgpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIHVuZXhwZWN0ZWQgdG9rZW4gYCcgKyB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSArICdgJztcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yb290Tm9kZS5kdW1wKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU51bGxDb2FsZXNjaW5nOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VMb2dpY2FsT3IoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTnVsbENvYWxlc2NpbmcgOiBMb2dpY2FsT3IgKCc/PycgTG9naWNhbE9yKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkRPVUJMRV9RVUVTVElPTikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUxvZ2ljYWxPcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VMb2dpY2FsT3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUxvZ2ljYWxBbmQoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTG9naWNhbE9yIDogTG9naWNhbEFuZCAoJ29yJyBMb2dpY2FsQW5kKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfT1IpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VMb2dpY2FsQW5kKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUxvZ2ljYWxBbmQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VPcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBMb2dpY2FsQW5kIDogQml0d2lzZU9yICgnYW5kJyBCaXR3aXNlT3IpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9BTkQpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VCaXR3aXNlT3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQml0d2lzZU9yOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VCaXR3aXNlWG9yKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEJpdHdpc2VPciA6IEJpdHdpc2VYb3IgKCdiLW9yJyBCaXR3aXNlWG9yKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX09SKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQml0d2lzZVhvcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VCaXR3aXNlWG9yOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VCaXR3aXNlQW5kKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEJpdHdpc2VYb3IgOiBCaXR3aXNlQW5kICgnYi14b3InIEJpdHdpc2VBbmQpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX1hPUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUJpdHdpc2VBbmQoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQml0d2lzZUFuZDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTm90KCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEJpdHdpc2VBbmQgOiBOb3QgKCdiLWFuZCcgTm90KSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX0FORCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZU5vdCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VOb3Q6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBOb3QgOiAnbm90JyBDb21wICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQ29tcCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgfCBDb21wICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHRoaXMucGFyc2VDb21wKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUNvbXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUFkZFN1YigpLCByaWdodCwgbm9kZSwgc3dhcDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBDb21wIDogQWRkU3ViICdpcycgJ25vdCc/ICgnZGVmaW5lZCcgfCAnbnVsbCcgfCAuLi4pICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0LyoqLyBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdC8qIHN3YXAgJ2lzJyBhbmQgJ25vdCcgKi9cblx0XHRcdHN3YXAgPSBub2RlO1xuXHRcdFx0Lyogc3dhcCAnaXMnIGFuZCAnbm90JyAqL1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5OT1QpKVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUubm9kZUxlZnQgPSBudWxsO1xuXHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHN3YXA7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLklTX1hYWCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJpZ2h0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdHN3YXAubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0XHRzd2FwLm5vZGVSaWdodCA9IHJpZ2h0O1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGtleXdvcmQgYGRlZmluZWRgLCBgbnVsbGAsIGBlbXB0eWAsIGBpdGVyYWJsZWAsIGBldmVuYCBvciBgb2RkYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICgnPT09JyB8ICc9PScgfCAuLi4pIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1ApKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAoJ3N0YXJ0cycgfCAnZW5kcycpIGB3aXRoYCBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuWFhYX1dJVEgpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAnbWF0Y2hlcycgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICdpbicgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JTikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUFkZFN1YjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTXVsRGl2KCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEFkZFN1YiA6IE11bERpdiAoKCcrJyB8ICctJykgTXVsRGl2KSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QTFVTX01JTlVTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTXVsRGl2KCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU11bERpdjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlUGx1c01pbnVzKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE11bERpdiA6IFBsdXNNaW51cyAoKCcqJyB8ICcvLycgfCAnLycgfCAnJScpIFBsdXNNaW51cykqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5NVUxfRkxESVZfRElWX01PRCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZVBsdXNNaW51cygpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VQbHVzTWludXM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBQbHVzTWludXMgOiAoJy0nIHwgJysnKSBQb3dlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUExVU19NSU5VUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZVBvd2VyKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBudWxsO1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgICAgICB8IERvdDEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gdGhpcy5wYXJzZVBvd2VyKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVBvd2VyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VGaWx0ZXIoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogUG93ZXIgOiBGaWx0ZXIgKCcqKicgRmlsdGVyKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBPV0VSKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlRmlsdGVyKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUZpbHRlcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlRG90MSgpLCBub2RlLCB0ZW1wO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEZpbHRlciA6IERvdDEgKCd8JyBEb3QxKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QSVBFKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdG5vZGUgPSB0aGlzLnBhcnNlRG90MSh0cnVlKTtcblxuXHRcdFx0Zm9yKHRlbXAgPSBub2RlOyB0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDsgdGVtcCA9IHRlbXAubm9kZUxlZnQpO1xuXG5cdFx0XHR0ZW1wLmxpc3QudW5zaGlmdChsZWZ0KTtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDE6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0Y29uc3Qgbm9kZSA9IHRoaXMucGFyc2VEb3QyKGlzRmlsdGVyKTtcblxuXHRcdGlmKG5vZGUpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGxldCB0ZW1wID0gbm9kZTtcblxuXHRcdFx0Zm9yKDsgdGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5ET1Q7IHRlbXAgPSB0ZW1wLm5vZGVMZWZ0KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRlbXAucSlcblx0XHRcdHtcblx0XHRcdFx0LyoqLyBpZih0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKHRlbXAubm9kZVZhbHVlIGluIGFtaVR3aWcuc3RkbGliKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRlbXAubm9kZVZhbHVlID0gJ2FtaVR3aWcuc3RkbGliLicgKyB0ZW1wLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRlbXAubm9kZVZhbHVlID0gLyotLS0qLydfLicvKi0tLSovICsgdGVtcC5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYodGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5WQVIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9IC8qLS0tKi8nXy4nLyotLS0qLyArIHRlbXAubm9kZVZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGVtcC5xID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdHJldHVybiBub2RlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VEb3QyOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZURvdDMoaXNGaWx0ZXIpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBEb3QyIDogRG90MyAoJy4nIERvdDMpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuRE9UKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksICcuJyk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZURvdDMoaXNGaWx0ZXIpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VEb3QzOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZVgoaXNGaWx0ZXIpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBEb3QzIDogWCAoJ1snIE51bGxDb2FsZXNjaW5nICddJykqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIxKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMSkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKGFtaVR3aWcuZXhwci50b2tlbnMuRE9ULCAnW10nKTtcblxuXHRcdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgXWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgICAgIHwgWCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVg6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogWCA6IEdyb3VwIHwgQXJyYXkgfCBPYmplY3QgfCBGdW5WYXIgfCBUZXJtaW5hbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZUdyb3VwKCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VBcnJheSgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlT2JqZWN0KCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VGdW5WYXIoaXNGaWx0ZXIpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlVGVybWluYWwoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBTWU5UQVggRVJST1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBzeW50YXggZXJyb3Igb3IgdHVuY2F0ZWQgZXhwcmVzc2lvbic7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUdyb3VwOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBHcm91cCA6ICcoJyBOdWxsQ29hbGVzY2luZyAnKScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTFApKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0bm9kZSA9IHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SUCkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgKWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VBcnJheTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGUsIGxpc3Q7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQXJyYXkgOiAnWycgU2luZ2xldHMgJ10nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxCMSkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRsaXN0ID0gdGhpcy5fcGFyc2VTaW5nbGV0cygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjEpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkxTVCwgJ0FycmF5Jyk7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gbGlzdDtcblxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgXWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VPYmplY3Q6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBub2RlLCBkaWN0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE9iamVjdCA6ICd7JyBEb3VibGV0cyAnfScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MQjIpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0ZGljdCA9IHRoaXMuX3BhcnNlRG91YmxldHMoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIyKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoYW1pVHdpZy5leHByLnRva2Vucy5ESUMsICdPYmplY3QnKTtcblxuXHRcdFx0XHRub2RlLmRpY3QgPSBkaWN0O1xuXG5cdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGB9YCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUZ1blZhcjogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbm9kZTtcblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlNJRCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSgwLCBpc0ZpbHRlciA/ICdmaWx0ZXJfJyArIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpIDogdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXG5cdFx0XHRub2RlLnEgPSB0cnVlO1xuXG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRnVuVmFyIDogU0lEICcoJyBTaW5nbGV0cyAnKScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0LyoqLyBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MUCkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlLmxpc3QgPSB0aGlzLl9wYXJzZVNpbmdsZXRzKCk7XG5cblx0XHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUlApKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdFx0bm9kZS5ub2RlVHlwZSA9IGFtaVR3aWcuZXhwci50b2tlbnMuRlVOO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYClgIGV4cGVjdGVkJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qICAgICAgICB8IFNJRCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0bm9kZS5ub2RlVHlwZSA9IGlzRmlsdGVyID8gYW1pVHdpZy5leHByLnRva2Vucy5GVU5cblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgIDogYW1pVHdpZy5leHByLnRva2Vucy5WQVJcblx0XHRcdFx0O1xuXG5cdFx0XHRcdG5vZGUubGlzdCA9IFtdO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VTaW5nbGV0czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SWCkgPT09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHRoaXMuX3BhcnNlU2luZ2xldChyZXN1bHQpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DT01NQSkgPT09IHRydWUpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9wYXJzZURvdWJsZXRzOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSB7fTtcblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMikgPT09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHRoaXMuX3BhcnNlRG91YmxldChyZXN1bHQpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DT01NQSkgPT09IHRydWUpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9wYXJzZVNpbmdsZXQ6IGZ1bmN0aW9uKHJlc3VsdClcblx0e1xuXHRcdHJlc3VsdC5wdXNoKHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9wYXJzZURvdWJsZXQ6IGZ1bmN0aW9uKHJlc3VsdClcblx0e1xuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMKSlcblx0XHR7XG5cdFx0XHRjb25zdCBrZXkgPSB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ09MT04pKVxuXHRcdFx0e1xuLypcdFx0XHRcdGNvbnN0IGNvbG9uID0gdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCk7XG4gKi9cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdFtrZXldID0gdGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgOmAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCB0ZXJtaW5hbCBleHBlY3RlZCc7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VUZXJtaW5hbDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQsIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFRlcm1pbmFsIDogVEVSTUlOQUwgfCBSQU5HRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCkpXG5cdFx0e1xuXHRcdFx0bGVmdCA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJBTkdFKSlcblx0XHRcdHtcblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyaWdodCA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBsZWZ0O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5Ob2RlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ob2RlID0gZnVuY3Rpb24obm9kZVR5cGUsIG5vZGVWYWx1ZSkge1xuXG5cdHRoaXMuJGluaXQobm9kZVR5cGUsIG5vZGVWYWx1ZSk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLk5vZGUucHJvdG90eXBlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihub2RlVHlwZSwgbm9kZVZhbHVlKVxuXHR7XG5cdFx0dGhpcy5ub2RlVHlwZSA9IG5vZGVUeXBlO1xuXHRcdHRoaXMubm9kZVZhbHVlID0gbm9kZVZhbHVlO1xuXHRcdHRoaXMubm9kZUxlZnQgPSBudWxsO1xuXHRcdHRoaXMubm9kZVJpZ2h0ID0gbnVsbDtcblx0XHR0aGlzLmxpc3QgPSBudWxsO1xuXHRcdHRoaXMuZGljdCA9IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZHVtcDogZnVuY3Rpb24obm9kZXMsIGVkZ2VzLCBwQ250KVxuXHR7XG5cdFx0bGV0IENOVDtcblxuXHRcdGNvbnN0IGNudCA9IHBDbnRbMF07XG5cblx0XHRub2Rlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgW2xhYmVsPVwiJyArIHRoaXMubm9kZVZhbHVlLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICdcIl07Jyk7XG5cblx0XHRpZih0aGlzLm5vZGVMZWZ0KVxuXHRcdHtcblx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICc7Jyk7XG5cdFx0XHR0aGlzLm5vZGVMZWZ0Ll9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5ub2RlUmlnaHQpXG5cdFx0e1xuXHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJzsnKTtcblx0XHRcdHRoaXMubm9kZVJpZ2h0Ll9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5saXN0KVxuXHRcdHtcblx0XHRcdGZvcihjb25zdCBpIGluIHRoaXMubGlzdClcblx0XHRcdHtcblx0XHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnIFtsYWJlbD1cIlsnICsgaS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXVwiXTsnKTtcblx0XHRcdFx0dGhpcy5saXN0W2ldLl9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5kaWN0KVxuXHRcdHtcblx0XHRcdGZvcihjb25zdCBpIGluIHRoaXMuZGljdClcblx0XHRcdHtcblx0XHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnIFtsYWJlbD1cIlsnICsgaS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXVwiXTsnKTtcblx0XHRcdFx0dGhpcy5kaWN0W2ldLl9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZHVtcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3Qgbm9kZXMgPSBbXTtcblx0XHRjb25zdCBlZGdlcyA9IFtdO1xuXG5cdFx0dGhpcy5fZHVtcChub2RlcywgZWRnZXMsIFswXSk7XG5cblx0XHRyZXR1cm4gJ2RpZ3JhcGggYXN0IHtcXG5cXHRyYW5rZGlyPVRCO1xcbicgKyBub2Rlcy5qb2luKCdcXG4nKSArICdcXG4nICsgZWRnZXMuam9pbignXFxuJykgKyAnXFxufSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRtcGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRtcGwgPSB7fTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRtcGwuQ29tcGlsZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRtcGwuQ29tcGlsZXIgPSBmdW5jdGlvbih0bXBsKSB7XG5cblx0dGhpcy4kaW5pdCh0bXBsKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRtcGwuQ29tcGlsZXIucHJvdG90eXBlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFNUQVRFTUVOVF9SRTogL1xceyVcXHMqKFthLXpBLVpdKylcXHMqKCg/Oi58XFxuKSo/KVxccyolXFx9LyxcblxuXHRDT01NRU5UX1JFOiAvXFx7I1xccyooKD86LnxcXG4pKj8pXFxzKiNcXH0vZyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9jb3VudDogZnVuY3Rpb24ocylcblx0e1xuXHRcdGxldCByZXN1bHQgPSAwO1xuXG5cdFx0Y29uc3QgbCA9IHMubGVuZ3RoO1xuXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IGw7IGkrKylcblx0XHR7XG5cdFx0XHRpZihzW2ldID09PSAnXFxuJykgcmVzdWx0Kys7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbih0bXBsKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGxpbmUgPSAxO1xuXG5cdFx0bGV0IGNvbHVtbjtcblx0XHRsZXQgQ09MVU1OO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5yb290Tm9kZSA9IHtcblx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRrZXl3b3JkOiAnQHJvb3QnLFxuXHRcdFx0ZXhwcmVzc2lvbjogJycsXG5cdFx0XHRibG9ja3M6IFt7XG5cdFx0XHRcdGV4cHJlc3Npb246ICdAdHJ1ZScsXG5cdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0fV0sXG5cdFx0XHR2YWx1ZTogJycsXG5cdFx0fTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHN0YWNrMSA9IFt0aGlzLnJvb3ROb2RlXTtcblx0XHRjb25zdCBzdGFjazIgPSBbMHgwMDAwMDAwMDAwMF07XG5cblx0XHRsZXQgaXRlbTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGZvcih0bXBsID0gdG1wbC5yZXBsYWNlKHRoaXMuQ09NTUVOVF9SRSwgJycpOzsgdG1wbCA9IHRtcGwuc3Vic3RyKENPTFVNTikpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGN1cnIgPSBzdGFjazFbc3RhY2sxLmxlbmd0aCAtIDFdO1xuXHRcdFx0IGxldCAgaW5keCA9IHN0YWNrMltzdGFjazIubGVuZ3RoIC0gMV07XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBtID0gdG1wbC5tYXRjaCh0aGlzLlNUQVRFTUVOVF9SRSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihtID09PSBudWxsKVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxpbmUgKz0gdGhpcy5fY291bnQodG1wbCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjdXJyLmJsb2Nrc1tpbmR4XS5saXN0LnB1c2goe1xuXHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0a2V5d29yZDogJ0B0ZXh0Jyxcblx0XHRcdFx0XHRleHByZXNzaW9uOiAnJyxcblx0XHRcdFx0XHRibG9ja3M6IFtdLFxuXHRcdFx0XHRcdHZhbHVlOiB0bXBsLFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGVycm9ycyA9IFtdO1xuXG5cdFx0XHRcdGZvcihsZXQgaSA9IHN0YWNrMS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0LyoqLyBpZihzdGFjazFbaV0ua2V5d29yZCA9PT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRlcnJvcnMucHVzaCgnbWlzc2luZyBrZXl3b3JkIGBlbmRpZmAnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZihzdGFjazFbaV0ua2V5d29yZCA9PT0gJ2ZvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdCBcdGVycm9ycy5wdXNoKCdtaXNzaW5nIGtleXdvcmQgYGVuZGZvcmAnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihlcnJvcnMubGVuZ3RoID4gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsICcgKyBlcnJvcnMuam9pbignLCAnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBtYXRjaCA9IG1bMF07XG5cdFx0XHRjb25zdCBrZXl3b3JkID0gbVsxXTtcblx0XHRcdGNvbnN0IGV4cHJlc3Npb24gPSBtWzJdO1xuXG5cdFx0XHRjb2x1bW4gPSBtLmluZGV4ICsgMHgwMDAwMDAwMDAwO1xuXHRcdFx0Q09MVU1OID0gbS5pbmRleCArIG1hdGNoLmxlbmd0aDtcblxuXHRcdFx0Y29uc3QgdmFsdWUgPSB0bXBsLnN1YnN0cigwLCBjb2x1bW4pO1xuXHRcdFx0Y29uc3QgVkFMVUUgPSB0bXBsLnN1YnN0cigwLCBDT0xVTU4pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGluZSArPSB0aGlzLl9jb3VudChWQUxVRSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih2YWx1ZSlcblx0XHRcdHtcblx0XHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0XHRcdGtleXdvcmQ6ICdAdGV4dCcsXG5cdFx0XHRcdFx0ZXhwcmVzc2lvbjogJycsXG5cdFx0XHRcdFx0YmxvY2tzOiBbXSxcblx0XHRcdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjdXJyLmJsb2Nrc1tpbmR4XS5saXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRzd2l0Y2goa2V5d29yZClcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdmbHVzaCc6XG5cdFx0XHRcdGNhc2UgJ2F1dG9lc2NhcGUnOlxuXHRcdFx0XHRjYXNlICdzcGFjZWxlc3MnOlxuXHRcdFx0XHRjYXNlICd2ZXJiYXRpbSc6XG5cblx0XHRcdFx0XHQvKiBJR05PUkUgKi9cblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZG8nOlxuXHRcdFx0XHRjYXNlICdzZXQnOlxuXHRcdFx0XHRjYXNlICdpbmNsdWRlJzpcblxuXHRcdFx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0XHRcdFx0a2V5d29yZDoga2V5d29yZCxcblx0XHRcdFx0XHRcdGV4cHJlc3Npb246IGV4cHJlc3Npb24sXG5cdFx0XHRcdFx0XHRibG9ja3M6IFtdLFxuXHRcdFx0XHRcdFx0dmFsdWU6ICcnLFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrc1tpbmR4XS5saXN0LnB1c2goaXRlbSk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2lmJzpcblx0XHRcdFx0Y2FzZSAnZm9yJzpcblxuXHRcdFx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0XHRcdFx0a2V5d29yZDoga2V5d29yZCxcblx0XHRcdFx0XHRcdGJsb2NrczogW3tcblx0XHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogZXhwcmVzc2lvbixcblx0XHRcdFx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHRcdFx0XHR9XSxcblx0XHRcdFx0XHRcdHZhbHVlOiAnJyxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXG5cdFx0XHRcdFx0c3RhY2sxLnB1c2goaXRlbSk7XG5cdFx0XHRcdFx0c3RhY2syLnB1c2goMHgwMCk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2Vsc2VpZic6XG5cblx0XHRcdFx0XHRpZihjdXJyWydrZXl3b3JkJ10gIT09ICdpZicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbHNlaWZgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpbmR4ID0gY3Vyci5ibG9ja3MubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3MucHVzaCh7XG5cdFx0XHRcdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRzdGFjazJbc3RhY2syLmxlbmd0aCAtIDFdID0gaW5keDtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZWxzZSc6XG5cblx0XHRcdFx0XHRpZihjdXJyWydrZXl3b3JkJ10gIT09ICdpZidcblx0XHRcdFx0XHQgICAmJlxuXHRcdFx0XHRcdCAgIGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2Zvcidcblx0XHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVsc2VgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpbmR4ID0gY3Vyci5ibG9ja3MubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3MucHVzaCh7XG5cdFx0XHRcdFx0XHRleHByZXNzaW9uOiAnQHRydWUnLFxuXHRcdFx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRzdGFjazJbc3RhY2syLmxlbmd0aCAtIDFdID0gaW5keDtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZW5kaWYnOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZW5kaWZgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzdGFjazEucG9wKCk7XG5cdFx0XHRcdFx0c3RhY2syLnBvcCgpO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbmRmb3InOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnZm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVuZGZvcmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHN0YWNrMS5wb3AoKTtcblx0XHRcdFx0XHRzdGFjazIucG9wKCk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmtub3duIGtleXdvcmQgYCcgKyBrZXl3b3JkICsgJ2AnO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGR1bXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnJvb3ROb2RlLCBudWxsLCAyKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZW5naW5lICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZW5naW5lID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFZBUklBQkxFX1JFOiAvXFx7XFx7XFxzKiguKj8pXFxzKlxcfVxcfS9nLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3JlbmRlcjogZnVuY3Rpb24ocmVzdWx0LCBpdGVtLCBkaWN0ID0ge30sIHRtcGxzID0ge30pXG5cdHtcblx0XHRsZXQgbTtcblxuXHRcdGxldCBleHByZXNzaW9uO1xuXG5cdFx0dGhpcy5kaWN0ID0gZGljdDtcblx0XHR0aGlzLnRtcGxzID0gdG1wbHM7XG5cblx0XHRzd2l0Y2goaXRlbS5rZXl3b3JkKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRE8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnZG8nOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGl0ZW0uZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNFVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ3NldCc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bSA9IGl0ZW0uZXhwcmVzc2lvbi5tYXRjaCgvKFthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMqPVxccyooLispLylcblxuXHRcdFx0XHRpZighbSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgaW52YWxpZCBgc2V0YCBzdGF0ZW1lbnQnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRkaWN0W21bMV1dID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwobVsyXSwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEBURVhUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ0B0ZXh0Jzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtLnZhbHVlLnJlcGxhY2UodGhpcy5WQVJJQUJMRV9SRSwgZnVuY3Rpb24obWF0Y2gsIGV4cHJlc3Npb24pIHtcblxuXHRcdFx0XHRcdGxldCB2YWx1ZSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDogJyc7XG5cdFx0XHRcdH0pKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElGICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2lmJzpcblx0XHRcdGNhc2UgJ0Byb290Jzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpdGVtLmJsb2Nrcy5ldmVyeSgoYmxvY2spID0+IHtcblxuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBibG9jay5leHByZXNzaW9uO1xuXG5cdFx0XHRcdFx0aWYoZXhwcmVzc2lvbiA9PT0gJ0B0cnVlJyB8fCBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGZvcihjb25zdCBpIGluIGJsb2NrLmxpc3QpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGJsb2NrLmxpc3RbaV0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2Zvcic6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IHN5bTE7XG5cdFx0XHRcdGxldCBzeW0yO1xuXHRcdFx0XHRsZXQgZXhwcjtcblxuXHRcdFx0XHRtID0gaXRlbS5ibG9ja3NbMF0uZXhwcmVzc2lvbi5tYXRjaCgvKFthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMqLFxccyooW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccytpblxccysoLispLylcblxuXHRcdFx0XHRpZighbSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG0gPSBpdGVtLmJsb2Nrc1swXS5leHByZXNzaW9uLm1hdGNoKC8oW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccytpblxccysoLispLylcblxuXHRcdFx0XHRcdGlmKCFtKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgaW52YWxpZCBgZm9yYCBzdGF0ZW1lbnQnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c3ltMSA9IG1bMV07XG5cdFx0XHRcdFx0XHRzeW0yID0gbnVsbDtcblx0XHRcdFx0XHRcdGV4cHIgPSBtWzJdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRzeW0xID0gbVsxXTtcblx0XHRcdFx0XHRzeW0yID0gbVsyXTtcblx0XHRcdFx0XHRleHByID0gbVszXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3Qgb3JpZ1ZhbHVlID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwciwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvcmlnVmFsdWUpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IGl0ZXJWYWx1ZTtcblxuXHRcdFx0XHRpZih0eXBlTmFtZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpdGVyVmFsdWUgPSBzeW0yID8gT2JqZWN0LmVudHJpZXMob3JpZ1ZhbHVlKVxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgOiBPYmplY3Qua2V5cyhvcmlnVmFsdWUpXG5cdFx0XHRcdFx0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGl0ZXJWYWx1ZSA9IG9yaWdWYWx1ZTtcblxuXHRcdFx0XHRcdGlmKHR5cGVOYW1lICE9PSAnW29iamVjdCBBcnJheV0nXG5cdFx0XHRcdFx0ICAgJiZcblx0XHRcdFx0XHQgICB0eXBlTmFtZSAhPT0gJ1tvYmplY3QgU3RyaW5nXSdcblx0XHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIHJpZ2h0IG9wZXJhbmRlIG5vdCBpdGVyYWJsZSc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoc3ltMilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIHJpZ2h0IG9wZXJhbmRlIG5vdCBhbiBvYmplY3QnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgbCA9IGl0ZXJWYWx1ZS5sZW5ndGg7XG5cblx0XHRcdFx0aWYobCA+IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZXQgayA9IDB4MDAwMDAwMDAwMDAwMDA7XG5cblx0XHRcdFx0XHRjb25zdCBsaXN0ID0gaXRlbS5ibG9ja3NbMF0ubGlzdDtcblxuXHRcdFx0XHRcdGlmKHN5bTIpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNvbnN0IG9sZDEgPSBkaWN0WyhzeW0xKV07XG5cdFx0XHRcdFx0XHRjb25zdCBvbGQyID0gZGljdFsoc3ltMildO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMyA9IGRpY3RbJ2xvb3AnXTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3QubG9vcCA9IHtsZW5ndGg6IGwsIHBhcmVudDogZGljdFsnbG9vcCddfTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGZvcihjb25zdCBba2V5LCB2YWxdIG9mIGl0ZXJWYWx1ZSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0ZGljdFtzeW0xXSA9IGtleTtcblx0XHRcdFx0XHRcdFx0ZGljdFtzeW0yXSA9IHZhbDtcblxuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuZmlyc3QgPSAoayA9PT0gKDAgLSAwKSk7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5sYXN0ID0gKGsgPT09IChsIC0gMSkpO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5yZXZpbmRleDAgPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4MCA9IGs7XG5cdFx0XHRcdFx0XHRcdGsrKztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4ID0gbCAtIGs7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5pbmRleCA9IGs7XG5cblx0XHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gbGlzdClcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGxpc3Rbal0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGljdFsnbG9vcCddID0gb2xkMztcblx0XHRcdFx0XHRcdGRpY3RbKHN5bTIpXSA9IG9sZDI7XG5cdFx0XHRcdFx0XHRkaWN0WyhzeW0xKV0gPSBvbGQxO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjb25zdCBvbGQxID0gZGljdFsoc3ltMSldO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMiA9IGRpY3RbJ2xvb3AnXTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3QubG9vcCA9IHtsZW5ndGg6IGwsIHBhcmVudDogZGljdFsnbG9vcCddfTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGZvcihjb25zdCB2YWwgb2YgaXRlclZhbHVlKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRkaWN0W3N5bTFdID0gdmFsO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5maXJzdCA9IChrID09PSAoMCAtIDApKTtcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmxhc3QgPSAoayA9PT0gKGwgLSAxKSk7XG5cblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4MCA9IGwgLSBrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXgwID0gaztcblx0XHRcdFx0XHRcdFx0aysrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AucmV2aW5kZXggPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4ID0gaztcblxuXHRcdFx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBsaXN0KVxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbGlzdFtqXSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkaWN0Wydsb29wJ10gPSBvbGQyO1xuXHRcdFx0XHRcdFx0ZGljdFsoc3ltMSldID0gb2xkMTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKGl0ZW0uYmxvY2tzLmxlbmd0aCA+IDEpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Y29uc3QgbGlzdCA9IGl0ZW0uYmxvY2tzWzFdLmxpc3Q7XG5cblx0XHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGxpc3QpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGxpc3Rbal0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElOQ0xVREUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2luY2x1ZGUnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBtXzFfID0gaXRlbS5leHByZXNzaW9uLCB3aXRoX3N1YmV4cHIsIHdpdGhfY29udGV4dDtcblxuXHRcdFx0XHQvKiovIGlmKChtID0gbV8xXy5tYXRjaCgvKC4rKVxccyt3aXRoXFxzKyguKylcXHMrb25seSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSBtWzJdO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYoKG0gPSBtXzFfLm1hdGNoKC8oLispXFxzK3dpdGhcXHMrKC4rKSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSBtWzJdO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZigobSA9IG1fMV8ubWF0Y2goLyguKylcXHMrb25seSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSAne30nO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtXzFfO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9ICd7fSc7XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgZmlsZU5hbWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpIHx8ICcnO1xuXG5cdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChmaWxlTmFtZSkgIT09ICdbb2JqZWN0IFN0cmluZ10nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgc3RyaW5nIGV4cGVjdGVkJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgdmFyaWFibGVzID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwod2l0aF9zdWJleHByLCBpdGVtLmxpbmUsIGRpY3QpIHx8IHt9O1xuXG5cdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YXJpYWJsZXMpICE9PSAnW29iamVjdCBPYmplY3RdJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIG9iamVjdCBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGFtaVR3aWcuc3RkbGliLmluY2x1ZGUoXG5cdFx0XHRcdFx0ZmlsZU5hbWUsXG5cdFx0XHRcdFx0dmFyaWFibGVzLFxuXHRcdFx0XHRcdHdpdGhfY29udGV4dCxcblx0XHRcdFx0XHRmYWxzZVxuXHRcdFx0XHQpKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW5kZXI6IGZ1bmN0aW9uKHRtcGwsIGRpY3QgPSB7fSwgdG1wbHMgPSB7fSlcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0c3dpdGNoKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0bXBsKSlcblx0XHR7XG5cdFx0XHRjYXNlICdbb2JqZWN0IFN0cmluZ10nOlxuXHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBuZXcgYW1pVHdpZy50bXBsLkNvbXBpbGVyKHRtcGwpLnJvb3ROb2RlLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdbb2JqZWN0IE9iamVjdF0nOlxuXHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCAvKi0tLS0tLS0tLS0tLS0tKi90bXBsLyotLS0tLS0tLS0tLS0tLSovLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuY2FjaGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuY2FjaGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZGljdDoge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRldmFsOiBmdW5jdGlvbihleHByZXNzaW9uLCBsaW5lLCBfKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGY7XG5cblx0XHRpZihleHByZXNzaW9uIGluIHRoaXMuZGljdClcblx0XHR7XG5cdFx0XHRmID0gdGhpcy5kaWN0W2V4cHJlc3Npb25dO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0ZiA9IHRoaXMuZGljdFtleHByZXNzaW9uXSA9IGV2YWwoXG5cdFx0XHRcdGFtaVR3aWcuZXhwci5pbnRlcnByZXRlci5nZXRKUyhcblx0XHRcdFx0XHRuZXcgYW1pVHdpZy5leHByLkNvbXBpbGVyKGV4cHJlc3Npb24sIGxpbmUpXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIV8pIF8gPSB7fTtcblxuXHRcdHJldHVybiBmLmNhbGwoXywgXyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnN0ZGxpYiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnN0ZGxpYiA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVkFSSUFCTEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNVbmRlZmluZWQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggPT09IHVuZGVmaW5lZDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0RlZmluZWQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggIT09IHVuZGVmaW5lZDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc051bGwnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggPT09IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNOb3ROdWxsJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ICE9PSBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzRW1wdHknOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0aWYoeCA9PT0gbnVsbFxuXHRcdCAgIHx8XG5cdFx0ICAgeCA9PT0gZmFsc2Vcblx0XHQgICB8fFxuXHRcdCAgIHggPT09ICgoJycpKVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGNvbnN0IHR5cGVOYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuICh0eXBlTmFtZSA9PT0gJ1tvYmplY3QgQXJyYXldJyAmJiB4Lmxlbmd0aCA9PT0gMClcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgKHR5cGVOYW1lID09PSAnW29iamVjdCBPYmplY3RdJyAmJiBPYmplY3Qua2V5cyh4KS5sZW5ndGggPT09IDApXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTnVtYmVyJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IE51bWJlcl0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzU3RyaW5nJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzQXJyYXknOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc09iamVjdCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBPYmplY3RdJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0l0ZXJhYmxlJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGNvbnN0IHR5cGVOYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuIHR5cGVOYW1lID09PSAnW29iamVjdCBTdHJpbmddJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgQXJyYXldJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNFdmVuJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzTnVtYmVyKHgpICYmICh4ICYgMSkgPT09IDA7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNPZGQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNOdW1iZXIoeCkgJiYgKHggJiAxKSA9PT0gMTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBJVEVSQUJMRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0luT2JqZWN0JzogZnVuY3Rpb24oeCwgeSlcblx0e1xuXHRcdGlmKHRoaXMuaXNBcnJheSh5KVxuXHRcdCAgIHx8XG5cdFx0ICAgdGhpcy5pc1N0cmluZyh5KVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB5LmluZGV4T2YoeCkgPj0gMDtcblx0XHR9XG5cblx0XHRpZih0aGlzLmlzT2JqZWN0KHkpKVxuXHRcdHtcblx0XHRcdHJldHVybiB4IGluIHk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzSW5SYW5nZSc6IGZ1bmN0aW9uKHgsIHgxLCB4Milcblx0e1xuXHRcdGlmKHRoaXMuaXNOdW1iZXIoeDEpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzTnVtYmVyKHgyKVxuXHRcdCApIHtcblx0XHRcdHJldHVybiAoLyotLS0qL3gvKi0tLSovID49IC8qLS0tKi94MS8qLS0tKi8pXG5cdFx0XHQgICAgICAgJiZcblx0XHRcdCAgICAgICAoLyotLS0qL3gvKi0tLSovIDw9IC8qLS0tKi94Mi8qLS0tKi8pXG5cdFx0XHQ7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5pc1N0cmluZyh4MSkgJiYgeDEubGVuZ3RoID09PSAxXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHgyKSAmJiB4Mi5sZW5ndGggPT09IDFcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4gKHguY2hhckNvZGVBdCgwKSA+PSB4MS5jaGFyQ29kZUF0KDApKVxuXHRcdFx0ICAgICAgICYmXG5cdFx0XHQgICAgICAgKHguY2hhckNvZGVBdCgwKSA8PSB4Mi5jaGFyQ29kZUF0KDApKVxuXHRcdFx0O1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdyYW5nZSc6IGZ1bmN0aW9uKHgxLCB4Miwgc3RlcCA9IDEpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdC8qKi8gaWYodGhpcy5pc051bWJlcih4MSlcblx0XHQgICAgICAgICYmXG5cdFx0ICAgICAgICB0aGlzLmlzTnVtYmVyKHgyKVxuXHRcdCApIHtcblx0XHRcdGZvcihsZXQgaSA9IC8qLS0tKi94MS8qLS0tKi87IGkgPD0gLyotLS0qL3gyLyotLS0qLzsgaSArPSBzdGVwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQucHVzaCgvKi0tLS0tLS0tLS0tLS0tLSovKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLmlzU3RyaW5nKHgxKSAmJiB4MS5sZW5ndGggPT09IDFcblx0XHQgICAgICAgICYmXG5cdFx0ICAgICAgICB0aGlzLmlzU3RyaW5nKHgyKSAmJiB4Mi5sZW5ndGggPT09IDFcblx0XHQgKSB7XG5cdFx0XHRmb3IobGV0IGkgPSB4MS5jaGFyQ29kZUF0KDApOyBpIDw9IHgyLmNoYXJDb2RlQXQoMCk7IGkgKz0gc3RlcClcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbGVuZ3RoJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoeClcblx0XHQgICB8fFxuXHRcdCAgIHRoaXMuaXNBcnJheSh4KVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB4Lmxlbmd0aDtcblx0XHR9XG5cblx0XHRpZih0aGlzLmlzT2JqZWN0KHgpKVxuXHRcdHtcblx0XHRcdHJldHVybiBPYmplY3Qua2V5cyh4KS5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIDA7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2ZpcnN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpICYmIHgubGVuZ3RoID4gMCA/IHhbMHgwMDAwMDAwMDAwXSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sYXN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpICYmIHgubGVuZ3RoID4gMCA/IHhbeC5sZW5ndGggLSAxXSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9zbGljZSc6IGZ1bmN0aW9uKHgsIGlkeDEsIGlkeDIpXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMuaXNTdHJpbmcoeCkgfHwgdGhpcy5pc0FycmF5KHgpKSA/IHguc2xpY2UoaWR4MSwgaWR4MikgOiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9tZXJnZSc6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPiAxKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmlzU3RyaW5nKGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNTdHJpbmcoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0TC5wdXNoKGFyZ3VtZW50c1tpXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gTC5qb2luKCcnKTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRoaXMuaXNBcnJheShhcmd1bWVudHNbMF0pKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYXJndW1lbnRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzQXJyYXkoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gaXRlbSkgTC5wdXNoKGl0ZW1bal0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIEw7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmlzT2JqZWN0KGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEQgPSB7fTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNPYmplY3QoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gaXRlbSkgRFtqXSA9IGl0ZW1bal07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gRDtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NvcnQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHguc29ydCgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3JldmVyc2UnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHgucmV2ZXJzZSgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pvaW4nOiBmdW5jdGlvbih4LCBzZXApXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5qb2luKHNlcCkgOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfa2V5cyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc09iamVjdCh4KSA/IE9iamVjdC5rZXlzKHgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2NvbHVtbic6IGZ1bmN0aW9uKHgsIGtleSlcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4Lm1hcCgodmFsKSA9PiB2YWxba2V5XSkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfYmF0Y2gnOiBmdW5jdGlvbih4LCBuLCBtaXNzaW5nID0gJycpXG5cdHtcblx0ICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0aWYodGhpcy5pc0FycmF5KHgpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzTnVtYmVyKG4pXG5cdFx0ICkge1xuXHRcdCBcdGxldCBsYXN0O1xuXG5cdFx0XHRjb25zdCBsID0geC5sZW5ndGg7XG5cblx0XHRcdGNvbnN0IG0gPSBNYXRoLmNlaWwobCAvIG4pICogbjtcblxuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IGw7IGkgKz0gbilcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0LnB1c2gobGFzdCA9IHguc2xpY2UoaSwgaSArIG4pKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGxldCBpID0gbDsgaSA8IG07IGkgKz0gMSlcblx0XHRcdHtcblx0XHRcdFx0bGFzdC5wdXNoKG1pc3NpbmcpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogU1RSSU5HUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnc3RhcnRzV2l0aCc6IGZ1bmN0aW9uKHMxLCBzMilcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoczEpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHMyKVxuXHRcdCApIHtcblx0XHRcdGNvbnN0IGJhc2UgPSAweDAwMDAwMDAwMDAwMDAwMDAwMDA7XG5cblx0XHRcdHJldHVybiBzMS5pbmRleE9mKHMyLCBiYXNlKSA9PT0gYmFzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZW5kc1dpdGgnOiBmdW5jdGlvbihzMSwgczIpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMxKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyhzMilcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBiYXNlID0gczEubGVuZ3RoIC0gczIubGVuZ3RoO1xuXG5cdFx0XHRyZXR1cm4gczEuaW5kZXhPZihzMiwgYmFzZSkgPT09IGJhc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21hdGNoJzogZnVuY3Rpb24ocywgcmVnZXgpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKCgocykpKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyhyZWdleClcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBpZHgxID0gcmVnZXguICBpbmRleE9mICAoJy8nKTtcblx0XHRcdGNvbnN0IGlkeDIgPSByZWdleC5sYXN0SW5kZXhPZignLycpO1xuXG5cdFx0XHRpZihpZHgxID09PSAwIHx8IGlkeDEgPCBpZHgyKVxuXHRcdFx0e1xuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4LnN1YnN0cmluZyhpZHgxICsgMSwgaWR4MiksIHJlZ2V4LnN1YnN0cmluZyhpZHgyICsgMSkpLnRlc3Qocyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2goZXJyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0LyogSUdOT1JFICovXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2RlZmF1bHQnOiBmdW5jdGlvbihzMSwgczIpXG5cdHtcblx0XHRyZXR1cm4gczEgfHwgczIgfHwgJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2xvd2VyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy50b0xvd2VyQ2FzZSgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3VwcGVyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy50b1VwcGVyQ2FzZSgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2NhcGl0YWxpemUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gcy50cmltKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9eXFxTL2csIGZ1bmN0aW9uKGMpIHtcblxuXHRcdFx0XHRyZXR1cm4gYy50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl90aXRsZSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMpKVxuXHRcdHtcblx0XHRcdHJldHVybiBzLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyg/Ol58XFxzKVxcUy9nLCBmdW5jdGlvbihjKSB7XG5cblx0XHRcdFx0cmV0dXJuIGMudG9VcHBlckNhc2UoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdHJpbSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudHJpbSgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfcmVwbGFjZSc6IGZ1bmN0aW9uKHMsIG9sZFN0cnMsIG5ld1N0cnMpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdGNvbnN0IGwgPSAoKChzKSkpLmxlbmd0aDtcblx0XHRjb25zdCBtID0gb2xkU3Rycy5sZW5ndGg7XG5cdFx0Y29uc3QgbiA9IG5ld1N0cnMubGVuZ3RoO1xuXG5cdFx0aWYobSAhPSBuKVxuXHRcdHtcblx0XHRcdHRocm93ICdpbnRlcm5hbCBlcnJvcic7XG5cdFx0fVxuXG5fX2wwOlx0Zm9yKGxldCBpID0gMDsgaSA8IGw7IGkgKz0gMClcblx0XHR7XG5cdFx0XHRjb25zdCBwID0gcy5zdWJzdHJpbmcoaSk7XG5cblx0XHRcdGZvcihsZXQgaiA9IDA7IGogPCBtOyBqICs9IDEpXG5cdFx0XHR7XG5cdFx0XHRcdGlmKHAuaW5kZXhPZihvbGRTdHJzW2pdKSA9PT0gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKG5ld1N0cnNbal0pO1xuXG5cdFx0XHRcdFx0aSArPSBvbGRTdHJzW2pdLmxlbmd0aDtcblxuXHRcdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmVzdWx0LnB1c2gocy5jaGFyQXQoaSsrKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfdGV4dFRvSHRtbFgnOiBbJyYnICAgICwgJ1wiJyAgICAgLCAnPCcgICAsICc+JyAgIF0sXG5cdCdfdGV4dFRvSHRtbFknOiBbJyZhbXA7JywgJyZxdW90OycsICcmbHQ7JywgJyZndDsnXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfdGV4dFRvU3RyaW5nWCc6IFsnXFxcXCcgICwgJ1xcbicgLCAnXCInICAsICdcXCcnICBdLFxuXHQnX3RleHRUb1N0cmluZ1knOiBbJ1xcXFxcXFxcJywgJ1xcXFxuJywgJ1xcXFxcIicsICdcXFxcXFwnJ10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3RleHRUb0pzb25TdHJpbmdYJzogWydcXFxcJyAgLCAnXFxuJyAsICdcIicgIF0sXG5cdCdfdGV4dFRvSnNvblN0cmluZ1knOiBbJ1xcXFxcXFxcJywgJ1xcXFxuJywgJ1xcXFxcIiddLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9lc2NhcGUnOiBmdW5jdGlvbihzLCBtb2RlKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRzd2l0Y2gobW9kZSB8fCAnaHRtbCcpXG5cdFx0XHR7XG5cdFx0XHRcdGNhc2UgJ2h0bWwnOlxuXHRcdFx0XHRjYXNlICdodG1sX2F0dHInOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb0h0bWxYLCB0aGlzLl90ZXh0VG9IdG1sWSk7XG5cblx0XHRcdFx0Y2FzZSAnanMnOlxuXHRcdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb1N0cmluZ1gsIHRoaXMuX3RleHRUb1N0cmluZ1kpO1xuXG5cdFx0XHRcdGNhc2UgJ2pzb24nOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb0pzb25TdHJpbmdYLCB0aGlzLl90ZXh0VG9Kc29uU3RyaW5nWSk7XG5cblx0XHRcdFx0Y2FzZSAndXJsJzpcblx0XHRcdFx0XHRyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHMpO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIHM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl91cmxfZW5jb2RlJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gZW5jb2RlVVJJQ29tcG9uZW50KHMpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbmwyYnInOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnJlcGxhY2UoL1xcbi9nLCAnPGJyLz4nKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3Jhdyc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHNcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yZXBsYWNlJzogZnVuY3Rpb24ocywgZGljdClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpICYmIHRoaXMuaXNPYmplY3QoZGljdCkgPyB0aGlzLl9yZXBsYWNlKHMsIE9iamVjdC5rZXlzKGRpY3QpLCBPYmplY3QudmFsdWVzKGRpY3QpKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfc3BsaXQnOiBmdW5jdGlvbihzLCBzZXAsIG1heClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy5zcGxpdChzZXAsIG1heClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6IFtdXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIE5VTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9hYnMnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE1hdGguYWJzKHgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yb3VuZCc6IGZ1bmN0aW9uKHgsIG1vZGUpXG5cdHtcblx0XHRzd2l0Y2gobW9kZSlcblx0XHR7XG5cdFx0XHRjYXNlICdjZWlsJzpcblx0XHRcdFx0cmV0dXJuIE1hdGguY2VpbCh4KTtcblxuXHRcdFx0Y2FzZSAnZmxvb3InOlxuXHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih4KTtcblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIE1hdGgucm91bmQoeCk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21pbic6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGFyZ3MgPSAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgJiYgKHRoaXMuaXNBcnJheShhcmd1bWVudHNbMF0pIHx8IHRoaXMuaXNPYmplY3QoYXJndW1lbnRzWzBdKSkgPyBhcmd1bWVudHNbMF1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYXJndW1lbnRzXG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHJlc3VsdCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcblxuXHRcdGZvcihjb25zdCBpIGluIGFyZ3MpXG5cdFx0e1xuXHRcdFx0aWYoIXRoaXMuaXNOdW1iZXIoYXJnc1tpXSkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBOdW1iZXIuTmFOO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihyZXN1bHQgPiBhcmdzW2ldKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSBhcmdzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnbWF4JzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgYXJncyA9IChhcmd1bWVudHMubGVuZ3RoID09PSAxKSAmJiAodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkgfHwgdGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKSA/IGFyZ3VtZW50c1swXVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhcmd1bWVudHNcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgcmVzdWx0ID0gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO1xuXG5cdFx0Zm9yKGNvbnN0IGkgaW4gYXJncylcblx0XHR7XG5cdFx0XHRpZighdGhpcy5pc051bWJlcihhcmdzW2ldKSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIE51bWJlci5OYU47XG5cdFx0XHR9XG5cblx0XHRcdGlmKHJlc3VsdCA8IGFyZ3NbaV0pXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdCA9IGFyZ3NbaV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBSQU5ET00gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdyYW5kb20nOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0Y29uc3QgeSA9IE1hdGgucmFuZG9tKCk7XG5cblx0XHRpZih4KVxuXHRcdHtcblx0XHRcdGlmKHRoaXMuaXNBcnJheSh4KVxuXHRcdFx0ICAgfHxcblx0XHRcdCAgIHRoaXMuaXNPYmplY3QoeClcblx0XHRcdCApIHtcblx0XHRcdCBcdGNvbnN0IFggPSBPYmplY3Qua2V5cyh4KTtcblxuXHRcdFx0XHRyZXR1cm4geFtcblx0XHRcdFx0XHRYW01hdGguZmxvb3IoWC5sZW5ndGggKiB5KV1cblx0XHRcdFx0XTtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy5pc1N0cmluZyh4KSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIHhbTWF0aC5mbG9vcih4Lmxlbmd0aCAqIHkpXTtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy5pc051bWJlcih4KSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoeCAqIHkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHggPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcblxuXHRcdHJldHVybiBNYXRoLmZsb29yKHggKiB5KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBKU09OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfanNvbl9lbmNvZGUnOiBmdW5jdGlvbih4LCBpbmRlbnQpXG5cdHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoeCwgbnVsbCwgdGhpcy5pc051bWJlcihpbmRlbnQpID8gaW5kZW50IDogMik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pzb25fanNwYXRoJzogZnVuY3Rpb24oeCwgcGF0aClcblx0e1xuXHRcdHJldHVybiB0eXBlb2YgSlNQYXRoICE9PSAndW5kZWZpbmVkJyA/IEpTUGF0aC5hcHBseShwYXRoLCB4KVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFRFTVBMQVRFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2luY2x1ZGUnOiBmdW5jdGlvbihmaWxlTmFtZSwgdmFyaWFibGVzID0ge30sIHdpdGhDb250ZXh0ID0gdHJ1ZSwgaWdub3JlTWlzc2luZyA9IGZhbHNlKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoZmlsZU5hbWUgaW4gYW1pVHdpZy5lbmdpbmUudG1wbHMpXG5cdFx0e1xuXHRcdFx0Y29uc3QgdGVtcCA9IHt9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYod2l0aENvbnRleHQpXG5cdFx0XHR7XG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFtaVR3aWcuZW5naW5lLmRpY3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZW1wW2ldID0gYW1pVHdpZy5lbmdpbmUuZGljdFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodmFyaWFibGVzKVxuXHRcdFx0e1xuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiAvKi0qL3ZhcmlhYmxlcy8qLSovKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGVtcFtpXSA9IC8qLSovdmFyaWFibGVzLyotKi9baV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJldHVybiBhbWlUd2lnLmVuZ2luZS5yZW5kZXIoYW1pVHdpZy5lbmdpbmUudG1wbHNbZmlsZU5hbWVdLCB0ZW1wKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIWlnbm9yZU1pc3NpbmcpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGNvdWxkIG5vdCBvcGVuIGAnICsgZmlsZU5hbWUgKyAnYCc7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5zdGRsaWIuZmlsdGVyX2UgPSBhbWlUd2lnLnN0ZGxpYi5maWx0ZXJfZXNjYXBlO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLmludGVycHJldGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLmludGVycHJldGVyID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9nZXRKUzogZnVuY3Rpb24obm9kZSlcblx0e1xuXHRcdGxldCBMO1xuXHRcdGxldCB4O1xuXHRcdGxldCBsZWZ0O1xuXHRcdGxldCByaWdodDtcblx0XHRsZXQgb3BlcmF0b3I7XG5cblx0XHRzd2l0Y2gobm9kZS5ub2RlVHlwZSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIExTVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5MU1Q6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUubGlzdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaCgvKi0tLS0tKi8gdGhpcy5fZ2V0SlMobm9kZS5saXN0W2ldKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiAnWycgKyBMLmpvaW4oJywnKSArICddJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBESUMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRElDOlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmRpY3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2goaSArICc6JyArIHRoaXMuX2dldEpTKG5vZGUuZGljdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gJ3snICsgTC5qb2luKCcsJykgKyAnfSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRlVOICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTjpcblx0XHQgXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUubGlzdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaCh0aGlzLl9nZXRKUyhub2RlLmxpc3RbaV0pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHQgXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiBub2RlLm5vZGVWYWx1ZSArICcoJyArIEwuam9pbignLCcpICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFZBUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5WQVI6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUubGlzdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaCgnWycgKyB0aGlzLl9nZXRKUyhub2RlLmxpc3RbaV0pICsgJ10nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuIEwubGVuZ3RoID4gMCA/IG5vZGUubm9kZVZhbHVlICsgTC5qb2luKCcnKSA6IG5vZGUubm9kZVZhbHVlO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFRFUk1JTkFMICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTDpcblxuXHRcdFx0XHRyZXR1cm4gbm9kZS5ub2RlVmFsdWU7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLklTOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblxuXHRcdFx0XHRzd2l0Y2gobm9kZS5ub2RlUmlnaHQubm9kZVR5cGUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuREVGSU5FRDpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNEZWZpbmVkKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLk5VTEw6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzTnVsbCgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5FTVBUWTpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNFbXB0eSgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5JVEVSQUJMRTpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNJdGVyYWJsZSgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5FVkVOOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0V2ZW4oJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuT0REOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc09kZCgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSU4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLklOOlxuXG5cdFx0XHRcdGlmKG5vZGUubm9kZVJpZ2h0Lm5vZGVUeXBlICE9PSBhbWlUd2lnLmV4cHIudG9rZW5zLlJBTkdFKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0luT2JqZWN0KCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0eCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXG5cdFx0XHRcdFx0bGVmdCA9IG5vZGUubm9kZVJpZ2h0Lm5vZGVMZWZ0Lm5vZGVWYWx1ZTtcblx0XHRcdFx0XHRyaWdodCA9IG5vZGUubm9kZVJpZ2h0Lm5vZGVSaWdodC5ub2RlVmFsdWU7XG5cblx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzSW5SYW5nZSgnICsgeCArICcsJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNUQVJUU19XSVRIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5TVEFSVFNfV0lUSDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuc3RhcnRzV2l0aCgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVORFNfV0lUSCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5FTkRTX1dJVEg6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmVuZHNXaXRoKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogTUFUQ0hFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLk1BVENIRVM6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLm1hdGNoKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogUkFOR0UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlJBTkdFOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5yYW5nZSgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERPVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ET1Q6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRpZihub2RlLm5vZGVWYWx1ZVswXSA9PT0gJy4nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIGxlZnQgKyAnLicgKyByaWdodDtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gbGVmdCArICdbJyArIHJpZ2h0ICsgJ10nO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRkxESVYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkZMRElWOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdNYXRoLmZsb29yKCcgKyBsZWZ0ICsgJy8nICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogUE9XRVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlBPV0VSOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdNYXRoLnBvdygnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERPVUJMRV9RVUVTVElPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ET1VCTEVfUVVFU1RJT046XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJygoJyArIGxlZnQgKyAnKSB8fCAoJyArIHJpZ2h0ICsgJykpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdC8qIFVOSUFSWSBPUEVSQVRPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYobm9kZS5ub2RlTGVmdCA9PT0gbnVsbFxuXHRcdFx0XHQgICAmJlxuXHRcdFx0XHQgICBub2RlLm5vZGVSaWdodCAhPT0gbnVsbFxuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0b3BlcmF0b3IgPSAobm9kZS5ub2RlVHlwZSAhPT0gYW1pVHdpZy5leHByLnRva2Vucy5OT1QpID8gbm9kZS5ub2RlVmFsdWUgOiAnISc7XG5cblx0XHRcdFx0XHRyZXR1cm4gb3BlcmF0b3IgKyAnKCcgKyB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCkgKyAnKSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ICE9PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ID09PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRvcGVyYXRvciA9IChub2RlLm5vZGVUeXBlICE9PSBhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkgPyBub2RlLm5vZGVWYWx1ZSA6ICchJztcblxuXHRcdFx0XHRcdHJldHVybiAnKCcgKyB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KSArICcpJyArIG9wZXJhdG9yO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogQklOQVJZIE9QRVJBVE9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ICE9PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ICE9PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRzd2l0Y2gobm9kZS5ub2RlVHlwZSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfT1I6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJ3x8Jztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9BTkQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJyYmJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnfCc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfWE9SOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICdeJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9BTkQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJyYnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5DT05DQVQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJysnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gbm9kZS5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gJygnICsgbGVmdCArIG9wZXJhdG9yICsgcmlnaHQgKyAnKSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0SlM6IGZ1bmN0aW9uKGV4cHIpXG5cdHtcblx0XHRyZXR1cm4gJyhmdW5jdGlvbihfKSB7IHJldHVybiAnICsgdGhpcy5fZ2V0SlMoZXhwci5yb290Tm9kZSkgKyAnOyB9KSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRldmFsOiBmdW5jdGlvbihleHByLCBfKVxuXHR7XG5cdFx0aWYoIV8pIF8gPSB7fTtcblxuXHRcdHJldHVybiBldmFsKHRoaXMuZ2V0SlMoZXhwcikpLmNhbGwoXywgXyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiKGZ1bmN0aW9uKCkge1xuXG52YXIgU1lOVEFYID0ge1xuICAgICAgICBQQVRIICAgICAgICAgICAgOiAxLFxuICAgICAgICBTRUxFQ1RPUiAgICAgICAgOiAyLFxuICAgICAgICBPQkpfUFJFRCAgICAgICAgOiAzLFxuICAgICAgICBQT1NfUFJFRCAgICAgICAgOiA0LFxuICAgICAgICBMT0dJQ0FMX0VYUFIgICAgOiA1LFxuICAgICAgICBDT01QQVJJU09OX0VYUFIgOiA2LFxuICAgICAgICBNQVRIX0VYUFIgICAgICAgOiA3LFxuICAgICAgICBDT05DQVRfRVhQUiAgICAgOiA4LFxuICAgICAgICBVTkFSWV9FWFBSICAgICAgOiA5LFxuICAgICAgICBQT1NfRVhQUiAgICAgICAgOiAxMCxcbiAgICAgICAgTElURVJBTCAgICAgICAgIDogMTFcbiAgICB9O1xuXG4vLyBwYXJzZXJcblxudmFyIHBhcnNlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIFRPS0VOID0ge1xuICAgICAgICAgICAgSUQgICAgOiAxLFxuICAgICAgICAgICAgTlVNICAgOiAyLFxuICAgICAgICAgICAgU1RSICAgOiAzLFxuICAgICAgICAgICAgQk9PTCAgOiA0LFxuICAgICAgICAgICAgTlVMTCAgOiA1LFxuICAgICAgICAgICAgUFVOQ1QgOiA2LFxuICAgICAgICAgICAgRU9QICAgOiA3XG4gICAgICAgIH0sXG4gICAgICAgIE1FU1NBR0VTID0ge1xuICAgICAgICAgICAgVU5FWFBfVE9LRU4gOiAnVW5leHBlY3RlZCB0b2tlbiBcIiUwXCInLFxuICAgICAgICAgICAgVU5FWFBfRU9QICAgOiAnVW5leHBlY3RlZCBlbmQgb2YgcGF0aCdcbiAgICAgICAgfTtcblxuICAgIHZhciBwYXRoLCBpZHgsIGJ1ZiwgbGVuO1xuXG4gICAgZnVuY3Rpb24gcGFyc2UoX3BhdGgpIHtcbiAgICAgICAgcGF0aCA9IF9wYXRoLnNwbGl0KCcnKTtcbiAgICAgICAgaWR4ID0gMDtcbiAgICAgICAgYnVmID0gbnVsbDtcbiAgICAgICAgbGVuID0gcGF0aC5sZW5ndGg7XG5cbiAgICAgICAgdmFyIHJlcyA9IHBhcnNlUGF0aENvbmNhdEV4cHIoKSxcbiAgICAgICAgICAgIHRva2VuID0gbGV4KCk7XG5cbiAgICAgICAgaWYodG9rZW4udHlwZSAhPT0gVE9LRU4uRU9QKSB7XG4gICAgICAgICAgICB0aHJvd1VuZXhwZWN0ZWQodG9rZW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBhdGhDb25jYXRFeHByKCkge1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlUGF0aENvbmNhdFBhcnRFeHByKCksXG4gICAgICAgICAgICBvcGVyYW5kcztcblxuICAgICAgICB3aGlsZShtYXRjaCgnfCcpKSB7XG4gICAgICAgICAgICBsZXgoKTtcbiAgICAgICAgICAgIChvcGVyYW5kcyB8fCAob3BlcmFuZHMgPSBbZXhwcl0pKS5wdXNoKHBhcnNlUGF0aENvbmNhdFBhcnRFeHByKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wZXJhbmRzP1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguQ09OQ0FUX0VYUFIsXG4gICAgICAgICAgICAgICAgYXJncyA6IG9wZXJhbmRzXG4gICAgICAgICAgICB9IDpcbiAgICAgICAgICAgIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQYXRoQ29uY2F0UGFydEV4cHIoKSB7XG4gICAgICAgIHJldHVybiBtYXRjaCgnKCcpP1xuICAgICAgICAgICAgcGFyc2VQYXRoR3JvdXBFeHByKCkgOlxuICAgICAgICAgICAgcGFyc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQYXRoR3JvdXBFeHByKCkge1xuICAgICAgICBleHBlY3QoJygnKTtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZVBhdGhDb25jYXRFeHByKCk7XG4gICAgICAgIGV4cGVjdCgnKScpO1xuXG4gICAgICAgIHZhciBwYXJ0cyA9IFtdLFxuICAgICAgICAgICAgcGFydDtcbiAgICAgICAgd2hpbGUoKHBhcnQgPSBwYXJzZVByZWRpY2F0ZSgpKSkge1xuICAgICAgICAgICAgcGFydHMucHVzaChwYXJ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFwYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBleHByO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZXhwci50eXBlID09PSBTWU5UQVguUEFUSCkge1xuICAgICAgICAgICAgZXhwci5wYXJ0cyA9IGV4cHIucGFydHMuY29uY2F0KHBhcnRzKTtcbiAgICAgICAgICAgIHJldHVybiBleHByO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFydHMudW5zaGlmdChleHByKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSAgOiBTWU5UQVguUEFUSCxcbiAgICAgICAgICAgIHBhcnRzIDogcGFydHNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVByZWRpY2F0ZSgpIHtcbiAgICAgICAgaWYobWF0Y2goJ1snKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlUG9zUHJlZGljYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtYXRjaCgneycpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VPYmplY3RQcmVkaWNhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1hdGNoKCcoJykpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVBhdGhHcm91cEV4cHIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUGF0aCgpIHtcbiAgICAgICAgaWYoIW1hdGNoUGF0aCgpKSB7XG4gICAgICAgICAgICB0aHJvd1VuZXhwZWN0ZWQobGV4KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZyb21Sb290ID0gZmFsc2UsXG4gICAgICAgICAgICBzdWJzdDtcblxuICAgICAgICBpZihtYXRjaCgnXicpKSB7XG4gICAgICAgICAgICBsZXgoKTtcbiAgICAgICAgICAgIGZyb21Sb290ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKG1hdGNoU3Vic3QoKSkge1xuICAgICAgICAgICAgc3Vic3QgPSBsZXgoKS52YWwuc3Vic3RyKDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBhcnRzID0gW10sXG4gICAgICAgICAgICBwYXJ0O1xuICAgICAgICB3aGlsZSgocGFydCA9IHBhcnNlUGF0aFBhcnQoKSkpIHtcbiAgICAgICAgICAgIHBhcnRzLnB1c2gocGFydCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSAgICAgOiBTWU5UQVguUEFUSCxcbiAgICAgICAgICAgIGZyb21Sb290IDogZnJvbVJvb3QsXG4gICAgICAgICAgICBzdWJzdCAgICA6IHN1YnN0LFxuICAgICAgICAgICAgcGFydHMgICAgOiBwYXJ0c1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUGF0aFBhcnQoKSB7XG4gICAgICAgIHJldHVybiBtYXRjaFNlbGVjdG9yKCk/XG4gICAgICAgICAgICBwYXJzZVNlbGVjdG9yKCkgOlxuICAgICAgICAgICAgcGFyc2VQcmVkaWNhdGUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVNlbGVjdG9yKCkge1xuICAgICAgICB2YXIgc2VsZWN0b3IgPSBsZXgoKS52YWwsXG4gICAgICAgICAgICB0b2tlbiA9IGxvb2thaGVhZCgpLFxuICAgICAgICAgICAgcHJvcDtcblxuICAgICAgICBpZihtYXRjaCgnKicpIHx8IHRva2VuLnR5cGUgPT09IFRPS0VOLklEIHx8IHRva2VuLnR5cGUgPT09IFRPS0VOLlNUUikge1xuICAgICAgICAgICAgcHJvcCA9IGxleCgpLnZhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlICAgICA6IFNZTlRBWC5TRUxFQ1RPUixcbiAgICAgICAgICAgIHNlbGVjdG9yIDogc2VsZWN0b3IsXG4gICAgICAgICAgICBwcm9wICAgICA6IHByb3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBvc1ByZWRpY2F0ZSgpIHtcbiAgICAgICAgZXhwZWN0KCdbJyk7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VQb3NFeHByKCk7XG4gICAgICAgIGV4cGVjdCgnXScpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlIDogU1lOVEFYLlBPU19QUkVELFxuICAgICAgICAgICAgYXJnICA6IGV4cHJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZU9iamVjdFByZWRpY2F0ZSgpIHtcbiAgICAgICAgZXhwZWN0KCd7Jyk7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VMb2dpY2FsT1JFeHByKCk7XG4gICAgICAgIGV4cGVjdCgnfScpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlIDogU1lOVEFYLk9CSl9QUkVELFxuICAgICAgICAgICAgYXJnICA6IGV4cHJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUxvZ2ljYWxPUkV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VMb2dpY2FsQU5ERXhwcigpLFxuICAgICAgICAgICAgb3BlcmFuZHM7XG5cbiAgICAgICAgd2hpbGUobWF0Y2goJ3x8JykpIHtcbiAgICAgICAgICAgIGxleCgpO1xuICAgICAgICAgICAgKG9wZXJhbmRzIHx8IChvcGVyYW5kcyA9IFtleHByXSkpLnB1c2gocGFyc2VMb2dpY2FsQU5ERXhwcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcGVyYW5kcz9cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLkxPR0lDQUxfRVhQUixcbiAgICAgICAgICAgICAgICBvcCAgIDogJ3x8JyxcbiAgICAgICAgICAgICAgICBhcmdzIDogb3BlcmFuZHNcbiAgICAgICAgICAgIH0gOlxuICAgICAgICAgICAgZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUxvZ2ljYWxBTkRFeHByKCkge1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlRXF1YWxpdHlFeHByKCksXG4gICAgICAgICAgICBvcGVyYW5kcztcblxuICAgICAgICB3aGlsZShtYXRjaCgnJiYnKSkge1xuICAgICAgICAgICAgbGV4KCk7XG4gICAgICAgICAgICAob3BlcmFuZHMgfHwgKG9wZXJhbmRzID0gW2V4cHJdKSkucHVzaChwYXJzZUVxdWFsaXR5RXhwcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcGVyYW5kcz9cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLkxPR0lDQUxfRVhQUixcbiAgICAgICAgICAgICAgICBvcCAgIDogJyYmJyxcbiAgICAgICAgICAgICAgICBhcmdzIDogb3BlcmFuZHNcbiAgICAgICAgICAgIH0gOlxuICAgICAgICAgICAgZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUVxdWFsaXR5RXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZVJlbGF0aW9uYWxFeHByKCk7XG5cbiAgICAgICAgd2hpbGUoXG4gICAgICAgICAgICBtYXRjaCgnPT0nKSB8fCBtYXRjaCgnIT0nKSB8fCBtYXRjaCgnPT09JykgfHwgbWF0Y2goJyE9PScpIHx8XG4gICAgICAgICAgICBtYXRjaCgnXj09JykgfHwgbWF0Y2goJz09XicpIHx8bWF0Y2goJ149JykgfHwgbWF0Y2goJz1eJykgfHxcbiAgICAgICAgICAgIG1hdGNoKCckPT0nKSB8fCBtYXRjaCgnPT0kJykgfHwgbWF0Y2goJyQ9JykgfHwgbWF0Y2goJz0kJykgfHxcbiAgICAgICAgICAgIG1hdGNoKCcqPT0nKSB8fCBtYXRjaCgnPT0qJyl8fCBtYXRjaCgnKj0nKSB8fCBtYXRjaCgnPSonKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGV4cHIgPSB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5DT01QQVJJU09OX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6IGxleCgpLnZhbCxcbiAgICAgICAgICAgICAgICBhcmdzIDogW2V4cHIsIHBhcnNlRXF1YWxpdHlFeHByKCldXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VSZWxhdGlvbmFsRXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZUFkZGl0aXZlRXhwcigpO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCc8JykgfHwgbWF0Y2goJz4nKSB8fCBtYXRjaCgnPD0nKSB8fCBtYXRjaCgnPj0nKSkge1xuICAgICAgICAgICAgZXhwciA9IHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLkNPTVBBUklTT05fRVhQUixcbiAgICAgICAgICAgICAgICBvcCAgIDogbGV4KCkudmFsLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBbZXhwciwgcGFyc2VSZWxhdGlvbmFsRXhwcigpXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlQWRkaXRpdmVFeHByKCkge1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlTXVsdGlwbGljYXRpdmVFeHByKCk7XG5cbiAgICAgICAgd2hpbGUobWF0Y2goJysnKSB8fCBtYXRjaCgnLScpKSB7XG4gICAgICAgICAgICBleHByID0ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguTUFUSF9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiBsZXgoKS52YWwsXG4gICAgICAgICAgICAgICAgYXJncyA6IFtleHByLCBwYXJzZU11bHRpcGxpY2F0aXZlRXhwcigpXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlTXVsdGlwbGljYXRpdmVFeHByKCkge1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlVW5hcnlFeHByKCk7XG5cbiAgICAgICAgd2hpbGUobWF0Y2goJyonKSB8fCBtYXRjaCgnLycpIHx8IG1hdGNoKCclJykpIHtcbiAgICAgICAgICAgIGV4cHIgPSB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5NQVRIX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6IGxleCgpLnZhbCxcbiAgICAgICAgICAgICAgICBhcmdzIDogW2V4cHIsIHBhcnNlTXVsdGlwbGljYXRpdmVFeHByKCldXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQb3NFeHByKCkge1xuICAgICAgICBpZihtYXRjaCgnOicpKSB7XG4gICAgICAgICAgICBsZXgoKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgOiBTWU5UQVguUE9TX0VYUFIsXG4gICAgICAgICAgICAgICAgdG9JZHggOiBwYXJzZVVuYXJ5RXhwcigpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZyb21FeHByID0gcGFyc2VVbmFyeUV4cHIoKTtcbiAgICAgICAgaWYobWF0Y2goJzonKSkge1xuICAgICAgICAgICAgbGV4KCk7XG4gICAgICAgICAgICBpZihtYXRjaCgnXScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgICA6IFNZTlRBWC5QT1NfRVhQUixcbiAgICAgICAgICAgICAgICAgICAgZnJvbUlkeCA6IGZyb21FeHByXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICAgIDogU1lOVEFYLlBPU19FWFBSLFxuICAgICAgICAgICAgICAgIGZyb21JZHggOiBmcm9tRXhwcixcbiAgICAgICAgICAgICAgICB0b0lkeCAgIDogcGFyc2VVbmFyeUV4cHIoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlIDogU1lOVEFYLlBPU19FWFBSLFxuICAgICAgICAgICAgaWR4ICA6IGZyb21FeHByXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VVbmFyeUV4cHIoKSB7XG4gICAgICAgIGlmKG1hdGNoKCchJykgfHwgbWF0Y2goJy0nKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLlVOQVJZX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6IGxleCgpLnZhbCxcbiAgICAgICAgICAgICAgICBhcmcgIDogcGFyc2VVbmFyeUV4cHIoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJzZVByaW1hcnlFeHByKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQcmltYXJ5RXhwcigpIHtcbiAgICAgICAgdmFyIHRva2VuID0gbG9va2FoZWFkKCksXG4gICAgICAgICAgICB0eXBlID0gdG9rZW4udHlwZTtcblxuICAgICAgICBpZih0eXBlID09PSBUT0tFTi5TVFIgfHwgdHlwZSA9PT0gVE9LRU4uTlVNIHx8IHR5cGUgPT09IFRPS0VOLkJPT0wgfHwgdHlwZSA9PT0gVE9LRU4uTlVMTCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLkxJVEVSQUwsXG4gICAgICAgICAgICAgICAgdmFsICA6IGxleCgpLnZhbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1hdGNoUGF0aCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VQYXRoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtYXRjaCgnKCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VHcm91cEV4cHIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aHJvd1VuZXhwZWN0ZWQobGV4KCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlR3JvdXBFeHByKCkge1xuICAgICAgICBleHBlY3QoJygnKTtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZUxvZ2ljYWxPUkV4cHIoKTtcbiAgICAgICAgZXhwZWN0KCcpJyk7XG5cbiAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2godmFsKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGxvb2thaGVhZCgpO1xuICAgICAgICByZXR1cm4gdG9rZW4udHlwZSA9PT0gVE9LRU4uUFVOQ1QgJiYgdG9rZW4udmFsID09PSB2YWw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2hQYXRoKCkge1xuICAgICAgICByZXR1cm4gbWF0Y2hTZWxlY3RvcigpIHx8IG1hdGNoU3Vic3QoKSB8fCBtYXRjaCgnXicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoU2VsZWN0b3IoKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGxvb2thaGVhZCgpO1xuICAgICAgICBpZih0b2tlbi50eXBlID09PSBUT0tFTi5QVU5DVCkge1xuICAgICAgICAgICAgdmFyIHZhbCA9IHRva2VuLnZhbDtcbiAgICAgICAgICAgIHJldHVybiB2YWwgPT09ICcuJyB8fCB2YWwgPT09ICcuLic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2hTdWJzdCgpIHtcbiAgICAgICAgdmFyIHRva2VuID0gbG9va2FoZWFkKCk7XG4gICAgICAgIHJldHVybiB0b2tlbi50eXBlID09PSBUT0tFTi5JRCAmJiB0b2tlbi52YWxbMF0gPT09ICckJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHBlY3QodmFsKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGxleCgpO1xuICAgICAgICBpZih0b2tlbi50eXBlICE9PSBUT0tFTi5QVU5DVCB8fCB0b2tlbi52YWwgIT09IHZhbCkge1xuICAgICAgICAgICAgdGhyb3dVbmV4cGVjdGVkKHRva2VuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvb2thaGVhZCgpIHtcbiAgICAgICAgaWYoYnVmICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gYnVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBvcyA9IGlkeDtcbiAgICAgICAgYnVmID0gYWR2YW5jZSgpO1xuICAgICAgICBpZHggPSBwb3M7XG5cbiAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZHZhbmNlKCkge1xuICAgICAgICB3aGlsZShpc1doaXRlU3BhY2UocGF0aFtpZHhdKSkge1xuICAgICAgICAgICAgKytpZHg7XG4gICAgICAgIH1cblxuICAgICAgICBpZihpZHggPj0gbGVuKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uRU9QLFxuICAgICAgICAgICAgICAgIHJhbmdlIDogW2lkeCwgaWR4XVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b2tlbiA9IHNjYW5QdW5jdHVhdG9yKCk7XG4gICAgICAgIGlmKHRva2VuIHx8XG4gICAgICAgICAgICAgICAgKHRva2VuID0gc2NhbklkKCkpIHx8XG4gICAgICAgICAgICAgICAgKHRva2VuID0gc2NhblN0cmluZygpKSB8fFxuICAgICAgICAgICAgICAgICh0b2tlbiA9IHNjYW5OdW1lcmljKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgIH1cblxuICAgICAgICB0b2tlbiA9IHsgcmFuZ2UgOiBbaWR4LCBpZHhdIH07XG4gICAgICAgIGlkeCA+PSBsZW4/XG4gICAgICAgICAgICB0b2tlbi50eXBlID0gVE9LRU4uRU9QIDpcbiAgICAgICAgICAgIHRva2VuLnZhbCA9IHBhdGhbaWR4XTtcblxuICAgICAgICB0aHJvd1VuZXhwZWN0ZWQodG9rZW4pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxleCgpIHtcbiAgICAgICAgdmFyIHRva2VuO1xuXG4gICAgICAgIGlmKGJ1Zikge1xuICAgICAgICAgICAgaWR4ID0gYnVmLnJhbmdlWzFdO1xuICAgICAgICAgICAgdG9rZW4gPSBidWY7XG4gICAgICAgICAgICBidWYgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFkdmFuY2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0RpZ2l0KGNoKSB7XG4gICAgICAgIHJldHVybiAnMDEyMzQ1Njc4OScuaW5kZXhPZihjaCkgPj0gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1doaXRlU3BhY2UoY2gpIHtcbiAgICAgICAgcmV0dXJuICcgXFxyXFxuXFx0Jy5pbmRleE9mKGNoKSA+IC0xO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzSWRTdGFydChjaCkge1xuICAgICAgICByZXR1cm4gY2ggPT09ICckJyB8fCBjaCA9PT0gJ0AnIHx8IGNoID09PSAnXycgfHwgKGNoID49ICdhJyAmJiBjaCA8PSAneicpIHx8IChjaCA+PSAnQScgJiYgY2ggPD0gJ1onKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0lkUGFydChjaCkge1xuICAgICAgICByZXR1cm4gaXNJZFN0YXJ0KGNoKSB8fCAoY2ggPj0gJzAnICYmIGNoIDw9ICc5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2NhbklkKCkge1xuICAgICAgICB2YXIgY2ggPSBwYXRoW2lkeF07XG5cbiAgICAgICAgaWYoIWlzSWRTdGFydChjaCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGFydCA9IGlkeCxcbiAgICAgICAgICAgIGlkID0gY2g7XG5cbiAgICAgICAgd2hpbGUoKytpZHggPCBsZW4pIHtcbiAgICAgICAgICAgIGNoID0gcGF0aFtpZHhdO1xuICAgICAgICAgICAgaWYoIWlzSWRQYXJ0KGNoKSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWQgKz0gY2g7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2goaWQpIHtcbiAgICAgICAgICAgIGNhc2UgJ3RydWUnOlxuICAgICAgICAgICAgY2FzZSAnZmFsc2UnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uQk9PTCxcbiAgICAgICAgICAgICAgICAgICAgdmFsICAgOiBpZCA9PT0gJ3RydWUnLFxuICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4XVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNhc2UgJ251bGwnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uTlVMTCxcbiAgICAgICAgICAgICAgICAgICAgdmFsICAgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4XVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5JRCxcbiAgICAgICAgICAgICAgICAgICAgdmFsICAgOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeF1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2NhblN0cmluZygpIHtcbiAgICAgICAgaWYocGF0aFtpZHhdICE9PSAnXCInICYmIHBhdGhbaWR4XSAhPT0gJ1xcJycpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvcmlnID0gcGF0aFtpZHhdLFxuICAgICAgICAgICAgc3RhcnQgPSArK2lkeCxcbiAgICAgICAgICAgIHN0ciA9ICcnLFxuICAgICAgICAgICAgZW9zRm91bmQgPSBmYWxzZSxcbiAgICAgICAgICAgIGNoO1xuXG4gICAgICAgIHdoaWxlKGlkeCA8IGxlbikge1xuICAgICAgICAgICAgY2ggPSBwYXRoW2lkeCsrXTtcbiAgICAgICAgICAgIGlmKGNoID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgICBjaCA9IHBhdGhbaWR4KytdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZigoY2ggPT09ICdcIicgfHwgY2ggPT09ICdcXCcnKSAmJiBjaCA9PT0gb3JpZykge1xuICAgICAgICAgICAgICAgIGVvc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0ciArPSBjaDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGVvc0ZvdW5kKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBUT0tFTi5TVFIsXG4gICAgICAgICAgICAgICAgdmFsIDogc3RyLFxuICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHhdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2Nhbk51bWVyaWMoKSB7XG4gICAgICAgIHZhciBzdGFydCA9IGlkeCxcbiAgICAgICAgICAgIGNoID0gcGF0aFtpZHhdLFxuICAgICAgICAgICAgaXNGbG9hdCA9IGNoID09PSAnLic7XG5cbiAgICAgICAgaWYoaXNGbG9hdCB8fCBpc0RpZ2l0KGNoKSkge1xuICAgICAgICAgICAgdmFyIG51bSA9IGNoO1xuICAgICAgICAgICAgd2hpbGUoKytpZHggPCBsZW4pIHtcbiAgICAgICAgICAgICAgICBjaCA9IHBhdGhbaWR4XTtcbiAgICAgICAgICAgICAgICBpZihjaCA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGlzRmxvYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpc0Zsb2F0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZighaXNEaWdpdChjaCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbnVtICs9IGNoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uTlVNLFxuICAgICAgICAgICAgICAgIHZhbCAgIDogaXNGbG9hdD8gcGFyc2VGbG9hdChudW0pIDogcGFyc2VJbnQobnVtLCAxMCksXG4gICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY2FuUHVuY3R1YXRvcigpIHtcbiAgICAgICAgdmFyIHN0YXJ0ID0gaWR4LFxuICAgICAgICAgICAgY2gxID0gcGF0aFtpZHhdLFxuICAgICAgICAgICAgY2gyID0gcGF0aFtpZHggKyAxXTtcblxuICAgICAgICBpZihjaDEgPT09ICcuJykge1xuICAgICAgICAgICAgaWYoaXNEaWdpdChjaDIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aFsrK2lkeF0gPT09ICcuJz9cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogJy4uJyxcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsICsraWR4XVxuICAgICAgICAgICAgICAgIH0gOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICAgICAgdmFsICAgOiAnLicsXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHhdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNoMiA9PT0gJz0nKSB7XG4gICAgICAgICAgICB2YXIgY2gzID0gcGF0aFtpZHggKyAyXTtcbiAgICAgICAgICAgIGlmKGNoMyA9PT0gJz0nKSB7XG4gICAgICAgICAgICAgICAgaWYoJz0hXiQqJy5pbmRleE9mKGNoMSkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCAgIDogY2gxICsgY2gyICsgY2gzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeCArPSAzXVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoJ14kKicuaW5kZXhPZihjaDMpID49IDApIHtcbiAgICAgICAgICAgICAgICBpZihjaDEgPT09ICc9Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCAgIDogY2gxICsgY2gyICsgY2gzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeCArPSAzXVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoJz0hXiQqPjwnLmluZGV4T2YoY2gxKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICAgICAgdmFsICAgOiBjaDEgKyBjaDIsXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHggKz0gMl1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoY2gxID09PSAnPScgJiYgJ14kKicuaW5kZXhPZihjaDIpID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSArIGNoMixcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4ICs9IDJdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2gxID09PSBjaDIgJiYgKGNoMSA9PT0gJ3wnIHx8IGNoMSA9PT0gJyYnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgIHZhbCAgIDogY2gxICsgY2gyLFxuICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHggKz0gMl1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZignOnt9KClbXV4rLSovJSE+PHwnLmluZGV4T2YoY2gxKSA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgdmFsICAgOiBjaDEsXG4gICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsICsraWR4XVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRocm93VW5leHBlY3RlZCh0b2tlbikge1xuICAgICAgICBpZih0b2tlbi50eXBlID09PSBUT0tFTi5FT1ApIHtcbiAgICAgICAgICAgIHRocm93RXJyb3IodG9rZW4sIE1FU1NBR0VTLlVORVhQX0VPUCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvd0Vycm9yKHRva2VuLCBNRVNTQUdFUy5VTkVYUF9UT0tFTiwgdG9rZW4udmFsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0aHJvd0Vycm9yKHRva2VuLCBtZXNzYWdlRm9ybWF0KSB7XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSxcbiAgICAgICAgICAgIG1zZyA9IG1lc3NhZ2VGb3JtYXQucmVwbGFjZShcbiAgICAgICAgICAgICAgICAvJShcXGQpL2csXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oXywgaWR4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcmdzW2lkeF0gfHwgJyc7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBlcnJvciA9IG5ldyBFcnJvcihtc2cpO1xuXG4gICAgICAgIGVycm9yLmNvbHVtbiA9IHRva2VuLnJhbmdlWzBdO1xuXG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJzZTtcbn0pKCk7XG5cbi8vIHRyYW5zbGF0b3JcblxudmFyIHRyYW5zbGF0ZSA9IChmdW5jdGlvbigpIHtcblxuICAgIHZhciBib2R5LCB2YXJzLCBsYXN0VmFySWQsIHVudXNlZFZhcnM7XG5cbiAgICBmdW5jdGlvbiBhY3F1aXJlVmFyKCkge1xuICAgICAgICBpZih1bnVzZWRWYXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHVudXNlZFZhcnMuc2hpZnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB2YXJOYW1lID0gJ3YnICsgKytsYXN0VmFySWQ7XG4gICAgICAgIHZhcnMucHVzaCh2YXJOYW1lKTtcbiAgICAgICAgcmV0dXJuIHZhck5hbWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVsZWFzZVZhcnMoKSB7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzLCBpID0gYXJncy5sZW5ndGg7XG4gICAgICAgIHdoaWxlKGktLSkge1xuICAgICAgICAgICAgdW51c2VkVmFycy5wdXNoKGFyZ3NbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKGFzdCkge1xuICAgICAgICBib2R5ID0gW107XG4gICAgICAgIHZhcnMgPSBbJ3JlcyddO1xuICAgICAgICBsYXN0VmFySWQgPSAwO1xuICAgICAgICB1bnVzZWRWYXJzID0gW107XG5cbiAgICAgICAgdHJhbnNsYXRlRXhwcihhc3QsICdyZXMnLCAnZGF0YScpO1xuXG4gICAgICAgIGJvZHkudW5zaGlmdChcbiAgICAgICAgICAgICd2YXIgJyxcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXk/XG4gICAgICAgICAgICAgICAgJ2lzQXJyID0gQXJyYXkuaXNBcnJheScgOlxuICAgICAgICAgICAgICAgICd0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcsIGlzQXJyID0gZnVuY3Rpb24obykgeyByZXR1cm4gdG9TdHIuY2FsbChvKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiOyB9JyxcbiAgICAgICAgICAgICAgICAnLCBjb25jYXQgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0JyxcbiAgICAgICAgICAgICAgICAnLCcsIHZhcnMuam9pbignLCcpLCAnOycpO1xuXG4gICAgICAgIGlmKGFzdC50eXBlID09PSBTWU5UQVguUEFUSCkge1xuICAgICAgICAgICAgdmFyIGxhc3RQYXJ0ID0gYXN0LnBhcnRzW2FzdC5wYXJ0cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmKGxhc3RQYXJ0ICYmIGxhc3RQYXJ0LnR5cGUgPT09IFNZTlRBWC5QT1NfUFJFRCAmJiAnaWR4JyBpbiBsYXN0UGFydC5hcmcpIHtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goJ3JlcyA9IHJlc1swXTsnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJvZHkucHVzaCgncmV0dXJuIHJlczsnKTtcblxuICAgICAgICByZXR1cm4gYm9keS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVQYXRoKHBhdGgsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgcGFydHMgPSBwYXRoLnBhcnRzLFxuICAgICAgICAgICAgaSA9IDAsIGxlbiA9IHBhcnRzLmxlbmd0aDtcblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICBkZXN0LCAnPScsIHBhdGguZnJvbVJvb3Q/ICdkYXRhJyA6IHBhdGguc3Vic3Q/ICdzdWJzdC4nICsgcGF0aC5zdWJzdCA6IGN0eCwgJzsnLFxuICAgICAgICAgICAgJ2lzQXJyKCcgKyBkZXN0ICsgJykgfHwgKCcgKyBkZXN0ICsgJyA9IFsnICsgZGVzdCArICddKTsnKTtcblxuICAgICAgICB3aGlsZShpIDwgbGVuKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHBhcnRzW2krK107XG4gICAgICAgICAgICBzd2l0Y2goaXRlbS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBTWU5UQVguU0VMRUNUT1I6XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0b3IgPT09ICcuLic/XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVEZXNjZW5kYW50U2VsZWN0b3IoaXRlbSwgZGVzdCwgZGVzdCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlU2VsZWN0b3IoaXRlbSwgZGVzdCwgZGVzdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBTWU5UQVguT0JKX1BSRUQ6XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZU9iamVjdFByZWRpY2F0ZShpdGVtLCBkZXN0LCBkZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFNZTlRBWC5QT1NfUFJFRDpcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlUG9zUHJlZGljYXRlKGl0ZW0sIGRlc3QsIGRlc3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgU1lOVEFYLkNPTkNBVF9FWFBSOlxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVDb25jYXRFeHByKGl0ZW0sIGRlc3QsIGRlc3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZVNlbGVjdG9yKHNlbCwgZGVzdCwgY3R4KSB7XG4gICAgICAgIGlmKHNlbC5wcm9wKSB7XG4gICAgICAgICAgICB2YXIgcHJvcFN0ciA9IGVzY2FwZVN0cihzZWwucHJvcCksXG4gICAgICAgICAgICAgICAgcmVzID0gYWNxdWlyZVZhcigpLCBpID0gYWNxdWlyZVZhcigpLCBsZW4gPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICAgICAgY3VyQ3R4ID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgICAgIGogPSBhY3F1aXJlVmFyKCksIHZhbCA9IGFjcXVpcmVWYXIoKSwgdG1wQXJyID0gYWNxdWlyZVZhcigpO1xuXG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgcmVzLCAnPSBbXTsnLCBpLCAnPSAwOycsIGxlbiwgJz0nLCBjdHgsICcubGVuZ3RoOycsIHRtcEFyciwgJz0gW107JyxcbiAgICAgICAgICAgICAgICAnd2hpbGUoJywgaSwgJzwnLCBsZW4sICcpIHsnLFxuICAgICAgICAgICAgICAgICAgICBjdXJDdHgsICc9JywgY3R4LCAnWycsIGksICcrK107JyxcbiAgICAgICAgICAgICAgICAgICAgJ2lmKCcsIGN1ckN0eCwgJyE9IG51bGwpIHsnKTtcbiAgICAgICAgICAgIGlmKHNlbC5wcm9wID09PSAnKicpIHtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAnaWYodHlwZW9mICcsIGN1ckN0eCwgJz09PSBcIm9iamVjdFwiKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWYoaXNBcnIoJywgY3VyQ3R4LCAnKSkgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcywgJz0nLCByZXMsICcuY29uY2F0KCcsIGN1ckN0eCwgJyk7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Vsc2UgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmb3IoJywgaiwgJyBpbiAnLCBjdXJDdHgsICcpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKCcsIGN1ckN0eCwgJy5oYXNPd25Qcm9wZXJ0eSgnLCBqLCAnKSkgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLCAnPScsIGN1ckN0eCwgJ1snLCBqLCAnXTsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVBcHBlbmRUb0FycmF5KHJlcywgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCwgJz0nLCBjdXJDdHgsICdbJywgcHJvcFN0ciwgJ107Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVBcHBlbmRUb0FycmF5KHJlcywgdmFsLCB0bXBBcnIsIGxlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgZGVzdCwgJz0nLCBsZW4sICc+IDEgJiYnLCB0bXBBcnIsICcubGVuZ3RoPycsIHRtcEFyciwgJy5sZW5ndGggPiAxPycsXG4gICAgICAgICAgICAgICAgICAgICdjb25jYXQuYXBwbHkoJywgcmVzLCAnLCcsIHRtcEFyciwgJykgOicsIHJlcywgJy5jb25jYXQoJywgdG1wQXJyLCAnWzBdKSA6JywgcmVzLCAnOycpO1xuXG4gICAgICAgICAgICByZWxlYXNlVmFycyhyZXMsIGksIGxlbiwgY3VyQ3R4LCBqLCB2YWwsIHRtcEFycik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVEZXNjZW5kYW50U2VsZWN0b3Ioc2VsLCBkZXN0LCBiYXNlQ3R4KSB7XG4gICAgICAgIHZhciBwcm9wID0gc2VsLnByb3AsXG4gICAgICAgICAgICBjdHggPSBhY3F1aXJlVmFyKCksIGN1ckN0eCA9IGFjcXVpcmVWYXIoKSwgY2hpbGRDdHhzID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgaSA9IGFjcXVpcmVWYXIoKSwgaiA9IGFjcXVpcmVWYXIoKSwgdmFsID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgbGVuID0gYWNxdWlyZVZhcigpLCByZXMgPSBhY3F1aXJlVmFyKCk7XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgY3R4LCAnPScsIGJhc2VDdHgsICcuc2xpY2UoKSwnLCByZXMsICc9IFtdOycsXG4gICAgICAgICAgICAnd2hpbGUoJywgY3R4LCAnLmxlbmd0aCkgeycsXG4gICAgICAgICAgICAgICAgY3VyQ3R4LCAnPScsIGN0eCwgJy5zaGlmdCgpOycpO1xuICAgICAgICBwcm9wP1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICdpZih0eXBlb2YgJywgY3VyQ3R4LCAnPT09IFwib2JqZWN0XCIgJiYnLCBjdXJDdHgsICcpIHsnKSA6XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgJ2lmKHR5cGVvZiAnLCBjdXJDdHgsICchPSBudWxsKSB7Jyk7XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRDdHhzLCAnPSBbXTsnLFxuICAgICAgICAgICAgICAgICAgICAnaWYoaXNBcnIoJywgY3VyQ3R4LCAnKSkgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICBpLCAnPSAwLCcsIGxlbiwgJz0nLCBjdXJDdHgsICcubGVuZ3RoOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnd2hpbGUoJywgaSwgJzwnLCBsZW4sICcpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCwgJz0nLCBjdXJDdHgsICdbJywgaSwgJysrXTsnKTtcbiAgICAgICAgcHJvcCAmJiBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKHR5cGVvZiAnLCB2YWwsICc9PT0gXCJvYmplY3RcIikgeycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVBcHBlbmRUb0FycmF5KGNoaWxkQ3R4cywgdmFsKTtcbiAgICAgICAgcHJvcCAmJiBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICdlbHNlIHsnKTtcbiAgICAgICAgaWYocHJvcCkge1xuICAgICAgICAgICAgaWYocHJvcCAhPT0gJyonKSB7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsLCAnPScsIGN1ckN0eCwgJ1tcIicgKyBwcm9wICsgJ1wiXTsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZUFwcGVuZFRvQXJyYXkocmVzLCB2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIGN1ckN0eCk7XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAnaWYodHlwZW9mICcsIGN1ckN0eCwgJz09PSBcIm9iamVjdFwiKSB7Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZvcignLCBqLCAnIGluICcsIGN1ckN0eCwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZignLCBjdXJDdHgsICcuaGFzT3duUHJvcGVydHkoJywgaiwgJykpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLCAnPScsIGN1ckN0eCwgJ1snLCBqLCAnXTsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZUFwcGVuZFRvQXJyYXkoY2hpbGRDdHhzLCB2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcCA9PT0gJyonICYmIGlubGluZUFwcGVuZFRvQXJyYXkocmVzLCB2YWwpO1xuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScpO1xuICAgICAgICBwcm9wIHx8IGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZEN0eHMsICcubGVuZ3RoICYmJywgY3R4LCAnLnVuc2hpZnQuYXBwbHkoJywgY3R4LCAnLCcsIGNoaWxkQ3R4cywgJyk7JyxcbiAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAnfScsXG4gICAgICAgICAgICBkZXN0LCAnPScsIHJlcywgJzsnKTtcblxuICAgICAgICByZWxlYXNlVmFycyhjdHgsIGN1ckN0eCwgY2hpbGRDdHhzLCBpLCBqLCB2YWwsIGxlbiwgcmVzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVPYmplY3RQcmVkaWNhdGUoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciByZXNWYXIgPSBhY3F1aXJlVmFyKCksIGkgPSBhY3F1aXJlVmFyKCksIGxlbiA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGNvbmQgPSBhY3F1aXJlVmFyKCksIGN1ckl0ZW0gPSBhY3F1aXJlVmFyKCk7XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgcmVzVmFyLCAnPSBbXTsnLFxuICAgICAgICAgICAgaSwgJz0gMDsnLFxuICAgICAgICAgICAgbGVuLCAnPScsIGN0eCwgJy5sZW5ndGg7JyxcbiAgICAgICAgICAgICd3aGlsZSgnLCBpLCAnPCcsIGxlbiwgJykgeycsXG4gICAgICAgICAgICAgICAgY3VySXRlbSwgJz0nLCBjdHgsICdbJywgaSwgJysrXTsnKTtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVFeHByKGV4cHIuYXJnLCBjb25kLCBjdXJJdGVtKTtcbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgIGNvbnZlcnRUb0Jvb2woZXhwci5hcmcsIGNvbmQpLCAnJiYnLCByZXNWYXIsICcucHVzaCgnLCBjdXJJdGVtLCAnKTsnLFxuICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgZGVzdCwgJz0nLCByZXNWYXIsICc7Jyk7XG5cbiAgICAgICAgcmVsZWFzZVZhcnMocmVzVmFyLCBpLCBsZW4sIGN1ckl0ZW0sIGNvbmQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZVBvc1ByZWRpY2F0ZShpdGVtLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIGFycmF5RXhwciA9IGl0ZW0uYXJnLCBmcm9tSWR4LCB0b0lkeDtcbiAgICAgICAgaWYoYXJyYXlFeHByLmlkeCkge1xuICAgICAgICAgICAgdmFyIGlkeCA9IGFjcXVpcmVWYXIoKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJyYXlFeHByLmlkeCwgaWR4LCBjdHgpO1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgIGlkeCwgJzwgMCAmJiAoJywgaWR4LCAnPScsIGN0eCwgJy5sZW5ndGggKycsIGlkeCwgJyk7JyxcbiAgICAgICAgICAgICAgICBkZXN0LCAnPScsIGN0eCwgJ1snLCBpZHgsICddID09IG51bGw/IFtdIDogWycsIGN0eCwgJ1snLCBpZHgsICddXTsnKTtcbiAgICAgICAgICAgIHJlbGVhc2VWYXJzKGlkeCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhcnJheUV4cHIuZnJvbUlkeCkge1xuICAgICAgICAgICAgaWYoYXJyYXlFeHByLnRvSWR4KSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcnJheUV4cHIuZnJvbUlkeCwgZnJvbUlkeCA9IGFjcXVpcmVWYXIoKSwgY3R4KTtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFycmF5RXhwci50b0lkeCwgdG9JZHggPSBhY3F1aXJlVmFyKCksIGN0eCk7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9JywgY3R4LCAnLnNsaWNlKCcsIGZyb21JZHgsICcsJywgdG9JZHgsICcpOycpO1xuICAgICAgICAgICAgICAgIHJlbGVhc2VWYXJzKGZyb21JZHgsIHRvSWR4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJyYXlFeHByLmZyb21JZHgsIGZyb21JZHggPSBhY3F1aXJlVmFyKCksIGN0eCk7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9JywgY3R4LCAnLnNsaWNlKCcsIGZyb21JZHgsICcpOycpO1xuICAgICAgICAgICAgICAgIHJlbGVhc2VWYXJzKGZyb21JZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcnJheUV4cHIudG9JZHgsIHRvSWR4ID0gYWNxdWlyZVZhcigpLCBjdHgpO1xuICAgICAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9JywgY3R4LCAnLnNsaWNlKDAsJywgdG9JZHgsICcpOycpO1xuICAgICAgICAgICAgcmVsZWFzZVZhcnModG9JZHgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlRXhwcihleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgc3dpdGNoKGV4cHIudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTWU5UQVguUEFUSDpcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVQYXRoKGV4cHIsIGRlc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkNPTkNBVF9FWFBSOlxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUNvbmNhdEV4cHIoZXhwciwgZGVzdCwgY3R4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguQ09NUEFSSVNPTl9FWFBSOlxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUNvbXBhcmlzb25FeHByKGV4cHIsIGRlc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLk1BVEhfRVhQUjpcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVNYXRoRXhwcihleHByLCBkZXN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5MT0dJQ0FMX0VYUFI6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlTG9naWNhbEV4cHIoZXhwciwgZGVzdCwgY3R4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguVU5BUllfRVhQUjpcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVVbmFyeUV4cHIoZXhwciwgZGVzdCwgY3R4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguTElURVJBTDpcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0nKTtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVMaXRlcmFsKGV4cHIudmFsKTtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goJzsnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUxpdGVyYWwodmFsKSB7XG4gICAgICAgIGJvZHkucHVzaCh0eXBlb2YgdmFsID09PSAnc3RyaW5nJz8gZXNjYXBlU3RyKHZhbCkgOiB2YWwgPT09IG51bGw/ICdudWxsJyA6IHZhbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlQ29tcGFyaXNvbkV4cHIoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciB2YWwxID0gYWNxdWlyZVZhcigpLCB2YWwyID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgaXNWYWwxQXJyYXkgPSBhY3F1aXJlVmFyKCksIGlzVmFsMkFycmF5ID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgaSA9IGFjcXVpcmVWYXIoKSwgaiA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGxlbjEgPSBhY3F1aXJlVmFyKCksIGxlbjIgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBsZWZ0QXJnID0gZXhwci5hcmdzWzBdLCByaWdodEFyZyA9IGV4cHIuYXJnc1sxXTtcblxuICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0gZmFsc2U7Jyk7XG5cbiAgICAgICAgdHJhbnNsYXRlRXhwcihsZWZ0QXJnLCB2YWwxLCBjdHgpO1xuICAgICAgICB0cmFuc2xhdGVFeHByKHJpZ2h0QXJnLCB2YWwyLCBjdHgpO1xuXG4gICAgICAgIHZhciBpc0xlZnRBcmdQYXRoID0gbGVmdEFyZy50eXBlID09PSBTWU5UQVguUEFUSCxcbiAgICAgICAgICAgIGlzUmlnaHRBcmdMaXRlcmFsID0gcmlnaHRBcmcudHlwZSA9PT0gU1lOVEFYLkxJVEVSQUw7XG5cbiAgICAgICAgYm9keS5wdXNoKGlzVmFsMUFycmF5LCAnPScpO1xuICAgICAgICBpc0xlZnRBcmdQYXRoPyBib2R5LnB1c2goJ3RydWU7JykgOiBib2R5LnB1c2goJ2lzQXJyKCcsIHZhbDEsICcpOycpO1xuXG4gICAgICAgIGJvZHkucHVzaChpc1ZhbDJBcnJheSwgJz0nKTtcbiAgICAgICAgaXNSaWdodEFyZ0xpdGVyYWw/IGJvZHkucHVzaCgnZmFsc2U7JykgOiBib2R5LnB1c2goJ2lzQXJyKCcsIHZhbDIsICcpOycpO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICdpZignKTtcbiAgICAgICAgaXNMZWZ0QXJnUGF0aCB8fCBib2R5LnB1c2goaXNWYWwxQXJyYXksICcmJicpO1xuICAgICAgICBib2R5LnB1c2godmFsMSwgJy5sZW5ndGggPT09IDEpIHsnLFxuICAgICAgICAgICAgICAgIHZhbDEsICc9JywgdmFsMSwgJ1swXTsnLFxuICAgICAgICAgICAgICAgIGlzVmFsMUFycmF5LCAnPSBmYWxzZTsnLFxuICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgaXNSaWdodEFyZ0xpdGVyYWwgfHwgYm9keS5wdXNoKFxuICAgICAgICAgICAgJ2lmKCcsIGlzVmFsMkFycmF5LCAnJiYnLCB2YWwyLCAnLmxlbmd0aCA9PT0gMSkgeycsXG4gICAgICAgICAgICAgICAgdmFsMiwgJz0nLCB2YWwyLCAnWzBdOycsXG4gICAgICAgICAgICAgICAgaXNWYWwyQXJyYXksICc9IGZhbHNlOycsXG4gICAgICAgICAgICAnfScpO1xuXG4gICAgICAgIGJvZHkucHVzaChpLCAnPSAwOycsXG4gICAgICAgICAgICAnaWYoJywgaXNWYWwxQXJyYXksICcpIHsnLFxuICAgICAgICAgICAgICAgIGxlbjEsICc9JywgdmFsMSwgJy5sZW5ndGg7Jyk7XG5cbiAgICAgICAgaWYoIWlzUmlnaHRBcmdMaXRlcmFsKSB7XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgJ2lmKCcsIGlzVmFsMkFycmF5LCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgbGVuMiwgJz0nLCB2YWwyLCAnLmxlbmd0aDsnLFxuICAgICAgICAgICAgICAgICAgICAnd2hpbGUoJywgaSwgJzwnLCBsZW4xLCAnJiYgIScsIGRlc3QsICcpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaiwgJz0gMDsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3doaWxlKCcsIGosICc8JywgbGVuMiwgJykgeycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQ29uZGl0aW9uKGV4cHIub3AsIFt2YWwxLCAnWycsIGksICddJ10uam9pbignJyksIFt2YWwyLCAnWycsIGosICddJ10uam9pbignJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdCwgJz0gdHJ1ZTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYnJlYWs7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJysrJywgaiwgJzsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJysrJywgaSwgJzsnLFxuICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICdlbHNlIHsnKTtcbiAgICAgICAgfVxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICd3aGlsZSgnLCBpLCAnPCcsIGxlbjEsICcpIHsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQ29uZGl0aW9uKGV4cHIub3AsIFt2YWwxLCAnWycsIGksICddJ10uam9pbignJyksIHZhbDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3QsICc9IHRydWU7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYnJlYWs7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICcrKycsIGksICc7JyxcbiAgICAgICAgICAgICAgICAgICAgJ30nKTtcblxuICAgICAgICBpc1JpZ2h0QXJnTGl0ZXJhbCB8fCBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgJ30nKTtcblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAnfScpO1xuXG4gICAgICAgIGlmKCFpc1JpZ2h0QXJnTGl0ZXJhbCkge1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgJ2Vsc2UgaWYoJywgaXNWYWwyQXJyYXksJykgeycsXG4gICAgICAgICAgICAgICAgbGVuMiwgJz0nLCB2YWwyLCAnLmxlbmd0aDsnLFxuICAgICAgICAgICAgICAgICd3aGlsZSgnLCBpLCAnPCcsIGxlbjIsICcpIHsnKTtcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVDb25kaXRpb24oZXhwci5vcCwgdmFsMSwgW3ZhbDIsICdbJywgaSwgJ10nXS5qb2luKCcnKSk7XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0LCAnPSB0cnVlOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnYnJlYWs7JyxcbiAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAnKysnLCBpLCAnOycsXG4gICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICdlbHNlIHsnLFxuICAgICAgICAgICAgICAgIGRlc3QsICc9JywgYmluYXJ5T3BlcmF0b3JzW2V4cHIub3BdKHZhbDEsIHZhbDIpLCAnOycsXG4gICAgICAgICAgICAnfScpO1xuXG4gICAgICAgIHJlbGVhc2VWYXJzKHZhbDEsIHZhbDIsIGlzVmFsMUFycmF5LCBpc1ZhbDJBcnJheSwgaSwgaiwgbGVuMSwgbGVuMik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd3JpdGVDb25kaXRpb24ob3AsIHZhbDFFeHByLCB2YWwyRXhwcikge1xuICAgICAgICBib2R5LnB1c2goJ2lmKCcsIGJpbmFyeU9wZXJhdG9yc1tvcF0odmFsMUV4cHIsIHZhbDJFeHByKSwgJykgeycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUxvZ2ljYWxFeHByKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgY29uZGl0aW9uVmFycyA9IFtdLFxuICAgICAgICAgICAgYXJncyA9IGV4cHIuYXJncywgbGVuID0gYXJncy5sZW5ndGgsXG4gICAgICAgICAgICBpID0gMCwgdmFsO1xuXG4gICAgICAgIGJvZHkucHVzaChkZXN0LCAnPSBmYWxzZTsnKTtcbiAgICAgICAgc3dpdGNoKGV4cHIub3ApIHtcbiAgICAgICAgICAgIGNhc2UgJyYmJzpcbiAgICAgICAgICAgICAgICB3aGlsZShpIDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvblZhcnMucHVzaCh2YWwgPSBhY3F1aXJlVmFyKCkpO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFyZ3NbaV0sIHZhbCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYm9keS5wdXNoKCdpZignLCBjb252ZXJ0VG9Cb29sKGFyZ3NbaSsrXSwgdmFsKSwgJykgeycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0gdHJ1ZTsnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnfHwnOlxuICAgICAgICAgICAgICAgIHdoaWxlKGkgPCBsZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uVmFycy5wdXNoKHZhbCA9IGFjcXVpcmVWYXIoKSk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnc1tpXSwgdmFsLCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAnaWYoJywgY29udmVydFRvQm9vbChhcmdzW2ldLCB2YWwpLCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0LCAnPSB0cnVlOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnfScpO1xuICAgICAgICAgICAgICAgICAgICBpZihpKysgKyAxIDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5LnB1c2goJ2Vsc2UgeycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC0tbGVuO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUobGVuLS0pIHtcbiAgICAgICAgICAgIGJvZHkucHVzaCgnfScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVsZWFzZVZhcnMuYXBwbHkobnVsbCwgY29uZGl0aW9uVmFycyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlTWF0aEV4cHIoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciB2YWwxID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgdmFsMiA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGFyZ3MgPSBleHByLmFyZ3M7XG5cbiAgICAgICAgdHJhbnNsYXRlRXhwcihhcmdzWzBdLCB2YWwxLCBjdHgpO1xuICAgICAgICB0cmFuc2xhdGVFeHByKGFyZ3NbMV0sIHZhbDIsIGN0eCk7XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgZGVzdCwgJz0nLFxuICAgICAgICAgICAgYmluYXJ5T3BlcmF0b3JzW2V4cHIub3BdKFxuICAgICAgICAgICAgICAgIGNvbnZlcnRUb1NpbmdsZVZhbHVlKGFyZ3NbMF0sIHZhbDEpLFxuICAgICAgICAgICAgICAgIGNvbnZlcnRUb1NpbmdsZVZhbHVlKGFyZ3NbMV0sIHZhbDIpKSxcbiAgICAgICAgICAgICc7Jyk7XG5cbiAgICAgICAgcmVsZWFzZVZhcnModmFsMSwgdmFsMik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlVW5hcnlFeHByKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgdmFsID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgYXJnID0gZXhwci5hcmc7XG5cbiAgICAgICAgdHJhbnNsYXRlRXhwcihhcmcsIHZhbCwgY3R4KTtcblxuICAgICAgICBzd2l0Y2goZXhwci5vcCkge1xuICAgICAgICAgICAgY2FzZSAnISc6XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9ICEnLCBjb252ZXJ0VG9Cb29sKGFyZywgdmFsKSArICc7Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJy0nOlxuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPSAtJywgY29udmVydFRvU2luZ2xlVmFsdWUoYXJnLCB2YWwpICsgJzsnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbGVhc2VWYXJzKHZhbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlQ29uY2F0RXhwcihleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIGFyZ1ZhcnMgPSBbXSxcbiAgICAgICAgICAgIGFyZ3MgPSBleHByLmFyZ3MsXG4gICAgICAgICAgICBsZW4gPSBhcmdzLmxlbmd0aCxcbiAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgIHdoaWxlKGkgPCBsZW4pIHtcbiAgICAgICAgICAgIGFyZ1ZhcnMucHVzaChhY3F1aXJlVmFyKCkpO1xuICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcmdzW2ldLCBhcmdWYXJzW2krK10sIGN0eCk7XG4gICAgICAgIH1cblxuICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0gY29uY2F0LmNhbGwoJywgYXJnVmFycy5qb2luKCcsJyksICcpOycpO1xuXG4gICAgICAgIHJlbGVhc2VWYXJzLmFwcGx5KG51bGwsIGFyZ1ZhcnMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVzY2FwZVN0cihzKSB7XG4gICAgICAgIHJldHVybiAnXFwnJyArIHMucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKS5yZXBsYWNlKC8nL2csICdcXFxcXFwnJykgKyAnXFwnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbmxpbmVBcHBlbmRUb0FycmF5KHJlcywgdmFsLCB0bXBBcnIsIGxlbikge1xuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAnaWYodHlwZW9mICcsIHZhbCwgJyE9PSBcInVuZGVmaW5lZFwiKSB7JyxcbiAgICAgICAgICAgICAgICAnaWYoaXNBcnIoJywgdmFsLCAnKSkgeycpO1xuICAgICAgICBpZih0bXBBcnIpIHtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgbGVuLCAnPiAxPycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lUHVzaFRvQXJyYXkodG1wQXJyLCB2YWwpO1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgJzonKTtcbiAgICAgICAgfVxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgIHJlcywgJz0nLCByZXMsICcubGVuZ3RoPycsIHJlcywgJy5jb25jYXQoJywgdmFsLCAnKSA6JywgdmFsLCAnLnNsaWNlKCknLCAnOycsXG4gICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICdlbHNlIHsnKTtcbiAgICAgICAgdG1wQXJyICYmIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgJ2lmKCcsIHRtcEFyciwgJy5sZW5ndGgpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLCAnPSBjb25jYXQuYXBwbHkoJywgcmVzLCAnLCcsIHRtcEFyciwgJyk7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcEFyciwgJz0gW107JyxcbiAgICAgICAgICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgICAgICAgICAgICAgaW5saW5lUHVzaFRvQXJyYXkocmVzLCB2YWwpO1xuICAgICAgICBib2R5LnB1c2goJzsnLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICd9Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5saW5lUHVzaFRvQXJyYXkocmVzLCB2YWwpIHtcbiAgICAgICAgYm9keS5wdXNoKHJlcywgJy5sZW5ndGg/JywgcmVzLCAnLnB1c2goJywgdmFsLCAnKSA6JywgIHJlcywgJ1swXSA9JywgdmFsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb252ZXJ0VG9Cb29sKGFyZywgdmFyTmFtZSkge1xuICAgICAgICBzd2l0Y2goYXJnLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkxPR0lDQUxfRVhQUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyTmFtZTtcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguTElURVJBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJyEhJyArIHZhck5hbWU7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLlBBVEg6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhck5hbWUgKyAnLmxlbmd0aCA+IDAnO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBbJyh0eXBlb2YgJywgdmFyTmFtZSwgJz09PSBcImJvb2xlYW5cIj8nLFxuICAgICAgICAgICAgICAgICAgICB2YXJOYW1lLCAnOicsXG4gICAgICAgICAgICAgICAgICAgICdpc0FycignLCB2YXJOYW1lLCAnKT8nLCB2YXJOYW1lLCAnLmxlbmd0aCA+IDAgOiAhIScsIHZhck5hbWUsICcpJ10uam9pbignJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb252ZXJ0VG9TaW5nbGVWYWx1ZShhcmcsIHZhck5hbWUpIHtcbiAgICAgICAgc3dpdGNoKGFyZy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5MSVRFUkFMOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YXJOYW1lO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5QQVRIOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YXJOYW1lICsgJ1swXSc7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnKGlzQXJyKCcsIHZhck5hbWUsICcpPycsIHZhck5hbWUsICdbMF0gOiAnLCB2YXJOYW1lLCAnKSddLmpvaW4oJycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RhcnRzV2l0aFN0cmljdCh2YWwxLCB2YWwyKSB7XG4gICAgICAgIHJldHVybiBbJ3R5cGVvZiAnLCB2YWwxLCAnPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mICcsIHZhbDIsICc9PT0gXCJzdHJpbmdcIiAmJicsXG4gICAgICAgICAgICB2YWwxLCAnLmluZGV4T2YoJywgdmFsMiwgJykgPT09IDAnXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGFydHNXaXRoKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgcmV0dXJuIFt2YWwxLCAnIT0gbnVsbCAmJicsIHZhbDIsICchPSBudWxsICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJywgdmFsMiwgJy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkpID09PSAwJ10uam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kc1dpdGhTdHJpY3QodmFsMSwgdmFsMikge1xuICAgICAgICByZXR1cm4gWyd0eXBlb2YgJywgdmFsMSwgJz09PSBcInN0cmluZ1wiICYmIHR5cGVvZiAnLCB2YWwyLCAnPT09IFwic3RyaW5nXCIgJiYnLFxuICAgICAgICAgICAgdmFsMSwgJy5sZW5ndGggPj0nLCB2YWwyLCAnLmxlbmd0aCAmJicsXG4gICAgICAgICAgICB2YWwxLCAnLmxhc3RJbmRleE9mKCcsIHZhbDIsICcpID09PScsIHZhbDEsICcubGVuZ3RoIC0nLCB2YWwyLCAnLmxlbmd0aCddLmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZHNXaXRoKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgcmV0dXJuIFt2YWwxLCAnIT0gbnVsbCAmJicsIHZhbDIsICchPSBudWxsICYmJyxcbiAgICAgICAgICAgICcoJywgdmFsMSwgJz0nLCB2YWwxLCAnLnRvU3RyaW5nKCkpLmxlbmd0aCA+PScsICcoJywgdmFsMiwgJz0nLCB2YWwyLCAnLnRvU3RyaW5nKCkpLmxlbmd0aCAmJicsXG4gICAgICAgICAgICAnKCcsIHZhbDEsICcudG9Mb3dlckNhc2UoKSkubGFzdEluZGV4T2YoJywgJygnLCB2YWwyLCAnLnRvTG93ZXJDYXNlKCkpKSA9PT0nLFxuICAgICAgICAgICAgdmFsMSwgJy5sZW5ndGggLScsIHZhbDIsICcubGVuZ3RoJ10uam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29udGFpbnNTdHJpY3QodmFsMSwgdmFsMikge1xuICAgICAgICByZXR1cm4gWyd0eXBlb2YgJywgdmFsMSwgJz09PSBcInN0cmluZ1wiICYmIHR5cGVvZiAnLCB2YWwyLCAnPT09IFwic3RyaW5nXCIgJiYnLFxuICAgICAgICAgICAgdmFsMSwgJy5pbmRleE9mKCcsIHZhbDIsICcpID4gLTEnXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb250YWlucyh2YWwxLCB2YWwyKSB7XG4gICAgICAgIHJldHVybiBbdmFsMSwgJyE9IG51bGwgJiYgJywgdmFsMiwgJyE9IG51bGwgJiYnLFxuICAgICAgICAgICAgdmFsMSwgJy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignLCB2YWwyLCAnLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkgPiAtMSddLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHZhciBiaW5hcnlPcGVyYXRvcnMgPSB7XG4gICAgICAgICAgICAnPT09JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICc9PT0nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICc9PScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsndHlwZW9mICcsIHZhbDEsICc9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgJywgdmFsMiwgJz09PSBcInN0cmluZ1wiPycsXG4gICAgICAgICAgICAgICAgICAgIHZhbDEsICcudG9Mb3dlckNhc2UoKSA9PT0nLCB2YWwyLCAnLnRvTG93ZXJDYXNlKCkgOicgK1xuICAgICAgICAgICAgICAgICAgICB2YWwxLCAnPT0nLCB2YWwyXS5qb2luKCcnKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICc+PScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnPj0nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICc+JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICc+JyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnPD0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJzw9JyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnPCcgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnPCcgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyE9PScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnIT09JyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnIT0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJyE9JyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnXj09JyA6IHN0YXJ0c1dpdGhTdHJpY3QsXG5cbiAgICAgICAgICAgICc9PV4nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGFydHNXaXRoU3RyaWN0KHZhbDIsIHZhbDEpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJ149JyA6IHN0YXJ0c1dpdGgsXG5cbiAgICAgICAgICAgICc9XicgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0c1dpdGgodmFsMiwgdmFsMSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnJD09JyA6IGVuZHNXaXRoU3RyaWN0LFxuXG4gICAgICAgICAgICAnPT0kJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW5kc1dpdGhTdHJpY3QodmFsMiwgdmFsMSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnJD0nIDogZW5kc1dpdGgsXG5cbiAgICAgICAgICAgICc9JCcgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVuZHNXaXRoKHZhbDIsIHZhbDEpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyo9PScgOiBjb250YWluc1N0cmljdCxcblxuICAgICAgICAgICAgJz09KicgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5zU3RyaWN0KHZhbDIsIHZhbDEpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJz0qJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbnModmFsMiwgdmFsMSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnKj0nIDogY29udGFpbnMsXG5cbiAgICAgICAgICAgICcrJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICcrJyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnLScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnLScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyonIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJyonICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICcvJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICcvJyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnJScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnJScgKyB2YWwyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0ZTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGNvbXBpbGUocGF0aCkge1xuICAgIHJldHVybiBGdW5jdGlvbignZGF0YSxzdWJzdCcsIHRyYW5zbGF0ZShwYXJzZShwYXRoKSkpO1xufVxuXG52YXIgY2FjaGUgPSB7fSxcbiAgICBjYWNoZUtleXMgPSBbXSxcbiAgICBwYXJhbXMgPSB7XG4gICAgICAgIGNhY2hlU2l6ZSA6IDEwMFxuICAgIH0sXG4gICAgc2V0UGFyYW1zSG9va3MgPSB7XG4gICAgICAgIGNhY2hlU2l6ZSA6IGZ1bmN0aW9uKG9sZFZhbCwgbmV3VmFsKSB7XG4gICAgICAgICAgICBpZihuZXdWYWwgPCBvbGRWYWwgJiYgY2FjaGVLZXlzLmxlbmd0aCA+IG5ld1ZhbCkge1xuICAgICAgICAgICAgICAgIHZhciByZW1vdmVkS2V5cyA9IGNhY2hlS2V5cy5zcGxpY2UoMCwgY2FjaGVLZXlzLmxlbmd0aCAtIG5ld1ZhbCksXG4gICAgICAgICAgICAgICAgICAgIGkgPSByZW1vdmVkS2V5cy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICB3aGlsZShpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNhY2hlW3JlbW92ZWRLZXlzW2ldXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG52YXIgZGVjbCA9IGZ1bmN0aW9uKHBhdGgsIGN0eCwgc3Vic3RzKSB7XG4gICAgaWYoIWNhY2hlW3BhdGhdKSB7XG4gICAgICAgIGNhY2hlW3BhdGhdID0gY29tcGlsZShwYXRoKTtcbiAgICAgICAgaWYoY2FjaGVLZXlzLnB1c2gocGF0aCkgPiBwYXJhbXMuY2FjaGVTaXplKSB7XG4gICAgICAgICAgICBkZWxldGUgY2FjaGVbY2FjaGVLZXlzLnNoaWZ0KCldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhY2hlW3BhdGhdKGN0eCwgc3Vic3RzIHx8IHt9KTtcbn07XG5cbmRlY2wudmVyc2lvbiA9ICcwLjQuMCc7XG5cbmRlY2wucGFyYW1zID0gZnVuY3Rpb24oX3BhcmFtcykge1xuICAgIGlmKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG4gICAgZm9yKHZhciBuYW1lIGluIF9wYXJhbXMpIHtcbiAgICAgICAgaWYoX3BhcmFtcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgICAgICAgICAgc2V0UGFyYW1zSG9va3NbbmFtZV0gJiYgc2V0UGFyYW1zSG9va3NbbmFtZV0ocGFyYW1zW25hbWVdLCBfcGFyYW1zW25hbWVdKTtcbiAgICAgICAgICAgIHBhcmFtc1tuYW1lXSA9IF9wYXJhbXNbbmFtZV07XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5kZWNsLmNvbXBpbGUgPSBjb21waWxlO1xuXG5kZWNsLmFwcGx5ID0gZGVjbDtcblxuaWYodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZGVjbDtcbn1cbmVsc2UgaWYodHlwZW9mIG1vZHVsZXMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlcy5kZWZpbmUoJ2pzcGF0aCcsIGZ1bmN0aW9uKHByb3ZpZGUpIHtcbiAgICAgICAgcHJvdmlkZShkZWNsKTtcbiAgICB9KTtcbn1cbmVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGRlZmluZShmdW5jdGlvbihyZXF1aXJlLCBleHBvcnRzLCBtb2R1bGUpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBkZWNsO1xuICAgIH0pO1xufVxuZWxzZSB7XG4gICAgd2luZG93LkpTUGF0aCA9IGRlY2w7XG59XG5cbn0pKCk7XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEVTNiBFWFRFTlNJT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmlmKCFTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgpXG57XG5cdFN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCA9IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRjb25zdCBiYXNlID0gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDtcblxuXHRcdHJldHVybiB0aGlzLmluZGV4T2YocywgYmFzZSkgPT09IGJhc2U7XG5cdH07XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pZighU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aClcbntcblx0U3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCA9IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRjb25zdCBiYXNlID0gdGhpcy5sZW5ndGggLSBzLmxlbmd0aDtcblxuXHRcdHJldHVybiB0aGlzLmluZGV4T2YocywgYmFzZSkgPT09IGJhc2U7XG5cdH07XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogSlFVRVJZIEVYVEVOU0lPTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuY29uc3QgX2FtaV9pbnRlcm5hbF9qUXVlcnlBamF4ID0galF1ZXJ5LmFqYXg7XG5jb25zdCBfYW1pX2ludGVybmFsX2pRdWVyeVZhbCA9IGpRdWVyeS5mbi52YWw7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5qUXVlcnkuYWpheCA9IGZ1bmN0aW9uKHNldHRpbmdzKVxue1xuXHRpZih0eXBlb2Ygc2V0dGluZ3MgPT09ICdvYmplY3QnXG5cdCAgICYmXG5cdCAgIHNldHRpbmdzLmRhdGFUeXBlID09PSAnc2hlZXQnXG5cdCApIHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dCwgdXJsXSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnY29udGV4dCcsICd1cmwnXSxcblx0XHRcdFtyZXN1bHQsICcnXSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodXJsKVxuXHRcdHtcblx0XHRcdCQoJ2hlYWQnKS5hcHBlbmQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiJyArIHVybCArICdcIj48L2xpbms+JykucHJvbWlzZSgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH1cblx0ZWxzZVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIF9hbWlfaW50ZXJuYWxfalF1ZXJ5QWpheC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZmluZFdpdGhTZWxmOiBmdW5jdGlvbihzZWxlY3Rvcilcblx0e1xuXHRcdHJldHVybiB0aGlzLmZpbmQoc2VsZWN0b3IpLmFkZEJhY2soc2VsZWN0b3IpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2VyaWFsaXplT2JqZWN0OiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSB7fTtcblxuXHRcdHRoaXMuc2VyaWFsaXplQXJyYXkoKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdGlmKGl0ZW0ubmFtZSBpbiByZXN1bHQpXG5cdFx0XHR7XG5cdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChyZXN1bHRbaXRlbS5uYW1lXSkgPT09ICdbb2JqZWN0IFN0cmluZ10nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0W2l0ZW0ubmFtZV0gPSBbcmVzdWx0W2l0ZW0ubmFtZV1dO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVzdWx0W2l0ZW0ubmFtZV0ucHVzaChpdGVtLnZhbHVlIHx8ICcnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0W2l0ZW0ubmFtZV0gPSBpdGVtLnZhbHVlIHx8ICcnO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHZhbDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyoqLyBpZihhcmd1bWVudHMubGVuZ3RoID09PSAwKSAvLyBnZXR0ZXJcblx0XHR7XG5cdFx0XHRpZih0aGlzLmhhc0NsYXNzKCdmb3JtLWVkaXRvci1oaWRkZW4nKSlcblx0XHRcdHtcblx0XHRcdFx0Y29uc3Qgc2Vzc2lvbiA9IHRoaXMuZGF0YSgnc2Vzc2lvbicpO1xuXG5cdFx0XHRcdHJldHVybiBzZXNzaW9uID8gc2Vzc2lvbi5nZXRWYWx1ZSgpIDogJyc7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgLy8gc2V0dGVyXG5cdFx0e1xuXHRcdFx0aWYodGhpcy5oYXNDbGFzcygnZm9ybS1lZGl0b3ItaGlkZGVuJykpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IHNlc3Npb24gPSB0aGlzLmRhdGEoJ3Nlc3Npb24nKTtcblxuXHRcdFx0XHRpZihzZXNzaW9uKSBzZXNzaW9uLnNldFZhbHVlKGFyZ3VtZW50c1swXSk7IHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBfYW1pX2ludGVybmFsX2pRdWVyeVZhbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBCT09UU1RSQVAgRVhURU5TSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5sZXQgX2FtaV9pbnRlcm5hbF9tb2RhbFpJbmRleCA9IDEwNTA7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kKGRvY3VtZW50KS5vbignc2hvdy5icy5tb2RhbCcsICcubW9kYWwnLCAoZSkgPT4ge1xuXG5cdGNvbnN0IGVsID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXG5cdHNldFRpbWVvdXQoKCkgPT4ge1xuXG5cdFx0JCgnYm9keSA+IC5tb2RhbC1iYWNrZHJvcDpsYXN0JykuY3NzKCd6LWluZGV4JywgX2FtaV9pbnRlcm5hbF9tb2RhbFpJbmRleCsrKTtcblx0XHQvKi0tLS0tLS0tLS0tKi9lbC8qLS0tLS0tLS0tLS0qLy5jc3MoJ3otaW5kZXgnLCBfYW1pX2ludGVybmFsX21vZGFsWkluZGV4KyspO1xuXG5cdH0sIDEwKTtcbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogTkFNRVNQQUNFIEhFTFBFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZnVuY3Rpb24gXyRjcmVhdGVOYW1lc3BhY2UoJG5hbWUsIHgpXG57XG5cdGxldCBwYXJlbnQgPSB3aW5kb3c7XG5cblx0Y29uc3QgcGFydHMgPSAkbmFtZS5zcGxpdCgvXFxzKlxcLlxccyovZyksIGwgPSBwYXJ0cy5sZW5ndGggLSAxO1xuXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsOyBpKyspXG5cdHtcblx0XHRpZihwYXJlbnRbcGFydHNbaV1dKVxuXHRcdHtcblx0XHRcdHBhcmVudCA9IHBhcmVudFtwYXJ0c1tpXV07XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dID0ge307XG5cdFx0fVxuXHR9XG5cblx0cGFyZW50W3BhcnRzW2ldXSA9IHg7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5mdW5jdGlvbiBfJGFkZFRvTmFtZXNwYWNlKCRuYW1lLCB4KVxue1xuXHRsZXQgcGFyZW50ID0gd2luZG93O1xuXG5cdGNvbnN0IHBhcnRzID0gJG5hbWUuc3BsaXQoL1xccypcXC5cXHMqL2cpLCBsID0gcGFydHMubGVuZ3RoIC0gMTtcblxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbDsgaSsrKVxuXHR7XG5cdFx0aWYocGFyZW50W3BhcnRzW2ldXSlcblx0XHR7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2AnICsgJG5hbWUgKyAnYCAoYCcgKyBwYXJ0c1tpXSArICdgKSBub3QgZGVjbGFyZWQnO1xuXHRcdH1cblx0fVxuXG5cdHBhcmVudFtwYXJ0c1tpXV0gPSB4O1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIE5BTUVTUEFDRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICAqIENyZWF0ZSBhIG5ldyBuYW1lc3BhY2VcbiAgKiBAcGFyYW0ge1N0cmluZ30gJG5hbWUgdGhlIG5hbWVzcGFjZSBuYW1lXG4gICogQHBhcmFtIHtPYmplY3R9IFskZGVzY3JdIHRoZSBuYW1lc3BhY2UgYm9keVxuICAqL1xuXG5mdW5jdGlvbiAkQU1JTmFtZXNwYWNlKCRuYW1lLCAkZGVzY3IpXG57XG5cdGlmKCEkZGVzY3IpXG5cdHtcblx0XHQkZGVzY3IgPSB7fTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGRlc2NyLiRuYW1lID0gJG5hbWU7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfJGNyZWF0ZU5hbWVzcGFjZSgkbmFtZSwgJGRlc2NyKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGlmKCRkZXNjci4kKVxuXHR7XG5cdFx0JGRlc2NyLiQuYXBwbHkoJGRlc2NyKTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogSU5URVJGQUNFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gICogQ3JlYXRlIGEgbmV3IGludGVyZmFjZVxuICAqIEBwYXJhbSB7U3RyaW5nfSAkbmFtZSB0aGUgaW50ZXJmYWNlIG5hbWVcbiAgKiBAcGFyYW0ge09iamVjdH0gWyRkZXNjcl0gdGhlIGludGVyZmFjZSBib2R5XG4gICovXG5cbmZ1bmN0aW9uICRBTUlJbnRlcmZhY2UoJG5hbWUsICRkZXNjcilcbntcblx0aWYoISRkZXNjcilcblx0e1xuXHRcdCRkZXNjciA9IHt9O1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjb25zdCAkY2xhc3MgPSBmdW5jdGlvbigpXG5cdHtcblx0XHR0aHJvdyAnY291bGQgbm9yIGluc3RhbnRpYXRlIGludGVyZmFjZSc7XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpZigkZGVzY3IuJGV4dGVuZHMpXG5cdHtcblx0XHR0aHJvdyAnYCRleHRlbmRzYCBub3QgYWxsb3dlZCBmb3IgaW50ZXJmYWNlJztcblx0fVxuXG5cdGlmKCRkZXNjci4kaW1wbGVtZW50cylcblx0e1xuXHRcdHRocm93ICdgJGltcGxlbWVudHNgIG5vdCBhbGxvd2VkIGZvciBpbnRlcmZhY2UnO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpZigkZGVzY3IuJClcblx0e1xuXHRcdHRocm93ICdgJGAgbm90IGFsbG93ZWQgZm9yIGludGVyZmFjZSc7XG5cdH1cblxuXHRpZigkZGVzY3IuJGluaXQpXG5cdHtcblx0XHR0aHJvdyAnYCRpbml0YCBub3QgYWxsb3dlZCBmb3IgaW50ZXJmYWNlJztcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGNsYXNzLiRuYW1lID0gJG5hbWU7XG5cdCRjbGFzcy4kY2xhc3MgPSAkY2xhc3M7XG5cdCRjbGFzcy4kbWVtYmVycyA9ICRkZXNjcjtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF8kYWRkVG9OYW1lc3BhY2UoJG5hbWUsICRjbGFzcyk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBDTEFTU0VTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAgKiBDcmVhdGUgYSBuZXcgY2xhc3NcbiAgKiBAcGFyYW0ge1N0cmluZ30gJG5hbWUgdGhlIGNsYXNzIG5hbWVcbiAgKiBAcGFyYW0ge09iamVjdH0gWyRkZXNjcl0gdGhlIGNsYXNzIGJvZHlcbiAgKi9cblxuZnVuY3Rpb24gJEFNSUNsYXNzKCRuYW1lLCAkZGVzY3IpXG57XG5cdGlmKCEkZGVzY3IpXG5cdHtcblx0XHQkZGVzY3IgPSB7fTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y29uc3QgJHN1cGVyID0gKCRkZXNjci4kZXh0ZW5kcyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSA/ICRkZXNjci4kZXh0ZW5kcy5wcm90b3R5cGUgOiB7fTtcblxuXHRjb25zdCAkc3VwZXJfaW1wbGVtZW50cyA9ICgkc3VwZXIuJGltcGxlbWVudHMgaW5zdGFuY2VvZiBBcnJheSkgPyAkc3VwZXIuJGltcGxlbWVudHMgOiBbXTtcblx0Y29uc3QgJGRlc2NyX2ltcGxlbWVudHMgPSAoJGRlc2NyLiRpbXBsZW1lbnRzIGluc3RhbmNlb2YgQXJyYXkpID8gJGRlc2NyLiRpbXBsZW1lbnRzIDogW107XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjb25zdCAkY2xhc3MgPSBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRmb3IoY29uc3QgaSBpbiB0aGlzLiRpbXBsZW1lbnRzKVxuXHRcdHtcblx0XHRcdGlmKHRoaXMuJGltcGxlbWVudHMuaGFzT3duUHJvcGVydHkoaSkpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0ICRpbnRlcmZhY2UgPSB0aGlzLiRpbXBsZW1lbnRzW2ldO1xuXG5cdFx0XHRcdGZvcihjb25zdCBqIGluICRpbnRlcmZhY2UuJG1lbWJlcnMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZigkaW50ZXJmYWNlLiRtZW1iZXJzLmhhc093blByb3BlcnR5KGopKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGNvbnN0ICRtZW1iZXIgPSAkaW50ZXJmYWNlLiRtZW1iZXJzW2pdO1xuXG5cdFx0XHRcdFx0XHRpZih0eXBlb2YodGhpc1tqXSkgIT09IHR5cGVvZigkbWVtYmVyKSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhyb3cgJ2NsYXNzIGAnICsgdGhpcy4kbmFtZSArICdgIHdpdGggbXVzdCBpbXBsZW1lbnQgYCcgKyAkaW50ZXJmYWNlLiRuYW1lICsgJy4nICsgaiArICdgJztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBfc3VwZXIgPSB0aGlzLiRjbGFzcy5faW50ZXJuYWxfc3VwZXI7XG5cdFx0Y29uc3QgX2FkZGVkID0gdGhpcy4kY2xhc3MuX2ludGVybmFsX2FkZGVkO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy4kc3VwZXIgPSB7fTtcblxuXHRcdGZvcihjb25zdCBuYW1lIGluIF9zdXBlcilcblx0XHR7XG5cdFx0XHRpZihfc3VwZXIuaGFzT3duUHJvcGVydHkobmFtZSkpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuJHN1cGVyW25hbWVdID0gKChfc3VwZXIsIG5hbWUsIHRoYXQpID0+IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0cmV0dXJuIF9zdXBlcltuYW1lXS5hcHBseSh0aGF0LCBhcmd1bWVudHMpXG5cblx0XHRcdFx0fSkoX3N1cGVyLCBuYW1lLCB0aGlzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLiRhZGRlZCA9IHt9O1xuXG5cdFx0Zm9yKGNvbnN0IG5hbWUgaW4gX2FkZGVkKVxuXHRcdHtcblx0XHRcdGlmKF9hZGRlZC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcblx0XHRcdHtcblx0XHRcdFx0dGhpcy4kYWRkZWRbbmFtZV0gPSAoKF9hZGRlZCwgbmFtZSwgdGhhdCkgPT4gZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRyZXR1cm4gX2FkZGVkW25hbWVdLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG5cblx0XHRcdFx0fSkoX2FkZGVkLCBuYW1lLCB0aGlzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLiRpbml0KVxuXHRcdHtcblx0XHRcdHRoaXMuJGluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkY2xhc3MuX2ludGVybmFsX3N1cGVyID0ge307XG5cdCRjbGFzcy5faW50ZXJuYWxfYWRkZWQgPSB7fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcihjb25zdCBuYW1lIGluICRzdXBlcilcblx0e1xuXHRcdGlmKG5hbWUgPT09ICckaW5pdCdcblx0XHQgICB8fFxuXHRcdCAgIG5hbWUuY2hhckF0KDApICE9PSAnJCdcblx0XHQgICB8fFxuXHRcdCAgICRzdXBlci5oYXNPd25Qcm9wZXJ0eShuYW1lKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuXHRcdCApIHtcblx0XHRcdCRjbGFzcy5faW50ZXJuYWxfc3VwZXJbbmFtZV0gPSAkc3VwZXJbbmFtZV07XG5cblx0XHRcdCRjbGFzcy5wcm90b3R5cGVbbmFtZV0gPSAkc3VwZXJbbmFtZV07XG5cdFx0fVxuXHR9XG5cblx0Zm9yKGNvbnN0IG5hbWUgaW4gJGRlc2NyKVxuXHR7XG5cdFx0aWYobmFtZSA9PT0gJyRpbml0J1xuXHRcdCAgIHx8XG5cdFx0ICAgbmFtZS5jaGFyQXQoMCkgIT09ICckJ1xuXHRcdCAgIHx8XG5cdFx0ICAgJGRlc2NyLmhhc093blByb3BlcnR5KG5hbWUpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5cdFx0ICkge1xuXHRcdFx0JGNsYXNzLl9pbnRlcm5hbF9hZGRlZFtuYW1lXSA9ICRkZXNjcltuYW1lXTtcblxuXHRcdFx0JGNsYXNzLnByb3RvdHlwZVtuYW1lXSA9ICRkZXNjcltuYW1lXTtcblx0XHR9XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRjbGFzcy5wcm90b3R5cGUuJG5hbWUgPSAkbmFtZTtcblx0JGNsYXNzLnByb3RvdHlwZS4kY2xhc3MgPSAkY2xhc3M7XG5cdCRjbGFzcy5wcm90b3R5cGUuJGltcGxlbWVudHMgPSAkc3VwZXJfaW1wbGVtZW50cy5jb25jYXQoJGRlc2NyX2ltcGxlbWVudHMpO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XyRhZGRUb05hbWVzcGFjZSgkbmFtZSwgJGNsYXNzKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGlmKCRkZXNjci4kKVxuXHR7XG5cdFx0JGRlc2NyLiQuYXBwbHkoJGNsYXNzKTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogTm9kZUpTIEVYVEVOU0lPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaWYodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKVxue1xuXHRtb2R1bGUuZXhwb3J0cy5OYW1lc3BhY2UgPSAkQU1JTmFtZXNwYWNlO1xuXHRtb2R1bGUuZXhwb3J0cy5JbnRlcmZhY2UgPSAkQU1JSW50ZXJmYWNlO1xuXHRtb2R1bGUuZXhwb3J0cy4gIENsYXNzICAgPSAgICRBTUlDbGFzcyAgO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEpRVUVSWSBFWFRFTlNJT04gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmlmKHR5cGVvZiBqUXVlcnkgIT09ICd1bmRlZmluZWQnKVxue1xuXHRqUXVlcnkuTmFtZXNwYWNlID0gJEFNSU5hbWVzcGFjZTtcblx0alF1ZXJ5LkludGVyZmFjZSA9ICRBTUlJbnRlcmZhY2U7XG5cdGpRdWVyeS4gIENsYXNzICAgPSAgICRBTUlDbGFzcyAgO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBBTUkgdXJsIHJvdXRpbmcgc3Vic3lzdGVtXG4gKiBAbmFtZXNwYWNlIGFtaVJvdXRlclxuICovXG5cbiRBTUlOYW1lc3BhY2UoJ2FtaVJvdXRlcicsIC8qKiBAbGVuZHMgYW1pUm91dGVyICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFJJVkFURSBNRU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfc2NyaXB0VVJMOiAnJyxcblx0X29yaWdpblVSTDogJycsXG5cdF93ZWJBcHBVUkw6ICcnLFxuXG5cdF9oYXNoOiAnJyxcblx0X2FyZ3M6IFtdLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3JvdXRlczogW10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFJJVkFURSBNRVRIT0RTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZWF0U2xhc2hlczogZnVuY3Rpb24odXJsKVxuXHR7XG5cdFx0dXJsID0gdXJsLnRyaW0oKTtcblxuXHRcdHdoaWxlKHVybFt1cmwubGVuZ3RoIC0gMV0gPT09ICcvJylcblx0XHR7XG5cdFx0XHR1cmwgPSB1cmwuc3Vic3RyaW5nKDAsIHVybC5sZW5ndGggLSAxKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdXJsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNUQVRJQyBDT05TVFJVQ1RPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5fYXJncy5sZW5ndGggPSAwO1xuXHRcdHRoaXMuX3JvdXRlcy5sZW5ndGggPSAwO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgIGhyZWYgID0gd2luZG93LmxvY2F0aW9uLiBocmVmIC50cmltKCk7XG5cdFx0Y29uc3QgIGhhc2ggID0gd2luZG93LmxvY2F0aW9uLiBoYXNoIC50cmltKCk7XG5cdFx0Y29uc3Qgc2VhcmNoID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC50cmltKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFNDUklQVF9VUkwgQU5EIE9SSUdJTl9VUkwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRmb3IobGV0IGlkeCwgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdGlkeCA9IHNjcmlwdHNbaV0uc3JjLmluZGV4T2YoJ2pzL2FtaS4nKTtcblxuXHRcdFx0aWYoaWR4ID4gMClcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5fc2NyaXB0VVJMID0gc2NyaXB0c1tpXS5zcmM7XG5cblx0XHRcdFx0dGhpcy5fb3JpZ2luVVJMID0gdGhpcy5fZWF0U2xhc2hlcyhcblx0XHRcdFx0XHR0aGlzLl9zY3JpcHRVUkwuc3Vic3RyaW5nKDAsIGlkeClcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogV0VCQVBQX1VSTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuX3dlYkFwcFVSTCA9IHRoaXMuX2VhdFNsYXNoZXMoXG5cdFx0XHRocmVmLnJlcGxhY2UoLyg/OlxcI3xcXD8pLiokLywgJycpXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBIQVNIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5faGFzaCA9IHRoaXMuX2VhdFNsYXNoZXMoXG5cdFx0XHRoYXNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXD8uKiQvLCAnJylcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEFSR1MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihzZWFyY2gpXG5cdFx0e1xuXHRcdFx0c2VhcmNoLnN1YnN0cmluZygxKS5zcGxpdCgnJicpLmZvckVhY2goKHBhcmFtKSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgcGFydHMgPSBwYXJhbS5zcGxpdCgnPScpO1xuXG5cdFx0XHRcdC8qKi8gaWYocGFydHMubGVuZ3RoID09PSAxKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5fYXJnc1tkZWNvZGVVUklDb21wb25lbnQocGFydHNbMF0pXSA9IC8qLS0tLS0tLS0qLyAnJyAvKi0tLS0tLS0tKi87XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZihwYXJ0cy5sZW5ndGggPT09IDIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLl9hcmdzW2RlY29kZVVSSUNvbXBvbmVudChwYXJ0c1swXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBVQkxJQyBNRVRIT0RTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBBV0YncyBzY3JpcHQgVVJMXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgQVdGJ3Mgc2NyaXB0IFVSTFxuXHQgICovXG5cblx0Z2V0U2NyaXB0VVJMOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2NyaXB0VVJMO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBvcmlnaW4gVVJMXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgb3JpZ2luIFVSTFxuXHQgICovXG5cblx0Z2V0T3JpZ2luVVJMOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fb3JpZ2luVVJMO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgd2ViYXBwIFVSTFxuXHQgICovXG5cblx0Z2V0V2ViQXBwVVJMOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fd2ViQXBwVVJMO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBhbmNob3IgcGFydCBvZiB0aGUgd2ViYXBwIFVSTFxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGFuY2hvciBwYXJ0IG9mIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKi9cblxuXHRnZXRIYXNoOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faGFzaDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgYXJndW1lbnRzIGV4dHJhY3RlZCBmcm9tIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gVGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFxuXHQgICovXG5cblx0Z2V0QXJnczogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2FyZ3M7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFwcGVuZHMgYSByb3V0aW5nIHJ1bGVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSByZWdFeHAgdGhlIHJlZ0V4cFxuXHQgICogQHBhcmFtIHtPYmplY3R9IGhhbmRsZXIgdGhlIGhhbmRsZXJcblx0ICAqIEByZXR1cm5zIHtOYW1lc3BhY2V9IFRoZSBhbWlSb3V0ZXIgc2luZ2xldG9uXG5cdCAgKi9cblxuXHRhcHBlbmQ6IGZ1bmN0aW9uKHJlZ0V4cCwgaGFuZGxlcilcblx0e1xuXHRcdHRoaXMuX3JvdXRlcy51bnNoaWZ0KHtcblx0XHRcdHJlZ0V4cDogcmVnRXhwLFxuXHRcdFx0aGFuZGxlcjogaGFuZGxlcixcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBSZW1vdmVzIHNvbWUgcm91dGluZyBydWxlc1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IHJlZ0V4cCB0aGUgcmVnRXhwXG5cdCAgKiBAcmV0dXJucyB7TmFtZXNwYWNlfSBUaGUgYW1pUm91dGVyIHNpbmdsZXRvblxuXHQgICovXG5cblx0cmVtb3ZlOiBmdW5jdGlvbihyZWdFeHApXG5cdHtcblx0XHR0aGlzLl9yb3V0ZXMgPSB0aGlzLl9yb3V0ZXMuZmlsdGVyKChyb3V0ZSkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gcm91dGUucmVnRXhwLnRvU3RyaW5nKCkgIT09IHJlZ0V4cC50b1N0cmluZygpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENoZWNrcyB3aGV0aGVyIHRoZSBVUkwgbWF0Y2hlcyB3aXRoIGEgcm91dGluZyBydWxlXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGNoZWNrOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbTtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9yb3V0ZXMubGVuZ3RoOyBpKyspXG5cdFx0e1xuXHRcdFx0bSA9IHRoaXMuX2hhc2gubWF0Y2godGhpcy5fcm91dGVzW2ldLnJlZ0V4cCk7XG5cblx0XHRcdGlmKG0pXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuX3JvdXRlc1tpXS5oYW5kbGVyLmFwcGx5KGFtaVJvdXRlciwgbSk7XG5cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBcHBlbmQgYSBuZXcgaGlzdG9yeSBlbnRyeVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggdGhlIG5ldyBwYXRoXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHQ9bnVsbF0gdGhlIG5ldyBjb250ZXh0XG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGFwcGVuZEhpc3RvcnlFbnRyeTogZnVuY3Rpb24ocGF0aCwgY29udGV4dCA9IG51bGwpXG5cdHtcblx0XHRpZihoaXN0b3J5LnB1c2hTdGF0ZSlcblx0XHR7XG5cdFx0XHRoaXN0b3J5LnB1c2hTdGF0ZShjb250ZXh0LCBudWxsLCB0aGlzLl93ZWJBcHBVUkwgKyB0aGlzLl9lYXRTbGFzaGVzKHBhdGgpKTtcblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBSZXBsYWNlIHRoZSBjdXJyZW50IGhpc3RvcnkgZW50cnlcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIHRoZSBuZXcgcGF0aFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0PW51bGxdIHRoZSBuZXcgY29udGV4dFxuXHQgICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAgKi9cblxuXHRyZXBsYWNlSGlzdG9yeUVudHJ5OiBmdW5jdGlvbihwYXRoLCBjb250ZXh0ID0gbnVsbClcblx0e1xuXHRcdGlmKGhpc3RvcnkucmVwbGFjZVN0YXRlKVxuXHRcdHtcblx0XHRcdGhpc3RvcnkucmVwbGFjZVN0YXRlKGNvbnRleHQsIG51bGwsIHRoaXMuX3dlYkFwcFVSTCArIHRoaXMuX2VhdFNsYXNoZXMocGF0aCkpO1xuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSU5hbWVzcGFjZSgnYW1pJywge1xuXG5cdHZlcnNpb246ICcwLjAuMScsXG5cdGNvbW1pdF9pZDogJ3t7QU1JX0NPTU1JVF9JRH19Jyxcbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIElOVEVSTkFMIEZVTkNUSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIF9hbWlfaW50ZXJuYWxfdGhlbihkZWZlcnJlZCwgZG9uZUZ1bmMsIGZhaWxGdW5jKVxue1xuXHRpZihkZWZlcnJlZCAmJiBkZWZlcnJlZC50aGVuKVxuXHR7XG5cdFx0ZGVmZXJyZWQudGhlbihkb25lRnVuYywgZmFpbEZ1bmMpO1xuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdGRvbmVGdW5jKCk7XG5cdH1cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIF9hbWlfaW50ZXJuYWxfYWx3YXlzKGRlZmVycmVkLCBhbHdheXNGdW5jKVxue1xuXHRpZihkZWZlcnJlZCAmJiBkZWZlcnJlZC5hbHdheXMpXG5cdHtcblx0XHRkZWZlcnJlZC5hbHdheXMoYWx3YXlzRnVuYyk7XG5cdH1cblx0ZWxzZVxuXHR7XG5cdFx0YWx3YXlzRnVuYygpO1xuXHR9XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pV2ViQXBwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgQU1JIHdlYmFwcCBzdWJzeXN0ZW1cbiAqIEBuYW1lc3BhY2UgYW1pV2ViQXBwXG4gKi9cblxuJEFNSU5hbWVzcGFjZSgnYW1pV2ViQXBwJywgLyoqIEBsZW5kcyBhbWlXZWJBcHAgKi8ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQUklWQVRFIE1FTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9pZFJlZ0V4cDogbmV3IFJlZ0V4cCgnW2EtekEtWl1bYS16QS1aMC05XXs3fV9bYS16QS1aMC05XXs0fV9bYS16QS1aMC05XXs0fV9bYS16QS1aMC05XXs0fV9bYS16QS1aMC05XXsxMn0nLCAnZycpLFxuXG5cdF9saW5rRXhwOiBuZXcgUmVnRXhwKCdcXFxcWyhbXlxcXFxdXSopXFxcXF1cXFxcKChbXlxcXFwpXSopXFxcXCknLCAnZycpLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2VtYmVkZGVkOiBmYWxzZSxcblx0X25vQm9vdHN0cmFwOiBmYWxzZSxcblx0X25vRGF0ZVRpbWVQaWNrZXI6IGZhbHNlLFxuXHRfbm9TZWxlY3QyOiBmYWxzZSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9nbG9iYWxEZWZlcnJlZDogJC5EZWZlcnJlZCgpLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3NoZWV0czogW10sXG5cdF9zY3JpcHRzOiBbXSxcblxuXHRfY29udHJvbHM6IHt9LFxuXHRfc3ViYXBwczoge30sXG5cblx0X2lzUmVhZHk6IGZhbHNlLFxuXHRfY2FuTGVhdmU6IHRydWUsXG5cdF9sb2NrQ250OiAweDAwLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2N1cnJlbnRTdWJBcHBJbnN0YW5jZTogbmV3IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMub25SZWFkeSA9IGZ1bmN0aW9uKCkge307XG5cdFx0dGhpcy5vbkV4aXQgPSBmdW5jdGlvbigpIHt9O1xuXHRcdHRoaXMub25Mb2dpbiA9IGZ1bmN0aW9uKCkge307XG5cdFx0dGhpcy5vbkxvZ291dCA9IGZ1bmN0aW9uKCkge307XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFRoZSBvcmlnaW4gVVJMXG5cdCAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICovXG5cblx0b3JpZ2luVVJMOiAnLycsXG5cblx0LyoqXG5cdCAgKiBUaGUgd2ViYXBwIFVSTFxuXHQgICogQHR5cGUge1N0cmluZ31cblx0ICAqL1xuXG5cdHdlYkFwcFVSTDogJy8nLFxuXG5cdC8qKlxuXHQgICogVGhlIGFuY2hvciBwYXJ0IG9mIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICovXG5cblx0aGFzaDogJycsXG5cblx0LyoqXG5cdCAgKiBUaGUgYXJndW1lbnRzIGV4dHJhY3RlZCBmcm9tIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAdHlwZSB7QXJyYXk8U3RyaW5nPn1cblx0ICAqL1xuXG5cdGFyZ3M6IHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNUQVRJQyBDT05TVFJVQ1RPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEdFVCBGTEFHUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1cmwgPSBhbWlSb3V0ZXIuZ2V0U2NyaXB0VVJMKCk7XG5cblx0XHRjb25zdCBpZHggPSB1cmwuaW5kZXhPZignPycpO1xuXG5cdFx0aWYoaWR4ID4gMClcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgZmxhZ3MgPSB1cmwuc3Vic3RyaW5nKGlkeCkudG9Mb3dlckNhc2UoKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRoaXMuX2VtYmVkZGVkID0gKGZsYWdzLmluZGV4T2YoJ2VtYmVkZGVkJykgPj0gMCk7XG5cblx0XHRcdHRoaXMuX25vQm9vdHN0cmFwID0gKGZsYWdzLmluZGV4T2YoJ25vYm9vdHN0cmFwJykgPj0gMCk7XG5cblx0XHRcdHRoaXMuX25vRGF0ZVRpbWVQaWNrZXIgPSAoZmxhZ3MuaW5kZXhPZignbm9kYXRldGltZXBpY2tlcicpID49IDApO1xuXG5cdFx0XHR0aGlzLl9ub1NlbGVjdDIgPSAoZmxhZ3MuaW5kZXhPZignbm9zZWxlY3QyJykgPj0gMCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBHRVQgVVJMUywgSEFTSCBBTkQgQVJHUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5vcmlnaW5VUkwgPSBhbWlSb3V0ZXIuZ2V0T3JpZ2luVVJMKCk7XG5cdFx0dGhpcy53ZWJBcHBVUkwgPSBhbWlSb3V0ZXIuZ2V0V2ViQXBwVVJMKCk7XG5cblx0XHR0aGlzLmhhc2ggPSBhbWlSb3V0ZXIuZ2V0SGFzaCgpO1xuXHRcdHRoaXMuYXJncyA9IGFtaVJvdXRlci5nZXRBcmdzKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTE9BRCBTSEVFVFMgQU5EIFNDUklQVFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHJlc291cmNlc0NTUyA9IFtdO1xuXHRcdGNvbnN0IHJlc291cmNlc0pTID0gW107XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighd2luZG93LlBvcHBlcilcblx0XHR7XG5cdFx0XHRyZXNvdXJjZXNKUy5wdXNoKHRoaXMub3JpZ2luVVJMICsgJy9qcy9wb3BwZXIubWluLmpzJyk7XG5cdFx0fVxuXG5cdFx0aWYoIXdpbmRvdy5tb21lbnQpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvbW9tZW50Lm1pbi5qcycpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKCh0eXBlb2YgalF1ZXJ5LmZuLnFyY29kZSkgIT09ICdmdW5jdGlvbicpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvanF1ZXJ5LXFyY29kZS5taW4uanMnKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighdGhpcy5fbm9Cb290c3RyYXAgJiYgKHR5cGVvZiBqUXVlcnkuZm4ubW9kYWwpICE9PSAnZnVuY3Rpb24nKVxuXHRcdHtcblx0XHRcdHJlc291cmNlc0NTUy5wdXNoKHRoaXMub3JpZ2luVVJMICsgJy9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnKTtcblx0XHRcdHJlc291cmNlc0pTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2pzL2Jvb3RzdHJhcC5taW4uanMnKTtcblx0XHR9XG5cblx0XHRpZighdGhpcy5fbm9EYXRlVGltZVBpY2tlciAmJiAodHlwZW9mIGpRdWVyeS5mbi5kYXRldGltZXBpY2tlcikgIT09ICdmdW5jdGlvbicpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzQ1NTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXIubWluLmNzcycpO1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyLm1pbi5qcycpO1xuXHRcdH1cblxuXHRcdGlmKCF0aGlzLl9ub1NlbGVjdDIgJiYgKHR5cGVvZiBqUXVlcnkuZm4uc2VsZWN0MikgIT09ICdmdW5jdGlvbicpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzQ1NTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9zZWxlY3QyLm1pbi5jc3MnKTtcblx0XHRcdHJlc291cmNlc0pTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2pzL3NlbGVjdDIubWluLmpzJyk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdC4uLnJlc291cmNlc0NTUyxcblx0XHRcdHRoaXMub3JpZ2luVVJMICsgJy9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnLFxuXHRcdFx0dGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9hbWkubWluLmNzcycsXG5cdFx0XHQuLi5yZXNvdXJjZXNKUyxcblx0XHRdKS5kb25lKCgvKi0tLSovKSA9PiB7XG5cblx0XHRcdHRoaXMuX2dsb2JhbERlZmVycmVkLnJlc29sdmUoLyotLS0qLyk7XG5cblx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2dsb2JhbERlZmVycmVkLnJlamVjdChtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBNT0RFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hlY2tzIHdoZXRoZXIgdGhlIFdlYkFwcCBpcyBleGVjdXRlZCBpbiBlbWJlZGRlZCBtb2RlXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGlzRW1iZWRkZWQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9lbWJlZGRlZDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hlY2tzIHdoZXRoZXIgdGhlIFdlYkFwcCBpcyBleGVjdXRlZCBsb2NhbGx5IChmaWxlOi8vLCBsb2NhbGhvc3QsIDEyNy4wLjAuMSBvciA6OjEpXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGlzTG9jYWw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gKCgnZmlsZTonKSlcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUgPT09ICdsb2NhbGhvc3QnXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnMTI3LjAuMC4xJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gKCgoJzo6MScpKSlcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVE9PTFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0eXBlT2Y6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCBuYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuIG5hbWUuc3RhcnRzV2l0aCgnW29iamVjdCAnKSA/IG5hbWUuc3Vic3RyaW5nKDgsIG5hbWUubGVuZ3RoIC0gMSlcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogLyotLS0tLS0tLS0tLSovICcnIC8qLS0tLS0tLS0tLS0qL1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGFzQXJyYXk6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50eXBlT2YoeCkgPT09ICdBcnJheScgPyAoeClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbeF1cblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXR1cDogZnVuY3Rpb24ob3B0aW9uTmFtZXMsIG9wdGlvbkRlZmF1bHRzLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgbCA9IG9wdGlvbk5hbWVzLmxlbmd0aDtcblx0XHRjb25zdCBtID0gb3B0aW9uRGVmYXVsdHMubGVuZ3RoO1xuXG5cdFx0aWYobCAhPT0gbSlcblx0XHR7XG5cdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHNldHRpbmdzKSB7XG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKG9wdGlvbk5hbWVzW2ldIGluIHNldHRpbmdzID8gc2V0dGluZ3Nbb3B0aW9uTmFtZXNbaV1dIDogb3B0aW9uRGVmYXVsdHNbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcblx0XHRcdFx0cmVzdWx0LnB1c2goLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyBvcHRpb25EZWZhdWx0c1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlcGxhY2U6IGFtaVR3aWcuc3RkbGliLl9yZXBsYWNlLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3RleHRUb0h0bWxYOiBbJyYnICAgICwgJ1wiJyAgICAgLCAnPCcgICAsICc+JyAgIF0sXG5cdF90ZXh0VG9IdG1sWTogWycmYW1wOycsICcmcXVvdDsnLCAnJmx0OycsICcmZ3Q7J10sXG5cblx0LyoqXG5cdCAgKiBFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIEhUTUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0dGV4dFRvSHRtbDogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5fdGV4dFRvSHRtbFgsIHRoaXMuX3RleHRUb0h0bWxZKTtcblx0fSxcblxuXHQvKipcblx0ICAqIFVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSFRNTCB0byB0ZXh0XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGh0bWxUb1RleHQ6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKHMgfHwgJycsIHRoaXMuX3RleHRUb0h0bWxZLCB0aGlzLl90ZXh0VG9IdG1sWCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfdGV4dFRvU3RyaW5nWDogWydcXFxcJyAgLCAnXFxuJyAsICdcIicgICwgJ1xcJycgIF0sXG5cdF90ZXh0VG9TdHJpbmdZOiBbJ1xcXFxcXFxcJywgJ1xcXFxuJywgJ1xcXFxcIicsICdcXFxcXFwnJ10sXG5cblx0LyoqXG5cdCAgKiBFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIEphdmFTY3JpcHQgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSB1bmVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdHRleHRUb1N0cmluZzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5fdGV4dFRvU3RyaW5nWCwgdGhpcy5fdGV4dFRvU3RyaW5nWSk7XG5cdH0sXG5cblx0LyoqXG5cdCAgKiBVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEphdmFTY3JpcHQgc3RyaW5nIHRvIHRleHRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0c3RyaW5nVG9UZXh0OiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TdHJpbmdZLCB0aGlzLl90ZXh0VG9TdHJpbmdYKTtcblxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2h0bWxUb1N0cmluZ1g6IFsnXFxcXCcgICwgJ1xcbicgLCAnJnF1b3Q7JyAgLCAnXFwnJyAgXSxcblx0X2h0bWxUb1N0cmluZ1k6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXCZxdW90OycsICdcXFxcXFwnJ10sXG5cblx0LyoqXG5cdCAgKiBFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBIVE1MIHRvIEphdmFTY3JpcHQgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSB1bmVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGh0bWxUb1N0cmluZzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5faHRtbFRvU3RyaW5nWCwgdGhpcy5faHRtbFRvU3RyaW5nWSk7XG5cdH0sXG5cblx0LyoqXG5cdCAgKiBVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEphdmFTY3JpcHQgc3RyaW5nIHRvIEhUTUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0c3RyaW5nVG9IdG1sOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl9odG1sVG9TdHJpbmdZLCB0aGlzLl9odG1sVG9TdHJpbmdYKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF90ZXh0VG9TUUxYOiBbJ1xcJycgIF0sXG5cdF90ZXh0VG9TUUxZOiBbJ1xcJ1xcJyddLFxuXG5cdC8qKlxuXHQgICogRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBTUUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0dGV4dFRvU1FMOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TUUxYLCB0aGlzLl90ZXh0VG9TUUxZKTtcblx0fSxcblxuXHQvKipcblx0ICAqIFVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gU1FMIHRvIHRleHRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0c3FsVG9UZXh0OiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TUUxZLCB0aGlzLl90ZXh0VG9TUUxYKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBCQVNFNjQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9iYXNlNjQ6ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OS1fJyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRW5jb2RlcyAoUkZDIDQ2NDgpIGEgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBkZWNvZGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGVuY29kZWQgc3RyaW5nXG5cdCAgKi9cblxuXHRiYXNlNjRFbmNvZGU6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRsZXQgdztcblxuXHRcdGNvbnN0IGUgPSBbXTtcblxuXHRcdGNvbnN0IGwgPSBzLmxlbmd0aCwgbSA9IGwgJSAzO1xuXG5cdFx0Y29uc3QgdGhpc19iYXNlNjQgPSB0aGlzLl9iYXNlNjQ7XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDspXG5cdFx0e1xuXHRcdFx0dyA9IHMuY2hhckNvZGVBdChpKyspIDw8IDE2XG5cdFx0XHQgICAgfFxuXHRcdFx0ICAgIHMuY2hhckNvZGVBdChpKyspIDw8IDhcblx0XHRcdCAgICB8XG5cdFx0XHQgICAgcy5jaGFyQ29kZUF0KGkrKykgPDwgMFxuXHRcdFx0O1xuXG5cdFx0XHRlLnB1c2godGhpc19iYXNlNjQuY2hhckF0KCh3ID4+IDE4KSAmIDB4M0YpKTtcblx0XHRcdGUucHVzaCh0aGlzX2Jhc2U2NC5jaGFyQXQoKHcgPj4gMTIpICYgMHgzRikpO1xuXHRcdFx0ZS5wdXNoKHRoaXNfYmFzZTY0LmNoYXJBdCgodyA+PiA2KSAmIDB4M0YpKTtcblx0XHRcdGUucHVzaCh0aGlzX2Jhc2U2NC5jaGFyQXQoKHcgPj4gMCkgJiAweDNGKSk7XG5cdFx0fVxuXG5cdFx0LyoqLyBpZihtID09PSAxKSB7XG5cdFx0XHRlLnNwbGljZSgtMiwgMik7XG5cdFx0fVxuXHRcdGVsc2UgaWYobSA9PT0gMikge1xuXHRcdFx0ZS5zcGxpY2UoLTEsIDEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBlLmpvaW4oJycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBEZWNvZGVzIChSRkMgNDY0OCkgYSBzdHJpbmdcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVuY29kZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZGVjb2RlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGJhc2U2NERlY29kZTogZnVuY3Rpb24ocylcblx0e1xuXHRcdGxldCB3O1xuXG5cdFx0Y29uc3QgZSA9IFtdO1xuXG5cdFx0Y29uc3QgbCA9IHMubGVuZ3RoLCBtID0gbCAlIDQ7XG5cblx0XHRjb25zdCB0aGlzX2Jhc2U2NCA9IHRoaXMuX2Jhc2U2NDtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOylcblx0XHR7XG5cdFx0XHR3ID0gdGhpc19iYXNlNjQuaW5kZXhPZihzLmNoYXJBdChpKyspKSA8PCAxOFxuXHRcdFx0ICAgIHxcblx0XHRcdCAgICB0aGlzX2Jhc2U2NC5pbmRleE9mKHMuY2hhckF0KGkrKykpIDw8IDEyXG5cdFx0XHQgICAgfFxuXHRcdFx0ICAgIHRoaXNfYmFzZTY0LmluZGV4T2Yocy5jaGFyQXQoaSsrKSkgPDwgNlxuXHRcdFx0ICAgIHxcblx0XHRcdCAgICB0aGlzX2Jhc2U2NC5pbmRleE9mKHMuY2hhckF0KGkrKykpIDw8IDBcblx0XHRcdDtcblxuXHRcdFx0ZS5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoKHcgPj4+IDE2KSAmIDB4RkYpKTtcblx0XHRcdGUucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh3ID4+PiA4KSAmIDB4RkYpKTtcblx0XHRcdGUucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh3ID4+PiAwKSAmIDB4RkYpKTtcblx0XHR9XG5cblx0XHQvKiovIGlmKG0gPT09IDIpIHtcblx0XHRcdGUuc3BsaWNlKC0yLCAyKTtcblx0XHR9XG5cdFx0ZWxzZSBpZihtID09PSAzKSB7XG5cdFx0XHRlLnNwbGljZSgtMSwgMSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGUuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogRFlOQU1JQyBSRVNPVVJDRSBMT0FESU5HICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZ2V0RXh0ZW5zaW9uOiBmdW5jdGlvbih1cmwpXG5cdHtcblx0XHRjb25zdCBpZHggPSB1cmwubGFzdEluZGV4T2YoJy4nKTtcblxuXHRcdHJldHVybiBpZHggPiAwID8gdXJsLnN1YnN0cmluZyhpZHgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZ2V0RGF0YVR5cGU6IGZ1bmN0aW9uKHVybCwgZGF0YVR5cGUpXG5cdHtcblx0XHRsZXQgcmVzdWx0O1xuXG5cdFx0aWYoZGF0YVR5cGUgPT09ICdhdXRvJylcblx0XHR7XG5cdFx0XHQvKiovIGlmKHVybC5pbmRleE9mKCdjdHJsOicpID09PSAwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSAnY29udHJvbCc7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmKHVybC5pbmRleE9mKCdzdWJhcHA6JykgPT09IDApXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdCA9ICdzdWJhcHAnO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRzd2l0Y2godGhpcy5fZ2V0RXh0ZW5zaW9uKHVybCkudG9Mb3dlckNhc2UoKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNhc2UgJy5jc3MnOlxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gJ3NoZWV0Jztcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAnLmpzJzpcblx0XHRcdFx0XHRcdHJlc3VsdCA9ICdzY3JpcHQnO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICcuanNvbic6XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAnanNvbic7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJy54bWwnOlxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gJ3htbCc7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAndGV4dCc7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0ID0gZGF0YVR5cGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9fbG9hZFhYWDogZnVuY3Rpb24oZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpXG5cdHtcblx0XHRpZih1cmxzLmxlbmd0aCA9PT0gMClcblx0XHR7XG5cdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVzb2x2ZVdpdGgoY29udGV4dCwgW3Jlc3VsdF0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVybCA9IHVybHMuc2hpZnQoKS50cmltKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkYXRhVFlQRSA9IHRoaXMuX2dldERhdGFUeXBlKHVybCwgZGF0YVR5cGUpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0c3dpdGNoKGRhdGFUWVBFKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQ09OVFJPTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnY29udHJvbCc6XG5cblx0XHRcdFx0dGhpcy5sb2FkQ29udHJvbCh1cmwpLnRoZW4oKGRhdGEpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGRhdGEpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU1VCQVBQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnc3ViYXBwJzpcblxuXHRcdFx0XHR0aGlzLmxvYWRTdWJBcHAodXJsKS50aGVuKChkYXRhKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucHVzaChkYXRhKTtcblxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgcmVzdWx0LCB1cmxzLCBkYXRhVHlwZSwgY29udGV4dCk7XG5cblx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNIRUVUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ3NoZWV0JzpcblxuXHRcdFx0XHRpZih0aGlzLl9zaGVldHMuaW5kZXhPZih1cmwpID49IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChmYWxzZSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0XHR1cmw6IHVybCxcblx0XHRcdFx0XHRcdGFzeW5jOiBmYWxzZSxcblx0XHRcdFx0XHRcdGNhY2hlOiBmYWxzZSxcblx0XHRcdFx0XHRcdGNyb3NzRG9tYWluOiB0cnVlLFxuXHRcdFx0XHRcdFx0ZGF0YVR5cGU6IGRhdGFUWVBFLFxuXHRcdFx0XHRcdH0pLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaCh0cnVlKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5fc2hlZXRzLnB1c2godXJsKTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblxuXHRcdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBgJyArIHVybCArICdgJ10pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU0NSSVBUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnc2NyaXB0JzpcblxuXHRcdFx0XHRpZih0aGlzLl9zY3JpcHRzLmluZGV4T2YodXJsKSA+PSAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goZmFsc2UpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRcdFx0XHRhc3luYzogZmFsc2UsXG5cdFx0XHRcdFx0XHRjYWNoZTogZmFsc2UsXG5cdFx0XHRcdFx0XHRjcm9zc0RvbWFpbjogdHJ1ZSxcblx0XHRcdFx0XHRcdGRhdGFUeXBlOiBkYXRhVFlQRSxcblx0XHRcdFx0XHR9KS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnB1c2godHJ1ZSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuX3NjcmlwdHMucHVzaCh1cmwpO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIGAnICsgdXJsICsgJ2AnXSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBPVEhFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRcdFx0YXN5bmM6IHRydWUsXG5cdFx0XHRcdFx0Y2FjaGU6IGZhbHNlLFxuXHRcdFx0XHRcdGNyb3NzRG9tYWluOiB0cnVlLFxuXHRcdFx0XHRcdGRhdGFUeXBlOiBkYXRhVFlQRSxcblx0XHRcdFx0fSkudGhlbigoZGF0YSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goZGF0YSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgYCcgKyB1cmwgKyAnYCddKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9sb2FkWFhYOiBmdW5jdGlvbih1cmxzLCBkYXRhVHlwZSwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtkZWZlcnJlZF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgW10sIHRoaXMuYXNBcnJheSh1cmxzKSwgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgcmVzb3VyY2VzIGJ5IGV4dGVuc2lvblxuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRSZXNvdXJjZXM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ2F1dG8nLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIENTUyBzaGVldHNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkU2hlZXRzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICdzaGVldCcsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgSlMgc2NyaXB0c1xuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRTY3JpcHRzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICdzY3JpcHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIEpTT04gZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkSlNPTnM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ2pzb24nLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIFhNTCBmaWxlc1xuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRYTUxzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICd4bWwnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIEhUTUwgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkSFRNTHM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ3RleHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIFRXSUcgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkVFdJR3M6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ3RleHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIHRleHQgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkVGV4dHM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ3RleHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSFRNTCBDT05URU5UICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfeHh4SFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIG1vZGUsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHQsIHN1ZmZpeCwgZGljdCwgdHdpZ3NdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCcsICdzdWZmaXgnLCAnZGljdCcsICd0d2lncyddLFxuXHRcdFx0W3Jlc3VsdCwgbnVsbCwgbnVsbCwgbnVsbF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihzdWZmaXgpXG5cdFx0e1xuXHRcdFx0dHdpZyA9IHR3aWcucmVwbGFjZSh0aGlzLl9pZFJlZ0V4cCwgZnVuY3Rpb24oaWQpIHtcblxuXHRcdFx0XHRyZXR1cm4gaWQgKyAnX2luc3RhbmNlJyArIHN1ZmZpeDtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IGh0bWwgPSB0aGlzLmZvcm1hdFRXSUcodHdpZywgZGljdCwgdHdpZ3MpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHByb21pc2U7XG5cblx0XHRsZXQgZWwgPSAkKHNlbGVjdG9yKTtcblxuXHRcdHN3aXRjaChtb2RlKVxuXHRcdHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0cHJvbWlzZSA9IGVsLmh0bWwoaHRtbCkucHJvbWlzZSgpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRwcm9taXNlID0gZWwucHJlcGVuZChodG1sKS5wcm9taXNlKCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdHByb21pc2UgPSBlbC5hcHBlbmQoaHRtbCkucHJvbWlzZSgpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRwcm9taXNlID0gZWwucmVwbGFjZVdpdGgoZWwuaXMoJ1tpZF0nKSA/IGh0bWwucmVwbGFjZSgvXlxccyooPFthLXpBLVpfLV0rKS8sICckMSBpZD1cIicgKyBlbC5hdHRyKCdpZCcpICsgJ1wiJykgOiBodG1sKS5wcm9taXNlKCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHByb21pc2UuZG9uZSgoKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsZXQgZWwgPSAkKHNlbGVjdG9yKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IF9maW5kID0gKG1vZGUgPT09IDMpID8gKF9zZWxlY3RvcikgPT4gZWwuZmluZFdpdGhTZWxmKF9zZWxlY3Rvcilcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKF9zZWxlY3RvcikgPT4gZWwuICAgIGZpbmQgICAgKF9zZWxlY3Rvcilcblx0XHRcdDtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKGpRdWVyeS5mbi50b29sdGlwKVxuXHRcdFx0e1xuXHRcdFx0XHRfZmluZCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoe1xuXHRcdFx0XHRcdGh0bWw6IGZhbHNlLFxuXHRcdFx0XHRcdGRlbGF5OiB7XG5cdFx0XHRcdFx0XHRzaG93OiA1MDAsXG5cdFx0XHRcdFx0XHRoaWRlOiAxMDAsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihqUXVlcnkuZm4ucG9wb3Zlcilcblx0XHRcdHtcblx0XHRcdFx0X2ZpbmQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5wb3BvdmVyKHtcblx0XHRcdFx0XHRodG1sOiB0cnVlLFxuXHRcdFx0XHRcdGRlbGF5OiB7XG5cdFx0XHRcdFx0XHRzaG93OiA1MDAsXG5cdFx0XHRcdFx0XHRoaWRlOiAxMDAsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihqUXVlcnkuZm4uZGF0ZXRpbWVwaWNrZXIpXG5cdFx0XHR7XG5cdFx0XHRcdF9maW5kKCcuZm9ybS1kYXRldGltZScpLmRhdGV0aW1lcGlja2VyKHtcblx0XHRcdFx0XHRmb3JtYXQ6ICdZWVlZLU1NLUREIEhIOm1tOnNzLlNTU1NTUydcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0X2ZpbmQoJy5mb3JtLWRhdGUnKS5kYXRldGltZXBpY2tlcih7XG5cdFx0XHRcdFx0Zm9ybWF0OiAnWVlZWS1NTS1ERCdcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0X2ZpbmQoJy5mb3JtLXRpbWUnKS5kYXRldGltZXBpY2tlcih7XG5cdFx0XHRcdFx0Zm9ybWF0OiAnSEg6bW06c3MnXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdF9maW5kKCcuZm9ybS10aW1lLWhtJykuZGF0ZXRpbWVwaWNrZXIoe1xuXHRcdFx0XHRcdGZvcm1hdDogJ0hIOm1tJ1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHdpbmRvdy5hY2UpXG5cdFx0XHR7XG5cdFx0XHRcdF9maW5kKCcuZm9ybS1lZGl0b3I6bm90KC5mb3JtLWVkaXRvci1oaWRkZW4pJykuZWFjaCgoaW5keCwgaXRlbSkgPT4ge1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgdGV4dGFyZWEgPSAkKGl0ZW0pLmFkZENsYXNzKCdmb3JtLWVkaXRvci1oaWRkZW4nKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGRpdiA9ICQoJzxkaXY+Jywge1xuXHRcdFx0XHRcdFx0J2NsYXNzJzogdGV4dGFyZWEuYXR0cignY2xhc3MnKVxuXHRcdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAucmVwbGFjZSgnZm9ybS1lZGl0b3InLCAnJykucmVwbGFjZSgnZm9ybS1lZGl0b3ItaGlkZGVuJywgJycpLFxuXHRcdFx0XHRcdFx0J3N0eWxlJzogdGV4dGFyZWEuYXR0cignc3R5bGUnKSxcblx0XHRcdFx0XHR9KS5pbnNlcnRCZWZvcmUodGV4dGFyZWEpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0ZGl2LnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNvbnN0IG1vZGUgPSB0ZXh0YXJlYS5hdHRyKCdkYXRhLW1vZGUnKSB8fCAndGV4dCc7XG5cdFx0XHRcdFx0XHRjb25zdCB0aGVtZSA9IHRleHRhcmVhLmF0dHIoJ2RhdGEtdGhlbWUnKSB8fCAnY2hyb21lJztcblxuXHRcdFx0XHRcdFx0Y29uc3Qgd3JhcCA9IHRleHRhcmVhLmF0dHIoJ2RhdGEtd3JhcCcpIHx8ICdmYWxzZSc7XG5cdFx0XHRcdFx0XHRjb25zdCByZWFkT25seSA9IHRleHRhcmVhLmF0dHIoJ2RhdGEtcmVhZC1vbmx5JykgfHwgJ2ZhbHNlJztcblx0XHRcdFx0XHRcdGNvbnN0IHNob3dHdXR0ZXIgPSB0ZXh0YXJlYS5hdHRyKCdkYXRhLXNob3ctZ3V0dGVyJykgfHwgJ3RydWUnO1xuXHRcdFx0XHRcdFx0Y29uc3QgaGlnaGxpZ2h0QWN0aXZlTGluZSA9IHRleHRhcmVhLmF0dHIoJ2RhdGEtaGlnaGxpZ2h0LWFjdGl2ZS1saW5lJykgfHwgJ2ZhbHNlJztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGFjZS5jb25maWcuc2V0KCdzdWZmaXgnLCAnLm1pbi5qcycpO1xuXG5cdFx0XHRcdFx0XHRhY2UuY29uZmlnLnNldCgnYmFzZVBhdGgnLCB0aGlzLm9yaWdpblVSTCArICcvanMvM3JkLXBhcnR5L2FjZScpO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y29uc3QgZWRpdG9yID0gYWNlLmVkaXQoZGl2WzBdLCB7XG5cdFx0XHRcdFx0XHRcdG1vZGU6ICdhY2UvbW9kZS8nICsgbW9kZSxcblx0XHRcdFx0XHRcdFx0dGhlbWU6ICdhY2UvdGhlbWUvJyArIHRoZW1lLFxuXHRcdFx0XHRcdFx0XHQvKiovXG5cdFx0XHRcdFx0XHRcdHdyYXA6ICd0cnVlJyA9PT0gd3JhcCxcblx0XHRcdFx0XHRcdFx0cmVhZE9ubHk6ICd0cnVlJyA9PT0gcmVhZE9ubHksXG5cdFx0XHRcdFx0XHRcdHNob3dHdXR0ZXI6ICd0cnVlJyA9PT0gc2hvd0d1dHRlcixcblx0XHRcdFx0XHRcdFx0aGlnaGxpZ2h0QWN0aXZlTGluZTogJ3RydWUnID09PSBoaWdobGlnaHRBY3RpdmVMaW5lLFxuXHRcdFx0XHRcdFx0XHQvKiovXG5cdFx0XHRcdFx0XHRcdG1pbkxpbmVzOiAweDAwMDAwMSxcblx0XHRcdFx0XHRcdFx0bWF4TGluZXM6IEluZmluaXR5LFxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRlZGl0b3IucmVuZGVyZXIuc2V0U2Nyb2xsTWFyZ2luKDAsIDIpO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y29uc3Qgc2Vzc2lvbiA9IGVkaXRvci5nZXRTZXNzaW9uKCk7XG5cblx0XHRcdFx0XHRcdHRleHRhcmVhLmRhdGEoJ2VkaXRvcicsIGVkaXRvcik7XG5cdFx0XHRcdFx0XHR0ZXh0YXJlYS5kYXRhKCdzZXNzaW9uJywgc2Vzc2lvbik7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRzZXNzaW9uLm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0aXRlbS52YWx1ZSA9IHNlc3Npb24uZ2V0VmFsdWUoKTtcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRzZXNzaW9uLnNldFZhbHVlKGl0ZW0udmFsdWUpO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2VsXSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFB1dHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIHRoZSB0YXJnZXQgc2VsZWN0b3Jcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0d2lnIHRoZSBUV0lHIGZyYWdtZW50XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBzdWZmaXgsIGRpY3QsIHR3aWdzKVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0cmVwbGFjZUhUTUw6IGZ1bmN0aW9uKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl94eHhIVE1MKHNlbGVjdG9yLCB0d2lnLCAwLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFByZXBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgc3VmZml4LCBkaWN0LCB0d2lncylcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdHByZXBlbmRIVE1MOiBmdW5jdGlvbihzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5feHh4SFRNTChzZWxlY3RvciwgdHdpZywgMSwgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBcHBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgc3VmZml4LCBkaWN0LCB0d2lncylcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGFwcGVuZEhUTUw6IGZ1bmN0aW9uKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl94eHhIVE1MKHNlbGVjdG9yLCB0d2lnLCAyLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEludGVycHJldGVzIHRoZSBnaXZlbiBUV0lHIHN0cmluZywgc2VlIHtAbGluayBodHRwOi8vdHdpZy5zZW5zaW9sYWJzLm9yZy9kb2N1bWVudGF0aW9ufVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge09iamVjdHxBcnJheX0gW2RpY3RdIHRoZSBkaWN0aW9uYXJ5XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3R3aWdzXSBkaWN0aW9uYXJ5IG9mIGZyYWdtZW50c1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIEludGVycHJldGVkIFRXSUcgc3RyaW5nXG5cdCAgKi9cblxuXHRmb3JtYXRUV0lHOiBmdW5jdGlvbih0d2lnLCBkaWN0ID0ge30sIHR3aWdzID0ge30pXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHJlbmRlciA9ICh0d2lnLCBkaWN0KSA9PiB7XG5cblx0XHRcdGlmKHRoaXMudHlwZU9mKGRpY3QpICE9PSAnT2JqZWN0Jylcblx0XHRcdHtcblx0XHRcdFx0ZGljdCA9IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLnR5cGVPZih0d2lncykgIT09ICdPYmplY3QnKVxuXHRcdFx0e1xuXHRcdFx0XHR0d2lncyA9IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHRkaWN0WydPUklHSU5fVVJMJ10gPSB0aGlzLm9yaWdpblVSTDtcblx0XHRcdGRpY3RbJ1dFQkFQUF9VUkwnXSA9IHRoaXMud2ViQXBwVVJMO1xuXG5cdFx0XHRyZXR1cm4gYW1pVHdpZy5lbmdpbmUucmVuZGVyKHR3aWcsIGRpY3QsIHR3aWdzKTtcblx0XHR9O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0aWYodGhpcy50eXBlT2YoZGljdCkgPT09ICdBcnJheScpXG5cdFx0XHR7XG5cdFx0XHRcdGRpY3QuZm9yRWFjaCgoRElDVCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gocmVuZGVyKHR3aWcsIERJQ1QsIHR3aWdzKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQucHVzaChyZW5kZXIodHdpZywgZGljdCwgdHdpZ3MpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Y2F0Y2goZXJyb3IpXG5cdFx0e1xuXHRcdFx0cmVzdWx0Lmxlbmd0aCA9IDA7XG5cblx0XHRcdHRoaXMuZXJyb3IoJ1RXSUcgcGFyc2luZyBlcnJvcjogJyArIGVycm9yLm1lc3NhZ2UpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSlNQQVRIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEZpbmRzIGRhdGEgd2l0aGluIHRoZSBnaXZlbiBKU09OLCBzZWUge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9kZmlsYXRvdi9qc3BhdGh9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCB0aGUgcGF0aFxuXHQgICogQHBhcmFtIHtPYmplY3R9IGpzb24gdGhlIEpTT05cblx0ICAqIEByZXR1cm5zIHtBcnJheX0gVGhlIHJlc3VsdGluZyBhcnJheVxuXHQgICovXG5cblx0anNwYXRoOiBmdW5jdGlvbihwYXRoLCBqc29uKVxuXHR7XG5cdFx0cmV0dXJuIEpTUGF0aC5hcHBseShwYXRoLCBqc29uKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBTVEFDSyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldFN0YWNrOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0cnlcblx0XHR7XG5cdFx0XHR0aHJvdyBFcnJvcigpO1xuXHRcdH1cblx0XHRjYXRjaChlMSlcblx0XHR7XG5cdFx0XHR0cnlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIGUxLnN0YWNrO1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2goZTIpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiAoKCgnJykpKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogTE9DSyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIExvY2tzIHRoZSBXZWIgYXBwbGljYXRpb25cblx0ICAqL1xuXG5cdGxvY2s6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsaW5lcyA9IHRoaXMuZ2V0U3RhY2soKS5zcGxpdCgnXFxuJyk7XG5cblx0XHRpZihsaW5lcy5sZW5ndGggPiAyKVxuXHRcdHtcblx0XHRcdGNvbnNvbGUubG9nKCdsb2NrWycgKyB0aGlzLl9sb2NrQ250ICsgJ10gOjogJyArIGxpbmVzWzJdKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cdFx0fVxuXG5cdFx0LyoqL1xuXG5cdFx0aWYodGhpcy5fbG9ja0NudCA8PSAwKVxuXHRcdHtcblx0XHRcdCQoJyNhbWlfbG9ja2VyJykuY3NzKCdkaXNwbGF5JywgJ2ZsZXgnKTtcblxuXHRcdFx0dGhpcy5fbG9ja0NudCA9IDE7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aGlzLl9sb2NrQ250Kys7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBVbmxvY2tzIHRoZSBXZWIgYXBwbGljYXRpb25cblx0ICAqL1xuXG5cdHVubG9jazogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYodGhpcy5fbG9ja0NudCA8PSAxKVxuXHRcdHtcblx0XHRcdCQoJyNhbWlfbG9ja2VyJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuXHRcdFx0dGhpcy5fbG9ja0NudCA9IDA7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aGlzLl9sb2NrQ250LS07XG5cdFx0fVxuXG5cdFx0LyoqL1xuXG5cdFx0bGV0IGxpbmVzID0gdGhpcy5nZXRTdGFjaygpLnNwbGl0KCdcXG4nKTtcblxuXHRcdGlmKGxpbmVzLmxlbmd0aCA+IDIpXG5cdFx0e1xuXHRcdFx0Y29uc29sZS5sb2coJ3VubG9ja1snICsgdGhpcy5fbG9ja0NudCArICddIDo6ICcgKyBsaW5lc1syXSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogTGVhdmUgdGhlIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0bW9kYWxMZWF2ZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxpbmVzID0gdGhpcy5nZXRTdGFjaygpLnNwbGl0KCdcXG4nKTtcblxuXHRcdGlmKGxpbmVzLmxlbmd0aCA+IDIpXG5cdFx0e1xuXHRcdFx0Y29uc29sZS5sb2coJ21vZGFsTG9ja1snICsgdGhpcy5fbG9ja0NudCArICddIDo6ICcgKyBsaW5lc1syXSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXHRcdH1cblxuXHRcdC8qKi9cblxuXHRcdHRoaXMuX2xvY2tDbnQgPSB0aGlzLl90bXBMb2NrQ250O1xuXG5cdFx0aWYodGhpcy5fbG9ja0NudCA+IDApXG5cdFx0e1xuXHRcdFx0JCgnI2FtaV9sb2NrZXInKS5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRW50ZXIgdGhlIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0bW9kYWxFbnRlcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fdG1wTG9ja0NudCA9IHRoaXMuX2xvY2tDbnQ7XG5cblx0XHRpZih0aGlzLl9sb2NrQ250ID4gMClcblx0XHR7XG5cdFx0XHQkKCcjYW1pX2xvY2tlcicpLmNzcygnZGlzcGxheScsICdub25lJyk7XG5cdFx0fVxuXG5cdFx0LyoqL1xuXG5cdFx0bGV0IGxpbmVzID0gdGhpcy5nZXRTdGFjaygpLnNwbGl0KCdcXG4nKTtcblxuXHRcdGlmKGxpbmVzLmxlbmd0aCA+IDIpXG5cdFx0e1xuXHRcdFx0Y29uc29sZS5sb2coJ21vZGFsVW5sb2NrWycgKyB0aGlzLl9sb2NrQ250ICsgJ10gOjogJyArIGxpbmVzWzJdKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBFbmFibGVzIHRoZSBtZXNzYWdlIGluIGEgY29uZmlybWF0aW9uIGRpYWxvZyBib3ggdG8gaW5mb3JtIHRoYXQgdGhlIHVzZXIgaXMgYWJvdXQgdG8gbGVhdmUgdGhlIGN1cnJlbnQgcGFnZS5cblx0ICAqL1xuXG5cdGNhbkxlYXZlOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jYW5MZWF2ZSA9IHRydWU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIERpc2FibGVzIHRoZSBtZXNzYWdlIGluIGEgY29uZmlybWF0aW9uIGRpYWxvZyBib3ggdG8gaW5mb3JtIHRoYXQgdGhlIHVzZXIgaXMgYWJvdXQgdG8gbGVhdmUgdGhlIGN1cnJlbnQgcGFnZS5cblx0ICAqL1xuXG5cdGNhbm5vdExlYXZlOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jYW5MZWF2ZSA9IGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIE1FU1NBR0VTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3B1Ymxpc2hBbGVydDogZnVuY3Rpb24oY2xhenosIHRpdGxlLCBtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc29sZS5sb2coJ0FNSSAnICsgdGl0bGUudG9VcHBlckNhc2UoKSArICc6ICcgKyBtZXNzYWdlICsgJ1xcbicgKyB0aGlzLmdldFN0YWNrKCkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGh0bWwgPSAnPGRpdiBjbGFzcz1cInRvYXN0XCIgcm9sZT1cImFsZXJ0XCIgJyArIChmYWRlT3V0ID8gJ2RhdGEtZGVsYXk9XCI2MDAwMFwiJyA6ICdkYXRhLWF1dG9oaWRlPVwiZmFsc2VcIicpICsgJz48ZGl2IGNsYXNzPVwidG9hc3QtaGVhZGVyXCI+PHN0cm9uZyBjbGFzcz1cIm1yLWF1dG8gJyArIGNsYXp6ICsgJ1wiPicgKyB0aXRsZSArICc8L3N0cm9uZz48c21hbGw+JyArIHRoaXMudGV4dFRvSHRtbCh3aW5kb3cubW9tZW50KCkuZm9ybWF0KCdERCBNTU0sIEhIOm1tOnNzJykpICsgJzwvc21hbGw+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtbC0yIG1iLTEgY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJ0b2FzdFwiPjxzcGFuPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+PC9kaXY+PGRpdiBjbGFzcz1cInRvYXN0LWJvZHlcIj4nICsgdGhpcy50ZXh0VG9IdG1sKG1lc3NhZ2UpICsgJzwvZGl2PjwvZGl2Pic7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBlbCA9ICQoJyNhbWlfYWxlcnRfY29udGVudCcpO1xuXG5cdFx0ZWwuYXBwZW5kKGh0bWwucmVwbGFjZSh0aGlzLl9saW5rRXhwLCAnPGEgaHJlZj1cIiQxXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JDI8L2E+JykpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0ZWwuZmluZCgnLnRvYXN0Omxhc3QtY2hpbGQnKS50b2FzdCgnc2hvdycpO1xuXG5cdFx0XHQkKGRvY3VtZW50KS5zY3JvbGxUb3AoMCk7XG5cblx0XHRcdHRoaXMudW5sb2NrKCk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFNob3dzIGFuICdpbmZvJyBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbWVzc2FnZSB0aGUgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtCb29sZWFufSBbZmFkZU91dD1mYWxzZV0gaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcblx0ICAqL1xuXG5cdGluZm86IGZ1bmN0aW9uKG1lc3NhZ2UsIGZhZGVPdXQpXG5cdHtcblx0XHRpZih0aGlzLnR5cGVPZihtZXNzYWdlKSA9PT0gJ0FycmF5Jylcblx0XHR7XG5cdFx0XHRtZXNzYWdlID0gbWVzc2FnZS5qb2luKCcuICcpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3B1Ymxpc2hBbGVydCgndGV4dC1pbmZvJywgJ0luZm8nLCBtZXNzYWdlLCBmYWRlT3V0KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU2hvd3MgYSAnc3VjY2VzcycgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IG1lc3NhZ2UgdGhlIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZhZGVPdXQ9ZmFsc2VdIGlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXG5cdCAgKi9cblxuXHRzdWNjZXNzOiBmdW5jdGlvbihtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0aWYodGhpcy50eXBlT2YobWVzc2FnZSkgPT09ICdBcnJheScpXG5cdFx0e1xuXHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2Uuam9pbignLiAnKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wdWJsaXNoQWxlcnQoJ3RleHQtc3VjY2VzcycsICdTdWNjZXNzJywgbWVzc2FnZSwgZmFkZU91dCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFNob3dzIGEgJ3dhcm5pbmcnIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBtZXNzYWdlIHRoZSBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge0Jvb2xlYW59IFtmYWRlT3V0PWZhbHNlXSBpZiBUcnVlLCB0aGUgbWVzc2FnZSBkaXNhcHBlYXJzIGFmdGVyIDYwc1xuXHQgICovXG5cblx0d2FybmluZzogZnVuY3Rpb24obWVzc2FnZSwgZmFkZU91dClcblx0e1xuXHRcdGlmKHRoaXMudHlwZU9mKG1lc3NhZ2UpID09PSAnQXJyYXknKVxuXHRcdHtcblx0XHRcdG1lc3NhZ2UgPSBtZXNzYWdlLmpvaW4oJy4gJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fcHVibGlzaEFsZXJ0KCd0ZXh0LXdhcm5pbmcnLCAnV2FybmluZycsIG1lc3NhZ2UsIGZhZGVPdXQpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTaG93cyBhbiAnZXJyb3InIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBtZXNzYWdlIHRoZSBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge0Jvb2xlYW59IFtmYWRlT3V0PWZhbHNlXSBpZiBUcnVlLCB0aGUgbWVzc2FnZSBkaXNhcHBlYXJzIGFmdGVyIDYwc1xuXHQgICovXG5cblx0ZXJyb3I6IGZ1bmN0aW9uKG1lc3NhZ2UsIGZhZGVPdXQpXG5cdHtcblx0XHRpZih0aGlzLnR5cGVPZihtZXNzYWdlKSA9PT0gJ0FycmF5Jylcblx0XHR7XG5cdFx0XHRtZXNzYWdlID0gbWVzc2FnZS5qb2luKCcuICcpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3B1Ymxpc2hBbGVydCgndGV4dC1kYW5nZXInLCAnRXJyb3InLCBtZXNzYWdlLCBmYWRlT3V0KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRmx1c2hlcyBtZXNzYWdlc1xuXHQgICovXG5cblx0Zmx1c2g6IGZ1bmN0aW9uKClcblx0e1xuXHRcdCQoJyNhbWlfYWxlcnRfY29udGVudCcpLmVtcHR5KCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogQlJFQURDUlVNQiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEZpbGwgdGhlIG1haW4gYnJlYWRjcnVtYlxuXHQgICogQHBhcmFtIHtBcnJheX0gaXRlbXMgdGhlIGFycmF5IG9mIGl0ZW1zIChIVE1MIGZvcm1hdClcblx0ICAqL1xuXG5cdGZpbGxCcmVhZGNydW1iOiBmdW5jdGlvbihpdGVtcylcblx0e1xuXHRcdGxldCBzID0gdGhpcy50eXBlT2YoaXRlbXMpID09PSAnQXJyYXknID8gaXRlbXMubWFwKChpdGVtKSA9PiAnPGxpIGNsYXNzPVwiYnJlYWRjcnVtYi1pdGVtXCI+JyArIGl0ZW0ucmVwbGFjZSgve3tXRUJBUFBfVVJMfX0vZywgdGhpcy53ZWJBcHBVUkwpICsgJzwvbGk+Jykuam9pbignJylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXG5cdFx0JCgnI2FtaV9icmVhZGNydW1iX2NvbnRlbnQnKS5odG1sKHMpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFdFQiBBUFBMSUNBVElPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBUaGlzIG1ldGhvZCBtdXN0IGJlIG92ZXJsb2FkZWQgYW5kIGlzIGNhbGxlZCB3aGVuIHRoZSBXZWIgYXBwbGljYXRpb24gc3RhcnRzXG5cdCAgKiBAZXZlbnQgYW1pV2ViQXBwI29uUmVhZHlcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyRGF0YVxuXHQgICovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoIXRoaXMuX2VtYmVkZGVkKVxuXHRcdHtcblx0XHRcdGFsZXJ0KCdlcnJvcjogYGFtaVdlYkFwcC5vblJlYWR5KClgIG11c3QgYmUgb3ZlcmxvYWRlZCEnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogVGhpcyBtZXRob2QgbXVzdCBiZSBvdmVybG9hZGVkIGFuZCBpcyBjYWxsZWQgd2hlbiB0aGUgdG9vbGJhciBuZWVkcyB0byBiZSB1cGRhdGVkXG5cdCAgKiBAZXZlbnQgYW1pV2ViQXBwI29uUmVmcmVzaFxuXHQgICogQHBhcmFtIHtCb29sZWFufSBpc0F1dGhcblx0ICAqL1xuXG5cdG9uUmVmcmVzaDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoIXRoaXMuX2VtYmVkZGVkKVxuXHRcdHtcblx0XHRcdGFsZXJ0KCdlcnJvcjogYGFtaVdlYkFwcC5vblJlZnJlc2goKWAgbXVzdCBiZSBvdmVybG9hZGVkIScpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTdGFydHMgdGhlIFdlYiBhcHBsaWNhdGlvblxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAobG9nb191cmwsIGhvbWVfdXJsLCBjb250YWN0X2VtYWlsLCBhYm91dF91cmwsIHRoZW1lX3VybCwgbG9ja2VyX3VybCwgcGFzc3dvcmRfYXV0aGVudGljYXRpb25fYWxsb3dlZCwgY2VydGlmaWNhdGVfYXV0aGVudGljYXRpb25fYWxsb3dlZCwgY3JlYXRlX2FjY291bnRfYWxsb3dlZCwgY2hhbmdlX2luZm9fYWxsb3dlZCwgY2hhbmdlX3Bhc3N3b3JkX2FsbG93ZWQsIGNoYW5nZV9jZXJ0aWZpY2F0ZV9hbGxvd2VkKVxuXHQgICovXG5cblx0c3RhcnQ6IGZ1bmN0aW9uKHNldHRpbmdzKVxuXHR7XG5cdFx0dGhpcy5fZ2xvYmFsRGVmZXJyZWQuZG9uZSgoKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBbXG5cdFx0XHRcdGxvZ29VUkwsIGhvbWVVUkwsIGNvbnRhY3RFbWFpbCxcblx0XHRcdFx0YWJvdXRVUkwsIHRoZW1lVVJMLCBsb2NrZXJVUkwsIGVuZHBvaW50VVJMLFxuXHRcdFx0XHRwYXNzd29yZEF1dGhlbnRpY2F0aW9uQWxsb3dlZCwgY2VydGlmaWNhdGVBdXRoZW50aWNhdGlvbkFsbG93ZWQsXG5cdFx0XHRcdGNyZWF0ZUFjY291bnRBbGxvd2VkLCBjaGFuZ2VJbmZvQWxsb3dlZCwgY2hhbmdlUGFzc3dvcmRBbGxvd2VkLCBjaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWRcblx0XHRcdF0gPSB0aGlzLnNldHVwKFtcblx0XHRcdFx0J2xvZ29fdXJsJywgJ2hvbWVfdXJsJywgJ2NvbnRhY3RfZW1haWwnLFxuXHRcdFx0XHQnYWJvdXRfdXJsJywgJ3RoZW1lX3VybCcsICdsb2NrZXJfdXJsJywgJ2VuZHBvaW50X3VybCcsXG5cdFx0XHRcdCdwYXNzd29yZF9hdXRoZW50aWNhdGlvbl9hbGxvd2VkJywgJ2NlcnRpZmljYXRlX2F1dGhlbnRpY2F0aW9uX2FsbG93ZWQnLFxuXHRcdFx0XHQnY3JlYXRlX2FjY291bnRfYWxsb3dlZCcsICdjaGFuZ2VfaW5mb19hbGxvd2VkJywgJ2NoYW5nZV9wYXNzd29yZF9hbGxvd2VkJywgJ2NoYW5nZV9jZXJ0aWZpY2F0ZV9hbGxvd2VkJyxcblx0XHRcdF0sIFtcblx0XHRcdFx0dGhpcy5vcmlnaW5VUkxcblx0XHRcdFx0XHQrICcvaW1hZ2VzL2xvZ28ucG5nJyxcblx0XHRcdFx0dGhpcy53ZWJBcHBVUkwsXG5cdFx0XHRcdCdhbWlAbHBzYy5pbjJwMy5mcicsXG5cdFx0XHRcdCdodHRwOi8vY2Vybi5jaC9hbWkvJyxcblx0XHRcdFx0dGhpcy5vcmlnaW5VUkwgKyAnL3R3aWcvQU1JL1RoZW1lL2JsdWUudHdpZycsXG5cdFx0XHRcdHRoaXMub3JpZ2luVVJMICsgJy90d2lnL0FNSS9GcmFnbWVudC9sb2NrZXIudHdpZycsXG5cdFx0XHRcdHRoaXMub3JpZ2luVVJMICsgJy9BTUkvRnJvbnRFbmQnLFxuXHRcdFx0XHR0cnVlLCB0cnVlLFxuXHRcdFx0XHR0cnVlLCB0cnVlLCB0cnVlLCB0cnVlLFxuXHRcdFx0XSwgc2V0dGluZ3MpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pQ29tbWFuZC5lbmRwb2ludCA9IGVuZHBvaW50VVJMO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0d2luZG93Lm9uYmVmb3JldW5sb2FkID0gKGUpID0+IHtcblxuXHRcdFx0XHRpZighdGhpcy5fY2FuTGVhdmUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBmID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG5cblx0XHRcdFx0XHRpZihmKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGYucmV0dXJuVmFsdWUgPSAnQ29uZmlybSB0aGF0IHlvdSB3YW50IHRvIGxlYXZlIHRoaXMgcGFnZT8nO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiAnQ29uZmlybSB0aGF0IHlvdSB3YW50IHRvIGxlYXZlIHRoaXMgcGFnZT8nO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgY29udHJvbHNVUkwgPSB0aGlzLm9yaWdpblVSTCArICcvY29udHJvbHMvQ09OVFJPTFMuanNvbic7XG5cblx0XHRcdGNvbnN0IHN1YmFwcHNVUkwgPSB0aGlzLm9yaWdpblVSTCArICcvc3ViYXBwcy9TVUJBUFBTLmpzb24nO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JC5hamF4KHt1cmw6IGNvbnRyb2xzVVJMLCBjYWNoZTogZmFsc2UsIGNyb3NzRG9tYWluOiB0cnVlLCBkYXRhVHlwZTogJ2pzb24nfSkudGhlbigoZGF0YTEpID0+IHtcblxuXHRcdFx0XHQkLmFqYXgoe3VybDogc3ViYXBwc1VSTCwgY2FjaGU6IGZhbHNlLCBjcm9zc0RvbWFpbjogdHJ1ZSwgZGF0YVR5cGU6ICdqc29uJ30pLnRoZW4oKGRhdGEyKSA9PiB7XG5cblx0XHRcdFx0XHRmb3IoY29uc3QgbmFtZSBpbiBkYXRhMSkge1xuXHRcdFx0XHRcdFx0dGhpcy5fY29udHJvbHNbbmFtZS50b0xvd2VyQ2FzZSgpXSA9IGRhdGExW25hbWVdO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGZvcihjb25zdCBuYW1lIGluIGRhdGEyKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9zdWJhcHBzW25hbWUudG9Mb3dlckNhc2UoKV0gPSBkYXRhMltuYW1lXTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZighdGhpcy5fZW1iZWRkZWQpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRcdFx0XHRcdExPR09fVVJMOiBsb2dvVVJMLFxuXHRcdFx0XHRcdFx0XHRIT01FX1VSTDogaG9tZVVSTCxcblx0XHRcdFx0XHRcdFx0Q09OVEFDVF9FTUFJTDogY29udGFjdEVtYWlsLFxuXHRcdFx0XHRcdFx0XHRBQk9VVF9VUkw6IGFib3V0VVJMLFxuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdCQuYWpheCh7dXJsOiB0aGVtZVVSTCwgY2FjaGU6IHRydWUsIGNyb3NzRG9tYWluOiB0cnVlLCBkYXRhVHlwZTogJ3RleHQnfSkudGhlbigoZGF0YTMpID0+IHtcblxuXHRcdFx0XHRcdFx0XHQkLmFqYXgoe3VybDogbG9ja2VyVVJMLCBjYWNoZTogdHJ1ZSwgY3Jvc3NEb21haW46IHRydWUsIGRhdGFUeXBlOiAndGV4dCd9KS50aGVuKChkYXRhNCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0JCgnYm9keScpLmFwcGVuZCh0aGlzLmZvcm1hdFRXSUcoZGF0YTMsIGRpY3QpICsgZGF0YTQpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5sb2NrKCk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGFtaUxvZ2luLl9zdGFydChcblx0XHRcdFx0XHRcdFx0XHRcdFx0cGFzc3dvcmRBdXRoZW50aWNhdGlvbkFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNlcnRpZmljYXRlQXV0aGVudGljYXRpb25BbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjcmVhdGVBY2NvdW50QWxsb3dlZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hhbmdlSW5mb0FsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNoYW5nZVBhc3N3b3JkQWxsb3dlZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hhbmdlQ2VydGlmaWNhdGVBbGxvd2VkXG5cdFx0XHRcdFx0XHRcdFx0XHQpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMudW5sb2NrKCk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmVycm9yKG1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0YWxlcnQoJ2NvdWxkIG5vdCBvcGVuIGAnICsgbG9ja2VyVVJMICsgJ2AsIHBsZWFzZSByZWxvYWQgdGhlIHBhZ2UuLi4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdGFsZXJ0KCdjb3VsZCBub3Qgb3BlbiBgJyArIHRoZW1lVVJMICsgJ2AsIHBsZWFzZSByZWxvYWQgdGhlIHBhZ2UuLi4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGxldCBkYXRhMyA9ICcnO1xuXG5cdFx0XHRcdFx0XHRpZigkKCcjYW1pX2FsZXJ0X2NvbnRlbnQnKS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdFx0ZGF0YTMgKz0gJzxkaXYgaWQ9XCJhbWlfYWxlcnRfY29udGVudFwiPjwvZGl2Pic7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmKCQoJyNhbWlfbG9naW5fbWVudV9jb250ZW50JykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdGRhdGEzICs9ICc8ZGl2IGlkPVwiYW1pX2xvZ2luX21lbnVfY29udGVudFwiPjwvZGl2Pic7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHQkLmFqYXgoe3VybDogbG9ja2VyVVJMLCBjYWNoZTogdHJ1ZSwgY3Jvc3NEb21haW46IHRydWUsIGRhdGFUeXBlOiAndGV4dCd9KS5kb25lKChkYXRhNCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdCQoJ2JvZHknKS5wcmVwZW5kKGRhdGEzICsgZGF0YTQpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdHRoaXMubG9jaygpO1xuXG5cdFx0XHRcdFx0XHRcdFx0YW1pTG9naW4uX3N0YXJ0KFxuXHRcdFx0XHRcdFx0XHRcdFx0cGFzc3dvcmRBdXRoZW50aWNhdGlvbkFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRjZXJ0aWZpY2F0ZUF1dGhlbnRpY2F0aW9uQWxsb3dlZCxcblx0XHRcdFx0XHRcdFx0XHRcdGNyZWF0ZUFjY291bnRBbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2hhbmdlSW5mb0FsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRjaGFuZ2VQYXNzd29yZEFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRjaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWRcblx0XHRcdFx0XHRcdFx0XHQpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnVubG9jaygpO1xuXG5cdFx0XHRcdFx0XHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmVycm9yKG1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0YWxlcnQoJ2NvdWxkIG5vdCBvcGVuIGAnICsgc3ViYXBwc1VSTCArICdgLCBwbGVhc2UgcmVsb2FkIHRoZSBwYWdlLi4uJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRhbGVydCgnY291bGQgbm90IG9wZW4gYCcgKyBjb250cm9sc1VSTCArICdgLCBwbGVhc2UgcmVsb2FkIHRoZSBwYWdlLi4uJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YWxlcnQobWVzc2FnZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIENPTlRST0xTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyBhIGNvbnRyb2xcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBjb250cm9sIHRoZSBhcnJheSBvZiBjb250cm9sIG5hbWVcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkQ29udHJvbDogZnVuY3Rpb24oY29udHJvbCwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSB0aGlzLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKGNvbnRyb2wuaW5kZXhPZignY3RybDonKSA9PT0gMClcblx0XHR7XG5cdFx0XHRjb250cm9sID0gY29udHJvbC5zdWJzdHJpbmcoNSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZGVzY3IgPSB0aGlzLl9jb250cm9sc1tjb250cm9sLnRvTG93ZXJDYXNlKCldO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoZGVzY3IpXG5cdFx0e1xuXHRcdFx0dGhpcy5sb2FkU2NyaXB0cyh0aGlzLm9yaWdpblVSTCArICcvJyArIGRlc2NyLmZpbGUpLnRoZW4oKGxvYWRlZCkgPT4ge1xuXG5cdFx0XHRcdHRyeVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgY2xhenogPSB3aW5kb3dbXG5cdFx0XHRcdFx0XHRkZXNjci5jbGF6elxuXHRcdFx0XHRcdF07XG5cblx0XHRcdFx0XHRjb25zdCBwcm9taXNlID0gbG9hZGVkWzBdID8gY2xhenoucHJvdG90eXBlLm9uUmVhZHkuYXBwbHkoY2xhenoucHJvdG90eXBlKVxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgOiAvKi0tLS0tLS0tLS0tLS0tLS0qLyBudWxsIC8qLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0X2FtaV9pbnRlcm5hbF90aGVuKHByb21pc2UsICgpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFsvKi0tLS0tLS0tLS0tLS0tLS0tLS0tKi8gY2xhenogLyotLS0tLS0tLS0tLS0tLS0tLS0tLSovXSk7XG5cblx0XHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIGNvbnRyb2wgYCcgKyBjb250cm9sICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2gobWVzc2FnZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgY29udHJvbCBgJyArIGNvbnRyb2wgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgY29udHJvbCBgJyArIGNvbnRyb2wgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgZmluZCBjb250cm9sIGAnICsgY29udHJvbCArICdgJ10pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmVudF0gPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW293bmVyXSA/Pz9cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBjb250cm9sID8/P1xuXHQgICogQHBhcmFtIHtBcnJheX0gcGFyYW1zID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNyZWF0ZUNvbnRyb2w6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIsIGNvbnRyb2wsIHBhcmFtcywgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSB0aGlzLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMubG9hZENvbnRyb2woY29udHJvbCwgc2V0dGluZ3MpLmRvbmUoKGNvbnN0cnVjdG9yKSA9PiB7XG5cblx0XHRcdGxldCBpbnN0YW5jZSA9IG5ldyBjb25zdHJ1Y3RvcihwYXJlbnQsIG93bmVyKTtcblxuXHRcdFx0X2FtaV9pbnRlcm5hbF90aGVuKGNvbnN0cnVjdG9yLnByb3RvdHlwZS5yZW5kZXIuYXBwbHkoaW5zdGFuY2UsIHBhcmFtcyksIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbaW5zdGFuY2VdLmNvbmNhdChbLi4uYXJndW1lbnRzXSkpO1xuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sIGluIHRoZSBib2R5XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmVudF0gPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW293bmVyXSA/Pz9cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBjb250cm9sID8/P1xuXHQgICogQHBhcmFtIHtBcnJheX0gcGFyYW1zV2l0aG91dFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IGNvbnRyb2xTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjcmVhdGVDb250cm9sSW5Cb2R5OiBmdW5jdGlvbihwYXJlbnQsIG93bmVyLCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0bGV0IFBBUkFNUyA9IFtdO1xuXHRcdFx0bGV0IFNFVFRJTkdTID0ge307XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRmb3IobGV0IGtleSBpbiBwYXJlbnRTZXR0aW5ncykge1xuXHRcdFx0XHRTRVRUSU5HU1trZXldID0gcGFyZW50U2V0dGluZ3Nba2V5XTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGxldCBrZXkgaW4gY29udHJvbFNldHRpbmdzKSB7XG5cdFx0XHRcdFNFVFRJTkdTW2tleV0gPSBjb250cm9sU2V0dGluZ3Nba2V5XTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdC8vLy8vLy5wdXNoKHNlbGVjdG9yKTtcblxuXHRcdFx0QXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoUEFSQU1TLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzKTtcblxuXHRcdFx0UEFSQU1TLnB1c2goU0VUVElOR1MpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0dGhpcy5jcmVhdGVDb250cm9sKHBhcmVudCwgb3duZXIsIGNvbnRyb2wsIFBBUkFNUykuZG9uZShmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgWy4uLmFyZ3VtZW50c10pO1xuXG5cdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cdFx0Y2F0Y2gobWVzc2FnZSlcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sIGluIGEgY29udGFpbmVyXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmVudF0gPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW293bmVyXSA/Pz9cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBjb250cm9sID8/P1xuXHQgICogQHBhcmFtIHtBcnJheX0gcGFyYW1zV2l0aG91dFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IGNvbnRyb2xTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBpY29uID8/P1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IHRpdGxlID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lcjogZnVuY3Rpb24ocGFyZW50LCBvd25lciwgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgaWNvbiwgdGl0bGUsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0cnlcblx0XHR7XG5cdFx0XHRwYXJlbnQuYXBwZW5kSXRlbSgnPGkgY2xhc3M9XCJmYSBmYS0nICsgdGhpcy50ZXh0VG9IdG1sKGljb24pICsgJ1wiPjwvaT4gJyArIHRoaXMudGV4dFRvSHRtbCh0aXRsZSkpLmRvbmUoKHNlbGVjdG9yKSA9PiB7XG5cblx0XHRcdFx0bGV0IFBBUkFNUyA9IFtdO1xuXHRcdFx0XHRsZXQgU0VUVElOR1MgPSB7fTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGZvcihsZXQga2V5IGluIHBhcmVudFNldHRpbmdzKSB7XG5cdFx0XHRcdFx0U0VUVElOR1Nba2V5XSA9IHBhcmVudFNldHRpbmdzW2tleV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IobGV0IGtleSBpbiBjb250cm9sU2V0dGluZ3MpIHtcblx0XHRcdFx0XHRTRVRUSU5HU1trZXldID0gY29udHJvbFNldHRpbmdzW2tleV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFBBUkFNUy5wdXNoKHNlbGVjdG9yKTtcblxuXHRcdFx0XHRBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShQQVJBTVMsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MpO1xuXG5cdFx0XHRcdFBBUkFNUy5wdXNoKFNFVFRJTkdTKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHRoaXMuY3JlYXRlQ29udHJvbChwYXJlbnQsIG93bmVyLCBjb250cm9sLCBQQVJBTVMpLmRvbmUoZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgWy4uLmFyZ3VtZW50c10pO1xuXG5cdFx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Y2F0Y2gobWVzc2FnZSlcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sIGluIGEgY29udGFpbmVyIGZyb20gYSBXRUIgbGlua1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtwYXJlbnRdID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtvd25lcl0gPz8/XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gZWwgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50U2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y3JlYXRlQ29udHJvbEZyb21XZWJMaW5rOiBmdW5jdGlvbihwYXJlbnQsIG93bmVyLCBlbCwgcGFyZW50U2V0dGluZ3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGRhdGFDdHJsID0gZWwuaGFzQXR0cmlidXRlKCdkYXRhLWN0cmwnKSA/IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jdHJsJylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cblx0XHRsZXQgZGF0YUN0cmxMb2NhdGlvbiA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1jdHJsLWxvY2F0aW9uJykgPyBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY3RybC1sb2NhdGlvbicpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgZGF0YVBhcmFtcyA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1wYXJhbXMnKSA/IEpTT04ucGFyc2UoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXBhcmFtcycpKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogW11cblx0XHQ7XG5cblx0XHRsZXQgZGF0YVNldHRpbmdzID0gZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNldHRpbmdzJykgPyBKU09OLnBhcnNlKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zZXR0aW5ncycpKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHt9XG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGRhdGFJY29uID0gZWwuaGFzQXR0cmlidXRlKCdkYXRhLWljb24nKSA/IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1pY29uJylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3F1ZXN0aW9uJ1xuXHRcdDtcblxuXHRcdGxldCBkYXRhVGl0bGUgPSBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdGl0bGUnKSA/IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS10aXRsZScpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ1Vua25vd24nXG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5sb2NrKCk7XG5cblx0XHQvKiovIGlmKGRhdGFDdHJsTG9jYXRpb24gPT09ICdib2R5Jylcblx0XHR7XG5cdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVDb250cm9sSW5Cb2R5KHBhcmVudCwgb3duZXIsIGRhdGFDdHJsLCBkYXRhUGFyYW1zLCBkYXRhU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncykuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy51bmxvY2soKTtcblxuXHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZXJyb3IobWVzc2FnZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lcihwYXJlbnQsIG93bmVyLCBkYXRhQ3RybCwgZGF0YVBhcmFtcywgZGF0YVNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgZGF0YUljb24sIGRhdGFUaXRsZSwgc2V0dGluZ3MpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMudW5sb2NrKCk7XG5cblx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHR0aGlzLmVycm9yKG1lc3NhZ2UpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNVQkFQUFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dHJpZ2dlckxvZ2luOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLl9pc1JlYWR5KVxuXHRcdHtcblx0XHRcdF9hbWlfaW50ZXJuYWxfdGhlbih0aGlzLl9jdXJyZW50U3ViQXBwSW5zdGFuY2Uub25Mb2dpbih0aGlzLmFyZ3NbJ3VzZXJkYXRhJ10pLCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdF9hbWlfaW50ZXJuYWxfYWx3YXlzKHRoaXMub25SZWZyZXNoKHRydWUpLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZShtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0X2FtaV9pbnRlcm5hbF9hbHdheXModGhpcy5vblJlZnJlc2godHJ1ZSksICgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dHJpZ2dlckxvZ291dDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy5faXNSZWFkeSlcblx0XHR7XG5cdFx0XHRfYW1pX2ludGVybmFsX3RoZW4odGhpcy5fY3VycmVudFN1YkFwcEluc3RhbmNlLm9uTG9nb3V0KHRoaXMuYXJnc1sndXNlcmRhdGEnXSksIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0X2FtaV9pbnRlcm5hbF9hbHdheXModGhpcy5vblJlZnJlc2goZmFsc2UpLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZShtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0X2FtaV9pbnRlcm5hbF9hbHdheXModGhpcy5vblJlZnJlc2goZmFsc2UpLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgYSBzdWJhcHBcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdWJhcHAgdGhlIHN1YmFwcFxuXHQgICogQHBhcmFtIHs/fSBbdXNlcmRhdGFdIHRoZSB1c2VyIGRhdGFcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkU3ViQXBwOiBmdW5jdGlvbihzdWJhcHAsIHVzZXJkYXRhLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5sb2NrKCk7XG5cblx0XHRyZXN1bHQuYWx3YXlzKCgpID0+IHtcblxuXHRcdFx0dGhpcy51bmxvY2soKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHN1YmFwcC5pbmRleE9mKCdzdWJhcHA6JykgPT09IDApXG5cdFx0e1xuXHRcdFx0c3ViYXBwID0gc3ViYXBwLnN1YnN0cmluZyg3KTtcblx0XHR9XG5cblx0XHRjb25zdCBkZXNjciA9IHRoaXMuX3N1YmFwcHNbc3ViYXBwLnRvTG93ZXJDYXNlKCldO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoZGVzY3IpXG5cdFx0e1xuXHRcdFx0dGhpcy5sb2FkU2NyaXB0cyh0aGlzLm9yaWdpblVSTCArICcvJyArIGRlc2NyLmZpbGUpLnRoZW4oKGxvYWRlZCkgPT4ge1xuXG5cdFx0XHRcdHRyeVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5fY3VycmVudFN1YkFwcEluc3RhbmNlLm9uRXhpdCh1c2VyZGF0YSk7XG5cblx0XHRcdFx0XHRjb25zdCBpbnN0YW5jZSA9IHdpbmRvd1tkZXNjci5pbnN0YW5jZV07XG5cblx0XHRcdFx0XHR0aGlzLl9jdXJyZW50U3ViQXBwSW5zdGFuY2UgPSBpbnN0YW5jZTtcblxuXHRcdFx0XHRcdC8qKi9cblxuXHRcdFx0XHRcdHRoaXMuZmlsbEJyZWFkY3J1bWIoZGVzY3IuYnJlYWRjcnVtYik7XG5cblx0XHRcdFx0XHRjb25zdCBwcm9taXNlID0gbG9hZGVkWzBdID8gaW5zdGFuY2Uub25SZWFkeSh1c2VyZGF0YSlcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgIDogLyotLS0tLS0qLyBudWxsIC8qLS0tLS0tKi9cblx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRfYW1pX2ludGVybmFsX3RoZW4ocHJvbWlzZSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRjb25zdCBwcm9taXNlID0gYW1pTG9naW4uaXNBdXRoZW50aWNhdGVkKCkgPyB0aGlzLnRyaWdnZXJMb2dpbigpXG5cdFx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnRyaWdnZXJMb2dvdXQoKVxuXHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0XHRwcm9taXNlLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbLyotLS0tLS0tLS0tLS0tLS0tLS0qLyBpbnN0YW5jZSAvKi0tLS0tLS0tLS0tLS0tLS0tLSovXSk7XG5cblx0XHRcdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBzdWJhcHAgYCcgKyBzdWJhcHAgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBzdWJhcHAgYCcgKyBzdWJhcHAgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaChtZXNzYWdlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBzdWJhcHAgYCcgKyBzdWJhcHAgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgc3ViYXBwIGAnICsgc3ViYXBwICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGZpbmQgc3ViYXBwIGAnICsgc3ViYXBwICsgJ2AnXSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIExvYWRzIGEgc3ViYXBwIGJ5IFVSTFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGRlZmF1bHRTdWJBcHAgaWYgJ2FtaVdlYkFwcC5hcmdzW1wic3ViYXBwXCJdJyBpcyBudWxsLCB0aGUgZGVmYXVsdCBzdWJhcHBcblx0ICAqIEBwYXJhbSB7P30gW2RlZmF1bHRVc2VyRGF0YV0gaWYgJ2FtaVdlYkFwcC5hcmdzW1widXNlcmRhdGFcIl0nIGlzIG51bGwsIHRoZSBkZWZhdWx0IHVzZXIgZGF0YVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZFN1YkFwcEJ5VVJMOiBmdW5jdGlvbihkZWZhdWx0U3ViQXBwLCBkZWZhdWx0VXNlckRhdGEpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRpZih0aGlzLmFyZ3NbJ3YnXSlcblx0XHR7XG5cdFx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0dldEhhc2hJbmZvIC1oYXNoPVwiJyArIHRoaXMudGV4dFRvU3RyaW5nKHRoaXMuYXJnc1sndiddKSArICdcIicpLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXG5cdFx0XHR9KS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdFx0bGV0IGpzb247XG5cblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRqc29uID0gSlNPTi5wYXJzZSh0aGlzLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImpzb25cIn0uJCcsIGRhdGEpWzBdIHx8ICd7fScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoKG1lc3NhZ2UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRqc29uID0gey8qIEVNUFRZIEpTT04gICBFTVBUWSBKU09OICAgRU1QVFkgSlNPTiAgIEVNUFRZIEpTT04gICBFTVBUWSBKU09OICovfTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3Qgc3ViYXBwID0ganNvblsnc3ViYXBwJ10gfHwgZGVmYXVsdFN1YkFwcDtcblx0XHRcdFx0Y29uc3QgdXNlcmRhdGEgPSBqc29uWyd1c2VyZGF0YSddIHx8IGRlZmF1bHRVc2VyRGF0YTtcblxuXHRcdFx0XHR0aGlzLmxvYWRTdWJBcHAoc3ViYXBwLCB1c2VyZGF0YSkudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXG5cdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRpZighYW1pUm91dGVyLmNoZWNrKCkpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3Qgc3ViYXBwID0gdGhpcy5hcmdzWydzdWJhcHAnXSB8fCBkZWZhdWx0U3ViQXBwO1xuXHRcdFx0XHRjb25zdCB1c2VyZGF0YSA9IHRoaXMuYXJnc1sndXNlcmRhdGEnXSB8fCBkZWZhdWx0VXNlckRhdGE7XG5cblx0XHRcdFx0dGhpcy5sb2FkU3ViQXBwKHN1YmFwcCwgdXNlcmRhdGEpLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaS5JQ29udHJvbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIEFNSSBjb250cm9sIGludGVyZmFjZVxuICogQGludGVyZmFjZSBhbWkuSUNvbnRyb2xcbiAqL1xuXG4kQU1JSW50ZXJmYWNlKCdhbWkuSUNvbnRyb2wnLCAvKiogQGxlbmRzIGFtaS5JQ29udHJvbCAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBQYXRjaGVzIGFuIEhUTUwgaWRlbnRpZmllclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGlkIHRoZSB1bnBhdGNoZWQgSFRNTCBpZGVudGlmaWVyXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcblx0ICAqL1xuXG5cdHBhdGNoSWQ6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFB1dHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIHRoZSB0YXJnZXQgc2VsZWN0b3Jcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0d2lnIHRoZSBUV0lHIGZyYWdtZW50XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0cmVwbGFjZUhUTUw6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFByZXBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdHByZXBlbmRIVE1MOiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBcHBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGFwcGVuZEhUTUw6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENhbGxlZCB3aGVuIHRoZSBjb250cm9sIGlzIHJlYWR5IHRvIHJ1blxuXHQgICovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgaXMgcmVtb3ZlZFxuXHQgICovXG5cblx0b25SZW1vdmU6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaS5JU3ViQXBwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIEFNSSBzdWItYXBwbGljYXRpb24gaW50ZXJmYWNlXG4gKiBAaW50ZXJmYWNlIGFtaS5JU3ViQXBwXG4gKi9cblxuJEFNSUludGVyZmFjZSgnYW1pLklTdWJBcHAnLCAvKiogQGxlbmRzIGFtaS5JU3ViQXBwICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENhbGxlZCB3aGVuIHRoZSBzdWItYXBwbGljYXRpb24gaXMgcmVhZHkgdG8gcnVuXG5cdCAgKiBAcGFyYW0gez99IHVzZXJkYXRhIHVzZXJkYXRhXG5cdCAgKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIGFib3V0IHRvIGV4aXRcblx0ICAqIEBwYXJhbSB7P30gdXNlcmRhdGEgdXNlcmRhdGFcblx0ICAqL1xuXG5cdG9uRXhpdDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2FsbGVkIHdoZW4gbG9nZ2luZyBpblxuXHQgICogQHBhcmFtIHs/fSB1c2VyZGF0YSB1c2VyZGF0YVxuXHQgICovXG5cblx0b25Mb2dpbjogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2FsbGVkIHdoZW4gbG9nZ2luZyBvdXRcblx0ICAqIEBwYXJhbSB7P30gdXNlcmRhdGEgdXNlcmRhdGFcblx0ICAqL1xuXG5cdG9uTG9nb3V0OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWkuQ29udHJvbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBiYXNpYyBBTUkgY29udHJvbFxuICogQGNsYXNzIGFtaS5Db250cm9sXG4gKiBAaW1wbGVtZW50cyB7YW1pLklDb250cm9sfVxuICovXG5cbiRBTUlDbGFzcygnYW1pLkNvbnRyb2wnLCAvKiogQGxlbmRzIGFtaS5Db250cm9sICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW1wbGVtZW50czogW2FtaS5JQ29udHJvbF0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkOiBmdW5jdGlvbigpXG5cdHtcblx0XHRhbWkuQ29udHJvbC5pbnN0YW5jZUNudCA9IDE7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24ocGFyZW50ID0gdGhpcywgb3duZXIgPSB0aGlzKVxuXHR7XG5cdFx0dGhpcy5fcGFyZW50ID0gcGFyZW50O1xuXHRcdHRoaXMuX293bmVyID0gb3duZXI7XG5cblx0XHR0aGlzLmluc3RhbmNlU3VmZml4ID0gYW1pLkNvbnRyb2wuaW5zdGFuY2VDbnQrKztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldFBhcmVudDogZnVuY3Rpb24ocGFyZW50ID0gdGhpcylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG5cdH0sXG5cblx0Z2V0UGFyZW50OiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGFyZW50O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0T3duZXI6IGZ1bmN0aW9uKG93bmVyID0gdGhpcylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9vd25lciA9IG93bmVyO1xuXHR9LFxuXG5cdGdldE93bmVyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fb3duZXI7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRTZWxlY3RvcjogZnVuY3Rpb24oc2VsZWN0b3IgPSAnJylcblx0e1xuXHRcdGlmKHNlbGVjdG9yKVxuXHRcdHtcblx0XHRcdCQoc2VsZWN0b3IpLm9uKCdyZW1vdmUnLCAoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5vblJlbW92ZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuX3NlbGVjdG9yID0gc2VsZWN0b3I7XG5cdH0sXG5cblx0Z2V0U2VsZWN0b3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zZWxlY3Rvcjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhdGNoSWQ6IGZ1bmN0aW9uKGlkZW50aWZpZXIpXG5cdHtcblx0XHRyZXR1cm4gaWRlbnRpZmllciArICdfaW5zdGFuY2UnICsgdGhpcy5pbnN0YW5jZVN1ZmZpeDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlcGxhY2VIVE1MOiBmdW5jdGlvbihzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MgPSB7fSlcblx0e1xuXHRcdHNldHRpbmdzLnN1ZmZpeCA9IHRoaXMuaW5zdGFuY2VTdWZmaXg7XG5cblx0XHRyZXR1cm4gYW1pV2ViQXBwLnJlcGxhY2VIVE1MKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwcmVwZW5kSFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzID0ge30pXG5cdHtcblx0XHRzZXR0aW5ncy5zdWZmaXggPSB0aGlzLmluc3RhbmNlU3VmZml4O1xuXG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5wcmVwZW5kSFRNTChzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YXBwZW5kSFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzID0ge30pXG5cdHtcblx0XHRzZXR0aW5ncy5zdWZmaXggPSB0aGlzLmluc3RhbmNlU3VmZml4O1xuXG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5hcHBlbmRIVE1MKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjcmVhdGVDb250cm9sOiBmdW5jdGlvbihwYXJlbnQsIGNvbnRyb2wsIHBhcmFtcywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2wocGFyZW50LCB0aGlzLCBjb250cm9sLCBwYXJhbXMsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNyZWF0ZUNvbnRyb2xJbkJvZHk6IGZ1bmN0aW9uKHBhcmVudCwgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2xJbkJvZHkocGFyZW50LCB0aGlzLCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjcmVhdGVDb250cm9sSW5Db250YWluZXI6IGZ1bmN0aW9uKHBhcmVudCwgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgaWNvbiwgdGl0bGUsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5jcmVhdGVDb250cm9sSW5Db250YWluZXIocGFyZW50LCB0aGlzLCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBpY29uLCB0aXRsZSwgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y3JlYXRlQ29udHJvbEZyb21XZWJMaW5rOiBmdW5jdGlvbihwYXJlbnQsIGVsLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2xGcm9tV2ViTGluayhwYXJlbnQsIHRoaXMsIGVsLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25SZW1vdmU6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaS5TdWJBcHAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIGJhc2ljIEFNSSBzdWItYXBwbGljYXRpb25cbiAqIEBjbGFzcyBhbWkuU3ViQXBwXG4gKiBAaW1wbGVtZW50cyB7YW1pLklTdWJBcHB9XG4gKi9cblxuJEFNSUNsYXNzKCdhbWkuU3ViQXBwJywgLyoqIEBsZW5kcyBhbWkuU3ViQXBwICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW1wbGVtZW50czogW2FtaS5JU3ViQXBwXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uRXhpdDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uTG9naW46IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvbkxvZ291dDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlDb21tYW5kICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBBTUkgY29tbWFuZCBzdWJzeXN0ZW1cbiAqIEBuYW1lc3BhY2UgYW1pQ29tbWFuZFxuICovXG5cbiRBTUlOYW1lc3BhY2UoJ2FtaUNvbW1hbmQnLCAvKiogQGxlbmRzIGFtaUNvbW1hbmQgKi8ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQVUJMSUMgTUVNQkVSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRGVmYXVsdCBlbmRwb2ludFxuXHQgICogQHR5cGUge1N0cmluZ31cblx0ICAqL1xuXG5cdGVuZHBvaW50OiAnaHR0cDovL3h4eXkuenonLFxuXG5cdC8qKlxuXHQgICogRGVmYXVsdCBjb252ZXJ0ZXJcblx0ICAqIEB0eXBlIHtTdHJpbmd9XG5cdCAgKi9cblxuXHRjb252ZXJ0ZXI6ICdBTUlYbWxUb0pzb24ueHNsJyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQVUJMSUMgTUVUSE9EUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRXhlY3V0ZXMgYW4gQU1JIGNvbW1hbmRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBjb21tYW5kIHRoZSBjb21tYW5kXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBlbmRwb2ludCwgY29udmVydGVyLCB0aW1lb3V0LCBleHRyYVBhcmFtLCBleHRyYVZhbHVlKVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0ZXhlY3V0ZTogZnVuY3Rpb24oY29tbWFuZCwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbZW5kcG9pbnQsIGNvbnZlcnRlciwgY29udGV4dCwgdGltZW91dCwgZXh0cmFQYXJhbSwgZXh0cmFWYWx1ZV0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbJ2VuZHBvaW50JywgJ2NvbnZlcnRlcicsICdjb250ZXh0JywgJ3RpbWVvdXQnLCAnZXh0cmFQYXJhbScsICdleHRyYVZhbHVlJ10sXG5cdFx0XHRbdGhpcy5lbmRwb2ludCwgdGhpcy5jb252ZXJ0ZXIsIHJlc3VsdCwgMiAqIDYwICogMTAwMCwgbnVsbCwgbnVsbF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBVUkwgPSBlbmRwb2ludC50cmltKCk7XG5cdFx0Y29uc3QgQ09NTUFORCA9IGNvbW1hbmQudHJpbSgpO1xuXHRcdGNvbnN0IENPTlZFUlRFUiA9IGNvbnZlcnRlci50cmltKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkYXRhID0ge1xuXHRcdFx0Q29tbWFuZDogQ09NTUFORCxcblx0XHRcdENvbnZlcnRlcjogQ09OVkVSVEVSLFxuXHRcdH07XG5cblx0XHRpZihleHRyYVBhcmFtKVxuXHRcdHtcblx0XHRcdGRhdGFbZXh0cmFQYXJhbV0gPSBleHRyYVZhbHVlID8gZXh0cmFWYWx1ZVxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAoKChudWxsKSkpXG5cdFx0XHQ7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdXJsV2l0aFBhcmFtZXRlcnMgPSBVUkwgKyAnPycgKyAkLnBhcmFtKGRhdGEpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoQ09OVkVSVEVSID09PSAnQU1JWG1sVG9Kc29uLnhzbCcpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBKU09OIEZPUk1BVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR1cmw6IFVSTCxcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHR0aW1lb3V0OiB0aW1lb3V0LFxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHR4aHJGaWVsZHM6IHtcblx0XHRcdFx0XHR3aXRoQ3JlZGVudGlhbHM6IHRydWVcblx0XHRcdFx0fSxcblx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcblxuXHRcdFx0XHRcdGNvbnN0IGluZm8gPSBKU1BhdGguYXBwbHkoJy5BTUlNZXNzYWdlLmluZm8uJCcsIGRhdGEpO1xuXHRcdFx0XHRcdGNvbnN0IGVycm9yID0gSlNQYXRoLmFwcGx5KCcuQU1JTWVzc2FnZS5lcnJvci4kJywgZGF0YSk7XG5cblx0XHRcdFx0XHRpZihlcnJvci5sZW5ndGggPT09IDApXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtkYXRhLCBpbmZvLmpvaW4oJy4gJyksIHVybFdpdGhQYXJhbWV0ZXJzXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbZGF0YSwgZXJyb3Iuam9pbignLiAnKSwgdXJsV2l0aFBhcmFtZXRlcnNdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVycm9yOiAoanFYSFIsIHRleHRTdGF0dXMpID0+IHtcblxuXHRcdFx0XHRcdGlmKHRleHRTdGF0dXMgPT09ICdlcnJvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGV4dFN0YXR1cyA9ICdzZXJ2aWNlIHRlbXBvcmFyaWx5IHVucmVhY2hhYmxlJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZih0ZXh0U3RhdHVzID09PSAncGFyc2VyZXJyb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRleHRTdGF0dXMgPSAncmVzb3VyY2UgdGVtcG9yYXJpbHkgdW5yZWFjaGFibGUnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGNvbnN0IGRhdGEgPSB7J0FNSU1lc3NhZ2UnOiBbeydlcnJvcic6IFt7JyQnOiB0ZXh0U3RhdHVzfV19XX07XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbZGF0YSwgdGV4dFN0YXR1cywgdXJsV2l0aFBhcmFtZXRlcnNdKTtcblx0XHRcdFx0fSxcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9IGVsc2Uge1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBPVEhFUiBGT1JNQVRTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR1cmw6IFVSTCxcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHR0aW1lb3V0OiB0aW1lb3V0LFxuXHRcdFx0XHRkYXRhVHlwZTogJ3RleHQnLFxuXHRcdFx0XHR4aHJGaWVsZHM6IHtcblx0XHRcdFx0XHR3aXRoQ3JlZGVudGlhbHM6IHRydWVcblx0XHRcdFx0fSxcblx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZGF0YSwgZGF0YSwgdXJsV2l0aFBhcmFtZXRlcnNdKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6IChqcVhIUiwgdGV4dFN0YXR1cykgPT4ge1xuXG5cdFx0XHRcdFx0aWYodGV4dFN0YXR1cyA9PT0gJ2Vycm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZXh0U3RhdHVzID0gJ3NlcnZpY2UgdGVtcG9yYXJpbHkgdW5yZWFjaGFibGUnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFt0ZXh0U3RhdHVzLCB0ZXh0U3RhdHVzLCB1cmxXaXRoUGFyYW1ldGVyc10pO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBMb2dzIGluIGJ5IGxvZ2luL3Bhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlciB0aGUgdXNlclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhc3MgdGhlIHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0cGFzc0xvZ2luOiBmdW5jdGlvbih1c2VyLCBwYXNzLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmV4ZWN1dGUoJ0dldFNlc3Npb25JbmZvIC1BTUlVc2VyPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodXNlcikgKyAnXCIgLUFNSVBhc3M9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwYXNzKSArICdcIicsIHtleHRyYVBhcmFtOiAnTm9DZXJ0J30pLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0Y29uc3QgdXNlckluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHJvbGVJbmZvID0ge307XG5cdFx0XHRjb25zdCB1ZHBJbmZvID0ge307XG5cdFx0XHRjb25zdCBzc29JbmZvID0ge31cblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInVzZXJcIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHVzZXJJbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJ1ZHBcIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHVkcEluZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInNzb1wifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0c3NvSW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwicm9sZVwifS5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRsZXQgbmFtZSA9ICcnO1xuXHRcdFx0XHRjb25zdCByb2xlID0ge307XG5cblx0XHRcdFx0cm93LmZpZWxkLmZvckVhY2goKGZpZWxkKSA9PiB7XG5cblx0XHRcdFx0XHRyb2xlW2ZpZWxkWydAbmFtZSddXSA9IGZpZWxkWyckJ107XG5cblx0XHRcdFx0XHRpZihmaWVsZFsnQG5hbWUnXSA9PT0gJ25hbWUnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWUgPSBmaWVsZFsnJCddO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cm9sZUluZm9bbmFtZV0gPSByb2xlO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvXSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbZGF0YSwgbWVzc2FnZSwge0FNSVVzZXI6ICdndWVzdCcsIGd1ZXN0VXNlcjogJ2d1ZXN0J30sIHt9LCB7fSwge31dKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBMb2dzIGluIGJ5IGNlcnRpZmljYXRlXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y2VydExvZ2luOiBmdW5jdGlvbihzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmV4ZWN1dGUoJ0dldFNlc3Npb25JbmZvJykudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRjb25zdCB1c2VySW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgcm9sZUluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHVkcEluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHNzb0luZm8gPSB7fTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInVzZXJcIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHVzZXJJbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJ1ZHBcIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHVkcEluZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInNzb1wifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0c3NvSW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwicm9sZVwifS5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRsZXQgbmFtZSA9ICcnO1xuXHRcdFx0XHRjb25zdCByb2xlID0ge307XG5cblx0XHRcdFx0cm93LmZpZWxkLmZvckVhY2goKGZpZWxkKSA9PiB7XG5cblx0XHRcdFx0XHRyb2xlW2ZpZWxkWydAbmFtZSddXSA9IGZpZWxkWyckJ107XG5cblx0XHRcdFx0XHRpZihmaWVsZFsnQG5hbWUnXSA9PT0gJ25hbWUnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWUgPSBmaWVsZFsnJCddO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cm9sZUluZm9bbmFtZV0gPSByb2xlO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvXSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbZGF0YSwgbWVzc2FnZSwge0FNSVVzZXI6ICdndWVzdCcsIGd1ZXN0VXNlcjogJ2d1ZXN0J30sIHt9LCB7fSwge31dKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBMb2dzIG91dFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvZ291dDogZnVuY3Rpb24oc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5leGVjdXRlKCdHZXRTZXNzaW9uSW5mbyAtQU1JVXNlcj1cIlwiIC1BTUlQYXNzPVwiXCInLCB7ZXh0cmFQYXJhbTogJ05vQ2VydCd9KS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGNvbnN0IHVzZXJJbmZvID0ge307XG5cdFx0XHRjb25zdCByb2xlSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3QgdWRwSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgc3NvSW5mbyA9IHt9XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJ1c2VyXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1c2VySW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwidWRwXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1ZHBJbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJzc29cIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHNzb0luZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInJvbGVcIn0ucm93JywgZGF0YSkuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0bGV0IG5hbWUgPSAnJztcblx0XHRcdFx0Y29uc3Qgcm9sZSA9IHt9O1xuXG5cdFx0XHRcdHJvdy5maWVsZC5mb3JFYWNoKChmaWVsZCkgPT4ge1xuXG5cdFx0XHRcdFx0cm9sZVtmaWVsZFsnQG5hbWUnXV0gPSBmaWVsZFsnJCddO1xuXG5cdFx0XHRcdFx0aWYoZmllbGRbJ0BuYW1lJ10gPT09ICduYW1lJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lID0gZmllbGRbJyQnXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJvbGVJbmZvW25hbWVdID0gcm9sZTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2RhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mb10pO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGEsIG1lc3NhZ2UsIHtBTUlVc2VyOiAnZ3Vlc3QnLCBndWVzdFVzZXI6ICdndWVzdCd9LCB7fSwge30sIHt9XSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXR0YWNoZXMgYSBjZXJ0aWZpY2F0ZVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHVzZXIgdGhlIHVzZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBwYXNzIHRoZSBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGF0dGFjaENlcnQ6IGZ1bmN0aW9uKHVzZXIsIHBhc3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZSgnR2V0U2Vzc2lvbkluZm8gLWF0dGFjaENlcnQgLWFtaUxvZ2luPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodXNlcikgKyAnXCIgLWFtaVBhc3N3b3JkPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcocGFzcykgKyAnXCInLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIERldGFjaGVzIGEgY2VydGlmaWNhdGVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyIHRoZSB1c2VyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGFzcyB0aGUgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRkZXRhY2hDZXJ0OiBmdW5jdGlvbih1c2VyLCBwYXNzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGUoJ0dldFNlc3Npb25JbmZvIC1kZXRhY2hDZXJ0IC1hbWlMb2dpbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHVzZXIpICsgJ1wiIC1hbWlQYXNzd29yZD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHBhc3MpICsgJ1wiJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBZGRzIGEgbmV3IHVzZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyIHRoZSB1c2VyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGFzcyB0aGUgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBmaXJzdE5hbWUgdGhlIGZpcnN0IG5hbWVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBsYXN0TmFtZSB0aGUgbGFzdCBuYW1lXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gZW1haWwgdGhlIGVtYWlsXG5cdCAgKiBAcGFyYW0ge0Jvb2xlYW59IGF0dGFjaCBhdHRhY2ggdGhlIGN1cnJlbnQgY2VydGlmaWNhdGVcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gYWdyZWUgYWdyZWUgd2l0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRhZGRVc2VyOiBmdW5jdGlvbih1c2VyLCBwYXNzLCBmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbCwgYXR0YWNoLCBhZ3JlZSwgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5leGVjdXRlKCdBZGRVc2VyIC1hbWlMb2dpbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHVzZXIpICsgJ1wiIC1hbWlQYXNzd29yZD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHBhc3MpICsgJ1wiIC1maXJzdE5hbWU9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhmaXJzdE5hbWUpICsgJ1wiIC1sYXN0TmFtZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGxhc3ROYW1lKSArICdcIiAtZW1haWw9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhlbWFpbCkgKyAnXCInICsgKGF0dGFjaCA/ICcgLWF0dGFjaCcgOiAnJykgKyAoYWdyZWUgPyAnIC1hZ3JlZScgOiAnJyksIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hhbmdlcyB0aGUgYWNjb3VudCBpbmZvcm1hdGlvblxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGZpcnN0TmFtZSB0aGUgZmlyc3QgbmFtZVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGxhc3ROYW1lIHRoZSBsYXN0IG5hbWVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBlbWFpbCB0aGUgZW1haWxcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjaGFuZ2VJbmZvOiBmdW5jdGlvbihmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbCwgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5leGVjdXRlKCdTZXRVc2VySW5mbyAtZmlyc3ROYW1lPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZmlyc3ROYW1lKSArICdcIiAtbGFzdE5hbWU9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhsYXN0TmFtZSkgKyAnXCIgLWVtYWlsPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZW1haWwpICsgJ1wiJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDaGFuZ2VzIHRoZSBhY2NvdW50IHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlciB0aGUgdXNlclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IG9sZFBhc3MgdGhlIG9sZCBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IG5ld1Bhc3MgdGhlIG5ldyBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNoYW5nZVBhc3M6IGZ1bmN0aW9uKHVzZXIsIG9sZFBhc3MsIG5ld1Bhc3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZSgnQ2hhbmdlUGFzc3dvcmQgLWFtaUxvZ2luPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodXNlcikgKyAnXCIgLWFtaVBhc3N3b3JkT2xkPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcob2xkUGFzcykgKyAnXCIgLWFtaVBhc3N3b3JkTmV3PVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcobmV3UGFzcykgKyAnXCInLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFJlc2V0cyB0aGUgYWNjb3VudCBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHVzZXIgdGhlIHVzZXJcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRyZXNldFBhc3M6IGZ1bmN0aW9uKHVzZXIsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZSgnUmVzZXRQYXNzd29yZCAtYW1pTG9naW49XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh1c2VyKSArICdcIicsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlMb2dpbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBBTUkgYXV0aGVudGljYXRpb24gc3Vic3lzdGVtXG4gKiBAbmFtZXNwYWNlIGFtaUxvZ2luXG4gKi9cblxuJEFNSU5hbWVzcGFjZSgnYW1pTG9naW4nLCAvKiogQGxlbmRzIGFtaUxvZ2luICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXNzd29yZEF1dGhlbnRpY2F0aW9uQWxsb3dlZDogdHJ1ZSxcblx0Y2VydGlmaWNhdGVBdXRoZW50aWNhdGlvbkFsbG93ZWQ6IHRydWUsXG5cdGNyZWF0ZUFjY291bnRBbGxvd2VkOiB0cnVlLFxuXHRjaGFuZ2VJbmZvQWxsb3dlZDogdHJ1ZSxcblx0Y2hhbmdlUGFzc3dvcmRBbGxvd2VkOiB0cnVlLFxuXHRjaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWQ6IHRydWUsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR1c2VyOiAnZ3Vlc3QnLFxuXHRndWVzdDogJ2d1ZXN0JyxcblxuXHRjbGllbnRETjogJycsIC8vIGZhaXJlIGRpc3BhcmFpdHJlIGNlcyB2YXJpYWJsZXMgZXQgbGVzIGdldHRlcnNcblx0aXNzdWVyRE46ICcnLCAvLyBmYWlyZSBkaXNwYXJhaXRyZSBjZXMgdmFyaWFibGVzIGV0IGxlcyBnZXR0ZXJzXG5cblx0bm90QmVmb3JlOiAnJywgLy8gZmFpcmUgZGlzcGFyYWl0cmUgY2VzIHZhcmlhYmxlcyBldCBsZXMgZ2V0dGVyc1xuXHRub3RBZnRlcjogJycsIC8vIGZhaXJlIGRpc3BhcmFpdHJlIGNlcyB2YXJpYWJsZXMgZXQgbGVzIGdldHRlcnNcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHVzZXJJbmZvOiB7fSxcblx0cm9sZUluZm86IHt9LFxuXHR1ZHBJbmZvOiB7fSxcblx0c3NvSW5mbzoge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFJJVkFURSBNRVRIT0RTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfc3RhcnQ6IGZ1bmN0aW9uKHBhc3N3b3JkQXV0aGVudGljYXRpb25BbGxvd2VkLCBjZXJ0aWZpY2F0ZUF1dGhlbnRpY2F0aW9uQWxsb3dlZCwgY3JlYXRlQWNjb3VudEFsbG93ZWQsIGNoYW5nZUluZm9BbGxvd2VkLCBjaGFuZ2VQYXNzd29yZEFsbG93ZWQsIGNoYW5nZUNlcnRpZmljYXRlQWxsb3dlZClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2FkVFdJR3MoW1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvdHdpZy9BTUkvRnJhZ21lbnQvbG9naW5fYnV0dG9uLnR3aWcnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvdHdpZy9BTUkvRnJhZ21lbnQvbG9nb3V0X2J1dHRvbi50d2lnJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL3R3aWcvQU1JL01vZGFsL2xvZ2luLnR3aWcnLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRoaXMuZnJhZ21lbnRMb2dpbkJ1dHRvbiA9IGRhdGFbMF07XG5cdFx0XHR0aGlzLmZyYWdtZW50TG9nb3V0QnV0dG9uID0gZGF0YVsxXTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRcdHBhc3N3b3JkQXV0aGVudGljYXRpb25BbGxvd2VkOiB0aGlzLnBhc3N3b3JkQXV0aGVudGljYXRpb25BbGxvd2VkID0gcGFzc3dvcmRBdXRoZW50aWNhdGlvbkFsbG93ZWQsXG5cdFx0XHRcdGNlcnRpZmljYXRlQXV0aGVudGljYXRpb25BbGxvd2VkOiB0aGlzLmNlcnRpZmljYXRlQXV0aGVudGljYXRpb25BbGxvd2VkID0gY2VydGlmaWNhdGVBdXRoZW50aWNhdGlvbkFsbG93ZWQsXG5cdFx0XHRcdGNyZWF0ZUFjY291bnRBbGxvd2VkOiB0aGlzLmNyZWF0ZUFjY291bnRBbGxvd2VkID0gY3JlYXRlQWNjb3VudEFsbG93ZWQsXG5cdFx0XHRcdGNoYW5nZUluZm9BbGxvd2VkOiB0aGlzLmNoYW5nZUluZm9BbGxvd2VkID0gY2hhbmdlSW5mb0FsbG93ZWQsXG5cdFx0XHRcdGNoYW5nZVBhc3N3b3JkQWxsb3dlZDogdGhpcy5jaGFuZ2VQYXNzd29yZEFsbG93ZWQgPSBjaGFuZ2VQYXNzd29yZEFsbG93ZWQsXG5cdFx0XHRcdGNoYW5nZUNlcnRpZmljYXRlQWxsb3dlZDogdGhpcy5jaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWQgPSBjaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWQsXG5cdFx0XHR9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pV2ViQXBwLmFwcGVuZEhUTUwoJ2JvZHknLCBkYXRhWzJdLCB7ZGljdDogZGljdH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0I3ODk0Q0MxXzFEQUFfNEE3RV9CN0QxX0RCREY2RjA2QUM3MycpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5mb3JtX2xvZ2luKGUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcjRUUwNTVDRDRfRTU4Rl80ODM0XzgwMjBfOTg2QUUzRjhENjdEJykuc3VibWl0KChlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmZvcm1fYWRkVXNlcihlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnI0RBMjA0N0EyXzlFNURfNDIwRF9CNkU3X0ZBMjYxRDJFRjEwRicpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5mb3JtX3JlbWluZFBhc3MoZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdCQoJyNEOUVBRjk5OF9FRDhFXzQ0RDJfQTBCRV84QzVDRjVFNDM4QkQnKS5zdWJtaXQoKGUpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuZm9ybV9jaGFuZ2VJbmZvKGUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcjRTkyQTEwOTdfOTgzQl80ODU3Xzg3NUZfMDdFNDY1OUI0MUIwJykuc3VibWl0KChlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmZvcm1fY2hhbmdlUGFzcyhlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHQkKCcjRTZFMzBFRUNfMTVFRV80RkNGXzk4MDlfMkI4RUMyRkVGMzg4LCNDQ0Q4RTZGMV82REY4XzRCRERfQTBFQ19DM0MzODA4MzAxODcnKS5jaGFuZ2UoKCkgPT4ge1xuXG5cdFx0XHRcdFx0Y29uc3QgcGFzczEgPSAkKCcjRTZFMzBFRUNfMTVFRV80RkNGXzk4MDlfMkI4RUMyRkVGMzg4JykudmFsKCk7XG5cdFx0XHRcdFx0Y29uc3QgcGFzczIgPSAkKCcjQ0NEOEU2RjFfNkRGOF80QkREX0EwRUNfQzNDMzgwODMwMTg3JykudmFsKCk7XG5cblx0XHRcdFx0XHQkKCcjQ0NEOEU2RjFfNkRGOF80QkREX0EwRUNfQzNDMzgwODMwMTg3JykuZ2V0KDApLnNldEN1c3RvbVZhbGlkaXR5KFxuXHRcdFx0XHRcdFx0cGFzczEubGVuZ3RoID4gMCAmJiBwYXNzMi5sZW5ndGggPiAwICYmIHBhc3MxICE9PSBwYXNzMiA/ICdQYXNzd29yZHMgZG9uXFwndCBtYXRjaC4nIDogJydcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcjRDQ4N0ZFNzJfOEQ5NV80MDQ4X0JFQTNfMjUyMjc0ODYyQUY0LCNFRTFEQTU4Q18zNzYxXzQ3MzRfQTlDMl9FODA4Q0REN0VFNzcnKS5jaGFuZ2UoKCkgPT4ge1xuXG5cdFx0XHRcdFx0Y29uc3QgcGFzczEgPSAkKCcjRDQ4N0ZFNzJfOEQ5NV80MDQ4X0JFQTNfMjUyMjc0ODYyQUY0JykudmFsKCk7XG5cdFx0XHRcdFx0Y29uc3QgcGFzczIgPSAkKCcjRUUxREE1OENfMzc2MV80NzM0X0E5QzJfRTgwOENERDdFRTc3JykudmFsKCk7XG5cblx0XHRcdFx0XHQkKCcjRUUxREE1OENfMzc2MV80NzM0X0E5QzJfRTgwOENERDdFRTc3JykuZ2V0KDApLnNldEN1c3RvbVZhbGlkaXR5KFxuXHRcdFx0XHRcdFx0cGFzczEubGVuZ3RoID4gMCAmJiBwYXNzMi5sZW5ndGggPiAwICYmIHBhc3MxICE9PSBwYXNzMiA/ICdQYXNzd29yZHMgZG9uXFwndCBtYXRjaC4nIDogJydcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChlKSA9PiB7XG5cblx0XHRcdFx0aWYodGhpcy5zc29JbmZvLnVybC5zdGFydHNXaXRoKGUub3JpZ2luKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IHVzZXIgPSBlLmRhdGEudXNlcjtcblx0XHRcdFx0XHRjb25zdCBwYXNzID0gZS5kYXRhLnBhc3M7XG5cblx0XHRcdFx0XHRpZih1c2VyICYmIHBhc3MpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhpcy5mb3JtX2xvZ2luMih1c2VyLCBwYXNzKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRlLnNvdXJjZS5jbG9zZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sIGZhbHNlKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IHVzZXJkYXRhID0gYW1pV2ViQXBwLmFyZ3NbJ3VzZXJkYXRhJ10gfHwgJyc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRzZXRJbnRlcnZhbCgoKSA9PiB7XG5cblx0XHRcdFx0aWYoYW1pV2ViQXBwLl9pc1JlYWR5KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YW1pQ29tbWFuZC5jZXJ0TG9naW4oKS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblxuXHRcdFx0XHRcdH0pLmRvbmUoKGRhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykgPT4ge1xuXG5cdFx0XHRcdFx0XHRpZigodXNlckluZm8uQU1JVXNlciB8fCAnJykgPT09ICh1c2VySW5mby5ndWVzdFVzZXIgfHwgJycpKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLl91cGRhdGUodXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9LCAzMCAqIDEwMDApO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pQ29tbWFuZC5jZXJ0TG9naW4oKS5mYWlsKChkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pID0+IHtcblxuXHRcdFx0XHR0aGlzLl91cGRhdGUodXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKS5hbHdheXMoKC8qLS0tKi8pID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9KS5kb25lKChkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pID0+IHtcblxuXHRcdFx0XHRfYW1pX2ludGVybmFsX3RoZW4oYW1pV2ViQXBwLm9uUmVhZHkodXNlcmRhdGEpLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuX2lzUmVhZHkgPSB0cnVlO1xuXG5cdFx0XHRcdFx0dGhpcy5fdXBkYXRlKHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykudGhlbigobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZShtZXNzYWdlKTtcblxuXHRcdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5faXNSZWFkeSA9IHRydWU7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3N1Y2Nlc3M6IGZ1bmN0aW9uKG1lc3NhZ2UpXG5cdHtcblx0XHRhbWlXZWJBcHAuc3VjY2VzcyhtZXNzYWdlLCB0cnVlKTtcblx0XHR0aGlzLl9jbGVhbigpO1xuXHR9LFxuXG5cdF9lcnJvcjogZnVuY3Rpb24obWVzc2FnZSlcblx0e1xuXHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR0aGlzLl9jbGVhbigpO1xuXHR9LFxuXG5cdF91bmxvY2s6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHR0aGlzLl9jbGVhbigpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2NsZWFuOiBmdW5jdGlvbigpXG5cdHtcblx0XHQkKCcjQjc4OTRDQzFfMURBQV80QTdFX0I3RDFfREJERjZGMDZBQzczJykudHJpZ2dlcigncmVzZXQnKTtcblx0XHQkKCcjRUUwNTVDRDRfRTU4Rl80ODM0XzgwMjBfOTg2QUUzRjhENjdEJykudHJpZ2dlcigncmVzZXQnKTtcblx0XHQkKCcjREEyMDQ3QTJfOUU1RF80MjBEX0I2RTdfRkEyNjFEMkVGMTBGJykudHJpZ2dlcigncmVzZXQnKTtcblx0XHQkKCcjRTkyQTEwOTdfOTgzQl80ODU3Xzg3NUZfMDdFNDY1OUI0MUIwJykudHJpZ2dlcigncmVzZXQnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF91cGRhdGU6IGZ1bmN0aW9uKHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVzZXIgPSB0aGlzLnVzZXIgPSB1c2VySW5mby5BTUlVc2VyIHx8ICcnO1xuXHRcdGNvbnN0IGd1ZXN0ID0gdGhpcy5ndWVzdCA9IHVzZXJJbmZvLmd1ZXN0VXNlciB8fCAnJztcblxuXHRcdGNvbnN0IG5vdEJlZm9yZSA9IHRoaXMubm90QmVmb3JlID0gdXNlckluZm8ubm90QmVmb3JlIHx8ICcnO1xuXHRcdGNvbnN0IG5vdEFmdGVyID0gdGhpcy5ub3RBZnRlciA9IHVzZXJJbmZvLm5vdEFmdGVyIHx8ICcnO1xuXG5cdFx0Y29uc3QgY2xpZW50RE5JblNlc3Npb24gPSB0aGlzLmNsaWVudEROID0gdXNlckluZm8uY2xpZW50RE5JblNlc3Npb24gfHwgJyc7XG5cdFx0Y29uc3QgaXNzdWVyRE5JblNlc3Npb24gPSB0aGlzLmlzc3VlckROID0gdXNlckluZm8uaXNzdWVyRE5JblNlc3Npb24gfHwgJyc7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQkKCcjQTA5QUUzMTZfNzA2OF80QkMxXzk2QTlfNkI4N0QyODg2M0ZFJykucHJvcCgnZGlzYWJsZWQnLCAhY2xpZW50RE5JblNlc3Npb24gfHwgIWlzc3VlckROSW5TZXNzaW9uKTtcblxuXHRcdCQoJyNDM0U5NEY2RF80OEUwXzg2QzBfMzUzNF82OTE3MjhFNDkyRjQnKS5hdHRyKCdzcmMnLCB1ZHBJbmZvLnRlcm1zQW5kQ29uZGl0aW9ucyB8fCBhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9kb2NzL3Rlcm1zX2FuZF9jb25kaXRpb25zLmh0bWwnKTtcblx0XHQkKCcjRTUwRkY4QkRfQjBGNV9DRDcyX0Y5RENfRkMyQkZBNURCQTI3JykuYXR0cignc3JjJywgdWRwSW5mby50ZXJtc0FuZENvbmRpdGlvbnMgfHwgYW1pV2ViQXBwLm9yaWdpblVSTCArICcvZG9jcy90ZXJtc19hbmRfY29uZGl0aW9ucy5odG1sJyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnVzZXJJbmZvID0gdXNlckluZm87XG5cdFx0dGhpcy5yb2xlSW5mbyA9IHJvbGVJbmZvO1xuXHRcdHRoaXMudWRwSW5mbyA9IHVkcEluZm87XG5cdFx0dGhpcy5zc29JbmZvID0gc3NvSW5mbztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRjcmVhdGVBY2NvdW50QWxsb3dlZDogdGhpcy5jcmVhdGVBY2NvdW50QWxsb3dlZCxcblx0XHRcdGNoYW5nZUluZm9BbGxvd2VkOiB0aGlzLmNoYW5nZUluZm9BbGxvd2VkLFxuXHRcdFx0Y2hhbmdlUGFzc3dvcmRBbGxvd2VkOiB0aGlzLmNoYW5nZVBhc3N3b3JkQWxsb3dlZCxcblx0XHRcdGNoYW5nZUNlcnRpZmljYXRlQWxsb3dlZDogdGhpcy5jaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWQsXG5cdFx0XHQvKiovXG5cdFx0XHRzc29fbGFiZWw6IHNzb0luZm8ubGFiZWwgfHwgJ1NTTycsXG5cdFx0XHRzc29fdXJsOiBzc29JbmZvLnVybCB8fCAnQE5VTEwnLFxuXHRcdH07XG5cblx0XHRpZih1c2VyICE9PSBndWVzdClcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEdFVCBJTkZPICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IHZhbGlkID0gdXNlckluZm8udmFsaWQgfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IGNlcnRFbmFibGVkID0gdXNlckluZm8uY2VydEVuYWJsZWQgfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IHZvbXNFbmFibGVkID0gdXNlckluZm8udm9tc0VuYWJsZWQgfHwgJ2ZhbHNlJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGZpcnN0TmFtZSA9IHVzZXJJbmZvLmZpcnN0TmFtZSB8fCAnJztcblx0XHRcdGNvbnN0IGxhc3ROYW1lID0gdXNlckluZm8ubGFzdE5hbWUgfHwgJyc7XG5cdFx0XHRjb25zdCBlbWFpbCA9IHVzZXJJbmZvLmVtYWlsIHx8ICcnO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgY2xpZW50RE5JbkFNSSA9IHVzZXJJbmZvLmNsaWVudEROSW5BTUkgfHwgJyc7XG5cdFx0XHRjb25zdCBpc3N1ZXJETkluQU1JID0gdXNlckluZm8uaXNzdWVyRE5JbkFNSSB8fCAnJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTRVQgSU5GTyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKCcjRTUxM0YyN0RfNTUyMV80QjA4X0JGNjFfNTJBRkI4MTM1NkY3JykudmFsKGZpcnN0TmFtZSk7XG5cdFx0XHQkKCcjQUZGMEI1QzBfQkVFQ180ODQyXzkxNkRfRENCQTdGNTg5MTk1JykudmFsKGxhc3ROYW1lKTtcblx0XHRcdCQoJyNDNTg3NDg2Ql82MkMwXzRCNkVfOTI4OF9EOEY5Rjg5RDE1N0InKS52YWwoZW1haWwpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCgnI0FCRUIwMjkxXzQwQjBfNDE0QV9BNDJCX0U3RUFCQjlCNDg3RScpLnZhbChmaXJzdE5hbWUpO1xuXHRcdFx0JCgnI0E1QUZEQjYyXzEwMzRfNEY2Nl9BM0U2XzkzNDFCMzFGQTI5MCcpLnZhbChsYXN0TmFtZSk7XG5cdFx0XHQkKCcjRDczMEE3NzRfMDVFQV80N0FCX0EwQzhfRDkyNzUzODAyRTNFJykudmFsKGVtYWlsKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQoJyNEMUJFRTNCRl85MTYxXzQxRENfQkM1M19DNDRGRkU0RDI1MjInKS52YWwoY2xpZW50RE5JbkFNSSk7XG5cdFx0XHQkKCcjQzc2ODA1RDdfMUU4Nl80MjMxXzkwNzFfMUQwNDc4MzQyM0JCJykudmFsKGNsaWVudEROSW5TZXNzaW9uKTtcblx0XHRcdCQoJyNGNDJGQUY2Ql8yQzhEXzQxNDJfOEJEOV9FNUJDRENBQTA1QUEnKS52YWwoaXNzdWVyRE5JbkFNSSk7XG5cdFx0XHQkKCcjRkUyRjYyMzJfQzI1Nl80QjgwXzkzOUNfRUJFQzkwMzIwMzA4JykudmFsKGlzc3VlckROSW5TZXNzaW9uKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGxldCB0YWJsZSA9IFtdO1xuXG5cdFx0XHRmb3IobGV0IHJvbGUgaW4gcm9sZUluZm8pXG5cdFx0XHR7XG5cdFx0XHRcdHRhYmxlLnB1c2goJzx0cj4nKTtcblx0XHRcdFx0dGFibGUucHVzaCgnPHRkPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChyb2xlSW5mb1tyb2xlXS5uYW1lIHx8ICdOL0EnKSArICc8L3RkPicpO1xuXHRcdFx0XHR0YWJsZS5wdXNoKCc8dGQ+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKHJvbGVJbmZvW3JvbGVdLmRlc2NyaXB0aW9uIHx8ICdOL0EnKSArICc8L3RkPicpO1xuXHRcdFx0XHR0YWJsZS5wdXNoKCc8L3RyPicpO1xuXHRcdFx0fVxuXG5cdFx0XHQkKCcjQkIwNzY3NkJfRUFDQV85QjQyX0VENTFfNDc3REIyOTc2MDQxJykuaHRtbCh0YWJsZS5qb2luKCcnKSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQ0hFQ0sgVVNFUiBTVEFUVVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGV0IGljb24gPSAnJztcblx0XHRcdGxldCBtZXNzYWdlID0gJyc7XG5cblx0XHRcdGlmKHZhbGlkICE9PSAnZmFsc2UnKVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBWQUxJRCBVU0VSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKGNlcnRFbmFibGVkICE9PSAnZmFsc2UnICYmIGNsaWVudEROSW5BTUkgJiYgaXNzdWVyRE5JbkFNSSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKCFjbGllbnRETkluU2Vzc2lvblxuXHRcdFx0XHRcdCAgIHx8XG5cdFx0XHRcdFx0ICAgIWlzc3VlckROSW5TZXNzaW9uXG5cdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0bWVzc2FnZSA9ICdJdCBpcyByZWNvbW1lbmRlZCB0byBhdXRoZW50aWNhdGUgd2l0aCBhIFguNTA5IGNlcnRpZmljYXRlLic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZihjbGllbnRETkluQU1JICE9PSBjbGllbnRETkluU2Vzc2lvblxuXHRcdFx0XHRcdFx0ICAgfHxcblx0XHRcdFx0XHRcdCAgIGlzc3VlckROSW5BTUkgIT09IGlzc3VlckROSW5TZXNzaW9uXG5cdFx0XHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0XHRcdG1lc3NhZ2UgPSAnVGhlIFguNTA5IGNlcnRpZmljYXRlIGluIHRoZSBzZXNzaW9uIGRpZmZlcnMgZnJvbSB0aGUgb25lIGluIEFNSS4nO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYobWVzc2FnZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCQoJyNEOTQ0QjAxRF8yRThEXzRFRTlfOURDQ18yNjkxNDM4QkJBMTYnKS5odG1sKCc8aSBjbGFzcz1cImZhIGZhLWluZm8tY2lyY2xlIHRleHQtd2FybmluZ1wiPjwvaT4gJyArIG1lc3NhZ2UpO1xuXG5cdFx0XHRcdFx0aWNvbiA9ICc8YSBjbGFzcz1cIm5hdi1saW5rIHRleHQtd2FybmluZ1wiIGhyZWY9XCJqYXZhc2NyaXB0OmFtaUxvZ2luLmFjY291bnRTdGF0dXMoKTtcIj4nXG5cdFx0XHRcdFx0ICAgICAgICtcblx0XHRcdFx0XHQgICAgICAgJzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGVcIj48L2k+J1xuXHRcdFx0XHRcdCAgICAgICArXG5cdFx0XHRcdFx0ICAgICAgICc8L2E+J1xuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0YzRkY5RjQzX0RFNzJfNDBCQl9CMUJBX0I3QjNDOTAwMjY3MScpLmNsb3Nlc3QoJy5yb3VuZGVkJykuY3NzKCdiYWNrZ3JvdW5kJywgJyNCOEQ0OUIgdXJsKFwiJyArIGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2ltYWdlcy9jZXJ0aWZpY2F0ZS1ncmVlbi5wbmdcIikgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXInKVxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ2JhY2tncm91bmQtc2l6ZScsICdjb3ZlcicpXG5cdFx0XHRcdDtcblxuXHRcdFx0XHQkKCcjRjNGRjlGNDNfREU3Ml80MEJCX0IxQkFfQjdCM0M5MDAyNjcxJykuY3NzKCdjb2xvcicsICcjMDA2NDAwJylcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtbGVhZlwiPjwvaT4gdmFsaWQgPGkgY2xhc3M9XCJmYSBmYS1sZWFmXCI+PC9pPicpXG5cdFx0XHRcdDtcblxuXHRcdFx0XHQkKCcjRTkxMjgwRjZfRTdDNl8zRTUzX0E0NTdfNjQ2OTk1Qzk5MzE3JykudGV4dChub3RCZWZvcmUgKyAnIC0gJyArIG5vdEFmdGVyKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBJTlZBTElEIFVTRVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKHZvbXNFbmFibGVkICE9PSAnZmFsc2UnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoIWNsaWVudEROSW5BTUlcblx0XHRcdFx0XHQgICB8fFxuXHRcdFx0XHRcdCAgICFpc3N1ZXJETkluQU1JXG5cdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0bWVzc2FnZSA9ICdSZWdpc3RlciBhIHZhbGlkIFguNTA5IGNlcnRpZmljYXRlLic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRtZXNzYWdlID0gJ0NoZWNrIHlvdXIgdmlydHVhbCBvcmdhbml6YXRpb24gcm9sZXMuJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bWVzc2FnZSA9ICdVbmV4cGVjdGVkIGlzc3VlLCBjb250YWN0IHRoZSBBTUkgdGVhbS4nO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihtZXNzYWdlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgnI0Q5NDRCMDFEXzJFOERfNEVFOV85RENDXzI2OTE0MzhCQkExNicpLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGUgdGV4dC1kYW5nZXJcIj48L2k+ICcgKyBtZXNzYWdlKTtcblxuXHRcdFx0XHRcdGljb24gPSAnPGEgY2xhc3M9XCJuYXYtbGluayB0ZXh0LWRhbmdlclwiIGhyZWY9XCJqYXZhc2NyaXB0OmFtaUxvZ2luLmFjY291bnRTdGF0dXMoKTtcIj4nXG5cdFx0XHRcdFx0ICAgICAgICtcblx0XHRcdFx0XHQgICAgICAgJzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGVcIj48L2k+J1xuXHRcdFx0XHRcdCAgICAgICArXG5cdFx0XHRcdFx0ICAgICAgICc8L2E+J1xuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0YzRkY5RjQzX0RFNzJfNDBCQl9CMUJBX0I3QjNDOTAwMjY3MScpLmNsb3Nlc3QoJy5yb3VuZGVkJykuY3NzKCdiYWNrZ3JvdW5kJywgJyNFOEM4Q0YgdXJsKFwiJyArIGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2ltYWdlcy9jZXJ0aWZpY2F0ZS1waW5rLnBuZ1wiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlcicpXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnYmFja2dyb3VuZC1zaXplJywgJ2NvdmVyJylcblx0XHRcdFx0O1xuXG5cdFx0XHRcdCQoJyNGM0ZGOUY0M19ERTcyXzQwQkJfQjFCQV9CN0IzQzkwMDI2NzEnKS5jc3MoJ2NvbG9yJywgJyM4QjAwMDAnKVxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1sZWFmXCI+PC9pPiBpbnZhbGlkIDxpIGNsYXNzPVwiZmEgZmEtbGVhZlwiPjwvaT4nKVxuXHRcdFx0XHQ7XG5cblx0XHRcdFx0JCgnI0U5MTI4MEY2X0U3QzZfM0U1M19BNDU3XzY0Njk5NUM5OTMxNycpLnRleHQobm90QmVmb3JlICsgJyAtICcgKyBub3RBZnRlcik7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBVUERBVEUgUVJDT0RFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKCcjRUM5NDgwODRfOEMwQV9DRUJGXzU4QzlfMDg2MDQ2QUIyNDU2JykucXJjb2RlKHtcblx0XHRcdFx0cmVuZGVyOiAnY2FudmFzJyxcblx0XHRcdFx0ZWNMZXZlbDogJ0gnLFxuXHRcdFx0XHRzaXplOiAxNTAsXG5cdFx0XHRcdGZpbGw6ICdyZ2JhKDAwMCwgMTAwLCAwMDAsIDEuMCknLFxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAncmdiYSgxODQsIDIxMiwgMTU1LCAxLjApJyxcblx0XHRcdFx0dGV4dDogdXNlciArICd8JyArIGZpcnN0TmFtZSArICcgJyArIGxhc3ROYW1lICsgJ3wnICsgZW1haWwgKyAnfCcgKyBjbGllbnRETkluQU1JICsgJ3wnICsgaXNzdWVyRE5JbkFNSSxcblx0XHRcdFx0cmFkaXVzOiAwLFxuXHRcdFx0XHRxdWlldDogMSxcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFVQREFURSBNRU5VIEJBUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGRpY3RbJ3VzZXInXSA9IHVzZXI7XG5cdFx0XHRkaWN0WydpY29uJ10gPSBpY29uO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX2xvZ2luX21lbnVfY29udGVudCcsIHRoaXMuZnJhZ21lbnRMb2dvdXRCdXR0b24sIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnRyaWdnZXJMb2dpbigpLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX2xvZ2luX21lbnVfY29udGVudCcsIHRoaXMuZnJhZ21lbnRMb2dpbkJ1dHRvbiwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudHJpZ2dlckxvZ291dCgpLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FVEhPRFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIHVzZXIgaW5mb3JtYXRpb25cblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBjdXJyZW50IHVzZXIgaW5mb3JtYXRpb25cblx0ICAqL1xuXG5cdGdldFVzZXJJbmZvOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy51c2VySW5mbztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgcm9sZSBpbmZvcm1hdGlvblxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGN1cnJlbnQgcm9sZSBpbmZvcm1hdGlvblxuXHQgICovXG5cblx0Z2V0Um9sZUluZm86IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnJvbGVJbmZvO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSB1c2VyIGRhdGEgcHJvdGVjdGlvbiBpbmZvcm1hdGlvblxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGN1cnJlbnQgdXNlciBkYXRhIHByb3RlY3Rpb24gaW5mb3JtYXRpb25cblx0ICAqL1xuXG5cdGdldFVQREluZm86IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnVkcEluZm87XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIHNpbmdsZSBzaWduIG9uIGluZm9ybWF0aW9uXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgY3VycmVudCBzaW5nbGUgc2lnbiBvbiBpbmZvcm1hdGlvblxuXHQgICovXG5cblx0Z2V0U1NPSW5mbzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuc3NvSW5mbztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgY3VycmVudCB1c2VyXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgY3VycmVudCB1c2VyXG5cdCAgKi9cblxuXHRnZXRVc2VyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy51c2VyO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBndWVzdCB1c2VyXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZ3Vlc3QgdXNlclxuXHQgICovXG5cblx0Z2V0R3Vlc3Q6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmd1ZXN0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBjbGllbnQgRE5cblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBjbGllbnQgRE5cblx0ICAqL1xuXG5cdGdldENsaWVudEROOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5jbGllbnRETjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgaXNzdWVyIEROXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgaXNzdWVyIEROXG5cdCAgKi9cblxuXHRnZXRJc3N1ZXJETjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNzdWVyRE47XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENoZWNrcyB3aGV0aGVyIHRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWRcblx0ICAqIEByZXR1cm5zIHtCb29sZWFufVxuXHQgICovXG5cblx0aXNBdXRoZW50aWNhdGVkOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy51c2VyICE9PSB0aGlzLmd1ZXN0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDaGVja3Mgd2hldGhlciB0aGUgdXNlciBoYXMgdGhlIGdpdmVuIHJvbGVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSByb2xlIHRoZSByb2xlXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGhhc1JvbGU6IGZ1bmN0aW9uKHJvbGVOYW1lKVxuXHR7XG5cdFx0cmV0dXJuIHJvbGVOYW1lIGluIHRoaXMucm9sZUluZm87XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnU1NPJyBtb2RhbCB3aW5kb3dcblx0ICAqL1xuXG5cdHNzbzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblxuXHRcdHdpbmRvdy5vcGVuKHRoaXMuc3NvSW5mby51cmwsICdTaW5nbGUgU2lnbi1PbicsICdtZW51YmFyPW5vLCBzdGF0dXM9bm8sIHNjcm9sbGJhcnM9bm8sIHdpZHRoPTgwMCwgaGVpZ2h0PTQ1MCcpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBPcGVucyB0aGUgJ1NpZ25JbicgbW9kYWwgd2luZG93XG5cdCAgKi9cblxuXHRzaWduSW46IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuX2NsZWFuKCk7XG5cblx0XHQkKCcjRDJCNUZBREVfOTdBM180QjhDXzg1NjFfN0E5QUVBQ0RCRTVCJykubW9kYWwoJ3Nob3cnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogT3BlbnMgdGhlICdDaGFuZ2UgSW5mbycgbW9kYWwgd2luZG93XG5cdCAgKi9cblxuXHRjaGFuZ2VJbmZvOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jbGVhbigpO1xuXG5cdFx0JCgnI0Q5RUFGOTk4X0VEOEVfNDREMl9BMEJFXzhDNUNGNUU0MzhCRCcpLm1vZGFsKCdzaG93Jyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnQ2hhbmdlIFBhc3N3b3JkJyBtb2RhbCB3aW5kb3dcblx0ICAqL1xuXG5cdGNoYW5nZVBhc3M6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuX2NsZWFuKCk7XG5cblx0XHQkKCcjRTkyQTEwOTdfOTgzQl80ODU3Xzg3NUZfMDdFNDY1OUI0MUIwJykubW9kYWwoJ3Nob3cnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogT3BlbnMgdGhlICdBY2NvdW50IFN0YXR1cycgbW9kYWwgd2luZG93XG5cdCAgKi9cblxuXHRhY2NvdW50U3RhdHVzOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jbGVhbigpO1xuXG5cdFx0JCgnI0FCMUNCMTgzXzk2RUJfNDExNl84QTlFXzQ0MDlCRTA1OEYzNCcpLm1vZGFsKCdzaG93Jyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFNpZ25zIG91dFxuXHQgICovXG5cblx0c2lnbk91dDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdHJldHVybiBhbWlDb21tYW5kLmxvZ291dCgpLmFsd2F5cygoZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKSA9PiB7XG5cblx0XHRcdHRoaXMuX3VwZGF0ZSh1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuX3VubG9jaygpO1xuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2xvZ2luOiBmdW5jdGlvbihlKVxuXHR7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gJChlLnRhcmdldCkuc2VyaWFsaXplT2JqZWN0KCk7XG5cblx0XHRyZXR1cm4gdGhpcy5mb3JtX2xvZ2luMih2YWx1ZXNbJ3VzZXInXSwgdmFsdWVzWydwYXNzJ10pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9sb2dpbjI6IGZ1bmN0aW9uKHVzZXIsIHBhc3MpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBwcm9taXNlID0gKHVzZXIgJiYgcGFzcykgPyBhbWlDb21tYW5kLnBhc3NMb2dpbih1c2VyLnRyaW0oKSwgcGFzcy50cmltKCkpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYW1pQ29tbWFuZC5jZXJ0TG9naW4oLyotLS0tLS0tLS0tLS0tLS0tLS0tLSovKVxuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRwcm9taXNlLnRoZW4oKGRhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykgPT4ge1xuXG5cdFx0XHR0aGlzLl91cGRhdGUodXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRpZih1c2VySW5mby5BTUlVc2VyICE9PSB1c2VySW5mby5ndWVzdFVzZXIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkKCcjRDJCNUZBREVfOTdBM180QjhDXzg1NjFfN0E5QUVBQ0RCRTVCJykubW9kYWwoJ2hpZGUnKTtcblxuXHRcdFx0XHRcdHRoaXMuX3VubG9jaygpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0aWYodXNlckluZm8uQU1JVXNlciAhPT0gdXNlckluZm8uZ3Vlc3RVc2VyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgnI0QyQjVGQURFXzk3QTNfNEI4Q184NTYxXzdBOUFFQUNEQkU1QicpLm1vZGFsKCdoaWRlJyk7XG5cblx0XHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmKHVzZXJJbmZvLkFNSVVzZXIgPT09IHVzZXJJbmZvLmd1ZXN0VXNlcilcblx0XHRcdHtcblx0XHRcdFx0bGV0IG1lc3NhZ2UgPSAnQXV0aGVudGljYXRpb24gZmFpbGVkLic7XG5cblx0XHRcdFx0aWYodXNlckluZm8uY2xpZW50RE5JblNlc3Npb24gfHwgdXNlckluZm8uaXNzdWVyRE5JblNlc3Npb24pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtZXNzYWdlICs9ICcgQ2xpZW50IEROIGluIHNlc3Npb246ICcgKyBhbWlXZWJBcHAudGV4dFRvSHRtbCh1c2VySW5mby5jbGllbnRETkluU2Vzc2lvbikgKyAnLidcblx0XHRcdFx0XHQgICAgICAgICAgICtcblx0XHRcdFx0XHQgICAgICAgICAgICcgSXNzdWVyIEROIGluIHNlc3Npb246ICcgKyBhbWlXZWJBcHAudGV4dFRvSHRtbCh1c2VySW5mby5pc3N1ZXJETkluU2Vzc2lvbikgKyAnLidcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdH1cblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pID0+IHtcblxuXHRcdFx0dGhpcy5fdXBkYXRlKHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykuYWx3YXlzKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9hdHRhY2hDZXJ0OiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1c2VyID0gJCgnI0U2NEYyNEIyXzMzRTZfNERFRF85QjI0XzI4QkUwNDIxOTYxMycpLnZhbCgpO1xuXHRcdGNvbnN0IHBhc3MgPSAkKCcjQTRERkQwMzlfMDM0Rl80RDEwXzk2NjhfMzg1QUVGNEZCQkI5JykudmFsKCk7XG5cblx0XHRpZighdXNlciB8fCAhcGFzcylcblx0XHR7XG5cdFx0XHR0aGlzLl9lcnJvcignUGxlYXNlLCBmaWxsIGFsbCBmaWVsZHMgd2l0aCBhIHJlZCBzdGFyLicpO1xuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdGFtaUNvbW1hbmQuYXR0YWNoQ2VydCh1c2VyLCBwYXNzKS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX3N1Y2Nlc3MobWVzc2FnZSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fZGV0YWNoQ2VydDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdXNlciA9ICQoJyNFNjRGMjRCMl8zM0U2XzRERURfOUIyNF8yOEJFMDQyMTk2MTMnKS52YWwoKTtcblx0XHRjb25zdCBwYXNzID0gJCgnI0E0REZEMDM5XzAzNEZfNEQxMF85NjY4XzM4NUFFRjRGQkJCOScpLnZhbCgpO1xuXG5cdFx0aWYoIXVzZXIgfHwgIXBhc3MpXG5cdFx0e1xuXHRcdFx0dGhpcy5fZXJyb3IoJ1BsZWFzZSwgZmlsbCBhbGwgZmllbGRzIHdpdGggYSByZWQgc3Rhci4nKTtcblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmRldGFjaENlcnQodXNlciwgcGFzcykudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2FkZFVzZXI6IGZ1bmN0aW9uKGUpXG5cdHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB2YWx1ZXMgPSAkKGUudGFyZ2V0KS5zZXJpYWxpemVPYmplY3QoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmFkZFVzZXIodmFsdWVzWydsb2dpbiddLCB2YWx1ZXNbJ3Bhc3MnXSwgdmFsdWVzWydmaXJzdF9uYW1lJ10sIHZhbHVlc1snbGFzdF9uYW1lJ10sIHZhbHVlc1snZW1haWwnXSwgJ2F0dGFjaCcgaW4gdmFsdWVzLCAnYWdyZWUnIGluIHZhbHVlcykudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX3JlbWluZFBhc3M6IGZ1bmN0aW9uKGUpXG5cdHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB2YWx1ZXMgPSAkKGUudGFyZ2V0KS5zZXJpYWxpemVPYmplY3QoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLnJlc2V0UGFzcyh2YWx1ZXNbJ3VzZXInXSkudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2NoYW5nZUluZm86IGZ1bmN0aW9uKGUpXG5cdHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB2YWx1ZXMgPSAkKGUudGFyZ2V0KS5zZXJpYWxpemVPYmplY3QoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmNoYW5nZUluZm8odmFsdWVzWydmaXJzdF9uYW1lJ10sIHZhbHVlc1snbGFzdF9uYW1lJ10sIHZhbHVlc1snZW1haWwnXSkudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2NoYW5nZVBhc3M6IGZ1bmN0aW9uKGUpXG5cdHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB2YWx1ZXMgPSAkKGUudGFyZ2V0KS5zZXJpYWxpemVPYmplY3QoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmNoYW5nZVBhc3ModGhpcy51c2VyLCB2YWx1ZXNbJ29sZF9wYXNzJ10sIHZhbHVlc1snbmV3X3Bhc3MnXSkudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qIVxuICogQU1JIFdlYiBGcmFtZXdvcmsgLSBBTUlEb2MuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAyMCBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qIGVzbGludC1kaXNhYmxlICovXG5cbmNvbnN0IGFtaURvYyA9IHtcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCIkQU1JTmFtZXNwYWNlXCIsXCJkZXNjXCI6XCJDcmVhdGUgYSBuZXcgbmFtZXNwYWNlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiJG5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIG5hbWVzcGFjZSBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiJGRlc2NyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBuYW1lc3BhY2UgYm9keVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwiJEFNSUludGVyZmFjZVwiLFwiZGVzY1wiOlwiQ3JlYXRlIGEgbmV3IGludGVyZmFjZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIiRuYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBpbnRlcmZhY2UgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIiRkZXNjclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgaW50ZXJmYWNlIGJvZHlcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIiRBTUlDbGFzc1wiLFwiZGVzY1wiOlwiQ3JlYXRlIGEgbmV3IGNsYXNzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiJG5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGNsYXNzIG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCIkZGVzY3JcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIGNsYXNzIGJvZHlcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19XSxcIm5hbWVzcGFjZXNcIjpbe1wibmFtZVwiOlwiYW1pUm91dGVyXCIsXCJkZXNjXCI6XCJUaGUgQU1JIHVybCByb3V0aW5nIHN1YnN5c3RlbVwiLFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcImdldFNjcmlwdFVSTFwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgQVdGJ3Mgc2NyaXB0IFVSTFwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIEFXRidzIHNjcmlwdCBVUkxcIn1dfSx7XCJuYW1lXCI6XCJnZXRPcmlnaW5VUkxcIixcImRlc2NcIjpcIkdldHMgdGhlIG9yaWdpbiBVUkxcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBvcmlnaW4gVVJMXCJ9XX0se1wibmFtZVwiOlwiZ2V0V2ViQXBwVVJMXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSB3ZWJhcHAgVVJMXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgd2ViYXBwIFVSTFwifV19LHtcIm5hbWVcIjpcImdldEhhc2hcIixcImRlc2NcIjpcIkdldHMgdGhlIGFuY2hvciBwYXJ0IG9mIHRoZSB3ZWJhcHAgVVJMXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgYW5jaG9yIHBhcnQgb2YgdGhlIHdlYmFwcCBVUkxcIn1dfSx7XCJuYW1lXCI6XCJnZXRBcmdzXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBhcmd1bWVudHMgZXh0cmFjdGVkIGZyb20gdGhlIHdlYmFwcCBVUkxcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJBcnJheS48U3RyaW5nPlwiLFwiZGVzY1wiOlwiVGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFwifV19LHtcIm5hbWVcIjpcImFwcGVuZFwiLFwiZGVzY1wiOlwiQXBwZW5kcyBhIHJvdXRpbmcgcnVsZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInJlZ0V4cFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcmVnRXhwXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiaGFuZGxlclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgaGFuZGxlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiTmFtZXNwYWNlXCIsXCJkZXNjXCI6XCJUaGUgYW1pUm91dGVyIHNpbmdsZXRvblwifV19LHtcIm5hbWVcIjpcInJlbW92ZVwiLFwiZGVzY1wiOlwiUmVtb3ZlcyBzb21lIHJvdXRpbmcgcnVsZXNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJyZWdFeHBcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHJlZ0V4cFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiTmFtZXNwYWNlXCIsXCJkZXNjXCI6XCJUaGUgYW1pUm91dGVyIHNpbmdsZXRvblwifV19LHtcIm5hbWVcIjpcImNoZWNrXCIsXCJkZXNjXCI6XCJDaGVja3Mgd2hldGhlciB0aGUgVVJMIG1hdGNoZXMgd2l0aCBhIHJvdXRpbmcgcnVsZVwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19LHtcIm5hbWVcIjpcImFwcGVuZEhpc3RvcnlFbnRyeVwiLFwiZGVzY1wiOlwiQXBwZW5kIGEgbmV3IGhpc3RvcnkgZW50cnlcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXRoXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBuZXcgcGF0aFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRleHRcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIG5ldyBjb250ZXh0XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJyZXBsYWNlSGlzdG9yeUVudHJ5XCIsXCJkZXNjXCI6XCJSZXBsYWNlIHRoZSBjdXJyZW50IGhpc3RvcnkgZW50cnlcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXRoXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBuZXcgcGF0aFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRleHRcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIG5ldyBjb250ZXh0XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfV19LHtcIm5hbWVcIjpcImFtaVdlYkFwcFwiLFwiZGVzY1wiOlwiVGhlIEFNSSB3ZWJhcHAgc3Vic3lzdGVtXCIsXCJ2YXJpYWJsZXNcIjpbe1wibmFtZVwiOlwib3JpZ2luVVJMXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBvcmlnaW4gVVJMXCJ9LHtcIm5hbWVcIjpcIndlYkFwcFVSTFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgd2ViYXBwIFVSTFwifSx7XCJuYW1lXCI6XCJoYXNoXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBhbmNob3IgcGFydCBvZiB0aGUgd2ViYXBwIFVSTFwifSx7XCJuYW1lXCI6XCJhcmdzXCIsXCJ0eXBlXCI6XCJBcnJheS48U3RyaW5nPlwiLFwiZGVzY1wiOlwiVGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFwifV0sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwiaXNFbWJlZGRlZFwiLFwiZGVzY1wiOlwiQ2hlY2tzIHdoZXRoZXIgdGhlIFdlYkFwcCBpcyBleGVjdXRlZCBpbiBlbWJlZGRlZCBtb2RlXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX0se1wibmFtZVwiOlwiaXNMb2NhbFwiLFwiZGVzY1wiOlwiQ2hlY2tzIHdoZXRoZXIgdGhlIFdlYkFwcCBpcyBleGVjdXRlZCBsb2NhbGx5IChmaWxlOi8vLCBsb2NhbGhvc3QsIDEyNy4wLjAuMSBvciA6OjEpXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX0se1wibmFtZVwiOlwidGV4dFRvSHRtbFwiLFwiZGVzY1wiOlwiRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBIVE1MXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1bmVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBlc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcImh0bWxUb1RleHRcIixcImRlc2NcIjpcIlVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSFRNTCB0byB0ZXh0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgdW5lc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcInRleHRUb1N0cmluZ1wiLFwiZGVzY1wiOlwiRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBKYXZhU2NyaXB0IHN0cmluZ1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdW5lc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJzdHJpbmdUb1RleHRcIixcImRlc2NcIjpcIlVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSmF2YVNjcmlwdCBzdHJpbmcgdG8gdGV4dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHVuZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJodG1sVG9TdHJpbmdcIixcImRlc2NcIjpcIkVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEhUTUwgdG8gSmF2YVNjcmlwdCBzdHJpbmdcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVuZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwic3RyaW5nVG9IdG1sXCIsXCJkZXNjXCI6XCJVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEphdmFTY3JpcHQgc3RyaW5nIHRvIEhUTUxcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSB1bmVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwidGV4dFRvU1FMXCIsXCJkZXNjXCI6XCJFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIFNRTFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdW5lc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJzcWxUb1RleHRcIixcImRlc2NcIjpcIlVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gU1FMIHRvIHRleHRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSB1bmVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwiYmFzZTY0RW5jb2RlXCIsXCJkZXNjXCI6XCJFbmNvZGVzIChSRkMgNDY0OCkgYSBzdHJpbmdcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGRlY29kZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBlbmNvZGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcImJhc2U2NERlY29kZVwiLFwiZGVzY1wiOlwiRGVjb2RlcyAoUkZDIDQ2NDgpIGEgc3RyaW5nXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlbmNvZGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZGVjb2RlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJsb2FkUmVzb3VyY2VzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyByZXNvdXJjZXMgYnkgZXh0ZW5zaW9uXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkU2hlZXRzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBDU1Mgc2hlZXRzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkU2NyaXB0c1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgSlMgc2NyaXB0c1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZEpTT05zXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBKU09OIGZpbGVzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkWE1Mc1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgWE1MIGZpbGVzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkSFRNTHNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIEhUTUwgZmlsZXNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRUV0lHc1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgVFdJRyBmaWxlc1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFRleHRzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyB0ZXh0IGZpbGVzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJyZXBsYWNlSFRNTFwiLFwiZGVzY1wiOlwiUHV0cyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBzdWZmaXgsIGRpY3QsIHR3aWdzKVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwicHJlcGVuZEhUTUxcIixcImRlc2NcIjpcIlByZXBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIHN1ZmZpeCwgZGljdCwgdHdpZ3MpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJhcHBlbmRIVE1MXCIsXCJkZXNjXCI6XCJBcHBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIHN1ZmZpeCwgZGljdCwgdHdpZ3MpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJmb3JtYXRUV0lHXCIsXCJkZXNjXCI6XCJJbnRlcnByZXRlcyB0aGUgZ2l2ZW4gVFdJRyBzdHJpbmcsIHNlZSB7QGxpbmsgaHR0cDovL3R3aWcuc2Vuc2lvbGFicy5vcmcvZG9jdW1lbnRhdGlvbn1cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImRpY3RcIixcInR5cGVcIjpbXCJPYmplY3RcIixcIkFycmF5XCJdLFwiZGVzY1wiOlwidGhlIGRpY3Rpb25hcnlcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIGZyYWdtZW50c1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgSW50ZXJwcmV0ZWQgVFdJRyBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJqc3BhdGhcIixcImRlc2NcIjpcIkZpbmRzIGRhdGEgd2l0aGluIHRoZSBnaXZlbiBKU09OLCBzZWUge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9kZmlsYXRvdi9qc3BhdGh9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGF0aFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcGF0aFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImpzb25cIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIEpTT05cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkFycmF5XCIsXCJkZXNjXCI6XCJUaGUgcmVzdWx0aW5nIGFycmF5XCJ9XX0se1wibmFtZVwiOlwibG9ja1wiLFwiZGVzY1wiOlwiTG9ja3MgdGhlIFdlYiBhcHBsaWNhdGlvblwiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcInVubG9ja1wiLFwiZGVzY1wiOlwiVW5sb2NrcyB0aGUgV2ViIGFwcGxpY2F0aW9uXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwibW9kYWxMZWF2ZVwiLFwiZGVzY1wiOlwiTGVhdmUgdGhlIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcIm1vZGFsRW50ZXJcIixcImRlc2NcIjpcIkVudGVyIHRoZSBtb2RhbCB3aW5kb3dcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJjYW5MZWF2ZVwiLFwiZGVzY1wiOlwiRW5hYmxlcyB0aGUgbWVzc2FnZSBpbiBhIGNvbmZpcm1hdGlvbiBkaWFsb2cgYm94IHRvIGluZm9ybSB0aGF0IHRoZSB1c2VyIGlzIGFib3V0IHRvIGxlYXZlIHRoZSBjdXJyZW50IHBhZ2UuXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiY2Fubm90TGVhdmVcIixcImRlc2NcIjpcIkRpc2FibGVzIHRoZSBtZXNzYWdlIGluIGEgY29uZmlybWF0aW9uIGRpYWxvZyBib3ggdG8gaW5mb3JtIHRoYXQgdGhlIHVzZXIgaXMgYWJvdXQgdG8gbGVhdmUgdGhlIGN1cnJlbnQgcGFnZS5cIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJpbmZvXCIsXCJkZXNjXCI6XCJTaG93cyBhbiAnaW5mbycgbWVzc2FnZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIm1lc3NhZ2VcIixcInR5cGVcIjpbXCJTdHJpbmdcIixcIkFycmF5XCJdLFwiZGVzY1wiOlwidGhlIG1lc3NhZ2VcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJmYWRlT3V0XCIsXCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJpZiBUcnVlLCB0aGUgbWVzc2FnZSBkaXNhcHBlYXJzIGFmdGVyIDYwc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwic3VjY2Vzc1wiLFwiZGVzY1wiOlwiU2hvd3MgYSAnc3VjY2VzcycgbWVzc2FnZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIm1lc3NhZ2VcIixcInR5cGVcIjpbXCJTdHJpbmdcIixcIkFycmF5XCJdLFwiZGVzY1wiOlwidGhlIG1lc3NhZ2VcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJmYWRlT3V0XCIsXCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJpZiBUcnVlLCB0aGUgbWVzc2FnZSBkaXNhcHBlYXJzIGFmdGVyIDYwc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwid2FybmluZ1wiLFwiZGVzY1wiOlwiU2hvd3MgYSAnd2FybmluZycgbWVzc2FnZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIm1lc3NhZ2VcIixcInR5cGVcIjpbXCJTdHJpbmdcIixcIkFycmF5XCJdLFwiZGVzY1wiOlwidGhlIG1lc3NhZ2VcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJmYWRlT3V0XCIsXCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJpZiBUcnVlLCB0aGUgbWVzc2FnZSBkaXNhcHBlYXJzIGFmdGVyIDYwc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwiZXJyb3JcIixcImRlc2NcIjpcIlNob3dzIGFuICdlcnJvcicgbWVzc2FnZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIm1lc3NhZ2VcIixcInR5cGVcIjpbXCJTdHJpbmdcIixcIkFycmF5XCJdLFwiZGVzY1wiOlwidGhlIG1lc3NhZ2VcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJmYWRlT3V0XCIsXCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJpZiBUcnVlLCB0aGUgbWVzc2FnZSBkaXNhcHBlYXJzIGFmdGVyIDYwc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwiZmx1c2hcIixcImRlc2NcIjpcIkZsdXNoZXMgbWVzc2FnZXNcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJmaWxsQnJlYWRjcnVtYlwiLFwiZGVzY1wiOlwiRmlsbCB0aGUgbWFpbiBicmVhZGNydW1iXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiaXRlbXNcIixcInR5cGVcIjpcIkFycmF5XCIsXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgaXRlbXMgKEhUTUwgZm9ybWF0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwic3RhcnRcIixcImRlc2NcIjpcIlN0YXJ0cyB0aGUgV2ViIGFwcGxpY2F0aW9uXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAobG9nb191cmwsIGhvbWVfdXJsLCBjb250YWN0X2VtYWlsLCBhYm91dF91cmwsIHRoZW1lX3VybCwgbG9ja2VyX3VybCwgcGFzc3dvcmRfYXV0aGVudGljYXRpb25fYWxsb3dlZCwgY2VydGlmaWNhdGVfYXV0aGVudGljYXRpb25fYWxsb3dlZCwgY3JlYXRlX2FjY291bnRfYWxsb3dlZCwgY2hhbmdlX2luZm9fYWxsb3dlZCwgY2hhbmdlX3Bhc3N3b3JkX2FsbG93ZWQsIGNoYW5nZV9jZXJ0aWZpY2F0ZV9hbGxvd2VkKVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwibG9hZENvbnRyb2xcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIGEgY29udHJvbFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcImNvbnRyb2xcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIGNvbnRyb2wgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjcmVhdGVDb250cm9sXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGFyZW50XCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIm93bmVyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRyb2xcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFyYW1zXCIsXCJ0eXBlXCI6XCJBcnJheVwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNyZWF0ZUNvbnRyb2xJbkJvZHlcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gdGhlIGJvZHlcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXJlbnRcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwib3duZXJcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udHJvbFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXJhbXNXaXRob3V0U2V0dGluZ3NcIixcInR5cGVcIjpcIkFycmF5XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250cm9sU2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFyZW50U2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lclwiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbCBpbiBhIGNvbnRhaW5lclwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhcmVudFwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJvd25lclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250cm9sXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhcmFtc1dpdGhvdXRTZXR0aW5nc1wiLFwidHlwZVwiOlwiQXJyYXlcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRyb2xTZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXJlbnRTZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJpY29uXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInRpdGxlXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjcmVhdGVDb250cm9sRnJvbVdlYkxpbmtcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gYSBjb250YWluZXIgZnJvbSBhIFdFQiBsaW5rXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGFyZW50XCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIm93bmVyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImVsXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhcmVudFNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkU3ViQXBwXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBhIHN1YmFwcFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN1YmFwcFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgc3ViYXBwXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInRoZSB1c2VyIGRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFN1YkFwcEJ5VVJMXCIsXCJkZXNjXCI6XCJMb2FkcyBhIHN1YmFwcCBieSBVUkxcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJkZWZhdWx0U3ViQXBwXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcImlmICdhbWlXZWJBcHAuYXJnc1tcXFwic3ViYXBwXFxcIl0nIGlzIG51bGwsIHRoZSBkZWZhdWx0IHN1YmFwcFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImRlZmF1bHRVc2VyRGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwiaWYgJ2FtaVdlYkFwcC5hcmdzW1xcXCJ1c2VyZGF0YVxcXCJdJyBpcyBudWxsLCB0aGUgZGVmYXVsdCB1c2VyIGRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19XSxcImV2ZW50c1wiOlt7XCJuYW1lXCI6XCJvblJlYWR5XCIsXCJkZXNjXCI6XCJUaGlzIG1ldGhvZCBtdXN0IGJlIG92ZXJsb2FkZWQgYW5kIGlzIGNhbGxlZCB3aGVuIHRoZSBXZWIgYXBwbGljYXRpb24gc3RhcnRzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlckRhdGFcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvblJlZnJlc2hcIixcImRlc2NcIjpcIlRoaXMgbWV0aG9kIG11c3QgYmUgb3ZlcmxvYWRlZCBhbmQgaXMgY2FsbGVkIHdoZW4gdGhlIHRvb2xiYXIgbmVlZHMgdG8gYmUgdXBkYXRlZFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcImlzQXV0aFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfV19LHtcIm5hbWVcIjpcImFtaUNvbW1hbmRcIixcImRlc2NcIjpcIlRoZSBBTUkgY29tbWFuZCBzdWJzeXN0ZW1cIixcInZhcmlhYmxlc1wiOlt7XCJuYW1lXCI6XCJlbmRwb2ludFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJEZWZhdWx0IGVuZHBvaW50XCJ9LHtcIm5hbWVcIjpcImNvbnZlcnRlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJEZWZhdWx0IGNvbnZlcnRlclwifV0sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwiZXhlY3V0ZVwiLFwiZGVzY1wiOlwiRXhlY3V0ZXMgYW4gQU1JIGNvbW1hbmRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJjb21tYW5kXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBjb21tYW5kXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZW5kcG9pbnQsIGNvbnZlcnRlciwgdGltZW91dCwgZXh0cmFQYXJhbSwgZXh0cmFWYWx1ZSlcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInBhc3NMb2dpblwiLFwiZGVzY1wiOlwiTG9ncyBpbiBieSBsb2dpbi9wYXNzd29yZFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVzZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXNzXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBwYXNzd29yZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjZXJ0TG9naW5cIixcImRlc2NcIjpcIkxvZ3MgaW4gYnkgY2VydGlmaWNhdGVcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9nb3V0XCIsXCJkZXNjXCI6XCJMb2dzIG91dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJhdHRhY2hDZXJ0XCIsXCJkZXNjXCI6XCJBdHRhY2hlcyBhIGNlcnRpZmljYXRlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhc3NcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImRldGFjaENlcnRcIixcImRlc2NcIjpcIkRldGFjaGVzIGEgY2VydGlmaWNhdGVcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1c2VyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFzc1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcGFzc3dvcmRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiYWRkVXNlclwiLFwiZGVzY1wiOlwiQWRkcyBhIG5ldyB1c2VyXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhc3NcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmlyc3ROYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBmaXJzdCBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwibGFzdE5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGxhc3QgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImVtYWlsXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlbWFpbFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImF0dGFjaFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiYXR0YWNoIHRoZSBjdXJyZW50IGNlcnRpZmljYXRlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiYWdyZWVcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcImFncmVlIHdpdGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNoYW5nZUluZm9cIixcImRlc2NcIjpcIkNoYW5nZXMgdGhlIGFjY291bnQgaW5mb3JtYXRpb25cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJmaXJzdE5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGZpcnN0IG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJsYXN0TmFtZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgbGFzdCBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZW1haWxcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVtYWlsXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNoYW5nZVBhc3NcIixcImRlc2NcIjpcIkNoYW5nZXMgdGhlIGFjY291bnQgcGFzc3dvcmRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1c2VyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwib2xkUGFzc1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgb2xkIHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwibmV3UGFzc1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgbmV3IHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInJlc2V0UGFzc1wiLFwiZGVzY1wiOlwiUmVzZXRzIHRoZSBhY2NvdW50IHBhc3N3b3JkXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfV19LHtcIm5hbWVcIjpcImFtaUxvZ2luXCIsXCJkZXNjXCI6XCJUaGUgQU1JIGF1dGhlbnRpY2F0aW9uIHN1YnN5c3RlbVwiLFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcImdldFVzZXJJbmZvXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSB1c2VyIGluZm9ybWF0aW9uXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgY3VycmVudCB1c2VyIGluZm9ybWF0aW9uXCJ9XX0se1wibmFtZVwiOlwiZ2V0Um9sZUluZm9cIixcImRlc2NcIjpcIkdldHMgdGhlIHJvbGUgaW5mb3JtYXRpb25cIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBjdXJyZW50IHJvbGUgaW5mb3JtYXRpb25cIn1dfSx7XCJuYW1lXCI6XCJnZXRVUERJbmZvXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSB1c2VyIGRhdGEgcHJvdGVjdGlvbiBpbmZvcm1hdGlvblwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGN1cnJlbnQgdXNlciBkYXRhIHByb3RlY3Rpb24gaW5mb3JtYXRpb25cIn1dfSx7XCJuYW1lXCI6XCJnZXRTU09JbmZvXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBzaW5nbGUgc2lnbiBvbiBpbmZvcm1hdGlvblwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGN1cnJlbnQgc2luZ2xlIHNpZ24gb24gaW5mb3JtYXRpb25cIn1dfSx7XCJuYW1lXCI6XCJnZXRVc2VyXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBjdXJyZW50IHVzZXJcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBjdXJyZW50IHVzZXJcIn1dfSx7XCJuYW1lXCI6XCJnZXRHdWVzdFwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgZ3Vlc3QgdXNlclwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGd1ZXN0IHVzZXJcIn1dfSx7XCJuYW1lXCI6XCJnZXRDbGllbnRETlwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgY2xpZW50IEROXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgY2xpZW50IEROXCJ9XX0se1wibmFtZVwiOlwiZ2V0SXNzdWVyRE5cIixcImRlc2NcIjpcIkdldHMgdGhlIGlzc3VlciBETlwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGlzc3VlciBETlwifV19LHtcIm5hbWVcIjpcImlzQXV0aGVudGljYXRlZFwiLFwiZGVzY1wiOlwiQ2hlY2tzIHdoZXRoZXIgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZFwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19LHtcIm5hbWVcIjpcImhhc1JvbGVcIixcImRlc2NcIjpcIkNoZWNrcyB3aGV0aGVyIHRoZSB1c2VyIGhhcyB0aGUgZ2l2ZW4gcm9sZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInJvbGVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHJvbGVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19LHtcIm5hbWVcIjpcInNzb1wiLFwiZGVzY1wiOlwiT3BlbnMgdGhlICdTU08nIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcInNpZ25JblwiLFwiZGVzY1wiOlwiT3BlbnMgdGhlICdTaWduSW4nIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImNoYW5nZUluZm9cIixcImRlc2NcIjpcIk9wZW5zIHRoZSAnQ2hhbmdlIEluZm8nIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImNoYW5nZVBhc3NcIixcImRlc2NcIjpcIk9wZW5zIHRoZSAnQ2hhbmdlIFBhc3N3b3JkJyBtb2RhbCB3aW5kb3dcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJhY2NvdW50U3RhdHVzXCIsXCJkZXNjXCI6XCJPcGVucyB0aGUgJ0FjY291bnQgU3RhdHVzJyBtb2RhbCB3aW5kb3dcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJzaWduT3V0XCIsXCJkZXNjXCI6XCJTaWducyBvdXRcIixcInBhcmFtc1wiOltdfV19XSxcImludGVyZmFjZXNcIjpbe1wibmFtZVwiOlwiYW1pLklDb250cm9sXCIsXCJkZXNjXCI6XCJUaGUgQU1JIGNvbnRyb2wgaW50ZXJmYWNlXCIsXCJpbXBsZW1lbnRzXCI6W10sXCJpbmhlcml0c1wiOltdLFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcInBhdGNoSWRcIixcImRlc2NcIjpcIlBhdGNoZXMgYW4gSFRNTCBpZGVudGlmaWVyXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiaWRcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVucGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHBhdGNoZWQgSFRNTCBpZGVudGlmaWVyXCJ9XX0se1wibmFtZVwiOlwicmVwbGFjZUhUTUxcIixcImRlc2NcIjpcIlB1dHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInByZXBlbmRIVE1MXCIsXCJkZXNjXCI6XCJQcmVwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiYXBwZW5kSFRNTFwiLFwiZGVzY1wiOlwiQXBwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgaXMgcmVhZHkgdG8gcnVuXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwib25SZW1vdmVcIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIHRoZSBjb250cm9sIGlzIHJlbW92ZWRcIixcInBhcmFtc1wiOltdfV19LHtcIm5hbWVcIjpcImFtaS5JU3ViQXBwXCIsXCJkZXNjXCI6XCJUaGUgQU1JIHN1Yi1hcHBsaWNhdGlvbiBpbnRlcmZhY2VcIixcImltcGxlbWVudHNcIjpbXSxcImluaGVyaXRzXCI6W10sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyByZWFkeSB0byBydW5cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uRXhpdFwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyBhYm91dCB0byBleGl0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkxvZ2luXCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiBsb2dnaW5nIGluXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkxvZ291dFwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gbG9nZ2luZyBvdXRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19XX1dLFwiY2xhc3Nlc1wiOlt7XCJuYW1lXCI6XCJhbWkuQ29udHJvbFwiLFwiZGVzY1wiOlwiVGhlIGJhc2ljIEFNSSBjb250cm9sXCIsXCJpbXBsZW1lbnRzXCI6W1wiYW1pLklDb250cm9sXCJdLFwiaW5oZXJpdHNcIjpbXSxcImtvbnN0cnVjdG9yXCI6e1wibmFtZVwiOlwiQ29udHJvbFwiLFwicGFyYW1zXCI6W119LFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcInBhdGNoSWRcIixcImRlc2NcIjpcIlBhdGNoZXMgYW4gSFRNTCBpZGVudGlmaWVyXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiaWRcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVucGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHBhdGNoZWQgSFRNTCBpZGVudGlmaWVyXCJ9XX0se1wibmFtZVwiOlwicmVwbGFjZUhUTUxcIixcImRlc2NcIjpcIlB1dHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInByZXBlbmRIVE1MXCIsXCJkZXNjXCI6XCJQcmVwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiYXBwZW5kSFRNTFwiLFwiZGVzY1wiOlwiQXBwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgaXMgcmVhZHkgdG8gcnVuXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwib25SZW1vdmVcIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIHRoZSBjb250cm9sIGlzIHJlbW92ZWRcIixcInBhcmFtc1wiOltdfV19LHtcIm5hbWVcIjpcImFtaS5TdWJBcHBcIixcImRlc2NcIjpcIlRoZSBiYXNpYyBBTUkgc3ViLWFwcGxpY2F0aW9uXCIsXCJpbXBsZW1lbnRzXCI6W1wiYW1pLklTdWJBcHBcIl0sXCJpbmhlcml0c1wiOltdLFwia29uc3RydWN0b3JcIjp7XCJuYW1lXCI6XCJTdWJBcHBcIixcInBhcmFtc1wiOltdfSxcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJvblJlYWR5XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIHJlYWR5IHRvIHJ1blwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ1c2VyZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwib25FeGl0XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIGFib3V0IHRvIGV4aXRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uTG9naW5cIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIGxvZ2dpbmcgaW5cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uTG9nb3V0XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiBsb2dnaW5nIG91dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ1c2VyZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX1dfV19O1xuXG4vKiBlc2xpbnQtZW5hYmxlICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
