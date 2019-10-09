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

/*-------------------------------------------------------------------------*/

/* amiTwig                                                                 */

/*-------------------------------------------------------------------------*/

var amiTwig = {
  version: '1.0.0'
};
/*-------------------------------------------------------------------------*/

/* exports.amiTwig                                                         */

/*-------------------------------------------------------------------------*/

if (typeof exports !== 'undefined') {
  amiTwig.fs = require('fs');
  module.exports.amiTwig = amiTwig;
}
/*-------------------------------------------------------------------------*/

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

/*-------------------------------------------------------------------------*/

/* amiTwig.tokenizer                                                       */

/*-------------------------------------------------------------------------*/


amiTwig.tokenizer = {
  /*---------------------------------------------------------------------*/
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
      /*-------------------------------------------------------------*/

      /* COUNT LINES                                                 */

      /*-------------------------------------------------------------*/

      if (c === '\n') {
        line++;
      }
      /*-------------------------------------------------------------*/

      /* EAT SPACES                                                  */

      /*-------------------------------------------------------------*/


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
      /*-------------------------------------------------------------*/

      /* EAT REGEXES                                                 */

      /*-------------------------------------------------------------*/


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
      /*-------------------------------------------------------------*/

      /* EAT REMAINING CHARACTERES                                   */

      /*-------------------------------------------------------------*/


      word += c;
      code = code.substring(1);
      i += 1;
      /*			continue __l0;
       */

      /*-------------------------------------------------------------*/
    }

    if (word) {
      if (error) {
        throw 'invalid token `' + word + '`';
      }

      result_tokens.push(word);
      result_types.push(-1);
      result_lines.push(line);
      /*			word = '';
       */
    }

    return {
      tokens: result_tokens,
      types: result_types,
      lines: result_lines
    };
  },

  /*---------------------------------------------------------------------*/
  _match: function _match(s, stringOrRegExp) {
    var m;

    if (stringOrRegExp instanceof RegExp) {
      m = s.match(stringOrRegExp);
      return m !== null && this._checkNextChar(s,
      /*-*/
      m[0]
      /*-*/
      ) ?
      /*-*/
      m[0]
      /*-*/
      : null;
    } else {
      m = s.indexOf(stringOrRegExp);
      return m === 0x00 && this._checkNextChar(s, stringOrRegExp) ? stringOrRegExp : null;
    }
  },

  /*---------------------------------------------------------------------*/
  _alnum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  _checkNextChar: function _checkNextChar(s, token) {
    var length = token.length;
    var charCode2 = s.charCodeAt(length - 0);
    var charCode1 = s.charCodeAt(length - 1);
    return isNaN(charCode2) || this._alnum[charCode2] === 0 || this._alnum[charCode1] === 0;
  }
  /*---------------------------------------------------------------------*/

};
/*-------------------------------------------------------------------------*/

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

/*-------------------------------------------------------------------------*/

/* amiTwig.expr                                                            */

/*-------------------------------------------------------------------------*/

amiTwig.expr = {};
/*-------------------------------------------------------------------------*/

/* amiTwig.expr.tokens                                                     */

/*-------------------------------------------------------------------------*/

amiTwig.expr.tokens = {
  /*---------------------------------------------------------------------*/
  $init: function $init() {
    /*-----------------------------------------------------------------*/

    /* COMPOSITE TOKENS                                                */

    /*-----------------------------------------------------------------*/
    this.IS_XXX = [this.DEFINED, this.NULL, this.EMPTY, this.ITERABLE, this.EVEN, this.ODD];
    this.XXX_WITH = [this.STARTS_WITH, this.ENDS_WITH];
    this.PLUS_MINUS = [this.CONCAT, this.PLUS, this.MINUS];
    this.MUL_FLDIV_DIV_MOD = [this.MUL, this.FLDIV, this.DIV, this.MOD];
    this.RX = [this.RP, this.RB1];
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/

  /* REAL TOKENS                                                         */

  /*---------------------------------------------------------------------*/
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

  /*---------------------------------------------------------------------*/

  /* VIRTUAL TOKENS                                                      */

  /*---------------------------------------------------------------------*/
  LST: 200,
  DIC: 201,
  FUN: 202,
  VAR: 203
  /*---------------------------------------------------------------------*/

};
/*-------------------------------------------------------------------------*/

amiTwig.expr.tokens.$init();
/*-------------------------------------------------------------------------*/

/* amiTwig.expr.Tokenizer                                                  */

/*-------------------------------------------------------------------------*/

amiTwig.expr.Tokenizer = function (code, line) {
  /*---------------------------------------------------------------------*/
  this._spaces = [' ', '\t', '\n', '\r'];
  /*---------------------------------------------------------------------*/

  this._tokenDefs = ['or', 'and', 'b-or', 'b-xor', 'b-and', 'not', 'is', 'defined', 'null', 'empty', 'iterable', 'even', 'odd', '===', '==', '!==', '!=', '<=', '>=', '<', '>', /^starts\s+with/, /^ends\s+with/, 'matches', 'in', '..', '~', '+', '-', '**', '*', '//', '/', '%', ':', '.', ',', '|', '(', ')', '[', ']', '{', '}', 'true', 'false', /^[0-9]+\.[0-9]+/, /^[0-9]+/, /^'(\\'|[^'])*'/, /^"(\\"|[^"])*"/, /^[a-zA-Z_$][a-zA-Z0-9_$]*/];
  /*---------------------------------------------------------------------*/

  this._tokenTypes = [amiTwig.expr.tokens.LOGICAL_OR, amiTwig.expr.tokens.LOGICAL_AND, amiTwig.expr.tokens.BITWISE_OR, amiTwig.expr.tokens.BITWISE_XOR, amiTwig.expr.tokens.BITWISE_AND, amiTwig.expr.tokens.NOT, amiTwig.expr.tokens.IS, amiTwig.expr.tokens.DEFINED, amiTwig.expr.tokens.NULL, amiTwig.expr.tokens.EMPTY, amiTwig.expr.tokens.ITERABLE, amiTwig.expr.tokens.EVEN, amiTwig.expr.tokens.ODD, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.STARTS_WITH, amiTwig.expr.tokens.ENDS_WITH, amiTwig.expr.tokens.MATCHES, amiTwig.expr.tokens.IN, amiTwig.expr.tokens.RANGE, amiTwig.expr.tokens.CONCAT, amiTwig.expr.tokens.PLUS, amiTwig.expr.tokens.MINUS, amiTwig.expr.tokens.POWER, amiTwig.expr.tokens.MUL, amiTwig.expr.tokens.FLDIV, amiTwig.expr.tokens.DIV, amiTwig.expr.tokens.MOD, amiTwig.expr.tokens.COLON, amiTwig.expr.tokens.DOT, amiTwig.expr.tokens.COMMA, amiTwig.expr.tokens.PIPE, amiTwig.expr.tokens.LP, amiTwig.expr.tokens.RP, amiTwig.expr.tokens.LB1, amiTwig.expr.tokens.RB1, amiTwig.expr.tokens.LB2, amiTwig.expr.tokens.RB2, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.SID];
  /*---------------------------------------------------------------------*/

  this.$init = function (code, line) {
    /*-----------------------------------------------------------------*/
    var result = amiTwig.tokenizer.tokenize(code, line, this._spaces, this._tokenDefs, this._tokenTypes, true);
    /*-----------------------------------------------------------------*/

    this.tokens = result.tokens;
    this.types = result.types;
    this.i = 0;
    /*-----------------------------------------------------------------*/
  };
  /*---------------------------------------------------------------------*/


  this.next = function (n) {
    if (n === void 0) {
      n = 1;
    }

    this.i += n;
  };
  /*---------------------------------------------------------------------*/


  this.isEmpty = function () {
    return this.i >= this.tokens.length;
  };
  /*---------------------------------------------------------------------*/


  this.peekToken = function () {
    return this.tokens[this.i];
  };
  /*---------------------------------------------------------------------*/


  this.peekType = function () {
    return this.types[this.i];
  };
  /*---------------------------------------------------------------------*/


  this.checkType = function (type) {
    if (this.i < this.tokens.length) {
      var TYPE = this.types[this.i];
      return type instanceof Array ? type.indexOf(TYPE) >= 0 : type === TYPE;
    }

    return false;
  };
  /*---------------------------------------------------------------------*/


  this.$init(code, line);
  /*---------------------------------------------------------------------*/
};
/*-------------------------------------------------------------------------*/

/* amiTwig.expr.Compiler                                                   */

/*-------------------------------------------------------------------------*/


amiTwig.expr.Compiler = function (code, line) {
  this.$init(code, line);
};
/*-------------------------------------------------------------------------*/


amiTwig.expr.Compiler.prototype = {
  /*---------------------------------------------------------------------*/
  $init: function $init(code, line) {
    /*-----------------------------------------------------------------*/
    this.tokenizer = new amiTwig.expr.Tokenizer(this.code = code, this.line = line);
    /*-----------------------------------------------------------------*/

    this.rootNode = this.parseFilter();
    /*-----------------------------------------------------------------*/

    if (this.tokenizer.isEmpty() === false) {
      throw 'syntax error, line `' + this.line + '`, unexpected token `' + this.tokenizer.peekToken() + '`';
    }
    /*-----------------------------------------------------------------*/

  },

  /*---------------------------------------------------------------------*/
  dump: function dump() {
    return this.rootNode.dump();
  },

  /*---------------------------------------------------------------------*/
  parseFilter: function parseFilter() {
    var left = this.parseLogicalOr(),
        node,
        temp;
    /*-----------------------------------------------------------------*/

    /* Filter : LogicalOr ('|' Dot1)*                                  */

    /*-----------------------------------------------------------------*/

    while (this.tokenizer.checkType(amiTwig.expr.tokens.PIPE)) {
      this.tokenizer.next();
      node = this.parseDot1(true);

      for (temp = node; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft) {
        ;
      }

      temp.list.unshift(left);
      left = node;
    }
    /*-----------------------------------------------------------------*/


    return left;
  },

  /*---------------------------------------------------------------------*/
  parseLogicalOr: function parseLogicalOr() {
    var left = this.parseLogicalAnd(),
        right,
        node;
    /*-----------------------------------------------------------------*/

    /* LogicalOr : LogicalAnd ('or' LogicalAnd)*                       */

    /*-----------------------------------------------------------------*/

    while (this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_OR)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parseLogicalAnd();
      node.nodeLeft = left;
      node.nodeRight = right;
      left = node;
    }
    /*-----------------------------------------------------------------*/


    return left;
  },

  /*---------------------------------------------------------------------*/
  parseLogicalAnd: function parseLogicalAnd() {
    var left = this.parseBitwiseOr(),
        right,
        node;
    /*-----------------------------------------------------------------*/

    /* LogicalAnd : BitwiseOr ('and' BitwiseOr)*                       */

    /*-----------------------------------------------------------------*/

    while (this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_AND)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parseBitwiseOr();
      node.nodeLeft = left;
      node.nodeRight = right;
      left = node;
    }
    /*-----------------------------------------------------------------*/


    return left;
  },

  /*---------------------------------------------------------------------*/
  parseBitwiseOr: function parseBitwiseOr() {
    var left = this.parseBitwiseXor(),
        right,
        node;
    /*-----------------------------------------------------------------*/

    /* BitwiseOr : BitwiseXor ('b-or' BitwiseXor)*                     */

    /*-----------------------------------------------------------------*/

    while (this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_OR)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parseBitwiseXor();
      node.nodeLeft = left;
      node.nodeRight = right;
      left = node;
    }
    /*-----------------------------------------------------------------*/


    return left;
  },

  /*---------------------------------------------------------------------*/
  parseBitwiseXor: function parseBitwiseXor() {
    var left = this.parseBitwiseAnd(),
        right,
        node;
    /*-----------------------------------------------------------------*/

    /* BitwiseXor : BitwiseAnd ('b-xor' BitwiseAnd)*                   */

    /*-----------------------------------------------------------------*/

    while (this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_XOR)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parseBitwiseAnd();
      node.nodeLeft = left;
      node.nodeRight = right;
      left = node;
    }
    /*-----------------------------------------------------------------*/


    return left;
  },

  /*---------------------------------------------------------------------*/
  parseBitwiseAnd: function parseBitwiseAnd() {
    var left = this.parseNot(),
        right,
        node;
    /*-----------------------------------------------------------------*/

    /* BitwiseAnd : Not ('b-and' Not)*                                 */

    /*-----------------------------------------------------------------*/

    while (this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_AND)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parseNot();
      node.nodeLeft = left;
      node.nodeRight = right;
      left = node;
    }
    /*-----------------------------------------------------------------*/


    return left;
  },

  /*---------------------------------------------------------------------*/
  parseNot: function parseNot() {
    var right, node;
    /*-----------------------------------------------------------------*/

    /* Not : 'not' Comp                                                */

    /*-----------------------------------------------------------------*/

    if (this.tokenizer.checkType(amiTwig.expr.tokens.NOT)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parseComp();
      node.nodeLeft = null;
      node.nodeRight = right;
      return node;
    }
    /*-----------------------------------------------------------------*/

    /*     | Comp                                                      */

    /*-----------------------------------------------------------------*/


    return this.parseComp();
  },

  /*---------------------------------------------------------------------*/
  parseComp: function parseComp() {
    var left = this.parseAddSub(),
        right,
        node,
        swap;
    /*-----------------------------------------------------------------*/

    /* Comp : AddSub 'is' 'not'? ('defined' | 'null' | ...)            */

    /*-----------------------------------------------------------------*/

    /**/

    if (this.tokenizer.checkType(amiTwig.expr.tokens.IS)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      /* swap 'is' and 'not' */

      swap = node;
      /* swap 'is' and 'not' */

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
    }
    /*-----------------------------------------------------------------*/

    /*      | AddSub ('===' | '==' | ...) AddSub                       */

    /*-----------------------------------------------------------------*/
    else if (this.tokenizer.checkType(amiTwig.expr.tokens.CMP_OP)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseAddSub();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }
      /*-----------------------------------------------------------------*/

      /*      | AddSub ('starts' | 'ends') `with` AddSub                 */

      /*-----------------------------------------------------------------*/
      else if (this.tokenizer.checkType(amiTwig.expr.tokens.XXX_WITH)) {
          node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
          this.tokenizer.next();
          right = this.parseAddSub();
          node.nodeLeft = left;
          node.nodeRight = right;
          left = node;
        }
        /*-----------------------------------------------------------------*/

        /*      | AddSub 'matches' AddSub                                  */

        /*-----------------------------------------------------------------*/
        else if (this.tokenizer.checkType(amiTwig.expr.tokens.MATCHES)) {
            node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
            this.tokenizer.next();
            right = this.parseAddSub();
            node.nodeLeft = left;
            node.nodeRight = right;
            left = node;
          }
          /*-----------------------------------------------------------------*/

          /*      | AddSub 'in' AddSub                                       */

          /*-----------------------------------------------------------------*/
          else if (this.tokenizer.checkType(amiTwig.expr.tokens.IN)) {
              node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
              this.tokenizer.next();
              right = this.parseAddSub();
              node.nodeLeft = left;
              node.nodeRight = right;
              left = node;
            }
    /*-----------------------------------------------------------------*/

    /*      | AddSub                                                   */

    /*-----------------------------------------------------------------*/


    return left;
  },

  /*---------------------------------------------------------------------*/
  parseAddSub: function parseAddSub() {
    var left = this.parseMulDiv(),
        right,
        node;
    /*-----------------------------------------------------------------*/

    /* AddSub : MulDiv (('+' | '-') MulDiv)*                           */

    /*-----------------------------------------------------------------*/

    while (this.tokenizer.checkType(amiTwig.expr.tokens.PLUS_MINUS)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parseMulDiv();
      node.nodeLeft = left;
      node.nodeRight = right;
      left = node;
    }
    /*-----------------------------------------------------------------*/


    return left;
  },

  /*---------------------------------------------------------------------*/
  parseMulDiv: function parseMulDiv() {
    var left = this.parsePlusMinus(),
        right,
        node;
    /*-----------------------------------------------------------------*/

    /* MulDiv : PlusMinus (('*' | '//' | '/' | '%') PlusMinus)*        */

    /*-----------------------------------------------------------------*/

    while (this.tokenizer.checkType(amiTwig.expr.tokens.MUL_FLDIV_DIV_MOD)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parsePlusMinus();
      node.nodeLeft = left;
      node.nodeRight = right;
      left = node;
    }
    /*-----------------------------------------------------------------*/


    return left;
  },

  /*---------------------------------------------------------------------*/
  parsePlusMinus: function parsePlusMinus() {
    var right, node;
    /*-----------------------------------------------------------------*/

    /* PlusMinus : ('-' | '+') Power                                   */

    /*-----------------------------------------------------------------*/

    if (this.tokenizer.checkType(amiTwig.expr.tokens.PLUS_MINUS)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parsePower();
      node.nodeLeft = null;
      node.nodeRight = right;
      return node;
    }
    /*-----------------------------------------------------------------*/

    /*           | Dot1                                                */

    /*-----------------------------------------------------------------*/


    return this.parsePower();
  },

  /*---------------------------------------------------------------------*/
  parsePower: function parsePower() {
    var left = this.parseDot1(),
        right,
        node;
    /*-----------------------------------------------------------------*/

    /* Power : Dot1 ('**' Dot1)*                                       */

    /*-----------------------------------------------------------------*/

    while (this.tokenizer.checkType(amiTwig.expr.tokens.POWER)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
      this.tokenizer.next();
      right = this.parseDot1();
      node.nodeLeft = left;
      node.nodeRight = right;
      left = node;
    }
    /*-----------------------------------------------------------------*/


    return left;
  },

  /*---------------------------------------------------------------------*/
  parseDot1: function parseDot1(isFilter) {
    var node = this.parseDot2(isFilter);

    if (node) {
      /*-------------------------------------------------------------*/
      var temp = node;

      for (; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft) {
        ;
      }
      /*-------------------------------------------------------------*/


      if (temp.q) {
        /**/
        if (temp.nodeType === amiTwig.expr.tokens.FUN) {
          if (temp.nodeValue in amiTwig.stdlib) {
            temp.nodeValue = 'amiTwig.stdlib.' + temp.nodeValue;
          } else {
            temp.nodeValue =
            /*---*/
            '_.'
            /*---*/
            + temp.nodeValue;
          }
        } else if (temp.nodeType === amiTwig.expr.tokens.VAR) {
          temp.nodeValue =
          /*---*/
          '_.'
          /*---*/
          + temp.nodeValue;
        }

        temp.q = false;
      }
      /*-------------------------------------------------------------*/

    }

    return node;
  },

  /*---------------------------------------------------------------------*/
  parseDot2: function parseDot2(isFilter) {
    var left = this.parseDot3(isFilter),
        right,
        node;
    /*-----------------------------------------------------------------*/

    /* Dot2 : Dot3 ('.' Dot3)*                                         */

    /*-----------------------------------------------------------------*/

    while (this.tokenizer.checkType(amiTwig.expr.tokens.DOT)) {
      node = new amiTwig.expr.Node(this.tokenizer.peekType(), '.');
      this.tokenizer.next();
      right = this.parseDot3(isFilter);
      node.nodeLeft = left;
      node.nodeRight = right;
      left = node;
    }
    /*-----------------------------------------------------------------*/


    return left;
  },

  /*---------------------------------------------------------------------*/
  parseDot3: function parseDot3(isFilter) {
    var left = this.parseX(isFilter),
        right,
        node;
    /*-----------------------------------------------------------------*/

    /* parseDot3 : X ('[' Filter ']')*                                 */

    /*-----------------------------------------------------------------*/

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
    /*-----------------------------------------------------------------*/

    /*         | X                                                     */

    /*-----------------------------------------------------------------*/


    return left;
  },

  /*---------------------------------------------------------------------*/
  parseX: function parseX(isFilter) {
    var node;
    /*-----------------------------------------------------------------*/

    /* X : Group | Array | Object | FunVar | Terminal                  */

    /*-----------------------------------------------------------------*/

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
    /*-----------------------------------------------------------------*/

    /* SYNTAX ERROR                                                    */

    /*-----------------------------------------------------------------*/


    throw 'syntax error, line `' + this.line + '`, syntax error or tuncated expression';
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  parseGroup: function parseGroup() {
    var node;
    /*-----------------------------------------------------------------*/

    /* Group : '(' Filter ')'                                          */

    /*-----------------------------------------------------------------*/

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
    /*-----------------------------------------------------------------*/


    return null;
  },

  /*---------------------------------------------------------------------*/
  parseArray: function parseArray() {
    var node, list;
    /*-----------------------------------------------------------------*/

    /* Array : '[' Singlets ']'                                        */

    /*-----------------------------------------------------------------*/

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
    /*-----------------------------------------------------------------*/


    return null;
  },

  /*---------------------------------------------------------------------*/
  parseObject: function parseObject() {
    var node, dict;
    /*-----------------------------------------------------------------*/

    /* Object : '{' Doublets '}'                                       */

    /*-----------------------------------------------------------------*/

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
    /*-----------------------------------------------------------------*/


    return null;
  },

  /*---------------------------------------------------------------------*/
  parseFunVar: function parseFunVar(isFilter) {
    var node;

    if (this.tokenizer.checkType(amiTwig.expr.tokens.SID)) {
      node = new amiTwig.expr.Node(0, isFilter ? 'filter_' + this.tokenizer.peekToken() : this.tokenizer.peekToken());
      node.q = true;
      this.tokenizer.next();
      /*-------------------------------------------------------------*/

      /* FunVar : SID '(' Singlets ')'                               */

      /*-------------------------------------------------------------*/

      /**/

      if (this.tokenizer.checkType(amiTwig.expr.tokens.LP)) {
        this.tokenizer.next();
        node.list = this._parseSinglets();

        if (this.tokenizer.checkType(amiTwig.expr.tokens.RP)) {
          this.tokenizer.next();
          node.nodeType = amiTwig.expr.tokens.FUN;
        } else {
          throw 'syntax error, line `' + this.line + '`, `)` expected';
        }
      }
      /*-------------------------------------------------------------*/

      /*        | SID                                                */

      /*-------------------------------------------------------------*/
      else {
          node.nodeType = isFilter ? amiTwig.expr.tokens.FUN : amiTwig.expr.tokens.VAR;
          node.list = [];
        }
      /*-------------------------------------------------------------*/


      return node;
    }

    return null;
  },

  /*---------------------------------------------------------------------*/
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

  /*---------------------------------------------------------------------*/
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

  /*---------------------------------------------------------------------*/
  _parseSinglet: function _parseSinglet(result) {
    result.push(this.parseFilter());
  },

  /*---------------------------------------------------------------------*/
  _parseDoublet: function _parseDoublet(result) {
    if (this.tokenizer.checkType(amiTwig.expr.tokens.TERMINAL)) {
      var key = this.tokenizer.peekToken();
      this.tokenizer.next();

      if (this.tokenizer.checkType(amiTwig.expr.tokens.COLON)) {
        /*				const colon = this.tokenizer.peekToken();
         */
        this.tokenizer.next();
        /*---------------------------------------------------------*/

        result[key] = this.parseFilter();
        /*---------------------------------------------------------*/
      } else {
        throw 'syntax error, line `' + this.line + '`, `:` expected';
      }
    } else {
      throw 'syntax error, line `' + this.line + '`, terminal expected';
    }
  },

  /*---------------------------------------------------------------------*/
  parseTerminal: function parseTerminal() {
    var left, right, node;
    /*-----------------------------------------------------------------*/

    /* Terminal : TERMINAL | RANGE                                     */

    /*-----------------------------------------------------------------*/

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
    /*-----------------------------------------------------------------*/


    return null;
  }
  /*---------------------------------------------------------------------*/

};
/*-------------------------------------------------------------------------*/

/* amiTwig.expr.Node                                                       */

/*-------------------------------------------------------------------------*/

amiTwig.expr.Node = function (nodeType, nodeValue) {
  this.$init(nodeType, nodeValue);
};
/*-------------------------------------------------------------------------*/


amiTwig.expr.Node.prototype = {
  /*---------------------------------------------------------------------*/
  $init: function $init(nodeType, nodeValue) {
    this.nodeType = nodeType;
    this.nodeValue = nodeValue;
    this.nodeLeft = null;
    this.nodeRight = null;
    this.list = null;
    this.dict = null;
  },

  /*---------------------------------------------------------------------*/
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

  /*---------------------------------------------------------------------*/
  dump: function dump() {
    var nodes = [];
    var edges = [];

    this._dump(nodes, edges, [0]);

    return 'digraph ast {\n\trankdir=TB;\n' + nodes.join('\n') + '\n' + edges.join('\n') + '\n}';
  }
  /*---------------------------------------------------------------------*/

};
/*-------------------------------------------------------------------------*/

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

/*-------------------------------------------------------------------------*/

/* amiTwig.tmpl                                                            */

/*-------------------------------------------------------------------------*/

amiTwig.tmpl = {};
/*-------------------------------------------------------------------------*/

/* amiTwig.tmpl.Compiler                                                   */

/*-------------------------------------------------------------------------*/

amiTwig.tmpl.Compiler = function (tmpl) {
  this.$init(tmpl);
};
/*-------------------------------------------------------------------------*/


amiTwig.tmpl.Compiler.prototype = {
  /*---------------------------------------------------------------------*/
  STATEMENT_RE: /\{%\s*([a-zA-Z]+)\s*((?:.|\n)*?)\s*%\}/,
  COMMENT_RE: /\{#\s*((?:.|\n)*?)\s*#\}/g,

  /*---------------------------------------------------------------------*/
  _count: function _count(s) {
    var result = 0;
    var l = s.length;

    for (var i = 0; i < l; i++) {
      if (s[i] === '\n') result++;
    }

    return result;
  },

  /*---------------------------------------------------------------------*/
  $init: function $init(tmpl) {
    /*-----------------------------------------------------------------*/
    var line = 1;
    var column;
    var COLUMN;
    /*-----------------------------------------------------------------*/

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
    /*-----------------------------------------------------------------*/

    var stack1 = [this.rootNode];
    var stack2 = [0x00000000000];
    var item;
    /*-----------------------------------------------------------------*/

    for (tmpl = tmpl.replace(this.COMMENT_RE, '');; tmpl = tmpl.substr(COLUMN)) {
      /*-------------------------------------------------------------*/
      var curr = stack1[stack1.length - 1];
      var indx = stack2[stack2.length - 1];
      /*-------------------------------------------------------------*/

      var m = tmpl.match(this.STATEMENT_RE);
      /*-------------------------------------------------------------*/

      if (m === null) {
        /*---------------------------------------------------------*/
        line += this._count(tmpl);
        /*---------------------------------------------------------*/

        curr.blocks[indx].list.push({
          line: line,
          keyword: '@text',
          expression: '',
          blocks: [],
          value: tmpl
        });
        /*---------------------------------------------------------*/

        var errors = [];

        for (var i = stack1.length - 1; i > 0; i--) {
          /**/
          if (stack1[i].keyword === 'if') {
            errors.push('missing keyword `endif`');
          } else if (stack1[i].keyword === 'for') {
            errors.push('missing keyword `endfor`');
          }
        }

        if (errors.length > 0) {
          throw 'syntax error, line `' + line + '`, ' + errors.join(', ');
        }
        /*---------------------------------------------------------*/


        break;
      }
      /*-------------------------------------------------------------*/


      var match = m[0];
      var keyword = m[1];
      var expression = m[2];
      column = m.index + 0x0000000000;
      COLUMN = m.index + match.length;
      var value = tmpl.substr(0, column);
      var VALUE = tmpl.substr(0, COLUMN);
      /*-------------------------------------------------------------*/

      line += this._count(VALUE);
      /*-------------------------------------------------------------*/

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
      /*-------------------------------------------------------------*/


      switch (keyword) {
        /*---------------------------------------------------------*/
        case 'flush':
        case 'autoescape':
        case 'spaceless':
        case 'verbatim':
          /* IGNORE */
          break;

        /*---------------------------------------------------------*/

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

        /*---------------------------------------------------------*/

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

        /*---------------------------------------------------------*/

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

        /*---------------------------------------------------------*/

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

        /*---------------------------------------------------------*/

        case 'endif':
          if (curr['keyword'] !== 'if') {
            throw 'syntax error, line `' + line + '`, unexpected keyword `endif`';
          }

          stack1.pop();
          stack2.pop();
          break;

        /*---------------------------------------------------------*/

        case 'endfor':
          if (curr['keyword'] !== 'for') {
            throw 'syntax error, line `' + line + '`, unexpected keyword `endfor`';
          }

          stack1.pop();
          stack2.pop();
          break;

        /*---------------------------------------------------------*/

        default:
          throw 'syntax error, line `' + line + '`, unknown keyword `' + keyword + '`';

        /*---------------------------------------------------------*/
      }
      /*-------------------------------------------------------------*/

    }
    /*-----------------------------------------------------------------*/

  },

  /*---------------------------------------------------------------------*/
  dump: function dump() {
    return JSON.stringify(this.rootNode, null, 2);
  }
  /*---------------------------------------------------------------------*/

};
/*-------------------------------------------------------------------------*/

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

/*-------------------------------------------------------------------------*/

/* amiTwig.engine                                                          */

/*-------------------------------------------------------------------------*/

amiTwig.engine = {
  /*---------------------------------------------------------------------*/
  VARIABLE_RE: /\{\{\s*(.*?)\s*\}\}/g,

  /*---------------------------------------------------------------------*/
  _render: function _render(result, item, dict) {
    var _this = this;

    if (dict === void 0) {
      dict = {};
    }

    var m;
    var expression;
    this.dict = dict;

    switch (item.keyword) {
      /*-------------------------------------------------------------*/

      /* DO                                                          */

      /*-------------------------------------------------------------*/
      case 'do':
        {
          /*---------------------------------------------------------*/
          amiTwig.expr.cache.eval(item.expression, item.line, dict);
          /*---------------------------------------------------------*/

          break;
        }

      /*-------------------------------------------------------------*/

      /* SET                                                         */

      /*-------------------------------------------------------------*/

      case 'set':
        {
          /*---------------------------------------------------------*/
          m = item.expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(.+)/);

          if (!m) {
            throw 'syntax error, line `' + item.line + '`, invalid `set` statement';
          }
          /*---------------------------------------------------------*/


          dict[m[1]] = amiTwig.expr.cache.eval(m[2], item.line, dict);
          /*---------------------------------------------------------*/

          break;
        }

      /*-------------------------------------------------------------*/

      /* @TEXT                                                       */

      /*-------------------------------------------------------------*/

      case '@text':
        {
          /*---------------------------------------------------------*/
          result.push(item.value.replace(this.VARIABLE_RE, function (match, expression) {
            var value = amiTwig.expr.cache.eval(expression, item.line, dict);
            return value !== null && value !== undefined ? value : '';
          }));
          /*---------------------------------------------------------*/

          break;
        }

      /*-------------------------------------------------------------*/

      /* IF                                                          */

      /*-------------------------------------------------------------*/

      case 'if':
      case '@root':
        {
          /*---------------------------------------------------------*/
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
          /*---------------------------------------------------------*/

          break;
        }

      /*-------------------------------------------------------------*/

      /* FOR                                                         */

      /*-------------------------------------------------------------*/

      case 'for':
        {
          /*---------------------------------------------------------*/
          m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/);

          if (!m) {
            throw 'syntax error, line `' + item.line + '`, invalid `for` statement';
          }
          /*---------------------------------------------------------*/


          var symb = m[1];
          var expr = m[2];
          /*---------------------------------------------------------*/

          var value = amiTwig.expr.cache.eval(expr, item.line, dict);
          /*---------------------------------------------------------*/

          var typeName = Object.prototype.toString.call(value);

          if (typeName === '[object Object]') {
            value = Object.keys(value);
          } else {
            if (typeName !== '[object Array]' && typeName !== '[object String]') {
              throw 'syntax error, line `' + item.line + '`, right operande not iterable';
            }
          }
          /*---------------------------------------------------------*/


          var old1 = dict[symb];
          var old2 = dict['loop'];
          /*---------------------------------------------------------*/

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
          /*---------------------------------------------------------*/


          dict['loop'] = old2;
          dict[symb] = old1;
          /*---------------------------------------------------------*/

          break;
        }

      /*-------------------------------------------------------------*/

      /* INCLUDE                                                     */

      /*-------------------------------------------------------------*/

      case 'include':
        {
          /*---------------------------------------------------------*/
          var m_1_ = item.expression,
              with_subexpr,
              with_context;
          /**/

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
          /*---------------------------------------------------------*/


          var fileName = amiTwig.expr.cache.eval(expression, item.line, dict) || '';

          if (Object.prototype.toString.call(fileName) !== '[object String]') {
            throw 'runtime error, line `' + item.line + '`, string expected';
          }
          /*---------------------------------------------------------*/


          var variables = amiTwig.expr.cache.eval(with_subexpr, item.line, dict) || {};

          if (Object.prototype.toString.call(variables) !== '[object Object]') {
            throw 'runtime error, line `' + item.line + '`, object expected';
          }
          /*---------------------------------------------------------*/


          result.push(amiTwig.stdlib.include(fileName, variables, with_context, false));
          /*---------------------------------------------------------*/

          break;
        }

      /*-------------------------------------------------------------*/
    }
    /*-----------------------------------------------------------------*/

  },

  /*---------------------------------------------------------------------*/
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
        this._render(result,
        /*--------------*/
        tmpl
        /*--------------*/
        , dict);

        break;
    }

    return result.join('');
  }
  /*---------------------------------------------------------------------*/

};
/*-------------------------------------------------------------------------*/

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

/*-------------------------------------------------------------------------*/

/* amiTwig.expr.cache                                                      */

/*-------------------------------------------------------------------------*/

amiTwig.expr.cache = {
  /*---------------------------------------------------------------------*/
  dict: {},

  /*---------------------------------------------------------------------*/
  eval: function _eval(expression, line, _) {
    /*-----------------------------------------------------------------*/
    var f;

    if (expression in this.dict) {
      f = this.dict[expression];
    } else {
      f = this.dict[expression] = eval(amiTwig.expr.interpreter.getJS(new amiTwig.expr.Compiler(expression, line)));
    }
    /*-----------------------------------------------------------------*/


    if (!_) _ = {};
    return f.call(_, _);
    /*-----------------------------------------------------------------*/
  }
  /*---------------------------------------------------------------------*/

};
/*-------------------------------------------------------------------------*/

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

/*-------------------------------------------------------------------------*/

/* amiTwig.date                                                            */

/*-------------------------------------------------------------------------*/

/* TODO */

/*-------------------------------------------------------------------------*/

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

/*-------------------------------------------------------------------------*/

/* amiTwig.ajax                                                            */

/*-------------------------------------------------------------------------*/

amiTwig.ajax = {
  /*---------------------------------------------------------------------*/
  dict: {},

  /*---------------------------------------------------------------------*/
  get: function get(url, done, fail) {
    var txt;
    /*-----------------------------------------------------------------*/

    if (url in this.dict) {
      if (done) {
        done(this.dict[url]);
      }

      return;
    }
    /*-----------------------------------------------------------------*/


    if (amiTwig.fs) {
      /*-------------------------------------------------------------*/

      /* NODEJS                                                      */

      /*-------------------------------------------------------------*/
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
      /*-------------------------------------------------------------*/

    } else {
      /*-------------------------------------------------------------*/

      /* BROWSER                                                     */

      /*-------------------------------------------------------------*/
      var xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open('GET', url, false);
      xmlHttpRequest.send();
      /*-------------------------------------------------------------*/

      if (xmlHttpRequest.status === 200) {
        txt = this.dict[url] = xmlHttpRequest.responseText;

        if (done) {
          done(txt);
        }
      } else {
        txt =
        /**************/
        xmlHttpRequest.responseText;

        if (fail) {
          fail(txt);
        }
      }
      /*-------------------------------------------------------------*/

    }
    /*-----------------------------------------------------------------*/

  }
  /*---------------------------------------------------------------------*/

};
/*-------------------------------------------------------------------------*/

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

/*-------------------------------------------------------------------------*/

/* amiTwig.stdlib                                                          */

/*-------------------------------------------------------------------------*/

amiTwig.stdlib = {
  /*---------------------------------------------------------------------*/

  /* VARIABLES                                                           */

  /*---------------------------------------------------------------------*/
  'isUndefined': function isUndefined(x) {
    return x === undefined;
  },

  /*---------------------------------------------------------------------*/
  'isDefined': function isDefined(x) {
    return x !== undefined;
  },

  /*---------------------------------------------------------------------*/
  'isNull': function isNull(x) {
    return x === null;
  },

  /*---------------------------------------------------------------------*/
  'isNotNull': function isNotNull(x) {
    return x !== null;
  },

  /*---------------------------------------------------------------------*/
  'isEmpty': function isEmpty(x) {
    if (x === null || x === false || x === '') {
      return true;
    }

    var typeName = Object.prototype.toString.call(x);
    return typeName === '[object Array]' && x.length === 0 || typeName === '[object Object]' && Object.keys(x).length === 0;
  },

  /*---------------------------------------------------------------------*/
  'isNumber': function isNumber(x) {
    return Object.prototype.toString.call(x) === '[object Number]';
  },

  /*---------------------------------------------------------------------*/
  'isString': function isString(x) {
    return Object.prototype.toString.call(x) === '[object String]';
  },

  /*---------------------------------------------------------------------*/
  'isArray': function isArray(x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  },

  /*---------------------------------------------------------------------*/
  'isObject': function isObject(x) {
    return Object.prototype.toString.call(x) === '[object Object]';
  },

  /*---------------------------------------------------------------------*/
  'isIterable': function isIterable(x) {
    var typeName = Object.prototype.toString.call(x);
    return typeName === '[object String]' || typeName === '[object Array]' || typeName === '[object Object]';
  },

  /*---------------------------------------------------------------------*/
  'isEven': function isEven(x) {
    return this.isNumber(x) && (x & 1) === 0;
  },

  /*---------------------------------------------------------------------*/
  'isOdd': function isOdd(x) {
    return this.isNumber(x) && (x & 1) === 1;
  },

  /*---------------------------------------------------------------------*/

  /* ITERABLES                                                           */

  /*---------------------------------------------------------------------*/
  'isInObject': function isInObject(x, y) {
    if (this.isArray(y) || this.isString(y)) {
      return y.indexOf(x) >= 0;
    }

    if (this.isObject(y)) {
      return x in y;
    }

    return false;
  },

  /*---------------------------------------------------------------------*/
  'isInRange': function isInRange(x, x1, x2) {
    if (this.isNumber(x1) && this.isNumber(x2)) {
      return (
        /*---*/
        x
        /*---*/
        >=
        /*---*/
        x1
        /*---*/
        &&
        /*---*/
        x
        /*---*/
        <=
        /*---*/
        x2
        /*---*/

      );
    }

    if (this.isString(x1) && x1.length === 1 && this.isString(x2) && x2.length === 1) {
      return x.charCodeAt(0) >= x1.charCodeAt(0) && x.charCodeAt(0) <= x2.charCodeAt(0);
    }

    return false;
  },

  /*---------------------------------------------------------------------*/
  'range': function range(x1, x2, step) {
    if (step === void 0) {
      step = 1;
    }

    var result = [];
    /**/

    if (this.isNumber(x1) && this.isNumber(x2)) {
      for (var i =
      /*---*/
      x1
      /*---*/
      ; i <=
      /*---*/
      x2
      /*---*/
      ; i += step) {
        result.push(
        /*---------------*/
        i);
      }
    } else if (this.isString(x1) && x1.length === 1 && this.isString(x2) && x2.length === 1) {
      for (var _i2 = x1.charCodeAt(0); _i2 <= x2.charCodeAt(0); _i2 += step) {
        result.push(String.fromCharCode(_i2));
      }
    }

    return result;
  },

  /*---------------------------------------------------------------------*/
  'filter_length': function filter_length(x) {
    if (this.isString(x) || this.isArray(x)) {
      return x.length;
    }

    if (this.isObject(x)) {
      return Object.keys(x).length;
    }

    return 0;
  },

  /*---------------------------------------------------------------------*/
  'filter_first': function filter_first(x) {
    return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[0x0000000000] : '';
  },

  /*---------------------------------------------------------------------*/
  'filter_last': function filter_last(x) {
    return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[x.length - 1] : '';
  },

  /*---------------------------------------------------------------------*/
  'filter_slice': function filter_slice(x, idx1, idx2) {
    return this.isString(x) || this.isArray(x) ? x.slice(idx1, idx2) : null;
  },

  /*---------------------------------------------------------------------*/
  'filter_merge': function filter_merge() {
    if (arguments.length > 1) {
      /*-------------------------------------------------------------*/
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
      /*-------------------------------------------------------------*/


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
      /*-------------------------------------------------------------*/


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
      /*-------------------------------------------------------------*/

    }

    return null;
  },

  /*---------------------------------------------------------------------*/
  'filter_sort': function filter_sort(x) {
    return this.isArray(x) ? x.sort() : [];
  },

  /*---------------------------------------------------------------------*/
  'filter_reverse': function filter_reverse(x) {
    return this.isArray(x) ? x.reverse() : [];
  },

  /*---------------------------------------------------------------------*/
  'filter_join': function filter_join(x, sep) {
    return this.isArray(x) ? x.join(sep) : '';
  },

  /*---------------------------------------------------------------------*/
  'filter_keys': function filter_keys(x) {
    return this.isObject(x) ? Object.keys(x) : [];
  },

  /*---------------------------------------------------------------------*/

  /* STRINGS                                                             */

  /*---------------------------------------------------------------------*/
  'startsWith': function startsWith(s1, s2) {
    if (this.isString(s1) && this.isString(s2)) {
      var base = 0x0000000000000000000;
      return s1.indexOf(s2, base) === base;
    }

    return false;
  },

  /*---------------------------------------------------------------------*/
  'endsWith': function endsWith(s1, s2) {
    if (this.isString(s1) && this.isString(s2)) {
      var base = s1.length - s2.length;
      return s1.indexOf(s2, base) === base;
    }

    return false;
  },

  /*---------------------------------------------------------------------*/
  'match': function match(s, regex) {
    if (this.isString(s) && this.isString(regex)) {
      var idx1 = regex.indexOf('/');
      var idx2 = regex.lastIndexOf('/');

      if (idx1 === 0 || idx1 < idx2) {
        try {
          return new RegExp(regex.substring(idx1 + 1, idx2), regex.substring(idx2 + 1)).test(s);
        } catch (err) {
          /* IGNORE */
        }
      }
    }

    return false;
  },

  /*---------------------------------------------------------------------*/
  'filter_default': function filter_default(s1, s2) {
    return s1 || s2 || '';
  },

  /*---------------------------------------------------------------------*/
  'filter_lower': function filter_lower(s) {
    return this.isString(s) ? s.toLowerCase() : '';
  },

  /*---------------------------------------------------------------------*/
  'filter_upper': function filter_upper(s) {
    return this.isString(s) ? s.toUpperCase() : '';
  },

  /*---------------------------------------------------------------------*/
  'filter_capitalize': function filter_capitalize(s) {
    if (this.isString(s)) {
      return s.trim().toLowerCase().replace(/^\S/g, function (c) {
        return c.toUpperCase();
      });
    }

    return '';
  },

  /*---------------------------------------------------------------------*/
  'filter_title': function filter_title(s) {
    if (this.isString(s)) {
      return s.trim().toLowerCase().replace(/(?:^|\s)\S/g, function (c) {
        return c.toUpperCase();
      });
    }

    return '';
  },

  /*---------------------------------------------------------------------*/
  'filter_trim': function filter_trim(s) {
    return this.isString(s) ? s.trim() : '';
  },

  /*---------------------------------------------------------------------*/
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

  /*---------------------------------------------------------------------*/
  '_textToHtmlX': ['&', '"', '<', '>'],
  '_textToHtmlY': ['&amp;', '&quot;', '&lt;', '&gt;'],

  /*---------------------------------------------------------------------*/
  '_textToStringX': ['\\', '\n', '"', '\''],
  '_textToStringY': ['\\\\', '\\n', '\\"', '\\\''],

  /*---------------------------------------------------------------------*/
  '_textToJsonStringX': ['\\', '\n', '"'],
  '_textToJsonStringY': ['\\\\', '\\n', '\\"'],

  /*---------------------------------------------------------------------*/
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

  /*---------------------------------------------------------------------*/
  'filter_url_encode': function filter_url_encode(s) {
    return this.isString(s) ? encodeURIComponent(s) : '';
  },

  /*---------------------------------------------------------------------*/
  'filter_nl2br': function filter_nl2br(s) {
    return this.isString(s) ? s.replace(/\n/g, '<br/>') : '';
  },

  /*---------------------------------------------------------------------*/
  'filter_raw': function filter_raw(s) {
    return this.isString(s) ? s : '';
  },

  /*---------------------------------------------------------------------*/
  'filter_replace': function filter_replace(s, dict) {
    return this.isString(s) && this.isObject(dict) ? this._replace(s, Object.keys(dict), Object.values(dict)) : '';
  },

  /*---------------------------------------------------------------------*/
  'filter_split': function filter_split(s, sep, max) {
    return this.isString(s) ? s.split(sep, max) : [];
  },

  /*---------------------------------------------------------------------*/

  /* NUMBERS                                                             */

  /*---------------------------------------------------------------------*/
  'filter_abs': function filter_abs(x) {
    return Math.abs(x);
  },

  /*---------------------------------------------------------------------*/
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

  /*---------------------------------------------------------------------*/
  'min': function min() {
    /*-----------------------------------------------------------------*/
    var args = arguments.length === 1 && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0] : arguments;
    /*-----------------------------------------------------------------*/

    var result = Number.POSITIVE_INFINITY;

    for (var i in args) {
      if (!this.isNumber(args[i])) {
        return Number.NaN;
      }

      if (result > args[i]) {
        result = args[i];
      }
    }
    /*-----------------------------------------------------------------*/


    return result;
  },

  /*---------------------------------------------------------------------*/
  'max': function max() {
    /*-----------------------------------------------------------------*/
    var args = arguments.length === 1 && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0] : arguments;
    /*-----------------------------------------------------------------*/

    var result = Number.NEGATIVE_INFINITY;

    for (var i in args) {
      if (!this.isNumber(args[i])) {
        return Number.NaN;
      }

      if (result < args[i]) {
        result = args[i];
      }
    }
    /*-----------------------------------------------------------------*/


    return result;
  },

  /*---------------------------------------------------------------------*/

  /* RANDOM                                                              */

  /*---------------------------------------------------------------------*/
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

  /*---------------------------------------------------------------------*/

  /* JSON                                                                */

  /*---------------------------------------------------------------------*/
  'filter_json_encode': function filter_json_encode(x, indent) {
    return JSON.stringify(x, null, this.isNumber(indent) ? indent : 2);
  },

  /*---------------------------------------------------------------------*/
  'filter_json_jspath': function filter_json_jspath(x, path) {
    return typeof JSPath !== 'undefined' ? JSPath.apply(path, x) : [];
  },

  /*---------------------------------------------------------------------*/

  /* TEMPLATES                                                           */

  /*---------------------------------------------------------------------*/
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
    /*-----------------------------------------------------------------*/

    if (withContext) {
      for (var i in amiTwig.engine.dict) {
        temp[i] = amiTwig.engine.dict[i];
      }
    }

    if (variables) {
      for (var _i5 in
      /*-*/
      variables
      /*-*/
      ) {
        temp[_i5] =
        /*-*/
        variables
        /*-*/
        [_i5];
      }
    }
    /*-----------------------------------------------------------------*/


    var result = '';
    amiTwig.ajax.get(fileName, function (data) {
      result = amiTwig.engine.render(data, temp);
    }, function ()
    /**/
    {
      if (!ignoreMissing) {
        throw 'runtime error, could not open `' + fileName + '`';
      }
    });
    /*-----------------------------------------------------------------*/

    return result;
  }
  /*---------------------------------------------------------------------*/

};
/*-------------------------------------------------------------------------*/

amiTwig.stdlib.filter_e = amiTwig.stdlib.filter_escape;
/*-------------------------------------------------------------------------*/

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

/*-------------------------------------------------------------------------*/

/* amiTwig.expr.interpreter                                                */

/*-------------------------------------------------------------------------*/

amiTwig.expr.interpreter = {
  /*---------------------------------------------------------------------*/
  _getJS: function _getJS(node) {
    var L;
    var x;
    var left;
    var right;
    var operator;

    switch (node.nodeType) {
      /*-------------------------------------------------------------*/

      /* LST                                                         */

      /*-------------------------------------------------------------*/
      case amiTwig.expr.tokens.LST:
        /*---------------------------------------------------------*/
        L = [];

        for (var i in node.list) {
          L.push(
          /*-----*/
          this._getJS(node.list[i]));
        }
        /*---------------------------------------------------------*/


        return '[' + L.join(',') + ']';

      /*-------------------------------------------------------------*/

      /* DIC                                                         */

      /*-------------------------------------------------------------*/

      case amiTwig.expr.tokens.DIC:
        /*---------------------------------------------------------*/
        L = [];

        for (var _i6 in node.dict) {
          L.push(_i6 + ':' + this._getJS(node.dict[_i6]));
        }
        /*---------------------------------------------------------*/


        return '{' + L.join(',') + '}';

      /*-------------------------------------------------------------*/

      /* FUN                                                         */

      /*-------------------------------------------------------------*/

      case amiTwig.expr.tokens.FUN:
        /*---------------------------------------------------------*/
        L = [];

        for (var _i7 in node.list) {
          L.push(this._getJS(node.list[_i7]));
        }
        /*---------------------------------------------------------*/


        return node.nodeValue + '(' + L.join(',') + ')';

      /*-------------------------------------------------------------*/

      /* VAR                                                         */

      /*-------------------------------------------------------------*/

      case amiTwig.expr.tokens.VAR:
        /*---------------------------------------------------------*/
        L = [];

        for (var _i8 in node.list) {
          L.push('[' + this._getJS(node.list[_i8]) + ']');
        }
        /*---------------------------------------------------------*/


        return L.length > 0 ? node.nodeValue + L.join('') : node.nodeValue;

      /*-------------------------------------------------------------*/

      /* TERMINAL                                                    */

      /*-------------------------------------------------------------*/

      case amiTwig.expr.tokens.TERMINAL:
        return node.nodeValue;

      /*-------------------------------------------------------------*/

      /* IS                                                          */

      /*-------------------------------------------------------------*/

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

      /*-------------------------------------------------------------*/

      /* IN                                                          */

      /*-------------------------------------------------------------*/

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

      /*-------------------------------------------------------------*/

      /* STARTS_WITH                                                 */

      /*-------------------------------------------------------------*/

      case amiTwig.expr.tokens.STARTS_WITH:
        left = this._getJS(node.nodeLeft);
        right = this._getJS(node.nodeRight);
        return 'amiTwig.stdlib.startsWith(' + left + ',' + right + ')';

      /*-------------------------------------------------------------*/

      /* ENDS_WITH                                                   */

      /*-------------------------------------------------------------*/

      case amiTwig.expr.tokens.ENDS_WITH:
        left = this._getJS(node.nodeLeft);
        right = this._getJS(node.nodeRight);
        return 'amiTwig.stdlib.endsWith(' + left + ',' + right + ')';

      /*-------------------------------------------------------------*/

      /* MATCHES                                                     */

      /*-------------------------------------------------------------*/

      case amiTwig.expr.tokens.MATCHES:
        left = this._getJS(node.nodeLeft);
        right = this._getJS(node.nodeRight);
        return 'amiTwig.stdlib.match(' + left + ',' + right + ')';

      /*-------------------------------------------------------------*/

      /* RANGE                                                       */

      /*-------------------------------------------------------------*/

      case amiTwig.expr.tokens.RANGE:
        left = this._getJS(node.nodeLeft);
        right = this._getJS(node.nodeRight);
        return 'amiTwig.stdlib.range(' + left + ',' + right + ')';

      /*-------------------------------------------------------------*/

      /* DOT                                                         */

      /*-------------------------------------------------------------*/

      case amiTwig.expr.tokens.DOT:
        left = this._getJS(node.nodeLeft);
        right = this._getJS(node.nodeRight);

        if (node.nodeValue[0] === '.') {
          return left + '.' + right;
        } else {
          return left + '[' + right + ']';
        }

      /*-------------------------------------------------------------*/

      /* FLDIV                                                       */

      /*-------------------------------------------------------------*/

      case amiTwig.expr.tokens.FLDIV:
        left = this._getJS(node.nodeLeft);
        right = this._getJS(node.nodeRight);
        return 'Math.floor(' + left + '/' + right + ')';

      /*-------------------------------------------------------------*/

      /* POWER                                                       */

      /*-------------------------------------------------------------*/

      case amiTwig.expr.tokens.POWER:
        left = this._getJS(node.nodeLeft);
        right = this._getJS(node.nodeRight);
        return 'Math.pow(' + left + ',' + right + ')';

      /*-------------------------------------------------------------*/

      default:
        /*---------------------------------------------------------*/

        /* UNIARY OPERATOR                                         */

        /*---------------------------------------------------------*/
        if (node.nodeLeft === null && node.nodeRight !== null) {
          operator = node.nodeType !== amiTwig.expr.tokens.NOT ? node.nodeValue : '!';
          return operator + '(' + this._getJS(node.nodeRight) + ')';
        }

        if (node.nodeLeft !== null && node.nodeRight === null) {
          operator = node.nodeType !== amiTwig.expr.tokens.NOT ? node.nodeValue : '!';
          return '(' + this._getJS(node.nodeLeft) + ')' + operator;
        }
        /*---------------------------------------------------------*/

        /* BINARY OPERATOR                                         */

        /*---------------------------------------------------------*/


        if (node.nodeLeft !== null && node.nodeRight !== null) {
          switch (node.nodeType) {
            /*-------------------------------------------------*/
            case amiTwig.expr.tokens.LOGICAL_OR:
              operator = '||';
              break;

            /*-------------------------------------------------*/

            case amiTwig.expr.tokens.LOGICAL_AND:
              operator = '&&';
              break;

            /*-------------------------------------------------*/

            case amiTwig.expr.tokens.BITWISE_OR:
              operator = '|';
              break;

            /*-------------------------------------------------*/

            case amiTwig.expr.tokens.BITWISE_XOR:
              operator = '^';
              break;

            /*-------------------------------------------------*/

            case amiTwig.expr.tokens.BITWISE_AND:
              operator = '&';
              break;

            /*-------------------------------------------------*/

            case amiTwig.expr.tokens.CONCAT:
              operator = '+';
              break;

            /*-------------------------------------------------*/

            default:
              operator = node.nodeValue;
              break;

            /*-------------------------------------------------*/
          }

          left = this._getJS(node.nodeLeft);
          right = this._getJS(node.nodeRight);
          return '(' + left + operator + right + ')';
        }

      /*-------------------------------------------------------------*/
    }
    /*-----------------------------------------------------------------*/

  },

  /*---------------------------------------------------------------------*/
  getJS: function getJS(expr) {
    return '(function(_) { return ' + this._getJS(expr.rootNode) + '; })';
  },

  /*---------------------------------------------------------------------*/
  eval: function _eval(expr, _) {
    if (!_) _ = {};
    return eval(this.getJS(expr)).call(_, _);
  }
  /*---------------------------------------------------------------------*/

};
/*-------------------------------------------------------------------------*/

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
  }; // parser

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
  }(); // translator


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
        // eslint-disable-line no-prototype-builtins
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
/*-------------------------------------------------------------------------*/

/* ES6 EXTENSIONS                                                          */

/*-------------------------------------------------------------------------*/


if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (s) {
    var base = 0x00000000000000000000;
    return this.indexOf(s, base) === base;
  };
}
/*-------------------------------------------------------------------------*/


if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (s) {
    var base = this.length - s.length;
    return this.indexOf(s, base) === base;
  };
}
/*-------------------------------------------------------------------------*/

/* JQUERY EXTENSIONS                                                       */

/*-------------------------------------------------------------------------*/


var _ami_internal_jQueryEach = jQuery.each;
var _ami_internal_jQueryAjax = jQuery.ajax;
/*-------------------------------------------------------------------------*/

jQuery.each = function (el, callback, context) {
  return _ami_internal_jQueryEach(el, context ? function (index, value) {
    return callback.call(context, index, value);
  } : callback);
};
/*-------------------------------------------------------------------------*/


jQuery.ajax = function (settings) {
  if (typeof settings === 'object' && settings.dataType === 'sheet') {
    var result = $.Deferred();

    var _amiWebApp$setup = amiWebApp.setup(['context', 'url'], [result, ''], settings),
        context = _amiWebApp$setup[0],
        url = _amiWebApp$setup[1];
    /*-----------------------------------------------------------------*/


    if (url) {
      $('head').append('<link rel="stylesheet" type="text/css" href="' + url + '"></link>').promise().done(function () {
        result.resolveWith(context);
      });
    } else {
      result.rejectWith(context);
    }
    /*-----------------------------------------------------------------*/


    return result.promise();
  } else {
    /*-----------------------------------------------------------------*/
    return _ami_internal_jQueryAjax.apply(this, arguments);
    /*-----------------------------------------------------------------*/
  }
};
/*-------------------------------------------------------------------------*/


jQuery.fn.extend({
  /*---------------------------------------------------------------------*/
  findWithSelf: function findWithSelf(selector) {
    return this.find(selector).addBack(selector);
  },

  /*---------------------------------------------------------------------*/
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
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/

/* BOOTSTRAP EXTENSIONS                                                    */

/*-------------------------------------------------------------------------*/

var _ami_internal_modalZIndex = 1050;
/*-------------------------------------------------------------------------*/

$(document).on('show.bs.modal', '.modal', function (e) {
  var el = $(e.currentTarget);
  setTimeout(function () {
    $('body > .modal-backdrop:last').css('z-index', _ami_internal_modalZIndex++);
    /*-----------*/

    el
    /*-----------*/
    .css('z-index', _ami_internal_modalZIndex++);
  }, 10);
});
/*-------------------------------------------------------------------------*/

/*
$(document).on('show.bs.dropdown', '.dropdown', (e) => {

	const el = $(e.currentTarget);
});
*/

/*-------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------*/

/* NAMESPACE HELPERS                                                       */

/*-------------------------------------------------------------------------*/

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
/*-------------------------------------------------------------------------*/


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
/*-------------------------------------------------------------------------*/

/* NAMESPACES                                                              */

/*-------------------------------------------------------------------------*/

/**
  * Create a new namespace
  * @param {String} $name the namespace name
  * @param {Object} [$descr] the namespace body
  */


function $AMINamespace($name, $descr) {
  if (!$descr) {
    $descr = {};
  }
  /*---------------------------------------------------------------------*/


  $descr.$name = $name;
  /*---------------------------------------------------------------------*/

  _$createNamespace($name, $descr);
  /*---------------------------------------------------------------------*/


  if ($descr.$) {
    $descr.$.apply($descr);
  }
  /*---------------------------------------------------------------------*/

}
/*-------------------------------------------------------------------------*/

/* INTERFACES                                                              */

/*-------------------------------------------------------------------------*/

/**
  * Create a new interface
  * @param {String} $name the interface name
  * @param {Object} [$descr] the interface body
  */


function $AMIInterface($name, $descr) {
  if (!$descr) {
    $descr = {};
  }
  /*---------------------------------------------------------------------*/


  var $class = function $class() {
    throw 'could nor instantiate interface';
  };
  /*---------------------------------------------------------------------*/


  if ($descr.$extends) {
    throw '`$extends` not allowed for interface';
  }

  if ($descr.$implements) {
    throw '`$implements` not allowed for interface';
  }
  /*---------------------------------------------------------------------*/


  if ($descr.$) {
    throw '`$` not allowed for interface';
  }

  if ($descr.$init) {
    throw '`$init` not allowed for interface';
  }
  /*---------------------------------------------------------------------*/


  $class.$name = $name;
  $class.$class = $class;
  $class.$members = $descr;
  /*---------------------------------------------------------------------*/

  _$addToNamespace($name, $class);
  /*---------------------------------------------------------------------*/

}
/*-------------------------------------------------------------------------*/

/* CLASSES                                                                 */

/*-------------------------------------------------------------------------*/

/**
  * Create a new class
  * @param {String} $name the class name
  * @param {Object} [$descr] the class body
  */


function $AMIClass($name, $descr) {
  if (!$descr) {
    $descr = {};
  }
  /*---------------------------------------------------------------------*/


  var $super = $descr.$extends instanceof Function ? $descr.$extends.prototype : {};
  var $super_implements = $super.$implements instanceof Array ? $super.$implements : [];
  var $descr_implements = $descr.$implements instanceof Array ? $descr.$implements : [];
  /*---------------------------------------------------------------------*/

  var $class = function $class() {
    /*-----------------------------------------------------------------*/
    for (var i in this.$implements) {
      if (this.$implements.hasOwnProperty(i)) // eslint-disable-line no-prototype-builtins
        {
          var $interface = this.$implements[i];

          for (var j in $interface.$members) {
            if ($interface.$members.hasOwnProperty(j)) // eslint-disable-line no-prototype-builtins
              {
                var $member = $interface.$members[j];

                if (typeof this[j] !== typeof $member) {
                  throw 'class `' + this.$name + '` with must implement `' + $interface.$name + '.' + j + '`';
                }
              }
          }
        }
    }
    /*-----------------------------------------------------------------*/


    var _super = this.$class._internal_super;
    var _added = this.$class._internal_added;
    /*-----------------------------------------------------------------*/

    this.$super = {};

    for (var name in _super) {
      if (_super.hasOwnProperty(name)) // eslint-disable-line no-prototype-builtins
        {
          this.$super[name] = function (_super, name, that) {
            return function () {
              return _super[name].apply(that, arguments);
            };
          }(_super, name, this);
        }
    }
    /*-----------------------------------------------------------------*/


    this.$added = {};

    for (var _name in _added) {
      if (_added.hasOwnProperty(_name)) // eslint-disable-line no-prototype-builtins
        {
          this.$added[_name] = function (_added, name, that) {
            return function () {
              return _added[name].apply(that, arguments);
            };
          }(_added, _name, this);
        }
    }
    /*-----------------------------------------------------------------*/


    if (this.$init) {
      this.$init.apply(this, arguments);
    }
    /*-----------------------------------------------------------------*/

  };
  /*---------------------------------------------------------------------*/


  $class._internal_super = {};
  $class._internal_added = {};
  /*---------------------------------------------------------------------*/

  for (var name in $super) {
    if (name === '$init' || name.charAt(0) !== '$' || $super.hasOwnProperty(name) // eslint-disable-line no-prototype-builtins
    ) {
        $class._internal_super[name] = $super[name];
        $class.prototype[name] = $super[name];
      }
  }

  for (var _name2 in $descr) {
    if (_name2 === '$init' || _name2.charAt(0) !== '$' || $descr.hasOwnProperty(_name2) // eslint-disable-line no-prototype-builtins
    ) {
        $class._internal_added[_name2] = $descr[_name2];
        $class.prototype[_name2] = $descr[_name2];
      }
  }
  /*---------------------------------------------------------------------*/


  $class.prototype.$name = $name;
  $class.prototype.$class = $class;
  $class.prototype.$implements = $super_implements.concat($descr_implements);
  /*---------------------------------------------------------------------*/

  _$addToNamespace($name, $class);
  /*---------------------------------------------------------------------*/


  if ($descr.$) {
    $descr.$.apply($class);
  }
  /*---------------------------------------------------------------------*/

}
/*-------------------------------------------------------------------------*/

/* NodeJS EXTENSION                                                        */

/*-------------------------------------------------------------------------*/


if (typeof exports !== 'undefined') {
  module.exports.Namespace = $AMINamespace;
  module.exports.Interface = $AMIInterface;
  module.exports.Class = $AMIClass;
}
/*-------------------------------------------------------------------------*/

/* JQUERY EXTENSION                                                        */

/*-------------------------------------------------------------------------*/


if (typeof jQuery !== 'undefined') {
  jQuery.Namespace = $AMINamespace;
  jQuery.Interface = $AMIInterface;
  jQuery.Class = $AMIClass;
}
/*-------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------*/

/**
 * The AMI url routing subsystem
 * @namespace amiRouter
 */


$AMINamespace('amiRouter',
/** @lends amiRouter */
{
  /*---------------------------------------------------------------------*/

  /* PRIVATE MEMBERS                                                     */

  /*---------------------------------------------------------------------*/
  _scriptURL: '',
  _originURL: '',
  _webAppURL: '',
  _hash: '',
  _args: [],

  /*---------------------------------------------------------------------*/
  _routes: [],

  /*---------------------------------------------------------------------*/

  /* PRIVATE METHODS                                                     */

  /*---------------------------------------------------------------------*/
  _eatSlashes: function _eatSlashes(url) {
    url = url.trim();

    while (url[url.length - 1] === '/') {
      url = url.substring(0, url.length - 1);
    }

    return url;
  },

  /*---------------------------------------------------------------------*/

  /* STATIC CONSTRUCTOR                                                  */

  /*---------------------------------------------------------------------*/
  $: function $() {
    var _this2 = this;

    /*-----------------------------------------------------------------*/
    this._args.length = 0;
    this._routes.length = 0;
    /*-----------------------------------------------------------------*/

    var href = window.location.href.trim();
    var hash = window.location.hash.trim();
    var search = window.location.search.trim();
    /*-----------------------------------------------------------------*/

    var scripts = document.getElementsByTagName('script');
    /*-----------------------------------------------------------------*/

    /* SCRIPT_URL AND ORIGIN_URL                                       */

    /*-----------------------------------------------------------------*/

    for (var idx, i = 0; i < scripts.length; i++) {
      idx = scripts[i].src.indexOf('js/ami.');

      if (idx > 0) {
        this._scriptURL = scripts[i].src;
        this._originURL = this._eatSlashes(this._scriptURL.substring(0, idx));
        break;
      }
    }
    /*-----------------------------------------------------------------*/

    /* WEBAPP_URL                                                      */

    /*-----------------------------------------------------------------*/


    this._webAppURL = this._eatSlashes(href.replace(/(?:\#|\?).*$/, ''));
    /*-----------------------------------------------------------------*/

    /* HASH                                                            */

    /*-----------------------------------------------------------------*/

    this._hash = this._eatSlashes(hash.substring(1).replace(/\?.*$/, ''));
    /*-----------------------------------------------------------------*/

    /* ARGS                                                            */

    /*-----------------------------------------------------------------*/

    if (search) {
      search.substring(1).split('&').forEach(function (param) {
        var parts = param.split('=');
        /**/

        if (parts.length === 1) {
          _this2._args[decodeURIComponent(parts[0])] =
          /*--------*/
          ''
          /*--------*/
          ;
        } else if (parts.length === 2) {
          _this2._args[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
        }
      });
    }
    /*-----------------------------------------------------------------*/

  },

  /*---------------------------------------------------------------------*/

  /* PUBLIC METHODS                                                      */

  /*---------------------------------------------------------------------*/

  /**
    * Gets the AWF's script URL
    * @returns {String} The AWF's script URL
    */
  getScriptURL: function getScriptURL() {
    return this._scriptURL;
  },

  /*---------------------------------------------------------------------*/

  /**
    * Gets the origin URL
    * @returns {String} The origin URL
    */
  getOriginURL: function getOriginURL() {
    return this._originURL;
  },

  /*---------------------------------------------------------------------*/

  /**
    * Gets the webapp URL
    * @returns {String} The webapp URL
    */
  getWebAppURL: function getWebAppURL() {
    return this._webAppURL;
  },

  /*---------------------------------------------------------------------*/

  /**
    * Gets the anchor part of the webapp URL
    * @returns {String} The anchor part of the webapp URL
    */
  getHash: function getHash() {
    return this._hash;
  },

  /*---------------------------------------------------------------------*/

  /**
    * Gets the arguments extracted from the webapp URL
    * @returns {Array<String>} The arguments extracted from the webapp URL
    */
  getArgs: function getArgs() {
    return this._args;
  },

  /*---------------------------------------------------------------------*/

  /**
    * Appends a routing rule
    * @param {String} regExp the regExp
    * @param {Object} handler the handler
    * @returns {Namespace} The amiRouter singleton
    */
  append: function append(regExp, handler) {
    this._routes.unshift({
      regExp: regExp,
      handler: handler
    });

    return this;
  },

  /*---------------------------------------------------------------------*/

  /**
    * Removes some routing rules
    * @param {String} regExp the regExp
    * @returns {Namespace} The amiRouter singleton
    */
  remove: function remove(regExp) {
    this._routes = this._routes.filter(function (route) {
      return route.regExp.toString() !== regExp.toString();
    });
    return this;
  },

  /*---------------------------------------------------------------------*/

  /**
    * Checks whether the URL matches with a routing rule
    * @returns {Boolean}
    */
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

  /*---------------------------------------------------------------------*/

  /**
    * Append a new history entry
    * @param {String} path the new path
    * @param {Object} [context=null] the new context
    * @returns {Boolean}
    */
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

  /*---------------------------------------------------------------------*/

  /**
    * Replace the current history entry
    * @param {String} path the new path
    * @param {Object} [context=null] the new context
    * @returns {Boolean}
    */
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
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------*/

/* ami                                                                     */

/*-------------------------------------------------------------------------*/

$AMINamespace('ami', {
  version: '0.0.1',
  commit_id: '{{AMI_COMMIT_ID}}'
});
/*-------------------------------------------------------------------------*/

/* INTERNAL FUNCTIONS                                                      */

/*-------------------------------------------------------------------------*/

function _ami_internal_then(deferred, doneFunc, failFunc) {
  if (deferred && deferred.then) {
    deferred.then(doneFunc, failFunc);
  } else {
    doneFunc();
  }
}
/*-------------------------------------------------------------------------*/


function _ami_internal_always(deferred, alwaysFunc) {
  if (deferred && deferred.always) {
    deferred.always(alwaysFunc);
  } else {
    alwaysFunc();
  }
}
/*-------------------------------------------------------------------------*/

/* amiWebApp                                                               */

/*-------------------------------------------------------------------------*/

/**
 * The AMI webapp subsystem
 * @namespace amiWebApp
 */


$AMINamespace('amiWebApp',
/** @lends amiWebApp */
{
  /*---------------------------------------------------------------------*/

  /* PRIVATE MEMBERS                                                     */

  /*---------------------------------------------------------------------*/
  _idRegExp: new RegExp('[a-zA-Z][a-zA-Z0-9]{7}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{12}', 'g'),
  _linkExp: new RegExp('\\[([^\\]]*)\\]\\(([^\\)]*)\\)', 'g'),

  /*---------------------------------------------------------------------*/
  _embedded: false,
  _noBootstrap: false,
  _noDateTimePicker: false,
  _noSelect2: false,

  /*---------------------------------------------------------------------*/
  _globalDeferred: $.Deferred(),

  /*---------------------------------------------------------------------*/
  _sheets: [],
  _scripts: [],
  _controls: {},
  _subapps: {},
  _isReady: false,
  _canLeave: true,
  _lockCnt: 0x00,

  /*---------------------------------------------------------------------*/
  _currentSubAppInstance: new function () {
    this.onReady = function () {};

    this.onExit = function () {};

    this.onLogin = function () {};

    this.onLogout = function () {};
  }(),

  /*---------------------------------------------------------------------*/

  /* PUBLIC MEMBERS                                                      */

  /*---------------------------------------------------------------------*/

  /**
    * The origin URL
    * @type {String}
    */
  originURL: '/',

  /**
    * The webapp URL
    * @type {String}
    */
  webAppURL: '/',

  /**
    * The anchor part of the webapp URL
    * @type {String}
    */
  hash: '',

  /**
    * The arguments extracted from the webapp URL
    * @type {Array<String>}
    */
  args: {},

  /*---------------------------------------------------------------------*/

  /* STATIC CONSTRUCTOR                                                  */

  /*---------------------------------------------------------------------*/
  $: function $() {
    var _this3 = this;

    /*-----------------------------------------------------------------*/

    /* GET FLAGS                                                       */

    /*-----------------------------------------------------------------*/
    var url = amiRouter.getScriptURL();
    var idx = url.indexOf('?');

    if (idx > 0) {
      /*-------------------------------------------------------------*/
      var flags = url.substring(idx).toLowerCase();
      /*-------------------------------------------------------------*/

      this._embedded = flags.indexOf('embedded') >= 0;
      this._noBootstrap = flags.indexOf('nobootstrap') >= 0;
      this._noDateTimePicker = flags.indexOf('nodatetimepicker') >= 0;
      this._noSelect2 = flags.indexOf('noselect2') >= 0;
      /*-------------------------------------------------------------*/
    }
    /*-----------------------------------------------------------------*/

    /* GET URLS, HASH AND ARGS                                         */

    /*-----------------------------------------------------------------*/


    this.originURL = amiRouter.getOriginURL();
    this.webAppURL = amiRouter.getWebAppURL();
    this.hash = amiRouter.getHash();
    this.args = amiRouter.getArgs();
    /*-----------------------------------------------------------------*/

    /* LOAD SHEETS AND SCRIPTS                                         */

    /*-----------------------------------------------------------------*/

    var resourcesCSS = [];
    var resourcesJS = [];
    /*-----------------------------------------------------------------*/

    if (!window.Popper) {
      resourcesJS.push(this.originURL + '/js/popper.min.js');
    }

    if (!window.moment) {
      resourcesJS.push(this.originURL + '/js/moment.min.js');
    }
    /*-----------------------------------------------------------------*/


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
    /*-----------------------------------------------------------------*/


    this.loadResources([].concat(resourcesCSS, [this.originURL + '/css/font-awesome.min.css', this.originURL + '/css/ami.min.css'], resourcesJS)).done(function ()
    /*---*/
    {
      _this3._globalDeferred.resolve();
    }).fail(function (message) {
      _this3._globalDeferred.reject(message);
    });
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/

  /* MODE                                                                */

  /*---------------------------------------------------------------------*/

  /**
    * Checks whether the WebApp is executed in embedded mode
    * @returns {Boolean}
    */
  isEmbedded: function isEmbedded() {
    return this._embedded;
  },

  /*---------------------------------------------------------------------*/

  /**
    * Checks whether the WebApp is executed locally (file://, localhost, 127.0.0.1 or ::1)
    * @returns {Boolean}
    */
  isLocal: function isLocal() {
    return document.location.protocol === 'file:' || document.location.hostname === 'localhost' || document.location.hostname === '127.0.0.1' || document.location.hostname === '::1';
  },

  /*---------------------------------------------------------------------*/

  /* TOOLS                                                               */

  /*---------------------------------------------------------------------*/
  typeOf: function typeOf(x) {
    var name = Object.prototype.toString.call(x);
    return name.startsWith('[object ') ? name.substring(8, name.length - 1) : '';
  },

  /*---------------------------------------------------------------------*/
  asArray: function asArray(x) {
    return this.typeOf(x) === 'Array' ? x : [x];
  },

  /*---------------------------------------------------------------------*/
  setup: function setup(optionNames, optionDefaults, settings) {
    var result = [];
    /*-----------------------------------------------------------------*/

    var l = optionNames.length;
    var m = optionDefaults.length;

    if (l !== m) {
      throw 'internal error';
    }
    /*-----------------------------------------------------------------*/


    if (settings) {
      for (var i = 0; i < l; i++) {
        result.push(optionNames[i] in settings ? settings[optionNames[i]] : optionDefaults[i]);
      }
    } else {
      for (var _i9 = 0; _i9 < l; _i9++) {
        result.push(
        /*---------------------------------------------------*/
        optionDefaults[_i9]);
      }
    }
    /*-----------------------------------------------------------------*/


    return result;
  },

  /*---------------------------------------------------------------------*/
  replace: amiTwig.stdlib._replace,

  /*---------------------------------------------------------------------*/
  _textToHtmlX: ['&', '"', '<', '>'],
  _textToHtmlY: ['&amp;', '&quot;', '&lt;', '&gt;'],

  /**
    * Escapes the given string from text to HTML
    * @param {String} string the unescaped string
    * @returns {String} The escaped string
    */
  textToHtml: function textToHtml(s) {
    return this.replace(s || '', this._textToHtmlX, this._textToHtmlY);
  },

  /**
    * Unescapes the given string from HTML to text
    * @param {String} string the escaped string
    * @returns {String} The unescaped string
    */
  htmlToText: function htmlToText(s) {
    return this.replace(s || '', this._textToHtmlY, this._textToHtmlX);
  },

  /*---------------------------------------------------------------------*/
  _textToStringX: ['\\', '\n', '"', '\''],
  _textToStringY: ['\\\\', '\\n', '\\"', '\\\''],

  /**
    * Escapes the given string from text to JavaScript string
    * @param {String} string the unescaped string
    * @returns {String} The escaped string
    */
  textToString: function textToString(s) {
    return this.replace(s || '', this._textToStringX, this._textToStringY);
  },

  /**
    * Unescapes the given string from JavaScript string to text
    * @param {String} string the escaped string
    * @returns {String} The unescaped string
    */
  stringToText: function stringToText(s) {
    return this.replace(s || '', this._textToStringY, this._textToStringX);
  },

  /*---------------------------------------------------------------------*/
  _htmlToStringX: ['\\', '\n', '&quot;', '\''],
  _htmlToStringY: ['\\\\', '\\n', '\\&quot;', '\\\''],

  /**
    * Escapes the given string from HTML to JavaScript string
    * @param {String} string the unescaped string
    * @returns {String} The escaped string
    */
  htmlToString: function htmlToString(s) {
    return this.replace(s || '', this._htmlToStringX, this._htmlToStringY);
  },

  /**
    * Unescapes the given string from JavaScript string to HTML
    * @param {String} string the escaped string
    * @returns {String} The unescaped string
    */
  stringToHtml: function stringToHtml(s) {
    return this.replace(s || '', this._htmlToStringY, this._htmlToStringX);
  },

  /*---------------------------------------------------------------------*/
  _textToSQLX: ['\''],
  _textToSQLY: ['\'\''],

  /**
    * Escapes the given string from text to SQL
    * @param {String} string the unescaped string
    * @returns {String} The escaped string
    */
  textToSQL: function textToSQL(s) {
    return this.replace(s || '', this._textToSQLX, this._textToSQLY);
  },

  /**
    * Unescapes the given string from SQL to text
    * @param {String} string the escaped string
    * @returns {String} The unescaped string
    */
  sqlToText: function sqlToText(s) {
    return this.replace(s || '', this._textToSQLY, this._textToSQLX);
  },

  /*---------------------------------------------------------------------*/

  /* BASE64                                                              */

  /*---------------------------------------------------------------------*/
  _base64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',

  /*---------------------------------------------------------------------*/

  /**
    * Encodes (RFC 4648) a string
    * @param {String} string the decoded string
    * @returns {String} The encoded string
    */
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
    /**/


    if (m === 1) {
      e.splice(-2, 2);
    } else if (m === 2) {
      e.splice(-1, 1);
    }

    return e.join('');
  },

  /*---------------------------------------------------------------------*/

  /**
    * Decodes (RFC 4648) a string
    * @param {String} string the encoded string
    * @returns {String} The decoded string
    */
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
    /**/


    if (m === 2) {
      e.splice(-2, 2);
    } else if (m === 3) {
      e.splice(-1, 1);
    }

    return e.join('');
  },

  /*---------------------------------------------------------------------*/

  /* DYNAMIC RESOURCE LOADING                                            */

  /*---------------------------------------------------------------------*/
  _getExtension: function _getExtension(url) {
    var idx = url.lastIndexOf('.');
    return idx > 0 ? url.substring(idx) : '';
  },

  /*---------------------------------------------------------------------*/
  _getDataType: function _getDataType(url, dataType) {
    var result;

    if (dataType === 'auto') {
      /**/
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

  /*---------------------------------------------------------------------*/
  __loadXXX: function __loadXXX(deferred, result, urls, dataType, context) {
    var _this4 = this;

    if (urls.length === 0) {
      return deferred.resolveWith(context, [result]);
    }
    /*-----------------------------------------------------------------*/


    var url = urls.shift().trim();
    /*-----------------------------------------------------------------*/

    var dataTYPE = this._getDataType(url, dataType);
    /*-----------------------------------------------------------------*/


    switch (dataTYPE) {
      /*-------------------------------------------------------------*/

      /* CONTROL                                                     */

      /*-------------------------------------------------------------*/
      case 'control':
        this.loadControl(url).then(function (data) {
          result.push(data);

          _this4.__loadXXX(deferred, result, urls, dataType, context);
        }, function (message) {
          deferred.rejectWith(context, [message]);
        });
        break;

      /*-------------------------------------------------------------*/

      /* SUBAPP                                                      */

      /*-------------------------------------------------------------*/

      case 'subapp':
        this.loadSubApp(url).then(function (data) {
          result.push(data);

          _this4.__loadXXX(deferred, result, urls, dataType, context);
        }, function (message) {
          deferred.rejectWith(context, [message]);
        });
        break;

      /*-------------------------------------------------------------*/

      /* SHEET                                                       */

      /*-------------------------------------------------------------*/

      case 'sheet':
        if (this._sheets.indexOf(url) >= 0) {
          result.push(false);

          this.__loadXXX(deferred, result, urls, dataType, context);
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

            _this4.__loadXXX(deferred, result, urls, dataType, context);
          }, function () {
            deferred.rejectWith(context, ['could not load `' + url + '`']);
          });
        }

        break;

      /*-------------------------------------------------------------*/

      /* SCRIPT                                                      */

      /*-------------------------------------------------------------*/

      case 'script':
        if (this._scripts.indexOf(url) >= 0) {
          result.push(false);

          this.__loadXXX(deferred, result, urls, dataType, context);
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

            _this4.__loadXXX(deferred, result, urls, dataType, context);
          }, function () {
            deferred.rejectWith(context, ['could not load `' + url + '`']);
          });
        }

        break;

      /*-------------------------------------------------------------*/

      /* OTHER                                                       */

      /*-------------------------------------------------------------*/

      default:
        $.ajax({
          url: url,
          async: true,
          cache: false,
          crossDomain: true,
          dataType: dataTYPE
        }).then(function (data) {
          result.push(data);

          _this4.__loadXXX(deferred, result, urls, dataType, context);
        }, function () {
          deferred.rejectWith(context, ['could not load `' + url + '`']);
        });
        break;

      /*-------------------------------------------------------------*/
    }
    /*-----------------------------------------------------------------*/

  },

  /*---------------------------------------------------------------------*/
  _loadXXX: function _loadXXX(urls, dataType, settings) {
    var deferred = $.Deferred();

    var _this$setup = this.setup(['context'], [deferred], settings),
        context = _this$setup[0];
    /*-----------------------------------------------------------------*/


    this.__loadXXX(deferred, [], this.asArray(urls), dataType, context);
    /*-----------------------------------------------------------------*/


    return deferred.promise();
  },

  /*---------------------------------------------------------------------*/

  /**
    * Asynchronously loads resources by extension
    * @param {(Array|String)} urls the array of urls
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  loadResources: function loadResources(urls, settings) {
    return this._loadXXX(urls, 'auto', settings);
  },

  /*---------------------------------------------------------------------*/

  /**
    * Asynchronously loads CSS sheets
    * @param {(Array|String)} urls the array of urls
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  loadSheets: function loadSheets(urls, settings) {
    return this._loadXXX(urls, 'sheet', settings);
  },

  /*---------------------------------------------------------------------*/

  /**
    * Asynchronously loads JS scripts
    * @param {(Array|String)} urls the array of urls
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  loadScripts: function loadScripts(urls, settings) {
    return this._loadXXX(urls, 'script', settings);
  },

  /*---------------------------------------------------------------------*/

  /**
    * Asynchronously loads JSON files
    * @param {(Array|String)} urls the array of urls
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  loadJSONs: function loadJSONs(urls, settings) {
    return this._loadXXX(urls, 'json', settings);
  },

  /*---------------------------------------------------------------------*/

  /**
    * Asynchronously loads XML files
    * @param {(Array|String)} urls the array of urls
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  loadXMLs: function loadXMLs(urls, settings) {
    return this._loadXXX(urls, 'xml', settings);
  },

  /*---------------------------------------------------------------------*/

  /**
    * Asynchronously loads HTML files
    * @param {(Array|String)} urls the array of urls
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  loadHTMLs: function loadHTMLs(urls, settings) {
    return this._loadXXX(urls, 'text', settings);
  },

  /*---------------------------------------------------------------------*/

  /**
    * Asynchronously loads TWIG files
    * @param {(Array|String)} urls the array of urls
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  loadTWIGs: function loadTWIGs(urls, settings) {
    return this._loadXXX(urls, 'text', settings);
  },

  /*---------------------------------------------------------------------*/

  /**
    * Asynchronously loads text files
    * @param {(Array|String)} urls the array of urls
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  loadTexts: function loadTexts(urls, settings) {
    return this._loadXXX(urls, 'text', settings);
  },

  /*---------------------------------------------------------------------*/

  /* HTML CONTENT                                                        */

  /*---------------------------------------------------------------------*/
  _xxxHTML: function _xxxHTML(selector, twig, mode, settings) {
    var result = $.Deferred();

    var _this$setup2 = this.setup(['context', 'suffix', 'dict'], [result, null, null], settings),
        context = _this$setup2[0],
        suffix = _this$setup2[1],
        dict = _this$setup2[2];
    /*-----------------------------------------------------------------*/


    if (suffix) {
      twig = twig.replace(this._idRegExp, function (id) {
        return id + '_instance' + suffix;
      });
    }

    var html = this.formatTWIG(twig, dict);
    /*-----------------------------------------------------------------*/

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
    /*-----------------------------------------------------------------*/


    promise.done(function () {
      /*-------------------------------------------------------------*/
      var el = $(selector);
      /*-------------------------------------------------------------*/

      var _find = mode === 3 ? function (_selector) {
        return el.findWithSelf(_selector);
      } : function (_selector) {
        return el.find(_selector);
      };
      /*-------------------------------------------------------------*/


      if (jQuery.fn.tooltip) {
        _find('[data-toggle="tooltip"]').tooltip({
          html: false,
          delay: {
            show: 500,
            hide: 100
          }
        });
      }
      /*-------------------------------------------------------------*/


      if (jQuery.fn.popover) {
        _find('[data-toggle="popover"]').popover({
          html: true,
          delay: {
            show: 500,
            hide: 100
          }
        });
      }
      /*-------------------------------------------------------------*/


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
      /*-------------------------------------------------------------*/


      result.resolveWith(context, [el]);
      /*-------------------------------------------------------------*/
    });
    /*-----------------------------------------------------------------*/

    return result.promise();
  },

  /*---------------------------------------------------------------------*/

  /**
    * Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
    * @param {String} selector the target selector
    * @param {String} twig the TWIG fragment
    * @param {Object} [settings] dictionary of settings (context, dict)
    * @returns {$.Deferred} A JQuery deferred object
    */
  replaceHTML: function replaceHTML(selector, twig, settings) {
    return this._xxxHTML(selector, twig, 0, settings);
  },

  /*---------------------------------------------------------------------*/

  /**
    * Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
    * @param {String} selector the target selector
    * @param {String} twig the TWIG fragment
    * @param {Object} [settings] dictionary of settings (context, dict)
    * @returns {$.Deferred} A JQuery deferred object
    */
  prependHTML: function prependHTML(selector, twig, settings) {
    return this._xxxHTML(selector, twig, 1, settings);
  },

  /*---------------------------------------------------------------------*/

  /**
    * Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
    * @param {String} selector the target selector
    * @param {String} twig the TWIG fragment
    * @param {Object} [settings] dictionary of settings (context, dict)
    * @returns {$.Deferred} A JQuery deferred object
    */
  appendHTML: function appendHTML(selector, twig, settings) {
    return this._xxxHTML(selector, twig, 2, settings);
  },

  /*---------------------------------------------------------------------*/

  /**
    * Interpretes the given TWIG string, see {@link http://twig.sensiolabs.org/documentation}
    * @param {String} twig the TWIG string
    * @param {Object|Array} [dict] the dictionary
    * @returns {String} The Interpreted TWIG string
    */
  formatTWIG: function formatTWIG(twig, dict) {
    var _this5 = this;

    var result = [];
    /*-----------------------------------------------------------------*/

    var render = function render(twig, dict) {
      if (_this5.typeOf(dict) !== 'Object') {
        dict = {};
      }

      dict['ORIGIN_URL'] = _this5.originURL;
      dict['WEBAPP_URL'] = _this5.webAppURL;
      return amiTwig.engine.render(twig, dict);
    };
    /*-----------------------------------------------------------------*/


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
    /*-----------------------------------------------------------------*/


    return result.join('');
  },

  /*---------------------------------------------------------------------*/

  /* JSPATH                                                              */

  /*---------------------------------------------------------------------*/

  /**
    * Finds data within the given JSON, see {@link https://github.com/dfilatov/jspath}
    * @param {String} path the path
    * @param {Object} json the JSON
    * @returns {Array} The resulting array
    */
  jspath: function jspath(path, json) {
    return JSPath.apply(path, json);
  },

  /*---------------------------------------------------------------------*/

  /* STACK                                                               */

  /*---------------------------------------------------------------------*/
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

  /*---------------------------------------------------------------------*/

  /* LOCK                                                                */

  /*---------------------------------------------------------------------*/

  /**
    * Locks the Web application
    */
  lock: function lock() {
    var lines = this.getStack().split('\n');

    if (lines.length > 2) {
      console.log('lock[' + this._lockCnt + '] :: ' + lines[2]); // eslint-disable-line no-console
    }
    /**/


    if (this._lockCnt <= 0) {
      $('#ami_locker').css('display', 'flex');
      this._lockCnt = 1;
    } else {
      this._lockCnt++;
    }
  },

  /*---------------------------------------------------------------------*/

  /**
    * Unlocks the Web application
    */
  unlock: function unlock() {
    if (this._lockCnt <= 1) {
      $('#ami_locker').css('display', 'none');
      this._lockCnt = 0;
    } else {
      this._lockCnt--;
    }
    /**/


    var lines = this.getStack().split('\n');

    if (lines.length > 2) {
      console.log('unlock[' + this._lockCnt + '] :: ' + lines[2]); // eslint-disable-line no-console
    }
  },

  /*---------------------------------------------------------------------*/

  /**
    * Enables the message in a confirmation dialog box to inform that the user is about to leave the current page.
    */
  canLeave: function canLeave() {
    this._canLeave = true;
  },

  /*---------------------------------------------------------------------*/

  /**
    * Disables the message in a confirmation dialog box to inform that the user is about to leave the current page.
    */
  cannotLeave: function cannotLeave() {
    this._canLeave = false;
  },

  /*---------------------------------------------------------------------*/

  /* MESSAGES                                                            */

  /*---------------------------------------------------------------------*/
  _publishAlert: function _publishAlert(clazz, title, message, fadeOut) {
    var _this6 = this;

    /*-----------------------------------------------------------------*/
    console.log('AMI ' + title.toUpperCase() + ': ' + message + '\n' + this.getStack()); // eslint-disable-line no-console

    /*-----------------------------------------------------------------*/

    var html = '<div class="toast" role="alert" ' + (fadeOut ? 'data-delay="60000"' : 'data-autohide="false"') + '><div class="toast-header"><strong class="mr-auto ' + clazz + '">' + title + '</strong><small>' + this.textToHtml(window.moment().format('DD MMM, HH:mm:ss')) + '</small><button type="button" class="ml-2 mb-1 close" data-dismiss="toast"><span>&times;</span></button></div><div class="toast-body">' + this.textToHtml(message) + '</div></div>';
    /*-----------------------------------------------------------------*/

    var el = $('#ami_alert_content');
    el.append(html.replace(this._linkExp, '<a href="$1" target="_blank">$2</a>')).promise().done(function () {
      el.find('.toast:last-child').toast('show');
      $(document).scrollTop(0);

      _this6.unlock();
    });
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/

  /**
    * Shows an 'info' message
    * @param {String|Array} message the message
    * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
    */
  info: function info(message, fadeOut) {
    if (this.typeOf(message) === 'Array') {
      message = message.join('. ');
    }

    this._publishAlert('text-info', 'Info', message, fadeOut);
  },

  /*---------------------------------------------------------------------*/

  /**
    * Shows a 'success' message
    * @param {String|Array} message the message
    * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
    */
  success: function success(message, fadeOut) {
    if (this.typeOf(message) === 'Array') {
      message = message.join('. ');
    }

    this._publishAlert('text-success', 'Success', message, fadeOut);
  },

  /*---------------------------------------------------------------------*/

  /**
    * Shows a 'warning' message
    * @param {String|Array} message the message
    * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
    */
  warning: function warning(message, fadeOut) {
    if (this.typeOf(message) === 'Array') {
      message = message.join('. ');
    }

    this._publishAlert('text-warning', 'Warning', message, fadeOut);
  },

  /*---------------------------------------------------------------------*/

  /**
    * Shows an 'error' message
    * @param {String|Array} message the message
    * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
    */
  error: function error(message, fadeOut) {
    if (this.typeOf(message) === 'Array') {
      message = message.join('. ');
    }

    this._publishAlert('text-danger', 'Error', message, fadeOut);
  },

  /*---------------------------------------------------------------------*/

  /**
    * Flushes messages
    */
  flush: function flush() {
    $('#ami_alert_content').empty();
  },

  /*---------------------------------------------------------------------*/

  /* BREADCRUMB                                                          */

  /*---------------------------------------------------------------------*/

  /**
    * Fill the main breadcrumb
    * @param {Array} items the array of items (HTML format)
    */
  fillBreadcrumb: function fillBreadcrumb(items) {
    var _this7 = this;

    var s = this.typeOf(items) === 'Array' ? items.map(function (item) {
      return '<li class="breadcrumb-item">' + item.replace(/{{WEBAPP_URL}}/g, _this7.webAppURL) + '</li>';
    }).join('') : '';
    $('#ami_breadcrumb_content').html(s);
  },

  /*---------------------------------------------------------------------*/

  /* WEB APPLICATION                                                     */

  /*---------------------------------------------------------------------*/

  /**
    * This method must be overloaded and is called when the Web application starts
    * @event amiWebApp#onReady
    * @param {String} userData
    */
  onReady: function onReady() {
    if (!this._embedded) {
      alert('error: `amiWebApp.onReady()` must be overloaded!'); // eslint-disable-line no-alert
    }
  },

  /*---------------------------------------------------------------------*/

  /**
    * This method must be overloaded and is called when the toolbar needs to be updated
    * @event amiWebApp#onRefresh
    * @param {Boolean} isAuth
    */
  onRefresh: function onRefresh() {
    if (!this._embedded) {
      alert('error: `amiWebApp.onRefresh()` must be overloaded!'); // eslint-disable-line no-alert
    }
  },

  /*---------------------------------------------------------------------*/

  /**
    * Starts the Web application
    * @param {Object} [settings] dictionary of settings (logo_url, home_url, contact_email, about_url, theme_url, locker_url, change_passord_allowed, change_info_allowed, change_passord_allowed)
    */
  start: function start(settings) {
    var _this8 = this;

    this._globalDeferred.done(function () {
      /*-------------------------------------------------------------*/
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
      /*-------------------------------------------------------------*/


      amiCommand.endpoint = endpointURL;
      /*-------------------------------------------------------------*/

      window.onbeforeunload = function (e) {
        if (!_this8._canLeave) {
          var f = e || window.event;

          if (f) {
            f.returnValue = 'Confirm that you want to leave this page?';
          }

          return 'Confirm that you want to leave this page?';
        }
      };
      /*-------------------------------------------------------------*/


      var controlsURL = _this8.originURL + '/controls/CONTROLS.json';
      var subappsURL = _this8.originURL + '/subapps/SUBAPPS.json';
      /*-------------------------------------------------------------*/

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
            /*-------------------------------------------------*/
            var dict = {
              LOGO_URL: logoURL,
              HOME_URL: homeURL,
              CONTACT_EMAIL: contactEmail,
              ABOUT_URL: aboutURL
            };
            /*-------------------------------------------------*/

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
                alert('could not open `' + lockerURL + '`, please reload the page...'); // eslint-disable-line no-alert
              });
            }, function () {
              alert('could not open `' + themeURL + '`, please reload the page...'); // eslint-disable-line no-alert
            });
            /*-------------------------------------------------*/
          } else {
            /*-------------------------------------------------*/
            var data3 = '';

            if ($('#ami_alert_content').length === 0) {
              data3 += '<div id="ami_alert_content"></div>';
            }

            if ($('#ami_login_menu_content').length === 0) {
              data3 += '<div id="ami_login_menu_content"></div>';
            }
            /*-------------------------------------------------*/


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
            /*-------------------------------------------------*/
          }
        }, function () {
          alert('could not open `' + subappsURL + '`, please reload the page...'); // eslint-disable-line no-alert
        });
      }, function () {
        alert('could not open `' + controlsURL + '`, please reload the page...'); // eslint-disable-line no-alert
      });
      /*-------------------------------------------------------------*/
    }).fail(function (message) {
      alert(message); // eslint-disable-line no-alert
    });
  },

  /*---------------------------------------------------------------------*/

  /* CONTROLS                                                            */

  /*---------------------------------------------------------------------*/

  /**
    * Asynchronously loads a control
    * @param {String} control the array of control name
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  loadControl: function loadControl(control, settings) {
    var result = $.Deferred();

    var _this$setup3 = this.setup(['context'], [result], settings),
        context = _this$setup3[0];
    /*-----------------------------------------------------------------*/


    if (control.indexOf('ctrl:') === 0) {
      control = control.substring(5);
    }

    var descr = this._controls[control.toLowerCase()];
    /*-----------------------------------------------------------------*/


    if (descr) {
      this.loadScripts(this.originURL + '/' + descr.file).then(function (loaded) {
        try {
          var clazz = window[descr.clazz];
          var promise = loaded[0] ? clazz.prototype.onReady.apply(clazz.prototype) :
          /*----------------*/
          null
          /*----------------*/
          ;

          _ami_internal_then(promise, function () {
            result.resolveWith(context, [
            /*--------------------*/
            clazz
            /*--------------------*/
            ]);
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
    /*-----------------------------------------------------------------*/


    return result.promise();
  },

  /*---------------------------------------------------------------------*/

  /**
    * Asynchronously create a control
    * @param {Object} [parent] ???
    * @param {Object} [owner] ???
    * @param {String} control ???
    * @param {Array} params ???
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  createControl: function createControl(parent, owner, control, params, settings) {
    var result = $.Deferred();

    var _this$setup4 = this.setup(['context'], [result], settings),
        context = _this$setup4[0];
    /*-----------------------------------------------------------------*/


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
    /*-----------------------------------------------------------------*/

    return result.promise();
  },

  /*---------------------------------------------------------------------*/

  /**
    * Asynchronously create a control in a container
    * @param {Object} [parent] ???
    * @param {Object} [owner] ???
    * @param {String} control ???
    * @param {Array} paramsWithoutSettings ???
    * @param {Object} controlSettings ???
    * @param {Object} parentSettings ???
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  createControlInBody: function createControlInBody(parent, owner, control, controlParamsWithoutSettings, controlSettings, parentSettings, settings) {
    var result = $.Deferred();

    var _this$setup5 = this.setup(['context'], [result], settings),
        context = _this$setup5[0];
    /*-----------------------------------------------------------------*/


    try {
      var PARAMS = [];
      var SETTINGS = {};
      /*-------------------------------------------------------------*/

      for (var key in parentSettings) {
        SETTINGS[key] = parentSettings[key];
      }

      for (var _key in controlSettings) {
        SETTINGS[_key] = controlSettings[_key];
      }
      /*-------------------------------------------------------------*/
      //////.push(selector);


      Array.prototype.push.apply(PARAMS, controlParamsWithoutSettings);
      PARAMS.push(SETTINGS);
      /*-------------------------------------------------------------*/

      this.createControl(parent, owner, control, PARAMS).done(function () {
        result.resolveWith(context, Array.prototype.slice.call(arguments));
      }).fail(function (message) {
        result.rejectWith(context, [message]);
      });
      /*-------------------------------------------------------------*/
    } catch (message) {
      result.rejectWith(context, [message]);
    }
    /*-----------------------------------------------------------------*/


    return result.promise();
  },

  /*---------------------------------------------------------------------*/

  /**
    * Asynchronously create a control in a container
    * @param {Object} [parent] ???
    * @param {Object} [owner] ???
    * @param {String} control ???
    * @param {Array} paramsWithoutSettings ???
    * @param {Object} controlSettings ???
    * @param {Object} parentSettings ???
    * @param {String} icon ???
    * @param {String} title ???
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  createControlInContainer: function createControlInContainer(parent, owner, control, controlParamsWithoutSettings, controlSettings, parentSettings, icon, title, settings) {
    var _this9 = this;

    var result = $.Deferred();

    var _this$setup6 = this.setup(['context'], [result], settings),
        context = _this$setup6[0];
    /*-----------------------------------------------------------------*/


    try {
      parent.appendItem('<i class="fa fa-' + this.textToHtml(icon) + '"></i> ' + this.textToHtml(title)).done(function (selector) {
        var PARAMS = [];
        var SETTINGS = {};
        /*---------------------------------------------------------*/

        for (var key in parentSettings) {
          SETTINGS[key] = parentSettings[key];
        }

        for (var _key2 in controlSettings) {
          SETTINGS[_key2] = controlSettings[_key2];
        }
        /*---------------------------------------------------------*/


        PARAMS.push(selector);
        Array.prototype.push.apply(PARAMS, controlParamsWithoutSettings);
        PARAMS.push(SETTINGS);
        /*---------------------------------------------------------*/

        _this9.createControl(parent, owner, control, PARAMS).done(function () {
          result.resolveWith(context, Array.prototype.slice.call(arguments));
        }).fail(function (message) {
          result.rejectWith(context, [message]);
        });
        /*---------------------------------------------------------*/

      });
    } catch (message) {
      result.rejectWith(context, [message]);
    }
    /*-----------------------------------------------------------------*/


    return result.promise();
  },

  /*---------------------------------------------------------------------*/

  /**
    * Asynchronously create a control in a container from a WEB link
    * @param {Object} [parent] ???
    * @param {Object} [owner] ???
    * @param {String} el ???
    * @param {Object} parentSettings ???
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  createControlFromWebLink: function createControlFromWebLink(parent, owner, el, parentSettings, settings) {
    var _this10 = this;

    /*-----------------------------------------------------------------*/
    var dataCtrl = el.hasAttribute('data-ctrl') ? el.getAttribute('data-ctrl') : '';
    var dataCtrlLocation = el.hasAttribute('data-ctrl-location') ? el.getAttribute('data-ctrl-location') : '';
    /*-----------------------------------------------------------------*/

    var dataParams = el.hasAttribute('data-params') ? JSON.parse(el.getAttribute('data-params')) : [];
    var dataSettings = el.hasAttribute('data-settings') ? JSON.parse(el.getAttribute('data-settings')) : {};
    /*-----------------------------------------------------------------*/

    var dataIcon = el.hasAttribute('data-icon') ? el.getAttribute('data-icon') : 'question';
    var dataTitle = el.hasAttribute('data-title') ? el.getAttribute('data-title') : 'Unknown';
    /*-----------------------------------------------------------------*/

    this.lock();
    /**/

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
    /*-----------------------------------------------------------------*/

  },

  /*---------------------------------------------------------------------*/

  /* SUBAPPS                                                             */

  /*---------------------------------------------------------------------*/
  triggerLogin: function triggerLogin() {
    var _this11 = this;

    var result = $.Deferred();
    /*-----------------------------------------------------------------*/

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
    /*-----------------------------------------------------------------*/


    return result.promise();
  },

  /*---------------------------------------------------------------------*/
  triggerLogout: function triggerLogout() {
    var _this12 = this;

    var result = $.Deferred();
    /*-----------------------------------------------------------------*/

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
    /*-----------------------------------------------------------------*/


    return result.promise();
  },

  /*---------------------------------------------------------------------*/

  /**
    * Asynchronously loads a subapp
    * @param {String} subapp the subapp
    * @param {?} [userdata] the user data
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  loadSubApp: function loadSubApp(subapp, userdata, settings) {
    var _this13 = this;

    var result = $.Deferred();

    var _this$setup7 = this.setup(['context'], [result], settings),
        context = _this$setup7[0];
    /*-----------------------------------------------------------------*/


    this.lock();
    result.always(function () {
      _this13.unlock();
    });
    /*-----------------------------------------------------------------*/

    if (subapp.indexOf('subapp:') === 0) {
      subapp = subapp.substring(7);
    }

    var descr = this._subapps[subapp.toLowerCase()];
    /*-----------------------------------------------------------------*/


    if (descr) {
      this.loadScripts(this.originURL + '/' + descr.file).then(function (loaded) {
        try {
          _this13._currentSubAppInstance.onExit(userdata);

          var instance = window[descr.instance];
          _this13._currentSubAppInstance = instance;
          /**/

          _this13.fillBreadcrumb(descr.breadcrumb);

          var promise = loaded[0] ? instance.onReady(userdata) :
          /*------*/
          null
          /*------*/
          ;

          _ami_internal_then(promise, function () {
            var promise = amiLogin.isAuthenticated() ? _this13.triggerLogin() : _this13.triggerLogout();
            promise.then(function () {
              result.resolveWith(context, [
              /*------------------*/
              instance
              /*------------------*/
              ]);
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
    /*-----------------------------------------------------------------*/


    return result.promise();
  },

  /*---------------------------------------------------------------------*/

  /**
    * Loads a subapp by URL
    * @param {String} defaultSubApp if 'amiWebApp.args["subapp"]' is null, the default subapp
    * @param {?} [defaultUserData] if 'amiWebApp.args["userdata"]' is null, the default user data
    * @returns {$.Deferred} A JQuery deferred object
    */
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
          json = {
            /* EMPTY JSON   EMPTY JSON   EMPTY JSON   EMPTY JSON   EMPTY JSON */
          };
        }
        /*---------------------------------------------------------*/


        var subapp = json['subapp'] || defaultSubApp;
        var userdata = json['userdata'] || defaultUserData;

        _this14.loadSubApp(subapp, userdata).then(function () {
          result.resolve();
        }, function (message) {
          result.reject(message);
        });
        /*---------------------------------------------------------*/

      });
    } else {
      if (!amiRouter.check()) {
        /*---------------------------------------------------------*/
        var subapp = this.args['subapp'] || defaultSubApp;
        var userdata = this.args['userdata'] || defaultUserData;
        this.loadSubApp(subapp, userdata).then(function () {
          result.resolve();
        }, function (message) {
          result.reject(message);
        });
        /*---------------------------------------------------------*/
      }
    }

    return result.promise();
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------*/

/* ami.IControl                                                            */

/*-------------------------------------------------------------------------*/

/**
 * The AMI control interface
 * @interface ami.IControl
 */

$AMIInterface('ami.IControl',
/** @lends ami.IControl */
{
  /*---------------------------------------------------------------------*/

  /**
    * Patches an HTML identifier
    * @param {String} id the unpatched HTML identifier
    * @returns {String} The patched HTML identifier
    */
  patchId: function patchId() {},

  /*---------------------------------------------------------------------*/

  /**
    * Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
    * @param {String} selector the target selector
    * @param {String} twig the TWIG fragment
    * @param {Object} [settings] dictionary of settings (context, dict)
    * @returns {$.Deferred} A JQuery deferred object
    */
  replaceHTML: function replaceHTML() {},

  /*---------------------------------------------------------------------*/

  /**
    * Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
    * @param {String} selector the target selector
    * @param {String} twig the TWIG fragment
    * @param {Object} [settings] dictionary of settings (context, dict)
    * @returns {$.Deferred} A JQuery deferred object
    */
  prependHTML: function prependHTML() {},

  /*---------------------------------------------------------------------*/

  /**
    * Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
    * @param {String} selector the target selector
    * @param {String} twig the TWIG fragment
    * @param {Object} [settings] dictionary of settings (context, dict)
    * @returns {$.Deferred} A JQuery deferred object
    */
  appendHTML: function appendHTML() {},

  /*---------------------------------------------------------------------*/

  /**
    * Called when the control is ready to run
    */
  onReady: function onReady() {}
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/

/* ami.ISubApp                                                             */

/*-------------------------------------------------------------------------*/

/**
 * The AMI sub-application interface
 * @interface ami.ISubApp
 */

$AMIInterface('ami.ISubApp',
/** @lends ami.ISubApp */
{
  /*---------------------------------------------------------------------*/

  /**
    * Called when the sub-application is ready to run
    * @param {?} userdata userdata
    */
  onReady: function onReady() {},

  /*---------------------------------------------------------------------*/

  /**
    * Called when the sub-application is about to exit
    * @param {?} userdata userdata
    */
  onExit: function onExit() {},

  /*---------------------------------------------------------------------*/

  /**
    * Called when logging in
    * @param {?} userdata userdata
    */
  onLogin: function onLogin() {},

  /*---------------------------------------------------------------------*/

  /**
    * Called when logging out
    * @param {?} userdata userdata
    */
  onLogout: function onLogout() {}
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/

/* ami.Control                                                             */

/*-------------------------------------------------------------------------*/

/**
 * The basic AMI control
 * @class ami.Control
 * @implements {ami.IControl}
 */

$AMIClass('ami.Control',
/** @lends ami.Control */
{
  /*---------------------------------------------------------------------*/
  $implements: [ami.IControl],

  /*---------------------------------------------------------------------*/
  $: function $() {
    ami.Control.instanceCnt = 1;
  },

  /*---------------------------------------------------------------------*/
  $init: function $init(parent, owner) {
    this._parent = parent || this;
    this._owner = owner || this;
    this.instanceSuffix = ami.Control.instanceCnt++;
  },

  /*---------------------------------------------------------------------*/
  setParent: function setParent(parent) {
    return this._parent = parent || this;
  },
  getParent: function getParent() {
    return this._parent;
  },

  /*---------------------------------------------------------------------*/
  setOwner: function setOwner(owner) {
    return this._owner = owner || this;
  },
  getOwner: function getOwner() {
    return this._owner;
  },

  /*---------------------------------------------------------------------*/
  setSelector: function setSelector(selector) {
    return this._selector = selector || '';
  },
  getSelector: function getSelector() {
    return this._selector;
  },

  /*---------------------------------------------------------------------*/
  patchId: function patchId(identifier) {
    return identifier + '_instance' + this.instanceSuffix;
  },

  /*---------------------------------------------------------------------*/
  replaceHTML: function replaceHTML(selector, twig, settings) {
    if (!settings) {
      settings = {};
    }

    settings.suffix = this.instanceSuffix;
    return amiWebApp.replaceHTML(selector, twig, settings);
  },

  /*---------------------------------------------------------------------*/
  prependHTML: function prependHTML(selector, twig, settings) {
    if (!settings) {
      settings = {};
    }

    settings.suffix = this.instanceSuffix;
    return amiWebApp.prependHTML(selector, twig, settings);
  },

  /*---------------------------------------------------------------------*/
  appendHTML: function appendHTML(selector, twig, settings) {
    if (!settings) {
      settings = {};
    }

    settings.suffix = this.instanceSuffix;
    return amiWebApp.appendHTML(selector, twig, settings);
  },

  /*---------------------------------------------------------------------*/
  createControl: function createControl(parent, control, params, settings) {
    return amiWebApp.createControl(parent, this, control, params, settings);
  },

  /*---------------------------------------------------------------------*/
  createControlInBody: function createControlInBody(parent, control, controlParamsWithoutSettings, controlSettings, parentSettings, settings) {
    return amiWebApp.createControlInBody(parent, this, control, controlParamsWithoutSettings, controlSettings, parentSettings, settings);
  },

  /*---------------------------------------------------------------------*/
  createControlInContainer: function createControlInContainer(parent, control, controlParamsWithoutSettings, controlSettings, parentSettings, icon, title, settings) {
    return amiWebApp.createControlInContainer(parent, this, control, controlParamsWithoutSettings, controlSettings, parentSettings, icon, title, settings);
  },

  /*---------------------------------------------------------------------*/
  createControlFromWebLink: function createControlFromWebLink(parent, el, parentSettings, settings) {
    return amiWebApp.createControlFromWebLink(parent, this, el, parentSettings, settings);
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/

/* ami.SubApp                                                              */

/*-------------------------------------------------------------------------*/

/**
 * The basic AMI sub-application
 * @class ami.SubApp
 * @implements {ami.ISubApp}
 */

$AMIClass('ami.SubApp',
/** @lends ami.SubApp */
{
  /*---------------------------------------------------------------------*/
  $implements: [ami.ISubApp],

  /*---------------------------------------------------------------------*/
  onExit: function onExit() {},

  /*---------------------------------------------------------------------*/
  onLogin: function onLogin() {},

  /*---------------------------------------------------------------------*/
  onLogout: function onLogout() {}
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------*/

/* amiCommand                                                              */

/*-------------------------------------------------------------------------*/

/**
 * The AMI command subsystem
 * @namespace amiCommand
 */

$AMINamespace('amiCommand',
/** @lends amiCommand */
{
  /*---------------------------------------------------------------------*/

  /* PUBLIC MEMBERS                                                      */

  /*---------------------------------------------------------------------*/

  /**
    * Default endpoint
    * @type {String}
    */
  endpoint: 'http://xxyy.zz',

  /**
    * Default converter
    * @type {String}
    */
  converter: 'AMIXmlToJson.xsl',

  /*---------------------------------------------------------------------*/

  /* PUBLIC METHODS                                                      */

  /*---------------------------------------------------------------------*/

  /**
    * Executes an AMI command
    * @param {String} command the command
    * @param {Object} [settings] dictionary of settings (context, endpoint, converter, timeout, extraParam, extraValue)
    * @returns {$.Deferred} A JQuery deferred object
    */
  execute: function execute(command, settings) {
    var result = $.Deferred();

    var _amiWebApp$setup2 = amiWebApp.setup(['endpoint', 'converter', 'context', 'timeout', 'extraParam', 'extraValue'], [this.endpoint, this.converter, result, 2 * 60 * 1000, null, null], settings),
        endpoint = _amiWebApp$setup2[0],
        converter = _amiWebApp$setup2[1],
        context = _amiWebApp$setup2[2],
        timeout = _amiWebApp$setup2[3],
        extraParam = _amiWebApp$setup2[4],
        extraValue = _amiWebApp$setup2[5];
    /*-----------------------------------------------------------------*/


    var URL = endpoint.trim();
    var COMMAND = command.trim();
    var CONVERTER = converter.trim();
    /*-----------------------------------------------------------------*/

    var data = {
      Command: COMMAND,
      Converter: CONVERTER
    };

    if (extraParam) {
      data[extraParam] = extraValue ? extraValue : null;
    }
    /*-----------------------------------------------------------------*/


    var urlWithParameters = URL + '?' + $.param(data);
    /*-----------------------------------------------------------------*/

    if (CONVERTER === 'AMIXmlToJson.xsl') {
      /*-------------------------------------------------------------*/

      /* JSON FORMAT                                                 */

      /*-------------------------------------------------------------*/
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
      /*-------------------------------------------------------------*/
    } else {
      /*-------------------------------------------------------------*/

      /* OTHER FORMATS                                               */

      /*-------------------------------------------------------------*/
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
      /*-------------------------------------------------------------*/
    }
    /*-----------------------------------------------------------------*/


    return result.promise();
  },

  /*---------------------------------------------------------------------*/

  /**
    * Logs in by login/password
    * @param {String} user the user
    * @param {String} pass the password
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  passLogin: function passLogin(user, pass, settings) {
    var result = $.Deferred();

    var _amiWebApp$setup3 = amiWebApp.setup(['context'], [result], settings),
        context = _amiWebApp$setup3[0];
    /*-----------------------------------------------------------------*/


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
    /*-----------------------------------------------------------------*/

    return result.promise();
  },

  /*---------------------------------------------------------------------*/

  /**
    * Logs in by certificate
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  certLogin: function certLogin(settings) {
    var result = $.Deferred();

    var _amiWebApp$setup4 = amiWebApp.setup(['context'], [result], settings),
        context = _amiWebApp$setup4[0];
    /*-----------------------------------------------------------------*/


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
    /*-----------------------------------------------------------------*/

    return result.promise();
  },

  /*---------------------------------------------------------------------*/

  /**
    * Logs out
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  logout: function logout(settings) {
    var result = $.Deferred();

    var _amiWebApp$setup5 = amiWebApp.setup(['context'], [result], settings),
        context = _amiWebApp$setup5[0];
    /*-----------------------------------------------------------------*/


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
    /*-----------------------------------------------------------------*/

    return result.promise();
  },

  /*---------------------------------------------------------------------*/

  /**
    * Attaches a certificate
    * @param {String} user the user
    * @param {String} pass the password
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  attachCert: function attachCert(user, pass, settings) {
    return this.execute('GetSessionInfo -attachCert -amiLogin="' + amiWebApp.textToString(user) + '" -amiPassword="' + amiWebApp.textToString(pass) + '"', settings);
  },

  /*---------------------------------------------------------------------*/

  /**
    * Detaches a certificate
    * @param {String} user the user
    * @param {String} pass the password
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  detachCert: function detachCert(user, pass, settings) {
    return this.execute('GetSessionInfo -detachCert -amiLogin="' + amiWebApp.textToString(user) + '" -amiPassword="' + amiWebApp.textToString(pass) + '"', settings);
  },

  /*---------------------------------------------------------------------*/

  /**
    * Adds a new user
    * @param {String} user the user
    * @param {String} pass the password
    * @param {String} firstName the first name
    * @param {String} lastName the last name
    * @param {String} email the email
    * @param {Boolean} attach attach the current certificate
    * @param {Boolean} agree agree with the terms and conditions
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  addUser: function addUser(user, pass, firstName, lastName, email, attach, agree, settings) {
    return this.execute('AddUser -amiLogin="' + amiWebApp.textToString(user) + '" -amiPassword="' + amiWebApp.textToString(pass) + '" -firstName="' + amiWebApp.textToString(firstName) + '" -lastName="' + amiWebApp.textToString(lastName) + '" -email="' + amiWebApp.textToString(email) + '"' + (attach ? ' -attach' : '') + (agree ? ' -agree' : ''), settings);
  },

  /*---------------------------------------------------------------------*/

  /**
    * Changes the account information
    * @param {String} firstName the first name
    * @param {String} lastName the last name
    * @param {String} email the email
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  changeInfo: function changeInfo(firstName, lastName, email, settings) {
    return this.execute('SetUserInfo -firstName="' + amiWebApp.textToString(firstName) + '" -lastName="' + amiWebApp.textToString(lastName) + '" -email="' + amiWebApp.textToString(email) + '"', settings);
  },

  /*---------------------------------------------------------------------*/

  /**
    * Changes the account password
    * @param {String} user the user
    * @param {String} oldPass the old password
    * @param {String} newPass the new password
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  changePass: function changePass(user, oldPass, newPass, settings) {
    return this.execute('ChangePassword -amiLogin="' + amiWebApp.textToString(user) + '" -amiPasswordOld="' + amiWebApp.textToString(oldPass) + '" -amiPasswordNew="' + amiWebApp.textToString(newPass) + '"', settings);
  },

  /*---------------------------------------------------------------------*/

  /**
    * Resets the account password
    * @param {String} user the user
    * @param {Object} [settings] dictionary of settings (context)
    * @returns {$.Deferred} A JQuery deferred object
    */
  resetPass: function resetPass(user, settings) {
    return this.execute('ResetPassword -amiLogin="' + amiWebApp.textToString(user) + '"', settings);
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------*/

/* amiLogin                                                                */

/*-------------------------------------------------------------------------*/

/**
 * The AMI authentication subsystem
 * @namespace amiLogin
 */

$AMINamespace('amiLogin',
/** @lends amiLogin */
{
  /*---------------------------------------------------------------------*/

  /* PUBLIC MEMBERS                                                      */

  /*---------------------------------------------------------------------*/
  createAccountAllowed: true,
  changeInfoAllowed: true,
  changePassordAllowed: true,

  /*---------------------------------------------------------------------*/
  user: 'guest',
  guest: 'guest',
  clientDN: '',
  issuerDN: '',
  notBefore: '',
  notAfter: '',

  /*---------------------------------------------------------------------*/
  roleInfo: {},
  udpInfo: {},
  ssoInfo: {},

  /*---------------------------------------------------------------------*/

  /* PRIVATE METHODS                                                     */

  /*---------------------------------------------------------------------*/
  _start: function _start(createAccountAllowed, changeInfoAllowed, changePassordAllowed) {
    var _this15 = this;

    var result = $.Deferred();
    /*-----------------------------------------------------------------*/

    amiWebApp.loadTWIGs([amiWebApp.originURL + '/twig/AMI/Fragment/login_button.twig', amiWebApp.originURL + '/twig/AMI/Fragment/logout_button.twig', amiWebApp.originURL + '/twig/AMI/Modal/login.twig']).done(function (data) {
      /*-------------------------------------------------------------*/
      _this15.fragmentLoginButton = data[0];
      _this15.fragmentLogoutButton = data[1];
      /*-------------------------------------------------------------*/

      var dict = {
        createAccountAllowed: _this15.createAccountAllowed = createAccountAllowed,
        changeInfoAllowed: _this15.changeInfoAllowed = changeInfoAllowed,
        changePassordAllowed: _this15.changePassordAllowed = changePassordAllowed
      };
      /*-------------------------------------------------------------*/

      amiWebApp.appendHTML('body', data[2], {
        dict: dict
      }).done(function () {
        /*---------------------------------------------------------*/
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
        /*---------------------------------------------------------*/

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
        /*---------------------------------------------------------*/
      });
      /*-------------------------------------------------------------*/

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
      /*-------------------------------------------------------------*/

      var userdata = amiWebApp.args['userdata'] || '';
      /*-------------------------------------------------------------*/

      amiCommand.certLogin().fail(function (data, message, userInfo, roleInfo, udpInfo, ssoInfo) {
        _this15._update(userInfo, roleInfo, udpInfo, ssoInfo).always(function ()
        /*---*/
        {
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
      /*-------------------------------------------------------------*/
    }).fail(function (message) {
      result.reject(message);
    });
    /*-----------------------------------------------------------------*/

    return result.promise();
  },

  /*---------------------------------------------------------------------*/
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

  /*---------------------------------------------------------------------*/
  _clean: function _clean() {
    $('#B7894CC1_1DAA_4A7E_B7D1_DBDF6F06AC73').trigger('reset');
    $('#EE055CD4_E58F_4834_8020_986AE3F8D67D').trigger('reset');
    $('#DA2047A2_9E5D_420D_B6E7_FA261D2EF10F').trigger('reset');
    $('#E92A1097_983B_4857_875F_07E4659B41B0').trigger('reset');
  },

  /*---------------------------------------------------------------------*/
  _update: function _update(userInfo, roleInfo, udpInfo, ssoInfo) {
    var result = $.Deferred();
    /*-----------------------------------------------------------------*/

    /*-----------------------------------------------------------------*/

    var user = this.user = userInfo.AMIUser || '';
    var guest = this.guest = userInfo.guestUser || '';
    var notBefore = this.notBefore = userInfo.notBefore || '';
    var notAfter = this.notAfter = userInfo.notAfter || '';
    var clientDNInSession = this.clientDN = userInfo.clientDNInSession || '';
    var issuerDNInSession = this.issuerDN = userInfo.issuerDNInSession || '';
    /*-----------------------------------------------------------------*/

    $('#A09AE316_7068_4BC1_96A9_6B87D28863FE').prop('disabled', !clientDNInSession || !issuerDNInSession);
    $('#C3E94F6D_48E0_86C0_3534_691728E492F4').attr('src', udpInfo.termsAndConditions || amiWebApp.originURL + '/docs/terms_and_conditions.html');
    $('#E50FF8BD_B0F5_CD72_F9DC_FC2BFA5DBA27').attr('src', udpInfo.termsAndConditions || amiWebApp.originURL + '/docs/terms_and_conditions.html');
    /*-----------------------------------------------------------------*/

    this.roleInfo = roleInfo;
    this.udpInfo = udpInfo;
    this.ssoInfo = ssoInfo;
    /*-----------------------------------------------------------------*/

    var dict = {
      createAccountAllowed: this.createAccountAllowed,
      changeInfoAllowed: this.changeInfoAllowed,
      changePassordAllowed: this.changePassordAllowed,

      /**/
      sso_label: ssoInfo.label || 'SSO',
      sso_url: ssoInfo.url || '@NULL'
    };

    if (user !== guest) {
      /*-------------------------------------------------------------*/

      /* GET INFO                                                    */

      /*-------------------------------------------------------------*/
      var valid = userInfo.valid || 'false';
      var certEnabled = userInfo.certEnabled || 'false';
      var vomsEnabled = userInfo.vomsEnabled || 'false';
      /*-------------------------------------------------------------*/

      var firstName = userInfo.firstName || '';
      var lastName = userInfo.lastName || '';
      var email = userInfo.email || '';
      /*-------------------------------------------------------------*/

      var clientDNInAMI = userInfo.clientDNInAMI || '';
      var issuerDNInAMI = userInfo.issuerDNInAMI || '';
      /*-------------------------------------------------------------*/

      /* SET INFO                                                    */

      /*-------------------------------------------------------------*/

      $('#E513F27D_5521_4B08_BF61_52AFB81356F7').val(firstName);
      $('#AFF0B5C0_BEEC_4842_916D_DCBA7F589195').val(lastName);
      $('#C587486B_62C0_4B6E_9288_D8F9F89D157B').val(email);
      /*-------------------------------------------------------------*/

      $('#ABEB0291_40B0_414A_A42B_E7EABB9B487E').val(firstName);
      $('#A5AFDB62_1034_4F66_A3E6_9341B31FA290').val(lastName);
      $('#D730A774_05EA_47AB_A0C8_D92753802E3E').val(email);
      /*-------------------------------------------------------------*/

      $('#D1BEE3BF_9161_41DC_BC53_C44FFE4D2522').val(clientDNInAMI);
      $('#C76805D7_1E86_4231_9071_1D04783423BB').val(clientDNInSession);
      $('#F42FAF6B_2C8D_4142_8BD9_E5BCDCAA05AA').val(issuerDNInAMI);
      $('#FE2F6232_C256_4B80_939C_EBEC90320308').val(issuerDNInSession);
      /*-------------------------------------------------------------*/

      var table = [];

      for (var role in roleInfo) {
        table.push('<tr>');
        table.push('<td>' + amiWebApp.textToHtml(roleInfo[role].name || 'N/A') + '</td>');
        table.push('<td>' + amiWebApp.textToHtml(roleInfo[role].description || 'N/A') + '</td>');
        table.push('</tr>');
      }

      $('#BB07676B_EACA_9B42_ED51_477DB2976041').html(table.join(''));
      /*-------------------------------------------------------------*/

      /* CHECK USER STATUS                                           */

      /*-------------------------------------------------------------*/

      var icon = '';
      var message = '';

      if (valid !== 'false') {
        /*---------------------------------------------------------*/

        /* VALID USER                                              */

        /*---------------------------------------------------------*/
        if (certEnabled !== 'false' && clientDNInAMI && issuerDNInAMI) {
          if (!clientDNInSession || !issuerDNInSession) {
            message = 'It is recommended to authenticate with a X.509 certificate.';
          } else {
            if (clientDNInAMI !== clientDNInSession || issuerDNInAMI !== issuerDNInSession) {
              message = 'The X.509 certificate in the session differs from the one in AMI.';
            }
          }
        }
        /*---------------------------------------------------------*/


        if (message) {
          $('#D944B01D_2E8D_4EE9_9DCC_2691438BBA16').html('<i class="fa fa-info-circle text-warning"></i> ' + message);
          icon = '<a class="nav-link text-warning" href="javascript:amiLogin.accountStatus();">' + '<i class="fa fa-info-circle"></i>' + '</a>';
        }
        /*---------------------------------------------------------*/


        $('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').parent().css('background', '#B8D49B url("' + amiWebApp.originURL + '/images/certificate-green.png") no-repeat center center').css('background-size', 'cover');
        $('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').css('color', '#006400').html('<i class="fa fa-leaf"></i> valid <i class="fa fa-leaf"></i>');
        $('#E91280F6_E7C6_3E53_A457_646995C99317').text(notBefore + ' - ' + notAfter);
        /*---------------------------------------------------------*/
      } else {
        /*---------------------------------------------------------*/

        /* INVALID USER                                            */

        /*---------------------------------------------------------*/
        if (vomsEnabled !== 'false') {
          if (!clientDNInAMI || !issuerDNInAMI) {
            message = 'Register a valid X.509 certificate.';
          } else {
            message = 'Check your virtual organization roles.';
          }
        } else {
          message = 'Unexpected issue, contact the AMI team.';
        }
        /*---------------------------------------------------------*/


        if (message) {
          $('#D944B01D_2E8D_4EE9_9DCC_2691438BBA16').html('<i class="fa fa-info-circle text-danger"></i> ' + message);
          icon = '<a class="nav-link text-danger" href="javascript:amiLogin.accountStatus();">' + '<i class="fa fa-info-circle"></i>' + '</a>';
        }
        /*---------------------------------------------------------*/


        $('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').parent().css('background', '#E8C8CF url("' + amiWebApp.originURL + '/images/certificate-pink.png") no-repeat center center').css('background-size', 'cover');
        $('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').css('color', '#8B0000').html('<i class="fa fa-leaf"></i> invalid <i class="fa fa-leaf"></i>');
        $('#E91280F6_E7C6_3E53_A457_646995C99317').text(notBefore + ' - ' + notAfter);
        /*---------------------------------------------------------*/
      }
      /*-------------------------------------------------------------*/

      /* UPDATE MENU BAR                                             */

      /*-------------------------------------------------------------*/


      dict['user'] = user;
      dict['icon'] = icon;
      /*-------------------------------------------------------------*/

      amiWebApp.replaceHTML('#ami_login_menu_content', this.fragmentLogoutButton, {
        dict: dict
      }).done(function () {
        amiWebApp.triggerLogin().then(function () {
          result.resolve();
        }, function (message) {
          result.reject(message);
        });
      });
      /*-------------------------------------------------------------*/
    } else {
      /*-------------------------------------------------------------*/
      amiWebApp.replaceHTML('#ami_login_menu_content', this.fragmentLoginButton, {
        dict: dict
      }).done(function () {
        amiWebApp.triggerLogout().then(function () {
          result.resolve();
        }, function (message) {
          result.reject(message);
        });
      });
      /*-------------------------------------------------------------*/
    }
    /*-----------------------------------------------------------------*/


    return result.promise();
  },

  /*---------------------------------------------------------------------*/

  /* PUBLIC METHODS                                                      */

  /*---------------------------------------------------------------------*/

  /**
    * Gets the current user
    * @returns {String} The current user
    */
  getUser: function getUser() {
    return this.user;
  },

  /*---------------------------------------------------------------------*/

  /**
    * Gets the guest user
    * @returns {String} The guest user
    */
  getGuest: function getGuest() {
    return this.guest;
  },

  /*---------------------------------------------------------------------*/

  /**
    * Gets the client DN
    * @returns {String} The client DN
    */
  getClientDN: function getClientDN() {
    return this.clientDN;
  },

  /*---------------------------------------------------------------------*/

  /**
    * Gets the issuer DN
    * @returns {String} The issuer DN
    */
  getIssuerDN: function getIssuerDN() {
    return this.issuerDN;
  },

  /*---------------------------------------------------------------------*/

  /**
    * Checks whether the user is authenticated
    * @returns {Boolean}
    */
  isAuthenticated: function isAuthenticated() {
    return this.user !== this.guest;
  },

  /*---------------------------------------------------------------------*/

  /**
    * Checks whether the user has the given role
    * @param {String} role the role
    * @returns {Boolean}
    */
  hasRole: function hasRole(roleName) {
    return roleName in this.roleInfo;
  },

  /*---------------------------------------------------------------------*/

  /**
    * Opens the 'SSO' modal window
    */
  sso: function sso() {
    this._clean();

    window.open(this.ssoInfo.url, 'Single Sign-On', 'menubar=no, status=no, scrollbars=no, width=800, height=450');
  },

  /*---------------------------------------------------------------------*/

  /**
    * Opens the 'SignIn' modal window
    */
  signIn: function signIn() {
    this._clean();

    $('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('show');
  },

  /*---------------------------------------------------------------------*/

  /**
    * Opens the 'Change Info' modal window
    */
  changeInfo: function changeInfo() {
    this._clean();

    $('#D9EAF998_ED8E_44D2_A0BE_8C5CF5E438BD').modal('show');
  },

  /*---------------------------------------------------------------------*/

  /**
    * Opens the 'Change Password' modal window
    */
  changePass: function changePass() {
    this._clean();

    $('#E92A1097_983B_4857_875F_07E4659B41B0').modal('show');
  },

  /*---------------------------------------------------------------------*/

  /**
    * Opens the 'Account Status' modal window
    */
  accountStatus: function accountStatus() {
    this._clean();

    $('#AB1CB183_96EB_4116_8A9E_4409BE058F34').modal('show');
  },

  /*---------------------------------------------------------------------*/

  /**
    * Signs out
    */
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

  /*---------------------------------------------------------------------*/
  form_login: function form_login(e) {
    e.preventDefault();
    var values = $(e.target).serializeObject();
    return this.form_login2(values['user'], values['pass']);
  },

  /*---------------------------------------------------------------------*/
  form_login2: function form_login2(user, pass) {
    var _this17 = this;

    /*-----------------------------------------------------------------*/
    var promise = user && pass ? amiCommand.passLogin(user.trim(), pass.trim()) : amiCommand.certLogin();
    /*-----------------------------------------------------------------*/

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
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  form_attachCert: function form_attachCert() {
    var _this18 = this;

    /*-----------------------------------------------------------------*/
    var user = $('#E64F24B2_33E6_4DED_9B24_28BE04219613').val();
    var pass = $('#A4DFD039_034F_4D10_9668_385AEF4FBBB9').val();

    if (!user || !pass) {
      this._error('Please, fill all fields with a red star.');

      return;
    }
    /*-----------------------------------------------------------------*/


    amiWebApp.lock();
    amiCommand.attachCert(user, pass).then(function (data, message) {
      _this18._success(message);
    }, function (data, message) {
      _this18._error(message);
    });
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  form_detachCert: function form_detachCert() {
    var _this19 = this;

    /*-----------------------------------------------------------------*/
    var user = $('#E64F24B2_33E6_4DED_9B24_28BE04219613').val();
    var pass = $('#A4DFD039_034F_4D10_9668_385AEF4FBBB9').val();

    if (!user || !pass) {
      this._error('Please, fill all fields with a red star.');

      return;
    }
    /*-----------------------------------------------------------------*/


    amiWebApp.lock();
    amiCommand.detachCert(user, pass).then(function (data, message) {
      _this19._success(message);
    }, function (data, message) {
      _this19._error(message);
    });
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  form_addUser: function form_addUser(e) {
    var _this20 = this;

    e.preventDefault();
    /*-----------------------------------------------------------------*/

    var values = $(e.target).serializeObject();
    /*-----------------------------------------------------------------*/

    amiWebApp.lock();
    amiCommand.addUser(values['login'], values['pass'], values['first_name'], values['last_name'], values['email'], 'attach' in values, 'agree' in values).then(function (data, message) {
      _this20._success(message);
    }, function (data, message) {
      _this20._error(message);
    });
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  form_remindPass: function form_remindPass(e) {
    var _this21 = this;

    e.preventDefault();
    /*-----------------------------------------------------------------*/

    var values = $(e.target).serializeObject();
    /*-----------------------------------------------------------------*/

    amiWebApp.lock();
    amiCommand.resetPass(values['user']).then(function (data, message) {
      _this21._success(message);
    }, function (data, message) {
      _this21._error(message);
    });
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  form_changeInfo: function form_changeInfo(e) {
    var _this22 = this;

    e.preventDefault();
    /*-----------------------------------------------------------------*/

    var values = $(e.target).serializeObject();
    /*-----------------------------------------------------------------*/

    amiWebApp.lock();
    amiCommand.changeInfo(values['first_name'], values['last_name'], values['email']).then(function (data, message) {
      _this22._success(message);
    }, function (data, message) {
      _this22._error(message);
    });
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  form_changePass: function form_changePass(e) {
    var _this23 = this;

    e.preventDefault();
    /*-----------------------------------------------------------------*/

    var values = $(e.target).serializeObject();
    /*-----------------------------------------------------------------*/

    amiWebApp.lock();
    amiCommand.changePass(this.user, values['old_pass'], values['new_pass']).then(function (data, message) {
      _this23._success(message);
    }, function (data, message) {
      _this23._error(message);
    });
    /*-----------------------------------------------------------------*/
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/

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

/*-------------------------------------------------------------------------*/

/* eslint-disable */

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
/* eslint-enable */

/*-------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFNSS9leHRlcm5hbC9hbWktdHdpZy5lczYuanMiLCJBTUkvZXh0ZXJuYWwvanNwYXRoLmpzIiwiQU1JL0FNSUV4dGVuc2lvbi5qcyIsIkFNSS9BTUlPYmplY3QuanMiLCJBTUkvQU1JUm91dGVyLmpzIiwiQU1JL0FNSVdlYkFwcC5qcyIsIkFNSS9BTUlJbnRlcmZhY2UuanMiLCJBTUkvQU1JQ29tbWFuZC5qcyIsIkFNSS9BTUlMb2dpbi5qcyIsIkFNSS9BTUlEb2MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7OztBQVdBOztBQUNBOztBQUNBOztBQUVBLElBQUksT0FBTyxHQUFHO0FBQ2IsRUFBQSxPQUFPLEVBQUU7QUFESSxDQUFkO0FBSUE7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBRyxPQUFPLE9BQVAsS0FBbUIsV0FBdEIsRUFDQTtBQUNDLEVBQUEsT0FBTyxDQUFDLEVBQVIsR0FBYSxPQUFPLENBQUEsSUFBQSxDQUFwQjtBQUVBLEVBQUEsTUFBTSxDQUFDLE9BQVAsQ0FBZSxPQUFmLEdBQXlCLE9BQXpCO0FBQ0E7QUFFRDs7QUFFQTs7Ozs7Ozs7Ozs7QUFXQTs7QUFDQTs7QUFDQTs7O0FBRUEsT0FBTyxDQUFDLFNBQVIsR0FBb0I7QUFDbkI7QUFFQSxFQUFBLFFBQVEsRUFBRSxrQkFBUyxJQUFULEVBQWUsSUFBZixFQUFxQixNQUFyQixFQUE2QixTQUE3QixFQUF3QyxVQUF4QyxFQUFvRCxLQUFwRCxFQUNWO0FBQ0MsUUFBRyxTQUFTLENBQUMsTUFBVixLQUFxQixVQUFVLENBQUMsTUFBbkMsRUFDQTtBQUNDLFlBQU0seUNBQU47QUFDQTs7QUFFRCxRQUFNLGFBQWEsR0FBRyxFQUF0QjtBQUNBLFFBQU0sWUFBWSxHQUFHLEVBQXJCO0FBQ0EsUUFBTSxZQUFZLEdBQUcsRUFBckI7QUFFQSxRQUFJLENBQUMsR0FBRyxXQUFSO0FBQ0EsUUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQWY7QUFFQSxRQUFJLElBQUksR0FBRyxF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VDtBQUFvQixnQkFBTyxHQUEzQjtBQUEyQixnQkFBVyxVQUF0QztBQUFpRCxtQkFBVSxFQUEzRDtBQUEyRCxvQkFBYyxFQUF6RTtBQUF5RSxvQkFBYztBQUF2RixPQUFBO0FBQW5FLEtBQXJmO0FBQXJLLEdBQW5sRTtBQUF6KzFCLENBQWI7QUFFQTs7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxudmFyIGFtaVR3aWcgPSB7XG5cdHZlcnNpb246ICcxLjAuMCdcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBleHBvcnRzLmFtaVR3aWcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaWYodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKVxue1xuXHRhbWlUd2lnLmZzID0gcmVxdWlyZSgnZnMnKTtcblxuXHRtb2R1bGUuZXhwb3J0cy5hbWlUd2lnID0gYW1pVHdpZztcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLypcbiAqIEFNSSBUd2lnIEVuZ2luZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE5IFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy50b2tlbml6ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG9rZW5pemVyID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dG9rZW5pemU6IGZ1bmN0aW9uKGNvZGUsIGxpbmUsIHNwYWNlcywgdG9rZW5EZWZzLCB0b2tlblR5cGVzLCBlcnJvcilcblx0e1xuXHRcdGlmKHRva2VuRGVmcy5sZW5ndGggIT09IHRva2VuVHlwZXMubGVuZ3RoKVxuXHRcdHtcblx0XHRcdHRocm93ICdgdG9rZW5EZWZzLmxlbmd0aCAhPSB0b2tlblR5cGVzLmxlbmd0aGAnO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlc3VsdF90b2tlbnMgPSBbXTtcblx0XHRjb25zdCByZXN1bHRfdHlwZXMgPSBbXTtcblx0XHRjb25zdCByZXN1bHRfbGluZXMgPSBbXTtcblxuXHRcdGxldCBpID0gMHgwMDAwMDAwMDA7XG5cdFx0Y29uc3QgbCA9IGNvZGUubGVuZ3RoO1xuXG5cdFx0bGV0IHdvcmQgPSAnJywgdG9rZW4sIGM7XG5cbl9fbDA6XHRcdHdoaWxlKGkgPCBsKVxuXHRcdHtcblx0XHRcdGMgPSBjb2RlLmNoYXJBdCgwKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIENPVU5UIExJTkVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihjID09PSAnXFxuJylcblx0XHRcdHtcblx0XHRcdFx0bGluZSsrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRUFUIFNQQUNFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHNwYWNlcy5pbmRleE9mKGMpID49IDApXG5cdFx0XHR7XG5cdFx0XHRcdGlmKHdvcmQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZihlcnJvcilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVzdWx0X3Rva2Vucy5wdXNoKHdvcmQpO1xuXHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcblx0XHRcdFx0XHR3b3JkID0gJyc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcoMSk7XG5cdFx0XHRcdGkgKz0gMTtcblxuXHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRUFUIFJFR0VYRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGZvcihjb25zdCBqIGluIHRva2VuRGVmcylcblx0XHRcdHtcblx0XHRcdFx0dG9rZW4gPSB0aGlzLl9tYXRjaChjb2RlLCB0b2tlbkRlZnNbal0pO1xuXG5cdFx0XHRcdGlmKHRva2VuKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYod29yZClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZihlcnJvcilcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhyb3cgJ2ludmFsaWQgdG9rZW4gYCcgKyB3b3JkICsgJ2AnO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRcdFx0XHRyZXN1bHRfdHlwZXMucHVzaCgtMSk7XG5cdFx0XHRcdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcblx0XHRcdFx0XHRcdHdvcmQgPSAnJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2godG9rZW4pO1xuXHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKHRva2VuVHlwZXNbal0pO1xuXHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXG5cdFx0XHRcdFx0Y29kZSA9IGNvZGUuc3Vic3RyaW5nKHRva2VuLmxlbmd0aCk7XG5cdFx0XHRcdFx0aSArPSB0b2tlbi5sZW5ndGg7XG5cblx0XHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFQVQgUkVNQUlOSU5HIENIQVJBQ1RFUkVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0d29yZCArPSBjO1xuXG5cdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcoMSk7XG5cdFx0XHRpICs9IDE7XG5cbi8qXHRcdFx0Y29udGludWUgX19sMDtcbiAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHRpZih3b3JkKVxuXHRcdHtcblx0XHRcdGlmKGVycm9yKVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh3b3JkKTtcblx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuLypcdFx0XHR3b3JkID0gJyc7XG4gKi9cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHRva2VuczogcmVzdWx0X3Rva2Vucyxcblx0XHRcdHR5cGVzOiByZXN1bHRfdHlwZXMsXG5cdFx0XHRsaW5lczogcmVzdWx0X2xpbmVzLFxuXHRcdH07XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9tYXRjaDogZnVuY3Rpb24ocywgc3RyaW5nT3JSZWdFeHApXG5cdHtcblx0XHRsZXQgbTtcblxuXHRcdGlmKHN0cmluZ09yUmVnRXhwIGluc3RhbmNlb2YgUmVnRXhwKVxuXHRcdHtcblx0XHRcdG0gPSBzLm1hdGNoKHN0cmluZ09yUmVnRXhwKTtcblxuXHRcdFx0cmV0dXJuIG0gIT09IG51bGwgJiYgdGhpcy5fY2hlY2tOZXh0Q2hhcihzLCAvKi0qL21bMF0vKi0qLykgPyAvKi0qL21bMF0vKi0qLyA6IG51bGw7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRtID0gcy5pbmRleE9mKHN0cmluZ09yUmVnRXhwKTtcblxuXHRcdFx0cmV0dXJuIG0gPT09IDB4MDAgJiYgdGhpcy5fY2hlY2tOZXh0Q2hhcihzLCBzdHJpbmdPclJlZ0V4cCkgPyBzdHJpbmdPclJlZ0V4cCA6IG51bGw7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfYWxudW06IFtcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsXG5cdFx0MSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMSxcblx0XHQwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLFxuXHRcdDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRdLFxuXG5cdF9jaGVja05leHRDaGFyOiBmdW5jdGlvbihzLCB0b2tlbilcblx0e1xuXHRcdGNvbnN0IGxlbmd0aCA9IHRva2VuLmxlbmd0aDtcblxuXHRcdGNvbnN0IGNoYXJDb2RlMiA9IHMuY2hhckNvZGVBdChsZW5ndGggLSAwKTtcblx0XHRjb25zdCBjaGFyQ29kZTEgPSBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMSk7XG5cblx0XHRyZXR1cm4gaXNOYU4oY2hhckNvZGUyKVxuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0aGlzLl9hbG51bVtjaGFyQ29kZTJdID09PSAwXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHRoaXMuX2FsbnVtW2NoYXJDb2RlMV0gPT09IDBcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLypcbiAqIEFNSSBUd2lnIEVuZ2luZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE5IFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwciA9IHt9O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLnRva2VucyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci50b2tlbnMgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQ09NUE9TSVRFIFRPS0VOUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLklTX1hYWCA9IFtcblx0XHRcdHRoaXMuREVGSU5FRCxcblx0XHRcdHRoaXMuTlVMTCxcblx0XHRcdHRoaXMuRU1QVFksXG5cdFx0XHR0aGlzLklURVJBQkxFLFxuXHRcdFx0dGhpcy5FVkVOLFxuXHRcdFx0dGhpcy5PREQsXG5cdFx0XTtcblxuXHRcdHRoaXMuWFhYX1dJVEggPSBbXG5cdFx0XHR0aGlzLlNUQVJUU19XSVRILFxuXHRcdFx0dGhpcy5FTkRTX1dJVEgsXG5cdFx0XTtcblxuXHRcdHRoaXMuUExVU19NSU5VUyA9IFtcblx0XHRcdHRoaXMuQ09OQ0FULFxuXHRcdFx0dGhpcy5QTFVTLFxuXHRcdFx0dGhpcy5NSU5VUyxcblx0XHRdO1xuXG5cdFx0dGhpcy5NVUxfRkxESVZfRElWX01PRCA9IFtcblx0XHRcdHRoaXMuTVVMLFxuXHRcdFx0dGhpcy5GTERJVixcblx0XHRcdHRoaXMuRElWLFxuXHRcdFx0dGhpcy5NT0QsXG5cdFx0XTtcblxuXHRcdHRoaXMuUlggPSBbXG5cdFx0XHR0aGlzLlJQLFxuXHRcdFx0dGhpcy5SQjEsXG5cdFx0XTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUkVBTCBUT0tFTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0TE9HSUNBTF9PUjogMTAwLFxuXHRMT0dJQ0FMX0FORDogMTAxLFxuXHRCSVRXSVNFX09SOiAxMDIsXG5cdEJJVFdJU0VfWE9SOiAxMDMsXG5cdEJJVFdJU0VfQU5EOiAxMDQsXG5cdE5PVDogMTA1LFxuXHRJUzogMTA2LFxuXHRERUZJTkVEOiAxMDcsXG5cdE5VTEw6IDEwOCxcblx0RU1QVFk6IDEwOSxcblx0SVRFUkFCTEU6IDExMCxcblx0RVZFTjogMTExLFxuXHRPREQ6IDExMixcblx0Q01QX09QOiAxMTMsXG5cdFNUQVJUU19XSVRIOiAxMTQsXG5cdEVORFNfV0lUSDogMTE1LFxuXHRNQVRDSEVTOiAxMTYsXG5cdElOOiAxMTcsXG5cdFJBTkdFOiAxMTgsXG5cdENPTkNBVDogMTE5LFxuXHRQTFVTOiAxMjAsXG5cdE1JTlVTOiAxMjEsXG5cdFBPV0VSOiAxMjIsXG5cdE1VTDogMTIzLFxuXHRGTERJVjogMTI0LFxuXHRESVY6IDEyNSxcblx0TU9EOiAxMjYsXG5cdENPTE9OOiAxMjcsXG5cdERPVDogMTI4LFxuXHRDT01NQTogMTI5LFxuXHRQSVBFOiAxMzAsXG5cdExQOiAxMzEsXG5cdFJQOiAxMzIsXG5cdExCMTogMTMzLFxuXHRSQjE6IDEzNCxcblx0TEIyOiAxMzUsXG5cdFJCMjogMTM2LFxuXHRTSUQ6IDEzNyxcblx0VEVSTUlOQUw6IDEzOCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFZJUlRVQUwgVE9LRU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdExTVDogMjAwLFxuXHRESUM6IDIwMSxcblx0RlVOOiAyMDIsXG5cdFZBUjogMjAzLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci50b2tlbnMuJGluaXQoKTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5Ub2tlbml6ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuVG9rZW5pemVyID0gZnVuY3Rpb24oY29kZSwgbGluZSkge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fc3BhY2VzID0gWycgJywgJ1xcdCcsICdcXG4nLCAnXFxyJ107XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuX3Rva2VuRGVmcyA9IFtcblx0XHQnb3InLFxuXHRcdCdhbmQnLFxuXHRcdCdiLW9yJyxcblx0XHQnYi14b3InLFxuXHRcdCdiLWFuZCcsXG5cdFx0J25vdCcsXG5cdFx0J2lzJyxcblx0XHQnZGVmaW5lZCcsXG5cdFx0J251bGwnLFxuXHRcdCdlbXB0eScsXG5cdFx0J2l0ZXJhYmxlJyxcblx0XHQnZXZlbicsXG5cdFx0J29kZCcsXG5cdFx0Jz09PScsXG5cdFx0Jz09Jyxcblx0XHQnIT09Jyxcblx0XHQnIT0nLFxuXHRcdCc8PScsXG5cdFx0Jz49Jyxcblx0XHQnPCcsXG5cdFx0Jz4nLFxuXHRcdC9ec3RhcnRzXFxzK3dpdGgvLFxuXHRcdC9eZW5kc1xccyt3aXRoLyxcblx0XHQnbWF0Y2hlcycsXG5cdFx0J2luJyxcblx0XHQnLi4nLFxuXHRcdCd+Jyxcblx0XHQnKycsXG5cdFx0Jy0nLFxuXHRcdCcqKicsXG5cdFx0JyonLFxuXHRcdCcvLycsXG5cdFx0Jy8nLFxuXHRcdCclJyxcblx0XHQnOicsXG5cdFx0Jy4nLFxuXHRcdCcsJyxcblx0XHQnfCcsXG5cdFx0JygnLFxuXHRcdCcpJyxcblx0XHQnWycsXG5cdFx0J10nLFxuXHRcdCd7Jyxcblx0XHQnfScsXG5cdFx0J3RydWUnLFxuXHRcdCdmYWxzZScsXG5cdFx0L15bMC05XStcXC5bMC05XSsvLFxuXHRcdC9eWzAtOV0rLyxcblx0XHQvXicoXFxcXCd8W14nXSkqJy8sXG5cdFx0L15cIihcXFxcXCJ8W15cIl0pKlwiLyxcblx0XHQvXlthLXpBLVpfJF1bYS16QS1aMC05XyRdKi8sXG5cdF07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuX3Rva2VuVHlwZXMgPSBbXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX09SLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9BTkQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX09SLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9YT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX0FORCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLklTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuREVGSU5FRCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk5VTEwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FTVBUWSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLklURVJBQkxFLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRVZFTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk9ERCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlNUQVJUU19XSVRILFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRU5EU19XSVRILFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLklOLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DT05DQVQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5QTFVTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTUlOVVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5QT1dFUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1VTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkZMRElWLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRElWLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTU9ELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ09MT04sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ET1QsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DT01NQSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBJUEUsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJQLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTEIxLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUkIxLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTEIyLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUkIyLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuU0lELFxuXHRdO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLiRpbml0ID0gZnVuY3Rpb24oY29kZSwgbGluZSlcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgcmVzdWx0ID0gYW1pVHdpZy50b2tlbml6ZXIudG9rZW5pemUoXG5cdFx0XHRjb2RlLFxuXHRcdFx0bGluZSxcblx0XHRcdHRoaXMuX3NwYWNlcyxcblx0XHRcdHRoaXMuX3Rva2VuRGVmcyxcblx0XHRcdHRoaXMuX3Rva2VuVHlwZXMsXG5cdFx0XHR0cnVlXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy50b2tlbnMgPSByZXN1bHQudG9rZW5zO1xuXHRcdHRoaXMudHlwZXMgPSByZXN1bHQudHlwZXM7XG5cblx0XHR0aGlzLmkgPSAwO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMubmV4dCA9IGZ1bmN0aW9uKG4gPSAxKVxuXHR7XG5cdFx0dGhpcy5pICs9IG47XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuaXNFbXB0eSA9IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmkgPj0gdGhpcy50b2tlbnMubGVuZ3RoO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLnBlZWtUb2tlbiA9IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnRva2Vuc1t0aGlzLmldO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLnBlZWtUeXBlID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudHlwZXNbdGhpcy5pXTtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5jaGVja1R5cGUgPSBmdW5jdGlvbih0eXBlKVxuXHR7XG5cdFx0aWYodGhpcy5pIDwgdGhpcy50b2tlbnMubGVuZ3RoKVxuXHRcdHtcblx0XHRcdGNvbnN0IFRZUEUgPSB0aGlzLnR5cGVzW3RoaXMuaV07XG5cblx0XHRcdHJldHVybiAodHlwZSBpbnN0YW5jZW9mIEFycmF5KSA/ICh0eXBlLmluZGV4T2YoVFlQRSkgPj0gMCkgOiAodHlwZSA9PT0gVFlQRSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLiRpbml0KGNvZGUsIGxpbmUpO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuQ29tcGlsZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLkNvbXBpbGVyID0gZnVuY3Rpb24oY29kZSwgbGluZSkge1xuXG5cdHRoaXMuJGluaXQoY29kZSwgbGluZSk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuQ29tcGlsZXIucHJvdG90eXBlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKGNvZGUsIGxpbmUpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMudG9rZW5pemVyID0gbmV3IGFtaVR3aWcuZXhwci5Ub2tlbml6ZXIoXG5cdFx0XHR0aGlzLmNvZGUgPSBjb2RlLFxuXHRcdFx0dGhpcy5saW5lID0gbGluZVxuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMucm9vdE5vZGUgPSB0aGlzLnBhcnNlRmlsdGVyKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmlzRW1wdHkoKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCB1bmV4cGVjdGVkIHRva2VuIGAnICsgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkgKyAnYCc7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGR1bXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnJvb3ROb2RlLmR1bXAoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VGaWx0ZXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUxvZ2ljYWxPcigpLCBub2RlLCB0ZW1wO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogRmlsdGVyIDogTG9naWNhbE9yICgnfCcgRG90MSkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QSVBFKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdG5vZGUgPSB0aGlzLnBhcnNlRG90MSh0cnVlKTtcblxuXHRcdFx0Zm9yKHRlbXAgPSBub2RlOyB0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDsgdGVtcCA9IHRlbXAubm9kZUxlZnQpO1xuXG5cdFx0XHR0ZW1wLmxpc3QudW5zaGlmdChsZWZ0KTtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VMb2dpY2FsT3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUxvZ2ljYWxBbmQoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBMb2dpY2FsT3IgOiBMb2dpY2FsQW5kICgnb3InIExvZ2ljYWxBbmQpKiAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfT1IpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VMb2dpY2FsQW5kKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VMb2dpY2FsQW5kOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VCaXR3aXNlT3IoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBMb2dpY2FsQW5kIDogQml0d2lzZU9yICgnYW5kJyBCaXR3aXNlT3IpKiAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfQU5EKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQml0d2lzZU9yKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VCaXR3aXNlT3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VYb3IoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBCaXR3aXNlT3IgOiBCaXR3aXNlWG9yICgnYi1vcicgQml0d2lzZVhvcikqICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfT1IpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VCaXR3aXNlWG9yKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VCaXR3aXNlWG9yOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VCaXR3aXNlQW5kKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQml0d2lzZVhvciA6IEJpdHdpc2VBbmQgKCdiLXhvcicgQml0d2lzZUFuZCkqICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX1hPUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUJpdHdpc2VBbmQoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VBbmQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZU5vdCgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEJpdHdpc2VBbmQgOiBOb3QgKCdiLWFuZCcgTm90KSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9BTkQpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VOb3QoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU5vdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTm90IDogJ25vdCcgQ29tcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5OT1QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VDb21wKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBudWxsO1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgIHwgQ29tcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gdGhpcy5wYXJzZUNvbXAoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VDb21wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VBZGRTdWIoKSwgcmlnaHQsIG5vZGUsIHN3YXA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBDb21wIDogQWRkU3ViICdpcycgJ25vdCc/ICgnZGVmaW5lZCcgfCAnbnVsbCcgfCAuLi4pICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdC8qKi8gaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuSVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHQvKiBzd2FwICdpcycgYW5kICdub3QnICovXG5cdFx0XHRzd2FwID0gbm9kZTtcblx0XHRcdC8qIHN3YXAgJ2lzJyBhbmQgJ25vdCcgKi9cblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSlcblx0XHRcdHtcblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHRcdFx0bm9kZS5ub2RlUmlnaHQgPSBzd2FwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JU19YWFgpKVxuXHRcdFx0e1xuXHRcdFx0XHRyaWdodCA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRzd2FwLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdFx0c3dhcC5ub2RlUmlnaHQgPSByaWdodDtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBrZXl3b3JkIGBkZWZpbmVkYCwgYG51bGxgLCBgZW1wdHlgLCBgaXRlcmFibGVgLCBgZXZlbmAgb3IgYG9kZGAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICgnPT09JyB8ICc9PScgfCAuLi4pIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAoJ3N0YXJ0cycgfCAnZW5kcycpIGB3aXRoYCBBZGRTdWIgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlhYWF9XSVRIKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAnbWF0Y2hlcycgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk1BVENIRVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICdpbicgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuSU4pKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUFkZFN1YjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTXVsRGl2KCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQWRkU3ViIDogTXVsRGl2ICgoJysnIHwgJy0nKSBNdWxEaXYpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QTFVTX01JTlVTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTXVsRGl2KCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VNdWxEaXY6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZVBsdXNNaW51cygpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE11bERpdiA6IFBsdXNNaW51cyAoKCcqJyB8ICcvLycgfCAnLycgfCAnJScpIFBsdXNNaW51cykqICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTVVMX0ZMRElWX0RJVl9NT0QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VQbHVzTWludXMoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVBsdXNNaW51czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogUGx1c01pbnVzIDogKCctJyB8ICcrJykgUG93ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QTFVTX01JTlVTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlUG93ZXIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IG51bGw7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgICAgICAgfCBEb3QxICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiB0aGlzLnBhcnNlUG93ZXIoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VQb3dlcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlRG90MSgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFBvd2VyIDogRG90MSAoJyoqJyBEb3QxKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVIpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VEb3QxKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VEb3QxOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGNvbnN0IG5vZGUgPSB0aGlzLnBhcnNlRG90Mihpc0ZpbHRlcik7XG5cblx0XHRpZihub2RlKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGxldCB0ZW1wID0gbm9kZTtcblxuXHRcdFx0Zm9yKDsgdGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5ET1Q7IHRlbXAgPSB0ZW1wLm5vZGVMZWZ0KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGVtcC5xKVxuXHRcdFx0e1xuXHRcdFx0XHQvKiovIGlmKHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuRlVOKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYodGVtcC5ub2RlVmFsdWUgaW4gYW1pVHdpZy5zdGRsaWIpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAnYW1pVHdpZy5zdGRsaWIuJyArIHRlbXAubm9kZVZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAvKi0tLSovJ18uJy8qLS0tKi8gKyB0ZW1wLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZih0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRlbXAubm9kZVZhbHVlID0gLyotLS0qLydfLicvKi0tLSovICsgdGVtcC5ub2RlVmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0ZW1wLnEgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHRyZXR1cm4gbm9kZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VEb3QyOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZURvdDMoaXNGaWx0ZXIpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIERvdDIgOiBEb3QzICgnLicgRG90MykqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuRE9UKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksICcuJyk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZURvdDMoaXNGaWx0ZXIpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRG90MzogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VYKGlzRmlsdGVyKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBwYXJzZURvdDMgOiBYICgnWycgRmlsdGVyICddJykqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxCMSkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VGaWx0ZXIoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIxKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoYW1pVHdpZy5leHByLnRva2Vucy5ET1QsICdbXScpO1xuXG5cdFx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGBdYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICAgICB8IFggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VYOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogWCA6IEdyb3VwIHwgQXJyYXkgfCBPYmplY3QgfCBGdW5WYXIgfCBUZXJtaW5hbCAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VHcm91cCgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlQXJyYXkoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZU9iamVjdCgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlRnVuVmFyKGlzRmlsdGVyKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZVRlcm1pbmFsKCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBTWU5UQVggRVJST1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgc3ludGF4IGVycm9yIG9yIHR1bmNhdGVkIGV4cHJlc3Npb24nO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlR3JvdXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogR3JvdXAgOiAnKCcgRmlsdGVyICcpJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MUCkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRub2RlID0gdGhpcy5wYXJzZUZpbHRlcigpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SUCkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgKWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQXJyYXk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBub2RlLCBsaXN0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQXJyYXkgOiAnWycgU2luZ2xldHMgJ10nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MQjEpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0bGlzdCA9IHRoaXMuX3BhcnNlU2luZ2xldHMoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIxKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoYW1pVHdpZy5leHByLnRva2Vucy5MU1QsICdBcnJheScpO1xuXG5cdFx0XHRcdG5vZGUubGlzdCA9IGxpc3Q7XG5cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYF1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU9iamVjdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGUsIGRpY3Q7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBPYmplY3QgOiAneycgRG91YmxldHMgJ30nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxCMikpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRkaWN0ID0gdGhpcy5fcGFyc2VEb3VibGV0cygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjIpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkRJQywgJ09iamVjdCcpO1xuXG5cdFx0XHRcdG5vZGUuZGljdCA9IGRpY3Q7XG5cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYH1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUZ1blZhcjogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbm9kZTtcblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlNJRCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSgwLCBpc0ZpbHRlciA/ICdmaWx0ZXJfJyArIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpIDogdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXG5cdFx0XHRub2RlLnEgPSB0cnVlO1xuXG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGdW5WYXIgOiBTSUQgJygnIFNpbmdsZXRzICcpJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0LyoqLyBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MUCkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlLmxpc3QgPSB0aGlzLl9wYXJzZVNpbmdsZXRzKCk7XG5cblx0XHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUlApKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdFx0bm9kZS5ub2RlVHlwZSA9IGFtaVR3aWcuZXhwci50b2tlbnMuRlVOO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYClgIGV4cGVjdGVkJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogICAgICAgIHwgU0lEICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0bm9kZS5ub2RlVHlwZSA9IGlzRmlsdGVyID8gYW1pVHdpZy5leHByLnRva2Vucy5GVU5cblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgIDogYW1pVHdpZy5leHByLnRva2Vucy5WQVJcblx0XHRcdFx0O1xuXG5cdFx0XHRcdG5vZGUubGlzdCA9IFtdO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlU2luZ2xldHM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUlgpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aGlzLl9wYXJzZVNpbmdsZXQocmVzdWx0KTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ09NTUEpID09PSB0cnVlKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9wYXJzZURvdWJsZXRzOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSB7fTtcblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMikgPT09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHRoaXMuX3BhcnNlRG91YmxldChyZXN1bHQpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DT01NQSkgPT09IHRydWUpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlU2luZ2xldDogZnVuY3Rpb24ocmVzdWx0KVxuXHR7XG5cdFx0cmVzdWx0LnB1c2godGhpcy5wYXJzZUZpbHRlcigpKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlRG91YmxldDogZnVuY3Rpb24ocmVzdWx0KVxuXHR7XG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwpKVxuXHRcdHtcblx0XHRcdGNvbnN0IGtleSA9IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DT0xPTikpXG5cdFx0XHR7XG4vKlx0XHRcdFx0Y29uc3QgY29sb24gPSB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKTtcbiAqL1x0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHRba2V5XSA9IHRoaXMucGFyc2VGaWx0ZXIoKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYDpgIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgdGVybWluYWwgZXhwZWN0ZWQnO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VUZXJtaW5hbDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQsIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogVGVybWluYWwgOiBURVJNSU5BTCB8IFJBTkdFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCkpXG5cdFx0e1xuXHRcdFx0bGVmdCA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJBTkdFKSlcblx0XHRcdHtcblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyaWdodCA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBsZWZ0O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5Ob2RlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuTm9kZSA9IGZ1bmN0aW9uKG5vZGVUeXBlLCBub2RlVmFsdWUpIHtcblxuXHR0aGlzLiRpbml0KG5vZGVUeXBlLCBub2RlVmFsdWUpO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLk5vZGUucHJvdG90eXBlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKG5vZGVUeXBlLCBub2RlVmFsdWUpXG5cdHtcblx0XHR0aGlzLm5vZGVUeXBlID0gbm9kZVR5cGU7XG5cdFx0dGhpcy5ub2RlVmFsdWUgPSBub2RlVmFsdWU7XG5cdFx0dGhpcy5ub2RlTGVmdCA9IG51bGw7XG5cdFx0dGhpcy5ub2RlUmlnaHQgPSBudWxsO1xuXHRcdHRoaXMubGlzdCA9IG51bGw7XG5cdFx0dGhpcy5kaWN0ID0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2R1bXA6IGZ1bmN0aW9uKG5vZGVzLCBlZGdlcywgcENudClcblx0e1xuXHRcdGxldCBDTlQ7XG5cblx0XHRjb25zdCBjbnQgPSBwQ250WzBdO1xuXG5cdFx0bm9kZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIFtsYWJlbD1cIicgKyB0aGlzLm5vZGVWYWx1ZS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCJdOycpO1xuXG5cdFx0aWYodGhpcy5ub2RlTGVmdClcblx0XHR7XG5cdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnOycpO1xuXHRcdFx0dGhpcy5ub2RlTGVmdC5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMubm9kZVJpZ2h0KVxuXHRcdHtcblx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICc7Jyk7XG5cdFx0XHR0aGlzLm5vZGVSaWdodC5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMubGlzdClcblx0XHR7XG5cdFx0XHRmb3IoY29uc3QgaSBpbiB0aGlzLmxpc3QpXG5cdFx0XHR7XG5cdFx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJyBbbGFiZWw9XCJbJyArIGkucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ11cIl07Jyk7XG5cdFx0XHRcdHRoaXMubGlzdFtpXS5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmKHRoaXMuZGljdClcblx0XHR7XG5cdFx0XHRmb3IoY29uc3QgaSBpbiB0aGlzLmRpY3QpXG5cdFx0XHR7XG5cdFx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJyBbbGFiZWw9XCJbJyArIGkucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ11cIl07Jyk7XG5cdFx0XHRcdHRoaXMuZGljdFtpXS5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZHVtcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3Qgbm9kZXMgPSBbXTtcblx0XHRjb25zdCBlZGdlcyA9IFtdO1xuXG5cdFx0dGhpcy5fZHVtcChub2RlcywgZWRnZXMsIFswXSk7XG5cblx0XHRyZXR1cm4gJ2RpZ3JhcGggYXN0IHtcXG5cXHRyYW5rZGlyPVRCO1xcbicgKyBub2Rlcy5qb2luKCdcXG4nKSArICdcXG4nICsgZWRnZXMuam9pbignXFxuJykgKyAnXFxufSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLypcbiAqIEFNSSBUd2lnIEVuZ2luZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE5IFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy50bXBsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG1wbCA9IHt9O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy50bXBsLkNvbXBpbGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG1wbC5Db21waWxlciA9IGZ1bmN0aW9uKHRtcGwpIHtcblxuXHR0aGlzLiRpbml0KHRtcGwpO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsLkNvbXBpbGVyLnByb3RvdHlwZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFNUQVRFTUVOVF9SRTogL1xceyVcXHMqKFthLXpBLVpdKylcXHMqKCg/Oi58XFxuKSo/KVxccyolXFx9LyxcblxuXHRDT01NRU5UX1JFOiAvXFx7I1xccyooKD86LnxcXG4pKj8pXFxzKiNcXH0vZyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2NvdW50OiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0bGV0IHJlc3VsdCA9IDA7XG5cblx0XHRjb25zdCBsID0gcy5sZW5ndGg7XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSsrKVxuXHRcdHtcblx0XHRcdGlmKHNbaV0gPT09ICdcXG4nKSByZXN1bHQrKztcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24odG1wbClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGxpbmUgPSAxO1xuXG5cdFx0bGV0IGNvbHVtbjtcblx0XHRsZXQgQ09MVU1OO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnJvb3ROb2RlID0ge1xuXHRcdFx0bGluZTogbGluZSxcblx0XHRcdGtleXdvcmQ6ICdAcm9vdCcsXG5cdFx0XHRleHByZXNzaW9uOiAnJyxcblx0XHRcdGJsb2NrczogW3tcblx0XHRcdFx0ZXhwcmVzc2lvbjogJ0B0cnVlJyxcblx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHR9XSxcblx0XHRcdHZhbHVlOiAnJyxcblx0XHR9O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBzdGFjazEgPSBbdGhpcy5yb290Tm9kZV07XG5cdFx0Y29uc3Qgc3RhY2syID0gWzB4MDAwMDAwMDAwMDBdO1xuXG5cdFx0bGV0IGl0ZW07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGZvcih0bXBsID0gdG1wbC5yZXBsYWNlKHRoaXMuQ09NTUVOVF9SRSwgJycpOzsgdG1wbCA9IHRtcGwuc3Vic3RyKENPTFVNTikpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgY3VyciA9IHN0YWNrMVtzdGFjazEubGVuZ3RoIC0gMV07XG5cdFx0XHQgbGV0ICBpbmR4ID0gc3RhY2syW3N0YWNrMi5sZW5ndGggLSAxXTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgbSA9IHRtcGwubWF0Y2godGhpcy5TVEFURU1FTlRfUkUpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihtID09PSBudWxsKVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGluZSArPSB0aGlzLl9jb3VudCh0bXBsKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKHtcblx0XHRcdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0XHRcdGtleXdvcmQ6ICdAdGV4dCcsXG5cdFx0XHRcdFx0ZXhwcmVzc2lvbjogJycsXG5cdFx0XHRcdFx0YmxvY2tzOiBbXSxcblx0XHRcdFx0XHR2YWx1ZTogdG1wbCxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGVycm9ycyA9IFtdO1xuXG5cdFx0XHRcdGZvcihsZXQgaSA9IHN0YWNrMS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0LyoqLyBpZihzdGFjazFbaV0ua2V5d29yZCA9PT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRlcnJvcnMucHVzaCgnbWlzc2luZyBrZXl3b3JkIGBlbmRpZmAnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZihzdGFjazFbaV0ua2V5d29yZCA9PT0gJ2ZvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdCBcdGVycm9ycy5wdXNoKCdtaXNzaW5nIGtleXdvcmQgYGVuZGZvcmAnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihlcnJvcnMubGVuZ3RoID4gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsICcgKyBlcnJvcnMuam9pbignLCAnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgbWF0Y2ggPSBtWzBdO1xuXHRcdFx0Y29uc3Qga2V5d29yZCA9IG1bMV07XG5cdFx0XHRjb25zdCBleHByZXNzaW9uID0gbVsyXTtcblxuXHRcdFx0Y29sdW1uID0gbS5pbmRleCArIDB4MDAwMDAwMDAwMDtcblx0XHRcdENPTFVNTiA9IG0uaW5kZXggKyBtYXRjaC5sZW5ndGg7XG5cblx0XHRcdGNvbnN0IHZhbHVlID0gdG1wbC5zdWJzdHIoMCwgY29sdW1uKTtcblx0XHRcdGNvbnN0IFZBTFVFID0gdG1wbC5zdWJzdHIoMCwgQ09MVU1OKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGluZSArPSB0aGlzLl9jb3VudChWQUxVRSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHZhbHVlKVxuXHRcdFx0e1xuXHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0a2V5d29yZDogJ0B0ZXh0Jyxcblx0XHRcdFx0XHRleHByZXNzaW9uOiAnJyxcblx0XHRcdFx0XHRibG9ja3M6IFtdLFxuXHRcdFx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0c3dpdGNoKGtleXdvcmQpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdmbHVzaCc6XG5cdFx0XHRcdGNhc2UgJ2F1dG9lc2NhcGUnOlxuXHRcdFx0XHRjYXNlICdzcGFjZWxlc3MnOlxuXHRcdFx0XHRjYXNlICd2ZXJiYXRpbSc6XG5cblx0XHRcdFx0XHQvKiBJR05PUkUgKi9cblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdkbyc6XG5cdFx0XHRcdGNhc2UgJ3NldCc6XG5cdFx0XHRcdGNhc2UgJ2luY2x1ZGUnOlxuXG5cdFx0XHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0XHRrZXl3b3JkOiBrZXl3b3JkLFxuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogZXhwcmVzc2lvbixcblx0XHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0XHR2YWx1ZTogJycsXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaChpdGVtKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdpZic6XG5cdFx0XHRcdGNhc2UgJ2Zvcic6XG5cblx0XHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRcdGtleXdvcmQ6IGtleXdvcmQsXG5cdFx0XHRcdFx0XHRibG9ja3M6IFt7XG5cdFx0XHRcdFx0XHRcdGV4cHJlc3Npb246IGV4cHJlc3Npb24sXG5cdFx0XHRcdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0XHRcdFx0fV0sXG5cdFx0XHRcdFx0XHR2YWx1ZTogJycsXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaChpdGVtKTtcblxuXHRcdFx0XHRcdHN0YWNrMS5wdXNoKGl0ZW0pO1xuXHRcdFx0XHRcdHN0YWNrMi5wdXNoKDB4MDApO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2Vsc2VpZic6XG5cblx0XHRcdFx0XHRpZihjdXJyWydrZXl3b3JkJ10gIT09ICdpZicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbHNlaWZgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpbmR4ID0gY3Vyci5ibG9ja3MubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3MucHVzaCh7XG5cdFx0XHRcdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRzdGFjazJbc3RhY2syLmxlbmd0aCAtIDFdID0gaW5keDtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbHNlJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVsc2VgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpbmR4ID0gY3Vyci5ibG9ja3MubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3MucHVzaCh7XG5cdFx0XHRcdFx0XHRleHByZXNzaW9uOiAnQHRydWUnLFxuXHRcdFx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRzdGFjazJbc3RhY2syLmxlbmd0aCAtIDFdID0gaW5keDtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbmRpZic6XG5cblx0XHRcdFx0XHRpZihjdXJyWydrZXl3b3JkJ10gIT09ICdpZicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbmRpZmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHN0YWNrMS5wb3AoKTtcblx0XHRcdFx0XHRzdGFjazIucG9wKCk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZW5kZm9yJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2ZvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbmRmb3JgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzdGFjazEucG9wKCk7XG5cdFx0XHRcdFx0c3RhY2syLnBvcCgpO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmtub3duIGtleXdvcmQgYCcgKyBrZXl3b3JkICsgJ2AnO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZHVtcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMucm9vdE5vZGUsIG51bGwsIDIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qXG4gKiBBTUkgVHdpZyBFbmdpbmVcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxOSBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZW5naW5lICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmVuZ2luZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFZBUklBQkxFX1JFOiAvXFx7XFx7XFxzKiguKj8pXFxzKlxcfVxcfS9nLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcmVuZGVyOiBmdW5jdGlvbihyZXN1bHQsIGl0ZW0sIGRpY3QgPSB7fSlcblx0e1xuXHRcdGxldCBtO1xuXG5cdFx0bGV0IGV4cHJlc3Npb247XG5cblx0XHR0aGlzLmRpY3QgPSBkaWN0O1xuXG5cdFx0c3dpdGNoKGl0ZW0ua2V5d29yZClcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRE8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2RvJzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGl0ZW0uZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTRVQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnc2V0Jzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdG0gPSBpdGVtLmV4cHJlc3Npb24ubWF0Y2goLyhbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzKj1cXHMqKC4rKS8pXG5cblx0XHRcdFx0aWYoIW0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIGludmFsaWQgYHNldGAgc3RhdGVtZW50Jztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRkaWN0W21bMV1dID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwobVsyXSwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBAVEVYVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnQHRleHQnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbS52YWx1ZS5yZXBsYWNlKHRoaXMuVkFSSUFCTEVfUkUsIGZ1bmN0aW9uKG1hdGNoLCBleHByZXNzaW9uKSB7XG5cblx0XHRcdFx0XHRsZXQgdmFsdWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6ICcnO1xuXHRcdFx0XHR9KSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSUYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2lmJzpcblx0XHRcdGNhc2UgJ0Byb290Jzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGl0ZW0uYmxvY2tzLmV2ZXJ5KChibG9jaykgPT4ge1xuXG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IGJsb2NrLmV4cHJlc3Npb247XG5cblx0XHRcdFx0XHRpZihleHByZXNzaW9uID09PSAnQHRydWUnIHx8IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0YmxvY2subGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgaXRlbSwgZGljdCk7XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnZm9yJzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdG0gPSBpdGVtLmJsb2Nrc1swXS5leHByZXNzaW9uLm1hdGNoKC8oW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccytpblxccysoLispLylcblxuXHRcdFx0XHRpZighbSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgaW52YWxpZCBgZm9yYCBzdGF0ZW1lbnQnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IHN5bWIgPSBtWzFdO1xuXHRcdFx0XHRjb25zdCBleHByID0gbVsyXTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IHZhbHVlID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwciwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgdHlwZU5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuXG5cdFx0XHRcdGlmKHR5cGVOYW1lID09PSAnW29iamVjdCBPYmplY3RdJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHZhbHVlID0gT2JqZWN0LmtleXModmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKHR5cGVOYW1lICE9PSAnW29iamVjdCBBcnJheV0nXG5cdFx0XHRcdFx0ICAgJiZcblx0XHRcdFx0XHQgICB0eXBlTmFtZSAhPT0gJ1tvYmplY3QgU3RyaW5nXSdcblx0XHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIHJpZ2h0IG9wZXJhbmRlIG5vdCBpdGVyYWJsZSc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IG9sZDEgPSBkaWN0WyhzeW1iKV07XG5cdFx0XHRcdGNvbnN0IG9sZDIgPSBkaWN0Wydsb29wJ107XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBrID0gMHgwMDAwMDAwMDAwO1xuXHRcdFx0XHRjb25zdCBsID0gdmFsdWUubGVuZ3RoO1xuXG5cdFx0XHRcdGRpY3QubG9vcCA9IHtsZW5ndGg6IGx9O1xuXG5cdFx0XHRcdGNvbnN0IGxpc3QgPSBpdGVtLmJsb2Nrc1swXS5saXN0O1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIHZhbHVlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZGljdFtzeW1iXSA9IHZhbHVlW2ldO1xuXG5cdFx0XHRcdFx0ZGljdC5sb29wLmZpcnN0ID0gKGsgPT09ICgwIC0gMCkpO1xuXHRcdFx0XHRcdGRpY3QubG9vcC5sYXN0ID0gKGsgPT09IChsIC0gMSkpO1xuXG5cdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4MCA9IGs7XG5cdFx0XHRcdFx0aysrO1xuXHRcdFx0XHRcdGRpY3QubG9vcC5pbmRleCA9IGs7XG5cblx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBsaXN0KVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGxpc3Rbal0sIGRpY3QpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRkaWN0Wydsb29wJ10gPSBvbGQyO1xuXHRcdFx0XHRkaWN0WyhzeW1iKV0gPSBvbGQxO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElOQ0xVREUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdpbmNsdWRlJzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBtXzFfID0gaXRlbS5leHByZXNzaW9uLCB3aXRoX3N1YmV4cHIsIHdpdGhfY29udGV4dDtcblxuXHRcdFx0XHQvKiovIGlmKChtID0gbV8xXy5tYXRjaCgvKC4rKVxccyt3aXRoXFxzKyguKylcXHMrb25seSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSBtWzJdO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYoKG0gPSBtXzFfLm1hdGNoKC8oLispXFxzK3dpdGhcXHMrKC4rKSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSBtWzJdO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZigobSA9IG1fMV8ubWF0Y2goLyguKylcXHMrb25seSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSAne30nO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtXzFfO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9ICd7fSc7XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBmaWxlTmFtZSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCkgfHwgJyc7XG5cblx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZpbGVOYW1lKSAhPT0gJ1tvYmplY3QgU3RyaW5nXScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBzdHJpbmcgZXhwZWN0ZWQnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IHZhcmlhYmxlcyA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKHdpdGhfc3ViZXhwciwgaXRlbS5saW5lLCBkaWN0KSB8fCB7fTtcblxuXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFyaWFibGVzKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBvYmplY3QgZXhwZWN0ZWQnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGFtaVR3aWcuc3RkbGliLmluY2x1ZGUoXG5cdFx0XHRcdFx0ZmlsZU5hbWUsXG5cdFx0XHRcdFx0dmFyaWFibGVzLFxuXHRcdFx0XHRcdHdpdGhfY29udGV4dCxcblx0XHRcdFx0XHRmYWxzZVxuXHRcdFx0XHQpKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlbmRlcjogZnVuY3Rpb24odG1wbCwgZGljdCA9IHt9KVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHRzd2l0Y2goT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRtcGwpKVxuXHRcdHtcblx0XHRcdGNhc2UgJ1tvYmplY3QgU3RyaW5nXSc6XG5cdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIG5ldyBhbWlUd2lnLnRtcGwuQ29tcGlsZXIodG1wbCkucm9vdE5vZGUsIGRpY3QpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnW29iamVjdCBPYmplY3RdJzpcblx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgLyotLS0tLS0tLS0tLS0tLSovdG1wbC8qLS0tLS0tLS0tLS0tLS0qLywgZGljdCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLypcbiAqIEFNSSBUd2lnIEVuZ2luZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE5IFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLmNhY2hlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5jYWNoZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGRpY3Q6IHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRldmFsOiBmdW5jdGlvbihleHByZXNzaW9uLCBsaW5lLCBfKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgZjtcblxuXHRcdGlmKGV4cHJlc3Npb24gaW4gdGhpcy5kaWN0KVxuXHRcdHtcblx0XHRcdGYgPSB0aGlzLmRpY3RbZXhwcmVzc2lvbl07XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRmID0gdGhpcy5kaWN0W2V4cHJlc3Npb25dID0gZXZhbChcblx0XHRcdFx0YW1pVHdpZy5leHByLmludGVycHJldGVyLmdldEpTKFxuXHRcdFx0XHRcdG5ldyBhbWlUd2lnLmV4cHIuQ29tcGlsZXIoZXhwcmVzc2lvbiwgbGluZSlcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKCFfKSBfID0ge307XG5cblx0XHRyZXR1cm4gZi5jYWxsKF8sIF8pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLypcbiAqIEFNSSBUd2lnIEVuZ2luZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE5IFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5kYXRlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qIFRPRE8gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLypcbiAqIEFNSSBUd2lnIEVuZ2luZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE5IFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5hamF4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuYWpheCA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGRpY3Q6IHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXQ6IGZ1bmN0aW9uKHVybCwgZG9uZSwgZmFpbClcblx0e1xuXHRcdGxldCB0eHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHVybCBpbiB0aGlzLmRpY3QpXG5cdFx0e1xuXHRcdFx0aWYoZG9uZSlcblx0XHRcdHtcblx0XHRcdFx0ZG9uZSh0aGlzLmRpY3RbdXJsXSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKGFtaVR3aWcuZnMpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIE5PREVKUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0cnlcblx0XHRcdHtcblx0XHRcdFx0dHh0ID0gdGhpcy5kaWN0W3VybF0gPSBhbWlUd2lnLmZzLnJlYWRGaWxlU3luYyh1cmwsICd1dGY4Jyk7XG5cblx0XHRcdFx0aWYoZG9uZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGRvbmUodHh0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y2F0Y2goZXJyKVxuXHRcdFx0e1xuXHRcdFx0XHRpZihmYWlsKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZmFpbChlcnIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQlJPV1NFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IHhtbEh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cblx0XHRcdHhtbEh0dHBSZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgZmFsc2UpO1xuXHRcdFx0eG1sSHR0cFJlcXVlc3Quc2VuZCgpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih4bWxIdHRwUmVxdWVzdC5zdGF0dXMgPT09IDIwMClcblx0XHRcdHtcblx0XHRcdFx0dHh0ID0gdGhpcy5kaWN0W3VybF0gPSB4bWxIdHRwUmVxdWVzdC5yZXNwb25zZVRleHQ7XG5cblx0XHRcdFx0aWYoZG9uZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGRvbmUodHh0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0eHQgPSAvKioqKioqKioqKioqKiovIHhtbEh0dHBSZXF1ZXN0LnJlc3BvbnNlVGV4dDtcblxuXHRcdFx0XHRpZihmYWlsKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZmFpbCh0eHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLypcbiAqIEFNSSBUd2lnIEVuZ2luZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE5IFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5zdGRsaWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuc3RkbGliID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFZBUklBQkxFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc1VuZGVmaW5lZCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCA9PT0gdW5kZWZpbmVkO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNEZWZpbmVkJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ICE9PSB1bmRlZmluZWQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc051bGwnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggPT09IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc05vdE51bGwnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggIT09IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0VtcHR5JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGlmKHggPT09IG51bGxcblx0XHQgICB8fFxuXHRcdCAgIHggPT09IGZhbHNlXG5cdFx0ICAgfHxcblx0XHQgICB4ID09PSAoKCcnKSlcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KTtcblxuXHRcdHJldHVybiAodHlwZU5hbWUgPT09ICdbb2JqZWN0IEFycmF5XScgJiYgeC5sZW5ndGggPT09IDApXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgICh0eXBlTmFtZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgJiYgT2JqZWN0LmtleXMoeCkubGVuZ3RoID09PSAwKVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTnVtYmVyJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IE51bWJlcl0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNTdHJpbmcnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0FycmF5JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc09iamVjdCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBPYmplY3RdJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzSXRlcmFibGUnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0Y29uc3QgdHlwZU5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCk7XG5cblx0XHRyZXR1cm4gdHlwZU5hbWUgPT09ICdbb2JqZWN0IFN0cmluZ10nXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHR5cGVOYW1lID09PSAnW29iamVjdCBBcnJheV0nXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHR5cGVOYW1lID09PSAnW29iamVjdCBPYmplY3RdJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzRXZlbic6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc051bWJlcih4KSAmJiAoeCAmIDEpID09PSAwO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNPZGQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNOdW1iZXIoeCkgJiYgKHggJiAxKSA9PT0gMTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIElURVJBQkxFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0luT2JqZWN0JzogZnVuY3Rpb24oeCwgeSlcblx0e1xuXHRcdGlmKHRoaXMuaXNBcnJheSh5KVxuXHRcdCAgIHx8XG5cdFx0ICAgdGhpcy5pc1N0cmluZyh5KVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB5LmluZGV4T2YoeCkgPj0gMDtcblx0XHR9XG5cblx0XHRpZih0aGlzLmlzT2JqZWN0KHkpKVxuXHRcdHtcblx0XHRcdHJldHVybiB4IGluIHk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNJblJhbmdlJzogZnVuY3Rpb24oeCwgeDEsIHgyKVxuXHR7XG5cdFx0aWYodGhpcy5pc051bWJlcih4MSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNOdW1iZXIoeDIpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuICgvKi0tLSoveC8qLS0tKi8gPj0gLyotLS0qL3gxLyotLS0qLylcblx0XHRcdCAgICAgICAmJlxuXHRcdFx0ICAgICAgICgvKi0tLSoveC8qLS0tKi8gPD0gLyotLS0qL3gyLyotLS0qLylcblx0XHRcdDtcblx0XHR9XG5cblx0XHRpZih0aGlzLmlzU3RyaW5nKHgxKSAmJiB4MS5sZW5ndGggPT09IDFcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoeDIpICYmIHgyLmxlbmd0aCA9PT0gMVxuXHRcdCApIHtcblx0XHRcdHJldHVybiAoeC5jaGFyQ29kZUF0KDApID49IHgxLmNoYXJDb2RlQXQoMCkpXG5cdFx0XHQgICAgICAgJiZcblx0XHRcdCAgICAgICAoeC5jaGFyQ29kZUF0KDApIDw9IHgyLmNoYXJDb2RlQXQoMCkpXG5cdFx0XHQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQncmFuZ2UnOiBmdW5jdGlvbih4MSwgeDIsIHN0ZXAgPSAxKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHQvKiovIGlmKHRoaXMuaXNOdW1iZXIoeDEpXG5cdFx0ICAgICAgICAmJlxuXHRcdCAgICAgICAgdGhpcy5pc051bWJlcih4Milcblx0XHQgKSB7XG5cdFx0XHRmb3IobGV0IGkgPSAvKi0tLSoveDEvKi0tLSovOyBpIDw9IC8qLS0tKi94Mi8qLS0tKi87IGkgKz0gc3RlcClcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0LnB1c2goLyotLS0tLS0tLS0tLS0tLS0qLyhpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYodGhpcy5pc1N0cmluZyh4MSkgJiYgeDEubGVuZ3RoID09PSAxXG5cdFx0ICAgICAgICAmJlxuXHRcdCAgICAgICAgdGhpcy5pc1N0cmluZyh4MikgJiYgeDIubGVuZ3RoID09PSAxXG5cdFx0ICkge1xuXHRcdFx0Zm9yKGxldCBpID0geDEuY2hhckNvZGVBdCgwKTsgaSA8PSB4Mi5jaGFyQ29kZUF0KDApOyBpICs9IHN0ZXApXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoaSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbGVuZ3RoJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoeClcblx0XHQgICB8fFxuXHRcdCAgIHRoaXMuaXNBcnJheSh4KVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB4Lmxlbmd0aDtcblx0XHR9XG5cblx0XHRpZih0aGlzLmlzT2JqZWN0KHgpKVxuXHRcdHtcblx0XHRcdHJldHVybiBPYmplY3Qua2V5cyh4KS5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIDA7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfZmlyc3QnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLmlzU3RyaW5nKHgpIHx8IHRoaXMuaXNBcnJheSh4KSkgJiYgeC5sZW5ndGggPiAwID8geFsweDAwMDAwMDAwMDBdIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbGFzdCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMuaXNTdHJpbmcoeCkgfHwgdGhpcy5pc0FycmF5KHgpKSAmJiB4Lmxlbmd0aCA+IDAgPyB4W3gubGVuZ3RoIC0gMV0gOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9zbGljZSc6IGZ1bmN0aW9uKHgsIGlkeDEsIGlkeDIpXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMuaXNTdHJpbmcoeCkgfHwgdGhpcy5pc0FycmF5KHgpKSA/IHguc2xpY2UoaWR4MSwgaWR4MikgOiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX21lcmdlJzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc1N0cmluZyhhcmd1bWVudHNbMF0pKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYXJndW1lbnRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzU3RyaW5nKGl0ZW0pKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdEwucHVzaChhcmd1bWVudHNbaV0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIEwuam9pbignJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRoaXMuaXNBcnJheShhcmd1bWVudHNbMF0pKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYXJndW1lbnRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzQXJyYXkoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gaXRlbSkgTC5wdXNoKGl0ZW1bal0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIEw7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRoaXMuaXNPYmplY3QoYXJndW1lbnRzWzBdKSlcblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgRCA9IHt9O1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFyZ3VtZW50cylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGl0ZW0gPSBhcmd1bWVudHNbaV07XG5cblx0XHRcdFx0XHRpZighdGhpcy5pc09iamVjdChpdGVtKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBpdGVtKSBEW2pdID0gaXRlbVtqXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBEO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NvcnQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHguc29ydCgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfcmV2ZXJzZSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5yZXZlcnNlKCkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9qb2luJzogZnVuY3Rpb24oeCwgc2VwKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHguam9pbihzZXApIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfa2V5cyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc09iamVjdCh4KSA/IE9iamVjdC5rZXlzKHgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBTVFJJTkdTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnc3RhcnRzV2l0aCc6IGZ1bmN0aW9uKHMxLCBzMilcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoczEpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHMyKVxuXHRcdCApIHtcblx0XHRcdGNvbnN0IGJhc2UgPSAweDAwMDAwMDAwMDAwMDAwMDAwMDA7XG5cblx0XHRcdHJldHVybiBzMS5pbmRleE9mKHMyLCBiYXNlKSA9PT0gYmFzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdlbmRzV2l0aCc6IGZ1bmN0aW9uKHMxLCBzMilcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoczEpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHMyKVxuXHRcdCApIHtcblx0XHRcdGNvbnN0IGJhc2UgPSBzMS5sZW5ndGggLSBzMi5sZW5ndGg7XG5cblx0XHRcdHJldHVybiBzMS5pbmRleE9mKHMyLCBiYXNlKSA9PT0gYmFzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdtYXRjaCc6IGZ1bmN0aW9uKHMsIHJlZ2V4KVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZygoKHMpKSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcocmVnZXgpXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgaWR4MSA9IHJlZ2V4LiAgaW5kZXhPZiAgKCcvJyk7XG5cdFx0XHRjb25zdCBpZHgyID0gcmVnZXgubGFzdEluZGV4T2YoJy8nKTtcblxuXHRcdFx0aWYoaWR4MSA9PT0gMCB8fCBpZHgxIDwgaWR4Milcblx0XHRcdHtcblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFJlZ0V4cChyZWdleC5zdWJzdHJpbmcoaWR4MSArIDEsIGlkeDIpLCByZWdleC5zdWJzdHJpbmcoaWR4MiArIDEpKS50ZXN0KHMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoKGVycilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8qIElHTk9SRSAqL1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2RlZmF1bHQnOiBmdW5jdGlvbihzMSwgczIpXG5cdHtcblx0XHRyZXR1cm4gczEgfHwgczIgfHwgJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbG93ZXInOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnRvTG93ZXJDYXNlKCkgOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl91cHBlcic6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudG9VcHBlckNhc2UoKSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2NhcGl0YWxpemUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gcy50cmltKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9eXFxTL2csIGZ1bmN0aW9uKGMpIHtcblxuXHRcdFx0XHRyZXR1cm4gYy50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3RpdGxlJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcocykpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHMudHJpbSgpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvKD86XnxcXHMpXFxTL2csIGZ1bmN0aW9uKGMpIHtcblxuXHRcdFx0XHRyZXR1cm4gYy50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3RyaW0nOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnRyaW0oKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfcmVwbGFjZSc6IGZ1bmN0aW9uKHMsIG9sZFN0cnMsIG5ld1N0cnMpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdGNvbnN0IGwgPSAoKChzKSkpLmxlbmd0aDtcblx0XHRjb25zdCBtID0gb2xkU3Rycy5sZW5ndGg7XG5cdFx0Y29uc3QgbiA9IG5ld1N0cnMubGVuZ3RoO1xuXG5cdFx0aWYobSAhPSBuKVxuXHRcdHtcblx0XHRcdHRocm93ICdpbnRlcm5hbCBlcnJvcic7XG5cdFx0fVxuXG5fX2wwOlx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSArPSAwKVxuXHRcdHtcblx0XHRcdGNvbnN0IHAgPSBzLnN1YnN0cmluZyhpKTtcblxuXHRcdFx0Zm9yKGxldCBqID0gMDsgaiA8IG07IGogKz0gMSlcblx0XHRcdHtcblx0XHRcdFx0aWYocC5pbmRleE9mKG9sZFN0cnNbal0pID09PSAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gobmV3U3Ryc1tqXSk7XG5cblx0XHRcdFx0XHRpICs9IG9sZFN0cnNbal0ubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Y29udGludWUgX19sMDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXN1bHQucHVzaChzLmNoYXJBdChpKyspKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3RleHRUb0h0bWxYJzogWycmJyAgICAsICdcIicgICAgICwgJzwnICAgLCAnPicgICBdLFxuXHQnX3RleHRUb0h0bWxZJzogWycmYW1wOycsICcmcXVvdDsnLCAnJmx0OycsICcmZ3Q7J10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfdGV4dFRvU3RyaW5nWCc6IFsnXFxcXCcgICwgJ1xcbicgLCAnXCInICAsICdcXCcnICBdLFxuXHQnX3RleHRUb1N0cmluZ1knOiBbJ1xcXFxcXFxcJywgJ1xcXFxuJywgJ1xcXFxcIicsICdcXFxcXFwnJ10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfdGV4dFRvSnNvblN0cmluZ1gnOiBbJ1xcXFwnICAsICdcXG4nICwgJ1wiJyAgXSxcblx0J190ZXh0VG9Kc29uU3RyaW5nWSc6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXFwiJ10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfZXNjYXBlJzogZnVuY3Rpb24ocywgbW9kZSlcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcocykpXG5cdFx0e1xuXHRcdFx0c3dpdGNoKG1vZGUgfHwgJ2h0bWwnKVxuXHRcdFx0e1xuXHRcdFx0XHRjYXNlICdodG1sJzpcblx0XHRcdFx0Y2FzZSAnaHRtbF9hdHRyJzpcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fcmVwbGFjZShzLCB0aGlzLl90ZXh0VG9IdG1sWCwgdGhpcy5fdGV4dFRvSHRtbFkpO1xuXG5cdFx0XHRcdGNhc2UgJ2pzJzpcblx0XHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fcmVwbGFjZShzLCB0aGlzLl90ZXh0VG9TdHJpbmdYLCB0aGlzLl90ZXh0VG9TdHJpbmdZKTtcblxuXHRcdFx0XHRjYXNlICdqc29uJzpcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fcmVwbGFjZShzLCB0aGlzLl90ZXh0VG9Kc29uU3RyaW5nWCwgdGhpcy5fdGV4dFRvSnNvblN0cmluZ1kpO1xuXG5cdFx0XHRcdGNhc2UgJ3VybCc6XG5cdFx0XHRcdFx0cmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzKTtcblxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiBzO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl91cmxfZW5jb2RlJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gZW5jb2RlVVJJQ29tcG9uZW50KHMpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9ubDJicic6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMucmVwbGFjZSgvXFxuL2csICc8YnIvPicpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yYXcnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yZXBsYWNlJzogZnVuY3Rpb24ocywgZGljdClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpICYmIHRoaXMuaXNPYmplY3QoZGljdCkgPyB0aGlzLl9yZXBsYWNlKHMsIE9iamVjdC5rZXlzKGRpY3QpLCBPYmplY3QudmFsdWVzKGRpY3QpKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9zcGxpdCc6IGZ1bmN0aW9uKHMsIHNlcCwgbWF4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnNwbGl0KHNlcCwgbWF4KVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogW11cblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBOVU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2Ficyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gTWF0aC5hYnMoeCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfcm91bmQnOiBmdW5jdGlvbih4LCBtb2RlKVxuXHR7XG5cdFx0c3dpdGNoKG1vZGUpXG5cdFx0e1xuXHRcdFx0Y2FzZSAnY2VpbCc6XG5cdFx0XHRcdHJldHVybiBNYXRoLmNlaWwoeCk7XG5cblx0XHRcdGNhc2UgJ2Zsb29yJzpcblx0XHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoeCk7XG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBNYXRoLnJvdW5kKHgpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21pbic6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgYXJncyA9IChhcmd1bWVudHMubGVuZ3RoID09PSAxKSAmJiAodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkgfHwgdGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKSA/IGFyZ3VtZW50c1swXVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhcmd1bWVudHNcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCByZXN1bHQgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5cblx0XHRmb3IoY29uc3QgaSBpbiBhcmdzKVxuXHRcdHtcblx0XHRcdGlmKCF0aGlzLmlzTnVtYmVyKGFyZ3NbaV0pKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gTnVtYmVyLk5hTjtcblx0XHRcdH1cblxuXHRcdFx0aWYocmVzdWx0ID4gYXJnc1tpXSlcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0ID0gYXJnc1tpXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdtYXgnOiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGFyZ3MgPSAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgJiYgKHRoaXMuaXNBcnJheShhcmd1bWVudHNbMF0pIHx8IHRoaXMuaXNPYmplY3QoYXJndW1lbnRzWzBdKSkgPyBhcmd1bWVudHNbMF1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYXJndW1lbnRzXG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgcmVzdWx0ID0gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO1xuXG5cdFx0Zm9yKGNvbnN0IGkgaW4gYXJncylcblx0XHR7XG5cdFx0XHRpZighdGhpcy5pc051bWJlcihhcmdzW2ldKSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIE51bWJlci5OYU47XG5cdFx0XHR9XG5cblx0XHRcdGlmKHJlc3VsdCA8IGFyZ3NbaV0pXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdCA9IGFyZ3NbaV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUkFORE9NICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J3JhbmRvbSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCB5ID0gTWF0aC5yYW5kb20oKTtcblxuXHRcdGlmKHgpXG5cdFx0e1xuXHRcdFx0aWYodGhpcy5pc0FycmF5KHgpXG5cdFx0XHQgICB8fFxuXHRcdFx0ICAgdGhpcy5pc09iamVjdCh4KVxuXHRcdFx0ICkge1xuXHRcdFx0IFx0Y29uc3QgWCA9IE9iamVjdC5rZXlzKHgpO1xuXG5cdFx0XHRcdHJldHVybiB4W1xuXHRcdFx0XHRcdFhbTWF0aC5mbG9vcihYLmxlbmd0aCAqIHkpXVxuXHRcdFx0XHRdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLmlzU3RyaW5nKHgpKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4geFtNYXRoLmZsb29yKHgubGVuZ3RoICogeSldO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLmlzTnVtYmVyKHgpKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih4ICogeSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0eCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoeCAqIHkpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSlNPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9qc29uX2VuY29kZSc6IGZ1bmN0aW9uKHgsIGluZGVudClcblx0e1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh4LCBudWxsLCB0aGlzLmlzTnVtYmVyKGluZGVudCkgPyBpbmRlbnQgOiAyKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9qc29uX2pzcGF0aCc6IGZ1bmN0aW9uKHgsIHBhdGgpXG5cdHtcblx0XHRyZXR1cm4gdHlwZW9mIEpTUGF0aCAhPT0gJ3VuZGVmaW5lZCcgPyBKU1BhdGguYXBwbHkocGF0aCwgeClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbXVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFRFTVBMQVRFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpbmNsdWRlJzogZnVuY3Rpb24oZmlsZU5hbWUsIHZhcmlhYmxlcyA9IHt9LCB3aXRoQ29udGV4dCA9IHRydWUsIGlnbm9yZU1pc3NpbmcgPSBmYWxzZSlcblx0e1xuXHRcdGNvbnN0IHRlbXAgPSB7fTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYod2l0aENvbnRleHQpXG5cdFx0e1xuXHRcdFx0Zm9yKGNvbnN0IGkgaW4gYW1pVHdpZy5lbmdpbmUuZGljdClcblx0XHRcdHtcblx0XHRcdFx0dGVtcFtpXSA9IGFtaVR3aWcuZW5naW5lLmRpY3RbaV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYodmFyaWFibGVzKVxuXHRcdHtcblx0XHRcdGZvcihjb25zdCBpIGluIC8qLSovdmFyaWFibGVzLyotKi8pXG5cdFx0XHR7XG5cdFx0XHRcdHRlbXBbaV0gPSAvKi0qL3ZhcmlhYmxlcy8qLSovW2ldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHJlc3VsdCA9ICcnO1xuXG5cdFx0YW1pVHdpZy5hamF4LmdldChcblx0XHRcdGZpbGVOYW1lLFxuXHRcdFx0ZnVuY3Rpb24oZGF0YSlcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0ID0gYW1pVHdpZy5lbmdpbmUucmVuZGVyKGRhdGEsIHRlbXApO1xuXHRcdFx0fSxcblx0XHRcdGZ1bmN0aW9uKC8qKi8pXG5cdFx0XHR7XG5cdFx0XHRcdGlmKCFpZ25vcmVNaXNzaW5nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGNvdWxkIG5vdCBvcGVuIGAnICsgZmlsZU5hbWUgKyAnYCc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuc3RkbGliLmZpbHRlcl9lID0gYW1pVHdpZy5zdGRsaWIuZmlsdGVyX2VzY2FwZTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLypcbiAqIEFNSSBUd2lnIEVuZ2luZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE5IFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLmludGVycHJldGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5pbnRlcnByZXRlciA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9nZXRKUzogZnVuY3Rpb24obm9kZSlcblx0e1xuXHRcdGxldCBMO1xuXHRcdGxldCB4O1xuXHRcdGxldCBsZWZ0O1xuXHRcdGxldCByaWdodDtcblx0XHRsZXQgb3BlcmF0b3I7XG5cblx0XHRzd2l0Y2gobm9kZS5ub2RlVHlwZSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogTFNUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5MU1Q6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKC8qLS0tLS0qLyB0aGlzLl9nZXRKUyhub2RlLmxpc3RbaV0pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gJ1snICsgTC5qb2luKCcsJykgKyAnXSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBESUMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRJQzpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblx0XG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUuZGljdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaChpICsgJzonICsgdGhpcy5fZ2V0SlMobm9kZS5kaWN0W2ldKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuICd7JyArIEwuam9pbignLCcpICsgJ30nO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRlVOICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5GVU46XG5cdFx0IFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUubGlzdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaCh0aGlzLl9nZXRKUyhub2RlLmxpc3RbaV0pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHQgXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuIG5vZGUubm9kZVZhbHVlICsgJygnICsgTC5qb2luKCcsJykgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBWQVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUjpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmxpc3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2goJ1snICsgdGhpcy5fZ2V0SlMobm9kZS5saXN0W2ldKSArICddJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuIEwubGVuZ3RoID4gMCA/IG5vZGUubm9kZVZhbHVlICsgTC5qb2luKCcnKSA6IG5vZGUubm9kZVZhbHVlO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogVEVSTUlOQUwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTDpcblxuXHRcdFx0XHRyZXR1cm4gbm9kZS5ub2RlVmFsdWU7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLklTOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblxuXHRcdFx0XHRzd2l0Y2gobm9kZS5ub2RlUmlnaHQubm9kZVR5cGUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuREVGSU5FRDpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNEZWZpbmVkKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLk5VTEw6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzTnVsbCgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5FTVBUWTpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNFbXB0eSgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5JVEVSQUJMRTpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNJdGVyYWJsZSgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5FVkVOOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0V2ZW4oJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuT0REOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc09kZCgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLklOOlxuXG5cdFx0XHRcdGlmKG5vZGUubm9kZVJpZ2h0Lm5vZGVUeXBlICE9PSBhbWlUd2lnLmV4cHIudG9rZW5zLlJBTkdFKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0luT2JqZWN0KCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0eCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXG5cdFx0XHRcdFx0bGVmdCA9IG5vZGUubm9kZVJpZ2h0Lm5vZGVMZWZ0Lm5vZGVWYWx1ZTtcblx0XHRcdFx0XHRyaWdodCA9IG5vZGUubm9kZVJpZ2h0Lm5vZGVSaWdodC5ub2RlVmFsdWU7XG5cblx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzSW5SYW5nZSgnICsgeCArICcsJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU1RBUlRTX1dJVEggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5TVEFSVFNfV0lUSDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuc3RhcnRzV2l0aCgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRU5EU19XSVRIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5FTkRTX1dJVEg6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmVuZHNXaXRoKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBNQVRDSEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLk1BVENIRVM6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLm1hdGNoKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBSQU5HRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlJBTkdFOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5yYW5nZSgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRE9UICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ET1Q6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRpZihub2RlLm5vZGVWYWx1ZVswXSA9PT0gJy4nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIGxlZnQgKyAnLicgKyByaWdodDtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gbGVmdCArICdbJyArIHJpZ2h0ICsgJ10nO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGTERJViAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkZMRElWOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdNYXRoLmZsb29yKCcgKyBsZWZ0ICsgJy8nICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBQT1dFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlBPV0VSOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdNYXRoLnBvdygnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdC8qIFVOSUFSWSBPUEVSQVRPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZUxlZnQgPT09IG51bGxcblx0XHRcdFx0ICAgJiZcblx0XHRcdFx0ICAgbm9kZS5ub2RlUmlnaHQgIT09IG51bGxcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdG9wZXJhdG9yID0gKG5vZGUubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSA/IG5vZGUubm9kZVZhbHVlIDogJyEnO1xuXG5cdFx0XHRcdFx0cmV0dXJuIG9wZXJhdG9yICsgJygnICsgdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYobm9kZS5ub2RlTGVmdCAhPT0gbnVsbFxuXHRcdFx0XHQgICAmJlxuXHRcdFx0XHQgICBub2RlLm5vZGVSaWdodCA9PT0gbnVsbFxuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0b3BlcmF0b3IgPSAobm9kZS5ub2RlVHlwZSAhPT0gYW1pVHdpZy5leHByLnRva2Vucy5OT1QpID8gbm9kZS5ub2RlVmFsdWUgOiAnISc7XG5cblx0XHRcdFx0XHRyZXR1cm4gJygnICsgdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCkgKyAnKScgKyBvcGVyYXRvcjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogQklOQVJZIE9QRVJBVE9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYobm9kZS5ub2RlTGVmdCAhPT0gbnVsbFxuXHRcdFx0XHQgICAmJlxuXHRcdFx0XHQgICBub2RlLm5vZGVSaWdodCAhPT0gbnVsbFxuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0c3dpdGNoKG5vZGUubm9kZVR5cGUpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfT1I6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJ3x8Jztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnJiYnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfT1I6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJ3wnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfWE9SOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICdeJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX0FORDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnJic7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQ09OQ0FUOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICcrJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gbm9kZS5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRcdHJldHVybiAnKCcgKyBsZWZ0ICsgb3BlcmF0b3IgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRKUzogZnVuY3Rpb24oZXhwcilcblx0e1xuXHRcdHJldHVybiAnKGZ1bmN0aW9uKF8pIHsgcmV0dXJuICcgKyB0aGlzLl9nZXRKUyhleHByLnJvb3ROb2RlKSArICc7IH0pJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZXZhbDogZnVuY3Rpb24oZXhwciwgXylcblx0e1xuXHRcdGlmKCFfKSBfID0ge307XG5cblx0XHRyZXR1cm4gZXZhbCh0aGlzLmdldEpTKGV4cHIpKS5jYWxsKF8sIF8pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIoZnVuY3Rpb24oKSB7XG5cbnZhciBTWU5UQVggPSB7XG4gICAgICAgIFBBVEggICAgICAgICAgICA6IDEsXG4gICAgICAgIFNFTEVDVE9SICAgICAgICA6IDIsXG4gICAgICAgIE9CSl9QUkVEICAgICAgICA6IDMsXG4gICAgICAgIFBPU19QUkVEICAgICAgICA6IDQsXG4gICAgICAgIExPR0lDQUxfRVhQUiAgICA6IDUsXG4gICAgICAgIENPTVBBUklTT05fRVhQUiA6IDYsXG4gICAgICAgIE1BVEhfRVhQUiAgICAgICA6IDcsXG4gICAgICAgIENPTkNBVF9FWFBSICAgICA6IDgsXG4gICAgICAgIFVOQVJZX0VYUFIgICAgICA6IDksXG4gICAgICAgIFBPU19FWFBSICAgICAgICA6IDEwLFxuICAgICAgICBMSVRFUkFMICAgICAgICAgOiAxMVxuICAgIH07XG5cbi8vIHBhcnNlclxuXG52YXIgcGFyc2UgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgVE9LRU4gPSB7XG4gICAgICAgICAgICBJRCAgICA6IDEsXG4gICAgICAgICAgICBOVU0gICA6IDIsXG4gICAgICAgICAgICBTVFIgICA6IDMsXG4gICAgICAgICAgICBCT09MICA6IDQsXG4gICAgICAgICAgICBOVUxMICA6IDUsXG4gICAgICAgICAgICBQVU5DVCA6IDYsXG4gICAgICAgICAgICBFT1AgICA6IDdcbiAgICAgICAgfSxcbiAgICAgICAgTUVTU0FHRVMgPSB7XG4gICAgICAgICAgICBVTkVYUF9UT0tFTiA6ICdVbmV4cGVjdGVkIHRva2VuIFwiJTBcIicsXG4gICAgICAgICAgICBVTkVYUF9FT1AgICA6ICdVbmV4cGVjdGVkIGVuZCBvZiBwYXRoJ1xuICAgICAgICB9O1xuXG4gICAgdmFyIHBhdGgsIGlkeCwgYnVmLCBsZW47XG5cbiAgICBmdW5jdGlvbiBwYXJzZShfcGF0aCkge1xuICAgICAgICBwYXRoID0gX3BhdGguc3BsaXQoJycpO1xuICAgICAgICBpZHggPSAwO1xuICAgICAgICBidWYgPSBudWxsO1xuICAgICAgICBsZW4gPSBwYXRoLmxlbmd0aDtcblxuICAgICAgICB2YXIgcmVzID0gcGFyc2VQYXRoQ29uY2F0RXhwcigpLFxuICAgICAgICAgICAgdG9rZW4gPSBsZXgoKTtcblxuICAgICAgICBpZih0b2tlbi50eXBlICE9PSBUT0tFTi5FT1ApIHtcbiAgICAgICAgICAgIHRocm93VW5leHBlY3RlZCh0b2tlbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUGF0aENvbmNhdEV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VQYXRoQ29uY2F0UGFydEV4cHIoKSxcbiAgICAgICAgICAgIG9wZXJhbmRzO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCd8JykpIHtcbiAgICAgICAgICAgIGxleCgpO1xuICAgICAgICAgICAgKG9wZXJhbmRzIHx8IChvcGVyYW5kcyA9IFtleHByXSkpLnB1c2gocGFyc2VQYXRoQ29uY2F0UGFydEV4cHIoKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3BlcmFuZHM/XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5DT05DQVRfRVhQUixcbiAgICAgICAgICAgICAgICBhcmdzIDogb3BlcmFuZHNcbiAgICAgICAgICAgIH0gOlxuICAgICAgICAgICAgZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBhdGhDb25jYXRQYXJ0RXhwcigpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoKCcoJyk/XG4gICAgICAgICAgICBwYXJzZVBhdGhHcm91cEV4cHIoKSA6XG4gICAgICAgICAgICBwYXJzZVBhdGgoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBhdGhHcm91cEV4cHIoKSB7XG4gICAgICAgIGV4cGVjdCgnKCcpO1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlUGF0aENvbmNhdEV4cHIoKTtcbiAgICAgICAgZXhwZWN0KCcpJyk7XG5cbiAgICAgICAgdmFyIHBhcnRzID0gW10sXG4gICAgICAgICAgICBwYXJ0O1xuICAgICAgICB3aGlsZSgocGFydCA9IHBhcnNlUHJlZGljYXRlKCkpKSB7XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHBhcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXBhcnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihleHByLnR5cGUgPT09IFNZTlRBWC5QQVRIKSB7XG4gICAgICAgICAgICBleHByLnBhcnRzID0gZXhwci5wYXJ0cy5jb25jYXQocGFydHMpO1xuICAgICAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJ0cy51bnNoaWZ0KGV4cHIpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlICA6IFNZTlRBWC5QQVRILFxuICAgICAgICAgICAgcGFydHMgOiBwYXJ0c1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUHJlZGljYXRlKCkge1xuICAgICAgICBpZihtYXRjaCgnWycpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VQb3NQcmVkaWNhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1hdGNoKCd7JykpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZU9iamVjdFByZWRpY2F0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWF0Y2goJygnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlUGF0aEdyb3VwRXhwcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQYXRoKCkge1xuICAgICAgICBpZighbWF0Y2hQYXRoKCkpIHtcbiAgICAgICAgICAgIHRocm93VW5leHBlY3RlZChsZXgoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZnJvbVJvb3QgPSBmYWxzZSxcbiAgICAgICAgICAgIHN1YnN0O1xuXG4gICAgICAgIGlmKG1hdGNoKCdeJykpIHtcbiAgICAgICAgICAgIGxleCgpO1xuICAgICAgICAgICAgZnJvbVJvb3QgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYobWF0Y2hTdWJzdCgpKSB7XG4gICAgICAgICAgICBzdWJzdCA9IGxleCgpLnZhbC5zdWJzdHIoMSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGFydHMgPSBbXSxcbiAgICAgICAgICAgIHBhcnQ7XG4gICAgICAgIHdoaWxlKChwYXJ0ID0gcGFyc2VQYXRoUGFydCgpKSkge1xuICAgICAgICAgICAgcGFydHMucHVzaChwYXJ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlICAgICA6IFNZTlRBWC5QQVRILFxuICAgICAgICAgICAgZnJvbVJvb3QgOiBmcm9tUm9vdCxcbiAgICAgICAgICAgIHN1YnN0ICAgIDogc3Vic3QsXG4gICAgICAgICAgICBwYXJ0cyAgICA6IHBhcnRzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQYXRoUGFydCgpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoU2VsZWN0b3IoKT9cbiAgICAgICAgICAgIHBhcnNlU2VsZWN0b3IoKSA6XG4gICAgICAgICAgICBwYXJzZVByZWRpY2F0ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlU2VsZWN0b3IoKSB7XG4gICAgICAgIHZhciBzZWxlY3RvciA9IGxleCgpLnZhbCxcbiAgICAgICAgICAgIHRva2VuID0gbG9va2FoZWFkKCksXG4gICAgICAgICAgICBwcm9wO1xuXG4gICAgICAgIGlmKG1hdGNoKCcqJykgfHwgdG9rZW4udHlwZSA9PT0gVE9LRU4uSUQgfHwgdG9rZW4udHlwZSA9PT0gVE9LRU4uU1RSKSB7XG4gICAgICAgICAgICBwcm9wID0gbGV4KCkudmFsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgICAgIDogU1lOVEFYLlNFTEVDVE9SLFxuICAgICAgICAgICAgc2VsZWN0b3IgOiBzZWxlY3RvcixcbiAgICAgICAgICAgIHByb3AgICAgIDogcHJvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUG9zUHJlZGljYXRlKCkge1xuICAgICAgICBleHBlY3QoJ1snKTtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZVBvc0V4cHIoKTtcbiAgICAgICAgZXhwZWN0KCddJyk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguUE9TX1BSRUQsXG4gICAgICAgICAgICBhcmcgIDogZXhwclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlT2JqZWN0UHJlZGljYXRlKCkge1xuICAgICAgICBleHBlY3QoJ3snKTtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZUxvZ2ljYWxPUkV4cHIoKTtcbiAgICAgICAgZXhwZWN0KCd9Jyk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguT0JKX1BSRUQsXG4gICAgICAgICAgICBhcmcgIDogZXhwclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlTG9naWNhbE9SRXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZUxvZ2ljYWxBTkRFeHByKCksXG4gICAgICAgICAgICBvcGVyYW5kcztcblxuICAgICAgICB3aGlsZShtYXRjaCgnfHwnKSkge1xuICAgICAgICAgICAgbGV4KCk7XG4gICAgICAgICAgICAob3BlcmFuZHMgfHwgKG9wZXJhbmRzID0gW2V4cHJdKSkucHVzaChwYXJzZUxvZ2ljYWxBTkRFeHByKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wZXJhbmRzP1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguTE9HSUNBTF9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiAnfHwnLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBvcGVyYW5kc1xuICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlTG9naWNhbEFOREV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VFcXVhbGl0eUV4cHIoKSxcbiAgICAgICAgICAgIG9wZXJhbmRzO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCcmJicpKSB7XG4gICAgICAgICAgICBsZXgoKTtcbiAgICAgICAgICAgIChvcGVyYW5kcyB8fCAob3BlcmFuZHMgPSBbZXhwcl0pKS5wdXNoKHBhcnNlRXF1YWxpdHlFeHByKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wZXJhbmRzP1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguTE9HSUNBTF9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiAnJiYnLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBvcGVyYW5kc1xuICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlRXF1YWxpdHlFeHByKCkge1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlUmVsYXRpb25hbEV4cHIoKTtcblxuICAgICAgICB3aGlsZShcbiAgICAgICAgICAgIG1hdGNoKCc9PScpIHx8IG1hdGNoKCchPScpIHx8IG1hdGNoKCc9PT0nKSB8fCBtYXRjaCgnIT09JykgfHxcbiAgICAgICAgICAgIG1hdGNoKCdePT0nKSB8fCBtYXRjaCgnPT1eJykgfHxtYXRjaCgnXj0nKSB8fCBtYXRjaCgnPV4nKSB8fFxuICAgICAgICAgICAgbWF0Y2goJyQ9PScpIHx8IG1hdGNoKCc9PSQnKSB8fCBtYXRjaCgnJD0nKSB8fCBtYXRjaCgnPSQnKSB8fFxuICAgICAgICAgICAgbWF0Y2goJyo9PScpIHx8IG1hdGNoKCc9PSonKXx8IG1hdGNoKCcqPScpIHx8IG1hdGNoKCc9KicpXG4gICAgICAgICkge1xuICAgICAgICAgICAgZXhwciA9IHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLkNPTVBBUklTT05fRVhQUixcbiAgICAgICAgICAgICAgICBvcCAgIDogbGV4KCkudmFsLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBbZXhwciwgcGFyc2VFcXVhbGl0eUV4cHIoKV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVJlbGF0aW9uYWxFeHByKCkge1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlQWRkaXRpdmVFeHByKCk7XG5cbiAgICAgICAgd2hpbGUobWF0Y2goJzwnKSB8fCBtYXRjaCgnPicpIHx8IG1hdGNoKCc8PScpIHx8IG1hdGNoKCc+PScpKSB7XG4gICAgICAgICAgICBleHByID0ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguQ09NUEFSSVNPTl9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiBsZXgoKS52YWwsXG4gICAgICAgICAgICAgICAgYXJncyA6IFtleHByLCBwYXJzZVJlbGF0aW9uYWxFeHByKCldXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VBZGRpdGl2ZUV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VNdWx0aXBsaWNhdGl2ZUV4cHIoKTtcblxuICAgICAgICB3aGlsZShtYXRjaCgnKycpIHx8IG1hdGNoKCctJykpIHtcbiAgICAgICAgICAgIGV4cHIgPSB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5NQVRIX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6IGxleCgpLnZhbCxcbiAgICAgICAgICAgICAgICBhcmdzIDogW2V4cHIsIHBhcnNlTXVsdGlwbGljYXRpdmVFeHByKCldXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VNdWx0aXBsaWNhdGl2ZUV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VVbmFyeUV4cHIoKTtcblxuICAgICAgICB3aGlsZShtYXRjaCgnKicpIHx8IG1hdGNoKCcvJykgfHwgbWF0Y2goJyUnKSkge1xuICAgICAgICAgICAgZXhwciA9IHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLk1BVEhfRVhQUixcbiAgICAgICAgICAgICAgICBvcCAgIDogbGV4KCkudmFsLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBbZXhwciwgcGFyc2VNdWx0aXBsaWNhdGl2ZUV4cHIoKV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBvc0V4cHIoKSB7XG4gICAgICAgIGlmKG1hdGNoKCc6JykpIHtcbiAgICAgICAgICAgIGxleCgpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFNZTlRBWC5QT1NfRVhQUixcbiAgICAgICAgICAgICAgICB0b0lkeCA6IHBhcnNlVW5hcnlFeHByKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZnJvbUV4cHIgPSBwYXJzZVVuYXJ5RXhwcigpO1xuICAgICAgICBpZihtYXRjaCgnOicpKSB7XG4gICAgICAgICAgICBsZXgoKTtcbiAgICAgICAgICAgIGlmKG1hdGNoKCddJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICAgIDogU1lOVEFYLlBPU19FWFBSLFxuICAgICAgICAgICAgICAgICAgICBmcm9tSWR4IDogZnJvbUV4cHJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgICAgOiBTWU5UQVguUE9TX0VYUFIsXG4gICAgICAgICAgICAgICAgZnJvbUlkeCA6IGZyb21FeHByLFxuICAgICAgICAgICAgICAgIHRvSWR4ICAgOiBwYXJzZVVuYXJ5RXhwcigpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguUE9TX0VYUFIsXG4gICAgICAgICAgICBpZHggIDogZnJvbUV4cHJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVVuYXJ5RXhwcigpIHtcbiAgICAgICAgaWYobWF0Y2goJyEnKSB8fCBtYXRjaCgnLScpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguVU5BUllfRVhQUixcbiAgICAgICAgICAgICAgICBvcCAgIDogbGV4KCkudmFsLFxuICAgICAgICAgICAgICAgIGFyZyAgOiBwYXJzZVVuYXJ5RXhwcigpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcnNlUHJpbWFyeUV4cHIoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVByaW1hcnlFeHByKCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBsb29rYWhlYWQoKSxcbiAgICAgICAgICAgIHR5cGUgPSB0b2tlbi50eXBlO1xuXG4gICAgICAgIGlmKHR5cGUgPT09IFRPS0VOLlNUUiB8fCB0eXBlID09PSBUT0tFTi5OVU0gfHwgdHlwZSA9PT0gVE9LRU4uQk9PTCB8fCB0eXBlID09PSBUT0tFTi5OVUxMKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguTElURVJBTCxcbiAgICAgICAgICAgICAgICB2YWwgIDogbGV4KCkudmFsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWF0Y2hQYXRoKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVBhdGgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1hdGNoKCcoJykpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUdyb3VwRXhwcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRocm93VW5leHBlY3RlZChsZXgoKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VHcm91cEV4cHIoKSB7XG4gICAgICAgIGV4cGVjdCgnKCcpO1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlTG9naWNhbE9SRXhwcigpO1xuICAgICAgICBleHBlY3QoJyknKTtcblxuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaCh2YWwpIHtcbiAgICAgICAgdmFyIHRva2VuID0gbG9va2FoZWFkKCk7XG4gICAgICAgIHJldHVybiB0b2tlbi50eXBlID09PSBUT0tFTi5QVU5DVCAmJiB0b2tlbi52YWwgPT09IHZhbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaFBhdGgoKSB7XG4gICAgICAgIHJldHVybiBtYXRjaFNlbGVjdG9yKCkgfHwgbWF0Y2hTdWJzdCgpIHx8IG1hdGNoKCdeJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2hTZWxlY3RvcigpIHtcbiAgICAgICAgdmFyIHRva2VuID0gbG9va2FoZWFkKCk7XG4gICAgICAgIGlmKHRva2VuLnR5cGUgPT09IFRPS0VOLlBVTkNUKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gdG9rZW4udmFsO1xuICAgICAgICAgICAgcmV0dXJuIHZhbCA9PT0gJy4nIHx8IHZhbCA9PT0gJy4uJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaFN1YnN0KCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBsb29rYWhlYWQoKTtcbiAgICAgICAgcmV0dXJuIHRva2VuLnR5cGUgPT09IFRPS0VOLklEICYmIHRva2VuLnZhbFswXSA9PT0gJyQnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4cGVjdCh2YWwpIHtcbiAgICAgICAgdmFyIHRva2VuID0gbGV4KCk7XG4gICAgICAgIGlmKHRva2VuLnR5cGUgIT09IFRPS0VOLlBVTkNUIHx8IHRva2VuLnZhbCAhPT0gdmFsKSB7XG4gICAgICAgICAgICB0aHJvd1VuZXhwZWN0ZWQodG9rZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9va2FoZWFkKCkge1xuICAgICAgICBpZihidWYgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBidWY7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcG9zID0gaWR4O1xuICAgICAgICBidWYgPSBhZHZhbmNlKCk7XG4gICAgICAgIGlkeCA9IHBvcztcblxuICAgICAgICByZXR1cm4gYnVmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkdmFuY2UoKSB7XG4gICAgICAgIHdoaWxlKGlzV2hpdGVTcGFjZShwYXRoW2lkeF0pKSB7XG4gICAgICAgICAgICArK2lkeDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGlkeCA+PSBsZW4pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5FT1AsXG4gICAgICAgICAgICAgICAgcmFuZ2UgOiBbaWR4LCBpZHhdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRva2VuID0gc2NhblB1bmN0dWF0b3IoKTtcbiAgICAgICAgaWYodG9rZW4gfHxcbiAgICAgICAgICAgICAgICAodG9rZW4gPSBzY2FuSWQoKSkgfHxcbiAgICAgICAgICAgICAgICAodG9rZW4gPSBzY2FuU3RyaW5nKCkpIHx8XG4gICAgICAgICAgICAgICAgKHRva2VuID0gc2Nhbk51bWVyaWMoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRva2VuID0geyByYW5nZSA6IFtpZHgsIGlkeF0gfTtcbiAgICAgICAgaWR4ID49IGxlbj9cbiAgICAgICAgICAgIHRva2VuLnR5cGUgPSBUT0tFTi5FT1AgOlxuICAgICAgICAgICAgdG9rZW4udmFsID0gcGF0aFtpZHhdO1xuXG4gICAgICAgIHRocm93VW5leHBlY3RlZCh0b2tlbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGV4KCkge1xuICAgICAgICB2YXIgdG9rZW47XG5cbiAgICAgICAgaWYoYnVmKSB7XG4gICAgICAgICAgICBpZHggPSBidWYucmFuZ2VbMV07XG4gICAgICAgICAgICB0b2tlbiA9IGJ1ZjtcbiAgICAgICAgICAgIGJ1ZiA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYWR2YW5jZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRGlnaXQoY2gpIHtcbiAgICAgICAgcmV0dXJuICcwMTIzNDU2Nzg5Jy5pbmRleE9mKGNoKSA+PSAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzV2hpdGVTcGFjZShjaCkge1xuICAgICAgICByZXR1cm4gJyBcXHJcXG5cXHQnLmluZGV4T2YoY2gpID4gLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNJZFN0YXJ0KGNoKSB7XG4gICAgICAgIHJldHVybiBjaCA9PT0gJyQnIHx8IGNoID09PSAnQCcgfHwgY2ggPT09ICdfJyB8fCAoY2ggPj0gJ2EnICYmIGNoIDw9ICd6JykgfHwgKGNoID49ICdBJyAmJiBjaCA8PSAnWicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzSWRQYXJ0KGNoKSB7XG4gICAgICAgIHJldHVybiBpc0lkU3RhcnQoY2gpIHx8IChjaCA+PSAnMCcgJiYgY2ggPD0gJzknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY2FuSWQoKSB7XG4gICAgICAgIHZhciBjaCA9IHBhdGhbaWR4XTtcblxuICAgICAgICBpZighaXNJZFN0YXJ0KGNoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0YXJ0ID0gaWR4LFxuICAgICAgICAgICAgaWQgPSBjaDtcblxuICAgICAgICB3aGlsZSgrK2lkeCA8IGxlbikge1xuICAgICAgICAgICAgY2ggPSBwYXRoW2lkeF07XG4gICAgICAgICAgICBpZighaXNJZFBhcnQoY2gpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZCArPSBjaDtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaChpZCkge1xuICAgICAgICAgICAgY2FzZSAndHJ1ZSc6XG4gICAgICAgICAgICBjYXNlICdmYWxzZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5CT09MLFxuICAgICAgICAgICAgICAgICAgICB2YWwgICA6IGlkID09PSAndHJ1ZScsXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHhdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY2FzZSAnbnVsbCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5OVUxMLFxuICAgICAgICAgICAgICAgICAgICB2YWwgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHhdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLklELFxuICAgICAgICAgICAgICAgICAgICB2YWwgICA6IGlkLFxuICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4XVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY2FuU3RyaW5nKCkge1xuICAgICAgICBpZihwYXRoW2lkeF0gIT09ICdcIicgJiYgcGF0aFtpZHhdICE9PSAnXFwnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9yaWcgPSBwYXRoW2lkeF0sXG4gICAgICAgICAgICBzdGFydCA9ICsraWR4LFxuICAgICAgICAgICAgc3RyID0gJycsXG4gICAgICAgICAgICBlb3NGb3VuZCA9IGZhbHNlLFxuICAgICAgICAgICAgY2g7XG5cbiAgICAgICAgd2hpbGUoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICBjaCA9IHBhdGhbaWR4KytdO1xuICAgICAgICAgICAgaWYoY2ggPT09ICdcXFxcJykge1xuICAgICAgICAgICAgICAgIGNoID0gcGF0aFtpZHgrK107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKChjaCA9PT0gJ1wiJyB8fCBjaCA9PT0gJ1xcJycpICYmIGNoID09PSBvcmlnKSB7XG4gICAgICAgICAgICAgICAgZW9zRm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyICs9IGNoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZW9zRm91bmQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFRPS0VOLlNUUixcbiAgICAgICAgICAgICAgICB2YWwgOiBzdHIsXG4gICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY2FuTnVtZXJpYygpIHtcbiAgICAgICAgdmFyIHN0YXJ0ID0gaWR4LFxuICAgICAgICAgICAgY2ggPSBwYXRoW2lkeF0sXG4gICAgICAgICAgICBpc0Zsb2F0ID0gY2ggPT09ICcuJztcblxuICAgICAgICBpZihpc0Zsb2F0IHx8IGlzRGlnaXQoY2gpKSB7XG4gICAgICAgICAgICB2YXIgbnVtID0gY2g7XG4gICAgICAgICAgICB3aGlsZSgrK2lkeCA8IGxlbikge1xuICAgICAgICAgICAgICAgIGNoID0gcGF0aFtpZHhdO1xuICAgICAgICAgICAgICAgIGlmKGNoID09PSAnLicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoaXNGbG9hdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlzRmxvYXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKCFpc0RpZ2l0KGNoKSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBudW0gKz0gY2g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5OVU0sXG4gICAgICAgICAgICAgICAgdmFsICAgOiBpc0Zsb2F0PyBwYXJzZUZsb2F0KG51bSkgOiBwYXJzZUludChudW0sIDEwKSxcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4XVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjYW5QdW5jdHVhdG9yKCkge1xuICAgICAgICB2YXIgc3RhcnQgPSBpZHgsXG4gICAgICAgICAgICBjaDEgPSBwYXRoW2lkeF0sXG4gICAgICAgICAgICBjaDIgPSBwYXRoW2lkeCArIDFdO1xuXG4gICAgICAgIGlmKGNoMSA9PT0gJy4nKSB7XG4gICAgICAgICAgICBpZihpc0RpZ2l0KGNoMikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoWysraWR4XSA9PT0gJy4nP1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICAgICAgdmFsICAgOiAnLi4nLFxuICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgKytpZHhdXG4gICAgICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgICAgICB2YWwgICA6ICcuJyxcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeF1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2gyID09PSAnPScpIHtcbiAgICAgICAgICAgIHZhciBjaDMgPSBwYXRoW2lkeCArIDJdO1xuICAgICAgICAgICAgaWYoY2gzID09PSAnPScpIHtcbiAgICAgICAgICAgICAgICBpZignPSFeJConLmluZGV4T2YoY2gxKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsICAgOiBjaDEgKyBjaDIgKyBjaDMsXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4ICs9IDNdXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZignXiQqJy5pbmRleE9mKGNoMykgPj0gMCkge1xuICAgICAgICAgICAgICAgIGlmKGNoMSA9PT0gJz0nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsICAgOiBjaDEgKyBjaDIgKyBjaDMsXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4ICs9IDNdXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZignPSFeJCo+PCcuaW5kZXhPZihjaDEpID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSArIGNoMixcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeCArPSAyXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihjaDEgPT09ICc9JyAmJiAnXiQqJy5pbmRleE9mKGNoMikgPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgIHZhbCAgIDogY2gxICsgY2gyLFxuICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHggKz0gMl1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZihjaDEgPT09IGNoMiAmJiAoY2gxID09PSAnfCcgfHwgY2gxID09PSAnJicpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgdmFsICAgOiBjaDEgKyBjaDIsXG4gICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeCArPSAyXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCc6e30oKVtdXistKi8lIT48fCcuaW5kZXhPZihjaDEpID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSxcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgKytpZHhdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGhyb3dVbmV4cGVjdGVkKHRva2VuKSB7XG4gICAgICAgIGlmKHRva2VuLnR5cGUgPT09IFRPS0VOLkVPUCkge1xuICAgICAgICAgICAgdGhyb3dFcnJvcih0b2tlbiwgTUVTU0FHRVMuVU5FWFBfRU9QKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93RXJyb3IodG9rZW4sIE1FU1NBR0VTLlVORVhQX1RPS0VOLCB0b2tlbi52YWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRocm93RXJyb3IodG9rZW4sIG1lc3NhZ2VGb3JtYXQpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpLFxuICAgICAgICAgICAgbXNnID0gbWVzc2FnZUZvcm1hdC5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIC8lKFxcZCkvZyxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihfLCBpZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFyZ3NbaWR4XSB8fCAnJztcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yKG1zZyk7XG5cbiAgICAgICAgZXJyb3IuY29sdW1uID0gdG9rZW4ucmFuZ2VbMF07XG5cbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlO1xufSkoKTtcblxuLy8gdHJhbnNsYXRvclxuXG52YXIgdHJhbnNsYXRlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGJvZHksIHZhcnMsIGxhc3RWYXJJZCwgdW51c2VkVmFycztcblxuICAgIGZ1bmN0aW9uIGFjcXVpcmVWYXIoKSB7XG4gICAgICAgIGlmKHVudXNlZFZhcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdW51c2VkVmFycy5zaGlmdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHZhck5hbWUgPSAndicgKyArK2xhc3RWYXJJZDtcbiAgICAgICAgdmFycy5wdXNoKHZhck5hbWUpO1xuICAgICAgICByZXR1cm4gdmFyTmFtZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWxlYXNlVmFycygpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsIGkgPSBhcmdzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUoaS0tKSB7XG4gICAgICAgICAgICB1bnVzZWRWYXJzLnB1c2goYXJnc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGUoYXN0KSB7XG4gICAgICAgIGJvZHkgPSBbXTtcbiAgICAgICAgdmFycyA9IFsncmVzJ107XG4gICAgICAgIGxhc3RWYXJJZCA9IDA7XG4gICAgICAgIHVudXNlZFZhcnMgPSBbXTtcblxuICAgICAgICB0cmFuc2xhdGVFeHByKGFzdCwgJ3JlcycsICdkYXRhJyk7XG5cbiAgICAgICAgYm9keS51bnNoaWZ0KFxuICAgICAgICAgICAgJ3ZhciAnLFxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheT9cbiAgICAgICAgICAgICAgICAnaXNBcnIgPSBBcnJheS5pc0FycmF5JyA6XG4gICAgICAgICAgICAgICAgJ3RvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZywgaXNBcnIgPSBmdW5jdGlvbihvKSB7IHJldHVybiB0b1N0ci5jYWxsKG8pID09PSBcIltvYmplY3QgQXJyYXldXCI7IH0nLFxuICAgICAgICAgICAgICAgICcsIGNvbmNhdCA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQnLFxuICAgICAgICAgICAgICAgICcsJywgdmFycy5qb2luKCcsJyksICc7Jyk7XG5cbiAgICAgICAgaWYoYXN0LnR5cGUgPT09IFNZTlRBWC5QQVRIKSB7XG4gICAgICAgICAgICB2YXIgbGFzdFBhcnQgPSBhc3QucGFydHNbYXN0LnBhcnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYobGFzdFBhcnQgJiYgbGFzdFBhcnQudHlwZSA9PT0gU1lOVEFYLlBPU19QUkVEICYmICdpZHgnIGluIGxhc3RQYXJ0LmFyZykge1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaCgncmVzID0gcmVzWzBdOycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYm9keS5wdXNoKCdyZXR1cm4gcmVzOycpO1xuXG4gICAgICAgIHJldHVybiBib2R5LmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZVBhdGgocGF0aCwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IHBhdGgucGFydHMsXG4gICAgICAgICAgICBpID0gMCwgbGVuID0gcGFydHMubGVuZ3RoO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgIGRlc3QsICc9JywgcGF0aC5mcm9tUm9vdD8gJ2RhdGEnIDogcGF0aC5zdWJzdD8gJ3N1YnN0LicgKyBwYXRoLnN1YnN0IDogY3R4LCAnOycsXG4gICAgICAgICAgICAnaXNBcnIoJyArIGRlc3QgKyAnKSB8fCAoJyArIGRlc3QgKyAnID0gWycgKyBkZXN0ICsgJ10pOycpO1xuXG4gICAgICAgIHdoaWxlKGkgPCBsZW4pIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gcGFydHNbaSsrXTtcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFNZTlRBWC5TRUxFQ1RPUjpcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RvciA9PT0gJy4uJz9cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZURlc2NlbmRhbnRTZWxlY3RvcihpdGVtLCBkZXN0LCBkZXN0KSA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVTZWxlY3RvcihpdGVtLCBkZXN0LCBkZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFNZTlRBWC5PQkpfUFJFRDpcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlT2JqZWN0UHJlZGljYXRlKGl0ZW0sIGRlc3QsIGRlc3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgU1lOVEFYLlBPU19QUkVEOlxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVQb3NQcmVkaWNhdGUoaXRlbSwgZGVzdCwgZGVzdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBTWU5UQVguQ09OQ0FUX0VYUFI6XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUNvbmNhdEV4cHIoaXRlbSwgZGVzdCwgZGVzdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlU2VsZWN0b3Ioc2VsLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgaWYoc2VsLnByb3ApIHtcbiAgICAgICAgICAgIHZhciBwcm9wU3RyID0gZXNjYXBlU3RyKHNlbC5wcm9wKSxcbiAgICAgICAgICAgICAgICByZXMgPSBhY3F1aXJlVmFyKCksIGkgPSBhY3F1aXJlVmFyKCksIGxlbiA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgICAgICBjdXJDdHggPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICAgICAgaiA9IGFjcXVpcmVWYXIoKSwgdmFsID0gYWNxdWlyZVZhcigpLCB0bXBBcnIgPSBhY3F1aXJlVmFyKCk7XG5cbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICByZXMsICc9IFtdOycsIGksICc9IDA7JywgbGVuLCAnPScsIGN0eCwgJy5sZW5ndGg7JywgdG1wQXJyLCAnPSBbXTsnLFxuICAgICAgICAgICAgICAgICd3aGlsZSgnLCBpLCAnPCcsIGxlbiwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgIGN1ckN0eCwgJz0nLCBjdHgsICdbJywgaSwgJysrXTsnLFxuICAgICAgICAgICAgICAgICAgICAnaWYoJywgY3VyQ3R4LCAnIT0gbnVsbCkgeycpO1xuICAgICAgICAgICAgaWYoc2VsLnByb3AgPT09ICcqJykge1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICdpZih0eXBlb2YgJywgY3VyQ3R4LCAnPT09IFwib2JqZWN0XCIpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZihpc0FycignLCBjdXJDdHgsICcpKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLCAnPScsIHJlcywgJy5jb25jYXQoJywgY3VyQ3R4LCAnKTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZWxzZSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZvcignLCBqLCAnIGluICcsIGN1ckN0eCwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWYoJywgY3VyQ3R4LCAnLmhhc093blByb3BlcnR5KCcsIGosICcpKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwsICc9JywgY3VyQ3R4LCAnWycsIGosICddOycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZUFwcGVuZFRvQXJyYXkocmVzLCB2YWwpO1xuICAgICAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnfScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsLCAnPScsIGN1ckN0eCwgJ1snLCBwcm9wU3RyLCAnXTsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZUFwcGVuZFRvQXJyYXkocmVzLCB2YWwsIHRtcEFyciwgbGVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICBkZXN0LCAnPScsIGxlbiwgJz4gMSAmJicsIHRtcEFyciwgJy5sZW5ndGg/JywgdG1wQXJyLCAnLmxlbmd0aCA+IDE/JyxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbmNhdC5hcHBseSgnLCByZXMsICcsJywgdG1wQXJyLCAnKSA6JywgcmVzLCAnLmNvbmNhdCgnLCB0bXBBcnIsICdbMF0pIDonLCByZXMsICc7Jyk7XG5cbiAgICAgICAgICAgIHJlbGVhc2VWYXJzKHJlcywgaSwgbGVuLCBjdXJDdHgsIGosIHZhbCwgdG1wQXJyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZURlc2NlbmRhbnRTZWxlY3RvcihzZWwsIGRlc3QsIGJhc2VDdHgpIHtcbiAgICAgICAgdmFyIHByb3AgPSBzZWwucHJvcCxcbiAgICAgICAgICAgIGN0eCA9IGFjcXVpcmVWYXIoKSwgY3VyQ3R4ID0gYWNxdWlyZVZhcigpLCBjaGlsZEN0eHMgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBpID0gYWNxdWlyZVZhcigpLCBqID0gYWNxdWlyZVZhcigpLCB2YWwgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBsZW4gPSBhY3F1aXJlVmFyKCksIHJlcyA9IGFjcXVpcmVWYXIoKTtcblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICBjdHgsICc9JywgYmFzZUN0eCwgJy5zbGljZSgpLCcsIHJlcywgJz0gW107JyxcbiAgICAgICAgICAgICd3aGlsZSgnLCBjdHgsICcubGVuZ3RoKSB7JyxcbiAgICAgICAgICAgICAgICBjdXJDdHgsICc9JywgY3R4LCAnLnNoaWZ0KCk7Jyk7XG4gICAgICAgIHByb3A/XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgJ2lmKHR5cGVvZiAnLCBjdXJDdHgsICc9PT0gXCJvYmplY3RcIiAmJicsIGN1ckN0eCwgJykgeycpIDpcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAnaWYodHlwZW9mICcsIGN1ckN0eCwgJyE9IG51bGwpIHsnKTtcbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBjaGlsZEN0eHMsICc9IFtdOycsXG4gICAgICAgICAgICAgICAgICAgICdpZihpc0FycignLCBjdXJDdHgsICcpKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGksICc9IDAsJywgbGVuLCAnPScsIGN1ckN0eCwgJy5sZW5ndGg7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd3aGlsZSgnLCBpLCAnPCcsIGxlbiwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLCAnPScsIGN1ckN0eCwgJ1snLCBpLCAnKytdOycpO1xuICAgICAgICBwcm9wICYmIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWYodHlwZW9mICcsIHZhbCwgJz09PSBcIm9iamVjdFwiKSB7Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZUFwcGVuZFRvQXJyYXkoY2hpbGRDdHhzLCB2YWwpO1xuICAgICAgICBwcm9wICYmIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScpO1xuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgJ2Vsc2UgeycpO1xuICAgICAgICBpZihwcm9wKSB7XG4gICAgICAgICAgICBpZihwcm9wICE9PSAnKicpIHtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwsICc9JywgY3VyQ3R4LCAnW1wiJyArIHByb3AgKyAnXCJdOycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVBcHBlbmRUb0FycmF5KHJlcywgY3VyQ3R4KTtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICdpZih0eXBlb2YgJywgY3VyQ3R4LCAnPT09IFwib2JqZWN0XCIpIHsnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZm9yKCcsIGosICcgaW4gJywgY3VyQ3R4LCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKCcsIGN1ckN0eCwgJy5oYXNPd25Qcm9wZXJ0eSgnLCBqLCAnKSkgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwsICc9JywgY3VyQ3R4LCAnWycsIGosICddOycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShjaGlsZEN0eHMsIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wID09PSAnKicgJiYgaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIHZhbCk7XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgIHByb3AgfHwgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkQ3R4cywgJy5sZW5ndGggJiYnLCBjdHgsICcudW5zaGlmdC5hcHBseSgnLCBjdHgsICcsJywgY2hpbGRDdHhzLCAnKTsnLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgIGRlc3QsICc9JywgcmVzLCAnOycpO1xuXG4gICAgICAgIHJlbGVhc2VWYXJzKGN0eCwgY3VyQ3R4LCBjaGlsZEN0eHMsIGksIGosIHZhbCwgbGVuLCByZXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZU9iamVjdFByZWRpY2F0ZShleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIHJlc1ZhciA9IGFjcXVpcmVWYXIoKSwgaSA9IGFjcXVpcmVWYXIoKSwgbGVuID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgY29uZCA9IGFjcXVpcmVWYXIoKSwgY3VySXRlbSA9IGFjcXVpcmVWYXIoKTtcblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICByZXNWYXIsICc9IFtdOycsXG4gICAgICAgICAgICBpLCAnPSAwOycsXG4gICAgICAgICAgICBsZW4sICc9JywgY3R4LCAnLmxlbmd0aDsnLFxuICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuLCAnKSB7JyxcbiAgICAgICAgICAgICAgICBjdXJJdGVtLCAnPScsIGN0eCwgJ1snLCBpLCAnKytdOycpO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoZXhwci5hcmcsIGNvbmQsIGN1ckl0ZW0pO1xuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgY29udmVydFRvQm9vbChleHByLmFyZywgY29uZCksICcmJicsIHJlc1ZhciwgJy5wdXNoKCcsIGN1ckl0ZW0sICcpOycsXG4gICAgICAgICAgICAnfScsXG4gICAgICAgICAgICBkZXN0LCAnPScsIHJlc1ZhciwgJzsnKTtcblxuICAgICAgICByZWxlYXNlVmFycyhyZXNWYXIsIGksIGxlbiwgY3VySXRlbSwgY29uZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlUG9zUHJlZGljYXRlKGl0ZW0sIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgYXJyYXlFeHByID0gaXRlbS5hcmcsIGZyb21JZHgsIHRvSWR4O1xuICAgICAgICBpZihhcnJheUV4cHIuaWR4KSB7XG4gICAgICAgICAgICB2YXIgaWR4ID0gYWNxdWlyZVZhcigpO1xuICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcnJheUV4cHIuaWR4LCBpZHgsIGN0eCk7XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgaWR4LCAnPCAwICYmICgnLCBpZHgsICc9JywgY3R4LCAnLmxlbmd0aCArJywgaWR4LCAnKTsnLFxuICAgICAgICAgICAgICAgIGRlc3QsICc9JywgY3R4LCAnWycsIGlkeCwgJ10gPT0gbnVsbD8gW10gOiBbJywgY3R4LCAnWycsIGlkeCwgJ11dOycpO1xuICAgICAgICAgICAgcmVsZWFzZVZhcnMoaWR4KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFycmF5RXhwci5mcm9tSWR4KSB7XG4gICAgICAgICAgICBpZihhcnJheUV4cHIudG9JZHgpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFycmF5RXhwci5mcm9tSWR4LCBmcm9tSWR4ID0gYWNxdWlyZVZhcigpLCBjdHgpO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJyYXlFeHByLnRvSWR4LCB0b0lkeCA9IGFjcXVpcmVWYXIoKSwgY3R4KTtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0nLCBjdHgsICcuc2xpY2UoJywgZnJvbUlkeCwgJywnLCB0b0lkeCwgJyk7Jyk7XG4gICAgICAgICAgICAgICAgcmVsZWFzZVZhcnMoZnJvbUlkeCwgdG9JZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcnJheUV4cHIuZnJvbUlkeCwgZnJvbUlkeCA9IGFjcXVpcmVWYXIoKSwgY3R4KTtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0nLCBjdHgsICcuc2xpY2UoJywgZnJvbUlkeCwgJyk7Jyk7XG4gICAgICAgICAgICAgICAgcmVsZWFzZVZhcnMoZnJvbUlkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFycmF5RXhwci50b0lkeCwgdG9JZHggPSBhY3F1aXJlVmFyKCksIGN0eCk7XG4gICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0nLCBjdHgsICcuc2xpY2UoMCwnLCB0b0lkeCwgJyk7Jyk7XG4gICAgICAgICAgICByZWxlYXNlVmFycyh0b0lkeCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVFeHByKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICBzd2l0Y2goZXhwci50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5QQVRIOlxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVBhdGgoZXhwciwgZGVzdCwgY3R4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguQ09OQ0FUX0VYUFI6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlQ29uY2F0RXhwcihleHByLCBkZXN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5DT01QQVJJU09OX0VYUFI6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlQ29tcGFyaXNvbkV4cHIoZXhwciwgZGVzdCwgY3R4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguTUFUSF9FWFBSOlxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZU1hdGhFeHByKGV4cHIsIGRlc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkxPR0lDQUxfRVhQUjpcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVMb2dpY2FsRXhwcihleHByLCBkZXN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5VTkFSWV9FWFBSOlxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVVuYXJ5RXhwcihleHByLCBkZXN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5MSVRFUkFMOlxuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPScpO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUxpdGVyYWwoZXhwci52YWwpO1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaCgnOycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlTGl0ZXJhbCh2YWwpIHtcbiAgICAgICAgYm9keS5wdXNoKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnPyBlc2NhcGVTdHIodmFsKSA6IHZhbCA9PT0gbnVsbD8gJ251bGwnIDogdmFsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVDb21wYXJpc29uRXhwcihleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIHZhbDEgPSBhY3F1aXJlVmFyKCksIHZhbDIgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBpc1ZhbDFBcnJheSA9IGFjcXVpcmVWYXIoKSwgaXNWYWwyQXJyYXkgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBpID0gYWNxdWlyZVZhcigpLCBqID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgbGVuMSA9IGFjcXVpcmVWYXIoKSwgbGVuMiA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGxlZnRBcmcgPSBleHByLmFyZ3NbMF0sIHJpZ2h0QXJnID0gZXhwci5hcmdzWzFdO1xuXG4gICAgICAgIGJvZHkucHVzaChkZXN0LCAnPSBmYWxzZTsnKTtcblxuICAgICAgICB0cmFuc2xhdGVFeHByKGxlZnRBcmcsIHZhbDEsIGN0eCk7XG4gICAgICAgIHRyYW5zbGF0ZUV4cHIocmlnaHRBcmcsIHZhbDIsIGN0eCk7XG5cbiAgICAgICAgdmFyIGlzTGVmdEFyZ1BhdGggPSBsZWZ0QXJnLnR5cGUgPT09IFNZTlRBWC5QQVRILFxuICAgICAgICAgICAgaXNSaWdodEFyZ0xpdGVyYWwgPSByaWdodEFyZy50eXBlID09PSBTWU5UQVguTElURVJBTDtcblxuICAgICAgICBib2R5LnB1c2goaXNWYWwxQXJyYXksICc9Jyk7XG4gICAgICAgIGlzTGVmdEFyZ1BhdGg/IGJvZHkucHVzaCgndHJ1ZTsnKSA6IGJvZHkucHVzaCgnaXNBcnIoJywgdmFsMSwgJyk7Jyk7XG5cbiAgICAgICAgYm9keS5wdXNoKGlzVmFsMkFycmF5LCAnPScpO1xuICAgICAgICBpc1JpZ2h0QXJnTGl0ZXJhbD8gYm9keS5wdXNoKCdmYWxzZTsnKSA6IGJvZHkucHVzaCgnaXNBcnIoJywgdmFsMiwgJyk7Jyk7XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgJ2lmKCcpO1xuICAgICAgICBpc0xlZnRBcmdQYXRoIHx8IGJvZHkucHVzaChpc1ZhbDFBcnJheSwgJyYmJyk7XG4gICAgICAgIGJvZHkucHVzaCh2YWwxLCAnLmxlbmd0aCA9PT0gMSkgeycsXG4gICAgICAgICAgICAgICAgdmFsMSwgJz0nLCB2YWwxLCAnWzBdOycsXG4gICAgICAgICAgICAgICAgaXNWYWwxQXJyYXksICc9IGZhbHNlOycsXG4gICAgICAgICAgICAnfScpO1xuICAgICAgICBpc1JpZ2h0QXJnTGl0ZXJhbCB8fCBib2R5LnB1c2goXG4gICAgICAgICAgICAnaWYoJywgaXNWYWwyQXJyYXksICcmJicsIHZhbDIsICcubGVuZ3RoID09PSAxKSB7JyxcbiAgICAgICAgICAgICAgICB2YWwyLCAnPScsIHZhbDIsICdbMF07JyxcbiAgICAgICAgICAgICAgICBpc1ZhbDJBcnJheSwgJz0gZmFsc2U7JyxcbiAgICAgICAgICAgICd9Jyk7XG5cbiAgICAgICAgYm9keS5wdXNoKGksICc9IDA7JyxcbiAgICAgICAgICAgICdpZignLCBpc1ZhbDFBcnJheSwgJykgeycsXG4gICAgICAgICAgICAgICAgbGVuMSwgJz0nLCB2YWwxLCAnLmxlbmd0aDsnKTtcblxuICAgICAgICBpZighaXNSaWdodEFyZ0xpdGVyYWwpIHtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAnaWYoJywgaXNWYWwyQXJyYXksICcpIHsnLFxuICAgICAgICAgICAgICAgICAgICBsZW4yLCAnPScsIHZhbDIsICcubGVuZ3RoOycsXG4gICAgICAgICAgICAgICAgICAgICd3aGlsZSgnLCBpLCAnPCcsIGxlbjEsICcmJiAhJywgZGVzdCwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICBqLCAnPSAwOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnd2hpbGUoJywgaiwgJzwnLCBsZW4yLCAnKSB7Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVDb25kaXRpb24oZXhwci5vcCwgW3ZhbDEsICdbJywgaSwgJ10nXS5qb2luKCcnKSwgW3ZhbDIsICdbJywgaiwgJ10nXS5qb2luKCcnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0LCAnPSB0cnVlOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdicmVhazsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnKysnLCBqLCAnOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnKysnLCBpLCAnOycsXG4gICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgJ2Vsc2UgeycpO1xuICAgICAgICB9XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuMSwgJykgeycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVDb25kaXRpb24oZXhwci5vcCwgW3ZhbDEsICdbJywgaSwgJ10nXS5qb2luKCcnKSwgdmFsMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdCwgJz0gdHJ1ZTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdicmVhazsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJysrJywgaSwgJzsnLFxuICAgICAgICAgICAgICAgICAgICAnfScpO1xuXG4gICAgICAgIGlzUmlnaHRBcmdMaXRlcmFsIHx8IGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAnfScpO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICd9Jyk7XG5cbiAgICAgICAgaWYoIWlzUmlnaHRBcmdMaXRlcmFsKSB7XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAnZWxzZSBpZignLCBpc1ZhbDJBcnJheSwnKSB7JyxcbiAgICAgICAgICAgICAgICBsZW4yLCAnPScsIHZhbDIsICcubGVuZ3RoOycsXG4gICAgICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuMiwgJykgeycpO1xuICAgICAgICAgICAgICAgICAgICB3cml0ZUNvbmRpdGlvbihleHByLm9wLCB2YWwxLCBbdmFsMiwgJ1snLCBpLCAnXSddLmpvaW4oJycpKTtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3QsICc9IHRydWU7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdicmVhazsnLFxuICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICcrKycsIGksICc7JyxcbiAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAnfScpO1xuICAgICAgICB9XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgJ2Vsc2UgeycsXG4gICAgICAgICAgICAgICAgZGVzdCwgJz0nLCBiaW5hcnlPcGVyYXRvcnNbZXhwci5vcF0odmFsMSwgdmFsMiksICc7JyxcbiAgICAgICAgICAgICd9Jyk7XG5cbiAgICAgICAgcmVsZWFzZVZhcnModmFsMSwgdmFsMiwgaXNWYWwxQXJyYXksIGlzVmFsMkFycmF5LCBpLCBqLCBsZW4xLCBsZW4yKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3cml0ZUNvbmRpdGlvbihvcCwgdmFsMUV4cHIsIHZhbDJFeHByKSB7XG4gICAgICAgIGJvZHkucHVzaCgnaWYoJywgYmluYXJ5T3BlcmF0b3JzW29wXSh2YWwxRXhwciwgdmFsMkV4cHIpLCAnKSB7Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlTG9naWNhbEV4cHIoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciBjb25kaXRpb25WYXJzID0gW10sXG4gICAgICAgICAgICBhcmdzID0gZXhwci5hcmdzLCBsZW4gPSBhcmdzLmxlbmd0aCxcbiAgICAgICAgICAgIGkgPSAwLCB2YWw7XG5cbiAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9IGZhbHNlOycpO1xuICAgICAgICBzd2l0Y2goZXhwci5vcCkge1xuICAgICAgICAgICAgY2FzZSAnJiYnOlxuICAgICAgICAgICAgICAgIHdoaWxlKGkgPCBsZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uVmFycy5wdXNoKHZhbCA9IGFjcXVpcmVWYXIoKSk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnc1tpXSwgdmFsLCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBib2R5LnB1c2goJ2lmKCcsIGNvbnZlcnRUb0Jvb2woYXJnc1tpKytdLCB2YWwpLCAnKSB7Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPSB0cnVlOycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd8fCc6XG4gICAgICAgICAgICAgICAgd2hpbGUoaSA8IGxlbikge1xuICAgICAgICAgICAgICAgICAgICBjb25kaXRpb25WYXJzLnB1c2godmFsID0gYWNxdWlyZVZhcigpKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcmdzW2ldLCB2YWwsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICdpZignLCBjb252ZXJ0VG9Cb29sKGFyZ3NbaV0sIHZhbCksICcpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3QsICc9IHRydWU7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGkrKyArIDEgPCBsZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaCgnZWxzZSB7Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLS1sZW47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZShsZW4tLSkge1xuICAgICAgICAgICAgYm9keS5wdXNoKCd9Jyk7XG4gICAgICAgIH1cblxuICAgICAgICByZWxlYXNlVmFycy5hcHBseShudWxsLCBjb25kaXRpb25WYXJzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVNYXRoRXhwcihleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIHZhbDEgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICB2YWwyID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgYXJncyA9IGV4cHIuYXJncztcblxuICAgICAgICB0cmFuc2xhdGVFeHByKGFyZ3NbMF0sIHZhbDEsIGN0eCk7XG4gICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnc1sxXSwgdmFsMiwgY3R4KTtcblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICBkZXN0LCAnPScsXG4gICAgICAgICAgICBiaW5hcnlPcGVyYXRvcnNbZXhwci5vcF0oXG4gICAgICAgICAgICAgICAgY29udmVydFRvU2luZ2xlVmFsdWUoYXJnc1swXSwgdmFsMSksXG4gICAgICAgICAgICAgICAgY29udmVydFRvU2luZ2xlVmFsdWUoYXJnc1sxXSwgdmFsMikpLFxuICAgICAgICAgICAgJzsnKTtcblxuICAgICAgICByZWxlYXNlVmFycyh2YWwxLCB2YWwyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVVbmFyeUV4cHIoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciB2YWwgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBhcmcgPSBleHByLmFyZztcblxuICAgICAgICB0cmFuc2xhdGVFeHByKGFyZywgdmFsLCBjdHgpO1xuXG4gICAgICAgIHN3aXRjaChleHByLm9wKSB7XG4gICAgICAgICAgICBjYXNlICchJzpcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0gIScsIGNvbnZlcnRUb0Jvb2woYXJnLCB2YWwpICsgJzsnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnLSc6XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9IC0nLCBjb252ZXJ0VG9TaW5nbGVWYWx1ZShhcmcsIHZhbCkgKyAnOycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVsZWFzZVZhcnModmFsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVDb25jYXRFeHByKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgYXJnVmFycyA9IFtdLFxuICAgICAgICAgICAgYXJncyA9IGV4cHIuYXJncyxcbiAgICAgICAgICAgIGxlbiA9IGFyZ3MubGVuZ3RoLFxuICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgd2hpbGUoaSA8IGxlbikge1xuICAgICAgICAgICAgYXJnVmFycy5wdXNoKGFjcXVpcmVWYXIoKSk7XG4gICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFyZ3NbaV0sIGFyZ1ZhcnNbaSsrXSwgY3R4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJvZHkucHVzaChkZXN0LCAnPSBjb25jYXQuY2FsbCgnLCBhcmdWYXJzLmpvaW4oJywnKSwgJyk7Jyk7XG5cbiAgICAgICAgcmVsZWFzZVZhcnMuYXBwbHkobnVsbCwgYXJnVmFycyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXNjYXBlU3RyKHMpIHtcbiAgICAgICAgcmV0dXJuICdcXCcnICsgcy5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpLnJlcGxhY2UoLycvZywgJ1xcXFxcXCcnKSArICdcXCcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlubGluZUFwcGVuZFRvQXJyYXkocmVzLCB2YWwsIHRtcEFyciwgbGVuKSB7XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICdpZih0eXBlb2YgJywgdmFsLCAnIT09IFwidW5kZWZpbmVkXCIpIHsnLFxuICAgICAgICAgICAgICAgICdpZihpc0FycignLCB2YWwsICcpKSB7Jyk7XG4gICAgICAgIGlmKHRtcEFycikge1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBsZW4sICc+IDE/Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVQdXNoVG9BcnJheSh0bXBBcnIsIHZhbCk7XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAnOicpO1xuICAgICAgICB9XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgcmVzLCAnPScsIHJlcywgJy5sZW5ndGg/JywgcmVzLCAnLmNvbmNhdCgnLCB2YWwsICcpIDonLCB2YWwsICcuc2xpY2UoKScsICc7JyxcbiAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgJ2Vsc2UgeycpO1xuICAgICAgICB0bXBBcnIgJiYgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAnaWYoJywgdG1wQXJyLCAnLmxlbmd0aCkgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMsICc9IGNvbmNhdC5hcHBseSgnLCByZXMsICcsJywgdG1wQXJyLCAnKTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wQXJyLCAnPSBbXTsnLFxuICAgICAgICAgICAgICAgICAgICAnfScpO1xuICAgICAgICAgICAgICAgICAgICBpbmxpbmVQdXNoVG9BcnJheShyZXMsIHZhbCk7XG4gICAgICAgIGJvZHkucHVzaCgnOycsXG4gICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgJ30nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbmxpbmVQdXNoVG9BcnJheShyZXMsIHZhbCkge1xuICAgICAgICBib2R5LnB1c2gocmVzLCAnLmxlbmd0aD8nLCByZXMsICcucHVzaCgnLCB2YWwsICcpIDonLCAgcmVzLCAnWzBdID0nLCB2YWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbnZlcnRUb0Jvb2woYXJnLCB2YXJOYW1lKSB7XG4gICAgICAgIHN3aXRjaChhcmcudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTWU5UQVguTE9HSUNBTF9FWFBSOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YXJOYW1lO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5MSVRFUkFMOlxuICAgICAgICAgICAgICAgIHJldHVybiAnISEnICsgdmFyTmFtZTtcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguUEFUSDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyTmFtZSArICcubGVuZ3RoID4gMCc7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnKHR5cGVvZiAnLCB2YXJOYW1lLCAnPT09IFwiYm9vbGVhblwiPycsXG4gICAgICAgICAgICAgICAgICAgIHZhck5hbWUsICc6JyxcbiAgICAgICAgICAgICAgICAgICAgJ2lzQXJyKCcsIHZhck5hbWUsICcpPycsIHZhck5hbWUsICcubGVuZ3RoID4gMCA6ICEhJywgdmFyTmFtZSwgJyknXS5qb2luKCcnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbnZlcnRUb1NpbmdsZVZhbHVlKGFyZywgdmFyTmFtZSkge1xuICAgICAgICBzd2l0Y2goYXJnLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkxJVEVSQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhck5hbWU7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLlBBVEg6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhck5hbWUgKyAnWzBdJztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gWycoaXNBcnIoJywgdmFyTmFtZSwgJyk/JywgdmFyTmFtZSwgJ1swXSA6ICcsIHZhck5hbWUsICcpJ10uam9pbignJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGFydHNXaXRoU3RyaWN0KHZhbDEsIHZhbDIpIHtcbiAgICAgICAgcmV0dXJuIFsndHlwZW9mICcsIHZhbDEsICc9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgJywgdmFsMiwgJz09PSBcInN0cmluZ1wiICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcuaW5kZXhPZignLCB2YWwyLCAnKSA9PT0gMCddLmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0YXJ0c1dpdGgodmFsMSwgdmFsMikge1xuICAgICAgICByZXR1cm4gW3ZhbDEsICchPSBudWxsICYmJywgdmFsMiwgJyE9IG51bGwgJiYnLFxuICAgICAgICAgICAgdmFsMSwgJy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignLCB2YWwyLCAnLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkgPT09IDAnXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRzV2l0aFN0cmljdCh2YWwxLCB2YWwyKSB7XG4gICAgICAgIHJldHVybiBbJ3R5cGVvZiAnLCB2YWwxLCAnPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mICcsIHZhbDIsICc9PT0gXCJzdHJpbmdcIiAmJicsXG4gICAgICAgICAgICB2YWwxLCAnLmxlbmd0aCA+PScsIHZhbDIsICcubGVuZ3RoICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcubGFzdEluZGV4T2YoJywgdmFsMiwgJykgPT09JywgdmFsMSwgJy5sZW5ndGggLScsIHZhbDIsICcubGVuZ3RoJ10uam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kc1dpdGgodmFsMSwgdmFsMikge1xuICAgICAgICByZXR1cm4gW3ZhbDEsICchPSBudWxsICYmJywgdmFsMiwgJyE9IG51bGwgJiYnLFxuICAgICAgICAgICAgJygnLCB2YWwxLCAnPScsIHZhbDEsICcudG9TdHJpbmcoKSkubGVuZ3RoID49JywgJygnLCB2YWwyLCAnPScsIHZhbDIsICcudG9TdHJpbmcoKSkubGVuZ3RoICYmJyxcbiAgICAgICAgICAgICcoJywgdmFsMSwgJy50b0xvd2VyQ2FzZSgpKS5sYXN0SW5kZXhPZignLCAnKCcsIHZhbDIsICcudG9Mb3dlckNhc2UoKSkpID09PScsXG4gICAgICAgICAgICB2YWwxLCAnLmxlbmd0aCAtJywgdmFsMiwgJy5sZW5ndGgnXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb250YWluc1N0cmljdCh2YWwxLCB2YWwyKSB7XG4gICAgICAgIHJldHVybiBbJ3R5cGVvZiAnLCB2YWwxLCAnPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mICcsIHZhbDIsICc9PT0gXCJzdHJpbmdcIiAmJicsXG4gICAgICAgICAgICB2YWwxLCAnLmluZGV4T2YoJywgdmFsMiwgJykgPiAtMSddLmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbnRhaW5zKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgcmV0dXJuIFt2YWwxLCAnIT0gbnVsbCAmJiAnLCB2YWwyLCAnIT0gbnVsbCAmJicsXG4gICAgICAgICAgICB2YWwxLCAnLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKCcsIHZhbDIsICcudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSA+IC0xJ10uam9pbignJyk7XG4gICAgfVxuXG4gICAgdmFyIGJpbmFyeU9wZXJhdG9ycyA9IHtcbiAgICAgICAgICAgICc9PT0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJz09PScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJz09JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWyd0eXBlb2YgJywgdmFsMSwgJz09PSBcInN0cmluZ1wiICYmIHR5cGVvZiAnLCB2YWwyLCAnPT09IFwic3RyaW5nXCI/JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsMSwgJy50b0xvd2VyQ2FzZSgpID09PScsIHZhbDIsICcudG9Mb3dlckNhc2UoKSA6JyArXG4gICAgICAgICAgICAgICAgICAgIHZhbDEsICc9PScsIHZhbDJdLmpvaW4oJycpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJz49JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICc+PScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJz4nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJz4nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICc8PScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnPD0nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICc8JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICc8JyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnIT09JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICchPT0nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICchPScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnIT0nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICdePT0nIDogc3RhcnRzV2l0aFN0cmljdCxcblxuICAgICAgICAgICAgJz09XicgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0c1dpdGhTdHJpY3QodmFsMiwgdmFsMSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnXj0nIDogc3RhcnRzV2l0aCxcblxuICAgICAgICAgICAgJz1eJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhcnRzV2l0aCh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICckPT0nIDogZW5kc1dpdGhTdHJpY3QsXG5cbiAgICAgICAgICAgICc9PSQnIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbmRzV2l0aFN0cmljdCh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICckPScgOiBlbmRzV2l0aCxcblxuICAgICAgICAgICAgJz0kJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW5kc1dpdGgodmFsMiwgdmFsMSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnKj09JyA6IGNvbnRhaW5zU3RyaWN0LFxuXG4gICAgICAgICAgICAnPT0qJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbnNTdHJpY3QodmFsMiwgdmFsMSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnPSonIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWlucyh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICcqPScgOiBjb250YWlucyxcblxuICAgICAgICAgICAgJysnIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJysnICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICctJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICctJyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnKicgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnKicgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJy8nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJy8nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICclJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICclJyArIHZhbDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICByZXR1cm4gdHJhbnNsYXRlO1xufSkoKTtcblxuZnVuY3Rpb24gY29tcGlsZShwYXRoKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uKCdkYXRhLHN1YnN0JywgdHJhbnNsYXRlKHBhcnNlKHBhdGgpKSk7XG59XG5cbnZhciBjYWNoZSA9IHt9LFxuICAgIGNhY2hlS2V5cyA9IFtdLFxuICAgIHBhcmFtcyA9IHtcbiAgICAgICAgY2FjaGVTaXplIDogMTAwXG4gICAgfSxcbiAgICBzZXRQYXJhbXNIb29rcyA9IHtcbiAgICAgICAgY2FjaGVTaXplIDogZnVuY3Rpb24ob2xkVmFsLCBuZXdWYWwpIHtcbiAgICAgICAgICAgIGlmKG5ld1ZhbCA8IG9sZFZhbCAmJiBjYWNoZUtleXMubGVuZ3RoID4gbmV3VmFsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlbW92ZWRLZXlzID0gY2FjaGVLZXlzLnNwbGljZSgwLCBjYWNoZUtleXMubGVuZ3RoIC0gbmV3VmFsKSxcbiAgICAgICAgICAgICAgICAgICAgaSA9IHJlbW92ZWRLZXlzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIHdoaWxlKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY2FjaGVbcmVtb3ZlZEtleXNbaV1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbnZhciBkZWNsID0gZnVuY3Rpb24ocGF0aCwgY3R4LCBzdWJzdHMpIHtcbiAgICBpZighY2FjaGVbcGF0aF0pIHtcbiAgICAgICAgY2FjaGVbcGF0aF0gPSBjb21waWxlKHBhdGgpO1xuICAgICAgICBpZihjYWNoZUtleXMucHVzaChwYXRoKSA+IHBhcmFtcy5jYWNoZVNpemUpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjYWNoZVtjYWNoZUtleXMuc2hpZnQoKV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2FjaGVbcGF0aF0oY3R4LCBzdWJzdHMgfHwge30pO1xufTtcblxuZGVjbC52ZXJzaW9uID0gJzAuNC4wJztcblxuZGVjbC5wYXJhbXMgPSBmdW5jdGlvbihfcGFyYW1zKSB7XG4gICAgaWYoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG5cbiAgICBmb3IodmFyIG5hbWUgaW4gX3BhcmFtcykge1xuICAgICAgICBpZihfcGFyYW1zLmhhc093blByb3BlcnR5KG5hbWUpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgICAgICAgICBzZXRQYXJhbXNIb29rc1tuYW1lXSAmJiBzZXRQYXJhbXNIb29rc1tuYW1lXShwYXJhbXNbbmFtZV0sIF9wYXJhbXNbbmFtZV0pO1xuICAgICAgICAgICAgcGFyYW1zW25hbWVdID0gX3BhcmFtc1tuYW1lXTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmRlY2wuY29tcGlsZSA9IGNvbXBpbGU7XG5cbmRlY2wuYXBwbHkgPSBkZWNsO1xuXG5pZih0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBkZWNsO1xufVxuZWxzZSBpZih0eXBlb2YgbW9kdWxlcyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGVzLmRlZmluZSgnanNwYXRoJywgZnVuY3Rpb24ocHJvdmlkZSkge1xuICAgICAgICBwcm92aWRlKGRlY2wpO1xuICAgIH0pO1xufVxuZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uKHJlcXVpcmUsIGV4cG9ydHMsIG1vZHVsZSkge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGRlY2w7XG4gICAgfSk7XG59XG5lbHNlIHtcbiAgICB3aW5kb3cuSlNQYXRoID0gZGVjbDtcbn1cblxufSkoKTtcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBFUzYgRVhURU5TSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaWYoIVN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aClcbntcblx0U3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoID0gZnVuY3Rpb24ocylcblx0e1xuXHRcdGNvbnN0IGJhc2UgPSAweDAwMDAwMDAwMDAwMDAwMDAwMDAwO1xuXG5cdFx0cmV0dXJuIHRoaXMuaW5kZXhPZihzLCBiYXNlKSA9PT0gYmFzZTtcblx0fTtcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaWYoIVN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGgpXG57XG5cdFN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGggPSBmdW5jdGlvbihzKVxuXHR7XG5cdFx0Y29uc3QgYmFzZSA9IHRoaXMubGVuZ3RoIC0gcy5sZW5ndGg7XG5cblx0XHRyZXR1cm4gdGhpcy5pbmRleE9mKHMsIGJhc2UpID09PSBiYXNlO1xuXHR9O1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogSlFVRVJZIEVYVEVOU0lPTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbnZhciBfYW1pX2ludGVybmFsX2pRdWVyeUVhY2ggPSBqUXVlcnkuZWFjaDtcbnZhciBfYW1pX2ludGVybmFsX2pRdWVyeUFqYXggPSBqUXVlcnkuYWpheDtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxualF1ZXJ5LmVhY2ggPSBmdW5jdGlvbihlbCwgY2FsbGJhY2ssIGNvbnRleHQpXG57XG5cdHJldHVybiBfYW1pX2ludGVybmFsX2pRdWVyeUVhY2goZWwsIGNvbnRleHQgPyAoaW5kZXgsIHZhbHVlKSA9PiBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGluZGV4LCB2YWx1ZSkgOiBjYWxsYmFjayk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5qUXVlcnkuYWpheCA9IGZ1bmN0aW9uKHNldHRpbmdzKVxue1xuXHRpZih0eXBlb2Ygc2V0dGluZ3MgPT09ICdvYmplY3QnXG5cdCAgICYmXG5cdCAgIHNldHRpbmdzLmRhdGFUeXBlID09PSAnc2hlZXQnXG5cdCApIHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dCwgdXJsXSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnY29udGV4dCcsICd1cmwnXSxcblx0XHRcdFtyZXN1bHQsICcnXSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih1cmwpXG5cdFx0e1xuXHRcdFx0JCgnaGVhZCcpLmFwcGVuZCgnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCInICsgdXJsICsgJ1wiPjwvbGluaz4nKS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0KTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIF9hbWlfaW50ZXJuYWxfalF1ZXJ5QWpheC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH1cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZmluZFdpdGhTZWxmOiBmdW5jdGlvbihzZWxlY3Rvcilcblx0e1xuXHRcdHJldHVybiB0aGlzLmZpbmQoc2VsZWN0b3IpLmFkZEJhY2soc2VsZWN0b3IpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXJpYWxpemVPYmplY3Q6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IHt9O1xuXG5cdFx0dGhpcy5zZXJpYWxpemVBcnJheSgpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0aWYoaXRlbS5uYW1lIGluIHJlc3VsdClcblx0XHRcdHtcblx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHJlc3VsdFtpdGVtLm5hbWVdKSA9PT0gJ1tvYmplY3QgU3RyaW5nXScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHRbaXRlbS5uYW1lXSA9IFtyZXN1bHRbaXRlbS5uYW1lXV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXN1bHRbaXRlbS5uYW1lXS5wdXNoKGl0ZW0udmFsdWUgfHwgJycpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHRbaXRlbS5uYW1lXSA9IGl0ZW0udmFsdWUgfHwgJyc7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogQk9PVFNUUkFQIEVYVEVOU0lPTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbnZhciBfYW1pX2ludGVybmFsX21vZGFsWkluZGV4ID0gMTA1MDtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJChkb2N1bWVudCkub24oJ3Nob3cuYnMubW9kYWwnLCAnLm1vZGFsJywgKGUpID0+IHtcblxuXHRjb25zdCBlbCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblxuXHRzZXRUaW1lb3V0KCgpID0+IHtcblxuXHRcdCQoJ2JvZHkgPiAubW9kYWwtYmFja2Ryb3A6bGFzdCcpLmNzcygnei1pbmRleCcsIF9hbWlfaW50ZXJuYWxfbW9kYWxaSW5kZXgrKyk7XG5cdFx0LyotLS0tLS0tLS0tLSovZWwvKi0tLS0tLS0tLS0tKi8uY3NzKCd6LWluZGV4JywgX2FtaV9pbnRlcm5hbF9tb2RhbFpJbmRleCsrKTtcblxuXHR9LCAxMCk7XG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qXG4kKGRvY3VtZW50KS5vbignc2hvdy5icy5kcm9wZG93bicsICcuZHJvcGRvd24nLCAoZSkgPT4ge1xuXG5cdGNvbnN0IGVsID0gJChlLmN1cnJlbnRUYXJnZXQpO1xufSk7XG4qL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBOQU1FU1BBQ0UgSEVMUEVSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZnVuY3Rpb24gXyRjcmVhdGVOYW1lc3BhY2UoJG5hbWUsIHgpXG57XG5cdGxldCBwYXJlbnQgPSB3aW5kb3c7XG5cblx0Y29uc3QgcGFydHMgPSAkbmFtZS5zcGxpdCgvXFxzKlxcLlxccyovZyksIGwgPSBwYXJ0cy5sZW5ndGggLSAxO1xuXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsOyBpKyspXG5cdHtcblx0XHRpZihwYXJlbnRbcGFydHNbaV1dKVxuXHRcdHtcblx0XHRcdHBhcmVudCA9IHBhcmVudFtwYXJ0c1tpXV07XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dID0ge307XG5cdFx0fVxuXHR9XG5cblx0cGFyZW50W3BhcnRzW2ldXSA9IHg7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIF8kYWRkVG9OYW1lc3BhY2UoJG5hbWUsIHgpXG57XG5cdGxldCBwYXJlbnQgPSB3aW5kb3c7XG5cblx0Y29uc3QgcGFydHMgPSAkbmFtZS5zcGxpdCgvXFxzKlxcLlxccyovZyksIGwgPSBwYXJ0cy5sZW5ndGggLSAxO1xuXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsOyBpKyspXG5cdHtcblx0XHRpZihwYXJlbnRbcGFydHNbaV1dKVxuXHRcdHtcblx0XHRcdHBhcmVudCA9IHBhcmVudFtwYXJ0c1tpXV07XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aHJvdyAnYCcgKyAkbmFtZSArICdgIChgJyArIHBhcnRzW2ldICsgJ2ApIG5vdCBkZWNsYXJlZCc7XG5cdFx0fVxuXHR9XG5cblx0cGFyZW50W3BhcnRzW2ldXSA9IHg7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBOQU1FU1BBQ0VTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gICogQ3JlYXRlIGEgbmV3IG5hbWVzcGFjZVxuICAqIEBwYXJhbSB7U3RyaW5nfSAkbmFtZSB0aGUgbmFtZXNwYWNlIG5hbWVcbiAgKiBAcGFyYW0ge09iamVjdH0gWyRkZXNjcl0gdGhlIG5hbWVzcGFjZSBib2R5XG4gICovXG5cbmZ1bmN0aW9uICRBTUlOYW1lc3BhY2UoJG5hbWUsICRkZXNjcilcbntcblx0aWYoISRkZXNjcilcblx0e1xuXHRcdCRkZXNjciA9IHt9O1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRkZXNjci4kbmFtZSA9ICRuYW1lO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfJGNyZWF0ZU5hbWVzcGFjZSgkbmFtZSwgJGRlc2NyKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0aWYoJGRlc2NyLiQpXG5cdHtcblx0XHQkZGVzY3IuJC5hcHBseSgkZGVzY3IpO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogSU5URVJGQUNFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICAqIENyZWF0ZSBhIG5ldyBpbnRlcmZhY2VcbiAgKiBAcGFyYW0ge1N0cmluZ30gJG5hbWUgdGhlIGludGVyZmFjZSBuYW1lXG4gICogQHBhcmFtIHtPYmplY3R9IFskZGVzY3JdIHRoZSBpbnRlcmZhY2UgYm9keVxuICAqL1xuXG5mdW5jdGlvbiAkQU1JSW50ZXJmYWNlKCRuYW1lLCAkZGVzY3IpXG57XG5cdGlmKCEkZGVzY3IpXG5cdHtcblx0XHQkZGVzY3IgPSB7fTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjb25zdCAkY2xhc3MgPSBmdW5jdGlvbigpXG5cdHtcblx0XHR0aHJvdyAnY291bGQgbm9yIGluc3RhbnRpYXRlIGludGVyZmFjZSc7XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGlmKCRkZXNjci4kZXh0ZW5kcylcblx0e1xuXHRcdHRocm93ICdgJGV4dGVuZHNgIG5vdCBhbGxvd2VkIGZvciBpbnRlcmZhY2UnO1xuXHR9XG5cblx0aWYoJGRlc2NyLiRpbXBsZW1lbnRzKVxuXHR7XG5cdFx0dGhyb3cgJ2AkaW1wbGVtZW50c2Agbm90IGFsbG93ZWQgZm9yIGludGVyZmFjZSc7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0aWYoJGRlc2NyLiQpXG5cdHtcblx0XHR0aHJvdyAnYCRgIG5vdCBhbGxvd2VkIGZvciBpbnRlcmZhY2UnO1xuXHR9XG5cblx0aWYoJGRlc2NyLiRpbml0KVxuXHR7XG5cdFx0dGhyb3cgJ2AkaW5pdGAgbm90IGFsbG93ZWQgZm9yIGludGVyZmFjZSc7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGNsYXNzLiRuYW1lID0gJG5hbWU7XG5cdCRjbGFzcy4kY2xhc3MgPSAkY2xhc3M7XG5cdCRjbGFzcy4kbWVtYmVycyA9ICRkZXNjcjtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XyRhZGRUb05hbWVzcGFjZSgkbmFtZSwgJGNsYXNzKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBDTEFTU0VTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gICogQ3JlYXRlIGEgbmV3IGNsYXNzXG4gICogQHBhcmFtIHtTdHJpbmd9ICRuYW1lIHRoZSBjbGFzcyBuYW1lXG4gICogQHBhcmFtIHtPYmplY3R9IFskZGVzY3JdIHRoZSBjbGFzcyBib2R5XG4gICovXG5cbmZ1bmN0aW9uICRBTUlDbGFzcygkbmFtZSwgJGRlc2NyKVxue1xuXHRpZighJGRlc2NyKVxuXHR7XG5cdFx0JGRlc2NyID0ge307XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y29uc3QgJHN1cGVyID0gKCRkZXNjci4kZXh0ZW5kcyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSA/ICRkZXNjci4kZXh0ZW5kcy5wcm90b3R5cGUgOiB7fTtcblxuXHRjb25zdCAkc3VwZXJfaW1wbGVtZW50cyA9ICgkc3VwZXIuJGltcGxlbWVudHMgaW5zdGFuY2VvZiBBcnJheSkgPyAkc3VwZXIuJGltcGxlbWVudHMgOiBbXTtcblx0Y29uc3QgJGRlc2NyX2ltcGxlbWVudHMgPSAoJGRlc2NyLiRpbXBsZW1lbnRzIGluc3RhbmNlb2YgQXJyYXkpID8gJGRlc2NyLiRpbXBsZW1lbnRzIDogW107XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNvbnN0ICRjbGFzcyA9IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Zm9yKGNvbnN0IGkgaW4gdGhpcy4kaW1wbGVtZW50cylcblx0XHR7XG5cdFx0XHRpZih0aGlzLiRpbXBsZW1lbnRzLmhhc093blByb3BlcnR5KGkpKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCAkaW50ZXJmYWNlID0gdGhpcy4kaW1wbGVtZW50c1tpXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaiBpbiAkaW50ZXJmYWNlLiRtZW1iZXJzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoJGludGVyZmFjZS4kbWVtYmVycy5oYXNPd25Qcm9wZXJ0eShqKSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRjb25zdCAkbWVtYmVyID0gJGludGVyZmFjZS4kbWVtYmVyc1tqXTtcblxuXHRcdFx0XHRcdFx0aWYodHlwZW9mKHRoaXNbal0pICE9PSB0eXBlb2YoJG1lbWJlcikpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRocm93ICdjbGFzcyBgJyArIHRoaXMuJG5hbWUgKyAnYCB3aXRoIG11c3QgaW1wbGVtZW50IGAnICsgJGludGVyZmFjZS4kbmFtZSArICcuJyArIGogKyAnYCc7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBfc3VwZXIgPSB0aGlzLiRjbGFzcy5faW50ZXJuYWxfc3VwZXI7XG5cdFx0Y29uc3QgX2FkZGVkID0gdGhpcy4kY2xhc3MuX2ludGVybmFsX2FkZGVkO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLiRzdXBlciA9IHt9O1xuXG5cdFx0Zm9yKGNvbnN0IG5hbWUgaW4gX3N1cGVyKVxuXHRcdHtcblx0XHRcdGlmKF9zdXBlci5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcblx0XHRcdHtcblx0XHRcdFx0dGhpcy4kc3VwZXJbbmFtZV0gPSAoKF9zdXBlciwgbmFtZSwgdGhhdCkgPT4gZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRyZXR1cm4gX3N1cGVyW25hbWVdLmFwcGx5KHRoYXQsIGFyZ3VtZW50cylcblxuXHRcdFx0XHR9KShfc3VwZXIsIG5hbWUsIHRoaXMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy4kYWRkZWQgPSB7fTtcblxuXHRcdGZvcihjb25zdCBuYW1lIGluIF9hZGRlZClcblx0XHR7XG5cdFx0XHRpZihfYWRkZWQuaGFzT3duUHJvcGVydHkobmFtZSkpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuJGFkZGVkW25hbWVdID0gKChfYWRkZWQsIG5hbWUsIHRoYXQpID0+IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0cmV0dXJuIF9hZGRlZFtuYW1lXS5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuXG5cdFx0XHRcdH0pKF9hZGRlZCwgbmFtZSwgdGhpcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLiRpbml0KVxuXHRcdHtcblx0XHRcdHRoaXMuJGluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGNsYXNzLl9pbnRlcm5hbF9zdXBlciA9IHt9O1xuXHQkY2xhc3MuX2ludGVybmFsX2FkZGVkID0ge307XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcihjb25zdCBuYW1lIGluICRzdXBlcilcblx0e1xuXHRcdGlmKG5hbWUgPT09ICckaW5pdCdcblx0XHQgICB8fFxuXHRcdCAgIG5hbWUuY2hhckF0KDApICE9PSAnJCdcblx0XHQgICB8fFxuXHRcdCAgICRzdXBlci5oYXNPd25Qcm9wZXJ0eShuYW1lKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuXHRcdCApIHtcblx0XHRcdCRjbGFzcy5faW50ZXJuYWxfc3VwZXJbbmFtZV0gPSAkc3VwZXJbbmFtZV07XG5cblx0XHRcdCRjbGFzcy5wcm90b3R5cGVbbmFtZV0gPSAkc3VwZXJbbmFtZV07XG5cdFx0fVxuXHR9XG5cblx0Zm9yKGNvbnN0IG5hbWUgaW4gJGRlc2NyKVxuXHR7XG5cdFx0aWYobmFtZSA9PT0gJyRpbml0J1xuXHRcdCAgIHx8XG5cdFx0ICAgbmFtZS5jaGFyQXQoMCkgIT09ICckJ1xuXHRcdCAgIHx8XG5cdFx0ICAgJGRlc2NyLmhhc093blByb3BlcnR5KG5hbWUpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5cdFx0ICkge1xuXHRcdFx0JGNsYXNzLl9pbnRlcm5hbF9hZGRlZFtuYW1lXSA9ICRkZXNjcltuYW1lXTtcblxuXHRcdFx0JGNsYXNzLnByb3RvdHlwZVtuYW1lXSA9ICRkZXNjcltuYW1lXTtcblx0XHR9XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGNsYXNzLnByb3RvdHlwZS4kbmFtZSA9ICRuYW1lO1xuXHQkY2xhc3MucHJvdG90eXBlLiRjbGFzcyA9ICRjbGFzcztcblx0JGNsYXNzLnByb3RvdHlwZS4kaW1wbGVtZW50cyA9ICRzdXBlcl9pbXBsZW1lbnRzLmNvbmNhdCgkZGVzY3JfaW1wbGVtZW50cyk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF8kYWRkVG9OYW1lc3BhY2UoJG5hbWUsICRjbGFzcyk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGlmKCRkZXNjci4kKVxuXHR7XG5cdFx0JGRlc2NyLiQuYXBwbHkoJGNsYXNzKTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIE5vZGVKUyBFWFRFTlNJT04gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pZih0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpXG57XG5cdG1vZHVsZS5leHBvcnRzLk5hbWVzcGFjZSA9ICRBTUlOYW1lc3BhY2U7XG5cdG1vZHVsZS5leHBvcnRzLkludGVyZmFjZSA9ICRBTUlJbnRlcmZhY2U7XG5cdG1vZHVsZS5leHBvcnRzLiAgQ2xhc3MgICA9ICAgJEFNSUNsYXNzICA7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBKUVVFUlkgRVhURU5TSU9OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaWYodHlwZW9mIGpRdWVyeSAhPT0gJ3VuZGVmaW5lZCcpXG57XG5cdGpRdWVyeS5OYW1lc3BhY2UgPSAkQU1JTmFtZXNwYWNlO1xuXHRqUXVlcnkuSW50ZXJmYWNlID0gJEFNSUludGVyZmFjZTtcblx0alF1ZXJ5LiAgQ2xhc3MgICA9ICAgJEFNSUNsYXNzICA7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBBTUkgdXJsIHJvdXRpbmcgc3Vic3lzdGVtXG4gKiBAbmFtZXNwYWNlIGFtaVJvdXRlclxuICovXG5cbiRBTUlOYW1lc3BhY2UoJ2FtaVJvdXRlcicsIC8qKiBAbGVuZHMgYW1pUm91dGVyICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQUklWQVRFIE1FTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfc2NyaXB0VVJMOiAnJyxcblx0X29yaWdpblVSTDogJycsXG5cdF93ZWJBcHBVUkw6ICcnLFxuXG5cdF9oYXNoOiAnJyxcblx0X2FyZ3M6IFtdLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcm91dGVzOiBbXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBSSVZBVEUgTUVUSE9EUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9lYXRTbGFzaGVzOiBmdW5jdGlvbih1cmwpXG5cdHtcblx0XHR1cmwgPSB1cmwudHJpbSgpO1xuXG5cdFx0d2hpbGUodXJsW3VybC5sZW5ndGggLSAxXSA9PT0gJy8nKVxuXHRcdHtcblx0XHRcdHVybCA9IHVybC5zdWJzdHJpbmcoMCwgdXJsLmxlbmd0aCAtIDEpO1xuXHRcdH1cblxuXHRcdHJldHVybiB1cmw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBTVEFUSUMgQ09OU1RSVUNUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkOiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuX2FyZ3MubGVuZ3RoID0gMDtcblx0XHR0aGlzLl9yb3V0ZXMubGVuZ3RoID0gMDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgIGhyZWYgID0gd2luZG93LmxvY2F0aW9uLiBocmVmIC50cmltKCk7XG5cdFx0Y29uc3QgIGhhc2ggID0gd2luZG93LmxvY2F0aW9uLiBoYXNoIC50cmltKCk7XG5cdFx0Y29uc3Qgc2VhcmNoID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC50cmltKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBTQ1JJUFRfVVJMIEFORCBPUklHSU5fVVJMICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGZvcihsZXQgaWR4LCBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspXG5cdFx0e1xuXHRcdFx0aWR4ID0gc2NyaXB0c1tpXS5zcmMuaW5kZXhPZignanMvYW1pLicpO1xuXG5cdFx0XHRpZihpZHggPiAwKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLl9zY3JpcHRVUkwgPSBzY3JpcHRzW2ldLnNyYztcblxuXHRcdFx0XHR0aGlzLl9vcmlnaW5VUkwgPSB0aGlzLl9lYXRTbGFzaGVzKFxuXHRcdFx0XHRcdHRoaXMuX3NjcmlwdFVSTC5zdWJzdHJpbmcoMCwgaWR4KVxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFdFQkFQUF9VUkwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5fd2ViQXBwVVJMID0gdGhpcy5fZWF0U2xhc2hlcyhcblx0XHRcdGhyZWYucmVwbGFjZSgvKD86XFwjfFxcPykuKiQvLCAnJylcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogSEFTSCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLl9oYXNoID0gdGhpcy5fZWF0U2xhc2hlcyhcblx0XHRcdGhhc2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1xcPy4qJC8sICcnKVxuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBBUkdTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHNlYXJjaClcblx0XHR7XG5cdFx0XHRzZWFyY2guc3Vic3RyaW5nKDEpLnNwbGl0KCcmJykuZm9yRWFjaCgocGFyYW0pID0+IHtcblxuXHRcdFx0XHRjb25zdCBwYXJ0cyA9IHBhcmFtLnNwbGl0KCc9Jyk7XG5cblx0XHRcdFx0LyoqLyBpZihwYXJ0cy5sZW5ndGggPT09IDEpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLl9hcmdzW2RlY29kZVVSSUNvbXBvbmVudChwYXJ0c1swXSldID0gLyotLS0tLS0tLSovICcnIC8qLS0tLS0tLS0qLztcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKHBhcnRzLmxlbmd0aCA9PT0gMilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuX2FyZ3NbZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFydHNbMV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBVQkxJQyBNRVRIT0RTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgQVdGJ3Mgc2NyaXB0IFVSTFxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIEFXRidzIHNjcmlwdCBVUkxcblx0ICAqL1xuXG5cdGdldFNjcmlwdFVSTDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NjcmlwdFVSTDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBvcmlnaW4gVVJMXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgb3JpZ2luIFVSTFxuXHQgICovXG5cblx0Z2V0T3JpZ2luVVJMOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fb3JpZ2luVVJMO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIHdlYmFwcCBVUkxcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSB3ZWJhcHAgVVJMXG5cdCAgKi9cblxuXHRnZXRXZWJBcHBVUkw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl93ZWJBcHBVUkw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgYW5jaG9yIHBhcnQgb2YgdGhlIHdlYmFwcCBVUkxcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBhbmNob3IgcGFydCBvZiB0aGUgd2ViYXBwIFVSTFxuXHQgICovXG5cblx0Z2V0SGFzaDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2hhc2g7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgYXJndW1lbnRzIGV4dHJhY3RlZCBmcm9tIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gVGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFxuXHQgICovXG5cblx0Z2V0QXJnczogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2FyZ3M7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXBwZW5kcyBhIHJvdXRpbmcgcnVsZVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHJlZ0V4cCB0aGUgcmVnRXhwXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gaGFuZGxlciB0aGUgaGFuZGxlclxuXHQgICogQHJldHVybnMge05hbWVzcGFjZX0gVGhlIGFtaVJvdXRlciBzaW5nbGV0b25cblx0ICAqL1xuXG5cdGFwcGVuZDogZnVuY3Rpb24ocmVnRXhwLCBoYW5kbGVyKVxuXHR7XG5cdFx0dGhpcy5fcm91dGVzLnVuc2hpZnQoe1xuXHRcdFx0cmVnRXhwOiByZWdFeHAsXG5cdFx0XHRoYW5kbGVyOiBoYW5kbGVyLFxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUmVtb3ZlcyBzb21lIHJvdXRpbmcgcnVsZXNcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSByZWdFeHAgdGhlIHJlZ0V4cFxuXHQgICogQHJldHVybnMge05hbWVzcGFjZX0gVGhlIGFtaVJvdXRlciBzaW5nbGV0b25cblx0ICAqL1xuXG5cdHJlbW92ZTogZnVuY3Rpb24ocmVnRXhwKVxuXHR7XG5cdFx0dGhpcy5fcm91dGVzID0gdGhpcy5fcm91dGVzLmZpbHRlcigocm91dGUpID0+IHtcblxuXHRcdFx0cmV0dXJuIHJvdXRlLnJlZ0V4cC50b1N0cmluZygpICE9PSByZWdFeHAudG9TdHJpbmcoKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENoZWNrcyB3aGV0aGVyIHRoZSBVUkwgbWF0Y2hlcyB3aXRoIGEgcm91dGluZyBydWxlXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGNoZWNrOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbTtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9yb3V0ZXMubGVuZ3RoOyBpKyspXG5cdFx0e1xuXHRcdFx0bSA9IHRoaXMuX2hhc2gubWF0Y2godGhpcy5fcm91dGVzW2ldLnJlZ0V4cCk7XG5cblx0XHRcdGlmKG0pXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuX3JvdXRlc1tpXS5oYW5kbGVyLmFwcGx5KGFtaVJvdXRlciwgbSk7XG5cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFwcGVuZCBhIG5ldyBoaXN0b3J5IGVudHJ5XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCB0aGUgbmV3IHBhdGhcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGV4dD1udWxsXSB0aGUgbmV3IGNvbnRleHRcblx0ICAqIEByZXR1cm5zIHtCb29sZWFufVxuXHQgICovXG5cblx0YXBwZW5kSGlzdG9yeUVudHJ5OiBmdW5jdGlvbihwYXRoLCBjb250ZXh0ID0gbnVsbClcblx0e1xuXHRcdGlmKGhpc3RvcnkucHVzaFN0YXRlKVxuXHRcdHtcblx0XHRcdGhpc3RvcnkucHVzaFN0YXRlKGNvbnRleHQsIG51bGwsIHRoaXMuX3dlYkFwcFVSTCArIHRoaXMuX2VhdFNsYXNoZXMocGF0aCkpO1xuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUmVwbGFjZSB0aGUgY3VycmVudCBoaXN0b3J5IGVudHJ5XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCB0aGUgbmV3IHBhdGhcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGV4dD1udWxsXSB0aGUgbmV3IGNvbnRleHRcblx0ICAqIEByZXR1cm5zIHtCb29sZWFufVxuXHQgICovXG5cblx0cmVwbGFjZUhpc3RvcnlFbnRyeTogZnVuY3Rpb24ocGF0aCwgY29udGV4dCA9IG51bGwpXG5cdHtcblx0XHRpZihoaXN0b3J5LnJlcGxhY2VTdGF0ZSlcblx0XHR7XG5cdFx0XHRoaXN0b3J5LnJlcGxhY2VTdGF0ZShjb250ZXh0LCBudWxsLCB0aGlzLl93ZWJBcHBVUkwgKyB0aGlzLl9lYXRTbGFzaGVzKHBhdGgpKTtcblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kQU1JTmFtZXNwYWNlKCdhbWknLCB7XG5cblx0dmVyc2lvbjogJzAuMC4xJyxcblx0Y29tbWl0X2lkOiAne3tBTUlfQ09NTUlUX0lEfX0nLFxufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBJTlRFUk5BTCBGVU5DVElPTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZnVuY3Rpb24gX2FtaV9pbnRlcm5hbF90aGVuKGRlZmVycmVkLCBkb25lRnVuYywgZmFpbEZ1bmMpXG57XG5cdGlmKGRlZmVycmVkICYmIGRlZmVycmVkLnRoZW4pXG5cdHtcblx0XHRkZWZlcnJlZC50aGVuKGRvbmVGdW5jLCBmYWlsRnVuYyk7XG5cdH1cblx0ZWxzZVxuXHR7XG5cdFx0ZG9uZUZ1bmMoKTtcblx0fVxufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5mdW5jdGlvbiBfYW1pX2ludGVybmFsX2Fsd2F5cyhkZWZlcnJlZCwgYWx3YXlzRnVuYylcbntcblx0aWYoZGVmZXJyZWQgJiYgZGVmZXJyZWQuYWx3YXlzKVxuXHR7XG5cdFx0ZGVmZXJyZWQuYWx3YXlzKGFsd2F5c0Z1bmMpO1xuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdGFsd2F5c0Z1bmMoKTtcblx0fVxufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pV2ViQXBwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIEFNSSB3ZWJhcHAgc3Vic3lzdGVtXG4gKiBAbmFtZXNwYWNlIGFtaVdlYkFwcFxuICovXG5cbiRBTUlOYW1lc3BhY2UoJ2FtaVdlYkFwcCcsIC8qKiBAbGVuZHMgYW1pV2ViQXBwICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQUklWQVRFIE1FTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfaWRSZWdFeHA6IG5ldyBSZWdFeHAoJ1thLXpBLVpdW2EtekEtWjAtOV17N31fW2EtekEtWjAtOV17NH1fW2EtekEtWjAtOV17NH1fW2EtekEtWjAtOV17NH1fW2EtekEtWjAtOV17MTJ9JywgJ2cnKSxcblxuXHRfbGlua0V4cDogbmV3IFJlZ0V4cCgnXFxcXFsoW15cXFxcXV0qKVxcXFxdXFxcXCgoW15cXFxcKV0qKVxcXFwpJywgJ2cnKSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2VtYmVkZGVkOiBmYWxzZSxcblx0X25vQm9vdHN0cmFwOiBmYWxzZSxcblx0X25vRGF0ZVRpbWVQaWNrZXI6IGZhbHNlLFxuXHRfbm9TZWxlY3QyOiBmYWxzZSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2dsb2JhbERlZmVycmVkOiAkLkRlZmVycmVkKCksXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9zaGVldHM6IFtdLFxuXHRfc2NyaXB0czogW10sXG5cblx0X2NvbnRyb2xzOiB7fSxcblx0X3N1YmFwcHM6IHt9LFxuXG5cdF9pc1JlYWR5OiBmYWxzZSxcblx0X2NhbkxlYXZlOiB0cnVlLFxuXHRfbG9ja0NudDogMHgwMCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2N1cnJlbnRTdWJBcHBJbnN0YW5jZTogbmV3IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMub25SZWFkeSA9IGZ1bmN0aW9uKCkge307XG5cdFx0dGhpcy5vbkV4aXQgPSBmdW5jdGlvbigpIHt9O1xuXHRcdHRoaXMub25Mb2dpbiA9IGZ1bmN0aW9uKCkge307XG5cdFx0dGhpcy5vbkxvZ291dCA9IGZ1bmN0aW9uKCkge307XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQVUJMSUMgTUVNQkVSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFRoZSBvcmlnaW4gVVJMXG5cdCAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICovXG5cblx0b3JpZ2luVVJMOiAnLycsXG5cblx0LyoqXG5cdCAgKiBUaGUgd2ViYXBwIFVSTFxuXHQgICogQHR5cGUge1N0cmluZ31cblx0ICAqL1xuXG5cdHdlYkFwcFVSTDogJy8nLFxuXG5cdC8qKlxuXHQgICogVGhlIGFuY2hvciBwYXJ0IG9mIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICovXG5cblx0aGFzaDogJycsXG5cblx0LyoqXG5cdCAgKiBUaGUgYXJndW1lbnRzIGV4dHJhY3RlZCBmcm9tIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAdHlwZSB7QXJyYXk8U3RyaW5nPn1cblx0ICAqL1xuXG5cdGFyZ3M6IHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogU1RBVElDIENPTlNUUlVDVE9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogR0VUIEZMQUdTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1cmwgPSBhbWlSb3V0ZXIuZ2V0U2NyaXB0VVJMKCk7XG5cblx0XHRjb25zdCBpZHggPSB1cmwuaW5kZXhPZignPycpO1xuXG5cdFx0aWYoaWR4ID4gMClcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBmbGFncyA9IHVybC5zdWJzdHJpbmcoaWR4KS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLl9lbWJlZGRlZCA9IChmbGFncy5pbmRleE9mKCdlbWJlZGRlZCcpID49IDApO1xuXG5cdFx0XHR0aGlzLl9ub0Jvb3RzdHJhcCA9IChmbGFncy5pbmRleE9mKCdub2Jvb3RzdHJhcCcpID49IDApO1xuXG5cdFx0XHR0aGlzLl9ub0RhdGVUaW1lUGlja2VyID0gKGZsYWdzLmluZGV4T2YoJ25vZGF0ZXRpbWVwaWNrZXInKSA+PSAwKTtcblxuXHRcdFx0dGhpcy5fbm9TZWxlY3QyID0gKGZsYWdzLmluZGV4T2YoJ25vc2VsZWN0MicpID49IDApO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEdFVCBVUkxTLCBIQVNIIEFORCBBUkdTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5vcmlnaW5VUkwgPSBhbWlSb3V0ZXIuZ2V0T3JpZ2luVVJMKCk7XG5cdFx0dGhpcy53ZWJBcHBVUkwgPSBhbWlSb3V0ZXIuZ2V0V2ViQXBwVVJMKCk7XG5cblx0XHR0aGlzLmhhc2ggPSBhbWlSb3V0ZXIuZ2V0SGFzaCgpO1xuXHRcdHRoaXMuYXJncyA9IGFtaVJvdXRlci5nZXRBcmdzKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBMT0FEIFNIRUVUUyBBTkQgU0NSSVBUUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHJlc291cmNlc0NTUyA9IFtdO1xuXHRcdGNvbnN0IHJlc291cmNlc0pTID0gW107XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKCF3aW5kb3cuUG9wcGVyKSB7XG5cdFx0XHRyZXNvdXJjZXNKUy5wdXNoKHRoaXMub3JpZ2luVVJMICsgJy9qcy9wb3BwZXIubWluLmpzJyk7XG5cdFx0fVxuXG5cdFx0aWYoIXdpbmRvdy5tb21lbnQpIHtcblx0XHRcdHJlc291cmNlc0pTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2pzL21vbWVudC5taW4uanMnKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKCF0aGlzLl9ub0Jvb3RzdHJhcCAmJiAodHlwZW9mIGpRdWVyeS5mbi5tb2RhbCkgIT09ICdmdW5jdGlvbicpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzQ1NTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9ib290c3RyYXAubWluLmNzcycpO1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvYm9vdHN0cmFwLm1pbi5qcycpO1xuXHRcdH1cblxuXHRcdGlmKCF0aGlzLl9ub0RhdGVUaW1lUGlja2VyICYmICh0eXBlb2YgalF1ZXJ5LmZuLmRhdGV0aW1lcGlja2VyKSAhPT0gJ2Z1bmN0aW9uJylcblx0XHR7XG5cdFx0XHRyZXNvdXJjZXNDU1MucHVzaCh0aGlzLm9yaWdpblVSTCArICcvY3NzL2Jvb3RzdHJhcC1kYXRldGltZXBpY2tlci5taW4uY3NzJyk7XG5cdFx0XHRyZXNvdXJjZXNKUy5wdXNoKHRoaXMub3JpZ2luVVJMICsgJy9qcy9ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXIubWluLmpzJyk7XG5cdFx0fVxuXG5cdFx0aWYoIXRoaXMuX25vU2VsZWN0MiAmJiAodHlwZW9mIGpRdWVyeS5mbi5zZWxlY3QyKSAhPT0gJ2Z1bmN0aW9uJylcblx0XHR7XG5cdFx0XHRyZXNvdXJjZXNDU1MucHVzaCh0aGlzLm9yaWdpblVSTCArICcvY3NzL3NlbGVjdDIubWluLmNzcycpO1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvc2VsZWN0Mi5taW4uanMnKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMubG9hZFJlc291cmNlcyhbXG5cdFx0XHQuLi5yZXNvdXJjZXNDU1MsXG5cdFx0XHR0aGlzLm9yaWdpblVSTCArICcvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzJyxcblx0XHRcdHRoaXMub3JpZ2luVVJMICsgJy9jc3MvYW1pLm1pbi5jc3MnLFxuXHRcdFx0Li4ucmVzb3VyY2VzSlMsXG5cdFx0XSkuZG9uZSgoLyotLS0qLykgPT4ge1xuXG5cdFx0XHR0aGlzLl9nbG9iYWxEZWZlcnJlZC5yZXNvbHZlKC8qLS0tKi8pO1xuXG5cdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9nbG9iYWxEZWZlcnJlZC5yZWplY3QobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIE1PREUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hlY2tzIHdoZXRoZXIgdGhlIFdlYkFwcCBpcyBleGVjdXRlZCBpbiBlbWJlZGRlZCBtb2RlXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGlzRW1iZWRkZWQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9lbWJlZGRlZDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDaGVja3Mgd2hldGhlciB0aGUgV2ViQXBwIGlzIGV4ZWN1dGVkIGxvY2FsbHkgKGZpbGU6Ly8sIGxvY2FsaG9zdCwgMTI3LjAuMC4xIG9yIDo6MSlcblx0ICAqIEByZXR1cm5zIHtCb29sZWFufVxuXHQgICovXG5cblx0aXNMb2NhbDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sID09PSAoKCdmaWxlOicpKVxuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gJ2xvY2FsaG9zdCdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUgPT09ICcxMjcuMC4wLjEnXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhvc3RuYW1lID09PSAoKCgnOjoxJykpKVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFRPT0xTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHR5cGVPZjogZnVuY3Rpb24oeClcblx0e1xuXHRcdGNvbnN0IG5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCk7XG5cblx0XHRyZXR1cm4gbmFtZS5zdGFydHNXaXRoKCdbb2JqZWN0ICcpID8gbmFtZS5zdWJzdHJpbmcoOCwgbmFtZS5sZW5ndGggLSAxKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YXNBcnJheTogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLnR5cGVPZih4KSA9PT0gJ0FycmF5JyA/ICh4KVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFt4XVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0dXA6IGZ1bmN0aW9uKG9wdGlvbk5hbWVzLCBvcHRpb25EZWZhdWx0cywgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgbCA9IG9wdGlvbk5hbWVzLmxlbmd0aDtcblx0XHRjb25zdCBtID0gb3B0aW9uRGVmYXVsdHMubGVuZ3RoO1xuXG5cdFx0aWYobCAhPT0gbSlcblx0XHR7XG5cdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoc2V0dGluZ3MpIHtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcblx0XHRcdFx0cmVzdWx0LnB1c2gob3B0aW9uTmFtZXNbaV0gaW4gc2V0dGluZ3MgPyBzZXR0aW5nc1tvcHRpb25OYW1lc1tpXV0gOiBvcHRpb25EZWZhdWx0c1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuXHRcdFx0XHRyZXN1bHQucHVzaCgvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovIG9wdGlvbkRlZmF1bHRzW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlcGxhY2U6IGFtaVR3aWcuc3RkbGliLl9yZXBsYWNlLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfdGV4dFRvSHRtbFg6IFsnJicgICAgLCAnXCInICAgICAsICc8JyAgICwgJz4nICAgXSxcblx0X3RleHRUb0h0bWxZOiBbJyZhbXA7JywgJyZxdW90OycsICcmbHQ7JywgJyZndDsnXSxcblxuXHQvKipcblx0ICAqIEVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIHRleHQgdG8gSFRNTFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyB0aGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKi9cblxuXHR0ZXh0VG9IdG1sOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9IdG1sWCwgdGhpcy5fdGV4dFRvSHRtbFkpO1xuXHR9LFxuXG5cdC8qKlxuXHQgICogVW5lc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBIVE1MIHRvIHRleHRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0aHRtbFRvVGV4dDogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5fdGV4dFRvSHRtbFksIHRoaXMuX3RleHRUb0h0bWxYKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3RleHRUb1N0cmluZ1g6IFsnXFxcXCcgICwgJ1xcbicgLCAnXCInICAsICdcXCcnICBdLFxuXHRfdGV4dFRvU3RyaW5nWTogWydcXFxcXFxcXCcsICdcXFxcbicsICdcXFxcXCInLCAnXFxcXFxcJyddLFxuXG5cdC8qKlxuXHQgICogRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBKYXZhU2NyaXB0IHN0cmluZ1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyB0aGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKi9cblxuXHR0ZXh0VG9TdHJpbmc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKHMgfHwgJycsIHRoaXMuX3RleHRUb1N0cmluZ1gsIHRoaXMuX3RleHRUb1N0cmluZ1kpO1xuXHR9LFxuXG5cdC8qKlxuXHQgICogVW5lc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBKYXZhU2NyaXB0IHN0cmluZyB0byB0ZXh0XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdHN0cmluZ1RvVGV4dDogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5fdGV4dFRvU3RyaW5nWSwgdGhpcy5fdGV4dFRvU3RyaW5nWCk7XG5cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2h0bWxUb1N0cmluZ1g6IFsnXFxcXCcgICwgJ1xcbicgLCAnJnF1b3Q7JyAgLCAnXFwnJyAgXSxcblx0X2h0bWxUb1N0cmluZ1k6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXCZxdW90OycsICdcXFxcXFwnJ10sXG5cblx0LyoqXG5cdCAgKiBFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBIVE1MIHRvIEphdmFTY3JpcHQgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSB1bmVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGh0bWxUb1N0cmluZzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5faHRtbFRvU3RyaW5nWCwgdGhpcy5faHRtbFRvU3RyaW5nWSk7XG5cdH0sXG5cblx0LyoqXG5cdCAgKiBVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEphdmFTY3JpcHQgc3RyaW5nIHRvIEhUTUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0c3RyaW5nVG9IdG1sOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl9odG1sVG9TdHJpbmdZLCB0aGlzLl9odG1sVG9TdHJpbmdYKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3RleHRUb1NRTFg6IFsnXFwnJyAgXSxcblx0X3RleHRUb1NRTFk6IFsnXFwnXFwnJ10sXG5cblx0LyoqXG5cdCAgKiBFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIFNRTFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyB0aGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKi9cblxuXHR0ZXh0VG9TUUw6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKHMgfHwgJycsIHRoaXMuX3RleHRUb1NRTFgsIHRoaXMuX3RleHRUb1NRTFkpO1xuXHR9LFxuXG5cdC8qKlxuXHQgICogVW5lc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBTUUwgdG8gdGV4dFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyB0aGUgZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSB1bmVzY2FwZWQgc3RyaW5nXG5cdCAgKi9cblxuXHRzcWxUb1RleHQ6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKHMgfHwgJycsIHRoaXMuX3RleHRUb1NRTFksIHRoaXMuX3RleHRUb1NRTFgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogQkFTRTY0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2Jhc2U2NDogJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5LV8nLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEVuY29kZXMgKFJGQyA0NjQ4KSBhIHN0cmluZ1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyB0aGUgZGVjb2RlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBlbmNvZGVkIHN0cmluZ1xuXHQgICovXG5cblx0YmFzZTY0RW5jb2RlOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0bGV0IHc7XG5cblx0XHRjb25zdCBlID0gW107XG5cblx0XHRjb25zdCBsID0gcy5sZW5ndGgsIG0gPSBsICUgMztcblxuXHRcdGNvbnN0IHRoaXNfYmFzZTY0ID0gdGhpcy5fYmFzZTY0O1xuXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IGw7KVxuXHRcdHtcblx0XHRcdHcgPSBzLmNoYXJDb2RlQXQoaSsrKSA8PCAxNlxuXHRcdFx0ICAgIHxcblx0XHRcdCAgICBzLmNoYXJDb2RlQXQoaSsrKSA8PCA4XG5cdFx0XHQgICAgfFxuXHRcdFx0ICAgIHMuY2hhckNvZGVBdChpKyspIDw8IDBcblx0XHRcdDtcblxuXHRcdFx0ZS5wdXNoKHRoaXNfYmFzZTY0LmNoYXJBdCgodyA+PiAxOCkgJiAweDNGKSk7XG5cdFx0XHRlLnB1c2godGhpc19iYXNlNjQuY2hhckF0KCh3ID4+IDEyKSAmIDB4M0YpKTtcblx0XHRcdGUucHVzaCh0aGlzX2Jhc2U2NC5jaGFyQXQoKHcgPj4gNikgJiAweDNGKSk7XG5cdFx0XHRlLnB1c2godGhpc19iYXNlNjQuY2hhckF0KCh3ID4+IDApICYgMHgzRikpO1xuXHRcdH1cblxuXHRcdC8qKi8gaWYobSA9PT0gMSkge1xuXHRcdFx0ZS5zcGxpY2UoLTIsIDIpO1xuXHRcdH1cblx0XHRlbHNlIGlmKG0gPT09IDIpIHtcblx0XHRcdGUuc3BsaWNlKC0xLCAxKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZS5qb2luKCcnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBEZWNvZGVzIChSRkMgNDY0OCkgYSBzdHJpbmdcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVuY29kZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZGVjb2RlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGJhc2U2NERlY29kZTogZnVuY3Rpb24ocylcblx0e1xuXHRcdGxldCB3O1xuXG5cdFx0Y29uc3QgZSA9IFtdO1xuXG5cdFx0Y29uc3QgbCA9IHMubGVuZ3RoLCBtID0gbCAlIDQ7XG5cblx0XHRjb25zdCB0aGlzX2Jhc2U2NCA9IHRoaXMuX2Jhc2U2NDtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOylcblx0XHR7XG5cdFx0XHR3ID0gdGhpc19iYXNlNjQuaW5kZXhPZihzLmNoYXJBdChpKyspKSA8PCAxOFxuXHRcdFx0ICAgIHxcblx0XHRcdCAgICB0aGlzX2Jhc2U2NC5pbmRleE9mKHMuY2hhckF0KGkrKykpIDw8IDEyXG5cdFx0XHQgICAgfFxuXHRcdFx0ICAgIHRoaXNfYmFzZTY0LmluZGV4T2Yocy5jaGFyQXQoaSsrKSkgPDwgNlxuXHRcdFx0ICAgIHxcblx0XHRcdCAgICB0aGlzX2Jhc2U2NC5pbmRleE9mKHMuY2hhckF0KGkrKykpIDw8IDBcblx0XHRcdDtcblxuXHRcdFx0ZS5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoKHcgPj4+IDE2KSAmIDB4RkYpKTtcblx0XHRcdGUucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh3ID4+PiA4KSAmIDB4RkYpKTtcblx0XHRcdGUucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh3ID4+PiAwKSAmIDB4RkYpKTtcblx0XHR9XG5cblx0XHQvKiovIGlmKG0gPT09IDIpIHtcblx0XHRcdGUuc3BsaWNlKC0yLCAyKTtcblx0XHR9XG5cdFx0ZWxzZSBpZihtID09PSAzKSB7XG5cdFx0XHRlLnNwbGljZSgtMSwgMSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGUuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBEWU5BTUlDIFJFU09VUkNFIExPQURJTkcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZ2V0RXh0ZW5zaW9uOiBmdW5jdGlvbih1cmwpXG5cdHtcblx0XHRjb25zdCBpZHggPSB1cmwubGFzdEluZGV4T2YoJy4nKTtcblxuXHRcdHJldHVybiBpZHggPiAwID8gdXJsLnN1YnN0cmluZyhpZHgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9nZXREYXRhVHlwZTogZnVuY3Rpb24odXJsLCBkYXRhVHlwZSlcblx0e1xuXHRcdGxldCByZXN1bHQ7XG5cblx0XHRpZihkYXRhVHlwZSA9PT0gJ2F1dG8nKVxuXHRcdHtcblx0XHRcdC8qKi8gaWYodXJsLmluZGV4T2YoJ2N0cmw6JykgPT09IDApXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdCA9ICdjb250cm9sJztcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYodXJsLmluZGV4T2YoJ3N1YmFwcDonKSA9PT0gMClcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0ID0gJ3N1YmFwcCc7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHN3aXRjaCh0aGlzLl9nZXRFeHRlbnNpb24odXJsKS50b0xvd2VyQ2FzZSgpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y2FzZSAnLmNzcyc6XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAnc2hlZXQnO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICcuanMnOlxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gJ3NjcmlwdCc7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJy5qc29uJzpcblx0XHRcdFx0XHRcdHJlc3VsdCA9ICdqc29uJztcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAnLnhtbCc6XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAneG1sJztcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHJlc3VsdCA9ICd0ZXh0Jztcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXN1bHQgPSBkYXRhVHlwZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfX2xvYWRYWFg6IGZ1bmN0aW9uKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KVxuXHR7XG5cdFx0aWYodXJscy5sZW5ndGggPT09IDApXG5cdFx0e1xuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlc29sdmVXaXRoKGNvbnRleHQsIFtyZXN1bHRdKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVybCA9IHVybHMuc2hpZnQoKS50cmltKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRhdGFUWVBFID0gdGhpcy5fZ2V0RGF0YVR5cGUodXJsLCBkYXRhVHlwZSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHN3aXRjaChkYXRhVFlQRSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQ09OVFJPTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2NvbnRyb2wnOlxuXG5cdFx0XHRcdHRoaXMubG9hZENvbnRyb2wodXJsKS50aGVuKChkYXRhKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucHVzaChkYXRhKTtcblxuXHRcdFx0XHRcdHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNVQkFQUCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdzdWJhcHAnOlxuXG5cdFx0XHRcdHRoaXMubG9hZFN1YkFwcCh1cmwpLnRoZW4oKGRhdGEpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGRhdGEpO1xuXG5cdFx0XHRcdFx0dGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU0hFRVQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ3NoZWV0JzpcblxuXHRcdFx0XHRpZih0aGlzLl9zaGVldHMuaW5kZXhPZih1cmwpID49IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChmYWxzZSk7XG5cblx0XHRcdFx0XHR0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgcmVzdWx0LCB1cmxzLCBkYXRhVHlwZSwgY29udGV4dCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRcdHVybDogdXJsLFxuXHRcdFx0XHRcdFx0YXN5bmM6IGZhbHNlLFxuXHRcdFx0XHRcdFx0Y2FjaGU6IGZhbHNlLFxuXHRcdFx0XHRcdFx0Y3Jvc3NEb21haW46IHRydWUsXG5cdFx0XHRcdFx0XHRkYXRhVHlwZTogZGF0YVRZUEUsXG5cdFx0XHRcdFx0fSkudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKHRydWUpO1xuXG5cdFx0XHRcdFx0XHR0aGlzLl9zaGVldHMucHVzaCh1cmwpO1xuXG5cdFx0XHRcdFx0XHR0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgcmVzdWx0LCB1cmxzLCBkYXRhVHlwZSwgY29udGV4dCk7XG5cblx0XHRcdFx0XHR9LCAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBgJyArIHVybCArICdgJ10pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTQ1JJUFQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnc2NyaXB0JzpcblxuXHRcdFx0XHRpZih0aGlzLl9zY3JpcHRzLmluZGV4T2YodXJsKSA+PSAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goZmFsc2UpO1xuXG5cdFx0XHRcdFx0dGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0XHR1cmw6IHVybCxcblx0XHRcdFx0XHRcdGFzeW5jOiBmYWxzZSxcblx0XHRcdFx0XHRcdGNhY2hlOiBmYWxzZSxcblx0XHRcdFx0XHRcdGNyb3NzRG9tYWluOiB0cnVlLFxuXHRcdFx0XHRcdFx0ZGF0YVR5cGU6IGRhdGFUWVBFLFxuXHRcdFx0XHRcdH0pLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaCh0cnVlKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5fc2NyaXB0cy5wdXNoKHVybCk7XG5cblx0XHRcdFx0XHRcdHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblxuXHRcdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIGAnICsgdXJsICsgJ2AnXSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIE9USEVSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRcdFx0YXN5bmM6IHRydWUsXG5cdFx0XHRcdFx0Y2FjaGU6IGZhbHNlLFxuXHRcdFx0XHRcdGNyb3NzRG9tYWluOiB0cnVlLFxuXHRcdFx0XHRcdGRhdGFUeXBlOiBkYXRhVFlQRSxcblx0XHRcdFx0fSkudGhlbigoZGF0YSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goZGF0YSk7XG5cblx0XHRcdFx0XHR0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgcmVzdWx0LCB1cmxzLCBkYXRhVHlwZSwgY29udGV4dCk7XG5cblx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIGAnICsgdXJsICsgJ2AnXSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfbG9hZFhYWDogZnVuY3Rpb24odXJscywgZGF0YVR5cGUsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSB0aGlzLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbZGVmZXJyZWRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgW10sIHRoaXMuYXNBcnJheSh1cmxzKSwgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIHJlc291cmNlcyBieSBleHRlbnNpb25cblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkUmVzb3VyY2VzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICdhdXRvJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIENTUyBzaGVldHNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkU2hlZXRzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICdzaGVldCcsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyBKUyBzY3JpcHRzXG5cdCAgKiBAcGFyYW0geyhBcnJheXxTdHJpbmcpfSB1cmxzIHRoZSBhcnJheSBvZiB1cmxzXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZFNjcmlwdHM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ3NjcmlwdCcsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyBKU09OIGZpbGVzXG5cdCAgKiBAcGFyYW0geyhBcnJheXxTdHJpbmcpfSB1cmxzIHRoZSBhcnJheSBvZiB1cmxzXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZEpTT05zOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICdqc29uJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIFhNTCBmaWxlc1xuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRYTUxzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICd4bWwnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgSFRNTCBmaWxlc1xuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRIVE1MczogZnVuY3Rpb24odXJscywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbG9hZFhYWCh1cmxzLCAndGV4dCcsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyBUV0lHIGZpbGVzXG5cdCAgKiBAcGFyYW0geyhBcnJheXxTdHJpbmcpfSB1cmxzIHRoZSBhcnJheSBvZiB1cmxzXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZFRXSUdzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICd0ZXh0Jywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIHRleHQgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkVGV4dHM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ3RleHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBIVE1MIENPTlRFTlQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfeHh4SFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIG1vZGUsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHQsIHN1ZmZpeCwgZGljdF0gPSB0aGlzLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0JywgJ3N1ZmZpeCcsICdkaWN0J10sXG5cdFx0XHRbcmVzdWx0LCBudWxsLCBudWxsXSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoc3VmZml4KVxuXHRcdHtcblx0XHRcdHR3aWcgPSB0d2lnLnJlcGxhY2UodGhpcy5faWRSZWdFeHAsIGZ1bmN0aW9uKGlkKSB7XG5cblx0XHRcdFx0cmV0dXJuIGlkICsgJ19pbnN0YW5jZScgKyBzdWZmaXg7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRjb25zdCBodG1sID0gdGhpcy5mb3JtYXRUV0lHKHR3aWcsIGRpY3QpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgcHJvbWlzZTtcblxuXHRcdGxldCBlbCA9ICQoc2VsZWN0b3IpO1xuXG5cdFx0c3dpdGNoKG1vZGUpXG5cdFx0e1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRwcm9taXNlID0gZWwuaHRtbChodG1sKS5wcm9taXNlKCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHByb21pc2UgPSBlbC5wcmVwZW5kKGh0bWwpLnByb21pc2UoKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0cHJvbWlzZSA9IGVsLmFwcGVuZChodG1sKS5wcm9taXNlKCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDM6XG5cdFx0XHRcdHByb21pc2UgPSBlbC5yZXBsYWNlV2l0aChlbC5pcygnW2lkXScpID8gaHRtbC5yZXBsYWNlKC9eXFxzKig8W2EtekEtWl8tXSspLywgJyQxIGlkPVwiJyArIGVsLmF0dHIoJ2lkJykgKyAnXCInKSA6IGh0bWwpLnByb21pc2UoKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRocm93ICdpbnRlcm5hbCBlcnJvcic7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRwcm9taXNlLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsZXQgZWwgPSAkKHNlbGVjdG9yKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgX2ZpbmQgPSBtb2RlID09PSAzID8gKF9zZWxlY3RvcikgPT4gZWwuZmluZFdpdGhTZWxmKF9zZWxlY3Rvcilcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICA6IChfc2VsZWN0b3IpID0+IGVsLiAgICBmaW5kICAgIChfc2VsZWN0b3IpXG5cdFx0XHQ7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKGpRdWVyeS5mbi50b29sdGlwKVxuXHRcdFx0e1xuXHRcdFx0XHRfZmluZCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoe1xuXHRcdFx0XHRcdGh0bWw6IGZhbHNlLFxuXHRcdFx0XHRcdGRlbGF5OiB7XG5cdFx0XHRcdFx0XHRzaG93OiA1MDAsXG5cdFx0XHRcdFx0XHRoaWRlOiAxMDAsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKGpRdWVyeS5mbi5wb3BvdmVyKVxuXHRcdFx0e1xuXHRcdFx0XHRfZmluZCgnW2RhdGEtdG9nZ2xlPVwicG9wb3ZlclwiXScpLnBvcG92ZXIoe1xuXHRcdFx0XHRcdGh0bWw6IHRydWUsXG5cdFx0XHRcdFx0ZGVsYXk6IHtcblx0XHRcdFx0XHRcdHNob3c6IDUwMCxcblx0XHRcdFx0XHRcdGhpZGU6IDEwMCxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYoalF1ZXJ5LmZuLmRhdGV0aW1lcGlja2VyKVxuXHRcdFx0e1xuXHRcdFx0XHRfZmluZCgnLmZvcm0tZGF0ZXRpbWUnKS5kYXRldGltZXBpY2tlcih7XG5cdFx0XHRcdFx0Zm9ybWF0OiAnWVlZWS1NTS1ERCBISDptbTpzcy5TU1NTU1MnXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdF9maW5kKCcuZm9ybS1kYXRlJykuZGF0ZXRpbWVwaWNrZXIoe1xuXHRcdFx0XHRcdGZvcm1hdDogJ1lZWVktTU0tREQnXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdF9maW5kKCcuZm9ybS10aW1lJykuZGF0ZXRpbWVwaWNrZXIoe1xuXHRcdFx0XHRcdGZvcm1hdDogJ0hIOm1tOnNzJ1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtlbF0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBQdXRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdHJlcGxhY2VIVE1MOiBmdW5jdGlvbihzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5feHh4SFRNTChzZWxlY3RvciwgdHdpZywgMCwgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFByZXBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdHByZXBlbmRIVE1MOiBmdW5jdGlvbihzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5feHh4SFRNTChzZWxlY3RvciwgdHdpZywgMSwgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFwcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIHRoZSB0YXJnZXQgc2VsZWN0b3Jcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0d2lnIHRoZSBUV0lHIGZyYWdtZW50XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0YXBwZW5kSFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3h4eEhUTUwoc2VsZWN0b3IsIHR3aWcsIDIsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBJbnRlcnByZXRlcyB0aGUgZ2l2ZW4gVFdJRyBzdHJpbmcsIHNlZSB7QGxpbmsgaHR0cDovL3R3aWcuc2Vuc2lvbGFicy5vcmcvZG9jdW1lbnRhdGlvbn1cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0d2lnIHRoZSBUV0lHIHN0cmluZ1xuXHQgICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IFtkaWN0XSB0aGUgZGljdGlvbmFyeVxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIEludGVycHJldGVkIFRXSUcgc3RyaW5nXG5cdCAgKi9cblxuXHRmb3JtYXRUV0lHOiBmdW5jdGlvbih0d2lnLCBkaWN0KVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHJlbmRlciA9ICh0d2lnLCBkaWN0KSA9PiB7XG5cblx0XHRcdGlmKHRoaXMudHlwZU9mKGRpY3QpICE9PSAnT2JqZWN0Jylcblx0XHRcdHtcblx0XHRcdFx0ZGljdCA9IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHRkaWN0WydPUklHSU5fVVJMJ10gPSB0aGlzLm9yaWdpblVSTDtcblx0XHRcdGRpY3RbJ1dFQkFQUF9VUkwnXSA9IHRoaXMud2ViQXBwVVJMO1xuXG5cdFx0XHRyZXR1cm4gYW1pVHdpZy5lbmdpbmUucmVuZGVyKHR3aWcsIGRpY3QpO1xuXHRcdH07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRyeVxuXHRcdHtcblx0XHRcdGlmKHRoaXMudHlwZU9mKGRpY3QpID09PSAnQXJyYXknKVxuXHRcdFx0e1xuXHRcdFx0XHRkaWN0LmZvckVhY2goKERJQ1QpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKHJlbmRlcih0d2lnLCBESUNUKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQucHVzaChyZW5kZXIodHdpZywgZGljdCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRjYXRjaChlcnJvcilcblx0XHR7XG5cdFx0XHRyZXN1bHQubGVuZ3RoID0gMDtcblxuXHRcdFx0dGhpcy5lcnJvcignVFdJRyBwYXJzaW5nIGVycm9yOiAnICsgZXJyb3IubWVzc2FnZSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSlNQQVRIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBGaW5kcyBkYXRhIHdpdGhpbiB0aGUgZ2l2ZW4gSlNPTiwgc2VlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vZGZpbGF0b3YvanNwYXRofVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggdGhlIHBhdGhcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBqc29uIHRoZSBKU09OXG5cdCAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSByZXN1bHRpbmcgYXJyYXlcblx0ICAqL1xuXG5cdGpzcGF0aDogZnVuY3Rpb24ocGF0aCwganNvbilcblx0e1xuXHRcdHJldHVybiBKU1BhdGguYXBwbHkocGF0aCwganNvbik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBTVEFDSyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRTdGFjazogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0dGhyb3cgRXJyb3IoKTtcblx0XHR9XG5cdFx0Y2F0Y2goZTEpXG5cdFx0e1xuXHRcdFx0dHJ5XG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBlMS5zdGFjaztcblx0XHRcdH1cblx0XHRcdGNhdGNoKGUyKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gKCgoJycpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogTE9DSyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBMb2NrcyB0aGUgV2ViIGFwcGxpY2F0aW9uXG5cdCAgKi9cblxuXHRsb2NrOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGluZXMgPSB0aGlzLmdldFN0YWNrKCkuc3BsaXQoJ1xcbicpO1xuXG5cdFx0aWYobGluZXMubGVuZ3RoID4gMilcblx0XHR7XG5cdFx0XHRjb25zb2xlLmxvZygnbG9ja1snICsgdGhpcy5fbG9ja0NudCArICddIDo6ICcgKyBsaW5lc1syXSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXHRcdH1cblxuXHRcdC8qKi9cblxuXHRcdGlmKHRoaXMuX2xvY2tDbnQgPD0gMClcblx0XHR7XG5cdFx0XHQkKCcjYW1pX2xvY2tlcicpLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XG5cblx0XHRcdHRoaXMuX2xvY2tDbnQgPSAxO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhpcy5fbG9ja0NudCsrO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBVbmxvY2tzIHRoZSBXZWIgYXBwbGljYXRpb25cblx0ICAqL1xuXG5cdHVubG9jazogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYodGhpcy5fbG9ja0NudCA8PSAxKVxuXHRcdHtcblx0XHRcdCQoJyNhbWlfbG9ja2VyJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuXHRcdFx0dGhpcy5fbG9ja0NudCA9IDA7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aGlzLl9sb2NrQ250LS07XG5cdFx0fVxuXG5cdFx0LyoqL1xuXG5cdFx0bGV0IGxpbmVzID0gdGhpcy5nZXRTdGFjaygpLnNwbGl0KCdcXG4nKTtcblxuXHRcdGlmKGxpbmVzLmxlbmd0aCA+IDIpXG5cdFx0e1xuXHRcdFx0Y29uc29sZS5sb2coJ3VubG9ja1snICsgdGhpcy5fbG9ja0NudCArICddIDo6ICcgKyBsaW5lc1syXSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBFbmFibGVzIHRoZSBtZXNzYWdlIGluIGEgY29uZmlybWF0aW9uIGRpYWxvZyBib3ggdG8gaW5mb3JtIHRoYXQgdGhlIHVzZXIgaXMgYWJvdXQgdG8gbGVhdmUgdGhlIGN1cnJlbnQgcGFnZS5cblx0ICAqL1xuXG5cdGNhbkxlYXZlOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jYW5MZWF2ZSA9IHRydWU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRGlzYWJsZXMgdGhlIG1lc3NhZ2UgaW4gYSBjb25maXJtYXRpb24gZGlhbG9nIGJveCB0byBpbmZvcm0gdGhhdCB0aGUgdXNlciBpcyBhYm91dCB0byBsZWF2ZSB0aGUgY3VycmVudCBwYWdlLlxuXHQgICovXG5cblx0Y2Fubm90TGVhdmU6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuX2NhbkxlYXZlID0gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBNRVNTQUdFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcHVibGlzaEFsZXJ0OiBmdW5jdGlvbihjbGF6eiwgdGl0bGUsIG1lc3NhZ2UsIGZhZGVPdXQpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnNvbGUubG9nKCdBTUkgJyArIHRpdGxlLnRvVXBwZXJDYXNlKCkgKyAnOiAnICsgbWVzc2FnZSArICdcXG4nICsgdGhpcy5nZXRTdGFjaygpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGh0bWwgPSAnPGRpdiBjbGFzcz1cInRvYXN0XCIgcm9sZT1cImFsZXJ0XCIgJyArIChmYWRlT3V0ID8gJ2RhdGEtZGVsYXk9XCI2MDAwMFwiJyA6ICdkYXRhLWF1dG9oaWRlPVwiZmFsc2VcIicpICsgJz48ZGl2IGNsYXNzPVwidG9hc3QtaGVhZGVyXCI+PHN0cm9uZyBjbGFzcz1cIm1yLWF1dG8gJyArIGNsYXp6ICsgJ1wiPicgKyB0aXRsZSArICc8L3N0cm9uZz48c21hbGw+JyArIHRoaXMudGV4dFRvSHRtbCh3aW5kb3cubW9tZW50KCkuZm9ybWF0KCdERCBNTU0sIEhIOm1tOnNzJykpICsgJzwvc21hbGw+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtbC0yIG1iLTEgY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJ0b2FzdFwiPjxzcGFuPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+PC9kaXY+PGRpdiBjbGFzcz1cInRvYXN0LWJvZHlcIj4nICsgdGhpcy50ZXh0VG9IdG1sKG1lc3NhZ2UpICsgJzwvZGl2PjwvZGl2Pic7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGVsID0gJCgnI2FtaV9hbGVydF9jb250ZW50Jyk7XG5cblx0XHRlbC5hcHBlbmQoaHRtbC5yZXBsYWNlKHRoaXMuX2xpbmtFeHAsICc8YSBocmVmPVwiJDFcIiB0YXJnZXQ9XCJfYmxhbmtcIj4kMjwvYT4nKSkucHJvbWlzZSgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRlbC5maW5kKCcudG9hc3Q6bGFzdC1jaGlsZCcpLnRvYXN0KCdzaG93Jyk7XG5cblx0XHRcdCQoZG9jdW1lbnQpLnNjcm9sbFRvcCgwKTtcblxuXHRcdFx0dGhpcy51bmxvY2soKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFNob3dzIGFuICdpbmZvJyBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbWVzc2FnZSB0aGUgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtCb29sZWFufSBbZmFkZU91dD1mYWxzZV0gaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcblx0ICAqL1xuXG5cdGluZm86IGZ1bmN0aW9uKG1lc3NhZ2UsIGZhZGVPdXQpXG5cdHtcblx0XHRpZih0aGlzLnR5cGVPZihtZXNzYWdlKSA9PT0gJ0FycmF5Jylcblx0XHR7XG5cdFx0XHRtZXNzYWdlID0gbWVzc2FnZS5qb2luKCcuICcpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3B1Ymxpc2hBbGVydCgndGV4dC1pbmZvJywgJ0luZm8nLCBtZXNzYWdlLCBmYWRlT3V0KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTaG93cyBhICdzdWNjZXNzJyBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbWVzc2FnZSB0aGUgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtCb29sZWFufSBbZmFkZU91dD1mYWxzZV0gaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcblx0ICAqL1xuXG5cdHN1Y2Nlc3M6IGZ1bmN0aW9uKG1lc3NhZ2UsIGZhZGVPdXQpXG5cdHtcblx0XHRpZih0aGlzLnR5cGVPZihtZXNzYWdlKSA9PT0gJ0FycmF5Jylcblx0XHR7XG5cdFx0XHRtZXNzYWdlID0gbWVzc2FnZS5qb2luKCcuICcpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3B1Ymxpc2hBbGVydCgndGV4dC1zdWNjZXNzJywgJ1N1Y2Nlc3MnLCBtZXNzYWdlLCBmYWRlT3V0KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTaG93cyBhICd3YXJuaW5nJyBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbWVzc2FnZSB0aGUgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtCb29sZWFufSBbZmFkZU91dD1mYWxzZV0gaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcblx0ICAqL1xuXG5cdHdhcm5pbmc6IGZ1bmN0aW9uKG1lc3NhZ2UsIGZhZGVPdXQpXG5cdHtcblx0XHRpZih0aGlzLnR5cGVPZihtZXNzYWdlKSA9PT0gJ0FycmF5Jylcblx0XHR7XG5cdFx0XHRtZXNzYWdlID0gbWVzc2FnZS5qb2luKCcuICcpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3B1Ymxpc2hBbGVydCgndGV4dC13YXJuaW5nJywgJ1dhcm5pbmcnLCBtZXNzYWdlLCBmYWRlT3V0KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTaG93cyBhbiAnZXJyb3InIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBtZXNzYWdlIHRoZSBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge0Jvb2xlYW59IFtmYWRlT3V0PWZhbHNlXSBpZiBUcnVlLCB0aGUgbWVzc2FnZSBkaXNhcHBlYXJzIGFmdGVyIDYwc1xuXHQgICovXG5cblx0ZXJyb3I6IGZ1bmN0aW9uKG1lc3NhZ2UsIGZhZGVPdXQpXG5cdHtcblx0XHRpZih0aGlzLnR5cGVPZihtZXNzYWdlKSA9PT0gJ0FycmF5Jylcblx0XHR7XG5cdFx0XHRtZXNzYWdlID0gbWVzc2FnZS5qb2luKCcuICcpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3B1Ymxpc2hBbGVydCgndGV4dC1kYW5nZXInLCAnRXJyb3InLCBtZXNzYWdlLCBmYWRlT3V0KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBGbHVzaGVzIG1lc3NhZ2VzXG5cdCAgKi9cblxuXHRmbHVzaDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0JCgnI2FtaV9hbGVydF9jb250ZW50JykuZW1wdHkoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIEJSRUFEQ1JVTUIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRmlsbCB0aGUgbWFpbiBicmVhZGNydW1iXG5cdCAgKiBAcGFyYW0ge0FycmF5fSBpdGVtcyB0aGUgYXJyYXkgb2YgaXRlbXMgKEhUTUwgZm9ybWF0KVxuXHQgICovXG5cblx0ZmlsbEJyZWFkY3J1bWI6IGZ1bmN0aW9uKGl0ZW1zKVxuXHR7XG5cdFx0bGV0IHMgPSB0aGlzLnR5cGVPZihpdGVtcykgPT09ICdBcnJheScgPyBpdGVtcy5tYXAoKGl0ZW0pID0+ICc8bGkgY2xhc3M9XCJicmVhZGNydW1iLWl0ZW1cIj4nICsgaXRlbS5yZXBsYWNlKC97e1dFQkFQUF9VUkx9fS9nLCB0aGlzLndlYkFwcFVSTCkgKyAnPC9saT4nKS5qb2luKCcnKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cblx0XHQkKCcjYW1pX2JyZWFkY3J1bWJfY29udGVudCcpLmh0bWwocyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBXRUIgQVBQTElDQVRJT04gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFRoaXMgbWV0aG9kIG11c3QgYmUgb3ZlcmxvYWRlZCBhbmQgaXMgY2FsbGVkIHdoZW4gdGhlIFdlYiBhcHBsaWNhdGlvbiBzdGFydHNcblx0ICAqIEBldmVudCBhbWlXZWJBcHAjb25SZWFkeVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHVzZXJEYXRhXG5cdCAgKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZighdGhpcy5fZW1iZWRkZWQpXG5cdFx0e1xuXHRcdFx0YWxlcnQoJ2Vycm9yOiBgYW1pV2ViQXBwLm9uUmVhZHkoKWAgbXVzdCBiZSBvdmVybG9hZGVkIScpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFRoaXMgbWV0aG9kIG11c3QgYmUgb3ZlcmxvYWRlZCBhbmQgaXMgY2FsbGVkIHdoZW4gdGhlIHRvb2xiYXIgbmVlZHMgdG8gYmUgdXBkYXRlZFxuXHQgICogQGV2ZW50IGFtaVdlYkFwcCNvblJlZnJlc2hcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNBdXRoXG5cdCAgKi9cblxuXHRvblJlZnJlc2g6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKCF0aGlzLl9lbWJlZGRlZClcblx0XHR7XG5cdFx0XHRhbGVydCgnZXJyb3I6IGBhbWlXZWJBcHAub25SZWZyZXNoKClgIG11c3QgYmUgb3ZlcmxvYWRlZCEnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTdGFydHMgdGhlIFdlYiBhcHBsaWNhdGlvblxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAobG9nb191cmwsIGhvbWVfdXJsLCBjb250YWN0X2VtYWlsLCBhYm91dF91cmwsIHRoZW1lX3VybCwgbG9ja2VyX3VybCwgY2hhbmdlX3Bhc3NvcmRfYWxsb3dlZCwgY2hhbmdlX2luZm9fYWxsb3dlZCwgY2hhbmdlX3Bhc3NvcmRfYWxsb3dlZClcblx0ICAqL1xuXG5cdHN0YXJ0OiBmdW5jdGlvbihzZXR0aW5ncylcblx0e1xuXHRcdHRoaXMuX2dsb2JhbERlZmVycmVkLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBbXG5cdFx0XHRcdGxvZ29VUkwsIGhvbWVVUkwsIGNvbnRhY3RFbWFpbCxcblx0XHRcdFx0YWJvdXRVUkwsIHRoZW1lVVJMLCBsb2NrZXJVUkwsIGVuZHBvaW50VVJMLFxuXHRcdFx0XHRjcmVhdGVBY2NvdW50QWxsb3dlZCwgY2hhbmdlSW5mb0FsbG93ZWQsIGNoYW5nZVBhc3NvcmRBbGxvd2VkXG5cdFx0XHRdID0gdGhpcy5zZXR1cChbXG5cdFx0XHRcdCdsb2dvX3VybCcsICdob21lX3VybCcsICdjb250YWN0X2VtYWlsJyxcblx0XHRcdFx0J2Fib3V0X3VybCcsICd0aGVtZV91cmwnLCAnbG9ja2VyX3VybCcsICdlbmRwb2ludF91cmwnLFxuXHRcdFx0XHQnY3JlYXRlX2FjY291bnRfYWxsb3dlZCcsICdjaGFuZ2VfaW5mb19hbGxvd2VkJywgJ2NoYW5nZV9wYXNzb3JkX2FsbG93ZWQnLFxuXHRcdFx0XSwgW1xuXHRcdFx0XHR0aGlzLm9yaWdpblVSTFxuXHRcdFx0XHRcdCsgJy9pbWFnZXMvbG9nby5wbmcnLFxuXHRcdFx0XHR0aGlzLndlYkFwcFVSTCxcblx0XHRcdFx0J2FtaUBscHNjLmluMnAzLmZyJyxcblx0XHRcdFx0J2h0dHA6Ly9jZXJuLmNoL2FtaS8nLFxuXHRcdFx0XHR0aGlzLm9yaWdpblVSTCArICcvdHdpZy9BTUkvVGhlbWUvYmx1ZS50d2lnJyxcblx0XHRcdFx0dGhpcy5vcmlnaW5VUkwgKyAnL3R3aWcvQU1JL0ZyYWdtZW50L2xvY2tlci50d2lnJyxcblx0XHRcdFx0dGhpcy5vcmlnaW5VUkwgKyAnL0FNSS9Gcm9udEVuZCcsXG5cdFx0XHRcdHRydWUsIHRydWUsIHRydWUsXG5cdFx0XHRdLCBzZXR0aW5ncyk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGFtaUNvbW1hbmQuZW5kcG9pbnQgPSBlbmRwb2ludFVSTDtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0d2luZG93Lm9uYmVmb3JldW5sb2FkID0gKGUpID0+IHtcblxuXHRcdFx0XHRpZighdGhpcy5fY2FuTGVhdmUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBmID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG5cblx0XHRcdFx0XHRpZihmKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGYucmV0dXJuVmFsdWUgPSAnQ29uZmlybSB0aGF0IHlvdSB3YW50IHRvIGxlYXZlIHRoaXMgcGFnZT8nO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiAnQ29uZmlybSB0aGF0IHlvdSB3YW50IHRvIGxlYXZlIHRoaXMgcGFnZT8nO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBjb250cm9sc1VSTCA9IHRoaXMub3JpZ2luVVJMICsgJy9jb250cm9scy9DT05UUk9MUy5qc29uJztcblxuXHRcdFx0Y29uc3Qgc3ViYXBwc1VSTCA9IHRoaXMub3JpZ2luVVJMICsgJy9zdWJhcHBzL1NVQkFQUFMuanNvbic7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQuYWpheCh7dXJsOiBjb250cm9sc1VSTCwgY2FjaGU6IGZhbHNlLCBjcm9zc0RvbWFpbjogdHJ1ZSwgZGF0YVR5cGU6ICdqc29uJ30pLnRoZW4oKGRhdGExKSA9PiB7XG5cblx0XHRcdFx0JC5hamF4KHt1cmw6IHN1YmFwcHNVUkwsIGNhY2hlOiBmYWxzZSwgY3Jvc3NEb21haW46IHRydWUsIGRhdGFUeXBlOiAnanNvbid9KS50aGVuKChkYXRhMikgPT4ge1xuXG5cdFx0XHRcdFx0Zm9yKGNvbnN0IG5hbWUgaW4gZGF0YTEpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2NvbnRyb2xzW25hbWUudG9Mb3dlckNhc2UoKV0gPSBkYXRhMVtuYW1lXTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IoY29uc3QgbmFtZSBpbiBkYXRhMikge1xuXHRcdFx0XHRcdFx0dGhpcy5fc3ViYXBwc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gZGF0YTJbbmFtZV07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoIXRoaXMuX2VtYmVkZGVkKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRcdFx0XHRcdExPR09fVVJMOiBsb2dvVVJMLFxuXHRcdFx0XHRcdFx0XHRIT01FX1VSTDogaG9tZVVSTCxcblx0XHRcdFx0XHRcdFx0Q09OVEFDVF9FTUFJTDogY29udGFjdEVtYWlsLFxuXHRcdFx0XHRcdFx0XHRBQk9VVF9VUkw6IGFib3V0VVJMLFxuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0JC5hamF4KHt1cmw6IHRoZW1lVVJMLCBjYWNoZTogdHJ1ZSwgY3Jvc3NEb21haW46IHRydWUsIGRhdGFUeXBlOiAndGV4dCd9KS50aGVuKChkYXRhMykgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdCQuYWpheCh7dXJsOiBsb2NrZXJVUkwsIGNhY2hlOiB0cnVlLCBjcm9zc0RvbWFpbjogdHJ1ZSwgZGF0YVR5cGU6ICd0ZXh0J30pLnRoZW4oKGRhdGE0KSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHQkKCdib2R5JykuYXBwZW5kKHRoaXMuZm9ybWF0VFdJRyhkYXRhMywgZGljdCkgKyBkYXRhNCkucHJvbWlzZSgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmxvY2soKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0YW1pTG9naW4uX3N0YXJ0KFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjcmVhdGVBY2NvdW50QWxsb3dlZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hhbmdlSW5mb0FsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNoYW5nZVBhc3NvcmRBbGxvd2VkXG5cdFx0XHRcdFx0XHRcdFx0XHQpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMudW5sb2NrKCk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmVycm9yKG1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0YWxlcnQoJ2NvdWxkIG5vdCBvcGVuIGAnICsgbG9ja2VyVVJMICsgJ2AsIHBsZWFzZSByZWxvYWQgdGhlIHBhZ2UuLi4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdGFsZXJ0KCdjb3VsZCBub3Qgb3BlbiBgJyArIHRoZW1lVVJMICsgJ2AsIHBsZWFzZSByZWxvYWQgdGhlIHBhZ2UuLi4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRsZXQgZGF0YTMgPSAnJztcblxuXHRcdFx0XHRcdFx0aWYoJCgnI2FtaV9hbGVydF9jb250ZW50JykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdGRhdGEzICs9ICc8ZGl2IGlkPVwiYW1pX2FsZXJ0X2NvbnRlbnRcIj48L2Rpdj4nO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZigkKCcjYW1pX2xvZ2luX21lbnVfY29udGVudCcpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRkYXRhMyArPSAnPGRpdiBpZD1cImFtaV9sb2dpbl9tZW51X2NvbnRlbnRcIj48L2Rpdj4nO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHQkLmFqYXgoe3VybDogbG9ja2VyVVJMLCBjYWNoZTogdHJ1ZSwgY3Jvc3NEb21haW46IHRydWUsIGRhdGFUeXBlOiAndGV4dCd9KS5kb25lKChkYXRhNCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdCQoJ2JvZHknKS5wcmVwZW5kKGRhdGEzICsgZGF0YTQpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdHRoaXMubG9jaygpO1xuXG5cdFx0XHRcdFx0XHRcdFx0YW1pTG9naW4uX3N0YXJ0KFxuXHRcdFx0XHRcdFx0XHRcdFx0Y3JlYXRlQWNjb3VudEFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRjaGFuZ2VJbmZvQWxsb3dlZCxcblx0XHRcdFx0XHRcdFx0XHRcdGNoYW5nZVBhc3NvcmRBbGxvd2VkXG5cdFx0XHRcdFx0XHRcdFx0KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy51bmxvY2soKTtcblxuXHRcdFx0XHRcdFx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5lcnJvcihtZXNzYWdlKTtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0YWxlcnQoJ2NvdWxkIG5vdCBvcGVuIGAnICsgc3ViYXBwc1VSTCArICdgLCBwbGVhc2UgcmVsb2FkIHRoZSBwYWdlLi4uJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRhbGVydCgnY291bGQgbm90IG9wZW4gYCcgKyBjb250cm9sc1VSTCArICdgLCBwbGVhc2UgcmVsb2FkIHRoZSBwYWdlLi4uJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbGVydChtZXNzYWdlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogQ09OVFJPTFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyBhIGNvbnRyb2xcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBjb250cm9sIHRoZSBhcnJheSBvZiBjb250cm9sIG5hbWVcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkQ29udHJvbDogZnVuY3Rpb24oY29udHJvbCwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSB0aGlzLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoY29udHJvbC5pbmRleE9mKCdjdHJsOicpID09PSAwKVxuXHRcdHtcblx0XHRcdGNvbnRyb2wgPSBjb250cm9sLnN1YnN0cmluZyg1KTtcblx0XHR9XG5cblx0XHRjb25zdCBkZXNjciA9IHRoaXMuX2NvbnRyb2xzW2NvbnRyb2wudG9Mb3dlckNhc2UoKV07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKGRlc2NyKVxuXHRcdHtcblx0XHRcdHRoaXMubG9hZFNjcmlwdHModGhpcy5vcmlnaW5VUkwgKyAnLycgKyBkZXNjci5maWxlKS50aGVuKChsb2FkZWQpID0+IHtcblxuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGNsYXp6ID0gd2luZG93W1xuXHRcdFx0XHRcdFx0ZGVzY3IuY2xhenpcblx0XHRcdFx0XHRdO1xuXG5cdFx0XHRcdFx0Y29uc3QgcHJvbWlzZSA9IGxvYWRlZFswXSA/IGNsYXp6LnByb3RvdHlwZS5vblJlYWR5LmFwcGx5KGNsYXp6LnByb3RvdHlwZSlcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgIDogLyotLS0tLS0tLS0tLS0tLS0tKi8gbnVsbCAvKi0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdF9hbWlfaW50ZXJuYWxfdGhlbihwcm9taXNlLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbLyotLS0tLS0tLS0tLS0tLS0tLS0tLSovIGNsYXp6IC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0qL10pO1xuXG5cdFx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBjb250cm9sIGAnICsgY29udHJvbCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoKG1lc3NhZ2UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIGNvbnRyb2wgYCcgKyBjb250cm9sICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIGNvbnRyb2wgYCcgKyBjb250cm9sICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGZpbmQgY29udHJvbCBgJyArIGNvbnRyb2wgKyAnYCddKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2xcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyZW50XSA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbb3duZXJdID8/P1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IGNvbnRyb2wgPz8/XG5cdCAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y3JlYXRlQ29udHJvbDogZnVuY3Rpb24ocGFyZW50LCBvd25lciwgY29udHJvbCwgcGFyYW1zLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmxvYWRDb250cm9sKGNvbnRyb2wsIHNldHRpbmdzKS5kb25lKChjb25zdHJ1Y3RvcikgPT4ge1xuXG5cdFx0XHRsZXQgaW5zdGFuY2UgPSBuZXcgY29uc3RydWN0b3IocGFyZW50LCBvd25lcik7XG5cblx0XHRcdF9hbWlfaW50ZXJuYWxfdGhlbihjb25zdHJ1Y3Rvci5wcm90b3R5cGUucmVuZGVyLmFwcGx5KGluc3RhbmNlLCBwYXJhbXMpLCBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2luc3RhbmNlXS5jb25jYXQoWy4uLmFyZ3VtZW50c10pKTtcblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gYSBjb250YWluZXJcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyZW50XSA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbb3duZXJdID8/P1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IGNvbnRyb2wgPz8/XG5cdCAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXNXaXRob3V0U2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gY29udHJvbFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNyZWF0ZUNvbnRyb2xJbkJvZHk6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIsIGNvbnRyb2wsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MsIGNvbnRyb2xTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRyeVxuXHRcdHtcblx0XHRcdGxldCBQQVJBTVMgPSBbXTtcblx0XHRcdGxldCBTRVRUSU5HUyA9IHt9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRmb3IobGV0IGtleSBpbiBwYXJlbnRTZXR0aW5ncykge1xuXHRcdFx0XHRTRVRUSU5HU1trZXldID0gcGFyZW50U2V0dGluZ3Nba2V5XTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGxldCBrZXkgaW4gY29udHJvbFNldHRpbmdzKSB7XG5cdFx0XHRcdFNFVFRJTkdTW2tleV0gPSBjb250cm9sU2V0dGluZ3Nba2V5XTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Ly8vLy8vLnB1c2goc2VsZWN0b3IpO1xuXG5cdFx0XHRBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShQQVJBTVMsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MpO1xuXG5cdFx0XHRQQVJBTVMucHVzaChTRVRUSU5HUyk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRoaXMuY3JlYXRlQ29udHJvbChwYXJlbnQsIG93bmVyLCBjb250cm9sLCBQQVJBTVMpLmRvbmUoZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFsuLi5hcmd1bWVudHNdKTtcblxuXHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cdFx0Y2F0Y2gobWVzc2FnZSlcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbCBpbiBhIGNvbnRhaW5lclxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtwYXJlbnRdID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtvd25lcl0gPz8/XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gY29udHJvbCA/Pz9cblx0ICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtc1dpdGhvdXRTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBjb250cm9sU2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50U2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gaWNvbiA/Pz9cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0aXRsZSA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjcmVhdGVDb250cm9sSW5Db250YWluZXI6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIsIGNvbnRyb2wsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MsIGNvbnRyb2xTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIGljb24sIHRpdGxlLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0cnlcblx0XHR7XG5cdFx0XHRwYXJlbnQuYXBwZW5kSXRlbSgnPGkgY2xhc3M9XCJmYSBmYS0nICsgdGhpcy50ZXh0VG9IdG1sKGljb24pICsgJ1wiPjwvaT4gJyArIHRoaXMudGV4dFRvSHRtbCh0aXRsZSkpLmRvbmUoKHNlbGVjdG9yKSA9PiB7XG5cblx0XHRcdFx0bGV0IFBBUkFNUyA9IFtdO1xuXHRcdFx0XHRsZXQgU0VUVElOR1MgPSB7fTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Zm9yKGxldCBrZXkgaW4gcGFyZW50U2V0dGluZ3MpIHtcblx0XHRcdFx0XHRTRVRUSU5HU1trZXldID0gcGFyZW50U2V0dGluZ3Nba2V5XTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvcihsZXQga2V5IGluIGNvbnRyb2xTZXR0aW5ncykge1xuXHRcdFx0XHRcdFNFVFRJTkdTW2tleV0gPSBjb250cm9sU2V0dGluZ3Nba2V5XTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRQQVJBTVMucHVzaChzZWxlY3Rvcik7XG5cblx0XHRcdFx0QXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoUEFSQU1TLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzKTtcblxuXHRcdFx0XHRQQVJBTVMucHVzaChTRVRUSU5HUyk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHRoaXMuY3JlYXRlQ29udHJvbChwYXJlbnQsIG93bmVyLCBjb250cm9sLCBQQVJBTVMpLmRvbmUoZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgWy4uLmFyZ3VtZW50c10pO1xuXG5cdFx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRjYXRjaChtZXNzYWdlKVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sIGluIGEgY29udGFpbmVyIGZyb20gYSBXRUIgbGlua1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtwYXJlbnRdID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtvd25lcl0gPz8/XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gZWwgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50U2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y3JlYXRlQ29udHJvbEZyb21XZWJMaW5rOiBmdW5jdGlvbihwYXJlbnQsIG93bmVyLCBlbCwgcGFyZW50U2V0dGluZ3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgZGF0YUN0cmwgPSBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtY3RybCcpID8gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWN0cmwnKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblxuXHRcdGxldCBkYXRhQ3RybExvY2F0aW9uID0gZWwuaGFzQXR0cmlidXRlKCdkYXRhLWN0cmwtbG9jYXRpb24nKSA/IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jdHJsLWxvY2F0aW9uJylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGRhdGFQYXJhbXMgPSBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtcGFyYW1zJykgPyBKU09OLnBhcnNlKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wYXJhbXMnKSlcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdXG5cdFx0O1xuXG5cdFx0bGV0IGRhdGFTZXR0aW5ncyA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zZXR0aW5ncycpID8gSlNPTi5wYXJzZShlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2V0dGluZ3MnKSlcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB7fVxuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGRhdGFJY29uID0gZWwuaGFzQXR0cmlidXRlKCdkYXRhLWljb24nKSA/IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1pY29uJylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3F1ZXN0aW9uJ1xuXHRcdDtcblxuXHRcdGxldCBkYXRhVGl0bGUgPSBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdGl0bGUnKSA/IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS10aXRsZScpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ1Vua25vd24nXG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmxvY2soKTtcblxuXHRcdC8qKi8gaWYoZGF0YUN0cmxMb2NhdGlvbiA9PT0gJ2JvZHknKVxuXHRcdHtcblx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZUNvbnRyb2xJbkJvZHkocGFyZW50LCBvd25lciwgZGF0YUN0cmwsIGRhdGFQYXJhbXMsIGRhdGFTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIHNldHRpbmdzKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLnVubG9jaygpO1xuXG5cdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5lcnJvcihtZXNzYWdlKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlQ29udHJvbEluQ29udGFpbmVyKHBhcmVudCwgb3duZXIsIGRhdGFDdHJsLCBkYXRhUGFyYW1zLCBkYXRhU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBkYXRhSWNvbiwgZGF0YVRpdGxlLCBzZXR0aW5ncykuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy51bmxvY2soKTtcblxuXHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZXJyb3IobWVzc2FnZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNVQkFQUFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRyaWdnZXJMb2dpbjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLl9pc1JlYWR5KVxuXHRcdHtcblx0XHRcdF9hbWlfaW50ZXJuYWxfdGhlbih0aGlzLl9jdXJyZW50U3ViQXBwSW5zdGFuY2Uub25Mb2dpbih0aGlzLmFyZ3NbJ3VzZXJkYXRhJ10pLCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdF9hbWlfaW50ZXJuYWxfYWx3YXlzKHRoaXMub25SZWZyZXNoKHRydWUpLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZShtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0X2FtaV9pbnRlcm5hbF9hbHdheXModGhpcy5vblJlZnJlc2godHJ1ZSksICgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRyaWdnZXJMb2dvdXQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy5faXNSZWFkeSlcblx0XHR7XG5cdFx0XHRfYW1pX2ludGVybmFsX3RoZW4odGhpcy5fY3VycmVudFN1YkFwcEluc3RhbmNlLm9uTG9nb3V0KHRoaXMuYXJnc1sndXNlcmRhdGEnXSksIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0X2FtaV9pbnRlcm5hbF9hbHdheXModGhpcy5vblJlZnJlc2goZmFsc2UpLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZShtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0X2FtaV9pbnRlcm5hbF9hbHdheXModGhpcy5vblJlZnJlc2goZmFsc2UpLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIGEgc3ViYXBwXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3ViYXBwIHRoZSBzdWJhcHBcblx0ICAqIEBwYXJhbSB7P30gW3VzZXJkYXRhXSB0aGUgdXNlciBkYXRhXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZFN1YkFwcDogZnVuY3Rpb24oc3ViYXBwLCB1c2VyZGF0YSwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSB0aGlzLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5sb2NrKCk7XG5cblx0XHRyZXN1bHQuYWx3YXlzKCgpID0+IHtcblxuXHRcdFx0dGhpcy51bmxvY2soKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoc3ViYXBwLmluZGV4T2YoJ3N1YmFwcDonKSA9PT0gMClcblx0XHR7XG5cdFx0XHRzdWJhcHAgPSBzdWJhcHAuc3Vic3RyaW5nKDcpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGRlc2NyID0gdGhpcy5fc3ViYXBwc1tzdWJhcHAudG9Mb3dlckNhc2UoKV07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKGRlc2NyKVxuXHRcdHtcblx0XHRcdHRoaXMubG9hZFNjcmlwdHModGhpcy5vcmlnaW5VUkwgKyAnLycgKyBkZXNjci5maWxlKS50aGVuKChsb2FkZWQpID0+IHtcblxuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuX2N1cnJlbnRTdWJBcHBJbnN0YW5jZS5vbkV4aXQodXNlcmRhdGEpO1xuXG5cdFx0XHRcdFx0Y29uc3QgaW5zdGFuY2UgPSB3aW5kb3dbZGVzY3IuaW5zdGFuY2VdO1xuXG5cdFx0XHRcdFx0dGhpcy5fY3VycmVudFN1YkFwcEluc3RhbmNlID0gaW5zdGFuY2U7XG5cblx0XHRcdFx0XHQvKiovXG5cblx0XHRcdFx0XHR0aGlzLmZpbGxCcmVhZGNydW1iKGRlc2NyLmJyZWFkY3J1bWIpO1xuXG5cdFx0XHRcdFx0Y29uc3QgcHJvbWlzZSA9IGxvYWRlZFswXSA/IGluc3RhbmNlLm9uUmVhZHkodXNlcmRhdGEpXG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICA6IC8qLS0tLS0tKi8gbnVsbCAvKi0tLS0tLSovXG5cdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0X2FtaV9pbnRlcm5hbF90aGVuKHByb21pc2UsICgpID0+IHtcblxuXHRcdFx0XHRcdFx0Y29uc3QgcHJvbWlzZSA9IGFtaUxvZ2luLmlzQXV0aGVudGljYXRlZCgpID8gdGhpcy50cmlnZ2VyTG9naW4oKVxuXHRcdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy50cmlnZ2VyTG9nb3V0KClcblx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdFx0cHJvbWlzZS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgWy8qLS0tLS0tLS0tLS0tLS0tLS0tKi8gaW5zdGFuY2UgLyotLS0tLS0tLS0tLS0tLS0tLS0qL10pO1xuXG5cdFx0XHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgc3ViYXBwIGAnICsgc3ViYXBwICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgc3ViYXBwIGAnICsgc3ViYXBwICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2gobWVzc2FnZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgc3ViYXBwIGAnICsgc3ViYXBwICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIHN1YmFwcCBgJyArIHN1YmFwcCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBmaW5kIHN1YmFwcCBgJyArIHN1YmFwcCArICdgJ10pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogTG9hZHMgYSBzdWJhcHAgYnkgVVJMXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gZGVmYXVsdFN1YkFwcCBpZiAnYW1pV2ViQXBwLmFyZ3NbXCJzdWJhcHBcIl0nIGlzIG51bGwsIHRoZSBkZWZhdWx0IHN1YmFwcFxuXHQgICogQHBhcmFtIHs/fSBbZGVmYXVsdFVzZXJEYXRhXSBpZiAnYW1pV2ViQXBwLmFyZ3NbXCJ1c2VyZGF0YVwiXScgaXMgbnVsbCwgdGhlIGRlZmF1bHQgdXNlciBkYXRhXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkU3ViQXBwQnlVUkw6IGZ1bmN0aW9uKGRlZmF1bHRTdWJBcHAsIGRlZmF1bHRVc2VyRGF0YSlcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGlmKHRoaXMuYXJnc1sndiddKVxuXHRcdHtcblx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnR2V0SGFzaEluZm8gLWhhc2g9XCInICsgdGhpcy50ZXh0VG9TdHJpbmcodGhpcy5hcmdzWyd2J10pICsgJ1wiJykuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cblx0XHRcdH0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0XHRsZXQganNvbjtcblxuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGpzb24gPSBKU09OLnBhcnNlKHRoaXMuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwianNvblwifS4kJywgZGF0YSlbMF0gfHwgJ3t9Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2gobWVzc2FnZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGpzb24gPSB7LyogRU1QVFkgSlNPTiAgIEVNUFRZIEpTT04gICBFTVBUWSBKU09OICAgRU1QVFkgSlNPTiAgIEVNUFRZIEpTT04gKi99O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IHN1YmFwcCA9IGpzb25bJ3N1YmFwcCddIHx8IGRlZmF1bHRTdWJBcHA7XG5cdFx0XHRcdGNvbnN0IHVzZXJkYXRhID0ganNvblsndXNlcmRhdGEnXSB8fCBkZWZhdWx0VXNlckRhdGE7XG5cblx0XHRcdFx0dGhpcy5sb2FkU3ViQXBwKHN1YmFwcCwgdXNlcmRhdGEpLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRpZighYW1pUm91dGVyLmNoZWNrKCkpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBzdWJhcHAgPSB0aGlzLmFyZ3NbJ3N1YmFwcCddIHx8IGRlZmF1bHRTdWJBcHA7XG5cdFx0XHRcdGNvbnN0IHVzZXJkYXRhID0gdGhpcy5hcmdzWyd1c2VyZGF0YSddIHx8IGRlZmF1bHRVc2VyRGF0YTtcblxuXHRcdFx0XHR0aGlzLmxvYWRTdWJBcHAoc3ViYXBwLCB1c2VyZGF0YSkudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXG5cdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWkuSUNvbnRyb2wgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgQU1JIGNvbnRyb2wgaW50ZXJmYWNlXG4gKiBAaW50ZXJmYWNlIGFtaS5JQ29udHJvbFxuICovXG5cbiRBTUlJbnRlcmZhY2UoJ2FtaS5JQ29udHJvbCcsIC8qKiBAbGVuZHMgYW1pLklDb250cm9sICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUGF0Y2hlcyBhbiBIVE1MIGlkZW50aWZpZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBpZCB0aGUgdW5wYXRjaGVkIEhUTUwgaWRlbnRpZmllclxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIHBhdGNoZWQgSFRNTCBpZGVudGlmaWVyXG5cdCAgKi9cblxuXHRwYXRjaElkOiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFB1dHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIHRoZSB0YXJnZXQgc2VsZWN0b3Jcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0d2lnIHRoZSBUV0lHIGZyYWdtZW50XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0cmVwbGFjZUhUTUw6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUHJlcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIHRoZSB0YXJnZXQgc2VsZWN0b3Jcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0d2lnIHRoZSBUV0lHIGZyYWdtZW50XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0cHJlcGVuZEhUTUw6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXBwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgdGhlIHRhcmdldCBzZWxlY3RvclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgZnJhZ21lbnRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRhcHBlbmRIVE1MOiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENhbGxlZCB3aGVuIHRoZSBjb250cm9sIGlzIHJlYWR5IHRvIHJ1blxuXHQgICovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaS5JU3ViQXBwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBBTUkgc3ViLWFwcGxpY2F0aW9uIGludGVyZmFjZVxuICogQGludGVyZmFjZSBhbWkuSVN1YkFwcFxuICovXG5cbiRBTUlJbnRlcmZhY2UoJ2FtaS5JU3ViQXBwJywgLyoqIEBsZW5kcyBhbWkuSVN1YkFwcCAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENhbGxlZCB3aGVuIHRoZSBzdWItYXBwbGljYXRpb24gaXMgcmVhZHkgdG8gcnVuXG5cdCAgKiBAcGFyYW0gez99IHVzZXJkYXRhIHVzZXJkYXRhXG5cdCAgKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENhbGxlZCB3aGVuIHRoZSBzdWItYXBwbGljYXRpb24gaXMgYWJvdXQgdG8gZXhpdFxuXHQgICogQHBhcmFtIHs/fSB1c2VyZGF0YSB1c2VyZGF0YVxuXHQgICovXG5cblx0b25FeGl0OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENhbGxlZCB3aGVuIGxvZ2dpbmcgaW5cblx0ICAqIEBwYXJhbSB7P30gdXNlcmRhdGEgdXNlcmRhdGFcblx0ICAqL1xuXG5cdG9uTG9naW46IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2FsbGVkIHdoZW4gbG9nZ2luZyBvdXRcblx0ICAqIEBwYXJhbSB7P30gdXNlcmRhdGEgdXNlcmRhdGFcblx0ICAqL1xuXG5cdG9uTG9nb3V0OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pLkNvbnRyb2wgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIGJhc2ljIEFNSSBjb250cm9sXG4gKiBAY2xhc3MgYW1pLkNvbnRyb2xcbiAqIEBpbXBsZW1lbnRzIHthbWkuSUNvbnRyb2x9XG4gKi9cblxuJEFNSUNsYXNzKCdhbWkuQ29udHJvbCcsIC8qKiBAbGVuZHMgYW1pLkNvbnRyb2wgKi8ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGltcGxlbWVudHM6IFthbWkuSUNvbnRyb2xdLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkOiBmdW5jdGlvbigpXG5cdHtcblx0XHRhbWkuQ29udHJvbC5pbnN0YW5jZUNudCA9IDE7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihwYXJlbnQsIG93bmVyKVxuXHR7XG5cdFx0dGhpcy5fcGFyZW50ID0gcGFyZW50IHx8IHRoaXM7XG5cdFx0dGhpcy5fb3duZXIgPSBvd25lciB8fCB0aGlzO1xuXG5cdFx0dGhpcy5pbnN0YW5jZVN1ZmZpeCA9IGFtaS5Db250cm9sLmluc3RhbmNlQ250Kys7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldFBhcmVudDogZnVuY3Rpb24ocGFyZW50KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BhcmVudCA9IChwYXJlbnQgfHwgdGhpcyk7XG5cdH0sXG5cblx0Z2V0UGFyZW50OiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGFyZW50O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRPd25lcjogZnVuY3Rpb24ob3duZXIpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fb3duZXIgPSAob3duZXIgfHwgdGhpcyk7XG5cdH0sXG5cblx0Z2V0T3duZXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9vd25lcjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0U2VsZWN0b3I6IGZ1bmN0aW9uKHNlbGVjdG9yKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NlbGVjdG9yID0gKHNlbGVjdG9yIHx8ICcnKTtcblx0fSxcblxuXHRnZXRTZWxlY3RvcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NlbGVjdG9yO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXRjaElkOiBmdW5jdGlvbihpZGVudGlmaWVyKVxuXHR7XG5cdFx0cmV0dXJuIGlkZW50aWZpZXIgKyAnX2luc3RhbmNlJyArIHRoaXMuaW5zdGFuY2VTdWZmaXg7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlcGxhY2VIVE1MOiBmdW5jdGlvbihzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpXG5cdHtcblx0XHRpZighc2V0dGluZ3MpXG5cdFx0e1xuXHRcdFx0c2V0dGluZ3MgPSB7fTtcblx0XHR9XG5cblx0XHRzZXR0aW5ncy5zdWZmaXggPSB0aGlzLmluc3RhbmNlU3VmZml4O1xuXG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5yZXBsYWNlSFRNTChzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwcmVwZW5kSFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKVxuXHR7XG5cdFx0aWYoIXNldHRpbmdzKVxuXHRcdHtcblx0XHRcdHNldHRpbmdzID0ge307XG5cdFx0fVxuXG5cdFx0c2V0dGluZ3Muc3VmZml4ID0gdGhpcy5pbnN0YW5jZVN1ZmZpeDtcblxuXHRcdHJldHVybiBhbWlXZWJBcHAucHJlcGVuZEhUTUwoc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YXBwZW5kSFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKVxuXHR7XG5cdFx0aWYoIXNldHRpbmdzKVxuXHRcdHtcblx0XHRcdHNldHRpbmdzID0ge307XG5cdFx0fVxuXG5cdFx0c2V0dGluZ3Muc3VmZml4ID0gdGhpcy5pbnN0YW5jZVN1ZmZpeDtcblxuXHRcdHJldHVybiBhbWlXZWJBcHAuYXBwZW5kSFRNTChzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjcmVhdGVDb250cm9sOiBmdW5jdGlvbihwYXJlbnQsIGNvbnRyb2wsIHBhcmFtcywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2wocGFyZW50LCB0aGlzLCBjb250cm9sLCBwYXJhbXMsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y3JlYXRlQ29udHJvbEluQm9keTogZnVuY3Rpb24ocGFyZW50LCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAuY3JlYXRlQ29udHJvbEluQm9keShwYXJlbnQsIHRoaXMsIGNvbnRyb2wsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MsIGNvbnRyb2xTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y3JlYXRlQ29udHJvbEluQ29udGFpbmVyOiBmdW5jdGlvbihwYXJlbnQsIGNvbnRyb2wsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MsIGNvbnRyb2xTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIGljb24sIHRpdGxlLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAuY3JlYXRlQ29udHJvbEluQ29udGFpbmVyKHBhcmVudCwgdGhpcywgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgaWNvbiwgdGl0bGUsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y3JlYXRlQ29udHJvbEZyb21XZWJMaW5rOiBmdW5jdGlvbihwYXJlbnQsIGVsLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2xGcm9tV2ViTGluayhwYXJlbnQsIHRoaXMsIGVsLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pLlN1YkFwcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIGJhc2ljIEFNSSBzdWItYXBwbGljYXRpb25cbiAqIEBjbGFzcyBhbWkuU3ViQXBwXG4gKiBAaW1wbGVtZW50cyB7YW1pLklTdWJBcHB9XG4gKi9cblxuJEFNSUNsYXNzKCdhbWkuU3ViQXBwJywgLyoqIEBsZW5kcyBhbWkuU3ViQXBwICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbXBsZW1lbnRzOiBbYW1pLklTdWJBcHBdLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvbkV4aXQ6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uTG9naW46IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uTG9nb3V0OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaUNvbW1hbmQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBBTUkgY29tbWFuZCBzdWJzeXN0ZW1cbiAqIEBuYW1lc3BhY2UgYW1pQ29tbWFuZFxuICovXG5cbiRBTUlOYW1lc3BhY2UoJ2FtaUNvbW1hbmQnLCAvKiogQGxlbmRzIGFtaUNvbW1hbmQgKi8ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBVQkxJQyBNRU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRGVmYXVsdCBlbmRwb2ludFxuXHQgICogQHR5cGUge1N0cmluZ31cblx0ICAqL1xuXG5cdGVuZHBvaW50OiAnaHR0cDovL3h4eXkuenonLFxuXG5cdC8qKlxuXHQgICogRGVmYXVsdCBjb252ZXJ0ZXJcblx0ICAqIEB0eXBlIHtTdHJpbmd9XG5cdCAgKi9cblxuXHRjb252ZXJ0ZXI6ICdBTUlYbWxUb0pzb24ueHNsJyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBVQkxJQyBNRVRIT0RTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRXhlY3V0ZXMgYW4gQU1JIGNvbW1hbmRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBjb21tYW5kIHRoZSBjb21tYW5kXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBlbmRwb2ludCwgY29udmVydGVyLCB0aW1lb3V0LCBleHRyYVBhcmFtLCBleHRyYVZhbHVlKVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0ZXhlY3V0ZTogZnVuY3Rpb24oY29tbWFuZCwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbZW5kcG9pbnQsIGNvbnZlcnRlciwgY29udGV4dCwgdGltZW91dCwgZXh0cmFQYXJhbSwgZXh0cmFWYWx1ZV0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbJ2VuZHBvaW50JywgJ2NvbnZlcnRlcicsICdjb250ZXh0JywgJ3RpbWVvdXQnLCAnZXh0cmFQYXJhbScsICdleHRyYVZhbHVlJ10sXG5cdFx0XHRbdGhpcy5lbmRwb2ludCwgdGhpcy5jb252ZXJ0ZXIsIHJlc3VsdCwgMiAqIDYwICogMTAwMCwgbnVsbCwgbnVsbF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IFVSTCA9IGVuZHBvaW50LnRyaW0oKTtcblx0XHRjb25zdCBDT01NQU5EID0gY29tbWFuZC50cmltKCk7XG5cdFx0Y29uc3QgQ09OVkVSVEVSID0gY29udmVydGVyLnRyaW0oKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZGF0YSA9IHtcblx0XHRcdENvbW1hbmQ6IENPTU1BTkQsXG5cdFx0XHRDb252ZXJ0ZXI6IENPTlZFUlRFUixcblx0XHR9O1xuXG5cdFx0aWYoZXh0cmFQYXJhbSlcblx0XHR7XG5cdFx0XHRkYXRhW2V4dHJhUGFyYW1dID0gZXh0cmFWYWx1ZSA/IGV4dHJhVmFsdWVcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKCgobnVsbCkpKVxuXHRcdFx0O1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdXJsV2l0aFBhcmFtZXRlcnMgPSBVUkwgKyAnPycgKyAkLnBhcmFtKGRhdGEpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihDT05WRVJURVIgPT09ICdBTUlYbWxUb0pzb24ueHNsJylcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSlNPTiBGT1JNQVQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHVybDogVVJMLFxuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdHRpbWVvdXQ6IHRpbWVvdXQsXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdHhockZpZWxkczoge1xuXHRcdFx0XHRcdHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xuXG5cdFx0XHRcdFx0Y29uc3QgaW5mbyA9IEpTUGF0aC5hcHBseSgnLkFNSU1lc3NhZ2UuaW5mby4kJywgZGF0YSk7XG5cdFx0XHRcdFx0Y29uc3QgZXJyb3IgPSBKU1BhdGguYXBwbHkoJy5BTUlNZXNzYWdlLmVycm9yLiQnLCBkYXRhKTtcblxuXHRcdFx0XHRcdGlmKGVycm9yLmxlbmd0aCA9PT0gMClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2RhdGEsIGluZm8uam9pbignLiAnKSwgdXJsV2l0aFBhcmFtZXRlcnNdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFtkYXRhLCBlcnJvci5qb2luKCcuICcpLCB1cmxXaXRoUGFyYW1ldGVyc10pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6IChqcVhIUiwgdGV4dFN0YXR1cykgPT4ge1xuXG5cdFx0XHRcdFx0aWYodGV4dFN0YXR1cyA9PT0gJ2Vycm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZXh0U3RhdHVzID0gJ3NlcnZpY2UgdGVtcG9yYXJpbHkgdW5yZWFjaGFibGUnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKHRleHRTdGF0dXMgPT09ICdwYXJzZXJlcnJvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGV4dFN0YXR1cyA9ICdyZXNvdXJjZSB0ZW1wb3JhcmlseSB1bnJlYWNoYWJsZSc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Y29uc3QgZGF0YSA9IHsnQU1JTWVzc2FnZSc6IFt7J2Vycm9yJzogW3snJCc6IHRleHRTdGF0dXN9XX1dfTtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFtkYXRhLCB0ZXh0U3RhdHVzLCB1cmxXaXRoUGFyYW1ldGVyc10pO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBPVEhFUiBGT1JNQVRTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dXJsOiBVUkwsXG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0dGltZW91dDogdGltZW91dCxcblx0XHRcdFx0ZGF0YVR5cGU6ICd0ZXh0Jyxcblx0XHRcdFx0eGhyRmllbGRzOiB7XG5cdFx0XHRcdFx0d2l0aENyZWRlbnRpYWxzOiB0cnVlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2RhdGEsIGRhdGEsIHVybFdpdGhQYXJhbWV0ZXJzXSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVycm9yOiAoanFYSFIsIHRleHRTdGF0dXMpID0+IHtcblxuXHRcdFx0XHRcdGlmKHRleHRTdGF0dXMgPT09ICdlcnJvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGV4dFN0YXR1cyA9ICdzZXJ2aWNlIHRlbXBvcmFyaWx5IHVucmVhY2hhYmxlJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbdGV4dFN0YXR1cywgdGV4dFN0YXR1cywgdXJsV2l0aFBhcmFtZXRlcnNdKTtcblx0XHRcdFx0fSxcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogTG9ncyBpbiBieSBsb2dpbi9wYXNzd29yZFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHVzZXIgdGhlIHVzZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBwYXNzIHRoZSBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdHBhc3NMb2dpbjogZnVuY3Rpb24odXNlciwgcGFzcywgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmV4ZWN1dGUoJ0dldFNlc3Npb25JbmZvIC1BTUlVc2VyPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodXNlcikgKyAnXCIgLUFNSVBhc3M9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwYXNzKSArICdcIicsIHtleHRyYVBhcmFtOiAnTm9DZXJ0J30pLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0Y29uc3QgdXNlckluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHJvbGVJbmZvID0ge307XG5cdFx0XHRjb25zdCB1ZHBJbmZvID0ge307XG5cdFx0XHRjb25zdCBzc29JbmZvID0ge31cblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInVzZXJcIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHVzZXJJbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJ1ZHBcIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHVkcEluZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInNzb1wifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0c3NvSW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwicm9sZVwifS5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRsZXQgbmFtZSA9ICcnO1xuXHRcdFx0XHRjb25zdCByb2xlID0ge307XG5cblx0XHRcdFx0cm93LmZpZWxkLmZvckVhY2goKGZpZWxkKSA9PiB7XG5cblx0XHRcdFx0XHRyb2xlW2ZpZWxkWydAbmFtZSddXSA9IGZpZWxkWyckJ107XG5cblx0XHRcdFx0XHRpZihmaWVsZFsnQG5hbWUnXSA9PT0gJ25hbWUnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWUgPSBmaWVsZFsnJCddO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cm9sZUluZm9bbmFtZV0gPSByb2xlO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvXSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbZGF0YSwgbWVzc2FnZSwge0FNSVVzZXI6ICdndWVzdCcsIGd1ZXN0VXNlcjogJ2d1ZXN0J30sIHt9LCB7fSwge31dKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogTG9ncyBpbiBieSBjZXJ0aWZpY2F0ZVxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNlcnRMb2dpbjogZnVuY3Rpb24oc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmV4ZWN1dGUoJ0dldFNlc3Npb25JbmZvJykudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRjb25zdCB1c2VySW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgcm9sZUluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHVkcEluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHNzb0luZm8gPSB7fTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInVzZXJcIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHVzZXJJbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJ1ZHBcIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHVkcEluZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInNzb1wifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0c3NvSW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwicm9sZVwifS5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRsZXQgbmFtZSA9ICcnO1xuXHRcdFx0XHRjb25zdCByb2xlID0ge307XG5cblx0XHRcdFx0cm93LmZpZWxkLmZvckVhY2goKGZpZWxkKSA9PiB7XG5cblx0XHRcdFx0XHRyb2xlW2ZpZWxkWydAbmFtZSddXSA9IGZpZWxkWyckJ107XG5cblx0XHRcdFx0XHRpZihmaWVsZFsnQG5hbWUnXSA9PT0gJ25hbWUnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWUgPSBmaWVsZFsnJCddO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cm9sZUluZm9bbmFtZV0gPSByb2xlO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvXSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbZGF0YSwgbWVzc2FnZSwge0FNSVVzZXI6ICdndWVzdCcsIGd1ZXN0VXNlcjogJ2d1ZXN0J30sIHt9LCB7fSwge31dKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogTG9ncyBvdXRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2dvdXQ6IGZ1bmN0aW9uKHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5leGVjdXRlKCdHZXRTZXNzaW9uSW5mbyAtQU1JVXNlcj1cIlwiIC1BTUlQYXNzPVwiXCInLCB7ZXh0cmFQYXJhbTogJ05vQ2VydCd9KS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGNvbnN0IHVzZXJJbmZvID0ge307XG5cdFx0XHRjb25zdCByb2xlSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3QgdWRwSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgc3NvSW5mbyA9IHt9XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJ1c2VyXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1c2VySW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwidWRwXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1ZHBJbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJzc29cIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHNzb0luZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInJvbGVcIn0ucm93JywgZGF0YSkuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0bGV0IG5hbWUgPSAnJztcblx0XHRcdFx0Y29uc3Qgcm9sZSA9IHt9O1xuXG5cdFx0XHRcdHJvdy5maWVsZC5mb3JFYWNoKChmaWVsZCkgPT4ge1xuXG5cdFx0XHRcdFx0cm9sZVtmaWVsZFsnQG5hbWUnXV0gPSBmaWVsZFsnJCddO1xuXG5cdFx0XHRcdFx0aWYoZmllbGRbJ0BuYW1lJ10gPT09ICduYW1lJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lID0gZmllbGRbJyQnXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJvbGVJbmZvW25hbWVdID0gcm9sZTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2RhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mb10pO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGEsIG1lc3NhZ2UsIHtBTUlVc2VyOiAnZ3Vlc3QnLCBndWVzdFVzZXI6ICdndWVzdCd9LCB7fSwge30sIHt9XSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEF0dGFjaGVzIGEgY2VydGlmaWNhdGVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyIHRoZSB1c2VyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGFzcyB0aGUgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRhdHRhY2hDZXJ0OiBmdW5jdGlvbih1c2VyLCBwYXNzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGUoJ0dldFNlc3Npb25JbmZvIC1hdHRhY2hDZXJ0IC1hbWlMb2dpbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHVzZXIpICsgJ1wiIC1hbWlQYXNzd29yZD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHBhc3MpICsgJ1wiJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIERldGFjaGVzIGEgY2VydGlmaWNhdGVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyIHRoZSB1c2VyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGFzcyB0aGUgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRkZXRhY2hDZXJ0OiBmdW5jdGlvbih1c2VyLCBwYXNzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGUoJ0dldFNlc3Npb25JbmZvIC1kZXRhY2hDZXJ0IC1hbWlMb2dpbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHVzZXIpICsgJ1wiIC1hbWlQYXNzd29yZD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHBhc3MpICsgJ1wiJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFkZHMgYSBuZXcgdXNlclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHVzZXIgdGhlIHVzZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBwYXNzIHRoZSBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGZpcnN0TmFtZSB0aGUgZmlyc3QgbmFtZVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGxhc3ROYW1lIHRoZSBsYXN0IG5hbWVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBlbWFpbCB0aGUgZW1haWxcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gYXR0YWNoIGF0dGFjaCB0aGUgY3VycmVudCBjZXJ0aWZpY2F0ZVxuXHQgICogQHBhcmFtIHtCb29sZWFufSBhZ3JlZSBhZ3JlZSB3aXRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGFkZFVzZXI6IGZ1bmN0aW9uKHVzZXIsIHBhc3MsIGZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsLCBhdHRhY2gsIGFncmVlLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGUoJ0FkZFVzZXIgLWFtaUxvZ2luPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodXNlcikgKyAnXCIgLWFtaVBhc3N3b3JkPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcocGFzcykgKyAnXCIgLWZpcnN0TmFtZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGZpcnN0TmFtZSkgKyAnXCIgLWxhc3ROYW1lPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcobGFzdE5hbWUpICsgJ1wiIC1lbWFpbD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGVtYWlsKSArICdcIicgKyAoYXR0YWNoID8gJyAtYXR0YWNoJyA6ICcnKSArIChhZ3JlZSA/ICcgLWFncmVlJyA6ICcnKSwgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENoYW5nZXMgdGhlIGFjY291bnQgaW5mb3JtYXRpb25cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBmaXJzdE5hbWUgdGhlIGZpcnN0IG5hbWVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBsYXN0TmFtZSB0aGUgbGFzdCBuYW1lXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gZW1haWwgdGhlIGVtYWlsXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y2hhbmdlSW5mbzogZnVuY3Rpb24oZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZSgnU2V0VXNlckluZm8gLWZpcnN0TmFtZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGZpcnN0TmFtZSkgKyAnXCIgLWxhc3ROYW1lPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcobGFzdE5hbWUpICsgJ1wiIC1lbWFpbD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGVtYWlsKSArICdcIicsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDaGFuZ2VzIHRoZSBhY2NvdW50IHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlciB0aGUgdXNlclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IG9sZFBhc3MgdGhlIG9sZCBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IG5ld1Bhc3MgdGhlIG5ldyBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNoYW5nZVBhc3M6IGZ1bmN0aW9uKHVzZXIsIG9sZFBhc3MsIG5ld1Bhc3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZSgnQ2hhbmdlUGFzc3dvcmQgLWFtaUxvZ2luPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodXNlcikgKyAnXCIgLWFtaVBhc3N3b3JkT2xkPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcob2xkUGFzcykgKyAnXCIgLWFtaVBhc3N3b3JkTmV3PVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcobmV3UGFzcykgKyAnXCInLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUmVzZXRzIHRoZSBhY2NvdW50IHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlciB0aGUgdXNlclxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdHJlc2V0UGFzczogZnVuY3Rpb24odXNlciwgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5leGVjdXRlKCdSZXNldFBhc3N3b3JkIC1hbWlMb2dpbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHVzZXIpICsgJ1wiJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaUxvZ2luICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBBTUkgYXV0aGVudGljYXRpb24gc3Vic3lzdGVtXG4gKiBAbmFtZXNwYWNlIGFtaUxvZ2luXG4gKi9cblxuJEFNSU5hbWVzcGFjZSgnYW1pTG9naW4nLCAvKiogQGxlbmRzIGFtaUxvZ2luICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQVUJMSUMgTUVNQkVSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjcmVhdGVBY2NvdW50QWxsb3dlZDogdHJ1ZSxcblx0Y2hhbmdlSW5mb0FsbG93ZWQ6IHRydWUsXG5cdGNoYW5nZVBhc3NvcmRBbGxvd2VkOiB0cnVlLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR1c2VyOiAnZ3Vlc3QnLFxuXHRndWVzdDogJ2d1ZXN0JyxcblxuXHRjbGllbnRETjogJycsXG5cdGlzc3VlckROOiAnJyxcblxuXHRub3RCZWZvcmU6ICcnLFxuXHRub3RBZnRlcjogJycsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJvbGVJbmZvOiB7fSxcblx0dWRwSW5mbzoge30sXG5cdHNzb0luZm86IHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFJJVkFURSBNRVRIT0RTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3N0YXJ0OiBmdW5jdGlvbihjcmVhdGVBY2NvdW50QWxsb3dlZCwgY2hhbmdlSW5mb0FsbG93ZWQsIGNoYW5nZVBhc3NvcmRBbGxvd2VkKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9hZFRXSUdzKFtcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL3R3aWcvQU1JL0ZyYWdtZW50L2xvZ2luX2J1dHRvbi50d2lnJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL3R3aWcvQU1JL0ZyYWdtZW50L2xvZ291dF9idXR0b24udHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy90d2lnL0FNSS9Nb2RhbC9sb2dpbi50d2lnJyxcblx0XHRdKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRoaXMuZnJhZ21lbnRMb2dpbkJ1dHRvbiA9IGRhdGFbMF07XG5cdFx0XHR0aGlzLmZyYWdtZW50TG9nb3V0QnV0dG9uID0gZGF0YVsxXTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgZGljdCA9IHtcblx0XHRcdFx0Y3JlYXRlQWNjb3VudEFsbG93ZWQ6IHRoaXMuY3JlYXRlQWNjb3VudEFsbG93ZWQgPSBjcmVhdGVBY2NvdW50QWxsb3dlZCxcblx0XHRcdFx0Y2hhbmdlSW5mb0FsbG93ZWQ6IHRoaXMuY2hhbmdlSW5mb0FsbG93ZWQgPSBjaGFuZ2VJbmZvQWxsb3dlZCxcblx0XHRcdFx0Y2hhbmdlUGFzc29yZEFsbG93ZWQ6IHRoaXMuY2hhbmdlUGFzc29yZEFsbG93ZWQgPSBjaGFuZ2VQYXNzb3JkQWxsb3dlZCxcblx0XHRcdH07XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGFtaVdlYkFwcC5hcHBlbmRIVE1MKCdib2R5JywgZGF0YVsyXSwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0I3ODk0Q0MxXzFEQUFfNEE3RV9CN0QxX0RCREY2RjA2QUM3MycpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5mb3JtX2xvZ2luKGUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcjRUUwNTVDRDRfRTU4Rl80ODM0XzgwMjBfOTg2QUUzRjhENjdEJykuc3VibWl0KChlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmZvcm1fYWRkVXNlcihlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnI0RBMjA0N0EyXzlFNURfNDIwRF9CNkU3X0ZBMjYxRDJFRjEwRicpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5mb3JtX3JlbWluZFBhc3MoZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdCQoJyNEOUVBRjk5OF9FRDhFXzQ0RDJfQTBCRV84QzVDRjVFNDM4QkQnKS5zdWJtaXQoKGUpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuZm9ybV9jaGFuZ2VJbmZvKGUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcjRTkyQTEwOTdfOTgzQl80ODU3Xzg3NUZfMDdFNDY1OUI0MUIwJykuc3VibWl0KChlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmZvcm1fY2hhbmdlUGFzcyhlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdCQoJyNFNkUzMEVFQ18xNUVFXzRGQ0ZfOTgwOV8yQjhFQzJGRUYzODgsI0NDRDhFNkYxXzZERjhfNEJERF9BMEVDX0MzQzM4MDgzMDE4NycpLmNoYW5nZSgoKSA9PiB7XG5cblx0XHRcdFx0XHRjb25zdCBwYXNzMSA9ICQoJyNFNkUzMEVFQ18xNUVFXzRGQ0ZfOTgwOV8yQjhFQzJGRUYzODgnKS52YWwoKTtcblx0XHRcdFx0XHRjb25zdCBwYXNzMiA9ICQoJyNDQ0Q4RTZGMV82REY4XzRCRERfQTBFQ19DM0MzODA4MzAxODcnKS52YWwoKTtcblxuXHRcdFx0XHRcdCQoJyNDQ0Q4RTZGMV82REY4XzRCRERfQTBFQ19DM0MzODA4MzAxODcnKS5nZXQoMCkuc2V0Q3VzdG9tVmFsaWRpdHkoXG5cdFx0XHRcdFx0XHRwYXNzMS5sZW5ndGggPiAwICYmIHBhc3MyLmxlbmd0aCA+IDAgJiYgcGFzczEgIT09IHBhc3MyID8gJ1Bhc3N3b3JkcyBkb25cXCd0IG1hdGNoLicgOiAnJ1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdCQoJyNENDg3RkU3Ml84RDk1XzQwNDhfQkVBM18yNTIyNzQ4NjJBRjQsI0VFMURBNThDXzM3NjFfNDczNF9BOUMyX0U4MDhDREQ3RUU3NycpLmNoYW5nZSgoKSA9PiB7XG5cblx0XHRcdFx0XHRjb25zdCBwYXNzMSA9ICQoJyNENDg3RkU3Ml84RDk1XzQwNDhfQkVBM18yNTIyNzQ4NjJBRjQnKS52YWwoKTtcblx0XHRcdFx0XHRjb25zdCBwYXNzMiA9ICQoJyNFRTFEQTU4Q18zNzYxXzQ3MzRfQTlDMl9FODA4Q0REN0VFNzcnKS52YWwoKTtcblxuXHRcdFx0XHRcdCQoJyNFRTFEQTU4Q18zNzYxXzQ3MzRfQTlDMl9FODA4Q0REN0VFNzcnKS5nZXQoMCkuc2V0Q3VzdG9tVmFsaWRpdHkoXG5cdFx0XHRcdFx0XHRwYXNzMS5sZW5ndGggPiAwICYmIHBhc3MyLmxlbmd0aCA+IDAgJiYgcGFzczEgIT09IHBhc3MyID8gJ1Bhc3N3b3JkcyBkb25cXCd0IG1hdGNoLicgOiAnJ1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChlKSA9PiB7XG5cblx0XHRcdFx0aWYodGhpcy5zc29JbmZvLnVybC5zdGFydHNXaXRoKGUub3JpZ2luKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IHVzZXIgPSBlLmRhdGEudXNlcjtcblx0XHRcdFx0XHRjb25zdCBwYXNzID0gZS5kYXRhLnBhc3M7XG5cblx0XHRcdFx0XHRpZih1c2VyICYmIHBhc3MpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhpcy5mb3JtX2xvZ2luMih1c2VyLCBwYXNzKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRlLnNvdXJjZS5jbG9zZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sIGZhbHNlKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgdXNlcmRhdGEgPSBhbWlXZWJBcHAuYXJnc1sndXNlcmRhdGEnXSB8fCAnJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pQ29tbWFuZC5jZXJ0TG9naW4oKS5mYWlsKChkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pID0+IHtcblxuXHRcdFx0XHR0aGlzLl91cGRhdGUodXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKS5hbHdheXMoKC8qLS0tKi8pID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9KS5kb25lKChkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pID0+IHtcblxuXHRcdFx0XHRfYW1pX2ludGVybmFsX3RoZW4oYW1pV2ViQXBwLm9uUmVhZHkodXNlcmRhdGEpLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuX2lzUmVhZHkgPSB0cnVlO1xuXG5cdFx0XHRcdFx0dGhpcy5fdXBkYXRlKHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykudGhlbigobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZShtZXNzYWdlKTtcblxuXHRcdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5faXNSZWFkeSA9IHRydWU7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3N1Y2Nlc3M6IGZ1bmN0aW9uKG1lc3NhZ2UpXG5cdHtcblx0XHRhbWlXZWJBcHAuc3VjY2VzcyhtZXNzYWdlLCB0cnVlKTtcblx0XHR0aGlzLl9jbGVhbigpO1xuXHR9LFxuXG5cdF9lcnJvcjogZnVuY3Rpb24obWVzc2FnZSlcblx0e1xuXHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR0aGlzLl9jbGVhbigpO1xuXHR9LFxuXG5cdF91bmxvY2s6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHR0aGlzLl9jbGVhbigpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfY2xlYW46IGZ1bmN0aW9uKClcblx0e1xuXHRcdCQoJyNCNzg5NENDMV8xREFBXzRBN0VfQjdEMV9EQkRGNkYwNkFDNzMnKS50cmlnZ2VyKCdyZXNldCcpO1xuXHRcdCQoJyNFRTA1NUNENF9FNThGXzQ4MzRfODAyMF85ODZBRTNGOEQ2N0QnKS50cmlnZ2VyKCdyZXNldCcpO1xuXHRcdCQoJyNEQTIwNDdBMl85RTVEXzQyMERfQjZFN19GQTI2MUQyRUYxMEYnKS50cmlnZ2VyKCdyZXNldCcpO1xuXHRcdCQoJyNFOTJBMTA5N185ODNCXzQ4NTdfODc1Rl8wN0U0NjU5QjQxQjAnKS50cmlnZ2VyKCdyZXNldCcpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfdXBkYXRlOiBmdW5jdGlvbih1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdXNlciA9IHRoaXMudXNlciA9IHVzZXJJbmZvLkFNSVVzZXIgfHwgJyc7XG5cdFx0Y29uc3QgZ3Vlc3QgPSB0aGlzLmd1ZXN0ID0gdXNlckluZm8uZ3Vlc3RVc2VyIHx8ICcnO1xuXG5cdFx0Y29uc3Qgbm90QmVmb3JlID0gdGhpcy5ub3RCZWZvcmUgPSB1c2VySW5mby5ub3RCZWZvcmUgfHwgJyc7XG5cdFx0Y29uc3Qgbm90QWZ0ZXIgPSB0aGlzLm5vdEFmdGVyID0gdXNlckluZm8ubm90QWZ0ZXIgfHwgJyc7XG5cblx0XHRjb25zdCBjbGllbnRETkluU2Vzc2lvbiA9IHRoaXMuY2xpZW50RE4gPSB1c2VySW5mby5jbGllbnRETkluU2Vzc2lvbiB8fCAnJztcblx0XHRjb25zdCBpc3N1ZXJETkluU2Vzc2lvbiA9IHRoaXMuaXNzdWVyRE4gPSB1c2VySW5mby5pc3N1ZXJETkluU2Vzc2lvbiB8fCAnJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0JCgnI0EwOUFFMzE2XzcwNjhfNEJDMV85NkE5XzZCODdEMjg4NjNGRScpLnByb3AoJ2Rpc2FibGVkJywgIWNsaWVudEROSW5TZXNzaW9uIHx8ICFpc3N1ZXJETkluU2Vzc2lvbik7XG5cblx0XHQkKCcjQzNFOTRGNkRfNDhFMF84NkMwXzM1MzRfNjkxNzI4RTQ5MkY0JykuYXR0cignc3JjJywgdWRwSW5mby50ZXJtc0FuZENvbmRpdGlvbnMgfHwgYW1pV2ViQXBwLm9yaWdpblVSTCArICcvZG9jcy90ZXJtc19hbmRfY29uZGl0aW9ucy5odG1sJyk7XG5cdFx0JCgnI0U1MEZGOEJEX0IwRjVfQ0Q3Ml9GOURDX0ZDMkJGQTVEQkEyNycpLmF0dHIoJ3NyYycsIHVkcEluZm8udGVybXNBbmRDb25kaXRpb25zIHx8IGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2RvY3MvdGVybXNfYW5kX2NvbmRpdGlvbnMuaHRtbCcpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnJvbGVJbmZvID0gcm9sZUluZm87XG5cdFx0dGhpcy51ZHBJbmZvID0gdWRwSW5mbztcblx0XHR0aGlzLnNzb0luZm8gPSBzc29JbmZvO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0Y3JlYXRlQWNjb3VudEFsbG93ZWQ6IHRoaXMuY3JlYXRlQWNjb3VudEFsbG93ZWQsXG5cdFx0XHRjaGFuZ2VJbmZvQWxsb3dlZDogdGhpcy5jaGFuZ2VJbmZvQWxsb3dlZCxcblx0XHRcdGNoYW5nZVBhc3NvcmRBbGxvd2VkOiB0aGlzLmNoYW5nZVBhc3NvcmRBbGxvd2VkLFxuXHRcdFx0LyoqL1xuXHRcdFx0c3NvX2xhYmVsOiBzc29JbmZvLmxhYmVsIHx8ICdTU08nLFxuXHRcdFx0c3NvX3VybDogc3NvSW5mby51cmwgfHwgJ0BOVUxMJyxcblx0XHR9O1xuXG5cdFx0aWYodXNlciAhPT0gZ3Vlc3QpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEdFVCBJTkZPICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCB2YWxpZCA9IHVzZXJJbmZvLnZhbGlkIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCBjZXJ0RW5hYmxlZCA9IHVzZXJJbmZvLmNlcnRFbmFibGVkIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCB2b21zRW5hYmxlZCA9IHVzZXJJbmZvLnZvbXNFbmFibGVkIHx8ICdmYWxzZSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGZpcnN0TmFtZSA9IHVzZXJJbmZvLmZpcnN0TmFtZSB8fCAnJztcblx0XHRcdGNvbnN0IGxhc3ROYW1lID0gdXNlckluZm8ubGFzdE5hbWUgfHwgJyc7XG5cdFx0XHRjb25zdCBlbWFpbCA9IHVzZXJJbmZvLmVtYWlsIHx8ICcnO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBjbGllbnRETkluQU1JID0gdXNlckluZm8uY2xpZW50RE5JbkFNSSB8fCAnJztcblx0XHRcdGNvbnN0IGlzc3VlckROSW5BTUkgPSB1c2VySW5mby5pc3N1ZXJETkluQU1JIHx8ICcnO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU0VUIElORk8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQoJyNFNTEzRjI3RF81NTIxXzRCMDhfQkY2MV81MkFGQjgxMzU2RjcnKS52YWwoZmlyc3ROYW1lKTtcblx0XHRcdCQoJyNBRkYwQjVDMF9CRUVDXzQ4NDJfOTE2RF9EQ0JBN0Y1ODkxOTUnKS52YWwobGFzdE5hbWUpO1xuXHRcdFx0JCgnI0M1ODc0ODZCXzYyQzBfNEI2RV85Mjg4X0Q4RjlGODlEMTU3QicpLnZhbChlbWFpbCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQoJyNBQkVCMDI5MV80MEIwXzQxNEFfQTQyQl9FN0VBQkI5QjQ4N0UnKS52YWwoZmlyc3ROYW1lKTtcblx0XHRcdCQoJyNBNUFGREI2Ml8xMDM0XzRGNjZfQTNFNl85MzQxQjMxRkEyOTAnKS52YWwobGFzdE5hbWUpO1xuXHRcdFx0JCgnI0Q3MzBBNzc0XzA1RUFfNDdBQl9BMEM4X0Q5Mjc1MzgwMkUzRScpLnZhbChlbWFpbCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQoJyNEMUJFRTNCRl85MTYxXzQxRENfQkM1M19DNDRGRkU0RDI1MjInKS52YWwoY2xpZW50RE5JbkFNSSk7XG5cdFx0XHQkKCcjQzc2ODA1RDdfMUU4Nl80MjMxXzkwNzFfMUQwNDc4MzQyM0JCJykudmFsKGNsaWVudEROSW5TZXNzaW9uKTtcblx0XHRcdCQoJyNGNDJGQUY2Ql8yQzhEXzQxNDJfOEJEOV9FNUJDRENBQTA1QUEnKS52YWwoaXNzdWVyRE5JbkFNSSk7XG5cdFx0XHQkKCcjRkUyRjYyMzJfQzI1Nl80QjgwXzkzOUNfRUJFQzkwMzIwMzA4JykudmFsKGlzc3VlckROSW5TZXNzaW9uKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGV0IHRhYmxlID0gW107XG5cblx0XHRcdGZvcihsZXQgcm9sZSBpbiByb2xlSW5mbylcblx0XHRcdHtcblx0XHRcdFx0dGFibGUucHVzaCgnPHRyPicpO1xuXHRcdFx0XHR0YWJsZS5wdXNoKCc8dGQ+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKHJvbGVJbmZvW3JvbGVdLm5hbWUgfHwgJ04vQScpICsgJzwvdGQ+Jyk7XG5cdFx0XHRcdHRhYmxlLnB1c2goJzx0ZD4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwocm9sZUluZm9bcm9sZV0uZGVzY3JpcHRpb24gfHwgJ04vQScpICsgJzwvdGQ+Jyk7XG5cdFx0XHRcdHRhYmxlLnB1c2goJzwvdHI+Jyk7XG5cdFx0XHR9XG5cblx0XHRcdCQoJyNCQjA3Njc2Ql9FQUNBXzlCNDJfRUQ1MV80NzdEQjI5NzYwNDEnKS5odG1sKHRhYmxlLmpvaW4oJycpKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIENIRUNLIFVTRVIgU1RBVFVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsZXQgaWNvbiA9ICcnO1xuXHRcdFx0bGV0IG1lc3NhZ2UgPSAnJztcblxuXHRcdFx0aWYodmFsaWQgIT09ICdmYWxzZScpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogVkFMSUQgVVNFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYoY2VydEVuYWJsZWQgIT09ICdmYWxzZScgJiYgY2xpZW50RE5JbkFNSSAmJiBpc3N1ZXJETkluQU1JKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoIWNsaWVudEROSW5TZXNzaW9uXG5cdFx0XHRcdFx0ICAgfHxcblx0XHRcdFx0XHQgICAhaXNzdWVyRE5JblNlc3Npb25cblx0XHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0XHRtZXNzYWdlID0gJ0l0IGlzIHJlY29tbWVuZGVkIHRvIGF1dGhlbnRpY2F0ZSB3aXRoIGEgWC41MDkgY2VydGlmaWNhdGUuJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmKGNsaWVudEROSW5BTUkgIT09IGNsaWVudEROSW5TZXNzaW9uXG5cdFx0XHRcdFx0XHQgICB8fFxuXHRcdFx0XHRcdFx0ICAgaXNzdWVyRE5JbkFNSSAhPT0gaXNzdWVyRE5JblNlc3Npb25cblx0XHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdFx0bWVzc2FnZSA9ICdUaGUgWC41MDkgY2VydGlmaWNhdGUgaW4gdGhlIHNlc3Npb24gZGlmZmVycyBmcm9tIHRoZSBvbmUgaW4gQU1JLic7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKG1lc3NhZ2UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkKCcjRDk0NEIwMURfMkU4RF80RUU5XzlEQ0NfMjY5MTQzOEJCQTE2JykuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1pbmZvLWNpcmNsZSB0ZXh0LXdhcm5pbmdcIj48L2k+ICcgKyBtZXNzYWdlKTtcblxuXHRcdFx0XHRcdGljb24gPSAnPGEgY2xhc3M9XCJuYXYtbGluayB0ZXh0LXdhcm5pbmdcIiBocmVmPVwiamF2YXNjcmlwdDphbWlMb2dpbi5hY2NvdW50U3RhdHVzKCk7XCI+J1xuXHRcdFx0XHRcdCAgICAgICArXG5cdFx0XHRcdFx0ICAgICAgICc8aSBjbGFzcz1cImZhIGZhLWluZm8tY2lyY2xlXCI+PC9pPidcblx0XHRcdFx0XHQgICAgICAgK1xuXHRcdFx0XHRcdCAgICAgICAnPC9hPidcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0YzRkY5RjQzX0RFNzJfNDBCQl9CMUJBX0I3QjNDOTAwMjY3MScpLnBhcmVudCgpLmNzcygnYmFja2dyb3VuZCcsICcjQjhENDlCIHVybChcIicgKyBhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9pbWFnZXMvY2VydGlmaWNhdGUtZ3JlZW4ucG5nXCIpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyJylcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnYmFja2dyb3VuZC1zaXplJywgJ2NvdmVyJylcblx0XHRcdFx0O1xuXG5cdFx0XHRcdCQoJyNGM0ZGOUY0M19ERTcyXzQwQkJfQjFCQV9CN0IzQzkwMDI2NzEnKS5jc3MoJ2NvbG9yJywgJyMwMDY0MDAnKVxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1sZWFmXCI+PC9pPiB2YWxpZCA8aSBjbGFzcz1cImZhIGZhLWxlYWZcIj48L2k+Jylcblx0XHRcdFx0O1xuXG5cdFx0XHRcdCQoJyNFOTEyODBGNl9FN0M2XzNFNTNfQTQ1N182NDY5OTVDOTkzMTcnKS50ZXh0KG5vdEJlZm9yZSArICcgLSAnICsgbm90QWZ0ZXIpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBJTlZBTElEIFVTRVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZih2b21zRW5hYmxlZCAhPT0gJ2ZhbHNlJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKCFjbGllbnRETkluQU1JXG5cdFx0XHRcdFx0ICAgfHxcblx0XHRcdFx0XHQgICAhaXNzdWVyRE5JbkFNSVxuXHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdG1lc3NhZ2UgPSAnUmVnaXN0ZXIgYSB2YWxpZCBYLjUwOSBjZXJ0aWZpY2F0ZS4nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bWVzc2FnZSA9ICdDaGVjayB5b3VyIHZpcnR1YWwgb3JnYW5pemF0aW9uIHJvbGVzLic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG1lc3NhZ2UgPSAnVW5leHBlY3RlZCBpc3N1ZSwgY29udGFjdCB0aGUgQU1JIHRlYW0uJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihtZXNzYWdlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgnI0Q5NDRCMDFEXzJFOERfNEVFOV85RENDXzI2OTE0MzhCQkExNicpLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGUgdGV4dC1kYW5nZXJcIj48L2k+ICcgKyBtZXNzYWdlKTtcblxuXHRcdFx0XHRcdGljb24gPSAnPGEgY2xhc3M9XCJuYXYtbGluayB0ZXh0LWRhbmdlclwiIGhyZWY9XCJqYXZhc2NyaXB0OmFtaUxvZ2luLmFjY291bnRTdGF0dXMoKTtcIj4nXG5cdFx0XHRcdFx0ICAgICAgICtcblx0XHRcdFx0XHQgICAgICAgJzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGVcIj48L2k+J1xuXHRcdFx0XHRcdCAgICAgICArXG5cdFx0XHRcdFx0ICAgICAgICc8L2E+J1xuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHQkKCcjRjNGRjlGNDNfREU3Ml80MEJCX0IxQkFfQjdCM0M5MDAyNjcxJykucGFyZW50KCkuY3NzKCdiYWNrZ3JvdW5kJywgJyNFOEM4Q0YgdXJsKFwiJyArIGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2ltYWdlcy9jZXJ0aWZpY2F0ZS1waW5rLnBuZ1wiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlcicpXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ2JhY2tncm91bmQtc2l6ZScsICdjb3ZlcicpXG5cdFx0XHRcdDtcblxuXHRcdFx0XHQkKCcjRjNGRjlGNDNfREU3Ml80MEJCX0IxQkFfQjdCM0M5MDAyNjcxJykuY3NzKCdjb2xvcicsICcjOEIwMDAwJylcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtbGVhZlwiPjwvaT4gaW52YWxpZCA8aSBjbGFzcz1cImZhIGZhLWxlYWZcIj48L2k+Jylcblx0XHRcdFx0O1xuXG5cdFx0XHRcdCQoJyNFOTEyODBGNl9FN0M2XzNFNTNfQTQ1N182NDY5OTVDOTkzMTcnKS50ZXh0KG5vdEJlZm9yZSArICcgLSAnICsgbm90QWZ0ZXIpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFVQREFURSBNRU5VIEJBUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRkaWN0Wyd1c2VyJ10gPSB1c2VyO1xuXHRcdFx0ZGljdFsnaWNvbiddID0gaWNvbjtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX2xvZ2luX21lbnVfY29udGVudCcsIHRoaXMuZnJhZ21lbnRMb2dvdXRCdXR0b24sIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnRyaWdnZXJMb2dpbigpLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGFtaVdlYkFwcC5yZXBsYWNlSFRNTCgnI2FtaV9sb2dpbl9tZW51X2NvbnRlbnQnLCB0aGlzLmZyYWdtZW50TG9naW5CdXR0b24sIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnRyaWdnZXJMb2dvdXQoKS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlKCk7XG5cblx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBVQkxJQyBNRVRIT0RTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgY3VycmVudCB1c2VyXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgY3VycmVudCB1c2VyXG5cdCAgKi9cblxuXHRnZXRVc2VyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy51c2VyO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIGd1ZXN0IHVzZXJcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBndWVzdCB1c2VyXG5cdCAgKi9cblxuXHRnZXRHdWVzdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZ3Vlc3Q7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgY2xpZW50IEROXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgY2xpZW50IEROXG5cdCAgKi9cblxuXHRnZXRDbGllbnRETjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuY2xpZW50RE47XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgaXNzdWVyIEROXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgaXNzdWVyIEROXG5cdCAgKi9cblxuXHRnZXRJc3N1ZXJETjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNzdWVyRE47XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hlY2tzIHdoZXRoZXIgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZFxuXHQgICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAgKi9cblxuXHRpc0F1dGhlbnRpY2F0ZWQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnVzZXIgIT09IHRoaXMuZ3Vlc3Q7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hlY2tzIHdoZXRoZXIgdGhlIHVzZXIgaGFzIHRoZSBnaXZlbiByb2xlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcm9sZSB0aGUgcm9sZVxuXHQgICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAgKi9cblxuXHRoYXNSb2xlOiBmdW5jdGlvbihyb2xlTmFtZSlcblx0e1xuXHRcdHJldHVybiByb2xlTmFtZSBpbiB0aGlzLnJvbGVJbmZvO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnU1NPJyBtb2RhbCB3aW5kb3dcblx0ICAqL1xuXG5cdHNzbzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblxuXHRcdHdpbmRvdy5vcGVuKHRoaXMuc3NvSW5mby51cmwsICdTaW5nbGUgU2lnbi1PbicsICdtZW51YmFyPW5vLCBzdGF0dXM9bm8sIHNjcm9sbGJhcnM9bm8sIHdpZHRoPTgwMCwgaGVpZ2h0PTQ1MCcpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnU2lnbkluJyBtb2RhbCB3aW5kb3dcblx0ICAqL1xuXG5cdHNpZ25JbjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblxuXHRcdCQoJyNEMkI1RkFERV85N0EzXzRCOENfODU2MV83QTlBRUFDREJFNUInKS5tb2RhbCgnc2hvdycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnQ2hhbmdlIEluZm8nIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0Y2hhbmdlSW5mbzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblxuXHRcdCQoJyNEOUVBRjk5OF9FRDhFXzQ0RDJfQTBCRV84QzVDRjVFNDM4QkQnKS5tb2RhbCgnc2hvdycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnQ2hhbmdlIFBhc3N3b3JkJyBtb2RhbCB3aW5kb3dcblx0ICAqL1xuXG5cdGNoYW5nZVBhc3M6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuX2NsZWFuKCk7XG5cblx0XHQkKCcjRTkyQTEwOTdfOTgzQl80ODU3Xzg3NUZfMDdFNDY1OUI0MUIwJykubW9kYWwoJ3Nob3cnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBPcGVucyB0aGUgJ0FjY291bnQgU3RhdHVzJyBtb2RhbCB3aW5kb3dcblx0ICAqL1xuXG5cdGFjY291bnRTdGF0dXM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuX2NsZWFuKCk7XG5cblx0XHQkKCcjQUIxQ0IxODNfOTZFQl80MTE2XzhBOUVfNDQwOUJFMDU4RjM0JykubW9kYWwoJ3Nob3cnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTaWducyBvdXRcblx0ICAqL1xuXG5cdHNpZ25PdXQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRyZXR1cm4gYW1pQ29tbWFuZC5sb2dvdXQoKS5hbHdheXMoKGRhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykgPT4ge1xuXG5cdFx0XHR0aGlzLl91cGRhdGUodXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLl91bmxvY2soKTtcblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2xvZ2luOiBmdW5jdGlvbihlKVxuXHR7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gJChlLnRhcmdldCkuc2VyaWFsaXplT2JqZWN0KCk7XG5cblx0XHRyZXR1cm4gdGhpcy5mb3JtX2xvZ2luMih2YWx1ZXNbJ3VzZXInXSwgdmFsdWVzWydwYXNzJ10pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2xvZ2luMjogZnVuY3Rpb24odXNlciwgcGFzcylcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgcHJvbWlzZSA9ICh1c2VyICYmIHBhc3MpID8gYW1pQ29tbWFuZC5wYXNzTG9naW4odXNlci50cmltKCksIHBhc3MudHJpbSgpKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFtaUNvbW1hbmQuY2VydExvZ2luKC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0qLylcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRwcm9taXNlLnRoZW4oKGRhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykgPT4ge1xuXG5cdFx0XHR0aGlzLl91cGRhdGUodXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRpZih1c2VySW5mby5BTUlVc2VyICE9PSB1c2VySW5mby5ndWVzdFVzZXIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkKCcjRDJCNUZBREVfOTdBM180QjhDXzg1NjFfN0E5QUVBQ0RCRTVCJykubW9kYWwoJ2hpZGUnKTtcblxuXHRcdFx0XHRcdHRoaXMuX3VubG9jaygpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0aWYodXNlckluZm8uQU1JVXNlciAhPT0gdXNlckluZm8uZ3Vlc3RVc2VyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgnI0QyQjVGQURFXzk3QTNfNEI4Q184NTYxXzdBOUFFQUNEQkU1QicpLm1vZGFsKCdoaWRlJyk7XG5cblx0XHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmKHVzZXJJbmZvLkFNSVVzZXIgPT09IHVzZXJJbmZvLmd1ZXN0VXNlcilcblx0XHRcdHtcblx0XHRcdFx0bGV0IG1lc3NhZ2UgPSAnQXV0aGVudGljYXRpb24gZmFpbGVkLic7XG5cblx0XHRcdFx0aWYodXNlckluZm8uY2xpZW50RE5JblNlc3Npb24gfHwgdXNlckluZm8uaXNzdWVyRE5JblNlc3Npb24pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtZXNzYWdlICs9ICcgQ2xpZW50IEROIGluIHNlc3Npb246ICcgKyBhbWlXZWJBcHAudGV4dFRvSHRtbCh1c2VySW5mby5jbGllbnRETkluU2Vzc2lvbikgKyAnLidcblx0XHRcdFx0XHQgICAgICAgICAgICtcblx0XHRcdFx0XHQgICAgICAgICAgICcgSXNzdWVyIEROIGluIHNlc3Npb246ICcgKyBhbWlXZWJBcHAudGV4dFRvSHRtbCh1c2VySW5mby5pc3N1ZXJETkluU2Vzc2lvbikgKyAnLidcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdH1cblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pID0+IHtcblxuXHRcdFx0dGhpcy5fdXBkYXRlKHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykuYWx3YXlzKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fYXR0YWNoQ2VydDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1c2VyID0gJCgnI0U2NEYyNEIyXzMzRTZfNERFRF85QjI0XzI4QkUwNDIxOTYxMycpLnZhbCgpO1xuXHRcdGNvbnN0IHBhc3MgPSAkKCcjQTRERkQwMzlfMDM0Rl80RDEwXzk2NjhfMzg1QUVGNEZCQkI5JykudmFsKCk7XG5cblx0XHRpZighdXNlciB8fCAhcGFzcylcblx0XHR7XG5cdFx0XHR0aGlzLl9lcnJvcignUGxlYXNlLCBmaWxsIGFsbCBmaWVsZHMgd2l0aCBhIHJlZCBzdGFyLicpO1xuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5hdHRhY2hDZXJ0KHVzZXIsIHBhc3MpLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fZGV0YWNoQ2VydDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1c2VyID0gJCgnI0U2NEYyNEIyXzMzRTZfNERFRF85QjI0XzI4QkUwNDIxOTYxMycpLnZhbCgpO1xuXHRcdGNvbnN0IHBhc3MgPSAkKCcjQTRERkQwMzlfMDM0Rl80RDEwXzk2NjhfMzg1QUVGNEZCQkI5JykudmFsKCk7XG5cblx0XHRpZighdXNlciB8fCAhcGFzcylcblx0XHR7XG5cdFx0XHR0aGlzLl9lcnJvcignUGxlYXNlLCBmaWxsIGFsbCBmaWVsZHMgd2l0aCBhIHJlZCBzdGFyLicpO1xuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5kZXRhY2hDZXJ0KHVzZXIsIHBhc3MpLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fYWRkVXNlcjogZnVuY3Rpb24oZSlcblx0e1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gJChlLnRhcmdldCkuc2VyaWFsaXplT2JqZWN0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmFkZFVzZXIodmFsdWVzWydsb2dpbiddLCB2YWx1ZXNbJ3Bhc3MnXSwgdmFsdWVzWydmaXJzdF9uYW1lJ10sIHZhbHVlc1snbGFzdF9uYW1lJ10sIHZhbHVlc1snZW1haWwnXSwgJ2F0dGFjaCcgaW4gdmFsdWVzLCAnYWdyZWUnIGluIHZhbHVlcykudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9yZW1pbmRQYXNzOiBmdW5jdGlvbihlKVxuXHR7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB2YWx1ZXMgPSAkKGUudGFyZ2V0KS5zZXJpYWxpemVPYmplY3QoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdGFtaUNvbW1hbmQucmVzZXRQYXNzKHZhbHVlc1sndXNlciddKS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX3N1Y2Nlc3MobWVzc2FnZSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2NoYW5nZUluZm86IGZ1bmN0aW9uKGUpXG5cdHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHZhbHVlcyA9ICQoZS50YXJnZXQpLnNlcmlhbGl6ZU9iamVjdCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5jaGFuZ2VJbmZvKHZhbHVlc1snZmlyc3RfbmFtZSddLCB2YWx1ZXNbJ2xhc3RfbmFtZSddLCB2YWx1ZXNbJ2VtYWlsJ10pLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fY2hhbmdlUGFzczogZnVuY3Rpb24oZSlcblx0e1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gJChlLnRhcmdldCkuc2VyaWFsaXplT2JqZWN0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmNoYW5nZVBhc3ModGhpcy51c2VyLCB2YWx1ZXNbJ29sZF9wYXNzJ10sIHZhbHVlc1snbmV3X3Bhc3MnXSkudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qIVxuICogQU1JIFdlYiBGcmFtZXdvcmsgLSBBTUlEb2MuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxOSBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyogZXNsaW50LWRpc2FibGUgKi9cblxudmFyIGFtaURvYyA9IHtcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCIkQU1JTmFtZXNwYWNlXCIsXCJkZXNjXCI6XCJDcmVhdGUgYSBuZXcgbmFtZXNwYWNlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiJG5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIG5hbWVzcGFjZSBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiJGRlc2NyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBuYW1lc3BhY2UgYm9keVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwiJEFNSUludGVyZmFjZVwiLFwiZGVzY1wiOlwiQ3JlYXRlIGEgbmV3IGludGVyZmFjZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIiRuYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBpbnRlcmZhY2UgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIiRkZXNjclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgaW50ZXJmYWNlIGJvZHlcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIiRBTUlDbGFzc1wiLFwiZGVzY1wiOlwiQ3JlYXRlIGEgbmV3IGNsYXNzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiJG5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGNsYXNzIG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCIkZGVzY3JcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIGNsYXNzIGJvZHlcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19XSxcIm5hbWVzcGFjZXNcIjpbe1wibmFtZVwiOlwiYW1pUm91dGVyXCIsXCJkZXNjXCI6XCJUaGUgQU1JIHVybCByb3V0aW5nIHN1YnN5c3RlbVwiLFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcImdldFNjcmlwdFVSTFwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgQVdGJ3Mgc2NyaXB0IFVSTFwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIEFXRidzIHNjcmlwdCBVUkxcIn1dfSx7XCJuYW1lXCI6XCJnZXRPcmlnaW5VUkxcIixcImRlc2NcIjpcIkdldHMgdGhlIG9yaWdpbiBVUkxcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBvcmlnaW4gVVJMXCJ9XX0se1wibmFtZVwiOlwiZ2V0V2ViQXBwVVJMXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSB3ZWJhcHAgVVJMXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgd2ViYXBwIFVSTFwifV19LHtcIm5hbWVcIjpcImdldEhhc2hcIixcImRlc2NcIjpcIkdldHMgdGhlIGFuY2hvciBwYXJ0IG9mIHRoZSB3ZWJhcHAgVVJMXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgYW5jaG9yIHBhcnQgb2YgdGhlIHdlYmFwcCBVUkxcIn1dfSx7XCJuYW1lXCI6XCJnZXRBcmdzXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBhcmd1bWVudHMgZXh0cmFjdGVkIGZyb20gdGhlIHdlYmFwcCBVUkxcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJBcnJheS48U3RyaW5nPlwiLFwiZGVzY1wiOlwiVGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFwifV19LHtcIm5hbWVcIjpcImFwcGVuZFwiLFwiZGVzY1wiOlwiQXBwZW5kcyBhIHJvdXRpbmcgcnVsZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInJlZ0V4cFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcmVnRXhwXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiaGFuZGxlclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgaGFuZGxlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiTmFtZXNwYWNlXCIsXCJkZXNjXCI6XCJUaGUgYW1pUm91dGVyIHNpbmdsZXRvblwifV19LHtcIm5hbWVcIjpcInJlbW92ZVwiLFwiZGVzY1wiOlwiUmVtb3ZlcyBzb21lIHJvdXRpbmcgcnVsZXNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJyZWdFeHBcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHJlZ0V4cFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiTmFtZXNwYWNlXCIsXCJkZXNjXCI6XCJUaGUgYW1pUm91dGVyIHNpbmdsZXRvblwifV19LHtcIm5hbWVcIjpcImNoZWNrXCIsXCJkZXNjXCI6XCJDaGVja3Mgd2hldGhlciB0aGUgVVJMIG1hdGNoZXMgd2l0aCBhIHJvdXRpbmcgcnVsZVwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19LHtcIm5hbWVcIjpcImFwcGVuZEhpc3RvcnlFbnRyeVwiLFwiZGVzY1wiOlwiQXBwZW5kIGEgbmV3IGhpc3RvcnkgZW50cnlcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXRoXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBuZXcgcGF0aFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRleHRcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIG5ldyBjb250ZXh0XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJyZXBsYWNlSGlzdG9yeUVudHJ5XCIsXCJkZXNjXCI6XCJSZXBsYWNlIHRoZSBjdXJyZW50IGhpc3RvcnkgZW50cnlcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXRoXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBuZXcgcGF0aFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRleHRcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIG5ldyBjb250ZXh0XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfV19LHtcIm5hbWVcIjpcImFtaVdlYkFwcFwiLFwiZGVzY1wiOlwiVGhlIEFNSSB3ZWJhcHAgc3Vic3lzdGVtXCIsXCJ2YXJpYWJsZXNcIjpbe1wibmFtZVwiOlwib3JpZ2luVVJMXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBvcmlnaW4gVVJMXCJ9LHtcIm5hbWVcIjpcIndlYkFwcFVSTFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgd2ViYXBwIFVSTFwifSx7XCJuYW1lXCI6XCJoYXNoXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBhbmNob3IgcGFydCBvZiB0aGUgd2ViYXBwIFVSTFwifSx7XCJuYW1lXCI6XCJhcmdzXCIsXCJ0eXBlXCI6XCJBcnJheS48U3RyaW5nPlwiLFwiZGVzY1wiOlwiVGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFwifV0sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwiaXNFbWJlZGRlZFwiLFwiZGVzY1wiOlwiQ2hlY2tzIHdoZXRoZXIgdGhlIFdlYkFwcCBpcyBleGVjdXRlZCBpbiBlbWJlZGRlZCBtb2RlXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX0se1wibmFtZVwiOlwiaXNMb2NhbFwiLFwiZGVzY1wiOlwiQ2hlY2tzIHdoZXRoZXIgdGhlIFdlYkFwcCBpcyBleGVjdXRlZCBsb2NhbGx5IChmaWxlOi8vLCBsb2NhbGhvc3QsIDEyNy4wLjAuMSBvciA6OjEpXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX0se1wibmFtZVwiOlwidGV4dFRvSHRtbFwiLFwiZGVzY1wiOlwiRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBIVE1MXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1bmVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBlc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcImh0bWxUb1RleHRcIixcImRlc2NcIjpcIlVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSFRNTCB0byB0ZXh0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgdW5lc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcInRleHRUb1N0cmluZ1wiLFwiZGVzY1wiOlwiRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBKYXZhU2NyaXB0IHN0cmluZ1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdW5lc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJzdHJpbmdUb1RleHRcIixcImRlc2NcIjpcIlVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSmF2YVNjcmlwdCBzdHJpbmcgdG8gdGV4dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHVuZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJodG1sVG9TdHJpbmdcIixcImRlc2NcIjpcIkVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEhUTUwgdG8gSmF2YVNjcmlwdCBzdHJpbmdcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVuZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwic3RyaW5nVG9IdG1sXCIsXCJkZXNjXCI6XCJVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEphdmFTY3JpcHQgc3RyaW5nIHRvIEhUTUxcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSB1bmVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwidGV4dFRvU1FMXCIsXCJkZXNjXCI6XCJFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIFNRTFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdW5lc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJzcWxUb1RleHRcIixcImRlc2NcIjpcIlVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gU1FMIHRvIHRleHRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSB1bmVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwiYmFzZTY0RW5jb2RlXCIsXCJkZXNjXCI6XCJFbmNvZGVzIChSRkMgNDY0OCkgYSBzdHJpbmdcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGRlY29kZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBlbmNvZGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcImJhc2U2NERlY29kZVwiLFwiZGVzY1wiOlwiRGVjb2RlcyAoUkZDIDQ2NDgpIGEgc3RyaW5nXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlbmNvZGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZGVjb2RlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJsb2FkUmVzb3VyY2VzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyByZXNvdXJjZXMgYnkgZXh0ZW5zaW9uXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkU2hlZXRzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBDU1Mgc2hlZXRzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkU2NyaXB0c1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgSlMgc2NyaXB0c1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZEpTT05zXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBKU09OIGZpbGVzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkWE1Mc1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgWE1MIGZpbGVzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkSFRNTHNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIEhUTUwgZmlsZXNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRUV0lHc1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgVFdJRyBmaWxlc1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFRleHRzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyB0ZXh0IGZpbGVzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJyZXBsYWNlSFRNTFwiLFwiZGVzY1wiOlwiUHV0cyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwicHJlcGVuZEhUTUxcIixcImRlc2NcIjpcIlByZXBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJhcHBlbmRIVE1MXCIsXCJkZXNjXCI6XCJBcHBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJmb3JtYXRUV0lHXCIsXCJkZXNjXCI6XCJJbnRlcnByZXRlcyB0aGUgZ2l2ZW4gVFdJRyBzdHJpbmcsIHNlZSB7QGxpbmsgaHR0cDovL3R3aWcuc2Vuc2lvbGFicy5vcmcvZG9jdW1lbnRhdGlvbn1cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImRpY3RcIixcInR5cGVcIjpbXCJPYmplY3RcIixcIkFycmF5XCJdLFwiZGVzY1wiOlwidGhlIGRpY3Rpb25hcnlcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIEludGVycHJldGVkIFRXSUcgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwianNwYXRoXCIsXCJkZXNjXCI6XCJGaW5kcyBkYXRhIHdpdGhpbiB0aGUgZ2l2ZW4gSlNPTiwgc2VlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vZGZpbGF0b3YvanNwYXRofVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhdGhcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHBhdGhcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJqc29uXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBKU09OXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJBcnJheVwiLFwiZGVzY1wiOlwiVGhlIHJlc3VsdGluZyBhcnJheVwifV19LHtcIm5hbWVcIjpcImxvY2tcIixcImRlc2NcIjpcIkxvY2tzIHRoZSBXZWIgYXBwbGljYXRpb25cIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJ1bmxvY2tcIixcImRlc2NcIjpcIlVubG9ja3MgdGhlIFdlYiBhcHBsaWNhdGlvblwiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImNhbkxlYXZlXCIsXCJkZXNjXCI6XCJFbmFibGVzIHRoZSBtZXNzYWdlIGluIGEgY29uZmlybWF0aW9uIGRpYWxvZyBib3ggdG8gaW5mb3JtIHRoYXQgdGhlIHVzZXIgaXMgYWJvdXQgdG8gbGVhdmUgdGhlIGN1cnJlbnQgcGFnZS5cIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJjYW5ub3RMZWF2ZVwiLFwiZGVzY1wiOlwiRGlzYWJsZXMgdGhlIG1lc3NhZ2UgaW4gYSBjb25maXJtYXRpb24gZGlhbG9nIGJveCB0byBpbmZvcm0gdGhhdCB0aGUgdXNlciBpcyBhYm91dCB0byBsZWF2ZSB0aGUgY3VycmVudCBwYWdlLlwiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImluZm9cIixcImRlc2NcIjpcIlNob3dzIGFuICdpbmZvJyBtZXNzYWdlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwibWVzc2FnZVwiLFwidHlwZVwiOltcIlN0cmluZ1wiLFwiQXJyYXlcIl0sXCJkZXNjXCI6XCJ0aGUgbWVzc2FnZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImZhZGVPdXRcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcImlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJzdWNjZXNzXCIsXCJkZXNjXCI6XCJTaG93cyBhICdzdWNjZXNzJyBtZXNzYWdlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwibWVzc2FnZVwiLFwidHlwZVwiOltcIlN0cmluZ1wiLFwiQXJyYXlcIl0sXCJkZXNjXCI6XCJ0aGUgbWVzc2FnZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImZhZGVPdXRcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcImlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJ3YXJuaW5nXCIsXCJkZXNjXCI6XCJTaG93cyBhICd3YXJuaW5nJyBtZXNzYWdlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwibWVzc2FnZVwiLFwidHlwZVwiOltcIlN0cmluZ1wiLFwiQXJyYXlcIl0sXCJkZXNjXCI6XCJ0aGUgbWVzc2FnZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImZhZGVPdXRcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcImlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJlcnJvclwiLFwiZGVzY1wiOlwiU2hvd3MgYW4gJ2Vycm9yJyBtZXNzYWdlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwibWVzc2FnZVwiLFwidHlwZVwiOltcIlN0cmluZ1wiLFwiQXJyYXlcIl0sXCJkZXNjXCI6XCJ0aGUgbWVzc2FnZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImZhZGVPdXRcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcImlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJmbHVzaFwiLFwiZGVzY1wiOlwiRmx1c2hlcyBtZXNzYWdlc1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImZpbGxCcmVhZGNydW1iXCIsXCJkZXNjXCI6XCJGaWxsIHRoZSBtYWluIGJyZWFkY3J1bWJcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJpdGVtc1wiLFwidHlwZVwiOlwiQXJyYXlcIixcImRlc2NcIjpcInRoZSBhcnJheSBvZiBpdGVtcyAoSFRNTCBmb3JtYXQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJzdGFydFwiLFwiZGVzY1wiOlwiU3RhcnRzIHRoZSBXZWIgYXBwbGljYXRpb25cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChsb2dvX3VybCwgaG9tZV91cmwsIGNvbnRhY3RfZW1haWwsIGFib3V0X3VybCwgdGhlbWVfdXJsLCBsb2NrZXJfdXJsLCBjaGFuZ2VfcGFzc29yZF9hbGxvd2VkLCBjaGFuZ2VfaW5mb19hbGxvd2VkLCBjaGFuZ2VfcGFzc29yZF9hbGxvd2VkKVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwibG9hZENvbnRyb2xcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIGEgY29udHJvbFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcImNvbnRyb2xcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIGNvbnRyb2wgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjcmVhdGVDb250cm9sXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGFyZW50XCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIm93bmVyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRyb2xcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFyYW1zXCIsXCJ0eXBlXCI6XCJBcnJheVwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNyZWF0ZUNvbnRyb2xJbkJvZHlcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gYSBjb250YWluZXJcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXJlbnRcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwib3duZXJcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udHJvbFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXJhbXNXaXRob3V0U2V0dGluZ3NcIixcInR5cGVcIjpcIkFycmF5XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250cm9sU2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFyZW50U2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lclwiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbCBpbiBhIGNvbnRhaW5lclwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhcmVudFwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJvd25lclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250cm9sXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhcmFtc1dpdGhvdXRTZXR0aW5nc1wiLFwidHlwZVwiOlwiQXJyYXlcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRyb2xTZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXJlbnRTZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJpY29uXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInRpdGxlXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjcmVhdGVDb250cm9sRnJvbVdlYkxpbmtcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gYSBjb250YWluZXIgZnJvbSBhIFdFQiBsaW5rXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGFyZW50XCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIm93bmVyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImVsXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhcmVudFNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkU3ViQXBwXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBhIHN1YmFwcFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN1YmFwcFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgc3ViYXBwXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInRoZSB1c2VyIGRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFN1YkFwcEJ5VVJMXCIsXCJkZXNjXCI6XCJMb2FkcyBhIHN1YmFwcCBieSBVUkxcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJkZWZhdWx0U3ViQXBwXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcImlmICdhbWlXZWJBcHAuYXJnc1tcXFwic3ViYXBwXFxcIl0nIGlzIG51bGwsIHRoZSBkZWZhdWx0IHN1YmFwcFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImRlZmF1bHRVc2VyRGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwiaWYgJ2FtaVdlYkFwcC5hcmdzW1xcXCJ1c2VyZGF0YVxcXCJdJyBpcyBudWxsLCB0aGUgZGVmYXVsdCB1c2VyIGRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19XSxcImV2ZW50c1wiOlt7XCJuYW1lXCI6XCJvblJlYWR5XCIsXCJkZXNjXCI6XCJUaGlzIG1ldGhvZCBtdXN0IGJlIG92ZXJsb2FkZWQgYW5kIGlzIGNhbGxlZCB3aGVuIHRoZSBXZWIgYXBwbGljYXRpb24gc3RhcnRzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlckRhdGFcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvblJlZnJlc2hcIixcImRlc2NcIjpcIlRoaXMgbWV0aG9kIG11c3QgYmUgb3ZlcmxvYWRlZCBhbmQgaXMgY2FsbGVkIHdoZW4gdGhlIHRvb2xiYXIgbmVlZHMgdG8gYmUgdXBkYXRlZFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcImlzQXV0aFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfV19LHtcIm5hbWVcIjpcImFtaUNvbW1hbmRcIixcImRlc2NcIjpcIlRoZSBBTUkgY29tbWFuZCBzdWJzeXN0ZW1cIixcInZhcmlhYmxlc1wiOlt7XCJuYW1lXCI6XCJlbmRwb2ludFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJEZWZhdWx0IGVuZHBvaW50XCJ9LHtcIm5hbWVcIjpcImNvbnZlcnRlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJEZWZhdWx0IGNvbnZlcnRlclwifV0sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwiZXhlY3V0ZVwiLFwiZGVzY1wiOlwiRXhlY3V0ZXMgYW4gQU1JIGNvbW1hbmRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJjb21tYW5kXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBjb21tYW5kXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZW5kcG9pbnQsIGNvbnZlcnRlciwgdGltZW91dCwgZXh0cmFQYXJhbSwgZXh0cmFWYWx1ZSlcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInBhc3NMb2dpblwiLFwiZGVzY1wiOlwiTG9ncyBpbiBieSBsb2dpbi9wYXNzd29yZFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVzZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXNzXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBwYXNzd29yZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjZXJ0TG9naW5cIixcImRlc2NcIjpcIkxvZ3MgaW4gYnkgY2VydGlmaWNhdGVcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9nb3V0XCIsXCJkZXNjXCI6XCJMb2dzIG91dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJhdHRhY2hDZXJ0XCIsXCJkZXNjXCI6XCJBdHRhY2hlcyBhIGNlcnRpZmljYXRlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhc3NcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImRldGFjaENlcnRcIixcImRlc2NcIjpcIkRldGFjaGVzIGEgY2VydGlmaWNhdGVcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1c2VyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFzc1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcGFzc3dvcmRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiYWRkVXNlclwiLFwiZGVzY1wiOlwiQWRkcyBhIG5ldyB1c2VyXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhc3NcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmlyc3ROYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBmaXJzdCBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwibGFzdE5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGxhc3QgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImVtYWlsXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlbWFpbFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImF0dGFjaFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiYXR0YWNoIHRoZSBjdXJyZW50IGNlcnRpZmljYXRlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiYWdyZWVcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcImFncmVlIHdpdGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNoYW5nZUluZm9cIixcImRlc2NcIjpcIkNoYW5nZXMgdGhlIGFjY291bnQgaW5mb3JtYXRpb25cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJmaXJzdE5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGZpcnN0IG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJsYXN0TmFtZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgbGFzdCBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZW1haWxcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVtYWlsXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNoYW5nZVBhc3NcIixcImRlc2NcIjpcIkNoYW5nZXMgdGhlIGFjY291bnQgcGFzc3dvcmRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1c2VyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwib2xkUGFzc1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgb2xkIHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwibmV3UGFzc1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgbmV3IHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInJlc2V0UGFzc1wiLFwiZGVzY1wiOlwiUmVzZXRzIHRoZSBhY2NvdW50IHBhc3N3b3JkXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfV19LHtcIm5hbWVcIjpcImFtaUxvZ2luXCIsXCJkZXNjXCI6XCJUaGUgQU1JIGF1dGhlbnRpY2F0aW9uIHN1YnN5c3RlbVwiLFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcImdldFVzZXJcIixcImRlc2NcIjpcIkdldHMgdGhlIGN1cnJlbnQgdXNlclwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGN1cnJlbnQgdXNlclwifV19LHtcIm5hbWVcIjpcImdldEd1ZXN0XCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBndWVzdCB1c2VyXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZ3Vlc3QgdXNlclwifV19LHtcIm5hbWVcIjpcImdldENsaWVudEROXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBjbGllbnQgRE5cIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBjbGllbnQgRE5cIn1dfSx7XCJuYW1lXCI6XCJnZXRJc3N1ZXJETlwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgaXNzdWVyIEROXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgaXNzdWVyIEROXCJ9XX0se1wibmFtZVwiOlwiaXNBdXRoZW50aWNhdGVkXCIsXCJkZXNjXCI6XCJDaGVja3Mgd2hldGhlciB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX0se1wibmFtZVwiOlwiaGFzUm9sZVwiLFwiZGVzY1wiOlwiQ2hlY2tzIHdoZXRoZXIgdGhlIHVzZXIgaGFzIHRoZSBnaXZlbiByb2xlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicm9sZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcm9sZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX0se1wibmFtZVwiOlwic3NvXCIsXCJkZXNjXCI6XCJPcGVucyB0aGUgJ1NTTycgbW9kYWwgd2luZG93XCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwic2lnbkluXCIsXCJkZXNjXCI6XCJPcGVucyB0aGUgJ1NpZ25JbicgbW9kYWwgd2luZG93XCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiY2hhbmdlSW5mb1wiLFwiZGVzY1wiOlwiT3BlbnMgdGhlICdDaGFuZ2UgSW5mbycgbW9kYWwgd2luZG93XCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiY2hhbmdlUGFzc1wiLFwiZGVzY1wiOlwiT3BlbnMgdGhlICdDaGFuZ2UgUGFzc3dvcmQnIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImFjY291bnRTdGF0dXNcIixcImRlc2NcIjpcIk9wZW5zIHRoZSAnQWNjb3VudCBTdGF0dXMnIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcInNpZ25PdXRcIixcImRlc2NcIjpcIlNpZ25zIG91dFwiLFwicGFyYW1zXCI6W119XX1dLFwiaW50ZXJmYWNlc1wiOlt7XCJuYW1lXCI6XCJhbWkuSUNvbnRyb2xcIixcImRlc2NcIjpcIlRoZSBBTUkgY29udHJvbCBpbnRlcmZhY2VcIixcImltcGxlbWVudHNcIjpbXSxcImluaGVyaXRzXCI6W10sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwicGF0Y2hJZFwiLFwiZGVzY1wiOlwiUGF0Y2hlcyBhbiBIVE1MIGlkZW50aWZpZXJcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJpZFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdW5wYXRjaGVkIEhUTUwgaWRlbnRpZmllclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgcGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcIn1dfSx7XCJuYW1lXCI6XCJyZXBsYWNlSFRNTFwiLFwiZGVzY1wiOlwiUHV0cyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwicHJlcGVuZEhUTUxcIixcImRlc2NcIjpcIlByZXBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJhcHBlbmRIVE1MXCIsXCJkZXNjXCI6XCJBcHBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJvblJlYWR5XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiB0aGUgY29udHJvbCBpcyByZWFkeSB0byBydW5cIixcInBhcmFtc1wiOltdfV19LHtcIm5hbWVcIjpcImFtaS5JU3ViQXBwXCIsXCJkZXNjXCI6XCJUaGUgQU1JIHN1Yi1hcHBsaWNhdGlvbiBpbnRlcmZhY2VcIixcImltcGxlbWVudHNcIjpbXSxcImluaGVyaXRzXCI6W10sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyByZWFkeSB0byBydW5cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uRXhpdFwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyBhYm91dCB0byBleGl0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkxvZ2luXCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiBsb2dnaW5nIGluXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkxvZ291dFwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gbG9nZ2luZyBvdXRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19XX1dLFwiY2xhc3Nlc1wiOlt7XCJuYW1lXCI6XCJhbWkuQ29udHJvbFwiLFwiZGVzY1wiOlwiVGhlIGJhc2ljIEFNSSBjb250cm9sXCIsXCJpbXBsZW1lbnRzXCI6W1wiYW1pLklDb250cm9sXCJdLFwiaW5oZXJpdHNcIjpbXSxcImtvbnN0cnVjdG9yXCI6e1wibmFtZVwiOlwiQ29udHJvbFwiLFwicGFyYW1zXCI6W119LFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcInBhdGNoSWRcIixcImRlc2NcIjpcIlBhdGNoZXMgYW4gSFRNTCBpZGVudGlmaWVyXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiaWRcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVucGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHBhdGNoZWQgSFRNTCBpZGVudGlmaWVyXCJ9XX0se1wibmFtZVwiOlwicmVwbGFjZUhUTUxcIixcImRlc2NcIjpcIlB1dHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInByZXBlbmRIVE1MXCIsXCJkZXNjXCI6XCJQcmVwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiYXBwZW5kSFRNTFwiLFwiZGVzY1wiOlwiQXBwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgaXMgcmVhZHkgdG8gcnVuXCIsXCJwYXJhbXNcIjpbXX1dfSx7XCJuYW1lXCI6XCJhbWkuU3ViQXBwXCIsXCJkZXNjXCI6XCJUaGUgYmFzaWMgQU1JIHN1Yi1hcHBsaWNhdGlvblwiLFwiaW1wbGVtZW50c1wiOltcImFtaS5JU3ViQXBwXCJdLFwiaW5oZXJpdHNcIjpbXSxcImtvbnN0cnVjdG9yXCI6e1wibmFtZVwiOlwiU3ViQXBwXCIsXCJwYXJhbXNcIjpbXX0sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyByZWFkeSB0byBydW5cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uRXhpdFwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyBhYm91dCB0byBleGl0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkxvZ2luXCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiBsb2dnaW5nIGluXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkxvZ291dFwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gbG9nZ2luZyBvdXRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19XX1dfTtcblxuLyogZXNsaW50LWVuYWJsZSAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyJdfQ==
