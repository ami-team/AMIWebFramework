/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
$AMIClass('UnitEditorCtrl', {
  /*---------------------------------------------------------------------*/
  $extends: ami.Control,

  /*---------------------------------------------------------------------*/
  $init: function $init(parent, owner) {
    this.$super.$init(parent, owner);
  },

  /*---------------------------------------------------------------------*/
  onReady: function onReady() {
    return amiWebApp.loadResources([amiWebApp.originURL + '/controls/UnitEditor/twig/UnitEditorCtrl.twig']).done(function (data) {
      amiWebApp.appendHTML('body', data[0]);
    });
  },

  /*---------------------------------------------------------------------*/
  setup: function setup(selector) {
    var _this = this;

    $('div[data-unit-name]').each(function (index, item) {
      var el = $(item);
      /*-------------------------------------------------------------*/

      /* GET UNIT INFO                                               */

      /*-------------------------------------------------------------*/

      var unitVal = el.attr('data-val');
      var unitName = el.attr('data-unit-name');
      var unitFactor = el.attr('data-unit-factor');
      var unitBase = el.attr('data-unit-base');
      /*-------------------------------------------------------------*/

      /* OPTIMIZE UNIT INFO                                          */

      /*-------------------------------------------------------------*/

      var scale = 0.0;
      var base = parseFloat(unitBase);

      var rawVal = parseFloat(unitVal) * _this.getFactorFlt(unitFactor, base);

      if (rawVal !== 0.0) {
        scale = Math.log(rawVal) / Math.log(base);
        /**/

        if (scale > 0.0) {
          scale = Math.ceil(scale - 1);
        } else if (scale < 0.0) {
          scale = Math.floor(scale - 0);
        }
      }
      /*-------------------------------------------------------------*/


      var factor = Math.pow(base, scale);
      el.attr('data-unit-val', rawVal / factor);
      el.attr('data-unit-factor', _this.getFactorStr(factor, base));
      /*-------------------------------------------------------------*/

      el.attr('data-orig-unit-val', rawVal);
      el.attr('data-orig-unit-name', unitName);
      el.attr('data-orig-unit-factor', "");
      el.attr('data-orig-unit-base', unitBase);
      /*-------------------------------------------------------------*/

      /*                                                             */

      /*-------------------------------------------------------------*/

      el.click(function () {
        _this.editUnit(el);
      });

      _this.changeUnit(el);
      /*-------------------------------------------------------------*/

    });
  },

  /*---------------------------------------------------------------------*/
  editUnit: function editUnit(el) {
    var _this2 = this;

    /*-----------------------------------------------------------------*/
    var origUnitVal = el.attr('data-orig-unit-val');
    var origUnitName = el.attr('data-orig-unit-name');
    var origUnitFactor = el.attr('data-orig-unit-factor');
    var unitName = el.attr('data-unit-name');
    var unitFactor = el.attr('data-unit-factor');
    var unitBase = el.attr('data-unit-base');
    /*-----------------------------------------------------------------*/

    $('#DB6F1B3B_A1E1_474F_494D_B673367D6020').text(origUnitVal + ' ' + origUnitFactor + origUnitName);
    /*-----------------------------------------------------------------*/

    $('#B23EA96D_07CB_0D49_564A_8CBC446331F0').val(unitName);
    $('#C9712C7B_9A5C_BD83_45D1_4CC52CD81DA9').val(unitFactor);
    $('#CE77B2CF_A83B_854D_6B94_1A7A65555833').val(unitBase);

    if (el.attr('data-human-readable').replace(/^\s+|\s+$/g, '').toLowerCase() === 'false') {
      $('#D84D615F_8E4A_C9FB_18DD_D927B9CD68BD').prop('checked', false);
    } else {
      $('#D84D615F_8E4A_C9FB_18DD_D927B9CD68BD').prop('checked', true);
    }
    /*-----------------------------------------------------------------*/


    $('#B16DD66F_D5A1_BCDF_DB78_D375D7B208C5').off().on('submit', function (e) {
      e.preventDefault();

      _this2.apply(el);
    });
    /*-----------------------------------------------------------------*/

    $('#EEFEE4E6_2756_0FAC_6E1C_77F89E501417').modal('show');
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  apply: function apply(el) {
    /*-----------------------------------------------------------------*/
    var unitName = $('#B23EA96D_07CB_0D49_564A_8CBC446331F0').val();
    var unitFactor = $('#C9712C7B_9A5C_BD83_45D1_4CC52CD81DA9').val();
    var unitBase = $('#CE77B2CF_A83B_854D_6B94_1A7A65555833').val();
    /*-----------------------------------------------------------------*/

    el.attr('data-unit-name', unitName);
    el.attr('data-unit-factor', unitFactor);
    el.attr('data-unit-base', unitBase);

    if ($('#D84D615F_8E4A_C9FB_18DD_D927B9CD68BD').prop('checked')) {
      el.attr('data-human-readable', 'true');
    } else {
      el.attr('data-human-readable', 'false');
    }
    /*-----------------------------------------------------------------*/


    el.attr('data-unit-val', parseFloat(el.attr('data-orig-unit-val')) / this.getFactorFlt(unitFactor, parseFloat(unitBase)));
    /*-----------------------------------------------------------------*/

    this.changeUnit(el);
    /*-----------------------------------------------------------------*/

    $('#EEFEE4E6_2756_0FAC_6E1C_77F89E501417').modal('hide');
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  changeUnit: function changeUnit(el) {
    if (el.attr('data-human-readable').replace(/^\s+|\s+$/g, '').toLowerCase() === 'false') {
      el.text(el.attr('data-orig-unit-val') + ' ' + el.attr('data-orig-unit-factor') + el.attr('data-orig-unit-name'));
    } else {
      el.text(el.attr('data-unit-val') + ' ' + el.attr('data-unit-factor') + el.attr('data-unit-name'));
    }
  },

  /*---------------------------------------------------------------------*/
  factor2Unit_1000: {
    1.0e+24: 'Y',
    1.0e+21: 'Z',
    1.0e+18: 'E',
    1.0e+15: 'P',
    1.0e+12: 'T',
    1.0e+9: 'G',
    1.0e+6: 'M',
    1.0e+3: 'k',
    1.0: '',
    1.0e-3: 'm',
    1.0e-6: 'u',
    1.0e-9: 'n',
    1.0e-12: 'p',
    1.0e-15: 'f',
    1.0e-18: 'a',
    1.0e-21: 'z',
    1.0e-24: 'y'
  },
  factor2Unit_1024: {
    1208925819614629174706176.0: 'Y',
    1180591620717411303424.0: 'Z',
    1152921504606846976.0: 'E',
    1125899906842624.0: 'P',
    1099511627776.0: 'T',
    1073741824.0: 'G',
    1048576.0: 'M',
    1024.0: 'k',
    1.0: ''
  },

  /*---------------------------------------------------------------------*/
  getFactorStr: function getFactorStr(factor, base) {
    var result;
    /**/

    if (base === 1000.0) {
      result = this.factor2Unit_1000.hasOwnProperty(factor) ? this.factor2Unit_1000[factor] : '?';
    } else if (base == 1024.0) {
      result = this.factor2Unit_1024.hasOwnProperty(factor) ? this.factor2Unit_1024[factor] : '?';
    } else {
      result = '?';
    }

    return result;
  },

  /*---------------------------------------------------------------------*/
  unit2Factor_1000: {
    'Y': 1.0e+24,
    'Z': 1.0e+21,
    'E': 1.0e+18,
    'P': 1.0e+15,
    'T': 1.0e+12,
    'G': 1.0e+9,
    'M': 1.0e+6,
    'k': 1.0e+3,
    '': 1.0,
    'm': 1.0e-3,
    'u': 1.0e-6,
    'n': 1.0e-9,
    'p': 1.0e-12,
    'f': 1.0e-15,
    'a': 1.0e-18,
    'z': 1.0e-21,
    'y': 1.0e-24
  },
  unit2Factor_1024: {
    'Y': 1208925819614629174706176.0,
    'Z': 1180591620717411303424.0,
    'E': 1152921504606846976.0,
    'P': 1125899906842624.0,
    'T': 1099511627776.0,
    'G': 1073741824.0,
    'M': 1048576.0,
    'k': 1024.0,
    '': 1.0
  },

  /*---------------------------------------------------------------------*/
  getFactorFlt: function getFactorFlt(unit, base) {
    var result;
    /**/

    if (base === 1000.0) {
      result = this.unit2Factor_1000.hasOwnProperty(unit) ? this.unit2Factor_1000[unit] : 1.0;
    } else if (base == 1024.0) {
      result = this.unit2Factor_1024.hasOwnProperty(unit) ? this.unit2Factor_1024[unit] : 1.0;
    } else {
      result = 1.0;
    }

    return result;
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/
