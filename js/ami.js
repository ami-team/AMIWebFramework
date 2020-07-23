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
        fill: 'rgba(000, 100, 000, 0.9)',
        background: 'rgba(000, 100, 000, 0.15)',
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
      "name": "modalLock",
      "desc": "Locks the modal window",
      "params": []
    }, {
      "name": "modalUnlock",
      "desc": "Unlocks the modal window",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFNSS9zcmMvbWFpbi5qcyIsIkFNSS9zcmMvdG9rZW5pemVyLmpzIiwiQU1JL3NyYy9leHByZXNzaW9uX2NvbXBpbGVyLmpzIiwiQU1JL3NyYy90ZW1wbGF0ZV9jb21waWxlci5qcyIsIkFNSS9zcmMvZW5naW5lLmpzIiwiQU1JL3NyYy9jYWNoZS5qcyIsIkFNSS9zcmMvc3RkbGliLmpzIiwiQU1JL3NyYy9pbnRlcnByZXRlci5qcyIsIkFNSS9leHRlcm5hbC9qc3BhdGguanMiLCJBTUkvQU1JRXh0ZW5zaW9uLmpzIiwiQU1JL0FNSU9iamVjdC5qcyIsIkFNSS9BTUlSb3V0ZXIuanMiLCJBTUkvQU1JV2ViQXBwLmpzIiwiQU1JL0FNSUludGVyZmFjZS5qcyIsIkFNSS9BTUlDb21tYW5kLmpzIiwiQU1JL0FNSUxvZ2luLmpzIiwiQU1JL0FNSURvYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQSxJQUFBLE9BQUEsR0FBQTtBQUNBLEVBQUEsT0FBQSxFQUFBO0FBREEsQ0FBQTs7QUFRQSxJQUFBLE9BQUEsT0FBQSxLQUFBLFdBQUEsRUFDQTtBQUNBLEVBQUEsT0FBRyxDQUFNLEVBQVQsR0FBVSxPQUFXLENBQUMsSUFBRCxDQUFyQjtBQUVDLEVBQUEsTUFBQSxDQUFPLE9BQVAsQ0FBYSxPQUFiLEdBQXdCLE9BQXhCO0FBQ0Q7O0FDeEJBLE9BQUEsQ0FBQSxTQUFBLEdBQUE7QUFHQyxFQUFBLFFBQUEsRUFBQSxrQkFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsRUFDRDtBQUNDLFFBQUEsU0FBVSxDQUFBLE1BQVYsS0FBeUIsVUFBTSxDQUFBLE1BQS9CLEVBQ0M7QUFDQSxZQUFHLHlDQUFIO0FBQ0M7O0FBRUQsUUFBQyxhQUFBLEdBQUEsRUFBRDtBQUNGLFFBQUEsWUFBQSxHQUFBLEVBQUE7QUFDRSxRQUFNLFlBQUEsR0FBZSxFQUFyQjtBQUVBLFFBQUEsQ0FB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QWxFUjtBQW1FQyxFQUFBLE1BQUksRUFBSSxHQW5FVDtBQW9FQyxFQUFBLElBQUEsRUFBTSxHQXBFUDtBQXFFQyxFQUFBLEtBQUEsRUFBTyxHQXJFUjtBQXNFQyxFQUFBLEtBQUssRUFBQyxHQXRFUDtBQXVFQyxFQUFBLEdBQUEsRUFBSyxHQXZFTjtBQXdFQyxFQUFBLEtBQUssRUFBRSxHQXhFUjtBQXlFQyxFQUFBLEdBQUcsRUFBRSxHQXpFTjtBQTBFQyxFQUFBLEdBQUEsRUFBSyxHQTFFTjtBQTJFQyxFQUFBLGVBQVMsRUFBQSxHQTNFVjtBQTRFQyxFQUFBLFFBQVMsRUFBQSxHQTVFVjtBQTZFQSxFQUFBLEtBQUUsRUFBQSxHQTdFRjtBQThFQSxFQUFBLEdBQUUsRUFBQSxHQTlFRjtBQStFQyxFQUFBLEtBQUssRUFBRSxHQS9FUjtBQWdGQyxFQUFBLElBQUksRUFBQyxHQWhGTjtBQWlGQyxFQUFBLEVBQUEsRUFBQSxHQWpGRDtBQWtGQyxFQUFBLEVBQUEsRUFBSSxHQWxGTDtBQW1GQyxFQUFBLEdBQUcsRUFBQyxHQW5GTDtBQW9GQyxFQUFBLEdBQUcsRUFBQyxHQXBGTDtBQXFGQyxFQUFBLEdBQUcsRUFBRSxHQXJGTjtBQXNGQyxFQUFBLEdBQUcsRUFBRSxHQXRGTjtBQXVGQyxFQUFBLEdBQUcsRUFBRSxHQXZGTjtBQXdGQyxFQUFBLFFBQVEsRUFBQyxHQXhGVjtBQThGQyxFQUFBLEdBQUEsRUFBQSxHQTlGRDtBQStGQSxFQUFBLEdBQUEsRUFBQSxHQS9GQTtBQWdHQyxFQUFBLEdBQUcsRUFBRSxHQWhHTjtBQWlHQyxFQUFBLEdBQUcsRUFBRTtBQWpHTixDQUFBO0FBd0dBLE9BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEtBQUE7O0FBTUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxTQUFBLEdBQUEsVUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO0FBR0MsT0FBQSxPQUFBLEdBQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLENBQUE7QUFJQSxPQUFBLFVBQUEsR0FBQSxD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LFVBQUEsRUFDQTtBQUNDLEVBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxVQUFBLEdBQUEsVUFBQSxDQUFBLEVBQ0E7QUFDQyxRQUFBLElBQUEsR0FBQSxzQkFBQTtBQUVGLFdBQUEsS0FBQSxPQUFBLENBQUEsQ0FBQSxFQUFBLElBQUEsTUFBQSxJQUFBO0FBQ0UsR0FMRDtBQU1BOztBQUlELElBQUEsQ0FBQSxNQUFBLENBQUEsU0FBQSxDQUFBLFFBQUEsRUFDQTtBQUNDLEVBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxRQUFBLEdBQUEsVUFBQSxDQUFBLEVBQ0E7QUFDQyxRQUFBLElBQUEsR0FBQSxLQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsTUFBQTtBQUVGLFdBQUEsS0FBQSxPQUFBLENBQUEsQ0FBQSxFQUFBLElBQUEsTUFBQSxJQUFBO0FBQ0UsR0FMRDtBQU1BOztBQU1ELElBQUEsd0JBQUEsR0FBQSxNQUFBLENBQUEsSUFBQTtBQUNBLElBQUksd0JBQXdCLEdBQUcsTUFBTSxDQUFDLElBQXRDOztBQUlBLE1BQUEsQ0FBQSxJQUFBLEdBQUEsVUFBQSxFQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsRUFDQTtBQUNDLFNBQUEsd0JBQUEsQ0FBQSxFQUFBLEVBQUEsT0FBQSxHQUFBLFVBQUEsS0FBQSxFQUFBLEtBQUE7QUFBQSxXQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLENBQUE7QUFBQSxHQUFBLEdBQUEsUUFBQSxDQUFBO0FBQ0EsQ0FIRDs7QUFPQSxNQUFBLENBQUEsSUFBQSxHQUFBLFVBQUEsUUFBQSxFQUNBO0FBQ0MsTUFBQSxPQUFBLFFBQUEsS0FBQSxRQUFBLElBRUcsUUFBRSxDQUFBLFFBQUYsS0FBRSxPQUZMLEVBR0c7QUFDRixRQUFHLE1BQUEsR0FBQSxDQUFBLENBQUEsUUFBQSxFQUFIOztBQURFLDJCQUdKLFNBQUEsQ0FBQSxLQUFBLENBQ0UsQ0FBQSxTQUFBLEVBQU8sS0FBUCxDQURGLEVBRUcsQ0FBQSxNQUFBLEVBQVMsRUFBVCxDQUZILEVB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QUFBO0FBQ0E7QUFDRDs7QUFFRixFQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBO0FBQ0M7O0FBSUQsU0FBQSxnQkFBQSxDQUFBLEtBQUEsRUFBQSxDQUFBLEVBQ0E7QUFDQyxNQUFBLE1BQUEsR0FBQSxNQUFBO0FBRUQsTUFBQSxLQUFBLEdBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxXQUFBLENBQUE7QUFBQSxNQUFBLENBQUEsR0FBQSxLQUFBLENBQUEsTUFBQSxHQUFBLENBQUE7O0FBRUEsT0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsRUFDQztBQUNDLFFBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUNBO0FBQ0MsTUFBQSxNQUFBLEdBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtBQUNBLEtBSEQsTUFLQTtBQUNDLFlBQUEsTUFBQSxLQUFBLEdBQUEsTUFBQSxHQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxpQkFBQTtBQUNBO0FBQ0Q7O0FBRUYsRUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUNDOztBQVlELFNBQUEsYUFBQSxDQUFBLEtBQUEsRUFBQSxNQUFBLEVBQ0E7QUFDQyxNQUFBLENBQUEsTUFBQSxFQUNBO0FBQ0MsSUFBQSxNQUFBLEdBQUEsRUFBQTtBQUNBOztBQUlGLEVBQUEsTUFBQSxDQUFBLEtBQUEsR0FBQSxLQUFBOztBQUlBLEVBQUEsaUJBQUEsQ0FBQSxLQUFBLEVBQUEsTUFBQSxDQUFBOztBQUlBLE1BQUEsTUFBQSxDQUFBLENBQUEsRUFDQztBQUNDLElBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsTUFBQTtBQUNBO0FBR0Q7O0FBWUQsU0FBQSxhQUFBLENBQUEsS0FBQSxFQUFBLE1BQUEsRUFDQTtBQUNDLE1BQUEsQ0FBQSxNQUFBLEVBQ0E7QUFDQyxJQUFB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QSxFQUFBLGdCQUFBLE1BQUEsRUFBQSxPQUFBLEVBQ0M7QUFDQyxTQUFBLE9BQUEsQ0FBQSxPQUFBLENBQUE7QUFDQSxNQUFBLE1BQUssRUFBQSxNQURMO0FBRUMsTUFBQSxPQUFPLEVBQUM7QUFGVCxLQUFBOztBQUtGLFdBQUEsSUFBQTtBQUNFLEdBaE1GO0FBME1BLEVBQUEsTUFBQSxFQUFBLGdCQUFBLE1BQUEsRUFDQztBQUNDLFNBQUEsT0FBQSxHQUFBLEtBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxVQUFBLEtBQUEsRUFBQTtBQUVGLGFBQUEsS0FBQSxDQUFBLE1BQUEsQ0FBQSxRQUFBLE9BQUEsTUFBQSxDQUFBLFFBQUEsRUFBQTtBQUNHLEtBSEQsQ0FBQTtBQUtGLFdBQUEsSUFBQTtBQUNFLEdBbE5GO0FBMk5BLEVBQUEsS0FBQSxFQUFBLGlCQUNDO0FBQ0MsUUFBQSxDQUFBOztBQUVGLFNBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxLQUFBLE9BQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQ0U7QUFDQyxNQUFBLENBQUEsR0FBQSxLQUFBLEtBQUEsQ0FBQSxLQUFBLENBQUEsS0FBQSxPQUFBLENBQUEsQ0FBQSxFQUFBLE1BQUEsQ0FBQTs7QUFFSCxVQUFBLENBQUEsRUFDRztBQUNDLGFBQUEsT0FBQSxDQUFBLENBQUEsRUFBQSxPQUFBLENBQUEsS0FBQSxDQUFBLFNBQUEsRUFBQSxDQUFBOztBQUVKLGVBQUEsSUFBQTtBQUNJO0FBQ0Q7O0FBRUgsV0FBQSxLQUFBO0FBQ0UsR0E1T0Y7QUF1UEEsRUFBQSxrQkFBQSxFQUFBLDRCQUFBLElBQUEsRUFBQSxPQUFBLEVBQ0M7QUFBQSxRQURELE9BQ0M7QUFERCxNQUFBLE9BQ0MsR0FERCxJQUNDO0FBQUE7O0FBQ0MsUUFBQSxPQUFBLENBQUEsU0FBQSxFQUNBO0FBQ0MsTUFBQSxPQUFBLENBQUEsU0FBQSxDQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxVQUFBLEdBQUEsS0FBQSxXQUFBLENBQUEsSUFBQSxD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QSxJQUFBLEVBQUE7O0FBSUEsUUFBQSxRQUFBLEdBQUEsS0FBQSxZQUFBLENBQUEsR0FBQSxFQUFBLFFBQUEsQ0FBQTs7QUFJQSxZQUFBLFFBQUE7QUFNQSxXQUFBLFNBQUE7QUFFQSxhQUFBLFdBQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxDQUFBLFVBQUEsSUFBQSxFQUFBO0FBRUEsVUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLElBQUE7QUFFQSxpQkFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLFFBQUEsRUFBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLENBQUE7QUFFQSxTQU5BLEVBTUEsVUFBQSxPQUFBLEVBQUE7QUFFQSxpQkFBQSxRQUFBLENBQUEsVUFBQSxDQUFBLE9BQUEsRUFBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBO0FBQ0ssU0FUTDtBQVdBOztBQU1BLFdBQUEsUUFBQTtBQUVBLGFBQUEsVUFBQSxDQUFBLEdBQUEsRUFBQSxJQUFBLENBQUEsVUFBQSxJQUFBLEVBQUE7QUFFQSxVQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsSUFBQTtBQUVBLGlCQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsUUFBQSxFQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQTtBQUVBLFNBTkEsRUFNQSxVQUFBLE9BQUEsRUFBQTtBQUVBLGlCQUFBLFFBQUEsQ0FBQSxVQUFBLENBQUEsT0FBQSxFQUFBLENBQUEsT0FBQSxDQUFBLENBQUE7QUFDSyxTQVRMO0FBV0E7O0FBTUEsV0FBQSxPQUFBO0FBRUEsWUFBQSxLQUFBLE9BQUEsQ0FBQSxPQUFBLENBQUEsR0FBQSxLQUFBLENBQUEsRUFDSTtBQUNDLFVBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxLQUFBO0FBRUwsaUJBQUEsS0FBQSxTQUFBLENBQUEsUUFBQSxFQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQTtBQUNLLFNBTEwsTUFPSTtBQUNDLFVBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQTtBQUNB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QUFDQyxXQUFBLFFBQUE7QUFDQTs7QUFJSCxRQUFBLEtBQUEsR0FBQSxLQUFBLFFBQUEsR0FBQSxLQUFBLENBQUEsSUFBQSxDQUFBOztBQUVBLFFBQUEsS0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLEVBQ0U7QUFDQyxNQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsWUFBQSxLQUFBLFFBQUEsR0FBQSxPQUFBLEdBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQTtBQUNBO0FBQ0QsR0E1b0NGO0FBb3BDQSxFQUFBLFNBQUEsRUFBQSxxQkFDQztBQUNDLFFBQUEsS0FBQSxHQUFBLEtBQUEsUUFBQSxHQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUE7O0FBRUYsUUFBQSxLQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsRUFDRTtBQUNDLE1BQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxlQUFBLEtBQUEsUUFBQSxHQUFBLE9BQUEsR0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0E7O0FBSUgsU0FBQSxRQUFBLEdBQUEsS0FBQSxXQUFBOztBQUVBLFFBQUEsS0FBQSxRQUFBLEdBQUEsQ0FBQSxFQUNFO0FBQ0MsTUFBQSxDQUFBLENBQUEsYUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLFNBQUEsRUFBQSxNQUFBO0FBQ0E7QUFDRCxHQXJxQ0Y7QUE2cUNBLEVBQUEsV0FBQSxFQUFBLHVCQUNDO0FBQ0MsU0FBQSxXQUFBLEdBQUEsS0FBQSxRQUFBOztBQUVGLFFBQUEsS0FBQSxRQUFBLEdBQUEsQ0FBQSxFQUNFO0FBQ0MsTUFBQSxDQUFBLENBQUEsYUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLFNBQUEsRUFBQSxNQUFBO0FBQ0E7O0FBSUgsUUFBQSxLQUFBLEdBQUEsS0FBQSxRQUFBLEdBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQTs7QUFFQSxRQUFBLEtBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxFQUNFO0FBQ0MsTUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBLGlCQUFBLEtBQUEsUUFBQSxHQUFBLE9BQUEsR0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0E7QUFDRCxHQTlyQ0Y7QUFzc0NBLEVBQUEsUUFBQSxFQUFBLG9CQUNDO0FBQ0MsU0FBQSxTQUFBLEdBQUEsSUFBQTtBQUNBLEdBenNDRjtBQWl0Q0EsRUFBQSxXQUFBLEVBQUEsdUJBQ0M7QUFDQyxTQUFBLFNBQUEsR0FBQSxLQUFBO0FBQ0EsR0FwdENGO0FBMHRDQSxFQUFBLGFBQUEsRUFBQSx1QkFBQSxLQUFBLEVBQUEsS0FBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQ0M7QUFBQTs7QUFHRCxJQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsU0FBQSxLQUFBLENBQUEsV0FBQSxFQUFBLEdBQUEsSUFBQSxHQUFBLE9BQUEsR0FBQSxJQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUE7QUFJQSxRQUFBLElBQUEsR0FBQSxzQ0FBQSxPQUFBLEdBQUEsb0JBQUEsR0FBQSx1QkFBQSxJQUFBLG9EQUFBLEdBQUEsS0FBQSxHQUFBLElBQUEsR0FBQSxLQUFBLEdBQUEsa0JBQUEsR0FBQSxLQUFBLFVBQUEsQ0FBQSxNQUFBLENBQUEsTUFBQSxHQUFBLE1BQUEsQ0FBQSxrQkFBQSxDQUFBLENBQUEsR0FBQSx3SUFBQSxHQUFBLEtBQUEsVUFBQSxDQUFBLE9BQUEsQ0FBQSxHQUFBLGNBQUE7QUFJQSxRQUFBLEVBQUEsR0FBQSxDQUFBLENBQUEsb0JBQUEsQ0FBQTtBQUVBLElBQUEsRUFBQSxDQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsT0FBQSxDQUFBLEtBQUEsUUFBQSxFQUFBLHFDQUFBLENBQUEsRUFBQSxPQUFBLEdBQUEsSUFBQSxDQUFBLFlBQUE7QUFFQSxNQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsbUJBQUEsRUFBQSxLQUFBLENBQUEsTUFBQTtBQUVBLE1BQUEsQ0FBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBOztBQUVBLE1BQUEsTUFBQSxDQUFBLE1BQUE7QUFDRyxLQVBIO0FBVUUsR0FsdkNGO0FBNHZDQSxFQUFBLElBQUEsRUFBQSxjQUFBLE9BQUEsRUFBQSxPQUFBLEVBQ0M7QUFDQyxRQUFBLEtBQUEsTUFBQSxDQUFBLE9BQUEsTUFBQSxPQUFBLEVBQ0E7QUFDQyxNQUFBLE9BQUEsR0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQTtBQUNBOztBQUVILFNBQUEsYUFBQSxDQUFBLFdBQUEsRUFBQSxNQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUE7QUFDRSxHQXB3Q0Y7QUE4d0NBLEVBQUEsT0FBQSxFQUFBLGlCQUFBLE9BQUEsRUFBQSxPQUFBLEVBQ0M7QUFDQyxRQUFBLEtBQUEsTUFBQSxDQUFBLE9BQUEsTUFBQSxPQUFBLEVBQ0E7QUFDQyxNQUFBLE9BQUEsR0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQTtBQUNBOztBQUVILFNBQUEsYUFBQSxDQUFBLGNBQUEsRUFBQSxTQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUE7QUFDRSxHQXR4Q0Y7QUFneUNBLEVBQUEsT0FBQSxFQUFBLGlCQUFBLE9BQUEsRUFBQSxPQUFBLEVBQ0M7QUFDQyxRQUFBLEtBQUEsTUFBQSxDQUFBLE9BQUEsTUFBQSxPQUFBLEVBQ0E7QUFDQyxNQUFBLE9BQUEsR0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQTtBQUNBOztBQUVILFNBQUEsYUFBQSxDQUFBLGNBQUEsRUFBQSxTQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUE7QUFDRSxHQXh5Q0Y7QUFrekNBLEVBQUEsS0FBQSxFQUFBLGVBQUEsT0FBQSxFQUFBLE9BQUEsRUFDQztBQUNDLFFBQUEsS0FBQSxNQUFBLENBQUEsT0FBQSxNQUFBLE9BQUEsRUFDQTtBQUNDLE1BQUEsT0FBQSxHQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBO0FBQ0E7O0FBRUgsU0FBQSxhQUFBLENBQUEsYUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUEsT0FBQTtBQUNFLEdBMXpDRjtBQWswQ0EsRUFBQSxLQUFBLEVBQUEsaUJBQ0M7QUFDQyxJQUFBLENBQUEsQ0FBQSxvQkFBQSxDQUFBLENBQUEsS0FBQTtBQUNBLEdBcjBDRjtBQWcxQ0EsRUFBQSxjQUFBLEVBQUEsd0JBQUEsS0FBQSxFQUNDO0FBQUE7O0FBQ0MsUUFBQSxDQUFBLEdBQUEsS0FBQSxNQUFBLENBQUEsS0FBQSxNQUFBLE9BQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxDQUFBLFVBQUEsSUFBQTtBQUFBLGFBQUEsaUNBQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxpQkFBQSxFQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxPQUFBO0FBQUEsS0FBQSxFQUFBLElBQUEsQ0FBQSxFQUFBLENBQUEsR0FDeUMsRUFEekM7QUFJRixJQUFBLENBQUEsQ0FBQSx5QkFBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUE7QUFDRSxHQXYxQ0Y7QUFtMkNBLEVBQUEsT0FBQSxFQUFBLG1CQUNDO0FBQ0MsUUFBQSxDQUFBLEtBQUEsU0FBQSxFQUNBO0FBQ0MsTUFBQSxLQUFBLENBQUEsa0RBQUEsQ0FBQTtBQUNBO0FBQ0QsR0F6MkNGO0FBbTNDQSxFQUFBLFNBQUEsRUFBQSxxQkFDQztBQUNDLFFBQUEsQ0FBQSxLQUFBLFNBQUEsRUFDQTtBQUNDLE1BQUEsS0FBQSxDQUFBLG9EQUFBLENBQUE7QUFDQTtBQUNELEdBejNDRjtBQWs0Q0EsRUFBQSxLQUFBLEVBQUEsZUFBQSxRQUFBLEVBQ0M7QUFBQTs7QUFDQyxTQUFBLGVBQUEsQ0FBQSxJQUFBLENBQUEsWUFBQTtBQUFBLHlCQVNFLE1BQUEsQ0FBQSxLQUFBLENBQUEsQ0FDQSxVQURBLEVBQ1EsVUFEUixFQUNlLGVBRGYsRUFFQSxXQUZBLEVBRWEsV0FGYixFQUV5QixZQUZ6QixFQUV3QyxjQUZ4QyxFQUdBLGlDQUhBLEVBRzJCLG9DQUgzQixFQUlBLHdCQUpBLEVBSUMscUJBSkQsRUFJb0MseUJBSnBDLEVBSXdFLDRCQUp4RSxDQUFBLEVBS0MsQ0FDRixNQUFJLENBQUEsU0FBSixHQUNDLGtCQUZDLEVBR0wsTUFBTyxDQUFFLFNBSEosRUFJRCxtQkFKQyxFQUtELHFCQUxDLEVBTUQsTUFBQyxDQUFJLFNBQUwsR0FBZ0IsMkJBTmYsRUFPRCxNQUFJLENBQUMsU0FBTCxHQUFpQixnQ0FQaEIsRUFRRCxNQUFJLENBQUMsU0FBTCxHQUFpQixlQVJoQixFQVNELElBVEMsRUFTSSxJQVRKLEVBVUQsSUFWQyxFQVVLLElBVkwsRUFVVSxJQVZWLEVBVVUsSUFWVixDQUxELEVBZ0JBLFFBaEJBLENBVEY7QUFBQSxVQUtDLE9BTEQ7QUFBQSxVQUtRLE9BTFI7QUFBQSxVQUtRLFlBTFI7QUFBQSxVQU1FLFFBTkY7QUFBQSxVQU1XLFFBTlg7QUFBQSxVQU1vQixTQU5wQjtBQUFBLFVBTWlDLFdBTmpDO0FBQUEsVUFPRSw2QkFQRjtBQUFBLFVBT2lDLGdDQVBqQztBQUFBLFVBUUUsb0JBUkY7QUFBQSxVQVFFLGlCQVJGO0FBQUEsVUFRaUMscUJBUmpDO0FBQUEsVUFRa0Usd0JBUmxFOztBQTZCRixNQUFBLFVBQUEsQ0FBQSxRQUFBLEdBQUEsV0FBQTs7QUFJQSxNQUFBLE1BQUEsQ0FBQSxjQUFBLEdBQUEsVUFBQSxDQUFBLEVBQUE7QUFFQSxZQUFBLENBQUEsTUFBQSxDQUFBLFNBQUEsRUFDSTtBQUNDLGNBQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxNQUFBLENBQUEsS0FBQTs7QUFFTCxjQUFBLENBQUEsRUFDSztBQUNDLFlBQUEsQ0FBQSxDQUFBLFdBQUEsR0FBQSwyQ0FBQTtBQUNBOztBQUVOLGlCQUFBLDJDQUFBO0FBQ0s7QUFDRCxPQWJKOztBQWlCQSxVQUFBLFdBQUEsR0FBQSxNQUFBLENBQUEsU0FBQSxHQUFBLHlCQUFBO0FBRUEsVUFBQSxVQUFBLEdBQUEsTUFBQSxDQUFBLFNBQUEsR0FBQSx1QkFBQTtBQUlBLE1BQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQTtBQUFBLFFBQUEsR0FBQSxFQUFBLFdBQUE7QUFBQSxRQUFBLEtBQUEsRUFBQSxLQUFBO0FBQUEsUUFBQSxXQUFBLEVBQUEsSUFBQTtBQUFBLFFBQUEsUUFBQSxFQUFBO0FBQUEsT0FBQSxFQUFBLElBQUEsQ0FBQSxVQUFBLEtBQUEsRUFBQTtBQUVBLFFBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQTtBQUFBLFVBQUEsR0FBQSxFQUFBLFVBQUE7QUFBQSxVQUFBLEtBQUEsRUFBQSxLQUFBO0FBQUEsVUFBQSxXQUFBLEVBQUEsSUFBQTtBQUFBLFVBQUEsUUFBQSxFQUFBO0FBQUEsU0FBQSxFQUFBLElBQUEsQ0FBQSxVQUFBLEtBQUEsRUFBQTtBQUVBLGVBQUEsSUFBQSxJQUFBLElBQUEsS0FBQSxFQUFBO0FBQ0ssWUFBQSxNQUFJLENBQUEsU0FBSixDQUFlLElBQUcsQ0FBQSxXQUFILEVBQWYsSUFBMEIsS0FBQSxDQUFBLElBQUEsQ0FBMUI7QUFDQzs7QUFFTixlQUFBLElBQUEsTUFBQSxJQUFBLEtBQUEsRUFBQTtBQUNLLFlBQUEsTUFBSSxDQUFBLFFBQUosQ0FBZSxNQUFHLENBQUEsV0FBSCxFQUFmLElBQTBCLEtBQUEsQ0FBQSxNQUFBLENBQTFCO0FBQ0M7O0FBRU4sY0FBQSxDQUFBLE1BQUEsQ0FBQSxTQUFBLEVBQ0s7QUFHTCxnQkFBQSxJQUFBLEdBQUE7QUFDTSxjQUFBLFFBQU0sRUFBSyxPQURqQjtBQUVPLGNBQUEsUUFBUSxFQUFFLE9BRmpCO0FBR08sY0FBQSxhQUFVLEVBQUEsWUFIakI7QUFJTyxjQUFBLFNBQUEsRUFBQTtBQUpQLGFBQUE7QUFTQSxZQUFBLENBQUEsQ0FBQSxJQUFBLENBQUE7QUFBQSxjQUFBLEdBQUEsRUFBQSxRQUFBO0FBQUEsY0FBQSxLQUFBLEVBQUEsSUFBQTtBQUFBLGNBQUEsV0FBQSxFQUFBLElBQUE7QUFBQSxjQUFBLFFBQUEsRUFBQTtBQUFBLGFBQUEsRUFBQSxJQUFBLENBQUEsVUFBQSxLQUFBLEVBQUE7QUFFQSxjQUFBLENBQUEsQ0FBQSxJQUFBLENBQUE7QUFBQSxnQkFBQSxHQUFBLEVBQUEsU0FBQTtBQUFBLGdCQUFBLEtBQUEsRUFBQSxJQUFBO0FBQUEsZ0JBQUEsV0FBQSxFQUFBLElBQUE7QUFBQSxnQkFBQSxRQUFBLEVBQUE7QUFBQSxlQUFBLEVBQUEsSUFBQSxDQUFBLFVBQUEsS0FBQSxFQUFBO0FBRUEsZ0JBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxNQUFBLENBQUEsVUFBQSxDQUFBLEtBQUEsRUFBQSxJQUFBLElBQUEsS0FBQSxFQUFBLE9BQUEsR0FBQSxJQUFBLENBQUEsWUFBQTtBQUVBLGtCQUFBLE1BQUEsQ0FBQSxJQUFBOztBQUVBLGtCQUFBLFFBQUEsQ0FBQSxNQUFBLENBQ1MsNkJBRFQsRUFFVSxnQ0FGVixFQUdVLG9CQUhWLEVBSVUsaUJBSlYsRUFLVSxxQkFMVixFQU1VLHdCQU5WLEVBT1UsSUFQVixDQU9VLFlBQUE7QUFFVixvQkFBQSxNQUFBLENBQUEsTUFBQTtBQUVBLG1CQVhBLEVBV0EsSUFYQSxDQVdBLFVBQUEsT0FBQSxFQUFBO0FBRUEsb0JBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxPQUFBO0FBQ1UsbUJBZFY7QUFlUyxpQkFuQlQ7QUFxQkEsZUF2QkEsRUF1QkEsWUFBQTtBQUVBLGdCQUFBLEtBQUEsQ0FBQSxxQkFBQSxTQUFBLEdBQUEsOEJBQUEsQ0FBQTtBQUNRLGVBMUJSO0FBNEJBLGFBOUJBLEVBOEJBLFlBQUE7QUFFQSxjQUFBLEtBQUEsQ0FBQSxxQkFBQSxRQUFBLEdBQUEsOEJBQUEsQ0FBQTtBQUNPLGFBakNQO0FBb0NNLFdBakROLE1BbURLO0FBR0wsZ0JBQUEsS0FBQSxHQUFBLEVBQUE7O0FBRUEsZ0JBQUEsQ0FBQSxDQUFBLG9CQUFBLENBQUEsQ0FBQSxNQUFBLEtBQUEsQ0FBQSxFQUFBO0FBQ00sY0FBQSxLQUFFLElBQUssb0NBQVA7QUFDQzs7QUFFUCxnQkFBQSxDQUFBLENBQUEseUJBQUEsQ0FBQSxDQUFBLE1BQUEsS0FBQSxDQUFBLEVBQUE7QUFDTSxjQUFBLEtBQUUsSUFBSyx5Q0FBUDtBQUNDOztBQUlQLFlBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQTtBQUFBLGNBQUEsR0FBQSxFQUFBLFNBQUE7QUFBQSxjQUFBLEtBQUEsRUFBQSxJQUFBO0FBQUEsY0FBQSxXQUFBLEVBQUEsSUFBQTtBQUFBLGNBQUEsUUFBQSxFQUFBO0FBQUEsYUFBQSxFQUFBLElBQUEsQ0FBQSxVQUFBLEtBQUEsRUFBQTtBQUVBLGNBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxLQUFBLEdBQUEsS0FBQSxFQUFBLE9BQUEsR0FBQSxJQUFBLENBQUEsWUFBQTtBQUVBLGdCQUFBLE1BQUEsQ0FBQSxJQUFBOztBQUVBLGdCQUFBLFFBQUEsQ0FBQSxNQUFBLENBQ1EsNkJBRFIsRUFFUyxnQ0FGVCxFQUdTLG9CQUhULEVBSVMsaUJBSlQsRUFLUyxxQkFMVCxFQU1TLHdCQU5ULEVBT1MsSUFQVCxDQU9TLFlBQUE7QUFFVCxrQkFBQSxNQUFBLENBQUEsTUFBQTtBQUVBLGlCQVhBLEVBV0EsSUFYQSxDQVdBLFVBQUEsT0FBQSxFQUFBO0FBRUEsa0JBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxPQUFBO0FBQ1MsaUJBZFQ7QUFlUSxlQW5CUjtBQW9CTyxhQXRCUDtBQXlCTTtBQUVOLFNBdkdBLEVBdUdBLFlBQUE7QUFFQSxVQUFBLEtBQUEsQ0FBQSxxQkFBQSxVQUFBLEdBQUEsOEJBQUEsQ0FBQTtBQUNLLFNBMUdMO0FBNEdBLE9BOUdBLEVBOEdBLFlBQUE7QUFFQSxRQUFBLEtBQUEsQ0FBQSxxQkFBQSxXQUFBLEdBQUEsOEJBQUEsQ0FBQTtBQUNJLE9BakhKO0FBcUhBLEtBN0tFLEVBNktGLElBN0tFLENBNktGLFVBQUEsT0FBQSxFQUFBO0FBRUEsTUFBQSxLQUFBLENBQUEsT0FBQSxDQUFBO0FBQ0csS0FoTEQ7O0FBa0xGLFdBQUEsSUFBQTtBQUNFLEdBdmpERjtBQW9rREEsRUFBQSxXQUFBLEVBQUEscUJBQUEsT0FBQSxFQUFBLFFBQUEsRUFDQztBQUNDLFFBQUEsTUFBQSxHQUFBLENBQUEsQ0FBQSxRQUFBLEVBQUE7O0FBREQsdUJBR0QsS0FBQSxLQUFBLENBQ0UsQ0FBQSxTQUFBLENBREYsRUFFRyxDQUFBLE1BQUEsQ0FGSCxFQUdHLFFBSEgsQ0FIQztBQUFBLFFBR0QsT0FIQzs7QUFXRCxRQUFBLE9BQUEsQ0FBQSxPQUFBLENBQUEsT0FBQSxNQUFBLENBQUEsRUFDRTtBQUNDLE1BQUEsT0FBQSxHQUFBLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0E7O0FBRUgsUUFBQSxLQUFBLEdBQUEsS0FBQSxTQUFBLENBQUEsT0FBQSxDQUFBLFdBQUEsRUFBQSxDQUFBOztBQUlBLFFBQUEsS0FBQSxFQUNFO0FBQ0MsV0FBQSxXQUFBLENBQUEsS0FBQSxTQUFBLEdBQUEsR0FBQSxHQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxDQUFBLFVBQUEsTUFBQSxFQUFBO0FBRUgsWUFDSTtBQUNDLGNBQUEsS0FBQSxHQUFBLE1BQUEsQ0FDQSxLQUFNLENBQUEsS0FETixDQUFBO0FBSUwsY0FBQSxPQUFBLEdBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxTQUFBLENBQUEsT0FBQSxDQUFBLEtBQUEsQ0FBQSxLQUFBLENBQUEsU0FBQSxDQUFBLEdBQ2lELElBRGpEOztBQUlBLFVBQUEsa0JBQUEsQ0FBQSxPQUFBLEVBQUEsWUFBQTtBQUVBLFlBQUEsTUFBQSxDQUFBLFdBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQSxLQUFBLENBQUE7QUFFQSxXQUpBLEVBSUEsVUFBQSxPQUFBLEVBQUE7QUFFQSxZQUFBLE1BQUEsQ0FBQSxVQUFBLENBQUEsT0FBQSxFQUFBLENBQUEsNkJBQUEsT0FBQSxHQUFBLEtBQUEsR0FBQSxPQUFBLENBQUE7QUFDTSxXQVBOLENBQUE7QUFRSyxTQWxCTCxDQW1CSSxPQUFDLE9BQUQsRUFDQTtBQUNDLFVBQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQSw2QkFBQSxPQUFBLEdBQUEsS0FBQSxHQUFBLE9BQUEsQ0FBQTtBQUNBO0FBRUwsT0ExQkcsRUEwQkgsVUFBQSxPQUFBLEVBQUE7QUFFQSxRQUFBLE1BQUEsQ0FBQSxVQUFBLENBQUEsT0FBQSxFQUFBLENBQUEsNkJBQUEsT0FBQSxHQUFBLEtBQUEsR0FBQSxPQUFBLENBQUE7QUFDSSxPQTdCRDtBQThCQSxLQWhDSCxNQWtDRTtBQUNDLE1BQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQSw2QkFBQSxPQUFBLEdBQUEsR0FBQSxDQUFBO0FBQ0E7O0FBSUgsV0FBQSxNQUFBLENBQUEsT0FBQSxFQUFBO0FBQ0UsR0Fsb0RGO0FBZ3BEQSxFQUFBLGFBQUEsRUFBQSx1QkFBQSxNQUFBLEVBQUEsS0FBQSxFQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUEsUUFBQSxFQUNDO0FBQ0MsUUFBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLFFBQUEsRUFBQTs7QUFERCx1QkFHRCxLQUFBLEtBQUEsQ0FDRSxDQUFBLFNBQUEsQ0FERixFQUVHLENBQUEsTUFBQSxDQUZILEVBR0csUUFISCxDQUhDO0FBQUEsUUFHRCxPQUhDOztBQVdELFNBQUEsV0FBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsSUFBQSxDQUFBLFVBQUEsV0FBQSxFQUFBO0FBRUEsVUFBQSxRQUFBLEdBQUEsSUFBQSxXQUFBLENBQUEsTUFBQSxFQUFBLEtBQUEsQ0FBQTs7QUFFQSxNQUFBLGtCQUFBLENBQUEsV0FBQSxDQUFBLFNBQUEsQ0FBQSxNQUFBLENBQUEsS0FBQSxDQUFBLFFBQUEsRUFBQSxNQUFBLENBQUEsRUFBQSxZQUFBO0FBRUEsUUFBQSxNQUFBLENBQUEsV0FBQSxDQUFBLE9BQUEsRUFBQSxDQUFBLFFBQUEsRUFBQSxNQUFBLDRCQUFBLFNBQUEsRUFBQTtBQUVBLE9BSkEsRUFJQSxVQUFBLE9BQUEsRUFBQTtBQUVBLFFBQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQSxPQUFBLENBQUE7QUFDSSxPQVBKLENBQUE7QUFTQSxLQWJBLEVBYUEsSUFiQSxDQWFBLFVBQUEsT0FBQSxFQUFBO0FBRUEsTUFBQSxNQUFBLENBQUEsVUFBQSxDQUFBLE9BQUEsRUFBQSxDQUFBLE9BQUEsQ0FBQTtBQUNHLEtBaEJIO0FBb0JBLFdBQUEsTUFBQSxDQUFBLE9BQUEsRUFBQTtBQUNFLEdBanJERjtBQWlzREEsRUFBQSxtQkFBQSxFQUFBLDZCQUFBLE1BQUEsRUFBQSxLQUFBLEVBQUEsT0FBQSxFQUFBLDRCQUFBLEVBQUEsZUFBQSxFQUFBLGNBQUEsRUFBQSxRQUFBLEVBQ0M7QUFDQyxRQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsUUFBQSxFQUFBOztBQURELHVCQUdELEtBQUEsS0FBQSxDQUNFLENBQUEsU0FBQSxDQURGLEVBRUcsQ0FBQSxNQUFBLENBRkgsRUFHRyxRQUhILENBSEM7QUFBQSxRQUdELE9BSEM7O0FBV0QsUUFDRTtBQUNDLFVBQUEsTUFBQSxHQUFBLEVBQUE7QUFDQSxVQUFJLFFBQVEsR0FBQyxFQUFiOztBQUlILFdBQUEsSUFBQSxHQUFBLElBQUEsY0FBQSxFQUFBO0FBQ0csUUFBQSxRQUFRLENBQUEsR0FBQSxDQUFSLEdBQWUsY0FBZ0IsQ0FBQyxHQUFELENBQS9CO0FBQ0M7O0FBRUosV0FBQSxJQUFBLElBQUEsSUFBQSxlQUFBLEVBQUE7QUFDRyxRQUFBLFFBQVEsQ0FBQSxJQUFBLENBQVIsR0FBZSxlQUFpQixDQUFDLElBQUQsQ0FBaEM7QUFDQzs7QUFNSixNQUFBLEtBQUEsQ0FBQSxTQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsNEJBQUE7QUFFQSxNQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsUUFBQTtBQUlBLFdBQUEsYUFBQSxDQUFBLE1BQUEsRUFBQSxLQUFBLEVBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxJQUFBLENBQUEsWUFBQTtBQUVBLFFBQUEsTUFBQSxDQUFBLFdBQUEsQ0FBQSxPQUFBLDZCQUFBLFNBQUE7QUFFQSxPQUpBLEVBSUEsSUFKQSxDQUlBLFVBQUEsT0FBQSxFQUFBO0FBRUEsUUFBQSxNQUFBLENBQUEsVUFBQSxDQUFBLE9BQUEsRUFBQSxDQUFBLE9BQUEsQ0FBQTtBQUNJLE9BUEo7QUFVRyxLQW5DSCxDQW9DRSxPQUFDLE9BQUQsRUFDQTtBQUNDLE1BQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQSxPQUFBLENBQUE7QUFDQTs7QUFJSCxXQUFBLE1BQUEsQ0FBQSxPQUFBLEVBQUE7QUFDRSxHQXp2REY7QUEyd0RBLEVBQUEsd0JBQUEsRUFBQSxrQ0FBQSxNQUFBLEVBQUEsS0FBQSxFQUFBLE9BQUEsRUFBQSw0QkFBQSxFQUFBLGVBQUEsRUFBQSxjQUFBLEVBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQSxRQUFBLEVBQ0M7QUFBQTs7QUFDQyxRQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsUUFBQSxFQUFBOztBQURELHVCQUdELEtBQUEsS0FBQSxDQUNFLENBQUEsU0FBQSxDQURGLEVBRUcsQ0FBQSxNQUFBLENBRkgsRUFHRyxRQUhILENBSEM7QUFBQSxRQUdELE9BSEM7O0FBV0QsUUFDRTtBQUNDLE1BQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxxQkFBQSxLQUFBLFVBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxTQUFBLEdBQUEsS0FBQSxVQUFBLENBQUEsS0FBQSxDQUFBLEVBQUEsSUFBQSxDQUFBLFVBQUEsUUFBQSxFQUFBO0FBRUgsWUFBQSxNQUFBLEdBQUEsRUFBQTtBQUNJLFlBQUksUUFBUSxHQUFDLEVBQWI7O0FBSUosYUFBQSxJQUFBLEdBQUEsSUFBQSxjQUFBLEVBQUE7QUFDSSxVQUFBLFFBQVEsQ0FBQSxHQUFBLENBQVIsR0FBZSxjQUFnQixDQUFDLEdBQUQsQ0FBL0I7QUFDQzs7QUFFTCxhQUFBLElBQUEsS0FBQSxJQUFBLGVBQUEsRUFBQTtBQUNJLFVBQUEsUUFBUSxDQUFBLEtBQUEsQ0FBUixHQUFlLGVBQWlCLENBQUMsS0FBRCxDQUFoQztBQUNDOztBQUlMLFFBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBO0FBRUEsUUFBQSxLQUFBLENBQUEsU0FBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLENBQUEsTUFBQSxFQUFBLDRCQUFBO0FBRUEsUUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFFBQUE7O0FBSUEsUUFBQSxNQUFBLENBQUEsYUFBQSxDQUFBLE1BQUEsRUFBQSxLQUFBLEVBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxJQUFBLENBQUEsWUFBQTtBQUVBLFVBQUEsTUFBQSxDQUFBLFdBQUEsQ0FBQSxPQUFBLDZCQUFBLFNBQUE7QUFFQSxTQUpBLEVBSUEsSUFKQSxDQUlBLFVBQUEsT0FBQSxFQUFBO0FBRUEsVUFBQSxNQUFBLENBQUEsVUFBQSxDQUFBLE9BQUEsRUFBQSxDQUFBLE9BQUEsQ0FBQTtBQUNLLFNBUEw7QUFVSSxPQW5DRDtBQW9DQSxLQXRDSCxDQXVDRSxPQUFDLE9BQUQsRUFDQTtBQUNDLE1BQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQSxPQUFBLENBQUE7QUFDQTs7QUFJSCxXQUFBLE1BQUEsQ0FBQSxPQUFBLEVBQUE7QUFDRSxHQXQwREY7QUFvMURBLEVBQUEsd0JBQUEsRUFBQSxrQ0FBQSxNQUFBLEVBQUEsS0FBQSxFQUFBLEVBQUEsRUFBQSxjQUFBLEVBQUEsUUFBQSxFQUNDO0FBQUE7O0FBR0QsUUFBQSxRQUFBLEdBQUEsRUFBQSxDQUFBLFlBQUEsQ0FBQSxXQUFBLElBQUEsRUFBQSxDQUFBLFlBQUEsQ0FBQSxXQUFBLENBQUEsR0FDZ0QsRUFEaEQ7QUFJQSxRQUFBLGdCQUFBLEdBQUEsRUFBQSxDQUFBLFlBQUEsQ0FBQSxvQkFBQSxJQUFBLEVBQUEsQ0FBQSxZQUFBLENBQUEsb0JBQUEsQ0FBQSxHQUNpRSxFQURqRTtBQU1BLFFBQUEsVUFBQSxHQUFBLEVBQUEsQ0FBQSxZQUFBLENBQUEsYUFBQSxJQUFBLElBQUEsQ0FBQSxLQUFBLENBQUEsRUFBQSxDQUFBLFlBQUEsQ0FBQSxhQUFBLENBQUEsQ0FBQSxHQUNvRCxFQURwRDtBQUlBLFFBQUEsWUFBQSxHQUFBLEVBQUEsQ0FBQSxZQUFBLENBQUEsZUFBQSxJQUFBLElBQUEsQ0FBQSxLQUFBLENBQUEsRUFBQSxDQUFBLFlBQUEsQ0FBQSxlQUFBLENBQUEsQ0FBQSxHQUN3RCxFQUR4RDtBQU1BLFFBQUEsUUFBQSxHQUFBLEVBQUEsQ0FBQSxZQUFBLENBQUEsV0FBQSxJQUFBLEVBQUEsQ0FBQSxZQUFBLENBQUEsV0FBQSxDQUFBLEdBQ2dELFVBRGhEO0FBSUEsUUFBQSxTQUFBLEdBQUEsRUFBQSxDQUFBLFlBQUEsQ0FBQSxZQUFBLElBQUEsRUFBQSxDQUFBLFlBQUEsQ0FBQSxZQUFBLENBQUEsR0FDa0QsU0FEbEQ7QUFNQSxTQUFBLElBQUE7O0FBRUEsUUFBQSxnQkFBQSxLQUFBLE1BQUEsRUFDRTtBQUNDLGFBQUEsS0FBQSxtQkFBQSxDQUFBLE1BQUEsRUFBQSxLQUFBLEVBQUEsUUFBQSxFQUFBLFVBQUEsRUFBQSxZQUFBLEVBQUEsY0FBQSxFQUFBLFFBQUEsRUFBQSxJQUFBLENBQUEsWUFBQTtBQUVILFFBQUEsT0FBQSxDQUFBLE1BQUE7QUFFQSxPQUpHLEVBSUgsSUFKRyxDQUlILFVBQUEsT0FBQSxFQUFBO0FBRUEsUUFBQSxPQUFBLENBQUEsS0FBQSxDQUFBLE9BQUE7QUFDSSxPQVBELENBQUE7QUFRQSxLQVZILE1BWUU7QUFDQyxhQUFBLEtBQUEsd0JBQUEsQ0FBQSxNQUFBLEVBQUEsS0FBQSxFQUFBLFFBQUEsRUFBQSxVQUFBLEVBQUEsWUFBQSxFQUFBLGNBQUEsRUFBQSxRQUFBLEVBQUEsU0FBQSxFQUFBLFFBQUEsRUFBQSxJQUFBLENBQUEsWUFBQTtBQUVILFFBQUEsT0FBQSxDQUFBLE1BQUE7QUFFQSxPQUpHLEVBSUgsSUFKRyxDQUlILFVBQUEsT0FBQSxFQUFBO0FBRUEsUUFBQSxPQUFBLENBQUEsS0FBQSxDQUFBLE9BQUE7QUFDSSxPQVBELENBQUE7QUFRQTtBQUdELEdBaDVERjtBQXM1REEsRUFBQSxZQUFBLEVBQUEsd0JBQ0M7QUFBQTs7QUFDQyxRQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsUUFBQSxFQUFBOztBQUlGLFFBQUEsS0FBQSxRQUFBLEVBQ0U7QUFDQyxNQUFBLGtCQUFBLENBQUEsS0FBQSxzQkFBQSxDQUFBLE9BQUEsQ0FBQSxLQUFBLElBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxFQUFBLFVBQUEsT0FBQSxFQUFBO0FBRUgsUUFBQSxvQkFBQSxDQUFBLE9BQUEsQ0FBQSxTQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsWUFBQTtBQUVBLFVBQUEsTUFBQSxDQUFBLE9BQUEsQ0FBQSxPQUFBO0FBQ0ssU0FITCxDQUFBO0FBS0EsT0FQRyxFQU9ILFVBQUEsT0FBQSxFQUFBO0FBRUEsUUFBQSxvQkFBQSxDQUFBLE9BQUEsQ0FBQSxTQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsWUFBQTtBQUVBLFVBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxPQUFBO0FBQ0ssU0FITCxDQUFBO0FBSUksT0FiRCxDQUFBO0FBY0EsS0FoQkgsTUFrQkU7QUFDQyxNQUFBLE1BQUEsQ0FBQSxPQUFBO0FBQ0E7O0FBSUgsV0FBQSxNQUFBLENBQUEsT0FBQSxFQUFBO0FBQ0UsR0FyN0RGO0FBeTdEQSxFQUFBLGFBQUEsRUFBQSx5QkFDQztBQUFBOztBQUNDLFFBQUEsTUFBQSxHQUFBLENBQUEsQ0FBQSxRQUFBLEVBQUE7O0FBSUYsUUFBQSxLQUFBLFFBQUEsRUFDRTtBQUNDLE1BQUEsa0JBQUEsQ0FBQSxLQUFBLHNCQUFBLENBQUEsUUFBQSxDQUFBLEtBQUEsSUFBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLEVBQUEsVUFBQSxPQUFBLEVBQUE7QUFFSCxRQUFBLG9CQUFBLENBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQSxLQUFBLENBQUEsRUFBQSxZQUFBO0FBRUEsVUFBQSxNQUFBLENBQUEsT0FBQSxDQUFBLE9BQUE7QUFDSyxTQUhMLENBQUE7QUFLQSxPQVBHLEVBT0gsVUFBQSxPQUFBLEVBQUE7QUFFQSxRQUFBLG9CQUFBLENBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQSxLQUFBLENBQUEsRUFBQSxZQUFBO0FBRUEsVUFBQSxNQUFBLENBQUEsTUFBQSxDQUFBLE9BQUE7QUFDSyxTQUhMLENBQUE7QUFJSSxPQWJELENBQUE7QUFjQSxLQWhCSCxNQWtCRTtBQUNDLE1BQUEsTUFBQSxDQUFBLE9BQUE7QUFDQTs7QUFJSCxXQUFBLE1BQUEsQ0FBQSxPQUFBLEVBQUE7QUFDRSxHQXg5REY7QUFvK0RBLEVBQUEsVUFBQSxFQUFBLG9CQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsUUFBQSxFQUNDO0FBQUE7O0FBQ0MsUUFBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLFFBQUEsRUFBQTs7QUFERCx1QkFHRCxLQUFBLEtBQUEsQ0FDRSxDQUFBLFNBQUEsQ0FERixFQUVHLENBQUEsTUFBQSxDQUZILEVBR0csUUFISCxDQUhDO0FBQUEsUUFHRCxPQUhDOztBQVdELFNBQUEsSUFBQTtBQUVBLElBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxZQUFBO0FBRUEsTUFBQSxPQUFBLENBQUEsTUFBQTtBQUNHLEtBSEg7O0FBT0EsUUFBQSxNQUFBLENBQUEsT0FBQSxDQUFBLFNBQUEsTUFBQSxDQUFBLEVBQ0U7QUFDQyxNQUFBLE1BQUEsR0FBQSxNQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQTtBQUNBOztBQUVILFFBQUEsS0FBQSxHQUFBLEtBQUEsUUFBQSxDQUFBLE1BQUEsQ0FBQSxXQUFBLEVBQUEsQ0FBQTs7QUFJQSxRQUFBLEtBQUEsRUFDRTtBQUNDLFdBQUEsV0FBQSxDQUFBLEtBQUEsU0FBQSxHQUFBLEdBQUEsR0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsQ0FBQSxVQUFBLE1BQUEsRUFBQTtBQUVILFlBQ0k7QUFDQyxVQUFBLE9BQUEsQ0FBQSxzQkFBQSxDQUFBLE1BQUEsQ0FBQSxRQUFBOztBQUVMLGNBQUEsUUFBQSxHQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsUUFBQSxDQUFBO0FBRUEsVUFBQSxPQUFBLENBQUEsc0JBQUEsR0FBQSxRQUFBOztBQUlBLFVBQUEsT0FBQSxDQUFBLGNBQUEsQ0FBQSxLQUFBLENBQUEsVUFBQTs7QUFFQSxjQUFBLE9BQUEsR0FBQSxNQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsUUFBQSxDQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsR0FDMEMsSUFEMUM7O0FBSUEsVUFBQSxrQkFBQSxDQUFBLE9BQUEsRUFBQSxZQUFBO0FBRUEsZ0JBQUEsT0FBQSxHQUFBLFFBQUEsQ0FBQSxlQUFBLEtBQUEsT0FBQSxDQUFBLFlBQUEsRUFBQSxHQUNtRCxPQUFJLENBQUMsYUFBTCxFQURuRDtBQUlBLFlBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxZQUFBO0FBRUEsY0FBQSxNQUFBLENBQUEsV0FBQSxDQUFBLE9BQUEsRUFBQSxDQUFBLFFBQUEsQ0FBQTtBQUVBLGFBSkEsRUFJQSxVQUFBLE9BQUEsRUFBQTtBQUVBLGNBQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQSw0QkFBQSxNQUFBLEdBQUEsS0FBQSxHQUFBLE9BQUEsQ0FBQTtBQUNPLGFBUFA7QUFTQSxXQWZBLEVBZUEsVUFBQSxPQUFBLEVBQUE7QUFFQSxZQUFBLE1BQUEsQ0FBQSxVQUFBLENBQUEsT0FBQSxFQUFBLENBQUEsNEJBQUEsTUFBQSxHQUFBLEtBQUEsR0FBQSxPQUFBLENBQUE7QUFDTSxXQWxCTixDQUFBO0FBbUJLLFNBbkNMLENBb0NJLE9BQUMsT0FBRCxFQUNBO0FBQ0MsVUFBQSxNQUFBLENBQUEsVUFBQSxDQUFBLE9BQUEsRUFBQSxDQUFBLDRCQUFBLE1BQUEsR0FBQSxLQUFBLEdBQUEsT0FBQSxDQUFBO0FBQ0E7QUFFTCxPQTNDRyxFQTJDSCxVQUFBLE9BQUEsRUFBQTtBQUVBLFFBQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQSw0QkFBQSxNQUFBLEdBQUEsS0FBQSxHQUFBLE9BQUEsQ0FBQTtBQUNJLE9BOUNEO0FBK0NBLEtBakRILE1BbURFO0FBQ0MsTUFBQSxNQUFBLENBQUEsVUFBQSxDQUFBLE9BQUEsRUFBQSxDQUFBLDRCQUFBLE1BQUEsR0FBQSxHQUFBLENBQUE7QUFDQTs7QUFJSCxXQUFBLE1BQUEsQ0FBQSxPQUFBLEVBQUE7QUFDRSxHQTVqRUY7QUF1a0VBLEVBQUEsZUFBQSxFQUFBLHlCQUFBLGFBQUEsRUFBQSxlQUFBLEVBQ0M7QUFBQTs7QUFDQyxRQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsUUFBQSxFQUFBOztBQUVGLFFBQUEsS0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQ0U7QUFDQyxNQUFBLFVBQUEsQ0FBQSxPQUFBLENBQUEsd0JBQUEsS0FBQSxZQUFBLENBQUEsS0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxHQUFBLEVBQUEsSUFBQSxDQUFBLFVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUVILFFBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxPQUFBO0FBRUEsT0FKRyxFQUlILElBSkcsQ0FJSCxVQUFBLElBQUEsRUFBQTtBQUVBLFlBQUEsSUFBQTs7QUFFQSxZQUNJO0FBQ0MsVUFBQSxJQUFBLEdBQUEsSUFBQSxDQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLDRCQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsS0FBQSxJQUFBLENBQUE7QUFDQSxTQUhMLENBSUksT0FBQyxPQUFELEVBQ0E7QUFDQyxVQUFBLElBQUEsR0FBQSxFQUFBO0FBQ0E7O0FBSUwsWUFBQSxNQUFBLEdBQUEsSUFBQSxDQUFBLFFBQUEsQ0FBQSxJQUFBLGFBQUE7QUFDSSxZQUFNLFFBQVEsR0FBQyxJQUFNLENBQUEsVUFBQSxDQUFOLElBQWtCLGVBQWpDOztBQUVKLFFBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxNQUFBLEVBQUEsUUFBQSxFQUFBLElBQUEsQ0FBQSxZQUFBO0FBRUEsVUFBQSxNQUFBLENBQUEsT0FBQTtBQUVBLFNBSkEsRUFJQSxVQUFBLE9BQUEsRUFBQTtBQUVBLFVBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxPQUFBO0FBQ0ssU0FQTDtBQVVJLE9BaENEO0FBaUNBLEtBbkNILE1BcUNFO0FBQ0MsVUFBQSxDQUFBLFNBQUEsQ0FBQSxLQUFBLEVBQUEsRUFDQTtBQUdILFlBQUEsTUFBQSxHQUFBLEtBQUEsSUFBQSxDQUFBLFFBQUEsS0FBQSxhQUFBO0FBQ0ksWUFBTSxRQUFRLEdBQUMsS0FBSyxJQUFMLENBQVcsVUFBWCxLQUF1QixlQUF0QztBQUVKLGFBQUEsVUFBQSxDQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsSUFBQSxDQUFBLFlBQUE7QUFFQSxVQUFBLE1BQUEsQ0FBQSxPQUFBO0FBRUEsU0FKQSxFQUlBLFVBQUEsT0FBQSxFQUFBO0FBRUEsVUFBQSxNQUFBLENBQUEsTUFBQSxDQUFBLE9BQUE7QUFDSyxTQVBMO0FBVUk7QUFDRDs7QUFFSCxXQUFBLE1BQUEsQ0FBQSxPQUFBLEVBQUE7QUFDRTtBQXRvRUYsQ0FBQSxDQUFBO0FDeENBLGFBQUEsQ0FBQSxjQUFBLEVBQUE7QUFTQSxFQUFBLE9BQUEsRUFBQSxtQkFBQSxDQUFBLENBVEE7QUFxQkEsRUFBQSxXQUFBLEVBQUEsdUJBQUEsQ0FBQSxDQXJCQTtBQWlDQSxFQUFBLFdBQUEsRUFBQSx1QkFBQSxDQUFBLENBakNBO0FBNkNBLEVBQUEsVUFBQSxFQUFBLHNCQUFBLENBQUEsQ0E3Q0E7QUFxREEsRUFBQSxPQUFBLEVBQUEsbUJBQUEsQ0FBQTtBQXJEQSxDQUFBLENBQUE7QUFtRUEsYUFBQSxDQUFBLGFBQUEsRUFBQTtBQVFBLEVBQUEsT0FBQSxFQUFBLG1CQUFBLENBQUEsQ0FSQTtBQWlCQSxFQUFBLE1BQUEsRUFBQSxrQkFBQSxDQUFBLENBakJBO0FBMEJBLEVBQUEsT0FBQSxFQUFBLG1CQUFBLENBQUEsQ0ExQkE7QUFtQ0EsRUFBQSxRQUFBLEVBQUEsb0JBQUEsQ0FBQTtBQW5DQSxDQUFBLENBQUE7QUFrREEsU0FBQSxDQUFBLGFBQUEsRUFBQTtBQUdBLEVBQUEsV0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLFFBQUEsQ0FIQTtBQU9BLEVBQUEsQ0FBQSxFQUFBLGFBQ0M7QUFDQyxJQUFBLEdBQUEsQ0FBQSxPQUFBLENBQUEsV0FBQSxHQUFBLENBQUE7QUFDQSxHQVZGO0FBY0EsRUFBQSxLQUFBLEVBQUEsZUFBQSxNQUFBLEVBQUEsS0FBQSxFQUNDO0FBQ0MsU0FBQSxPQUFBLEdBQUEsTUFBQSxJQUFBLElBQUE7QUFDQSxTQUFLLE1BQUwsR0FBYyxLQUFDLElBQU8sSUFBdEI7QUFFRixTQUFBLGNBQUEsR0FBQSxHQUFBLENBQUEsT0FBQSxDQUFBLFdBQUEsRUFBQTtBQUNFLEdBcEJGO0FBd0JBLEVBQUEsU0FBQSxFQUFBLG1CQUFBLE1BQUEsRUFDQztBQUNDLFdBQUEsS0FBQSxPQUFBLEdBQUEsTUFBQSxJQUFBLElBQUE7QUFDQSxHQTNCRjtBQTZCQSxFQUFBLFNBQUEsRUFBQSxxQkFDQztBQUNDLFdBQUEsS0FBQSxPQUFBO0FBQ0EsR0FoQ0Y7QUFvQ0EsRUFBQSxRQUFBLEVBQUEsa0JBQUEsS0FBQSxFQUNDO0FBQ0MsV0FBQSxLQUFBLE1BQUEsR0FBQSxLQUFBLElBQUEsSUFBQTtBQUNBLEdBdkNGO0FBeUNBLEVBQUEsUUFBQSxFQUFBLG9CQUNDO0FBQ0MsV0FBQSxLQUFBLE1BQUE7QUFDQSxHQTVDRjtBQWdEQSxFQUFBLFdBQUEsRUFBQSxxQkFBQSxRQUFBLEVBQ0M7QUFDQyxXQUFBLEtBQUEsU0FBQSxHQUFBLFFBQUEsSUFBQSxFQUFBO0FBQ0EsR0FuREY7QUFxREEsRUFBQSxXQUFBLEVBQUEsdUJBQ0M7QUFDQyxXQUFBLEtBQUEsU0FBQTtBQUNBLEdBeERGO0FBNERBLEVBQUEsT0FBQSxFQUFBLGlCQUFBLFVBQUEsRUFDQztBQUNDLFdBQUEsVUFBQSxHQUFBLFdBQUEsR0FBQSxLQUFBLGNBQUE7QUFDQSxHQS9ERjtBQW1FQSxFQUFBLFdBQUEsRUFBQSxxQkFBQSxRQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUEsRUFDQztBQUNDLFFBQUEsQ0FBQSxRQUFBLEVBQ0E7QUFDQyxNQUFBLFFBQUEsR0FBQSxFQUFBO0FBQ0E7O0FBRUgsSUFBQSxRQUFBLENBQUEsTUFBQSxHQUFBLEtBQUEsY0FBQTtBQUVBLFdBQUEsU0FBQSxDQUFBLFdBQUEsQ0FBQSxRQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUEsQ0FBQTtBQUNFLEdBN0VGO0FBaUZBLEVBQUEsV0FBQSxFQUFBLHFCQUFBLFFBQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxFQUNDO0FBQ0MsUUFBQSxDQUFBLFFBQUEsRUFDQTtBQUNDLE1BQUEsUUFBQSxHQUFBLEVBQUE7QUFDQTs7QUFFSCxJQUFBLFFBQUEsQ0FBQSxNQUFBLEdBQUEsS0FBQSxjQUFBO0FBRUEsV0FBQSxTQUFBLENBQUEsV0FBQSxDQUFBLFFBQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxDQUFBO0FBQ0UsR0EzRkY7QUErRkEsRUFBQSxVQUFBLEVBQUEsb0JBQUEsUUFBQSxFQUFBLElBQUEsRUFBQSxRQUFBLEVBQ0M7QUFDQyxRQUFBLENBQUEsUUFBQSxFQUNBO0FBQ0MsTUFBQSxRQUFBLEdBQUEsRUFBQTtBQUNBOztBQUVILElBQUEsUUFBQSxDQUFBLE1BQUEsR0FBQSxLQUFBLGNBQUE7QUFFQSxXQUFBLFNBQUEsQ0FBQSxVQUFBLENBQUEsUUFBQSxFQUFBLElBQUEsRUFBQSxRQUFBLENBQUE7QUFDRSxHQXpHRjtBQTZHQSxFQUFBLGFBQUEsRUFBQSx1QkFBQSxNQUFBLEVBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxRQUFBLEVBQ0M7QUFDQyxXQUFBLFNBQUEsQ0FBQSxhQUFBLENBQUEsTUFBQSxFQUFBLElBQUEsRUFBQSxPQUFBLEVBQUEsTUFBQSxFQUFBLFFBQUEsQ0FBQTtBQUNBLEdBaEhGO0FBb0hBLEVBQUEsbUJBQUEsRUFBQSw2QkFBQSxNQUFBLEVBQUEsT0FBQSxFQUFBLDRCQUFBLEVBQUEsZUFBQSxFQUFBLGNBQUEsRUFBQSxRQUFBLEVBQ0M7QUFDQyxXQUFBLFNBQUEsQ0FBQSxtQkFBQSxDQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLDRCQUFBLEVBQUEsZUFBQSxFQUFBLGNBQUEsRUFBQSxRQUFBLENBQUE7QUFDQSxHQXZIRjtBQTJIQSxFQUFBLHdCQUFBLEVBQUEsa0NBQUEsTUFBQSxFQUFBLE9BQUEsRUFBQSw0QkFBQSxFQUFBLGVBQUEsRUFBQSxjQUFBLEVBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQSxRQUFBLEVBQ0M7QUFDQyxXQUFBLFNBQUEsQ0FBQSx3QkFBQSxDQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLDRCQUFBLEVBQUEsZUFBQSxFQUFBLGNBQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLFFBQUEsQ0FBQTtBQUNBLEdBOUhGO0FBa0lBLEVBQUEsd0JBQUEsRUFBQSxrQ0FBQSxNQUFBLEVBQUEsRUFBQSxFQUFBLGNBQUEsRUFBQSxRQUFBLEVBQ0M7QUFDQyxXQUFBLFNBQUEsQ0FBQSx3QkFBQSxDQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsRUFBQSxFQUFBLGNBQUEsRUFBQSxRQUFBLENBQUE7QUFDQTtBQXJJRixDQUFBLENBQUE7QUFvSkEsU0FBQSxDQUFBLFlBQUEsRUFBQTtBQUdBLEVBQUEsV0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLE9BQUEsQ0FIQTtBQU9BLEVBQUEsTUFBQSxFQUFBLGtCQUFBLENBQUEsQ0FQQTtBQVdBLEVBQUEsT0FBQSxFQUFBLG1CQUFBLENBQUEsQ0FYQTtBQWVBLEVBQUEsUUFBQSxFQUFBLG9CQUFBLENBQUE7QUFmQSxDQUFBLENBQUE7QUN6UUEsYUFBQSxDQUFBLFlBQUEsRUFBQTtBQVVBLEVBQUEsUUFBQSxFQUFBLGdCQVZBO0FBaUJBLEVBQUEsU0FBQSxFQUFBLGtCQWpCQTtBQThCQSxFQUFBLE9BQUEsRUFBQSxpQkFBQSxPQUFBLEVBQUEsUUFBQSxFQUNDO0FBQ0MsUUFBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLFFBQUEsRUFBQTs7QUFERCw0QkFHRCxTQUFBLENBQUEsS0FBQSxDQUNFLENBQUEsVUFBQSxFQUFPLFdBQVAsRUFBMkIsU0FBM0IsRUFBcUMsU0FBckMsRUFBOEMsWUFBOUMsRUFBMEQsWUFBMUQsQ0FERixFQUVHLENBQUEsS0FBRSxRQUFGLEVBQWMsS0FBQSxTQUFkLEVBQTJCLE1BQTNCLEVBQXNDLElBQUEsRUFBQSxHQUFXLElBQWpELEVBQWlELElBQWpELEVBQTZELElBQTdELENBRkgsRUFHRyxRQUhILENBSEM7QUFBQSxRQUdELFFBSEM7QUFBQSxRQUdELFNBSEM7QUFBQSxRQUdELE9BSEM7QUFBQSxRQUdELE9BSEM7QUFBQSxRQUdELFVBSEM7QUFBQSxRQUdELFVBSEM7O0FBV0QsUUFBQSxHQUFBLEdBQUEsUUFBQSxDQUFBLElBQUEsRUFBQTtBQUNFLFFBQU0sT0FBTSxHQUFBLE9BQVMsQ0FBQSxJQUFULEVBQVo7QUFDQSxRQUFNLFNBQVMsR0FBQyxTQUFRLENBQUksSUFBWixFQUFoQjtBQUlGLFFBQUEsSUFBQSxHQUFBO0FBQ0UsTUFBQSxPQUFNLEVBQUksT0FEWjtBQUVHLE1BQUEsU0FBUyxFQUFBO0FBRlosS0FBQTs7QUFLQSxRQUFBLFVBQUEsRUFDRTtBQUNDLE1BQUEsSUFBQSxDQUFBLFVBQUEsQ0FBQSxHQUFBLFVBQUEsR0FBQSxVQUFBLEdBQ2dDLElBRGhDO0FBR0E7O0FBSUgsUUFBQSxpQkFBQSxHQUFBLEdBQUEsR0FBQSxHQUFBLEdBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUE7O0FBSUEsUUFBQSxTQUFBLEtBQUEsa0JBQUEsRUFDRTtBQUtGLE1BQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQTtBQUNHLFFBQUEsR0FBRSxFQUFJLEdBRFQ7QUFFSSxRQUFBLElBQUksRUFBQyxJQUZUO0FBR0ksUUFBQSxJQUFJLEVBQUUsTUFIVjtBQUlJLFFBQUEsT0FBTyxFQUFBLE9BSlg7QUFLSSxRQUFBLFFBQVEsRUFBQyxNQUxiO0FBTUksUUFBQSxTQUFTLEVBQUU7QUFDWCxVQUFBLGVBQVksRUFBQTtBQURELFNBTmY7QUFTSSxRQUFBLE9BQUUsRUFBQSxpQkFBQSxJQUFBLEVBQUE7QUFFTixjQUFBLElBQUEsR0FBQSxNQUFBLENBQUEsS0FBQSxDQUFBLG9CQUFBLEVBQUEsSUFBQSxDQUFBO0FBQ0ssY0FBTSxLQUFLLEdBQUUsTUFBTyxDQUFBLEtBQVAsQ0FBWSxxQkFBWixFQUFtQyxJQUFuQyxDQUFiOztBQUVMLGNBQUEsS0FBQSxDQUFBLE1BQUEsS0FBQSxDQUFBLEVBQ0s7QUFDQyxZQUFBLE1BQUEsQ0FBQSxXQUFBLENBQUEsT0FBQSxFQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsaUJBQUEsQ0FBQTtBQUNBLFdBSE4sTUFLSztBQUNDLFlBQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQSxJQUFBLEVBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQSxpQkFBQSxDQUFBO0FBQ0E7QUFDRCxTQXRCTDtBQXVCSSxRQUFBLEtBQUUsRUFBQSxlQUFBLEtBQUEsRUFBQSxVQUFBLEVBQUE7QUFFTixjQUFBLFVBQUEsS0FBQSxPQUFBLEVBQ0s7QUFDQyxZQUFBLFVBQUEsR0FBQSxpQ0FBQTtBQUNBOztBQUVOLGNBQUEsVUFBQSxLQUFBLGFBQUEsRUFDSztBQUNDLFlBQUEsVUFBQSxHQUFBLGtDQUFBO0FBQ0E7O0FBRU4sY0FBQSxJQUFBLEdBQUE7QUFBQSwwQkFBQSxDQUFBO0FBQUEsdUJBQUEsQ0FBQTtBQUFBLHFCQUFBO0FBQUEsZUFBQTtBQUFBLGFBQUE7QUFBQSxXQUFBO0FBRUEsVUFBQSxNQUFBLENBQUEsVUFBQSxDQUFBLE9BQUEsRUFBQSxDQUFBLElBQUEsRUFBQSxVQUFBLEVBQUEsaUJBQUEsQ0FBQTtBQUNLO0FBdENMLE9BQUE7QUEwQ0csS0FoREgsTUFnREc7QUFLSCxNQUFBLENBQUEsQ0FBQSxJQUFBLENBQUE7QUFDRyxRQUFBLEdBQUUsRUFBSSxHQURUO0FBRUksUUFBQSxJQUFJLEVBQUMsSUFGVDtBQUdJLFFBQUEsSUFBSSxFQUFFLE1BSFY7QUFJSSxRQUFBLE9BQU8sRUFBQSxPQUpYO0FBS0ksUUFBQSxRQUFRLEVBQUMsTUFMYjtBQU1JLFFBQUEsU0FBUyxFQUFFO0FBQ1gsVUFBQSxlQUFZLEVBQUE7QUFERCxTQU5mO0FBU0ksUUFBQSxPQUFFLEVBQUEsaUJBQUEsSUFBQSxFQUFBO0FBRU4sVUFBQSxNQUFBLENBQUEsV0FBQSxDQUFBLE9BQUEsRUFBQSxDQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsaUJBQUEsQ0FBQTtBQUNLLFNBWkw7QUFhSSxRQUFBLEtBQUUsRUFBQSxlQUFBLEtBQUEsRUFBQSxVQUFBLEVBQUE7QUFFTixjQUFBLFVBQUEsS0FBQSxPQUFBLEVBQ0s7QUFDQyxZQUFBLFVBQUEsR0FBQSxpQ0FBQTtBQUNBOztBQUVOLFVBQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQSxVQUFBLEVBQUEsVUFBQSxFQUFBLGlCQUFBLENBQUE7QUFDSztBQXJCTCxPQUFBO0FBeUJHOztBQUlILFdBQUEsTUFBQSxDQUFBLE9BQUEsRUFBQTtBQUNFLEdBckpGO0FBaUtBLEVBQUEsU0FBQSxFQUFBLG1CQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxFQUNDO0FBQ0MsUUFBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLFFBQUEsRUFBQTs7QUFERCw0QkFHRCxTQUFBLENBQUEsS0FBQSxDQUNFLENBQUEsU0FBQSxDQURGLEVBRUcsQ0FBQSxNQUFBLENBRkgsRUFHRyxRQUhILENBSEM7QUFBQSxRQUdELE9BSEM7O0FBV0QsU0FBQSxPQUFBLENBQUEsOEJBQUEsU0FBQSxDQUFBLFlBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxjQUFBLEdBQUEsU0FBQSxDQUFBLFlBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLFVBQUEsRUFBQTtBQUFBLEtBQUEsRUFBQSxJQUFBLENBQUEsVUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO0FBRUEsVUFBQSxRQUFBLEdBQUEsRUFBQTtBQUNHLFVBQU0sUUFBUSxHQUFHLEVBQWpCO0FBQ0EsVUFBTSxPQUFBLEdBQVUsRUFBaEI7QUFDQSxVQUFNLE9BQU8sR0FBRyxFQUFoQjtBQUVILE1BQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxxQ0FBQSxFQUFBLElBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxJQUFBLEVBQUE7QUFFQSxRQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBO0FBQ0ksT0FISjtBQUtBLE1BQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxvQ0FBQSxFQUFBLElBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxJQUFBLEVBQUE7QUFFQSxRQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBO0FBQ0ksT0FISjtBQUtBLE1BQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxvQ0FBQSxFQUFBLElBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxJQUFBLEVBQUE7QUFFQSxRQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBO0FBQ0ksT0FISjtBQUtBLE1BQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSwrQkFBQSxFQUFBLElBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFFQSxZQUFBLElBQUEsR0FBQSxFQUFBO0FBQ0ksWUFBSSxJQUFNLEdBQUMsRUFBWDtBQUVKLFFBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsVUFBQSxLQUFBLEVBQUE7QUFFQSxVQUFBLElBQUEsQ0FBQSxLQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxDQUFBOztBQUVBLGNBQUEsS0FBQSxDQUFBLE9BQUEsQ0FBQSxLQUFBLE1BQUEsRUFDSztBQUNDLFlBQUEsSUFBQSxHQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUE7QUFDQTtBQUNELFNBUkw7QUFVQSxRQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxJQUFBO0FBQ0ksT0FoQko7QUFrQkEsTUFBQSxNQUFBLENBQUEsV0FBQSxDQUFBLE9BQUEsRUFBQSxDQUFBLElBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxDQUFBO0FBRUEsS0ExQ0EsRUEwQ0EsVUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO0FBRUEsTUFBQSxNQUFBLENBQUEsVUFBQSxDQUFBLE9BQUEsRUFBQSxDQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7QUFBQSxRQUFBLE9BQUEsRUFBQSxPQUFBO0FBQUEsUUFBQSxTQUFBLEVBQUE7QUFBQSxPQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBQUE7QUFDRyxLQTdDSDtBQWlEQSxXQUFBLE1BQUEsQ0FBQSxPQUFBLEVBQUE7QUFDRSxHQS9ORjtBQXlPQSxFQUFBLFNBQUEsRUFBQSxtQkFBQSxRQUFBLEVBQ0M7QUFDQyxRQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsUUFBQSxFQUFBOztBQURELDRCQUdELFNBQUEsQ0FBQSxLQUFBLENBQ0UsQ0FBQSxTQUFBLENBREYsRUFFRyxDQUFBLE1BQUEsQ0FGSCxFQUdHLFFBSEgsQ0FIQztBQUFBLFFBR0QsT0FIQzs7QUFXRCxTQUFBLE9BQUEsQ0FBQSxnQkFBQSxFQUFBLElBQUEsQ0FBQSxVQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7QUFFQSxVQUFBLFFBQUEsR0FBQSxFQUFBO0FBQ0csVUFBTSxRQUFRLEdBQUcsRUFBakI7QUFDQSxVQUFNLE9BQUEsR0FBVSxFQUFoQjtBQUNBLFVBQU0sT0FBTyxHQUFHLEVBQWhCO0FBRUgsTUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLHFDQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLElBQUEsRUFBQTtBQUVBLFFBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFDSSxPQUhKO0FBS0EsTUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLG9DQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLElBQUEsRUFBQTtBQUVBLFFBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFDSSxPQUhKO0FBS0EsTUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLG9DQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLElBQUEsRUFBQTtBQUVBLFFBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFDSSxPQUhKO0FBS0EsTUFBQSxNQUFBLENBQUEsS0FBQSxDQUFBLCtCQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUVBLFlBQUEsSUFBQSxHQUFBLEVBQUE7QUFDSSxZQUFJLElBQU0sR0FBQyxFQUFYO0FBRUosUUFBQSxHQUFBLENBQUEsS0FBQSxDQUFBLE9BQUEsQ0FBQSxVQUFBLEtBQUEsRUFBQTtBQUVBLFVBQUEsSUFBQSxDQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUE7O0FBRUEsY0FBQSxLQUFBLENBQUEsT0FBQSxDQUFBLEtBQUEsTUFBQSxFQUNLO0FBQ0MsWUFBQSxJQUFBLEdBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUNBO0FBQ0QsU0FSTDtBQVVBLFFBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLElBQUE7QUFDSSxPQWhCSjtBQWtCQSxNQUFBLE1BQUEsQ0FBQSxXQUFBLENBQUEsT0FBQSxFQUFBLENBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLENBQUE7QUFFQSxLQTFDQSxFQTBDQSxVQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7QUFFQSxNQUFBLE1BQUEsQ0FBQSxVQUFBLENBQUEsT0FBQSxFQUFBLENBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtBQUFBLFFBQUEsT0FBQSxFQUFBLE9BQUE7QUFBQSxRQUFBLFNBQUEsRUFBQTtBQUFBLE9BQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQTtBQUNHLEtBN0NIO0FBaURBLFdBQUEsTUFBQSxDQUFBLE9BQUEsRUFBQTtBQUNFLEdBdlNGO0FBaVRBLEVBQUEsTUFBQSxFQUFBLGdCQUFBLFFBQUEsRUFDQztBQUNDLFFBQUEsTUFBQSxHQUFBLENBQUEsQ0FBQSxRQUFBLEVBQUE7O0FBREQsNEJBR0QsU0FBQSxDQUFBLEtBQUEsQ0FDRSxDQUFBLFNBQUEsQ0FERixFQUVHLENBQUEsTUFBQSxDQUZILEVBR0csUUFISCxDQUhDO0FBQUEsUUFHRCxPQUhDOztBQVdELFNBQUEsT0FBQSxDQUFBLHdDQUFBLEVBQUE7QUFBQSxNQUFBLFVBQUEsRUFBQTtBQUFBLEtBQUEsRUFBQSxJQUFBLENBQUEsVUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO0FBRUEsVUFBQSxRQUFBLEdBQUEsRUFB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QSxDQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsZUFBQSxFQUFBO0FBSUEsSUFBQSxTQUFBLENBQUEsSUFBQTtBQUVBLElBQUEsVUFBQSxDQUFBLFVBQUEsQ0FBQSxLQUFBLElBQUEsRUFBQSxNQUFBLENBQUEsVUFBQSxDQUFBLEVBQUEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxFQUFBLElBQUEsQ0FBQSxVQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7QUFFQSxNQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsT0FBQTtBQUVBLEtBSkEsRUFJQSxVQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7QUFFQSxNQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsT0FBQTtBQUNHLEtBUEg7QUFVRTtBQS83QkYsQ0FBQSxDQUFBOzs7Ozs7Ozs7Ozs7QUNNQSxJQUFBLE1BQUEsR0FBQTtBQUFBLGVBQUEsQ0FBQTtBQUFBLFlBQUEsZUFBQTtBQUFBLFlBQUEsd0JBQUE7QUFBQSxjQUFBLENBQUE7QUFBQSxjQUFBLE9BQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLG9CQUFBO0FBQUEsaUJBQUEsRUFBQTtBQUFBLGtCQUFBLEVBQUE7QUFBQSxrQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsb0JBQUE7QUFBQSxpQkFBQSxFQUFBO0FBQUEsa0JBQUEsSUFBQTtBQUFBLGtCQUFBO0FBQUEsS0FBQTtBQUFBLEdBQUEsRUFBQTtBQUFBLFlBQUEsZUFBQTtBQUFBLFlBQUEsd0JBQUE7QUFBQSxjQUFBLENBQUE7QUFBQSxjQUFBLE9BQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLG9CQUFBO0FBQUEsaUJBQUEsRUFBQTtBQUFBLGtCQUFBLEVBQUE7QUFBQSxrQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsb0JBQUE7QUFBQSxpQkFBQSxFQUFBO0FBQUEsa0JBQUEsSUFBQTtBQUFBLGtCQUFBO0FBQUEsS0FBQTtBQUFBLEdBQUEsRUFBQTtBQUFBLFlBQUEsV0FBQTtBQUFBLFlBQUEsb0JBQUE7QUFBQSxjQUFBLENBQUE7QUFBQSxjQUFBLE9BQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLGdCQUFBO0FBQUEsaUJBQUEsRUFBQTtBQUFBLGtCQUFBLEVBQUE7QUFBQSxrQkFBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsZ0JBQUE7QUFBQSxpQkFBQSxFQUFBO0FBQUEsa0JBQUEsSUFBQTtBQUFBLGtCQUFBO0FBQUEsS0FBQTtBQUFBLEdBQUEsQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxZQUFBLFdBQUE7QUFBQSxZQUFBLCtCQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGNBQUEsY0FBQTtBQUFBLGNBQUEsMkJBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGNBQUE7QUFBQSxjQUFBLHFCQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxjQUFBO0FBQUEsY0FBQSxxQkFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsd0NBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLGtEQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxnQkFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsd0JBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsYUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsV0FBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsNEJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxXQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxPQUFBO0FBQUEsY0FBQSxvREFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsb0JBQUE7QUFBQSxjQUFBLDRCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsY0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGlCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxxQkFBQTtBQUFBLGNBQUEsbUNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxjQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsaUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBO0FBQUEsR0FBQSxFQUFBO0FBQUEsWUFBQSxXQUFBO0FBQUEsWUFBQSwwQkFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsTUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLE1BQUE7QUFBQSxjQUFBLGdCQUFBO0FBQUEsY0FBQTtBQUFBLEtBQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLHdEQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSxzRkFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsNENBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxzQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsWUFBQTtBQUFBLGNBQUEsOENBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxvQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsY0FBQTtBQUFBLGNBQUEseURBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxzQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsY0FBQTtBQUFBLGNBQUEsMkRBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxvQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsY0FBQTtBQUFBLGNBQUEseURBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxzQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsY0FBQTtBQUFBLGNBQUEsMkRBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxvQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsMkNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxzQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsNkNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxvQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsY0FBQTtBQUFBLGNBQUEsNkJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxvQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsY0FBQTtBQUFBLGNBQUEsNkJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxvQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsZUFBQTtBQUFBLGNBQUEsNkNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLENBQUEsT0FBQSxFQUFBLFFBQUEsQ0FBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLGlDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLENBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxhQUFBO0FBQUEsY0FBQSxpQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsUUFBQSxDQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsaUNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLENBQUEsT0FBQSxFQUFBLFFBQUEsQ0FBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFVBQUE7QUFBQSxjQUFBLGdDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLENBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSxpQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsUUFBQSxDQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsaUNBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLENBQUEsT0FBQSxFQUFBLFFBQUEsQ0FBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLGlDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLENBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxhQUFBO0FBQUEsY0FBQSwyR0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHFCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsbUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSx1REFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsK0dBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxxQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLG1CQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsdURBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLDhHQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEscUJBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxtQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHVEQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSx5RkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGlCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxDQUFBLFFBQUEsRUFBQSxPQUFBLENBQUE7QUFBQSxnQkFBQSxnQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLHlCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSxrRkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxNQUFBO0FBQUEsY0FBQSwyQkFBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSw2QkFBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSx3QkFBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxhQUFBO0FBQUEsY0FBQSwwQkFBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxVQUFBO0FBQUEsY0FBQSw4R0FBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxhQUFBO0FBQUEsY0FBQSwrR0FBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxNQUFBO0FBQUEsY0FBQSx5QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBO0FBQUEsZ0JBQUEsYUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLDJDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLDJCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxDQUFBLFFBQUEsRUFBQSxPQUFBLENBQUE7QUFBQSxnQkFBQSxhQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsMkNBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsMkJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLENBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQTtBQUFBLGdCQUFBLGFBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSwyQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxPQUFBO0FBQUEsY0FBQSwwQkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBO0FBQUEsZ0JBQUEsYUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLDJDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLE9BQUE7QUFBQSxjQUFBLGtCQUFBO0FBQUEsZ0JBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGdCQUFBO0FBQUEsY0FBQSwwQkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLE9BQUE7QUFBQSxjQUFBLDRCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEscVFBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsZ0NBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSwyQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxlQUFBO0FBQUEsY0FBQSxpQ0FBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEscUJBQUE7QUFBQSxjQUFBLDZDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLHVCQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsaUJBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxnQkFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLDBCQUFBO0FBQUEsY0FBQSxnREFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSx1QkFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLGlCQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsZ0JBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLDBCQUFBO0FBQUEsY0FBQSxnRUFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLEtBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsT0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLElBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsS0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxnQkFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxLQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLCtCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsR0FBQTtBQUFBLGdCQUFBLGVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsaUJBQUE7QUFBQSxjQUFBLHVCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLGVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsNkRBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsaUJBQUE7QUFBQSxnQkFBQSxHQUFBO0FBQUEsZ0JBQUEsa0VBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLENBQUE7QUFBQSxjQUFBLENBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLDhFQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxXQUFBO0FBQUEsY0FBQSxtRkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUE7QUFBQSxHQUFBLEVBQUE7QUFBQSxZQUFBLFlBQUE7QUFBQSxZQUFBLDJCQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGNBQUEsVUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBO0FBQUEsS0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEseUJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxhQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsd0ZBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLDJCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGNBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsV0FBQTtBQUFBLGNBQUEsd0JBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsVUFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSx3QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxjQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLHdCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGNBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxJQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsWUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsaUJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsY0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxXQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGdCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsZUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFdBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBQSxnQ0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxPQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLHFDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLGlDQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFdBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsZ0JBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxlQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLE9BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsV0FBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSw4QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxNQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxrQkFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtCQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsRUFBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsa0NBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsSUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQSxDQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFlBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFdBQUE7QUFBQSxjQUFBLDZCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBLEVBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBLGtDQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLElBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxZQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQTtBQUFBLEdBQUEsRUFBQTtBQUFBLFlBQUEsVUFBQTtBQUFBLFlBQUEsa0NBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsY0FBQSxhQUFBO0FBQUEsY0FBQSwyQkFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsMkJBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFlBQUE7QUFBQSxjQUFBLDJDQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSxxQ0FBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsdUJBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFVBQUE7QUFBQSxjQUFBLHFCQUFBO0FBQUEsZ0JBQUEsRUFBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxRQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxhQUFBO0FBQUEsY0FBQSxvQkFBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsUUFBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsYUFBQTtBQUFBLGNBQUEsb0JBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLGlCQUFBO0FBQUEsY0FBQSwwQ0FBQTtBQUFBLGdCQUFBLEVBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsNENBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsTUFBQTtBQUFBLGdCQUFBLFFBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUEsQ0FBQTtBQUFBLGlCQUFBLENBQUE7QUFBQSxnQkFBQSxTQUFBO0FBQUEsZ0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxLQUFBO0FBQUEsY0FBQSw4QkFBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxRQUFBO0FBQUEsY0FBQSxpQ0FBQTtBQUFBLGdCQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxZQUFBO0FBQUEsY0FBQSxz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QUFBQSxnQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLHlDQUFBO0FBQUEsZ0JBQUE7QUFBQSxLQUFBO0FBQUEsR0FBQSxFQUFBO0FBQUEsWUFBQSxhQUFBO0FBQUEsWUFBQSxtQ0FBQTtBQUFBLGtCQUFBLEVBQUE7QUFBQSxnQkFBQSxFQUFBO0FBQUEsaUJBQUEsQ0FBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQUEsaURBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLEdBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFFBQUE7QUFBQSxjQUFBLGtEQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxHQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSx3QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsR0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsVUFBQTtBQUFBLGNBQUEseUJBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLEdBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBO0FBQUEsR0FBQSxDQUFBO0FBQUEsYUFBQSxDQUFBO0FBQUEsWUFBQSxhQUFBO0FBQUEsWUFBQSx1QkFBQTtBQUFBLGtCQUFB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QTtBQUFBLEtBQUE7QUFBQSxpQkFBQSxDQUFBO0FBQUEsY0FBQSxTQUFBO0FBQUEsY0FBQSxpREFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsR0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUEsRUFBQTtBQUFBLGNBQUEsUUFBQTtBQUFBLGNBQUEsa0RBQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLGdCQUFBLEdBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsbUJBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUE7QUFBQSxvQkFBQTtBQUFBLE9BQUE7QUFBQSxLQUFBLEVBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFBLHdCQUFBO0FBQUEsZ0JBQUEsQ0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxnQkFBQSxHQUFBO0FBQUEsZ0JBQUEsVUFBQTtBQUFBLG1CQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBO0FBQUEsb0JBQUE7QUFBQSxPQUFBO0FBQUEsS0FBQSxFQUFBO0FBQUEsY0FBQSxVQUFBO0FBQUEsY0FBQSx5QkFBQTtBQUFBLGdCQUFBLENBQUE7QUFBQSxnQkFBQSxVQUFBO0FBQUEsZ0JBQUEsR0FBQTtBQUFBLGdCQUFBLFVBQUE7QUFBQSxtQkFBQSxFQUFBO0FBQUEsb0JBQUEsRUFBQTtBQUFBLG9CQUFBO0FBQUEsT0FBQTtBQUFBLEtBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXt7WUVBUn19IFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbnZhciBhbWlUd2lnID0ge1xuXHR2ZXJzaW9uOiAnMS4xLjAnXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGV4cG9ydHMuYW1pVHdpZyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmlmKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJylcbntcblx0YW1pVHdpZy5mcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cblx0bW9kdWxlLmV4cG9ydHMuYW1pVHdpZyA9IGFtaVR3aWc7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRva2VuaXplciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRva2VuaXplciA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0b2tlbml6ZTogZnVuY3Rpb24oY29kZSwgbGluZSwgc3BhY2VzLCB0b2tlbkRlZnMsIHRva2VuVHlwZXMsIGVycm9yKVxuXHR7XG5cdFx0aWYodG9rZW5EZWZzLmxlbmd0aCAhPT0gdG9rZW5UeXBlcy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2B0b2tlbkRlZnMubGVuZ3RoICE9IHRva2VuVHlwZXMubGVuZ3RoYCc7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVzdWx0X3Rva2VucyA9IFtdO1xuXHRcdGNvbnN0IHJlc3VsdF90eXBlcyA9IFtdO1xuXHRcdGNvbnN0IHJlc3VsdF9saW5lcyA9IFtdO1xuXG5cdFx0bGV0IGkgPSAweDAwMDAwMDAwMDtcblx0XHRjb25zdCBsID0gY29kZS5sZW5ndGg7XG5cblx0XHRsZXQgd29yZCA9ICcnLCB0b2tlbiwgYztcblxuX19sMDpcdFx0d2hpbGUoaSA8IGwpXG5cdFx0e1xuXHRcdFx0YyA9IGNvZGUuY2hhckF0KDApO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIENPVU5UIExJTkVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKGMgPT09ICdcXG4nKVxuXHRcdFx0e1xuXHRcdFx0XHRsaW5lKys7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRUFUIFNQQUNFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYoc3BhY2VzLmluZGV4T2YoYykgPj0gMClcblx0XHRcdHtcblx0XHRcdFx0aWYod29yZClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdpbnZhbGlkIHRva2VuIGAnICsgd29yZCArICdgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2goLTEpO1xuXHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdHdvcmQgPSAnJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZygxKTtcblx0XHRcdFx0aSArPSAxO1xuXG5cdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRUFUIFJFR0VYRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Zm9yKGNvbnN0IGogaW4gdG9rZW5EZWZzKVxuXHRcdFx0e1xuXHRcdFx0XHR0b2tlbiA9IHRoaXMuX21hdGNoKGNvZGUsIHRva2VuRGVmc1tqXSk7XG5cblx0XHRcdFx0aWYodG9rZW4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZih3b3JkKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh3b3JkKTtcblx0XHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdFx0d29yZCA9ICcnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh0b2tlbik7XG5cdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2godG9rZW5UeXBlc1tqXSk7XG5cdFx0XHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG5cblx0XHRcdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcodG9rZW4ubGVuZ3RoKTtcblx0XHRcdFx0XHRpICs9IHRva2VuLmxlbmd0aDtcblxuXHRcdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFQVQgUkVNQUlOSU5HIENIQVJBQ1RFUkVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR3b3JkICs9IGM7XG5cblx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZygxKTtcblx0XHRcdGkgKz0gMTtcblxuLypcdFx0XHRjb250aW51ZSBfX2wwO1xuICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHRpZih3b3JkKVxuXHRcdHtcblx0XHRcdGlmKGVycm9yKVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh3b3JkKTtcblx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuLypcdFx0XHR3b3JkID0gJyc7XG4gKi9cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHRva2VuczogcmVzdWx0X3Rva2Vucyxcblx0XHRcdHR5cGVzOiByZXN1bHRfdHlwZXMsXG5cdFx0XHRsaW5lczogcmVzdWx0X2xpbmVzLFxuXHRcdH07XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfbWF0Y2g6IGZ1bmN0aW9uKHMsIHN0cmluZ09yUmVnRXhwKVxuXHR7XG5cdFx0bGV0IG07XG5cblx0XHRpZihzdHJpbmdPclJlZ0V4cCBpbnN0YW5jZW9mIFJlZ0V4cClcblx0XHR7XG5cdFx0XHRtID0gcy5tYXRjaChzdHJpbmdPclJlZ0V4cCk7XG5cblx0XHRcdHJldHVybiBtICE9PSBudWxsICYmIHRoaXMuX2NoZWNrTmV4dENoYXIocywgLyotKi9tWzBdLyotKi8pID8gLyotKi9tWzBdLyotKi8gOiBudWxsO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0bSA9IHMuaW5kZXhPZihzdHJpbmdPclJlZ0V4cCk7XG5cblx0XHRcdHJldHVybiBtID09PSAweDAwICYmIHRoaXMuX2NoZWNrTmV4dENoYXIocywgc3RyaW5nT3JSZWdFeHApID8gc3RyaW5nT3JSZWdFeHAgOiBudWxsO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9hbG51bTogW1xuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSxcblx0XHQxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAxLFxuXHRcdDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsXG5cdFx0MSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdF0sXG5cblx0X2NoZWNrTmV4dENoYXI6IGZ1bmN0aW9uKHMsIHRva2VuKVxuXHR7XG5cdFx0Y29uc3QgbGVuZ3RoID0gdG9rZW4ubGVuZ3RoO1xuXG5cdFx0Y29uc3QgY2hhckNvZGUyID0gcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDApO1xuXHRcdGNvbnN0IGNoYXJDb2RlMSA9IHMuY2hhckNvZGVBdChsZW5ndGggLSAxKTtcblxuXHRcdHJldHVybiBpc05hTihjaGFyQ29kZTIpXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHRoaXMuX2FsbnVtW2NoYXJDb2RlMl0gPT09IDBcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdGhpcy5fYWxudW1bY2hhckNvZGUxXSA9PT0gMFxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwciA9IHt9O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci50b2tlbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci50b2tlbnMgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBDT01QT1NJVEUgVE9LRU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5JU19YWFggPSBbXG5cdFx0XHR0aGlzLkRFRklORUQsXG5cdFx0XHR0aGlzLk5VTEwsXG5cdFx0XHR0aGlzLkVNUFRZLFxuXHRcdFx0dGhpcy5JVEVSQUJMRSxcblx0XHRcdHRoaXMuRVZFTixcblx0XHRcdHRoaXMuT0RELFxuXHRcdF07XG5cblx0XHR0aGlzLlhYWF9XSVRIID0gW1xuXHRcdFx0dGhpcy5TVEFSVFNfV0lUSCxcblx0XHRcdHRoaXMuRU5EU19XSVRILFxuXHRcdF07XG5cblx0XHR0aGlzLlBMVVNfTUlOVVMgPSBbXG5cdFx0XHR0aGlzLkNPTkNBVCxcblx0XHRcdHRoaXMuUExVUyxcblx0XHRcdHRoaXMuTUlOVVMsXG5cdFx0XTtcblxuXHRcdHRoaXMuTVVMX0ZMRElWX0RJVl9NT0QgPSBbXG5cdFx0XHR0aGlzLk1VTCxcblx0XHRcdHRoaXMuRkxESVYsXG5cdFx0XHR0aGlzLkRJVixcblx0XHRcdHRoaXMuTU9ELFxuXHRcdF07XG5cblx0XHR0aGlzLlJYID0gW1xuXHRcdFx0dGhpcy5SUCxcblx0XHRcdHRoaXMuUkIxLFxuXHRcdF07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUkVBTCBUT0tFTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRMT0dJQ0FMX09SOiAxMDAsXG5cdExPR0lDQUxfQU5EOiAxMDEsXG5cdEJJVFdJU0VfT1I6IDEwMixcblx0QklUV0lTRV9YT1I6IDEwMyxcblx0QklUV0lTRV9BTkQ6IDEwNCxcblx0Tk9UOiAxMDUsXG5cdElTOiAxMDYsXG5cdERFRklORUQ6IDEwNyxcblx0TlVMTDogMTA4LFxuXHRFTVBUWTogMTA5LFxuXHRJVEVSQUJMRTogMTEwLFxuXHRFVkVOOiAxMTEsXG5cdE9ERDogMTEyLFxuXHRDTVBfT1A6IDExMyxcblx0U1RBUlRTX1dJVEg6IDExNCxcblx0RU5EU19XSVRIOiAxMTUsXG5cdE1BVENIRVM6IDExNixcblx0SU46IDExNyxcblx0UkFOR0U6IDExOCxcblx0Q09OQ0FUOiAxMTksXG5cdFBMVVM6IDEyMCxcblx0TUlOVVM6IDEyMSxcblx0UE9XRVI6IDEyMixcblx0TVVMOiAxMjMsXG5cdEZMRElWOiAxMjQsXG5cdERJVjogMTI1LFxuXHRNT0Q6IDEyNixcbiBcdERPVUJMRV9RVUVTVElPTjogMTI3LFxuIFx0UVVFU1RJT046IDEyOCxcblx0Q09MT046IDEyOSxcblx0RE9UOiAxMzAsXG5cdENPTU1BOiAxMzEsXG5cdFBJUEU6IDEzMixcblx0TFA6IDEzMyxcblx0UlA6IDEzNCxcblx0TEIxOiAxMzUsXG5cdFJCMTogMTM2LFxuXHRMQjI6IDEzNyxcblx0UkIyOiAxMzgsXG5cdFNJRDogMTM5LFxuXHRURVJNSU5BTDogMTQwLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFZJUlRVQUwgVE9LRU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0TFNUOiAyMDAsXG5cdERJQzogMjAxLFxuXHRGVU46IDIwMixcblx0VkFSOiAyMDMsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIudG9rZW5zLiRpbml0KCk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLlRva2VuaXplciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLlRva2VuaXplciA9IGZ1bmN0aW9uKGNvZGUsIGxpbmUpIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLl9zcGFjZXMgPSBbJyAnLCAnXFx0JywgJ1xcbicsICdcXHInXTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuX3Rva2VuRGVmcyA9IFtcblx0XHQnb3InLFxuXHRcdCdhbmQnLFxuXHRcdCdiLW9yJyxcblx0XHQnYi14b3InLFxuXHRcdCdiLWFuZCcsXG5cdFx0J25vdCcsXG5cdFx0J2lzJyxcblx0XHQnZGVmaW5lZCcsXG5cdFx0J251bGwnLFxuXHRcdCdlbXB0eScsXG5cdFx0J2l0ZXJhYmxlJyxcblx0XHQnZXZlbicsXG5cdFx0J29kZCcsXG5cdFx0Jz09PScsXG5cdFx0Jz09Jyxcblx0XHQnIT09Jyxcblx0XHQnIT0nLFxuXHRcdCc8PScsXG5cdFx0Jz49Jyxcblx0XHQnPCcsXG5cdFx0Jz4nLFxuXHRcdC9ec3RhcnRzXFxzK3dpdGgvLFxuXHRcdC9eZW5kc1xccyt3aXRoLyxcblx0XHQnbWF0Y2hlcycsXG5cdFx0J2luJyxcblx0XHQnLi4nLFxuXHRcdCd+Jyxcblx0XHQnKycsXG5cdFx0Jy0nLFxuXHRcdCcqKicsXG5cdFx0JyonLFxuXHRcdCcvLycsXG5cdFx0Jy8nLFxuXHRcdCclJyxcblx0XHQnPz8nLFxuXHRcdCc/Jyxcblx0XHQnOicsXG5cdFx0Jy4nLFxuXHRcdCcsJyxcblx0XHQnfCcsXG5cdFx0JygnLFxuXHRcdCcpJyxcblx0XHQnWycsXG5cdFx0J10nLFxuXHRcdCd7Jyxcblx0XHQnfScsXG5cdFx0J3RydWUnLFxuXHRcdCdmYWxzZScsXG5cdFx0L15bMC05XStcXC5bMC05XSsvLFxuXHRcdC9eWzAtOV0rLyxcblx0XHQvXicoXFxcXCd8W14nXSkqJy8sXG5cdFx0L15cIihcXFxcXCJ8W15cIl0pKlwiLyxcblx0XHQvXlthLXpBLVpfJF1bYS16QS1aMC05XyRdKi8sXG5cdF07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLl90b2tlblR5cGVzID0gW1xuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfQU5ELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfWE9SLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9BTkQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5OT1QsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5JUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRFRklORUQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5OVUxMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRU1QVFksXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5JVEVSQUJMRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkVWRU4sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5PREQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5TVEFSVFNfV0lUSCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkVORFNfV0lUSCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1BVENIRVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5JTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJBTkdFLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ09OQ0FULFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUExVUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1JTlVTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVIsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NVUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5GTERJVixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRJVixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1PRCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRPVUJMRV9RVUVTVElPTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlFVRVNUSU9OLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ09MT04sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ET1QsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DT01NQSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBJUEUsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJQLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTEIxLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUkIxLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTEIyLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUkIyLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuU0lELFxuXHRdO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy4kaW5pdCA9IGZ1bmN0aW9uKGNvZGUsIGxpbmUpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCByZXN1bHQgPSBhbWlUd2lnLnRva2VuaXplci50b2tlbml6ZShcblx0XHRcdGNvZGUsXG5cdFx0XHRsaW5lLFxuXHRcdFx0dGhpcy5fc3BhY2VzLFxuXHRcdFx0dGhpcy5fdG9rZW5EZWZzLFxuXHRcdFx0dGhpcy5fdG9rZW5UeXBlcyxcblx0XHRcdHRydWVcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy50b2tlbnMgPSByZXN1bHQudG9rZW5zO1xuXHRcdHRoaXMudHlwZXMgPSByZXN1bHQudHlwZXM7XG5cblx0XHR0aGlzLmkgPSAwO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5uZXh0ID0gZnVuY3Rpb24obiA9IDEpXG5cdHtcblx0XHR0aGlzLmkgKz0gbjtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuaXNFbXB0eSA9IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmkgPj0gdGhpcy50b2tlbnMubGVuZ3RoO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5wZWVrVG9rZW4gPSBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50b2tlbnNbdGhpcy5pXTtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMucGVla1R5cGUgPSBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50eXBlc1t0aGlzLmldO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5jaGVja1R5cGUgPSBmdW5jdGlvbih0eXBlKVxuXHR7XG5cdFx0aWYodGhpcy5pIDwgdGhpcy50b2tlbnMubGVuZ3RoKVxuXHRcdHtcblx0XHRcdGNvbnN0IFRZUEUgPSB0aGlzLnR5cGVzW3RoaXMuaV07XG5cblx0XHRcdHJldHVybiAodHlwZSBpbnN0YW5jZW9mIEFycmF5KSA/ICh0eXBlLmluZGV4T2YoVFlQRSkgPj0gMCkgOiAodHlwZSA9PT0gVFlQRSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy4kaW5pdChjb2RlLCBsaW5lKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuQ29tcGlsZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuQ29tcGlsZXIgPSBmdW5jdGlvbihjb2RlLCBsaW5lKSB7XG5cblx0dGhpcy4kaW5pdChjb2RlLCBsaW5lKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuQ29tcGlsZXIucHJvdG90eXBlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihjb2RlLCBsaW5lKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy50b2tlbml6ZXIgPSBuZXcgYW1pVHdpZy5leHByLlRva2VuaXplcihcblx0XHRcdHRoaXMuY29kZSA9IGNvZGUsXG5cdFx0XHR0aGlzLmxpbmUgPSBsaW5lXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMucm9vdE5vZGUgPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmlzRW1wdHkoKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCB1bmV4cGVjdGVkIHRva2VuIGAnICsgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkgKyAnYCc7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZHVtcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucm9vdE5vZGUuZHVtcCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VOdWxsQ29hbGVzY2luZzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTG9naWNhbE9yKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE51bGxDb2FsZXNjaW5nIDogTG9naWNhbE9yICgnPz8nIExvZ2ljYWxPcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5ET1VCTEVfUVVFU1RJT04pKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VMb2dpY2FsT3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTG9naWNhbE9yOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VMb2dpY2FsQW5kKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIExvZ2ljYWxPciA6IExvZ2ljYWxBbmQgKCdvcicgTG9naWNhbEFuZCkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX09SKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTG9naWNhbEFuZCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VMb2dpY2FsQW5kOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VCaXR3aXNlT3IoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTG9naWNhbEFuZCA6IEJpdHdpc2VPciAoJ2FuZCcgQml0d2lzZU9yKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfQU5EKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQml0d2lzZU9yKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VPcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQml0d2lzZVhvcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBCaXR3aXNlT3IgOiBCaXR3aXNlWG9yICgnYi1vcicgQml0d2lzZVhvcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUJpdHdpc2VYb3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQml0d2lzZVhvcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQml0d2lzZUFuZCgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBCaXR3aXNlWG9yIDogQml0d2lzZUFuZCAoJ2IteG9yJyBCaXR3aXNlQW5kKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9YT1IpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VCaXR3aXNlQW5kKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VBbmQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZU5vdCgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBCaXR3aXNlQW5kIDogTm90ICgnYi1hbmQnIE5vdCkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9BTkQpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VOb3QoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTm90OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTm90IDogJ25vdCcgQ29tcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUNvbXAoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IG51bGw7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgIHwgQ29tcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiB0aGlzLnBhcnNlQ29tcCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VDb21wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VBZGRTdWIoKSwgcmlnaHQsIG5vZGUsIHN3YXA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQ29tcCA6IEFkZFN1YiAnaXMnICdub3QnPyAoJ2RlZmluZWQnIHwgJ251bGwnIHwgLi4uKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdC8qKi8gaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuSVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHQvKiBzd2FwICdpcycgYW5kICdub3QnICovXG5cdFx0XHRzd2FwID0gbm9kZTtcblx0XHRcdC8qIHN3YXAgJ2lzJyBhbmQgJ25vdCcgKi9cblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSlcblx0XHRcdHtcblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHRcdFx0bm9kZS5ub2RlUmlnaHQgPSBzd2FwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JU19YWFgpKVxuXHRcdFx0e1xuXHRcdFx0XHRyaWdodCA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRzd2FwLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdFx0c3dhcC5ub2RlUmlnaHQgPSByaWdodDtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBrZXl3b3JkIGBkZWZpbmVkYCwgYG51bGxgLCBgZW1wdHlgLCBgaXRlcmFibGVgLCBgZXZlbmAgb3IgYG9kZGAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAoJz09PScgfCAnPT0nIHwgLi4uKSBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgKCdzdGFydHMnIHwgJ2VuZHMnKSBgd2l0aGAgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlhYWF9XSVRIKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgJ21hdGNoZXMnIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk1BVENIRVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAnaW4nIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuSU4pKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VBZGRTdWI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZU11bERpdigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBBZGRTdWIgOiBNdWxEaXYgKCgnKycgfCAnLScpIE11bERpdikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUExVU19NSU5VUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZU11bERpdigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VNdWxEaXY6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZVBsdXNNaW51cygpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBNdWxEaXYgOiBQbHVzTWludXMgKCgnKicgfCAnLy8nIHwgJy8nIHwgJyUnKSBQbHVzTWludXMpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTVVMX0ZMRElWX0RJVl9NT0QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VQbHVzTWludXMoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlUGx1c01pbnVzOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogUGx1c01pbnVzIDogKCctJyB8ICcrJykgUG93ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVNfTUlOVVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VQb3dlcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgICAgICAgfCBEb3QxICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHRoaXMucGFyc2VQb3dlcigpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VQb3dlcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlRmlsdGVyKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFBvd2VyIDogRmlsdGVyICgnKionIEZpbHRlcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QT1dFUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUZpbHRlcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VGaWx0ZXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZURvdDEoKSwgbm9kZSwgdGVtcDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBGaWx0ZXIgOiBEb3QxICgnfCcgRG90MSkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUElQRSkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRub2RlID0gdGhpcy5wYXJzZURvdDEodHJ1ZSk7XG5cblx0XHRcdGZvcih0ZW1wID0gbm9kZTsgdGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5ET1Q7IHRlbXAgPSB0ZW1wLm5vZGVMZWZ0KTtcblxuXHRcdFx0dGVtcC5saXN0LnVuc2hpZnQobGVmdCk7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VEb3QxOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGNvbnN0IG5vZGUgPSB0aGlzLnBhcnNlRG90Mihpc0ZpbHRlcik7XG5cblx0XHRpZihub2RlKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsZXQgdGVtcCA9IG5vZGU7XG5cblx0XHRcdGZvcig7IHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuRE9UOyB0ZW1wID0gdGVtcC5ub2RlTGVmdCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0ZW1wLnEpXG5cdFx0XHR7XG5cdFx0XHRcdC8qKi8gaWYodGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5GVU4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZih0ZW1wLm5vZGVWYWx1ZSBpbiBhbWlUd2lnLnN0ZGxpYilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9ICdhbWlUd2lnLnN0ZGxpYi4nICsgdGVtcC5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9IC8qLS0tKi8nXy4nLyotLS0qLyArIHRlbXAubm9kZVZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuVkFSKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAvKi0tLSovJ18uJy8qLS0tKi8gKyB0ZW1wLm5vZGVWYWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRlbXAucSA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHRyZXR1cm4gbm9kZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRG90MjogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VEb3QzKGlzRmlsdGVyKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogRG90MiA6IERvdDMgKCcuJyBEb3QzKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCAnLicpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VEb3QzKGlzRmlsdGVyKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRG90MzogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VYKGlzRmlsdGVyKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogRG90MyA6IFggKCdbJyBOdWxsQ29hbGVzY2luZyAnXScpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxCMSkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjEpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCwgJ1tdJyk7XG5cblx0XHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYF1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICAgICB8IFggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VYOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFggOiBHcm91cCB8IEFycmF5IHwgT2JqZWN0IHwgRnVuVmFyIHwgVGVybWluYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VHcm91cCgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlQXJyYXkoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZU9iamVjdCgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlRnVuVmFyKGlzRmlsdGVyKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZVRlcm1pbmFsKCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogU1lOVEFYIEVSUk9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgc3ludGF4IGVycm9yIG9yIHR1bmNhdGVkIGV4cHJlc3Npb24nO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VHcm91cDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogR3JvdXAgOiAnKCcgTnVsbENvYWxlc2NpbmcgJyknICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxQKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdG5vZGUgPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUlApKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYClgIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQXJyYXk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBub2RlLCBsaXN0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEFycmF5IDogJ1snIFNpbmdsZXRzICddJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MQjEpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0bGlzdCA9IHRoaXMuX3BhcnNlU2luZ2xldHMoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIxKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoYW1pVHdpZy5leHByLnRva2Vucy5MU1QsICdBcnJheScpO1xuXG5cdFx0XHRcdG5vZGUubGlzdCA9IGxpc3Q7XG5cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYF1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlT2JqZWN0OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbm9kZSwgZGljdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBPYmplY3QgOiAneycgRG91YmxldHMgJ30nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIyKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGRpY3QgPSB0aGlzLl9wYXJzZURvdWJsZXRzKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMikpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKGFtaVR3aWcuZXhwci50b2tlbnMuRElDLCAnT2JqZWN0Jyk7XG5cblx0XHRcdFx0bm9kZS5kaWN0ID0gZGljdDtcblxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgfWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VGdW5WYXI6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5TSUQpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoMCwgaXNGaWx0ZXIgPyAnZmlsdGVyXycgKyB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSA6IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblxuXHRcdFx0bm9kZS5xID0gdHJ1ZTtcblxuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZ1blZhciA6IFNJRCAnKCcgU2luZ2xldHMgJyknICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdC8qKi8gaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTFApKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gdGhpcy5fcGFyc2VTaW5nbGV0cygpO1xuXG5cdFx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJQKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRcdG5vZGUubm9kZVR5cGUgPSBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTjtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGApYCBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiAgICAgICAgfCBTSUQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdG5vZGUubm9kZVR5cGUgPSBpc0ZpbHRlciA/IGFtaVR3aWcuZXhwci50b2tlbnMuRlVOXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICA6IGFtaVR3aWcuZXhwci50b2tlbnMuVkFSXG5cdFx0XHRcdDtcblxuXHRcdFx0XHRub2RlLmxpc3QgPSBbXTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlU2luZ2xldHM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUlgpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aGlzLl9wYXJzZVNpbmdsZXQocmVzdWx0KTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ09NTUEpID09PSB0cnVlKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VEb3VibGV0czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0ge307XG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjIpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aGlzLl9wYXJzZURvdWJsZXQocmVzdWx0KTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ09NTUEpID09PSB0cnVlKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VTaW5nbGV0OiBmdW5jdGlvbihyZXN1bHQpXG5cdHtcblx0XHRyZXN1bHQucHVzaCh0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VEb3VibGV0OiBmdW5jdGlvbihyZXN1bHQpXG5cdHtcblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCkpXG5cdFx0e1xuXHRcdFx0Y29uc3Qga2V5ID0gdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTE9OKSlcblx0XHRcdHtcbi8qXHRcdFx0XHRjb25zdCBjb2xvbiA9IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpO1xuICovXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHRba2V5XSA9IHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYDpgIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgdGVybWluYWwgZXhwZWN0ZWQnO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlVGVybWluYWw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0LCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBUZXJtaW5hbCA6IFRFUk1JTkFMIHwgUkFOR0UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwpKVxuXHRcdHtcblx0XHRcdGxlZnQgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQU5HRSkpXG5cdFx0XHR7XG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmlnaHQgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gbGVmdDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuTm9kZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuTm9kZSA9IGZ1bmN0aW9uKG5vZGVUeXBlLCBub2RlVmFsdWUpIHtcblxuXHR0aGlzLiRpbml0KG5vZGVUeXBlLCBub2RlVmFsdWUpO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ob2RlLnByb3RvdHlwZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24obm9kZVR5cGUsIG5vZGVWYWx1ZSlcblx0e1xuXHRcdHRoaXMubm9kZVR5cGUgPSBub2RlVHlwZTtcblx0XHR0aGlzLm5vZGVWYWx1ZSA9IG5vZGVWYWx1ZTtcblx0XHR0aGlzLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHR0aGlzLm5vZGVSaWdodCA9IG51bGw7XG5cdFx0dGhpcy5saXN0ID0gbnVsbDtcblx0XHR0aGlzLmRpY3QgPSBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2R1bXA6IGZ1bmN0aW9uKG5vZGVzLCBlZGdlcywgcENudClcblx0e1xuXHRcdGxldCBDTlQ7XG5cblx0XHRjb25zdCBjbnQgPSBwQ250WzBdO1xuXG5cdFx0bm9kZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIFtsYWJlbD1cIicgKyB0aGlzLm5vZGVWYWx1ZS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCJdOycpO1xuXG5cdFx0aWYodGhpcy5ub2RlTGVmdClcblx0XHR7XG5cdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnOycpO1xuXHRcdFx0dGhpcy5ub2RlTGVmdC5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMubm9kZVJpZ2h0KVxuXHRcdHtcblx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICc7Jyk7XG5cdFx0XHR0aGlzLm5vZGVSaWdodC5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMubGlzdClcblx0XHR7XG5cdFx0XHRmb3IoY29uc3QgaSBpbiB0aGlzLmxpc3QpXG5cdFx0XHR7XG5cdFx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJyBbbGFiZWw9XCJbJyArIGkucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ11cIl07Jyk7XG5cdFx0XHRcdHRoaXMubGlzdFtpXS5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmKHRoaXMuZGljdClcblx0XHR7XG5cdFx0XHRmb3IoY29uc3QgaSBpbiB0aGlzLmRpY3QpXG5cdFx0XHR7XG5cdFx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJyBbbGFiZWw9XCJbJyArIGkucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ11cIl07Jyk7XG5cdFx0XHRcdHRoaXMuZGljdFtpXS5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGR1bXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IG5vZGVzID0gW107XG5cdFx0Y29uc3QgZWRnZXMgPSBbXTtcblxuXHRcdHRoaXMuX2R1bXAobm9kZXMsIGVkZ2VzLCBbMF0pO1xuXG5cdFx0cmV0dXJuICdkaWdyYXBoIGFzdCB7XFxuXFx0cmFua2Rpcj1UQjtcXG4nICsgbm9kZXMuam9pbignXFxuJykgKyAnXFxuJyArIGVkZ2VzLmpvaW4oJ1xcbicpICsgJ1xcbn0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy50bXBsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsID0ge307XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy50bXBsLkNvbXBpbGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsLkNvbXBpbGVyID0gZnVuY3Rpb24odG1wbCkge1xuXG5cdHRoaXMuJGluaXQodG1wbCk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsLkNvbXBpbGVyLnByb3RvdHlwZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRTVEFURU1FTlRfUkU6IC9cXHslXFxzKihbYS16QS1aXSspXFxzKigoPzoufFxcbikqPylcXHMqJVxcfS8sXG5cblx0Q09NTUVOVF9SRTogL1xceyNcXHMqKCg/Oi58XFxuKSo/KVxccyojXFx9L2csXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfY291bnQ6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRsZXQgcmVzdWx0ID0gMDtcblxuXHRcdGNvbnN0IGwgPSBzLmxlbmd0aDtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpKyspXG5cdFx0e1xuXHRcdFx0aWYoc1tpXSA9PT0gJ1xcbicpIHJlc3VsdCsrO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24odG1wbClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBsaW5lID0gMTtcblxuXHRcdGxldCBjb2x1bW47XG5cdFx0bGV0IENPTFVNTjtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMucm9vdE5vZGUgPSB7XG5cdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0a2V5d29yZDogJ0Byb290Jyxcblx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0YmxvY2tzOiBbe1xuXHRcdFx0XHRleHByZXNzaW9uOiAnQHRydWUnLFxuXHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdH1dLFxuXHRcdFx0dmFsdWU6ICcnLFxuXHRcdH07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBzdGFjazEgPSBbdGhpcy5yb290Tm9kZV07XG5cdFx0Y29uc3Qgc3RhY2syID0gWzB4MDAwMDAwMDAwMDBdO1xuXG5cdFx0bGV0IGl0ZW07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRmb3IodG1wbCA9IHRtcGwucmVwbGFjZSh0aGlzLkNPTU1FTlRfUkUsICcnKTs7IHRtcGwgPSB0bXBsLnN1YnN0cihDT0xVTU4pKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBjdXJyID0gc3RhY2sxW3N0YWNrMS5sZW5ndGggLSAxXTtcblx0XHRcdCBsZXQgIGluZHggPSBzdGFjazJbc3RhY2syLmxlbmd0aCAtIDFdO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgbSA9IHRtcGwubWF0Y2godGhpcy5TVEFURU1FTlRfUkUpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYobSA9PT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsaW5lICs9IHRoaXMuX2NvdW50KHRtcGwpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKHtcblx0XHRcdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0XHRcdGtleXdvcmQ6ICdAdGV4dCcsXG5cdFx0XHRcdFx0ZXhwcmVzc2lvbjogJycsXG5cdFx0XHRcdFx0YmxvY2tzOiBbXSxcblx0XHRcdFx0XHR2YWx1ZTogdG1wbCxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBlcnJvcnMgPSBbXTtcblxuXHRcdFx0XHRmb3IobGV0IGkgPSBzdGFjazEubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8qKi8gaWYoc3RhY2sxW2ldLmtleXdvcmQgPT09ICdpZicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZXJyb3JzLnB1c2goJ21pc3Npbmcga2V5d29yZCBgZW5kaWZgJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYoc3RhY2sxW2ldLmtleXdvcmQgPT09ICdmb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHQgXHRlcnJvcnMucHVzaCgnbWlzc2luZyBrZXl3b3JkIGBlbmRmb3JgJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoZXJyb3JzLmxlbmd0aCA+IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCAnICsgZXJyb3JzLmpvaW4oJywgJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgbWF0Y2ggPSBtWzBdO1xuXHRcdFx0Y29uc3Qga2V5d29yZCA9IG1bMV07XG5cdFx0XHRjb25zdCBleHByZXNzaW9uID0gbVsyXTtcblxuXHRcdFx0Y29sdW1uID0gbS5pbmRleCArIDB4MDAwMDAwMDAwMDtcblx0XHRcdENPTFVNTiA9IG0uaW5kZXggKyBtYXRjaC5sZW5ndGg7XG5cblx0XHRcdGNvbnN0IHZhbHVlID0gdG1wbC5zdWJzdHIoMCwgY29sdW1uKTtcblx0XHRcdGNvbnN0IFZBTFVFID0gdG1wbC5zdWJzdHIoMCwgQ09MVU1OKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGxpbmUgKz0gdGhpcy5fY291bnQoVkFMVUUpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodmFsdWUpXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRrZXl3b3JkOiAnQHRleHQnLFxuXHRcdFx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0c3dpdGNoKGtleXdvcmQpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZmx1c2gnOlxuXHRcdFx0XHRjYXNlICdhdXRvZXNjYXBlJzpcblx0XHRcdFx0Y2FzZSAnc3BhY2VsZXNzJzpcblx0XHRcdFx0Y2FzZSAndmVyYmF0aW0nOlxuXG5cdFx0XHRcdFx0LyogSUdOT1JFICovXG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2RvJzpcblx0XHRcdFx0Y2FzZSAnc2V0Jzpcblx0XHRcdFx0Y2FzZSAnaW5jbHVkZSc6XG5cblx0XHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRcdGtleXdvcmQ6IGtleXdvcmQsXG5cdFx0XHRcdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0XHRcdFx0YmxvY2tzOiBbXSxcblx0XHRcdFx0XHRcdHZhbHVlOiAnJyxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdpZic6XG5cdFx0XHRcdGNhc2UgJ2Zvcic6XG5cblx0XHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRcdGtleXdvcmQ6IGtleXdvcmQsXG5cdFx0XHRcdFx0XHRibG9ja3M6IFt7XG5cdFx0XHRcdFx0XHRcdGV4cHJlc3Npb246IGV4cHJlc3Npb24sXG5cdFx0XHRcdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0XHRcdFx0fV0sXG5cdFx0XHRcdFx0XHR2YWx1ZTogJycsXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaChpdGVtKTtcblxuXHRcdFx0XHRcdHN0YWNrMS5wdXNoKGl0ZW0pO1xuXHRcdFx0XHRcdHN0YWNrMi5wdXNoKDB4MDApO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbHNlaWYnOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZWxzZWlmYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aW5keCA9IGN1cnIuYmxvY2tzLmxlbmd0aDtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzLnB1c2goe1xuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogZXhwcmVzc2lvbixcblx0XHRcdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0c3RhY2syW3N0YWNrMi5sZW5ndGggLSAxXSA9IGluZHg7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2Vsc2UnOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnaWYnXG5cdFx0XHRcdFx0ICAgJiZcblx0XHRcdFx0XHQgICBjdXJyWydrZXl3b3JkJ10gIT09ICdmb3InXG5cdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbHNlYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aW5keCA9IGN1cnIuYmxvY2tzLmxlbmd0aDtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzLnB1c2goe1xuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogJ0B0cnVlJyxcblx0XHRcdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0c3RhY2syW3N0YWNrMi5sZW5ndGggLSAxXSA9IGluZHg7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2VuZGlmJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVuZGlmYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c3RhY2sxLnBvcCgpO1xuXHRcdFx0XHRcdHN0YWNrMi5wb3AoKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZW5kZm9yJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2ZvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbmRmb3JgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzdGFjazEucG9wKCk7XG5cdFx0XHRcdFx0c3RhY2syLnBvcCgpO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5rbm93biBrZXl3b3JkIGAnICsga2V5d29yZCArICdgJztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5yb290Tm9kZSwgbnVsbCwgMik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmVuZ2luZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmVuZ2luZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRWQVJJQUJMRV9SRTogL1xce1xce1xccyooLio/KVxccypcXH1cXH0vZyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9yZW5kZXI6IGZ1bmN0aW9uKHJlc3VsdCwgaXRlbSwgZGljdCA9IHt9LCB0bXBscyA9IHt9KVxuXHR7XG5cdFx0bGV0IG07XG5cblx0XHRsZXQgZXhwcmVzc2lvbjtcblxuXHRcdHRoaXMuZGljdCA9IGRpY3Q7XG5cdFx0dGhpcy50bXBscyA9IHRtcGxzO1xuXG5cdFx0c3dpdGNoKGl0ZW0ua2V5d29yZClcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERPICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2RvJzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChpdGVtLmV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTRVQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdzZXQnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdG0gPSBpdGVtLmV4cHJlc3Npb24ubWF0Y2goLyhbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzKj1cXHMqKC4rKS8pXG5cblx0XHRcdFx0aWYoIW0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIGludmFsaWQgYHNldGAgc3RhdGVtZW50Jztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0ZGljdFttWzFdXSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKG1bMl0sIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBAVEVYVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdAdGV4dCc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbS52YWx1ZS5yZXBsYWNlKHRoaXMuVkFSSUFCTEVfUkUsIGZ1bmN0aW9uKG1hdGNoLCBleHByZXNzaW9uKSB7XG5cblx0XHRcdFx0XHRsZXQgdmFsdWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6ICcnO1xuXHRcdFx0XHR9KSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJRiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdpZic6XG5cdFx0XHRjYXNlICdAcm9vdCc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aXRlbS5ibG9ja3MuZXZlcnkoKGJsb2NrKSA9PiB7XG5cblx0XHRcdFx0XHRleHByZXNzaW9uID0gYmxvY2suZXhwcmVzc2lvbjtcblxuXHRcdFx0XHRcdGlmKGV4cHJlc3Npb24gPT09ICdAdHJ1ZScgfHwgYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRmb3IoY29uc3QgaSBpbiBibG9jay5saXN0KVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBibG9jay5saXN0W2ldLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdmb3InOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBzeW0xO1xuXHRcdFx0XHRsZXQgc3ltMjtcblx0XHRcdFx0bGV0IGV4cHI7XG5cblx0XHRcdFx0bSA9IGl0ZW0uYmxvY2tzWzBdLmV4cHJlc3Npb24ubWF0Y2goLyhbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzKixcXHMqKFthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMraW5cXHMrKC4rKS8pXG5cblx0XHRcdFx0aWYoIW0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtID0gaXRlbS5ibG9ja3NbMF0uZXhwcmVzc2lvbi5tYXRjaCgvKFthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMraW5cXHMrKC4rKS8pXG5cblx0XHRcdFx0XHRpZighbSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIGludmFsaWQgYGZvcmAgc3RhdGVtZW50Jztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHN5bTEgPSBtWzFdO1xuXHRcdFx0XHRcdFx0c3ltMiA9IG51bGw7XG5cdFx0XHRcdFx0XHRleHByID0gbVsyXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0c3ltMSA9IG1bMV07XG5cdFx0XHRcdFx0c3ltMiA9IG1bMl07XG5cdFx0XHRcdFx0ZXhwciA9IG1bM107XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IG9yaWdWYWx1ZSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHIsIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0Y29uc3QgdHlwZU5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob3JpZ1ZhbHVlKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBpdGVyVmFsdWU7XG5cblx0XHRcdFx0aWYodHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aXRlclZhbHVlID0gc3ltMiA/IE9iamVjdC5lbnRyaWVzKG9yaWdWYWx1ZSlcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgIDogT2JqZWN0LmtleXMob3JpZ1ZhbHVlKVxuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpdGVyVmFsdWUgPSBvcmlnVmFsdWU7XG5cblx0XHRcdFx0XHRpZih0eXBlTmFtZSAhPT0gJ1tvYmplY3QgQXJyYXldJ1xuXHRcdFx0XHRcdCAgICYmXG5cdFx0XHRcdFx0ICAgdHlwZU5hbWUgIT09ICdbb2JqZWN0IFN0cmluZ10nXG5cdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCByaWdodCBvcGVyYW5kZSBub3QgaXRlcmFibGUnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKHN5bTIpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCByaWdodCBvcGVyYW5kZSBub3QgYW4gb2JqZWN0Jztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGwgPSBpdGVyVmFsdWUubGVuZ3RoO1xuXG5cdFx0XHRcdGlmKGwgPiAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGV0IGsgPSAweDAwMDAwMDAwMDAwMDAwO1xuXG5cdFx0XHRcdFx0Y29uc3QgbGlzdCA9IGl0ZW0uYmxvY2tzWzBdLmxpc3Q7XG5cblx0XHRcdFx0XHRpZihzeW0yKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjb25zdCBvbGQxID0gZGljdFsoc3ltMSldO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMiA9IGRpY3RbKHN5bTIpXTtcblx0XHRcdFx0XHRcdGNvbnN0IG9sZDMgPSBkaWN0Wydsb29wJ107XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkaWN0Lmxvb3AgPSB7bGVuZ3RoOiBsLCBwYXJlbnQ6IGRpY3RbJ2xvb3AnXX07XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRmb3IoY29uc3QgW2tleSwgdmFsXSBvZiBpdGVyVmFsdWUpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGRpY3Rbc3ltMV0gPSBrZXk7XG5cdFx0XHRcdFx0XHRcdGRpY3Rbc3ltMl0gPSB2YWw7XG5cblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmZpcnN0ID0gKGsgPT09ICgwIC0gMCkpO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AubGFzdCA9IChrID09PSAobCAtIDEpKTtcblxuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AucmV2aW5kZXgwID0gbCAtIGs7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5pbmRleDAgPSBrO1xuXHRcdFx0XHRcdFx0XHRrKys7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5yZXZpbmRleCA9IGwgLSBrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXggPSBrO1xuXG5cdFx0XHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGxpc3QpXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBsaXN0W2pdLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3RbJ2xvb3AnXSA9IG9sZDM7XG5cdFx0XHRcdFx0XHRkaWN0WyhzeW0yKV0gPSBvbGQyO1xuXHRcdFx0XHRcdFx0ZGljdFsoc3ltMSldID0gb2xkMTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMSA9IGRpY3RbKHN5bTEpXTtcblx0XHRcdFx0XHRcdGNvbnN0IG9sZDIgPSBkaWN0Wydsb29wJ107XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkaWN0Lmxvb3AgPSB7bGVuZ3RoOiBsLCBwYXJlbnQ6IGRpY3RbJ2xvb3AnXX07XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRmb3IoY29uc3QgdmFsIG9mIGl0ZXJWYWx1ZSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0ZGljdFtzeW0xXSA9IHZhbDtcblxuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuZmlyc3QgPSAoayA9PT0gKDAgLSAwKSk7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5sYXN0ID0gKGsgPT09IChsIC0gMSkpO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5yZXZpbmRleDAgPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4MCA9IGs7XG5cdFx0XHRcdFx0XHRcdGsrKztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4ID0gbCAtIGs7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5pbmRleCA9IGs7XG5cblx0XHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gbGlzdClcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGxpc3Rbal0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGljdFsnbG9vcCddID0gb2xkMjtcblx0XHRcdFx0XHRcdGRpY3RbKHN5bTEpXSA9IG9sZDE7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZihpdGVtLmJsb2Nrcy5sZW5ndGggPiAxKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGNvbnN0IGxpc3QgPSBpdGVtLmJsb2Nrc1sxXS5saXN0O1xuXG5cdFx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBsaXN0KVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBsaXN0W2pdLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJTkNMVURFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdpbmNsdWRlJzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgbV8xXyA9IGl0ZW0uZXhwcmVzc2lvbiwgd2l0aF9zdWJleHByLCB3aXRoX2NvbnRleHQ7XG5cblx0XHRcdFx0LyoqLyBpZigobSA9IG1fMV8ubWF0Y2goLyguKylcXHMrd2l0aFxccysoLispXFxzK29ubHkkLykpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IG1bMV07XG5cdFx0XHRcdFx0d2l0aF9zdWJleHByID0gbVsyXTtcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKChtID0gbV8xXy5tYXRjaCgvKC4rKVxccyt3aXRoXFxzKyguKykkLykpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IG1bMV07XG5cdFx0XHRcdFx0d2l0aF9zdWJleHByID0gbVsyXTtcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYoKG0gPSBtXzFfLm1hdGNoKC8oLispXFxzK29ubHkkLykpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IG1bMV07XG5cdFx0XHRcdFx0d2l0aF9zdWJleHByID0gJ3t9Jztcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbV8xXztcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSAne30nO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGZpbGVOYW1lID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KSB8fCAnJztcblxuXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZmlsZU5hbWUpICE9PSAnW29iamVjdCBTdHJpbmddJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIHN0cmluZyBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IHZhcmlhYmxlcyA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKHdpdGhfc3ViZXhwciwgaXRlbS5saW5lLCBkaWN0KSB8fCB7fTtcblxuXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFyaWFibGVzKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBvYmplY3QgZXhwZWN0ZWQnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHQucHVzaChhbWlUd2lnLnN0ZGxpYi5pbmNsdWRlKFxuXHRcdFx0XHRcdGZpbGVOYW1lLFxuXHRcdFx0XHRcdHZhcmlhYmxlcyxcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQsXG5cdFx0XHRcdFx0ZmFsc2Vcblx0XHRcdFx0KSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVuZGVyOiBmdW5jdGlvbih0bXBsLCBkaWN0ID0ge30sIHRtcGxzID0ge30pXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdHN3aXRjaChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodG1wbCkpXG5cdFx0e1xuXHRcdFx0Y2FzZSAnW29iamVjdCBTdHJpbmddJzpcblx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbmV3IGFtaVR3aWcudG1wbC5Db21waWxlcih0bXBsKS5yb290Tm9kZSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnW29iamVjdCBPYmplY3RdJzpcblx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgLyotLS0tLS0tLS0tLS0tLSovdG1wbC8qLS0tLS0tLS0tLS0tLS0qLywgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLmNhY2hlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLmNhY2hlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGRpY3Q6IHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZXZhbDogZnVuY3Rpb24oZXhwcmVzc2lvbiwgbGluZSwgXylcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBmO1xuXG5cdFx0aWYoZXhwcmVzc2lvbiBpbiB0aGlzLmRpY3QpXG5cdFx0e1xuXHRcdFx0ZiA9IHRoaXMuZGljdFtleHByZXNzaW9uXTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGYgPSB0aGlzLmRpY3RbZXhwcmVzc2lvbl0gPSBldmFsKFxuXHRcdFx0XHRhbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIuZ2V0SlMoXG5cdFx0XHRcdFx0bmV3IGFtaVR3aWcuZXhwci5Db21waWxlcihleHByZXNzaW9uLCBsaW5lKVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKCFfKSBfID0ge307XG5cblx0XHRyZXR1cm4gZi5jYWxsKF8sIF8pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5zdGRsaWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5zdGRsaWIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFZBUklBQkxFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzVW5kZWZpbmVkJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ID09PSB1bmRlZmluZWQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNEZWZpbmVkJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ICE9PSB1bmRlZmluZWQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNOdWxsJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ID09PSBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTm90TnVsbCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCAhPT0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0VtcHR5JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGlmKHggPT09IG51bGxcblx0XHQgICB8fFxuXHRcdCAgIHggPT09IGZhbHNlXG5cdFx0ICAgfHxcblx0XHQgICB4ID09PSAoKCcnKSlcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KTtcblxuXHRcdHJldHVybiAodHlwZU5hbWUgPT09ICdbb2JqZWN0IEFycmF5XScgJiYgeC5sZW5ndGggPT09IDApXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgICh0eXBlTmFtZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgJiYgT2JqZWN0LmtleXMoeCkubGVuZ3RoID09PSAwKVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc051bWJlcic6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBOdW1iZXJdJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc1N0cmluZyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBTdHJpbmddJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0FycmF5JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNPYmplY3QnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNJdGVyYWJsZSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KTtcblxuXHRcdHJldHVybiB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgU3RyaW5nXSdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdHlwZU5hbWUgPT09ICdbb2JqZWN0IEFycmF5XSdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzRXZlbic6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc051bWJlcih4KSAmJiAoeCAmIDEpID09PSAwO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzT2RkJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzTnVtYmVyKHgpICYmICh4ICYgMSkgPT09IDE7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSVRFUkFCTEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNJbk9iamVjdCc6IGZ1bmN0aW9uKHgsIHkpXG5cdHtcblx0XHRpZih0aGlzLmlzQXJyYXkoeSlcblx0XHQgICB8fFxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoeSlcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4geS5pbmRleE9mKHgpID49IDA7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5pc09iamVjdCh5KSlcblx0XHR7XG5cdFx0XHRyZXR1cm4geCBpbiB5O1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0luUmFuZ2UnOiBmdW5jdGlvbih4LCB4MSwgeDIpXG5cdHtcblx0XHRpZih0aGlzLmlzTnVtYmVyKHgxKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc051bWJlcih4Milcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4gKC8qLS0tKi94LyotLS0qLyA+PSAvKi0tLSoveDEvKi0tLSovKVxuXHRcdFx0ICAgICAgICYmXG5cdFx0XHQgICAgICAgKC8qLS0tKi94LyotLS0qLyA8PSAvKi0tLSoveDIvKi0tLSovKVxuXHRcdFx0O1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNTdHJpbmcoeDEpICYmIHgxLmxlbmd0aCA9PT0gMVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyh4MikgJiYgeDIubGVuZ3RoID09PSAxXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuICh4LmNoYXJDb2RlQXQoMCkgPj0geDEuY2hhckNvZGVBdCgwKSlcblx0XHRcdCAgICAgICAmJlxuXHRcdFx0ICAgICAgICh4LmNoYXJDb2RlQXQoMCkgPD0geDIuY2hhckNvZGVBdCgwKSlcblx0XHRcdDtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQncmFuZ2UnOiBmdW5jdGlvbih4MSwgeDIsIHN0ZXAgPSAxKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHQvKiovIGlmKHRoaXMuaXNOdW1iZXIoeDEpXG5cdFx0ICAgICAgICAmJlxuXHRcdCAgICAgICAgdGhpcy5pc051bWJlcih4Milcblx0XHQgKSB7XG5cdFx0XHRmb3IobGV0IGkgPSAvKi0tLSoveDEvKi0tLSovOyBpIDw9IC8qLS0tKi94Mi8qLS0tKi87IGkgKz0gc3RlcClcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0LnB1c2goLyotLS0tLS0tLS0tLS0tLS0qLyhpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYodGhpcy5pc1N0cmluZyh4MSkgJiYgeDEubGVuZ3RoID09PSAxXG5cdFx0ICAgICAgICAmJlxuXHRcdCAgICAgICAgdGhpcy5pc1N0cmluZyh4MikgJiYgeDIubGVuZ3RoID09PSAxXG5cdFx0ICkge1xuXHRcdFx0Zm9yKGxldCBpID0geDEuY2hhckNvZGVBdCgwKTsgaSA8PSB4Mi5jaGFyQ29kZUF0KDApOyBpICs9IHN0ZXApXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoaSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2xlbmd0aCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHgpXG5cdFx0ICAgfHxcblx0XHQgICB0aGlzLmlzQXJyYXkoeClcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4geC5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5pc09iamVjdCh4KSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmtleXMoeCkubGVuZ3RoO1xuXHRcdH1cblxuXHRcdHJldHVybiAwO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9maXJzdCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMuaXNTdHJpbmcoeCkgfHwgdGhpcy5pc0FycmF5KHgpKSAmJiB4Lmxlbmd0aCA+IDAgPyB4WzB4MDAwMDAwMDAwMF0gOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbGFzdCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMuaXNTdHJpbmcoeCkgfHwgdGhpcy5pc0FycmF5KHgpKSAmJiB4Lmxlbmd0aCA+IDAgPyB4W3gubGVuZ3RoIC0gMV0gOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfc2xpY2UnOiBmdW5jdGlvbih4LCBpZHgxLCBpZHgyKVxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLmlzU3RyaW5nKHgpIHx8IHRoaXMuaXNBcnJheSh4KSkgPyB4LnNsaWNlKGlkeDEsIGlkeDIpIDogbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbWVyZ2UnOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID4gMSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc1N0cmluZyhhcmd1bWVudHNbMF0pKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYXJndW1lbnRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzU3RyaW5nKGl0ZW0pKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdEwucHVzaChhcmd1bWVudHNbaV0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIEwuam9pbignJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmlzQXJyYXkoYXJndW1lbnRzWzBdKSlcblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgTCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFyZ3VtZW50cylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGl0ZW0gPSBhcmd1bWVudHNbaV07XG5cblx0XHRcdFx0XHRpZighdGhpcy5pc0FycmF5KGl0ZW0pKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGl0ZW0pIEwucHVzaChpdGVtW2pdKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBMO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBEID0ge307XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYXJndW1lbnRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzT2JqZWN0KGl0ZW0pKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGl0ZW0pIERbal0gPSBpdGVtW2pdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIEQ7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9zb3J0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4LnNvcnQoKSA6IFtdO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yZXZlcnNlJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4LnJldmVyc2UoKSA6IFtdO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9qb2luJzogZnVuY3Rpb24oeCwgc2VwKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHguam9pbihzZXApIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2tleXMnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNPYmplY3QoeCkgPyBPYmplY3Qua2V5cyh4KSA6IFtdO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9jb2x1bW4nOiBmdW5jdGlvbih4LCBrZXkpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5tYXAoKHZhbCkgPT4gdmFsW2tleV0pIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2JhdGNoJzogZnVuY3Rpb24oeCwgbiwgbWlzc2luZyA9ICcnKVxuXHR7XG5cdCAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdGlmKHRoaXMuaXNBcnJheSh4KVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc051bWJlcihuKVxuXHRcdCApIHtcblx0XHQgXHRsZXQgbGFzdDtcblxuXHRcdFx0Y29uc3QgbCA9IHgubGVuZ3RoO1xuXG5cdFx0XHRjb25zdCBtID0gTWF0aC5jZWlsKGwgLyBuKSAqIG47XG5cblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpICs9IG4pXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKGxhc3QgPSB4LnNsaWNlKGksIGkgKyBuKSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihsZXQgaSA9IGw7IGkgPCBtOyBpICs9IDEpXG5cdFx0XHR7XG5cdFx0XHRcdGxhc3QucHVzaChtaXNzaW5nKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNUUklOR1MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J3N0YXJ0c1dpdGgnOiBmdW5jdGlvbihzMSwgczIpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMxKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyhzMilcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBiYXNlID0gMHgwMDAwMDAwMDAwMDAwMDAwMDAwO1xuXG5cdFx0XHRyZXR1cm4gczEuaW5kZXhPZihzMiwgYmFzZSkgPT09IGJhc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2VuZHNXaXRoJzogZnVuY3Rpb24oczEsIHMyKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzMSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoczIpXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgYmFzZSA9IHMxLmxlbmd0aCAtIHMyLmxlbmd0aDtcblxuXHRcdFx0cmV0dXJuIHMxLmluZGV4T2YoczIsIGJhc2UpID09PSBiYXNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdtYXRjaCc6IGZ1bmN0aW9uKHMsIHJlZ2V4KVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZygoKHMpKSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcocmVnZXgpXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgaWR4MSA9IHJlZ2V4LiAgaW5kZXhPZiAgKCcvJyk7XG5cdFx0XHRjb25zdCBpZHgyID0gcmVnZXgubGFzdEluZGV4T2YoJy8nKTtcblxuXHRcdFx0aWYoaWR4MSA9PT0gMCB8fCBpZHgxIDwgaWR4Milcblx0XHRcdHtcblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFJlZ0V4cChyZWdleC5zdWJzdHJpbmcoaWR4MSArIDEsIGlkeDIpLCByZWdleC5zdWJzdHJpbmcoaWR4MiArIDEpKS50ZXN0KHMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoKGVycilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8qIElHTk9SRSAqL1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9kZWZhdWx0JzogZnVuY3Rpb24oczEsIHMyKVxuXHR7XG5cdFx0cmV0dXJuIHMxIHx8IHMyIHx8ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sb3dlcic6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudG9Mb3dlckNhc2UoKSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl91cHBlcic6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudG9VcHBlckNhc2UoKSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9jYXBpdGFsaXplJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcocykpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHMudHJpbSgpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXlxcUy9nLCBmdW5jdGlvbihjKSB7XG5cblx0XHRcdFx0cmV0dXJuIGMudG9VcHBlckNhc2UoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdGl0bGUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gcy50cmltKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8oPzpefFxccylcXFMvZywgZnVuY3Rpb24oYykge1xuXG5cdFx0XHRcdHJldHVybiBjLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3RyaW0nOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnRyaW0oKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3JlcGxhY2UnOiBmdW5jdGlvbihzLCBvbGRTdHJzLCBuZXdTdHJzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHRjb25zdCBsID0gKCgocykpKS5sZW5ndGg7XG5cdFx0Y29uc3QgbSA9IG9sZFN0cnMubGVuZ3RoO1xuXHRcdGNvbnN0IG4gPSBuZXdTdHJzLmxlbmd0aDtcblxuXHRcdGlmKG0gIT0gbilcblx0XHR7XG5cdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdH1cblxuX19sMDpcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpICs9IDApXG5cdFx0e1xuXHRcdFx0Y29uc3QgcCA9IHMuc3Vic3RyaW5nKGkpO1xuXG5cdFx0XHRmb3IobGV0IGogPSAwOyBqIDwgbTsgaiArPSAxKVxuXHRcdFx0e1xuXHRcdFx0XHRpZihwLmluZGV4T2Yob2xkU3Ryc1tqXSkgPT09IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChuZXdTdHJzW2pdKTtcblxuXHRcdFx0XHRcdGkgKz0gb2xkU3Ryc1tqXS5sZW5ndGg7XG5cblx0XHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdC5wdXNoKHMuY2hhckF0KGkrKykpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3RleHRUb0h0bWxYJzogWycmJyAgICAsICdcIicgICAgICwgJzwnICAgLCAnPicgICBdLFxuXHQnX3RleHRUb0h0bWxZJzogWycmYW1wOycsICcmcXVvdDsnLCAnJmx0OycsICcmZ3Q7J10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3RleHRUb1N0cmluZ1gnOiBbJ1xcXFwnICAsICdcXG4nICwgJ1wiJyAgLCAnXFwnJyAgXSxcblx0J190ZXh0VG9TdHJpbmdZJzogWydcXFxcXFxcXCcsICdcXFxcbicsICdcXFxcXCInLCAnXFxcXFxcJyddLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J190ZXh0VG9Kc29uU3RyaW5nWCc6IFsnXFxcXCcgICwgJ1xcbicgLCAnXCInICBdLFxuXHQnX3RleHRUb0pzb25TdHJpbmdZJzogWydcXFxcXFxcXCcsICdcXFxcbicsICdcXFxcXCInXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfZXNjYXBlJzogZnVuY3Rpb24ocywgbW9kZSlcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcocykpXG5cdFx0e1xuXHRcdFx0c3dpdGNoKG1vZGUgfHwgJ2h0bWwnKVxuXHRcdFx0e1xuXHRcdFx0XHRjYXNlICdodG1sJzpcblx0XHRcdFx0Y2FzZSAnaHRtbF9hdHRyJzpcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fcmVwbGFjZShzLCB0aGlzLl90ZXh0VG9IdG1sWCwgdGhpcy5fdGV4dFRvSHRtbFkpO1xuXG5cdFx0XHRcdGNhc2UgJ2pzJzpcblx0XHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fcmVwbGFjZShzLCB0aGlzLl90ZXh0VG9TdHJpbmdYLCB0aGlzLl90ZXh0VG9TdHJpbmdZKTtcblxuXHRcdFx0XHRjYXNlICdqc29uJzpcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fcmVwbGFjZShzLCB0aGlzLl90ZXh0VG9Kc29uU3RyaW5nWCwgdGhpcy5fdGV4dFRvSnNvblN0cmluZ1kpO1xuXG5cdFx0XHRcdGNhc2UgJ3VybCc6XG5cdFx0XHRcdFx0cmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzKTtcblxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiBzO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdXJsX2VuY29kZSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IGVuY29kZVVSSUNvbXBvbmVudChzKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX25sMmJyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy5yZXBsYWNlKC9cXG4vZywgJzxici8+Jylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yYXcnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfcmVwbGFjZSc6IGZ1bmN0aW9uKHMsIGRpY3QpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSAmJiB0aGlzLmlzT2JqZWN0KGRpY3QpID8gdGhpcy5fcmVwbGFjZShzLCBPYmplY3Qua2V5cyhkaWN0KSwgT2JqZWN0LnZhbHVlcyhkaWN0KSlcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NwbGl0JzogZnVuY3Rpb24ocywgc2VwLCBtYXgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMuc3BsaXQoc2VwLCBtYXgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiBbXVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBOVU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfYWJzJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBNYXRoLmFicyh4KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfcm91bmQnOiBmdW5jdGlvbih4LCBtb2RlKVxuXHR7XG5cdFx0c3dpdGNoKG1vZGUpXG5cdFx0e1xuXHRcdFx0Y2FzZSAnY2VpbCc6XG5cdFx0XHRcdHJldHVybiBNYXRoLmNlaWwoeCk7XG5cblx0XHRcdGNhc2UgJ2Zsb29yJzpcblx0XHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoeCk7XG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBNYXRoLnJvdW5kKHgpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdtaW4nOiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBhcmdzID0gKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpICYmICh0aGlzLmlzQXJyYXkoYXJndW1lbnRzWzBdKSB8fCB0aGlzLmlzT2JqZWN0KGFyZ3VtZW50c1swXSkpID8gYXJndW1lbnRzWzBdXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFyZ3VtZW50c1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCByZXN1bHQgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5cblx0XHRmb3IoY29uc3QgaSBpbiBhcmdzKVxuXHRcdHtcblx0XHRcdGlmKCF0aGlzLmlzTnVtYmVyKGFyZ3NbaV0pKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gTnVtYmVyLk5hTjtcblx0XHRcdH1cblxuXHRcdFx0aWYocmVzdWx0ID4gYXJnc1tpXSlcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0ID0gYXJnc1tpXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21heCc6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGFyZ3MgPSAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgJiYgKHRoaXMuaXNBcnJheShhcmd1bWVudHNbMF0pIHx8IHRoaXMuaXNPYmplY3QoYXJndW1lbnRzWzBdKSkgPyBhcmd1bWVudHNbMF1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYXJndW1lbnRzXG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHJlc3VsdCA9IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcblxuXHRcdGZvcihjb25zdCBpIGluIGFyZ3MpXG5cdFx0e1xuXHRcdFx0aWYoIXRoaXMuaXNOdW1iZXIoYXJnc1tpXSkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBOdW1iZXIuTmFOO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihyZXN1bHQgPCBhcmdzW2ldKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSBhcmdzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUkFORE9NICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQncmFuZG9tJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGNvbnN0IHkgPSBNYXRoLnJhbmRvbSgpO1xuXG5cdFx0aWYoeClcblx0XHR7XG5cdFx0XHRpZih0aGlzLmlzQXJyYXkoeClcblx0XHRcdCAgIHx8XG5cdFx0XHQgICB0aGlzLmlzT2JqZWN0KHgpXG5cdFx0XHQgKSB7XG5cdFx0XHQgXHRjb25zdCBYID0gT2JqZWN0LmtleXMoeCk7XG5cblx0XHRcdFx0cmV0dXJuIHhbXG5cdFx0XHRcdFx0WFtNYXRoLmZsb29yKFgubGVuZ3RoICogeSldXG5cdFx0XHRcdF07XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuaXNTdHJpbmcoeCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiB4W01hdGguZmxvb3IoeC5sZW5ndGggKiB5KV07XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuaXNOdW1iZXIoeCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKHggKiB5KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR4ID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG5cblx0XHRyZXR1cm4gTWF0aC5mbG9vcih4ICogeSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSlNPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pzb25fZW5jb2RlJzogZnVuY3Rpb24oeCwgaW5kZW50KVxuXHR7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHgsIG51bGwsIHRoaXMuaXNOdW1iZXIoaW5kZW50KSA/IGluZGVudCA6IDIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9qc29uX2pzcGF0aCc6IGZ1bmN0aW9uKHgsIHBhdGgpXG5cdHtcblx0XHRyZXR1cm4gdHlwZW9mIEpTUGF0aCAhPT0gJ3VuZGVmaW5lZCcgPyBKU1BhdGguYXBwbHkocGF0aCwgeClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbXVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBURU1QTEFURVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpbmNsdWRlJzogZnVuY3Rpb24oZmlsZU5hbWUsIHZhcmlhYmxlcyA9IHt9LCB3aXRoQ29udGV4dCA9IHRydWUsIGlnbm9yZU1pc3NpbmcgPSBmYWxzZSlcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKGZpbGVOYW1lIGluIGFtaVR3aWcuZW5naW5lLnRtcGxzKVxuXHRcdHtcblx0XHRcdGNvbnN0IHRlbXAgPSB7fTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHdpdGhDb250ZXh0KVxuXHRcdFx0e1xuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhbWlUd2lnLmVuZ2luZS5kaWN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGVtcFtpXSA9IGFtaVR3aWcuZW5naW5lLmRpY3RbaV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHZhcmlhYmxlcylcblx0XHRcdHtcblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gLyotKi92YXJpYWJsZXMvKi0qLylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRlbXBbaV0gPSAvKi0qL3ZhcmlhYmxlcy8qLSovW2ldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRyZXR1cm4gYW1pVHdpZy5lbmdpbmUucmVuZGVyKGFtaVR3aWcuZW5naW5lLnRtcGxzW2ZpbGVOYW1lXSwgdGVtcCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKCFpZ25vcmVNaXNzaW5nKVxuXHRcdHtcblx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBjb3VsZCBub3Qgb3BlbiBgJyArIGZpbGVOYW1lICsgJ2AnO1xuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuc3RkbGliLmZpbHRlcl9lID0gYW1pVHdpZy5zdGRsaWIuZmlsdGVyX2VzY2FwZTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5pbnRlcnByZXRlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5pbnRlcnByZXRlciA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZ2V0SlM6IGZ1bmN0aW9uKG5vZGUpXG5cdHtcblx0XHRsZXQgTDtcblx0XHRsZXQgeDtcblx0XHRsZXQgbGVmdDtcblx0XHRsZXQgcmlnaHQ7XG5cdFx0bGV0IG9wZXJhdG9yO1xuXG5cdFx0c3dpdGNoKG5vZGUubm9kZVR5cGUpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBMU1QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTFNUOlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmxpc3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2goLyotLS0tLSovIHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gJ1snICsgTC5qb2luKCcsJykgKyAnXSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRElDICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRJQzpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5kaWN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKGkgKyAnOicgKyB0aGlzLl9nZXRKUyhub2RlLmRpY3RbaV0pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuICd7JyArIEwuam9pbignLCcpICsgJ30nO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZVTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5GVU46XG5cdFx0IFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmxpc3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2godGhpcy5fZ2V0SlMobm9kZS5saXN0W2ldKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0IFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gbm9kZS5ub2RlVmFsdWUgKyAnKCcgKyBMLmpvaW4oJywnKSArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBWQVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuVkFSOlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmxpc3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2goJ1snICsgdGhpcy5fZ2V0SlMobm9kZS5saXN0W2ldKSArICddJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiBMLmxlbmd0aCA+IDAgPyBub2RlLm5vZGVWYWx1ZSArIEwuam9pbignJykgOiBub2RlLm5vZGVWYWx1ZTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBURVJNSU5BTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUw6XG5cblx0XHRcdFx0cmV0dXJuIG5vZGUubm9kZVZhbHVlO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5JUzpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cblx0XHRcdFx0c3dpdGNoKG5vZGUubm9kZVJpZ2h0Lm5vZGVUeXBlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRFRklORUQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzRGVmaW5lZCgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5OVUxMOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc051bGwoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRU1QVFk6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzRW1wdHkoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSVRFUkFCTEU6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzSXRlcmFibGUoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRVZFTjpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNFdmVuKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLk9ERDpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNPZGQoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElOICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5JTjpcblxuXHRcdFx0XHRpZihub2RlLm5vZGVSaWdodC5ub2RlVHlwZSAhPT0gYW1pVHdpZy5leHByLnRva2Vucy5SQU5HRSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNJbk9iamVjdCgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHggPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblxuXHRcdFx0XHRcdGxlZnQgPSBub2RlLm5vZGVSaWdodC5ub2RlTGVmdC5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0cmlnaHQgPSBub2RlLm5vZGVSaWdodC5ub2RlUmlnaHQubm9kZVZhbHVlO1xuXG5cdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0luUmFuZ2UoJyArIHggKyAnLCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTVEFSVFNfV0lUSCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuU1RBUlRTX1dJVEg6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLnN0YXJ0c1dpdGgoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFTkRTX1dJVEggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRU5EU19XSVRIOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5lbmRzV2l0aCgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIE1BVENIRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5NQVRDSEVTOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5tYXRjaCgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFJBTkdFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5SQU5HRTpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIucmFuZ2UoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBET1QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRE9UOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0aWYobm9kZS5ub2RlVmFsdWVbMF0gPT09ICcuJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBsZWZ0ICsgJy4nICsgcmlnaHQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIGxlZnQgKyAnWycgKyByaWdodCArICddJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZMRElWICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5GTERJVjpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnTWF0aC5mbG9vcignICsgbGVmdCArICcvJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFBPV0VSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5QT1dFUjpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnTWF0aC5wb3coJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBET1VCTEVfUVVFU1RJT04gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRE9VQkxFX1FVRVNUSU9OOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICcoKCcgKyBsZWZ0ICsgJykgfHwgKCcgKyByaWdodCArICcpKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBVTklBUlkgT1BFUkFUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZUxlZnQgPT09IG51bGxcblx0XHRcdFx0ICAgJiZcblx0XHRcdFx0ICAgbm9kZS5ub2RlUmlnaHQgIT09IG51bGxcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdG9wZXJhdG9yID0gKG5vZGUubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSA/IG5vZGUubm9kZVZhbHVlIDogJyEnO1xuXG5cdFx0XHRcdFx0cmV0dXJuIG9wZXJhdG9yICsgJygnICsgdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYobm9kZS5ub2RlTGVmdCAhPT0gbnVsbFxuXHRcdFx0XHQgICAmJlxuXHRcdFx0XHQgICBub2RlLm5vZGVSaWdodCA9PT0gbnVsbFxuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0b3BlcmF0b3IgPSAobm9kZS5ub2RlVHlwZSAhPT0gYW1pVHdpZy5leHByLnRva2Vucy5OT1QpID8gbm9kZS5ub2RlVmFsdWUgOiAnISc7XG5cblx0XHRcdFx0XHRyZXR1cm4gJygnICsgdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCkgKyAnKScgKyBvcGVyYXRvcjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdC8qIEJJTkFSWSBPUEVSQVRPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYobm9kZS5ub2RlTGVmdCAhPT0gbnVsbFxuXHRcdFx0XHQgICAmJlxuXHRcdFx0XHQgICBub2RlLm5vZGVSaWdodCAhPT0gbnVsbFxuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0c3dpdGNoKG5vZGUubm9kZVR5cGUpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX09SOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICd8fCc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfQU5EOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICcmJic7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfT1I6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJ3wnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX1hPUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnXic7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5EOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICcmJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQ09OQ0FUOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICcrJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9IG5vZGUubm9kZVZhbHVlO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdFx0cmV0dXJuICcoJyArIGxlZnQgKyBvcGVyYXRvciArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEpTOiBmdW5jdGlvbihleHByKVxuXHR7XG5cdFx0cmV0dXJuICcoZnVuY3Rpb24oXykgeyByZXR1cm4gJyArIHRoaXMuX2dldEpTKGV4cHIucm9vdE5vZGUpICsgJzsgfSknO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZXZhbDogZnVuY3Rpb24oZXhwciwgXylcblx0e1xuXHRcdGlmKCFfKSBfID0ge307XG5cblx0XHRyZXR1cm4gZXZhbCh0aGlzLmdldEpTKGV4cHIpKS5jYWxsKF8sIF8pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIihmdW5jdGlvbigpIHtcblxudmFyIFNZTlRBWCA9IHtcbiAgICAgICAgUEFUSCAgICAgICAgICAgIDogMSxcbiAgICAgICAgU0VMRUNUT1IgICAgICAgIDogMixcbiAgICAgICAgT0JKX1BSRUQgICAgICAgIDogMyxcbiAgICAgICAgUE9TX1BSRUQgICAgICAgIDogNCxcbiAgICAgICAgTE9HSUNBTF9FWFBSICAgIDogNSxcbiAgICAgICAgQ09NUEFSSVNPTl9FWFBSIDogNixcbiAgICAgICAgTUFUSF9FWFBSICAgICAgIDogNyxcbiAgICAgICAgQ09OQ0FUX0VYUFIgICAgIDogOCxcbiAgICAgICAgVU5BUllfRVhQUiAgICAgIDogOSxcbiAgICAgICAgUE9TX0VYUFIgICAgICAgIDogMTAsXG4gICAgICAgIExJVEVSQUwgICAgICAgICA6IDExXG4gICAgfTtcblxuLy8gcGFyc2VyXG5cbnZhciBwYXJzZSA9IChmdW5jdGlvbigpIHtcblxuICAgIHZhciBUT0tFTiA9IHtcbiAgICAgICAgICAgIElEICAgIDogMSxcbiAgICAgICAgICAgIE5VTSAgIDogMixcbiAgICAgICAgICAgIFNUUiAgIDogMyxcbiAgICAgICAgICAgIEJPT0wgIDogNCxcbiAgICAgICAgICAgIE5VTEwgIDogNSxcbiAgICAgICAgICAgIFBVTkNUIDogNixcbiAgICAgICAgICAgIEVPUCAgIDogN1xuICAgICAgICB9LFxuICAgICAgICBNRVNTQUdFUyA9IHtcbiAgICAgICAgICAgIFVORVhQX1RPS0VOIDogJ1VuZXhwZWN0ZWQgdG9rZW4gXCIlMFwiJyxcbiAgICAgICAgICAgIFVORVhQX0VPUCAgIDogJ1VuZXhwZWN0ZWQgZW5kIG9mIHBhdGgnXG4gICAgICAgIH07XG5cbiAgICB2YXIgcGF0aCwgaWR4LCBidWYsIGxlbjtcblxuICAgIGZ1bmN0aW9uIHBhcnNlKF9wYXRoKSB7XG4gICAgICAgIHBhdGggPSBfcGF0aC5zcGxpdCgnJyk7XG4gICAgICAgIGlkeCA9IDA7XG4gICAgICAgIGJ1ZiA9IG51bGw7XG4gICAgICAgIGxlbiA9IHBhdGgubGVuZ3RoO1xuXG4gICAgICAgIHZhciByZXMgPSBwYXJzZVBhdGhDb25jYXRFeHByKCksXG4gICAgICAgICAgICB0b2tlbiA9IGxleCgpO1xuXG4gICAgICAgIGlmKHRva2VuLnR5cGUgIT09IFRPS0VOLkVPUCkge1xuICAgICAgICAgICAgdGhyb3dVbmV4cGVjdGVkKHRva2VuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQYXRoQ29uY2F0RXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZVBhdGhDb25jYXRQYXJ0RXhwcigpLFxuICAgICAgICAgICAgb3BlcmFuZHM7XG5cbiAgICAgICAgd2hpbGUobWF0Y2goJ3wnKSkge1xuICAgICAgICAgICAgbGV4KCk7XG4gICAgICAgICAgICAob3BlcmFuZHMgfHwgKG9wZXJhbmRzID0gW2V4cHJdKSkucHVzaChwYXJzZVBhdGhDb25jYXRQYXJ0RXhwcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcGVyYW5kcz9cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLkNPTkNBVF9FWFBSLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBvcGVyYW5kc1xuICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUGF0aENvbmNhdFBhcnRFeHByKCkge1xuICAgICAgICByZXR1cm4gbWF0Y2goJygnKT9cbiAgICAgICAgICAgIHBhcnNlUGF0aEdyb3VwRXhwcigpIDpcbiAgICAgICAgICAgIHBhcnNlUGF0aCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUGF0aEdyb3VwRXhwcigpIHtcbiAgICAgICAgZXhwZWN0KCcoJyk7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VQYXRoQ29uY2F0RXhwcigpO1xuICAgICAgICBleHBlY3QoJyknKTtcblxuICAgICAgICB2YXIgcGFydHMgPSBbXSxcbiAgICAgICAgICAgIHBhcnQ7XG4gICAgICAgIHdoaWxlKChwYXJ0ID0gcGFyc2VQcmVkaWNhdGUoKSkpIHtcbiAgICAgICAgICAgIHBhcnRzLnB1c2gocGFydCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighcGFydHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZXhwcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGV4cHIudHlwZSA9PT0gU1lOVEFYLlBBVEgpIHtcbiAgICAgICAgICAgIGV4cHIucGFydHMgPSBleHByLnBhcnRzLmNvbmNhdChwYXJ0cyk7XG4gICAgICAgICAgICByZXR1cm4gZXhwcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcnRzLnVuc2hpZnQoZXhwcik7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgIDogU1lOVEFYLlBBVEgsXG4gICAgICAgICAgICBwYXJ0cyA6IHBhcnRzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQcmVkaWNhdGUoKSB7XG4gICAgICAgIGlmKG1hdGNoKCdbJykpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVBvc1ByZWRpY2F0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWF0Y2goJ3snKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlT2JqZWN0UHJlZGljYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtYXRjaCgnKCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VQYXRoR3JvdXBFeHByKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBhdGgoKSB7XG4gICAgICAgIGlmKCFtYXRjaFBhdGgoKSkge1xuICAgICAgICAgICAgdGhyb3dVbmV4cGVjdGVkKGxleCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmcm9tUm9vdCA9IGZhbHNlLFxuICAgICAgICAgICAgc3Vic3Q7XG5cbiAgICAgICAgaWYobWF0Y2goJ14nKSkge1xuICAgICAgICAgICAgbGV4KCk7XG4gICAgICAgICAgICBmcm9tUm9vdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihtYXRjaFN1YnN0KCkpIHtcbiAgICAgICAgICAgIHN1YnN0ID0gbGV4KCkudmFsLnN1YnN0cigxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwYXJ0cyA9IFtdLFxuICAgICAgICAgICAgcGFydDtcbiAgICAgICAgd2hpbGUoKHBhcnQgPSBwYXJzZVBhdGhQYXJ0KCkpKSB7XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHBhcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgICAgIDogU1lOVEFYLlBBVEgsXG4gICAgICAgICAgICBmcm9tUm9vdCA6IGZyb21Sb290LFxuICAgICAgICAgICAgc3Vic3QgICAgOiBzdWJzdCxcbiAgICAgICAgICAgIHBhcnRzICAgIDogcGFydHNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBhdGhQYXJ0KCkge1xuICAgICAgICByZXR1cm4gbWF0Y2hTZWxlY3RvcigpP1xuICAgICAgICAgICAgcGFyc2VTZWxlY3RvcigpIDpcbiAgICAgICAgICAgIHBhcnNlUHJlZGljYXRlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VTZWxlY3RvcigpIHtcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gbGV4KCkudmFsLFxuICAgICAgICAgICAgdG9rZW4gPSBsb29rYWhlYWQoKSxcbiAgICAgICAgICAgIHByb3A7XG5cbiAgICAgICAgaWYobWF0Y2goJyonKSB8fCB0b2tlbi50eXBlID09PSBUT0tFTi5JRCB8fCB0b2tlbi50eXBlID09PSBUT0tFTi5TVFIpIHtcbiAgICAgICAgICAgIHByb3AgPSBsZXgoKS52YWw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSAgICAgOiBTWU5UQVguU0VMRUNUT1IsXG4gICAgICAgICAgICBzZWxlY3RvciA6IHNlbGVjdG9yLFxuICAgICAgICAgICAgcHJvcCAgICAgOiBwcm9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQb3NQcmVkaWNhdGUoKSB7XG4gICAgICAgIGV4cGVjdCgnWycpO1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlUG9zRXhwcigpO1xuICAgICAgICBleHBlY3QoJ10nKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5QT1NfUFJFRCxcbiAgICAgICAgICAgIGFyZyAgOiBleHByXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VPYmplY3RQcmVkaWNhdGUoKSB7XG4gICAgICAgIGV4cGVjdCgneycpO1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlTG9naWNhbE9SRXhwcigpO1xuICAgICAgICBleHBlY3QoJ30nKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5PQkpfUFJFRCxcbiAgICAgICAgICAgIGFyZyAgOiBleHByXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VMb2dpY2FsT1JFeHByKCkge1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlTG9naWNhbEFOREV4cHIoKSxcbiAgICAgICAgICAgIG9wZXJhbmRzO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCd8fCcpKSB7XG4gICAgICAgICAgICBsZXgoKTtcbiAgICAgICAgICAgIChvcGVyYW5kcyB8fCAob3BlcmFuZHMgPSBbZXhwcl0pKS5wdXNoKHBhcnNlTG9naWNhbEFOREV4cHIoKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3BlcmFuZHM/XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5MT0dJQ0FMX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6ICd8fCcsXG4gICAgICAgICAgICAgICAgYXJncyA6IG9wZXJhbmRzXG4gICAgICAgICAgICB9IDpcbiAgICAgICAgICAgIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VMb2dpY2FsQU5ERXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZUVxdWFsaXR5RXhwcigpLFxuICAgICAgICAgICAgb3BlcmFuZHM7XG5cbiAgICAgICAgd2hpbGUobWF0Y2goJyYmJykpIHtcbiAgICAgICAgICAgIGxleCgpO1xuICAgICAgICAgICAgKG9wZXJhbmRzIHx8IChvcGVyYW5kcyA9IFtleHByXSkpLnB1c2gocGFyc2VFcXVhbGl0eUV4cHIoKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3BlcmFuZHM/XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5MT0dJQ0FMX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6ICcmJicsXG4gICAgICAgICAgICAgICAgYXJncyA6IG9wZXJhbmRzXG4gICAgICAgICAgICB9IDpcbiAgICAgICAgICAgIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VFcXVhbGl0eUV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VSZWxhdGlvbmFsRXhwcigpO1xuXG4gICAgICAgIHdoaWxlKFxuICAgICAgICAgICAgbWF0Y2goJz09JykgfHwgbWF0Y2goJyE9JykgfHwgbWF0Y2goJz09PScpIHx8IG1hdGNoKCchPT0nKSB8fFxuICAgICAgICAgICAgbWF0Y2goJ149PScpIHx8IG1hdGNoKCc9PV4nKSB8fG1hdGNoKCdePScpIHx8IG1hdGNoKCc9XicpIHx8XG4gICAgICAgICAgICBtYXRjaCgnJD09JykgfHwgbWF0Y2goJz09JCcpIHx8IG1hdGNoKCckPScpIHx8IG1hdGNoKCc9JCcpIHx8XG4gICAgICAgICAgICBtYXRjaCgnKj09JykgfHwgbWF0Y2goJz09KicpfHwgbWF0Y2goJyo9JykgfHwgbWF0Y2goJz0qJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBleHByID0ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguQ09NUEFSSVNPTl9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiBsZXgoKS52YWwsXG4gICAgICAgICAgICAgICAgYXJncyA6IFtleHByLCBwYXJzZUVxdWFsaXR5RXhwcigpXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUmVsYXRpb25hbEV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VBZGRpdGl2ZUV4cHIoKTtcblxuICAgICAgICB3aGlsZShtYXRjaCgnPCcpIHx8IG1hdGNoKCc+JykgfHwgbWF0Y2goJzw9JykgfHwgbWF0Y2goJz49JykpIHtcbiAgICAgICAgICAgIGV4cHIgPSB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5DT01QQVJJU09OX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6IGxleCgpLnZhbCxcbiAgICAgICAgICAgICAgICBhcmdzIDogW2V4cHIsIHBhcnNlUmVsYXRpb25hbEV4cHIoKV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUFkZGl0aXZlRXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZU11bHRpcGxpY2F0aXZlRXhwcigpO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCcrJykgfHwgbWF0Y2goJy0nKSkge1xuICAgICAgICAgICAgZXhwciA9IHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLk1BVEhfRVhQUixcbiAgICAgICAgICAgICAgICBvcCAgIDogbGV4KCkudmFsLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBbZXhwciwgcGFyc2VNdWx0aXBsaWNhdGl2ZUV4cHIoKV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZU11bHRpcGxpY2F0aXZlRXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZVVuYXJ5RXhwcigpO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCcqJykgfHwgbWF0Y2goJy8nKSB8fCBtYXRjaCgnJScpKSB7XG4gICAgICAgICAgICBleHByID0ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguTUFUSF9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiBsZXgoKS52YWwsXG4gICAgICAgICAgICAgICAgYXJncyA6IFtleHByLCBwYXJzZU11bHRpcGxpY2F0aXZlRXhwcigpXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUG9zRXhwcigpIHtcbiAgICAgICAgaWYobWF0Y2goJzonKSkge1xuICAgICAgICAgICAgbGV4KCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgIDogU1lOVEFYLlBPU19FWFBSLFxuICAgICAgICAgICAgICAgIHRvSWR4IDogcGFyc2VVbmFyeUV4cHIoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmcm9tRXhwciA9IHBhcnNlVW5hcnlFeHByKCk7XG4gICAgICAgIGlmKG1hdGNoKCc6JykpIHtcbiAgICAgICAgICAgIGxleCgpO1xuICAgICAgICAgICAgaWYobWF0Y2goJ10nKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgICAgOiBTWU5UQVguUE9TX0VYUFIsXG4gICAgICAgICAgICAgICAgICAgIGZyb21JZHggOiBmcm9tRXhwclxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgICA6IFNZTlRBWC5QT1NfRVhQUixcbiAgICAgICAgICAgICAgICBmcm9tSWR4IDogZnJvbUV4cHIsXG4gICAgICAgICAgICAgICAgdG9JZHggICA6IHBhcnNlVW5hcnlFeHByKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5QT1NfRVhQUixcbiAgICAgICAgICAgIGlkeCAgOiBmcm9tRXhwclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlVW5hcnlFeHByKCkge1xuICAgICAgICBpZihtYXRjaCgnIScpIHx8IG1hdGNoKCctJykpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5VTkFSWV9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiBsZXgoKS52YWwsXG4gICAgICAgICAgICAgICAgYXJnICA6IHBhcnNlVW5hcnlFeHByKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyc2VQcmltYXJ5RXhwcigpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUHJpbWFyeUV4cHIoKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGxvb2thaGVhZCgpLFxuICAgICAgICAgICAgdHlwZSA9IHRva2VuLnR5cGU7XG5cbiAgICAgICAgaWYodHlwZSA9PT0gVE9LRU4uU1RSIHx8IHR5cGUgPT09IFRPS0VOLk5VTSB8fCB0eXBlID09PSBUT0tFTi5CT09MIHx8IHR5cGUgPT09IFRPS0VOLk5VTEwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5MSVRFUkFMLFxuICAgICAgICAgICAgICAgIHZhbCAgOiBsZXgoKS52YWxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZihtYXRjaFBhdGgoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlUGF0aCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWF0Y2goJygnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlR3JvdXBFeHByKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhyb3dVbmV4cGVjdGVkKGxleCgpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUdyb3VwRXhwcigpIHtcbiAgICAgICAgZXhwZWN0KCcoJyk7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VMb2dpY2FsT1JFeHByKCk7XG4gICAgICAgIGV4cGVjdCgnKScpO1xuXG4gICAgICAgIHJldHVybiBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoKHZhbCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBsb29rYWhlYWQoKTtcbiAgICAgICAgcmV0dXJuIHRva2VuLnR5cGUgPT09IFRPS0VOLlBVTkNUICYmIHRva2VuLnZhbCA9PT0gdmFsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoUGF0aCgpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoU2VsZWN0b3IoKSB8fCBtYXRjaFN1YnN0KCkgfHwgbWF0Y2goJ14nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaFNlbGVjdG9yKCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBsb29rYWhlYWQoKTtcbiAgICAgICAgaWYodG9rZW4udHlwZSA9PT0gVE9LRU4uUFVOQ1QpIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSB0b2tlbi52YWw7XG4gICAgICAgICAgICByZXR1cm4gdmFsID09PSAnLicgfHwgdmFsID09PSAnLi4nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoU3Vic3QoKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGxvb2thaGVhZCgpO1xuICAgICAgICByZXR1cm4gdG9rZW4udHlwZSA9PT0gVE9LRU4uSUQgJiYgdG9rZW4udmFsWzBdID09PSAnJCc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXhwZWN0KHZhbCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBsZXgoKTtcbiAgICAgICAgaWYodG9rZW4udHlwZSAhPT0gVE9LRU4uUFVOQ1QgfHwgdG9rZW4udmFsICE9PSB2YWwpIHtcbiAgICAgICAgICAgIHRocm93VW5leHBlY3RlZCh0b2tlbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb29rYWhlYWQoKSB7XG4gICAgICAgIGlmKGJ1ZiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwb3MgPSBpZHg7XG4gICAgICAgIGJ1ZiA9IGFkdmFuY2UoKTtcbiAgICAgICAgaWR4ID0gcG9zO1xuXG4gICAgICAgIHJldHVybiBidWY7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWR2YW5jZSgpIHtcbiAgICAgICAgd2hpbGUoaXNXaGl0ZVNwYWNlKHBhdGhbaWR4XSkpIHtcbiAgICAgICAgICAgICsraWR4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaWR4ID49IGxlbikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLkVPUCxcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtpZHgsIGlkeF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG9rZW4gPSBzY2FuUHVuY3R1YXRvcigpO1xuICAgICAgICBpZih0b2tlbiB8fFxuICAgICAgICAgICAgICAgICh0b2tlbiA9IHNjYW5JZCgpKSB8fFxuICAgICAgICAgICAgICAgICh0b2tlbiA9IHNjYW5TdHJpbmcoKSkgfHxcbiAgICAgICAgICAgICAgICAodG9rZW4gPSBzY2FuTnVtZXJpYygpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9rZW4gPSB7IHJhbmdlIDogW2lkeCwgaWR4XSB9O1xuICAgICAgICBpZHggPj0gbGVuP1xuICAgICAgICAgICAgdG9rZW4udHlwZSA9IFRPS0VOLkVPUCA6XG4gICAgICAgICAgICB0b2tlbi52YWwgPSBwYXRoW2lkeF07XG5cbiAgICAgICAgdGhyb3dVbmV4cGVjdGVkKHRva2VuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsZXgoKSB7XG4gICAgICAgIHZhciB0b2tlbjtcblxuICAgICAgICBpZihidWYpIHtcbiAgICAgICAgICAgIGlkeCA9IGJ1Zi5yYW5nZVsxXTtcbiAgICAgICAgICAgIHRva2VuID0gYnVmO1xuICAgICAgICAgICAgYnVmID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhZHZhbmNlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNEaWdpdChjaCkge1xuICAgICAgICByZXR1cm4gJzAxMjM0NTY3ODknLmluZGV4T2YoY2gpID49IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNXaGl0ZVNwYWNlKGNoKSB7XG4gICAgICAgIHJldHVybiAnIFxcclxcblxcdCcuaW5kZXhPZihjaCkgPiAtMTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0lkU3RhcnQoY2gpIHtcbiAgICAgICAgcmV0dXJuIGNoID09PSAnJCcgfHwgY2ggPT09ICdAJyB8fCBjaCA9PT0gJ18nIHx8IChjaCA+PSAnYScgJiYgY2ggPD0gJ3onKSB8fCAoY2ggPj0gJ0EnICYmIGNoIDw9ICdaJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNJZFBhcnQoY2gpIHtcbiAgICAgICAgcmV0dXJuIGlzSWRTdGFydChjaCkgfHwgKGNoID49ICcwJyAmJiBjaCA8PSAnOScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjYW5JZCgpIHtcbiAgICAgICAgdmFyIGNoID0gcGF0aFtpZHhdO1xuXG4gICAgICAgIGlmKCFpc0lkU3RhcnQoY2gpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhcnQgPSBpZHgsXG4gICAgICAgICAgICBpZCA9IGNoO1xuXG4gICAgICAgIHdoaWxlKCsraWR4IDwgbGVuKSB7XG4gICAgICAgICAgICBjaCA9IHBhdGhbaWR4XTtcbiAgICAgICAgICAgIGlmKCFpc0lkUGFydChjaCkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkICs9IGNoO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoKGlkKSB7XG4gICAgICAgICAgICBjYXNlICd0cnVlJzpcbiAgICAgICAgICAgIGNhc2UgJ2ZhbHNlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLkJPT0wsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogaWQgPT09ICd0cnVlJyxcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeF1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjYXNlICdudWxsJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLk5VTEwsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeF1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uSUQsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogaWQsXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHhdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjYW5TdHJpbmcoKSB7XG4gICAgICAgIGlmKHBhdGhbaWR4XSAhPT0gJ1wiJyAmJiBwYXRoW2lkeF0gIT09ICdcXCcnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb3JpZyA9IHBhdGhbaWR4XSxcbiAgICAgICAgICAgIHN0YXJ0ID0gKytpZHgsXG4gICAgICAgICAgICBzdHIgPSAnJyxcbiAgICAgICAgICAgIGVvc0ZvdW5kID0gZmFsc2UsXG4gICAgICAgICAgICBjaDtcblxuICAgICAgICB3aGlsZShpZHggPCBsZW4pIHtcbiAgICAgICAgICAgIGNoID0gcGF0aFtpZHgrK107XG4gICAgICAgICAgICBpZihjaCA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgICAgY2ggPSBwYXRoW2lkeCsrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoKGNoID09PSAnXCInIHx8IGNoID09PSAnXFwnJykgJiYgY2ggPT09IG9yaWcpIHtcbiAgICAgICAgICAgICAgICBlb3NGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHIgKz0gY2g7XG4gICAgICAgIH1cblxuICAgICAgICBpZihlb3NGb3VuZCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlIDogVE9LRU4uU1RSLFxuICAgICAgICAgICAgICAgIHZhbCA6IHN0cixcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4XVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjYW5OdW1lcmljKCkge1xuICAgICAgICB2YXIgc3RhcnQgPSBpZHgsXG4gICAgICAgICAgICBjaCA9IHBhdGhbaWR4XSxcbiAgICAgICAgICAgIGlzRmxvYXQgPSBjaCA9PT0gJy4nO1xuXG4gICAgICAgIGlmKGlzRmxvYXQgfHwgaXNEaWdpdChjaCkpIHtcbiAgICAgICAgICAgIHZhciBudW0gPSBjaDtcbiAgICAgICAgICAgIHdoaWxlKCsraWR4IDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgY2ggPSBwYXRoW2lkeF07XG4gICAgICAgICAgICAgICAgaWYoY2ggPT09ICcuJykge1xuICAgICAgICAgICAgICAgICAgICBpZihpc0Zsb2F0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaXNGbG9hdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoIWlzRGlnaXQoY2gpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG51bSArPSBjaDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLk5VTSxcbiAgICAgICAgICAgICAgICB2YWwgICA6IGlzRmxvYXQ/IHBhcnNlRmxvYXQobnVtKSA6IHBhcnNlSW50KG51bSwgMTApLFxuICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHhdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2NhblB1bmN0dWF0b3IoKSB7XG4gICAgICAgIHZhciBzdGFydCA9IGlkeCxcbiAgICAgICAgICAgIGNoMSA9IHBhdGhbaWR4XSxcbiAgICAgICAgICAgIGNoMiA9IHBhdGhbaWR4ICsgMV07XG5cbiAgICAgICAgaWYoY2gxID09PSAnLicpIHtcbiAgICAgICAgICAgIGlmKGlzRGlnaXQoY2gyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhdGhbKytpZHhdID09PSAnLic/XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgICAgICB2YWwgICA6ICcuLicsXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCArK2lkeF1cbiAgICAgICAgICAgICAgICB9IDpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogJy4nLFxuICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4XVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZihjaDIgPT09ICc9Jykge1xuICAgICAgICAgICAgdmFyIGNoMyA9IHBhdGhbaWR4ICsgMl07XG4gICAgICAgICAgICBpZihjaDMgPT09ICc9Jykge1xuICAgICAgICAgICAgICAgIGlmKCc9IV4kKicuaW5kZXhPZihjaDEpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSArIGNoMiArIGNoMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHggKz0gM11cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCdeJConLmluZGV4T2YoY2gzKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYoY2gxID09PSAnPScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSArIGNoMiArIGNoMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHggKz0gM11cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCc9IV4kKj48Jy5pbmRleE9mKGNoMSkgPj0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogY2gxICsgY2gyLFxuICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4ICs9IDJdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGNoMSA9PT0gJz0nICYmICdeJConLmluZGV4T2YoY2gyKSA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgdmFsICAgOiBjaDEgKyBjaDIsXG4gICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeCArPSAyXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNoMSA9PT0gY2gyICYmIChjaDEgPT09ICd8JyB8fCBjaDEgPT09ICcmJykpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSArIGNoMixcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4ICs9IDJdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoJzp7fSgpW11eKy0qLyUhPjx8Jy5pbmRleE9mKGNoMSkgPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgIHZhbCAgIDogY2gxLFxuICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCArK2lkeF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0aHJvd1VuZXhwZWN0ZWQodG9rZW4pIHtcbiAgICAgICAgaWYodG9rZW4udHlwZSA9PT0gVE9LRU4uRU9QKSB7XG4gICAgICAgICAgICB0aHJvd0Vycm9yKHRva2VuLCBNRVNTQUdFUy5VTkVYUF9FT1ApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3dFcnJvcih0b2tlbiwgTUVTU0FHRVMuVU5FWFBfVE9LRU4sIHRva2VuLnZhbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGhyb3dFcnJvcih0b2tlbiwgbWVzc2FnZUZvcm1hdCkge1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMiksXG4gICAgICAgICAgICBtc2cgPSBtZXNzYWdlRm9ybWF0LnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgLyUoXFxkKS9nLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKF8sIGlkeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJnc1tpZHhdIHx8ICcnO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IobXNnKTtcblxuICAgICAgICBlcnJvci5jb2x1bW4gPSB0b2tlbi5yYW5nZVswXTtcblxuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2U7XG59KSgpO1xuXG4vLyB0cmFuc2xhdG9yXG5cbnZhciB0cmFuc2xhdGUgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgYm9keSwgdmFycywgbGFzdFZhcklkLCB1bnVzZWRWYXJzO1xuXG4gICAgZnVuY3Rpb24gYWNxdWlyZVZhcigpIHtcbiAgICAgICAgaWYodW51c2VkVmFycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB1bnVzZWRWYXJzLnNoaWZ0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdmFyTmFtZSA9ICd2JyArICsrbGFzdFZhcklkO1xuICAgICAgICB2YXJzLnB1c2godmFyTmFtZSk7XG4gICAgICAgIHJldHVybiB2YXJOYW1lO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbGVhc2VWYXJzKCkge1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cywgaSA9IGFyZ3MubGVuZ3RoO1xuICAgICAgICB3aGlsZShpLS0pIHtcbiAgICAgICAgICAgIHVudXNlZFZhcnMucHVzaChhcmdzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZShhc3QpIHtcbiAgICAgICAgYm9keSA9IFtdO1xuICAgICAgICB2YXJzID0gWydyZXMnXTtcbiAgICAgICAgbGFzdFZhcklkID0gMDtcbiAgICAgICAgdW51c2VkVmFycyA9IFtdO1xuXG4gICAgICAgIHRyYW5zbGF0ZUV4cHIoYXN0LCAncmVzJywgJ2RhdGEnKTtcblxuICAgICAgICBib2R5LnVuc2hpZnQoXG4gICAgICAgICAgICAndmFyICcsXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5P1xuICAgICAgICAgICAgICAgICdpc0FyciA9IEFycmF5LmlzQXJyYXknIDpcbiAgICAgICAgICAgICAgICAndG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLCBpc0FyciA9IGZ1bmN0aW9uKG8pIHsgcmV0dXJuIHRvU3RyLmNhbGwobykgPT09IFwiW29iamVjdCBBcnJheV1cIjsgfScsXG4gICAgICAgICAgICAgICAgJywgY29uY2F0ID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdCcsXG4gICAgICAgICAgICAgICAgJywnLCB2YXJzLmpvaW4oJywnKSwgJzsnKTtcblxuICAgICAgICBpZihhc3QudHlwZSA9PT0gU1lOVEFYLlBBVEgpIHtcbiAgICAgICAgICAgIHZhciBsYXN0UGFydCA9IGFzdC5wYXJ0c1thc3QucGFydHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZihsYXN0UGFydCAmJiBsYXN0UGFydC50eXBlID09PSBTWU5UQVguUE9TX1BSRUQgJiYgJ2lkeCcgaW4gbGFzdFBhcnQuYXJnKSB7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKCdyZXMgPSByZXNbMF07Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBib2R5LnB1c2goJ3JldHVybiByZXM7Jyk7XG5cbiAgICAgICAgcmV0dXJuIGJvZHkuam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlUGF0aChwYXRoLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gcGF0aC5wYXJ0cyxcbiAgICAgICAgICAgIGkgPSAwLCBsZW4gPSBwYXJ0cy5sZW5ndGg7XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgZGVzdCwgJz0nLCBwYXRoLmZyb21Sb290PyAnZGF0YScgOiBwYXRoLnN1YnN0PyAnc3Vic3QuJyArIHBhdGguc3Vic3QgOiBjdHgsICc7JyxcbiAgICAgICAgICAgICdpc0FycignICsgZGVzdCArICcpIHx8ICgnICsgZGVzdCArICcgPSBbJyArIGRlc3QgKyAnXSk7Jyk7XG5cbiAgICAgICAgd2hpbGUoaSA8IGxlbikge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBwYXJ0c1tpKytdO1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0udHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgU1lOVEFYLlNFTEVDVE9SOlxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdG9yID09PSAnLi4nP1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlRGVzY2VuZGFudFNlbGVjdG9yKGl0ZW0sIGRlc3QsIGRlc3QpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVNlbGVjdG9yKGl0ZW0sIGRlc3QsIGRlc3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgU1lOVEFYLk9CSl9QUkVEOlxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVPYmplY3RQcmVkaWNhdGUoaXRlbSwgZGVzdCwgZGVzdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBTWU5UQVguUE9TX1BSRUQ6XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVBvc1ByZWRpY2F0ZShpdGVtLCBkZXN0LCBkZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFNZTlRBWC5DT05DQVRfRVhQUjpcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlQ29uY2F0RXhwcihpdGVtLCBkZXN0LCBkZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVTZWxlY3RvcihzZWwsIGRlc3QsIGN0eCkge1xuICAgICAgICBpZihzZWwucHJvcCkge1xuICAgICAgICAgICAgdmFyIHByb3BTdHIgPSBlc2NhcGVTdHIoc2VsLnByb3ApLFxuICAgICAgICAgICAgICAgIHJlcyA9IGFjcXVpcmVWYXIoKSwgaSA9IGFjcXVpcmVWYXIoKSwgbGVuID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgICAgIGN1ckN0eCA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgICAgICBqID0gYWNxdWlyZVZhcigpLCB2YWwgPSBhY3F1aXJlVmFyKCksIHRtcEFyciA9IGFjcXVpcmVWYXIoKTtcblxuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgIHJlcywgJz0gW107JywgaSwgJz0gMDsnLCBsZW4sICc9JywgY3R4LCAnLmxlbmd0aDsnLCB0bXBBcnIsICc9IFtdOycsXG4gICAgICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuLCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgY3VyQ3R4LCAnPScsIGN0eCwgJ1snLCBpLCAnKytdOycsXG4gICAgICAgICAgICAgICAgICAgICdpZignLCBjdXJDdHgsICchPSBudWxsKSB7Jyk7XG4gICAgICAgICAgICBpZihzZWwucHJvcCA9PT0gJyonKSB7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKHR5cGVvZiAnLCBjdXJDdHgsICc9PT0gXCJvYmplY3RcIikgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKGlzQXJyKCcsIGN1ckN0eCwgJykpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMsICc9JywgcmVzLCAnLmNvbmNhdCgnLCBjdXJDdHgsICcpOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdlbHNlIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZm9yKCcsIGosICcgaW4gJywgY3VyQ3R4LCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZignLCBjdXJDdHgsICcuaGFzT3duUHJvcGVydHkoJywgaiwgJykpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCwgJz0nLCBjdXJDdHgsICdbJywgaiwgJ107Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwsICc9JywgY3VyQ3R4LCAnWycsIHByb3BTdHIsICddOycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIHZhbCwgdG1wQXJyLCBsZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgIGRlc3QsICc9JywgbGVuLCAnPiAxICYmJywgdG1wQXJyLCAnLmxlbmd0aD8nLCB0bXBBcnIsICcubGVuZ3RoID4gMT8nLFxuICAgICAgICAgICAgICAgICAgICAnY29uY2F0LmFwcGx5KCcsIHJlcywgJywnLCB0bXBBcnIsICcpIDonLCByZXMsICcuY29uY2F0KCcsIHRtcEFyciwgJ1swXSkgOicsIHJlcywgJzsnKTtcblxuICAgICAgICAgICAgcmVsZWFzZVZhcnMocmVzLCBpLCBsZW4sIGN1ckN0eCwgaiwgdmFsLCB0bXBBcnIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlRGVzY2VuZGFudFNlbGVjdG9yKHNlbCwgZGVzdCwgYmFzZUN0eCkge1xuICAgICAgICB2YXIgcHJvcCA9IHNlbC5wcm9wLFxuICAgICAgICAgICAgY3R4ID0gYWNxdWlyZVZhcigpLCBjdXJDdHggPSBhY3F1aXJlVmFyKCksIGNoaWxkQ3R4cyA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGkgPSBhY3F1aXJlVmFyKCksIGogPSBhY3F1aXJlVmFyKCksIHZhbCA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGxlbiA9IGFjcXVpcmVWYXIoKSwgcmVzID0gYWNxdWlyZVZhcigpO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgIGN0eCwgJz0nLCBiYXNlQ3R4LCAnLnNsaWNlKCksJywgcmVzLCAnPSBbXTsnLFxuICAgICAgICAgICAgJ3doaWxlKCcsIGN0eCwgJy5sZW5ndGgpIHsnLFxuICAgICAgICAgICAgICAgIGN1ckN0eCwgJz0nLCBjdHgsICcuc2hpZnQoKTsnKTtcbiAgICAgICAgcHJvcD9cbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAnaWYodHlwZW9mICcsIGN1ckN0eCwgJz09PSBcIm9iamVjdFwiICYmJywgY3VyQ3R4LCAnKSB7JykgOlxuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICdpZih0eXBlb2YgJywgY3VyQ3R4LCAnIT0gbnVsbCkgeycpO1xuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkQ3R4cywgJz0gW107JyxcbiAgICAgICAgICAgICAgICAgICAgJ2lmKGlzQXJyKCcsIGN1ckN0eCwgJykpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaSwgJz0gMCwnLCBsZW4sICc9JywgY3VyQ3R4LCAnLmxlbmd0aDsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuLCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwsICc9JywgY3VyQ3R4LCAnWycsIGksICcrK107Jyk7XG4gICAgICAgIHByb3AgJiYgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZih0eXBlb2YgJywgdmFsLCAnPT09IFwib2JqZWN0XCIpIHsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShjaGlsZEN0eHMsIHZhbCk7XG4gICAgICAgIHByb3AgJiYgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAnZWxzZSB7Jyk7XG4gICAgICAgIGlmKHByb3ApIHtcbiAgICAgICAgICAgIGlmKHByb3AgIT09ICcqJykge1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCwgJz0nLCBjdXJDdHgsICdbXCInICsgcHJvcCArICdcIl07Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVBcHBlbmRUb0FycmF5KHJlcywgdmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZUFwcGVuZFRvQXJyYXkocmVzLCBjdXJDdHgpO1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKHR5cGVvZiAnLCBjdXJDdHgsICc9PT0gXCJvYmplY3RcIikgeycpO1xuICAgICAgICB9XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmb3IoJywgaiwgJyBpbiAnLCBjdXJDdHgsICcpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWYoJywgY3VyQ3R4LCAnLmhhc093blByb3BlcnR5KCcsIGosICcpKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCwgJz0nLCBjdXJDdHgsICdbJywgaiwgJ107Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVBcHBlbmRUb0FycmF5KGNoaWxkQ3R4cywgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3AgPT09ICcqJyAmJiBpbmxpbmVBcHBlbmRUb0FycmF5KHJlcywgdmFsKTtcbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgcHJvcCB8fCBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAnfScpO1xuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRDdHhzLCAnLmxlbmd0aCAmJicsIGN0eCwgJy51bnNoaWZ0LmFwcGx5KCcsIGN0eCwgJywnLCBjaGlsZEN0eHMsICcpOycsXG4gICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgZGVzdCwgJz0nLCByZXMsICc7Jyk7XG5cbiAgICAgICAgcmVsZWFzZVZhcnMoY3R4LCBjdXJDdHgsIGNoaWxkQ3R4cywgaSwgaiwgdmFsLCBsZW4sIHJlcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlT2JqZWN0UHJlZGljYXRlKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgcmVzVmFyID0gYWNxdWlyZVZhcigpLCBpID0gYWNxdWlyZVZhcigpLCBsZW4gPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBjb25kID0gYWNxdWlyZVZhcigpLCBjdXJJdGVtID0gYWNxdWlyZVZhcigpO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgIHJlc1ZhciwgJz0gW107JyxcbiAgICAgICAgICAgIGksICc9IDA7JyxcbiAgICAgICAgICAgIGxlbiwgJz0nLCBjdHgsICcubGVuZ3RoOycsXG4gICAgICAgICAgICAnd2hpbGUoJywgaSwgJzwnLCBsZW4sICcpIHsnLFxuICAgICAgICAgICAgICAgIGN1ckl0ZW0sICc9JywgY3R4LCAnWycsIGksICcrK107Jyk7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihleHByLmFyZywgY29uZCwgY3VySXRlbSk7XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICBjb252ZXJ0VG9Cb29sKGV4cHIuYXJnLCBjb25kKSwgJyYmJywgcmVzVmFyLCAnLnB1c2goJywgY3VySXRlbSwgJyk7JyxcbiAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgIGRlc3QsICc9JywgcmVzVmFyLCAnOycpO1xuXG4gICAgICAgIHJlbGVhc2VWYXJzKHJlc1ZhciwgaSwgbGVuLCBjdXJJdGVtLCBjb25kKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVQb3NQcmVkaWNhdGUoaXRlbSwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciBhcnJheUV4cHIgPSBpdGVtLmFyZywgZnJvbUlkeCwgdG9JZHg7XG4gICAgICAgIGlmKGFycmF5RXhwci5pZHgpIHtcbiAgICAgICAgICAgIHZhciBpZHggPSBhY3F1aXJlVmFyKCk7XG4gICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFycmF5RXhwci5pZHgsIGlkeCwgY3R4KTtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICBpZHgsICc8IDAgJiYgKCcsIGlkeCwgJz0nLCBjdHgsICcubGVuZ3RoICsnLCBpZHgsICcpOycsXG4gICAgICAgICAgICAgICAgZGVzdCwgJz0nLCBjdHgsICdbJywgaWR4LCAnXSA9PSBudWxsPyBbXSA6IFsnLCBjdHgsICdbJywgaWR4LCAnXV07Jyk7XG4gICAgICAgICAgICByZWxlYXNlVmFycyhpZHgpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYXJyYXlFeHByLmZyb21JZHgpIHtcbiAgICAgICAgICAgIGlmKGFycmF5RXhwci50b0lkeCkge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJyYXlFeHByLmZyb21JZHgsIGZyb21JZHggPSBhY3F1aXJlVmFyKCksIGN0eCk7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcnJheUV4cHIudG9JZHgsIHRvSWR4ID0gYWNxdWlyZVZhcigpLCBjdHgpO1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPScsIGN0eCwgJy5zbGljZSgnLCBmcm9tSWR4LCAnLCcsIHRvSWR4LCAnKTsnKTtcbiAgICAgICAgICAgICAgICByZWxlYXNlVmFycyhmcm9tSWR4LCB0b0lkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFycmF5RXhwci5mcm9tSWR4LCBmcm9tSWR4ID0gYWNxdWlyZVZhcigpLCBjdHgpO1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPScsIGN0eCwgJy5zbGljZSgnLCBmcm9tSWR4LCAnKTsnKTtcbiAgICAgICAgICAgICAgICByZWxlYXNlVmFycyhmcm9tSWR4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJyYXlFeHByLnRvSWR4LCB0b0lkeCA9IGFjcXVpcmVWYXIoKSwgY3R4KTtcbiAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPScsIGN0eCwgJy5zbGljZSgwLCcsIHRvSWR4LCAnKTsnKTtcbiAgICAgICAgICAgIHJlbGVhc2VWYXJzKHRvSWR4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUV4cHIoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHN3aXRjaChleHByLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLlBBVEg6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlUGF0aChleHByLCBkZXN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5DT05DQVRfRVhQUjpcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVDb25jYXRFeHByKGV4cHIsIGRlc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkNPTVBBUklTT05fRVhQUjpcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVDb21wYXJpc29uRXhwcihleHByLCBkZXN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5NQVRIX0VYUFI6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlTWF0aEV4cHIoZXhwciwgZGVzdCwgY3R4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguTE9HSUNBTF9FWFBSOlxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUxvZ2ljYWxFeHByKGV4cHIsIGRlc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLlVOQVJZX0VYUFI6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlVW5hcnlFeHByKGV4cHIsIGRlc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkxJVEVSQUw6XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9Jyk7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlTGl0ZXJhbChleHByLnZhbCk7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKCc7Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVMaXRlcmFsKHZhbCkge1xuICAgICAgICBib2R5LnB1c2godHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc/IGVzY2FwZVN0cih2YWwpIDogdmFsID09PSBudWxsPyAnbnVsbCcgOiB2YWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUNvbXBhcmlzb25FeHByKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgdmFsMSA9IGFjcXVpcmVWYXIoKSwgdmFsMiA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGlzVmFsMUFycmF5ID0gYWNxdWlyZVZhcigpLCBpc1ZhbDJBcnJheSA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGkgPSBhY3F1aXJlVmFyKCksIGogPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBsZW4xID0gYWNxdWlyZVZhcigpLCBsZW4yID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgbGVmdEFyZyA9IGV4cHIuYXJnc1swXSwgcmlnaHRBcmcgPSBleHByLmFyZ3NbMV07XG5cbiAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9IGZhbHNlOycpO1xuXG4gICAgICAgIHRyYW5zbGF0ZUV4cHIobGVmdEFyZywgdmFsMSwgY3R4KTtcbiAgICAgICAgdHJhbnNsYXRlRXhwcihyaWdodEFyZywgdmFsMiwgY3R4KTtcblxuICAgICAgICB2YXIgaXNMZWZ0QXJnUGF0aCA9IGxlZnRBcmcudHlwZSA9PT0gU1lOVEFYLlBBVEgsXG4gICAgICAgICAgICBpc1JpZ2h0QXJnTGl0ZXJhbCA9IHJpZ2h0QXJnLnR5cGUgPT09IFNZTlRBWC5MSVRFUkFMO1xuXG4gICAgICAgIGJvZHkucHVzaChpc1ZhbDFBcnJheSwgJz0nKTtcbiAgICAgICAgaXNMZWZ0QXJnUGF0aD8gYm9keS5wdXNoKCd0cnVlOycpIDogYm9keS5wdXNoKCdpc0FycignLCB2YWwxLCAnKTsnKTtcblxuICAgICAgICBib2R5LnB1c2goaXNWYWwyQXJyYXksICc9Jyk7XG4gICAgICAgIGlzUmlnaHRBcmdMaXRlcmFsPyBib2R5LnB1c2goJ2ZhbHNlOycpIDogYm9keS5wdXNoKCdpc0FycignLCB2YWwyLCAnKTsnKTtcblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAnaWYoJyk7XG4gICAgICAgIGlzTGVmdEFyZ1BhdGggfHwgYm9keS5wdXNoKGlzVmFsMUFycmF5LCAnJiYnKTtcbiAgICAgICAgYm9keS5wdXNoKHZhbDEsICcubGVuZ3RoID09PSAxKSB7JyxcbiAgICAgICAgICAgICAgICB2YWwxLCAnPScsIHZhbDEsICdbMF07JyxcbiAgICAgICAgICAgICAgICBpc1ZhbDFBcnJheSwgJz0gZmFsc2U7JyxcbiAgICAgICAgICAgICd9Jyk7XG4gICAgICAgIGlzUmlnaHRBcmdMaXRlcmFsIHx8IGJvZHkucHVzaChcbiAgICAgICAgICAgICdpZignLCBpc1ZhbDJBcnJheSwgJyYmJywgdmFsMiwgJy5sZW5ndGggPT09IDEpIHsnLFxuICAgICAgICAgICAgICAgIHZhbDIsICc9JywgdmFsMiwgJ1swXTsnLFxuICAgICAgICAgICAgICAgIGlzVmFsMkFycmF5LCAnPSBmYWxzZTsnLFxuICAgICAgICAgICAgJ30nKTtcblxuICAgICAgICBib2R5LnB1c2goaSwgJz0gMDsnLFxuICAgICAgICAgICAgJ2lmKCcsIGlzVmFsMUFycmF5LCAnKSB7JyxcbiAgICAgICAgICAgICAgICBsZW4xLCAnPScsIHZhbDEsICcubGVuZ3RoOycpO1xuXG4gICAgICAgIGlmKCFpc1JpZ2h0QXJnTGl0ZXJhbCkge1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICdpZignLCBpc1ZhbDJBcnJheSwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgIGxlbjIsICc9JywgdmFsMiwgJy5sZW5ndGg7JyxcbiAgICAgICAgICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuMSwgJyYmICEnLCBkZXN0LCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGosICc9IDA7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd3aGlsZSgnLCBqLCAnPCcsIGxlbjIsICcpIHsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUNvbmRpdGlvbihleHByLm9wLCBbdmFsMSwgJ1snLCBpLCAnXSddLmpvaW4oJycpLCBbdmFsMiwgJ1snLCBqLCAnXSddLmpvaW4oJycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3QsICc9IHRydWU7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JyZWFrOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcrKycsIGosICc7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICcrKycsIGksICc7JyxcbiAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAnZWxzZSB7Jyk7XG4gICAgICAgIH1cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAnd2hpbGUoJywgaSwgJzwnLCBsZW4xLCAnKSB7Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUNvbmRpdGlvbihleHByLm9wLCBbdmFsMSwgJ1snLCBpLCAnXSddLmpvaW4oJycpLCB2YWwyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0LCAnPSB0cnVlOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JyZWFrOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnKysnLCBpLCAnOycsXG4gICAgICAgICAgICAgICAgICAgICd9Jyk7XG5cbiAgICAgICAgaXNSaWdodEFyZ0xpdGVyYWwgfHwgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICd9Jyk7XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgJ30nKTtcblxuICAgICAgICBpZighaXNSaWdodEFyZ0xpdGVyYWwpIHtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICdlbHNlIGlmKCcsIGlzVmFsMkFycmF5LCcpIHsnLFxuICAgICAgICAgICAgICAgIGxlbjIsICc9JywgdmFsMiwgJy5sZW5ndGg7JyxcbiAgICAgICAgICAgICAgICAnd2hpbGUoJywgaSwgJzwnLCBsZW4yLCAnKSB7Jyk7XG4gICAgICAgICAgICAgICAgICAgIHdyaXRlQ29uZGl0aW9uKGV4cHIub3AsIHZhbDEsIFt2YWwyLCAnWycsIGksICddJ10uam9pbignJykpO1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdCwgJz0gdHJ1ZTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2JyZWFrOycsXG4gICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgJysrJywgaSwgJzsnLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICd9Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAnZWxzZSB7JyxcbiAgICAgICAgICAgICAgICBkZXN0LCAnPScsIGJpbmFyeU9wZXJhdG9yc1tleHByLm9wXSh2YWwxLCB2YWwyKSwgJzsnLFxuICAgICAgICAgICAgJ30nKTtcblxuICAgICAgICByZWxlYXNlVmFycyh2YWwxLCB2YWwyLCBpc1ZhbDFBcnJheSwgaXNWYWwyQXJyYXksIGksIGosIGxlbjEsIGxlbjIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdyaXRlQ29uZGl0aW9uKG9wLCB2YWwxRXhwciwgdmFsMkV4cHIpIHtcbiAgICAgICAgYm9keS5wdXNoKCdpZignLCBiaW5hcnlPcGVyYXRvcnNbb3BdKHZhbDFFeHByLCB2YWwyRXhwciksICcpIHsnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVMb2dpY2FsRXhwcihleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIGNvbmRpdGlvblZhcnMgPSBbXSxcbiAgICAgICAgICAgIGFyZ3MgPSBleHByLmFyZ3MsIGxlbiA9IGFyZ3MubGVuZ3RoLFxuICAgICAgICAgICAgaSA9IDAsIHZhbDtcblxuICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0gZmFsc2U7Jyk7XG4gICAgICAgIHN3aXRjaChleHByLm9wKSB7XG4gICAgICAgICAgICBjYXNlICcmJic6XG4gICAgICAgICAgICAgICAgd2hpbGUoaSA8IGxlbikge1xuICAgICAgICAgICAgICAgICAgICBjb25kaXRpb25WYXJzLnB1c2godmFsID0gYWNxdWlyZVZhcigpKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcmdzW2ldLCB2YWwsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaCgnaWYoJywgY29udmVydFRvQm9vbChhcmdzW2krK10sIHZhbCksICcpIHsnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9IHRydWU7Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3x8JzpcbiAgICAgICAgICAgICAgICB3aGlsZShpIDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvblZhcnMucHVzaCh2YWwgPSBhY3F1aXJlVmFyKCkpO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFyZ3NbaV0sIHZhbCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKCcsIGNvbnZlcnRUb0Jvb2woYXJnc1tpXSwgdmFsKSwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdCwgJz0gdHJ1ZTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoaSsrICsgMSA8IGxlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5wdXNoKCdlbHNlIHsnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAtLWxlbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlKGxlbi0tKSB7XG4gICAgICAgICAgICBib2R5LnB1c2goJ30nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbGVhc2VWYXJzLmFwcGx5KG51bGwsIGNvbmRpdGlvblZhcnMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZU1hdGhFeHByKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgdmFsMSA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIHZhbDIgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBhcmdzID0gZXhwci5hcmdzO1xuXG4gICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnc1swXSwgdmFsMSwgY3R4KTtcbiAgICAgICAgdHJhbnNsYXRlRXhwcihhcmdzWzFdLCB2YWwyLCBjdHgpO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgIGRlc3QsICc9JyxcbiAgICAgICAgICAgIGJpbmFyeU9wZXJhdG9yc1tleHByLm9wXShcbiAgICAgICAgICAgICAgICBjb252ZXJ0VG9TaW5nbGVWYWx1ZShhcmdzWzBdLCB2YWwxKSxcbiAgICAgICAgICAgICAgICBjb252ZXJ0VG9TaW5nbGVWYWx1ZShhcmdzWzFdLCB2YWwyKSksXG4gICAgICAgICAgICAnOycpO1xuXG4gICAgICAgIHJlbGVhc2VWYXJzKHZhbDEsIHZhbDIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZVVuYXJ5RXhwcihleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGFyZyA9IGV4cHIuYXJnO1xuXG4gICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnLCB2YWwsIGN0eCk7XG5cbiAgICAgICAgc3dpdGNoKGV4cHIub3ApIHtcbiAgICAgICAgICAgIGNhc2UgJyEnOlxuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPSAhJywgY29udmVydFRvQm9vbChhcmcsIHZhbCkgKyAnOycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICctJzpcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0gLScsIGNvbnZlcnRUb1NpbmdsZVZhbHVlKGFyZywgdmFsKSArICc7Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZWxlYXNlVmFycyh2YWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUNvbmNhdEV4cHIoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciBhcmdWYXJzID0gW10sXG4gICAgICAgICAgICBhcmdzID0gZXhwci5hcmdzLFxuICAgICAgICAgICAgbGVuID0gYXJncy5sZW5ndGgsXG4gICAgICAgICAgICBpID0gMDtcblxuICAgICAgICB3aGlsZShpIDwgbGVuKSB7XG4gICAgICAgICAgICBhcmdWYXJzLnB1c2goYWNxdWlyZVZhcigpKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnc1tpXSwgYXJnVmFyc1tpKytdLCBjdHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9IGNvbmNhdC5jYWxsKCcsIGFyZ1ZhcnMuam9pbignLCcpLCAnKTsnKTtcblxuICAgICAgICByZWxlYXNlVmFycy5hcHBseShudWxsLCBhcmdWYXJzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlc2NhcGVTdHIocykge1xuICAgICAgICByZXR1cm4gJ1xcJycgKyBzLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJykucmVwbGFjZSgvJy9nLCAnXFxcXFxcJycpICsgJ1xcJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIHZhbCwgdG1wQXJyLCBsZW4pIHtcbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgJ2lmKHR5cGVvZiAnLCB2YWwsICchPT0gXCJ1bmRlZmluZWRcIikgeycsXG4gICAgICAgICAgICAgICAgJ2lmKGlzQXJyKCcsIHZhbCwgJykpIHsnKTtcbiAgICAgICAgaWYodG1wQXJyKSB7XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgIGxlbiwgJz4gMT8nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZVB1c2hUb0FycmF5KHRtcEFyciwgdmFsKTtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICc6Jyk7XG4gICAgICAgIH1cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICByZXMsICc9JywgcmVzLCAnLmxlbmd0aD8nLCByZXMsICcuY29uY2F0KCcsIHZhbCwgJykgOicsIHZhbCwgJy5zbGljZSgpJywgJzsnLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAnZWxzZSB7Jyk7XG4gICAgICAgIHRtcEFyciAmJiBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICdpZignLCB0bXBBcnIsICcubGVuZ3RoKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcywgJz0gY29uY2F0LmFwcGx5KCcsIHJlcywgJywnLCB0bXBBcnIsICcpOycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBBcnIsICc9IFtdOycsXG4gICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlubGluZVB1c2hUb0FycmF5KHJlcywgdmFsKTtcbiAgICAgICAgYm9keS5wdXNoKCc7JyxcbiAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAnfScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlubGluZVB1c2hUb0FycmF5KHJlcywgdmFsKSB7XG4gICAgICAgIGJvZHkucHVzaChyZXMsICcubGVuZ3RoPycsIHJlcywgJy5wdXNoKCcsIHZhbCwgJykgOicsICByZXMsICdbMF0gPScsIHZhbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29udmVydFRvQm9vbChhcmcsIHZhck5hbWUpIHtcbiAgICAgICAgc3dpdGNoKGFyZy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5MT0dJQ0FMX0VYUFI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhck5hbWU7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkxJVEVSQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICchIScgKyB2YXJOYW1lO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5QQVRIOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YXJOYW1lICsgJy5sZW5ndGggPiAwJztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gWycodHlwZW9mICcsIHZhck5hbWUsICc9PT0gXCJib29sZWFuXCI/JyxcbiAgICAgICAgICAgICAgICAgICAgdmFyTmFtZSwgJzonLFxuICAgICAgICAgICAgICAgICAgICAnaXNBcnIoJywgdmFyTmFtZSwgJyk/JywgdmFyTmFtZSwgJy5sZW5ndGggPiAwIDogISEnLCB2YXJOYW1lLCAnKSddLmpvaW4oJycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29udmVydFRvU2luZ2xlVmFsdWUoYXJnLCB2YXJOYW1lKSB7XG4gICAgICAgIHN3aXRjaChhcmcudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTWU5UQVguTElURVJBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyTmFtZTtcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguUEFUSDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyTmFtZSArICdbMF0nO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBbJyhpc0FycignLCB2YXJOYW1lLCAnKT8nLCB2YXJOYW1lLCAnWzBdIDogJywgdmFyTmFtZSwgJyknXS5qb2luKCcnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0YXJ0c1dpdGhTdHJpY3QodmFsMSwgdmFsMikge1xuICAgICAgICByZXR1cm4gWyd0eXBlb2YgJywgdmFsMSwgJz09PSBcInN0cmluZ1wiICYmIHR5cGVvZiAnLCB2YWwyLCAnPT09IFwic3RyaW5nXCIgJiYnLFxuICAgICAgICAgICAgdmFsMSwgJy5pbmRleE9mKCcsIHZhbDIsICcpID09PSAwJ10uam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RhcnRzV2l0aCh2YWwxLCB2YWwyKSB7XG4gICAgICAgIHJldHVybiBbdmFsMSwgJyE9IG51bGwgJiYnLCB2YWwyLCAnIT0gbnVsbCAmJicsXG4gICAgICAgICAgICB2YWwxLCAnLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKCcsIHZhbDIsICcudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSA9PT0gMCddLmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZHNXaXRoU3RyaWN0KHZhbDEsIHZhbDIpIHtcbiAgICAgICAgcmV0dXJuIFsndHlwZW9mICcsIHZhbDEsICc9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgJywgdmFsMiwgJz09PSBcInN0cmluZ1wiICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcubGVuZ3RoID49JywgdmFsMiwgJy5sZW5ndGggJiYnLFxuICAgICAgICAgICAgdmFsMSwgJy5sYXN0SW5kZXhPZignLCB2YWwyLCAnKSA9PT0nLCB2YWwxLCAnLmxlbmd0aCAtJywgdmFsMiwgJy5sZW5ndGgnXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRzV2l0aCh2YWwxLCB2YWwyKSB7XG4gICAgICAgIHJldHVybiBbdmFsMSwgJyE9IG51bGwgJiYnLCB2YWwyLCAnIT0gbnVsbCAmJicsXG4gICAgICAgICAgICAnKCcsIHZhbDEsICc9JywgdmFsMSwgJy50b1N0cmluZygpKS5sZW5ndGggPj0nLCAnKCcsIHZhbDIsICc9JywgdmFsMiwgJy50b1N0cmluZygpKS5sZW5ndGggJiYnLFxuICAgICAgICAgICAgJygnLCB2YWwxLCAnLnRvTG93ZXJDYXNlKCkpLmxhc3RJbmRleE9mKCcsICcoJywgdmFsMiwgJy50b0xvd2VyQ2FzZSgpKSkgPT09JyxcbiAgICAgICAgICAgIHZhbDEsICcubGVuZ3RoIC0nLCB2YWwyLCAnLmxlbmd0aCddLmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbnRhaW5zU3RyaWN0KHZhbDEsIHZhbDIpIHtcbiAgICAgICAgcmV0dXJuIFsndHlwZW9mICcsIHZhbDEsICc9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgJywgdmFsMiwgJz09PSBcInN0cmluZ1wiICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcuaW5kZXhPZignLCB2YWwyLCAnKSA+IC0xJ10uam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29udGFpbnModmFsMSwgdmFsMikge1xuICAgICAgICByZXR1cm4gW3ZhbDEsICchPSBudWxsICYmICcsIHZhbDIsICchPSBudWxsICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJywgdmFsMiwgJy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkpID4gLTEnXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICB2YXIgYmluYXJ5T3BlcmF0b3JzID0ge1xuICAgICAgICAgICAgJz09PScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnPT09JyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnPT0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBbJ3R5cGVvZiAnLCB2YWwxLCAnPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mICcsIHZhbDIsICc9PT0gXCJzdHJpbmdcIj8nLFxuICAgICAgICAgICAgICAgICAgICB2YWwxLCAnLnRvTG93ZXJDYXNlKCkgPT09JywgdmFsMiwgJy50b0xvd2VyQ2FzZSgpIDonICtcbiAgICAgICAgICAgICAgICAgICAgdmFsMSwgJz09JywgdmFsMl0uam9pbignJyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnPj0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJz49JyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnPicgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnPicgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJzw9JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICc8PScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJzwnIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJzwnICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICchPT0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJyE9PScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyE9JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICchPScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJ149PScgOiBzdGFydHNXaXRoU3RyaWN0LFxuXG4gICAgICAgICAgICAnPT1eJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhcnRzV2l0aFN0cmljdCh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICdePScgOiBzdGFydHNXaXRoLFxuXG4gICAgICAgICAgICAnPV4nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGFydHNXaXRoKHZhbDIsIHZhbDEpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyQ9PScgOiBlbmRzV2l0aFN0cmljdCxcblxuICAgICAgICAgICAgJz09JCcgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVuZHNXaXRoU3RyaWN0KHZhbDIsIHZhbDEpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyQ9JyA6IGVuZHNXaXRoLFxuXG4gICAgICAgICAgICAnPSQnIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbmRzV2l0aCh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICcqPT0nIDogY29udGFpbnNTdHJpY3QsXG5cbiAgICAgICAgICAgICc9PSonIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluc1N0cmljdCh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICc9KicgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5zKHZhbDIsIHZhbDEpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyo9JyA6IGNvbnRhaW5zLFxuXG4gICAgICAgICAgICAnKycgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnKycgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJy0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJy0nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICcqJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICcqJyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnLycgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnLycgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyUnIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJyUnICsgdmFsMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIHJldHVybiB0cmFuc2xhdGU7XG59KSgpO1xuXG5mdW5jdGlvbiBjb21waWxlKHBhdGgpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24oJ2RhdGEsc3Vic3QnLCB0cmFuc2xhdGUocGFyc2UocGF0aCkpKTtcbn1cblxudmFyIGNhY2hlID0ge30sXG4gICAgY2FjaGVLZXlzID0gW10sXG4gICAgcGFyYW1zID0ge1xuICAgICAgICBjYWNoZVNpemUgOiAxMDBcbiAgICB9LFxuICAgIHNldFBhcmFtc0hvb2tzID0ge1xuICAgICAgICBjYWNoZVNpemUgOiBmdW5jdGlvbihvbGRWYWwsIG5ld1ZhbCkge1xuICAgICAgICAgICAgaWYobmV3VmFsIDwgb2xkVmFsICYmIGNhY2hlS2V5cy5sZW5ndGggPiBuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlZEtleXMgPSBjYWNoZUtleXMuc3BsaWNlKDAsIGNhY2hlS2V5cy5sZW5ndGggLSBuZXdWYWwpLFxuICAgICAgICAgICAgICAgICAgICBpID0gcmVtb3ZlZEtleXMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgd2hpbGUoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYWNoZVtyZW1vdmVkS2V5c1tpXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxudmFyIGRlY2wgPSBmdW5jdGlvbihwYXRoLCBjdHgsIHN1YnN0cykge1xuICAgIGlmKCFjYWNoZVtwYXRoXSkge1xuICAgICAgICBjYWNoZVtwYXRoXSA9IGNvbXBpbGUocGF0aCk7XG4gICAgICAgIGlmKGNhY2hlS2V5cy5wdXNoKHBhdGgpID4gcGFyYW1zLmNhY2hlU2l6ZSkge1xuICAgICAgICAgICAgZGVsZXRlIGNhY2hlW2NhY2hlS2V5cy5zaGlmdCgpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjYWNoZVtwYXRoXShjdHgsIHN1YnN0cyB8fCB7fSk7XG59O1xuXG5kZWNsLnZlcnNpb24gPSAnMC40LjAnO1xuXG5kZWNsLnBhcmFtcyA9IGZ1bmN0aW9uKF9wYXJhbXMpIHtcbiAgICBpZighYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cblxuICAgIGZvcih2YXIgbmFtZSBpbiBfcGFyYW1zKSB7XG4gICAgICAgIGlmKF9wYXJhbXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICAgICAgICAgIHNldFBhcmFtc0hvb2tzW25hbWVdICYmIHNldFBhcmFtc0hvb2tzW25hbWVdKHBhcmFtc1tuYW1lXSwgX3BhcmFtc1tuYW1lXSk7XG4gICAgICAgICAgICBwYXJhbXNbbmFtZV0gPSBfcGFyYW1zW25hbWVdO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZGVjbC5jb21waWxlID0gY29tcGlsZTtcblxuZGVjbC5hcHBseSA9IGRlY2w7XG5cbmlmKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRlY2w7XG59XG5lbHNlIGlmKHR5cGVvZiBtb2R1bGVzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZXMuZGVmaW5lKCdqc3BhdGgnLCBmdW5jdGlvbihwcm92aWRlKSB7XG4gICAgICAgIHByb3ZpZGUoZGVjbCk7XG4gICAgfSk7XG59XG5lbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24ocmVxdWlyZSwgZXhwb3J0cywgbW9kdWxlKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZGVjbDtcbiAgICB9KTtcbn1cbmVsc2Uge1xuICAgIHdpbmRvdy5KU1BhdGggPSBkZWNsO1xufVxuXG59KSgpO1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBFUzYgRVhURU5TSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pZighU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoKVxue1xuXHRTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGggPSBmdW5jdGlvbihzKVxuXHR7XG5cdFx0Y29uc3QgYmFzZSA9IDB4MDAwMDAwMDAwMDAwMDAwMDAwMDA7XG5cblx0XHRyZXR1cm4gdGhpcy5pbmRleE9mKHMsIGJhc2UpID09PSBiYXNlO1xuXHR9O1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaWYoIVN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGgpXG57XG5cdFN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGggPSBmdW5jdGlvbihzKVxuXHR7XG5cdFx0Y29uc3QgYmFzZSA9IHRoaXMubGVuZ3RoIC0gcy5sZW5ndGg7XG5cblx0XHRyZXR1cm4gdGhpcy5pbmRleE9mKHMsIGJhc2UpID09PSBiYXNlO1xuXHR9O1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEpRVUVSWSBFWFRFTlNJT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbnZhciBfYW1pX2ludGVybmFsX2pRdWVyeUVhY2ggPSBqUXVlcnkuZWFjaDtcbnZhciBfYW1pX2ludGVybmFsX2pRdWVyeUFqYXggPSBqUXVlcnkuYWpheDtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmpRdWVyeS5lYWNoID0gZnVuY3Rpb24oZWwsIGNhbGxiYWNrLCBjb250ZXh0KVxue1xuXHRyZXR1cm4gX2FtaV9pbnRlcm5hbF9qUXVlcnlFYWNoKGVsLCBjb250ZXh0ID8gKGluZGV4LCB2YWx1ZSkgPT4gY2FsbGJhY2suY2FsbChjb250ZXh0LCBpbmRleCwgdmFsdWUpIDogY2FsbGJhY2spO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmpRdWVyeS5hamF4ID0gZnVuY3Rpb24oc2V0dGluZ3MpXG57XG5cdGlmKHR5cGVvZiBzZXR0aW5ncyA9PT0gJ29iamVjdCdcblx0ICAgJiZcblx0ICAgc2V0dGluZ3MuZGF0YVR5cGUgPT09ICdzaGVldCdcblx0ICkge1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0LCB1cmxdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0JywgJ3VybCddLFxuXHRcdFx0W3Jlc3VsdCwgJyddLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpXG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih1cmwpXG5cdFx0e1xuXHRcdFx0JCgnaGVhZCcpLmFwcGVuZCgnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCInICsgdXJsICsgJ1wiPjwvbGluaz4nKS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0KTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fVxuXHRlbHNlXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gX2FtaV9pbnRlcm5hbF9qUXVlcnlBamF4LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH1cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmaW5kV2l0aFNlbGY6IGZ1bmN0aW9uKHNlbGVjdG9yKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZmluZChzZWxlY3RvcikuYWRkQmFjayhzZWxlY3Rvcik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXJpYWxpemVPYmplY3Q6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IHt9O1xuXG5cdFx0dGhpcy5zZXJpYWxpemVBcnJheSgpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0aWYoaXRlbS5uYW1lIGluIHJlc3VsdClcblx0XHRcdHtcblx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHJlc3VsdFtpdGVtLm5hbWVdKSA9PT0gJ1tvYmplY3QgU3RyaW5nXScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHRbaXRlbS5uYW1lXSA9IFtyZXN1bHRbaXRlbS5uYW1lXV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXN1bHRbaXRlbS5uYW1lXS5wdXNoKGl0ZW0udmFsdWUgfHwgJycpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHRbaXRlbS5uYW1lXSA9IGl0ZW0udmFsdWUgfHwgJyc7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBCT09UU1RSQVAgRVhURU5TSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG52YXIgX2FtaV9pbnRlcm5hbF9tb2RhbFpJbmRleCA9IDEwNTA7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kKGRvY3VtZW50KS5vbignc2hvdy5icy5tb2RhbCcsICcubW9kYWwnLCAoZSkgPT4ge1xuXG5cdGNvbnN0IGVsID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXG5cdHNldFRpbWVvdXQoKCkgPT4ge1xuXG5cdFx0JCgnYm9keSA+IC5tb2RhbC1iYWNrZHJvcDpsYXN0JykuY3NzKCd6LWluZGV4JywgX2FtaV9pbnRlcm5hbF9tb2RhbFpJbmRleCsrKTtcblx0XHQvKi0tLS0tLS0tLS0tKi9lbC8qLS0tLS0tLS0tLS0qLy5jc3MoJ3otaW5kZXgnLCBfYW1pX2ludGVybmFsX21vZGFsWkluZGV4KyspO1xuXG5cdH0sIDEwKTtcbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogTkFNRVNQQUNFIEhFTFBFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZnVuY3Rpb24gXyRjcmVhdGVOYW1lc3BhY2UoJG5hbWUsIHgpXG57XG5cdGxldCBwYXJlbnQgPSB3aW5kb3c7XG5cblx0Y29uc3QgcGFydHMgPSAkbmFtZS5zcGxpdCgvXFxzKlxcLlxccyovZyksIGwgPSBwYXJ0cy5sZW5ndGggLSAxO1xuXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsOyBpKyspXG5cdHtcblx0XHRpZihwYXJlbnRbcGFydHNbaV1dKVxuXHRcdHtcblx0XHRcdHBhcmVudCA9IHBhcmVudFtwYXJ0c1tpXV07XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dID0ge307XG5cdFx0fVxuXHR9XG5cblx0cGFyZW50W3BhcnRzW2ldXSA9IHg7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5mdW5jdGlvbiBfJGFkZFRvTmFtZXNwYWNlKCRuYW1lLCB4KVxue1xuXHRsZXQgcGFyZW50ID0gd2luZG93O1xuXG5cdGNvbnN0IHBhcnRzID0gJG5hbWUuc3BsaXQoL1xccypcXC5cXHMqL2cpLCBsID0gcGFydHMubGVuZ3RoIC0gMTtcblxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbDsgaSsrKVxuXHR7XG5cdFx0aWYocGFyZW50W3BhcnRzW2ldXSlcblx0XHR7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2AnICsgJG5hbWUgKyAnYCAoYCcgKyBwYXJ0c1tpXSArICdgKSBub3QgZGVjbGFyZWQnO1xuXHRcdH1cblx0fVxuXG5cdHBhcmVudFtwYXJ0c1tpXV0gPSB4O1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIE5BTUVTUEFDRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICAqIENyZWF0ZSBhIG5ldyBuYW1lc3BhY2VcbiAgKiBAcGFyYW0ge1N0cmluZ30gJG5hbWUgdGhlIG5hbWVzcGFjZSBuYW1lXG4gICogQHBhcmFtIHtPYmplY3R9IFskZGVzY3JdIHRoZSBuYW1lc3BhY2UgYm9keVxuICAqL1xuXG5mdW5jdGlvbiAkQU1JTmFtZXNwYWNlKCRuYW1lLCAkZGVzY3IpXG57XG5cdGlmKCEkZGVzY3IpXG5cdHtcblx0XHQkZGVzY3IgPSB7fTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGRlc2NyLiRuYW1lID0gJG5hbWU7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfJGNyZWF0ZU5hbWVzcGFjZSgkbmFtZSwgJGRlc2NyKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGlmKCRkZXNjci4kKVxuXHR7XG5cdFx0JGRlc2NyLiQuYXBwbHkoJGRlc2NyKTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogSU5URVJGQUNFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gICogQ3JlYXRlIGEgbmV3IGludGVyZmFjZVxuICAqIEBwYXJhbSB7U3RyaW5nfSAkbmFtZSB0aGUgaW50ZXJmYWNlIG5hbWVcbiAgKiBAcGFyYW0ge09iamVjdH0gWyRkZXNjcl0gdGhlIGludGVyZmFjZSBib2R5XG4gICovXG5cbmZ1bmN0aW9uICRBTUlJbnRlcmZhY2UoJG5hbWUsICRkZXNjcilcbntcblx0aWYoISRkZXNjcilcblx0e1xuXHRcdCRkZXNjciA9IHt9O1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjb25zdCAkY2xhc3MgPSBmdW5jdGlvbigpXG5cdHtcblx0XHR0aHJvdyAnY291bGQgbm9yIGluc3RhbnRpYXRlIGludGVyZmFjZSc7XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpZigkZGVzY3IuJGV4dGVuZHMpXG5cdHtcblx0XHR0aHJvdyAnYCRleHRlbmRzYCBub3QgYWxsb3dlZCBmb3IgaW50ZXJmYWNlJztcblx0fVxuXG5cdGlmKCRkZXNjci4kaW1wbGVtZW50cylcblx0e1xuXHRcdHRocm93ICdgJGltcGxlbWVudHNgIG5vdCBhbGxvd2VkIGZvciBpbnRlcmZhY2UnO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpZigkZGVzY3IuJClcblx0e1xuXHRcdHRocm93ICdgJGAgbm90IGFsbG93ZWQgZm9yIGludGVyZmFjZSc7XG5cdH1cblxuXHRpZigkZGVzY3IuJGluaXQpXG5cdHtcblx0XHR0aHJvdyAnYCRpbml0YCBub3QgYWxsb3dlZCBmb3IgaW50ZXJmYWNlJztcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGNsYXNzLiRuYW1lID0gJG5hbWU7XG5cdCRjbGFzcy4kY2xhc3MgPSAkY2xhc3M7XG5cdCRjbGFzcy4kbWVtYmVycyA9ICRkZXNjcjtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF8kYWRkVG9OYW1lc3BhY2UoJG5hbWUsICRjbGFzcyk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBDTEFTU0VTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAgKiBDcmVhdGUgYSBuZXcgY2xhc3NcbiAgKiBAcGFyYW0ge1N0cmluZ30gJG5hbWUgdGhlIGNsYXNzIG5hbWVcbiAgKiBAcGFyYW0ge09iamVjdH0gWyRkZXNjcl0gdGhlIGNsYXNzIGJvZHlcbiAgKi9cblxuZnVuY3Rpb24gJEFNSUNsYXNzKCRuYW1lLCAkZGVzY3IpXG57XG5cdGlmKCEkZGVzY3IpXG5cdHtcblx0XHQkZGVzY3IgPSB7fTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y29uc3QgJHN1cGVyID0gKCRkZXNjci4kZXh0ZW5kcyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSA/ICRkZXNjci4kZXh0ZW5kcy5wcm90b3R5cGUgOiB7fTtcblxuXHRjb25zdCAkc3VwZXJfaW1wbGVtZW50cyA9ICgkc3VwZXIuJGltcGxlbWVudHMgaW5zdGFuY2VvZiBBcnJheSkgPyAkc3VwZXIuJGltcGxlbWVudHMgOiBbXTtcblx0Y29uc3QgJGRlc2NyX2ltcGxlbWVudHMgPSAoJGRlc2NyLiRpbXBsZW1lbnRzIGluc3RhbmNlb2YgQXJyYXkpID8gJGRlc2NyLiRpbXBsZW1lbnRzIDogW107XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjb25zdCAkY2xhc3MgPSBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRmb3IoY29uc3QgaSBpbiB0aGlzLiRpbXBsZW1lbnRzKVxuXHRcdHtcblx0XHRcdGlmKHRoaXMuJGltcGxlbWVudHMuaGFzT3duUHJvcGVydHkoaSkpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0ICRpbnRlcmZhY2UgPSB0aGlzLiRpbXBsZW1lbnRzW2ldO1xuXG5cdFx0XHRcdGZvcihjb25zdCBqIGluICRpbnRlcmZhY2UuJG1lbWJlcnMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZigkaW50ZXJmYWNlLiRtZW1iZXJzLmhhc093blByb3BlcnR5KGopKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGNvbnN0ICRtZW1iZXIgPSAkaW50ZXJmYWNlLiRtZW1iZXJzW2pdO1xuXG5cdFx0XHRcdFx0XHRpZih0eXBlb2YodGhpc1tqXSkgIT09IHR5cGVvZigkbWVtYmVyKSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhyb3cgJ2NsYXNzIGAnICsgdGhpcy4kbmFtZSArICdgIHdpdGggbXVzdCBpbXBsZW1lbnQgYCcgKyAkaW50ZXJmYWNlLiRuYW1lICsgJy4nICsgaiArICdgJztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBfc3VwZXIgPSB0aGlzLiRjbGFzcy5faW50ZXJuYWxfc3VwZXI7XG5cdFx0Y29uc3QgX2FkZGVkID0gdGhpcy4kY2xhc3MuX2ludGVybmFsX2FkZGVkO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy4kc3VwZXIgPSB7fTtcblxuXHRcdGZvcihjb25zdCBuYW1lIGluIF9zdXBlcilcblx0XHR7XG5cdFx0XHRpZihfc3VwZXIuaGFzT3duUHJvcGVydHkobmFtZSkpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuJHN1cGVyW25hbWVdID0gKChfc3VwZXIsIG5hbWUsIHRoYXQpID0+IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0cmV0dXJuIF9zdXBlcltuYW1lXS5hcHBseSh0aGF0LCBhcmd1bWVudHMpXG5cblx0XHRcdFx0fSkoX3N1cGVyLCBuYW1lLCB0aGlzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLiRhZGRlZCA9IHt9O1xuXG5cdFx0Zm9yKGNvbnN0IG5hbWUgaW4gX2FkZGVkKVxuXHRcdHtcblx0XHRcdGlmKF9hZGRlZC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcblx0XHRcdHtcblx0XHRcdFx0dGhpcy4kYWRkZWRbbmFtZV0gPSAoKF9hZGRlZCwgbmFtZSwgdGhhdCkgPT4gZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRyZXR1cm4gX2FkZGVkW25hbWVdLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG5cblx0XHRcdFx0fSkoX2FkZGVkLCBuYW1lLCB0aGlzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLiRpbml0KVxuXHRcdHtcblx0XHRcdHRoaXMuJGluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkY2xhc3MuX2ludGVybmFsX3N1cGVyID0ge307XG5cdCRjbGFzcy5faW50ZXJuYWxfYWRkZWQgPSB7fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcihjb25zdCBuYW1lIGluICRzdXBlcilcblx0e1xuXHRcdGlmKG5hbWUgPT09ICckaW5pdCdcblx0XHQgICB8fFxuXHRcdCAgIG5hbWUuY2hhckF0KDApICE9PSAnJCdcblx0XHQgICB8fFxuXHRcdCAgICRzdXBlci5oYXNPd25Qcm9wZXJ0eShuYW1lKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuXHRcdCApIHtcblx0XHRcdCRjbGFzcy5faW50ZXJuYWxfc3VwZXJbbmFtZV0gPSAkc3VwZXJbbmFtZV07XG5cblx0XHRcdCRjbGFzcy5wcm90b3R5cGVbbmFtZV0gPSAkc3VwZXJbbmFtZV07XG5cdFx0fVxuXHR9XG5cblx0Zm9yKGNvbnN0IG5hbWUgaW4gJGRlc2NyKVxuXHR7XG5cdFx0aWYobmFtZSA9PT0gJyRpbml0J1xuXHRcdCAgIHx8XG5cdFx0ICAgbmFtZS5jaGFyQXQoMCkgIT09ICckJ1xuXHRcdCAgIHx8XG5cdFx0ICAgJGRlc2NyLmhhc093blByb3BlcnR5KG5hbWUpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5cdFx0ICkge1xuXHRcdFx0JGNsYXNzLl9pbnRlcm5hbF9hZGRlZFtuYW1lXSA9ICRkZXNjcltuYW1lXTtcblxuXHRcdFx0JGNsYXNzLnByb3RvdHlwZVtuYW1lXSA9ICRkZXNjcltuYW1lXTtcblx0XHR9XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRjbGFzcy5wcm90b3R5cGUuJG5hbWUgPSAkbmFtZTtcblx0JGNsYXNzLnByb3RvdHlwZS4kY2xhc3MgPSAkY2xhc3M7XG5cdCRjbGFzcy5wcm90b3R5cGUuJGltcGxlbWVudHMgPSAkc3VwZXJfaW1wbGVtZW50cy5jb25jYXQoJGRlc2NyX2ltcGxlbWVudHMpO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XyRhZGRUb05hbWVzcGFjZSgkbmFtZSwgJGNsYXNzKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGlmKCRkZXNjci4kKVxuXHR7XG5cdFx0JGRlc2NyLiQuYXBwbHkoJGNsYXNzKTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogTm9kZUpTIEVYVEVOU0lPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaWYodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKVxue1xuXHRtb2R1bGUuZXhwb3J0cy5OYW1lc3BhY2UgPSAkQU1JTmFtZXNwYWNlO1xuXHRtb2R1bGUuZXhwb3J0cy5JbnRlcmZhY2UgPSAkQU1JSW50ZXJmYWNlO1xuXHRtb2R1bGUuZXhwb3J0cy4gIENsYXNzICAgPSAgICRBTUlDbGFzcyAgO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEpRVUVSWSBFWFRFTlNJT04gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmlmKHR5cGVvZiBqUXVlcnkgIT09ICd1bmRlZmluZWQnKVxue1xuXHRqUXVlcnkuTmFtZXNwYWNlID0gJEFNSU5hbWVzcGFjZTtcblx0alF1ZXJ5LkludGVyZmFjZSA9ICRBTUlJbnRlcmZhY2U7XG5cdGpRdWVyeS4gIENsYXNzICAgPSAgICRBTUlDbGFzcyAgO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBBTUkgdXJsIHJvdXRpbmcgc3Vic3lzdGVtXG4gKiBAbmFtZXNwYWNlIGFtaVJvdXRlclxuICovXG5cbiRBTUlOYW1lc3BhY2UoJ2FtaVJvdXRlcicsIC8qKiBAbGVuZHMgYW1pUm91dGVyICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFJJVkFURSBNRU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfc2NyaXB0VVJMOiAnJyxcblx0X29yaWdpblVSTDogJycsXG5cdF93ZWJBcHBVUkw6ICcnLFxuXG5cdF9oYXNoOiAnJyxcblx0X2FyZ3M6IFtdLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3JvdXRlczogW10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFJJVkFURSBNRVRIT0RTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZWF0U2xhc2hlczogZnVuY3Rpb24odXJsKVxuXHR7XG5cdFx0dXJsID0gdXJsLnRyaW0oKTtcblxuXHRcdHdoaWxlKHVybFt1cmwubGVuZ3RoIC0gMV0gPT09ICcvJylcblx0XHR7XG5cdFx0XHR1cmwgPSB1cmwuc3Vic3RyaW5nKDAsIHVybC5sZW5ndGggLSAxKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdXJsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNUQVRJQyBDT05TVFJVQ1RPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5fYXJncy5sZW5ndGggPSAwO1xuXHRcdHRoaXMuX3JvdXRlcy5sZW5ndGggPSAwO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgIGhyZWYgID0gd2luZG93LmxvY2F0aW9uLiBocmVmIC50cmltKCk7XG5cdFx0Y29uc3QgIGhhc2ggID0gd2luZG93LmxvY2F0aW9uLiBoYXNoIC50cmltKCk7XG5cdFx0Y29uc3Qgc2VhcmNoID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC50cmltKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFNDUklQVF9VUkwgQU5EIE9SSUdJTl9VUkwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRmb3IobGV0IGlkeCwgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdGlkeCA9IHNjcmlwdHNbaV0uc3JjLmluZGV4T2YoJ2pzL2FtaS4nKTtcblxuXHRcdFx0aWYoaWR4ID4gMClcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5fc2NyaXB0VVJMID0gc2NyaXB0c1tpXS5zcmM7XG5cblx0XHRcdFx0dGhpcy5fb3JpZ2luVVJMID0gdGhpcy5fZWF0U2xhc2hlcyhcblx0XHRcdFx0XHR0aGlzLl9zY3JpcHRVUkwuc3Vic3RyaW5nKDAsIGlkeClcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogV0VCQVBQX1VSTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuX3dlYkFwcFVSTCA9IHRoaXMuX2VhdFNsYXNoZXMoXG5cdFx0XHRocmVmLnJlcGxhY2UoLyg/OlxcI3xcXD8pLiokLywgJycpXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBIQVNIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5faGFzaCA9IHRoaXMuX2VhdFNsYXNoZXMoXG5cdFx0XHRoYXNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXD8uKiQvLCAnJylcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEFSR1MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihzZWFyY2gpXG5cdFx0e1xuXHRcdFx0c2VhcmNoLnN1YnN0cmluZygxKS5zcGxpdCgnJicpLmZvckVhY2goKHBhcmFtKSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgcGFydHMgPSBwYXJhbS5zcGxpdCgnPScpO1xuXG5cdFx0XHRcdC8qKi8gaWYocGFydHMubGVuZ3RoID09PSAxKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5fYXJnc1tkZWNvZGVVUklDb21wb25lbnQocGFydHNbMF0pXSA9IC8qLS0tLS0tLS0qLyAnJyAvKi0tLS0tLS0tKi87XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZihwYXJ0cy5sZW5ndGggPT09IDIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLl9hcmdzW2RlY29kZVVSSUNvbXBvbmVudChwYXJ0c1swXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBVQkxJQyBNRVRIT0RTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBBV0YncyBzY3JpcHQgVVJMXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgQVdGJ3Mgc2NyaXB0IFVSTFxuXHQgICovXG5cblx0Z2V0U2NyaXB0VVJMOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2NyaXB0VVJMO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBvcmlnaW4gVVJMXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgb3JpZ2luIFVSTFxuXHQgICovXG5cblx0Z2V0T3JpZ2luVVJMOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fb3JpZ2luVVJMO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgd2ViYXBwIFVSTFxuXHQgICovXG5cblx0Z2V0V2ViQXBwVVJMOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fd2ViQXBwVVJMO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBhbmNob3IgcGFydCBvZiB0aGUgd2ViYXBwIFVSTFxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGFuY2hvciBwYXJ0IG9mIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKi9cblxuXHRnZXRIYXNoOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faGFzaDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgYXJndW1lbnRzIGV4dHJhY3RlZCBmcm9tIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gVGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFxuXHQgICovXG5cblx0Z2V0QXJnczogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2FyZ3M7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFwcGVuZHMgYSByb3V0aW5nIHJ1bGVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSByZWdFeHAgdGhlIHJlZ0V4cFxuXHQgICogQHBhcmFtIHtPYmplY3R9IGhhbmRsZXIgdGhlIGhhbmRsZXJcblx0ICAqIEByZXR1cm5zIHtOYW1lc3BhY2V9IFRoZSBhbWlSb3V0ZXIgc2luZ2xldG9uXG5cdCAgKi9cblxuXHRhcHBlbmQ6IGZ1bmN0aW9uKHJlZ0V4cCwgaGFuZGxlcilcblx0e1xuXHRcdHRoaXMuX3JvdXRlcy51bnNoaWZ0KHtcblx0XHRcdHJlZ0V4cDogcmVnRXhwLFxuXHRcdFx0aGFuZGxlcjogaGFuZGxlcixcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBSZW1vdmVzIHNvbWUgcm91dGluZyBydWxlc1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IHJlZ0V4cCB0aGUgcmVnRXhwXG5cdCAgKiBAcmV0dXJucyB7TmFtZXNwYWNlfSBUaGUgYW1pUm91dGVyIHNpbmdsZXRvblxuXHQgICovXG5cblx0cmVtb3ZlOiBmdW5jdGlvbihyZWdFeHApXG5cdHtcblx0XHR0aGlzLl9yb3V0ZXMgPSB0aGlzLl9yb3V0ZXMuZmlsdGVyKChyb3V0ZSkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gcm91dGUucmVnRXhwLnRvU3RyaW5nKCkgIT09IHJlZ0V4cC50b1N0cmluZygpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENoZWNrcyB3aGV0aGVyIHRoZSBVUkwgbWF0Y2hlcyB3aXRoIGEgcm91dGluZyBydWxlXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGNoZWNrOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbTtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9yb3V0ZXMubGVuZ3RoOyBpKyspXG5cdFx0e1xuXHRcdFx0bSA9IHRoaXMuX2hhc2gubWF0Y2godGhpcy5fcm91dGVzW2ldLnJlZ0V4cCk7XG5cblx0XHRcdGlmKG0pXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuX3JvdXRlc1tpXS5oYW5kbGVyLmFwcGx5KGFtaVJvdXRlciwgbSk7XG5cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBcHBlbmQgYSBuZXcgaGlzdG9yeSBlbnRyeVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggdGhlIG5ldyBwYXRoXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHQ9bnVsbF0gdGhlIG5ldyBjb250ZXh0XG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGFwcGVuZEhpc3RvcnlFbnRyeTogZnVuY3Rpb24ocGF0aCwgY29udGV4dCA9IG51bGwpXG5cdHtcblx0XHRpZihoaXN0b3J5LnB1c2hTdGF0ZSlcblx0XHR7XG5cdFx0XHRoaXN0b3J5LnB1c2hTdGF0ZShjb250ZXh0LCBudWxsLCB0aGlzLl93ZWJBcHBVUkwgKyB0aGlzLl9lYXRTbGFzaGVzKHBhdGgpKTtcblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBSZXBsYWNlIHRoZSBjdXJyZW50IGhpc3RvcnkgZW50cnlcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIHRoZSBuZXcgcGF0aFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0PW51bGxdIHRoZSBuZXcgY29udGV4dFxuXHQgICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAgKi9cblxuXHRyZXBsYWNlSGlzdG9yeUVudHJ5OiBmdW5jdGlvbihwYXRoLCBjb250ZXh0ID0gbnVsbClcblx0e1xuXHRcdGlmKGhpc3RvcnkucmVwbGFjZVN0YXRlKVxuXHRcdHtcblx0XHRcdGhpc3RvcnkucmVwbGFjZVN0YXRlKGNvbnRleHQsIG51bGwsIHRoaXMuX3dlYkFwcFVSTCArIHRoaXMuX2VhdFNsYXNoZXMocGF0aCkpO1xuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSU5hbWVzcGFjZSgnYW1pJywge1xuXG5cdHZlcnNpb246ICcwLjAuMScsXG5cdGNvbW1pdF9pZDogJ3t7QU1JX0NPTU1JVF9JRH19Jyxcbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIElOVEVSTkFMIEZVTkNUSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIF9hbWlfaW50ZXJuYWxfdGhlbihkZWZlcnJlZCwgZG9uZUZ1bmMsIGZhaWxGdW5jKVxue1xuXHRpZihkZWZlcnJlZCAmJiBkZWZlcnJlZC50aGVuKVxuXHR7XG5cdFx0ZGVmZXJyZWQudGhlbihkb25lRnVuYywgZmFpbEZ1bmMpO1xuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdGRvbmVGdW5jKCk7XG5cdH1cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIF9hbWlfaW50ZXJuYWxfYWx3YXlzKGRlZmVycmVkLCBhbHdheXNGdW5jKVxue1xuXHRpZihkZWZlcnJlZCAmJiBkZWZlcnJlZC5hbHdheXMpXG5cdHtcblx0XHRkZWZlcnJlZC5hbHdheXMoYWx3YXlzRnVuYyk7XG5cdH1cblx0ZWxzZVxuXHR7XG5cdFx0YWx3YXlzRnVuYygpO1xuXHR9XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pV2ViQXBwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgQU1JIHdlYmFwcCBzdWJzeXN0ZW1cbiAqIEBuYW1lc3BhY2UgYW1pV2ViQXBwXG4gKi9cblxuJEFNSU5hbWVzcGFjZSgnYW1pV2ViQXBwJywgLyoqIEBsZW5kcyBhbWlXZWJBcHAgKi8ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQUklWQVRFIE1FTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9pZFJlZ0V4cDogbmV3IFJlZ0V4cCgnW2EtekEtWl1bYS16QS1aMC05XXs3fV9bYS16QS1aMC05XXs0fV9bYS16QS1aMC05XXs0fV9bYS16QS1aMC05XXs0fV9bYS16QS1aMC05XXsxMn0nLCAnZycpLFxuXG5cdF9saW5rRXhwOiBuZXcgUmVnRXhwKCdcXFxcWyhbXlxcXFxdXSopXFxcXF1cXFxcKChbXlxcXFwpXSopXFxcXCknLCAnZycpLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2VtYmVkZGVkOiBmYWxzZSxcblx0X25vQm9vdHN0cmFwOiBmYWxzZSxcblx0X25vRGF0ZVRpbWVQaWNrZXI6IGZhbHNlLFxuXHRfbm9TZWxlY3QyOiBmYWxzZSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9nbG9iYWxEZWZlcnJlZDogJC5EZWZlcnJlZCgpLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3NoZWV0czogW10sXG5cdF9zY3JpcHRzOiBbXSxcblxuXHRfY29udHJvbHM6IHt9LFxuXHRfc3ViYXBwczoge30sXG5cblx0X2lzUmVhZHk6IGZhbHNlLFxuXHRfY2FuTGVhdmU6IHRydWUsXG5cdF9sb2NrQ250OiAweDAwLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2N1cnJlbnRTdWJBcHBJbnN0YW5jZTogbmV3IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMub25SZWFkeSA9IGZ1bmN0aW9uKCkge307XG5cdFx0dGhpcy5vbkV4aXQgPSBmdW5jdGlvbigpIHt9O1xuXHRcdHRoaXMub25Mb2dpbiA9IGZ1bmN0aW9uKCkge307XG5cdFx0dGhpcy5vbkxvZ291dCA9IGZ1bmN0aW9uKCkge307XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFRoZSBvcmlnaW4gVVJMXG5cdCAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICovXG5cblx0b3JpZ2luVVJMOiAnLycsXG5cblx0LyoqXG5cdCAgKiBUaGUgd2ViYXBwIFVSTFxuXHQgICogQHR5cGUge1N0cmluZ31cblx0ICAqL1xuXG5cdHdlYkFwcFVSTDogJy8nLFxuXG5cdC8qKlxuXHQgICogVGhlIGFuY2hvciBwYXJ0IG9mIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICovXG5cblx0aGFzaDogJycsXG5cblx0LyoqXG5cdCAgKiBUaGUgYXJndW1lbnRzIGV4dHJhY3RlZCBmcm9tIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAdHlwZSB7QXJyYXk8U3RyaW5nPn1cblx0ICAqL1xuXG5cdGFyZ3M6IHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNUQVRJQyBDT05TVFJVQ1RPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEdFVCBGTEFHUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1cmwgPSBhbWlSb3V0ZXIuZ2V0U2NyaXB0VVJMKCk7XG5cblx0XHRjb25zdCBpZHggPSB1cmwuaW5kZXhPZignPycpO1xuXG5cdFx0aWYoaWR4ID4gMClcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgZmxhZ3MgPSB1cmwuc3Vic3RyaW5nKGlkeCkudG9Mb3dlckNhc2UoKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRoaXMuX2VtYmVkZGVkID0gKGZsYWdzLmluZGV4T2YoJ2VtYmVkZGVkJykgPj0gMCk7XG5cblx0XHRcdHRoaXMuX25vQm9vdHN0cmFwID0gKGZsYWdzLmluZGV4T2YoJ25vYm9vdHN0cmFwJykgPj0gMCk7XG5cblx0XHRcdHRoaXMuX25vRGF0ZVRpbWVQaWNrZXIgPSAoZmxhZ3MuaW5kZXhPZignbm9kYXRldGltZXBpY2tlcicpID49IDApO1xuXG5cdFx0XHR0aGlzLl9ub1NlbGVjdDIgPSAoZmxhZ3MuaW5kZXhPZignbm9zZWxlY3QyJykgPj0gMCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBHRVQgVVJMUywgSEFTSCBBTkQgQVJHUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5vcmlnaW5VUkwgPSBhbWlSb3V0ZXIuZ2V0T3JpZ2luVVJMKCk7XG5cdFx0dGhpcy53ZWJBcHBVUkwgPSBhbWlSb3V0ZXIuZ2V0V2ViQXBwVVJMKCk7XG5cblx0XHR0aGlzLmhhc2ggPSBhbWlSb3V0ZXIuZ2V0SGFzaCgpO1xuXHRcdHRoaXMuYXJncyA9IGFtaVJvdXRlci5nZXRBcmdzKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTE9BRCBTSEVFVFMgQU5EIFNDUklQVFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHJlc291cmNlc0NTUyA9IFtdO1xuXHRcdGNvbnN0IHJlc291cmNlc0pTID0gW107XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighd2luZG93LlBvcHBlcilcblx0XHR7XG5cdFx0XHRyZXNvdXJjZXNKUy5wdXNoKHRoaXMub3JpZ2luVVJMICsgJy9qcy9wb3BwZXIubWluLmpzJyk7XG5cdFx0fVxuXG5cdFx0aWYoIXdpbmRvdy5tb21lbnQpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvbW9tZW50Lm1pbi5qcycpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKCh0eXBlb2YgalF1ZXJ5LmZuLnFyY29kZSkgIT09ICdmdW5jdGlvbicpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvanF1ZXJ5LXFyY29kZS5taW4uanMnKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighdGhpcy5fbm9Cb290c3RyYXAgJiYgKHR5cGVvZiBqUXVlcnkuZm4ubW9kYWwpICE9PSAnZnVuY3Rpb24nKVxuXHRcdHtcblx0XHRcdHJlc291cmNlc0NTUy5wdXNoKHRoaXMub3JpZ2luVVJMICsgJy9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnKTtcblx0XHRcdHJlc291cmNlc0pTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2pzL2Jvb3RzdHJhcC5taW4uanMnKTtcblx0XHR9XG5cblx0XHRpZighdGhpcy5fbm9EYXRlVGltZVBpY2tlciAmJiAodHlwZW9mIGpRdWVyeS5mbi5kYXRldGltZXBpY2tlcikgIT09ICdmdW5jdGlvbicpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzQ1NTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXIubWluLmNzcycpO1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyLm1pbi5qcycpO1xuXHRcdH1cblxuXHRcdGlmKCF0aGlzLl9ub1NlbGVjdDIgJiYgKHR5cGVvZiBqUXVlcnkuZm4uc2VsZWN0MikgIT09ICdmdW5jdGlvbicpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzQ1NTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9zZWxlY3QyLm1pbi5jc3MnKTtcblx0XHRcdHJlc291cmNlc0pTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2pzL3NlbGVjdDIubWluLmpzJyk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdC4uLnJlc291cmNlc0NTUyxcblx0XHRcdHRoaXMub3JpZ2luVVJMICsgJy9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnLFxuXHRcdFx0dGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9hbWkubWluLmNzcycsXG5cdFx0XHQuLi5yZXNvdXJjZXNKUyxcblx0XHRdKS5kb25lKCgvKi0tLSovKSA9PiB7XG5cblx0XHRcdHRoaXMuX2dsb2JhbERlZmVycmVkLnJlc29sdmUoLyotLS0qLyk7XG5cblx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2dsb2JhbERlZmVycmVkLnJlamVjdChtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBNT0RFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hlY2tzIHdoZXRoZXIgdGhlIFdlYkFwcCBpcyBleGVjdXRlZCBpbiBlbWJlZGRlZCBtb2RlXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGlzRW1iZWRkZWQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9lbWJlZGRlZDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hlY2tzIHdoZXRoZXIgdGhlIFdlYkFwcCBpcyBleGVjdXRlZCBsb2NhbGx5IChmaWxlOi8vLCBsb2NhbGhvc3QsIDEyNy4wLjAuMSBvciA6OjEpXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGlzTG9jYWw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gKCgnZmlsZTonKSlcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUgPT09ICdsb2NhbGhvc3QnXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnMTI3LjAuMC4xJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gKCgoJzo6MScpKSlcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVE9PTFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0eXBlT2Y6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCBuYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuIG5hbWUuc3RhcnRzV2l0aCgnW29iamVjdCAnKSA/IG5hbWUuc3Vic3RyaW5nKDgsIG5hbWUubGVuZ3RoIC0gMSlcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogLyotLS0tLS0tLS0tLSovICcnIC8qLS0tLS0tLS0tLS0qL1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGFzQXJyYXk6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50eXBlT2YoeCkgPT09ICdBcnJheScgPyAoeClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbeF1cblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXR1cDogZnVuY3Rpb24ob3B0aW9uTmFtZXMsIG9wdGlvbkRlZmF1bHRzLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgbCA9IG9wdGlvbk5hbWVzLmxlbmd0aDtcblx0XHRjb25zdCBtID0gb3B0aW9uRGVmYXVsdHMubGVuZ3RoO1xuXG5cdFx0aWYobCAhPT0gbSlcblx0XHR7XG5cdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHNldHRpbmdzKSB7XG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKG9wdGlvbk5hbWVzW2ldIGluIHNldHRpbmdzID8gc2V0dGluZ3Nbb3B0aW9uTmFtZXNbaV1dIDogb3B0aW9uRGVmYXVsdHNbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcblx0XHRcdFx0cmVzdWx0LnB1c2goLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyBvcHRpb25EZWZhdWx0c1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlcGxhY2U6IGFtaVR3aWcuc3RkbGliLl9yZXBsYWNlLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3RleHRUb0h0bWxYOiBbJyYnICAgICwgJ1wiJyAgICAgLCAnPCcgICAsICc+JyAgIF0sXG5cdF90ZXh0VG9IdG1sWTogWycmYW1wOycsICcmcXVvdDsnLCAnJmx0OycsICcmZ3Q7J10sXG5cblx0LyoqXG5cdCAgKiBFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIEhUTUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0dGV4dFRvSHRtbDogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5fdGV4dFRvSHRtbFgsIHRoaXMuX3RleHRUb0h0bWxZKTtcblx0fSxcblxuXHQvKipcblx0ICAqIFVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSFRNTCB0byB0ZXh0XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGh0bWxUb1RleHQ6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKHMgfHwgJycsIHRoaXMuX3RleHRUb0h0bWxZLCB0aGlzLl90ZXh0VG9IdG1sWCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfdGV4dFRvU3RyaW5nWDogWydcXFxcJyAgLCAnXFxuJyAsICdcIicgICwgJ1xcJycgIF0sXG5cdF90ZXh0VG9TdHJpbmdZOiBbJ1xcXFxcXFxcJywgJ1xcXFxuJywgJ1xcXFxcIicsICdcXFxcXFwnJ10sXG5cblx0LyoqXG5cdCAgKiBFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIEphdmFTY3JpcHQgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSB1bmVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdHRleHRUb1N0cmluZzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5fdGV4dFRvU3RyaW5nWCwgdGhpcy5fdGV4dFRvU3RyaW5nWSk7XG5cdH0sXG5cblx0LyoqXG5cdCAgKiBVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEphdmFTY3JpcHQgc3RyaW5nIHRvIHRleHRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0c3RyaW5nVG9UZXh0OiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TdHJpbmdZLCB0aGlzLl90ZXh0VG9TdHJpbmdYKTtcblxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2h0bWxUb1N0cmluZ1g6IFsnXFxcXCcgICwgJ1xcbicgLCAnJnF1b3Q7JyAgLCAnXFwnJyAgXSxcblx0X2h0bWxUb1N0cmluZ1k6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXCZxdW90OycsICdcXFxcXFwnJ10sXG5cblx0LyoqXG5cdCAgKiBFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBIVE1MIHRvIEphdmFTY3JpcHQgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSB1bmVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGh0bWxUb1N0cmluZzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5faHRtbFRvU3RyaW5nWCwgdGhpcy5faHRtbFRvU3RyaW5nWSk7XG5cdH0sXG5cblx0LyoqXG5cdCAgKiBVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEphdmFTY3JpcHQgc3RyaW5nIHRvIEhUTUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0c3RyaW5nVG9IdG1sOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl9odG1sVG9TdHJpbmdZLCB0aGlzLl9odG1sVG9TdHJpbmdYKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF90ZXh0VG9TUUxYOiBbJ1xcJycgIF0sXG5cdF90ZXh0VG9TUUxZOiBbJ1xcJ1xcJyddLFxuXG5cdC8qKlxuXHQgICogRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBTUUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0dGV4dFRvU1FMOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TUUxYLCB0aGlzLl90ZXh0VG9TUUxZKTtcblx0fSxcblxuXHQvKipcblx0ICAqIFVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gU1FMIHRvIHRleHRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0c3FsVG9UZXh0OiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TUUxZLCB0aGlzLl90ZXh0VG9TUUxYKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBCQVNFNjQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9iYXNlNjQ6ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OS1fJyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRW5jb2RlcyAoUkZDIDQ2NDgpIGEgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBkZWNvZGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGVuY29kZWQgc3RyaW5nXG5cdCAgKi9cblxuXHRiYXNlNjRFbmNvZGU6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRsZXQgdztcblxuXHRcdGNvbnN0IGUgPSBbXTtcblxuXHRcdGNvbnN0IGwgPSBzLmxlbmd0aCwgbSA9IGwgJSAzO1xuXG5cdFx0Y29uc3QgdGhpc19iYXNlNjQgPSB0aGlzLl9iYXNlNjQ7XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDspXG5cdFx0e1xuXHRcdFx0dyA9IHMuY2hhckNvZGVBdChpKyspIDw8IDE2XG5cdFx0XHQgICAgfFxuXHRcdFx0ICAgIHMuY2hhckNvZGVBdChpKyspIDw8IDhcblx0XHRcdCAgICB8XG5cdFx0XHQgICAgcy5jaGFyQ29kZUF0KGkrKykgPDwgMFxuXHRcdFx0O1xuXG5cdFx0XHRlLnB1c2godGhpc19iYXNlNjQuY2hhckF0KCh3ID4+IDE4KSAmIDB4M0YpKTtcblx0XHRcdGUucHVzaCh0aGlzX2Jhc2U2NC5jaGFyQXQoKHcgPj4gMTIpICYgMHgzRikpO1xuXHRcdFx0ZS5wdXNoKHRoaXNfYmFzZTY0LmNoYXJBdCgodyA+PiA2KSAmIDB4M0YpKTtcblx0XHRcdGUucHVzaCh0aGlzX2Jhc2U2NC5jaGFyQXQoKHcgPj4gMCkgJiAweDNGKSk7XG5cdFx0fVxuXG5cdFx0LyoqLyBpZihtID09PSAxKSB7XG5cdFx0XHRlLnNwbGljZSgtMiwgMik7XG5cdFx0fVxuXHRcdGVsc2UgaWYobSA9PT0gMikge1xuXHRcdFx0ZS5zcGxpY2UoLTEsIDEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBlLmpvaW4oJycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBEZWNvZGVzIChSRkMgNDY0OCkgYSBzdHJpbmdcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVuY29kZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZGVjb2RlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGJhc2U2NERlY29kZTogZnVuY3Rpb24ocylcblx0e1xuXHRcdGxldCB3O1xuXG5cdFx0Y29uc3QgZSA9IFtdO1xuXG5cdFx0Y29uc3QgbCA9IHMubGVuZ3RoLCBtID0gbCAlIDQ7XG5cblx0XHRjb25zdCB0aGlzX2Jhc2U2NCA9IHRoaXMuX2Jhc2U2NDtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOylcblx0XHR7XG5cdFx0XHR3ID0gdGhpc19iYXNlNjQuaW5kZXhPZihzLmNoYXJBdChpKyspKSA8PCAxOFxuXHRcdFx0ICAgIHxcblx0XHRcdCAgICB0aGlzX2Jhc2U2NC5pbmRleE9mKHMuY2hhckF0KGkrKykpIDw8IDEyXG5cdFx0XHQgICAgfFxuXHRcdFx0ICAgIHRoaXNfYmFzZTY0LmluZGV4T2Yocy5jaGFyQXQoaSsrKSkgPDwgNlxuXHRcdFx0ICAgIHxcblx0XHRcdCAgICB0aGlzX2Jhc2U2NC5pbmRleE9mKHMuY2hhckF0KGkrKykpIDw8IDBcblx0XHRcdDtcblxuXHRcdFx0ZS5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoKHcgPj4+IDE2KSAmIDB4RkYpKTtcblx0XHRcdGUucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh3ID4+PiA4KSAmIDB4RkYpKTtcblx0XHRcdGUucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh3ID4+PiAwKSAmIDB4RkYpKTtcblx0XHR9XG5cblx0XHQvKiovIGlmKG0gPT09IDIpIHtcblx0XHRcdGUuc3BsaWNlKC0yLCAyKTtcblx0XHR9XG5cdFx0ZWxzZSBpZihtID09PSAzKSB7XG5cdFx0XHRlLnNwbGljZSgtMSwgMSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGUuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogRFlOQU1JQyBSRVNPVVJDRSBMT0FESU5HICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZ2V0RXh0ZW5zaW9uOiBmdW5jdGlvbih1cmwpXG5cdHtcblx0XHRjb25zdCBpZHggPSB1cmwubGFzdEluZGV4T2YoJy4nKTtcblxuXHRcdHJldHVybiBpZHggPiAwID8gdXJsLnN1YnN0cmluZyhpZHgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZ2V0RGF0YVR5cGU6IGZ1bmN0aW9uKHVybCwgZGF0YVR5cGUpXG5cdHtcblx0XHRsZXQgcmVzdWx0O1xuXG5cdFx0aWYoZGF0YVR5cGUgPT09ICdhdXRvJylcblx0XHR7XG5cdFx0XHQvKiovIGlmKHVybC5pbmRleE9mKCdjdHJsOicpID09PSAwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSAnY29udHJvbCc7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmKHVybC5pbmRleE9mKCdzdWJhcHA6JykgPT09IDApXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdCA9ICdzdWJhcHAnO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRzd2l0Y2godGhpcy5fZ2V0RXh0ZW5zaW9uKHVybCkudG9Mb3dlckNhc2UoKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNhc2UgJy5jc3MnOlxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gJ3NoZWV0Jztcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAnLmpzJzpcblx0XHRcdFx0XHRcdHJlc3VsdCA9ICdzY3JpcHQnO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICcuanNvbic6XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAnanNvbic7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJy54bWwnOlxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gJ3htbCc7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAndGV4dCc7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0ID0gZGF0YVR5cGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9fbG9hZFhYWDogZnVuY3Rpb24oZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpXG5cdHtcblx0XHRpZih1cmxzLmxlbmd0aCA9PT0gMClcblx0XHR7XG5cdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVzb2x2ZVdpdGgoY29udGV4dCwgW3Jlc3VsdF0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVybCA9IHVybHMuc2hpZnQoKS50cmltKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkYXRhVFlQRSA9IHRoaXMuX2dldERhdGFUeXBlKHVybCwgZGF0YVR5cGUpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0c3dpdGNoKGRhdGFUWVBFKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQ09OVFJPTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnY29udHJvbCc6XG5cblx0XHRcdFx0dGhpcy5sb2FkQ29udHJvbCh1cmwpLnRoZW4oKGRhdGEpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGRhdGEpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU1VCQVBQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnc3ViYXBwJzpcblxuXHRcdFx0XHR0aGlzLmxvYWRTdWJBcHAodXJsKS50aGVuKChkYXRhKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucHVzaChkYXRhKTtcblxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgcmVzdWx0LCB1cmxzLCBkYXRhVHlwZSwgY29udGV4dCk7XG5cblx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNIRUVUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ3NoZWV0JzpcblxuXHRcdFx0XHRpZih0aGlzLl9zaGVldHMuaW5kZXhPZih1cmwpID49IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChmYWxzZSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0XHR1cmw6IHVybCxcblx0XHRcdFx0XHRcdGFzeW5jOiBmYWxzZSxcblx0XHRcdFx0XHRcdGNhY2hlOiBmYWxzZSxcblx0XHRcdFx0XHRcdGNyb3NzRG9tYWluOiB0cnVlLFxuXHRcdFx0XHRcdFx0ZGF0YVR5cGU6IGRhdGFUWVBFLFxuXHRcdFx0XHRcdH0pLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaCh0cnVlKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5fc2hlZXRzLnB1c2godXJsKTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblxuXHRcdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBgJyArIHVybCArICdgJ10pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU0NSSVBUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnc2NyaXB0JzpcblxuXHRcdFx0XHRpZih0aGlzLl9zY3JpcHRzLmluZGV4T2YodXJsKSA+PSAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goZmFsc2UpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRcdFx0XHRhc3luYzogZmFsc2UsXG5cdFx0XHRcdFx0XHRjYWNoZTogZmFsc2UsXG5cdFx0XHRcdFx0XHRjcm9zc0RvbWFpbjogdHJ1ZSxcblx0XHRcdFx0XHRcdGRhdGFUeXBlOiBkYXRhVFlQRSxcblx0XHRcdFx0XHR9KS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnB1c2godHJ1ZSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuX3NjcmlwdHMucHVzaCh1cmwpO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIGAnICsgdXJsICsgJ2AnXSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBPVEhFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRcdFx0YXN5bmM6IHRydWUsXG5cdFx0XHRcdFx0Y2FjaGU6IGZhbHNlLFxuXHRcdFx0XHRcdGNyb3NzRG9tYWluOiB0cnVlLFxuXHRcdFx0XHRcdGRhdGFUeXBlOiBkYXRhVFlQRSxcblx0XHRcdFx0fSkudGhlbigoZGF0YSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goZGF0YSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgYCcgKyB1cmwgKyAnYCddKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9sb2FkWFhYOiBmdW5jdGlvbih1cmxzLCBkYXRhVHlwZSwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtkZWZlcnJlZF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgW10sIHRoaXMuYXNBcnJheSh1cmxzKSwgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgcmVzb3VyY2VzIGJ5IGV4dGVuc2lvblxuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRSZXNvdXJjZXM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ2F1dG8nLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIENTUyBzaGVldHNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkU2hlZXRzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICdzaGVldCcsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgSlMgc2NyaXB0c1xuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRTY3JpcHRzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICdzY3JpcHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIEpTT04gZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkSlNPTnM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ2pzb24nLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIFhNTCBmaWxlc1xuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRYTUxzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICd4bWwnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIEhUTUwgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkSFRNTHM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ3RleHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIFRXSUcgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkVFdJR3M6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ3RleHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIHRleHQgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkVGV4dHM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ3RleHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSFRNTCBDT05URU5UICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfeHh4SFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIG1vZGUsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHQsIHN1ZmZpeCwgZGljdCwgdHdpZ3NdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCcsICdzdWZmaXgnLCAnZGljdCcsICd0d2lncyddLFxuXHRcdFx0W3Jlc3VsdCwgbnVsbCwgbnVsbCwgbnVsbF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihzdWZmaXgpXG5cdFx0e1xuXHRcdFx0dHdpZyA9IHR3aWcucmVwbGFjZSh0aGlzLl9pZFJlZ0V4cCwgZnVuY3Rpb24oaWQpIHtcblxuXHRcdFx0XHRyZXR1cm4gaWQgKyAnX2luc3RhbmNlJyArIHN1ZmZpeDtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IGh0bWwgPSB0aGlzLmZvcm1hdFRXSUcodHdpZywgZGljdCwgdHdpZ3MpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHByb21pc2U7XG5cblx0XHRsZXQgZWwgPSAkKHNlbGVjdG9yKTtcblxuXHRcdHN3aXRjaChtb2RlKVxuXHRcdHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0cHJvbWlzZSA9IGVsLmh0bWwoaHRtbCkucHJvbWlzZSgpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRwcm9taXNlID0gZWwucHJlcGVuZChodG1sKS5wcm9taXNlKCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdHByb21pc2UgPSBlbC5hcHBlbmQoaHRtbCkucHJvbWlzZSgpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRwcm9taXNlID0gZWwucmVwbGFjZVdpdGgoZWwuaXMoJ1tpZF0nKSA/IGh0bWwucmVwbGFjZSgvXlxccyooPFthLXpBLVpfLV0rKS8sICckMSBpZD1cIicgKyBlbC5hdHRyKCdpZCcpICsgJ1wiJykgOiBodG1sKS5wcm9taXNlKCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHByb21pc2UuZG9uZSgoKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsZXQgZWwgPSAkKHNlbGVjdG9yKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IF9maW5kID0gKG1vZGUgPT09IDMpID8gKF9zZWxlY3RvcikgPT4gZWwuZmluZFdpdGhTZWxmKF9zZWxlY3Rvcilcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKF9zZWxlY3RvcikgPT4gZWwuICAgIGZpbmQgICAgKF9zZWxlY3Rvcilcblx0XHRcdDtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKGpRdWVyeS5mbi50b29sdGlwKVxuXHRcdFx0e1xuXHRcdFx0XHRfZmluZCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoe1xuXHRcdFx0XHRcdGh0bWw6IGZhbHNlLFxuXHRcdFx0XHRcdGRlbGF5OiB7XG5cdFx0XHRcdFx0XHRzaG93OiA1MDAsXG5cdFx0XHRcdFx0XHRoaWRlOiAxMDAsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihqUXVlcnkuZm4ucG9wb3Zlcilcblx0XHRcdHtcblx0XHRcdFx0X2ZpbmQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5wb3BvdmVyKHtcblx0XHRcdFx0XHRodG1sOiB0cnVlLFxuXHRcdFx0XHRcdGRlbGF5OiB7XG5cdFx0XHRcdFx0XHRzaG93OiA1MDAsXG5cdFx0XHRcdFx0XHRoaWRlOiAxMDAsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihqUXVlcnkuZm4uZGF0ZXRpbWVwaWNrZXIpXG5cdFx0XHR7XG5cdFx0XHRcdF9maW5kKCcuZm9ybS1kYXRldGltZScpLmRhdGV0aW1lcGlja2VyKHtcblx0XHRcdFx0XHRmb3JtYXQ6ICdZWVlZLU1NLUREIEhIOm1tOnNzLlNTU1NTUydcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0X2ZpbmQoJy5mb3JtLWRhdGUnKS5kYXRldGltZXBpY2tlcih7XG5cdFx0XHRcdFx0Zm9ybWF0OiAnWVlZWS1NTS1ERCdcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0X2ZpbmQoJy5mb3JtLXRpbWUnKS5kYXRldGltZXBpY2tlcih7XG5cdFx0XHRcdFx0Zm9ybWF0OiAnSEg6bW06c3MnXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdF9maW5kKCcuZm9ybS10aW1lLWhtJykuZGF0ZXRpbWVwaWNrZXIoe1xuXHRcdFx0XHRcdGZvcm1hdDogJ0hIOm1tJ1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZWxdKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUHV0cyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgdGhlIHRhcmdldCBzZWxlY3RvclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgZnJhZ21lbnRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIHN1ZmZpeCwgZGljdCwgdHdpZ3MpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRyZXBsYWNlSFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3h4eEhUTUwoc2VsZWN0b3IsIHR3aWcsIDAsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUHJlcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIHRoZSB0YXJnZXQgc2VsZWN0b3Jcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0d2lnIHRoZSBUV0lHIGZyYWdtZW50XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBzdWZmaXgsIGRpY3QsIHR3aWdzKVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0cHJlcGVuZEhUTUw6IGZ1bmN0aW9uKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl94eHhIVE1MKHNlbGVjdG9yLCB0d2lnLCAxLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFwcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIHRoZSB0YXJnZXQgc2VsZWN0b3Jcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0d2lnIHRoZSBUV0lHIGZyYWdtZW50XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBzdWZmaXgsIGRpY3QsIHR3aWdzKVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0YXBwZW5kSFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3h4eEhUTUwoc2VsZWN0b3IsIHR3aWcsIDIsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogSW50ZXJwcmV0ZXMgdGhlIGdpdmVuIFRXSUcgc3RyaW5nLCBzZWUge0BsaW5rIGh0dHA6Ly90d2lnLnNlbnNpb2xhYnMub3JnL2RvY3VtZW50YXRpb259XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBzdHJpbmdcblx0ICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBbZGljdF0gdGhlIGRpY3Rpb25hcnlcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbdHdpZ3NdIGRpY3Rpb25hcnkgb2YgZnJhZ21lbnRzXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgSW50ZXJwcmV0ZWQgVFdJRyBzdHJpbmdcblx0ICAqL1xuXG5cdGZvcm1hdFRXSUc6IGZ1bmN0aW9uKHR3aWcsIGRpY3QgPSB7fSwgdHdpZ3MgPSB7fSlcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgcmVuZGVyID0gKHR3aWcsIGRpY3QpID0+IHtcblxuXHRcdFx0aWYodGhpcy50eXBlT2YoZGljdCkgIT09ICdPYmplY3QnKVxuXHRcdFx0e1xuXHRcdFx0XHRkaWN0ID0ge307XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMudHlwZU9mKHR3aWdzKSAhPT0gJ09iamVjdCcpXG5cdFx0XHR7XG5cdFx0XHRcdHR3aWdzID0ge307XG5cdFx0XHR9XG5cblx0XHRcdGRpY3RbJ09SSUdJTl9VUkwnXSA9IHRoaXMub3JpZ2luVVJMO1xuXHRcdFx0ZGljdFsnV0VCQVBQX1VSTCddID0gdGhpcy53ZWJBcHBVUkw7XG5cblx0XHRcdHJldHVybiBhbWlUd2lnLmVuZ2luZS5yZW5kZXIodHdpZywgZGljdCwgdHdpZ3MpO1xuXHRcdH07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0cnlcblx0XHR7XG5cdFx0XHRpZih0aGlzLnR5cGVPZihkaWN0KSA9PT0gJ0FycmF5Jylcblx0XHRcdHtcblx0XHRcdFx0ZGljdC5mb3JFYWNoKChESUNUKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucHVzaChyZW5kZXIodHdpZywgRElDVCwgdHdpZ3MpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKHJlbmRlcih0d2lnLCBkaWN0LCB0d2lncykpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRjYXRjaChlcnJvcilcblx0XHR7XG5cdFx0XHRyZXN1bHQubGVuZ3RoID0gMDtcblxuXHRcdFx0dGhpcy5lcnJvcignVFdJRyBwYXJzaW5nIGVycm9yOiAnICsgZXJyb3IubWVzc2FnZSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBKU1BBVEggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRmluZHMgZGF0YSB3aXRoaW4gdGhlIGdpdmVuIEpTT04sIHNlZSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2RmaWxhdG92L2pzcGF0aH1cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIHRoZSBwYXRoXG5cdCAgKiBAcGFyYW0ge09iamVjdH0ganNvbiB0aGUgSlNPTlxuXHQgICogQHJldHVybnMge0FycmF5fSBUaGUgcmVzdWx0aW5nIGFycmF5XG5cdCAgKi9cblxuXHRqc3BhdGg6IGZ1bmN0aW9uKHBhdGgsIGpzb24pXG5cdHtcblx0XHRyZXR1cm4gSlNQYXRoLmFwcGx5KHBhdGgsIGpzb24pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNUQUNLICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0U3RhY2s6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRyeVxuXHRcdHtcblx0XHRcdHRocm93IEVycm9yKCk7XG5cdFx0fVxuXHRcdGNhdGNoKGUxKVxuXHRcdHtcblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gZTEuc3RhY2s7XG5cdFx0XHR9XG5cdFx0XHRjYXRjaChlMilcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuICgoKCcnKSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBMT0NLICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogTG9ja3MgdGhlIFdlYiBhcHBsaWNhdGlvblxuXHQgICovXG5cblx0bG9jazogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxpbmVzID0gdGhpcy5nZXRTdGFjaygpLnNwbGl0KCdcXG4nKTtcblxuXHRcdGlmKGxpbmVzLmxlbmd0aCA+IDIpXG5cdFx0e1xuXHRcdFx0Y29uc29sZS5sb2coJ2xvY2tbJyArIHRoaXMuX2xvY2tDbnQgKyAnXSA6OiAnICsgbGluZXNbMl0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblx0XHR9XG5cblx0XHQvKiovXG5cblx0XHRpZih0aGlzLl9sb2NrQ250IDw9IDApXG5cdFx0e1xuXHRcdFx0JCgnI2FtaV9sb2NrZXInKS5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xuXG5cdFx0XHR0aGlzLl9sb2NrQ250ID0gMTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRoaXMuX2xvY2tDbnQrKztcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFVubG9ja3MgdGhlIFdlYiBhcHBsaWNhdGlvblxuXHQgICovXG5cblx0dW5sb2NrOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZih0aGlzLl9sb2NrQ250IDw9IDEpXG5cdFx0e1xuXHRcdFx0JCgnI2FtaV9sb2NrZXInKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG5cdFx0XHR0aGlzLl9sb2NrQ250ID0gMDtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRoaXMuX2xvY2tDbnQtLTtcblx0XHR9XG5cblx0XHQvKiovXG5cblx0XHRsZXQgbGluZXMgPSB0aGlzLmdldFN0YWNrKCkuc3BsaXQoJ1xcbicpO1xuXG5cdFx0aWYobGluZXMubGVuZ3RoID4gMilcblx0XHR7XG5cdFx0XHRjb25zb2xlLmxvZygndW5sb2NrWycgKyB0aGlzLl9sb2NrQ250ICsgJ10gOjogJyArIGxpbmVzWzJdKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBMb2NrcyB0aGUgbW9kYWwgd2luZG93XG5cdCAgKi9cblxuXHRtb2RhbExvY2s6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsaW5lcyA9IHRoaXMuZ2V0U3RhY2soKS5zcGxpdCgnXFxuJyk7XG5cblx0XHRpZihsaW5lcy5sZW5ndGggPiAyKVxuXHRcdHtcblx0XHRcdGNvbnNvbGUubG9nKCdtb2RhbExvY2tbJyArIHRoaXMuX2xvY2tDbnQgKyAnXSA6OiAnICsgbGluZXNbMl0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblx0XHR9XG5cblx0XHQvKiovXG5cblx0XHR0aGlzLl9sb2NrQ250ID0gdGhpcy5fdG1wTG9ja0NudDtcblxuXHRcdGlmKHRoaXMuX2xvY2tDbnQgPiAwKVxuXHRcdHtcblx0XHRcdCQoJyNhbWlfbG9ja2VyJykuY3NzKCdkaXNwbGF5JywgJ2ZsZXgnKTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFVubG9ja3MgdGhlIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0bW9kYWxVbmxvY2s6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuX3RtcExvY2tDbnQgPSB0aGlzLl9sb2NrQ250O1xuXG5cdFx0aWYodGhpcy5fbG9ja0NudCA+IDApXG5cdFx0e1xuXHRcdFx0JCgnI2FtaV9sb2NrZXInKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXHRcdH1cblxuXHRcdC8qKi9cblxuXHRcdGxldCBsaW5lcyA9IHRoaXMuZ2V0U3RhY2soKS5zcGxpdCgnXFxuJyk7XG5cblx0XHRpZihsaW5lcy5sZW5ndGggPiAyKVxuXHRcdHtcblx0XHRcdGNvbnNvbGUubG9nKCdtb2RhbFVubG9ja1snICsgdGhpcy5fbG9ja0NudCArICddIDo6ICcgKyBsaW5lc1syXSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRW5hYmxlcyB0aGUgbWVzc2FnZSBpbiBhIGNvbmZpcm1hdGlvbiBkaWFsb2cgYm94IHRvIGluZm9ybSB0aGF0IHRoZSB1c2VyIGlzIGFib3V0IHRvIGxlYXZlIHRoZSBjdXJyZW50IHBhZ2UuXG5cdCAgKi9cblxuXHRjYW5MZWF2ZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2FuTGVhdmUgPSB0cnVlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBEaXNhYmxlcyB0aGUgbWVzc2FnZSBpbiBhIGNvbmZpcm1hdGlvbiBkaWFsb2cgYm94IHRvIGluZm9ybSB0aGF0IHRoZSB1c2VyIGlzIGFib3V0IHRvIGxlYXZlIHRoZSBjdXJyZW50IHBhZ2UuXG5cdCAgKi9cblxuXHRjYW5ub3RMZWF2ZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2FuTGVhdmUgPSBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBNRVNTQUdFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9wdWJsaXNoQWxlcnQ6IGZ1bmN0aW9uKGNsYXp6LCB0aXRsZSwgbWVzc2FnZSwgZmFkZU91dClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnNvbGUubG9nKCdBTUkgJyArIHRpdGxlLnRvVXBwZXJDYXNlKCkgKyAnOiAnICsgbWVzc2FnZSArICdcXG4nICsgdGhpcy5nZXRTdGFjaygpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBodG1sID0gJzxkaXYgY2xhc3M9XCJ0b2FzdFwiIHJvbGU9XCJhbGVydFwiICcgKyAoZmFkZU91dCA/ICdkYXRhLWRlbGF5PVwiNjAwMDBcIicgOiAnZGF0YS1hdXRvaGlkZT1cImZhbHNlXCInKSArICc+PGRpdiBjbGFzcz1cInRvYXN0LWhlYWRlclwiPjxzdHJvbmcgY2xhc3M9XCJtci1hdXRvICcgKyBjbGF6eiArICdcIj4nICsgdGl0bGUgKyAnPC9zdHJvbmc+PHNtYWxsPicgKyB0aGlzLnRleHRUb0h0bWwod2luZG93Lm1vbWVudCgpLmZvcm1hdCgnREQgTU1NLCBISDptbTpzcycpKSArICc8L3NtYWxsPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWwtMiBtYi0xIGNsb3NlXCIgZGF0YS1kaXNtaXNzPVwidG9hc3RcIj48c3Bhbj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPjwvZGl2PjxkaXYgY2xhc3M9XCJ0b2FzdC1ib2R5XCI+JyArIHRoaXMudGV4dFRvSHRtbChtZXNzYWdlKSArICc8L2Rpdj48L2Rpdj4nO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZWwgPSAkKCcjYW1pX2FsZXJ0X2NvbnRlbnQnKTtcblxuXHRcdGVsLmFwcGVuZChodG1sLnJlcGxhY2UodGhpcy5fbGlua0V4cCwgJzxhIGhyZWY9XCIkMVwiIHRhcmdldD1cIl9ibGFua1wiPiQyPC9hPicpKS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdGVsLmZpbmQoJy50b2FzdDpsYXN0LWNoaWxkJykudG9hc3QoJ3Nob3cnKTtcblxuXHRcdFx0JChkb2N1bWVudCkuc2Nyb2xsVG9wKDApO1xuXG5cdFx0XHR0aGlzLnVubG9jaygpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTaG93cyBhbiAnaW5mbycgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IG1lc3NhZ2UgdGhlIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZhZGVPdXQ9ZmFsc2VdIGlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXG5cdCAgKi9cblxuXHRpbmZvOiBmdW5jdGlvbihtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0aWYodGhpcy50eXBlT2YobWVzc2FnZSkgPT09ICdBcnJheScpXG5cdFx0e1xuXHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2Uuam9pbignLiAnKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wdWJsaXNoQWxlcnQoJ3RleHQtaW5mbycsICdJbmZvJywgbWVzc2FnZSwgZmFkZU91dCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFNob3dzIGEgJ3N1Y2Nlc3MnIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBtZXNzYWdlIHRoZSBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge0Jvb2xlYW59IFtmYWRlT3V0PWZhbHNlXSBpZiBUcnVlLCB0aGUgbWVzc2FnZSBkaXNhcHBlYXJzIGFmdGVyIDYwc1xuXHQgICovXG5cblx0c3VjY2VzczogZnVuY3Rpb24obWVzc2FnZSwgZmFkZU91dClcblx0e1xuXHRcdGlmKHRoaXMudHlwZU9mKG1lc3NhZ2UpID09PSAnQXJyYXknKVxuXHRcdHtcblx0XHRcdG1lc3NhZ2UgPSBtZXNzYWdlLmpvaW4oJy4gJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fcHVibGlzaEFsZXJ0KCd0ZXh0LXN1Y2Nlc3MnLCAnU3VjY2VzcycsIG1lc3NhZ2UsIGZhZGVPdXQpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTaG93cyBhICd3YXJuaW5nJyBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbWVzc2FnZSB0aGUgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtCb29sZWFufSBbZmFkZU91dD1mYWxzZV0gaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcblx0ICAqL1xuXG5cdHdhcm5pbmc6IGZ1bmN0aW9uKG1lc3NhZ2UsIGZhZGVPdXQpXG5cdHtcblx0XHRpZih0aGlzLnR5cGVPZihtZXNzYWdlKSA9PT0gJ0FycmF5Jylcblx0XHR7XG5cdFx0XHRtZXNzYWdlID0gbWVzc2FnZS5qb2luKCcuICcpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3B1Ymxpc2hBbGVydCgndGV4dC13YXJuaW5nJywgJ1dhcm5pbmcnLCBtZXNzYWdlLCBmYWRlT3V0KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU2hvd3MgYW4gJ2Vycm9yJyBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbWVzc2FnZSB0aGUgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtCb29sZWFufSBbZmFkZU91dD1mYWxzZV0gaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcblx0ICAqL1xuXG5cdGVycm9yOiBmdW5jdGlvbihtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0aWYodGhpcy50eXBlT2YobWVzc2FnZSkgPT09ICdBcnJheScpXG5cdFx0e1xuXHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2Uuam9pbignLiAnKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wdWJsaXNoQWxlcnQoJ3RleHQtZGFuZ2VyJywgJ0Vycm9yJywgbWVzc2FnZSwgZmFkZU91dCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEZsdXNoZXMgbWVzc2FnZXNcblx0ICAqL1xuXG5cdGZsdXNoOiBmdW5jdGlvbigpXG5cdHtcblx0XHQkKCcjYW1pX2FsZXJ0X2NvbnRlbnQnKS5lbXB0eSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIEJSRUFEQ1JVTUIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBGaWxsIHRoZSBtYWluIGJyZWFkY3J1bWJcblx0ICAqIEBwYXJhbSB7QXJyYXl9IGl0ZW1zIHRoZSBhcnJheSBvZiBpdGVtcyAoSFRNTCBmb3JtYXQpXG5cdCAgKi9cblxuXHRmaWxsQnJlYWRjcnVtYjogZnVuY3Rpb24oaXRlbXMpXG5cdHtcblx0XHRsZXQgcyA9IHRoaXMudHlwZU9mKGl0ZW1zKSA9PT0gJ0FycmF5JyA/IGl0ZW1zLm1hcCgoaXRlbSkgPT4gJzxsaSBjbGFzcz1cImJyZWFkY3J1bWItaXRlbVwiPicgKyBpdGVtLnJlcGxhY2UoL3t7V0VCQVBQX1VSTH19L2csIHRoaXMud2ViQXBwVVJMKSArICc8L2xpPicpLmpvaW4oJycpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblxuXHRcdCQoJyNhbWlfYnJlYWRjcnVtYl9jb250ZW50JykuaHRtbChzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBXRUIgQVBQTElDQVRJT04gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogVGhpcyBtZXRob2QgbXVzdCBiZSBvdmVybG9hZGVkIGFuZCBpcyBjYWxsZWQgd2hlbiB0aGUgV2ViIGFwcGxpY2F0aW9uIHN0YXJ0c1xuXHQgICogQGV2ZW50IGFtaVdlYkFwcCNvblJlYWR5XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlckRhdGFcblx0ICAqL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKCF0aGlzLl9lbWJlZGRlZClcblx0XHR7XG5cdFx0XHRhbGVydCgnZXJyb3I6IGBhbWlXZWJBcHAub25SZWFkeSgpYCBtdXN0IGJlIG92ZXJsb2FkZWQhJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFRoaXMgbWV0aG9kIG11c3QgYmUgb3ZlcmxvYWRlZCBhbmQgaXMgY2FsbGVkIHdoZW4gdGhlIHRvb2xiYXIgbmVlZHMgdG8gYmUgdXBkYXRlZFxuXHQgICogQGV2ZW50IGFtaVdlYkFwcCNvblJlZnJlc2hcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNBdXRoXG5cdCAgKi9cblxuXHRvblJlZnJlc2g6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKCF0aGlzLl9lbWJlZGRlZClcblx0XHR7XG5cdFx0XHRhbGVydCgnZXJyb3I6IGBhbWlXZWJBcHAub25SZWZyZXNoKClgIG11c3QgYmUgb3ZlcmxvYWRlZCEnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU3RhcnRzIHRoZSBXZWIgYXBwbGljYXRpb25cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGxvZ29fdXJsLCBob21lX3VybCwgY29udGFjdF9lbWFpbCwgYWJvdXRfdXJsLCB0aGVtZV91cmwsIGxvY2tlcl91cmwsIHBhc3N3b3JkX2F1dGhlbnRpY2F0aW9uX2FsbG93ZWQsIGNlcnRpZmljYXRlX2F1dGhlbnRpY2F0aW9uX2FsbG93ZWQsIGNyZWF0ZV9hY2NvdW50X2FsbG93ZWQsIGNoYW5nZV9pbmZvX2FsbG93ZWQsIGNoYW5nZV9wYXNzd29yZF9hbGxvd2VkLCBjaGFuZ2VfY2VydGlmaWNhdGVfYWxsb3dlZClcblx0ICAqL1xuXG5cdHN0YXJ0OiBmdW5jdGlvbihzZXR0aW5ncylcblx0e1xuXHRcdHRoaXMuX2dsb2JhbERlZmVycmVkLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgW1xuXHRcdFx0XHRsb2dvVVJMLCBob21lVVJMLCBjb250YWN0RW1haWwsXG5cdFx0XHRcdGFib3V0VVJMLCB0aGVtZVVSTCwgbG9ja2VyVVJMLCBlbmRwb2ludFVSTCxcblx0XHRcdFx0cGFzc3dvcmRBdXRoZW50aWNhdGlvbkFsbG93ZWQsIGNlcnRpZmljYXRlQXV0aGVudGljYXRpb25BbGxvd2VkLFxuXHRcdFx0XHRjcmVhdGVBY2NvdW50QWxsb3dlZCwgY2hhbmdlSW5mb0FsbG93ZWQsIGNoYW5nZVBhc3N3b3JkQWxsb3dlZCwgY2hhbmdlQ2VydGlmaWNhdGVBbGxvd2VkXG5cdFx0XHRdID0gdGhpcy5zZXR1cChbXG5cdFx0XHRcdCdsb2dvX3VybCcsICdob21lX3VybCcsICdjb250YWN0X2VtYWlsJyxcblx0XHRcdFx0J2Fib3V0X3VybCcsICd0aGVtZV91cmwnLCAnbG9ja2VyX3VybCcsICdlbmRwb2ludF91cmwnLFxuXHRcdFx0XHQncGFzc3dvcmRfYXV0aGVudGljYXRpb25fYWxsb3dlZCcsICdjZXJ0aWZpY2F0ZV9hdXRoZW50aWNhdGlvbl9hbGxvd2VkJyxcblx0XHRcdFx0J2NyZWF0ZV9hY2NvdW50X2FsbG93ZWQnLCAnY2hhbmdlX2luZm9fYWxsb3dlZCcsICdjaGFuZ2VfcGFzc3dvcmRfYWxsb3dlZCcsICdjaGFuZ2VfY2VydGlmaWNhdGVfYWxsb3dlZCcsXG5cdFx0XHRdLCBbXG5cdFx0XHRcdHRoaXMub3JpZ2luVVJMXG5cdFx0XHRcdFx0KyAnL2ltYWdlcy9sb2dvLnBuZycsXG5cdFx0XHRcdHRoaXMud2ViQXBwVVJMLFxuXHRcdFx0XHQnYW1pQGxwc2MuaW4ycDMuZnInLFxuXHRcdFx0XHQnaHR0cDovL2Nlcm4uY2gvYW1pLycsXG5cdFx0XHRcdHRoaXMub3JpZ2luVVJMICsgJy90d2lnL0FNSS9UaGVtZS9ibHVlLnR3aWcnLFxuXHRcdFx0XHR0aGlzLm9yaWdpblVSTCArICcvdHdpZy9BTUkvRnJhZ21lbnQvbG9ja2VyLnR3aWcnLFxuXHRcdFx0XHR0aGlzLm9yaWdpblVSTCArICcvQU1JL0Zyb250RW5kJyxcblx0XHRcdFx0dHJ1ZSwgdHJ1ZSxcblx0XHRcdFx0dHJ1ZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSxcblx0XHRcdF0sIHNldHRpbmdzKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGFtaUNvbW1hbmQuZW5kcG9pbnQgPSBlbmRwb2ludFVSTDtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IChlKSA9PiB7XG5cblx0XHRcdFx0aWYoIXRoaXMuX2NhbkxlYXZlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgZiA9IGUgfHwgd2luZG93LmV2ZW50O1xuXG5cdFx0XHRcdFx0aWYoZilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRmLnJldHVyblZhbHVlID0gJ0NvbmZpcm0gdGhhdCB5b3Ugd2FudCB0byBsZWF2ZSB0aGlzIHBhZ2U/Jztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gJ0NvbmZpcm0gdGhhdCB5b3Ugd2FudCB0byBsZWF2ZSB0aGlzIHBhZ2U/Jztcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGNvbnRyb2xzVVJMID0gdGhpcy5vcmlnaW5VUkwgKyAnL2NvbnRyb2xzL0NPTlRST0xTLmpzb24nO1xuXG5cdFx0XHRjb25zdCBzdWJhcHBzVVJMID0gdGhpcy5vcmlnaW5VUkwgKyAnL3N1YmFwcHMvU1VCQVBQUy5qc29uJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQuYWpheCh7dXJsOiBjb250cm9sc1VSTCwgY2FjaGU6IGZhbHNlLCBjcm9zc0RvbWFpbjogdHJ1ZSwgZGF0YVR5cGU6ICdqc29uJ30pLnRoZW4oKGRhdGExKSA9PiB7XG5cblx0XHRcdFx0JC5hamF4KHt1cmw6IHN1YmFwcHNVUkwsIGNhY2hlOiBmYWxzZSwgY3Jvc3NEb21haW46IHRydWUsIGRhdGFUeXBlOiAnanNvbid9KS50aGVuKChkYXRhMikgPT4ge1xuXG5cdFx0XHRcdFx0Zm9yKGNvbnN0IG5hbWUgaW4gZGF0YTEpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2NvbnRyb2xzW25hbWUudG9Mb3dlckNhc2UoKV0gPSBkYXRhMVtuYW1lXTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IoY29uc3QgbmFtZSBpbiBkYXRhMikge1xuXHRcdFx0XHRcdFx0dGhpcy5fc3ViYXBwc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gZGF0YTJbbmFtZV07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoIXRoaXMuX2VtYmVkZGVkKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0XHRcdFx0XHRMT0dPX1VSTDogbG9nb1VSTCxcblx0XHRcdFx0XHRcdFx0SE9NRV9VUkw6IGhvbWVVUkwsXG5cdFx0XHRcdFx0XHRcdENPTlRBQ1RfRU1BSUw6IGNvbnRhY3RFbWFpbCxcblx0XHRcdFx0XHRcdFx0QUJPVVRfVVJMOiBhYm91dFVSTCxcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHQkLmFqYXgoe3VybDogdGhlbWVVUkwsIGNhY2hlOiB0cnVlLCBjcm9zc0RvbWFpbjogdHJ1ZSwgZGF0YVR5cGU6ICd0ZXh0J30pLnRoZW4oKGRhdGEzKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0JC5hamF4KHt1cmw6IGxvY2tlclVSTCwgY2FjaGU6IHRydWUsIGNyb3NzRG9tYWluOiB0cnVlLCBkYXRhVHlwZTogJ3RleHQnfSkudGhlbigoZGF0YTQpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdCQoJ2JvZHknKS5hcHBlbmQodGhpcy5mb3JtYXRUV0lHKGRhdGEzLCBkaWN0KSArIGRhdGE0KS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMubG9jaygpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRhbWlMb2dpbi5fc3RhcnQoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHBhc3N3b3JkQXV0aGVudGljYXRpb25BbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjZXJ0aWZpY2F0ZUF1dGhlbnRpY2F0aW9uQWxsb3dlZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y3JlYXRlQWNjb3VudEFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNoYW5nZUluZm9BbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjaGFuZ2VQYXNzd29yZEFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNoYW5nZUNlcnRpZmljYXRlQWxsb3dlZFxuXHRcdFx0XHRcdFx0XHRcdFx0KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnVubG9jaygpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5lcnJvcihtZXNzYWdlKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdGFsZXJ0KCdjb3VsZCBub3Qgb3BlbiBgJyArIGxvY2tlclVSTCArICdgLCBwbGVhc2UgcmVsb2FkIHRoZSBwYWdlLi4uJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRhbGVydCgnY291bGQgbm90IG9wZW4gYCcgKyB0aGVtZVVSTCArICdgLCBwbGVhc2UgcmVsb2FkIHRoZSBwYWdlLi4uJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRsZXQgZGF0YTMgPSAnJztcblxuXHRcdFx0XHRcdFx0aWYoJCgnI2FtaV9hbGVydF9jb250ZW50JykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdGRhdGEzICs9ICc8ZGl2IGlkPVwiYW1pX2FsZXJ0X2NvbnRlbnRcIj48L2Rpdj4nO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZigkKCcjYW1pX2xvZ2luX21lbnVfY29udGVudCcpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRkYXRhMyArPSAnPGRpdiBpZD1cImFtaV9sb2dpbl9tZW51X2NvbnRlbnRcIj48L2Rpdj4nO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0JC5hamF4KHt1cmw6IGxvY2tlclVSTCwgY2FjaGU6IHRydWUsIGNyb3NzRG9tYWluOiB0cnVlLCBkYXRhVHlwZTogJ3RleHQnfSkuZG9uZSgoZGF0YTQpID0+IHtcblxuXHRcdFx0XHRcdFx0XHQkKCdib2R5JykucHJlcGVuZChkYXRhMyArIGRhdGE0KS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHR0aGlzLmxvY2soKTtcblxuXHRcdFx0XHRcdFx0XHRcdGFtaUxvZ2luLl9zdGFydChcblx0XHRcdFx0XHRcdFx0XHRcdHBhc3N3b3JkQXV0aGVudGljYXRpb25BbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2VydGlmaWNhdGVBdXRoZW50aWNhdGlvbkFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRjcmVhdGVBY2NvdW50QWxsb3dlZCxcblx0XHRcdFx0XHRcdFx0XHRcdGNoYW5nZUluZm9BbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2hhbmdlUGFzc3dvcmRBbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2hhbmdlQ2VydGlmaWNhdGVBbGxvd2VkXG5cdFx0XHRcdFx0XHRcdFx0KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy51bmxvY2soKTtcblxuXHRcdFx0XHRcdFx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5lcnJvcihtZXNzYWdlKTtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdGFsZXJ0KCdjb3VsZCBub3Qgb3BlbiBgJyArIHN1YmFwcHNVUkwgKyAnYCwgcGxlYXNlIHJlbG9hZCB0aGUgcGFnZS4uLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9LCAoKSA9PiB7XG5cblx0XHRcdFx0YWxlcnQoJ2NvdWxkIG5vdCBvcGVuIGAnICsgY29udHJvbHNVUkwgKyAnYCwgcGxlYXNlIHJlbG9hZCB0aGUgcGFnZS4uLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFsZXJ0KG1lc3NhZ2UpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBDT05UUk9MUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgYSBjb250cm9sXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gY29udHJvbCB0aGUgYXJyYXkgb2YgY29udHJvbCBuYW1lXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZENvbnRyb2w6IGZ1bmN0aW9uKGNvbnRyb2wsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihjb250cm9sLmluZGV4T2YoJ2N0cmw6JykgPT09IDApXG5cdFx0e1xuXHRcdFx0Y29udHJvbCA9IGNvbnRyb2wuc3Vic3RyaW5nKDUpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGRlc2NyID0gdGhpcy5fY29udHJvbHNbY29udHJvbC50b0xvd2VyQ2FzZSgpXTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKGRlc2NyKVxuXHRcdHtcblx0XHRcdHRoaXMubG9hZFNjcmlwdHModGhpcy5vcmlnaW5VUkwgKyAnLycgKyBkZXNjci5maWxlKS50aGVuKChsb2FkZWQpID0+IHtcblxuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGNsYXp6ID0gd2luZG93W1xuXHRcdFx0XHRcdFx0ZGVzY3IuY2xhenpcblx0XHRcdFx0XHRdO1xuXG5cdFx0XHRcdFx0Y29uc3QgcHJvbWlzZSA9IGxvYWRlZFswXSA/IGNsYXp6LnByb3RvdHlwZS5vblJlYWR5LmFwcGx5KGNsYXp6LnByb3RvdHlwZSlcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgIDogLyotLS0tLS0tLS0tLS0tLS0tKi8gbnVsbCAvKi0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdF9hbWlfaW50ZXJuYWxfdGhlbihwcm9taXNlLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbLyotLS0tLS0tLS0tLS0tLS0tLS0tLSovIGNsYXp6IC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0qL10pO1xuXG5cdFx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBjb250cm9sIGAnICsgY29udHJvbCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoKG1lc3NhZ2UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIGNvbnRyb2wgYCcgKyBjb250cm9sICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIGNvbnRyb2wgYCcgKyBjb250cm9sICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGZpbmQgY29udHJvbCBgJyArIGNvbnRyb2wgKyAnYCddKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtwYXJlbnRdID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtvd25lcl0gPz8/XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gY29udHJvbCA/Pz9cblx0ICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjcmVhdGVDb250cm9sOiBmdW5jdGlvbihwYXJlbnQsIG93bmVyLCBjb250cm9sLCBwYXJhbXMsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmxvYWRDb250cm9sKGNvbnRyb2wsIHNldHRpbmdzKS5kb25lKChjb25zdHJ1Y3RvcikgPT4ge1xuXG5cdFx0XHRsZXQgaW5zdGFuY2UgPSBuZXcgY29uc3RydWN0b3IocGFyZW50LCBvd25lcik7XG5cblx0XHRcdF9hbWlfaW50ZXJuYWxfdGhlbihjb25zdHJ1Y3Rvci5wcm90b3R5cGUucmVuZGVyLmFwcGx5KGluc3RhbmNlLCBwYXJhbXMpLCBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2luc3RhbmNlXS5jb25jYXQoWy4uLmFyZ3VtZW50c10pKTtcblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbCBpbiB0aGUgYm9keVxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtwYXJlbnRdID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtvd25lcl0gPz8/XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gY29udHJvbCA/Pz9cblx0ICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtc1dpdGhvdXRTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBjb250cm9sU2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50U2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y3JlYXRlQ29udHJvbEluQm9keTogZnVuY3Rpb24ocGFyZW50LCBvd25lciwgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSB0aGlzLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRyeVxuXHRcdHtcblx0XHRcdGxldCBQQVJBTVMgPSBbXTtcblx0XHRcdGxldCBTRVRUSU5HUyA9IHt9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Zm9yKGxldCBrZXkgaW4gcGFyZW50U2V0dGluZ3MpIHtcblx0XHRcdFx0U0VUVElOR1Nba2V5XSA9IHBhcmVudFNldHRpbmdzW2tleV07XG5cdFx0XHR9XG5cblx0XHRcdGZvcihsZXQga2V5IGluIGNvbnRyb2xTZXR0aW5ncykge1xuXHRcdFx0XHRTRVRUSU5HU1trZXldID0gY29udHJvbFNldHRpbmdzW2tleV07XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQvLy8vLy8ucHVzaChzZWxlY3Rvcik7XG5cblx0XHRcdEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KFBBUkFNUywgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncyk7XG5cblx0XHRcdFBBUkFNUy5wdXNoKFNFVFRJTkdTKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRoaXMuY3JlYXRlQ29udHJvbChwYXJlbnQsIG93bmVyLCBjb250cm9sLCBQQVJBTVMpLmRvbmUoZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFsuLi5hcmd1bWVudHNdKTtcblxuXHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXHRcdGNhdGNoKG1lc3NhZ2UpXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbCBpbiBhIGNvbnRhaW5lclxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtwYXJlbnRdID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtvd25lcl0gPz8/XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gY29udHJvbCA/Pz9cblx0ICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtc1dpdGhvdXRTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBjb250cm9sU2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50U2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gaWNvbiA/Pz9cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0aXRsZSA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjcmVhdGVDb250cm9sSW5Db250YWluZXI6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIsIGNvbnRyb2wsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MsIGNvbnRyb2xTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIGljb24sIHRpdGxlLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0cGFyZW50LmFwcGVuZEl0ZW0oJzxpIGNsYXNzPVwiZmEgZmEtJyArIHRoaXMudGV4dFRvSHRtbChpY29uKSArICdcIj48L2k+ICcgKyB0aGlzLnRleHRUb0h0bWwodGl0bGUpKS5kb25lKChzZWxlY3RvcikgPT4ge1xuXG5cdFx0XHRcdGxldCBQQVJBTVMgPSBbXTtcblx0XHRcdFx0bGV0IFNFVFRJTkdTID0ge307XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRmb3IobGV0IGtleSBpbiBwYXJlbnRTZXR0aW5ncykge1xuXHRcdFx0XHRcdFNFVFRJTkdTW2tleV0gPSBwYXJlbnRTZXR0aW5nc1trZXldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yKGxldCBrZXkgaW4gY29udHJvbFNldHRpbmdzKSB7XG5cdFx0XHRcdFx0U0VUVElOR1Nba2V5XSA9IGNvbnRyb2xTZXR0aW5nc1trZXldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRQQVJBTVMucHVzaChzZWxlY3Rvcik7XG5cblx0XHRcdFx0QXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoUEFSQU1TLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzKTtcblxuXHRcdFx0XHRQQVJBTVMucHVzaChTRVRUSU5HUyk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHR0aGlzLmNyZWF0ZUNvbnRyb2wocGFyZW50LCBvd25lciwgY29udHJvbCwgUEFSQU1TKS5kb25lKGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFsuLi5hcmd1bWVudHNdKTtcblxuXHRcdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGNhdGNoKG1lc3NhZ2UpXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbCBpbiBhIGNvbnRhaW5lciBmcm9tIGEgV0VCIGxpbmtcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyZW50XSA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbb3duZXJdID8/P1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IGVsID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNyZWF0ZUNvbnRyb2xGcm9tV2ViTGluazogZnVuY3Rpb24ocGFyZW50LCBvd25lciwgZWwsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncylcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBkYXRhQ3RybCA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1jdHJsJykgPyBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY3RybCcpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXG5cdFx0bGV0IGRhdGFDdHJsTG9jYXRpb24gPSBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtY3RybC1sb2NhdGlvbicpID8gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWN0cmwtbG9jYXRpb24nKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGRhdGFQYXJhbXMgPSBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtcGFyYW1zJykgPyBKU09OLnBhcnNlKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wYXJhbXMnKSlcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdXG5cdFx0O1xuXG5cdFx0bGV0IGRhdGFTZXR0aW5ncyA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zZXR0aW5ncycpID8gSlNPTi5wYXJzZShlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2V0dGluZ3MnKSlcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB7fVxuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBkYXRhSWNvbiA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1pY29uJykgPyBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWNvbicpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdxdWVzdGlvbidcblx0XHQ7XG5cblx0XHRsZXQgZGF0YVRpdGxlID0gZWwuaGFzQXR0cmlidXRlKCdkYXRhLXRpdGxlJykgPyBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGl0bGUnKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdVbmtub3duJ1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMubG9jaygpO1xuXG5cdFx0LyoqLyBpZihkYXRhQ3RybExvY2F0aW9uID09PSAnYm9keScpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlQ29udHJvbEluQm9keShwYXJlbnQsIG93bmVyLCBkYXRhQ3RybCwgZGF0YVBhcmFtcywgZGF0YVNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMudW5sb2NrKCk7XG5cblx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHR0aGlzLmVycm9yKG1lc3NhZ2UpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVDb250cm9sSW5Db250YWluZXIocGFyZW50LCBvd25lciwgZGF0YUN0cmwsIGRhdGFQYXJhbXMsIGRhdGFTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIGRhdGFJY29uLCBkYXRhVGl0bGUsIHNldHRpbmdzKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLnVubG9jaygpO1xuXG5cdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5lcnJvcihtZXNzYWdlKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBTVUJBUFBTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRyaWdnZXJMb2dpbjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy5faXNSZWFkeSlcblx0XHR7XG5cdFx0XHRfYW1pX2ludGVybmFsX3RoZW4odGhpcy5fY3VycmVudFN1YkFwcEluc3RhbmNlLm9uTG9naW4odGhpcy5hcmdzWyd1c2VyZGF0YSddKSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRfYW1pX2ludGVybmFsX2Fsd2F5cyh0aGlzLm9uUmVmcmVzaCh0cnVlKSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdF9hbWlfaW50ZXJuYWxfYWx3YXlzKHRoaXMub25SZWZyZXNoKHRydWUpLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRyaWdnZXJMb2dvdXQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMuX2lzUmVhZHkpXG5cdFx0e1xuXHRcdFx0X2FtaV9pbnRlcm5hbF90aGVuKHRoaXMuX2N1cnJlbnRTdWJBcHBJbnN0YW5jZS5vbkxvZ291dCh0aGlzLmFyZ3NbJ3VzZXJkYXRhJ10pLCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdF9hbWlfaW50ZXJuYWxfYWx3YXlzKHRoaXMub25SZWZyZXNoKGZhbHNlKSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdF9hbWlfaW50ZXJuYWxfYWx3YXlzKHRoaXMub25SZWZyZXNoKGZhbHNlKSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZXNvbHZlKCk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIGEgc3ViYXBwXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3ViYXBwIHRoZSBzdWJhcHBcblx0ICAqIEBwYXJhbSB7P30gW3VzZXJkYXRhXSB0aGUgdXNlciBkYXRhXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZFN1YkFwcDogZnVuY3Rpb24oc3ViYXBwLCB1c2VyZGF0YSwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSB0aGlzLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMubG9jaygpO1xuXG5cdFx0cmVzdWx0LmFsd2F5cygoKSA9PiB7XG5cblx0XHRcdHRoaXMudW5sb2NrKCk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihzdWJhcHAuaW5kZXhPZignc3ViYXBwOicpID09PSAwKVxuXHRcdHtcblx0XHRcdHN1YmFwcCA9IHN1YmFwcC5zdWJzdHJpbmcoNyk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZGVzY3IgPSB0aGlzLl9zdWJhcHBzW3N1YmFwcC50b0xvd2VyQ2FzZSgpXTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKGRlc2NyKVxuXHRcdHtcblx0XHRcdHRoaXMubG9hZFNjcmlwdHModGhpcy5vcmlnaW5VUkwgKyAnLycgKyBkZXNjci5maWxlKS50aGVuKChsb2FkZWQpID0+IHtcblxuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuX2N1cnJlbnRTdWJBcHBJbnN0YW5jZS5vbkV4aXQodXNlcmRhdGEpO1xuXG5cdFx0XHRcdFx0Y29uc3QgaW5zdGFuY2UgPSB3aW5kb3dbZGVzY3IuaW5zdGFuY2VdO1xuXG5cdFx0XHRcdFx0dGhpcy5fY3VycmVudFN1YkFwcEluc3RhbmNlID0gaW5zdGFuY2U7XG5cblx0XHRcdFx0XHQvKiovXG5cblx0XHRcdFx0XHR0aGlzLmZpbGxCcmVhZGNydW1iKGRlc2NyLmJyZWFkY3J1bWIpO1xuXG5cdFx0XHRcdFx0Y29uc3QgcHJvbWlzZSA9IGxvYWRlZFswXSA/IGluc3RhbmNlLm9uUmVhZHkodXNlcmRhdGEpXG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICA6IC8qLS0tLS0tKi8gbnVsbCAvKi0tLS0tLSovXG5cdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0X2FtaV9pbnRlcm5hbF90aGVuKHByb21pc2UsICgpID0+IHtcblxuXHRcdFx0XHRcdFx0Y29uc3QgcHJvbWlzZSA9IGFtaUxvZ2luLmlzQXV0aGVudGljYXRlZCgpID8gdGhpcy50cmlnZ2VyTG9naW4oKVxuXHRcdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy50cmlnZ2VyTG9nb3V0KClcblx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdFx0cHJvbWlzZS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgWy8qLS0tLS0tLS0tLS0tLS0tLS0tKi8gaW5zdGFuY2UgLyotLS0tLS0tLS0tLS0tLS0tLS0qL10pO1xuXG5cdFx0XHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgc3ViYXBwIGAnICsgc3ViYXBwICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgc3ViYXBwIGAnICsgc3ViYXBwICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2gobWVzc2FnZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgc3ViYXBwIGAnICsgc3ViYXBwICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIHN1YmFwcCBgJyArIHN1YmFwcCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBmaW5kIHN1YmFwcCBgJyArIHN1YmFwcCArICdgJ10pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBMb2FkcyBhIHN1YmFwcCBieSBVUkxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBkZWZhdWx0U3ViQXBwIGlmICdhbWlXZWJBcHAuYXJnc1tcInN1YmFwcFwiXScgaXMgbnVsbCwgdGhlIGRlZmF1bHQgc3ViYXBwXG5cdCAgKiBAcGFyYW0gez99IFtkZWZhdWx0VXNlckRhdGFdIGlmICdhbWlXZWJBcHAuYXJnc1tcInVzZXJkYXRhXCJdJyBpcyBudWxsLCB0aGUgZGVmYXVsdCB1c2VyIGRhdGFcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRTdWJBcHBCeVVSTDogZnVuY3Rpb24oZGVmYXVsdFN1YkFwcCwgZGVmYXVsdFVzZXJEYXRhKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0aWYodGhpcy5hcmdzWyd2J10pXG5cdFx0e1xuXHRcdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdHZXRIYXNoSW5mbyAtaGFzaD1cIicgKyB0aGlzLnRleHRUb1N0cmluZyh0aGlzLmFyZ3NbJ3YnXSkgKyAnXCInKS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblxuXHRcdFx0fSkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRcdGxldCBqc29uO1xuXG5cdFx0XHRcdHRyeVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0anNvbiA9IEpTT04ucGFyc2UodGhpcy5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJqc29uXCJ9LiQnLCBkYXRhKVswXSB8fCAne30nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaChtZXNzYWdlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0anNvbiA9IHsvKiBFTVBUWSBKU09OICAgRU1QVFkgSlNPTiAgIEVNUFRZIEpTT04gICBFTVBUWSBKU09OICAgRU1QVFkgSlNPTiAqL307XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IHN1YmFwcCA9IGpzb25bJ3N1YmFwcCddIHx8IGRlZmF1bHRTdWJBcHA7XG5cdFx0XHRcdGNvbnN0IHVzZXJkYXRhID0ganNvblsndXNlcmRhdGEnXSB8fCBkZWZhdWx0VXNlckRhdGE7XG5cblx0XHRcdFx0dGhpcy5sb2FkU3ViQXBwKHN1YmFwcCwgdXNlcmRhdGEpLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0aWYoIWFtaVJvdXRlci5jaGVjaygpKVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IHN1YmFwcCA9IHRoaXMuYXJnc1snc3ViYXBwJ10gfHwgZGVmYXVsdFN1YkFwcDtcblx0XHRcdFx0Y29uc3QgdXNlcmRhdGEgPSB0aGlzLmFyZ3NbJ3VzZXJkYXRhJ10gfHwgZGVmYXVsdFVzZXJEYXRhO1xuXG5cdFx0XHRcdHRoaXMubG9hZFN1YkFwcChzdWJhcHAsIHVzZXJkYXRhKS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlKCk7XG5cblx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWkuSUNvbnRyb2wgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBBTUkgY29udHJvbCBpbnRlcmZhY2VcbiAqIEBpbnRlcmZhY2UgYW1pLklDb250cm9sXG4gKi9cblxuJEFNSUludGVyZmFjZSgnYW1pLklDb250cm9sJywgLyoqIEBsZW5kcyBhbWkuSUNvbnRyb2wgKi8ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUGF0Y2hlcyBhbiBIVE1MIGlkZW50aWZpZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBpZCB0aGUgdW5wYXRjaGVkIEhUTUwgaWRlbnRpZmllclxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIHBhdGNoZWQgSFRNTCBpZGVudGlmaWVyXG5cdCAgKi9cblxuXHRwYXRjaElkOiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBQdXRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdHJlcGxhY2VIVE1MOiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBQcmVwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgdGhlIHRhcmdldCBzZWxlY3RvclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgZnJhZ21lbnRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRwcmVwZW5kSFRNTDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXBwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgdGhlIHRhcmdldCBzZWxlY3RvclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgZnJhZ21lbnRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRhcHBlbmRIVE1MOiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDYWxsZWQgd2hlbiB0aGUgY29udHJvbCBpcyByZWFkeSB0byBydW5cblx0ICAqL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaS5JU3ViQXBwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIEFNSSBzdWItYXBwbGljYXRpb24gaW50ZXJmYWNlXG4gKiBAaW50ZXJmYWNlIGFtaS5JU3ViQXBwXG4gKi9cblxuJEFNSUludGVyZmFjZSgnYW1pLklTdWJBcHAnLCAvKiogQGxlbmRzIGFtaS5JU3ViQXBwICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENhbGxlZCB3aGVuIHRoZSBzdWItYXBwbGljYXRpb24gaXMgcmVhZHkgdG8gcnVuXG5cdCAgKiBAcGFyYW0gez99IHVzZXJkYXRhIHVzZXJkYXRhXG5cdCAgKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIGFib3V0IHRvIGV4aXRcblx0ICAqIEBwYXJhbSB7P30gdXNlcmRhdGEgdXNlcmRhdGFcblx0ICAqL1xuXG5cdG9uRXhpdDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2FsbGVkIHdoZW4gbG9nZ2luZyBpblxuXHQgICogQHBhcmFtIHs/fSB1c2VyZGF0YSB1c2VyZGF0YVxuXHQgICovXG5cblx0b25Mb2dpbjogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2FsbGVkIHdoZW4gbG9nZ2luZyBvdXRcblx0ICAqIEBwYXJhbSB7P30gdXNlcmRhdGEgdXNlcmRhdGFcblx0ICAqL1xuXG5cdG9uTG9nb3V0OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWkuQ29udHJvbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBiYXNpYyBBTUkgY29udHJvbFxuICogQGNsYXNzIGFtaS5Db250cm9sXG4gKiBAaW1wbGVtZW50cyB7YW1pLklDb250cm9sfVxuICovXG5cbiRBTUlDbGFzcygnYW1pLkNvbnRyb2wnLCAvKiogQGxlbmRzIGFtaS5Db250cm9sICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW1wbGVtZW50czogW2FtaS5JQ29udHJvbF0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkOiBmdW5jdGlvbigpXG5cdHtcblx0XHRhbWkuQ29udHJvbC5pbnN0YW5jZUNudCA9IDE7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24ocGFyZW50LCBvd25lcilcblx0e1xuXHRcdHRoaXMuX3BhcmVudCA9IHBhcmVudCB8fCB0aGlzO1xuXHRcdHRoaXMuX293bmVyID0gb3duZXIgfHwgdGhpcztcblxuXHRcdHRoaXMuaW5zdGFuY2VTdWZmaXggPSBhbWkuQ29udHJvbC5pbnN0YW5jZUNudCsrO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0UGFyZW50OiBmdW5jdGlvbihwYXJlbnQpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGFyZW50ID0gKHBhcmVudCB8fCB0aGlzKTtcblx0fSxcblxuXHRnZXRQYXJlbnQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wYXJlbnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRPd25lcjogZnVuY3Rpb24ob3duZXIpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fb3duZXIgPSAob3duZXIgfHwgdGhpcyk7XG5cdH0sXG5cblx0Z2V0T3duZXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9vd25lcjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldFNlbGVjdG9yOiBmdW5jdGlvbihzZWxlY3Rvcilcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zZWxlY3RvciA9IChzZWxlY3RvciB8fCAnJyk7XG5cdH0sXG5cblx0Z2V0U2VsZWN0b3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zZWxlY3Rvcjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhdGNoSWQ6IGZ1bmN0aW9uKGlkZW50aWZpZXIpXG5cdHtcblx0XHRyZXR1cm4gaWRlbnRpZmllciArICdfaW5zdGFuY2UnICsgdGhpcy5pbnN0YW5jZVN1ZmZpeDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlcGxhY2VIVE1MOiBmdW5jdGlvbihzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpXG5cdHtcblx0XHRpZighc2V0dGluZ3MpXG5cdFx0e1xuXHRcdFx0c2V0dGluZ3MgPSB7fTtcblx0XHR9XG5cblx0XHRzZXR0aW5ncy5zdWZmaXggPSB0aGlzLmluc3RhbmNlU3VmZml4O1xuXG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5yZXBsYWNlSFRNTChzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cHJlcGVuZEhUTUw6IGZ1bmN0aW9uKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncylcblx0e1xuXHRcdGlmKCFzZXR0aW5ncylcblx0XHR7XG5cdFx0XHRzZXR0aW5ncyA9IHt9O1xuXHRcdH1cblxuXHRcdHNldHRpbmdzLnN1ZmZpeCA9IHRoaXMuaW5zdGFuY2VTdWZmaXg7XG5cblx0XHRyZXR1cm4gYW1pV2ViQXBwLnByZXBlbmRIVE1MKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRhcHBlbmRIVE1MOiBmdW5jdGlvbihzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpXG5cdHtcblx0XHRpZighc2V0dGluZ3MpXG5cdFx0e1xuXHRcdFx0c2V0dGluZ3MgPSB7fTtcblx0XHR9XG5cblx0XHRzZXR0aW5ncy5zdWZmaXggPSB0aGlzLmluc3RhbmNlU3VmZml4O1xuXG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5hcHBlbmRIVE1MKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjcmVhdGVDb250cm9sOiBmdW5jdGlvbihwYXJlbnQsIGNvbnRyb2wsIHBhcmFtcywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2wocGFyZW50LCB0aGlzLCBjb250cm9sLCBwYXJhbXMsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNyZWF0ZUNvbnRyb2xJbkJvZHk6IGZ1bmN0aW9uKHBhcmVudCwgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2xJbkJvZHkocGFyZW50LCB0aGlzLCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjcmVhdGVDb250cm9sSW5Db250YWluZXI6IGZ1bmN0aW9uKHBhcmVudCwgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgaWNvbiwgdGl0bGUsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5jcmVhdGVDb250cm9sSW5Db250YWluZXIocGFyZW50LCB0aGlzLCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBpY29uLCB0aXRsZSwgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y3JlYXRlQ29udHJvbEZyb21XZWJMaW5rOiBmdW5jdGlvbihwYXJlbnQsIGVsLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2xGcm9tV2ViTGluayhwYXJlbnQsIHRoaXMsIGVsLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWkuU3ViQXBwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBiYXNpYyBBTUkgc3ViLWFwcGxpY2F0aW9uXG4gKiBAY2xhc3MgYW1pLlN1YkFwcFxuICogQGltcGxlbWVudHMge2FtaS5JU3ViQXBwfVxuICovXG5cbiRBTUlDbGFzcygnYW1pLlN1YkFwcCcsIC8qKiBAbGVuZHMgYW1pLlN1YkFwcCAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGltcGxlbWVudHM6IFthbWkuSVN1YkFwcF0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvbkV4aXQ6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvbkxvZ2luOiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25Mb2dvdXQ6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pQ29tbWFuZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgQU1JIGNvbW1hbmQgc3Vic3lzdGVtXG4gKiBAbmFtZXNwYWNlIGFtaUNvbW1hbmRcbiAqL1xuXG4kQU1JTmFtZXNwYWNlKCdhbWlDb21tYW5kJywgLyoqIEBsZW5kcyBhbWlDb21tYW5kICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIERlZmF1bHQgZW5kcG9pbnRcblx0ICAqIEB0eXBlIHtTdHJpbmd9XG5cdCAgKi9cblxuXHRlbmRwb2ludDogJ2h0dHA6Ly94eHl5Lnp6JyxcblxuXHQvKipcblx0ICAqIERlZmF1bHQgY29udmVydGVyXG5cdCAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICovXG5cblx0Y29udmVydGVyOiAnQU1JWG1sVG9Kc29uLnhzbCcsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FVEhPRFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEV4ZWN1dGVzIGFuIEFNSSBjb21tYW5kXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gY29tbWFuZCB0aGUgY29tbWFuZFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZW5kcG9pbnQsIGNvbnZlcnRlciwgdGltZW91dCwgZXh0cmFQYXJhbSwgZXh0cmFWYWx1ZSlcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGV4ZWN1dGU6IGZ1bmN0aW9uKGNvbW1hbmQsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2VuZHBvaW50LCBjb252ZXJ0ZXIsIGNvbnRleHQsIHRpbWVvdXQsIGV4dHJhUGFyYW0sIGV4dHJhVmFsdWVdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0WydlbmRwb2ludCcsICdjb252ZXJ0ZXInLCAnY29udGV4dCcsICd0aW1lb3V0JywgJ2V4dHJhUGFyYW0nLCAnZXh0cmFWYWx1ZSddLFxuXHRcdFx0W3RoaXMuZW5kcG9pbnQsIHRoaXMuY29udmVydGVyLCByZXN1bHQsIDIgKiA2MCAqIDEwMDAsIG51bGwsIG51bGxdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgVVJMID0gZW5kcG9pbnQudHJpbSgpO1xuXHRcdGNvbnN0IENPTU1BTkQgPSBjb21tYW5kLnRyaW0oKTtcblx0XHRjb25zdCBDT05WRVJURVIgPSBjb252ZXJ0ZXIudHJpbSgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZGF0YSA9IHtcblx0XHRcdENvbW1hbmQ6IENPTU1BTkQsXG5cdFx0XHRDb252ZXJ0ZXI6IENPTlZFUlRFUixcblx0XHR9O1xuXG5cdFx0aWYoZXh0cmFQYXJhbSlcblx0XHR7XG5cdFx0XHRkYXRhW2V4dHJhUGFyYW1dID0gZXh0cmFWYWx1ZSA/IGV4dHJhVmFsdWVcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKCgobnVsbCkpKVxuXHRcdFx0O1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVybFdpdGhQYXJhbWV0ZXJzID0gVVJMICsgJz8nICsgJC5wYXJhbShkYXRhKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKENPTlZFUlRFUiA9PT0gJ0FNSVhtbFRvSnNvbi54c2wnKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSlNPTiBGT1JNQVQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dXJsOiBVUkwsXG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0dGltZW91dDogdGltZW91dCxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0eGhyRmllbGRzOiB7XG5cdFx0XHRcdFx0d2l0aENyZWRlbnRpYWxzOiB0cnVlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG5cblx0XHRcdFx0XHRjb25zdCBpbmZvID0gSlNQYXRoLmFwcGx5KCcuQU1JTWVzc2FnZS5pbmZvLiQnLCBkYXRhKTtcblx0XHRcdFx0XHRjb25zdCBlcnJvciA9IEpTUGF0aC5hcHBseSgnLkFNSU1lc3NhZ2UuZXJyb3IuJCcsIGRhdGEpO1xuXG5cdFx0XHRcdFx0aWYoZXJyb3IubGVuZ3RoID09PSAwKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZGF0YSwgaW5mby5qb2luKCcuICcpLCB1cmxXaXRoUGFyYW1ldGVyc10pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGEsIGVycm9yLmpvaW4oJy4gJyksIHVybFdpdGhQYXJhbWV0ZXJzXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRlcnJvcjogKGpxWEhSLCB0ZXh0U3RhdHVzKSA9PiB7XG5cblx0XHRcdFx0XHRpZih0ZXh0U3RhdHVzID09PSAnZXJyb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRleHRTdGF0dXMgPSAnc2VydmljZSB0ZW1wb3JhcmlseSB1bnJlYWNoYWJsZSc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYodGV4dFN0YXR1cyA9PT0gJ3BhcnNlcmVycm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZXh0U3RhdHVzID0gJ3Jlc291cmNlIHRlbXBvcmFyaWx5IHVucmVhY2hhYmxlJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjb25zdCBkYXRhID0geydBTUlNZXNzYWdlJzogW3snZXJyb3InOiBbeyckJzogdGV4dFN0YXR1c31dfV19O1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGEsIHRleHRTdGF0dXMsIHVybFdpdGhQYXJhbWV0ZXJzXSk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogT1RIRVIgRk9STUFUUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dXJsOiBVUkwsXG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0dGltZW91dDogdGltZW91dCxcblx0XHRcdFx0ZGF0YVR5cGU6ICd0ZXh0Jyxcblx0XHRcdFx0eGhyRmllbGRzOiB7XG5cdFx0XHRcdFx0d2l0aENyZWRlbnRpYWxzOiB0cnVlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2RhdGEsIGRhdGEsIHVybFdpdGhQYXJhbWV0ZXJzXSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVycm9yOiAoanFYSFIsIHRleHRTdGF0dXMpID0+IHtcblxuXHRcdFx0XHRcdGlmKHRleHRTdGF0dXMgPT09ICdlcnJvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGV4dFN0YXR1cyA9ICdzZXJ2aWNlIHRlbXBvcmFyaWx5IHVucmVhY2hhYmxlJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbdGV4dFN0YXR1cywgdGV4dFN0YXR1cywgdXJsV2l0aFBhcmFtZXRlcnNdKTtcblx0XHRcdFx0fSxcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogTG9ncyBpbiBieSBsb2dpbi9wYXNzd29yZFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHVzZXIgdGhlIHVzZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBwYXNzIHRoZSBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdHBhc3NMb2dpbjogZnVuY3Rpb24odXNlciwgcGFzcywgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5leGVjdXRlKCdHZXRTZXNzaW9uSW5mbyAtQU1JVXNlcj1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHVzZXIpICsgJ1wiIC1BTUlQYXNzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcocGFzcykgKyAnXCInLCB7ZXh0cmFQYXJhbTogJ05vQ2VydCd9KS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGNvbnN0IHVzZXJJbmZvID0ge307XG5cdFx0XHRjb25zdCByb2xlSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3QgdWRwSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgc3NvSW5mbyA9IHt9XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJ1c2VyXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1c2VySW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwidWRwXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1ZHBJbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJzc29cIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHNzb0luZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInJvbGVcIn0ucm93JywgZGF0YSkuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0bGV0IG5hbWUgPSAnJztcblx0XHRcdFx0Y29uc3Qgcm9sZSA9IHt9O1xuXG5cdFx0XHRcdHJvdy5maWVsZC5mb3JFYWNoKChmaWVsZCkgPT4ge1xuXG5cdFx0XHRcdFx0cm9sZVtmaWVsZFsnQG5hbWUnXV0gPSBmaWVsZFsnJCddO1xuXG5cdFx0XHRcdFx0aWYoZmllbGRbJ0BuYW1lJ10gPT09ICduYW1lJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lID0gZmllbGRbJyQnXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJvbGVJbmZvW25hbWVdID0gcm9sZTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2RhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mb10pO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGEsIG1lc3NhZ2UsIHtBTUlVc2VyOiAnZ3Vlc3QnLCBndWVzdFVzZXI6ICdndWVzdCd9LCB7fSwge30sIHt9XSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogTG9ncyBpbiBieSBjZXJ0aWZpY2F0ZVxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNlcnRMb2dpbjogZnVuY3Rpb24oc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5leGVjdXRlKCdHZXRTZXNzaW9uSW5mbycpLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0Y29uc3QgdXNlckluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHJvbGVJbmZvID0ge307XG5cdFx0XHRjb25zdCB1ZHBJbmZvID0ge307XG5cdFx0XHRjb25zdCBzc29JbmZvID0ge307XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJ1c2VyXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1c2VySW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwidWRwXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1ZHBJbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJzc29cIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHNzb0luZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInJvbGVcIn0ucm93JywgZGF0YSkuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0bGV0IG5hbWUgPSAnJztcblx0XHRcdFx0Y29uc3Qgcm9sZSA9IHt9O1xuXG5cdFx0XHRcdHJvdy5maWVsZC5mb3JFYWNoKChmaWVsZCkgPT4ge1xuXG5cdFx0XHRcdFx0cm9sZVtmaWVsZFsnQG5hbWUnXV0gPSBmaWVsZFsnJCddO1xuXG5cdFx0XHRcdFx0aWYoZmllbGRbJ0BuYW1lJ10gPT09ICduYW1lJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lID0gZmllbGRbJyQnXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJvbGVJbmZvW25hbWVdID0gcm9sZTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2RhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mb10pO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGEsIG1lc3NhZ2UsIHtBTUlVc2VyOiAnZ3Vlc3QnLCBndWVzdFVzZXI6ICdndWVzdCd9LCB7fSwge30sIHt9XSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogTG9ncyBvdXRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2dvdXQ6IGZ1bmN0aW9uKHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuZXhlY3V0ZSgnR2V0U2Vzc2lvbkluZm8gLUFNSVVzZXI9XCJcIiAtQU1JUGFzcz1cIlwiJywge2V4dHJhUGFyYW06ICdOb0NlcnQnfSkudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRjb25zdCB1c2VySW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgcm9sZUluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHVkcEluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHNzb0luZm8gPSB7fVxuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwidXNlclwifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0dXNlckluZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInVkcFwifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0dWRwSW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwic3NvXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHRzc29JbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJyb2xlXCJ9LnJvdycsIGRhdGEpLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGxldCBuYW1lID0gJyc7XG5cdFx0XHRcdGNvbnN0IHJvbGUgPSB7fTtcblxuXHRcdFx0XHRyb3cuZmllbGQuZm9yRWFjaCgoZmllbGQpID0+IHtcblxuXHRcdFx0XHRcdHJvbGVbZmllbGRbJ0BuYW1lJ11dID0gZmllbGRbJyQnXTtcblxuXHRcdFx0XHRcdGlmKGZpZWxkWydAbmFtZSddID09PSAnbmFtZScpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZSA9IGZpZWxkWyckJ107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyb2xlSW5mb1tuYW1lXSA9IHJvbGU7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm9dKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFtkYXRhLCBtZXNzYWdlLCB7QU1JVXNlcjogJ2d1ZXN0JywgZ3Vlc3RVc2VyOiAnZ3Vlc3QnfSwge30sIHt9LCB7fV0pO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEF0dGFjaGVzIGEgY2VydGlmaWNhdGVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyIHRoZSB1c2VyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGFzcyB0aGUgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRhdHRhY2hDZXJ0OiBmdW5jdGlvbih1c2VyLCBwYXNzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGUoJ0dldFNlc3Npb25JbmZvIC1hdHRhY2hDZXJ0IC1hbWlMb2dpbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHVzZXIpICsgJ1wiIC1hbWlQYXNzd29yZD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHBhc3MpICsgJ1wiJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBEZXRhY2hlcyBhIGNlcnRpZmljYXRlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlciB0aGUgdXNlclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhc3MgdGhlIHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0ZGV0YWNoQ2VydDogZnVuY3Rpb24odXNlciwgcGFzcywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5leGVjdXRlKCdHZXRTZXNzaW9uSW5mbyAtZGV0YWNoQ2VydCAtYW1pTG9naW49XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh1c2VyKSArICdcIiAtYW1pUGFzc3dvcmQ9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwYXNzKSArICdcIicsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQWRkcyBhIG5ldyB1c2VyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlciB0aGUgdXNlclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhc3MgdGhlIHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gZmlyc3ROYW1lIHRoZSBmaXJzdCBuYW1lXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gbGFzdE5hbWUgdGhlIGxhc3QgbmFtZVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGVtYWlsIHRoZSBlbWFpbFxuXHQgICogQHBhcmFtIHtCb29sZWFufSBhdHRhY2ggYXR0YWNoIHRoZSBjdXJyZW50IGNlcnRpZmljYXRlXG5cdCAgKiBAcGFyYW0ge0Jvb2xlYW59IGFncmVlIGFncmVlIHdpdGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0YWRkVXNlcjogZnVuY3Rpb24odXNlciwgcGFzcywgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIGF0dGFjaCwgYWdyZWUsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZSgnQWRkVXNlciAtYW1pTG9naW49XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh1c2VyKSArICdcIiAtYW1pUGFzc3dvcmQ9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwYXNzKSArICdcIiAtZmlyc3ROYW1lPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZmlyc3ROYW1lKSArICdcIiAtbGFzdE5hbWU9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhsYXN0TmFtZSkgKyAnXCIgLWVtYWlsPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZW1haWwpICsgJ1wiJyArIChhdHRhY2ggPyAnIC1hdHRhY2gnIDogJycpICsgKGFncmVlID8gJyAtYWdyZWUnIDogJycpLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENoYW5nZXMgdGhlIGFjY291bnQgaW5mb3JtYXRpb25cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBmaXJzdE5hbWUgdGhlIGZpcnN0IG5hbWVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBsYXN0TmFtZSB0aGUgbGFzdCBuYW1lXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gZW1haWwgdGhlIGVtYWlsXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y2hhbmdlSW5mbzogZnVuY3Rpb24oZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZSgnU2V0VXNlckluZm8gLWZpcnN0TmFtZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGZpcnN0TmFtZSkgKyAnXCIgLWxhc3ROYW1lPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcobGFzdE5hbWUpICsgJ1wiIC1lbWFpbD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGVtYWlsKSArICdcIicsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hhbmdlcyB0aGUgYWNjb3VudCBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHVzZXIgdGhlIHVzZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRQYXNzIHRoZSBvbGQgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBuZXdQYXNzIHRoZSBuZXcgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjaGFuZ2VQYXNzOiBmdW5jdGlvbih1c2VyLCBvbGRQYXNzLCBuZXdQYXNzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGUoJ0NoYW5nZVBhc3N3b3JkIC1hbWlMb2dpbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHVzZXIpICsgJ1wiIC1hbWlQYXNzd29yZE9sZD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKG9sZFBhc3MpICsgJ1wiIC1hbWlQYXNzd29yZE5ldz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKG5ld1Bhc3MpICsgJ1wiJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBSZXNldHMgdGhlIGFjY291bnQgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyIHRoZSB1c2VyXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0cmVzZXRQYXNzOiBmdW5jdGlvbih1c2VyLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGUoJ1Jlc2V0UGFzc3dvcmQgLWFtaUxvZ2luPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodXNlcikgKyAnXCInLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pTG9naW4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgQU1JIGF1dGhlbnRpY2F0aW9uIHN1YnN5c3RlbVxuICogQG5hbWVzcGFjZSBhbWlMb2dpblxuICovXG5cbiRBTUlOYW1lc3BhY2UoJ2FtaUxvZ2luJywgLyoqIEBsZW5kcyBhbWlMb2dpbiAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBVQkxJQyBNRU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFzc3dvcmRBdXRoZW50aWNhdGlvbkFsbG93ZWQ6IHRydWUsXG5cdGNlcnRpZmljYXRlQXV0aGVudGljYXRpb25BbGxvd2VkOiB0cnVlLFxuXHRjcmVhdGVBY2NvdW50QWxsb3dlZDogdHJ1ZSxcblx0Y2hhbmdlSW5mb0FsbG93ZWQ6IHRydWUsXG5cdGNoYW5nZVBhc3N3b3JkQWxsb3dlZDogdHJ1ZSxcblx0Y2hhbmdlQ2VydGlmaWNhdGVBbGxvd2VkOiB0cnVlLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dXNlcjogJ2d1ZXN0Jyxcblx0Z3Vlc3Q6ICdndWVzdCcsXG5cblx0Y2xpZW50RE46ICcnLCAvLyBmYWlyZSBkaXNwYXJhaXRyZSBjZXMgdmFyaWFibGVzIGV0IGxlcyBnZXR0ZXJzXG5cdGlzc3VlckROOiAnJywgLy8gZmFpcmUgZGlzcGFyYWl0cmUgY2VzIHZhcmlhYmxlcyBldCBsZXMgZ2V0dGVyc1xuXG5cdG5vdEJlZm9yZTogJycsIC8vIGZhaXJlIGRpc3BhcmFpdHJlIGNlcyB2YXJpYWJsZXMgZXQgbGVzIGdldHRlcnNcblx0bm90QWZ0ZXI6ICcnLCAvLyBmYWlyZSBkaXNwYXJhaXRyZSBjZXMgdmFyaWFibGVzIGV0IGxlcyBnZXR0ZXJzXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR1c2VySW5mbzoge30sXG5cdHJvbGVJbmZvOiB7fSxcblx0dWRwSW5mbzoge30sXG5cdHNzb0luZm86IHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBSSVZBVEUgTUVUSE9EUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3N0YXJ0OiBmdW5jdGlvbihwYXNzd29yZEF1dGhlbnRpY2F0aW9uQWxsb3dlZCwgY2VydGlmaWNhdGVBdXRoZW50aWNhdGlvbkFsbG93ZWQsIGNyZWF0ZUFjY291bnRBbGxvd2VkLCBjaGFuZ2VJbmZvQWxsb3dlZCwgY2hhbmdlUGFzc3dvcmRBbGxvd2VkLCBjaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWQpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9hZFRXSUdzKFtcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL3R3aWcvQU1JL0ZyYWdtZW50L2xvZ2luX2J1dHRvbi50d2lnJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL3R3aWcvQU1JL0ZyYWdtZW50L2xvZ291dF9idXR0b24udHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy90d2lnL0FNSS9Nb2RhbC9sb2dpbi50d2lnJyxcblx0XHRdKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLmZyYWdtZW50TG9naW5CdXR0b24gPSBkYXRhWzBdO1xuXHRcdFx0dGhpcy5mcmFnbWVudExvZ291dEJ1dHRvbiA9IGRhdGFbMV07XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0XHRwYXNzd29yZEF1dGhlbnRpY2F0aW9uQWxsb3dlZDogdGhpcy5wYXNzd29yZEF1dGhlbnRpY2F0aW9uQWxsb3dlZCA9IHBhc3N3b3JkQXV0aGVudGljYXRpb25BbGxvd2VkLFxuXHRcdFx0XHRjZXJ0aWZpY2F0ZUF1dGhlbnRpY2F0aW9uQWxsb3dlZDogdGhpcy5jZXJ0aWZpY2F0ZUF1dGhlbnRpY2F0aW9uQWxsb3dlZCA9IGNlcnRpZmljYXRlQXV0aGVudGljYXRpb25BbGxvd2VkLFxuXHRcdFx0XHRjcmVhdGVBY2NvdW50QWxsb3dlZDogdGhpcy5jcmVhdGVBY2NvdW50QWxsb3dlZCA9IGNyZWF0ZUFjY291bnRBbGxvd2VkLFxuXHRcdFx0XHRjaGFuZ2VJbmZvQWxsb3dlZDogdGhpcy5jaGFuZ2VJbmZvQWxsb3dlZCA9IGNoYW5nZUluZm9BbGxvd2VkLFxuXHRcdFx0XHRjaGFuZ2VQYXNzd29yZEFsbG93ZWQ6IHRoaXMuY2hhbmdlUGFzc3dvcmRBbGxvd2VkID0gY2hhbmdlUGFzc3dvcmRBbGxvd2VkLFxuXHRcdFx0XHRjaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWQ6IHRoaXMuY2hhbmdlQ2VydGlmaWNhdGVBbGxvd2VkID0gY2hhbmdlQ2VydGlmaWNhdGVBbGxvd2VkLFxuXHRcdFx0fTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGFtaVdlYkFwcC5hcHBlbmRIVE1MKCdib2R5JywgZGF0YVsyXSwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdCQoJyNCNzg5NENDMV8xREFBXzRBN0VfQjdEMV9EQkRGNkYwNkFDNzMnKS5zdWJtaXQoKGUpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuZm9ybV9sb2dpbihlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnI0VFMDU1Q0Q0X0U1OEZfNDgzNF84MDIwXzk4NkFFM0Y4RDY3RCcpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5mb3JtX2FkZFVzZXIoZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdCQoJyNEQTIwNDdBMl85RTVEXzQyMERfQjZFN19GQTI2MUQyRUYxMEYnKS5zdWJtaXQoKGUpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuZm9ybV9yZW1pbmRQYXNzKGUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcjRDlFQUY5OThfRUQ4RV80NEQyX0EwQkVfOEM1Q0Y1RTQzOEJEJykuc3VibWl0KChlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmZvcm1fY2hhbmdlSW5mbyhlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnI0U5MkExMDk3Xzk4M0JfNDg1N184NzVGXzA3RTQ2NTlCNDFCMCcpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5mb3JtX2NoYW5nZVBhc3MoZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0U2RTMwRUVDXzE1RUVfNEZDRl85ODA5XzJCOEVDMkZFRjM4OCwjQ0NEOEU2RjFfNkRGOF80QkREX0EwRUNfQzNDMzgwODMwMTg3JykuY2hhbmdlKCgpID0+IHtcblxuXHRcdFx0XHRcdGNvbnN0IHBhc3MxID0gJCgnI0U2RTMwRUVDXzE1RUVfNEZDRl85ODA5XzJCOEVDMkZFRjM4OCcpLnZhbCgpO1xuXHRcdFx0XHRcdGNvbnN0IHBhc3MyID0gJCgnI0NDRDhFNkYxXzZERjhfNEJERF9BMEVDX0MzQzM4MDgzMDE4NycpLnZhbCgpO1xuXG5cdFx0XHRcdFx0JCgnI0NDRDhFNkYxXzZERjhfNEJERF9BMEVDX0MzQzM4MDgzMDE4NycpLmdldCgwKS5zZXRDdXN0b21WYWxpZGl0eShcblx0XHRcdFx0XHRcdHBhc3MxLmxlbmd0aCA+IDAgJiYgcGFzczIubGVuZ3RoID4gMCAmJiBwYXNzMSAhPT0gcGFzczIgPyAnUGFzc3dvcmRzIGRvblxcJ3QgbWF0Y2guJyA6ICcnXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnI0Q0ODdGRTcyXzhEOTVfNDA0OF9CRUEzXzI1MjI3NDg2MkFGNCwjRUUxREE1OENfMzc2MV80NzM0X0E5QzJfRTgwOENERDdFRTc3JykuY2hhbmdlKCgpID0+IHtcblxuXHRcdFx0XHRcdGNvbnN0IHBhc3MxID0gJCgnI0Q0ODdGRTcyXzhEOTVfNDA0OF9CRUEzXzI1MjI3NDg2MkFGNCcpLnZhbCgpO1xuXHRcdFx0XHRcdGNvbnN0IHBhc3MyID0gJCgnI0VFMURBNThDXzM3NjFfNDczNF9BOUMyX0U4MDhDREQ3RUU3NycpLnZhbCgpO1xuXG5cdFx0XHRcdFx0JCgnI0VFMURBNThDXzM3NjFfNDczNF9BOUMyX0U4MDhDREQ3RUU3NycpLmdldCgwKS5zZXRDdXN0b21WYWxpZGl0eShcblx0XHRcdFx0XHRcdHBhc3MxLmxlbmd0aCA+IDAgJiYgcGFzczIubGVuZ3RoID4gMCAmJiBwYXNzMSAhPT0gcGFzczIgPyAnUGFzc3dvcmRzIGRvblxcJ3QgbWF0Y2guJyA6ICcnXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZSkgPT4ge1xuXG5cdFx0XHRcdGlmKHRoaXMuc3NvSW5mby51cmwuc3RhcnRzV2l0aChlLm9yaWdpbikpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCB1c2VyID0gZS5kYXRhLnVzZXI7XG5cdFx0XHRcdFx0Y29uc3QgcGFzcyA9IGUuZGF0YS5wYXNzO1xuXG5cdFx0XHRcdFx0aWYodXNlciAmJiBwYXNzKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRoaXMuZm9ybV9sb2dpbjIodXNlciwgcGFzcyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZS5zb3VyY2UuY2xvc2UoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9LCBmYWxzZSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCB1c2VyZGF0YSA9IGFtaVdlYkFwcC5hcmdzWyd1c2VyZGF0YSddIHx8ICcnO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0c2V0SW50ZXJ2YWwoKCkgPT4ge1xuXG5cdFx0XHRcdGlmKGFtaVdlYkFwcC5faXNSZWFkeSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFtaUNvbW1hbmQuY2VydExvZ2luKCkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cblx0XHRcdFx0XHR9KS5kb25lKChkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pID0+IHtcblxuXHRcdFx0XHRcdFx0aWYoKHVzZXJJbmZvLkFNSVVzZXIgfHwgJycpID09PSAodXNlckluZm8uZ3Vlc3RVc2VyIHx8ICcnKSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fdXBkYXRlKHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSwgMzAgKiAxMDAwKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGFtaUNvbW1hbmQuY2VydExvZ2luKCkuZmFpbCgoZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5fdXBkYXRlKHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykuYWx3YXlzKCgvKi0tLSovKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSkuZG9uZSgoZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKSA9PiB7XG5cblx0XHRcdFx0X2FtaV9pbnRlcm5hbF90aGVuKGFtaVdlYkFwcC5vblJlYWR5KHVzZXJkYXRhKSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLl9pc1JlYWR5ID0gdHJ1ZTtcblxuXHRcdFx0XHRcdHRoaXMuX3VwZGF0ZSh1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pLnRoZW4oKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUobWVzc2FnZSk7XG5cblx0XHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuX2lzUmVhZHkgPSB0cnVlO1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9zdWNjZXNzOiBmdW5jdGlvbihtZXNzYWdlKVxuXHR7XG5cdFx0YW1pV2ViQXBwLnN1Y2Nlc3MobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblx0fSxcblxuXHRfZXJyb3I6IGZ1bmN0aW9uKG1lc3NhZ2UpXG5cdHtcblx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblx0fSxcblxuXHRfdW5sb2NrOiBmdW5jdGlvbigpXG5cdHtcblx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9jbGVhbjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0JCgnI0I3ODk0Q0MxXzFEQUFfNEE3RV9CN0QxX0RCREY2RjA2QUM3MycpLnRyaWdnZXIoJ3Jlc2V0Jyk7XG5cdFx0JCgnI0VFMDU1Q0Q0X0U1OEZfNDgzNF84MDIwXzk4NkFFM0Y4RDY3RCcpLnRyaWdnZXIoJ3Jlc2V0Jyk7XG5cdFx0JCgnI0RBMjA0N0EyXzlFNURfNDIwRF9CNkU3X0ZBMjYxRDJFRjEwRicpLnRyaWdnZXIoJ3Jlc2V0Jyk7XG5cdFx0JCgnI0U5MkExMDk3Xzk4M0JfNDg1N184NzVGXzA3RTQ2NTlCNDFCMCcpLnRyaWdnZXIoJ3Jlc2V0Jyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfdXBkYXRlOiBmdW5jdGlvbih1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1c2VyID0gdGhpcy51c2VyID0gdXNlckluZm8uQU1JVXNlciB8fCAnJztcblx0XHRjb25zdCBndWVzdCA9IHRoaXMuZ3Vlc3QgPSB1c2VySW5mby5ndWVzdFVzZXIgfHwgJyc7XG5cblx0XHRjb25zdCBub3RCZWZvcmUgPSB0aGlzLm5vdEJlZm9yZSA9IHVzZXJJbmZvLm5vdEJlZm9yZSB8fCAnJztcblx0XHRjb25zdCBub3RBZnRlciA9IHRoaXMubm90QWZ0ZXIgPSB1c2VySW5mby5ub3RBZnRlciB8fCAnJztcblxuXHRcdGNvbnN0IGNsaWVudEROSW5TZXNzaW9uID0gdGhpcy5jbGllbnRETiA9IHVzZXJJbmZvLmNsaWVudEROSW5TZXNzaW9uIHx8ICcnO1xuXHRcdGNvbnN0IGlzc3VlckROSW5TZXNzaW9uID0gdGhpcy5pc3N1ZXJETiA9IHVzZXJJbmZvLmlzc3VlckROSW5TZXNzaW9uIHx8ICcnO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0JCgnI0EwOUFFMzE2XzcwNjhfNEJDMV85NkE5XzZCODdEMjg4NjNGRScpLnByb3AoJ2Rpc2FibGVkJywgIWNsaWVudEROSW5TZXNzaW9uIHx8ICFpc3N1ZXJETkluU2Vzc2lvbik7XG5cblx0XHQkKCcjQzNFOTRGNkRfNDhFMF84NkMwXzM1MzRfNjkxNzI4RTQ5MkY0JykuYXR0cignc3JjJywgdWRwSW5mby50ZXJtc0FuZENvbmRpdGlvbnMgfHwgYW1pV2ViQXBwLm9yaWdpblVSTCArICcvZG9jcy90ZXJtc19hbmRfY29uZGl0aW9ucy5odG1sJyk7XG5cdFx0JCgnI0U1MEZGOEJEX0IwRjVfQ0Q3Ml9GOURDX0ZDMkJGQTVEQkEyNycpLmF0dHIoJ3NyYycsIHVkcEluZm8udGVybXNBbmRDb25kaXRpb25zIHx8IGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2RvY3MvdGVybXNfYW5kX2NvbmRpdGlvbnMuaHRtbCcpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy51c2VySW5mbyA9IHVzZXJJbmZvO1xuXHRcdHRoaXMucm9sZUluZm8gPSByb2xlSW5mbztcblx0XHR0aGlzLnVkcEluZm8gPSB1ZHBJbmZvO1xuXHRcdHRoaXMuc3NvSW5mbyA9IHNzb0luZm87XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0Y3JlYXRlQWNjb3VudEFsbG93ZWQ6IHRoaXMuY3JlYXRlQWNjb3VudEFsbG93ZWQsXG5cdFx0XHRjaGFuZ2VJbmZvQWxsb3dlZDogdGhpcy5jaGFuZ2VJbmZvQWxsb3dlZCxcblx0XHRcdGNoYW5nZVBhc3N3b3JkQWxsb3dlZDogdGhpcy5jaGFuZ2VQYXNzd29yZEFsbG93ZWQsXG5cdFx0XHRjaGFuZ2VDZXJ0aWZpY2F0ZUFsbG93ZWQ6IHRoaXMuY2hhbmdlQ2VydGlmaWNhdGVBbGxvd2VkLFxuXHRcdFx0LyoqL1xuXHRcdFx0c3NvX2xhYmVsOiBzc29JbmZvLmxhYmVsIHx8ICdTU08nLFxuXHRcdFx0c3NvX3VybDogc3NvSW5mby51cmwgfHwgJ0BOVUxMJyxcblx0XHR9O1xuXG5cdFx0aWYodXNlciAhPT0gZ3Vlc3QpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBHRVQgSU5GTyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCB2YWxpZCA9IHVzZXJJbmZvLnZhbGlkIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCBjZXJ0RW5hYmxlZCA9IHVzZXJJbmZvLmNlcnRFbmFibGVkIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCB2b21zRW5hYmxlZCA9IHVzZXJJbmZvLnZvbXNFbmFibGVkIHx8ICdmYWxzZSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBmaXJzdE5hbWUgPSB1c2VySW5mby5maXJzdE5hbWUgfHwgJyc7XG5cdFx0XHRjb25zdCBsYXN0TmFtZSA9IHVzZXJJbmZvLmxhc3ROYW1lIHx8ICcnO1xuXHRcdFx0Y29uc3QgZW1haWwgPSB1c2VySW5mby5lbWFpbCB8fCAnJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGNsaWVudEROSW5BTUkgPSB1c2VySW5mby5jbGllbnRETkluQU1JIHx8ICcnO1xuXHRcdFx0Y29uc3QgaXNzdWVyRE5JbkFNSSA9IHVzZXJJbmZvLmlzc3VlckROSW5BTUkgfHwgJyc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU0VUIElORk8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCgnI0U1MTNGMjdEXzU1MjFfNEIwOF9CRjYxXzUyQUZCODEzNTZGNycpLnZhbChmaXJzdE5hbWUpO1xuXHRcdFx0JCgnI0FGRjBCNUMwX0JFRUNfNDg0Ml85MTZEX0RDQkE3RjU4OTE5NScpLnZhbChsYXN0TmFtZSk7XG5cdFx0XHQkKCcjQzU4NzQ4NkJfNjJDMF80QjZFXzkyODhfRDhGOUY4OUQxNTdCJykudmFsKGVtYWlsKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQoJyNBQkVCMDI5MV80MEIwXzQxNEFfQTQyQl9FN0VBQkI5QjQ4N0UnKS52YWwoZmlyc3ROYW1lKTtcblx0XHRcdCQoJyNBNUFGREI2Ml8xMDM0XzRGNjZfQTNFNl85MzQxQjMxRkEyOTAnKS52YWwobGFzdE5hbWUpO1xuXHRcdFx0JCgnI0Q3MzBBNzc0XzA1RUFfNDdBQl9BMEM4X0Q5Mjc1MzgwMkUzRScpLnZhbChlbWFpbCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKCcjRDFCRUUzQkZfOTE2MV80MURDX0JDNTNfQzQ0RkZFNEQyNTIyJykudmFsKGNsaWVudEROSW5BTUkpO1xuXHRcdFx0JCgnI0M3NjgwNUQ3XzFFODZfNDIzMV85MDcxXzFEMDQ3ODM0MjNCQicpLnZhbChjbGllbnRETkluU2Vzc2lvbik7XG5cdFx0XHQkKCcjRjQyRkFGNkJfMkM4RF80MTQyXzhCRDlfRTVCQ0RDQUEwNUFBJykudmFsKGlzc3VlckROSW5BTUkpO1xuXHRcdFx0JCgnI0ZFMkY2MjMyX0MyNTZfNEI4MF85MzlDX0VCRUM5MDMyMDMwOCcpLnZhbChpc3N1ZXJETkluU2Vzc2lvbik7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsZXQgdGFibGUgPSBbXTtcblxuXHRcdFx0Zm9yKGxldCByb2xlIGluIHJvbGVJbmZvKVxuXHRcdFx0e1xuXHRcdFx0XHR0YWJsZS5wdXNoKCc8dHI+Jyk7XG5cdFx0XHRcdHRhYmxlLnB1c2goJzx0ZD4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwocm9sZUluZm9bcm9sZV0ubmFtZSB8fCAnTi9BJykgKyAnPC90ZD4nKTtcblx0XHRcdFx0dGFibGUucHVzaCgnPHRkPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChyb2xlSW5mb1tyb2xlXS5kZXNjcmlwdGlvbiB8fCAnTi9BJykgKyAnPC90ZD4nKTtcblx0XHRcdFx0dGFibGUucHVzaCgnPC90cj4nKTtcblx0XHRcdH1cblxuXHRcdFx0JCgnI0JCMDc2NzZCX0VBQ0FfOUI0Ml9FRDUxXzQ3N0RCMjk3NjA0MScpLmh0bWwodGFibGUuam9pbignJykpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIENIRUNLIFVTRVIgU1RBVFVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGxldCBpY29uID0gJyc7XG5cdFx0XHRsZXQgbWVzc2FnZSA9ICcnO1xuXG5cdFx0XHRpZih2YWxpZCAhPT0gJ2ZhbHNlJylcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogVkFMSUQgVVNFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihjZXJ0RW5hYmxlZCAhPT0gJ2ZhbHNlJyAmJiBjbGllbnRETkluQU1JICYmIGlzc3VlckROSW5BTUkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZighY2xpZW50RE5JblNlc3Npb25cblx0XHRcdFx0XHQgICB8fFxuXHRcdFx0XHRcdCAgICFpc3N1ZXJETkluU2Vzc2lvblxuXHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdG1lc3NhZ2UgPSAnSXQgaXMgcmVjb21tZW5kZWQgdG8gYXV0aGVudGljYXRlIHdpdGggYSBYLjUwOSBjZXJ0aWZpY2F0ZS4nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYoY2xpZW50RE5JbkFNSSAhPT0gY2xpZW50RE5JblNlc3Npb25cblx0XHRcdFx0XHRcdCAgIHx8XG5cdFx0XHRcdFx0XHQgICBpc3N1ZXJETkluQU1JICE9PSBpc3N1ZXJETkluU2Vzc2lvblxuXHRcdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0XHRtZXNzYWdlID0gJ1RoZSBYLjUwOSBjZXJ0aWZpY2F0ZSBpbiB0aGUgc2Vzc2lvbiBkaWZmZXJzIGZyb20gdGhlIG9uZSBpbiBBTUkuJztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKG1lc3NhZ2UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkKCcjRDk0NEIwMURfMkU4RF80RUU5XzlEQ0NfMjY5MTQzOEJCQTE2JykuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1pbmZvLWNpcmNsZSB0ZXh0LXdhcm5pbmdcIj48L2k+ICcgKyBtZXNzYWdlKTtcblxuXHRcdFx0XHRcdGljb24gPSAnPGEgY2xhc3M9XCJuYXYtbGluayB0ZXh0LXdhcm5pbmdcIiBocmVmPVwiamF2YXNjcmlwdDphbWlMb2dpbi5hY2NvdW50U3RhdHVzKCk7XCI+J1xuXHRcdFx0XHRcdCAgICAgICArXG5cdFx0XHRcdFx0ICAgICAgICc8aSBjbGFzcz1cImZhIGZhLWluZm8tY2lyY2xlXCI+PC9pPidcblx0XHRcdFx0XHQgICAgICAgK1xuXHRcdFx0XHRcdCAgICAgICAnPC9hPidcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdCQoJyNGM0ZGOUY0M19ERTcyXzQwQkJfQjFCQV9CN0IzQzkwMDI2NzEnKS5jbG9zZXN0KCcucm91bmRlZCcpLmNzcygnYmFja2dyb3VuZCcsICcjQjhENDlCIHVybChcIicgKyBhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9pbWFnZXMvY2VydGlmaWNhdGUtZ3JlZW4ucG5nXCIpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyJylcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCdiYWNrZ3JvdW5kLXNpemUnLCAnY292ZXInKVxuXHRcdFx0XHQ7XG5cblx0XHRcdFx0JCgnI0YzRkY5RjQzX0RFNzJfNDBCQl9CMUJBX0I3QjNDOTAwMjY3MScpLmNzcygnY29sb3InLCAnIzAwNjQwMCcpXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5odG1sKCc8aSBjbGFzcz1cImZhIGZhLWxlYWZcIj48L2k+IHZhbGlkIDxpIGNsYXNzPVwiZmEgZmEtbGVhZlwiPjwvaT4nKVxuXHRcdFx0XHQ7XG5cblx0XHRcdFx0JCgnI0U5MTI4MEY2X0U3QzZfM0U1M19BNDU3XzY0Njk5NUM5OTMxNycpLnRleHQobm90QmVmb3JlICsgJyAtICcgKyBub3RBZnRlcik7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogSU5WQUxJRCBVU0VSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZih2b21zRW5hYmxlZCAhPT0gJ2ZhbHNlJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKCFjbGllbnRETkluQU1JXG5cdFx0XHRcdFx0ICAgfHxcblx0XHRcdFx0XHQgICAhaXNzdWVyRE5JbkFNSVxuXHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdG1lc3NhZ2UgPSAnUmVnaXN0ZXIgYSB2YWxpZCBYLjUwOSBjZXJ0aWZpY2F0ZS4nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bWVzc2FnZSA9ICdDaGVjayB5b3VyIHZpcnR1YWwgb3JnYW5pemF0aW9uIHJvbGVzLic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG1lc3NhZ2UgPSAnVW5leHBlY3RlZCBpc3N1ZSwgY29udGFjdCB0aGUgQU1JIHRlYW0uJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYobWVzc2FnZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCQoJyNEOTQ0QjAxRF8yRThEXzRFRTlfOURDQ18yNjkxNDM4QkJBMTYnKS5odG1sKCc8aSBjbGFzcz1cImZhIGZhLWluZm8tY2lyY2xlIHRleHQtZGFuZ2VyXCI+PC9pPiAnICsgbWVzc2FnZSk7XG5cblx0XHRcdFx0XHRpY29uID0gJzxhIGNsYXNzPVwibmF2LWxpbmsgdGV4dC1kYW5nZXJcIiBocmVmPVwiamF2YXNjcmlwdDphbWlMb2dpbi5hY2NvdW50U3RhdHVzKCk7XCI+J1xuXHRcdFx0XHRcdCAgICAgICArXG5cdFx0XHRcdFx0ICAgICAgICc8aSBjbGFzcz1cImZhIGZhLWluZm8tY2lyY2xlXCI+PC9pPidcblx0XHRcdFx0XHQgICAgICAgK1xuXHRcdFx0XHRcdCAgICAgICAnPC9hPidcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdCQoJyNGM0ZGOUY0M19ERTcyXzQwQkJfQjFCQV9CN0IzQzkwMDI2NzEnKS5jbG9zZXN0KCcucm91bmRlZCcpLmNzcygnYmFja2dyb3VuZCcsICcjRThDOENGIHVybChcIicgKyBhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9pbWFnZXMvY2VydGlmaWNhdGUtcGluay5wbmdcIikgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXInKVxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ2JhY2tncm91bmQtc2l6ZScsICdjb3ZlcicpXG5cdFx0XHRcdDtcblxuXHRcdFx0XHQkKCcjRjNGRjlGNDNfREU3Ml80MEJCX0IxQkFfQjdCM0M5MDAyNjcxJykuY3NzKCdjb2xvcicsICcjOEIwMDAwJylcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtbGVhZlwiPjwvaT4gaW52YWxpZCA8aSBjbGFzcz1cImZhIGZhLWxlYWZcIj48L2k+Jylcblx0XHRcdFx0O1xuXG5cdFx0XHRcdCQoJyNFOTEyODBGNl9FN0M2XzNFNTNfQTQ1N182NDY5OTVDOTkzMTcnKS50ZXh0KG5vdEJlZm9yZSArICcgLSAnICsgbm90QWZ0ZXIpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogVVBEQVRFIFFSQ09ERSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCgnI0VDOTQ4MDg0XzhDMEFfQ0VCRl81OEM5XzA4NjA0NkFCMjQ1NicpLnFyY29kZSh7XG5cdFx0XHRcdHJlbmRlcjogJ2NhbnZhcycsXG5cdFx0XHRcdGVjTGV2ZWw6ICdIJyxcblx0XHRcdFx0c2l6ZTogMTUwLFxuXHRcdFx0XHRmaWxsOiAncmdiYSgwMDAsIDEwMCwgMDAwLCAwLjkpJyxcblx0XHRcdFx0YmFja2dyb3VuZDogJ3JnYmEoMDAwLCAxMDAsIDAwMCwgMC4xNSknLFxuXHRcdFx0XHR0ZXh0OiB1c2VyICsgJ3wnICsgZmlyc3ROYW1lICsgJyAnICsgbGFzdE5hbWUgKyAnfCcgKyBlbWFpbCArICd8JyArIGNsaWVudEROSW5BTUkgKyAnfCcgKyBpc3N1ZXJETkluQU1JLFxuXHRcdFx0XHRyYWRpdXM6IDAsXG5cdFx0XHRcdHF1aWV0OiAxLFxuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogVVBEQVRFIE1FTlUgQkFSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0ZGljdFsndXNlciddID0gdXNlcjtcblx0XHRcdGRpY3RbJ2ljb24nXSA9IGljb247XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRhbWlXZWJBcHAucmVwbGFjZUhUTUwoJyNhbWlfbG9naW5fbWVudV9jb250ZW50JywgdGhpcy5mcmFnbWVudExvZ291dEJ1dHRvbiwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudHJpZ2dlckxvZ2luKCkudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXG5cdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRhbWlXZWJBcHAucmVwbGFjZUhUTUwoJyNhbWlfbG9naW5fbWVudV9jb250ZW50JywgdGhpcy5mcmFnbWVudExvZ2luQnV0dG9uLCB7ZGljdDogZGljdH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC50cmlnZ2VyTG9nb3V0KCkudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXG5cdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQVUJMSUMgTUVUSE9EUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgdXNlciBpbmZvcm1hdGlvblxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGN1cnJlbnQgdXNlciBpbmZvcm1hdGlvblxuXHQgICovXG5cblx0Z2V0VXNlckluZm86IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnVzZXJJbmZvO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSByb2xlIGluZm9ybWF0aW9uXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgY3VycmVudCByb2xlIGluZm9ybWF0aW9uXG5cdCAgKi9cblxuXHRnZXRSb2xlSW5mbzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucm9sZUluZm87XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIHVzZXIgZGF0YSBwcm90ZWN0aW9uIGluZm9ybWF0aW9uXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgY3VycmVudCB1c2VyIGRhdGEgcHJvdGVjdGlvbiBpbmZvcm1hdGlvblxuXHQgICovXG5cblx0Z2V0VVBESW5mbzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudWRwSW5mbztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgc2luZ2xlIHNpZ24gb24gaW5mb3JtYXRpb25cblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBjdXJyZW50IHNpbmdsZSBzaWduIG9uIGluZm9ybWF0aW9uXG5cdCAgKi9cblxuXHRnZXRTU09JbmZvOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5zc29JbmZvO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBjdXJyZW50IHVzZXJcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBjdXJyZW50IHVzZXJcblx0ICAqL1xuXG5cdGdldFVzZXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnVzZXI7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIGd1ZXN0IHVzZXJcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBndWVzdCB1c2VyXG5cdCAgKi9cblxuXHRnZXRHdWVzdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZ3Vlc3Q7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIGNsaWVudCBETlxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGNsaWVudCBETlxuXHQgICovXG5cblx0Z2V0Q2xpZW50RE46IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmNsaWVudEROO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBpc3N1ZXIgRE5cblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBpc3N1ZXIgRE5cblx0ICAqL1xuXG5cdGdldElzc3VlckROOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc3N1ZXJETjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hlY2tzIHdoZXRoZXIgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZFxuXHQgICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAgKi9cblxuXHRpc0F1dGhlbnRpY2F0ZWQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnVzZXIgIT09IHRoaXMuZ3Vlc3Q7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENoZWNrcyB3aGV0aGVyIHRoZSB1c2VyIGhhcyB0aGUgZ2l2ZW4gcm9sZVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHJvbGUgdGhlIHJvbGVcblx0ICAqIEByZXR1cm5zIHtCb29sZWFufVxuXHQgICovXG5cblx0aGFzUm9sZTogZnVuY3Rpb24ocm9sZU5hbWUpXG5cdHtcblx0XHRyZXR1cm4gcm9sZU5hbWUgaW4gdGhpcy5yb2xlSW5mbztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogT3BlbnMgdGhlICdTU08nIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0c3NvOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jbGVhbigpO1xuXG5cdFx0d2luZG93Lm9wZW4odGhpcy5zc29JbmZvLnVybCwgJ1NpbmdsZSBTaWduLU9uJywgJ21lbnViYXI9bm8sIHN0YXR1cz1ubywgc2Nyb2xsYmFycz1ubywgd2lkdGg9ODAwLCBoZWlnaHQ9NDUwJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnU2lnbkluJyBtb2RhbCB3aW5kb3dcblx0ICAqL1xuXG5cdHNpZ25JbjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblxuXHRcdCQoJyNEMkI1RkFERV85N0EzXzRCOENfODU2MV83QTlBRUFDREJFNUInKS5tb2RhbCgnc2hvdycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBPcGVucyB0aGUgJ0NoYW5nZSBJbmZvJyBtb2RhbCB3aW5kb3dcblx0ICAqL1xuXG5cdGNoYW5nZUluZm86IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuX2NsZWFuKCk7XG5cblx0XHQkKCcjRDlFQUY5OThfRUQ4RV80NEQyX0EwQkVfOEM1Q0Y1RTQzOEJEJykubW9kYWwoJ3Nob3cnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogT3BlbnMgdGhlICdDaGFuZ2UgUGFzc3dvcmQnIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0Y2hhbmdlUGFzczogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblxuXHRcdCQoJyNFOTJBMTA5N185ODNCXzQ4NTdfODc1Rl8wN0U0NjU5QjQxQjAnKS5tb2RhbCgnc2hvdycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBPcGVucyB0aGUgJ0FjY291bnQgU3RhdHVzJyBtb2RhbCB3aW5kb3dcblx0ICAqL1xuXG5cdGFjY291bnRTdGF0dXM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuX2NsZWFuKCk7XG5cblx0XHQkKCcjQUIxQ0IxODNfOTZFQl80MTE2XzhBOUVfNDQwOUJFMDU4RjM0JykubW9kYWwoJ3Nob3cnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU2lnbnMgb3V0XG5cdCAgKi9cblxuXHRzaWduT3V0OiBmdW5jdGlvbigpXG5cdHtcblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0cmV0dXJuIGFtaUNvbW1hbmQubG9nb3V0KCkuYWx3YXlzKChkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pID0+IHtcblxuXHRcdFx0dGhpcy5fdXBkYXRlKHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5fdW5sb2NrKCk7XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fbG9naW46IGZ1bmN0aW9uKGUpXG5cdHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRjb25zdCB2YWx1ZXMgPSAkKGUudGFyZ2V0KS5zZXJpYWxpemVPYmplY3QoKTtcblxuXHRcdHJldHVybiB0aGlzLmZvcm1fbG9naW4yKHZhbHVlc1sndXNlciddLCB2YWx1ZXNbJ3Bhc3MnXSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2xvZ2luMjogZnVuY3Rpb24odXNlciwgcGFzcylcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHByb21pc2UgPSAodXNlciAmJiBwYXNzKSA/IGFtaUNvbW1hbmQucGFzc0xvZ2luKHVzZXIudHJpbSgpLCBwYXNzLnRyaW0oKSlcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhbWlDb21tYW5kLmNlcnRMb2dpbigvKi0tLS0tLS0tLS0tLS0tLS0tLS0tKi8pXG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdHByb21pc2UudGhlbigoZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKSA9PiB7XG5cblx0XHRcdHRoaXMuX3VwZGF0ZSh1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdGlmKHVzZXJJbmZvLkFNSVVzZXIgIT09IHVzZXJJbmZvLmd1ZXN0VXNlcilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCQoJyNEMkI1RkFERV85N0EzXzRCOENfODU2MV83QTlBRUFDREJFNUInKS5tb2RhbCgnaGlkZScpO1xuXG5cdFx0XHRcdFx0dGhpcy5fdW5sb2NrKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRpZih1c2VySW5mby5BTUlVc2VyICE9PSB1c2VySW5mby5ndWVzdFVzZXIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkKCcjRDJCNUZBREVfOTdBM180QjhDXzg1NjFfN0E5QUVBQ0RCRTVCJykubW9kYWwoJ2hpZGUnKTtcblxuXHRcdFx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYodXNlckluZm8uQU1JVXNlciA9PT0gdXNlckluZm8uZ3Vlc3RVc2VyKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgbWVzc2FnZSA9ICdBdXRoZW50aWNhdGlvbiBmYWlsZWQuJztcblxuXHRcdFx0XHRpZih1c2VySW5mby5jbGllbnRETkluU2Vzc2lvbiB8fCB1c2VySW5mby5pc3N1ZXJETkluU2Vzc2lvbilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG1lc3NhZ2UgKz0gJyBDbGllbnQgRE4gaW4gc2Vzc2lvbjogJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKHVzZXJJbmZvLmNsaWVudEROSW5TZXNzaW9uKSArICcuJ1xuXHRcdFx0XHRcdCAgICAgICAgICAgK1xuXHRcdFx0XHRcdCAgICAgICAgICAgJyBJc3N1ZXIgRE4gaW4gc2Vzc2lvbjogJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKHVzZXJJbmZvLmlzc3VlckROSW5TZXNzaW9uKSArICcuJ1xuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdFx0fVxuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykgPT4ge1xuXG5cdFx0XHR0aGlzLl91cGRhdGUodXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKS5hbHdheXMoKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2F0dGFjaENlcnQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVzZXIgPSAkKCcjRTY0RjI0QjJfMzNFNl80REVEXzlCMjRfMjhCRTA0MjE5NjEzJykudmFsKCk7XG5cdFx0Y29uc3QgcGFzcyA9ICQoJyNBNERGRDAzOV8wMzRGXzREMTBfOTY2OF8zODVBRUY0RkJCQjknKS52YWwoKTtcblxuXHRcdGlmKCF1c2VyIHx8ICFwYXNzKVxuXHRcdHtcblx0XHRcdHRoaXMuX2Vycm9yKCdQbGVhc2UsIGZpbGwgYWxsIGZpZWxkcyB3aXRoIGEgcmVkIHN0YXIuJyk7XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5hdHRhY2hDZXJ0KHVzZXIsIHBhc3MpLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9kZXRhY2hDZXJ0OiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1c2VyID0gJCgnI0U2NEYyNEIyXzMzRTZfNERFRF85QjI0XzI4QkUwNDIxOTYxMycpLnZhbCgpO1xuXHRcdGNvbnN0IHBhc3MgPSAkKCcjQTRERkQwMzlfMDM0Rl80RDEwXzk2NjhfMzg1QUVGNEZCQkI5JykudmFsKCk7XG5cblx0XHRpZighdXNlciB8fCAhcGFzcylcblx0XHR7XG5cdFx0XHR0aGlzLl9lcnJvcignUGxlYXNlLCBmaWxsIGFsbCBmaWVsZHMgd2l0aCBhIHJlZCBzdGFyLicpO1xuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdGFtaUNvbW1hbmQuZGV0YWNoQ2VydCh1c2VyLCBwYXNzKS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX3N1Y2Nlc3MobWVzc2FnZSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fYWRkVXNlcjogZnVuY3Rpb24oZSlcblx0e1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHZhbHVlcyA9ICQoZS50YXJnZXQpLnNlcmlhbGl6ZU9iamVjdCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdGFtaUNvbW1hbmQuYWRkVXNlcih2YWx1ZXNbJ2xvZ2luJ10sIHZhbHVlc1sncGFzcyddLCB2YWx1ZXNbJ2ZpcnN0X25hbWUnXSwgdmFsdWVzWydsYXN0X25hbWUnXSwgdmFsdWVzWydlbWFpbCddLCAnYXR0YWNoJyBpbiB2YWx1ZXMsICdhZ3JlZScgaW4gdmFsdWVzKS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX3N1Y2Nlc3MobWVzc2FnZSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fcmVtaW5kUGFzczogZnVuY3Rpb24oZSlcblx0e1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHZhbHVlcyA9ICQoZS50YXJnZXQpLnNlcmlhbGl6ZU9iamVjdCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdGFtaUNvbW1hbmQucmVzZXRQYXNzKHZhbHVlc1sndXNlciddKS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX3N1Y2Nlc3MobWVzc2FnZSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fY2hhbmdlSW5mbzogZnVuY3Rpb24oZSlcblx0e1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHZhbHVlcyA9ICQoZS50YXJnZXQpLnNlcmlhbGl6ZU9iamVjdCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdGFtaUNvbW1hbmQuY2hhbmdlSW5mbyh2YWx1ZXNbJ2ZpcnN0X25hbWUnXSwgdmFsdWVzWydsYXN0X25hbWUnXSwgdmFsdWVzWydlbWFpbCddKS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX3N1Y2Nlc3MobWVzc2FnZSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fY2hhbmdlUGFzczogZnVuY3Rpb24oZSlcblx0e1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHZhbHVlcyA9ICQoZS50YXJnZXQpLnNlcmlhbGl6ZU9iamVjdCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdGFtaUNvbW1hbmQuY2hhbmdlUGFzcyh0aGlzLnVzZXIsIHZhbHVlc1snb2xkX3Bhc3MnXSwgdmFsdWVzWyduZXdfcGFzcyddKS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX3N1Y2Nlc3MobWVzc2FnZSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29yayAtIEFNSURvYy5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDIwIFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyogZXNsaW50LWRpc2FibGUgKi9cblxuY29uc3QgYW1pRG9jID0ge1wiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcIiRBTUlOYW1lc3BhY2VcIixcImRlc2NcIjpcIkNyZWF0ZSBhIG5ldyBuYW1lc3BhY2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCIkbmFtZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgbmFtZXNwYWNlIG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCIkZGVzY3JcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIG5hbWVzcGFjZSBib2R5XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCIkQU1JSW50ZXJmYWNlXCIsXCJkZXNjXCI6XCJDcmVhdGUgYSBuZXcgaW50ZXJmYWNlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiJG5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGludGVyZmFjZSBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiJGRlc2NyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBpbnRlcmZhY2UgYm9keVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwiJEFNSUNsYXNzXCIsXCJkZXNjXCI6XCJDcmVhdGUgYSBuZXcgY2xhc3NcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCIkbmFtZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgY2xhc3MgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIiRkZXNjclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgY2xhc3MgYm9keVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX1dLFwibmFtZXNwYWNlc1wiOlt7XCJuYW1lXCI6XCJhbWlSb3V0ZXJcIixcImRlc2NcIjpcIlRoZSBBTUkgdXJsIHJvdXRpbmcgc3Vic3lzdGVtXCIsXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwiZ2V0U2NyaXB0VVJMXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBBV0YncyBzY3JpcHQgVVJMXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgQVdGJ3Mgc2NyaXB0IFVSTFwifV19LHtcIm5hbWVcIjpcImdldE9yaWdpblVSTFwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgb3JpZ2luIFVSTFwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIG9yaWdpbiBVUkxcIn1dfSx7XCJuYW1lXCI6XCJnZXRXZWJBcHBVUkxcIixcImRlc2NcIjpcIkdldHMgdGhlIHdlYmFwcCBVUkxcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSB3ZWJhcHAgVVJMXCJ9XX0se1wibmFtZVwiOlwiZ2V0SGFzaFwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgYW5jaG9yIHBhcnQgb2YgdGhlIHdlYmFwcCBVUkxcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBhbmNob3IgcGFydCBvZiB0aGUgd2ViYXBwIFVSTFwifV19LHtcIm5hbWVcIjpcImdldEFyZ3NcIixcImRlc2NcIjpcIkdldHMgdGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkFycmF5LjxTdHJpbmc+XCIsXCJkZXNjXCI6XCJUaGUgYXJndW1lbnRzIGV4dHJhY3RlZCBmcm9tIHRoZSB3ZWJhcHAgVVJMXCJ9XX0se1wibmFtZVwiOlwiYXBwZW5kXCIsXCJkZXNjXCI6XCJBcHBlbmRzIGEgcm91dGluZyBydWxlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicmVnRXhwXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSByZWdFeHBcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJoYW5kbGVyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBoYW5kbGVyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJOYW1lc3BhY2VcIixcImRlc2NcIjpcIlRoZSBhbWlSb3V0ZXIgc2luZ2xldG9uXCJ9XX0se1wibmFtZVwiOlwicmVtb3ZlXCIsXCJkZXNjXCI6XCJSZW1vdmVzIHNvbWUgcm91dGluZyBydWxlc1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInJlZ0V4cFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcmVnRXhwXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJOYW1lc3BhY2VcIixcImRlc2NcIjpcIlRoZSBhbWlSb3V0ZXIgc2luZ2xldG9uXCJ9XX0se1wibmFtZVwiOlwiY2hlY2tcIixcImRlc2NcIjpcIkNoZWNrcyB3aGV0aGVyIHRoZSBVUkwgbWF0Y2hlcyB3aXRoIGEgcm91dGluZyBydWxlXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX0se1wibmFtZVwiOlwiYXBwZW5kSGlzdG9yeUVudHJ5XCIsXCJkZXNjXCI6XCJBcHBlbmQgYSBuZXcgaGlzdG9yeSBlbnRyeVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhdGhcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIG5ldyBwYXRoXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udGV4dFwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgbmV3IGNvbnRleHRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19LHtcIm5hbWVcIjpcInJlcGxhY2VIaXN0b3J5RW50cnlcIixcImRlc2NcIjpcIlJlcGxhY2UgdGhlIGN1cnJlbnQgaGlzdG9yeSBlbnRyeVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhdGhcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIG5ldyBwYXRoXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udGV4dFwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgbmV3IGNvbnRleHRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19XX0se1wibmFtZVwiOlwiYW1pV2ViQXBwXCIsXCJkZXNjXCI6XCJUaGUgQU1JIHdlYmFwcCBzdWJzeXN0ZW1cIixcInZhcmlhYmxlc1wiOlt7XCJuYW1lXCI6XCJvcmlnaW5VUkxcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIG9yaWdpbiBVUkxcIn0se1wibmFtZVwiOlwid2ViQXBwVVJMXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSB3ZWJhcHAgVVJMXCJ9LHtcIm5hbWVcIjpcImhhc2hcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGFuY2hvciBwYXJ0IG9mIHRoZSB3ZWJhcHAgVVJMXCJ9LHtcIm5hbWVcIjpcImFyZ3NcIixcInR5cGVcIjpcIkFycmF5LjxTdHJpbmc+XCIsXCJkZXNjXCI6XCJUaGUgYXJndW1lbnRzIGV4dHJhY3RlZCBmcm9tIHRoZSB3ZWJhcHAgVVJMXCJ9XSxcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJpc0VtYmVkZGVkXCIsXCJkZXNjXCI6XCJDaGVja3Mgd2hldGhlciB0aGUgV2ViQXBwIGlzIGV4ZWN1dGVkIGluIGVtYmVkZGVkIG1vZGVcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJpc0xvY2FsXCIsXCJkZXNjXCI6XCJDaGVja3Mgd2hldGhlciB0aGUgV2ViQXBwIGlzIGV4ZWN1dGVkIGxvY2FsbHkgKGZpbGU6Ly8sIGxvY2FsaG9zdCwgMTI3LjAuMC4xIG9yIDo6MSlcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJ0ZXh0VG9IdG1sXCIsXCJkZXNjXCI6XCJFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIEhUTUxcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVuZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwiaHRtbFRvVGV4dFwiLFwiZGVzY1wiOlwiVW5lc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBIVE1MIHRvIHRleHRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSB1bmVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwidGV4dFRvU3RyaW5nXCIsXCJkZXNjXCI6XCJFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIEphdmFTY3JpcHQgc3RyaW5nXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1bmVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBlc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcInN0cmluZ1RvVGV4dFwiLFwiZGVzY1wiOlwiVW5lc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBKYXZhU2NyaXB0IHN0cmluZyB0byB0ZXh0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgdW5lc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcImh0bWxUb1N0cmluZ1wiLFwiZGVzY1wiOlwiRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSFRNTCB0byBKYXZhU2NyaXB0IHN0cmluZ1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdW5lc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJzdHJpbmdUb0h0bWxcIixcImRlc2NcIjpcIlVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSmF2YVNjcmlwdCBzdHJpbmcgdG8gSFRNTFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHVuZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJ0ZXh0VG9TUUxcIixcImRlc2NcIjpcIkVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIHRleHQgdG8gU1FMXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1bmVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBlc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcInNxbFRvVGV4dFwiLFwiZGVzY1wiOlwiVW5lc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBTUUwgdG8gdGV4dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHVuZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJiYXNlNjRFbmNvZGVcIixcImRlc2NcIjpcIkVuY29kZXMgKFJGQyA0NjQ4KSBhIHN0cmluZ1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZGVjb2RlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGVuY29kZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwiYmFzZTY0RGVjb2RlXCIsXCJkZXNjXCI6XCJEZWNvZGVzIChSRkMgNDY0OCkgYSBzdHJpbmdcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVuY29kZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBkZWNvZGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcImxvYWRSZXNvdXJjZXNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIHJlc291cmNlcyBieSBleHRlbnNpb25cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRTaGVldHNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIENTUyBzaGVldHNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRTY3JpcHRzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBKUyBzY3JpcHRzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkSlNPTnNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIEpTT04gZmlsZXNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRYTUxzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBYTUwgZmlsZXNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRIVE1Mc1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgSFRNTCBmaWxlc1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFRXSUdzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBUV0lHIGZpbGVzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkVGV4dHNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIHRleHQgZmlsZXNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInJlcGxhY2VIVE1MXCIsXCJkZXNjXCI6XCJQdXRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIHN1ZmZpeCwgZGljdCwgdHdpZ3MpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJwcmVwZW5kSFRNTFwiLFwiZGVzY1wiOlwiUHJlcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgc3VmZml4LCBkaWN0LCB0d2lncylcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImFwcGVuZEhUTUxcIixcImRlc2NcIjpcIkFwcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgc3VmZml4LCBkaWN0LCB0d2lncylcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImZvcm1hdFRXSUdcIixcImRlc2NcIjpcIkludGVycHJldGVzIHRoZSBnaXZlbiBUV0lHIHN0cmluZywgc2VlIHtAbGluayBodHRwOi8vdHdpZy5zZW5zaW9sYWJzLm9yZy9kb2N1bWVudGF0aW9ufVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZGljdFwiLFwidHlwZVwiOltcIk9iamVjdFwiLFwiQXJyYXlcIl0sXCJkZXNjXCI6XCJ0aGUgZGljdGlvbmFyeVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2YgZnJhZ21lbnRzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBJbnRlcnByZXRlZCBUV0lHIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcImpzcGF0aFwiLFwiZGVzY1wiOlwiRmluZHMgZGF0YSB3aXRoaW4gdGhlIGdpdmVuIEpTT04sIHNlZSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2RmaWxhdG92L2pzcGF0aH1cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXRoXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBwYXRoXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwianNvblwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgSlNPTlwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQXJyYXlcIixcImRlc2NcIjpcIlRoZSByZXN1bHRpbmcgYXJyYXlcIn1dfSx7XCJuYW1lXCI6XCJsb2NrXCIsXCJkZXNjXCI6XCJMb2NrcyB0aGUgV2ViIGFwcGxpY2F0aW9uXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwidW5sb2NrXCIsXCJkZXNjXCI6XCJVbmxvY2tzIHRoZSBXZWIgYXBwbGljYXRpb25cIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJtb2RhbExvY2tcIixcImRlc2NcIjpcIkxvY2tzIHRoZSBtb2RhbCB3aW5kb3dcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJtb2RhbFVubG9ja1wiLFwiZGVzY1wiOlwiVW5sb2NrcyB0aGUgbW9kYWwgd2luZG93XCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiY2FuTGVhdmVcIixcImRlc2NcIjpcIkVuYWJsZXMgdGhlIG1lc3NhZ2UgaW4gYSBjb25maXJtYXRpb24gZGlhbG9nIGJveCB0byBpbmZvcm0gdGhhdCB0aGUgdXNlciBpcyBhYm91dCB0byBsZWF2ZSB0aGUgY3VycmVudCBwYWdlLlwiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImNhbm5vdExlYXZlXCIsXCJkZXNjXCI6XCJEaXNhYmxlcyB0aGUgbWVzc2FnZSBpbiBhIGNvbmZpcm1hdGlvbiBkaWFsb2cgYm94IHRvIGluZm9ybSB0aGF0IHRoZSB1c2VyIGlzIGFib3V0IHRvIGxlYXZlIHRoZSBjdXJyZW50IHBhZ2UuXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiaW5mb1wiLFwiZGVzY1wiOlwiU2hvd3MgYW4gJ2luZm8nIG1lc3NhZ2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJtZXNzYWdlXCIsXCJ0eXBlXCI6W1wiU3RyaW5nXCIsXCJBcnJheVwiXSxcImRlc2NcIjpcInRoZSBtZXNzYWdlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmFkZU91dFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcInN1Y2Nlc3NcIixcImRlc2NcIjpcIlNob3dzIGEgJ3N1Y2Nlc3MnIG1lc3NhZ2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJtZXNzYWdlXCIsXCJ0eXBlXCI6W1wiU3RyaW5nXCIsXCJBcnJheVwiXSxcImRlc2NcIjpcInRoZSBtZXNzYWdlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmFkZU91dFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIndhcm5pbmdcIixcImRlc2NcIjpcIlNob3dzIGEgJ3dhcm5pbmcnIG1lc3NhZ2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJtZXNzYWdlXCIsXCJ0eXBlXCI6W1wiU3RyaW5nXCIsXCJBcnJheVwiXSxcImRlc2NcIjpcInRoZSBtZXNzYWdlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmFkZU91dFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcImVycm9yXCIsXCJkZXNjXCI6XCJTaG93cyBhbiAnZXJyb3InIG1lc3NhZ2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJtZXNzYWdlXCIsXCJ0eXBlXCI6W1wiU3RyaW5nXCIsXCJBcnJheVwiXSxcImRlc2NcIjpcInRoZSBtZXNzYWdlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmFkZU91dFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcImZsdXNoXCIsXCJkZXNjXCI6XCJGbHVzaGVzIG1lc3NhZ2VzXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiZmlsbEJyZWFkY3J1bWJcIixcImRlc2NcIjpcIkZpbGwgdGhlIG1haW4gYnJlYWRjcnVtYlwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIml0ZW1zXCIsXCJ0eXBlXCI6XCJBcnJheVwiLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIGl0ZW1zIChIVE1MIGZvcm1hdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcInN0YXJ0XCIsXCJkZXNjXCI6XCJTdGFydHMgdGhlIFdlYiBhcHBsaWNhdGlvblwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGxvZ29fdXJsLCBob21lX3VybCwgY29udGFjdF9lbWFpbCwgYWJvdXRfdXJsLCB0aGVtZV91cmwsIGxvY2tlcl91cmwsIHBhc3N3b3JkX2F1dGhlbnRpY2F0aW9uX2FsbG93ZWQsIGNlcnRpZmljYXRlX2F1dGhlbnRpY2F0aW9uX2FsbG93ZWQsIGNyZWF0ZV9hY2NvdW50X2FsbG93ZWQsIGNoYW5nZV9pbmZvX2FsbG93ZWQsIGNoYW5nZV9wYXNzd29yZF9hbGxvd2VkLCBjaGFuZ2VfY2VydGlmaWNhdGVfYWxsb3dlZClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcImxvYWRDb250cm9sXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBhIGNvbnRyb2xcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJjb250cm9sXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBhcnJheSBvZiBjb250cm9sIG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiY3JlYXRlQ29udHJvbFwiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhcmVudFwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJvd25lclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250cm9sXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhcmFtc1wiLFwidHlwZVwiOlwiQXJyYXlcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjcmVhdGVDb250cm9sSW5Cb2R5XCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sIGluIHRoZSBib2R5XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGFyZW50XCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIm93bmVyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRyb2xcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFyYW1zV2l0aG91dFNldHRpbmdzXCIsXCJ0eXBlXCI6XCJBcnJheVwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udHJvbFNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhcmVudFNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjcmVhdGVDb250cm9sSW5Db250YWluZXJcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gYSBjb250YWluZXJcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXJlbnRcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwib3duZXJcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udHJvbFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXJhbXNXaXRob3V0U2V0dGluZ3NcIixcInR5cGVcIjpcIkFycmF5XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250cm9sU2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFyZW50U2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiaWNvblwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0aXRsZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiY3JlYXRlQ29udHJvbEZyb21XZWJMaW5rXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sIGluIGEgY29udGFpbmVyIGZyb20gYSBXRUIgbGlua1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhcmVudFwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJvd25lclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJlbFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXJlbnRTZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFN1YkFwcFwiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgYSBzdWJhcHBcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdWJhcHBcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHN1YmFwcFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ0aGUgdXNlciBkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRTdWJBcHBCeVVSTFwiLFwiZGVzY1wiOlwiTG9hZHMgYSBzdWJhcHAgYnkgVVJMXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiZGVmYXVsdFN1YkFwcFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJpZiAnYW1pV2ViQXBwLmFyZ3NbXFxcInN1YmFwcFxcXCJdJyBpcyBudWxsLCB0aGUgZGVmYXVsdCBzdWJhcHBcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJkZWZhdWx0VXNlckRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcImlmICdhbWlXZWJBcHAuYXJnc1tcXFwidXNlcmRhdGFcXFwiXScgaXMgbnVsbCwgdGhlIGRlZmF1bHQgdXNlciBkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfV0sXCJldmVudHNcIjpbe1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiVGhpcyBtZXRob2QgbXVzdCBiZSBvdmVybG9hZGVkIGFuZCBpcyBjYWxsZWQgd2hlbiB0aGUgV2ViIGFwcGxpY2F0aW9uIHN0YXJ0c1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJEYXRhXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwib25SZWZyZXNoXCIsXCJkZXNjXCI6XCJUaGlzIG1ldGhvZCBtdXN0IGJlIG92ZXJsb2FkZWQgYW5kIGlzIGNhbGxlZCB3aGVuIHRoZSB0b29sYmFyIG5lZWRzIHRvIGJlIHVwZGF0ZWRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJpc0F1dGhcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX1dfSx7XCJuYW1lXCI6XCJhbWlDb21tYW5kXCIsXCJkZXNjXCI6XCJUaGUgQU1JIGNvbW1hbmQgc3Vic3lzdGVtXCIsXCJ2YXJpYWJsZXNcIjpbe1wibmFtZVwiOlwiZW5kcG9pbnRcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiRGVmYXVsdCBlbmRwb2ludFwifSx7XCJuYW1lXCI6XCJjb252ZXJ0ZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiRGVmYXVsdCBjb252ZXJ0ZXJcIn1dLFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcImV4ZWN1dGVcIixcImRlc2NcIjpcIkV4ZWN1dGVzIGFuIEFNSSBjb21tYW5kXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiY29tbWFuZFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgY29tbWFuZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGVuZHBvaW50LCBjb252ZXJ0ZXIsIHRpbWVvdXQsIGV4dHJhUGFyYW0sIGV4dHJhVmFsdWUpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJwYXNzTG9naW5cIixcImRlc2NcIjpcIkxvZ3MgaW4gYnkgbG9naW4vcGFzc3dvcmRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1c2VyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFzc1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcGFzc3dvcmRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiY2VydExvZ2luXCIsXCJkZXNjXCI6XCJMb2dzIGluIGJ5IGNlcnRpZmljYXRlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvZ291dFwiLFwiZGVzY1wiOlwiTG9ncyBvdXRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiYXR0YWNoQ2VydFwiLFwiZGVzY1wiOlwiQXR0YWNoZXMgYSBjZXJ0aWZpY2F0ZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVzZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXNzXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBwYXNzd29yZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJkZXRhY2hDZXJ0XCIsXCJkZXNjXCI6XCJEZXRhY2hlcyBhIGNlcnRpZmljYXRlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhc3NcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImFkZFVzZXJcIixcImRlc2NcIjpcIkFkZHMgYSBuZXcgdXNlclwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVzZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXNzXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBwYXNzd29yZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImZpcnN0TmFtZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZmlyc3QgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImxhc3ROYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBsYXN0IG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJlbWFpbFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZW1haWxcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJhdHRhY2hcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcImF0dGFjaCB0aGUgY3VycmVudCBjZXJ0aWZpY2F0ZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImFncmVlXCIsXCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJhZ3JlZSB3aXRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9uc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjaGFuZ2VJbmZvXCIsXCJkZXNjXCI6XCJDaGFuZ2VzIHRoZSBhY2NvdW50IGluZm9ybWF0aW9uXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiZmlyc3ROYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBmaXJzdCBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwibGFzdE5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGxhc3QgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImVtYWlsXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlbWFpbFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjaGFuZ2VQYXNzXCIsXCJkZXNjXCI6XCJDaGFuZ2VzIHRoZSBhY2NvdW50IHBhc3N3b3JkXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIm9sZFBhc3NcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIG9sZCBwYXNzd29yZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIm5ld1Bhc3NcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIG5ldyBwYXNzd29yZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJyZXNldFBhc3NcIixcImRlc2NcIjpcIlJlc2V0cyB0aGUgYWNjb3VudCBwYXNzd29yZFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVzZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX1dfSx7XCJuYW1lXCI6XCJhbWlMb2dpblwiLFwiZGVzY1wiOlwiVGhlIEFNSSBhdXRoZW50aWNhdGlvbiBzdWJzeXN0ZW1cIixcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJnZXRVc2VySW5mb1wiLFwiZGVzY1wiOlwiR2V0cyB0aGUgdXNlciBpbmZvcm1hdGlvblwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGN1cnJlbnQgdXNlciBpbmZvcm1hdGlvblwifV19LHtcIm5hbWVcIjpcImdldFJvbGVJbmZvXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSByb2xlIGluZm9ybWF0aW9uXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgY3VycmVudCByb2xlIGluZm9ybWF0aW9uXCJ9XX0se1wibmFtZVwiOlwiZ2V0VVBESW5mb1wiLFwiZGVzY1wiOlwiR2V0cyB0aGUgdXNlciBkYXRhIHByb3RlY3Rpb24gaW5mb3JtYXRpb25cIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBjdXJyZW50IHVzZXIgZGF0YSBwcm90ZWN0aW9uIGluZm9ybWF0aW9uXCJ9XX0se1wibmFtZVwiOlwiZ2V0U1NPSW5mb1wiLFwiZGVzY1wiOlwiR2V0cyB0aGUgc2luZ2xlIHNpZ24gb24gaW5mb3JtYXRpb25cIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBjdXJyZW50IHNpbmdsZSBzaWduIG9uIGluZm9ybWF0aW9uXCJ9XX0se1wibmFtZVwiOlwiZ2V0VXNlclwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgY3VycmVudCB1c2VyXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgY3VycmVudCB1c2VyXCJ9XX0se1wibmFtZVwiOlwiZ2V0R3Vlc3RcIixcImRlc2NcIjpcIkdldHMgdGhlIGd1ZXN0IHVzZXJcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBndWVzdCB1c2VyXCJ9XX0se1wibmFtZVwiOlwiZ2V0Q2xpZW50RE5cIixcImRlc2NcIjpcIkdldHMgdGhlIGNsaWVudCBETlwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGNsaWVudCBETlwifV19LHtcIm5hbWVcIjpcImdldElzc3VlckROXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBpc3N1ZXIgRE5cIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBpc3N1ZXIgRE5cIn1dfSx7XCJuYW1lXCI6XCJpc0F1dGhlbnRpY2F0ZWRcIixcImRlc2NcIjpcIkNoZWNrcyB3aGV0aGVyIHRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWRcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJoYXNSb2xlXCIsXCJkZXNjXCI6XCJDaGVja3Mgd2hldGhlciB0aGUgdXNlciBoYXMgdGhlIGdpdmVuIHJvbGVcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJyb2xlXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSByb2xlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJzc29cIixcImRlc2NcIjpcIk9wZW5zIHRoZSAnU1NPJyBtb2RhbCB3aW5kb3dcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJzaWduSW5cIixcImRlc2NcIjpcIk9wZW5zIHRoZSAnU2lnbkluJyBtb2RhbCB3aW5kb3dcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJjaGFuZ2VJbmZvXCIsXCJkZXNjXCI6XCJPcGVucyB0aGUgJ0NoYW5nZSBJbmZvJyBtb2RhbCB3aW5kb3dcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJjaGFuZ2VQYXNzXCIsXCJkZXNjXCI6XCJPcGVucyB0aGUgJ0NoYW5nZSBQYXNzd29yZCcgbW9kYWwgd2luZG93XCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiYWNjb3VudFN0YXR1c1wiLFwiZGVzY1wiOlwiT3BlbnMgdGhlICdBY2NvdW50IFN0YXR1cycgbW9kYWwgd2luZG93XCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwic2lnbk91dFwiLFwiZGVzY1wiOlwiU2lnbnMgb3V0XCIsXCJwYXJhbXNcIjpbXX1dfV0sXCJpbnRlcmZhY2VzXCI6W3tcIm5hbWVcIjpcImFtaS5JQ29udHJvbFwiLFwiZGVzY1wiOlwiVGhlIEFNSSBjb250cm9sIGludGVyZmFjZVwiLFwiaW1wbGVtZW50c1wiOltdLFwiaW5oZXJpdHNcIjpbXSxcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJwYXRjaElkXCIsXCJkZXNjXCI6XCJQYXRjaGVzIGFuIEhUTUwgaWRlbnRpZmllclwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcImlkXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1bnBhdGNoZWQgSFRNTCBpZGVudGlmaWVyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBwYXRjaGVkIEhUTUwgaWRlbnRpZmllclwifV19LHtcIm5hbWVcIjpcInJlcGxhY2VIVE1MXCIsXCJkZXNjXCI6XCJQdXRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJwcmVwZW5kSFRNTFwiLFwiZGVzY1wiOlwiUHJlcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImFwcGVuZEhUTUxcIixcImRlc2NcIjpcIkFwcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcIm9uUmVhZHlcIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIHRoZSBjb250cm9sIGlzIHJlYWR5IHRvIHJ1blwiLFwicGFyYW1zXCI6W119XX0se1wibmFtZVwiOlwiYW1pLklTdWJBcHBcIixcImRlc2NcIjpcIlRoZSBBTUkgc3ViLWFwcGxpY2F0aW9uIGludGVyZmFjZVwiLFwiaW1wbGVtZW50c1wiOltdLFwiaW5oZXJpdHNcIjpbXSxcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJvblJlYWR5XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIHJlYWR5IHRvIHJ1blwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ1c2VyZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwib25FeGl0XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIGFib3V0IHRvIGV4aXRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uTG9naW5cIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIGxvZ2dpbmcgaW5cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uTG9nb3V0XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiBsb2dnaW5nIG91dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ1c2VyZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX1dfV0sXCJjbGFzc2VzXCI6W3tcIm5hbWVcIjpcImFtaS5Db250cm9sXCIsXCJkZXNjXCI6XCJUaGUgYmFzaWMgQU1JIGNvbnRyb2xcIixcImltcGxlbWVudHNcIjpbXCJhbWkuSUNvbnRyb2xcIl0sXCJpbmhlcml0c1wiOltdLFwia29uc3RydWN0b3JcIjp7XCJuYW1lXCI6XCJDb250cm9sXCIsXCJwYXJhbXNcIjpbXX0sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwicGF0Y2hJZFwiLFwiZGVzY1wiOlwiUGF0Y2hlcyBhbiBIVE1MIGlkZW50aWZpZXJcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJpZFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdW5wYXRjaGVkIEhUTUwgaWRlbnRpZmllclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgcGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcIn1dfSx7XCJuYW1lXCI6XCJyZXBsYWNlSFRNTFwiLFwiZGVzY1wiOlwiUHV0cyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwicHJlcGVuZEhUTUxcIixcImRlc2NcIjpcIlByZXBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJhcHBlbmRIVE1MXCIsXCJkZXNjXCI6XCJBcHBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJvblJlYWR5XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiB0aGUgY29udHJvbCBpcyByZWFkeSB0byBydW5cIixcInBhcmFtc1wiOltdfV19LHtcIm5hbWVcIjpcImFtaS5TdWJBcHBcIixcImRlc2NcIjpcIlRoZSBiYXNpYyBBTUkgc3ViLWFwcGxpY2F0aW9uXCIsXCJpbXBsZW1lbnRzXCI6W1wiYW1pLklTdWJBcHBcIl0sXCJpbmhlcml0c1wiOltdLFwia29uc3RydWN0b3JcIjp7XCJuYW1lXCI6XCJTdWJBcHBcIixcInBhcmFtc1wiOltdfSxcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJvblJlYWR5XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIHJlYWR5IHRvIHJ1blwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ1c2VyZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwib25FeGl0XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIGFib3V0IHRvIGV4aXRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uTG9naW5cIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIGxvZ2dpbmcgaW5cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uTG9nb3V0XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiBsb2dnaW5nIG91dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ1c2VyZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX1dfV19O1xuXG4vKiBlc2xpbnQtZW5hYmxlICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
