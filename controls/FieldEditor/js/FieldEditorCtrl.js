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
    var _this = this;

    return amiWebApp.loadResources([amiWebApp.originURL + '/controls/FieldEditor/twig/FieldEditorCtrl.twig', amiWebApp.originURL + '/controls/FieldEditor/twig/fieldList.twig']).done(function (data) {
      amiWebApp.appendHTML('body', data[0]).done(function () {
        _this.fragmentFieldList = data[1];
        _this.cache = {};
      });
    });
  },

  /*---------------------------------------------------------------------*/
  getInfo: function getInfo(primaryCatalog, primaryEntity, primaryField) {
    var _this2 = this;

    var result = $.Deferred();
    /*-----------------------------------------------------------------*/

    var key = primaryCatalog + '$' + primaryEntity;

    if (key in this.cache) {
      return result.resolve(this.cache[key].primaryField, this.cache[key].fieldInfo);
    }
    /*-----------------------------------------------------------------*/


    var fieldInfo = [];
    amiCommand.execute('GetEntityInfo -catalog="' + amiWebApp.textToString(primaryCatalog) + '" -entity="' + amiWebApp.textToString(primaryEntity) + '"').done(function (data) {
      var rows = amiWebApp.jspath('..{.@type==="fields"}.row', data);

      for (var i in rows) {
        var field = amiWebApp.jspath('..field{.@name==="field"}.$', rows[i])[0] || '';
        var type = amiWebApp.jspath('..field{.@name==="type"}.$', rows[i])[0] || '';
        var def = amiWebApp.jspath('..field{.@name==="def"}.$', rows[i])[0] || '';
        var primary = amiWebApp.jspath('..field{.@name==="primary"}.$', rows[i])[0] || '';
        var created = amiWebApp.jspath('..field{.@name==="created"}.$', rows[i])[0] || '';
        var createdBy = amiWebApp.jspath('..field{.@name==="createdBy"}.$', rows[i])[0] || '';
        var modified = amiWebApp.jspath('..field{.@name==="modified"}.$', rows[i])[0] || '';
        var modifiedBy = amiWebApp.jspath('..field{.@name==="modifiedBy"}.$', rows[i])[0] || '';

        if (primary === 'true') {
          if (!_this2.primaryField) {
            primaryField = field;
          }
        } else {
          if (created !== 'true' && createdBy !== 'true' && modified !== 'true' && modifiedBy !== 'true') {
            fieldInfo.push({
              field: field,
              type: type,
              def: def
            });
          }
        }
      }

      result.resolve(primaryField, fieldInfo);
    }).fail(function () {
      result.resolve(primaryField, fieldInfo);
    });
    /*-----------------------------------------------------------------*/

    return result;
  },

  /*---------------------------------------------------------------------*/
  getValues: function getValues(primaryCatalog, primaryEntity, primaryField, primaryValue) {
    var result = $.Deferred();
    /*-----------------------------------------------------------------*/

    var values = {};
    amiCommand.execute('SearchQuery -catalog="' + amiWebApp.textToString(primaryCatalog) + '" -entity="' + amiWebApp.textToString(primaryEntity) + '" -mql="SELECT * WHERE `' + amiWebApp.textToString(primaryField) + '` = \'' + amiWebApp.textToString(primaryValue) + '\'"').done(function (data) {
      var fields = amiWebApp.jspath('..{.@type==="query"}..field', data);

      for (var i in fields) {
        values[fields[i]['@name']] = fields[i]['$'];
      }

      result.resolve(values);
    }).fail(function () {
      result.resolve(values);
    });
    /*-----------------------------------------------------------------*/

    return result;
  },

  /*---------------------------------------------------------------------*/
  setup: function setup(selector, settings) {
    var _this3 = this;

    /*-----------------------------------------------------------------*/
    var fn1 = function fn1(catalog, entity, fields, values) {
      return 'AddElement' + ' -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -separator="§" -fields="' + amiWebApp.textToString(fields.join('§')) + '" -values="' + amiWebApp.textToString(values.join('§')) + '"';
    };

    var fn2 = function fn2(catalog, entity, fields, values, primaryFields, primaryValues) {
      return 'UpdateElements' + ' -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -separator="§" -fields="' + amiWebApp.textToString(fields.join('§')) + '" -values="' + amiWebApp.textToString(values.join('§')) + '" -keyFields="' + amiWebApp.textToString(primaryFields.join('§')) + '" -keyValues="' + amiWebApp.textToString(primaryValues.join('§')) + '"';
    };

    var fn3 = function fn3(primaryCatalog, primaryEntity, primaryFields, primaryValues) {
      return 'RemoveElements' + ' -catalog="' + amiWebApp.textToString(primaryCatalog) + '" -entity="' + amiWebApp.textToString(primaryEntity) + '" -separator="§" -keyFields="' + amiWebApp.textToString(primaryFields.join('§')) + '" -keyValues="' + amiWebApp.textToString(primaryValues.join('§')) + '"';
    };
    /*-----------------------------------------------------------------*/


    var _amiWebApp$setup = amiWebApp.setup(['appendCommandFunc', 'updateCommandFunc', 'removeCommandFunc'], [fn1, fn2, fn3], settings),
        appendCommandFunc = _amiWebApp$setup[0],
        updateCommandFunc = _amiWebApp$setup[1],
        removeCommandFunc = _amiWebApp$setup[2];
    /*-----------------------------------------------------------------*/


    this.ctx = {
      inEditMode: false,
      appendCommandFunc: appendCommandFunc,
      updateCommandFunc: updateCommandFunc,
      removeCommandFunc: removeCommandFunc
    };
    /*-----------------------------------------------------------------*/

    this.el = $(selector);
    /*-----------------------------------------------------------------*/

    this.el.find('div[data-action="edit-row"]').click(function (e) {
      e.preventDefault();

      if (_this3.ctx.inEditMode) {
        _this3.showFieldModal(e.currentTarget.getAttribute('data-primary-catalog'), e.currentTarget.getAttribute('data-primary-entity'), e.currentTarget.getAttribute('data-primary-field'), e.currentTarget.getAttribute('data-primary-value'), e.currentTarget.getAttribute('data-catalog'), e.currentTarget.getAttribute('data-entity'), e.currentTarget.getAttribute('data-field'), e.currentTarget.getAttribute('data-value'), e.currentTarget.getAttribute('data-type'));
      }
    });
    /*-----------------------------------------------------------------*/

    this.el.find('[data-action="clone-row"]').click(function (e) {
      e.preventDefault();

      if (_this3.ctx.inEditMode) {
        _this3.showRowModal(e.currentTarget.getAttribute('data-primary-catalog'), e.currentTarget.getAttribute('data-primary-entity'), e.currentTarget.getAttribute('data-primary-field'), e.currentTarget.getAttribute('data-primary-value'));
      }
    });
    /*-----------------------------------------------------------------*/

    this.el.find('[data-action="delete-row"]').click(function (e) {
      e.preventDefault();

      if (_this3.ctx.inEditMode) {
        _this3.removeRow(e.currentTarget.getAttribute('data-primary-catalog'), e.currentTarget.getAttribute('data-primary-entity'), [e.currentTarget.getAttribute('data-primary-field')], [e.currentTarget.getAttribute('data-primary-value')]);
      }
    });
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  isInEditMode: function isInEditMode() {
    return this.ctx.inEditMode();
  },

  /*---------------------------------------------------------------------*/
  setInEditMode: function setInEditMode(inEditMode) {
    if (inEditMode) {
      this.el.removeClass('unit-edit');
    } else {
      this.el.addClass('unit-edit');
    }

    this.ctx.inEditMode = inEditMode;
  },

  /*---------------------------------------------------------------------*/
  dateRegex: /^.*(?:DATE|TIME).*$/,
  textRegex: /^.*(?:TEXT|CLOB|BLOB).*$/,
  numberRegex: /^.*(?:BIT|INT|FLOAT|DOUBLE|SERIAL|DECIMAL|NUMBER).*$/,

  /*---------------------------------------------------------------------*/
  showFieldModal: function showFieldModal(primaryCatalog, primaryEntity, primaryField, primaryValue, catalog, entity, field, value, type) {
    var _this4 = this;

    /*-----------------------------------------------------------------*/
    if (primaryCatalog !== catalog || primaryEntity != entity) {
      return;
    }
    /*-----------------------------------------------------------------*/


    $('#D3CE601F_C7BA_5C8E_2564_491FED4C5D6F').text('`' + field + '` for `' + catalog + '`.`' + entity + '`.`' + primaryField + '` = ' + primaryValue);
    /*-----------------------------------------------------------------*/

    $('#E2E8670D_2BAE_B181_79E5_C8A170BD3981')[0].reset();
    /*-----------------------------------------------------------------*/

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
      /*------------------------*/
      {
        $('#D22BDDA1_B582_6958_2EED_701D853D3B4D').collapse('show').find('input').val(value);
      }
    /*-----------------------------------------------------------------*/


    $('#E2E8670D_2BAE_B181_79E5_C8A170BD3981').off().on('submit', function (e) {
      e.preventDefault();
      var value = $('#A4A7E040_7F01_C1BD_7180_2327E5244805 .show').find('input, textarea').val();

      _this4.updateRow(catalog, entity, [field], [value], [primaryField], [primaryValue]);
    });
    /*-----------------------------------------------------------------*/

    $('#F44687A3_036C_9C77_3284_DD495D9F4D7D').modal('show');
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  showRowModal: function showRowModal(primaryCatalog, primaryEntity, primaryField, primaryValue) {
    var _this5 = this;

    this.getInfo(primaryCatalog, primaryEntity, primaryField).done(function (primaryField, fieldInfo) {
      _this5.getValues(primaryCatalog, primaryEntity, primaryField, primaryValue).done(function (values) {
        var dict = {
          fieldInfo: fieldInfo,
          values: values
        };
        amiWebApp.replaceHTML('#F2E58136_73F5_D2E2_A0B7_2F810830AD98', _this5.fragmentFieldList, {
          dict: dict
        }).done(function () {
          var el1 = $('#A8572167_6898_AD6F_8EAD_9D4E2AEB3550');
          var el2 = $('#B85AC8DB_E3F9_AB6D_D51F_0B103205F2B1');
          el2.off().submit(function (e) {
            /*-------------------------------------------------*/
            e.preventDefault();
            /*-------------------------------------------------*/

            var fields = [];
            var values = [];
            var form = el2.serializeArray();

            for (var i in form) {
              fields.push(form[i].name);
              values.push(form[i].value);
            }
            /*-------------------------------------------------*/


            _this5.appendRow(primaryCatalog, primaryEntity, fields, values);
            /*-------------------------------------------------*/

          });
          el1.modal('show');
        });
      });
    });
  },

  /*---------------------------------------------------------------------*/
  appendRow: function appendRow(catalog, entity, fields, values) {
    var _this6 = this;

    var result = confirm('Please confirm!');

    if (result) {
      amiWebApp.lock();
      amiCommand.execute(this.ctx.appendCommandFunc(catalog, entity, fields, values)).done(function (data, message) {
        $('#A8572167_6898_AD6F_8EAD_9D4E2AEB3550').modal('hide');

        _this6.success(message, true,
        /*------------*/
        null
        /*------------*/
        );
      }).fail(function (data, message) {
        _this6.error(message, true, '#B4CF70FC_14C8_FC57_DEF0_05144415DB6A');
      });
    }

    return result;
  },

  /*---------------------------------------------------------------------*/
  updateRow: function updateRow(catalog, entity, fields, values, primaryFields, primaryValues) {
    var _this7 = this;

    var result = confirm('Please confirm!');

    if (result) {
      amiWebApp.lock();
      amiCommand.execute(this.ctx.updateCommandFunc(catalog, entity, fields, values, primaryFields, primaryValues)).done(function (data, message) {
        $('#F44687A3_036C_9C77_3284_DD495D9F4D7D').modal('hide');

        _this7.success(message, true,
        /*------------*/
        null
        /*------------*/
        );
      }).fail(function (data, message) {
        _this7.error(message, true, '#B9B74CAB_E87A_4B68_A866_793E9C70EEF1');
      });
    }

    return result;
  },

  /*---------------------------------------------------------------------*/
  removeRow: function removeRow(primaryCatalog, primaryEntity, primaryFields, primaryValues) {
    var _this8 = this;

    var result = confirm('Please confirm!');

    if (result) {
      amiWebApp.lock();
      amiCommand.execute(this.ctx.removeCommandFunc(primaryCatalog, primaryEntity, primaryFields, primaryValues)).done(function (data, message) {
        _this8.success(message, true);
      }).fail(function (data, message) {
        _this8.error(message, true);
      });
    }

    return result;
  },

  /*---------------------------------------------------------------------*/

  /*---------------------------------------------------------------------*/
  success: function success(message, fadeOut, target) {
    if (this.getOwner().refresh) {
      _ami_internal_then(this.getOwner().refresh(), function () {
        amiWebApp.success(message, fadeOut, target);
      }, function (message) {
        amiWebApp.error(message, fadeOut, target);
      });
    } else {
      amiWebApp.success(message, fadeOut, target);
    }
  },

  /*---------------------------------------------------------------------*/

  /*---------------------------------------------------------------------*/
  error: function error(message, fadeOut, target) {
    if (this.getOwner().refresh) {
      _ami_internal_then(this.getOwner().refresh(), function () {
        amiWebApp.error(message, fadeOut, target);
      }, function (message) {
        amiWebApp.error(message, fadeOut, target);
      });
    } else {
      amiWebApp.error(message, fadeOut, target);
    }
  }
  /*---------------------------------------------------------------------*/

  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/
