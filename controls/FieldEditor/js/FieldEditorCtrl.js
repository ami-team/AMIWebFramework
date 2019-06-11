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
var _fieldEditor_internal_numberRegex = /^.*(?:BIT|INT|FLOAT|DOUBLE|SERIAL|DECIMAL|NUMBER).*$/;
var _fieldEditor_internal_timestampRegex = /^.*(?:TIMESTAMP).*$/;
var _fieldEditor_internal_datetimeRegex = /^.*(?:DATETIME).*$/;
var _fieldEditor_internal_dateRegex = /^.*(?:DATE).*$/;
var _fieldEditor_internal_timeRegex = /^.*(?:TIME).*$/;
var _fieldEditor_internal_enumRegex = /^.*(?:ENUM).*$/;
var _fieldEditor_internal_textRegex = /^.*(?:TEXT|CLOB|BLOB).*$/;
/*-------------------------------------------------------------------------*/

amiTwig.stdlib.getSQLType = function (rawType) {
  /**/
  if (rawType.match(_fieldEditor_internal_numberRegex)) {
    return 'NUMBER';
  } else if (rawType.match(_fieldEditor_internal_timestampRegex)) {
    return 'TIMESTAMP';
  } else if (rawType.match(_fieldEditor_internal_datetimeRegex)) {
    return 'DATETIME';
  } else if (rawType.match(_fieldEditor_internal_dateRegex)) {
    return 'DATE';
  } else if (rawType.match(_fieldEditor_internal_timeRegex)) {
    return 'TIME';
  } else if (rawType.match(_fieldEditor_internal_enumRegex)) {
    return 'ENUM';
  } else if (rawType.match(_fieldEditor_internal_textRegex)) {
    return 'LONG_TEXT';
  } else {
    return 'SHORT_TEXT';
  }
};
/*-------------------------------------------------------------------------*/


