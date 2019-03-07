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
$AMIClass('FieldEditorCtrl', {
  /*---------------------------------------------------------------------*/
  $extends: ami.Control,

  /*---------------------------------------------------------------------*/
  $init: function $init(parent, owner) {
    this.$super.$init(parent, owner);
  },

  /*---------------------------------------------------------------------*/
  onReady: function onReady() {
    return amiWebApp.loadResources([amiWebApp.originURL + '/controls/FieldEditor/twig/FieldEditorCtrl.twig']).done(function (data) {
      this.inEditMode = false;
      amiWebApp.appendHTML('body', data[0]);
    });
  },

  /*---------------------------------------------------------------------*/
  setup: function setup(selector, primaryField, settings) {
    var _this = this;

    /*-----------------------------------------------------------------*/
    var fn = function fn(catalog, entity, field, value, primaryField, primaryValue) {
      return 'UpdateElements -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -fields="' + amiWebApp.textToString(field) + '" -values="' + amiWebApp.textToString(value) + '" -keyFields="' + amiWebApp.textToString(_this.primaryField) + '" -keyValues="' + amiWebApp.textToString(primaryValue) + '"';
    };
    /*-----------------------------------------------------------------*/


    var _amiWebApp$setup = amiWebApp.setup(['editCommandFunc'], [fn], settings),
        editCommandFunc = _amiWebApp$setup[0];

    this.editCommandFunc = editCommandFunc;
    this.primaryField = primaryField;
    /*-----------------------------------------------------------------*/

    $(selector).find('div[data-action="edit"]').click(function (e) {
      _this.editField(e.currentTarget.getAttribute('data-catalog'), e.currentTarget.getAttribute('data-entity'), e.currentTarget.getAttribute('data-field'), e.currentTarget.getAttribute('data-type'), e.currentTarget.getAttribute('data-row'), e.currentTarget.innerText);
    });
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  isInEditMode: function isInEditMode() {
    return this.inEditMode();
  },

  /*---------------------------------------------------------------------*/
  setInEditMode: function setInEditMode(inEditMode) {
    this.inEditMode = inEditMode;
  },

  /*---------------------------------------------------------------------*/
  textRegex: /^.*(?:TEXT).*$/,
  dateRegex: /^.*(?:DATE|TIME).*$/,
  numberRegex: /^.*(?:BIT|INT|FLOAT|DOUBLE|SERIAL|DECIMAL|NUMERIC).*$/,

  /*---------------------------------------------------------------------*/
  editField: function editField(catalog, entity, field, type, primaryValue, value) {
    var _this2 = this;

    if (this.inEditMode) {
      /*-------------------------------------------------------------*/
      $('#D3CE601F_C7BA_5C8E_2564_491FED4C5D6F').text('Field `' + field + '` for `' + catalog + '`.`' + entity + '`.`' + this.primaryField + '` = ' + primaryValue);
      /*-------------------------------------------------------------*/

      $('#E2E8670D_2BAE_B181_79E5_C8A170BD3981')[0].reset();
      /*-------------------------------------------------------------*/

      type = type.toUpperCase();
      /**/

      if (value === '@NULL') {
        $('#A70927B4_918F_07BC_2C91_B48CFCB812C6').collapse('show');
      } else if (type.match(this.textRegex)) {
        $('#EDD0ABD2_4AF8_4F27_AECD_D537F2695E67').collapse('show').find('textarea').val(value);
      } else if (type.match(this.numberRegex)) {
        $('#D20E11D2_1E45_B4B7_219A_9D9F490666D4').collapse('show').find('input').val(value);
      } else if (type.match(this.dateRegex)) {
        $('#F0389A55_B680_9D33_8D06_3D51CF4A3934').collapse('show').find('input').val(value);
      } else
        /*-----------------------*/
        {
          $('#D22BDDA1_B582_6958_2EED_701D853D3B4D').collapse('show').find('input').val(value);
        }
      /*-------------------------------------------------------------*/


      $('#E2E8670D_2BAE_B181_79E5_C8A170BD3981').off().on('submit', function (e) {
        e.preventDefault();
        var value = $('#A4A7E040_7F01_C1BD_7180_2327E5244805 .show').find('input, textarea').val();

        _this2.changeField(catalog, entity, field, value, _this2.primaryField, primaryValue);
      });
      /*-------------------------------------------------------------*/

      $('#F44687A3_036C_9C77_3284_DD495D9F4D7D').modal('show');
      /*-------------------------------------------------------------*/
    }
  },

  /*---------------------------------------------------------------------*/
  changeField: function changeField(catalog, entity, field, value, primaryField, primaryValue) {
    var _this3 = this;

    amiWebApp.lock();
    amiCommand.execute(this.editCommandFunc(catalog, entity, field, value, primaryField, primaryValue)).done(function (data, message) {
      $('#F44687A3_036C_9C77_3284_DD495D9F4D7D').modal('hide');

      if (_this3.getOwner().refresh) {
        _ami_internal_then(_this3.getOwner().refresh(), function () {
          amiWebApp.success(message, true);
        }, function (message) {
          amiWebApp.error(message, true);
        });
      }
    }).fail(function (data, message) {
      $('#F44687A3_036C_9C77_3284_DD495D9F4D7D').modal('hide');

      if (_this3.getOwner().refresh) {
        _ami_internal_then(_this3.getOwner().refresh(), function () {
          amiWebApp.error(message, true);
        }, function (message) {
          amiWebApp.error(message, true);
        });
      }
    });
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/
