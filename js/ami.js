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

$(document).on('show.bs.modal', '.modal', function () {
  var el = $(this);
  setTimeout(function () {
    $('body > .modal-backdrop:last').css('z-index', _ami_internal_modalZIndex++);
    /*-----------*/

    el
    /*-----------*/
    .css('z-index', _ami_internal_modalZIndex++);
  }, 10);
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
    * @param {Object} [settings] dictionary of settings (logo_url, home_url, contact_email, about_url, theme_url, locker_url, change_passord_allowed, change_user_info_allowed, change_passord_allowed)
    */
  start: function start(settings) {
    var _this8 = this;

    this._globalDeferred.done(function () {
      /*-------------------------------------------------------------*/
      var _this8$setup = _this8.setup(['logo_url', 'home_url', 'contact_email', 'about_url', 'theme_url', 'locker_url', 'endpoint_url', 'create_account_allowed', 'change_user_info_allowed', 'reset_passord_allowed'], [_this8.originURL + '/images/logo.png', _this8.webAppURL, 'ami@lpsc.in2p3.fr', 'http://cern.ch/ami/', _this8.originURL + '/twig/AMI/Theme/blue.twig', _this8.originURL + '/twig/AMI/Fragment/locker.twig', _this8.originURL + '/AMI/FrontEnd', true, true, true], settings),
          logoURL = _this8$setup[0],
          homeURL = _this8$setup[1],
          contactEmail = _this8$setup[2],
          aboutURL = _this8$setup[3],
          themeURL = _this8$setup[4],
          lockerURL = _this8$setup[5],
          endpointURL = _this8$setup[6],
          createAccountAllowed = _this8$setup[7],
          changeUserInfoAllowed = _this8$setup[8],
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

                  amiLogin._start(createAccountAllowed, changeUserInfoAllowed, changePassordAllowed).done(function () {
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

                amiLogin._start(createAccountAllowed, changeUserInfoAllowed, changePassordAllowed).done(function () {
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
  changeUserInfoAllowed: true,
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
  _start: function _start(createAccountAllowed, changeUserInfoAllowed, changePassordAllowed) {
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
        changeUserInfoAllowed: _this15.changeUserInfoAllowed = changeUserInfoAllowed,
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
      changeUserInfoAllowed: this.changeUserInfoAllowed,
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
        "desc": "dictionary of settings (logo_url, home_url, contact_email, about_url, theme_url, locker_url, change_passord_allowed, change_user_info_allowed, change_passord_allowed)",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFNSS9leHRlcm5hbC9hbWktdHdpZy5lczYuanMiLCJBTUkvZXh0ZXJuYWwvanNwYXRoLmpzIiwiQU1JL0FNSUV4dGVuc2lvbi5qcyIsIkFNSS9BTUlPYmplY3QuanMiLCJBTUkvQU1JUm91dGVyLmpzIiwiQU1JL0FNSVdlYkFwcC5qcyIsIkFNSS9BTUlJbnRlcmZhY2UuanMiLCJBTUkvQU1JQ29tbWFuZC5qcyIsIkFNSS9BTUlMb2dpbi5qcyIsIkFNSS9BTUlEb2MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7OztBQVdBOztBQUNBOztBQUNBOztBQUVBLElBQUksT0FBTyxHQUFHO0FBQ2IsRUFBQSxPQUFPLEVBQUU7QUFESSxDQUFkO0FBSUE7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBRyxPQUFPLE9BQVAsS0FBbUIsV0FBdEIsRUFDQTtBQUNDLEVBQUEsT0FBTyxDQUFDLEVBQVIsR0FBYSxPQUFPLENBQUEsSUFBQSxDQUFwQjtBQUVBLEVBQUEsTUFBTSxDQUFDLE9BQVAsQ0FBZSxPQUFmLEdBQXlCLE9BQXpCO0FBQ0E7QUFFRDs7QUFFQTs7Ozs7Ozs7Ozs7QUFXQTs7QUFDQTs7QUFDQTs7O0FBRUEsT0FBTyxDQUFDLFNBQVIsR0FBb0I7QUFDbkI7QUFFQSxFQUFBLFFBQVEsRUFBRSxrQkFBUyxJQUFULEVBQWUsSUFBZixFQUFxQixNQUFyQixFQUE2QixTQUE3QixFQUF3QyxVQUF4QyxFQUFvRCxLQUFwRCxFQUNWO0FBQ0MsUUFBRyxTQUFTLENBQUMsTUFBVixLQUFxQixVQUFVLENBQUMsTUFBbkMsRUFDQTtBQUNDLFlBQU0seUNBQU47QUFDQTs7QUFFRCxRQUFNLGFBQWEsR0FBRyxFQUF0QjtBQUNBLFFBQU0sWUFBWSxHQUFHLEVBQXJCO0FBQ0EsUUFBTSxZQUFZLEdBQUcsRUFBckI7QUFFQSxRQUFJLENBQUMsR0FBRyxXQUFSO0FBQ0EsUUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQWY7QUFFQSxRQUFJLElBQUksR0FBRyxF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QUE7QUFBbkUsS0FBcmY7QUFBckssR0FBbmxFO0FBQTkrMUIsQ0FBYjtBQUVBOztBQUVBIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgVHdpZyBFbmdpbmVcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxOSBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG52YXIgYW1pVHdpZyA9IHtcblx0dmVyc2lvbjogJzEuMC4wJ1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGV4cG9ydHMuYW1pVHdpZyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pZih0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpXG57XG5cdGFtaVR3aWcuZnMgPSByZXF1aXJlKCdmcycpO1xuXG5cdG1vZHVsZS5leHBvcnRzLmFtaVR3aWcgPSBhbWlUd2lnO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRva2VuaXplciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50b2tlbml6ZXIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0b2tlbml6ZTogZnVuY3Rpb24oY29kZSwgbGluZSwgc3BhY2VzLCB0b2tlbkRlZnMsIHRva2VuVHlwZXMsIGVycm9yKVxuXHR7XG5cdFx0aWYodG9rZW5EZWZzLmxlbmd0aCAhPT0gdG9rZW5UeXBlcy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2B0b2tlbkRlZnMubGVuZ3RoICE9IHRva2VuVHlwZXMubGVuZ3RoYCc7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVzdWx0X3Rva2VucyA9IFtdO1xuXHRcdGNvbnN0IHJlc3VsdF90eXBlcyA9IFtdO1xuXHRcdGNvbnN0IHJlc3VsdF9saW5lcyA9IFtdO1xuXG5cdFx0bGV0IGkgPSAweDAwMDAwMDAwMDtcblx0XHRjb25zdCBsID0gY29kZS5sZW5ndGg7XG5cblx0XHRsZXQgd29yZCA9ICcnLCB0b2tlbiwgYztcblxuX19sMDpcdFx0d2hpbGUoaSA8IGwpXG5cdFx0e1xuXHRcdFx0YyA9IGNvZGUuY2hhckF0KDApO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQ09VTlQgTElORVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKGMgPT09ICdcXG4nKVxuXHRcdFx0e1xuXHRcdFx0XHRsaW5lKys7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFQVQgU1BBQ0VTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYoc3BhY2VzLmluZGV4T2YoYykgPj0gMClcblx0XHRcdHtcblx0XHRcdFx0aWYod29yZClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdpbnZhbGlkIHRva2VuIGAnICsgd29yZCArICdgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2goLTEpO1xuXHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdHdvcmQgPSAnJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZygxKTtcblx0XHRcdFx0aSArPSAxO1xuXG5cdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFQVQgUkVHRVhFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Zm9yKGNvbnN0IGogaW4gdG9rZW5EZWZzKVxuXHRcdFx0e1xuXHRcdFx0XHR0b2tlbiA9IHRoaXMuX21hdGNoKGNvZGUsIHRva2VuRGVmc1tqXSk7XG5cblx0XHRcdFx0aWYodG9rZW4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZih3b3JkKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh3b3JkKTtcblx0XHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdFx0d29yZCA9ICcnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh0b2tlbik7XG5cdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2godG9rZW5UeXBlc1tqXSk7XG5cdFx0XHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG5cblx0XHRcdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcodG9rZW4ubGVuZ3RoKTtcblx0XHRcdFx0XHRpICs9IHRva2VuLmxlbmd0aDtcblxuXHRcdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVBVCBSRU1BSU5JTkcgQ0hBUkFDVEVSRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR3b3JkICs9IGM7XG5cblx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZygxKTtcblx0XHRcdGkgKz0gMTtcblxuLypcdFx0XHRjb250aW51ZSBfX2wwO1xuICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdGlmKHdvcmQpXG5cdFx0e1xuXHRcdFx0aWYoZXJyb3IpXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdpbnZhbGlkIHRva2VuIGAnICsgd29yZCArICdgJztcblx0XHRcdH1cblxuXHRcdFx0cmVzdWx0X3Rva2Vucy5wdXNoKHdvcmQpO1xuXHRcdFx0cmVzdWx0X3R5cGVzLnB1c2goLTEpO1xuXHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG4vKlx0XHRcdHdvcmQgPSAnJztcbiAqL1x0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9rZW5zOiByZXN1bHRfdG9rZW5zLFxuXHRcdFx0dHlwZXM6IHJlc3VsdF90eXBlcyxcblx0XHRcdGxpbmVzOiByZXN1bHRfbGluZXMsXG5cdFx0fTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X21hdGNoOiBmdW5jdGlvbihzLCBzdHJpbmdPclJlZ0V4cClcblx0e1xuXHRcdGxldCBtO1xuXG5cdFx0aWYoc3RyaW5nT3JSZWdFeHAgaW5zdGFuY2VvZiBSZWdFeHApXG5cdFx0e1xuXHRcdFx0bSA9IHMubWF0Y2goc3RyaW5nT3JSZWdFeHApO1xuXG5cdFx0XHRyZXR1cm4gbSAhPT0gbnVsbCAmJiB0aGlzLl9jaGVja05leHRDaGFyKHMsIC8qLSovbVswXS8qLSovKSA/IC8qLSovbVswXS8qLSovIDogbnVsbDtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdG0gPSBzLmluZGV4T2Yoc3RyaW5nT3JSZWdFeHApO1xuXG5cdFx0XHRyZXR1cm4gbSA9PT0gMHgwMCAmJiB0aGlzLl9jaGVja05leHRDaGFyKHMsIHN0cmluZ09yUmVnRXhwKSA/IHN0cmluZ09yUmVnRXhwIDogbnVsbDtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9hbG51bTogW1xuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSxcblx0XHQxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAxLFxuXHRcdDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsXG5cdFx0MSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdF0sXG5cblx0X2NoZWNrTmV4dENoYXI6IGZ1bmN0aW9uKHMsIHRva2VuKVxuXHR7XG5cdFx0Y29uc3QgbGVuZ3RoID0gdG9rZW4ubGVuZ3RoO1xuXG5cdFx0Y29uc3QgY2hhckNvZGUyID0gcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDApO1xuXHRcdGNvbnN0IGNoYXJDb2RlMSA9IHMuY2hhckNvZGVBdChsZW5ndGggLSAxKTtcblxuXHRcdHJldHVybiBpc05hTihjaGFyQ29kZTIpXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHRoaXMuX2FsbnVtW2NoYXJDb2RlMl0gPT09IDBcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdGhpcy5fYWxudW1bY2hhckNvZGUxXSA9PT0gMFxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByID0ge307XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIudG9rZW5zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLnRva2VucyA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBDT01QT1NJVEUgVE9LRU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuSVNfWFhYID0gW1xuXHRcdFx0dGhpcy5ERUZJTkVELFxuXHRcdFx0dGhpcy5OVUxMLFxuXHRcdFx0dGhpcy5FTVBUWSxcblx0XHRcdHRoaXMuSVRFUkFCTEUsXG5cdFx0XHR0aGlzLkVWRU4sXG5cdFx0XHR0aGlzLk9ERCxcblx0XHRdO1xuXG5cdFx0dGhpcy5YWFhfV0lUSCA9IFtcblx0XHRcdHRoaXMuU1RBUlRTX1dJVEgsXG5cdFx0XHR0aGlzLkVORFNfV0lUSCxcblx0XHRdO1xuXG5cdFx0dGhpcy5QTFVTX01JTlVTID0gW1xuXHRcdFx0dGhpcy5DT05DQVQsXG5cdFx0XHR0aGlzLlBMVVMsXG5cdFx0XHR0aGlzLk1JTlVTLFxuXHRcdF07XG5cblx0XHR0aGlzLk1VTF9GTERJVl9ESVZfTU9EID0gW1xuXHRcdFx0dGhpcy5NVUwsXG5cdFx0XHR0aGlzLkZMRElWLFxuXHRcdFx0dGhpcy5ESVYsXG5cdFx0XHR0aGlzLk1PRCxcblx0XHRdO1xuXG5cdFx0dGhpcy5SWCA9IFtcblx0XHRcdHRoaXMuUlAsXG5cdFx0XHR0aGlzLlJCMSxcblx0XHRdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBSRUFMIFRPS0VOUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRMT0dJQ0FMX09SOiAxMDAsXG5cdExPR0lDQUxfQU5EOiAxMDEsXG5cdEJJVFdJU0VfT1I6IDEwMixcblx0QklUV0lTRV9YT1I6IDEwMyxcblx0QklUV0lTRV9BTkQ6IDEwNCxcblx0Tk9UOiAxMDUsXG5cdElTOiAxMDYsXG5cdERFRklORUQ6IDEwNyxcblx0TlVMTDogMTA4LFxuXHRFTVBUWTogMTA5LFxuXHRJVEVSQUJMRTogMTEwLFxuXHRFVkVOOiAxMTEsXG5cdE9ERDogMTEyLFxuXHRDTVBfT1A6IDExMyxcblx0U1RBUlRTX1dJVEg6IDExNCxcblx0RU5EU19XSVRIOiAxMTUsXG5cdE1BVENIRVM6IDExNixcblx0SU46IDExNyxcblx0UkFOR0U6IDExOCxcblx0Q09OQ0FUOiAxMTksXG5cdFBMVVM6IDEyMCxcblx0TUlOVVM6IDEyMSxcblx0UE9XRVI6IDEyMixcblx0TVVMOiAxMjMsXG5cdEZMRElWOiAxMjQsXG5cdERJVjogMTI1LFxuXHRNT0Q6IDEyNixcblx0Q09MT046IDEyNyxcblx0RE9UOiAxMjgsXG5cdENPTU1BOiAxMjksXG5cdFBJUEU6IDEzMCxcblx0TFA6IDEzMSxcblx0UlA6IDEzMixcblx0TEIxOiAxMzMsXG5cdFJCMTogMTM0LFxuXHRMQjI6IDEzNSxcblx0UkIyOiAxMzYsXG5cdFNJRDogMTM3LFxuXHRURVJNSU5BTDogMTM4LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVklSVFVBTCBUT0tFTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0TFNUOiAyMDAsXG5cdERJQzogMjAxLFxuXHRGVU46IDIwMixcblx0VkFSOiAyMDMsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLnRva2Vucy4kaW5pdCgpO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLlRva2VuaXplciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ub2tlbml6ZXIgPSBmdW5jdGlvbihjb2RlLCBsaW5lKSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLl9zcGFjZXMgPSBbJyAnLCAnXFx0JywgJ1xcbicsICdcXHInXTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fdG9rZW5EZWZzID0gW1xuXHRcdCdvcicsXG5cdFx0J2FuZCcsXG5cdFx0J2Itb3InLFxuXHRcdCdiLXhvcicsXG5cdFx0J2ItYW5kJyxcblx0XHQnbm90Jyxcblx0XHQnaXMnLFxuXHRcdCdkZWZpbmVkJyxcblx0XHQnbnVsbCcsXG5cdFx0J2VtcHR5Jyxcblx0XHQnaXRlcmFibGUnLFxuXHRcdCdldmVuJyxcblx0XHQnb2RkJyxcblx0XHQnPT09Jyxcblx0XHQnPT0nLFxuXHRcdCchPT0nLFxuXHRcdCchPScsXG5cdFx0Jzw9Jyxcblx0XHQnPj0nLFxuXHRcdCc8Jyxcblx0XHQnPicsXG5cdFx0L15zdGFydHNcXHMrd2l0aC8sXG5cdFx0L15lbmRzXFxzK3dpdGgvLFxuXHRcdCdtYXRjaGVzJyxcblx0XHQnaW4nLFxuXHRcdCcuLicsXG5cdFx0J34nLFxuXHRcdCcrJyxcblx0XHQnLScsXG5cdFx0JyoqJyxcblx0XHQnKicsXG5cdFx0Jy8vJyxcblx0XHQnLycsXG5cdFx0JyUnLFxuXHRcdCc6Jyxcblx0XHQnLicsXG5cdFx0JywnLFxuXHRcdCd8Jyxcblx0XHQnKCcsXG5cdFx0JyknLFxuXHRcdCdbJyxcblx0XHQnXScsXG5cdFx0J3snLFxuXHRcdCd9Jyxcblx0XHQndHJ1ZScsXG5cdFx0J2ZhbHNlJyxcblx0XHQvXlswLTldK1xcLlswLTldKy8sXG5cdFx0L15bMC05XSsvLFxuXHRcdC9eJyhcXFxcJ3xbXiddKSonLyxcblx0XHQvXlwiKFxcXFxcInxbXlwiXSkqXCIvLFxuXHRcdC9eW2EtekEtWl8kXVthLXpBLVowLTlfJF0qLyxcblx0XTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fdG9rZW5UeXBlcyA9IFtcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX1hPUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5ELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTk9ULFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ERUZJTkVELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTlVMTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkVNUFRZLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSVRFUkFCTEUsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FVkVOLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuT0RELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuU1RBUlRTX1dJVEgsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FTkRTX1dJVEgsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NQVRDSEVTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSU4sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQU5HRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTkNBVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NSU5VUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBPV0VSLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTVVMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRkxESVYsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ESVYsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NT0QsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DT0xPTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUElQRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxQLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUlAsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MQjEsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQjEsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MQjIsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQjIsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5TSUQsXG5cdF07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuJGluaXQgPSBmdW5jdGlvbihjb2RlLCBsaW5lKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCByZXN1bHQgPSBhbWlUd2lnLnRva2VuaXplci50b2tlbml6ZShcblx0XHRcdGNvZGUsXG5cdFx0XHRsaW5lLFxuXHRcdFx0dGhpcy5fc3BhY2VzLFxuXHRcdFx0dGhpcy5fdG9rZW5EZWZzLFxuXHRcdFx0dGhpcy5fdG9rZW5UeXBlcyxcblx0XHRcdHRydWVcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnRva2VucyA9IHJlc3VsdC50b2tlbnM7XG5cdFx0dGhpcy50eXBlcyA9IHJlc3VsdC50eXBlcztcblxuXHRcdHRoaXMuaSA9IDA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5uZXh0ID0gZnVuY3Rpb24obiA9IDEpXG5cdHtcblx0XHR0aGlzLmkgKz0gbjtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5pc0VtcHR5ID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaSA+PSB0aGlzLnRva2Vucy5sZW5ndGg7XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMucGVla1Rva2VuID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudG9rZW5zW3RoaXMuaV07XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMucGVla1R5cGUgPSBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50eXBlc1t0aGlzLmldO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLmNoZWNrVHlwZSA9IGZ1bmN0aW9uKHR5cGUpXG5cdHtcblx0XHRpZih0aGlzLmkgPCB0aGlzLnRva2Vucy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0Y29uc3QgVFlQRSA9IHRoaXMudHlwZXNbdGhpcy5pXTtcblxuXHRcdFx0cmV0dXJuICh0eXBlIGluc3RhbmNlb2YgQXJyYXkpID8gKHR5cGUuaW5kZXhPZihUWVBFKSA+PSAwKSA6ICh0eXBlID09PSBUWVBFKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuJGluaXQoY29kZSwgbGluZSk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5Db21waWxlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuQ29tcGlsZXIgPSBmdW5jdGlvbihjb2RlLCBsaW5lKSB7XG5cblx0dGhpcy4kaW5pdChjb2RlLCBsaW5lKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Db21waWxlci5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24oY29kZSwgbGluZSlcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy50b2tlbml6ZXIgPSBuZXcgYW1pVHdpZy5leHByLlRva2VuaXplcihcblx0XHRcdHRoaXMuY29kZSA9IGNvZGUsXG5cdFx0XHR0aGlzLmxpbmUgPSBsaW5lXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5yb290Tm9kZSA9IHRoaXMucGFyc2VGaWx0ZXIoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuaXNFbXB0eSgpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIHVuZXhwZWN0ZWQgdG9rZW4gYCcgKyB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSArICdgJztcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZHVtcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucm9vdE5vZGUuZHVtcCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUZpbHRlcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTG9naWNhbE9yKCksIG5vZGUsIHRlbXA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBGaWx0ZXIgOiBMb2dpY2FsT3IgKCd8JyBEb3QxKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBJUEUpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0bm9kZSA9IHRoaXMucGFyc2VEb3QxKHRydWUpO1xuXG5cdFx0XHRmb3IodGVtcCA9IG5vZGU7IHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuRE9UOyB0ZW1wID0gdGVtcC5ub2RlTGVmdCk7XG5cblx0XHRcdHRlbXAubGlzdC51bnNoaWZ0KGxlZnQpO1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUxvZ2ljYWxPcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTG9naWNhbEFuZCgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIExvZ2ljYWxPciA6IExvZ2ljYWxBbmQgKCdvcicgTG9naWNhbEFuZCkqICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUxvZ2ljYWxBbmQoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUxvZ2ljYWxBbmQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VPcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIExvZ2ljYWxBbmQgOiBCaXR3aXNlT3IgKCdhbmQnIEJpdHdpc2VPcikqICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9BTkQpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VCaXR3aXNlT3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VPcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQml0d2lzZVhvcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEJpdHdpc2VPciA6IEJpdHdpc2VYb3IgKCdiLW9yJyBCaXR3aXNlWG9yKSogICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUJpdHdpc2VYb3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VYb3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VBbmQoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBCaXR3aXNlWG9yIDogQml0d2lzZUFuZCAoJ2IteG9yJyBCaXR3aXNlQW5kKSogICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfWE9SKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQml0d2lzZUFuZCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQml0d2lzZUFuZDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTm90KCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQml0d2lzZUFuZCA6IE5vdCAoJ2ItYW5kJyBOb3QpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX0FORCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZU5vdCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTm90OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBOb3QgOiAnbm90JyBDb21wICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUNvbXAoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IG51bGw7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgfCBDb21wICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiB0aGlzLnBhcnNlQ29tcCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUNvbXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUFkZFN1YigpLCByaWdodCwgbm9kZSwgc3dhcDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIENvbXAgOiBBZGRTdWIgJ2lzJyAnbm90Jz8gKCdkZWZpbmVkJyB8ICdudWxsJyB8IC4uLikgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0LyoqLyBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdC8qIHN3YXAgJ2lzJyBhbmQgJ25vdCcgKi9cblx0XHRcdHN3YXAgPSBub2RlO1xuXHRcdFx0Lyogc3dhcCAnaXMnIGFuZCAnbm90JyAqL1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5OT1QpKVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUubm9kZUxlZnQgPSBudWxsO1xuXHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHN3YXA7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLklTX1hYWCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJpZ2h0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdHN3YXAubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0XHRzd2FwLm5vZGVSaWdodCA9IHJpZ2h0O1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGtleXdvcmQgYGRlZmluZWRgLCBgbnVsbGAsIGBlbXB0eWAsIGBpdGVyYWJsZWAsIGBldmVuYCBvciBgb2RkYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgKCc9PT0nIHwgJz09JyB8IC4uLikgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1ApKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICgnc3RhcnRzJyB8ICdlbmRzJykgYHdpdGhgIEFkZFN1YiAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuWFhYX1dJVEgpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICdtYXRjaGVzJyBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgJ2luJyBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JTikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQWRkU3ViOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VNdWxEaXYoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBBZGRTdWIgOiBNdWxEaXYgKCgnKycgfCAnLScpIE11bERpdikqICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVNfTUlOVVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VNdWxEaXYoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU11bERpdjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlUGx1c01pbnVzKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTXVsRGl2IDogUGx1c01pbnVzICgoJyonIHwgJy8vJyB8ICcvJyB8ICclJykgUGx1c01pbnVzKSogICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5NVUxfRkxESVZfRElWX01PRCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZVBsdXNNaW51cygpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlUGx1c01pbnVzOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBQbHVzTWludXMgOiAoJy0nIHwgJysnKSBQb3dlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVNfTUlOVVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VQb3dlcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgICAgICB8IERvdDEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHRoaXMucGFyc2VQb3dlcigpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVBvd2VyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VEb3QxKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogUG93ZXIgOiBEb3QxICgnKionIERvdDEpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QT1dFUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZURvdDEoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDE6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0Y29uc3Qgbm9kZSA9IHRoaXMucGFyc2VEb3QyKGlzRmlsdGVyKTtcblxuXHRcdGlmKG5vZGUpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGV0IHRlbXAgPSBub2RlO1xuXG5cdFx0XHRmb3IoOyB0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDsgdGVtcCA9IHRlbXAubm9kZUxlZnQpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0ZW1wLnEpXG5cdFx0XHR7XG5cdFx0XHRcdC8qKi8gaWYodGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5GVU4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZih0ZW1wLm5vZGVWYWx1ZSBpbiBhbWlUd2lnLnN0ZGxpYilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9ICdhbWlUd2lnLnN0ZGxpYi4nICsgdGVtcC5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9IC8qLS0tKi8nXy4nLyotLS0qLyArIHRlbXAubm9kZVZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuVkFSKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAvKi0tLSovJ18uJy8qLS0tKi8gKyB0ZW1wLm5vZGVWYWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRlbXAucSA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdHJldHVybiBub2RlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDI6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlRG90Myhpc0ZpbHRlciksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogRG90MiA6IERvdDMgKCcuJyBEb3QzKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5ET1QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgJy4nKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlRG90Myhpc0ZpbHRlcik7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VEb3QzOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZVgoaXNGaWx0ZXIpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIHBhcnNlRG90MyA6IFggKCdbJyBGaWx0ZXIgJ10nKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIxKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUZpbHRlcigpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjEpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCwgJ1tdJyk7XG5cblx0XHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYF1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgICAgIHwgWCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVg6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBYIDogR3JvdXAgfCBBcnJheSB8IE9iamVjdCB8IEZ1blZhciB8IFRlcm1pbmFsICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZUdyb3VwKCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VBcnJheSgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlT2JqZWN0KCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VGdW5WYXIoaXNGaWx0ZXIpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlVGVybWluYWwoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFNZTlRBWCBFUlJPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBzeW50YXggZXJyb3Igb3IgdHVuY2F0ZWQgZXhwcmVzc2lvbic7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VHcm91cDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBHcm91cCA6ICcoJyBGaWx0ZXIgJyknICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxQKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdG5vZGUgPSB0aGlzLnBhcnNlRmlsdGVyKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJQKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGApYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VBcnJheTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGUsIGxpc3Q7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBBcnJheSA6ICdbJyBTaW5nbGV0cyAnXScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxCMSkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRsaXN0ID0gdGhpcy5fcGFyc2VTaW5nbGV0cygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjEpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkxTVCwgJ0FycmF5Jyk7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gbGlzdDtcblxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgXWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlT2JqZWN0OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbm9kZSwgZGljdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE9iamVjdCA6ICd7JyBEb3VibGV0cyAnfScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIyKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGRpY3QgPSB0aGlzLl9wYXJzZURvdWJsZXRzKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMikpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKGFtaVR3aWcuZXhwci50b2tlbnMuRElDLCAnT2JqZWN0Jyk7XG5cblx0XHRcdFx0bm9kZS5kaWN0ID0gZGljdDtcblxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgfWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRnVuVmFyOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuU0lEKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKDAsIGlzRmlsdGVyID8gJ2ZpbHRlcl8nICsgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkgOiB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cblx0XHRcdG5vZGUucSA9IHRydWU7XG5cblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZ1blZhciA6IFNJRCAnKCcgU2luZ2xldHMgJyknICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQvKiovIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxQKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUubGlzdCA9IHRoaXMuX3BhcnNlU2luZ2xldHMoKTtcblxuXHRcdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SUCkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0XHRub2RlLm5vZGVUeXBlID0gYW1pVHdpZy5leHByLnRva2Vucy5GVU47XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgKWAgZXhwZWN0ZWQnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiAgICAgICAgfCBTSUQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlLm5vZGVUeXBlID0gaXNGaWx0ZXIgPyBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTlxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgOiBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUlxuXHRcdFx0XHQ7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gW107XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VTaW5nbGV0czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SWCkgPT09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHRoaXMuX3BhcnNlU2luZ2xldChyZXN1bHQpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DT01NQSkgPT09IHRydWUpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlRG91YmxldHM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IHt9O1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIyKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0dGhpcy5fcGFyc2VEb3VibGV0KHJlc3VsdCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BKSA9PT0gdHJ1ZSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VTaW5nbGV0OiBmdW5jdGlvbihyZXN1bHQpXG5cdHtcblx0XHRyZXN1bHQucHVzaCh0aGlzLnBhcnNlRmlsdGVyKCkpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VEb3VibGV0OiBmdW5jdGlvbihyZXN1bHQpXG5cdHtcblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCkpXG5cdFx0e1xuXHRcdFx0Y29uc3Qga2V5ID0gdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTE9OKSlcblx0XHRcdHtcbi8qXHRcdFx0XHRjb25zdCBjb2xvbiA9IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpO1xuICovXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdFtrZXldID0gdGhpcy5wYXJzZUZpbHRlcigpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgOmAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCB0ZXJtaW5hbCBleHBlY3RlZCc7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVRlcm1pbmFsOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBUZXJtaW5hbCA6IFRFUk1JTkFMIHwgUkFOR0UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMKSlcblx0XHR7XG5cdFx0XHRsZWZ0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UpKVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJpZ2h0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIGxlZnQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLk5vZGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ob2RlID0gZnVuY3Rpb24obm9kZVR5cGUsIG5vZGVWYWx1ZSkge1xuXG5cdHRoaXMuJGluaXQobm9kZVR5cGUsIG5vZGVWYWx1ZSk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuTm9kZS5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24obm9kZVR5cGUsIG5vZGVWYWx1ZSlcblx0e1xuXHRcdHRoaXMubm9kZVR5cGUgPSBub2RlVHlwZTtcblx0XHR0aGlzLm5vZGVWYWx1ZSA9IG5vZGVWYWx1ZTtcblx0XHR0aGlzLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHR0aGlzLm5vZGVSaWdodCA9IG51bGw7XG5cdFx0dGhpcy5saXN0ID0gbnVsbDtcblx0XHR0aGlzLmRpY3QgPSBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZHVtcDogZnVuY3Rpb24obm9kZXMsIGVkZ2VzLCBwQ250KVxuXHR7XG5cdFx0bGV0IENOVDtcblxuXHRcdGNvbnN0IGNudCA9IHBDbnRbMF07XG5cblx0XHRub2Rlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgW2xhYmVsPVwiJyArIHRoaXMubm9kZVZhbHVlLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICdcIl07Jyk7XG5cblx0XHRpZih0aGlzLm5vZGVMZWZ0KVxuXHRcdHtcblx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICc7Jyk7XG5cdFx0XHR0aGlzLm5vZGVMZWZ0Ll9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5ub2RlUmlnaHQpXG5cdFx0e1xuXHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJzsnKTtcblx0XHRcdHRoaXMubm9kZVJpZ2h0Ll9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5saXN0KVxuXHRcdHtcblx0XHRcdGZvcihjb25zdCBpIGluIHRoaXMubGlzdClcblx0XHRcdHtcblx0XHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnIFtsYWJlbD1cIlsnICsgaS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXVwiXTsnKTtcblx0XHRcdFx0dGhpcy5saXN0W2ldLl9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5kaWN0KVxuXHRcdHtcblx0XHRcdGZvcihjb25zdCBpIGluIHRoaXMuZGljdClcblx0XHRcdHtcblx0XHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnIFtsYWJlbD1cIlsnICsgaS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXVwiXTsnKTtcblx0XHRcdFx0dGhpcy5kaWN0W2ldLl9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCBub2RlcyA9IFtdO1xuXHRcdGNvbnN0IGVkZ2VzID0gW107XG5cblx0XHR0aGlzLl9kdW1wKG5vZGVzLCBlZGdlcywgWzBdKTtcblxuXHRcdHJldHVybiAnZGlncmFwaCBhc3Qge1xcblxcdHJhbmtkaXI9VEI7XFxuJyArIG5vZGVzLmpvaW4oJ1xcbicpICsgJ1xcbicgKyBlZGdlcy5qb2luKCdcXG4nKSArICdcXG59Jztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRtcGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsID0ge307XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRtcGwuQ29tcGlsZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsLkNvbXBpbGVyID0gZnVuY3Rpb24odG1wbCkge1xuXG5cdHRoaXMuJGluaXQodG1wbCk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRtcGwuQ29tcGlsZXIucHJvdG90eXBlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0U1RBVEVNRU5UX1JFOiAvXFx7JVxccyooW2EtekEtWl0rKVxccyooKD86LnxcXG4pKj8pXFxzKiVcXH0vLFxuXG5cdENPTU1FTlRfUkU6IC9cXHsjXFxzKigoPzoufFxcbikqPylcXHMqI1xcfS9nLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfY291bnQ6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRsZXQgcmVzdWx0ID0gMDtcblxuXHRcdGNvbnN0IGwgPSBzLmxlbmd0aDtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpKyspXG5cdFx0e1xuXHRcdFx0aWYoc1tpXSA9PT0gJ1xcbicpIHJlc3VsdCsrO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbih0bXBsKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgbGluZSA9IDE7XG5cblx0XHRsZXQgY29sdW1uO1xuXHRcdGxldCBDT0xVTU47XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMucm9vdE5vZGUgPSB7XG5cdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0a2V5d29yZDogJ0Byb290Jyxcblx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0YmxvY2tzOiBbe1xuXHRcdFx0XHRleHByZXNzaW9uOiAnQHRydWUnLFxuXHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdH1dLFxuXHRcdFx0dmFsdWU6ICcnLFxuXHRcdH07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHN0YWNrMSA9IFt0aGlzLnJvb3ROb2RlXTtcblx0XHRjb25zdCBzdGFjazIgPSBbMHgwMDAwMDAwMDAwMF07XG5cblx0XHRsZXQgaXRlbTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Zm9yKHRtcGwgPSB0bXBsLnJlcGxhY2UodGhpcy5DT01NRU5UX1JFLCAnJyk7OyB0bXBsID0gdG1wbC5zdWJzdHIoQ09MVU1OKSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBjdXJyID0gc3RhY2sxW3N0YWNrMS5sZW5ndGggLSAxXTtcblx0XHRcdCBsZXQgIGluZHggPSBzdGFjazJbc3RhY2syLmxlbmd0aCAtIDFdO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBtID0gdG1wbC5tYXRjaCh0aGlzLlNUQVRFTUVOVF9SRSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKG0gPT09IG51bGwpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsaW5lICs9IHRoaXMuX2NvdW50KHRtcGwpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjdXJyLmJsb2Nrc1tpbmR4XS5saXN0LnB1c2goe1xuXHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0a2V5d29yZDogJ0B0ZXh0Jyxcblx0XHRcdFx0XHRleHByZXNzaW9uOiAnJyxcblx0XHRcdFx0XHRibG9ja3M6IFtdLFxuXHRcdFx0XHRcdHZhbHVlOiB0bXBsLFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgZXJyb3JzID0gW107XG5cblx0XHRcdFx0Zm9yKGxldCBpID0gc3RhY2sxLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvKiovIGlmKHN0YWNrMVtpXS5rZXl3b3JkID09PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGVycm9ycy5wdXNoKCdtaXNzaW5nIGtleXdvcmQgYGVuZGlmYCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmKHN0YWNrMVtpXS5rZXl3b3JkID09PSAnZm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0IFx0ZXJyb3JzLnB1c2goJ21pc3Npbmcga2V5d29yZCBgZW5kZm9yYCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGVycm9ycy5sZW5ndGggPiAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgJyArIGVycm9ycy5qb2luKCcsICcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBtYXRjaCA9IG1bMF07XG5cdFx0XHRjb25zdCBrZXl3b3JkID0gbVsxXTtcblx0XHRcdGNvbnN0IGV4cHJlc3Npb24gPSBtWzJdO1xuXG5cdFx0XHRjb2x1bW4gPSBtLmluZGV4ICsgMHgwMDAwMDAwMDAwO1xuXHRcdFx0Q09MVU1OID0gbS5pbmRleCArIG1hdGNoLmxlbmd0aDtcblxuXHRcdFx0Y29uc3QgdmFsdWUgPSB0bXBsLnN1YnN0cigwLCBjb2x1bW4pO1xuXHRcdFx0Y29uc3QgVkFMVUUgPSB0bXBsLnN1YnN0cigwLCBDT0xVTU4pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsaW5lICs9IHRoaXMuX2NvdW50KFZBTFVFKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodmFsdWUpXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRrZXl3b3JkOiAnQHRleHQnLFxuXHRcdFx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRzd2l0Y2goa2V5d29yZClcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2ZsdXNoJzpcblx0XHRcdFx0Y2FzZSAnYXV0b2VzY2FwZSc6XG5cdFx0XHRcdGNhc2UgJ3NwYWNlbGVzcyc6XG5cdFx0XHRcdGNhc2UgJ3ZlcmJhdGltJzpcblxuXHRcdFx0XHRcdC8qIElHTk9SRSAqL1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2RvJzpcblx0XHRcdFx0Y2FzZSAnc2V0Jzpcblx0XHRcdFx0Y2FzZSAnaW5jbHVkZSc6XG5cblx0XHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRcdGtleXdvcmQ6IGtleXdvcmQsXG5cdFx0XHRcdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0XHRcdFx0YmxvY2tzOiBbXSxcblx0XHRcdFx0XHRcdHZhbHVlOiAnJyxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2lmJzpcblx0XHRcdFx0Y2FzZSAnZm9yJzpcblxuXHRcdFx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0XHRcdFx0a2V5d29yZDoga2V5d29yZCxcblx0XHRcdFx0XHRcdGJsb2NrczogW3tcblx0XHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogZXhwcmVzc2lvbixcblx0XHRcdFx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHRcdFx0XHR9XSxcblx0XHRcdFx0XHRcdHZhbHVlOiAnJyxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXG5cdFx0XHRcdFx0c3RhY2sxLnB1c2goaXRlbSk7XG5cdFx0XHRcdFx0c3RhY2syLnB1c2goMHgwMCk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZWxzZWlmJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVsc2VpZmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGluZHggPSBjdXJyLmJsb2Nrcy5sZW5ndGg7XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrcy5wdXNoKHtcblx0XHRcdFx0XHRcdGV4cHJlc3Npb246IGV4cHJlc3Npb24sXG5cdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHN0YWNrMltzdGFjazIubGVuZ3RoIC0gMV0gPSBpbmR4O1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2Vsc2UnOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZWxzZWAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGluZHggPSBjdXJyLmJsb2Nrcy5sZW5ndGg7XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrcy5wdXNoKHtcblx0XHRcdFx0XHRcdGV4cHJlc3Npb246ICdAdHJ1ZScsXG5cdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHN0YWNrMltzdGFjazIubGVuZ3RoIC0gMV0gPSBpbmR4O1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2VuZGlmJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVuZGlmYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c3RhY2sxLnBvcCgpO1xuXHRcdFx0XHRcdHN0YWNrMi5wb3AoKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbmRmb3InOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnZm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVuZGZvcmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHN0YWNrMS5wb3AoKTtcblx0XHRcdFx0XHRzdGFjazIucG9wKCk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVua25vd24ga2V5d29yZCBgJyArIGtleXdvcmQgKyAnYCc7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5yb290Tm9kZSwgbnVsbCwgMik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLypcbiAqIEFNSSBUd2lnIEVuZ2luZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE5IFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5lbmdpbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZW5naW5lID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0VkFSSUFCTEVfUkU6IC9cXHtcXHtcXHMqKC4qPylcXHMqXFx9XFx9L2csXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9yZW5kZXI6IGZ1bmN0aW9uKHJlc3VsdCwgaXRlbSwgZGljdCA9IHt9KVxuXHR7XG5cdFx0bGV0IG07XG5cblx0XHRsZXQgZXhwcmVzc2lvbjtcblxuXHRcdHRoaXMuZGljdCA9IGRpY3Q7XG5cblx0XHRzd2l0Y2goaXRlbS5rZXl3b3JkKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBETyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnZG8nOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YW1pVHdpZy5leHByLmNhY2hlLmV2YWwoaXRlbS5leHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNFVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdzZXQnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bSA9IGl0ZW0uZXhwcmVzc2lvbi5tYXRjaCgvKFthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMqPVxccyooLispLylcblxuXHRcdFx0XHRpZighbSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgaW52YWxpZCBgc2V0YCBzdGF0ZW1lbnQnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGRpY3RbbVsxXV0gPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChtWzJdLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEBURVhUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdAdGV4dCc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtLnZhbHVlLnJlcGxhY2UodGhpcy5WQVJJQUJMRV9SRSwgZnVuY3Rpb24obWF0Y2gsIGV4cHJlc3Npb24pIHtcblxuXHRcdFx0XHRcdGxldCB2YWx1ZSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDogJyc7XG5cdFx0XHRcdH0pKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJRiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnaWYnOlxuXHRcdFx0Y2FzZSAnQHJvb3QnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aXRlbS5ibG9ja3MuZXZlcnkoKGJsb2NrKSA9PiB7XG5cblx0XHRcdFx0XHRleHByZXNzaW9uID0gYmxvY2suZXhwcmVzc2lvbjtcblxuXHRcdFx0XHRcdGlmKGV4cHJlc3Npb24gPT09ICdAdHJ1ZScgfHwgYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRibG9jay5saXN0LmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBpdGVtLCBkaWN0KTtcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdmb3InOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bSA9IGl0ZW0uYmxvY2tzWzBdLmV4cHJlc3Npb24ubWF0Y2goLyhbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzK2luXFxzKyguKykvKVxuXG5cdFx0XHRcdGlmKCFtKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBpbnZhbGlkIGBmb3JgIHN0YXRlbWVudCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3Qgc3ltYiA9IG1bMV07XG5cdFx0XHRcdGNvbnN0IGV4cHIgPSBtWzJdO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgdmFsdWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG5cblx0XHRcdFx0aWYodHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dmFsdWUgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYodHlwZU5hbWUgIT09ICdbb2JqZWN0IEFycmF5XSdcblx0XHRcdFx0XHQgICAmJlxuXHRcdFx0XHRcdCAgIHR5cGVOYW1lICE9PSAnW29iamVjdCBTdHJpbmddJ1xuXHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgcmlnaHQgb3BlcmFuZGUgbm90IGl0ZXJhYmxlJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3Qgb2xkMSA9IGRpY3RbKHN5bWIpXTtcblx0XHRcdFx0Y29uc3Qgb2xkMiA9IGRpY3RbJ2xvb3AnXTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IGsgPSAweDAwMDAwMDAwMDA7XG5cdFx0XHRcdGNvbnN0IGwgPSB2YWx1ZS5sZW5ndGg7XG5cblx0XHRcdFx0ZGljdC5sb29wID0ge2xlbmd0aDogbH07XG5cblx0XHRcdFx0Y29uc3QgbGlzdCA9IGl0ZW0uYmxvY2tzWzBdLmxpc3Q7XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gdmFsdWUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRkaWN0W3N5bWJdID0gdmFsdWVbaV07XG5cblx0XHRcdFx0XHRkaWN0Lmxvb3AuZmlyc3QgPSAoayA9PT0gKDAgLSAwKSk7XG5cdFx0XHRcdFx0ZGljdC5sb29wLmxhc3QgPSAoayA9PT0gKGwgLSAxKSk7XG5cblx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXgwID0gaztcblx0XHRcdFx0XHRrKys7XG5cdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4ID0gaztcblxuXHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGxpc3QpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbGlzdFtqXSwgZGljdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGRpY3RbJ2xvb3AnXSA9IG9sZDI7XG5cdFx0XHRcdGRpY3RbKHN5bWIpXSA9IG9sZDE7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSU5DTFVERSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2luY2x1ZGUnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IG1fMV8gPSBpdGVtLmV4cHJlc3Npb24sIHdpdGhfc3ViZXhwciwgd2l0aF9jb250ZXh0O1xuXG5cdFx0XHRcdC8qKi8gaWYoKG0gPSBtXzFfLm1hdGNoKC8oLispXFxzK3dpdGhcXHMrKC4rKVxccytvbmx5JC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9IG1bMl07XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZigobSA9IG1fMV8ubWF0Y2goLyguKylcXHMrd2l0aFxccysoLispJC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9IG1bMl07XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKChtID0gbV8xXy5tYXRjaCgvKC4rKVxccytvbmx5JC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9ICd7fSc7XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IG1fMV87XG5cdFx0XHRcdFx0d2l0aF9zdWJleHByID0gJ3t9Jztcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGZpbGVOYW1lID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KSB8fCAnJztcblxuXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZmlsZU5hbWUpICE9PSAnW29iamVjdCBTdHJpbmddJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIHN0cmluZyBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgdmFyaWFibGVzID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwod2l0aF9zdWJleHByLCBpdGVtLmxpbmUsIGRpY3QpIHx8IHt9O1xuXG5cdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YXJpYWJsZXMpICE9PSAnW29iamVjdCBPYmplY3RdJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIG9iamVjdCBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmVzdWx0LnB1c2goYW1pVHdpZy5zdGRsaWIuaW5jbHVkZShcblx0XHRcdFx0XHRmaWxlTmFtZSxcblx0XHRcdFx0XHR2YXJpYWJsZXMsXG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0LFxuXHRcdFx0XHRcdGZhbHNlXG5cdFx0XHRcdCkpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVuZGVyOiBmdW5jdGlvbih0bXBsLCBkaWN0ID0ge30pXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdHN3aXRjaChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodG1wbCkpXG5cdFx0e1xuXHRcdFx0Y2FzZSAnW29iamVjdCBTdHJpbmddJzpcblx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbmV3IGFtaVR3aWcudG1wbC5Db21waWxlcih0bXBsKS5yb290Tm9kZSwgZGljdCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdbb2JqZWN0IE9iamVjdF0nOlxuXHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCAvKi0tLS0tLS0tLS0tLS0tKi90bXBsLyotLS0tLS0tLS0tLS0tLSovLCBkaWN0KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuY2FjaGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLmNhY2hlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZGljdDoge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGV2YWw6IGZ1bmN0aW9uKGV4cHJlc3Npb24sIGxpbmUsIF8pXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBmO1xuXG5cdFx0aWYoZXhwcmVzc2lvbiBpbiB0aGlzLmRpY3QpXG5cdFx0e1xuXHRcdFx0ZiA9IHRoaXMuZGljdFtleHByZXNzaW9uXTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGYgPSB0aGlzLmRpY3RbZXhwcmVzc2lvbl0gPSBldmFsKFxuXHRcdFx0XHRhbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIuZ2V0SlMoXG5cdFx0XHRcdFx0bmV3IGFtaVR3aWcuZXhwci5Db21waWxlcihleHByZXNzaW9uLCBsaW5lKVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIV8pIF8gPSB7fTtcblxuXHRcdHJldHVybiBmLmNhbGwoXywgXyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmRhdGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyogVE9ETyAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmFqYXggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5hamF4ID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZGljdDoge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldDogZnVuY3Rpb24odXJsLCBkb25lLCBmYWlsKVxuXHR7XG5cdFx0bGV0IHR4dDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodXJsIGluIHRoaXMuZGljdClcblx0XHR7XG5cdFx0XHRpZihkb25lKVxuXHRcdFx0e1xuXHRcdFx0XHRkb25lKHRoaXMuZGljdFt1cmxdKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoYW1pVHdpZy5mcylcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogTk9ERUpTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHR0eHQgPSB0aGlzLmRpY3RbdXJsXSA9IGFtaVR3aWcuZnMucmVhZEZpbGVTeW5jKHVybCwgJ3V0ZjgnKTtcblxuXHRcdFx0XHRpZihkb25lKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZG9uZSh0eHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjYXRjaChlcnIpXG5cdFx0XHR7XG5cdFx0XHRcdGlmKGZhaWwpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRmYWlsKGVycik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBCUk9XU0VSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgeG1sSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuXHRcdFx0eG1sSHR0cFJlcXVlc3Qub3BlbignR0VUJywgdXJsLCBmYWxzZSk7XG5cdFx0XHR4bWxIdHRwUmVxdWVzdC5zZW5kKCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHhtbEh0dHBSZXF1ZXN0LnN0YXR1cyA9PT0gMjAwKVxuXHRcdFx0e1xuXHRcdFx0XHR0eHQgPSB0aGlzLmRpY3RbdXJsXSA9IHhtbEh0dHBSZXF1ZXN0LnJlc3BvbnNlVGV4dDtcblxuXHRcdFx0XHRpZihkb25lKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZG9uZSh0eHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHR4dCA9IC8qKioqKioqKioqKioqKi8geG1sSHR0cFJlcXVlc3QucmVzcG9uc2VUZXh0O1xuXG5cdFx0XHRcdGlmKGZhaWwpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRmYWlsKHR4dCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnN0ZGxpYiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5zdGRsaWIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVkFSSUFCTEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzVW5kZWZpbmVkJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ID09PSB1bmRlZmluZWQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0RlZmluZWQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggIT09IHVuZGVmaW5lZDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTnVsbCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCA9PT0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTm90TnVsbCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCAhPT0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzRW1wdHknOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0aWYoeCA9PT0gbnVsbFxuXHRcdCAgIHx8XG5cdFx0ICAgeCA9PT0gZmFsc2Vcblx0XHQgICB8fFxuXHRcdCAgIHggPT09ICgoJycpKVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGNvbnN0IHR5cGVOYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuICh0eXBlTmFtZSA9PT0gJ1tvYmplY3QgQXJyYXldJyAmJiB4Lmxlbmd0aCA9PT0gMClcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgKHR5cGVOYW1lID09PSAnW29iamVjdCBPYmplY3RdJyAmJiBPYmplY3Qua2V5cyh4KS5sZW5ndGggPT09IDApXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNOdW1iZXInOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgTnVtYmVyXSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc1N0cmluZyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBTdHJpbmddJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzQXJyYXknOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzT2JqZWN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNJdGVyYWJsZSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KTtcblxuXHRcdHJldHVybiB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgU3RyaW5nXSdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdHlwZU5hbWUgPT09ICdbb2JqZWN0IEFycmF5XSdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNFdmVuJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzTnVtYmVyKHgpICYmICh4ICYgMSkgPT09IDA7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc09kZCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc051bWJlcih4KSAmJiAoeCAmIDEpID09PSAxO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSVRFUkFCTEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzSW5PYmplY3QnOiBmdW5jdGlvbih4LCB5KVxuXHR7XG5cdFx0aWYodGhpcy5pc0FycmF5KHkpXG5cdFx0ICAgfHxcblx0XHQgICB0aGlzLmlzU3RyaW5nKHkpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHkuaW5kZXhPZih4KSA+PSAwO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNPYmplY3QoeSkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHggaW4geTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0luUmFuZ2UnOiBmdW5jdGlvbih4LCB4MSwgeDIpXG5cdHtcblx0XHRpZih0aGlzLmlzTnVtYmVyKHgxKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc051bWJlcih4Milcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4gKC8qLS0tKi94LyotLS0qLyA+PSAvKi0tLSoveDEvKi0tLSovKVxuXHRcdFx0ICAgICAgICYmXG5cdFx0XHQgICAgICAgKC8qLS0tKi94LyotLS0qLyA8PSAvKi0tLSoveDIvKi0tLSovKVxuXHRcdFx0O1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNTdHJpbmcoeDEpICYmIHgxLmxlbmd0aCA9PT0gMVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyh4MikgJiYgeDIubGVuZ3RoID09PSAxXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuICh4LmNoYXJDb2RlQXQoMCkgPj0geDEuY2hhckNvZGVBdCgwKSlcblx0XHRcdCAgICAgICAmJlxuXHRcdFx0ICAgICAgICh4LmNoYXJDb2RlQXQoMCkgPD0geDIuY2hhckNvZGVBdCgwKSlcblx0XHRcdDtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdyYW5nZSc6IGZ1bmN0aW9uKHgxLCB4Miwgc3RlcCA9IDEpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdC8qKi8gaWYodGhpcy5pc051bWJlcih4MSlcblx0XHQgICAgICAgICYmXG5cdFx0ICAgICAgICB0aGlzLmlzTnVtYmVyKHgyKVxuXHRcdCApIHtcblx0XHRcdGZvcihsZXQgaSA9IC8qLS0tKi94MS8qLS0tKi87IGkgPD0gLyotLS0qL3gyLyotLS0qLzsgaSArPSBzdGVwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQucHVzaCgvKi0tLS0tLS0tLS0tLS0tLSovKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLmlzU3RyaW5nKHgxKSAmJiB4MS5sZW5ndGggPT09IDFcblx0XHQgICAgICAgICYmXG5cdFx0ICAgICAgICB0aGlzLmlzU3RyaW5nKHgyKSAmJiB4Mi5sZW5ndGggPT09IDFcblx0XHQgKSB7XG5cdFx0XHRmb3IobGV0IGkgPSB4MS5jaGFyQ29kZUF0KDApOyBpIDw9IHgyLmNoYXJDb2RlQXQoMCk7IGkgKz0gc3RlcClcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sZW5ndGgnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyh4KVxuXHRcdCAgIHx8XG5cdFx0ICAgdGhpcy5pc0FycmF5KHgpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHgubGVuZ3RoO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNPYmplY3QoeCkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIE9iamVjdC5rZXlzKHgpLmxlbmd0aDtcblx0XHR9XG5cblx0XHRyZXR1cm4gMDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9maXJzdCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMuaXNTdHJpbmcoeCkgfHwgdGhpcy5pc0FycmF5KHgpKSAmJiB4Lmxlbmd0aCA+IDAgPyB4WzB4MDAwMDAwMDAwMF0gOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sYXN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpICYmIHgubGVuZ3RoID4gMCA/IHhbeC5sZW5ndGggLSAxXSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NsaWNlJzogZnVuY3Rpb24oeCwgaWR4MSwgaWR4Milcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpID8geC5zbGljZShpZHgxLCBpZHgyKSA6IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbWVyZ2UnOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID4gMSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmlzU3RyaW5nKGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNTdHJpbmcoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0TC5wdXNoKGFyZ3VtZW50c1tpXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gTC5qb2luKCcnKTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNBcnJheShpdGVtKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBpdGVtKSBMLnB1c2goaXRlbVtqXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gTDtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBEID0ge307XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYXJndW1lbnRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzT2JqZWN0KGl0ZW0pKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGl0ZW0pIERbal0gPSBpdGVtW2pdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIEQ7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfc29ydCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5zb3J0KCkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yZXZlcnNlJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4LnJldmVyc2UoKSA6IFtdO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pvaW4nOiBmdW5jdGlvbih4LCBzZXApXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5qb2luKHNlcCkgOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9rZXlzJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzT2JqZWN0KHgpID8gT2JqZWN0LmtleXMoeCkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNUUklOR1MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdzdGFydHNXaXRoJzogZnVuY3Rpb24oczEsIHMyKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzMSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoczIpXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgYmFzZSA9IDB4MDAwMDAwMDAwMDAwMDAwMDAwMDtcblxuXHRcdFx0cmV0dXJuIHMxLmluZGV4T2YoczIsIGJhc2UpID09PSBiYXNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2VuZHNXaXRoJzogZnVuY3Rpb24oczEsIHMyKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzMSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoczIpXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgYmFzZSA9IHMxLmxlbmd0aCAtIHMyLmxlbmd0aDtcblxuXHRcdFx0cmV0dXJuIHMxLmluZGV4T2YoczIsIGJhc2UpID09PSBiYXNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21hdGNoJzogZnVuY3Rpb24ocywgcmVnZXgpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKCgocykpKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyhyZWdleClcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBpZHgxID0gcmVnZXguICBpbmRleE9mICAoJy8nKTtcblx0XHRcdGNvbnN0IGlkeDIgPSByZWdleC5sYXN0SW5kZXhPZignLycpO1xuXG5cdFx0XHRpZihpZHgxID09PSAwIHx8IGlkeDEgPCBpZHgyKVxuXHRcdFx0e1xuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4LnN1YnN0cmluZyhpZHgxICsgMSwgaWR4MiksIHJlZ2V4LnN1YnN0cmluZyhpZHgyICsgMSkpLnRlc3Qocyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2goZXJyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0LyogSUdOT1JFICovXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfZGVmYXVsdCc6IGZ1bmN0aW9uKHMxLCBzMilcblx0e1xuXHRcdHJldHVybiBzMSB8fCBzMiB8fCAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sb3dlcic6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudG9Mb3dlckNhc2UoKSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3VwcGVyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy50b1VwcGVyQ2FzZSgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfY2FwaXRhbGl6ZSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMpKVxuXHRcdHtcblx0XHRcdHJldHVybiBzLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL15cXFMvZywgZnVuY3Rpb24oYykge1xuXG5cdFx0XHRcdHJldHVybiBjLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdGl0bGUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gcy50cmltKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8oPzpefFxccylcXFMvZywgZnVuY3Rpb24oYykge1xuXG5cdFx0XHRcdHJldHVybiBjLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdHJpbSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudHJpbSgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J19yZXBsYWNlJzogZnVuY3Rpb24ocywgb2xkU3RycywgbmV3U3Rycylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0Y29uc3QgbCA9ICgoKHMpKSkubGVuZ3RoO1xuXHRcdGNvbnN0IG0gPSBvbGRTdHJzLmxlbmd0aDtcblx0XHRjb25zdCBuID0gbmV3U3Rycy5sZW5ndGg7XG5cblx0XHRpZihtICE9IG4pXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHR9XG5cbl9fbDA6XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpICs9IDApXG5cdFx0e1xuXHRcdFx0Y29uc3QgcCA9IHMuc3Vic3RyaW5nKGkpO1xuXG5cdFx0XHRmb3IobGV0IGogPSAwOyBqIDwgbTsgaiArPSAxKVxuXHRcdFx0e1xuXHRcdFx0XHRpZihwLmluZGV4T2Yob2xkU3Ryc1tqXSkgPT09IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChuZXdTdHJzW2pdKTtcblxuXHRcdFx0XHRcdGkgKz0gb2xkU3Ryc1tqXS5sZW5ndGg7XG5cblx0XHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdC5wdXNoKHMuY2hhckF0KGkrKykpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfdGV4dFRvSHRtbFgnOiBbJyYnICAgICwgJ1wiJyAgICAgLCAnPCcgICAsICc+JyAgIF0sXG5cdCdfdGV4dFRvSHRtbFknOiBbJyZhbXA7JywgJyZxdW90OycsICcmbHQ7JywgJyZndDsnXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J190ZXh0VG9TdHJpbmdYJzogWydcXFxcJyAgLCAnXFxuJyAsICdcIicgICwgJ1xcJycgIF0sXG5cdCdfdGV4dFRvU3RyaW5nWSc6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXFwiJywgJ1xcXFxcXCcnXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J190ZXh0VG9Kc29uU3RyaW5nWCc6IFsnXFxcXCcgICwgJ1xcbicgLCAnXCInICBdLFxuXHQnX3RleHRUb0pzb25TdHJpbmdZJzogWydcXFxcXFxcXCcsICdcXFxcbicsICdcXFxcXCInXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9lc2NhcGUnOiBmdW5jdGlvbihzLCBtb2RlKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRzd2l0Y2gobW9kZSB8fCAnaHRtbCcpXG5cdFx0XHR7XG5cdFx0XHRcdGNhc2UgJ2h0bWwnOlxuXHRcdFx0XHRjYXNlICdodG1sX2F0dHInOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb0h0bWxYLCB0aGlzLl90ZXh0VG9IdG1sWSk7XG5cblx0XHRcdFx0Y2FzZSAnanMnOlxuXHRcdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb1N0cmluZ1gsIHRoaXMuX3RleHRUb1N0cmluZ1kpO1xuXG5cdFx0XHRcdGNhc2UgJ2pzb24nOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb0pzb25TdHJpbmdYLCB0aGlzLl90ZXh0VG9Kc29uU3RyaW5nWSk7XG5cblx0XHRcdFx0Y2FzZSAndXJsJzpcblx0XHRcdFx0XHRyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHMpO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIHM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3VybF9lbmNvZGUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBlbmNvZGVVUklDb21wb25lbnQocylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX25sMmJyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy5yZXBsYWNlKC9cXG4vZywgJzxici8+Jylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3Jhdyc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHNcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3JlcGxhY2UnOiBmdW5jdGlvbihzLCBkaWN0KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgJiYgdGhpcy5pc09iamVjdChkaWN0KSA/IHRoaXMuX3JlcGxhY2UocywgT2JqZWN0LmtleXMoZGljdCksIE9iamVjdC52YWx1ZXMoZGljdCkpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NwbGl0JzogZnVuY3Rpb24ocywgc2VwLCBtYXgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMuc3BsaXQoc2VwLCBtYXgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiBbXVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIE5VTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfYWJzJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBNYXRoLmFicyh4KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yb3VuZCc6IGZ1bmN0aW9uKHgsIG1vZGUpXG5cdHtcblx0XHRzd2l0Y2gobW9kZSlcblx0XHR7XG5cdFx0XHRjYXNlICdjZWlsJzpcblx0XHRcdFx0cmV0dXJuIE1hdGguY2VpbCh4KTtcblxuXHRcdFx0Y2FzZSAnZmxvb3InOlxuXHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih4KTtcblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIE1hdGgucm91bmQoeCk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnbWluJzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBhcmdzID0gKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpICYmICh0aGlzLmlzQXJyYXkoYXJndW1lbnRzWzBdKSB8fCB0aGlzLmlzT2JqZWN0KGFyZ3VtZW50c1swXSkpID8gYXJndW1lbnRzWzBdXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFyZ3VtZW50c1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHJlc3VsdCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcblxuXHRcdGZvcihjb25zdCBpIGluIGFyZ3MpXG5cdFx0e1xuXHRcdFx0aWYoIXRoaXMuaXNOdW1iZXIoYXJnc1tpXSkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBOdW1iZXIuTmFOO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihyZXN1bHQgPiBhcmdzW2ldKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSBhcmdzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21heCc6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgYXJncyA9IChhcmd1bWVudHMubGVuZ3RoID09PSAxKSAmJiAodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkgfHwgdGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKSA/IGFyZ3VtZW50c1swXVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhcmd1bWVudHNcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCByZXN1bHQgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XG5cblx0XHRmb3IoY29uc3QgaSBpbiBhcmdzKVxuXHRcdHtcblx0XHRcdGlmKCF0aGlzLmlzTnVtYmVyKGFyZ3NbaV0pKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gTnVtYmVyLk5hTjtcblx0XHRcdH1cblxuXHRcdFx0aWYocmVzdWx0IDwgYXJnc1tpXSlcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0ID0gYXJnc1tpXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBSQU5ET00gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQncmFuZG9tJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGNvbnN0IHkgPSBNYXRoLnJhbmRvbSgpO1xuXG5cdFx0aWYoeClcblx0XHR7XG5cdFx0XHRpZih0aGlzLmlzQXJyYXkoeClcblx0XHRcdCAgIHx8XG5cdFx0XHQgICB0aGlzLmlzT2JqZWN0KHgpXG5cdFx0XHQgKSB7XG5cdFx0XHQgXHRjb25zdCBYID0gT2JqZWN0LmtleXMoeCk7XG5cblx0XHRcdFx0cmV0dXJuIHhbXG5cdFx0XHRcdFx0WFtNYXRoLmZsb29yKFgubGVuZ3RoICogeSldXG5cdFx0XHRcdF07XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuaXNTdHJpbmcoeCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiB4W01hdGguZmxvb3IoeC5sZW5ndGggKiB5KV07XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuaXNOdW1iZXIoeCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKHggKiB5KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR4ID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG5cblx0XHRyZXR1cm4gTWF0aC5mbG9vcih4ICogeSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBKU09OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pzb25fZW5jb2RlJzogZnVuY3Rpb24oeCwgaW5kZW50KVxuXHR7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHgsIG51bGwsIHRoaXMuaXNOdW1iZXIoaW5kZW50KSA/IGluZGVudCA6IDIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pzb25fanNwYXRoJzogZnVuY3Rpb24oeCwgcGF0aClcblx0e1xuXHRcdHJldHVybiB0eXBlb2YgSlNQYXRoICE9PSAndW5kZWZpbmVkJyA/IEpTUGF0aC5hcHBseShwYXRoLCB4KVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVEVNUExBVEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2luY2x1ZGUnOiBmdW5jdGlvbihmaWxlTmFtZSwgdmFyaWFibGVzID0ge30sIHdpdGhDb250ZXh0ID0gdHJ1ZSwgaWdub3JlTWlzc2luZyA9IGZhbHNlKVxuXHR7XG5cdFx0Y29uc3QgdGVtcCA9IHt9O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih3aXRoQ29udGV4dClcblx0XHR7XG5cdFx0XHRmb3IoY29uc3QgaSBpbiBhbWlUd2lnLmVuZ2luZS5kaWN0KVxuXHRcdFx0e1xuXHRcdFx0XHR0ZW1wW2ldID0gYW1pVHdpZy5lbmdpbmUuZGljdFtpXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZih2YXJpYWJsZXMpXG5cdFx0e1xuXHRcdFx0Zm9yKGNvbnN0IGkgaW4gLyotKi92YXJpYWJsZXMvKi0qLylcblx0XHRcdHtcblx0XHRcdFx0dGVtcFtpXSA9IC8qLSovdmFyaWFibGVzLyotKi9baV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgcmVzdWx0ID0gJyc7XG5cblx0XHRhbWlUd2lnLmFqYXguZ2V0KFxuXHRcdFx0ZmlsZU5hbWUsXG5cdFx0XHRmdW5jdGlvbihkYXRhKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSBhbWlUd2lnLmVuZ2luZS5yZW5kZXIoZGF0YSwgdGVtcCk7XG5cdFx0XHR9LFxuXHRcdFx0ZnVuY3Rpb24oLyoqLylcblx0XHRcdHtcblx0XHRcdFx0aWYoIWlnbm9yZU1pc3NpbmcpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgY291bGQgbm90IG9wZW4gYCcgKyBmaWxlTmFtZSArICdgJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5zdGRsaWIuZmlsdGVyX2UgPSBhbWlUd2lnLnN0ZGxpYi5maWx0ZXJfZXNjYXBlO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxuICogQU1JIFR3aWcgRW5naW5lXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTkgVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLmludGVycHJldGVyID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2dldEpTOiBmdW5jdGlvbihub2RlKVxuXHR7XG5cdFx0bGV0IEw7XG5cdFx0bGV0IHg7XG5cdFx0bGV0IGxlZnQ7XG5cdFx0bGV0IHJpZ2h0O1xuXHRcdGxldCBvcGVyYXRvcjtcblxuXHRcdHN3aXRjaChub2RlLm5vZGVUeXBlKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBMU1QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxTVDpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmxpc3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2goLyotLS0tLSovIHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiAnWycgKyBMLmpvaW4oJywnKSArICddJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERJQyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRElDOlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXHRcblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5kaWN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKGkgKyAnOicgKyB0aGlzLl9nZXRKUyhub2RlLmRpY3RbaV0pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gJ3snICsgTC5qb2luKCcsJykgKyAnfSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGVU4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTjpcblx0XHQgXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdCBcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gbm9kZS5ub2RlVmFsdWUgKyAnKCcgKyBMLmpvaW4oJywnKSArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFZBUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuVkFSOlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUubGlzdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaCgnWycgKyB0aGlzLl9nZXRKUyhub2RlLmxpc3RbaV0pICsgJ10nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gTC5sZW5ndGggPiAwID8gbm9kZS5ub2RlVmFsdWUgKyBMLmpvaW4oJycpIDogbm9kZS5ub2RlVmFsdWU7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBURVJNSU5BTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMOlxuXG5cdFx0XHRcdHJldHVybiBub2RlLm5vZGVWYWx1ZTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSVM6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXG5cdFx0XHRcdHN3aXRjaChub2RlLm5vZGVSaWdodC5ub2RlVHlwZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ERUZJTkVEOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0RlZmluZWQoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTlVMTDpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNOdWxsKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVNUFRZOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0VtcHR5KCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLklURVJBQkxFOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0l0ZXJhYmxlKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVWRU46XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzRXZlbignICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5PREQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzT2RkKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHRocm93ICdpbnRlcm5hbCBlcnJvcic7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElOICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSU46XG5cblx0XHRcdFx0aWYobm9kZS5ub2RlUmlnaHQubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzSW5PYmplY3QoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR4ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cblx0XHRcdFx0XHRsZWZ0ID0gbm9kZS5ub2RlUmlnaHQubm9kZUxlZnQubm9kZVZhbHVlO1xuXHRcdFx0XHRcdHJpZ2h0ID0gbm9kZS5ub2RlUmlnaHQubm9kZVJpZ2h0Lm5vZGVWYWx1ZTtcblxuXHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNJblJhbmdlKCcgKyB4ICsgJywnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTVEFSVFNfV0lUSCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlNUQVJUU19XSVRIOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5zdGFydHNXaXRoKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFTkRTX1dJVEggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVORFNfV0lUSDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuZW5kc1dpdGgoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIE1BVENIRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUzpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIubWF0Y2goJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFJBTkdFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0U6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLnJhbmdlKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBET1QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZVZhbHVlWzBdID09PSAnLicpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gbGVmdCArICcuJyArIHJpZ2h0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBsZWZ0ICsgJ1snICsgcmlnaHQgKyAnXSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZMRElWICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRkxESVY6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ01hdGguZmxvb3IoJyArIGxlZnQgKyAnLycgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFBPV0VSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVI6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ01hdGgucG93KCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogVU5JQVJZIE9QRVJBVE9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYobm9kZS5ub2RlTGVmdCA9PT0gbnVsbFxuXHRcdFx0XHQgICAmJlxuXHRcdFx0XHQgICBub2RlLm5vZGVSaWdodCAhPT0gbnVsbFxuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0b3BlcmF0b3IgPSAobm9kZS5ub2RlVHlwZSAhPT0gYW1pVHdpZy5leHByLnRva2Vucy5OT1QpID8gbm9kZS5ub2RlVmFsdWUgOiAnISc7XG5cblx0XHRcdFx0XHRyZXR1cm4gb3BlcmF0b3IgKyAnKCcgKyB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCkgKyAnKSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ICE9PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ID09PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRvcGVyYXRvciA9IChub2RlLm5vZGVUeXBlICE9PSBhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkgPyBub2RlLm5vZGVWYWx1ZSA6ICchJztcblxuXHRcdFx0XHRcdHJldHVybiAnKCcgKyB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KSArICcpJyArIG9wZXJhdG9yO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBCSU5BUlkgT1BFUkFUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ICE9PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ICE9PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRzd2l0Y2gobm9kZS5ub2RlVHlwZSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnfHwnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfQU5EOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICcmJic7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnfCc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9YT1I6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJ14nO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5EOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICcmJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5DT05DQVQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJysnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSBub2RlLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdFx0cmV0dXJuICcoJyArIGxlZnQgKyBvcGVyYXRvciArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEpTOiBmdW5jdGlvbihleHByKVxuXHR7XG5cdFx0cmV0dXJuICcoZnVuY3Rpb24oXykgeyByZXR1cm4gJyArIHRoaXMuX2dldEpTKGV4cHIucm9vdE5vZGUpICsgJzsgfSknO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRldmFsOiBmdW5jdGlvbihleHByLCBfKVxuXHR7XG5cdFx0aWYoIV8pIF8gPSB7fTtcblxuXHRcdHJldHVybiBldmFsKHRoaXMuZ2V0SlMoZXhwcikpLmNhbGwoXywgXyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIihmdW5jdGlvbigpIHtcblxudmFyIFNZTlRBWCA9IHtcbiAgICAgICAgUEFUSCAgICAgICAgICAgIDogMSxcbiAgICAgICAgU0VMRUNUT1IgICAgICAgIDogMixcbiAgICAgICAgT0JKX1BSRUQgICAgICAgIDogMyxcbiAgICAgICAgUE9TX1BSRUQgICAgICAgIDogNCxcbiAgICAgICAgTE9HSUNBTF9FWFBSICAgIDogNSxcbiAgICAgICAgQ09NUEFSSVNPTl9FWFBSIDogNixcbiAgICAgICAgTUFUSF9FWFBSICAgICAgIDogNyxcbiAgICAgICAgQ09OQ0FUX0VYUFIgICAgIDogOCxcbiAgICAgICAgVU5BUllfRVhQUiAgICAgIDogOSxcbiAgICAgICAgUE9TX0VYUFIgICAgICAgIDogMTAsXG4gICAgICAgIExJVEVSQUwgICAgICAgICA6IDExXG4gICAgfTtcblxuLy8gcGFyc2VyXG5cbnZhciBwYXJzZSA9IChmdW5jdGlvbigpIHtcblxuICAgIHZhciBUT0tFTiA9IHtcbiAgICAgICAgICAgIElEICAgIDogMSxcbiAgICAgICAgICAgIE5VTSAgIDogMixcbiAgICAgICAgICAgIFNUUiAgIDogMyxcbiAgICAgICAgICAgIEJPT0wgIDogNCxcbiAgICAgICAgICAgIE5VTEwgIDogNSxcbiAgICAgICAgICAgIFBVTkNUIDogNixcbiAgICAgICAgICAgIEVPUCAgIDogN1xuICAgICAgICB9LFxuICAgICAgICBNRVNTQUdFUyA9IHtcbiAgICAgICAgICAgIFVORVhQX1RPS0VOIDogJ1VuZXhwZWN0ZWQgdG9rZW4gXCIlMFwiJyxcbiAgICAgICAgICAgIFVORVhQX0VPUCAgIDogJ1VuZXhwZWN0ZWQgZW5kIG9mIHBhdGgnXG4gICAgICAgIH07XG5cbiAgICB2YXIgcGF0aCwgaWR4LCBidWYsIGxlbjtcblxuICAgIGZ1bmN0aW9uIHBhcnNlKF9wYXRoKSB7XG4gICAgICAgIHBhdGggPSBfcGF0aC5zcGxpdCgnJyk7XG4gICAgICAgIGlkeCA9IDA7XG4gICAgICAgIGJ1ZiA9IG51bGw7XG4gICAgICAgIGxlbiA9IHBhdGgubGVuZ3RoO1xuXG4gICAgICAgIHZhciByZXMgPSBwYXJzZVBhdGhDb25jYXRFeHByKCksXG4gICAgICAgICAgICB0b2tlbiA9IGxleCgpO1xuXG4gICAgICAgIGlmKHRva2VuLnR5cGUgIT09IFRPS0VOLkVPUCkge1xuICAgICAgICAgICAgdGhyb3dVbmV4cGVjdGVkKHRva2VuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQYXRoQ29uY2F0RXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZVBhdGhDb25jYXRQYXJ0RXhwcigpLFxuICAgICAgICAgICAgb3BlcmFuZHM7XG5cbiAgICAgICAgd2hpbGUobWF0Y2goJ3wnKSkge1xuICAgICAgICAgICAgbGV4KCk7XG4gICAgICAgICAgICAob3BlcmFuZHMgfHwgKG9wZXJhbmRzID0gW2V4cHJdKSkucHVzaChwYXJzZVBhdGhDb25jYXRQYXJ0RXhwcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcGVyYW5kcz9cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLkNPTkNBVF9FWFBSLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBvcGVyYW5kc1xuICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUGF0aENvbmNhdFBhcnRFeHByKCkge1xuICAgICAgICByZXR1cm4gbWF0Y2goJygnKT9cbiAgICAgICAgICAgIHBhcnNlUGF0aEdyb3VwRXhwcigpIDpcbiAgICAgICAgICAgIHBhcnNlUGF0aCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUGF0aEdyb3VwRXhwcigpIHtcbiAgICAgICAgZXhwZWN0KCcoJyk7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VQYXRoQ29uY2F0RXhwcigpO1xuICAgICAgICBleHBlY3QoJyknKTtcblxuICAgICAgICB2YXIgcGFydHMgPSBbXSxcbiAgICAgICAgICAgIHBhcnQ7XG4gICAgICAgIHdoaWxlKChwYXJ0ID0gcGFyc2VQcmVkaWNhdGUoKSkpIHtcbiAgICAgICAgICAgIHBhcnRzLnB1c2gocGFydCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighcGFydHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZXhwcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGV4cHIudHlwZSA9PT0gU1lOVEFYLlBBVEgpIHtcbiAgICAgICAgICAgIGV4cHIucGFydHMgPSBleHByLnBhcnRzLmNvbmNhdChwYXJ0cyk7XG4gICAgICAgICAgICByZXR1cm4gZXhwcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcnRzLnVuc2hpZnQoZXhwcik7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgIDogU1lOVEFYLlBBVEgsXG4gICAgICAgICAgICBwYXJ0cyA6IHBhcnRzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQcmVkaWNhdGUoKSB7XG4gICAgICAgIGlmKG1hdGNoKCdbJykpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVBvc1ByZWRpY2F0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWF0Y2goJ3snKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlT2JqZWN0UHJlZGljYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtYXRjaCgnKCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VQYXRoR3JvdXBFeHByKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBhdGgoKSB7XG4gICAgICAgIGlmKCFtYXRjaFBhdGgoKSkge1xuICAgICAgICAgICAgdGhyb3dVbmV4cGVjdGVkKGxleCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmcm9tUm9vdCA9IGZhbHNlLFxuICAgICAgICAgICAgc3Vic3Q7XG5cbiAgICAgICAgaWYobWF0Y2goJ14nKSkge1xuICAgICAgICAgICAgbGV4KCk7XG4gICAgICAgICAgICBmcm9tUm9vdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihtYXRjaFN1YnN0KCkpIHtcbiAgICAgICAgICAgIHN1YnN0ID0gbGV4KCkudmFsLnN1YnN0cigxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwYXJ0cyA9IFtdLFxuICAgICAgICAgICAgcGFydDtcbiAgICAgICAgd2hpbGUoKHBhcnQgPSBwYXJzZVBhdGhQYXJ0KCkpKSB7XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHBhcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUgICAgIDogU1lOVEFYLlBBVEgsXG4gICAgICAgICAgICBmcm9tUm9vdCA6IGZyb21Sb290LFxuICAgICAgICAgICAgc3Vic3QgICAgOiBzdWJzdCxcbiAgICAgICAgICAgIHBhcnRzICAgIDogcGFydHNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBhdGhQYXJ0KCkge1xuICAgICAgICByZXR1cm4gbWF0Y2hTZWxlY3RvcigpP1xuICAgICAgICAgICAgcGFyc2VTZWxlY3RvcigpIDpcbiAgICAgICAgICAgIHBhcnNlUHJlZGljYXRlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VTZWxlY3RvcigpIHtcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gbGV4KCkudmFsLFxuICAgICAgICAgICAgdG9rZW4gPSBsb29rYWhlYWQoKSxcbiAgICAgICAgICAgIHByb3A7XG5cbiAgICAgICAgaWYobWF0Y2goJyonKSB8fCB0b2tlbi50eXBlID09PSBUT0tFTi5JRCB8fCB0b2tlbi50eXBlID09PSBUT0tFTi5TVFIpIHtcbiAgICAgICAgICAgIHByb3AgPSBsZXgoKS52YWw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSAgICAgOiBTWU5UQVguU0VMRUNUT1IsXG4gICAgICAgICAgICBzZWxlY3RvciA6IHNlbGVjdG9yLFxuICAgICAgICAgICAgcHJvcCAgICAgOiBwcm9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQb3NQcmVkaWNhdGUoKSB7XG4gICAgICAgIGV4cGVjdCgnWycpO1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlUG9zRXhwcigpO1xuICAgICAgICBleHBlY3QoJ10nKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5QT1NfUFJFRCxcbiAgICAgICAgICAgIGFyZyAgOiBleHByXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VPYmplY3RQcmVkaWNhdGUoKSB7XG4gICAgICAgIGV4cGVjdCgneycpO1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlTG9naWNhbE9SRXhwcigpO1xuICAgICAgICBleHBlY3QoJ30nKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5PQkpfUFJFRCxcbiAgICAgICAgICAgIGFyZyAgOiBleHByXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VMb2dpY2FsT1JFeHByKCkge1xuICAgICAgICB2YXIgZXhwciA9IHBhcnNlTG9naWNhbEFOREV4cHIoKSxcbiAgICAgICAgICAgIG9wZXJhbmRzO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCd8fCcpKSB7XG4gICAgICAgICAgICBsZXgoKTtcbiAgICAgICAgICAgIChvcGVyYW5kcyB8fCAob3BlcmFuZHMgPSBbZXhwcl0pKS5wdXNoKHBhcnNlTG9naWNhbEFOREV4cHIoKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3BlcmFuZHM/XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5MT0dJQ0FMX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6ICd8fCcsXG4gICAgICAgICAgICAgICAgYXJncyA6IG9wZXJhbmRzXG4gICAgICAgICAgICB9IDpcbiAgICAgICAgICAgIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VMb2dpY2FsQU5ERXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZUVxdWFsaXR5RXhwcigpLFxuICAgICAgICAgICAgb3BlcmFuZHM7XG5cbiAgICAgICAgd2hpbGUobWF0Y2goJyYmJykpIHtcbiAgICAgICAgICAgIGxleCgpO1xuICAgICAgICAgICAgKG9wZXJhbmRzIHx8IChvcGVyYW5kcyA9IFtleHByXSkpLnB1c2gocGFyc2VFcXVhbGl0eUV4cHIoKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3BlcmFuZHM/XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5MT0dJQ0FMX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6ICcmJicsXG4gICAgICAgICAgICAgICAgYXJncyA6IG9wZXJhbmRzXG4gICAgICAgICAgICB9IDpcbiAgICAgICAgICAgIGV4cHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VFcXVhbGl0eUV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VSZWxhdGlvbmFsRXhwcigpO1xuXG4gICAgICAgIHdoaWxlKFxuICAgICAgICAgICAgbWF0Y2goJz09JykgfHwgbWF0Y2goJyE9JykgfHwgbWF0Y2goJz09PScpIHx8IG1hdGNoKCchPT0nKSB8fFxuICAgICAgICAgICAgbWF0Y2goJ149PScpIHx8IG1hdGNoKCc9PV4nKSB8fG1hdGNoKCdePScpIHx8IG1hdGNoKCc9XicpIHx8XG4gICAgICAgICAgICBtYXRjaCgnJD09JykgfHwgbWF0Y2goJz09JCcpIHx8IG1hdGNoKCckPScpIHx8IG1hdGNoKCc9JCcpIHx8XG4gICAgICAgICAgICBtYXRjaCgnKj09JykgfHwgbWF0Y2goJz09KicpfHwgbWF0Y2goJyo9JykgfHwgbWF0Y2goJz0qJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBleHByID0ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguQ09NUEFSSVNPTl9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiBsZXgoKS52YWwsXG4gICAgICAgICAgICAgICAgYXJncyA6IFtleHByLCBwYXJzZUVxdWFsaXR5RXhwcigpXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUmVsYXRpb25hbEV4cHIoKSB7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VBZGRpdGl2ZUV4cHIoKTtcblxuICAgICAgICB3aGlsZShtYXRjaCgnPCcpIHx8IG1hdGNoKCc+JykgfHwgbWF0Y2goJzw9JykgfHwgbWF0Y2goJz49JykpIHtcbiAgICAgICAgICAgIGV4cHIgPSB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5DT01QQVJJU09OX0VYUFIsXG4gICAgICAgICAgICAgICAgb3AgICA6IGxleCgpLnZhbCxcbiAgICAgICAgICAgICAgICBhcmdzIDogW2V4cHIsIHBhcnNlUmVsYXRpb25hbEV4cHIoKV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUFkZGl0aXZlRXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZU11bHRpcGxpY2F0aXZlRXhwcigpO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCcrJykgfHwgbWF0Y2goJy0nKSkge1xuICAgICAgICAgICAgZXhwciA9IHtcbiAgICAgICAgICAgICAgICB0eXBlIDogU1lOVEFYLk1BVEhfRVhQUixcbiAgICAgICAgICAgICAgICBvcCAgIDogbGV4KCkudmFsLFxuICAgICAgICAgICAgICAgIGFyZ3MgOiBbZXhwciwgcGFyc2VNdWx0aXBsaWNhdGl2ZUV4cHIoKV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZU11bHRpcGxpY2F0aXZlRXhwcigpIHtcbiAgICAgICAgdmFyIGV4cHIgPSBwYXJzZVVuYXJ5RXhwcigpO1xuXG4gICAgICAgIHdoaWxlKG1hdGNoKCcqJykgfHwgbWF0Y2goJy8nKSB8fCBtYXRjaCgnJScpKSB7XG4gICAgICAgICAgICBleHByID0ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiBTWU5UQVguTUFUSF9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiBsZXgoKS52YWwsXG4gICAgICAgICAgICAgICAgYXJncyA6IFtleHByLCBwYXJzZU11bHRpcGxpY2F0aXZlRXhwcigpXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUG9zRXhwcigpIHtcbiAgICAgICAgaWYobWF0Y2goJzonKSkge1xuICAgICAgICAgICAgbGV4KCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgIDogU1lOVEFYLlBPU19FWFBSLFxuICAgICAgICAgICAgICAgIHRvSWR4IDogcGFyc2VVbmFyeUV4cHIoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmcm9tRXhwciA9IHBhcnNlVW5hcnlFeHByKCk7XG4gICAgICAgIGlmKG1hdGNoKCc6JykpIHtcbiAgICAgICAgICAgIGxleCgpO1xuICAgICAgICAgICAgaWYobWF0Y2goJ10nKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgICAgOiBTWU5UQVguUE9TX0VYUFIsXG4gICAgICAgICAgICAgICAgICAgIGZyb21JZHggOiBmcm9tRXhwclxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgICA6IFNZTlRBWC5QT1NfRVhQUixcbiAgICAgICAgICAgICAgICBmcm9tSWR4IDogZnJvbUV4cHIsXG4gICAgICAgICAgICAgICAgdG9JZHggICA6IHBhcnNlVW5hcnlFeHByKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5QT1NfRVhQUixcbiAgICAgICAgICAgIGlkeCAgOiBmcm9tRXhwclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlVW5hcnlFeHByKCkge1xuICAgICAgICBpZihtYXRjaCgnIScpIHx8IG1hdGNoKCctJykpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5VTkFSWV9FWFBSLFxuICAgICAgICAgICAgICAgIG9wICAgOiBsZXgoKS52YWwsXG4gICAgICAgICAgICAgICAgYXJnICA6IHBhcnNlVW5hcnlFeHByKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyc2VQcmltYXJ5RXhwcigpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUHJpbWFyeUV4cHIoKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGxvb2thaGVhZCgpLFxuICAgICAgICAgICAgdHlwZSA9IHRva2VuLnR5cGU7XG5cbiAgICAgICAgaWYodHlwZSA9PT0gVE9LRU4uU1RSIHx8IHR5cGUgPT09IFRPS0VOLk5VTSB8fCB0eXBlID09PSBUT0tFTi5CT09MIHx8IHR5cGUgPT09IFRPS0VOLk5VTEwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSA6IFNZTlRBWC5MSVRFUkFMLFxuICAgICAgICAgICAgICAgIHZhbCAgOiBsZXgoKS52YWxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZihtYXRjaFBhdGgoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlUGF0aCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWF0Y2goJygnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlR3JvdXBFeHByKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhyb3dVbmV4cGVjdGVkKGxleCgpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUdyb3VwRXhwcigpIHtcbiAgICAgICAgZXhwZWN0KCcoJyk7XG4gICAgICAgIHZhciBleHByID0gcGFyc2VMb2dpY2FsT1JFeHByKCk7XG4gICAgICAgIGV4cGVjdCgnKScpO1xuXG4gICAgICAgIHJldHVybiBleHByO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoKHZhbCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBsb29rYWhlYWQoKTtcbiAgICAgICAgcmV0dXJuIHRva2VuLnR5cGUgPT09IFRPS0VOLlBVTkNUICYmIHRva2VuLnZhbCA9PT0gdmFsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoUGF0aCgpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoU2VsZWN0b3IoKSB8fCBtYXRjaFN1YnN0KCkgfHwgbWF0Y2goJ14nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaFNlbGVjdG9yKCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBsb29rYWhlYWQoKTtcbiAgICAgICAgaWYodG9rZW4udHlwZSA9PT0gVE9LRU4uUFVOQ1QpIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSB0b2tlbi52YWw7XG4gICAgICAgICAgICByZXR1cm4gdmFsID09PSAnLicgfHwgdmFsID09PSAnLi4nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoU3Vic3QoKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGxvb2thaGVhZCgpO1xuICAgICAgICByZXR1cm4gdG9rZW4udHlwZSA9PT0gVE9LRU4uSUQgJiYgdG9rZW4udmFsWzBdID09PSAnJCc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXhwZWN0KHZhbCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBsZXgoKTtcbiAgICAgICAgaWYodG9rZW4udHlwZSAhPT0gVE9LRU4uUFVOQ1QgfHwgdG9rZW4udmFsICE9PSB2YWwpIHtcbiAgICAgICAgICAgIHRocm93VW5leHBlY3RlZCh0b2tlbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb29rYWhlYWQoKSB7XG4gICAgICAgIGlmKGJ1ZiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwb3MgPSBpZHg7XG4gICAgICAgIGJ1ZiA9IGFkdmFuY2UoKTtcbiAgICAgICAgaWR4ID0gcG9zO1xuXG4gICAgICAgIHJldHVybiBidWY7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWR2YW5jZSgpIHtcbiAgICAgICAgd2hpbGUoaXNXaGl0ZVNwYWNlKHBhdGhbaWR4XSkpIHtcbiAgICAgICAgICAgICsraWR4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaWR4ID49IGxlbikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLkVPUCxcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtpZHgsIGlkeF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG9rZW4gPSBzY2FuUHVuY3R1YXRvcigpO1xuICAgICAgICBpZih0b2tlbiB8fFxuICAgICAgICAgICAgICAgICh0b2tlbiA9IHNjYW5JZCgpKSB8fFxuICAgICAgICAgICAgICAgICh0b2tlbiA9IHNjYW5TdHJpbmcoKSkgfHxcbiAgICAgICAgICAgICAgICAodG9rZW4gPSBzY2FuTnVtZXJpYygpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9rZW4gPSB7IHJhbmdlIDogW2lkeCwgaWR4XSB9O1xuICAgICAgICBpZHggPj0gbGVuP1xuICAgICAgICAgICAgdG9rZW4udHlwZSA9IFRPS0VOLkVPUCA6XG4gICAgICAgICAgICB0b2tlbi52YWwgPSBwYXRoW2lkeF07XG5cbiAgICAgICAgdGhyb3dVbmV4cGVjdGVkKHRva2VuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsZXgoKSB7XG4gICAgICAgIHZhciB0b2tlbjtcblxuICAgICAgICBpZihidWYpIHtcbiAgICAgICAgICAgIGlkeCA9IGJ1Zi5yYW5nZVsxXTtcbiAgICAgICAgICAgIHRva2VuID0gYnVmO1xuICAgICAgICAgICAgYnVmID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhZHZhbmNlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNEaWdpdChjaCkge1xuICAgICAgICByZXR1cm4gJzAxMjM0NTY3ODknLmluZGV4T2YoY2gpID49IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNXaGl0ZVNwYWNlKGNoKSB7XG4gICAgICAgIHJldHVybiAnIFxcclxcblxcdCcuaW5kZXhPZihjaCkgPiAtMTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0lkU3RhcnQoY2gpIHtcbiAgICAgICAgcmV0dXJuIGNoID09PSAnJCcgfHwgY2ggPT09ICdAJyB8fCBjaCA9PT0gJ18nIHx8IChjaCA+PSAnYScgJiYgY2ggPD0gJ3onKSB8fCAoY2ggPj0gJ0EnICYmIGNoIDw9ICdaJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNJZFBhcnQoY2gpIHtcbiAgICAgICAgcmV0dXJuIGlzSWRTdGFydChjaCkgfHwgKGNoID49ICcwJyAmJiBjaCA8PSAnOScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjYW5JZCgpIHtcbiAgICAgICAgdmFyIGNoID0gcGF0aFtpZHhdO1xuXG4gICAgICAgIGlmKCFpc0lkU3RhcnQoY2gpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhcnQgPSBpZHgsXG4gICAgICAgICAgICBpZCA9IGNoO1xuXG4gICAgICAgIHdoaWxlKCsraWR4IDwgbGVuKSB7XG4gICAgICAgICAgICBjaCA9IHBhdGhbaWR4XTtcbiAgICAgICAgICAgIGlmKCFpc0lkUGFydChjaCkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkICs9IGNoO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoKGlkKSB7XG4gICAgICAgICAgICBjYXNlICd0cnVlJzpcbiAgICAgICAgICAgIGNhc2UgJ2ZhbHNlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLkJPT0wsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogaWQgPT09ICd0cnVlJyxcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeF1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjYXNlICdudWxsJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLk5VTEwsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeF1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uSUQsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogaWQsXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHhdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjYW5TdHJpbmcoKSB7XG4gICAgICAgIGlmKHBhdGhbaWR4XSAhPT0gJ1wiJyAmJiBwYXRoW2lkeF0gIT09ICdcXCcnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb3JpZyA9IHBhdGhbaWR4XSxcbiAgICAgICAgICAgIHN0YXJ0ID0gKytpZHgsXG4gICAgICAgICAgICBzdHIgPSAnJyxcbiAgICAgICAgICAgIGVvc0ZvdW5kID0gZmFsc2UsXG4gICAgICAgICAgICBjaDtcblxuICAgICAgICB3aGlsZShpZHggPCBsZW4pIHtcbiAgICAgICAgICAgIGNoID0gcGF0aFtpZHgrK107XG4gICAgICAgICAgICBpZihjaCA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgICAgY2ggPSBwYXRoW2lkeCsrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoKGNoID09PSAnXCInIHx8IGNoID09PSAnXFwnJykgJiYgY2ggPT09IG9yaWcpIHtcbiAgICAgICAgICAgICAgICBlb3NGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHIgKz0gY2g7XG4gICAgICAgIH1cblxuICAgICAgICBpZihlb3NGb3VuZCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlIDogVE9LRU4uU1RSLFxuICAgICAgICAgICAgICAgIHZhbCA6IHN0cixcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4XVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjYW5OdW1lcmljKCkge1xuICAgICAgICB2YXIgc3RhcnQgPSBpZHgsXG4gICAgICAgICAgICBjaCA9IHBhdGhbaWR4XSxcbiAgICAgICAgICAgIGlzRmxvYXQgPSBjaCA9PT0gJy4nO1xuXG4gICAgICAgIGlmKGlzRmxvYXQgfHwgaXNEaWdpdChjaCkpIHtcbiAgICAgICAgICAgIHZhciBudW0gPSBjaDtcbiAgICAgICAgICAgIHdoaWxlKCsraWR4IDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgY2ggPSBwYXRoW2lkeF07XG4gICAgICAgICAgICAgICAgaWYoY2ggPT09ICcuJykge1xuICAgICAgICAgICAgICAgICAgICBpZihpc0Zsb2F0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaXNGbG9hdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoIWlzRGlnaXQoY2gpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG51bSArPSBjaDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLk5VTSxcbiAgICAgICAgICAgICAgICB2YWwgICA6IGlzRmxvYXQ/IHBhcnNlRmxvYXQobnVtKSA6IHBhcnNlSW50KG51bSwgMTApLFxuICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHhdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2NhblB1bmN0dWF0b3IoKSB7XG4gICAgICAgIHZhciBzdGFydCA9IGlkeCxcbiAgICAgICAgICAgIGNoMSA9IHBhdGhbaWR4XSxcbiAgICAgICAgICAgIGNoMiA9IHBhdGhbaWR4ICsgMV07XG5cbiAgICAgICAgaWYoY2gxID09PSAnLicpIHtcbiAgICAgICAgICAgIGlmKGlzRGlnaXQoY2gyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhdGhbKytpZHhdID09PSAnLic/XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgICAgICB2YWwgICA6ICcuLicsXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCArK2lkeF1cbiAgICAgICAgICAgICAgICB9IDpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogJy4nLFxuICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4XVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZihjaDIgPT09ICc9Jykge1xuICAgICAgICAgICAgdmFyIGNoMyA9IHBhdGhbaWR4ICsgMl07XG4gICAgICAgICAgICBpZihjaDMgPT09ICc9Jykge1xuICAgICAgICAgICAgICAgIGlmKCc9IV4kKicuaW5kZXhPZihjaDEpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSArIGNoMiArIGNoMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHggKz0gM11cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCdeJConLmluZGV4T2YoY2gzKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYoY2gxID09PSAnPScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSArIGNoMiArIGNoMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCBpZHggKz0gM11cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCc9IV4kKj48Jy5pbmRleE9mKGNoMSkgPj0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgICAgIHZhbCAgIDogY2gxICsgY2gyLFxuICAgICAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4ICs9IDJdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGNoMSA9PT0gJz0nICYmICdeJConLmluZGV4T2YoY2gyKSA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGUgIDogVE9LRU4uUFVOQ1QsXG4gICAgICAgICAgICAgICAgdmFsICAgOiBjaDEgKyBjaDIsXG4gICAgICAgICAgICAgICAgcmFuZ2UgOiBbc3RhcnQsIGlkeCArPSAyXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNoMSA9PT0gY2gyICYmIChjaDEgPT09ICd8JyB8fCBjaDEgPT09ICcmJykpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSAgOiBUT0tFTi5QVU5DVCxcbiAgICAgICAgICAgICAgICB2YWwgICA6IGNoMSArIGNoMixcbiAgICAgICAgICAgICAgICByYW5nZSA6IFtzdGFydCwgaWR4ICs9IDJdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoJzp7fSgpW11eKy0qLyUhPjx8Jy5pbmRleE9mKGNoMSkgPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlICA6IFRPS0VOLlBVTkNULFxuICAgICAgICAgICAgICAgIHZhbCAgIDogY2gxLFxuICAgICAgICAgICAgICAgIHJhbmdlIDogW3N0YXJ0LCArK2lkeF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0aHJvd1VuZXhwZWN0ZWQodG9rZW4pIHtcbiAgICAgICAgaWYodG9rZW4udHlwZSA9PT0gVE9LRU4uRU9QKSB7XG4gICAgICAgICAgICB0aHJvd0Vycm9yKHRva2VuLCBNRVNTQUdFUy5VTkVYUF9FT1ApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3dFcnJvcih0b2tlbiwgTUVTU0FHRVMuVU5FWFBfVE9LRU4sIHRva2VuLnZhbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGhyb3dFcnJvcih0b2tlbiwgbWVzc2FnZUZvcm1hdCkge1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMiksXG4gICAgICAgICAgICBtc2cgPSBtZXNzYWdlRm9ybWF0LnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgLyUoXFxkKS9nLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKF8sIGlkeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJnc1tpZHhdIHx8ICcnO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IobXNnKTtcblxuICAgICAgICBlcnJvci5jb2x1bW4gPSB0b2tlbi5yYW5nZVswXTtcblxuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2U7XG59KSgpO1xuXG4vLyB0cmFuc2xhdG9yXG5cbnZhciB0cmFuc2xhdGUgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgYm9keSwgdmFycywgbGFzdFZhcklkLCB1bnVzZWRWYXJzO1xuXG4gICAgZnVuY3Rpb24gYWNxdWlyZVZhcigpIHtcbiAgICAgICAgaWYodW51c2VkVmFycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB1bnVzZWRWYXJzLnNoaWZ0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdmFyTmFtZSA9ICd2JyArICsrbGFzdFZhcklkO1xuICAgICAgICB2YXJzLnB1c2godmFyTmFtZSk7XG4gICAgICAgIHJldHVybiB2YXJOYW1lO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbGVhc2VWYXJzKCkge1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cywgaSA9IGFyZ3MubGVuZ3RoO1xuICAgICAgICB3aGlsZShpLS0pIHtcbiAgICAgICAgICAgIHVudXNlZFZhcnMucHVzaChhcmdzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZShhc3QpIHtcbiAgICAgICAgYm9keSA9IFtdO1xuICAgICAgICB2YXJzID0gWydyZXMnXTtcbiAgICAgICAgbGFzdFZhcklkID0gMDtcbiAgICAgICAgdW51c2VkVmFycyA9IFtdO1xuXG4gICAgICAgIHRyYW5zbGF0ZUV4cHIoYXN0LCAncmVzJywgJ2RhdGEnKTtcblxuICAgICAgICBib2R5LnVuc2hpZnQoXG4gICAgICAgICAgICAndmFyICcsXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5P1xuICAgICAgICAgICAgICAgICdpc0FyciA9IEFycmF5LmlzQXJyYXknIDpcbiAgICAgICAgICAgICAgICAndG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLCBpc0FyciA9IGZ1bmN0aW9uKG8pIHsgcmV0dXJuIHRvU3RyLmNhbGwobykgPT09IFwiW29iamVjdCBBcnJheV1cIjsgfScsXG4gICAgICAgICAgICAgICAgJywgY29uY2F0ID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdCcsXG4gICAgICAgICAgICAgICAgJywnLCB2YXJzLmpvaW4oJywnKSwgJzsnKTtcblxuICAgICAgICBpZihhc3QudHlwZSA9PT0gU1lOVEFYLlBBVEgpIHtcbiAgICAgICAgICAgIHZhciBsYXN0UGFydCA9IGFzdC5wYXJ0c1thc3QucGFydHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZihsYXN0UGFydCAmJiBsYXN0UGFydC50eXBlID09PSBTWU5UQVguUE9TX1BSRUQgJiYgJ2lkeCcgaW4gbGFzdFBhcnQuYXJnKSB7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKCdyZXMgPSByZXNbMF07Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBib2R5LnB1c2goJ3JldHVybiByZXM7Jyk7XG5cbiAgICAgICAgcmV0dXJuIGJvZHkuam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlUGF0aChwYXRoLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gcGF0aC5wYXJ0cyxcbiAgICAgICAgICAgIGkgPSAwLCBsZW4gPSBwYXJ0cy5sZW5ndGg7XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgZGVzdCwgJz0nLCBwYXRoLmZyb21Sb290PyAnZGF0YScgOiBwYXRoLnN1YnN0PyAnc3Vic3QuJyArIHBhdGguc3Vic3QgOiBjdHgsICc7JyxcbiAgICAgICAgICAgICdpc0FycignICsgZGVzdCArICcpIHx8ICgnICsgZGVzdCArICcgPSBbJyArIGRlc3QgKyAnXSk7Jyk7XG5cbiAgICAgICAgd2hpbGUoaSA8IGxlbikge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBwYXJ0c1tpKytdO1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0udHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgU1lOVEFYLlNFTEVDVE9SOlxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdG9yID09PSAnLi4nP1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlRGVzY2VuZGFudFNlbGVjdG9yKGl0ZW0sIGRlc3QsIGRlc3QpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVNlbGVjdG9yKGl0ZW0sIGRlc3QsIGRlc3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgU1lOVEFYLk9CSl9QUkVEOlxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVPYmplY3RQcmVkaWNhdGUoaXRlbSwgZGVzdCwgZGVzdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBTWU5UQVguUE9TX1BSRUQ6XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVBvc1ByZWRpY2F0ZShpdGVtLCBkZXN0LCBkZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFNZTlRBWC5DT05DQVRfRVhQUjpcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlQ29uY2F0RXhwcihpdGVtLCBkZXN0LCBkZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVTZWxlY3RvcihzZWwsIGRlc3QsIGN0eCkge1xuICAgICAgICBpZihzZWwucHJvcCkge1xuICAgICAgICAgICAgdmFyIHByb3BTdHIgPSBlc2NhcGVTdHIoc2VsLnByb3ApLFxuICAgICAgICAgICAgICAgIHJlcyA9IGFjcXVpcmVWYXIoKSwgaSA9IGFjcXVpcmVWYXIoKSwgbGVuID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgICAgIGN1ckN0eCA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgICAgICBqID0gYWNxdWlyZVZhcigpLCB2YWwgPSBhY3F1aXJlVmFyKCksIHRtcEFyciA9IGFjcXVpcmVWYXIoKTtcblxuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgIHJlcywgJz0gW107JywgaSwgJz0gMDsnLCBsZW4sICc9JywgY3R4LCAnLmxlbmd0aDsnLCB0bXBBcnIsICc9IFtdOycsXG4gICAgICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuLCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgY3VyQ3R4LCAnPScsIGN0eCwgJ1snLCBpLCAnKytdOycsXG4gICAgICAgICAgICAgICAgICAgICdpZignLCBjdXJDdHgsICchPSBudWxsKSB7Jyk7XG4gICAgICAgICAgICBpZihzZWwucHJvcCA9PT0gJyonKSB7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKHR5cGVvZiAnLCBjdXJDdHgsICc9PT0gXCJvYmplY3RcIikgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKGlzQXJyKCcsIGN1ckN0eCwgJykpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMsICc9JywgcmVzLCAnLmNvbmNhdCgnLCBjdXJDdHgsICcpOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdlbHNlIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZm9yKCcsIGosICcgaW4gJywgY3VyQ3R4LCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZignLCBjdXJDdHgsICcuaGFzT3duUHJvcGVydHkoJywgaiwgJykpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCwgJz0nLCBjdXJDdHgsICdbJywgaiwgJ107Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwsICc9JywgY3VyQ3R4LCAnWycsIHByb3BTdHIsICddOycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIHZhbCwgdG1wQXJyLCBsZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgIGRlc3QsICc9JywgbGVuLCAnPiAxICYmJywgdG1wQXJyLCAnLmxlbmd0aD8nLCB0bXBBcnIsICcubGVuZ3RoID4gMT8nLFxuICAgICAgICAgICAgICAgICAgICAnY29uY2F0LmFwcGx5KCcsIHJlcywgJywnLCB0bXBBcnIsICcpIDonLCByZXMsICcuY29uY2F0KCcsIHRtcEFyciwgJ1swXSkgOicsIHJlcywgJzsnKTtcblxuICAgICAgICAgICAgcmVsZWFzZVZhcnMocmVzLCBpLCBsZW4sIGN1ckN0eCwgaiwgdmFsLCB0bXBBcnIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlRGVzY2VuZGFudFNlbGVjdG9yKHNlbCwgZGVzdCwgYmFzZUN0eCkge1xuICAgICAgICB2YXIgcHJvcCA9IHNlbC5wcm9wLFxuICAgICAgICAgICAgY3R4ID0gYWNxdWlyZVZhcigpLCBjdXJDdHggPSBhY3F1aXJlVmFyKCksIGNoaWxkQ3R4cyA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGkgPSBhY3F1aXJlVmFyKCksIGogPSBhY3F1aXJlVmFyKCksIHZhbCA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGxlbiA9IGFjcXVpcmVWYXIoKSwgcmVzID0gYWNxdWlyZVZhcigpO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgIGN0eCwgJz0nLCBiYXNlQ3R4LCAnLnNsaWNlKCksJywgcmVzLCAnPSBbXTsnLFxuICAgICAgICAgICAgJ3doaWxlKCcsIGN0eCwgJy5sZW5ndGgpIHsnLFxuICAgICAgICAgICAgICAgIGN1ckN0eCwgJz0nLCBjdHgsICcuc2hpZnQoKTsnKTtcbiAgICAgICAgcHJvcD9cbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAnaWYodHlwZW9mICcsIGN1ckN0eCwgJz09PSBcIm9iamVjdFwiICYmJywgY3VyQ3R4LCAnKSB7JykgOlxuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICdpZih0eXBlb2YgJywgY3VyQ3R4LCAnIT0gbnVsbCkgeycpO1xuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkQ3R4cywgJz0gW107JyxcbiAgICAgICAgICAgICAgICAgICAgJ2lmKGlzQXJyKCcsIGN1ckN0eCwgJykpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaSwgJz0gMCwnLCBsZW4sICc9JywgY3VyQ3R4LCAnLmxlbmd0aDsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuLCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwsICc9JywgY3VyQ3R4LCAnWycsIGksICcrK107Jyk7XG4gICAgICAgIHByb3AgJiYgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZih0eXBlb2YgJywgdmFsLCAnPT09IFwib2JqZWN0XCIpIHsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lQXBwZW5kVG9BcnJheShjaGlsZEN0eHMsIHZhbCk7XG4gICAgICAgIHByb3AgJiYgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAnZWxzZSB7Jyk7XG4gICAgICAgIGlmKHByb3ApIHtcbiAgICAgICAgICAgIGlmKHByb3AgIT09ICcqJykge1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCwgJz0nLCBjdXJDdHgsICdbXCInICsgcHJvcCArICdcIl07Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVBcHBlbmRUb0FycmF5KHJlcywgdmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZUFwcGVuZFRvQXJyYXkocmVzLCBjdXJDdHgpO1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKHR5cGVvZiAnLCBjdXJDdHgsICc9PT0gXCJvYmplY3RcIikgeycpO1xuICAgICAgICB9XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmb3IoJywgaiwgJyBpbiAnLCBjdXJDdHgsICcpIHsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWYoJywgY3VyQ3R4LCAnLmhhc093blByb3BlcnR5KCcsIGosICcpKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCwgJz0nLCBjdXJDdHgsICdbJywgaiwgJ107Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVBcHBlbmRUb0FycmF5KGNoaWxkQ3R4cywgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3AgPT09ICcqJyAmJiBpbmxpbmVBcHBlbmRUb0FycmF5KHJlcywgdmFsKTtcbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgcHJvcCB8fCBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAnfScpO1xuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRDdHhzLCAnLmxlbmd0aCAmJicsIGN0eCwgJy51bnNoaWZ0LmFwcGx5KCcsIGN0eCwgJywnLCBjaGlsZEN0eHMsICcpOycsXG4gICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgZGVzdCwgJz0nLCByZXMsICc7Jyk7XG5cbiAgICAgICAgcmVsZWFzZVZhcnMoY3R4LCBjdXJDdHgsIGNoaWxkQ3R4cywgaSwgaiwgdmFsLCBsZW4sIHJlcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlT2JqZWN0UHJlZGljYXRlKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgcmVzVmFyID0gYWNxdWlyZVZhcigpLCBpID0gYWNxdWlyZVZhcigpLCBsZW4gPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBjb25kID0gYWNxdWlyZVZhcigpLCBjdXJJdGVtID0gYWNxdWlyZVZhcigpO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgIHJlc1ZhciwgJz0gW107JyxcbiAgICAgICAgICAgIGksICc9IDA7JyxcbiAgICAgICAgICAgIGxlbiwgJz0nLCBjdHgsICcubGVuZ3RoOycsXG4gICAgICAgICAgICAnd2hpbGUoJywgaSwgJzwnLCBsZW4sICcpIHsnLFxuICAgICAgICAgICAgICAgIGN1ckl0ZW0sICc9JywgY3R4LCAnWycsIGksICcrK107Jyk7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihleHByLmFyZywgY29uZCwgY3VySXRlbSk7XG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICBjb252ZXJ0VG9Cb29sKGV4cHIuYXJnLCBjb25kKSwgJyYmJywgcmVzVmFyLCAnLnB1c2goJywgY3VySXRlbSwgJyk7JyxcbiAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgIGRlc3QsICc9JywgcmVzVmFyLCAnOycpO1xuXG4gICAgICAgIHJlbGVhc2VWYXJzKHJlc1ZhciwgaSwgbGVuLCBjdXJJdGVtLCBjb25kKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVQb3NQcmVkaWNhdGUoaXRlbSwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciBhcnJheUV4cHIgPSBpdGVtLmFyZywgZnJvbUlkeCwgdG9JZHg7XG4gICAgICAgIGlmKGFycmF5RXhwci5pZHgpIHtcbiAgICAgICAgICAgIHZhciBpZHggPSBhY3F1aXJlVmFyKCk7XG4gICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFycmF5RXhwci5pZHgsIGlkeCwgY3R4KTtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICBpZHgsICc8IDAgJiYgKCcsIGlkeCwgJz0nLCBjdHgsICcubGVuZ3RoICsnLCBpZHgsICcpOycsXG4gICAgICAgICAgICAgICAgZGVzdCwgJz0nLCBjdHgsICdbJywgaWR4LCAnXSA9PSBudWxsPyBbXSA6IFsnLCBjdHgsICdbJywgaWR4LCAnXV07Jyk7XG4gICAgICAgICAgICByZWxlYXNlVmFycyhpZHgpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYXJyYXlFeHByLmZyb21JZHgpIHtcbiAgICAgICAgICAgIGlmKGFycmF5RXhwci50b0lkeCkge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJyYXlFeHByLmZyb21JZHgsIGZyb21JZHggPSBhY3F1aXJlVmFyKCksIGN0eCk7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcnJheUV4cHIudG9JZHgsIHRvSWR4ID0gYWNxdWlyZVZhcigpLCBjdHgpO1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPScsIGN0eCwgJy5zbGljZSgnLCBmcm9tSWR4LCAnLCcsIHRvSWR4LCAnKTsnKTtcbiAgICAgICAgICAgICAgICByZWxlYXNlVmFycyhmcm9tSWR4LCB0b0lkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFycmF5RXhwci5mcm9tSWR4LCBmcm9tSWR4ID0gYWNxdWlyZVZhcigpLCBjdHgpO1xuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPScsIGN0eCwgJy5zbGljZSgnLCBmcm9tSWR4LCAnKTsnKTtcbiAgICAgICAgICAgICAgICByZWxlYXNlVmFycyhmcm9tSWR4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJyYXlFeHByLnRvSWR4LCB0b0lkeCA9IGFjcXVpcmVWYXIoKSwgY3R4KTtcbiAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPScsIGN0eCwgJy5zbGljZSgwLCcsIHRvSWR4LCAnKTsnKTtcbiAgICAgICAgICAgIHJlbGVhc2VWYXJzKHRvSWR4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUV4cHIoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHN3aXRjaChleHByLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLlBBVEg6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlUGF0aChleHByLCBkZXN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5DT05DQVRfRVhQUjpcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVDb25jYXRFeHByKGV4cHIsIGRlc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkNPTVBBUklTT05fRVhQUjpcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVDb21wYXJpc29uRXhwcihleHByLCBkZXN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5NQVRIX0VYUFI6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlTWF0aEV4cHIoZXhwciwgZGVzdCwgY3R4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguTE9HSUNBTF9FWFBSOlxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZUxvZ2ljYWxFeHByKGV4cHIsIGRlc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLlVOQVJZX0VYUFI6XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlVW5hcnlFeHByKGV4cHIsIGRlc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkxJVEVSQUw6XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9Jyk7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlTGl0ZXJhbChleHByLnZhbCk7XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKCc7Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVMaXRlcmFsKHZhbCkge1xuICAgICAgICBib2R5LnB1c2godHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc/IGVzY2FwZVN0cih2YWwpIDogdmFsID09PSBudWxsPyAnbnVsbCcgOiB2YWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUNvbXBhcmlzb25FeHByKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgdmFsMSA9IGFjcXVpcmVWYXIoKSwgdmFsMiA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGlzVmFsMUFycmF5ID0gYWNxdWlyZVZhcigpLCBpc1ZhbDJBcnJheSA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGkgPSBhY3F1aXJlVmFyKCksIGogPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBsZW4xID0gYWNxdWlyZVZhcigpLCBsZW4yID0gYWNxdWlyZVZhcigpLFxuICAgICAgICAgICAgbGVmdEFyZyA9IGV4cHIuYXJnc1swXSwgcmlnaHRBcmcgPSBleHByLmFyZ3NbMV07XG5cbiAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9IGZhbHNlOycpO1xuXG4gICAgICAgIHRyYW5zbGF0ZUV4cHIobGVmdEFyZywgdmFsMSwgY3R4KTtcbiAgICAgICAgdHJhbnNsYXRlRXhwcihyaWdodEFyZywgdmFsMiwgY3R4KTtcblxuICAgICAgICB2YXIgaXNMZWZ0QXJnUGF0aCA9IGxlZnRBcmcudHlwZSA9PT0gU1lOVEFYLlBBVEgsXG4gICAgICAgICAgICBpc1JpZ2h0QXJnTGl0ZXJhbCA9IHJpZ2h0QXJnLnR5cGUgPT09IFNZTlRBWC5MSVRFUkFMO1xuXG4gICAgICAgIGJvZHkucHVzaChpc1ZhbDFBcnJheSwgJz0nKTtcbiAgICAgICAgaXNMZWZ0QXJnUGF0aD8gYm9keS5wdXNoKCd0cnVlOycpIDogYm9keS5wdXNoKCdpc0FycignLCB2YWwxLCAnKTsnKTtcblxuICAgICAgICBib2R5LnB1c2goaXNWYWwyQXJyYXksICc9Jyk7XG4gICAgICAgIGlzUmlnaHRBcmdMaXRlcmFsPyBib2R5LnB1c2goJ2ZhbHNlOycpIDogYm9keS5wdXNoKCdpc0FycignLCB2YWwyLCAnKTsnKTtcblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAnaWYoJyk7XG4gICAgICAgIGlzTGVmdEFyZ1BhdGggfHwgYm9keS5wdXNoKGlzVmFsMUFycmF5LCAnJiYnKTtcbiAgICAgICAgYm9keS5wdXNoKHZhbDEsICcubGVuZ3RoID09PSAxKSB7JyxcbiAgICAgICAgICAgICAgICB2YWwxLCAnPScsIHZhbDEsICdbMF07JyxcbiAgICAgICAgICAgICAgICBpc1ZhbDFBcnJheSwgJz0gZmFsc2U7JyxcbiAgICAgICAgICAgICd9Jyk7XG4gICAgICAgIGlzUmlnaHRBcmdMaXRlcmFsIHx8IGJvZHkucHVzaChcbiAgICAgICAgICAgICdpZignLCBpc1ZhbDJBcnJheSwgJyYmJywgdmFsMiwgJy5sZW5ndGggPT09IDEpIHsnLFxuICAgICAgICAgICAgICAgIHZhbDIsICc9JywgdmFsMiwgJ1swXTsnLFxuICAgICAgICAgICAgICAgIGlzVmFsMkFycmF5LCAnPSBmYWxzZTsnLFxuICAgICAgICAgICAgJ30nKTtcblxuICAgICAgICBib2R5LnB1c2goaSwgJz0gMDsnLFxuICAgICAgICAgICAgJ2lmKCcsIGlzVmFsMUFycmF5LCAnKSB7JyxcbiAgICAgICAgICAgICAgICBsZW4xLCAnPScsIHZhbDEsICcubGVuZ3RoOycpO1xuXG4gICAgICAgIGlmKCFpc1JpZ2h0QXJnTGl0ZXJhbCkge1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICdpZignLCBpc1ZhbDJBcnJheSwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgIGxlbjIsICc9JywgdmFsMiwgJy5sZW5ndGg7JyxcbiAgICAgICAgICAgICAgICAgICAgJ3doaWxlKCcsIGksICc8JywgbGVuMSwgJyYmICEnLCBkZXN0LCAnKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGosICc9IDA7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd3aGlsZSgnLCBqLCAnPCcsIGxlbjIsICcpIHsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUNvbmRpdGlvbihleHByLm9wLCBbdmFsMSwgJ1snLCBpLCAnXSddLmpvaW4oJycpLCBbdmFsMiwgJ1snLCBqLCAnXSddLmpvaW4oJycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3QsICc9IHRydWU7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JyZWFrOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcrKycsIGosICc7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICcrKycsIGksICc7JyxcbiAgICAgICAgICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAnZWxzZSB7Jyk7XG4gICAgICAgIH1cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAnd2hpbGUoJywgaSwgJzwnLCBsZW4xLCAnKSB7Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUNvbmRpdGlvbihleHByLm9wLCBbdmFsMSwgJ1snLCBpLCAnXSddLmpvaW4oJycpLCB2YWwyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0LCAnPSB0cnVlOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JyZWFrOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnKysnLCBpLCAnOycsXG4gICAgICAgICAgICAgICAgICAgICd9Jyk7XG5cbiAgICAgICAgaXNSaWdodEFyZ0xpdGVyYWwgfHwgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICd9Jyk7XG5cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgJ30nKTtcblxuICAgICAgICBpZighaXNSaWdodEFyZ0xpdGVyYWwpIHtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICdlbHNlIGlmKCcsIGlzVmFsMkFycmF5LCcpIHsnLFxuICAgICAgICAgICAgICAgIGxlbjIsICc9JywgdmFsMiwgJy5sZW5ndGg7JyxcbiAgICAgICAgICAgICAgICAnd2hpbGUoJywgaSwgJzwnLCBsZW4yLCAnKSB7Jyk7XG4gICAgICAgICAgICAgICAgICAgIHdyaXRlQ29uZGl0aW9uKGV4cHIub3AsIHZhbDEsIFt2YWwyLCAnWycsIGksICddJ10uam9pbignJykpO1xuICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdCwgJz0gdHJ1ZTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2JyZWFrOycsXG4gICAgICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAgICAgJysrJywgaSwgJzsnLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICd9Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAnZWxzZSB7JyxcbiAgICAgICAgICAgICAgICBkZXN0LCAnPScsIGJpbmFyeU9wZXJhdG9yc1tleHByLm9wXSh2YWwxLCB2YWwyKSwgJzsnLFxuICAgICAgICAgICAgJ30nKTtcblxuICAgICAgICByZWxlYXNlVmFycyh2YWwxLCB2YWwyLCBpc1ZhbDFBcnJheSwgaXNWYWwyQXJyYXksIGksIGosIGxlbjEsIGxlbjIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdyaXRlQ29uZGl0aW9uKG9wLCB2YWwxRXhwciwgdmFsMkV4cHIpIHtcbiAgICAgICAgYm9keS5wdXNoKCdpZignLCBiaW5hcnlPcGVyYXRvcnNbb3BdKHZhbDFFeHByLCB2YWwyRXhwciksICcpIHsnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVMb2dpY2FsRXhwcihleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIGNvbmRpdGlvblZhcnMgPSBbXSxcbiAgICAgICAgICAgIGFyZ3MgPSBleHByLmFyZ3MsIGxlbiA9IGFyZ3MubGVuZ3RoLFxuICAgICAgICAgICAgaSA9IDAsIHZhbDtcblxuICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0gZmFsc2U7Jyk7XG4gICAgICAgIHN3aXRjaChleHByLm9wKSB7XG4gICAgICAgICAgICBjYXNlICcmJic6XG4gICAgICAgICAgICAgICAgd2hpbGUoaSA8IGxlbikge1xuICAgICAgICAgICAgICAgICAgICBjb25kaXRpb25WYXJzLnB1c2godmFsID0gYWNxdWlyZVZhcigpKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlRXhwcihhcmdzW2ldLCB2YWwsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkucHVzaCgnaWYoJywgY29udmVydFRvQm9vbChhcmdzW2krK10sIHZhbCksICcpIHsnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9IHRydWU7Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3x8JzpcbiAgICAgICAgICAgICAgICB3aGlsZShpIDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvblZhcnMucHVzaCh2YWwgPSBhY3F1aXJlVmFyKCkpO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVFeHByKGFyZ3NbaV0sIHZhbCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKCcsIGNvbnZlcnRUb0Jvb2woYXJnc1tpXSwgdmFsKSwgJykgeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdCwgJz0gdHJ1ZTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ30nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoaSsrICsgMSA8IGxlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5wdXNoKCdlbHNlIHsnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAtLWxlbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlKGxlbi0tKSB7XG4gICAgICAgICAgICBib2R5LnB1c2goJ30nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbGVhc2VWYXJzLmFwcGx5KG51bGwsIGNvbmRpdGlvblZhcnMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZU1hdGhFeHByKGV4cHIsIGRlc3QsIGN0eCkge1xuICAgICAgICB2YXIgdmFsMSA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIHZhbDIgPSBhY3F1aXJlVmFyKCksXG4gICAgICAgICAgICBhcmdzID0gZXhwci5hcmdzO1xuXG4gICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnc1swXSwgdmFsMSwgY3R4KTtcbiAgICAgICAgdHJhbnNsYXRlRXhwcihhcmdzWzFdLCB2YWwyLCBjdHgpO1xuXG4gICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgIGRlc3QsICc9JyxcbiAgICAgICAgICAgIGJpbmFyeU9wZXJhdG9yc1tleHByLm9wXShcbiAgICAgICAgICAgICAgICBjb252ZXJ0VG9TaW5nbGVWYWx1ZShhcmdzWzBdLCB2YWwxKSxcbiAgICAgICAgICAgICAgICBjb252ZXJ0VG9TaW5nbGVWYWx1ZShhcmdzWzFdLCB2YWwyKSksXG4gICAgICAgICAgICAnOycpO1xuXG4gICAgICAgIHJlbGVhc2VWYXJzKHZhbDEsIHZhbDIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZVVuYXJ5RXhwcihleHByLCBkZXN0LCBjdHgpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFjcXVpcmVWYXIoKSxcbiAgICAgICAgICAgIGFyZyA9IGV4cHIuYXJnO1xuXG4gICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnLCB2YWwsIGN0eCk7XG5cbiAgICAgICAgc3dpdGNoKGV4cHIub3ApIHtcbiAgICAgICAgICAgIGNhc2UgJyEnOlxuICAgICAgICAgICAgICAgIGJvZHkucHVzaChkZXN0LCAnPSAhJywgY29udmVydFRvQm9vbChhcmcsIHZhbCkgKyAnOycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICctJzpcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goZGVzdCwgJz0gLScsIGNvbnZlcnRUb1NpbmdsZVZhbHVlKGFyZywgdmFsKSArICc7Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZWxlYXNlVmFycyh2YWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUNvbmNhdEV4cHIoZXhwciwgZGVzdCwgY3R4KSB7XG4gICAgICAgIHZhciBhcmdWYXJzID0gW10sXG4gICAgICAgICAgICBhcmdzID0gZXhwci5hcmdzLFxuICAgICAgICAgICAgbGVuID0gYXJncy5sZW5ndGgsXG4gICAgICAgICAgICBpID0gMDtcblxuICAgICAgICB3aGlsZShpIDwgbGVuKSB7XG4gICAgICAgICAgICBhcmdWYXJzLnB1c2goYWNxdWlyZVZhcigpKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZUV4cHIoYXJnc1tpXSwgYXJnVmFyc1tpKytdLCBjdHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYm9keS5wdXNoKGRlc3QsICc9IGNvbmNhdC5jYWxsKCcsIGFyZ1ZhcnMuam9pbignLCcpLCAnKTsnKTtcblxuICAgICAgICByZWxlYXNlVmFycy5hcHBseShudWxsLCBhcmdWYXJzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlc2NhcGVTdHIocykge1xuICAgICAgICByZXR1cm4gJ1xcJycgKyBzLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJykucmVwbGFjZSgvJy9nLCAnXFxcXFxcJycpICsgJ1xcJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5saW5lQXBwZW5kVG9BcnJheShyZXMsIHZhbCwgdG1wQXJyLCBsZW4pIHtcbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgJ2lmKHR5cGVvZiAnLCB2YWwsICchPT0gXCJ1bmRlZmluZWRcIikgeycsXG4gICAgICAgICAgICAgICAgJ2lmKGlzQXJyKCcsIHZhbCwgJykpIHsnKTtcbiAgICAgICAgaWYodG1wQXJyKSB7XG4gICAgICAgICAgICBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgIGxlbiwgJz4gMT8nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZVB1c2hUb0FycmF5KHRtcEFyciwgdmFsKTtcbiAgICAgICAgICAgIGJvZHkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICc6Jyk7XG4gICAgICAgIH1cbiAgICAgICAgYm9keS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICByZXMsICc9JywgcmVzLCAnLmxlbmd0aD8nLCByZXMsICcuY29uY2F0KCcsIHZhbCwgJykgOicsIHZhbCwgJy5zbGljZSgpJywgJzsnLFxuICAgICAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICAgICAnZWxzZSB7Jyk7XG4gICAgICAgIHRtcEFyciAmJiBib2R5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICdpZignLCB0bXBBcnIsICcubGVuZ3RoKSB7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcywgJz0gY29uY2F0LmFwcGx5KCcsIHJlcywgJywnLCB0bXBBcnIsICcpOycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBBcnIsICc9IFtdOycsXG4gICAgICAgICAgICAgICAgICAgICd9Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlubGluZVB1c2hUb0FycmF5KHJlcywgdmFsKTtcbiAgICAgICAgYm9keS5wdXNoKCc7JyxcbiAgICAgICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAnfScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlubGluZVB1c2hUb0FycmF5KHJlcywgdmFsKSB7XG4gICAgICAgIGJvZHkucHVzaChyZXMsICcubGVuZ3RoPycsIHJlcywgJy5wdXNoKCcsIHZhbCwgJykgOicsICByZXMsICdbMF0gPScsIHZhbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29udmVydFRvQm9vbChhcmcsIHZhck5hbWUpIHtcbiAgICAgICAgc3dpdGNoKGFyZy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5MT0dJQ0FMX0VYUFI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhck5hbWU7XG5cbiAgICAgICAgICAgIGNhc2UgU1lOVEFYLkxJVEVSQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICchIScgKyB2YXJOYW1lO1xuXG4gICAgICAgICAgICBjYXNlIFNZTlRBWC5QQVRIOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YXJOYW1lICsgJy5sZW5ndGggPiAwJztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gWycodHlwZW9mICcsIHZhck5hbWUsICc9PT0gXCJib29sZWFuXCI/JyxcbiAgICAgICAgICAgICAgICAgICAgdmFyTmFtZSwgJzonLFxuICAgICAgICAgICAgICAgICAgICAnaXNBcnIoJywgdmFyTmFtZSwgJyk/JywgdmFyTmFtZSwgJy5sZW5ndGggPiAwIDogISEnLCB2YXJOYW1lLCAnKSddLmpvaW4oJycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29udmVydFRvU2luZ2xlVmFsdWUoYXJnLCB2YXJOYW1lKSB7XG4gICAgICAgIHN3aXRjaChhcmcudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTWU5UQVguTElURVJBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyTmFtZTtcblxuICAgICAgICAgICAgY2FzZSBTWU5UQVguUEFUSDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyTmFtZSArICdbMF0nO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBbJyhpc0FycignLCB2YXJOYW1lLCAnKT8nLCB2YXJOYW1lLCAnWzBdIDogJywgdmFyTmFtZSwgJyknXS5qb2luKCcnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0YXJ0c1dpdGhTdHJpY3QodmFsMSwgdmFsMikge1xuICAgICAgICByZXR1cm4gWyd0eXBlb2YgJywgdmFsMSwgJz09PSBcInN0cmluZ1wiICYmIHR5cGVvZiAnLCB2YWwyLCAnPT09IFwic3RyaW5nXCIgJiYnLFxuICAgICAgICAgICAgdmFsMSwgJy5pbmRleE9mKCcsIHZhbDIsICcpID09PSAwJ10uam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RhcnRzV2l0aCh2YWwxLCB2YWwyKSB7XG4gICAgICAgIHJldHVybiBbdmFsMSwgJyE9IG51bGwgJiYnLCB2YWwyLCAnIT0gbnVsbCAmJicsXG4gICAgICAgICAgICB2YWwxLCAnLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKCcsIHZhbDIsICcudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSA9PT0gMCddLmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZHNXaXRoU3RyaWN0KHZhbDEsIHZhbDIpIHtcbiAgICAgICAgcmV0dXJuIFsndHlwZW9mICcsIHZhbDEsICc9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgJywgdmFsMiwgJz09PSBcInN0cmluZ1wiICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcubGVuZ3RoID49JywgdmFsMiwgJy5sZW5ndGggJiYnLFxuICAgICAgICAgICAgdmFsMSwgJy5sYXN0SW5kZXhPZignLCB2YWwyLCAnKSA9PT0nLCB2YWwxLCAnLmxlbmd0aCAtJywgdmFsMiwgJy5sZW5ndGgnXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRzV2l0aCh2YWwxLCB2YWwyKSB7XG4gICAgICAgIHJldHVybiBbdmFsMSwgJyE9IG51bGwgJiYnLCB2YWwyLCAnIT0gbnVsbCAmJicsXG4gICAgICAgICAgICAnKCcsIHZhbDEsICc9JywgdmFsMSwgJy50b1N0cmluZygpKS5sZW5ndGggPj0nLCAnKCcsIHZhbDIsICc9JywgdmFsMiwgJy50b1N0cmluZygpKS5sZW5ndGggJiYnLFxuICAgICAgICAgICAgJygnLCB2YWwxLCAnLnRvTG93ZXJDYXNlKCkpLmxhc3RJbmRleE9mKCcsICcoJywgdmFsMiwgJy50b0xvd2VyQ2FzZSgpKSkgPT09JyxcbiAgICAgICAgICAgIHZhbDEsICcubGVuZ3RoIC0nLCB2YWwyLCAnLmxlbmd0aCddLmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbnRhaW5zU3RyaWN0KHZhbDEsIHZhbDIpIHtcbiAgICAgICAgcmV0dXJuIFsndHlwZW9mICcsIHZhbDEsICc9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgJywgdmFsMiwgJz09PSBcInN0cmluZ1wiICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcuaW5kZXhPZignLCB2YWwyLCAnKSA+IC0xJ10uam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29udGFpbnModmFsMSwgdmFsMikge1xuICAgICAgICByZXR1cm4gW3ZhbDEsICchPSBudWxsICYmICcsIHZhbDIsICchPSBudWxsICYmJyxcbiAgICAgICAgICAgIHZhbDEsICcudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJywgdmFsMiwgJy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkpID4gLTEnXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICB2YXIgYmluYXJ5T3BlcmF0b3JzID0ge1xuICAgICAgICAgICAgJz09PScgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnPT09JyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnPT0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBbJ3R5cGVvZiAnLCB2YWwxLCAnPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mICcsIHZhbDIsICc9PT0gXCJzdHJpbmdcIj8nLFxuICAgICAgICAgICAgICAgICAgICB2YWwxLCAnLnRvTG93ZXJDYXNlKCkgPT09JywgdmFsMiwgJy50b0xvd2VyQ2FzZSgpIDonICtcbiAgICAgICAgICAgICAgICAgICAgdmFsMSwgJz09JywgdmFsMl0uam9pbignJyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnPj0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJz49JyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnPicgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnPicgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJzw9JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICc8PScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJzwnIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJzwnICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICchPT0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJyE9PScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyE9JyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICchPScgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJ149PScgOiBzdGFydHNXaXRoU3RyaWN0LFxuXG4gICAgICAgICAgICAnPT1eJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhcnRzV2l0aFN0cmljdCh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICdePScgOiBzdGFydHNXaXRoLFxuXG4gICAgICAgICAgICAnPV4nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGFydHNXaXRoKHZhbDIsIHZhbDEpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyQ9PScgOiBlbmRzV2l0aFN0cmljdCxcblxuICAgICAgICAgICAgJz09JCcgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVuZHNXaXRoU3RyaWN0KHZhbDIsIHZhbDEpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyQ9JyA6IGVuZHNXaXRoLFxuXG4gICAgICAgICAgICAnPSQnIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbmRzV2l0aCh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICcqPT0nIDogY29udGFpbnNTdHJpY3QsXG5cbiAgICAgICAgICAgICc9PSonIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluc1N0cmljdCh2YWwyLCB2YWwxKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICc9KicgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5zKHZhbDIsIHZhbDEpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyo9JyA6IGNvbnRhaW5zLFxuXG4gICAgICAgICAgICAnKycgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnKycgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJy0nIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJy0nICsgdmFsMjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICcqJyA6IGZ1bmN0aW9uKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMSArICcqJyArIHZhbDI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnLycgOiBmdW5jdGlvbih2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDEgKyAnLycgKyB2YWwyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyUnIDogZnVuY3Rpb24odmFsMSwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwxICsgJyUnICsgdmFsMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIHJldHVybiB0cmFuc2xhdGU7XG59KSgpO1xuXG5mdW5jdGlvbiBjb21waWxlKHBhdGgpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24oJ2RhdGEsc3Vic3QnLCB0cmFuc2xhdGUocGFyc2UocGF0aCkpKTtcbn1cblxudmFyIGNhY2hlID0ge30sXG4gICAgY2FjaGVLZXlzID0gW10sXG4gICAgcGFyYW1zID0ge1xuICAgICAgICBjYWNoZVNpemUgOiAxMDBcbiAgICB9LFxuICAgIHNldFBhcmFtc0hvb2tzID0ge1xuICAgICAgICBjYWNoZVNpemUgOiBmdW5jdGlvbihvbGRWYWwsIG5ld1ZhbCkge1xuICAgICAgICAgICAgaWYobmV3VmFsIDwgb2xkVmFsICYmIGNhY2hlS2V5cy5sZW5ndGggPiBuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlZEtleXMgPSBjYWNoZUtleXMuc3BsaWNlKDAsIGNhY2hlS2V5cy5sZW5ndGggLSBuZXdWYWwpLFxuICAgICAgICAgICAgICAgICAgICBpID0gcmVtb3ZlZEtleXMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgd2hpbGUoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYWNoZVtyZW1vdmVkS2V5c1tpXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxudmFyIGRlY2wgPSBmdW5jdGlvbihwYXRoLCBjdHgsIHN1YnN0cykge1xuICAgIGlmKCFjYWNoZVtwYXRoXSkge1xuICAgICAgICBjYWNoZVtwYXRoXSA9IGNvbXBpbGUocGF0aCk7XG4gICAgICAgIGlmKGNhY2hlS2V5cy5wdXNoKHBhdGgpID4gcGFyYW1zLmNhY2hlU2l6ZSkge1xuICAgICAgICAgICAgZGVsZXRlIGNhY2hlW2NhY2hlS2V5cy5zaGlmdCgpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjYWNoZVtwYXRoXShjdHgsIHN1YnN0cyB8fCB7fSk7XG59O1xuXG5kZWNsLnZlcnNpb24gPSAnMC40LjAnO1xuXG5kZWNsLnBhcmFtcyA9IGZ1bmN0aW9uKF9wYXJhbXMpIHtcbiAgICBpZighYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cblxuICAgIGZvcih2YXIgbmFtZSBpbiBfcGFyYW1zKSB7XG4gICAgICAgIGlmKF9wYXJhbXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAgIHNldFBhcmFtc0hvb2tzW25hbWVdICYmIHNldFBhcmFtc0hvb2tzW25hbWVdKHBhcmFtc1tuYW1lXSwgX3BhcmFtc1tuYW1lXSk7XG4gICAgICAgICAgICBwYXJhbXNbbmFtZV0gPSBfcGFyYW1zW25hbWVdO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZGVjbC5jb21waWxlID0gY29tcGlsZTtcblxuZGVjbC5hcHBseSA9IGRlY2w7XG5cbmlmKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRlY2w7XG59XG5lbHNlIGlmKHR5cGVvZiBtb2R1bGVzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZXMuZGVmaW5lKCdqc3BhdGgnLCBmdW5jdGlvbihwcm92aWRlKSB7XG4gICAgICAgIHByb3ZpZGUoZGVjbCk7XG4gICAgfSk7XG59XG5lbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24ocmVxdWlyZSwgZXhwb3J0cywgbW9kdWxlKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZGVjbDtcbiAgICB9KTtcbn1cbmVsc2Uge1xuICAgIHdpbmRvdy5KU1BhdGggPSBkZWNsO1xufVxuXG59KSgpO1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEVTNiBFWFRFTlNJT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pZighU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoKVxue1xuXHRTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGggPSBmdW5jdGlvbihzKVxuXHR7XG5cdFx0Y29uc3QgYmFzZSA9IDB4MDAwMDAwMDAwMDAwMDAwMDAwMDA7XG5cblx0XHRyZXR1cm4gdGhpcy5pbmRleE9mKHMsIGJhc2UpID09PSBiYXNlO1xuXHR9O1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pZighU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aClcbntcblx0U3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCA9IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRjb25zdCBiYXNlID0gdGhpcy5sZW5ndGggLSBzLmxlbmd0aDtcblxuXHRcdHJldHVybiB0aGlzLmluZGV4T2YocywgYmFzZSkgPT09IGJhc2U7XG5cdH07XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBKUVVFUlkgRVhURU5TSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxudmFyIF9hbWlfaW50ZXJuYWxfalF1ZXJ5RWFjaCA9IGpRdWVyeS5lYWNoO1xudmFyIF9hbWlfaW50ZXJuYWxfalF1ZXJ5QWpheCA9IGpRdWVyeS5hamF4O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5qUXVlcnkuZWFjaCA9IGZ1bmN0aW9uKGVsLCBjYWxsYmFjaywgY29udGV4dClcbntcblx0cmV0dXJuIF9hbWlfaW50ZXJuYWxfalF1ZXJ5RWFjaChlbCwgY29udGV4dCA/IChpbmRleCwgdmFsdWUpID0+IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgaW5kZXgsIHZhbHVlKSA6IGNhbGxiYWNrKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmpRdWVyeS5hamF4ID0gZnVuY3Rpb24oc2V0dGluZ3MpXG57XG5cdGlmKHR5cGVvZiBzZXR0aW5ncyA9PT0gJ29iamVjdCdcblx0ICAgJiZcblx0ICAgc2V0dGluZ3MuZGF0YVR5cGUgPT09ICdzaGVldCdcblx0ICkge1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0LCB1cmxdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0JywgJ3VybCddLFxuXHRcdFx0W3Jlc3VsdCwgJyddLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpXG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHVybClcblx0XHR7XG5cdFx0XHQkKCdoZWFkJykuYXBwZW5kKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIicgKyB1cmwgKyAnXCI+PC9saW5rPicpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH1cblx0ZWxzZVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gX2FtaV9pbnRlcm5hbF9qUXVlcnlBamF4LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fVxufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmaW5kV2l0aFNlbGY6IGZ1bmN0aW9uKHNlbGVjdG9yKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZmluZChzZWxlY3RvcikuYWRkQmFjayhzZWxlY3Rvcik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNlcmlhbGl6ZU9iamVjdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0ge307XG5cblx0XHR0aGlzLnNlcmlhbGl6ZUFycmF5KCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRpZihpdGVtLm5hbWUgaW4gcmVzdWx0KVxuXHRcdFx0e1xuXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocmVzdWx0W2l0ZW0ubmFtZV0pID09PSAnW29iamVjdCBTdHJpbmddJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdFtpdGVtLm5hbWVdID0gW3Jlc3VsdFtpdGVtLm5hbWVdXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlc3VsdFtpdGVtLm5hbWVdLnB1c2goaXRlbS52YWx1ZSB8fCAnJyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZSB8fCAnJztcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBCT09UU1RSQVAgRVhURU5TSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxudmFyIF9hbWlfaW50ZXJuYWxfbW9kYWxaSW5kZXggPSAxMDUwO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kKGRvY3VtZW50KS5vbignc2hvdy5icy5tb2RhbCcsICcubW9kYWwnLCBmdW5jdGlvbigpIHtcblxuXHRjb25zdCBlbCA9ICQodGhpcyk7XG5cblx0c2V0VGltZW91dCgoKSA9PiB7XG5cblx0XHQkKCdib2R5ID4gLm1vZGFsLWJhY2tkcm9wOmxhc3QnKS5jc3MoJ3otaW5kZXgnLCBfYW1pX2ludGVybmFsX21vZGFsWkluZGV4KyspO1xuXHRcdC8qLS0tLS0tLS0tLS0qL2VsLyotLS0tLS0tLS0tLSovLmNzcygnei1pbmRleCcsIF9hbWlfaW50ZXJuYWxfbW9kYWxaSW5kZXgrKyk7XG5cblx0fSwgMTApO1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogTkFNRVNQQUNFIEhFTFBFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIF8kY3JlYXRlTmFtZXNwYWNlKCRuYW1lLCB4KVxue1xuXHRsZXQgcGFyZW50ID0gd2luZG93O1xuXG5cdGNvbnN0IHBhcnRzID0gJG5hbWUuc3BsaXQoL1xccypcXC5cXHMqL2cpLCBsID0gcGFydHMubGVuZ3RoIC0gMTtcblxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbDsgaSsrKVxuXHR7XG5cdFx0aWYocGFyZW50W3BhcnRzW2ldXSlcblx0XHR7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cGFyZW50ID0gcGFyZW50W3BhcnRzW2ldXSA9IHt9O1xuXHRcdH1cblx0fVxuXG5cdHBhcmVudFtwYXJ0c1tpXV0gPSB4O1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5mdW5jdGlvbiBfJGFkZFRvTmFtZXNwYWNlKCRuYW1lLCB4KVxue1xuXHRsZXQgcGFyZW50ID0gd2luZG93O1xuXG5cdGNvbnN0IHBhcnRzID0gJG5hbWUuc3BsaXQoL1xccypcXC5cXHMqL2cpLCBsID0gcGFydHMubGVuZ3RoIC0gMTtcblxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbDsgaSsrKVxuXHR7XG5cdFx0aWYocGFyZW50W3BhcnRzW2ldXSlcblx0XHR7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2AnICsgJG5hbWUgKyAnYCAoYCcgKyBwYXJ0c1tpXSArICdgKSBub3QgZGVjbGFyZWQnO1xuXHRcdH1cblx0fVxuXG5cdHBhcmVudFtwYXJ0c1tpXV0gPSB4O1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogTkFNRVNQQUNFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICAqIENyZWF0ZSBhIG5ldyBuYW1lc3BhY2VcbiAgKiBAcGFyYW0ge1N0cmluZ30gJG5hbWUgdGhlIG5hbWVzcGFjZSBuYW1lXG4gICogQHBhcmFtIHtPYmplY3R9IFskZGVzY3JdIHRoZSBuYW1lc3BhY2UgYm9keVxuICAqL1xuXG5mdW5jdGlvbiAkQU1JTmFtZXNwYWNlKCRuYW1lLCAkZGVzY3IpXG57XG5cdGlmKCEkZGVzY3IpXG5cdHtcblx0XHQkZGVzY3IgPSB7fTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZGVzY3IuJG5hbWUgPSAkbmFtZTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XyRjcmVhdGVOYW1lc3BhY2UoJG5hbWUsICRkZXNjcik7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGlmKCRkZXNjci4kKVxuXHR7XG5cdFx0JGRlc2NyLiQuYXBwbHkoJGRlc2NyKTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIElOVEVSRkFDRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAgKiBDcmVhdGUgYSBuZXcgaW50ZXJmYWNlXG4gICogQHBhcmFtIHtTdHJpbmd9ICRuYW1lIHRoZSBpbnRlcmZhY2UgbmFtZVxuICAqIEBwYXJhbSB7T2JqZWN0fSBbJGRlc2NyXSB0aGUgaW50ZXJmYWNlIGJvZHlcbiAgKi9cblxuZnVuY3Rpb24gJEFNSUludGVyZmFjZSgkbmFtZSwgJGRlc2NyKVxue1xuXHRpZighJGRlc2NyKVxuXHR7XG5cdFx0JGRlc2NyID0ge307XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y29uc3QgJGNsYXNzID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhyb3cgJ2NvdWxkIG5vciBpbnN0YW50aWF0ZSBpbnRlcmZhY2UnO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpZigkZGVzY3IuJGV4dGVuZHMpXG5cdHtcblx0XHR0aHJvdyAnYCRleHRlbmRzYCBub3QgYWxsb3dlZCBmb3IgaW50ZXJmYWNlJztcblx0fVxuXG5cdGlmKCRkZXNjci4kaW1wbGVtZW50cylcblx0e1xuXHRcdHRocm93ICdgJGltcGxlbWVudHNgIG5vdCBhbGxvd2VkIGZvciBpbnRlcmZhY2UnO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGlmKCRkZXNjci4kKVxuXHR7XG5cdFx0dGhyb3cgJ2AkYCBub3QgYWxsb3dlZCBmb3IgaW50ZXJmYWNlJztcblx0fVxuXG5cdGlmKCRkZXNjci4kaW5pdClcblx0e1xuXHRcdHRocm93ICdgJGluaXRgIG5vdCBhbGxvd2VkIGZvciBpbnRlcmZhY2UnO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRjbGFzcy4kbmFtZSA9ICRuYW1lO1xuXHQkY2xhc3MuJGNsYXNzID0gJGNsYXNzO1xuXHQkY2xhc3MuJG1lbWJlcnMgPSAkZGVzY3I7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF8kYWRkVG9OYW1lc3BhY2UoJG5hbWUsICRjbGFzcyk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogQ0xBU1NFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICAqIENyZWF0ZSBhIG5ldyBjbGFzc1xuICAqIEBwYXJhbSB7U3RyaW5nfSAkbmFtZSB0aGUgY2xhc3MgbmFtZVxuICAqIEBwYXJhbSB7T2JqZWN0fSBbJGRlc2NyXSB0aGUgY2xhc3MgYm9keVxuICAqL1xuXG5mdW5jdGlvbiAkQU1JQ2xhc3MoJG5hbWUsICRkZXNjcilcbntcblx0aWYoISRkZXNjcilcblx0e1xuXHRcdCRkZXNjciA9IHt9O1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNvbnN0ICRzdXBlciA9ICgkZGVzY3IuJGV4dGVuZHMgaW5zdGFuY2VvZiBGdW5jdGlvbikgPyAkZGVzY3IuJGV4dGVuZHMucHJvdG90eXBlIDoge307XG5cblx0Y29uc3QgJHN1cGVyX2ltcGxlbWVudHMgPSAoJHN1cGVyLiRpbXBsZW1lbnRzIGluc3RhbmNlb2YgQXJyYXkpID8gJHN1cGVyLiRpbXBsZW1lbnRzIDogW107XG5cdGNvbnN0ICRkZXNjcl9pbXBsZW1lbnRzID0gKCRkZXNjci4kaW1wbGVtZW50cyBpbnN0YW5jZW9mIEFycmF5KSA/ICRkZXNjci4kaW1wbGVtZW50cyA6IFtdO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjb25zdCAkY2xhc3MgPSBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGZvcihjb25zdCBpIGluIHRoaXMuJGltcGxlbWVudHMpXG5cdFx0e1xuXHRcdFx0aWYodGhpcy4kaW1wbGVtZW50cy5oYXNPd25Qcm9wZXJ0eShpKSlcblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgJGludGVyZmFjZSA9IHRoaXMuJGltcGxlbWVudHNbaV07XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gJGludGVyZmFjZS4kbWVtYmVycylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKCRpbnRlcmZhY2UuJG1lbWJlcnMuaGFzT3duUHJvcGVydHkoaikpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Y29uc3QgJG1lbWJlciA9ICRpbnRlcmZhY2UuJG1lbWJlcnNbal07XG5cblx0XHRcdFx0XHRcdGlmKHR5cGVvZih0aGlzW2pdKSAhPT0gdHlwZW9mKCRtZW1iZXIpKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aHJvdyAnY2xhc3MgYCcgKyB0aGlzLiRuYW1lICsgJ2Agd2l0aCBtdXN0IGltcGxlbWVudCBgJyArICRpbnRlcmZhY2UuJG5hbWUgKyAnLicgKyBqICsgJ2AnO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgX3N1cGVyID0gdGhpcy4kY2xhc3MuX2ludGVybmFsX3N1cGVyO1xuXHRcdGNvbnN0IF9hZGRlZCA9IHRoaXMuJGNsYXNzLl9pbnRlcm5hbF9hZGRlZDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy4kc3VwZXIgPSB7fTtcblxuXHRcdGZvcihjb25zdCBuYW1lIGluIF9zdXBlcilcblx0XHR7XG5cdFx0XHRpZihfc3VwZXIuaGFzT3duUHJvcGVydHkobmFtZSkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuJHN1cGVyW25hbWVdID0gKChfc3VwZXIsIG5hbWUsIHRoYXQpID0+IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0cmV0dXJuIF9zdXBlcltuYW1lXS5hcHBseSh0aGF0LCBhcmd1bWVudHMpXG5cblx0XHRcdFx0fSkoX3N1cGVyLCBuYW1lLCB0aGlzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuJGFkZGVkID0ge307XG5cblx0XHRmb3IoY29uc3QgbmFtZSBpbiBfYWRkZWQpXG5cdFx0e1xuXHRcdFx0aWYoX2FkZGVkLmhhc093blByb3BlcnR5KG5hbWUpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLiRhZGRlZFtuYW1lXSA9ICgoX2FkZGVkLCBuYW1lLCB0aGF0KSA9PiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdHJldHVybiBfYWRkZWRbbmFtZV0uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcblxuXHRcdFx0XHR9KShfYWRkZWQsIG5hbWUsIHRoaXMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy4kaW5pdClcblx0XHR7XG5cdFx0XHR0aGlzLiRpbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRjbGFzcy5faW50ZXJuYWxfc3VwZXIgPSB7fTtcblx0JGNsYXNzLl9pbnRlcm5hbF9hZGRlZCA9IHt9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3IoY29uc3QgbmFtZSBpbiAkc3VwZXIpXG5cdHtcblx0XHRpZihuYW1lID09PSAnJGluaXQnXG5cdFx0ICAgfHxcblx0XHQgICBuYW1lLmNoYXJBdCgwKSAhPT0gJyQnXG5cdFx0ICAgfHxcblx0XHQgICAkc3VwZXIuaGFzT3duUHJvcGVydHkobmFtZSlcblx0XHQgKSB7XG5cdFx0XHQkY2xhc3MuX2ludGVybmFsX3N1cGVyW25hbWVdID0gJHN1cGVyW25hbWVdO1xuXG5cdFx0XHQkY2xhc3MucHJvdG90eXBlW25hbWVdID0gJHN1cGVyW25hbWVdO1xuXHRcdH1cblx0fVxuXG5cdGZvcihjb25zdCBuYW1lIGluICRkZXNjcilcblx0e1xuXHRcdGlmKG5hbWUgPT09ICckaW5pdCdcblx0XHQgICB8fFxuXHRcdCAgIG5hbWUuY2hhckF0KDApICE9PSAnJCdcblx0XHQgICB8fFxuXHRcdCAgICRkZXNjci5oYXNPd25Qcm9wZXJ0eShuYW1lKVxuXHRcdCApIHtcblx0XHRcdCRjbGFzcy5faW50ZXJuYWxfYWRkZWRbbmFtZV0gPSAkZGVzY3JbbmFtZV07XG5cblx0XHRcdCRjbGFzcy5wcm90b3R5cGVbbmFtZV0gPSAkZGVzY3JbbmFtZV07XG5cdFx0fVxuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRjbGFzcy5wcm90b3R5cGUuJG5hbWUgPSAkbmFtZTtcblx0JGNsYXNzLnByb3RvdHlwZS4kY2xhc3MgPSAkY2xhc3M7XG5cdCRjbGFzcy5wcm90b3R5cGUuJGltcGxlbWVudHMgPSAkc3VwZXJfaW1wbGVtZW50cy5jb25jYXQoJGRlc2NyX2ltcGxlbWVudHMpO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfJGFkZFRvTmFtZXNwYWNlKCRuYW1lLCAkY2xhc3MpO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpZigkZGVzY3IuJClcblx0e1xuXHRcdCRkZXNjci4kLmFwcGx5KCRjbGFzcyk7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBOb2RlSlMgRVhURU5TSU9OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaWYodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKVxue1xuXHRtb2R1bGUuZXhwb3J0cy5OYW1lc3BhY2UgPSAkQU1JTmFtZXNwYWNlO1xuXHRtb2R1bGUuZXhwb3J0cy5JbnRlcmZhY2UgPSAkQU1JSW50ZXJmYWNlO1xuXHRtb2R1bGUuZXhwb3J0cy4gIENsYXNzICAgPSAgICRBTUlDbGFzcyAgO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogSlFVRVJZIEVYVEVOU0lPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmlmKHR5cGVvZiBqUXVlcnkgIT09ICd1bmRlZmluZWQnKVxue1xuXHRqUXVlcnkuTmFtZXNwYWNlID0gJEFNSU5hbWVzcGFjZTtcblx0alF1ZXJ5LkludGVyZmFjZSA9ICRBTUlJbnRlcmZhY2U7XG5cdGpRdWVyeS4gIENsYXNzICAgPSAgICRBTUlDbGFzcyAgO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgQU1JIHVybCByb3V0aW5nIHN1YnN5c3RlbVxuICogQG5hbWVzcGFjZSBhbWlSb3V0ZXJcbiAqL1xuXG4kQU1JTmFtZXNwYWNlKCdhbWlSb3V0ZXInLCAvKiogQGxlbmRzIGFtaVJvdXRlciAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFJJVkFURSBNRU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3NjcmlwdFVSTDogJycsXG5cdF9vcmlnaW5VUkw6ICcnLFxuXHRfd2ViQXBwVVJMOiAnJyxcblxuXHRfaGFzaDogJycsXG5cdF9hcmdzOiBbXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3JvdXRlczogW10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQUklWQVRFIE1FVEhPRFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZWF0U2xhc2hlczogZnVuY3Rpb24odXJsKVxuXHR7XG5cdFx0dXJsID0gdXJsLnRyaW0oKTtcblxuXHRcdHdoaWxlKHVybFt1cmwubGVuZ3RoIC0gMV0gPT09ICcvJylcblx0XHR7XG5cdFx0XHR1cmwgPSB1cmwuc3Vic3RyaW5nKDAsIHVybC5sZW5ndGggLSAxKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdXJsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogU1RBVElDIENPTlNUUlVDVE9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLl9hcmdzLmxlbmd0aCA9IDA7XG5cdFx0dGhpcy5fcm91dGVzLmxlbmd0aCA9IDA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0ICBocmVmICA9IHdpbmRvdy5sb2NhdGlvbi4gaHJlZiAudHJpbSgpO1xuXHRcdGNvbnN0ICBoYXNoICA9IHdpbmRvdy5sb2NhdGlvbi4gaGFzaCAudHJpbSgpO1xuXHRcdGNvbnN0IHNlYXJjaCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gudHJpbSgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogU0NSSVBUX1VSTCBBTkQgT1JJR0lOX1VSTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRmb3IobGV0IGlkeCwgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdGlkeCA9IHNjcmlwdHNbaV0uc3JjLmluZGV4T2YoJ2pzL2FtaS4nKTtcblxuXHRcdFx0aWYoaWR4ID4gMClcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5fc2NyaXB0VVJMID0gc2NyaXB0c1tpXS5zcmM7XG5cblx0XHRcdFx0dGhpcy5fb3JpZ2luVVJMID0gdGhpcy5fZWF0U2xhc2hlcyhcblx0XHRcdFx0XHR0aGlzLl9zY3JpcHRVUkwuc3Vic3RyaW5nKDAsIGlkeClcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBXRUJBUFBfVVJMICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuX3dlYkFwcFVSTCA9IHRoaXMuX2VhdFNsYXNoZXMoXG5cdFx0XHRocmVmLnJlcGxhY2UoLyg/OlxcI3xcXD8pLiokLywgJycpXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEhBU0ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5faGFzaCA9IHRoaXMuX2VhdFNsYXNoZXMoXG5cdFx0XHRoYXNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXD8uKiQvLCAnJylcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQVJHUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihzZWFyY2gpXG5cdFx0e1xuXHRcdFx0c2VhcmNoLnN1YnN0cmluZygxKS5zcGxpdCgnJicpLmZvckVhY2goKHBhcmFtKSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgcGFydHMgPSBwYXJhbS5zcGxpdCgnPScpO1xuXG5cdFx0XHRcdC8qKi8gaWYocGFydHMubGVuZ3RoID09PSAxKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5fYXJnc1tkZWNvZGVVUklDb21wb25lbnQocGFydHNbMF0pXSA9IC8qLS0tLS0tLS0qLyAnJyAvKi0tLS0tLS0tKi87XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZihwYXJ0cy5sZW5ndGggPT09IDIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLl9hcmdzW2RlY29kZVVSSUNvbXBvbmVudChwYXJ0c1swXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBQVUJMSUMgTUVUSE9EUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIEFXRidzIHNjcmlwdCBVUkxcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBBV0YncyBzY3JpcHQgVVJMXG5cdCAgKi9cblxuXHRnZXRTY3JpcHRVUkw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zY3JpcHRVUkw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgb3JpZ2luIFVSTFxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIG9yaWdpbiBVUkxcblx0ICAqL1xuXG5cdGdldE9yaWdpblVSTDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX29yaWdpblVSTDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgd2ViYXBwIFVSTFxuXHQgICovXG5cblx0Z2V0V2ViQXBwVVJMOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fd2ViQXBwVVJMO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIGFuY2hvciBwYXJ0IG9mIHRoZSB3ZWJhcHAgVVJMXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgYW5jaG9yIHBhcnQgb2YgdGhlIHdlYmFwcCBVUkxcblx0ICAqL1xuXG5cdGdldEhhc2g6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9oYXNoO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEdldHMgdGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFxuXHQgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IFRoZSBhcmd1bWVudHMgZXh0cmFjdGVkIGZyb20gdGhlIHdlYmFwcCBVUkxcblx0ICAqL1xuXG5cdGdldEFyZ3M6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9hcmdzO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFwcGVuZHMgYSByb3V0aW5nIHJ1bGVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSByZWdFeHAgdGhlIHJlZ0V4cFxuXHQgICogQHBhcmFtIHtPYmplY3R9IGhhbmRsZXIgdGhlIGhhbmRsZXJcblx0ICAqIEByZXR1cm5zIHtOYW1lc3BhY2V9IFRoZSBhbWlSb3V0ZXIgc2luZ2xldG9uXG5cdCAgKi9cblxuXHRhcHBlbmQ6IGZ1bmN0aW9uKHJlZ0V4cCwgaGFuZGxlcilcblx0e1xuXHRcdHRoaXMuX3JvdXRlcy51bnNoaWZ0KHtcblx0XHRcdHJlZ0V4cDogcmVnRXhwLFxuXHRcdFx0aGFuZGxlcjogaGFuZGxlcixcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFJlbW92ZXMgc29tZSByb3V0aW5nIHJ1bGVzXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gcmVnRXhwIHRoZSByZWdFeHBcblx0ICAqIEByZXR1cm5zIHtOYW1lc3BhY2V9IFRoZSBhbWlSb3V0ZXIgc2luZ2xldG9uXG5cdCAgKi9cblxuXHRyZW1vdmU6IGZ1bmN0aW9uKHJlZ0V4cClcblx0e1xuXHRcdHRoaXMuX3JvdXRlcyA9IHRoaXMuX3JvdXRlcy5maWx0ZXIoKHJvdXRlKSA9PiB7XG5cblx0XHRcdHJldHVybiByb3V0ZS5yZWdFeHAudG9TdHJpbmcoKSAhPT0gcmVnRXhwLnRvU3RyaW5nKCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDaGVja3Mgd2hldGhlciB0aGUgVVJMIG1hdGNoZXMgd2l0aCBhIHJvdXRpbmcgcnVsZVxuXHQgICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAgKi9cblxuXHRjaGVjazogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG07XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fcm91dGVzLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdG0gPSB0aGlzLl9oYXNoLm1hdGNoKHRoaXMuX3JvdXRlc1tpXS5yZWdFeHApO1xuXG5cdFx0XHRpZihtKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLl9yb3V0ZXNbaV0uaGFuZGxlci5hcHBseShhbWlSb3V0ZXIsIG0pO1xuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBcHBlbmQgYSBuZXcgaGlzdG9yeSBlbnRyeVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggdGhlIG5ldyBwYXRoXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHQ9bnVsbF0gdGhlIG5ldyBjb250ZXh0XG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGFwcGVuZEhpc3RvcnlFbnRyeTogZnVuY3Rpb24ocGF0aCwgY29udGV4dCA9IG51bGwpXG5cdHtcblx0XHRpZihoaXN0b3J5LnB1c2hTdGF0ZSlcblx0XHR7XG5cdFx0XHRoaXN0b3J5LnB1c2hTdGF0ZShjb250ZXh0LCBudWxsLCB0aGlzLl93ZWJBcHBVUkwgKyB0aGlzLl9lYXRTbGFzaGVzKHBhdGgpKTtcblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFJlcGxhY2UgdGhlIGN1cnJlbnQgaGlzdG9yeSBlbnRyeVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggdGhlIG5ldyBwYXRoXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHQ9bnVsbF0gdGhlIG5ldyBjb250ZXh0XG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdHJlcGxhY2VIaXN0b3J5RW50cnk6IGZ1bmN0aW9uKHBhdGgsIGNvbnRleHQgPSBudWxsKVxuXHR7XG5cdFx0aWYoaGlzdG9yeS5yZXBsYWNlU3RhdGUpXG5cdFx0e1xuXHRcdFx0aGlzdG9yeS5yZXBsYWNlU3RhdGUoY29udGV4dCwgbnVsbCwgdGhpcy5fd2ViQXBwVVJMICsgdGhpcy5fZWF0U2xhc2hlcyhwYXRoKSk7XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSU5hbWVzcGFjZSgnYW1pJywge1xuXG5cdHZlcnNpb246ICcwLjAuMScsXG5cdGNvbW1pdF9pZDogJ3t7QU1JX0NPTU1JVF9JRH19Jyxcbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogSU5URVJOQUwgRlVOQ1RJT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIF9hbWlfaW50ZXJuYWxfdGhlbihkZWZlcnJlZCwgZG9uZUZ1bmMsIGZhaWxGdW5jKVxue1xuXHRpZihkZWZlcnJlZCAmJiBkZWZlcnJlZC50aGVuKVxuXHR7XG5cdFx0ZGVmZXJyZWQudGhlbihkb25lRnVuYywgZmFpbEZ1bmMpO1xuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdGRvbmVGdW5jKCk7XG5cdH1cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZnVuY3Rpb24gX2FtaV9pbnRlcm5hbF9hbHdheXMoZGVmZXJyZWQsIGFsd2F5c0Z1bmMpXG57XG5cdGlmKGRlZmVycmVkICYmIGRlZmVycmVkLmFsd2F5cylcblx0e1xuXHRcdGRlZmVycmVkLmFsd2F5cyhhbHdheXNGdW5jKTtcblx0fVxuXHRlbHNlXG5cdHtcblx0XHRhbHdheXNGdW5jKCk7XG5cdH1cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVdlYkFwcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBBTUkgd2ViYXBwIHN1YnN5c3RlbVxuICogQG5hbWVzcGFjZSBhbWlXZWJBcHBcbiAqL1xuXG4kQU1JTmFtZXNwYWNlKCdhbWlXZWJBcHAnLCAvKiogQGxlbmRzIGFtaVdlYkFwcCAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFJJVkFURSBNRU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2lkUmVnRXhwOiBuZXcgUmVnRXhwKCdbYS16QS1aXVthLXpBLVowLTldezd9X1thLXpBLVowLTldezR9X1thLXpBLVowLTldezR9X1thLXpBLVowLTldezR9X1thLXpBLVowLTldezEyfScsICdnJyksXG5cblx0X2xpbmtFeHA6IG5ldyBSZWdFeHAoJ1xcXFxbKFteXFxcXF1dKilcXFxcXVxcXFwoKFteXFxcXCldKilcXFxcKScsICdnJyksXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9lbWJlZGRlZDogZmFsc2UsXG5cdF9ub0Jvb3RzdHJhcDogZmFsc2UsXG5cdF9ub0RhdGVUaW1lUGlja2VyOiBmYWxzZSxcblx0X25vU2VsZWN0MjogZmFsc2UsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9nbG9iYWxEZWZlcnJlZDogJC5EZWZlcnJlZCgpLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfc2hlZXRzOiBbXSxcblx0X3NjcmlwdHM6IFtdLFxuXG5cdF9jb250cm9sczoge30sXG5cdF9zdWJhcHBzOiB7fSxcblxuXHRfaXNSZWFkeTogZmFsc2UsXG5cdF9jYW5MZWF2ZTogdHJ1ZSxcblx0X2xvY2tDbnQ6IDB4MDAsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9jdXJyZW50U3ViQXBwSW5zdGFuY2U6IG5ldyBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLm9uUmVhZHkgPSBmdW5jdGlvbigpIHt9O1xuXHRcdHRoaXMub25FeGl0ID0gZnVuY3Rpb24oKSB7fTtcblx0XHR0aGlzLm9uTG9naW4gPSBmdW5jdGlvbigpIHt9O1xuXHRcdHRoaXMub25Mb2dvdXQgPSBmdW5jdGlvbigpIHt9O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBUaGUgb3JpZ2luIFVSTFxuXHQgICogQHR5cGUge1N0cmluZ31cblx0ICAqL1xuXG5cdG9yaWdpblVSTDogJy8nLFxuXG5cdC8qKlxuXHQgICogVGhlIHdlYmFwcCBVUkxcblx0ICAqIEB0eXBlIHtTdHJpbmd9XG5cdCAgKi9cblxuXHR3ZWJBcHBVUkw6ICcvJyxcblxuXHQvKipcblx0ICAqIFRoZSBhbmNob3IgcGFydCBvZiB0aGUgd2ViYXBwIFVSTFxuXHQgICogQHR5cGUge1N0cmluZ31cblx0ICAqL1xuXG5cdGhhc2g6ICcnLFxuXG5cdC8qKlxuXHQgICogVGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFxuXHQgICogQHR5cGUge0FycmF5PFN0cmluZz59XG5cdCAgKi9cblxuXHRhcmdzOiB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNUQVRJQyBDT05TVFJVQ1RPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEdFVCBGTEFHUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdXJsID0gYW1pUm91dGVyLmdldFNjcmlwdFVSTCgpO1xuXG5cdFx0Y29uc3QgaWR4ID0gdXJsLmluZGV4T2YoJz8nKTtcblxuXHRcdGlmKGlkeCA+IDApXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgZmxhZ3MgPSB1cmwuc3Vic3RyaW5nKGlkeCkudG9Mb3dlckNhc2UoKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0dGhpcy5fZW1iZWRkZWQgPSAoZmxhZ3MuaW5kZXhPZignZW1iZWRkZWQnKSA+PSAwKTtcblxuXHRcdFx0dGhpcy5fbm9Cb290c3RyYXAgPSAoZmxhZ3MuaW5kZXhPZignbm9ib290c3RyYXAnKSA+PSAwKTtcblxuXHRcdFx0dGhpcy5fbm9EYXRlVGltZVBpY2tlciA9IChmbGFncy5pbmRleE9mKCdub2RhdGV0aW1lcGlja2VyJykgPj0gMCk7XG5cblx0XHRcdHRoaXMuX25vU2VsZWN0MiA9IChmbGFncy5pbmRleE9mKCdub3NlbGVjdDInKSA+PSAwKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBHRVQgVVJMUywgSEFTSCBBTkQgQVJHUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMub3JpZ2luVVJMID0gYW1pUm91dGVyLmdldE9yaWdpblVSTCgpO1xuXHRcdHRoaXMud2ViQXBwVVJMID0gYW1pUm91dGVyLmdldFdlYkFwcFVSTCgpO1xuXG5cdFx0dGhpcy5oYXNoID0gYW1pUm91dGVyLmdldEhhc2goKTtcblx0XHR0aGlzLmFyZ3MgPSBhbWlSb3V0ZXIuZ2V0QXJncygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTE9BRCBTSEVFVFMgQU5EIFNDUklQVFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCByZXNvdXJjZXNDU1MgPSBbXTtcblx0XHRjb25zdCByZXNvdXJjZXNKUyA9IFtdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighd2luZG93LlBvcHBlcikge1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvcG9wcGVyLm1pbi5qcycpO1xuXHRcdH1cblxuXHRcdGlmKCF3aW5kb3cubW9tZW50KSB7XG5cdFx0XHRyZXNvdXJjZXNKUy5wdXNoKHRoaXMub3JpZ2luVVJMICsgJy9qcy9tb21lbnQubWluLmpzJyk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighdGhpcy5fbm9Cb290c3RyYXAgJiYgKHR5cGVvZiBqUXVlcnkuZm4ubW9kYWwpICE9PSAnZnVuY3Rpb24nKVxuXHRcdHtcblx0XHRcdHJlc291cmNlc0NTUy5wdXNoKHRoaXMub3JpZ2luVVJMICsgJy9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnKTtcblx0XHRcdHJlc291cmNlc0pTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2pzL2Jvb3RzdHJhcC5taW4uanMnKTtcblx0XHR9XG5cblx0XHRpZighdGhpcy5fbm9EYXRlVGltZVBpY2tlciAmJiAodHlwZW9mIGpRdWVyeS5mbi5kYXRldGltZXBpY2tlcikgIT09ICdmdW5jdGlvbicpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzQ1NTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXIubWluLmNzcycpO1xuXHRcdFx0cmVzb3VyY2VzSlMucHVzaCh0aGlzLm9yaWdpblVSTCArICcvanMvYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyLm1pbi5qcycpO1xuXHRcdH1cblxuXHRcdGlmKCF0aGlzLl9ub1NlbGVjdDIgJiYgKHR5cGVvZiBqUXVlcnkuZm4uc2VsZWN0MikgIT09ICdmdW5jdGlvbicpXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VzQ1NTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9zZWxlY3QyLm1pbi5jc3MnKTtcblx0XHRcdHJlc291cmNlc0pTLnB1c2godGhpcy5vcmlnaW5VUkwgKyAnL2pzL3NlbGVjdDIubWluLmpzJyk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0Li4ucmVzb3VyY2VzQ1NTLFxuXHRcdFx0dGhpcy5vcmlnaW5VUkwgKyAnL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzcycsXG5cdFx0XHR0aGlzLm9yaWdpblVSTCArICcvY3NzL2FtaS5taW4uY3NzJyxcblx0XHRcdC4uLnJlc291cmNlc0pTLFxuXHRcdF0pLmRvbmUoKC8qLS0tKi8pID0+IHtcblxuXHRcdFx0dGhpcy5fZ2xvYmFsRGVmZXJyZWQucmVzb2x2ZSgvKi0tLSovKTtcblxuXHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZ2xvYmFsRGVmZXJyZWQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBNT0RFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENoZWNrcyB3aGV0aGVyIHRoZSBXZWJBcHAgaXMgZXhlY3V0ZWQgaW4gZW1iZWRkZWQgbW9kZVxuXHQgICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAgKi9cblxuXHRpc0VtYmVkZGVkOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZW1iZWRkZWQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hlY2tzIHdoZXRoZXIgdGhlIFdlYkFwcCBpcyBleGVjdXRlZCBsb2NhbGx5IChmaWxlOi8vLCBsb2NhbGhvc3QsIDEyNy4wLjAuMSBvciA6OjEpXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGlzTG9jYWw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gKCgnZmlsZTonKSlcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUgPT09ICdsb2NhbGhvc3QnXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnMTI3LjAuMC4xJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gKCgoJzo6MScpKSlcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBUT09MUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0eXBlT2Y6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCBuYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuIG5hbWUuc3RhcnRzV2l0aCgnW29iamVjdCAnKSA/IG5hbWUuc3Vic3RyaW5nKDgsIG5hbWUubGVuZ3RoIC0gMSlcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGFzQXJyYXk6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50eXBlT2YoeCkgPT09ICdBcnJheScgPyAoeClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbeF1cblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldHVwOiBmdW5jdGlvbihvcHRpb25OYW1lcywgb3B0aW9uRGVmYXVsdHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGwgPSBvcHRpb25OYW1lcy5sZW5ndGg7XG5cdFx0Y29uc3QgbSA9IG9wdGlvbkRlZmF1bHRzLmxlbmd0aDtcblxuXHRcdGlmKGwgIT09IG0pXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHNldHRpbmdzKSB7XG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKG9wdGlvbk5hbWVzW2ldIGluIHNldHRpbmdzID8gc2V0dGluZ3Nbb3B0aW9uTmFtZXNbaV1dIDogb3B0aW9uRGVmYXVsdHNbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcblx0XHRcdFx0cmVzdWx0LnB1c2goLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyBvcHRpb25EZWZhdWx0c1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZXBsYWNlOiBhbWlUd2lnLnN0ZGxpYi5fcmVwbGFjZSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3RleHRUb0h0bWxYOiBbJyYnICAgICwgJ1wiJyAgICAgLCAnPCcgICAsICc+JyAgIF0sXG5cdF90ZXh0VG9IdG1sWTogWycmYW1wOycsICcmcXVvdDsnLCAnJmx0OycsICcmZ3Q7J10sXG5cblx0LyoqXG5cdCAgKiBFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIEhUTUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0dGV4dFRvSHRtbDogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5fdGV4dFRvSHRtbFgsIHRoaXMuX3RleHRUb0h0bWxZKTtcblx0fSxcblxuXHQvKipcblx0ICAqIFVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSFRNTCB0byB0ZXh0XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGh0bWxUb1RleHQ6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKHMgfHwgJycsIHRoaXMuX3RleHRUb0h0bWxZLCB0aGlzLl90ZXh0VG9IdG1sWCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF90ZXh0VG9TdHJpbmdYOiBbJ1xcXFwnICAsICdcXG4nICwgJ1wiJyAgLCAnXFwnJyAgXSxcblx0X3RleHRUb1N0cmluZ1k6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXFwiJywgJ1xcXFxcXCcnXSxcblxuXHQvKipcblx0ICAqIEVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIHRleHQgdG8gSmF2YVNjcmlwdCBzdHJpbmdcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0dGV4dFRvU3RyaW5nOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TdHJpbmdYLCB0aGlzLl90ZXh0VG9TdHJpbmdZKTtcblx0fSxcblxuXHQvKipcblx0ICAqIFVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSmF2YVNjcmlwdCBzdHJpbmcgdG8gdGV4dFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyB0aGUgZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSB1bmVzY2FwZWQgc3RyaW5nXG5cdCAgKi9cblxuXHRzdHJpbmdUb1RleHQ6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKHMgfHwgJycsIHRoaXMuX3RleHRUb1N0cmluZ1ksIHRoaXMuX3RleHRUb1N0cmluZ1gpO1xuXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9odG1sVG9TdHJpbmdYOiBbJ1xcXFwnICAsICdcXG4nICwgJyZxdW90OycgICwgJ1xcJycgIF0sXG5cdF9odG1sVG9TdHJpbmdZOiBbJ1xcXFxcXFxcJywgJ1xcXFxuJywgJ1xcXFwmcXVvdDsnLCAnXFxcXFxcJyddLFxuXG5cdC8qKlxuXHQgICogRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSFRNTCB0byBKYXZhU2NyaXB0IHN0cmluZ1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyB0aGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKi9cblxuXHRodG1sVG9TdHJpbmc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKHMgfHwgJycsIHRoaXMuX2h0bWxUb1N0cmluZ1gsIHRoaXMuX2h0bWxUb1N0cmluZ1kpO1xuXHR9LFxuXG5cdC8qKlxuXHQgICogVW5lc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBKYXZhU2NyaXB0IHN0cmluZyB0byBIVE1MXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqL1xuXG5cdHN0cmluZ1RvSHRtbDogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UocyB8fCAnJywgdGhpcy5faHRtbFRvU3RyaW5nWSwgdGhpcy5faHRtbFRvU3RyaW5nWCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF90ZXh0VG9TUUxYOiBbJ1xcJycgIF0sXG5cdF90ZXh0VG9TUUxZOiBbJ1xcJ1xcJyddLFxuXG5cdC8qKlxuXHQgICogRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gdGV4dCB0byBTUUxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIHVuZXNjYXBlZCBzdHJpbmdcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBlc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0dGV4dFRvU1FMOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TUUxYLCB0aGlzLl90ZXh0VG9TUUxZKTtcblx0fSxcblxuXHQvKipcblx0ICAqIFVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gU1FMIHRvIHRleHRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGVzY2FwZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdW5lc2NhcGVkIHN0cmluZ1xuXHQgICovXG5cblx0c3FsVG9UZXh0OiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZShzIHx8ICcnLCB0aGlzLl90ZXh0VG9TUUxZLCB0aGlzLl90ZXh0VG9TUUxYKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIEJBU0U2NCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9iYXNlNjQ6ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OS1fJyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBFbmNvZGVzIChSRkMgNDY0OCkgYSBzdHJpbmdcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgdGhlIGRlY29kZWQgc3RyaW5nXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZW5jb2RlZCBzdHJpbmdcblx0ICAqL1xuXG5cdGJhc2U2NEVuY29kZTogZnVuY3Rpb24ocylcblx0e1xuXHRcdGxldCB3O1xuXG5cdFx0Y29uc3QgZSA9IFtdO1xuXG5cdFx0Y29uc3QgbCA9IHMubGVuZ3RoLCBtID0gbCAlIDM7XG5cblx0XHRjb25zdCB0aGlzX2Jhc2U2NCA9IHRoaXMuX2Jhc2U2NDtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOylcblx0XHR7XG5cdFx0XHR3ID0gcy5jaGFyQ29kZUF0KGkrKykgPDwgMTZcblx0XHRcdCAgICB8XG5cdFx0XHQgICAgcy5jaGFyQ29kZUF0KGkrKykgPDwgOFxuXHRcdFx0ICAgIHxcblx0XHRcdCAgICBzLmNoYXJDb2RlQXQoaSsrKSA8PCAwXG5cdFx0XHQ7XG5cblx0XHRcdGUucHVzaCh0aGlzX2Jhc2U2NC5jaGFyQXQoKHcgPj4gMTgpICYgMHgzRikpO1xuXHRcdFx0ZS5wdXNoKHRoaXNfYmFzZTY0LmNoYXJBdCgodyA+PiAxMikgJiAweDNGKSk7XG5cdFx0XHRlLnB1c2godGhpc19iYXNlNjQuY2hhckF0KCh3ID4+IDYpICYgMHgzRikpO1xuXHRcdFx0ZS5wdXNoKHRoaXNfYmFzZTY0LmNoYXJBdCgodyA+PiAwKSAmIDB4M0YpKTtcblx0XHR9XG5cblx0XHQvKiovIGlmKG0gPT09IDEpIHtcblx0XHRcdGUuc3BsaWNlKC0yLCAyKTtcblx0XHR9XG5cdFx0ZWxzZSBpZihtID09PSAyKSB7XG5cdFx0XHRlLnNwbGljZSgtMSwgMSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGUuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRGVjb2RlcyAoUkZDIDQ2NDgpIGEgc3RyaW5nXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIHRoZSBlbmNvZGVkIHN0cmluZ1xuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGRlY29kZWQgc3RyaW5nXG5cdCAgKi9cblxuXHRiYXNlNjREZWNvZGU6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRsZXQgdztcblxuXHRcdGNvbnN0IGUgPSBbXTtcblxuXHRcdGNvbnN0IGwgPSBzLmxlbmd0aCwgbSA9IGwgJSA0O1xuXG5cdFx0Y29uc3QgdGhpc19iYXNlNjQgPSB0aGlzLl9iYXNlNjQ7XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDspXG5cdFx0e1xuXHRcdFx0dyA9IHRoaXNfYmFzZTY0LmluZGV4T2Yocy5jaGFyQXQoaSsrKSkgPDwgMThcblx0XHRcdCAgICB8XG5cdFx0XHQgICAgdGhpc19iYXNlNjQuaW5kZXhPZihzLmNoYXJBdChpKyspKSA8PCAxMlxuXHRcdFx0ICAgIHxcblx0XHRcdCAgICB0aGlzX2Jhc2U2NC5pbmRleE9mKHMuY2hhckF0KGkrKykpIDw8IDZcblx0XHRcdCAgICB8XG5cdFx0XHQgICAgdGhpc19iYXNlNjQuaW5kZXhPZihzLmNoYXJBdChpKyspKSA8PCAwXG5cdFx0XHQ7XG5cblx0XHRcdGUucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh3ID4+PiAxNikgJiAweEZGKSk7XG5cdFx0XHRlLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgodyA+Pj4gOCkgJiAweEZGKSk7XG5cdFx0XHRlLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgodyA+Pj4gMCkgJiAweEZGKSk7XG5cdFx0fVxuXG5cdFx0LyoqLyBpZihtID09PSAyKSB7XG5cdFx0XHRlLnNwbGljZSgtMiwgMik7XG5cdFx0fVxuXHRcdGVsc2UgaWYobSA9PT0gMykge1xuXHRcdFx0ZS5zcGxpY2UoLTEsIDEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBlLmpvaW4oJycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogRFlOQU1JQyBSRVNPVVJDRSBMT0FESU5HICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2dldEV4dGVuc2lvbjogZnVuY3Rpb24odXJsKVxuXHR7XG5cdFx0Y29uc3QgaWR4ID0gdXJsLmxhc3RJbmRleE9mKCcuJyk7XG5cblx0XHRyZXR1cm4gaWR4ID4gMCA/IHVybC5zdWJzdHJpbmcoaWR4KSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZ2V0RGF0YVR5cGU6IGZ1bmN0aW9uKHVybCwgZGF0YVR5cGUpXG5cdHtcblx0XHRsZXQgcmVzdWx0O1xuXG5cdFx0aWYoZGF0YVR5cGUgPT09ICdhdXRvJylcblx0XHR7XG5cdFx0XHQvKiovIGlmKHVybC5pbmRleE9mKCdjdHJsOicpID09PSAwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSAnY29udHJvbCc7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmKHVybC5pbmRleE9mKCdzdWJhcHA6JykgPT09IDApXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdCA9ICdzdWJhcHAnO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRzd2l0Y2godGhpcy5fZ2V0RXh0ZW5zaW9uKHVybCkudG9Mb3dlckNhc2UoKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNhc2UgJy5jc3MnOlxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gJ3NoZWV0Jztcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAnLmpzJzpcblx0XHRcdFx0XHRcdHJlc3VsdCA9ICdzY3JpcHQnO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICcuanNvbic6XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAnanNvbic7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJy54bWwnOlxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gJ3htbCc7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAndGV4dCc7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0ID0gZGF0YVR5cGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X19sb2FkWFhYOiBmdW5jdGlvbihkZWZlcnJlZCwgcmVzdWx0LCB1cmxzLCBkYXRhVHlwZSwgY29udGV4dClcblx0e1xuXHRcdGlmKHVybHMubGVuZ3RoID09PSAwKVxuXHRcdHtcblx0XHRcdHJldHVybiBkZWZlcnJlZC5yZXNvbHZlV2l0aChjb250ZXh0LCBbcmVzdWx0XSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1cmwgPSB1cmxzLnNoaWZ0KCkudHJpbSgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkYXRhVFlQRSA9IHRoaXMuX2dldERhdGFUeXBlKHVybCwgZGF0YVR5cGUpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRzd2l0Y2goZGF0YVRZUEUpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIENPTlRST0wgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdjb250cm9sJzpcblxuXHRcdFx0XHR0aGlzLmxvYWRDb250cm9sKHVybCkudGhlbigoZGF0YSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goZGF0YSk7XG5cblx0XHRcdFx0XHR0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgcmVzdWx0LCB1cmxzLCBkYXRhVHlwZSwgY29udGV4dCk7XG5cblx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTVUJBUFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnc3ViYXBwJzpcblxuXHRcdFx0XHR0aGlzLmxvYWRTdWJBcHAodXJsKS50aGVuKChkYXRhKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucHVzaChkYXRhKTtcblxuXHRcdFx0XHRcdHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNIRUVUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdzaGVldCc6XG5cblx0XHRcdFx0aWYodGhpcy5fc2hlZXRzLmluZGV4T2YodXJsKSA+PSAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goZmFsc2UpO1xuXG5cdFx0XHRcdFx0dGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0XHR1cmw6IHVybCxcblx0XHRcdFx0XHRcdGFzeW5jOiBmYWxzZSxcblx0XHRcdFx0XHRcdGNhY2hlOiBmYWxzZSxcblx0XHRcdFx0XHRcdGNyb3NzRG9tYWluOiB0cnVlLFxuXHRcdFx0XHRcdFx0ZGF0YVR5cGU6IGRhdGFUWVBFLFxuXHRcdFx0XHRcdH0pLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaCh0cnVlKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5fc2hlZXRzLnB1c2godXJsKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0XHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgYCcgKyB1cmwgKyAnYCddKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU0NSSVBUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ3NjcmlwdCc6XG5cblx0XHRcdFx0aWYodGhpcy5fc2NyaXB0cy5pbmRleE9mKHVybCkgPj0gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGZhbHNlKTtcblxuXHRcdFx0XHRcdHRoaXMuX19sb2FkWFhYKGRlZmVycmVkLCByZXN1bHQsIHVybHMsIGRhdGFUeXBlLCBjb250ZXh0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRcdFx0XHRhc3luYzogZmFsc2UsXG5cdFx0XHRcdFx0XHRjYWNoZTogZmFsc2UsXG5cdFx0XHRcdFx0XHRjcm9zc0RvbWFpbjogdHJ1ZSxcblx0XHRcdFx0XHRcdGRhdGFUeXBlOiBkYXRhVFlQRSxcblx0XHRcdFx0XHR9KS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnB1c2godHJ1ZSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuX3NjcmlwdHMucHVzaCh1cmwpO1xuXG5cdFx0XHRcdFx0XHR0aGlzLl9fbG9hZFhYWChkZWZlcnJlZCwgcmVzdWx0LCB1cmxzLCBkYXRhVHlwZSwgY29udGV4dCk7XG5cblx0XHRcdFx0XHR9LCAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBgJyArIHVybCArICdgJ10pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBPVEhFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdHVybDogdXJsLFxuXHRcdFx0XHRcdGFzeW5jOiB0cnVlLFxuXHRcdFx0XHRcdGNhY2hlOiBmYWxzZSxcblx0XHRcdFx0XHRjcm9zc0RvbWFpbjogdHJ1ZSxcblx0XHRcdFx0XHRkYXRhVHlwZTogZGF0YVRZUEUsXG5cdFx0XHRcdH0pLnRoZW4oKGRhdGEpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGRhdGEpO1xuXG5cdFx0XHRcdFx0dGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIHJlc3VsdCwgdXJscywgZGF0YVR5cGUsIGNvbnRleHQpO1xuXG5cdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBgJyArIHVybCArICdgJ10pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2xvYWRYWFg6IGZ1bmN0aW9uKHVybHMsIGRhdGFUeXBlLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W2RlZmVycmVkXSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5fX2xvYWRYWFgoZGVmZXJyZWQsIFtdLCB0aGlzLmFzQXJyYXkodXJscyksIGRhdGFUeXBlLCBjb250ZXh0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyByZXNvdXJjZXMgYnkgZXh0ZW5zaW9uXG5cdCAgKiBAcGFyYW0geyhBcnJheXxTdHJpbmcpfSB1cmxzIHRoZSBhcnJheSBvZiB1cmxzXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZFJlc291cmNlczogZnVuY3Rpb24odXJscywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbG9hZFhYWCh1cmxzLCAnYXV0bycsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyBDU1Mgc2hlZXRzXG5cdCAgKiBAcGFyYW0geyhBcnJheXxTdHJpbmcpfSB1cmxzIHRoZSBhcnJheSBvZiB1cmxzXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZFNoZWV0czogZnVuY3Rpb24odXJscywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbG9hZFhYWCh1cmxzLCAnc2hlZXQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgSlMgc2NyaXB0c1xuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRTY3JpcHRzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICdzY3JpcHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgSlNPTiBmaWxlc1xuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRKU09OczogZnVuY3Rpb24odXJscywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbG9hZFhYWCh1cmxzLCAnanNvbicsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyBYTUwgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkWE1MczogZnVuY3Rpb24odXJscywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbG9hZFhYWCh1cmxzLCAneG1sJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIEhUTUwgZmlsZXNcblx0ICAqIEBwYXJhbSB7KEFycmF5fFN0cmluZyl9IHVybHMgdGhlIGFycmF5IG9mIHVybHNcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkSFRNTHM6IGZ1bmN0aW9uKHVybHMsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRYWFgodXJscywgJ3RleHQnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgVFdJRyBmaWxlc1xuXHQgICogQHBhcmFtIHsoQXJyYXl8U3RyaW5nKX0gdXJscyB0aGUgYXJyYXkgb2YgdXJsc1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRUV0lHczogZnVuY3Rpb24odXJscywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbG9hZFhYWCh1cmxzLCAndGV4dCcsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBsb2FkcyB0ZXh0IGZpbGVzXG5cdCAgKiBAcGFyYW0geyhBcnJheXxTdHJpbmcpfSB1cmxzIHRoZSBhcnJheSBvZiB1cmxzXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0bG9hZFRleHRzOiBmdW5jdGlvbih1cmxzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkWFhYKHVybHMsICd0ZXh0Jywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSFRNTCBDT05URU5UICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3h4eEhUTUw6IGZ1bmN0aW9uKHNlbGVjdG9yLCB0d2lnLCBtb2RlLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0LCBzdWZmaXgsIGRpY3RdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCcsICdzdWZmaXgnLCAnZGljdCddLFxuXHRcdFx0W3Jlc3VsdCwgbnVsbCwgbnVsbF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHN1ZmZpeClcblx0XHR7XG5cdFx0XHR0d2lnID0gdHdpZy5yZXBsYWNlKHRoaXMuX2lkUmVnRXhwLCBmdW5jdGlvbihpZCkge1xuXG5cdFx0XHRcdHJldHVybiBpZCArICdfaW5zdGFuY2UnICsgc3VmZml4O1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgaHRtbCA9IHRoaXMuZm9ybWF0VFdJRyh0d2lnLCBkaWN0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHByb21pc2U7XG5cblx0XHRsZXQgZWwgPSAkKHNlbGVjdG9yKTtcblxuXHRcdHN3aXRjaChtb2RlKVxuXHRcdHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0cHJvbWlzZSA9IGVsLmh0bWwoaHRtbCkucHJvbWlzZSgpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRwcm9taXNlID0gZWwucHJlcGVuZChodG1sKS5wcm9taXNlKCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdHByb21pc2UgPSBlbC5hcHBlbmQoaHRtbCkucHJvbWlzZSgpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRwcm9taXNlID0gZWwucmVwbGFjZVdpdGgoZWwuaXMoJ1tpZF0nKSA/IGh0bWwucmVwbGFjZSgvXlxccyooPFthLXpBLVpfLV0rKS8sICckMSBpZD1cIicgKyBlbC5hdHRyKCdpZCcpICsgJ1wiJykgOiBodG1sKS5wcm9taXNlKCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cHJvbWlzZS5kb25lKCgpID0+IHtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGV0IGVsID0gJChzZWxlY3Rvcik7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IF9maW5kID0gbW9kZSA9PT0gMyA/IChfc2VsZWN0b3IpID0+IGVsLmZpbmRXaXRoU2VsZihfc2VsZWN0b3IpXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgOiAoX3NlbGVjdG9yKSA9PiBlbC4gICAgZmluZCAgICAoX3NlbGVjdG9yKVxuXHRcdFx0O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihqUXVlcnkuZm4udG9vbHRpcClcblx0XHRcdHtcblx0XHRcdFx0X2ZpbmQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKHtcblx0XHRcdFx0XHRodG1sOiBmYWxzZSxcblx0XHRcdFx0XHRkZWxheToge1xuXHRcdFx0XHRcdFx0c2hvdzogNTAwLFxuXHRcdFx0XHRcdFx0aGlkZTogMTAwLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihqUXVlcnkuZm4ucG9wb3Zlcilcblx0XHRcdHtcblx0XHRcdFx0X2ZpbmQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5wb3BvdmVyKHtcblx0XHRcdFx0XHRodG1sOiB0cnVlLFxuXHRcdFx0XHRcdGRlbGF5OiB7XG5cdFx0XHRcdFx0XHRzaG93OiA1MDAsXG5cdFx0XHRcdFx0XHRoaWRlOiAxMDAsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKGpRdWVyeS5mbi5kYXRldGltZXBpY2tlcilcblx0XHRcdHtcblx0XHRcdFx0X2ZpbmQoJy5mb3JtLWRhdGV0aW1lJykuZGF0ZXRpbWVwaWNrZXIoe1xuXHRcdFx0XHRcdGZvcm1hdDogJ1lZWVktTU0tREQgSEg6bW06c3MuU1NTU1NTJ1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRfZmluZCgnLmZvcm0tZGF0ZScpLmRhdGV0aW1lcGlja2VyKHtcblx0XHRcdFx0XHRmb3JtYXQ6ICdZWVlZLU1NLUREJ1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRfZmluZCgnLmZvcm0tdGltZScpLmRhdGV0aW1lcGlja2VyKHtcblx0XHRcdFx0XHRmb3JtYXQ6ICdISDptbTpzcydcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZWxdKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUHV0cyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgdGhlIHRhcmdldCBzZWxlY3RvclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgZnJhZ21lbnRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRyZXBsYWNlSFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3h4eEhUTUwoc2VsZWN0b3IsIHR3aWcsIDAsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBQcmVwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgdGhlIHRhcmdldCBzZWxlY3RvclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgZnJhZ21lbnRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRwcmVwZW5kSFRNTDogZnVuY3Rpb24oc2VsZWN0b3IsIHR3aWcsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3h4eEhUTUwoc2VsZWN0b3IsIHR3aWcsIDEsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBcHBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGFwcGVuZEhUTUw6IGZ1bmN0aW9uKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLl94eHhIVE1MKHNlbGVjdG9yLCB0d2lnLCAyLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogSW50ZXJwcmV0ZXMgdGhlIGdpdmVuIFRXSUcgc3RyaW5nLCBzZWUge0BsaW5rIGh0dHA6Ly90d2lnLnNlbnNpb2xhYnMub3JnL2RvY3VtZW50YXRpb259XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBzdHJpbmdcblx0ICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBbZGljdF0gdGhlIGRpY3Rpb25hcnlcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBJbnRlcnByZXRlZCBUV0lHIHN0cmluZ1xuXHQgICovXG5cblx0Zm9ybWF0VFdJRzogZnVuY3Rpb24odHdpZywgZGljdClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCByZW5kZXIgPSAodHdpZywgZGljdCkgPT4ge1xuXG5cdFx0XHRpZih0aGlzLnR5cGVPZihkaWN0KSAhPT0gJ09iamVjdCcpXG5cdFx0XHR7XG5cdFx0XHRcdGRpY3QgPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0ZGljdFsnT1JJR0lOX1VSTCddID0gdGhpcy5vcmlnaW5VUkw7XG5cdFx0XHRkaWN0WydXRUJBUFBfVVJMJ10gPSB0aGlzLndlYkFwcFVSTDtcblxuXHRcdFx0cmV0dXJuIGFtaVR3aWcuZW5naW5lLnJlbmRlcih0d2lnLCBkaWN0KTtcblx0XHR9O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0cnlcblx0XHR7XG5cdFx0XHRpZih0aGlzLnR5cGVPZihkaWN0KSA9PT0gJ0FycmF5Jylcblx0XHRcdHtcblx0XHRcdFx0ZGljdC5mb3JFYWNoKChESUNUKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucHVzaChyZW5kZXIodHdpZywgRElDVCkpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0LnB1c2gocmVuZGVyKHR3aWcsIGRpY3QpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Y2F0Y2goZXJyb3IpXG5cdFx0e1xuXHRcdFx0cmVzdWx0Lmxlbmd0aCA9IDA7XG5cblx0XHRcdHRoaXMuZXJyb3IoJ1RXSUcgcGFyc2luZyBlcnJvcjogJyArIGVycm9yLm1lc3NhZ2UpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIEpTUEFUSCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRmluZHMgZGF0YSB3aXRoaW4gdGhlIGdpdmVuIEpTT04sIHNlZSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2RmaWxhdG92L2pzcGF0aH1cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIHRoZSBwYXRoXG5cdCAgKiBAcGFyYW0ge09iamVjdH0ganNvbiB0aGUgSlNPTlxuXHQgICogQHJldHVybnMge0FycmF5fSBUaGUgcmVzdWx0aW5nIGFycmF5XG5cdCAgKi9cblxuXHRqc3BhdGg6IGZ1bmN0aW9uKHBhdGgsIGpzb24pXG5cdHtcblx0XHRyZXR1cm4gSlNQYXRoLmFwcGx5KHBhdGgsIGpzb24pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogU1RBQ0sgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0U3RhY2s6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRyeVxuXHRcdHtcblx0XHRcdHRocm93IEVycm9yKCk7XG5cdFx0fVxuXHRcdGNhdGNoKGUxKVxuXHRcdHtcblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gZTEuc3RhY2s7XG5cdFx0XHR9XG5cdFx0XHRjYXRjaChlMilcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuICgoKCcnKSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIExPQ0sgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogTG9ja3MgdGhlIFdlYiBhcHBsaWNhdGlvblxuXHQgICovXG5cblx0bG9jazogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxpbmVzID0gdGhpcy5nZXRTdGFjaygpLnNwbGl0KCdcXG4nKTtcblxuXHRcdGlmKGxpbmVzLmxlbmd0aCA+IDIpXG5cdFx0e1xuXHRcdFx0Y29uc29sZS5sb2coJ2xvY2tbJyArIHRoaXMuX2xvY2tDbnQgKyAnXSA6OiAnICsgbGluZXNbMl0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblx0XHR9XG5cblx0XHQvKiovXG5cblx0XHRpZih0aGlzLl9sb2NrQ250IDw9IDApXG5cdFx0e1xuXHRcdFx0JCgnI2FtaV9sb2NrZXInKS5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xuXG5cdFx0XHR0aGlzLl9sb2NrQ250ID0gMTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRoaXMuX2xvY2tDbnQrKztcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogVW5sb2NrcyB0aGUgV2ViIGFwcGxpY2F0aW9uXG5cdCAgKi9cblxuXHR1bmxvY2s6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKHRoaXMuX2xvY2tDbnQgPD0gMSlcblx0XHR7XG5cdFx0XHQkKCcjYW1pX2xvY2tlcicpLmNzcygnZGlzcGxheScsICdub25lJyk7XG5cblx0XHRcdHRoaXMuX2xvY2tDbnQgPSAwO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhpcy5fbG9ja0NudC0tO1xuXHRcdH1cblxuXHRcdC8qKi9cblxuXHRcdGxldCBsaW5lcyA9IHRoaXMuZ2V0U3RhY2soKS5zcGxpdCgnXFxuJyk7XG5cblx0XHRpZihsaW5lcy5sZW5ndGggPiAyKVxuXHRcdHtcblx0XHRcdGNvbnNvbGUubG9nKCd1bmxvY2tbJyArIHRoaXMuX2xvY2tDbnQgKyAnXSA6OiAnICsgbGluZXNbMl0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRW5hYmxlcyB0aGUgbWVzc2FnZSBpbiBhIGNvbmZpcm1hdGlvbiBkaWFsb2cgYm94IHRvIGluZm9ybSB0aGF0IHRoZSB1c2VyIGlzIGFib3V0IHRvIGxlYXZlIHRoZSBjdXJyZW50IHBhZ2UuXG5cdCAgKi9cblxuXHRjYW5MZWF2ZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2FuTGVhdmUgPSB0cnVlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIERpc2FibGVzIHRoZSBtZXNzYWdlIGluIGEgY29uZmlybWF0aW9uIGRpYWxvZyBib3ggdG8gaW5mb3JtIHRoYXQgdGhlIHVzZXIgaXMgYWJvdXQgdG8gbGVhdmUgdGhlIGN1cnJlbnQgcGFnZS5cblx0ICAqL1xuXG5cdGNhbm5vdExlYXZlOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jYW5MZWF2ZSA9IGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogTUVTU0FHRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3B1Ymxpc2hBbGVydDogZnVuY3Rpb24oY2xhenosIHRpdGxlLCBtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zb2xlLmxvZygnQU1JICcgKyB0aXRsZS50b1VwcGVyQ2FzZSgpICsgJzogJyArIG1lc3NhZ2UgKyAnXFxuJyArIHRoaXMuZ2V0U3RhY2soKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBodG1sID0gJzxkaXYgY2xhc3M9XCJ0b2FzdFwiIHJvbGU9XCJhbGVydFwiICcgKyAoZmFkZU91dCA/ICdkYXRhLWRlbGF5PVwiNjAwMDBcIicgOiAnZGF0YS1hdXRvaGlkZT1cImZhbHNlXCInKSArICc+PGRpdiBjbGFzcz1cInRvYXN0LWhlYWRlclwiPjxzdHJvbmcgY2xhc3M9XCJtci1hdXRvICcgKyBjbGF6eiArICdcIj4nICsgdGl0bGUgKyAnPC9zdHJvbmc+PHNtYWxsPicgKyB0aGlzLnRleHRUb0h0bWwod2luZG93Lm1vbWVudCgpLmZvcm1hdCgnREQgTU1NLCBISDptbTpzcycpKSArICc8L3NtYWxsPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWwtMiBtYi0xIGNsb3NlXCIgZGF0YS1kaXNtaXNzPVwidG9hc3RcIj48c3Bhbj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPjwvZGl2PjxkaXYgY2xhc3M9XCJ0b2FzdC1ib2R5XCI+JyArIHRoaXMudGV4dFRvSHRtbChtZXNzYWdlKSArICc8L2Rpdj48L2Rpdj4nO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBlbCA9ICQoJyNhbWlfYWxlcnRfY29udGVudCcpO1xuXG5cdFx0ZWwuYXBwZW5kKGh0bWwucmVwbGFjZSh0aGlzLl9saW5rRXhwLCAnPGEgaHJlZj1cIiQxXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JDI8L2E+JykpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0ZWwuZmluZCgnLnRvYXN0Omxhc3QtY2hpbGQnKS50b2FzdCgnc2hvdycpO1xuXG5cdFx0XHQkKGRvY3VtZW50KS5zY3JvbGxUb3AoMCk7XG5cblx0XHRcdHRoaXMudW5sb2NrKCk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBTaG93cyBhbiAnaW5mbycgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IG1lc3NhZ2UgdGhlIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZhZGVPdXQ9ZmFsc2VdIGlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXG5cdCAgKi9cblxuXHRpbmZvOiBmdW5jdGlvbihtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0aWYodGhpcy50eXBlT2YobWVzc2FnZSkgPT09ICdBcnJheScpXG5cdFx0e1xuXHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2Uuam9pbignLiAnKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wdWJsaXNoQWxlcnQoJ3RleHQtaW5mbycsICdJbmZvJywgbWVzc2FnZSwgZmFkZU91dCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU2hvd3MgYSAnc3VjY2VzcycgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IG1lc3NhZ2UgdGhlIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZhZGVPdXQ9ZmFsc2VdIGlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXG5cdCAgKi9cblxuXHRzdWNjZXNzOiBmdW5jdGlvbihtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0aWYodGhpcy50eXBlT2YobWVzc2FnZSkgPT09ICdBcnJheScpXG5cdFx0e1xuXHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2Uuam9pbignLiAnKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wdWJsaXNoQWxlcnQoJ3RleHQtc3VjY2VzcycsICdTdWNjZXNzJywgbWVzc2FnZSwgZmFkZU91dCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU2hvd3MgYSAnd2FybmluZycgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IG1lc3NhZ2UgdGhlIG1lc3NhZ2Vcblx0ICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZhZGVPdXQ9ZmFsc2VdIGlmIFRydWUsIHRoZSBtZXNzYWdlIGRpc2FwcGVhcnMgYWZ0ZXIgNjBzXG5cdCAgKi9cblxuXHR3YXJuaW5nOiBmdW5jdGlvbihtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0aWYodGhpcy50eXBlT2YobWVzc2FnZSkgPT09ICdBcnJheScpXG5cdFx0e1xuXHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2Uuam9pbignLiAnKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wdWJsaXNoQWxlcnQoJ3RleHQtd2FybmluZycsICdXYXJuaW5nJywgbWVzc2FnZSwgZmFkZU91dCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU2hvd3MgYW4gJ2Vycm9yJyBtZXNzYWdlXG5cdCAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbWVzc2FnZSB0aGUgbWVzc2FnZVxuXHQgICogQHBhcmFtIHtCb29sZWFufSBbZmFkZU91dD1mYWxzZV0gaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcblx0ICAqL1xuXG5cdGVycm9yOiBmdW5jdGlvbihtZXNzYWdlLCBmYWRlT3V0KVxuXHR7XG5cdFx0aWYodGhpcy50eXBlT2YobWVzc2FnZSkgPT09ICdBcnJheScpXG5cdFx0e1xuXHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2Uuam9pbignLiAnKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wdWJsaXNoQWxlcnQoJ3RleHQtZGFuZ2VyJywgJ0Vycm9yJywgbWVzc2FnZSwgZmFkZU91dCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRmx1c2hlcyBtZXNzYWdlc1xuXHQgICovXG5cblx0Zmx1c2g6IGZ1bmN0aW9uKClcblx0e1xuXHRcdCQoJyNhbWlfYWxlcnRfY29udGVudCcpLmVtcHR5KCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBCUkVBRENSVU1CICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEZpbGwgdGhlIG1haW4gYnJlYWRjcnVtYlxuXHQgICogQHBhcmFtIHtBcnJheX0gaXRlbXMgdGhlIGFycmF5IG9mIGl0ZW1zIChIVE1MIGZvcm1hdClcblx0ICAqL1xuXG5cdGZpbGxCcmVhZGNydW1iOiBmdW5jdGlvbihpdGVtcylcblx0e1xuXHRcdGxldCBzID0gdGhpcy50eXBlT2YoaXRlbXMpID09PSAnQXJyYXknID8gaXRlbXMubWFwKChpdGVtKSA9PiAnPGxpIGNsYXNzPVwiYnJlYWRjcnVtYi1pdGVtXCI+JyArIGl0ZW0ucmVwbGFjZSgve3tXRUJBUFBfVVJMfX0vZywgdGhpcy53ZWJBcHBVUkwpICsgJzwvbGk+Jykuam9pbignJylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXG5cdFx0JCgnI2FtaV9icmVhZGNydW1iX2NvbnRlbnQnKS5odG1sKHMpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogV0VCIEFQUExJQ0FUSU9OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBUaGlzIG1ldGhvZCBtdXN0IGJlIG92ZXJsb2FkZWQgYW5kIGlzIGNhbGxlZCB3aGVuIHRoZSBXZWIgYXBwbGljYXRpb24gc3RhcnRzXG5cdCAgKiBAZXZlbnQgYW1pV2ViQXBwI29uUmVhZHlcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyRGF0YVxuXHQgICovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoIXRoaXMuX2VtYmVkZGVkKVxuXHRcdHtcblx0XHRcdGFsZXJ0KCdlcnJvcjogYGFtaVdlYkFwcC5vblJlYWR5KClgIG11c3QgYmUgb3ZlcmxvYWRlZCEnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBUaGlzIG1ldGhvZCBtdXN0IGJlIG92ZXJsb2FkZWQgYW5kIGlzIGNhbGxlZCB3aGVuIHRoZSB0b29sYmFyIG5lZWRzIHRvIGJlIHVwZGF0ZWRcblx0ICAqIEBldmVudCBhbWlXZWJBcHAjb25SZWZyZXNoXG5cdCAgKiBAcGFyYW0ge0Jvb2xlYW59IGlzQXV0aFxuXHQgICovXG5cblx0b25SZWZyZXNoOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZighdGhpcy5fZW1iZWRkZWQpXG5cdFx0e1xuXHRcdFx0YWxlcnQoJ2Vycm9yOiBgYW1pV2ViQXBwLm9uUmVmcmVzaCgpYCBtdXN0IGJlIG92ZXJsb2FkZWQhJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogU3RhcnRzIHRoZSBXZWIgYXBwbGljYXRpb25cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGxvZ29fdXJsLCBob21lX3VybCwgY29udGFjdF9lbWFpbCwgYWJvdXRfdXJsLCB0aGVtZV91cmwsIGxvY2tlcl91cmwsIGNoYW5nZV9wYXNzb3JkX2FsbG93ZWQsIGNoYW5nZV91c2VyX2luZm9fYWxsb3dlZCwgY2hhbmdlX3Bhc3NvcmRfYWxsb3dlZClcblx0ICAqL1xuXG5cdHN0YXJ0OiBmdW5jdGlvbihzZXR0aW5ncylcblx0e1xuXHRcdHRoaXMuX2dsb2JhbERlZmVycmVkLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBbXG5cdFx0XHRcdGxvZ29VUkwsIGhvbWVVUkwsIGNvbnRhY3RFbWFpbCxcblx0XHRcdFx0YWJvdXRVUkwsIHRoZW1lVVJMLCBsb2NrZXJVUkwsIGVuZHBvaW50VVJMLFxuXHRcdFx0XHRjcmVhdGVBY2NvdW50QWxsb3dlZCwgY2hhbmdlVXNlckluZm9BbGxvd2VkLCBjaGFuZ2VQYXNzb3JkQWxsb3dlZCxcblx0XHRcdF0gPSB0aGlzLnNldHVwKFtcblx0XHRcdFx0J2xvZ29fdXJsJywgJ2hvbWVfdXJsJywgJ2NvbnRhY3RfZW1haWwnLFxuXHRcdFx0XHQnYWJvdXRfdXJsJywgJ3RoZW1lX3VybCcsICdsb2NrZXJfdXJsJywgJ2VuZHBvaW50X3VybCcsXG5cdFx0XHRcdCdjcmVhdGVfYWNjb3VudF9hbGxvd2VkJywgJ2NoYW5nZV91c2VyX2luZm9fYWxsb3dlZCcsICdyZXNldF9wYXNzb3JkX2FsbG93ZWQnLFxuXHRcdFx0XSwgW1xuXHRcdFx0XHR0aGlzLm9yaWdpblVSTFxuXHRcdFx0XHRcdCsgJy9pbWFnZXMvbG9nby5wbmcnLFxuXHRcdFx0XHR0aGlzLndlYkFwcFVSTCxcblx0XHRcdFx0J2FtaUBscHNjLmluMnAzLmZyJyxcblx0XHRcdFx0J2h0dHA6Ly9jZXJuLmNoL2FtaS8nLFxuXHRcdFx0XHR0aGlzLm9yaWdpblVSTCArICcvdHdpZy9BTUkvVGhlbWUvYmx1ZS50d2lnJyxcblx0XHRcdFx0dGhpcy5vcmlnaW5VUkwgKyAnL3R3aWcvQU1JL0ZyYWdtZW50L2xvY2tlci50d2lnJyxcblx0XHRcdFx0dGhpcy5vcmlnaW5VUkwgKyAnL0FNSS9Gcm9udEVuZCcsXG5cdFx0XHRcdHRydWUsIHRydWUsIHRydWUsXG5cdFx0XHRdLCBzZXR0aW5ncyk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGFtaUNvbW1hbmQuZW5kcG9pbnQgPSBlbmRwb2ludFVSTDtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0d2luZG93Lm9uYmVmb3JldW5sb2FkID0gKGUpID0+IHtcblxuXHRcdFx0XHRpZighdGhpcy5fY2FuTGVhdmUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBmID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG5cblx0XHRcdFx0XHRpZihmKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGYucmV0dXJuVmFsdWUgPSAnQ29uZmlybSB0aGF0IHlvdSB3YW50IHRvIGxlYXZlIHRoaXMgcGFnZT8nO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiAnQ29uZmlybSB0aGF0IHlvdSB3YW50IHRvIGxlYXZlIHRoaXMgcGFnZT8nO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBjb250cm9sc1VSTCA9IHRoaXMub3JpZ2luVVJMICsgJy9jb250cm9scy9DT05UUk9MUy5qc29uJztcblxuXHRcdFx0Y29uc3Qgc3ViYXBwc1VSTCA9IHRoaXMub3JpZ2luVVJMICsgJy9zdWJhcHBzL1NVQkFQUFMuanNvbic7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQuYWpheCh7dXJsOiBjb250cm9sc1VSTCwgY2FjaGU6IGZhbHNlLCBjcm9zc0RvbWFpbjogdHJ1ZSwgZGF0YVR5cGU6ICdqc29uJ30pLnRoZW4oKGRhdGExKSA9PiB7XG5cblx0XHRcdFx0JC5hamF4KHt1cmw6IHN1YmFwcHNVUkwsIGNhY2hlOiBmYWxzZSwgY3Jvc3NEb21haW46IHRydWUsIGRhdGFUeXBlOiAnanNvbid9KS50aGVuKChkYXRhMikgPT4ge1xuXG5cdFx0XHRcdFx0Zm9yKGNvbnN0IG5hbWUgaW4gZGF0YTEpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2NvbnRyb2xzW25hbWUudG9Mb3dlckNhc2UoKV0gPSBkYXRhMVtuYW1lXTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IoY29uc3QgbmFtZSBpbiBkYXRhMikge1xuXHRcdFx0XHRcdFx0dGhpcy5fc3ViYXBwc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gZGF0YTJbbmFtZV07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoIXRoaXMuX2VtYmVkZGVkKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRcdFx0XHRcdExPR09fVVJMOiBsb2dvVVJMLFxuXHRcdFx0XHRcdFx0XHRIT01FX1VSTDogaG9tZVVSTCxcblx0XHRcdFx0XHRcdFx0Q09OVEFDVF9FTUFJTDogY29udGFjdEVtYWlsLFxuXHRcdFx0XHRcdFx0XHRBQk9VVF9VUkw6IGFib3V0VVJMLFxuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0JC5hamF4KHt1cmw6IHRoZW1lVVJMLCBjYWNoZTogdHJ1ZSwgY3Jvc3NEb21haW46IHRydWUsIGRhdGFUeXBlOiAndGV4dCd9KS50aGVuKChkYXRhMykgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdCQuYWpheCh7dXJsOiBsb2NrZXJVUkwsIGNhY2hlOiB0cnVlLCBjcm9zc0RvbWFpbjogdHJ1ZSwgZGF0YVR5cGU6ICd0ZXh0J30pLnRoZW4oKGRhdGE0KSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHQkKCdib2R5JykuYXBwZW5kKHRoaXMuZm9ybWF0VFdJRyhkYXRhMywgZGljdCkgKyBkYXRhNCkucHJvbWlzZSgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmxvY2soKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0YW1pTG9naW4uX3N0YXJ0KFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjcmVhdGVBY2NvdW50QWxsb3dlZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hhbmdlVXNlckluZm9BbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjaGFuZ2VQYXNzb3JkQWxsb3dlZFxuXHRcdFx0XHRcdFx0XHRcdFx0KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnVubG9jaygpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5lcnJvcihtZXNzYWdlKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdGFsZXJ0KCdjb3VsZCBub3Qgb3BlbiBgJyArIGxvY2tlclVSTCArICdgLCBwbGVhc2UgcmVsb2FkIHRoZSBwYWdlLi4uJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdH0sICgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRhbGVydCgnY291bGQgbm90IG9wZW4gYCcgKyB0aGVtZVVSTCArICdgLCBwbGVhc2UgcmVsb2FkIHRoZSBwYWdlLi4uJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0bGV0IGRhdGEzID0gJyc7XG5cblx0XHRcdFx0XHRcdGlmKCQoJyNhbWlfYWxlcnRfY29udGVudCcpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRkYXRhMyArPSAnPGRpdiBpZD1cImFtaV9hbGVydF9jb250ZW50XCI+PC9kaXY+Jztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYoJCgnI2FtaV9sb2dpbl9tZW51X2NvbnRlbnQnKS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdFx0ZGF0YTMgKz0gJzxkaXYgaWQ9XCJhbWlfbG9naW5fbWVudV9jb250ZW50XCI+PC9kaXY+Jztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0JC5hamF4KHt1cmw6IGxvY2tlclVSTCwgY2FjaGU6IHRydWUsIGNyb3NzRG9tYWluOiB0cnVlLCBkYXRhVHlwZTogJ3RleHQnfSkuZG9uZSgoZGF0YTQpID0+IHtcblxuXHRcdFx0XHRcdFx0XHQkKCdib2R5JykucHJlcGVuZChkYXRhMyArIGRhdGE0KS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHR0aGlzLmxvY2soKTtcblxuXHRcdFx0XHRcdFx0XHRcdGFtaUxvZ2luLl9zdGFydChcblx0XHRcdFx0XHRcdFx0XHRcdGNyZWF0ZUFjY291bnRBbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2hhbmdlVXNlckluZm9BbGxvd2VkLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2hhbmdlUGFzc29yZEFsbG93ZWRcblx0XHRcdFx0XHRcdFx0XHQpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnVubG9jaygpO1xuXG5cdFx0XHRcdFx0XHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmVycm9yKG1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9LCAoKSA9PiB7XG5cblx0XHRcdFx0XHRhbGVydCgnY291bGQgbm90IG9wZW4gYCcgKyBzdWJhcHBzVVJMICsgJ2AsIHBsZWFzZSByZWxvYWQgdGhlIHBhZ2UuLi4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSwgKCkgPT4ge1xuXG5cdFx0XHRcdGFsZXJ0KCdjb3VsZCBub3Qgb3BlbiBgJyArIGNvbnRyb2xzVVJMICsgJ2AsIHBsZWFzZSByZWxvYWQgdGhlIHBhZ2UuLi4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1hbGVydFxuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFsZXJ0KG1lc3NhZ2UpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBDT05UUk9MUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGxvYWRzIGEgY29udHJvbFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGNvbnRyb2wgdGhlIGFycmF5IG9mIGNvbnRyb2wgbmFtZVxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRDb250cm9sOiBmdW5jdGlvbihjb250cm9sLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihjb250cm9sLmluZGV4T2YoJ2N0cmw6JykgPT09IDApXG5cdFx0e1xuXHRcdFx0Y29udHJvbCA9IGNvbnRyb2wuc3Vic3RyaW5nKDUpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGRlc2NyID0gdGhpcy5fY29udHJvbHNbY29udHJvbC50b0xvd2VyQ2FzZSgpXTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoZGVzY3IpXG5cdFx0e1xuXHRcdFx0dGhpcy5sb2FkU2NyaXB0cyh0aGlzLm9yaWdpblVSTCArICcvJyArIGRlc2NyLmZpbGUpLnRoZW4oKGxvYWRlZCkgPT4ge1xuXG5cdFx0XHRcdHRyeVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgY2xhenogPSB3aW5kb3dbXG5cdFx0XHRcdFx0XHRkZXNjci5jbGF6elxuXHRcdFx0XHRcdF07XG5cblx0XHRcdFx0XHRjb25zdCBwcm9taXNlID0gbG9hZGVkWzBdID8gY2xhenoucHJvdG90eXBlLm9uUmVhZHkuYXBwbHkoY2xhenoucHJvdG90eXBlKVxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgOiAvKi0tLS0tLS0tLS0tLS0tLS0qLyBudWxsIC8qLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0X2FtaV9pbnRlcm5hbF90aGVuKHByb21pc2UsICgpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFsvKi0tLS0tLS0tLS0tLS0tLS0tLS0tKi8gY2xhenogLyotLS0tLS0tLS0tLS0tLS0tLS0tLSovXSk7XG5cblx0XHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbJ2NvdWxkIG5vdCBsb2FkIGNvbnRyb2wgYCcgKyBjb250cm9sICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2gobWVzc2FnZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgY29udHJvbCBgJyArIGNvbnRyb2wgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgY29udHJvbCBgJyArIGNvbnRyb2wgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgZmluZCBjb250cm9sIGAnICsgY29udHJvbCArICdgJ10pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtwYXJlbnRdID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtvd25lcl0gPz8/XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gY29udHJvbCA/Pz9cblx0ICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjcmVhdGVDb250cm9sOiBmdW5jdGlvbihwYXJlbnQsIG93bmVyLCBjb250cm9sLCBwYXJhbXMsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMubG9hZENvbnRyb2woY29udHJvbCwgc2V0dGluZ3MpLmRvbmUoKGNvbnN0cnVjdG9yKSA9PiB7XG5cblx0XHRcdGxldCBpbnN0YW5jZSA9IG5ldyBjb25zdHJ1Y3RvcihwYXJlbnQsIG93bmVyKTtcblxuXHRcdFx0X2FtaV9pbnRlcm5hbF90aGVuKGNvbnN0cnVjdG9yLnByb3RvdHlwZS5yZW5kZXIuYXBwbHkoaW5zdGFuY2UsIHBhcmFtcyksIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbaW5zdGFuY2VdLmNvbmNhdChbLi4uYXJndW1lbnRzXSkpO1xuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbCBpbiBhIGNvbnRhaW5lclxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtwYXJlbnRdID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtvd25lcl0gPz8/XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gY29udHJvbCA/Pz9cblx0ICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtc1dpdGhvdXRTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBjb250cm9sU2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50U2V0dGluZ3MgPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y3JlYXRlQ29udHJvbEluQm9keTogZnVuY3Rpb24ocGFyZW50LCBvd25lciwgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSB0aGlzLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0J10sXG5cdFx0XHRbcmVzdWx0XSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0bGV0IFBBUkFNUyA9IFtdO1xuXHRcdFx0bGV0IFNFVFRJTkdTID0ge307XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGZvcihsZXQga2V5IGluIHBhcmVudFNldHRpbmdzKSB7XG5cdFx0XHRcdFNFVFRJTkdTW2tleV0gPSBwYXJlbnRTZXR0aW5nc1trZXldO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IobGV0IGtleSBpbiBjb250cm9sU2V0dGluZ3MpIHtcblx0XHRcdFx0U0VUVElOR1Nba2V5XSA9IGNvbnRyb2xTZXR0aW5nc1trZXldO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQvLy8vLy8ucHVzaChzZWxlY3Rvcik7XG5cblx0XHRcdEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KFBBUkFNUywgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncyk7XG5cblx0XHRcdFBBUkFNUy5wdXNoKFNFVFRJTkdTKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0dGhpcy5jcmVhdGVDb250cm9sKHBhcmVudCwgb3duZXIsIGNvbnRyb2wsIFBBUkFNUykuZG9uZShmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgWy4uLmFyZ3VtZW50c10pO1xuXG5cdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblx0XHRjYXRjaChtZXNzYWdlKVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sIGluIGEgY29udGFpbmVyXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmVudF0gPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW293bmVyXSA/Pz9cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBjb250cm9sID8/P1xuXHQgICogQHBhcmFtIHtBcnJheX0gcGFyYW1zV2l0aG91dFNldHRpbmdzID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IGNvbnRyb2xTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBpY29uID8/P1xuXHQgICogQHBhcmFtIHtTdHJpbmd9IHRpdGxlID8/P1xuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lcjogZnVuY3Rpb24ocGFyZW50LCBvd25lciwgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgaWNvbiwgdGl0bGUsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gdGhpcy5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRyeVxuXHRcdHtcblx0XHRcdHBhcmVudC5hcHBlbmRJdGVtKCc8aSBjbGFzcz1cImZhIGZhLScgKyB0aGlzLnRleHRUb0h0bWwoaWNvbikgKyAnXCI+PC9pPiAnICsgdGhpcy50ZXh0VG9IdG1sKHRpdGxlKSkuZG9uZSgoc2VsZWN0b3IpID0+IHtcblxuXHRcdFx0XHRsZXQgUEFSQU1TID0gW107XG5cdFx0XHRcdGxldCBTRVRUSU5HUyA9IHt9O1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRmb3IobGV0IGtleSBpbiBwYXJlbnRTZXR0aW5ncykge1xuXHRcdFx0XHRcdFNFVFRJTkdTW2tleV0gPSBwYXJlbnRTZXR0aW5nc1trZXldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yKGxldCBrZXkgaW4gY29udHJvbFNldHRpbmdzKSB7XG5cdFx0XHRcdFx0U0VUVElOR1Nba2V5XSA9IGNvbnRyb2xTZXR0aW5nc1trZXldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFBBUkFNUy5wdXNoKHNlbGVjdG9yKTtcblxuXHRcdFx0XHRBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShQQVJBTVMsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MpO1xuXG5cdFx0XHRcdFBBUkFNUy5wdXNoKFNFVFRJTkdTKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0dGhpcy5jcmVhdGVDb250cm9sKHBhcmVudCwgb3duZXIsIGNvbnRyb2wsIFBBUkFNUykuZG9uZShmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbLi4uYXJndW1lbnRzXSk7XG5cblx0XHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGNhdGNoKG1lc3NhZ2UpXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIEFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gYSBjb250YWluZXIgZnJvbSBhIFdFQiBsaW5rXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmVudF0gPz8/XG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW293bmVyXSA/Pz9cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBlbCA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRTZXR0aW5ncyA/Pz9cblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjcmVhdGVDb250cm9sRnJvbVdlYkxpbms6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIsIGVsLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBkYXRhQ3RybCA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1jdHJsJykgPyBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY3RybCcpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXG5cdFx0bGV0IGRhdGFDdHJsTG9jYXRpb24gPSBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtY3RybC1sb2NhdGlvbicpID8gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWN0cmwtbG9jYXRpb24nKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgZGF0YVBhcmFtcyA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1wYXJhbXMnKSA/IEpTT04ucGFyc2UoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXBhcmFtcycpKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogW11cblx0XHQ7XG5cblx0XHRsZXQgZGF0YVNldHRpbmdzID0gZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNldHRpbmdzJykgPyBKU09OLnBhcnNlKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zZXR0aW5ncycpKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHt9XG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgZGF0YUljb24gPSBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtaWNvbicpID8gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWljb24nKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAncXVlc3Rpb24nXG5cdFx0O1xuXG5cdFx0bGV0IGRhdGFUaXRsZSA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS10aXRsZScpID8gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRpdGxlJylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnVW5rbm93bidcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMubG9jaygpO1xuXG5cdFx0LyoqLyBpZihkYXRhQ3RybExvY2F0aW9uID09PSAnYm9keScpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlQ29udHJvbEluQm9keShwYXJlbnQsIG93bmVyLCBkYXRhQ3RybCwgZGF0YVBhcmFtcywgZGF0YVNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMudW5sb2NrKCk7XG5cblx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHR0aGlzLmVycm9yKG1lc3NhZ2UpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVDb250cm9sSW5Db250YWluZXIocGFyZW50LCBvd25lciwgZGF0YUN0cmwsIGRhdGFQYXJhbXMsIGRhdGFTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIGRhdGFJY29uLCBkYXRhVGl0bGUsIHNldHRpbmdzKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLnVubG9jaygpO1xuXG5cdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5lcnJvcihtZXNzYWdlKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogU1VCQVBQUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dHJpZ2dlckxvZ2luOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMuX2lzUmVhZHkpXG5cdFx0e1xuXHRcdFx0X2FtaV9pbnRlcm5hbF90aGVuKHRoaXMuX2N1cnJlbnRTdWJBcHBJbnN0YW5jZS5vbkxvZ2luKHRoaXMuYXJnc1sndXNlcmRhdGEnXSksIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0X2FtaV9pbnRlcm5hbF9hbHdheXModGhpcy5vblJlZnJlc2godHJ1ZSksICgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlKG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRfYW1pX2ludGVybmFsX2Fsd2F5cyh0aGlzLm9uUmVmcmVzaCh0cnVlKSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZXNvbHZlKCk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dHJpZ2dlckxvZ291dDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLl9pc1JlYWR5KVxuXHRcdHtcblx0XHRcdF9hbWlfaW50ZXJuYWxfdGhlbih0aGlzLl9jdXJyZW50U3ViQXBwSW5zdGFuY2Uub25Mb2dvdXQodGhpcy5hcmdzWyd1c2VyZGF0YSddKSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRfYW1pX2ludGVybmFsX2Fsd2F5cyh0aGlzLm9uUmVmcmVzaChmYWxzZSksICgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlKG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRfYW1pX2ludGVybmFsX2Fsd2F5cyh0aGlzLm9uUmVmcmVzaChmYWxzZSksICgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXN5bmNocm9ub3VzbHkgbG9hZHMgYSBzdWJhcHBcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzdWJhcHAgdGhlIHN1YmFwcFxuXHQgICogQHBhcmFtIHs/fSBbdXNlcmRhdGFdIHRoZSB1c2VyIGRhdGFcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRsb2FkU3ViQXBwOiBmdW5jdGlvbihzdWJhcHAsIHVzZXJkYXRhLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IHRoaXMuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmxvY2soKTtcblxuXHRcdHJlc3VsdC5hbHdheXMoKCkgPT4ge1xuXG5cdFx0XHR0aGlzLnVubG9jaygpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihzdWJhcHAuaW5kZXhPZignc3ViYXBwOicpID09PSAwKVxuXHRcdHtcblx0XHRcdHN1YmFwcCA9IHN1YmFwcC5zdWJzdHJpbmcoNyk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZGVzY3IgPSB0aGlzLl9zdWJhcHBzW3N1YmFwcC50b0xvd2VyQ2FzZSgpXTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoZGVzY3IpXG5cdFx0e1xuXHRcdFx0dGhpcy5sb2FkU2NyaXB0cyh0aGlzLm9yaWdpblVSTCArICcvJyArIGRlc2NyLmZpbGUpLnRoZW4oKGxvYWRlZCkgPT4ge1xuXG5cdFx0XHRcdHRyeVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5fY3VycmVudFN1YkFwcEluc3RhbmNlLm9uRXhpdCh1c2VyZGF0YSk7XG5cblx0XHRcdFx0XHRjb25zdCBpbnN0YW5jZSA9IHdpbmRvd1tkZXNjci5pbnN0YW5jZV07XG5cblx0XHRcdFx0XHR0aGlzLl9jdXJyZW50U3ViQXBwSW5zdGFuY2UgPSBpbnN0YW5jZTtcblxuXHRcdFx0XHRcdC8qKi9cblxuXHRcdFx0XHRcdHRoaXMuZmlsbEJyZWFkY3J1bWIoZGVzY3IuYnJlYWRjcnVtYik7XG5cblx0XHRcdFx0XHRjb25zdCBwcm9taXNlID0gbG9hZGVkWzBdID8gaW5zdGFuY2Uub25SZWFkeSh1c2VyZGF0YSlcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgIDogLyotLS0tLS0qLyBudWxsIC8qLS0tLS0tKi9cblx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRfYW1pX2ludGVybmFsX3RoZW4ocHJvbWlzZSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRjb25zdCBwcm9taXNlID0gYW1pTG9naW4uaXNBdXRoZW50aWNhdGVkKCkgPyB0aGlzLnRyaWdnZXJMb2dpbigpXG5cdFx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnRyaWdnZXJMb2dvdXQoKVxuXHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0XHRwcm9taXNlLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbLyotLS0tLS0tLS0tLS0tLS0tLS0qLyBpbnN0YW5jZSAvKi0tLS0tLS0tLS0tLS0tLS0tLSovXSk7XG5cblx0XHRcdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBzdWJhcHAgYCcgKyBzdWJhcHAgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBzdWJhcHAgYCcgKyBzdWJhcHAgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaChtZXNzYWdlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgWydjb3VsZCBub3QgbG9hZCBzdWJhcHAgYCcgKyBzdWJhcHAgKyAnYDogJyArIG1lc3NhZ2VdKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGxvYWQgc3ViYXBwIGAnICsgc3ViYXBwICsgJ2A6ICcgKyBtZXNzYWdlXSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFsnY291bGQgbm90IGZpbmQgc3ViYXBwIGAnICsgc3ViYXBwICsgJ2AnXSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBMb2FkcyBhIHN1YmFwcCBieSBVUkxcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBkZWZhdWx0U3ViQXBwIGlmICdhbWlXZWJBcHAuYXJnc1tcInN1YmFwcFwiXScgaXMgbnVsbCwgdGhlIGRlZmF1bHQgc3ViYXBwXG5cdCAgKiBAcGFyYW0gez99IFtkZWZhdWx0VXNlckRhdGFdIGlmICdhbWlXZWJBcHAuYXJnc1tcInVzZXJkYXRhXCJdJyBpcyBudWxsLCB0aGUgZGVmYXVsdCB1c2VyIGRhdGFcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvYWRTdWJBcHBCeVVSTDogZnVuY3Rpb24oZGVmYXVsdFN1YkFwcCwgZGVmYXVsdFVzZXJEYXRhKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0aWYodGhpcy5hcmdzWyd2J10pXG5cdFx0e1xuXHRcdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdHZXRIYXNoSW5mbyAtaGFzaD1cIicgKyB0aGlzLnRleHRUb1N0cmluZyh0aGlzLmFyZ3NbJ3YnXSkgKyAnXCInKS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblxuXHRcdFx0fSkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRcdGxldCBqc29uO1xuXG5cdFx0XHRcdHRyeVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0anNvbiA9IEpTT04ucGFyc2UodGhpcy5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJqc29uXCJ9LiQnLCBkYXRhKVswXSB8fCAne30nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaChtZXNzYWdlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0anNvbiA9IHsvKiBFTVBUWSBKU09OICAgRU1QVFkgSlNPTiAgIEVNUFRZIEpTT04gICBFTVBUWSBKU09OICAgRU1QVFkgSlNPTiAqL307XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3Qgc3ViYXBwID0ganNvblsnc3ViYXBwJ10gfHwgZGVmYXVsdFN1YkFwcDtcblx0XHRcdFx0Y29uc3QgdXNlcmRhdGEgPSBqc29uWyd1c2VyZGF0YSddIHx8IGRlZmF1bHRVc2VyRGF0YTtcblxuXHRcdFx0XHR0aGlzLmxvYWRTdWJBcHAoc3ViYXBwLCB1c2VyZGF0YSkudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXG5cdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGlmKCFhbWlSb3V0ZXIuY2hlY2soKSlcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IHN1YmFwcCA9IHRoaXMuYXJnc1snc3ViYXBwJ10gfHwgZGVmYXVsdFN1YkFwcDtcblx0XHRcdFx0Y29uc3QgdXNlcmRhdGEgPSB0aGlzLmFyZ3NbJ3VzZXJkYXRhJ10gfHwgZGVmYXVsdFVzZXJEYXRhO1xuXG5cdFx0XHRcdHRoaXMubG9hZFN1YkFwcChzdWJhcHAsIHVzZXJkYXRhKS50aGVuKCgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlKCk7XG5cblx0XHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaS5JQ29udHJvbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSBBTUkgY29udHJvbCBpbnRlcmZhY2VcbiAqIEBpbnRlcmZhY2UgYW1pLklDb250cm9sXG4gKi9cblxuJEFNSUludGVyZmFjZSgnYW1pLklDb250cm9sJywgLyoqIEBsZW5kcyBhbWkuSUNvbnRyb2wgKi8ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBQYXRjaGVzIGFuIEhUTUwgaWRlbnRpZmllclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGlkIHRoZSB1bnBhdGNoZWQgSFRNTCBpZGVudGlmaWVyXG5cdCAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcblx0ICAqL1xuXG5cdHBhdGNoSWQ6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogUHV0cyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgdGhlIHRhcmdldCBzZWxlY3RvclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgZnJhZ21lbnRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRyZXBsYWNlSFRNTDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBQcmVwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgdGhlIHRhcmdldCBzZWxlY3RvclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHR3aWcgdGhlIFRXSUcgZnJhZ21lbnRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRwcmVwZW5kSFRNTDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBBcHBlbmRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgdGFyZ2V0IHNlbGVjdG9yXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdHdpZyB0aGUgVFdJRyBmcmFnbWVudFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGFwcGVuZEhUTUw6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgaXMgcmVhZHkgdG8gcnVuXG5cdCAgKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpIHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pLklTdWJBcHAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIEFNSSBzdWItYXBwbGljYXRpb24gaW50ZXJmYWNlXG4gKiBAaW50ZXJmYWNlIGFtaS5JU3ViQXBwXG4gKi9cblxuJEFNSUludGVyZmFjZSgnYW1pLklTdWJBcHAnLCAvKiogQGxlbmRzIGFtaS5JU3ViQXBwICovIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyByZWFkeSB0byBydW5cblx0ICAqIEBwYXJhbSB7P30gdXNlcmRhdGEgdXNlcmRhdGFcblx0ICAqL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2FsbGVkIHdoZW4gdGhlIHN1Yi1hcHBsaWNhdGlvbiBpcyBhYm91dCB0byBleGl0XG5cdCAgKiBAcGFyYW0gez99IHVzZXJkYXRhIHVzZXJkYXRhXG5cdCAgKi9cblxuXHRvbkV4aXQ6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2FsbGVkIHdoZW4gbG9nZ2luZyBpblxuXHQgICogQHBhcmFtIHs/fSB1c2VyZGF0YSB1c2VyZGF0YVxuXHQgICovXG5cblx0b25Mb2dpbjogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDYWxsZWQgd2hlbiBsb2dnaW5nIG91dFxuXHQgICogQHBhcmFtIHs/fSB1c2VyZGF0YSB1c2VyZGF0YVxuXHQgICovXG5cblx0b25Mb2dvdXQ6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWkuQ29udHJvbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgYmFzaWMgQU1JIGNvbnRyb2xcbiAqIEBjbGFzcyBhbWkuQ29udHJvbFxuICogQGltcGxlbWVudHMge2FtaS5JQ29udHJvbH1cbiAqL1xuXG4kQU1JQ2xhc3MoJ2FtaS5Db250cm9sJywgLyoqIEBsZW5kcyBhbWkuQ29udHJvbCAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW1wbGVtZW50czogW2FtaS5JQ29udHJvbF0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGFtaS5Db250cm9sLmluc3RhbmNlQ250ID0gMTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIpXG5cdHtcblx0XHR0aGlzLl9wYXJlbnQgPSBwYXJlbnQgfHwgdGhpcztcblx0XHR0aGlzLl9vd25lciA9IG93bmVyIHx8IHRoaXM7XG5cblx0XHR0aGlzLmluc3RhbmNlU3VmZml4ID0gYW1pLkNvbnRyb2wuaW5zdGFuY2VDbnQrKztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0UGFyZW50OiBmdW5jdGlvbihwYXJlbnQpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGFyZW50ID0gKHBhcmVudCB8fCB0aGlzKTtcblx0fSxcblxuXHRnZXRQYXJlbnQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wYXJlbnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldE93bmVyOiBmdW5jdGlvbihvd25lcilcblx0e1xuXHRcdHJldHVybiB0aGlzLl9vd25lciA9IChvd25lciB8fCB0aGlzKTtcblx0fSxcblxuXHRnZXRPd25lcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX293bmVyO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRTZWxlY3RvcjogZnVuY3Rpb24oc2VsZWN0b3IpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2VsZWN0b3IgPSAoc2VsZWN0b3IgfHwgJycpO1xuXHR9LFxuXG5cdGdldFNlbGVjdG9yOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2VsZWN0b3I7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhdGNoSWQ6IGZ1bmN0aW9uKGlkZW50aWZpZXIpXG5cdHtcblx0XHRyZXR1cm4gaWRlbnRpZmllciArICdfaW5zdGFuY2UnICsgdGhpcy5pbnN0YW5jZVN1ZmZpeDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVwbGFjZUhUTUw6IGZ1bmN0aW9uKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncylcblx0e1xuXHRcdGlmKCFzZXR0aW5ncylcblx0XHR7XG5cdFx0XHRzZXR0aW5ncyA9IHt9O1xuXHRcdH1cblxuXHRcdHNldHRpbmdzLnN1ZmZpeCA9IHRoaXMuaW5zdGFuY2VTdWZmaXg7XG5cblx0XHRyZXR1cm4gYW1pV2ViQXBwLnJlcGxhY2VIVE1MKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHByZXBlbmRIVE1MOiBmdW5jdGlvbihzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpXG5cdHtcblx0XHRpZighc2V0dGluZ3MpXG5cdFx0e1xuXHRcdFx0c2V0dGluZ3MgPSB7fTtcblx0XHR9XG5cblx0XHRzZXR0aW5ncy5zdWZmaXggPSB0aGlzLmluc3RhbmNlU3VmZml4O1xuXG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5wcmVwZW5kSFRNTChzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRhcHBlbmRIVE1MOiBmdW5jdGlvbihzZWxlY3RvciwgdHdpZywgc2V0dGluZ3MpXG5cdHtcblx0XHRpZighc2V0dGluZ3MpXG5cdFx0e1xuXHRcdFx0c2V0dGluZ3MgPSB7fTtcblx0XHR9XG5cblx0XHRzZXR0aW5ncy5zdWZmaXggPSB0aGlzLmluc3RhbmNlU3VmZml4O1xuXG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5hcHBlbmRIVE1MKHNlbGVjdG9yLCB0d2lnLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNyZWF0ZUNvbnRyb2w6IGZ1bmN0aW9uKHBhcmVudCwgY29udHJvbCwgcGFyYW1zLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAuY3JlYXRlQ29udHJvbChwYXJlbnQsIHRoaXMsIGNvbnRyb2wsIHBhcmFtcywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjcmVhdGVDb250cm9sSW5Cb2R5OiBmdW5jdGlvbihwYXJlbnQsIGNvbnRyb2wsIGNvbnRyb2xQYXJhbXNXaXRob3V0U2V0dGluZ3MsIGNvbnRyb2xTZXR0aW5ncywgcGFyZW50U2V0dGluZ3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5jcmVhdGVDb250cm9sSW5Cb2R5KHBhcmVudCwgdGhpcywgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjcmVhdGVDb250cm9sSW5Db250YWluZXI6IGZ1bmN0aW9uKHBhcmVudCwgY29udHJvbCwgY29udHJvbFBhcmFtc1dpdGhvdXRTZXR0aW5ncywgY29udHJvbFNldHRpbmdzLCBwYXJlbnRTZXR0aW5ncywgaWNvbiwgdGl0bGUsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5jcmVhdGVDb250cm9sSW5Db250YWluZXIocGFyZW50LCB0aGlzLCBjb250cm9sLCBjb250cm9sUGFyYW1zV2l0aG91dFNldHRpbmdzLCBjb250cm9sU2V0dGluZ3MsIHBhcmVudFNldHRpbmdzLCBpY29uLCB0aXRsZSwgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjcmVhdGVDb250cm9sRnJvbVdlYkxpbms6IGZ1bmN0aW9uKHBhcmVudCwgZWwsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAuY3JlYXRlQ29udHJvbEZyb21XZWJMaW5rKHBhcmVudCwgdGhpcywgZWwsIHBhcmVudFNldHRpbmdzLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWkuU3ViQXBwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBUaGUgYmFzaWMgQU1JIHN1Yi1hcHBsaWNhdGlvblxuICogQGNsYXNzIGFtaS5TdWJBcHBcbiAqIEBpbXBsZW1lbnRzIHthbWkuSVN1YkFwcH1cbiAqL1xuXG4kQU1JQ2xhc3MoJ2FtaS5TdWJBcHAnLCAvKiogQGxlbmRzIGFtaS5TdWJBcHAgKi8ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGltcGxlbWVudHM6IFthbWkuSVN1YkFwcF0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uRXhpdDogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25Mb2dpbjogZnVuY3Rpb24oKSB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25Mb2dvdXQ6IGZ1bmN0aW9uKCkge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pQ29tbWFuZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIEFNSSBjb21tYW5kIHN1YnN5c3RlbVxuICogQG5hbWVzcGFjZSBhbWlDb21tYW5kXG4gKi9cblxuJEFNSU5hbWVzcGFjZSgnYW1pQ29tbWFuZCcsIC8qKiBAbGVuZHMgYW1pQ29tbWFuZCAqLyB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBEZWZhdWx0IGVuZHBvaW50XG5cdCAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICovXG5cblx0ZW5kcG9pbnQ6ICdodHRwOi8veHh5eS56eicsXG5cblx0LyoqXG5cdCAgKiBEZWZhdWx0IGNvbnZlcnRlclxuXHQgICogQHR5cGUge1N0cmluZ31cblx0ICAqL1xuXG5cdGNvbnZlcnRlcjogJ0FNSVhtbFRvSnNvbi54c2wnLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FVEhPRFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBFeGVjdXRlcyBhbiBBTUkgY29tbWFuZFxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGNvbW1hbmQgdGhlIGNvbW1hbmRcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGVuZHBvaW50LCBjb252ZXJ0ZXIsIHRpbWVvdXQsIGV4dHJhUGFyYW0sIGV4dHJhVmFsdWUpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRleGVjdXRlOiBmdW5jdGlvbihjb21tYW5kLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtlbmRwb2ludCwgY29udmVydGVyLCBjb250ZXh0LCB0aW1lb3V0LCBleHRyYVBhcmFtLCBleHRyYVZhbHVlXSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnZW5kcG9pbnQnLCAnY29udmVydGVyJywgJ2NvbnRleHQnLCAndGltZW91dCcsICdleHRyYVBhcmFtJywgJ2V4dHJhVmFsdWUnXSxcblx0XHRcdFt0aGlzLmVuZHBvaW50LCB0aGlzLmNvbnZlcnRlciwgcmVzdWx0LCAyICogNjAgKiAxMDAwLCBudWxsLCBudWxsXSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgVVJMID0gZW5kcG9pbnQudHJpbSgpO1xuXHRcdGNvbnN0IENPTU1BTkQgPSBjb21tYW5kLnRyaW0oKTtcblx0XHRjb25zdCBDT05WRVJURVIgPSBjb252ZXJ0ZXIudHJpbSgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkYXRhID0ge1xuXHRcdFx0Q29tbWFuZDogQ09NTUFORCxcblx0XHRcdENvbnZlcnRlcjogQ09OVkVSVEVSLFxuXHRcdH07XG5cblx0XHRpZihleHRyYVBhcmFtKVxuXHRcdHtcblx0XHRcdGRhdGFbZXh0cmFQYXJhbV0gPSBleHRyYVZhbHVlID8gZXh0cmFWYWx1ZVxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAoKChudWxsKSkpXG5cdFx0XHQ7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB1cmxXaXRoUGFyYW1ldGVycyA9IFVSTCArICc/JyArICQucGFyYW0oZGF0YSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKENPTlZFUlRFUiA9PT0gJ0FNSVhtbFRvSnNvbi54c2wnKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBKU09OIEZPUk1BVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dXJsOiBVUkwsXG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0dGltZW91dDogdGltZW91dCxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0eGhyRmllbGRzOiB7XG5cdFx0XHRcdFx0d2l0aENyZWRlbnRpYWxzOiB0cnVlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG5cblx0XHRcdFx0XHRjb25zdCBpbmZvID0gSlNQYXRoLmFwcGx5KCcuQU1JTWVzc2FnZS5pbmZvLiQnLCBkYXRhKTtcblx0XHRcdFx0XHRjb25zdCBlcnJvciA9IEpTUGF0aC5hcHBseSgnLkFNSU1lc3NhZ2UuZXJyb3IuJCcsIGRhdGEpO1xuXG5cdFx0XHRcdFx0aWYoZXJyb3IubGVuZ3RoID09PSAwKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZGF0YSwgaW5mby5qb2luKCcuICcpLCB1cmxXaXRoUGFyYW1ldGVyc10pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGEsIGVycm9yLmpvaW4oJy4gJyksIHVybFdpdGhQYXJhbWV0ZXJzXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRlcnJvcjogKGpxWEhSLCB0ZXh0U3RhdHVzKSA9PiB7XG5cblx0XHRcdFx0XHRpZih0ZXh0U3RhdHVzID09PSAnZXJyb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRleHRTdGF0dXMgPSAnc2VydmljZSB0ZW1wb3JhcmlseSB1bnJlYWNoYWJsZSc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYodGV4dFN0YXR1cyA9PT0gJ3BhcnNlcmVycm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZXh0U3RhdHVzID0gJ3Jlc291cmNlIHRlbXBvcmFyaWx5IHVucmVhY2hhYmxlJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjb25zdCBkYXRhID0geydBTUlNZXNzYWdlJzogW3snZXJyb3InOiBbeyckJzogdGV4dFN0YXR1c31dfV19O1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGEsIHRleHRTdGF0dXMsIHVybFdpdGhQYXJhbWV0ZXJzXSk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9IGVsc2Uge1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIE9USEVSIEZPUk1BVFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR1cmw6IFVSTCxcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHR0aW1lb3V0OiB0aW1lb3V0LFxuXHRcdFx0XHRkYXRhVHlwZTogJ3RleHQnLFxuXHRcdFx0XHR4aHJGaWVsZHM6IHtcblx0XHRcdFx0XHR3aXRoQ3JlZGVudGlhbHM6IHRydWVcblx0XHRcdFx0fSxcblx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZGF0YSwgZGF0YSwgdXJsV2l0aFBhcmFtZXRlcnNdKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6IChqcVhIUiwgdGV4dFN0YXR1cykgPT4ge1xuXG5cdFx0XHRcdFx0aWYodGV4dFN0YXR1cyA9PT0gJ2Vycm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZXh0U3RhdHVzID0gJ3NlcnZpY2UgdGVtcG9yYXJpbHkgdW5yZWFjaGFibGUnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFt0ZXh0U3RhdHVzLCB0ZXh0U3RhdHVzLCB1cmxXaXRoUGFyYW1ldGVyc10pO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBMb2dzIGluIGJ5IGxvZ2luL3Bhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlciB0aGUgdXNlclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhc3MgdGhlIHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0cGFzc0xvZ2luOiBmdW5jdGlvbih1c2VyLCBwYXNzLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuZXhlY3V0ZSgnR2V0U2Vzc2lvbkluZm8gLUFNSVVzZXI9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh1c2VyKSArICdcIiAtQU1JUGFzcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHBhc3MpICsgJ1wiJywge2V4dHJhUGFyYW06ICdOb0NlcnQnfSkudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRjb25zdCB1c2VySW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgcm9sZUluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHVkcEluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHNzb0luZm8gPSB7fVxuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwidXNlclwifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0dXNlckluZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInVkcFwifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0dWRwSW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwic3NvXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHRzc29JbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJyb2xlXCJ9LnJvdycsIGRhdGEpLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGxldCBuYW1lID0gJyc7XG5cdFx0XHRcdGNvbnN0IHJvbGUgPSB7fTtcblxuXHRcdFx0XHRyb3cuZmllbGQuZm9yRWFjaCgoZmllbGQpID0+IHtcblxuXHRcdFx0XHRcdHJvbGVbZmllbGRbJ0BuYW1lJ11dID0gZmllbGRbJyQnXTtcblxuXHRcdFx0XHRcdGlmKGZpZWxkWydAbmFtZSddID09PSAnbmFtZScpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZSA9IGZpZWxkWyckJ107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyb2xlSW5mb1tuYW1lXSA9IHJvbGU7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm9dKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFtkYXRhLCBtZXNzYWdlLCB7QU1JVXNlcjogJ2d1ZXN0JywgZ3Vlc3RVc2VyOiAnZ3Vlc3QnfSwge30sIHt9LCB7fV0pO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBMb2dzIGluIGJ5IGNlcnRpZmljYXRlXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y2VydExvZ2luOiBmdW5jdGlvbihzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnY29udGV4dCddLFxuXHRcdFx0W3Jlc3VsdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuZXhlY3V0ZSgnR2V0U2Vzc2lvbkluZm8nKS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGNvbnN0IHVzZXJJbmZvID0ge307XG5cdFx0XHRjb25zdCByb2xlSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3QgdWRwSW5mbyA9IHt9O1xuXHRcdFx0Y29uc3Qgc3NvSW5mbyA9IHt9O1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwidXNlclwifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0dXNlckluZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInVkcFwifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0dWRwSW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwic3NvXCJ9LnJvdy5maWVsZCcsIGRhdGEpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHRzc29JbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJyb2xlXCJ9LnJvdycsIGRhdGEpLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGxldCBuYW1lID0gJyc7XG5cdFx0XHRcdGNvbnN0IHJvbGUgPSB7fTtcblxuXHRcdFx0XHRyb3cuZmllbGQuZm9yRWFjaCgoZmllbGQpID0+IHtcblxuXHRcdFx0XHRcdHJvbGVbZmllbGRbJ0BuYW1lJ11dID0gZmllbGRbJyQnXTtcblxuXHRcdFx0XHRcdGlmKGZpZWxkWydAbmFtZSddID09PSAnbmFtZScpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZSA9IGZpZWxkWyckJ107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyb2xlSW5mb1tuYW1lXSA9IHJvbGU7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtkYXRhLCBtZXNzYWdlLCB1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm9dKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFtkYXRhLCBtZXNzYWdlLCB7QU1JVXNlcjogJ2d1ZXN0JywgZ3Vlc3RVc2VyOiAnZ3Vlc3QnfSwge30sIHt9LCB7fV0pO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBMb2dzIG91dFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGxvZ291dDogZnVuY3Rpb24oc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRjb25zdCBbY29udGV4dF0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnXSxcblx0XHRcdFtyZXN1bHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmV4ZWN1dGUoJ0dldFNlc3Npb25JbmZvIC1BTUlVc2VyPVwiXCIgLUFNSVBhc3M9XCJcIicsIHtleHRyYVBhcmFtOiAnTm9DZXJ0J30pLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0Y29uc3QgdXNlckluZm8gPSB7fTtcblx0XHRcdGNvbnN0IHJvbGVJbmZvID0ge307XG5cdFx0XHRjb25zdCB1ZHBJbmZvID0ge307XG5cdFx0XHRjb25zdCBzc29JbmZvID0ge31cblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInVzZXJcIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHVzZXJJbmZvW2l0ZW1bJ0BuYW1lJ11dID0gaXRlbVsnJCddO1xuXHRcdFx0fSk7XG5cblx0XHRcdEpTUGF0aC5hcHBseSgnLi5yb3dzZXR7LkB0eXBlPT09XCJ1ZHBcIn0ucm93LmZpZWxkJywgZGF0YSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdHVkcEluZm9baXRlbVsnQG5hbWUnXV0gPSBpdGVtWyckJ107XG5cdFx0XHR9KTtcblxuXHRcdFx0SlNQYXRoLmFwcGx5KCcuLnJvd3NldHsuQHR5cGU9PT1cInNzb1wifS5yb3cuZmllbGQnLCBkYXRhKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdFx0c3NvSW5mb1tpdGVtWydAbmFtZSddXSA9IGl0ZW1bJyQnXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRKU1BhdGguYXBwbHkoJy4ucm93c2V0ey5AdHlwZT09PVwicm9sZVwifS5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRsZXQgbmFtZSA9ICcnO1xuXHRcdFx0XHRjb25zdCByb2xlID0ge307XG5cblx0XHRcdFx0cm93LmZpZWxkLmZvckVhY2goKGZpZWxkKSA9PiB7XG5cblx0XHRcdFx0XHRyb2xlW2ZpZWxkWydAbmFtZSddXSA9IGZpZWxkWyckJ107XG5cblx0XHRcdFx0XHRpZihmaWVsZFsnQG5hbWUnXSA9PT0gJ25hbWUnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWUgPSBmaWVsZFsnJCddO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cm9sZUluZm9bbmFtZV0gPSByb2xlO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvXSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbZGF0YSwgbWVzc2FnZSwge0FNSVVzZXI6ICdndWVzdCcsIGd1ZXN0VXNlcjogJ2d1ZXN0J30sIHt9LCB7fSwge31dKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQXR0YWNoZXMgYSBjZXJ0aWZpY2F0ZVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHVzZXIgdGhlIHVzZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBwYXNzIHRoZSBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGF0dGFjaENlcnQ6IGZ1bmN0aW9uKHVzZXIsIHBhc3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZSgnR2V0U2Vzc2lvbkluZm8gLWF0dGFjaENlcnQgLWFtaUxvZ2luPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodXNlcikgKyAnXCIgLWFtaVBhc3N3b3JkPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcocGFzcykgKyAnXCInLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogRGV0YWNoZXMgYSBjZXJ0aWZpY2F0ZVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHVzZXIgdGhlIHVzZXJcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBwYXNzIHRoZSBwYXNzd29yZFxuXHQgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5nc10gZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcblx0ICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3Rcblx0ICAqL1xuXG5cdGRldGFjaENlcnQ6IGZ1bmN0aW9uKHVzZXIsIHBhc3MsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZSgnR2V0U2Vzc2lvbkluZm8gLWRldGFjaENlcnQgLWFtaUxvZ2luPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodXNlcikgKyAnXCIgLWFtaVBhc3N3b3JkPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcocGFzcykgKyAnXCInLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQWRkcyBhIG5ldyB1c2VyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gdXNlciB0aGUgdXNlclxuXHQgICogQHBhcmFtIHtTdHJpbmd9IHBhc3MgdGhlIHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gZmlyc3ROYW1lIHRoZSBmaXJzdCBuYW1lXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gbGFzdE5hbWUgdGhlIGxhc3QgbmFtZVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGVtYWlsIHRoZSBlbWFpbFxuXHQgICogQHBhcmFtIHtCb29sZWFufSBhdHRhY2ggYXR0YWNoIHRoZSBjdXJyZW50IGNlcnRpZmljYXRlXG5cdCAgKiBAcGFyYW0ge0Jvb2xlYW59IGFncmVlIGFncmVlIHdpdGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0YWRkVXNlcjogZnVuY3Rpb24odXNlciwgcGFzcywgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIGF0dGFjaCwgYWdyZWUsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZSgnQWRkVXNlciAtYW1pTG9naW49XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh1c2VyKSArICdcIiAtYW1pUGFzc3dvcmQ9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwYXNzKSArICdcIiAtZmlyc3ROYW1lPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZmlyc3ROYW1lKSArICdcIiAtbGFzdE5hbWU9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhsYXN0TmFtZSkgKyAnXCIgLWVtYWlsPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZW1haWwpICsgJ1wiJyArIChhdHRhY2ggPyAnIC1hdHRhY2gnIDogJycpICsgKGFncmVlID8gJyAtYWdyZWUnIDogJycpLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogQ2hhbmdlcyB0aGUgYWNjb3VudCBpbmZvcm1hdGlvblxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGZpcnN0TmFtZSB0aGUgZmlyc3QgbmFtZVxuXHQgICogQHBhcmFtIHtTdHJpbmd9IGxhc3ROYW1lIHRoZSBsYXN0IG5hbWVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSBlbWFpbCB0aGUgZW1haWxcblx0ICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIGRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXG5cdCAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XG5cdCAgKi9cblxuXHRjaGFuZ2VJbmZvOiBmdW5jdGlvbihmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbCwgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5leGVjdXRlKCdTZXRVc2VySW5mbyAtZmlyc3ROYW1lPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZmlyc3ROYW1lKSArICdcIiAtbGFzdE5hbWU9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhsYXN0TmFtZSkgKyAnXCIgLWVtYWlsPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZW1haWwpICsgJ1wiJywgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIENoYW5nZXMgdGhlIGFjY291bnQgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyIHRoZSB1c2VyXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gb2xkUGFzcyB0aGUgb2xkIHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge1N0cmluZ30gbmV3UGFzcyB0aGUgbmV3IHBhc3N3b3JkXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0Y2hhbmdlUGFzczogZnVuY3Rpb24odXNlciwgb2xkUGFzcywgbmV3UGFzcywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5leGVjdXRlKCdDaGFuZ2VQYXNzd29yZCAtYW1pTG9naW49XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh1c2VyKSArICdcIiAtYW1pUGFzc3dvcmRPbGQ9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhvbGRQYXNzKSArICdcIiAtYW1pUGFzc3dvcmROZXc9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhuZXdQYXNzKSArICdcIicsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBSZXNldHMgdGhlIGFjY291bnQgcGFzc3dvcmRcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyIHRoZSB1c2VyXG5cdCAgKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzXSBkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVxuXHQgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IEEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFxuXHQgICovXG5cblx0cmVzZXRQYXNzOiBmdW5jdGlvbih1c2VyLCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGUoJ1Jlc2V0UGFzc3dvcmQgLWFtaUxvZ2luPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodXNlcikgKyAnXCInLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pTG9naW4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIEFNSSBhdXRoZW50aWNhdGlvbiBzdWJzeXN0ZW1cbiAqIEBuYW1lc3BhY2UgYW1pTG9naW5cbiAqL1xuXG4kQU1JTmFtZXNwYWNlKCdhbWlMb2dpbicsIC8qKiBAbGVuZHMgYW1pTG9naW4gKi8ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFBVQkxJQyBNRU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNyZWF0ZUFjY291bnRBbGxvd2VkOiB0cnVlLFxuXHRjaGFuZ2VVc2VySW5mb0FsbG93ZWQ6IHRydWUsXG5cdGNoYW5nZVBhc3NvcmRBbGxvd2VkOiB0cnVlLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR1c2VyOiAnZ3Vlc3QnLFxuXHRndWVzdDogJ2d1ZXN0JyxcblxuXHRjbGllbnRETjogJycsXG5cdGlzc3VlckROOiAnJyxcblxuXHRub3RCZWZvcmU6ICcnLFxuXHRub3RBZnRlcjogJycsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJvbGVJbmZvOiB7fSxcblx0dWRwSW5mbzoge30sXG5cdHNzb0luZm86IHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFJJVkFURSBNRVRIT0RTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3N0YXJ0OiBmdW5jdGlvbihjcmVhdGVBY2NvdW50QWxsb3dlZCwgY2hhbmdlVXNlckluZm9BbGxvd2VkLCBjaGFuZ2VQYXNzb3JkQWxsb3dlZClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvYWRUV0lHcyhbXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy90d2lnL0FNSS9GcmFnbWVudC9sb2dpbl9idXR0b24udHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy90d2lnL0FNSS9GcmFnbWVudC9sb2dvdXRfYnV0dG9uLnR3aWcnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvdHdpZy9BTUkvTW9kYWwvbG9naW4udHdpZycsXG5cdFx0XSkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLmZyYWdtZW50TG9naW5CdXR0b24gPSBkYXRhWzBdO1xuXHRcdFx0dGhpcy5mcmFnbWVudExvZ291dEJ1dHRvbiA9IGRhdGFbMV07XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRcdGNyZWF0ZUFjY291bnRBbGxvd2VkOiB0aGlzLmNyZWF0ZUFjY291bnRBbGxvd2VkID0gY3JlYXRlQWNjb3VudEFsbG93ZWQsXG5cdFx0XHRcdGNoYW5nZVVzZXJJbmZvQWxsb3dlZDogdGhpcy5jaGFuZ2VVc2VySW5mb0FsbG93ZWQgPSBjaGFuZ2VVc2VySW5mb0FsbG93ZWQsXG5cdFx0XHRcdGNoYW5nZVBhc3NvcmRBbGxvd2VkOiB0aGlzLmNoYW5nZVBhc3NvcmRBbGxvd2VkID0gY2hhbmdlUGFzc29yZEFsbG93ZWQsXG5cdFx0XHR9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRhbWlXZWJBcHAuYXBwZW5kSFRNTCgnYm9keScsIGRhdGFbMl0sIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdCQoJyNCNzg5NENDMV8xREFBXzRBN0VfQjdEMV9EQkRGNkYwNkFDNzMnKS5zdWJtaXQoKGUpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuZm9ybV9sb2dpbihlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnI0VFMDU1Q0Q0X0U1OEZfNDgzNF84MDIwXzk4NkFFM0Y4RDY3RCcpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5mb3JtX2FkZFVzZXIoZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdCQoJyNEQTIwNDdBMl85RTVEXzQyMERfQjZFN19GQTI2MUQyRUYxMEYnKS5zdWJtaXQoKGUpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuZm9ybV9yZW1pbmRQYXNzKGUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcjRDlFQUY5OThfRUQ4RV80NEQyX0EwQkVfOEM1Q0Y1RTQzOEJEJykuc3VibWl0KChlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmZvcm1fY2hhbmdlSW5mbyhlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnI0U5MkExMDk3Xzk4M0JfNDg1N184NzVGXzA3RTQ2NTlCNDFCMCcpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5mb3JtX2NoYW5nZVBhc3MoZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHQkKCcjRTZFMzBFRUNfMTVFRV80RkNGXzk4MDlfMkI4RUMyRkVGMzg4LCNDQ0Q4RTZGMV82REY4XzRCRERfQTBFQ19DM0MzODA4MzAxODcnKS5jaGFuZ2UoKCkgPT4ge1xuXG5cdFx0XHRcdFx0Y29uc3QgcGFzczEgPSAkKCcjRTZFMzBFRUNfMTVFRV80RkNGXzk4MDlfMkI4RUMyRkVGMzg4JykudmFsKCk7XG5cdFx0XHRcdFx0Y29uc3QgcGFzczIgPSAkKCcjQ0NEOEU2RjFfNkRGOF80QkREX0EwRUNfQzNDMzgwODMwMTg3JykudmFsKCk7XG5cblx0XHRcdFx0XHQkKCcjQ0NEOEU2RjFfNkRGOF80QkREX0EwRUNfQzNDMzgwODMwMTg3JykuZ2V0KDApLnNldEN1c3RvbVZhbGlkaXR5KFxuXHRcdFx0XHRcdFx0cGFzczEubGVuZ3RoID4gMCAmJiBwYXNzMi5sZW5ndGggPiAwICYmIHBhc3MxICE9PSBwYXNzMiA/ICdQYXNzd29yZHMgZG9uXFwndCBtYXRjaC4nIDogJydcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcjRDQ4N0ZFNzJfOEQ5NV80MDQ4X0JFQTNfMjUyMjc0ODYyQUY0LCNFRTFEQTU4Q18zNzYxXzQ3MzRfQTlDMl9FODA4Q0REN0VFNzcnKS5jaGFuZ2UoKCkgPT4ge1xuXG5cdFx0XHRcdFx0Y29uc3QgcGFzczEgPSAkKCcjRDQ4N0ZFNzJfOEQ5NV80MDQ4X0JFQTNfMjUyMjc0ODYyQUY0JykudmFsKCk7XG5cdFx0XHRcdFx0Y29uc3QgcGFzczIgPSAkKCcjRUUxREE1OENfMzc2MV80NzM0X0E5QzJfRTgwOENERDdFRTc3JykudmFsKCk7XG5cblx0XHRcdFx0XHQkKCcjRUUxREE1OENfMzc2MV80NzM0X0E5QzJfRTgwOENERDdFRTc3JykuZ2V0KDApLnNldEN1c3RvbVZhbGlkaXR5KFxuXHRcdFx0XHRcdFx0cGFzczEubGVuZ3RoID4gMCAmJiBwYXNzMi5sZW5ndGggPiAwICYmIHBhc3MxICE9PSBwYXNzMiA/ICdQYXNzd29yZHMgZG9uXFwndCBtYXRjaC4nIDogJydcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZSkgPT4ge1xuXG5cdFx0XHRcdGlmKHRoaXMuc3NvSW5mby51cmwuc3RhcnRzV2l0aChlLm9yaWdpbikpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCB1c2VyID0gZS5kYXRhLnVzZXI7XG5cdFx0XHRcdFx0Y29uc3QgcGFzcyA9IGUuZGF0YS5wYXNzO1xuXG5cdFx0XHRcdFx0aWYodXNlciAmJiBwYXNzKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRoaXMuZm9ybV9sb2dpbjIodXNlciwgcGFzcyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZS5zb3VyY2UuY2xvc2UoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9LCBmYWxzZSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IHVzZXJkYXRhID0gYW1pV2ViQXBwLmFyZ3NbJ3VzZXJkYXRhJ10gfHwgJyc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGFtaUNvbW1hbmQuY2VydExvZ2luKCkuZmFpbCgoZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5fdXBkYXRlKHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykuYWx3YXlzKCgvKi0tLSovKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSkuZG9uZSgoZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKSA9PiB7XG5cblx0XHRcdFx0X2FtaV9pbnRlcm5hbF90aGVuKGFtaVdlYkFwcC5vblJlYWR5KHVzZXJkYXRhKSwgKCkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLl9pc1JlYWR5ID0gdHJ1ZTtcblxuXHRcdFx0XHRcdHRoaXMuX3VwZGF0ZSh1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pLnRoZW4oKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUobWVzc2FnZSk7XG5cblx0XHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuX2lzUmVhZHkgPSB0cnVlO1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9zdWNjZXNzOiBmdW5jdGlvbihtZXNzYWdlKVxuXHR7XG5cdFx0YW1pV2ViQXBwLnN1Y2Nlc3MobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblx0fSxcblxuXHRfZXJyb3I6IGZ1bmN0aW9uKG1lc3NhZ2UpXG5cdHtcblx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblx0fSxcblxuXHRfdW5sb2NrOiBmdW5jdGlvbigpXG5cdHtcblx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2NsZWFuOiBmdW5jdGlvbigpXG5cdHtcblx0XHQkKCcjQjc4OTRDQzFfMURBQV80QTdFX0I3RDFfREJERjZGMDZBQzczJykudHJpZ2dlcigncmVzZXQnKTtcblx0XHQkKCcjRUUwNTVDRDRfRTU4Rl80ODM0XzgwMjBfOTg2QUUzRjhENjdEJykudHJpZ2dlcigncmVzZXQnKTtcblx0XHQkKCcjREEyMDQ3QTJfOUU1RF80MjBEX0I2RTdfRkEyNjFEMkVGMTBGJykudHJpZ2dlcigncmVzZXQnKTtcblx0XHQkKCcjRTkyQTEwOTdfOTgzQl80ODU3Xzg3NUZfMDdFNDY1OUI0MUIwJykudHJpZ2dlcigncmVzZXQnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3VwZGF0ZTogZnVuY3Rpb24odXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVzZXIgPSB0aGlzLnVzZXIgPSB1c2VySW5mby5BTUlVc2VyIHx8ICcnO1xuXHRcdGNvbnN0IGd1ZXN0ID0gdGhpcy5ndWVzdCA9IHVzZXJJbmZvLmd1ZXN0VXNlciB8fCAnJztcblxuXHRcdGNvbnN0IG5vdEJlZm9yZSA9IHRoaXMubm90QmVmb3JlID0gdXNlckluZm8ubm90QmVmb3JlIHx8ICcnO1xuXHRcdGNvbnN0IG5vdEFmdGVyID0gdGhpcy5ub3RBZnRlciA9IHVzZXJJbmZvLm5vdEFmdGVyIHx8ICcnO1xuXG5cdFx0Y29uc3QgY2xpZW50RE5JblNlc3Npb24gPSB0aGlzLmNsaWVudEROID0gdXNlckluZm8uY2xpZW50RE5JblNlc3Npb24gfHwgJyc7XG5cdFx0Y29uc3QgaXNzdWVyRE5JblNlc3Npb24gPSB0aGlzLmlzc3VlckROID0gdXNlckluZm8uaXNzdWVyRE5JblNlc3Npb24gfHwgJyc7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdCQoJyNBMDlBRTMxNl83MDY4XzRCQzFfOTZBOV82Qjg3RDI4ODYzRkUnKS5wcm9wKCdkaXNhYmxlZCcsICFjbGllbnRETkluU2Vzc2lvbiB8fCAhaXNzdWVyRE5JblNlc3Npb24pO1xuXG5cdFx0JCgnI0MzRTk0RjZEXzQ4RTBfODZDMF8zNTM0XzY5MTcyOEU0OTJGNCcpLmF0dHIoJ3NyYycsIHVkcEluZm8udGVybXNBbmRDb25kaXRpb25zIHx8IGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2RvY3MvdGVybXNfYW5kX2NvbmRpdGlvbnMuaHRtbCcpO1xuXHRcdCQoJyNFNTBGRjhCRF9CMEY1X0NENzJfRjlEQ19GQzJCRkE1REJBMjcnKS5hdHRyKCdzcmMnLCB1ZHBJbmZvLnRlcm1zQW5kQ29uZGl0aW9ucyB8fCBhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9kb2NzL3Rlcm1zX2FuZF9jb25kaXRpb25zLmh0bWwnKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5yb2xlSW5mbyA9IHJvbGVJbmZvO1xuXHRcdHRoaXMudWRwSW5mbyA9IHVkcEluZm87XG5cdFx0dGhpcy5zc29JbmZvID0gc3NvSW5mbztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZGljdCA9IHtcblx0XHRcdGNyZWF0ZUFjY291bnRBbGxvd2VkOiB0aGlzLmNyZWF0ZUFjY291bnRBbGxvd2VkLFxuXHRcdFx0Y2hhbmdlVXNlckluZm9BbGxvd2VkOiB0aGlzLmNoYW5nZVVzZXJJbmZvQWxsb3dlZCxcblx0XHRcdGNoYW5nZVBhc3NvcmRBbGxvd2VkOiB0aGlzLmNoYW5nZVBhc3NvcmRBbGxvd2VkLFxuXHRcdFx0LyoqL1xuXHRcdFx0c3NvX2xhYmVsOiBzc29JbmZvLmxhYmVsIHx8ICdTU08nLFxuXHRcdFx0c3NvX3VybDogc3NvSW5mby51cmwgfHwgJ0BOVUxMJyxcblx0XHR9O1xuXG5cdFx0aWYodXNlciAhPT0gZ3Vlc3QpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEdFVCBJTkZPICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCB2YWxpZCA9IHVzZXJJbmZvLnZhbGlkIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCBjZXJ0RW5hYmxlZCA9IHVzZXJJbmZvLmNlcnRFbmFibGVkIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCB2b21zRW5hYmxlZCA9IHVzZXJJbmZvLnZvbXNFbmFibGVkIHx8ICdmYWxzZSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGZpcnN0TmFtZSA9IHVzZXJJbmZvLmZpcnN0TmFtZSB8fCAnJztcblx0XHRcdGNvbnN0IGxhc3ROYW1lID0gdXNlckluZm8ubGFzdE5hbWUgfHwgJyc7XG5cdFx0XHRjb25zdCBlbWFpbCA9IHVzZXJJbmZvLmVtYWlsIHx8ICcnO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBjbGllbnRETkluQU1JID0gdXNlckluZm8uY2xpZW50RE5JbkFNSSB8fCAnJztcblx0XHRcdGNvbnN0IGlzc3VlckROSW5BTUkgPSB1c2VySW5mby5pc3N1ZXJETkluQU1JIHx8ICcnO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU0VUIElORk8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQoJyNFNTEzRjI3RF81NTIxXzRCMDhfQkY2MV81MkFGQjgxMzU2RjcnKS52YWwoZmlyc3ROYW1lKTtcblx0XHRcdCQoJyNBRkYwQjVDMF9CRUVDXzQ4NDJfOTE2RF9EQ0JBN0Y1ODkxOTUnKS52YWwobGFzdE5hbWUpO1xuXHRcdFx0JCgnI0M1ODc0ODZCXzYyQzBfNEI2RV85Mjg4X0Q4RjlGODlEMTU3QicpLnZhbChlbWFpbCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQoJyNBQkVCMDI5MV80MEIwXzQxNEFfQTQyQl9FN0VBQkI5QjQ4N0UnKS52YWwoZmlyc3ROYW1lKTtcblx0XHRcdCQoJyNBNUFGREI2Ml8xMDM0XzRGNjZfQTNFNl85MzQxQjMxRkEyOTAnKS52YWwobGFzdE5hbWUpO1xuXHRcdFx0JCgnI0Q3MzBBNzc0XzA1RUFfNDdBQl9BMEM4X0Q5Mjc1MzgwMkUzRScpLnZhbChlbWFpbCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQoJyNEMUJFRTNCRl85MTYxXzQxRENfQkM1M19DNDRGRkU0RDI1MjInKS52YWwoY2xpZW50RE5JbkFNSSk7XG5cdFx0XHQkKCcjQzc2ODA1RDdfMUU4Nl80MjMxXzkwNzFfMUQwNDc4MzQyM0JCJykudmFsKGNsaWVudEROSW5TZXNzaW9uKTtcblx0XHRcdCQoJyNGNDJGQUY2Ql8yQzhEXzQxNDJfOEJEOV9FNUJDRENBQTA1QUEnKS52YWwoaXNzdWVyRE5JbkFNSSk7XG5cdFx0XHQkKCcjRkUyRjYyMzJfQzI1Nl80QjgwXzkzOUNfRUJFQzkwMzIwMzA4JykudmFsKGlzc3VlckROSW5TZXNzaW9uKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGV0IHRhYmxlID0gW107XG5cblx0XHRcdGZvcihsZXQgcm9sZSBpbiByb2xlSW5mbylcblx0XHRcdHtcblx0XHRcdFx0dGFibGUucHVzaCgnPHRyPicpO1xuXHRcdFx0XHR0YWJsZS5wdXNoKCc8dGQ+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKHJvbGVJbmZvW3JvbGVdLm5hbWUgfHwgJ04vQScpICsgJzwvdGQ+Jyk7XG5cdFx0XHRcdHRhYmxlLnB1c2goJzx0ZD4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwocm9sZUluZm9bcm9sZV0uZGVzY3JpcHRpb24gfHwgJ04vQScpICsgJzwvdGQ+Jyk7XG5cdFx0XHRcdHRhYmxlLnB1c2goJzwvdHI+Jyk7XG5cdFx0XHR9XG5cblx0XHRcdCQoJyNCQjA3Njc2Ql9FQUNBXzlCNDJfRUQ1MV80NzdEQjI5NzYwNDEnKS5odG1sKHRhYmxlLmpvaW4oJycpKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIENIRUNLIFVTRVIgU1RBVFVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsZXQgaWNvbiA9ICcnO1xuXHRcdFx0bGV0IG1lc3NhZ2UgPSAnJztcblxuXHRcdFx0aWYodmFsaWQgIT09ICdmYWxzZScpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogVkFMSUQgVVNFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYoY2VydEVuYWJsZWQgIT09ICdmYWxzZScgJiYgY2xpZW50RE5JbkFNSSAmJiBpc3N1ZXJETkluQU1JKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoIWNsaWVudEROSW5TZXNzaW9uXG5cdFx0XHRcdFx0ICAgfHxcblx0XHRcdFx0XHQgICAhaXNzdWVyRE5JblNlc3Npb25cblx0XHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0XHRtZXNzYWdlID0gJ0l0IGlzIHJlY29tbWVuZGVkIHRvIGNvbm5lY3QgdG8gQU1JIHdpdGggYSBYLjUwOSBjZXJ0aWZpY2F0ZS4nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYoY2xpZW50RE5JbkFNSSAhPT0gY2xpZW50RE5JblNlc3Npb25cblx0XHRcdFx0XHRcdCAgIHx8XG5cdFx0XHRcdFx0XHQgICBpc3N1ZXJETkluQU1JICE9PSBpc3N1ZXJETkluU2Vzc2lvblxuXHRcdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0XHRtZXNzYWdlID0gJ1RoZSBjZXJ0aWZpY2F0ZSBpbiB5b3VyIHNlc3Npb24gaXMgbm90IHRoZSBvbmUgcmVnaXN0ZXJlZCBpbiBBTUkuJztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYobWVzc2FnZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCQoJyNEOTQ0QjAxRF8yRThEXzRFRTlfOURDQ18yNjkxNDM4QkJBMTYnKS5odG1sKCc8aSBjbGFzcz1cImZhIGZhLWluZm8tY2lyY2xlIHRleHQtd2FybmluZ1wiPjwvaT4gJyArIG1lc3NhZ2UpO1xuXG5cdFx0XHRcdFx0aWNvbiA9ICc8YSBjbGFzcz1cIm5hdi1saW5rIHRleHQtd2FybmluZ1wiIGhyZWY9XCJqYXZhc2NyaXB0OmFtaUxvZ2luLmFjY291bnRTdGF0dXMoKTtcIj4nXG5cdFx0XHRcdFx0ICAgICAgICtcblx0XHRcdFx0XHQgICAgICAgJzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGVcIj48L2k+J1xuXHRcdFx0XHRcdCAgICAgICArXG5cdFx0XHRcdFx0ICAgICAgICc8L2E+J1xuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHQkKCcjRjNGRjlGNDNfREU3Ml80MEJCX0IxQkFfQjdCM0M5MDAyNjcxJykucGFyZW50KCkuY3NzKCdiYWNrZ3JvdW5kJywgJyNCOEQ0OUIgdXJsKFwiJyArIGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2ltYWdlcy9jZXJ0aWZpY2F0ZS1ncmVlbi5wbmdcIikgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXInKVxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCdiYWNrZ3JvdW5kLXNpemUnLCAnY292ZXInKVxuXHRcdFx0XHQ7XG5cblx0XHRcdFx0JCgnI0YzRkY5RjQzX0RFNzJfNDBCQl9CMUJBX0I3QjNDOTAwMjY3MScpLmNzcygnY29sb3InLCAnIzAwNjQwMCcpXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5odG1sKCc8aSBjbGFzcz1cImZhIGZhLWxlYWZcIj48L2k+IHZhbGlkIDxpIGNsYXNzPVwiZmEgZmEtbGVhZlwiPjwvaT4nKVxuXHRcdFx0XHQ7XG5cblx0XHRcdFx0JCgnI0U5MTI4MEY2X0U3QzZfM0U1M19BNDU3XzY0Njk5NUM5OTMxNycpLnRleHQobm90QmVmb3JlICsgJyAtICcgKyBub3RBZnRlcik7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdC8qIElOVkFMSUQgVVNFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKHZvbXNFbmFibGVkICE9PSAnZmFsc2UnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoIWNsaWVudEROSW5BTUlcblx0XHRcdFx0XHQgICB8fFxuXHRcdFx0XHRcdCAgICFpc3N1ZXJETkluQU1JXG5cdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0bWVzc2FnZSA9ICdSZWdpc3RlciBhIHZhbGlkIGNlcnRpZmljYXRlLic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRtZXNzYWdlID0gJ0NoZWNrIHlvdXIgVk8gcm9sZXMuJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bWVzc2FnZSA9ICdDb250YWN0IHRoZSBBTUkgdGVhbS4nO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKG1lc3NhZ2UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkKCcjRDk0NEIwMURfMkU4RF80RUU5XzlEQ0NfMjY5MTQzOEJCQTE2JykuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1pbmZvLWNpcmNsZSB0ZXh0LWRhbmdlclwiPjwvaT4gJyArIG1lc3NhZ2UpO1xuXG5cdFx0XHRcdFx0aWNvbiA9ICc8YSBjbGFzcz1cIm5hdi1saW5rIHRleHQtZGFuZ2VyXCIgaHJlZj1cImphdmFzY3JpcHQ6YW1pTG9naW4uYWNjb3VudFN0YXR1cygpO1wiPidcblx0XHRcdFx0XHQgICAgICAgK1xuXHRcdFx0XHRcdCAgICAgICAnPGkgY2xhc3M9XCJmYSBmYS1pbmZvLWNpcmNsZVwiPjwvaT4nXG5cdFx0XHRcdFx0ICAgICAgICtcblx0XHRcdFx0XHQgICAgICAgJzwvYT4nXG5cdFx0XHRcdFx0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdCQoJyNGM0ZGOUY0M19ERTcyXzQwQkJfQjFCQV9CN0IzQzkwMDI2NzEnKS5wYXJlbnQoKS5jc3MoJ2JhY2tncm91bmQnLCAnI0U4QzhDRiB1cmwoXCInICsgYW1pV2ViQXBwLm9yaWdpblVSTCArICcvaW1hZ2VzL2NlcnRpZmljYXRlLXBpbmsucG5nXCIpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyJylcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnYmFja2dyb3VuZC1zaXplJywgJ2NvdmVyJylcblx0XHRcdFx0O1xuXG5cdFx0XHRcdCQoJyNGM0ZGOUY0M19ERTcyXzQwQkJfQjFCQV9CN0IzQzkwMDI2NzEnKS5jc3MoJ2NvbG9yJywgJyM4QjAwMDAnKVxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1sZWFmXCI+PC9pPiBpbnZhbGlkIDxpIGNsYXNzPVwiZmEgZmEtbGVhZlwiPjwvaT4nKVxuXHRcdFx0XHQ7XG5cblx0XHRcdFx0JCgnI0U5MTI4MEY2X0U3QzZfM0U1M19BNDU3XzY0Njk5NUM5OTMxNycpLnRleHQobm90QmVmb3JlICsgJyAtICcgKyBub3RBZnRlcik7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogVVBEQVRFIE1FTlUgQkFSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGRpY3RbJ3VzZXInXSA9IHVzZXI7XG5cdFx0XHRkaWN0WydpY29uJ10gPSBpY29uO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRhbWlXZWJBcHAucmVwbGFjZUhUTUwoJyNhbWlfbG9naW5fbWVudV9jb250ZW50JywgdGhpcy5mcmFnbWVudExvZ291dEJ1dHRvbiwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudHJpZ2dlckxvZ2luKCkudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXG5cdFx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX2xvZ2luX21lbnVfY29udGVudCcsIHRoaXMuZnJhZ21lbnRMb2dpbkJ1dHRvbiwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudHJpZ2dlckxvZ291dCgpLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblxuXHRcdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUFVCTElDIE1FVEhPRFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBjdXJyZW50IHVzZXJcblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBjdXJyZW50IHVzZXJcblx0ICAqL1xuXG5cdGdldFVzZXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnVzZXI7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogR2V0cyB0aGUgZ3Vlc3QgdXNlclxuXHQgICogQHJldHVybnMge1N0cmluZ30gVGhlIGd1ZXN0IHVzZXJcblx0ICAqL1xuXG5cdGdldEd1ZXN0OiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5ndWVzdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBjbGllbnQgRE5cblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBjbGllbnQgRE5cblx0ICAqL1xuXG5cdGdldENsaWVudEROOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5jbGllbnRETjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBHZXRzIHRoZSBpc3N1ZXIgRE5cblx0ICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBpc3N1ZXIgRE5cblx0ICAqL1xuXG5cdGdldElzc3VlckROOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc3N1ZXJETjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDaGVja3Mgd2hldGhlciB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGlzQXV0aGVudGljYXRlZDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudXNlciAhPT0gdGhpcy5ndWVzdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAgKiBDaGVja3Mgd2hldGhlciB0aGUgdXNlciBoYXMgdGhlIGdpdmVuIHJvbGVcblx0ICAqIEBwYXJhbSB7U3RyaW5nfSByb2xlIHRoZSByb2xlXG5cdCAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICAqL1xuXG5cdGhhc1JvbGU6IGZ1bmN0aW9uKHJvbGVOYW1lKVxuXHR7XG5cdFx0cmV0dXJuIHJvbGVOYW1lIGluIHRoaXMucm9sZUluZm87XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogT3BlbnMgdGhlICdTU08nIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0c3NvOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jbGVhbigpO1xuXG5cdFx0d2luZG93Lm9wZW4odGhpcy5zc29JbmZvLnVybCwgJ1NpbmdsZSBTaWduLU9uJywgJ21lbnViYXI9bm8sIHN0YXR1cz1ubywgc2Nyb2xsYmFycz1ubywgd2lkdGg9ODAwLCBoZWlnaHQ9NDUwJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogT3BlbnMgdGhlICdTaWduSW4nIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0c2lnbkluOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jbGVhbigpO1xuXG5cdFx0JCgnI0QyQjVGQURFXzk3QTNfNEI4Q184NTYxXzdBOUFFQUNEQkU1QicpLm1vZGFsKCdzaG93Jyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogT3BlbnMgdGhlICdDaGFuZ2UgSW5mbycgbW9kYWwgd2luZG93XG5cdCAgKi9cblxuXHRjaGFuZ2VJbmZvOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLl9jbGVhbigpO1xuXG5cdFx0JCgnI0Q5RUFGOTk4X0VEOEVfNDREMl9BMEJFXzhDNUNGNUU0MzhCRCcpLm1vZGFsKCdzaG93Jyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgICogT3BlbnMgdGhlICdDaGFuZ2UgUGFzc3dvcmQnIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0Y2hhbmdlUGFzczogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblxuXHRcdCQoJyNFOTJBMTA5N185ODNCXzQ4NTdfODc1Rl8wN0U0NjU5QjQxQjAnKS5tb2RhbCgnc2hvdycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIE9wZW5zIHRoZSAnQWNjb3VudCBTdGF0dXMnIG1vZGFsIHdpbmRvd1xuXHQgICovXG5cblx0YWNjb3VudFN0YXR1czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5fY2xlYW4oKTtcblxuXHRcdCQoJyNBQjFDQjE4M185NkVCXzQxMTZfOEE5RV80NDA5QkUwNThGMzQnKS5tb2RhbCgnc2hvdycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICAqIFNpZ25zIG91dFxuXHQgICovXG5cblx0c2lnbk91dDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdHJldHVybiBhbWlDb21tYW5kLmxvZ291dCgpLmFsd2F5cygoZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKSA9PiB7XG5cblx0XHRcdHRoaXMuX3VwZGF0ZSh1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuX3VubG9jaygpO1xuXG5cdFx0XHR9LCAobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fbG9naW46IGZ1bmN0aW9uKGUpXG5cdHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRjb25zdCB2YWx1ZXMgPSAkKGUudGFyZ2V0KS5zZXJpYWxpemVPYmplY3QoKTtcblxuXHRcdHJldHVybiB0aGlzLmZvcm1fbG9naW4yKHZhbHVlc1sndXNlciddLCB2YWx1ZXNbJ3Bhc3MnXSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fbG9naW4yOiBmdW5jdGlvbih1c2VyLCBwYXNzKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBwcm9taXNlID0gKHVzZXIgJiYgcGFzcykgPyBhbWlDb21tYW5kLnBhc3NMb2dpbih1c2VyLnRyaW0oKSwgcGFzcy50cmltKCkpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYW1pQ29tbWFuZC5jZXJ0TG9naW4oLyotLS0tLS0tLS0tLS0tLS0tLS0tLSovKVxuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdHByb21pc2UudGhlbigoZGF0YSwgbWVzc2FnZSwgdXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKSA9PiB7XG5cblx0XHRcdHRoaXMuX3VwZGF0ZSh1c2VySW5mbywgcm9sZUluZm8sIHVkcEluZm8sIHNzb0luZm8pLnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdGlmKHVzZXJJbmZvLkFNSVVzZXIgIT09IHVzZXJJbmZvLmd1ZXN0VXNlcilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCQoJyNEMkI1RkFERV85N0EzXzRCOENfODU2MV83QTlBRUFDREJFNUInKS5tb2RhbCgnaGlkZScpO1xuXG5cdFx0XHRcdFx0dGhpcy5fdW5sb2NrKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRpZih1c2VySW5mby5BTUlVc2VyICE9PSB1c2VySW5mby5ndWVzdFVzZXIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkKCcjRDJCNUZBREVfOTdBM180QjhDXzg1NjFfN0E5QUVBQ0RCRTVCJykubW9kYWwoJ2hpZGUnKTtcblxuXHRcdFx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYodXNlckluZm8uQU1JVXNlciA9PT0gdXNlckluZm8uZ3Vlc3RVc2VyKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgbWVzc2FnZSA9ICdBdXRoZW50aWNhdGlvbiBmYWlsZWQuJztcblxuXHRcdFx0XHRpZih1c2VySW5mby5jbGllbnRETkluU2Vzc2lvbiB8fCB1c2VySW5mby5pc3N1ZXJETkluU2Vzc2lvbilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG1lc3NhZ2UgKz0gJyBDbGllbnQgRE4gaW4gc2Vzc2lvbjogJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKHVzZXJJbmZvLmNsaWVudEROSW5TZXNzaW9uKSArICcuJ1xuXHRcdFx0XHRcdCAgICAgICAgICAgK1xuXHRcdFx0XHRcdCAgICAgICAgICAgJyBJc3N1ZXIgRE4gaW4gc2Vzc2lvbjogJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKHVzZXJJbmZvLmlzc3VlckROSW5TZXNzaW9uKSArICcuJ1xuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdFx0fVxuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UsIHVzZXJJbmZvLCByb2xlSW5mbywgdWRwSW5mbywgc3NvSW5mbykgPT4ge1xuXG5cdFx0XHR0aGlzLl91cGRhdGUodXNlckluZm8sIHJvbGVJbmZvLCB1ZHBJbmZvLCBzc29JbmZvKS5hbHdheXMoKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9hdHRhY2hDZXJ0OiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVzZXIgPSAkKCcjRTY0RjI0QjJfMzNFNl80REVEXzlCMjRfMjhCRTA0MjE5NjEzJykudmFsKCk7XG5cdFx0Y29uc3QgcGFzcyA9ICQoJyNBNERGRDAzOV8wMzRGXzREMTBfOTY2OF8zODVBRUY0RkJCQjknKS52YWwoKTtcblxuXHRcdGlmKCF1c2VyIHx8ICFwYXNzKVxuXHRcdHtcblx0XHRcdHRoaXMuX2Vycm9yKCdQbGVhc2UsIGZpbGwgYWxsIGZpZWxkcyB3aXRoIGEgcmVkIHN0YXIuJyk7XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmF0dGFjaENlcnQodXNlciwgcGFzcykudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9kZXRhY2hDZXJ0OiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHVzZXIgPSAkKCcjRTY0RjI0QjJfMzNFNl80REVEXzlCMjRfMjhCRTA0MjE5NjEzJykudmFsKCk7XG5cdFx0Y29uc3QgcGFzcyA9ICQoJyNBNERGRDAzOV8wMzRGXzREMTBfOTY2OF8zODVBRUY0RkJCQjknKS52YWwoKTtcblxuXHRcdGlmKCF1c2VyIHx8ICFwYXNzKVxuXHRcdHtcblx0XHRcdHRoaXMuX2Vycm9yKCdQbGVhc2UsIGZpbGwgYWxsIGZpZWxkcyB3aXRoIGEgcmVkIHN0YXIuJyk7XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmRldGFjaENlcnQodXNlciwgcGFzcykudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9hZGRVc2VyOiBmdW5jdGlvbihlKVxuXHR7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB2YWx1ZXMgPSAkKGUudGFyZ2V0KS5zZXJpYWxpemVPYmplY3QoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdGFtaUNvbW1hbmQuYWRkVXNlcih2YWx1ZXNbJ2xvZ2luJ10sIHZhbHVlc1sncGFzcyddLCB2YWx1ZXNbJ2ZpcnN0X25hbWUnXSwgdmFsdWVzWydsYXN0X25hbWUnXSwgdmFsdWVzWydlbWFpbCddLCAnYXR0YWNoJyBpbiB2YWx1ZXMsICdhZ3JlZScgaW4gdmFsdWVzKS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX3N1Y2Nlc3MobWVzc2FnZSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtX3JlbWluZFBhc3M6IGZ1bmN0aW9uKGUpXG5cdHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHZhbHVlcyA9ICQoZS50YXJnZXQpLnNlcmlhbGl6ZU9iamVjdCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5yZXNldFBhc3ModmFsdWVzWyd1c2VyJ10pLnRoZW4oKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdH0sIChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX2Vycm9yKG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1fY2hhbmdlSW5mbzogZnVuY3Rpb24oZSlcblx0e1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gJChlLnRhcmdldCkuc2VyaWFsaXplT2JqZWN0KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmNoYW5nZUluZm8odmFsdWVzWydmaXJzdF9uYW1lJ10sIHZhbHVlc1snbGFzdF9uYW1lJ10sIHZhbHVlc1snZW1haWwnXSkudGhlbigoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0fSwgKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5fZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybV9jaGFuZ2VQYXNzOiBmdW5jdGlvbihlKVxuXHR7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB2YWx1ZXMgPSAkKGUudGFyZ2V0KS5zZXJpYWxpemVPYmplY3QoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdGFtaUNvbW1hbmQuY2hhbmdlUGFzcyh0aGlzLnVzZXIsIHZhbHVlc1snb2xkX3Bhc3MnXSwgdmFsdWVzWyduZXdfcGFzcyddKS50aGVuKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuX3N1Y2Nlc3MobWVzc2FnZSk7XG5cblx0XHR9LCAoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9lcnJvcihtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29yayAtIEFNSURvYy5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE5IFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG52YXIgYW1pRG9jID0ge1wiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcIiRBTUlOYW1lc3BhY2VcIixcImRlc2NcIjpcIkNyZWF0ZSBhIG5ldyBuYW1lc3BhY2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCIkbmFtZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgbmFtZXNwYWNlIG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCIkZGVzY3JcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIG5hbWVzcGFjZSBib2R5XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCIkQU1JSW50ZXJmYWNlXCIsXCJkZXNjXCI6XCJDcmVhdGUgYSBuZXcgaW50ZXJmYWNlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiJG5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGludGVyZmFjZSBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiJGRlc2NyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBpbnRlcmZhY2UgYm9keVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwiJEFNSUNsYXNzXCIsXCJkZXNjXCI6XCJDcmVhdGUgYSBuZXcgY2xhc3NcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCIkbmFtZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgY2xhc3MgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIiRkZXNjclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgY2xhc3MgYm9keVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XX1dLFwibmFtZXNwYWNlc1wiOlt7XCJuYW1lXCI6XCJhbWlSb3V0ZXJcIixcImRlc2NcIjpcIlRoZSBBTUkgdXJsIHJvdXRpbmcgc3Vic3lzdGVtXCIsXCJmdW5jdGlvbnNcIjpbe1wibmFtZVwiOlwiZ2V0U2NyaXB0VVJMXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBBV0YncyBzY3JpcHQgVVJMXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgQVdGJ3Mgc2NyaXB0IFVSTFwifV19LHtcIm5hbWVcIjpcImdldE9yaWdpblVSTFwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgb3JpZ2luIFVSTFwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIG9yaWdpbiBVUkxcIn1dfSx7XCJuYW1lXCI6XCJnZXRXZWJBcHBVUkxcIixcImRlc2NcIjpcIkdldHMgdGhlIHdlYmFwcCBVUkxcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSB3ZWJhcHAgVVJMXCJ9XX0se1wibmFtZVwiOlwiZ2V0SGFzaFwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgYW5jaG9yIHBhcnQgb2YgdGhlIHdlYmFwcCBVUkxcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBhbmNob3IgcGFydCBvZiB0aGUgd2ViYXBwIFVSTFwifV19LHtcIm5hbWVcIjpcImdldEFyZ3NcIixcImRlc2NcIjpcIkdldHMgdGhlIGFyZ3VtZW50cyBleHRyYWN0ZWQgZnJvbSB0aGUgd2ViYXBwIFVSTFwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkFycmF5LjxTdHJpbmc+XCIsXCJkZXNjXCI6XCJUaGUgYXJndW1lbnRzIGV4dHJhY3RlZCBmcm9tIHRoZSB3ZWJhcHAgVVJMXCJ9XX0se1wibmFtZVwiOlwiYXBwZW5kXCIsXCJkZXNjXCI6XCJBcHBlbmRzIGEgcm91dGluZyBydWxlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicmVnRXhwXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSByZWdFeHBcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJoYW5kbGVyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcInRoZSBoYW5kbGVyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJOYW1lc3BhY2VcIixcImRlc2NcIjpcIlRoZSBhbWlSb3V0ZXIgc2luZ2xldG9uXCJ9XX0se1wibmFtZVwiOlwicmVtb3ZlXCIsXCJkZXNjXCI6XCJSZW1vdmVzIHNvbWUgcm91dGluZyBydWxlc1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInJlZ0V4cFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcmVnRXhwXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJOYW1lc3BhY2VcIixcImRlc2NcIjpcIlRoZSBhbWlSb3V0ZXIgc2luZ2xldG9uXCJ9XX0se1wibmFtZVwiOlwiY2hlY2tcIixcImRlc2NcIjpcIkNoZWNrcyB3aGV0aGVyIHRoZSBVUkwgbWF0Y2hlcyB3aXRoIGEgcm91dGluZyBydWxlXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiXCJ9XX0se1wibmFtZVwiOlwiYXBwZW5kSGlzdG9yeUVudHJ5XCIsXCJkZXNjXCI6XCJBcHBlbmQgYSBuZXcgaGlzdG9yeSBlbnRyeVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhdGhcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIG5ldyBwYXRoXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udGV4dFwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgbmV3IGNvbnRleHRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19LHtcIm5hbWVcIjpcInJlcGxhY2VIaXN0b3J5RW50cnlcIixcImRlc2NcIjpcIlJlcGxhY2UgdGhlIGN1cnJlbnQgaGlzdG9yeSBlbnRyeVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhdGhcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIG5ldyBwYXRoXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udGV4dFwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJ0aGUgbmV3IGNvbnRleHRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19XX0se1wibmFtZVwiOlwiYW1pV2ViQXBwXCIsXCJkZXNjXCI6XCJUaGUgQU1JIHdlYmFwcCBzdWJzeXN0ZW1cIixcInZhcmlhYmxlc1wiOlt7XCJuYW1lXCI6XCJvcmlnaW5VUkxcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIG9yaWdpbiBVUkxcIn0se1wibmFtZVwiOlwid2ViQXBwVVJMXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSB3ZWJhcHAgVVJMXCJ9LHtcIm5hbWVcIjpcImhhc2hcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGFuY2hvciBwYXJ0IG9mIHRoZSB3ZWJhcHAgVVJMXCJ9LHtcIm5hbWVcIjpcImFyZ3NcIixcInR5cGVcIjpcIkFycmF5LjxTdHJpbmc+XCIsXCJkZXNjXCI6XCJUaGUgYXJndW1lbnRzIGV4dHJhY3RlZCBmcm9tIHRoZSB3ZWJhcHAgVVJMXCJ9XSxcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJpc0VtYmVkZGVkXCIsXCJkZXNjXCI6XCJDaGVja3Mgd2hldGhlciB0aGUgV2ViQXBwIGlzIGV4ZWN1dGVkIGluIGVtYmVkZGVkIG1vZGVcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJpc0xvY2FsXCIsXCJkZXNjXCI6XCJDaGVja3Mgd2hldGhlciB0aGUgV2ViQXBwIGlzIGV4ZWN1dGVkIGxvY2FsbHkgKGZpbGU6Ly8sIGxvY2FsaG9zdCwgMTI3LjAuMC4xIG9yIDo6MSlcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJ0ZXh0VG9IdG1sXCIsXCJkZXNjXCI6XCJFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIEhUTUxcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVuZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwiaHRtbFRvVGV4dFwiLFwiZGVzY1wiOlwiVW5lc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBIVE1MIHRvIHRleHRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSB1bmVzY2FwZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwidGV4dFRvU3RyaW5nXCIsXCJkZXNjXCI6XCJFc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSB0ZXh0IHRvIEphdmFTY3JpcHQgc3RyaW5nXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1bmVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBlc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcInN0cmluZ1RvVGV4dFwiLFwiZGVzY1wiOlwiVW5lc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBKYXZhU2NyaXB0IHN0cmluZyB0byB0ZXh0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgdW5lc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcImh0bWxUb1N0cmluZ1wiLFwiZGVzY1wiOlwiRXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSFRNTCB0byBKYXZhU2NyaXB0IHN0cmluZ1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdW5lc2NhcGVkIHN0cmluZ1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJzdHJpbmdUb0h0bWxcIixcImRlc2NcIjpcIlVuZXNjYXBlcyB0aGUgZ2l2ZW4gc3RyaW5nIGZyb20gSmF2YVNjcmlwdCBzdHJpbmcgdG8gSFRNTFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHVuZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJ0ZXh0VG9TUUxcIixcImRlc2NcIjpcIkVzY2FwZXMgdGhlIGdpdmVuIHN0cmluZyBmcm9tIHRleHQgdG8gU1FMXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic3RyaW5nXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1bmVzY2FwZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBlc2NhcGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcInNxbFRvVGV4dFwiLFwiZGVzY1wiOlwiVW5lc2NhcGVzIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBTUUwgdG8gdGV4dFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZXNjYXBlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHVuZXNjYXBlZCBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJiYXNlNjRFbmNvZGVcIixcImRlc2NcIjpcIkVuY29kZXMgKFJGQyA0NjQ4KSBhIHN0cmluZ1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInN0cmluZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZGVjb2RlZCBzdHJpbmdcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGVuY29kZWQgc3RyaW5nXCJ9XX0se1wibmFtZVwiOlwiYmFzZTY0RGVjb2RlXCIsXCJkZXNjXCI6XCJEZWNvZGVzIChSRkMgNDY0OCkgYSBzdHJpbmdcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdHJpbmdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGVuY29kZWQgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBkZWNvZGVkIHN0cmluZ1wifV19LHtcIm5hbWVcIjpcImxvYWRSZXNvdXJjZXNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIHJlc291cmNlcyBieSBleHRlbnNpb25cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRTaGVldHNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIENTUyBzaGVldHNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRTY3JpcHRzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBKUyBzY3JpcHRzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkSlNPTnNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIEpTT04gZmlsZXNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRYTUxzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBYTUwgZmlsZXNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRIVE1Mc1wiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgSFRNTCBmaWxlc1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVybHNcIixcInR5cGVcIjpbXCJBcnJheVwiLFwiU3RyaW5nXCJdLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIHVybHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFRXSUdzXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBUV0lHIGZpbGVzXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXJsc1wiLFwidHlwZVwiOltcIkFycmF5XCIsXCJTdHJpbmdcIl0sXCJkZXNjXCI6XCJ0aGUgYXJyYXkgb2YgdXJsc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJsb2FkVGV4dHNcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGxvYWRzIHRleHQgZmlsZXNcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1cmxzXCIsXCJ0eXBlXCI6W1wiQXJyYXlcIixcIlN0cmluZ1wiXSxcImRlc2NcIjpcInRoZSBhcnJheSBvZiB1cmxzXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInJlcGxhY2VIVE1MXCIsXCJkZXNjXCI6XCJQdXRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJwcmVwZW5kSFRNTFwiLFwiZGVzY1wiOlwiUHJlcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImFwcGVuZEhUTUxcIixcImRlc2NcIjpcIkFwcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImZvcm1hdFRXSUdcIixcImRlc2NcIjpcIkludGVycHJldGVzIHRoZSBnaXZlbiBUV0lHIHN0cmluZywgc2VlIHtAbGluayBodHRwOi8vdHdpZy5zZW5zaW9sYWJzLm9yZy9kb2N1bWVudGF0aW9ufVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgc3RyaW5nXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZGljdFwiLFwidHlwZVwiOltcIk9iamVjdFwiLFwiQXJyYXlcIl0sXCJkZXNjXCI6XCJ0aGUgZGljdGlvbmFyeVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgSW50ZXJwcmV0ZWQgVFdJRyBzdHJpbmdcIn1dfSx7XCJuYW1lXCI6XCJqc3BhdGhcIixcImRlc2NcIjpcIkZpbmRzIGRhdGEgd2l0aGluIHRoZSBnaXZlbiBKU09OLCBzZWUge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9kZmlsYXRvdi9qc3BhdGh9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGF0aFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcGF0aFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImpzb25cIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwidGhlIEpTT05cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkFycmF5XCIsXCJkZXNjXCI6XCJUaGUgcmVzdWx0aW5nIGFycmF5XCJ9XX0se1wibmFtZVwiOlwibG9ja1wiLFwiZGVzY1wiOlwiTG9ja3MgdGhlIFdlYiBhcHBsaWNhdGlvblwiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcInVubG9ja1wiLFwiZGVzY1wiOlwiVW5sb2NrcyB0aGUgV2ViIGFwcGxpY2F0aW9uXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiY2FuTGVhdmVcIixcImRlc2NcIjpcIkVuYWJsZXMgdGhlIG1lc3NhZ2UgaW4gYSBjb25maXJtYXRpb24gZGlhbG9nIGJveCB0byBpbmZvcm0gdGhhdCB0aGUgdXNlciBpcyBhYm91dCB0byBsZWF2ZSB0aGUgY3VycmVudCBwYWdlLlwiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImNhbm5vdExlYXZlXCIsXCJkZXNjXCI6XCJEaXNhYmxlcyB0aGUgbWVzc2FnZSBpbiBhIGNvbmZpcm1hdGlvbiBkaWFsb2cgYm94IHRvIGluZm9ybSB0aGF0IHRoZSB1c2VyIGlzIGFib3V0IHRvIGxlYXZlIHRoZSBjdXJyZW50IHBhZ2UuXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiaW5mb1wiLFwiZGVzY1wiOlwiU2hvd3MgYW4gJ2luZm8nIG1lc3NhZ2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJtZXNzYWdlXCIsXCJ0eXBlXCI6W1wiU3RyaW5nXCIsXCJBcnJheVwiXSxcImRlc2NcIjpcInRoZSBtZXNzYWdlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmFkZU91dFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcInN1Y2Nlc3NcIixcImRlc2NcIjpcIlNob3dzIGEgJ3N1Y2Nlc3MnIG1lc3NhZ2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJtZXNzYWdlXCIsXCJ0eXBlXCI6W1wiU3RyaW5nXCIsXCJBcnJheVwiXSxcImRlc2NcIjpcInRoZSBtZXNzYWdlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmFkZU91dFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcIndhcm5pbmdcIixcImRlc2NcIjpcIlNob3dzIGEgJ3dhcm5pbmcnIG1lc3NhZ2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJtZXNzYWdlXCIsXCJ0eXBlXCI6W1wiU3RyaW5nXCIsXCJBcnJheVwiXSxcImRlc2NcIjpcInRoZSBtZXNzYWdlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmFkZU91dFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcImVycm9yXCIsXCJkZXNjXCI6XCJTaG93cyBhbiAnZXJyb3InIG1lc3NhZ2VcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJtZXNzYWdlXCIsXCJ0eXBlXCI6W1wiU3RyaW5nXCIsXCJBcnJheVwiXSxcImRlc2NcIjpcInRoZSBtZXNzYWdlXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiZmFkZU91dFwiLFwidHlwZVwiOlwiQm9vbGVhblwiLFwiZGVzY1wiOlwiaWYgVHJ1ZSwgdGhlIG1lc3NhZ2UgZGlzYXBwZWFycyBhZnRlciA2MHNcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcImZsdXNoXCIsXCJkZXNjXCI6XCJGbHVzaGVzIG1lc3NhZ2VzXCIsXCJwYXJhbXNcIjpbXX0se1wibmFtZVwiOlwiZmlsbEJyZWFkY3J1bWJcIixcImRlc2NcIjpcIkZpbGwgdGhlIG1haW4gYnJlYWRjcnVtYlwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcIml0ZW1zXCIsXCJ0eXBlXCI6XCJBcnJheVwiLFwiZGVzY1wiOlwidGhlIGFycmF5IG9mIGl0ZW1zIChIVE1MIGZvcm1hdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcInN0YXJ0XCIsXCJkZXNjXCI6XCJTdGFydHMgdGhlIFdlYiBhcHBsaWNhdGlvblwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGxvZ29fdXJsLCBob21lX3VybCwgY29udGFjdF9lbWFpbCwgYWJvdXRfdXJsLCB0aGVtZV91cmwsIGxvY2tlcl91cmwsIGNoYW5nZV9wYXNzb3JkX2FsbG93ZWQsIGNoYW5nZV91c2VyX2luZm9fYWxsb3dlZCwgY2hhbmdlX3Bhc3NvcmRfYWxsb3dlZClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV19LHtcIm5hbWVcIjpcImxvYWRDb250cm9sXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBsb2FkcyBhIGNvbnRyb2xcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJjb250cm9sXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBhcnJheSBvZiBjb250cm9sIG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiY3JlYXRlQ29udHJvbFwiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgY3JlYXRlIGEgY29udHJvbFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhcmVudFwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJvd25lclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250cm9sXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhcmFtc1wiLFwidHlwZVwiOlwiQXJyYXlcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjcmVhdGVDb250cm9sSW5Cb2R5XCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sIGluIGEgY29udGFpbmVyXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwicGFyZW50XCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIm93bmVyXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImNvbnRyb2xcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFyYW1zV2l0aG91dFNldHRpbmdzXCIsXCJ0eXBlXCI6XCJBcnJheVwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udHJvbFNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhcmVudFNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcIj8/P1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjcmVhdGVDb250cm9sSW5Db250YWluZXJcIixcImRlc2NcIjpcIkFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhIGNvbnRyb2wgaW4gYSBjb250YWluZXJcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJwYXJlbnRcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwib3duZXJcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiY29udHJvbFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXJhbXNXaXRob3V0U2V0dGluZ3NcIixcInR5cGVcIjpcIkFycmF5XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJjb250cm9sU2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFyZW50U2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiPz8/XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwiaWNvblwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0aXRsZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiY3JlYXRlQ29udHJvbEZyb21XZWJMaW5rXCIsXCJkZXNjXCI6XCJBc3luY2hyb25vdXNseSBjcmVhdGUgYSBjb250cm9sIGluIGEgY29udGFpbmVyIGZyb20gYSBXRUIgbGlua1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInBhcmVudFwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJvd25lclwiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJlbFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXJlbnRTZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCI/Pz9cIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwibG9hZFN1YkFwcFwiLFwiZGVzY1wiOlwiQXN5bmNocm9ub3VzbHkgbG9hZHMgYSBzdWJhcHBcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzdWJhcHBcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHN1YmFwcFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ0aGUgdXNlciBkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvYWRTdWJBcHBCeVVSTFwiLFwiZGVzY1wiOlwiTG9hZHMgYSBzdWJhcHAgYnkgVVJMXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiZGVmYXVsdFN1YkFwcFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJpZiAnYW1pV2ViQXBwLmFyZ3NbXFxcInN1YmFwcFxcXCJdJyBpcyBudWxsLCB0aGUgZGVmYXVsdCBzdWJhcHBcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJkZWZhdWx0VXNlckRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcImlmICdhbWlXZWJBcHAuYXJnc1tcXFwidXNlcmRhdGFcXFwiXScgaXMgbnVsbCwgdGhlIGRlZmF1bHQgdXNlciBkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfV0sXCJldmVudHNcIjpbe1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiVGhpcyBtZXRob2QgbXVzdCBiZSBvdmVybG9hZGVkIGFuZCBpcyBjYWxsZWQgd2hlbiB0aGUgV2ViIGFwcGxpY2F0aW9uIHN0YXJ0c1wiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJEYXRhXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwib25SZWZyZXNoXCIsXCJkZXNjXCI6XCJUaGlzIG1ldGhvZCBtdXN0IGJlIG92ZXJsb2FkZWQgYW5kIGlzIGNhbGxlZCB3aGVuIHRoZSB0b29sYmFyIG5lZWRzIHRvIGJlIHVwZGF0ZWRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJpc0F1dGhcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX1dfSx7XCJuYW1lXCI6XCJhbWlDb21tYW5kXCIsXCJkZXNjXCI6XCJUaGUgQU1JIGNvbW1hbmQgc3Vic3lzdGVtXCIsXCJ2YXJpYWJsZXNcIjpbe1wibmFtZVwiOlwiZW5kcG9pbnRcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiRGVmYXVsdCBlbmRwb2ludFwifSx7XCJuYW1lXCI6XCJjb252ZXJ0ZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiRGVmYXVsdCBjb252ZXJ0ZXJcIn1dLFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcImV4ZWN1dGVcIixcImRlc2NcIjpcIkV4ZWN1dGVzIGFuIEFNSSBjb21tYW5kXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiY29tbWFuZFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgY29tbWFuZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGVuZHBvaW50LCBjb252ZXJ0ZXIsIHRpbWVvdXQsIGV4dHJhUGFyYW0sIGV4dHJhVmFsdWUpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJwYXNzTG9naW5cIixcImRlc2NcIjpcIkxvZ3MgaW4gYnkgbG9naW4vcGFzc3dvcmRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJ1c2VyXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1c2VyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwicGFzc1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgcGFzc3dvcmRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiY2VydExvZ2luXCIsXCJkZXNjXCI6XCJMb2dzIGluIGJ5IGNlcnRpZmljYXRlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImxvZ291dFwiLFwiZGVzY1wiOlwiTG9ncyBvdXRcIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiYXR0YWNoQ2VydFwiLFwiZGVzY1wiOlwiQXR0YWNoZXMgYSBjZXJ0aWZpY2F0ZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVzZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXNzXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBwYXNzd29yZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJkZXRhY2hDZXJ0XCIsXCJkZXNjXCI6XCJEZXRhY2hlcyBhIGNlcnRpZmljYXRlXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInBhc3NcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHBhc3N3b3JkXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImFkZFVzZXJcIixcImRlc2NcIjpcIkFkZHMgYSBuZXcgdXNlclwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVzZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJwYXNzXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBwYXNzd29yZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImZpcnN0TmFtZVwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZmlyc3QgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImxhc3ROYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBsYXN0IG5hbWVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJlbWFpbFwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgZW1haWxcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJhdHRhY2hcIixcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcImF0dGFjaCB0aGUgY3VycmVudCBjZXJ0aWZpY2F0ZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImFncmVlXCIsXCJ0eXBlXCI6XCJCb29sZWFuXCIsXCJkZXNjXCI6XCJhZ3JlZSB3aXRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9uc1wiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjaGFuZ2VJbmZvXCIsXCJkZXNjXCI6XCJDaGFuZ2VzIHRoZSBhY2NvdW50IGluZm9ybWF0aW9uXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiZmlyc3ROYW1lXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBmaXJzdCBuYW1lXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwibGFzdE5hbWVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIGxhc3QgbmFtZVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcImVtYWlsXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBlbWFpbFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJjaGFuZ2VQYXNzXCIsXCJkZXNjXCI6XCJDaGFuZ2VzIHRoZSBhY2NvdW50IHBhc3N3b3JkXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdXNlclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIm9sZFBhc3NcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIG9sZCBwYXNzd29yZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcIm5ld1Bhc3NcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIG5ldyBwYXNzd29yZFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJyZXNldFBhc3NcIixcImRlc2NcIjpcIlJlc2V0cyB0aGUgYWNjb3VudCBwYXNzd29yZFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVzZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX1dfSx7XCJuYW1lXCI6XCJhbWlMb2dpblwiLFwiZGVzY1wiOlwiVGhlIEFNSSBhdXRoZW50aWNhdGlvbiBzdWJzeXN0ZW1cIixcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJnZXRVc2VyXCIsXCJkZXNjXCI6XCJHZXRzIHRoZSBjdXJyZW50IHVzZXJcIixcInBhcmFtc1wiOltdLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBjdXJyZW50IHVzZXJcIn1dfSx7XCJuYW1lXCI6XCJnZXRHdWVzdFwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgZ3Vlc3QgdXNlclwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGd1ZXN0IHVzZXJcIn1dfSx7XCJuYW1lXCI6XCJnZXRDbGllbnRETlwiLFwiZGVzY1wiOlwiR2V0cyB0aGUgY2xpZW50IEROXCIsXCJwYXJhbXNcIjpbXSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJUaGUgY2xpZW50IEROXCJ9XX0se1wibmFtZVwiOlwiZ2V0SXNzdWVyRE5cIixcImRlc2NcIjpcIkdldHMgdGhlIGlzc3VlciBETlwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIGlzc3VlciBETlwifV19LHtcIm5hbWVcIjpcImlzQXV0aGVudGljYXRlZFwiLFwiZGVzY1wiOlwiQ2hlY2tzIHdoZXRoZXIgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZFwiLFwicGFyYW1zXCI6W10sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19LHtcIm5hbWVcIjpcImhhc1JvbGVcIixcImRlc2NcIjpcIkNoZWNrcyB3aGV0aGVyIHRoZSB1c2VyIGhhcyB0aGUgZ2l2ZW4gcm9sZVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInJvbGVcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHJvbGVcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIkJvb2xlYW5cIixcImRlc2NcIjpcIlwifV19LHtcIm5hbWVcIjpcInNzb1wiLFwiZGVzY1wiOlwiT3BlbnMgdGhlICdTU08nIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcInNpZ25JblwiLFwiZGVzY1wiOlwiT3BlbnMgdGhlICdTaWduSW4nIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImNoYW5nZUluZm9cIixcImRlc2NcIjpcIk9wZW5zIHRoZSAnQ2hhbmdlIEluZm8nIG1vZGFsIHdpbmRvd1wiLFwicGFyYW1zXCI6W119LHtcIm5hbWVcIjpcImNoYW5nZVBhc3NcIixcImRlc2NcIjpcIk9wZW5zIHRoZSAnQ2hhbmdlIFBhc3N3b3JkJyBtb2RhbCB3aW5kb3dcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJhY2NvdW50U3RhdHVzXCIsXCJkZXNjXCI6XCJPcGVucyB0aGUgJ0FjY291bnQgU3RhdHVzJyBtb2RhbCB3aW5kb3dcIixcInBhcmFtc1wiOltdfSx7XCJuYW1lXCI6XCJzaWduT3V0XCIsXCJkZXNjXCI6XCJTaWducyBvdXRcIixcInBhcmFtc1wiOltdfV19XSxcImludGVyZmFjZXNcIjpbe1wibmFtZVwiOlwiYW1pLklDb250cm9sXCIsXCJkZXNjXCI6XCJUaGUgQU1JIGNvbnRyb2wgaW50ZXJmYWNlXCIsXCJpbXBsZW1lbnRzXCI6W10sXCJpbmhlcml0c1wiOltdLFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcInBhdGNoSWRcIixcImRlc2NcIjpcIlBhdGNoZXMgYW4gSFRNTCBpZGVudGlmaWVyXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwiaWRcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHVucGF0Y2hlZCBIVE1MIGlkZW50aWZpZXJcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwiVGhlIHBhdGNoZWQgSFRNTCBpZGVudGlmaWVyXCJ9XX0se1wibmFtZVwiOlwicmVwbGFjZUhUTUxcIixcImRlc2NcIjpcIlB1dHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcInByZXBlbmRIVE1MXCIsXCJkZXNjXCI6XCJQcmVwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwiYXBwZW5kSFRNTFwiLFwiZGVzY1wiOlwiQXBwZW5kcyBhIEhUTUwgb3IgVFdJRyBmcmFnbWVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0LCBzZWUgbWV0aG9kIFtmb3JtYXRUV0lHXXtAbGluayAjanNkb2NfbWV0aG9kX2Zvcm1hdFRXSUd9XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwic2VsZWN0b3JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIHRhcmdldCBzZWxlY3RvclwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInR3aWdcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGVzY1wiOlwidGhlIFRXSUcgZnJhZ21lbnRcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJzZXR0aW5nc1wiLFwidHlwZVwiOlwiT2JqZWN0XCIsXCJkZXNjXCI6XCJkaWN0aW9uYXJ5IG9mIHNldHRpbmdzIChjb250ZXh0LCBkaWN0KVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOnRydWUsXCJudWxsYWJsZVwiOlwiXCJ9XSxcInJldHVybnNcIjpbe1widHlwZVwiOlwiJC5EZWZlcnJlZFwiLFwiZGVzY1wiOlwiQSBKUXVlcnkgZGVmZXJyZWQgb2JqZWN0XCJ9XX0se1wibmFtZVwiOlwib25SZWFkeVwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgaXMgcmVhZHkgdG8gcnVuXCIsXCJwYXJhbXNcIjpbXX1dfSx7XCJuYW1lXCI6XCJhbWkuSVN1YkFwcFwiLFwiZGVzY1wiOlwiVGhlIEFNSSBzdWItYXBwbGljYXRpb24gaW50ZXJmYWNlXCIsXCJpbXBsZW1lbnRzXCI6W10sXCJpbmhlcml0c1wiOltdLFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcIm9uUmVhZHlcIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIHRoZSBzdWItYXBwbGljYXRpb24gaXMgcmVhZHkgdG8gcnVuXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkV4aXRcIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIHRoZSBzdWItYXBwbGljYXRpb24gaXMgYWJvdXQgdG8gZXhpdFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ1c2VyZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwib25Mb2dpblwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gbG9nZ2luZyBpblwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ1c2VyZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwib25Mb2dvdXRcIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIGxvZ2dpbmcgb3V0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfV19XSxcImNsYXNzZXNcIjpbe1wibmFtZVwiOlwiYW1pLkNvbnRyb2xcIixcImRlc2NcIjpcIlRoZSBiYXNpYyBBTUkgY29udHJvbFwiLFwiaW1wbGVtZW50c1wiOltcImFtaS5JQ29udHJvbFwiXSxcImluaGVyaXRzXCI6W10sXCJrb25zdHJ1Y3RvclwiOntcIm5hbWVcIjpcIkNvbnRyb2xcIixcInBhcmFtc1wiOltdfSxcImZ1bmN0aW9uc1wiOlt7XCJuYW1lXCI6XCJwYXRjaElkXCIsXCJkZXNjXCI6XCJQYXRjaGVzIGFuIEhUTUwgaWRlbnRpZmllclwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcImlkXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB1bnBhdGNoZWQgSFRNTCBpZGVudGlmaWVyXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcIlRoZSBwYXRjaGVkIEhUTUwgaWRlbnRpZmllclwifV19LHtcIm5hbWVcIjpcInJlcGxhY2VIVE1MXCIsXCJkZXNjXCI6XCJQdXRzIGEgSFRNTCBvciBUV0lHIGZyYWdtZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQsIHNlZSBtZXRob2QgW2Zvcm1hdFRXSUdde0BsaW5rICNqc2RvY19tZXRob2RfZm9ybWF0VFdJR31cIixcInBhcmFtc1wiOlt7XCJuYW1lXCI6XCJzZWxlY3RvclwiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgdGFyZ2V0IHNlbGVjdG9yXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwidHdpZ1wiLFwidHlwZVwiOlwiU3RyaW5nXCIsXCJkZXNjXCI6XCJ0aGUgVFdJRyBmcmFnbWVudFwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9LHtcIm5hbWVcIjpcInNldHRpbmdzXCIsXCJ0eXBlXCI6XCJPYmplY3RcIixcImRlc2NcIjpcImRpY3Rpb25hcnkgb2Ygc2V0dGluZ3MgKGNvbnRleHQsIGRpY3QpXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6dHJ1ZSxcIm51bGxhYmxlXCI6XCJcIn1dLFwicmV0dXJuc1wiOlt7XCJ0eXBlXCI6XCIkLkRlZmVycmVkXCIsXCJkZXNjXCI6XCJBIEpRdWVyeSBkZWZlcnJlZCBvYmplY3RcIn1dfSx7XCJuYW1lXCI6XCJwcmVwZW5kSFRNTFwiLFwiZGVzY1wiOlwiUHJlcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcImFwcGVuZEhUTUxcIixcImRlc2NcIjpcIkFwcGVuZHMgYSBIVE1MIG9yIFRXSUcgZnJhZ21lbnQgdG8gdGhlIGdpdmVuIHRhcmdldCwgc2VlIG1ldGhvZCBbZm9ybWF0VFdJR117QGxpbmsgI2pzZG9jX21ldGhvZF9mb3JtYXRUV0lHfVwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInNlbGVjdG9yXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSB0YXJnZXQgc2VsZWN0b3JcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjpcIlwiLFwibnVsbGFibGVcIjpcIlwifSx7XCJuYW1lXCI6XCJ0d2lnXCIsXCJ0eXBlXCI6XCJTdHJpbmdcIixcImRlc2NcIjpcInRoZSBUV0lHIGZyYWdtZW50XCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn0se1wibmFtZVwiOlwic2V0dGluZ3NcIixcInR5cGVcIjpcIk9iamVjdFwiLFwiZGVzY1wiOlwiZGljdGlvbmFyeSBvZiBzZXR0aW5ncyAoY29udGV4dCwgZGljdClcIixcImRlZmF1bHRcIjpcIlwiLFwib3B0aW9uYWxcIjp0cnVlLFwibnVsbGFibGVcIjpcIlwifV0sXCJyZXR1cm5zXCI6W3tcInR5cGVcIjpcIiQuRGVmZXJyZWRcIixcImRlc2NcIjpcIkEgSlF1ZXJ5IGRlZmVycmVkIG9iamVjdFwifV19LHtcIm5hbWVcIjpcIm9uUmVhZHlcIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIHRoZSBjb250cm9sIGlzIHJlYWR5IHRvIHJ1blwiLFwicGFyYW1zXCI6W119XX0se1wibmFtZVwiOlwiYW1pLlN1YkFwcFwiLFwiZGVzY1wiOlwiVGhlIGJhc2ljIEFNSSBzdWItYXBwbGljYXRpb25cIixcImltcGxlbWVudHNcIjpbXCJhbWkuSVN1YkFwcFwiXSxcImluaGVyaXRzXCI6W10sXCJrb25zdHJ1Y3RvclwiOntcIm5hbWVcIjpcIlN1YkFwcFwiLFwicGFyYW1zXCI6W119LFwiZnVuY3Rpb25zXCI6W3tcIm5hbWVcIjpcIm9uUmVhZHlcIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIHRoZSBzdWItYXBwbGljYXRpb24gaXMgcmVhZHkgdG8gcnVuXCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfSx7XCJuYW1lXCI6XCJvbkV4aXRcIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIHRoZSBzdWItYXBwbGljYXRpb24gaXMgYWJvdXQgdG8gZXhpdFwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ1c2VyZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwib25Mb2dpblwiLFwiZGVzY1wiOlwiQ2FsbGVkIHdoZW4gbG9nZ2luZyBpblwiLFwicGFyYW1zXCI6W3tcIm5hbWVcIjpcInVzZXJkYXRhXCIsXCJ0eXBlXCI6XCI/XCIsXCJkZXNjXCI6XCJ1c2VyZGF0YVwiLFwiZGVmYXVsdFwiOlwiXCIsXCJvcHRpb25hbFwiOlwiXCIsXCJudWxsYWJsZVwiOlwiXCJ9XX0se1wibmFtZVwiOlwib25Mb2dvdXRcIixcImRlc2NcIjpcIkNhbGxlZCB3aGVuIGxvZ2dpbmcgb3V0XCIsXCJwYXJhbXNcIjpbe1wibmFtZVwiOlwidXNlcmRhdGFcIixcInR5cGVcIjpcIj9cIixcImRlc2NcIjpcInVzZXJkYXRhXCIsXCJkZWZhdWx0XCI6XCJcIixcIm9wdGlvbmFsXCI6XCJcIixcIm51bGxhYmxlXCI6XCJcIn1dfV19XX07XG5cbi8qIGVzbGludC1lbmFibGUgKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi8iXX0=