amiTwig.stdlib.getSQLTypeToEnumOptions = function (rawType) {
  /*---------------------------------------------------------------------*/
  var idx1 = rawType.indexOf('(');
  var idx2 = rawType.indexOf(')');

  if (idx1 < 0 || idx2 < 0 || idx1 > idx2) {
    return '';
  }
  /*---------------------------------------------------------------------*/


  var values = rawType.substring(idx1 + 1, idx2 - 0).split(',');
  /*---------------------------------------------------------------------*/

  var result = [];
  values.forEach(function (value) {
    value = amiWebApp.textToHtml(value.trim());
    result.push('<option value="' + value + '"' > +value + '</select>');
  });
  return result.join('');
  /*---------------------------------------------------------------------*/
};
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
        /*---------------------------------------------------------*/
        var field = amiWebApp.jspath('..field{.@name==="field"}.$', rows[i])[0] || '';
        var type = amiWebApp.jspath('..field{.@name==="type"}.$', rows[i])[0] || '';
        var def = amiWebApp.jspath('..field{.@name==="def"}.$', rows[i])[0] || '';
        var primary = amiWebApp.jspath('..field{.@name==="primary"}.$', rows[i])[0] || '';
        var created = amiWebApp.jspath('..field{.@name==="created"}.$', rows[i])[0] || '';
        var createdBy = amiWebApp.jspath('..field{.@name==="createdBy"}.$', rows[i])[0] || '';
        var modified = amiWebApp.jspath('..field{.@name==="modified"}.$', rows[i])[0] || '';
        var modifiedBy = amiWebApp.jspath('..field{.@name==="modifiedBy"}.$', rows[i])[0] || '';
        /*---------------------------------------------------------*/

        if (primary === 'true') {
          primaryField = field;
        }
        /*---------------------------------------------------------*/


        if (created !== 'true' && createdBy !== 'true' && modified !== 'true' && modifiedBy !== 'true') {
          fieldInfo.push({
            field: field,
            type: type,
            def: def
          });
        }
        /*---------------------------------------------------------*/

      }

      result.resolve(primaryField, fieldInfo);
    }).fail(function () {
      result.reject(primaryField, fieldInfo);
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
      result.reject(values);
    });
    /*-----------------------------------------------------------------*/

    return result;
  },

  /*---------------------------------------------------------------------*/
  setup: function setup(selector, settings) {
    var _this2 = this;

    /*-----------------------------------------------------------------*/
    var fn1 = function fn1(catalog, entity, fields, values) {
      return 'AddElement' + ' -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -separator="§" -fields="' + amiWebApp.textToString(fields.join('§')) + '" -values="' + amiWebApp.textToString(values.join('§')) + '"';
    };

    var fn2 = function fn2(catalog, entity, fields, values, primaryFields, primaryValues) {
      return 'UpdateElements' + ' -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -separator="§" -fields="' + amiWebApp.textToString(fields.join('§')) + '" -values="' + amiWebApp.textToString(values.join('§')) + '" -keyFields="' + amiWebApp.textToString(primaryFields.join('§')) + '" -keyValues="' + amiWebApp.textToString(primaryValues.join('§')) + '"';
    };

    var fn3 = function fn3(catalog, entity, primaryFields, primaryValues) {
      return 'RemoveElements' + ' -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -separator="§" -keyFields="' + amiWebApp.textToString(primaryFields.join('§')) + '" -keyValues="' + amiWebApp.textToString(primaryValues.join('§')) + '"';
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

      if (_this2.ctx.inEditMode) {
        _this2.showFieldModal(e.currentTarget.getAttribute('data-primary-catalog'), e.currentTarget.getAttribute('data-primary-entity'), e.currentTarget.getAttribute('data-primary-field'), e.currentTarget.getAttribute('data-primary-value'), e.currentTarget.getAttribute('data-catalog'), e.currentTarget.getAttribute('data-entity'), e.currentTarget.getAttribute('data-field'), e.currentTarget.getAttribute('data-type'));
      }
    });
    /*-----------------------------------------------------------------*/

    this.el.find('[data-action="clone-row"]').click(function (e) {
      e.preventDefault();

      if (_this2.ctx.inEditMode) {
        _this2.showRowModal(e.currentTarget.getAttribute('data-catalog'), e.currentTarget.getAttribute('data-entity'), e.currentTarget.getAttribute('data-primary-field'), e.currentTarget.getAttribute('data-primary-value'));
      }
    });
    /*-----------------------------------------------------------------*/

    this.el.find('[data-action="delete-row"]').click(function (e) {
      e.preventDefault();

      if (_this2.ctx.inEditMode) {
        _this2.removeRow(e.currentTarget.getAttribute('data-catalog'), e.currentTarget.getAttribute('data-entity'), [e.currentTarget.getAttribute('data-primary-field')], [e.currentTarget.getAttribute('data-primary-value')]);
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
  changeFormInputType: function changeFormInputType(selector, sqlType) {
    $(selector).replaceWith(function () {
      /*-------------------------------------------------------------*/
      var result;
      var id = selector.substring(1);
      /**/

      if (sqlType === '@NULL') {
        result = $('<input class="form-control form-control-sm" type="text" id="' + id + '" readonly="readonly" />');
      } else if (sqlType === 'NUMBER') {
        result = $('<input class="form-control form-control-sm" type="number" id="' + id + '" step="any" />');
      } else if (sqlType === 'TIMESTAMP') {
        result = $('<input class="form-control form-control-sm" type="text" id="' + id + '" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]*" />');
      } else if (sqlType === 'DATETIME') {
        result = $('<input class="form-control form-control-sm" type="text" id="' + id + '" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]*" />');
      } else if (sqlType === 'DATE') {
        result = $('<input class="form-control form-control-sm" type="text" id="' + id + '" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />');
      } else if (sqlType === 'TIME') {
        result = $('<input class="form-control form-control-sm" type="text" id="' + id + '" pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]*" />');
      } else if (sqlType === 'ENUM') {
        result = $('<select class="custom-select custom-select-sm" id="' + id + '">' + amiTwig.stdlib.getSQLTypeToEnumOptions(sqlType) + '</select>');
      } else if (sqlType === 'LONG_TEXT') {
        result = $('<textarea class="form-control form-control-sm" rows="6" id="' + id + '"></textarea>');
      } else if (sqlType === 'SHORT_TEXT') {
        result = $('<input class="form-control form-control-sm" type="text" id="' + id + '" />');
      }
      /*-------------------------------------------------------------*/


      var name = $(selector).prop('name');
      var val = $(selector).val();
      return result.prop('name', name).val(sqlType === '@NULL' ? '@NULL' : val);
      /*-------------------------------------------------------------*/
    });
  },

  /*---------------------------------------------------------------------*/
  showFieldModal: function showFieldModal(primaryCatalog, primaryEntity, primaryField, primaryValue, catalog, entity, field, type) {
    var _this3 = this;

    if (primaryCatalog !== catalog || primaryEntity !== entity) {
      return;
      /* METTRE DANS LE TWIG */
    }
    /**/


    this.getInfo(primaryCatalog, primaryEntity, primaryField).done(function (primaryField, fieldInfo) {
      _this3.getValues(primaryCatalog, primaryEntity, primaryField, primaryValue).done(function (values) {
        var dict = {
          primaryField: primaryField,
          fieldInfo: fieldInfo,
          values: values,
          filter: field
        };
        amiWebApp.replaceHTML('#C2C43049_4CD6_73C3_597B_F0399A220610', _this3.fragmentFieldList, {
          dict: dict
        }).done(function () {
          /*-----------------------------------------------------*/
          var el1 = $('#F44687A3_036C_9C77_3284_DD495D9F4D7D');
          var el2 = $('#D3CE601F_C7BA_5C8E_2564_491FED4C5D6F');
          var el3 = $('#C2C43049_4CD6_73C3_597B_F0399A220610');
          /*-----------------------------------------------------*/

          el2.text(catalog + '.' + entity + '.' + primaryField + ' = ' + primaryValue);
          /*-----------------------------------------------------*/

          el3.find('[data-action="changesqltype"]').click(function (e) {
            e.preventDefault();
            $(e.currentTarget).closest('.nav-tabs').find('.nav-link,.dropdown-item').removeClass('active');
            $(e.currentTarget).closest('.nav-item').find('.nav-link').addClass('active');
            $(e.currentTarget).addClass('active');

            _this3.changeFormInputType(e.currentTarget.getAttribute('href'), e.currentTarget.getAttribute('data-sql-type'));
          });
          /*-----------------------------------------------------*/

          el3.off().on('submit', function (e) {
            /*-------------------------------------------------*/
            e.preventDefault();
            /*-------------------------------------------------*/

            var value = el3.find(':input').val();
            /*-------------------------------------------------*/

            _this3.updateRow(catalog, entity, [field], [value], [primaryField], [primaryValue]);
            /*-------------------------------------------------*/

          });
          /*-----------------------------------------------------*/

          el1.modal('show');
          /*-----------------------------------------------------*/
        });
      }).fail(function (message) {
        _this3.error(message, true);
      });
    }).fail(function (message) {
      _this3.error(message, true);
    });
  },

  /*---------------------------------------------------------------------*/
  showRowModal: function showRowModal(primaryCatalog, primaryEntity, primaryField, primaryValue) {
    var _this4 = this;

    this.getInfo(primaryCatalog, primaryEntity, primaryField).done(function (primaryField, fieldInfo) {
      _this4.getValues(primaryCatalog, primaryEntity, primaryField, primaryValue).done(function (values) {
        var dict = {
          primaryField: primaryField,
          fieldInfo: fieldInfo,
          values: values,
          filter: ''
        };
        amiWebApp.replaceHTML('#F2E58136_73F5_D2E2_A0B7_2F810830AD98', _this4.fragmentFieldList, {
          dict: dict
        }).done(function () {
          /*-----------------------------------------------------*/
          var el1 = $('#A8572167_6898_AD6F_8EAD_9D4E2AEB3550');
          var el2 = $('#E44B299D_96B3_9C00_C91C_555C549BF87B');
          var el3 = $('#F2E58136_73F5_D2E2_A0B7_2F810830AD98');
          /*-----------------------------------------------------*/

          el2.text(primaryCatalog + '.' + primaryEntity);
          /*-----------------------------------------------------*/

          el3.find('[data-action="changesqltype"]').click(function (e) {
            e.preventDefault();
            $(e.currentTarget).closest('.nav-tabs').find('.nav-link,.dropdown-item').removeClass('active');
            $(e.currentTarget).closest('.nav-item').find('.nav-link').addClass('active');
            $(e.currentTarget).addClass('active');

            _this4.changeFormInputType(e.currentTarget.getAttribute('href'), e.currentTarget.getAttribute('data-sql-type'));
          });
          /*-----------------------------------------------------*/

          el3.off().submit(function (e) {
            /*-------------------------------------------------*/
            e.preventDefault();
            /*-------------------------------------------------*/

            var fields = [];
            var values = [];
            var form = el3.serializeArray();

            for (var i in form) {
              fields.push(form[i].name);
              values.push(form[i].value);
            }
            /*-------------------------------------------------*/


            _this4.appendRow(primaryCatalog, primaryEntity, fields, values);
            /*-------------------------------------------------*/

          });
          /*-----------------------------------------------------*/

          el1.modal('show');
          /*-----------------------------------------------------*/
        });
      }).fail(function (message) {
        _this4.error(message, true);
      });
    }).fail(function (message) {
      _this4.error(message, true);
    });
  },

  /*---------------------------------------------------------------------*/
  appendRow: function appendRow(catalog, entity, fields, values) {
    var _this5 = this;

    var result = confirm('Please confirm!');

    if (result) {
      amiWebApp.lock();
      amiCommand.execute(this.ctx.appendCommandFunc(catalog, entity, fields, values)).done(function (data, message) {
        $('#A8572167_6898_AD6F_8EAD_9D4E2AEB3550').modal('hide');

        _this5.success(message, true,
        /*------------*/
        null
        /*------------*/
        );
      }).fail(function (data, message) {
        _this5.error(message, true, '#B4CF70FC_14C8_FC57_DEF0_05144415DB6A');
      });
    }

    return result;
  },

  /*---------------------------------------------------------------------*/
  updateRow: function updateRow(catalog, entity, fields, values, primaryFields, primaryValues) {
    var _this6 = this;

    var result = confirm('Please confirm!');

    if (result) {
      amiWebApp.lock();
      amiCommand.execute(this.ctx.updateCommandFunc(catalog, entity, fields, values, primaryFields, primaryValues)).done(function (data, message) {
        $('#F44687A3_036C_9C77_3284_DD495D9F4D7D').modal('hide');

        _this6.success(message, true,
        /*------------*/
        null
        /*------------*/
        );
      }).fail(function (data, message) {
        _this6.error(message, true, '#B9B74CAB_E87A_4B68_A866_793E9C70EEF1');
      });
    }

    return result;
  },

  /*---------------------------------------------------------------------*/
  removeRow: function removeRow(primaryCatalog, primaryEntity, primaryFields, primaryValues) {
    var _this7 = this;

    var result = confirm('Please confirm!');

    if (result) {
      amiWebApp.lock();
      amiCommand.execute(this.ctx.removeCommandFunc(primaryCatalog, primaryEntity, primaryFields, primaryValues)).done(function (data, message) {
        _this7.success(message, true);
      }).fail(function (data, message) {
        _this7.error(message, true);
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
