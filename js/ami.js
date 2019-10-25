'use strict';
/*!
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

var amiTwig = {
  version: '1.0.0'
};

if (typeof exports !== 'undefined') {
  amiTwig.fs = require('fs');
  module.exports.amiTwig = amiTwig;
}
/*
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */


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
/*
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

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
  COLON: 127,
  DOT: 128,
  COMMA: 129,
  PIPE: 130,
  LP: 131,
  RP: 132,
  LB1: 133,
  RB1: 134,
  LB2: 135,
  RB2: 136,
  SID: 137,
  TERMINAL: 138,
  LST: 200,
  DIC: 201,
  FUN: 202,
  VAR: 203
};
amiTwig.expr.tokens.$init();

amiTwig.expr.Tokenizer = function (code, line) {
  this._spaces = [' ', '\t', '\n', '\r'];
  this._tokenDefs = ['or', 'and', 'b-or', 'b-xor', 'b-and', 'not', 'is', 'defined', 'null', 'empty', 'iterable', 'even', 'odd', '===', '==', '!==', '!=', '<=', '>=', '<', '>', /^starts\s+with/, /^ends\s+with/, 'matches', 'in', '..', '~', '+', '-', '**', '*', '//', '/', '%', ':', '.', ',', '|', '(', ')', '[', ']', '{', '}', 'true', 'false', /^[0-9]+\.[0-9]+/, /^[0-9]+/, /^'(\\'|[^'])*'/, /^"(\\"|[^"])*"/, /^[a-zA-Z_$][a-zA-Z0-9_$]*/];
  this._tokenTypes = [amiTwig.expr.tokens.LOGICAL_OR, amiTwig.expr.tokens.LOGICAL_AND, amiTwig.expr.tokens.BITWISE_OR, amiTwig.expr.tokens.BITWISE_XOR, amiTwig.expr.tokens.BITWISE_AND, amiTwig.expr.tokens.NOT, amiTwig.expr.tokens.IS, amiTwig.expr.tokens.DEFINED, amiTwig.expr.tokens.NULL, amiTwig.expr.tokens.EMPTY, amiTwig.expr.tokens.ITERABLE, amiTwig.expr.tokens.EVEN, amiTwig.expr.tokens.ODD, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.STARTS_WITH, amiTwig.expr.tokens.ENDS_WITH, amiTwig.expr.tokens.MATCHES, amiTwig.expr.tokens.IN, amiTwig.expr.tokens.RANGE, amiTwig.expr.tokens.CONCAT, amiTwig.expr.tokens.PLUS, amiTwig.expr.tokens.MINUS, amiTwig.expr.tokens.POWER, amiTwig.expr.tokens.MUL, amiTwig.expr.tokens.FLDIV, amiTwig.expr.tokens.DIV, amiTwig.expr.tokens.MOD, amiTwig.expr.tokens.COLON, amiTwig.expr.tokens.DOT, amiTwig.expr.tokens.COMMA, amiTwig.expr.tokens.PIPE, amiTwig.expr.tokens.LP, amiTwig.expr.tokens.RP, amiTwig.expr.tokens.LB1, amiTwig.expr.tokens.RB1, amiTwig.expr.tokens.LB2, amiTwig.expr.tokens.RB2, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.SID];

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
    this.rootNode = this.parseFilter();

    if (this.tokenizer.isEmpty() === false) {
      throw 'syntax error, line `' + this.line + '`, unexpected token `' + this.tokenizer.peekToken() + '`';
    }
  },
  dump: function dump() {
    return this.rootNode.dump();
  },
  parseFilter: function parseFilter() {
    var left = this.parseLogicalOr(),
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
    var left = this.parseDot1(),
        right,
        node;

    while (this.tokenizer.checkType(amiTwig.expr.tokens.POWER)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parseDot1();
      node.nodeLeft = left;
      node.nodeRight = right;
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
      right = this.parseFilter();

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
      node = this.parseFilter();

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
    result.push(this.parseFilter());
  },
  _parseDoublet: function _parseDoublet(result) {
    if (this.tokenizer.checkType(amiTwig.expr.tokens.TERMINAL)) {
      var key = this.tokenizer.peekToken();
      this.tokenizer.next();

      if (this.tokenizer.checkType(amiTwig.expr.tokens.COLON)) {
        this.tokenizer.next();
        result[key] = this.parseFilter();
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
/*
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

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
          if (curr['keyword'] !== 'if') {
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
/*
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

amiTwig.engine = {
  VARIABLE_RE: /\{\{\s*(.*?)\s*\}\}/g,
  _render: function _render(result, item, dict) {
    var _this = this;

    if (dict === void 0) {
      dict = {};
    }

    var m;
    var expression;
    this.dict = dict;

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
                _this._render(result, item, dict);
              });
              return false;
            }

            return true;
          });
          break;
        }

      case 'for':
        {
          m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/);

          if (!m) {
            throw 'syntax error, line `' + item.line + '`, invalid `for` statement';
          }

          var symb = m[1];
          var expr = m[2];
          var value = amiTwig.expr.cache.eval(expr, item.line, dict);
          var typeName = Object.prototype.toString.call(value);

          if (typeName === '[object Object]') {
            value = Object.keys(value);
          } else {
            if (typeName !== '[object Array]' && typeName !== '[object String]') {
              throw 'syntax error, line `' + item.line + '`, right operande not iterable';
            }
          }

          var old1 = dict[symb];
          var old2 = dict['loop'];
          var k = 0x0000000000;
          var l = value.length;
          dict.loop = {
            length: l
          };
          var list = item.blocks[0].list;

          for (var i in value) {
            dict[symb] = value[i];
            dict.loop.first = k === 0 - 0;
            dict.loop.last = k === l - 1;
            dict.loop.index0 = k;
            k++;
            dict.loop.index = k;

            for (var j in list) {
              this._render(result, list[j], dict);
            }
          }

          dict['loop'] = old2;
          dict[symb] = old1;
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
  render: function render(tmpl, dict) {
    if (dict === void 0) {
      dict = {};
    }

    var result = [];

    switch (Object.prototype.toString.call(tmpl)) {
      case '[object String]':
        this._render(result, new amiTwig.tmpl.Compiler(tmpl).rootNode, dict);

        break;

      case '[object Object]':
        this._render(result, tmpl, dict);

        break;
    }

    return result.join('');
  }
};
/*
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

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
/*
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

amiTwig.ajax = {
  dict: {},
  get: function get(url, done, fail) {
    var txt;

    if (url in this.dict) {
      if (done) {
        done(this.dict[url]);
      }

      return;
    }

    if (amiTwig.fs) {
      try {
        txt = this.dict[url] = amiTwig.fs.readFileSync(url, 'utf8');

        if (done) {
          done(txt);
        }
      } catch (err) {
        if (fail) {
          fail(err);
        }
      }
    } else {
      var xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open('GET', url, false);
      xmlHttpRequest.send();

      if (xmlHttpRequest.status === 200) {
        txt = this.dict[url] = xmlHttpRequest.responseText;

        if (done) {
          done(txt);
        }
      } else {
        txt = xmlHttpRequest.responseText;

        if (fail) {
          fail(txt);
        }
      }
    }
  }
};
/*
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

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

          for (var _j in _item2) {
            D[_j] = _item2[_j];
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

    var result = '';
    amiTwig.ajax.get(fileName, function (data) {
      result = amiTwig.engine.render(data, temp);
    }, function () {
      if (!ignoreMissing) {
        throw 'runtime error, could not open `' + fileName + '`';
      }
    });
    return result;
  }
};
amiTwig.stdlib.filter_e = amiTwig.stdlib.filter_escape;
/*
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

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

    var _this$setup2 = this.setup(['context', 'suffix', 'dict'], [result, null, null], settings),
        context = _this$setup2[0],
        suffix = _this$setup2[1],
        dict = _this$setup2[2];

    if (suffix) {
      twig = twig.replace(this._idRegExp, function (id) {
        return id + '_instance' + suffix;
      });
    }

    var html = this.formatTWIG(twig, dict);
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
  formatTWIG: function formatTWIG(twig, dict) {
    var _this5 = this;

    var result = [];

    var render = function render(twig, dict) {
      if (_this5.typeOf(dict) !== 'Object') {
        dict = {};
      }

      dict['ORIGIN_URL'] = _this5.originURL;
      dict['WEBAPP_URL'] = _this5.webAppURL;
      return amiTwig.engine.render(twig, dict);
    };

    try {
      if (this.typeOf(dict) === 'Array') {
        dict.forEach(function (DICT) {
          result.push(render(twig, DICT));
        });
      } else {
        result.push(render(twig, dict));
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
      var _this8$setup = _this8.setup(['logo_url', 'home_url', 'contact_email', 'about_url', 'theme_url', 'locker_url', 'endpoint_url', 'create_account_allowed', 'change_info_allowed', 'change_passord_allowed'], [_this8.originURL + '/images/logo.png', _this8.webAppURL, 'ami@lpsc.in2p3.fr', 'http://cern.ch/ami/', _this8.originURL + '/twig/AMI/Theme/blue.twig', _this8.originURL + '/twig/AMI/Fragment/locker.twig', _this8.originURL + '/AMI/FrontEnd', true, true, true], settings),
          logoURL = _this8$setup[0],
          homeURL = _this8$setup[1],
          contactEmail = _this8$setup[2],
          aboutURL = _this8$setup[3],
          themeURL = _this8$setup[4],
          lockerURL = _this8$setup[5],
          endpointURL = _this8$setup[6],
          createAccountAllowed = _this8$setup[7],
          changeInfoAllowed = _this8$setup[8],
          changePassordAllowed = _this8$setup[9];

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

                  amiLogin._start(createAccountAllowed, changeInfoAllowed, changePassordAllowed).done(function () {
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

                amiLogin._start(createAccountAllowed, changeInfoAllowed, changePassordAllowed).done(function () {
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
  createAccountAllowed: true,
  changeInfoAllowed: true,
  changePassordAllowed: true,
  user: 'guest',
  guest: 'guest',
  clientDN: '',
  issuerDN: '',
  notBefore: '',
  notAfter: '',
  roleInfo: {},
  udpInfo: {},
  ssoInfo: {},
  _start: function _start(createAccountAllowed, changeInfoAllowed, changePassordAllowed) {
    var _this15 = this;

    var result = $.Deferred();
    amiWebApp.loadTWIGs([amiWebApp.originURL + '/twig/AMI/Fragment/login_button.twig', amiWebApp.originURL + '/twig/AMI/Fragment/logout_button.twig', amiWebApp.originURL + '/twig/AMI/Modal/login.twig']).done(function (data) {
      _this15.fragmentLoginButton = data[0];
      _this15.fragmentLogoutButton = data[1];
      var dict = {
        createAccountAllowed: _this15.createAccountAllowed = createAccountAllowed,
        changeInfoAllowed: _this15.changeInfoAllowed = changeInfoAllowed,
        changePassordAllowed: _this15.changePassordAllowed = changePassordAllowed
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
    this.roleInfo = roleInfo;
    this.udpInfo = udpInfo;
    this.ssoInfo = ssoInfo;
    var dict = {
      createAccountAllowed: this.createAccountAllowed,
      changeInfoAllowed: this.changeInfoAllowed,
      changePassordAllowed: this.changePassordAllowed,
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
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
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
        "desc": "dictionary of settings (logo_url, home_url, contact_email, about_url, theme_url, locker_url, change_passord_allowed, change_info_allowed, change_passord_allowed)",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFNSS9leHRlcm5hbC9hbWktdHdpZy5lczYuanMiLCJBTUkvZXh0ZXJuYWwvanNwYXRoLmpzIiwiQU1JL0FNSUV4dGVuc2lvbi5qcyIsIkFNSS9BTUlPYmplY3QuanMiLCJBTUkvQU1JUm91dGVyLmpzIiwiQU1JL0FNSVdlYkFwcC5qcyIsIkFNSS9BTUlJbnRlcmZhY2UuanMiLCJBTUkvQU1JQ29tbWFuZC5qcyIsIkFNSS9BTUlMb2dpbi5qcyIsIkFNSS9BTUlEb2MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7OztBQWVBLElBQUksT0FBTyxHQUFHO0FBQ2IsRUFBQSxPQUFPLEVBQUU7QUFESSxDQUFkOztBQVFBLElBQUcsT0FBTyxPQUFQLEtBQW1CLFdBQXRCLEVBQ0E7QUFDQyxFQUFBLE9BQU8sQ0FBQyxFQUFSLEdBQWEsT0FBTyxDQUFBLElBQUEsQ0FBcEI7QUFFQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLENBQWUsT0FBZixHQUF5QixPQUF6QjtBQUNBO0FBSUQ7Ozs7Ozs7Ozs7OztBQWVBLE9BQU8sQ0FBQyxTQUFSLEdBQW9CO0FBR25CLEVBQUEsUUFBUSxFQUFFLGtCQUFTLElBQVQsRUFBZSxJQUFmLEVBQXFCLE1BQXJCLEVBQTZCLFNBQTdCLEVBQXdDLFVBQXhDLEVBQW9ELEtBQXBELEVBQ1Y7QUFDQyxRQUFHLFNBQVMsQ0FBQyxNQUFWLEtBQXFCLFVBQVUsQ0FBQyxNQUFuQyxFQUNBO0FBQ0MsWUFBTSx5Q0FBTjtBQUNBOztBQUVELFFBQU0sYUFBYSxHQUFHLEVBQXRCO0FBQ0EsUUFBTSxZQUFZLEdBQUcsRUFBckI7QUFDQSxRQUFNLFlBQVksR0FBRyxFQUFyQjtBQUVBLFFBQUksQ0FBQyxHQUFHLFdBQVI7QUFDQSxRQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBZjtBQUVBLFFBQUksSUFBSSxHQUFHLEVBQVg7QUFBQSxRQUFlLEtBQWY7QUFBQSxRQUFzQixDQUF0Qjs7QUFFRixJQUFBLElBQUksRUFBRyxPQUFNLENB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QTJELG9CQUFjLEVBQXpFO0FBQXlFLG9CQUFjO0FBQXZGLE9BQUE7QUFBckYsS0FBQSxFQUE0SztBQUFBLGNBQWMsUUFBZDtBQUF1QixjQUFPLGtEQUE5QjtBQUFpRixnQkFBUyxDQUFBO0FBQUEsZ0JBQVMsVUFBVDtBQUFvQixnQkFBTyxHQUEzQjtBQUEyQixnQkFBVyxVQUF0QztBQUFpRCxtQkFBVSxFQUEzRDtBQUEyRCxvQkFBYyxFQUF6RTtBQUF5RSxvQkFBYztBQUF2RixPQUFBO0FBQTFGLEtBQTVLLEVBQTZWO0FBQUEsY0FBYyxTQUFkO0FBQXdCLGNBQU8sd0JBQS9CO0FBQXdELGdCQUFTLENBQUE7QUFBQSxnQkFBUyxVQUFUO0FBQW9CLGdCQUFPLEdBQTNCO0FBQTJCLGdCQUFXLFVBQXRDO0FBQWlELG1CQUFVLEVBQTNEO0FBQTJELG9CQUFjLEVBQXpFO0FBQXlFLG9CQUFjO0FBQXZGLE9BQUE7QUFBakUsS0FBN1YsRUFBcWY7QUFBQSxjQUFjLFVBQWQ7QUFBeUIsY0FBTyx5QkFBaEM7QUFBMEQsZ0JBQVMsQ0FBQTtBQUFBLGdCQUFTLFVBQVQ7QUFBb0IsZ0JBQU8sR0FBM0I7QUFBMkIsZ0JBQVcsVUFBdEM7QUFBaUQsbUJBQVUsRUFBM0Q7QUFBMkQsb0JBQWMsRUFBekU7QUFBeUUsb0JBQWM7QUFBdkYsT0FBQTtBQUFuRSxLQUFyZjtBQUFySyxHQUFubEU7QUFBeisxQixDQUFiIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgVHdpZyBFbmdpbmVcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxOSBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG52YXIgYW1pVHdpZyA9IHtcblx0dmVyc2lvbjogJzEuMC4wJ1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGV4cG9ydHMuYW1pVHdpZyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pZih0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpXG57XG5cdGFtaVR3aWcuZnMgPSByZXF1aXJlKCdmcycpO1xuXG5cdG1vZHVsZS5leHBvcnRzLmFtaVR3aWcgPSBhbWlUd2lnO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRva2VuaXplciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50b2tlbml6ZXIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0b2tlbml6ZTogZnVuY3Rpb24oY29kZSwgbGluZSwgc3BhY2VzLCB0b2tlbkRlZnMsIHRva2VuVHlwZXMsIGVycm9yKVxuXHR7XG5cdFx0aWYodG9rZW5EZWZzLmxlbmd0aCAhPT0gdG9rZW5UeXBlcy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2B0b2tlbkRlZnMubGVuZ3RoICE9IHRva2VuVHlwZXMubGVuZ3RoYCc7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVzdWx0X3Rva2VucyA9IFtdO1xuXHRcdGNvbnN0IHJlc3VsdF90eXBlcyA9IFtdO1xuXHRcdGNvbnN0IHJlc3VsdF9saW5lcyA9IFtdO1xuXG5cdFx0bGV0IGkgPSAweDAwMDAwMDAwMDtcblx0XHRjb25zdCBsID0gY29kZS5sZW5ndGg7XG5cblx0XHRsZXQgd29yZCA9ICcnLCB0b2tlbiwgYztcblxuX19sMDpcdFx0d2hpbGUoaSA8IGwpXG5cdFx0e1xuXHRcdFx0YyA9IGNvZGUuY2hhckF0KDApO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQ09VTlQgTElORVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKGMgPT09ICdcXG4nKVxuXHRcdFx0e1xuXHRcdFx0XHRsaW5lKys7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFQVQgU1BBQ0VTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYoc3BhY2VzLmluZGV4T2YoYykgPj0gMClcblx0XHRcdHtcblx0XHRcdFx0aWYod29yZClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdpbnZhbGlkIHRva2VuIGAnICsgd29yZCArICdgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2goLTEpO1xuXHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdHdvcmQgPSAnJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZygxKTtcblx0XHRcdFx0aSArPSAxO1xuXG5cdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFQVQgUkVHRVhFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Zm9yKGNvbnN0IGogaW4gdG9rZW5EZWZzKVxuXHRcdFx0e1xuXHRcdFx0XHR0b2tlbiA9IHRoaXMuX21hdGNoKGNvZGUsIHRva2VuRGVmc1tqXSk7XG5cblx0XHRcdFx0aWYodG9rZW4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZih3b3JkKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh3b3JkKTtcblx0XHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdFx0d29yZCA9ICcnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh0b2tlbik7XG5cdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2godG9rZW5UeXBlc1tqXSk7XG5cdFx0XHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG5cblx0XHRcdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcodG9rZW4ubGVuZ3RoKTtcblx0XHRcdFx0XHRpICs9IHRva2VuLmxlbmd0aDtcblxuXHRcdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVBVCBSRU1BSU5JTkcgQ0hBUkFDVEVSRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR3b3JkICs9IGM7XG5cblx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZygxKTtcblx0XHRcdGkgKz0gMTtcblxuLypcdFx0XHRjb250aW51ZSBfX2wwO1xuICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdGlmKHdvcmQpXG5cdFx0e1xuXHRcdFx0aWYoZXJyb3IpXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdpbnZhbGlkIHRva2VuIGAnICsgd29yZCArICdgJztcblx0XHRcdH1cblxuXHRcdFx0cmVzdWx0X3Rva2Vucy5wdXNoKHdvcmQpO1xuXHRcdFx0cmVzdWx0X3R5cGVzLnB1c2goLTEpO1xuXHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG4vKlx0XHRcdHdvcmQgPSAnJztcbiAqL1x0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9rZW5zOiByZXN1bHRfdG9rZW5zLFxuXHRcdFx0dHlwZXM6IHJlc3VsdF90eXBlcyxcblx0XHRcdGxpbmVzOiByZXN1bHRfbGluZXMsXG5cdFx0fTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X21hdGNoOiBmdW5jdGlvbihzLCBzdHJpbmdPclJlZ0V4cClcblx0e1xuXHRcdGxldCBtO1xuXG5cdFx0aWYoc3RyaW5nT3JSZWdFeHAgaW5zdGFuY2VvZiBSZWdFeHApXG5cdFx0e1xuXHRcdFx0bSA9IHMubWF0Y2goc3RyaW5nT3JSZWdFeHApO1xuXG5cdFx0XHRyZXR1cm4gbSAhPT0gbnVsbCAmJiB0aGlzLl9jaGVja05leHRDaGFyKHMsIC8qLSovbVswXS8qLSovKSA/IC8qLSovbVswXS8qLSovIDogbnVsbDtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdG0gPSBzLmluZGV4T2Yoc3RyaW5nT3JSZWdFeHApO1xuXG5cdFx0XHRyZXR1cm4gbSA9PT0gMHgwMCAmJiB0aGlzLl9jaGVja05leHRDaGFyKHMsIHN0cmluZ09yUmVnRXhwKSA/IHN0cmluZ09yUmVnRXhwIDogbnVsbDtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9hbG51bTogW1xuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSxcblx0XHQxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAxLFxuXHRcdDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsXG5cdFx0MSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdF0sXG5cblx0X2NoZWNrTmV4dENoYXI6IGZ1bmN0aW9uKHMsIHRva2VuKVxuXHR7XG5cdFx0Y29uc3QgbGVuZ3RoID0gdG9rZW4ubGVuZ3RoO1xuXG5cdFx0Y29uc3QgY2hhckNvZGUyID0gcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDApO1xuXHRcdGNvbnN0IGNoYXJDb2RlMSA9IHMuY2hhckNvZGVBdChsZW5ndGggLSAxKTtcblxuXHRcdHJldHVybiBpc05hTihjaGFyQ29kZTIpXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHRoaXMuX2FsbnVtW2NoYXJDb2RlMl0gPT09IDBcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdGhpcy5fYWxudW1bY2hhckNvZGUxXSA9PT0gMFxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByID0ge307XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIudG9rZW5zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLnRva2VucyA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBDT01QT1NJVEUgVE9LRU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuSVNfWFhYID0gW1xuXHRcdFx0dGhpcy5ERUZJTkVELFxuXHRcdFx0dGhpcy5OVUxMLFxuXHRcdFx0dGhpcy5FTVBUWSxcblx0XHRcdHRoaXMuSVRFUkFCTEUsXG5cdFx0XHR0aGlzLkVWRU4sXG5cdFx0XHR0aGlzLk9ERCxcblx0XHRdO1xuXG5cdFx0dGhpcy5YWFhfV0lUSCA9IFtcblx0XHRcdHRoaXMuU1RBUlRTX1dJVEgsXG5cdFx0XHR0aGlzLkVORFNfV0lUSCxcblx0XHRdO1xuXG5cdFx0dGhpcy5QTFVTX01JTlVTID0gW1xuXHRcdFx0dGhpcy5DT05DQVQsXG5cdFx0XHR0aGlzLlBMVVMsXG5cdFx0XHR0aGlzLk1JTlVTLFxuXHRcdF07XG5cblx0XHR0aGlzLk1VTF9GTERJVl9ESVZfTU9EID0gW1xuXHRcdFx0dGhpcy5NVUwsXG5cdFx0XHR0aGlzLkZMRElWLFxuXHRcdFx0dGhpcy5ESVYsXG5cdFx0XHR0aGlzLk1PRCxcblx0XHRdO1xuXG5cdFx0dGhpcy5SWCA9IFtcblx0XHRcdHRoaXMuUlAsXG5cdFx0XHR0aGlzLlJCMSxcblx0XHRdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBSRUFMIFRPS0VOUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRMT0dJQ0FMX09SOiAxMDAsXG5cdExPR0lDQUxfQU5EOiAxMDEsXG5cdEJJVFdJU0VfT1I6IDEwMixcblx0QklUV0lTRV9YT1I6IDEwMyxcblx0QklUV0lTRV9BTkQ6IDEwNCxcblx0Tk9UOiAxMDUsXG5cdElTOiAxMDYsXG5cdERFRklORUQ6IDEwNyxcblx0TlVMTDogMTA4LFxuXHRFTVBUWTogMTA5LFxuXHRJVEVSQUJMRTogMTEwLFxuXHRFVkVOOiAxMTEsXG5cdE9ERDogMTEyLFxuXHRDTVBfT1A6IDExMyxcblx0U1RBUlRTX1dJVEg6IDExNCxcblx0RU5EU19XSVRIOiAxMTUsXG5cdE1BVENIRVM6IDExNixcblx0SU46IDExNyxcblx0UkFOR0U6IDExOCxcblx0Q09OQ0FUOiAxMTksXG5cdFBMVVM6IDEyMCxcblx0TUlOVVM6IDEyMSxcblx0UE9XRVI6IDEyMixcblx0TVVMOiAxMjMsXG5cdEZMRElWOiAxMjQsXG5cdERJVjogMTI1LFxuXHRNT0Q6IDEyNixcblx0Q09MT046IDEyNyxcblx0RE9UOiAxMjgsXG5cdENPTU1BOiAxMjksXG5cdFBJUEU6IDEzMCxcblx0TFA6IDEzMSxcblx0UlA6IDEzMixcblx0TEIxOiAxMzMsXG5cdFJCMTogMTM0LFxuXHRMQjI6IDEzNSxcblx0UkIyOiAxMzYsXG5cdFNJRDogMTM3LFxuXHRURVJNSU5BTDogMTM4LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVklSVFVBTCBUT0tFTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0TFNUOiAyMDAsXG5cdERJQzogMjAxLFxuXHRGVU46IDIwMixcblx0VkFSOiAyMDMsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLnRva2Vucy4kaW5pdCgpO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLlRva2VuaXplciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ub2tlbml6ZXIgPSBmdW5jdGlvbihjb2RlLCBsaW5lKSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLl9zcGFjZXMgPSBbJyAnLCAnXFx0JywgJ1xcbicsICdcXHInXTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fdG9rZW5EZWZzID0gW1xuXHRcdCdvcicsXG5cdFx0J2FuZCcsXG5cdFx0J2Itb3InLFxuXHRcdCdiLXhvcicsXG5cdFx0J2ItYW5kJyxcblx0XHQnbm90Jyxcblx0XHQnaXMnLFxuXHRcdCdkZWZpbmVkJyxcblx0XHQnbnVsbCcsXG5cdFx0J2VtcHR5Jyxcblx0XHQnaXRlcmFibGUnLFxuXHRcdCdldmVuJyxcblx0XHQnb2RkJyxcblx0XHQnPT09Jyxcblx0XHQnPT0nLFxuXHRcdCchPT0nLFxuXHRcdCchPScsXG5cdFx0Jzw9Jyxcblx0XHQnPj0nLFxuXHRcdCc8Jyxcblx0XHQnPicsXG5cdFx0L15zdGFydHNcXHMrd2l0aC8sXG5cdFx0L15lbmRzXFxzK3dpdGgvLFxuXHRcdCdtYXRjaGVzJyxcblx0XHQnaW4nLFxuXHRcdCcuLicsXG5cdFx0J34nLFxuXHRcdCcrJyxcblx0XHQnLScsXG5cdFx0JyoqJyxcblx0XHQnKicsXG5cdFx0Jy8vJyxcblx0XHQnLycsXG5cdFx0JyUnLFxuXHRcdCc6Jyxcblx0XHQnLicsXG5cdFx0JywnLFxuXHRcdCd8Jyxcblx0XHQnKCcsXG5cdFx0JyknLFxuXHRcdCdbJyxcblx0XHQnXScsXG5cdFx0J3snLFxuXHRcdCd9Jyxcblx0XHQndHJ1ZScsXG5cdFx0J2ZhbHNlJyxcblx0XHQvXlswLTldK1xcLlswLTldKy8sXG5cdFx0L15bMC05XSsvLFxuXHRcdC9eJyhcXFxcJ3xbXiddKSonLyxcblx0XHQvXlwiKFxcXFxcInxbXlwiXSkqXCIvLFxuXHRcdC9eW2EtekEtWl8kXVthLXpBLVowLTlfJF0qLyxcblx0XTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fdG9rZW5UeXBlcyA9IFtcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX1hPUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5ELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTk9ULFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ERUZJTkVELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTlVMTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkVNUFRZLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSVRFUkFCTEUsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FVkVOLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuT0RELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuU1RBUlRTX1dJVEgsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FTkRTX1dJVEgsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NQVRDSEVTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSU4sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQU5HRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTkNBVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NSU5VUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBPV0VSLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTVVMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRkxESVYsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ESVYsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NT0QsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DT0xPTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUElQRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxQLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUlAsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MQjEsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQjEsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MQjIsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQjIsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5TSUQsXG5cdF07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuJGluaXQgPSBmdW5jdGlvbihjb2RlLCBsaW5lKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCByZXN1bHQgPSBhbWlUd2lnLnRva2VuaXplci50b2tlbml6ZShcblx0XHRcdGNvZGUsXG5cdFx0XHRsaW5lLFxuXHRcdFx0dGhpcy5fc3BhY2VzLFxuXHRcdFx0dGhpcy5fdG9rZW5EZWZzLFxuXHRcdFx0dGhpcy5fdG9rZW5UeXBlcyxcblx0XHRcdHRydWVcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnRva2VucyA9IHJlc3VsdC50b2tlbnM7XG5cdFx0dGhpcy50eXBlcyA9IHJlc3VsdC50eXBlcztcblxuXHRcdHRoaXMuaSA9IDA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5uZXh0ID0gZnVuY3Rpb24obiA9IDEpXG5cdHtcblx0XHR0aGlzLmkgKz0gbjtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5pc0VtcHR5ID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaSA+PSB0aGlzLnRva2Vucy5sZW5ndGg7XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMucGVla1Rva2VuID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudG9rZW5zW3RoaXMuaV07XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMucGVla1R5cGUgPSBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50eXBlc1t0aGlzLmldO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLmNoZWNrVHlwZSA9IGZ1bmN0aW9uKHR5cGUpXG5cdHtcblx0XHRpZih0aGlzLmkgPCB0aGlzLnRva2Vucy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0Y29uc3QgVFlQRSA9IHRoaXMudHlwZXNbdGhpcy5pXTtcblxuXHRcdFx0cmV0dXJuICh0eXBlIGluc3RhbmNlb2YgQXJyYXkpID8gKHR5cGUuaW5kZXhPZihUWVBFKSA+PSAwKSA6ICh0eXBlID09PSBUWVBFKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuJGluaXQoY29kZSwgbGluZSk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5Db21waWxlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuQ29tcGlsZXIgPSBmdW5jdGlvbihjb2RlLCBsaW5lKSB7XG5cblx0dGhpcy4kaW5pdChjb2RlLCBsaW5lKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Db21waWxlci5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24oY29kZSwgbGluZSlcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy50b2tlbml6ZXIgPSBuZXcgYW1pVHdpZy5leHByLlRva2VuaXplcihcblx0XHRcdHRoaXMuY29kZSA9IGNvZGUsXG5cdFx0XHR0aGlzLmxpbmUgPSBsaW5lXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5yb290Tm9kZSA9IHRoaXMucGFyc2VGaWx0ZXIoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuaXNFbXB0eSgpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIHVuZXhwZWN0ZWQgdG9rZW4gYCcgKyB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSArICdgJztcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZHVtcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucm9vdE5vZGUuZHVtcCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUZpbHRlcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTG9naWNhbE9yKCksIG5vZGUsIHRlbXA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBGaWx0ZXIgOiBMb2dpY2FsT3IgKCd8JyBEb3QxKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBJUEUpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0bm9kZSA9IHRoaXMucGFyc2VEb3QxKHRydWUpO1xuXG5cdFx0XHRmb3IodGVtcCA9IG5vZGU7IHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuRE9UOyB0ZW1wID0gdGVtcC5ub2RlTGVmdCk7XG5cblx0XHRcdHRlbXAubGlzdC51bnNoaWZ0KGxlZnQpO1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUxvZ2ljYWxPcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTG9naWNhbEFuZCgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIExvZ2ljYWxPciA6IExvZ2ljYWxBbmQgKCdvcicgTG9naWNhbEFuZCkqICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUxvZ2ljYWxBbmQoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUxvZ2ljYWxBbmQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VPcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIExvZ2ljYWxBbmQgOiBCaXR3aXNlT3IgKCdhbmQnIEJpdHdpc2VPcikqICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9BTkQpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VCaXR3aXNlT3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VPcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQml0d2lzZVhvcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEJpdHdpc2VPciA6IEJpdHdpc2VYb3IgKCdiLW9yJyBCaXR3aXNlWG9yKSogICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUJpdHdpc2VYb3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VYb3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VBbmQoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBCaXR3aXNlWG9yIDogQml0d2lzZUFuZCAoJ2IteG9yJyBCaXR3aXNlQW5kKSogICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfWE9SKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQml0d2lzZUFuZCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQml0d2lzZUFuZDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTm90KCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQml0d2lzZUFuZCA6IE5vdCAoJ2ItYW5kJyBOb3QpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX0FORCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZU5vdCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTm90OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBOb3QgOiAnbm90JyBDb21wICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUNvbXAoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IG51bGw7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgfCBDb21wICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiB0aGlzLnBhcnNlQ29tcCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUNvbXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUFkZFN1YigpLCByaWdodCwgbm9kZSwgc3dhcDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIENvbXAgOiBBZGRTdWIgJ2lzJyAnbm90Jz8gKCdkZWZpbmVkJyB8ICdudWxsJyB8IC4uLikgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0LyoqLyBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdC8qIHN3YXAgJ2lzJyBhbmQgJ25vdCcgKi9cblx0XHRcdHN3YXAgPSBub2RlO1xuXHRcdFx0Lyogc3dhcCAnaXMnIGFuZCAnbm90JyAqL1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5OT1QpKVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUubm9kZUxlZnQgPSBudWxsO1xuXHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHN3YXA7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLklTX1hYWCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJpZ2h0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdHN3YXAubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0XHRzd2FwLm5vZGVSaWdodCA9IHJpZ2h0O1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGtleXdvcmQgYGRlZmluZWRgLCBgbnVsbGAsIGBlbXB0eWAsIGBpdGVyYWJsZWAsIGBldmVuYCBvciBgb2RkYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgKCc9PT0nIHwgJz09JyB8IC4uLikgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1ApKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICgnc3RhcnRzJyB8ICdlbmRzJykgYHdpdGhgIEFkZFN1YiAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuWFhYX1dJVEgpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICdtYXRjaGVzJyBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgJ2luJyBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JTikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQWRkU3ViOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VNdWxEaXYoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBBZGRTdWIgOiBNdWxEaXYgKCgnKycgfCAnLScpIE11bERpdikqICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVNfTUlOVVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VNdWxEaXYoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU11bERpdjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlUGx1c01pbnVzKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTXVsRGl2IDogUGx1c01pbnVzICgoJyonIHwgJy8vJyB8ICcvJyB8ICclJykgUGx1c01pbnVzKSogICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5NVUxfRkxESVZfRElWX01PRCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZVBsdXNNaW51cygpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlUGx1c01pbnVzOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBQbHVzTWludXMgOiAoJy0nIHwgJysnKSBQb3dlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVNfTUlOVVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VQb3dlcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgICAgICB8IERvdDEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHRoaXMucGFyc2VQb3dlcigpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVBvd2VyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VEb3QxKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogUG93ZXIgOiBEb3QxICgnKionIERvdDEpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QT1dFUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZURvdDEoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDE6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0Y29uc3Qgbm9kZSA9IHRoaXMucGFyc2VEb3QyKGlzRmlsdGVyKTtcblxuXHRcdGlmKG5vZGUpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGV0IHRlbXAgPSBub2RlO1xuXG5cdFx0XHRmb3IoOyB0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDsgdGVtcCA9IHRlbXAubm9kZUxlZnQpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0ZW1wLnEpXG5cdFx0XHR7XG5cdFx0XHRcdC8qKi8gaWYodGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5GVU4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZih0ZW1wLm5vZGVWYWx1ZSBpbiBhbWlUd2lnLnN0ZGxpYilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9ICdhbWlUd2lnLnN0ZGxpYi4nICsgdGVtcC5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9IC8qLS0tKi8nXy4nLyotLS0qLyArIHRlbXAubm9kZVZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuVkFSKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAvKi0tLSovJ18uJy8qLS0tKi8gKyB0ZW1wLm5vZGVWYWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRlbXAucSA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdHJldHVybiBub2RlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDI6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlRG90Myhpc0ZpbHRlciksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogRG90MiA6IERvdDMgKCcuJyBEb3QzKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5ET1QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgJy4nKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlRG90Myhpc0ZpbHRlcik7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VEb3QzOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZVgoaXNGaWx0ZXIpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIHBhcnNlRG90MyA6IFggKCdbJyBGaWx0ZXIgJ10nKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIxKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUZpbHRlcigpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjEpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCwgJ1tdJyk7XG5cblx0XHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYF1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgICAgIHwgWCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVg6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBYIDogR3JvdXAgfCBBcnJheSB8IE9iamVjdCB8IEZ1blZhciB8IFRlcm1pbmFsICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZUdyb3VwKCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VBcnJheSgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlT2JqZWN0KCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VGdW5WYXIoaXNGaWx0ZXIpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlVGVybWluYWwoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFNZTlRBWCBFUlJPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBzeW50YXggZXJyb3Igb3IgdHVuY2F0ZWQgZXhwcmVzc2lvbic7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VHcm91cDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBHcm91cCA6ICcoJyBGaWx0ZXIgJyknICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxQKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdG5vZGUgPSB0aGlzLnBhcnNlRmlsdGVyKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJQKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGApYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VBcnJheTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGUsIGxpc3Q7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBBcnJheSA6ICdbJyBTaW5nbGV0cyAnXScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxCMSkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRsaXN0ID0gdGhpcy5fcGFyc2VTaW5nbGV0cygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjEpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkxTVCwgJ0FycmF5Jyk7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gbGlzdDtcblxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgXWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlT2JqZWN0OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbm9kZSwgZGljdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE9iamVjdCA6ICd7JyBEb3VibGV0cyAnfScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIyKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGRpY3QgPSB0aGlzLl9wYXJzZURvdWJsZXRzKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMikpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKGFtaVR3aWcuZXhwci50b2tlbnMuRElDLCAnT2JqZWN0Jyk7XG5cblx0XHRcdFx0bm9kZS5kaWN0ID0gZGljdDtcblxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgfWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRnVuVmFyOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuU0lEKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKDAsIGlzRmlsdGVyID8gJ2ZpbHRlcl8nICsgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkgOiB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cblx0XHRcdG5vZGUucSA9IHRydWU7XG5cblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZ1blZhciA6IFNJRCAnKCcgU2luZ2xldHMgJyknICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQvKiovIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxQKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUubGlzdCA9IHRoaXMuX3BhcnNlU2luZ2xldHMoKTtcblxuXHRcdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SUCkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0XHRub2RlLm5vZGVUeXBlID0gYW1pVHdpZy5leHByLnRva2Vucy5GVU47XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgKWAgZXhwZWN0ZWQnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiAgICAgICAgfCBTSUQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlLm5vZGVUeXBlID0gaXNGaWx0ZXIgPyBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTlxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgOiBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUlxuXHRcdFx0XHQ7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gW107XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VTaW5nbGV0czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SWCkgPT09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHRoaXMuX3BhcnNlU2luZ2xldChyZXN1bHQpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DT01NQSkgPT09IHRydWUpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlRG91YmxldHM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IHt9O1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIyKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0dGhpcy5fcGFyc2VEb3VibGV0KHJlc3VsdCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BKSA9PT0gdHJ1ZSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VTaW5nbGV0OiBmdW5jdGlvbihyZXN1bHQpXG5cdHtcblx0XHRyZXN1bHQucHVzaCh0aGlzLnBhcnNlRmlsdGVyKCkpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VEb3VibGV0OiBmdW5jdGlvbihyZXN1bHQpXG5cdHtcblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCkpXG5cdFx0e1xuXHRcdFx0Y29uc3Qga2V5ID0gdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTE9OKSlcblx0XHRcdHtcbi8qXHRcdFx0XHRjb25zdCBjb2xvbiA9IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpO1xuICovXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdFtrZXldID0gdGhpcy5wYXJzZUZpbHRlcigpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgOmAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCB0ZXJtaW5hbCBleHBlY3RlZCc7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVRlcm1pbmFsOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBUZXJtaW5hbCA6IFRFUk1JTkFMIHwgUkFOR0UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMKSlcblx0XHR7XG5cdFx0XHRsZWZ0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UpKVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJpZ2h0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIGxlZnQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLk5vZGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ob2RlID0gZnVuY3Rpb24obm9kZVR5cGUsIG5vZGVWYWx1ZSkge1xuXG5cdHRoaXMuJGluaXQobm9kZVR5cGUsIG5vZGVWYWx1ZSk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuTm9kZS5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24obm9kZVR5cGUsIG5vZGVWYWx1ZSlcblx0e1xuXHRcdHRoaXMubm9kZVR5cGUgPSBub2RlVHlwZTtcblx0XHR0aGlzLm5vZGVWYWx1ZSA9IG5vZGVWYWx1ZTtcblx0XHR0aGlzLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHR0aGlzLm5vZGVSaWdodCA9IG51bGw7XG5cdFx0dGhpcy5saXN0ID0gbnVsbDtcblx0XHR0aGlzLmRpY3QgPSBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZHVtcDogZnVuY3Rpb24obm9kZXMsIGVkZ2VzLCBwQ250KVxuXHR7XG5cdFx0bGV0IENOVDtcblxuXHRcdGNvbnN0IGNudCA9IHBDbnRbMF07XG5cblx0XHRub2Rlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgW2xhYmVsPVwiJyArIHRoaXMubm9kZVZhbHVlLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICdcIl07Jyk7XG5cblx0XHRpZih0aGlzLm5vZGVMZWZ0KVxuXHRcdHtcblx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICc7Jyk7XG5cdFx0XHR0aGlzLm5vZGVMZWZ0Ll9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5ub2RlUmlnaHQpXG5cdFx0e1xuXHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJzsnKTtcblx0XHRcdHRoaXMubm9kZVJpZ2h0Ll9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5saXN0KVxuXHRcdHtcblx0XHRcdGZvcihjb25zdCBpIGluIHRoaXMubGlzdClcblx0XHRcdHtcblx0XHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnIFtsYWJlbD1cIlsnICsgaS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXVwiXTsnKTtcblx0XHRcdFx0dGhpcy5saXN0W2ldLl9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5kaWN0KVxuXHRcdHtcblx0XHRcdGZvcihjb25zdCBpIGluIHRoaXMuZGljdClcblx0XHRcdHtcblx0XHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnIFtsYWJlbD1cIlsnICsgaS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXVwiXTsnKTtcblx0XHRcdFx0dGhpcy5kaWN0W2ldLl9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCBub2RlcyA9IFtdO1xuXHRcdGNvbnN0IGVkZ2VzID0gW107XG5cblx0XHR0aGlzLl9kdW1wKG5vZGVzLCBlZGdlcywgWzBdKTtcblxuXHRcdHJldHVybiAnZGlncmFwaCBhc3Qge1xcblxcdHJhbmtkaXI9VEI7XFxuJyArIG5vZGVzLmpvaW4oJ1xcbicpICsgJ1xcbicgKyBlZGdlcy5qb2luKCdcXG4nKSArICdcXG59Jztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRtcGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsID0ge307XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRtcGwuQ29tcGlsZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsLkNvbXBpbGVyID0gZnVuY3Rpb24odG1wbCkge1xuXG5cdHRoaXMuJGluaXQodG1wbCk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRtcGwuQ29tcGlsZXIucHJvdG90eXBlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0U1RBVEVNRU5UX1JFOiAvXFx7JVxccyooW2EtekEtWl0rKVxccyooKD86LnxcXG4pKj8pXFxzKiVcXH0vLFxuXG5cdENPTU1FTlRfUkU6IC9cXHsjXFxzKigoPzoufFxcbikqPylcXHMqI1xcfS9nLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfY291bnQ6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRsZXQgcmVzdWx0ID0gMDtcblxuXHRcdGNvbnN0IGwgPSBzLmxlbmd0aDtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpKyspXG5cdFx0e1xuXHRcdFx0aWYoc1tpXSA9PT0gJ1xcbicpIHJlc3VsdCsrO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbih0bXBsKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgbGluZSA9IDE7XG5cblx0XHRsZXQgY29sdW1uO1xuXHRcdGxldCBDT0xVTU47XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMucm9vdE5vZGUgPSB7XG5cdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0a2V5d29yZDogJ0Byb290Jyxcblx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0YmxvY2tzOiBbe1xuXHRcdFx0XHRleHByZXNzaW9uOiAnQHRydWUnLFxuXHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdH1dLFxuXHRcdFx0dmFsdWU6ICcnLFxuXHRcdH07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHN0YWNrMSA9IFt0aGlzLnJvb3ROb2RlXTtcblx0XHRjb25zdCBzdGFjazIgPSBbMHgwMDAwMDAwMDAwMF07XG5cblx0XHRsZXQgaXRlbTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Zm9yKHRtcGwgPSB0bXBsLnJlcGxhY2UodGhpcy5DT01NRU5UX1JFLCAnJyk7OyB0bXBsID0gdG1wbC5zdWJzdHIoQ09MVU1OKSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBjdXJyID0gc3RhY2sxW3N0YWNrMS5sZW5ndGggLSAxXTtcblx0XHRcdCBsZXQgIGluZHggPSBzdGFjazJbc3RhY2syLmxlbmd0aCAtIDFdO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBtID0gdG1wbC5tYXRjaCh0aGlzLlNUQVRFTUVOVF9SRSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKG0gPT09IG51bGwpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsaW5lICs9IHRoaXMuX2NvdW50KHRtcGwpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjdXJyLmJsb2Nrc1tpbmR4XS5saXN0LnB1c2goe1xuXHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0a2V5d29yZDogJ0B0ZXh0Jyxcblx0XHRcdFx0XHRleHByZXNzaW9uOiAnJyxcblx0XHRcdFx0XHRibG9ja3M6IFtdLFxuXHRcdFx0XHRcdHZhbHVlOiB0bXBsLFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgZXJyb3JzID0gW107XG5cblx0XHRcdFx0Zm9yKGxldCBpID0gc3RhY2sxLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvKiovIGlmKHN0YWNrMVtpXS5rZXl3b3JkID09PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGVycm9ycy5wdXNoKCdtaXNzaW5nIGtleXdvcmQgYGVuZGlmYCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmKHN0YWNrMVtpXS5rZXl3b3JkID09PSAnZm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0IFx0ZXJyb3JzLnB1c2goJ21pc3Npbmcga2V5d29yZCBgZW5kZm9yYCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGVycm9ycy5sZW5ndGggPiAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgJyArIGVycm9ycy5qb2luKCcsICcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBtYXRjaCA9IG1bMF07XG5cdFx0XHRjb25zdCBrZXl3b3JkID0gbVsxXTtcblx0XHRcdGNvbnN0IGV4cHJlc3Npb24gPSBtWzJdO1xuXG5cdFx0XHRjb2x1bW4gPSBtLmluZGV4ICsgMHgwMDAwMDAwMDAwO1xuXHRcdFx0Q09MVU1OID0gbS5pbmRleCArIG1hdGNoLmxlbmd0aDtcblxuXHRcdFx0Y29uc3QgdmFsdWUgPSB0bXBsLnN1YnN0cigwLCBjb2x1bW4pO1xuXHRcdFx0Y29uc3QgVkFMVUUgPSB0bXBsLnN1YnN0cigwLCBDT0xVTU4pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsaW5lICs9IHRoaXMuX2NvdW50KFZBTFVFKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodmFsdWUpXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRrZXl3b3JkOiAnQHRleHQnLFxuXHRcdFx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRzd2l0Y2goa2V5d29yZClcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2ZsdXNoJzpcblx0XHRcdFx0Y2FzZSAnYXV0b2VzY2FwZSc6XG5cdFx0XHRcdGNhc2UgJ3NwYWNlbGVzcyc6XG5cdFx0XHRcdGNhc2UgJ3ZlcmJhdGltJzpcblxuXHRcdFx0XHRcdC8qIElHTk9SRSAqL1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2RvJzpcblx0XHRcdFx0Y2FzZSAnc2V0Jzpcblx0XHRcdFx0Y2FzZSAnaW5jbHVkZSc6XG5cblx0XHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRcdGtleXdvcmQ6IGtleXdvcmQsXG5cdFx0XHRcdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0XHRcdFx0YmxvY2tzOiBbXSxcblx0XHRcdFx0XHRcdHZhbHVlOiAnJyxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2lmJzpcblx0XHRcdFx0Y2FzZSAnZm9yJzpcblxuXHRcdFx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0XHRcdFx0a2V5d29yZDoga2V5d29yZCxcblx0XHRcdFx0XHRcdGJsb2NrczogW3tcblx0XHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogZXhwcmVzc2lvbixcblx0XHRcdFx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHRcdFx0XHR9XSxcblx0XHRcdFx0XHRcdHZhbHVlOiAnJyxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXG5cdFx0XHRcdFx0c3RhY2sxLnB1c2goaXRlbSk7XG5cdFx0XHRcdFx0c3RhY2syLnB1c2goMHgwMCk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZWxzZWlmJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVsc2VpZmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGluZHggPSBjdXJyLmJsb2Nrcy5sZW5ndGg7XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrcy5wdXNoKHtcblx0XHRcdFx0XHRcdGV4cHJlc3Npb246IGV4cHJlc3Npb24sXG5cdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHN0YWNrMltzdGFjazIubGVuZ3RoIC0gMV0gPSBpbmR4O1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2Vsc2UnOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZWxzZWAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGluZHggPSBjdXJyLmJsb2Nrcy5sZW5ndGg7XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrcy5wdXNoKHtcblx0XHRcdFx0XHRcdGV4cHJlc3Npb246ICdAdHJ1ZScsXG5cdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHN0YWNrMltzdGFjazIubGVuZ3RoIC0gMV0gPSBpbmR4O1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2VuZGlmJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVuZGlmYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c3RhY2sxLnBvcCgpO1xuXHRcdFx0XHRcdHN0YWNrMi5wb3AoKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbmRmb3InOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnZm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVuZGZvcmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHN0YWNrMS5wb3AoKTtcblx0XHRcdFx0XHRzdGFjazIucG9wKCk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVua25vd24ga2V5d29yZCBgJyArIGtleXdvcmQgKyAnYCc7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5yb290Tm9kZSwgbnVsbCwgMik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLypcbiAqIEFNSSBUd2lnIEVuZ2luZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE5IFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5lbmdpbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZW5naW5lID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0VkFSSUFCTEVfUkU6IC9cXHtcXHtcXHMqKC4qPylcXHMqXFx9XFx9L2csXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9yZW5kZXI6IGZ1bmN0aW9uKHJlc3VsdCwgaXRlbSwgZGljdCA9IHt9KVxuXHR7XG5cdFx0bGV0IG07XG5cblx0XHRsZXQgZXhwcmVzc2lvbjtcblxuXHRcdHRoaXMuZGljdCA9IGRpY3Q7XG5cblx0XHRzd2l0Y2goaXRlbS5rZXl3b3JkKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBETyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnZG8nOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YW1pVHdpZy5leHByLmNhY2hlLmV2YWwoaXRlbS5leHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNFVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdzZXQnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bSA9IGl0ZW0uZXhwcmVzc2lvbi5tYXRjaCgvKFthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMqPVxccyooLispLylcblxuXHRcdFx0XHRpZighbSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgaW52YWxpZCBgc2V0YCBzdGF0ZW1lbnQnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGRpY3RbbVsxXV0gPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChtWzJdLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEBURVhUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdAdGV4dCc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtLnZhbHVlLnJlcGxhY2UodGhpcy5WQVJJQUJMRV9SRSwgZnVuY3Rpb24obWF0Y2gsIGV4cHJlc3Npb24pIHtcblxuXHRcdFx0XHRcdGxldCB2YWx1ZSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDogJyc7XG5cdFx0XHRcdH0pKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJRiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnaWYnOlxuXHRcdFx0Y2FzZSAnQHJvb3QnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aXRlbS5ibG9ja3MuZXZlcnkoKGJsb2NrKSA9PiB7XG5cblx0XHRcdFx0XHRleHByZXNzaW9uID0gYmxvY2suZXhwcmVzc2lvbjtcblxuXHRcdFx0XHRcdGlmKGV4cHJlc3Npb24gPT09ICdAdHJ1ZScgfHwgYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRibG9jay5saXN0LmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBpdGVtLCBkaWN0KTtcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdmb3InOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bSA9IGl0ZW0uYmxvY2tzWzBdLmV4cHJlc3Npb24ubWF0Y2goLyhbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzK2luXFxzKyguKykvKVxuXG5cdFx0XHRcdGlmKCFtKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBpbnZhbGlkIGBmb3JgIHN0YXRlbWVudCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3Qgc3ltYiA9IG1bMV07XG5cdFx0XHRcdGNvbnN0IGV4cHIgPSBtWzJdO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgdmFsdWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG5cblx0XHRcdFx0aWYodHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dmFsdWUgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYodHlwZU5hbWUgIT09ICdbb2JqZWN0IEFycmF5XSdcblx0XHRcdFx0XHQgICAmJlxuXHRcdFx0XHRcdCAgIHR5cGVOYW1lICE9PSAnW29iamVjdCBTdHJpbmddJ1xuXHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgcmlnaHQgb3BlcmFuZGUgbm90IGl0ZXJhYmxlJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3Qgb2xkMSA9IGRpY3RbKHN5bWIpXTtcblx0XHRcdFx0Y29uc3Qgb2xkMiA9IGRpY3RbJ2xvb3AnXTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IGsgPSAweDAwMDAwMDAwMDA7XG5cdFx0XHRcdGNvbnN0IGwgPSB2YWx1ZS5sZW5ndGg7XG5cblx0XHRcdFx0ZGljdC5sb29wID0ge2xlbmd0aDogbH07XG5cblx0XHRcdFx0Y29uc3QgbGlzdCA9IGl0ZW0uYmxvY2tzWzBdLmxpc3Q7XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gdmFsdWUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRkaWN0W3N5bWJdID0gdmFsdWVbaV07XG5cblx0XHRcdFx0XHRkaWN0Lmxvb3AuZmlyc3QgPSAoayA9PT0gKDAgLSAwKSk7XG5cdFx0XHRcdFx0ZGljdC5sb29wLmxhc3QgPSAoayA9PT0gKGwgLSAxKSk7XG5cblx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXgwID0gaztcblx0XHRcdFx0XHRrKys7XG5cdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4ID0gaztcblxuXHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGxpc3QpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbGlzdFtqXSwgZGljdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGRpY3RbJ2xvb3AnXSA9IG9sZDI7XG5cdFx0XHRcdGRpY3RbKHN5bWIpXSA9IG9sZDE7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSU5DTFVERSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2luY2x1ZGUnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IG1fMV8gPSBpdGVtLmV4cHJlc3Npb24sIHdpdGhfc3ViZXhwciwgd2l0aF9jb250ZXh0O1xuXG5cdFx0XHRcdC8qKi8gaWYoKG0gPSBtXzFfLm1hdGNoKC8oLispXFxzK3dpdGhcXHMrKC4rKVxccytvbmx5JC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9IG1bMl07XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZigobSA9IG1fMV8ubWF0Y2goLyguKylcXHMrd2l0aFxccysoLispJC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9IG1bMl07XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKChtID0gbV8xXy5tYXRjaCgvKC4rKVxccytvbmx5JC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9ICd7fSc7XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IG1fMV87XG5cdFx0XHRcdFx0d2l0aF9zdWJleHByID0gJ3t9Jztcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGZpbGVOYW1lID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KSB8fCAnJztcblxuXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZmlsZU5hbWUpICE9PSAnW29iamVjdCBTdHJpbmddJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIHN0cmluZyBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgdmFyaWFibGVzID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwod2l0aF9zdWJleHByLCBpdGVtLmxpbmUsIGRpY3QpIHx8IHt9O1xuXG5cdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YXJpYWJsZXMpICE9PSAnW29iamVjdCBPYmplY3RdJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIG9iamVjdCBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmVzdWx0LnB1c2goYW1pVHdpZy5zdGRsaWIuaW5jbHVkZShcblx0XHRcdFx0XHRmaWxlTmFtZSxcblx0XHRcdFx0XHR2YXJpYWJsZXMsXG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0LFxuXHRcdFx0XHRcdGZhbHNlXG5cdFx0XHRcdCkpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVuZGVyOiBmdW5jdGlvbih0bXBsLCBkaWN0ID0ge30pXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdHN3aXRjaChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodG1wbCkpXG5cdFx0e1xuXHRcdFx0Y2FzZSAnW29iamVjdCBTdHJpbmddJzpcblx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbmV3IGFtaVR3aWcudG1wbC5Db21waWxlcih0bXBsKS5yb290Tm9kZSwgZGljdCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdbb2JqZWN0IE9iamVjdF0nOlxuXHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCAvKi0tLS0tLS0tLS0tLS0tKi90bXBsLyotLS0tLS0tLS0tLS0tLSovLCBkaWN0KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuY2FjaGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLmNhY2hlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZGljdDoge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGV2YWw6IGZ1bmN0aW9uKGV4cHJlc3Npb24sIGxpbmUsIF8pXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBmO1xuXG5cdFx0aWYoZXhwcmVzc2lvbiBpbiB0aGlzLmRpY3QpXG5cdFx0e1xuXHRcdFx0ZiA9IHRoaXMuZGljdFtleHByZXNzaW9uXTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGYgPSB0aGlzLmRpY3RbZXhwcmVzc2lvbl0gPSBldmFsKFxuXHRcdFx0XHRhbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIuZ2V0SlMoXG5cdFx0XHRcdFx0bmV3IGFtaVR3aWcuZXhwci5Db21waWxlcihleHByZXNzaW9uLCBsaW5lKVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIV8pIF8gPSB7fTtcblxuXHRcdHJldHVybiBmLmNhbGwoXywgXyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmRhdGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyogVE9ETyAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmFqYXggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5hamF4ID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZGljdDoge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldDogZnVuY3Rpb24odXJsLCBkb25lLCBmYWlsKVxuXHR7XG5cdFx0bGV0IHR4dDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodXJsIGluIHRoaXMuZGljdClcblx0XHR7XG5cdFx0XHRpZihkb25lKVxuXHRcdFx0e1xuXHRcdFx0XHRkb25lKHRoaXMuZGljdFt1cmxdKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoYW1pVHdpZy5mcylcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogTk9ERUpTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHR0eHQgPSB0aGlzLmRpY3RbdXJsXSA9IGFtaVR3aWcuZnMucmVhZEZpbGVTeW5jKHVybCwgJ3V0ZjgnKTtcblxuXHRcdFx0XHRpZihkb25lKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZG9uZSh0eHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjYXRjaChlcnIpXG5cdFx0XHR7XG5cdFx0XHRcdGlmKGZhaWwpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRmYWlsKGVycik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBCUk9XU0VSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgeG1sSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuXHRcdFx0eG1sSHR0cFJlcXVlc3Qub3BlbignR0VUJywgdXJsLCBmYWxzZSk7XG5cdFx0XHR4bWxIdHRwUmVxdWVzdC5zZW5kKCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHhtbEh0dHBSZXF1ZXN0LnN0YXR1cyA9PT0gMjAwKVxuXHRcdFx0e1xuXHRcdFx0XHR0eHQgPSB0aGlzLmRpY3RbdXJsXSA9IHhtbEh0dHBSZXF1ZXN0LnJlc3BvbnNlVGV4dDtcblxuXHRcdFx0XHRpZihkb25lKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZG9uZSh0eHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHR4dCA9IC8qKioqKioqKioqKioqKi8geG1sSHR0cFJlcXVlc3QucmVzcG9uc2VUZXh0O1xuXG5cdFx0XHRcdGlmKGZhaWwpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRmYWlsKHR4dCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnN0ZGxpYiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5zdGRsaWIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVkFSSUFCTEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzVW5kZWZpbmVkJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ID09PSB1bmRlZmluZWQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0RlZmluZWQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggIT09IHVuZGVmaW5lZDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTnVsbCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCA9PT0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTm90TnVsbCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCAhPT0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzRW1wdHknOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0aWYoeCA9PT0gbnVsbFxuXHRcdCAgIHx8XG5cdFx0ICAgeCA9PT0gZmFsc2Vcblx0XHQgICB8fFxuXHRcdCAgIHggPT09ICgoJycpKVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGNvbnN0IHR5cGVOYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuICh0eXBlTmFtZSA9PT0gJ1tvYmplY3QgQXJyYXldJyAmJiB4Lmxlbmd0aCA9PT0gMClcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgKHR5cGVOYW1lID09PSAnW29iamVjdCBPYmplY3RdJyAmJiBPYmplY3Qua2V5cyh4KS5sZW5ndGggPT09IDApXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNOdW1iZXInOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgTnVtYmVyXSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc1N0cmluZyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBTdHJpbmddJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzQXJyYXknOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzT2JqZWN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNJdGVyYWJsZSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KTtcblxuXHRcdHJldHVybiB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgU3RyaW5nXSdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdHlwZU5hbWUgPT09ICdbb2JqZWN0IEFycmF5XSdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNFdmVuJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzTnVtYmVyKHgpICYmICh4ICYgMSkgPT09IDA7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc09kZCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc051bWJlcih4KSAmJiAoeCAmIDEpID09PSAxO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSVRFUkFCTEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzSW5PYmplY3QnOiBmdW5jdGlvbih4LCB5KVxuXHR7XG5cdFx0aWYodGhpcy5pc0FycmF5KHkpXG5cdFx0ICAgfHxcblx0XHQgICB0aGlzLmlzU3RyaW5nKHkpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHkuaW5kZXhPZih4KSA+PSAwO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNPYmplY3QoeSkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHggaW4geTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0luUmFuZ2UnOiBmdW5jdGlvbih4LCB4MSwgeDIpXG5cdHtcblx0XHRpZih0aGlzLmlzTnVtYmVyKHgxKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc051bWJlcih4Milcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4gKC8qLS0tKi94LyotLS0qLyA+PSAvKi0tLSoveDEvKi0tLSovKVxuXHRcdFx0ICAgICAgICYmXG5cdFx0XHQgICAgICAgKC8qLS0tKi94LyotLS0qLyA8PSAvKi0tLSoveDIvKi0tLSovKVxuXHRcdFx0O1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNTdHJpbmcoeDEpICYmIHgxLmxlbmd0aCA9PT0gMVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyh4MikgJiYgeDIubGVuZ3RoID09PSAxXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuICh4LmNoYXJDb2RlQXQoMCkgPj0geDEuY2hhckNvZGVBdCgwKSlcblx0XHRcdCAgICAgICAmJlxuXHRcdFx0ICAgICAgICh4LmNoYXJDb2RlQXQoMCkgPD0geDIuY2hhckNvZGVBdCgwKSlcblx0XHRcdDtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdyYW5nZSc6IGZ1bmN0aW9uKHgxLCB4Miwgc3RlcCA9IDEpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdC8qKi8gaWYodGhpcy5pc051bWJlcih4MSlcblx0XHQgICAgICAgICYmXG5cdFx0ICAgICAgICB0aGlzLmlzTnVtYmVyKHgyKVxuXHRcdCApIHtcblx0XHRcdGZvcihsZXQgaSA9IC8qLS0tKi94MS8qLS0tKi87IGkgPD0gLyotLS0qL3gyLyotLS0qLzsgaSArPSBzdGVwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQucHVzaCgvKi0tLS0tLS0tLS0tLS0tLSovKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLmlzU3RyaW5nKHgxKSAmJiB4MS5sZW5ndGggPT09IDFcblx0XHQgICAgICAgICYmXG5cdFx0ICAgICAgICB0aGlzLmlzU3RyaW5nKHgyKSAmJiB4Mi5sZW5ndGggPT09IDFcblx0XHQgKSB7XG5cdFx0XHRmb3IobGV0IGkgPSB4MS5jaGFyQ29kZUF0KDApOyBpIDw9IHgyLmNoYXJDb2RlQXQoMCk7IGkgKz0gc3RlcClcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sZW5ndGgnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyh4KVxuXHRcdCAgIHx8XG5cdFx0ICAgdGhpcy5pc0FycmF5KHgpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHgubGVuZ3RoO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNPYmplY3QoeCkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIE9iamVjdC5rZXlzKHgpLmxlbmd0aDtcblx0XHR9XG5cblx0XHRyZXR1cm4gMDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9maXJzdCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMuaXNTdHJpbmcoeCkgfHwgdGhpcy5pc0FycmF5KHgpKSAmJiB4Lmxlbmd0aCA+IDAgPyB4WzB4MDAwMDAwMDAwMF0gOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sYXN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpICYmIHgubGVuZ3RoID4gMCA/IHhbeC5sZW5ndGggLSAxXSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NsaWNlJzogZnVuY3Rpb24oeCwgaWR4MSwgaWR4Milcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpID8geC5zbGljZShpZHgxLCBpZHgyKSA6IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbWVyZ2UnOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID4gMSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmlzU3RyaW5nKGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNTdHJpbmcoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0TC5wdXNoKGFyZ3VtZW50c1tpXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gTC5qb2luKCcnKTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNBcnJheShpdGVtKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBpdGVtKSBMLnB1c2goaXRlbVtqXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gTDtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBEID0ge307XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYXJndW1lbnRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzT2JqZWN0KGl0ZW0pKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGl0ZW0pIERbal0gPSBpdGVtW2pdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIEQ7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfc29ydCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5zb3J0KCkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yZXZlcnNlJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4LnJldmVyc2UoKSA6IFtdO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pvaW4nOiBmdW5jdGlvbih4LCBzZXApXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5qb2luKHNlcCkgOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9rZXlzJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzT2JqZWN0KHgpID8gT2JqZWN0LmtleXMoeCkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNUUklOR1MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdzdGFydHNXaXRoJzogZnVuY3Rpb24oczEsIHMyKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzMSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoczIpXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgYmFzZSA9IDB4MDAwMDAwMDAwMDAwMDAwMDAwMDtcblxuXHRcdFx0cmV0dXJuIHMxLmluZGV4T2YoczIsIGJhc2UpID09PSBiYXNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2VuZHNXaXRoJzogZnVuY3Rpb24oczEsIHMyKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzMSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoczIpXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgYmFzZSA9IHMxLmxlbmd0aCAtIHMyLmxlbmd0aDtcblxuXHRcdFx0cmV0dXJuIHMxLmluZGV4T2YoczIsIGJhc2UpID09PSBiYXNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21hdGNoJzogZnVuY3Rpb24ocywgcmVnZXgpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKCgocykpKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyhyZWdleClcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBpZHgxID0gcmVnZXguICBpbmRleE9mICAoJy8nKTtcblx0XHRcdGNvbnN0IGlkeDIgPSByZWdleC5sYXN0SW5kZXhPZignLycpO1xuXG5cdFx0XHRpZihpZHgxID09PSAwIHx8IGlkeDEgPCBpZHgyKVxuXHRcdFx0e1xuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4LnN1YnN0cmluZyhpZHgxICsgMSwgaWR4MiksIHJlZ2V4LnN1YnN0cmluZyhpZHgyICsgMSkpLnRlc3Qocyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2goZXJyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0LyogSUdOT1JFICovXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfZGVmYXVsdCc6IGZ1bmN0aW9uKHMxLCBzMilcblx0e1xuXHRcdHJldHVybiBzMSB8fCBzMiB8fCAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sb3dlcic6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudG9Mb3dlckNhc2UoKSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3VwcGVyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy50b1VwcGVyQ2FzZSgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfY2FwaXRhbGl6ZSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMpKVxuXHRcdHtcblx0XHRcdHJldHVybiBzLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL15cXFMvZywgZnVuY3Rpb24oYykge1xuXG5cdFx0XHRcdHJldHVybiBjLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdGl0bGUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gcy50cmltKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8oPzpefFxccylcXFMvZywgZnVuY3Rpb24oYykge1xuXG5cdFx0XHRcdHJldHVybiBjLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdHJpbSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudHJpbSgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J19yZXBsYWNlJzogZnVuY3Rpb24ocywgb2xkU3RycywgbmV3U3Rycylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0Y29uc3QgbCA9ICgoKHMpKSkubGVuZ3RoO1xuXHRcdGNvbnN0IG0gPSBvbGRTdHJzLmxlbmd0aDtcblx0XHRjb25zdCBuID0gbmV3U3Rycy5sZW5ndGg7XG5cblx0XHRpZihtICE9IG4pXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHR9XG5cbl9fbDA6XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpICs9IDApXG5cdFx0e1xuXHRcdFx0Y29uc3QgcCA9IHMuc3Vic3RyaW5nKGkpO1xuXG5cdFx0XHRmb3IobGV0IGogPSAwOyBqIDwgbTsgaiArPSAxKVxuXHRcdFx0e1xuXHRcdFx0XHRpZihwLmluZGV4T2Yob2xkU3Ryc1tqXSkgPT09IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChuZXdTdHJzW2pdKTtcblxuXHRcdFx0XHRcdGkgKz0gb2xkU3Ryc1tqXS5sZW5ndGg7XG5cblx0XHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdC5wdXNoKHMuY2hhckF0KGkrKykpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfdGV4dFRvSHRtbFgnOiBbJyYnICAgICwgJ1wiJyAgICAgLCAnPCcgICAsICc+JyAgIF0sXG5cdCdfdGV4dFRvSHRtbFknOiBbJyZhbXA7JywgJyZxdW90OycsICcmbHQ7JywgJyZndDsnXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J190ZXh0VG9TdHJpbmdYJzogWydcXFxcJyAgLCAnXFxuJyAsICdcIicgICwgJ1xcJycgIF0sXG5cdCdfdGV4dFRvU3RyaW5nWSc6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXFwiJywgJ1xcXFxcXCcnXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J190ZXh0VG9Kc29uU3RyaW5nWCc6IFsnXFxcXCcgICwgJ1xcbicgLCAnXCInICBdLFxuXHQnX3RleHRUb0pzb25TdHJpbmdZJzogWydcXFxcXFxcXCcsICdcXFxcbicsICdcXFxcXCInXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9lc2NhcGUnOiBmdW5jdGlvbihzLCBtb2RlKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRzd2l0Y2gobW9kZSB8fCAnaHRtbCcpXG5cdFx0XHR7XG5cdFx0XHRcdGNhc2UgJ2h0bWwnOlxuXHRcdFx0XHRjYXNlICdodG1sX2F0dHInOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb0h0bWxYLCB0aGlzLl90ZXh0VG9IdG1sWSk7XG5cblx0XHRcdFx0Y2FzZSAnanMnOlxuXHRcdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb1N0cmluZ1gsIHRoaXMuX3RleHRUb1N0cmluZ1kpO1xuXG5cdFx0XHRcdGNhc2UgJ2pzb24nOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb0pzb25TdHJpbmdYLCB0aGlzLl90ZXh0VG9Kc29uU3RyaW5nWSk7XG5cblx0XHRcdFx0Y2FzZSAndXJsJzpcblx0XHRcdFx0XHRyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHMpO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIHM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3VybF9lbmNvZGUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBlbmNvZGVVUklDb21wb25lbnQocylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX25sMmJyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy5yZXBsYWNlKC9cXG4vZywgJzxici8+Jylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3Jhdyc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHNcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3JlcGxhY2UnOiBmdW5jdGlvbihzLCBkaWN0KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgJiYgdGhpcy5pc09iamVjdChkaWN0KSA/IHRoaXMuX3JlcGxhY2UocywgT2JqZWN0LmtleXMoZGljdCksIE9iamVjdC52YWx1ZXMoZGljdCkpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NwbGl0JzogZnVuY3Rpb24ocywgc2VwLCBtYXgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMuc3BsaXQoc2VwLCBtYXgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiBbXVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIE5VTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfYWJzJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBNYXRoLmFicyh4KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yb3VuZCc6IGZ1bmN0aW9uKHgsIG1vZGUpXG5cdHtcblx0XHRzd2l0Y2gobW9kZSlcblx0XHR7XG5cdFx0XHRjYXNlICdjZWlsJzpcblx0XHRcdFx0cmV0dXJuIE1hdGguY2VpbCh4KTtcblxuXHRcdFx0Y2FzZSAnZmxvb3InOlxuXHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih4KTtcblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIE1hdGgucm91bmQoeCk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnbWluJzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBhcmdzID0gKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpICYmICh0aGlzLmlzQXJyYXkoYXJndW1lbnRzWzBdKSB8fCB0aGlzLmlzT2JqZWN0KGFyZ3VtZW50c1swXSkpID8gYXJndW1lbnRzWzBdXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFyZ3VtZW50c1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHJlc3VsdCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcblxuXHRcdGZvcihjb25zdCBpIGluIGFyZ3MpXG5cdFx0e1xuXHRcdFx0aWYoIXRoaXMuaXNOdW1iZXIoYXJnc1tpXSkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBOdW1iZXIuTmFOO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihyZXN1bHQgPiBhcmdzW2ldKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSBhcmdzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21heCc6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgYXJncyA9IChhcmd1bWVudHMubGVuZ3RoID09PSAxKSAmJiAodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkgfHwgdGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKSA/IGFyZ3VtZW50c1swXVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhcmd1bWVudHNcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCByZXN1bHQgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XG5cblx0XHRmb3IoY29uc3QgaSBpbiBhcmdzKVxuXHRcdHtcblx0XHRcdGlmKCF0aGlzLmlzTnVtYmVyKGFyZ3NbaV0pKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gTnVtYmVyLk5hTjtcblx0XHRcdH1cblxuXHRcdFx0aWYocmVzdWx0IDwgYXJnc1tpXSlcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0ID0gYXJnc1tpXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBSQU5ET00gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQncmFuZG9tJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGNvbnN0IHkgPSBNYXRoLnJhbmRvbSgpO1xuXG5cdFx0aWYoeClcblx0XHR7XG5cdFx0XHRpZih0aGlzLmlzQXJyYXkoeClcblx0XHRcdCAgIHx8XG5cdFx0XHQgICB0aGlzLmlzT2JqZWN0KHgpXG5cdFx0XHQgKSB7XG5cdFx0XHQgXHRjb25zdCBYID0gT2JqZWN0LmtleXMoeCk7XG5cblx0XHRcdFx0cmV0dXJuIHhbXG5cdFx0XHRcdFx0WFtNYXRoLmZsb29yKFgubGVuZ3RoICogeSldXG5cdFx0XHRcdF07XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuaXNTdHJpbmcoeCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiB4W01hdGguZmxvb3IoeC5sZW5ndGggKiB5KV07XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuaXNOdW1iZXIoeCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKHggKiB5KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR4ID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG5cblx0XHRyZXR1cm4gTWF0aC5mbG9vcih4ICogeSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBKU09OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pzb25fZW5jb2RlJzogZnVuY3Rpb24oeCwgaW5kZW50KVxuXHR7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHgsIG51bGwsIHRoaXMuaXNOdW1iZXIoaW5kZW50KSA/IGluZGVudCA6IDIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pzb25fanNwYXRoJzogZnVuY3Rpb24oeCwgcGF0aClcblx0e1xuXHRcdHJldHVybiB0eXBlb2YgSlNQYXRoICE9PSAndW5kZWZpbmVkJyA/IEpTUGF0aC5hcHBseShwYXRoLCB4KVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVEVNUExBVEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2luY2x1ZGUnOiBmdW5jdGlvbihmaWxlTmFtZSwgdmFyaWFibGVzID0ge30sIHdpdGhDb250ZXh0ID0gdHJ1ZSwgaWdub3JlTWlzc2luZyA9IGZhbHNlKVxuXHR7XG5cdFx0Y29uc3QgdGVtcCA9IHt9O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih3aXRoQ29udGV4dClcblx0XHR7XG5cdFx0XHRmb3IoY29uc3QgaSBpbiBhbWlUd2lnLmVuZ2luZS5kaWN0KVxuXHRcdFx0e1xuXHRcdFx0XHR0ZW1wW2ldID0gYW1pVHdpZy5lbmdpbmUuZGljdFtpXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZih2YXJpYWJsZXMpXG5cdFx0e1xuXHRcdFx0Zm9yKGNvbnN0IGkgaW4gLyotKi92YXJpYWJsZXMvKi0qLylcblx0XHRcdHtcblx0XHRcdFx0dGVtcFtpXSA9IC8qLSovdmFyaWFibGVzLyotKi9baV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgcmVzdWx0ID0gJyc7XG5cblx0XHRhbWlUd2lnLmFqYXguZ2V0KFxuXHRcdFx0ZmlsZU5hbWUsXG5cdFx0XHRmdW5jdGlvbihkYXRhKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSBhbWlUd2lnLmVuZ2luZS5yZW5kZXIoZGF0YSwgdGVtcCk7XG5cdFx0XHR9LFxuXHRcdFx0ZnVuY3Rpb24oLyoqLylcblx0XHRcdHtcblx0XHRcdFx0aWYoIWlnbm9yZU1pc3NpbmcpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgY291bGQgbm90IG9wZW4gYCcgKyBmaWxlTmFtZSArICdgJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5zdGRsaWIuZmlsdGVyX2UgPSBhbWlUd2lnLnN0ZGxpYi5maWx0ZXJfZXNjYXBlO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLmludGVycHJldGVyID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2dldEpTOiBmdW5jdGlvbihub2RlKVxuXHR7XG5cdFx0bGV0IEw7XG5cdFx0bGV0IHg7XG5cdFx0bGV0IGxlZnQ7XG5cdFx0bGV0IHJpZ2h0O1xuXHRcdGxldCBvcGVyYXRvcjtcblxuXHRcdHN3aXRjaChub2RlLm5vZGVUeXBlKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBMU1QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxTVDpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmxpc3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2goLyotLS0tLSovIHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiAnWycgKyBMLmpvaW4oJywnKSArICddJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERJQyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRElDOlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXHRcblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5kaWN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKGkgKyAnOicgKyB0aGlzLl9nZXRKUyhub2RlLmRpY3RbaV0pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gJ3snICsgTC5qb2luKCcsJykgKyAnfSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGVU4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTjpcblx0XHQgXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdCBcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gbm9kZS5ub2RlVmFsdWUgKyAnKCcgKyBMLmpvaW4oJywnKSArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFZBUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuVkFSOlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUubGlzdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaCgnWycgKyB0aGlzLl9nZXRKUyhub2RlLmxpc3RbaV0pICsgJ10nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gTC5sZW5ndGggPiAwID8gbm9kZS5ub2RlVmFsdWUgKyBMLmpvaW4oJycpIDogbm9kZS5ub2RlVmFsdWU7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBURVJNSU5BTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMOlxuXG5cdFx0XHRcdHJldHVybiBub2RlLm5vZGVWYWx1ZTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSVM6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXG5cdFx0XHRcdHN3aXRjaChub2RlLm5vZGVSaWdodC5ub2RlVHlwZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ERUZJTkVEOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0RlZmluZWQoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTlVMTDpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNOdWxsKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVNUFRZOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0VtcHR5KCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLklURVJBQkxFOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0l0ZXJhYmxlKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVWRU46XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzRXZlbignICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5PREQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzT2RkKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHRocm93ICdpbnRlcm5hbCBlcnJvcic7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElOICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSU46XG5cblx0XHRcdFx0aWYobm9kZS5ub2RlUmlnaHQubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzSW5PYmplY3QoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR4ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cblx0XHRcdFx0XHRsZWZ0ID0gbm9kZS5ub2RlUmlnaHQubm9kZUxlZnQubm9kZVZhbHVlO1xuXHRcdFx0XHRcdHJpZ2h0ID0gbm9kZS5ub2RlUmlnaHQubm9kZVJpZ2h0Lm5vZGVWYWx1ZTtcblxuXHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNJblJhbmdlKCcgKyB4ICsgJywnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTVEFSVFNfV0lUSCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlNUQVJUU19XSVRIOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5zdGFydHNXaXRoKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFTkRTX1dJVEggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVORFNfV0lUSDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuZW5kc1dpdGgoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIE1BVENIRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUzpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIubWF0Y2goJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFJBTkdFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0U6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLnJhbmdlKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBET1QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZVZhbHVlWzBdID09PSAnLicpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gbGVmdCArICcuJyArIHJpZ2h0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBsZWZ0ICsgJ1snICsgcmlnaHQgKyAnXSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZMRElWICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRkxESVY6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ01hdGguZmxvb3IoJyArIGxlZnQgKyAnLycgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFBPV0VSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVI6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ01hdGgucG93KCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogVU5JQVJZIE9QRVJBVE9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYobm9kZS5ub2RlTGVmdCA9PT0gbnVsbFxuXHRcdFx0XHQgICAmJlxuXHRcdFx0XHQgICBub2RlLm5vZGVSaWdodCAhPT0gbnVsbFxuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0b3BlcmF0b3IgPSAobm9kZS5ub2RlVHlwZSAhPT0gYW1pVHdpZy5leHByLnRva2Vucy5OT1QpID8gbm9kZS5ub2RlVmFsdWUgOiAnISc7XG5cblx0XHRcdFx0XHRyZXR1cm4gb3BlcmF0b3IgKyAnKCcgKyB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCkgKyAnKSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ICE9PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ID09PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRvcGVyYXRvciA9IChub2RlLm5vZGVUeXBlICE9PSBhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkgPyBub2RlLm5vZGVWYWx1ZSA6ICchJztcblxuXHRcdFx0XHRcdHJldHVybiAnKCcgKyB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KSArICcpJyArIG9wZXJhdG9yO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBCSU5BUlkgT1BFUkFUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ICE9PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ICE9PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRzd2l0Y2gobm9kZS5ub2RlVHlwZSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnfHwnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfQU5EOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICcmJic7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnfCc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9YT1I6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJ14nO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5EOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICcmJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5DT05DQVQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJysnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSBub2RlLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdFx0cmV0dXJuICcoJyArIGxlZnQgKyBvcGVyYXRvciArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEpTOiBmdW5jdGlvbihleHByKVxuXHR7XG5cdFx0cmV0dXJuICcoZnVuY3Rpb24oXykgeyByZXR1cm4gJyArIHRoaXMuX2dldEpTKGV4cHIucm9vdE5vZGUpICsgJzsgfSknO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRldmFsOiBmdW5jdGlvbihleHByLCBfKVxuXHR7XG5cdFx0aWYoIV8pIF8gPSB7fTtcblxuXHRcdHJldHVybiBldmFsKHRoaXMuZ2V0SlMoZXhwcikpLmNhbGwoXywgXyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIihmdW5jdGlvbigpIHtcblxudmFyIFNZTlRBWCA9IHtcbiAgICAgICAgUEFUSCAgICAgICAgICAgIDogMSxcbiAgICAgICAgU0VMRUNUT1IgICAgICAgIDogMixcbiAgICAgICAgT0JKX1BSRUQgICAgICAgIDogMyxcbiAgICAgICAgUE9TX1BSRUQgICAgICAgIDogNCxcbiAgICAgICAgTE9HSUNBTF9FWFBSICAgIDogNSxcbiAgICAgICAgQ09NUEFSSVNPTl9FWFBSIDogNixcbiAgICAgICAgTUFUSF9FWFBSICAgICAgIDogNyxcbiAgICAgICAgQ09OQ0FUX0VYUFIgICAgIDogOCxcbiAgICAgICAgVU5BUllfRVhQUiAgICAgIDogOSxcbiAgICAgICAgUE9TX0VYUFIgICAgICAgIDogMTAsXG4gICAgICAgIExJVEVSQUwgICAgICAgICA6IDExXG4gICAgfTtcblxuLy8gcGFyc2VyXG5cbnZhciBwYXJzZSA9IChmdW5jdGlvbigpIHtcblxuICAgIHZhciBUT0tFTiA9IHtcbiAgICAgICAgICAgIElEICAgIDogMSxcbiAgICAgICAgICAgIE5VTSAgIDogMixcbiAgICAgICAgICAgIFNUUiAgIDogMyxcbiAgICAgICAgICAgIEJPT0wgIDogNCxcbiAgICAgICAgICAgIE5VTEwgIDogNSxcbiAgICAgICAgICAgIFBVTkNUIDogNixcbiAgICAgICAgICAgIEVPUCAgIDogN1xuICAgICAgICB9LFxuICAgICAgICBNRVNTQUdFUyA9IHtcbiAgICAgICAgICAgIFVORVhQX1RPS0VOIDogJ1VuZXhwZWN0ZWQgdG9rZW4gXCIlMFwiJyxcbiAgICAgICAgICAgIFVORVhQX0VPUCAgIDogJ1VuZXhwZWN0ZWQgZW5kIG9mIHBhdGgnXG4gICAgICAgIH07XG5cbiAgICB2YXIgcGF0aCwgaWR4LCBidWYsIGxlbjtcblxuICAgIGZ1bmN0aW9uIHBhcnNlKF9wYXRoKSB7XG4gICAgICAgIHBhdGggPSBfcGF0aC5zcGxpdCgnJyk7XG4gICAgICAgIGlkeCA9IDA7XG4gICAgICAgIGJ1ZiA9IG51bGw7XG4gICAgICAgIGxlbiA9IHBhdGgubGVuZ3RoO1xuXG4gICAgICAgIHZhciByZXMgPSBwYXJzZVBhdGhDb25jYXRFeHByKCksXG4gICAgICAgICAgICB0b2tlbiA9IGxleCgpO1xuXG4gICAgICAgIGlmKHRva2VuLnR5cGUgIT09IFRPS0VOLkVPUCkge1xuICAgICAgICAgICAgdGhyb3dVbmV4cGVjdGVkKHRva2VuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQYXRoQ29uY2F0RXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZVBhdGhDb25jYXRQYXJ0RXhwcigpLFxuICAgICAgICAgICAgb3BlcmFuZHM7XG5cbiAgICAgICAgd2hpbGUobWF0Y2goJ3wnKSkge1xuICAgICAgICAgICAgbGV4KCk7XG4gICAgICAgICAgICAob3BlcmFuZHMgfHwgKG9wZXJhbmRzID0gW2V4cHJdKSkucHVzaChwYXJzZVBhdGhDb25jYXRQYXJ0RXhwcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcGVyYW5kcz9cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLkNPTkNBVF9FWFBSLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBvcGVyYW5kc1xuICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUGF0aENvbmNhdFBhcnRFeHByKCkge1xuICAgICAgICByZXR1cm4gbWF0Y2goJygnKT9cbiAgICAgICAgICAgIHBhcnNlUGF0aEdyb3VwRXhwcigpIDpcbiAgICAgICAgICAgIHBhcnNlUGF0aCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUGF0aEdyb3VwRXhwcigpIHtcbiAgICAgICAgZXhwZWN0KCcoJyk7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VQYXRoQ29uY2F0RXhwcigpO1xuICAgICAgICBleHBlY3QoJyknKTtcblxuICAgICAgICB2YXIgcGFydHMgPSBbXSxcbiAgICAgICAgICAgIHBhcnQ7XG4gICAgICAgIHdoaWxlKChwYXJ0ID0gcGFyc2VQcmVkaWNhdGUoKSkpIHtcbiAgICAgICAgICAgIHBhcnRzLnB1c2gocGFydCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighcGFydHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZXhwcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGV4cHIudHlwZSA9PT0gU1lOVEFYLlBBVEgpIHtcbiAgICAgICAgICAgIGV4cHIucGFydHMgPSBleHByLnBhcnRzLmNvbmNhdChwYXJ0cyk7XG4gICAgICAgICAgICByZXR1cm4gZXhwcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcnRzLnVuc2hpZnQoZXhwcik7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgIDogU1lOVEFYLlBBVEgsXG4gICAgICAgICAgICBwYXJ0cyA6IHBhcnRzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQcmVkaWNhdGUoKSB7XG4gICAgICAgIGlmKG1hdGNoKCdbJykpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVBvc1ByZWRpY2F0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWF0Y2goJ3snKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlT2JqZWN0UHJlZGljYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtYXRjaCgnKCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VQYXRoR3JvdXBFeHByKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBhdGgoKSB7XG4gICAgICAgIGlmKCFtYXRjaFBhdGgoKSkge1xuICAgICAgICAgICAgdGhyb3dVbmV4cGVjdGVkKGxleCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmcm9tUm9vdCA9IGZhbHNlLFxuICAgICAgICAgICAgc3Vic3Q7XG5cbiAgICAgICAgaWYobWF0Y2goJ14nKSkge1xuICAgICAgICAgICAgbGV4KCk7XG4gICAgICAgICAgICBmcm9tUm9vdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihtYXRjaFN1YnN0KCkpIHtcbiAgICAgICAgICAgIHN1YnN0ID0gbGV4KCkudmFsLnN1YnN0cigxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwYXJ0cyA9IFtdLFxuICAgICAgICAgICAgcGFydDtcbiAgICAgICAgd2hpbGUoKHBhcnQgPSBwYXJzZVBhdGhQYXJ0KCkpKSB7XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHBhcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgICAgIDogU1lOVEFYLlBBVEgsXG4gICAgICAgICAgICBmcm9tUm9vdCA6IGZyb21Sb290LFxuICAgICAgICAgICAgc3Vic3QgICAgOiBzdWJzdCxcbiAgICAgICAgICAgIHBhcnRzICAgIDogcGFydHNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBhdGhQYXJ0KCkge1xuICAgICAgICByZXR1cm4gbWF0Y2hTZWxlY3RvcigpP1xuICAgICAgICAgICAgcGFyc2VTZWxlY3RvcigpIDpcbiAgICAgICAgICAgIHBhcnNlUHJlZGljYXRlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VTZWxlY3RvcigpIHtcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gbGV4KCkudmFsLFxuICAgICAgICAgICAgdG9rZW4gPSBsb29rYWhlYWQoKSxcbiAgICAgICAgICAgIHByb3A7XG5cbiAgICAgICAgaWYobWF0Y2goJyonKSB8fCB0b2tlbi50eXBlID09PSBUT0tFTi5JRCB8fCB0b2tlbi50eXBlID09PSBUT0tFTi5TVFIpIHtcbiAgICAgICAgICAgIHByb3AgPSBsZXgoKS52YWw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSAgICAgOiBTWU5UQVguU0VMRUNUT1IsXG4gICAgICAgICAgICBzZWxlY3RvciA6IHNlbGVjdG9yLFxuICAgICAgICAgICAgcHJvcCAgICAgOiBwcm9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQb3NQcmVkaWNhdGUoKSB7XG4gICAgICAgIGV4cGVjdCgnWycpO1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlUG9zRXhwcigpO1xuICAgICAgICBleHBlY3QoJ10nKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5QT1NfUFJFRCxcbiAgICAgICAgICAgIGFyZyAgOiBleHByXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VPYmplY3RQcmVkaWNhdGUoKSB7XG4gICAgICAgIGV4cGVjdCgneycpO1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlTG9naWNhbE9SRXhwcigpO1xuICAgICAgICBleHBlY3QoJ30nKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5PQkpfUFJFRCxcbiAgICAgICAgICAgIGFyZyAgOiBleHByXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VMb2dpY2FsT1JFeHByKCkge1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlTG9naWNhbEFOREV4cHIoKSxcbiAgICAgICAgICAgIG9wZXJhbmRzO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCd8fCcpKSB7XG4gICAgICAgICAgICBsZXgoKTtcbiAgICAgICAgICAgIChvcGVyYW5kcyB8fCAob3BlcmFuZHMgPSBbZXhwcl0pKS5wdXNoKHBhcnNlTG9naWNhbEFOREV4cHIoKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3BlcmFuZHM/XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5MT0dJQ0FMX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6ICd8fCcsXG4gICAgICAgICAgICAgICAgYXJncyA6IG9wZXJhbmRzXG4gICAgICAgICAgICB9IDpcbiAgICAgICAgICAgIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VMb2dpY2FsQU5ERXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZUVxdWFsaXR5RXhwcigpLFxuICAgICAgICAgICAgb3BlcmFuZHM7XG5cbiAgICAgICAgd2hpbGUobWF0Y2goJyYmJykpIHtcbiAgICAgICAgICAgIGxleCgpO1xuICAgICAgICAgICAgKG9wZXJhbmRzIHx8IChvcGVyYW5kcyA9IFtleHByXSkpLnB1c2gocGFyc2VFcXVhbGl0eUV4cHIoKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3BlcmFuZHM/XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5MT0dJQ0FMX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6ICcmJicsXG4gICAgICAgICAgICAgICAgYXJncyA6IG9wZXJhbmRzXG4gICAgICAgICAgICB9IDpcbiAgICAgICAgICAgIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VFcXVhbGl0eUV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VSZWxhdGlvbmFsRXhwcigpO1xuXG4gICAgICAgIHdoaWxlKFxuICAgICAgICAgICAgbWF0Y2goJz09JykgfHwgbWF0Y2goJyE9JykgfHwgbWF0Y2goJz09PScpIHx8IG1hdGNoKCchPT0nKSB8fFxuICAgICAgICAgICAgbWF0Y2goJ149PScpIHx8IG1hdGNoKCc9PV4nKSB8fG1hdGNoKCdePScpIHx8IG1hdGNoKCc9XicpIHx8XG4gICAgICAgICAgICBtYXRjaCgnJD09JykgfHwgbWF0Y2goJz09JCcpIHx8IG1hdGNoKCckPScpIHx8IG1hdGNoKCc9JCcpIHx8XG4gICAgICAgICAgICBtYXRjaCgnKj09JykgfHwgbWF0Y2goJz09KicpfHwgbWF0Y2goJyo9JykgfHwgbWF0Y2goJz0qJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBleHByID0ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguQ09NUEFSSVNPTl9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiBsZXgoKS52YWwsXG4gICAgICAgICAgICAgICAgYXJncyA6IFtleHByLCBwYXJzZUVxdWFsaXR5RXhwcigpXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUmVsYXRpb25hbEV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VBZGRpdGl2ZUV4cHIoKTtcblxuICAgICAgICB3aGlsZShtYXRjaCgnPCcpIHx8IG1hdGNoKCc+JykgfHwgbWF0Y2goJzw9JykgfHwgbWF0Y2goJz49JykpIHtcbiAgICAgICAgICAgIGV4cHIgPSB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5DT01QQVJJU09OX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6IGxleCgpLnZhbCxcbiAgICAgICAgICAgICAgICBhcmdzIDogW2V4cHIsIHBhcnNlUmVsYXRpb25hbEV4cHIoKV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUFkZGl0aXZlRXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZU11bHRpcGxpY2F0aXZlRXhwcigpO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCcrJykgfHwgbWF0Y2goJy0nKSkge1xuICAgICAgICAgICAgZXhwciA9IHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLk1BVEhfRVhQUixcbiAgICAgICAgICAgICAgICBvcCAgIDogbGV4KCkudmFsLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBbZXhwciwgcGFyc2VNdWx0aXBsaWNhdGl2ZUV4cHIoKV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZU11bHRpcGxpY2F0aXZlRXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZVVuYXJ5RXhwcigpO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCcqJykgfHwgbWF0Y2goJy8nKSB8fCBtYXRjaCgnJScpKSB7XG4gICAgICAgICAgICBleHByID0ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguTUFUSF9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiBsZXgoKS52YWwsXG4gICAgICAgICAgICAgICAgYXJncyA6IFtleHByLCBwYXJzZU11bHRpcGxpY2F0aXZlRXhwcigpXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUG9zRXhwcigpIHtcbiAgICAgICAgaWYobWF0Y2goJzonKSkge1xuICAgICAgICAgICAgbGV4KCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgIDogU1lOVEFYLlBPU19FWFBSLFxuICAgICAgICAgICAgICAgIHRvSWR4IDogcGFyc2VVbmFyeUV4cHIoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmcm9tRXhwciA9IHBhcnNlVW5hcnlFeHByKCk7XG4gICAgICAgIGlmKG1hdGNoKCc6JykpIHtcbiAgICAgICAgICAgIGxleCgpO1xuICAgICAgICAgICAgaWYobWF0Y2goJ10nKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgICAgOiBTWU5UQVguUE9TX0VYUFIsXG4gICAgICAgICAgICAgICAgICAgIGZyb21JZHggOiBmcm9tRXhwclxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgICA6IFNZTlRBWC5QT1NfRVhQUixcbiAgICAgICAgICAgICAgICBmcm9tSWR4IDogZnJvbUV4cHIsXG4gICAgICAgICAgICAgICAgdG9JZHggICA6IHBhcnNlVW5hcnlFeHByKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5QT1NfRVhQUixcbiAgICAgICAgICAgIGlkeCAgOiBmcm9tRXhwclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlVW5hcnlFeHByKCkge1xuICAgICAgICBpZihtYXRjaCgnIScpIHx8IG1hdGNoKCctJykpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5VTkFSWV9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiBsZXgoKS52YWwsXG4gICAgICAgICAgICAgICAgYXJnICA6IHBhcnNlVW5hcnlFeHByKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyc2VQcmltYXJ5RXhwcigpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUHJpbWFyeUV4cHIoKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGxvb2thaGVhZCgpLFxuICAgICAgICAgICAgdHlwZSA9IHRva2VuLnR5cGU7XG5cbiAgICAgICAgaWYodHlwZSA9PT0gVE9LRU4uU1RSIHx8IHR5cGUgPT09IFRPS0VOLk5VTSB8fCB0eXBlID09PSBUT0tFTi5CT09MIHx8IHR5cGUgPT09IFRPS0VOLk5VTEwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5MSVRFUkFMLFxuICAgICAgICAgICAgICAgIHZhbCAgOiBsZXgoKS52YWxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZihtYXRjaFBhdGgoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlUGF0aCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWF0Y2goJygnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlR3JvdXBFeHByKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhyb3dVbmV4cGVjdGVkKGxleCgpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUdyb3VwRXhwcigpIHtcbiAgICAgICAgZXhwZWN0KCcoJyk7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VMb2dpY2FsT1JFeHByKCk7XG4gICAgICAgIGV4cGVjdCgnKScpO1xuXG4gICAgICAgIHJldHVybiBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoKHZhbCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBsb29rYWhlYWQoKTtcbiAgICAgICAgcmV0dXJuIHRva2VuLnR5cGUgPT09IFRPS0VOLlBVTkNUICYmIHRva2VuLnZhbCA9PT0gdmFsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoUGF0aCgpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoU2VsZWN0b3IoKSB8fCBtYXRjaFN1YnN0KCkgfHwgbWF0Y2goJ14nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaFNlbGVjdG9yKCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBsb29rYWhlYWQoKTtcbiAgICAgICAgaWYodG9rZW4udHlwZSA9PT0gVE9LRU4uUFVOQ1QpIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSB0b2tlbi52YWw7XG4gICAgICAgICAgICByZXR1cm4gdmFsID09PSAnLicgfHwgdmFsID09PSAnLi4nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoU3Vic3QoKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGxvb2thaGVhZCgpO1xuICAgICAgICByZXR1cm4gdG9rZW4udHlwZSA9PT0gVE9LRU4uSUQgJiYgdG9rZW4udmFsWzBdID09PSAnJCc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXhwZWN0KHZhbCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBsZXgoKTtcbiAgICAgICAgaWYodG9rZW4udHlwZSAhPT0gVE9LRU4uUFVOQ1QgfHwgdG9rZW4udmFsICE9PSB2YWwpIHtcbiAgICAgICAgICAgIHRocm93VW5leHBlY3RlZCh0b2tlbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb29rYWhlYWQoKSB7XG4gICAgICAgIGlmKGJ1ZiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwb3MgPSBpZHg7XG4gICAgICAgIGJ1ZiA9IGFkdmFuY2UoKTtcbiAgICAgICAgaWR4ID0gcG9zO1xuXG4gICAgICAgIHJldHVybiBidWY7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWR2YW5jZSgpIHtcbiAgICAgICAgd2hpbGUoaXNXaGl0ZVNwYWNlKHBhdGhbaWR4XSkpIHtcbiAgICAgICAgICAgICsraWR4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaWR4ID49IGxlbikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLkVPUCxcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtpZHgsIGlkeF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG9rZW4gPSBzY2FuUHVuY3R1YXRvcigpO1xuICAgICAgICBpZih0b2tlbiB8fFxuICAgICAgICAgICAgICAgICh0b2tlbiA9IHNjYW5JZCgpKSB8fFxuICAgICAgICAgICAgICAgICh0b2tlbiA9IHNjYW5TdHJpbmcoKSkgfHxcbiAgICAgICAgICAgICAgICAodG9rZW4gPSBzY2FuTnVtZXJpYygpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9rZW4gPSB7IHJhbmdlIDogW2lkeCwgaWR4XSB9O1xuICAgICAgICBpZHggPj0gbGVuP1xuICAgICAgICAgICAgdG9rZW4udHlwZSA9IFRPS0VOLkVPUCA6XG4gICAgICAgICAgICB0b2tlbi52YWwgPSBwYXRoW2lkeF07XG5cbiAgICAgICAgdGhyb3dVbmV4cGVjdGVkKHRva2VuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsZXgoKSB7XG4gICAgICAgIHZhciB0b2tlbjtcblxuICAgICAgICBpZihidWYpIHtcbiAgICAgICAgICAgIGlkeCA9IGJ1Zi5yYW5nZVsxXTtcbiAgICAgICAgICAgIHRva2VuID0gYnVmO1xuICAgICAgICAgICAgYnVmID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhZHZhbmNlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNEaWdpdChjaCkge1xuICAgICAgICByZXR1cm4gJzAxMjM0NTY3ODknLmluZGV4T2YoY2gpID49IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNXaGl0ZVNwYWNlKGNoKSB7XG4gICAgICAgIHJldHVybiAnIFxcclxcblxcdCcuaW5kZXhPZihjaCkgPiAtMTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0lkU3RhcnQoY2gpIHtcbiAgICAgICAgcmV0dXJuIGNoID09PSAnJCcgfHwgY2ggPT09ICdAJyB8fCBjaCA9PT0gJ18nIHx8IChjaCA+PSAnYScgJiYgY2ggPD0gJ3onKSB8fCAoY2ggPj0gJ0EnICYmIGNoIDw9ICdaJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNJZFBhcnQoY2gpIHtcbiAgICAgICAgcmV0dXJuIGlzSWRTdGFydChjaCkgfHwgKGNoID49ICcwJyAmJiBjaCA8PSAnOScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjYW5JZCgpIHtcbiAgICAgICAgdmFyIGNoID0gcGF0aFtpZHhdO1xuXG4gICAgICAgIGlmKCFpc0lkU3RhcnQoY2gpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhcnQgPSBpZHgsXG4gICAgICAgICAgICBpZCA9IGNoO1xuXG4gICAgICAgIHdoaWxlKCsraWR4IDwgbGVuKSB7XG4gICAgICAgICAgICBjaCA9IHBhdGhbaWR4XTtcbiAgICAgICAgICAgIGlmKCFpc0lkUGFydChjaCkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkICs9IGNoO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoKGlkKSB7XG4gICAgICAgICAgICBjYXNlICd0cnVlJzpcbiAgICAgICAgICAgIGNhc2UgJ2ZhbHNlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLkJPT0wsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogaWQgPT09ICd0cnVlJyxcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeF1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjYXNlICdudWxsJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLk5VTEwsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeF1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uSUQsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogaWQsXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHhdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjYW5TdHJpbmcoKSB7XG4gICAgICAgIGlmKHBhdGhbaWR4XSAhPT0gJ1wiJyAmJiBwYXRoW2lkeF0gIT09ICdcXCcnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb3JpZyA9IHBhdGhbaWR4XSxcbiAgICAgICAgICAgIHN0YXJ0ID0gKytpZHgsXG4gICAgICAgICAgICBzdHIgPSAnJyxcbiAgICAgICAgICAgIGVvc0ZvdW5kID0gZmFsc2UsXG4gICAgICAgICAgICBjaDtcblxuICAgICAgICB3aGlsZShpZHggPCBsZW4pIHtcbiAgICAgICAgICAgIGNoID0gcGF0aFtpZHgrK107XG4gICAgICAgICAgICBpZihjaCA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgICAgY2ggPSBwYXRoW2lkeCsrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoKGNoID09PSAnXCInIHx8IGNoID09PSAnXFwnJykgJiYgY2ggPT09IG9yaWcpIHtcbiAgICAgICAgICAgICAgICBlb3NGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHIgKz0gY2g7XG4gICAgICAgIH1cblxuICAgICAgICBpZihlb3NGb3VuZCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlIDogVE9LRU4uU1RSLFxuICAgICAgICAgICAgICAgIHZhbCA6IHN0cixcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4XVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjYW5OdW1lcmljKCkge1xuICAgICAgICB2YXIgc3RhcnQgPSBpZHgsXG4gICAgICAgICAgICBjaCA9IHBhdGhbaWR4XSxcbiAgICAgICAgICAgIGlzRmxvYXQgPSBjaCA9PT0gJy4nO1xuXG4gICAgICAgIGlmKGlzRmxvYXQgfHwgaXNEaWdpdChjaCkpIHtcbiAgICAgICAgICAgIHZhciBudW0gPSBjaDtcbiAgICAgICAgICAgIHdoaWxlKCsraWR4IDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgY2ggPSBwYXRoW2lkeF07XG4gICAgICAgICAgICAgICAgaWYoY2ggPT09ICcuJykge1xuICAgICAgICAgICAgICAgICAgICBpZihpc0Zsb2F0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaXNGbG9hdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoIWlzRGlnaXQoY2gpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG51bSArPSBjaDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLk5VTSxcbiAgICAgICAgICAgICAgICB2YWwgICA6IGlzRmxvYXQ/IHBhcnNlRmxvYXQobnVtKSA6IHBhcnNlSW50KG51bSwgMTApLFxuICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHhdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2NhblB1bmN0dWF0b3IoKSB7XG4gICAgICAgIHZhciBzdGFydCA9IGlkeCxcbiAgICAgICAgICAgIGNoMSA9IHBhdGhbaWR4XSxcbiAgICAgICAgICAgIGNoMiA9IHBhdGhbaWR4ICsgMV07XG5cbiAgICAgICAgaWYoY2gxID09PSAnLicpIHtcbiAgICAgICAgICAgIGlmKGlzRGlnaXQoY2gyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhdGhbKytpZHhdID09PSAnLic/XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgICAgICB2YWwgICA6ICcuLicsXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCArK2lkeF1cbiAgICAgICAgICAgICAgICB9IDpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogJy4nLFxuICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4XVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZihjaDIgPT09ICc9Jykge1xuICAgICAgICAgICAgdmFyIGNoMyA9IHBhdGhbaWR4ICsgMl07XG4gICAgICAgICAgICBpZihjaDMgPT09ICc9Jykge1xuICAgICAgICAgICAgICAgIGlmKCc9IV4kKicuaW5kZXhPZihjaDEpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSArIGNoMiArIGNoMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHggKz0gM11cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCdeJConLmluZGV4T2YoY2gzKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYoY2gxID09PSAnPScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSArIGNoMiArIGNoMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHggKz0gM11cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCc9IV4kKj48Jy5pbmRleE9mKGNoMSkgPj0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogY2gxICsgY2gyLFxuICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4ICs9IDJdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGNoMSA9PT0gJz0nICYmICdeJConLmluZGV4T2YoY2gyKSA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgdmFsICAgOiBjaDEgKyBjaDIsXG4gICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeCArPSAyXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNoMSA9PT0gY2gyICYmIChjaDEgPT09ICd8JyB8fCBjaDEgPT09ICcmJykpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSArIGNoMixcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4ICs9IDJdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoJzp7fSgpW11eKy0qLyUhPjx8Jy5pbmRleE9mKGNoMSkgPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgIHZhbCAgIDogY2gxLFxuICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCArK2lkeF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0aHJvd1VuZXhwZWN0ZWQodG9rZW4pIHtcbiAgICAgICAgaWYodG9rZW4udHlwZSA9PT0gVE9LRU4uRU9QKSB7XG4gICAgICAgICAgICB0aHJvd0Vycm9yKHRva2VuLCBNRVNTQUdFUy5VTkVYUF9FT1ApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3dFcnJvcih0b2tlbiwgTUVTU0FHRVMuVU5FWFBfVE9LRU4sIHRva2VuLnZhbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGhyb3dFcnJvcih0b2tlbiwgbWVzc2FnZUZvcm1hdCkge1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMiksXG4gICAgICAgICAgICBtc2cgPSBtZXNzYWdlRm9ybWF0LnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgLyUoXFxkKS9nLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKF8sIGlkeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJnc1tpZHhdIHx8ICcnO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IobXNnKTtcblxuICAgICAgICBlcnJvci5jb2x1bW4gPSB0b2tlbi5yYW5nZVswXTtcblxuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2U7XG59KSgpO1xuXG4vLyB0cmFuc2xhdG9yXG5cbnZhciB0cmFuc2xhdGUgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgYm9keSwgdmFycywgbGFzdFZhcklkLCB1bnVzZWRWYXJzO1xuXG4gICAgZnVuY3Rpb24gYWNxdWlyZVZhcigpIHtcbiAgICAgICAgaWYodW51c2VkVmFycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB1bnVzZWRWYXJzLnNoaWZ0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdmFyTmFtZSA9ICd2JyArICsrbGFzdFZhcklkO1xuICAgICAgICB2YXJzLnB1c2godmFyTmFtZSk7XG4gICAgICAgIHJldHVybiB2YXJOYW1lO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbGVhc2VWYXJzKCkge1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cywgaSA9IGFyZ3MubGVuZ3RoO1xuICAgICAgICB3aGlsZShpLS0pIHtcbiAgICAgICAgICAgIHVudXNlZFZhcnMucHVzaChhcmdzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZShhc3QpIHtcbiAgICAgICAgYm9keSA9IFtdO1xuICAgICAgICB2YXJzID0gWydyZXMnXTtcbiAgICAgICAgbGFzdFZhcklkID0gMDtcbiAgICAgICAgdW51c2VkVmFycyA9IFtdO1xuXG4gICAgICAgIHRyYW5zbGF0ZUV4cHIoYXN0LCAncmVzJywgJ2RhdGEnKTtcblxuICAgICAgICBib2R5LnVuc2hpZnQoXG4gICAgICAgICAgICAndmFyICcsXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5P1xuICAgICAgICAgICAgICAgICdpc0FyciA9IEFycmF5LmlzQXJyYXknIDpcbiAgICAgICAgICAgICAgICAndG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLCBpc0FyciA9IGZ1bmN0aW9uKG8pIHsgcmV0dXJuIHRvU3RyLmNhbGwobykgPT09IFwiW29iamVjdCBBcnJheV1cIjsgfScsXG4gICAgICAgICAgICAgICAgJywgY29uY2F0ID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdCcsXG4gICAgICAgICAgICAgICAgJywnLCB2YXJzLmpvaW4oJywnKSwgJzsnKTtcblxuICAgICAgICBpZihhc3QudHlwZSA9PT0gU1lOVEFYLlBBVEgpIHtcbiAgICAgICAgICAgIHZhciBsYXN0UGFydCA9IGFzdC5wYXJ0c1thc3QucGFydHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZihsYXN0UGFydCAmJiBsYXN0UGFydC50eXBlID09PSBTWU5UQVguUE9TX1BSRUQgJiYgJ2lkeCcgaW4gbGFzdFBhcnQuYXJnKSB7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKCdyZXMgPSByZXNbMF07Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBib2R5LnB1c2goJ3JldHVybiByZXM7Jyk7XG5cbiAgICAgICAgcmV0dXJuIGJvZHkuam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlUGF0aChwYXRoLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gcGF0aC5wYXJ0cyxcbiAgICAgICAgICAgIGkgPSAwLCBsZW4gPSBwYXJ0cy5sZW5ndGg7XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgZGVzdCwgJz0nLCBwYXRoLmZyb21Sb290PyAnZGF0YScgOiBwYXRoLnN1YnN0PyAnc3Vic3QuJyArIHBhdGguc3Vic3QgOiBjdHgsICc7JyxcbiAgICAgICAgICAgICdpc0FycignICsgZGVzdCArICcpIHx8ICgnICsgZGVzdCArICcgPSBbJyArIGRlc3QgKyAnXSk7Jyk7XG5cbiAgICAgICAgd2hpbGUoaSA8IGxlbikge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBwYXJ0c1tpKytdO1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0udHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgU1lOVEFYLlNFTEVDVE9SOlxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdG9yID09PSAnLi4nP1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlRGVzY2VuZGFudFNlbGVjdG9yKGl0ZW0sIGRlc3QsIGRlc3QpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVNlbGVjdG9yKGl0ZW0sIGRlc3QsIGRlc3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgU1lOVEFYLk9CSl9QUkVEOlxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVPYmplY3RQcmVkaWNhdGUoaXRlbSwgZGVzdCwgZGVzdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBTWU5UQVguUE9TX1BSRUQ6XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVBvc1ByZWRpY2F0ZShpdGVtLCBkZXN0LCBkZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFNZTlRBWC5DT05DQVRfRVhQUjpcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlQ29uY2F0RXhwcihpdGVtLCBkZXN0LCBkZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVTZWxlY3RvcihzZWwsIGRlc3QsIGN0eCkge1xuICAgICAgICBpZihzZWwucHJvcCkge1xuICAgICAgICAgICAgdmFyIHByb3BTdHIgPSBlc2NhcGVTdHIoc2VsLnByb3ApLFxuICAgICAgICAgICAgICAgIHJlcyA9IGFjcXVpcmVWYXIoKSwgaSA9IGFjcXVpcmVWYXIoKSwgbGVuID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgICAgIGN1ckN0eCA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgICAgICBqID0gYWNxdWlyZVZhcigpLCB2YWwgPSBhY3F1aXJlVmFyKCksIHRtcEFyciA9IGFjcXVpcmVWYXIoKTtcblxuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgIHJlcywgJz0gW107JywgaSwgJz0gMDsnLCBsZW4sICc9JywgY3R4LCAnLmxlbmd0aDsnLCB0bXBBcnIsICc9IFtdOycsXG4gICAgICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuLCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgY3VyQ3R4LCAnPScsIGN0eCwgJ1snLCBpLCAnKytdOycsXG4gICAgICAgICAgICAgICAgICAgICdpZignLCBjdXJDdHgsICchPSBudWxsKSB7Jyk7XG4gICAgICAgICAgICBpZihzZWwucHJvcCA9PT0gJyonKSB7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKHR5cGVvZiAnLCBjdXJDdHgsICc9PT0gXCJvYmplY3RcIikgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKGlzQXJyKCcsIGN1ckN0eCwgJykpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMsICc9JywgcmVzLCAnLmNvbmNhdCgnLCBjdXJDdHgsICcpOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdlbHNlIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZm9yKCcsIGosICcgaW4gJywgY3VyQ3R4LCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZignLCBjdXJDdHgsICcuaGFzT3duUHJvcGVydHkoJywgaiwgJykpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCwgJz0nLCBjdXJDdHgsICdbJywgaiwgJ107Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwsICc9JywgY3VyQ3R4LCAnWycsIHByb3BTdHIsICddOycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIHZhbCwgdG1wQXJyLCBsZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgIGRlc3QsICc9JywgbGVuLCAnPiAxICYmJywgdG1wQXJyLCAnLmxlbmd0aD8nLCB0bXBBcnIsICcubGVuZ3RoID4gMT8nLFxuICAgICAgICAgICAgICAgICAgICAnY29uY2F0LmFwcGx5KCcsIHJlcywgJywnLCB0bXBBcnIsICcpIDonLCByZXMsICcuY29uY2F0KCcsIHRtcEFyciwgJ1swXSkgOicsIHJlcywgJzsnKTtcblxuICAgICAgICAgICAgcmVsZWFzZVZhcnMocmVzLCBpLCBsZW4sIGN1ckN0eCwgaiwgdmFsLCB0bXBBcnIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlRGVzY2VuZGFudFNlbGVjdG9yKHNlbCwgZGVzdCwgYmFzZUN0eCkge1xuICAgICAgICB2YXIgcHJvcCA9IHNlbC5wcm9wLFxuICAgICAgICAgICAgY3R4ID0gYWNxdWlyZVZhcigpLCBjdXJDdHggPSBhY3F1aXJlVmFyKCksIGNoaWxkQ3R4cyA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGkgPSBhY3F1aXJlVmFyKCksIGogPSBhY3F1aXJlVmFyKCksIHZhbCA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGxlbiA9IGFjcXVpcmVWYXIoKSwgcmVzID0gYWNxdWlyZVZhcigpO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgIGN0eCwgJz0nLCBiYXNlQ3R4LCAnLnNsaWNlKCksJywgcmVzLCAnPSBbXTsnLFxuICAgICAgICAgICAgJ3doaWxlKCcsIGN0eCwgJy5sZW5ndGgpIHsnLFxuICAgICAgICAgICAgICAgIGN1ckN0eCwgJz0nLCBjdHgsICcuc2hpZnQoKTsnKTtcbiAgICAgICAgcHJvcD9cbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAnaWYodHlwZW9mICcsIGN1ckN0eCwgJz09PSBcIm9iamVjdFwiICYmJywgY3VyQ3R4LCAnKSB7JykgOlxuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICdpZih0eXBlb2YgJywgY3VyQ3R4LCAnIT0gbnVsbCkgeycpO1xuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkQ3R4cywgJz0gW107JyxcbiAgICAgICAgICAgICAgICAgICAgJ2lmKGlzQXJyKCcsIGN1ckN0eCwgJykpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaSwgJz0gMCwnLCBsZW4sICc9JywgY3VyQ3R4LCAnLmxlbmd0aDsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuLCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwsICc9JywgY3VyQ3R4LCAnWycsIGksICcrK107Jyk7XG4gICAgICAgIHByb3AgJiYgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZih0eXBlb2YgJywgdmFsLCAnPT09IFwib2JqZWN0XCIpIHsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShjaGlsZEN0eHMsIHZhbCk7XG4gICAgICAgIHByb3AgJiYgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAnZWxzZSB7Jyk7XG4gICAgICAgIGlmKHByb3ApIHtcbiAgICAgICAgICAgIGlmKHByb3AgIT09ICcqJykge1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCwgJz0nLCBjdXJDdHgsICdbXCInICsgcHJvcCArICdcIl07Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVBcHBlbmRUb0FycmF5KHJlcywgdmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZUFwcGVuZFRvQXJyYXkocmVzLCBjdXJDdHgpO1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKHR5cGVvZiAnLCBjdXJDdHgsICc9PT0gXCJvYmplY3RcIikgeycpO1xuICAgICAgICB9XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmb3IoJywgaiwgJyBpbiAnLCBjdXJDdHgsICcpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWYoJywgY3VyQ3R4LCAnLmhhc093blByb3BlcnR5KCcsIGosICcpKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCwgJz0nLCBjdXJDdHgsICdbJywgaiwgJ107Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVBcHBlbmRUb0FycmF5KGNoaWxkQ3R4cywgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3AgPT09ICcqJyAmJiBpbmxpbmVBcHBlbmRUb0FycmF5KHJlcywgdmFsKTtcbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgcHJvcCB8fCBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAnfScpO1xuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRDdHhzLCAnLmxlbmd0aCAmJicsIGN0eCwgJy51bnNoaWZ0LmFwcGx5KCcsIGN0eCwgJywnLCBjaGlsZEN0eHMsICcpOycsXG4gICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgZGVzdCwgJz0nLCByZXMsICc7Jyk7XG5cbiAgICAgICAgcmVsZWFzZVZhcnMoY3R4LCBjdXJDdHgsIGNoaWxkQ3R4cywgaSwgaiwgdmFsLCBsZW4sIHJlcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlT2JqZWN0UHJlZGljYXRlKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgcmVzVmFyID0gYWNxdWlyZVZhcigpLCBpID0gYWNxdWlyZVZhcigpLCBsZW4gPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBjb25kID0gYWNxdWlyZVZhcigpLCBjdXJJdGVtID0gYWNxdWlyZVZhcigpO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgIHJlc1ZhciwgJz0gW107JyxcbiAgICAgICAgICAgIGksICc9IDA7JyxcbiAgICAgICAgICAgIGxlbiwgJz0nLCBjdHgsICcubGVuZ3RoOycsXG4gICAgICAgICAgICAnd2hpbGUoJywgaSwgJzwnLCBsZW4sICcpIHsnLFxuICAgICAgICAgICAgICAgIGN1ckl0ZW0sICc9JywgY3R4LCAnWycsIGksICcrK107Jyk7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihleHByLmFyZywgY29uZCwgY3VySXRlbSk7XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICBjb252ZXJ0VG9Cb29sKGV4cHIuYXJnLCBjb25kKSwgJyYmJywgcmVzVmFyLCAnLnB1c2goJywgY3VySXRlbSwgJyk7JyxcbiAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgIGRlc3QsICc9JywgcmVzVmFyLCAnOycpO1xuXG4gICAgICAgIHJlbGVhc2VWYXJzKHJlc1ZhciwgaSwgbGVuLCBjdXJJdGVtLCBjb25kKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVQb3NQcmVkaWNhdGUoaXRlbSwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciBhcnJheUV4cHIgPSBpdGVtLmFyZywgZnJvbUlkeCwgdG9JZHg7XG4gICAgICAgIGlmKGFycmF5RXhwci5pZHgpIHtcbiAgICAgICAgICAgIHZhciBpZHggPSBhY3F1aXJlVmFyKCk7XG4gICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFycmF5RXhwci5pZHgsIGlkeCwgY3R4KTtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICBpZHgsICc8IDAgJiYgKCcsIGlkeCwgJz0nLCBjdHgsICcubGVuZ3RoICsnLCBpZHgsICcpOycsXG4gICAgICAgICAgICAgICAgZGVzdCwgJz0nLCBjdHgsICdbJywgaWR4LCAnXSA9PSBudWxsPyBbXSA6IFsnLCBjdHgsICdbJywgaWR4LCAnXV07Jyk7XG4gICAgICAgICAgICByZWxlYXNlVmFycyhpZHgpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYXJyYXlFeHByLmZyb21JZHgpIHtcbiAgICAgICAgICAgIGlmKGFycmF5RXhwci50b0lkeCkge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJyYXlFeHByLmZyb21JZHgsIGZyb21JZHggPSBhY3F1aXJlVmFyKCksIGN0eCk7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcnJheUV4cHIudG9JZHgsIHRvSWR4ID0gYWNxdWlyZVZhcigpLCBjdHgpO1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPScsIGN0eCwgJy5zbGljZSgnLCBmcm9tSWR4LCAnLCcsIHRvSWR4LCAnKTsnKTtcbiAgICAgICAgICAgICAgICByZWxlYXNlVmFycyhmcm9tSWR4LCB0b0lkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFycmF5RXhwci5mcm9tSWR4LCBmcm9tSWR4ID0gYWNxdWlyZVZhcigpLCBjdHgpO1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPScsIGN0eCwgJy5zbGljZSgnLCBmcm9tSWR4LCAnKTsnKTtcbiAgICAgICAgICAgICAgICByZWxlYXNlVmFycyhmcm9tSWR4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJyYXlFeHByLnRvSWR4LCB0b0lkeCA9IGFjcXVpcmVWYXIoKSwgY3R4KTtcbiAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPScsIGN0eCwgJy5zbGljZSgwLCcsIHRvSWR4LCAnKTsnKTtcbiAgICAgICAgICAgIHJlbGVhc2VWYXJzKHRvSWR4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUV4cHIoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHN3aXRjaChleHByLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLlBBVEg6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlUGF0aChleHByLCBkZXN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5DT05DQVRfRVhQUjpcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVDb25jYXRFeHByKGV4cHIsIGRlc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkNPTVBBUklTT05fRVhQUjpcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVDb21wYXJpc29uRXhwcihleHByLCBkZXN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5NQVRIX0VYUFI6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlTWF0aEV4cHIoZXhwciwgZGVzdCwgY3R4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguTE9HSUNBTF9FWFBSOlxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUxvZ2ljYWxFeHByKGV4cHIsIGRlc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLlVOQVJZX0VYUFI6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlVW5hcnlFeHByKGV4cHIsIGRlc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkxJVEVSQUw6XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9Jyk7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlTGl0ZXJhbChleHByLnZhbCk7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKCc7Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVMaXRlcmFsKHZhbCkge1xuICAgICAgICBib2R5LnB1c2godHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc/IGVzY2FwZVN0cih2YWwpIDogdmFsID09PSBudWxsPyAnbnVsbCcgOiB2YWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUNvbXBhcmlzb25FeHByKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgdmFsMSA9IGFjcXVpcmVWYXIoKSwgdmFsMiA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGlzVmFsMUFycmF5ID0gYWNxdWlyZVZhcigpLCBpc1ZhbDJBcnJheSA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGkgPSBhY3F1aXJlVmFyKCksIGogPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBsZW4xID0gYWNxdWlyZVZhcigpLCBsZW4yID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgbGVmdEFyZyA9IGV4cHIuYXJnc1swXSwgcmlnaHRBcmcgPSBleHByLmFyZ3NbMV07XG5cbiAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9IGZhbHNlOycpO1xuXG4gICAgICAgIHRyYW5zbGF0ZUV4cHIobGVmdEFyZywgdmFsMSwgY3R4KTtcbiAgICAgICAgdHJhbnNsYXRlRXhwcihyaWdodEFyZywgdmFsMiwgY3R4KTtcblxuICAgICAgICB2YXIgaXNMZWZ0QXJnUGF0aCA9IGxlZnRBcmcudHlwZSA9PT0gU1lOVEFYLlBBVEgsXG4gICAgICAgICAgICBpc1JpZ2h0QXJnTGl0ZXJhbCA9IHJpZ2h0QXJnLnR5cGUgPT09IFNZTlRBWC5MSVRFUkFMO1xuXG4gICAgICAgIGJvZHkucHVzaChpc1ZhbDFBcnJheSwgJz0nKTtcbiAgICAgICAgaXNMZWZ0QXJnUGF0aD8gYm9keS5wdXNoKCd0cnVlOycpIDogYm9keS5wdXNoKCdpc0FycignLCB2YWwxLCAnKTsnKTtcblxuICAgICAgICBib2R5LnB1c2goaXNWYWwyQXJyYXksICc9Jyk7XG4gICAgICAgIGlzUmlnaHRBcmdMaXRlcmFsPyBib2R5LnB1c2goJ2ZhbHNlOycpIDogYm9keS5wdXNoKCdpc0FycignLCB2YWwyLCAnKTsnKTtcblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAnaWYoJyk7XG4gICAgICAgIGlzTGVmdEFyZ1BhdGggfHwgYm9keS5wdXNoKGlzVmFsMUFycmF5LCAnJiYnKTtcbiAgICAgICAgYm9keS5wdXNoKHZhbDEsICcubGVuZ3RoID09PSAxKSB7JyxcbiAgICAgICAgICAgICAgICB2YWwxLCAnPScsIHZhbDEsICdbMF07JyxcbiAgICAgICAgICAgICAgICBpc1ZhbDFBcnJheSwgJz0gZmFsc2U7JyxcbiAgICAgICAgICAgICd9Jyk7XG4gICAgICAgIGlzUmlnaHRBcmdMaXRlcmFsIHx8IGJvZHkucHVzaChcbiAgICAgICAgICAgICdpZignLCBpc1ZhbDJBcnJheSwgJyYmJywgdmFsMiwgJy5sZW5ndGggPT09IDEpIHsnLFxuICAgICAgICAgICAgICAgIHZhbDIsICc9JywgdmFsMiwgJ1swXTsnLFxuICAgICAgICAgICAgICAgIGlzVmFsMkFycmF5LCAnPSBmYWxzZTsnLFxuICAgICAgICAgICAgJ30nKTtcblxuICAgICAgICBib2R5LnB1c2goaSwgJz0gMDsnLFxuICAgICAgICAgICAgJ2lmKCcsIGlzVmFsMUFycmF5LCAnKSB7JyxcbiAgICAgICAgICAgICAgICBsZW4xLCAnPScsIHZhbDEsICcubGVuZ3RoOycpO1xuXG4gICAgICAgIGlmKCFpc1JpZ2h0QXJnTGl0ZXJhbCkge1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICdpZignLCBpc1ZhbDJBcnJheSwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgIGxlbjIsICc9JywgdmFsMiwgJy5sZW5ndGg7JyxcbiAgICAgICAgICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuMSwgJyYmICEnLCBkZXN0LCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGosICc9IDA7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd3aGlsZSgnLCBqLCAnPCcsIGxlbjIsICcpIHsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUNvbmRpdGlvbihleHByLm9wLCBbdmFsMSwgJ1snLCBpLCAnXSddLmpvaW4oJycpLCBbdmFsMiwgJ1snLCBqLCAnXSddLmpvaW4oJycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3QsICc9IHRydWU7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JyZWFrOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcrKycsIGosICc7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICcrKycsIGksICc7JyxcbiAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAnZWxzZSB7Jyk7XG4gICAgICAgIH1cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAnd2hpbGUoJywgaSwgJzwnLCBsZW4xLCAnKSB7Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUNvbmRpdGlvbihleHByLm9wLCBbdmFsMSwgJ1snLCBpLCAnXSddLmpvaW4oJycpLCB2YWwyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0LCAnPSB0cnVlOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JyZWFrOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnKysnLCBpLCAnOycsXG4gICAgICAgICAgICAgICAgICAgICd9Jyk7XG5cbiAgICAgICAgaXNSaWdodEFyZ0xpdGVyYWwgfHwgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICd9Jyk7XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgJ30nKTtcblxuICAgICAgICBpZighaXNSaWdodEFyZ0xpdGVyYWwpIHtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICdlbHNlIGlmKCcsIGlzVmFsMkFycmF5LCcpIHsnLFxuICAgICAgICAgICAgICAgIGxlbjIsICc9JywgdmFsMiwgJy5sZW5ndGg7JyxcbiAgICAgICAgICAgICAgICAnd2hpbGUoJywgaSwgJzwnLCBsZW4yLCAnKSB7Jyk7XG4gICAgICAgICAgICAgICAgICAgIHdyaXRlQ29uZGl0aW9uKGV4cHIub3AsIHZhbDEsIFt2YWwyLCAnWycsIGksICddJ10uam9pbignJykpO1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdCwgJz0gdHJ1ZTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2JyZWFrOycsXG4gICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgJysrJywgaSwgJzsnLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICd9Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAnZWxzZSB7JyxcbiAgICAgICAgICAgICAgICBkZXN0LCAnPScsIGJpbmFyeU9wZXJhdG9yc1tleHByLm9wXSh2YWwxLCB2YWwyKSwgJzsnLFxuICAgICAgICAgICAgJ30nKTtcblxuICAgICAgICByZWxlYXNlVmFycyh2YWwxLCB2YWwyLCBpc1ZhbDFBcnJheSwgaXNWYWwyQXJyYXksIGksIGosIGxlbjEsIGxlbjIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdyaXRlQ29uZGl0aW9uKG9wLCB2YWwxRXhwciwgdmFsMkV4cHIpIHtcbiAgICAgICAgYm9keS5wdXNoKCdpZignLCBiaW5hcnlPcGVyYXRvcnNbb3BdKHZhbDFFeHByLCB2YWwyRXhwciksICcpIHsnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVMb2dpY2FsRXhwcihleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIGNvbmRpdGlvblZhcnMgPSBbXSxcbiAgICAgICAgICAgIGFyZ3MgPSBleHByLmFyZ3MsIGxlbiA9IGFyZ3MubGVuZ3RoLFxuICAgICAgICAgICAgaSA9IDAsIHZhbDtcblxuICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0gZmFsc2U7Jyk7XG4gICAgICAgIHN3aXRjaChleHByLm9wKSB7XG4gICAgICAgICAgICBjYXNlICcmJic6XG4gICAgICAgICAgICAgICAgd2hpbGUoaSA8IGxlbikge1xuICAgICAgICAgICAgICAgICAgICBjb25kaXRpb25WYXJzLnB1c2godmFsID0gYWNxdWlyZVZhcigpKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcmdzW2ldLCB2YWwsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaCgnaWYoJywgY29udmVydFRvQm9vbChhcmdzW2krK10sIHZhbCksICcpIHsnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9IHRydWU7Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3x8JzpcbiAgICAgICAgICAgICAgICB3aGlsZShpIDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvblZhcnMucHVzaCh2YWwgPSBhY3F1aXJlVmFyKCkpO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFyZ3NbaV0sIHZhbCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKCcsIGNvbnZlcnRUb0Jvb2woYXJnc1tpXSwgdmFsKSwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdCwgJz0gdHJ1ZTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoaSsrICsgMSA8IGxlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5wdXNoKCdlbHNlIHsnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAtLWxlbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlKGxlbi0tKSB7XG4gICAgICAgICAgICBib2R5LnB1c2goJ30nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbGVhc2VWYXJzLmFwcGx5KG51bGwsIGNvbmRpdGlvblZhcnMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZU1hdGhFeHByKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgdmFsMSA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIHZhbDIgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBhcmdzID0gZXhwci5hcmdzO1xuXG4gICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnc1swXSwgdmFsMSwgY3R4KTtcbiAgICAgICAgdHJhbnNsYXRlRXhwcihhcmdzWzFdLCB2YWwyLCBjdHgpO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgIGRlc3QsICc9JyxcbiAgICAgICAgICAgIGJpbmFyeU9wZXJhdG9yc1tleHByLm9wXShcbiAgICAgICAgICAgICAgICBjb252ZXJ0VG9TaW5nbGVWYWx1ZShhcmdzWzBdLCB2YWwxKSxcbiAgICAgICAgICAgICAgICBjb252ZXJ0VG9TaW5nbGVWYWx1ZShhcmdzWzFdLCB2YWwyKSksXG4gICAgICAgICAgICAnOycpO1xuXG4gICAgICAgIHJlbGVhc2VWYXJzKHZhbDEsIHZhbDIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZVVuYXJ5RXhwcihleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGFyZyA9IGV4cHIuYXJnO1xuXG4gICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnLCB2YWwsIGN0eCk7XG5cbiAgICAgICAgc3dpdGNoKGV4cHIub3ApIHtcbiAgICAgICAgICAgIGNhc2UgJyEnOlxuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPSAhJywgY29udmVydFRvQm9vbChhcmcsIHZhbCkgKyAnOycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICctJzpcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0gLScsIGNvbnZlcnRUb1NpbmdsZVZhbHVlKGFyZywgdmFsKSArICc7Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZWxlYXNlVmFycyh2YWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUNvbmNhdEV4cHIoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciBhcmdWYXJzID0gW10sXG4gICAgICAgICAgICBhcmdzID0gZXhwci5hcmdzLFxuICAgICAgICAgICAgbGVuID0gYXJncy5sZW5ndGgsXG4gICAgICAgICAgICBpID0gMDtcblxuICAgICAgICB3aGlsZShpIDwgbGVuKSB7XG4gICAgICAgICAgICBhcmdWYXJzLnB1c2goYWNxdWlyZVZhcigpKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnc1tpXSwgYXJnVmFyc1tpKytdLCBjdHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9IGNvbmNhdC5jYWxsKCcsIGFyZ1ZhcnMuam9pbignLCcpLCAnKTsnKTtcblxuICAgICAgICByZWxlYXNlVmFycy5hcHBseShudWxsLCBhcmdWYXJzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlc2NhcGVTdHIocykge1xuICAgICAgICByZXR1cm4gJ1xcJycgKyBzLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJykucmVwbGFjZSgvJy9nLCAnXFxcXFxcJycpICsgJ1xcJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIHZhbCwgdG1wQXJyLCBsZW4pIHtcbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgJ2lmKHR5cGVvZiAnLCB2YWwsICchPT0gXCJ1bmRlZmluZWRcIikgeycsXG4gICAgICAgICAgICAgICAgJ2lmKGlzQXJyKCcsIHZhbCwgJykpIHsnKTtcbiAgICAgICAgaWYodG1wQXJyKSB7XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgIGxlbiwgJz4gMT8nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZVB1c2hUb0FycmF5KHRtcEFyciwgdmFsKTtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICc6Jyk7XG4gICAgICAgIH1cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICByZXMsICc9JywgcmVzLCAnLmxlbmd0aD8nLCByZXMsICcuY29uY2F0KCcsIHZhbCwgJykgOicsIHZhbCwgJy5zbGljZSgpJywgJzsnLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAnZWxzZSB7Jyk7XG4gICAgICAgIHRtcEFyciAmJiBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICdpZignLCB0bXBBcnIsICcubGVuZ3RoKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcywgJz0gY29uY2F0LmFwcGx5KCcsIHJlcywgJywnLCB0bXBBcnIsICcpOycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBBcnIsICc9IFtdOycsXG4gICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlubGluZVB1c2hUb0FycmF5KHJlcywgdmFsKTtcbiAgICAgICAgYm9keS5wdXNoKCc7JyxcbiAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAnfScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlubGluZVB1c2hUb0FycmF5KHJlcywgdmFsKSB7XG4gICAgICAgIGJvZHkucHVzaChyZXMsICcubGVuZ3RoPycsIHJlcywgJy5wdXNoKCcsIHZhbCwgJykgOicsICByZXMsICdbMF0gPScsIHZhbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29udmVydFRvQm9vbChhcmcsIHZhck5hbWUpIHtcbiAgICAgICAgc3dpdGNoKGFyZy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5MT0dJQ0FMX0VYUFI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhck5hbWU7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkxJVEVSQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICchIScgKyB2YXJOYW1lO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5QQVRIOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YXJOYW1lICsgJy5sZW5ndGggPiAwJztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gWycodHlwZW9mICcsIHZhck5hbWUsICc9PT0gXCJib29sZWFuXCI/JyxcbiAgICAgICAgICAgICAgICAgICAgdmFyTmFtZSwgJzonLFxuICAgICAgICAgICAgICAgICAgICAnaXNBcnIoJywgdmFyTmFtZSwgJyk/JywgdmFyTmFtZSwgJy5sZW5ndGggPiAwIDogISEnLCB2YXJOYW1lLCAnKSddLmpvaW4oJycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29udmVydFRvU2luZ2xlVmFsdWUoYXJnLCB2YXJOYW1lKSB7XG4gICAgICAgIHN3aXRjaChhcmcudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTWU5UQVguTElURVJBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyTmFtZTtcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguUEFUSDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyTmFtZSArICdbMF0nO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBbJyhpc0FycignLCB2YXJOYW1lLCAnKT8nLCB2YXJOYW1lLCAnWzBdIDogJywgdmFyTmFtZSwgJyknXS5qb2luKCcnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0YXJ0c1dpdGhTdHJpY3QodmFsMSwgdmFsMikge1xuICAgICAgICByZXR1cm4gWyd0eXBlb2YgJywgdmFsMSwgJz09PSBcInN0cmluZ1wiICYmIHR5cGVvZiAnLCB2YWwyLCAnPT09IFwic3RyaW5nXCIgJiYnLFxuICAgICAgICAgICAgdmFsMSwgJy5pbmRleE9mKCcsIHZhbDIsICcpID09PSAwJ10uam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RhcnRzV2l0aCh2YWwxLCB2YWwyKSB7XG4gICAgICAgIHJldHVybiBbdmFsMSwgJyE9IG51bGwgJiYnLCB2YWwyLCAnIT0gbnVsbCAmJicsXG4gICAgICAgICAgICB2YWwxLCAnLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKCcsIHZhbDIsICcudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSA9PT0gMCddLmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZHNXaXRoU3RyaWN0KHZhbDEsIHZhbDIpIHtcbiAgICAgICAgcmV0dXJuIFsndHlwZW9mICcsIHZhbDEsICc9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgJywgdmFsMiwgJz09PSBcInN0cmluZ1wiICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcubGVuZ3RoID49JywgdmFsMiwgJy5sZW5ndGggJiYnLFxuICAgICAgICAgICAgdmFsMSwgJy5sYXN0SW5kZXhPZignLCB2YWwyLCAnKSA9PT0nLCB2YWwxLCAnLmxlbmd0aCAtJywgdmFsMiwgJy5sZW5ndGgnXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRzV2l0aCh2YWwxLCB2YWwyKSB7XG4gICAgICAgIHJldHVybiBbdmFsMSwgJyE9IG51bGwgJiYnLCB2YWwyLCAnIT0gbnVsbCAmJicsXG4gICAgICAgICAgICAnKCcsIHZhbDEsICc9JywgdmFsMSwgJy50b1N0cmluZygpKS5sZW5ndGggPj0nLCAnKCcsIHZhbDIsICc9JywgdmFsMiwgJy50b1N0cmluZygpKS5sZW5ndGggJiYnLFxuICAgICAgICAgICAgJygnLCB2YWwxLCAnLnRvTG93ZXJDYXNlKCkpLmxhc3RJbmRleE9mKCcsICcoJywgdmFsMiwgJy50b0xvd2VyQ2FzZSgpKSkgPT09JyxcbiAgICAgICAgICAgIHZhbDEsICcubGVuZ3RoIC0nLCB2YWwyLCAnLmxlbmd0aCddLmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbnRhaW5zU3RyaWN0KHZhbDEsIHZhbDIpIHtcbiAgICAgICAgcmV0dXJuIFsndHlwZW9mICcsIHZhbDEsICc9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgJywgdmFsMiwgJz09PSBcInN0cmluZ1wiICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcuaW5kZXhPZignLCB2YWwyLCAnKSA+IC0xJ10uam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29udGFpbnModmFsMSwgdmFsMikge1xuICAgICAgICByZXR1cm4gW3ZhbDEsICchPSBudWxsICYmICcsIHZhbDIsICchPSBudWxsICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJywgdmFsMiwgJy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkpID4gLTEnXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICB2YXIgYmluYXJ5T3BlcmF0b3JzID0ge1xuICAgICAgICAgICAgJz09PScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnPT09JyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnPT0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBbJ3R5cGVvZiAnLCB2YWwxLCAnPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mICcsIHZhbDIsICc9PT0gXCJzdHJpbmdcIj8nLFxuICAgICAgICAgICAgICAgICAgICB2YWwxLCAnLnRvTG93ZXJDYXNlKCkgPT09JywgdmFsMiwgJy50b0xvd2VyQ2FzZSgpIDonICtcbiAgICAgICAgICAgICAgICAgICAgdmFsMSwgJz09JywgdmFsMl0uam9pbignJyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnPj0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJz49JyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnPicgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnPicgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJzw9JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICc8PScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJzwnIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJzwnICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICchPT0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJyE9PScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyE9JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICchPScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJ149PScgOiBzdGFydHNXaXRoU3RyaWN0LFxuXG4gICAgICAgICAgICAnPT1eJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhcnRzV2l0aFN0cmljdCh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICdePScgOiBzdGFydHNXaXRoLFxuXG4gICAgICAgICAgICAnPV4nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGFydHNXaXRoKHZhbDIsIHZhbDEpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyQ9PScgOiBlbmRzV2l0aFN0cmljdCxcblxuICAgICAgICAgICAgJz09JCcgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVuZHNXaXRoU3RyaWN0KHZhbDIsIHZhbDEpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyQ9JyA6IGVuZHNXaXRoLFxuXG4gICAgICAgICAgICAnPSQnIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbmRzV2l0aCh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICcqPT0nIDogY29udGFpbnNTdHJpY3QsXG5cbiAgICAgICAgICAgICc9PSonIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluc1N0cmljdCh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICc9KicgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5zKHZhbDIsIHZhbDEpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyo9JyA6IGNvbnRhaW5zLFxuXG4gICAgICAgICAgICAnKycgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnKycgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJy0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJy0nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICcqJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICcqJyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnLycgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnLycgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyUnIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJyUnICsgdmFsMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIHJldHVybiB0cmFuc2xhdGU7XG59KSgpO1xuXG5mdW5jdGlvbiBjb21waWxlKHBhdGgpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24oJ2RhdGEsc3Vic3QnLCB0cmFuc2xhdGUocGFyc2UocGF0aCkpKTtcbn1cblxudmFyIGNhY2hlID0ge30sXG4gICAgY2FjaGVLZXlzID0gW10sXG4gICAgcGFyYW1zID0ge1xuICAgICAgICBjYWNoZVNpemUgOiAxMDBcbiAgICB9LFxuICAgIHNldFBhcmFtc0hvb2tzID0ge1xuICAgICAgICBjYWNoZVNpemUgOiBmdW5jdGlvbihvbGRWYWwsIG5ld1ZhbCkge1xuICAgICAgICAgICAgaWYobmV3VmFsIDwgb2xkVmFsICYmIGNhY2hlS2V5cy5sZW5ndGggPiBuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlZEtleXMgPSBjYWNoZUtleXMuc3BsaWNlKDAsIGNhY2hlS2V5cy5sZW5ndGggLSBuZXdWYWwpLFxuICAgICAgICAgICAgICAgICAgICBpID0gcmVtb3ZlZEtleXMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgd2hpbGUoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYWNoZVtyZW1vdmVkS2V5c1tpXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxudmFyIGRlY2wgPSBmdW5jdGlvbihwYXRoLCBjdHgsIHN1YnN0cykge1xuICAgIGlmKCFjYWNoZVtwYXRoXSkge1xuICAgICAgICBjYWNoZVtwYXRoXSA9IGNvbXBpbGUocGF0aCk7XG4gICAgICAgIGlmKGNhY2hlS2V5cy5wdXNoKHBhdGgpID4gcGFyYW1zLmNhY2hlU2l6ZSkge1xuICAgICAgICAgICAgZGVsZXRlIGNhY2hlW2NhY2hlS2V5cy5zaGlmdCgpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjYWNoZVtwYXRoXShjdHgsIHN1YnN0cyB8fCB7fSk7XG59O1xuXG5kZWNsLnZlcnNpb24gPSAnMC40LjAnO1xuXG5kZWNsLnBhcmFtcyA9IGZ1bmN0aW9uKF9wYXJhbXMpIHtcbiAgICBpZighYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cblxuICAgIGZvcih2YXIgbmFtZSBpbiBfcGFyYW1zKSB7XG4gICAgICAgIGlmKF9wYXJhbXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICAgICAgICAgIHNldFBhcmFtc0hvb2tzW25hbWVdICYmIHNldFBhcmFtc0hvb2tzW25hbWVdKHBhcmFtc1tuYW1lXSwgX3BhcmFtc1tuYW1lXSk7XG4gICAgICAgICAgICBwYXJhbXNbbmFtZV0gPSBfcGFyYW1zW25hbWVdO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZGVjbC5jb21waWxlID0gY29tcGlsZTtcblxuZGVjbC5hcHBseSA9IGRlY2w7XG5cbmlmKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRlY2w7XG59XG5lbHNlIGlmKHR5cGVvZiBtb2R1bGVzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZXMuZGVmaW5lKCdqc3BhdGgnLCBmdW5jdGlvbihwcm92aWRlKSB7XG4gICAgICAgIHByb3ZpZGUoZGVjbCk7XG4gICAgfSk7XG59XG5lbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24ocmVxdWlyZSwgZXhwb3J0cywgbW9kdWxlKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZGVjbDtcbiAgICB9KTtcbn1cbmVsc2Uge1xuICAgIHdpbmRvdy5KU1BhdGggPSBkZWNsO1xufVxuXG59KSgpO1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBFUzYgRVhURU5TSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pZighU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoKVxue1xuXHRTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGggPSBmdW5jdGlvbihzKVxuXHR7XG5cdFx0Y29uc3QgYmFzZSA9IDB4MDAwMDAwMDAwMDAwMDAwMDAwMDA7XG5cblx0XHRyZXR1cm4gdGhpcy5pbmRleE9mKHMsIGJhc2UpID09PSBiYXNlO1xuXHR9O1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaWYoIVN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGgpXG57XG5cdFN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGggPSBmdW5jdGlvbihzKVxuXHR7XG5cdFx0Y29uc3QgYmFzZSA9IHRoaXMubGVuZ3RoIC0gcy5sZW5ndGg7XG5cblx0XHRyZXR1cm4gdGhpcy5pbmRleE9mKHMsIGJhc2UpID09PSBiYXNlO1xuXHR9O1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEpRVUVSWSBFWFRFTlNJT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbnZhciBfYW1pX2ludGVybmFsX2pRdWVyeUVhY2ggPSBqUXVlcnkuZWFjaDtcbnZhciBfYW1pX2ludGVybmFsX2pRdWVyeUFqYXggPSBqUXVlcnkuYWpheDtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmpRdWVyeS5lYWNoID0gZnVuY3Rpb24oZWwsIGNhbGxiYWNrLCBjb250ZXh0KVxue1xuXHRyZXR1cm4gX2FtaV9pbnRlcm5hbF9qUXVlcnlFYWNoKGVsLCBjb250ZXh0ID8gKGluZGV4LCB2YWx1ZSkgPT4gY2FsbGJhY2suY2FsbChjb250ZXh0LCBpbmRleCwgdmFsdWUpIDogY2FsbGJhY2spO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmpRdWVyeS5hamF4ID0gZnVuY3Rpb24oc2V0dGluZ3MpXG57XG5cdGlmKHR5cGVvZiBzZXR0aW5ncyA9PT0gJ29iamVjdCdcblx0ICAgJiZcblx0ICAgc2V0dGluZ3MuZGF0YVR5cGUgPT09ICdzaGVldCdcblx0ICkge1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0LCB1cmxdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0JywgJ3VybCddLFxuXHRcdFx0W3Jlc3VsdCwgJyddLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpXG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih1cmwpXG5cdFx0e1xuXHRcdFx0JCgnaGVhZCcpLmFwcGVuZCgnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCInICsgdXJsICsgJ1wiPjwvbGluaz4nKS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0KTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fVxuXHRlbHNlXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gX2FtaV9pbnRlcm5hbF9qUXVlcnlBamF4LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH1cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmaW5kV2l0aFNlbGY6IGZ1bmN0aW9uKHNlbGVjdG9yKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZmluZChzZWxlY3RvcikuYWRkQmFjayhzZWxlY3Rvcik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXJpYWxpemVPYmplY3Q6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IHt9O1xuXG5cdFx0dGhpcy5zZXJpYWxpemVBcnJheSgpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0aWYoaXRlbS5uYW1lIGluIHJlc3VsdClcblx0XHRcdHtcblx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHJlc3VsdFtpdGVtLm5hbWVdKSA9PT0gJ1tvYmplY3QgU3RyaW5nXScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHRbaXRlbS5uYW1lXSA9IFtyZXN1bHRbaXRlbS5uYW1lXV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXN1bHRbaXRlbS5uYW1lXS5wdXNoKGl0ZW0udmFsdWUgfHwgJycpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHRbaXRlbS5uYW1lXSA9IGl0ZW0udmFsdWUgfHwgJyc7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBCT09UU1RSQVAgRVhURU5TSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG52YXIgX2FtaV9pbnRlcm5hbF9tb2RhbFpJbmRleCA9IDEwNTA7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kKGRvY3VtZW50KS5vbignc2hvdy5icy5tb2RhbCcsICcubW9kYWwnLCAoZSkgPT4ge1xuXG5cdGNvbnN0IGVsID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXG5cdHNldFRpbWVvdXQoKCkgPT4ge1xuXG5cdFx0JCgnYm9keSA+IC5tb2RhbC1iYWNrZHJvcDpsYXN0JykuY3NzKCd6LWluZGV4JywgX2FtaV9pbnRlcm5hbF9tb2RhbFpJbmRleCsrKTtcblx0XHQvKi0tLS0tLS0tLS0tKi9lbC8qLS0tLS0tLS0tLS0qLy5jc3MoJ3otaW5kZXgnLCBfYW1pX2ludGVybmFsX21vZGFsWkluZGV4KyspO1xuXG5cdH0sIDEwKTtcbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qXG4kKGRvY3VtZW50KS5vbignc2hvdy5icy5kcm9wZG93bicsICcuZHJvcGRvd24nLCAoZSkgPT4ge1xuXG5cdGNvbnN0IGVsID0gJChlLmN1cnJlbnRUYXJnZXQpO1xufSk7XG4qL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIE5BTUVTUEFDRSBIRUxQRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIF8kY3JlYXRlTmFtZXNwYWNlKCRuYW1lLCB4KVxue1xuXHRsZXQgcGFyZW50ID0gd2luZG93O1xuXG5cdGNvbnN0IHBhcnRzID0gJG5hbWUuc3BsaXQoL1xccypcXC5cXHMqL2cpLCBsID0gcGFydHMubGVuZ3RoIC0gMTtcblxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbDsgaSsrKVxuXHR7XG5cdFx0aWYocGFyZW50W3BhcnRzW2ldXSlcblx0XHR7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cGFyZW50ID0gcGFyZW50W3BhcnRzW2ldXSA9IHt9O1xuXHRcdH1cblx0fVxuXG5cdHBhcmVudFtwYXJ0c1tpXV0gPSB4O1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZnVuY3Rpb24gXyRhZGRUb05hbWVzcGFjZSgkbmFtZSwgeClcbntcblx0bGV0IHBhcmVudCA9IHdpbmRvdztcblxuXHRjb25zdCBwYXJ0cyA9ICRuYW1lLnNwbGl0KC9cXHMqXFwuXFxzKi9nKSwgbCA9IHBhcnRzLmxlbmd0aCAtIDE7XG5cblx0Zm9yKHZhciBpID0gMDsgaSA8IGw7IGkrKylcblx0e1xuXHRcdGlmKHBhcmVudFtwYXJ0c1tpXV0pXG5cdFx0e1xuXHRcdFx0cGFyZW50ID0gcGFyZW50W3BhcnRzW2ldXTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRocm93ICdgJyArICRuYW1lICsgJ2AgKGAnICsgcGFydHNbaV0gKyAnYCkgbm90IGRlY2xhcmVkJztcblx0XHR9XG5cdH1cblxuXHRwYXJlbnRbcGFydHNbaV1dID0geDtcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBOQU1FU1BBQ0VTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAgKiBDcmVhdGUgYSBuZXcgbmFtZXNwYWNlXG4gICogQHBhcmFtIHtTdHJpbmd9ICRuYW1lIHRoZSBuYW1lc3BhY2UgbmFtZVxuICAqIEBwYXJhbSB7T2JqZWN0fSBbJGRlc2NyXSB0aGUgbmFtZXNwYWNlIGJvZHlcbiAgKi9cblxuZnVuY3Rpb24gJEFNSU5hbWVzcGFjZSgkbmFtZSwgJGRlc2NyKVxue1xuXHRpZighJGRlc2NyKVxuXHR7XG5cdFx0JGRlc2NyID0ge307XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRkZXNjci4kbmFtZSA9ICRuYW1lO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XyRjcmVhdGVOYW1lc3BhY2UoJG5hbWUsICRkZXNjcik7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpZigkZGVzY3IuJClcblx0e1xuXHRcdCRkZXNjci4kLmFwcGx5KCRkZXNjcik7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIElOVEVSRkFDRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICAqIENyZWF0ZSBhIG5ldyBpbnRlcmZhY2VcbiAgKiBAcGFyYW0ge1N0cmluZ30gJG5hbWUgdGhlIGludGVyZmFjZSBuYW1lXG4gICogQHBhcmFtIHtPYmplY3R9IFskZGVzY3JdIHRoZSBpbnRlcmZhY2UgYm9keVxuICAqL1xuXG5mdW5jdGlvbiAkQU1JSW50ZXJmYWNlKCRuYW1lLCAkZGVzY3IpXG57XG5cdGlmKCEkZGVzY3IpXG5cdHtcblx0XHQkZGVzY3IgPSB7fTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y29uc3QgJGNsYXNzID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhyb3cgJ2NvdWxkIG5vciBpbnN0YW50aWF0ZSBpbnRlcmZhY2UnO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0aWYoJGRlc2NyLiRleHRlbmRzKVxuXHR7XG5cdFx0dGhyb3cgJ2AkZXh0ZW5kc2Agbm90IGFsbG93ZWQgZm9yIGludGVyZmFjZSc7XG5cdH1cblxuXHRpZigkZGVzY3IuJGltcGxlbWVudHMpXG5cdHtcblx0XHR0aHJvdyAnYCRpbXBsZW1lbnRzYCBub3QgYWxsb3dlZCBmb3IgaW50ZXJmYWNlJztcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0aWYoJGRlc2NyLiQpXG5cdHtcblx0XHR0aHJvdyAnYCRgIG5vdCBhbGxvd2VkIGZvciBpbnRlcmZhY2UnO1xuXHR9XG5cblx0aWYoJGRlc2NyLiRpbml0KVxuXHR7XG5cdFx0dGhyb3cgJ2AkaW5pdGAgbm90IGFsbG93ZWQgZm9yIGludGVyZmFjZSc7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRjbGFzcy4kbmFtZSA9ICRuYW1lO1xuXHQkY2xhc3MuJGNsYXNzID0gJGNsYXNzO1xuXHQkY2xhc3MuJG1lbWJlcnMgPSAkZGVzY3I7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfJGFkZFRvTmFtZXNwYWNlKCRuYW1lLCAkY2xhc3MpO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogQ0xBU1NFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gICogQ3JlYXRlIGEgbmV3IGNsYXNzXG4gICogQHBhcmFtIHtTdHJpbmd9ICRuYW1lIHRoZSBjbGFzcyBuYW1lXG4gICogQHBhcmFtIHtPYmplY3R9IFskZGVzY3JdIHRoZSBjbGFzcyBib2R5XG4gICovXG5cbmZ1bmN0aW9uICRBTUlDbGFzcygkbmFtZSwgJGRlc2NyKVxue1xuXHRpZighJGRlc2NyKVxuXHR7XG5cdFx0JGRlc2NyID0ge307XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNvbnN0ICRzdXBlciA9ICgkZGVzY3IuJGV4dGVuZHMgaW5zdGFuY2VvZiBGdW5jdGlvbikgPyAkZGVzY3IuJGV4dGVuZHMucHJvdG90eXBlIDoge307XG5cblx0Y29uc3QgJHN1cGVyX2ltcGxlbWVudHMgPSAoJHN1cGVyLiRpbXBsZW1lbnRzIGluc3RhbmNlb2YgQXJyYXkpID8gJHN1cGVyLiRpbXBsZW1lbnRzIDogW107XG5cdGNvbnN0ICRkZXNjcl9pbXBsZW1lbnRzID0gKCRkZXNjci4kaW1wbGVtZW50cyBpbnN0YW5jZW9mIEFycmF5KSA/ICRkZXNjci4kaW1wbGVtZW50cyA6IFtdO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y29uc3QgJGNsYXNzID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Zm9yKGNvbnN0IGkgaW4gdGhpcy4kaW1wbGVtZW50cylcblx0XHR7XG5cdFx0XHRpZih0aGlzLiRpbXBsZW1lbnRzLmhhc093blByb3BlcnR5KGkpKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCAkaW50ZXJmYWNlID0gdGhpcy4kaW1wbGVtZW50c1tpXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaiBpbiAkaW50ZXJmYWNlLiRtZW1iZXJzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoJGludGVyZmFjZS4kbWVtYmVycy5oYXNPd25Qcm9wZXJ0eShqKSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRjb25zdCAkbWVtYmVyID0gJGludGVyZmFjZS4kbWVtYmVyc1tqXTtcblxuXHRcdFx0XHRcdFx0aWYodHlwZW9mKHRoaXNbal0pICE9PSB0eXBlb2YoJG1lbWJlcikpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRocm93ICdjbGFzcyBgJyArIHRoaXMuJG5hbWUgKyAnYCB3aXRoIG11c3QgaW1wbGVtZW50IGAnICsgJGludGVyZmFjZS4kbmFtZSArICcuJyArIGogKyAnYCc7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgX3N1cGVyID0gdGhpcy4kY2xhc3MuX2ludGVybmFsX3N1cGVyO1xuXHRcdGNvbnN0IF9hZGRlZCA9IHRoaXMuJGNsYXNzLl9pbnRlcm5hbF9hZGRlZDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuJHN1cGVyID0ge307XG5cblx0XHRmb3IoY29uc3QgbmFtZSBpbiBfc3VwZXIpXG5cdFx0e1xuXHRcdFx0aWYoX3N1cGVyLmhhc093blByb3BlcnR5KG5hbWUpKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLiRzdXBlcltuYW1lXSA9ICgoX3N1cGVyLCBuYW1lLCB0aGF0KSA9PiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdHJldHVybiBfc3VwZXJbbmFtZV0uYXBwbHkodGhhdCwgYXJndW1lbnRzKVxuXG5cdFx0XHRcdH0pKF9zdXBlciwgbmFtZSwgdGhpcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy4kYWRkZWQgPSB7fTtcblxuXHRcdGZvcihjb25zdCBuYW1lIGluIF9hZGRlZClcblx0XHR7XG5cdFx0XHRpZihfYWRkZWQuaGFzT3duUHJvcGVydHkobmFtZSkpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuJGFkZGVkW25hbWVdID0gKChfYWRkZWQsIG5hbWUsIHRoYXQpID0+IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0cmV0dXJuIF9hZGRlZFtuYW1lXS5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuXG5cdFx0XHRcdH0pKF9hZGRlZCwgbmFtZSwgdGhpcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy4kaW5pdClcblx0XHR7XG5cdFx0XHR0aGlzLiRpbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGNsYXNzLl9pbnRlcm5hbF9zdXBlciA9IHt9O1xuXHQkY2xhc3MuX2ludGVybmFsX2FkZGVkID0ge307XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3IoY29uc3QgbmFtZSBpbiAkc3VwZXIpXG5cdHtcblx0XHRpZihuYW1lID09PSAnJGluaXQnXG5cdFx0ICAgfHxcblx0XHQgICBuYW1lLmNoYXJBdCgwKSAhPT0gJyQnXG5cdFx0ICAgfHxcblx0XHQgICAkc3VwZXIuaGFzT3duUHJvcGVydHkobmFtZSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcblx0XHQgKSB7XG5cdFx0XHQkY2xhc3MuX2ludGVybmFsX3N1cGVyW25hbWVdID0gJHN1cGVyW25hbWVdO1xuXG5cdFx0XHQkY2xhc3MucHJvdG90eXBlW25hbWVdID0gJHN1cGVyW25hbWVdO1xuXHRcdH1cblx0fVxuXG5cdGZvcihjb25zdCBuYW1lIGluICRkZXNjcilcblx0e1xuXHRcdGlmKG5hbWUgPT09ICckaW5pdCdcblx0XHQgICB8fFxuXHRcdCAgIG5hbWUuY2hhckF0KDApICE9PSAnJCdcblx0XHQgICB8fFxuXHRcdCAgICRkZXNjci5oYXNPd25Qcm9wZXJ0eShuYW1lKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuXHRcdCApIHtcblx0XHRcdCRjbGFzcy5faW50ZXJuYWxfYWRkZWRbbmFtZV0gPSAkZGVzY3JbbmFtZV07XG5cblx0XHRcdCRjbGFzcy5wcm90b3R5cGVbbmFtZV0gPSAkZGVzY3JbbmFtZV07XG5cdFx0fVxuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkY2xhc3MucHJvdG90eXBlLiRuYW1lID0gJG5hbWU7XG5cdCRjbGFzcy5wcm90b3R5cGUuJGNsYXNzID0gJGNsYXNzO1xuXHQkY2xhc3MucHJvdG90eXBlLiRpbXBsZW1lbnRzID0gJHN1cGVyX2ltcGxlbWVudHMuY29uY2F0KCRkZXNjcl9pbXBsZW1lbnRzKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF8kYWRkVG9OYW1lc3BhY2UoJG5hbWUsICRjbGFzcyk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpZigkZGVzY3IuJClcblx0e1xuXHRcdCRkZXNjci4kLmFwcGx5KCRjbGFzcyk7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIE5vZGVKUyBFWFRFTlNJT04gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmlmKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJylcbntcblx0bW9kdWxlLmV4cG9ydHMuTmFtZXNwYWNlID0gJEFNSU5hbWVzcGFjZTtcblx0bW9kdWxlLmV4cG9ydHMuSW50ZXJmYWNlID0gJEFNSUludGVyZmFjZTtcblx0bW9kdWxlLmV4cG9ydHMuICBDbGFzcyAgID0gICAkQU1JQ2xhc3MgIDtcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBKUVVFUlkgRVhURU5TSU9OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pZih0eXBlb2YgalF1ZXJ5ICE9PSAndW5kZWZpbmVkJylcbntcblx0alF1ZXJ5Lk5hbWVzcGFjZSA9ICRBTUlOYW1lc3BhY2U7XG5cdGpRdWVyeS5JbnRlcmZhY2UgPSAkQU1JSW50ZXJmYWNlO1xuXHRqUXVlcnkuICBDbGFzcyAgID0gICAkQU1JQ2xhc3MgIDtcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgQU1JIHVybCByb3V0aW5nIHN1YnN5c3RlbVxuICogQG5hbWVzcGFjZSBhbWlSb3V0ZXJcbiAqL1xuXG4kQU1JTmFtZXNwYWNlKCdhbWlSb3V0ZXInLCAvKiogQGxlbmRzIGFtaVJvdXRlciAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBSSVZBVEUgTUVNQkVSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3NjcmlwdFVSTDogJycsXG5cdF9vcmlnaW5VUkw6ICcnLFxuXHRfd2ViQXBwVVJMOiAnJyxcblxuXHRfaGFzaDogJycsXG5cdF9hcmdzOiBbXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9yb3V0ZXM6IFtdLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBSSVZBVEUgTUVUSE9EUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2VhdFNsYXNoZXM6IGZ1bmN0aW9uKHVybClcblx0e1xuXHRcdHVybCA9IHVybC50cmltKCk7XG5cblx0XHR3aGlsZSh1cmxbdXJsLmxlbmd0aCAtIDFdID09PSAnLycpXG5cdFx0e1xuXHRcdFx0dXJsID0gdXJsLnN1YnN0cmluZygwLCB1cmwubGVuZ3RoIC0gMSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVybDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBTVEFUSUMgQ09OU1RSVUNUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuX2FyZ3MubGVuZ3RoID0gMDtcblx0XHR0aGlzLl9yb3V0ZXMubGVuZ3RoID0gMDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0ICBocmVmICA9IHdpbmRvdy5sb2NhdGlvbi4gaHJlZiAudHJpbSgpO1xuXHRcdGNvbnN0ICBoYXNoICA9IHdpbmRvdy5sb2NhdGlvbi4gaGFzaCAudHJpbSgpO1xuXHRcdGNvbnN0IHNlYXJjaCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gudHJpbSgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3Qgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBTQ1JJUFRfVVJMIEFORCBPUklHSU5fVVJMICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Zm9yKGxldCBpZHgsIGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKylcblx0XHR7XG5cdFx0XHRpZHggPSBzY3JpcHRzW2ldLnNyYy5pbmRleE9mKCdqcy9hbWkuJyk7XG5cblx0XHRcdGlmKGlkeCA+IDApXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuX3NjcmlwdFVSTCA9IHNjcmlwdHNbaV0uc3JjO1xuXG5cdFx0XHRcdHRoaXMuX29yaWdpblVSTCA9IHRoaXMuX2VhdFNsYXNoZXMoXG5cdFx0XHRcdFx0dGhpcy5fc2NyaXB0VVJMLnN1YnN0cmluZygwLCBpZHgpXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFdFQkFQUF9VUkwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLl93ZWJBcHBVUkwgPSB0aGlzLl9lYXRTbGFzaGVzKFxuXHRcdFx0aHJlZi5yZXBsYWNlKC8oPzpcXCN8XFw/KS4qJC8sICcnKVxuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogSEFTSCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuX2hhc2ggPSB0aGlzLl9lYXRTbGFzaGVzKFxuXHRcdFx0aGFzaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvXFw/LiokLywgJycpXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBBUkdTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoc2VhcmNoKVxuXHRcdHtcblx0XHRcdHNlYXJjaC5zdWJzdHJpbmcoMSkuc3BsaXQoJyYnKS5mb3JFYWNoKChwYXJhbSkgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IHBhcnRzID0gcGFyYW0uc3BsaXQoJz0nKTtcblxuXHRcdFx0XHQvKiovIGlmKHBhcnRzLmxlbmd0aCA9PT0gMSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuX2FyZ3NbZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzBdKV0gPSAvKi0tLS0tLS0tKi8gJycgLyotLS0tLS0tLSovO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYocGFydHMubGVuZ3RoID09PSAyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5fYXJnc1tkZWNvZGVVUklDb21wb25lbnQocGFydHNbMF0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYXJ0c1sxXSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQVUJMSUMgTUVUSE9EUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgQVdGJ3Mgc2NyaXB0IFVSTFxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIEFXRidzIHNjcmlwdCBVUkxcblx0ICAqL1xuXG5cdGdldFNjcmlwdFVSTDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NjcmlwdFVSTDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgb3JpZ2luIFVSTFxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIG9yaWdpbiBVUkxcblx0ICAqL1xuXG5cdGdldE9yaWdpblVSTDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX29yaWdpblVSTDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgd2ViYXBwIFVSTFxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIHdlYmFwcCBVUkxcblx0ICAqL1xuXG5cdGdldFdlYkFwcFVSTDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3dlYkFwcFVSTDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgYW5jaG9yIHBhcnQgb2YgdGhlIHdlYmFwcCBVUkxcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBhbmNob3IgcGFydCBvZiB0aGUgd2ViYXBwIFVSTFxuXHQgICovXG5cblx0Z2V0SGFzaDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2hhc2g7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFxuXHQgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IFRoZSBhcmd1bWVudHMgZXh0cmFjdGVkIGZyb20gdGhlIHdlYmFwcCBVUkxcblx0ICAqL1xuXG5cdGdldEFyZ3M6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9hcmdzO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBcHBlbmRzIGEgcm91dGluZyBydWxlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcmVnRXhwIHRoZSByZWdFeHBcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBoYW5kbGVyIHRoZSBoYW5kbGVyXG5cdCAgKiBAcmV0dXJucyB7TmFtZXNwYWNlfSBUaGUgYW1pUm91dGVyIHNpbmdsZXRvblxuXHQgICovXG5cblx0YXBwZW5kOiBmdW5jdGlvbihyZWdFeHAsIGhhbmRsZXIpXG5cdHtcblx0XHR0aGlzLl9yb3V0ZXMudW5zaGlmdCh7XG5cdFx0XHRyZWdFeHA6IHJlZ0V4cCxcblx0XHRcdGhhbmRsZXI6IGhhbmRsZXIsXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUmVtb3ZlcyBzb21lIHJvdXRpbmcgcnVsZXNcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSByZWdFeHAgdGhlIHJlZ0V4cFxuXHQgICogQHJldHVybnMge05hbWVzcGFjZX0gVGhlIGFtaVJvdXRlciBzaW5nbGV0b25cblx0ICAqL1xuXG5cdHJlbW92ZTogZnVuY3Rpb24ocmVnRXhwKVxuXHR7XG5cdFx0dGhpcy5fcm91dGVzID0gdGhpcy5fcm91dGVzLmZpbHRlcigocm91dGUpID0+IHtcblxuXHRcdFx0cmV0dXJuIHJvdXRlLnJlZ0V4cC50b1N0cmluZygpICE9PSByZWdFeHAudG9TdHJpbmcoKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDaGVja3Mgd2hldGhlciB0aGUgVVJMIG1hdGNoZXMgd2l0aCBhIHJvdXRpbmcgcnVsZVxuXHQgICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAgKi9cblxuXHRjaGVjazogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG07XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fcm91dGVzLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdG0gPSB0aGlzLl9oYXNoLm1hdGNoKHRoaXMuX3JvdXRlc1tpXS5yZWdFeHApO1xuXG5cdFx0XHRpZihtKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLl9yb3V0ZXNbaV0uaGFuZGxlci5hcHBseShhbWlSb3V0ZXIsIG0pO1xuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXBwZW5kIGEgbmV3IGhpc3RvcnkgZW50cnlcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIHRoZSBuZXcgcGF0aFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0PW51bGxdIHRoZSBuZXcgY29udGV4dFxuXHQgICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAgKi9cblxuXHRhcHBlbmRIaXN0b3J5RW50cnk6IGZ1bmN0aW9uKHBhdGgsIGNvbnRleHQgPSBudWxsKVxuXHR7XG5cdFx0aWYoaGlzdG9yeS5wdXNoU3RhdGUpXG5cdFx0e1xuXHRcdFx0aGlzdG9yeS5wdXNoU3RhdGUoY29udGV4dCwgbnVsbCwgdGhpcy5fd2ViQXBwVVJMICsgdGhpcy5fZWF0U2xhc2hlcyhwYXRoKSk7XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUmVwbGFjZSB0aGUgY3VycmVudCBoaXN0b3J5IGVudHJ5XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCB0aGUgbmV3IHBhdGhcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGV4dD1udWxsXSB0aGUgbmV3IGNvbnRleHRcblx0ICAqIEByZXR1cm5zIHtCb29sZWFufVxuXHQgICovXG5cblx0cmVwbGFjZUhpc3RvcnlFbnRyeTogZnVuY3Rpb24ocGF0aCwgY29udGV4dCA9IG51bGwpXG5cdHtcblx0XHRpZihoaXN0b3J5LnJlcGxhY2VTdGF0ZSlcblx0XHR7XG5cdFx0XHRoaXN0b3J5LnJlcGxhY2VTdGF0ZShjb250ZXh0LCBudWxsLCB0aGlzLl93ZWJBcHBVUkwgKyB0aGlzLl9lYXRTbGFzaGVzKHBhdGgpKTtcblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlOYW1lc3BhY2UoJ2FtaScsIHtcblxuXHR2ZXJzaW9uOiAnMC4wLjEnLFxuXHRjb21taXRfaWQ6ICd7e0FNSV9DT01NSVRfSUR9fScsXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBJTlRFUk5BTCBGVU5DVElPTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5mdW5jdGlvbiBfYW1pX2ludGVybmFsX3RoZW4oZGVmZXJyZWQsIGRvbmVGdW5jLCBmYWlsRnVuYylcbntcblx0aWYoZGVmZXJyZWQgJiYgZGVmZXJyZWQudGhlbilcblx0e1xuXHRcdGRlZmVycmVkLnRoZW4oZG9uZUZ1bmMsIGZhaWxGdW5jKTtcblx0fVxuXHRlbHNlXG5cdHtcblx0XHRkb25lRnVuYygpO1xuXHR9XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5mdW5jdGlvbiBfYW1pX2ludGVybmFsX2Fsd2F5cyhkZWZlcnJlZCwgYWx3YXlzRnVuYylcbntcblx0aWYoZGVmZXJyZWQgJiYgZGVmZXJyZWQuYWx3YXlzKVxuXHR7XG5cdFx0ZGVmZXJyZWQuYWx3YXlzKGFsd2F5c0Z1bmMpO1xuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdGFsd2F5c0Z1bmMoKTtcblx0fVxufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVdlYkFwcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIEFNSSB3ZWJhcHAgc3Vic3lzdGVtXG4gKiBAbmFtZXNwYWNlIGFtaVdlYkFwcFxuICovXG5cbiRBTUlOYW1lc3BhY2UoJ2FtaVdlYkFwcCcsIC8qKiBAbGVuZHMgYW1pV2ViQXBwICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFJJVkFURSBNRU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfaWRSZWdFeHA6IG5ldyBSZWdFeHAoJ1thLXpBLVpdW2EtekEtWjAtOV17N31fW2EtekEtWjAtOV17NH1fW2EtekEtWjAtOV17NH1fW2EtekEtWjAtOV17NH1fW2EtekEtWjAtOV17MTJ9JywgJ2cnKSxcblxuXHRfbGlua0V4cDogbmV3IFJlZ0V4cCgnXFxcXFsoW15cXFxcXV0qKVxcXFxdXFxcXCgoW15cXFxcKV0qKVxcXFwpJywgJ2cnKSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9lbWJlZGRlZDogZmFsc2UsXG5cdF9ub0Jvb3RzdHJhcDogZmFsc2UsXG5cdF9ub0RhdGVUaW1lUGlja2VyOiBmYWxzZSxcblx0X25vU2VsZWN0MjogZmFsc2UsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZ2xvYmFsRGVmZXJyZWQ6ICQuRGVmZXJyZWQoKSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9zaGVldHM6IFtdLFxuXHRfc2NyaXB0czogW10sXG5cblx0X2NvbnRyb2xzOiB7fSxcblx0X3N1YmFwcHM6IHt9LFxuXG5cdF9pc1JlYWR5OiBmYWxzZSxcblx0X2NhbkxlYXZlOiB0cnVlLFxuXHRfbG9ja0NudDogMHgwMCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9jdXJyZW50U3ViQXBwSW5zdGFuY2U6IG5ldyBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLm9uUmVhZHkgPSBmdW5jdGlvbigpIHt9O1xuXHRcdHRoaXMub25FeGl0ID0gZnVuY3Rpb24oKSB7fTtcblx0XHR0aGlzLm9uTG9naW4gPSBmdW5jdGlvbigpIHt9O1xuXHRcdHRoaXMub25Mb2dvdXQgPSBmdW5jdGlvbigpIHt9O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBVQkxJQyBNRU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBUaGUgb3JpZ2luIFVSTFxuXHQgICogQHR5cGUge1N0cmluZ31cblx0ICAqL1xuXG5cdG9yaWdpblVSTDogJy8nLFxuXG5cdC8qKlxuXHQgICogVGhlIHdlYmFwcCBVUkxcblx0ICAqIEB0eXBlIHtTdHJpbmd9XG5cdCAgKi9cblxuXHR3ZWJBcHBVUkw6ICcvJyxcblxuXHQvKipcblx0ICAqIFRoZSBhbmNob3IgcGFydCBvZiB0aGUgd2ViYXBwIFVSTFxuXHQgICogQHR5cGUge1N0cmluZ31cblx0ICAqL1xuXG5cdGhhc2g6ICcnLFxuXG5cdC8qKlxuXHQgICogVGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFxuXHQgICogQHR5cGUge0FycmF5PFN0cmluZz59XG5cdCAgKi9cblxuXHRhcmdzOiB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBTVEFUSUMgQ09OU1RSVUNUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBHRVQgRkxBR1MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdXJsID0gYW1pUm91dGVyLmdldFNjcmlwdFVSTCgpO1xuXG5cdFx0Y29uc3QgaWR4ID0gdXJsLmluZGV4T2YoJz8nKTtcblxuXHRcdGlmKGlkeCA+IDApXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGZsYWdzID0gdXJsLnN1YnN0cmluZyhpZHgpLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLl9lbWJlZGRlZCA9IChmbGFncy5pbmRleE9mKCdlbWJlZGRlZCcpID49IDApO1xuXG5cdFx0XHR0aGlzLl9ub0Jvb3RzdHJhcCA9IChmbGFncy5pbmRleE9mKCdub2Jvb3RzdHJhcCcpID49IDApO1xuXG5cdFx0XHR0aGlzLl9ub0RhdGVUaW1lUGlja2VyID0gKGZsYWdzLmluZGV4T2YoJ25vZGF0ZXRpbWVwaWNrZXInKSA+PSAwKTtcblxuXHRcdFx0dGhpcy5fbm9TZWxlY3QyID0gKGZsYWdzLmluZGV4T2YoJ25vc2VsZWN0MicpID49IDApO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogR0VUIFVSTFMsIEhBU0ggQU5EIEFSR1MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMub3JpZ2luVVJMID0gYW1pUm91dGVyLmdldE9yaWdpblVSTCgpO1xuXHRcdHRoaXMud2ViQXBwVVJMID0gYW1pUm91dGVyLmdldFdlYkFwcFVSTCgpO1xuXG5cdFx0dGhpcy5oYXNoID0gYW1pUm91dGVyLmdldEhhc2goKTtcblx0XHR0aGlzLmFyZ3MgPSBhbWlSb3V0ZXIuZ2V0QXJncygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIExPQUQgU0hFRVRTIEFORCBTQ1JJUFRTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCByZXNvdXJjZXNDU1MgPSBbXTtcblx0XHRjb25zdCByZXNvdXJjZXNKUyA9IFtdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIXdpbmRvdy5Qb3BwZXIpIHtcblx0XHRcdHJlc291cmNlc0pTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2pzL3BvcHBlci5taW4uanMnKTtcblx0XHR9XG5cblx0XHRpZighd2luZG93Lm1vbWVudCkge1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvbW9tZW50Lm1pbi5qcycpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKCF0aGlzLl9ub0Jvb3RzdHJhcCAmJiAodHlwZW9mIGpRdWVyeS5mbi5tb2RhbCkgIT09ICdmdW5jdGlvbicpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzQ1NTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9ib290c3RyYXAubWluLmNzcycpO1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvYm9vdHN0cmFwLm1pbi5qcycpO1xuXHRcdH1cblxuXHRcdGlmKCF0aGlzLl9ub0RhdGVUaW1lUGlja2VyICYmICh0eXBlb2YgalF1ZXJ5LmZuLmRhdGV0aW1lcGlja2VyKSAhPT0gJ2Z1bmN0aW9uJylcblx0XHR7XG5cdFx0XHRyZXNvdXJjZXNDU1MucHVzaCh0aGlzLm9yaWdpblVSTCArICcvY3NzL2Jvb3RzdHJhcC1kYXRldGltZXBpY2tlci5taW4uY3NzJyk7XG5cdFx0XHRyZXNvdXJjZXNKUy5wdXNoKHRoaXMub3JpZ2luVVJMICsgJy9qcy9ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXIubWluLmpzJyk7XG5cdFx0fVxuXG5cdFx0aWYoIXRoaXMuX25vU2VsZWN0MiAmJiAodHlwZW9mIGpRdWVyeS5mbi5zZWxlY3QyKSAhPT0gJ2Z1bmN0aW9uJylcblx0XHR7XG5cdFx0XHRyZXNvdXJjZXNDU1MucHVzaCh0aGlzLm9yaWdpblVSTCArICcvY3NzL3NlbGVjdDIubWluLmNzcycpO1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvc2VsZWN0Mi5taW4uanMnKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0Li4ucmVzb3VyY2VzQ1NTLFxuXHRcdFx0dGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzcycsXG5cdFx0XHR0aGlzLm9yaWdpblVSTCArICcvY3NzL2FtaS5taW4uY3NzJyxcblx0XHRcdC4uLnJlc291cmNlc0pTLFxuXHRcdF0pLmRvbmUoKC8qLS0tKi8pID0+IHtcblxuXHRcdFx0dGhpcy5fZ2xvYmFsRGVmZXJyZWQucmVzb2x2ZSgvKi0tLSovKTtcblxuXHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZ2xvYmFsRGVmZXJyZWQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIE1PREUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDaGVja3Mgd2hldGhlciB0aGUgV2ViQXBwIGlzIGV4ZWN1dGVkIGluIGVtYmVkZGVkIG1vZGVcblx0ICAqIEByZXR1cm5zIHtCb29sZWFufVxuXHQgICovXG5cblx0aXNFbWJlZGRlZDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2VtYmVkZGVkO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDaGVja3Mgd2hldGhlciB0aGUgV2ViQXBwIGlzIGV4ZWN1dGVkIGxvY2FsbHkgKGZpbGU6Ly8sIGxvY2FsaG9zdCwgMTI3LjAuMC4xIG9yIDo6MSlcblx0ICAqIEByZXR1cm5zIHtCb29sZWFufVxuXHQgICovXG5cblx0aXNMb2NhbDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sID09PSAoKCdmaWxlOicpKVxuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gJ2xvY2FsaG9zdCdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUgPT09ICcxMjcuMC4wLjEnXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhvc3RuYW1lID09PSAoKCgnOjoxJykpKVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBUT09MUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHR5cGVPZjogZnVuY3Rpb24oeClcblx0e1xuXHRcdGNvbnN0IG5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCk7XG5cblx0XHRyZXR1cm4gbmFtZS5zdGFydHNXaXRoKCdbb2JqZWN0ICcpID8gbmFtZS5zdWJzdHJpbmcoOCwgbmFtZS5sZW5ndGggLSAxKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGFzQXJyYXk6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50eXBlT2YoeCkgPT09ICdBcnJheScgPyAoeClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbeF1cblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXR1cDogZnVuY3Rpb24ob3B0aW9uTmFtZXMsIG9wdGlvbkRlZmF1bHRzLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgbCA9IG9wdGlvbk5hbWVzLmxlbmd0aDtcblx0XHRjb25zdCBtID0gb3B0aW9uRGVmYXVsdHMubGVuZ3RoO1xuXG5cdFx0aWYobCAhPT0gbSlcblx0XHR7XG5cdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHNldHRpbmdzKSB7XG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKG9wdGlvbk5hbWVzW2ldIGluIHNldHRpbmdzID8gc2V0dGluZ3Nbb3B0aW9uTmFtZXNbaV1dIDogb3B0aW9uRGVmYXVsdHNbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcblx0XHRcdFx0cmVzdWx0LnB1c2goLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyBvcHRpb25EZWZhdWx0c1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlcGxhY2U6IGFtaVR3aWcuc3RkbGliLl9yZXBsYWNlLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3RleHRUb0h0bWxYOiBbJyYnICAgICwgJ1wiJyAgICAgLCAnPCcgICAsICc+JyAgIF0sXG5cdF90ZXh0VG9IdG1sWTogWycmYW1wOycsICcmcXVvdDsnLCAnJmx0OycsICcmZ3Q7J10sXG5cblx0LyoqXG5cdCAgKiBFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIEhUTUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0dGV4dFRvSHRtbDogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5fdGV4dFRvSHRtbFgsIHRoaXMuX3RleHRUb0h0bWxZKTtcblx0fSxcblxuXHQvKipcblx0ICAqIFVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSFRNTCB0byB0ZXh0XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGh0bWxUb1RleHQ6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKHMgfHwgJycsIHRoaXMuX3RleHRUb0h0bWxZLCB0aGlzLl90ZXh0VG9IdG1sWCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfdGV4dFRvU3RyaW5nWDogWydcXFxcJyAgLCAnXFxuJyAsICdcIicgICwgJ1xcJycgIF0sXG5cdF90ZXh0VG9TdHJpbmdZOiBbJ1xcXFxcXFxcJywgJ1xcXFxuJywgJ1xcXFxcIicsICdcXFxcXFwnJ10sXG5cblx0LyoqXG5cdCAgKiBFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIEphdmFTY3JpcHQgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSB1bmVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdHRleHRUb1N0cmluZzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5fdGV4dFRvU3RyaW5nWCwgdGhpcy5fdGV4dFRvU3RyaW5nWSk7XG5cdH0sXG5cblx0LyoqXG5cdCAgKiBVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEphdmFTY3JpcHQgc3RyaW5nIHRvIHRleHRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0c3RyaW5nVG9UZXh0OiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TdHJpbmdZLCB0aGlzLl90ZXh0VG9TdHJpbmdYKTtcblxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2h0bWxUb1N0cmluZ1g6IFsnXFxcXCcgICwgJ1xcbicgLCAnJnF1b3Q7JyAgLCAnXFwnJyAgXSxcblx0X2h0bWxUb1N0cmluZ1k6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXCZxdW90OycsICdcXFxcXFwnJ10sXG5cblx0LyoqXG5cdCAgKiBFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBIVE1MIHRvIEphdmFTY3JpcHQgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSB1bmVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGh0bWxUb1N0cmluZzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5faHRtbFRvU3RyaW5nWCwgdGhpcy5faHRtbFRvU3RyaW5nWSk7XG5cdH0sXG5cblx0LyoqXG5cdCAgKiBVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEphdmFTY3JpcHQgc3RyaW5nIHRvIEhUTUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0c3RyaW5nVG9IdG1sOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl9odG1sVG9TdHJpbmdZLCB0aGlzLl9odG1sVG9TdHJpbmdYKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF90ZXh0VG9TUUxYOiBbJ1xcJycgIF0sXG5cdF90ZXh0VG9TUUxZOiBbJ1xcJ1xcJyddLFxuXG5cdC8qKlxuXHQgICogRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBTUUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0dGV4dFRvU1FMOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TUUxYLCB0aGlzLl90ZXh0VG9TUUxZKTtcblx0fSxcblxuXHQvKipcblx0ICAqIFVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gU1FMIHRvIHRleHRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0c3FsVG9UZXh0OiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TUUxZLCB0aGlzLl90ZXh0VG9TUUxYKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBCQVNFNjQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9iYXNlNjQ6ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OS1fJyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRW5jb2RlcyAoUkZDIDQ2NDgpIGEgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBkZWNvZGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGVuY29kZWQgc3RyaW5nXG5cdCAgKi9cblxuXHRiYXNlNjRFbmNvZGU6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRsZXQgdztcblxuXHRcdGNvbnN0IGUgPSBbXTtcblxuXHRcdGNvbnN0IGwgPSBzLmxlbmd0aCwgbSA9IGwgJSAzO1xuXG5cdFx0Y29uc3QgdGhpc19iYXNlNjQgPSB0aGlzLl9iYXNlNjQ7XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDspXG5cdFx0e1xuXHRcdFx0dyA9IHMuY2hhckNvZGVBdChpKyspIDw8IDE2XG5cdFx0XHQgICAgfFxuXHRcdFx0ICAgIHMuY2hhckNvZGVBdChpKyspIDw8IDhcblx0XHRcdCAgICB8XG5cdFx0XHQgICAgcy5jaGFyQ29kZUF0KGkrKykgPDwgMFxuXHRcdFx0O1xuXG5cdFx0XHRlLnB1c2godGhpc19iYXNlNjQuY2hhckF0KCh3ID4+IDE4KSAmIDB4M0YpKTtcblx0XHRcdGUucHVzaCh0aGlzX2Jhc2U2NC5jaGFyQXQoKHcgPj4gMTIpICYgMHgzRikpO1xuXHRcdFx0ZS5wdXNoKHRoaXNfYmFzZTY0LmNoYXJBdCgodyA+PiA2KSAmIDB4M0YpKTtcblx0XHRcdGUucHVzaCh0aGlzX2Jhc2U2NC5jaGFyQXQoKHcgPj4gMCkgJiAweDNGKSk7XG5cdFx0fVxuXG5cdFx0LyoqLyBpZihtID09PSAxKSB7XG5cdFx0XHRlLnNwbGljZSgtMiwgMik7XG5cdFx0fVxuXHRcdGVsc2UgaWYobSA9PT0gMikge1xuXHRcdFx0ZS5zcGxpY2UoLTEsIDEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBlLmpvaW4oJycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBEZWNvZGVzIChSRkMgNDY0OCkgYSBzdHJpbmdcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVuY29kZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZGVjb2RlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGJhc2U2NERlY29kZTogZnVuY3Rpb24ocylcblx0e1xuXHRcdGxldCB3O1xuXG5cdFx0Y29uc3QgZSA9IFtdO1xuXG5cdFx0Y29uc3QgbCA9IHMubGVuZ3RoLCBtID0gbCAlIDQ7XG5cblx0XHRjb25zdCB0aGlzX2Jhc2U2NCA9IHRoaXMuX2Jhc2U2NDtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOylcblx0XHR7XG5cdFx0XHR3ID0gdGhpc19iYXNlNjQuaW5kZXhPZihzLmNoYXJBdChpKyspKSA8PCAxOFxuXHRcdFx0ICAgIHxcblx0XHRcdCAgICB0aGlzX2Jhc2U2NC5pbmRleE9mKHMuY2hhckF0KGkrKykpIDw8IDEyXG5cdFx0XHQgICAgfFxuXHRcdFx0ICAgIHRoaXNfYmFzZTY0LmluZGV4T2Yocy5jaGFyQXQoaSsrKSkgPDwgNlxuXHRcdFx0ICAgIHxcblx0XHRcdCAgICB0aGlzX2Jhc2U2NC5pbmRleE9mKHMuY2hhckF0KGkrKykpIDw8IDBcblx0XHRcdDtcblxuXHRcdFx0ZS5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoKHcgPj4+IDE2KSAmIDB4RkYpKTtcblx0XHRcdGUucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh3ID4+PiA4KSAmIDB4RkYpKTtcblx0XHRcdGUucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh3ID4+PiAwKSAmIDB4RkYpKTtcblx0XHR9XG5cblx0XHQvKiovIGlmKG0gPT09IDIpIHtcblx0XHRcdGUuc3BsaWNlKC0yLCAyKTtcblx0XHR9XG5cdFx0ZWxzZSBpZihtID09PSAzKSB7XG5cdFx0XHRlLnNwbGljZSgtMSwgMSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGUuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogRFlOQU1JQyBSRVNPVVJDRSBMT0FESU5HICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZ2V0RXh0ZW5zaW9uOiBmdW5jdGlvbih1cmwpXG5cdHtcblx0XHRjb25zdCBpZHggPSB1cmwubGFzdEluZGV4T2YoJy4nKTtcblxuXHRcdHJldHVybiBpZHggPiAwID8gdXJsLnN1YnN0cmluZyhpZHgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZ2V0RGF0YVR5cGU6IGZ1bmN0aW9uKHVybCwgZGF0YVR5cGUpXG5cdHtcblx0XHRsZXQgcmVzdWx0O1xuXG5cdFx0aWYoZGF0YVR5cGUgPT09ICdhdXRvJylcblx0XHR7XG5cdFx0XHQvKiovIGlmKHVybC5pbmRleE9mKCdjdHJsOicpID09PSAwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSAnY29udHJvbCc7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmKHVybC5pbmRleE9mKCdzdWJhcHA6JykgPT09IDApXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdCA9ICdzdWJhcHAnO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRzd2l0Y2godGhpcy5fZ2V0RXh0ZW5zaW9uKHVybCkudG9Mb3dlckNhc2UoKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNhc2UgJy5jc3MnOlxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gJ3NoZWV0Jztcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAnLmpzJzpcblx0XHRcdFx0XHRcdHJlc3VsdCA9ICdzY3JpcHQnO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICcuanNvbic6XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAnanNvbic7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJy54bWwnOlxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gJ3htbCc7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAndGV4dCc7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0ID0gZGF0YVR5cGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9fbG9hZFhYWDogZnVuY3Rpb24oZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpXG5cdHtcblx0XHRpZih1cmxzLmxlbmd0aCA9PT0gMClcblx0XHR7XG5cdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVzb2x2ZVdpdGgoY29udGV4dCwgW3Jlc3VsdF0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVybCA9IHVybHMuc2hpZnQoKS50cmltKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkYXRhVFlQRSA9IHRoaXMuX2dldERhdGFUeXBlKHVybCwgZGF0YVR5cGUpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0c3dpdGNoKGRhdGFUWVBFKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQ09OVFJPTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnY29udHJvbCc6XG5cblx0XHRcdFx0dGhpcy5sb2FkQ29udHJvbCh1cmwpLnRoZW4oKGRhdGEpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGRhdGEpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU1VCQVBQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnc3ViYXBwJzpcblxuXHRcdFx0XHR0aGlzLmxvYWRTdWJBcHAodXJsKS50aGVuKChkYXRhKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucHVzaChkYXRhKTtcblxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgcmVzdWx0LCB1cmxzLCBkYXRhVHlwZSwgY29udGV4dCk7XG5cblx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNIRUVUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ3NoZWV0JzpcblxuXHRcdFx0XHRpZih0aGlzLl9zaGVldHMuaW5kZXhPZih1cmwpID49IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChmYWxzZSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0XHR1cmw6IHVybCxcblx0XHRcdFx0XHRcdGFzeW5jOiBmYWxzZSxcblx0XHRcdFx0XHRcdGNhY2hlOiBmYWxzZSxcblx0XHRcdFx0XHRcdGNyb3NzRG9tYWluOiB0cnVlLFxuXHRcdFx0XHRcdFx0ZGF0YVR5cGU6IGRhdGFUWVBFLFxuXHRcdFx0XHRcdH0pLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaCh0cnVlKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5fc2hlZXRzLnB1c2godXJsKTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblxuXHRcdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBgJyArIHVybCArICdgJ10pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU0NSSVBUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnc2NyaXB0JzpcblxuXHRcdFx0XHRpZih0aGlzLl9zY3JpcHRzLmluZGV4T2YodXJsKSA+PSAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goZmFsc2UpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRcdFx0XHRhc3luYzogZmFsc2UsXG5cdFx0XHRcdFx0XHRjYWNoZTogZmFsc2UsXG5cdFx0XHRcdFx0XHRjcm9zc0RvbWFpbjogdHJ1ZSxcblx0XHRcdFx0XHRcdGRhdGFUeXBlOiBkYXRhVFlQRSxcblx0XHRcdFx0XHR9KS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnB1c2godHJ1ZSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuX3NjcmlwdHMucHVzaCh1cmwpO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIGAnICsgdXJsICsgJ2AnXSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBPVEhFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRcdFx0YXN5bmM6IHRydWUsXG5cdFx0XHRcdFx0Y2FjaGU6IGZhbHNlLFxuXHRcdFx0XHRcdGNyb3NzRG9tYWluOiB0cnVlLFxuXHRcdFx0XHRcdGRhdGFUeXBlOiBkYXRhVFlQRSxcblx0XHRcdFx0fSkudGhlbigoZGF0YSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goZGF0YSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgYCcgKyB1cmwgKyAnYCddKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9sb2FkWFhYOiBmdW5jdGlvbih1cmxzLCBkYXRhVHlwZSwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtkZWZlcnJlZF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgW10sIHRoaXMuYXNBcnJheSh1cmxzKSwgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgcmVzb3VyY2VzIGJ5IGV4dGVuc2lvblxuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRSZXNvdXJjZXM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ2F1dG8nLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIENTUyBzaGVldHNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkU2hlZXRzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICdzaGVldCcsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgSlMgc2NyaXB0c1xuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRTY3JpcHRzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICdzY3JpcHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIEpTT04gZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkSlNPTnM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ2pzb24nLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIFhNTCBmaWxlc1xuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRYTUxzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICd4bWwnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIEhUTUwgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkSFRNTHM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ3RleHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIFRXSUcgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkVFdJR3M6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ3RleHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIHRleHQgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkVGV4dHM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ3RleHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSFRNTCBDT05URU5UICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfeHh4SFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIG1vZGUsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHQsIHN1ZmZpeCwgZGljdF0gPSB0aGlzLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0JywgJ3N1ZmZpeCcsICdkaWN0J10sXG5cdFx0XHRbcmVzdWx0LCBudWxsLCBudWxsXSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHN1ZmZpeClcblx0XHR7XG5cdFx0XHR0d2lnID0gdHdpZy5yZXBsYWNlKHRoaXMuX2lkUmVnRXhwLCBmdW5jdGlvbihpZCkge1xuXG5cdFx0XHRcdHJldHVybiBpZCArICdfaW5zdGFuY2UnICsgc3VmZml4O1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgaHRtbCA9IHRoaXMuZm9ybWF0VFdJRyh0d2lnLCBkaWN0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBwcm9taXNlO1xuXG5cdFx0bGV0IGVsID0gJChzZWxlY3Rvcik7XG5cblx0XHRzd2l0Y2gobW9kZSlcblx0XHR7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdHByb21pc2UgPSBlbC5odG1sKGh0bWwpLnByb21pc2UoKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0cHJvbWlzZSA9IGVsLnByZXBlbmQoaHRtbCkucHJvbWlzZSgpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRwcm9taXNlID0gZWwuYXBwZW5kKGh0bWwpLnByb21pc2UoKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMzpcblx0XHRcdFx0cHJvbWlzZSA9IGVsLnJlcGxhY2VXaXRoKGVsLmlzKCdbaWRdJykgPyBodG1sLnJlcGxhY2UoL15cXHMqKDxbYS16QS1aXy1dKykvLCAnJDEgaWQ9XCInICsgZWwuYXR0cignaWQnKSArICdcIicpIDogaHRtbCkucHJvbWlzZSgpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRwcm9taXNlLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGV0IGVsID0gJChzZWxlY3Rvcik7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBfZmluZCA9IG1vZGUgPT09IDMgPyAoX3NlbGVjdG9yKSA9PiBlbC5maW5kV2l0aFNlbGYoX3NlbGVjdG9yKVxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgIDogKF9zZWxlY3RvcikgPT4gZWwuICAgIGZpbmQgICAgKF9zZWxlY3Rvcilcblx0XHRcdDtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKGpRdWVyeS5mbi50b29sdGlwKVxuXHRcdFx0e1xuXHRcdFx0XHRfZmluZCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoe1xuXHRcdFx0XHRcdGh0bWw6IGZhbHNlLFxuXHRcdFx0XHRcdGRlbGF5OiB7XG5cdFx0XHRcdFx0XHRzaG93OiA1MDAsXG5cdFx0XHRcdFx0XHRoaWRlOiAxMDAsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihqUXVlcnkuZm4ucG9wb3Zlcilcblx0XHRcdHtcblx0XHRcdFx0X2ZpbmQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5wb3BvdmVyKHtcblx0XHRcdFx0XHRodG1sOiB0cnVlLFxuXHRcdFx0XHRcdGRlbGF5OiB7XG5cdFx0XHRcdFx0XHRzaG93OiA1MDAsXG5cdFx0XHRcdFx0XHRoaWRlOiAxMDAsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihqUXVlcnkuZm4uZGF0ZXRpbWVwaWNrZXIpXG5cdFx0XHR7XG5cdFx0XHRcdF9maW5kKCcuZm9ybS1kYXRldGltZScpLmRhdGV0aW1lcGlja2VyKHtcblx0XHRcdFx0XHRmb3JtYXQ6ICdZWVlZLU1NLUREIEhIOm1tOnNzLlNTU1NTUydcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0X2ZpbmQoJy5mb3JtLWRhdGUnKS5kYXRldGltZXBpY2tlcih7XG5cdFx0XHRcdFx0Zm9ybWF0OiAnWVlZWS1NTS1ERCdcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0X2ZpbmQoJy5mb3JtLXRpbWUnKS5kYXRldGltZXBpY2tlcih7XG5cdFx0XHRcdFx0Zm9ybWF0OiAnSEg6bW06c3MnXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtlbF0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBQdXRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdHJlcGxhY2VIVE1MOiBmdW5jdGlvbihzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5feHh4SFRNTChzZWxlY3RvciwgdHdpZywgMCwgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBQcmVwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgdGhlIHRhcmdldCBzZWxlY3RvclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgZnJhZ21lbnRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRwcmVwZW5kSFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3h4eEhUTUwoc2VsZWN0b3IsIHR3aWcsIDEsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXBwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgdGhlIHRhcmdldCBzZWxlY3RvclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgZnJhZ21lbnRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRhcHBlbmRIVE1MOiBmdW5jdGlvbihzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5feHh4SFRNTChzZWxlY3RvciwgdHdpZywgMiwgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBJbnRlcnByZXRlcyB0aGUgZ2l2ZW4gVFdJRyBzdHJpbmcsIHNlZSB7QGxpbmsgaHR0cDovL3R3aWcuc2Vuc2lvbGFicy5vcmcvZG9jdW1lbnRhdGlvbn1cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0d2lnIHRoZSBUV0lHIHN0cmluZ1xuXHQgICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IFtkaWN0XSB0aGUgZGljdGlvbmFyeVxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIEludGVycHJldGVkIFRXSUcgc3RyaW5nXG5cdCAgKi9cblxuXHRmb3JtYXRUV0lHOiBmdW5jdGlvbih0d2lnLCBkaWN0KVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCByZW5kZXIgPSAodHdpZywgZGljdCkgPT4ge1xuXG5cdFx0XHRpZih0aGlzLnR5cGVPZihkaWN0KSAhPT0gJ09iamVjdCcpXG5cdFx0XHR7XG5cdFx0XHRcdGRpY3QgPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0ZGljdFsnT1JJR0lOX1VSTCddID0gdGhpcy5vcmlnaW5VUkw7XG5cdFx0XHRkaWN0WydXRUJBUFBfVVJMJ10gPSB0aGlzLndlYkFwcFVSTDtcblxuXHRcdFx0cmV0dXJuIGFtaVR3aWcuZW5naW5lLnJlbmRlcih0d2lnLCBkaWN0KTtcblx0XHR9O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0aWYodGhpcy50eXBlT2YoZGljdCkgPT09ICdBcnJheScpXG5cdFx0XHR7XG5cdFx0XHRcdGRpY3QuZm9yRWFjaCgoRElDVCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gocmVuZGVyKHR3aWcsIERJQ1QpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKHJlbmRlcih0d2lnLCBkaWN0KSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGNhdGNoKGVycm9yKVxuXHRcdHtcblx0XHRcdHJlc3VsdC5sZW5ndGggPSAwO1xuXG5cdFx0XHR0aGlzLmVycm9yKCdUV0lHIHBhcnNpbmcgZXJyb3I6ICcgKyBlcnJvci5tZXNzYWdlKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIEpTUEFUSCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBGaW5kcyBkYXRhIHdpdGhpbiB0aGUgZ2l2ZW4gSlNPTiwgc2VlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vZGZpbGF0b3YvanNwYXRofVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggdGhlIHBhdGhcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBqc29uIHRoZSBKU09OXG5cdCAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSByZXN1bHRpbmcgYXJyYXlcblx0ICAqL1xuXG5cdGpzcGF0aDogZnVuY3Rpb24ocGF0aCwganNvbilcblx0e1xuXHRcdHJldHVybiBKU1BhdGguYXBwbHkocGF0aCwganNvbik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogU1RBQ0sgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRTdGFjazogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0dGhyb3cgRXJyb3IoKTtcblx0XHR9XG5cdFx0Y2F0Y2goZTEpXG5cdFx0e1xuXHRcdFx0dHJ5XG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBlMS5zdGFjaztcblx0XHRcdH1cblx0XHRcdGNhdGNoKGUyKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gKCgoJycpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIExPQ0sgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBMb2NrcyB0aGUgV2ViIGFwcGxpY2F0aW9uXG5cdCAgKi9cblxuXHRsb2NrOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGluZXMgPSB0aGlzLmdldFN0YWNrKCkuc3BsaXQoJ1xcbicpO1xuXG5cdFx0aWYobGluZXMubGVuZ3RoID4gMilcblx0XHR7XG5cdFx0XHRjb25zb2xlLmxvZygnbG9ja1snICsgdGhpcy5fbG9ja0NudCArICddIDo6ICcgKyBsaW5lc1syXSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXHRcdH1cblxuXHRcdC8qKi9cblxuXHRcdGlmKHRoaXMuX2xvY2tDbnQgPD0gMClcblx0XHR7XG5cdFx0XHQkKCcjYW1pX2xvY2tlcicpLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XG5cblx0XHRcdHRoaXMuX2xvY2tDbnQgPSAxO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhpcy5fbG9ja0NudCsrO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogVW5sb2NrcyB0aGUgV2ViIGFwcGxpY2F0aW9uXG5cdCAgKi9cblxuXHR1bmxvY2s6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKHRoaXMuX2xvY2tDbnQgPD0gMSlcblx0XHR7XG5cdFx0XHQkKCcjYW1pX2xvY2tlcicpLmNzcygnZGlzcGxheScsICdub25lJyk7XG5cblx0XHRcdHRoaXMuX2xvY2tDbnQgPSAwO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhpcy5fbG9ja0NudC0tO1xuXHRcdH1cblxuXHRcdC8qKi9cblxuXHRcdGxldCBsaW5lcyA9IHRoaXMuZ2V0U3RhY2soKS5zcGxpdCgnXFxuJyk7XG5cblx0XHRpZihsaW5lcy5sZW5ndGggPiAyKVxuXHRcdHtcblx0XHRcdGNvbnNvbGUubG9nKCd1bmxvY2tbJyArIHRoaXMuX2xvY2tDbnQgKyAnXSA6OiAnICsgbGluZXNbMl0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEVuYWJsZXMgdGhlIG1lc3NhZ2UgaW4gYSBjb25maXJtYXRpb24gZGlhbG9nIGJveCB0byBpbmZvcm0gdGhhdCB0aGUgdXNlciBpcyBhYm91dCB0byBsZWF2ZSB0aGUgY3VycmVudCBwYWdlLlxuXHQgICovXG5cblx0Y2FuTGVhdmU6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuX2NhbkxlYXZlID0gdHJ1ZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRGlzYWJsZXMgdGhlIG1lc3NhZ2UgaW4gYSBjb25maXJtYXRpb24gZGlhbG9nIGJveCB0byBpbmZvcm0gdGhhdCB0aGUgdXNlciBpcyBhYm91dCB0byBsZWF2ZSB0aGUgY3VycmVudCBwYWdlLlxuXHQgICovXG5cblx0Y2Fubm90TGVhdmU6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuX2NhbkxlYXZlID0gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogTUVTU0FHRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcHVibGlzaEFsZXJ0OiBmdW5jdGlvbihjbGF6eiwgdGl0bGUsIG1lc3NhZ2UsIGZhZGVPdXQpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zb2xlLmxvZygnQU1JICcgKyB0aXRsZS50b1VwcGVyQ2FzZSgpICsgJzogJyArIG1lc3NhZ2UgKyAnXFxuJyArIHRoaXMuZ2V0U3RhY2soKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgaHRtbCA9ICc8ZGl2IGNsYXNzPVwidG9hc3RcIiByb2xlPVwiYWxlcnRcIiAnICsgKGZhZGVPdXQgPyAnZGF0YS1kZWxheT1cIjYwMDAwXCInIDogJ2RhdGEtYXV0b2hpZGU9XCJmYWxzZVwiJykgKyAnPjxkaXYgY2xhc3M9XCJ0b2FzdC1oZWFkZXJcIj48c3Ryb25nIGNsYXNzPVwibXItYXV0byAnICsgY2xhenogKyAnXCI+JyArIHRpdGxlICsgJzwvc3Ryb25nPjxzbWFsbD4nICsgdGhpcy50ZXh0VG9IdG1sKHdpbmRvdy5tb21lbnQoKS5mb3JtYXQoJ0REIE1NTSwgSEg6bW06c3MnKSkgKyAnPC9zbWFsbD48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm1sLTIgbWItMSBjbG9zZVwiIGRhdGEtZGlzbWlzcz1cInRvYXN0XCI+PHNwYW4+JnRpbWVzOzwvc3Bhbj48L2J1dHRvbj48L2Rpdj48ZGl2IGNsYXNzPVwidG9hc3QtYm9keVwiPicgKyB0aGlzLnRleHRUb0h0bWwobWVzc2FnZSkgKyAnPC9kaXY+PC9kaXY+JztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGVsID0gJCgnI2FtaV9hbGVydF9jb250ZW50Jyk7XG5cblx0XHRlbC5hcHBlbmQoaHRtbC5yZXBsYWNlKHRoaXMuX2xpbmtFeHAsICc8YSBocmVmPVwiJDFcIiB0YXJnZXQ9XCJfYmxhbmtcIj4kMjwvYT4nKSkucHJvbWlzZSgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRlbC5maW5kKCcudG9hc3Q6bGFzdC1jaGlsZCcpLnRvYXN0KCdzaG93Jyk7XG5cblx0XHRcdCQoZG9jdW1lbnQpLnNjcm9sbFRvcCgwKTtcblxuXHRcdFx0dGhpcy51bmxvY2soKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU2hvd3MgYW4gJ2luZm8nIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBtZXNzYWdlIHRoZSBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge0Jvb2xlYW59IFtmYWRlT3V0PWZhbHNlXSBpZiBUcnVlLCB0aGUgbWVzc2FnZSBkaXNhcHBlYXJzIGFmdGVyIDYwc1xuXHQgICovXG5cblx0aW5mbzogZnVuY3Rpb24obWVzc2FnZSwgZmFkZU91dClcblx0e1xuXHRcdGlmKHRoaXMudHlwZU9mKG1lc3NhZ2UpID09PSAnQXJyYXknKVxuXHRcdHtcblx0XHRcdG1lc3NhZ2UgPSBtZXNzYWdlLmpvaW4oJy4gJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fcHVibGlzaEFsZXJ0KCd0ZXh0LWluZm8nLCAnSW5mbycsIG1lc3NhZ2UsIGZhZGVPdXQpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTaG93cyBhICdzdWNjZXNzJyBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbWVzc2FnZSB0aGUgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtCb29sZWFufSBbZmFkZU91dD1mYWxzZV0gaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcblx0ICAqL1xuXG5cdHN1Y2Nlc3M6IGZ1bmN0aW9uKG1lc3NhZ2UsIGZhZGVPdXQpXG5cdHtcblx0XHRpZih0aGlzLnR5cGVPZihtZXNzYWdlKSA9PT0gJ0FycmF5Jylcblx0XHR7XG5cdFx0XHRtZXNzYWdlID0gbWVzc2FnZS5qb2luKCcuICcpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3B1Ymxpc2hBbGVydCgndGV4dC1zdWNjZXNzJywgJ1N1Y2Nlc3MnLCBtZXNzYWdlLCBmYWRlT3V0KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU2hvd3MgYSAnd2FybmluZycgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IG1lc3NhZ2UgdGhlIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZhZGVPdXQ9ZmFsc2VdIGlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXG5cdCAgKi9cblxuXHR3YXJuaW5nOiBmdW5jdGlvbihtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0aWYodGhpcy50eXBlT2YobWVzc2FnZSkgPT09ICdBcnJheScpXG5cdFx0e1xuXHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2Uuam9pbignLiAnKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wdWJsaXNoQWxlcnQoJ3RleHQtd2FybmluZycsICdXYXJuaW5nJywgbWVzc2FnZSwgZmFkZU91dCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFNob3dzIGFuICdlcnJvcicgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IG1lc3NhZ2UgdGhlIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZhZGVPdXQ9ZmFsc2VdIGlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXG5cdCAgKi9cblxuXHRlcnJvcjogZnVuY3Rpb24obWVzc2FnZSwgZmFkZU91dClcblx0e1xuXHRcdGlmKHRoaXMudHlwZU9mKG1lc3NhZ2UpID09PSAnQXJyYXknKVxuXHRcdHtcblx0XHRcdG1lc3NhZ2UgPSBtZXNzYWdlLmpvaW4oJy4gJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fcHVibGlzaEFsZXJ0KCd0ZXh0LWRhbmdlcicsICdFcnJvcicsIG1lc3NhZ2UsIGZhZGVPdXQpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBGbHVzaGVzIG1lc3NhZ2VzXG5cdCAgKi9cblxuXHRmbHVzaDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0JCgnI2FtaV9hbGVydF9jb250ZW50JykuZW1wdHkoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBCUkVBRENSVU1CICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRmlsbCB0aGUgbWFpbiBicmVhZGNydW1iXG5cdCAgKiBAcGFyYW0ge0FycmF5fSBpdGVtcyB0aGUgYXJyYXkgb2YgaXRlbXMgKEhUTUwgZm9ybWF0KVxuXHQgICovXG5cblx0ZmlsbEJyZWFkY3J1bWI6IGZ1bmN0aW9uKGl0ZW1zKVxuXHR7XG5cdFx0bGV0IHMgPSB0aGlzLnR5cGVPZihpdGVtcykgPT09ICdBcnJheScgPyBpdGVtcy5tYXAoKGl0ZW0pID0+ICc8bGkgY2xhc3M9XCJicmVhZGNydW1iLWl0ZW1cIj4nICsgaXRlbS5yZXBsYWNlKC97e1dFQkFQUF9VUkx9fS9nLCB0aGlzLndlYkFwcFVSTCkgKyAnPC9saT4nKS5qb2luKCcnKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cblx0XHQkKCcjYW1pX2JyZWFkY3J1bWJfY29udGVudCcpLmh0bWwocyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogV0VCIEFQUExJQ0FUSU9OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFRoaXMgbWV0aG9kIG11c3QgYmUgb3ZlcmxvYWRlZCBhbmQgaXMgY2FsbGVkIHdoZW4gdGhlIFdlYiBhcHBsaWNhdGlvbiBzdGFydHNcblx0ICAqIEBldmVudCBhbWlXZWJBcHAjb25SZWFkeVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHVzZXJEYXRhXG5cdCAgKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZighdGhpcy5fZW1iZWRkZWQpXG5cdFx0e1xuXHRcdFx0YWxlcnQoJ2Vycm9yOiBgYW1pV2ViQXBwLm9uUmVhZHkoKWAgbXVzdCBiZSBvdmVybG9hZGVkIScpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBUaGlzIG1ldGhvZCBtdXN0IGJlIG92ZXJsb2FkZWQgYW5kIGlzIGNhbGxlZCB3aGVuIHRoZSB0b29sYmFyIG5lZWRzIHRvIGJlIHVwZGF0ZWRcblx0ICAqIEBldmVudCBhbWlXZWJBcHAjb25SZWZyZXNoXG5cdCAgKiBAcGFyYW0ge0Jvb2xlYW59IGlzQXV0aFxuXHQgICovXG5cblx0b25SZWZyZXNoOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZighdGhpcy5fZW1iZWRkZWQpXG5cdFx0e1xuXHRcdFx0YWxlcnQoJ2Vycm9yOiBgYW1pV2ViQXBwLm9uUmVmcmVzaCgpYCBtdXN0IGJlIG92ZXJsb2FkZWQhJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFN0YXJ0cyB0aGUgV2ViIGFwcGxpY2F0aW9uXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChsb2dvX3VybCwgaG9tZV91cmwsIGNvbnRhY3RfZW1haWwsIGFib3V0X3VybCwgdGhlbWVfdXJsLCBsb2NrZXJfdXJsLCBjaGFuZ2VfcGFzc29yZF9hbGxvd2VkLCBjaGFuZ2VfaW5mb19hbGxvd2VkLCBjaGFuZ2VfcGFzc29yZF9hbGxvd2VkKVxuXHQgICovXG5cblx0c3RhcnQ6IGZ1bmN0aW9uKHNldHRpbmdzKVxuXHR7XG5cdFx0dGhpcy5fZ2xvYmFsRGVmZXJyZWQuZG9uZSgoKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBbXG5cdFx0XHRcdGxvZ29VUkwsIGhvbWVVUkwsIGNvbnRhY3RFbWFpbCxcblx0XHRcdFx0YWJvdXRVUkwsIHRoZW1lVVJMLCBsb2NrZXJVUkwsIGVuZHBvaW50VVJMLFxuXHRcdFx0XHRjcmVhdGVBY2NvdW50QWxsb3dlZCwgY2hhbmdlSW5mb0FsbG93ZWQsIGNoYW5nZVBhc3NvcmRBbGxvd2VkXG5cdFx0XHRdID0gdGhpcy5zZXR1cChbXG5cdFx0XHRcdCdsb2dvX3VybCcsICdob21lX3VybCcsICdjb250YWN0X2VtYWlsJyxcblx0XHRcdFx0J2Fib3V0X3VybCcsICd0aGVtZV91cmwnLCAnbG9ja2VyX3VybCcsICdlbmRwb2ludF91cmwnLFxuXHRcdFx0XHQnY3JlYXRlX2FjY291bnRfYWxsb3dlZCcsICdjaGFuZ2VfaW5mb19hbGxvd2VkJywgJ2NoYW5nZV9wYXNzb3JkX2FsbG93ZWQnLFxuXHRcdFx0XSwgW1xuXHRcdFx0XHR0aGlzLm9yaWdpblVSTFxuXHRcdFx0XHRcdCsgJy9pbWFnZXMvbG9nby5wbmcnLFxuXHRcdFx0XHR0aGlzLndlYkFwcFVSTCxcblx0XHRcdFx0J2FtaUBscHNjLmluMnAzLmZyJyxcblx0XHRcdFx0J2h0dHA6Ly9jZXJuLmNoL2FtaS8nLFxuXHRcdFx0XHR0aGlzLm9yaWdpblVSTCArICcvdHdpZy9BTUkvVGhlbWUvYmx1ZS50d2lnJyxcblx0XHRcdFx0dGhpcy5vcmlnaW5VUkwgKyAnL3R3aWcvQU1JL0ZyYWdtZW50L2xvY2tlci50d2lnJyxcblx0XHRcdFx0dGhpcy5vcmlnaW5VUkwgKyAnL0FNSS9Gcm9udEVuZCcsXG5cdFx0XHRcdHRydWUsIHRydWUsIHRydWUsXG5cdFx0XHRdLCBzZXR0aW5ncyk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRhbWlDb21tYW5kLmVuZHBvaW50ID0gZW5kcG9pbnRVUkw7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR3aW5kb3cub25iZWZvcmV1bmxvYWQgPSAoZSkgPT4ge1xuXG5cdFx0XHRcdGlmKCF0aGlzLl9jYW5MZWF2ZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGYgPSBlIHx8IHdpbmRvdy5ldmVudDtcblxuXHRcdFx0XHRcdGlmKGYpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Zi5yZXR1cm5WYWx1ZSA9ICdDb25maXJtIHRoYXQgeW91IHdhbnQgdG8gbGVhdmUgdGhpcyBwYWdlPyc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuICdDb25maXJtIHRoYXQgeW91IHdhbnQgdG8gbGVhdmUgdGhpcyBwYWdlPyc7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBjb250cm9sc1VSTCA9IHRoaXMub3JpZ2luVVJMICsgJy9jb250cm9scy9DT05UUk9MUy5qc29uJztcblxuXHRcdFx0Y29uc3Qgc3ViYXBwc1VSTCA9IHRoaXMub3JpZ2luVVJMICsgJy9zdWJhcHBzL1NVQkFQUFMuanNvbic7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkLmFqYXgoe3VybDogY29udHJvbHNVUkwsIGNhY2hlOiBmYWxzZSwgY3Jvc3NEb21haW46IHRydWUsIGRhdGFUeXBlOiAnanNvbid9KS50aGVuKChkYXRhMSkgPT4ge1xuXG5cdFx0XHRcdCQuYWpheCh7dXJsOiBzdWJhcHBzVVJMLCBjYWNoZTogZmFsc2UsIGNyb3NzRG9tYWluOiB0cnVlLCBkYXRhVHlwZTogJ2pzb24nfSkudGhlbigoZGF0YTIpID0+IHtcblxuXHRcdFx0XHRcdGZvcihjb25zdCBuYW1lIGluIGRhdGExKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9jb250cm9sc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gZGF0YTFbbmFtZV07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yKGNvbnN0IG5hbWUgaW4gZGF0YTIpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3N1YmFwcHNbbmFtZS50b0xvd2VyQ2FzZSgpXSA9IGRhdGEyW25hbWVdO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKCF0aGlzLl9lbWJlZGRlZClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y29uc3QgZGljdCA9IHtcblx0XHRcdFx0XHRcdFx0TE9HT19VUkw6IGxvZ29VUkwsXG5cdFx0XHRcdFx0XHRcdEhPTUVfVVJMOiBob21lVVJMLFxuXHRcdFx0XHRcdFx0XHRDT05UQUNUX0VNQUlMOiBjb250YWN0RW1haWwsXG5cdFx0XHRcdFx0XHRcdEFCT1VUX1VSTDogYWJvdXRVUkwsXG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0JC5hamF4KHt1cmw6IHRoZW1lVVJMLCBjYWNoZTogdHJ1ZSwgY3Jvc3NEb21haW46IHRydWUsIGRhdGFUeXBlOiAndGV4dCd9KS50aGVuKChkYXRhMykgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdCQuYWpheCh7dXJsOiBsb2NrZXJVUkwsIGNhY2hlOiB0cnVlLCBjcm9zc0RvbWFpbjogdHJ1ZSwgZGF0YVR5cGU6ICd0ZXh0J30pLnRoZW4oKGRhdGE0KSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHQkKCdib2R5JykuYXBwZW5kKHRoaXMuZm9ybWF0VFdJRyhkYXRhMywgZGljdCkgKyBkYXRhNCkucHJvbWlzZSgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmxvY2soKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0YW1pTG9naW4uX3N0YXJ0KFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjcmVhdGVBY2NvdW50QWxsb3dlZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hhbmdlSW5mb0FsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNoYW5nZVBhc3NvcmRBbGxvd2VkXG5cdFx0XHRcdFx0XHRcdFx0XHQpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMudW5sb2NrKCk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmVycm9yKG1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0YWxlcnQoJ2NvdWxkIG5vdCBvcGVuIGAnICsgbG9ja2VyVVJMICsgJ2AsIHBsZWFzZSByZWxvYWQgdGhlIHBhZ2UuLi4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdGFsZXJ0KCdjb3VsZCBub3Qgb3BlbiBgJyArIHRoZW1lVVJMICsgJ2AsIHBsZWFzZSByZWxvYWQgdGhlIHBhZ2UuLi4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGxldCBkYXRhMyA9ICcnO1xuXG5cdFx0XHRcdFx0XHRpZigkKCcjYW1pX2FsZXJ0X2NvbnRlbnQnKS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdFx0ZGF0YTMgKz0gJzxkaXYgaWQ9XCJhbWlfYWxlcnRfY29udGVudFwiPjwvZGl2Pic7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmKCQoJyNhbWlfbG9naW5fbWVudV9jb250ZW50JykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdGRhdGEzICs9ICc8ZGl2IGlkPVwiYW1pX2xvZ2luX21lbnVfY29udGVudFwiPjwvZGl2Pic7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHQkLmFqYXgoe3VybDogbG9ja2VyVVJMLCBjYWNoZTogdHJ1ZSwgY3Jvc3NEb21haW46IHRydWUsIGRhdGFUeXBlOiAndGV4dCd9KS5kb25lKChkYXRhNCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdCQoJ2JvZHknKS5wcmVwZW5kKGRhdGEzICsgZGF0YTQpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdHRoaXMubG9jaygpO1xuXG5cdFx0XHRcdFx0XHRcdFx0YW1pTG9naW4uX3N0YXJ0KFxuXHRcdFx0XHRcdFx0XHRcdFx0Y3JlYXRlQWNjb3VudEFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRjaGFuZ2VJbmZvQWxsb3dlZCxcblx0XHRcdFx0XHRcdFx0XHRcdGNoYW5nZVBhc3NvcmRBbGxvd2VkXG5cdFx0XHRcdFx0XHRcdFx0KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy51bmxvY2soKTtcblxuXHRcdFx0XHRcdFx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5lcnJvcihtZXNzYWdlKTtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdGFsZXJ0KCdjb3VsZCBub3Qgb3BlbiBgJyArIHN1YmFwcHNVUkwgKyAnYCwgcGxlYXNlIHJlbG9hZCB0aGUgcGFnZS4uLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9LCAoKSA9PiB7XG5cblx0XHRcdFx0YWxlcnQoJ2NvdWxkIG5vdCBvcGVuIGAnICsgY29udHJvbHNVUkwgKyAnYCwgcGxlYXNlIHJlbG9hZCB0aGUgcGFnZS4uLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFsZXJ0KG1lc3NhZ2UpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogQ09OVFJPTFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIGEgY29udHJvbFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGNvbnRyb2wgdGhlIGFycmF5IG9mIGNvbnRyb2wgbmFtZVxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRDb250cm9sOiBmdW5jdGlvbihjb250cm9sLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoY29udHJvbC5pbmRleE9mKCdjdHJsOicpID09PSAwKVxuXHRcdHtcblx0XHRcdGNvbnRyb2wgPSBjb250cm9sLnN1YnN0cmluZyg1KTtcblx0XHR9XG5cblx0XHRjb25zdCBkZXNjciA9IHRoaXMuX2NvbnRyb2xzW2NvbnRyb2wudG9Mb3dlckNhc2UoKV07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihkZXNjcilcblx0XHR7XG5cdFx0XHR0aGlzLmxvYWRTY3JpcHRzKHRoaXMub3JpZ2luVVJMICsgJy8nICsgZGVzY3IuZmlsZSkudGhlbigobG9hZGVkKSA9PiB7XG5cblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBjbGF6eiA9IHdpbmRvd1tcblx0XHRcdFx0XHRcdGRlc2NyLmNsYXp6XG5cdFx0XHRcdFx0XTtcblxuXHRcdFx0XHRcdGNvbnN0IHByb21pc2UgPSBsb2FkZWRbMF0gPyBjbGF6ei5wcm90b3R5cGUub25SZWFkeS5hcHBseShjbGF6ei5wcm90b3R5cGUpXG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICA6IC8qLS0tLS0tLS0tLS0tLS0tLSovIG51bGwgLyotLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRfYW1pX2ludGVybmFsX3RoZW4ocHJvbWlzZSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgWy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyBjbGF6eiAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tKi9dKTtcblxuXHRcdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgY29udHJvbCBgJyArIGNvbnRyb2wgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaChtZXNzYWdlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBjb250cm9sIGAnICsgY29udHJvbCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBjb250cm9sIGAnICsgY29udHJvbCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBmaW5kIGNvbnRyb2wgYCcgKyBjb250cm9sICsgJ2AnXSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2xcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyZW50XSA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbb3duZXJdID8/P1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IGNvbnRyb2wgPz8/XG5cdCAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y3JlYXRlQ29udHJvbDogZnVuY3Rpb24ocGFyZW50LCBvd25lciwgY29udHJvbCwgcGFyYW1zLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5sb2FkQ29udHJvbChjb250cm9sLCBzZXR0aW5ncykuZG9uZSgoY29uc3RydWN0b3IpID0+IHtcblxuXHRcdFx0bGV0IGluc3RhbmNlID0gbmV3IGNvbnN0cnVjdG9yKHBhcmVudCwgb3duZXIpO1xuXG5cdFx0XHRfYW1pX2ludGVybmFsX3RoZW4oY29uc3RydWN0b3IucHJvdG90eXBlLnJlbmRlci5hcHBseShpbnN0YW5jZSwgcGFyYW1zKSwgZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtpbnN0YW5jZV0uY29uY2F0KFsuLi5hcmd1bWVudHNdKSk7XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gYSBjb250YWluZXJcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyZW50XSA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbb3duZXJdID8/P1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IGNvbnRyb2wgPz8/XG5cdCAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXNXaXRob3V0U2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gY29udHJvbFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNyZWF0ZUNvbnRyb2xJbkJvZHk6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIsIGNvbnRyb2wsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MsIGNvbnRyb2xTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0cnlcblx0XHR7XG5cdFx0XHRsZXQgUEFSQU1TID0gW107XG5cdFx0XHRsZXQgU0VUVElOR1MgPSB7fTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGZvcihsZXQga2V5IGluIHBhcmVudFNldHRpbmdzKSB7XG5cdFx0XHRcdFNFVFRJTkdTW2tleV0gPSBwYXJlbnRTZXR0aW5nc1trZXldO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IobGV0IGtleSBpbiBjb250cm9sU2V0dGluZ3MpIHtcblx0XHRcdFx0U0VUVElOR1Nba2V5XSA9IGNvbnRyb2xTZXR0aW5nc1trZXldO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Ly8vLy8vLnB1c2goc2VsZWN0b3IpO1xuXG5cdFx0XHRBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShQQVJBTVMsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MpO1xuXG5cdFx0XHRQQVJBTVMucHVzaChTRVRUSU5HUyk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLmNyZWF0ZUNvbnRyb2wocGFyZW50LCBvd25lciwgY29udHJvbCwgUEFSQU1TKS5kb25lKGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbLi4uYXJndW1lbnRzXSk7XG5cblx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblx0XHRjYXRjaChtZXNzYWdlKVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gYSBjb250YWluZXJcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyZW50XSA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbb3duZXJdID8/P1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IGNvbnRyb2wgPz8/XG5cdCAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXNXaXRob3V0U2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gY29udHJvbFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IGljb24gPz8/XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdGl0bGUgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y3JlYXRlQ29udHJvbEluQ29udGFpbmVyOiBmdW5jdGlvbihwYXJlbnQsIG93bmVyLCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBpY29uLCB0aXRsZSwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSB0aGlzLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRyeVxuXHRcdHtcblx0XHRcdHBhcmVudC5hcHBlbmRJdGVtKCc8aSBjbGFzcz1cImZhIGZhLScgKyB0aGlzLnRleHRUb0h0bWwoaWNvbikgKyAnXCI+PC9pPiAnICsgdGhpcy50ZXh0VG9IdG1sKHRpdGxlKSkuZG9uZSgoc2VsZWN0b3IpID0+IHtcblxuXHRcdFx0XHRsZXQgUEFSQU1TID0gW107XG5cdFx0XHRcdGxldCBTRVRUSU5HUyA9IHt9O1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Zm9yKGxldCBrZXkgaW4gcGFyZW50U2V0dGluZ3MpIHtcblx0XHRcdFx0XHRTRVRUSU5HU1trZXldID0gcGFyZW50U2V0dGluZ3Nba2V5XTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvcihsZXQga2V5IGluIGNvbnRyb2xTZXR0aW5ncykge1xuXHRcdFx0XHRcdFNFVFRJTkdTW2tleV0gPSBjb250cm9sU2V0dGluZ3Nba2V5XTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0UEFSQU1TLnB1c2goc2VsZWN0b3IpO1xuXG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KFBBUkFNUywgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncyk7XG5cblx0XHRcdFx0UEFSQU1TLnB1c2goU0VUVElOR1MpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0dGhpcy5jcmVhdGVDb250cm9sKHBhcmVudCwgb3duZXIsIGNvbnRyb2wsIFBBUkFNUykuZG9uZShmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbLi4uYXJndW1lbnRzXSk7XG5cblx0XHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRjYXRjaChtZXNzYWdlKVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gYSBjb250YWluZXIgZnJvbSBhIFdFQiBsaW5rXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmVudF0gPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW293bmVyXSA/Pz9cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBlbCA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjcmVhdGVDb250cm9sRnJvbVdlYkxpbms6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIsIGVsLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgZGF0YUN0cmwgPSBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtY3RybCcpID8gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWN0cmwnKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblxuXHRcdGxldCBkYXRhQ3RybExvY2F0aW9uID0gZWwuaGFzQXR0cmlidXRlKCdkYXRhLWN0cmwtbG9jYXRpb24nKSA/IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jdHJsLWxvY2F0aW9uJylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBkYXRhUGFyYW1zID0gZWwuaGFzQXR0cmlidXRlKCdkYXRhLXBhcmFtcycpID8gSlNPTi5wYXJzZShlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyYW1zJykpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbXVxuXHRcdDtcblxuXHRcdGxldCBkYXRhU2V0dGluZ3MgPSBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2V0dGluZ3MnKSA/IEpTT04ucGFyc2UoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNldHRpbmdzJykpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDoge31cblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgZGF0YUljb24gPSBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtaWNvbicpID8gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWljb24nKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAncXVlc3Rpb24nXG5cdFx0O1xuXG5cdFx0bGV0IGRhdGFUaXRsZSA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS10aXRsZScpID8gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRpdGxlJylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnVW5rbm93bidcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmxvY2soKTtcblxuXHRcdC8qKi8gaWYoZGF0YUN0cmxMb2NhdGlvbiA9PT0gJ2JvZHknKVxuXHRcdHtcblx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZUNvbnRyb2xJbkJvZHkocGFyZW50LCBvd25lciwgZGF0YUN0cmwsIGRhdGFQYXJhbXMsIGRhdGFTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIHNldHRpbmdzKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLnVubG9jaygpO1xuXG5cdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5lcnJvcihtZXNzYWdlKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlQ29udHJvbEluQ29udGFpbmVyKHBhcmVudCwgb3duZXIsIGRhdGFDdHJsLCBkYXRhUGFyYW1zLCBkYXRhU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBkYXRhSWNvbiwgZGF0YVRpdGxlLCBzZXR0aW5ncykuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy51bmxvY2soKTtcblxuXHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZXJyb3IobWVzc2FnZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogU1VCQVBQUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0cmlnZ2VyTG9naW46IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMuX2lzUmVhZHkpXG5cdFx0e1xuXHRcdFx0X2FtaV9pbnRlcm5hbF90aGVuKHRoaXMuX2N1cnJlbnRTdWJBcHBJbnN0YW5jZS5vbkxvZ2luKHRoaXMuYXJnc1sndXNlcmRhdGEnXSksIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0X2FtaV9pbnRlcm5hbF9hbHdheXModGhpcy5vblJlZnJlc2godHJ1ZSksICgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlKG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRfYW1pX2ludGVybmFsX2Fsd2F5cyh0aGlzLm9uUmVmcmVzaCh0cnVlKSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZXNvbHZlKCk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0cmlnZ2VyTG9nb3V0OiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLl9pc1JlYWR5KVxuXHRcdHtcblx0XHRcdF9hbWlfaW50ZXJuYWxfdGhlbih0aGlzLl9jdXJyZW50U3ViQXBwSW5zdGFuY2Uub25Mb2dvdXQodGhpcy5hcmdzWyd1c2VyZGF0YSddKSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRfYW1pX2ludGVybmFsX2Fsd2F5cyh0aGlzLm9uUmVmcmVzaChmYWxzZSksICgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlKG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRfYW1pX2ludGVybmFsX2Fsd2F5cyh0aGlzLm9uUmVmcmVzaChmYWxzZSksICgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyBhIHN1YmFwcFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHN1YmFwcCB0aGUgc3ViYXBwXG5cdCAgKiBAcGFyYW0gez99IFt1c2VyZGF0YV0gdGhlIHVzZXIgZGF0YVxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRTdWJBcHA6IGZ1bmN0aW9uKHN1YmFwcCwgdXNlcmRhdGEsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmxvY2soKTtcblxuXHRcdHJlc3VsdC5hbHdheXMoKCkgPT4ge1xuXG5cdFx0XHR0aGlzLnVubG9jaygpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoc3ViYXBwLmluZGV4T2YoJ3N1YmFwcDonKSA9PT0gMClcblx0XHR7XG5cdFx0XHRzdWJhcHAgPSBzdWJhcHAuc3Vic3RyaW5nKDcpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGRlc2NyID0gdGhpcy5fc3ViYXBwc1tzdWJhcHAudG9Mb3dlckNhc2UoKV07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihkZXNjcilcblx0XHR7XG5cdFx0XHR0aGlzLmxvYWRTY3JpcHRzKHRoaXMub3JpZ2luVVJMICsgJy8nICsgZGVzY3IuZmlsZSkudGhlbigobG9hZGVkKSA9PiB7XG5cblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLl9jdXJyZW50U3ViQXBwSW5zdGFuY2Uub25FeGl0KHVzZXJkYXRhKTtcblxuXHRcdFx0XHRcdGNvbnN0IGluc3RhbmNlID0gd2luZG93W2Rlc2NyLmluc3RhbmNlXTtcblxuXHRcdFx0XHRcdHRoaXMuX2N1cnJlbnRTdWJBcHBJbnN0YW5jZSA9IGluc3RhbmNlO1xuXG5cdFx0XHRcdFx0LyoqL1xuXG5cdFx0XHRcdFx0dGhpcy5maWxsQnJlYWRjcnVtYihkZXNjci5icmVhZGNydW1iKTtcblxuXHRcdFx0XHRcdGNvbnN0IHByb21pc2UgPSBsb2FkZWRbMF0gPyBpbnN0YW5jZS5vblJlYWR5KHVzZXJkYXRhKVxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgOiAvKi0tLS0tLSovIG51bGwgLyotLS0tLS0qL1xuXHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdF9hbWlfaW50ZXJuYWxfdGhlbihwcm9taXNlLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdGNvbnN0IHByb21pc2UgPSBhbWlMb2dpbi5pc0F1dGhlbnRpY2F0ZWQoKSA/IHRoaXMudHJpZ2dlckxvZ2luKClcblx0XHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMudHJpZ2dlckxvZ291dCgpXG5cdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdHByb21pc2UudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFsvKi0tLS0tLS0tLS0tLS0tLS0tLSovIGluc3RhbmNlIC8qLS0tLS0tLS0tLS0tLS0tLS0tKi9dKTtcblxuXHRcdFx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIHN1YmFwcCBgJyArIHN1YmFwcCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIHN1YmFwcCBgJyArIHN1YmFwcCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoKG1lc3NhZ2UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIHN1YmFwcCBgJyArIHN1YmFwcCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBzdWJhcHAgYCcgKyBzdWJhcHAgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgZmluZCBzdWJhcHAgYCcgKyBzdWJhcHAgKyAnYCddKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogTG9hZHMgYSBzdWJhcHAgYnkgVVJMXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gZGVmYXVsdFN1YkFwcCBpZiAnYW1pV2ViQXBwLmFyZ3NbXCJzdWJhcHBcIl0nIGlzIG51bGwsIHRoZSBkZWZhdWx0IHN1YmFwcFxuXHQgICogQHBhcmFtIHs/fSBbZGVmYXVsdFVzZXJEYXRhXSBpZiAnYW1pV2ViQXBwLmFyZ3NbXCJ1c2VyZGF0YVwiXScgaXMgbnVsbCwgdGhlIGRlZmF1bHQgdXNlciBkYXRhXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkU3ViQXBwQnlVUkw6IGZ1bmN0aW9uKGRlZmF1bHRTdWJBcHAsIGRlZmF1bHRVc2VyRGF0YSlcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGlmKHRoaXMuYXJnc1sndiddKVxuXHRcdHtcblx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnR2V0SGFzaEluZm8gLWhhc2g9XCInICsgdGhpcy50ZXh0VG9TdHJpbmcodGhpcy5hcmdzWyd2J10pICsgJ1wiJykuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cblx0XHRcdH0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0XHRsZXQganNvbjtcblxuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGpzb24gPSBKU09OLnBhcnNlKHRoaXMuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwianNvblwifS4kJywgZGF0YSlbMF0gfHwgJ3t9Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2gobWVzc2FnZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGpzb24gPSB7LyogRU1QVFkgSlNPTiAgIEVNUFRZIEpTT04gICBFTVBUWSBKU09OICAgRU1QVFkgSlNPTiAgIEVNUFRZIEpTT04gKi99O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBzdWJhcHAgPSBqc29uWydzdWJhcHAnXSB8fCBkZWZhdWx0U3ViQXBwO1xuXHRcdFx0XHRjb25zdCB1c2VyZGF0YSA9IGpzb25bJ3VzZXJkYXRhJ10gfHwgZGVmYXVsdFVzZXJEYXRhO1xuXG5cdFx0XHRcdHRoaXMubG9hZFN1YkFwcChzdWJhcHAsIHVzZXJkYXRhKS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlKCk7XG5cblx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGlmKCFhbWlSb3V0ZXIuY2hlY2soKSlcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBzdWJhcHAgPSB0aGlzLmFyZ3NbJ3N1YmFwcCddIHx8IGRlZmF1bHRTdWJBcHA7XG5cdFx0XHRcdGNvbnN0IHVzZXJkYXRhID0gdGhpcy5hcmdzWyd1c2VyZGF0YSddIHx8IGRlZmF1bHRVc2VyRGF0YTtcblxuXHRcdFx0XHR0aGlzLmxvYWRTdWJBcHAoc3ViYXBwLCB1c2VyZGF0YSkudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXG5cdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pLklDb250cm9sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgQU1JIGNvbnRyb2wgaW50ZXJmYWNlXG4gKiBAaW50ZXJmYWNlIGFtaS5JQ29udHJvbFxuICovXG5cbiRBTUlJbnRlcmZhY2UoJ2FtaS5JQ29udHJvbCcsIC8qKiBAbGVuZHMgYW1pLklDb250cm9sICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFBhdGNoZXMgYW4gSFRNTCBpZGVudGlmaWVyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gaWQgdGhlIHVucGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBwYXRjaGVkIEhUTUwgaWRlbnRpZmllclxuXHQgICovXG5cblx0cGF0Y2hJZDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUHV0cyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgdGhlIHRhcmdldCBzZWxlY3RvclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgZnJhZ21lbnRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRyZXBsYWNlSFRNTDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUHJlcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIHRoZSB0YXJnZXQgc2VsZWN0b3Jcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0d2lnIHRoZSBUV0lHIGZyYWdtZW50XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0cHJlcGVuZEhUTUw6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFwcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIHRoZSB0YXJnZXQgc2VsZWN0b3Jcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0d2lnIHRoZSBUV0lHIGZyYWdtZW50XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0YXBwZW5kSFRNTDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgaXMgcmVhZHkgdG8gcnVuXG5cdCAgKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWkuSVN1YkFwcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBBTUkgc3ViLWFwcGxpY2F0aW9uIGludGVyZmFjZVxuICogQGludGVyZmFjZSBhbWkuSVN1YkFwcFxuICovXG5cbiRBTUlJbnRlcmZhY2UoJ2FtaS5JU3ViQXBwJywgLyoqIEBsZW5kcyBhbWkuSVN1YkFwcCAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIHJlYWR5IHRvIHJ1blxuXHQgICogQHBhcmFtIHs/fSB1c2VyZGF0YSB1c2VyZGF0YVxuXHQgICovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyBhYm91dCB0byBleGl0XG5cdCAgKiBAcGFyYW0gez99IHVzZXJkYXRhIHVzZXJkYXRhXG5cdCAgKi9cblxuXHRvbkV4aXQ6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENhbGxlZCB3aGVuIGxvZ2dpbmcgaW5cblx0ICAqIEBwYXJhbSB7P30gdXNlcmRhdGEgdXNlcmRhdGFcblx0ICAqL1xuXG5cdG9uTG9naW46IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENhbGxlZCB3aGVuIGxvZ2dpbmcgb3V0XG5cdCAgKiBAcGFyYW0gez99IHVzZXJkYXRhIHVzZXJkYXRhXG5cdCAgKi9cblxuXHRvbkxvZ291dDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pLkNvbnRyb2wgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgYmFzaWMgQU1JIGNvbnRyb2xcbiAqIEBjbGFzcyBhbWkuQ29udHJvbFxuICogQGltcGxlbWVudHMge2FtaS5JQ29udHJvbH1cbiAqL1xuXG4kQU1JQ2xhc3MoJ2FtaS5Db250cm9sJywgLyoqIEBsZW5kcyBhbWkuQ29udHJvbCAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGltcGxlbWVudHM6IFthbWkuSUNvbnRyb2xdLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0YW1pLkNvbnRyb2wuaW5zdGFuY2VDbnQgPSAxO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIpXG5cdHtcblx0XHR0aGlzLl9wYXJlbnQgPSBwYXJlbnQgfHwgdGhpcztcblx0XHR0aGlzLl9vd25lciA9IG93bmVyIHx8IHRoaXM7XG5cblx0XHR0aGlzLmluc3RhbmNlU3VmZml4ID0gYW1pLkNvbnRyb2wuaW5zdGFuY2VDbnQrKztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldFBhcmVudDogZnVuY3Rpb24ocGFyZW50KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BhcmVudCA9IChwYXJlbnQgfHwgdGhpcyk7XG5cdH0sXG5cblx0Z2V0UGFyZW50OiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGFyZW50O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0T3duZXI6IGZ1bmN0aW9uKG93bmVyKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX293bmVyID0gKG93bmVyIHx8IHRoaXMpO1xuXHR9LFxuXG5cdGdldE93bmVyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fb3duZXI7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRTZWxlY3RvcjogZnVuY3Rpb24oc2VsZWN0b3IpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2VsZWN0b3IgPSAoc2VsZWN0b3IgfHwgJycpO1xuXHR9LFxuXG5cdGdldFNlbGVjdG9yOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2VsZWN0b3I7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXRjaElkOiBmdW5jdGlvbihpZGVudGlmaWVyKVxuXHR7XG5cdFx0cmV0dXJuIGlkZW50aWZpZXIgKyAnX2luc3RhbmNlJyArIHRoaXMuaW5zdGFuY2VTdWZmaXg7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZXBsYWNlSFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKVxuXHR7XG5cdFx0aWYoIXNldHRpbmdzKVxuXHRcdHtcblx0XHRcdHNldHRpbmdzID0ge307XG5cdFx0fVxuXG5cdFx0c2V0dGluZ3Muc3VmZml4ID0gdGhpcy5pbnN0YW5jZVN1ZmZpeDtcblxuXHRcdHJldHVybiBhbWlXZWJBcHAucmVwbGFjZUhUTUwoc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHByZXBlbmRIVE1MOiBmdW5jdGlvbihzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpXG5cdHtcblx0XHRpZighc2V0dGluZ3MpXG5cdFx0e1xuXHRcdFx0c2V0dGluZ3MgPSB7fTtcblx0XHR9XG5cblx0XHRzZXR0aW5ncy5zdWZmaXggPSB0aGlzLmluc3RhbmNlU3VmZml4O1xuXG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5wcmVwZW5kSFRNTChzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YXBwZW5kSFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKVxuXHR7XG5cdFx0aWYoIXNldHRpbmdzKVxuXHRcdHtcblx0XHRcdHNldHRpbmdzID0ge307XG5cdFx0fVxuXG5cdFx0c2V0dGluZ3Muc3VmZml4ID0gdGhpcy5pbnN0YW5jZVN1ZmZpeDtcblxuXHRcdHJldHVybiBhbWlXZWJBcHAuYXBwZW5kSFRNTChzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y3JlYXRlQ29udHJvbDogZnVuY3Rpb24ocGFyZW50LCBjb250cm9sLCBwYXJhbXMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5jcmVhdGVDb250cm9sKHBhcmVudCwgdGhpcywgY29udHJvbCwgcGFyYW1zLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjcmVhdGVDb250cm9sSW5Cb2R5OiBmdW5jdGlvbihwYXJlbnQsIGNvbnRyb2wsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MsIGNvbnRyb2xTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5jcmVhdGVDb250cm9sSW5Cb2R5KHBhcmVudCwgdGhpcywgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y3JlYXRlQ29udHJvbEluQ29udGFpbmVyOiBmdW5jdGlvbihwYXJlbnQsIGNvbnRyb2wsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MsIGNvbnRyb2xTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIGljb24sIHRpdGxlLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAuY3JlYXRlQ29udHJvbEluQ29udGFpbmVyKHBhcmVudCwgdGhpcywgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgaWNvbiwgdGl0bGUsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNyZWF0ZUNvbnRyb2xGcm9tV2ViTGluazogZnVuY3Rpb24ocGFyZW50LCBlbCwgcGFyZW50U2V0dGluZ3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5jcmVhdGVDb250cm9sRnJvbVdlYkxpbmsocGFyZW50LCB0aGlzLCBlbCwgcGFyZW50U2V0dGluZ3MsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pLlN1YkFwcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgYmFzaWMgQU1JIHN1Yi1hcHBsaWNhdGlvblxuICogQGNsYXNzIGFtaS5TdWJBcHBcbiAqIEBpbXBsZW1lbnRzIHthbWkuSVN1YkFwcH1cbiAqL1xuXG4kQU1JQ2xhc3MoJ2FtaS5TdWJBcHAnLCAvKiogQGxlbmRzIGFtaS5TdWJBcHAgKi8ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbXBsZW1lbnRzOiBbYW1pLklTdWJBcHBdLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25FeGl0OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25Mb2dpbjogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uTG9nb3V0OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaUNvbW1hbmQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIEFNSSBjb21tYW5kIHN1YnN5c3RlbVxuICogQG5hbWVzcGFjZSBhbWlDb21tYW5kXG4gKi9cblxuJEFNSU5hbWVzcGFjZSgnYW1pQ29tbWFuZCcsIC8qKiBAbGVuZHMgYW1pQ29tbWFuZCAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBVQkxJQyBNRU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBEZWZhdWx0IGVuZHBvaW50XG5cdCAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICovXG5cblx0ZW5kcG9pbnQ6ICdodHRwOi8veHh5eS56eicsXG5cblx0LyoqXG5cdCAgKiBEZWZhdWx0IGNvbnZlcnRlclxuXHQgICogQHR5cGUge1N0cmluZ31cblx0ICAqL1xuXG5cdGNvbnZlcnRlcjogJ0FNSVhtbFRvSnNvbi54c2wnLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBVQkxJQyBNRVRIT0RTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBFeGVjdXRlcyBhbiBBTUkgY29tbWFuZFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGNvbW1hbmQgdGhlIGNvbW1hbmRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGVuZHBvaW50LCBjb252ZXJ0ZXIsIHRpbWVvdXQsIGV4dHJhUGFyYW0sIGV4dHJhVmFsdWUpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRleGVjdXRlOiBmdW5jdGlvbihjb21tYW5kLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtlbmRwb2ludCwgY29udmVydGVyLCBjb250ZXh0LCB0aW1lb3V0LCBleHRyYVBhcmFtLCBleHRyYVZhbHVlXSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnZW5kcG9pbnQnLCAnY29udmVydGVyJywgJ2NvbnRleHQnLCAndGltZW91dCcsICdleHRyYVBhcmFtJywgJ2V4dHJhVmFsdWUnXSxcblx0XHRcdFt0aGlzLmVuZHBvaW50LCB0aGlzLmNvbnZlcnRlciwgcmVzdWx0LCAyICogNjAgKiAxMDAwLCBudWxsLCBudWxsXSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IFVSTCA9IGVuZHBvaW50LnRyaW0oKTtcblx0XHRjb25zdCBDT01NQU5EID0gY29tbWFuZC50cmltKCk7XG5cdFx0Y29uc3QgQ09OVkVSVEVSID0gY29udmVydGVyLnRyaW0oKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRhdGEgPSB7XG5cdFx0XHRDb21tYW5kOiBDT01NQU5ELFxuXHRcdFx0Q29udmVydGVyOiBDT05WRVJURVIsXG5cdFx0fTtcblxuXHRcdGlmKGV4dHJhUGFyYW0pXG5cdFx0e1xuXHRcdFx0ZGF0YVtleHRyYVBhcmFtXSA9IGV4dHJhVmFsdWUgPyBleHRyYVZhbHVlXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICgoKG51bGwpKSlcblx0XHRcdDtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1cmxXaXRoUGFyYW1ldGVycyA9IFVSTCArICc/JyArICQucGFyYW0oZGF0YSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihDT05WRVJURVIgPT09ICdBTUlYbWxUb0pzb24ueHNsJylcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEpTT04gRk9STUFUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHVybDogVVJMLFxuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdHRpbWVvdXQ6IHRpbWVvdXQsXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdHhockZpZWxkczoge1xuXHRcdFx0XHRcdHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xuXG5cdFx0XHRcdFx0Y29uc3QgaW5mbyA9IEpTUGF0aC5hcHBseSgnLkFNSU1lc3NhZ2UuaW5mby4kJywgZGF0YSk7XG5cdFx0XHRcdFx0Y29uc3QgZXJyb3IgPSBKU1BhdGguYXBwbHkoJy5BTUlNZXNzYWdlLmVycm9yLiQnLCBkYXRhKTtcblxuXHRcdFx0XHRcdGlmKGVycm9yLmxlbmd0aCA9PT0gMClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2RhdGEsIGluZm8uam9pbignLiAnKSwgdXJsV2l0aFBhcmFtZXRlcnNdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFtkYXRhLCBlcnJvci5qb2luKCcuICcpLCB1cmxXaXRoUGFyYW1ldGVyc10pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6IChqcVhIUiwgdGV4dFN0YXR1cykgPT4ge1xuXG5cdFx0XHRcdFx0aWYodGV4dFN0YXR1cyA9PT0gJ2Vycm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZXh0U3RhdHVzID0gJ3NlcnZpY2UgdGVtcG9yYXJpbHkgdW5yZWFjaGFibGUnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKHRleHRTdGF0dXMgPT09ICdwYXJzZXJlcnJvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGV4dFN0YXR1cyA9ICdyZXNvdXJjZSB0ZW1wb3JhcmlseSB1bnJlYWNoYWJsZSc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Y29uc3QgZGF0YSA9IHsnQU1JTWVzc2FnZSc6IFt7J2Vycm9yJzogW3snJCc6IHRleHRTdGF0dXN9XX1dfTtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFtkYXRhLCB0ZXh0U3RhdHVzLCB1cmxXaXRoUGFyYW1ldGVyc10pO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIE9USEVSIEZPUk1BVFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHVybDogVVJMLFxuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdHRpbWVvdXQ6IHRpbWVvdXQsXG5cdFx0XHRcdGRhdGFUeXBlOiAndGV4dCcsXG5cdFx0XHRcdHhockZpZWxkczoge1xuXHRcdFx0XHRcdHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtkYXRhLCBkYXRhLCB1cmxXaXRoUGFyYW1ldGVyc10pO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRlcnJvcjogKGpxWEhSLCB0ZXh0U3RhdHVzKSA9PiB7XG5cblx0XHRcdFx0XHRpZih0ZXh0U3RhdHVzID09PSAnZXJyb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRleHRTdGF0dXMgPSAnc2VydmljZSB0ZW1wb3JhcmlseSB1bnJlYWNoYWJsZSc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW3RleHRTdGF0dXMsIHRleHRTdGF0dXMsIHVybFdpdGhQYXJhbWV0ZXJzXSk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIExvZ3MgaW4gYnkgbG9naW4vcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyIHRoZSB1c2VyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGFzcyB0aGUgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRwYXNzTG9naW46IGZ1bmN0aW9uKHVzZXIsIHBhc3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuZXhlY3V0ZSgnR2V0U2Vzc2lvbkluZm8gLUFNSVVzZXI9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh1c2VyKSArICdcIiAtQU1JUGFzcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHBhc3MpICsgJ1wiJywge2V4dHJhUGFyYW06ICdOb0NlcnQnfSkudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRjb25zdCB1c2VySW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgcm9sZUluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHVkcEluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHNzb0luZm8gPSB7fVxuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwidXNlclwifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0dXNlckluZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInVkcFwifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0dWRwSW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwic3NvXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHRzc29JbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJyb2xlXCJ9LnJvdycsIGRhdGEpLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGxldCBuYW1lID0gJyc7XG5cdFx0XHRcdGNvbnN0IHJvbGUgPSB7fTtcblxuXHRcdFx0XHRyb3cuZmllbGQuZm9yRWFjaCgoZmllbGQpID0+IHtcblxuXHRcdFx0XHRcdHJvbGVbZmllbGRbJ0BuYW1lJ11dID0gZmllbGRbJyQnXTtcblxuXHRcdFx0XHRcdGlmKGZpZWxkWydAbmFtZSddID09PSAnbmFtZScpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZSA9IGZpZWxkWyckJ107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyb2xlSW5mb1tuYW1lXSA9IHJvbGU7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm9dKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFtkYXRhLCBtZXNzYWdlLCB7QU1JVXNlcjogJ2d1ZXN0JywgZ3Vlc3RVc2VyOiAnZ3Vlc3QnfSwge30sIHt9LCB7fV0pO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIExvZ3MgaW4gYnkgY2VydGlmaWNhdGVcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjZXJ0TG9naW46IGZ1bmN0aW9uKHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuZXhlY3V0ZSgnR2V0U2Vzc2lvbkluZm8nKS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGNvbnN0IHVzZXJJbmZvID0ge307XG5cdFx0XHRjb25zdCByb2xlSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3QgdWRwSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgc3NvSW5mbyA9IHt9O1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwidXNlclwifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0dXNlckluZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInVkcFwifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0dWRwSW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwic3NvXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHRzc29JbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJyb2xlXCJ9LnJvdycsIGRhdGEpLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGxldCBuYW1lID0gJyc7XG5cdFx0XHRcdGNvbnN0IHJvbGUgPSB7fTtcblxuXHRcdFx0XHRyb3cuZmllbGQuZm9yRWFjaCgoZmllbGQpID0+IHtcblxuXHRcdFx0XHRcdHJvbGVbZmllbGRbJ0BuYW1lJ11dID0gZmllbGRbJyQnXTtcblxuXHRcdFx0XHRcdGlmKGZpZWxkWydAbmFtZSddID09PSAnbmFtZScpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZSA9IGZpZWxkWyckJ107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyb2xlSW5mb1tuYW1lXSA9IHJvbGU7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm9dKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFtkYXRhLCBtZXNzYWdlLCB7QU1JVXNlcjogJ2d1ZXN0JywgZ3Vlc3RVc2VyOiAnZ3Vlc3QnfSwge30sIHt9LCB7fV0pO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIExvZ3Mgb3V0XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9nb3V0OiBmdW5jdGlvbihzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmV4ZWN1dGUoJ0dldFNlc3Npb25JbmZvIC1BTUlVc2VyPVwiXCIgLUFNSVBhc3M9XCJcIicsIHtleHRyYVBhcmFtOiAnTm9DZXJ0J30pLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0Y29uc3QgdXNlckluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHJvbGVJbmZvID0ge307XG5cdFx0XHRjb25zdCB1ZHBJbmZvID0ge307XG5cdFx0XHRjb25zdCBzc29JbmZvID0ge31cblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInVzZXJcIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHVzZXJJbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJ1ZHBcIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHVkcEluZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInNzb1wifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0c3NvSW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwicm9sZVwifS5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRsZXQgbmFtZSA9ICcnO1xuXHRcdFx0XHRjb25zdCByb2xlID0ge307XG5cblx0XHRcdFx0cm93LmZpZWxkLmZvckVhY2goKGZpZWxkKSA9PiB7XG5cblx0XHRcdFx0XHRyb2xlW2ZpZWxkWydAbmFtZSddXSA9IGZpZWxkWyckJ107XG5cblx0XHRcdFx0XHRpZihmaWVsZFsnQG5hbWUnXSA9PT0gJ25hbWUnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWUgPSBmaWVsZFsnJCddO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cm9sZUluZm9bbmFtZV0gPSByb2xlO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvXSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbZGF0YSwgbWVzc2FnZSwge0FNSVVzZXI6ICdndWVzdCcsIGd1ZXN0VXNlcjogJ2d1ZXN0J30sIHt9LCB7fSwge31dKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBdHRhY2hlcyBhIGNlcnRpZmljYXRlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlciB0aGUgdXNlclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhc3MgdGhlIHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0YXR0YWNoQ2VydDogZnVuY3Rpb24odXNlciwgcGFzcywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5leGVjdXRlKCdHZXRTZXNzaW9uSW5mbyAtYXR0YWNoQ2VydCAtYW1pTG9naW49XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh1c2VyKSArICdcIiAtYW1pUGFzc3dvcmQ9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwYXNzKSArICdcIicsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRGV0YWNoZXMgYSBjZXJ0aWZpY2F0ZVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHVzZXIgdGhlIHVzZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBwYXNzIHRoZSBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGRldGFjaENlcnQ6IGZ1bmN0aW9uKHVzZXIsIHBhc3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZSgnR2V0U2Vzc2lvbkluZm8gLWRldGFjaENlcnQgLWFtaUxvZ2luPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodXNlcikgKyAnXCIgLWFtaVBhc3N3b3JkPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcocGFzcykgKyAnXCInLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFkZHMgYSBuZXcgdXNlclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHVzZXIgdGhlIHVzZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBwYXNzIHRoZSBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGZpcnN0TmFtZSB0aGUgZmlyc3QgbmFtZVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGxhc3ROYW1lIHRoZSBsYXN0IG5hbWVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBlbWFpbCB0aGUgZW1haWxcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gYXR0YWNoIGF0dGFjaCB0aGUgY3VycmVudCBjZXJ0aWZpY2F0ZVxuXHQgICogQHBhcmFtIHtCb29sZWFufSBhZ3JlZSBhZ3JlZSB3aXRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGFkZFVzZXI6IGZ1bmN0aW9uKHVzZXIsIHBhc3MsIGZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsLCBhdHRhY2gsIGFncmVlLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGUoJ0FkZFVzZXIgLWFtaUxvZ2luPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodXNlcikgKyAnXCIgLWFtaVBhc3N3b3JkPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcocGFzcykgKyAnXCIgLWZpcnN0TmFtZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGZpcnN0TmFtZSkgKyAnXCIgLWxhc3ROYW1lPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcobGFzdE5hbWUpICsgJ1wiIC1lbWFpbD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGVtYWlsKSArICdcIicgKyAoYXR0YWNoID8gJyAtYXR0YWNoJyA6ICcnKSArIChhZ3JlZSA/ICcgLWFncmVlJyA6ICcnKSwgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDaGFuZ2VzIHRoZSBhY2NvdW50IGluZm9ybWF0aW9uXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gZmlyc3ROYW1lIHRoZSBmaXJzdCBuYW1lXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gbGFzdE5hbWUgdGhlIGxhc3QgbmFtZVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGVtYWlsIHRoZSBlbWFpbFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNoYW5nZUluZm86IGZ1bmN0aW9uKGZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGUoJ1NldFVzZXJJbmZvIC1maXJzdE5hbWU9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhmaXJzdE5hbWUpICsgJ1wiIC1sYXN0TmFtZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGxhc3ROYW1lKSArICdcIiAtZW1haWw9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhlbWFpbCkgKyAnXCInLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENoYW5nZXMgdGhlIGFjY291bnQgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyIHRoZSB1c2VyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gb2xkUGFzcyB0aGUgb2xkIHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gbmV3UGFzcyB0aGUgbmV3IHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y2hhbmdlUGFzczogZnVuY3Rpb24odXNlciwgb2xkUGFzcywgbmV3UGFzcywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5leGVjdXRlKCdDaGFuZ2VQYXNzd29yZCAtYW1pTG9naW49XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh1c2VyKSArICdcIiAtYW1pUGFzc3dvcmRPbGQ9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhvbGRQYXNzKSArICdcIiAtYW1pUGFzc3dvcmROZXc9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhuZXdQYXNzKSArICdcIicsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUmVzZXRzIHRoZSBhY2NvdW50IHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlciB0aGUgdXNlclxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdHJlc2V0UGFzczogZnVuY3Rpb24odXNlciwgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5leGVjdXRlKCdSZXNldFBhc3N3b3JkIC1hbWlMb2dpbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHVzZXIpICsgJ1wiJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaUxvZ2luICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIEFNSSBhdXRoZW50aWNhdGlvbiBzdWJzeXN0ZW1cbiAqIEBuYW1lc3BhY2UgYW1pTG9naW5cbiAqL1xuXG4kQU1JTmFtZXNwYWNlKCdhbWlMb2dpbicsIC8qKiBAbGVuZHMgYW1pTG9naW4gKi8ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQVUJMSUMgTUVNQkVSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNyZWF0ZUFjY291bnRBbGxvd2VkOiB0cnVlLFxuXHRjaGFuZ2VJbmZvQWxsb3dlZDogdHJ1ZSxcblx0Y2hhbmdlUGFzc29yZEFsbG93ZWQ6IHRydWUsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR1c2VyOiAnZ3Vlc3QnLFxuXHRndWVzdDogJ2d1ZXN0JyxcblxuXHRjbGllbnRETjogJycsXG5cdGlzc3VlckROOiAnJyxcblxuXHRub3RCZWZvcmU6ICcnLFxuXHRub3RBZnRlcjogJycsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyb2xlSW5mbzoge30sXG5cdHVkcEluZm86IHt9LFxuXHRzc29JbmZvOiB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQUklWQVRFIE1FVEhPRFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9zdGFydDogZnVuY3Rpb24oY3JlYXRlQWNjb3VudEFsbG93ZWQsIGNoYW5nZUluZm9BbGxvd2VkLCBjaGFuZ2VQYXNzb3JkQWxsb3dlZClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2FkVFdJR3MoW1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvdHdpZy9BTUkvRnJhZ21lbnQvbG9naW5fYnV0dG9uLnR3aWcnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvdHdpZy9BTUkvRnJhZ21lbnQvbG9nb3V0X2J1dHRvbi50d2lnJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL3R3aWcvQU1JL01vZGFsL2xvZ2luLnR3aWcnLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRoaXMuZnJhZ21lbnRMb2dpbkJ1dHRvbiA9IGRhdGFbMF07XG5cdFx0XHR0aGlzLmZyYWdtZW50TG9nb3V0QnV0dG9uID0gZGF0YVsxXTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRcdGNyZWF0ZUFjY291bnRBbGxvd2VkOiB0aGlzLmNyZWF0ZUFjY291bnRBbGxvd2VkID0gY3JlYXRlQWNjb3VudEFsbG93ZWQsXG5cdFx0XHRcdGNoYW5nZUluZm9BbGxvd2VkOiB0aGlzLmNoYW5nZUluZm9BbGxvd2VkID0gY2hhbmdlSW5mb0FsbG93ZWQsXG5cdFx0XHRcdGNoYW5nZVBhc3NvcmRBbGxvd2VkOiB0aGlzLmNoYW5nZVBhc3NvcmRBbGxvd2VkID0gY2hhbmdlUGFzc29yZEFsbG93ZWQsXG5cdFx0XHR9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pV2ViQXBwLmFwcGVuZEhUTUwoJ2JvZHknLCBkYXRhWzJdLCB7ZGljdDogZGljdH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0I3ODk0Q0MxXzFEQUFfNEE3RV9CN0QxX0RCREY2RjA2QUM3MycpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5mb3JtX2xvZ2luKGUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcjRUUwNTVDRDRfRTU4Rl80ODM0XzgwMjBfOTg2QUUzRjhENjdEJykuc3VibWl0KChlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmZvcm1fYWRkVXNlcihlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnI0RBMjA0N0EyXzlFNURfNDIwRF9CNkU3X0ZBMjYxRDJFRjEwRicpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5mb3JtX3JlbWluZFBhc3MoZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdCQoJyNEOUVBRjk5OF9FRDhFXzQ0RDJfQTBCRV84QzVDRjVFNDM4QkQnKS5zdWJtaXQoKGUpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuZm9ybV9jaGFuZ2VJbmZvKGUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcjRTkyQTEwOTdfOTgzQl80ODU3Xzg3NUZfMDdFNDY1OUI0MUIwJykuc3VibWl0KChlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmZvcm1fY2hhbmdlUGFzcyhlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHQkKCcjRTZFMzBFRUNfMTVFRV80RkNGXzk4MDlfMkI4RUMyRkVGMzg4LCNDQ0Q4RTZGMV82REY4XzRCRERfQTBFQ19DM0MzODA4MzAxODcnKS5jaGFuZ2UoKCkgPT4ge1xuXG5cdFx0XHRcdFx0Y29uc3QgcGFzczEgPSAkKCcjRTZFMzBFRUNfMTVFRV80RkNGXzk4MDlfMkI4RUMyRkVGMzg4JykudmFsKCk7XG5cdFx0XHRcdFx0Y29uc3QgcGFzczIgPSAkKCcjQ0NEOEU2RjFfNkRGOF80QkREX0EwRUNfQzNDMzgwODMwMTg3JykudmFsKCk7XG5cblx0XHRcdFx0XHQkKCcjQ0NEOEU2RjFfNkRGOF80QkREX0EwRUNfQzNDMzgwODMwMTg3JykuZ2V0KDApLnNldEN1c3RvbVZhbGlkaXR5KFxuXHRcdFx0XHRcdFx0cGFzczEubGVuZ3RoID4gMCAmJiBwYXNzMi5sZW5ndGggPiAwICYmIHBhc3MxICE9PSBwYXNzMiA/ICdQYXNzd29yZHMgZG9uXFwndCBtYXRjaC4nIDogJydcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcjRDQ4N0ZFNzJfOEQ5NV80MDQ4X0JFQTNfMjUyMjc0ODYyQUY0LCNFRTFEQTU4Q18zNzYxXzQ3MzRfQTlDMl9FODA4Q0REN0VFNzcnKS5jaGFuZ2UoKCkgPT4ge1xuXG5cdFx0XHRcdFx0Y29uc3QgcGFzczEgPSAkKCcjRDQ4N0ZFNzJfOEQ5NV80MDQ4X0JFQTNfMjUyMjc0ODYyQUY0JykudmFsKCk7XG5cdFx0XHRcdFx0Y29uc3QgcGFzczIgPSAkKCcjRUUxREE1OENfMzc2MV80NzM0X0E5QzJfRTgwOENERDdFRTc3JykudmFsKCk7XG5cblx0XHRcdFx0XHQkKCcjRUUxREE1OENfMzc2MV80NzM0X0E5QzJfRTgwOENERDdFRTc3JykuZ2V0KDApLnNldEN1c3RvbVZhbGlkaXR5KFxuXHRcdFx0XHRcdFx0cGFzczEubGVuZ3RoID4gMCAmJiBwYXNzMi5sZW5ndGggPiAwICYmIHBhc3MxICE9PSBwYXNzMiA/ICdQYXNzd29yZHMgZG9uXFwndCBtYXRjaC4nIDogJydcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChlKSA9PiB7XG5cblx0XHRcdFx0aWYodGhpcy5zc29JbmZvLnVybC5zdGFydHNXaXRoKGUub3JpZ2luKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IHVzZXIgPSBlLmRhdGEudXNlcjtcblx0XHRcdFx0XHRjb25zdCBwYXNzID0gZS5kYXRhLnBhc3M7XG5cblx0XHRcdFx0XHRpZih1c2VyICYmIHBhc3MpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhpcy5mb3JtX2xvZ2luMih1c2VyLCBwYXNzKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRlLnNvdXJjZS5jbG9zZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sIGZhbHNlKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IHVzZXJkYXRhID0gYW1pV2ViQXBwLmFyZ3NbJ3VzZXJkYXRhJ10gfHwgJyc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRhbWlDb21tYW5kLmNlcnRMb2dpbigpLmZhaWwoKGRhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykgPT4ge1xuXG5cdFx0XHRcdHRoaXMuX3VwZGF0ZSh1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pLmFsd2F5cygoLyotLS0qLykgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0pLmRvbmUoKGRhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykgPT4ge1xuXG5cdFx0XHRcdF9hbWlfaW50ZXJuYWxfdGhlbihhbWlXZWJBcHAub25SZWFkeSh1c2VyZGF0YSksICgpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5faXNSZWFkeSA9IHRydWU7XG5cblx0XHRcdFx0XHR0aGlzLl91cGRhdGUodXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKS50aGVuKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlKG1lc3NhZ2UpO1xuXG5cdFx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLl9pc1JlYWR5ID0gdHJ1ZTtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfc3VjY2VzczogZnVuY3Rpb24obWVzc2FnZSlcblx0e1xuXHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UsIHRydWUpO1xuXHRcdHRoaXMuX2NsZWFuKCk7XG5cdH0sXG5cblx0X2Vycm9yOiBmdW5jdGlvbihtZXNzYWdlKVxuXHR7XG5cdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdHRoaXMuX2NsZWFuKCk7XG5cdH0sXG5cblx0X3VubG9jazogZnVuY3Rpb24oKVxuXHR7XG5cdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdHRoaXMuX2NsZWFuKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfY2xlYW46IGZ1bmN0aW9uKClcblx0e1xuXHRcdCQoJyNCNzg5NENDMV8xREFBXzRBN0VfQjdEMV9EQkRGNkYwNkFDNzMnKS50cmlnZ2VyKCdyZXNldCcpO1xuXHRcdCQoJyNFRTA1NUNENF9FNThGXzQ4MzRfODAyMF85ODZBRTNGOEQ2N0QnKS50cmlnZ2VyKCdyZXNldCcpO1xuXHRcdCQoJyNEQTIwNDdBMl85RTVEXzQyMERfQjZFN19GQTI2MUQyRUYxMEYnKS50cmlnZ2VyKCdyZXNldCcpO1xuXHRcdCQoJyNFOTJBMTA5N185ODNCXzQ4NTdfODc1Rl8wN0U0NjU5QjQxQjAnKS50cmlnZ2VyKCdyZXNldCcpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3VwZGF0ZTogZnVuY3Rpb24odXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdXNlciA9IHRoaXMudXNlciA9IHVzZXJJbmZvLkFNSVVzZXIgfHwgJyc7XG5cdFx0Y29uc3QgZ3Vlc3QgPSB0aGlzLmd1ZXN0ID0gdXNlckluZm8uZ3Vlc3RVc2VyIHx8ICcnO1xuXG5cdFx0Y29uc3Qgbm90QmVmb3JlID0gdGhpcy5ub3RCZWZvcmUgPSB1c2VySW5mby5ub3RCZWZvcmUgfHwgJyc7XG5cdFx0Y29uc3Qgbm90QWZ0ZXIgPSB0aGlzLm5vdEFmdGVyID0gdXNlckluZm8ubm90QWZ0ZXIgfHwgJyc7XG5cblx0XHRjb25zdCBjbGllbnRETkluU2Vzc2lvbiA9IHRoaXMuY2xpZW50RE4gPSB1c2VySW5mby5jbGllbnRETkluU2Vzc2lvbiB8fCAnJztcblx0XHRjb25zdCBpc3N1ZXJETkluU2Vzc2lvbiA9IHRoaXMuaXNzdWVyRE4gPSB1c2VySW5mby5pc3N1ZXJETkluU2Vzc2lvbiB8fCAnJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdCQoJyNBMDlBRTMxNl83MDY4XzRCQzFfOTZBOV82Qjg3RDI4ODYzRkUnKS5wcm9wKCdkaXNhYmxlZCcsICFjbGllbnRETkluU2Vzc2lvbiB8fCAhaXNzdWVyRE5JblNlc3Npb24pO1xuXG5cdFx0JCgnI0MzRTk0RjZEXzQ4RTBfODZDMF8zNTM0XzY5MTcyOEU0OTJGNCcpLmF0dHIoJ3NyYycsIHVkcEluZm8udGVybXNBbmRDb25kaXRpb25zIHx8IGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2RvY3MvdGVybXNfYW5kX2NvbmRpdGlvbnMuaHRtbCcpO1xuXHRcdCQoJyNFNTBGRjhCRF9CMEY1X0NENzJfRjlEQ19GQzJCRkE1REJBMjcnKS5hdHRyKCdzcmMnLCB1ZHBJbmZvLnRlcm1zQW5kQ29uZGl0aW9ucyB8fCBhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9kb2NzL3Rlcm1zX2FuZF9jb25kaXRpb25zLmh0bWwnKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMucm9sZUluZm8gPSByb2xlSW5mbztcblx0XHR0aGlzLnVkcEluZm8gPSB1ZHBJbmZvO1xuXHRcdHRoaXMuc3NvSW5mbyA9IHNzb0luZm87XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0Y3JlYXRlQWNjb3VudEFsbG93ZWQ6IHRoaXMuY3JlYXRlQWNjb3VudEFsbG93ZWQsXG5cdFx0XHRjaGFuZ2VJbmZvQWxsb3dlZDogdGhpcy5jaGFuZ2VJbmZvQWxsb3dlZCxcblx0XHRcdGNoYW5nZVBhc3NvcmRBbGxvd2VkOiB0aGlzLmNoYW5nZVBhc3NvcmRBbGxvd2VkLFxuXHRcdFx0LyoqL1xuXHRcdFx0c3NvX2xhYmVsOiBzc29JbmZvLmxhYmVsIHx8ICdTU08nLFxuXHRcdFx0c3NvX3VybDogc3NvSW5mby51cmwgfHwgJ0BOVUxMJyxcblx0XHR9O1xuXG5cdFx0aWYodXNlciAhPT0gZ3Vlc3QpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBHRVQgSU5GTyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCB2YWxpZCA9IHVzZXJJbmZvLnZhbGlkIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCBjZXJ0RW5hYmxlZCA9IHVzZXJJbmZvLmNlcnRFbmFibGVkIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCB2b21zRW5hYmxlZCA9IHVzZXJJbmZvLnZvbXNFbmFibGVkIHx8ICdmYWxzZSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBmaXJzdE5hbWUgPSB1c2VySW5mby5maXJzdE5hbWUgfHwgJyc7XG5cdFx0XHRjb25zdCBsYXN0TmFtZSA9IHVzZXJJbmZvLmxhc3ROYW1lIHx8ICcnO1xuXHRcdFx0Y29uc3QgZW1haWwgPSB1c2VySW5mby5lbWFpbCB8fCAnJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGNsaWVudEROSW5BTUkgPSB1c2VySW5mby5jbGllbnRETkluQU1JIHx8ICcnO1xuXHRcdFx0Y29uc3QgaXNzdWVyRE5JbkFNSSA9IHVzZXJJbmZvLmlzc3VlckROSW5BTUkgfHwgJyc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU0VUIElORk8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCgnI0U1MTNGMjdEXzU1MjFfNEIwOF9CRjYxXzUyQUZCODEzNTZGNycpLnZhbChmaXJzdE5hbWUpO1xuXHRcdFx0JCgnI0FGRjBCNUMwX0JFRUNfNDg0Ml85MTZEX0RDQkE3RjU4OTE5NScpLnZhbChsYXN0TmFtZSk7XG5cdFx0XHQkKCcjQzU4NzQ4NkJfNjJDMF80QjZFXzkyODhfRDhGOUY4OUQxNTdCJykudmFsKGVtYWlsKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQoJyNBQkVCMDI5MV80MEIwXzQxNEFfQTQyQl9FN0VBQkI5QjQ4N0UnKS52YWwoZmlyc3ROYW1lKTtcblx0XHRcdCQoJyNBNUFGREI2Ml8xMDM0XzRGNjZfQTNFNl85MzQxQjMxRkEyOTAnKS52YWwobGFzdE5hbWUpO1xuXHRcdFx0JCgnI0Q3MzBBNzc0XzA1RUFfNDdBQl9BMEM4X0Q5Mjc1MzgwMkUzRScpLnZhbChlbWFpbCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKCcjRDFCRUUzQkZfOTE2MV80MURDX0JDNTNfQzQ0RkZFNEQyNTIyJykudmFsKGNsaWVudEROSW5BTUkpO1xuXHRcdFx0JCgnI0M3NjgwNUQ3XzFFODZfNDIzMV85MDcxXzFEMDQ3ODM0MjNCQicpLnZhbChjbGllbnRETkluU2Vzc2lvbik7XG5cdFx0XHQkKCcjRjQyRkFGNkJfMkM4RF80MTQyXzhCRDlfRTVCQ0RDQUEwNUFBJykudmFsKGlzc3VlckROSW5BTUkpO1xuXHRcdFx0JCgnI0ZFMkY2MjMyX0MyNTZfNEI4MF85MzlDX0VCRUM5MDMyMDMwOCcpLnZhbChpc3N1ZXJETkluU2Vzc2lvbik7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsZXQgdGFibGUgPSBbXTtcblxuXHRcdFx0Zm9yKGxldCByb2xlIGluIHJvbGVJbmZvKVxuXHRcdFx0e1xuXHRcdFx0XHR0YWJsZS5wdXNoKCc8dHI+Jyk7XG5cdFx0XHRcdHRhYmxlLnB1c2goJzx0ZD4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwocm9sZUluZm9bcm9sZV0ubmFtZSB8fCAnTi9BJykgKyAnPC90ZD4nKTtcblx0XHRcdFx0dGFibGUucHVzaCgnPHRkPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChyb2xlSW5mb1tyb2xlXS5kZXNjcmlwdGlvbiB8fCAnTi9BJykgKyAnPC90ZD4nKTtcblx0XHRcdFx0dGFibGUucHVzaCgnPC90cj4nKTtcblx0XHRcdH1cblxuXHRcdFx0JCgnI0JCMDc2NzZCX0VBQ0FfOUI0Ml9FRDUxXzQ3N0RCMjk3NjA0MScpLmh0bWwodGFibGUuam9pbignJykpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIENIRUNLIFVTRVIgU1RBVFVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGxldCBpY29uID0gJyc7XG5cdFx0XHRsZXQgbWVzc2FnZSA9ICcnO1xuXG5cdFx0XHRpZih2YWxpZCAhPT0gJ2ZhbHNlJylcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogVkFMSUQgVVNFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihjZXJ0RW5hYmxlZCAhPT0gJ2ZhbHNlJyAmJiBjbGllbnRETkluQU1JICYmIGlzc3VlckROSW5BTUkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZighY2xpZW50RE5JblNlc3Npb25cblx0XHRcdFx0XHQgICB8fFxuXHRcdFx0XHRcdCAgICFpc3N1ZXJETkluU2Vzc2lvblxuXHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdG1lc3NhZ2UgPSAnSXQgaXMgcmVjb21tZW5kZWQgdG8gYXV0aGVudGljYXRlIHdpdGggYSBYLjUwOSBjZXJ0aWZpY2F0ZS4nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYoY2xpZW50RE5JbkFNSSAhPT0gY2xpZW50RE5JblNlc3Npb25cblx0XHRcdFx0XHRcdCAgIHx8XG5cdFx0XHRcdFx0XHQgICBpc3N1ZXJETkluQU1JICE9PSBpc3N1ZXJETkluU2Vzc2lvblxuXHRcdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0XHRtZXNzYWdlID0gJ1RoZSBYLjUwOSBjZXJ0aWZpY2F0ZSBpbiB0aGUgc2Vzc2lvbiBkaWZmZXJzIGZyb20gdGhlIG9uZSBpbiBBTUkuJztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKG1lc3NhZ2UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkKCcjRDk0NEIwMURfMkU4RF80RUU5XzlEQ0NfMjY5MTQzOEJCQTE2JykuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1pbmZvLWNpcmNsZSB0ZXh0LXdhcm5pbmdcIj48L2k+ICcgKyBtZXNzYWdlKTtcblxuXHRcdFx0XHRcdGljb24gPSAnPGEgY2xhc3M9XCJuYXYtbGluayB0ZXh0LXdhcm5pbmdcIiBocmVmPVwiamF2YXNjcmlwdDphbWlMb2dpbi5hY2NvdW50U3RhdHVzKCk7XCI+J1xuXHRcdFx0XHRcdCAgICAgICArXG5cdFx0XHRcdFx0ICAgICAgICc8aSBjbGFzcz1cImZhIGZhLWluZm8tY2lyY2xlXCI+PC9pPidcblx0XHRcdFx0XHQgICAgICAgK1xuXHRcdFx0XHRcdCAgICAgICAnPC9hPidcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdCQoJyNGM0ZGOUY0M19ERTcyXzQwQkJfQjFCQV9CN0IzQzkwMDI2NzEnKS5wYXJlbnQoKS5jc3MoJ2JhY2tncm91bmQnLCAnI0I4RDQ5QiB1cmwoXCInICsgYW1pV2ViQXBwLm9yaWdpblVSTCArICcvaW1hZ2VzL2NlcnRpZmljYXRlLWdyZWVuLnBuZ1wiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlcicpXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ2JhY2tncm91bmQtc2l6ZScsICdjb3ZlcicpXG5cdFx0XHRcdDtcblxuXHRcdFx0XHQkKCcjRjNGRjlGNDNfREU3Ml80MEJCX0IxQkFfQjdCM0M5MDAyNjcxJykuY3NzKCdjb2xvcicsICcjMDA2NDAwJylcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtbGVhZlwiPjwvaT4gdmFsaWQgPGkgY2xhc3M9XCJmYSBmYS1sZWFmXCI+PC9pPicpXG5cdFx0XHRcdDtcblxuXHRcdFx0XHQkKCcjRTkxMjgwRjZfRTdDNl8zRTUzX0E0NTdfNjQ2OTk1Qzk5MzE3JykudGV4dChub3RCZWZvcmUgKyAnIC0gJyArIG5vdEFmdGVyKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBJTlZBTElEIFVTRVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKHZvbXNFbmFibGVkICE9PSAnZmFsc2UnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoIWNsaWVudEROSW5BTUlcblx0XHRcdFx0XHQgICB8fFxuXHRcdFx0XHRcdCAgICFpc3N1ZXJETkluQU1JXG5cdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0bWVzc2FnZSA9ICdSZWdpc3RlciBhIHZhbGlkIFguNTA5IGNlcnRpZmljYXRlLic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRtZXNzYWdlID0gJ0NoZWNrIHlvdXIgdmlydHVhbCBvcmdhbml6YXRpb24gcm9sZXMuJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bWVzc2FnZSA9ICdVbmV4cGVjdGVkIGlzc3VlLCBjb250YWN0IHRoZSBBTUkgdGVhbS4nO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihtZXNzYWdlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgnI0Q5NDRCMDFEXzJFOERfNEVFOV85RENDXzI2OTE0MzhCQkExNicpLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGUgdGV4dC1kYW5nZXJcIj48L2k+ICcgKyBtZXNzYWdlKTtcblxuXHRcdFx0XHRcdGljb24gPSAnPGEgY2xhc3M9XCJuYXYtbGluayB0ZXh0LWRhbmdlclwiIGhyZWY9XCJqYXZhc2NyaXB0OmFtaUxvZ2luLmFjY291bnRTdGF0dXMoKTtcIj4nXG5cdFx0XHRcdFx0ICAgICAgICtcblx0XHRcdFx0XHQgICAgICAgJzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGVcIj48L2k+J1xuXHRcdFx0XHRcdCAgICAgICArXG5cdFx0XHRcdFx0ICAgICAgICc8L2E+J1xuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0YzRkY5RjQzX0RFNzJfNDBCQl9CMUJBX0I3QjNDOTAwMjY3MScpLnBhcmVudCgpLmNzcygnYmFja2dyb3VuZCcsICcjRThDOENGIHVybChcIicgKyBhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9pbWFnZXMvY2VydGlmaWNhdGUtcGluay5wbmdcIikgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXInKVxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCdiYWNrZ3JvdW5kLXNpemUnLCAnY292ZXInKVxuXHRcdFx0XHQ7XG5cblx0XHRcdFx0JCgnI0YzRkY5RjQzX0RFNzJfNDBCQl9CMUJBX0I3QjNDOTAwMjY3MScpLmNzcygnY29sb3InLCAnIzhCMDAwMCcpXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5odG1sKCc8aSBjbGFzcz1cImZhIGZhLWxlYWZcIj48L2k+IGludmFsaWQgPGkgY2xhc3M9XCJmYSBmYS1sZWFmXCI+PC9pPicpXG5cdFx0XHRcdDtcblxuXHRcdFx0XHQkKCcjRTkxMjgwRjZfRTdDNl8zRTUzX0E0NTdfNjQ2OTk1Qzk5MzE3JykudGV4dChub3RCZWZvcmUgKyAnIC0gJyArIG5vdEFmdGVyKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFVQREFURSBNRU5VIEJBUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGRpY3RbJ3VzZXInXSA9IHVzZXI7XG5cdFx0XHRkaWN0WydpY29uJ10gPSBpY29uO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX2xvZ2luX21lbnVfY29udGVudCcsIHRoaXMuZnJhZ21lbnRMb2dvdXRCdXR0b24sIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnRyaWdnZXJMb2dpbigpLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX2xvZ2luX21lbnVfY29udGVudCcsIHRoaXMuZnJhZ21lbnRMb2dpbkJ1dHRvbiwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudHJpZ2dlckxvZ291dCgpLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FVEhPRFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIGN1cnJlbnQgdXNlclxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGN1cnJlbnQgdXNlclxuXHQgICovXG5cblx0Z2V0VXNlcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudXNlcjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgZ3Vlc3QgdXNlclxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGd1ZXN0IHVzZXJcblx0ICAqL1xuXG5cdGdldEd1ZXN0OiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5ndWVzdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgY2xpZW50IEROXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgY2xpZW50IEROXG5cdCAgKi9cblxuXHRnZXRDbGllbnRETjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuY2xpZW50RE47XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIGlzc3VlciBETlxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGlzc3VlciBETlxuXHQgICovXG5cblx0Z2V0SXNzdWVyRE46IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzc3VlckROO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDaGVja3Mgd2hldGhlciB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGlzQXV0aGVudGljYXRlZDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudXNlciAhPT0gdGhpcy5ndWVzdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hlY2tzIHdoZXRoZXIgdGhlIHVzZXIgaGFzIHRoZSBnaXZlbiByb2xlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcm9sZSB0aGUgcm9sZVxuXHQgICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAgKi9cblxuXHRoYXNSb2xlOiBmdW5jdGlvbihyb2xlTmFtZSlcblx0e1xuXHRcdHJldHVybiByb2xlTmFtZSBpbiB0aGlzLnJvbGVJbmZvO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBPcGVucyB0aGUgJ1NTTycgbW9kYWwgd2luZG93XG5cdCAgKi9cblxuXHRzc286IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuX2NsZWFuKCk7XG5cblx0XHR3aW5kb3cub3Blbih0aGlzLnNzb0luZm8udXJsLCAnU2luZ2xlIFNpZ24tT24nLCAnbWVudWJhcj1ubywgc3RhdHVzPW5vLCBzY3JvbGxiYXJzPW5vLCB3aWR0aD04MDAsIGhlaWdodD00NTAnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogT3BlbnMgdGhlICdTaWduSW4nIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0c2lnbkluOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jbGVhbigpO1xuXG5cdFx0JCgnI0QyQjVGQURFXzk3QTNfNEI4Q184NTYxXzdBOUFFQUNEQkU1QicpLm1vZGFsKCdzaG93Jyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnQ2hhbmdlIEluZm8nIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0Y2hhbmdlSW5mbzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblxuXHRcdCQoJyNEOUVBRjk5OF9FRDhFXzQ0RDJfQTBCRV84QzVDRjVFNDM4QkQnKS5tb2RhbCgnc2hvdycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBPcGVucyB0aGUgJ0NoYW5nZSBQYXNzd29yZCcgbW9kYWwgd2luZG93XG5cdCAgKi9cblxuXHRjaGFuZ2VQYXNzOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jbGVhbigpO1xuXG5cdFx0JCgnI0U5MkExMDk3Xzk4M0JfNDg1N184NzVGXzA3RTQ2NTlCNDFCMCcpLm1vZGFsKCdzaG93Jyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnQWNjb3VudCBTdGF0dXMnIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0YWNjb3VudFN0YXR1czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblxuXHRcdCQoJyNBQjFDQjE4M185NkVCXzQxMTZfOEE5RV80NDA5QkUwNThGMzQnKS5tb2RhbCgnc2hvdycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTaWducyBvdXRcblx0ICAqL1xuXG5cdHNpZ25PdXQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRyZXR1cm4gYW1pQ29tbWFuZC5sb2dvdXQoKS5hbHdheXMoKGRhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykgPT4ge1xuXG5cdFx0XHR0aGlzLl91cGRhdGUodXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLl91bmxvY2soKTtcblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9sb2dpbjogZnVuY3Rpb24oZSlcblx0e1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGNvbnN0IHZhbHVlcyA9ICQoZS50YXJnZXQpLnNlcmlhbGl6ZU9iamVjdCgpO1xuXG5cdFx0cmV0dXJuIHRoaXMuZm9ybV9sb2dpbjIodmFsdWVzWyd1c2VyJ10sIHZhbHVlc1sncGFzcyddKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fbG9naW4yOiBmdW5jdGlvbih1c2VyLCBwYXNzKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgcHJvbWlzZSA9ICh1c2VyICYmIHBhc3MpID8gYW1pQ29tbWFuZC5wYXNzTG9naW4odXNlci50cmltKCksIHBhc3MudHJpbSgpKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFtaUNvbW1hbmQuY2VydExvZ2luKC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0qLylcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0cHJvbWlzZS50aGVuKChkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pID0+IHtcblxuXHRcdFx0dGhpcy5fdXBkYXRlKHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0aWYodXNlckluZm8uQU1JVXNlciAhPT0gdXNlckluZm8uZ3Vlc3RVc2VyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgnI0QyQjVGQURFXzk3QTNfNEI4Q184NTYxXzdBOUFFQUNEQkU1QicpLm1vZGFsKCdoaWRlJyk7XG5cblx0XHRcdFx0XHR0aGlzLl91bmxvY2soKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdGlmKHVzZXJJbmZvLkFNSVVzZXIgIT09IHVzZXJJbmZvLmd1ZXN0VXNlcilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCQoJyNEMkI1RkFERV85N0EzXzRCOENfODU2MV83QTlBRUFDREJFNUInKS5tb2RhbCgnaGlkZScpO1xuXG5cdFx0XHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRpZih1c2VySW5mby5BTUlVc2VyID09PSB1c2VySW5mby5ndWVzdFVzZXIpXG5cdFx0XHR7XG5cdFx0XHRcdGxldCBtZXNzYWdlID0gJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZC4nO1xuXG5cdFx0XHRcdGlmKHVzZXJJbmZvLmNsaWVudEROSW5TZXNzaW9uIHx8IHVzZXJJbmZvLmlzc3VlckROSW5TZXNzaW9uKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bWVzc2FnZSArPSAnIENsaWVudCBETiBpbiBzZXNzaW9uOiAnICsgYW1pV2ViQXBwLnRleHRUb0h0bWwodXNlckluZm8uY2xpZW50RE5JblNlc3Npb24pICsgJy4nXG5cdFx0XHRcdFx0ICAgICAgICAgICArXG5cdFx0XHRcdFx0ICAgICAgICAgICAnIElzc3VlciBETiBpbiBzZXNzaW9uOiAnICsgYW1pV2ViQXBwLnRleHRUb0h0bWwodXNlckluZm8uaXNzdWVyRE5JblNlc3Npb24pICsgJy4nXG5cdFx0XHRcdFx0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0XHR9XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKSA9PiB7XG5cblx0XHRcdHRoaXMuX3VwZGF0ZSh1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pLmFsd2F5cygoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fYXR0YWNoQ2VydDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdXNlciA9ICQoJyNFNjRGMjRCMl8zM0U2XzRERURfOUIyNF8yOEJFMDQyMTk2MTMnKS52YWwoKTtcblx0XHRjb25zdCBwYXNzID0gJCgnI0E0REZEMDM5XzAzNEZfNEQxMF85NjY4XzM4NUFFRjRGQkJCOScpLnZhbCgpO1xuXG5cdFx0aWYoIXVzZXIgfHwgIXBhc3MpXG5cdFx0e1xuXHRcdFx0dGhpcy5fZXJyb3IoJ1BsZWFzZSwgZmlsbCBhbGwgZmllbGRzIHdpdGggYSByZWQgc3Rhci4nKTtcblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmF0dGFjaENlcnQodXNlciwgcGFzcykudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2RldGFjaENlcnQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVzZXIgPSAkKCcjRTY0RjI0QjJfMzNFNl80REVEXzlCMjRfMjhCRTA0MjE5NjEzJykudmFsKCk7XG5cdFx0Y29uc3QgcGFzcyA9ICQoJyNBNERGRDAzOV8wMzRGXzREMTBfOTY2OF8zODVBRUY0RkJCQjknKS52YWwoKTtcblxuXHRcdGlmKCF1c2VyIHx8ICFwYXNzKVxuXHRcdHtcblx0XHRcdHRoaXMuX2Vycm9yKCdQbGVhc2UsIGZpbGwgYWxsIGZpZWxkcyB3aXRoIGEgcmVkIHN0YXIuJyk7XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5kZXRhY2hDZXJ0KHVzZXIsIHBhc3MpLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9hZGRVc2VyOiBmdW5jdGlvbihlKVxuXHR7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gJChlLnRhcmdldCkuc2VyaWFsaXplT2JqZWN0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5hZGRVc2VyKHZhbHVlc1snbG9naW4nXSwgdmFsdWVzWydwYXNzJ10sIHZhbHVlc1snZmlyc3RfbmFtZSddLCB2YWx1ZXNbJ2xhc3RfbmFtZSddLCB2YWx1ZXNbJ2VtYWlsJ10sICdhdHRhY2gnIGluIHZhbHVlcywgJ2FncmVlJyBpbiB2YWx1ZXMpLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9yZW1pbmRQYXNzOiBmdW5jdGlvbihlKVxuXHR7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gJChlLnRhcmdldCkuc2VyaWFsaXplT2JqZWN0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5yZXNldFBhc3ModmFsdWVzWyd1c2VyJ10pLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9jaGFuZ2VJbmZvOiBmdW5jdGlvbihlKVxuXHR7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gJChlLnRhcmdldCkuc2VyaWFsaXplT2JqZWN0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5jaGFuZ2VJbmZvKHZhbHVlc1snZmlyc3RfbmFtZSddLCB2YWx1ZXNbJ2xhc3RfbmFtZSddLCB2YWx1ZXNbJ2VtYWlsJ10pLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9jaGFuZ2VQYXNzOiBmdW5jdGlvbihlKVxuXHR7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gJChlLnRhcmdldCkuc2VyaWFsaXplT2JqZWN0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5jaGFuZ2VQYXNzKHRoaXMudXNlciwgdmFsdWVzWydvbGRfcGFzcyddLCB2YWx1ZXNbJ25ld19wYXNzJ10pLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKiFcbiAqIEFNSSBXZWIgRnJhbWV3b3JrIC0gQU1JRG9jLmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG52YXIgYW1pRG9jID0ge1wiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcIiRBTUlOYW1lc3BhY2VcIixcImRlc2NcIjpcIkNyZWF0ZSBhIG5ldyBuYW1lc3BhY2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCIkbmFtZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgbmFtZXNwYWNlIG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCIkZGVzY3JcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIG5hbWVzcGFjZSBib2R5XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCIkQU1JSW50ZXJmYWNlXCIsXCJkZXNjXCI6XCJDcmVhdGUgYSBuZXcgaW50ZXJmYWNlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiJG5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGludGVyZmFjZSBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiJGRlc2NyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBpbnRlcmZhY2UgYm9keVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwiJEFNSUNsYXNzXCIsXCJkZXNjXCI6XCJDcmVhdGUgYSBuZXcgY2xhc3NcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCIkbmFtZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgY2xhc3MgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIiRkZXNjclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgY2xhc3MgYm9keVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX1dLFwibmFtZXNwYWNlc1wiOlt7XCJuYW1lXCI6XCJhbWlSb3V0ZXJcIixcImRlc2NcIjpcIlRoZSBBTUkgdXJsIHJvdXRpbmcgc3Vic3lzdGVtXCIsXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwiZ2V0U2NyaXB0VVJMXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBBV0YncyBzY3JpcHQgVVJMXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgQVdGJ3Mgc2NyaXB0IFVSTFwifV19LHtcIm5hbWVcIjpcImdldE9yaWdpblVSTFwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgb3JpZ2luIFVSTFwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIG9yaWdpbiBVUkxcIn1dfSx7XCJuYW1lXCI6XCJnZXRXZWJBcHBVUkxcIixcImRlc2NcIjpcIkdldHMgdGhlIHdlYmFwcCBVUkxcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSB3ZWJhcHAgVVJMXCJ9XX0se1wibmFtZVwiOlwiZ2V0SGFzaFwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgYW5jaG9yIHBhcnQgb2YgdGhlIHdlYmFwcCBVUkxcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBhbmNob3IgcGFydCBvZiB0aGUgd2ViYXBwIFVSTFwifV19LHtcIm5hbWVcIjpcImdldEFyZ3NcIixcImRlc2NcIjpcIkdldHMgdGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkFycmF5LjxTdHJpbmc+XCIsXCJkZXNjXCI6XCJUaGUgYXJndW1lbnRzIGV4dHJhY3RlZCBmcm9tIHRoZSB3ZWJhcHAgVVJMXCJ9XX0se1wibmFtZVwiOlwiYXBwZW5kXCIsXCJkZXNjXCI6XCJBcHBlbmRzIGEgcm91dGluZyBydWxlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicmVnRXhwXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSByZWdFeHBcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJoYW5kbGVyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBoYW5kbGVyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJOYW1lc3BhY2VcIixcImRlc2NcIjpcIlRoZSBhbWlSb3V0ZXIgc2luZ2xldG9uXCJ9XX0se1wibmFtZVwiOlwicmVtb3ZlXCIsXCJkZXNjXCI6XCJSZW1vdmVzIHNvbWUgcm91dGluZyBydWxlc1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInJlZ0V4cFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcmVnRXhwXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJOYW1lc3BhY2VcIixcImRlc2NcIjpcIlRoZSBhbWlSb3V0ZXIgc2luZ2xldG9uXCJ9XX0se1wibmFtZVwiOlwiY2hlY2tcIixcImRlc2NcIjpcIkNoZWNrcyB3aGV0aGVyIHRoZSBVUkwgbWF0Y2hlcyB3aXRoIGEgcm91dGluZyBydWxlXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX0se1wibmFtZVwiOlwiYXBwZW5kSGlzdG9yeUVudHJ5XCIsXCJkZXNjXCI6XCJBcHBlbmQgYSBuZXcgaGlzdG9yeSBlbnRyeVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhdGhcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIG5ldyBwYXRoXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udGV4dFwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgbmV3IGNvbnRleHRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19LHtcIm5hbWVcIjpcInJlcGxhY2VIaXN0b3J5RW50cnlcIixcImRlc2NcIjpcIlJlcGxhY2UgdGhlIGN1cnJlbnQgaGlzdG9yeSBlbnRyeVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhdGhcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIG5ldyBwYXRoXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udGV4dFwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgbmV3IGNvbnRleHRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19XX0se1wibmFtZVwiOlwiYW1pV2ViQXBwXCIsXCJkZXNjXCI6XCJUaGUgQU1JIHdlYmFwcCBzdWJzeXN0ZW1cIixcInZhcmlhYmxlc1wiOlt7XCJuYW1lXCI6XCJvcmlnaW5VUkxcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIG9yaWdpbiBVUkxcIn0se1wibmFtZVwiOlwid2ViQXBwVVJMXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSB3ZWJhcHAgVVJMXCJ9LHtcIm5hbWVcIjpcImhhc2hcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGFuY2hvciBwYXJ0IG9mIHRoZSB3ZWJhcHAgVVJMXCJ9LHtcIm5hbWVcIjpcImFyZ3NcIixcInR5cGVcIjpcIkFycmF5LjxTdHJpbmc+XCIsXCJkZXNjXCI6XCJUaGUgYXJndW1lbnRzIGV4dHJhY3RlZCBmcm9tIHRoZSB3ZWJhcHAgVVJMXCJ9XSxcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJpc0VtYmVkZGVkXCIsXCJkZXNjXCI6XCJDaGVja3Mgd2hldGhlciB0aGUgV2ViQXBwIGlzIGV4ZWN1dGVkIGluIGVtYmVkZGVkIG1vZGVcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJpc0xvY2FsXCIsXCJkZXNjXCI6XCJDaGVja3Mgd2hldGhlciB0aGUgV2ViQXBwIGlzIGV4ZWN1dGVkIGxvY2FsbHkgKGZpbGU6Ly8sIGxvY2FsaG9zdCwgMTI3LjAuMC4xIG9yIDo6MSlcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJ0ZXh0VG9IdG1sXCIsXCJkZXNjXCI6XCJFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIEhUTUxcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVuZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwiaHRtbFRvVGV4dFwiLFwiZGVzY1wiOlwiVW5lc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBIVE1MIHRvIHRleHRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSB1bmVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwidGV4dFRvU3RyaW5nXCIsXCJkZXNjXCI6XCJFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIEphdmFTY3JpcHQgc3RyaW5nXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1bmVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBlc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcInN0cmluZ1RvVGV4dFwiLFwiZGVzY1wiOlwiVW5lc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBKYXZhU2NyaXB0IHN0cmluZyB0byB0ZXh0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgdW5lc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcImh0bWxUb1N0cmluZ1wiLFwiZGVzY1wiOlwiRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSFRNTCB0byBKYXZhU2NyaXB0IHN0cmluZ1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdW5lc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJzdHJpbmdUb0h0bWxcIixcImRlc2NcIjpcIlVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSmF2YVNjcmlwdCBzdHJpbmcgdG8gSFRNTFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHVuZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJ0ZXh0VG9TUUxcIixcImRlc2NcIjpcIkVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIHRleHQgdG8gU1FMXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1bmVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBlc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcInNxbFRvVGV4dFwiLFwiZGVzY1wiOlwiVW5lc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBTUUwgdG8gdGV4dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHVuZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJiYXNlNjRFbmNvZGVcIixcImRlc2NcIjpcIkVuY29kZXMgKFJGQyA0NjQ4KSBhIHN0cmluZ1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZGVjb2RlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGVuY29kZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwiYmFzZTY0RGVjb2RlXCIsXCJkZXNjXCI6XCJEZWNvZGVzIChSRkMgNDY0OCkgYSBzdHJpbmdcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVuY29kZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBkZWNvZGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcImxvYWRSZXNvdXJjZXNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIHJlc291cmNlcyBieSBleHRlbnNpb25cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRTaGVldHNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIENTUyBzaGVldHNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRTY3JpcHRzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBKUyBzY3JpcHRzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkSlNPTnNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIEpTT04gZmlsZXNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRYTUxzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBYTUwgZmlsZXNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRIVE1Mc1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgSFRNTCBmaWxlc1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFRXSUdzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBUV0lHIGZpbGVzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkVGV4dHNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIHRleHQgZmlsZXNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInJlcGxhY2VIVE1MXCIsXCJkZXNjXCI6XCJQdXRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJwcmVwZW5kSFRNTFwiLFwiZGVzY1wiOlwiUHJlcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImFwcGVuZEhUTUxcIixcImRlc2NcIjpcIkFwcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImZvcm1hdFRXSUdcIixcImRlc2NcIjpcIkludGVycHJldGVzIHRoZSBnaXZlbiBUV0lHIHN0cmluZywgc2VlIHtAbGluayBodHRwOi8vdHdpZy5zZW5zaW9sYWJzLm9yZy9kb2N1bWVudGF0aW9ufVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZGljdFwiLFwidHlwZVwiOltcIk9iamVjdFwiLFwiQXJyYXlcIl0sXCJkZXNjXCI6XCJ0aGUgZGljdGlvbmFyeVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgSW50ZXJwcmV0ZWQgVFdJRyBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJqc3BhdGhcIixcImRlc2NcIjpcIkZpbmRzIGRhdGEgd2l0aGluIHRoZSBnaXZlbiBKU09OLCBzZWUge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9kZmlsYXRvdi9qc3BhdGh9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGF0aFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcGF0aFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImpzb25cIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIEpTT05cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkFycmF5XCIsXCJkZXNjXCI6XCJUaGUgcmVzdWx0aW5nIGFycmF5XCJ9XX0se1wibmFtZVwiOlwibG9ja1wiLFwiZGVzY1wiOlwiTG9ja3MgdGhlIFdlYiBhcHBsaWNhdGlvblwiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcInVubG9ja1wiLFwiZGVzY1wiOlwiVW5sb2NrcyB0aGUgV2ViIGFwcGxpY2F0aW9uXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiY2FuTGVhdmVcIixcImRlc2NcIjpcIkVuYWJsZXMgdGhlIG1lc3NhZ2UgaW4gYSBjb25maXJtYXRpb24gZGlhbG9nIGJveCB0byBpbmZvcm0gdGhhdCB0aGUgdXNlciBpcyBhYm91dCB0byBsZWF2ZSB0aGUgY3VycmVudCBwYWdlLlwiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImNhbm5vdExlYXZlXCIsXCJkZXNjXCI6XCJEaXNhYmxlcyB0aGUgbWVzc2FnZSBpbiBhIGNvbmZpcm1hdGlvbiBkaWFsb2cgYm94IHRvIGluZm9ybSB0aGF0IHRoZSB1c2VyIGlzIGFib3V0IHRvIGxlYXZlIHRoZSBjdXJyZW50IHBhZ2UuXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiaW5mb1wiLFwiZGVzY1wiOlwiU2hvd3MgYW4gJ2luZm8nIG1lc3NhZ2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJtZXNzYWdlXCIsXCJ0eXBlXCI6W1wiU3RyaW5nXCIsXCJBcnJheVwiXSxcImRlc2NcIjpcInRoZSBtZXNzYWdlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmFkZU91dFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcInN1Y2Nlc3NcIixcImRlc2NcIjpcIlNob3dzIGEgJ3N1Y2Nlc3MnIG1lc3NhZ2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJtZXNzYWdlXCIsXCJ0eXBlXCI6W1wiU3RyaW5nXCIsXCJBcnJheVwiXSxcImRlc2NcIjpcInRoZSBtZXNzYWdlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmFkZU91dFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIndhcm5pbmdcIixcImRlc2NcIjpcIlNob3dzIGEgJ3dhcm5pbmcnIG1lc3NhZ2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJtZXNzYWdlXCIsXCJ0eXBlXCI6W1wiU3RyaW5nXCIsXCJBcnJheVwiXSxcImRlc2NcIjpcInRoZSBtZXNzYWdlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmFkZU91dFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcImVycm9yXCIsXCJkZXNjXCI6XCJTaG93cyBhbiAnZXJyb3InIG1lc3NhZ2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJtZXNzYWdlXCIsXCJ0eXBlXCI6W1wiU3RyaW5nXCIsXCJBcnJheVwiXSxcImRlc2NcIjpcInRoZSBtZXNzYWdlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmFkZU91dFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcImZsdXNoXCIsXCJkZXNjXCI6XCJGbHVzaGVzIG1lc3NhZ2VzXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiZmlsbEJyZWFkY3J1bWJcIixcImRlc2NcIjpcIkZpbGwgdGhlIG1haW4gYnJlYWRjcnVtYlwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIml0ZW1zXCIsXCJ0eXBlXCI6XCJBcnJheVwiLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIGl0ZW1zIChIVE1MIGZvcm1hdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcInN0YXJ0XCIsXCJkZXNjXCI6XCJTdGFydHMgdGhlIFdlYiBhcHBsaWNhdGlvblwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGxvZ29fdXJsLCBob21lX3VybCwgY29udGFjdF9lbWFpbCwgYWJvdXRfdXJsLCB0aGVtZV91cmwsIGxvY2tlcl91cmwsIGNoYW5nZV9wYXNzb3JkX2FsbG93ZWQsIGNoYW5nZV9pbmZvX2FsbG93ZWQsIGNoYW5nZV9wYXNzb3JkX2FsbG93ZWQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJsb2FkQ29udHJvbFwiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgYSBjb250cm9sXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiY29udHJvbFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgY29udHJvbCBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNyZWF0ZUNvbnRyb2xcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2xcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXJlbnRcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwib3duZXJcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udHJvbFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXJhbXNcIixcInR5cGVcIjpcIkFycmF5XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiY3JlYXRlQ29udHJvbEluQm9keVwiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbCBpbiBhIGNvbnRhaW5lclwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhcmVudFwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJvd25lclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250cm9sXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhcmFtc1dpdGhvdXRTZXR0aW5nc1wiLFwidHlwZVwiOlwiQXJyYXlcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRyb2xTZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXJlbnRTZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiY3JlYXRlQ29udHJvbEluQ29udGFpbmVyXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sIGluIGEgY29udGFpbmVyXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGFyZW50XCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIm93bmVyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRyb2xcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFyYW1zV2l0aG91dFNldHRpbmdzXCIsXCJ0eXBlXCI6XCJBcnJheVwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udHJvbFNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhcmVudFNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImljb25cIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidGl0bGVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNyZWF0ZUNvbnRyb2xGcm9tV2ViTGlua1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbCBpbiBhIGNvbnRhaW5lciBmcm9tIGEgV0VCIGxpbmtcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXJlbnRcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwib3duZXJcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZWxcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFyZW50U2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRTdWJBcHBcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIGEgc3ViYXBwXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3ViYXBwXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBzdWJhcHBcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidGhlIHVzZXIgZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkU3ViQXBwQnlVUkxcIixcImRlc2NcIjpcIkxvYWRzIGEgc3ViYXBwIGJ5IFVSTFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcImRlZmF1bHRTdWJBcHBcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiaWYgJ2FtaVdlYkFwcC5hcmdzW1xcXCJzdWJhcHBcXFwiXScgaXMgbnVsbCwgdGhlIGRlZmF1bHQgc3ViYXBwXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZGVmYXVsdFVzZXJEYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJpZiAnYW1pV2ViQXBwLmFyZ3NbXFxcInVzZXJkYXRhXFxcIl0nIGlzIG51bGwsIHRoZSBkZWZhdWx0IHVzZXIgZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX1dLFwiZXZlbnRzXCI6W3tcIm5hbWVcIjpcIm9uUmVhZHlcIixcImRlc2NcIjpcIlRoaXMgbWV0aG9kIG11c3QgYmUgb3ZlcmxvYWRlZCBhbmQgaXMgY2FsbGVkIHdoZW4gdGhlIFdlYiBhcHBsaWNhdGlvbiBzdGFydHNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyRGF0YVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uUmVmcmVzaFwiLFwiZGVzY1wiOlwiVGhpcyBtZXRob2QgbXVzdCBiZSBvdmVybG9hZGVkIGFuZCBpcyBjYWxsZWQgd2hlbiB0aGUgdG9vbGJhciBuZWVkcyB0byBiZSB1cGRhdGVkXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiaXNBdXRoXCIsXCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19XX0se1wibmFtZVwiOlwiYW1pQ29tbWFuZFwiLFwiZGVzY1wiOlwiVGhlIEFNSSBjb21tYW5kIHN1YnN5c3RlbVwiLFwidmFyaWFibGVzXCI6W3tcIm5hbWVcIjpcImVuZHBvaW50XCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIkRlZmF1bHQgZW5kcG9pbnRcIn0se1wibmFtZVwiOlwiY29udmVydGVyXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIkRlZmF1bHQgY29udmVydGVyXCJ9XSxcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJleGVjdXRlXCIsXCJkZXNjXCI6XCJFeGVjdXRlcyBhbiBBTUkgY29tbWFuZFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcImNvbW1hbmRcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGNvbW1hbmRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBlbmRwb2ludCwgY29udmVydGVyLCB0aW1lb3V0LCBleHRyYVBhcmFtLCBleHRyYVZhbHVlKVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwicGFzc0xvZ2luXCIsXCJkZXNjXCI6XCJMb2dzIGluIGJ5IGxvZ2luL3Bhc3N3b3JkXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhc3NcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNlcnRMb2dpblwiLFwiZGVzY1wiOlwiTG9ncyBpbiBieSBjZXJ0aWZpY2F0ZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2dvdXRcIixcImRlc2NcIjpcIkxvZ3Mgb3V0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImF0dGFjaENlcnRcIixcImRlc2NcIjpcIkF0dGFjaGVzIGEgY2VydGlmaWNhdGVcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1c2VyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFzc1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcGFzc3dvcmRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiZGV0YWNoQ2VydFwiLFwiZGVzY1wiOlwiRGV0YWNoZXMgYSBjZXJ0aWZpY2F0ZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVzZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXNzXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBwYXNzd29yZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJhZGRVc2VyXCIsXCJkZXNjXCI6XCJBZGRzIGEgbmV3IHVzZXJcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1c2VyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFzc1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcGFzc3dvcmRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJmaXJzdE5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGZpcnN0IG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJsYXN0TmFtZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgbGFzdCBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZW1haWxcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVtYWlsXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiYXR0YWNoXCIsXCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJhdHRhY2ggdGhlIGN1cnJlbnQgY2VydGlmaWNhdGVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJhZ3JlZVwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiYWdyZWUgd2l0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiY2hhbmdlSW5mb1wiLFwiZGVzY1wiOlwiQ2hhbmdlcyB0aGUgYWNjb3VudCBpbmZvcm1hdGlvblwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcImZpcnN0TmFtZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZmlyc3QgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImxhc3ROYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBsYXN0IG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJlbWFpbFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZW1haWxcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiY2hhbmdlUGFzc1wiLFwiZGVzY1wiOlwiQ2hhbmdlcyB0aGUgYWNjb3VudCBwYXNzd29yZFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVzZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJvbGRQYXNzXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBvbGQgcGFzc3dvcmRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJuZXdQYXNzXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBuZXcgcGFzc3dvcmRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwicmVzZXRQYXNzXCIsXCJkZXNjXCI6XCJSZXNldHMgdGhlIGFjY291bnQgcGFzc3dvcmRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1c2VyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19XX0se1wibmFtZVwiOlwiYW1pTG9naW5cIixcImRlc2NcIjpcIlRoZSBBTUkgYXV0aGVudGljYXRpb24gc3Vic3lzdGVtXCIsXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwiZ2V0VXNlclwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgY3VycmVudCB1c2VyXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgY3VycmVudCB1c2VyXCJ9XX0se1wibmFtZVwiOlwiZ2V0R3Vlc3RcIixcImRlc2NcIjpcIkdldHMgdGhlIGd1ZXN0IHVzZXJcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBndWVzdCB1c2VyXCJ9XX0se1wibmFtZVwiOlwiZ2V0Q2xpZW50RE5cIixcImRlc2NcIjpcIkdldHMgdGhlIGNsaWVudCBETlwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGNsaWVudCBETlwifV19LHtcIm5hbWVcIjpcImdldElzc3VlckROXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBpc3N1ZXIgRE5cIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBpc3N1ZXIgRE5cIn1dfSx7XCJuYW1lXCI6XCJpc0F1dGhlbnRpY2F0ZWRcIixcImRlc2NcIjpcIkNoZWNrcyB3aGV0aGVyIHRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWRcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJoYXNSb2xlXCIsXCJkZXNjXCI6XCJDaGVja3Mgd2hldGhlciB0aGUgdXNlciBoYXMgdGhlIGdpdmVuIHJvbGVcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJyb2xlXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSByb2xlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJzc29cIixcImRlc2NcIjpcIk9wZW5zIHRoZSAnU1NPJyBtb2RhbCB3aW5kb3dcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJzaWduSW5cIixcImRlc2NcIjpcIk9wZW5zIHRoZSAnU2lnbkluJyBtb2RhbCB3aW5kb3dcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJjaGFuZ2VJbmZvXCIsXCJkZXNjXCI6XCJPcGVucyB0aGUgJ0NoYW5nZSBJbmZvJyBtb2RhbCB3aW5kb3dcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJjaGFuZ2VQYXNzXCIsXCJkZXNjXCI6XCJPcGVucyB0aGUgJ0NoYW5nZSBQYXNzd29yZCcgbW9kYWwgd2luZG93XCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiYWNjb3VudFN0YXR1c1wiLFwiZGVzY1wiOlwiT3BlbnMgdGhlICdBY2NvdW50IFN0YXR1cycgbW9kYWwgd2luZG93XCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwic2lnbk91dFwiLFwiZGVzY1wiOlwiU2lnbnMgb3V0XCIsXCJwYXJhbXNcIjpbXX1dfV0sXCJpbnRlcmZhY2VzXCI6W3tcIm5hbWVcIjpcImFtaS5JQ29udHJvbFwiLFwiZGVzY1wiOlwiVGhlIEFNSSBjb250cm9sIGludGVyZmFjZVwiLFwiaW1wbGVtZW50c1wiOltdLFwiaW5oZXJpdHNcIjpbXSxcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJwYXRjaElkXCIsXCJkZXNjXCI6XCJQYXRjaGVzIGFuIEhUTUwgaWRlbnRpZmllclwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcImlkXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1bnBhdGNoZWQgSFRNTCBpZGVudGlmaWVyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBwYXRjaGVkIEhUTUwgaWRlbnRpZmllclwifV19LHtcIm5hbWVcIjpcInJlcGxhY2VIVE1MXCIsXCJkZXNjXCI6XCJQdXRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJwcmVwZW5kSFRNTFwiLFwiZGVzY1wiOlwiUHJlcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImFwcGVuZEhUTUxcIixcImRlc2NcIjpcIkFwcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcIm9uUmVhZHlcIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIHRoZSBjb250cm9sIGlzIHJlYWR5IHRvIHJ1blwiLFwicGFyYW1zXCI6W119XX0se1wibmFtZVwiOlwiYW1pLklTdWJBcHBcIixcImRlc2NcIjpcIlRoZSBBTUkgc3ViLWFwcGxpY2F0aW9uIGludGVyZmFjZVwiLFwiaW1wbGVtZW50c1wiOltdLFwiaW5oZXJpdHNcIjpbXSxcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJvblJlYWR5XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIHJlYWR5IHRvIHJ1blwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ1c2VyZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwib25FeGl0XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIGFib3V0IHRvIGV4aXRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uTG9naW5cIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIGxvZ2dpbmcgaW5cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uTG9nb3V0XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiBsb2dnaW5nIG91dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ1c2VyZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX1dfV0sXCJjbGFzc2VzXCI6W3tcIm5hbWVcIjpcImFtaS5Db250cm9sXCIsXCJkZXNjXCI6XCJUaGUgYmFzaWMgQU1JIGNvbnRyb2xcIixcImltcGxlbWVudHNcIjpbXCJhbWkuSUNvbnRyb2xcIl0sXCJpbmhlcml0c1wiOltdLFwia29uc3RydWN0b3JcIjp7XCJuYW1lXCI6XCJDb250cm9sXCIsXCJwYXJhbXNcIjpbXX0sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwicGF0Y2hJZFwiLFwiZGVzY1wiOlwiUGF0Y2hlcyBhbiBIVE1MIGlkZW50aWZpZXJcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJpZFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdW5wYXRjaGVkIEhUTUwgaWRlbnRpZmllclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgcGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcIn1dfSx7XCJuYW1lXCI6XCJyZXBsYWNlSFRNTFwiLFwiZGVzY1wiOlwiUHV0cyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwicHJlcGVuZEhUTUxcIixcImRlc2NcIjpcIlByZXBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJhcHBlbmRIVE1MXCIsXCJkZXNjXCI6XCJBcHBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJvblJlYWR5XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiB0aGUgY29udHJvbCBpcyByZWFkeSB0byBydW5cIixcInBhcmFtc1wiOltdfV19LHtcIm5hbWVcIjpcImFtaS5TdWJBcHBcIixcImRlc2NcIjpcIlRoZSBiYXNpYyBBTUkgc3ViLWFwcGxpY2F0aW9uXCIsXCJpbXBsZW1lbnRzXCI6W1wiYW1pLklTdWJBcHBcIl0sXCJpbmhlcml0c1wiOltdLFwia29uc3RydWN0b3JcIjp7XCJuYW1lXCI6XCJTdWJBcHBcIixcInBhcmFtc1wiOltdfSxcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJvblJlYWR5XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIHJlYWR5IHRvIHJ1blwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ1c2VyZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwib25FeGl0XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIGFib3V0IHRvIGV4aXRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uTG9naW5cIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIGxvZ2dpbmcgaW5cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uTG9nb3V0XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiBsb2dnaW5nIG91dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ1c2VyZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX1dfV19O1xuXG4vKiBlc2xpbnQtZW5hYmxlICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyJdfQ==
