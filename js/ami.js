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

$(document).on('show.bs.dropdown', '.dropdown', function (e) {
  var el = $(e.currentTarget);
});
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
    /*-----------------------------------------------------------------*/


    var _super = this.$class._internal_super;
    var _added = this.$class._internal_added;
    /*-----------------------------------------------------------------*/

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
    /*-----------------------------------------------------------------*/


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
            message = 'It is recommended to connect to AMI with a X.509 certificate.';
          } else {
            if (clientDNInAMI !== clientDNInSession || issuerDNInAMI !== issuerDNInSession) {
              message = 'The certificate in your session is not the one registered in AMI.';
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
            message = 'Register a valid certificate.';
          } else {
            message = 'Check your VO roles.';
          }
        } else {
          message = 'Contact the AMI team.';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFNSS9leHRlcm5hbC9hbWktdHdpZy5lczYuanMiLCJBTUkvZXh0ZXJuYWwvanNwYXRoLmpzIiwiQU1JL0FNSUV4dGVuc2lvbi5qcyIsIkFNSS9BTUlPYmplY3QuanMiLCJBTUkvQU1JUm91dGVyLmpzIiwiQU1JL0FNSVdlYkFwcC5qcyIsIkFNSS9BTUlJbnRlcmZhY2UuanMiLCJBTUkvQU1JQ29tbWFuZC5qcyIsIkFNSS9BTUlMb2dpbi5qcyIsIkFNSS9BTUlEb2MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7OztBQVdBOztBQUNBOztBQUNBOztBQUVBLElBQUksT0FBTyxHQUFHO0FBQ2IsRUFBQSxPQUFPLEVBQUU7QUFESSxDQUFkO0FBSUE7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBRyxPQUFPLE9BQVAsS0FBbUIsV0FBdEIsRUFDQTtBQUNDLEVBQUEsT0FBTyxDQUFDLEVBQVIsR0FBYSxPQUFPLENBQUEsSUFBQSxDQUFwQjtBQUVBLEVBQUEsTUFBTSxDQUFDLE9BQVAsQ0FBZSxPQUFmLEdBQXlCLE9BQXpCO0FBQ0E7QUFFRDs7QUFFQTs7Ozs7Ozs7Ozs7QUFXQTs7QUFDQTs7QUFDQTs7O0FBRUEsT0FBTyxDQUFDLFNBQVIsR0FBb0I7QUFDbkI7QUFFQSxFQUFBLFFBQVEsRUFBRSxrQkFBUyxJQUFULEVBQWUsSUFBZixFQUFxQixNQUFyQixFQUE2QixTQUE3QixFQUF3QyxVQUF4QyxFQUFvRCxLQUFwRCxFQUNWO0FBQ0MsUUFBRyxTQUFTLENBQUMsTUFBVixLQUFxQixVQUFVLENBQUMsTUFBbkMsRUFDQTtBQUNDLFlBQU0seUNBQU47QUFDQTs7QUFFRCxRQUFNLGFBQWEsR0FBRyxFQUF0QjtBQUNBLFFBQU0sWUFBWSxHQUFHLEVBQXJCO0FBQ0EsUUFBTSxZQUFZLEdBQUcsRUFBckI7QUFFQSxRQUFJLENBQUMsR0FBRyxXQUFSO0FBQ0EsUUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQWY7QUFFQSxRQUFJLElBQUksR0FBRyxF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LEVBQXFmO0FBQUEsY0FBYyxVQUFkO0FBQXlCLGNBQU8seUJBQWhDO0FBQTBELGdCQUFTLENBQUE7QUFBQSxnQkFBUyxVQUFUO0FBQW9CLGdCQUFPLEdBQTNCO0FBQTJCLGdCQUFXLFVBQXRDO0FBQWlELG1CQUFVLEVBQTNEO0FBQTJELG9CQUFjLEVBQXpFO0FBQXlFLG9CQUFjO0FBQXZGLE9BQUE7QUFBbkUsS0FBcmY7QUFBckssR0FBbmxFO0FBQXorMUIsQ0FBYjtBQUVBOztBQUVBIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgVHdpZyBFbmdpbmVcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxOSBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG52YXIgYW1pVHdpZyA9IHtcblx0dmVyc2lvbjogJzEuMC4wJ1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGV4cG9ydHMuYW1pVHdpZyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pZih0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpXG57XG5cdGFtaVR3aWcuZnMgPSByZXF1aXJlKCdmcycpO1xuXG5cdG1vZHVsZS5leHBvcnRzLmFtaVR3aWcgPSBhbWlUd2lnO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRva2VuaXplciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50b2tlbml6ZXIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0b2tlbml6ZTogZnVuY3Rpb24oY29kZSwgbGluZSwgc3BhY2VzLCB0b2tlbkRlZnMsIHRva2VuVHlwZXMsIGVycm9yKVxuXHR7XG5cdFx0aWYodG9rZW5EZWZzLmxlbmd0aCAhPT0gdG9rZW5UeXBlcy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2B0b2tlbkRlZnMubGVuZ3RoICE9IHRva2VuVHlwZXMubGVuZ3RoYCc7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVzdWx0X3Rva2VucyA9IFtdO1xuXHRcdGNvbnN0IHJlc3VsdF90eXBlcyA9IFtdO1xuXHRcdGNvbnN0IHJlc3VsdF9saW5lcyA9IFtdO1xuXG5cdFx0bGV0IGkgPSAweDAwMDAwMDAwMDtcblx0XHRjb25zdCBsID0gY29kZS5sZW5ndGg7XG5cblx0XHRsZXQgd29yZCA9ICcnLCB0b2tlbiwgYztcblxuX19sMDpcdFx0d2hpbGUoaSA8IGwpXG5cdFx0e1xuXHRcdFx0YyA9IGNvZGUuY2hhckF0KDApO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQ09VTlQgTElORVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKGMgPT09ICdcXG4nKVxuXHRcdFx0e1xuXHRcdFx0XHRsaW5lKys7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFQVQgU1BBQ0VTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYoc3BhY2VzLmluZGV4T2YoYykgPj0gMClcblx0XHRcdHtcblx0XHRcdFx0aWYod29yZClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdpbnZhbGlkIHRva2VuIGAnICsgd29yZCArICdgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2goLTEpO1xuXHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdHdvcmQgPSAnJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZygxKTtcblx0XHRcdFx0aSArPSAxO1xuXG5cdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFQVQgUkVHRVhFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Zm9yKGNvbnN0IGogaW4gdG9rZW5EZWZzKVxuXHRcdFx0e1xuXHRcdFx0XHR0b2tlbiA9IHRoaXMuX21hdGNoKGNvZGUsIHRva2VuRGVmc1tqXSk7XG5cblx0XHRcdFx0aWYodG9rZW4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZih3b3JkKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh3b3JkKTtcblx0XHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdFx0d29yZCA9ICcnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh0b2tlbik7XG5cdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2godG9rZW5UeXBlc1tqXSk7XG5cdFx0XHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG5cblx0XHRcdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcodG9rZW4ubGVuZ3RoKTtcblx0XHRcdFx0XHRpICs9IHRva2VuLmxlbmd0aDtcblxuXHRcdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVBVCBSRU1BSU5JTkcgQ0hBUkFDVEVSRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR3b3JkICs9IGM7XG5cblx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZygxKTtcblx0XHRcdGkgKz0gMTtcblxuLypcdFx0XHRjb250aW51ZSBfX2wwO1xuICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdGlmKHdvcmQpXG5cdFx0e1xuXHRcdFx0aWYoZXJyb3IpXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdpbnZhbGlkIHRva2VuIGAnICsgd29yZCArICdgJztcblx0XHRcdH1cblxuXHRcdFx0cmVzdWx0X3Rva2Vucy5wdXNoKHdvcmQpO1xuXHRcdFx0cmVzdWx0X3R5cGVzLnB1c2goLTEpO1xuXHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG4vKlx0XHRcdHdvcmQgPSAnJztcbiAqL1x0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9rZW5zOiByZXN1bHRfdG9rZW5zLFxuXHRcdFx0dHlwZXM6IHJlc3VsdF90eXBlcyxcblx0XHRcdGxpbmVzOiByZXN1bHRfbGluZXMsXG5cdFx0fTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X21hdGNoOiBmdW5jdGlvbihzLCBzdHJpbmdPclJlZ0V4cClcblx0e1xuXHRcdGxldCBtO1xuXG5cdFx0aWYoc3RyaW5nT3JSZWdFeHAgaW5zdGFuY2VvZiBSZWdFeHApXG5cdFx0e1xuXHRcdFx0bSA9IHMubWF0Y2goc3RyaW5nT3JSZWdFeHApO1xuXG5cdFx0XHRyZXR1cm4gbSAhPT0gbnVsbCAmJiB0aGlzLl9jaGVja05leHRDaGFyKHMsIC8qLSovbVswXS8qLSovKSA/IC8qLSovbVswXS8qLSovIDogbnVsbDtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdG0gPSBzLmluZGV4T2Yoc3RyaW5nT3JSZWdFeHApO1xuXG5cdFx0XHRyZXR1cm4gbSA9PT0gMHgwMCAmJiB0aGlzLl9jaGVja05leHRDaGFyKHMsIHN0cmluZ09yUmVnRXhwKSA/IHN0cmluZ09yUmVnRXhwIDogbnVsbDtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9hbG51bTogW1xuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSxcblx0XHQxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAxLFxuXHRcdDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsXG5cdFx0MSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdF0sXG5cblx0X2NoZWNrTmV4dENoYXI6IGZ1bmN0aW9uKHMsIHRva2VuKVxuXHR7XG5cdFx0Y29uc3QgbGVuZ3RoID0gdG9rZW4ubGVuZ3RoO1xuXG5cdFx0Y29uc3QgY2hhckNvZGUyID0gcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDApO1xuXHRcdGNvbnN0IGNoYXJDb2RlMSA9IHMuY2hhckNvZGVBdChsZW5ndGggLSAxKTtcblxuXHRcdHJldHVybiBpc05hTihjaGFyQ29kZTIpXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHRoaXMuX2FsbnVtW2NoYXJDb2RlMl0gPT09IDBcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdGhpcy5fYWxudW1bY2hhckNvZGUxXSA9PT0gMFxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByID0ge307XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIudG9rZW5zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLnRva2VucyA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBDT01QT1NJVEUgVE9LRU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuSVNfWFhYID0gW1xuXHRcdFx0dGhpcy5ERUZJTkVELFxuXHRcdFx0dGhpcy5OVUxMLFxuXHRcdFx0dGhpcy5FTVBUWSxcblx0XHRcdHRoaXMuSVRFUkFCTEUsXG5cdFx0XHR0aGlzLkVWRU4sXG5cdFx0XHR0aGlzLk9ERCxcblx0XHRdO1xuXG5cdFx0dGhpcy5YWFhfV0lUSCA9IFtcblx0XHRcdHRoaXMuU1RBUlRTX1dJVEgsXG5cdFx0XHR0aGlzLkVORFNfV0lUSCxcblx0XHRdO1xuXG5cdFx0dGhpcy5QTFVTX01JTlVTID0gW1xuXHRcdFx0dGhpcy5DT05DQVQsXG5cdFx0XHR0aGlzLlBMVVMsXG5cdFx0XHR0aGlzLk1JTlVTLFxuXHRcdF07XG5cblx0XHR0aGlzLk1VTF9GTERJVl9ESVZfTU9EID0gW1xuXHRcdFx0dGhpcy5NVUwsXG5cdFx0XHR0aGlzLkZMRElWLFxuXHRcdFx0dGhpcy5ESVYsXG5cdFx0XHR0aGlzLk1PRCxcblx0XHRdO1xuXG5cdFx0dGhpcy5SWCA9IFtcblx0XHRcdHRoaXMuUlAsXG5cdFx0XHR0aGlzLlJCMSxcblx0XHRdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBSRUFMIFRPS0VOUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRMT0dJQ0FMX09SOiAxMDAsXG5cdExPR0lDQUxfQU5EOiAxMDEsXG5cdEJJVFdJU0VfT1I6IDEwMixcblx0QklUV0lTRV9YT1I6IDEwMyxcblx0QklUV0lTRV9BTkQ6IDEwNCxcblx0Tk9UOiAxMDUsXG5cdElTOiAxMDYsXG5cdERFRklORUQ6IDEwNyxcblx0TlVMTDogMTA4LFxuXHRFTVBUWTogMTA5LFxuXHRJVEVSQUJMRTogMTEwLFxuXHRFVkVOOiAxMTEsXG5cdE9ERDogMTEyLFxuXHRDTVBfT1A6IDExMyxcblx0U1RBUlRTX1dJVEg6IDExNCxcblx0RU5EU19XSVRIOiAxMTUsXG5cdE1BVENIRVM6IDExNixcblx0SU46IDExNyxcblx0UkFOR0U6IDExOCxcblx0Q09OQ0FUOiAxMTksXG5cdFBMVVM6IDEyMCxcblx0TUlOVVM6IDEyMSxcblx0UE9XRVI6IDEyMixcblx0TVVMOiAxMjMsXG5cdEZMRElWOiAxMjQsXG5cdERJVjogMTI1LFxuXHRNT0Q6IDEyNixcblx0Q09MT046IDEyNyxcblx0RE9UOiAxMjgsXG5cdENPTU1BOiAxMjksXG5cdFBJUEU6IDEzMCxcblx0TFA6IDEzMSxcblx0UlA6IDEzMixcblx0TEIxOiAxMzMsXG5cdFJCMTogMTM0LFxuXHRMQjI6IDEzNSxcblx0UkIyOiAxMzYsXG5cdFNJRDogMTM3LFxuXHRURVJNSU5BTDogMTM4LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVklSVFVBTCBUT0tFTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0TFNUOiAyMDAsXG5cdERJQzogMjAxLFxuXHRGVU46IDIwMixcblx0VkFSOiAyMDMsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLnRva2Vucy4kaW5pdCgpO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLlRva2VuaXplciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ub2tlbml6ZXIgPSBmdW5jdGlvbihjb2RlLCBsaW5lKSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLl9zcGFjZXMgPSBbJyAnLCAnXFx0JywgJ1xcbicsICdcXHInXTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fdG9rZW5EZWZzID0gW1xuXHRcdCdvcicsXG5cdFx0J2FuZCcsXG5cdFx0J2Itb3InLFxuXHRcdCdiLXhvcicsXG5cdFx0J2ItYW5kJyxcblx0XHQnbm90Jyxcblx0XHQnaXMnLFxuXHRcdCdkZWZpbmVkJyxcblx0XHQnbnVsbCcsXG5cdFx0J2VtcHR5Jyxcblx0XHQnaXRlcmFibGUnLFxuXHRcdCdldmVuJyxcblx0XHQnb2RkJyxcblx0XHQnPT09Jyxcblx0XHQnPT0nLFxuXHRcdCchPT0nLFxuXHRcdCchPScsXG5cdFx0Jzw9Jyxcblx0XHQnPj0nLFxuXHRcdCc8Jyxcblx0XHQnPicsXG5cdFx0L15zdGFydHNcXHMrd2l0aC8sXG5cdFx0L15lbmRzXFxzK3dpdGgvLFxuXHRcdCdtYXRjaGVzJyxcblx0XHQnaW4nLFxuXHRcdCcuLicsXG5cdFx0J34nLFxuXHRcdCcrJyxcblx0XHQnLScsXG5cdFx0JyoqJyxcblx0XHQnKicsXG5cdFx0Jy8vJyxcblx0XHQnLycsXG5cdFx0JyUnLFxuXHRcdCc6Jyxcblx0XHQnLicsXG5cdFx0JywnLFxuXHRcdCd8Jyxcblx0XHQnKCcsXG5cdFx0JyknLFxuXHRcdCdbJyxcblx0XHQnXScsXG5cdFx0J3snLFxuXHRcdCd9Jyxcblx0XHQndHJ1ZScsXG5cdFx0J2ZhbHNlJyxcblx0XHQvXlswLTldK1xcLlswLTldKy8sXG5cdFx0L15bMC05XSsvLFxuXHRcdC9eJyhcXFxcJ3xbXiddKSonLyxcblx0XHQvXlwiKFxcXFxcInxbXlwiXSkqXCIvLFxuXHRcdC9eW2EtekEtWl8kXVthLXpBLVowLTlfJF0qLyxcblx0XTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fdG9rZW5UeXBlcyA9IFtcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX1hPUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5ELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTk9ULFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ERUZJTkVELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTlVMTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkVNUFRZLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSVRFUkFCTEUsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FVkVOLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuT0RELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuU1RBUlRTX1dJVEgsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FTkRTX1dJVEgsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NQVRDSEVTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSU4sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQU5HRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTkNBVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NSU5VUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBPV0VSLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTVVMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRkxESVYsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ESVYsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NT0QsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DT0xPTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUElQRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxQLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUlAsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MQjEsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQjEsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MQjIsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQjIsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5TSUQsXG5cdF07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuJGluaXQgPSBmdW5jdGlvbihjb2RlLCBsaW5lKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCByZXN1bHQgPSBhbWlUd2lnLnRva2VuaXplci50b2tlbml6ZShcblx0XHRcdGNvZGUsXG5cdFx0XHRsaW5lLFxuXHRcdFx0dGhpcy5fc3BhY2VzLFxuXHRcdFx0dGhpcy5fdG9rZW5EZWZzLFxuXHRcdFx0dGhpcy5fdG9rZW5UeXBlcyxcblx0XHRcdHRydWVcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnRva2VucyA9IHJlc3VsdC50b2tlbnM7XG5cdFx0dGhpcy50eXBlcyA9IHJlc3VsdC50eXBlcztcblxuXHRcdHRoaXMuaSA9IDA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5uZXh0ID0gZnVuY3Rpb24obiA9IDEpXG5cdHtcblx0XHR0aGlzLmkgKz0gbjtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5pc0VtcHR5ID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaSA+PSB0aGlzLnRva2Vucy5sZW5ndGg7XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMucGVla1Rva2VuID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudG9rZW5zW3RoaXMuaV07XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMucGVla1R5cGUgPSBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50eXBlc1t0aGlzLmldO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLmNoZWNrVHlwZSA9IGZ1bmN0aW9uKHR5cGUpXG5cdHtcblx0XHRpZih0aGlzLmkgPCB0aGlzLnRva2Vucy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0Y29uc3QgVFlQRSA9IHRoaXMudHlwZXNbdGhpcy5pXTtcblxuXHRcdFx0cmV0dXJuICh0eXBlIGluc3RhbmNlb2YgQXJyYXkpID8gKHR5cGUuaW5kZXhPZihUWVBFKSA+PSAwKSA6ICh0eXBlID09PSBUWVBFKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuJGluaXQoY29kZSwgbGluZSk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5Db21waWxlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuQ29tcGlsZXIgPSBmdW5jdGlvbihjb2RlLCBsaW5lKSB7XG5cblx0dGhpcy4kaW5pdChjb2RlLCBsaW5lKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Db21waWxlci5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24oY29kZSwgbGluZSlcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy50b2tlbml6ZXIgPSBuZXcgYW1pVHdpZy5leHByLlRva2VuaXplcihcblx0XHRcdHRoaXMuY29kZSA9IGNvZGUsXG5cdFx0XHR0aGlzLmxpbmUgPSBsaW5lXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5yb290Tm9kZSA9IHRoaXMucGFyc2VGaWx0ZXIoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuaXNFbXB0eSgpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIHVuZXhwZWN0ZWQgdG9rZW4gYCcgKyB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSArICdgJztcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZHVtcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucm9vdE5vZGUuZHVtcCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUZpbHRlcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTG9naWNhbE9yKCksIG5vZGUsIHRlbXA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBGaWx0ZXIgOiBMb2dpY2FsT3IgKCd8JyBEb3QxKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBJUEUpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0bm9kZSA9IHRoaXMucGFyc2VEb3QxKHRydWUpO1xuXG5cdFx0XHRmb3IodGVtcCA9IG5vZGU7IHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuRE9UOyB0ZW1wID0gdGVtcC5ub2RlTGVmdCk7XG5cblx0XHRcdHRlbXAubGlzdC51bnNoaWZ0KGxlZnQpO1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUxvZ2ljYWxPcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTG9naWNhbEFuZCgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIExvZ2ljYWxPciA6IExvZ2ljYWxBbmQgKCdvcicgTG9naWNhbEFuZCkqICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUxvZ2ljYWxBbmQoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUxvZ2ljYWxBbmQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VPcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIExvZ2ljYWxBbmQgOiBCaXR3aXNlT3IgKCdhbmQnIEJpdHdpc2VPcikqICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9BTkQpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VCaXR3aXNlT3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VPcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQml0d2lzZVhvcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEJpdHdpc2VPciA6IEJpdHdpc2VYb3IgKCdiLW9yJyBCaXR3aXNlWG9yKSogICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUJpdHdpc2VYb3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VYb3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VBbmQoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBCaXR3aXNlWG9yIDogQml0d2lzZUFuZCAoJ2IteG9yJyBCaXR3aXNlQW5kKSogICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfWE9SKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQml0d2lzZUFuZCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQml0d2lzZUFuZDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTm90KCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQml0d2lzZUFuZCA6IE5vdCAoJ2ItYW5kJyBOb3QpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX0FORCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZU5vdCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTm90OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBOb3QgOiAnbm90JyBDb21wICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUNvbXAoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IG51bGw7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgfCBDb21wICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiB0aGlzLnBhcnNlQ29tcCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUNvbXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUFkZFN1YigpLCByaWdodCwgbm9kZSwgc3dhcDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIENvbXAgOiBBZGRTdWIgJ2lzJyAnbm90Jz8gKCdkZWZpbmVkJyB8ICdudWxsJyB8IC4uLikgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0LyoqLyBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdC8qIHN3YXAgJ2lzJyBhbmQgJ25vdCcgKi9cblx0XHRcdHN3YXAgPSBub2RlO1xuXHRcdFx0Lyogc3dhcCAnaXMnIGFuZCAnbm90JyAqL1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5OT1QpKVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUubm9kZUxlZnQgPSBudWxsO1xuXHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHN3YXA7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLklTX1hYWCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJpZ2h0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdHN3YXAubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0XHRzd2FwLm5vZGVSaWdodCA9IHJpZ2h0O1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGtleXdvcmQgYGRlZmluZWRgLCBgbnVsbGAsIGBlbXB0eWAsIGBpdGVyYWJsZWAsIGBldmVuYCBvciBgb2RkYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgKCc9PT0nIHwgJz09JyB8IC4uLikgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1ApKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICgnc3RhcnRzJyB8ICdlbmRzJykgYHdpdGhgIEFkZFN1YiAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuWFhYX1dJVEgpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICdtYXRjaGVzJyBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgJ2luJyBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JTikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQWRkU3ViOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VNdWxEaXYoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBBZGRTdWIgOiBNdWxEaXYgKCgnKycgfCAnLScpIE11bERpdikqICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVNfTUlOVVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VNdWxEaXYoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU11bERpdjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlUGx1c01pbnVzKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTXVsRGl2IDogUGx1c01pbnVzICgoJyonIHwgJy8vJyB8ICcvJyB8ICclJykgUGx1c01pbnVzKSogICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5NVUxfRkxESVZfRElWX01PRCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZVBsdXNNaW51cygpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlUGx1c01pbnVzOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBQbHVzTWludXMgOiAoJy0nIHwgJysnKSBQb3dlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVNfTUlOVVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VQb3dlcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgICAgICB8IERvdDEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHRoaXMucGFyc2VQb3dlcigpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVBvd2VyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VEb3QxKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogUG93ZXIgOiBEb3QxICgnKionIERvdDEpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QT1dFUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZURvdDEoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDE6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0Y29uc3Qgbm9kZSA9IHRoaXMucGFyc2VEb3QyKGlzRmlsdGVyKTtcblxuXHRcdGlmKG5vZGUpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGV0IHRlbXAgPSBub2RlO1xuXG5cdFx0XHRmb3IoOyB0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDsgdGVtcCA9IHRlbXAubm9kZUxlZnQpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0ZW1wLnEpXG5cdFx0XHR7XG5cdFx0XHRcdC8qKi8gaWYodGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5GVU4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZih0ZW1wLm5vZGVWYWx1ZSBpbiBhbWlUd2lnLnN0ZGxpYilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9ICdhbWlUd2lnLnN0ZGxpYi4nICsgdGVtcC5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9IC8qLS0tKi8nXy4nLyotLS0qLyArIHRlbXAubm9kZVZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuVkFSKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAvKi0tLSovJ18uJy8qLS0tKi8gKyB0ZW1wLm5vZGVWYWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRlbXAucSA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdHJldHVybiBub2RlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDI6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlRG90Myhpc0ZpbHRlciksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogRG90MiA6IERvdDMgKCcuJyBEb3QzKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5ET1QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgJy4nKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlRG90Myhpc0ZpbHRlcik7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VEb3QzOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZVgoaXNGaWx0ZXIpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIHBhcnNlRG90MyA6IFggKCdbJyBGaWx0ZXIgJ10nKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIxKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUZpbHRlcigpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjEpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCwgJ1tdJyk7XG5cblx0XHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYF1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgICAgIHwgWCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVg6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBYIDogR3JvdXAgfCBBcnJheSB8IE9iamVjdCB8IEZ1blZhciB8IFRlcm1pbmFsICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZUdyb3VwKCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VBcnJheSgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlT2JqZWN0KCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VGdW5WYXIoaXNGaWx0ZXIpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlVGVybWluYWwoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFNZTlRBWCBFUlJPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBzeW50YXggZXJyb3Igb3IgdHVuY2F0ZWQgZXhwcmVzc2lvbic7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VHcm91cDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBHcm91cCA6ICcoJyBGaWx0ZXIgJyknICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxQKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdG5vZGUgPSB0aGlzLnBhcnNlRmlsdGVyKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJQKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGApYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VBcnJheTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGUsIGxpc3Q7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBBcnJheSA6ICdbJyBTaW5nbGV0cyAnXScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxCMSkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRsaXN0ID0gdGhpcy5fcGFyc2VTaW5nbGV0cygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjEpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkxTVCwgJ0FycmF5Jyk7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gbGlzdDtcblxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgXWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlT2JqZWN0OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbm9kZSwgZGljdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE9iamVjdCA6ICd7JyBEb3VibGV0cyAnfScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIyKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGRpY3QgPSB0aGlzLl9wYXJzZURvdWJsZXRzKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMikpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKGFtaVR3aWcuZXhwci50b2tlbnMuRElDLCAnT2JqZWN0Jyk7XG5cblx0XHRcdFx0bm9kZS5kaWN0ID0gZGljdDtcblxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgfWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRnVuVmFyOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuU0lEKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKDAsIGlzRmlsdGVyID8gJ2ZpbHRlcl8nICsgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkgOiB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cblx0XHRcdG5vZGUucSA9IHRydWU7XG5cblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZ1blZhciA6IFNJRCAnKCcgU2luZ2xldHMgJyknICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQvKiovIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxQKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUubGlzdCA9IHRoaXMuX3BhcnNlU2luZ2xldHMoKTtcblxuXHRcdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SUCkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0XHRub2RlLm5vZGVUeXBlID0gYW1pVHdpZy5leHByLnRva2Vucy5GVU47XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgKWAgZXhwZWN0ZWQnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiAgICAgICAgfCBTSUQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlLm5vZGVUeXBlID0gaXNGaWx0ZXIgPyBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTlxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgOiBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUlxuXHRcdFx0XHQ7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gW107XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VTaW5nbGV0czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SWCkgPT09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHRoaXMuX3BhcnNlU2luZ2xldChyZXN1bHQpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DT01NQSkgPT09IHRydWUpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlRG91YmxldHM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IHt9O1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIyKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0dGhpcy5fcGFyc2VEb3VibGV0KHJlc3VsdCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BKSA9PT0gdHJ1ZSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VTaW5nbGV0OiBmdW5jdGlvbihyZXN1bHQpXG5cdHtcblx0XHRyZXN1bHQucHVzaCh0aGlzLnBhcnNlRmlsdGVyKCkpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VEb3VibGV0OiBmdW5jdGlvbihyZXN1bHQpXG5cdHtcblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCkpXG5cdFx0e1xuXHRcdFx0Y29uc3Qga2V5ID0gdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTE9OKSlcblx0XHRcdHtcbi8qXHRcdFx0XHRjb25zdCBjb2xvbiA9IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpO1xuICovXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdFtrZXldID0gdGhpcy5wYXJzZUZpbHRlcigpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgOmAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCB0ZXJtaW5hbCBleHBlY3RlZCc7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVRlcm1pbmFsOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBUZXJtaW5hbCA6IFRFUk1JTkFMIHwgUkFOR0UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMKSlcblx0XHR7XG5cdFx0XHRsZWZ0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UpKVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJpZ2h0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIGxlZnQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLk5vZGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ob2RlID0gZnVuY3Rpb24obm9kZVR5cGUsIG5vZGVWYWx1ZSkge1xuXG5cdHRoaXMuJGluaXQobm9kZVR5cGUsIG5vZGVWYWx1ZSk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuTm9kZS5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24obm9kZVR5cGUsIG5vZGVWYWx1ZSlcblx0e1xuXHRcdHRoaXMubm9kZVR5cGUgPSBub2RlVHlwZTtcblx0XHR0aGlzLm5vZGVWYWx1ZSA9IG5vZGVWYWx1ZTtcblx0XHR0aGlzLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHR0aGlzLm5vZGVSaWdodCA9IG51bGw7XG5cdFx0dGhpcy5saXN0ID0gbnVsbDtcblx0XHR0aGlzLmRpY3QgPSBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZHVtcDogZnVuY3Rpb24obm9kZXMsIGVkZ2VzLCBwQ250KVxuXHR7XG5cdFx0bGV0IENOVDtcblxuXHRcdGNvbnN0IGNudCA9IHBDbnRbMF07XG5cblx0XHRub2Rlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgW2xhYmVsPVwiJyArIHRoaXMubm9kZVZhbHVlLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICdcIl07Jyk7XG5cblx0XHRpZih0aGlzLm5vZGVMZWZ0KVxuXHRcdHtcblx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICc7Jyk7XG5cdFx0XHR0aGlzLm5vZGVMZWZ0Ll9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5ub2RlUmlnaHQpXG5cdFx0e1xuXHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJzsnKTtcblx0XHRcdHRoaXMubm9kZVJpZ2h0Ll9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5saXN0KVxuXHRcdHtcblx0XHRcdGZvcihjb25zdCBpIGluIHRoaXMubGlzdClcblx0XHRcdHtcblx0XHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnIFtsYWJlbD1cIlsnICsgaS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXVwiXTsnKTtcblx0XHRcdFx0dGhpcy5saXN0W2ldLl9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5kaWN0KVxuXHRcdHtcblx0XHRcdGZvcihjb25zdCBpIGluIHRoaXMuZGljdClcblx0XHRcdHtcblx0XHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnIFtsYWJlbD1cIlsnICsgaS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXVwiXTsnKTtcblx0XHRcdFx0dGhpcy5kaWN0W2ldLl9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCBub2RlcyA9IFtdO1xuXHRcdGNvbnN0IGVkZ2VzID0gW107XG5cblx0XHR0aGlzLl9kdW1wKG5vZGVzLCBlZGdlcywgWzBdKTtcblxuXHRcdHJldHVybiAnZGlncmFwaCBhc3Qge1xcblxcdHJhbmtkaXI9VEI7XFxuJyArIG5vZGVzLmpvaW4oJ1xcbicpICsgJ1xcbicgKyBlZGdlcy5qb2luKCdcXG4nKSArICdcXG59Jztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRtcGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsID0ge307XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRtcGwuQ29tcGlsZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsLkNvbXBpbGVyID0gZnVuY3Rpb24odG1wbCkge1xuXG5cdHRoaXMuJGluaXQodG1wbCk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRtcGwuQ29tcGlsZXIucHJvdG90eXBlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0U1RBVEVNRU5UX1JFOiAvXFx7JVxccyooW2EtekEtWl0rKVxccyooKD86LnxcXG4pKj8pXFxzKiVcXH0vLFxuXG5cdENPTU1FTlRfUkU6IC9cXHsjXFxzKigoPzoufFxcbikqPylcXHMqI1xcfS9nLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfY291bnQ6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRsZXQgcmVzdWx0ID0gMDtcblxuXHRcdGNvbnN0IGwgPSBzLmxlbmd0aDtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpKyspXG5cdFx0e1xuXHRcdFx0aWYoc1tpXSA9PT0gJ1xcbicpIHJlc3VsdCsrO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbih0bXBsKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgbGluZSA9IDE7XG5cblx0XHRsZXQgY29sdW1uO1xuXHRcdGxldCBDT0xVTU47XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMucm9vdE5vZGUgPSB7XG5cdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0a2V5d29yZDogJ0Byb290Jyxcblx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0YmxvY2tzOiBbe1xuXHRcdFx0XHRleHByZXNzaW9uOiAnQHRydWUnLFxuXHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdH1dLFxuXHRcdFx0dmFsdWU6ICcnLFxuXHRcdH07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHN0YWNrMSA9IFt0aGlzLnJvb3ROb2RlXTtcblx0XHRjb25zdCBzdGFjazIgPSBbMHgwMDAwMDAwMDAwMF07XG5cblx0XHRsZXQgaXRlbTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Zm9yKHRtcGwgPSB0bXBsLnJlcGxhY2UodGhpcy5DT01NRU5UX1JFLCAnJyk7OyB0bXBsID0gdG1wbC5zdWJzdHIoQ09MVU1OKSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBjdXJyID0gc3RhY2sxW3N0YWNrMS5sZW5ndGggLSAxXTtcblx0XHRcdCBsZXQgIGluZHggPSBzdGFjazJbc3RhY2syLmxlbmd0aCAtIDFdO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBtID0gdG1wbC5tYXRjaCh0aGlzLlNUQVRFTUVOVF9SRSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKG0gPT09IG51bGwpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsaW5lICs9IHRoaXMuX2NvdW50KHRtcGwpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjdXJyLmJsb2Nrc1tpbmR4XS5saXN0LnB1c2goe1xuXHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0a2V5d29yZDogJ0B0ZXh0Jyxcblx0XHRcdFx0XHRleHByZXNzaW9uOiAnJyxcblx0XHRcdFx0XHRibG9ja3M6IFtdLFxuXHRcdFx0XHRcdHZhbHVlOiB0bXBsLFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgZXJyb3JzID0gW107XG5cblx0XHRcdFx0Zm9yKGxldCBpID0gc3RhY2sxLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvKiovIGlmKHN0YWNrMVtpXS5rZXl3b3JkID09PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGVycm9ycy5wdXNoKCdtaXNzaW5nIGtleXdvcmQgYGVuZGlmYCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmKHN0YWNrMVtpXS5rZXl3b3JkID09PSAnZm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0IFx0ZXJyb3JzLnB1c2goJ21pc3Npbmcga2V5d29yZCBgZW5kZm9yYCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGVycm9ycy5sZW5ndGggPiAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgJyArIGVycm9ycy5qb2luKCcsICcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBtYXRjaCA9IG1bMF07XG5cdFx0XHRjb25zdCBrZXl3b3JkID0gbVsxXTtcblx0XHRcdGNvbnN0IGV4cHJlc3Npb24gPSBtWzJdO1xuXG5cdFx0XHRjb2x1bW4gPSBtLmluZGV4ICsgMHgwMDAwMDAwMDAwO1xuXHRcdFx0Q09MVU1OID0gbS5pbmRleCArIG1hdGNoLmxlbmd0aDtcblxuXHRcdFx0Y29uc3QgdmFsdWUgPSB0bXBsLnN1YnN0cigwLCBjb2x1bW4pO1xuXHRcdFx0Y29uc3QgVkFMVUUgPSB0bXBsLnN1YnN0cigwLCBDT0xVTU4pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsaW5lICs9IHRoaXMuX2NvdW50KFZBTFVFKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodmFsdWUpXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRrZXl3b3JkOiAnQHRleHQnLFxuXHRcdFx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRzd2l0Y2goa2V5d29yZClcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2ZsdXNoJzpcblx0XHRcdFx0Y2FzZSAnYXV0b2VzY2FwZSc6XG5cdFx0XHRcdGNhc2UgJ3NwYWNlbGVzcyc6XG5cdFx0XHRcdGNhc2UgJ3ZlcmJhdGltJzpcblxuXHRcdFx0XHRcdC8qIElHTk9SRSAqL1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2RvJzpcblx0XHRcdFx0Y2FzZSAnc2V0Jzpcblx0XHRcdFx0Y2FzZSAnaW5jbHVkZSc6XG5cblx0XHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRcdGtleXdvcmQ6IGtleXdvcmQsXG5cdFx0XHRcdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0XHRcdFx0YmxvY2tzOiBbXSxcblx0XHRcdFx0XHRcdHZhbHVlOiAnJyxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2lmJzpcblx0XHRcdFx0Y2FzZSAnZm9yJzpcblxuXHRcdFx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0XHRcdFx0a2V5d29yZDoga2V5d29yZCxcblx0XHRcdFx0XHRcdGJsb2NrczogW3tcblx0XHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogZXhwcmVzc2lvbixcblx0XHRcdFx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHRcdFx0XHR9XSxcblx0XHRcdFx0XHRcdHZhbHVlOiAnJyxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXG5cdFx0XHRcdFx0c3RhY2sxLnB1c2goaXRlbSk7XG5cdFx0XHRcdFx0c3RhY2syLnB1c2goMHgwMCk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZWxzZWlmJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVsc2VpZmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGluZHggPSBjdXJyLmJsb2Nrcy5sZW5ndGg7XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrcy5wdXNoKHtcblx0XHRcdFx0XHRcdGV4cHJlc3Npb246IGV4cHJlc3Npb24sXG5cdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHN0YWNrMltzdGFjazIubGVuZ3RoIC0gMV0gPSBpbmR4O1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2Vsc2UnOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZWxzZWAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGluZHggPSBjdXJyLmJsb2Nrcy5sZW5ndGg7XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrcy5wdXNoKHtcblx0XHRcdFx0XHRcdGV4cHJlc3Npb246ICdAdHJ1ZScsXG5cdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHN0YWNrMltzdGFjazIubGVuZ3RoIC0gMV0gPSBpbmR4O1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2VuZGlmJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVuZGlmYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c3RhY2sxLnBvcCgpO1xuXHRcdFx0XHRcdHN0YWNrMi5wb3AoKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbmRmb3InOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnZm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVuZGZvcmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHN0YWNrMS5wb3AoKTtcblx0XHRcdFx0XHRzdGFjazIucG9wKCk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVua25vd24ga2V5d29yZCBgJyArIGtleXdvcmQgKyAnYCc7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5yb290Tm9kZSwgbnVsbCwgMik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLypcbiAqIEFNSSBUd2lnIEVuZ2luZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE5IFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5lbmdpbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZW5naW5lID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0VkFSSUFCTEVfUkU6IC9cXHtcXHtcXHMqKC4qPylcXHMqXFx9XFx9L2csXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9yZW5kZXI6IGZ1bmN0aW9uKHJlc3VsdCwgaXRlbSwgZGljdCA9IHt9KVxuXHR7XG5cdFx0bGV0IG07XG5cblx0XHRsZXQgZXhwcmVzc2lvbjtcblxuXHRcdHRoaXMuZGljdCA9IGRpY3Q7XG5cblx0XHRzd2l0Y2goaXRlbS5rZXl3b3JkKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBETyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnZG8nOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YW1pVHdpZy5leHByLmNhY2hlLmV2YWwoaXRlbS5leHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNFVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdzZXQnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bSA9IGl0ZW0uZXhwcmVzc2lvbi5tYXRjaCgvKFthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMqPVxccyooLispLylcblxuXHRcdFx0XHRpZighbSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgaW52YWxpZCBgc2V0YCBzdGF0ZW1lbnQnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGRpY3RbbVsxXV0gPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChtWzJdLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEBURVhUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdAdGV4dCc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtLnZhbHVlLnJlcGxhY2UodGhpcy5WQVJJQUJMRV9SRSwgZnVuY3Rpb24obWF0Y2gsIGV4cHJlc3Npb24pIHtcblxuXHRcdFx0XHRcdGxldCB2YWx1ZSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDogJyc7XG5cdFx0XHRcdH0pKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJRiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnaWYnOlxuXHRcdFx0Y2FzZSAnQHJvb3QnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aXRlbS5ibG9ja3MuZXZlcnkoKGJsb2NrKSA9PiB7XG5cblx0XHRcdFx0XHRleHByZXNzaW9uID0gYmxvY2suZXhwcmVzc2lvbjtcblxuXHRcdFx0XHRcdGlmKGV4cHJlc3Npb24gPT09ICdAdHJ1ZScgfHwgYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRibG9jay5saXN0LmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBpdGVtLCBkaWN0KTtcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdmb3InOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bSA9IGl0ZW0uYmxvY2tzWzBdLmV4cHJlc3Npb24ubWF0Y2goLyhbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzK2luXFxzKyguKykvKVxuXG5cdFx0XHRcdGlmKCFtKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBpbnZhbGlkIGBmb3JgIHN0YXRlbWVudCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3Qgc3ltYiA9IG1bMV07XG5cdFx0XHRcdGNvbnN0IGV4cHIgPSBtWzJdO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgdmFsdWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG5cblx0XHRcdFx0aWYodHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dmFsdWUgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYodHlwZU5hbWUgIT09ICdbb2JqZWN0IEFycmF5XSdcblx0XHRcdFx0XHQgICAmJlxuXHRcdFx0XHRcdCAgIHR5cGVOYW1lICE9PSAnW29iamVjdCBTdHJpbmddJ1xuXHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgcmlnaHQgb3BlcmFuZGUgbm90IGl0ZXJhYmxlJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3Qgb2xkMSA9IGRpY3RbKHN5bWIpXTtcblx0XHRcdFx0Y29uc3Qgb2xkMiA9IGRpY3RbJ2xvb3AnXTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IGsgPSAweDAwMDAwMDAwMDA7XG5cdFx0XHRcdGNvbnN0IGwgPSB2YWx1ZS5sZW5ndGg7XG5cblx0XHRcdFx0ZGljdC5sb29wID0ge2xlbmd0aDogbH07XG5cblx0XHRcdFx0Y29uc3QgbGlzdCA9IGl0ZW0uYmxvY2tzWzBdLmxpc3Q7XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gdmFsdWUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRkaWN0W3N5bWJdID0gdmFsdWVbaV07XG5cblx0XHRcdFx0XHRkaWN0Lmxvb3AuZmlyc3QgPSAoayA9PT0gKDAgLSAwKSk7XG5cdFx0XHRcdFx0ZGljdC5sb29wLmxhc3QgPSAoayA9PT0gKGwgLSAxKSk7XG5cblx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXgwID0gaztcblx0XHRcdFx0XHRrKys7XG5cdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4ID0gaztcblxuXHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGxpc3QpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbGlzdFtqXSwgZGljdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGRpY3RbJ2xvb3AnXSA9IG9sZDI7XG5cdFx0XHRcdGRpY3RbKHN5bWIpXSA9IG9sZDE7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSU5DTFVERSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2luY2x1ZGUnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IG1fMV8gPSBpdGVtLmV4cHJlc3Npb24sIHdpdGhfc3ViZXhwciwgd2l0aF9jb250ZXh0O1xuXG5cdFx0XHRcdC8qKi8gaWYoKG0gPSBtXzFfLm1hdGNoKC8oLispXFxzK3dpdGhcXHMrKC4rKVxccytvbmx5JC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9IG1bMl07XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZigobSA9IG1fMV8ubWF0Y2goLyguKylcXHMrd2l0aFxccysoLispJC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9IG1bMl07XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKChtID0gbV8xXy5tYXRjaCgvKC4rKVxccytvbmx5JC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9ICd7fSc7XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IG1fMV87XG5cdFx0XHRcdFx0d2l0aF9zdWJleHByID0gJ3t9Jztcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGZpbGVOYW1lID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KSB8fCAnJztcblxuXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZmlsZU5hbWUpICE9PSAnW29iamVjdCBTdHJpbmddJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIHN0cmluZyBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgdmFyaWFibGVzID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwod2l0aF9zdWJleHByLCBpdGVtLmxpbmUsIGRpY3QpIHx8IHt9O1xuXG5cdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YXJpYWJsZXMpICE9PSAnW29iamVjdCBPYmplY3RdJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIG9iamVjdCBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmVzdWx0LnB1c2goYW1pVHdpZy5zdGRsaWIuaW5jbHVkZShcblx0XHRcdFx0XHRmaWxlTmFtZSxcblx0XHRcdFx0XHR2YXJpYWJsZXMsXG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0LFxuXHRcdFx0XHRcdGZhbHNlXG5cdFx0XHRcdCkpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVuZGVyOiBmdW5jdGlvbih0bXBsLCBkaWN0ID0ge30pXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdHN3aXRjaChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodG1wbCkpXG5cdFx0e1xuXHRcdFx0Y2FzZSAnW29iamVjdCBTdHJpbmddJzpcblx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbmV3IGFtaVR3aWcudG1wbC5Db21waWxlcih0bXBsKS5yb290Tm9kZSwgZGljdCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdbb2JqZWN0IE9iamVjdF0nOlxuXHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCAvKi0tLS0tLS0tLS0tLS0tKi90bXBsLyotLS0tLS0tLS0tLS0tLSovLCBkaWN0KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuY2FjaGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLmNhY2hlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZGljdDoge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGV2YWw6IGZ1bmN0aW9uKGV4cHJlc3Npb24sIGxpbmUsIF8pXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBmO1xuXG5cdFx0aWYoZXhwcmVzc2lvbiBpbiB0aGlzLmRpY3QpXG5cdFx0e1xuXHRcdFx0ZiA9IHRoaXMuZGljdFtleHByZXNzaW9uXTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGYgPSB0aGlzLmRpY3RbZXhwcmVzc2lvbl0gPSBldmFsKFxuXHRcdFx0XHRhbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIuZ2V0SlMoXG5cdFx0XHRcdFx0bmV3IGFtaVR3aWcuZXhwci5Db21waWxlcihleHByZXNzaW9uLCBsaW5lKVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIV8pIF8gPSB7fTtcblxuXHRcdHJldHVybiBmLmNhbGwoXywgXyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmRhdGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyogVE9ETyAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmFqYXggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5hamF4ID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZGljdDoge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldDogZnVuY3Rpb24odXJsLCBkb25lLCBmYWlsKVxuXHR7XG5cdFx0bGV0IHR4dDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodXJsIGluIHRoaXMuZGljdClcblx0XHR7XG5cdFx0XHRpZihkb25lKVxuXHRcdFx0e1xuXHRcdFx0XHRkb25lKHRoaXMuZGljdFt1cmxdKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoYW1pVHdpZy5mcylcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogTk9ERUpTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHR0eHQgPSB0aGlzLmRpY3RbdXJsXSA9IGFtaVR3aWcuZnMucmVhZEZpbGVTeW5jKHVybCwgJ3V0ZjgnKTtcblxuXHRcdFx0XHRpZihkb25lKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZG9uZSh0eHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjYXRjaChlcnIpXG5cdFx0XHR7XG5cdFx0XHRcdGlmKGZhaWwpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRmYWlsKGVycik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBCUk9XU0VSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgeG1sSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuXHRcdFx0eG1sSHR0cFJlcXVlc3Qub3BlbignR0VUJywgdXJsLCBmYWxzZSk7XG5cdFx0XHR4bWxIdHRwUmVxdWVzdC5zZW5kKCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHhtbEh0dHBSZXF1ZXN0LnN0YXR1cyA9PT0gMjAwKVxuXHRcdFx0e1xuXHRcdFx0XHR0eHQgPSB0aGlzLmRpY3RbdXJsXSA9IHhtbEh0dHBSZXF1ZXN0LnJlc3BvbnNlVGV4dDtcblxuXHRcdFx0XHRpZihkb25lKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZG9uZSh0eHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHR4dCA9IC8qKioqKioqKioqKioqKi8geG1sSHR0cFJlcXVlc3QucmVzcG9uc2VUZXh0O1xuXG5cdFx0XHRcdGlmKGZhaWwpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRmYWlsKHR4dCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnN0ZGxpYiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5zdGRsaWIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVkFSSUFCTEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzVW5kZWZpbmVkJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ID09PSB1bmRlZmluZWQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0RlZmluZWQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggIT09IHVuZGVmaW5lZDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTnVsbCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCA9PT0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTm90TnVsbCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCAhPT0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzRW1wdHknOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0aWYoeCA9PT0gbnVsbFxuXHRcdCAgIHx8XG5cdFx0ICAgeCA9PT0gZmFsc2Vcblx0XHQgICB8fFxuXHRcdCAgIHggPT09ICgoJycpKVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGNvbnN0IHR5cGVOYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuICh0eXBlTmFtZSA9PT0gJ1tvYmplY3QgQXJyYXldJyAmJiB4Lmxlbmd0aCA9PT0gMClcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgKHR5cGVOYW1lID09PSAnW29iamVjdCBPYmplY3RdJyAmJiBPYmplY3Qua2V5cyh4KS5sZW5ndGggPT09IDApXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNOdW1iZXInOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgTnVtYmVyXSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc1N0cmluZyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBTdHJpbmddJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzQXJyYXknOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzT2JqZWN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNJdGVyYWJsZSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KTtcblxuXHRcdHJldHVybiB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgU3RyaW5nXSdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdHlwZU5hbWUgPT09ICdbb2JqZWN0IEFycmF5XSdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNFdmVuJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzTnVtYmVyKHgpICYmICh4ICYgMSkgPT09IDA7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc09kZCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc051bWJlcih4KSAmJiAoeCAmIDEpID09PSAxO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSVRFUkFCTEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzSW5PYmplY3QnOiBmdW5jdGlvbih4LCB5KVxuXHR7XG5cdFx0aWYodGhpcy5pc0FycmF5KHkpXG5cdFx0ICAgfHxcblx0XHQgICB0aGlzLmlzU3RyaW5nKHkpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHkuaW5kZXhPZih4KSA+PSAwO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNPYmplY3QoeSkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHggaW4geTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0luUmFuZ2UnOiBmdW5jdGlvbih4LCB4MSwgeDIpXG5cdHtcblx0XHRpZih0aGlzLmlzTnVtYmVyKHgxKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc051bWJlcih4Milcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4gKC8qLS0tKi94LyotLS0qLyA+PSAvKi0tLSoveDEvKi0tLSovKVxuXHRcdFx0ICAgICAgICYmXG5cdFx0XHQgICAgICAgKC8qLS0tKi94LyotLS0qLyA8PSAvKi0tLSoveDIvKi0tLSovKVxuXHRcdFx0O1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNTdHJpbmcoeDEpICYmIHgxLmxlbmd0aCA9PT0gMVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyh4MikgJiYgeDIubGVuZ3RoID09PSAxXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuICh4LmNoYXJDb2RlQXQoMCkgPj0geDEuY2hhckNvZGVBdCgwKSlcblx0XHRcdCAgICAgICAmJlxuXHRcdFx0ICAgICAgICh4LmNoYXJDb2RlQXQoMCkgPD0geDIuY2hhckNvZGVBdCgwKSlcblx0XHRcdDtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdyYW5nZSc6IGZ1bmN0aW9uKHgxLCB4Miwgc3RlcCA9IDEpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdC8qKi8gaWYodGhpcy5pc051bWJlcih4MSlcblx0XHQgICAgICAgICYmXG5cdFx0ICAgICAgICB0aGlzLmlzTnVtYmVyKHgyKVxuXHRcdCApIHtcblx0XHRcdGZvcihsZXQgaSA9IC8qLS0tKi94MS8qLS0tKi87IGkgPD0gLyotLS0qL3gyLyotLS0qLzsgaSArPSBzdGVwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQucHVzaCgvKi0tLS0tLS0tLS0tLS0tLSovKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLmlzU3RyaW5nKHgxKSAmJiB4MS5sZW5ndGggPT09IDFcblx0XHQgICAgICAgICYmXG5cdFx0ICAgICAgICB0aGlzLmlzU3RyaW5nKHgyKSAmJiB4Mi5sZW5ndGggPT09IDFcblx0XHQgKSB7XG5cdFx0XHRmb3IobGV0IGkgPSB4MS5jaGFyQ29kZUF0KDApOyBpIDw9IHgyLmNoYXJDb2RlQXQoMCk7IGkgKz0gc3RlcClcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sZW5ndGgnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyh4KVxuXHRcdCAgIHx8XG5cdFx0ICAgdGhpcy5pc0FycmF5KHgpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHgubGVuZ3RoO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNPYmplY3QoeCkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIE9iamVjdC5rZXlzKHgpLmxlbmd0aDtcblx0XHR9XG5cblx0XHRyZXR1cm4gMDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9maXJzdCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMuaXNTdHJpbmcoeCkgfHwgdGhpcy5pc0FycmF5KHgpKSAmJiB4Lmxlbmd0aCA+IDAgPyB4WzB4MDAwMDAwMDAwMF0gOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sYXN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpICYmIHgubGVuZ3RoID4gMCA/IHhbeC5sZW5ndGggLSAxXSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NsaWNlJzogZnVuY3Rpb24oeCwgaWR4MSwgaWR4Milcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpID8geC5zbGljZShpZHgxLCBpZHgyKSA6IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbWVyZ2UnOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID4gMSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmlzU3RyaW5nKGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNTdHJpbmcoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0TC5wdXNoKGFyZ3VtZW50c1tpXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gTC5qb2luKCcnKTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNBcnJheShpdGVtKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBpdGVtKSBMLnB1c2goaXRlbVtqXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gTDtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBEID0ge307XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYXJndW1lbnRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzT2JqZWN0KGl0ZW0pKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGl0ZW0pIERbal0gPSBpdGVtW2pdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIEQ7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfc29ydCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5zb3J0KCkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yZXZlcnNlJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4LnJldmVyc2UoKSA6IFtdO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pvaW4nOiBmdW5jdGlvbih4LCBzZXApXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5qb2luKHNlcCkgOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9rZXlzJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzT2JqZWN0KHgpID8gT2JqZWN0LmtleXMoeCkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNUUklOR1MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdzdGFydHNXaXRoJzogZnVuY3Rpb24oczEsIHMyKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzMSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoczIpXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgYmFzZSA9IDB4MDAwMDAwMDAwMDAwMDAwMDAwMDtcblxuXHRcdFx0cmV0dXJuIHMxLmluZGV4T2YoczIsIGJhc2UpID09PSBiYXNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2VuZHNXaXRoJzogZnVuY3Rpb24oczEsIHMyKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzMSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoczIpXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgYmFzZSA9IHMxLmxlbmd0aCAtIHMyLmxlbmd0aDtcblxuXHRcdFx0cmV0dXJuIHMxLmluZGV4T2YoczIsIGJhc2UpID09PSBiYXNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21hdGNoJzogZnVuY3Rpb24ocywgcmVnZXgpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKCgocykpKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyhyZWdleClcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBpZHgxID0gcmVnZXguICBpbmRleE9mICAoJy8nKTtcblx0XHRcdGNvbnN0IGlkeDIgPSByZWdleC5sYXN0SW5kZXhPZignLycpO1xuXG5cdFx0XHRpZihpZHgxID09PSAwIHx8IGlkeDEgPCBpZHgyKVxuXHRcdFx0e1xuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4LnN1YnN0cmluZyhpZHgxICsgMSwgaWR4MiksIHJlZ2V4LnN1YnN0cmluZyhpZHgyICsgMSkpLnRlc3Qocyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2goZXJyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0LyogSUdOT1JFICovXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfZGVmYXVsdCc6IGZ1bmN0aW9uKHMxLCBzMilcblx0e1xuXHRcdHJldHVybiBzMSB8fCBzMiB8fCAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sb3dlcic6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudG9Mb3dlckNhc2UoKSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3VwcGVyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy50b1VwcGVyQ2FzZSgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfY2FwaXRhbGl6ZSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMpKVxuXHRcdHtcblx0XHRcdHJldHVybiBzLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL15cXFMvZywgZnVuY3Rpb24oYykge1xuXG5cdFx0XHRcdHJldHVybiBjLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdGl0bGUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gcy50cmltKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8oPzpefFxccylcXFMvZywgZnVuY3Rpb24oYykge1xuXG5cdFx0XHRcdHJldHVybiBjLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdHJpbSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudHJpbSgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J19yZXBsYWNlJzogZnVuY3Rpb24ocywgb2xkU3RycywgbmV3U3Rycylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0Y29uc3QgbCA9ICgoKHMpKSkubGVuZ3RoO1xuXHRcdGNvbnN0IG0gPSBvbGRTdHJzLmxlbmd0aDtcblx0XHRjb25zdCBuID0gbmV3U3Rycy5sZW5ndGg7XG5cblx0XHRpZihtICE9IG4pXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHR9XG5cbl9fbDA6XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpICs9IDApXG5cdFx0e1xuXHRcdFx0Y29uc3QgcCA9IHMuc3Vic3RyaW5nKGkpO1xuXG5cdFx0XHRmb3IobGV0IGogPSAwOyBqIDwgbTsgaiArPSAxKVxuXHRcdFx0e1xuXHRcdFx0XHRpZihwLmluZGV4T2Yob2xkU3Ryc1tqXSkgPT09IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChuZXdTdHJzW2pdKTtcblxuXHRcdFx0XHRcdGkgKz0gb2xkU3Ryc1tqXS5sZW5ndGg7XG5cblx0XHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdC5wdXNoKHMuY2hhckF0KGkrKykpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfdGV4dFRvSHRtbFgnOiBbJyYnICAgICwgJ1wiJyAgICAgLCAnPCcgICAsICc+JyAgIF0sXG5cdCdfdGV4dFRvSHRtbFknOiBbJyZhbXA7JywgJyZxdW90OycsICcmbHQ7JywgJyZndDsnXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J190ZXh0VG9TdHJpbmdYJzogWydcXFxcJyAgLCAnXFxuJyAsICdcIicgICwgJ1xcJycgIF0sXG5cdCdfdGV4dFRvU3RyaW5nWSc6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXFwiJywgJ1xcXFxcXCcnXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J190ZXh0VG9Kc29uU3RyaW5nWCc6IFsnXFxcXCcgICwgJ1xcbicgLCAnXCInICBdLFxuXHQnX3RleHRUb0pzb25TdHJpbmdZJzogWydcXFxcXFxcXCcsICdcXFxcbicsICdcXFxcXCInXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9lc2NhcGUnOiBmdW5jdGlvbihzLCBtb2RlKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRzd2l0Y2gobW9kZSB8fCAnaHRtbCcpXG5cdFx0XHR7XG5cdFx0XHRcdGNhc2UgJ2h0bWwnOlxuXHRcdFx0XHRjYXNlICdodG1sX2F0dHInOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb0h0bWxYLCB0aGlzLl90ZXh0VG9IdG1sWSk7XG5cblx0XHRcdFx0Y2FzZSAnanMnOlxuXHRcdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb1N0cmluZ1gsIHRoaXMuX3RleHRUb1N0cmluZ1kpO1xuXG5cdFx0XHRcdGNhc2UgJ2pzb24nOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb0pzb25TdHJpbmdYLCB0aGlzLl90ZXh0VG9Kc29uU3RyaW5nWSk7XG5cblx0XHRcdFx0Y2FzZSAndXJsJzpcblx0XHRcdFx0XHRyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHMpO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIHM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3VybF9lbmNvZGUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBlbmNvZGVVUklDb21wb25lbnQocylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX25sMmJyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy5yZXBsYWNlKC9cXG4vZywgJzxici8+Jylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3Jhdyc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHNcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3JlcGxhY2UnOiBmdW5jdGlvbihzLCBkaWN0KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgJiYgdGhpcy5pc09iamVjdChkaWN0KSA/IHRoaXMuX3JlcGxhY2UocywgT2JqZWN0LmtleXMoZGljdCksIE9iamVjdC52YWx1ZXMoZGljdCkpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NwbGl0JzogZnVuY3Rpb24ocywgc2VwLCBtYXgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMuc3BsaXQoc2VwLCBtYXgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiBbXVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIE5VTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfYWJzJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBNYXRoLmFicyh4KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yb3VuZCc6IGZ1bmN0aW9uKHgsIG1vZGUpXG5cdHtcblx0XHRzd2l0Y2gobW9kZSlcblx0XHR7XG5cdFx0XHRjYXNlICdjZWlsJzpcblx0XHRcdFx0cmV0dXJuIE1hdGguY2VpbCh4KTtcblxuXHRcdFx0Y2FzZSAnZmxvb3InOlxuXHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih4KTtcblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIE1hdGgucm91bmQoeCk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnbWluJzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBhcmdzID0gKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpICYmICh0aGlzLmlzQXJyYXkoYXJndW1lbnRzWzBdKSB8fCB0aGlzLmlzT2JqZWN0KGFyZ3VtZW50c1swXSkpID8gYXJndW1lbnRzWzBdXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFyZ3VtZW50c1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHJlc3VsdCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcblxuXHRcdGZvcihjb25zdCBpIGluIGFyZ3MpXG5cdFx0e1xuXHRcdFx0aWYoIXRoaXMuaXNOdW1iZXIoYXJnc1tpXSkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBOdW1iZXIuTmFOO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihyZXN1bHQgPiBhcmdzW2ldKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSBhcmdzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21heCc6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgYXJncyA9IChhcmd1bWVudHMubGVuZ3RoID09PSAxKSAmJiAodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkgfHwgdGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKSA/IGFyZ3VtZW50c1swXVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhcmd1bWVudHNcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCByZXN1bHQgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XG5cblx0XHRmb3IoY29uc3QgaSBpbiBhcmdzKVxuXHRcdHtcblx0XHRcdGlmKCF0aGlzLmlzTnVtYmVyKGFyZ3NbaV0pKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gTnVtYmVyLk5hTjtcblx0XHRcdH1cblxuXHRcdFx0aWYocmVzdWx0IDwgYXJnc1tpXSlcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0ID0gYXJnc1tpXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBSQU5ET00gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQncmFuZG9tJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGNvbnN0IHkgPSBNYXRoLnJhbmRvbSgpO1xuXG5cdFx0aWYoeClcblx0XHR7XG5cdFx0XHRpZih0aGlzLmlzQXJyYXkoeClcblx0XHRcdCAgIHx8XG5cdFx0XHQgICB0aGlzLmlzT2JqZWN0KHgpXG5cdFx0XHQgKSB7XG5cdFx0XHQgXHRjb25zdCBYID0gT2JqZWN0LmtleXMoeCk7XG5cblx0XHRcdFx0cmV0dXJuIHhbXG5cdFx0XHRcdFx0WFtNYXRoLmZsb29yKFgubGVuZ3RoICogeSldXG5cdFx0XHRcdF07XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuaXNTdHJpbmcoeCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiB4W01hdGguZmxvb3IoeC5sZW5ndGggKiB5KV07XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuaXNOdW1iZXIoeCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKHggKiB5KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR4ID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG5cblx0XHRyZXR1cm4gTWF0aC5mbG9vcih4ICogeSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBKU09OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pzb25fZW5jb2RlJzogZnVuY3Rpb24oeCwgaW5kZW50KVxuXHR7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHgsIG51bGwsIHRoaXMuaXNOdW1iZXIoaW5kZW50KSA/IGluZGVudCA6IDIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pzb25fanNwYXRoJzogZnVuY3Rpb24oeCwgcGF0aClcblx0e1xuXHRcdHJldHVybiB0eXBlb2YgSlNQYXRoICE9PSAndW5kZWZpbmVkJyA/IEpTUGF0aC5hcHBseShwYXRoLCB4KVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVEVNUExBVEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2luY2x1ZGUnOiBmdW5jdGlvbihmaWxlTmFtZSwgdmFyaWFibGVzID0ge30sIHdpdGhDb250ZXh0ID0gdHJ1ZSwgaWdub3JlTWlzc2luZyA9IGZhbHNlKVxuXHR7XG5cdFx0Y29uc3QgdGVtcCA9IHt9O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih3aXRoQ29udGV4dClcblx0XHR7XG5cdFx0XHRmb3IoY29uc3QgaSBpbiBhbWlUd2lnLmVuZ2luZS5kaWN0KVxuXHRcdFx0e1xuXHRcdFx0XHR0ZW1wW2ldID0gYW1pVHdpZy5lbmdpbmUuZGljdFtpXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZih2YXJpYWJsZXMpXG5cdFx0e1xuXHRcdFx0Zm9yKGNvbnN0IGkgaW4gLyotKi92YXJpYWJsZXMvKi0qLylcblx0XHRcdHtcblx0XHRcdFx0dGVtcFtpXSA9IC8qLSovdmFyaWFibGVzLyotKi9baV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgcmVzdWx0ID0gJyc7XG5cblx0XHRhbWlUd2lnLmFqYXguZ2V0KFxuXHRcdFx0ZmlsZU5hbWUsXG5cdFx0XHRmdW5jdGlvbihkYXRhKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSBhbWlUd2lnLmVuZ2luZS5yZW5kZXIoZGF0YSwgdGVtcCk7XG5cdFx0XHR9LFxuXHRcdFx0ZnVuY3Rpb24oLyoqLylcblx0XHRcdHtcblx0XHRcdFx0aWYoIWlnbm9yZU1pc3NpbmcpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgY291bGQgbm90IG9wZW4gYCcgKyBmaWxlTmFtZSArICdgJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5zdGRsaWIuZmlsdGVyX2UgPSBhbWlUd2lnLnN0ZGxpYi5maWx0ZXJfZXNjYXBlO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLmludGVycHJldGVyID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2dldEpTOiBmdW5jdGlvbihub2RlKVxuXHR7XG5cdFx0bGV0IEw7XG5cdFx0bGV0IHg7XG5cdFx0bGV0IGxlZnQ7XG5cdFx0bGV0IHJpZ2h0O1xuXHRcdGxldCBvcGVyYXRvcjtcblxuXHRcdHN3aXRjaChub2RlLm5vZGVUeXBlKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBMU1QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxTVDpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmxpc3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2goLyotLS0tLSovIHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiAnWycgKyBMLmpvaW4oJywnKSArICddJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERJQyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRElDOlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXHRcblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5kaWN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKGkgKyAnOicgKyB0aGlzLl9nZXRKUyhub2RlLmRpY3RbaV0pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gJ3snICsgTC5qb2luKCcsJykgKyAnfSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGVU4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTjpcblx0XHQgXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdCBcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gbm9kZS5ub2RlVmFsdWUgKyAnKCcgKyBMLmpvaW4oJywnKSArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFZBUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuVkFSOlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUubGlzdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaCgnWycgKyB0aGlzLl9nZXRKUyhub2RlLmxpc3RbaV0pICsgJ10nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gTC5sZW5ndGggPiAwID8gbm9kZS5ub2RlVmFsdWUgKyBMLmpvaW4oJycpIDogbm9kZS5ub2RlVmFsdWU7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBURVJNSU5BTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMOlxuXG5cdFx0XHRcdHJldHVybiBub2RlLm5vZGVWYWx1ZTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSVM6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXG5cdFx0XHRcdHN3aXRjaChub2RlLm5vZGVSaWdodC5ub2RlVHlwZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ERUZJTkVEOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0RlZmluZWQoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTlVMTDpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNOdWxsKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVNUFRZOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0VtcHR5KCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLklURVJBQkxFOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0l0ZXJhYmxlKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVWRU46XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzRXZlbignICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5PREQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzT2RkKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHRocm93ICdpbnRlcm5hbCBlcnJvcic7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElOICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSU46XG5cblx0XHRcdFx0aWYobm9kZS5ub2RlUmlnaHQubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzSW5PYmplY3QoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR4ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cblx0XHRcdFx0XHRsZWZ0ID0gbm9kZS5ub2RlUmlnaHQubm9kZUxlZnQubm9kZVZhbHVlO1xuXHRcdFx0XHRcdHJpZ2h0ID0gbm9kZS5ub2RlUmlnaHQubm9kZVJpZ2h0Lm5vZGVWYWx1ZTtcblxuXHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNJblJhbmdlKCcgKyB4ICsgJywnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTVEFSVFNfV0lUSCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlNUQVJUU19XSVRIOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5zdGFydHNXaXRoKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFTkRTX1dJVEggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVORFNfV0lUSDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuZW5kc1dpdGgoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIE1BVENIRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUzpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIubWF0Y2goJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFJBTkdFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0U6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLnJhbmdlKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBET1QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZVZhbHVlWzBdID09PSAnLicpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gbGVmdCArICcuJyArIHJpZ2h0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBsZWZ0ICsgJ1snICsgcmlnaHQgKyAnXSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZMRElWICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRkxESVY6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ01hdGguZmxvb3IoJyArIGxlZnQgKyAnLycgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFBPV0VSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVI6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ01hdGgucG93KCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogVU5JQVJZIE9QRVJBVE9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYobm9kZS5ub2RlTGVmdCA9PT0gbnVsbFxuXHRcdFx0XHQgICAmJlxuXHRcdFx0XHQgICBub2RlLm5vZGVSaWdodCAhPT0gbnVsbFxuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0b3BlcmF0b3IgPSAobm9kZS5ub2RlVHlwZSAhPT0gYW1pVHdpZy5leHByLnRva2Vucy5OT1QpID8gbm9kZS5ub2RlVmFsdWUgOiAnISc7XG5cblx0XHRcdFx0XHRyZXR1cm4gb3BlcmF0b3IgKyAnKCcgKyB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCkgKyAnKSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ICE9PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ID09PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRvcGVyYXRvciA9IChub2RlLm5vZGVUeXBlICE9PSBhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkgPyBub2RlLm5vZGVWYWx1ZSA6ICchJztcblxuXHRcdFx0XHRcdHJldHVybiAnKCcgKyB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KSArICcpJyArIG9wZXJhdG9yO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBCSU5BUlkgT1BFUkFUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ICE9PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ICE9PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRzd2l0Y2gobm9kZS5ub2RlVHlwZSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnfHwnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfQU5EOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICcmJic7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnfCc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9YT1I6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJ14nO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5EOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICcmJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5DT05DQVQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJysnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSBub2RlLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdFx0cmV0dXJuICcoJyArIGxlZnQgKyBvcGVyYXRvciArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEpTOiBmdW5jdGlvbihleHByKVxuXHR7XG5cdFx0cmV0dXJuICcoZnVuY3Rpb24oXykgeyByZXR1cm4gJyArIHRoaXMuX2dldEpTKGV4cHIucm9vdE5vZGUpICsgJzsgfSknO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRldmFsOiBmdW5jdGlvbihleHByLCBfKVxuXHR7XG5cdFx0aWYoIV8pIF8gPSB7fTtcblxuXHRcdHJldHVybiBldmFsKHRoaXMuZ2V0SlMoZXhwcikpLmNhbGwoXywgXyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIihmdW5jdGlvbigpIHtcblxudmFyIFNZTlRBWCA9IHtcbiAgICAgICAgUEFUSCAgICAgICAgICAgIDogMSxcbiAgICAgICAgU0VMRUNUT1IgICAgICAgIDogMixcbiAgICAgICAgT0JKX1BSRUQgICAgICAgIDogMyxcbiAgICAgICAgUE9TX1BSRUQgICAgICAgIDogNCxcbiAgICAgICAgTE9HSUNBTF9FWFBSICAgIDogNSxcbiAgICAgICAgQ09NUEFSSVNPTl9FWFBSIDogNixcbiAgICAgICAgTUFUSF9FWFBSICAgICAgIDogNyxcbiAgICAgICAgQ09OQ0FUX0VYUFIgICAgIDogOCxcbiAgICAgICAgVU5BUllfRVhQUiAgICAgIDogOSxcbiAgICAgICAgUE9TX0VYUFIgICAgICAgIDogMTAsXG4gICAgICAgIExJVEVSQUwgICAgICAgICA6IDExXG4gICAgfTtcblxuLy8gcGFyc2VyXG5cbnZhciBwYXJzZSA9IChmdW5jdGlvbigpIHtcblxuICAgIHZhciBUT0tFTiA9IHtcbiAgICAgICAgICAgIElEICAgIDogMSxcbiAgICAgICAgICAgIE5VTSAgIDogMixcbiAgICAgICAgICAgIFNUUiAgIDogMyxcbiAgICAgICAgICAgIEJPT0wgIDogNCxcbiAgICAgICAgICAgIE5VTEwgIDogNSxcbiAgICAgICAgICAgIFBVTkNUIDogNixcbiAgICAgICAgICAgIEVPUCAgIDogN1xuICAgICAgICB9LFxuICAgICAgICBNRVNTQUdFUyA9IHtcbiAgICAgICAgICAgIFVORVhQX1RPS0VOIDogJ1VuZXhwZWN0ZWQgdG9rZW4gXCIlMFwiJyxcbiAgICAgICAgICAgIFVORVhQX0VPUCAgIDogJ1VuZXhwZWN0ZWQgZW5kIG9mIHBhdGgnXG4gICAgICAgIH07XG5cbiAgICB2YXIgcGF0aCwgaWR4LCBidWYsIGxlbjtcblxuICAgIGZ1bmN0aW9uIHBhcnNlKF9wYXRoKSB7XG4gICAgICAgIHBhdGggPSBfcGF0aC5zcGxpdCgnJyk7XG4gICAgICAgIGlkeCA9IDA7XG4gICAgICAgIGJ1ZiA9IG51bGw7XG4gICAgICAgIGxlbiA9IHBhdGgubGVuZ3RoO1xuXG4gICAgICAgIHZhciByZXMgPSBwYXJzZVBhdGhDb25jYXRFeHByKCksXG4gICAgICAgICAgICB0b2tlbiA9IGxleCgpO1xuXG4gICAgICAgIGlmKHRva2VuLnR5cGUgIT09IFRPS0VOLkVPUCkge1xuICAgICAgICAgICAgdGhyb3dVbmV4cGVjdGVkKHRva2VuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQYXRoQ29uY2F0RXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZVBhdGhDb25jYXRQYXJ0RXhwcigpLFxuICAgICAgICAgICAgb3BlcmFuZHM7XG5cbiAgICAgICAgd2hpbGUobWF0Y2goJ3wnKSkge1xuICAgICAgICAgICAgbGV4KCk7XG4gICAgICAgICAgICAob3BlcmFuZHMgfHwgKG9wZXJhbmRzID0gW2V4cHJdKSkucHVzaChwYXJzZVBhdGhDb25jYXRQYXJ0RXhwcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcGVyYW5kcz9cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLkNPTkNBVF9FWFBSLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBvcGVyYW5kc1xuICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUGF0aENvbmNhdFBhcnRFeHByKCkge1xuICAgICAgICByZXR1cm4gbWF0Y2goJygnKT9cbiAgICAgICAgICAgIHBhcnNlUGF0aEdyb3VwRXhwcigpIDpcbiAgICAgICAgICAgIHBhcnNlUGF0aCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUGF0aEdyb3VwRXhwcigpIHtcbiAgICAgICAgZXhwZWN0KCcoJyk7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VQYXRoQ29uY2F0RXhwcigpO1xuICAgICAgICBleHBlY3QoJyknKTtcblxuICAgICAgICB2YXIgcGFydHMgPSBbXSxcbiAgICAgICAgICAgIHBhcnQ7XG4gICAgICAgIHdoaWxlKChwYXJ0ID0gcGFyc2VQcmVkaWNhdGUoKSkpIHtcbiAgICAgICAgICAgIHBhcnRzLnB1c2gocGFydCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighcGFydHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZXhwcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGV4cHIudHlwZSA9PT0gU1lOVEFYLlBBVEgpIHtcbiAgICAgICAgICAgIGV4cHIucGFydHMgPSBleHByLnBhcnRzLmNvbmNhdChwYXJ0cyk7XG4gICAgICAgICAgICByZXR1cm4gZXhwcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcnRzLnVuc2hpZnQoZXhwcik7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgIDogU1lOVEFYLlBBVEgsXG4gICAgICAgICAgICBwYXJ0cyA6IHBhcnRzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQcmVkaWNhdGUoKSB7XG4gICAgICAgIGlmKG1hdGNoKCdbJykpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVBvc1ByZWRpY2F0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWF0Y2goJ3snKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlT2JqZWN0UHJlZGljYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtYXRjaCgnKCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VQYXRoR3JvdXBFeHByKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBhdGgoKSB7XG4gICAgICAgIGlmKCFtYXRjaFBhdGgoKSkge1xuICAgICAgICAgICAgdGhyb3dVbmV4cGVjdGVkKGxleCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmcm9tUm9vdCA9IGZhbHNlLFxuICAgICAgICAgICAgc3Vic3Q7XG5cbiAgICAgICAgaWYobWF0Y2goJ14nKSkge1xuICAgICAgICAgICAgbGV4KCk7XG4gICAgICAgICAgICBmcm9tUm9vdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihtYXRjaFN1YnN0KCkpIHtcbiAgICAgICAgICAgIHN1YnN0ID0gbGV4KCkudmFsLnN1YnN0cigxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwYXJ0cyA9IFtdLFxuICAgICAgICAgICAgcGFydDtcbiAgICAgICAgd2hpbGUoKHBhcnQgPSBwYXJzZVBhdGhQYXJ0KCkpKSB7XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHBhcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgICAgIDogU1lOVEFYLlBBVEgsXG4gICAgICAgICAgICBmcm9tUm9vdCA6IGZyb21Sb290LFxuICAgICAgICAgICAgc3Vic3QgICAgOiBzdWJzdCxcbiAgICAgICAgICAgIHBhcnRzICAgIDogcGFydHNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBhdGhQYXJ0KCkge1xuICAgICAgICByZXR1cm4gbWF0Y2hTZWxlY3RvcigpP1xuICAgICAgICAgICAgcGFyc2VTZWxlY3RvcigpIDpcbiAgICAgICAgICAgIHBhcnNlUHJlZGljYXRlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VTZWxlY3RvcigpIHtcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gbGV4KCkudmFsLFxuICAgICAgICAgICAgdG9rZW4gPSBsb29rYWhlYWQoKSxcbiAgICAgICAgICAgIHByb3A7XG5cbiAgICAgICAgaWYobWF0Y2goJyonKSB8fCB0b2tlbi50eXBlID09PSBUT0tFTi5JRCB8fCB0b2tlbi50eXBlID09PSBUT0tFTi5TVFIpIHtcbiAgICAgICAgICAgIHByb3AgPSBsZXgoKS52YWw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSAgICAgOiBTWU5UQVguU0VMRUNUT1IsXG4gICAgICAgICAgICBzZWxlY3RvciA6IHNlbGVjdG9yLFxuICAgICAgICAgICAgcHJvcCAgICAgOiBwcm9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQb3NQcmVkaWNhdGUoKSB7XG4gICAgICAgIGV4cGVjdCgnWycpO1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlUG9zRXhwcigpO1xuICAgICAgICBleHBlY3QoJ10nKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5QT1NfUFJFRCxcbiAgICAgICAgICAgIGFyZyAgOiBleHByXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VPYmplY3RQcmVkaWNhdGUoKSB7XG4gICAgICAgIGV4cGVjdCgneycpO1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlTG9naWNhbE9SRXhwcigpO1xuICAgICAgICBleHBlY3QoJ30nKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5PQkpfUFJFRCxcbiAgICAgICAgICAgIGFyZyAgOiBleHByXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VMb2dpY2FsT1JFeHByKCkge1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlTG9naWNhbEFOREV4cHIoKSxcbiAgICAgICAgICAgIG9wZXJhbmRzO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCd8fCcpKSB7XG4gICAgICAgICAgICBsZXgoKTtcbiAgICAgICAgICAgIChvcGVyYW5kcyB8fCAob3BlcmFuZHMgPSBbZXhwcl0pKS5wdXNoKHBhcnNlTG9naWNhbEFOREV4cHIoKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3BlcmFuZHM/XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5MT0dJQ0FMX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6ICd8fCcsXG4gICAgICAgICAgICAgICAgYXJncyA6IG9wZXJhbmRzXG4gICAgICAgICAgICB9IDpcbiAgICAgICAgICAgIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VMb2dpY2FsQU5ERXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZUVxdWFsaXR5RXhwcigpLFxuICAgICAgICAgICAgb3BlcmFuZHM7XG5cbiAgICAgICAgd2hpbGUobWF0Y2goJyYmJykpIHtcbiAgICAgICAgICAgIGxleCgpO1xuICAgICAgICAgICAgKG9wZXJhbmRzIHx8IChvcGVyYW5kcyA9IFtleHByXSkpLnB1c2gocGFyc2VFcXVhbGl0eUV4cHIoKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3BlcmFuZHM/XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5MT0dJQ0FMX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6ICcmJicsXG4gICAgICAgICAgICAgICAgYXJncyA6IG9wZXJhbmRzXG4gICAgICAgICAgICB9IDpcbiAgICAgICAgICAgIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VFcXVhbGl0eUV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VSZWxhdGlvbmFsRXhwcigpO1xuXG4gICAgICAgIHdoaWxlKFxuICAgICAgICAgICAgbWF0Y2goJz09JykgfHwgbWF0Y2goJyE9JykgfHwgbWF0Y2goJz09PScpIHx8IG1hdGNoKCchPT0nKSB8fFxuICAgICAgICAgICAgbWF0Y2goJ149PScpIHx8IG1hdGNoKCc9PV4nKSB8fG1hdGNoKCdePScpIHx8IG1hdGNoKCc9XicpIHx8XG4gICAgICAgICAgICBtYXRjaCgnJD09JykgfHwgbWF0Y2goJz09JCcpIHx8IG1hdGNoKCckPScpIHx8IG1hdGNoKCc9JCcpIHx8XG4gICAgICAgICAgICBtYXRjaCgnKj09JykgfHwgbWF0Y2goJz09KicpfHwgbWF0Y2goJyo9JykgfHwgbWF0Y2goJz0qJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBleHByID0ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguQ09NUEFSSVNPTl9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiBsZXgoKS52YWwsXG4gICAgICAgICAgICAgICAgYXJncyA6IFtleHByLCBwYXJzZUVxdWFsaXR5RXhwcigpXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUmVsYXRpb25hbEV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VBZGRpdGl2ZUV4cHIoKTtcblxuICAgICAgICB3aGlsZShtYXRjaCgnPCcpIHx8IG1hdGNoKCc+JykgfHwgbWF0Y2goJzw9JykgfHwgbWF0Y2goJz49JykpIHtcbiAgICAgICAgICAgIGV4cHIgPSB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5DT01QQVJJU09OX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6IGxleCgpLnZhbCxcbiAgICAgICAgICAgICAgICBhcmdzIDogW2V4cHIsIHBhcnNlUmVsYXRpb25hbEV4cHIoKV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUFkZGl0aXZlRXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZU11bHRpcGxpY2F0aXZlRXhwcigpO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCcrJykgfHwgbWF0Y2goJy0nKSkge1xuICAgICAgICAgICAgZXhwciA9IHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLk1BVEhfRVhQUixcbiAgICAgICAgICAgICAgICBvcCAgIDogbGV4KCkudmFsLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBbZXhwciwgcGFyc2VNdWx0aXBsaWNhdGl2ZUV4cHIoKV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZU11bHRpcGxpY2F0aXZlRXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZVVuYXJ5RXhwcigpO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCcqJykgfHwgbWF0Y2goJy8nKSB8fCBtYXRjaCgnJScpKSB7XG4gICAgICAgICAgICBleHByID0ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguTUFUSF9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiBsZXgoKS52YWwsXG4gICAgICAgICAgICAgICAgYXJncyA6IFtleHByLCBwYXJzZU11bHRpcGxpY2F0aXZlRXhwcigpXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUG9zRXhwcigpIHtcbiAgICAgICAgaWYobWF0Y2goJzonKSkge1xuICAgICAgICAgICAgbGV4KCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgIDogU1lOVEFYLlBPU19FWFBSLFxuICAgICAgICAgICAgICAgIHRvSWR4IDogcGFyc2VVbmFyeUV4cHIoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmcm9tRXhwciA9IHBhcnNlVW5hcnlFeHByKCk7XG4gICAgICAgIGlmKG1hdGNoKCc6JykpIHtcbiAgICAgICAgICAgIGxleCgpO1xuICAgICAgICAgICAgaWYobWF0Y2goJ10nKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgICAgOiBTWU5UQVguUE9TX0VYUFIsXG4gICAgICAgICAgICAgICAgICAgIGZyb21JZHggOiBmcm9tRXhwclxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgICA6IFNZTlRBWC5QT1NfRVhQUixcbiAgICAgICAgICAgICAgICBmcm9tSWR4IDogZnJvbUV4cHIsXG4gICAgICAgICAgICAgICAgdG9JZHggICA6IHBhcnNlVW5hcnlFeHByKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5QT1NfRVhQUixcbiAgICAgICAgICAgIGlkeCAgOiBmcm9tRXhwclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlVW5hcnlFeHByKCkge1xuICAgICAgICBpZihtYXRjaCgnIScpIHx8IG1hdGNoKCctJykpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5VTkFSWV9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiBsZXgoKS52YWwsXG4gICAgICAgICAgICAgICAgYXJnICA6IHBhcnNlVW5hcnlFeHByKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyc2VQcmltYXJ5RXhwcigpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUHJpbWFyeUV4cHIoKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGxvb2thaGVhZCgpLFxuICAgICAgICAgICAgdHlwZSA9IHRva2VuLnR5cGU7XG5cbiAgICAgICAgaWYodHlwZSA9PT0gVE9LRU4uU1RSIHx8IHR5cGUgPT09IFRPS0VOLk5VTSB8fCB0eXBlID09PSBUT0tFTi5CT09MIHx8IHR5cGUgPT09IFRPS0VOLk5VTEwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5MSVRFUkFMLFxuICAgICAgICAgICAgICAgIHZhbCAgOiBsZXgoKS52YWxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZihtYXRjaFBhdGgoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlUGF0aCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWF0Y2goJygnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlR3JvdXBFeHByKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhyb3dVbmV4cGVjdGVkKGxleCgpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUdyb3VwRXhwcigpIHtcbiAgICAgICAgZXhwZWN0KCcoJyk7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VMb2dpY2FsT1JFeHByKCk7XG4gICAgICAgIGV4cGVjdCgnKScpO1xuXG4gICAgICAgIHJldHVybiBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoKHZhbCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBsb29rYWhlYWQoKTtcbiAgICAgICAgcmV0dXJuIHRva2VuLnR5cGUgPT09IFRPS0VOLlBVTkNUICYmIHRva2VuLnZhbCA9PT0gdmFsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoUGF0aCgpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoU2VsZWN0b3IoKSB8fCBtYXRjaFN1YnN0KCkgfHwgbWF0Y2goJ14nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaFNlbGVjdG9yKCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBsb29rYWhlYWQoKTtcbiAgICAgICAgaWYodG9rZW4udHlwZSA9PT0gVE9LRU4uUFVOQ1QpIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSB0b2tlbi52YWw7XG4gICAgICAgICAgICByZXR1cm4gdmFsID09PSAnLicgfHwgdmFsID09PSAnLi4nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoU3Vic3QoKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGxvb2thaGVhZCgpO1xuICAgICAgICByZXR1cm4gdG9rZW4udHlwZSA9PT0gVE9LRU4uSUQgJiYgdG9rZW4udmFsWzBdID09PSAnJCc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXhwZWN0KHZhbCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBsZXgoKTtcbiAgICAgICAgaWYodG9rZW4udHlwZSAhPT0gVE9LRU4uUFVOQ1QgfHwgdG9rZW4udmFsICE9PSB2YWwpIHtcbiAgICAgICAgICAgIHRocm93VW5leHBlY3RlZCh0b2tlbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb29rYWhlYWQoKSB7XG4gICAgICAgIGlmKGJ1ZiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwb3MgPSBpZHg7XG4gICAgICAgIGJ1ZiA9IGFkdmFuY2UoKTtcbiAgICAgICAgaWR4ID0gcG9zO1xuXG4gICAgICAgIHJldHVybiBidWY7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWR2YW5jZSgpIHtcbiAgICAgICAgd2hpbGUoaXNXaGl0ZVNwYWNlKHBhdGhbaWR4XSkpIHtcbiAgICAgICAgICAgICsraWR4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaWR4ID49IGxlbikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLkVPUCxcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtpZHgsIGlkeF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG9rZW4gPSBzY2FuUHVuY3R1YXRvcigpO1xuICAgICAgICBpZih0b2tlbiB8fFxuICAgICAgICAgICAgICAgICh0b2tlbiA9IHNjYW5JZCgpKSB8fFxuICAgICAgICAgICAgICAgICh0b2tlbiA9IHNjYW5TdHJpbmcoKSkgfHxcbiAgICAgICAgICAgICAgICAodG9rZW4gPSBzY2FuTnVtZXJpYygpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9rZW4gPSB7IHJhbmdlIDogW2lkeCwgaWR4XSB9O1xuICAgICAgICBpZHggPj0gbGVuP1xuICAgICAgICAgICAgdG9rZW4udHlwZSA9IFRPS0VOLkVPUCA6XG4gICAgICAgICAgICB0b2tlbi52YWwgPSBwYXRoW2lkeF07XG5cbiAgICAgICAgdGhyb3dVbmV4cGVjdGVkKHRva2VuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsZXgoKSB7XG4gICAgICAgIHZhciB0b2tlbjtcblxuICAgICAgICBpZihidWYpIHtcbiAgICAgICAgICAgIGlkeCA9IGJ1Zi5yYW5nZVsxXTtcbiAgICAgICAgICAgIHRva2VuID0gYnVmO1xuICAgICAgICAgICAgYnVmID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhZHZhbmNlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNEaWdpdChjaCkge1xuICAgICAgICByZXR1cm4gJzAxMjM0NTY3ODknLmluZGV4T2YoY2gpID49IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNXaGl0ZVNwYWNlKGNoKSB7XG4gICAgICAgIHJldHVybiAnIFxcclxcblxcdCcuaW5kZXhPZihjaCkgPiAtMTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0lkU3RhcnQoY2gpIHtcbiAgICAgICAgcmV0dXJuIGNoID09PSAnJCcgfHwgY2ggPT09ICdAJyB8fCBjaCA9PT0gJ18nIHx8IChjaCA+PSAnYScgJiYgY2ggPD0gJ3onKSB8fCAoY2ggPj0gJ0EnICYmIGNoIDw9ICdaJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNJZFBhcnQoY2gpIHtcbiAgICAgICAgcmV0dXJuIGlzSWRTdGFydChjaCkgfHwgKGNoID49ICcwJyAmJiBjaCA8PSAnOScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjYW5JZCgpIHtcbiAgICAgICAgdmFyIGNoID0gcGF0aFtpZHhdO1xuXG4gICAgICAgIGlmKCFpc0lkU3RhcnQoY2gpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhcnQgPSBpZHgsXG4gICAgICAgICAgICBpZCA9IGNoO1xuXG4gICAgICAgIHdoaWxlKCsraWR4IDwgbGVuKSB7XG4gICAgICAgICAgICBjaCA9IHBhdGhbaWR4XTtcbiAgICAgICAgICAgIGlmKCFpc0lkUGFydChjaCkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkICs9IGNoO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoKGlkKSB7XG4gICAgICAgICAgICBjYXNlICd0cnVlJzpcbiAgICAgICAgICAgIGNhc2UgJ2ZhbHNlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLkJPT0wsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogaWQgPT09ICd0cnVlJyxcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeF1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjYXNlICdudWxsJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLk5VTEwsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeF1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uSUQsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogaWQsXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHhdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjYW5TdHJpbmcoKSB7XG4gICAgICAgIGlmKHBhdGhbaWR4XSAhPT0gJ1wiJyAmJiBwYXRoW2lkeF0gIT09ICdcXCcnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb3JpZyA9IHBhdGhbaWR4XSxcbiAgICAgICAgICAgIHN0YXJ0ID0gKytpZHgsXG4gICAgICAgICAgICBzdHIgPSAnJyxcbiAgICAgICAgICAgIGVvc0ZvdW5kID0gZmFsc2UsXG4gICAgICAgICAgICBjaDtcblxuICAgICAgICB3aGlsZShpZHggPCBsZW4pIHtcbiAgICAgICAgICAgIGNoID0gcGF0aFtpZHgrK107XG4gICAgICAgICAgICBpZihjaCA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgICAgY2ggPSBwYXRoW2lkeCsrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoKGNoID09PSAnXCInIHx8IGNoID09PSAnXFwnJykgJiYgY2ggPT09IG9yaWcpIHtcbiAgICAgICAgICAgICAgICBlb3NGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHIgKz0gY2g7XG4gICAgICAgIH1cblxuICAgICAgICBpZihlb3NGb3VuZCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlIDogVE9LRU4uU1RSLFxuICAgICAgICAgICAgICAgIHZhbCA6IHN0cixcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4XVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjYW5OdW1lcmljKCkge1xuICAgICAgICB2YXIgc3RhcnQgPSBpZHgsXG4gICAgICAgICAgICBjaCA9IHBhdGhbaWR4XSxcbiAgICAgICAgICAgIGlzRmxvYXQgPSBjaCA9PT0gJy4nO1xuXG4gICAgICAgIGlmKGlzRmxvYXQgfHwgaXNEaWdpdChjaCkpIHtcbiAgICAgICAgICAgIHZhciBudW0gPSBjaDtcbiAgICAgICAgICAgIHdoaWxlKCsraWR4IDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgY2ggPSBwYXRoW2lkeF07XG4gICAgICAgICAgICAgICAgaWYoY2ggPT09ICcuJykge1xuICAgICAgICAgICAgICAgICAgICBpZihpc0Zsb2F0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaXNGbG9hdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoIWlzRGlnaXQoY2gpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG51bSArPSBjaDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLk5VTSxcbiAgICAgICAgICAgICAgICB2YWwgICA6IGlzRmxvYXQ/IHBhcnNlRmxvYXQobnVtKSA6IHBhcnNlSW50KG51bSwgMTApLFxuICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHhdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2NhblB1bmN0dWF0b3IoKSB7XG4gICAgICAgIHZhciBzdGFydCA9IGlkeCxcbiAgICAgICAgICAgIGNoMSA9IHBhdGhbaWR4XSxcbiAgICAgICAgICAgIGNoMiA9IHBhdGhbaWR4ICsgMV07XG5cbiAgICAgICAgaWYoY2gxID09PSAnLicpIHtcbiAgICAgICAgICAgIGlmKGlzRGlnaXQoY2gyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhdGhbKytpZHhdID09PSAnLic/XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgICAgICB2YWwgICA6ICcuLicsXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCArK2lkeF1cbiAgICAgICAgICAgICAgICB9IDpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogJy4nLFxuICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4XVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZihjaDIgPT09ICc9Jykge1xuICAgICAgICAgICAgdmFyIGNoMyA9IHBhdGhbaWR4ICsgMl07XG4gICAgICAgICAgICBpZihjaDMgPT09ICc9Jykge1xuICAgICAgICAgICAgICAgIGlmKCc9IV4kKicuaW5kZXhPZihjaDEpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSArIGNoMiArIGNoMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHggKz0gM11cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCdeJConLmluZGV4T2YoY2gzKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYoY2gxID09PSAnPScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSArIGNoMiArIGNoMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHggKz0gM11cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCc9IV4kKj48Jy5pbmRleE9mKGNoMSkgPj0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogY2gxICsgY2gyLFxuICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4ICs9IDJdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGNoMSA9PT0gJz0nICYmICdeJConLmluZGV4T2YoY2gyKSA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgdmFsICAgOiBjaDEgKyBjaDIsXG4gICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeCArPSAyXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNoMSA9PT0gY2gyICYmIChjaDEgPT09ICd8JyB8fCBjaDEgPT09ICcmJykpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSArIGNoMixcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4ICs9IDJdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoJzp7fSgpW11eKy0qLyUhPjx8Jy5pbmRleE9mKGNoMSkgPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgIHZhbCAgIDogY2gxLFxuICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCArK2lkeF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0aHJvd1VuZXhwZWN0ZWQodG9rZW4pIHtcbiAgICAgICAgaWYodG9rZW4udHlwZSA9PT0gVE9LRU4uRU9QKSB7XG4gICAgICAgICAgICB0aHJvd0Vycm9yKHRva2VuLCBNRVNTQUdFUy5VTkVYUF9FT1ApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3dFcnJvcih0b2tlbiwgTUVTU0FHRVMuVU5FWFBfVE9LRU4sIHRva2VuLnZhbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGhyb3dFcnJvcih0b2tlbiwgbWVzc2FnZUZvcm1hdCkge1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMiksXG4gICAgICAgICAgICBtc2cgPSBtZXNzYWdlRm9ybWF0LnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgLyUoXFxkKS9nLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKF8sIGlkeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJnc1tpZHhdIHx8ICcnO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IobXNnKTtcblxuICAgICAgICBlcnJvci5jb2x1bW4gPSB0b2tlbi5yYW5nZVswXTtcblxuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2U7XG59KSgpO1xuXG4vLyB0cmFuc2xhdG9yXG5cbnZhciB0cmFuc2xhdGUgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgYm9keSwgdmFycywgbGFzdFZhcklkLCB1bnVzZWRWYXJzO1xuXG4gICAgZnVuY3Rpb24gYWNxdWlyZVZhcigpIHtcbiAgICAgICAgaWYodW51c2VkVmFycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB1bnVzZWRWYXJzLnNoaWZ0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdmFyTmFtZSA9ICd2JyArICsrbGFzdFZhcklkO1xuICAgICAgICB2YXJzLnB1c2godmFyTmFtZSk7XG4gICAgICAgIHJldHVybiB2YXJOYW1lO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbGVhc2VWYXJzKCkge1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cywgaSA9IGFyZ3MubGVuZ3RoO1xuICAgICAgICB3aGlsZShpLS0pIHtcbiAgICAgICAgICAgIHVudXNlZFZhcnMucHVzaChhcmdzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZShhc3QpIHtcbiAgICAgICAgYm9keSA9IFtdO1xuICAgICAgICB2YXJzID0gWydyZXMnXTtcbiAgICAgICAgbGFzdFZhcklkID0gMDtcbiAgICAgICAgdW51c2VkVmFycyA9IFtdO1xuXG4gICAgICAgIHRyYW5zbGF0ZUV4cHIoYXN0LCAncmVzJywgJ2RhdGEnKTtcblxuICAgICAgICBib2R5LnVuc2hpZnQoXG4gICAgICAgICAgICAndmFyICcsXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5P1xuICAgICAgICAgICAgICAgICdpc0FyciA9IEFycmF5LmlzQXJyYXknIDpcbiAgICAgICAgICAgICAgICAndG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLCBpc0FyciA9IGZ1bmN0aW9uKG8pIHsgcmV0dXJuIHRvU3RyLmNhbGwobykgPT09IFwiW29iamVjdCBBcnJheV1cIjsgfScsXG4gICAgICAgICAgICAgICAgJywgY29uY2F0ID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdCcsXG4gICAgICAgICAgICAgICAgJywnLCB2YXJzLmpvaW4oJywnKSwgJzsnKTtcblxuICAgICAgICBpZihhc3QudHlwZSA9PT0gU1lOVEFYLlBBVEgpIHtcbiAgICAgICAgICAgIHZhciBsYXN0UGFydCA9IGFzdC5wYXJ0c1thc3QucGFydHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZihsYXN0UGFydCAmJiBsYXN0UGFydC50eXBlID09PSBTWU5UQVguUE9TX1BSRUQgJiYgJ2lkeCcgaW4gbGFzdFBhcnQuYXJnKSB7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKCdyZXMgPSByZXNbMF07Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBib2R5LnB1c2goJ3JldHVybiByZXM7Jyk7XG5cbiAgICAgICAgcmV0dXJuIGJvZHkuam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlUGF0aChwYXRoLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gcGF0aC5wYXJ0cyxcbiAgICAgICAgICAgIGkgPSAwLCBsZW4gPSBwYXJ0cy5sZW5ndGg7XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgZGVzdCwgJz0nLCBwYXRoLmZyb21Sb290PyAnZGF0YScgOiBwYXRoLnN1YnN0PyAnc3Vic3QuJyArIHBhdGguc3Vic3QgOiBjdHgsICc7JyxcbiAgICAgICAgICAgICdpc0FycignICsgZGVzdCArICcpIHx8ICgnICsgZGVzdCArICcgPSBbJyArIGRlc3QgKyAnXSk7Jyk7XG5cbiAgICAgICAgd2hpbGUoaSA8IGxlbikge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBwYXJ0c1tpKytdO1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0udHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgU1lOVEFYLlNFTEVDVE9SOlxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdG9yID09PSAnLi4nP1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlRGVzY2VuZGFudFNlbGVjdG9yKGl0ZW0sIGRlc3QsIGRlc3QpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVNlbGVjdG9yKGl0ZW0sIGRlc3QsIGRlc3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgU1lOVEFYLk9CSl9QUkVEOlxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVPYmplY3RQcmVkaWNhdGUoaXRlbSwgZGVzdCwgZGVzdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBTWU5UQVguUE9TX1BSRUQ6XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVBvc1ByZWRpY2F0ZShpdGVtLCBkZXN0LCBkZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFNZTlRBWC5DT05DQVRfRVhQUjpcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlQ29uY2F0RXhwcihpdGVtLCBkZXN0LCBkZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVTZWxlY3RvcihzZWwsIGRlc3QsIGN0eCkge1xuICAgICAgICBpZihzZWwucHJvcCkge1xuICAgICAgICAgICAgdmFyIHByb3BTdHIgPSBlc2NhcGVTdHIoc2VsLnByb3ApLFxuICAgICAgICAgICAgICAgIHJlcyA9IGFjcXVpcmVWYXIoKSwgaSA9IGFjcXVpcmVWYXIoKSwgbGVuID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgICAgIGN1ckN0eCA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgICAgICBqID0gYWNxdWlyZVZhcigpLCB2YWwgPSBhY3F1aXJlVmFyKCksIHRtcEFyciA9IGFjcXVpcmVWYXIoKTtcblxuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgIHJlcywgJz0gW107JywgaSwgJz0gMDsnLCBsZW4sICc9JywgY3R4LCAnLmxlbmd0aDsnLCB0bXBBcnIsICc9IFtdOycsXG4gICAgICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuLCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgY3VyQ3R4LCAnPScsIGN0eCwgJ1snLCBpLCAnKytdOycsXG4gICAgICAgICAgICAgICAgICAgICdpZignLCBjdXJDdHgsICchPSBudWxsKSB7Jyk7XG4gICAgICAgICAgICBpZihzZWwucHJvcCA9PT0gJyonKSB7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKHR5cGVvZiAnLCBjdXJDdHgsICc9PT0gXCJvYmplY3RcIikgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKGlzQXJyKCcsIGN1ckN0eCwgJykpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMsICc9JywgcmVzLCAnLmNvbmNhdCgnLCBjdXJDdHgsICcpOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdlbHNlIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZm9yKCcsIGosICcgaW4gJywgY3VyQ3R4LCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZignLCBjdXJDdHgsICcuaGFzT3duUHJvcGVydHkoJywgaiwgJykpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCwgJz0nLCBjdXJDdHgsICdbJywgaiwgJ107Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwsICc9JywgY3VyQ3R4LCAnWycsIHByb3BTdHIsICddOycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIHZhbCwgdG1wQXJyLCBsZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgIGRlc3QsICc9JywgbGVuLCAnPiAxICYmJywgdG1wQXJyLCAnLmxlbmd0aD8nLCB0bXBBcnIsICcubGVuZ3RoID4gMT8nLFxuICAgICAgICAgICAgICAgICAgICAnY29uY2F0LmFwcGx5KCcsIHJlcywgJywnLCB0bXBBcnIsICcpIDonLCByZXMsICcuY29uY2F0KCcsIHRtcEFyciwgJ1swXSkgOicsIHJlcywgJzsnKTtcblxuICAgICAgICAgICAgcmVsZWFzZVZhcnMocmVzLCBpLCBsZW4sIGN1ckN0eCwgaiwgdmFsLCB0bXBBcnIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlRGVzY2VuZGFudFNlbGVjdG9yKHNlbCwgZGVzdCwgYmFzZUN0eCkge1xuICAgICAgICB2YXIgcHJvcCA9IHNlbC5wcm9wLFxuICAgICAgICAgICAgY3R4ID0gYWNxdWlyZVZhcigpLCBjdXJDdHggPSBhY3F1aXJlVmFyKCksIGNoaWxkQ3R4cyA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGkgPSBhY3F1aXJlVmFyKCksIGogPSBhY3F1aXJlVmFyKCksIHZhbCA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGxlbiA9IGFjcXVpcmVWYXIoKSwgcmVzID0gYWNxdWlyZVZhcigpO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgIGN0eCwgJz0nLCBiYXNlQ3R4LCAnLnNsaWNlKCksJywgcmVzLCAnPSBbXTsnLFxuICAgICAgICAgICAgJ3doaWxlKCcsIGN0eCwgJy5sZW5ndGgpIHsnLFxuICAgICAgICAgICAgICAgIGN1ckN0eCwgJz0nLCBjdHgsICcuc2hpZnQoKTsnKTtcbiAgICAgICAgcHJvcD9cbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAnaWYodHlwZW9mICcsIGN1ckN0eCwgJz09PSBcIm9iamVjdFwiICYmJywgY3VyQ3R4LCAnKSB7JykgOlxuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICdpZih0eXBlb2YgJywgY3VyQ3R4LCAnIT0gbnVsbCkgeycpO1xuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkQ3R4cywgJz0gW107JyxcbiAgICAgICAgICAgICAgICAgICAgJ2lmKGlzQXJyKCcsIGN1ckN0eCwgJykpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaSwgJz0gMCwnLCBsZW4sICc9JywgY3VyQ3R4LCAnLmxlbmd0aDsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuLCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwsICc9JywgY3VyQ3R4LCAnWycsIGksICcrK107Jyk7XG4gICAgICAgIHByb3AgJiYgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZih0eXBlb2YgJywgdmFsLCAnPT09IFwib2JqZWN0XCIpIHsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShjaGlsZEN0eHMsIHZhbCk7XG4gICAgICAgIHByb3AgJiYgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAnZWxzZSB7Jyk7XG4gICAgICAgIGlmKHByb3ApIHtcbiAgICAgICAgICAgIGlmKHByb3AgIT09ICcqJykge1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCwgJz0nLCBjdXJDdHgsICdbXCInICsgcHJvcCArICdcIl07Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVBcHBlbmRUb0FycmF5KHJlcywgdmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZUFwcGVuZFRvQXJyYXkocmVzLCBjdXJDdHgpO1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKHR5cGVvZiAnLCBjdXJDdHgsICc9PT0gXCJvYmplY3RcIikgeycpO1xuICAgICAgICB9XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmb3IoJywgaiwgJyBpbiAnLCBjdXJDdHgsICcpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWYoJywgY3VyQ3R4LCAnLmhhc093blByb3BlcnR5KCcsIGosICcpKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCwgJz0nLCBjdXJDdHgsICdbJywgaiwgJ107Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVBcHBlbmRUb0FycmF5KGNoaWxkQ3R4cywgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3AgPT09ICcqJyAmJiBpbmxpbmVBcHBlbmRUb0FycmF5KHJlcywgdmFsKTtcbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgcHJvcCB8fCBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAnfScpO1xuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRDdHhzLCAnLmxlbmd0aCAmJicsIGN0eCwgJy51bnNoaWZ0LmFwcGx5KCcsIGN0eCwgJywnLCBjaGlsZEN0eHMsICcpOycsXG4gICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgZGVzdCwgJz0nLCByZXMsICc7Jyk7XG5cbiAgICAgICAgcmVsZWFzZVZhcnMoY3R4LCBjdXJDdHgsIGNoaWxkQ3R4cywgaSwgaiwgdmFsLCBsZW4sIHJlcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlT2JqZWN0UHJlZGljYXRlKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgcmVzVmFyID0gYWNxdWlyZVZhcigpLCBpID0gYWNxdWlyZVZhcigpLCBsZW4gPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBjb25kID0gYWNxdWlyZVZhcigpLCBjdXJJdGVtID0gYWNxdWlyZVZhcigpO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgIHJlc1ZhciwgJz0gW107JyxcbiAgICAgICAgICAgIGksICc9IDA7JyxcbiAgICAgICAgICAgIGxlbiwgJz0nLCBjdHgsICcubGVuZ3RoOycsXG4gICAgICAgICAgICAnd2hpbGUoJywgaSwgJzwnLCBsZW4sICcpIHsnLFxuICAgICAgICAgICAgICAgIGN1ckl0ZW0sICc9JywgY3R4LCAnWycsIGksICcrK107Jyk7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihleHByLmFyZywgY29uZCwgY3VySXRlbSk7XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICBjb252ZXJ0VG9Cb29sKGV4cHIuYXJnLCBjb25kKSwgJyYmJywgcmVzVmFyLCAnLnB1c2goJywgY3VySXRlbSwgJyk7JyxcbiAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgIGRlc3QsICc9JywgcmVzVmFyLCAnOycpO1xuXG4gICAgICAgIHJlbGVhc2VWYXJzKHJlc1ZhciwgaSwgbGVuLCBjdXJJdGVtLCBjb25kKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVQb3NQcmVkaWNhdGUoaXRlbSwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciBhcnJheUV4cHIgPSBpdGVtLmFyZywgZnJvbUlkeCwgdG9JZHg7XG4gICAgICAgIGlmKGFycmF5RXhwci5pZHgpIHtcbiAgICAgICAgICAgIHZhciBpZHggPSBhY3F1aXJlVmFyKCk7XG4gICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFycmF5RXhwci5pZHgsIGlkeCwgY3R4KTtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICBpZHgsICc8IDAgJiYgKCcsIGlkeCwgJz0nLCBjdHgsICcubGVuZ3RoICsnLCBpZHgsICcpOycsXG4gICAgICAgICAgICAgICAgZGVzdCwgJz0nLCBjdHgsICdbJywgaWR4LCAnXSA9PSBudWxsPyBbXSA6IFsnLCBjdHgsICdbJywgaWR4LCAnXV07Jyk7XG4gICAgICAgICAgICByZWxlYXNlVmFycyhpZHgpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYXJyYXlFeHByLmZyb21JZHgpIHtcbiAgICAgICAgICAgIGlmKGFycmF5RXhwci50b0lkeCkge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJyYXlFeHByLmZyb21JZHgsIGZyb21JZHggPSBhY3F1aXJlVmFyKCksIGN0eCk7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcnJheUV4cHIudG9JZHgsIHRvSWR4ID0gYWNxdWlyZVZhcigpLCBjdHgpO1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPScsIGN0eCwgJy5zbGljZSgnLCBmcm9tSWR4LCAnLCcsIHRvSWR4LCAnKTsnKTtcbiAgICAgICAgICAgICAgICByZWxlYXNlVmFycyhmcm9tSWR4LCB0b0lkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFycmF5RXhwci5mcm9tSWR4LCBmcm9tSWR4ID0gYWNxdWlyZVZhcigpLCBjdHgpO1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPScsIGN0eCwgJy5zbGljZSgnLCBmcm9tSWR4LCAnKTsnKTtcbiAgICAgICAgICAgICAgICByZWxlYXNlVmFycyhmcm9tSWR4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJyYXlFeHByLnRvSWR4LCB0b0lkeCA9IGFjcXVpcmVWYXIoKSwgY3R4KTtcbiAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPScsIGN0eCwgJy5zbGljZSgwLCcsIHRvSWR4LCAnKTsnKTtcbiAgICAgICAgICAgIHJlbGVhc2VWYXJzKHRvSWR4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUV4cHIoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHN3aXRjaChleHByLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLlBBVEg6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlUGF0aChleHByLCBkZXN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5DT05DQVRfRVhQUjpcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVDb25jYXRFeHByKGV4cHIsIGRlc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkNPTVBBUklTT05fRVhQUjpcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVDb21wYXJpc29uRXhwcihleHByLCBkZXN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5NQVRIX0VYUFI6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlTWF0aEV4cHIoZXhwciwgZGVzdCwgY3R4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguTE9HSUNBTF9FWFBSOlxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUxvZ2ljYWxFeHByKGV4cHIsIGRlc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLlVOQVJZX0VYUFI6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlVW5hcnlFeHByKGV4cHIsIGRlc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkxJVEVSQUw6XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9Jyk7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlTGl0ZXJhbChleHByLnZhbCk7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKCc7Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVMaXRlcmFsKHZhbCkge1xuICAgICAgICBib2R5LnB1c2godHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc/IGVzY2FwZVN0cih2YWwpIDogdmFsID09PSBudWxsPyAnbnVsbCcgOiB2YWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUNvbXBhcmlzb25FeHByKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgdmFsMSA9IGFjcXVpcmVWYXIoKSwgdmFsMiA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGlzVmFsMUFycmF5ID0gYWNxdWlyZVZhcigpLCBpc1ZhbDJBcnJheSA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGkgPSBhY3F1aXJlVmFyKCksIGogPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBsZW4xID0gYWNxdWlyZVZhcigpLCBsZW4yID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgbGVmdEFyZyA9IGV4cHIuYXJnc1swXSwgcmlnaHRBcmcgPSBleHByLmFyZ3NbMV07XG5cbiAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9IGZhbHNlOycpO1xuXG4gICAgICAgIHRyYW5zbGF0ZUV4cHIobGVmdEFyZywgdmFsMSwgY3R4KTtcbiAgICAgICAgdHJhbnNsYXRlRXhwcihyaWdodEFyZywgdmFsMiwgY3R4KTtcblxuICAgICAgICB2YXIgaXNMZWZ0QXJnUGF0aCA9IGxlZnRBcmcudHlwZSA9PT0gU1lOVEFYLlBBVEgsXG4gICAgICAgICAgICBpc1JpZ2h0QXJnTGl0ZXJhbCA9IHJpZ2h0QXJnLnR5cGUgPT09IFNZTlRBWC5MSVRFUkFMO1xuXG4gICAgICAgIGJvZHkucHVzaChpc1ZhbDFBcnJheSwgJz0nKTtcbiAgICAgICAgaXNMZWZ0QXJnUGF0aD8gYm9keS5wdXNoKCd0cnVlOycpIDogYm9keS5wdXNoKCdpc0FycignLCB2YWwxLCAnKTsnKTtcblxuICAgICAgICBib2R5LnB1c2goaXNWYWwyQXJyYXksICc9Jyk7XG4gICAgICAgIGlzUmlnaHRBcmdMaXRlcmFsPyBib2R5LnB1c2goJ2ZhbHNlOycpIDogYm9keS5wdXNoKCdpc0FycignLCB2YWwyLCAnKTsnKTtcblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAnaWYoJyk7XG4gICAgICAgIGlzTGVmdEFyZ1BhdGggfHwgYm9keS5wdXNoKGlzVmFsMUFycmF5LCAnJiYnKTtcbiAgICAgICAgYm9keS5wdXNoKHZhbDEsICcubGVuZ3RoID09PSAxKSB7JyxcbiAgICAgICAgICAgICAgICB2YWwxLCAnPScsIHZhbDEsICdbMF07JyxcbiAgICAgICAgICAgICAgICBpc1ZhbDFBcnJheSwgJz0gZmFsc2U7JyxcbiAgICAgICAgICAgICd9Jyk7XG4gICAgICAgIGlzUmlnaHRBcmdMaXRlcmFsIHx8IGJvZHkucHVzaChcbiAgICAgICAgICAgICdpZignLCBpc1ZhbDJBcnJheSwgJyYmJywgdmFsMiwgJy5sZW5ndGggPT09IDEpIHsnLFxuICAgICAgICAgICAgICAgIHZhbDIsICc9JywgdmFsMiwgJ1swXTsnLFxuICAgICAgICAgICAgICAgIGlzVmFsMkFycmF5LCAnPSBmYWxzZTsnLFxuICAgICAgICAgICAgJ30nKTtcblxuICAgICAgICBib2R5LnB1c2goaSwgJz0gMDsnLFxuICAgICAgICAgICAgJ2lmKCcsIGlzVmFsMUFycmF5LCAnKSB7JyxcbiAgICAgICAgICAgICAgICBsZW4xLCAnPScsIHZhbDEsICcubGVuZ3RoOycpO1xuXG4gICAgICAgIGlmKCFpc1JpZ2h0QXJnTGl0ZXJhbCkge1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICdpZignLCBpc1ZhbDJBcnJheSwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgIGxlbjIsICc9JywgdmFsMiwgJy5sZW5ndGg7JyxcbiAgICAgICAgICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuMSwgJyYmICEnLCBkZXN0LCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGosICc9IDA7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd3aGlsZSgnLCBqLCAnPCcsIGxlbjIsICcpIHsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUNvbmRpdGlvbihleHByLm9wLCBbdmFsMSwgJ1snLCBpLCAnXSddLmpvaW4oJycpLCBbdmFsMiwgJ1snLCBqLCAnXSddLmpvaW4oJycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3QsICc9IHRydWU7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JyZWFrOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcrKycsIGosICc7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICcrKycsIGksICc7JyxcbiAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAnZWxzZSB7Jyk7XG4gICAgICAgIH1cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAnd2hpbGUoJywgaSwgJzwnLCBsZW4xLCAnKSB7Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUNvbmRpdGlvbihleHByLm9wLCBbdmFsMSwgJ1snLCBpLCAnXSddLmpvaW4oJycpLCB2YWwyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0LCAnPSB0cnVlOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JyZWFrOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnKysnLCBpLCAnOycsXG4gICAgICAgICAgICAgICAgICAgICd9Jyk7XG5cbiAgICAgICAgaXNSaWdodEFyZ0xpdGVyYWwgfHwgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICd9Jyk7XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgJ30nKTtcblxuICAgICAgICBpZighaXNSaWdodEFyZ0xpdGVyYWwpIHtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICdlbHNlIGlmKCcsIGlzVmFsMkFycmF5LCcpIHsnLFxuICAgICAgICAgICAgICAgIGxlbjIsICc9JywgdmFsMiwgJy5sZW5ndGg7JyxcbiAgICAgICAgICAgICAgICAnd2hpbGUoJywgaSwgJzwnLCBsZW4yLCAnKSB7Jyk7XG4gICAgICAgICAgICAgICAgICAgIHdyaXRlQ29uZGl0aW9uKGV4cHIub3AsIHZhbDEsIFt2YWwyLCAnWycsIGksICddJ10uam9pbignJykpO1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdCwgJz0gdHJ1ZTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2JyZWFrOycsXG4gICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgJysrJywgaSwgJzsnLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICd9Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAnZWxzZSB7JyxcbiAgICAgICAgICAgICAgICBkZXN0LCAnPScsIGJpbmFyeU9wZXJhdG9yc1tleHByLm9wXSh2YWwxLCB2YWwyKSwgJzsnLFxuICAgICAgICAgICAgJ30nKTtcblxuICAgICAgICByZWxlYXNlVmFycyh2YWwxLCB2YWwyLCBpc1ZhbDFBcnJheSwgaXNWYWwyQXJyYXksIGksIGosIGxlbjEsIGxlbjIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdyaXRlQ29uZGl0aW9uKG9wLCB2YWwxRXhwciwgdmFsMkV4cHIpIHtcbiAgICAgICAgYm9keS5wdXNoKCdpZignLCBiaW5hcnlPcGVyYXRvcnNbb3BdKHZhbDFFeHByLCB2YWwyRXhwciksICcpIHsnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVMb2dpY2FsRXhwcihleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIGNvbmRpdGlvblZhcnMgPSBbXSxcbiAgICAgICAgICAgIGFyZ3MgPSBleHByLmFyZ3MsIGxlbiA9IGFyZ3MubGVuZ3RoLFxuICAgICAgICAgICAgaSA9IDAsIHZhbDtcblxuICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0gZmFsc2U7Jyk7XG4gICAgICAgIHN3aXRjaChleHByLm9wKSB7XG4gICAgICAgICAgICBjYXNlICcmJic6XG4gICAgICAgICAgICAgICAgd2hpbGUoaSA8IGxlbikge1xuICAgICAgICAgICAgICAgICAgICBjb25kaXRpb25WYXJzLnB1c2godmFsID0gYWNxdWlyZVZhcigpKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcmdzW2ldLCB2YWwsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaCgnaWYoJywgY29udmVydFRvQm9vbChhcmdzW2krK10sIHZhbCksICcpIHsnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9IHRydWU7Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3x8JzpcbiAgICAgICAgICAgICAgICB3aGlsZShpIDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvblZhcnMucHVzaCh2YWwgPSBhY3F1aXJlVmFyKCkpO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFyZ3NbaV0sIHZhbCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKCcsIGNvbnZlcnRUb0Jvb2woYXJnc1tpXSwgdmFsKSwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdCwgJz0gdHJ1ZTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoaSsrICsgMSA8IGxlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5wdXNoKCdlbHNlIHsnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAtLWxlbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlKGxlbi0tKSB7XG4gICAgICAgICAgICBib2R5LnB1c2goJ30nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbGVhc2VWYXJzLmFwcGx5KG51bGwsIGNvbmRpdGlvblZhcnMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZU1hdGhFeHByKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgdmFsMSA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIHZhbDIgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBhcmdzID0gZXhwci5hcmdzO1xuXG4gICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnc1swXSwgdmFsMSwgY3R4KTtcbiAgICAgICAgdHJhbnNsYXRlRXhwcihhcmdzWzFdLCB2YWwyLCBjdHgpO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgIGRlc3QsICc9JyxcbiAgICAgICAgICAgIGJpbmFyeU9wZXJhdG9yc1tleHByLm9wXShcbiAgICAgICAgICAgICAgICBjb252ZXJ0VG9TaW5nbGVWYWx1ZShhcmdzWzBdLCB2YWwxKSxcbiAgICAgICAgICAgICAgICBjb252ZXJ0VG9TaW5nbGVWYWx1ZShhcmdzWzFdLCB2YWwyKSksXG4gICAgICAgICAgICAnOycpO1xuXG4gICAgICAgIHJlbGVhc2VWYXJzKHZhbDEsIHZhbDIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZVVuYXJ5RXhwcihleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGFyZyA9IGV4cHIuYXJnO1xuXG4gICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnLCB2YWwsIGN0eCk7XG5cbiAgICAgICAgc3dpdGNoKGV4cHIub3ApIHtcbiAgICAgICAgICAgIGNhc2UgJyEnOlxuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPSAhJywgY29udmVydFRvQm9vbChhcmcsIHZhbCkgKyAnOycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICctJzpcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0gLScsIGNvbnZlcnRUb1NpbmdsZVZhbHVlKGFyZywgdmFsKSArICc7Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZWxlYXNlVmFycyh2YWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUNvbmNhdEV4cHIoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciBhcmdWYXJzID0gW10sXG4gICAgICAgICAgICBhcmdzID0gZXhwci5hcmdzLFxuICAgICAgICAgICAgbGVuID0gYXJncy5sZW5ndGgsXG4gICAgICAgICAgICBpID0gMDtcblxuICAgICAgICB3aGlsZShpIDwgbGVuKSB7XG4gICAgICAgICAgICBhcmdWYXJzLnB1c2goYWNxdWlyZVZhcigpKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnc1tpXSwgYXJnVmFyc1tpKytdLCBjdHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9IGNvbmNhdC5jYWxsKCcsIGFyZ1ZhcnMuam9pbignLCcpLCAnKTsnKTtcblxuICAgICAgICByZWxlYXNlVmFycy5hcHBseShudWxsLCBhcmdWYXJzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlc2NhcGVTdHIocykge1xuICAgICAgICByZXR1cm4gJ1xcJycgKyBzLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJykucmVwbGFjZSgvJy9nLCAnXFxcXFxcJycpICsgJ1xcJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIHZhbCwgdG1wQXJyLCBsZW4pIHtcbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgJ2lmKHR5cGVvZiAnLCB2YWwsICchPT0gXCJ1bmRlZmluZWRcIikgeycsXG4gICAgICAgICAgICAgICAgJ2lmKGlzQXJyKCcsIHZhbCwgJykpIHsnKTtcbiAgICAgICAgaWYodG1wQXJyKSB7XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgIGxlbiwgJz4gMT8nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZVB1c2hUb0FycmF5KHRtcEFyciwgdmFsKTtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICc6Jyk7XG4gICAgICAgIH1cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICByZXMsICc9JywgcmVzLCAnLmxlbmd0aD8nLCByZXMsICcuY29uY2F0KCcsIHZhbCwgJykgOicsIHZhbCwgJy5zbGljZSgpJywgJzsnLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAnZWxzZSB7Jyk7XG4gICAgICAgIHRtcEFyciAmJiBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICdpZignLCB0bXBBcnIsICcubGVuZ3RoKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcywgJz0gY29uY2F0LmFwcGx5KCcsIHJlcywgJywnLCB0bXBBcnIsICcpOycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBBcnIsICc9IFtdOycsXG4gICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlubGluZVB1c2hUb0FycmF5KHJlcywgdmFsKTtcbiAgICAgICAgYm9keS5wdXNoKCc7JyxcbiAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAnfScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlubGluZVB1c2hUb0FycmF5KHJlcywgdmFsKSB7XG4gICAgICAgIGJvZHkucHVzaChyZXMsICcubGVuZ3RoPycsIHJlcywgJy5wdXNoKCcsIHZhbCwgJykgOicsICByZXMsICdbMF0gPScsIHZhbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29udmVydFRvQm9vbChhcmcsIHZhck5hbWUpIHtcbiAgICAgICAgc3dpdGNoKGFyZy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5MT0dJQ0FMX0VYUFI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhck5hbWU7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkxJVEVSQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICchIScgKyB2YXJOYW1lO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5QQVRIOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YXJOYW1lICsgJy5sZW5ndGggPiAwJztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gWycodHlwZW9mICcsIHZhck5hbWUsICc9PT0gXCJib29sZWFuXCI/JyxcbiAgICAgICAgICAgICAgICAgICAgdmFyTmFtZSwgJzonLFxuICAgICAgICAgICAgICAgICAgICAnaXNBcnIoJywgdmFyTmFtZSwgJyk/JywgdmFyTmFtZSwgJy5sZW5ndGggPiAwIDogISEnLCB2YXJOYW1lLCAnKSddLmpvaW4oJycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29udmVydFRvU2luZ2xlVmFsdWUoYXJnLCB2YXJOYW1lKSB7XG4gICAgICAgIHN3aXRjaChhcmcudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTWU5UQVguTElURVJBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyTmFtZTtcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguUEFUSDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyTmFtZSArICdbMF0nO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBbJyhpc0FycignLCB2YXJOYW1lLCAnKT8nLCB2YXJOYW1lLCAnWzBdIDogJywgdmFyTmFtZSwgJyknXS5qb2luKCcnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0YXJ0c1dpdGhTdHJpY3QodmFsMSwgdmFsMikge1xuICAgICAgICByZXR1cm4gWyd0eXBlb2YgJywgdmFsMSwgJz09PSBcInN0cmluZ1wiICYmIHR5cGVvZiAnLCB2YWwyLCAnPT09IFwic3RyaW5nXCIgJiYnLFxuICAgICAgICAgICAgdmFsMSwgJy5pbmRleE9mKCcsIHZhbDIsICcpID09PSAwJ10uam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RhcnRzV2l0aCh2YWwxLCB2YWwyKSB7XG4gICAgICAgIHJldHVybiBbdmFsMSwgJyE9IG51bGwgJiYnLCB2YWwyLCAnIT0gbnVsbCAmJicsXG4gICAgICAgICAgICB2YWwxLCAnLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKCcsIHZhbDIsICcudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSA9PT0gMCddLmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZHNXaXRoU3RyaWN0KHZhbDEsIHZhbDIpIHtcbiAgICAgICAgcmV0dXJuIFsndHlwZW9mICcsIHZhbDEsICc9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgJywgdmFsMiwgJz09PSBcInN0cmluZ1wiICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcubGVuZ3RoID49JywgdmFsMiwgJy5sZW5ndGggJiYnLFxuICAgICAgICAgICAgdmFsMSwgJy5sYXN0SW5kZXhPZignLCB2YWwyLCAnKSA9PT0nLCB2YWwxLCAnLmxlbmd0aCAtJywgdmFsMiwgJy5sZW5ndGgnXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRzV2l0aCh2YWwxLCB2YWwyKSB7XG4gICAgICAgIHJldHVybiBbdmFsMSwgJyE9IG51bGwgJiYnLCB2YWwyLCAnIT0gbnVsbCAmJicsXG4gICAgICAgICAgICAnKCcsIHZhbDEsICc9JywgdmFsMSwgJy50b1N0cmluZygpKS5sZW5ndGggPj0nLCAnKCcsIHZhbDIsICc9JywgdmFsMiwgJy50b1N0cmluZygpKS5sZW5ndGggJiYnLFxuICAgICAgICAgICAgJygnLCB2YWwxLCAnLnRvTG93ZXJDYXNlKCkpLmxhc3RJbmRleE9mKCcsICcoJywgdmFsMiwgJy50b0xvd2VyQ2FzZSgpKSkgPT09JyxcbiAgICAgICAgICAgIHZhbDEsICcubGVuZ3RoIC0nLCB2YWwyLCAnLmxlbmd0aCddLmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbnRhaW5zU3RyaWN0KHZhbDEsIHZhbDIpIHtcbiAgICAgICAgcmV0dXJuIFsndHlwZW9mICcsIHZhbDEsICc9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgJywgdmFsMiwgJz09PSBcInN0cmluZ1wiICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcuaW5kZXhPZignLCB2YWwyLCAnKSA+IC0xJ10uam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29udGFpbnModmFsMSwgdmFsMikge1xuICAgICAgICByZXR1cm4gW3ZhbDEsICchPSBudWxsICYmICcsIHZhbDIsICchPSBudWxsICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJywgdmFsMiwgJy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkpID4gLTEnXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICB2YXIgYmluYXJ5T3BlcmF0b3JzID0ge1xuICAgICAgICAgICAgJz09PScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnPT09JyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnPT0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBbJ3R5cGVvZiAnLCB2YWwxLCAnPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mICcsIHZhbDIsICc9PT0gXCJzdHJpbmdcIj8nLFxuICAgICAgICAgICAgICAgICAgICB2YWwxLCAnLnRvTG93ZXJDYXNlKCkgPT09JywgdmFsMiwgJy50b0xvd2VyQ2FzZSgpIDonICtcbiAgICAgICAgICAgICAgICAgICAgdmFsMSwgJz09JywgdmFsMl0uam9pbignJyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnPj0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJz49JyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnPicgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnPicgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJzw9JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICc8PScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJzwnIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJzwnICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICchPT0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJyE9PScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyE9JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICchPScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJ149PScgOiBzdGFydHNXaXRoU3RyaWN0LFxuXG4gICAgICAgICAgICAnPT1eJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhcnRzV2l0aFN0cmljdCh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICdePScgOiBzdGFydHNXaXRoLFxuXG4gICAgICAgICAgICAnPV4nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGFydHNXaXRoKHZhbDIsIHZhbDEpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyQ9PScgOiBlbmRzV2l0aFN0cmljdCxcblxuICAgICAgICAgICAgJz09JCcgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVuZHNXaXRoU3RyaWN0KHZhbDIsIHZhbDEpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyQ9JyA6IGVuZHNXaXRoLFxuXG4gICAgICAgICAgICAnPSQnIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbmRzV2l0aCh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICcqPT0nIDogY29udGFpbnNTdHJpY3QsXG5cbiAgICAgICAgICAgICc9PSonIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluc1N0cmljdCh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICc9KicgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5zKHZhbDIsIHZhbDEpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyo9JyA6IGNvbnRhaW5zLFxuXG4gICAgICAgICAgICAnKycgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnKycgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJy0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJy0nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICcqJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICcqJyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnLycgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnLycgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyUnIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJyUnICsgdmFsMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIHJldHVybiB0cmFuc2xhdGU7XG59KSgpO1xuXG5mdW5jdGlvbiBjb21waWxlKHBhdGgpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24oJ2RhdGEsc3Vic3QnLCB0cmFuc2xhdGUocGFyc2UocGF0aCkpKTtcbn1cblxudmFyIGNhY2hlID0ge30sXG4gICAgY2FjaGVLZXlzID0gW10sXG4gICAgcGFyYW1zID0ge1xuICAgICAgICBjYWNoZVNpemUgOiAxMDBcbiAgICB9LFxuICAgIHNldFBhcmFtc0hvb2tzID0ge1xuICAgICAgICBjYWNoZVNpemUgOiBmdW5jdGlvbihvbGRWYWwsIG5ld1ZhbCkge1xuICAgICAgICAgICAgaWYobmV3VmFsIDwgb2xkVmFsICYmIGNhY2hlS2V5cy5sZW5ndGggPiBuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlZEtleXMgPSBjYWNoZUtleXMuc3BsaWNlKDAsIGNhY2hlS2V5cy5sZW5ndGggLSBuZXdWYWwpLFxuICAgICAgICAgICAgICAgICAgICBpID0gcmVtb3ZlZEtleXMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgd2hpbGUoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYWNoZVtyZW1vdmVkS2V5c1tpXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxudmFyIGRlY2wgPSBmdW5jdGlvbihwYXRoLCBjdHgsIHN1YnN0cykge1xuICAgIGlmKCFjYWNoZVtwYXRoXSkge1xuICAgICAgICBjYWNoZVtwYXRoXSA9IGNvbXBpbGUocGF0aCk7XG4gICAgICAgIGlmKGNhY2hlS2V5cy5wdXNoKHBhdGgpID4gcGFyYW1zLmNhY2hlU2l6ZSkge1xuICAgICAgICAgICAgZGVsZXRlIGNhY2hlW2NhY2hlS2V5cy5zaGlmdCgpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjYWNoZVtwYXRoXShjdHgsIHN1YnN0cyB8fCB7fSk7XG59O1xuXG5kZWNsLnZlcnNpb24gPSAnMC40LjAnO1xuXG5kZWNsLnBhcmFtcyA9IGZ1bmN0aW9uKF9wYXJhbXMpIHtcbiAgICBpZighYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cblxuICAgIGZvcih2YXIgbmFtZSBpbiBfcGFyYW1zKSB7XG4gICAgICAgIGlmKF9wYXJhbXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAgIHNldFBhcmFtc0hvb2tzW25hbWVdICYmIHNldFBhcmFtc0hvb2tzW25hbWVdKHBhcmFtc1tuYW1lXSwgX3BhcmFtc1tuYW1lXSk7XG4gICAgICAgICAgICBwYXJhbXNbbmFtZV0gPSBfcGFyYW1zW25hbWVdO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZGVjbC5jb21waWxlID0gY29tcGlsZTtcblxuZGVjbC5hcHBseSA9IGRlY2w7XG5cbmlmKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRlY2w7XG59XG5lbHNlIGlmKHR5cGVvZiBtb2R1bGVzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZXMuZGVmaW5lKCdqc3BhdGgnLCBmdW5jdGlvbihwcm92aWRlKSB7XG4gICAgICAgIHByb3ZpZGUoZGVjbCk7XG4gICAgfSk7XG59XG5lbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24ocmVxdWlyZSwgZXhwb3J0cywgbW9kdWxlKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZGVjbDtcbiAgICB9KTtcbn1cbmVsc2Uge1xuICAgIHdpbmRvdy5KU1BhdGggPSBkZWNsO1xufVxuXG59KSgpO1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEVTNiBFWFRFTlNJT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pZighU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoKVxue1xuXHRTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGggPSBmdW5jdGlvbihzKVxuXHR7XG5cdFx0Y29uc3QgYmFzZSA9IDB4MDAwMDAwMDAwMDAwMDAwMDAwMDA7XG5cblx0XHRyZXR1cm4gdGhpcy5pbmRleE9mKHMsIGJhc2UpID09PSBiYXNlO1xuXHR9O1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pZighU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aClcbntcblx0U3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCA9IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRjb25zdCBiYXNlID0gdGhpcy5sZW5ndGggLSBzLmxlbmd0aDtcblxuXHRcdHJldHVybiB0aGlzLmluZGV4T2YocywgYmFzZSkgPT09IGJhc2U7XG5cdH07XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBKUVVFUlkgRVhURU5TSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxudmFyIF9hbWlfaW50ZXJuYWxfalF1ZXJ5RWFjaCA9IGpRdWVyeS5lYWNoO1xudmFyIF9hbWlfaW50ZXJuYWxfalF1ZXJ5QWpheCA9IGpRdWVyeS5hamF4O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5qUXVlcnkuZWFjaCA9IGZ1bmN0aW9uKGVsLCBjYWxsYmFjaywgY29udGV4dClcbntcblx0cmV0dXJuIF9hbWlfaW50ZXJuYWxfalF1ZXJ5RWFjaChlbCwgY29udGV4dCA/IChpbmRleCwgdmFsdWUpID0+IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgaW5kZXgsIHZhbHVlKSA6IGNhbGxiYWNrKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmpRdWVyeS5hamF4ID0gZnVuY3Rpb24oc2V0dGluZ3MpXG57XG5cdGlmKHR5cGVvZiBzZXR0aW5ncyA9PT0gJ29iamVjdCdcblx0ICAgJiZcblx0ICAgc2V0dGluZ3MuZGF0YVR5cGUgPT09ICdzaGVldCdcblx0ICkge1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0LCB1cmxdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0JywgJ3VybCddLFxuXHRcdFx0W3Jlc3VsdCwgJyddLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpXG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHVybClcblx0XHR7XG5cdFx0XHQkKCdoZWFkJykuYXBwZW5kKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIicgKyB1cmwgKyAnXCI+PC9saW5rPicpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH1cblx0ZWxzZVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gX2FtaV9pbnRlcm5hbF9qUXVlcnlBamF4LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fVxufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmaW5kV2l0aFNlbGY6IGZ1bmN0aW9uKHNlbGVjdG9yKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZmluZChzZWxlY3RvcikuYWRkQmFjayhzZWxlY3Rvcik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNlcmlhbGl6ZU9iamVjdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0ge307XG5cblx0XHR0aGlzLnNlcmlhbGl6ZUFycmF5KCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRpZihpdGVtLm5hbWUgaW4gcmVzdWx0KVxuXHRcdFx0e1xuXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocmVzdWx0W2l0ZW0ubmFtZV0pID09PSAnW29iamVjdCBTdHJpbmddJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdFtpdGVtLm5hbWVdID0gW3Jlc3VsdFtpdGVtLm5hbWVdXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlc3VsdFtpdGVtLm5hbWVdLnB1c2goaXRlbS52YWx1ZSB8fCAnJyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZSB8fCAnJztcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBCT09UU1RSQVAgRVhURU5TSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxudmFyIF9hbWlfaW50ZXJuYWxfbW9kYWxaSW5kZXggPSAxMDUwO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kKGRvY3VtZW50KS5vbignc2hvdy5icy5tb2RhbCcsICcubW9kYWwnLCAoZSkgPT4ge1xuXG5cdGNvbnN0IGVsID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXG5cdHNldFRpbWVvdXQoKCkgPT4ge1xuXG5cdFx0JCgnYm9keSA+IC5tb2RhbC1iYWNrZHJvcDpsYXN0JykuY3NzKCd6LWluZGV4JywgX2FtaV9pbnRlcm5hbF9tb2RhbFpJbmRleCsrKTtcblx0XHQvKi0tLS0tLS0tLS0tKi9lbC8qLS0tLS0tLS0tLS0qLy5jc3MoJ3otaW5kZXgnLCBfYW1pX2ludGVybmFsX21vZGFsWkluZGV4KyspO1xuXG5cdH0sIDEwKTtcbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kKGRvY3VtZW50KS5vbignc2hvdy5icy5kcm9wZG93bicsICcuZHJvcGRvd24nLCAoZSkgPT4ge1xuXG5cdGNvbnN0IGVsID0gJChlLmN1cnJlbnRUYXJnZXQpO1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogTkFNRVNQQUNFIEhFTFBFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIF8kY3JlYXRlTmFtZXNwYWNlKCRuYW1lLCB4KVxue1xuXHRsZXQgcGFyZW50ID0gd2luZG93O1xuXG5cdGNvbnN0IHBhcnRzID0gJG5hbWUuc3BsaXQoL1xccypcXC5cXHMqL2cpLCBsID0gcGFydHMubGVuZ3RoIC0gMTtcblxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbDsgaSsrKVxuXHR7XG5cdFx0aWYocGFyZW50W3BhcnRzW2ldXSlcblx0XHR7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cGFyZW50ID0gcGFyZW50W3BhcnRzW2ldXSA9IHt9O1xuXHRcdH1cblx0fVxuXG5cdHBhcmVudFtwYXJ0c1tpXV0gPSB4O1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5mdW5jdGlvbiBfJGFkZFRvTmFtZXNwYWNlKCRuYW1lLCB4KVxue1xuXHRsZXQgcGFyZW50ID0gd2luZG93O1xuXG5cdGNvbnN0IHBhcnRzID0gJG5hbWUuc3BsaXQoL1xccypcXC5cXHMqL2cpLCBsID0gcGFydHMubGVuZ3RoIC0gMTtcblxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbDsgaSsrKVxuXHR7XG5cdFx0aWYocGFyZW50W3BhcnRzW2ldXSlcblx0XHR7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2AnICsgJG5hbWUgKyAnYCAoYCcgKyBwYXJ0c1tpXSArICdgKSBub3QgZGVjbGFyZWQnO1xuXHRcdH1cblx0fVxuXG5cdHBhcmVudFtwYXJ0c1tpXV0gPSB4O1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogTkFNRVNQQUNFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICAqIENyZWF0ZSBhIG5ldyBuYW1lc3BhY2VcbiAgKiBAcGFyYW0ge1N0cmluZ30gJG5hbWUgdGhlIG5hbWVzcGFjZSBuYW1lXG4gICogQHBhcmFtIHtPYmplY3R9IFskZGVzY3JdIHRoZSBuYW1lc3BhY2UgYm9keVxuICAqL1xuXG5mdW5jdGlvbiAkQU1JTmFtZXNwYWNlKCRuYW1lLCAkZGVzY3IpXG57XG5cdGlmKCEkZGVzY3IpXG5cdHtcblx0XHQkZGVzY3IgPSB7fTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZGVzY3IuJG5hbWUgPSAkbmFtZTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XyRjcmVhdGVOYW1lc3BhY2UoJG5hbWUsICRkZXNjcik7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGlmKCRkZXNjci4kKVxuXHR7XG5cdFx0JGRlc2NyLiQuYXBwbHkoJGRlc2NyKTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIElOVEVSRkFDRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAgKiBDcmVhdGUgYSBuZXcgaW50ZXJmYWNlXG4gICogQHBhcmFtIHtTdHJpbmd9ICRuYW1lIHRoZSBpbnRlcmZhY2UgbmFtZVxuICAqIEBwYXJhbSB7T2JqZWN0fSBbJGRlc2NyXSB0aGUgaW50ZXJmYWNlIGJvZHlcbiAgKi9cblxuZnVuY3Rpb24gJEFNSUludGVyZmFjZSgkbmFtZSwgJGRlc2NyKVxue1xuXHRpZighJGRlc2NyKVxuXHR7XG5cdFx0JGRlc2NyID0ge307XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y29uc3QgJGNsYXNzID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhyb3cgJ2NvdWxkIG5vciBpbnN0YW50aWF0ZSBpbnRlcmZhY2UnO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpZigkZGVzY3IuJGV4dGVuZHMpXG5cdHtcblx0XHR0aHJvdyAnYCRleHRlbmRzYCBub3QgYWxsb3dlZCBmb3IgaW50ZXJmYWNlJztcblx0fVxuXG5cdGlmKCRkZXNjci4kaW1wbGVtZW50cylcblx0e1xuXHRcdHRocm93ICdgJGltcGxlbWVudHNgIG5vdCBhbGxvd2VkIGZvciBpbnRlcmZhY2UnO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGlmKCRkZXNjci4kKVxuXHR7XG5cdFx0dGhyb3cgJ2AkYCBub3QgYWxsb3dlZCBmb3IgaW50ZXJmYWNlJztcblx0fVxuXG5cdGlmKCRkZXNjci4kaW5pdClcblx0e1xuXHRcdHRocm93ICdgJGluaXRgIG5vdCBhbGxvd2VkIGZvciBpbnRlcmZhY2UnO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRjbGFzcy4kbmFtZSA9ICRuYW1lO1xuXHQkY2xhc3MuJGNsYXNzID0gJGNsYXNzO1xuXHQkY2xhc3MuJG1lbWJlcnMgPSAkZGVzY3I7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF8kYWRkVG9OYW1lc3BhY2UoJG5hbWUsICRjbGFzcyk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogQ0xBU1NFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICAqIENyZWF0ZSBhIG5ldyBjbGFzc1xuICAqIEBwYXJhbSB7U3RyaW5nfSAkbmFtZSB0aGUgY2xhc3MgbmFtZVxuICAqIEBwYXJhbSB7T2JqZWN0fSBbJGRlc2NyXSB0aGUgY2xhc3MgYm9keVxuICAqL1xuXG5mdW5jdGlvbiAkQU1JQ2xhc3MoJG5hbWUsICRkZXNjcilcbntcblx0aWYoISRkZXNjcilcblx0e1xuXHRcdCRkZXNjciA9IHt9O1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNvbnN0ICRzdXBlciA9ICgkZGVzY3IuJGV4dGVuZHMgaW5zdGFuY2VvZiBGdW5jdGlvbikgPyAkZGVzY3IuJGV4dGVuZHMucHJvdG90eXBlIDoge307XG5cblx0Y29uc3QgJHN1cGVyX2ltcGxlbWVudHMgPSAoJHN1cGVyLiRpbXBsZW1lbnRzIGluc3RhbmNlb2YgQXJyYXkpID8gJHN1cGVyLiRpbXBsZW1lbnRzIDogW107XG5cdGNvbnN0ICRkZXNjcl9pbXBsZW1lbnRzID0gKCRkZXNjci4kaW1wbGVtZW50cyBpbnN0YW5jZW9mIEFycmF5KSA/ICRkZXNjci4kaW1wbGVtZW50cyA6IFtdO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjb25zdCAkY2xhc3MgPSBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGZvcihjb25zdCBpIGluIHRoaXMuJGltcGxlbWVudHMpXG5cdFx0e1xuXHRcdFx0aWYodGhpcy4kaW1wbGVtZW50cy5oYXNPd25Qcm9wZXJ0eShpKSlcblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgJGludGVyZmFjZSA9IHRoaXMuJGltcGxlbWVudHNbaV07XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gJGludGVyZmFjZS4kbWVtYmVycylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKCRpbnRlcmZhY2UuJG1lbWJlcnMuaGFzT3duUHJvcGVydHkoaikpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Y29uc3QgJG1lbWJlciA9ICRpbnRlcmZhY2UuJG1lbWJlcnNbal07XG5cblx0XHRcdFx0XHRcdGlmKHR5cGVvZih0aGlzW2pdKSAhPT0gdHlwZW9mKCRtZW1iZXIpKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aHJvdyAnY2xhc3MgYCcgKyB0aGlzLiRuYW1lICsgJ2Agd2l0aCBtdXN0IGltcGxlbWVudCBgJyArICRpbnRlcmZhY2UuJG5hbWUgKyAnLicgKyBqICsgJ2AnO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgX3N1cGVyID0gdGhpcy4kY2xhc3MuX2ludGVybmFsX3N1cGVyO1xuXHRcdGNvbnN0IF9hZGRlZCA9IHRoaXMuJGNsYXNzLl9pbnRlcm5hbF9hZGRlZDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy4kc3VwZXIgPSB7fTtcblxuXHRcdGZvcihjb25zdCBuYW1lIGluIF9zdXBlcilcblx0XHR7XG5cdFx0XHRpZihfc3VwZXIuaGFzT3duUHJvcGVydHkobmFtZSkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuJHN1cGVyW25hbWVdID0gKChfc3VwZXIsIG5hbWUsIHRoYXQpID0+IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0cmV0dXJuIF9zdXBlcltuYW1lXS5hcHBseSh0aGF0LCBhcmd1bWVudHMpXG5cblx0XHRcdFx0fSkoX3N1cGVyLCBuYW1lLCB0aGlzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuJGFkZGVkID0ge307XG5cblx0XHRmb3IoY29uc3QgbmFtZSBpbiBfYWRkZWQpXG5cdFx0e1xuXHRcdFx0aWYoX2FkZGVkLmhhc093blByb3BlcnR5KG5hbWUpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLiRhZGRlZFtuYW1lXSA9ICgoX2FkZGVkLCBuYW1lLCB0aGF0KSA9PiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdHJldHVybiBfYWRkZWRbbmFtZV0uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcblxuXHRcdFx0XHR9KShfYWRkZWQsIG5hbWUsIHRoaXMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy4kaW5pdClcblx0XHR7XG5cdFx0XHR0aGlzLiRpbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRjbGFzcy5faW50ZXJuYWxfc3VwZXIgPSB7fTtcblx0JGNsYXNzLl9pbnRlcm5hbF9hZGRlZCA9IHt9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3IoY29uc3QgbmFtZSBpbiAkc3VwZXIpXG5cdHtcblx0XHRpZihuYW1lID09PSAnJGluaXQnXG5cdFx0ICAgfHxcblx0XHQgICBuYW1lLmNoYXJBdCgwKSAhPT0gJyQnXG5cdFx0ICAgfHxcblx0XHQgICAkc3VwZXIuaGFzT3duUHJvcGVydHkobmFtZSlcblx0XHQgKSB7XG5cdFx0XHQkY2xhc3MuX2ludGVybmFsX3N1cGVyW25hbWVdID0gJHN1cGVyW25hbWVdO1xuXG5cdFx0XHQkY2xhc3MucHJvdG90eXBlW25hbWVdID0gJHN1cGVyW25hbWVdO1xuXHRcdH1cblx0fVxuXG5cdGZvcihjb25zdCBuYW1lIGluICRkZXNjcilcblx0e1xuXHRcdGlmKG5hbWUgPT09ICckaW5pdCdcblx0XHQgICB8fFxuXHRcdCAgIG5hbWUuY2hhckF0KDApICE9PSAnJCdcblx0XHQgICB8fFxuXHRcdCAgICRkZXNjci5oYXNPd25Qcm9wZXJ0eShuYW1lKVxuXHRcdCApIHtcblx0XHRcdCRjbGFzcy5faW50ZXJuYWxfYWRkZWRbbmFtZV0gPSAkZGVzY3JbbmFtZV07XG5cblx0XHRcdCRjbGFzcy5wcm90b3R5cGVbbmFtZV0gPSAkZGVzY3JbbmFtZV07XG5cdFx0fVxuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRjbGFzcy5wcm90b3R5cGUuJG5hbWUgPSAkbmFtZTtcblx0JGNsYXNzLnByb3RvdHlwZS4kY2xhc3MgPSAkY2xhc3M7XG5cdCRjbGFzcy5wcm90b3R5cGUuJGltcGxlbWVudHMgPSAkc3VwZXJfaW1wbGVtZW50cy5jb25jYXQoJGRlc2NyX2ltcGxlbWVudHMpO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfJGFkZFRvTmFtZXNwYWNlKCRuYW1lLCAkY2xhc3MpO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpZigkZGVzY3IuJClcblx0e1xuXHRcdCRkZXNjci4kLmFwcGx5KCRjbGFzcyk7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBOb2RlSlMgRVhURU5TSU9OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaWYodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKVxue1xuXHRtb2R1bGUuZXhwb3J0cy5OYW1lc3BhY2UgPSAkQU1JTmFtZXNwYWNlO1xuXHRtb2R1bGUuZXhwb3J0cy5JbnRlcmZhY2UgPSAkQU1JSW50ZXJmYWNlO1xuXHRtb2R1bGUuZXhwb3J0cy4gIENsYXNzICAgPSAgICRBTUlDbGFzcyAgO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogSlFVRVJZIEVYVEVOU0lPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmlmKHR5cGVvZiBqUXVlcnkgIT09ICd1bmRlZmluZWQnKVxue1xuXHRqUXVlcnkuTmFtZXNwYWNlID0gJEFNSU5hbWVzcGFjZTtcblx0alF1ZXJ5LkludGVyZmFjZSA9ICRBTUlJbnRlcmZhY2U7XG5cdGpRdWVyeS4gIENsYXNzICAgPSAgICRBTUlDbGFzcyAgO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgQU1JIHVybCByb3V0aW5nIHN1YnN5c3RlbVxuICogQG5hbWVzcGFjZSBhbWlSb3V0ZXJcbiAqL1xuXG4kQU1JTmFtZXNwYWNlKCdhbWlSb3V0ZXInLCAvKiogQGxlbmRzIGFtaVJvdXRlciAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFJJVkFURSBNRU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3NjcmlwdFVSTDogJycsXG5cdF9vcmlnaW5VUkw6ICcnLFxuXHRfd2ViQXBwVVJMOiAnJyxcblxuXHRfaGFzaDogJycsXG5cdF9hcmdzOiBbXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3JvdXRlczogW10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQUklWQVRFIE1FVEhPRFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZWF0U2xhc2hlczogZnVuY3Rpb24odXJsKVxuXHR7XG5cdFx0dXJsID0gdXJsLnRyaW0oKTtcblxuXHRcdHdoaWxlKHVybFt1cmwubGVuZ3RoIC0gMV0gPT09ICcvJylcblx0XHR7XG5cdFx0XHR1cmwgPSB1cmwuc3Vic3RyaW5nKDAsIHVybC5sZW5ndGggLSAxKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdXJsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogU1RBVElDIENPTlNUUlVDVE9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLl9hcmdzLmxlbmd0aCA9IDA7XG5cdFx0dGhpcy5fcm91dGVzLmxlbmd0aCA9IDA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0ICBocmVmICA9IHdpbmRvdy5sb2NhdGlvbi4gaHJlZiAudHJpbSgpO1xuXHRcdGNvbnN0ICBoYXNoICA9IHdpbmRvdy5sb2NhdGlvbi4gaGFzaCAudHJpbSgpO1xuXHRcdGNvbnN0IHNlYXJjaCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gudHJpbSgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogU0NSSVBUX1VSTCBBTkQgT1JJR0lOX1VSTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRmb3IobGV0IGlkeCwgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdGlkeCA9IHNjcmlwdHNbaV0uc3JjLmluZGV4T2YoJ2pzL2FtaS4nKTtcblxuXHRcdFx0aWYoaWR4ID4gMClcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5fc2NyaXB0VVJMID0gc2NyaXB0c1tpXS5zcmM7XG5cblx0XHRcdFx0dGhpcy5fb3JpZ2luVVJMID0gdGhpcy5fZWF0U2xhc2hlcyhcblx0XHRcdFx0XHR0aGlzLl9zY3JpcHRVUkwuc3Vic3RyaW5nKDAsIGlkeClcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBXRUJBUFBfVVJMICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuX3dlYkFwcFVSTCA9IHRoaXMuX2VhdFNsYXNoZXMoXG5cdFx0XHRocmVmLnJlcGxhY2UoLyg/OlxcI3xcXD8pLiokLywgJycpXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEhBU0ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5faGFzaCA9IHRoaXMuX2VhdFNsYXNoZXMoXG5cdFx0XHRoYXNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXD8uKiQvLCAnJylcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQVJHUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihzZWFyY2gpXG5cdFx0e1xuXHRcdFx0c2VhcmNoLnN1YnN0cmluZygxKS5zcGxpdCgnJicpLmZvckVhY2goKHBhcmFtKSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgcGFydHMgPSBwYXJhbS5zcGxpdCgnPScpO1xuXG5cdFx0XHRcdC8qKi8gaWYocGFydHMubGVuZ3RoID09PSAxKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5fYXJnc1tkZWNvZGVVUklDb21wb25lbnQocGFydHNbMF0pXSA9IC8qLS0tLS0tLS0qLyAnJyAvKi0tLS0tLS0tKi87XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZihwYXJ0cy5sZW5ndGggPT09IDIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLl9hcmdzW2RlY29kZVVSSUNvbXBvbmVudChwYXJ0c1swXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQVUJMSUMgTUVUSE9EUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIEFXRidzIHNjcmlwdCBVUkxcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBBV0YncyBzY3JpcHQgVVJMXG5cdCAgKi9cblxuXHRnZXRTY3JpcHRVUkw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zY3JpcHRVUkw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgb3JpZ2luIFVSTFxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIG9yaWdpbiBVUkxcblx0ICAqL1xuXG5cdGdldE9yaWdpblVSTDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX29yaWdpblVSTDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgd2ViYXBwIFVSTFxuXHQgICovXG5cblx0Z2V0V2ViQXBwVVJMOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fd2ViQXBwVVJMO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIGFuY2hvciBwYXJ0IG9mIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgYW5jaG9yIHBhcnQgb2YgdGhlIHdlYmFwcCBVUkxcblx0ICAqL1xuXG5cdGdldEhhc2g6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9oYXNoO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFxuXHQgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IFRoZSBhcmd1bWVudHMgZXh0cmFjdGVkIGZyb20gdGhlIHdlYmFwcCBVUkxcblx0ICAqL1xuXG5cdGdldEFyZ3M6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9hcmdzO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFwcGVuZHMgYSByb3V0aW5nIHJ1bGVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSByZWdFeHAgdGhlIHJlZ0V4cFxuXHQgICogQHBhcmFtIHtPYmplY3R9IGhhbmRsZXIgdGhlIGhhbmRsZXJcblx0ICAqIEByZXR1cm5zIHtOYW1lc3BhY2V9IFRoZSBhbWlSb3V0ZXIgc2luZ2xldG9uXG5cdCAgKi9cblxuXHRhcHBlbmQ6IGZ1bmN0aW9uKHJlZ0V4cCwgaGFuZGxlcilcblx0e1xuXHRcdHRoaXMuX3JvdXRlcy51bnNoaWZ0KHtcblx0XHRcdHJlZ0V4cDogcmVnRXhwLFxuXHRcdFx0aGFuZGxlcjogaGFuZGxlcixcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFJlbW92ZXMgc29tZSByb3V0aW5nIHJ1bGVzXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcmVnRXhwIHRoZSByZWdFeHBcblx0ICAqIEByZXR1cm5zIHtOYW1lc3BhY2V9IFRoZSBhbWlSb3V0ZXIgc2luZ2xldG9uXG5cdCAgKi9cblxuXHRyZW1vdmU6IGZ1bmN0aW9uKHJlZ0V4cClcblx0e1xuXHRcdHRoaXMuX3JvdXRlcyA9IHRoaXMuX3JvdXRlcy5maWx0ZXIoKHJvdXRlKSA9PiB7XG5cblx0XHRcdHJldHVybiByb3V0ZS5yZWdFeHAudG9TdHJpbmcoKSAhPT0gcmVnRXhwLnRvU3RyaW5nKCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDaGVja3Mgd2hldGhlciB0aGUgVVJMIG1hdGNoZXMgd2l0aCBhIHJvdXRpbmcgcnVsZVxuXHQgICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAgKi9cblxuXHRjaGVjazogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG07XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fcm91dGVzLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdG0gPSB0aGlzLl9oYXNoLm1hdGNoKHRoaXMuX3JvdXRlc1tpXS5yZWdFeHApO1xuXG5cdFx0XHRpZihtKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLl9yb3V0ZXNbaV0uaGFuZGxlci5hcHBseShhbWlSb3V0ZXIsIG0pO1xuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBcHBlbmQgYSBuZXcgaGlzdG9yeSBlbnRyeVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggdGhlIG5ldyBwYXRoXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHQ9bnVsbF0gdGhlIG5ldyBjb250ZXh0XG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGFwcGVuZEhpc3RvcnlFbnRyeTogZnVuY3Rpb24ocGF0aCwgY29udGV4dCA9IG51bGwpXG5cdHtcblx0XHRpZihoaXN0b3J5LnB1c2hTdGF0ZSlcblx0XHR7XG5cdFx0XHRoaXN0b3J5LnB1c2hTdGF0ZShjb250ZXh0LCBudWxsLCB0aGlzLl93ZWJBcHBVUkwgKyB0aGlzLl9lYXRTbGFzaGVzKHBhdGgpKTtcblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFJlcGxhY2UgdGhlIGN1cnJlbnQgaGlzdG9yeSBlbnRyeVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggdGhlIG5ldyBwYXRoXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHQ9bnVsbF0gdGhlIG5ldyBjb250ZXh0XG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdHJlcGxhY2VIaXN0b3J5RW50cnk6IGZ1bmN0aW9uKHBhdGgsIGNvbnRleHQgPSBudWxsKVxuXHR7XG5cdFx0aWYoaGlzdG9yeS5yZXBsYWNlU3RhdGUpXG5cdFx0e1xuXHRcdFx0aGlzdG9yeS5yZXBsYWNlU3RhdGUoY29udGV4dCwgbnVsbCwgdGhpcy5fd2ViQXBwVVJMICsgdGhpcy5fZWF0U2xhc2hlcyhwYXRoKSk7XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSU5hbWVzcGFjZSgnYW1pJywge1xuXG5cdHZlcnNpb246ICcwLjAuMScsXG5cdGNvbW1pdF9pZDogJ3t7QU1JX0NPTU1JVF9JRH19Jyxcbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogSU5URVJOQUwgRlVOQ1RJT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIF9hbWlfaW50ZXJuYWxfdGhlbihkZWZlcnJlZCwgZG9uZUZ1bmMsIGZhaWxGdW5jKVxue1xuXHRpZihkZWZlcnJlZCAmJiBkZWZlcnJlZC50aGVuKVxuXHR7XG5cdFx0ZGVmZXJyZWQudGhlbihkb25lRnVuYywgZmFpbEZ1bmMpO1xuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdGRvbmVGdW5jKCk7XG5cdH1cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZnVuY3Rpb24gX2FtaV9pbnRlcm5hbF9hbHdheXMoZGVmZXJyZWQsIGFsd2F5c0Z1bmMpXG57XG5cdGlmKGRlZmVycmVkICYmIGRlZmVycmVkLmFsd2F5cylcblx0e1xuXHRcdGRlZmVycmVkLmFsd2F5cyhhbHdheXNGdW5jKTtcblx0fVxuXHRlbHNlXG5cdHtcblx0XHRhbHdheXNGdW5jKCk7XG5cdH1cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVdlYkFwcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBBTUkgd2ViYXBwIHN1YnN5c3RlbVxuICogQG5hbWVzcGFjZSBhbWlXZWJBcHBcbiAqL1xuXG4kQU1JTmFtZXNwYWNlKCdhbWlXZWJBcHAnLCAvKiogQGxlbmRzIGFtaVdlYkFwcCAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFJJVkFURSBNRU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2lkUmVnRXhwOiBuZXcgUmVnRXhwKCdbYS16QS1aXVthLXpBLVowLTldezd9X1thLXpBLVowLTldezR9X1thLXpBLVowLTldezR9X1thLXpBLVowLTldezR9X1thLXpBLVowLTldezEyfScsICdnJyksXG5cblx0X2xpbmtFeHA6IG5ldyBSZWdFeHAoJ1xcXFxbKFteXFxcXF1dKilcXFxcXVxcXFwoKFteXFxcXCldKilcXFxcKScsICdnJyksXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9lbWJlZGRlZDogZmFsc2UsXG5cdF9ub0Jvb3RzdHJhcDogZmFsc2UsXG5cdF9ub0RhdGVUaW1lUGlja2VyOiBmYWxzZSxcblx0X25vU2VsZWN0MjogZmFsc2UsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9nbG9iYWxEZWZlcnJlZDogJC5EZWZlcnJlZCgpLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfc2hlZXRzOiBbXSxcblx0X3NjcmlwdHM6IFtdLFxuXG5cdF9jb250cm9sczoge30sXG5cdF9zdWJhcHBzOiB7fSxcblxuXHRfaXNSZWFkeTogZmFsc2UsXG5cdF9jYW5MZWF2ZTogdHJ1ZSxcblx0X2xvY2tDbnQ6IDB4MDAsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9jdXJyZW50U3ViQXBwSW5zdGFuY2U6IG5ldyBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLm9uUmVhZHkgPSBmdW5jdGlvbigpIHt9O1xuXHRcdHRoaXMub25FeGl0ID0gZnVuY3Rpb24oKSB7fTtcblx0XHR0aGlzLm9uTG9naW4gPSBmdW5jdGlvbigpIHt9O1xuXHRcdHRoaXMub25Mb2dvdXQgPSBmdW5jdGlvbigpIHt9O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBUaGUgb3JpZ2luIFVSTFxuXHQgICogQHR5cGUge1N0cmluZ31cblx0ICAqL1xuXG5cdG9yaWdpblVSTDogJy8nLFxuXG5cdC8qKlxuXHQgICogVGhlIHdlYmFwcCBVUkxcblx0ICAqIEB0eXBlIHtTdHJpbmd9XG5cdCAgKi9cblxuXHR3ZWJBcHBVUkw6ICcvJyxcblxuXHQvKipcblx0ICAqIFRoZSBhbmNob3IgcGFydCBvZiB0aGUgd2ViYXBwIFVSTFxuXHQgICogQHR5cGUge1N0cmluZ31cblx0ICAqL1xuXG5cdGhhc2g6ICcnLFxuXG5cdC8qKlxuXHQgICogVGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFxuXHQgICogQHR5cGUge0FycmF5PFN0cmluZz59XG5cdCAgKi9cblxuXHRhcmdzOiB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNUQVRJQyBDT05TVFJVQ1RPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEdFVCBGTEFHUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdXJsID0gYW1pUm91dGVyLmdldFNjcmlwdFVSTCgpO1xuXG5cdFx0Y29uc3QgaWR4ID0gdXJsLmluZGV4T2YoJz8nKTtcblxuXHRcdGlmKGlkeCA+IDApXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgZmxhZ3MgPSB1cmwuc3Vic3RyaW5nKGlkeCkudG9Mb3dlckNhc2UoKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0dGhpcy5fZW1iZWRkZWQgPSAoZmxhZ3MuaW5kZXhPZignZW1iZWRkZWQnKSA+PSAwKTtcblxuXHRcdFx0dGhpcy5fbm9Cb290c3RyYXAgPSAoZmxhZ3MuaW5kZXhPZignbm9ib290c3RyYXAnKSA+PSAwKTtcblxuXHRcdFx0dGhpcy5fbm9EYXRlVGltZVBpY2tlciA9IChmbGFncy5pbmRleE9mKCdub2RhdGV0aW1lcGlja2VyJykgPj0gMCk7XG5cblx0XHRcdHRoaXMuX25vU2VsZWN0MiA9IChmbGFncy5pbmRleE9mKCdub3NlbGVjdDInKSA+PSAwKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBHRVQgVVJMUywgSEFTSCBBTkQgQVJHUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMub3JpZ2luVVJMID0gYW1pUm91dGVyLmdldE9yaWdpblVSTCgpO1xuXHRcdHRoaXMud2ViQXBwVVJMID0gYW1pUm91dGVyLmdldFdlYkFwcFVSTCgpO1xuXG5cdFx0dGhpcy5oYXNoID0gYW1pUm91dGVyLmdldEhhc2goKTtcblx0XHR0aGlzLmFyZ3MgPSBhbWlSb3V0ZXIuZ2V0QXJncygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTE9BRCBTSEVFVFMgQU5EIFNDUklQVFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCByZXNvdXJjZXNDU1MgPSBbXTtcblx0XHRjb25zdCByZXNvdXJjZXNKUyA9IFtdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighd2luZG93LlBvcHBlcikge1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvcG9wcGVyLm1pbi5qcycpO1xuXHRcdH1cblxuXHRcdGlmKCF3aW5kb3cubW9tZW50KSB7XG5cdFx0XHRyZXNvdXJjZXNKUy5wdXNoKHRoaXMub3JpZ2luVVJMICsgJy9qcy9tb21lbnQubWluLmpzJyk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighdGhpcy5fbm9Cb290c3RyYXAgJiYgKHR5cGVvZiBqUXVlcnkuZm4ubW9kYWwpICE9PSAnZnVuY3Rpb24nKVxuXHRcdHtcblx0XHRcdHJlc291cmNlc0NTUy5wdXNoKHRoaXMub3JpZ2luVVJMICsgJy9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnKTtcblx0XHRcdHJlc291cmNlc0pTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2pzL2Jvb3RzdHJhcC5taW4uanMnKTtcblx0XHR9XG5cblx0XHRpZighdGhpcy5fbm9EYXRlVGltZVBpY2tlciAmJiAodHlwZW9mIGpRdWVyeS5mbi5kYXRldGltZXBpY2tlcikgIT09ICdmdW5jdGlvbicpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzQ1NTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXIubWluLmNzcycpO1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyLm1pbi5qcycpO1xuXHRcdH1cblxuXHRcdGlmKCF0aGlzLl9ub1NlbGVjdDIgJiYgKHR5cGVvZiBqUXVlcnkuZm4uc2VsZWN0MikgIT09ICdmdW5jdGlvbicpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzQ1NTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9zZWxlY3QyLm1pbi5jc3MnKTtcblx0XHRcdHJlc291cmNlc0pTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2pzL3NlbGVjdDIubWluLmpzJyk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0Li4ucmVzb3VyY2VzQ1NTLFxuXHRcdFx0dGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzcycsXG5cdFx0XHR0aGlzLm9yaWdpblVSTCArICcvY3NzL2FtaS5taW4uY3NzJyxcblx0XHRcdC4uLnJlc291cmNlc0pTLFxuXHRcdF0pLmRvbmUoKC8qLS0tKi8pID0+IHtcblxuXHRcdFx0dGhpcy5fZ2xvYmFsRGVmZXJyZWQucmVzb2x2ZSgvKi0tLSovKTtcblxuXHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZ2xvYmFsRGVmZXJyZWQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBNT0RFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENoZWNrcyB3aGV0aGVyIHRoZSBXZWJBcHAgaXMgZXhlY3V0ZWQgaW4gZW1iZWRkZWQgbW9kZVxuXHQgICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAgKi9cblxuXHRpc0VtYmVkZGVkOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZW1iZWRkZWQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hlY2tzIHdoZXRoZXIgdGhlIFdlYkFwcCBpcyBleGVjdXRlZCBsb2NhbGx5IChmaWxlOi8vLCBsb2NhbGhvc3QsIDEyNy4wLjAuMSBvciA6OjEpXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGlzTG9jYWw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gKCgnZmlsZTonKSlcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUgPT09ICdsb2NhbGhvc3QnXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnMTI3LjAuMC4xJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gKCgoJzo6MScpKSlcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBUT09MUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0eXBlT2Y6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCBuYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuIG5hbWUuc3RhcnRzV2l0aCgnW29iamVjdCAnKSA/IG5hbWUuc3Vic3RyaW5nKDgsIG5hbWUubGVuZ3RoIC0gMSlcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGFzQXJyYXk6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50eXBlT2YoeCkgPT09ICdBcnJheScgPyAoeClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbeF1cblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldHVwOiBmdW5jdGlvbihvcHRpb25OYW1lcywgb3B0aW9uRGVmYXVsdHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGwgPSBvcHRpb25OYW1lcy5sZW5ndGg7XG5cdFx0Y29uc3QgbSA9IG9wdGlvbkRlZmF1bHRzLmxlbmd0aDtcblxuXHRcdGlmKGwgIT09IG0pXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHNldHRpbmdzKSB7XG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKG9wdGlvbk5hbWVzW2ldIGluIHNldHRpbmdzID8gc2V0dGluZ3Nbb3B0aW9uTmFtZXNbaV1dIDogb3B0aW9uRGVmYXVsdHNbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcblx0XHRcdFx0cmVzdWx0LnB1c2goLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyBvcHRpb25EZWZhdWx0c1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZXBsYWNlOiBhbWlUd2lnLnN0ZGxpYi5fcmVwbGFjZSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3RleHRUb0h0bWxYOiBbJyYnICAgICwgJ1wiJyAgICAgLCAnPCcgICAsICc+JyAgIF0sXG5cdF90ZXh0VG9IdG1sWTogWycmYW1wOycsICcmcXVvdDsnLCAnJmx0OycsICcmZ3Q7J10sXG5cblx0LyoqXG5cdCAgKiBFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIEhUTUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0dGV4dFRvSHRtbDogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5fdGV4dFRvSHRtbFgsIHRoaXMuX3RleHRUb0h0bWxZKTtcblx0fSxcblxuXHQvKipcblx0ICAqIFVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSFRNTCB0byB0ZXh0XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGh0bWxUb1RleHQ6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKHMgfHwgJycsIHRoaXMuX3RleHRUb0h0bWxZLCB0aGlzLl90ZXh0VG9IdG1sWCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF90ZXh0VG9TdHJpbmdYOiBbJ1xcXFwnICAsICdcXG4nICwgJ1wiJyAgLCAnXFwnJyAgXSxcblx0X3RleHRUb1N0cmluZ1k6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXFwiJywgJ1xcXFxcXCcnXSxcblxuXHQvKipcblx0ICAqIEVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIHRleHQgdG8gSmF2YVNjcmlwdCBzdHJpbmdcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0dGV4dFRvU3RyaW5nOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TdHJpbmdYLCB0aGlzLl90ZXh0VG9TdHJpbmdZKTtcblx0fSxcblxuXHQvKipcblx0ICAqIFVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSmF2YVNjcmlwdCBzdHJpbmcgdG8gdGV4dFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyB0aGUgZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSB1bmVzY2FwZWQgc3RyaW5nXG5cdCAgKi9cblxuXHRzdHJpbmdUb1RleHQ6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKHMgfHwgJycsIHRoaXMuX3RleHRUb1N0cmluZ1ksIHRoaXMuX3RleHRUb1N0cmluZ1gpO1xuXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9odG1sVG9TdHJpbmdYOiBbJ1xcXFwnICAsICdcXG4nICwgJyZxdW90OycgICwgJ1xcJycgIF0sXG5cdF9odG1sVG9TdHJpbmdZOiBbJ1xcXFxcXFxcJywgJ1xcXFxuJywgJ1xcXFwmcXVvdDsnLCAnXFxcXFxcJyddLFxuXG5cdC8qKlxuXHQgICogRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSFRNTCB0byBKYXZhU2NyaXB0IHN0cmluZ1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyB0aGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKi9cblxuXHRodG1sVG9TdHJpbmc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKHMgfHwgJycsIHRoaXMuX2h0bWxUb1N0cmluZ1gsIHRoaXMuX2h0bWxUb1N0cmluZ1kpO1xuXHR9LFxuXG5cdC8qKlxuXHQgICogVW5lc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBKYXZhU2NyaXB0IHN0cmluZyB0byBIVE1MXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdHN0cmluZ1RvSHRtbDogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5faHRtbFRvU3RyaW5nWSwgdGhpcy5faHRtbFRvU3RyaW5nWCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF90ZXh0VG9TUUxYOiBbJ1xcJycgIF0sXG5cdF90ZXh0VG9TUUxZOiBbJ1xcJ1xcJyddLFxuXG5cdC8qKlxuXHQgICogRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBTUUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0dGV4dFRvU1FMOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TUUxYLCB0aGlzLl90ZXh0VG9TUUxZKTtcblx0fSxcblxuXHQvKipcblx0ICAqIFVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gU1FMIHRvIHRleHRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0c3FsVG9UZXh0OiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TUUxZLCB0aGlzLl90ZXh0VG9TUUxYKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIEJBU0U2NCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9iYXNlNjQ6ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OS1fJyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBFbmNvZGVzIChSRkMgNDY0OCkgYSBzdHJpbmdcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGRlY29kZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZW5jb2RlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGJhc2U2NEVuY29kZTogZnVuY3Rpb24ocylcblx0e1xuXHRcdGxldCB3O1xuXG5cdFx0Y29uc3QgZSA9IFtdO1xuXG5cdFx0Y29uc3QgbCA9IHMubGVuZ3RoLCBtID0gbCAlIDM7XG5cblx0XHRjb25zdCB0aGlzX2Jhc2U2NCA9IHRoaXMuX2Jhc2U2NDtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOylcblx0XHR7XG5cdFx0XHR3ID0gcy5jaGFyQ29kZUF0KGkrKykgPDwgMTZcblx0XHRcdCAgICB8XG5cdFx0XHQgICAgcy5jaGFyQ29kZUF0KGkrKykgPDwgOFxuXHRcdFx0ICAgIHxcblx0XHRcdCAgICBzLmNoYXJDb2RlQXQoaSsrKSA8PCAwXG5cdFx0XHQ7XG5cblx0XHRcdGUucHVzaCh0aGlzX2Jhc2U2NC5jaGFyQXQoKHcgPj4gMTgpICYgMHgzRikpO1xuXHRcdFx0ZS5wdXNoKHRoaXNfYmFzZTY0LmNoYXJBdCgodyA+PiAxMikgJiAweDNGKSk7XG5cdFx0XHRlLnB1c2godGhpc19iYXNlNjQuY2hhckF0KCh3ID4+IDYpICYgMHgzRikpO1xuXHRcdFx0ZS5wdXNoKHRoaXNfYmFzZTY0LmNoYXJBdCgodyA+PiAwKSAmIDB4M0YpKTtcblx0XHR9XG5cblx0XHQvKiovIGlmKG0gPT09IDEpIHtcblx0XHRcdGUuc3BsaWNlKC0yLCAyKTtcblx0XHR9XG5cdFx0ZWxzZSBpZihtID09PSAyKSB7XG5cdFx0XHRlLnNwbGljZSgtMSwgMSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGUuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRGVjb2RlcyAoUkZDIDQ2NDgpIGEgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBlbmNvZGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGRlY29kZWQgc3RyaW5nXG5cdCAgKi9cblxuXHRiYXNlNjREZWNvZGU6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRsZXQgdztcblxuXHRcdGNvbnN0IGUgPSBbXTtcblxuXHRcdGNvbnN0IGwgPSBzLmxlbmd0aCwgbSA9IGwgJSA0O1xuXG5cdFx0Y29uc3QgdGhpc19iYXNlNjQgPSB0aGlzLl9iYXNlNjQ7XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDspXG5cdFx0e1xuXHRcdFx0dyA9IHRoaXNfYmFzZTY0LmluZGV4T2Yocy5jaGFyQXQoaSsrKSkgPDwgMThcblx0XHRcdCAgICB8XG5cdFx0XHQgICAgdGhpc19iYXNlNjQuaW5kZXhPZihzLmNoYXJBdChpKyspKSA8PCAxMlxuXHRcdFx0ICAgIHxcblx0XHRcdCAgICB0aGlzX2Jhc2U2NC5pbmRleE9mKHMuY2hhckF0KGkrKykpIDw8IDZcblx0XHRcdCAgICB8XG5cdFx0XHQgICAgdGhpc19iYXNlNjQuaW5kZXhPZihzLmNoYXJBdChpKyspKSA8PCAwXG5cdFx0XHQ7XG5cblx0XHRcdGUucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh3ID4+PiAxNikgJiAweEZGKSk7XG5cdFx0XHRlLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgodyA+Pj4gOCkgJiAweEZGKSk7XG5cdFx0XHRlLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgodyA+Pj4gMCkgJiAweEZGKSk7XG5cdFx0fVxuXG5cdFx0LyoqLyBpZihtID09PSAyKSB7XG5cdFx0XHRlLnNwbGljZSgtMiwgMik7XG5cdFx0fVxuXHRcdGVsc2UgaWYobSA9PT0gMykge1xuXHRcdFx0ZS5zcGxpY2UoLTEsIDEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBlLmpvaW4oJycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogRFlOQU1JQyBSRVNPVVJDRSBMT0FESU5HICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2dldEV4dGVuc2lvbjogZnVuY3Rpb24odXJsKVxuXHR7XG5cdFx0Y29uc3QgaWR4ID0gdXJsLmxhc3RJbmRleE9mKCcuJyk7XG5cblx0XHRyZXR1cm4gaWR4ID4gMCA/IHVybC5zdWJzdHJpbmcoaWR4KSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZ2V0RGF0YVR5cGU6IGZ1bmN0aW9uKHVybCwgZGF0YVR5cGUpXG5cdHtcblx0XHRsZXQgcmVzdWx0O1xuXG5cdFx0aWYoZGF0YVR5cGUgPT09ICdhdXRvJylcblx0XHR7XG5cdFx0XHQvKiovIGlmKHVybC5pbmRleE9mKCdjdHJsOicpID09PSAwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSAnY29udHJvbCc7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmKHVybC5pbmRleE9mKCdzdWJhcHA6JykgPT09IDApXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdCA9ICdzdWJhcHAnO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRzd2l0Y2godGhpcy5fZ2V0RXh0ZW5zaW9uKHVybCkudG9Mb3dlckNhc2UoKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNhc2UgJy5jc3MnOlxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gJ3NoZWV0Jztcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAnLmpzJzpcblx0XHRcdFx0XHRcdHJlc3VsdCA9ICdzY3JpcHQnO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICcuanNvbic6XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAnanNvbic7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJy54bWwnOlxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gJ3htbCc7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAndGV4dCc7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0ID0gZGF0YVR5cGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X19sb2FkWFhYOiBmdW5jdGlvbihkZWZlcnJlZCwgcmVzdWx0LCB1cmxzLCBkYXRhVHlwZSwgY29udGV4dClcblx0e1xuXHRcdGlmKHVybHMubGVuZ3RoID09PSAwKVxuXHRcdHtcblx0XHRcdHJldHVybiBkZWZlcnJlZC5yZXNvbHZlV2l0aChjb250ZXh0LCBbcmVzdWx0XSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1cmwgPSB1cmxzLnNoaWZ0KCkudHJpbSgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkYXRhVFlQRSA9IHRoaXMuX2dldERhdGFUeXBlKHVybCwgZGF0YVR5cGUpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRzd2l0Y2goZGF0YVRZUEUpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIENPTlRST0wgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdjb250cm9sJzpcblxuXHRcdFx0XHR0aGlzLmxvYWRDb250cm9sKHVybCkudGhlbigoZGF0YSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goZGF0YSk7XG5cblx0XHRcdFx0XHR0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgcmVzdWx0LCB1cmxzLCBkYXRhVHlwZSwgY29udGV4dCk7XG5cblx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTVUJBUFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnc3ViYXBwJzpcblxuXHRcdFx0XHR0aGlzLmxvYWRTdWJBcHAodXJsKS50aGVuKChkYXRhKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucHVzaChkYXRhKTtcblxuXHRcdFx0XHRcdHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNIRUVUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdzaGVldCc6XG5cblx0XHRcdFx0aWYodGhpcy5fc2hlZXRzLmluZGV4T2YodXJsKSA+PSAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goZmFsc2UpO1xuXG5cdFx0XHRcdFx0dGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0XHR1cmw6IHVybCxcblx0XHRcdFx0XHRcdGFzeW5jOiBmYWxzZSxcblx0XHRcdFx0XHRcdGNhY2hlOiBmYWxzZSxcblx0XHRcdFx0XHRcdGNyb3NzRG9tYWluOiB0cnVlLFxuXHRcdFx0XHRcdFx0ZGF0YVR5cGU6IGRhdGFUWVBFLFxuXHRcdFx0XHRcdH0pLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaCh0cnVlKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5fc2hlZXRzLnB1c2godXJsKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgYCcgKyB1cmwgKyAnYCddKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU0NSSVBUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ3NjcmlwdCc6XG5cblx0XHRcdFx0aWYodGhpcy5fc2NyaXB0cy5pbmRleE9mKHVybCkgPj0gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGZhbHNlKTtcblxuXHRcdFx0XHRcdHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRcdFx0XHRhc3luYzogZmFsc2UsXG5cdFx0XHRcdFx0XHRjYWNoZTogZmFsc2UsXG5cdFx0XHRcdFx0XHRjcm9zc0RvbWFpbjogdHJ1ZSxcblx0XHRcdFx0XHRcdGRhdGFUeXBlOiBkYXRhVFlQRSxcblx0XHRcdFx0XHR9KS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnB1c2godHJ1ZSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuX3NjcmlwdHMucHVzaCh1cmwpO1xuXG5cdFx0XHRcdFx0XHR0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgcmVzdWx0LCB1cmxzLCBkYXRhVHlwZSwgY29udGV4dCk7XG5cblx0XHRcdFx0XHR9LCAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBgJyArIHVybCArICdgJ10pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBPVEhFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdHVybDogdXJsLFxuXHRcdFx0XHRcdGFzeW5jOiB0cnVlLFxuXHRcdFx0XHRcdGNhY2hlOiBmYWxzZSxcblx0XHRcdFx0XHRjcm9zc0RvbWFpbjogdHJ1ZSxcblx0XHRcdFx0XHRkYXRhVHlwZTogZGF0YVRZUEUsXG5cdFx0XHRcdH0pLnRoZW4oKGRhdGEpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGRhdGEpO1xuXG5cdFx0XHRcdFx0dGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBgJyArIHVybCArICdgJ10pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2xvYWRYWFg6IGZ1bmN0aW9uKHVybHMsIGRhdGFUeXBlLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W2RlZmVycmVkXSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIFtdLCB0aGlzLmFzQXJyYXkodXJscyksIGRhdGFUeXBlLCBjb250ZXh0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyByZXNvdXJjZXMgYnkgZXh0ZW5zaW9uXG5cdCAgKiBAcGFyYW0geyhBcnJheXxTdHJpbmcpfSB1cmxzIHRoZSBhcnJheSBvZiB1cmxzXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZFJlc291cmNlczogZnVuY3Rpb24odXJscywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbG9hZFhYWCh1cmxzLCAnYXV0bycsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyBDU1Mgc2hlZXRzXG5cdCAgKiBAcGFyYW0geyhBcnJheXxTdHJpbmcpfSB1cmxzIHRoZSBhcnJheSBvZiB1cmxzXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZFNoZWV0czogZnVuY3Rpb24odXJscywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbG9hZFhYWCh1cmxzLCAnc2hlZXQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgSlMgc2NyaXB0c1xuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRTY3JpcHRzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICdzY3JpcHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgSlNPTiBmaWxlc1xuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRKU09OczogZnVuY3Rpb24odXJscywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbG9hZFhYWCh1cmxzLCAnanNvbicsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyBYTUwgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkWE1MczogZnVuY3Rpb24odXJscywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbG9hZFhYWCh1cmxzLCAneG1sJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIEhUTUwgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkSFRNTHM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ3RleHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgVFdJRyBmaWxlc1xuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRUV0lHczogZnVuY3Rpb24odXJscywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbG9hZFhYWCh1cmxzLCAndGV4dCcsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyB0ZXh0IGZpbGVzXG5cdCAgKiBAcGFyYW0geyhBcnJheXxTdHJpbmcpfSB1cmxzIHRoZSBhcnJheSBvZiB1cmxzXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZFRleHRzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICd0ZXh0Jywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSFRNTCBDT05URU5UICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3h4eEhUTUw6IGZ1bmN0aW9uKHNlbGVjdG9yLCB0d2lnLCBtb2RlLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0LCBzdWZmaXgsIGRpY3RdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCcsICdzdWZmaXgnLCAnZGljdCddLFxuXHRcdFx0W3Jlc3VsdCwgbnVsbCwgbnVsbF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHN1ZmZpeClcblx0XHR7XG5cdFx0XHR0d2lnID0gdHdpZy5yZXBsYWNlKHRoaXMuX2lkUmVnRXhwLCBmdW5jdGlvbihpZCkge1xuXG5cdFx0XHRcdHJldHVybiBpZCArICdfaW5zdGFuY2UnICsgc3VmZml4O1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgaHRtbCA9IHRoaXMuZm9ybWF0VFdJRyh0d2lnLCBkaWN0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHByb21pc2U7XG5cblx0XHRsZXQgZWwgPSAkKHNlbGVjdG9yKTtcblxuXHRcdHN3aXRjaChtb2RlKVxuXHRcdHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0cHJvbWlzZSA9IGVsLmh0bWwoaHRtbCkucHJvbWlzZSgpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRwcm9taXNlID0gZWwucHJlcGVuZChodG1sKS5wcm9taXNlKCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdHByb21pc2UgPSBlbC5hcHBlbmQoaHRtbCkucHJvbWlzZSgpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRwcm9taXNlID0gZWwucmVwbGFjZVdpdGgoZWwuaXMoJ1tpZF0nKSA/IGh0bWwucmVwbGFjZSgvXlxccyooPFthLXpBLVpfLV0rKS8sICckMSBpZD1cIicgKyBlbC5hdHRyKCdpZCcpICsgJ1wiJykgOiBodG1sKS5wcm9taXNlKCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cHJvbWlzZS5kb25lKCgpID0+IHtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGV0IGVsID0gJChzZWxlY3Rvcik7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IF9maW5kID0gbW9kZSA9PT0gMyA/IChfc2VsZWN0b3IpID0+IGVsLmZpbmRXaXRoU2VsZihfc2VsZWN0b3IpXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgOiAoX3NlbGVjdG9yKSA9PiBlbC4gICAgZmluZCAgICAoX3NlbGVjdG9yKVxuXHRcdFx0O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihqUXVlcnkuZm4udG9vbHRpcClcblx0XHRcdHtcblx0XHRcdFx0X2ZpbmQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKHtcblx0XHRcdFx0XHRodG1sOiBmYWxzZSxcblx0XHRcdFx0XHRkZWxheToge1xuXHRcdFx0XHRcdFx0c2hvdzogNTAwLFxuXHRcdFx0XHRcdFx0aGlkZTogMTAwLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihqUXVlcnkuZm4ucG9wb3Zlcilcblx0XHRcdHtcblx0XHRcdFx0X2ZpbmQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5wb3BvdmVyKHtcblx0XHRcdFx0XHRodG1sOiB0cnVlLFxuXHRcdFx0XHRcdGRlbGF5OiB7XG5cdFx0XHRcdFx0XHRzaG93OiA1MDAsXG5cdFx0XHRcdFx0XHRoaWRlOiAxMDAsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKGpRdWVyeS5mbi5kYXRldGltZXBpY2tlcilcblx0XHRcdHtcblx0XHRcdFx0X2ZpbmQoJy5mb3JtLWRhdGV0aW1lJykuZGF0ZXRpbWVwaWNrZXIoe1xuXHRcdFx0XHRcdGZvcm1hdDogJ1lZWVktTU0tREQgSEg6bW06c3MuU1NTU1NTJ1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRfZmluZCgnLmZvcm0tZGF0ZScpLmRhdGV0aW1lcGlja2VyKHtcblx0XHRcdFx0XHRmb3JtYXQ6ICdZWVlZLU1NLUREJ1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRfZmluZCgnLmZvcm0tdGltZScpLmRhdGV0aW1lcGlja2VyKHtcblx0XHRcdFx0XHRmb3JtYXQ6ICdISDptbTpzcydcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZWxdKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUHV0cyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgdGhlIHRhcmdldCBzZWxlY3RvclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgZnJhZ21lbnRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRyZXBsYWNlSFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3h4eEhUTUwoc2VsZWN0b3IsIHR3aWcsIDAsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBQcmVwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgdGhlIHRhcmdldCBzZWxlY3RvclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgZnJhZ21lbnRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRwcmVwZW5kSFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3h4eEhUTUwoc2VsZWN0b3IsIHR3aWcsIDEsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBcHBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGFwcGVuZEhUTUw6IGZ1bmN0aW9uKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl94eHhIVE1MKHNlbGVjdG9yLCB0d2lnLCAyLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogSW50ZXJwcmV0ZXMgdGhlIGdpdmVuIFRXSUcgc3RyaW5nLCBzZWUge0BsaW5rIGh0dHA6Ly90d2lnLnNlbnNpb2xhYnMub3JnL2RvY3VtZW50YXRpb259XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBzdHJpbmdcblx0ICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBbZGljdF0gdGhlIGRpY3Rpb25hcnlcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBJbnRlcnByZXRlZCBUV0lHIHN0cmluZ1xuXHQgICovXG5cblx0Zm9ybWF0VFdJRzogZnVuY3Rpb24odHdpZywgZGljdClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCByZW5kZXIgPSAodHdpZywgZGljdCkgPT4ge1xuXG5cdFx0XHRpZih0aGlzLnR5cGVPZihkaWN0KSAhPT0gJ09iamVjdCcpXG5cdFx0XHR7XG5cdFx0XHRcdGRpY3QgPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0ZGljdFsnT1JJR0lOX1VSTCddID0gdGhpcy5vcmlnaW5VUkw7XG5cdFx0XHRkaWN0WydXRUJBUFBfVVJMJ10gPSB0aGlzLndlYkFwcFVSTDtcblxuXHRcdFx0cmV0dXJuIGFtaVR3aWcuZW5naW5lLnJlbmRlcih0d2lnLCBkaWN0KTtcblx0XHR9O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0cnlcblx0XHR7XG5cdFx0XHRpZih0aGlzLnR5cGVPZihkaWN0KSA9PT0gJ0FycmF5Jylcblx0XHRcdHtcblx0XHRcdFx0ZGljdC5mb3JFYWNoKChESUNUKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucHVzaChyZW5kZXIodHdpZywgRElDVCkpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0LnB1c2gocmVuZGVyKHR3aWcsIGRpY3QpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Y2F0Y2goZXJyb3IpXG5cdFx0e1xuXHRcdFx0cmVzdWx0Lmxlbmd0aCA9IDA7XG5cblx0XHRcdHRoaXMuZXJyb3IoJ1RXSUcgcGFyc2luZyBlcnJvcjogJyArIGVycm9yLm1lc3NhZ2UpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIEpTUEFUSCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRmluZHMgZGF0YSB3aXRoaW4gdGhlIGdpdmVuIEpTT04sIHNlZSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2RmaWxhdG92L2pzcGF0aH1cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIHRoZSBwYXRoXG5cdCAgKiBAcGFyYW0ge09iamVjdH0ganNvbiB0aGUgSlNPTlxuXHQgICogQHJldHVybnMge0FycmF5fSBUaGUgcmVzdWx0aW5nIGFycmF5XG5cdCAgKi9cblxuXHRqc3BhdGg6IGZ1bmN0aW9uKHBhdGgsIGpzb24pXG5cdHtcblx0XHRyZXR1cm4gSlNQYXRoLmFwcGx5KHBhdGgsIGpzb24pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogU1RBQ0sgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0U3RhY2s6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRyeVxuXHRcdHtcblx0XHRcdHRocm93IEVycm9yKCk7XG5cdFx0fVxuXHRcdGNhdGNoKGUxKVxuXHRcdHtcblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gZTEuc3RhY2s7XG5cdFx0XHR9XG5cdFx0XHRjYXRjaChlMilcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuICgoKCcnKSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIExPQ0sgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogTG9ja3MgdGhlIFdlYiBhcHBsaWNhdGlvblxuXHQgICovXG5cblx0bG9jazogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxpbmVzID0gdGhpcy5nZXRTdGFjaygpLnNwbGl0KCdcXG4nKTtcblxuXHRcdGlmKGxpbmVzLmxlbmd0aCA+IDIpXG5cdFx0e1xuXHRcdFx0Y29uc29sZS5sb2coJ2xvY2tbJyArIHRoaXMuX2xvY2tDbnQgKyAnXSA6OiAnICsgbGluZXNbMl0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblx0XHR9XG5cblx0XHQvKiovXG5cblx0XHRpZih0aGlzLl9sb2NrQ250IDw9IDApXG5cdFx0e1xuXHRcdFx0JCgnI2FtaV9sb2NrZXInKS5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xuXG5cdFx0XHR0aGlzLl9sb2NrQ250ID0gMTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRoaXMuX2xvY2tDbnQrKztcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogVW5sb2NrcyB0aGUgV2ViIGFwcGxpY2F0aW9uXG5cdCAgKi9cblxuXHR1bmxvY2s6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKHRoaXMuX2xvY2tDbnQgPD0gMSlcblx0XHR7XG5cdFx0XHQkKCcjYW1pX2xvY2tlcicpLmNzcygnZGlzcGxheScsICdub25lJyk7XG5cblx0XHRcdHRoaXMuX2xvY2tDbnQgPSAwO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhpcy5fbG9ja0NudC0tO1xuXHRcdH1cblxuXHRcdC8qKi9cblxuXHRcdGxldCBsaW5lcyA9IHRoaXMuZ2V0U3RhY2soKS5zcGxpdCgnXFxuJyk7XG5cblx0XHRpZihsaW5lcy5sZW5ndGggPiAyKVxuXHRcdHtcblx0XHRcdGNvbnNvbGUubG9nKCd1bmxvY2tbJyArIHRoaXMuX2xvY2tDbnQgKyAnXSA6OiAnICsgbGluZXNbMl0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRW5hYmxlcyB0aGUgbWVzc2FnZSBpbiBhIGNvbmZpcm1hdGlvbiBkaWFsb2cgYm94IHRvIGluZm9ybSB0aGF0IHRoZSB1c2VyIGlzIGFib3V0IHRvIGxlYXZlIHRoZSBjdXJyZW50IHBhZ2UuXG5cdCAgKi9cblxuXHRjYW5MZWF2ZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2FuTGVhdmUgPSB0cnVlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIERpc2FibGVzIHRoZSBtZXNzYWdlIGluIGEgY29uZmlybWF0aW9uIGRpYWxvZyBib3ggdG8gaW5mb3JtIHRoYXQgdGhlIHVzZXIgaXMgYWJvdXQgdG8gbGVhdmUgdGhlIGN1cnJlbnQgcGFnZS5cblx0ICAqL1xuXG5cdGNhbm5vdExlYXZlOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jYW5MZWF2ZSA9IGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogTUVTU0FHRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3B1Ymxpc2hBbGVydDogZnVuY3Rpb24oY2xhenosIHRpdGxlLCBtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zb2xlLmxvZygnQU1JICcgKyB0aXRsZS50b1VwcGVyQ2FzZSgpICsgJzogJyArIG1lc3NhZ2UgKyAnXFxuJyArIHRoaXMuZ2V0U3RhY2soKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBodG1sID0gJzxkaXYgY2xhc3M9XCJ0b2FzdFwiIHJvbGU9XCJhbGVydFwiICcgKyAoZmFkZU91dCA/ICdkYXRhLWRlbGF5PVwiNjAwMDBcIicgOiAnZGF0YS1hdXRvaGlkZT1cImZhbHNlXCInKSArICc+PGRpdiBjbGFzcz1cInRvYXN0LWhlYWRlclwiPjxzdHJvbmcgY2xhc3M9XCJtci1hdXRvICcgKyBjbGF6eiArICdcIj4nICsgdGl0bGUgKyAnPC9zdHJvbmc+PHNtYWxsPicgKyB0aGlzLnRleHRUb0h0bWwod2luZG93Lm1vbWVudCgpLmZvcm1hdCgnREQgTU1NLCBISDptbTpzcycpKSArICc8L3NtYWxsPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWwtMiBtYi0xIGNsb3NlXCIgZGF0YS1kaXNtaXNzPVwidG9hc3RcIj48c3Bhbj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPjwvZGl2PjxkaXYgY2xhc3M9XCJ0b2FzdC1ib2R5XCI+JyArIHRoaXMudGV4dFRvSHRtbChtZXNzYWdlKSArICc8L2Rpdj48L2Rpdj4nO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBlbCA9ICQoJyNhbWlfYWxlcnRfY29udGVudCcpO1xuXG5cdFx0ZWwuYXBwZW5kKGh0bWwucmVwbGFjZSh0aGlzLl9saW5rRXhwLCAnPGEgaHJlZj1cIiQxXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JDI8L2E+JykpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0ZWwuZmluZCgnLnRvYXN0Omxhc3QtY2hpbGQnKS50b2FzdCgnc2hvdycpO1xuXG5cdFx0XHQkKGRvY3VtZW50KS5zY3JvbGxUb3AoMCk7XG5cblx0XHRcdHRoaXMudW5sb2NrKCk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTaG93cyBhbiAnaW5mbycgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IG1lc3NhZ2UgdGhlIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZhZGVPdXQ9ZmFsc2VdIGlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXG5cdCAgKi9cblxuXHRpbmZvOiBmdW5jdGlvbihtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0aWYodGhpcy50eXBlT2YobWVzc2FnZSkgPT09ICdBcnJheScpXG5cdFx0e1xuXHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2Uuam9pbignLiAnKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wdWJsaXNoQWxlcnQoJ3RleHQtaW5mbycsICdJbmZvJywgbWVzc2FnZSwgZmFkZU91dCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU2hvd3MgYSAnc3VjY2VzcycgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IG1lc3NhZ2UgdGhlIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZhZGVPdXQ9ZmFsc2VdIGlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXG5cdCAgKi9cblxuXHRzdWNjZXNzOiBmdW5jdGlvbihtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0aWYodGhpcy50eXBlT2YobWVzc2FnZSkgPT09ICdBcnJheScpXG5cdFx0e1xuXHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2Uuam9pbignLiAnKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wdWJsaXNoQWxlcnQoJ3RleHQtc3VjY2VzcycsICdTdWNjZXNzJywgbWVzc2FnZSwgZmFkZU91dCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU2hvd3MgYSAnd2FybmluZycgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IG1lc3NhZ2UgdGhlIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZhZGVPdXQ9ZmFsc2VdIGlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXG5cdCAgKi9cblxuXHR3YXJuaW5nOiBmdW5jdGlvbihtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0aWYodGhpcy50eXBlT2YobWVzc2FnZSkgPT09ICdBcnJheScpXG5cdFx0e1xuXHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2Uuam9pbignLiAnKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wdWJsaXNoQWxlcnQoJ3RleHQtd2FybmluZycsICdXYXJuaW5nJywgbWVzc2FnZSwgZmFkZU91dCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU2hvd3MgYW4gJ2Vycm9yJyBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbWVzc2FnZSB0aGUgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtCb29sZWFufSBbZmFkZU91dD1mYWxzZV0gaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcblx0ICAqL1xuXG5cdGVycm9yOiBmdW5jdGlvbihtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0aWYodGhpcy50eXBlT2YobWVzc2FnZSkgPT09ICdBcnJheScpXG5cdFx0e1xuXHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2Uuam9pbignLiAnKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wdWJsaXNoQWxlcnQoJ3RleHQtZGFuZ2VyJywgJ0Vycm9yJywgbWVzc2FnZSwgZmFkZU91dCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRmx1c2hlcyBtZXNzYWdlc1xuXHQgICovXG5cblx0Zmx1c2g6IGZ1bmN0aW9uKClcblx0e1xuXHRcdCQoJyNhbWlfYWxlcnRfY29udGVudCcpLmVtcHR5KCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBCUkVBRENSVU1CICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEZpbGwgdGhlIG1haW4gYnJlYWRjcnVtYlxuXHQgICogQHBhcmFtIHtBcnJheX0gaXRlbXMgdGhlIGFycmF5IG9mIGl0ZW1zIChIVE1MIGZvcm1hdClcblx0ICAqL1xuXG5cdGZpbGxCcmVhZGNydW1iOiBmdW5jdGlvbihpdGVtcylcblx0e1xuXHRcdGxldCBzID0gdGhpcy50eXBlT2YoaXRlbXMpID09PSAnQXJyYXknID8gaXRlbXMubWFwKChpdGVtKSA9PiAnPGxpIGNsYXNzPVwiYnJlYWRjcnVtYi1pdGVtXCI+JyArIGl0ZW0ucmVwbGFjZSgve3tXRUJBUFBfVVJMfX0vZywgdGhpcy53ZWJBcHBVUkwpICsgJzwvbGk+Jykuam9pbignJylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXG5cdFx0JCgnI2FtaV9icmVhZGNydW1iX2NvbnRlbnQnKS5odG1sKHMpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogV0VCIEFQUExJQ0FUSU9OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBUaGlzIG1ldGhvZCBtdXN0IGJlIG92ZXJsb2FkZWQgYW5kIGlzIGNhbGxlZCB3aGVuIHRoZSBXZWIgYXBwbGljYXRpb24gc3RhcnRzXG5cdCAgKiBAZXZlbnQgYW1pV2ViQXBwI29uUmVhZHlcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyRGF0YVxuXHQgICovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoIXRoaXMuX2VtYmVkZGVkKVxuXHRcdHtcblx0XHRcdGFsZXJ0KCdlcnJvcjogYGFtaVdlYkFwcC5vblJlYWR5KClgIG11c3QgYmUgb3ZlcmxvYWRlZCEnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBUaGlzIG1ldGhvZCBtdXN0IGJlIG92ZXJsb2FkZWQgYW5kIGlzIGNhbGxlZCB3aGVuIHRoZSB0b29sYmFyIG5lZWRzIHRvIGJlIHVwZGF0ZWRcblx0ICAqIEBldmVudCBhbWlXZWJBcHAjb25SZWZyZXNoXG5cdCAgKiBAcGFyYW0ge0Jvb2xlYW59IGlzQXV0aFxuXHQgICovXG5cblx0b25SZWZyZXNoOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZighdGhpcy5fZW1iZWRkZWQpXG5cdFx0e1xuXHRcdFx0YWxlcnQoJ2Vycm9yOiBgYW1pV2ViQXBwLm9uUmVmcmVzaCgpYCBtdXN0IGJlIG92ZXJsb2FkZWQhJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU3RhcnRzIHRoZSBXZWIgYXBwbGljYXRpb25cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGxvZ29fdXJsLCBob21lX3VybCwgY29udGFjdF9lbWFpbCwgYWJvdXRfdXJsLCB0aGVtZV91cmwsIGxvY2tlcl91cmwsIGNoYW5nZV9wYXNzb3JkX2FsbG93ZWQsIGNoYW5nZV9pbmZvX2FsbG93ZWQsIGNoYW5nZV9wYXNzb3JkX2FsbG93ZWQpXG5cdCAgKi9cblxuXHRzdGFydDogZnVuY3Rpb24oc2V0dGluZ3MpXG5cdHtcblx0XHR0aGlzLl9nbG9iYWxEZWZlcnJlZC5kb25lKCgpID0+IHtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgW1xuXHRcdFx0XHRsb2dvVVJMLCBob21lVVJMLCBjb250YWN0RW1haWwsXG5cdFx0XHRcdGFib3V0VVJMLCB0aGVtZVVSTCwgbG9ja2VyVVJMLCBlbmRwb2ludFVSTCxcblx0XHRcdFx0Y3JlYXRlQWNjb3VudEFsbG93ZWQsIGNoYW5nZUluZm9BbGxvd2VkLCBjaGFuZ2VQYXNzb3JkQWxsb3dlZFxuXHRcdFx0XSA9IHRoaXMuc2V0dXAoW1xuXHRcdFx0XHQnbG9nb191cmwnLCAnaG9tZV91cmwnLCAnY29udGFjdF9lbWFpbCcsXG5cdFx0XHRcdCdhYm91dF91cmwnLCAndGhlbWVfdXJsJywgJ2xvY2tlcl91cmwnLCAnZW5kcG9pbnRfdXJsJyxcblx0XHRcdFx0J2NyZWF0ZV9hY2NvdW50X2FsbG93ZWQnLCAnY2hhbmdlX2luZm9fYWxsb3dlZCcsICdjaGFuZ2VfcGFzc29yZF9hbGxvd2VkJyxcblx0XHRcdF0sIFtcblx0XHRcdFx0dGhpcy5vcmlnaW5VUkxcblx0XHRcdFx0XHQrICcvaW1hZ2VzL2xvZ28ucG5nJyxcblx0XHRcdFx0dGhpcy53ZWJBcHBVUkwsXG5cdFx0XHRcdCdhbWlAbHBzYy5pbjJwMy5mcicsXG5cdFx0XHRcdCdodHRwOi8vY2Vybi5jaC9hbWkvJyxcblx0XHRcdFx0dGhpcy5vcmlnaW5VUkwgKyAnL3R3aWcvQU1JL1RoZW1lL2JsdWUudHdpZycsXG5cdFx0XHRcdHRoaXMub3JpZ2luVVJMICsgJy90d2lnL0FNSS9GcmFnbWVudC9sb2NrZXIudHdpZycsXG5cdFx0XHRcdHRoaXMub3JpZ2luVVJMICsgJy9BTUkvRnJvbnRFbmQnLFxuXHRcdFx0XHR0cnVlLCB0cnVlLCB0cnVlLFxuXHRcdFx0XSwgc2V0dGluZ3MpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRhbWlDb21tYW5kLmVuZHBvaW50ID0gZW5kcG9pbnRVUkw7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IChlKSA9PiB7XG5cblx0XHRcdFx0aWYoIXRoaXMuX2NhbkxlYXZlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgZiA9IGUgfHwgd2luZG93LmV2ZW50O1xuXG5cdFx0XHRcdFx0aWYoZilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRmLnJldHVyblZhbHVlID0gJ0NvbmZpcm0gdGhhdCB5b3Ugd2FudCB0byBsZWF2ZSB0aGlzIHBhZ2U/Jztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gJ0NvbmZpcm0gdGhhdCB5b3Ugd2FudCB0byBsZWF2ZSB0aGlzIHBhZ2U/Jztcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgY29udHJvbHNVUkwgPSB0aGlzLm9yaWdpblVSTCArICcvY29udHJvbHMvQ09OVFJPTFMuanNvbic7XG5cblx0XHRcdGNvbnN0IHN1YmFwcHNVUkwgPSB0aGlzLm9yaWdpblVSTCArICcvc3ViYXBwcy9TVUJBUFBTLmpzb24nO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkLmFqYXgoe3VybDogY29udHJvbHNVUkwsIGNhY2hlOiBmYWxzZSwgY3Jvc3NEb21haW46IHRydWUsIGRhdGFUeXBlOiAnanNvbid9KS50aGVuKChkYXRhMSkgPT4ge1xuXG5cdFx0XHRcdCQuYWpheCh7dXJsOiBzdWJhcHBzVVJMLCBjYWNoZTogZmFsc2UsIGNyb3NzRG9tYWluOiB0cnVlLCBkYXRhVHlwZTogJ2pzb24nfSkudGhlbigoZGF0YTIpID0+IHtcblxuXHRcdFx0XHRcdGZvcihjb25zdCBuYW1lIGluIGRhdGExKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9jb250cm9sc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gZGF0YTFbbmFtZV07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yKGNvbnN0IG5hbWUgaW4gZGF0YTIpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3N1YmFwcHNbbmFtZS50b0xvd2VyQ2FzZSgpXSA9IGRhdGEyW25hbWVdO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKCF0aGlzLl9lbWJlZGRlZClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0XHRcdFx0XHRMT0dPX1VSTDogbG9nb1VSTCxcblx0XHRcdFx0XHRcdFx0SE9NRV9VUkw6IGhvbWVVUkwsXG5cdFx0XHRcdFx0XHRcdENPTlRBQ1RfRU1BSUw6IGNvbnRhY3RFbWFpbCxcblx0XHRcdFx0XHRcdFx0QUJPVVRfVVJMOiBhYm91dFVSTCxcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdCQuYWpheCh7dXJsOiB0aGVtZVVSTCwgY2FjaGU6IHRydWUsIGNyb3NzRG9tYWluOiB0cnVlLCBkYXRhVHlwZTogJ3RleHQnfSkudGhlbigoZGF0YTMpID0+IHtcblxuXHRcdFx0XHRcdFx0XHQkLmFqYXgoe3VybDogbG9ja2VyVVJMLCBjYWNoZTogdHJ1ZSwgY3Jvc3NEb21haW46IHRydWUsIGRhdGFUeXBlOiAndGV4dCd9KS50aGVuKChkYXRhNCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0JCgnYm9keScpLmFwcGVuZCh0aGlzLmZvcm1hdFRXSUcoZGF0YTMsIGRpY3QpICsgZGF0YTQpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5sb2NrKCk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGFtaUxvZ2luLl9zdGFydChcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y3JlYXRlQWNjb3VudEFsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNoYW5nZUluZm9BbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjaGFuZ2VQYXNzb3JkQWxsb3dlZFxuXHRcdFx0XHRcdFx0XHRcdFx0KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnVubG9jaygpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5lcnJvcihtZXNzYWdlKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdGFsZXJ0KCdjb3VsZCBub3Qgb3BlbiBgJyArIGxvY2tlclVSTCArICdgLCBwbGVhc2UgcmVsb2FkIHRoZSBwYWdlLi4uJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRhbGVydCgnY291bGQgbm90IG9wZW4gYCcgKyB0aGVtZVVSTCArICdgLCBwbGVhc2UgcmVsb2FkIHRoZSBwYWdlLi4uJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0bGV0IGRhdGEzID0gJyc7XG5cblx0XHRcdFx0XHRcdGlmKCQoJyNhbWlfYWxlcnRfY29udGVudCcpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRkYXRhMyArPSAnPGRpdiBpZD1cImFtaV9hbGVydF9jb250ZW50XCI+PC9kaXY+Jztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYoJCgnI2FtaV9sb2dpbl9tZW51X2NvbnRlbnQnKS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdFx0ZGF0YTMgKz0gJzxkaXYgaWQ9XCJhbWlfbG9naW5fbWVudV9jb250ZW50XCI+PC9kaXY+Jztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0JC5hamF4KHt1cmw6IGxvY2tlclVSTCwgY2FjaGU6IHRydWUsIGNyb3NzRG9tYWluOiB0cnVlLCBkYXRhVHlwZTogJ3RleHQnfSkuZG9uZSgoZGF0YTQpID0+IHtcblxuXHRcdFx0XHRcdFx0XHQkKCdib2R5JykucHJlcGVuZChkYXRhMyArIGRhdGE0KS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHR0aGlzLmxvY2soKTtcblxuXHRcdFx0XHRcdFx0XHRcdGFtaUxvZ2luLl9zdGFydChcblx0XHRcdFx0XHRcdFx0XHRcdGNyZWF0ZUFjY291bnRBbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2hhbmdlSW5mb0FsbG93ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRjaGFuZ2VQYXNzb3JkQWxsb3dlZFxuXHRcdFx0XHRcdFx0XHRcdCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMudW5sb2NrKCk7XG5cblx0XHRcdFx0XHRcdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuZXJyb3IobWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdGFsZXJ0KCdjb3VsZCBub3Qgb3BlbiBgJyArIHN1YmFwcHNVUkwgKyAnYCwgcGxlYXNlIHJlbG9hZCB0aGUgcGFnZS4uLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9LCAoKSA9PiB7XG5cblx0XHRcdFx0YWxlcnQoJ2NvdWxkIG5vdCBvcGVuIGAnICsgY29udHJvbHNVUkwgKyAnYCwgcGxlYXNlIHJlbG9hZCB0aGUgcGFnZS4uLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YWxlcnQobWVzc2FnZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIENPTlRST0xTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgYSBjb250cm9sXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gY29udHJvbCB0aGUgYXJyYXkgb2YgY29udHJvbCBuYW1lXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZENvbnRyb2w6IGZ1bmN0aW9uKGNvbnRyb2wsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKGNvbnRyb2wuaW5kZXhPZignY3RybDonKSA9PT0gMClcblx0XHR7XG5cdFx0XHRjb250cm9sID0gY29udHJvbC5zdWJzdHJpbmcoNSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZGVzY3IgPSB0aGlzLl9jb250cm9sc1tjb250cm9sLnRvTG93ZXJDYXNlKCldO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihkZXNjcilcblx0XHR7XG5cdFx0XHR0aGlzLmxvYWRTY3JpcHRzKHRoaXMub3JpZ2luVVJMICsgJy8nICsgZGVzY3IuZmlsZSkudGhlbigobG9hZGVkKSA9PiB7XG5cblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBjbGF6eiA9IHdpbmRvd1tcblx0XHRcdFx0XHRcdGRlc2NyLmNsYXp6XG5cdFx0XHRcdFx0XTtcblxuXHRcdFx0XHRcdGNvbnN0IHByb21pc2UgPSBsb2FkZWRbMF0gPyBjbGF6ei5wcm90b3R5cGUub25SZWFkeS5hcHBseShjbGF6ei5wcm90b3R5cGUpXG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICA6IC8qLS0tLS0tLS0tLS0tLS0tLSovIG51bGwgLyotLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRfYW1pX2ludGVybmFsX3RoZW4ocHJvbWlzZSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgWy8qLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyBjbGF6eiAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tKi9dKTtcblxuXHRcdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgY29udHJvbCBgJyArIGNvbnRyb2wgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaChtZXNzYWdlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBjb250cm9sIGAnICsgY29udHJvbCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBjb250cm9sIGAnICsgY29udHJvbCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBmaW5kIGNvbnRyb2wgYCcgKyBjb250cm9sICsgJ2AnXSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmVudF0gPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW293bmVyXSA/Pz9cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBjb250cm9sID8/P1xuXHQgICogQHBhcmFtIHtBcnJheX0gcGFyYW1zID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNyZWF0ZUNvbnRyb2w6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIsIGNvbnRyb2wsIHBhcmFtcywgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSB0aGlzLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5sb2FkQ29udHJvbChjb250cm9sLCBzZXR0aW5ncykuZG9uZSgoY29uc3RydWN0b3IpID0+IHtcblxuXHRcdFx0bGV0IGluc3RhbmNlID0gbmV3IGNvbnN0cnVjdG9yKHBhcmVudCwgb3duZXIpO1xuXG5cdFx0XHRfYW1pX2ludGVybmFsX3RoZW4oY29uc3RydWN0b3IucHJvdG90eXBlLnJlbmRlci5hcHBseShpbnN0YW5jZSwgcGFyYW1zKSwgZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtpbnN0YW5jZV0uY29uY2F0KFsuLi5hcmd1bWVudHNdKSk7XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sIGluIGEgY29udGFpbmVyXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmVudF0gPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW293bmVyXSA/Pz9cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBjb250cm9sID8/P1xuXHQgICogQHBhcmFtIHtBcnJheX0gcGFyYW1zV2l0aG91dFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IGNvbnRyb2xTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjcmVhdGVDb250cm9sSW5Cb2R5OiBmdW5jdGlvbihwYXJlbnQsIG93bmVyLCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0cnlcblx0XHR7XG5cdFx0XHRsZXQgUEFSQU1TID0gW107XG5cdFx0XHRsZXQgU0VUVElOR1MgPSB7fTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Zm9yKGxldCBrZXkgaW4gcGFyZW50U2V0dGluZ3MpIHtcblx0XHRcdFx0U0VUVElOR1Nba2V5XSA9IHBhcmVudFNldHRpbmdzW2tleV07XG5cdFx0XHR9XG5cblx0XHRcdGZvcihsZXQga2V5IGluIGNvbnRyb2xTZXR0aW5ncykge1xuXHRcdFx0XHRTRVRUSU5HU1trZXldID0gY29udHJvbFNldHRpbmdzW2tleV07XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdC8vLy8vLy5wdXNoKHNlbGVjdG9yKTtcblxuXHRcdFx0QXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoUEFSQU1TLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzKTtcblxuXHRcdFx0UEFSQU1TLnB1c2goU0VUVElOR1MpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLmNyZWF0ZUNvbnRyb2wocGFyZW50LCBvd25lciwgY29udHJvbCwgUEFSQU1TKS5kb25lKGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbLi4uYXJndW1lbnRzXSk7XG5cblx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXHRcdGNhdGNoKG1lc3NhZ2UpXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gYSBjb250YWluZXJcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyZW50XSA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbb3duZXJdID8/P1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IGNvbnRyb2wgPz8/XG5cdCAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXNXaXRob3V0U2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gY29udHJvbFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IGljb24gPz8/XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdGl0bGUgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y3JlYXRlQ29udHJvbEluQ29udGFpbmVyOiBmdW5jdGlvbihwYXJlbnQsIG93bmVyLCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBpY29uLCB0aXRsZSwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSB0aGlzLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0cGFyZW50LmFwcGVuZEl0ZW0oJzxpIGNsYXNzPVwiZmEgZmEtJyArIHRoaXMudGV4dFRvSHRtbChpY29uKSArICdcIj48L2k+ICcgKyB0aGlzLnRleHRUb0h0bWwodGl0bGUpKS5kb25lKChzZWxlY3RvcikgPT4ge1xuXG5cdFx0XHRcdGxldCBQQVJBTVMgPSBbXTtcblx0XHRcdFx0bGV0IFNFVFRJTkdTID0ge307XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGZvcihsZXQga2V5IGluIHBhcmVudFNldHRpbmdzKSB7XG5cdFx0XHRcdFx0U0VUVElOR1Nba2V5XSA9IHBhcmVudFNldHRpbmdzW2tleV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IobGV0IGtleSBpbiBjb250cm9sU2V0dGluZ3MpIHtcblx0XHRcdFx0XHRTRVRUSU5HU1trZXldID0gY29udHJvbFNldHRpbmdzW2tleV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0UEFSQU1TLnB1c2goc2VsZWN0b3IpO1xuXG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KFBBUkFNUywgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncyk7XG5cblx0XHRcdFx0UEFSQU1TLnB1c2goU0VUVElOR1MpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHR0aGlzLmNyZWF0ZUNvbnRyb2wocGFyZW50LCBvd25lciwgY29udHJvbCwgUEFSQU1TKS5kb25lKGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFsuLi5hcmd1bWVudHNdKTtcblxuXHRcdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Y2F0Y2gobWVzc2FnZSlcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbCBpbiBhIGNvbnRhaW5lciBmcm9tIGEgV0VCIGxpbmtcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyZW50XSA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbb3duZXJdID8/P1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IGVsID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNyZWF0ZUNvbnRyb2xGcm9tV2ViTGluazogZnVuY3Rpb24ocGFyZW50LCBvd25lciwgZWwsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncylcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGRhdGFDdHJsID0gZWwuaGFzQXR0cmlidXRlKCdkYXRhLWN0cmwnKSA/IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jdHJsJylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cblx0XHRsZXQgZGF0YUN0cmxMb2NhdGlvbiA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1jdHJsLWxvY2F0aW9uJykgPyBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY3RybC1sb2NhdGlvbicpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBkYXRhUGFyYW1zID0gZWwuaGFzQXR0cmlidXRlKCdkYXRhLXBhcmFtcycpID8gSlNPTi5wYXJzZShlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyYW1zJykpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbXVxuXHRcdDtcblxuXHRcdGxldCBkYXRhU2V0dGluZ3MgPSBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2V0dGluZ3MnKSA/IEpTT04ucGFyc2UoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNldHRpbmdzJykpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDoge31cblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBkYXRhSWNvbiA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1pY29uJykgPyBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWNvbicpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdxdWVzdGlvbidcblx0XHQ7XG5cblx0XHRsZXQgZGF0YVRpdGxlID0gZWwuaGFzQXR0cmlidXRlKCdkYXRhLXRpdGxlJykgPyBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGl0bGUnKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdVbmtub3duJ1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5sb2NrKCk7XG5cblx0XHQvKiovIGlmKGRhdGFDdHJsTG9jYXRpb24gPT09ICdib2R5Jylcblx0XHR7XG5cdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVDb250cm9sSW5Cb2R5KHBhcmVudCwgb3duZXIsIGRhdGFDdHJsLCBkYXRhUGFyYW1zLCBkYXRhU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncykuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy51bmxvY2soKTtcblxuXHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZXJyb3IobWVzc2FnZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lcihwYXJlbnQsIG93bmVyLCBkYXRhQ3RybCwgZGF0YVBhcmFtcywgZGF0YVNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgZGF0YUljb24sIGRhdGFUaXRsZSwgc2V0dGluZ3MpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMudW5sb2NrKCk7XG5cblx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHR0aGlzLmVycm9yKG1lc3NhZ2UpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBTVUJBUFBTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0cmlnZ2VyTG9naW46IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy5faXNSZWFkeSlcblx0XHR7XG5cdFx0XHRfYW1pX2ludGVybmFsX3RoZW4odGhpcy5fY3VycmVudFN1YkFwcEluc3RhbmNlLm9uTG9naW4odGhpcy5hcmdzWyd1c2VyZGF0YSddKSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRfYW1pX2ludGVybmFsX2Fsd2F5cyh0aGlzLm9uUmVmcmVzaCh0cnVlKSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdF9hbWlfaW50ZXJuYWxfYWx3YXlzKHRoaXMub25SZWZyZXNoKHRydWUpLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0cmlnZ2VyTG9nb3V0OiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMuX2lzUmVhZHkpXG5cdFx0e1xuXHRcdFx0X2FtaV9pbnRlcm5hbF90aGVuKHRoaXMuX2N1cnJlbnRTdWJBcHBJbnN0YW5jZS5vbkxvZ291dCh0aGlzLmFyZ3NbJ3VzZXJkYXRhJ10pLCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdF9hbWlfaW50ZXJuYWxfYWx3YXlzKHRoaXMub25SZWZyZXNoKGZhbHNlKSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdF9hbWlfaW50ZXJuYWxfYWx3YXlzKHRoaXMub25SZWZyZXNoKGZhbHNlKSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZXNvbHZlKCk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyBhIHN1YmFwcFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHN1YmFwcCB0aGUgc3ViYXBwXG5cdCAgKiBAcGFyYW0gez99IFt1c2VyZGF0YV0gdGhlIHVzZXIgZGF0YVxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRTdWJBcHA6IGZ1bmN0aW9uKHN1YmFwcCwgdXNlcmRhdGEsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMubG9jaygpO1xuXG5cdFx0cmVzdWx0LmFsd2F5cygoKSA9PiB7XG5cblx0XHRcdHRoaXMudW5sb2NrKCk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHN1YmFwcC5pbmRleE9mKCdzdWJhcHA6JykgPT09IDApXG5cdFx0e1xuXHRcdFx0c3ViYXBwID0gc3ViYXBwLnN1YnN0cmluZyg3KTtcblx0XHR9XG5cblx0XHRjb25zdCBkZXNjciA9IHRoaXMuX3N1YmFwcHNbc3ViYXBwLnRvTG93ZXJDYXNlKCldO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihkZXNjcilcblx0XHR7XG5cdFx0XHR0aGlzLmxvYWRTY3JpcHRzKHRoaXMub3JpZ2luVVJMICsgJy8nICsgZGVzY3IuZmlsZSkudGhlbigobG9hZGVkKSA9PiB7XG5cblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLl9jdXJyZW50U3ViQXBwSW5zdGFuY2Uub25FeGl0KHVzZXJkYXRhKTtcblxuXHRcdFx0XHRcdGNvbnN0IGluc3RhbmNlID0gd2luZG93W2Rlc2NyLmluc3RhbmNlXTtcblxuXHRcdFx0XHRcdHRoaXMuX2N1cnJlbnRTdWJBcHBJbnN0YW5jZSA9IGluc3RhbmNlO1xuXG5cdFx0XHRcdFx0LyoqL1xuXG5cdFx0XHRcdFx0dGhpcy5maWxsQnJlYWRjcnVtYihkZXNjci5icmVhZGNydW1iKTtcblxuXHRcdFx0XHRcdGNvbnN0IHByb21pc2UgPSBsb2FkZWRbMF0gPyBpbnN0YW5jZS5vblJlYWR5KHVzZXJkYXRhKVxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgOiAvKi0tLS0tLSovIG51bGwgLyotLS0tLS0qL1xuXHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdF9hbWlfaW50ZXJuYWxfdGhlbihwcm9taXNlLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdGNvbnN0IHByb21pc2UgPSBhbWlMb2dpbi5pc0F1dGhlbnRpY2F0ZWQoKSA/IHRoaXMudHJpZ2dlckxvZ2luKClcblx0XHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMudHJpZ2dlckxvZ291dCgpXG5cdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdHByb21pc2UudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFsvKi0tLS0tLS0tLS0tLS0tLS0tLSovIGluc3RhbmNlIC8qLS0tLS0tLS0tLS0tLS0tLS0tKi9dKTtcblxuXHRcdFx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIHN1YmFwcCBgJyArIHN1YmFwcCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIHN1YmFwcCBgJyArIHN1YmFwcCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoKG1lc3NhZ2UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIHN1YmFwcCBgJyArIHN1YmFwcCArICdgOiAnICsgbWVzc2FnZV0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBzdWJhcHAgYCcgKyBzdWJhcHAgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgZmluZCBzdWJhcHAgYCcgKyBzdWJhcHAgKyAnYCddKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIExvYWRzIGEgc3ViYXBwIGJ5IFVSTFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGRlZmF1bHRTdWJBcHAgaWYgJ2FtaVdlYkFwcC5hcmdzW1wic3ViYXBwXCJdJyBpcyBudWxsLCB0aGUgZGVmYXVsdCBzdWJhcHBcblx0ICAqIEBwYXJhbSB7P30gW2RlZmF1bHRVc2VyRGF0YV0gaWYgJ2FtaVdlYkFwcC5hcmdzW1widXNlcmRhdGFcIl0nIGlzIG51bGwsIHRoZSBkZWZhdWx0IHVzZXIgZGF0YVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZFN1YkFwcEJ5VVJMOiBmdW5jdGlvbihkZWZhdWx0U3ViQXBwLCBkZWZhdWx0VXNlckRhdGEpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRpZih0aGlzLmFyZ3NbJ3YnXSlcblx0XHR7XG5cdFx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0dldEhhc2hJbmZvIC1oYXNoPVwiJyArIHRoaXMudGV4dFRvU3RyaW5nKHRoaXMuYXJnc1sndiddKSArICdcIicpLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXG5cdFx0XHR9KS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdFx0bGV0IGpzb247XG5cblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRqc29uID0gSlNPTi5wYXJzZSh0aGlzLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImpzb25cIn0uJCcsIGRhdGEpWzBdIHx8ICd7fScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoKG1lc3NhZ2UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRqc29uID0gey8qIEVNUFRZIEpTT04gICBFTVBUWSBKU09OICAgRU1QVFkgSlNPTiAgIEVNUFRZIEpTT04gICBFTVBUWSBKU09OICovfTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBzdWJhcHAgPSBqc29uWydzdWJhcHAnXSB8fCBkZWZhdWx0U3ViQXBwO1xuXHRcdFx0XHRjb25zdCB1c2VyZGF0YSA9IGpzb25bJ3VzZXJkYXRhJ10gfHwgZGVmYXVsdFVzZXJEYXRhO1xuXG5cdFx0XHRcdHRoaXMubG9hZFN1YkFwcChzdWJhcHAsIHVzZXJkYXRhKS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlKCk7XG5cblx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0aWYoIWFtaVJvdXRlci5jaGVjaygpKVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3Qgc3ViYXBwID0gdGhpcy5hcmdzWydzdWJhcHAnXSB8fCBkZWZhdWx0U3ViQXBwO1xuXHRcdFx0XHRjb25zdCB1c2VyZGF0YSA9IHRoaXMuYXJnc1sndXNlcmRhdGEnXSB8fCBkZWZhdWx0VXNlckRhdGE7XG5cblx0XHRcdFx0dGhpcy5sb2FkU3ViQXBwKHN1YmFwcCwgdXNlcmRhdGEpLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pLklDb250cm9sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIEFNSSBjb250cm9sIGludGVyZmFjZVxuICogQGludGVyZmFjZSBhbWkuSUNvbnRyb2xcbiAqL1xuXG4kQU1JSW50ZXJmYWNlKCdhbWkuSUNvbnRyb2wnLCAvKiogQGxlbmRzIGFtaS5JQ29udHJvbCAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFBhdGNoZXMgYW4gSFRNTCBpZGVudGlmaWVyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gaWQgdGhlIHVucGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBwYXRjaGVkIEhUTUwgaWRlbnRpZmllclxuXHQgICovXG5cblx0cGF0Y2hJZDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBQdXRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdHJlcGxhY2VIVE1MOiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFByZXBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdHByZXBlbmRIVE1MOiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFwcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIHRoZSB0YXJnZXQgc2VsZWN0b3Jcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB0d2lnIHRoZSBUV0lHIGZyYWdtZW50XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0YXBwZW5kSFRNTDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDYWxsZWQgd2hlbiB0aGUgY29udHJvbCBpcyByZWFkeSB0byBydW5cblx0ICAqL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWkuSVN1YkFwcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgQU1JIHN1Yi1hcHBsaWNhdGlvbiBpbnRlcmZhY2VcbiAqIEBpbnRlcmZhY2UgYW1pLklTdWJBcHBcbiAqL1xuXG4kQU1JSW50ZXJmYWNlKCdhbWkuSVN1YkFwcCcsIC8qKiBAbGVuZHMgYW1pLklTdWJBcHAgKi8ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIHJlYWR5IHRvIHJ1blxuXHQgICogQHBhcmFtIHs/fSB1c2VyZGF0YSB1c2VyZGF0YVxuXHQgICovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDYWxsZWQgd2hlbiB0aGUgc3ViLWFwcGxpY2F0aW9uIGlzIGFib3V0IHRvIGV4aXRcblx0ICAqIEBwYXJhbSB7P30gdXNlcmRhdGEgdXNlcmRhdGFcblx0ICAqL1xuXG5cdG9uRXhpdDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDYWxsZWQgd2hlbiBsb2dnaW5nIGluXG5cdCAgKiBAcGFyYW0gez99IHVzZXJkYXRhIHVzZXJkYXRhXG5cdCAgKi9cblxuXHRvbkxvZ2luOiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENhbGxlZCB3aGVuIGxvZ2dpbmcgb3V0XG5cdCAgKiBAcGFyYW0gez99IHVzZXJkYXRhIHVzZXJkYXRhXG5cdCAgKi9cblxuXHRvbkxvZ291dDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaS5Db250cm9sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBiYXNpYyBBTUkgY29udHJvbFxuICogQGNsYXNzIGFtaS5Db250cm9sXG4gKiBAaW1wbGVtZW50cyB7YW1pLklDb250cm9sfVxuICovXG5cbiRBTUlDbGFzcygnYW1pLkNvbnRyb2wnLCAvKiogQGxlbmRzIGFtaS5Db250cm9sICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbXBsZW1lbnRzOiBbYW1pLklDb250cm9sXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0YW1pLkNvbnRyb2wuaW5zdGFuY2VDbnQgPSAxO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24ocGFyZW50LCBvd25lcilcblx0e1xuXHRcdHRoaXMuX3BhcmVudCA9IHBhcmVudCB8fCB0aGlzO1xuXHRcdHRoaXMuX293bmVyID0gb3duZXIgfHwgdGhpcztcblxuXHRcdHRoaXMuaW5zdGFuY2VTdWZmaXggPSBhbWkuQ29udHJvbC5pbnN0YW5jZUNudCsrO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRQYXJlbnQ6IGZ1bmN0aW9uKHBhcmVudClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wYXJlbnQgPSAocGFyZW50IHx8IHRoaXMpO1xuXHR9LFxuXG5cdGdldFBhcmVudDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BhcmVudDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0T3duZXI6IGZ1bmN0aW9uKG93bmVyKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX293bmVyID0gKG93bmVyIHx8IHRoaXMpO1xuXHR9LFxuXG5cdGdldE93bmVyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fb3duZXI7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldFNlbGVjdG9yOiBmdW5jdGlvbihzZWxlY3Rvcilcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zZWxlY3RvciA9IChzZWxlY3RvciB8fCAnJyk7XG5cdH0sXG5cblx0Z2V0U2VsZWN0b3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zZWxlY3Rvcjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGF0Y2hJZDogZnVuY3Rpb24oaWRlbnRpZmllcilcblx0e1xuXHRcdHJldHVybiBpZGVudGlmaWVyICsgJ19pbnN0YW5jZScgKyB0aGlzLmluc3RhbmNlU3VmZml4O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZXBsYWNlSFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKVxuXHR7XG5cdFx0aWYoIXNldHRpbmdzKVxuXHRcdHtcblx0XHRcdHNldHRpbmdzID0ge307XG5cdFx0fVxuXG5cdFx0c2V0dGluZ3Muc3VmZml4ID0gdGhpcy5pbnN0YW5jZVN1ZmZpeDtcblxuXHRcdHJldHVybiBhbWlXZWJBcHAucmVwbGFjZUhUTUwoc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cHJlcGVuZEhUTUw6IGZ1bmN0aW9uKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncylcblx0e1xuXHRcdGlmKCFzZXR0aW5ncylcblx0XHR7XG5cdFx0XHRzZXR0aW5ncyA9IHt9O1xuXHRcdH1cblxuXHRcdHNldHRpbmdzLnN1ZmZpeCA9IHRoaXMuaW5zdGFuY2VTdWZmaXg7XG5cblx0XHRyZXR1cm4gYW1pV2ViQXBwLnByZXBlbmRIVE1MKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGFwcGVuZEhUTUw6IGZ1bmN0aW9uKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncylcblx0e1xuXHRcdGlmKCFzZXR0aW5ncylcblx0XHR7XG5cdFx0XHRzZXR0aW5ncyA9IHt9O1xuXHRcdH1cblxuXHRcdHNldHRpbmdzLnN1ZmZpeCA9IHRoaXMuaW5zdGFuY2VTdWZmaXg7XG5cblx0XHRyZXR1cm4gYW1pV2ViQXBwLmFwcGVuZEhUTUwoc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y3JlYXRlQ29udHJvbDogZnVuY3Rpb24ocGFyZW50LCBjb250cm9sLCBwYXJhbXMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5jcmVhdGVDb250cm9sKHBhcmVudCwgdGhpcywgY29udHJvbCwgcGFyYW1zLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNyZWF0ZUNvbnRyb2xJbkJvZHk6IGZ1bmN0aW9uKHBhcmVudCwgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2xJbkJvZHkocGFyZW50LCB0aGlzLCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lcjogZnVuY3Rpb24ocGFyZW50LCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBpY29uLCB0aXRsZSwgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lcihwYXJlbnQsIHRoaXMsIGNvbnRyb2wsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MsIGNvbnRyb2xTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIGljb24sIHRpdGxlLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNyZWF0ZUNvbnRyb2xGcm9tV2ViTGluazogZnVuY3Rpb24ocGFyZW50LCBlbCwgcGFyZW50U2V0dGluZ3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5jcmVhdGVDb250cm9sRnJvbVdlYkxpbmsocGFyZW50LCB0aGlzLCBlbCwgcGFyZW50U2V0dGluZ3MsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaS5TdWJBcHAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBiYXNpYyBBTUkgc3ViLWFwcGxpY2F0aW9uXG4gKiBAY2xhc3MgYW1pLlN1YkFwcFxuICogQGltcGxlbWVudHMge2FtaS5JU3ViQXBwfVxuICovXG5cbiRBTUlDbGFzcygnYW1pLlN1YkFwcCcsIC8qKiBAbGVuZHMgYW1pLlN1YkFwcCAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW1wbGVtZW50czogW2FtaS5JU3ViQXBwXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25FeGl0OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvbkxvZ2luOiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvbkxvZ291dDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlDb21tYW5kICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgQU1JIGNvbW1hbmQgc3Vic3lzdGVtXG4gKiBAbmFtZXNwYWNlIGFtaUNvbW1hbmRcbiAqL1xuXG4kQU1JTmFtZXNwYWNlKCdhbWlDb21tYW5kJywgLyoqIEBsZW5kcyBhbWlDb21tYW5kICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQVUJMSUMgTUVNQkVSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIERlZmF1bHQgZW5kcG9pbnRcblx0ICAqIEB0eXBlIHtTdHJpbmd9XG5cdCAgKi9cblxuXHRlbmRwb2ludDogJ2h0dHA6Ly94eHl5Lnp6JyxcblxuXHQvKipcblx0ICAqIERlZmF1bHQgY29udmVydGVyXG5cdCAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICovXG5cblx0Y29udmVydGVyOiAnQU1JWG1sVG9Kc29uLnhzbCcsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQVUJMSUMgTUVUSE9EUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEV4ZWN1dGVzIGFuIEFNSSBjb21tYW5kXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gY29tbWFuZCB0aGUgY29tbWFuZFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZW5kcG9pbnQsIGNvbnZlcnRlciwgdGltZW91dCwgZXh0cmFQYXJhbSwgZXh0cmFWYWx1ZSlcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGV4ZWN1dGU6IGZ1bmN0aW9uKGNvbW1hbmQsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2VuZHBvaW50LCBjb252ZXJ0ZXIsIGNvbnRleHQsIHRpbWVvdXQsIGV4dHJhUGFyYW0sIGV4dHJhVmFsdWVdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0WydlbmRwb2ludCcsICdjb252ZXJ0ZXInLCAnY29udGV4dCcsICd0aW1lb3V0JywgJ2V4dHJhUGFyYW0nLCAnZXh0cmFWYWx1ZSddLFxuXHRcdFx0W3RoaXMuZW5kcG9pbnQsIHRoaXMuY29udmVydGVyLCByZXN1bHQsIDIgKiA2MCAqIDEwMDAsIG51bGwsIG51bGxdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBVUkwgPSBlbmRwb2ludC50cmltKCk7XG5cdFx0Y29uc3QgQ09NTUFORCA9IGNvbW1hbmQudHJpbSgpO1xuXHRcdGNvbnN0IENPTlZFUlRFUiA9IGNvbnZlcnRlci50cmltKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRhdGEgPSB7XG5cdFx0XHRDb21tYW5kOiBDT01NQU5ELFxuXHRcdFx0Q29udmVydGVyOiBDT05WRVJURVIsXG5cdFx0fTtcblxuXHRcdGlmKGV4dHJhUGFyYW0pXG5cdFx0e1xuXHRcdFx0ZGF0YVtleHRyYVBhcmFtXSA9IGV4dHJhVmFsdWUgPyBleHRyYVZhbHVlXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICgoKG51bGwpKSlcblx0XHRcdDtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVybFdpdGhQYXJhbWV0ZXJzID0gVVJMICsgJz8nICsgJC5wYXJhbShkYXRhKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoQ09OVkVSVEVSID09PSAnQU1JWG1sVG9Kc29uLnhzbCcpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEpTT04gRk9STUFUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR1cmw6IFVSTCxcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHR0aW1lb3V0OiB0aW1lb3V0LFxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHR4aHJGaWVsZHM6IHtcblx0XHRcdFx0XHR3aXRoQ3JlZGVudGlhbHM6IHRydWVcblx0XHRcdFx0fSxcblx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcblxuXHRcdFx0XHRcdGNvbnN0IGluZm8gPSBKU1BhdGguYXBwbHkoJy5BTUlNZXNzYWdlLmluZm8uJCcsIGRhdGEpO1xuXHRcdFx0XHRcdGNvbnN0IGVycm9yID0gSlNQYXRoLmFwcGx5KCcuQU1JTWVzc2FnZS5lcnJvci4kJywgZGF0YSk7XG5cblx0XHRcdFx0XHRpZihlcnJvci5sZW5ndGggPT09IDApXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtkYXRhLCBpbmZvLmpvaW4oJy4gJyksIHVybFdpdGhQYXJhbWV0ZXJzXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbZGF0YSwgZXJyb3Iuam9pbignLiAnKSwgdXJsV2l0aFBhcmFtZXRlcnNdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVycm9yOiAoanFYSFIsIHRleHRTdGF0dXMpID0+IHtcblxuXHRcdFx0XHRcdGlmKHRleHRTdGF0dXMgPT09ICdlcnJvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGV4dFN0YXR1cyA9ICdzZXJ2aWNlIHRlbXBvcmFyaWx5IHVucmVhY2hhYmxlJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZih0ZXh0U3RhdHVzID09PSAncGFyc2VyZXJyb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRleHRTdGF0dXMgPSAncmVzb3VyY2UgdGVtcG9yYXJpbHkgdW5yZWFjaGFibGUnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGNvbnN0IGRhdGEgPSB7J0FNSU1lc3NhZ2UnOiBbeydlcnJvcic6IFt7JyQnOiB0ZXh0U3RhdHVzfV19XX07XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbZGF0YSwgdGV4dFN0YXR1cywgdXJsV2l0aFBhcmFtZXRlcnNdKTtcblx0XHRcdFx0fSxcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogT1RIRVIgRk9STUFUUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHVybDogVVJMLFxuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdHRpbWVvdXQ6IHRpbWVvdXQsXG5cdFx0XHRcdGRhdGFUeXBlOiAndGV4dCcsXG5cdFx0XHRcdHhockZpZWxkczoge1xuXHRcdFx0XHRcdHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtkYXRhLCBkYXRhLCB1cmxXaXRoUGFyYW1ldGVyc10pO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRlcnJvcjogKGpxWEhSLCB0ZXh0U3RhdHVzKSA9PiB7XG5cblx0XHRcdFx0XHRpZih0ZXh0U3RhdHVzID09PSAnZXJyb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRleHRTdGF0dXMgPSAnc2VydmljZSB0ZW1wb3JhcmlseSB1bnJlYWNoYWJsZSc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW3RleHRTdGF0dXMsIHRleHRTdGF0dXMsIHVybFdpdGhQYXJhbWV0ZXJzXSk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIExvZ3MgaW4gYnkgbG9naW4vcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyIHRoZSB1c2VyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGFzcyB0aGUgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRwYXNzTG9naW46IGZ1bmN0aW9uKHVzZXIsIHBhc3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5leGVjdXRlKCdHZXRTZXNzaW9uSW5mbyAtQU1JVXNlcj1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHVzZXIpICsgJ1wiIC1BTUlQYXNzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcocGFzcykgKyAnXCInLCB7ZXh0cmFQYXJhbTogJ05vQ2VydCd9KS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGNvbnN0IHVzZXJJbmZvID0ge307XG5cdFx0XHRjb25zdCByb2xlSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3QgdWRwSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgc3NvSW5mbyA9IHt9XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJ1c2VyXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1c2VySW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwidWRwXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1ZHBJbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJzc29cIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHNzb0luZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInJvbGVcIn0ucm93JywgZGF0YSkuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0bGV0IG5hbWUgPSAnJztcblx0XHRcdFx0Y29uc3Qgcm9sZSA9IHt9O1xuXG5cdFx0XHRcdHJvdy5maWVsZC5mb3JFYWNoKChmaWVsZCkgPT4ge1xuXG5cdFx0XHRcdFx0cm9sZVtmaWVsZFsnQG5hbWUnXV0gPSBmaWVsZFsnJCddO1xuXG5cdFx0XHRcdFx0aWYoZmllbGRbJ0BuYW1lJ10gPT09ICduYW1lJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lID0gZmllbGRbJyQnXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJvbGVJbmZvW25hbWVdID0gcm9sZTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2RhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mb10pO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGEsIG1lc3NhZ2UsIHtBTUlVc2VyOiAnZ3Vlc3QnLCBndWVzdFVzZXI6ICdndWVzdCd9LCB7fSwge30sIHt9XSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIExvZ3MgaW4gYnkgY2VydGlmaWNhdGVcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjZXJ0TG9naW46IGZ1bmN0aW9uKHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5leGVjdXRlKCdHZXRTZXNzaW9uSW5mbycpLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0Y29uc3QgdXNlckluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHJvbGVJbmZvID0ge307XG5cdFx0XHRjb25zdCB1ZHBJbmZvID0ge307XG5cdFx0XHRjb25zdCBzc29JbmZvID0ge307XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJ1c2VyXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1c2VySW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwidWRwXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHR1ZHBJbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJzc29cIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHNzb0luZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInJvbGVcIn0ucm93JywgZGF0YSkuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0bGV0IG5hbWUgPSAnJztcblx0XHRcdFx0Y29uc3Qgcm9sZSA9IHt9O1xuXG5cdFx0XHRcdHJvdy5maWVsZC5mb3JFYWNoKChmaWVsZCkgPT4ge1xuXG5cdFx0XHRcdFx0cm9sZVtmaWVsZFsnQG5hbWUnXV0gPSBmaWVsZFsnJCddO1xuXG5cdFx0XHRcdFx0aWYoZmllbGRbJ0BuYW1lJ10gPT09ICduYW1lJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lID0gZmllbGRbJyQnXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJvbGVJbmZvW25hbWVdID0gcm9sZTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2RhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mb10pO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGEsIG1lc3NhZ2UsIHtBTUlVc2VyOiAnZ3Vlc3QnLCBndWVzdFVzZXI6ICdndWVzdCd9LCB7fSwge30sIHt9XSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIExvZ3Mgb3V0XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9nb3V0OiBmdW5jdGlvbihzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuZXhlY3V0ZSgnR2V0U2Vzc2lvbkluZm8gLUFNSVVzZXI9XCJcIiAtQU1JUGFzcz1cIlwiJywge2V4dHJhUGFyYW06ICdOb0NlcnQnfSkudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRjb25zdCB1c2VySW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgcm9sZUluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHVkcEluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHNzb0luZm8gPSB7fVxuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwidXNlclwifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0dXNlckluZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInVkcFwifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0dWRwSW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwic3NvXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHRzc29JbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJyb2xlXCJ9LnJvdycsIGRhdGEpLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGxldCBuYW1lID0gJyc7XG5cdFx0XHRcdGNvbnN0IHJvbGUgPSB7fTtcblxuXHRcdFx0XHRyb3cuZmllbGQuZm9yRWFjaCgoZmllbGQpID0+IHtcblxuXHRcdFx0XHRcdHJvbGVbZmllbGRbJ0BuYW1lJ11dID0gZmllbGRbJyQnXTtcblxuXHRcdFx0XHRcdGlmKGZpZWxkWydAbmFtZSddID09PSAnbmFtZScpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZSA9IGZpZWxkWyckJ107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyb2xlSW5mb1tuYW1lXSA9IHJvbGU7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm9dKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFtkYXRhLCBtZXNzYWdlLCB7QU1JVXNlcjogJ2d1ZXN0JywgZ3Vlc3RVc2VyOiAnZ3Vlc3QnfSwge30sIHt9LCB7fV0pO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBdHRhY2hlcyBhIGNlcnRpZmljYXRlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlciB0aGUgdXNlclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhc3MgdGhlIHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0YXR0YWNoQ2VydDogZnVuY3Rpb24odXNlciwgcGFzcywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5leGVjdXRlKCdHZXRTZXNzaW9uSW5mbyAtYXR0YWNoQ2VydCAtYW1pTG9naW49XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh1c2VyKSArICdcIiAtYW1pUGFzc3dvcmQ9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwYXNzKSArICdcIicsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBEZXRhY2hlcyBhIGNlcnRpZmljYXRlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlciB0aGUgdXNlclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhc3MgdGhlIHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0ZGV0YWNoQ2VydDogZnVuY3Rpb24odXNlciwgcGFzcywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5leGVjdXRlKCdHZXRTZXNzaW9uSW5mbyAtZGV0YWNoQ2VydCAtYW1pTG9naW49XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh1c2VyKSArICdcIiAtYW1pUGFzc3dvcmQ9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwYXNzKSArICdcIicsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBZGRzIGEgbmV3IHVzZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyIHRoZSB1c2VyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcGFzcyB0aGUgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBmaXJzdE5hbWUgdGhlIGZpcnN0IG5hbWVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBsYXN0TmFtZSB0aGUgbGFzdCBuYW1lXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gZW1haWwgdGhlIGVtYWlsXG5cdCAgKiBAcGFyYW0ge0Jvb2xlYW59IGF0dGFjaCBhdHRhY2ggdGhlIGN1cnJlbnQgY2VydGlmaWNhdGVcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gYWdyZWUgYWdyZWUgd2l0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRhZGRVc2VyOiBmdW5jdGlvbih1c2VyLCBwYXNzLCBmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbCwgYXR0YWNoLCBhZ3JlZSwgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5leGVjdXRlKCdBZGRVc2VyIC1hbWlMb2dpbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHVzZXIpICsgJ1wiIC1hbWlQYXNzd29yZD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHBhc3MpICsgJ1wiIC1maXJzdE5hbWU9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhmaXJzdE5hbWUpICsgJ1wiIC1sYXN0TmFtZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGxhc3ROYW1lKSArICdcIiAtZW1haWw9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhlbWFpbCkgKyAnXCInICsgKGF0dGFjaCA/ICcgLWF0dGFjaCcgOiAnJykgKyAoYWdyZWUgPyAnIC1hZ3JlZScgOiAnJyksIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDaGFuZ2VzIHRoZSBhY2NvdW50IGluZm9ybWF0aW9uXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gZmlyc3ROYW1lIHRoZSBmaXJzdCBuYW1lXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gbGFzdE5hbWUgdGhlIGxhc3QgbmFtZVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGVtYWlsIHRoZSBlbWFpbFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNoYW5nZUluZm86IGZ1bmN0aW9uKGZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGUoJ1NldFVzZXJJbmZvIC1maXJzdE5hbWU9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhmaXJzdE5hbWUpICsgJ1wiIC1sYXN0TmFtZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGxhc3ROYW1lKSArICdcIiAtZW1haWw9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhlbWFpbCkgKyAnXCInLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hhbmdlcyB0aGUgYWNjb3VudCBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHVzZXIgdGhlIHVzZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRQYXNzIHRoZSBvbGQgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBuZXdQYXNzIHRoZSBuZXcgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjaGFuZ2VQYXNzOiBmdW5jdGlvbih1c2VyLCBvbGRQYXNzLCBuZXdQYXNzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGUoJ0NoYW5nZVBhc3N3b3JkIC1hbWlMb2dpbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHVzZXIpICsgJ1wiIC1hbWlQYXNzd29yZE9sZD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKG9sZFBhc3MpICsgJ1wiIC1hbWlQYXNzd29yZE5ldz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKG5ld1Bhc3MpICsgJ1wiJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFJlc2V0cyB0aGUgYWNjb3VudCBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHVzZXIgdGhlIHVzZXJcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRyZXNldFBhc3M6IGZ1bmN0aW9uKHVzZXIsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZSgnUmVzZXRQYXNzd29yZCAtYW1pTG9naW49XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh1c2VyKSArICdcIicsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlMb2dpbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgQU1JIGF1dGhlbnRpY2F0aW9uIHN1YnN5c3RlbVxuICogQG5hbWVzcGFjZSBhbWlMb2dpblxuICovXG5cbiRBTUlOYW1lc3BhY2UoJ2FtaUxvZ2luJywgLyoqIEBsZW5kcyBhbWlMb2dpbiAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y3JlYXRlQWNjb3VudEFsbG93ZWQ6IHRydWUsXG5cdGNoYW5nZUluZm9BbGxvd2VkOiB0cnVlLFxuXHRjaGFuZ2VQYXNzb3JkQWxsb3dlZDogdHJ1ZSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dXNlcjogJ2d1ZXN0Jyxcblx0Z3Vlc3Q6ICdndWVzdCcsXG5cblx0Y2xpZW50RE46ICcnLFxuXHRpc3N1ZXJETjogJycsXG5cblx0bm90QmVmb3JlOiAnJyxcblx0bm90QWZ0ZXI6ICcnLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyb2xlSW5mbzoge30sXG5cdHVkcEluZm86IHt9LFxuXHRzc29JbmZvOiB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBSSVZBVEUgTUVUSE9EUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9zdGFydDogZnVuY3Rpb24oY3JlYXRlQWNjb3VudEFsbG93ZWQsIGNoYW5nZUluZm9BbGxvd2VkLCBjaGFuZ2VQYXNzb3JkQWxsb3dlZClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvYWRUV0lHcyhbXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy90d2lnL0FNSS9GcmFnbWVudC9sb2dpbl9idXR0b24udHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy90d2lnL0FNSS9GcmFnbWVudC9sb2dvdXRfYnV0dG9uLnR3aWcnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvdHdpZy9BTUkvTW9kYWwvbG9naW4udHdpZycsXG5cdFx0XSkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLmZyYWdtZW50TG9naW5CdXR0b24gPSBkYXRhWzBdO1xuXHRcdFx0dGhpcy5mcmFnbWVudExvZ291dEJ1dHRvbiA9IGRhdGFbMV07XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRcdGNyZWF0ZUFjY291bnRBbGxvd2VkOiB0aGlzLmNyZWF0ZUFjY291bnRBbGxvd2VkID0gY3JlYXRlQWNjb3VudEFsbG93ZWQsXG5cdFx0XHRcdGNoYW5nZUluZm9BbGxvd2VkOiB0aGlzLmNoYW5nZUluZm9BbGxvd2VkID0gY2hhbmdlSW5mb0FsbG93ZWQsXG5cdFx0XHRcdGNoYW5nZVBhc3NvcmRBbGxvd2VkOiB0aGlzLmNoYW5nZVBhc3NvcmRBbGxvd2VkID0gY2hhbmdlUGFzc29yZEFsbG93ZWQsXG5cdFx0XHR9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRhbWlXZWJBcHAuYXBwZW5kSFRNTCgnYm9keScsIGRhdGFbMl0sIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdCQoJyNCNzg5NENDMV8xREFBXzRBN0VfQjdEMV9EQkRGNkYwNkFDNzMnKS5zdWJtaXQoKGUpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuZm9ybV9sb2dpbihlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnI0VFMDU1Q0Q0X0U1OEZfNDgzNF84MDIwXzk4NkFFM0Y4RDY3RCcpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5mb3JtX2FkZFVzZXIoZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdCQoJyNEQTIwNDdBMl85RTVEXzQyMERfQjZFN19GQTI2MUQyRUYxMEYnKS5zdWJtaXQoKGUpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuZm9ybV9yZW1pbmRQYXNzKGUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcjRDlFQUY5OThfRUQ4RV80NEQyX0EwQkVfOEM1Q0Y1RTQzOEJEJykuc3VibWl0KChlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmZvcm1fY2hhbmdlSW5mbyhlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnI0U5MkExMDk3Xzk4M0JfNDg1N184NzVGXzA3RTQ2NTlCNDFCMCcpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5mb3JtX2NoYW5nZVBhc3MoZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHQkKCcjRTZFMzBFRUNfMTVFRV80RkNGXzk4MDlfMkI4RUMyRkVGMzg4LCNDQ0Q4RTZGMV82REY4XzRCRERfQTBFQ19DM0MzODA4MzAxODcnKS5jaGFuZ2UoKCkgPT4ge1xuXG5cdFx0XHRcdFx0Y29uc3QgcGFzczEgPSAkKCcjRTZFMzBFRUNfMTVFRV80RkNGXzk4MDlfMkI4RUMyRkVGMzg4JykudmFsKCk7XG5cdFx0XHRcdFx0Y29uc3QgcGFzczIgPSAkKCcjQ0NEOEU2RjFfNkRGOF80QkREX0EwRUNfQzNDMzgwODMwMTg3JykudmFsKCk7XG5cblx0XHRcdFx0XHQkKCcjQ0NEOEU2RjFfNkRGOF80QkREX0EwRUNfQzNDMzgwODMwMTg3JykuZ2V0KDApLnNldEN1c3RvbVZhbGlkaXR5KFxuXHRcdFx0XHRcdFx0cGFzczEubGVuZ3RoID4gMCAmJiBwYXNzMi5sZW5ndGggPiAwICYmIHBhc3MxICE9PSBwYXNzMiA/ICdQYXNzd29yZHMgZG9uXFwndCBtYXRjaC4nIDogJydcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcjRDQ4N0ZFNzJfOEQ5NV80MDQ4X0JFQTNfMjUyMjc0ODYyQUY0LCNFRTFEQTU4Q18zNzYxXzQ3MzRfQTlDMl9FODA4Q0REN0VFNzcnKS5jaGFuZ2UoKCkgPT4ge1xuXG5cdFx0XHRcdFx0Y29uc3QgcGFzczEgPSAkKCcjRDQ4N0ZFNzJfOEQ5NV80MDQ4X0JFQTNfMjUyMjc0ODYyQUY0JykudmFsKCk7XG5cdFx0XHRcdFx0Y29uc3QgcGFzczIgPSAkKCcjRUUxREE1OENfMzc2MV80NzM0X0E5QzJfRTgwOENERDdFRTc3JykudmFsKCk7XG5cblx0XHRcdFx0XHQkKCcjRUUxREE1OENfMzc2MV80NzM0X0E5QzJfRTgwOENERDdFRTc3JykuZ2V0KDApLnNldEN1c3RvbVZhbGlkaXR5KFxuXHRcdFx0XHRcdFx0cGFzczEubGVuZ3RoID4gMCAmJiBwYXNzMi5sZW5ndGggPiAwICYmIHBhc3MxICE9PSBwYXNzMiA/ICdQYXNzd29yZHMgZG9uXFwndCBtYXRjaC4nIDogJydcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZSkgPT4ge1xuXG5cdFx0XHRcdGlmKHRoaXMuc3NvSW5mby51cmwuc3RhcnRzV2l0aChlLm9yaWdpbikpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCB1c2VyID0gZS5kYXRhLnVzZXI7XG5cdFx0XHRcdFx0Y29uc3QgcGFzcyA9IGUuZGF0YS5wYXNzO1xuXG5cdFx0XHRcdFx0aWYodXNlciAmJiBwYXNzKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRoaXMuZm9ybV9sb2dpbjIodXNlciwgcGFzcyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZS5zb3VyY2UuY2xvc2UoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9LCBmYWxzZSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IHVzZXJkYXRhID0gYW1pV2ViQXBwLmFyZ3NbJ3VzZXJkYXRhJ10gfHwgJyc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGFtaUNvbW1hbmQuY2VydExvZ2luKCkuZmFpbCgoZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5fdXBkYXRlKHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykuYWx3YXlzKCgvKi0tLSovKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSkuZG9uZSgoZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKSA9PiB7XG5cblx0XHRcdFx0X2FtaV9pbnRlcm5hbF90aGVuKGFtaVdlYkFwcC5vblJlYWR5KHVzZXJkYXRhKSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLl9pc1JlYWR5ID0gdHJ1ZTtcblxuXHRcdFx0XHRcdHRoaXMuX3VwZGF0ZSh1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pLnRoZW4oKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUobWVzc2FnZSk7XG5cblx0XHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuX2lzUmVhZHkgPSB0cnVlO1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9zdWNjZXNzOiBmdW5jdGlvbihtZXNzYWdlKVxuXHR7XG5cdFx0YW1pV2ViQXBwLnN1Y2Nlc3MobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblx0fSxcblxuXHRfZXJyb3I6IGZ1bmN0aW9uKG1lc3NhZ2UpXG5cdHtcblx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblx0fSxcblxuXHRfdW5sb2NrOiBmdW5jdGlvbigpXG5cdHtcblx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2NsZWFuOiBmdW5jdGlvbigpXG5cdHtcblx0XHQkKCcjQjc4OTRDQzFfMURBQV80QTdFX0I3RDFfREJERjZGMDZBQzczJykudHJpZ2dlcigncmVzZXQnKTtcblx0XHQkKCcjRUUwNTVDRDRfRTU4Rl80ODM0XzgwMjBfOTg2QUUzRjhENjdEJykudHJpZ2dlcigncmVzZXQnKTtcblx0XHQkKCcjREEyMDQ3QTJfOUU1RF80MjBEX0I2RTdfRkEyNjFEMkVGMTBGJykudHJpZ2dlcigncmVzZXQnKTtcblx0XHQkKCcjRTkyQTEwOTdfOTgzQl80ODU3Xzg3NUZfMDdFNDY1OUI0MUIwJykudHJpZ2dlcigncmVzZXQnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3VwZGF0ZTogZnVuY3Rpb24odXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVzZXIgPSB0aGlzLnVzZXIgPSB1c2VySW5mby5BTUlVc2VyIHx8ICcnO1xuXHRcdGNvbnN0IGd1ZXN0ID0gdGhpcy5ndWVzdCA9IHVzZXJJbmZvLmd1ZXN0VXNlciB8fCAnJztcblxuXHRcdGNvbnN0IG5vdEJlZm9yZSA9IHRoaXMubm90QmVmb3JlID0gdXNlckluZm8ubm90QmVmb3JlIHx8ICcnO1xuXHRcdGNvbnN0IG5vdEFmdGVyID0gdGhpcy5ub3RBZnRlciA9IHVzZXJJbmZvLm5vdEFmdGVyIHx8ICcnO1xuXG5cdFx0Y29uc3QgY2xpZW50RE5JblNlc3Npb24gPSB0aGlzLmNsaWVudEROID0gdXNlckluZm8uY2xpZW50RE5JblNlc3Npb24gfHwgJyc7XG5cdFx0Y29uc3QgaXNzdWVyRE5JblNlc3Npb24gPSB0aGlzLmlzc3VlckROID0gdXNlckluZm8uaXNzdWVyRE5JblNlc3Npb24gfHwgJyc7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdCQoJyNBMDlBRTMxNl83MDY4XzRCQzFfOTZBOV82Qjg3RDI4ODYzRkUnKS5wcm9wKCdkaXNhYmxlZCcsICFjbGllbnRETkluU2Vzc2lvbiB8fCAhaXNzdWVyRE5JblNlc3Npb24pO1xuXG5cdFx0JCgnI0MzRTk0RjZEXzQ4RTBfODZDMF8zNTM0XzY5MTcyOEU0OTJGNCcpLmF0dHIoJ3NyYycsIHVkcEluZm8udGVybXNBbmRDb25kaXRpb25zIHx8IGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2RvY3MvdGVybXNfYW5kX2NvbmRpdGlvbnMuaHRtbCcpO1xuXHRcdCQoJyNFNTBGRjhCRF9CMEY1X0NENzJfRjlEQ19GQzJCRkE1REJBMjcnKS5hdHRyKCdzcmMnLCB1ZHBJbmZvLnRlcm1zQW5kQ29uZGl0aW9ucyB8fCBhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9kb2NzL3Rlcm1zX2FuZF9jb25kaXRpb25zLmh0bWwnKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5yb2xlSW5mbyA9IHJvbGVJbmZvO1xuXHRcdHRoaXMudWRwSW5mbyA9IHVkcEluZm87XG5cdFx0dGhpcy5zc29JbmZvID0gc3NvSW5mbztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZGljdCA9IHtcblx0XHRcdGNyZWF0ZUFjY291bnRBbGxvd2VkOiB0aGlzLmNyZWF0ZUFjY291bnRBbGxvd2VkLFxuXHRcdFx0Y2hhbmdlSW5mb0FsbG93ZWQ6IHRoaXMuY2hhbmdlSW5mb0FsbG93ZWQsXG5cdFx0XHRjaGFuZ2VQYXNzb3JkQWxsb3dlZDogdGhpcy5jaGFuZ2VQYXNzb3JkQWxsb3dlZCxcblx0XHRcdC8qKi9cblx0XHRcdHNzb19sYWJlbDogc3NvSW5mby5sYWJlbCB8fCAnU1NPJyxcblx0XHRcdHNzb191cmw6IHNzb0luZm8udXJsIHx8ICdATlVMTCcsXG5cdFx0fTtcblxuXHRcdGlmKHVzZXIgIT09IGd1ZXN0KVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBHRVQgSU5GTyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgdmFsaWQgPSB1c2VySW5mby52YWxpZCB8fCAnZmFsc2UnO1xuXHRcdFx0Y29uc3QgY2VydEVuYWJsZWQgPSB1c2VySW5mby5jZXJ0RW5hYmxlZCB8fCAnZmFsc2UnO1xuXHRcdFx0Y29uc3Qgdm9tc0VuYWJsZWQgPSB1c2VySW5mby52b21zRW5hYmxlZCB8fCAnZmFsc2UnO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBmaXJzdE5hbWUgPSB1c2VySW5mby5maXJzdE5hbWUgfHwgJyc7XG5cdFx0XHRjb25zdCBsYXN0TmFtZSA9IHVzZXJJbmZvLmxhc3ROYW1lIHx8ICcnO1xuXHRcdFx0Y29uc3QgZW1haWwgPSB1c2VySW5mby5lbWFpbCB8fCAnJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgY2xpZW50RE5JbkFNSSA9IHVzZXJJbmZvLmNsaWVudEROSW5BTUkgfHwgJyc7XG5cdFx0XHRjb25zdCBpc3N1ZXJETkluQU1JID0gdXNlckluZm8uaXNzdWVyRE5JbkFNSSB8fCAnJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNFVCBJTkZPICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKCcjRTUxM0YyN0RfNTUyMV80QjA4X0JGNjFfNTJBRkI4MTM1NkY3JykudmFsKGZpcnN0TmFtZSk7XG5cdFx0XHQkKCcjQUZGMEI1QzBfQkVFQ180ODQyXzkxNkRfRENCQTdGNTg5MTk1JykudmFsKGxhc3ROYW1lKTtcblx0XHRcdCQoJyNDNTg3NDg2Ql82MkMwXzRCNkVfOTI4OF9EOEY5Rjg5RDE1N0InKS52YWwoZW1haWwpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKCcjQUJFQjAyOTFfNDBCMF80MTRBX0E0MkJfRTdFQUJCOUI0ODdFJykudmFsKGZpcnN0TmFtZSk7XG5cdFx0XHQkKCcjQTVBRkRCNjJfMTAzNF80RjY2X0EzRTZfOTM0MUIzMUZBMjkwJykudmFsKGxhc3ROYW1lKTtcblx0XHRcdCQoJyNENzMwQTc3NF8wNUVBXzQ3QUJfQTBDOF9EOTI3NTM4MDJFM0UnKS52YWwoZW1haWwpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKCcjRDFCRUUzQkZfOTE2MV80MURDX0JDNTNfQzQ0RkZFNEQyNTIyJykudmFsKGNsaWVudEROSW5BTUkpO1xuXHRcdFx0JCgnI0M3NjgwNUQ3XzFFODZfNDIzMV85MDcxXzFEMDQ3ODM0MjNCQicpLnZhbChjbGllbnRETkluU2Vzc2lvbik7XG5cdFx0XHQkKCcjRjQyRkFGNkJfMkM4RF80MTQyXzhCRDlfRTVCQ0RDQUEwNUFBJykudmFsKGlzc3VlckROSW5BTUkpO1xuXHRcdFx0JCgnI0ZFMkY2MjMyX0MyNTZfNEI4MF85MzlDX0VCRUM5MDMyMDMwOCcpLnZhbChpc3N1ZXJETkluU2Vzc2lvbik7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGxldCB0YWJsZSA9IFtdO1xuXG5cdFx0XHRmb3IobGV0IHJvbGUgaW4gcm9sZUluZm8pXG5cdFx0XHR7XG5cdFx0XHRcdHRhYmxlLnB1c2goJzx0cj4nKTtcblx0XHRcdFx0dGFibGUucHVzaCgnPHRkPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChyb2xlSW5mb1tyb2xlXS5uYW1lIHx8ICdOL0EnKSArICc8L3RkPicpO1xuXHRcdFx0XHR0YWJsZS5wdXNoKCc8dGQ+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKHJvbGVJbmZvW3JvbGVdLmRlc2NyaXB0aW9uIHx8ICdOL0EnKSArICc8L3RkPicpO1xuXHRcdFx0XHR0YWJsZS5wdXNoKCc8L3RyPicpO1xuXHRcdFx0fVxuXG5cdFx0XHQkKCcjQkIwNzY3NkJfRUFDQV85QjQyX0VENTFfNDc3REIyOTc2MDQxJykuaHRtbCh0YWJsZS5qb2luKCcnKSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBDSEVDSyBVU0VSIFNUQVRVUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGV0IGljb24gPSAnJztcblx0XHRcdGxldCBtZXNzYWdlID0gJyc7XG5cblx0XHRcdGlmKHZhbGlkICE9PSAnZmFsc2UnKVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdC8qIFZBTElEIFVTRVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKGNlcnRFbmFibGVkICE9PSAnZmFsc2UnICYmIGNsaWVudEROSW5BTUkgJiYgaXNzdWVyRE5JbkFNSSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKCFjbGllbnRETkluU2Vzc2lvblxuXHRcdFx0XHRcdCAgIHx8XG5cdFx0XHRcdFx0ICAgIWlzc3VlckROSW5TZXNzaW9uXG5cdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0bWVzc2FnZSA9ICdJdCBpcyByZWNvbW1lbmRlZCB0byBjb25uZWN0IHRvIEFNSSB3aXRoIGEgWC41MDkgY2VydGlmaWNhdGUuJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmKGNsaWVudEROSW5BTUkgIT09IGNsaWVudEROSW5TZXNzaW9uXG5cdFx0XHRcdFx0XHQgICB8fFxuXHRcdFx0XHRcdFx0ICAgaXNzdWVyRE5JbkFNSSAhPT0gaXNzdWVyRE5JblNlc3Npb25cblx0XHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdFx0bWVzc2FnZSA9ICdUaGUgY2VydGlmaWNhdGUgaW4geW91ciBzZXNzaW9uIGlzIG5vdCB0aGUgb25lIHJlZ2lzdGVyZWQgaW4gQU1JLic7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKG1lc3NhZ2UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkKCcjRDk0NEIwMURfMkU4RF80RUU5XzlEQ0NfMjY5MTQzOEJCQTE2JykuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1pbmZvLWNpcmNsZSB0ZXh0LXdhcm5pbmdcIj48L2k+ICcgKyBtZXNzYWdlKTtcblxuXHRcdFx0XHRcdGljb24gPSAnPGEgY2xhc3M9XCJuYXYtbGluayB0ZXh0LXdhcm5pbmdcIiBocmVmPVwiamF2YXNjcmlwdDphbWlMb2dpbi5hY2NvdW50U3RhdHVzKCk7XCI+J1xuXHRcdFx0XHRcdCAgICAgICArXG5cdFx0XHRcdFx0ICAgICAgICc8aSBjbGFzcz1cImZhIGZhLWluZm8tY2lyY2xlXCI+PC9pPidcblx0XHRcdFx0XHQgICAgICAgK1xuXHRcdFx0XHRcdCAgICAgICAnPC9hPidcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0YzRkY5RjQzX0RFNzJfNDBCQl9CMUJBX0I3QjNDOTAwMjY3MScpLnBhcmVudCgpLmNzcygnYmFja2dyb3VuZCcsICcjQjhENDlCIHVybChcIicgKyBhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9pbWFnZXMvY2VydGlmaWNhdGUtZ3JlZW4ucG5nXCIpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyJylcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnYmFja2dyb3VuZC1zaXplJywgJ2NvdmVyJylcblx0XHRcdFx0O1xuXG5cdFx0XHRcdCQoJyNGM0ZGOUY0M19ERTcyXzQwQkJfQjFCQV9CN0IzQzkwMDI2NzEnKS5jc3MoJ2NvbG9yJywgJyMwMDY0MDAnKVxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1sZWFmXCI+PC9pPiB2YWxpZCA8aSBjbGFzcz1cImZhIGZhLWxlYWZcIj48L2k+Jylcblx0XHRcdFx0O1xuXG5cdFx0XHRcdCQoJyNFOTEyODBGNl9FN0M2XzNFNTNfQTQ1N182NDY5OTVDOTkzMTcnKS50ZXh0KG5vdEJlZm9yZSArICcgLSAnICsgbm90QWZ0ZXIpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBJTlZBTElEIFVTRVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZih2b21zRW5hYmxlZCAhPT0gJ2ZhbHNlJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKCFjbGllbnRETkluQU1JXG5cdFx0XHRcdFx0ICAgfHxcblx0XHRcdFx0XHQgICAhaXNzdWVyRE5JbkFNSVxuXHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdG1lc3NhZ2UgPSAnUmVnaXN0ZXIgYSB2YWxpZCBjZXJ0aWZpY2F0ZS4nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bWVzc2FnZSA9ICdDaGVjayB5b3VyIFZPIHJvbGVzLic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG1lc3NhZ2UgPSAnQ29udGFjdCB0aGUgQU1JIHRlYW0uJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihtZXNzYWdlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgnI0Q5NDRCMDFEXzJFOERfNEVFOV85RENDXzI2OTE0MzhCQkExNicpLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGUgdGV4dC1kYW5nZXJcIj48L2k+ICcgKyBtZXNzYWdlKTtcblxuXHRcdFx0XHRcdGljb24gPSAnPGEgY2xhc3M9XCJuYXYtbGluayB0ZXh0LWRhbmdlclwiIGhyZWY9XCJqYXZhc2NyaXB0OmFtaUxvZ2luLmFjY291bnRTdGF0dXMoKTtcIj4nXG5cdFx0XHRcdFx0ICAgICAgICtcblx0XHRcdFx0XHQgICAgICAgJzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGVcIj48L2k+J1xuXHRcdFx0XHRcdCAgICAgICArXG5cdFx0XHRcdFx0ICAgICAgICc8L2E+J1xuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHQkKCcjRjNGRjlGNDNfREU3Ml80MEJCX0IxQkFfQjdCM0M5MDAyNjcxJykucGFyZW50KCkuY3NzKCdiYWNrZ3JvdW5kJywgJyNFOEM4Q0YgdXJsKFwiJyArIGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2ltYWdlcy9jZXJ0aWZpY2F0ZS1waW5rLnBuZ1wiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlcicpXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ2JhY2tncm91bmQtc2l6ZScsICdjb3ZlcicpXG5cdFx0XHRcdDtcblxuXHRcdFx0XHQkKCcjRjNGRjlGNDNfREU3Ml80MEJCX0IxQkFfQjdCM0M5MDAyNjcxJykuY3NzKCdjb2xvcicsICcjOEIwMDAwJylcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtbGVhZlwiPjwvaT4gaW52YWxpZCA8aSBjbGFzcz1cImZhIGZhLWxlYWZcIj48L2k+Jylcblx0XHRcdFx0O1xuXG5cdFx0XHRcdCQoJyNFOTEyODBGNl9FN0M2XzNFNTNfQTQ1N182NDY5OTVDOTkzMTcnKS50ZXh0KG5vdEJlZm9yZSArICcgLSAnICsgbm90QWZ0ZXIpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFVQREFURSBNRU5VIEJBUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRkaWN0Wyd1c2VyJ10gPSB1c2VyO1xuXHRcdFx0ZGljdFsnaWNvbiddID0gaWNvbjtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX2xvZ2luX21lbnVfY29udGVudCcsIHRoaXMuZnJhZ21lbnRMb2dvdXRCdXR0b24sIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnRyaWdnZXJMb2dpbigpLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGFtaVdlYkFwcC5yZXBsYWNlSFRNTCgnI2FtaV9sb2dpbl9tZW51X2NvbnRlbnQnLCB0aGlzLmZyYWdtZW50TG9naW5CdXR0b24sIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnRyaWdnZXJMb2dvdXQoKS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlKCk7XG5cblx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBVQkxJQyBNRVRIT0RTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgY3VycmVudCB1c2VyXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgY3VycmVudCB1c2VyXG5cdCAgKi9cblxuXHRnZXRVc2VyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy51c2VyO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIGd1ZXN0IHVzZXJcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBndWVzdCB1c2VyXG5cdCAgKi9cblxuXHRnZXRHdWVzdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZ3Vlc3Q7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgY2xpZW50IEROXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgY2xpZW50IEROXG5cdCAgKi9cblxuXHRnZXRDbGllbnRETjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuY2xpZW50RE47XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgaXNzdWVyIEROXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgaXNzdWVyIEROXG5cdCAgKi9cblxuXHRnZXRJc3N1ZXJETjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNzdWVyRE47XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hlY2tzIHdoZXRoZXIgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZFxuXHQgICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAgKi9cblxuXHRpc0F1dGhlbnRpY2F0ZWQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnVzZXIgIT09IHRoaXMuZ3Vlc3Q7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hlY2tzIHdoZXRoZXIgdGhlIHVzZXIgaGFzIHRoZSBnaXZlbiByb2xlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcm9sZSB0aGUgcm9sZVxuXHQgICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAgKi9cblxuXHRoYXNSb2xlOiBmdW5jdGlvbihyb2xlTmFtZSlcblx0e1xuXHRcdHJldHVybiByb2xlTmFtZSBpbiB0aGlzLnJvbGVJbmZvO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnU1NPJyBtb2RhbCB3aW5kb3dcblx0ICAqL1xuXG5cdHNzbzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblxuXHRcdHdpbmRvdy5vcGVuKHRoaXMuc3NvSW5mby51cmwsICdTaW5nbGUgU2lnbi1PbicsICdtZW51YmFyPW5vLCBzdGF0dXM9bm8sIHNjcm9sbGJhcnM9bm8sIHdpZHRoPTgwMCwgaGVpZ2h0PTQ1MCcpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnU2lnbkluJyBtb2RhbCB3aW5kb3dcblx0ICAqL1xuXG5cdHNpZ25JbjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblxuXHRcdCQoJyNEMkI1RkFERV85N0EzXzRCOENfODU2MV83QTlBRUFDREJFNUInKS5tb2RhbCgnc2hvdycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnQ2hhbmdlIEluZm8nIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0Y2hhbmdlSW5mbzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblxuXHRcdCQoJyNEOUVBRjk5OF9FRDhFXzQ0RDJfQTBCRV84QzVDRjVFNDM4QkQnKS5tb2RhbCgnc2hvdycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnQ2hhbmdlIFBhc3N3b3JkJyBtb2RhbCB3aW5kb3dcblx0ICAqL1xuXG5cdGNoYW5nZVBhc3M6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuX2NsZWFuKCk7XG5cblx0XHQkKCcjRTkyQTEwOTdfOTgzQl80ODU3Xzg3NUZfMDdFNDY1OUI0MUIwJykubW9kYWwoJ3Nob3cnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBPcGVucyB0aGUgJ0FjY291bnQgU3RhdHVzJyBtb2RhbCB3aW5kb3dcblx0ICAqL1xuXG5cdGFjY291bnRTdGF0dXM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuX2NsZWFuKCk7XG5cblx0XHQkKCcjQUIxQ0IxODNfOTZFQl80MTE2XzhBOUVfNDQwOUJFMDU4RjM0JykubW9kYWwoJ3Nob3cnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTaWducyBvdXRcblx0ICAqL1xuXG5cdHNpZ25PdXQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRyZXR1cm4gYW1pQ29tbWFuZC5sb2dvdXQoKS5hbHdheXMoKGRhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykgPT4ge1xuXG5cdFx0XHR0aGlzLl91cGRhdGUodXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLl91bmxvY2soKTtcblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2xvZ2luOiBmdW5jdGlvbihlKVxuXHR7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gJChlLnRhcmdldCkuc2VyaWFsaXplT2JqZWN0KCk7XG5cblx0XHRyZXR1cm4gdGhpcy5mb3JtX2xvZ2luMih2YWx1ZXNbJ3VzZXInXSwgdmFsdWVzWydwYXNzJ10pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2xvZ2luMjogZnVuY3Rpb24odXNlciwgcGFzcylcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgcHJvbWlzZSA9ICh1c2VyICYmIHBhc3MpID8gYW1pQ29tbWFuZC5wYXNzTG9naW4odXNlci50cmltKCksIHBhc3MudHJpbSgpKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFtaUNvbW1hbmQuY2VydExvZ2luKC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0qLylcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRwcm9taXNlLnRoZW4oKGRhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykgPT4ge1xuXG5cdFx0XHR0aGlzLl91cGRhdGUodXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRpZih1c2VySW5mby5BTUlVc2VyICE9PSB1c2VySW5mby5ndWVzdFVzZXIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkKCcjRDJCNUZBREVfOTdBM180QjhDXzg1NjFfN0E5QUVBQ0RCRTVCJykubW9kYWwoJ2hpZGUnKTtcblxuXHRcdFx0XHRcdHRoaXMuX3VubG9jaygpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0aWYodXNlckluZm8uQU1JVXNlciAhPT0gdXNlckluZm8uZ3Vlc3RVc2VyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgnI0QyQjVGQURFXzk3QTNfNEI4Q184NTYxXzdBOUFFQUNEQkU1QicpLm1vZGFsKCdoaWRlJyk7XG5cblx0XHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmKHVzZXJJbmZvLkFNSVVzZXIgPT09IHVzZXJJbmZvLmd1ZXN0VXNlcilcblx0XHRcdHtcblx0XHRcdFx0bGV0IG1lc3NhZ2UgPSAnQXV0aGVudGljYXRpb24gZmFpbGVkLic7XG5cblx0XHRcdFx0aWYodXNlckluZm8uY2xpZW50RE5JblNlc3Npb24gfHwgdXNlckluZm8uaXNzdWVyRE5JblNlc3Npb24pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtZXNzYWdlICs9ICcgQ2xpZW50IEROIGluIHNlc3Npb246ICcgKyBhbWlXZWJBcHAudGV4dFRvSHRtbCh1c2VySW5mby5jbGllbnRETkluU2Vzc2lvbikgKyAnLidcblx0XHRcdFx0XHQgICAgICAgICAgICtcblx0XHRcdFx0XHQgICAgICAgICAgICcgSXNzdWVyIEROIGluIHNlc3Npb246ICcgKyBhbWlXZWJBcHAudGV4dFRvSHRtbCh1c2VySW5mby5pc3N1ZXJETkluU2Vzc2lvbikgKyAnLidcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdH1cblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pID0+IHtcblxuXHRcdFx0dGhpcy5fdXBkYXRlKHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykuYWx3YXlzKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fYXR0YWNoQ2VydDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1c2VyID0gJCgnI0U2NEYyNEIyXzMzRTZfNERFRF85QjI0XzI4QkUwNDIxOTYxMycpLnZhbCgpO1xuXHRcdGNvbnN0IHBhc3MgPSAkKCcjQTRERkQwMzlfMDM0Rl80RDEwXzk2NjhfMzg1QUVGNEZCQkI5JykudmFsKCk7XG5cblx0XHRpZighdXNlciB8fCAhcGFzcylcblx0XHR7XG5cdFx0XHR0aGlzLl9lcnJvcignUGxlYXNlLCBmaWxsIGFsbCBmaWVsZHMgd2l0aCBhIHJlZCBzdGFyLicpO1xuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5hdHRhY2hDZXJ0KHVzZXIsIHBhc3MpLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fZGV0YWNoQ2VydDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1c2VyID0gJCgnI0U2NEYyNEIyXzMzRTZfNERFRF85QjI0XzI4QkUwNDIxOTYxMycpLnZhbCgpO1xuXHRcdGNvbnN0IHBhc3MgPSAkKCcjQTRERkQwMzlfMDM0Rl80RDEwXzk2NjhfMzg1QUVGNEZCQkI5JykudmFsKCk7XG5cblx0XHRpZighdXNlciB8fCAhcGFzcylcblx0XHR7XG5cdFx0XHR0aGlzLl9lcnJvcignUGxlYXNlLCBmaWxsIGFsbCBmaWVsZHMgd2l0aCBhIHJlZCBzdGFyLicpO1xuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5kZXRhY2hDZXJ0KHVzZXIsIHBhc3MpLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fYWRkVXNlcjogZnVuY3Rpb24oZSlcblx0e1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gJChlLnRhcmdldCkuc2VyaWFsaXplT2JqZWN0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmFkZFVzZXIodmFsdWVzWydsb2dpbiddLCB2YWx1ZXNbJ3Bhc3MnXSwgdmFsdWVzWydmaXJzdF9uYW1lJ10sIHZhbHVlc1snbGFzdF9uYW1lJ10sIHZhbHVlc1snZW1haWwnXSwgJ2F0dGFjaCcgaW4gdmFsdWVzLCAnYWdyZWUnIGluIHZhbHVlcykudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9yZW1pbmRQYXNzOiBmdW5jdGlvbihlKVxuXHR7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB2YWx1ZXMgPSAkKGUudGFyZ2V0KS5zZXJpYWxpemVPYmplY3QoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdGFtaUNvbW1hbmQucmVzZXRQYXNzKHZhbHVlc1sndXNlciddKS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX3N1Y2Nlc3MobWVzc2FnZSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX2NoYW5nZUluZm86IGZ1bmN0aW9uKGUpXG5cdHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHZhbHVlcyA9ICQoZS50YXJnZXQpLnNlcmlhbGl6ZU9iamVjdCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5jaGFuZ2VJbmZvKHZhbHVlc1snZmlyc3RfbmFtZSddLCB2YWx1ZXNbJ2xhc3RfbmFtZSddLCB2YWx1ZXNbJ2VtYWlsJ10pLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fY2hhbmdlUGFzczogZnVuY3Rpb24oZSlcblx0e1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gJChlLnRhcmdldCkuc2VyaWFsaXplT2JqZWN0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmNoYW5nZVBhc3ModGhpcy51c2VyLCB2YWx1ZXNbJ29sZF9wYXNzJ10sIHZhbHVlc1snbmV3X3Bhc3MnXSkudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qIVxuICogQU1JIFdlYiBGcmFtZXdvcmsgLSBBTUlEb2MuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxOSBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyogZXNsaW50LWRpc2FibGUgKi9cblxudmFyIGFtaURvYyA9IHtcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCIkQU1JTmFtZXNwYWNlXCIsXCJkZXNjXCI6XCJDcmVhdGUgYSBuZXcgbmFtZXNwYWNlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiJG5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIG5hbWVzcGFjZSBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiJGRlc2NyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBuYW1lc3BhY2UgYm9keVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwiJEFNSUludGVyZmFjZVwiLFwiZGVzY1wiOlwiQ3JlYXRlIGEgbmV3IGludGVyZmFjZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIiRuYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBpbnRlcmZhY2UgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIiRkZXNjclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgaW50ZXJmYWNlIGJvZHlcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIiRBTUlDbGFzc1wiLFwiZGVzY1wiOlwiQ3JlYXRlIGEgbmV3IGNsYXNzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiJG5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGNsYXNzIG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCIkZGVzY3JcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIGNsYXNzIGJvZHlcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19XSxcIm5hbWVzcGFjZXNcIjpbe1wibmFtZVwiOlwiYW1pUm91dGVyXCIsXCJkZXNjXCI6XCJUaGUgQU1JIHVybCByb3V0aW5nIHN1YnN5c3RlbVwiLFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcImdldFNjcmlwdFVSTFwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgQVdGJ3Mgc2NyaXB0IFVSTFwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIEFXRidzIHNjcmlwdCBVUkxcIn1dfSx7XCJuYW1lXCI6XCJnZXRPcmlnaW5VUkxcIixcImRlc2NcIjpcIkdldHMgdGhlIG9yaWdpbiBVUkxcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBvcmlnaW4gVVJMXCJ9XX0se1wibmFtZVwiOlwiZ2V0V2ViQXBwVVJMXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSB3ZWJhcHAgVVJMXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgd2ViYXBwIFVSTFwifV19LHtcIm5hbWVcIjpcImdldEhhc2hcIixcImRlc2NcIjpcIkdldHMgdGhlIGFuY2hvciBwYXJ0IG9mIHRoZSB3ZWJhcHAgVVJMXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgYW5jaG9yIHBhcnQgb2YgdGhlIHdlYmFwcCBVUkxcIn1dfSx7XCJuYW1lXCI6XCJnZXRBcmdzXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBhcmd1bWVudHMgZXh0cmFjdGVkIGZyb20gdGhlIHdlYmFwcCBVUkxcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJBcnJheS48U3RyaW5nPlwiLFwiZGVzY1wiOlwiVGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFwifV19LHtcIm5hbWVcIjpcImFwcGVuZFwiLFwiZGVzY1wiOlwiQXBwZW5kcyBhIHJvdXRpbmcgcnVsZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInJlZ0V4cFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcmVnRXhwXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiaGFuZGxlclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgaGFuZGxlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiTmFtZXNwYWNlXCIsXCJkZXNjXCI6XCJUaGUgYW1pUm91dGVyIHNpbmdsZXRvblwifV19LHtcIm5hbWVcIjpcInJlbW92ZVwiLFwiZGVzY1wiOlwiUmVtb3ZlcyBzb21lIHJvdXRpbmcgcnVsZXNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJyZWdFeHBcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHJlZ0V4cFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiTmFtZXNwYWNlXCIsXCJkZXNjXCI6XCJUaGUgYW1pUm91dGVyIHNpbmdsZXRvblwifV19LHtcIm5hbWVcIjpcImNoZWNrXCIsXCJkZXNjXCI6XCJDaGVja3Mgd2hldGhlciB0aGUgVVJMIG1hdGNoZXMgd2l0aCBhIHJvdXRpbmcgcnVsZVwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19LHtcIm5hbWVcIjpcImFwcGVuZEhpc3RvcnlFbnRyeVwiLFwiZGVzY1wiOlwiQXBwZW5kIGEgbmV3IGhpc3RvcnkgZW50cnlcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXRoXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBuZXcgcGF0aFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRleHRcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIG5ldyBjb250ZXh0XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJyZXBsYWNlSGlzdG9yeUVudHJ5XCIsXCJkZXNjXCI6XCJSZXBsYWNlIHRoZSBjdXJyZW50IGhpc3RvcnkgZW50cnlcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXRoXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBuZXcgcGF0aFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRleHRcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIG5ldyBjb250ZXh0XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfV19LHtcIm5hbWVcIjpcImFtaVdlYkFwcFwiLFwiZGVzY1wiOlwiVGhlIEFNSSB3ZWJhcHAgc3Vic3lzdGVtXCIsXCJ2YXJpYWJsZXNcIjpbe1wibmFtZVwiOlwib3JpZ2luVVJMXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBvcmlnaW4gVVJMXCJ9LHtcIm5hbWVcIjpcIndlYkFwcFVSTFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgd2ViYXBwIFVSTFwifSx7XCJuYW1lXCI6XCJoYXNoXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBhbmNob3IgcGFydCBvZiB0aGUgd2ViYXBwIFVSTFwifSx7XCJuYW1lXCI6XCJhcmdzXCIsXCJ0eXBlXCI6XCJBcnJheS48U3RyaW5nPlwiLFwiZGVzY1wiOlwiVGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFwifV0sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwiaXNFbWJlZGRlZFwiLFwiZGVzY1wiOlwiQ2hlY2tzIHdoZXRoZXIgdGhlIFdlYkFwcCBpcyBleGVjdXRlZCBpbiBlbWJlZGRlZCBtb2RlXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX0se1wibmFtZVwiOlwiaXNMb2NhbFwiLFwiZGVzY1wiOlwiQ2hlY2tzIHdoZXRoZXIgdGhlIFdlYkFwcCBpcyBleGVjdXRlZCBsb2NhbGx5IChmaWxlOi8vLCBsb2NhbGhvc3QsIDEyNy4wLjAuMSBvciA6OjEpXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX0se1wibmFtZVwiOlwidGV4dFRvSHRtbFwiLFwiZGVzY1wiOlwiRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBIVE1MXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1bmVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBlc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcImh0bWxUb1RleHRcIixcImRlc2NcIjpcIlVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSFRNTCB0byB0ZXh0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgdW5lc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcInRleHRUb1N0cmluZ1wiLFwiZGVzY1wiOlwiRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBKYXZhU2NyaXB0IHN0cmluZ1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdW5lc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJzdHJpbmdUb1RleHRcIixcImRlc2NcIjpcIlVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSmF2YVNjcmlwdCBzdHJpbmcgdG8gdGV4dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHVuZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJodG1sVG9TdHJpbmdcIixcImRlc2NcIjpcIkVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEhUTUwgdG8gSmF2YVNjcmlwdCBzdHJpbmdcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVuZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwic3RyaW5nVG9IdG1sXCIsXCJkZXNjXCI6XCJVbmVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIEphdmFTY3JpcHQgc3RyaW5nIHRvIEhUTUxcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSB1bmVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwidGV4dFRvU1FMXCIsXCJkZXNjXCI6XCJFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIFNRTFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdW5lc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJzcWxUb1RleHRcIixcImRlc2NcIjpcIlVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gU1FMIHRvIHRleHRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSB1bmVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwiYmFzZTY0RW5jb2RlXCIsXCJkZXNjXCI6XCJFbmNvZGVzIChSRkMgNDY0OCkgYSBzdHJpbmdcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGRlY29kZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBlbmNvZGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcImJhc2U2NERlY29kZVwiLFwiZGVzY1wiOlwiRGVjb2RlcyAoUkZDIDQ2NDgpIGEgc3RyaW5nXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlbmNvZGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZGVjb2RlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJsb2FkUmVzb3VyY2VzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyByZXNvdXJjZXMgYnkgZXh0ZW5zaW9uXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkU2hlZXRzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBDU1Mgc2hlZXRzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkU2NyaXB0c1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgSlMgc2NyaXB0c1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZEpTT05zXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBKU09OIGZpbGVzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkWE1Mc1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgWE1MIGZpbGVzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkSFRNTHNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIEhUTUwgZmlsZXNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRUV0lHc1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgVFdJRyBmaWxlc1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFRleHRzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyB0ZXh0IGZpbGVzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJyZXBsYWNlSFRNTFwiLFwiZGVzY1wiOlwiUHV0cyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwicHJlcGVuZEhUTUxcIixcImRlc2NcIjpcIlByZXBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJhcHBlbmRIVE1MXCIsXCJkZXNjXCI6XCJBcHBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJmb3JtYXRUV0lHXCIsXCJkZXNjXCI6XCJJbnRlcnByZXRlcyB0aGUgZ2l2ZW4gVFdJRyBzdHJpbmcsIHNlZSB7QGxpbmsgaHR0cDovL3R3aWcuc2Vuc2lvbGFicy5vcmcvZG9jdW1lbnRhdGlvbn1cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImRpY3RcIixcInR5cGVcIjpbXCJPYmplY3RcIixcIkFycmF5XCJdLFwiZGVzY1wiOlwidGhlIGRpY3Rpb25hcnlcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIEludGVycHJldGVkIFRXSUcgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwianNwYXRoXCIsXCJkZXNjXCI6XCJGaW5kcyBkYXRhIHdpdGhpbiB0aGUgZ2l2ZW4gSlNPTiwgc2VlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vZGZpbGF0b3YvanNwYXRofVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhdGhcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHBhdGhcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJqc29uXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBKU09OXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJBcnJheVwiLFwiZGVzY1wiOlwiVGhlIHJlc3VsdGluZyBhcnJheVwifV19LHtcIm5hbWVcIjpcImxvY2tcIixcImRlc2NcIjpcIkxvY2tzIHRoZSBXZWIgYXBwbGljYXRpb25cIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJ1bmxvY2tcIixcImRlc2NcIjpcIlVubG9ja3MgdGhlIFdlYiBhcHBsaWNhdGlvblwiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImNhbkxlYXZlXCIsXCJkZXNjXCI6XCJFbmFibGVzIHRoZSBtZXNzYWdlIGluIGEgY29uZmlybWF0aW9uIGRpYWxvZyBib3ggdG8gaW5mb3JtIHRoYXQgdGhlIHVzZXIgaXMgYWJvdXQgdG8gbGVhdmUgdGhlIGN1cnJlbnQgcGFnZS5cIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJjYW5ub3RMZWF2ZVwiLFwiZGVzY1wiOlwiRGlzYWJsZXMgdGhlIG1lc3NhZ2UgaW4gYSBjb25maXJtYXRpb24gZGlhbG9nIGJveCB0byBpbmZvcm0gdGhhdCB0aGUgdXNlciBpcyBhYm91dCB0byBsZWF2ZSB0aGUgY3VycmVudCBwYWdlLlwiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImluZm9cIixcImRlc2NcIjpcIlNob3dzIGFuICdpbmZvJyBtZXNzYWdlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwibWVzc2FnZVwiLFwidHlwZVwiOltcIlN0cmluZ1wiLFwiQXJyYXlcIl0sXCJkZXNjXCI6XCJ0aGUgbWVzc2FnZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImZhZGVPdXRcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcImlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJzdWNjZXNzXCIsXCJkZXNjXCI6XCJTaG93cyBhICdzdWNjZXNzJyBtZXNzYWdlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwibWVzc2FnZVwiLFwidHlwZVwiOltcIlN0cmluZ1wiLFwiQXJyYXlcIl0sXCJkZXNjXCI6XCJ0aGUgbWVzc2FnZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImZhZGVPdXRcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcImlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJ3YXJuaW5nXCIsXCJkZXNjXCI6XCJTaG93cyBhICd3YXJuaW5nJyBtZXNzYWdlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwibWVzc2FnZVwiLFwidHlwZVwiOltcIlN0cmluZ1wiLFwiQXJyYXlcIl0sXCJkZXNjXCI6XCJ0aGUgbWVzc2FnZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImZhZGVPdXRcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcImlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJlcnJvclwiLFwiZGVzY1wiOlwiU2hvd3MgYW4gJ2Vycm9yJyBtZXNzYWdlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwibWVzc2FnZVwiLFwidHlwZVwiOltcIlN0cmluZ1wiLFwiQXJyYXlcIl0sXCJkZXNjXCI6XCJ0aGUgbWVzc2FnZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImZhZGVPdXRcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcImlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJmbHVzaFwiLFwiZGVzY1wiOlwiRmx1c2hlcyBtZXNzYWdlc1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImZpbGxCcmVhZGNydW1iXCIsXCJkZXNjXCI6XCJGaWxsIHRoZSBtYWluIGJyZWFkY3J1bWJcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJpdGVtc1wiLFwidHlwZVwiOlwiQXJyYXlcIixcImRlc2NcIjpcInRoZSBhcnJheSBvZiBpdGVtcyAoSFRNTCBmb3JtYXQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJzdGFydFwiLFwiZGVzY1wiOlwiU3RhcnRzIHRoZSBXZWIgYXBwbGljYXRpb25cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChsb2dvX3VybCwgaG9tZV91cmwsIGNvbnRhY3RfZW1haWwsIGFib3V0X3VybCwgdGhlbWVfdXJsLCBsb2NrZXJfdXJsLCBjaGFuZ2VfcGFzc29yZF9hbGxvd2VkLCBjaGFuZ2VfaW5mb19hbGxvd2VkLCBjaGFuZ2VfcGFzc29yZF9hbGxvd2VkKVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwibG9hZENvbnRyb2xcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIGEgY29udHJvbFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcImNvbnRyb2xcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIGNvbnRyb2wgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjcmVhdGVDb250cm9sXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGFyZW50XCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIm93bmVyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRyb2xcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFyYW1zXCIsXCJ0eXBlXCI6XCJBcnJheVwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNyZWF0ZUNvbnRyb2xJbkJvZHlcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gYSBjb250YWluZXJcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXJlbnRcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwib3duZXJcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udHJvbFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXJhbXNXaXRob3V0U2V0dGluZ3NcIixcInR5cGVcIjpcIkFycmF5XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250cm9sU2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFyZW50U2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lclwiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbCBpbiBhIGNvbnRhaW5lclwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhcmVudFwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJvd25lclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250cm9sXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhcmFtc1dpdGhvdXRTZXR0aW5nc1wiLFwidHlwZVwiOlwiQXJyYXlcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRyb2xTZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXJlbnRTZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJpY29uXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInRpdGxlXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjcmVhdGVDb250cm9sRnJvbVdlYkxpbmtcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gYSBjb250YWluZXIgZnJvbSBhIFdFQiBsaW5rXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGFyZW50XCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIm93bmVyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImVsXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhcmVudFNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkU3ViQXBwXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBhIHN1YmFwcFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN1YmFwcFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgc3ViYXBwXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInRoZSB1c2VyIGRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFN1YkFwcEJ5VVJMXCIsXCJkZXNjXCI6XCJMb2FkcyBhIHN1YmFwcCBieSBVUkxcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJkZWZhdWx0U3ViQXBwXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcImlmICdhbWlXZWJBcHAuYXJnc1tcXFwic3ViYXBwXFxcIl0nIGlzIG51bGwsIHRoZSBkZWZhdWx0IHN1YmFwcFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImRlZmF1bHRVc2VyRGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwiaWYgJ2FtaVdlYkFwcC5hcmdzW1xcXCJ1c2VyZGF0YVxcXCJdJyBpcyBudWxsLCB0aGUgZGVmYXVsdCB1c2VyIGRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19XSxcImV2ZW50c1wiOlt7XCJuYW1lXCI6XCJvblJlYWR5XCIsXCJkZXNjXCI6XCJUaGlzIG1ldGhvZCBtdXN0IGJlIG92ZXJsb2FkZWQgYW5kIGlzIGNhbGxlZCB3aGVuIHRoZSBXZWIgYXBwbGljYXRpb24gc3RhcnRzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlckRhdGFcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvblJlZnJlc2hcIixcImRlc2NcIjpcIlRoaXMgbWV0aG9kIG11c3QgYmUgb3ZlcmxvYWRlZCBhbmQgaXMgY2FsbGVkIHdoZW4gdGhlIHRvb2xiYXIgbmVlZHMgdG8gYmUgdXBkYXRlZFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcImlzQXV0aFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfV19LHtcIm5hbWVcIjpcImFtaUNvbW1hbmRcIixcImRlc2NcIjpcIlRoZSBBTUkgY29tbWFuZCBzdWJzeXN0ZW1cIixcInZhcmlhYmxlc1wiOlt7XCJuYW1lXCI6XCJlbmRwb2ludFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJEZWZhdWx0IGVuZHBvaW50XCJ9LHtcIm5hbWVcIjpcImNvbnZlcnRlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJEZWZhdWx0IGNvbnZlcnRlclwifV0sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwiZXhlY3V0ZVwiLFwiZGVzY1wiOlwiRXhlY3V0ZXMgYW4gQU1JIGNvbW1hbmRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJjb21tYW5kXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBjb21tYW5kXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZW5kcG9pbnQsIGNvbnZlcnRlciwgdGltZW91dCwgZXh0cmFQYXJhbSwgZXh0cmFWYWx1ZSlcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInBhc3NMb2dpblwiLFwiZGVzY1wiOlwiTG9ncyBpbiBieSBsb2dpbi9wYXNzd29yZFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVzZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXNzXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBwYXNzd29yZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjZXJ0TG9naW5cIixcImRlc2NcIjpcIkxvZ3MgaW4gYnkgY2VydGlmaWNhdGVcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9nb3V0XCIsXCJkZXNjXCI6XCJMb2dzIG91dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJhdHRhY2hDZXJ0XCIsXCJkZXNjXCI6XCJBdHRhY2hlcyBhIGNlcnRpZmljYXRlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhc3NcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImRldGFjaENlcnRcIixcImRlc2NcIjpcIkRldGFjaGVzIGEgY2VydGlmaWNhdGVcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1c2VyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFzc1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcGFzc3dvcmRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiYWRkVXNlclwiLFwiZGVzY1wiOlwiQWRkcyBhIG5ldyB1c2VyXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhc3NcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmlyc3ROYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBmaXJzdCBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwibGFzdE5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGxhc3QgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImVtYWlsXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlbWFpbFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImF0dGFjaFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiYXR0YWNoIHRoZSBjdXJyZW50IGNlcnRpZmljYXRlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiYWdyZWVcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcImFncmVlIHdpdGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNoYW5nZUluZm9cIixcImRlc2NcIjpcIkNoYW5nZXMgdGhlIGFjY291bnQgaW5mb3JtYXRpb25cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJmaXJzdE5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGZpcnN0IG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJsYXN0TmFtZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgbGFzdCBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZW1haWxcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVtYWlsXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImNoYW5nZVBhc3NcIixcImRlc2NcIjpcIkNoYW5nZXMgdGhlIGFjY291bnQgcGFzc3dvcmRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1c2VyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwib2xkUGFzc1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgb2xkIHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwibmV3UGFzc1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgbmV3IHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInJlc2V0UGFzc1wiLFwiZGVzY1wiOlwiUmVzZXRzIHRoZSBhY2NvdW50IHBhc3N3b3JkXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfV19LHtcIm5hbWVcIjpcImFtaUxvZ2luXCIsXCJkZXNjXCI6XCJUaGUgQU1JIGF1dGhlbnRpY2F0aW9uIHN1YnN5c3RlbVwiLFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcImdldFVzZXJcIixcImRlc2NcIjpcIkdldHMgdGhlIGN1cnJlbnQgdXNlclwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGN1cnJlbnQgdXNlclwifV19LHtcIm5hbWVcIjpcImdldEd1ZXN0XCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBndWVzdCB1c2VyXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZ3Vlc3QgdXNlclwifV19LHtcIm5hbWVcIjpcImdldENsaWVudEROXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBjbGllbnQgRE5cIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBjbGllbnQgRE5cIn1dfSx7XCJuYW1lXCI6XCJnZXRJc3N1ZXJETlwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgaXNzdWVyIEROXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgaXNzdWVyIEROXCJ9XX0se1wibmFtZVwiOlwiaXNBdXRoZW50aWNhdGVkXCIsXCJkZXNjXCI6XCJDaGVja3Mgd2hldGhlciB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX0se1wibmFtZVwiOlwiaGFzUm9sZVwiLFwiZGVzY1wiOlwiQ2hlY2tzIHdoZXRoZXIgdGhlIHVzZXIgaGFzIHRoZSBnaXZlbiByb2xlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicm9sZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcm9sZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX0se1wibmFtZVwiOlwic3NvXCIsXCJkZXNjXCI6XCJPcGVucyB0aGUgJ1NTTycgbW9kYWwgd2luZG93XCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwic2lnbkluXCIsXCJkZXNjXCI6XCJPcGVucyB0aGUgJ1NpZ25JbicgbW9kYWwgd2luZG93XCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiY2hhbmdlSW5mb1wiLFwiZGVzY1wiOlwiT3BlbnMgdGhlICdDaGFuZ2UgSW5mbycgbW9kYWwgd2luZG93XCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiY2hhbmdlUGFzc1wiLFwiZGVzY1wiOlwiT3BlbnMgdGhlICdDaGFuZ2UgUGFzc3dvcmQnIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImFjY291bnRTdGF0dXNcIixcImRlc2NcIjpcIk9wZW5zIHRoZSAnQWNjb3VudCBTdGF0dXMnIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcInNpZ25PdXRcIixcImRlc2NcIjpcIlNpZ25zIG91dFwiLFwicGFyYW1zXCI6W119XX1dLFwiaW50ZXJmYWNlc1wiOlt7XCJuYW1lXCI6XCJhbWkuSUNvbnRyb2xcIixcImRlc2NcIjpcIlRoZSBBTUkgY29udHJvbCBpbnRlcmZhY2VcIixcImltcGxlbWVudHNcIjpbXSxcImluaGVyaXRzXCI6W10sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwicGF0Y2hJZFwiLFwiZGVzY1wiOlwiUGF0Y2hlcyBhbiBIVE1MIGlkZW50aWZpZXJcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJpZFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdW5wYXRjaGVkIEhUTUwgaWRlbnRpZmllclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgcGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcIn1dfSx7XCJuYW1lXCI6XCJyZXBsYWNlSFRNTFwiLFwiZGVzY1wiOlwiUHV0cyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwicHJlcGVuZEhUTUxcIixcImRlc2NcIjpcIlByZXBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJhcHBlbmRIVE1MXCIsXCJkZXNjXCI6XCJBcHBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJvblJlYWR5XCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiB0aGUgY29udHJvbCBpcyByZWFkeSB0byBydW5cIixcInBhcmFtc1wiOltdfV19LHtcIm5hbWVcIjpcImFtaS5JU3ViQXBwXCIsXCJkZXNjXCI6XCJUaGUgQU1JIHN1Yi1hcHBsaWNhdGlvbiBpbnRlcmZhY2VcIixcImltcGxlbWVudHNcIjpbXSxcImluaGVyaXRzXCI6W10sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyByZWFkeSB0byBydW5cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uRXhpdFwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyBhYm91dCB0byBleGl0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkxvZ2luXCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiBsb2dnaW5nIGluXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkxvZ291dFwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gbG9nZ2luZyBvdXRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19XX1dLFwiY2xhc3Nlc1wiOlt7XCJuYW1lXCI6XCJhbWkuQ29udHJvbFwiLFwiZGVzY1wiOlwiVGhlIGJhc2ljIEFNSSBjb250cm9sXCIsXCJpbXBsZW1lbnRzXCI6W1wiYW1pLklDb250cm9sXCJdLFwiaW5oZXJpdHNcIjpbXSxcImtvbnN0cnVjdG9yXCI6e1wibmFtZVwiOlwiQ29udHJvbFwiLFwicGFyYW1zXCI6W119LFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcInBhdGNoSWRcIixcImRlc2NcIjpcIlBhdGNoZXMgYW4gSFRNTCBpZGVudGlmaWVyXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiaWRcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVucGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHBhdGNoZWQgSFRNTCBpZGVudGlmaWVyXCJ9XX0se1wibmFtZVwiOlwicmVwbGFjZUhUTUxcIixcImRlc2NcIjpcIlB1dHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInByZXBlbmRIVE1MXCIsXCJkZXNjXCI6XCJQcmVwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiYXBwZW5kSFRNTFwiLFwiZGVzY1wiOlwiQXBwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgaXMgcmVhZHkgdG8gcnVuXCIsXCJwYXJhbXNcIjpbXX1dfSx7XCJuYW1lXCI6XCJhbWkuU3ViQXBwXCIsXCJkZXNjXCI6XCJUaGUgYmFzaWMgQU1JIHN1Yi1hcHBsaWNhdGlvblwiLFwiaW1wbGVtZW50c1wiOltcImFtaS5JU3ViQXBwXCJdLFwiaW5oZXJpdHNcIjpbXSxcImtvbnN0cnVjdG9yXCI6e1wibmFtZVwiOlwiU3ViQXBwXCIsXCJwYXJhbXNcIjpbXX0sXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyByZWFkeSB0byBydW5cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIm9uRXhpdFwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyBhYm91dCB0byBleGl0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkxvZ2luXCIsXCJkZXNjXCI6XCJDYWxsZWQgd2hlbiBsb2dnaW5nIGluXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkxvZ291dFwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gbG9nZ2luZyBvdXRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyZGF0YVwiLFwidHlwZVwiOlwiP1wiLFwiZGVzY1wiOlwidXNlcmRhdGFcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19XX1dfTtcblxuLyogZXNsaW50LWVuYWJsZSAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyJdfQ==
