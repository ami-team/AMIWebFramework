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
var _fieldEditor_internal_datetimeRegex = /^.*(?:TIMESTAMP|DATETIME).*$/;
var _fieldEditor_internal_dateRegex = /^.*(?:DATE).*$/;
var _fieldEditor_internal_timeRegex = /^.*(?:TIME).*$/;
var _fieldEditor_internal_enumRegex = /^.*(?:ENUM).*$/;
var _fieldEditor_internal_textRegex = /^.*(?:TEXT|CLOB|BLOB).*$/;
/*-------------------------------------------------------------------------*/

amiTwig.stdlib.getAMIType = function (sqlType) {
  /**/
  if (sqlType.match(_fieldEditor_internal_numberRegex)) {
    return 'NUMBER';
  } else if (sqlType.match(_fieldEditor_internal_datetimeRegex)) {
    return 'DATETIME';
  } else if (sqlType.match(_fieldEditor_internal_dateRegex)) {
    return 'DATE';
  } else if (sqlType.match(_fieldEditor_internal_timeRegex)) {
    return 'TIME';
  } else if (sqlType.match(_fieldEditor_internal_enumRegex)) {
    return 'ENUM';
  } else if (sqlType.match(_fieldEditor_internal_textRegex)) {
    return 'LONG_TEXT';
  } else {
    return 'SHORT_TEXT';
  }
};
/*-------------------------------------------------------------------------*/


amiTwig.stdlib.getAMITypeToEnumOptions = function (sqlType, defaultValue) {
  /*---------------------------------------------------------------------*/
  var idx1 = sqlType.indexOf('(');
  var idx2 = sqlType.indexOf(')');

  if (idx1 < 0 || idx2 < 0 || idx1 > idx2) {
    return '';
  }
  /*---------------------------------------------------------------------*/


  var values = sqlType.substring(idx1 + 1, idx2 - 0).split(',');
  /*---------------------------------------------------------------------*/

  var result = [];
  values.forEach(function (value) {
    value = amiWebApp.textToHtml(value.replace(/'/g, '').trim());

    if (value.toUpperCase() === defaultValue.toUpperCase()) {
      result.push('<option value="' + value + '" selected="selected">' + value + '</option>');
    } else {
      result.push('<option value="' + value + '" xxxxxxx="xxxxxxxxx">' + value + '</option>');
    }
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
    }).fail(function (data, message) {
      result.reject(message);
    });
    /*-----------------------------------------------------------------*/

    return result;
  },

  /*---------------------------------------------------------------------*/
  getValues: function getValues(primaryCatalog, primaryEntity, primaryField, primaryValue) {
    var result = $.Deferred();
    /*-----------------------------------------------------------------*/

    var values = {};
    amiCommand.execute('SearchQuery -catalog="' + amiWebApp.textToString(primaryCatalog) + '" -entity="' + amiWebApp.textToString(primaryEntity) + '" -sql="SELECT * FROM `' + amiWebApp.textToString(primaryEntity) + '` WHERE `' + amiWebApp.textToString(primaryField) + '` = \'' + amiWebApp.textToString(primaryValue) + '\'"').done(function (data) {
      var fields = amiWebApp.jspath('..{.@type==="' + amiWebApp.textToString(primaryCatalog) + '"}..field', data);

      for (var i in fields) {
        values[fields[i]['@name']] = fields[i]['$'];
      }

      result.resolve(values);
    }).fail(function (data, message) {
      result.reject(message);
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
  changeFormInputType: function changeFormInputType(selector, amiType, sqlType) {
    /*-----------------------------------------------------------------*/
    var name = $(selector).prop('name');
    var value = $(selector).val();
    /*-----------------------------------------------------------------*/

    var html;
    /**/

    if (amiType === '@NULL') {
      html = '<input class="form-control form-control-sm" type="text" readonly="readonly" />';
    } else if (amiType === 'NUMBER') {
      html = '<input class="form-control form-control-sm" type="number" step="any" />';
    } else if (amiType === 'DATETIME') {
      html = '<input class="form-control form-control-sm form-datetime" type="text" data-target="' + selector + '" />';
    } else if (amiType === 'DATE') {
      html = '<input class="form-control form-control-sm form-date" type="text" data-target="' + selector + '" />';
    } else if (amiType === 'TIME') {
      html = '<input class="form-control form-control-sm form-time" type="text" data-target="' + selector + '" />';
    } else if (amiType === 'ENUM') {
      html = '<select class="custom-select custom-select-sm">' + amiTwig.stdlib.getAMITypeToEnumOptions(sqlType, value) + '</select>';
    } else if (amiType === 'LONG_TEXT') {
      html = '<textarea class="form-control form-control-sm" rows="6"></textarea>';
    } else {
      html = '<input class="form-control form-control-sm" type="text" />';
    }
    /*-----------------------------------------------------------------*/


    amiWebApp._xxxHTML(selector, html, 3).done(function (el) {
      el.attr('name', name).val(amiType !== '@NULL' ? value !== '@NULL' ? value : '' : '@NULL');
    });
    /*-----------------------------------------------------------------*/

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

          el3.find('[data-action="changeamitype"]').click(function (e) {
            e.preventDefault();
            $(e.currentTarget).closest('.nav-item').find('.nav-link').addClass('active').children().first().attr('data-ami-type', $(e.currentTarget).attr('data-ami-type')).attr('data-sql-type', $(e.currentTarget).attr('data-sql-type')).text($(e.currentTarget).text().replace('default', ''));

            _this3.changeFormInputType(e.currentTarget.getAttribute('href'), e.currentTarget.getAttribute('data-ami-type'), e.currentTarget.getAttribute('data-sql-type'));
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

          el3.find('[data-action="changeamitype"]').click(function (e) {
            e.preventDefault();
            $(e.currentTarget).closest('.nav-item').find('.nav-link').addClass('active').children().first().attr('data-ami-type', $(e.currentTarget).attr('data-ami-type')).attr('data-sql-type', $(e.currentTarget).attr('data-sql-type')).text($(e.currentTarget).text().replace('default', ''));

            _this4.changeFormInputType(e.currentTarget.getAttribute('href'), e.currentTarget.getAttribute('data-ami-type'), e.currentTarget.getAttribute('data-sql-type'));
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

        _this5.success(message, true);
      }).fail(function (data, message) {
        _this5.error(message, true);
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

        _this6.success(message, true);
      }).fail(function (data, message) {
        _this6.error(message, true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZpZWxkRWRpdG9yQ3RybC5lczYuanMiXSwibmFtZXMiOlsiX2ZpZWxkRWRpdG9yX2ludGVybmFsX251bWJlclJlZ2V4IiwiX2ZpZWxkRWRpdG9yX2ludGVybmFsX2RhdGV0aW1lUmVnZXgiLCJfZmllbGRFZGl0b3JfaW50ZXJuYWxfZGF0ZVJlZ2V4IiwiX2ZpZWxkRWRpdG9yX2ludGVybmFsX3RpbWVSZWdleCIsIl9maWVsZEVkaXRvcl9pbnRlcm5hbF9lbnVtUmVnZXgiLCJfZmllbGRFZGl0b3JfaW50ZXJuYWxfdGV4dFJlZ2V4IiwiYW1pVHdpZyIsInN0ZGxpYiIsImdldEFNSVR5cGUiLCJzcWxUeXBlIiwibWF0Y2giLCJnZXRBTUlUeXBlVG9FbnVtT3B0aW9ucyIsImRlZmF1bHRWYWx1ZSIsImlkeDEiLCJpbmRleE9mIiwiaWR4MiIsInZhbHVlcyIsInN1YnN0cmluZyIsInNwbGl0IiwicmVzdWx0IiwiZm9yRWFjaCIsInZhbHVlIiwiYW1pV2ViQXBwIiwidGV4dFRvSHRtbCIsInJlcGxhY2UiLCJ0cmltIiwidG9VcHBlckNhc2UiLCJwdXNoIiwiam9pbiIsIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiQ29udHJvbCIsIiRpbml0IiwicGFyZW50Iiwib3duZXIiLCIkc3VwZXIiLCJvblJlYWR5IiwibG9hZFJlc291cmNlcyIsIm9yaWdpblVSTCIsImRvbmUiLCJkYXRhIiwiYXBwZW5kSFRNTCIsImZyYWdtZW50RmllbGRMaXN0IiwiY2FjaGUiLCJnZXRJbmZvIiwicHJpbWFyeUNhdGFsb2ciLCJwcmltYXJ5RW50aXR5IiwicHJpbWFyeUZpZWxkIiwiJCIsIkRlZmVycmVkIiwia2V5IiwicmVzb2x2ZSIsImZpZWxkSW5mbyIsImFtaUNvbW1hbmQiLCJleGVjdXRlIiwidGV4dFRvU3RyaW5nIiwicm93cyIsImpzcGF0aCIsImkiLCJmaWVsZCIsInR5cGUiLCJkZWYiLCJwcmltYXJ5IiwiY3JlYXRlZCIsImNyZWF0ZWRCeSIsIm1vZGlmaWVkIiwibW9kaWZpZWRCeSIsImZhaWwiLCJtZXNzYWdlIiwicmVqZWN0IiwiZ2V0VmFsdWVzIiwicHJpbWFyeVZhbHVlIiwiZmllbGRzIiwic2V0dXAiLCJzZWxlY3RvciIsInNldHRpbmdzIiwiZm4xIiwiY2F0YWxvZyIsImVudGl0eSIsImZuMiIsInByaW1hcnlGaWVsZHMiLCJwcmltYXJ5VmFsdWVzIiwiZm4zIiwiYXBwZW5kQ29tbWFuZEZ1bmMiLCJ1cGRhdGVDb21tYW5kRnVuYyIsInJlbW92ZUNvbW1hbmRGdW5jIiwiY3R4IiwiaW5FZGl0TW9kZSIsImVsIiwiZmluZCIsImNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic2hvd0ZpZWxkTW9kYWwiLCJjdXJyZW50VGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwic2hvd1Jvd01vZGFsIiwicmVtb3ZlUm93IiwiaXNJbkVkaXRNb2RlIiwic2V0SW5FZGl0TW9kZSIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJjaGFuZ2VGb3JtSW5wdXRUeXBlIiwiYW1pVHlwZSIsIm5hbWUiLCJwcm9wIiwidmFsIiwiaHRtbCIsIl94eHhIVE1MIiwiYXR0ciIsImRpY3QiLCJmaWx0ZXIiLCJyZXBsYWNlSFRNTCIsImVsMSIsImVsMiIsImVsMyIsInRleHQiLCJjbG9zZXN0IiwiY2hpbGRyZW4iLCJmaXJzdCIsIm9mZiIsIm9uIiwidXBkYXRlUm93IiwibW9kYWwiLCJlcnJvciIsInN1Ym1pdCIsImZvcm0iLCJzZXJpYWxpemVBcnJheSIsImFwcGVuZFJvdyIsImNvbmZpcm0iLCJsb2NrIiwic3VjY2VzcyIsImZhZGVPdXQiLCJ0YXJnZXQiLCJnZXRPd25lciIsInJlZnJlc2giLCJfYW1pX2ludGVybmFsX3RoZW4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQVdBO0FBRUEsSUFBTUEsaUNBQWlDLEdBQUcsc0RBQTFDO0FBQ0EsSUFBTUMsbUNBQW1DLEdBQUcsOEJBQTVDO0FBQ0EsSUFBTUMsK0JBQStCLEdBQUcsZ0JBQXhDO0FBQ0EsSUFBTUMsK0JBQStCLEdB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UyxDQUFDOEcsT0FBVixDQUFrQi9ELE9BQWxCLEVBQTJCZ0UsT0FBM0IsRUFBb0NDLE1BQXBDO0FBQ0E7QUFDRCxHQXhsQjJCOztBQTBsQjVCOztBQUNBO0FBRUFULEVBQUFBLEtBQUssRUFBRSxlQUFTeEQsT0FBVCxFQUFrQmdFLE9BQWxCLEVBQTJCQyxNQUEzQixFQUNQO0FBQ0MsUUFBRyxLQUFLQyxRQUFMLEdBQWdCQyxPQUFuQixFQUNBO0FBQ0NDLE1BQUFBLGtCQUFrQixDQUFDLEtBQUtGLFFBQUwsR0FBZ0JDLE9BQWhCLEVBQUQsRUFBNEIsWUFBTTtBQUVuRGxILFFBQUFBLFNBQVMsQ0FBQ3VHLEtBQVYsQ0FBZ0J4RCxPQUFoQixFQUF5QmdFLE9BQXpCLEVBQWtDQyxNQUFsQztBQUVBLE9BSmlCLEVBSWYsVUFBQ2pFLE9BQUQsRUFBYTtBQUVmL0MsUUFBQUEsU0FBUyxDQUFDdUcsS0FBVixDQUFnQnhELE9BQWhCLEVBQXlCZ0UsT0FBekIsRUFBa0NDLE1BQWxDO0FBQ0EsT0FQaUIsQ0FBbEI7QUFRQSxLQVZELE1BWUE7QUFDQ2hILE1BQUFBLFNBQVMsQ0FBQ3VHLEtBQVYsQ0FBZ0J4RCxPQUFoQixFQUF5QmdFLE9BQXpCLEVBQWtDQyxNQUFsQztBQUNBO0FBQ0Q7QUFFRDs7QUFDQTs7QUFqbkI0QixDQUFwQixDQUFUO0FBb25CQSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQU1JIFdlYiBGcmFtZXdvcmtcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtWFhYWCBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuY29uc3QgX2ZpZWxkRWRpdG9yX2ludGVybmFsX251bWJlclJlZ2V4ID0gL14uKig/OkJJVHxJTlR8RkxPQVR8RE9VQkxFfFNFUklBTHxERUNJTUFMfE5VTUJFUikuKiQvO1xuY29uc3QgX2ZpZWxkRWRpdG9yX2ludGVybmFsX2RhdGV0aW1lUmVnZXggPSAvXi4qKD86VElNRVNUQU1QfERBVEVUSU1FKS4qJC87XG5jb25zdCBfZmllbGRFZGl0b3JfaW50ZXJuYWxfZGF0ZVJlZ2V4ID0gL14uKig/OkRBVEUpLiokLztcbmNvbnN0IF9maWVsZEVkaXRvcl9pbnRlcm5hbF90aW1lUmVnZXggPSAvXi4qKD86VElNRSkuKiQvO1xuY29uc3QgX2ZpZWxkRWRpdG9yX2ludGVybmFsX2VudW1SZWdleCA9IC9eLiooPzpFTlVNKS4qJC87XG5jb25zdCBfZmllbGRFZGl0b3JfaW50ZXJuYWxfdGV4dFJlZ2V4ID0gL14uKig/OlRFWFR8Q0xPQnxCTE9CKS4qJC87XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuc3RkbGliLmdldEFNSVR5cGUgPSBmdW5jdGlvbihzcWxUeXBlKVxue1xuXHQvKiovIGlmKHNxbFR5cGUubWF0Y2goX2ZpZWxkRWRpdG9yX2ludGVybmFsX251bWJlclJlZ2V4KSkge1xuXHRcdHJldHVybiAnTlVNQkVSJztcblx0fVxuXHRlbHNlIGlmKHNxbFR5cGUubWF0Y2goX2ZpZWxkRWRpdG9yX2ludGVybmFsX2RhdGV0aW1lUmVnZXgpKSB7XG5cdFx0cmV0dXJuICdEQVRFVElNRSc7XG5cdH1cblx0ZWxzZSBpZihzcWxUeXBlLm1hdGNoKF9maWVsZEVkaXRvcl9pbnRlcm5hbF9kYXRlUmVnZXgpKSB7XG5cdFx0cmV0dXJuICdEQVRFJztcblx0fVxuXHRlbHNlIGlmKHNxbFR5cGUubWF0Y2goX2ZpZWxkRWRpdG9yX2ludGVybmFsX3RpbWVSZWdleCkpIHtcblx0XHRyZXR1cm4gJ1RJTUUnO1xuXHR9XG5cdGVsc2UgaWYoc3FsVHlwZS5tYXRjaChfZmllbGRFZGl0b3JfaW50ZXJuYWxfZW51bVJlZ2V4KSkge1xuXHRcdHJldHVybiAnRU5VTSc7XG5cdH1cblx0ZWxzZSBpZihzcWxUeXBlLm1hdGNoKF9maWVsZEVkaXRvcl9pbnRlcm5hbF90ZXh0UmVnZXgpKSB7XG5cdFx0cmV0dXJuICdMT05HX1RFWFQnO1xuXHR9XG5cdGVsc2UgXHR7XG5cdFx0cmV0dXJuICdTSE9SVF9URVhUJztcblx0fVxufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5zdGRsaWIuZ2V0QU1JVHlwZVRvRW51bU9wdGlvbnMgPSBmdW5jdGlvbihzcWxUeXBlLCBkZWZhdWx0VmFsdWUpXG57XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjb25zdCBpZHgxID0gc3FsVHlwZS5pbmRleE9mKCcoJyk7XG5cdGNvbnN0IGlkeDIgPSBzcWxUeXBlLmluZGV4T2YoJyknKTtcblxuXHRpZihpZHgxIDwgMFxuXHQgICB8fFxuXHQgICBpZHgyIDwgMFxuXHQgICB8fFxuXHQgICBpZHgxID4gaWR4MlxuXHQgKSB7XG5cdCBcdHJldHVybiAnJztcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjb25zdCB2YWx1ZXMgPSBzcWxUeXBlLnN1YnN0cmluZyhpZHgxICsgMSwgaWR4MiAtIDApLnNwbGl0KCcsJyk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdHZhbHVlcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuXG5cdFx0dmFsdWUgPSBhbWlXZWJBcHAudGV4dFRvSHRtbCh2YWx1ZS5yZXBsYWNlKC8nL2csICcnKS50cmltKCkpO1xuXG5cdFx0aWYodmFsdWUudG9VcHBlckNhc2UoKSA9PT0gZGVmYXVsdFZhbHVlLnRvVXBwZXJDYXNlKCkpIHtcblx0XHRcdHJlc3VsdC5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIHZhbHVlICsgJ1wiIHNlbGVjdGVkPVwic2VsZWN0ZWRcIj4nICsgdmFsdWUgKyAnPC9vcHRpb24+Jyk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmVzdWx0LnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgdmFsdWUgKyAnXCIgeHh4eHh4eD1cInh4eHh4eHh4eFwiPicgKyB2YWx1ZSArICc8L29wdGlvbj4nKTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiByZXN1bHQuam9pbignJyk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSUNsYXNzKCdGaWVsZEVkaXRvckN0cmwnLCB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZXh0ZW5kczogYW1pLkNvbnRyb2wsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihwYXJlbnQsIG93bmVyKVxuXHR7XG5cdFx0dGhpcy4kc3VwZXIuJGluaXQocGFyZW50LCBvd25lcik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9GaWVsZEVkaXRvci90d2lnL0ZpZWxkRWRpdG9yQ3RybC50d2lnJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2NvbnRyb2xzL0ZpZWxkRWRpdG9yL3R3aWcvZmllbGRMaXN0LnR3aWcnLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmFwcGVuZEhUTUwoJ2JvZHknLCBkYXRhWzBdKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLmZyYWdtZW50RmllbGRMaXN0ID0gZGF0YVsxXTtcblxuXHRcdFx0XHR0aGlzLmNhY2hlID0ge307XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0SW5mbzogZnVuY3Rpb24ocHJpbWFyeUNhdGFsb2csIHByaW1hcnlFbnRpdHksIHByaW1hcnlGaWVsZClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3Qga2V5ID0gcHJpbWFyeUNhdGFsb2cgKyAnJCcgKyBwcmltYXJ5RW50aXR5O1xuXG5cdFx0aWYoa2V5IGluIHRoaXMuY2FjaGUpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHJlc3VsdC5yZXNvbHZlKFxuXHRcdFx0XHR0aGlzLmNhY2hlW2tleV0ucHJpbWFyeUZpZWxkXG5cdFx0XHRcdCxcblx0XHRcdFx0dGhpcy5jYWNoZVtrZXldLmZpZWxkSW5mb1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGZpZWxkSW5mbyA9IFtdO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdHZXRFbnRpdHlJbmZvIC1jYXRhbG9nPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcocHJpbWFyeUNhdGFsb2cpICsgJ1wiIC1lbnRpdHk9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwcmltYXJ5RW50aXR5KSArICdcIicpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0Y29uc3Qgcm93cyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uey5AdHlwZT09PVwiZmllbGRzXCJ9LnJvdycsIGRhdGEpO1xuXG5cdFx0XHRmb3IobGV0IGkgaW4gcm93cylcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGZpZWxkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImZpZWxkXCJ9LiQnLCByb3dzW2ldKVswXSB8fCAnJztcblx0XHRcdFx0Y29uc3QgdHlwZSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJ0eXBlXCJ9LiQnLCByb3dzW2ldKVswXSB8fCAnJztcblx0XHRcdFx0Y29uc3QgZGVmID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImRlZlwifS4kJywgcm93c1tpXSlbMF0gfHwgJyc7XG5cblx0XHRcdFx0Y29uc3QgcHJpbWFyeSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJwcmltYXJ5XCJ9LiQnLCByb3dzW2ldKVswXSB8fCAnJztcblx0XHRcdFx0Y29uc3QgY3JlYXRlZCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJjcmVhdGVkXCJ9LiQnLCByb3dzW2ldKVswXSB8fCAnJztcblx0XHRcdFx0Y29uc3QgY3JlYXRlZEJ5ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImNyZWF0ZWRCeVwifS4kJywgcm93c1tpXSlbMF0gfHwgJyc7XG5cdFx0XHRcdGNvbnN0IG1vZGlmaWVkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cIm1vZGlmaWVkXCJ9LiQnLCByb3dzW2ldKVswXSB8fCAnJztcblx0XHRcdFx0Y29uc3QgbW9kaWZpZWRCeSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJtb2RpZmllZEJ5XCJ9LiQnLCByb3dzW2ldKVswXSB8fCAnJztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYocHJpbWFyeSA9PT0gJ3RydWUnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cHJpbWFyeUZpZWxkID0gZmllbGQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYoY3JlYXRlZCAhPT0gJ3RydWUnXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIGNyZWF0ZWRCeSAhPT0gJ3RydWUnXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG1vZGlmaWVkICE9PSAndHJ1ZSdcblx0XHRcdFx0ICAgJiZcblx0XHRcdFx0ICAgbW9kaWZpZWRCeSAhPT0gJ3RydWUnXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRmaWVsZEluZm8ucHVzaCh7XG5cdFx0XHRcdFx0XHRmaWVsZDogZmllbGQsXG5cdFx0XHRcdFx0XHR0eXBlOiB0eXBlLFxuXHRcdFx0XHRcdFx0ZGVmOiBkZWYsXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdC5yZXNvbHZlKHByaW1hcnlGaWVsZCwgZmllbGRJbmZvKTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0VmFsdWVzOiBmdW5jdGlvbihwcmltYXJ5Q2F0YWxvZywgcHJpbWFyeUVudGl0eSwgcHJpbWFyeUZpZWxkLCBwcmltYXJ5VmFsdWUpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHZhbHVlcyA9IHt9O1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdTZWFyY2hRdWVyeSAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHByaW1hcnlDYXRhbG9nKSArICdcIiAtZW50aXR5PVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcocHJpbWFyeUVudGl0eSkgKyAnXCIgLXNxbD1cIlNFTEVDVCAqIEZST00gYCcgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHByaW1hcnlFbnRpdHkpICsgJ2AgV0hFUkUgYCcgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHByaW1hcnlGaWVsZCkgKyAnYCA9IFxcJycgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHByaW1hcnlWYWx1ZSkgKyAnXFwnXCInKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGNvbnN0IGZpZWxkcyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uey5AdHlwZT09PVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcocHJpbWFyeUNhdGFsb2cpICsgJ1wifS4uZmllbGQnLCBkYXRhKTtcblxuXHRcdFx0Zm9yKGxldCBpIGluIGZpZWxkcylcblx0XHRcdHtcblx0XHRcdFx0dmFsdWVzW2ZpZWxkc1tpXVsnQG5hbWUnXV0gPSBmaWVsZHNbaV1bJyQnXTtcblx0XHRcdH1cblxuXHRcdFx0cmVzdWx0LnJlc29sdmUodmFsdWVzKTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0dXA6IGZ1bmN0aW9uKHNlbGVjdG9yLCBzZXR0aW5ncylcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZm4xID0gKGNhdGFsb2csIGVudGl0eSwgZmllbGRzLCB2YWx1ZXMpID0+XG5cdFx0XHQoKCdBZGRFbGVtZW50JykpICsgJyAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGNhdGFsb2cpICsgJ1wiIC1lbnRpdHk9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhlbnRpdHkpICsgJ1wiIC1zZXBhcmF0b3I9XCLCp1wiIC1maWVsZHM9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhmaWVsZHMuam9pbignwqcnKSkgKyAnXCIgLXZhbHVlcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHZhbHVlcy5qb2luKCfCpycpKSArICdcIidcblx0XHQ7XG5cblx0XHRjb25zdCBmbjIgPSAoY2F0YWxvZywgZW50aXR5LCBmaWVsZHMsIHZhbHVlcywgcHJpbWFyeUZpZWxkcywgcHJpbWFyeVZhbHVlcykgPT5cblx0XHRcdCdVcGRhdGVFbGVtZW50cycgKyAnIC1jYXRhbG9nPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoY2F0YWxvZykgKyAnXCIgLWVudGl0eT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGVudGl0eSkgKyAnXCIgLXNlcGFyYXRvcj1cIsKnXCIgLWZpZWxkcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGZpZWxkcy5qb2luKCfCpycpKSArICdcIiAtdmFsdWVzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodmFsdWVzLmpvaW4oJ8KnJykpICsgJ1wiIC1rZXlGaWVsZHM9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwcmltYXJ5RmllbGRzLmpvaW4oJ8KnJykpICsgJ1wiIC1rZXlWYWx1ZXM9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwcmltYXJ5VmFsdWVzLmpvaW4oJ8KnJykpICsgJ1wiJ1xuXHRcdDtcblxuXHRcdGNvbnN0IGZuMyA9IChjYXRhbG9nLCBlbnRpdHksIHByaW1hcnlGaWVsZHMsIHByaW1hcnlWYWx1ZXMpID0+XG5cdFx0XHQnUmVtb3ZlRWxlbWVudHMnICsgJyAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGNhdGFsb2cpICsgJ1wiIC1lbnRpdHk9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhlbnRpdHkpICsgJ1wiIC1zZXBhcmF0b3I9XCLCp1wiIC1rZXlGaWVsZHM9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwcmltYXJ5RmllbGRzLmpvaW4oJ8KnJykpICsgJ1wiIC1rZXlWYWx1ZXM9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwcmltYXJ5VmFsdWVzLmpvaW4oJ8KnJykpICsgJ1wiJ1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgW2FwcGVuZENvbW1hbmRGdW5jLCB1cGRhdGVDb21tYW5kRnVuYywgcmVtb3ZlQ29tbWFuZEZ1bmNdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0WydhcHBlbmRDb21tYW5kRnVuYycsICd1cGRhdGVDb21tYW5kRnVuYycsICdyZW1vdmVDb21tYW5kRnVuYyddLFxuXHRcdFx0W2ZuMSwgZm4yLCBmbjNdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmN0eCA9IHtcblx0XHRcdGluRWRpdE1vZGU6IGZhbHNlLFxuXG5cdFx0XHRhcHBlbmRDb21tYW5kRnVuYzogYXBwZW5kQ29tbWFuZEZ1bmMsXG5cdFx0XHR1cGRhdGVDb21tYW5kRnVuYzogdXBkYXRlQ29tbWFuZEZ1bmMsXG5cdFx0XHRyZW1vdmVDb21tYW5kRnVuYzogcmVtb3ZlQ29tbWFuZEZ1bmMsXG5cdFx0fTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5lbCA9ICQoc2VsZWN0b3IpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmVsLmZpbmQoJ2RpdltkYXRhLWFjdGlvbj1cImVkaXQtcm93XCJdJykuY2xpY2soKGUpID0+IHtcblxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRpZih0aGlzLmN0eC5pbkVkaXRNb2RlKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnNob3dGaWVsZE1vZGFsKFxuXHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJpbWFyeS1jYXRhbG9nJylcblx0XHRcdFx0XHQsXG5cdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1wcmltYXJ5LWVudGl0eScpXG5cdFx0XHRcdFx0LFxuXHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJpbWFyeS1maWVsZCcpXG5cdFx0XHRcdFx0LFxuXHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJpbWFyeS12YWx1ZScpXG5cdFx0XHRcdFx0LFxuXHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2F0YWxvZycpXG5cdFx0XHRcdFx0LFxuXHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZW50aXR5Jylcblx0XHRcdFx0XHQsXG5cdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1maWVsZCcpXG5cdFx0XHRcdFx0LFxuXHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHlwZScpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuZWwuZmluZCgnW2RhdGEtYWN0aW9uPVwiY2xvbmUtcm93XCJdJykuY2xpY2soKGUpID0+IHtcblxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRpZih0aGlzLmN0eC5pbkVkaXRNb2RlKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnNob3dSb3dNb2RhbChcblx0XHRcdFx0XHRlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNhdGFsb2cnKVxuXHRcdFx0XHRcdCxcblx0XHRcdFx0XHRlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWVudGl0eScpXG5cdFx0XHRcdFx0LFxuXHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJpbWFyeS1maWVsZCcpXG5cdFx0XHRcdFx0LFxuXHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJpbWFyeS12YWx1ZScpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuZWwuZmluZCgnW2RhdGEtYWN0aW9uPVwiZGVsZXRlLXJvd1wiXScpLmNsaWNrKChlKSA9PiB7XG5cblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0aWYodGhpcy5jdHguaW5FZGl0TW9kZSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5yZW1vdmVSb3coXG5cdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jYXRhbG9nJylcblx0XHRcdFx0XHQsXG5cdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1lbnRpdHknKVxuXHRcdFx0XHRcdCxcblx0XHRcdFx0XHRbZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1wcmltYXJ5LWZpZWxkJyldXG5cdFx0XHRcdFx0LFxuXHRcdFx0XHRcdFtlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXByaW1hcnktdmFsdWUnKV1cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpc0luRWRpdE1vZGU6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmN0eC5pbkVkaXRNb2RlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldEluRWRpdE1vZGU6IGZ1bmN0aW9uKGluRWRpdE1vZGUpXG5cdHtcblx0XHRpZihpbkVkaXRNb2RlKSB7XG5cdFx0XHR0aGlzLmVsLnJlbW92ZUNsYXNzKCd1bml0LWVkaXQnKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLmVsLmFkZENsYXNzKCd1bml0LWVkaXQnKTtcblx0XHR9XG5cblx0XHR0aGlzLmN0eC5pbkVkaXRNb2RlID0gaW5FZGl0TW9kZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y2hhbmdlRm9ybUlucHV0VHlwZTogZnVuY3Rpb24oc2VsZWN0b3IsIGFtaVR5cGUsIHNxbFR5cGUpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IG5hbWUgPSAkKHNlbGVjdG9yKS5wcm9wKCduYW1lJyk7XG5cdFx0Y29uc3QgdmFsdWUgPSAkKHNlbGVjdG9yKS4gdmFsICgvKi0tKi8pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgaHRtbDtcblxuXHRcdC8qKi8gaWYoYW1pVHlwZSA9PT0gJ0BOVUxMJykge1xuXHRcdFx0aHRtbCA9ICc8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtXCIgdHlwZT1cInRleHRcIiByZWFkb25seT1cInJlYWRvbmx5XCIgLz4nO1xuXHRcdH1cblx0XHRlbHNlIGlmKGFtaVR5cGUgPT09ICdOVU1CRVInKSB7XG5cdFx0XHRodG1sID0gJzxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc21cIiB0eXBlPVwibnVtYmVyXCIgc3RlcD1cImFueVwiIC8+Jztcblx0XHR9XG5cdFx0ZWxzZSBpZihhbWlUeXBlID09PSAnREFURVRJTUUnKSB7XG5cdFx0XHRodG1sID0gJzxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gZm9ybS1kYXRldGltZVwiIHR5cGU9XCJ0ZXh0XCIgZGF0YS10YXJnZXQ9XCInICsgc2VsZWN0b3IgKyAnXCIgLz4nO1xuXHRcdH1cblx0XHRlbHNlIGlmKGFtaVR5cGUgPT09ICdEQVRFJykge1xuXHRcdFx0aHRtbCA9ICc8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGZvcm0tZGF0ZVwiIHR5cGU9XCJ0ZXh0XCIgZGF0YS10YXJnZXQ9XCInICsgc2VsZWN0b3IgKyAnXCIgLz4nO1xuXHRcdH1cblx0XHRlbHNlIGlmKGFtaVR5cGUgPT09ICdUSU1FJykge1xuXHRcdFx0aHRtbCA9ICc8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGZvcm0tdGltZVwiIHR5cGU9XCJ0ZXh0XCIgZGF0YS10YXJnZXQ9XCInICsgc2VsZWN0b3IgKyAnXCIgLz4nO1xuXHRcdH1cblx0XHRlbHNlIGlmKGFtaVR5cGUgPT09ICdFTlVNJykge1xuXHRcdFx0aHRtbCA9ICc8c2VsZWN0IGNsYXNzPVwiY3VzdG9tLXNlbGVjdCBjdXN0b20tc2VsZWN0LXNtXCI+JyArIGFtaVR3aWcuc3RkbGliLmdldEFNSVR5cGVUb0VudW1PcHRpb25zKHNxbFR5cGUsIHZhbHVlKSArICc8L3NlbGVjdD4nO1xuXHRcdH1cblx0XHRlbHNlIGlmKGFtaVR5cGUgPT09ICdMT05HX1RFWFQnKSB7XG5cdFx0XHRodG1sID0gJzx0ZXh0YXJlYSBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc21cIiByb3dzPVwiNlwiPjwvdGV4dGFyZWE+Jztcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRodG1sID0gJzxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc21cIiB0eXBlPVwidGV4dFwiIC8+Jztcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5feHh4SFRNTChzZWxlY3RvciwgaHRtbCwgMykuZG9uZSgoZWwpID0+IHtcblxuXHRcdFx0ZWwuYXR0cignbmFtZScsIG5hbWUpLnZhbChhbWlUeXBlICE9PSAnQE5VTEwnID8gKHZhbHVlICE9PSAnQE5VTEwnID8gdmFsdWUgOiAnJykgOiAnQE5VTEwnKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzaG93RmllbGRNb2RhbDogZnVuY3Rpb24ocHJpbWFyeUNhdGFsb2csIHByaW1hcnlFbnRpdHksIHByaW1hcnlGaWVsZCwgcHJpbWFyeVZhbHVlLCBjYXRhbG9nLCBlbnRpdHksIGZpZWxkLCB0eXBlKVxuXHR7XG5cdFx0aWYocHJpbWFyeUNhdGFsb2cgIT09IGNhdGFsb2dcblx0XHQgICB8fFxuXHRcdCAgIHByaW1hcnlFbnRpdHkgIT09IGVudGl0eVxuXHRcdCApIHtcblx0XHRcdHJldHVybjtcdC8qIE1FVFRSRSBEQU5TIExFIFRXSUcgKi9cblx0XHR9XG5cblx0XHQvKiovXG5cblx0XHR0aGlzLmdldEluZm8ocHJpbWFyeUNhdGFsb2csIHByaW1hcnlFbnRpdHksIHByaW1hcnlGaWVsZCkuZG9uZSgocHJpbWFyeUZpZWxkLCBmaWVsZEluZm8pID0+IHtcblxuXHRcdFx0dGhpcy5nZXRWYWx1ZXMocHJpbWFyeUNhdGFsb2csIHByaW1hcnlFbnRpdHksIHByaW1hcnlGaWVsZCwgcHJpbWFyeVZhbHVlKS5kb25lKCh2YWx1ZXMpID0+IHtcblxuXHRcdFx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0XHRcdHByaW1hcnlGaWVsZDogcHJpbWFyeUZpZWxkLFxuXHRcdFx0XHRcdGZpZWxkSW5mbzogZmllbGRJbmZvLFxuXHRcdFx0XHRcdHZhbHVlczogdmFsdWVzLFxuXHRcdFx0XHRcdGZpbHRlcjogZmllbGQsXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjQzJDNDMwNDlfNENENl83M0MzXzU5N0JfRjAzOTlBMjIwNjEwJywgdGhpcy5mcmFnbWVudEZpZWxkTGlzdCwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgZWwxID0gJCgnI0Y0NDY4N0EzXzAzNkNfOUM3N18zMjg0X0RENDk1RDlGNEQ3RCcpO1xuXHRcdFx0XHRcdGNvbnN0IGVsMiA9ICQoJyNEM0NFNjAxRl9DN0JBXzVDOEVfMjU2NF80OTFGRUQ0QzVENkYnKTtcblx0XHRcdFx0XHRjb25zdCBlbDMgPSAkKCcjQzJDNDMwNDlfNENENl83M0MzXzU5N0JfRjAzOTlBMjIwNjEwJyk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGVsMi50ZXh0KGNhdGFsb2cgKyAnLicgKyBlbnRpdHkgKyAnLicgKyBwcmltYXJ5RmllbGQgKyAnID0gJyArIHByaW1hcnlWYWx1ZSk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGVsMy5maW5kKCdbZGF0YS1hY3Rpb249XCJjaGFuZ2VhbWl0eXBlXCJdJykuY2xpY2soKGUpID0+IHtcblxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdFx0XHQkKGUuY3VycmVudFRhcmdldCkuY2xvc2VzdCgnLm5hdi1pdGVtJykuZmluZCgnLm5hdi1saW5rJykuYWRkQ2xhc3MoJ2FjdGl2ZScpLmNoaWxkcmVuKCkuZmlyc3QoKS5hdHRyKCdkYXRhLWFtaS10eXBlJywgJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtYW1pLXR5cGUnKSlcblx0XHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtc3FsLXR5cGUnLCAkKGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS1zcWwtdHlwZScpKVxuXHRcdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgkKGUuY3VycmVudFRhcmdldCkudGV4dCgpLnJlcGxhY2UoJ2RlZmF1bHQnLCAnJykpXG5cdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdHRoaXMuY2hhbmdlRm9ybUlucHV0VHlwZShcblx0XHRcdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnaHJlZicpXG5cdFx0XHRcdFx0XHRcdCxcblx0XHRcdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1hbWktdHlwZScpXG5cdFx0XHRcdFx0XHRcdCxcblx0XHRcdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1zcWwtdHlwZScpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRlbDMub2ZmKCkub24oJ3N1Ym1pdCcsIChlKSA9PiB7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSBlbDMuZmluZCgnOmlucHV0JykudmFsKCk7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdHRoaXMudXBkYXRlUm93KGNhdGFsb2csIGVudGl0eSwgW2ZpZWxkXSwgW3ZhbHVlXSwgW3ByaW1hcnlGaWVsZF0sIFtwcmltYXJ5VmFsdWVdKTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0ZWwxLm1vZGFsKCdzaG93Jyk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0fSk7XG5cblx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHR0aGlzLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNob3dSb3dNb2RhbDogZnVuY3Rpb24ocHJpbWFyeUNhdGFsb2csIHByaW1hcnlFbnRpdHksIHByaW1hcnlGaWVsZCwgcHJpbWFyeVZhbHVlKVxuXHR7XG5cdFx0dGhpcy5nZXRJbmZvKHByaW1hcnlDYXRhbG9nLCBwcmltYXJ5RW50aXR5LCBwcmltYXJ5RmllbGQpLmRvbmUoKHByaW1hcnlGaWVsZCwgZmllbGRJbmZvKSA9PiB7XG5cblx0XHRcdHRoaXMuZ2V0VmFsdWVzKHByaW1hcnlDYXRhbG9nLCBwcmltYXJ5RW50aXR5LCBwcmltYXJ5RmllbGQsIHByaW1hcnlWYWx1ZSkuZG9uZSgodmFsdWVzKSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgZGljdCA9IHtcblx0XHRcdFx0XHRwcmltYXJ5RmllbGQ6IHByaW1hcnlGaWVsZCxcblx0XHRcdFx0XHRmaWVsZEluZm86IGZpZWxkSW5mbyxcblx0XHRcdFx0XHR2YWx1ZXM6IHZhbHVlcyxcblx0XHRcdFx0XHRmaWx0ZXI6ICcnLFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5yZXBsYWNlSFRNTCgnI0YyRTU4MTM2XzczRjVfRDJFMl9BMEI3XzJGODEwODMwQUQ5OCcsIHRoaXMuZnJhZ21lbnRGaWVsZExpc3QsIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGVsMSA9ICQoJyNBODU3MjE2N182ODk4X0FENkZfOEVBRF85RDRFMkFFQjM1NTAnKTtcblx0XHRcdFx0XHRjb25zdCBlbDIgPSAkKCcjRTQ0QjI5OURfOTZCM185QzAwX0M5MUNfNTU1QzU0OUJGODdCJyk7XG5cdFx0XHRcdFx0Y29uc3QgZWwzID0gJCgnI0YyRTU4MTM2XzczRjVfRDJFMl9BMEI3XzJGODEwODMwQUQ5OCcpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRlbDIudGV4dChwcmltYXJ5Q2F0YWxvZyArICcuJyArIHByaW1hcnlFbnRpdHkpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRlbDMuZmluZCgnW2RhdGEtYWN0aW9uPVwiY2hhbmdlYW1pdHlwZVwiXScpLmNsaWNrKChlKSA9PiB7XG5cblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLmNsb3Nlc3QoJy5uYXYtaXRlbScpLmZpbmQoJy5uYXYtbGluaycpLmFkZENsYXNzKCdhY3RpdmUnKS5jaGlsZHJlbigpLmZpcnN0KCkuYXR0cignZGF0YS1hbWktdHlwZScsICQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLWFtaS10eXBlJykpXG5cdFx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXNxbC10eXBlJywgJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtc3FsLXR5cGUnKSlcblx0XHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJChlLmN1cnJlbnRUYXJnZXQpLnRleHQoKS5yZXBsYWNlKCdkZWZhdWx0JywgJycpKVxuXHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0XHR0aGlzLmNoYW5nZUZvcm1JbnB1dFR5cGUoXG5cdFx0XHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKVxuXHRcdFx0XHRcdFx0XHQsXG5cdFx0XHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYW1pLXR5cGUnKVxuXHRcdFx0XHRcdFx0XHQsXG5cdFx0XHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3FsLXR5cGUnKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0ZWwzLm9mZigpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNvbnN0IGZpZWxkcyA9IFtdO1xuXHRcdFx0XHRcdFx0Y29uc3QgdmFsdWVzID0gW107XG5cblx0XHRcdFx0XHRcdGNvbnN0IGZvcm0gPSBlbDMuc2VyaWFsaXplQXJyYXkoKTtcblxuXHRcdFx0XHRcdFx0Zm9yKGxldCBpIGluIGZvcm0pXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGZpZWxkcy5wdXNoKGZvcm1baV0ubmFtZSk7XG5cdFx0XHRcdFx0XHRcdHZhbHVlcy5wdXNoKGZvcm1baV0udmFsdWUpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHR0aGlzLmFwcGVuZFJvdyhwcmltYXJ5Q2F0YWxvZywgcHJpbWFyeUVudGl0eSwgZmllbGRzLCB2YWx1ZXMpO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRlbDEubW9kYWwoJ3Nob3cnKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YXBwZW5kUm93OiBmdW5jdGlvbihjYXRhbG9nLCBlbnRpdHksIGZpZWxkcywgdmFsdWVzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gY29uZmlybSgnUGxlYXNlIGNvbmZpcm0hJyk7XG5cblx0XHRpZihyZXN1bHQpXG5cdFx0e1xuXHRcdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdFx0YW1pQ29tbWFuZC5leGVjdXRlKHRoaXMuY3R4LmFwcGVuZENvbW1hbmRGdW5jKGNhdGFsb2csIGVudGl0eSwgZmllbGRzLCB2YWx1ZXMpKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0JCgnI0E4NTcyMTY3XzY4OThfQUQ2Rl84RUFEXzlENEUyQUVCMzU1MCcpLm1vZGFsKCdoaWRlJyk7XG5cblx0XHRcdFx0dGhpcy5zdWNjZXNzKG1lc3NhZ2UsIHRydWUpO1xuXG5cdFx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHVwZGF0ZVJvdzogZnVuY3Rpb24oY2F0YWxvZywgZW50aXR5LCBmaWVsZHMsIHZhbHVlcywgcHJpbWFyeUZpZWxkcywgcHJpbWFyeVZhbHVlcylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IGNvbmZpcm0oJ1BsZWFzZSBjb25maXJtIScpO1xuXG5cdFx0aWYocmVzdWx0KVxuXHRcdHtcblx0XHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSh0aGlzLmN0eC51cGRhdGVDb21tYW5kRnVuYyhjYXRhbG9nLCBlbnRpdHksIGZpZWxkcywgdmFsdWVzLCBwcmltYXJ5RmllbGRzLCBwcmltYXJ5VmFsdWVzKSkuZG9uZSgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdCQoJyNGNDQ2ODdBM18wMzZDXzlDNzdfMzI4NF9ERDQ5NUQ5RjREN0QnKS5tb2RhbCgnaGlkZScpO1xuXG5cdFx0XHRcdHRoaXMuc3VjY2VzcyhtZXNzYWdlLCB0cnVlKTtcblxuXHRcdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW1vdmVSb3c6IGZ1bmN0aW9uKHByaW1hcnlDYXRhbG9nLCBwcmltYXJ5RW50aXR5LCBwcmltYXJ5RmllbGRzLCBwcmltYXJ5VmFsdWVzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gY29uZmlybSgnUGxlYXNlIGNvbmZpcm0hJyk7XG5cblx0XHRpZihyZXN1bHQpXG5cdFx0e1xuXHRcdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdFx0YW1pQ29tbWFuZC5leGVjdXRlKHRoaXMuY3R4LnJlbW92ZUNvbW1hbmRGdW5jKHByaW1hcnlDYXRhbG9nLCBwcmltYXJ5RW50aXR5LCBwcmltYXJ5RmllbGRzLCBwcmltYXJ5VmFsdWVzKSkuZG9uZSgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuc3VjY2VzcyhtZXNzYWdlLCB0cnVlKTtcblxuXHRcdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHN1Y2Nlc3M6IGZ1bmN0aW9uKG1lc3NhZ2UsIGZhZGVPdXQsIHRhcmdldClcblx0e1xuXHRcdGlmKHRoaXMuZ2V0T3duZXIoKS5yZWZyZXNoKVxuXHRcdHtcblx0XHRcdF9hbWlfaW50ZXJuYWxfdGhlbih0aGlzLmdldE93bmVyKCkucmVmcmVzaCgpLCAoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnN1Y2Nlc3MobWVzc2FnZSwgZmFkZU91dCwgdGFyZ2V0KTtcblxuXHRcdFx0fSwgKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgZmFkZU91dCwgdGFyZ2V0KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0YW1pV2ViQXBwLnN1Y2Nlc3MobWVzc2FnZSwgZmFkZU91dCwgdGFyZ2V0KTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZXJyb3I6IGZ1bmN0aW9uKG1lc3NhZ2UsIGZhZGVPdXQsIHRhcmdldClcblx0e1xuXHRcdGlmKHRoaXMuZ2V0T3duZXIoKS5yZWZyZXNoKVxuXHRcdHtcblx0XHRcdF9hbWlfaW50ZXJuYWxfdGhlbih0aGlzLmdldE93bmVyKCkucmVmcmVzaCgpLCAoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIGZhZGVPdXQsIHRhcmdldCk7XG5cblx0XHRcdH0sIChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIGZhZGVPdXQsIHRhcmdldCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCBmYWRlT3V0LCB0YXJnZXQpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
